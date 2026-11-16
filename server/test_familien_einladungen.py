import json, time, threading, http.server, socketserver, functools, sys
from playwright.sync_api import sync_playwright
ROOT = "/home/claude/gemen3d"
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
H.log_message = lambda *a, **k: None
srv = socketserver.TCPServer(("127.0.0.1", 8771), H); srv.allow_reuse_address = True
threading.Thread(target=srv.serve_forever, daemon=True).start()
API = "https://kdhkricbouhnznnduget.supabase.co/functions/v1/api"
FAMS = [{"id": "f1", "no": 1, "name": "Klein"}, {"id": "f2", "no": 2, "name": "Anja"}]
S = {"calls": [], "mode": "none", "invite_state": None}
def handle(a, b):
    S["calls"].append(a)
    if a == "status": return 200, {"ok": True, "setupDone": True, "allowParentSignup": True, "epoch": ""}
    if a == "getConfig": return 200, {"ok": True, "config": None}
    if a == "familyList": return 200, {"ok": True, "families": FAMS}
    if a == "familyPlayers": return 200, {"ok": True, "family": "Klein", "players": [{"name": "Milo", "figure": "🦁", "hasPin": True}]}
    if a == "childLogin": return 200, {"ok": True, "firstLogin": False, "token": "T1", "profile": {"id": "m1", "name": "Milo", "figure": "🦁", "hasPin": True, "settings": {}}}
    if a == "loadAll": return 200, {"ok": True, "saves": [], "progress": [], "confirmations": [], "settings": {}, "gameSettings": {}}
    if a in ("me", "ping"): return 200, {"ok": True, "profile": {"id": "m1", "name": "Milo", "settings": {}, "gameSettings": {}, "role": "child"}, "family": "Klein", "friendRequests": 0}
    if a == "friendList": return 200, {"ok": True, "myCode": "ABC123", "friends": [{"id": "i1", "name": "Ina", "figure": "🐯", "online": True}, {"id": "i2", "name": "Tom", "figure": "🐶", "online": False}], "incoming": [], "outgoing": [], "blocked": []}
    if a == "inviteSend": S["sent"] = b; return 200, {"ok": True, "id": "inv1", "room": "WXYZ", "seconds": 60}
    if a == "inviteList":
        if S["mode"] == "incoming": return 200, {"ok": True, "incoming": [{"id": "inv9", "name": "Ina", "figure": "🐯", "seconds": 55}], "outgoing": []}
        if S["mode"] == "accepted": return 200, {"ok": True, "incoming": [], "outgoing": [{"id": "inv1", "name": "Ina", "status": "accepted", "room": "WXYZ", "seconds": 30}]}
        if S["mode"] == "declined": return 200, {"ok": True, "incoming": [], "outgoing": [{"id": "inv1", "name": "Ina", "status": "declined", "room": None, "seconds": 30}]}
        return 200, {"ok": True, "incoming": [], "outgoing": [{"id": "inv1", "name": "Ina", "status": "pending", "room": None, "seconds": 30}] if S["mode"] == "waiting" else []}
    if a == "inviteRespond": S["resp"] = b; return 200, {"ok": True, "accepted": bool(b.get("accept")), "room": "QQQQ" if b.get("accept") else None}
    if a == "inviteCancel": S["cancel"] = True; return 200, {"ok": True}
    return 200, {"ok": True}
def fwd(route):
    try: b = json.loads(route.request.post_data or "{}")
    except Exception: b = {}
    st, body = handle(b.get("action"), b)
    route.fulfill(status=st, content_type="application/json", body=json.dumps(body), headers={"access-control-allow-origin": "*"})
ok = bad = 0
def check(n, c, x=None):
    global ok, bad
    ok += bool(c); bad += (not c); print(("OK     " if c else "FEHLER ") + n + ("" if c or x is None else "  -> " + str(x)[:300]), flush=True)
with sync_playwright() as p:
    br = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--no-sandbox"])
    pg = br.new_page(viewport={"width": 412, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("dialog", lambda d: d.accept(d.default_value or ""))
    def router(r):
        u = r.request.url
        if u.startswith("http://127.0.0.1"): return r.continue_()
        if u == API or u.startswith(API): 
            if r.request.method == "OPTIONS": return r.fulfill(status=204, headers={"access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "POST, OPTIONS"})
            return fwd(r)
        return r.abort()
    pg.route("**/*", router)
    pg.goto("http://127.0.0.1:8771/index.html"); time.sleep(9)
    Q = lambda s: pg.locator("#quiz >> " + s)
    def shot(n): pg.screenshot(path="/home/claude/test/u_%s.png" % n)
    def has(sel, t=10):
        try: Q(sel).first.wait_for(timeout=t * 1000); return True
        except Exception: return False
    def txt(): return " | ".join(Q("*").all_inner_texts())[:400] if Q("*").count() else ""
    print("--- Test A: Start ohne Familie", flush=True)
    shot("01_start")
    check("Willkommen bei Milo! wird gezeigt", has("text=Willkommen bei Milo!"), pg.inner_text("body")[:200])
    check("Frage 'Zu welcher Familie gehörst du?'", Q("text=Zu welcher Familie").count() >= 1)
    check("Familie Klein – ID 001 in der Liste", has("text=Familie Klein – ID 001"))
    check("Familie Anja – ID 002 in der Liste", Q("text=Familie Anja – ID 002").count() == 1)
    check("Neue Familie registrieren vorhanden", Q("text=Neue Familie registrieren").count() == 1)
    Q("text=Familie Klein – ID 001").first.click(); time.sleep(1.5); shot("02_spieler")
    check("Nach Auswahl: Spielerkacheln der Familie (Milo)", has(".spcard"), None)
    check("Anzeige Familie Klein – ID 001", Q("text=ID 001").count() >= 1)
    fam = pg.evaluate("localStorage.getItem('milo3d_family')")
    check("Familie wird auf dem Gerät gemerkt", fam and '"no":1' in fam, fam)
    Q(".spcard").first.click(); time.sleep(1)
    Q("input[type=password]").first.fill("1234"); Q("button:has-text('Los')").first.click() if Q("button:has-text('Los')").count() else Q("input[type=password]").first.press("Enter"); time.sleep(3)
    shot("03_nach_login")
    print("--- Test B: Freunde + Einladung senden", flush=True)
    ok_login = pg.evaluate("!!document.querySelector('#btn-mp')") 
    check("Anmeldung erfolgreich, Spiel sichtbar", ok_login and Q(".spcard").count() == 0, txt())
    pg.evaluate("window.__quizOpen=false")
    # Freundesliste öffnen: über das Lernbuch-Menü ("Freunde")
    try:
        pg.evaluate("document.querySelector('#btn-quiz, #btn-book, .hud-book')?.click()")
    except Exception: pass
    time.sleep(1)
    opened = False
    for sel in ["button:has-text('Freunde')"]:
        if Q(sel).count() == 0:
            # Lernbuch öffnen über window.__lz.book
            pg.evaluate("window.__lz && window.__lz.book()"); time.sleep(1.5)
        if Q(sel).count(): Q(sel).first.click(); opened = True; break
    time.sleep(1.5); shot("04_freunde")
    check("Freundesliste geöffnet", opened and has("text=Meine Freunde"), txt())
    check("Online-Freund hat Einladen-Knopf", Q("button:has-text('ONLINE – GEMEINSAM SPIELEN')").count() == 1)
    check("Offline-Freund hat keinen Einladen-Knopf", Q("button:has-text('ONLINE – GEMEINSAM SPIELEN')").count() == 1 and Q(".ko-row").count() >= 2)
    S["mode"] = "waiting"
    Q("button:has-text('ONLINE – GEMEINSAM SPIELEN')").first.click(); time.sleep(1.2); shot("05_gesendet")
    check("Server bekam inviteSend mit der Freund-ID", S.get("sent", {}).get("to") == "i1", S.get("sent"))
    check("Warte-Fenster 'Einladung gesendet' sichtbar", pg.locator("#ko-inv").count() == 1 and "Einladung gesendet" in pg.inner_text("#ko-inv"))
    S["mode"] = "accepted"; time.sleep(5); shot("06_angenommen")
    room = pg.evaluate("window.__mp && window.__mp.net && window.__mp.net.room")
    check("Freund hat angenommen -> Absender im Raum WXYZ", room == "WXYZ", room)
    check("Warte-Fenster geschlossen", pg.locator("#ko-inv").count() == 0)
    pg.evaluate("window.__mp.net.leave()")
    print("--- Test C: Ablehnung", flush=True)
    S["mode"] = "none"
    pg.evaluate("window.__lz && window.__lz.book()"); time.sleep(1.5)
    Q("button:has-text('Freunde')").first.click(); time.sleep(1.5)
    print("DEBUG ko-inv:", pg.locator("#ko-inv").count(), pg.inner_text("#ko-inv")[:200] if pg.locator("#ko-inv").count() else "-", "calls:", S["calls"][-6:], flush=True); shot("07a_vor_C")
    S["mode"] = "waiting"; Q("button:has-text('ONLINE – GEMEINSAM SPIELEN')").first.click(timeout=5000); time.sleep(1)
    S["mode"] = "declined"; seen = False
    for _ in range(40):
        time.sleep(0.2)
        if "möchte gerade nicht spielen" in pg.inner_text("body"): seen = True; break
    shot("07_abgelehnt")
    check("Bei NEIN: Absender sieht 'Ina möchte gerade nicht spielen.'", seen and pg.locator("#ko-inv").count() == 0, None)
    check("Bei NEIN: kein Raum", not pg.evaluate("window.__mp.net.room"))
    print("--- Test D: Einladung bekommen", flush=True)
    S["mode"] = "incoming"; time.sleep(12); shot("08_eingehend")
    box = pg.locator("#ko-inv")
    check("Popup erscheint: Möchtest du mit Ina zusammen spielen?", box.count() == 1 and "Möchtest du mit Ina zusammen spielen?" in box.inner_text(), box.inner_text() if box.count() else "kein Popup")
    check("Buttons JA, MITSPIELEN und NEIN, DANKE", box.count() == 1 and "JA, MITSPIELEN" in box.inner_text() and "NEIN, DANKE" in box.inner_text())
    S["mode"] = "none"
    pg.locator("#ko-inv button:has-text('JA, MITSPIELEN')").click(); time.sleep(2); shot("09_ja")
    check("JA: inviteRespond mit accept=true gesendet", S.get("resp", {}).get("accept") is True and S["resp"].get("id") == "inv9", S.get("resp"))
    check("JA: Empfänger im Raum QQQQ", pg.evaluate("window.__mp.net.room") == "QQQQ", pg.evaluate("window.__mp.net.room"))
    pg.evaluate("window.__mp.net.leave()")
    print("--- Fehler im Browser:", errs[:3], flush=True)
    check("Keine Seitenfehler (JavaScript)", len(errs) == 0, errs[:3])
    br.close()
print("ERGEBNIS: %d ok, %d Fehler" % (ok, bad))
