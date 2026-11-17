  // ================= Zonen (17.11.2026) =================
  // Jede Zone ist eine eigene Einheit (geografische + optische Ebene, eigene ID).
  // Zone 1 = bisherige Karte (GEMEN_DATA, unveraendert). Weitere Zonen werden nur gebaut,
  // wenn der Spieler sie betreten darf (Admin oder Freischaltung vom Server) -> kurze Ladezeit fuer alle anderen.
  var ZN = { reg: null, o: null, scene: null, cfg: null, srv: [], key: null, fence: null, fog: null, ready: false };
  function ZN_zones() {
    return ZN.reg ? ZN.reg.zones : [];
  }
  function ZN_world(g, p) {
    return [(p[0] - g.home[0]) * g.scale, (p[1] - g.home[1]) * g.scale];
  }
  function ZN_inPoly(x, z, poly) {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const a = poly[i], b = poly[j];
      (a[1] > z) !== (b[1] > z) && x < (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]) + a[0] && (c = !c);
    }
    return c;
  }
  // Welche Zonen darf der aktuelle Spieler betreten?
  function ZN_allowed() {
    const s = new Set(["z1"]);
    for (const z of ZN_zones()) {
      if (z.status === "archived" || z.status === "off") continue;
      if (z.unlock && z.unlock.type === "always") s.add(z.id);
      else if (Ae && Ae.admin) s.add(z.id);
      else if (ZN.srv.includes(z.id)) s.add(z.id);
    }
    return s;
  }
  // Zone-1-Waldrand nicht in andere Zonen hineinwachsen lassen
  window.__zoneBlockRing = (x, z) => {
    for (const zz of ZN_zones()) if (zz.wpoly && ZN_inPoly(x, z, zz.wpoly)) return true;
    return false;
  };
  function ZN_prepare() {
    ZN.reg = window.GEMEN_ZONES || { zones: [] };
    for (const z of ZN_zones()) {
      if (z.geoData && z.geoData.polygon) z.wpoly = z.geoData.polygon.map((p) => ZN_world(z.geoData, p));
    }
  }
  ZN_prepare();
  // Grenze zwischen zwei Zonen in Weltkoordinaten (gemeinsame Kante mit Zone 1)
  function ZN_border(z) {
    const g = window.GEMEN_DATA, S = g.scale, hx = g.home[0], hy = g.home[1];
    const W = (px, py) => [(px - hx) * S, (py - hy) * S];
    // Zone 1 ist das Rechteck 0..w / 0..h (Pixel). Gemeinsame Kanten = Rand von Zone 1, der in der Zone liegt.
    const segs = [], step = 2;
    const edges = [[[0, 0], [0, g.h]], [[0, 0], [g.w, 0]], [[g.w, 0], [g.w, g.h]], [[0, g.h], [g.w, g.h]]];
    for (const [a, b] of edges) {
      const A = W(a[0], a[1]), B = W(b[0], b[1]), L = Math.hypot(B[0] - A[0], B[1] - A[1]), n = Math.ceil(L / step);
      let run = null;
      for (let i = 0; i <= n; i++) {
        const t = i / n, x = A[0] + (B[0] - A[0]) * t, y = A[1] + (B[1] - A[1]) * t;
        const nx = (B[1] - A[1]) / L, ny = -(B[0] - A[0]) / L;
        const inside = ZN_inPoly(x + nx * 1.5, y + ny * 1.5, z.wpoly) || ZN_inPoly(x - nx * 1.5, y - ny * 1.5, z.wpoly);
        if (inside) {
          run ? run.push([x, y]) : run = [[x, y]];
        } else if (run) {
          run.length > 1 && segs.push(run), run = null;
        }
      }
      run && run.length > 1 && segs.push(run);
    }
    return segs;
  }
  // Pink leuchtender Zaun
  function ZN_fence(z) {
    const op = z.optikData && z.optikData.fence || {}, col = parseInt(String(op.color || "#ff2bd6").slice(1), 16), H = op.height || 2.6;
    const B = new Ot(), grp = new pe(), segs = ZN_border(z);
    for (const run of segs) {
      for (let i = 0; i < run.length - 1; i++) {
        const a = run[i], b = run[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ang = -Math.atan2(b[1] - a[1], b[0] - a[0]);
        const mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
        B.box(a[0], H / 2, a[1], 0.18, H, 0.18, 0, [1, 1, 1]);
        for (const h of [0.5, 1.3, 2.1].filter((h) => h < H)) B.box(mx, h, mz, L, 0.08, 0.08, ang, [1, 1, 1]);
      }
      const e = run[run.length - 1];
      B.box(e[0], H / 2, e[1], 0.18, H, 0.18, 0, [1, 1, 1]);
    }
    const mat = new ae({ color: col, emissive: col, emissiveIntensity: op.glow || 1.8, roughness: 0.4, vertexColors: true });
    const m = new zt(B.toGeometry(), mat);
    grp.add(m);
    // weicher Lichtschein am Zaun
    const cv = document.createElement("canvas");
    cv.width = 4, cv.height = 64;
    const cx = cv.getContext("2d"), gr = cx.createLinearGradient(0, 64, 0, 0);
    gr.addColorStop(0, "rgba(255,60,220,0.55)"), gr.addColorStop(0.5, "rgba(255,60,220,0.18)"), gr.addColorStop(1, "rgba(255,60,220,0)");
    cx.fillStyle = gr, cx.fillRect(0, 0, 4, 64);
    const tex = new wn(cv), G = new Ot();
    for (const run of segs) for (let i = 0; i < run.length - 1; i++) {
      const a = run[i], b = run[i + 1];
      G.quad([a[0], 0, a[1]], [b[0], 0, b[1]], [b[0], H + 1.6, b[1]], [a[0], H + 1.6, a[1]], [0, 0], [1, 0], [1, 1], [0, 1], [1, 1, 1], null);
    }
    const glow = new zt(G.toGeometry(), new se({ map: tex, transparent: true, depthWrite: false, side: Ue, blending: Ee }));
    glow.renderOrder = 5, grp.add(glow);
    grp.userData.pulse = (t) => {
      mat.emissiveIntensity = (op.glow || 1.8) * (0.85 + 0.15 * Math.sin(t * 2.2));
    };
    return grp;
  }
  // Dichter Nebel ueber einer gesperrten Zone (nur Optik, beeintraechtigt Zone 1 nicht)
  function ZN_fog(z) {
    const op = z.optikData && z.optikData.fog || {}, grp = new pe();
    const cv = document.createElement("canvas");
    cv.width = cv.height = 128;
    const cx = cv.getContext("2d"), R = me(77);
    cx.fillStyle = "rgba(0,0,0,0)", cx.clearRect(0, 0, 128, 128);
    for (let i = 0; i < 70; i++) {
      const x = R() * 128, y = R() * 128, r = 10 + R() * 30, g = cx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,255,255,0.35)"), g.addColorStop(1, "rgba(255,255,255,0)");
      cx.fillStyle = g;
      for (const ox of [-128, 0, 128]) for (const oy of [-128, 0, 128]) cx.beginPath(), cx.arc(x + ox, y + oy, r, 0, 6.3), cx.fill();
    }
    const tex = new wn(cv);
    tex.wrapS = tex.wrapT = 1e3;
    const col = parseInt(String(op.color || "#8f7aa8").slice(1), 16);
    // Decke ueber der Zone (fuer die Ansicht von oben)
    const shape = z.wpoly, tri = Ji.triangulateShape(shape.map((p) => new Bt(p[0], p[1])), []), G = new Ot();
    for (const t of tri) {
      const a = shape[t[0]], b = shape[t[1]], c = shape[t[2]];
      G.tri([a[0], 0, a[1]], [b[0], 0, b[1]], [c[0], 0, c[1]], [a[0] / 40, a[1] / 40], [b[0] / 40, b[1] / 40], [c[0] / 40, c[1] / 40], [1, 1, 1], null);
    }
    const layers = [];
    for (const [h, o] of [[3, 0.55], [9, 0.45], [18, 0.35]]) {
      const mt = new se({ color: col, map: tex, transparent: true, opacity: (op.opacity || 0.86) * o + 0.2, depthWrite: false, side: Ue });
      const m = new zt(G.toGeometry(), mt);
      m.position.y = h, m.renderOrder = 6, grp.add(m), layers.push(mt);
    }
    // Nebelwand direkt hinter dem Zaun
    const W = new Ot();
    for (const run of ZN_border(z)) for (let i = 0; i < run.length - 1; i++) {
      const a = run[i], b = run[i + 1];
      W.quad([a[0], 0, a[1]], [b[0], 0, b[1]], [b[0], 26, b[1]], [a[0], 26, a[1]], [a[0] / 30 + a[1] / 30, 0], [b[0] / 30 + b[1] / 30, 0], [b[0] / 30 + b[1] / 30, 0.9], [a[0] / 30 + a[1] / 30, 0.9], [1, 1, 1], null);
    }
    const wm = new se({ color: col, map: tex, transparent: true, opacity: 0.9, depthWrite: false, side: Ue });
    for (const off of [1.2, 6, 14]) {
      const m = new zt(W.toGeometry(), wm);
      // Wand leicht in die Zone hinein versetzen (Zone 1 liegt rechts/unten vom Rand)
      m.position.x = -off, m.renderOrder = 6, grp.add(m);
    }
    grp.userData.pulse = (t) => {
      tex.offset.set(t * 0.004, t * 0.0025);
    };
    return grp;
  }
  // Lauf-Raster: ausserhalb von Zone 1 nur in erlaubten, bereits gebauten Zonen
  function ZN_hookWalk(o) {
    const w = o.walk, ok0 = w.ok;
    w.ok = (x, y) => {
      const gx = Math.floor(x - w.g0x), gy = Math.floor(y - w.g0z);
      if (gx >= 0 && gy >= 0 && gx < w.GW && gy < w.GH && !(ZN.inZone && ZN.inZone(x, y))) return ok0(x, y);
      for (const z of ZN_zones()) if (z.o2 && z.allowed && z.wpoly && ZN_inPoly(x, y, z.wpoly)) return z.o2.walk.ok(x, y);
      return gx >= 0 && gy >= 0 && gx < w.GW && gy < w.GH ? ok0(x, y) : false;
    };
    const n0 = w.nearest;
    w.nearest = (x, y) => {
      for (const z of ZN_zones()) if (z.o2 && z.allowed && z.wpoly && ZN_inPoly(x, y, z.wpoly)) return z.o2.walk.nearest(x, y);
      return n0(x, y);
    };
    ZN.inZone = (x, y) => {
      for (const z of ZN_zones()) if (z.o2 && z.allowed && z.wpoly && ZN_inPoly(x, y, z.wpoly)) return true;
      return false;
    };
  }
  async function ZN_build(z) {
    if (z.o2 || z.building) return;
    z.building = true;
    try {
      z.allowed && Zs("\u{1F5FA} " + z.name + " wird geladen …");
    } catch {
    }
    await Lr();
    const prev = window.__setDayMats, data = Object.assign({}, z.geoData, { zoneId: z.id });
    const o2 = await Du(data, ZN.scene, ZN.cfg);
    zu(o2, data, ZN.cfg);
    const f2 = window.__setDayMats;
    if (prev && f2 && f2 !== prev) window.__setDayMats = (d) => {
      prev(d), f2(d);
    };
    window.__setDayMats && window.__setDayMats(window.__day === true);
    const lod = ZN.o.treeLOD;
    lod && o2.treeLOD && (ZN.o.treeLOD = (x, y) => {
      lod(x, y), o2.treeLOD(x, y);
    });
    z.o2 = o2, z.building = false;
    ZN_apply();
    try {
      z.allowed && Zs("✅ " + z.name + " ist bereit.");
    } catch {
    }
  }
  function ZN_apply() {
    if (!ZN.ready) return;
    const al = ZN_allowed();
    for (const z of ZN_zones()) {
      if (z.id === "z1" || !z.wpoly) continue;
      z.allowed = al.has(z.id);
      const show = z.allowed || z.sichtbar;
      show && !z.o2 && ZN_build(z);
      z.o2 && (z.o2.root.visible = show);
      z.fog && (z.fog.visible = !z.allowed);
      // Spieler steht in einer Zone, die er nicht (mehr) betreten darf -> zurueck an den Start
      const api = window.__api, pl = api && api.player;
      if (!z.allowed && pl && ZN_inPoly(pl.x, pl.z, z.wpoly)) {
        const q = ZN.o.walk.nearest(2.6, 9) || [2.6, 9];
        pl.x = q[0], pl.z = q[1], pl.path = null;
      }
    }
  }
  async function ZN_check() {
    const key = Ae ? (Ae.admin ? "A:" : "K:") + (Ae.token || Ae.name || "") : "";
    if (key === ZN.key) return;
    ZN.key = key, ZN.srv = [];
    if (Ae && !Ae.admin) {
      const ck = "milo3d_zonen_" + (Ae.name || "");
      try {
        ZN.srv = JSON.parse(localStorage.getItem(ck) || "[]");
      } catch {
      }
      if (!Ae.offline && Ae.token) {
        const r = await KO_call("zoneAccess", {});
        if (r && r.j && Array.isArray(r.j.zones)) {
          ZN.srv = r.j.zones;
          try {
            localStorage.setItem(ck, JSON.stringify(ZN.srv));
          } catch {
          }
        }
      }
    }
    ZN_apply();
  }
  // Monster-Waechter: dichte Kette entlang der Grenze, auf der Seite von Zone 1
  function ZN_guards(z, mon) {
    const b = z.barrier, sp = b.spacing || 7, off = b.offset || 3.5, types = ["imp1", "pug1", "imp2", "pug2", "imp3", "pug3"];
    z.bsegs = [];
    let k = 0;
    for (const run of ZN_border(z)) {
      for (let i = 0; i < run.length - 1; i++) z.bsegs.push([run[i], run[i + 1]]);
      const a = run[0], c = run[run.length - 1], L = Math.hypot(c[0] - a[0], c[1] - a[1]) || 1;
      let nx = (c[1] - a[1]) / L, nz = -(c[0] - a[0]) / L;
      const mx = (a[0] + c[0]) / 2, mz = (a[1] + c[1]) / 2;
      ZN_inPoly(mx + nx * 2, mz + nz * 2, z.wpoly) && (nx = -nx, nz = -nz);
      const dx = (c[0] - a[0]) / L, dz = (c[1] - a[1]) / L;
      for (let d = sp / 2; d < L; d += sp) {
        const px = a[0] + dx * d + nx * off, pz = a[1] + dz * d + nz * off;
        const q = ZN.o.walk.nearest(px, pz);
        if (!q || Math.hypot(q[0] - px, q[1] - pz) > 9) continue;
        const h = sp * 0.6, C = mon.addGuard(types[k++ % types.length], q[0] - dx * h, q[1] - dz * h, q[0] + dx * h, q[1] + dz * h);
        C.guard.zone = z.id;
      }
    }
    z.guardCount = k;
  }
  function ZN_borderDist(z, x, y) {
    let best = 1e9;
    for (const [a, c] of z.bsegs || []) {
      const vx = c[0] - a[0], vz = c[1] - a[1], L2 = vx * vx + vz * vz || 1;
      let t = ((x - a[0]) * vx + (y - a[1]) * vz) / L2;
      t = Math.max(0, Math.min(1, t));
      best = Math.min(best, Math.hypot(x - a[0] - vx * t, y - a[1] - vz * t));
    }
    return best;
  }
  // Greifen die Waechter an? Nur den eigenen Spieler, nur ohne Freischaltung, nur nahe der Grenze.
  window.__zoneGuardHot = (C, PT) => {
    const api = window.__api, pl = api && api.player;
    if (!pl || PT !== pl) return false;
    const z = ZN_zones().find((zz) => zz.id === C.guard.zone);
    if (!z || z.allowed) return false;
    const b = z.barrier || {}, dB = ZN_borderDist(z, pl.x, pl.z);
    if (dB > (b.trigger || 12)) return false;
    return Math.hypot(C.x - pl.x, C.z - pl.z) < (b.range || 70);
  };
  // Aufruf nach dem Bau von Zone 1
  async function ZN_init(o, scene, cfg, mon) {
    ZN.o = o, ZN.scene = scene, ZN.cfg = cfg, ZN.mon = mon;
    ZN_hookWalk(o);
    for (const z of ZN_zones()) {
      if (z.id === "z1" || !z.wpoly) continue;
      const op = z.optikData || {};
      op.fence && (z.fence = ZN_fence(z), scene.add(z.fence));
      op.fog && (z.fog = ZN_fog(z), scene.add(z.fog));
      z.barrier && z.barrier.type === "monster" && mon && mon.addGuard && ZN_guards(z, mon);
    }
    const t0 = performance.now();
    (function tick() {
      const t = (performance.now() - t0) / 1e3;
      for (const z of ZN_zones()) {
        z.fence && z.fence.userData.pulse(t);
        z.fog && z.fog.visible && z.fog.userData.pulse(t);
      }
      requestAnimationFrame(tick);
    })();
    ZN.ready = true, setTimeout(ZN_apply, 2500);
    setInterval(ZN_check, 1500), ZN_check();
    window.__zones = { list: () => ZN_zones().map((z) => ({ id: z.id, name: z.name, status: z.status, allowed: !!z.allowed, built: !!z.o2, guards: z.guardCount || 0 })), apply: ZN_apply, inPoly: ZN_inPoly };
  }
