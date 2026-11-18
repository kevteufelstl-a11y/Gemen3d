-- Eltern dürfen die Belohnungslisten (Tag/Woche/Monat, je bis zu 10 Einträge) pro Kind umschreiben.
-- Rein additiv: milo_clean_learn bekommt einen zusätzlichen Schlüssel "rewardLists".
do $$ declare def text; begin
  select pg_get_functiondef('public.milo_clean_learn(jsonb)'::regprocedure) into def;
  if position('rewardLists' in def) = 0 then
    def := replace(def, E'  if jsonb_typeof(s->''subjects'') = ''array'' then',
E'  if jsonb_typeof(s->''rewardLists'') = ''object'' then\n    o := o || jsonb_build_object(''rewardLists'', (select jsonb_object_agg(k, coalesce((select jsonb_agg(left(btrim(x), 200)) from (select x from jsonb_array_elements_text(case when jsonb_typeof(s->''rewardLists''->k) = ''array'' then s->''rewardLists''->k else ''[]''::jsonb end) x where btrim(x) <> '''' limit 10) q), ''[]''::jsonb)) from unnest(array[''tag'', ''woche'', ''monat'', ''trost'']) k));\n  end if;\n  if jsonb_typeof(s->''subjects'') = ''array'' then');
    if position('rewardLists' in def) = 0 then raise exception 'Einhängepunkt nicht gefunden'; end if;
    execute def;
  end if;
end $$;
