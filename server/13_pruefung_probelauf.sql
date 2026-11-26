-- Admin-Probelauf der Abschlusspruefung (26.11.2026, eingespielt als Migration pruefung_admin_probelauf_20261126).
-- exams.test = true: Admin kann jederzeit pruefen (Aktionen exam* mit "test": true), ohne 70 %, ohne Wartezeit,
-- ohne Torfreischaltung und ohne Aenderung am Lernstand. "neu": true bricht einen laufenden Probelauf ab.
-- Inhalt siehe Supabase-Migration; Aenderungen: Spalte exams.test, milo_exam (Admin-Zweig), milo_exam_view ('test'),
-- milo_exam_finish und milo_exam_unlock (Probelauf: kein Lernstand, kein Tor).
alter table public.exams add column if not exists test boolean not null default false;
