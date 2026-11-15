# Fachwerk-Testhaus aus dem Quaternius "Medieval Village MegaKit" (CC0).
# Genau EIN Haus (nahe der Kartenmitte, rechteckig, kein Schloss/Kirche/Bahnhof) bekommt
# Kit-Waende, Fenster, Tuer, Eckpfosten, Schornstein und ein Ziegeldach. Der Rest bleibt wie er war.
KIT = open(D + '/kit_house.json', encoding='utf8').read().strip()

KIT_CODE = '''    const KITD = ''' + KIT + ''';
    let KIT_IDX = -1, KB = null;
    {
      let best = 1e9;
      for (let D = 0; D < dt.length; D++) {
        let y = dt[D].p.map((Ct) => a(Ct[0], Ct[1]));
        y = y.filter((Ct, at) => {
          let F = y[(at + 1) % y.length];
          return Math.abs(Ct[0] - F[0]) + Math.abs(Ct[1] - F[1]) > 0.2;
        });
        if (y.length < 4 || y.length > 8) continue;
        let N = Math.abs(Ru(y));
        if (N < 30 || N > 160) continue;
        let Z = Cu(y);
        if (N / Z.area < 0.85 || Math.min(Z.w, Z.d) < 5 || Math.max(Z.w, Z.d) > 20) continue;
        let B = Jc(y), it = [B[0] / n + s, B[1] / n + r];
        if (Math.hypot(it[0] - pt[0], it[1] - pt[1]) < 62 || Math.hypot(it[0] - V[0], it[1] - V[1]) < 22) continue;
        if (bt.some((Ct) => Math.hypot(it[0] - Ct[0], it[1] - Ct[1]) < 14)) continue;
        let dd = Math.hypot(it[0] - s, it[1] - r);
        dd < best && (best = dd, KIT_IDX = D);
      }
    }
    const kdec = (b, C) => {
      const t = atob(b), u = new Uint8Array(t.length);
      for (let i = 0; i < t.length; i++) u[i] = t.charCodeAt(i);
      return new C(u.buffer);
    };
    const KP = {};
    for (const k in KITD.parts) KP[k] = KITD.parts[k].map((p) => ({ m: p.m === 'MI_WoodTrim_Wear' ? 'MI_WoodTrim' : p.m, p: kdec(p.p, Int16Array), n: kdec(p.n, Int8Array), u: kdec(p.u, Int16Array), i: kdec(p.i, Uint16Array) }));
    const KMATS = {};
    const kitMat = (m) => {
      if (KMATS[m]) return KMATS[m];
      const src = KITD.tex[m];
      if (!src) return KMATS[m] = new ae({ color: 0x8aa0b4, roughness: 0.15, metalness: 0.1 });
      const cv = ji(256, 256), tx = Qi(cv, { aniso: 4 }), im = new Image();
      im.onload = () => {
        cv.getContext('2d').drawImage(im, 0, 0);
        tx.needsUpdate = true;
      };
      im.src = 'data:image/jpeg;base64,' + src;
      if (m === 'MI_RoundTiles') tx.repeat.set(0.5, 0.5);
      return KMATS[m] = new ae({ map: tx, roughness: 0.9, side: m === 'MI_RoundTiles' ? Ue : 0 });
    };
    const KROOF = new Ot();
    function KITROOF(fn) {
      const sv = ht;
      ht = KROOF;
      try {
        return fn();
      } finally {
        ht = sv;
      }
    }
    function KITB(Z, y, vt, j, I, A) {
      KB = {};
      const bld = (m) => KB[m] || (KB[m] = new Ot());
      const hf = vt / j, sY = hf / 3.123;
      const emit = (name, ox, oy, oz, th, sx, sy2) => {
        const c = Math.cos(th), sn = Math.sin(th);
        for (const pr of KP[name]) {
          const b = bld(pr.m), P = pr.p, Nn = pr.n, U = pr.u, ix = pr.i;
          const vx = (k) => {
            const x = P[k * 3] / 1000 * sx, yy = P[k * 3 + 1] / 1000 * sy2, z = P[k * 3 + 2] / 1000;
            return [ox + x * c + z * sn, oy + yy, oz - x * sn + z * c];
          };
          const nf = (k) => {
            const nx = Nn[k * 3] / 127, ny = Nn[k * 3 + 1] / 127, nz = Nn[k * 3 + 2] / 127;
            return [nx * c + nz * sn, ny, -nx * sn + nz * c];
          };
          const uf = (k) => [U[k * 2] / 2048, 1 - U[k * 2 + 1] / 2048];
          for (let t = 0; t < ix.length; t += 3) {
            const a0 = ix[t], a1 = ix[t + 1], a2 = ix[t + 2];
            b.triS(vx(a0), vx(a1), vx(a2), uf(a0), uf(a1), uf(a2), [1, 1, 1], nf(a0), nf(a1), nf(a2));
          }
        }
      };
      KB.emit = emit;
      const nE = y.length;
      let longest = 0, LL = 0;
      for (let e = 0; e < nE; e++) {
        const P0 = y[e], P1 = y[(e + 1) % nE], L = Math.hypot(P1[0] - P0[0], P1[1] - P0[1]);
        L > LL && (LL = L, longest = e);
      }
      const norms = [];
      for (let e = 0; e < nE; e++) {
        const P0 = y[e], P1 = y[(e + 1) % nE], dx = P1[0] - P0[0], dz = P1[1] - P0[1], L = Math.hypot(dx, dz) || 1;
        norms.push([I * dz / L, -I * dx / L]);
      }
      for (let e = 0; e < nE; e++) {
        const P0 = y[e], P1 = y[(e + 1) % nE], dx = P1[0] - P0[0], dz = P1[1] - P0[1], L = Math.hypot(dx, dz);
        if (L < 0.15) continue;
        const nx = norms[e][0], nz = norms[e][1], th = Math.atan2(nx, nz);
        const nm = Math.max(1, Math.round(L / 2)), sx = L / (2 * nm);
        for (let f = 0; f < j; f++) {
          for (let k = 0; k < nm; k++) {
            const t = (k + 0.5) / nm, px = P0[0] + dx * t, pz = P0[1] + dz * t, py = f * hf;
            const isDoor = f === 0 && e === longest && k === Math.floor(nm / 2);
            const isWin = !isDoor && ((k + f + e) % 2 === 0 || nm === 1);
            const wall = isDoor ? 'Wall_Plaster_Door_Round' : isWin ? 'Wall_Plaster_Window_Wide_Flat' : f === 0 ? 'Wall_Plaster_Straight_Base' : 'Wall_Plaster_Straight';
            emit(wall, px, py, pz, th, sx, sY);
            if (isWin) {
              emit('Window_Wide_Flat1', px, py, pz, th, sx, sY);
              A() < 0.7 && emit('WindowShutters_Wide_Flat_Open', px, py, pz, th, sx, sY);
            }
            isDoor && (emit('Door_1_Round', px, py, pz, th, sx, sY), KB.door = [px, pz]);
          }
          const pv = norms[(e + nE - 1) % nE];
          emit('Corner_Exterior_Wood', P0[0] + (nx + pv[0]) * 0.06, f * hf, P0[1] + (nz + pv[1]) * 0.06, th, 1, sY);
        }
      }
    }
    function KIT_FIN(at, Z, vt, A) {
      if (!KB) return;
      const ridgeY = at.top;
      const p = at.P(Z.w * 0.18, 0.3, 0);
      KB.emit('Prop_Chimney', p[0], ridgeY - 1.3, p[2], Z.ang * -1, 0.7, 0.7);
      {
        const c0 = Math.cos(Z.ang), s0 = Math.sin(Z.ang), hw = Z.w / 2 + 0.03, hd = Z.d / 2, G0 = vt, T0 = at.top;
        const W = (x, z, y) => [Z.cx + x * c0 - z * s0, y, Z.cz + x * s0 + z * c0];
        const pl = KB.MI_Plaster || (KB.MI_Plaster = new Ot());
        for (const sg of [-1, 1]) {
          const nrm = [sg * c0, 0, sg * s0];
          pl.triS(W(sg * hw, -hd, G0), W(sg * hw, hd, G0), W(sg * hw, 0, T0), [-hd / 2, 0], [hd / 2, 0], [0, (T0 - G0) / 2], [1, 1, 1], nrm, nrm, nrm);
        }
      }
      for (const m in KB) m !== 'emit' && m !== 'door' && S(KB[m].toGeometry(), kitMat(m), { shadow: true, receive: true });
      S(KROOF.toGeometry(), kitMat('MI_RoundTiles'), { shadow: true, receive: true });
      o.kitHouse = window.__kitHouse = { door: KB.door, x: Z.cx, z: Z.cz, ang: Z.ang, w: Z.w, d: Z.d, floors: Math.round(vt / 3) };
      KB = null;
    }
'''

rep('    let dt = i.buildings, ot = 0, bt = Sr.filter((D) => D.px).map((D) => D.px);\n',
    '    let dt = i.buildings, ot = 0, bt = Sr.filter((D) => D.px).map((D) => D.px);\n' + KIT_CODE, 'Kit-Haus-Code')
rep('kt = Pt === "house" && !It && A() < 0.14 && N > 25,', 'kt = Pt === "house" && !It && A() < 0.14 && N > 25 && D !== KIT_IDX,', 'Kit-keine-Ruine')
rep('if (rt(y, I, vt, j, Mt, A, { uOff: $t, vOff: ee }), Pt === "castle") {',
    'if (D === KIT_IDX ? KITB(Z, y, vt, j, I, A) : rt(y, I, vt, j, Mt, A, { uOff: $t, vOff: ee }), Pt === "castle") {', 'Kit-Waende')
rep('at = yt(Z, vt, Ct, Nt, Mt, A);',
    'at = D === KIT_IDX ? KITROOF(() => yt(Z, vt, Ct, [0.5, 0.37, 0.3], [0.9, 0.86, 0.78], A)) : yt(Z, vt, Ct, Nt, Mt, A);\n        D === KIT_IDX && KIT_FIN(at, Z, vt, A);', 'Kit-Dach')
rep('if (A() < 0.5 && wt(at.P, at.top, at.L, A), Pt === "church") {', 'if (A() < 0.5 && D !== KIT_IDX && wt(at.P, at.top, at.L, A), Pt === "church") {', 'Kit-kein-alter-Schornstein')
rep('if (Pt !== "castle") {\n        let Ct = me(D * 131 + 977);', 'if (Pt !== "castle" && D !== KIT_IDX) {\n        let Ct = me(D * 131 + 977);', 'Kit-kein-Graffiti')
