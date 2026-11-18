  // ===== NATUR: Modelle aus "Stylized Nature MegaKit" (Quaternius, CC0) =====
  // Baeume in 3 Stufen (nah: volles Modell, mittel: ausgeduennt, fern: Bild), Bodenbewuchs rund um die Kamera, Wind.
  const NATD = __NATUR_JSON__;
  const NAT = { T: { value: 0 }, mats: null, G: {}, worlds: [], cl: null };
  const NAT_M4 = new ve(), NAT_Q = new En(), NAT_P = new Y(), NAT_S = new Y(), NAT_UP = new Y(0, 1, 0), NAT_C = new Xt();
  function NAT_dec(s, T) {
    const b = atob(s), u = new Uint8Array(b.length);
    for (let k = 0; k < b.length; k++) u[k] = b.charCodeAt(k);
    return new T(u.buffer);
  }
  function NAT_geo(e) {
    const p = NAT_dec(e.p, Int16Array), n = NAT_dec(e.n, Int8Array), u = NAT_dec(e.u, Int16Array), c = NAT_dec(e.c, Uint8Array), ix = NAT_dec(e.i, Uint16Array);
    const nv = c.length, P = new Float32Array(nv * 3), N = new Float32Array(nv * 3), U = new Float32Array(nv * 2), C = new Float32Array(nv * 3);
    for (let k = 0; k < nv * 3; k++) P[k] = p[k] * e.s, N[k] = n[k] / 127;
    for (let k = 0; k < nv * 2; k++) U[k] = u[k] * e.us;
    for (let k = 0; k < nv; k++) C[k * 3] = C[k * 3 + 1] = C[k * 3 + 2] = c[k] / 255;
    const g = new we();
    g.setAttribute("position", new de(P, 3)), g.setAttribute("normal", new de(N, 3)), g.setAttribute("uv", new de(U, 2)), g.setAttribute("color", new de(C, 3));
    g.setIndex(new xe(ix, 1)), g.computeBoundingSphere();
    return g;
  }
  function NAT_tex(src, rep) {
    const im = new Image(), tx = Qi(im, { repeat: rep, aniso: 4 });
    tx.flipY = false, tx.needsUpdate = false;
    im.onload = () => {
      tx.needsUpdate = true;
    };
    im.src = src;
    return tx;
  }
  // Wind: Blaetter und Gras wiegen sich, je hoeher, desto mehr
  function NAT_glow(sh, em) {
    sh.fragmentShader = sh.fragmentShader.replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n totalEmissiveRadiance += diffuseColor.rgb * " + em.toFixed(3) + ";");
  }
  function NAT_wind(m, amp, key, em) {
    m.customProgramCacheKey = () => "natw" + key;
    m.onBeforeCompile = (sh) => {
      NAT_glow(sh, em);
      sh.uniforms.uT = NAT.T;
      sh.vertexShader = "uniform float uT;\n" + sh.vertexShader.replace("#include <begin_vertex>", `#include <begin_vertex>
        #ifdef USE_INSTANCING
        vec2 nip = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
        #else
        vec2 nip = vec2(0.0);
        #endif
        float nph = uT * 1.7 + nip.x * 0.23 + nip.y * 0.19;
        float nw = max(position.y, 0.0) * ${amp.toFixed(4)};
        transformed.x += (sin(nph) + 0.35 * sin(nph * 2.7 + 1.1)) * nw;
        transformed.z += cos(nph * 0.83 + 1.3) * nw * 0.6;`);
    };
  }
  function NAT_init() {
    if (NAT.mats) return;
    const T = NATD.tex, lf = (k) => new ae({ map: NAT_tex(T[k], false), alphaTest: 0.5, side: Ue, roughness: 0.88, envMapIntensity: 0.3 });
    const M = NAT.mats = {
      bark: new ae({ map: NAT_tex(T.bark, true), vertexColors: true, roughness: 0.95, envMapIntensity: 0.3 }),
      leafN: lf("leafN"),
      leafP: lf("leafP"),
      imp: new ae({ map: NAT_tex(T.imp, false), alphaTest: 0.45, side: Ue, roughness: 0.95, envMapIntensity: 0.25 }),
      sway: new ae({ map: NAT_tex(T.atlas, false), alphaTest: 0.5, side: Ue, vertexColors: true, roughness: 0.9, envMapIntensity: 0.3 }),
      still: new ae({ map: NAT_tex(T.atlas, false), alphaTest: 0.5, vertexColors: true, roughness: 0.92, envMapIntensity: 0.3 })
    };
    NAT_wind(M.leafN, 0.012, "lN", 0.32), NAT_wind(M.leafP, 0.008, "lP", 0.3), NAT_wind(M.sway, 0.07, "sw", 0.28);
    M.still.customProgramCacheKey = () => "natst", M.still.onBeforeCompile = (sh) => NAT_glow(sh, 0.18);
    M.bark.customProgramCacheKey = () => "natbk", M.bark.onBeforeCompile = (sh) => NAT_glow(sh, 0.12);
    // Fernbild: Atlas-Spalte pro Baumart
    const nv = NATD.impOrder.length;
    M.imp.customProgramCacheKey = () => "natimp";
    M.imp.onBeforeCompile = (sh) => {
      NAT_glow(sh, 0.34);
      sh.vertexShader = "attribute float aOff;\n" + sh.vertexShader.replace("#include <uv_vertex>", "#include <uv_vertex>\n vMapUv.x = (vMapUv.x + aOff) / " + nv.toFixed(1) + ";");
    };
    // Fernbild-Geometrie: 2 senkrechte Flaechen + 1 Draufsicht (Einheitsgroesse)
    const V = 256 / 384, P = [], N = [], U = [], I = [];
    const quad = (a, b, c, d, ua, ub, uc, ud) => {
      const o = P.length / 3;
      for (const [q, w] of [[a, ua], [b, ub], [c, uc], [d, ud]]) P.push(...q), N.push(0, 1, 0), U.push(...w);
      I.push(o, o + 1, o + 2, o, o + 2, o + 3);
    };
    quad([-1, 0, 0], [1, 0, 0], [1, 1, 0], [-1, 1, 0], [0, V], [1, V], [1, 0], [0, 0]);
    quad([0, 0, 1], [0, 0, -1], [0, 1, -1], [0, 1, 1], [0, V], [1, V], [1, 0], [0, 0]);
    quad([-1, 0.72, -1], [1, 0.72, -1], [1, 0.72, 1], [-1, 0.72, 1], [0, V], [1, V], [1, 1], [0, 1]);
    const gi = new we();
    gi.setAttribute("position", new de(P, 3)), gi.setAttribute("normal", new de(N, 3)), gi.setAttribute("uv", new de(U, 2)), gi.setIndex(I), gi.computeBoundingSphere();
    NAT.impGeo = gi;
    for (const t of NATD.impOrder) {
      const d = NATD.trees[t];
      NAT.G[t] = { l0: [NAT_geo(d.l0.bark), NAT_geo(d.l0.leaf)], l1: [NAT_geo(d.l1.bark), NAT_geo(d.l1.leaf)] };
    }
    NAT.CG = {};
    for (const k in NATD.clutter) NAT.CG[k] = NAT_geo(NATD.clutter[k]);
    let t0 = performance.now();
    (function tick() {
      NAT.T.value = (performance.now() - t0) / 1e3;
      requestAnimationFrame(tick);
    })();
  }
  function NAT_inst(geo, mat, n, root, shadow) {
    const m = new ri(geo, mat, Math.max(1, n));
    m.count = 0, m.visible = false, m.frustumCulled = false, m.castShadow = !!shadow, m.receiveShadow = false;
    m.instanceMatrix.setUsage(35048);
    root.add(m);
    return m;
  }
  function NAT_hash(x, z, s) {
    let h = Math.imul(x | 0, 374761393) ^ Math.imul(z | 0, 668265263) ^ Math.imul(s | 0, 2246822519);
    h = Math.imul(h ^ h >>> 13, 1274126177);
    return ((h ^ h >>> 16) >>> 0) / 4294967296;
  }
  // Wem gehoert ein Punkt? (Zone 2 hat Vorrang in ihrem Gebiet)
  function NAT_owner(x, z) {
    for (let k = NAT.worlds.length - 1; k >= 0; k--) {
      const w = NAT.worlds[k];
      if (!w.i.root.visible) continue;
      if (w.poly) {
        if (ZN_inPoly(x, z, w.poly)) return w;
      } else if (x >= w.b.x0 && x <= w.b.x1 && z >= w.b.z0 && z <= w.b.z1) return w;
    }
    return null;
  }
  const NAT_LEAF = [[0.43, 0.6, 0.05], [0.36, 0.58, 0.1], [0.5, 0.64, 0.08], [0.3, 0.52, 0.06], [0.46, 0.66, 0.16]];
  const NAT_AUT = [[1, 0.78, 0.22], [1, 0.55, 0.14], [0.95, 0.33, 0.12], [0.98, 0.66, 0.2]];
  function NAT_world(i, data, e, list) {
    NAT_init();
    const mob = Ur, D0 = mob ? 38 : 60, D1 = mob ? 115 : 170;
    const W = { i, b: i.bounds, poly: null, items: [], m: {}, last: null };
    if (data && data.zoneId) {
      const z = ZN_zones().find((zz) => zz.id === data.zoneId);
      W.poly = z && z.wpoly || null;
    }
    const order = NATD.impOrder, nCommon = 5, rnd = me(4711 + (data && data.zoneId ? data.zoneId.length * 97 : 0));
    const count = {};
    for (const t of order) count[t] = 0;
    for (const it of list) {
      const forest = i.clsAt(it.x, it.z) === 6, pine = rnd() < (forest ? 0.55 : 0.15);
      const v = pine ? nCommon + (rnd() * 5 | 0) : rnd() * 5 | 0, t = order[v], d = NATD.trees[t];
      const s = it.sx * 0.95, sy = it.sy / it.sx;
      let col;
      if (pine) {
        const f = 0.85 + rnd() * 0.3;
        col = [0.25 * f, 0.44 * f, 0.06 * f];
      } else if (rnd() < 0.17) col = NAT_AUT[rnd() * NAT_AUT.length | 0];
      else {
        const c = NAT_LEAF[rnd() * NAT_LEAF.length | 0], f = 0.88 + rnd() * 0.24;
        col = [c[0] * f, c[1] * f, c[2] * f];
      }
      const rot = it.rot;
      NAT_Q.setFromAxisAngle(NAT_UP, rot), NAT_P.set(it.x, 0, it.z), NAT_S.set(s, s * sy, s), NAT_M4.compose(NAT_P, NAT_Q, NAT_S);
      const mf = NAT_M4.toArray(new Float32Array(16));
      const [iw, ih, iy] = d.imp;
      NAT_P.set(it.x, iy * s * sy, it.z), NAT_S.set(iw * s, (ih - iy) * s * sy, iw * s), NAT_M4.compose(NAT_P, NAT_Q, NAT_S);
      const mi = NAT_M4.toArray(new Float32Array(16));
      W.items.push({ x: it.x, z: it.z, v, t, mf, mi, col: new Xt().setRGB(col[0] * 1.25, col[1] * 1.25, col[2] * 1.25, Se) });
      count[t]++;
    }
    const sh = e.shadows;
    for (const t of order) {
      const g = NAT.G[t], lm = NAT.mats[NATD.trees[t].lf];
      W.m[t] = [[NAT_inst(g.l0[0], NAT.mats.bark, count[t], i.root, sh), NAT_inst(g.l0[1], lm, count[t], i.root, sh)],
        [NAT_inst(g.l1[0], NAT.mats.bark, count[t], i.root, sh), NAT_inst(g.l1[1], lm, count[t], i.root, sh)]];
    }
    const imp = NAT_inst(NAT.impGeo, NAT.mats.imp, W.items.length, i.root, false);
    const aOff = new Lo(new Float32Array(Math.max(1, W.items.length)), 1);
    aOff.setUsage(35048), NAT.impGeo === imp.geometry && (imp.geometry = NAT.impGeo.clone()), imp.geometry.setAttribute("aOff", aOff);
    W.imp = imp, W.aOff = aOff;
    NAT.worlds.push(W);
    i.natur = W;
    const put = (mesh, it, mat) => {
      const k = mesh.count++;
      mesh.instanceMatrix.array.set(mat, k * 16), mesh.setColorAt(k, it.col);
      return k;
    };
    const lod = (x, z, cd) => {
      cd = cd || 40;
      const L = W.last;
      if (L && Math.hypot(L[0] - x, L[1] - z) < 4 && Math.abs(L[2] - cd) < cd * 0.08) return;
      W.last = [x, z, cd];
      const ce = cd * 0.8;
      for (const t of order) for (const l of W.m[t]) for (const m of l) m.count = 0;
      imp.count = 0;
      const vis = i.root.visible;
      for (const it of W.items) {
        const dd = Math.hypot(it.x - x, it.z - z), de2 = Math.hypot(dd, ce);
        if (de2 < D1) {
          const l = W.m[it.t][de2 < D0 ? 0 : 1];
          const k = l[0].count++;
          l[0].instanceMatrix.array.set(it.mf, k * 16), put(l[1], it, it.mf);
        } else {
          const k = put(imp, it, it.mi);
          aOff.array[k] = it.v;
        }
      }
      for (const t of order) for (const l of W.m[t]) for (const m of l) {
        m.visible = m.count > 0;
        if (m.count) m.instanceMatrix.needsUpdate = true, m.instanceColor && (m.instanceColor.needsUpdate = true);
      }
      imp.visible = imp.count > 0;
      if (imp.count) imp.instanceMatrix.needsUpdate = true, imp.instanceColor.needsUpdate = true, aOff.needsUpdate = true;
    };
    i.treeLOD = (x, z, cd) => {
      lod(x, z, cd);
      NAT_clutter(i, x, z, cd);
    };
    i.treeLOD(0, 0, 40);
  }
  // ---- Bodenbewuchs: wird rund um die Kamera erzeugt (immer gleich, weil aus Koordinaten berechnet)
  const NAT_SET = {
    // [Art, Anteil, Groesse min, max, Farbe?]
    0: [["grassA", 0.34, 0.45, 0.7, 1], ["grassB", 0.1, 0.4, 0.6, 1], ["grassC", 0.06, 0.5, 0.75, 1], ["flowerC", 0.018, 0.35, 0.5], ["flowerD", 0.012, 0.32, 0.45], ["clover", 0.02, 0.45, 0.65], ["plant", 0.02, 0.6, 0.9], ["peb1", 0.012, 0.8, 1.6], ["peb3", 0.01, 0.8, 1.6]],
    5: [["grassA", 0.4, 0.5, 0.75, 1], ["grassB", 0.16, 0.45, 0.65, 1], ["grassD", 0.07, 0.45, 0.6, 1], ["flowerA", 0.04, 0.35, 0.5], ["flowerB", 0.018, 0.3, 0.42], ["flowerC", 0.03, 0.38, 0.52], ["flowerD", 0.02, 0.35, 0.48], ["clover2", 0.03, 0.45, 0.65], ["plant7", 0.02, 0.8, 1.2]],
    6: [["grassC", 0.14, 0.5, 0.75, 1], ["grassD", 0.08, 0.5, 0.7, 1], ["fern", 0.07, 0.24, 0.36], ["plant", 0.04, 0.7, 1.1], ["clover", 0.04, 0.5, 0.7], ["mush", 0.035, 0.7, 1.2], ["mushL", 0.006, 0.6, 0.9], ["plantB", 0.012, 0.3, 0.45], ["peb2", 0.01, 0.8, 1.5]]
  };
  const NAT_BIG = {
    0: [["bushF", 0.05, 0.7, 1.1], ["bush", 0.02, 0.6, 0.95, 2], ["rock2", 0.018, 0.35, 0.7], ["rock1", 0.01, 0.35, 0.65], ["peb4", 0.02, 1, 2]],
    5: [["bushF", 0.05, 0.75, 1.15], ["bush", 0.018, 0.6, 0.9, 2], ["rock3", 0.012, 0.3, 0.6], ["rock2", 0.012, 0.35, 0.65]],
    6: [["bushF", 0.06, 0.8, 1.2], ["bush", 0.04, 0.7, 1.05, 2], ["rock1", 0.03, 0.45, 0.9], ["rock3", 0.025, 0.4, 0.8], ["fern", 0.05, 0.3, 0.42], ["mushL", 0.01, 0.7, 1]]
  };
  function NAT_clutterInit(root) {
    const mob = Ur, C = NAT.cl = { R: mob ? 34 : 50, g: 1.5, R2: mob ? 80 : 120, g2: 4, m: {}, last: null };
    const est = Math.ceil(Math.PI * C.R * C.R / (C.g * C.g) * 0.7) + Math.ceil(Math.PI * C.R2 * C.R2 / (C.g2 * C.g2) * 0.12) + 50;
    for (const k in NATD.clutter) {
      const still = NATD.clutter[k].still;
      C.m[k] = NAT_inst(NAT.CG[k], still ? NAT.mats.still : NAT.mats.sway, est, root, false);
      C.m[k].receiveShadow = true;
    }
  }
  function NAT_free(w, x, z) {
    const i = w.i;
    for (const [a, b] of [[0, 0], [1.3, 0], [-1.3, 0], [0, 1.3], [0, -1.3]]) {
      const c = i.clsAt(x + a, z + b);
      if (c === 1 || c === 2 || c === 3 || c === 4) return false;
    }
    if (Math.hypot(x, z) < 19) return false;
    for (const s of i.stations) if (Math.hypot(x - s.x, z - s.z) < 9) return false;
    return true;
  }
  function NAT_clutter(i, x, z, cd) {
    if (NAT.worlds[0] && NAT.worlds[0].i !== i) return;
    const C = NAT.cl || NAT_clutterInit(i.root.parent || i.root) || NAT.cl;
    if (C.last && Math.hypot(C.last[0] - x, C.last[1] - z) < 5) return;
    C.last = [x, z];
    for (const k in C.m) C.m[k].count = 0;
    const add = (k, px, pz, s, h, tint) => {
      const m = C.m[k];
      if (m.count >= m.instanceMatrix.count) return;
      NAT_Q.setFromAxisAngle(NAT_UP, h * 6.283), NAT_P.set(px, 0, pz), NAT_S.set(s, s, s), NAT_M4.compose(NAT_P, NAT_Q, NAT_S);
      const n = m.count++;
      m.setMatrixAt(n, NAT_M4);
      if (tint === 1) NAT_C.setRGB(0.8 + h * 0.35, 0.95 + h * 0.1, 0.7 + h * 0.2, Se);
      else if (tint === 2) h < 0.5 ? NAT_C.setRGB(0.55, 1, 0.45, Se) : NAT_C.setRGB(1, 0.85, 0.7, Se);
      else NAT_C.setRGB(1, 1, 1, Se);
      m.setColorAt(n, NAT_C);
    };
    const pass = (R, g, SET, seed) => {
      const ix0 = Math.floor((x - R) / g), ix1 = Math.floor((x + R) / g), iz0 = Math.floor((z - R) / g), iz1 = Math.floor((z + R) / g);
      for (let a = ix0; a <= ix1; a++) for (let b = iz0; b <= iz1; b++) {
        const r0 = NAT_hash(a, b, seed);
        const px = (a + 0.15 + 0.7 * NAT_hash(a, b, seed + 1)) * g, pz = (b + 0.15 + 0.7 * NAT_hash(a, b, seed + 2)) * g;
        if ((px - x) * (px - x) + (pz - z) * (pz - z) > R * R) continue;
        const w = NAT_owner(px, pz);
        if (!w) continue;
        const L = SET[w.i.clsAt(px, pz)];
        if (!L) continue;
        let acc = 0, pick = null;
        for (const e of L) if (acc += e[1], r0 < acc) {
          pick = e;
          break;
        }
        if (!pick || !NAT_free(w, px, pz)) continue;
        const h = NAT_hash(a, b, seed + 3);
        add(pick[0], px, pz, pick[2] + (pick[3] - pick[2]) * h, h, pick[4]);
      }
    };
    pass(C.R, C.g, NAT_SET, 11), pass(C.R2, C.g2, NAT_BIG, 29);
    for (const k in C.m) {
      const m = C.m[k];
      m.visible = m.count > 0;
      if (m.count) m.instanceMatrix.needsUpdate = true, m.instanceColor && (m.instanceColor.needsUpdate = true);
    }
  }
  window.__nat = { stats: () => {
    const o = { welten: NAT.worlds.length, baeume: NAT.worlds.map((w) => w.items.length), tris: 0, draws: 0 };
    const cnt = (m) => {
      if (!m.visible || !m.count) return;
      const g = m.geometry, n = g.index ? g.index.count / 3 : g.attributes.position.count / 3;
      o.tris += n * m.count, o.draws++;
    };
    for (const w of NAT.worlds) {
      for (const t in w.m) for (const l of w.m[t]) for (const m of l) cnt(m);
      cnt(w.imp);
    }
    if (NAT.cl) for (const k in NAT.cl.m) cnt(NAT.cl.m[k]), o[k] = NAT.cl.m[k].count;
    o.tris = Math.round(o.tris);
    return o;
  } };
