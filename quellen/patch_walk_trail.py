# Strassen immer begehbar + Tunnel nicht ueber bestehende Tunnel legen
# (wird von patch.py per exec eingebunden; benutzt rep() und s von dort)

# 1) Begehbarkeit: Zellen, die mindestens zu 25% aus Strasse bestehen, werden nie gesperrt.
#    Vorher wurden Zellen neben Haeusern zusaetzlich gesperrt -> schmale Strassen waren "unsichtbare Mauern".
rep('''      y >= 2 && (tt[D * O + G] = 1);
    }
    let z = { GW: O, GH: W, blocked: tt, g0x: ct, g0z: X };''',
'''      y >= 2 && (tt[D * O + G] = 1);
    }
    for (let D = 0; D < W; D++) for (let G = 0; G < O; G++) {
      let y = Math.floor(G / n), b = Math.floor(D / n), N = Math.min(i.w - 1, Math.floor((G + 1) / n)), I = Math.min(i.h - 1, Math.floor((D + 1) / n)), c1 = 0, c2 = 0;
      for (let B = b; B <= I; B++) for (let it = y; it <= N; it++) {
        c2++;
        g[B * i.w + it] === 1 && c1++;
      }
      c2 && c1 / c2 >= 0.25 && (tt[D * O + G] = 0);
    }
    let z = { GW: O, GH: W, blocked: tt, g0x: ct, g0z: X };''', 'Strassen-begehbar')

# 2) Tunnel: Wo schon ein aelterer Tunnel ist (Abstand < 2,4 m zur Mittellinie), wird kein neuer
#    daneben/darueber gebaut. Der neue Tunnel endet dort und beginnt erst wieder dahinter,
#    so wirken Kreuzungen und zurueckgelaufene Wege wie EIN zusammenhaengendes Netz.
rep('''    let C = null, gt = null;
    n.track = (dt, ot) => {
      if (V(dt, ot)) {
        n.pts.length && C !== null && H(), C = null;
        return;
      }
      C === null && (n.lastBreak = true, pt($[0], $[1]), C = $[0], gt = $[1]);
      let bt = Math.hypot(dt - C, ot - gt);
      if (bt >= Qc) {
        let Et = Math.floor(bt / Qc);
        for (let O = 1; O <= Et; O++) {
          let W = O * Qc / bt;
          pt(C + (dt - C) * W, gt + (ot - gt) * W);
        }
        C = n.pts[n.pts.length - 1][0], gt = n.pts[n.pts.length - 1][1];
      }
    };''',
'''    let C = null, gt = null;
    n.oldNear = (x, z) => {
      let lim = n.pts.length - 6;
      if (lim <= 0) return false;
      let hx = Math.floor(x / 4), hz = Math.floor(z / 4);
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
        let list = n.hash.get((hx + a + 5e3) * 10007 + (hz + b + 5e3));
        if (list) for (let idx of list) {
          if (idx >= lim) continue;
          let q = n.pts[idx], dx = q[0] - x, dz = q[1] - z;
          if (dx * dx + dz * dz < 5.76) return true;
        }
      }
      return false;
    };
    n.track = (dt, ot) => {
      if (V(dt, ot)) {
        n.pts.length && C !== null && H(), C = null;
        return;
      }
      C === null && (n.lastBreak = true, n.oldNear($[0], $[1]) || pt($[0], $[1]), C = $[0], gt = $[1]);
      let bt = Math.hypot(dt - C, ot - gt);
      if (bt >= Qc) {
        let Et = Math.floor(bt / Qc), C0 = C, g0 = gt;
        for (let O = 1; O <= Et; O++) {
          let W = O * Qc / bt, px = C0 + (dt - C0) * W, pz = g0 + (ot - g0) * W;
          n.oldNear(px, pz) ? n.lastBreak || H() : pt(px, pz);
        }
        C = C0 + (dt - C0) * (Et * Qc / bt), gt = g0 + (ot - g0) * (Et * Qc / bt);
      }
    };''', 'Tunnel-nicht-ueberlappen')
