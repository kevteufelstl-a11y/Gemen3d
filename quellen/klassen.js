  // ================= Klassen-Zonen (26.11.2026) =================
  // Jede Klasse hat eine eigene Zone: Zone 1 = Klasse 3, Zone 2 ist geteilt in Klasse 4 (Gemen-Sued),
  // Klasse 5 (Neumuehle) und Klasse 6 (Aa-Wiesen). Zwischen den Zonen steht eine niedrige Steinmauer.
  // Durch ein grosses Tor kommt man in die naechste Klasse (dort spaeter die Abschlusspruefung).
  // Liegen zwei Zonen nicht nebeneinander, baut sich am Tor eine Bruecke auf, die nach der Ankunft wieder verschwindet.
  // Gesperrte Zonen: Mauer und Tor sind im Lauf-Raster gesperrt. Admin darf ueberall hin.
  var KL = { on: false, zones: [], runs: [], gates: [], built: false, bridge: null, btn: null, near: null, msg: null };
  function KL_cfg() {
    return window.GEMEN_ZONES && window.GEMEN_ZONES.klassen || null;
  }
  function KL_geo(id) {
    return ZN_zones().find((z) => z.id === id);
  }
  function KL_bb(P) {
    let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (const p of P) x0 = Math.min(x0, p[0]), x1 = Math.max(x1, p[0]), z0 = Math.min(z0, p[1]), z1 = Math.max(z1, p[1]);
    return [x0, z0, x1, z1];
  }
  function KL_prepare() {
    const c = KL_cfg();
    if (!c || !window.GEMEN_DATA) return false;
    const g = window.GEMEN_DATA, S = g.scale, W = (px, py) => [(px - g.home[0]) * S, (py - g.home[1]) * S];
    for (const k of c.zonen) {
      const z = { id: k.id, klasse: k.klasse, name: k.name };
      if (k.poly) {
        const gz = KL_geo(k.geo);
        if (!gz || !gz.geoData) continue;
        z.poly = k.poly.map((p) => ZN_world(gz.geoData, p));
      } else z.poly = [W(0, 0), W(g.w, 0), W(g.w, g.h), W(0, g.h)];
      z.bb = KL_bb(z.poly), KL.zones.push(z);
    }
    return KL.on = KL.zones.length > 1;
  }
  // Welche Klasse liegt an dieser Stelle? (0 = keine Zone)
  function KL_at(x, z) {
    let k3 = null;
    for (const k of KL.zones) {
      if (k.klasse === 3) {
        k3 = k;
        continue;
      }
      const b = k.bb;
      if (x >= b[0] && x <= b[2] && z >= b[1] && z <= b[3] && ZN_inPoly(x, z, k.poly)) return k.klasse;
    }
    return k3 && ZN_inPoly(x, z, k3.poly) ? 3 : 0;
  }
  // Neue Klasse nur ueber die bestandene Abschlusspruefung (Server: zone_unlocks mit via = 'exam'). Admin darf ueberall hin.
  function KL_ok(k) {
    if (!k || k === 3) return true;
    if (Ae && Ae.admin || window.__klTestAlle) return true;
    return (ZN.exam || []).includes("k" + k);
  }
  window.__klasseAt = (x, z) => KL.on ? KL_at(x, z) : 3;
  window.__klasseOk = (k) => KL_ok(k);

  // ---------- Mauerverlauf: Kanten, an denen zwei verschiedene Klassen aneinanderstossen ----------
  function KL_lines() {
    KL.runs = [];
    for (const k of KL.zones) {
      if (k.klasse === 3) continue;
      const P = k.poly, n = P.length;
      for (let i = 0; i < n; i++) {
        const a = P[i], b = P[(i + 1) % n], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (L < 0.5) continue;
        const tx = (b[0] - a[0]) / L, tz = (b[1] - a[1]) / L;
        let run = null, rp = null;
        const flush = () => {
          run && run.length > 1 && KL.runs.push({ pts: run, pair: rp, t: [tx, tz] }), run = null;
        };
        for (let d = 0; d <= L + 1e-6; d += 0.5) {
          const x = a[0] + tx * d, z = a[1] + tz * d;
          let other = 0;
          for (const s of [1, -1]) {
            const nx = -tz * s, nz = tx * s;
            if (ZN_inPoly(x + nx * 1.5, z + nz * 1.5, P)) continue;
            for (const off of [2, 4, 7]) {
              const o = KL_at(x + nx * off, z + nz * off);
              if (o && o !== k.klasse) {
                other = o;
                break;
              }
            }
            break;
          }
          if (other && (other === 3 || k.klasse < other)) {
            const pr = k.klasse < other ? [k.klasse, other] : [other, k.klasse];
            if (run && rp[0] === pr[0] && rp[1] === pr[1]) run.push([x, z]);
            else flush(), run = [[x, z]], rp = pr;
          } else flush();
        }
        flush();
      }
    }
  }
  // Naechster Mauerpunkt mit passendem Klassenpaar
  function KL_snap(p, pair) {
    let best = null, bd = 1e9;
    for (const r of KL.runs) {
      if (r.pair[0] !== Math.min(pair[0], pair[1]) || r.pair[1] !== Math.max(pair[0], pair[1])) continue;
      for (const q of r.pts) {
        const d = Math.hypot(q[0] - p[0], q[1] - p[1]);
        d < bd && (bd = d, best = { c: q, t: r.t });
      }
    }
    return best && bd < 60 ? best : null;
  }
  // Tor an eine Stelle legen, an der man auf beiden Seiten (bzw. auf der eigenen Seite) laufen kann, z. B. eine Strasse
  function KL_cross(p, pair, sides) {
    const ok = (x, z) => {
      try {
        return ZN.o.walk.ok(x, z);
      } catch {
        return false;
      }
    };
    let best = null, bd = 1e9;
    for (const r of KL.runs) {
      if (r.pair[0] !== Math.min(pair[0], pair[1]) || r.pair[1] !== Math.max(pair[0], pair[1])) continue;
      for (let i = 0; i < r.pts.length; i += 2) {
        const q = r.pts[i], d = Math.hypot(q[0] - p[0], q[1] - p[1]);
        if (d >= bd || d > 140) continue;
        let good = true;
        for (const k of sides) {
          const n = KL_side(q, r.t, k);
          for (const off of [1.6, 3, 5]) for (const s of [-2.2, 0, 2.2]) good = good && ok(q[0] + n[0] * off + r.t[0] * s, q[1] + n[1] * off + r.t[1] * s);
          if (!good) break;
        }
        good && (bd = d, best = { c: q, t: r.t });
      }
    }
    return best || KL_snap(p, pair);
  }
  // Normale vom Tor in Richtung einer bestimmten Klasse
  function KL_side(c, t, klasse) {
    for (const s of [1, -1]) {
      const n = [-t[1] * s, t[0] * s];
      for (const off of [3, 6, 10]) if (KL_at(c[0] + n[0] * off, c[1] + n[1] * off) === klasse) return n;
    }
    return [-t[1], t[0]];
  }
  function KL_mkGates() {
    const c = KL_cfg(), gz = KL_geo("z2");
    KL.gates = [];
    for (const t of c.tore || []) {
      const gg = KL_geo(t.geo || "z2") || gz;
      if (!gg || !gg.geoData) continue;
      const w = (c.tor && c.tor.breite) || 7;
      if (t.bruecke) {
        // Bruecke: Tor A in der Mauer der Ausgangsklasse, Tor B in der Mauer der Zielklasse (Zwischenzone dazwischen)
        const A = KL_cross(ZN_world(gg.geoData, t.px), [t.von, KL_at(...KL_peek(gg, t.px, t.von)) || 0], [t.von]);
        const B = KL_cross(ZN_world(gg.geoData, t.bruecke.px), [t.nach, KL_at(...KL_peek(gg, t.bruecke.px, t.nach)) || 0], [t.nach]);
        if (!A || !B) continue;
        KL.gates.push({ id: t.id, von: t.von, nach: t.nach, w, c: A.c, t: A.t, side: t.von, bridge: true, pairId: t.id + "b" });
        KL.gates.push({ id: t.id + "b", von: t.von, nach: t.nach, w, c: B.c, t: B.t, side: t.nach, bridge: true, pairId: t.id });
      } else {
        const A = KL_cross(ZN_world(gg.geoData, t.px), [t.von, t.nach], [t.von, t.nach]);
        if (!A) continue;
        KL.gates.push({ id: t.id, von: t.von, nach: t.nach, w, c: A.c, t: A.t, bridge: false });
      }
    }
  }
  // Welche Klasse liegt auf der anderen Seite der Mauer an diesem Punkt?
  function KL_peek(gg, px, own) {
    const p = ZN_world(gg.geoData, px);
    for (const r of KL.runs) {
      if (r.pair[0] !== own && r.pair[1] !== own) continue;
      for (const q of r.pts) if (Math.hypot(q[0] - p[0], q[1] - p[1]) < 3) {
        const o = r.pair[0] === own ? r.pair[1] : r.pair[0];
        const n = KL_side(q, r.t, o);
        return [q[0] + n[0] * 4, q[1] + n[1] * 4];
      }
    }
    return [p[0], p[1]];
  }

  // ---------- Lauf-Raster: Mauer sperren, Torluecken schaltbar ----------
  function KL_grids() {
    const out = [ZN.o.walk], z2 = KL_geo("z2");
    z2 && z2.o2 && out.push(z2.o2.walk);
    return out;
  }
  function KL_cellsNear(g, x, z, r, cb) {
    const i0 = Math.floor(x - r - g.g0x), i1 = Math.floor(x + r - g.g0x), j0 = Math.floor(z - r - g.g0z), j1 = Math.floor(z + r - g.g0z);
    for (let j = Math.max(0, j0); j <= Math.min(g.GH - 1, j1); j++) for (let i = Math.max(0, i0); i <= Math.min(g.GW - 1, i1); i++) {
      const cx = g.g0x + i + 0.5, cz = g.g0z + j + 0.5;
      Math.hypot(cx - x, cz - z) <= r + 0.25 && cb(j * g.GW + i);
    }
  }
  function KL_inGate(p) {
    for (const g of KL.gates) if (Math.hypot(p[0] - g.c[0], p[1] - g.c[1]) < g.w / 2) return g;
    return null;
  }
  function KL_raster() {
    const r = KL_cfg().mauer && KL_cfg().mauer.block || 0.95, G = KL_grids();
    for (const g of KL.gates) g.cells = [];
    // 1. feste Mauer, 2. Torluecken (jede Zelle nur einmal, Originalwert merken)
    const perm = G.map(() => new Set()), seen = G.map(() => new Set());
    for (const run of KL.runs) for (const p of run.pts) {
      if (KL_inGate(p)) continue;
      G.forEach((g, gi) => KL_cellsNear(g, p[0], p[1], r, (idx) => (g.blocked[idx] = 1, perm[gi].add(idx))));
    }
    // Torgasse: Zellen im Tor (bis 2,6 m vor und hinter der Mauer). Offen = frei (auch die Nahtstelle zwischen
    // den Laufrastern zweier Zonen), zu = Mauerlinie gesperrt.
    for (const gt of KL.gates) {
      const n = [-gt.t[1], gt.t[0]], hw = gt.w / 2 - 0.6, R = Math.hypot(hw, 2.6) + 1;
      G.forEach((g, gi) => KL_cellsNear(g, gt.c[0], gt.c[1], R, (idx) => {
        if (perm[gi].has(idx) || seen[gi].has(idx)) return;
        const cx = g.g0x + idx % g.GW + 0.5 - gt.c[0], cz = g.g0z + Math.floor(idx / g.GW) + 0.5 - gt.c[1];
        const a = cx * gt.t[0] + cz * gt.t[1], d = cx * n[0] + cz * n[1];
        if (Math.abs(a) > hw || Math.abs(d) > 2.6) return;
        const near = Math.abs(d) <= r + 0.25;
        seen[gi].add(idx), gt.cells.push([g, idx, g.blocked[idx], near]), near && (g.blocked[idx] = 1);
      }));
    }
    for (const z of ZN_zones()) z.xcand = null;
  }
  function KL_gateOpen(g) {
    if (g.bridge) return !!(KL.bridge && (KL.bridge.g === g || KL.bridge.g2 === g));
    return KL_ok(g.von) && KL_ok(g.nach);
  }
  function KL_applyGates() {
    let ch = false;
    for (const g of KL.gates) {
      const op = KL_gateOpen(g);
      if (op === g.open) continue;
      g.open = op, ch = true;
      if (!g.bridge) for (const [gr, idx, orig, near] of g.cells || []) gr.blocked[idx] = op ? 0 : near ? 1 : orig;
    }
    if (ch) for (const z of ZN_zones()) z.xcand = null;
  }

  // ---------- 3D: Mauer, Tore, Bruecke ----------
  function KL_slab(B, p0, p1, w, th, col) {
    const dx = p1[0] - p0[0], dz = p1[2] - p0[2], L = Math.hypot(dx, dz) || 1, nx = -dz / L * w / 2, nz = dx / L * w / 2;
    const T = (p, s) => [p[0] + nx * s, p[1], p[2] + nz * s], D = (p) => [p[0], p[1] - th, p[2]];
    const a = T(p0, 1), b = T(p1, 1), c = T(p1, -1), d = T(p0, -1);
    B.quad(a, b, c, d, [0, 0], [1, 0], [1, 1], [0, 1], col, [0, 1, 0]);
    B.quad(D(a), D(b), D(c), D(d), [0, 0], [1, 0], [1, 1], [0, 1], col.map((v) => v * 0.5), [0, -1, 0]);
    B.quad(a, b, D(b), D(a), [0, 0], [1, 0], [1, 1], [0, 1], col.map((v) => v * 0.8), [nx, 0, nz]);
    B.quad(d, c, D(c), D(d), [0, 0], [1, 0], [1, 1], [0, 1], col.map((v) => v * 0.8), [-nx, 0, -nz]);
    B.quad(a, d, D(d), D(a), [0, 0], [1, 0], [1, 1], [0, 1], col.map((v) => v * 0.7), [-dx, 0, -dz]);
    B.quad(b, c, D(c), D(b), [0, 0], [1, 0], [1, 1], [0, 1], col.map((v) => v * 0.7), [dx, 0, dz]);
  }
  function KL_wallMesh() {
    const m = KL_cfg().mauer || {}, H = m.hoehe || 1.15, T = m.dicke || 0.7, C = m.farbe || [0.62, 0.58, 0.52], B = new Ot(), R = me(2611);
    let n = 0;
    for (const run of KL.runs) {
      const P = run.pts;
      let seg = [];
      const out = () => {
        for (let i = 0; i + 1 < seg.length; i += 6) {
          const a = seg[i], b = seg[Math.min(seg.length - 1, i + 6)], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
          if (L < 0.2) continue;
          const ang = -Math.atan2(b[1] - a[1], b[0] - a[0]), mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2, v = 0.9 + R() * 0.18, col = C.map((c) => c * v);
          B.box(mx, H / 2, mz, L + 0.04, H, T, ang, col), B.box(mx, H + 0.08, mz, L + 0.12, 0.16, T + 0.16, ang, C.map((c) => c * 0.82)), n++;
          i % 18 === 0 && B.box(a[0], (H + 0.35) / 2, a[1], T + 0.3, H + 0.35, T + 0.3, ang, C.map((c) => c * 0.9));
        }
        seg = [];
      };
      for (const p of P) KL_inGate(p) ? out() : seg.push(p);
      out();
    }
    const mat = new ae({ vertexColors: true, roughness: 0.95 }), mesh = new zt(B.toGeometry(), mat);
    return mesh.receiveShadow = true, mesh.userData.segments = n, mesh;
  }
  function KL_label(lines, col) {
    const cv = document.createElement("canvas");
    cv.width = 512, cv.height = 128;
    const x = cv.getContext("2d");
    x.fillStyle = "#2a1a0c", x.fillRect(0, 0, 512, 128), x.strokeStyle = col || "#ffcf4d", x.lineWidth = 8, x.strokeRect(6, 6, 500, 116);
    x.fillStyle = col || "#ffcf4d", x.textAlign = "center", x.textBaseline = "middle";
    x.font = "bold 54px system-ui, sans-serif", x.fillText(lines[0], 256, lines[1] ? 46 : 64);
    lines[1] && (x.font = "bold 30px system-ui, sans-serif", x.fillText(lines[1], 256, 98));
    return new wn(cv);
  }
  function KL_gateMesh(g) {
    const cf = KL_cfg().tor || {}, w = g.w, H = cf.hoehe || 6.5, grp = new pe(), B = new Ot(), st = [0.56, 0.53, 0.49], dk = [0.44, 0.41, 0.38];
    for (const s of [-1, 1]) {
      const x = s * (w / 2 + 1.2);
      B.box(x, H / 2, 0, 2.4, H, 2.8, 0, st), B.box(x, H + 0.3, 0, 2.8, 0.6, 3.2, 0, dk);
      for (const q of [-0.9, 0.9]) B.box(x + q, H + 0.95, 0, 0.6, 0.8, 3.2, 0, st);
    }
    B.box(0, H - 0.8, 0, w + 0.2, 1.6, 2.6, 0, st), B.box(0, H + 0.1, 0, w + 0.6, 0.3, 3, 0, dk);
    const body = new zt(B.toGeometry(), new ae({ vertexColors: true, roughness: 0.9 }));
    grp.add(body);
    // Torfluegel (drehen sich beim Oeffnen)
    const doors = [], dm = new ae({ vertexColors: true, roughness: 0.8 });
    for (const s of [-1, 1]) {
      // Gitterfluegel: man sieht durch das geschlossene Tor schon die naechste Welt
      const piv = new pe(), D = new Ot(), dw = w / 2, dh = H - 1.6, ir = [0.16, 0.15, 0.15], gd = [0.72, 0.56, 0.2];
      for (let x = 0.15; x < dw - 0.05; x += 0.42) D.box(-s * x, dh / 2, 0, 0.09, dh, 0.09, 0, ir), D.box(-s * x, dh + 0.12, 0, 0.16, 0.3, 0.16, 0, gd);
      for (const y of [0.45, dh * 0.5, dh - 0.25]) D.box(-s * dw / 2, y, 0, dw - 0.05, 0.14, 0.16, 0, ir);
      D.box(-s * (dw - 0.08), dh / 2, 0, 0.16, dh, 0.2, 0, ir);
      piv.add(new zt(D.toGeometry(), dm)), piv.position.set(s * w / 2, 0, 0), grp.add(piv), doors.push({ piv, s });
    }
    // magischer Lichtschleier im geschlossenen Tor
    const cv = document.createElement("canvas");
    cv.width = 64, cv.height = 128;
    const cx = cv.getContext("2d"), gr = cx.createLinearGradient(0, 128, 0, 0);
    gr.addColorStop(0, "rgba(255,215,94,0.55)"), gr.addColorStop(0.6, "rgba(150,200,255,0.25)"), gr.addColorStop(1, "rgba(150,200,255,0)"), cx.fillStyle = gr, cx.fillRect(0, 0, 64, 128);
    for (let i = 0; i < 40; i++) cx.fillStyle = "rgba(255,255,255," + (0.2 + Math.random() * 0.5) + ")", cx.fillRect(Math.random() * 64, Math.random() * 128, 1.5, 1.5);
    const ctex = new wn(cv);
    ctex.wrapS = ctex.wrapT = 1e3;
    const CG = new Ot(), hw2 = w / 2 - 0.1, ch = H - 1.7;
    for (const z of [-0.35, 0.35]) CG.quad([-hw2, 0, z], [hw2, 0, z], [hw2, ch, z], [-hw2, ch, z], [0, 0], [2, 0], [2, 1], [0, 1], [1, 1, 1], [0, 0, z > 0 ? 1 : -1]);
    const cm = new se({ map: ctex, transparent: true, depthWrite: false, side: Ue, blending: Ee, opacity: 0.55 }), curtain = new zt(CG.toGeometry(), cm);
    curtain.renderOrder = 7, grp.add(curtain), grp.userData.curtain = curtain, grp.userData.ctex = ctex;
    // Leuchten beim Oeffnen
    const GG = new Ot();
    GG.quad([-w, 0, 0], [w, 0, 0], [w, H + 3, 0], [-w, H + 3, 0], [0, 0], [1, 0], [1, 1], [0, 1], [1, 1, 1], [0, 0, 1]);
    const gm = new se({ map: ctex, transparent: true, depthWrite: false, side: Ue, blending: Ee, opacity: 0, color: 16767839 });
    const halo = new zt(GG.toGeometry(), gm);
    halo.renderOrder = 8, grp.add(halo), grp.userData.halo = halo, grp.userData.gm = gm;
    // Schilder auf beiden Seiten: wohin fuehrt das Tor?
    const nA = KL_side(g.c, g.t, g.bridge ? g.side : g.von), front = [g.von, g.nach];
    for (const s of [1, -1]) {
      // s = 1: Seite in Richtung nA (dort steht man in Klasse "von" bzw. "side") -> Ziel ist die andere Klasse
      const here = g.bridge ? g.side : g.von, there = g.bridge ? (g.side === g.von ? g.nach : g.von) : g.nach;
      const from = s === 1 ? here : there, to = s === 1 ? there : here;
      const tx = KL_label(["Klasse " + to, g.bridge ? "Brücke · Abschlussprüfung " + Math.min(from, to) : from < to ? "Abschlussprüfung Klasse " + from : "zurück"]);
      const G = new Ot(), z0 = 1.32 * s, y0 = H - 1.5, y1 = H - 0.1, hw = w / 2 - 0.2;
      G.quad([-hw, y0, z0], [hw, y0, z0], [hw, y1, z0], [-hw, y1, z0], [s > 0 ? 0 : 1, 0], [s > 0 ? 1 : 0, 0], [s > 0 ? 1 : 0, 1], [s > 0 ? 0 : 1, 1], [1, 1, 1], [0, 0, s]);
      const sg = new zt(G.toGeometry(), new se({ map: tx }));
      grp.add(sg);
      front.push(nA);
    }
    // Ausrichtung: lokale x-Achse = Mauerrichtung, lokale +z zeigt in Richtung nA
    const th = Math.atan2(-g.t[1], g.t[0]);
    grp.rotation.y = th, grp.position.set(g.c[0], 0, g.c[1]);
    const lz = [Math.sin(th), Math.cos(th)];
    lz[0] * nA[0] + lz[1] * nA[1] < 0 && (grp.rotation.y = th + Math.PI);
    grp.userData.doors = doors, grp.userData.ang = 0;
    return grp;
  }
  function KL_doors(g, dt) {
    if (!g.mesh) return;
    const want = g.open ? 1.55 : 0, u = g.mesh.userData;
    u.ang += Math.max(-dt * (u.glowT > 0 ? 0.5 : 1.4), Math.min(dt * (u.glowT > 0 ? 0.5 : 1.4), want - u.ang));
    for (const d of u.doors) d.piv.rotation.y = d.s * u.ang;
    const t = performance.now() / 1e3;
    u.curtain && (u.curtain.visible = u.ang < 0.2, u.ctex.offset.set(Math.sin(t * 0.3) * 0.2, -t * 0.12));
    if (u.glowT > 0) u.glowT -= dt, u.gm.opacity = Math.min(1, u.glowT / 2) * (0.6 + 0.4 * Math.sin(t * 6));
    else u.gm && u.gm.opacity && (u.gm.opacity = 0);
  }
  // Tor zur Klasse k leuchtet und oeffnet sich langsam (nach bestandener Pruefung)
  function KL_glow(k) {
    for (const g of KL.gates) if (Math.max(g.von, g.nach) === k && g.mesh) g.mesh.userData.glowT = 10;
  }
  function KL_build() {
    KL.built = true;
    KL_lines(), KL_mkGates(), KL_raster();
    const root = new pe();
    root.name = "klassen-zonen", root.add(KL_wallMesh());
    for (const g of KL.gates) g.mesh = KL_gateMesh(g), root.add(g.mesh);
    ZN.scene.add(root), KL.root = root;
    KL_applyGates();
  }

  // ---------- Bedienung: Knopf am Tor, Pruefungs-Hinweis ----------
  function KL_ui() {
    if (KL.btn) return;
    const b = document.createElement("button");
    b.id = "kl-tor", b.style.cssText = "position:fixed;left:50%;bottom:132px;transform:translateX(-50%);z-index:55;display:none;padding:12px 20px;border-radius:16px;border:2px solid #ffcf4d;background:rgba(40,24,8,.94);color:#fff;font:800 16px system-ui;box-shadow:0 6px 20px rgba(0,0,0,.5)";
    b.addEventListener("click", (e) => (e.stopPropagation(), KL.near && KL_tap(KL.near)));
    document.body.append(b), KL.btn = b;
  }
  function KL_dialog(title, text, buttons) {
    KL.msg && KL.msg.remove();
    const w = document.createElement("div");
    w.style.cssText = "position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55)";
    const box = document.createElement("div");
    box.style.cssText = "max-width:360px;width:88%;padding:20px;border-radius:18px;background:#1d1408;border:2px solid #ffcf4d;color:#fff;font:15px system-ui;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.6)";
    const h = document.createElement("h2");
    h.style.cssText = "margin:0 0 10px;font-size:20px;color:#ffcf4d", h.textContent = title;
    const p = document.createElement("p");
    p.style.cssText = "margin:0 0 16px;line-height:1.45", p.textContent = text;
    box.append(h, p);
    for (const [lbl, fn, main] of buttons) {
      const bt = document.createElement("button");
      bt.textContent = lbl, bt.style.cssText = "display:block;width:100%;margin:8px 0 0;padding:11px;border-radius:12px;border:0;font:800 15px system-ui;cursor:pointer;" + (main ? "background:#ffcf4d;color:#2a1a0c" : "background:#3a2c18;color:#fff");
      bt.addEventListener("click", () => (w.remove(), KL.msg = null, fn && fn())), box.append(bt);
    }
    w.append(box), w.addEventListener("click", (e) => e.target === w && (w.remove(), KL.msg = null)), document.body.append(w), KL.msg = w;
  }
  function KL_exam(g) {
    const from = Math.min(g.von, g.nach), to = Math.max(g.von, g.nach);
    if (typeof window.__klassenExam === "function") return window.__klassenExam({ gate: g.id, von: from, nach: to });
    KL_dialog("\u{1F393} Abschlussprüfung Klasse " + from, "Dieses Tor führt in die Klasse " + to + ". Um hindurchzukommen, musst du hier die Abschlussprüfung der Klasse " + from + " bestehen. Die Prüfung wird gerade vorbereitet und kommt bald. Bis dahin bleibt das Tor geschlossen.", [["OK", null, true]]);
  }
  function KL_tap(g) {
    if (KL.bridge) return;
    if (Ae && Ae.admin && window.__prPreview) return KL_dialog("\u{1F6E1} Admin", "Das Tor ist für dich offen. Du kannst dir auch ansehen, was ein Kind hier sieht.", [[g.bridge ? "\u{1F309} Brücke benutzen" : "OK", g.bridge ? () => KL_bridgeStart(g) : null, !g.bridge], ["\u{1F440} Vorschau: Fenster wie beim Kind", () => window.__prPreview(g), true]]);
    const cur = KL_at(window.__api.player.x, window.__api.player.z), target = g.bridge ? (g.side === g.von ? g.nach : g.von) : cur === g.von ? g.nach : g.von;
    if (g.bridge) {
      if (KL_ok(g.von) && KL_ok(g.nach)) return KL_bridgeStart(g);
      return KL_exam(g);
    }
    if (g.open) return KL_dialog("\u{1F3F0} Das Tor ist offen", "Geh einfach hindurch – dahinter liegt Klasse " + target + ".", [["OK", null, true]]);
    KL_exam(g);
  }
  function KL_nearGate() {
    const pl = window.__api && window.__api.player;
    if (!pl || KL.bridge || window.__quizOpen) return null;
    let best = null, bd = 9;
    for (const g of KL.gates) {
      const d = Math.hypot(pl.x - g.c[0], pl.z - g.c[1]);
      if (d >= bd) continue;
      if (g.bridge && KL_at(pl.x, pl.z) !== g.side) continue;
      bd = d, best = g;
    }
    return best;
  }
  function KL_updBtn() {
    KL_ui();
    const g = KL_nearGate(), b = KL.btn, ov = document.querySelector(".qbox");
    KL.near = g;
    if (!g || ov || KL.msg) return void (b.style.display = "none");
    const cur = KL_at(window.__api.player.x, window.__api.player.z), to = g.bridge ? (g.side === g.von ? g.nach : g.von) : cur === g.von ? g.nach : g.von;
    b.textContent = g.bridge ? (KL_ok(g.von) && KL_ok(g.nach) ? "\u{1F309} Brücke zu Klasse " + to : "\u{1F512} Tor zu Klasse " + to) : g.open ? "\u{1F3F0} Tor zu Klasse " + to + " (offen)" : "\u{1F512} Tor zu Klasse " + to;
    b.style.display = "block";
  }

  // ---------- Bruecke ----------
  function KL_bridgeStart(g) {
    const g2 = KL.gates.find((x) => x.id === g.pairId), pl = window.__api.player;
    if (!g2 || !pl) return;
    const here = g.side, there = g2.side, nA = KL_side(g.c, g.t, here), nB = KL_side(g2.c, g2.t, there);
    const S = [g.c[0] + nA[0] * 3.5, g.c[1] + nA[1] * 3.5], E = [g2.c[0] + nB[0] * 3.5, g2.c[1] + nB[1] * 3.5];
    const L = Math.hypot(E[0] - S[0], E[1] - S[1]), Hh = Math.min(14, Math.max(6, L * 0.09)), N = Math.max(12, Math.ceil(L / 2.5));
    const P = (t) => [S[0] + (E[0] - S[0]) * t, Hh * Math.pow(Math.sin(Math.PI * t), 0.75), S[1] + (E[1] - S[1]) * t];
    const grp = new pe(), deck = new ae({ vertexColors: true, roughness: 0.75, emissive: 3346688, emissiveIntensity: 0.35 }), segs = [];
    for (let i = 0; i < N; i++) {
      const a = P(i / N), b = P((i + 1) / N), B = new Ot(), dx = b[0] - a[0], dz = b[2] - a[2], l = Math.hypot(dx, dz) || 1, nx = -dz / l, nz = dx / l;
      KL_slab(B, a, b, 4.4, 0.35, [0.58, 0.4, 0.22]);
      for (const s of [1, -1]) {
        const ra = [a[0] + nx * 2.1 * s, a[1] + 1.05, a[2] + nz * 2.1 * s], rb = [b[0] + nx * 2.1 * s, b[1] + 1.05, b[2] + nz * 2.1 * s];
        KL_slab(B, ra, rb, 0.16, 0.16, [0.36, 0.22, 0.1]), B.box(ra[0], a[1] + 0.5, ra[2], 0.18, 1.05, 0.18, 0, [0.36, 0.22, 0.1]);
      }
      if (i % 4 === 2 && a[1] > 1.5) B.box(a[0], a[1] / 2 - 0.2, a[2], 0.9, a[1], 0.9, -Math.atan2(dz, dx), [0.5, 0.47, 0.43]);
      const m = new zt(B.toGeometry(), deck);
      m.visible = false, grp.add(m), segs.push(m);
    }
    ZN.scene.add(grp);
    const gm = window.__api.game, peace0 = gm && gm.peace;
    gm && (gm.peace = true);
    KL.bridge = { g, g2, S, E, L, P, N, segs, grp, ph: "bauen", t: 0, pl, peace0, start: [pl.x, pl.z], there };
    KL_applyGates(), KL.btn && (KL.btn.style.display = "none");
    try {
      Zs("\u{1F309} Die Brücke zu Klasse " + there + " baut sich auf …");
    } catch {
    }
    pl.path = null, pl.script = (dt) => KL_walk(dt);
  }
  // Spielerbewegung waehrend der Bruecke (wird aus der Spieler-Aktualisierung aufgerufen)
  function KL_walk(dt) {
    const B = KL.bridge, pl = B && B.pl;
    if (!B) return false;
    if (B.ph === "bauen") {
      const k = Math.min(1, B.t / 0.6);
      pl.x = B.start[0] + (B.S[0] - B.start[0]) * k, pl.z = B.start[1] + (B.S[1] - B.start[1]) * k, pl.y = 0;
      pl.yaw = Math.atan2(B.E[0] - B.S[0], B.E[1] - B.S[1]), pl.speed = k < 1 ? 3 : 0;
      return true;
    }
    if (B.ph === "laufen") {
      const t = Math.min(1, B.u), p = B.P(t);
      pl.x = p[0], pl.z = p[2], pl.y = Math.max(0, p[1]), pl.yaw = Math.atan2(B.E[0] - B.S[0], B.E[1] - B.S[1]);
      pl.speed = 5.5, pl.phase += 5.5 * dt * 2.3;
      return true;
    }
    return false;
  }
  function KL_bridgeTick(dt) {
    const B = KL.bridge;
    if (!B) return;
    B.t += dt;
    const ease = (x) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
    if (B.ph === "bauen") {
      const T = 2.2;
      B.segs.forEach((m, i) => {
        const k = ease((B.t - i / B.N * T) / 0.35);
        m.visible = k > 0, m.position.y = -6 * (1 - k), m.scale.setScalar(0.4 + 0.6 * k);
      });
      B.t > T + 0.4 && (B.ph = "laufen", B.u = 0, B.t = 0);
    } else if (B.ph === "laufen") {
      B.u += dt * 9 / Math.max(1, B.L * 1.04);
      if (B.u >= 1) {
        const q = ZN.o.walk.nearest(B.E[0], B.E[1]) || B.E;
        B.pl.x = q[0], B.pl.z = q[1], B.pl.y = 0, B.pl.script = null, B.pl.path = null, B.ph = "abbauen", B.t = 0;
        const gm = window.__api.game;
        gm && (gm.peace = B.peace0);
        try {
          const D = window.__api.creatures && window.__api.creatures.dog;
          D && (D.x = q[0] - 1.5, D.z = q[1] - 1.5, D.path = null);
        } catch {
        }
        try {
          Zs("✅ Willkommen in Klasse " + B.there + "!");
        } catch {
        }
      }
    } else if (B.ph === "abbauen") {
      const T = 1.8;
      B.segs.forEach((m, i) => {
        const k = ease((B.t - i / B.N * T) / 0.35);
        m.position.y = -7 * k, m.scale.setScalar(1 - 0.6 * k), m.visible = k < 1;
      });
      if (B.t > T + 0.5) {
        ZN.scene.remove(B.grp);
        for (const m of B.segs) m.geometry.dispose();
        KL.bridge = null, KL_applyGates();
      }
    }
  }

  // ---------- Spieler in gesperrter Klasse -> zurueck zum Start ----------
  function KL_guard() {
    const pl = window.__api && window.__api.player;
    if (!pl || KL.bridge) return;
    const k = KL_at(pl.x, pl.z);
    if (k && !KL_ok(k)) {
      const q = ZN.o.walk.nearest(2.6, 9) || [2.6, 9];
      pl.x = q[0], pl.z = q[1], pl.path = null;
      try {
        Zs("\u{1F512} Klasse " + k + " ist noch gesperrt.");
      } catch {
      }
    }
  }
  function KL_init() {
    if (!KL_prepare()) return;
    let tPrev = performance.now();
    (function tick() {
      const now = performance.now(), dt = Math.min(0.05, (now - tPrev) / 1e3);
      tPrev = now;
      try {
        const z2 = KL_geo("z2");
        !KL.built && z2 && z2.o2 && KL_build();
        if (KL.built) {
          KL_bridgeTick(Math.min(0.25, (now - (KL.tb || now)) / 1e3)), KL.tb = now;
          for (const g of KL.gates) KL_doors(g, dt);
        }
      } catch (e) {
        console.warn("Klassen-Zonen:", e);
      }
      requestAnimationFrame(tick);
    })();
    setInterval(() => {
      try {
        KL.built && (KL_applyGates(), KL_guard(), KL_updBtn());
      } catch (e) {
        KL.err = String(e && e.message || e);
      }
    }, 400);
    window.__klassen = {
      info: () => ({ on: KL.on, built: KL.built, zonen: KL.zones.map((z) => ({ id: z.id, klasse: z.klasse, frei: KL_ok(z.klasse) })), mauern: KL.runs.length, mauerPunkte: KL.runs.reduce((s, r) => s + r.pts.length, 0), tore: KL.gates.map((g) => ({ id: g.id, klasse: [g.von, g.nach], offen: !!g.open, bruecke: g.bridge, x: Math.round(g.c[0]), z: Math.round(g.c[1]), zellen: (g.cells || []).length })), bruecke: KL.bridge ? KL.bridge.ph : null }),
      at: KL_at,
      ok: KL_ok,
      tap: (id) => {
        const g = KL.gates.find((x) => x.id === id);
        g && KL_tap(g);
      },
      bridge: (id) => {
        const g = KL.gates.find((x) => x.id === id);
        g && KL_bridgeStart(g);
      },
      gates: () => KL.gates,
      guard: () => (KL_guard(), KL.err || null)
    };
  }
