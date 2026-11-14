# Haus Hook 105 (Farben, Sockel, Zaun, Pavillon) und BMW mit Jaquesto-Folierung
rep('let x = [1, 0.96, 0.88], v = [0.95, 0.52, 0.5], E = [0.9, 0.52, 0.42], R = -6.5',
    'let x = [1, 0.96, 0.68], v = [0.24, 0.24, 0.27], E = [0.9, 0.52, 0.42], R = -6.5', 'Haus-Farben')
rep('    m(R, w, 12, 8.4, T, 0, 6.2, 2, x, 1);\n',
    '    m(R, w, 12, 8.4, T, 0, 6.2, 2, x, 1);\n    o.box(R, 0.35, w, 12.06, 0.7, 8.46, T, [0.05, 0.05, 0.06], 1);\n', 'Haus-Sockel')

_a = s.index("      tt(0, 0.62, 0, 4.5, 0.82, 1.9, [0.42, 0.14, 0.7])")
_e = "tt(0.2, 0.62, z * 0.97, 3, 0.07, 0.03, [0.5, 1, 0.35], h);\n"
_b = s.index(_e, _a) + len(_e)
OLD_CAR = s[_a:_b]
NEW_CAR = r'''
      const ct0 = -0.55, cs = Math.cos(ct0), sn0 = Math.sin(ct0);
      const PW = (xl, y, zl) => { const q = X(xl, zl); return [q[0], y, q[1]]; };
      const NW = (lx, ny, lz) => [lx * cs + lz * sn0, ny, -lx * sn0 + lz * cs];
      const loft = (secs, colFn) => {
        for (const sd of [1, -1]) for (let i = 0; i < secs.length - 1; i++) {
          const A = secs[i], B = secs[i + 1];
          for (let j = 0; j < A.ring.length - 1; j++) {
            const a0 = A.ring[j], a1 = A.ring[j + 1], b0 = B.ring[j], b1 = B.ring[j + 1];
            const dw = a1[0] - a0[0], dy = a1[1] - a0[1], nl = Math.hypot(dw, dy) || 1;
            u.quad(PW(A.x, a0[1], sd * a0[0]), PW(B.x, b0[1], sd * b0[0]), PW(B.x, b1[1], sd * b1[0]), PW(A.x, a1[1], sd * a1[0]), [0, 0], [1, 0], [1, 1], [0, 1], colFn(j), NW(0, -dw / nl, sd * dy / nl));
          }
        }
        for (const [S, dir] of [[secs[0], -1], [secs[secs.length - 1], 1]]) for (let j = 0; j < S.ring.length - 1; j++) {
          const a0 = S.ring[j], a1 = S.ring[j + 1];
          u.quad(PW(S.x, a0[1], a0[0]), PW(S.x, a1[1], a1[0]), PW(S.x, a1[1], -a1[0]), PW(S.x, a0[1], -a0[0]), [0, 0], [1, 0], [1, 1], [0, 1], S.cap || colFn(j), NW(dir, 0, 0));
        }
      };
      const WH = [0.93, 0.93, 0.95], DK = [0.05, 0.05, 0.06], GL = [0.04, 0.05, 0.08];
      const bodyRing = (w, ysh, yb) => [[0, yb], [w * 0.86, yb], [w, yb + 0.14], [w, ysh - 0.05], [w * 0.9, ysh + 0.04], [w * 0.55, ysh + 0.09], [0, ysh + 0.1]];
      loft([[-2.25, 0.72, 0.78, 0.38], [-2.1, 0.84, 0.84, 0.3], [-1.5, 0.9, 0.86, 0.28], [-0.4, 0.92, 0.9, 0.28], [0.6, 0.92, 0.88, 0.28], [1.5, 0.88, 0.8, 0.29], [2.05, 0.8, 0.72, 0.32], [2.26, 0.66, 0.62, 0.38]].map(([x, w, ysh, yb]) => ({ x, ring: bodyRing(w, ysh, yb) })), (j) => j === 0 ? DK : WH);
      const cabRing = (wb, wt, yt) => [[0, 0.86], [wb, 0.86], [wt, yt - 0.04], [wt * 0.75, yt], [0, yt]];
      loft([[-1.5, 0.8, 0.66, 0.98], [-1.2, 0.8, 0.64, 1.2], [-0.6, 0.8, 0.62, 1.36], [0.1, 0.8, 0.62, 1.37], [0.6, 0.8, 0.66, 1.28], [1.05, 0.8, 0.72, 1.05], [1.2, 0.8, 0.76, 0.93]].map(([x, wb, wt, yt]) => ({ x, ring: cabRing(wb, wt, yt), cap: GL })), (j) => j === 0 ? DK : j === 1 ? GL : WH);
      const tire = new ae({ color: 0x0a0a0a, roughness: 0.8 }), rimM = new ae({ color: 0x1a1a1e, roughness: 0.35, metalness: 0.8 }), redM = new ae({ color: 0xcc1111, roughness: 0.5 });
      for (const wx of [-1.45, 1.45]) for (const sd of [-1, 1]) {
        const wp = X(wx, sd * 0.84);
        const tm = new zt(new sn(0.34, 0.34, 0.26, 24).rotateX(Math.PI / 2), tire);
        tm.position.set(wp[0], 0.34, wp[1]), tm.rotation.y = ct0, e.add(tm);
        const rm = new zt(new sn(0.23, 0.23, 0.29, 20).rotateX(Math.PI / 2), rimM);
        rm.position.copy(tm.position), rm.rotation.y = ct0, e.add(rm);
        const cp = X(wx + 0.05, sd * 0.98), cm = new zt(new qi(0.2, 0.12, 0.04), redM);
        cm.position.set(cp[0], 0.4, cp[1]), cm.rotation.y = ct0, e.add(cm);
      }
      tt(-2.05, 0.98, 0, 0.34, 0.05, 1.5, [0.04, 0.04, 0.05]);
      for (let D of [-0.5, 0.5]) tt(-2.0, 0.9, D, 0.06, 0.16, 0.05, [0.04, 0.04, 0.05]);
      tt(2.24, 0.5, 0, 0.06, 0.18, 0.7, [0.03, 0.03, 0.04]);
      for (let D of [-0.5, 0.5]) tt(2.2, 0.62, D, 0.08, 0.09, 0.3, [0.95, 0.97, 1], f);
      for (let D of [-0.55, 0.55]) tt(-2.22, 0.7, D, 0.08, 0.1, 0.34, [0.9, 0.05, 0.05], f);
      tt(0, 0.12, 0, 4.4, 0.06, 1.85, [0.4, 1, 0.3], h);
      for (let z of [-1, 1]) tt(0.2, 0.62, z * 0.97, 3, 0.07, 0.03, [0.5, 1, 0.35], h);
      {
        const cv = ji(1800, 236), cx = cv.getContext("2d"), rnd = me(4242);
        cx.fillStyle = "#f0f0f4"; cx.fillRect(0, 0, 1800, 236);
        const cols = ["#08080e", "#7a1fd1", "#52ff1a", "#08080e", "#9b30ff", "#08080e", "#f0f0f4"];
        for (let k = 0; k < 90; k++) {
          const px = rnd() * 1900 - 50, py = 20 + rnd() * 216, pw = 80 + rnd() * 300, ph = 8 + rnd() * 36, sk = 20 + rnd() * 70;
          cx.fillStyle = cols[Math.floor(rnd() * cols.length)];
          cx.beginPath(); cx.moveTo(px, py); cx.lineTo(px + pw, py - sk); cx.lineTo(px + pw + 36, py - sk + ph); cx.lineTo(px + 24, py + ph); cx.closePath(); cx.fill();
        }
        cx.fillStyle = "rgba(8,8,14,0.82)";
        cx.beginPath(); cx.moveTo(300, 40); cx.lineTo(1500, 22); cx.lineTo(1470, 214); cx.lineTo(270, 222); cx.closePath(); cx.fill();
        cx.textAlign = "center"; cx.textBaseline = "middle";
        cx.font = 'italic 900 112px Impact, "Arial Black", sans-serif';
        cx.lineWidth = 9; cx.strokeStyle = "#101010"; cx.strokeText("JAQUESTO", 890, 98);
        cx.fillStyle = "#58ff1a"; cx.fillText("JAQUESTO", 890, 98);
        cx.font = 'italic 700 32px Arial, sans-serif'; cx.fillStyle = "#ffffff"; cx.fillText("MUSIC WITHOUT LIMITS", 890, 178);
        const tex = Qi(cv, { repeat: false, aniso: 4 }), pm = new ae({ map: tex, roughness: 0.35, metalness: 0.1 });
        for (const sd of [-1, 1]) {
          const P2 = X(-0.3, sd * 0.94), pl = new zt(new Ke(3.2, 0.42), pm);
          pl.position.set(P2[0], 0.61, P2[1]), pl.rotation.y = ct0 + (sd < 0 ? Math.PI : 0), e.add(pl);
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
