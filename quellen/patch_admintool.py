# Admin-Werkzeug im Spiel (27.11.2026): admintool.js. Knopf 🛠 oben neben ⚙ (nur für den Admin).
# Reiter: Kräfte (unverwundbar, durch Wände, Tempo, Monster, Tag/Nacht, Waffen), Reisen (Hinbeamen per Tippen,
# Klassen, Tore, gemerkte Orte, Stationen), Bauen (Stationen setzen, versetzen, an/aus, umbenennen, löschen),
# Testen (Lernzeit, Tagesprüfung, Abschlussprüfung, Kind-Sicht, Infos), Menü (alle großen Admin-Bereiche).
rep('  function Ci_old() {', open(D + '/admintool.js', encoding='utf8').read() + '  function Ci_old() {', 'AT-Einbau')
# Schaden: unverwundbar
rep('f.safe || f.dead > 0 || f.peace || window.__mpOpen || (f.hp -= k', 'f.safe || f.dead > 0 || f.peace || window.__mpOpen || window.__admGod || (f.hp -= k', 'AT-Unverwundbar')
# Laufen: durch Wände (nur die eigene Figur, nicht die Figuren der Mitspieler)
rep('return i.walk.ok(R, w) ? (x.x = R, x.z = w, true)', 'return window.__admGhost && x === window.__player ? (x.x = R, x.z = w, true) : i.walk.ok(R, w) ? (x.x = R, x.z = w, true)', 'AT-Geist')
# Monster einfrieren
rep('h.update(Q, _t, l, V.tx, V.tz, V.dist, f.safe, E)', '(window.__admFreeze || h.update(Q, _t, l, V.tx, V.tz, V.dist, f.safe, E))', 'AT-Stopp')
# Spiel-Einstellungen (⚙) für das Werkzeug erreichbar machen
rep('      return { S: S2 };\n    })();', '      return window.__setm = { S: S2, apply };\n    })();', 'AT-Einstellungen')
# Tippen auf den Boden: Hinbeamen / Station setzen / versetzen
rep('          if (Lt) {\n            let Yt = l.goTo(Lt[0], Lt[1]);', '          Lt && window.__admTap && window.__admTap(Lt[0], Lt[1]) && (Lt = null, V.follow = true);\n          if (Lt) {\n            let Yt = l.goTo(Lt[0], Lt[1]);', 'AT-Tippen')
# Kind-Sicht: Klassen-Sperren gelten dann auch für den Admin
rep('if (Ae && Ae.admin || window.__klTestAlle) return true;', 'if (Ae && Ae.admin && !window.__admKid || window.__klTestAlle) return true;', 'AT-Kindsicht')
# Im Tipp-Modus hat das Werkzeug Vorrang vor dem grünen Haus (sonst öffnet sich die Belohnungs-Zentrale)
rep('let Lt = window.__hsTap && window.__hsTap(k) ? null : A(k.clientX, k.clientY);', 'let Lt = !(window.__admTapOn && window.__admTapOn()) && window.__hsTap && window.__hsTap(k) ? null : A(k.clientX, k.clientY);', 'AT-Tippen-Vorrang')
