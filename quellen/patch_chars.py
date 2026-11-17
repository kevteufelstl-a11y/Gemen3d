# Charakter-System (17.11.): MEIN CHARAKTER, Charakter-Packs (quellen/charpacks/*.json werden automatisch eingebunden)
import glob as _glob, json as _json
_cs = open(D + '/charsys.js', encoding='utf8').read()
_reg = ''
for _f in sorted(_glob.glob(D + '/charpacks/*.json')):
    _pk = _json.load(open(_f, encoding='utf8'))
    assert _pk.get('id') and _pk.get('version'), 'Pack ohne id/version: ' + _f
    _reg += '  CH_REG(' + _json.dumps(_pk, ensure_ascii=False, separators=(',', ':')) + ');\n'
assert _cs.count('/*CH_PACKS_HIER*/') == 1
_cs = _cs.replace('  /*CH_PACKS_HIER*/\n', _reg)
rep('  function Ci_old() {', _cs + '  function Ci_old() {', 'CH-Einbau')
# Spielfigur: Aussehen aus einem Pack, Standardfigur bleibt unverändert erhalten
rep('    }, x.root = n, x;\n  }\n  var Xu = [',
    '    }, x.__orig = s.children.slice(), x.setLook = (lk) => {\n      x.__ch && (s.remove(x.__ch.g), x.__ch.dispose());\n      try {\n        x.__ch = CH_build(lk);\n      } catch (e2) {\n        x.__ch = null;\n      }\n      for (let c2 of x.__orig) c2.visible = !x.__ch;\n      x.__ch && s.add(x.__ch.g), x.look = lk || null;\n    }, x.root = n, x;\n  }\n  var Xu = [', 'CH-Wu-setLook')
rep('    }, x.animate = (R, U) => {\n      let J = Math.sin(x.phase) * Math.min(1, x.speed / 3) * 0.7;\n',
    '    }, x.animate = (R, U) => {\n      let J = Math.sin(x.phase) * Math.min(1, x.speed / 3) * 0.7;\n      x.__ch && x.__ch.anim(R, x.speed, x.phase);\n', 'CH-Wu-anim')
rep('    let l = Wu(o, n);\n', '    let l = Wu(o, n);\n    window.__player = l, CH_apply();\n', 'CH-Spieler')
# Anmeldung / Abmeldung
rep('  function KO_childIn(prof, token, first, off) {\n', '  function KO_childIn(prof, token, first, off) {\n    setTimeout(CH_onLogin, 0);\n', 'CH-Login')
rep('  function KO_logout() {\n', '  function KO_logout() {\n    CH_onLogout();\n', 'CH-Logout')
# Menüpunkt MEIN CHARAKTER (Lernbuch-Menü), auch für den Admin beim Spielen
rep('K("div", { class: "ko-grid" }, K("button", { class: "qbtn go", onclick: () => RW_open() }',
    'K("div", { class: "ko-grid" }, K("button", { class: "qbtn go", onclick: CH_screen }, "\\u{1F9CD} MEIN CHARAKTER"), K("button", { class: "qbtn go", onclick: () => RW_open() }', 'CH-Menue')
rep('if (Ae.admin) return void u.append(K("button", { class: "qbtn go", onclick: Ci }, "\\u{1F6E1} Admin-Bereich"));',
    'if (Ae.admin) return void u.append(K("button", { class: "qbtn go", onclick: Ci }, "\\u{1F6E1} Admin-Bereich"), K("button", { class: "qbtn go", onclick: CH_screen }, "\\u{1F9CD} MEIN CHARAKTER"));', 'CH-Menue-Admin')
# Mehrspieler: andere sehen meine Figur (eigene Nachricht "look", alte Versionen ignorieren sie einfach)
rep('        const pl = Wu(o, n, { remote: true, jacket: S.jacket, arrowColor: S.arrow });\n',
    '        const pl = Wu(o, n, { remote: true, jacket: S.jacket, arrowColor: S.arrow });\n        MPL.looks.has(id) && pl.setLook(MPL.looks.get(id));\n', 'CH-MP-Rig')
rep('        onPlayers: () => { applySlots(); },', '        onPlayers: () => { applySlots(); setTimeout(() => MPL.send(), 400); },', 'CH-MP-Hallo')
rep('      });\n\n      // ---- Oberfläche: Raum ----\n',
    '''      });
      const MPL = { looks: new Map() };
      { const om = net._msg.bind(net);
        net._msg = (ev, p) => {
          if (ev !== "look") return om(ev, p);
          if (!p || !p.id || p.id === net.id) return;
          const lk = p.look && typeof p.look === "object" && JSON.stringify(p.look).length < 2000 ? p.look : null;
          if (JSON.stringify(MPL.looks.get(p.id) || null) === JSON.stringify(lk)) return;
          MPL.looks.set(p.id, lk); const rg = rigs.get(p.id); rg && rg.p.setLook(lk);
        }; }
      MPL.send = () => { net.inRoom && net.send("look", { id: net.id, look: window.__myLook || null }); };
      window.__mpLook = () => MPL.send();

      // ---- Oberfläche: Raum ----
''', 'CH-MP-Netz')
