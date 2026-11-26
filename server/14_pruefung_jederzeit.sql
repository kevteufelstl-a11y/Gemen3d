-- Pruefung jederzeit (26.11.2026): keine 70-%-Zulassung mehr, Pruefung dauert mindestens 40 Minuten,
-- Fragen aus allen Faechern gemischt (zufaellig, Fragen des letzten Versuchs nachrangig).
-- Nicht bestanden (schlechter als Note 3): pro Fach 20 Fragen nachlernen, danach neue Pruefung mit neuen Zufallsfragen.
-- Eltern/Admin koennen das Nachlernen erlassen (examRetry). Die 3-Tage-Wartezeit entfaellt.
-- Sicherung der alten Funktionen: backup_20261126.funcs_20261126b
-- Rueckgaengig: die Definitionen aus der Sicherung wieder ausfuehren.
-- Nachtrag (Migration pruefung_ein_durchgang_20261126): Pruefung in einem Durchgang, keine Pause; ohne Aktivitaet seit 5 Minuten wird sie beendet (unbeantwortet = falsch).

create table if not exists backup_20261126.funcs_20261126b (name text primary key, def text, saved_at timestamptz default now());
insert into backup_20261126.funcs_20261126b (name, def)
  select p.proname, pg_get_functiondef(p.oid) from pg_proc p
  where p.pronamespace = 'public'::regnamespace and p.proname in ('milo_exam', 'milo_exam_finish', 'milo_exam_unlock', 'milo_exam_view')
on conflict (name) do nothing;

alter table public.exams add column if not exists remedial_ok boolean not null default false;

-- Nachlernen: pro Fach 20 Fragen (oder alle, wenn das Fach weniger hat) seit Ende des letzten Versuchs beantwortet
create or replace function public.milo_exam_remedial(ex public.exams) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('ok', coalesce(bool_and(s.done >= s.need), true),
    'subjects', coalesce(jsonb_agg(jsonb_build_object('subj', s.subj, 'name', s.nm, 'need', s.need, 'done', least(s.done, s.need)) order by s.subj), '[]'::jsonb))
  from (select k.subj, max(k.subj_name) nm, least(20, count(*))::int need,
          count(*) filter (where lp.answered_at > ex.finished_at)::int done
        from exam_keys k left join learning_progress lp on lp.profile_id = ex.profile_id and lp.question_id = k.qid
        where k.klasse = ex.klasse group by k.subj) s
$$;
revoke all on function public.milo_exam_remedial(public.exams) from public, anon, authenticated;

create or replace function pg_temp.rep(d text, a text, b text) returns text language plpgsql as $$
begin
  if position(a in d) = 0 then raise exception 'Stelle nicht gefunden: %', left(a, 80); end if;
  return replace(d, a, b);
end $$;

do $mig$
declare d text;
begin
  -- milo_exam_finish: keine Wartezeit mehr
  d := pg_get_functiondef('public.milo_exam_finish(uuid)'::regprocedure);
  d := pg_temp.rep(d, $a$retry_after = case when g <= 3 or ex.test then null else now() + interval '3 days' end$a$, $b$retry_after = null$b$);
  execute d;

  -- milo_exam_unlock: keine 70 % mehr
  d := pg_get_functiondef('public.milo_exam_unlock(uuid)'::regprocedure);
  d := pg_temp.rep(d, $a$  if not ex.test and coalesce(ex.progress_pct, 0) < 70 then return false; end if;
$a$, '');
  execute d;

  -- milo_exam_view: Nachlernstand
  d := pg_get_functiondef('public.milo_exam_view(public.exams,boolean)'::regprocedure);
  d := pg_temp.rep(d, $a$'retryAfter', ex.retry_after,$a$, $b$'remedial', case when ex.status = 'nicht_bestanden' and not ex.test then public.milo_exam_remedial(ex) || jsonb_build_object('parentOk', ex.remedial_ok) end,
    'retryAfter', ex.retry_after,$b$);
  execute d;

  -- milo_exam
  d := pg_get_functiondef('public.milo_exam(public.sessions,jsonb,text)'::regprocedure);
  d := pg_temp.rep(d, $a$pr jsonb; tid text;$a$, $b$pr jsonb; tot_sec int; tid text;$b$);
  -- Anzahl Fragen: so viele, dass die Pruefung mindestens 40 Minuten dauert (60 bis 120 Fragen)
  d := pg_temp.rep(d, $a$      per := case when nsub > 0 then ceil(60.0 / nsub)::int else 0 end;
      nq := per * nsub;$a$, $b$      nq := least(120, greatest(60, ceil(2400.0 / spq)::int));
      per := case when nsub > 0 then ceil(nq::numeric / nsub)::int else 0 end;
      nq := per * nsub;$b$);
  -- keine Zulassung mehr, Nachlernen statt Wartezeit
  d := pg_temp.rep(d, $a$      elsif (prog->>'pct')::int < 70 then reason := 'zu_wenig';
      elsif ex.id is not null and ex.status = 'nicht_bestanden' and ex.retry_after > now() then reason := 'warten';$a$,
    $b$      elsif ex.id is not null and ex.status = 'nicht_bestanden' and not ex.remedial_ok and not coalesce((public.milo_exam_remedial(ex)->>'ok')::boolean, false) then reason := 'nachlernen';$b$);
  -- Fragen rein zufaellig (Fragen des letzten Versuchs nachrangig)
  d := pg_temp.rep(d, $a$          sel := array(select k.qid from exam_keys k join learning_progress lp on lp.profile_id = me.id and lp.question_id = k.qid
                       where k.klasse = kl and k.subj = s and lp.ever_wrong
                       order by (k.qid = any(lastq)), case when lp.wrong_count >= 2 then 0 else 1 end, random()
                       limit ceil(per * 0.7)::int);$a$, $b$          sel := '{}'::text[];$b$);
  -- Faecher mischen, Zeit mindestens 40 Minuten
  d := pg_temp.rep(d, $a$        nq := jsonb_array_length(qs);
        pr :=$a$, $b$        qs := (select coalesce(jsonb_agg(x order by random()), '[]'::jsonb) from jsonb_array_elements(qs) x);
        nq := jsonb_array_length(qs);
        tot_sec := greatest(2400, spq * nq);
        spq := ceil(tot_sec::numeric / greatest(nq, 1))::int;
        pr :=$b$);
  d := pg_temp.rep(d, $a$values (me.id, me.family_id, kl, zn, qs, spq, spq * nq, nq,$a$, $b$values (me.id, me.family_id, kl, zn, qs, spq, tot_sec, nq,$b$);
  d := pg_temp.rep(d, $a$'progress', prog, 'need', 70, 'subjects', nsub,$a$, $b$'progress', prog, 'minMin', 40, 'subjects', nsub,$b$);
  d := pg_temp.rep(d, $a$'secPerQ', spq, 'totalSec', spq * nq,$a$, $b$'secPerQ', ceil(greatest(2400, spq * nq)::numeric / greatest(nq, 1))::int, 'totalSec', greatest(2400, spq * nq),$b$);
  -- Eltern/Admin erlassen das Nachlernen
  d := pg_temp.rep(d, $a$update exams set retry_after = now(), retry_by = ses.kind,$a$, $b$update exams set remedial_ok = true, retry_after = now(), retry_by = ses.kind,$b$);
  execute d;
end $mig$;

-- Nachtrag (Migration pruefung_klasse4_ueberspringen_20261126): Klasse 4 hat keine Fragen und wird uebersprungen.
-- Die Klasse-3-Pruefung oeffnet k4 UND k5 (zone_next = naechste Klasse mit Fragen). Status/Start fuer Klasse 4 (Tor 4 nach 5)
-- gilt als Pruefung der Klasse 3. Elternansicht zeigt die Zielzone.
