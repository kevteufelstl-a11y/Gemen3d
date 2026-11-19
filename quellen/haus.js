    // ===== Begehbares Haus im Safe Place (Innenraum mit Urkunden-, Wochen- und Monatswand) =====
    // Das Aussenhaus (o.homeMain) wird beim Betreten ausgeblendet, der Innenraum (HG) eingeblendet.
    // Begehbar wird der Raum durch Aendern des Lauf-Rasters (o.walk.blocked): Tuer + Innenraum frei, solange man drin ist.
    const HS = (() => {
      const WORLD = o, SCENE = n, CAMERA = s, PLAYER = l, CANVAS = i, MONS = h;
      const HD = WORLD.houseDef;
      if (!HD || !WORLD.walk || !WORLD.homeMain) return { update() {}, disabled: true };
      const CT = Math.cos(HD.rot), ST = Math.sin(HD.rot);
      const IW = 5.85, ID = 4.15, WALLH = 3.8, DX = 2.4, DGAP = 0.62;
      const toW = (lx, lz) => [HD.cx + lx * CT + lz * ST, HD.cz - lx * ST + lz * CT];
      const toL = (wx, wz) => { const dx = wx - HD.cx, dz = wz - HD.cz; return [dx * CT - dz * ST, dx * ST + dz * CT]; };
      // Moebel (Mitte x/z, Groesse w/d) im Hausraster: blockieren Laufzellen
      const FURN = [{ x: -0.8, z: 0.3, w: 1.3, d: 1.3 }, { x: -2.9, z: 2.5, w: 2.4, d: 1.0 }, { x: 4.9, z: 3.2, w: 0.7, d: 0.7 }, { x: -4.9, z: 3.3, w: 0.5, d: 0.5 }];
      const st = { mode: "out", built: false, open: false, saved: null, cam: null, focus: "", tm: 0, hint: false, qwas: false, dyn: null, hits: [], pulse: [], busy: false };
      const HG = new pe();
      HG.position.set(HD.cx, 0, HD.cz), HG.rotation.y = HD.rot, HG.visible = false, SCENE.add(HG);

      // ---------- Lauf-Raster: Tuer und Innenraum oeffnen/schliessen ----------
      const wk = WORLD.walk;
      const cellList = [];
      function gridInit() {
        if (st.saved) return;
        st.saved = true;
        const r = 9.5, x0 = Math.floor(HD.cx - r - wk.g0x), x1 = Math.ceil(HD.cx + r - wk.g0x), z0 = Math.floor(HD.cz - r - wk.g0z), z1 = Math.ceil(HD.cz + r - wk.g0z);
        for (let gz = Math.max(0, z0); gz <= Math.min(wk.GH - 1, z1); gz++) for (let gx = Math.max(0, x0); gx <= Math.min(wk.GW - 1, x1); gx++) {
          const [lx, lz] = toL(wk.g0x + gx + 0.5, wk.g0z + gz + 0.5);
          const foot = Math.abs(lx) < 6.9 && Math.abs(lz) < 5.1;
          const corridor = lx > 1.3 && lx < 3.5 && lz >= 3.0 && lz < 5.5;
          const interior = Math.abs(lx) < 5.4 && Math.abs(lz) < 3.75;
          if (!foot && !corridor) continue;
          const furn = FURN.some((f) => Math.abs(lx - f.x) < f.w / 2 + 0.5 && Math.abs(lz - f.z) < f.d / 2 + 0.5);
          const free = (interior || corridor) && !furn;
          cellList.push({ idx: gz * wk.GW + gx, foot, free, orig: wk.blocked[gz * wk.GW + gx] });
        }
      }
      function setOpen(on) {
        gridInit();
        if (st.open === on) return;
        st.open = on;
        for (const c of cellList) {
          if (on && c.free) { wk.blocked[c.idx] = 0; wk.reach && (wk.reach[c.idx] = 1); }
          else if (!on) { wk.blocked[c.idx] = c.orig; if (c.foot && wk.reach) wk.reach[c.idx] = 0; }
        }
      }

      // ---------- Hilfen: Leinwaende, Texturen, Text ----------
      const mk = (w, h) => { const c = ji(w, h); return [c, c.getContext("2d")]; };
      const tex = (c, aniso = 4) => Qi(c, { repeat: false, aniso });
      const rrect = (g, x, y, w, h, r) => { g.beginPath(), g.moveTo(x + r, y), g.arcTo(x + w, y, x + w, y + h, r), g.arcTo(x + w, y + h, x, y + h, r), g.arcTo(x, y + h, x, y, r), g.arcTo(x, y, x + w, y, r), g.closePath(); };
      function wrap(g, text, cx, y, maxW, lh, maxLines) {
        const words = String(text).split(" "); const lines = []; let line = "";
        for (const wd of words) { const t = line ? line + " " + wd : wd; if (g.measureText(t).width > maxW && line) { lines.push(line); line = wd; } else line = t; }
        lines.push(line);
        if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,2}$/, "…"); }
        lines.forEach((ln2, k) => g.fillText(ln2, cx, y + k * lh));
        return lines.length;
      }
      const matBasic = (map, extra = {}) => new se({ map, transparent: true, toneMapped: false, side: 2, ...extra });
      function planeMesh(w, h, mat) { return new zt(new Ke(w, h), mat); }
      // Platz an einer Wand: wall = back|left|right, u = Stelle entlang der Wand (von links nach rechts gesehen), y = Hoehe
      function place(mesh, wall, u, y, zoff) {
        if (wall === "back") mesh.position.set(u, y, -ID + zoff), mesh.rotation.y = 0;
        else if (wall === "left") mesh.position.set(-IW + zoff, y, -u), mesh.rotation.y = Math.PI / 2;
        else mesh.position.set(IW - zoff, y, u), mesh.rotation.y = -Math.PI / 2;
        return mesh;
      }
      function tileUV(geo, su, sv) { const uv = geo.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * su, uv.getY(k) * sv); }

      // ---------- Feste Einrichtung (einmal bauen) ----------
      function paperTex() {
        const [c, g] = mk(128, 256); g.fillStyle = "#f1e4c6"; g.fillRect(0, 0, 128, 256);
        g.fillStyle = "#e6d5ad"; for (let x = 0; x < 128; x += 32) g.fillRect(x, 0, 12, 256);
        g.fillStyle = "#d9c595"; for (let y = 8; y < 256; y += 28) { g.beginPath(); g.arc(16 + (y % 56 ? 0 : 32), y, 3, 0, 7); g.fill(); }
        const t = Qi(c, { repeat: true, aniso: 4 }); return t;
      }
      function woodTex(base, dark) {
        const [c, g] = mk(256, 256); g.fillStyle = base; g.fillRect(0, 0, 256, 256);
        for (let k = 0; k < 6; k++) { const y = k * 43; g.fillStyle = k % 2 ? "rgba(0,0,0,.07)" : "rgba(255,255,255,.05)"; g.fillRect(0, y, 256, 43); g.fillStyle = dark; g.fillRect(0, y, 256, 2); }
        for (let k = 0; k < 40; k++) { g.fillStyle = "rgba(60,30,10,.18)"; g.fillRect(Math.random() * 256, Math.random() * 256, 20 + Math.random() * 50, 1); }
        return Qi(c, { repeat: true, aniso: 4 });
      }
      function buildStatic() {
        if (st.built) return;
        st.built = true;
        const wallMat = new ae({ map: paperTex(), roughness: 0.95, metalness: 0 });
        const woodWall = new ae({ map: woodTex("#6a4524", "#3a2410"), roughness: 0.85 });
        const floorMat = new ae({ map: woodTex("#9a6a3c", "#5a3a1c"), roughness: 0.75, polygonOffset: true, polygonOffsetFactor: -9, polygonOffsetUnits: -9 });
        const pl = (w, h, mat, su, sv) => { const g = new Ke(w, h); tileUV(g, su, sv); const m = new zt(g, mat); return m; };
        // Boden
        const fl = pl(IW * 2, ID * 2, floorMat, IW, ID); fl.rotation.x = -Math.PI / 2; fl.position.set(0, 0.05, 0); fl.receiveShadow = true; HG.add(fl);
        // Waende (einseitig, zeigen nach innen -> von aussen unsichtbar = Puppenhaus-Schnitt)
        const wallPlane = (w, h, y, mat) => pl(w, h, mat, w / 2, h / 2);
        const back = wallPlane(IW * 2, WALLH, WALLH / 2, wallMat); back.position.set(0, WALLH / 2, -ID); HG.add(back);
        const left = wallPlane(ID * 2, WALLH, 0, wallMat); left.position.set(-IW, WALLH / 2, 0), left.rotation.y = Math.PI / 2; HG.add(left);
        const right = wallPlane(ID * 2, WALLH, 0, wallMat); right.position.set(IW, WALLH / 2, 0), right.rotation.y = -Math.PI / 2; HG.add(right);
        const fw = (x0, x1, y0, y1) => { const m = pl(x1 - x0, y1 - y0, wallMat, (x1 - x0) / 2, (y1 - y0) / 2); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, ID), m.rotation.y = Math.PI; HG.add(m); };
        fw(-IW, DX - DGAP, 0, WALLH); fw(DX + DGAP, IW, 0, WALLH); fw(DX - DGAP, DX + DGAP, 2.35, WALLH);
        // Holzvertaefelung unten
        const wain = (w) => pl(w, 1.0, woodWall, w / 2, 0.5);
        { const m = wain(IW * 2 - 0.1); m.position.set(0, 0.5, -ID + 0.012); HG.add(m); }
        { const m = wain(ID * 2 - 0.1); m.position.set(-IW + 0.012, 0.5, 0), m.rotation.y = Math.PI / 2; HG.add(m); }
        { const m = wain(ID * 2 - 0.1); m.position.set(IW - 0.012, 0.5, 0), m.rotation.y = -Math.PI / 2; HG.add(m); }
        // Holzteile (Tuerrahmen, Balken oben, Moebel) aus Vertex-Farben
        const b = new Ot();
        const wood = [0.42, 0.26, 0.13], dark = [0.28, 0.17, 0.09];
        b.box(DX - DGAP - 0.06, 1.2, ID, 0.12, 2.4, 0.3, 0, dark), b.box(DX + DGAP + 0.06, 1.2, ID, 0.12, 2.4, 0.3, 0, dark), b.box(DX, 2.4, ID, DGAP * 2 + 0.24, 0.14, 0.3, 0, dark), b.box(DX, 0.05, ID, DGAP * 2, 0.1, 0.34, 0, [0.5, 0.48, 0.45]);
        b.box(0, WALLH + 0.05, -ID, IW * 2 + 0.3, 0.14, 0.2, 0, wood), b.box(-IW, WALLH + 0.05, 0, 0.2, 0.14, ID * 2, 0, wood), b.box(IW, WALLH + 0.05, 0, 0.2, 0.14, ID * 2, 0, wood), b.box(0, WALLH + 0.05, ID, IW * 2 + 0.3, 0.14, 0.2, 0, wood);
        // Teppich
        b.box(0.2, 0.09, 0.3, 4.4, 0.04, 3.2, 0, [0.62, 0.16, 0.18]), b.box(0.2, 0.105, 0.3, 4.0, 0.03, 2.8, 0, [0.82, 0.62, 0.3]);
        // Tisch
        b.box(-0.8, 0.78, 0.3, 1.3, 0.1, 1.3, 0, wood);
        for (const [dx, dz] of [[-0.55, -0.55], [0.55, -0.55], [-0.55, 0.55], [0.55, 0.55]]) b.box(-0.8 + dx, 0.37, 0.3 + dz, 0.12, 0.74, 0.12, 0, dark);
        b.box(-0.8, 0.98, 0.3, 0.22, 0.3, 0.22, 0, [0.35, 0.6, 0.85]), b.box(-0.8, 1.2, 0.3, 0.1, 0.14, 0.1, 0, [0.95, 0.3, 0.4]);
        // Sofa
        b.box(-2.9, 0.28, 2.5, 2.4, 0.45, 0.95, 0, [0.5, 0.2, 0.22]), b.box(-2.9, 0.78, 2.9, 2.4, 0.6, 0.22, 0, [0.46, 0.17, 0.2]), b.box(-4.0, 0.5, 2.5, 0.22, 0.6, 0.95, 0, [0.42, 0.15, 0.18]), b.box(-1.8, 0.5, 2.5, 0.22, 0.6, 0.95, 0, [0.42, 0.15, 0.18]);
        b.box(-3.3, 0.6, 2.45, 0.7, 0.18, 0.55, 0.2, [0.95, 0.8, 0.35]);
        // Pflanze
        b.box(4.9, 0.25, 3.2, 0.5, 0.5, 0.5, 0, [0.7, 0.35, 0.2]);
        for (let k = 0; k < 6; k++) b.box(4.9 + Math.cos(k) * 0.12, 0.85 + k * 0.1, 3.2 + Math.sin(k) * 0.12, 0.22, 0.5, 0.22, k * 0.7, [0.2, 0.55 + k * 0.03, 0.25]);
        // Stehlampe
        b.box(-4.9, 0.7, 3.3, 0.07, 1.4, 0.07, 0, [0.2, 0.2, 0.22]), b.box(-4.9, 1.55, 3.3, 0.42, 0.34, 0.42, 0, [1, 0.88, 0.6]);
        const furnMesh = new zt(b.toGeometry(), new ae({ vertexColors: true, roughness: 0.85 }));
        furnMesh.receiveShadow = true; HG.add(furnMesh);
        // Fenster in der Vorderwand (nur Zierde)
        const [wc, wg] = mk(128, 160); const gr = wg.createLinearGradient(0, 0, 0, 160); gr.addColorStop(0, "#bfe3ff"), gr.addColorStop(1, "#fff1cf"), wg.fillStyle = gr, wg.fillRect(0, 0, 128, 160), wg.fillStyle = "#6a4524", wg.fillRect(60, 0, 8, 160), wg.fillRect(0, 76, 128, 8), wg.strokeStyle = "#6a4524", wg.lineWidth = 10, wg.strokeRect(0, 0, 128, 160);
        for (const x of [-3.6, -0.8]) { const m = planeMesh(1.0, 1.25, matBasic(tex(wc))); m.position.set(x, 1.9, ID - 0.02), m.rotation.y = Math.PI; HG.add(m); }
        // warmes Licht
        const lamp = new cn(0xffd9a0, 16, 20, 1.7); lamp.position.set(0, 3.0, 0.5); HG.add(lamp);
        const lamp2 = new cn(0xffe8c0, 8, 12, 1.8); lamp2.position.set(-4.9, 1.6, 3.3); HG.add(lamp2);
        // Wandschilder
        const sign = (txt, wall) => {
          const [c, g] = mk(512, 112); rrect(g, 6, 6, 500, 100, 24), g.fillStyle = "#6a4524", g.fill(), g.lineWidth = 6, g.strokeStyle = "#e8c070", g.stroke();
          g.fillStyle = "#fff3d0", g.font = "800 58px Georgia,serif", g.textAlign = "center", g.textBaseline = "middle", g.fillText(txt, 256, 60);
          const m = planeMesh(2.9, 0.63, matBasic(tex(c))); place(m, wall, 0, 3.45, 0.03), HG.add(m);
        };
        sign("\u{1F4C5} TAGE", "back"), sign("\u{1F3C5} WOCHEN", "left"), sign("\u{1F3C6} MONATE", "right");
      }

      // ---------- Wanddaten ----------
      const wdName = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
      function entryState(e) {
        if (!e) return "none";
        const p = e.pick;
        if (p) return p.status === "offen" ? "wartet" : p.status === "abgelehnt" ? "neu" : "fertig";
        if (e.lost) return "verpasst";
        return e.reached ? "abholen" : "gesperrt";
      }
      const BTN = {
        abholen: ["\u{1F381} Abholen", "#ffcf3a", "#3a2600"], wartet: ["⏳ Eltern", "#ff9a1f", "#3a1d00"], fertig: ["✅ Abgeholt", "#6b6f73", "#d3d7da"],
        neu: ["↻ Neu wählen", "#d94a4a", "#fff"], gesperrt: ["\u{1F512} noch offen", "#3f454d", "#aab0b6"], verpasst: ["✖ verpasst", "#5a3a3a", "#d6aaaa"]
      };
      function slotsDays() {
        const rw = RW.d, today = rw && rw.today || Tr(), out = [];
        for (let k = 6; k >= 0; k--) {
          const dt = new Date(today + "T12:00:00"); dt.setDate(dt.getDate() - k);
          const key = Tr(dt), d = (ye.days || {})[key], cert = d && d.ex && d.ex.n ? d : null;
          let kind = "tag", e = rw && rw.tag.find((x) => x.period === key) || null;
          if (!(e && (e.reached || e.pick))) { const t2 = rw && (rw.trost || []).find((x) => x.period === key); t2 && (kind = "trost", e = t2); }
          out.push({ kind, e, key, cert, label: k === 0 ? "Heute" : wdName[dt.getDay()] + " " + String(dt.getDate()).padStart(2, "0") + "." + String(dt.getMonth() + 1).padStart(2, "0") + ".",
            title: dt.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" }) });
        }
        return out;
      }
      const slotsWeeks = () => (RW.d ? RW.d.woche.slice().reverse() : []).map((e) => ({ kind: "woche", e, label: "Woche " + e.period.slice(-2), title: RW_label("woche", e) }));
      const slotsMonths = () => (RW.d ? RW.d.monat.slice().reverse() : []).map((e) => ({ kind: "monat", e, label: new Date(e.period + "-15T12:00:00").toLocaleDateString("de-DE", { month: "long" }), title: RW_label("monat", e) }));

      function plaqueCanvas(sl) {
        const [c, g] = mk(256, 458), e = sl.e;
        const gr = g.createLinearGradient(0, 0, 256, 458); gr.addColorStop(0, "#f6e7c1"), gr.addColorStop(1, "#e3c78a"), g.fillStyle = gr, g.fillRect(0, 0, 256, 458);
        g.strokeStyle = "#7a1f1f", g.lineWidth = 8, g.strokeRect(10, 10, 236, 438), g.textAlign = "center", g.fillStyle = "#2a1a0c";
        if (sl.kind === "woche" || sl.kind === "monat") {
          g.font = "800 30px Georgia,serif", g.fillText(sl.kind === "woche" ? "WOCHE " + e.period.slice(-2) : sl.label.toUpperCase(), 128, 70);
          g.font = "500 17px Georgia,serif", g.fillText(sl.kind === "woche" ? RW_fd(e.from, { day: "numeric", month: "numeric" }) + " – " + RW_fd(e.to, { day: "numeric", month: "numeric" }) : new Date(e.period + "-15T12:00:00").getFullYear(), 128, 100);
          g.font = "120px serif", g.fillText(sl.kind === "woche" ? "\u{1F3C5}" : "\u{1F3C6}", 128, 250);
          g.font = "800 28px Georgia,serif", g.fillStyle = e.lost ? "#8a1f1f" : e.reached ? "#1f6a2a" : "#2a1a0c";
          g.fillText(sl.kind === "woche" ? e.days + " von " + e.need : e.days + " von " + e.total, 128, 330), g.font = "500 18px Georgia,serif", g.fillText("Lerntagen", 128, 358);
          e.lost && (g.fillStyle = "#8a1f1f", g.font = "700 18px Georgia,serif", g.fillText("verpasst", 128, 400));
        } else {
          g.font = "800 26px Georgia,serif", g.fillText(sl.cert ? "URKUNDE" : "KEINE URKUNDE", 128, 80), g.font = "100px serif", g.fillText(sl.kind === "trost" ? "\u{1F340}" : sl.cert ? "\u{1F4DC}" : "➖", 128, 250);
          g.font = "500 18px Georgia,serif", g.fillText(sl.cert ? "Tippe zum Ansehen" : "Noch kein Lerntag", 128, 340);
        }
        return c;
      }
      const thumbs = new Map();
      function certTexture(sl) {
        const sig = sl.key + ":" + (sl.cert.sec | 0) + ":" + (sl.cert.ex.r | 0) + ":" + (sl.cert.ex.n | 0);
        let c = thumbs.get(sig);
        if (!c) {
          c = ji(256, 458), thumbs.set(sig, c);
          const g = c.getContext("2d");
          const paint = () => { try { g.clearRect(0, 0, 256, 458), g.drawImage(UK_draw(sl.cert), 0, 0, 256, 458); } catch (er) { g.drawImage(plaqueCanvas(sl), 0, 0); } st.dyn && st.dyn.traverse((m) => m.material && m.material.map && m.material.map.image === c && (m.material.map.needsUpdate = true)); };
          paint(), setTimeout(paint, 1800), setTimeout(paint, 6000);
        }
        return tex(c);
      }
      function buttonTexture(state) {
        const [lbl, bg, fg] = BTN[state], [c, g] = mk(256, 90);
        rrect(g, 4, 4, 248, 82, 26), g.fillStyle = bg, g.fill(), g.lineWidth = 5, g.strokeStyle = "rgba(255,255,255,.55)", g.stroke();
        g.fillStyle = fg, g.font = "800 38px Georgia,sans-serif", g.textAlign = "center", g.textBaseline = "middle", g.fillText(lbl, 128, 48);
        return tex(c);
      }
      function noteTexture(text) {
        const [c, g] = mk(256, 130); g.fillStyle = "#fff8d8", g.fillRect(0, 0, 256, 130), g.fillStyle = "rgba(0,0,0,.08)", g.fillRect(0, 124, 256, 6), g.fillStyle = "#c33", g.beginPath(), g.arc(128, 12, 8, 0, 7), g.fill();
        g.fillStyle = "#2a2a2a", g.font = "600 21px 'Segoe Print','Comic Sans MS',Georgia,serif", g.textAlign = "center", wrap(g, text, 128, 46, 236, 26, 3);
        return tex(c);
      }
      function labelTexture(text) {
        const [c, g] = mk(256, 56); g.fillStyle = "#3a2410", g.font = "800 34px Georgia,serif", g.textAlign = "center", g.textBaseline = "middle", g.fillText(text, 128, 30);
        return tex(c);
      }

      function addSlot(group, wall, u, sl) {
        const state = entryState(sl.e);
        // Rahmen
        const fr = planeMesh(1.0, 1.66, new se({ color: sl.cert || sl.e ? 0x7a4a22 : 0x5a4a3a, toneMapped: false, side: 2 })); place(fr, wall, u, 2.2, 0.02), group.add(fr);
        const pic = planeMesh(0.84, 1.5, matBasic(sl.cert ? certTexture(sl) : tex(plaqueCanvas(sl)), { opacity: sl.cert || sl.e ? 1 : 0.55 })); place(pic, wall, u, 2.2, 0.04), group.add(pic);
        const lb = planeMesh(1.3, 0.28, matBasic(labelTexture(sl.label))); place(lb, wall, u, 1.28, 0.03), group.add(lb);
        if (state !== "none") {
          const bt = planeMesh(1.2, 0.42, matBasic(buttonTexture(state))); place(bt, wall, u, 0.92, 0.04), group.add(bt);
          state === "abholen" && st.pulse.push(bt);
          const p = sl.e.pick;
          if (p && p.choice) { const nt = planeMesh(1.14, 0.58, matBasic(noteTexture(p.choice))); place(nt, wall, u, 0.5, 0.05), nt.rotateZ((Math.sin(u * 7) * 0.05)), group.add(nt); }
        }
        const hit = planeMesh(1.5, 2.9, new se({ transparent: true, opacity: 0, depthWrite: false, side: 2 })); place(hit, wall, u, 1.75, 0.07), hit.userData.hs = sl, group.add(hit), st.hits.push(hit);
      }
      function disposeDyn() {
        if (!st.dyn) return;
        st.dyn.traverse((m) => { m.geometry && m.geometry.dispose(), m.material && (m.material.map && m.material.map.dispose(), m.material.dispose()); });
        HG.remove(st.dyn), st.dyn = null, st.hits = [], st.pulse = [];
      }
      function buildWall() {
        buildStatic(), disposeDyn();
        const g = new pe(); st.dyn = g;
        const days = slotsDays(), weeks = slotsWeeks(), months = slotsMonths();
        days.forEach((sl, k) => addSlot(g, "back", (k - 3) * 1.62, sl));
        weeks.forEach((sl, k) => addSlot(g, "left", (k - (weeks.length - 1) / 2) * 1.4, sl));
        months.forEach((sl, k) => addSlot(g, "right", (k - (months.length - 1) / 2) * 2.2, sl));
        if (!RW.d) {
          for (const wall of ["left", "right"]) { const [c, gg] = mk(512, 128); gg.fillStyle = "rgba(255,255,255,.85)", gg.font = "700 34px Georgia,serif", gg.textAlign = "center", gg.fillText("Wochen & Monate brauchen", 256, 52), gg.fillText("Internet und ein Spieler-Konto", 256, 96); const m = planeMesh(3.4, 0.85, matBasic(tex(c))); place(m, wall, 0, 2.0, 0.05), g.add(m); }
        }
        HG.add(g);
      }
      function refresh() {
        st.dyn || buildWall();
        Promise.resolve().then(() => RW_fetch()).catch(() => null).then(() => st.mode !== "out" && buildWall());
      }

      // ---------- Tippen ----------
      const rc = new Bo(), ndc = new Bt();
      function pick(ev, objs) { ndc.set(ev.clientX / innerWidth * 2 - 1, -(ev.clientY / innerHeight) * 2 + 1), rc.setFromCamera(ndc, CAMERA); const h = rc.intersectObjects(objs, true); return h.length ? h[0] : null; }
      function openSlot(sl) {
        const kids = [];
        if (sl.cert) {
          let c; try { c = UK_draw(sl.cert); } catch (er) { c = K("p", { class: "qmsg" }, "Die Urkunde kann gerade nicht angezeigt werden."); }
          if (c.style) c.style.cssText = "width:100%;max-width:340px;border-radius:8px;display:block;margin:6px auto;box-shadow:0 4px 18px #000a";
          kids.push(c);
          if (c.getContext) kids.push(K("button", { class: "qbtn", onclick: () => UK_save(h_(c), "Urkunde-" + sl.key + ".pdf") }, "\u2B07 PDF / Teilen"));
        }
        if (sl.e && RW.d) kids.push(RW_item(sl.kind, sl.e));
        else kids.push(K("p", { class: "qmsg" }, sl.cert ? "Für diese Urkunde gibt es keine Belohnung (oder du bist nicht angemeldet)." : "An diesem Tag gibt es noch nichts zu sehen."));
        ln().append(KO_box("wide", K("div", { class: "qhead" }, K("h2", {}, sl.title || sl.label), K("button", { class: "qx", onclick: Ys }, "✕")), ...kids, K("button", { class: "qbtn", onclick: Ys }, "Schließen")));
      }
      function askEnter() {
        if (st.mode !== "out" || st.busy) return;
        const [ddx, ddz] = toW(DX, 5.0);
        if (Math.hypot(PLAYER.x - ddx, PLAYER.z - ddz) > 35) return void Zs("Geh erst näher ans Haus.");
        ln().append(KO_box("", K("h2", {}, "\u{1F3E0} Haus betreten?"), K("p", { class: "qmsg" }, "Möchtest du das Haus betreten? Drinnen hängen deine Urkunden und Belohnungen."), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: () => (Ys(), enter()) }, "Ja, rein!"), K("button", { class: "qbtn", onclick: Ys }, "Nein"))));
      }
      window.__hsTap = (ev) => {
        if (window.__quizOpen) return false;
        if (st.mode === "in" || st.mode === "leaving") {
          const h = st.hits.length && pick(ev, st.hits);
          if (h && h.object.userData.hs) return openSlot(h.object.userData.hs), true;
          return false;
        }
        if (st.mode === "out" && pick(ev, WORLD.homeMain)) return askEnter(), true;
        return st.mode === "entering" && !!pick(ev, WORLD.homeMain);
      };

      // ---------- Betreten / Verlassen ----------
      const fade = document.createElement("div");
      fade.style.cssText = "position:fixed;inset:0;background:#000;opacity:0;pointer-events:none;transition:opacity .22s;z-index:45";
      document.body.append(fade);
      const doFade = (mid) => { fade.style.opacity = 1; setTimeout(() => { mid(), setTimeout(() => (fade.style.opacity = 0), 60); }, 240); };
      const dock = K("div", { id: "hs-dock" });
      const sty = document.createElement("style");
      sty.textContent = "#hs-dock{position:fixed;left:0;right:0;bottom:0;z-index:30;padding:8px max(12px,env(safe-area-inset-right)) calc(10px + env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left));display:none;gap:6px;overflow-x:auto;background:linear-gradient(transparent,rgba(0,0,0,.65));touch-action:pan-x;scrollbar-width:none}#hs-dock.show{display:flex}#hs-dock .chip:first-child{margin-left:auto}#hs-dock .chip:last-child{margin-right:auto}";
      document.head.append(sty), document.body.append(dock);
      const camFor = { back: [HD.rot, 0, -ID - 2.0], left: [Math.PI / 2 + HD.rot, -IW - 2.0, 0], right: [-Math.PI / 2 + HD.rot, IW + 2.0, 0] };
      function focus(wall) {
        st.pan = st.focus === wall ? (st.pan || 0) : 0;
        const [yaw, lx0, lz0] = camFor[wall], lx = wall === "back" ? lx0 + st.pan : lx0, lz = wall === "back" ? lz0 : lz0 + st.pan, [wx, wz] = toW(lx, lz), portrait = innerWidth < innerHeight;
        V.follow = false, C.tx = wx, C.tz = wz, C.yaw = yaw, C.pitch = 0.62, C.dist = portrait ? 22 : 19, st.focus = wall;
      }
      function pan(d) { st.pan = Math.max(-4.5, Math.min(4.5, (st.pan || 0) + d)); if (st.focus) focus(st.focus); }
      function follow() { V.follow = true, C.yaw = HD.rot, C.pitch = 1.0, C.dist = innerWidth < innerHeight ? 36 : 28, st.focus = ""; }
      function setDock() {
        dock.replaceChildren(K("button", { class: "chip", onclick: leave }, "\u{1F6AA} Raus"), K("button", { class: "chip", onclick: () => focus("back") }, "\u{1F4C5} Tage"), K("button", { class: "chip", onclick: () => focus("left") }, "\u{1F3C5} Wochen"), K("button", { class: "chip", onclick: () => focus("right") }, "\u{1F3C6} Monate"), K("button", { class: "chip", onclick: follow }, "\u{1F464} Folgen"), K("button", { class: "chip", onclick: () => pan(-3) }, "\u25C0"), K("button", { class: "chip", onclick: () => pan(3) }, "\u25B6"));
      }
      const chipsEl = () => document.getElementById("chips");
      function enter() {
        if (st.mode !== "out" || st.busy) return;
        setOpen(true);
        const tgt = toW(DX, 1.8), ok = PLAYER.goTo(tgt[0], tgt[1]);
        if (!ok) { setOpen(false), Zs("Der Weg ins Haus ist gerade versperrt."); return; }
        st.mode = "entering", st.tm = 0, V.follow = true;
      }
      function arrive() {
        st.mode = "in", st.tm = 0, st.busy = true;
        doFade(() => {
          buildStatic(), WORLD.homeMain.forEach((m) => (m.visible = false)), HG.visible = true;
          st.cam = { dist: C.dist, pitch: C.pitch, yaw: C.yaw }, setDock(), dock.classList.add("show"), chipsEl() && (chipsEl().style.display = "none");
          V.follow = true, C.yaw = V.yaw = HD.rot, C.pitch = V.pitch = 1.0, C.dist = V.dist = innerWidth < innerHeight ? 36 : 28;
          refresh(), st.busy = false;
        });
      }
      function leave() {
        if (st.mode !== "in") return;
        const tgt = toW(DX, 6.2) , ok = PLAYER.goTo(tgt[0], tgt[1]);
        if (!ok) { const t2 = WORLD.walk.nearest(tgt[0], tgt[1]); t2 && (PLAYER.x = t2[0], PLAYER.z = t2[1], PLAYER.path = null); }
        st.mode = "leaving", st.tm = 0, V.follow = true;
      }
      function done() {
        st.mode = "out", st.tm = 0, st.busy = true;
        doFade(() => {
          HG.visible = false, WORLD.homeMain.forEach((m) => (m.visible = true)), dock.classList.remove("show"), chipsEl() && (chipsEl().style.display = "");
          if (st.cam) C.dist = st.cam.dist, C.pitch = st.cam.pitch, C.yaw = st.cam.yaw, st.cam = null;
          V.follow = true, setOpen(false), st.focus = "", st.busy = false;
          const dg = MONS && MONS.dog;
          if (dg) { const [dlx, dlz] = toL(dg.x, dg.z); if (Math.abs(dlx) < 6.9 && Math.abs(dlz) < 5.1) { const t2 = toW(DX + 0.8, 6.4); dg.x = t2[0], dg.z = t2[1]; } }
        });
      }

      return {
        enter, leave, askEnter, refresh, focus, follow, setOpen, toW, toL, st, HG, openSlot, P: PLAYER, W: WORLD,
        update(dt, t) {
          const [lx, lz] = toL(PLAYER.x, PLAYER.z);
          if (st.mode === "entering") {
            st.tm += dt;
            if (Math.abs(lx) < 5.3 && lz < 3.8) arrive();
            else if (st.tm > 25 || (st.tm > 2 && !PLAYER.path && lz > 4.0)) st.mode = "out", setOpen(false), Zs("Du bist nicht hineingegangen.");
          } else if (st.mode === "in" || st.mode === "leaving") {
            st.tm += dt;
            for (const m of st.pulse) { const k = 1 + 0.06 * Math.sin(t * 5); m.scale.set(k, k, 1); }
            const out = lz > 5.3 || Math.abs(lx) > 7.5 || lz < -6.5;
            if (out && !st.busy) done();
            else if (st.mode === "in") {
              const qo = !!window.__quizOpen;
              st.qwas && !qo && refresh(), st.qwas = qo;
            }
          } else {
            const [dx, dz] = toW(DX, 5.0);
            if (!st.hint && Math.hypot(PLAYER.x - dx, PLAYER.z - dz) < 5) st.hint = true, Zs("\u{1F3E0} Tippe aufs Haus, um hineinzugehen.");
            else if (st.hint && Math.hypot(PLAYER.x - dx, PLAYER.z - dz) > 14) st.hint = false;
          }
        }
      };
    })();
    window.__hs = HS;
