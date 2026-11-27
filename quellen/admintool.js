  // ================= Admin-Werkzeug im Spiel (27.11.2026) =================
  // Vorbilder: Terraria (Power-Menü mit Schaltern), Fortnite Creative (Handy-Werkzeug zum Platzieren/Verschieben),
  // Minecraft (Teleport, Wegpunkte, Tag/Nacht, Spielregeln), Roblox-Admin-Panels (eine Taste, Reiter, alles im Spiel).
  // Nur sichtbar, wenn der Admin angemeldet ist. Das Spiel läuft im Hintergrund weiter, jede Änderung sieht man sofort.
  // Alles hier gilt nur für den Admin auf diesem Gerät, außer "Bauen" (Stationen werden für alle gespeichert).
  const AT = { s: { god: false, ghost: false, spd: 1, mon: "normal", info: false, kid: false, tap: "" }, tab: "kraft", open: false, small: false, orig: null, was: false, fps: 0 };
  try {
    Object.assign(AT.s, JSON.parse(localStorage.getItem("lz_admtool") || "{}"), { tap: "" });
  } catch {
  }
  const AT_save = () => {
    try {
      localStorage.setItem("lz_admtool", JSON.stringify(AT.s));
    } catch {
    }
  };
  const AT_isAdm = () => !!(typeof Ae != "undefined" && Ae && Ae.admin && KO && KO.adm);
  const AT_api = () => window.__api;
  const AT_pl = () => AT_api() && AT_api().player;
  function AT_css() {
    if (document.getElementById("at-css")) return;
    const st = document.createElement("style");
    st.id = "at-css";
    st.textContent = "#btn-adm{background:linear-gradient(180deg,#ffb020,#c77a00)!important;color:#1a1000!important;font-size:20px}"
      + "#at-panel{position:fixed;z-index:70;right:max(8px,env(safe-area-inset-right));bottom:max(8px,env(safe-area-inset-bottom));width:min(440px,calc(100vw - 16px));max-height:62vh;display:none;flex-direction:column;border-radius:16px;background:rgba(24,16,2,.94);border:1px solid #ffb020;box-shadow:0 8px 30px #000a;color:#fff;font:600 14px system-ui;overflow:hidden}"
      + "#at-panel.small{max-height:none}#at-panel.small .at-body,#at-panel.small .at-tabs{display:none}"
      + ".at-head{flex-shrink:0;display:flex;align-items:center;gap:6px;padding:8px 10px;background:#ffb02022}.at-head b{flex:1;color:#ffcf6a;font-size:15px}"
      + ".at-head button,.at-b{border:1px solid #ffb02088;background:#3a2806;color:#fff;border-radius:10px;padding:7px 10px;font:700 13px system-ui;cursor:pointer}"
      + ".at-tabs{flex-shrink:0;display:flex;gap:4px;padding:6px;overflow-x:auto}.at-tabs button{flex:1;min-width:64px;border:0;border-radius:10px;padding:8px 4px;background:#3a2806;color:#ffdca0;font:700 12px system-ui;white-space:pre-line}.at-tabs button.on{background:#ffb020;color:#1a1000}"
      + ".at-body{overflow-y:auto;padding:4px 10px 12px}.at-row{display:flex;align-items:center;gap:8px;margin:7px 0}.at-row>span{flex:1;min-width:0}.at-row small{display:block;opacity:.65;font-weight:500;font-size:11px}"
      + ".at-seg{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}.at-seg button{border:1px solid #ffb02066;background:#2a1d04;color:#fff;border-radius:9px;padding:7px 9px;font:700 12px system-ui}.at-seg button.on{background:#ffb020;color:#1a1000}"
      + ".at-h{margin:12px 0 4px;color:#ffcf6a;font-size:12px;text-transform:uppercase;letter-spacing:.04em}.at-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}.at-grid .at-b{text-align:left}"
      + ".at-b.go{background:#ffb020;color:#1a1000}.at-b.red{background:#5a1010;border-color:#ff6a6a}.at-it{display:flex;align-items:center;gap:6px;padding:6px 8px;margin:5px 0;border-radius:10px;background:#ffffff0d}.at-it span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.at-it .at-b{padding:6px 8px}"
      + "#at-info{position:fixed;z-index:69;left:50%;transform:translateX(-50%);top:calc(54px + env(safe-area-inset-top));padding:4px 10px;border-radius:10px;background:rgba(24,16,2,.85);border:1px solid #ffb02088;color:#ffdca0;font:700 12px ui-monospace,monospace;pointer-events:none;display:none;white-space:nowrap}"
      + "#at-tapban{position:fixed;z-index:71;left:50%;transform:translateX(-50%);top:calc(84px + env(safe-area-inset-top));padding:8px 12px;border-radius:12px;background:rgba(40,26,0,.95);border:1px solid #ffb020;color:#fff;font:700 13px system-ui;display:none;align-items:center;gap:8px;max-width:92vw}"
      + ".at-in{width:100%;box-sizing:border-box;padding:8px 10px;border-radius:10px;border:1px solid #ffb02066;background:#140c00;color:#fff;font:600 14px system-ui;margin:4px 0}";
    document.head.append(st);
  }
  const AT_btn = (txt, fn, cls) => K("button", { class: "at-b" + (cls ? " " + cls : ""), onclick: (e) => (e.stopPropagation(), fn(), AT_hideUnder()) }, txt);
  // Große Fenster (Admin-Menü, Prüfung, Lernbuch) liegen über dem Spiel: dann das Werkzeug ausblenden, danach wieder zeigen
  const AT_hideUnder = () => {
    const p = document.getElementById("at-panel");
    p && (p.style.visibility = window.__quizOpen ? "hidden" : "");
  };
  const AT_seg = (label, note, opts, cur, set) => K("div", { class: "at-row" }, K("span", {}, label, note ? K("small", {}, note) : ""), K("div", { class: "at-seg" }, opts.map(([v, t]) => K("button", { class: v === cur ? "on" : "", onclick: () => (set(v), AT_draw()) }, t))));
  const AT_h = (t) => K("div", { class: "at-h" }, t);

  // ---------- Spiel-Einstellungen (⚙) vorübergehend ändern, beim Abmelden zurück ----------
  function AT_set(k, v) {
    const M = window.__setm;
    if (!M) return;
    AT.orig || (AT.orig = { ...M.S });
    M.S[k] = v, M.apply(k);
  }
  function AT_restore() {
    const M = window.__setm;
    if (M && AT.orig) {
      for (const k in AT.orig) if (k !== "q" && M.S[k] !== AT.orig[k]) M.S[k] = AT.orig[k], M.apply(k);
    }
    AT.orig = null;
  }

  // ---------- Kräfte anwenden ----------
  function AT_apply() {
    const on = AT_isAdm(), s = AT.s, pl = AT_pl();
    window.__admGod = on && s.god, window.__admGhost = on && s.ghost, window.__admFreeze = on && s.mon === "freeze", window.__admKid = on && s.kid;
    if (pl) {
      if (on && s.spd > 1) pl.spdMul = s.spd;
      else if (AT.spdSet) window.__setm ? window.__setm.apply("spd") : pl.spdMul = 1;
      AT.spdSet = on && s.spd > 1;
    }
    if (on && window.__setm) {
      const S = window.__setm.S, want = s.mon === "off" ? [1, 0] : s.mon === "peace" ? [0, 1] : [0, 0];
      if (s.mon !== "normal" || AT.orig) S.mon !== want[0] && AT_set("mon", want[0]), S.atk !== want[1] && AT_set("atk", want[1]);
    }
    const inf = document.getElementById("at-info");
    inf && (inf.style.display = on && s.info ? "block" : "none");
    AT_tapBanner();
  }
  function AT_tp(x, z, raw) {
    const api = AT_api(), pl = AT_pl();
    if (!api || !pl) return Zs("Spiel noch nicht bereit.");
    const q = raw && AT.s.ghost ? [x, z] : api.world.walk.nearest(x, z) || [x, z];
    pl.stop && pl.stop(), pl.path = null, pl.x = q[0], pl.z = q[1], pl.wx = q[0] - 1, pl.wz = q[1] - 1;
    api.cam.tx = api.goal.tx = q[0], api.cam.tz = api.goal.tz = q[1], api.cam.follow = true;
    window.__selSt = null;
  }
  window.__admTapOn = () => AT_isAdm() && !!AT.s.tap;
  // Wird vom Spiel beim Tippen auf den Boden aufgerufen. true = Tippen war für das Werkzeug.
  window.__admTap = (x, z) => {
    if (!AT_isAdm() || !AT.s.tap) return false;
    const m = AT.s.tap;
    if (m === "tp") return AT_tp(x, z, true), true;
    if (m === "new") return AT.s.tap = "", AT_tapBanner(), KO_newStation({ x, z }), true;
    if (m === "move") {
      const id = AT.moveId;
      AT.s.tap = "", AT_tapBanner();
      return AT_stMove(id, x, z), true;
    }
    return false;
  };
  function AT_tapBanner() {
    let b = document.getElementById("at-tapban");
    if (!b) return;
    const m = AT_isAdm() && AT.s.tap, t = { tp: "\u{1F446} Tippen = Hinbeamen", new: "\u{1F446} Tippe, wo die neue Station hin soll", move: "\u{1F446} Tippe auf den neuen Ort der Station" }[m];
    b.style.display = t ? "flex" : "none";
    t && b.replaceChildren(K("span", {}, t), AT_btn("✕ Aus", () => (AT.s.tap = "", AT_tapBanner(), AT_draw())));
  }
  function AT_tapMode(m) {
    AT.s.tap = AT.s.tap === m ? "" : m;
    AT.s.tap && AT_small(true), AT_tapBanner(), AT_draw();
  }

  // ---------- Stationen ----------
  function AT_stEntry(cfg, s) {
    if (s.custom) return (cfg.extra || []).find((x) => x.id == s.id);
    cfg.st || (cfg.st = {});
    return cfg.st[s.id] || (cfg.st[s.id] = {});
  }
  function AT_stations() {
    const api = AT_api(), pl = AT_pl();
    if (!api || !pl) return [];
    return api.world.stations.map((s) => ({ s, d: Math.hypot(s.x - pl.x, s.z - pl.z) })).sort((a, b) => a.d - b.d);
  }
  function AT_stMove(id, x, z) {
    const api = AT_api(), s = api && api.world.stations.find((t) => t.id == id);
    if (!s || !s.custom) return Zs("Diese Station kann man nicht verschieben (sie gehört zu einem Gebäude).");
    const cfg = KO_cfg(), c = AT_stEntry(cfg, s), w = api.world.walk.nearest(x, z) || [x, z];
    if (!c) return Zs("Station nicht gefunden.");
    Object.assign(c, { x, z, wx: w[0], wz: w[1] }), KO_save(cfg, "Station verschoben (Werkzeug): " + (c.name || s.name), AT_draw);
  }
  function AT_stToggle(s) {
    const cfg = KO_cfg(), c = AT_stEntry(cfg, s);
    if (!c) return;
    c.off = !c.off, KO_save(cfg, "Station " + (c.off ? "aus" : "an") + " (Werkzeug): " + s.name, AT_draw);
  }
  function AT_stRename(s) {
    const n = prompt("Neuer Name für die Station:", s.name);
    if (!n || !n.trim()) return;
    const cfg = KO_cfg(), c = AT_stEntry(cfg, s);
    if (!c) return;
    c.name = n.trim(), c.short = n.trim().slice(0, 12), KO_save(cfg, "Station umbenannt (Werkzeug): " + n.trim(), AT_draw);
  }
  function AT_stDelete(s) {
    if (!s.custom || !confirm("Station „" + s.name + "“ löschen? Lerndaten der Kinder bleiben erhalten.")) return;
    const cfg = KO_cfg();
    cfg.extra = (cfg.extra || []).filter((x) => x.id != s.id), KO_save(cfg, "Station gelöscht (Werkzeug): " + s.name, AT_draw);
  }
  const AT_stOff = (s) => {
    const N = typeof Ne != "undefined" && Ne || {};
    return !!(s.custom ? ((N.extra || []).find((x) => x.id == s.id) || {}).off : ((N.st || {})[s.id] || {}).off);
  };
  const AT_kl = (x, z) => window.__klasseAt ? window.__klasseAt(x, z) || 3 : 3;

  // ---------- Orte ----------
  const AT_orte = () => {
    try {
      return JSON.parse(localStorage.getItem("lz_admorte") || "[]");
    } catch {
      return [];
    }
  };
  const AT_orteSave = (L) => {
    try {
      localStorage.setItem("lz_admorte", JSON.stringify(L));
    } catch {
    }
  };
  function AT_klassenZiele() {
    const out = [], st = AT_stations(), info = window.__klassen && window.__klassen.info ? window.__klassen.info() : null;
    for (const k of [3, 4, 5, 6]) {
      const mine = st.filter((x) => AT_kl(x.s.x, x.s.z) === k);
      if (k === 3) out.push([k, "Start", 2.6, 9]);
      else if (mine.length) out.push([k, mine.length + " Stationen", mine.reduce((a, x) => a + x.s.wx, 0) / mine.length, mine.reduce((a, x) => a + x.s.wz, 0) / mine.length]);
      else if (info) {
        const g = info.tore.find((t) => t.klasse.includes(k));
        g && out.push([k, "am Tor", g.x, g.z]);
      }
    }
    return out;
  }

  // ---------- Reiter ----------
  function AT_tabKraft() {
    const s = AT.s, M = window.__setm, S = M ? M.S : {};
    return [
      AT_seg("\u{1F6E1} Unverwundbar", "Monster und Schüsse machen keinen Schaden", [[false, "Aus"], [true, "An"]], s.god, (v) => (s.god = v, AT_save(), AT_apply())),
      AT_seg("\u{1F47B} Durch Wände laufen", "Mauern, Häuser und Wasser halten dich nicht auf", [[false, "Aus"], [true, "An"]], s.ghost, (v) => (s.ghost = v, AT_save(), AT_apply())),
      AT_seg("\u{1F3C3} Tempo", "", [[1, "1×"], [2, "2×"], [4, "4×"], [8, "8×"]], s.spd, (v) => (s.spd = v, AT_save(), AT_apply())),
      AT_seg("\u{1F47E} Monster", "", [["normal", "Normal"], ["peace", "Friedlich"], ["freeze", "Stopp"], ["off", "Weg"]], s.mon, (v) => (s.mon = v, AT_save(), AT_apply())),
      M ? AT_seg("\u{1F47E} Menge", "", [[0, "1"], [1, "3"], [2, "5"], [3, "10"]], S.cnt, (v) => AT_set("cnt", v)) : "",
      M ? AT_seg("\u{1F305} Tageszeit", "", [[0, "☀ Tag"], [1, "\u{1F319} Nacht"]], S.day, (v) => AT_set("day", v)) : "",
      M ? AT_seg("⚔ Waffen", "", [[0, "Normal"], [1, "Alle offen"]], S.wp, (v) => AT_set("wp", v)) : "",
      K("div", { class: "at-grid" },
        AT_btn("❤ Leben voll", () => {
          const g = AT_api() && AT_api().game;
          g && (g.hp = 100, g.hurt = 0), Zs("Leben aufgefüllt.");
        }),
        AT_btn("\u{1F4A8} Monster wegscheuchen", () => {
          const api = AT_api(), pl = AT_pl();
          api && pl && api.creatures.scatterNear(pl.x, pl.z, 90), Zs("Monster in der Nähe verscheucht.");
        })),
      K("p", { class: "ko-small", style: "opacity:.6;margin-top:10px" }, "Gilt nur für dich als Admin auf diesem Gerät. Beim Abmelden wird alles zurückgesetzt.")
    ];
  }
  function AT_tabReise() {
    const orte = AT_orte(), pl = AT_pl(), info = window.__klassen && window.__klassen.info ? window.__klassen.info() : null, q = AT.q || "";
    const st = AT_stations().filter((x) => !q || x.s.name.toLowerCase().includes(q.toLowerCase())).slice(0, q ? 30 : 8);
    const search = K("input", { class: "at-in", placeholder: "\u{1F50E} Station suchen …", value: q });
    search.addEventListener("input", () => (AT.q = search.value, clearTimeout(AT.qt), AT.qt = setTimeout(() => (AT_draw(), (document.querySelector("#at-panel .at-in") || {}).focus && document.querySelector("#at-panel .at-in").focus()), 350)));
    return [
      K("div", { class: "at-grid" },
        AT_btn((AT.s.tap === "tp" ? "✅ " : "\u{1F446} ") + "Tippen = Hinbeamen", () => AT_tapMode("tp"), AT.s.tap === "tp" ? "go" : ""),
        AT_btn("\u{1F3E0} Zum Start", () => AT_tp(2.6, 9))),
      AT_h("\u{1F3EB} Klassen"),
      K("div", { class: "at-grid" }, AT_klassenZiele().map(([k, t, x, z]) => AT_btn("Klasse " + k + " · " + t, () => AT_tp(x, z)))),
      info && info.tore.length ? AT_h("\u{1F6AA} Tore") : "",
      info && info.tore.length ? K("div", { class: "at-grid" }, info.tore.map((g) => AT_btn((g.bruecke ? "\u{1F309} " : g.offen ? "\u{1F513} " : "\u{1F512} ") + g.klasse.join(" → ") + (g.bruecke ? " Brücke" : ""), () => AT_tp(g.x, g.z)))) : "",
      AT_h("\u{1F4CC} Meine Orte"),
      AT_btn("➕ Diesen Ort merken", () => {
        if (!pl) return;
        const n = prompt("Name für diesen Ort:", "Ort " + (orte.length + 1));
        n && n.trim() && (orte.push({ n: n.trim(), x: Math.round(pl.x * 10) / 10, z: Math.round(pl.z * 10) / 10 }), AT_orteSave(orte), AT_draw());
      }),
      ...orte.map((o, i) => K("div", { class: "at-it" }, K("span", {}, "\u{1F4CC} " + o.n), AT_btn("Hin", () => AT_tp(o.x, o.z, true), "go"), AT_btn("\u{1F5D1}", () => (orte.splice(i, 1), AT_orteSave(orte), AT_draw()), "red"))),
      AT_h("\u{1F4CD} Stationen" + (q ? "" : " (die nächsten)")),
      search,
      ...st.map(({ s, d }) => K("div", { class: "at-it" }, K("span", {}, (AT_stOff(s) ? "⛔ " : "") + s.name + " · K" + AT_kl(s.x, s.z) + " · " + Math.round(d) + " m"), AT_btn("Hin", () => AT_tp(s.wx, s.wz), "go")))
    ];
  }
  function AT_tabBau() {
    const pl = AT_pl(), sel = window.__selSt, near = AT_stations().slice(0, 6);
    const item = (s, d) => K("div", { class: "at-it" }, K("span", {}, (AT_stOff(s) ? "⛔ " : s.custom ? "＋ " : "") + s.name + (d != null ? " · " + Math.round(d) + " m" : "")),
      AT_btn(AT_stOff(s) ? "⛔ aus" : "✅ an", () => AT_stToggle(s)),
      AT_btn("✏", () => AT_stRename(s)),
      s.custom ? AT_btn("\u{1F4CD}", () => pl && AT_stMove(s.id, pl.x, pl.z)) : "",
      s.custom ? AT_btn("\u{1F446}", () => (AT.moveId = s.id, AT_tapMode("move"))) : "",
      s.custom ? AT_btn("\u{1F5D1}", () => AT_stDelete(s), "red") : "");
    return [
      K("p", { class: "ko-small", style: "opacity:.75" }, "Änderungen hier gelten sofort für alle Spieler. ✅/⛔ an/aus · ✏ Name · \u{1F4CD} an meinen Platz · \u{1F446} per Tippen versetzen · \u{1F5D1} löschen. Eingebaute Stationen (an Gebäuden) kann man nur umbenennen und an/aus schalten."),
      K("div", { class: "at-grid" },
        AT_btn("➕ Station hier, wo ich stehe", () => pl && KO_newStation({ x: pl.x, z: pl.z }), "go"),
        AT_btn((AT.s.tap === "new" ? "✅ " : "\u{1F446} ") + "Station per Tippen", () => AT_tapMode("new"))),
      sel ? AT_h("\u{1F3AF} Gerade angetippt") : "",
      sel ? item(sel, null) : "",
      AT_h("\u{1F4CD} In meiner Nähe"),
      ...near.map(({ s, d }) => item(s, d)),
      AT_h("✏ Mehr bearbeiten"),
      K("div", { class: "at-grid" },
        AT_btn("\u{1F4CD} Alle Stationen", () => KO_admStations()),
        AT_btn("✏ Namen & Fächer", () => xl()),
        AT_btn("❓ Aufgaben", () => KO_admTasks()),
        AT_btn("\u{1F389} Events", () => KO_admEvents()))
    ];
  }
  function AT_tabTest() {
    const info = window.__klassen && window.__klassen.info ? window.__klassen.info() : null, d = typeof Li == "function" ? Li() : null, gates = window.__klassen && window.__klassen.gates ? window.__klassen.gates() : [];
    return [
      d ? K("p", { class: "ko-small", style: "opacity:.8" }, "Lernzeit heute: " + Math.floor(d.sec / 60) + " von " + Math.round(Ai() / 60) + " Minuten" + (d.ex ? " · Tagesprüfung erledigt" : "")) : "",
      K("div", { class: "at-grid" },
        AT_btn("⏱ Lernzeit +5 Min.", () => (Li().sec += 300, LZ_bar(), AT_draw())),
        AT_btn("⏱ Lernzeit voll", () => (Li().sec = Math.max(Li().sec, Ai()), LZ_bar(), AT_draw())),
        AT_btn("\u{1F4DD} Tagesprüfung starten", () => TP_start(Ys), "go"),
        AT_btn("↺ Tagesprüfung zurücksetzen", () => (delete Li().ex, delete Li().exRun, LZ_bar(), Zs("Tagesprüfung für heute zurückgesetzt (nur dieses Gerät)."), AT_draw()))),
      AT_h("\u{1F3EB} Klassen & Abschlussprüfung"),
      AT_seg("\u{1F512} Wie ein Kind", "Klassen-Sperren und Tore so erleben, wie ein Kind sie sieht", [[false, "Aus"], [true, "An"]], AT.s.kid, (v) => (AT.s.kid = v, AT_save(), AT_apply())),
      K("div", { class: "at-grid" }, gates.filter((g) => !g.bridge).map((g) => AT_btn("\u{1F393} Prüfung " + g.von + " → " + g.nach, () => window.__prTest ? window.__prTest(g) : Zs("Prüfung nicht geladen."))),
        gates.filter((g) => !g.bridge).map((g) => AT_btn("\u{1F441} Kind-Fenster " + g.von + " → " + g.nach, () => window.__prPreview && window.__prPreview(g))),
        info && info.tore.some((t) => t.bruecke) ? AT_btn("\u{1F309} Brücke testen", () => (AT_small(true), window.__klassen.bridge(info.tore.find((t) => t.bruecke).id))) : ""),
      AT_h("\u{1F3AE} Sonstiges"),
      AT_seg("\u{1F4CF} Infos einblenden", "Position, Klasse, Bilder pro Sekunde, Monster", [[false, "Aus"], [true, "An"]], AT.s.info, (v) => (AT.s.info = v, AT_save(), AT_apply())),
      K("div", { class: "at-grid" },
        AT_btn("\u{1F4CB} Position kopieren", () => {
          const pl = AT_pl();
          if (!pl) return;
          const t = "x " + pl.x.toFixed(1) + ", z " + pl.z.toFixed(1);
          try {
            navigator.clipboard.writeText(t), Zs("Kopiert: " + t);
          } catch {
            Zs(t);
          }
        }),
        window.__musik ? AT_btn("\u{1F3B5} Musik", () => window.__musik.open()) : "",
        AT_btn("\u{1F4DA} Lernbuch", () => Ri()),
        AT_btn("\u{1F4F7} Foto (2K)", () => document.getElementById("btn-shot").click()))
    ];
  }
  function AT_tabMenu() {
    const t = (ic, n, f) => AT_btn(ic + " " + n, f);
    return [
      K("p", { class: "ko-small", style: "opacity:.75" }, "Direkt in die großen Einstellungen. Mit ✕ dort kommst du ins Admin-Menü, mit „Zum Spiel“ zurück ins Spiel."),
      K("div", { class: "at-grid" },
        t("\u{1F46A}", "Eltern & Spieler", KO_admFam), t("\u{1F4CD}", "Stationen", KO_admStations), t("❓", "Aufgaben", KO_admTasks), t("\u{1F389}", "Events", KO_admEvents),
        t("⚔", "Waffen", KO_admWeapons), t("\u{1F48E}", "Gegenstände", KO_admItems), t("\u{1F47E}", "Monster-Werte", KO_admMonsters), t("\u{1F3C6}", "Ränge & Belohnungen", KO_admRewards),
        t("\u{1F4D6}", "Lernsystem", KO_admRules), t("\u{1F5BC}", "Urkunde", UK_tplAdmin), t("\u{1F310}", "Mehrspieler", KO_admMp), t("\u{1F4CA}", "Statistik", KO_admStats),
        t("\u{1F553}", "Verlauf & Rückgängig", KO_admHistory), t("\u{1F511}", "System", KO_admSystem)),
      K("div", { style: "margin-top:8px" }, AT_btn("\u{1F6E1} Ganzes Admin-Menü öffnen", () => Ci(), "go"))
    ];
  }
  const AT_TABS = [["kraft", "⚡\nKräfte", AT_tabKraft], ["reise", "\u{1F4CD}\nReisen", AT_tabReise], ["bau", "\u{1F3D7}\nBauen", AT_tabBau], ["test", "\u{1F9EA}\nTesten", AT_tabTest], ["menu", "☰\nMenü", AT_tabMenu]];
  function AT_small(v) {
    AT.small = v;
    const p = document.getElementById("at-panel");
    p && p.classList.toggle("small", v), AT_draw();
  }
  function AT_draw() {
    const p = document.getElementById("at-panel");
    if (!p || !AT.open) return;
    const T = AT_TABS.find((x) => x[0] === AT.tab) || AT_TABS[0], body = p.querySelector(".at-body"), sc = body ? body.scrollTop : 0;
    let kids = [];
    try {
      kids = T[2]();
    } catch (e) {
      kids = [K("p", {}, "Fehler: " + (e && e.message || e))];
    }
    const nb = K("div", { class: "at-body" }, ...kids);
    p.replaceChildren(
      K("div", { class: "at-head" }, K("b", {}, "\u{1F6E0} Admin-Werkzeug"), K("button", { onclick: () => AT_small(!AT.small) }, AT.small ? "▴ Groß" : "▾ Klein"), K("button", { onclick: () => AT_toggle(false) }, "✕")),
      K("div", { class: "at-tabs" }, AT_TABS.map(([id, t]) => K("button", { class: id === AT.tab ? "on" : "", onclick: () => (AT.tab = id, AT.small = false, p.classList.remove("small"), AT_draw()) }, t))),
      nb);
    nb.scrollTop = sc;
  }
  function AT_toggle(v) {
    AT.open = v == null ? !AT.open : v;
    const p = document.getElementById("at-panel");
    if (!p) return;
    p.style.display = AT.open ? "flex" : "none", AT.open && AT_draw();
  }

  // ---------- Infos-Zeile ----------
  function AT_infoTick() {
    const el = document.getElementById("at-info");
    if (!el || el.style.display === "none") return;
    const pl = AT_pl(), api = AT_api();
    if (!pl || !api) return;
    const n = api.creatures && api.creatures.list ? api.creatures.list.filter((c) => c && c.visible !== false && c.alive !== false && !c.dead).length : 0;
    el.textContent = "x " + pl.x.toFixed(0) + "  z " + pl.z.toFixed(0) + "  · Klasse " + AT_kl(pl.x, pl.z) + "  · " + AT.fps + " FPS  · \u{1F47E} " + n + (AT.s.god ? " · \u{1F6E1}" : "") + (AT.s.ghost ? " · \u{1F47B}" : "") + (AT.s.spd > 1 ? " · " + AT.s.spd + "×" : "");
  }
  (function fpsLoop() {
    let n = 0, t0 = performance.now();
    const f = () => {
      n++;
      const t = performance.now();
      t - t0 >= 1e3 && (AT.fps = Math.round(n * 1e3 / (t - t0)), n = 0, t0 = t), requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  })();

  // ---------- Start: Knopf oben neben ⚙, wird nur beim Admin gezeigt ----------
  function AT_init() {
    if (document.getElementById("btn-adm")) return true;
    const set = document.getElementById("btn-set");
    if (!set) return false;
    AT_css();
    const b = K("button", { class: "btn", id: "btn-adm", title: "Admin-Werkzeug (Taste ´)", style: "display:none", onclick: () => AT_toggle() }, "\u{1F6E0}");
    set.after(b);
    document.body.append(K("div", { id: "at-panel" }), K("div", { id: "at-info" }), K("div", { id: "at-tapban" }));
    addEventListener("keydown", (e) => {
      if (!AT_isAdm() || e.repeat || /INPUT|TEXTAREA|SELECT/.test((e.target || {}).tagName || "")) return;
      (e.key === "`" || e.key === "´" || e.key === "^" || e.key === "Dead") && (e.preventDefault(), AT_toggle());
    });
    return true;
  }
  setInterval(() => {
    if (!AT_init()) return;
    const on = AT_isAdm(), b = document.getElementById("btn-adm");
    b && (b.style.display = on ? "" : "none");
    if (on !== AT.was) {
      AT.was = on;
      on || (AT_toggle(false), AT.s.tap = "", AT_restore());
      AT_apply();
    } else if (on) {
      const pl = AT_pl();
      AT.s.spd > 1 && pl && pl.spdMul !== AT.s.spd && (pl.spdMul = AT.s.spd);
    }
    AT_infoTick(), AT_hideUnder();
  }, 250);
  window.__admTool = { AT, open: () => AT_toggle(true), tab: (t) => (AT.tab = t, AT_toggle(true)), tp: AT_tp, apply: AT_apply };
