-- Zonen (17.11.2026): Zone 2 und weitere Zonen, Freischaltung je Spieler, Versionen fuer den Zoneneditor.
-- Rein additiv: drei neue Tabellen, eine neue Funktion, ein neuer Einhaengepunkt in milo_api.
-- Bestehende Tabellen, Spieler, Spielstaende und Aufgaben bleiben unveraendert.

-- Sicherung der bisherigen milo_api vor dem Einhaengen
create schema if not exists backup_20261117;
create table if not exists backup_20261117.function_defs (name text primary key, def text, saved_at timestamptz default now());
revoke all on schema backup_20261117 from public, anon, authenticated;
insert into backup_20261117.function_defs(name, def)
  values ('milo_api', pg_get_functiondef('public.milo_api(jsonb)'::regprocedure))
  on conflict (name) do nothing;

create table if not exists public.zones (
  id text primary key,                         -- eindeutige ID (z1, z2, ...), Name ist frei aenderbar
  name text not null,
  color text not null default '#ffffff',
  status text not null default 'locked' check (status in ('active', 'locked', 'open', 'off', 'archived')),
  unlock_rule jsonb not null default '{}'::jsonb, -- z. B. {"type":"exam","exam":"<id>"}; spaeter konfigurierbar
  geo_version int not null default 1,
  optik_version int not null default 1,
  updated_at timestamptz not null default now()
);
create table if not exists public.zone_unlocks (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  zone_id text not null references public.zones(id) on delete cascade,
  via text not null default 'admin',           -- admin | exam
  granted_at timestamptz not null default now(),
  primary key (profile_id, zone_id)
);
create table if not exists public.zone_versions (  -- Verlauf fuer den Zoneneditor (geo und optik getrennt)
  id bigserial primary key,
  zone_id text not null references public.zones(id) on delete cascade,
  layer text not null check (layer in ('geo', 'optik', 'meta')),
  version int not null,
  data jsonb not null,
  note text,
  created_at timestamptz not null default now(),
  unique (zone_id, layer, version)
);
alter table public.zones enable row level security;          -- kein Direktzugriff, nur ueber milo_api
alter table public.zone_unlocks enable row level security;
alter table public.zone_versions enable row level security;

insert into public.zones(id, name, color, status, unlock_rule) values
  ('z1', 'Zone 1 – Gemen Ortskern', '#59ff5a', 'active', '{"type":"always"}'),
  ('z2', 'Zone 2 – Neumühle und Aa-Wiesen', '#ff2bd6', 'locked', '{"type":"exam","exam":null}')
on conflict (id) do nothing;

create or replace function public.milo_zones(ses public.sessions, p jsonb, a text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare me profiles; pid uuid; zid text;
begin
  if ses.kind is null or ses.kind not in ('child', 'admin') then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;
  select * into me from profiles where id = ses.profile_id and active;
  if me.id is null then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;

  -- Welche Zonen darf diese Sitzung betreten? (Die App fragt das nach jeder Anmeldung.)
  if a = 'zoneAccess' then
    if ses.kind = 'admin' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'admin', true,
        'zones', coalesce((select jsonb_agg(id order by id) from zones where status not in ('off', 'archived')), '[]'::jsonb)));
    end if;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'zones', coalesce((select jsonb_agg(z.id order by z.id) from zones z
        where z.status in ('active', 'open')
           or (z.status = 'locked' and exists (select 1 from zone_unlocks u where u.zone_id = z.id and u.profile_id = me.id))), '[]'::jsonb)));
  end if;

  -- Ab hier nur Admin
  if ses.kind <> 'admin' then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;

  if a = 'zoneList' then
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'zones', coalesce((select jsonb_agg(to_jsonb(z) || jsonb_build_object('unlocked', (select count(*) from zone_unlocks u where u.zone_id = z.id)) order by z.id) from zones z), '[]'::jsonb)));
  end if;

  zid := coalesce(p->>'zone', '');
  if not exists (select 1 from zones where id = zid) then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'zone')); end if;

  if a in ('zoneGrant', 'zoneRevoke') then
    begin pid := (p->>'profileId')::uuid; exception when others then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'bad')); end;
    if not exists (select 1 from profiles where id = pid) then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'player')); end if;
    if a = 'zoneGrant' then
      insert into zone_unlocks(profile_id, zone_id, via) values (pid, zid, 'admin') on conflict do nothing;
    else
      delete from zone_unlocks where profile_id = pid and zone_id = zid;
    end if;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  if a = 'zoneRuleSet' then   -- Freischaltregel spaeter festlegen, ohne Code-Aenderung
    update zones set unlock_rule = coalesce(p->'rule', '{}'::jsonb), updated_at = now() where id = zid;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'action'));
end $$;
revoke all on function public.milo_zones(public.sessions, jsonb, text) from public, anon, authenticated;

-- In milo_api einhaengen (nur einmal): alle Aktionen "zone*" gehen an milo_zones (nach der Sitzungspruefung)
do $$
declare d text;
begin
  d := pg_get_functiondef('public.milo_api(jsonb)'::regprocedure);
  if position('milo_zones(ses' in d) = 0 then
    d := replace(d, E'  if a = ''logout'' then', E'  if a like ''zone%'' then return public.milo_zones(ses, p, a); end if;\n\n  if a = ''logout'' then');
    if position('milo_zones(ses' in d) = 0 then raise exception 'Einhängepunkt nicht gefunden'; end if;
    execute d;
  end if;
end $$;
