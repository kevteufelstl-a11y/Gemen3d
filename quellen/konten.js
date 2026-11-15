  // ================= Konten: Admin, Eltern, Kinder, Freunde (15.11.2026) =================
  // Alle Rechte werden auf dem Server geprüft (Funktion milo_api). Die Oberfläche zeigt nur, was die Rolle darf.
  var KO = { st: null, par: null, adm: null, fam: null };
  (function KO_css() {
    let st = document.createElement("style");
    st.textContent = ".ko-p{border-color:#4aa3ff!important;box-shadow:0 0 0 1px #4aa3ff55}.ko-p h2{color:#7cc0ff!important}.ko-a{border-color:#ffb020!important;box-shadow:0 0 0 1px #ffb02055}.ko-a h2{color:#ffc44d!important}.ko-role{display:inline-block;padding:2px 10px;border-radius:20px;font:700 11px system-ui;letter-spacing:.06em;margin-bottom:6px}.ko-role.k{background:#1f5f2a;color:#bfffc5}.ko-role.p{background:#123e66;color:#cfe6ff}.ko-role.a{background:#664200;color:#ffe2a6}.ko-tabs{display:flex;gap:6px;overflow-x:auto;margin:8px 0;padding-bottom:4px}.ko-tab{flex:0 0 auto;padding:8px 12px;border-radius:12px;border:1px solid #4aa3ff66;background:rgba(74,163,255,.08);color:#fff;font:700 14px system-ui}.ko-tab.on{background:rgba(74,163,255,.35);border-color:#4aa3ff}.ko-sec{text-align:left;margin:12px 0;padding:10px;border-radius:12px;background:rgba(255,255,255,.05)}.ko-sec h3{margin:0 0 6px;font:700 15px system-ui;color:#cfe6ff}.ko-row{display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-bottom:1px solid #ffffff14;font-size:14px;align-items:center}.ko-row:last-child{border-bottom:0}.ko-bars{display:flex;align-items:flex-end;gap:4px;height:90px;margin-top:6px}.ko-bars div{flex:1;background:linear-gradient(#4aa3ff,#2a6fb8);border-radius:4px 4px 0 0;position:relative;min-height:2px}.ko-bars span{position:absolute;bottom:-16px;left:0;right:0;text-align:center;font-size:9px;color:#9ab}.ko-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin:10px 0}.ko-grid .qbtn{margin:0;min-height:64px;font-size:14px}.ko-f{display:flex;flex-direction:column;gap:2px;text-align:left;margin:6px 0;font-size:13px;color:#cde}.ko-f .qin{text-align:left;margin:2px 0}.ko-chk{display:flex;flex-wrap:wrap;gap:6px 12px;font-size:14px;margin:4px 0}.ko-dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:#556;margin-right:6px}.ko-dot.on{background:#3fd46b;box-shadow:0 0 6px #3fd46b}.ko-small{font-size:12px;color:#9ab}.ko-badge{display:inline-block;min-width:18px;padding:0 5px;border-radius:9px;background:#ff4d5e;color:#fff;font:700 11px/18px system-ui;text-align:center;margin-left:4px}";
    document.head.append(st);
  })();
  var KO_ERR = { wrong: "Das stimmt leider nicht.", locked: "Zu viele falsche Versuche. Bitte warte etwas.", exists: "Diesen Namen gibt es schon.", pw_short: "Das Passwort ist zu kurz.", login: "Der Name muss 3 bis 30 Zeichen haben.", name: "Der Name muss 2 bis 20 Zeichen haben.", pin_format: "Das Kinder-Passwort hat 4 bis 8 Zahlen.", wrong_key: "Der Aktivierungsschlüssel stimmt nicht.", setup_done: "Die Einrichtung ist schon abgeschlossen.", signup_closed: "Neue Elternkonten sind gerade gesperrt.", not_found: "Nicht gefunden.", blocked: "Das geht leider nicht.", too_many: "Zu viele Anfragen. Versuch es später nochmal.", declined_recently: "Diese Anfrage wurde gerade abgelehnt. Warte ein paar Tage.", session: "Bitte neu anmelden.", forbidden: "Dafür fehlt die Berechtigung.", confirm: "Zur Sicherheit bitte den Namen genau eintippen.", no_setup: "Das Spiel ist noch nicht eingerichtet.", too_big: "Zu groß zum Speichern." };
  var KO_msg = (r) => r && r.j && r.j.error ? (KO_ERR[r.j.error] || "Fehler: " + r.j.error) + (r.j.minutes ? " (" + r.j.minutes + " Min.)" : "") : "Keine Verbindung.";
  async function KO_call(action, body, ctx) {
    let t = ctx === "p" ? KO.par && KO.par.token : ctx === "a" ? KO.adm && KO.adm.token : Ae && Ae.token, b = Object.assign({ action }, body || {});
    t && (b.token = t), ctx === "p" && KO.par && KO.par.familyId && (b.familyId = KO.par.familyId);
    try {
      return await vf(b);
    } catch {
      return { status: 0, j: { error: "offline" } };
    }
  }
  var KO_box = (cls, ...kids) => K("div", { class: "qbox " + (cls || "") }, ...kids);
  var KO_role = (r) => K("div", { class: "ko-role " + r }, r === "k" ? "SPIELER" : r === "p" ? "ELTERN" : "ADMIN");
  var KO_in = (ph, type, extra) => K("input", Object.assign({ class: "qin", placeholder: ph, type: type || "text", autocomplete: "off" }, extra || {}));
  var KO_field = (label, el) => K("label", { class: "ko-f" }, label, el);
  var KO_fam = () => {
    try {
      return JSON.parse(localStorage.getItem("milo3d_family") || "null");
    } catch {
      return null;
    }
  };
  var SP_AV = ["\u{1F981}", "\u{1F42F}", "\u{1F436}", "\u{1F431}", "\u{1F98A}", "\u{1F43C}", "\u{1F438}", "\u{1F435}", "\u{1F984}", "\u{1F432}", "\u{1F680}", "⚽", "\u{1F996}", "\u{1F42C}", "\u{1F916}", "\u{1F9D9}"];
  function SP_avPick(sel, onPick) {
    let avs = K("div", { class: "spavs" }), draw = () => {
      avs.innerHTML = "";
      for (let a of SP_AV) avs.append(K("button", { class: "spavb" + (a === sel ? " on" : ""), onclick: () => (sel = a, onPick(a), draw()) }, a));
    };
    return draw(), avs;
  }
  async function SP_hash(n, pin) {
    try {
      let d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("milo3d:" + n.toLowerCase() + ":" + pin));
      return Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      return null;
    }
  }
  function KO_ls(k, v) {
    try {
      if (v === void 0) return JSON.parse(localStorage.getItem(k) || "{}");
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      return {};
    }
  }
  function KO_epoch(ep) {
    if (!ep) return;
    try {
      if (localStorage.getItem("milo3d_epoch") === ep) return;
      for (let k of Object.keys(localStorage)) (k.startsWith("milo3d_v1_") || ["milo3d_lh", "milo3d_cred", "milo3d_players", "milo3d_tok", "milo3d_family"].includes(k)) && localStorage.removeItem(k);
      localStorage.setItem("milo3d_epoch", ep), ye = { p: {}, ex: 0, days: {} }, Ti = [];
    } catch {
    }
  }

  // ---------------- Startbildschirm ----------------
  function cl(msg) {
    Ae = null, KO.par = null, KO.adm = null;
    let e = ln(), body = K("div", {}, K("p", { class: "qmsg" }, "Einen Moment …"));
    e.append(KO_box("splogin", K("h2", {}, "Milos Lern-Welt"), body)), LZ_bar();
    vf({ action: "status" }).then((r) => {
      if (!body.isConnected) return;
      if (!(r.j && r.j.ok)) throw 0;
      KO.st = r.j, KO_epoch(r.j.epoch), r.j.setupDone ? KO_home(body, msg) : KO_setup(body);
    }).catch(() => body.isConnected && KO_home(body, (msg ? msg + " " : "") + "Kein Internet. Wer hier schon angemeldet war, kann trotzdem spielen.", true));
  }
  function KO_setup(body) {
    let key = KO_in("Aktivierungsschlüssel (MILO-…)"), p1 = KO_in("Admin-Passwort (mind. 8 Zeichen)", "password"), p2 = KO_in("Passwort nochmal", "password"), m = K("p", { class: "qmsg" }, "Nur für den Besitzer des Spiels. Den Schlüssel gibt es einmalig bei der Installation.");
    body.parentNode.classList.add("ko-a"), body.replaceChildren(KO_role("a"), K("p", { class: "qsub" }, "Ersteinrichtung: Admin-Zugang anlegen"), key, p1, p2, m, K("button", { class: "qbtn go big", onclick: async () => {
      if (p1.value.length < 8) return void (m.textContent = "Das Admin-Passwort braucht mindestens 8 Zeichen.");
      if (p1.value !== p2.value) return void (m.textContent = "Die beiden Passwörter sind nicht gleich.");
      m.textContent = "Einen Moment …";
      let r = await KO_call("adminSetup", { key: key.value, password: p1.value });
      if (r.j.ok) return KO.adm = { token: r.j.token }, Zs("Admin-Zugang eingerichtet."), KO_adminEnter();
      m.textContent = KO_msg(r);
    } }, "\u{1F6E1} Einrichten"));
  }
  function KO_home(body, msg, offline) {
    let fam = KO_fam(), grid = K("div", { class: "spgrid" }), info = K("p", { class: "qmsg" }, msg || (fam ? (/^familie /i.test(fam.name) ? "" : "Familie ") + fam.name + ": Tippe auf dein Bild." : "Melde dich mit deinem Spielernamen an.")), draw = (list) => {
      grid.replaceChildren(...list.map((p) => K("button", { class: "spcard", onclick: () => KO_childLogin(p.name, p.figure, !p.hasPin) }, K("span", { class: "spav" }, p.figure || "\u{1F642}"), K("b", {}, p.name))));
    };
    body.parentNode.classList.remove("ko-a", "ko-p");
    let cache = KO_ls("milo3d_players");
    fam && cache[fam.id] && draw(cache[fam.id]);
    fam && !offline && vf({ action: "familyPlayers", familyId: fam.id }).then((r) => {
      r.j && r.j.ok ? (cache[fam.id] = r.j.players, KO_ls("milo3d_players", cache), grid.isConnected && draw(r.j.players)) : r.status === 404 && (localStorage.removeItem("milo3d_family"), info.textContent = "Dieses Gerät gehört zu keiner Familie mehr.");
    }).catch(() => {
    });
    body.replaceChildren(KO_role("k"), K("p", { class: "qsub" }, "Wer spielt?"), grid, info, K("button", { class: "qbtn go big", onclick: () => KO_childLogin("", "") }, "\u{1F9D2} Mit Spielernamen anmelden"), K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: () => KO_parentLogin() }, "\u{1F468}‍\u{1F469} Eltern"), K("button", { class: "qbtn", onclick: KO_adminLogin }, "\u{1F6E1} Admin")));
  }

  // ---------------- Kind ----------------
  function KO_childLogin(name, fig, first) {
    let nm = KO_in("Spielername", "text", { value: name, maxlength: 20 }), pw = KO_in("Dein Passwort (Zahlen)", "password", { inputmode: "numeric", maxlength: 8 }), m = K("p", { class: "qmsg" }, first ? "Du bist neu! Denk dir ein Passwort aus: 4 bis 8 Zahlen. Merk es dir gut." : "Gib dein Passwort ein."), busy = false, go = async () => {
      if (busy) return;
      let n = nm.value.trim(), pin = pw.value.trim();
      if (!n) return void (m.textContent = "Bitte deinen Spielernamen eingeben.");
      if (!/^[0-9]{4,8}$/.test(pin)) return void (m.textContent = "Das Passwort hat 4 bis 8 Zahlen.");
      busy = true, m.textContent = "Einen Moment …";
      let r = await KO_call("childLogin", { name: n, pin });
      if (busy = false, r.j && r.j.ok) {
        let h = await SP_hash(r.j.profile.name, pin), lh = KO_ls("milo3d_lh"), tk = KO_ls("milo3d_tok");
        return h && (lh[r.j.profile.name.toLowerCase()] = h), tk[r.j.profile.name.toLowerCase()] = r.j.token, KO_ls("milo3d_lh", lh), KO_ls("milo3d_tok", tk), KO_childIn(r.j.profile, r.j.token, r.j.firstLogin, false);
      }
      if (r.status === 400 && r.j.firstLogin) return void (m.textContent = "Du bist neu! Denk dir ein Passwort aus: 4 bis 8 Zahlen.");
      if (r.status === 0) {
        let h = await SP_hash(n, pin), lh = KO_ls("milo3d_lh"), tk = KO_ls("milo3d_tok");
        if (h && lh[n.toLowerCase()] === h) return KO_childIn({ name: n, figure: fig }, tk[n.toLowerCase()] || "", false, true);
        return void (m.textContent = "Kein Internet. Ohne Internet geht es nur, wenn du dich hier schon einmal angemeldet hast.");
      }
      m.textContent = r.status === 401 ? "Name oder Passwort stimmt nicht. Versuch es nochmal." : KO_msg(r);
    };
    pw.addEventListener("keydown", (c) => c.key === "Enter" && go()), ln().append(KO_box("splogin", KO_role("k"), fig && K("div", { class: "spav big" }, fig), K("h2", {}, name ? "Hallo " + name + "!" : "Anmelden"), name ? null : nm, pw, m, K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: go }, "Los geht's"), K("button", { class: "qbtn", onclick: () => cl() }, "Zurück")))), setTimeout(() => (name ? pw : nm).focus(), 60);
  }
  function KO_childIn(prof, token, first, off) {
    Ae = { name: prof.name, token, id: prof.id, figure: prof.figure, offline: !!off }, ol(Ae.name), prof.settings && (ye.settings = prof.settings), KO_apply(), off || uf(), qs(), Ys(), LZ_bar(), Zs(first ? "Passwort gespeichert. Merk es dir gut!" : off ? "Ohne Internet: Dein Fortschritt wird später übertragen." : "Hallo " + Ae.name + "! Viel Spaß beim Lernen.");
  }
  function KO_logout() {
    let t = Ae && Ae.token;
    t && !Ae.offline && setTimeout(() => vf({ action: "logout", token: t }).catch(() => {
    }), 3e3);
  }
  // Lern-Einstellungen der Eltern anwenden (das Kind kann sie nicht ändern; der Server nimmt Änderungen nur von Eltern/Admin an)
  var KO_DEF = { shieldMin: 15, shieldLearn: 5, dailyMinutes: 15, maxMinutes: 0, sessionMinutes: 0, pauseMinutes: 0, examQuestions: 10, distraction: "auto", subjects: null, blocksOff: [], goalTasks: 0, goalText: "", friendApproval: true, multiplayer: true };
  function KO_set() {
    let r = Ne.rules || {}, g = Object.assign({}, KO_DEF, { shieldMin: r.shieldMin != null ? r.shieldMin : 15, shieldLearn: r.shieldLearn || 5, dailyMinutes: r.dailyMinutes || 15, examQuestions: r.examQuestions || 10, distraction: r.distraction || "auto" });
    return Object.assign(g, Ae && !Ae.admin ? ye.settings || {} : {});
  }
  function KO_apply() {
    let s = KO_set();
    je.dailyMinutes = s.dailyMinutes, window.__shCfg = { min: s.shieldMin, learn: s.shieldLearn || 5 }, window.__setTPN && window.__setTPN(s.examQuestions), window.__distr = s.distraction;
    let mp = s.multiplayer !== false && !(Ne.mp && Ne.mp.off), b = document.getElementById("btn-mp");
    b && (b.style.display = mp ? "" : "none"), window.__mpOff = !mp, KO_unlockSync(), aa && aa();
  }
  function KO_allowedQ(q) {
    if (!Ae || Ae.admin) return true;
    let s = KO_set();
    if (s.subjects && s.subjects.length && !s.subjects.includes(q.fi)) return false;
    return !(s.blocksOff || []).includes(q.fi + "." + q.bi);
  }
  // Tagesgrenze, Sitzungslänge und Pausen
  function KO_block(st) {
    if (!Ae || Ae.admin) return false;
    let s = KO_set(), d = Li(), now = Date.now(), key = "milo3d_pause_" + Ae.name.toLowerCase(), pz = KO_ls(key);
    if (s.maxMinutes > 0 && d.sec >= s.maxMinutes * 60) return KO_stop("\u{1F319} Für heute ist Schluss!", "Du hast heute schon " + s.maxMinutes + " Minuten gelernt. Super! Morgen geht es weiter."), true;
    if (s.sessionMinutes > 0 && s.pauseMinutes > 0) {
      if (pz.until > now) return KO_stop("☕ Pause!", "Mach jetzt eine kleine Pause. Noch " + Math.ceil((pz.until - now) / 6e4) + " Minuten. Trink etwas und beweg dich ein bisschen."), true;
      if (pz.date !== Tr() || pz.until && pz.until <= now && pz.start == null) pz = { date: Tr(), start: d.sec };
      if (pz.start == null) pz.start = d.sec;
      if (d.sec - pz.start >= s.sessionMinutes * 60) return pz = { date: Tr(), until: now + s.pauseMinutes * 6e4, start: null }, KO_ls(key, pz), KO_stop("☕ Pause!", "Du hast " + s.sessionMinutes + " Minuten am Stück gelernt. Jetzt " + s.pauseMinutes + " Minuten Pause."), true;
      KO_ls(key, pz);
    }
    return false;
  }
  function KO_stop(h, t) {
    Cr(false), ln().append(KO_box("", K("h2", {}, h), K("p", { class: "qsub" }, t), K("button", { class: "qbtn go big", onclick: Ys }, "OK")));
  }
  function KO_locked(st) {
    ln().append(KO_box("", K("h2", {}, "\u{1F512} " + st.title), K("p", { class: "qsub" }, "Diese Aufgaben sind gerade nicht für dich freigeschaltet."), K("button", { class: "qbtn go big", onclick: Ys }, "OK")));
  }
  function KO_stationLock(st) {
    let c = (Ne.st && Ne.st[st.id]) || (Ne.extra || []).find((x) => x.id == st.id) || {};
    if (!Ae || Ae.admin) return false;
    if (c.off) return "Diese Station ist gerade geschlossen.";
    if (c.need > 0 && al(Xn) < c.need) return "Diese Station öffnet, wenn du " + c.need + " Aufgaben richtig hast. Du hast " + al(Xn) + ".";
    return false;
  }
  // Bestätigungen der Eltern übernehmen (Diktat, Abschreiben, Papier, Tag, Zeit)
  function KO_resOf(it, w) {
    let res = { id: it.id, typ: it.typ, n: it.n, wrong: w, right: it.n - w, err: Math.round(w / it.n * 1e3) / 10, pct: LZ_pct(it.n - w, it.n), sec: it.sec, mode: it.mode, at: it.at, ct: Date.now(), ok: 1, title: it.title };
    return res.note = r_(res.pct), res;
  }
  function KO_applyConfirm(list) {
    let done = ye.cfDone || (ye.cfDone = []), ch = false;
    for (let c of list || []) {
      if (done.includes(c.taskId)) continue;
      let d = c.data || {};
      if (["diktat", "abschreiben", "papier"].includes(c.type)) {
        for (let k in ye.days) {
          let day = ye.days[k], it = (day.pend || []).find((x) => x.id === c.taskId);
          if (!it) continue;
          let w = Math.max(0, Math.min(it.n, parseInt(d.wrong, 10) || 0));
          (day.dk || (day.dk = [])).some((x) => x.id === it.id) || day.dk.push(KO_resOf(it, w)), day.pend = day.pend.filter((x) => x.id !== it.id), ch = true;
        }
        if (!DK_pendAll().some((x) => x.id === c.taskId)) done.push(c.taskId);
      } else if (c.type === "tag" && d.day) {
        let day = ye.days[d.day];
        day && !day.ok && (day.ok = 1, day.reward = day.reward || (Ne.rewards.length ? Ne.rewards : xf)[0], ch = true), done.push(c.taskId);
      } else if (c.type === "zeit" && d.day && d.min > 0) {
        let day = ye.days[d.day] || (ye.days[d.day] = { sec: 0, idle: 0, pauses: 0, s: {}, cert: 0 });
        day.sec += Math.min(60, d.min) * 60, done.push(c.taskId), ch = true;
      } else done.push(c.taskId);
    }
    done.length > 500 && done.splice(0, done.length - 500), ch && (is = true, Pi(), aa());
  }
  function KO_loaded(j) {
    j.settings && (ye.settings = j.settings), KO_applyConfirm(j.confirmations), KO_apply();
  }
  // Elternbestätigung am Gerät des Kindes: Passwort wird nur an den Server geschickt, nie gespeichert
  function KO_confirmFlow(it, back) {
    if (!Ae || Ae.offline || !Ae.token) return Zs("Für die Kontrolle braucht man Internet."), back();
    let pw = KO_in("Eltern-Passwort", "password"), m = K("p", { class: "qmsg" }, "Nur für Erwachsene."), go = async () => {
      m.textContent = "Prüfe …";
      let r = await KO_call("parentCheck", { parentPassword: pw.value });
      if (!r.j.ok) return void (m.textContent = KO_msg(r));
      KO_checkScreen(it, back, pw.value);
    };
    pw.addEventListener("keydown", (c) => c.key === "Enter" && go()), ln().append(KO_box("ko-p", KO_role("p"), K("h2", {}, "\u{1F468}‍\u{1F469} Kontrolle: " + DK_TYP[it.typ]), pw, m, K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: go }, "Weiter"), K("button", { class: "qbtn", onclick: back }, "Zurück"))));
  }
  function KO_checkPanel(it, onOk) {
    let inp = KO_in("", "number", { inputmode: "numeric", min: 0, max: it.n, value: "0" }), m = K("p", { class: "qmsg" }), val = () => parseInt(inp.value, 10), set = (v) => inp.value = String(Math.max(0, Math.min(it.n, isNaN(v) ? 0 : v))), text = it.typ === "abschreiben" ? K("ol", { class: "dktext" }, (it.words || it.text.split(", ")).map((w) => K("li", {}, w))) : K("div", { class: "dktext" }, (it.title ? it.title + ": " : "") + it.text);
    return K("div", {}, K("p", { class: "qtag" }, new Date(it.at).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) + " \xB7 " + it.n + (it.typ === "papier" ? " Teilaufgaben" : " Wörter") + " \xB7 Zeit " + oa(it.sec || 0)), K("p", { class: "qmsg" }, it.typ === "papier" ? "Die Aufgabe war:" : "So hätte es richtig heißen müssen:"), text, K("p", { class: "qsub" }, it.typ === "papier" ? "Wie viele Teilaufgaben sind falsch?" : "Wie viele Wörter sind falsch geschrieben?"), K("div", { class: "dknum" }, K("button", { class: "qbtn", onclick: () => set(val() - 1) }, "−"), inp, K("button", { class: "qbtn", onclick: () => set(val() + 1) }, "+")), m, K("button", { class: "qbtn go big", onclick: () => {
      let w = val();
      if (isNaN(w) || w < 0 || w > it.n) return void (m.textContent = "Bitte eine Zahl von 0 bis " + it.n + ".");
      confirm(w + " von " + it.n + " falsch. Bestätigen?") && onOk(w, m);
    } }, "✓ Kontrolle bestätigen"));
  }
  function KO_checkScreen(it, back, ppw) {
    ln().append(KO_box("ko-p", KO_role("p"), K("h2", {}, "\u{1F468}‍\u{1F469} Kontrolle: " + DK_TYP[it.typ]), KO_checkPanel(it, async (w, m) => {
      m.textContent = "Speichere …";
      let r = await KO_call("confirmTask", { parentPassword: ppw, taskId: it.id, taskType: it.typ, data: { wrong: w, n: it.n } });
      if (!r.j.ok) return void (m.textContent = KO_msg(r));
      KO_applyConfirm([r.j.confirmation]);
      let day = ye.days[it.day], res = day && (day.dk || []).find((x) => x.id === it.id);
      res ? DK_result(res, back) : back();
    }), K("button", { class: "qbtn", onclick: back }, "Zurück")));
  }
  // Papier-Aufgaben (vom Admin angelegt, brauchen immer eine Elternbestätigung)
  function KO_paperFor(st) {
    return (Ne.paper || []).filter((p) => !p.off && (p.station ? String(p.station) === String(st.id) : (st.subj || []).includes(+p.subj)));
  }
  function KO_paperList(st, back) {
    let L = KO_paperFor(st);
    ln().append(KO_box("", K("div", { class: "qhead" }, K("h2", {}, "\u{1F4DD} Papier-Aufgaben"), K("button", { class: "qx", onclick: back }, "✕")), K("p", { class: "qmsg" }, "Diese Aufgaben machst du auf einem Blatt Papier. Danach schaut ein Erwachsener nach."), L.map((p) => K("button", { class: "qbtn big", onclick: () => KO_paper(p, back) }, p.title))));
  }
  function KO_paper(p, back) {
    if (KO_block()) return;
    let s0 = Li().sec;
    DK_begin(), window.__curFi = +p.subj || 0, ln().append(KO_box("", K("div", { class: "qhead" }, K("h2", {}, "\u{1F4DD} " + p.title), K("button", { class: "qx", onclick: () => DK_abort(back) }, "✕")), K("div", { class: "dktext", style: "font-size:20px" }, p.text), K("p", { class: "qmsg" }, "Schreib alles auf ein Blatt Papier. Wenn du fertig bist, tippe unten."), K("button", { class: "qbtn go big", onclick: () => DK_finish(back, { typ: "papier", title: p.title, text: p.text, n: Math.max(1, +p.n || 1), sec: Li().sec - s0, pid: p.id }) }, "✓ Fertig")));
  }

  // ---------------- Kinderbereich (Lernbuch-Erweiterung) ----------------
  function KO_correct() {
    try {
      return al(Xn);
    } catch {
      return 0;
    }
  }
  function KO_unlockSync() {
    window.__unl = ye.unl || [];
    let W = window.__W2;
    W && Ne.weapons && Ne.weapons.length && (W.splice(0, W.length, ...Ne.weapons.filter((w) => w && w.n).map((w) => ({ n: w.n, ic: w.ic || "⚔", dmg: +w.dmg || 6, rng: +w.rng || 3.4, cd: +w.cd || 0.5, need: w.ev ? 1e9 : +w.need || 0, off: !!w.off, desc: w.desc || "", rar: w.rar || "normal" }))), W.some((w) => !w.off) || W.push({ n: "Faust", ic: "✊", dmg: 6, rng: 3.4, cd: 0.45, need: 0 }));
    if (Ne.monsters && typeof Ei != "undefined") for (let k in Ne.monsters) {
      let m = Ne.monsters[k], e = Ei[k];
      if (!e || !m) continue;
      e.__d || (e.__d = { speed: e.speed, sense: e.sense, dmg: e.dmg });
      for (let f of ["speed", "sense", "dmg"]) e[f] = m[f] > 0 ? +m[f] : e.__d[f];
    }
    Ne.ranks && Ne.ranks.length && rf.splice(0, rf.length, ...Ne.ranks.filter((r) => r && r[1]).map((r) => [+r[0] || 0, String(r[1])]).sort((a, b) => a[0] - b[0]));
  }
  function KO_book(u) {
    if (!Ae) return;
    if (Ae.admin) return void u.append(K("button", { class: "qbtn go", onclick: Ci }, "\u{1F6E1} Admin-Bereich"));
    let s = KO_set(), d = Li(), tasks = Object.values(d.s || {}).reduce((a, x) => a + (x.n || 0), 0), fr = KO.frN || 0;
    s.goalTasks > 0 && u.append(K("p", { class: "qmsg" }, "\u{1F3AF} Ziel heute: " + s.goalTasks + " Aufgaben \xB7 geschafft: " + tasks + (tasks >= s.goalTasks ? " ✓" : ""))), s.goalText && u.append(K("p", { class: "qmsg" }, "\u{1F4AC} Lernziel: " + s.goalText)), KO_evCheck();
    let ev = KO_events().filter((x) => !x.done);
    u.append(K("div", { class: "ko-grid" }, K("button", { class: "qbtn", onclick: KO_kid }, "\u{1F3C5} Meine Erfolge"), K("button", { class: "qbtn", onclick: KO_friends }, "\u{1F46B} Freunde", fr ? K("span", { class: "ko-badge" }, String(fr)) : null), ev.length ? K("button", { class: "qbtn", onclick: KO_evScreen }, "\u{1F389} Aktionen (" + ev.length + ")") : null, !Ae.offline && K("button", { class: "qbtn", onclick: KO_fig }, "\u{1F5BC} Mein Bild")));
    Ae.offline || uf();
  }
  function KO_fig() {
    let sel = Ae.figure || SP_AV[0];
    ln().append(KO_box("", K("h2", {}, "\u{1F5BC} Mein Profilbild"), SP_avPick(sel, (a) => sel = a), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: async () => {
      let r = await KO_call("setFigure", { figure: sel });
      r.j.ok ? (Ae.figure = sel, Zs("Neues Bild gespeichert!")) : Zs(KO_msg(r)), Ri();
    } }, "Speichern"), K("button", { class: "qbtn", onclick: Ri }, "Zurück"))));
  }
  function KO_mastery(fis) {
    let all = Xn.filter((q) => fis.includes(q.fi) && KO_allowedQ(q));
    return all.length ? Math.round(al(all) / all.length * 100) : 0;
  }
  function KO_kid() {
    let days = Object.values(ye.days || {}), tot = days.reduce((a, d) => a + Object.values(d.s || {}).reduce((b, x) => b + (x.n || 0), 0), 0), right = KO_correct(), min = Math.round(days.reduce((a, d) => a + (d.sec || 0), 0) / 60), rewards = days.filter((d) => d.reward).map((d) => d.reward).concat(...days.map((d) => (d.ev || []).map((e) => e.reward)).filter(Boolean)), certs = days.filter((d) => d.ex).length, dks = days.reduce((a, d) => a + (d.dk || []).length, 0);
    let ach = [[tot >= 1, "\u{1F423}", "Erste Aufgabe"], [tot >= 100, "\u{1F4AF}", "100 Aufgaben"], [tot >= 500, "\u{1F680}", "500 Aufgaben"], [certs >= 1, "\u{1F3C5}", "Erste Urkunde"], [certs >= 10, "\u{1F451}", "10 Urkunden"], [m_() >= 3, "\u{1F525}", "3 Tage in Folge"], [m_() >= 7, "\u{1F31F}", "7 Tage in Folge"], [dks >= 1, "✍️", "Erstes Diktat"], [min >= 60, "⏱", "1 Stunde gelernt"], [min >= 600, "\u{1F3C6}", "10 Stunden gelernt"]];
    let W = (window.__W2 || []).filter((w) => !w.off), nextW = W.filter((w) => w.need > right && w.need < 1e9).sort((a, b) => a.need - b.need)[0], items = (Ne.items || []).filter((x) => !x.off), mine = items.filter((x) => (x.need > 0 && right >= x.need) || (ye.unl || []).includes(x.name)), nextR = rf.find((r) => r[0] > d_()), st = Object.entries(xn).map(([id, v]) => [v.title, KO_mastery(v.subj), KO_stationLock({ id })]);
    ln().append(KO_box("", K("div", { class: "qhead" }, K("h2", {}, "\u{1F3C5} Meine Erfolge"), K("button", { class: "qx", onclick: Ri }, "✕")), K("p", { class: "qsub" }, "\u{1F3F0} " + p_() + " \xB7 \u{1F525} " + m_() + " Tage in Folge"), K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F4CA} So viel hast du geschafft"), K("div", { class: "ko-row" }, "Aufgaben gelöst", K("b", {}, String(tot))), K("div", { class: "ko-row" }, "Richtig gekonnt (verschiedene)", K("b", {}, String(right))), K("div", { class: "ko-row" }, "Minuten gelernt", K("b", {}, String(min))), K("div", { class: "ko-row" }, "Urkunden", K("b", {}, String(certs))), K("div", { class: "ko-row" }, "Diktate und Abschreiben", K("b", {}, String(dks)))), K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F3C6} Abzeichen"), K("div", { class: "ko-chk" }, ach.map(([ok, ic, t]) => K("span", { style: ok ? "" : "opacity:.3;filter:grayscale(1)" }, ic + " " + t)))), K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F5FA} Stationen"), st.map(([t, p, lk]) => K("div", { class: "ko-row" }, (lk ? "\u{1F512} " : "") + t, K("b", {}, p + " %")))), K("div", { class: "ko-sec" }, K("h3", {}, "⚔ Waffen und Sammlung"), K("div", { class: "ko-chk" }, W.filter((w) => right >= w.need || (ye.unl || []).includes(w.n)).map((w) => K("span", {}, w.ic + " " + w.n)), mine.map((x) => K("span", {}, (x.icon || "⭐") + " " + x.name))), nextW && K("p", { class: "ko-small" }, "Nächste Waffe: " + nextW.ic + " " + nextW.n + " bei " + nextW.need + " richtigen Aufgaben")), K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F381} Belohnungen"), rewards.length ? K("div", { class: "ko-chk" }, rewards.slice(-12).map((r) => K("span", {}, "\u{1F381} " + r))) : K("p", { class: "ko-small" }, "Noch keine. Schaff deine Tagesprüfung und lass den Tag von den Eltern bestätigen!")), K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F3AF} Deine nächsten Ziele"), K("p", {}, nextR ? "Noch " + (nextR[0] - d_()) + " bestätigte Lerntage bis zum Rang „" + nextR[1] + "“." : "Du hast den höchsten Rang!"), KO_set().goalTasks > 0 && K("p", {}, "Jeden Tag " + KO_set().goalTasks + " Aufgaben schaffen."))));
  }

  // ---------------- Aktionen / Events ----------------
  function KO_week(dt) {
    let x = new Date(dt);
    return x.setDate(x.getDate() - (x.getDay() + 6) % 7), Tr(x);
  }
  function KO_events() {
    if (!Ae || Ae.admin) return [];
    let today = Tr(), out = [];
    for (let e of Ne.events || []) {
      if (e.off || e.start && today < e.start || e.end && today > e.end) continue;
      let who = (e.who || "").split(",").map((x) => x.trim().toLowerCase()).filter(Boolean);
      if (who.length && !who.includes(Ae.name.toLowerCase())) continue;
      let from = e.rep === "tag" ? today : e.rep === "woche" ? KO_week(new Date()) : e.start || "0000", to = e.end || "9999", key = e.id + (e.rep === "tag" ? ":" + today : e.rep === "woche" ? ":" + from : ""), val = 0;
      for (let k in ye.days) {
        if (k < from || k > to) continue;
        let d = ye.days[k], ss = d.s || {};
        e.type === "minuten" ? val += (d.sec || 0) / 60 : e.type === "pruefung" ? d.ex && d.ex.n && Math.round(d.ex.r / d.ex.n * 100) >= (+e.pct || 0) && val++ : e.type === "schreiben" ? val += (d.dk || []).length : Object.keys(ss).forEach((f) => (e.subj === "" || e.subj == null || +e.subj === +f) && (val += e.type === "richtig" ? ss[f].r || 0 : ss[f].n || 0));
      }
      let done = Object.values(ye.days).some((d) => (d.ev || []).some((x) => x.k === key));
      out.push({ e, key, val: Math.floor(val), goal: Math.max(1, +e.goal || 1), done });
    }
    return out;
  }
  function KO_evCheck() {
    for (let x of KO_events()) if (!x.done && x.val >= x.goal) {
      let d = Li();
      (d.ev || (d.ev = [])).push({ k: x.key, id: x.e.id, name: x.e.name, reward: x.e.reward || "", at: Date.now() });
      for (let u of String(x.e.unlock || "").split(",").map((s) => s.trim()).filter(Boolean)) (ye.unl || (ye.unl = [])).includes(u) || ye.unl.push(u);
      is = true, Pi(), KO_unlockSync(), Zs("\u{1F389} Aktion geschafft: " + x.e.name + (x.e.reward ? " – " + x.e.reward : ""));
    }
  }
  setInterval(() => Ae && !Ae.admin && KO_evCheck(), 5e3);
  function KO_evScreen() {
    let L = KO_events(), lbl = { aufgaben: "Aufgaben lösen", richtig: "Aufgaben richtig", minuten: "Minuten lernen", pruefung: "Tagesprüfungen schaffen", schreiben: "Diktate/Papieraufgaben bestätigt" };
    ln().append(KO_box("", K("div", { class: "qhead" }, K("h2", {}, "\u{1F389} Aktionen"), K("button", { class: "qx", onclick: Ri }, "✕")), L.map((x) => K("div", { class: "ko-sec" }, K("h3", {}, (x.done ? "✅ " : "\u{1F525} ") + x.e.name), x.e.desc && K("p", { class: "ko-small" }, x.e.desc), K("div", { class: "qbar" }, K("i", { style: "width:" + Math.min(100, x.val / x.goal * 100) + "%" })), K("p", {}, Math.min(x.val, x.goal) + " von " + x.goal + " " + (lbl[x.e.type] || "")), x.e.reward && K("p", { class: "ko-small" }, "\u{1F381} Belohnung: " + x.e.reward), x.e.end && K("p", { class: "ko-small" }, "Bis " + new Date(x.e.end + "T12:00").toLocaleDateString("de-DE"))))));
  }

  // ---------------- Freunde ----------------
  setInterval(async () => {
    if (!Ae || Ae.offline || !Ae.token || document.hidden) return;
    let r = await KO_call("ping");
    r.status === 200 && (r.j.friendRequests > (KO.frN || 0) && Zs("\u{1F46B} Du hast eine neue Freundschaftsanfrage!"), KO.frN = r.j.friendRequests, r.j.profile && r.j.profile.settings && (ye.settings = r.j.profile.settings, KO_apply()));
  }, 6e4);
  async function KO_friends() {
    if (!Ae || Ae.offline) return Zs("Freunde gehen nur mit Internet.");
    let r = await KO_call("friendList");
    if (!r.j.ok) return Zs(KO_msg(r));
    let L = r.j, q = KO_in("Spielername oder Freundescode"), m = K("p", { class: "qmsg" }), row = (p, ...btn) => K("div", { class: "ko-row" }, K("span", {}, p.online != null ? K("span", { class: "ko-dot" + (p.online ? " on" : "") }) : null, (p.figure || "\u{1F642}") + " " + p.name), K("span", {}, ...btn)), act = async (a, b, ok) => {
      let x = await KO_call(a, b);
      x.j.ok ? (ok && Zs(ok), KO_friends()) : Zs(KO_msg(x));
    };
    KO.frN = L.incoming.filter((x) => !x.waitParent).length;
    ln().append(KO_box("", K("div", { class: "qhead" }, K("h2", {}, "\u{1F46B} Freunde"), K("button", { class: "qx", onclick: Ri }, "✕")), K("p", { class: "qmsg" }, "Dein Freundescode: ", K("b", {}, L.myCode || "–")), K("div", { class: "ko-sec" }, K("h3", {}, "➕ Freund hinzufügen"), q, m, K("button", { class: "qbtn go", onclick: async () => {
      let s = await KO_call("friendSearch", { q: q.value });
      if (!s.j.ok) return void (m.textContent = s.status === 404 ? "Diesen Spieler gibt es nicht." : KO_msg(s));
      m.replaceChildren((s.j.player.figure || "\u{1F642}") + " " + s.j.player.name + " ", K("button", { class: "qbtn go", onclick: async () => {
        let x = await KO_call("friendRequest", { q: s.j.player.name });
        x.j.ok ? (Zs(x.j.waitParent ? "Anfrage gespeichert. Deine Eltern müssen sie noch erlauben." : "Anfrage verschickt!"), KO_friends()) : m.textContent = KO_msg(x);
      } }, "Anfrage schicken"));
    } }, "Suchen")), L.incoming.length ? K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F4E9} Anfragen an dich"), L.incoming.map((p) => p.waitParent ? row(p, K("span", { class: "ko-small" }, "wartet auf Eltern")) : row(p, K("button", { class: "qbtn go", onclick: () => act("friendRespond", { id: p.id, accept: true }, "Angenommen!") }, "✓"), K("button", { class: "qbtn", onclick: () => act("friendRespond", { id: p.id, accept: false }) }, "✕")))) : null, K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F46B} Meine Freunde (" + L.friends.length + ")"), L.friends.length ? L.friends.map((p) => row(p, K("button", { class: "qbtn", onclick: () => confirm(p.name + " als Freund entfernen?") && act("friendRemove", { id: p.id }) }, "Entfernen"), K("button", { class: "qbtn", onclick: () => confirm(p.name + " blockieren? Dann kann er/sie dir keine Anfragen mehr schicken.") && act("block", { q: p.name }, "Blockiert.") }, "\u{1F6AB}"))) : K("p", { class: "ko-small" }, "Noch keine Freunde. Frag deine Freunde nach ihrem Code!")), L.outgoing.length ? K("div", { class: "ko-sec" }, K("h3", {}, "⏳ Gesendet"), L.outgoing.map((p) => row(p, K("span", { class: "ko-small" }, p.waitParent ? "wartet auf deine Eltern" : "wartet auf Antwort"), K("button", { class: "qbtn", onclick: () => act("friendRemove", { id: p.id }) }, "Zurückziehen")))) : null, L.blocked.length ? K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F6AB} Blockiert"), L.blocked.map((n) => row({ name: n }, K("button", { class: "qbtn", onclick: () => act("unblock", { q: n }) }, "Freigeben")))) : null));
  }

  // ---------------- Eltern ----------------
  function KO_parentLogin(back) {
    let fam = KO_fam(), lg = KO_in("Familienname (Login)", "text", { value: fam ? fam.login || "" : "" }), pw = KO_in("Eltern-Passwort", "password"), m = K("p", { class: "qmsg" }, "Nur für Eltern. Kinder kommen hier nicht hinein."), go = async () => {
      m.textContent = "Prüfe …";
      let r = await KO_call("parentLogin", { login: lg.value, password: pw.value });
      if (!r.j.ok) return void (m.textContent = KO_msg(r));
      pw.value = "", KO_parentIn(r.j, back);
    };
    pw.addEventListener("keydown", (c) => c.key === "Enter" && go()), Cr(false), ln().append(KO_box("ko-p splogin", KO_role("p"), K("h2", {}, "\u{1F468}‍\u{1F469} Elternbereich"), lg, pw, m, K("button", { class: "qbtn go big", onclick: go }, "Anmelden"), (!KO.st || KO.st.allowParentSignup !== false) && K("button", { class: "qbtn big", onclick: () => KO_parentRegister(back) }, "➕ Neues Elternkonto erstellen"), K("button", { class: "qbtn", onclick: back || (() => cl()) }, "Zurück")));
  }
  function KO_parentRegister(back) {
    let lg = KO_in("Familienname zum Anmelden, z. B. Familie Müller", "text", { maxlength: 30 }), dn = KO_in("Anzeigename (optional)", "text", { maxlength: 40 }), p1 = KO_in("Eltern-Passwort (mind. 6 Zeichen)", "password"), p2 = KO_in("Passwort nochmal", "password"), m = K("p", { class: "qmsg" }, "Ein Passwort für alle eigenen Kinder. Die Kinder dürfen es nicht kennen.");
    ln().append(KO_box("ko-p splogin", KO_role("p"), K("h2", {}, "➕ Neues Elternkonto"), lg, dn, p1, p2, m, K("button", { class: "qbtn go big", onclick: async () => {
      if (p1.value.length < 6) return void (m.textContent = "Das Passwort braucht mindestens 6 Zeichen.");
      if (p1.value !== p2.value) return void (m.textContent = "Die beiden Passwörter sind nicht gleich.");
      m.textContent = "Einen Moment …";
      let r = await KO_call("parentRegister", { login: lg.value, displayName: dn.value, password: p1.value });
      r.j.ok ? (Zs("Elternkonto erstellt!"), KO_parentIn(r.j, back)) : m.textContent = KO_msg(r);
    } }, "Erstellen"), K("button", { class: "qbtn", onclick: () => KO_parentLogin(back) }, "Zurück")));
  }
  function KO_parentIn(j, back) {
    KO.par = { token: j.token, family: j.family, back }, localStorage.setItem("milo3d_family", JSON.stringify({ id: j.family.id, name: j.family.name, login: j.family.login })), KO_parentHome();
  }
  function KO_parentLeave() {
    let b = KO.par && KO.par.back, t = KO.par && KO.par.token;
    t && !KO.par.familyId && vf({ action: "logout", token: t }).catch(() => {
    }), KO.par = null, b ? b() : cl();
  }
  async function KO_parentHome(sel) {
    let r = await KO_call("familyOverview", {}, "p");
    if (!r.j.ok) return Zs(KO_msg(r)), KO_parentLeave();
    let F = r.j, kids = F.children, admin = !!KO.par.familyId, box = KO_box("ko-p wide", KO_role(admin ? "a" : "p"), K("div", { class: "qhead" }, K("h2", {}, "\u{1F468}‍\u{1F469} " + F.family.name), K("button", { class: "qx", onclick: KO_parentLeave }, "✕"))), tabs = K("div", { class: "ko-tabs" }), main = K("div", {});
    KO.par.kids = kids;
    let show = (k) => {
      main.__k = k, [...tabs.children].forEach((b) => b.classList.toggle("on", b.dataset.k === String(k))), main.replaceChildren(K("p", { class: "qmsg" }, "Lade …")), k === "fam" ? KO_famView(main, F) : k === "neu" ? KO_kidNew(main) : KO_kidView(main, kids.find((c) => c.id === k));
    };
    for (let c of kids) tabs.append(K("button", { class: "ko-tab", "data-k": c.id, onclick: () => show(c.id) }, (c.figure || "\u{1F642}") + " " + c.name, c.online ? K("span", { class: "ko-dot on", style: "margin-left:6px" }) : null));
    tabs.append(K("button", { class: "ko-tab", "data-k": "neu", onclick: () => show("neu") }, "➕ Kind"), K("button", { class: "ko-tab", "data-k": "fam", onclick: () => show("fam") }, "⚙ Familie" + (F.friendApprovals.length ? " (" + F.friendApprovals.length + ")" : ""))), box.append(tabs, main), ln().append(box), show(sel || (kids[0] ? kids[0].id : "neu"));
  }
  function KO_kidNew(main) {
    let nm = KO_in("Name des Kindes", "text", { maxlength: 20 }), pin = KO_in("Passwort fürs Kind (4–8 Zahlen) – leer: Kind wählt selbst", "text", { inputmode: "numeric", maxlength: 8 }), sel = SP_AV[0], m = K("p", { class: "qmsg" });
    main.replaceChildren(K("div", { class: "ko-sec" }, K("h3", {}, "➕ Kind anlegen"), nm, K("p", { class: "ko-small" }, "Profilbild"), SP_avPick(sel, (a) => sel = a), pin, m, K("button", { class: "qbtn go big", onclick: async () => {
      let r = await KO_call("childCreate", { name: nm.value, pin: pin.value.trim(), figure: sel }, "p");
      r.j.ok ? (Zs(r.j.child.name + " ist angelegt."), KO_parentHome(r.j.child.id)) : m.textContent = KO_msg(r);
    } }, "Anlegen")));
  }
  async function KO_famView(main, F) {
    let o = KO_in("Altes Passwort", "password"), n1 = KO_in("Neues Passwort (mind. 6 Zeichen)", "password"), m = K("p", { class: "qmsg" }), act = async (id, ok) => {
      let r = await KO_call("friendApprove", { id, approve: ok }, "p");
      r.j.ok ? KO_parentHome("fam") : Zs(KO_msg(r));
    };
    main.replaceChildren(K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F46B} Freundschaften erlauben"), F.friendApprovals.length ? F.friendApprovals.map((a) => K("div", { class: "ko-row" }, K("span", {}, a.child + (a.direction === "out" ? " möchte " : " bekommt Anfrage von ") + (a.otherFigure || "") + " " + a.other), K("span", {}, K("button", { class: "qbtn go", onclick: () => act(a.id, true) }, "Erlauben"), K("button", { class: "qbtn", onclick: () => act(a.id, false) }, "Ablehnen")))) : K("p", { class: "ko-small" }, "Nichts offen.")), K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F4F1} Dieses Gerät"), K("p", { class: "ko-small" }, "Auf diesem Gerät werden die Kinder der Familie " + F.family.name + " beim Start angezeigt."), K("button", { class: "qbtn", onclick: () => (localStorage.removeItem("milo3d_family"), Zs("Gerät vergessen.")) }, "Gerät vergessen")), KO.par.familyId ? null : K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F511} Eltern-Passwort ändern"), o, n1, m, K("button", { class: "qbtn go", onclick: async () => {
      let r = await KO_call("familyPassword", { old: o.value, new: n1.value }, "p");
      m.textContent = r.j.ok ? "Gespeichert." : KO_msg(r);
    } }, "Ändern")));
  }
  // Auswertung eines Kindes
  async function KO_kidView(main, c) {
    let r = await KO_call("childData", { childId: c.id }, "p");
    if (main.__k !== c.id) return;
    if (!r.j.ok) return void main.replaceChildren(K("p", { class: "qmsg" }, KO_msg(r)));
    let D = r.j, days = D.days || {}, keys = Object.keys(days).sort(), today = Tr(), conf = D.confirmations || [], cids = new Set(conf.map((x) => x.taskId)), pend = [];
    for (let k of keys) for (let it of days[k].pend || []) cids.has(it.id) || pend.push(it);
    let last = [];
    for (let i = 13; i >= 0; i--) {
      let x = new Date();
      x.setDate(x.getDate() - i);
      let k = Tr(x), d = days[k] || {};
      last.push([k, Math.round((d.sec || 0) / 60), d]);
    }
    let maxM = Math.max(15, ...last.map((x) => x[1])), subj = {}, d30 = new Date();
    d30.setDate(d30.getDate() - 30);
    for (let k of keys) if (k >= Tr(d30)) for (let f in days[k].s || {}) {
      let x = days[k].s[f], s = subj[f] || (subj[f] = { n: 0, r: 0, sec: 0 });
      s.n += x.n || 0, s.r += x.r || 0, s.sec += (days[k].ss || {})[f] || 0;
    }
    let weeks = {};
    for (let k of keys) {
      let w = KO_week(new Date(k + "T12:00")), W = weeks[w] || (weeks[w] = { n: 0, r: 0, min: 0 });
      W.min += (days[k].sec || 0) / 60;
      for (let f in days[k].s || {}) W.n += days[k].s[f].n || 0, W.r += days[k].s[f].r || 0;
    }
    let blk = {};
    for (let p of D.progress || []) {
      let [f, b] = String(p.q).split("."), key = f + "." + b, B = blk[key] || (blk[key] = { bad: 0, ok: 0 });
      p.last === false ? B.bad++ : B.ok++;
    }
    let trouble = Object.entries(blk).filter(([, v]) => v.bad > 0).sort((a, b) => b[1].bad - a[1].bad).slice(0, 6), bname = (k) => {
      let [f, b] = k.split(".");
      return fl[f] && fl[f].b[b] ? fl[f].f.replace(" bis Klasse 6", "") + ": " + fl[f].b[b].n : k;
    }, prog = D.progress || [], mast = (fis) => {
      let all = Xn.filter((q) => fis.includes(q.fi)).length, ok = prog.filter((p) => p.r && fis.includes(+String(p.q).split(".")[0])).length;
      return all ? Math.round(ok / all * 100) : 0;
    }, tday = days[today] || {}, exams = keys.filter((k) => days[k].ex && days[k].ex.n).slice(-7), rewards = keys.filter((k) => days[k].reward || (days[k].ev || []).length);
    let sec = (h, ...kids) => K("div", { class: "ko-sec" }, K("h3", {}, h), ...kids), row = (a, b) => K("div", { class: "ko-row" }, K("span", {}, a), K("b", {}, b));
    main.replaceChildren(
      sec("\u{1F4C5} Heute", row("Gelernt", Math.round((tday.sec || 0) / 60) + " von " + (c.settings.dailyMinutes || (Ne.rules || {}).dailyMinutes || 15) + " Minuten"), row("Aufgaben", Object.values(tday.s || {}).reduce((a, x) => a + (x.n || 0), 0) + " (" + Object.values(tday.s || {}).reduce((a, x) => a + (x.r || 0), 0) + " richtig)"), row("Tagesprüfung", tday.ex && tday.ex.n ? tday.ex.r + " von " + tday.ex.n + " richtig" : "noch nicht"), row("Konzentration", tday.dn ? tday.dn - (tday.dt || 0) + " von " + tday.dn + " Ablenkungen ignoriert" : "–"), row("Zuletzt online", c.lastSeen ? new Date(c.lastSeen).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) : "noch nie"), K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: async () => {
        let mi = parseFloat((prompt("Wie viele Minuten Lernzeit nachtragen (z. B. Lernen ohne App)?", "5") || "").replace(",", "."));
        if (!(mi > 0 && mi <= 60)) return;
        let x = await KO_call("confirmTaskParent", { childId: c.id, taskId: "zeit:" + Date.now(), taskType: "zeit", data: { day: today, min: mi } }, "p");
        Zs(x.j.ok ? "+" + mi + " Minuten (wird beim nächsten Start übernommen)" : KO_msg(x));
      } }, "⏱ Zeit nachtragen"), K("button", { class: "qbtn", onclick: async () => {
        let x = await KO_call("confirmTaskParent", { childId: c.id, taskId: "tag:" + today, taskType: "tag", data: { day: today } }, "p");
        Zs(x.j.ok ? "Tag bestätigt (Belohnung erscheint beim Kind)" : KO_msg(x));
      } }, "✓ Tag bestätigen"))),
      sec("\u{1F4CA} Lernzeit der letzten 14 Tage", K("div", { class: "ko-bars" }, last.map(([k, m]) => K("div", { style: "height:" + Math.max(2, m / maxM * 100) + "%", title: k + ": " + m + " Min." }, K("span", {}, String(+k.slice(8)))))), K("p", { class: "ko-small", style: "margin-top:20px" }, "Insgesamt: " + Math.round((c.learnSec || 0) / 60) + " Minuten")),
      sec("\u{1F4DA} Fächer (letzte 30 Tage)", Object.keys(subj).length ? Object.entries(subj).map(([f, s]) => row(UK_fach(f), s.n + " Aufgaben \xB7 " + LZ_pct(s.r, s.n) + " % richtig \xB7 " + Math.round(s.sec / 60) + " Min.")) : K("p", { class: "ko-small" }, "Noch keine Aufgaben.")),
      sec("\u{1F4C8} Entwicklung pro Woche", Object.keys(weeks).sort().slice(-6).map((w) => row("Woche ab " + new Date(w + "T12:00").toLocaleDateString("de-DE"), Math.round(weeks[w].min) + " Min. \xB7 " + weeks[w].n + " Aufgaben \xB7 " + (weeks[w].n ? LZ_pct(weeks[w].r, weeks[w].n) + " %" : "–")))),
      sec("\u{1F5FA} Stationen (gekonnte Fragen)", Object.entries(xn).map(([id, v]) => row(v.title, mast(v.subj) + " %"))),
      sec("\u{1F9E9} Hier braucht es noch Übung", trouble.length ? trouble.map(([k, v]) => row(bname(k), v.bad + " Fragen zuletzt falsch")) : K("p", { class: "ko-small" }, "Keine Auffälligkeiten.")),
      sec("\u{1F3C1} Tagesprüfungen", exams.length ? exams.map((k) => row(new Date(k + "T12:00").toLocaleDateString("de-DE"), days[k].ex.r + " von " + days[k].ex.n + " (" + LZ_pct(days[k].ex.r, days[k].ex.n) + " %)")) : K("p", { class: "ko-small" }, "Noch keine.")),
      sec("\u{1F381} Belohnungen und Aktionen", rewards.length ? rewards.slice(-8).map((k) => row(new Date(k + "T12:00").toLocaleDateString("de-DE"), [days[k].reward].concat((days[k].ev || []).map((e) => e.name + (e.reward ? ": " + e.reward : ""))).filter(Boolean).join(" \xB7 "))) : K("p", { class: "ko-small" }, "Noch keine.")),
      sec("✍️ Warten auf eure Kontrolle (" + pend.length + ")", pend.length ? pend.map((it) => K("button", { class: "qbtn big", onclick: () => KO_parentCheck(c, it) }, DK_TYP[it.typ] + " \xB7 " + it.n + " \xB7 " + new Date(it.at).toLocaleDateString("de-DE"))) : K("p", { class: "ko-small" }, "Nichts offen.")),
      sec("✅ Bestätigt", conf.length ? conf.slice(0, 12).map((x) => row((DK_TYP[x.type] || (x.type === "tag" ? "Tag bestätigt" : x.type === "zeit" ? "Zeit nachgetragen" : x.type)) + (x.data && x.data.n ? " (" + (x.data.n - (x.data.wrong || 0)) + "/" + x.data.n + ")" : x.data && x.data.min ? " (+" + x.data.min + " Min.)" : ""), new Date(x.at).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }))) : K("p", { class: "ko-small" }, "Noch nichts.")),
      sec("\u{1F46B} Freunde", K("p", {}, (D.friends || []).join(", ") || "Keine"), K("p", { class: "ko-small" }, "Freundescode: " + (c.friendCode || "–"))),
      KO_settingsForm(c),
      KO_accountForm(c)
    );
  }
  function KO_parentCheck(c, it) {
    ln().append(KO_box("ko-p", KO_role("p"), K("h2", {}, "Kontrolle: " + DK_TYP[it.typ] + " von " + c.name), KO_checkPanel(it, async (w, m) => {
      let r = await KO_call("confirmTaskParent", { childId: c.id, taskId: it.id, taskType: it.typ, data: { wrong: w, n: it.n } }, "p");
      r.j.ok ? (Zs("Bestätigt. Wird beim Kind beim nächsten Start übernommen."), KO_parentHome(c.id)) : m.textContent = KO_msg(r);
    }), K("button", { class: "qbtn", onclick: () => KO_parentHome(c.id) }, "Zurück")));
  }
  function KO_settingsForm(c) {
    let s = Object.assign({}, KO_DEF, { dailyMinutes: (Ne.rules || {}).dailyMinutes || 15 }, c.settings || {}), num = (k, min, max) => {
      let i = KO_in("", "number", { min, max, value: String(s[k] || 0), inputmode: "numeric" });
      return i.addEventListener("change", () => s[k] = Math.max(min, Math.min(max, parseInt(i.value, 10) || 0))), i;
    }, chk = (lbl, on, f) => {
      let i = K("input", { type: "checkbox" });
      return i.checked = !!on, i.addEventListener("change", () => f(i.checked)), K("label", {}, i, " " + lbl);
    }, subs = new Set(s.subjects && s.subjects.length ? s.subjects : fl.map((x, i) => i)), off = new Set(s.blocksOff || []), dist = K("select", { class: "qin" }, [["auto", "Automatisch"], ["aus", "Aus"], ["1", "Leicht"], ["2", "Mittel"], ["3", "Stark"]].map(([v, t]) => K("option", { value: v }, t))), gt = KO_in("z. B. Diese Woche zwei Diktate", "text", { value: s.goalText || "", maxlength: 200 }), m = K("p", { class: "qmsg" });
    dist.value = s.distraction;
    let topics = K("details", {}, K("summary", { class: "ko-small" }, "Themen einzeln freischalten"), fl.map((f, fi) => K("div", { class: "ko-chk" }, K("b", {}, f.f.replace(" bis Klasse 6", "")), f.b.map((b, bi) => chk(b.n, !off.has(fi + "." + bi), (v) => v ? off.delete(fi + "." + bi) : off.add(fi + "." + bi))))));
    return K("div", { class: "ko-sec" }, K("h3", {}, "⚙ Lerneinstellungen für " + c.name), KO_field("Lernzeit pro Tag (Minuten bis zur Prüfung)", num("dailyMinutes", 5, 120)), KO_field("Höchstens pro Tag (Minuten, 0 = keine Grenze)", num("maxMinutes", 0, 300)), KO_field("Am Stück lernen (Minuten, 0 = egal)", num("sessionMinutes", 0, 120)), KO_field("Danach Pause (Minuten)", num("pauseMinutes", 0, 60)), KO_field("Fragen in der Tagesprüfung", num("examQuestions", 5, 20)), KO_field("\u{1F6E1} Lernschild: so lange schützt er (Minuten, 0 = aus)", num("shieldMin", 0, 60)), KO_field("\u{1F6E1} Lernschild: so lange Aufgaben lösen füllt ihn ganz (Minuten)", num("shieldLearn", 1, 30)), KO_field("Ablenkungen", dist), KO_field("Aufgaben-Ziel pro Tag (0 = keins)", num("goalTasks", 0, 200)), KO_field("Eigenes Lernziel (Text)", gt), K("p", { class: "ko-small" }, "Freigeschaltete Fächer"), K("div", { class: "ko-chk" }, fl.map((f, i) => chk(f.f.replace(" bis Klasse 6", ""), subs.has(i), (v) => v ? subs.add(i) : subs.delete(i)))), topics, K("div", { class: "ko-chk" }, chk("Freundschaften nur mit Eltern-Erlaubnis", s.friendApproval !== false, (v) => s.friendApproval = v), chk("Zusammen spielen erlaubt", s.multiplayer !== false, (v) => s.multiplayer = v)), K("p", { class: "ko-small" }, "Schwierigkeitsstufen gibt es noch nicht: Die Fragen haben keine Stufen. Stattdessen könnt ihr oben Themen freischalten oder sperren."), m, K("button", { class: "qbtn go big", onclick: async () => {
      s.distraction = dist.value, s.goalText = gt.value, s.subjects = [...subs].sort(), s.blocksOff = [...off];
      let r = await KO_call("childSettings", { childId: c.id, settings: s }, "p");
      m.textContent = r.j.ok ? "✓ Gespeichert. Gilt beim Kind sofort (spätestens nach einer Minute)." : KO_msg(r), r.j.ok && (c.settings = r.j.settings);
    } }, "Einstellungen speichern"));
  }
  function KO_accountForm(c) {
    let pin = KO_in("Neues Passwort fürs Kind (4–8 Zahlen)", "text", { inputmode: "numeric", maxlength: 8 }), nm = KO_in("Name", "text", { value: c.name, maxlength: 20 }), sel = c.figure || SP_AV[0], m = K("p", { class: "qmsg" }), up = async (b, ok) => {
      let r = await KO_call("childUpdate", Object.assign({ childId: c.id }, b), "p");
      r.j.ok ? (Zs(ok), KO_parentHome(c.id)) : m.textContent = KO_msg(r);
    };
    return K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F464} Konto von " + c.name), nm, SP_avPick(sel, (a) => sel = a), K("button", { class: "qbtn", onclick: () => up({ name: nm.value, figure: sel }, "Gespeichert.") }, "Name und Bild speichern"), pin, K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: () => up({ pin: pin.value.trim() }, "Neues Passwort gesetzt.") }, "Passwort setzen"), K("button", { class: "qbtn", onclick: () => confirm("Passwort löschen? " + c.name + " wählt beim nächsten Anmelden selbst ein neues.") && up({ pin: "" }, "Passwort zurückgesetzt.") }, "Kind wählt neu")), K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: () => up({ active: !c.active }, c.active ? "Gesperrt." : "Freigegeben.") }, c.active ? "⏸ Konto sperren" : "▶ Konto freigeben"), K("button", { class: "qbtn boss", onclick: async () => {
      let n = prompt("Zum endgültigen Löschen den Namen eintippen: " + c.name + "\nAlle Lerndaten von " + c.name + " gehen dabei verloren.");
      if (n == null) return;
      let r = await KO_call("childDelete", { childId: c.id, confirmName: n }, "p");
      r.j.ok ? (Zs("Gelöscht."), KO_parentHome()) : m.textContent = KO_msg(r);
    } }, "\u{1F5D1} Löschen")), m);
  }

  // ---------------- Admin ----------------
  function KO_adminLogin() {
    let pw = KO_in("Admin-Passwort", "password"), m = K("p", { class: "qmsg" }), go = async () => {
      m.textContent = "Prüfe …";
      let r = await KO_call("adminLogin", { password: pw.value });
      if (!r.j.ok) return void (m.textContent = r.status === 409 ? "Das Spiel ist noch nicht eingerichtet." : KO_msg(r));
      pw.value = "", KO.adm = { token: r.j.token }, KO_adminEnter();
    };
    pw.addEventListener("keydown", (c) => c.key === "Enter" && go()), ln().append(KO_box("ko-a splogin", KO_role("a"), K("h2", {}, "\u{1F6E1} Admin"), pw, m, K("button", { class: "qbtn go big", onclick: go }, "Anmelden"), K("button", { class: "qbtn", onclick: () => cl() }, "Zurück")));
  }
  function KO_adminEnter() {
    Ae = { name: "Admin", token: KO.adm.token, admin: true }, ol("Admin"), KO_apply(), qs(), Ci();
  }
  var KO_cfg = () => la(Ne);
  async function KO_save(cfg, note, back) {
    ml(cfg);
    try {
      localStorage.setItem(dl, JSON.stringify(cfg));
    } catch {
    }
    let r = await KO_call("setConfig", { config: cfg, note }, "a");
    Zs(r.j.ok ? "✓ Gespeichert – gilt für alle Spieler" : "Nicht gespeichert: " + KO_msg(r)), KO_apply(), back && back();
  }
  function Ci() {
    if (!KO.adm) return KO_adminLogin();
    let t = (ic, n, f) => K("button", { class: "qbtn", onclick: f }, ic + "\n" + n);
    ln().append(KO_box("ko-a wide", KO_role("a"), K("div", { class: "qhead" }, K("h2", {}, "\u{1F6E1} Admin-Bereich"), K("button", { class: "qx", onclick: Ys }, "✕")), K("p", { class: "qmsg" }, "Alles hier gilt für alle Spieler. Jede Änderung wird protokolliert und kann rückgängig gemacht werden."), K("div", { class: "ko-grid" }, t("\u{1F46A}", "Eltern & Spieler", KO_admFam), t("\u{1F4CD}", "Stationen", KO_admStations), t("❓", "Aufgaben", KO_admTasks), t("\u{1F389}", "Events", KO_admEvents), t("⚔", "Waffen", KO_admWeapons), t("\u{1F48E}", "Gegenstände", KO_admItems), t("\u{1F47E}", "Monster", KO_admMonsters), t("\u{1F3C6}", "Ränge & Belohnungen", KO_admRewards), t("\u{1F4D6}", "Lernsystem & Regeln", KO_admRules), t("\u{1F5BC}", "Urkunde", UK_tplAdmin), t("\u{1F310}", "Mehrspieler & Freunde", KO_admMp), t("\u{1F4CA}", "Statistik", KO_admStats), t("\u{1F553}", "Verlauf & Rückgängig", KO_admHistory), t("\u{1F511}", "System & Passwort", KO_admSystem)), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: Ys }, "\u{1F3AE} Zum Spiel"), K("button", { class: "qbtn", onclick: () => (vf({ action: "logout", token: KO.adm.token }).catch(() => {
    }), KO.adm = null, cl()) }, "Abmelden"))));
  }
  function KO_admBox(title, ...kids) {
    ln().append(KO_box("ko-a wide", KO_role("a"), K("div", { class: "qhead" }, K("h2", {}, title), K("button", { class: "qx", onclick: Ci }, "✕")), ...kids));
  }
  // Generischer Listen-Editor für Inhalte in der Spiel-Konfiguration
  function KO_listEditor(title, key, fields, mk, info) {
    let cfg = KO_cfg(), L = cfg[key] || (cfg[key] = []), wrap = K("div", {}), draw = () => {
      wrap.replaceChildren(...L.map((it, i) => K("div", { class: "ko-sec" }, ...fields.map(([f, lbl, type, opts]) => {
        let el;
        if (type === "select") el = K("select", { class: "qin" }, opts.map(([v, t]) => K("option", { value: v }, t))), el.value = it[f] == null ? "" : String(it[f]);
        else if (type === "check") {
          el = K("input", { type: "checkbox" }), el.checked = !!it[f], el.addEventListener("change", () => it[f] = el.checked);
          return K("label", { class: "ko-chk" }, el, " " + lbl);
        } else el = K(type === "area" ? "textarea" : "input", { class: "qin", type: type === "area" ? null : type || "text", value: it[f] == null ? "" : String(it[f]) }), type === "area" && (el.value = it[f] || "", el.rows = 3);
        return el.addEventListener("change", () => it[f] = type === "number" ? parseFloat(String(el.value).replace(",", ".")) || 0 : el.value), KO_field(lbl, el);
      }), K("button", { class: "qbtn", onclick: () => confirm("Diesen Eintrag löschen?") && (L.splice(i, 1), draw()) }, "\u{1F5D1} Entfernen"))));
    };
    draw(), KO_admBox(title, info && K("p", { class: "qmsg" }, info), wrap, K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: () => (L.push(mk()), draw()) }, "➕ Neu"), K("button", { class: "qbtn go", onclick: () => KO_save(cfg, title, Ci) }, "\u{1F4BE} Speichern")));
  }
  var KO_subjOpts = () => [["", "alle Fächer"]].concat(fl.map((f, i) => [String(i), f.f.replace(" bis Klasse 6", "")]));
  function KO_admEvents() {
    KO_listEditor("\u{1F389} Events", "events", [["name", "Name"], ["desc", "Beschreibung", "area"], ["type", "Was ist zu tun?", "select", [["aufgaben", "Aufgaben lösen"], ["richtig", "Aufgaben richtig lösen"], ["minuten", "Minuten lernen"], ["pruefung", "Tagesprüfungen schaffen"], ["schreiben", "Diktate/Papieraufgaben (bestätigt)"]]], ["goal", "Anzahl", "number"], ["subj", "Fach", "select", KO_subjOpts()], ["pct", "Prüfung: mindestens % richtig", "number"], ["start", "Beginn", "date"], ["end", "Ende", "date"], ["rep", "Wiederholung", "select", [["einmal", "Einmal"], ["tag", "Jeden Tag neu"], ["woche", "Jede Woche neu"]]], ["who", "Nur für (Spielernamen mit Komma, leer = alle)"], ["reward", "Belohnung (Text)"], ["unlock", "Schaltet frei (Waffen-/Gegenstandsnamen mit Komma)"], ["off", "Pausiert", "check"]], () => ({ id: "ev" + Date.now().toString(36), name: "Neues Event", type: "aufgaben", goal: 20, subj: "", rep: "einmal", start: Tr(), end: "", reward: "" }), "Events erscheinen bei den Kindern unter „Aktionen“ mit Fortschrittsbalken. Ist das Ziel erreicht, gibt es die Belohnung automatisch.");
  }
  function KO_admWeapons() {
    let cfg = KO_cfg();
    cfg.weapons && cfg.weapons.length || (cfg.weapons = (window.__W2 || []).map((w) => ({ n: w.n, ic: w.ic, dmg: w.dmg, rng: w.rng, cd: w.cd, need: w.need < 1e9 ? w.need : 0 })), Ne.weapons = cfg.weapons);
    Ne.weapons = cfg.weapons, KO_listEditor("⚔ Waffen", "weapons", [["n", "Name"], ["ic", "Bild (Emoji)"], ["desc", "Beschreibung"], ["rar", "Seltenheit", "select", [["normal", "Normal"], ["selten", "Selten"], ["episch", "Episch"], ["legendaer", "Legendär"]]], ["dmg", "Schaden", "number"], ["rng", "Reichweite (Meter)", "number"], ["cd", "Wartezeit zwischen Schlägen (Sekunden)", "number"], ["need", "Freischalten ab richtigen Aufgaben", "number"], ["ev", "Nur über ein Event freischaltbar", "check"], ["off", "Ausgeschaltet", "check"]], () => ({ n: "Neue Waffe", ic: "\u{1FA83}", dmg: 10, rng: 4, cd: 0.5, need: 20 }), "Die Waffen liegen im Karren. Kinder starten mit der Waffe, die 0 richtige Aufgaben braucht.");
  }
  function KO_admItems() {
    KO_listEditor("\u{1F48E} Gegenstände", "items", [["name", "Name"], ["icon", "Bild (Emoji)"], ["desc", "Beschreibung"], ["kind", "Art", "select", [["sammel", "Sammelgegenstand"], ["ruestung", "Rüstung"], ["werkzeug", "Werkzeug"], ["truhe", "Schatztruhe"], ["besonders", "Besonderer Gegenstand"]]], ["rarity", "Seltenheit", "select", [["normal", "Normal"], ["selten", "Selten"], ["episch", "Episch"], ["legendaer", "Legendär"]]], ["need", "Freischalten ab richtigen Aufgaben (0 = nur per Event)", "number"], ["off", "Ausgeschaltet", "check"]], () => ({ name: "Neuer Gegenstand", icon: "\u{1F48E}", kind: "sammel", rarity: "normal", need: 50 }), "Gegenstände erscheinen in der Sammlung der Kinder („Meine Erfolge“). Sie haben noch keine Wirkung im Kampf – das ist nur bei Waffen so.");
  }
  function KO_admMonsters() {
    let cfg = KO_cfg(), M = cfg.monsters || (cfg.monsters = {}), names = { imp1: "Imp (rot)", imp2: "Imp (grün)", imp3: "Imp (blau)", pug1: "Puglin 1", pug2: "Puglin 2", pug3: "Puglin 3" }, rows = [];
    for (let k of typeof Ei != "undefined" ? Object.keys(Ei) : []) {
      let e = Ei[k], d = e.__d || e, m = M[k] || (M[k] = {}), f = (key, lbl) => {
        let i = KO_in("Standard " + d[key], "number", { value: m[key] || "" });
        return i.addEventListener("change", () => m[key] = parseFloat(i.value) || 0), KO_field(lbl, i);
      };
      rows.push(K("div", { class: "ko-sec" }, K("h3", {}, names[k] || k), f("speed", "Tempo"), f("sense", "Sichtweite (Meter)"), f("dmg", "Schaden pro Treffer")));
    }
    KO_admBox("\u{1F47E} Monster", K("p", { class: "qmsg" }, "Leer lassen = Standardwert. Ob Monster überhaupt erscheinen, stellt jeder Spieler selbst im ⚙-Menü ein."), ...rows, K("button", { class: "qbtn go big", onclick: () => KO_save(cfg, "Monster", Ci) }, "\u{1F4BE} Speichern"));
  }
  function KO_admRewards() {
    let cfg = KO_cfg();
    cfg.ranks && cfg.ranks.length || (cfg.ranks = rf.map((r) => [r[0], r[1]]));
    let rows = K("div", {}), draw = () => rows.replaceChildren(...cfg.ranks.map((r, i) => K("div", { class: "qrow" }, KO_in("Tage", "number", { value: r[0], onchange: (e) => r[0] = +e.target.value || 0 }), KO_in("Rang", "text", { value: r[1], onchange: (e) => r[1] = e.target.value }), K("button", { class: "qbtn", onclick: () => (cfg.ranks.splice(i, 1), draw()) }, "\u{1F5D1}"))));
    draw(), KO_admBox("\u{1F3C6} Ränge & Belohnungen", K("p", { class: "qmsg" }, "Ränge: ab wie vielen von Eltern bestätigten Lerntagen."), rows, K("button", { class: "qbtn", onclick: () => (cfg.ranks.push([cfg.ranks.length * 10, "Neuer Rang"]), draw()) }, "➕ Rang"), K("button", { class: "qbtn go", onclick: () => KO_save(cfg, "Ränge", Ci) }, "\u{1F4BE} Speichern"), K("button", { class: "qbtn big", onclick: g_ }, "\u{1F381} Belohnungen, Noten, Schule (bisheriges Menü)"));
  }
  function KO_admRules() {
    let cfg = KO_cfg(), R = cfg.rules || (cfg.rules = {}), num = (k, lbl, def, min, max) => {
      let i = KO_in("" + def, "number", { value: R[k] != null ? String(R[k]) : "" });
      return i.addEventListener("change", () => R[k] = Math.max(min, Math.min(max, i.value === "" ? def : +i.value || 0))), KO_field(lbl, i);
    }, dist = K("select", { class: "qin" }, [["auto", "Automatisch"], ["aus", "Aus"], ["1", "Leicht"], ["2", "Mittel"], ["3", "Stark"]].map(([v, t]) => K("option", { value: v }, t)));
    dist.value = R.distraction || "auto", dist.addEventListener("change", () => R.distraction = dist.value), KO_admBox("\u{1F4D6} Lernsystem & Regeln", K("p", { class: "qmsg" }, "Standardwerte für alle Kinder. Eltern können sie für ihr Kind überschreiben."), num("dailyMinutes", "Lernzeit pro Tag bis zur Prüfung (Minuten)", 15, 5, 120), num("examQuestions", "Fragen in der Tagesprüfung", 10, 5, 20), num("shieldMin", "\u{1F6E1} Lernschild: so lange schützt er (Minuten, 0 = aus)", 15, 0, 60), num("shieldLearn", "\u{1F6E1} Lernschild: so lange Aufgaben lösen füllt ihn ganz (Minuten)", 5, 1, 30), KO_field("Ablenkungen", dist), K("button", { class: "qbtn go big", onclick: () => KO_save(cfg, "Regeln", Ci) }, "\u{1F4BE} Speichern"), K("button", { class: "qbtn big", onclick: () => KO_admPaper() }, "\u{1F4DD} Papier-Aufgaben (mit Elternbestätigung)"));
  }
  function KO_admTasks() {
    KO_admBox("❓ Aufgaben", K("button", { class: "qbtn go big", onclick: Sf }, "➕ Neue Quiz-Frage"), K("button", { class: "qbtn big", onclick: Ef }, "\u{1F4CB} Eigene Quiz-Fragen (" + Ne.qs.length + ")"), K("button", { class: "qbtn big", onclick: KO_admPaper }, "\u{1F4DD} Papier-Aufgaben (Eltern bestätigen)"), K("p", { class: "ko-small" }, "Fragen aus dem Fragenkatalog (" + Xn.length + ") bleiben unverändert."));
  }
  function KO_admPaper() {
    let st = Object.entries(xn).map(([id, v]) => [id, v.title]);
    KO_listEditor("\u{1F4DD} Papier-Aufgaben", "paper", [["title", "Titel"], ["text", "Aufgabe (wird dem Kind gezeigt)", "area"], ["subj", "Fach", "select", fl.map((f, i) => [String(i), f.f.replace(" bis Klasse 6", "")])], ["station", "Station", "select", [["", "alle Stationen mit diesem Fach"]].concat(st)], ["n", "Anzahl Teilaufgaben", "number"], ["off", "Ausgeschaltet", "check"]], () => ({ id: "pa" + Date.now().toString(36), title: "Rechnen auf Papier", text: "Rechne auf deinem Blatt: 34 + 58, 71 − 26, 6 \xB7 7, 56 : 8", subj: "0", n: 4 }), "Das Kind löst die Aufgabe auf Papier. Danach muss ein Erwachsener mit dem Elternpasswort bestätigen, wie viele Teilaufgaben falsch sind. Normale Quiz-Fragen brauchen keine Bestätigung.");
  }
  // Stationen: Liste, an/aus, Freischaltung, Farbe, verschieben und neu per Tipp auf die Karte
  function KO_admStations() {
    let cfg = KO_cfg(), api = window.__api, S = api && api.world ? api.world.stations : [], rows = S.map((s) => {
      let c = s.custom ? (cfg.extra || []).find((x) => x.id == s.id) || {} : cfg.st[s.id] || (cfg.st[s.id] = {});
      return K("div", { class: "ko-sec" }, K("h3", {}, (c.off ? "⛔ " : "\u{1F4CD} ") + (c.name || s.name)), K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: () => (c.off = !c.off, KO_save(cfg, "Station " + (c.off ? "aus" : "an"), KO_admStations)) }, c.off ? "▶ Aktivieren" : "⏸ Deaktivieren"), K("button", { class: "qbtn", onclick: () => KO_mapPick("Tippe auf den neuen Ort für „" + (c.name || s.name) + "“", (p) => {
        let w = api.world.walk.nearest(p.x, p.z) || [p.x, p.z];
        Object.assign(c, { x: p.x, z: p.z, wx: w[0], wz: w[1] }), KO_save(cfg, "Station verschoben", KO_admStations);
      }) }, "↔ Verschieben"), s.custom && K("button", { class: "qbtn boss", onclick: () => confirm("Station löschen? Lerndaten der Kinder bleiben erhalten.") && (cfg.extra = cfg.extra.filter((x) => x !== c), KO_save(cfg, "Station gelöscht", KO_admStations)) }, "\u{1F5D1}")), KO_field("Freischalten ab richtigen Aufgaben (0 = sofort)", KO_in("0", "number", { value: c.need || "", onchange: (e) => c.need = +e.target.value || 0 })), s.custom && KO_field("Farbe der Lichtsäule", K("input", { type: "color", value: c.color || "#ffd34d", onchange: (e) => c.color = e.target.value })));
    });
    KO_admBox("\u{1F4CD} Stationen", K("button", { class: "qbtn go big", onclick: () => KO_mapPick("Tippe auf eine freie Stelle der Karte für die neue Station", (p) => KO_newStation(p)) }, "➕ Neue Station auf der Karte"), K("button", { class: "qbtn big", onclick: () => xl() }, "✏ Namen, Beschreibung, Fächer"), ...rows, K("button", { class: "qbtn go big", onclick: () => KO_save(cfg, "Stationen", Ci) }, "\u{1F4BE} Speichern"));
  }
  function KO_newStation(p) {
    let cfg = KO_cfg(), api = window.__api, w = api.world.walk.nearest(p.x, p.z) || [p.x, p.z], nm = KO_in("Name der Station"), ds = K("textarea", { class: "qin", rows: 2, placeholder: "Beschreibung" }), subs = new Set([0]), need = KO_in("0", "number"), col = K("input", { type: "color", value: "#ffd34d" }), ex = K("input", { type: "checkbox" });
    KO_admBox("➕ Neue Station", K("p", { class: "ko-small" }, "Ort: x " + Math.round(p.x) + ", z " + Math.round(p.z)), nm, ds, K("p", { class: "ko-small" }, "Aufgaben aus diesen Fächern"), K("div", { class: "ko-chk" }, fl.map((f, i) => {
      let c = K("input", { type: "checkbox" });
      return c.checked = subs.has(i), c.addEventListener("change", () => c.checked ? subs.add(i) : subs.delete(i)), K("label", {}, c, " " + f.f.replace(" bis Klasse 6", ""));
    })), KO_field("Freischalten ab richtigen Aufgaben (0 = sofort)", need), KO_field("Aussehen: Farbe der Lichtsäule", col), K("label", { class: "ko-chk" }, ex, " Mathe-Endboss (Abschlussprüfung)"), K("button", { class: "qbtn go big", onclick: () => {
      if (!nm.value.trim()) return Zs("Bitte einen Namen eingeben.");
      if (!subs.size) return Zs("Bitte mindestens ein Fach wählen.");
      let id = 100 + (cfg.extra || []).reduce((u, h) => Math.max(u, h.id - 99), 0);
      (cfg.extra || (cfg.extra = [])).push({ id, name: nm.value.trim(), short: nm.value.trim().slice(0, 12), desc: ds.value, x: p.x, z: p.z, wx: w[0], wz: w[1], subj: [...subs].sort(), exam: ex.checked, need: +need.value || 0, color: col.value }), KO_save(cfg, "Neue Station " + nm.value.trim(), KO_admStations);
    } }, "\u{1F4BE} Station erstellen"));
  }
  // Tippen auf die Karte: Bildschirmpunkt -> Boden (Strahl gegen die Ebene y = 0)
  function KO_mapPick(text, cb) {
    let api = window.__api, cv = document.getElementById("view");
    if (!api || !cv) return Zs("Karte nicht bereit.");
    Ys();
    let pre = [...document.querySelectorAll("#presets button")].find((b) => /ganze/i.test(b.textContent));
    pre && pre.click();
    let ban = K("div", { style: "position:fixed;left:50%;top:70px;transform:translateX(-50%);z-index:80;padding:10px 14px;border-radius:12px;background:rgba(40,26,0,.95);border:1px solid #ffb020;color:#fff;font:700 14px system-ui;text-align:center;max-width:90vw" }, "\u{1F6E1} " + text, K("br"), K("button", { class: "qbtn", onclick: (e) => (e.stopPropagation(), done(), Ci()) }, "Abbrechen")), done = () => (ban.remove(), cv.removeEventListener("pointerdown", h, true)), h = (e) => {
      e.preventDefault(), e.stopPropagation();
      let c = api.camera;
      c.updateMatrixWorld(), c.projectionMatrixInverse.copy(c.projectionMatrix).invert();
      let x = e.clientX / innerWidth * 2 - 1, y = -(e.clientY / innerHeight) * 2 + 1, un = (z) => {
        let P = c.projectionMatrixInverse.elements, W = c.matrixWorld.elements, v = [x, y, z, 1], q = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) q[i] = P[i] * v[0] + P[4 + i] * v[1] + P[8 + i] * v[2] + P[12 + i] * v[3];
        q = q.map((a) => a / q[3]);
        let o = [0, 0, 0];
        for (let i = 0; i < 3; i++) o[i] = W[i] * q[0] + W[4 + i] * q[1] + W[8 + i] * q[2] + W[12 + i];
        return o;
      }, a = un(-1), b = un(1), t = a[1] / (a[1] - b[1]);
      if (!(t > 0 && isFinite(t))) return Zs("Bitte auf den Boden tippen.");
      done(), cb({ x: a[0] + (b[0] - a[0]) * t, z: a[2] + (b[2] - a[2]) * t });
    };
    document.body.append(ban), cv.addEventListener("pointerdown", h, true);
  }
  function KO_admMp() {
    let cfg = KO_cfg(), M = cfg.mp || (cfg.mp = {}), c1 = K("input", { type: "checkbox" });
    c1.checked = !M.off, c1.addEventListener("change", () => M.off = !c1.checked), KO_admBox("\u{1F310} Mehrspieler & Freunde", K("label", { class: "ko-chk" }, c1, " Zusammen spielen (Raumcode, Wettbewerb) für alle erlaubt"), K("p", { class: "ko-small" }, "Eltern können es zusätzlich pro Kind verbieten. Freundschaften: Kinder suchen per Name oder Code; Eltern legen fest, ob sie Anfragen erst erlauben müssen (Standard: ja)."), K("button", { class: "qbtn go big", onclick: () => KO_save(cfg, "Mehrspieler", Ci) }, "\u{1F4BE} Speichern"));
  }
  async function KO_admStats() {
    let r = await KO_call("adminOverview", {}, "a");
    if (!r.j.ok) return Zs(KO_msg(r));
    let s = r.j.stats, row = (a, b) => K("div", { class: "ko-row" }, K("span", {}, a), K("b", {}, String(b)));
    KO_admBox("\u{1F4CA} Statistik", K("div", { class: "ko-sec" }, row("Elternkonten", s.families), row("Kinder", s.children), row("Gerade online", s.online), row("Beantwortete Fragen (verschiedene)", s.answers), row("Elternbestätigungen", s.confirmations), row("Freundschaften", s.friendships), row("Lernzeit insgesamt", s.learnMinutes + " Minuten")));
  }
  async function KO_admFam() {
    let r = await KO_call("adminOverview", {}, "a");
    if (!r.j.ok) return Zs(KO_msg(r));
    let fams = r.j.families, act = async (b, ok) => {
      let x = await KO_call("adminFamily", b, "a");
      x.j.ok ? (Zs(ok), KO_admFam()) : Zs(KO_msg(x));
    };
    KO_admBox("\u{1F46A} Eltern & Spieler", K("button", { class: "qbtn go", onclick: () => KO_parentRegister(KO_admFam) }, "➕ Neues Elternkonto"), fams.length ? null : K("p", { class: "qmsg" }, "Noch keine Elternkonten."), ...fams.map((f) => K("div", { class: "ko-sec" }, K("h3", {}, (f.active ? "" : "⛔ ") + f.name + " (" + f.login + ")"), f.children.map((c) => K("div", { class: "ko-row" }, K("span", {}, K("span", { class: "ko-dot" + (c.online ? " on" : "") }), (c.figure || "\u{1F642}") + " " + c.name + (c.active ? "" : " (gesperrt)")), K("b", {}, Math.round(c.learnSec / 60) + " Min."))), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: () => (KO.par = { token: KO.adm.token, familyId: f.id, back: KO_admFam }, KO_parentHome()) }, "Öffnen"), K("button", { class: "qbtn", onclick: () => {
      let p = prompt("Neues Eltern-Passwort für " + f.login + " (mind. 6 Zeichen):");
      p && act({ familyId: f.id, newPassword: p }, "Passwort geändert.");
    } }, "\u{1F511} Passwort"), K("button", { class: "qbtn", onclick: () => act({ familyId: f.id, active: !f.active }, f.active ? "Gesperrt." : "Freigegeben.") }, f.active ? "⏸ Sperren" : "▶ Freigeben"), K("button", { class: "qbtn boss", onclick: () => {
      let n = prompt("Familie mit allen Kindern und Lerndaten löschen? Zum Bestätigen den Login eintippen: " + f.login);
      n != null && act({ familyId: f.id, delete: true, confirmName: n }, "Gelöscht.");
    } }, "\u{1F5D1}")))));
  }
  async function KO_admHistory() {
    let r = await KO_call("adminLog", {}, "a");
    if (!r.j.ok) return Zs(KO_msg(r));
    KO_admBox("\u{1F553} Verlauf & Rückgängig", K("p", { class: "qmsg" }, "„Rückgängig“ stellt die Spielinhalte so wieder her, wie sie VOR dieser Änderung waren."), ...r.j.log.map((x) => K("div", { class: "ko-row" }, K("span", {}, new Date(x.at).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) + " \xB7 " + x.actor + ": " + x.action + (x.detail && (x.detail.note || x.detail.child || x.detail.family) ? " (" + (x.detail.note || x.detail.child || x.detail.family) + ")" : "")), x.canundo || x.canUndo ? K("button", { class: "qbtn", onclick: async () => {
      if (!confirm("Spielinhalte auf den Stand vor dieser Änderung zurücksetzen?")) return;
      let y = await KO_call("configRestore", { id: x.id }, "a");
      y.j.ok ? (ml(y.j.config || {}), KO_apply(), Zs("Wiederhergestellt."), KO_admHistory()) : Zs(KO_msg(y));
    } }, "↩ Rückgängig") : null)));
  }
  async function KO_admSystem() {
    let r = await KO_call("adminOverview", {}, "a"), on = !r.j.system || r.j.system.allowParentSignup !== false, c = K("input", { type: "checkbox" }), o = KO_in("Altes Admin-Passwort", "password"), n1 = KO_in("Neues Admin-Passwort (mind. 8 Zeichen)", "password"), m = K("p", { class: "qmsg" });
    c.checked = on, KO_admBox("\u{1F511} System", K("label", { class: "ko-chk" }, c, " Neue Elternkonten dürfen sich selbst registrieren"), K("button", { class: "qbtn go", onclick: async () => {
      let x = await KO_call("adminSystem", { allowParentSignup: c.checked }, "a");
      Zs(x.j.ok ? "Gespeichert." : KO_msg(x));
    } }, "Speichern"), K("div", { class: "ko-sec" }, K("h3", {}, "Admin-Passwort ändern"), o, n1, m, K("button", { class: "qbtn go", onclick: async () => {
      let x = await KO_call("adminPassword", { old: o.value, new: n1.value }, "a");
      m.textContent = x.j.ok ? "Gespeichert." : KO_msg(x);
    } }, "Ändern")));
  }
  window.__lzk = { cl, KO, KO_events };
  // ================= Ende Konten =================
