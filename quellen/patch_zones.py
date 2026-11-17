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
rep('    window.__api = { diag() {', '    ZN_init(o, n, Be);\n    window.__api = { diag() {', 'ZN-Start')
