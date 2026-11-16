-- Belohnungssystem: Tages-, Wochen- und Monatsbelohnungen pro Spieler, Bestätigung durch Eltern
create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  family_id uuid references public.families(id) on delete cascade,
  kind text not null check (kind in ('tag', 'woche', 'monat')),
  period text not null,
  choice text not null,
  status text not null default 'offen' check (status in ('offen', 'bestaetigt', 'abgelehnt', 'eingeloest')),
  chosen_at timestamptz not null default now(),
  decided_at timestamptz,
  decided_by text,
  redeemed_at timestamptz,
  unique (profile_id, kind, period)
);
alter table public.rewards enable row level security;
do $$ begin
  if exists (select 1 from pg_roles where rolname = 'anon') then execute 'revoke all on public.rewards from anon, authenticated'; end if;
end $$;

-- Tag geschafft? Tagesprüfung mit mindestens Note 4 (ab 50 %, gerundet wie im Spiel) oder von den Eltern per goal-Markierung freigegeben
create or replace function public.milo_rw_dayok(pid uuid, k text) returns boolean language sql stable set search_path = public as $$
  select coalesce((
    select (s.d->>'goal') = '1' or case when coalesce((s.d->'ex'->>'n')::numeric, 0) > 0 then round(100 * coalesce((s.d->'ex'->>'r')::numeric, 0) / (s.d->'ex'->>'n')::numeric) >= 50 else false end
    from (select g.state->'days'->k as d from game_saves g where g.profile_id = pid and g.game = 'milo3d_days') s
    where jsonb_typeof(s.d) = 'object'), false)
$$;

create or replace function public.milo_rw_status(pid uuid) returns jsonb language plpgsql stable set search_path = public as $$
declare today date := (now() at time zone 'Europe/Berlin')::date; created date; d date; r jsonb := '[]'::jsonb; w jsonb := '[]'::jsonb; m jsonb := '[]'::jsonb;
  ws date; wk text; cnt int; ms date; me date; st date; tot int; okc int; missed jsonb; pk jsonb; i int; ok boolean; wdays int := 5; mdays jsonb;
begin
  select (created_at at time zone 'Europe/Berlin')::date into created from profiles where id = pid;
  -- Tage: letzte 14 Tage
  for i in 0..13 loop
    d := today - i; ok := milo_rw_dayok(pid, d::text);
    select to_jsonb(x) into pk from (select id, choice, status, chosen_at as "chosenAt", decided_at as "decidedAt", redeemed_at as "redeemedAt" from rewards where profile_id = pid and kind = 'tag' and period = d::text) x;
    if ok or i = 0 or pk is not null then r := r || jsonb_build_object('period', d::text, 'reached', ok, 'pick', pk); end if;
  end loop;
  -- Wochen (ISO, Montag bis Sonntag): letzte 6 Wochen
  for i in 0..5 loop
    ws := date_trunc('week', today::timestamp)::date - i * 7; wk := to_char(ws, 'IYYY-"W"IW'); cnt := 0;
    for d in select generate_series(ws, ws + 6, interval '1 day')::date loop
      if d <= today and milo_rw_dayok(pid, d::text) then cnt := cnt + 1; end if;
    end loop;
    select to_jsonb(x) into pk from (select id, choice, status, chosen_at as "chosenAt", decided_at as "decidedAt", redeemed_at as "redeemedAt" from rewards where profile_id = pid and kind = 'woche' and period = wk) x;
    if cnt >= wdays or i = 0 or pk is not null then
      w := w || jsonb_build_object('period', wk, 'from', ws::text, 'to', (ws + 6)::text, 'days', cnt, 'need', wdays, 'reached', cnt >= wdays, 'pick', pk);
    end if;
  end loop;
  -- Monate: letzte 3 Monate. Alle Tage ab dem Tag nach Anlegen des Spielers müssen geschafft sein, keine Ausnahme.
  for i in 0..2 loop
    ms := (date_trunc('month', today::timestamp) - make_interval(months => i))::date; me := (ms + interval '1 month - 1 day')::date;
    st := greatest(ms, created + 1); tot := greatest(0, (me - st) + 1); okc := 0; missed := '[]'::jsonb; mdays := '[]'::jsonb;
    for d in select generate_series(ms, me, interval '1 day')::date loop
      if d < st then continue; end if;
      ok := d <= today and milo_rw_dayok(pid, d::text);
      if ok then okc := okc + 1; end if;
      if d < today and not ok then missed := missed || to_jsonb(d::text); end if;
      mdays := mdays || jsonb_build_object('d', d::text, 'ok', ok, 'future', d > today);
    end loop;
    select to_jsonb(x) into pk from (select id, choice, status, chosen_at as "chosenAt", decided_at as "decidedAt", redeemed_at as "redeemedAt" from rewards where profile_id = pid and kind = 'monat' and period = to_char(ms, 'YYYY-MM')) x;
    if tot > 0 or pk is not null then
      m := m || jsonb_build_object('period', to_char(ms, 'YYYY-MM'), 'from', st::text, 'to', me::text, 'total', tot, 'days', okc, 'missed', missed, 'monthDays', mdays,
        'lost', jsonb_array_length(missed) > 0, 'reached', tot > 0 and okc = tot, 'pick', pk);
    end if;
  end loop;
  return jsonb_build_object('today', today::text, 'weekNeed', wdays, 'tag', r, 'woche', w, 'monat', m);
end $$;

create or replace function public.milo_rewards(ses sessions, p jsonb, a text) returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare me profiles; fam families; ch profiles; rw rewards; k text; per text; c text; stt jsonb; it jsonb; found boolean := false; lk int; ns text; dby text;
begin
  -------------------------------------------------- Kind: eigene Belohnungen
  if a in ('rewardList', 'rewardPick', 'rewardParentSet') then
    if ses.kind <> 'child' and ses.kind <> 'admin' then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;
    select * into me from profiles where id = ses.profile_id and active;
    if me.id is null then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;

    if a = 'rewardList' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'rewards', milo_rw_status(me.id)));
    end if;

    if a = 'rewardPick' then
      k := p->>'kind'; per := left(coalesce(p->>'period', ''), 10); c := left(btrim(coalesce(p->>'choice', '')), 140);
      if k not in ('tag', 'woche', 'monat') or c = '' then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'bad')); end if;
      stt := milo_rw_status(me.id);
      for it in select * from jsonb_array_elements(stt->k) loop
        if it->>'period' = per and (it->>'reached')::boolean then found := true; end if;
      end loop;
      if not found then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'not_reached')); end if;
      select * into rw from rewards where profile_id = me.id and kind = k and period = per;
      if rw.id is not null then
        if rw.status <> 'abgelehnt' then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'already')); end if;
        update rewards set choice = c, status = 'offen', chosen_at = now(), decided_at = null, decided_by = null, redeemed_at = null where id = rw.id;
      else
        insert into rewards (profile_id, family_id, kind, period, choice) values (me.id, me.family_id, k, per, c) on conflict (profile_id, kind, period) do nothing;
      end if;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'rewards', milo_rw_status(me.id)));
    end if;

    -- Eltern bestätigen am Gerät des Kindes: Elternpasswort der EIGENEN Familie nötig
    if a = 'rewardParentSet' then
      if me.family_id is null then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'no_family')); end if;
      select * into fam from families where id = me.family_id;
      lk := milo_locked('fampw:' || fam.id);
      if lk > 0 then return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'locked', 'minutes', lk)); end if;
      if not milo_pwok(p->>'parentPassword', fam.pw_hash) then
        perform milo_fail('fampw:' || fam.id);
        return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'wrong'));
      end if;
      ns := p->>'status';
      if ns not in ('offen', 'bestaetigt', 'abgelehnt', 'eingeloest') then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'bad')); end if;
      begin select * into rw from rewards where id = (p->>'id')::uuid and profile_id = me.id; exception when others then rw := null; end;
      if rw.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
      update rewards set status = ns, decided_at = now(), decided_by = 'passwort', redeemed_at = case when ns = 'eingeloest' then now() else null end where id = rw.id;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'rewards', milo_rw_status(me.id)));
    end if;
  end if;

  -------------------------------------------------- Eltern / Admin
  if a in ('rewardParentList', 'rewardSetParent') then
    if ses.kind = 'parent' then
      select * into fam from families where id = ses.family_id and active;
      if fam.id is null then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;
    elsif ses.kind <> 'admin' then
      return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden'));
    end if;
    dby := case when ses.kind = 'admin' then 'admin' else 'elternbereich' end;
    if a = 'rewardParentList' then
      begin select * into ch from profiles where id = (p->>'childId')::uuid and role = 'child'; exception when others then ch := null; end;
      if ch.id is null or (ses.kind = 'parent' and ch.family_id is distinct from fam.id) then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'rewards', milo_rw_status(ch.id),
        'all', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'kind', kind, 'period', period, 'choice', choice, 'status', status, 'chosenAt', chosen_at, 'decidedAt', decided_at, 'redeemedAt', redeemed_at) order by chosen_at desc)
          from (select * from rewards where profile_id = ch.id order by chosen_at desc limit 60) q), '[]'::jsonb)));
    end if;
    -- rewardSetParent
    ns := p->>'status';
    if ns not in ('offen', 'bestaetigt', 'abgelehnt', 'eingeloest') then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'bad')); end if;
    begin select * into rw from rewards where id = (p->>'id')::uuid; exception when others then rw := null; end;
    if rw.id is null or (ses.kind = 'parent' and rw.family_id is distinct from fam.id) then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
    update rewards set status = ns, decided_at = now(), decided_by = dby, redeemed_at = case when ns = 'eingeloest' then now() else null end where id = rw.id;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden', 'action', a));
end $$;

-- In milo_api einhängen (nur einmal): alle Aktionen "reward*" gehen an milo_rewards
do $$ declare def text; begin
  select pg_get_functiondef('public.milo_api(jsonb)'::regprocedure) into def;
  if position('milo_rewards(ses' in def) = 0 then
    def := replace(def, E'  if a = ''logout'' then', E'  if a like ''reward%'' then return public.milo_rewards(ses, p, a); end if;\n\n  if a = ''logout'' then');
    if position('milo_rewards(ses' in def) = 0 then raise exception 'Einhängepunkt nicht gefunden'; end if;
    execute def;
  end if;
end $$;

do $$ declare f record; begin
  for f in select p.oid::regprocedure sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.proname like 'milo\_%' loop
    execute format('revoke all on function %s from public', f.sig);
    if exists (select 1 from pg_roles where rolname = 'anon') then execute format('revoke all on function %s from anon, authenticated', f.sig); end if;
    if exists (select 1 from pg_roles where rolname = 'service_role') then execute format('grant execute on function %s to service_role', f.sig); end if;
  end loop;
end $$;
