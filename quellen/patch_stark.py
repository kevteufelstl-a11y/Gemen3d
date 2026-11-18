# Starke Monster (18.11.2026): Horror-Monster und Kristall-Drache (grab3d.com, CC0).
# Modelle aus GLB verkleinert (z2_werkzeuge/monster/conv_glb.py): ca. 6000/7000 Dreiecke, Texturen 512 px.
# Bewegungen (Stehen, Laufen, Angriff) sind rechnerisch vorgebacken - gleiches Format wie Imp/Puglin.
# 3-mal so stark wie die normalen Monster: 3-fache Lebenspunkte und 3-facher Schaden.
# Zone 1: 20 Stueck (fest). Zone 2: 100 Stueck, nur wenn Zone 2 fuer den Spieler gebaut und freigeschaltet ist.
HOR = open(D + '/monster_horror.json', encoding='utf8').read().strip()
DRA = open(D + '/monster_drache.json', encoding='utf8').read().strip()
a = s.find('  const MONJ = ')
b = s.find(';\n  function Qu(i, t, e, n, s = true) {', a)
if a < 0 or b < 0: print('FEHLER Stark-MONJ'); sys.exit(1)
s = s[:b] + ';\n  MONJ.Horror = ' + HOR + ';\n  MONJ.Drache = ' + DRA + s[b:]; n_ok += 1
rep('for (const nm of ["Imp", "Puglin"]) {', 'for (const nm of ["Imp", "Puglin", "Horror", "Drache"]) {', 'Stark-Laden')
rep('    Ei.pug3 = EIN("Puglin", 3, 3.5, 4.2, 26, 3.7, 14);\n',
    '    Ei.pug3 = EIN("Puglin", 3, 3.5, 4.2, 26, 3.7, 14);\n'
    '    Ei.horror = EIN("Horror", 1, 4.6, 4.6, 40, 4.2, 45);\n'
    '    Ei.drache = EIN("Drache", 1, 5.4, 4.2, 42, 5.2, 48);\n'
    '    Ei.horror.strong = Ei.drache.strong = true;\n'
    '    for (const k2 of ["Horror1", "Horror2", "Horror3", "Drache1", "Drache2", "Drache3"]) MON.mat[k2].side = 2;\n', 'Stark-Typen')
rep('    let v = { imp1: 9, imp2: 8, imp3: 8, pug1: 8, pug2: 7, pug3: 7 };\n    for (let U in v) for (let M = 0; M < v[U]; M++) p(U);\n',
    '    let v = { imp1: 9, imp2: 8, imp3: 8, pug1: 8, pug2: 7, pug3: 7, horror: 10, drache: 10 };\n    for (let U in v) for (let M = 0; M < v[U]; M++) p(U);\n', 'Stark-Zone1')
rep('''    E.relocate = (U) => {
      if (U.guard) {''', '''    E.addZoneMon = (type, place) => {
      const C = p(type);
      C.zp = place, place(C), C.state = "wander";
      return C;
    };
    E.relocate = (U) => {
      if (U.zp) {
        U.zp(U), U.state = "wander";
        return;
      }
      if (U.guard) {''', 'Stark-Relocate')
rep('Math.hypot(q.x - U, q.z - M) < S && !q.guard && (x(q), q.state = "wander");',
    'Math.hypot(q.x - U, q.z - M) < S && !q.guard && (q.zp ? q.zp(q) : x(q), q.state = "wander");', 'Stark-Scatter')
rep('const HP = { spider: 30, blob: 40, stilt: 70, eye: 35, bat: 18 };', 'const HP = { spider: 30, blob: 40, stilt: 70, eye: 35, bat: 18, horror: 90, drache: 90 };', 'Stark-HP')
