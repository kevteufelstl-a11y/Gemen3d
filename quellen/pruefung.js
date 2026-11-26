  // ================= Abschlusspruefung (26.11.2026) =================
  // Tor-Infofenster, Vorbereitung (Materialliste), Pruefungsraum (Theorie mit Countdown), Auswertung,
  // praktische Aufgaben, Elternkontrolle, Toroeffnung mit Abschlussurkunde, Belohnungen je Klasse.
  // Alles Wichtige entscheidet der Server (Aktionen exam*): Fragenauswahl, Zeit, Bewertung, Freischaltung des Tors.
  var PR = { busy: false, wrap: null, run: null, seen: null };
  (function PR_css() {
    const st = document.createElement("style");
    st.textContent = "#pr-wrap{position:fixed;inset:0;z-index:96;overflow:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(circle at 50% 0,#1d2c55,#050914 70%);color:#fff;font:18px/1.45 system-ui,sans-serif;padding:max(14px,env(safe-area-inset-top)) 12px 40px}"
      + "#pr-wrap .pr-box{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:14px}"
      + "#pr-wrap h1{margin:6px 0 0;font:900 clamp(24px,5vw,34px)/1.15 system-ui,sans-serif;color:#ffd75e;text-align:center;letter-spacing:.5px;text-shadow:0 2px 18px #ffb20055}"
      + "#pr-wrap h2{margin:4px 0;font:800 21px system-ui,sans-serif;color:#ffd75e}"
      + "#pr-wrap p{margin:0}"
      + ".pr-card{background:#ffffff10;border:1px solid #ffffff25;border-radius:18px;padding:16px}"
      + ".pr-gold{border:2px solid #ffd75e;box-shadow:0 0 26px #ffd75e33}"
      + ".pr-list{margin:6px 0 0;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:8px}"
      + ".pr-list li{display:flex;gap:10px;align-items:flex-start}"
      + ".pr-btn{display:block;width:100%;min-height:58px;border:0;border-radius:16px;font:900 20px system-ui,sans-serif;cursor:pointer;background:#2a3a66;color:#fff;padding:10px 16px}"
      + ".pr-btn.go{background:linear-gradient(180deg,#ffe07a,#ffb21e);color:#2a1800;box-shadow:0 6px 22px #ffb21e55}"
      + ".pr-btn:disabled{opacity:.45}"
      + ".pr-rew{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}"
      + ".pr-rew div{background:linear-gradient(160deg,#ffffff18,#ffffff06);border:1px solid #ffffff30;border-radius:16px;padding:12px;text-align:center;font-size:15px}"
      + ".pr-rew b{display:block;font-size:46px;line-height:1.1;filter:drop-shadow(0 6px 8px #0008);transform:perspective(200px) rotateX(10deg)}"
      + ".pr-rew i{display:block;font-style:normal;color:#ffd75e;font-weight:800;margin:4px 0 2px}"
      + ".pr-rew .soon{opacity:.6}"
      + ".pr-bar{height:16px;border-radius:9px;background:#ffffff1c;overflow:hidden;position:relative}.pr-bar i{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,#6fd68a,#ffd75e)}"
      + ".pr-bar s{position:absolute;top:-3px;bottom:-3px;width:3px;background:#fff}"
      + ".pr-head{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;font-weight:800}"
      + ".pr-clock{font:900 clamp(30px,8vw,46px)/1 ui-monospace,monospace;color:#ffd75e;padding:6px 14px;border-radius:14px;background:#0008;border:2px solid #ffd75e}"
      + ".pr-clock.low{color:#ff6b6b;border-color:#ff6b6b}"
      + ".pr-q{font:800 clamp(21px,4.5vw,28px)/1.35 system-ui,sans-serif;margin:6px 0}"
      + ".pr-opt{display:block;width:100%;min-height:64px;margin:0;border-radius:16px;border:2px solid #ffffff40;background:#ffffff12;color:#fff;font:700 clamp(18px,4vw,22px) system-ui,sans-serif;text-align:left;padding:12px 16px;cursor:pointer}"
      + ".pr-opt:disabled{opacity:.6}.pr-opt.sel{border-color:#ffd75e;background:#ffd75e30}"
      + ".pr-chk{display:flex;align-items:center;gap:14px;font-size:20px;padding:12px;border-radius:14px;background:#ffffff10;cursor:pointer}.pr-chk input{width:30px;height:30px}"
      + ".pr-tab{width:100%;border-collapse:collapse;font-size:16px}.pr-tab td{padding:7px 4px;border-bottom:1px solid #ffffff1c}.pr-tab td:last-child{text-align:right;font-weight:800}"
      + ".pr-big{font:900 54px/1 system-ui,sans-serif;text-align:center}";
    document.head.append(st);
  })();
  const PR_NOTE = ["", "sehr gut", "gut", "befriedigend", "ausreichend", "mangelhaft", "ungenügend"];
  const PR_mmss = (ms) => {
    const s = Math.max(0, Math.ceil(ms / 1e3));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  };
  const PR_date = (d) => d ? new Date(d).toLocaleString("de-DE", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
  function PR_open() {
    PR_close(true);
    const w = K("div", { id: "pr-wrap" }), b = K("div", { class: "pr-box" });
    w.append(b), document.body.append(w), PR.wrap = w, window.__quizOpen = true;
    try {
      window.__api && window.__api.pause();
    } catch {
    }
    return b;
  }
  function PR_close(keep) {
    PR.wrap && PR.wrap.remove(), PR.wrap = null;
    if (keep) return;
    window.__quizOpen = false;
    try {
      window.__api && window.__api.resume();
    } catch {
    }
  }
  async function PR_call(action, body) {
    // Admin: alles laeuft als Probelauf (Server: keine Voraussetzungen, kein Tor, kein Lernstand)
    const r = await KO_call(action, Object.assign({}, body || {}, Ae && Ae.admin ? { test: true } : {}));
    return r && r.j ? r.j : { error: "offline" };
  }
  const PR_child = () => !!(Ae && !Ae.admin && !Ae.offline && Ae.token);

  // ---------- Klassenstufe und Belohnungen je Klasse ----------
  function PR_level() {
    let lv = 3;
    for (let k = 4; k <= 7; k++) if ((ZN.exam || []).includes("k" + k)) lv = k;
    return lv;
  }
  var PR_RW = {
    4: {
      tag: [["⏰", "20 Minuten länger aufbleiben"], ["\u{1F36C}", "Eine Süßigkeit im Wert von bis zu 1,50 € aussuchen"], ["\u{1F310}", "20 Minuten länger Internet am selben Tag"], ["\u{1F35D}", "Ein Lieblingsessen für diese Woche wünschen"], ["\u{1F3B2}", "Eine Runde deines Lieblingsspiels mit Mama oder Papa"]],
      woche: [["\u{1F3AC}", "Einen Film aussuchen und mit Popcorn zusammen schauen"], ["\u{1F36B}", "Eine Süßigkeit im Wert von 3–4 € aussuchen"], ["\u{1F319}", "An einem Tag 30 Minuten länger aufbleiben"], ["\u{1F372}", "Zwei Wunschessen in dieser Woche"]],
      monat: [["\u{1F3A1}", "Einen Ausflug aussuchen (z. B. Schwimmbad, Kino oder Kletterhalle)"], ["\u{1F355}", "Ein Abendessen nach Wunsch bestellen"], ["\u{1F381}", "Ein kleines Geschenk im Wert von bis zu 10 € aussuchen"]]
    },
    5: {
      tag: [["⏰", "25 Minuten länger aufbleiben"], ["\u{1F36C}", "Eine Süßigkeit im Wert von bis zu 2 € aussuchen"], ["\u{1F310}", "25 Minuten länger Internet am selben Tag"], ["\u{1F3AE}", "20 Minuten extra Spielzeit am Wochenende"]],
      woche: [["\u{1F3AC}", "Kinoabend zu Hause mit Snacks nach Wahl"], ["\u{1F319}", "An einem Tag 40 Minuten länger aufbleiben"], ["\u{1F46B}", "Einen Freund oder eine Freundin einladen"]],
      monat: [["\u{1F3A2}", "Einen großen Ausflug aussuchen (z. B. Freizeitpark oder Zoo)"], ["\u{1F381}", "Ein Geschenk im Wert von bis zu 15 € aussuchen"]]
    },
    6: {
      tag: [["⏰", "30 Minuten länger aufbleiben"], ["\u{1F36C}", "Eine Süßigkeit im Wert von bis zu 2,50 € aussuchen"], ["\u{1F3AE}", "30 Minuten extra Spielzeit am Wochenende"]],
      woche: [["\u{1F3AC}", "Kinobesuch mit der Familie"], ["\u{1F46B}", "Übernachtungsparty mit einem Freund oder einer Freundin"]],
      monat: [["\u{1F3A2}", "Einen ganzen Ausflugstag planen und bestimmen"], ["\u{1F381}", "Ein Geschenk im Wert von bis zu 20 € aussuchen"]]
    }
  };
  // Belohnungsliste einer Klasse: zuerst die Liste der Eltern (pro Kind), sonst die Standardliste der Klasse
  function PR_rwList(lv, kind, settings) {
    const own = settings && settings.rewardListsK && settings.rewardListsK[lv] && RW_clean(settings.rewardListsK[lv][kind]);
    if (own && own.length) return own.map((x) => [RW_IC[kind], x]);
    if (kind === "trost") return null;
    return PR_RW[lv] && PR_RW[lv][kind] || null;
  }
  function PR_rwFieldsK(s) {
    const cur = s.rewardListsK = s.rewardListsK || {}, box = K("div", {});
    box.append(K("h3", {}, "\u{1F3F0} Bessere Belohnungen in den nächsten Klassen"), K("p", { class: "ko-small" }, "Hat das Kind die Abschlussprüfung bestanden und ist eine Klasse weiter, gelten diese Listen. Leere Felder = Standardvorschlag der Klasse. Die Vorschau am Tor zeigt genau diese Belohnungen."));
    for (const lv of [4, 5, 6]) {
      const L = cur[lv] = cur[lv] || {}, d = K("details", {}, K("summary", { class: "qmsg" }, "Klasse " + lv));
      for (const k of ["tag", "woche", "monat"]) {
        const base = RW_clean(L[k]).length ? RW_clean(L[k]) : (PR_RW[lv][k] || []).map((x) => x[1]), vals = [];
        for (let i = 0; i < 10; i++) vals[i] = base[i] || "";
        const upd = () => L[k] = vals.map((v) => v.trim()).filter(Boolean);
        upd(), d.append(K("p", { class: "ko-small" }, RW_IC[k] + " " + RW_NAME[k]));
        vals.forEach((v, i) => {
          const inp = KO_in("Platz " + (i + 1), "text", { value: v, maxlength: 200 });
          inp.addEventListener("input", () => (vals[i] = inp.value, upd())), d.append(inp);
        });
      }
      box.append(d);
    }
    return box;
  }

  // ---------- Praktische Aufgaben (passend zu Fach und Klasse) ----------
  function PR_pick(a) {
    return a[Math.floor(Math.random() * a.length)];
  }
  // Jede praktische Aufgabe hat 5 Teilaufgaben auf dem Blatt. Kriterien + Loesungen sehen nur die Eltern.
  function PR_tasks(kl, subjects) {
    const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1)), out = [], hi = kl >= 5;
    const has = (n) => subjects.some((s) => (s.name || "").toLowerCase().startsWith(n));
    const T5 = (t) => t.map((x, i) => "Aufgabe " + (i + 1) + ": " + x).join("\n\n");
    const RULE = "Bestanden, wenn mindestens 4 von 5 Aufgaben richtig sind und das Kind allein gearbeitet hat.";
    if (has("mathe")) {
      const a = hi ? R(1200, 4800) : R(214, 589), b = hi ? R(1100, 3900) : R(128, 389), c = hi ? R(2100, 6800) : R(512, 940), d = hi ? R(400, 1900) : R(136, 470), m1 = hi ? R(23, 68) : R(12, 46), m2 = hi ? R(12, 39) : R(3, 9), dv = hi ? R(6, 9) : R(3, 9), dq = hi ? R(112, 489) : R(12, 98), L = R(6, 12), w = R(3, 6), h = R(2, 5);
      out.push({ id: "mathe", fach: "Mathe", titel: "Schriftlich rechnen und messen", mat: ["Lineal"], text: "Schreibe jeden Rechenweg sauber untereinander (Stelle unter Stelle).\n\n" + T5([a + " + " + b + " =", c + " − " + d + " =", m1 + " · " + m2 + " =", dv * dq + " : " + dv + " =", "Zeichne mit dem Lineal eine gerade Linie, die genau " + L + " cm lang ist, und ein Rechteck mit " + w + " cm und " + h + " cm. Schreibe den Umfang des Rechtecks dazu."]),
        kriterien: ["Aufgabe 1: " + a + " + " + b + " = " + (a + b), "Aufgabe 2: " + c + " − " + d + " = " + (c - d), "Aufgabe 3: " + m1 + " · " + m2 + " = " + m1 * m2, "Aufgabe 4: " + dv * dq + " : " + dv + " = " + dq, "Aufgabe 5: Linie " + L + " cm (±2 mm), Rechteck " + w + " × " + h + " cm, Umfang " + 2 * (w + h) + " cm", "Die Rechenwege stehen sauber untereinander.", RULE] });
    }
    if (has("deutsch")) {
      const T = hi ? [["Am Samstag fuhr die Klasse 5b mit dem Fahrrad zur Burg. Unterwegs mussten alle anhalten, weil ein Reh über den Weg lief. „Ganz leise!“, flüsterte Frau Klein. Nach einer Stunde erreichten sie endlich das große Tor.", "fahren, laufen, flüstern", "fuhr, lief, flüsterte"], ["Lena hatte ihr Fahrrad repariert, obwohl es schon dunkel wurde. Ihr Bruder hielt die Taschenlampe. „Fertig!“, rief sie stolz. Am nächsten Morgen fuhr sie als Erste zur Schule.", "halten, rufen, werden", "hielt, rief, wurde"]] : [["Der kleine Hund heißt Bello. Er spielt gern im Garten. Am Abend schläft er in seinem Korb. Milo gibt ihm jeden Tag frisches Wasser.", "spielen, schlafen, geben", "spielte, schlief, gab"], ["Im Herbst fallen bunte Blätter von den Bäumen. Die Kinder sammeln Kastanien. Mama kocht eine warme Suppe. Draußen pfeift der Wind ums Haus.", "fallen, sammeln, kochen", "fiel, sammelte, kochte"]], t = PR_pick(T);
      const S = hi ? ["als wir nach hause kamen war es schon dunkel", "Als wir nach Hause kamen, war es schon dunkel."] : ["morgen gehen wir in den zoo", "Morgen gehen wir in den Zoo."];
      out.push({ id: "deutsch", fach: "Deutsch", titel: "Abschreiben und Sprache", mat: [], text: T5(["Schreibe diesen Text sauber und ohne Fehler ab. Achte auf Groß- und Kleinschreibung und auf alle Satzzeichen:\n" + t[0], "Schreibe 5 Nomen (Namenwörter) aus dem Text mit ihrem Artikel heraus (z. B. der Hund).", "Setze diese Verben in die Vergangenheit (ich …): " + t[1], "Schreibe den Satz richtig ab – mit Großbuchstaben und Satzzeichen: „" + S[0] + "“", "Schreibe einen eigenen Satz, wie die Geschichte weitergehen könnte."]),
        kriterien: ["Aufgabe 1: vollständig, alle Wörter, höchstens 2 kleine Fehler, alle Satzzeichen, leserlich.", "Aufgabe 2: 5 Nomen aus dem Text mit passendem Artikel.", "Aufgabe 3: Lösung: " + t[2], "Aufgabe 4: Lösung: " + S[1], "Aufgabe 5: ein vollständiger Satz, der zur Geschichte passt (Großbuchstabe am Anfang, Punkt am Ende).", RULE] });
    }
    if (has("englisch")) {
      const W = [["dog", "Hund"], ["cat", "Katze"], ["house", "Haus"], ["school", "Schule"], ["apple", "Apfel"], ["brother", "Bruder"], ["sister", "Schwester"], ["tree", "Baum"], ["book", "Buch"], ["water", "Wasser"], ["friend", "Freund"], ["window", "Fenster"]], ws = W.slice().sort(() => Math.random() - 0.5).slice(0, 5);
      const C = [["red", "rot"], ["blue", "blau"], ["green", "grün"], ["yellow", "gelb"], ["black", "schwarz"]].sort(() => Math.random() - 0.5).slice(0, 3), NW = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"], ns = [R(1, 12), R(1, 12), R(1, 12)];
      out.push({ id: "englisch", fach: "Englisch", titel: "Englisch schreiben", mat: ["Buntstifte"], text: T5(["Schreibe die englischen Wörter auf: " + ws.map((x) => x[1]).join(", "), "Male drei Kreise in diesen Farben und schreibe die englische Farbe daneben: " + C.map((x) => x[1]).join(", "), "Schreibe diese Zahlen auf Englisch aus: " + ns.join(", "), "Schreibe auf Englisch, wie du heißt und wie alt du bist (My name is … I am … years old.).", "Schreibe einen englischen Satz, was du magst (I like …)."]),
        kriterien: ["Aufgabe 1: " + ws.map((x) => x[1] + " = " + x[0]).join(", ") + " (mindestens 4 richtig)", "Aufgabe 2: " + C.map((x) => x[1] + " = " + x[0]).join(", "), "Aufgabe 3: " + ns.map((n) => n + " = " + NW[n - 1]).join(", "), "Aufgabe 4: My name is … I am … years old. (kleine Fehler sind erlaubt)", "Aufgabe 5: I like … + ein englisches Wort", "Die Schrift ist leserlich.", RULE] });
    }
    if (has("sachkunde") || has("naturwiss")) {
      const D = PR_pick([["Zeichne eine Pflanze und beschrifte Wurzel, Stängel, Blätter und Blüte.", "alle vier Teile gezeichnet und richtig beschriftet"], ["Zeichne einen Baum in den vier Jahreszeiten (vier kleine Bilder) und schreibe die Jahreszeit darunter.", "vier Bilder, Jahreszeiten richtig zugeordnet"], ["Zeichne drei Verkehrszeichen, die du kennst, und schreibe auf, was sie bedeuten.", "drei Zeichen erkennbar, Bedeutungen stimmen"]]);
      out.push({ id: "sachkunde", fach: has("naturwiss") ? "Naturwissenschaften" : "Sachkunde", titel: "Zeichnen und Wissen", mat: ["Buntstifte"], text: T5([D[0] + " Nimm deine Buntstifte.", "Schreibe die vier Jahreszeiten in der richtigen Reihenfolge auf, angefangen mit dem Frühling.", "Nenne drei Haustiere und schreibe auf, was sie fressen.", "Was machst du an einer roten Fußgängerampel? Schreibe einen Satz.", "Nenne drei gesunde Lebensmittel und ein Lebensmittel, von dem man nur wenig essen sollte."]),
        kriterien: ["Aufgabe 1: " + D[1] + ", ordentlich mit Buntstiften", "Aufgabe 2: Frühling, Sommer, Herbst, Winter", "Aufgabe 3: drei Haustiere mit passendem Futter (z. B. Hund – Hundefutter/Fleisch, Kaninchen – Heu/Gemüse)", "Aufgabe 4: stehen bleiben und warten, bis es grün ist", "Aufgabe 5: z. B. Obst, Gemüse, Vollkornbrot – wenig: Süßigkeiten, Chips, Limonade", RULE] });
    }
    if (has("psycho")) {
      out.push({ id: "psychologie", fach: "Psychologie", titel: "Gefühle verstehen", mat: [], text: T5(["Schreibe drei Dinge auf, die dir helfen, wenn du wütend bist.", "Was kannst du tun, wenn ein anderes Kind traurig ist?", "Schreibe eine Aufgabe auf, die du zu Hause regelmäßig übernimmst.", "Wie fühlst du dich heute? Schreibe auf, warum.", "Was macht einen guten Freund oder eine gute Freundin aus? Nenne zwei Dinge."]),
        kriterien: ["Aufgabe 1: drei sinnvolle Dinge (z. B. tief atmen, Pause, mit jemandem reden – kein Schlagen oder Schreien)", "Aufgabe 2: eine freundliche Idee (fragen, trösten, mitspielen)", "Aufgabe 3: eine echte Aufgabe im Haushalt", "Aufgabe 4: ein Gefühl mit Begründung (jede ehrliche Antwort zählt)", "Aufgabe 5: zwei passende Eigenschaften (z. B. ehrlich, hilft, hört zu)", "Es zählt der Inhalt, nicht die Rechtschreibung.", RULE] });
    }
    for (const s of subjects) {
      const n = (s.name || "").toLowerCase();
      if (["mathe", "deutsch", "englisch", "sachkunde", "naturwiss", "psycho"].some((x) => n.startsWith(x))) continue;
      out.push({ id: ("f" + s.subj).slice(0, 20), fach: s.name, titel: s.name + ": zeigen, was du kannst", mat: ["Buntstifte"], text: T5(["Schreibe in 3 bis 4 Sätzen auf, was du im Fach " + s.name + " gelernt hast.", "Schreibe drei Fachwörter aus " + s.name + " auf und erkläre jedes in einem Satz.", "Male ein Bild zu einem Thema aus " + s.name + ".", "Schreibe eine Quizfrage zu " + s.name + " auf und beantworte sie.", "Schreibe einen Merksatz, den du dir aus " + s.name + " gemerkt hast."]),
        kriterien: ["Aufgabe 1: 3 bis 4 passende Sätze", "Aufgabe 2: drei Fachwörter mit verständlicher Erklärung", "Aufgabe 3: ein Bild, das zum Fach passt", "Aufgabe 4: Frage und richtige Antwort", "Aufgabe 5: ein sinnvoller Merksatz", RULE] });
    }
    const mat = ["Bleistift oder Kugelschreiber", "Papier oder Schreibblock", "Radiergummi", "Spitzer"];
    for (const t of out) for (const m of t.mat || []) mat.includes(m) || mat.push(m);
    return { tasks: out.map((t) => ({ id: t.id, fach: t.fach, titel: t.titel, text: t.text, kriterien: t.kriterien })), materials: mat };
  }
  // Faecher des Lerngebiets aus den Fragen der App (gleiche Zuordnung wie der Server-Schluessel)
  function PR_subjects(kl) {
    const K3 = ["Mathematik", "Deutsch", "Englisch", "Sachkunde", "Psychologie"];
    return fl.map((f, i) => ({ subj: i, name: f.f.replace(" · Klasse " + kl, ""), k: f.k || (K3.includes(f.f) ? 3 : 0) })).filter((x) => x.k === kl);
  }

  // ---------- Tor: Infofenster ----------
  async function PR_gate(g) {
    const kl = Math.min(g.von, g.nach), next = Math.max(g.von, g.nach);
    if (!(Ae && Ae.admin && Ae.token) && !PR_child()) return KL_dialog("\u{1F310} Internet nötig", "Für die Abschlussprüfung musst du mit deinem Spielernamen angemeldet und online sein.", [["OK", null, true]]);
    if (PR.busy) return;
    PR.busy = true;
    const S = await PR_call("examStatus", { klasse: kl });
    PR.busy = false;
    if (!S.ok) return Zs("Die Prüfung ist gerade nicht erreichbar. Versuch es gleich noch einmal.");
    PR_info(S, S.klasse || kl, S.zone ? +String(S.zone).slice(1) || next : next);
    Ae && Ae.admin && PR.wrap && PR.wrap.firstChild.prepend(K("div", { class: "pr-card", style: "background:#ffb02033;border-color:#ffb020;text-align:center;font-weight:800" }, "\u{1F9EA} Admin-Probelauf: Du kannst die Prüfung jederzeit testen. Das Nachlernen nach einer nicht bestandenen Prüfung gilt hier nicht, es öffnet sich kein Tor und kein Lernstand wird verändert."));
  }
  window.__prTest = (g) => PR_gate(g);
  // Admin: so sieht das Kind das Fenster am Tor (Beispielwerte, startet nichts)
  function PR_preview(g) {
    const kl = Math.min(g.von, g.nach), next = Math.max(g.von, g.nach), fis = PR_subjects(kl).map((x) => x.subj), total = Xn.filter((q) => fis.includes(q.fi)).length;
    PR_info({ ok: true, klasse: kl, progress: { pct: 0, right: 0, total }, reason: total ? "vorschau" : "keine_fragen", canStart: false, exam: null, gateOpen: false }, kl, next);
    PR.wrap && PR.wrap.firstChild.prepend(K("div", { class: "pr-card", style: "background:#ffb02033;border-color:#ffb020;text-align:center;font-weight:800" }, "\u{1F6E1} Admin-Vorschau mit Beispielwerten – so sieht ein Kind dieses Fenster. Für dich selbst ist das Tor offen."));
  }
  window.__prPreview = (g) => PR_preview(g);
  function PR_info(S, kl, next) {
    const b = PR_open(), ex = S.exam, pg = S.progress || { pct: 0, right: 0, total: 0 }, lv = next, set = ye.settings || {};
    if (S.gateOpen) return PR_opened(S, kl, next, b);
    const rew = [];
    for (const k of ["tag", "woche", "monat"]) {
      const L = PR_rwList(lv, k, set) || [];
      L.length && rew.push(K("div", {}, K("b", {}, L[0][0]), K("i", {}, RW_NAME[k]), L[0][1]));
    }
    rew.push(K("div", { class: "soon" }, K("b", {}, "\u{1F9D9}"), K("i", {}, "Neue Spielfiguren"), "kommt später"), K("div", { class: "soon" }, K("b", {}, "\u{1F48E}"), K("i", {}, "Sammelobjekte"), "kommt später"));
    const st = (ok, wait) => ok ? "✅" : wait ? "⏳" : "\u{1F512}";
    const theo = ex && ex.status !== "laeuft" ? ex.grade <= 3 ? "bestanden (Note " + ex.grade + ")" : "nicht bestanden (Note " + ex.grade + ")" : ex && ex.status === "laeuft" ? "läuft gerade (" + ex.answered + " von " + ex.n + ")" : "noch nicht geschrieben";
    const pr = ex && ex.status === "theorie_bestanden" ? ex.practical : [], prOk = pr.filter((t) => t.status === "bestanden").length;
    b.append(
      K("h1", {}, "HIER WARTET DEIN NÄCHSTES ABENTEUER!"),
      K("div", { class: "pr-card pr-gold" }, K("p", {}, "Du bist schon weit gekommen! Aber hinter diesem Tor wartet noch etwas ganz Besonderes auf dich."), K("h2", { style: "margin-top:10px" }, "In Klasse " + next + " erwarten dich:"), K("ul", { class: "pr-list" }, [["\u{1F5FA}", "Ein neues Gebiet: " + ({ 4: "Gemen-Süd", 5: "die Neumühle", 6: "die Aa-Wiesen" }[next] || "eine neue Welt") + " zum Entdecken"], ["\u{1F4DA}", "Neue und spannendere Lernaufgaben"], ["\u{1F381}", "Bessere tägliche Belohnungen"], ["\u{1F3C6}", "Wertvollere Wochen- und Monatsbelohnungen"], ["⚔", "Größere Herausforderungen"]].map(([i, t]) => K("li", {}, K("span", {}, i), K("span", {}, t)))), K("p", { style: "margin-top:10px;font-weight:800;color:#ffd75e" }, "Je weiter du kommst, desto besser werden deine Belohnungen!")),
      K("div", { class: "pr-card" }, K("h2", {}, "\u{1F381} Deine Belohnungen in Klasse " + next), K("div", { class: "pr-rew" }, rew)),
      K("div", { class: "pr-card" }, K("h2", {}, "\u{1F9ED} Was dir noch fehlt"),
        K("p", {}, "Du kannst die Prüfung jederzeit machen. Sie dauert mindestens 40 Minuten, die Fragen sind aus allen Fächern gemischt."),
        K("ul", { class: "pr-list" }, [
          [st(S.reason !== "keine_fragen"), "Abschlussprüfung: " + (S.reason === "keine_fragen" ? "für diese Klasse gibt es noch keine Prüfung" : "jederzeit möglich")],
          [st(ex && ex.grade <= 3 && ex.status !== "laeuft" && ex.status !== "nicht_bestanden", ex && ex.status === "laeuft"), "Theoretische Prüfung: " + theo],
          [st(pr.length && prOk === pr.length, pr.length > 0), "Praktische Aufgaben: " + (pr.length ? prOk + " von " + pr.length + " bestanden" : "noch offen")],
          [st(false, pr.length > 0), "Elternbestätigung: " + (pr.length ? "wartet auf deine Eltern" : "noch offen")],
          ["\u{1F512}", "Nächste Welt: verschlossen"]].map(([i, t]) => K("li", {}, K("span", {}, i), K("span", {}, t))))),
      PR_actions(S, kl, next),
      K("button", { class: "pr-btn", onclick: () => PR_close() }, "Schließen"));
  }
  function PR_actions(S, kl, next) {
    const ex = S.exam, d = K("div", { style: "display:flex;flex-direction:column;gap:10px" });
    if (S.canStart) d.append(K("p", { style: "text-align:center;font-weight:900;font-size:22px;color:#6fd68a" }, "DEINE ABSCHLUSSPRÜFUNG IST FREIGESCHALTET!"), K("button", { class: "pr-btn go", onclick: () => PR_prepare(S, kl) }, "\u{1F393} ABSCHLUSSPRÜFUNG STARTEN"));
    else if (S.reason === "laeuft") d.append(K("button", { class: "pr-btn go", onclick: () => PR_run(ex) }, "▶ Prüfung fortsetzen (" + ex.answered + " von " + ex.n + ")"), Ae && Ae.admin ? K("button", { class: "pr-btn", onclick: async () => {
      const N = await PR_call("examStatus", { klasse: kl, neu: true });
      N.ok ? PR_prepare(N, kl) : Zs("Neustart nicht möglich.");
    } }, "\u{1F504} Probelauf neu starten") : null);
    else if (S.reason === "praxis_offen") d.append(K("button", { class: "pr-btn go", onclick: () => PR_practical(ex) }, "✍️ Praktische Aufgaben ansehen"));
    else if (S.reason === "nachlernen") {
      const R = ex && ex.remedial ? ex.remedial.subjects : [];
      d.append(K("div", { class: "pr-card" }, K("p", {}, "Deine letzte Prüfung war noch nicht Note 3. Das ist kein Grund aufzugeben! Übe in jedem Fach 20 Fragen an den Lernstationen. Danach bekommst du eine neue Prüfung mit anderen, zufälligen Fragen."),
        K("ul", { class: "pr-list", style: "margin-top:8px" }, R.map((x) => K("li", {}, K("span", {}, x.done >= x.need ? "✅" : "\u{1F4DA}"), K("span", {}, x.name + ": " + x.done + " von " + x.need + " Fragen")))),
        K("p", { style: "margin-top:8px;font-weight:800" }, "Deine Eltern können das Nachlernen auch erlassen.")));
    }
    else if (S.reason === "keine_fragen") d.append(K("div", { class: "pr-card" }, K("p", {}, "Für Klasse " + kl + " gibt es noch keine Prüfungsfragen. Sie kommen bald.")));
    Ae && Ae.admin && ex && ex.status === "theorie_bestanden" && d.append(K("button", { class: "pr-btn", onclick: () => PR_practical(ex) }, "✍️ Praktische Aufgaben des letzten Probelaufs"));
    Ae && Ae.admin && ex && ex.status === "bestanden" && d.append(K("button", { class: "pr-btn", onclick: () => PR_cert(ex) }, "\u{1F4DC} Urkunde des letzten Probelaufs"));
    return d;
  }
  // Tor ist offen (Pruefung bestanden)
  function PR_opened(S, kl, next, b) {
    const ex = S.exam;
    b.append(K("h1", {}, "\u{1F389} DAS TOR ZU KLASSE " + next + " IST OFFEN!"), K("div", { class: "pr-card pr-gold" }, K("p", {}, "Du hast die Abschlussprüfung der Klasse " + kl + " bestanden. Geh hindurch und entdecke deine neue Welt!")),
      ex ? K("button", { class: "pr-btn go", onclick: () => PR_cert(ex) }, "\u{1F4DC} Meine Abschlussurkunde") : null, K("button", { class: "pr-btn", onclick: () => PR_close() }, "Schließen"));
  }

  // ---------- Vorbereitung ----------
  function PR_prepare(S, kl) {
    const subj = PR_subjects(kl), T = PR_tasks(kl, subj), b = PR_open(), checks = [], go = K("button", { class: "pr-btn go", disabled: true, onclick: () => PR_rules(S, kl, T) }, "Weiter");
    const upd = () => go.disabled = !checks.every((c) => c.checked);
    b.append(K("h1", {}, "WAS BRAUCHST DU FÜR DEINE ABSCHLUSSPRÜFUNG?"), K("div", { class: "pr-card" }, K("p", {}, "Leg alles bereit und hake es ab. Die Sachen brauchst du für den praktischen Teil auf Papier.")),
      ...T.materials.map((m) => {
        const c = K("input", { type: "checkbox" });
        return checks.push(c), c.addEventListener("change", upd), K("label", { class: "pr-chk" }, c, m);
      }), go, K("button", { class: "pr-btn", onclick: () => PR_close() }, "Später"));
  }
  function PR_rules(S, kl, T) {
    const b = PR_open(), min = Math.round(S.totalSec / 60);
    b.append(K("h1", {}, "\u{1F4DC} ABSCHLUSSPRÜFUNG KLASSE " + kl), K("div", { class: "pr-card pr-gold" }, K("ul", { class: "pr-list" }, [
      ["\u{1F4DD}", S.nQuestions + " Fragen, bunt gemischt aus " + S.subjects + " Fächern (" + S.perSubject + " pro Fach)"],
      ["⏱", "Deine Zeit: zusammen " + min + " Minuten (mindestens 40), etwa " + S.secPerQ + " Sekunden pro Frage."],
      ["\u{1F512}", "Eine Antwort zählt sofort und kann nicht mehr geändert werden."],
      ["⏸", "Die Uhr läuft nur, solange eine Frage zu sehen ist. Pausieren geht nicht: Die Prüfung wird in einem Rutsch geschrieben. Bist du länger als 5 Minuten weg, wird sie beendet und zählt mit dem, was du bis dahin beantwortet hast."],
      ["\u{1F3C5}", "Bestanden ab Note 3 – das sind " + Math.ceil(S.nQuestions * 0.65) + " richtige Antworten."],
      ["✍️", "Danach kommen " + T.tasks.length + " praktische Aufgaben auf Papier, die deine Eltern kontrollieren."]].map(([i, t]) => K("li", {}, K("span", {}, i), K("span", {}, t))))),
      K("button", { class: "pr-btn go", onclick: async (e) => {
        e.target.disabled = true;
        const r = await PR_call("examStart", { klasse: kl, practical: T.tasks, materials: T.materials });
        if (!r.ok) return e.target.disabled = false, Zs(r.error === "laeuft" ? "Die Prüfung läuft schon." : "Start nicht möglich (" + (r.error || "offline") + ").");
        PR_run(r.exam);
      } }, "\u{1F680} Prüfung jetzt beginnen"), K("button", { class: "pr-btn", onclick: () => PR_close() }, "Abbrechen"));
  }

  // ---------- Pruefungsraum ----------
  function PR_run(ex) {
    const b = PR_open(), Q = ex.questions || [], st = { ex, idx: ex.answered, rem: ex.remainingMs, t0: 0, q: null, lock: false, iv: null };
    PR.run = st;
    const head = K("div", { class: "pr-head" }), clock = K("div", { class: "pr-clock" }), bar = K("div", { class: "pr-bar" }, K("i", {})), body = K("div", { class: "pr-card pr-gold", style: "display:flex;flex-direction:column;gap:12px" });
    b.append(K("h1", { style: "font-size:24px" }, "\u{1F4DC} ABSCHLUSSPRÜFUNG KLASSE " + ex.klasse), head, bar, body);
    const tick = () => {
      const left = st.rem - (st.t0 ? performance.now() - st.t0 : 0);
      clock.textContent = PR_mmss(left), clock.classList.toggle("low", left < 6e4);
      left <= 0 && !st.lock && (st.lock = true, clearInterval(st.iv), PR_finish(st));
    };
    const show = async () => {
      if (st.idx >= Q.length) return PR_finish(st);
      let qid = Q[st.idx];
      body.replaceChildren(K("p", {}, "Lade Frage …"));
      const r = await PR_call("examShow", { id: ex.id, q: qid });
      if (!r.ok) {
        if (r.error === "reihenfolge" && r.next) return Q[r.index] = r.next, st.idx = r.index, show();
        return body.replaceChildren(K("p", {}, "\u{1F4F6} Keine Verbindung."), K("button", { class: "pr-btn go", onclick: show }, "Nochmal versuchen"));
      }
      if (r.done) return PR_result(r.exam);
      r.replaced && (Q[st.idx] = qid = r.replaced, Zs("Weil die Prüfung unterbrochen war, bekommst du hier eine neue Frage."));
      st.rem = r.remainingMs;
      const q = sl.get(qid);
      if (!q) return body.replaceChildren(K("p", {}, "Diese Frage fehlt in deiner App-Version. Bitte nach Updates suchen."));
      st.q = q;
      head.replaceChildren(K("span", {}, (Ae && Ae.name || "") + " · Frage " + (st.idx + 1) + " von " + Q.length + " · " + String(fl[q.fi].f).replace(/ · Klasse \d/, "")), clock);
      bar.firstChild.style.width = st.idx / Q.length * 100 + "%";
      const order = mf(q), opts = order.map((o) => K("button", { class: "pr-opt", onclick: () => pick(o, opts[order.indexOf(o)]) }, q.o[o]));
      body.replaceChildren(K("p", { class: "pr-q" }, q.q), ...opts);
      st.t0 = performance.now(), st.lock = false, clearInterval(st.iv), st.iv = setInterval(tick, 250), tick();
      async function pick(o, el) {
        if (st.lock) return;
        st.lock = true;
        const ms = performance.now() - st.t0;
        clearInterval(st.iv), st.rem -= ms, st.t0 = 0;
        el.classList.add("sel"), opts.forEach((x) => x.disabled = true);
        let a;
        for (let k = 0; k < 3; k++) {
          a = await PR_call("examAnswer", { id: ex.id, q: qid, a: o, ms: Math.round(ms) });
          if (a.ok || a.error !== "offline") break;
          await new Promise((res) => setTimeout(res, 1500));
        }
        if (!a.ok) {
          if (a.error === "reihenfolge" && a.next) return st.idx = a.index, show();
          return body.append(K("p", {}, "\u{1F4F6} Antwort nicht gespeichert – Verbindung prüfen."), K("button", { class: "pr-btn go", onclick: () => (st.lock = false, st.t0 = performance.now(), st.iv = setInterval(tick, 250), pick(o, el)) }, "Nochmal senden"));
        }
        if (a.done) return PR_result(a.exam);
        st.idx = a.index, st.rem = a.remainingMs, setTimeout(show, 250);
      }
    };
    show();
  }
  async function PR_finish(st) {
    clearInterval(st.iv);
    const r = await PR_call("examFinish", { id: st.ex.id });
    if (!r.ok) return Zs("Die Zeit ist um. Die Auswertung kommt, sobald du wieder online bist."), PR_close();
    PR_result(r.exam);
  }

  // ---------- Auswertung ----------
  function PR_result(ex) {
    PR.run && clearInterval(PR.run.iv), PR.run = null;
    const b = PR_open(), ok = ex.grade <= 3, wrong = ex.n - (ex.right || 0), subj = ex.subjects || [];
    const best = subj.slice().sort((x, y) => y.right / y.n - x.right / x.n);
    b.append(K("h1", {}, ok ? "\u{1F389} THEORIE BESTANDEN!" : "\u{1F4AA} DIESMAL HAT ES NOCH NICHT GEREICHT"),
      K("div", { class: "pr-card pr-gold" }, K("div", { class: "pr-big" }, "Note " + ex.grade), K("p", { style: "text-align:center;font-weight:800" }, PR_NOTE[ex.grade] + " · " + ex.pct + " %")),
      K("div", { class: "pr-card" }, K("table", { class: "pr-tab" },
        [["✅ Richtige Antworten", ex.right], ["❌ Falsche Antworten", wrong], ["\u{1F4CA} Prozent", ex.pct + " %"], ["⏱ Durchschnitt pro Antwort", (ex.avgAnswerSec || 0) + " s"], ["⌛ Benötigte Zeit", PR_mmss(ex.usedMs) + " von " + PR_mmss(ex.totalSec * 1e3)]].map(([a, v]) => K("tr", {}, K("td", {}, a), K("td", {}, String(v)))))),
      K("div", { class: "pr-card" }, K("h2", {}, "Deine Fächer"), K("table", { class: "pr-tab" }, subj.map((s) => {
        const p = Math.round(s.right / s.n * 100);
        return K("tr", {}, K("td", {}, (p >= 80 ? "\u{1F4AA} " : p < 65 ? "\u{1F4DA} " : "\u{1F44D} ") + s.name), K("td", {}, s.right + " von " + s.n + " (" + p + " %)"));
      })), best.length > 1 ? K("p", { style: "margin-top:8px" }, "Stärke: " + best[0].name + ". Hier noch üben: " + best[best.length - 1].name + ".") : null),
      ok ? K("div", { class: "pr-card pr-gold" }, K("p", {}, "Super gemacht! Jetzt fehlt nur noch der praktische Teil auf Papier. Deine Eltern kontrollieren ihn – danach öffnet sich das Tor.")) : K("div", { class: "pr-card" }, K("p", {}, "Für Note 3 brauchst du mindestens 65 %. Du hattest " + ex.pct + " %. Das ist kein Grund aufzugeben!"), K("p", { style: "margin-top:8px" }, "Die " + wrong + " Fragen, die nicht richtig waren, sind jetzt wieder in deinen Lernstationen."), K("p", { style: "margin-top:8px;font-weight:800" }, "So geht es weiter: Mach in jedem Fach 20 Fragen an den Lernstationen. Dann bekommst du eine neue Prüfung mit zufälligen Fragen.")),
      ok ? K("button", { class: "pr-btn go", onclick: () => PR_practical(ex) }, "✍️ Zu den praktischen Aufgaben") : null,
      K("button", { class: "pr-btn", onclick: () => PR_close() }, "Schließen"));
  }
  function PR_practical(ex) {
    const b = PR_open(), P = ex.practical || [], ic = { bestanden: "✅", nicht_bestanden: "\u{1F501}", offen: "⏳" };
    b.append(K("h1", {}, "✍️ PRAKTISCHE AUFGABEN"), K("div", { class: "pr-card pr-gold" }, K("p", {}, "Löse diese Aufgaben auf Papier. Zeig deine Blätter danach deinen Eltern – sie kontrollieren alles im Elternbereich. Wenn alles bestanden ist, öffnet sich das Tor.")),
      ...P.map((t, i) => K("div", { class: "pr-card" + (t.status === "nicht_bestanden" ? " pr-gold" : "") }, K("h2", {}, (ic[t.status] || "⏳") + " " + (i + 1) + ". " + t.fach + ": " + t.titel), K("p", { style: "white-space:pre-line" }, t.text),
        t.status === "nicht_bestanden" ? K("p", { style: "margin-top:8px;color:#ffd75e;font-weight:800" }, "Das sollst du verbessern: " + (t.note || "")) : null,
        ex.test && Ae && Ae.admin ? K("div", { style: "margin-top:10px" }, K("p", { style: "font-size:15px;opacity:.85" }, "Kontrollkriterien (sehen sonst nur die Eltern):"), K("ol", { style: "font-size:15px;margin:4px 0 10px" }, (t.kriterien || []).map((x) => K("li", {}, x))),
          K("div", { style: "display:flex;gap:10px" }, K("button", { class: "pr-btn go", onclick: () => PR_testSet(ex, t, true) }, "✅ Bestanden"), K("button", { class: "pr-btn", onclick: () => PR_testSet(ex, t, false) }, "❌ Nicht bestanden"))) : null)),
      K("button", { class: "pr-btn", onclick: () => PR_close() }, "Schließen"));
  }

  async function PR_testSet(ex, t, ok) {
    let note = "";
    if (!ok && (note = prompt("Was soll verbessert werden?", "") || "").trim().length < 3) return Zs("Bitte kurz aufschreiben, was verbessert werden soll.");
    const x = await KO_call("examPractical", { examId: ex.id, taskId: t.id, passed: ok, note }, "a");
    if (!x.j || !x.j.ok) return Zs(KO_msg(x));
    const E = Object.assign({}, ex, x.j.exam);
    if (x.j.unlocked) {
      const b = PR_open();
      return b.append(K("h1", {}, "\u{1F389} PROBELAUF BESTANDEN!"), K("div", { class: "pr-card pr-gold" }, K("p", {}, "Theorie und alle praktischen Aufgaben sind bestanden. Bei einem Kind würde sich jetzt das Tor zu Klasse " + (ex.klasse + 1) + " öffnen – das Tor leuchtet, die Flügel gehen auf und die Abschlussurkunde erscheint.")),
        K("button", { class: "pr-btn go", onclick: () => PR_cert(E) }, "\u{1F4DC} Urkunde ansehen"), K("button", { class: "pr-btn", onclick: () => PR_close() }, "Schließen"));
    }
    PR_practical(E);
  }
  // ---------- Abschlussurkunde ----------
  function PR_certCanvas(ex) {
    const c = document.createElement("canvas"), W = 1240, H = 1754, x = c.getContext("2d");
    c.width = W, c.height = H;
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#fbf3dc"), g.addColorStop(1, "#ecd9a6"), x.fillStyle = g, x.fillRect(0, 0, W, H);
    x.strokeStyle = "#b8860b", x.lineWidth = 22, x.strokeRect(40, 40, W - 80, H - 80), x.lineWidth = 4, x.strokeRect(78, 78, W - 156, H - 156);
    x.textAlign = "center", x.fillStyle = "#5a3d06";
    x.font = "900 54px Georgia, serif", x.fillText("\u{1F480} LERNZONE ZERO \u{1F480}", W / 2, 230);
    x.font = "900 112px Georgia, serif", x.fillStyle = "#8a5a00", x.fillText("ABSCHLUSS-", W / 2, 420), x.fillText("URKUNDE", W / 2, 540);
    x.fillStyle = "#3b2a08", x.font = "42px Georgia, serif", x.fillText("Hiermit wird bestätigt, dass", W / 2, 680);
    x.font = "900 96px Georgia, serif", x.fillText(Ae && Ae.name || "", W / 2, 810);
    x.font = "42px Georgia, serif", x.fillText("die Abschlussprüfung der Klasse " + ex.klasse, W / 2, 920), x.fillText("erfolgreich bestanden hat.", W / 2, 980);
    x.font = "700 40px Georgia, serif", x.fillText("Lerngebiet: Klasse " + ex.klasse + ({ 3: " – Gemen Ortskern", 4: " – Gemen-Süd", 5: " – Neumühle", 6: " – Aa-Wiesen" }[ex.klasse] || ""), W / 2, 1100);
    x.fillText("Theorie: Note " + ex.grade + " (" + PR_NOTE[ex.grade] + ", " + ex.pct + " %)", W / 2, 1170), x.fillText("Praktischer Teil: bestanden und von den Eltern bestätigt", W / 2, 1240);
    x.font = "900 48px Georgia, serif", x.fillStyle = "#8a5a00", x.fillText("Das Tor zu Klasse " + (ex.klasse + 1) + " ist geöffnet!", W / 2, 1360);
    x.fillStyle = "#3b2a08", x.font = "38px Georgia, serif", x.fillText(new Date(ex.unlockedAt || ex.finishedAt || Date.now()).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }), W / 2, 1480);
    x.beginPath(), x.arc(W / 2, 1600, 70, 0, 6.3), x.fillStyle = "#c9a227", x.fill(), x.fillStyle = "#fff", x.font = "900 60px Georgia, serif", x.fillText("★", W / 2, 1622);
    return c;
  }
  function PR_cert(ex) {
    const b = PR_open(), c = PR_certCanvas(ex);
    c.style.cssText = "width:100%;height:auto;border-radius:12px;box-shadow:0 10px 30px #000a";
    b.append(K("h1", {}, "\u{1F4DC} DEINE ABSCHLUSSURKUNDE"), c, K("button", { class: "pr-btn go", onclick: () => {
      try {
        UKX.saveCanvas(c, "Abschlussurkunde_" + String(Ae && Ae.name || "Kind").replace(/[^A-Za-z0-9]+/g, "_") + "_Klasse_" + ex.klasse + ".pdf");
      } catch (e) {
        Zs("Download nicht möglich.");
      }
    } }, "⬇ Als PDF speichern"), K("button", { class: "pr-btn", onclick: () => PR_close() }, "Schließen"));
  }

  // ---------- Tor geoeffnet? (regelmaessig beim Server nachfragen) ----------
  async function PR_poll() {
    if (!PR_child() || window.__quizOpen) return;
    const r = await PR_call("zoneAccess", {});
    if (!r || !Array.isArray(r.zones)) return;
    const before = new Set(ZN.exam || []);
    ZN.srv = r.zones, ZN.exam = Array.isArray(r.exam) ? r.exam : [];
    try {
      localStorage.setItem("milo3d_zonen_" + (Ae.name || ""), JSON.stringify({ zones: ZN.srv, exam: ZN.exam }));
    } catch {
    }
    const ck = "milo3d_tor_gesehen_" + (Ae.name || ""), seen = JSON.parse(localStorage.getItem(ck) || "[]");
    const fresh = ZN.exam.filter((z) => !seen.includes(z));
    if (fresh.length) {
      const k = Math.max(...fresh.map((z) => +z.slice(1)));
      for (const z of fresh) seen.push(z);
      localStorage.setItem(ck, JSON.stringify(seen));
      try {
        KL_applyGates(), KL_glow(k);
      } catch {
      }
      const S = await PR_call("examStatus", { klasse: 3 });
      const b = PR_open();
      b.append(K("h1", {}, "\u{1F389}\u{1F3F0} DAS TOR ZU KLASSE " + k + " IST OFFEN!"), K("div", { class: "pr-card pr-gold" }, K("p", {}, "Deine Eltern haben alle praktischen Aufgaben bestätigt. Du hast die Abschlussprüfung bestanden!"), K("p", { style: "margin-top:8px" }, "Ab jetzt gelten deine Belohnungen der Klasse " + k + ".")),
        S.exam ? K("button", { class: "pr-btn go", onclick: () => PR_cert(S.exam) }, "\u{1F4DC} Abschlussurkunde ansehen") : null, K("button", { class: "pr-btn", onclick: () => PR_close() }, "Zum Tor!"));
    }
    before.size !== ZN.exam.length && KL_applyGates();
  }
  setInterval(() => PR_poll().catch(() => {}), 6e4), setTimeout(() => PR_poll().catch(() => {}), 8e3);
  window.__klassenExam = (g) => PR_gate(g);

  // ---------- Elternbereich: ABSCHLUSSPRUEFUNG – ELTERNKONTROLLE ----------
  async function PR_parent(main, c) {
    const box = K("div", { class: "ko-sec" }, K("h3", {}, "\u{1F393} ABSCHLUSSPRÜFUNG – ELTERNKONTROLLE"), K("p", { class: "ko-small" }, "Lade …"));
    main.append(box);
    const r = await KO_call("examParent", { childId: c.id }, "p");
    if (main.__k !== c.id) return;
    if (!r.j || !r.j.ok) return void box.replaceChildren(K("h3", {}, "\u{1F393} ABSCHLUSSPRÜFUNG – ELTERNKONTROLLE"), K("p", { class: "ko-small" }, KO_msg(r)));
    const D = r.j, row = (a, v) => K("div", { class: "ko-row" }, K("span", {}, a), K("b", {}, v)), yn = (v) => v ? "Ja" : "Nein", kids = [K("h3", {}, "\u{1F393} ABSCHLUSSPRÜFUNG – ELTERNKONTROLLE")];
    for (const k of D.klassen) {
      const E = D.exams.filter((e) => e.klasse === k.klasse), ex = E[0], pr = ex ? ex.practical : [], prOk = pr.filter((t) => t.status === "bestanden").length, theoOk = ex && ex.grade <= 3 && ex.status !== "laeuft";
      kids.push(K("p", { class: "qmsg" }, "Klasse " + k.klasse + " → Tor zu Klasse " + (+String(k.zone).slice(1) || k.klasse + 1)),
        row("Lernfortschritt", k.progress.pct + " % (" + k.progress.right + " von " + k.progress.total + ")"),
        row("Theoretische Prüfung abgeschlossen", yn(ex && ex.status !== "laeuft")),
        ex && ex.status !== "laeuft" ? row("Theoretisches Ergebnis", ex.right + " von " + ex.n + " richtig (" + ex.pct + " %) · Note " + ex.grade) : null,
        row("Praktischer Teil abgeschlossen", yn(pr.length > 0 && pr.every((t) => t.status !== "offen"))),
        row("Praktischer Teil bestanden", yn(pr.length > 0 && prOk === pr.length)),
        row("Noch offene praktische Aufgaben", String(theoOk ? pr.filter((t) => t.status !== "bestanden").length : "–")),
        row("Torfreischaltung", k.gateOpen ? "✅ Tor ist offen" : theoOk && pr.length ? "möglich, sobald alle Aufgaben bestanden sind" : "noch nicht möglich"));
      if (ex && ex.status === "theorie_bestanden") {
        kids.push(K("div", { class: "qmsg", style: "margin:8px 0" }, "So kontrolliert ihr: Ihr dürft erklären, was eine Aufgabe bedeutet. Sagt aber keine Antworten vor und macht nichts für das Kind. Kontrolliert nur nach den Punkten unten. Wenn etwas nicht reicht, schreibt kurz auf, was verbessert werden soll – das sieht das Kind im Spiel."));
        for (const t of pr) kids.push(K("div", { class: "ko-sec", style: "border:1px solid #ffffff30;border-radius:12px;padding:10px" },
          K("b", {}, (t.status === "bestanden" ? "✅ " : t.status === "nicht_bestanden" ? "\u{1F501} " : "⏳ ") + t.fach + ": " + t.titel),
          K("p", { class: "ko-small", style: "white-space:pre-line" }, "Aufgabe: " + t.text),
          K("p", { class: "ko-small" }, "Kontrollkriterien:"), K("ol", { class: "ko-small" }, (t.kriterien || []).map((x) => K("li", {}, x))),
          t.at ? K("p", { class: "ko-small" }, "Zuletzt bewertet: " + PR_date(t.at) + (t.note ? " · Hinweis: " + t.note : "")) : null,
          K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: () => PR_set(main, c, ex, t, true) }, "✅ Bestanden"), K("button", { class: "qbtn boss", onclick: () => PR_set(main, c, ex, t, false) }, "❌ Nicht bestanden"))));
      }
      if (ex && ex.status === "nicht_bestanden" && ex.remedial && !ex.remedial.ok && !ex.remedial.parentOk) kids.push(K("p", { class: "ko-small" }, "Nachlernen vor dem neuen Versuch: " + ex.remedial.subjects.map((x) => x.name + " " + x.done + "/" + x.need).join(" · ")), K("button", { class: "qbtn", onclick: async () => {
        if (!confirm("Das Nachlernen (20 Fragen pro Fach) erlassen und einen neuen Prüfungsversuch sofort erlauben?")) return;
        const x = await KO_call("examRetry", { examId: ex.id }, "p");
        Zs(x.j && x.j.ok ? "Neuer Versuch ist erlaubt." : KO_msg(x)), KO_kidView(main, c);
      } }, "\u{1F501} Nachlernen erlassen, neuen Versuch erlauben"));
      if (ex && ex.status === "bestanden") kids.push(K("button", { class: "qbtn", onclick: () => PR_cert(ex) }, "\u{1F4DC} Abschlussurkunde ansehen"));
      E.length && kids.push(K("details", {}, K("summary", { class: "ko-small" }, "Prüfungsverlauf (" + E.length + ")"), E.map((e) => row(PR_date(e.startedAt), ({ laeuft: "läuft", theorie_bestanden: "Theorie bestanden", nicht_bestanden: "nicht bestanden", bestanden: "bestanden ✅" }[e.status] || e.status) + (e.grade ? " · Note " + e.grade + " (" + e.pct + " %)" : "")))));
    }
    box.replaceChildren(...kids.filter(Boolean));
  }
  async function PR_set(main, c, ex, t, ok) {
    let note = "";
    if (!ok) {
      note = prompt("Was soll das Kind verbessern? (wird im Spiel angezeigt)", "") || "";
      if (note.trim().length < 3) return Zs("Bitte kurz aufschreiben, was verbessert werden soll.");
    }
    const x = await KO_call("examPractical", { examId: ex.id, taskId: t.id, passed: ok, note }, "p");
    if (!x.j || !x.j.ok) return Zs(KO_msg(x));
    Zs(x.j.unlocked ? "\u{1F389} Alles bestanden – das Tor zu Klasse " + (+String(ex.zone || "").slice(1) || ex.klasse + 1) + " ist jetzt offen!" : ok ? "Als bestanden gespeichert." : "Gespeichert. Das Kind sieht euren Hinweis.");
    KO_kidView(main, c);
  }
  // Testzugang im Browser (aendert nichts am Server: alle Pruefungsentscheidungen trifft der Server)
  window.__pr = { info: PR_info, run: PR_run, result: PR_result, practical: PR_practical, cert: PR_cert, tasks: PR_tasks, subjects: PR_subjects, parent: PR_parent, level: PR_level, rw: PR_rwList };
