-- Rueckgaengig machen der Abschlusspruefung (12_abschlusspruefung.sql). Nur bei Bedarf ausfuehren!
-- 1. milo_api und milo_clean_learn auf den Stand vor dem 26.11. zuruecksetzen (Sicherung in backup_20261126)
do $$ begin
  execute (select def from backup_20261126.function_defs where name = 'milo_api');
  execute (select def from backup_20261126.function_defs where name = 'milo_clean_learn');
end $$;
-- 2. Pruefungsdaten entfernen (Tabellen) – die neuen Spalten in learning_progress koennen bleiben, sie stoeren nicht.
-- drop table if exists public.exams; drop table if exists public.exam_keys;
-- 3. Durch Pruefungen geoeffnete Tore wieder schliessen:
-- delete from public.zone_unlocks where via = 'exam';
