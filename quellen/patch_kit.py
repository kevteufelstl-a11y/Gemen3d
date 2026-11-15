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
      return KMATS[m] = new ae({ map: tx, roughness: 0.9, side: m === 'MI_RoundTiles' ? Ue : 0, vertexColors: m === 'MI_RoundTiles' });
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

# ---------------- Ganze Stadt im Fachwerk-Stil ----------------
# Fassaden: aus den Kit-Waenden vorgebackenes Bild (8 Kacheln je 2 m x 1 Stockwerk), Daecher mit Kit-Ziegeln,
# Strassen als Kopfsteinpflaster, Gehwege mit Ziegeln. Sehr wenige Dreiecke, laeuft auch auf dem Handy.
KTOWN = open(D + '/kit_town.json', encoding='utf8').read().strip()
GROUND = '''
    const KTD = ''' + KTOWN + ''';
    const ktex = (b64, w, h, rep) => {
      const cv = ji(w, h), tx = Qi(cv, { repeat: rep, aniso: 4 }), im = new Image();
      im.onload = () => {
        cv.getContext("2d").drawImage(im, 0, 0, w, h);
        tx.needsUpdate = true;
      };
      im.src = "data:image/jpeg;base64," + b64;
      return tx;
    };
    {
      const cob = ktex(KTD.cob, 512, 512, true), brk = ktex(KTD.brk, 512, 512, true);
      cob.repeat.set(7 / 3, 7 / 3), brk.repeat.set(5 / 2, 5 / 2);
      U.road.map = cob, U.road.color.setHex(0x86807a), U.road.roughness = 0.9, U.road.metalness = 0, U.road.envMapIntensity = 0.25;
      U.side.map = brk, U.side.color.setHex(0xd2ccc4), U.side.envMapIntensity = 0.3;
      U.marking.visible = false;
    }
'''
rep('U.roof.envMapIntensity = 0.5, o.mats = U;', 'U.roof.envMapIntensity = 0.5, o.mats = U;' + GROUND, 'Stadt-Boden')

TOWN = '''
    const FMAT = new ae({ map: ktex(KTD.fcol, 1024, 800, false), emissiveMap: ktex(KTD.fem, 1024, 800, false), emissive: 0xffffff, emissiveIntensity: 1.3, vertexColors: true, roughness: 0.9 });
    FMAT.envMapIntensity = 0.3;
    const FW = new Ot(), FR = new Ot();
    const FTINT = [[0.8, 0.9, 1], [0.86, 0.93, 1], [0.78, 0.86, 0.98], [0.92, 0.95, 1], [1, 0.97, 0.92], [0.84, 0.9, 0.96], [0.96, 0.9, 0.82], [0.8, 0.88, 0.95]];
    const RTINT = [[0.55, 0.36, 0.3], [0.62, 0.4, 0.32], [0.36, 0.26, 0.28], [0.4, 0.3, 0.34], [0.66, 0.42, 0.34], [0.34, 0.28, 0.3]];
    const tuv = (t) => {
      const u0 = (t % 4) / 4 + 2e-3, u1 = (t % 4 + 1) / 4 - 2e-3, v0 = t < 4 ? 0.502 : 2e-3, v1 = t < 4 ? 0.998 : 0.498;
      return [u0, u1, v0, v1];
    };
    const FWOK = (Pt, D, B) => Pt === "house" && D !== KIT_IDX && Math.hypot(B[0], B[1]) > 9;
    let FTI = FTINT[0];
    function FWB(y, I, vt, j, D, GE, ruin) {
      (window.__fw = window.__fw || []).push(Jc(y));
      const R = me(D * 389 + 5), nE = y.length, hf = vt / j, stone = R() < 0.22, tint = FTI = ruin ? [0.62, 0.56, 0.5] : FTINT[R() * FTINT.length | 0];
      let door = -1, LL = 0, bal = 0, porch = 0;
      for (let e = 0; e < nE; e++) {
        const P0 = y[e], P1 = y[(e + 1) % nE], L = Math.hypot(P1[0] - P0[0], P1[1] - P0[1]);
        !GE.has(e) && L > LL && (LL = L, door = e);
      }
      for (let e = 0; e < nE; e++) {
        const P0 = y[e], P1 = y[(e + 1) % nE], dx = P1[0] - P0[0], dz = P1[1] - P0[1], L = Math.hypot(dx, dz);
        if (L < 0.15) continue;
        const nx = I * dz / L, nz = -I * dx / L, nm = Math.max(1, Math.round(L / 2.2)), gr = GE.has(e);
        const sh = 0.86 + 0.14 * (nx * -0.5 + nz * -0.8), col = [tint[0] * sh, tint[1] * sh, tint[2] * sh];
        const tops = [], WN = [];
        for (let k = 0; k < nm; k++) tops.push(ruin ? vt * (R() < 0.35 ? 1 : 0.28 + R() * 0.6) : vt);
        for (let f = 0; f < j; f++) for (let k = 0; k < nm; k++) {
          const t0 = k / nm, t1 = (k + 1) / nm, y0 = f * hf, y1 = Math.min((f + 1) * hf, tops[k]);
          if (y1 <= y0 + 0.05) continue;
          let tile;
          if (f === 0) tile = e === door && k === nm >> 1 ? 3 : !gr && L > 1.6 && (k + e) % 2 === 0 ? (stone ? 7 : 2) : stone ? 5 : 4;
          else tile = gr ? 0 : (k + f + e) % 2 === 0 || nm === 1 ? (R() < 0.45 ? 1 : R() < 0.5 ? 6 : 2) : 0;
          ruin && (tile = tile === 1 || tile === 6 || tile === 7 ? 2 : tile === 3 ? 4 : tile);
          !ruin && (tile === 1 || tile === 2 || tile === 6 || tile === 7) && WN.push([k, f, t0, t1]);
          let [u0, u1, v0, v1] = tuv(tile);
          v1 = v0 + (v1 - v0) * (y1 - y0) / hf;
          I > 0 && ([u0, u1] = [u1, u0]);
          const ax = P0[0] + dx * t0, az = P0[1] + dz * t0, bx = P0[0] + dx * t1, bz = P0[1] + dz * t1;
          FW.quad([ax, y0, az], [bx, y0, bz], [bx, y1, bz], [ax, y1, az], [u0, v0], [u1, v0], [u1, v1], [u0, v1], col, [nx, 0, nz]);
          if (ruin) {
            const c2 = col.map((c) => c * 0.6), ix = nx * 0.25, iz = nz * 0.25;
            FW.quad([bx - ix, y0, bz - iz], [ax - ix, y0, az - iz], [ax - ix, y1, az - iz], [bx - ix, y1, bz - iz], [u1, v0], [u0, v0], [u0, v1], [u1, v1], c2, [-nx, 0, -nz]);
            FW.quad([ax, y1, az], [bx, y1, bz], [bx - ix, y1, bz - iz], [ax - ix, y1, az - iz], [0.03, 0.7], [0.1, 0.7], [0.1, 0.72], [0.03, 0.72], c2, [0, 1, 0]);
          }
        }
        if (!ruin) {
          const o = -Math.atan2(dz, dx), ux = dx / L, uz = dz / L;
          const W = (u, v) => [P0[0] + ux * u + nx * v, P0[1] + uz * u + nz * v];
          const WOOD = [0.34, 0.2, 0.1], DW = [0.22, 0.13, 0.07], ST = [0.45, 0.44, 0.43];
          let hasBal = false;
          if (j >= 2 && !gr && L >= 4.4 && e !== door && bal < 2 && R() < 0.42) {
            bal++;
            hasBal = true;
            const bw = Math.min(L - 1.2, L > 7 && R() < 0.5 ? 4.4 : 2.2), uc = L / 2;
            let [cx, cz] = W(uc, 0.55);
            J.box(cx, hf + 0.04, cz, bw, 0.14, 1.1, o, WOOD);
            [cx, cz] = W(uc, 1.02);
            J.box(cx, hf + 1.0, cz, bw, 0.07, 0.07, o, DW);
            for (const sd of [-1, 1]) {
              [cx, cz] = W(uc + sd * (bw / 2 - 0.04), 0.55);
              J.box(cx, hf + 1.0, cz, 0.07, 0.07, 1.1, o, DW);
              [cx, cz] = W(uc + sd * (bw / 2 - 0.06), 1.02);
              J.box(cx, hf / 2, cz, 0.16, hf, 0.16, o, DW);
              for (let q = 1; q < 3; q++) {
                [cx, cz] = W(uc + sd * (bw / 2 - 0.04), q * 0.36);
                J.box(cx, hf + 0.52, cz, 0.05, 0.9, 0.05, o, WOOD);
              }
            }
            const np = Math.round(bw / 0.8);
            for (let q = 0; q <= np; q++) {
              [cx, cz] = W(uc - bw / 2 + 0.06 + q * (bw - 0.12) / np, 1.02);
              J.box(cx, hf + 0.52, cz, 0.05, 0.9, 0.05, o, WOOD);
            }
          }
          if (e === door && !porch) {
            porch = 1;
            const uc = (nm >> 1) * (L / nm) + L / nm / 2;
            let [cx, cz] = W(uc, 0.5);
            J.box(cx, 0.05, cz, 1.9, 0.1, 1.0, o, ST);
            for (const sd of [-1, 1]) {
              [cx, cz] = W(uc + sd * 0.95, 1.05);
              J.box(cx, 1.25, cz, 0.1, 2.5, 0.1, o, DW);
            }
            const A = (u, v, yy) => {
              const q = W(u, v);
              return [q[0], yy, q[1]];
            };
            const a1 = A(uc - 1.1, 0, 2.85), b1 = A(uc + 1.1, 0, 2.85), c1 = A(uc + 1.1, 1.15, 2.45), d1 = A(uc - 1.1, 1.15, 2.45);
            J.quad(a1, b1, c1, d1, [0, 0], [1, 0], [1, 1], [0, 1], [0.42, 0.16, 0.12], [nx * 0.3, 0.9, nz * 0.3]);
            J.quad(d1, c1, b1, a1, [0, 0], [1, 0], [1, 1], [0, 1], [0.2, 0.12, 0.08], [0, -1, 0]);
            if (R() < 0.6) {
              [cx, cz] = W(uc + 1.6, 0.45);
              J.box(cx, 0.3, cz, 0.6, 0.6, 0.6, o + R(), WOOD);
              [cx, cz] = W(uc - 1.6, 0.45);
              J.box(cx, 0.4, cz, 0.55, 0.8, 0.55, o, DW);
              J.box(cx, 0.4, cz, 0.55, 0.8, 0.55, o + 0.785, DW);
            }
          }
          const FL = [[0.7, 0.1, 0.1], [0.8, 0.6, 0.12], [0.75, 0.3, 0.5], [0.7, 0.7, 0.7]];
          for (const [k, f, t0, t1] of WN) {
            if (f > 1 || f === 1 && hasBal || R() > 0.16) continue;
            const uc = (t0 + t1) / 2 * L, yy = f * hf + 0.33 * hf - 0.12;
            let [cx, cz] = W(uc, 0.14);
            J.box(cx, yy, cz, 1.0, 0.2, 0.28, o, DW);
            [cx, cz] = W(uc, 0.14);
            J.box(cx, yy + 0.2, cz, 0.95, 0.16, 0.22, o, FL[R() * 4 | 0]);
          }
          if (!gr && R() < 0.28) {
            const k = R() * nm | 0, GR = [[0.22, 0.5, 0.16], [0.3, 0.62, 0.2], [0.18, 0.42, 0.14], [0.4, 0.68, 0.22]], top = 1.8 + R() * Math.min(3.8, vt - 2);
            let u = (k + 0.2 + R() * 0.6) * L / nm;
            for (let q = 0; q < 13; q++) {
              const yy = 0.1 + q / 13 * top, sz = 0.4 + R() * 0.3, uu = u + (R() - 0.5) * 0.6, col2 = GR[R() * 4 | 0];
              u += (R() - 0.5) * 0.12;
              const pa = W(uu - sz / 2, 0.05), pb = W(uu + sz / 2, 0.05);
              J.quad([pa[0], yy, pa[1]], [pb[0], yy, pb[1]], [pb[0], yy + sz, pb[1]], [pa[0], yy + sz, pa[1]], [0, 0], [1, 0], [1, 1], [0, 1], col2, [nx, 0, nz]);
            }
          }
        }
      }
    }
    function FWROOF(D, fn) {
      const sv = ht, sj = J, g = FTI.map((c) => c * 0.92);
      ht = FR, J = { tri: (a, b, c, ua, ub, uc, cl, n) => FW.tri(a, b, c, [0.03, 0.7], [0.1, 0.7], [0.065, 0.92], g, n), box: (...a) => sj.box(...a), quad: (...a) => sj.quad(...a) };
      try {
        return fn(RTINT[me(D * 977 + 3)() * RTINT.length | 0]);
      } finally {
        ht = sv, J = sj;
      }
    }
'''
rep("    function KIT_FIN(at, Z, vt, A) {", TOWN + "    function KIT_FIN(at, Z, vt, A) {", 'Stadt-Fassaden-Code')

# Graffiti nur noch auf jeder dritten moeglichen Wand der Fachwerkhaeuser, und dort ohne Fenster
rep('if (Pt !== "castle" && D !== KIT_IDX) {\n        let Ct = me(D * 131 + 977);',
    'let GE = new Set(), FWH = FWOK(Pt, D, B);\n      if (Pt !== "castle" && D !== KIT_IDX) {\n        let Ct = me(D * 131 + 977);', 'Stadt-GE')
rep('if (Ut < 4.2 || Ct() > 0.42) continue;', 'if (Ut < 4.2 || Ct() > 0.42 || FWH && (D * 7 + at) % 3) continue;\n          GE.add(at);', 'Stadt-Graffiti')
rep('D === KIT_IDX ? KITB(Z, y, vt, j, I, A) : rt(y, I, vt, j, Mt, A, { uOff: $t, vOff: ee })',
    'D === KIT_IDX ? KITB(Z, y, vt, j, I, A) : FWH && !kt ? FWB(y, I, vt, j, D, GE) : rt(y, I, vt, j, Mt, A, { uOff: $t, vOff: ee })', 'Stadt-Waende')
rep(': yt(Z, vt, Ct, Nt, Mt, A);\n        D === KIT_IDX && KIT_FIN(at, Z, vt, A);',
    ': FWH ? FWROOF(D, (rc) => yt(Z, vt, Ct, rc, Mt, A)) : yt(Z, vt, Ct, Nt, Mt, A);\n        D === KIT_IDX && KIT_FIN(at, Z, vt, A);', 'Stadt-Daecher')
rep("S(q.toGeometry(), U.wall, { shadow: true, receive: true }),",
    "S(FW.toGeometry(), FMAT, { shadow: true, receive: true }), S(FR.toGeometry(), kitMat('MI_RoundTiles'), { shadow: true, receive: true }), S(q.toGeometry(), U.wall, { shadow: true, receive: true }),", 'Stadt-Meshes')
rep('st = N / Z.area > 0.78 && N > 22,', 'st = Math.hypot(B[0], B[1]) > 9 ? N > 7 : N / Z.area > 0.78 && N > 22,', 'Stadt-mehr-Satteldaecher')
rep('rt(y, I, vt, j, Ct, A, { ruin: true, uOff: $t, vOff: ee });', 'FWH ? FWB(y, I, vt, j, D, GE, true) : rt(y, I, vt, j, Ct, A, { ruin: true, uOff: $t, vOff: ee });', 'Stadt-Ruinen')
rep('let _t = yt(Z, vt * 0.82, Math.min(2.6, Z.d * 0.35), Nt.map((Tt) => Tt * 0.6), Ct, A, true);', 'let _t = FWH ? FWROOF(D, (rc) => yt(Z, vt * 0.82, Math.min(2.6, Z.d * 0.35), rc.map((Tt) => Tt * 0.75), Ct, A, true)) : yt(Z, vt * 0.82, Math.min(2.6, Z.d * 0.35), Nt.map((Tt) => Tt * 0.6), Ct, A, true);', 'Stadt-Ruinen-Dach')


# ---------------- Tag-Look wie im Video: Gras, Baeume ----------------
DAYMATS = '''
    {
      const mk = (r, g, b, seed, hi) => {
        const cv = ji(512, 512), c = cv.getContext("2d"), R = me(seed);
        c.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        c.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 160; i++) {
          const x = R() * 512, y = R() * 512, rad = 20 + R() * 60, l = R() < 0.5;
          const gr = c.createRadialGradient(x, y, 0, x, y, rad);
          gr.addColorStop(0, l ? "rgba(" + hi + ",.35)" : "rgba(20,70,20,.30)");
          gr.addColorStop(1, "rgba(0,0,0,0)");
          c.fillStyle = gr;
          for (const ox of [-512, 0, 512]) for (const oy of [-512, 0, 512]) {
            c.save();
            c.translate(ox, oy);
            c.fillRect(x - rad, y - rad, rad * 2, rad * 2);
            c.restore();
          }
        }
        for (let i = 0; i < 3500; i++) {
          const x = R() * 512, y = R() * 512, h = 4 + R() * 8;
          c.strokeStyle = "rgba(" + (70 + R() * 70 | 0) + "," + (150 + R() * 80 | 0) + "," + (40 + R() * 40 | 0) + ",.6)";
          c.lineWidth = 1.2;
          c.beginPath();
          c.moveTo(x, y);
          c.lineTo(x + (R() - 0.5) * 4, y - h);
          c.stroke();
        }
        return Qi(cv);
      };
      const GD = mk(92, 150, 52, 11, "170,225,90"), GG = mk(80, 140, 46, 12, "150,215,80"), GM = mk(120, 160, 56, 13, "200,230,100");
      const g0 = [U.ground.map, U.ground.color.getHex()], gg0 = [U.grass.map, U.grass.color.getHex()], gm0 = [U.meadow.map, U.meadow.color.getHex()];
      window.__setDayMats = (d) => {
        const set = (m, t, c) => {
          m.map = t;
          m.color.setHex(c);
          m.needsUpdate = true;
        };
        if (d) set(U.ground, GD, 0xffffff), set(U.grass, GG, 0xffffff), set(U.meadow, GM, 0xffffff);
        else set(U.ground, g0[0], g0[1]), set(U.grass, gg0[0], gg0[1]), set(U.meadow, gm0[0], gm0[1]);
      };
      window.__setDayMats(window.__day === true);
    }
'''
rep('U.marking.visible = false;\n    }\n', 'U.marking.visible = false;\n    }\n' + DAYMATS, 'Tag-Gras')
rep('        window.__day = b2;\n', '        window.__day = b2;\n        window.__setDayMats && window.__setDayMats(b2);\n', 'Tag-Gras-Schalter')
rep('return [fe(0.16, 0.46, S), fe(0.3, 0.66, S), fe(0.11, 0.24, S)];', 'return [fe(0.3, 0.66, S), fe(0.5, 0.95, S), fe(0.1, 0.3, S)];', 'Baum-Blattfarbe')
rep('f = [12096728, 10123460, 8829082, 13666990, 9400502, 7383194];', 'f = [16777215, 15335376, 13234336, 16777152, 11593872, 14155744];', 'Baum-Tints')
