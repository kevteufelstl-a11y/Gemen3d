-- Milos Lern-Welt: Konten, Rollen, Sitzungen, Freunde (Migration 15.11.2026)
-- Bestehende Tabellen (profiles, game_saves, learning_progress, highscores) bleiben erhalten und werden nur erweitert.
-- Alle Tabellen: RLS an, keine Policies -> nur der Server (Edge Function mit Service-Rolle) kommt an die Daten.

create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  login text not null,
  display_name text not null,
  pw_hash text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists families_login_lower on public.families (lower(login));

alter table public.profiles add column if not exists role text not null default 'child';
alter table public.profiles add column if not exists family_id uuid references public.families(id) on delete cascade;
alter table public.profiles add column if not exists settings jsonb not null default '{}'::jsonb;       -- Lerneinstellungen (nur Eltern/Admin)
alter table public.profiles add column if not exists game_settings jsonb not null default '{}'::jsonb;  -- Spieleinstellungen (Kind darf)
alter table public.profiles add column if not exists friend_code text;
alter table public.profiles add column if not exists last_seen timestamptz;
alter table public.profiles add column if not exists active boolean not null default true;
create unique index if not exists profiles_name_lower on public.profiles (lower(name));
create unique index if not exists profiles_friend_code on public.profiles (friend_code) where friend_code is not null;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_role_check') then
    alter table public.profiles add constraint profiles_role_check check (role in ('admin', 'child'));
  end if;
end $$;

create table if not exists public.sessions (
  token_hash text primary key,
  kind text not null check (kind in ('admin', 'parent', 'child')),
  profile_id uuid references public.profiles(id) on delete cascade,
  family_id uuid references public.families(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index if not exists sessions_expires on public.sessions (expires_at);

create table if not exists public.auth_fails (
  k text not null,
  at timestamptz not null default now()
);
create index if not exists auth_fails_k_at on public.auth_fails (k, at);

create table if not exists public.system_settings (
  k text primary key,
  v jsonb not null
);

create table if not exists public.confirmations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  family_id uuid references public.families(id) on delete cascade,
  task_id text not null,
  task_type text not null,
  data jsonb not null default '{}'::jsonb,
  via text not null default 'passwort',
  confirmed_at timestamptz not null default now(),
  unique (profile_id, task_id)
);

create table if not exists public.friend_requests (
  id uuid primary key default gen_random_uuid(),
  from_id uuid not null references public.profiles(id) on delete cascade,
  to_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  need_from_parent boolean not null default false,
  need_to_parent boolean not null default false,
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  unique (from_id, to_id)
);

create table if not exists public.blocks (
  blocker uuid not null references public.profiles(id) on delete cascade,
  blocked uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker, blocked)
);

create table if not exists public.admin_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor text not null,
  action text not null,
  detail jsonb not null default '{}'::jsonb,
  before jsonb
);

alter table public.families enable row level security;
alter table public.sessions enable row level security;
alter table public.auth_fails enable row level security;
alter table public.system_settings enable row level security;
alter table public.confirmations enable row level security;
alter table public.friend_requests enable row level security;
alter table public.blocks enable row level security;
alter table public.admin_log enable row level security;

-- Bestehendes Admin-Profil als Admin kennzeichnen
update public.profiles set role = 'admin' where name = 'Admin';
insert into public.system_settings (k, v) values ('allowParentSignup', 'true'::jsonb) on conflict (k) do nothing;
