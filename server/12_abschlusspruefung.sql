-- Abschlusspruefung (26.11.2026). Rein additiv:
--  * Sicherung vorher: Schema backup_20261126 (Funktionen milo_api, milo_clean_learn, milo_zones und Kopien von
--    learning_progress, profiles, zone_unlocks, game_saves).
--  * learning_progress: neue Spalten wrong_count (wie oft falsch), time_ms/time_n (Bearbeitungszeit beim Lernen).
--  * exam_keys: Loesungsschluessel der Pruefungsfaecher (wird aus den Fragen der App erzeugt, 12b_exam_keys.sql).
--  * exams: ein Eintrag pro Pruefungsversuch (Fragen, Antworten, Zeiten, Note, Praxisaufgaben, Elternbestaetigungen).
--  * milo_exam: alle Aktionen "exam*" (Kind: Status/Start/Frage/Antwort/Ende; Eltern/Admin: Kontrolle, Wiederholung).
--  * Das Tor wird nur hier freigeschaltet (zone_unlocks.via = 'exam'), wenn alle Bedingungen erfuellt sind.
-- Rueckgaengig: siehe 12z_rueckgaengig.sql

alter table public.learning_progress add column if not exists wrong_count int not null default 0;
alter table public.learning_progress add column if not exists time_ms bigint not null default 0;
alter table public.learning_progress add column if not exists time_n int not null default 0;
update public.learning_progress set wrong_count = 1 where ever_wrong and wrong_count = 0;

create table if not exists public.exam_keys (
  qid text primary key,           -- Fragen-ID der App: Fach.Bereich.Nr
  klasse int not null,            -- Lerngebiet (Klasse), zu dem die Frage gehoert
  subj int not null,              -- Fach-Index in der App
  subj_name text not null,
  answer int not null,            -- Index der richtigen Antwort (vor dem Mischen)
  version text not null default ''
);
create index if not exists exam_keys_klasse on public.exam_keys (klasse, subj);

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  family_id uuid references public.families(id) on delete set null,
  klasse int not null,
  zone_next text not null,
  status text not null default 'laeuft' check (status in ('laeuft', 'theorie_bestanden', 'nicht_bestanden', 'bestanden', 'abgebrochen')),
  questions jsonb not null,                  -- [{q, s}] in Pruefungsreihenfolge
  answers jsonb not null default '[]'::jsonb, -- [{q, a, ok, ms, at}]
  shown jsonb not null default '{}'::jsonb,   -- {q: Zeitpunkt (Epoch-Sekunden), seit dem die Frage sichtbar ist}
  sec_per_q int not null,
  total_sec int not null,
  used_ms bigint not null default 0,
  n int not null,
  n_right int, pct int, grade int,
  progress_pct int, avg_sec numeric, avg_n int,
  practical jsonb not null default '[]'::jsonb, -- [{id, fach, titel, text, kriterien[], status, note, by, at}]
  materials jsonb not null default '[]'::jsonb,
  retry_after timestamptz,
  retry_by text,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  unlocked_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists exams_profile on public.exams (profile_id, klasse, started_at desc);
alter table public.exam_keys enable row level security;
alter table public.exams enable row level security;
revoke all on public.exam_keys, public.exams from anon, authenticated;

-- Fehler und Bearbeitungszeiten beim normalen Lernen mitzaehlen (wird aus der Aktion "progress" aufgerufen)
create or replace function public.milo_exam_stats(pid uuid, p jsonb) returns void
language sql security definer set search_path = public as $$
  update learning_progress lp set
    wrong_count = lp.wrong_count + x.bad,
    time_ms = lp.time_ms + x.ms,
    time_n = lp.time_n + x.mn
  from (
    select left(e->>'question_id', 40) qid,
      count(*) filter (where not coalesce((e->>'correct')::boolean, false)) bad,
      coalesce(sum((e->>'ms')::numeric) filter (where jsonb_typeof(e->'ms') = 'number' and (e->>'ms')::numeric between 300 and 120000), 0)::bigint ms,
      count(*) filter (where jsonb_typeof(e->'ms') = 'number' and (e->>'ms')::numeric between 300 and 120000)::int mn
    from jsonb_array_elements(case when jsonb_typeof(p->'answers') = 'array' then p->'answers' else '[]'::jsonb end) with ordinality as z(e, ord)
    where ord <= 500 and coalesce(e->>'question_id', '') <> ''
    group by 1) x
  where lp.profile_id = pid and lp.question_id = x.qid;
$$;
revoke all on function public.milo_exam_stats(uuid, jsonb) from public, anon, authenticated;

-- Note aus Prozent (bestehendes Notensystem: 95/80/65/50/25)
create or replace function public.milo_exam_grade(pct int) returns int language sql immutable as $$
  select case when pct >= 95 then 1 when pct >= 80 then 2 when pct >= 65 then 3 when pct >= 50 then 4 when pct >= 25 then 5 else 6 end
$$;

-- Lernfortschritt im Lerngebiet: wie viele Fragen mindestens einmal richtig
create or replace function public.milo_exam_progress(pid uuid, kl int) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('total', count(*), 'right', count(*) filter (where lp.ever_right),
    'pct', case when count(*) = 0 then 0 else floor(count(*) filter (where lp.ever_right) * 100.0 / count(*))::int end)
  from exam_keys k left join learning_progress lp on lp.profile_id = pid and lp.question_id = k.qid
  where k.klasse = kl
$$;
revoke all on function public.milo_exam_progress(uuid, int) from public, anon, authenticated;

-- Pruefung auswerten (auch bei abgelaufener Zeit: unbeantwortete Fragen zaehlen als falsch)
create or replace function public.milo_exam_finish(eid uuid) returns void
language plpgsql security definer set search_path = public as $$
declare ex exams; r int; pc int; g int;
begin
  select * into ex from exams where id = eid for update;
  if ex.id is null or ex.status <> 'laeuft' then return; end if;
  select count(*) filter (where coalesce((a->>'ok')::boolean, false)) into r from jsonb_array_elements(ex.answers) a;
  pc := floor(r * 100.0 / greatest(1, ex.n))::int;
  g := milo_exam_grade(pc);
  update exams set n_right = r, pct = pc, grade = g, finished_at = now(), updated_at = now(),
    status = case when g <= 3 then 'theorie_bestanden' else 'nicht_bestanden' end,
    retry_after = case when g <= 3 then null else now() + interval '3 days' end
  where id = eid;
  -- Falsche und unbeantwortete Pruefungsfragen kommen wieder ins Training
  insert into learning_progress (profile_id, question_id, correct, ever_right, ever_wrong, answered_at, wrong_count)
  select ex.profile_id, q->>'q', false, false, true, now(), 1
  from jsonb_array_elements(ex.questions) q
  where not exists (select 1 from jsonb_array_elements(ex.answers) a where a->>'q' = q->>'q' and coalesce((a->>'ok')::boolean, false))
  on conflict (profile_id, question_id) do update set correct = false, ever_wrong = true, wrong_count = learning_progress.wrong_count + 1, answered_at = now();
  perform milo_exam_unlock(eid);
end $$;
revoke all on function public.milo_exam_finish(uuid) from public, anon, authenticated;

-- Tor freischalten, wenn ALLE Bedingungen erfuellt sind
create or replace function public.milo_exam_unlock(eid uuid) returns boolean
language plpgsql security definer set search_path = public as $$
declare ex exams; open_tasks int;
begin
  select * into ex from exams where id = eid for update;
  if ex.id is null or ex.status <> 'theorie_bestanden' or coalesce(ex.grade, 6) > 3 or coalesce(ex.progress_pct, 0) < 70 then return false; end if;
  select count(*) into open_tasks from jsonb_array_elements(ex.practical) t where coalesce(t->>'status', '') <> 'bestanden';
  if jsonb_array_length(ex.practical) = 0 or open_tasks > 0 then return false; end if;
  insert into zone_unlocks (profile_id, zone_id, via) values (ex.profile_id, ex.zone_next, 'exam')
    on conflict (profile_id, zone_id) do update set via = 'exam', granted_at = now();
  update exams set status = 'bestanden', unlocked_at = now(), updated_at = now() where id = eid;
  return true;
end $$;
revoke all on function public.milo_exam_unlock(uuid) from public, anon, authenticated;

-- Auswertung nach Fach (fuer Ergebnis und Elternansicht)
create or replace function public.milo_exam_view(ex public.exams, full_q boolean) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('id', ex.id, 'klasse', ex.klasse, 'zone', ex.zone_next, 'status', ex.status, 'n', ex.n,
    'answered', jsonb_array_length(ex.answers), 'right', ex.n_right, 'pct', ex.pct, 'grade', ex.grade,
    'secPerQ', ex.sec_per_q, 'totalSec', ex.total_sec, 'usedMs', ex.used_ms,
    'remainingMs', greatest(0, ex.total_sec * 1000 - ex.used_ms),
    'avgAnswerSec', case when jsonb_array_length(ex.answers) > 0 then round((select avg((a->>'ms')::numeric) from jsonb_array_elements(ex.answers) a) / 1000.0, 1) end,
    'progressPct', ex.progress_pct, 'practical', ex.practical, 'materials', ex.materials,
    'retryAfter', ex.retry_after, 'startedAt', ex.started_at, 'finishedAt', ex.finished_at, 'unlockedAt', ex.unlocked_at,
    'questions', case when full_q then (select jsonb_agg(q->>'q' order by o) from jsonb_array_elements(ex.questions) with ordinality z(q, o)) end,
    'subjects', case when ex.status <> 'laeuft' then (
      select jsonb_agg(jsonb_build_object('subj', s.s, 'name', (select subj_name from exam_keys where subj = s.s limit 1), 'n', s.n, 'right', s.r) order by s.s)
      from (select (q->>'s')::int s, count(*) n,
              count(*) filter (where exists (select 1 from jsonb_array_elements(ex.answers) a where a->>'q' = q->>'q' and coalesce((a->>'ok')::boolean, false))) r
            from jsonb_array_elements(ex.questions) q group by 1) s) end,
    'wrong', case when ex.status <> 'laeuft' then (
      select jsonb_agg(jsonb_build_object('q', q->>'q', 'a', (select (a->>'a')::int from jsonb_array_elements(ex.answers) a where a->>'q' = q->>'q' limit 1),
        'right', (select answer from exam_keys where qid = q->>'q')))
      from jsonb_array_elements(ex.questions) q
      where not exists (select 1 from jsonb_array_elements(ex.answers) a where a->>'q' = q->>'q' and coalesce((a->>'ok')::boolean, false))) end)
$$;
revoke all on function public.milo_exam_view(public.exams, boolean) from public, anon, authenticated;

create or replace function public.milo_exam(ses public.sessions, p jsonb, a text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare me profiles; ch profiles; ex exams; kl int; zn text; prog jsonb; tms bigint; tn int; avg_s numeric; spq int; nq int;
  per int; nsub int; qs jsonb := '[]'::jsonb; sel text[]; s int; lastq text[]; cur jsonb; idx int; q text; sh numeric; ms bigint; ok boolean;
  pr jsonb; tid text; pass boolean; note text; i int; t jsonb; nq2 text; unl boolean; reason text;
begin
  select * into me from profiles where id = ses.profile_id and active;
  if me.id is null and ses.kind <> 'parent' then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;

  -- ================= Kind =================
  if ses.kind = 'child' then
    -- laufende Pruefung nach Ablauf (Zeit verbraucht oder aelter als 24 Stunden) automatisch beenden
    for ex in select * from exams where profile_id = me.id and status = 'laeuft' loop
      if ex.used_ms >= ex.total_sec * 1000::bigint or ex.started_at < now() - interval '24 hours' then perform milo_exam_finish(ex.id); end if;
    end loop;

    if a in ('examStatus', 'examStart') then
      kl := coalesce((p->>'klasse')::int, 3);
      zn := 'k' || (kl + 1);
      prog := milo_exam_progress(me.id, kl);
      select coalesce(sum(time_ms), 0), coalesce(sum(time_n), 0) into tms, tn from learning_progress where profile_id = me.id;
      avg_s := case when tn > 0 then round(tms / 1000.0 / tn, 1) end;
      spq := case when tn >= 20 then least(90, greatest(5, round(tms / 1000.0 / tn)::int - 1)) else 39 end;
      select count(distinct subj) into nsub from exam_keys where klasse = kl;
      per := case when nsub > 0 then ceil(60.0 / nsub)::int else 0 end;
      nq := per * nsub;
      select * into ex from exams where profile_id = me.id and klasse = kl order by started_at desc limit 1;
      reason := null;
      if nsub = 0 then reason := 'keine_fragen';
      elsif exists (select 1 from zone_unlocks where profile_id = me.id and zone_id = zn and via = 'exam') then reason := 'tor_offen';
      elsif ex.id is not null and ex.status = 'laeuft' then reason := 'laeuft';
      elsif ex.id is not null and ex.status = 'theorie_bestanden' then reason := 'praxis_offen';
      elsif (prog->>'pct')::int < 70 then reason := 'zu_wenig';
      elsif ex.id is not null and ex.status = 'nicht_bestanden' and ex.retry_after > now() then reason := 'warten';
      end if;

      if a = 'examStart' then
        if reason is not null then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', reason)); end if;
        -- Fragen aus dem letzten Versuch kommen nachrangig
        lastq := coalesce((select array_agg(x->>'q') from jsonb_array_elements(ex.questions) x), '{}');
        for s in select distinct subj from exam_keys where klasse = kl order by subj loop
          -- hoechstens 70 % frueher falsch beantwortete Fragen (erst mehrfach falsch, dann einmal falsch), Rest neue Fragen
          sel := array(select k.qid from exam_keys k join learning_progress lp on lp.profile_id = me.id and lp.question_id = k.qid
                       where k.klasse = kl and k.subj = s and lp.ever_wrong
                       order by (k.qid = any(lastq)), case when lp.wrong_count >= 2 then 0 else 1 end, random()
                       limit ceil(per * 0.7)::int);
          sel := sel || array(select k.qid from exam_keys k where k.klasse = kl and k.subj = s and not (k.qid = any(sel))
                       order by (k.qid = any(lastq)), random() limit per - cardinality(sel));
          qs := qs || coalesce((select jsonb_agg(jsonb_build_object('q', x, 's', s) order by random()) from unnest(sel) x), '[]'::jsonb);
        end loop;
        nq := jsonb_array_length(qs);
        -- Praxisaufgaben und Materialliste kommen aus der App (passend zu den Faechern), werden hier bereinigt
        pr := coalesce((select jsonb_agg(jsonb_build_object(
                'id', left(coalesce(e->>'id', 'p' || o), 20), 'fach', left(coalesce(e->>'fach', ''), 40), 'titel', left(coalesce(e->>'titel', ''), 100),
                'text', left(coalesce(e->>'text', ''), 1200),
                'kriterien', coalesce((select jsonb_agg(left(c, 200)) from (select c from jsonb_array_elements_text(case when jsonb_typeof(e->'kriterien') = 'array' then e->'kriterien' else '[]'::jsonb end) c limit 8) cc), '[]'::jsonb),
                'status', 'offen') order by o)
              from jsonb_array_elements(case when jsonb_typeof(p->'practical') = 'array' then p->'practical' else '[]'::jsonb end) with ordinality z(e, o) where o <= 12), '[]'::jsonb);
        if jsonb_array_length(pr) = 0 then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'praxis')); end if;
        insert into exams (profile_id, family_id, klasse, zone_next, questions, sec_per_q, total_sec, n, progress_pct, avg_sec, avg_n, practical, materials)
        values (me.id, me.family_id, kl, zn, qs, spq, spq * nq, nq, (prog->>'pct')::int, avg_s, tn, pr,
          coalesce((select jsonb_agg(left(m, 80)) from (select m from jsonb_array_elements_text(case when jsonb_typeof(p->'materials') = 'array' then p->'materials' else '[]'::jsonb end) m limit 15) mm), '[]'::jsonb))
        returning * into ex;
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'exam', milo_exam_view(ex, true)));
      end if;

      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'klasse', kl, 'zone', zn, 'name', me.name,
        'progress', prog, 'need', 70, 'subjects', nsub, 'perSubject', per, 'nQuestions', nq,
        'avgSec', avg_s, 'avgN', tn, 'secPerQ', spq, 'totalSec', spq * nq,
        'gateOpen', exists (select 1 from zone_unlocks where profile_id = me.id and zone_id = zn and via = 'exam'),
        'reason', reason, 'canStart', reason is null,
        'exam', case when ex.id is not null then milo_exam_view(ex, ex.status = 'laeuft') end,
        'history', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'status', status, 'grade', grade, 'pct', pct, 'at', started_at) order by started_at desc) from exams where profile_id = me.id and klasse = kl), '[]'::jsonb)));
    end if;

    if a in ('examShow', 'examAnswer', 'examFinish', 'examResult') then
      begin select * into ex from exams where id = (p->>'id')::uuid and profile_id = me.id for update;
      exception when others then ex := null; end;
      if ex.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'exam')); end if;

      if a = 'examResult' then
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'exam', milo_exam_view(ex, true)));
      end if;
      if ex.status <> 'laeuft' then
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'done', true, 'exam', milo_exam_view(ex, true)));
      end if;
      if a = 'examFinish' then
        perform milo_exam_finish(ex.id);
        select * into ex from exams where id = ex.id;
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'done', true, 'exam', milo_exam_view(ex, true)));
      end if;

      idx := jsonb_array_length(ex.answers);
      if idx >= ex.n then
        perform milo_exam_finish(ex.id);
        select * into ex from exams where id = ex.id;
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'done', true, 'exam', milo_exam_view(ex, true)));
      end if;
      cur := ex.questions -> idx;
      q := cur->>'q';
      if coalesce(p->>'q', '') <> q then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'reihenfolge', 'next', q, 'index', idx)); end if;

      if a = 'examShow' then
        sh := (ex.shown->>q)::numeric;
        if sh is not null and extract(epoch from now()) - sh > ex.sec_per_q + 30 then
          -- Unterbrechung mitten in einer Frage: gegen eine andere Frage desselben Fachs tauschen (kein Nachschlagen)
          select k.qid into nq2 from exam_keys k where k.klasse = ex.klasse and k.subj = (cur->>'s')::int
            and not exists (select 1 from jsonb_array_elements(ex.questions) x where x->>'q' = k.qid) order by random() limit 1;
          if nq2 is not null then
            update exams set questions = jsonb_set(questions, array[idx::text], jsonb_build_object('q', nq2, 's', (cur->>'s')::int)),
              shown = shown || jsonb_build_object(nq2, extract(epoch from now())), updated_at = now() where id = ex.id;
            return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'replaced', nq2, 'index', idx, 'remainingMs', greatest(0, ex.total_sec * 1000 - ex.used_ms)));
          end if;
          update exams set shown = shown || jsonb_build_object(q, extract(epoch from now())), updated_at = now() where id = ex.id;
        elsif sh is null then
          update exams set shown = shown || jsonb_build_object(q, extract(epoch from now())), updated_at = now() where id = ex.id;
        end if;
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'index', idx, 'remainingMs', greatest(0, ex.total_sec * 1000 - ex.used_ms)));
      end if;

      -- examAnswer: Antwort ist endgueltig, Zeit = Messung der App, hoechstens die echte Zeit seit Anzeige der Frage
      sh := (ex.shown->>q)::numeric;
      if sh is null then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'nicht_angezeigt')); end if;
      ms := least(greatest(0, coalesce((p->>'ms')::numeric, 0)), (extract(epoch from now()) - sh) * 1000 + 1500)::bigint;
      ms := least(ms, greatest(0, ex.total_sec * 1000 - ex.used_ms));
      ok := (select answer from exam_keys where qid = q) = coalesce((p->>'a')::int, -1);
      update exams set answers = answers || jsonb_build_array(jsonb_build_object('q', q, 'a', coalesce((p->>'a')::int, -1), 'ok', ok, 'ms', ms, 'at', now())),
        used_ms = used_ms + ms, updated_at = now() where id = ex.id returning * into ex;
      if jsonb_array_length(ex.answers) >= ex.n or ex.used_ms >= ex.total_sec * 1000::bigint then
        perform milo_exam_finish(ex.id);
        select * into ex from exams where id = ex.id;
        return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'done', true, 'exam', milo_exam_view(ex, true)));
      end if;
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'done', false, 'index', jsonb_array_length(ex.answers),
        'next', ex.questions -> jsonb_array_length(ex.answers) ->> 'q', 'remainingMs', greatest(0, ex.total_sec * 1000 - ex.used_ms)));
    end if;
    return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden'));
  end if;

  -- ================= Eltern / Admin =================
  if ses.kind not in ('parent', 'admin') then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;
  begin select * into ch from profiles where id = (p->>'childId')::uuid and role = 'child';
  exception when others then ch := null; end;
  if a in ('examPractical', 'examRetry') then
    begin select * into ex from exams where id = (p->>'examId')::uuid for update;
    exception when others then ex := null; end;
    if ex.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'exam')); end if;
    select * into ch from profiles where id = ex.profile_id;
  end if;
  if ch.id is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'child')); end if;
  -- Eltern nur fuer die eigene Familie
  if ses.kind = 'parent' and ch.family_id is distinct from ses.family_id then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'family')); end if;

  if a = 'examParent' then
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'klassen', coalesce((select jsonb_agg(jsonb_build_object('klasse', k.kl, 'zone', 'k' || (k.kl + 1), 'progress', milo_exam_progress(ch.id, k.kl),
        'gateOpen', exists (select 1 from zone_unlocks where profile_id = ch.id and zone_id = 'k' || (k.kl + 1) and via = 'exam')) order by k.kl)
        from (select distinct klasse kl from exam_keys) k), '[]'::jsonb),
      'exams', coalesce((select jsonb_agg(milo_exam_view(e, false) order by e.started_at desc) from exams e where e.profile_id = ch.id), '[]'::jsonb)));
  end if;

  if a = 'examPractical' then
    if ex.status <> 'theorie_bestanden' then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'status')); end if;
    tid := coalesce(p->>'taskId', ''); pass := coalesce((p->>'passed')::boolean, false); note := left(btrim(coalesce(p->>'note', '')), 500);
    if not pass and length(note) < 3 then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'note')); end if;
    i := null;
    for t, idx in select e, (o - 1)::int from jsonb_array_elements(ex.practical) with ordinality z(e, o) loop
      if t->>'id' = tid then i := idx; end if;
    end loop;
    if i is null then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'task')); end if;
    update exams set practical = jsonb_set(practical, array[i::text], (practical -> i) || jsonb_build_object('status', case when pass then 'bestanden' else 'nicht_bestanden' end,
        'note', note, 'by', ses.kind, 'at', now())), updated_at = now() where id = ex.id;
    unl := milo_exam_unlock(ex.id);
    select * into ex from exams where id = ex.id;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'unlocked', unl, 'exam', milo_exam_view(ex, false)));
  end if;

  if a = 'examRetry' then
    if ex.status <> 'nicht_bestanden' then return jsonb_build_object('s', 409, 'b', jsonb_build_object('error', 'status')); end if;
    update exams set retry_after = now(), retry_by = ses.kind, updated_at = now() where id = ex.id;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'action'));
end $$;
revoke all on function public.milo_exam(public.sessions, jsonb, text) from public, anon, authenticated;

-- Einhaengen in milo_api: Aktionen "exam*" und Zeitmessung bei "progress"
do $$
declare d text;
begin
  d := pg_get_functiondef('public.milo_api(jsonb)'::regprocedure);
  if position('milo_exam(ses' in d) = 0 then
    d := replace(d, E'  if a like ''zone%'' then return public.milo_zones(ses, p, a); end if;', E'  if a like ''exam%'' then return public.milo_exam(ses, p, a); end if;\n\n  if a like ''zone%'' then return public.milo_zones(ses, p, a); end if;');
    if position('milo_exam(ses' in d) = 0 then raise exception 'Einhängepunkt exam nicht gefunden'; end if;
  end if;
  if position('milo_exam_stats(me.id' in d) = 0 then
    d := replace(d, E'ever_wrong = learning_progress.ever_wrong or excluded.ever_wrong;\n      return jsonb_build_object(''s'', 200, ''b'', jsonb_build_object(''ok'', true));',
                    E'ever_wrong = learning_progress.ever_wrong or excluded.ever_wrong;\n      perform public.milo_exam_stats(me.id, p);\n      return jsonb_build_object(''s'', 200, ''b'', jsonb_build_object(''ok'', true));');
    if position('milo_exam_stats(me.id' in d) = 0 then raise exception 'Einhängepunkt progress nicht gefunden'; end if;
  end if;
  execute d;
end $$;

-- Belohnungslisten je Klasse (4, 5, 6) in den Kind-Einstellungen erlauben
do $$ declare def text; begin
  select pg_get_functiondef('public.milo_clean_learn(jsonb)'::regprocedure) into def;
  if position('rewardListsK' in def) = 0 then
    def := replace(def, E'  if jsonb_typeof(s->''subjects'') = ''array'' then',
E'  if jsonb_typeof(s->''rewardListsK'') = ''object'' then\n    o := o || jsonb_build_object(''rewardListsK'', coalesce((select jsonb_object_agg(kk, (select jsonb_object_agg(k, coalesce((select jsonb_agg(left(btrim(x), 200)) from (select x from jsonb_array_elements_text(case when jsonb_typeof(s->''rewardListsK''->kk->k) = ''array'' then s->''rewardListsK''->kk->k else ''[]''::jsonb end) x where btrim(x) <> '''' limit 10) q), ''[]''::jsonb)) from unnest(array[''tag'', ''woche'', ''monat'', ''trost'']) k)) from unnest(array[''4'', ''5'', ''6'', ''7'']) kk where jsonb_typeof(s->''rewardListsK''->kk) = ''object''), ''{}''::jsonb));\n  end if;\n  if jsonb_typeof(s->''subjects'') = ''array'' then');
    if position('rewardListsK' in def) = 0 then raise exception 'Einhängepunkt rewardListsK nicht gefunden'; end if;
    execute def;
  end if;
end $$;
