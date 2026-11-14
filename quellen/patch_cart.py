# Waffen-Karren: Start nur Faust, Waffen durch Aufgaben, Auswahl per Tipp auf den Karren
rep('const W2 = [{ n: "Faust", ic: "\\u270A", dmg: 6, rng: 3.4, cd: 0.45, need: 0 }, { n: "Schwert", ic: "\\u{1F5E1}", dmg: 18, rng: 4.8, cd: 0.6, need: 10 }, { n: "Pistole", ic: "\\u{1F52B}", dmg: 12, rng: 28, cd: 0.35, need: 30 }];',
    'const W2 = [{ n: "Faust", ic: "\\u270A", dmg: 6, rng: 3.4, cd: 0.45, need: 0 }, { n: "Stein", ic: "\\u{1FAA8}", dmg: 9, rng: 16, cd: 0.5, need: 3 }, { n: "Stock", ic: "\\u{1F3D2}", dmg: 12, rng: 4.2, cd: 0.5, need: 6 }, { n: "Schwert", ic: "\\u{1F5E1}", dmg: 18, rng: 4.8, cd: 0.6, need: 10 }, { n: "Pistole", ic: "\\u{1F52B}", dmg: 12, rng: 28, cd: 0.35, need: 30 }];', 'Waffenliste')
rep('''      const cw = () => {
        const a2 = avail();
        return a2[cur] || a2[0];
      };''', '''      let selN = "Faust";
      try { selN = localStorage.getItem("milo3d_weapon") || "Faust"; } catch (e2) {}
      const cw = () => {
        const a2 = avail();
        return a2.find((w2) => w2.n === selN) || a2[0];
      };''', 'cw')
rep('''        cycle() {
          const a2 = avail();
          if (a2.length > 1) cur = (cur + 1) % a2.length;
        },''', '''        cycle() {
          window.__openPick && window.__openPick();
        },
        list() {
          const n2 = correct();
          return W2.map((w2) => ({ n: w2.n, ic: w2.ic, need: w2.need, open: all || n2 >= w2.need, sel: cw().n === w2.n }));
        },
        pick(nm) {
          const w2 = W2.find((x2) => x2.n === nm);
          if (w2 && (all || correct() >= w2.need)) {
            selN = nm;
            try { localStorage.setItem("milo3d_weapon", nm); } catch (e2) {}
          }
        },''', 'cycle')
rep('Zs(w2.ic + " " + w2.n + " freigeschaltet!")', 'Zs(w2.ic + " " + w2.n + " freigeschaltet! Liegt im Karren.")', 'Freischalt-Toast')
rep('''            const sh2 = av.length > 1 ? "flex" : "none";
            if (wb.style.display !== sh2) wb.style.display = sh2;
            const tx2 = "\\u21BB " + cw().n;''', '''            if (wb.style.display !== "flex") wb.style.display = "flex";
            const tx2 = "\\u{1F6D2} " + cw().n;''', 'Waffenknopf')
rep('if (w2.n === "Pistole") {\n            FX.beam({ x: l.x, y: 1.35, z: l.z }, { x: best.x, y: 1.2, z: best.z }, 16769110);',
    'if (w2.n === "Pistole" || w2.n === "Stein") {\n            FX.beam({ x: l.x, y: 1.35, z: l.z }, { x: best.x, y: 1.2, z: best.z }, w2.n === "Stein" ? 10132122 : 16769110);', 'Fernwaffen')

CART = r'''
    let CART = (() => {
      const g2 = new pe();
      o.root.add(g2);
      const wood = new ae({ color: 9127187, roughness: 0.9 }), dark = new ae({ color: 4009754, roughness: 0.9 }), rock = new ae({ color: 8421504, roughness: 0.95 }), steel = new ae({ color: 12303291, roughness: 0.4, metalness: 0.6 });
      const bx = (m2, x2, y2, z2, w3, h3, d3, par) => { const q2 = new zt(new qi(w3, h3, d3), m2); q2.position.set(x2, y2, z2); (par || g2).add(q2); return q2; };
      bx(wood, 0, 0.62, 0, 1.3, 0.12, 1.7);
      bx(wood, -0.65, 0.85, 0, 0.1, 0.4, 1.7);
      bx(wood, 0.65, 0.85, 0, 0.1, 0.4, 1.7);
      bx(wood, 0, 0.85, -0.85, 1.3, 0.4, 0.1);
      bx(wood, 0, 0.85, 0.85, 1.3, 0.4, 0.1);
      bx(dark, 0, 0.7, 1.7, 0.1, 0.1, 1.3).rotation.x = 0.18;
      bx(dark, 0, 0.98, 2.3, 1.0, 0.1, 0.1);
      const wheels = [-0.78, 0.78].map((x2) => { const w3 = new zt(new sn(0.42, 0.42, 0.12, 14), dark); w3.rotation.z = Math.PI / 2; w3.position.set(x2, 0.42, -0.1); g2.add(w3); return w3; });
      const loot = {};
      loot["Stein"] = new zt(new Dn(1, 8, 6), rock); loot["Stein"].scale.set(0.22, 0.17, 0.2); loot["Stein"].position.set(-0.35, 1.08, -0.3);
      loot["Stock"] = new zt(new sn(0.04, 0.05, 1.3, 6), wood); loot["Stock"].rotation.z = 1.2; loot["Stock"].rotation.x = 0.2; loot["Stock"].position.set(0.1, 1.0, 0.2);
      loot["Schwert"] = new pe(); bx(steel, 0, 0, 0, 0.09, 0.07, 1.1, loot["Schwert"]); bx(dark, 0, 0, -0.62, 0.3, 0.07, 0.08, loot["Schwert"]); loot["Schwert"].position.set(0.3, 1.1, -0.1); loot["Schwert"].rotation.y = 0.3;
      loot["Pistole"] = new pe(); bx(dark, 0, 0, 0, 0.1, 0.14, 0.4, loot["Pistole"]); bx(dark, 0, -0.14, -0.12, 0.09, 0.22, 0.1, loot["Pistole"]); loot["Pistole"].position.set(-0.2, 1.1, 0.5);
      for (const k2 in loot) { loot[k2].visible = false; g2.add(loot[k2]); }
      const C3 = { x: 0, z: 0, yaw: 0, inited: false, ph: 0 };
      const pv = new Y();
      let ov = null;
      function mkUI() {
        const st2 = document.createElement("style");
        st2.textContent = "#wp-pick{position:fixed;inset:0;z-index:99980;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.6);touch-action:auto}#wp-pick.show{display:flex}#wp-pick .box{width:min(380px,calc(100vw - 28px));padding:16px;background:rgba(6,14,12,.98);border:2px solid #7dff7a;border-radius:16px;color:#eaffea;font-family:inherit;text-align:center}#wp-pick .grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}#wp-pick button{min-height:62px;border-radius:12px;border:1px solid #2c5;background:rgba(255,255,255,.08);color:#fff;font-size:14px;font-family:inherit}#wp-pick button b{display:block;font-size:26px}#wp-pick button.sel{background:#2c7a3a;border-color:#7dff7a}#wp-pick button.lock{opacity:.45}#wp-pick small{opacity:.8}";
        document.head.appendChild(st2);
        ov = document.createElement("div");
        ov.id = "wp-pick";
        document.body.appendChild(ov);
        ov.addEventListener("pointerdown", (ev) => ev.stopPropagation());
      }
      function render() {
        const L2 = ATK.list();
        ov.innerHTML = '<div class="box"><b>\u{1F6D2} Dein Waffen-Karren</b><br><small>Waffen schaltest du durch richtige Antworten frei.</small><div class="grid"></div><button id="wp-x" style="width:100%;min-height:42px">Schließen</button></div>';
        const gr = ov.querySelector(".grid");
        for (const w3 of L2) {
          const b2 = document.createElement("button");
          b2.className = (w3.sel ? "sel " : "") + (w3.open ? "" : "lock");
          b2.innerHTML = "<b>" + (w3.open ? w3.ic : "\u{1F512}") + "</b>" + w3.n + (w3.open ? "" : "<br><small>ab " + w3.need + " richtig</small>");
          b2.onclick = () => { if (w3.open) { ATK.pick(w3.n); api.close(); try { Zs(w3.ic + " " + w3.n + " ausgewählt"); } catch (e2) {} } };
          gr.appendChild(b2);
        }
        ov.querySelector("#wp-x").onclick = () => api.close();
      }
      const api = {
        C: C3,
        open() { if (!ov) mkUI(); render(); ov.classList.add("show"); },
        close() { ov && ov.classList.remove("show"); },
        update(dt2, t2) {
          if (!h.enabled && false) return;
          const fx2 = Math.sin(l.yaw), fz2 = Math.cos(l.yaw);
          let tx2 = l.x - fx2 * 3.2, tz2 = l.z - fz2 * 3.2;
          if (!C3.inited) { C3.inited = true; C3.x = tx2; C3.z = tz2; }
          if (!o.walk.ok(tx2, tz2)) { const q2 = o.walk.nearest(tx2, tz2); if (q2) { tx2 = q2[0]; tz2 = q2[1]; } else { tx2 = l.x; tz2 = l.z; } }
          const dx2 = tx2 - C3.x, dz2 = tz2 - C3.z, d2 = Math.hypot(dx2, dz2);
          if (d2 > 14) { C3.x = tx2; C3.z = tz2; }
          else if (d2 > 0.05) {
            const spd = Math.min(d2 * 3.5, 9), st3 = Math.min(d2, spd * dt2);
            C3.x += dx2 / d2 * st3; C3.z += dz2 / d2 * st3;
            C3.ph += st3 / 0.42;
            let a2 = Math.atan2(l.x - C3.x, l.z - C3.z) - C3.yaw;
            a2 = Math.atan2(Math.sin(a2), Math.cos(a2));
            C3.yaw += a2 * Math.min(1, dt2 * 6);
          }
          g2.position.set(C3.x, 0, C3.z);
          g2.rotation.y = C3.yaw;
          wheels.forEach((w3) => { w3.rotation.x = C3.ph; });
          g2.visible = true;
          const n2 = ATK.list();
          for (const w3 of n2) if (loot[w3.n]) loot[w3.n].visible = w3.open;
        }
      };
      window.__openPick = () => api.open();
      document.addEventListener("pointerdown", (ev) => {
        if (window.__quizOpen || !g2.visible || (ov && ov.classList.contains("show"))) return;
        if (!ev.target || ev.target.tagName !== "CANVAS") return;
        pv.set(C3.x, 0.9, C3.z).project(s);
        if (pv.z > 1) return;
        const px = (pv.x * 0.5 + 0.5) * innerWidth, py = (-pv.y * 0.5 + 0.5) * innerHeight;
        if (Math.hypot(ev.clientX - px, ev.clientY - py) < 52) {
          ev.preventDefault();
          ev.stopImmediatePropagation();
          api.open();
        }
      }, true);
      return api;
    })();
'''
rep('    h.dogHit = null;\n    h.dogHit = (d2, C2) => DOG.hit(d2, C2);', CART + '    h.dogHit = null;\n    h.dogHit = (d2, C2) => DOG.hit(d2, C2);', 'Karren einfuegen')
rep('ATK.update(Q, _t), d.style.width', 'ATK.update(Q, _t), CART.update(Q, _t), d.style.width', 'Karren-Update')
rep('{ k: "wp", l: "Waffen", o: ["Durch Aufgaben", "Alle offen (Test)"], n: "Schwert ab 10, Pistole ab 30 richtigen Antworten" }',
    '{ k: "wp", l: "Waffen", o: ["Durch Aufgaben", "Alle offen (Test)"], n: "Start: Faust. Stein ab 3, Stock ab 6, Schwert ab 10, Pistole ab 30 richtigen Antworten. Sie liegen im Karren (antippen)." }', 'Settings-Text')
