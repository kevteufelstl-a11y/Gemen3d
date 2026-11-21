-- Belohnungs-Verlauf: der Server liefert pro Art die bisher gezogenen Belohnungen (ohne abgelehnte), damit jede Belohnung
-- erst einmal gezogen wird, bevor die Liste von vorn beginnt. Rein additiv.
do $$ declare def text; begin
  select pg_get_functiondef('public.milo_rw_status(uuid)'::regprocedure) into def;
  if position('''hist''' in def) = 0 then
    def := replace(def, '''trost'', tp,', '''trost'', tp, ''hist'', coalesce((select jsonb_object_agg(z.kind, z.arr) from (select q.kind, jsonb_agg(q.choice order by q.chosen_at) arr from (select kind, choice, chosen_at from rewards where profile_id = pid and status <> ''abgelehnt'' order by chosen_at desc limit 400) q group by q.kind) z), ''{}''::jsonb),');
    if position('''hist''' in def) = 0 then raise exception 'milo_rw_status: Einhängepunkt nicht gefunden'; end if;
    execute def;
  end if;
end $$;
