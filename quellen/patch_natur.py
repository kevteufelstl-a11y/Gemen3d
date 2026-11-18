# Natur (18.11.2026): Baeume, Bueschen, Gras, Blumen, Steine, Pilze aus dem
# "Stylized Nature MegaKit" (Quaternius, CC0). Daten: natur.json (erzeugt von z2_werkzeuge/natur/conv.py).
NATUR_SCRIPT = 'window.GEMEN_NATUR=' + open(D + '/natur.json', encoding='utf8').read().strip() + ';'
rep('  async function Du(i, t, e) {', open(D + '/natur.js', encoding='utf8').read().replace('__NATUR_JSON__', 'window.GEMEN_NATUR') + '  async function Du(i, t, e) {', 'NAT-Einbau')
# Alte Klumpen-Baeume ersetzen (Positionen/Dichte bleiben gleich)
a = s.index('    let d = es(i.root, r, o, l, 100, { shadow: e.shadows, receive: false }), g = es(i.root, a, o, l, 100)')
b = s.index('    }, i.treeLOD(0, 0);\n', a) + len('    }, i.treeLOD(0, 0);\n')
s = s[:a] + '    i.treeCount = l.length, NAT_world(i, t, e, l);\n' + s[b:]
n_ok += 1
# Kamera-Abstand mitgeben (fuer die Detailstufen)
rep('Ut <= 0 && (o.treeLOD(V.tx, V.tz), Ut = 0.4)', 'Ut <= 0 && (o.treeLOD(V.tx, V.tz, C.dist), Ut = 0.4)', 'NAT-LOD-Aufruf')
rep('Et(1e-3), o.treeLOD(V.tx, V.tz), Ct()', 'Et(1e-3), o.treeLOD(V.tx, V.tz, C.dist), Ct()', 'NAT-LOD-Aufruf2')
rep('''    lod && o2.treeLOD && (ZN.o.treeLOD = (x, y) => {
      lod(x, y), o2.treeLOD(x, y);''', '''    lod && o2.treeLOD && (ZN.o.treeLOD = (x, y, c) => {
      lod(x, y, c), o2.treeLOD(x, y, c);''', 'NAT-Zonenkette')
