# Oberflächen-Test Charakter-System: echtes Spiel (index.html) gegen lokale Server-Kopie (PGlite, gleiche SQL wie live)
# Start: node /home/claude/pgtest/apiserver.mjs &  dann: python3 test_charaktere_ui.py [index.html]
import json, time, threading, http.server, socketserver, functools, sys, urllib.request
from playwright.sync_api import sync_playwright
ROOT = "/home/claude/gemen3d"
PAGE = sys.argv[1] if len(sys.argv) > 1 else "index.html"
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
H.log_message = lambda *a, **k: None
socketserver.TCPServer.allow_reuse_address = True
srv = socketserver.TCPServer(("127.0.0.1", 8772), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()
API = "https://kdhkricbouhnznnduget.supabase.co/functions/v1/api"
LOCAL = "http://127.0.0.1:8790/"
CALLS = []
def fwd(route):
    body = route.request.post_data or "{}"
    try: CALLS.append(json.loads(body).get("action"))
    except Exception: pass
    req = urllib.request.Request(LOCAL, data=body.encode(), headers={"content-type": "application/json"})
    try:
        r = urllib.request.urlopen(req); st, out = r.status, r.read()
    except urllib.error.HTTPError as e:
        st, out = e.code, e.read()
    route.fulfill(status=st, content_type="application/json", body=out, headers={"access-control-allow-origin": "*"})
def sql(q):
    return json.loads(urllib.request.urlopen(urllib.request.Request(LOCAL + "sql", data=json.dumps({"q": q}).encode())).read())
ok = bad = 0
def check(n, c, x=None):
    global ok, bad
    ok += bool(c); bad += (not c); print(("OK     " if c else "FEHLER ") + n + ("" if c or x is None else "  -> " + str(x)[:300]), flush=True)
with sync_playwright() as p:
    br = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--no-sandbox", "--ignore-gpu-blocklist"])
    def device():
        ctx = br.new_context(viewport={"width": 412, "height": 900}, device_scale_factor=1)
        pg = ctx.new_page(); pg.errs = []
        pg.on("pageerror", lambda e: pg.errs.append(str(e)[:300])); pg.on("dialog", lambda d: d.accept(d.default_value or ""))
        def router(r):
            u = r.request.url
            if u.startswith("http://127.0.0.1"): return r.continue_()
            if u.startswith(API):
                if r.request.method == "OPTIONS": return r.fulfill(status=204, headers={"access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "POST, OPTIONS"})
                return fwd(r)
            return r.abort()
        pg.route("**/*", router)
        pg.goto("http://127.0.0.1:8772/" + PAGE + "?monsters=0"); time.sleep(10)
        return ctx, pg
    def Q(pg, s): return pg.locator("#quiz >> " + s)
    def has(pg, s, t=12):
        try: Q(pg, s).first.wait_for(timeout=t * 1000); return True
        except Exception: return False
    def shot(pg, n): pg.screenshot(path="/home/claude/test/ch_%s.png" % n)
    def login(pg, name, pin):
        shot(pg, "00_vor_login"); print("SEITE:", pg.inner_text("#quiz")[:300].replace("\n"," | "), flush=True)
        if Q(pg, "text=Familie Klein").count(): Q(pg, "text=Familie Klein").first.click(); time.sleep(1.5)
        Q(pg, ".spcard:has-text('%s')" % name).first.click(); time.sleep(1)
        Q(pg, "input[type=password]").first.fill(pin); Q(pg, "button:has-text('Los')").first.click(); time.sleep(4)
    def menu(pg):
        pg.evaluate("window.__lz && window.__lz.book()"); time.sleep(1.5)
        Q(pg, "button:has-text('MEIN CHARAKTER')").first.click(); time.sleep(2.5)
    look = lambda pg: pg.evaluate("JSON.stringify([window.__player && window.__player.look, !!(window.__player && window.__player.__ch)])")
    def wait_look(pg, txt, t=15):
        for _ in range(t * 2):
            if txt in look(pg): return True
            time.sleep(0.5)
        return False

    print("--- 1/12: bisheriger Spieler, Standardfigur bleibt", flush=True)
    c1, pg = device()
    login(pg, "Kevin", "1111"); time.sleep(2); shot(pg, "01_intro")
    check("Einmalige Auswahl nach der Anmeldung erscheint", has(pg, "text=Neu: Dein eigener Charakter!", 20), pg.inner_text("body")[:300])
    check("Drei Wahlmöglichkeiten + Später", all(Q(pg, "button:has-text('%s')" % t).count() for t in ["bisherige Figur behalten", "Neue Figur aus einem Pack", "Eigenen Charakter bauen", "Später entscheiden"]))
    check("Spieler hat weiter die Standardfigur", look(pg) == "[null,false]", look(pg))
    Q(pg, "button:has-text('bisherige Figur behalten')").first.click(); time.sleep(1.5)
    check("Entscheidung auf dem Server gespeichert", sql("select char_intro_done d from profiles where name='Kevin'")[0]["d"] is True)
    check("Spielstand unverändert", sql("select state->>'punkte' p from game_saves g join profiles p on p.id=g.profile_id where p.name='Kevin'")[0]["p"] == "42")

    print("--- Menü MEIN CHARAKTER", flush=True)
    menu(pg); shot(pg, "02_menue")
    check("Menüpunkt öffnet MEIN CHARAKTER", has(pg, "text=MEIN CHARAKTER"))
    check("Aktiv: Standardfigur klar gekennzeichnet", Q(pg, ".ch-card.on:has-text('Standardfigur')").count() == 1 and Q(pg, "text=✓ AKTIV").count() == 1)
    check("Große Live-Vorschau vorhanden", Q(pg, "canvas.ch-pv").count() == 1)

    print("--- 2: fertige Figur aus Pack", flush=True)
    Q(pg, "button:has-text('Fertige Figur aus einem Pack')").first.click(); time.sleep(4); shot(pg, "03_packs")
    check("Pack 'Fantasy-Völker' wird angezeigt", has(pg, "text=Fantasy-Völker"))
    check("Alle 8 fertigen Figuren des Packs erscheinen automatisch", Q(pg, ".ch-pack:has-text('Fantasy-Völker') .ch-card").count() == 8)
    Q(pg, ".ch-card:has-text('Waldelf')").first.click(); time.sleep(2.5); shot(pg, "04_waldelf")
    Q(pg, "button:has-text('Speichern und damit spielen')").first.click(); time.sleep(3); shot(pg, "05_aktiv_waldelf")
    l = look(pg)
    check("Spielfigur ist jetzt der Waldelf (3D-Modell aktiv)", '"char":"waldelf"' in l and l.endswith("true]"), l)
    check("Auf dem Server gespeichert und ausgewählt", sql("select c.name from profiles p join characters c on c.id=p.active_character where p.name='Kevin'")[0]["name"] == "Waldelf")

    print("--- 2/3: eigenen Charakter bauen, mehrere speichern", flush=True)
    Q(pg, "button:has-text('Eigenen Charakter bauen')").first.click(); time.sleep(3)
    check("Baukasten zeigt Körper zur Wahl", Q(pg, ".ch-chip:has-text('Orkin')").count() == 1)
    Q(pg, ".ch-chip:has-text('Orkin')").first.click(); time.sleep(1.5)
    els = Q(pg, ".ch-el b").all_inner_texts()
    check("Gestaltungselemente: Haut, Frisur, Augen, Oberteil, Hose …", all(any(x in e for e in els) for x in ["Hautfarbe", "Frisur", "Augen", "Oberteil", "Hose"]), els)
    check("Orkin hat keine Hörner-Dateien → Hörner werden nicht angeboten", not any("Hörner" in e for e in els), els)
    Q(pg, ".ch-el:has-text('Oberteil') .ch-chip:has-text('Langarm')").first.click(); time.sleep(0.8)
    Q(pg, ".ch-el:has-text('Farbe Oberteil') .ch-chip:has-text('Blau')").first.click(); time.sleep(0.8)
    Q(pg, ".ch-el:has-text('Frisur') .ch-chip:has-text('Ohne Haare')").first.click(); time.sleep(0.8)
    els2 = Q(pg, ".ch-el b").all_inner_texts()
    check("Ohne Haare: Haarfarbe wird ausgeblendet", not any("Haarfarbe" in e for e in els2), els2)
    Q(pg, ".ch-el:has-text('Frisur') .ch-chip:has-text('Mit Haaren')").first.click(); time.sleep(0.8)
    Q(pg, "input[placeholder=Name]").first.fill("Meine Orkin"); shot(pg, "06_baukasten")
    Q(pg, "button:has-text('Speichern und damit spielen')").first.click(); time.sleep(3); shot(pg, "07_zwei")
    check("Eigener Charakter gespeichert und aktiv", Q(pg, ".ch-card.on:has-text('Meine Orkin')").count() == 1)
    check("Drei Figuren in der Liste (Standard + 2)", Q(pg, ".ko-sec .ch-card").count() == 3)
    d = sql("select data from characters where name='Meine Orkin'")[0]["data"]
    check("Gespeicherte Teile stimmen (Orkin, Langarm, Blau)", d["body"] == "Orc_Female" and d["parts"]["shirt"] == "lang" and d["parts"]["shirtColor"] == "blau", d)

    print("--- 4: wechseln und bearbeiten", flush=True)
    Q(pg, ".ko-sec .ch-card:has-text('Waldelf')").first.click(); time.sleep(2.5)
    check("Wechsel zu Waldelf per Tippen", Q(pg, ".ch-card.on:has-text('Waldelf')").count() == 1 and '"waldelf"' in look(pg))
    Q(pg, ".ko-sec .ch-card:has-text('Meine Orkin') button[title=Bearbeiten]").first.click(); time.sleep(2.5)
    Q(pg, ".ch-el:has-text('Hose') .ch-chip:has-text('Kurze Hose')").first.click(); time.sleep(0.8)
    Q(pg, "button:has-text('Änderungen speichern')").first.click(); time.sleep(2.5)
    check("Bearbeitung gespeichert (Kurze Hose)", sql("select data->'parts'->>'pants' p from characters where name='Meine Orkin'")[0]["p"] == "kurz")
    check("Waldelf bleibt nach dem Bearbeiten einer anderen Figur aktiv", Q(pg, ".ch-card.on:has-text('Waldelf')").count() == 1)
    pg.evaluate("window.__lz && window.__lz.book()"); time.sleep(1)
    check("Spiel läuft mit neuer Figur weiter (kein Fehler)", not pg.errs, pg.errs)
    errs1 = list(pg.errs)

    print("--- 5: nach Abmelden bleibt die Figur", flush=True)
    pg.reload(); time.sleep(10)
    login(pg, "Kevin", "1111"); time.sleep(3)
    check("Nach neuem Start/Anmeldung: Waldelf wieder aktiv", wait_look(pg, '"waldelf"'), look(pg))
    check("Keine erneute Auswahl-Frage", Q(pg, "text=Neu: Dein eigener Charakter!").count() == 0)
    c1.close()

    print("--- 6: anderes Gerät", flush=True)
    c2, pg2 = device()
    login(pg2, "Kevin", "1111"); time.sleep(3)
    check("Anderes Gerät (leerer Speicher): gleicher Charakter geladen", wait_look(pg2, '"waldelf"'), look(pg2))
    menu(pg2); shot(pg2, "08_geraet2")
    check("Anderes Gerät: alle gespeicherten Charaktere da", Q(pg2, ".ko-sec .ch-card").count() == 3)
    c2.close()

    print("--- 7: fremde Charaktere", flush=True)
    c3, pg3 = device()
    login(pg3, "Milo", "2222"); time.sleep(3)
    check("Milo bekommt die Auswahl (eigene Entscheidung)", has(pg3, "text=Neu: Dein eigener Charakter!"))
    Q(pg3, "button:has-text('Später entscheiden')").first.click(); time.sleep(1)
    check("Später: Entscheidung bleibt offen", sql("select char_intro_done d from profiles where name='Milo'")[0]["d"] is False)
    menu(pg3)
    check("Milo sieht nur seine Standardfigur, nicht Kevins Figuren", Q(pg3, ".ko-sec .ch-card").count() == 1 and Q(pg3, "text=Waldelf").count() == 0)
    kid = sql("select id from characters where name='Waldelf'")[0]["id"]
    r = pg3.evaluate("async (id) => (await KO_call('charSelect', { id })).j", kid) if pg3.evaluate("typeof KO_call") == "function" else pg3.evaluate("async (id) => { const r = await fetch('%s', {method:'POST', body: JSON.stringify({action:'charSelect', id, token: (window.__CH && 'x')})}); return r.status }" % API, kid)
    check("Fremden Charakter direkt auswählen wird vom Server abgelehnt", sql("select active_character a from profiles where name='Milo'")[0]["a"] is None, r)

    print("--- 8/9/10: neues Pack hinzufügen (zur Laufzeit wie eine neue Pack-Datei)", flush=True)
    pg3.evaluate("""() => { const fr = __CH.CH_PACKS.get('fantasy_races');
      __CH.CH_REG({ id: 'test_pack', name: 'Test-Pack', version: 1, desc: 'Nur zum Testen', elements: fr.elements, bodies: fr.bodies, models: fr.models, tex: fr.tex,
        characters: [{ id: 'testheld', name: 'Testheld', body: 'Orc_Male', parts: { skin: '3' } }] }); }""")
    menu(pg3)
    Q(pg3, "button:has-text('Fertige Figur aus einem Pack')").first.click(); time.sleep(3); shot(pg3, "09_neues_pack")
    check("Neues Pack erscheint automatisch in der Auswahl", Q(pg3, ".ch-pack:has-text('Test-Pack') .ch-card:has-text('Testheld')").count() == 1)
    check("Bestehendes Pack funktioniert weiterhin", Q(pg3, ".ch-pack:has-text('Fantasy-Völker') .ch-card").count() == 8)
    c3.close()

    print("--- 11: Pack-Update (neue Version mit geänderten Optionen) zerstört keine Figur", flush=True)
    c4, pg4 = device()
    login(pg4, "Kevin", "1111"); time.sleep(3)
    pg4.evaluate("""() => { const fr = __CH.CH_PACKS.get('fantasy_races'); const v2 = JSON.parse(JSON.stringify(Object.assign({}, fr, { models: null, tex: null })));
      v2.models = fr.models; v2.tex = fr.tex; v2.version = 2; v2.elements.pants.options = v2.elements.pants.options.filter(o => o.id !== 'kurz'); __CH.CH_REG(v2); }""")
    r = pg4.evaluate("JSON.stringify(__CH.CH_resolve(__CH.CH.list.find(c=>c.name==='Meine Orkin').data).parts)")
    check("Figur mit nicht mehr vorhandener Option wird mit Ersatz angezeigt", '"pants":"lang"' in r, r)
    check("Gespeicherte Daten bleiben unverändert", sql("select data->'parts'->>'pants' p from characters where name='Meine Orkin'")[0]["p"] == "kurz")
    pg4.evaluate("__CH.CH_PACKS.delete('fantasy_races')")
    r = pg4.evaluate("JSON.stringify(__CH.CH_resolve(__CH.CH.list[0].data))")
    check("Fehlt ein Pack ganz, wird sicher die Standardfigur gezeigt", '"classic":true' in r, r)
    check("Kein Spieler/Charakter verloren", sql("select count(*)::int n from characters")[0]["n"] == 2)

    print("--- Standard wiederherstellen + Löschen", flush=True)
    c4.close(); c5, pg5 = device(); login(pg5, "Kevin", "1111"); time.sleep(3); menu(pg5)
    Q(pg5, "button:has-text('Standardfigur wiederherstellen')").first.click(); time.sleep(2.5)
    check("Standardfigur wiederhergestellt", look(pg5) == "[null,false]" and Q(pg5, ".ch-card.on:has-text('Standardfigur')").count() == 1)
    Q(pg5, ".ko-sec .ch-card:has-text('Meine Orkin') button[title=Löschen]").first.click(); time.sleep(2.5)
    check("Eigene Figur gelöscht, andere bleiben", sql("select count(*)::int n from characters")[0]["n"] == 1 and Q(pg5, ".ko-sec .ch-card").count() == 2)
    shot(pg5, "10_ende")
    check("Keine JavaScript-Fehler", not pg5.errs and not errs1, pg5.errs + errs1)
    c5.close()
    print("Aufrufe:", sorted(set(a for a in CALLS if a and a.startswith("char"))))
    print(f"\nErgebnis: {ok} OK, {bad} Fehler")
    br.close()
