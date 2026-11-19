# Begehbares Haus im Safe Place (Innenraum mit Urkunden-/Wochen-/Monatswand). Code in haus.js.
# 1) Hauptgebaeude des Hauses wird in eigene Geometrie-Sammler geschrieben (o.homeMain), damit man es beim Betreten ausblenden kann.
rep('r = He, a = new Ot(), o = new Ot(), c = new Ot(), l = new Ot(),',
    'r = He, a = new Ot(), o = new Ot(), c = new Ot(), HA = a, HO = o, HC = c, HA2 = new Ot(), HO2 = new Ot(), HC2 = new Ot(), l = new Ot(),', 'HS-Sammler')
rep('    m(R, w, 12, 8.4, T, 0, 6.2, 2, x, 1);\n', '    a = HA2, o = HO2, c = HC2;\n    m(R, w, 12, 8.4, T, 0, 6.2, 2, x, 1);\n', 'HS-Start')
rep('g.push({ type: "rect", cx: R, cz: w, w: 12.8, d: 9.2, rot: T });',
    'g.push({ type: "rect", cx: R, cz: w, w: 12.8, d: 9.2, rot: T }), i.houseDef = { cx: R, cz: w, rot: T }, a = HA, o = HO, c = HC;', 'HS-Ende')
rep('    $(a, n.wall), $(o, n.plain), $(c, n.roof),', '    i.homeMain = [$(HA2, n.wall), $(HO2, n.plain), $(HC2, n.roof)], $(a, n.wall), $(o, n.plain), $(c, n.roof),', 'HS-Meshes')
# 2) Tippen: erst das Haus (Aussen/Innen) fragen, dann Boden-Laufziel
rep('          let Lt = A(k.clientX, k.clientY);\n          if (Lt) {\n            let Yt = l.goTo(Lt[0], Lt[1]);',
    '          let Lt = window.__hsTap && window.__hsTap(k) ? null : A(k.clientX, k.clientY);\n          if (Lt) {\n            let Yt = l.goTo(Lt[0], Lt[1]);', 'HS-Tipp')
# 3) Einbau + Schleife
rep(anchor, open(D + '/haus.js', encoding='utf8').read() + ('    window.__dbg = (c) => eval(c);\n' if os.environ.get('HS_DEBUG') else '') + anchor, 'HS-Einbau')
rep('MP.update(Q, _t, V.dist), h.update(', 'MP.update(Q, _t, V.dist), HS.update(Q, _t), h.update(', 'HS-Schleife')
