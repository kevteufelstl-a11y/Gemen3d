# Aufgeräumte Bedienung (hud.js): ein Entfernungs-Knopf, Ziel-Menü, Stationsnamen nur bei Bedarf,
# Boden-Navigation entlang der vorhandenen Wegfindung, Vollbild ohne überflüssige Knöpfe, eigene Handy-Anordnung.
rep('    function at() {\n      t.setPixelRatio(e)', open(D + '/hud.js', encoding='utf8').read() + '    function at() {\n      t.setPixelRatio(e)', 'UI-Einbau')
rep('Lt.style.display = Yt ? "none" : "flex", Lt.style.transform', 'Lt.style.display = Yt || !HUD.pin(k, Lt) ? "none" : "flex", Lt.style.transform', 'UI-Pins')
rep(', Lt.classList.toggle("small", V.dist > 200);', ';', 'UI-Pins-klein')
rep('      let k = document.documentElement;\n      document.fullscreenElement ? document.exitFullscreen() : (k.requestFullscreen || k.webkitRequestFullscreen || (() => {\n      })).call(k);', '      HUD.full();', 'UI-Vollbild')
rep('        window.__tp ? window.__tpGo(Pt) : l.goTo(Pt.wx, Pt.wz);', '        window.__tp ? window.__tpGo(Pt) : l.goTo(Pt.wx, Pt.wz), HUD.nav.st = Pt;', 'UI-Hingehen')
rep('            let Yt = l.goTo(Lt[0], Lt[1]);', '            let Yt = l.goTo(Lt[0], Lt[1]);\n            HUD.nav.st = null;', 'UI-Tippziel')
rep('HS.update(Q, _t), ', 'HS.update(Q, _t), HUD.navUpdate(_t), ', 'UI-Schleife')
rep('"\\u{1F381} Meine Belohnungen", RW_badge()),', '"\\u{1F381} Meine Belohnungen", RW_badge()), K("button", { class: "qbtn go", onclick: () => UKX.archive() }, "\\u{1F4DC} Meine Urkunden"),', 'UI-Urkunden-Menue')
# Aufgaben-Knopf: Der Laufweg endet oft vor dem Gebäude (bis ca. 20 m vom Mittelpunkt) -> größerer Freigabe-Abstand
rep('    let kt = 16;\n', '    let kt = 26;\n', 'UI-Stationsabstand')
