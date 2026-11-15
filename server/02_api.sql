-- Milos Lern-Welt: gesamte Server-Logik. Aufruf nur über die Edge Function "api" (Service-Rolle).
-- Rückgabe: {"s": HTTP-Status, "b": Antwort}

create or replace function public.milo_norm(t text) returns text language sql immutable as $$
  select regexp_replace(btrim(coalesce(t, '')), '\s+', ' ', 'g')
$$;

create or replace function public.milo_hash(pw text) returns text language sql volatile as $$
  select extensions.crypt(pw, extensions.gen_salt('bf', 10))
$$;

create or replace function public.milo_pwok(pw text, h text) returns boolean language sql stable as $$
  select h is not null and pw is not null and extensions.crypt(pw, h) = h
$$;

create or replace function public.milo_sha(t text) returns text language sql immutable as $$
  select encode(extensions.digest(t, 'sha256'), 'hex')
$$;

-- Schutz vor Ausprobieren: nach 5 Fehlversuchen in 15 Minuten ist für 15 Minuten gesperrt
create or replace function public.milo_locked(key text) returns integer language plpgsql as $$
declare n int; last timestamptz;
begin
  delete from public.auth_fails where at < now() - interval '1 day';
  select count(*), max(at) into n, last from public.auth_fails where k = key and at > now() - interval '15 minutes';
  if n >= 5 then return greatest(1, ceil(extract(epoch from (last + interval '15 minutes' - now())) / 60)::int); end if;
  return 0;
end $$;

create or replace function public.milo_fail(key text) returns void language sql as $$
  insert into public.auth_fails (k) values (key)
$$;

create or replace function public.milo_token(kind text, pid uuid, fid uuid, ttl interval) returns text language plpgsql as $$
declare tok text := encode(extensions.gen_random_bytes(24), 'hex');
begin
  delete from public.sessions where expires_at < now();
  insert into public.sessions (token_hash, kind, profile_id, family_id, expires_at) values (public.milo_sha(tok), kind, pid, fid, now() + ttl);
  return tok;
end $$;

create or replace function public.milo_code() returns text language plpgsql as $$
declare c text; chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
begin
  loop
    c := '';
    for i in 1..6 loop c := c || substr(chars, 1 + floor(random() * length(chars))::int, 1); end loop;
    exit when not exists (select 1 from public.profiles where friend_code = c);
  end loop;
  return c;
end $$;

-- Lerneinstellungen: nur bekannte Schlüssel, nur gültige Werte
create or replace function public.milo_clean_learn(s jsonb) returns jsonb language plpgsql immutable as $$
declare o jsonb := '{}'::jsonb;
begin
  s := coalesce(s, '{}'::jsonb);
  if jsonb_typeof(s->'dailyMinutes') = 'number' then o := o || jsonb_build_object('dailyMinutes', least(120, greatest(5, (s->>'dailyMinutes')::numeric::int))); end if;
  if jsonb_typeof(s->'maxMinutes') = 'number' then o := o || jsonb_build_object('maxMinutes', least(300, greatest(0, (s->>'maxMinutes')::numeric::int))); end if;
  if jsonb_typeof(s->'sessionMinutes') = 'number' then o := o || jsonb_build_object('sessionMinutes', least(120, greatest(0, (s->>'sessionMinutes')::numeric::int))); end if;
  if jsonb_typeof(s->'pauseMinutes') = 'number' then o := o || jsonb_build_object('pauseMinutes', least(60, greatest(0, (s->>'pauseMinutes')::numeric::int))); end if;
  if jsonb_typeof(s->'examQuestions') = 'number' then o := o || jsonb_build_object('examQuestions', least(20, greatest(5, (s->>'examQuestions')::numeric::int))); end if;
  if jsonb_typeof(s->'goalTasks') = 'number' then o := o || jsonb_build_object('goalTasks', least(200, greatest(0, (s->>'goalTasks')::numeric::int))); end if;
  if jsonb_typeof(s->'goalText') = 'string' then o := o || jsonb_build_object('goalText', left(s->>'goalText', 200)); end if;
  if s->>'distraction' in ('aus', 'auto', '1', '2', '3') then o := o || jsonb_build_object('distraction', s->>'distraction'); end if;
  if jsonb_typeof(s->'friendApproval') = 'boolean' then o := o || jsonb_build_object('friendApproval', s->'friendApproval'); end if;
  if jsonb_typeof(s->'multiplayer') = 'boolean' then o := o || jsonb_build_object('multiplayer', s->'multiplayer'); end if;
  if jsonb_typeof(s->'subjects') = 'array' then
    o := o || jsonb_build_object('subjects', coalesce((select jsonb_agg(distinct (x)::int) from jsonb_array_elements_text(s->'subjects') x where x ~ '^[0-9]{1,2}$'), '[]'::jsonb));
  end if;
  if jsonb_typeof(s->'blocksOff') = 'array' then
    o := o || jsonb_build_object('blocksOff', coalesce((select jsonb_agg(distinct x) from (select x from jsonb_array_elements_text(s->'blocksOff') x where x ~ '^[0-9]{1,2}\.[0-9]{1,3}$' limit 200) q), '[]'::jsonb));
  end if;
  return o;
end $$;

create or replace function public.milo_child_pub(p public.profiles) returns jsonb language sql stable as $$
  select jsonb_build_object('id', p.id, 'name', p.name, 'figure', coalesce(p.figure, ''), 'hasPin', p.pin_hash is not null,
    'active', p.active, 'lastSeen', p.last_seen, 'online', coalesce(p.last_seen > now() - interval '2 minutes', false),
    'friendCode', p.friend_code, 'settings', p.settings)
$$;

create or replace function public.milo_learn_sec(pid uuid) returns numeric language sql stable as $$
  select coalesce(sum(coalesce((d.value->>'sec')::numeric, 0)), 0)
  from public.game_saves g, jsonb_each(case when jsonb_typeof(g.state->'days') = 'object' then g.state->'days' else '{}'::jsonb end) d
  where g.profile_id = pid and g.game = 'milo3d_days'
$$;

create or replace function public.milo_api(p jsonb) returns jsonb
language plpgsql
set search_path = public, extensions
as $$
declare
  a text := coalesce(p->>'action', '');
  ses public.sessions;
  me public.profiles;
  fam public.families;
  ch public.profiles;
  other public.profiles;
  rq public.friend_requests;
  ad public.profiles;
  r jsonb;
  t text;
  n int;
  lk int;
  jv jsonb;
  pin text;
begin
  ---------------------------------------------------------------- öffentlich
  if a = 'status' then
    select * into ad from profiles where role = 'admin' limit 1;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'setupDone', coalesce(ad.pin_hash is not null, false),
      'allowParentSignup', coalesce((select v from system_settings where k = 'allowParentSignup'), 'true'::jsonb),
      'epoch', coalesce((select v->>'epoch' from system_settings where k = 'epoch'), '')));
  end if;

  if a = 'getConfig' then
    select * into ad from profiles where role = 'admin' limit 1;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'config',
      (select state from game_saves where profile_id = ad.id and game = 'milo3d_config')));
  end if;

  -- Ersteinrichtung des Admins: nur mit dem einmaligen Aktivierungsschlüssel, danach dauerhaft gesperrt
  if a = 'adminSetup' then
    select * into ad from profiles where role = 'admin' limit 1 for update;
    if ad.pin_hash is not null or coalesce((select (v->>'done')::boolean from system_settings where k = 'setup'), false) then
      return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'setup_done'));
    end if;
    lk := milo_locked('setup');
    if lk > 0 then return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'locked', 'minutes', lk)); end if;
    if (select v->>'keyHash' from system_settings where k = 'setup') is distinct from milo_sha(upper(btrim(coalesce(p->>'key', '')))) then
      perform milo_fail('setup');
      return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'wrong_key'));
    end if;
    if length(coalesce(p->>'password', '')) < 8 then
      return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'pw_short'));
    end if;
    if ad.id is null then
      insert into profiles (name, role, pin_hash) values ('Admin', 'admin', milo_hash(p->>'password')) returning * into ad;
    else
      update profiles set pin_hash = milo_hash(p->>'password') where id = ad.id;
    end if;
    insert into system_settings (k, v) values ('setup', jsonb_build_object('done', true, 'at', now()))
      on conflict (k) do update set v = excluded.v;
    insert into admin_log (actor, action) values ('Admin', 'Ersteinrichtung abgeschlossen');
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'token', milo_token('admin', ad.id, null, interval '12 hours')));
  end if;

  if a = 'adminLogin' then
    select * into ad from profiles where role = 'admin' limit 1;
    if ad.pin_hash is null then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'no_setup')); end if;
    lk := milo_locked('admin');
    if lk > 0 then return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'locked', 'minutes', lk)); end if;
    if not milo_pwok(p->>'password', ad.pin_hash) then
      perform milo_fail('admin');
      return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'wrong'));
    end if;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'token', milo_token('admin', ad.id, null, interval '12 hours')));
  end if;

  if a = 'parentRegister' then
    if not coalesce((select v from system_settings where k = 'setup')->>'done', 'false')::boolean then
      return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'no_setup'));
    end if;
    if not coalesce((select v::text::boolean from system_settings where k = 'allowParentSignup'), true) then
      return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'signup_closed'));
    end if;
    lk := milo_locked('signup:' || coalesce(p->>'_ip', ''));
    if lk > 0 then return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'locked', 'minutes', lk)); end if;
    t := milo_norm(p->>'login');
    if length(t) < 3 or length(t) > 30 then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'login')); end if;
    if length(coalesce(p->>'password', '')) < 6 then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'pw_short')); end if;
    if exists (select 1 from families where lower(login) = lower(t)) then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'exists')); end if;
    insert into families (login, display_name, pw_hash) values (t, coalesce(nullif(milo_norm(p->>'displayName'), ''), t), milo_hash(p->>'password')) returning * into fam;
    perform milo_fail('signup:' || coalesce(p->>'_ip', ''));  -- zählt als Versuch: höchstens 5 neue Familien pro 15 Minuten und Gerät/Netz
    insert into admin_log (actor, action, detail) values ('Eltern ' || fam.login, 'Elternkonto erstellt', jsonb_build_object('family', fam.id));
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'token', milo_token('parent', null, fam.id, interval '2 hours'),
      'family', jsonb_build_object('id', fam.id, 'login', fam.login, 'name', fam.display_name)));
  end if;

  if a = 'parentLogin' then
    t := milo_norm(p->>'login');
    lk := milo_locked('parent:' || lower(t));
    if lk > 0 then return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'locked', 'minutes', lk)); end if;
    select * into fam from families where lower(login) = lower(t);
    if fam.id is null or not fam.active or not milo_pwok(p->>'password', fam.pw_hash) then
      perform milo_fail('parent:' || lower(t));
      return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'wrong'));
    end if;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'token', milo_token('parent', null, fam.id, interval '2 hours'),
      'family', jsonb_build_object('id', fam.id, 'login', fam.login, 'name', fam.display_name)));
  end if;

  if a = 'childLogin' then
    t := milo_norm(p->>'name'); pin := coalesce(p->>'pin', '');
    lk := milo_locked('child:' || lower(t));
    if lk > 0 then return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'locked', 'minutes', lk)); end if;
    select c.* into ch from profiles c left join families f on f.id = c.family_id
      where lower(c.name) = lower(t) and c.role = 'child' and c.active and coalesce(f.active, false);
    if ch.id is null then
      perform milo_fail('child:' || lower(t));
      return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'wrong'));
    end if;
    if ch.pin_hash is null then
      -- Eltern haben kein Passwort vergeben: das Kind wählt es bei der ersten Anmeldung selbst
      if pin !~ '^[0-9]{4,8}$' then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'pin_format', 'firstLogin', true)); end if;
      update profiles set pin_hash = milo_hash(pin) where id = ch.id;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'firstLogin', true,
        'token', milo_token('child', ch.id, ch.family_id, interval '60 days'), 'profile', milo_child_pub(ch)));
    end if;
    if not milo_pwok(pin, ch.pin_hash) then
      perform milo_fail('child:' || lower(t));
      return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'wrong'));
    end if;
    update profiles set last_seen = now() where id = ch.id;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'firstLogin', false,
      'token', milo_token('child', ch.id, ch.family_id, interval '60 days'), 'profile', milo_child_pub(ch)));
  end if;

  -- Kinder eines Familien-Geräts für die Auswahl (nur Name + Bild)
  if a = 'familyPlayers' then
    begin
      select * into fam from families where id = (p->>'familyId')::uuid and active;
    exception when others then fam := null;
    end;
    if fam.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'no_family')); end if;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'family', fam.display_name,
      'players', coalesce((select jsonb_agg(jsonb_build_object('name', name, 'figure', coalesce(figure, ''), 'hasPin', pin_hash is not null) order by created_at)
        from profiles where family_id = fam.id and role = 'child' and active), '[]'::jsonb)));
  end if;

  ---------------------------------------------------------------- ab hier: Sitzung nötig
  select * into ses from sessions where token_hash = milo_sha(coalesce(p->>'token', '')) and expires_at > now();
  if ses.token_hash is null then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;

  if a = 'logout' then
    delete from sessions where token_hash = ses.token_hash;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  ---------------------------------------------------------------- Kind (und Admin beim Spielen)
  if ses.kind in ('child', 'admin') and a in ('me', 'ping', 'loadAll', 'save', 'progress', 'highscore', 'setFigure', 'setGameSettings', 'confirmTask', 'parentCheck',
      'friendList', 'friendSearch', 'friendRequest', 'friendRespond', 'friendRemove', 'block', 'unblock') then
    select * into me from profiles where id = ses.profile_id;
    if me.id is null or not me.active then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;
    if ses.kind = 'child' and not exists (select 1 from families where id = me.family_id and active) then
      return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session'));
    end if;
    update profiles set last_seen = now() where id = me.id;

    if a = 'me' or a = 'ping' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'profile', milo_child_pub(me) || jsonb_build_object('gameSettings', me.game_settings, 'role', me.role),
        'family', (select display_name from families where id = me.family_id),
        'friendRequests', (select count(*) from friend_requests where to_id = me.id and status = 'pending' and not need_from_parent)));
    end if;

    if a = 'loadAll' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
        'saves', coalesce((select jsonb_agg(jsonb_build_object('game', game, 'state', state, 'updated_at', updated_at)) from game_saves where profile_id = me.id), '[]'::jsonb),
        'progress', coalesce((select jsonb_agg(jsonb_build_object('question_id', question_id, 'ever_right', ever_right, 'ever_wrong', ever_wrong)) from learning_progress where profile_id = me.id), '[]'::jsonb),
        'confirmations', coalesce((select jsonb_agg(jsonb_build_object('taskId', task_id, 'type', task_type, 'data', data, 'at', confirmed_at)) from confirmations where profile_id = me.id), '[]'::jsonb),
        'settings', me.settings, 'gameSettings', me.game_settings));
    end if;

    if a = 'save' then
      t := coalesce(p->>'game', '');
      if t not in ('milo3d_days', 'milo3d_game') then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'game')); end if;
      if length((p->'state')::text) > 900000 then return jsonb_build_object('s', 413, 'b', jsonb_build_object('error', 'too_big')); end if;
      insert into game_saves (profile_id, game, state, updated_at) values (me.id, t, coalesce(p->'state', '{}'::jsonb), now())
        on conflict (profile_id, game) do update set state = excluded.state, updated_at = now();
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'progress' then
      insert into learning_progress (profile_id, question_id, correct, ever_right, ever_wrong, answered_at)
      select me.id, x.qid, x.ok, x.anyok, x.anybad, now() from (
        select left(e->>'question_id', 40) qid, (array_agg(coalesce((e->>'correct')::boolean, false) order by ord desc))[1] ok,
          bool_or(coalesce((e->>'correct')::boolean, false)) anyok, bool_or(not coalesce((e->>'correct')::boolean, false)) anybad
        from jsonb_array_elements(case when jsonb_typeof(p->'answers') = 'array' then p->'answers' else '[]'::jsonb end) with ordinality as z(e, ord)
        where ord <= 500 and coalesce(e->>'question_id', '') <> ''
        group by 1) x
      on conflict (profile_id, question_id) do update set correct = excluded.correct, answered_at = now(),
        ever_right = learning_progress.ever_right or excluded.ever_right, ever_wrong = learning_progress.ever_wrong or excluded.ever_wrong;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'highscore' then
      insert into highscores (profile_id, game, score) values (me.id, left(coalesce(p->>'game', ''), 40), coalesce((p->>'score')::numeric::int, 0));
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'setFigure' then
      update profiles set figure = left(coalesce(p->>'figure', ''), 16) where id = me.id;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    -- Spieleinstellungen: nur Optik/Spiel, keine Lerneinstellungen (die stehen in einer anderen Spalte)
    if a = 'setGameSettings' then
      jv := coalesce((select jsonb_object_agg(key, value) from jsonb_each(case when jsonb_typeof(p->'settings') = 'object' then p->'settings' else '{}'::jsonb end)
        where key in ('monsters', 'quality', 'day', 'sound', 'music', 'pov', 'camera', 'weapon', 'look')), '{}'::jsonb);
      if length(jv::text) > 4000 then return jsonb_build_object('s', 413, 'b', jsonb_build_object('error', 'too_big')); end if;
      update profiles set game_settings = jv where id = me.id;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'gameSettings', jv));
    end if;

    -- Elternpasswort prüfen (z. B. Tag bestätigen) und Aufgaben bestätigen: Passwort der EIGENEN Familie
    if a in ('parentCheck', 'confirmTask') then
      if me.family_id is null then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'no_family')); end if;
      select * into fam from families where id = me.family_id;
      lk := milo_locked('fampw:' || fam.id);
      if lk > 0 then return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'locked', 'minutes', lk)); end if;
      if not milo_pwok(p->>'parentPassword', fam.pw_hash) then
        perform milo_fail('fampw:' || fam.id);
        return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'wrong'));
      end if;
      if a = 'parentCheck' then return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true)); end if;
      t := left(coalesce(p->>'taskId', ''), 60);
      if t = '' then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'task')); end if;
      insert into confirmations (profile_id, family_id, task_id, task_type, data, via)
        values (me.id, fam.id, t, left(coalesce(p->>'taskType', 'aufgabe'), 30), coalesce(p->'data', '{}'::jsonb), 'passwort')
        on conflict (profile_id, task_id) do nothing;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
        'confirmation', (select jsonb_build_object('taskId', task_id, 'type', task_type, 'data', data, 'at', confirmed_at) from confirmations where profile_id = me.id and task_id = t)));
    end if;

    ------------------------------------------------ Freunde
    if a = 'friendList' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'myCode', me.friend_code,
        'friends', coalesce((select jsonb_agg(jsonb_build_object('id', o.id, 'name', o.name, 'figure', coalesce(o.figure, ''),
            'online', coalesce(o.last_seen > now() - interval '2 minutes', false), 'since', f.decided_at) order by o.name)
          from friend_requests f join profiles o on o.id = case when f.from_id = me.id then f.to_id else f.from_id end
          where (f.from_id = me.id or f.to_id = me.id) and f.status = 'accepted' and not f.need_from_parent and not f.need_to_parent and o.active), '[]'::jsonb),
        'incoming', coalesce((select jsonb_agg(jsonb_build_object('id', f.id, 'name', o.name, 'figure', coalesce(o.figure, ''), 'waitParent', f.need_to_parent))
          from friend_requests f join profiles o on o.id = f.from_id
          where f.to_id = me.id and f.status in ('pending', 'accepted') and not f.need_from_parent and (f.status = 'pending' or f.need_to_parent)), '[]'::jsonb),
        'outgoing', coalesce((select jsonb_agg(jsonb_build_object('id', f.id, 'name', o.name, 'figure', coalesce(o.figure, ''), 'waitParent', f.need_from_parent))
          from friend_requests f join profiles o on o.id = f.to_id
          where f.from_id = me.id and (f.status = 'pending' or (f.status = 'accepted' and (f.need_from_parent or f.need_to_parent)))), '[]'::jsonb),
        'blocked', coalesce((select jsonb_agg(o.name) from blocks b join profiles o on o.id = b.blocked where b.blocker = me.id), '[]'::jsonb)));
    end if;

    if a in ('friendSearch', 'friendRequest', 'block', 'unblock') then
      t := milo_norm(p->>'q');
      select * into other from profiles where role = 'child' and active and (lower(name) = lower(t) or friend_code = upper(replace(t, '-', '')));
      if other.id is null or other.id = me.id then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
      if a = 'friendSearch' then
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'player', jsonb_build_object('name', other.name, 'figure', coalesce(other.figure, ''))));
      end if;
      if a = 'block' then
        insert into blocks (blocker, blocked) values (me.id, other.id) on conflict do nothing;
        delete from friend_requests where (from_id = me.id and to_id = other.id) or (from_id = other.id and to_id = me.id);
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
      end if;
      if a = 'unblock' then
        delete from blocks where blocker = me.id and blocked = other.id;
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
      end if;
      -- Anfrage: Spam-Schutz und Blockierungen
      if exists (select 1 from blocks where (blocker = other.id and blocked = me.id) or (blocker = me.id and blocked = other.id)) then
        return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'blocked'));
      end if;
      if exists (select 1 from friend_requests where (from_id = me.id and to_id = other.id) or (from_id = other.id and to_id = me.id)) then
        select * into rq from friend_requests where (from_id = me.id and to_id = other.id) or (from_id = other.id and to_id = me.id) limit 1;
        if rq.status = 'declined' and rq.from_id = me.id and rq.decided_at > now() - interval '7 days' then
          return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'declined_recently'));
        end if;
        if rq.status <> 'declined' then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'exists')); end if;
        delete from friend_requests where id = rq.id;
      end if;
      if (select count(*) from friend_requests where from_id = me.id and status = 'pending') >= 10
         or (select count(*) from friend_requests where from_id = me.id and created_at > now() - interval '1 day') >= 20 then
        return jsonb_build_object('s', 429, 'b', jsonb_build_object('error', 'too_many'));
      end if;
      insert into friend_requests (from_id, to_id, need_from_parent)
        values (me.id, other.id, ses.kind = 'child' and coalesce((me.settings->>'friendApproval')::boolean, true));
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
        'waitParent', ses.kind = 'child' and coalesce((me.settings->>'friendApproval')::boolean, true)));
    end if;

    if a = 'friendRespond' then
      begin select * into rq from friend_requests where id = (p->>'id')::uuid and to_id = me.id and status = 'pending' and not need_from_parent;
      exception when others then rq := null; end;
      if rq.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
      if coalesce((p->>'accept')::boolean, false) then
        update friend_requests set status = 'accepted', decided_at = now(),
          need_to_parent = ses.kind = 'child' and coalesce((me.settings->>'friendApproval')::boolean, true) where id = rq.id;
      else
        update friend_requests set status = 'declined', decided_at = now() where id = rq.id;
      end if;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'friendRemove' then
      begin
        delete from friend_requests where (from_id = me.id and to_id = (p->>'id')::uuid) or (to_id = me.id and from_id = (p->>'id')::uuid) or (id = (p->>'id')::uuid and (from_id = me.id or to_id = me.id));
      exception when others then null; end;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;
  end if;

  ---------------------------------------------------------------- Eltern (und Admin)
  if a in ('familyOverview', 'childCreate', 'childUpdate', 'childDelete', 'childSettings', 'childData', 'confirmTaskParent', 'friendApprove', 'familyPassword') then
    if ses.kind = 'parent' then
      select * into fam from families where id = ses.family_id and active;
      if fam.id is null then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;
    elsif ses.kind = 'admin' then
      begin select * into fam from families where id = (p->>'familyId')::uuid; exception when others then fam := null; end;
      if fam.id is null and a in ('familyOverview', 'childCreate', 'familyPassword') then
        return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'family'));
      end if;
    else
      return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden'));
    end if;

    -- Kind muss zur eigenen Familie gehören (Admin: zu irgendeiner)
    if a in ('childUpdate', 'childDelete', 'childSettings', 'childData', 'confirmTaskParent') then
      begin select * into ch from profiles where id = (p->>'childId')::uuid and role = 'child'; exception when others then ch := null; end;
      if ch.id is null or (ses.kind = 'parent' and ch.family_id is distinct from fam.id) then
        return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found'));
      end if;
    end if;

    if a = 'familyOverview' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
        'family', jsonb_build_object('id', fam.id, 'login', fam.login, 'name', fam.display_name),
        'children', coalesce((select jsonb_agg(milo_child_pub(c) || jsonb_build_object('learnSec', milo_learn_sec(c.id)) order by c.created_at) from profiles c where c.family_id = fam.id and c.role = 'child'), '[]'::jsonb),
        'friendApprovals', coalesce((select jsonb_agg(jsonb_build_object('id', f.id, 'child', c.name, 'other', o.name, 'otherFigure', coalesce(o.figure, ''),
              'direction', case when f.from_id = c.id then 'out' else 'in' end))
          from friend_requests f join profiles c on c.family_id = fam.id and ((f.from_id = c.id and f.need_from_parent) or (f.to_id = c.id and f.need_to_parent))
          join profiles o on o.id = case when f.from_id = c.id then f.to_id else f.from_id end), '[]'::jsonb)));
    end if;

    if a = 'childCreate' then
      t := milo_norm(p->>'name');
      if length(t) < 2 or length(t) > 20 or lower(t) = 'admin' then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'name')); end if;
      if exists (select 1 from profiles where lower(name) = lower(t)) then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'exists')); end if;
      pin := nullif(coalesce(p->>'pin', ''), '');
      if pin is not null and pin !~ '^[0-9]{4,8}$' then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'pin_format')); end if;
      if (select count(*) from profiles where family_id = fam.id) >= 12 then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'too_many')); end if;
      insert into profiles (name, role, family_id, figure, pin_hash, friend_code, settings)
        values (t, 'child', fam.id, left(coalesce(p->>'figure', ''), 16), case when pin is null then null else milo_hash(pin) end, milo_code(),
          milo_clean_learn(coalesce(p->'settings', '{}'::jsonb)) || jsonb_build_object('friendApproval', true))
        returning * into ch;
      insert into admin_log (actor, action, detail) values (case when ses.kind = 'admin' then 'Admin' else 'Eltern ' || fam.login end, 'Kind angelegt', jsonb_build_object('child', ch.name));
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'child', milo_child_pub(ch)));
    end if;

    if a = 'childUpdate' then
      if p ? 'name' then
        t := milo_norm(p->>'name');
        if length(t) < 2 or length(t) > 20 or lower(t) = 'admin' then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'name')); end if;
        if exists (select 1 from profiles where lower(name) = lower(t) and id <> ch.id) then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'exists')); end if;
        update profiles set name = t where id = ch.id;
      end if;
      if p ? 'figure' then update profiles set figure = left(coalesce(p->>'figure', ''), 16) where id = ch.id; end if;
      if p ? 'active' then update profiles set active = coalesce((p->>'active')::boolean, true) where id = ch.id; end if;
      if p ? 'pin' then
        pin := nullif(coalesce(p->>'pin', ''), '');
        if pin is not null and pin !~ '^[0-9]{4,8}$' then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'pin_format')); end if;
        update profiles set pin_hash = case when pin is null then null else milo_hash(pin) end where id = ch.id;
        delete from sessions where profile_id = ch.id;  -- neues Passwort: alte Anmeldungen ungültig
      end if;
      select * into ch from profiles where id = ch.id;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'child', milo_child_pub(ch)));
    end if;

    if a = 'childDelete' then
      if coalesce(p->>'confirmName', '') <> ch.name then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'confirm')); end if;
      insert into admin_log (actor, action, detail, before) values (case when ses.kind = 'admin' then 'Admin' else 'Eltern ' || fam.login end, 'Kind gelöscht', jsonb_build_object('child', ch.name),
        jsonb_build_object('profile', to_jsonb(ch) - 'pin_hash', 'saves', (select jsonb_agg(to_jsonb(g)) from game_saves g where g.profile_id = ch.id)));
      delete from profiles where id = ch.id;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'childSettings' then
      jv := milo_clean_learn(p->'settings');
      insert into admin_log (actor, action, detail, before) values (case when ses.kind = 'admin' then 'Admin' else 'Eltern ' || fam.login end, 'Lerneinstellungen geändert', jsonb_build_object('child', ch.name, 'new', jv), ch.settings);
      update profiles set settings = jv where id = ch.id;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'settings', jv));
    end if;

    if a = 'childData' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'child', milo_child_pub(ch),
        'days', (select state->'days' from game_saves where profile_id = ch.id and game = 'milo3d_days'),
        'progress', coalesce((select jsonb_agg(jsonb_build_object('q', question_id, 'r', ever_right, 'w', ever_wrong, 'last', correct)) from learning_progress where profile_id = ch.id), '[]'::jsonb),
        'confirmations', coalesce((select jsonb_agg(jsonb_build_object('taskId', task_id, 'type', task_type, 'data', data, 'at', confirmed_at, 'via', via) order by confirmed_at desc) from confirmations where profile_id = ch.id), '[]'::jsonb),
        'friends', coalesce((select jsonb_agg(o.name) from friend_requests f join profiles o on o.id = case when f.from_id = ch.id then f.to_id else f.from_id end
            where (f.from_id = ch.id or f.to_id = ch.id) and f.status = 'accepted' and not f.need_from_parent and not f.need_to_parent), '[]'::jsonb)));
    end if;

    if a = 'confirmTaskParent' then
      t := left(coalesce(p->>'taskId', ''), 60);
      if t = '' then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'task')); end if;
      insert into confirmations (profile_id, family_id, task_id, task_type, data, via)
        values (ch.id, ch.family_id, t, left(coalesce(p->>'taskType', 'aufgabe'), 30), coalesce(p->'data', '{}'::jsonb), case when ses.kind = 'admin' then 'admin' else 'elternbereich' end)
        on conflict (profile_id, task_id) do nothing;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'friendApprove' then
      begin select * into rq from friend_requests where id = (p->>'id')::uuid; exception when others then rq := null; end;
      if rq.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
      if ses.kind = 'parent' and not exists (select 1 from profiles where id in (rq.from_id, rq.to_id) and family_id = fam.id) then
        return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found'));
      end if;
      if not coalesce((p->>'approve')::boolean, false) then
        update friend_requests set status = 'declined', need_from_parent = false, need_to_parent = false, decided_at = now() where id = rq.id;
      else
        update friend_requests set
          need_from_parent = need_from_parent and not (ses.kind = 'admin' or exists (select 1 from profiles where id = rq.from_id and family_id = fam.id)),
          need_to_parent = need_to_parent and not (ses.kind = 'admin' or exists (select 1 from profiles where id = rq.to_id and family_id = fam.id))
        where id = rq.id;
      end if;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'familyPassword' then
      if ses.kind = 'parent' and not milo_pwok(p->>'old', fam.pw_hash) then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'wrong')); end if;
      if length(coalesce(p->>'new', '')) < 6 then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'pw_short')); end if;
      update families set pw_hash = milo_hash(p->>'new') where id = fam.id;
      delete from sessions where family_id = fam.id and kind = 'parent' and token_hash <> ses.token_hash;
      insert into admin_log (actor, action, detail) values (case when ses.kind = 'admin' then 'Admin' else 'Eltern ' || fam.login end, 'Elternpasswort geändert', jsonb_build_object('family', fam.login));
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;
  end if;

  ---------------------------------------------------------------- nur Admin
  if a like 'admin%' or a in ('setConfig', 'configHistory', 'configRestore') then
    if ses.kind <> 'admin' then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;
    select * into ad from profiles where id = ses.profile_id and role = 'admin';
    if ad.id is null then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;

    if a = 'setConfig' then
      if length((p->'config')::text) > 3000000 then return jsonb_build_object('s', 413, 'b', jsonb_build_object('error', 'too_big')); end if;
      insert into admin_log (actor, action, detail, before) values ('Admin', 'Spielinhalte gespeichert', jsonb_build_object('note', left(coalesce(p->>'note', ''), 120)),
        (select state from game_saves where profile_id = ad.id and game = 'milo3d_config'));
      insert into game_saves (profile_id, game, state, updated_at) values (ad.id, 'milo3d_config', coalesce(p->'config', '{}'::jsonb), now())
        on conflict (profile_id, game) do update set state = excluded.state, updated_at = now();
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'configHistory' or a = 'adminLog' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'log', coalesce((select jsonb_agg(x order by x.id desc) from (
        select id, at, actor, action, detail, (before is not null and action in ('Spielinhalte gespeichert', 'Spielinhalte wiederhergestellt')) canUndo from admin_log
        where a = 'adminLog' or action in ('Spielinhalte gespeichert', 'Spielinhalte wiederhergestellt') order by id desc limit 60) x), '[]'::jsonb)));
    end if;

    if a = 'configRestore' then
      select before into jv from admin_log where id = (p->>'id')::bigint and before is not null and action in ('Spielinhalte gespeichert', 'Spielinhalte wiederhergestellt');
      if jv is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
      insert into admin_log (actor, action, detail, before) values ('Admin', 'Spielinhalte wiederhergestellt', jsonb_build_object('from', p->>'id'),
        (select state from game_saves where profile_id = ad.id and game = 'milo3d_config'));
      insert into game_saves (profile_id, game, state, updated_at) values (ad.id, 'milo3d_config', jv, now())
        on conflict (profile_id, game) do update set state = excluded.state, updated_at = now();
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'config', jv));
    end if;

    if a = 'adminOverview' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
        'families', coalesce((select jsonb_agg(jsonb_build_object('id', f.id, 'login', f.login, 'name', f.display_name, 'active', f.active, 'created', f.created_at,
            'children', coalesce((select jsonb_agg(milo_child_pub(c) || jsonb_build_object('learnSec', milo_learn_sec(c.id)) order by c.created_at) from profiles c where c.family_id = f.id), '[]'::jsonb))
          order by f.created_at) from families f), '[]'::jsonb),
        'stats', jsonb_build_object('families', (select count(*) from families), 'children', (select count(*) from profiles where role = 'child'),
          'online', (select count(*) from profiles where role = 'child' and last_seen > now() - interval '2 minutes'),
          'answers', (select count(*) from learning_progress), 'confirmations', (select count(*) from confirmations),
          'friendships', (select count(*) from friend_requests where status = 'accepted' and not need_from_parent and not need_to_parent),
          'learnMinutes', round((select coalesce(sum(milo_learn_sec(id)), 0) from profiles where role = 'child') / 60)),
        'system', jsonb_build_object('allowParentSignup', coalesce((select v from system_settings where k = 'allowParentSignup'), 'true'::jsonb))));
    end if;

    if a = 'adminFamily' then
      begin select * into fam from families where id = (p->>'familyId')::uuid; exception when others then fam := null; end;
      if fam.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'not_found')); end if;
      if p ? 'active' then update families set active = coalesce((p->>'active')::boolean, true) where id = fam.id; delete from sessions where family_id = fam.id; end if;
      if p ? 'name' and length(milo_norm(p->>'name')) between 2 and 40 then update families set display_name = milo_norm(p->>'name') where id = fam.id; end if;
      if coalesce(p->>'newPassword', '') <> '' then
        if length(p->>'newPassword') < 6 then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'pw_short')); end if;
        update families set pw_hash = milo_hash(p->>'newPassword') where id = fam.id;
        delete from sessions where family_id = fam.id and kind = 'parent';
      end if;
      if coalesce((p->>'delete')::boolean, false) then
        if coalesce(p->>'confirmName', '') <> fam.login then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'confirm')); end if;
        insert into admin_log (actor, action, detail, before) values ('Admin', 'Elternkonto gelöscht', jsonb_build_object('family', fam.login),
          jsonb_build_object('family', to_jsonb(fam) - 'pw_hash', 'children', (select jsonb_agg(to_jsonb(c) - 'pin_hash') from profiles c where c.family_id = fam.id)));
        delete from families where id = fam.id;
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
      end if;
      insert into admin_log (actor, action, detail) values ('Admin', 'Elternkonto geändert', jsonb_build_object('family', fam.login, 'active', p->'active', 'pw', p ? 'newPassword'));
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'adminSystem' then
      if jsonb_typeof(p->'allowParentSignup') = 'boolean' then
        insert into system_settings (k, v) values ('allowParentSignup', p->'allowParentSignup') on conflict (k) do update set v = excluded.v;
        insert into admin_log (actor, action, detail) values ('Admin', 'Systemeinstellung', jsonb_build_object('allowParentSignup', p->'allowParentSignup'));
      end if;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;

    if a = 'adminPassword' then
      if not milo_pwok(p->>'old', ad.pin_hash) then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'wrong')); end if;
      if length(coalesce(p->>'new', '')) < 8 then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'pw_short')); end if;
      update profiles set pin_hash = milo_hash(p->>'new') where id = ad.id;
      delete from sessions where kind = 'admin' and token_hash <> ses.token_hash;
      insert into admin_log (actor, action) values ('Admin', 'Admin-Passwort geändert');
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
    end if;
  end if;

  return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden', 'action', a));
end $$;

-- Nur der Server darf diese Funktionen aufrufen (sonst könnte z. B. milo_token direkt Sitzungen erzeugen)
do $$ declare f record; begin
  for f in select p.oid::regprocedure sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.proname like 'milo\_%' loop
    execute format('revoke all on function %s from public', f.sig);
    if exists (select 1 from pg_roles where rolname = 'anon') then execute format('revoke all on function %s from anon, authenticated', f.sig); end if;
    if exists (select 1 from pg_roles where rolname = 'service_role') then execute format('grant execute on function %s to service_role', f.sig); end if;
  end loop;
end $$;
