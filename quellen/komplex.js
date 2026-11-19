    // ===== Belohnungskomplex: futuristische Forschungsstation unter dem grünen Haus =====
    // Aufbau aus dem Quaternius "Modular SciFi MegaKit" (CC0). Eingang: aufs grüne Haus tippen -> Aufzug nach unten.
    // Drei Hallen: Tage (Norden), Wochen (Westen), Monate (Osten), dazwischen die Ankunftshalle mit dem Aufzug.
    // Begehbar über das Lauf-Raster (o.walk): Beim Betreten wird ein Bereich um das Haus ausgetauscht, beim Verlassen zurückgesetzt.
    // Sichtbar über Kamera-Ebene 1: Drinnen sieht die Kamera nur den Komplex, die Figur, den Hund und die Lichter.
    const HS = (() => {
      const WORLD = o, SCENE = n, CAMERA = s, PLAYER = l, MONS = h, ZONES = u;
      const HD = WORLD.houseDef;
      if (!HD || !WORLD.walk || !WORLD.homeMain) return { update() {}, disabled: true };
      const SCIFI = __SCIFI__;
      const CT = Math.cos(HD.rot), ST = Math.sin(HD.rot), DX = 2.4;
      const toW = (lx, lz) => [HD.cx + lx * CT + lz * ST, HD.cz - lx * ST + lz * CT];
      const toL = (wx, wz) => { const dx = wx - HD.cx, dz = wz - HD.cz; return [dx * CT - dz * ST, dx * ST + dz * CT]; };
      const PHONE = () => Math.min(innerWidth, innerHeight) < 560;
      // ---------- Grundriss (Meter, Hauskoordinaten: x nach rechts, z zur Haustür) ----------
      const ROOMS = {
        hub: { x0: -8, x1: 8, z0: -4, z1: 12, col: 0x45f0d0, css: "#45f0d0" },
        tag: { x0: -16, x1: 16, z0: -24, z1: -8, col: 0xffc94a, css: "#ffc94a", title: "TAGESBELOHNUNGEN", icon: "\u{1F4C5}", wall: "n" },
        woche: { x0: -32, x1: -12, z0: -4, z1: 12, col: 0x5cc8ff, css: "#5cc8ff", title: "WOCHENBELOHNUNGEN", icon: "\u{1F3C5}", wall: "w" },
        monat: { x0: 12, x1: 32, z0: -4, z1: 12, col: 0xd28bff, css: "#d28bff", title: "MONATSBELOHNUNGEN", icon: "\u{1F3C6}", wall: "e" }
      };
      const CORR = [{ x0: -2, x1: 2, z0: -8, z1: -4, to: "tag", ax: "z" }, { x0: -12, x1: -8, z0: 2, z1: 6, to: "woche", ax: "x" }, { x0: 8, x1: 12, z0: 2, z1: 6, to: "monat", ax: "x" }];
      const ARRIVE = [0, 8.6], LIFT = [0, 12];
      const WH = 7; // Wandhöhe
      const st = { mode: "out", built: false, dyn: null, hits: [], pulse: [], busy: false, hint: false, qwas: false, grid: null, cam: null, lights: null, room: "", holo: [], walls: [], tm: 0 };
      const G = new pe();
      G.position.set(HD.cx, 0, HD.cz), G.rotation.y = HD.rot, G.visible = false, SCENE.add(G);
      const L1 = (obj) => obj.traverse((m) => m.layers.enable(1));

      // ---------- Kit-Daten und Materialien ----------
      const dec = (b, C) => { const t = atob(b), u8 = new Uint8Array(t.length); for (let i = 0; i < t.length; i++) u8[i] = t.charCodeAt(i); return new C(u8.buffer); };
      const PARTS = {};
      const part = (name) => PARTS[name] || (PARTS[name] = (SCIFI.parts[name] || []).map((p) => ({ m: p.m, p: dec(p.p, Int16Array), n: dec(p.n, Int8Array), u: dec(p.u, Int16Array), i: dec(p.i, Uint16Array) })));
      const TEX = {};
      function kitTex(name, srgb = true) {
        if (TEX[name]) return TEX[name];
        const src = SCIFI.tex[name], cv = ji(4, 4);
        const t = Qi(cv, { repeat: true, aniso: 4, srgb });
        if (src) { const im = new Image(); im.onload = () => { cv.width = im.width, cv.height = im.height, cv.getContext("2d").drawImage(im, 0, 0), t.needsUpdate = true; }; im.src = src; }
        return TEX[name] = t;
      }
      const ACC = 0x3fe8ff;
      const MATS = {};
      function kitMat(mn) {
        if (MATS[mn]) return MATS[mn];
        const d = SCIFI.mats[mn] || {}, c = d.col;
        let m;
        if (mn === "M_Light" || mn === "M_LightFade_Red") m = new se({ color: 0xbff8ff, toneMapped: false });
        else if (mn === "M_Glass") m = new ae({ color: 0x5fd8ff, transparent: true, opacity: 0.28, roughness: 0.05, metalness: 0.2, depthWrite: false });
        else if (mn === "M_Black") m = new ae({ color: 0x07090c, roughness: 0.4, metalness: 0.5 });
        else if (mn === "MI_Decal_Line") m = new se({ color: ACC, toneMapped: false });
        else if (d.tex) {
          m = new ae({ map: kitTex(d.tex), roughness: 0.5, metalness: 0.45, side: 2, alphaTest: d.mask ? 0.5 : 0, transparent: false });
          if (/^MI_Trim_01/.test(mn)) m.emissiveMap = kitTex("EM_Trim01", false), m.emissive.setHex(ACC), m.emissiveIntensity = 1.6;
          if (/Decal/.test(mn)) m.polygonOffset = true, m.polygonOffsetFactor = -4, m.polygonOffsetUnits = -4;
        } else m = new ae({ color: c ? (Math.round(c[0] * 255) << 16 | Math.round(c[1] * 255) << 8 | Math.round(c[2] * 255)) : 0x8899aa, roughness: 0.5, metalness: 0.3 });
        return MATS[mn] = m;
      }
      // Ein Bauteil in einen Sammler (pro Material) schreiben. th = Drehung um y, sz = Längs-Streckung (lokale z-Achse)
      function emit(B, name, ox, oy, oz, th, sz = 1, sy = 1) {
        const c = Math.cos(th), sn = Math.sin(th);
        for (const pr of part(name)) {
          const b = B[pr.m] || (B[pr.m] = new Ot()), P = pr.p, N = pr.n, U = pr.u, ix = pr.i;
          const vx = (k) => { const x = P[k * 3] / 1000, y = P[k * 3 + 1] / 1000 * sy, z = P[k * 3 + 2] / 1000 * sz; return [ox + x * c + z * sn, oy + y, oz - x * sn + z * c]; };
          const nf = (k) => { const nx = N[k * 3] / 127, ny = N[k * 3 + 1] / 127, nz = N[k * 3 + 2] / 127; return [nx * c + nz * sn, ny, -nx * sn + nz * c]; };
          const uf = (k) => [U[k * 2] / 4096, 1 - U[k * 2 + 1] / 4096];
          for (let t = 0; t < ix.length; t += 3) { const a0 = ix[t], a1 = ix[t + 1], a2 = ix[t + 2]; b.triS(vx(a0), vx(a1), vx(a2), uf(a0), uf(a1), uf(a2), [1, 1, 1], nf(a0), nf(a1), nf(a2)); }
        }
      }
      function flush(B, parent) {
        const grp = new pe();
        for (const mn in B) { const me = new zt(B[mn].toGeometry(), kitMat(mn)); me.receiveShadow = true, grp.add(me); }
        return parent.add(grp), grp;
      }

      // ---------- Hilfen für Leinwände ----------
      const mk = (w, h2) => { const c = ji(w, h2); return [c, c.getContext("2d")]; };
      const tex = (c) => Qi(c, { repeat: false, aniso: 8 });
      const rrect = (g, x, y, w, h2, r) => { g.beginPath(), g.moveTo(x + r, y), g.arcTo(x + w, y, x + w, y + h2, r), g.arcTo(x + w, y + h2, x, y + h2, r), g.arcTo(x, y + h2, x, y, r), g.arcTo(x, y, x + w, y, r), g.closePath(); };
      function wrap(g, text, cx, y, maxW, lh, maxLines) {
        const words = String(text).split(" "), lines = []; let line = "";
        for (const wd of words) { const t = line ? line + " " + wd : wd; if (g.measureText(t).width > maxW && line) lines.push(line), line = wd; else line = t; }
        lines.push(line);
        if (lines.length > maxLines) lines.length = maxLines, lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,2}$/, "…");
        return lines.forEach((t, k) => g.fillText(t, cx, y + k * lh)), lines.length;
      }
      const basic = (map, extra = {}) => new se({ map, transparent: true, toneMapped: false, side: 2, ...extra });
      const plane = (w, h2, mat) => new zt(new Ke(w, h2), mat);
      function signTex(icon, text, css) {
        const [c, g] = mk(1024, 160);
        const gr = g.createLinearGradient(0, 0, 1024, 0); gr.addColorStop(0, "rgba(6,16,22,0)"), gr.addColorStop(0.12, "rgba(6,16,22,.88)"), gr.addColorStop(0.88, "rgba(6,16,22,.88)"), gr.addColorStop(1, "rgba(6,16,22,0)");
        g.fillStyle = gr, g.fillRect(0, 20, 1024, 120), g.fillStyle = css, g.fillRect(90, 22, 844, 4), g.fillRect(90, 134, 844, 4);
        g.font = "800 64px system-ui,Segoe UI,Roboto,sans-serif", g.textAlign = "center", g.textBaseline = "middle", g.shadowColor = css, g.shadowBlur = 18, g.fillStyle = "#fff", g.fillText(icon + " " + text, 512, 82);
        return tex(c);
      }

      // ---------- Statischer Komplex (einmal bauen) ----------
      // Wandlauf entlang einer Linie mit Öffnungen. inward = [nx,nz] zeigt in den Raum.
      function wallRun(a, b, fixed, axis, inward, open, opt = {}) {
        const segs = [];
        let cur = a;
        for (const [o0, o1] of (open || []).slice().sort((p, q) => p[0] - q[0])) { o0 > cur && segs.push([cur, o0]), cur = Math.max(cur, o1); }
        cur < b && segs.push([cur, b]);
        const B = {}, th = Math.atan2(-inward[1], inward[0]);
        for (const [s0, s1] of segs) {
          const L = s1 - s0, nm = Math.max(1, Math.round(L / 4)), sz = L / nm / 4;
          for (let k = 0; k < nm; k++) {
            const t = s0 + (k + 0.5) * L / nm, px = axis === "x" ? t : fixed, pz = axis === "x" ? fixed : t;
            const ox = px + inward[0] * 2, oz = pz + inward[1] * 2;
            emit(B, opt.flat ? "WallAstra_Straight_Flat" : (k + Math.round(t)) % 3 === 1 ? "WallWindow_Straight" : "WallAstra_Straight", ox, 0, oz, th, sz);
            emit(B, "TopAstra_Straight", ox, 0, oz, th, sz);
            emit(B, "TopAstra_Straight", ox, 2, oz, th, sz);
            emit(B, "BottomMetal_Straight", px + inward[0] * 2, 0.01, pz + inward[1] * 2, th, sz);
          }
        }
        const grp = flush(B, G);
        const mid = (a + b) / 2;
        grp.userData.wall = { p: axis === "x" ? [mid, fixed] : [fixed, mid], n: inward, keep: !!opt.keep };
        return st.walls.push(grp), grp;
      }
      function floor(r, kind) {
        const B = {};
        for (let x = r.x0 + 2; x < r.x1; x += 4) for (let z = r.z0 + 2; z < r.z1; z += 4) {
          const edge = x < r.x0 + 4 || x > r.x1 - 4 || z < r.z0 + 4 || z > r.z1 - 4;
          emit(B, kind === "corr" ? "Platform_CenterPlate" : edge ? "Platform_Metal2" : (Math.round((x + z) / 4) % 2 ? "Platform_DarkPlates" : "Platform_Squares"), x, 0.02, z, 0);
        }
        flush(B, G);
      }
      function corner(B, x, z) { emit(B, "Column_Round", x, 0, z, 0, 1, 1.42); }
      function buildStatic() {
        if (st.built) return;
        st.built = true;
        // Böden
        for (const k in ROOMS) floor(ROOMS[k]);
        for (const c of CORR) floor(c, "corr");
        const R = ROOMS;
        // Ankunftshalle
        wallRun(R.hub.x0, R.hub.x1, R.hub.z0, "x", [0, 1], [[-2, 2]]);
        wallRun(R.hub.x0, R.hub.x1, R.hub.z1, "x", [0, -1], [[-2.4, 2.4]]);
        wallRun(R.hub.z0, R.hub.z1, R.hub.x0, "z", [1, 0], [[2, 6]]);
        wallRun(R.hub.z0, R.hub.z1, R.hub.x1, "z", [-1, 0], [[2, 6]]);
        // Tageshalle (Urkundenwand im Norden)
        wallRun(R.tag.x0, R.tag.x1, R.tag.z0, "x", [0, 1], [], { flat: true, keep: true });
        wallRun(R.tag.x0, R.tag.x1, R.tag.z1, "x", [0, -1], [[-2, 2]]);
        wallRun(R.tag.z0, R.tag.z1, R.tag.x0, "z", [1, 0], []);
        wallRun(R.tag.z0, R.tag.z1, R.tag.x1, "z", [-1, 0], []);
        // Wochenhalle (Wand im Westen)
        wallRun(R.woche.z0, R.woche.z1, R.woche.x0, "z", [1, 0], [], { flat: true, keep: true });
        wallRun(R.woche.z0, R.woche.z1, R.woche.x1, "z", [-1, 0], [[2, 6]]);
        wallRun(R.woche.x0, R.woche.x1, R.woche.z0, "x", [0, 1], []);
        wallRun(R.woche.x0, R.woche.x1, R.woche.z1, "x", [0, -1], []);
        // Monatshalle (Wand im Osten)
        wallRun(R.monat.z0, R.monat.z1, R.monat.x1, "z", [-1, 0], [], { flat: true, keep: true });
        wallRun(R.monat.z0, R.monat.z1, R.monat.x0, "z", [1, 0], [[2, 6]]);
        wallRun(R.monat.x0, R.monat.x1, R.monat.z0, "x", [0, 1], []);
        wallRun(R.monat.x0, R.monat.x1, R.monat.z1, "x", [0, -1], []);
        // Gänge
        wallRun(-8, -4, -2, "z", [1, 0], []), wallRun(-8, -4, 2, "z", [-1, 0], []);
        wallRun(-12, -8, 2, "x", [0, 1], []), wallRun(-12, -8, 6, "x", [0, -1], []);
        wallRun(8, 12, 2, "x", [0, 1], []), wallRun(8, 12, 6, "x", [0, -1], []);
        // Säulen in den Ecken, Türrahmen, Deko
        const B = {};
        for (const k in R) { const r = R[k]; for (const [x, z] of [[r.x0 + 0.5, r.z0 + 0.5], [r.x1 - 0.5, r.z0 + 0.5], [r.x0 + 0.5, r.z1 - 0.5], [r.x1 - 0.5, r.z1 - 0.5]]) corner(B, x, z); }
        emit(B, "Door_Frame_SquareTall", 0, 0, -4, 0, 1, 1.3), emit(B, "Door_Frame_SquareTall", 0, 0, -8, 0, 1, 1.3);
        emit(B, "Door_Frame_SquareTall", -8, 0, 4, Math.PI / 2, 1, 1.3), emit(B, "Door_Frame_SquareTall", -12, 0, 4, Math.PI / 2, 1, 1.3);
        emit(B, "Door_Frame_SquareTall", 8, 0, 4, Math.PI / 2, 1, 1.3), emit(B, "Door_Frame_SquareTall", 12, 0, 4, Math.PI / 2, 1, 1.3);
        // Aufzug in der Südwand der Ankunftshalle (wird wie die Wand ausgeblendet, wenn die Kamera davor ist)
        { const BL = {}; emit(BL, "Door_Frame_SquareTall", 0, 0, 12, 0, 1, 1.3), emit(BL, "Door_DarkMetal", 0, 0, 12.15, 0), emit(BL, "Door_DarkMetal", 0, 0, 12.15, Math.PI); const lg = flush(BL, G); lg.userData.wall = { p: [0, 12], n: [0, -1] }, st.walls.push(lg); }
        // Ankunftshalle: Plattform mit Hologramm, Konsolen, Lichtlinien zu den Gängen
        emit(B, "Platform_Round1", 0, 0.03, 3.2, 0);
        emit(B, "Prop_Computer", -5.6, 0, 9.6, Math.PI * 0.75), emit(B, "Prop_Computer", 5.6, 0, 9.6, -Math.PI * 0.75);
        emit(B, "Prop_Crate3", -6.6, 0.5, -2.4, 0.3), emit(B, "Prop_Barrel_Large", 6.7, 0, -2.6, 0), emit(B, "Prop_Barrel_Large", 6.0, 0, -3.0, 0);
        for (let z = -3.5; z < 11; z += 4) emit(B, "Decal_Line_Straight", 0, 0.045, z, 0);
        for (let x = -7.5; x > -12; x -= 4) emit(B, "Decal_Line_Straight", x, 0.045, 4, Math.PI / 2);
        for (let x = 7.5; x < 12; x += 4) emit(B, "Decal_Line_Straight", x, 0.045, 4, Math.PI / 2);
        emit(B, "Decal_Logo", 0, 0.05, 9.4, 0);
        // Hallen: Lichtleisten oben an den Wänden und Kisten in den Ecken
        for (const k of ["tag", "woche", "monat"]) {
          const r = R[k];
          emit(B, "Prop_Crate3", r.x0 + 1.6, 0.5, r.z1 - 1.6, 0.4), emit(B, "Prop_Crate3", r.x0 + 1.6, 1.5, r.z1 - 1.6, 0.1), emit(B, "Prop_Chest", r.x1 - 2.0, 0, r.z1 - 1.4, 0);
        }
        for (let x = -14; x <= 14; x += 4.6) emit(B, "Prop_Light_Wide", x + 0.66, 6.7, -23.75, -Math.PI / 2);
        for (let z = -2; z <= 10; z += 4) emit(B, "Prop_Light_Wide", -31.75, 6.7, z + 0.66, 0), emit(B, "Prop_Light_Wide", 31.75, 6.7, z - 0.66, Math.PI);
        flush(B, G);
        // Hologramm über der Plattform
        const ring = new zt(new Ke(4.4, 4.4), basic(holoRing(), { opacity: 0.85, depthWrite: false, blending: 2 }));
        ring.rotation.x = -Math.PI / 2, ring.position.set(0, 0.25, 3.2), G.add(ring), st.holo.push(ring);
        const beam = new zt(new Ke(3.4, 5.5), basic(holoBeam(), { opacity: 0.55, depthWrite: false, blending: 2 }));
        beam.position.set(0, 2.9, 3.2), G.add(beam), st.holo.push(beam);
        const logo = plane(3.6, 1.0, basic(signTex("\u{1F31F}", "BELOHNUNGS-ZENTRALE", "#45f0d0"), { depthWrite: false }));
        logo.position.set(0, 3.6, 3.2), G.add(logo), st.holo.push(logo);
        // Schilder über den Durchgängen und in den Hallen
        const sign = (txt, icon, css, x, y, z, ry, w = 6) => { const m = plane(w, w * 160 / 1024, basic(signTex(icon, txt, css))); m.position.set(x, y, z), m.rotation.y = ry, G.add(m); };
        sign("TAGE", "\u{1F4C5}", R.tag.css, 0, 5.9, -3.9, 0, 5);
        sign("WOCHEN", "\u{1F3C5}", R.woche.css, -7.9, 5.9, 4, Math.PI / 2, 5);
        sign("MONATE", "\u{1F3C6}", R.monat.css, 7.9, 5.9, 4, -Math.PI / 2, 5);
        sign("AUFZUG NACH OBEN", "⬆", "#45f0d0", 0, 5.9, 11.9, Math.PI, 5);
        sign(R.tag.title, R.tag.icon, R.tag.css, 0, 6.1, -23.85, 0, 9);
        sign(R.woche.title, R.woche.icon, R.woche.css, -31.85, 6.1, 4, Math.PI / 2, 9);
        sign(R.monat.title, R.monat.icon, R.monat.css, 31.85, 6.1, 4, -Math.PI / 2, 9);
        // Bodenlicht in Raumfarbe vor den Urkundenwänden
        const glow = (r, x, z, w, d) => { const m = plane(w, d, basic(stripTex(r.css), { depthWrite: false, blending: 2, opacity: 0.6 })); m.rotation.x = -Math.PI / 2, m.position.set(x, 0.06, z), G.add(m); };
        glow(R.tag, 0, -22.6, 30, 2.4);
        glow(R.woche, -30.6, 4, 2.4, 15);
        glow(R.monat, 30.6, 4, 2.4, 15);
        // Licht: wenige Punktlichter (nur drinnen sichtbar, weil die Gruppe draußen unsichtbar ist)
        const pl = (c, i, d, x, y, z) => { const L = new cn(c, i, d, 1.6); L.position.set(x, y, z), G.add(L); };
        pl(0xbff6ff, 520, 30, 0, 6.5, 4), pl(R.tag.col, 650, 34, 0, 6.5, -17), pl(R.woche.col, 560, 30, -24, 6.5, 4), pl(R.monat.col, 560, 30, 24, 6.5, 4);
        const hemi = new No(0xa8e4ff, 0x18222c, 1.4); hemi.position.set(0, 10, 0), G.add(hemi);
        L1(G);
      }
      function holoRing() {
        const [c, g] = mk(256, 256);
        g.translate(128, 128);
        for (const [r, w, a] of [[118, 4, 0.9], [96, 2, 0.6], [70, 6, 0.35]]) g.strokeStyle = "rgba(80,240,220," + a + ")", g.lineWidth = w, g.beginPath(), g.arc(0, 0, r, 0, 7), g.stroke();
        for (let k = 0; k < 24; k++) g.rotate(Math.PI / 12), g.fillStyle = "rgba(120,255,235,.7)", g.fillRect(100, -2, 14, 4);
        return tex(c);
      }
      function holoBeam() {
        const [c, g] = mk(64, 256), gr = g.createLinearGradient(0, 256, 0, 0);
        gr.addColorStop(0, "rgba(80,240,220,.5)"), gr.addColorStop(1, "rgba(80,240,220,0)"), g.fillStyle = gr, g.fillRect(0, 0, 64, 256);
        const gx = g.createLinearGradient(0, 0, 64, 0); gx.addColorStop(0, "rgba(0,0,0,1)"), gx.addColorStop(0.5, "rgba(0,0,0,0)"), gx.addColorStop(1, "rgba(0,0,0,1)");
        return g.globalCompositeOperation = "destination-out", g.fillStyle = gx, g.fillRect(0, 0, 64, 256), tex(c);
      }
      function stripTex(css) {
        const [c, g] = mk(256, 64), gr = g.createLinearGradient(0, 0, 0, 64);
        gr.addColorStop(0, "rgba(0,0,0,0)"), gr.addColorStop(0.5, css), gr.addColorStop(1, "rgba(0,0,0,0)");
        return g.globalAlpha = 0.5, g.fillStyle = gr, g.fillRect(0, 0, 256, 64), tex(c);
      }

      // ---------- Daten für die Wände ----------
      const wdName = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
      function entryState(e) {
        if (!e) return "none";
        const p = e.pick;
        if (p) return p.status === "offen" ? "wartet" : p.status === "abgelehnt" ? "neu" : "fertig";
        if (e.lost) return "verpasst";
        return e.reached ? "abholen" : "gesperrt";
      }
      const BTN = {
        abholen: ["\u{1F381} Belohnung abholen", "#ffcf3a", "#2a1c00"], wartet: ["⏳ Eltern bestätigen", "#ff9a1f", "#2a1400"], fertig: ["✅ Abgeholt", "#5b6066", "#d8dcdf"],
        neu: ["↻ Neu wählen", "#e05555", "#fff"], gesperrt: ["\u{1F512} Noch nicht erreicht", "#26313a", "#9fb0bb"], verpasst: ["✖ Verpasst", "#4a2c30", "#e0b0b0"]
      };
      const certOf = (key) => { const d = (ye.days || {})[key]; return d && (d.cert || d.ex && d.ex.n) && d.ex && d.ex.n ? d : null; };
      function slotsDays() {
        const rw = RW.d, today = rw && rw.today || Tr(), out = [];
        for (let k = 6; k >= 0; k--) {
          const dt = new Date(today + "T12:00:00"); dt.setDate(dt.getDate() - k);
          const key = Tr(dt), cert = certOf(key);
          let kind = "tag", e = rw && rw.tag.find((x) => x.period === key) || null;
          if (!(e && (e.reached || e.pick))) { const t2 = rw && (rw.trost || []).find((x) => x.period === key); t2 && (kind = "trost", e = t2); }
          out.push({ kind, e, key, cert, label: k === 0 ? "Heute" : wdName[dt.getDay()] + " " + String(dt.getDate()).padStart(2, "0") + "." + String(dt.getMonth() + 1).padStart(2, "0") + ".", title: dt.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" }) });
        }
        return out;
      }
      const slotsWeeks = () => (RW.d ? RW.d.woche.slice(0, 3).reverse() : []).map((e) => ({ kind: "woche", e, label: "Woche " + e.period.slice(-2), title: RW_label("woche", e) }));
      const slotsMonths = () => (RW.d ? RW.d.monat.slice(0, 3).reverse() : []).map((e) => ({ kind: "monat", e, label: new Date(e.period + "-15T12:00:00").toLocaleDateString("de-DE", { month: "long", year: "numeric" }), title: RW_label("monat", e) }));

      // Holo-Karte für Wochen, Monate und Tage ohne Urkunde (512 x 917, wie die Urkunde)
      function holoCard(sl, css) {
        const [c, g] = mk(512, 917), e = sl.e;
        const bg = g.createLinearGradient(0, 0, 0, 917); bg.addColorStop(0, "#0d1c26"), bg.addColorStop(1, "#06101a"), g.fillStyle = bg, g.fillRect(0, 0, 512, 917);
        g.strokeStyle = css, g.lineWidth = 6, rrect(g, 14, 14, 484, 889, 26), g.stroke();
        g.globalAlpha = 0.12; for (let y = 30; y < 900; y += 14) g.fillStyle = css, g.fillRect(20, y, 472, 2); g.globalAlpha = 1;
        g.textAlign = "center", g.fillStyle = "#fff", g.font = "800 46px system-ui,Segoe UI,Roboto,sans-serif";
        if (sl.kind === "woche" || sl.kind === "monat") {
          g.fillText(sl.kind === "woche" ? "WOCHE " + e.period.slice(-2) : sl.label.toUpperCase().split(" ")[0], 256, 110);
          g.font = "500 30px system-ui,sans-serif", g.fillStyle = "#b9d2e0";
          g.fillText(sl.kind === "woche" ? RW_fd(e.from, { day: "numeric", month: "numeric" }) + " – " + RW_fd(e.to, { day: "numeric", month: "numeric" }) : String(new Date(e.period + "-15T12:00:00").getFullYear()), 256, 160);
          g.font = "210px serif", g.fillText(sl.kind === "woche" ? "\u{1F3C5}" : "\u{1F3C6}", 256, 430);
          const have = e.days, need = sl.kind === "woche" ? e.need : e.total, f = Math.max(0, Math.min(1, have / (need || 1)));
          g.fillStyle = "#1c2c36", rrect(g, 60, 520, 392, 34, 17), g.fill(), g.fillStyle = e.lost ? "#ff6b6b" : css, rrect(g, 60, 520, Math.max(34, 392 * f), 34, 17), g.fill();
          g.fillStyle = "#fff", g.font = "800 54px system-ui,sans-serif", g.fillText(have + " von " + need, 256, 640);
          g.font = "500 32px system-ui,sans-serif", g.fillStyle = "#b9d2e0", g.fillText("Lerntagen", 256, 690);
          g.font = "700 34px system-ui,sans-serif", g.fillStyle = e.lost ? "#ff8a8a" : e.reached ? "#7dffa0" : "#b9d2e0";
          wrap(g, e.lost ? "Leider verpasst" : e.reached ? "Geschafft!" : "Weiter so!", 256, 790, 420, 40, 2);
        } else {
          g.fillText(sl.kind === "trost" ? "TROSTPREIS" : "KEINE URKUNDE", 256, 120), g.font = "200px serif", g.fillText(sl.kind === "trost" ? "\u{1F340}" : "\u{1F4AD}", 256, 440);
          g.font = "500 34px system-ui,sans-serif", g.fillStyle = "#b9d2e0", wrap(g, sl.kind === "trost" ? "Für deinen Einsatz an diesem Tag" : "An diesem Tag gab es noch keine Tagesprüfung.", 256, 600, 420, 44, 4);
        }
        return c;
      }
      const thumbs = new Map();
      function certTexture(sl) {
        const sig = sl.key + ":" + (sl.cert.sec | 0) + ":" + (sl.cert.ex.r | 0) + ":" + (sl.cert.ex.n | 0);
        let c = thumbs.get(sig);
        if (!c) {
          c = ji(576, 1032), thumbs.set(sig, c);
          const g = c.getContext("2d");
          const paint = () => { try { g.clearRect(0, 0, 576, 1032), g.drawImage(UK_draw(sl.cert), 0, 0, 576, 1032); } catch (er) { g.drawImage(holoCard(sl, "#ffc94a"), 0, 0, 576, 1032); } st.dyn && st.dyn.traverse((m) => m.material && m.material.map && m.material.map.image === c && (m.material.map.needsUpdate = true)); };
          paint(), setTimeout(paint, 1800), setTimeout(paint, 6000);
        }
        return tex(c);
      }
      function buttonTexture(state, css) {
        const [lbl, bg, fg] = BTN[state], [c, g] = mk(512, 120);
        rrect(g, 6, 6, 500, 108, 30), g.fillStyle = bg, g.fill(), g.lineWidth = 6, g.strokeStyle = state === "fertig" || state === "gesperrt" ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.7)", g.stroke();
        g.fillStyle = fg, g.font = "800 46px system-ui,Segoe UI,Roboto,sans-serif", g.textAlign = "center", g.textBaseline = "middle", g.fillText(lbl, 256, 64);
        return tex(c);
      }
      function labelTexture(text, css) {
        const [c, g] = mk(512, 96); g.fillStyle = "rgba(6,14,20,.82)", rrect(g, 4, 4, 504, 88, 20), g.fill(), g.strokeStyle = css, g.lineWidth = 4, g.stroke();
        g.fillStyle = "#fff", g.font = "800 50px system-ui,Segoe UI,Roboto,sans-serif", g.textAlign = "center", g.textBaseline = "middle", g.fillText(text, 256, 52);
        return tex(c);
      }
      // Platz an einer Urkundenwand. side: n|w|e, u = Lage entlang der Wand (von links nach rechts gesehen)
      function at(mesh, side, u2, y, off) {
        if (side === "n") mesh.position.set(u2, y, ROOMS.tag.z0 + 0.45 + off), mesh.rotation.y = 0;
        else if (side === "w") mesh.position.set(ROOMS.woche.x0 + 0.45 + off, y, -u2 + 4), mesh.rotation.y = Math.PI / 2;
        else mesh.position.set(ROOMS.monat.x1 - 0.45 - off, y, u2 + 4), mesh.rotation.y = -Math.PI / 2;
        return mesh;
      }
      function addSlot(grp, side, u2, sl, room) {
        const state = entryState(sl.e), css = room.css, PW = 2.3, PH = PW / 0.558;
        const frame = plane(PW + 0.22, PH + 0.22, new se({ color: room.col, toneMapped: false })); at(frame, side, u2, 3.45, 0), grp.add(frame);
        const back = plane(PW + 0.1, PH + 0.1, new se({ color: 0x05090d })); at(back, side, u2, 3.45, 0.01), grp.add(back);
        const pic = plane(PW, PH, basic(sl.cert ? certTexture(sl) : tex(holoCard(sl, css)), { transparent: false })); at(pic, side, u2, 3.45, 0.02), grp.add(pic);
        const lb = plane(2.4, 0.45, basic(labelTexture(sl.label, css))); at(lb, side, u2, 1.05, 0.03), grp.add(lb);
        if (state !== "none") {
          const bt = plane(2.6, 0.61, basic(buttonTexture(state, css))); at(bt, side, u2, 0.42, 0.04), grp.add(bt);
          state === "abholen" && st.pulse.push(bt);
        }
        const hit = plane(PW + 0.6, 6.4, new se({ transparent: true, opacity: 0, depthWrite: false, side: 2 })); at(hit, side, u2, 3.2, 0.06), hit.userData.hs = sl, grp.add(hit), st.hits.push(hit);
      }
      function disposeDyn() {
        if (!st.dyn) return;
        st.dyn.traverse((m) => { m.geometry && m.geometry.dispose(), m.material && (m.material.map && m.material.map.dispose(), m.material.dispose()); });
        G.remove(st.dyn), st.dyn = null, st.hits = [], st.pulse = [];
      }
      function buildWalls() {
        buildStatic(), disposeDyn();
        const g = new pe(); st.dyn = g;
        const days = slotsDays(), weeks = slotsWeeks(), months = slotsMonths();
        days.forEach((sl, k) => addSlot(g, "n", (k - 3) * 4.3, sl, ROOMS.tag));
        weeks.forEach((sl, k) => addSlot(g, "w", (k - (weeks.length - 1) / 2) * 4.8, sl, ROOMS.woche));
        months.forEach((sl, k) => addSlot(g, "e", (k - (months.length - 1) / 2) * 4.8, sl, ROOMS.monat));
        if (!RW.d) for (const [side, room] of [["w", ROOMS.woche], ["e", ROOMS.monat]]) {
          const [c, gg] = mk(1024, 200); gg.fillStyle = "#fff", gg.font = "700 52px system-ui,sans-serif", gg.textAlign = "center", gg.fillText("Wochen und Monate brauchen", 512, 80), gg.fillText("Internet und ein Spieler-Konto", 512, 150);
          const m = plane(8, 1.56, basic(tex(c))); at(m, side, 0, 3.4, 0.05), g.add(m);
        }
        G.add(g), L1(g);
      }
      function refresh() {
        st.dyn || buildWalls();
        Promise.resolve().then(() => RW_fetch()).catch(() => null).then(() => st.mode !== "out" && buildWalls());
      }

      // ---------- Karten-Fenster: Urkunde + Belohnung + Elternbestätigung direkt hier ----------
      function freshEntry(kind, e) { const L = RW.d && RW.d[kind]; return L && L.find((x) => x.period === e.period) || e; }
      function rewardBlock(kind, e0) {
        const box = K("div", { class: "kx-rw" });
        const draw = () => {
          const e = freshEntry(kind, e0), p = e.pick, state = entryState(e), kids = [];
          if (kind === "woche") kids.push(K("p", { class: "ko-small" }, e.days + " von " + e.need + " Lerntagen geschafft"));
          if (kind === "monat") kids.push(K("p", { class: "ko-small" }, e.days + " von " + e.total + " Lerntagen geschafft" + (e.lost ? " – leider verpasst" : "")));
          if (p) kids.push(K("p", { class: "kx-pick" }, (RW_IC[kind] || "\u{1F381}") + " " + p.choice));
          if (state === "abholen" || state === "neu") {
            const b = K("button", { class: "qbtn go kx-big" }, state === "neu" ? "↻ Neue Belohnung ziehen" : "\u{1F381} Belohnung abholen");
            b.onclick = () => pickReward(kind, e, b, draw);
            kids.push(b);
          } else if (state === "wartet") {
            kids.push(K("div", { class: "kx-state wait" }, "⏳ Wartet auf die Bestätigung der Eltern"), parentPanel(e, draw, true));
          } else if (state === "fertig") {
            kids.push(K("button", { class: "qbtn kx-big kx-done", disabled: true }, p.status === "eingeloest" ? "\u{1F389} Eingelöst" : "✅ Abgeholt – von den Eltern bestätigt"));
            p.status === "bestaetigt" && kids.push(K("details", { class: "kx-more" }, K("summary", {}, "Eltern: als eingelöst markieren"), parentPanel(e, draw, false)));
          } else if (state === "gesperrt") kids.push(K("button", { class: "qbtn kx-big kx-done", disabled: true }, "\u{1F512} Noch nicht erreicht"));
          else if (state === "verpasst") kids.push(K("button", { class: "qbtn kx-big kx-done", disabled: true }, "✖ Diesmal verpasst"));
          box.replaceChildren(...kids);
        };
        return draw(), box;
      }
      // Passwortfeld direkt an der Karte. Das Passwort geht nur an den Server (bcrypt-Prüfung, Sperre nach Fehlversuchen) und wird nie gespeichert.
      function parentPanel(e, redraw, open) {
        const pw = K("input", { class: "qin", type: "password", placeholder: "Eltern-Passwort", autocomplete: "off", autocapitalize: "off", spellcheck: "false" }), m = K("p", { class: "qmsg" }, "Nur für Erwachsene: Passwort eingeben und bestätigen.");
        const send = async (status, btn) => {
          if (!pw.value) return void (m.textContent = "Bitte das Eltern-Passwort eingeben.", pw.focus());
          btn.disabled = true, m.textContent = "Prüfe …";
          try {
            const r = await KO_call("rewardParentSet", { id: e.pick.id, status, parentPassword: pw.value });
            pw.value = "";
            if (!r.j || !r.j.ok) return void (m.textContent = r.j && r.j.error === "wrong" ? "Das Passwort stimmt nicht." : r.j && r.j.error === "locked" ? "Zu viele Versuche. Bitte in " + r.j.minutes + " Minuten noch einmal." : KO_msg(r));
            RW_set(r.j.rewards), Zs(status === "abgelehnt" ? "Abgelehnt – eine neue Belohnung kann gezogen werden." : "✅ Gespeichert."), redraw(), st.dirty = true;
          } catch (er) { m.textContent = "Keine Verbindung. Bitte später noch einmal."; } finally { btn.disabled = false; }
        };
        const row = open ? [K("button", { class: "qbtn go", onclick: (ev) => send("bestaetigt", ev.currentTarget) }, "✅ Bestätigen"), K("button", { class: "qbtn", onclick: (ev) => send("abgelehnt", ev.currentTarget) }, "❌ Ablehnen")] : [K("button", { class: "qbtn go", onclick: (ev) => send("eingeloest", ev.currentTarget) }, "\u{1F389} Eingelöst")];
        return K("div", { class: "kx-parent" }, K("p", { class: "kx-ptitle" }, "\u{1F468}‍\u{1F469} Eltern-Bestätigung"), pw, K("div", { class: "qrow" }, ...row), m);
      }
      async function pickReward(kind, e, btn, redraw) {
        if (RW.busy) return;
        RW.busy = true, btn.disabled = true, btn.textContent = "\u{1F3B2} Glücksrad dreht …";
        const L = RW_list(kind), c = L[Math.floor(Math.random() * L.length)];
        try {
          Pi(), await KO_call("save", { game: "milo3d_days", state: { days: ye.days } });
          let r = await KO_call("rewardPick", { kind, period: e.period, choice: c[1] });
          r.j && r.j.error === "not_reached" && (await new Promise((ok) => setTimeout(ok, 1500)), r = await KO_call("rewardPick", { kind, period: e.period, choice: c[1] }));
          if (r.j && r.j.ok) RW_set(r.j.rewards), Zs("\u{1F389} Gezogen: " + c[1]), st.dirty = true;
          else Zs(r.j && r.j.error === "already" ? "Du hast schon gezogen." : r.j && r.j.error === "not_reached" ? "Das Ziel ist noch nicht ganz erreicht." : KO_msg(r));
        } catch (er) { Zs("Keine Verbindung."); } finally { RW.busy = false, redraw(); }
      }
      function openSlot(sl) {
        const kids = [], side = [];
        if (sl.cert) {
          let c = null; try { c = UK_draw(sl.cert); } catch (er) {}
          if (c) {
            c.className = "kx-cert", c.onclick = () => UKX.view(sl.key);
            kids.push(K("div", { class: "kx-certwrap" }, c));
            side.push(K("div", { class: "qrow kx-row" }, K("button", { class: "qbtn", onclick: () => UKX.view(sl.key) }, "\u{1F50D} Groß ansehen"), K("button", { class: "qbtn", onclick: (ev) => { const b = ev.currentTarget; b.disabled = true; UKX.download(sl.key).finally(() => (b.disabled = false)); } }, "\u2B07 Auf Handy herunterladen")));
          }
        }
        if (sl.e && RW.d) side.push(rewardBlock(sl.kind, sl.e));
        else side.push(K("p", { class: "qmsg" }, sl.cert ? "Für die Belohnung brauchst du Internet und ein Spieler-Konto." : sl.kind === "tag" ? "An diesem Tag gibt es noch keine Urkunde." : "Für Wochen und Monate brauchst du Internet und ein Spieler-Konto."));
        ln().append(KO_box("wide kx-box", K("div", { class: "qhead" }, K("h2", {}, sl.title || sl.label), K("button", { class: "qx", onclick: Ys }, "✕")), K("div", { class: "kx-grid" + (kids.length ? "" : " one") }, ...kids, K("div", { class: "kx-side" }, ...side))));
      }

      // ---------- Tippen ----------
      const rc = new Bo(), ndc = new Bt();
      rc.layers.enableAll();
      function pick(ev, objs) { ndc.set(ev.clientX / innerWidth * 2 - 1, -(ev.clientY / innerHeight) * 2 + 1), rc.setFromCamera(ndc, CAMERA); const r = rc.intersectObjects(objs, true); return r.length ? r[0] : null; }
      function askEnter() {
        if (st.mode !== "out" || st.busy) return;
        ln().append(KO_box("", K("h2", {}, "\u{1F680} Belohnungs-Zentrale"), K("p", { class: "qmsg" }, "Unter dem grünen Haus liegt die Belohnungs-Zentrale. Dort hängen deine Urkunden und Belohnungen für Tage, Wochen und Monate. Möchtest du hinunterfahren?"), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: () => (Ys(), enter()) }, "Ja, hinunter!"), K("button", { class: "qbtn", onclick: Ys }, "Nein"))));
      }
      window.__hsTap = (ev) => {
        if (window.__quizOpen) return false;
        if (st.mode === "in") { const r = st.hits.length && pick(ev, st.hits); if (r && r.object.userData.hs) return openSlot(r.object.userData.hs), true; return false; }
        if (st.mode === "out" && pick(ev, WORLD.homeMain)) return askEnter(), true;
        return st.mode === "entering" && !!pick(ev, WORLD.homeMain);
      };

      // ---------- Lauf-Raster tauschen ----------
      const wk = WORLD.walk;
      const freeAt = (lx, lz) => {
        for (const k in ROOMS) { const r = ROOMS[k]; if (lx > r.x0 + 0.8 && lx < r.x1 - 0.8 && lz > r.z0 + 0.8 && lz < r.z1 - 0.8) return !(k === "hub" && Math.hypot(lx, lz - 3.2) < 1.4) && !(k === "hub" && Math.abs(lx) < 2.6 && lz > 10.6); }
        for (const c of CORR) { const alongZ = c.ax === "z"; if (alongZ ? lx > c.x0 + 0.7 && lx < c.x1 - 0.7 && lz > c.z0 - 1 && lz < c.z1 + 1 : lz > c.z0 + 0.7 && lz < c.z1 - 0.7 && lx > c.x0 - 1 && lx < c.x1 + 1) return true; }
        return false;
      };
      function gridIn() {
        const cs = [toW(-34, -27), toW(34, -27), toW(-34, 15), toW(34, 15)], xs = cs.map((p) => p[0]), zs = cs.map((p) => p[1]);
        const x0 = Math.max(0, Math.floor(Math.min(...xs) - wk.g0x)), x1 = Math.min(wk.GW - 1, Math.ceil(Math.max(...xs) - wk.g0x)), z0 = Math.max(0, Math.floor(Math.min(...zs) - wk.g0z)), z1 = Math.min(wk.GH - 1, Math.ceil(Math.max(...zs) - wk.g0z));
        const save = [];
        for (let gz = z0; gz <= z1; gz++) for (let gx = x0; gx <= x1; gx++) {
          const [lx, lz] = toL(wk.g0x + gx + 0.5, wk.g0z + gz + 0.5);
          if (lx < -34 || lx > 34 || lz < -27 || lz > 15) continue;
          const i2 = gz * wk.GW + gx, f = freeAt(lx, lz);
          save.push(i2, wk.blocked[i2], wk.reach ? wk.reach[i2] : 0);
          wk.blocked[i2] = f ? 0 : 1, wk.reach && (wk.reach[i2] = f ? 1 : 0);
        }
        st.grid = save;
      }
      function gridOut() {
        const s2 = st.grid; if (!s2) return;
        for (let k = 0; k < s2.length; k += 3) wk.blocked[s2[k]] = s2[k + 1], wk.reach && (wk.reach[s2[k]] = s2[k + 2]);
        st.grid = null;
      }
      // Drinnen ist alles im Komplex sicher (Monster kommen nicht hinein)
      const safe0 = ZONES.safeAt.bind(ZONES);
      ZONES.safeAt = (x, z) => { if (st.mode === "in") { const [lx, lz] = toL(x, z); if (lx > -34 && lx < 34 && lz > -27 && lz < 15) return true; } return safe0(x, z); };

      // ---------- Betreten / Verlassen ----------
      const fade = K("div", { id: "kx-fade" }, K("div", { class: "kx-lift" }, K("b"), K("span")));
      const dock = K("div", { id: "hs-dock" });
      document.body.append(fade, dock);
      const sty = document.createElement("style");
      sty.textContent = "#kx-fade{position:fixed;inset:0;z-index:60;background:#02060a;opacity:0;pointer-events:none;transition:opacity .35s;display:flex;align-items:center;justify-content:center}#kx-fade.on{opacity:1;pointer-events:auto}.kx-lift{text-align:center;color:#bff6ff;font:700 18px/1.4 system-ui,sans-serif;letter-spacing:.08em}.kx-lift b{display:block;font-size:46px;color:#45f0d0;text-shadow:0 0 18px #45f0d0;animation:kxl 1s ease-in-out infinite alternate}@keyframes kxl{to{transform:translateY(10px)}}"
        + "#hs-dock{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(8px + env(safe-area-inset-bottom));z-index:30;display:none;gap:8px;padding:6px;border-radius:18px;background:rgba(4,12,16,.72);border:1px solid rgba(69,240,208,.35);backdrop-filter:blur(6px);max-width:calc(100vw - 24px)}#hs-dock.show{display:flex}#hs-dock .chip{min-height:48px;min-width:48px;padding:0 14px;border-radius:14px;border:1px solid rgba(69,240,208,.35);background:rgba(10,24,30,.9);color:#e8fbff;font:700 15px system-ui,sans-serif;white-space:nowrap}#hs-dock .chip.on{background:#0f3a40;border-color:#45f0d0;box-shadow:0 0 12px rgba(69,240,208,.5)}"
        + "body.kx-in #chips,body.kx-in #presets,body.kx-in #hint,body.kx-in #card,body.kx-in #pins,body.kx-in #hud-dist,body.kx-in #hud-goal{display:none!important}"
        + ".qbox.kx-box{width:min(880px,100%)!important;max-width:none!important}.kx-grid{display:grid;grid-template-columns:minmax(150px,38%) minmax(0,1fr);gap:14px;align-items:start;text-align:left}.kx-grid.one{grid-template-columns:1fr}.kx-side .kx-row{justify-content:stretch}.kx-side .kx-row .qbtn{flex:1 1 180px;min-height:48px}@media (orientation:portrait){.kx-grid{grid-template-columns:1fr}}.kx-certwrap{display:flex;justify-content:center}.kx-cert{width:100%;height:auto;max-height:none;border-radius:10px;box-shadow:0 6px 24px #000c;cursor:zoom-in}.kx-row{justify-content:center;flex-wrap:wrap}.kx-rw{margin-top:10px;padding:12px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)}.kx-pick{font:700 17px/1.35 system-ui,sans-serif;margin:4px 0 10px;color:#fff}.kx-big{width:100%;min-height:54px;font-size:17px}.kx-done{background:#3c4248!important;color:#cfd4d8!important;opacity:1!important;filter:grayscale(1)}.kx-state{padding:10px;border-radius:10px;font-weight:700;margin-bottom:8px}.kx-state.wait{background:rgba(255,154,31,.15);color:#ffb35a}.kx-parent{margin-top:6px;padding:10px;border-radius:12px;border:1px dashed rgba(255,255,255,.3)}.kx-ptitle{margin:0 0 4px;font-weight:800}.kx-more{margin-top:10px;text-align:left}.kx-more summary{cursor:pointer;color:#9fb0bb}"
        + "@media (max-width:560px),(max-height:520px){#hs-dock .chip{padding:0 10px;font-size:14px}#hs-dock .chip i{display:none}}";
      document.head.append(sty);
      function lift(text, mid, after) {
        fade.querySelector("b").textContent = text[0], fade.querySelector("span").textContent = text[1], fade.classList.add("on");
        setTimeout(() => { try { mid(); } catch (er) { console.error(er); } setTimeout(() => (fade.classList.remove("on"), after && after()), 650); }, 450);
      }
      function setDock() {
        const go = (k) => () => walkTo(k);
        dock.replaceChildren(
          K("button", { class: "chip", onclick: leave }, "⬆", K("i", {}, " Nach oben")),
          K("button", { class: "chip", "data-r": "tag", onclick: go("tag") }, "\u{1F4C5}", K("i", {}, " Tage")),
          K("button", { class: "chip", "data-r": "woche", onclick: go("woche") }, "\u{1F3C5}", K("i", {}, " Wochen")),
          K("button", { class: "chip", "data-r": "monat", onclick: go("monat") }, "\u{1F3C6}", K("i", {}, " Monate")),
          K("button", { class: "chip", onclick: () => UKX.archive() }, "\u{1F4DC}", K("i", {}, " Meine Urkunden")));
      }
      const SPOT = { tag: [0, -13], woche: [-20.5, 4], monat: [20.5, 4], hub: [0, 6] };
      function walkTo(k) {
        const [x, z] = toW(...SPOT[k]);
        PLAYER.goTo(x, z) || Zs("Da komme ich gerade nicht hin.");
      }
      function enter() {
        if (st.mode !== "out" || st.busy) return;
        const [x, z] = toW(DX, 6.0), ok = PLAYER.goTo(x, z);
        if (!ok && Math.hypot(PLAYER.x - x, PLAYER.z - z) > 3) return void Zs("Der Weg zum Haus ist gerade versperrt.");
        st.mode = "entering", st.tm = 0, V.follow = true;
      }
      function placeAt(lx, lz) {
        const [x, z] = toW(lx, lz);
        PLAYER.x = x, PLAYER.z = z, PLAYER.path = null;
        V.tx = C.tx = x, V.tz = C.tz = z;
        const dg = MONS && MONS.dog; if (dg) { const [a, b] = toW(lx + 1.6, lz + 0.8); dg.x = a, dg.z = b; }
      }
      function arrive() {
        st.busy = true;
        lift(["⬇", "Aufzug fährt hinunter …"], () => {
          buildStatic();
          st.mode = "in", gridIn(), G.visible = true;
          L1(PLAYER.root), MONS.root && L1(MONS.root);
          st.lights = [];
          SCENE.traverse((m) => { if (m.isLight && !isIn(m)) m.layers.enable(1), st.lights.push([m, m.intensity]), m.intensity *= 0.3; });
          st.bg = SCENE.background, SCENE.background = new Xt(0x03070b), SCENE.fog && SCENE.fog.color && (st.fogc = SCENE.fog.color.getHex(), SCENE.fog.color.setHex(0x03070b));
          CAMERA.layers.set(1);
          st.cam = { dist: C.dist, pitch: C.pitch, yaw: C.yaw };
          placeAt(...ARRIVE), C.yaw = V.yaw = HD.rot, C.pitch = V.pitch = 1.08, C.dist = V.dist = PHONE() ? 25 : 27;
          document.body.classList.add("kx-in"), setDock(), dock.classList.add("show");
          refresh();
        }, () => { st.busy = false; Zs("Willkommen in der Belohnungs-Zentrale! Tippe auf eine Karte."); });
      }
      const isIn = (m) => { for (let p = m; p; p = p.parent) if (p === G) return true; return false; };
      function leave() {
        if (st.mode !== "in" || st.busy) return;
        st.busy = true;
        lift(["⬆", "Aufzug fährt hinauf …"], () => {
          st.mode = "out", G.visible = false, gridOut();
          CAMERA.layers.set(0);
          for (const [m, i2] of st.lights || []) m.intensity = i2;
          st.lights = null, SCENE.background = st.bg, SCENE.fog && st.fogc != null && SCENE.fog.color.setHex(st.fogc);
          placeAt(DX, 6.4);
          if (st.cam) C.dist = V.dist = st.cam.dist, C.pitch = V.pitch = st.cam.pitch, C.yaw = V.yaw = st.cam.yaw, st.cam = null;
          V.follow = true, st.room = "";
          document.body.classList.remove("kx-in"), dock.classList.remove("show");
        }, () => (st.busy = false));
      }
      function roomAt(lx, lz) { for (const k in ROOMS) { const r = ROOMS[k]; if (lx > r.x0 && lx < r.x1 && lz > r.z0 && lz < r.z1) return k; } return "gang"; }
      const tv = new Y();
      return {
        enter, leave, askEnter, refresh, openSlot, toW, toL, st, G, P: PLAYER, W: WORLD, walkTo, roomAt, inside: () => st.mode === "in",
        update(dt, t) {
          if (st.mode === "entering") {
            st.tm += dt;
            const [x, z] = toW(DX, 6.0);
            if (Math.hypot(PLAYER.x - x, PLAYER.z - z) < 1.6) st.mode = "out", arrive();
            else if (st.tm > 30 || (st.tm > 2 && !PLAYER.path)) st.mode = "out", Zs("Du bist nicht zum Haus gegangen.");
            return;
          }
          if (st.mode !== "in") {
            const [x, z] = toW(DX, 6.0), d = Math.hypot(PLAYER.x - x, PLAYER.z - z);
            if (!st.hint && d < 6) st.hint = true, Zs("\u{1F680} Tippe aufs grüne Haus: Darunter liegt die Belohnungs-Zentrale.");
            else if (st.hint && d > 16) st.hint = false;
            return;
          }
          for (const m of st.pulse) { const k = 1 + 0.05 * Math.sin(t * 5); m.scale.set(k, k, 1); }
          if (st.holo[0]) st.holo[0].rotation.z = t * 0.5, st.holo[2].rotation.y = Math.sin(t * 0.4) * 0.6;
          const qo = !!window.__quizOpen;
          st.qwas && !qo && st.dirty && (st.dirty = false, buildWalls()), st.qwas = qo;
          // Kamera: in einer Halle Blick auf die Urkundenwand, sonst von oben
          const [lx, lz] = toL(PLAYER.x, PLAYER.z), room = roomAt(lx, lz), ph = PHONE();
          if (room !== st.room) {
            st.room = room;
            dock.querySelectorAll("[data-r]").forEach((b) => b.classList.toggle("on", b.dataset.r === room));
          }
          const r = ROOMS[room];
          if (r && r.wall) {
            let ax, az, yaw;
            if (r.wall === "n") ax = Math.max(-12.9, Math.min(12.9, lx)), az = r.z0 - 4, yaw = HD.rot;
            else if (r.wall === "w") ax = r.x0 - 4, az = Math.max(-0.8, Math.min(8.8, lz)), yaw = Math.PI / 2 + HD.rot;
            else ax = r.x1 + 4, az = Math.max(-0.8, Math.min(8.8, lz)), yaw = -Math.PI / 2 + HD.rot;
            const [wx, wz] = toW(ax, az);
            V.follow = false, C.tx = wx, C.tz = wz, C.yaw = yaw, C.pitch = 0.25, C.dist = ph ? 18 : 19;
          } else {
            V.follow = true, C.pitch = 1.08, C.dist = ph ? 25 : 27, C.yaw = HD.rot;
          }
          // Wände zwischen Kamera und Figur ausblenden
          CAMERA.getWorldPosition(tv);
          const [cx, cz] = toL(tv.x, tv.z);
          for (const w of st.walls) { const d = w.userData.wall; w.visible = d.keep || (cx - d.p[0]) * d.n[0] + (cz - d.p[1]) * d.n[1] > -0.5; }
        }
      };
    })();
    window.__hs = HS;
