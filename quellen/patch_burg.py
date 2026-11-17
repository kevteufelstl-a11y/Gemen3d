# Burg Gemen: ersetzt die alte Klotz-Burg (grober Umriss + 4 Ecktuerme) durch das detaillierte
# Modell aus burg.js (Herrenhaus, Rundturm mit Kegeldach, Turm mit Zwiebelhaube, Vorburg mit
# Treppengiebel, Ringmauer, Torbogen, Bruecke). Wird nach patch_kit.py ausgefuehrt.
BURG_SRC = open(D + '/burg.js', encoding='utf8').read().split("if (typeof module")[0]

BURG_CODE = BURG_SRC + '''
    const BURG_PLACE = () => {
      const BP = a(899, 673);
      const BG = burgGemenBuild(Ot, me(4242), BP[0], BP[1], 33 * Math.PI / 180);
      const tc = $c(512, [228, 224, 216], 0.1, 91, [8, 16, 32, 64]), tg = tc.getContext("2d"), tr = me(77);
      tg.strokeStyle = "rgba(70,55,40,.32)", tg.lineWidth = 2;
      for (let ry = 0; ry < 512; ry += 64) {
        tg.beginPath(), tg.moveTo(0, ry), tg.lineTo(512, ry), tg.stroke();
        for (let rx = (ry / 64 % 2) * 64 + tr() * 30; rx < 512; rx += 110 + tr() * 70) tg.beginPath(), tg.moveTo(rx, ry), tg.lineTo(rx, ry + 64), tg.stroke();
      }
      U.burgStone = new ae({ map: Qi(tc), vertexColors: true, roughness: 0.95 });
      U.burgStone.envMapIntensity = 0.35;
      S(BG.stone.toGeometry(), U.burgStone, { shadow: true, receive: true });
      S(BG.plain.toGeometry(), U.plain, { shadow: true, receive: true });
      S(BG.roof.toGeometry(), U.roof, { shadow: true, receive: true });
      o.burgPos = BP;
    };
'''

anchor = '    let dt = i.buildings, ot = 0, bt = Sr.filter((D) => D.px).map((D) => D.px);\n'
rep(anchor, BURG_CODE + anchor, 'Burg-Code')
# Nur das grosse Burg-Gebaeude ist "Burg"; die kleinen Nachbarflaechen werden normale Haeuser
rep('lt < 62 ? (Pt = "castle"', 'lt < 62 && N > 600 ? (Pt = "castle"', 'Burg-Erkennung')
# Normale Fensterwaende nicht fuer die Burg zeichnen
rep(': rt(y, I, vt, j, Mt, A, { uOff: $t, vOff: ee }), Pt === "castle") {',
    ': Pt === "castle" ? 0 : rt(y, I, vt, j, Mt, A, { uOff: $t, vOff: ee }), Pt === "castle") {', 'Burg-keine-Waende')
# Alte Zinnen und Flachdach entfernen, dafuer neues Modell einsetzen
a0 = s.find('for (let at of Ct) ht.tri([y[at[0]][0], vt + 0.02, y[at[0]][1]], [y[at[1]][0], vt + 0.02, y[at[1]][1]], [y[at[2]][0], vt + 0.02, y[at[2]][1]], [0, 0], [1, 0], [0, 1], [0.32, 0.31, 0.3], br);')
b0 = s.find('        C.push(y);\n', a0)
if a0 < 0 or b0 < 0 or s.count('[0.32, 0.31, 0.3], br);') != 1:
    print('FEHLER Burg-Zinnen', a0, b0); sys.exit(1)
s = s[:a0] + 'BURG_PLACE();\n' + s[b0 + len('        C.push(y);\n'):]
n_ok += 1
