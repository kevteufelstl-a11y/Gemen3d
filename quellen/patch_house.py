# Haus Hook 105 (Farben, Sockel, Zaun, Pavillon) und BMW mit Jaquesto-Folierung
rep('let x = [1, 0.96, 0.88], v = [0.95, 0.52, 0.5], E = [0.9, 0.52, 0.42], R = -6.5',
    'let x = [1, 0.96, 0.68], v = [0.24, 0.24, 0.27], E = [0.9, 0.52, 0.42], R = -6.5', 'Haus-Farben')
rep('    m(R, w, 12, 8.4, T, 0, 6.2, 2, x, 1);\n',
    '    m(R, w, 12, 8.4, T, 0, 6.2, 2, x, 1);\n    o.box(R, 0.35, w, 12.06, 0.7, 8.46, T, [0.05, 0.05, 0.06], 1);\n', 'Haus-Sockel')

_a = s.index("      tt(0, 0.62, 0, 4.5, 0.82, 1.9, [0.42, 0.14, 0.7])")
_e = "tt(0.2, 0.62, z * 0.97, 3, 0.07, 0.03, [0.5, 1, 0.35], h);\n"
_b = s.index(_e, _a) + len(_e)
OLD_CAR = s[_a:_b]
NEW_CAR = r'''      tt(0, 0.6, 0, 4.5, 0.62, 1.85, [0.93, 0.93, 0.95]);
      tt(-0.45, 1.1, 0, 2.0, 0.46, 1.5, [0.04, 0.05, 0.07], f);
      tt(-0.45, 1.35, 0, 1.9, 0.06, 1.46, [0.95, 0.95, 0.97]);
      for (let z of [-1.4, 1.4]) for (let D of [-0.9, 0.9]) {
        tt(z, 0.34, D, 0.76, 0.68, 0.26, [0.03, 0.03, 0.03]);
        tt(z, 0.3, D * 1.07, 0.26, 0.2, 0.04, [0.9, 0.05, 0.05]);
      }
      tt(-2.1, 1.0, 0, 0.4, 0.06, 1.7, [0.04, 0.04, 0.05]);
      for (let D of [-0.55, 0.55]) tt(-2.0, 0.85, D, 0.1, 0.3, 0.06, [0.04, 0.04, 0.05]);
      tt(2.26, 0.6, 0, 0.05, 0.22, 0.9, [0.03, 0.03, 0.04]);
      for (let D of [-0.62, 0.62]) tt(2.26, 0.8, D, 0.05, 0.1, 0.42, [0.95, 0.97, 1], f);
      for (let D of [-0.66, 0.66]) tt(-2.26, 0.8, D, 0.05, 0.12, 0.46, [0.9, 0.05, 0.05], f);
      tt(1.5, 0.915, 0.16, 1.5, 0.02, 0.2, [0.4, 1, 0.1]);
      tt(1.2, 0.915, -0.2, 1.3, 0.02, 0.16, [0.55, 0.12, 0.85]);
      tt(0, 0.12, 0, 4.4, 0.06, 1.85, [0.4, 1, 0.3], h);
      for (let z of [-1, 1]) tt(0.2, 0.62, z * 0.97, 3, 0.07, 0.03, [0.5, 1, 0.35], h);
      {
        const cv = ji(1800, 250), cx = cv.getContext("2d"), rnd = me(4242);
        cx.fillStyle = "#f0f0f4"; cx.fillRect(0, 0, 1800, 250);
        const cols = ["#08080e", "#7a1fd1", "#52ff1a", "#08080e", "#9b30ff", "#08080e", "#f0f0f4"];
        for (let k = 0; k < 90; k++) {
          const px = rnd() * 1900 - 50, py = 20 + rnd() * 230, pw = 80 + rnd() * 300, ph = 8 + rnd() * 40, sk = 30 + rnd() * 90;
          cx.fillStyle = cols[Math.floor(rnd() * cols.length)];
          cx.beginPath(); cx.moveTo(px, py); cx.lineTo(px + pw, py - sk); cx.lineTo(px + pw + 36, py - sk + ph); cx.lineTo(px + 24, py + ph); cx.closePath(); cx.fill();
        }
        cx.fillStyle = "rgba(8,8,14,0.82)";
        cx.beginPath(); cx.moveTo(380, 60); cx.lineTo(1470, 40); cx.lineTo(1440, 215); cx.lineTo(350, 225); cx.closePath(); cx.fill();
        cx.textAlign = "center"; cx.textBaseline = "middle";
        cx.font = 'italic 900 130px Impact, "Arial Black", sans-serif';
        cx.lineWidth = 10; cx.strokeStyle = "#101010"; cx.strokeText("JAQUESTO", 905, 118);
        cx.fillStyle = "#58ff1a"; cx.fillText("JAQUESTO", 905, 118);
        cx.font = 'italic 700 34px Arial, sans-serif'; cx.fillStyle = "#ffffff"; cx.fillText("MUSIC WITHOUT LIMITS", 905, 192);
        const tex = Qi(cv, { repeat: false, aniso: 4 }), pm = new ae({ map: tex, roughness: 0.35, metalness: 0.1 });
        for (const sd of [-1, 1]) {
          const P2 = X(0, sd * 0.945), pl = new zt(new Ke(4.4, 0.6), pm);
          pl.position.set(P2[0], 0.6, P2[1]), pl.rotation.y = -0.55 + (sd < 0 ? Math.PI : 0), e.add(pl);
        }
      }
'''
rep(OLD_CAR, NEW_CAR, 'BMW')

FENCE = r'''    {
      const W2 = _(R, w, T), gc = [0.07, 0.24, 0.17];
      const seg = (a2, b2) => {
        const n2 = Math.max(1, Math.round(b2 - a2)), ln2 = (b2 - a2) / n2;
        for (let k = 0; k < n2; k++) {
          const P3 = W2(a2 + ln2 * (k + 0.5), 7.4);
          o.box(P3[0], 0.9, P3[1], ln2, 1.8, 0.1, T, gc, 1), o.box(P3[0], 1.83, P3[1], ln2, 0.05, 0.12, T, [0.12, 0.3, 0.2], 1);
        }
        const mm = W2((a2 + b2) / 2, 7.4);
        g.push({ type: "rect", cx: mm[0], cz: mm[1], w: b2 - a2, d: 0.5, rot: T });
      };
      seg(-6.2, 1.2), seg(3.6, 6.0);
      const PV = W2(-2.8, 5.6);
      for (const [dx, dz] of [[-1.3, -1.3], [1.3, -1.3], [1.3, 1.3], [-1.3, 1.3]]) {
        const Q2 = W2(-2.8 + dx, 5.6 + dz);
        o.box(Q2[0], 1.1, Q2[1], 0.1, 2.2, 0.1, T, [0.12, 0.12, 0.12], 1);
      }
      o.box(PV[0], 2.3, PV[1], 3.2, 0.12, 3.2, T, [0.55, 0.53, 0.48], 1);
      o.box(PV[0], 2.3, PV[1], 3.2, 0.12, 3.2, T + Math.PI / 4, [0.55, 0.53, 0.48], 1);
      o.box(PV[0], 2.55, PV[1], 1.2, 0.3, 1.2, T + Math.PI / 4, [0.5, 0.48, 0.44], 1);
    }
'''
ANCH2 = '      g.push({ type: "rect", cx: 4.4, cz: 4.4, w: 4.8, d: 2.2, rot: -0.55 });\n    }\n'
rep(ANCH2, ANCH2 + FENCE, 'Zaun-Pavillon')
