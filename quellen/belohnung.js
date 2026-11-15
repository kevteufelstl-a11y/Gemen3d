  // ---------- Belohnungssystem: Tages-, Wochen- und Monatsbelohnungen ----------
  var RW = { d: null, avail: 0 };
  var RW_IC = { tag: "\u{1F381}", woche: "\u{1F3C5}", monat: "\u{1F3C6}" };
  var RW_NAME = { tag: "Tägliche Belohnungen", woche: "Wochenbelohnungen", monat: "Monatsbelohnungen" };
  var RW_DEF = {
    tag: [["⏰", "15 Minuten länger aufbleiben"], ["\u{1F35D}", "Sich ein Essen wünschen, das irgendwann im Laufe der Woche gekocht wird"], ["\u{1F310}", "15 Minuten länger Internet am selben Tag"], ["\u{1F36C}", "Eine Süßigkeit im Wert von maximal 1 € wünschen"], ["\u{1F6B6}", "Einen gemeinsamen Spaziergang oder Weg wünschen, den wir zusammen laufen"], ["\u{1F333}", "15 Minuten länger draußen spielen"]],
    woche: [["\u{1F3AC}", "Einen Film aussuchen, den wir gemeinsam anschauen"], ["\u{1F372}", "Zwei Essen wünschen, die im Laufe der Woche gekocht werden"], ["\u{1F36B}", "Eine Süßigkeit im Wert von 2–3 € wünschen"], ["\u{1F319}", "An einem selbst gewählten Tag 25 Minuten länger aufbleiben"], ["\u{1F4F1}", "An einem selbst gewählten Tag 20 Minuten länger Internet nutzen"]],
    monat: [["\u{1F3A1}", "Du darfst aussuchen, was wir gemeinsam unternehmen (z. B. Schwimmen gehen, ins Kino gehen oder einen gemeinsamen Feuerabend machen)"], ["\u{1F355}", "Du darfst aussuchen, was wir gemeinsam zu essen bestellen"], ["\u{1F415}", "Du darfst einen Ausflugsort für die ganze Familie aussuchen, inklusive der Hunde (z. B. Landschaftspark mit einer gemeinsamen Runde, eine Panzerstrecke oder ein anderer Ort deiner Wahl)"], ["⛺", "Im Sommer: ein besonderer Survival-Tag mit Übernachtung im Zelt"]]
  };
  var RW_ST = { offen: ["⏳", "Wartet auf die Eltern", "#ffb020"], bestaetigt: ["✅", "Von den Eltern bestätigt – noch nicht eingelöst", "#6fd68a"], abgelehnt: ["❌", "Abgelehnt – such dir eine andere aus", "#ff6b6b"], eingeloest: ["\u{1F389}", "Eingelöst", "#7cc0ff"] };
  (function RW_css() {
    let st = document.createElement("style");
    st.textContent = ".rwsec{margin:10px 0;padding:10px 12px;border-radius:14px;background:#ffffff10;border:1px solid #ffffff22}.rwsec h3{margin:0 0 4px;font-size:16px}.rwsec.un{border-color:#ffd54a;box-shadow:0 0 14px #ffd54a55;animation:rwglow 2s ease-in-out infinite}@keyframes rwglow{50%{box-shadow:0 0 24px #ffd54aaa}}.rwc{display:flex;gap:10px;align-items:center;width:100%;box-sizing:border-box;text-align:left;padding:9px 12px;margin:5px 0;border-radius:12px;border:1px solid #6fd68a88;background:#16301f;color:#fff;font:600 13.5px/1.25 system-ui,sans-serif;animation:rwpop .35s ease both}.rwc .ic{font-size:24px;flex:none}.rwc.lock{opacity:.5;filter:grayscale(.8);border-color:#ffffff33;background:#222}.rwc.sel{border-color:#ffd54a;background:#3a3216}@keyframes rwpop{0%{transform:scale(.7);opacity:0}70%{transform:scale(1.04)}100%{transform:scale(1);opacity:1}}.rwb{display:inline-block;margin:2px 0;padding:2px 9px;border-radius:99px;font:700 12px system-ui,sans-serif;color:#111}.rwp{height:9px;border-radius:5px;background:#0006;overflow:hidden;margin:6px 0}.rwp i{display:block;height:100%;background:linear-gradient(90deg,#6fd68a,#ffd54a)}.rwgrid{display:flex;flex-wrap:wrap;gap:3px;margin:6px 0}.rwd{width:24px;height:24px;border-radius:6px;font:700 11px/24px system-ui,sans-serif;text-align:center;background:#ffffff1a;color:#fff9}.rwd.ok{background:#2f9e55;color:#fff}.rwd.bad{background:#c0392b;color:#fff}.rwd.today{outline:2px solid #ffd54a}.rwpop{text-align:center;animation:rwpop .6s ease both}.rwpop .big{font-size:64px}.rwrow{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}";
    document.head.append(st);
  })();
  function RW_list(kind) {
    let L = Ne.rewardLists && Ne.rewardLists[kind];
    return L && L.filter((x) => String(x).trim()).length ? L.filter((x) => String(x).trim()).map((x) => [RW_IC[kind], String(x).trim()]) : RW_DEF[kind];
  }
  var RW_fd = (s, o) => new Date(s + "T12:00:00").toLocaleDateString("de-DE", o);
  function RW_label(kind, x) {
    if (kind === "tag") return (RW.d && x.period === RW.d.today ? "Heute · " : "") + RW_fd(x.period, { weekday: "long", day: "numeric", month: "long" });
    if (kind === "woche") return "Woche " + x.period.slice(-2) + " (" + RW_fd(x.from, { day: "numeric", month: "numeric" }) + " – " + RW_fd(x.to, { day: "numeric", month: "numeric" }) + ")";
    return new Date(x.period + "-15T12:00:00").toLocaleDateString("de-DE", { month: "long", year: "numeric" });
  }
  async function RW_fetch() {
    if (!Ae || Ae.offline || !Ae.token || Ae.admin) return null;
    let r = await KO_call("rewardList");
    if (!r.j || !r.j.ok) return null;
    return RW_set(r.j.rewards), RW.d;
  }
  function RW_set(d) {
    RW.d = d, RW.avail = ["tag", "woche", "monat"].reduce((a, k) => a + d[k].filter((x) => x.reached && (!x.pick || x.pick.status === "abgelehnt")).length, 0);
    let b = document.getElementById("rwbadge");
    b && (b.textContent = RW.avail ? String(RW.avail) : "", b.style.display = RW.avail ? "" : "none");
  }
  function RW_goal() {
    Zs("\u{1F381} Tagesziel geschafft! Hol dir deine Belohnung unter „Meine Belohnungen“."), setTimeout(RW_fetch, 4000);
  }
  var RW_badge = () => K("span", { class: "ko-badge", id: "rwbadge", style: RW.avail ? "" : "display:none" }, RW.avail ? String(RW.avail) : "");
  function RW_seen(key, set) {
    let k = "milo_rw_seen_" + (Ae && (Ae.id || Ae.name)), s = [];
    try { s = JSON.parse(localStorage.getItem(k) || "[]"); } catch (e) {}
    if (set) { s.includes(key) || s.push(key); try { localStorage.setItem(k, JSON.stringify(s.slice(-80))); } catch (e) {} }
    return s.includes(key);
  }
  function RW_status(p) {
    let s = RW_ST[p.status];
    return K("div", {}, K("span", { class: "rwb", style: "background:" + s[2] }, s[0] + " " + s[1]));
  }
  function RW_days(m) {
    return K("div", { class: "rwgrid" }, (m.monthDays || []).map((x) => K("div", { class: "rwd " + (x.ok ? "ok" : x.future ? "" : "bad") + (x.d === RW.d.today ? " today" : ""), title: x.d }, String(+x.d.slice(8)))));
  }
  function RW_cards(kind, x, locked) {
    let pick = x.pick;
    return RW_list(kind).map(([ic, t]) => K(locked ? "div" : "button", { class: "rwc" + (locked ? " lock" : "") + (pick && pick.choice === t ? " sel" : ""), onclick: locked ? null : () => RW_ask(kind, x, ic, t) }, K("span", { class: "ic" }, locked ? "\u{1F512}" : ic), K("span", {}, t)));
  }
  function RW_item(kind, x) {
    let pick = x.pick, un = x.reached && (!pick || pick.status === "abgelehnt"), kids = [];
    if (kind === "woche") kids.push(K("p", { class: "ko-small" }, x.days + " von " + x.need + " Lerntagen geschafft"), K("div", { class: "rwp" }, K("i", { style: "width:" + Math.min(100, x.days / x.need * 100) + "%" })));
    if (kind === "monat") {
      kids.push(K("p", { class: "ko-small" }, x.days + " von " + x.total + " Lerntagen geschafft" + (x.lost ? "" : x.reached ? "" : " – kein Tag darf fehlen!")), K("div", { class: "rwp" }, K("i", { style: "width:" + (x.total ? Math.min(100, x.days / x.total * 100) : 0) + "%" })), RW_days(x));
      x.lost && kids.push(K("p", { class: "qmsg", style: "color:#ff8a8a" }, "Leider verpasst: " + x.missed.map((d) => RW_fd(d, { day: "numeric", month: "numeric" })).join(", ") + ". Die Monatsbelohnung entfällt in diesem Monat – ein Nachholen gibt es nicht. Nächsten Monat klappt es!"));
    }
    if (kind === "tag" && !x.reached) kids.push(K("p", { class: "ko-small" }, "Erreiche dein Tagesziel (" + je.dailyMinutes + " Minuten lernen und Tagesprüfung), dann darfst du eine Belohnung ziehen."));
    if (pick) kids.push(K("p", { class: "qmsg", style: "margin:4px 0" }, RW_IC[kind] + " Du hast gezogen: " + pick.choice), RW_status(pick));
    if (pick && (pick.status === "offen" || pick.status === "bestaetigt")) kids.push(K("button", { class: "qbtn", onclick: () => RW_parentSet(kind, x) }, "\u{1F468}‍\u{1F469} Eltern: Status ändern"));
    if (un) kids.push(K("p", { class: "qmsg", style: "color:#ffd54a" }, "\u{1F513} Freigeschaltet! Lass das Glück entscheiden:"), K("button", { class: "qbtn go", onclick: (e) => RW_draw(kind, x, e.target) }, "\u{1F3B2} Belohnung ziehen"));
    else if (!pick) kids.push(...RW_cards(kind, x, true));
    return K("div", { class: "rwsec" + (un ? " un" : "") }, K("h3", {}, (x.reached ? "✅ " : x.lost ? "❌ " : "\u{1F512} ") + RW_label(kind, x)), ...kids);
  }
  async function RW_open(data) {
    let box = K("div", {}, K("p", { class: "qmsg" }, "Lade …"));
    ln().append(KO_box("wide", K("div", { class: "qhead" }, K("h2", {}, "\u{1F381} Meine Belohnungen"), K("button", { class: "qx", onclick: Ri }, "✕")), box));
    let d = data && data.tag ? (RW_set(data), data) : await RW_fetch();
    if (!d) return void box.replaceChildren(K("p", { class: "qmsg" }, "Für die Belohnungen brauchst du Internet und ein Spieler-Konto."));
    let newly = [];
    for (let k of ["tag", "woche", "monat"]) for (let x of d[k]) if (x.reached && !RW_seen(k + x.period)) newly.push([k, x]);
    box.replaceChildren(...["tag", "woche", "monat"].map((k) => K("div", {}, K("h2", { style: "margin:14px 0 2px" }, RW_IC[k] + " " + RW_NAME[k]), ...d[k].map((x) => RW_item(k, x)))));
    if (newly.length) {
      for (let [k, x] of newly) RW_seen(k + x.period, true);
      let [k, x] = newly[0];
      RW_unlockPopup(k, x, newly.length);
    }
  }
  function RW_unlockPopup(kind, x, n) {
    let o = K("div", { style: "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#0008" }, K("div", { class: "qbox rwpop", style: "max-width:80vw" }, K("div", { class: "big" }, RW_IC[kind]), K("h2", {}, "\u{1F513} Belohnung freigeschaltet!"), K("p", { class: "qsub" }, RW_NAME[kind] + (n > 1 ? " (und " + (n - 1) + " weitere)" : "")), K("button", { class: "qbtn go", onclick: () => o.remove() }, "Super!")));
    document.body.append(o), setTimeout(() => o.remove(), 8000);
  }
  function RW_ask(kind, x, ic, t) {
    ln().append(KO_box("", K("h2", {}, "\u{1F381} Das wählst du:"), K("p", { class: "qbig" }, ic + " " + t), K("p", { class: "qmsg" }, "Die Eltern bekommen deine Belohnung und bestätigen sie."), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: (e) => RW_pick(kind, x, t, e.target) }, "Ja, das nehme ich"), K("button", { class: "qbtn", onclick: () => RW_open() }, "Zurück"))));
  }
  function RW_draw(kind, x, btn) {
    if (RW.busy) return;
    let l = RW_list(kind), c = l[Math.floor(Math.random() * l.length)];
    btn.disabled = true;
    RW_pick(kind, x, c[1], btn, c[0]);
  }
  async function RW_pick(kind, x, t, btn, ic) {
    if (RW.busy) return;
    RW.busy = true, btn.disabled = true;
    try {
      Pi(), await KO_call("save", { game: "milo3d_days", state: { days: ye.days } });
      let r = await KO_call("rewardPick", { kind, period: x.period, choice: t });
      r.j.error === "not_reached" && (await new Promise((s) => setTimeout(s, 1500)), await KO_call("save", { game: "milo3d_days", state: { days: ye.days } }), r = await KO_call("rewardPick", { kind, period: x.period, choice: t }));
      if (r.j.ok && ic) RW_result(ic, t, r.j.rewards);
      else if (r.j.ok) Zs("\u{1F389} Gezogen! Die Eltern bekommen deine Belohnung."), RW_open(r.j.rewards);
      else Zs(r.j.error === "already" ? "Du hast schon gezogen." : r.j.error === "not_reached" ? "Das Ziel ist noch nicht ganz erreicht." : KO_msg(r)), RW_open();
    } finally {
      RW.busy = false;
    }
  }
  function RW_result(ic, t, d) {
    let o = K("div", { style: "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#000a" }, K("div", { class: "qbox rwpop", style: "max-width:80vw" }, K("div", { class: "big" }, ic), K("h2", {}, "\u{1F389} Du hast gezogen:"), K("p", { class: "qbig" }, t), K("p", { class: "qmsg" }, "Die Eltern bestätigen deine Belohnung."), K("button", { class: "qbtn go", onclick: () => (o.remove(), RW_open(d)) }, "Super!")));
    document.body.append(o);
  }
  // Eltern am Gerät des Kindes: Elternpasswort wird nur an den Server geschickt, nie gespeichert
  function RW_parentSet(kind, x) {
    let pw = KO_in("Eltern-Passwort", "password"), m = K("p", { class: "qmsg" }, "Nur für Erwachsene."), set = async (s) => {
      if (!pw.value) return void (m.textContent = "Bitte das Eltern-Passwort eingeben.");
      m.textContent = "Prüfe …";
      let r = await KO_call("rewardParentSet", { id: x.pick.id, status: s, parentPassword: pw.value });
      if (!r.j.ok) return void (m.textContent = KO_msg(r));
      Zs("Gespeichert."), RW_open(r.j.rewards);
    };
    ln().append(KO_box("ko-p", KO_role("p"), K("h2", {}, "\u{1F468}‍\u{1F469} Belohnung: " + RW_label(kind, x)), K("p", { class: "qbig" }, x.pick.choice), pw, m, K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: () => set("bestaetigt") }, "✅ Bestätigen"), K("button", { class: "qbtn", onclick: () => set("abgelehnt") }, "❌ Ablehnen"), K("button", { class: "qbtn", onclick: () => set("eingeloest") }, "\u{1F389} Eingelöst"), K("button", { class: "qbtn", onclick: () => RW_open() }, "Zurück"))));
  }
  // Elternbereich: alle Belohnungen eines Kindes
  function RW_parent(c) {
    let box = K("div", {}, K("p", { class: "ko-small" }, "Lade …"));
    KO_call("rewardParentList", { childId: c.id }, "p").then((r) => {
      if (!r.j || !r.j.ok) return void box.replaceChildren(K("p", { class: "ko-small" }, "Nicht erreichbar."));
      let d = r.j.rewards, all = r.j.all, T = { tag: "Tag", woche: "Woche", monat: "Monat" }, cm = d.monat[0], per = (a) => a.kind === "tag" ? RW_fd(a.period, { day: "numeric", month: "numeric" }) : a.kind === "woche" ? "KW " + a.period.slice(-2) : new Date(a.period + "-15T12:00").toLocaleDateString("de-DE", { month: "long" });
      RW.d = d;
      let act = (a, s, lbl) => K("button", { class: "qbtn", onclick: async () => {
        let x = await KO_call("rewardSetParent", { id: a.id, status: s }, "p");
        Zs(x.j.ok ? "Gespeichert." : KO_msg(x)), x.j.ok && box.replaceWith(RW_parent(c));
      } }, lbl);
      box.replaceChildren(
        ...(cm ? [K("p", { class: "ko-small" }, "Monatsübersicht " + RW_label("monat", cm) + ": " + cm.days + " von " + cm.total + " Tagen geschafft" + (cm.lost ? " – Monatsbelohnung entfällt (verpasst: " + cm.missed.map((m) => RW_fd(m, { day: "numeric", month: "numeric" })).join(", ") + ")" : cm.reached ? " – Monatsbelohnung freigeschaltet" : "")), RW_days(cm)] : []),
        ...(all.length ? all.map((a) => K("div", { class: "rwsec" }, K("h3", {}, RW_IC[a.kind] + " " + T[a.kind] + " · " + per(a)), K("p", { class: "qmsg", style: "margin:2px 0" }, a.choice), RW_status(a), K("div", { class: "rwrow" }, a.status !== "bestaetigt" && act(a, "bestaetigt", "✅ Bestätigen"), a.status !== "abgelehnt" && act(a, "abgelehnt", "❌ Ablehnen"), a.status !== "eingeloest" && act(a, "eingeloest", "\u{1F389} Eingelöst"), a.status !== "offen" && act(a, "offen", "↩ Auf offen")))) : [K("p", { class: "ko-small" }, "Noch keine Belohnung ausgewählt.")]));
    });
    return box;
  }
  function RW_adminLists(cfg) {
    let L = cfg.rewardLists || (cfg.rewardLists = { tag: [], woche: [], monat: [] });
    return ["tag", "woche", "monat"].flatMap((k) => [K("p", { class: "qmsg" }, RW_IC[k] + " " + RW_NAME[k] + " (eine Belohnung pro Zeile)"), K("textarea", { class: "qin", rows: 5, onchange: (e) => L[k] = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) }, (L[k] && L[k].length ? L[k] : RW_DEF[k].map((x) => x[1])).join("\n"))]);
  }
