# Lernspiel-Erweiterung 15.11.: Spieler-Auswahl, Lernzeit-Leiste, Tagesprüfung,
# Diktat/Abschreiben mit Elternkontrolle, neue Urkunde. Code steht in lernspiel.js.
# Mathe-Aufgaben und der Mathe-Endboss bleiben unverändert.

# Neue Funktionen in den Spiel-Bereich einsetzen (vor der Urkunde)
rep('  function Pr(i) {\n    ra = false, Cr(false);',
    open(D + '/lernspiel.js', encoding='utf8').read().replace('__UK_BG__', 'data:image/jpeg;base64,' + __import__('base64').b64encode(open(D + '/urkunde_bg.jpg','rb').read()).decode()) +
    '  function Pr(i) {\n    if (!Li().ex) return TP_offer(null, i);\n    ra = false, Cr(false);', 'LS-Einbau')

# Urkunde: neues Layout, PDF über Teilen-Menü (Speichern/Drucken)
rep('    let e = l_(t);\n', '    let e = UK_draw(t);\n', 'LS-Urkunde')
rep(r'''      let s = URL.createObjectURL(h_(e)), r = K("a", { href: s, download: "Urkunde-" + Tr() + ".pdf" });
      document.body.append(r), r.click(), r.remove(), setTimeout(() => URL.revokeObjectURL(s), 1e4);''',
    r'''      UK_save(h_(e), "Urkunde-" + (Ae && Ae.name || "Milo") + "-" + Tr() + ".pdf");''', 'LS-PDF')
rep(r'"\u2B07 PDF herunterladen"', r'"\u2B07 PDF speichern / drucken"', 'LS-PDF-Text')

# Antworten: Zeit pro Aufgabe + heute falsch beantwortete merken; Prüfungsantworten zählen nicht als Lernaufgabe
rep('  function hf(i, t) {\n    let e = ye.p[i]', '  function hf(i, t, nd) {\n    let e = ye.p[i]', 'LS-hf-Kopf')
rep('    if (n && Ae) {\n      let s = Li(), r = s.s[n.fi]', '    if (n && Ae && !nd) {\n      let s = Li(), r = s.s[n.fi]', 'LS-hf-nd')
rep('      r.n++, t && r.r++, r.a[n.bn] = (r.a[n.bn] || 0) + 1;\n',
    '      r.n++, t && r.r++, r.a[n.bn] = (r.a[n.bn] || 0) + 1, LZ_ans(s, n, t);\n', 'LS-hf-zeit')
rep('      let n = n_(t), s = ln();\n      Cr(true);', '      let n = n_(t), s = ln();\n      Cr(true), window.__qStart = Li().sec, window.__curFi = n.fi;', 'LS-Frage-Start')

# Nach 15 Minuten: Tagesprüfung statt direkt Urkunde
rep('      if (ra) return Pr(() => e());', '      if (ra) return TP_offer(i, () => e());', 'LS-15min')
rep(r'Zs("\u{1F389} " + je.dailyMinutes + " Minuten geschafft! Gleich gibt es deine Urkunde.")',
    r'Zs("\u{1F389} " + je.dailyMinutes + " Minuten geschafft! Jetzt kommt die Tagespr\xFCfung.")', 'LS-Toast')

# Lernzeit: Zeit pro Fach, längere Ruhezeit beim Schreiben auf Papier
rep('      e.sec += t, s < Ai()', '      e.sec += t, LZ_tick(e, t), s < Ai()', 'LS-Tick')
rep('if ((i - Js) / 1e3 < je.idleSec) {', 'if ((i - Js) / 1e3 < (window.__idleSec || je.idleSec)) {', 'LS-Idle')
rep('  function aa() {\n    if (!Ae) return;', '  function aa() {\n    LZ_bar();\n    if (!Ae) return;', 'LS-Leiste')

# Tagesdaten vom Server: neue Felder (Diktate, Prüfung, Zeiten) mit zusammenführen
rep('!s.reward && n.reward && (s.reward = n.reward);', '!s.reward && n.reward && (s.reward = n.reward), LZ_merge(s, n);', 'LS-Merge')

# Anmeldung: neue Spieler-Auswahl beim Start (alte Eingabemaske bleibt für "Eltern"/Admin)
rep('  function cl(i, t) {', '  function cl_old(i, t) {', 'LS-cl-alt')
rep('e.append(K("div", { class: "qbox" }, K("h2", {}, "Milos Lern-Welt"), K("p", { class: "qsub" }, "Wer spielt?"), n, s, r,',
    'e.append(K("div", { class: "qbox splogin" }, K("h2", {}, "\\u{1F480}LERNZONE ZERO\\u{1F480}"), K("p", { class: "qsub" }, "Wer spielt?"), n, s, r,', 'LS-cl-alt-box')
rep('    if (!i) {\n      Ae = null, cl();\n      return;\n    }', '    {\n      Ae = null, cl();\n      return;\n    }', 'LS-immer-Auswahl')

# Station und Lernbuch: Diktat, Abschreiben, offene Kontrollen, Tagesprüfung/Urkunde
rep(r'    Li().sec >= Ai() && o.append(K("button", { class: "qbtn", onclick: () => Pr(() => Ar(i)) }, "\u{1F3C5} Urkunde von heute")), t.append(o);',
    '    LZ_station(i, o), t.append(o);', 'LS-Station')
rep(r'l && u.append(K("button", { class: "qbtn go", onclick: () => Pr(Ri) }, "\u{1F3C5} Urkunde von heute")), ',
    'LZ_book(u), ', 'LS-Lernbuch')

# Admin: Urkunden-Vorlage hochladen
rep(r'K("button", { class: "qbtn big", onclick: g_ }, "\u{1F381} Belohnungen, Noten, Schule")',
    r'K("button", { class: "qbtn big", onclick: g_ }, "\u{1F381} Belohnungen, Noten, Schule"), K("button", { class: "qbtn big", onclick: UK_tplAdmin }, "\u{1F5BC} Urkunden-Vorlage")', 'LS-Admin')

# PDF-Seite im Seitenverhältnis der neuen Urkunde (1152x2064) statt A4
rep('/MediaBox [0 0 595 842]', '/MediaBox [0 0 595 1066]', 'LS-PDF-Seite')
rep('"q 595 0 0 842 0 0 cm /Im0 Do Q"', '"q 595 0 0 1066 0 0 cm /Im0 Do Q"', 'LS-PDF-Bild')

# Lernschild: leerer Schild macht Monster schneller, aufmerksamer und stärker; Waffen schwächer
rep('let ot = 0, Et = false, O = 1;', 'let ot = 0, Et = false, O = window.__shM || 1;', 'LS-Schild-Tempo')
rep('rt < gt.sense', 'rt < gt.sense * (window.__shS || 1)', 'LS-Schild-Sicht')
rep('$(gt.dmg, C)', '$(gt.dmg * (window.__shD || 1), C)', 'LS-Schild-Schaden')
rep('api.hit(best, w2.dmg, "player");', 'api.hit(best, w2.dmg * (window.__shW || 1), "player");', 'LS-Schild-Waffe')
rep('wi && (wi.style.display = "none"), window.__quizOpen = false,', 'wi && (wi.style.display = "none"), window.__quizOpen = false, window.__curFi = null,', 'LS-Schild-Quizende')
