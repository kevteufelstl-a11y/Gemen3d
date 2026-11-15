# Konten-System (15.11.): Admin / Eltern / Kinder, Sitzungen, Freunde, Admin-Verwaltung. Code in konten.js.
rep('  function Ci() {', open(D + '/konten.js', encoding='utf8').read() + '  function Ci_old() {', 'KO-Einbau')
# Server-Aufrufe mit Sitzung statt Name+PIN
rep('Object.assign({ action: i, name: Ae.name, pin: Ae.pin }, t || {})', 'Object.assign({ action: i, token: Ae.token }, t || {})', 'KO-ss')
# Elternpasswort: wird beim Server gegen die eigene Familie geprüft
rep('inputmode: "numeric", placeholder: "Eltern-Passwort", maxlength: 8', 'placeholder: "Eltern-Passwort"', 'KO-Mf-Feld')
rep('vf({ action: "parentCheck", pin: e.value.trim() })', 'ss("parentCheck", { parentPassword: e.value })', 'KO-Mf')
rep('yf = () => Ae && Ae.name === "Admin"', 'yf = () => !!(Ae && Ae.admin)', 'KO-yf')
rep('onclick: () => Mf(bf) }', 'onclick: () => KO_parentLogin(Ri) }', 'KO-Elternknopf')
rep('Rr(true), Ae = null, cl();', 'Rr(true), KO_logout(), Ae = null, cl();', 'KO-Abmelden')
# Bestätigungen und Lerneinstellungen vom Server übernehmen
rep('      Pi(), qs();\n    } catch {\n    }\n  }\n  setInterval(() => Rr(false), je.syncMs);', '      Pi(), qs(), KO_loaded(i.j);\n    } catch {\n    }\n  }\n  setInterval(() => Rr(false), je.syncMs);', 'KO-uf')
rep('ul && ul(Ne), qs();', 'ul && ul(Ne), qs(), KO_apply();', 'KO-ml')
# Stationen: aus/an, Freischaltung, Farbe
rep('"exam" in e && (n.exam = !!e.exam), n.subj.length || delete xn[t];', '"exam" in e && (n.exam = !!e.exam), n.subj.length || delete xn[t], e.off && delete xn[t];', 'KO-st-aus')
rep('for (let t of Ne.extra) t.subj && t.subj.length && (xn[t.id]', 'for (let t of Ne.extra) !t.off && t.subj && t.subj.length && (xn[t.id]', 'KO-extra-aus')
rep('for (let Q of k.extra || []) o.stations.push', 'for (let Q of (k.extra || []).filter((Q) => !Q.off)) o.stations.push', 'KO-extra-karte')
rep('wz: Q.wz != null ? Q.wz : Q.z, custom: true }', 'wz: Q.wz != null ? Q.wz : Q.z, custom: true, color: Q.color }', 'KO-farbe1')
rep('new se({ color: 16765773, transparent: true, opacity: 0.35', 'new se({ color: Q.color ? parseInt(String(Q.color).slice(1), 16) : 16765773, transparent: true, opacity: 0.35', 'KO-farbe2')
rep('  function pf(i) {\n    let t = xn[i];\n    t && Ar(t);', '  function pf(i) {\n    let t = xn[i], lk;\n    t && (t.id = i, (lk = KO_stationLock(t)) ? KO_stop("\\u{1F512} " + t.title, lk) : Ar(t));', 'KO-Station-Sperre')
# Waffen aus der Admin-Verwaltung, Freischaltung auch über Events
rep('return W2.filter((w2) => all || n2 >= w2.need);', 'return W2.filter((w2) => !w2.off && (all || n2 >= w2.need || (window.__unl || []).includes(w2.n)));', 'KO-Waffen1')
rep('open: all || n2 >= w2.need,', 'open: !w2.off && (all || n2 >= w2.need || (window.__unl || []).includes(w2.n)),', 'KO-Waffen2')
s = s.replace('const W2 = [{ n: "Faust", ic: "\\u270A", dmg: 6', 'const W2 = window.__W2 = [{ n: "Faust", ic: "\\u270A", dmg: 6', 1); n_ok += 1
# Ablenkung: Eltern-Einstellung (aus / feste Stufe)
rep('let lvl = cp ? 2 : day.dl || 1', 'let lvl = cp ? 2 : +window.__distr || day.dl || 1', 'KO-Ablenkung-Stufe')
rep('  function dStart(box, cp) {\n    let day = cp || Li();', '  function dStart(box, cp) {\n    if (!cp && window.__distr === "aus") return;\n    let day = cp || Li();', 'KO-Ablenkung-aus')
# Lernen: Tagesgrenze, Pausen, gesperrte Fächer
rep('      if (ra) return TP_offer(i, () => e());', '      if (KO_block(i)) return;\n      if (!t.length) return KO_locked(i);\n      if (ra) return TP_offer(i, () => e());', 'KO-Lernen')
rep('sa = (i) => Xn.filter((t) => i.includes(t.fi))', 'sa = (i) => Xn.filter((t) => i.includes(t.fi) && KO_allowedQ(t))', 'KO-Fragen')
