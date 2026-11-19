-- Urkunden-Schutz: Lerntage (und damit Urkunden) eines Kontos werden beim Speichern nie gelöscht.
-- Ein neues Gerät mit leeren Daten kann den Server-Stand so nicht überschreiben. Pro Tag werden die Felder zusammengeführt.
create or replace function public.milo_days_merge() returns trigger language plpgsql set search_path = public as $$
declare od jsonb; nd jsonb; k text; res jsonb;
begin
  if new.game <> 'milo3d_days' then return new; end if;
  od := coalesce(old.state->'days', '{}'::jsonb);
  nd := coalesce(new.state->'days', '{}'::jsonb);
  if jsonb_typeof(od) <> 'object' then return new; end if;
  if jsonb_typeof(nd) <> 'object' then nd := '{}'::jsonb; end if;
  res := od;
  for k in select jsonb_object_keys(nd) loop
    if jsonb_typeof(res->k) = 'object' and jsonb_typeof(nd->k) = 'object' then res := jsonb_set(res, array[k], (res->k) || (nd->k));
    else res := jsonb_set(res, array[k], nd->k, true); end if;
  end loop;
  new.state := jsonb_set(coalesce(new.state, '{}'::jsonb), '{days}', res, true);
  return new;
end $$;
drop trigger if exists milo_days_merge_trg on public.game_saves;
create trigger milo_days_merge_trg before update on public.game_saves for each row execute function public.milo_days_merge();
