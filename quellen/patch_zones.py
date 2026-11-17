# Zonen (17.11.2026): Zone 2 (Neumuehle + Aa-Wiesen) als eigene Einheit neben Zone 1.
# Zone 1 (GEMEN_DATA) bleibt unveraendert. Der vorhandene Kartenbauer Du() wird fuer weitere Zonen
# ein zweites Mal aufgerufen; die Schalter "i.zoneId" verhindern dabei alles, was nur zu Zone 1 gehoert.
import json
ZD = D + '/zonen/'
reg = json.load(open(ZD + 'registry.json', encoding='utf8'))
for z in reg['zones']:
    g = z.get('geo', {})
    if g.get('file'):
        z['geoData'] = json.load(open(ZD + g['file'], encoding='utf8'))
    o = z.get('optik', {})
    if o.get('file'):
        z['optikData'] = json.load(open(ZD + o['file'], encoding='utf8'))
ZONE_SCRIPT = 'window.GEMEN_ZONES=' + json.dumps(reg, ensure_ascii=False, separators=(',', ':')) + ';'

# Modul einbauen (gleicher Gueltigkeitsbereich wie der Kartenbauer)
rep('  async function Du(i, t, e) {', open(D + '/zonen.js', encoding='utf8').read() + '  async function Du(i, t, e) {', 'ZN-Einbau')
# Boden nur einmal (Zone 1 liefert die grosse Bodenplatte)
rep('    {\n      let D = (o.bounds.x0 + o.bounds.x1) / 2, G = (o.bounds.z0 + o.bounds.z1) / 2, y = new Ke(4e3, 4e3);',
    '    if (!i.zoneId) {\n      let D = (o.bounds.x0 + o.bounds.x1) / 2, G = (o.bounds.z0 + o.bounds.z1) / 2, y = new Ke(4e3, 4e3);', 'ZN-Boden')
# Kit-Haus, Burg und Kirche gehoeren zu Zone 1
rep('    const kdec = (b, C) => {', '    i.zoneId && (KIT_IDX = -1);\n    const kdec = (b, C) => {', 'ZN-Kit')
rep('      lt < 62 && N > 600 ? (Pt = "castle"', '      !i.zoneId && lt < 62 && N > 600 ? (Pt = "castle"', 'ZN-Burg')
rep(' : St < 22 && N > 120 && (Pt = "church"', ' : !i.zoneId && St < 22 && N > 120 && (Pt = "church"', 'ZN-Kirche')
# Stationen nur aus Zone 1
rep('    let Et = Sr[0];\n    Et.px = [s, r];\n    for (let D of Sr) {',
    '    let Et = Sr[0];\n    i.zoneId || (Et.px = [s, r]);\n    if (!i.zoneId) for (let D of Sr) {', 'ZN-Stationen')
# Baeume: kein Waldring um weitere Zonen; Waldring von Zone 1 nicht in andere Zonen
rep('        R = M < 55 * q + 10 ? 0.38 : 0;',
    '        R = i.zoneId || window.__zoneBlockRing && window.__zoneBlockRing(x, v) ? 0 : M < 55 * q + 10 ? 0.38 : 0;', 'ZN-Waldring')
# Zonen starten, sobald die Welt fertig ist
rep('    window.__api = { diag() {', '    ZN_init(o, n, Be, h);\n    window.__api = { diag() {', 'ZN-Start')

# ---------------- Monster-Waechter an der Zonengrenze (17.11. abends) ----------------
# Waechter sind normale Monster mit Patrouillenstrecke. Sie bleiben an der Grenze, werden nicht
# umverteilt oder durch die Monster-Anzahl entfernt und greifen nur an, wenn ein nicht freigeschalteter
# Spieler an die Grenze kommt. Dann ist jeder Treffer toedlich.
rep('    let E = { list: h, enabled: s, threat: 0, chasers: 0, root: r };',
    '''    let E = { list: h, enabled: s, threat: 0, chasers: 0, root: r };
    E.guards = [];
    E.addGuard = (type, ax, az, bx, bz) => {
      const C = p(type);
      C.guard = { ax, az, bx, bz, f: a() < 0.5 };
      const t0 = a();
      C.x = ax + (bx - ax) * t0, C.z = az + (bz - az) * t0, C.wx = C.x, C.wz = C.z, C.y = 0, C.state = "wander";
      return E.guards.push(C), C;
    };''', 'ZN-Waechter-Anlegen')
rep('    E.relocate = (U) => {\n      x(U);',
    '    E.relocate = (U) => {\n      if (U.guard) {\n        U.x = U.guard.ax, U.z = U.guard.az, U.wx = U.x, U.wz = U.z, U.state = "wander";\n        return;\n      }\n      x(U);', 'ZN-Waechter-Rueckkehr')
s = s.replace('let have = h.filter((c2) => c2.type === k)', 'let have = h.filter((c2) => c2.type === k && !c2.guard)'); n_ok += 1
rep('Math.hypot(q.x - U, q.z - M) < S && (x(q), q.state = "wander");', 'Math.hypot(q.x - U, q.z - M) < S && !q.guard && (x(q), q.state = "wander");', 'ZN-Waechter-Streuen')
rep('wt = !PH && !E.peace && !E.puppet && rt < gt.sense * (window.__shS || 1)',
    'wt = C.guard ? !E.puppet && !!(window.__zoneGuardHot && window.__zoneGuardHot(C, PT)) : !PH && !E.peace && !E.puppet && rt < gt.sense * (window.__shS || 1)', 'ZN-Waechter-Angriff')
rep('            let z = a() * 6.28, D = 5 + a() * 14;\n            C.wx = C.x + Math.cos(z) * D, C.wz = C.z + Math.sin(z) * D, C.wanderT = 3 + a() * 5, C.idle = E.puppet ? true : a() < 0.3;',
    '            let z = a() * 6.28, D = 5 + a() * 14;\n            if (C.guard) C.guard.f = !C.guard.f, C.wx = C.guard.f ? C.guard.bx : C.guard.ax, C.wz = C.guard.f ? C.guard.bz : C.guard.az, C.wanderT = 3 + a() * 3, C.idle = false;\n            else C.wx = C.x + Math.cos(z) * D, C.wz = C.z + Math.sin(z) * D, C.wanderT = 3 + a() * 5, C.idle = E.puppet ? true : a() < 0.3;', 'ZN-Waechter-Patrouille')
rep('$ && $(gt.dmg * (window.__shD || 1), C)', '$ && $(C.guard ? 9999 : gt.dmg * (window.__shD || 1), C)', 'ZN-Waechter-toedlich')
# Schaden am Spieler fuer die Feuerbaelle der Waechter erreichbar machen
rep('MP.update(Q, _t, V.dist), h.update(Q, _t, l, V.tx, V.tz, V.dist, f.safe, E)', 'window.__hurtPlayer = E, MP.update(Q, _t, V.dist), h.update(Q, _t, l, V.tx, V.tz, V.dist, f.safe, E)', 'ZN-Fernangriff')
# Waechter rennen bei der Jagd deutlich schneller als normale Monster
rep('(rt > tt * 0.7 ? (ot = gt.speed * O, T(C, PT.x, PT.z, ot, U) || (ot = 0.3))', '(rt > tt * 0.7 ? (ot = gt.speed * (C.guard ? window.__zoneGuardSpeed || 2.6 : O), T(C, PT.x, PT.z, ot, U) || (ot = 0.3))', 'ZN-Waechter-Tempo')
