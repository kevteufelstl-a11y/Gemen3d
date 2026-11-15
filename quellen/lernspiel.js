  // ================= Lernspiel-Erweiterung (15.11.2026) =================
  // Spieler-Auswahl, Lernzeit-Leiste, Tagesprüfung, Diktat/Abschreiben mit Elternkontrolle, neue Urkunde.
  // Hängt sich an die bestehenden Funktionen von Testversion 11 (Login, Lernzeit, Noten, Urkunde) an.
  var LZ_GN = ["", "Sehr gut", "Gut", "Befriedigend", "Ausreichend", "Mangelhaft", "Ungen\xFCgend"];
  var LZ_pct = (r, n) => n ? Math.round(r / n * 100) : 0;
  var UK_fach = (f) => (fl[f] && fl[f].f || "Fach").replace(" bis Klasse 6", "");
  (function LZ_css() {
    let st = document.createElement("style");
    st.textContent = "#lzbar{position:fixed;left:max(12px,env(safe-area-inset-left));top:max(10px,env(safe-area-inset-top));z-index:60;width:min(300px,38vw);min-width:150px;box-sizing:border-box;padding:4px 8px 5px;border-radius:12px;background:rgba(8,14,12,.9);border:1px solid var(--line,#3a5);font:700 11.5px/1.2 system-ui,sans-serif;color:#fff;text-align:left;cursor:pointer;pointer-events:auto;box-shadow:0 2px 10px #0008}#lzbar .lzb{height:6px;border-radius:4px;background:rgba(255,255,255,.14);overflow:hidden;margin:3px 0 2px}#lzbar .lzb i{display:block;height:100%;width:0;background:linear-gradient(90deg,#3fd46b,#9dff5a);transition:width .5s}#lzbar.done .lzb i{background:linear-gradient(90deg,#ffd34d,#ff9f1a)}#lzbar .lze{font-weight:600;font-size:10.5px;opacity:.9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}body.lzon #title{visibility:hidden}#quiz{padding-top:78px!important}#quiz>.qbox{position:relative;z-index:2}.spgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px;margin:12px 0}.spcard{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 6px;border-radius:14px;border:1px solid var(--line,#3a5);background:rgba(255,255,255,.06);color:#fff;font-size:16px}.spav{font-size:46px;line-height:1}.spav.big{font-size:70px}.spavs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:6px 0}.spavb{font-size:30px;width:52px;height:52px;border-radius:12px;border:2px solid transparent;background:rgba(255,255,255,.06)}.spavb.on{border-color:#9dff5a;background:rgba(89,255,90,.2)}.dkword{font:700 46px/1.2 Georgia,serif;color:#fff;margin:22px 0;word-break:break-word}.dktext{text-align:left;font-size:17px;line-height:1.5;background:rgba(255,255,255,.07);padding:10px 12px;border-radius:10px;user-select:text;-webkit-user-select:text}.dknum{display:flex;align-items:center;justify-content:center;gap:10px;margin:10px 0}.dknum .qin{width:110px;font-size:26px}.dknum .qbtn{min-width:56px;font-size:24px}.dkstat{text-align:left;margin:8px auto;max-width:340px;font-size:15px;line-height:1.6}";
    document.head.append(st);
  })();

  // ---------- Lernzeit pro Fach und pro Aufgabe ----------
  function LZ_tick(e, t) {
    let f = window.__curFi;
    f != null && ((e.ss || (e.ss = {}))[f] = (e.ss[f] || 0) + t);
  }
  function LZ_ans(d, q, ok) {
    if (window.__qStart != null) {
      let dt = Math.max(0, d.sec - window.__qStart);
      d.qt = (d.qt || 0) + Math.min(dt, 300), d.qn = (d.qn || 0) + 1, window.__qStart = null;
    }
    ok || ((d.wr || (d.wr = [])).includes(q.id) || d.wr.push(q.id));
  }
  function LZ_merge(s, n) {
    for (let k in n) k in s || (s[k] = n[k]);
    let ids = new Set((s.dk || []).map((x) => x.id));
    for (let x of n.dk || []) ids.has(x.id) || ((s.dk || (s.dk = [])).push(x), ids.add(x.id));
    let pids = new Set((s.pend || []).map((x) => x.id));
    for (let x of n.pend || []) pids.has(x.id) || ids.has(x.id) || (s.pend || (s.pend = [])).push(x);
    s.pend && (s.pend = s.pend.filter((x) => !ids.has(x.id)));
    !s.ex && n.ex && (s.ex = n.ex, delete s.exRun);
    for (let x of n.wr || []) (s.wr || (s.wr = [])).includes(x) || s.wr.push(x);
    (n.qn || 0) > (s.qn || 0) && (s.qn = n.qn, s.qt = n.qt);
    (n.dn || 0) > (s.dn || 0) && (s.dn = n.dn, s.dt = n.dt);
  }

  // ---------- Leiste oben ----------
  function LZ_loginOpen() {
    return !!(wi && wi.style.display !== "none" && wi.querySelector(".splogin"));
  }
  function LZ_bar() {
    let b = document.getElementById("lzbar");
    if (!Ae || LZ_loginOpen()) {
      b && (b.style.display = "none"), document.body.classList.remove("lzon");
      return;
    }
    b || (b = K("div", { id: "lzbar", onclick: LZ_barTap }, K("div", {}), K("div", { class: "lzb" }, K("i")), K("div", { class: "lze" })), document.body.append(b));
    b.style.display = "", document.body.classList.add("lzon");
    let d = Li(), need = Ai(), done = Math.min(d.sec, need), rest = Math.max(0, Math.ceil((need - d.sec) / 60));
    b.children[0].textContent = "⏱ " + Math.floor(done / 60) + " von " + je.dailyMinutes + " Minuten geschafft";
    b.children[1].firstChild.style.width = done / need * 100 + "%";
    b.children[2].textContent = d.ex ? "✅ Tagespr\xFCfung geschafft! Tippen = Urkunde" : window.__tpRun ? "\u{1F3C1} Tagespr\xFCfung l\xE4uft …" : d.sec >= need ? "\u{1F3C1} Die Tagespr\xFCfung ist bereit! Hier tippen." : "\u{1F3C1} Noch " + rest + (rest === 1 ? " Minute" : " Minuten") + " bis zur Tagespr\xFCfung";
    b.classList.toggle("done", d.sec >= need);
  }
  function LZ_barTap() {
    if (!Ae || window.__tpRun || window.__dkRun) return;
    let d = Li();
    if (d.sec >= Ai()) return d.ex ? Pr(Ys) : TP_offer(null, Ys);
    window.__quizOpen || Ri();
  }
  setInterval(LZ_bar, 1e3);

  // Knöpfe an einer Station und im Lernbuch
  function LZ_station(st, o) {
    let back = () => Ar(st);
    (st.subj || []).includes(1) && o.append(K("p", { class: "qtag" }, "✍️ Mit Papier und Stift"), K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: () => DK_menu(back) }, "\u{1F3A7} Diktat"), K("button", { class: "qbtn", onclick: () => DK_copyMenu(back) }, "✏️ W\xF6rter abschreiben")));
    KO_paperFor(st).length && o.append(K("button", { class: "qbtn", onclick: () => KO_paperList(st, back) }, "\u{1F4DD} Papier-Aufgaben (" + KO_paperFor(st).length + ")"));
    LZ_extra(o, back);
  }
  function LZ_extra(o, back) {
    let d = Li(), pend = DK_pendAll().length;
    pend && o.append(K("button", { class: "qbtn big", onclick: () => DK_pendList(back) }, "\u{1F468}‍\u{1F469} Ein Erwachsener muss noch kontrollieren (" + pend + ")"));
    d.sec >= Ai() && o.append(K("button", { class: "qbtn go big", onclick: () => d.ex ? Pr(back) : TP_offer(null, back) }, d.ex ? "\u{1F3C5} Urkunde von heute" : d.exRun ? "\u{1F3C1} Tagespr\xFCfung weitermachen" : "\u{1F3C1} Tagespr\xFCfung starten"));
  }
  function LZ_book(u) {
    LZ_extra(u, Ri), KO_book(u);
  }

  // ---------- Tagesprüfung (höchstens 5 Minuten) ----------
  var TP_MAX = 300, TP_N = 10, TP_iv = null;
  window.__setTPN = (n) => TP_N = n;
  function TP_pool(d) {
    let out = [], seen = new Set(), add = (q) => {
      q && !seen.has(q.id) && out.length < TP_N && (seen.add(q.id), out.push(q));
    };
    rl(d.wr || []).forEach((id) => add(sl.get(id)));
    let fis = Object.keys(d.s || {}).map(Number).filter((f) => d.s[f].n);
    fis.length || (fis = [0, 1, 2, 3]);
    let pool = sa(fis);
    return rl(pool.filter((q) => ye.p[q.id] && ye.p[q.id].w && !ye.p[q.id].s)).forEach(add), rl(pool.filter((q) => ye.p[q.id] && ye.p[q.id].r)).forEach(add), rl(pool).forEach(add), out;
  }
  function TP_offer(st, back) {
    back = back || Ys, ra = false;
    let d = Li();
    if (d.ex) return Pr(back);
    if (d.sec < Ai()) return Zs("Die Tagespr\xFCfung kommt nach " + je.dailyMinutes + " Minuten Lernen.");
    let n = Math.min(TP_N, (d.wr || []).length);
    ln().append(K("div", { class: "qbox" }, K("h2", {}, "\u{1F389} " + je.dailyMinutes + " Minuten geschafft!"), K("p", { class: "qsub" }, d.exRun ? "Mach mit deiner Tagespr\xFCfung weiter." : "Jetzt kommt deine Tagespr\xFCfung."), K("p", { class: "qmsg" }, "Sie dauert h\xF6chstens 5 Minuten. " + (n ? "Es kommen Fragen, die heute noch schwer waren. So siehst du, was du schon gelernt hast." : "Es kommen Fragen aus deinen F\xE4chern von heute.") + " Danach bekommst du deine Urkunde."), K("button", { class: "qbtn go big", onclick: () => TP_start(back) }, "\u{1F3C1} Pr\xFCfung starten"), K("button", { class: "qbtn big", onclick: back }, "Erst noch weiter lernen")));
  }
  function TP_start(back) {
    back = back || Ys;
    let d = Li();
    if (d.ex) return Pr(back);
    if (d.sec < Ai()) return TP_offer(null, back);
    let run = d.exRun;
    if (!run || !run.ids || !run.ids.length) {
      let qq = TP_pool(d);
      if (!qq.length) return d.ex = { n: 0, r: 0, a: 0, sec: 0, at: Date.now() }, is = true, Pi(), Pr(back);
      run = d.exRun = { ids: qq.map((q) => q.id), k: 0, r: 0, used: 0 };
    }
    let Q = run.ids.map((id) => sl.get(id)).filter(Boolean);
    Q.length !== run.ids.length && (run.ids = Q.map((q) => q.id), run.k = Math.min(run.k, Q.length)), Xs(), window.__curFi = null, window.__tpRun = true;
    let last = Date.now(), hold = false, done = false, barI = null, barT = null, finish = (to) => {
      if (done) return;
      done = true, clearInterval(TP_iv), TP_iv = null, window.__tpRun = false, d.ex = { n: run.ids.length, r: run.r, a: run.k, sec: Math.round(run.used), at: Date.now(), to: !!to }, delete d.exRun, is = true, Pi(), Rr(false), LZ_bar(), to && Zs("⏰ Die 5 Minuten sind um. Gut gemacht!"), Pr(back);
    };
    TP_iv && clearInterval(TP_iv), TP_iv = setInterval(() => {
      let now = Date.now(), dt = Math.min(1, (now - last) / 1e3);
      if (last = now, done || hold || document.hidden || !window.__tpRun) return;
      d.exSec = run.used += dt;
      let left = Math.max(0, TP_MAX - run.used);
      barI && (barI.style.width = left / TP_MAX * 100 + "%"), barT && (barT.textContent = oa(left)), Math.floor(run.used * 5) % 25 === 0 && Pi(), left <= 0 && finish(true);
    }, 200);
    let show = () => {
      if (run.k >= Q.length) return finish(false);
      let q = Q[run.k], h = mf(q), e = ln(), answered = false, left = Math.max(0, TP_MAX - run.used);
      Cr(false), hold = false, barI = K("i", { style: "width:" + left / TP_MAX * 100 + "%" }), barT = K("span", { class: "qtime" }, oa(left));
      let fb = K("div", { class: "qfb" }), nx = K("button", { class: "qbtn go", style: "display:none", onclick: show }, run.k + 1 >= Q.length ? "Fertig ✓" : "Weiter"), num = run.k + 1, opts = h.map((m) => K("button", { class: "qopt", onclick: () => {
        if (answered || done) return;
        answered = true, hold = true;
        let ok = m === q.a;
        ok && run.r++, run.k++, hf(q.id, ok, true), Pi(), opts.forEach((b, j) => {
          b.disabled = true, h[j] === q.a ? b.classList.add("right") : h[j] === m && b.classList.add("wrong");
        }), fb.textContent = (ok ? "✓ Richtig! " : "✗ Leider falsch. ") + (q.e || ""), fb.className = "qfb " + (ok ? "ok" : "bad"), nx.style.display = "";
      } }, q.o[m]));
      e.append(K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F3C1} Tagespr\xFCfung"), K("button", { class: "qx", onclick: () => {
        hold = true, confirm("Pr\xFCfung unterbrechen? Du kannst sp\xE4ter weitermachen.") ? (done = true, clearInterval(TP_iv), TP_iv = null, window.__tpRun = false, Pi(), back()) : hold = answered;
      } }, "✕")), K("div", { class: "qbar t" }, barI, barT), K("p", { class: "qtag" }, "Frage " + num + " von " + Q.length + " \xB7 " + UK_fach(q.fi)), K("p", { class: "qq" }, q.q), K("div", { class: "qopts" }, opts), fb, K("div", { class: "qrow" }, nx)));
    };
    show();
  }

  // ---------- Deutsch: Diktat und Wörter abschreiben ----------
  var DK_S = ["Der Hund spielt im Garten.", "Mama kauft frisches Brot beim B\xE4cker.", "Im Winter f\xE4llt oft Schnee.", "Die Katze schl\xE4ft auf dem Sofa.", "Wir fahren mit dem Fahrrad zur Schule.", "Der Vogel sitzt auf dem Dach.", "Am Wochenende besuchen wir die Oma.", "Mein Bruder trinkt gern kalte Milch.", "Die Kinder springen in den Bach.", "Im Wald wohnen viele Tiere.", "Papa repariert das alte Auto.", "Die Sonne scheint hell am Himmel.", "Ich lese gern spannende B\xFCcher.", "Der Lehrer schreibt an die Tafel.", "Nach dem Essen putze ich die Z\xE4hne.", "Der Igel sucht im Herbst Futter.", "Wir backen einen leckeren Kuchen.", "Die Blumen brauchen viel Wasser.", "Unser Haus hat eine gr\xFCne T\xFCr.", "Der Bauer f\xFCttert die K\xFChe.", "Im Sommer gehen wir schwimmen.", "Meine Freundin hat einen kleinen Hasen.", "Der Zug f\xE4hrt p\xFCnktlich ab.", "Die Stra\xDFe ist heute sehr nass.", "Ich packe meine Tasche f\xFCr morgen.", "Der Fu\xDFball liegt hinter der Hecke.", "Am Abend wird es schnell dunkel.", "Die Maus l\xE4uft schnell in ihr Loch.", "Wir spielen drau\xDFen Verstecken.", "Der Drache fliegt hoch \xFCber das Feld.", "Im K\xFChlschrank steht ein Glas Saft.", "Der Hund bellt laut am Zaun.", "Lisa malt ein sch\xF6nes Bild.", "Die Ente schwimmt auf dem See.", "Opa erz\xE4hlt uns eine lustige Geschichte.", "Morgen schreiben wir einen Test.", "Der B\xE4cker steht sehr fr\xFCh auf.", "Die Eule schl\xE4ft am Tag.", "Im Herbst fallen die bunten Bl\xE4tter.", "Ich helfe meiner Mutter in der K\xFCche."];
  var DK_W = "Fahrrad Schule Kuchen Wasser Fenster Br\xFCcke Hexe Zucker Katze Pflaume Stra\xDFe Fu\xDFball Gl\xFCck Sonne spielen laufen springen schreiben sch\xF6n gro\xDF klein M\xFCtze Schnee Igel Biene Wiese Ziege K\xFCche B\xE4ume H\xE4user Freund Wolke Regen Blitz Stuhl Tisch Lehrer Pferd Vogel Fisch Nacht Mittag Apfel Birne Kirsche Schatz Ritter Burg Drache Zahn Uhr Jacke Hose Schuhe Tasche Heft Stift Lineal Rucksack Kerze Licht dunkel hell kalt warm Winter Sommer Herbst Fr\xFChling Eule Fuchs Hase Maus Zebra Affe Krokodil Schmetterling Rakete Stern Mond Insel Schiff Wellen Sand Muschel Bahnhof Ampel Polizei Feuerwehr Brot Butter K\xE4se Nudeln Suppe L\xF6ffel Gabel Messer Teller Becher fr\xF6hlich m\xFCde mutig leise laut".split(" ");
  var DK_TYP = { diktat: "Diktat", abschreiben: "W\xF6rter abschreiben", papier: "Papier-Aufgabe" };
  function DK_fresh(key, all, need, size) {
    let used = ye[key] || (ye[key] = []), pool = all.map((x, i) => i).filter((i) => !used.includes(i));
    pool.length < need && (used.length = 0, pool = all.map((x, i) => i));
    let out = [], n = 0;
    for (let i of rl(pool)) {
      if (n >= need) break;
      out.push(i), n += size(all[i]);
    }
    return used.push(...out), used.length > all.length - need && used.splice(0, used.length - (all.length - need)), out.map((i) => all[i]);
  }
  function DK_web(t) {
    let S = window.speechSynthesis;
    if (!S) return Zs("Vorlesen geht auf diesem Ger\xE4t leider nicht.");
    S.cancel();
    let u = new SpeechSynthesisUtterance(t), v = S.getVoices().find((x) => /^de/i.test(x.lang));
    u.lang = "de-DE", u.rate = 0.8, v && (u.voice = v), S.speak(u);
  }
  function DK_speak(t) {
    let C = window.Capacitor, P = C && C.Plugins && C.Plugins.TextToSpeech;
    if (P && C.isNativePlatform && C.isNativePlatform()) {
      Promise.resolve(P.stop && P.stop()).catch(() => {
      }).then(() => P.speak({ text: t, lang: "de-DE", rate: 0.75, pitch: 1, volume: 1, category: "playback" })).catch(() => DK_web(t));
      return;
    }
    DK_web(t);
  }
  function DK_begin() {
    Cr(true), window.__curFi = 1, window.__idleSec = 180, window.__dkRun = true;
  }
  function DK_end() {
    Cr(false), window.__curFi = null, window.__idleSec = 0, window.__dkRun = false;
    try {
      window.speechSynthesis && speechSynthesis.cancel();
    } catch {
    }
  }
  function DK_choice(label, list, cur, set) {
    return [K("p", { class: "qsub" }, label), K("div", { class: "qrow" }, list.map(([v, t]) => K("button", { class: "qbtn" + (v === cur ? " go" : ""), onclick: () => set(v) }, t)))];
  }
  function DK_menu(back) {
    let mode = 1, len = 12, box = K("div", { class: "qbox" }), draw = () => {
      box.innerHTML = "", box.append(K("div", { class: "qhead" }, K("h2", {}, "\u{1F3A7} Diktat"), K("button", { class: "qx", onclick: back }, "✕")), K("p", { class: "qmsg" }, "Leg ein Blatt Papier und einen Stift bereit. Ich lese dir S\xE4tze vor. Du schreibst sie auf. Erst wenn du auf „Weiter“ tippst, lese ich weiter."), ...DK_choice("Wie soll ich vorlesen?", [[1, "Wort f\xFCr Wort"], [2, "Immer 2 W\xF6rter"], [3, "Ganzer Satz"]], mode, (v) => (mode = v, draw())), ...DK_choice("Wie lang?", [[12, "Kurz"], [20, "Mittel"], [30, "Lang"]], len, (v) => (len = v, draw())), K("button", { class: "qbtn go big", onclick: () => DK_diktat(back, mode, len) }, "\u{1F3A7} Diktat starten"));
    };
    draw(), ln().append(box);
  }
  function DK_copyMenu(back) {
    let len = 10, box = K("div", { class: "qbox" }), draw = () => {
      box.innerHTML = "", box.append(K("div", { class: "qhead" }, K("h2", {}, "✏️ W\xF6rter abschreiben"), K("button", { class: "qx", onclick: back }, "✕")), K("p", { class: "qmsg" }, "Leg ein Blatt Papier und einen Stift bereit. Hier kommt immer ein Wort. Schreib es genau ab. Dann tippst du auf „Weiter“."), ...DK_choice("Wie viele W\xF6rter?", [[10, "10"], [15, "15"], [20, "20"]], len, (v) => (len = v, draw())), K("button", { class: "qbtn go big", onclick: () => DK_copy(back, len) }, "✏️ Los geht's"));
    };
    draw(), ln().append(box);
  }
  function DK_abort(back) {
    confirm("Wirklich aufh\xF6ren? Dann wird diese Aufgabe nicht gewertet.") && (DK_end(), back());
  }
  function DK_diktat(back, mode, len) {
    if (KO_block()) return;
    let sents = DK_fresh("dkUsedS", DK_S, len, (s) => s.split(" ").length), chunks = [];
    for (let s of sents) {
      let w = s.split(" "), step = mode === 3 ? w.length : mode;
      for (let i = 0; i < w.length; i += step) chunks.push({ t: w.slice(i, i + step).join(" "), end: i + step >= w.length });
    }
    let e = ln(), s0 = Li().sec, k = -1;
    DK_begin();
    let info = K("p", { class: "qbig" }, "\u{1F3A7}"), hint = K("p", { class: "qmsg" }, "Tippe auf Start. Dann h\xF6rst du den ersten Teil."), again = K("button", { class: "qbtn", style: "display:none", onclick: () => k >= 0 && DK_speak(chunks[k].t) }, "\u{1F501} Nochmal h\xF6ren"), next = K("button", { class: "qbtn go big", onclick: () => {
      if (k >= chunks.length - 1) return DK_finish(back, { typ: "diktat", text: sents.join(" "), n: sents.join(" ").split(" ").length, mode, sec: Li().sec - s0 });
      k++, DK_speak(chunks[k].t), info.textContent = "Teil " + (k + 1) + " von " + chunks.length, hint.textContent = chunks[k].end ? "Satzende: Punkt nicht vergessen! Ein neuer Satz f\xE4ngt gro\xDF an." : "Schreib auf, was du geh\xF6rt hast.", again.style.display = "", next.textContent = k >= chunks.length - 1 ? "✓ Fertig geschrieben" : "Weiter ▶";
    } }, "▶ Start");
    e.append(K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F3A7} Diktat"), K("button", { class: "qx", onclick: () => DK_abort(back) }, "✕")), K("p", { class: "qtag" }, sents.length + " S\xE4tze \xB7 " + ["", "Wort f\xFCr Wort", "Immer 2 W\xF6rter", "Ganzer Satz"][mode]), info, hint, again, next));
  }
  function DK_copy(back, len) {
    if (KO_block()) return;
    let words = DK_fresh("dkUsedW", DK_W, len, () => 1), e = ln(), s0 = Li().sec, k = 0;
    DK_begin();
    let w = K("div", { class: "dkword" }, words[0]), info = K("p", { class: "qtag" }, "Wort 1 von " + words.length), next = K("button", { class: "qbtn go big", onclick: () => {
      if (k >= words.length - 1) return DK_finish(back, { typ: "abschreiben", text: words.join(", "), words, n: words.length, sec: Li().sec - s0 });
      k++, w.textContent = words[k], info.textContent = "Wort " + (k + 1) + " von " + words.length, k >= words.length - 1 && (next.textContent = "✓ Fertig geschrieben");
    } }, words.length > 1 ? "Weiter ▶" : "✓ Fertig geschrieben");
    e.append(K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, "✏️ Abschreiben"), K("button", { class: "qx", onclick: () => DK_abort(back) }, "✕")), info, w, K("p", { class: "qmsg" }, "Schreib das Wort genau so ab, wie es hier steht."), next));
  }
  function DK_finish(back, it) {
    DK_end();
    let d = Li();
    it.id = "dk" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), it.day = Tr(), it.at = Date.now(), it.sec = Math.round(it.sec), (d.pend || (d.pend = [])).push(it), is = true, Pi(), Rr(false), ln().append(K("div", { class: "qbox" }, K("h2", {}, "\u{1F31F} Super, fertig!"), K("p", { class: "qsub" }, "Jetzt schaut ein Erwachsener nach, wie du geschrieben hast."), K("p", { class: "qmsg" }, "Daf\xFCr braucht man das Eltern-Passwort."), K("button", { class: "qbtn go big", onclick: () => DK_check(it, back) }, "\u{1F468}‍\u{1F469} Erwachsener kontrolliert jetzt"), K("button", { class: "qbtn big", onclick: back }, "Sp\xE4ter kontrollieren")));
  }
  function DK_pendAll() {
    let out = [];
    for (let k of Object.keys(ye.days || {}).sort()) for (let x of ye.days[k].pend || []) out.push(x);
    return out;
  }
  function DK_pendList(back) {
    let L = DK_pendAll();
    if (!L.length) return back();
    ln().append(K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F468}‍\u{1F469} Noch zu kontrollieren"), K("button", { class: "qx", onclick: back }, "✕")), L.map((x) => K("button", { class: "qbtn big", onclick: () => DK_check(x, () => DK_pendList(back)) }, DK_TYP[x.typ] + " \xB7 " + x.n + " W\xF6rter \xB7 " + new Date(x.at).toLocaleDateString("de-DE")))));
  }
  function DK_check(it, back) {
    KO_confirmFlow(it, back);
  }
  function DK_checkScreen(it, back) {
    let d = ye.days[it.day];
    if (!d || !(d.pend || []).some((x) => x.id === it.id)) return Zs("Diese Aufgabe ist schon kontrolliert."), back();
    let inp = K("input", { class: "qin", type: "number", inputmode: "numeric", min: 0, max: it.n, value: "0" }), m = K("p", { class: "qmsg" }), val = () => parseInt(inp.value, 10), set = (v) => {
      inp.value = String(Math.max(0, Math.min(it.n, (isNaN(v) ? 0 : v))));
    }, text = it.typ === "abschreiben" ? K("ol", { class: "dktext" }, (it.words || it.text.split(", ")).map((w) => K("li", {}, w))) : K("div", { class: "dktext" }, it.text);
    ln().append(K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F468}‍\u{1F469} Kontrolle: " + DK_TYP[it.typ]), K("button", { class: "qx", onclick: back }, "✕")), K("p", { class: "qtag" }, (Ae && Ae.name || "") + " \xB7 " + new Date(it.at).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) + " \xB7 " + it.n + " W\xF6rter"), K("p", { class: "qmsg" }, "So h\xE4tte es richtig hei\xDFen m\xFCssen:"), text, K("p", { class: "qsub" }, "Wie viele W\xF6rter sind falsch geschrieben?"), K("div", { class: "dknum" }, K("button", { class: "qbtn", onclick: () => set(val() - 1) }, "−"), inp, K("button", { class: "qbtn", onclick: () => set(val() + 1) }, "+")), m, K("button", { class: "qbtn go big", onclick: () => {
      let w = val();
      if (isNaN(w) || w < 0 || w > it.n) return void (m.textContent = "Bitte eine Zahl von 0 bis " + it.n + " eingeben.");
      if (!confirm(w + " von " + it.n + " W\xF6rtern falsch. Kontrolle best\xE4tigen?")) return;
      let res = { id: it.id, typ: it.typ, n: it.n, wrong: w, right: it.n - w, err: Math.round(w / it.n * 1e3) / 10, pct: LZ_pct(it.n - w, it.n), sec: it.sec, mode: it.mode, at: it.at, ct: Date.now(), ok: 1, by: "Eltern" };
      res.note = r_(res.pct), (d.dk || (d.dk = [])).some((x) => x.id === it.id) || d.dk.push(res), d.pend = d.pend.filter((x) => x.id !== it.id), is = true, Pi(), Rr(false), DK_result(res, back);
    } }, "✓ Kontrolle best\xE4tigen")));
  }
  function DK_result(r, back) {
    let msg = r.pct >= 95 ? "Wow, fast alles richtig! Super geschrieben!" : r.pct >= 80 ? "Toll gemacht! Nur ein paar W\xF6rter waren schwer." : r.pct >= 50 ? "Gut ge\xFCbt! Ein paar W\xF6rter \xFCben wir noch." : "Danke f\xFCrs Schreiben! Jedes Mal wirst du ein St\xFCck besser.";
    ln().append(K("div", { class: "qbox" }, K("h2", {}, "✍️ " + DK_TYP[r.typ]), K("p", { class: "qbig" }, r.right + " von " + r.n + " richtig"), K("p", { class: "qsub" }, msg), K("div", { class: "dkstat" }, K("div", {}, (r.typ === "papier" ? "Teilaufgaben" : "W\xF6rter") + " insgesamt: " + r.n), K("div", {}, "Richtig: " + r.right), K("div", {}, "Falsch: " + r.wrong), K("div", {}, "Fehlerquote: " + String(r.err).replace(".", ",") + " %"), K("div", {}, "Schreibzeit: " + oa(r.sec) + " Minuten"), K("div", {}, "Leistung: " + r.pct + " %"), K("b", {}, "Note: " + r.note + " (" + LZ_GN[r.note] + ")")), K("button", { class: "qbtn go big", onclick: back }, "Weiter")));
  }

  // ---------- Urkunde ----------
  var UK_tpl = null;
  function UK_loadTpl(cb) {
    let src = Ne && Ne.certTpl;
    if (!src) return UK_tpl = null, false;
    if (UK_tpl && UK_tpl.__src === src) return UK_tpl.complete && UK_tpl.naturalWidth > 0;
    return UK_tpl = new Image(), UK_tpl.__src = src, UK_tpl.onload = () => cb && cb(), UK_tpl.src = src, false;
  }
  function UK_rows(d) {
    let rows = [];
    for (let f of Object.keys(d.s || {})) {
      let x = d.s[f];
      x && x.n && rows.push({ name: UK_fach(f), r: x.r, n: x.n, unit: "Aufgaben", fi: +f });
    }
    for (let typ of ["diktat", "abschreiben", "papier"]) {
      let L = (d.dk || []).filter((x) => x.typ === typ);
      L.length && rows.push({ name: typ === "papier" ? "Papier-Aufgaben" : "Deutsch \xB7 " + (typ === "diktat" ? "Diktat" : "Abschreiben"), r: L.reduce((a, x) => a + x.right, 0), n: L.reduce((a, x) => a + x.n, 0), unit: "W\xF6rter", dk: true });
    }
    return d.ex && d.ex.n && rows.push({ name: "Tagespr\xFCfung", r: d.ex.r, n: d.ex.n, unit: "Fragen", exam: true }), rows.forEach((x) => (x.pct = LZ_pct(x.r, x.n), x.note = r_(x.pct))), rows;
  }
  function UK_prev(today) {
    let keys = Object.keys(ye.days || {}).filter((k) => k < today).sort().reverse();
    for (let k of keys) {
      let d = ye.days[k];
      if (d && d.s && Object.values(d.s).some((x) => x.n >= 3)) return [k, d];
    }
    return null;
  }
  function UK_compare(d, key) {
    let p = UK_prev(key);
    if (!p) return "Heute ist dein erster Lerntag zum Vergleichen. Morgen kannst du sehen, ob du noch besser geworden bist.";
    let [pk, pd] = p, r1 = 0, n1 = 0, r0 = 0, n0 = 0, names = [];
    for (let f in d.s || {}) {
      let a = d.s[f], b = pd.s[f];
      a && b && a.n >= 3 && b.n >= 3 && (r1 += a.r, n1 += a.n, r0 += b.r, n0 += b.n, names.push(UK_fach(f)));
    }
    let y = new Date(key + "T12:00:00");
    y.setDate(y.getDate() - 1);
    let when = Tr(y) === pk ? "gestern" : "beim letzten Mal (" + new Date(pk + "T12:00:00").toLocaleDateString("de-DE") + ")";
    if (!n1) return "Heute hast du andere F\xE4cher ge\xFCbt als " + when + ". Darum vergleichen wir heute nicht.";
    let a = LZ_pct(r1, n1), b = LZ_pct(r0, n0), what = " (" + names.join(", ") + ")";
    return a - b >= 5 ? "Heute warst du besser als " + when + what + ": " + a + " % statt " + b + " % richtig. Super!" : b - a >= 5 ? "Heute war es etwas schwerer als " + when + what + ": " + a + " % statt " + b + " % richtig. Das ist ganz normal. Beim n\xE4chsten Mal klappt es wieder besser!" : "Du warst genauso gut wie " + when + what + ": " + a + " % richtig. Toll, dass du dranbleibst!";
  }
  function UK_data(d) {
    let key = Object.keys(ye.days).find((k) => ye.days[k] === d) || Tr(), rows = UK_rows(d), tot = rows.length ? Math.round(rows.reduce((a, x) => a + x.pct, 0) / rows.length) : null, subj = [], ss = d.ss || {};
    for (let f of Object.keys(d.s || {})) d.s[f].n && subj.push(UK_fach(f) + (ss[f] >= 30 ? " (" + Math.round(ss[f] / 60) + " Min.)" : ""));
    (d.dk || []).length && !subj.some((x) => x.startsWith("Deutsch")) && subj.push("Deutsch (Diktat/Abschreiben)");
    let dn = d.dn || 0, dt = d.dt || 0, ign = dn - dt, star = dn ? (ign / dn >= 0.8 ? 3 : ign / dn >= 0.55 ? 2 : 1) : 3, conc = (dn ? "Von " + dn + " Ablenkungen hast du " + ign + " nicht beachtet. " : "Heute kamen keine Ablenkungen. ") + (d.pauses ? "Du hast " + d.pauses + " Mal eine kleine Pause gemacht." : "Du warst die ganze Zeit dabei."), avg = d.qn ? Math.round(d.qt / d.qn) : null, dkSec = (d.dk || []).reduce((a, x) => a + (x.sec || 0), 0), speed = (avg != null ? "F\xFCr eine Aufgabe hast du im Durchschnitt " + Math.max(1, avg) + (avg <= 1 ? " Sekunde" : " Sekunden") + " gebraucht." : "Heute gab es keine Quiz-Aufgaben.") + (dkSec ? " Geschrieben hast du " + Math.max(1, Math.round(dkSec / 60)) + " Minuten." : ""), pos = tot == null ? "Toll, dass du heute gelernt hast!" : tot >= 90 ? "Wow! Du hast heute ganz toll gelernt. Darauf kannst du stolz sein!" : tot >= 70 ? "Heute hast du schon richtig viel geschafft! Du wirst jeden Tag ein kleines St\xFCck besser." : tot >= 50 ? "Du hast dich heute besonders angestrengt. Ein paar Aufgaben waren noch schwierig. Das schaffen wir beim n\xE4chsten Mal!" : "Toll, dass du heute so flei\xDFig gelernt hast! Schwere Aufgaben machen dich stark. Du wirst jeden Tag ein kleines St\xFCck besser.", math = rows.find((x) => x.fi === 0), dkr = rows.filter((x) => x.dk), tip;
    tip = dn && dt / dn > 0.4 ? "Wenn etwas Lustiges kommt: Mach erst die Aufgabe fertig. Dann darfst du schauen." : dkr.some((x) => x.pct < 80) ? "Lass dir beim Schreiben etwas mehr Zeit. Sprich das Wort leise mit." : avg != null && avg < 6 && tot != null && tot < 70 ? "Lies die Aufgabe erst einmal ganz in Ruhe." : math && math.pct < 70 ? "Schau dir die Zahlen genau an." : (d.pauses || 0) > 2 ? "Trink vor dem Lernen etwas Wasser. Dann bleibst du besser dran." : ["Lies die Aufgabe erst einmal ganz in Ruhe.", "Du schaffst das! \xDCbung macht dich immer besser.", "Lies jede Antwort einmal ganz durch, bevor du tippst.", "Wenn du unsicher bist: Atme einmal tief durch und \xFCberleg nochmal."][key.split("-").reduce((a, x) => a + +x, 0) % 4];
    return { key, rows, tot, subj, star, conc, speed, cmp: UK_compare(d, key), pos, tip };
  }
  function UK_wrap(r, t, x, y, w, lh) {
    let words = String(t).split(" "), line = "";
    for (let c of words) {
      let l = line ? line + " " + c : c;
      r.measureText(l).width > w && line ? (r.fillText(line, x, y), line = c, y += lh) : line = l;
    }
    return r.fillText(line, x, y), y + lh;
  }
  function UK_render(r, d, D, W, H, f, tpl) {
    let F = (px, st) => (st || "") + " " + Math.round(px * f) + "px Georgia,serif", red = "#7a1f1f", ink = "#2e2210", L = 130, R = W - 130, CW = R - L;
    if (tpl) r.drawImage(tpl, 0, 0, W, H);
    else {
      let g = r.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#f6e7c1"), g.addColorStop(0.5, "#efd9a3"), g.addColorStop(1, "#e3c78a"), r.fillStyle = g, r.fillRect(0, 0, W, H), r.strokeStyle = red, r.lineWidth = 14, r.strokeRect(50, 50, W - 100, H - 100), r.strokeStyle = "#b8892b", r.lineWidth = 5, r.strokeRect(78, 78, W - 156, H - 156);
    }
    r.textAlign = "center", r.fillStyle = red, r.font = F(92, "bold"), r.fillText("⚔ URKUNDE ⚔", W / 2, 200 * f + 10), r.fillStyle = ink, r.font = F(38, "italic"), r.fillText("f\xFCr flei\xDFiges Lernen", W / 2, 262 * f + 10), r.font = F(64, "bold"), r.fillText(Ae && Ae.name || "Milo", W / 2, 360 * f + 10);
    let dt = new Date(D.key + "T12:00:00"), y = 420 * f + 10;
    r.font = F(32), y = UK_wrap(r, "hat am " + dt.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + ", ganze " + Math.round(d.sec / 60) + " Minuten gelernt" + (d.ex && d.ex.n ? " und die Tagespr\xFCfung geschafft." : "."), W / 2, y, CW, 42 * f), y += 8 * f, r.textAlign = "left";
    let sec = (h, t) => {
      r.fillStyle = red, r.font = F(31, "bold"), r.fillText(h, L, y), y += 40 * f, r.fillStyle = ink, r.font = F(28), y = UK_wrap(r, t, L, y, CW, 36 * f) + 10 * f;
    };
    sec("\u{1F4DA} Das hast du heute ge\xFCbt", D.subj.join(", ") || "–"), sec("\u{1F3AF} Konzentration  " + "★".repeat(D.star) + "☆".repeat(3 - D.star), D.conc), sec("⏱ Aufgabenzeit", D.speed), sec("\u{1F4C8} Vergleich", D.cmp), r.fillStyle = red, r.font = F(34, "bold italic"), r.textAlign = "center", y = UK_wrap(r, D.pos, W / 2, y + 12 * f, CW, 44 * f) + 6 * f, r.textAlign = "left", sec("\u{1F4A1} Tipp f\xFCr morgen", D.tip);
    let cx = [L, L + CW * 0.48, L + CW * 0.66, L + CW * 0.8];
    y += 6 * f, r.fillStyle = red, r.font = F(29, "bold"), r.fillText("Bereich", cx[0], y), r.fillText("Richtig", cx[1], y), r.fillText("Prozent", cx[2], y), r.fillText("Note", cx[3], y), y += 12 * f, r.fillRect(L, y, CW, 3), y += 38 * f, r.fillStyle = ink;
    for (let x of D.rows) r.font = F(28, x.exam ? "bold" : ""), r.fillText(x.name, cx[0], y), r.fillText(x.r + " von " + x.n, cx[1], y), r.fillText(x.pct + " %", cx[2], y), r.fillText(x.note + " " + LZ_GN[x.note], cx[3], y), y += 38 * f;
    D.rows.length || (r.font = F(28, "italic"), r.fillText("Heute gab es noch keine bewerteten Aufgaben.", cx[0], y), y += 38 * f), r.fillStyle = red, r.fillRect(L, y - 22 * f, CW, 3), y += 22 * f, r.font = F(36, "bold"), D.tot != null && (r.fillText("Gesamtnote: " + r_(D.tot) + " (" + LZ_GN[r_(D.tot)] + ")", L, y), r.font = F(24), r.fillStyle = ink, r.fillText("Durchschnitt aller Bereiche: " + D.tot + " %", L + CW * 0.6, y), y += 34 * f);
    let gr = je.grades, sp = [];
    for (let i = 0; i < 6; i++) sp.push(i + 1 + " = " + (i === 0 ? "100–" + gr[0] : i === 5 ? "unter " + gr[4] : gr[i - 1] - 1 + "–" + gr[i]) + " %");
    r.fillStyle = ink, r.font = F(20, "italic"), y = UK_wrap(r, "Notenspiegel: " + sp.join(" \xB7 "), L, y, CW, 26 * f);
    let sy = Math.max(y + 90 * f, H - 190), half = (CW - 80) / 2;
    return r.strokeStyle = ink, r.lineWidth = 2, r.beginPath(), r.moveTo(L, sy), r.lineTo(L + half, sy), r.moveTo(R - half, sy), r.lineTo(R, sy), r.stroke(), r.font = F(24), r.textAlign = "center", r.fillText("Unterschrift Erwachsener", L + half / 2, sy + 34), r.fillText("Unterschrift " + (Ae && Ae.name || "Kind"), R - half / 2, sy + 34), y;
  }
  function UK_draw(d) {
    let W = 1240, H = 1754, c = document.createElement("canvas");
    c.width = W, c.height = H;
    let D = UK_data(d), paint = () => {
      let r = c.getContext("2d"), tpl = UK_loadTpl(paint) ? UK_tpl : null;
      for (let f of [1, 0.93, 0.86, 0.8, 0.74, 0.68]) if (r.clearRect(0, 0, W, H), UK_render(r, d, D, W, H, f, tpl) < H - 280 || f === 0.68) break;
    };
    return paint(), c;
  }
  async function UK_save(b, name) {
    let C = window.Capacitor, P = C && C.Plugins;
    if (P && P.Filesystem && P.Share && C.isNativePlatform && C.isNativePlatform()) try {
      let data = await new Promise((res, rej) => {
        let fr = new FileReader();
        fr.onload = () => res(String(fr.result).split(",")[1]), fr.onerror = rej, fr.readAsDataURL(b);
      }), w = await P.Filesystem.writeFile({ path: name, data, directory: "CACHE" });
      await P.Share.share({ title: "Urkunde", text: "Meine Urkunde", url: w.uri, dialogTitle: "Urkunde speichern oder drucken" });
      return;
    } catch (e) {
      if (/cancel/i.test(String(e && e.message || e))) return;
    }
    let s = URL.createObjectURL(b), a = K("a", { href: s, download: name });
    document.body.append(a), a.click(), a.remove(), setTimeout(() => URL.revokeObjectURL(s), 1e4);
  }
  function UK_tplAdmin() {
    let inp = K("input", { type: "file", accept: "image/*", style: "display:none" }), prev = K("div", {});
    inp.addEventListener("change", () => {
      let f = inp.files && inp.files[0];
      if (!f) return;
      let img = new Image();
      img.onload = () => {
        let c = document.createElement("canvas");
        c.width = 1240, c.height = 1754, c.getContext("2d").drawImage(img, 0, 0, 1240, 1754);
        let cfg = la(Ne);
        cfg.certTpl = c.toDataURL("image/jpeg", 0.85), URL.revokeObjectURL(img.src), ca(cfg), UK_tplAdmin();
      }, img.src = URL.createObjectURL(f);
    });
    Ne.certTpl && prev.append(K("img", { src: Ne.certTpl, style: "width:160px;border-radius:6px;margin:8px auto;display:block" }));
    ln().append(K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F5BC} Urkunden-Vorlage"), K("button", { class: "qx", onclick: Ci }, "✕")), K("p", { class: "qmsg" }, "Lade ein Bild (Hochformat, A4) hoch. Es wird f\xFCr jede Urkunde als Hintergrund benutzt. Die Texte stehen immer an der gleichen Stelle."), prev, inp, K("button", { class: "qbtn go big", onclick: () => inp.click() }, Ne.certTpl ? "Andere Vorlage w\xE4hlen" : "Vorlage w\xE4hlen"), Ne.certTpl && K("button", { class: "qbtn big", onclick: () => {
      let cfg = la(Ne);
      delete cfg.certTpl, ca(cfg), UK_tplAdmin();
    } }, "Vorlage entfernen (Standard-Urkunde)"), K("button", { class: "qbtn big", onclick: () => {
      let c = UK_draw(Li());
      c.style.cssText = "width:100%;border-radius:8px", ln().append(K("div", { class: "qbox" }, K("h2", {}, "Vorschau"), c, K("button", { class: "qbtn", onclick: UK_tplAdmin }, "Zur\xFCck")));
    } }, "Vorschau ansehen")));
  }
  window.__lz = { station: (id) => pf(id), book: () => Ri(), dist: (k) => wi && dShow(k, wi, wi.querySelector(".qbox"), Li()) };
  // ================= Ende Lernspiel-Erweiterung =================
