# Neuer Weg statt Tunnel (18.11.2026)
# - Tunnel-Roehre, Aura und Blumenstreifen werden nicht mehr angezeigt
# - Leuchtende Bodenplatten (gehen an, wenn man darueberlaeuft, und bleiben kurz an)
# - Offene Torboegen aus Stein und Holz, etwa alle 9 m
# - Gluehwuermchen, die entlang des Weges schweben
# Logik des Weges (Punkte, Sicherheit, Monster, near/distTo) bleibt unveraendert.
# (wird von patch.py per exec eingebunden; benutzt rep() und s von dort)

# 1) Tunnel, Aura und Blumenstreifen nicht mehr in die Szene haengen, dafuer den neuen Weg
rep('    E.frustumCulled = false, E.renderOrder = 7, e.add(v, E, x);',
'''    E.frustumCulled = false, E.renderOrder = 7;
    const WEG = (() => {
      const N = Vn, root = new pe();
      e.add(root);
      const col = new Xt();
      const setM = (mesh, k, x0, y0, z0, c0, s0, sx, sy, sz) => {
        const m = mesh.instanceMatrix.array, o = k * 16;
        m[o] = c0 * sx, m[o + 1] = 0, m[o + 2] = -s0 * sx, m[o + 3] = 0;
        m[o + 4] = 0, m[o + 5] = sy, m[o + 6] = 0, m[o + 7] = 0;
        m[o + 8] = s0 * sz, m[o + 9] = 0, m[o + 10] = c0 * sz, m[o + 11] = 0;
        m[o + 12] = x0, m[o + 13] = y0, m[o + 14] = z0, m[o + 15] = 1;
      };
      // Bodenplatten: Stein + Leuchtschicht darueber
      const tGeo = new sn(0.62, 0.66, 0.08, 6);
      const tiles = new ri(tGeo, new ae({ color: 16777215, roughness: 0.9, emissive: 1314575, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }), N);
      const gGeo = new sn(0.48, 0.48, 0.01, 6);
      const glow = new ri(gGeo, new se({ color: 16777215, transparent: true, depthWrite: false, blending: Ee, toneMapped: false }), N);
      tiles.count = glow.count = 0, tiles.frustumCulled = glow.frustumCulled = false, glow.renderOrder = 8;
      root.add(tiles, glow);
      const lit = new Float32Array(N), act = new Set();
      // Torboegen: Pfeiler (2 je Bogen), Bogen oben, Laterne
      const NA = 700;
      const pil = new ri(new qi(0.42, 2.7, 0.42), new ae({ color: 16777215, roughness: 0.85 }), NA * 2);
      const arc = new ri(new Uo(1.95, 0.22, 6, 18, Math.PI), new ae({ color: 16777215, roughness: 0.8 }), NA);
      const lan = new ri(new qi(0.22, 0.3, 0.22), new se({ color: 16769152, toneMapped: false }), NA);
      pil.count = arc.count = lan.count = 0, pil.frustumCulled = arc.frustumCulled = lan.frustumCulled = false;
      root.add(pil, arc, lan);
      let lastA = null, nA = 0, nT = 0;
      const add = (px, pz, idx) => {
        if (nT >= N) return;
        const prev = n.pts[idx - 1];
        let fx = 1, fz = 0;
        if (prev && Math.hypot(px - prev[0], pz - prev[1]) < 3) fx = px - prev[0], fz = pz - prev[1];
        const fl = Math.hypot(fx, fz) || 1;
        fx /= fl, fz /= fl;
        const lx = -fz, lz = fx, c0 = lx, s0 = -lz;
        setM(tiles, nT, px, 0.1, pz, c0, s0, 1, 1, 1);
        const v = 0.24 + 0.08 * ((idx * 7919) % 5) / 4;
        tiles.setColorAt(nT, col.setRGB(v, v * 0.95, v * 0.88));
        setM(glow, nT, px, 0.15, pz, c0, s0, 1, 1, 1);
        glow.setColorAt(nT, col.setRGB(0, 0, 0));
        nT++, tiles.count = glow.count = nT;
        tiles.instanceMatrix.needsUpdate = glow.instanceMatrix.needsUpdate = true;
        tiles.instanceColor.needsUpdate = glow.instanceColor.needsUpdate = true;
        // Torbogen etwa alle 9 m, nicht direkt neben einem anderen Bogen
        if (nA >= NA || !prev) return;
        if (lastA && Math.hypot(px - lastA[0], pz - lastA[1]) < 9) return;
        for (let k = 0; k < nA; k++) {
          const a = arcs[k];
          if (Math.hypot(px - a[0], pz - a[1]) < 6) return;
        }
        lastA = [px, pz], arcs.push(lastA);
        const stone = nA % 2 === 0, w = 1.95;
        const pc = stone ? [0.42, 0.42, 0.44] : [0.36, 0.2, 0.09], ac = stone ? [0.5, 0.5, 0.52] : [0.42, 0.24, 0.1];
        for (const sg of [-1, 1]) {
          setM(pil, pil.count, px + lx * w * sg, 1.35, pz + lz * w * sg, c0, s0, 1, 1, 1);
          pil.setColorAt(pil.count, col.setRGB(pc[0], pc[1], pc[2])), pil.count++;
        }
        setM(arc, nA, px, 2.7, pz, c0, s0, 1, 0.75, 1);
        arc.setColorAt(nA, col.setRGB(ac[0], ac[1], ac[2]));
        setM(lan, nA, px, 4.0, pz, c0, s0, 1, 1, 1);
        nA++, arc.count = lan.count = nA;
        pil.instanceMatrix.needsUpdate = arc.instanceMatrix.needsUpdate = lan.instanceMatrix.needsUpdate = true;
        pil.instanceColor.needsUpdate = arc.instanceColor.needsUpdate = true;
      };
      const arcs = [];
      // Platten unter dem Spieler aufleuchten lassen, danach langsam ausgehen
      const step = (t, delta, px, pz) => {
        const hx = Math.floor(px / 4), hz = Math.floor(pz / 4);
        for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
          const list = n.hash.get((hx + a + 5e3) * 10007 + (hz + b + 5e3));
          if (list) for (const k of list) {
            if (k >= nT) continue;
            const q = n.pts[k], d2 = (q[0] - px) ** 2 + (q[1] - pz) ** 2;
            if (d2 < 1.6) lit[k] = 3.2, act.add(k);
          }
        }
        if (!act.size) return;
        for (const k of act) {
          lit[k] -= delta;
          const f = Math.max(0, Math.min(1, lit[k] / 2.2)), p = f * (0.85 + 0.15 * Math.sin(t * 6 + k));
          glow.setColorAt(k, col.setRGB(1.0 * p, 0.72 * p, 0.22 * p));
          lit[k] <= 0 && (glow.setColorAt(k, col.setRGB(0, 0, 0)), act.delete(k));
        }
        glow.instanceColor.needsUpdate = true;
      };
      return { add, step, root, info: () => ({ tiles: nT, arcs: nA, lit: act.size }) };
    })();
    n.weg = WEG, window.__weg = WEG, WEG.n = n;''', 'Weg-Aufbau')

# 2) Jeder neue Wegpunkt bekommt eine Platte (und ggf. einen Torbogen)
rep('n.lastBreak && (J(dt, ot, 0), J(dt, ot, Tn * 0.6), n.lastBreak = false), n.pts.push([dt, ot]), et(dt, ot, bt),',
    'n.lastBreak && (J(dt, ot, 0), J(dt, ot, Tn * 0.6), n.lastBreak = false), n.pts.push([dt, ot]), et(dt, ot, bt), WEG.add(dt, ot, bt),', 'Weg-Punkt')

# 3) Platten im Spiel-Takt aktualisieren; Lichter am Weg etwas sanfter
rep('      d.uTime.value = dt;\n      if (opts.simple) return;',
    '      d.uTime.value = dt;\n      WEG.step(dt, ot, bt, Et);\n      if (opts.simple) return;', 'Weg-Takt')
rep('let z = X.userData.on ? 22 + Math.sin(dt * 2 + tt) * 4 : 0;', 'let z = X.userData.on ? 9 + Math.sin(dt * 2 + tt) * 2 : 0;', 'Weg-Lichter')

# 4) Gluehwuermchen statt bunter Funken
rep('At = opts.simple ? null : xt(520, 0.34), rt = opts.simple ? null : xt(260, 0.3),',
    'At = opts.simple ? null : xt(70, 0.3), rt = null,', 'Weg-Gluehwuermchen')
rep('      ct(At, true), ct(rt, false);',
'''      for (let z = 0; z < At.N; z++) {
        if (At.life[z] -= ot, At.life[z] <= 0) {
          let k = L[s() * L.length | 0], P = n.pts[k], sd = (s() < 0.5 ? -1 : 1) * (0.8 + s() * 1.6), Q = n.pts[Math.min(n.pts.length - 1, k + 1)] || P, ax = Q[0] - P[0], az = Q[1] - P[1], al = Math.hypot(ax, az) || 1;
          At.pos[z * 3] = P[0] - az / al * sd, At.pos[z * 3 + 1] = 0.5 + s() * 1.4, At.pos[z * 3 + 2] = P[1] + ax / al * sd;
          At.vel[z * 3] = s() * 6.28, At.vel[z * 3 + 1] = 0.4 + s() * 0.5, At.life[z] = At.max[z] = 4 + s() * 4;
          At.base.set(s() < 0.6 ? [0.8, 1, 0.3] : [1, 0.85, 0.35], z * 3);
        }
        let ph = At.vel[z * 3] + dt * At.vel[z * 3 + 1];
        At.pos[z * 3] += Math.cos(ph) * 0.35 * ot, At.pos[z * 3 + 2] += Math.sin(ph * 1.3) * 0.35 * ot, At.pos[z * 3 + 1] += Math.sin(ph * 0.7) * 0.12 * ot;
        let D = At.life[z], G = At.max[z], y = Le(Math.min(D / 1.2, (G - D) / 1.2), 0, 1) * (0.55 + 0.45 * Math.sin(dt * 3.5 + z * 1.7));
        At.col[z * 3] = At.base[z * 3] * y, At.col[z * 3 + 1] = At.base[z * 3 + 1] * y, At.col[z * 3 + 2] = At.base[z * 3 + 2] * y;
      }
      At.p.geometry.attributes.position.needsUpdate = true, At.p.geometry.attributes.color.needsUpdate = true;''', 'Weg-Gluehwuermchen-Takt')

# 5) Funken-Sichtbarkeit: rt gibt es nicht mehr
rep('At.p.visible = rt.p.visible = O < 150', 'At.p.visible = O < 150', 'Weg-Sichtbar')
