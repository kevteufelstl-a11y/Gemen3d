    // ===== Bedienoberfläche aufgeräumt: Entfernungs-Knopf, Ziel-Menü, Stationsnamen nur bei Bedarf, Boden-Navigation, Vollbild =====
    const HUD = (() => {
      const STAGES = [["nah", "Nah"], ["mittel", "Mittel"], ["weit", "Weit"], ["karte", "Karte"]];
      const css = document.createElement("style");
      css.textContent = "#presets,#chips{display:none!important}"
        + "#hud-dist{min-width:86px}#hud-dist small{opacity:.7;font-weight:600;margin-right:4px}"
        + "#hud-goal{position:fixed;left:50%;transform:translateX(-50%);top:max(10px,env(safe-area-inset-top));z-index:25;display:none;align-items:center;gap:8px;padding:4px 4px 4px 12px;border-radius:14px;background:rgba(6,16,14,.88);border:1px solid rgba(89,255,90,.45);color:#fff;font:700 14px system-ui,sans-serif;box-shadow:0 0 14px rgba(89,255,90,.25);max-width:46vw}#hud-goal.show{display:flex}#hud-goal span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#hud-goal button{min-width:40px;min-height:40px;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:#1a2a24;color:#fff;font-size:16px}"
        + "#hud-ziel-box .zl{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px;text-align:left}#hud-ziel-box .zl button{min-height:52px;padding:8px 12px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.05);color:var(--ink);font:700 15px system-ui,sans-serif;text-align:left;display:flex;gap:10px;align-items:center}#hud-ziel-box .zl b{display:inline-flex;width:30px;height:30px;flex:0 0 30px;border-radius:50%;align-items:center;justify-content:center;border:2px solid var(--g);color:var(--g)}#hud-ziel-box .zl small{display:block;color:var(--mut);font-weight:500}"
        // Vollbild: nur das Nötigste bleibt sichtbar
        + "body.immersive #title,body.immersive #btn-set,body.immersive #btn-fam,body.immersive #hud-dist,body.immersive #lzbar,body.immersive #hud-goal:not(.show),body.immersive .ko-top,body.immersive #btn-weapon,body.immersive #hint{display:none!important}body.immersive #hud{opacity:.7}body.immersive .vig{opacity:.6}"
        // Handy (kleine Höhe im Querformat oder schmal im Hochformat): eigene, daumenfreundliche Anordnung. Tablet bleibt unverändert.
        + "@media (max-height:520px),(max-width:560px){"
        + "#top{top:max(6px,env(safe-area-inset-top));justify-content:flex-end!important}#title{display:none!important}.tools{gap:6px!important}.tools .btn{min-width:44px!important;height:44px!important;padding:0 8px!important;font-size:18px!important}#hud-dist{font-size:14px!important;min-width:76px!important}"
        + "#lzbar{width:auto!important;max-width:min(330px,42vw)!important;min-width:0!important;padding:3px 8px!important;font-size:11px!important;top:max(6px,env(safe-area-inset-top))!important}#lzbar>div:nth-child(3){white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#lzbar .shl{display:none!important}"
        + "#hud{top:auto!important;bottom:calc(150px + env(safe-area-inset-bottom))!important;left:max(10px,env(safe-area-inset-left))!important;width:auto!important;min-width:0!important;padding:4px 8px!important;transform:none!important}#hud .row{font-size:10px!important;margin-bottom:2px!important}#hud #hp{height:5px!important}"
        + "#right{top:auto!important;transform:none!important;bottom:calc(12px + env(safe-area-inset-bottom))!important;right:max(12px,env(safe-area-inset-right))!important;display:grid!important;grid-template-columns:58px 76px;grid-template-areas:'wp sh' 'dog atk';gap:8px!important;align-items:end;justify-items:end}#right .btn{min-width:58px!important;width:58px;height:58px!important;border-radius:16px!important;padding:0!important}#btn-atk{grid-area:atk;width:76px!important;min-width:76px!important;height:76px!important;font-size:32px!important}#btn-dog{grid-area:dog}#btn-shield{grid-area:sh}#btn-weapon{grid-area:wp;font-size:11px!important;white-space:normal!important;line-height:1.1}"
        + "#joy{width:120px!important;height:120px!important;bottom:calc(14px + env(safe-area-inset-bottom))!important;left:max(14px,env(safe-area-inset-left))!important}"
        + "#hud-goal{top:auto;bottom:calc(10px + env(safe-area-inset-bottom));max-width:44vw;font-size:13px}#card{max-width:min(420px,60vw)!important}"
        + "#hs-dock{bottom:calc(6px + env(safe-area-inset-bottom))!important}body.kx-in #joy{bottom:calc(70px + env(safe-area-inset-bottom))!important}body.kx-in #right{display:none!important}"
        + "}";
      document.head.append(css);
      const tools = document.querySelector("#top .tools"), pov = te("btn-pov");
      // 1) Ein Knopf für die Entfernung: wechselt Nah -> Mittel -> Weit -> Karte -> Nah
      const dist = K("button", { class: "btn", id: "hud-dist", title: "Entfernung wechseln" });
      const cur = () => { const on = document.querySelector("[data-preset].on"); return on ? on.dataset.preset : "nah"; };
      const label = () => { const k = cur(), s2 = STAGES.find((x) => x[0] === k) || STAGES[0]; dist.replaceChildren(K("small", {}, "\u{1F52D}"), s2[1]); };
      dist.onclick = () => { const i2 = STAGES.findIndex((x) => x[0] === cur()), nx = STAGES[(i2 + 1) % STAGES.length][0], b = document.querySelector('[data-preset="' + nx + '"]'); b && b.click(), label(); };
      pov && pov.after(dist), label();
      new MutationObserver(label).observe(te("presets"), { subtree: true, attributes: true, attributeFilter: ["class"] });
      // 2) Ziel-Menü statt dauerhaft sichtbarer Stationsnamen
      const ziel = K("button", { class: "btn", id: "hud-ziel", title: "Ziel wählen" }, "\u{1F9ED}");
      dist.after(ziel);
      ziel.onclick = () => {
        const list = o.stations.slice().sort((a, b) => (a.id === 0 ? -1 : b.id === 0 ? 1 : 0) || Math.hypot(l.x - a.wx, l.z - a.wz) - Math.hypot(l.x - b.wx, l.z - b.wz));
        ln().append(KO_box("wide", K("div", { id: "hud-ziel-box" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F9ED} Wohin möchtest du?"), K("button", { class: "qx", onclick: Ys }, "✕")),
          K("div", { class: "zl" }, list.map((k) => K("button", { onclick: () => { Ys(), go(k); } }, K("b", {}, k.custom ? "＋" : k.id === 0 ? "★" : String(k.id)), K("span", {}, k.name, K("small", {}, Math.round(Math.hypot(l.x - k.wx, l.z - k.wz)) + " m entfernt"))))))));
      };
      function go(k) {
        It(k);
        window.__tp ? window.__tpGo(k) : l.goTo(k.wx, k.wz) ? (V.follow = true, C.dist = Math.min(C.dist, 45)) : Zs("Dorthin gibt es gerade keinen Weg.");
        nav.st = k;
      }
      // 3) Ziel-Anzeige oben (Name + Entfernung, ✕ bricht ab)
      const goal = K("div", { id: "hud-goal" }, K("span", {}), K("button", { title: "Ziel abbrechen", onclick: () => cancel() }, "✕"));
      document.body.append(goal);
      function cancel() { l.stop && l.stop(), l.path = null, nav.st = null, window.__selSt = null, te("card") && te("card").classList.remove("show"); }
      // 4) Stationsnamen: nur für das gewählte Ziel / die geöffnete Station; auf der Karte nur kleine Nummern
      const nav = { st: null, last: "" };
      function pin(k, el) {
        const sel = k === nav.st || k === window.__selSt && te("card") && te("card").classList.contains("show");
        if (sel) {
          el.classList.remove("small");
          const d = Math.round(Math.hypot(l.x - k.wx, l.z - k.wz) / 5) * 5, t2 = k.name + (d > 8 ? " · " + d + " m" : "");
          el._t !== t2 && (el._t = t2, el.querySelector(".t").textContent = t2);
          return true;
        }
        if (V.dist > 200) return el.classList.add("small"), true;
        return false;
      }
      // 5) Boden-Navigation: leuchtende Pfeile entlang des echten Laufwegs (nutzt die vorhandene Wegfindung, nie durch Wände)
      const N = 48, gb = new Ot(), up = [0, 1, 0];
      for (const sx of [-1, 1]) gb.triS([0, 0, 0.32], [sx * 0.42, 0, -0.08], [sx * 0.3, 0, -0.2], [0, 0], [0, 0], [0, 0], [1, 1, 1], up, up, up), gb.triS([0, 0, 0.32], [sx * 0.3, 0, -0.2], [0, 0, 0.14], [0, 0], [0, 0], [0, 0], [1, 1, 1], up, up, up);
      const arrows = new ri(gb.toGeometry(), new se({ color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false, toneMapped: false, blending: 2, side: 2 }), N);
      arrows.frustumCulled = false, arrows.renderOrder = 15, arrows.count = 0, arrows.layers.enable(1), n.add(arrows);
      const dm = new pe(), colA = new Xt(0x59ffd0), colB = new Xt();
      for (let i2 = 0; i2 < N; i2++) arrows.setColorAt(i2, colA);
      function navUpdate(t) {
        const P = l.path;
        let len = 0;
        if (P && P.length) { let px = l.x, pz = l.z; for (const q of P) len += Math.hypot(q[0] - px, q[1] - pz), px = q[0], pz = q[1]; }
        if (!P || !P.length || len < 4) {
          arrows.count = 0;
          if (nav.st && !P) { const d = Math.hypot(l.x - nav.st.wx, l.z - nav.st.wz); d < 14 && (nav.st = null); }
        } else {
          const SP = 1.5, ph = t * 1.6 % SP;
          let k2 = 0, px = l.x, pz = l.z, acc = -(1.2 + ph);
          for (const q of P) {
            const dx = q[0] - px, dz = q[1] - pz, sl = Math.hypot(dx, dz);
            if (sl < 1e-3) continue;
            const yaw = Math.atan2(dx, dz);
            let s2 = -acc;
            while (s2 < 0) s2 += SP;
            for (; s2 < sl && k2 < N; s2 += SP) {
              const tt = s2 / sl, fade = Math.max(0.15, 1 - k2 / N);
              dm.position.set(px + dx * tt, 0.09, pz + dz * tt), dm.rotation.set(0, yaw, 0), dm.scale.setScalar(1), dm.updateMatrix(), arrows.setMatrixAt(k2, dm.matrix);
              colB.copy(colA).multiplyScalar(fade * (0.75 + 0.25 * Math.sin(t * 4 - k2 * 0.5))), arrows.setColorAt(k2, colB), k2++;
            }
            acc += sl, acc = acc % SP, px = q[0], pz = q[1];
            if (k2 >= N) break;
          }
          arrows.count = k2, arrows.instanceMatrix.needsUpdate = true, arrows.instanceColor && (arrows.instanceColor.needsUpdate = true);
        }
        // An einer Lernzone angekommen: Stationskarte (Aufgaben / Wettbewerb) öffnet sich automatisch
        if (!window.__quizOpen && !document.body.classList.contains("kx-in")) {
          let best = null, bd = 1e9;
          for (const k of o.stations) { const d = Math.hypot(l.x - k.wx, l.z - k.wz); d < bd && (bd = d, best = k); }
          const near = best && bd < (P && P.length && nav.st !== best ? 12 : 24) ? best : null;
          if (near && near !== nav.here) { nav.here = near; if (!(P && P.length) || nav.st === near) It(near), nav.st === near && (nav.st = null); }
          else if (!near && nav.here && Math.hypot(l.x - nav.here.wx, l.z - nav.here.wz) > 32) nav.here = null;
        }
        // Ziel-Anzeige
        const tg = nav.st, show = !!(tg && (P && P.length || Math.hypot(l.x - tg.wx, l.z - tg.wz) > 14)) && !document.body.classList.contains("kx-in");
        if (show) { const d = Math.round(Math.hypot(l.x - tg.wx, l.z - tg.wz) / 5) * 5, tx2 = "\u{1F9ED} " + tg.name + " · " + d + " m"; tx2 !== nav.last && (nav.last = tx2, goal.firstChild.textContent = tx2); }
        goal.classList.toggle("show", show);
      }
      // 6) Vollbild: Knöpfe weg, mehr Spielwelt. Beim Verlassen kommt alles zurück.
      function full() {
        const on = !document.body.classList.contains("immersive"), d = document, el = d.documentElement;
        document.body.classList.toggle("immersive", on);
        try {
          if (on && !d.fullscreenElement) (el.requestFullscreen || el.webkitRequestFullscreen || (() => null)).call(el);
          else if (!on && d.fullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
        } catch (e) {}
        const b = te("btn-full"); b && (b.textContent = on ? "⤢" : "⛶", b.title = on ? "Vollbild beenden" : "Vollbild");
      }
      document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && document.body.classList.contains("immersive")) document.body.classList.remove("immersive"), te("btn-full") && (te("btn-full").textContent = "⛶"); });
      return { pin, navUpdate, full, go, cancel, nav, label };
    })();
    window.__hud = HUD;
