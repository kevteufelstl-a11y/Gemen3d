-- 04: Familiennummern (001, 002 ...) und Spieleinladungen  (16.11.2026)
-- Wird mit dem Supabase-Werkzeug als Migration "familien_nummern_einladungen" angewendet.
-- Bestehende Daten bleiben erhalten. Vorher gesichert in Schema backup_20261116.

-- ---------- 1. Fortlaufende Familiennummer ----------
create sequence if not exists public.family_no_seq;
alter table public.families add column if not exists family_no integer;

-- Vorgabe von Kevin: Klein = 001, Engelberg = 002
update public.families set family_no = 1 where lower(login) = 'klein' and family_no is null;
update public.families set family_no = 2 where lower(login) = 'engelberg' and family_no is null;
-- Falls es weitere Familien gibt: nach Anlagedatum danach nummerieren
update public.families f set family_no = x.n
  from (select id, 2 + row_number() over (order by created_at) n from public.families where family_no is null) x
  where f.id = x.id;

select setval('public.family_no_seq', greatest((select coalesce(max(family_no), 0) from public.families), 2));
alter table public.families alter column family_no set default nextval('public.family_no_seq');
alter table public.families alter column family_no set not null;
alter sequence public.family_no_seq owned by public.families.family_no;
create unique index if not exists families_family_no_key on public.families (family_no);
revoke all on sequence public.family_no_seq from anon, authenticated;

-- Eine vergebene Nummer darf sich nie ändern (und gelöschte werden nie neu vergeben, weil die Folge nur hochzählt)
create or replace function public.milo_family_no_fixed() returns trigger
  language plpgsql set search_path to 'public' as $$
begin
  if new.family_no is distinct from old.family_no then raise exception 'family_no ist unveraenderlich'; end if;
  return new;
end $$;
revoke all on function public.milo_family_no_fixed() from public, anon, authenticated;
drop trigger if exists tr_family_no_fixed on public.families;
create trigger tr_family_no_fixed before update on public.families for each row execute function public.milo_family_no_fixed();

-- ---------- 2. Spieleinladungen ----------
create table if not exists public.game_invites (
  id uuid primary key default gen_random_uuid(),
  from_id uuid not null references public.profiles(id) on delete cascade,
  to_id uuid not null references public.profiles(id) on delete cascade,
  room_code text not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'expired', 'cancelled')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  responded_at timestamptz
);
create index if not exists game_invites_to_idx on public.game_invites (to_id, status);
create index if not exists game_invites_from_idx on public.game_invites (from_id, created_at desc);
alter table public.game_invites enable row level security;
revoke all on public.game_invites from anon, authenticated;

create or replace function public.milo_invites(ses public.sessions, p jsonb, a text) returns jsonb
  language plpgsql set search_path to 'public', 'extensions' as $fn$
declare
  me public.profiles;
  o public.profiles;
  iv public.game_invites;
  code text;
  alpha text := 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  i int;
begin
  if ses.kind <> 'child' then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;
  select * into me from profiles where id = ses.profile_id and role = 'child' and active;
  if me.id is null then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;
  if not exists (select 1 from families where id = me.family_id and active) then
    return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session'));
  end if;
  update profiles set last_seen = now() where id = me.id;
  update game_invites set status = 'expired', responded_at = now()
    where status = 'pending' and expires_at < now() and (from_id = me.id or to_id = me.id);

  if coalesce(me.settings->>'multiplayer', 'true') = 'false' then
    return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'mp_off'));
  end if;

  if a = 'inviteSend' then
    begin select * into o from profiles where id = (p->>'to')::uuid and role = 'child' and active;
    exception when others then o := null; end;
    if o.id is null or o.id = me.id then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
    -- nur echte Freunde (beide Seiten angenommen, Eltern-Freigaben erledigt)
    if not exists (select 1 from friend_requests f where f.status = 'accepted' and not f.need_from_parent and not f.need_to_parent
        and ((f.from_id = me.id and f.to_id = o.id) or (f.from_id = o.id and f.to_id = me.id))) then
      return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'not_friend'));
    end if;
    if exists (select 1 from blocks where (blocker = o.id and blocked = me.id) or (blocker = me.id and blocked = o.id)) then
      return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'blocked'));
    end if;
    if coalesce(o.settings->>'multiplayer', 'true') = 'false' or not exists (select 1 from families where id = o.family_id and active) then
      return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'mp_off_other'));
    end if;
    if not coalesce(o.last_seen > now() - interval '2 minutes', false) then
      return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'offline'));
    end if;
    -- Mehrfach-Einladungen verhindern: nur eine offene Einladung gleichzeitig, und nicht zweimal an dieselbe Person
    if exists (select 1 from game_invites where from_id = me.id and status = 'pending') then
      return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'already_invited'));
    end if;
    if exists (select 1 from game_invites where to_id = o.id and status = 'pending' and from_id <> me.id) then
      return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'busy'));
    end if;
    if (select count(*) from game_invites where from_id = me.id and created_at > now() - interval '10 minutes') >= 10 then
      return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'too_many'));
    end if;
    code := '';
    for i in 1..4 loop code := code || substr(alpha, 1 + floor(random() * length(alpha))::int, 1); end loop;
    insert into game_invites (from_id, to_id, room_code, expires_at) values (me.id, o.id, code, now() + interval '60 seconds') returning * into iv;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'id', iv.id, 'room', iv.room_code, 'seconds', 60));
  end if;

  if a = 'inviteList' then
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'incoming', coalesce((select jsonb_agg(jsonb_build_object('id', v.id, 'name', f.name, 'figure', coalesce(f.figure, ''),
          'seconds', greatest(0, extract(epoch from (v.expires_at - now()))::int)) order by v.created_at)
        from game_invites v join profiles f on f.id = v.from_id where v.to_id = me.id and v.status = 'pending'), '[]'::jsonb),
      'outgoing', coalesce((select jsonb_agg(jsonb_build_object('id', x.id, 'name', x.name, 'status', x.status, 'room', case when x.status = 'accepted' then x.room_code end,
          'seconds', x.sec) order by x.created_at desc)
        from (select v.id, t.name, v.status, v.room_code, v.created_at, greatest(0, extract(epoch from (v.expires_at - now()))::int) sec
          from game_invites v join profiles t on t.id = v.to_id
          where v.from_id = me.id and v.created_at > now() - interval '3 minutes' order by v.created_at desc limit 5) x), '[]'::jsonb)));
  end if;

  if a = 'inviteRespond' then
    begin select * into iv from game_invites where id = (p->>'id')::uuid and to_id = me.id and status = 'pending' and expires_at > now() for update;
    exception when others then iv := null; end;
    if iv.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
    if coalesce((p->>'accept')::boolean, false) then
      update game_invites set status = 'accepted', responded_at = now() where id = iv.id;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'accepted', true, 'room', iv.room_code));
    end if;
    update game_invites set status = 'declined', responded_at = now() where id = iv.id;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'accepted', false));
  end if;

  if a = 'inviteCancel' then
    update game_invites set status = 'cancelled', responded_at = now() where from_id = me.id and status = 'pending';
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden', 'action', a));
end $fn$;
revoke all on function public.milo_invites(public.sessions, jsonb, text) from public, anon, authenticated;

-- ---------- 3. milo_api erweitern (gezielte Textersetzung, Rest bleibt unverändert) ----------
do $patch$
declare d text; n int;
begin
  select pg_get_functiondef(p.oid) into d from pg_proc p join pg_namespace s on s.oid = p.pronamespace where s.nspname = 'public' and p.proname = 'milo_api';
  if position('familyList' in d) > 0 then raise notice 'schon gepatcht'; return; end if;

  -- a) öffentliche Familienliste (ohne Login, nur Nummer + Anzeigename)
  if position('  if a = ''familyPlayers'' then' in d) = 0 then raise exception 'Anker familyPlayers fehlt'; end if;
  d := replace(d, '  if a = ''familyPlayers'' then',
    '  if a = ''familyList'' then' || chr(10) ||
    '    return jsonb_build_object(''s'', 200, ''b'', jsonb_build_object(''ok'', true, ''families'', coalesce((select jsonb_agg(jsonb_build_object(''id'', f.id, ''no'', f.family_no, ''name'', f.display_name) order by f.family_no) from families f where f.active), ''[]''::jsonb)));' || chr(10) ||
    '  end if;' || chr(10) ||
    '  if a = ''familyPlayers'' then');

  -- b) Einladungen nach der Sitzungsprüfung
  if position('  if a like ''reward%'' then' in d) = 0 then raise exception 'Anker reward fehlt'; end if;
  d := replace(d, '  if a like ''reward%'' then',
    '  if a like ''invite%'' then return public.milo_invites(ses, p, a); end if;' || chr(10) ||
    '  if a like ''reward%'' then');

  -- c) Abmelden = sofort offline
  if position('  if a = ''logout'' then' in d) = 0 then raise exception 'Anker logout fehlt'; end if;
  d := replace(d, '  if a = ''logout'' then',
    '  if a = ''logout'' then' || chr(10) ||
    '    update profiles set last_seen = null where id = ses.profile_id and ses.kind = ''child'';');

  -- d) Familiennummer in den Antworten
  d := replace(d, 'jsonb_build_object(''id'', fam.id, ''login'', fam.login,', 'jsonb_build_object(''id'', fam.id, ''no'', fam.family_no, ''login'', fam.login,');
  d := replace(d, 'jsonb_build_object(''id'', f.id, ''login'', f.login,', 'jsonb_build_object(''id'', f.id, ''no'', f.family_no, ''login'', f.login,');

  execute d;
end $patch$;
