-- Servertest der Abschlusspruefung (Szenarien A-H). Legt ein Test-Kind an und loescht es am Ende wieder.
create or replace function pg_temp.t_exam() returns table(nr int, szenario text, ergebnis text) language plpgsql as $$
declare fam uuid; kid uuid; other_fam uuid; S public.sessions; P public.sessions; P2 public.sessions; r jsonb; e jsonb; eid uuid;
  q text; i int; n int; k int; ans int; ok_cnt int; tot int; need int;
begin
  select id into fam from families order by created_at limit 1;
  select id into other_fam from families where id <> fam order by created_at limit 1;
  insert into profiles(name, role, family_id) values ('Pruefungstest', 'child', fam) returning id into kid;
  S := row('t1', 'child', kid, fam, now(), now() + interval '1 hour')::public.sessions;
  P := row('t2', 'parent', null, fam, now(), now() + interval '1 hour')::public.sessions;
  P2 := row('t3', 'parent', null, other_fam, now(), now() + interval '1 hour')::public.sessions;
  select count(*) into tot from exam_keys where klasse = 3;

  -- A: 60 % -> Pruefung gesperrt
  insert into learning_progress(profile_id, question_id, correct, ever_right, ever_wrong, answered_at)
    select kid, qid, true, true, false, now() from exam_keys where klasse = 3 order by qid limit floor(tot * 0.6);
  r := milo_exam(S, '{"klasse":3}', 'examStatus');
  nr := 1; szenario := 'A 60 %'; ergebnis := 'pct=' || (r->'b'->'progress'->>'pct') || ' reason=' || (r->'b'->>'reason') || ' start=' || (milo_exam(S, '{"klasse":3,"practical":[{"id":"x","titel":"t"}]}', 'examStart')->'b'->>'error'); return next;

  -- B: 70 % -> Pruefung frei, Tor bleibt zu (einige Fragen auch falsch, mehrfach falsch)
  insert into learning_progress(profile_id, question_id, correct, ever_right, ever_wrong, answered_at, wrong_count)
    select kid, qid, true, true, true, now(), 2 from exam_keys where klasse = 3 and qid not in (select question_id from learning_progress where profile_id = kid) order by qid limit ceil(tot * 0.11);
  r := milo_exam(S, '{"klasse":3}', 'examStatus');
  nr := 2; szenario := 'B 70 %'; ergebnis := 'pct=' || (r->'b'->'progress'->>'pct') || ' canStart=' || (r->'b'->>'canStart') || ' tor=' || (r->'b'->>'gateOpen') || ' fragen=' || (r->'b'->>'nQuestions') || ' s/Frage=' || (r->'b'->>'secPerQ'); return next;

  -- C: Pruefung mit Note 4 -> nicht bestanden
  r := milo_exam(S, '{"klasse":3,"practical":[{"id":"m1","fach":"Mathe","titel":"Rechnen","text":"x","kriterien":["a","b"]},{"id":"d1","fach":"Deutsch","titel":"Abschreiben","text":"y","kriterien":["c"]}],"materials":["Bleistift"]}', 'examStart');
  eid := (r->'b'->'exam'->>'id')::uuid; n := (r->'b'->'exam'->>'n')::int;
  nr := 3; szenario := 'Start'; ergebnis := 'n=' || n || ' fachverteilung=' || (select string_agg(c::text, ',') from (select count(*) c from exams x, jsonb_array_elements(x.questions) qq where x.id = eid group by qq->>'s' order by 1) z)
    || ' frueher_falsch=' || (select count(*) from exams x, jsonb_array_elements(x.questions) qq join learning_progress lp on lp.question_id = qq->>'q' and lp.profile_id = kid and lp.ever_wrong where x.id = eid); return next;
  need := ceil(n * 0.55);  -- 55 % richtig -> Note 4
  for i in 0 .. n - 1 loop
    q := (select questions -> i ->> 'q' from exams where id = eid);
    perform milo_exam(S, jsonb_build_object('id', eid, 'q', q), 'examShow');
    ans := (select answer from exam_keys where qid = q);
    if i >= need then ans := (ans + 1) % 3; end if;
    r := milo_exam(S, jsonb_build_object('id', eid, 'q', q, 'a', ans, 'ms', 4000), 'examAnswer');
  end loop;
  nr := 4; szenario := 'C Note 4'; ergebnis := 'status=' || (r->'b'->'exam'->>'status') || ' note=' || (r->'b'->'exam'->>'grade') || ' pct=' || (r->'b'->'exam'->>'pct')
    || ' wieder_im_training=' || (select count(*) from learning_progress lp where lp.profile_id = kid and not lp.correct and lp.question_id in (select qq->>'q' from exams x, jsonb_array_elements(x.questions) qq where x.id = eid))
    || ' tor=' || exists (select 1 from zone_unlocks where profile_id = kid); return next;
  r := milo_exam(S, '{"klasse":3}', 'examStatus');
  nr := 5; szenario := 'C Wartezeit'; ergebnis := 'reason=' || (r->'b'->>'reason'); return next;
  r := milo_exam(P2, jsonb_build_object('examId', eid), 'examRetry');
  nr := 6; szenario := 'fremde Eltern'; ergebnis := 'fehler=' || (r->'b'->>'error'); return next;
  r := milo_exam(S, jsonb_build_object('examId', eid, 'taskId', 'm1', 'passed', true), 'examPractical');
  nr := 7; szenario := 'Kind als Eltern'; ergebnis := 'fehler=' || (r->'b'->>'error'); return next;
  r := milo_exam(P, jsonb_build_object('examId', eid), 'examRetry');

  -- D: Note 3, Praxis offen -> Tor zu
  r := milo_exam(S, '{"klasse":3,"practical":[{"id":"m1","fach":"Mathe","titel":"Rechnen","text":"x","kriterien":["a"]},{"id":"d1","fach":"Deutsch","titel":"Abschreiben","text":"y","kriterien":["c"]}]}', 'examStart');
  eid := (r->'b'->'exam'->>'id')::uuid; n := (r->'b'->'exam'->>'n')::int; need := ceil(n * 0.70);
  nr := 8; szenario := 'neuer Versuch'; ergebnis := 'wiederholte_fragen=' || (select count(*) from exams x, jsonb_array_elements(x.questions) qq where x.id = eid and qq->>'q' in (select qq2->>'q' from exams x2, jsonb_array_elements(x2.questions) qq2 where x2.profile_id = kid and x2.id <> eid)); return next;
  -- G: Antwort aendern / Reihenfolge
  q := (select questions -> 0 ->> 'q' from exams where id = eid);
  perform milo_exam(S, jsonb_build_object('id', eid, 'q', q), 'examShow');
  perform milo_exam(S, jsonb_build_object('id', eid, 'q', q, 'a', (select answer from exam_keys where qid = q), 'ms', 3000), 'examAnswer');
  r := milo_exam(S, jsonb_build_object('id', eid, 'q', q, 'a', 0, 'ms', 3000), 'examAnswer');
  nr := 9; szenario := 'G Antwort aendern'; ergebnis := 'fehler=' || (r->'b'->>'error') || ' antworten=' || (select jsonb_array_length(answers) from exams where id = eid); return next;
  r := milo_exam(S, '{"klasse":3,"practical":[{"id":"m1"}]}', 'examStart');
  nr := 10; szenario := 'G Neustart waehrend Pruefung'; ergebnis := 'fehler=' || (r->'b'->>'error'); return next;
  -- H: Unterbrechung mitten in einer Frage -> Frage wird getauscht
  q := (select questions -> 1 ->> 'q' from exams where id = eid);
  perform milo_exam(S, jsonb_build_object('id', eid, 'q', q), 'examShow');
  update exams set shown = jsonb_set(shown, array[q], to_jsonb(extract(epoch from now()) - 600)) where id = eid;
  r := milo_exam(S, jsonb_build_object('id', eid, 'q', q), 'examShow');
  nr := 11; szenario := 'H Unterbrechung'; ergebnis := 'getauscht=' || coalesce(r->'b'->>'replaced', 'nein') || ' gleiches_fach=' || ((select (questions -> 1 ->> 's') from exams where id = eid) = (select subj::text from exam_keys where qid = q)); return next;
  for i in 1 .. n - 1 loop
    q := (select questions -> i ->> 'q' from exams where id = eid);
    perform milo_exam(S, jsonb_build_object('id', eid, 'q', q), 'examShow');
    ans := (select answer from exam_keys where qid = q);
    if i >= need then ans := (ans + 1) % 3; end if;
    r := milo_exam(S, jsonb_build_object('id', eid, 'q', q, 'a', ans, 'ms', 99999), 'examAnswer');
  end loop;
  nr := 12; szenario := 'D Note 3, Praxis offen'; ergebnis := 'status=' || (r->'b'->'exam'->>'status') || ' note=' || (r->'b'->'exam'->>'grade') || ' tor=' || exists (select 1 from zone_unlocks where profile_id = kid)
    || ' zeit_gekappt=' || ((select used_ms from exams where id = eid) < n * 99999); return next;
  r := milo_exam(P, jsonb_build_object('examId', eid, 'taskId', 'm1', 'passed', false, 'note', ''), 'examPractical');
  nr := 13; szenario := 'Eltern: nicht bestanden ohne Hinweis'; ergebnis := 'fehler=' || (r->'b'->>'error'); return next;
  r := milo_exam(P, jsonb_build_object('examId', eid, 'taskId', 'm1', 'passed', false, 'note', 'Rechenweg fehlt'), 'examPractical');
  r := milo_exam(P, jsonb_build_object('examId', eid, 'taskId', 'd1', 'passed', true), 'examPractical');
  nr := 14; szenario := 'D eine Praxisaufgabe nicht bestanden'; ergebnis := 'frei=' || (r->'b'->>'unlocked') || ' tor=' || exists (select 1 from zone_unlocks where profile_id = kid); return next;
  -- E: alles bestanden + Eltern bestaetigt -> Tor offen
  r := milo_exam(P, jsonb_build_object('examId', eid, 'taskId', 'm1', 'passed', true), 'examPractical');
  nr := 15; szenario := 'E alles bestanden'; ergebnis := 'frei=' || (r->'b'->>'unlocked') || ' status=' || (r->'b'->'exam'->>'status') || ' tor=' || (select string_agg(zone_id || '/' || via, ',') from zone_unlocks where profile_id = kid); return next;
  r := milo_exam(P, jsonb_build_object('childId', kid), 'examParent');
  nr := 16; szenario := 'Elternansicht'; ergebnis := 'versuche=' || jsonb_array_length(r->'b'->'exams') || ' klassen=' || jsonb_array_length(r->'b'->'klassen'); return next;
  -- Zeit: Lernzeiten zaehlen
  perform milo_exam_stats(kid, '{"answers":[{"question_id":"0.0.0","correct":false,"ms":12000},{"question_id":"0.0.1","correct":true,"ms":16000}]}');
  nr := 17; szenario := 'Zeitmessung'; ergebnis := (select sum(time_ms) || 'ms/' || sum(time_n) from learning_progress where profile_id = kid); return next;

end $$;
select * from pg_temp.t_exam();
