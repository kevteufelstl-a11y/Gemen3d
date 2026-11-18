-- Trostpreis (Note 5 oder 6 in der Tagesprüfung), je 10 Plätze pro Kind. Rein additiv.
do $$ begin
  alter table public.rewards drop constraint if exists rewards_kind_check;
  alter table public.rewards add constraint rewards_kind_check check (kind in ('tag', 'woche', 'monat', 'trost'));
end $$;

-- Trostpreis: Tagesprüfung gemacht, aber Note 5 oder 6 (unter 50 %), und der Tag zählt nicht anders als geschafft (keine Eltern-Freigabe)
create or replace function public.milo_rw_trost(pid uuid, k text) returns boolean language sql stable set search_path = public as $$
  select not milo_rw_dayok(pid, k) and coalesce((
    select coalesce((s.d->'ex'->>'n')::numeric, 0) > 0 and round(100 * coalesce((s.d->'ex'->>'r')::numeric, 0) / (s.d->'ex'->>'n')::numeric) < 50
    from (select g.state->'days'->k as d from game_saves g where g.profile_id = pid and g.game = 'milo3d_days') s
    where jsonb_typeof(s.d) = 'object'), false)
$$;

create or replace function public.milo_rw_status(pid uuid) returns jsonb language plpgsql stable set search_path = public as $$
declare today date := (now() at time zone 'Europe/Berlin')::date; created date; d date; r jsonb := '[]'::jsonb; tp jsonb := '[]'::jsonb; w jsonb := '[]'::jsonb; m jsonb := '[]'::jsonb;
  ws date; wk text; cnt int; ms date; me date; st date; tot int; okc int; missed jsonb; pk jsonb; i int; ok boolean; wdays int := 5; mdays jsonb;
begin
  select (created_at at time zone 'Europe/Berlin')::date into created from profiles where id = pid;
  -- Tage: letzte 14 Tage
  for i in 0..13 loop
    d := today - i; ok := milo_rw_dayok(pid, d::text);
    select to_jsonb(x) into pk from (select id, choice, status, chosen_at as "chosenAt", decided_at as "decidedAt", redeemed_at as "redeemedAt" from rewards where profile_id = pid and kind = 'tag' and period = d::text) x;
    if ok or i = 0 or pk is not null then r := r || jsonb_build_object('period', d::text, 'reached', ok, 'pick', pk); end if;
  end loop;
  -- Trostpreise: Tage mit Tagesprüfung Note 5 oder 6 (letzte 14 Tage)
  for i in 0..13 loop
    d := today - i; ok := milo_rw_trost(pid, d::text);
    select to_jsonb(x) into pk from (select id, choice, status, chosen_at as "chosenAt", decided_at as "decidedAt", redeemed_at as "redeemedAt" from rewards where profile_id = pid and kind = 'trost' and period = d::text) x;
    if ok or pk is not null then tp := tp || jsonb_build_object('period', d::text, 'reached', ok, 'pick', pk); end if;
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
  return jsonb_build_object('today', today::text, 'weekNeed', wdays, 'tag', r, 'trost', tp, 'woche', w, 'monat', m);
end $$;


do $$ declare def text; begin
  select pg_get_functiondef('public.milo_rewards(public.sessions, jsonb, text)'::regprocedure) into def;
  if position('''trost''' in def) = 0 then
    def := replace(def, '''monat'')', '''monat'', ''trost'')');
    if position('''trost''' in def) = 0 then raise exception 'milo_rewards: Einhängepunkt nicht gefunden'; end if;
    execute def;
  end if;
  select pg_get_functiondef('public.milo_clean_learn(jsonb)'::regprocedure) into def;
  if position('''trost''' in def) = 0 then
    def := replace(def, '''monat''', '''monat'', ''trost''');
    if position('''trost''' in def) = 0 then raise exception 'milo_clean_learn: Einhängepunkt nicht gefunden'; end if;
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
