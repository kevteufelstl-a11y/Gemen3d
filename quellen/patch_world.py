# Feste Objekte und Wegfindung entlang der Straßen (wird von patch.py eingebunden)
rep('i.treeCount = l.length, i.treeLOD', 'i.treeItems = l, i.treeCount = l.length, i.treeLOD', 'Baeume-merken')
rep('i.carItems.push({ x: w, z: T, burnt: M })', 'i.carItems.push({ x: w, z: T, burnt: M, rot: U })', 'Autos-Drehung')
rep('=== 1 ? 0.8 : 1, ee = false, Ct = 0;', '=== 1 ? 1 : 2.4, ee = false, Ct = 0;', 'Weg-Kosten')

OLD_PULL = """      let _t = [at[0]], Tt = 0;
      for (; Tt < at.length - 1; ) {
        let Rt = at.length - 1;
        for (; Rt > Tt + 1 && !z.los(at[Tt][0], at[Tt][1], at[Rt][0], at[Rt][1]); ) Rt--;"""
NEW_PULL = """      let $lr = (x0, z0, x1, z1) => {
        const nn = Math.max(1, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / 0.5));
        let rr = 0;
        for (let q2 = 0; q2 <= nn; q2++) if (o.clsAt(fe(x0, x1, q2 / nn), fe(z0, z1, q2 / nn)) === 1) rr++;
        return rr / (nn + 1);
      }, $pr = (a0, b0) => {
        let rr = 0;
        for (let q2 = a0; q2 <= b0; q2++) if (o.clsAt(at[q2][0], at[q2][1]) === 1) rr++;
        return rr / (b0 - a0 + 1);
      }, _t = [at[0]], Tt = 0;
      for (; Tt < at.length - 1; ) {
        let Rt = at.length - 1;
        for (; Rt > Tt + 1; ) {
          if (z.los(at[Tt][0], at[Tt][1], at[Rt][0], at[Rt][1]) && (Math.hypot(at[Rt][0] - at[Tt][0], at[Rt][1] - at[Tt][1]) <= 4 || $lr(at[Tt][0], at[Tt][1], at[Rt][0], at[Rt][1]) >= $pr(Tt, Rt) - 0.1)) break;
          Rt--;
        }"""
rep(OLD_PULL, NEW_PULL, 'Weg-Abkuerzungen')

BLK = """    {
      const wk = o.walk;
      const bdDisc = (cx, cz, rr) => {
        for (let gz = Math.floor(cz - rr - wk.g0z); gz <= Math.ceil(cz + rr - wk.g0z); gz++) for (let gx = Math.floor(cx - rr - wk.g0x); gx <= Math.ceil(cx + rr - wk.g0x); gx++) {
          if (gx < 0 || gz < 0 || gx >= wk.GW || gz >= wk.GH) continue;
          if (Math.hypot(wk.g0x + gx + 0.5 - cx, wk.g0z + gz + 0.5 - cz) <= rr + 0.5) wk.blocked[gz * wk.GW + gx] = 1;
        }
      };
      const bdRect = (cx, cz, bw, bd, rot) => {
        const cc = Math.cos(rot), ss = Math.sin(rot), rad = Math.hypot(bw, bd) / 2 + 1;
        for (let gz = Math.floor(cz - rad - wk.g0z); gz <= Math.ceil(cz + rad - wk.g0z); gz++) for (let gx = Math.floor(cx - rad - wk.g0x); gx <= Math.ceil(cx + rad - wk.g0x); gx++) {
          if (gx < 0 || gz < 0 || gx >= wk.GW || gz >= wk.GH) continue;
          const px = wk.g0x + gx + 0.5 - cx, pz = wk.g0z + gz + 0.5 - cz, uu = px * cc - pz * ss, vv = px * ss + pz * cc;
          if (Math.abs(uu) < bw / 2 + 0.3 && Math.abs(vv) < bd / 2 + 0.3) wk.blocked[gz * wk.GW + gx] = 1;
        }
      };
    }
"""
ANCH = '    {\n      let k = o.walk.nearest(2.6, 9) || [2.6, 9];\n      o.walk.reach = null;'
rep(ANCH, BLK + ANCH, 'Feste-Objekte')
