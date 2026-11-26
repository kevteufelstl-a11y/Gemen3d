-- Klassen-Zonen (26.11.2026): Zone 1 = Klasse 3, Zone 2 geteilt in Klasse 4, 5 und 6.
-- Rein additiv: drei neue Zeilen in zones (k4, k5, k6, alle gesperrt) und eine neue Admin-Aktion "zonePlayer"
-- (welche Zonen hat ein Spieler frei?). Freischalten/Sperren laeuft ueber die bestehenden Aktionen zoneGrant/zoneRevoke.

insert into public.zones(id, name, color, status, unlock_rule) values
  ('k4', 'Klasse 4 – Gemen-Süd', '#ffb020', 'locked', '{"type":"exam","exam":null,"tor":"t34"}'),
  ('k5', 'Klasse 5 – Neumühle', '#3aa0ff', 'locked', '{"type":"exam","exam":null,"tor":"t45"}'),
  ('k6', 'Klasse 6 – Aa-Wiesen', '#2fd27a', 'locked', '{"type":"exam","exam":null,"tor":"t56"}')
on conflict (id) do nothing;

create or replace function public.milo_zones(ses public.sessions, p jsonb, a text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare me profiles; pid uuid; zid text;
begin
  if ses.kind is null or ses.kind not in ('child', 'admin') then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;
  select * into me from profiles where id = ses.profile_id and active;
  if me.id is null then return jsonb_build_object('s', 401, 'b', jsonb_build_object('error', 'session')); end if;

  if a = 'zoneAccess' then
    if ses.kind = 'admin' then
      return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true, 'admin', true,
        'zones', coalesce((select jsonb_agg(id order by id) from zones where status not in ('off', 'archived')), '[]'::jsonb)));
    end if;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'zones', coalesce((select jsonb_agg(z.id order by z.id) from zones z
        where z.status in ('active', 'open')
           or (z.status = 'locked' and exists (select 1 from zone_unlocks u where u.zone_id = z.id and u.profile_id = me.id))), '[]'::jsonb)));
  end if;

  if ses.kind <> 'admin' then return jsonb_build_object('s', 403, 'b', jsonb_build_object('error', 'forbidden')); end if;

  if a = 'zoneList' then
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'zones', coalesce((select jsonb_agg(to_jsonb(z) || jsonb_build_object('unlocked', (select count(*) from zone_unlocks u where u.zone_id = z.id)) order by z.id) from zones z), '[]'::jsonb)));
  end if;

  -- Neu 26.11.: freigeschaltete Zonen eines Spielers (fuer den Admin-Knopf "Klassen")
  if a = 'zonePlayer' then
    begin pid := (p->>'profileId')::uuid; exception when others then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'bad')); end;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true,
      'zones', coalesce((select jsonb_agg(u.zone_id order by u.zone_id) from zone_unlocks u where u.profile_id = pid), '[]'::jsonb)));
  end if;

  zid := coalesce(p->>'zone', '');
  if not exists (select 1 from zones where id = zid) then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'zone')); end if;

  if a in ('zoneGrant', 'zoneRevoke') then
    begin pid := (p->>'profileId')::uuid; exception when others then return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'bad')); end;
    if not exists (select 1 from profiles where id = pid) then return jsonb_build_object('s', 404, 'b', jsonb_build_object('error', 'player')); end if;
    if a = 'zoneGrant' then
      insert into zone_unlocks(profile_id, zone_id, via) values (pid, zid, 'admin') on conflict do nothing;
    else
      delete from zone_unlocks where profile_id = pid and zone_id = zid;
    end if;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  if a = 'zoneRuleSet' then
    update zones set unlock_rule = coalesce(p->'rule', '{}'::jsonb), updated_at = now() where id = zid;
    return jsonb_build_object('s', 200, 'b', jsonb_build_object('ok', true));
  end if;

  return jsonb_build_object('s', 400, 'b', jsonb_build_object('error', 'action'));
end $$;
revoke all on function public.milo_zones(public.sessions, jsonb, text) from public, anon, authenticated;
