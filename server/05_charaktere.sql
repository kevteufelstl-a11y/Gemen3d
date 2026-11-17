-- Charakter-System (17.11.2026): eigene Spielfiguren je Spieler.
-- Rein additiv: neue Tabelle "characters", zwei neue Spalten in profiles mit sicheren Standardwerten.
-- Bestehende Spieler, Spielstände und Figuren bleiben unverändert (active_character = null heißt: Standardfigur).

create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  pack_id text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists characters_profile_idx on public.characters(profile_id);
alter table public.characters enable row level security;   -- kein Direktzugriff, nur über milo_api
alter table public.profiles add column if not exists active_character uuid references public.characters(id) on delete set null;
alter table public.profiles add column if not exists char_intro_done boolean not null default false;

create or replace function public.milo_chars(ses public.sessions, p jsonb, a text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare me profiles; c characters; cid uuid; nm text; pk text; d jsonb; n int;
begin
  if ses.kind is null or ses.kind not in ('child', 'admin') then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;
  select * into me from profiles where id = ses.profile_id and active;
  if me.id is null then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;
  if ses.kind = 'child' and not exists (select 1 from families where id = me.family_id and active) then
    return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session'));
  end if;

  -- Eingabe-ID prüfen (nur eigene Charaktere werden je gefunden: immer "and profile_id = me.id")
  if coalesce(p->>'id', '') <> '' then
    begin cid := (p->>'id')::uuid; exception when others then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'bad')); end;
  end if;

  if a = 'charList' then
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'chars', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'name', name, 'pack', pack_id, 'data', data, 'updated', updated_at) order by created_at)
        from characters where profile_id = me.id), '[]'::jsonb),
      'active', me.active_character, 'introDone', me.char_intro_done));
  end if;

  if a = 'charSave' then
    nm := left(btrim(coalesce(p->>'name', '')), 24);
    pk := left(coalesce(p->>'pack', ''), 40);
    d := p->'data';
    if nm = '' then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'name')); end if;
    if pk !~ '^[a-z0-9_]+$' or d is null or jsonb_typeof(d) <> 'object' or length(d::text) > 4000 then
      return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'bad'));
    end if;
    if cid is not null then
      update characters set name = nm, pack_id = pk, data = d, updated_at = now() where id = cid and profile_id = me.id returning * into c;
      if c.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
    else
      select count(*) into n from characters where profile_id = me.id;
      if n >= 20 then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'too_many')); end if;
      insert into characters (profile_id, name, pack_id, data) values (me.id, nm, pk, d) returning * into c;
    end if;
    if coalesce((p->>'select')::boolean, false) then
      update profiles set active_character = c.id, char_intro_done = true where id = me.id;
    end if;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'char', jsonb_build_object('id', c.id, 'name', c.name, 'pack', c.pack_id, 'data', c.data, 'updated', c.updated_at)));
  end if;

  if a = 'charDelete' then
    if cid is null then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'bad')); end if;
    delete from characters where id = cid and profile_id = me.id returning * into c;   -- aktive Auswahl wird per FK auf null (Standard) gesetzt
    if c.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  if a = 'charSelect' then
    if cid is not null and not exists (select 1 from characters where id = cid and profile_id = me.id) then
      return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found'));
    end if;
    update profiles set active_character = cid, char_intro_done = true where id = me.id;   -- cid null = Standardfigur
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'active', cid));
  end if;

  if a = 'charIntro' then
    update profiles set char_intro_done = true where id = me.id;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden', 'action', a));
end $$;

-- In milo_api einhängen (nur einmal): alle Aktionen "char*" gehen an milo_chars (nach der Sitzungsprüfung)
do $$ declare d text; begin
  select pg_get_functiondef(p.oid) into d from pg_proc p join pg_namespace s on s.oid = p.pronamespace where s.nspname = 'public' and p.proname = 'milo_api';
  if position('milo_chars(ses' in d) = 0 then
    d := replace(d, E'  if a = ''logout'' then', E'  if a like ''char%'' then return public.milo_chars(ses, p, a); end if;\n\n  if a = ''logout'' then');
    if position('milo_chars(ses' in d) = 0 then raise exception 'Einhängepunkt nicht gefunden'; end if;
    execute d;
  end if;
end $$;

do $$ declare f record; begin
  for f in select p.oid::regprocedure sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.proname like 'milo\_%' loop
    execute format('revoke all on function %s from public', f.sig);
    if exists (select 1 from pg_roles where rolname = 'anon') then execute format('revoke all on function %s from anon, authenticated', f.sig); end if;
    if exists (select 1 from pg_roles where rolname = 'service_role') then execute format('grant execute on function %s to service_role', f.sig); end if;
  end loop;
end $$;
