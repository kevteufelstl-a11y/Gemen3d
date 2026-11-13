    // ===== Zusammen spielen (Mehrspieler) =====
    const MP = (() => {
      const LIB = window.__MP;
      const SB_URL = "https://kdhkricbouhnznnduget.supabase.co";
      const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaGtyaWNib3VobnpubmR1Z2V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4NzQ5MjEsImV4cCI6MjEwOTQ1MDkyMX0.uCCgIaTGO8is4FagVPgvJcIEoZdpqo4OryS9ktXisbE";
      const SLOTS = [
        { name: "Gold", tint: [1, 1, 1], amt: 0, jacket: [0.22, 0.3, 0.2], arrow: 6750054, css: "#ffd24a" },
        { name: "Blau", tint: [0.3, 0.65, 1], amt: 0.85, jacket: [0.15, 0.3, 0.7], arrow: 5614335, css: "#55aaff" },
        { name: "Rot", tint: [1, 0.3, 0.35], amt: 0.85, jacket: [0.65, 0.18, 0.2], arrow: 16733030, css: "#ff6677" },
        { name: "Lila", tint: [0.8, 0.4, 1], amt: 0.85, jacket: [0.45, 0.2, 0.6], arrow: 13395711, css: "#cc77ff" }
      ];
      const TYPES = ["spider", "blob", "stilt", "eye", "bat"];
      const css = document.createElement("style");
      css.textContent = `
#mp,#mp-inv{position:fixed;z-index:35;color:var(--ink);font-family:inherit;user-select:text;-webkit-user-select:text}
#mp{inset:0;display:none;align-items:center;justify-content:center;background:rgba(3,8,6,.8);touch-action:auto}
#mp.show{display:flex}
#mp .box{width:min(420px,calc(100vw - 24px));max-height:calc(100vh - 24px);overflow:auto;padding:16px;background:rgba(6,14,12,.97);border:1px solid var(--line);border-radius:14px}
#mp h3{margin:0 0 8px;color:var(--g)} #mp p{margin:6px 0;font-size:14px;line-height:1.45} #mp small{color:var(--mut)}
#mp input{height:44px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.08);color:#fff;font:600 18px inherit;padding:0 10px;width:100%;touch-action:auto;user-select:text;-webkit-user-select:text;text-transform:uppercase}
#mp input.nm{text-transform:none}
#mp .row{display:flex;gap:8px;margin:10px 0;align-items:center}
#mp .b{flex:1;min-height:46px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.07);color:var(--ink);font:700 15px inherit;cursor:pointer}
#mp .b.go{background:rgba(89,255,90,.22);border-color:var(--g)} #mp .b:active{background:rgba(89,255,90,.3)}
#mp .code{font:800 40px/1 inherit;letter-spacing:.3em;text-align:center;color:#fff;margin:10px 0}
#mp .pl{display:flex;align-items:center;gap:8px;margin:5px 0;font-size:15px} #mp .dot{width:14px;height:14px;border-radius:50%}
#mp-inv{left:50%;transform:translateX(-50%);top:max(70px,calc(env(safe-area-inset-top) + 64px));width:min(420px,calc(100vw - 24px));padding:12px;display:none;background:rgba(6,14,12,.96);border:1px solid var(--g);border-radius:12px;touch-action:auto}
#mp-inv.show{display:block} #mp-inv .row{display:flex;gap:8px;margin-top:8px}
#mp-inv button{flex:1;min-height:42px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.07);color:var(--ink);font:700 14px inherit;cursor:pointer}
#mp-inv button.go{background:rgba(89,255,90,.25);border-color:var(--g)}
.mprank{display:flex;align-items:center;gap:10px;padding:10px 12px;margin:6px 0;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);font-size:16px}
.mprank.me{border-color:var(--g);background:rgba(89,255,90,.12)} .mprank b{flex:1} .mprank .md{font-size:24px;width:30px;text-align:center}
.mprank small{opacity:.75}`;
      document.head.appendChild(css);
      const toast = (m) => { try { Zs(m); } catch (e2) { } };
      const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
      const rigs = new Map();
      const myName = () => { try { return localStorage.getItem("milo_mp_name") || (Ae && Ae.name) || ""; } catch (e2) { return ""; } };
      function nameSprite(text, cssColor) {
        const cv = document.createElement("canvas");
        cv.width = 256; cv.height = 64;
        const cx = cv.getContext("2d");
        cx.font = '700 34px "Segoe UI",Arial,sans-serif'; cx.textAlign = "center"; cx.textBaseline = "middle";
        cx.lineWidth = 6; cx.strokeStyle = "rgba(0,0,0,.85)"; cx.strokeText(text, 128, 34); cx.fillStyle = cssColor; cx.fillText(text, 128, 34);
        const tex = new wn(cv);
        const sp = new Yi(new yi({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
        sp.renderOrder = 30; sp.userData.tex = tex;
        return sp;
      }
      function makeRig(id, name, slot) {
        const S = SLOTS[slot % SLOTS.length];
        const pl = Wu(o, n, { remote: true, jacket: S.jacket, arrowColor: S.arrow });
        const old = rigs.get(id);
        const tr = old && old.trail || Ku(o, n, { simple: true });
        tr.setTint(S.tint, S.amt);
        const label = nameSprite(name, S.css);
        n.add(label);
        return { p: pl, trail: tr, label, slot, name, x: 0, z: 0, yaw: 0, tx: 0, tz: 0, tyaw: 0, sp: 0, safe: false, has: false };
      }
      function dropRig(id, keepTrail) {
        const rg = rigs.get(id);
        if (!rg) return;
        rg.p.dispose(); n.remove(rg.label); rg.label.userData.tex.dispose(); rg.label.material.dispose();
        if (!keepTrail) { o.root.remove(rg.trail.root); const ix = TA.extra.indexOf(rg.trail); if (ix >= 0) TA.extra.splice(ix, 1); }
        rigs.delete(id);
      }
      function applySlots() {
        const mine = SLOTS[net.slotOf(net.id) % SLOTS.length];
        u.setTint(mine.tint, mine.amt);
        for (const ot of net.others()) {
          const slot = net.slotOf(ot.id), rg = rigs.get(ot.id);
          if (!rg) { const nr = makeRig(ot.id, ot.name, slot); rigs.set(ot.id, nr); TA.extra.push(nr.trail); continue; }
          if (rg.slot !== slot || rg.name !== ot.name) {
            dropRig(ot.id, true);
            const nr = makeRig(ot.id, ot.name, slot);
            Object.assign(nr, { x: rg.x, z: rg.z, yaw: rg.yaw, tx: rg.tx, tz: rg.tz, tyaw: rg.tyaw, sp: rg.sp, safe: rg.safe, has: rg.has });
            rigs.set(ot.id, nr);
            const ix = TA.extra.indexOf(rg.trail); if (ix < 0) TA.extra.push(nr.trail);
          }
        }
        refreshUI();
      }

      // ---- Monster teilen: der Gastgeber rechnet, die anderen zeigen nur ----
      const ordinals = () => {
        const by = {}; for (const t2 of TYPES) by[t2] = [];
        for (const cr of h.list) (by[cr.type] || (by[cr.type] = [])).push(cr);
        return by;
      };
      const origSetCount = h.setCount;
      h._want = 47;
      h.setCount = (tot) => { h._want = tot; origSetCount(tot); };
      h.snapshot = () => {
        const by = ordinals(), cnt = [], a = [];
        for (const t2 of TYPES) {
          cnt.push(by[t2].length);
          for (const cr of by[t2]) {
            if (cr.max === void 0) { cr.max = 30; cr.hp = 30; }
            const hq = Math.max(0, Math.min(15, Math.round(cr.hp / cr.max * 15)));
            a.push(Math.round(cr.x * 10), Math.round(cr.z * 10), Math.round((((cr.yaw % 6.2832) + 6.2832) % 6.2832) * 20), (cr.state === "chase" ? 1 : 0) + hq * 2);
          }
        }
        return { w: h._want, e: f.monsters ? 1 : 0, p: h.peace ? 1 : 0, c: cnt, a };
      };
      let lastCfg = "";
      h.applySnapshot = (s) => {
        if (!s || !s.a) return;
        const cfg = s.w + "|" + s.e + "|" + s.p;
        if (cfg !== lastCfg) {
          lastCfg = cfg;
          f.monsters = !!s.e; h.setEnabled(f.monsters); h.peace = f.peace = !!s.p;
          if (s.w !== h._want) h.setCount(s.w);
        }
        const by = ordinals(), now = performance.now();
        let ix = 0;
        for (let ti = 0; ti < TYPES.length; ti++) {
          const lst = by[TYPES[ti]], hostN = s.c[ti] || 0;
          for (let k = 0; k < hostN; k++, ix += 4) {
            const cr = lst[k]; if (!cr) continue;
            const nx = s.a[ix] / 10, nz = s.a[ix + 1] / 10, nyaw = s.a[ix + 2] / 20, fl = s.a[ix + 3];
            if (cr.max === void 0) { cr.max = 30; cr.hp = cr.max; }
            if (cr.sx === void 0) { cr.x = nx; cr.z = nz; cr.psp = 0; }
            else {
              const dtS = Math.max(0.05, (now - cr.st) / 1000), dd = Math.hypot(nx - cr.sx, nz - cr.sz);
              cr.psp = dd > 20 ? 0 : dd / dtS;
            }
            cr.sx = nx; cr.sz = nz; cr.syaw = nyaw; cr.st = now; cr.pch = fl & 1;
            const hpNew = (fl >> 1) / 15 * cr.max;
            if (hpNew < cr.hp - 0.5 && cr.g.visible) FX.pop(cr.x, 1.2, cr.z, 16772224, 1.4, 0.25);
            cr.hp = hpNew;
          }
        }
      };
      h.puppetStep = (cr, dt) => {
        if (cr.sx === void 0) return 0;
        const dx = cr.sx - cr.x, dz = cr.sz - cr.z, d = Math.hypot(dx, dz);
        if (d > 20) { cr.x = cr.sx; cr.z = cr.sz; } else { const k = Math.min(1, dt * 10); cr.x += dx * k; cr.z += dz * k; }
        cr.yawT = cr.syaw; cr.state = cr.pch ? "chase" : "wander";
        return Math.min(cr.psp || 0, 9);
      };
      h.remotes = []; h.puppet = false;
      h.onRemoteHit = (id, dmg) => { net.sendHit(id, dmg); };
      const stats = { sent: 0, recv: 0 };
      h.mpHit = (cr, dmg) => {
        stats.sent++;
        const lst = ordinals()[cr.type] || [], k = lst.indexOf(cr);
        if (k < 0) return;
        net.sendDmg(cr.type, k, dmg);
        if (cr.max === void 0) { cr.max = 30; cr.hp = 30; }
        cr.hp = Math.max(1, cr.hp - dmg);
      };

      // ---- Netz ----
      const net = new LIB.Net(window.__MP_TRANSPORT || LIB.transport(SB_URL, SB_KEY), {
        onPlayers: () => { applySlots(); },
        onLeave: (id) => {
          dropRig(id, false);
          if (CP) { const pp = CP.players.get(id); if (pp && !pp.done) { pp.done = true; pp.r = 0; pp.t = 999; pp.quit = true; if (CP.finished) renderRank(); } }
        },
        onPos: (q) => {
          const rg = rigs.get(q.id); if (!rg) return;
          rg.tx = q.x; rg.tz = q.z; rg.tyaw = q.yaw; rg.sp = q.sp; rg.safe = q.safe;
          if (!rg.has) { rg.x = q.x; rg.z = q.z; rg.yaw = q.yaw; rg.has = true; }
        },
        onMon: (a) => h.applySnapshot(a),
        onHit: (dmg) => E(dmg),
        onDmg: (p) => {
          const lst = ordinals()[p.t] || [], cr = lst[p.k];
          stats.recv++;
          if (cr && h.enabled) ATK.hit(cr, p.d, "remote");
        },
        onStatus: (s) => { if (statusEl) statusEl.textContent = s === "SUBSCRIBED" ? "Verbunden" : s === "CHANNEL_ERROR" || s === "TIMED_OUT" ? "Keine Verbindung (Internet?)" : s === "CLOSED" ? "Getrennt" : "Verbinde …"; },
        onCompStart: (p) => showInvite(p),
        onCompJoin: (p) => compSeen(p.cid, p.id, p.name, null),
        onCompDone: (p) => compSeen(p.cid, p.id, p.name, p)
      });

      // ---- Oberfläche: Raum ----
      const panel = document.createElement("div");
      panel.id = "mp"; panel.innerHTML = '<div class="box"></div>'; document.body.appendChild(panel);
      const box = panel.querySelector(".box");
      const inv = document.createElement("div"); inv.id = "mp-inv"; document.body.appendChild(inv);
      let statusEl = null, invT = 0;
      const btn = te("btn-mp");
      function refreshUI() {
        if (btn) { btn.textContent = net.inRoom ? "\u{1F465} " + (net.order.length || 1) : "\u{1F465}"; btn.classList.toggle("on", net.inRoom); }
        if (panel.classList.contains("show")) renderPanel();
      }
      function stopKeys(el) { el.addEventListener("keydown", (ev) => ev.stopPropagation()); el.addEventListener("keyup", (ev) => ev.stopPropagation()); return el; }
      function renderPanel() {
        if (!net.inRoom) {
          box.innerHTML = '<h3>\u{1F465} Zusammen spielen</h3><p>Ihr lauft zusammen durch Gemen, bek\xE4mpft die Monster gemeinsam und macht an den Stationen dieselben Aufgaben. Daf\xFCr braucht jeder Internet.</p>' +
            '<p><small>Dein Name (nur ein Spitzname, bitte keinen echten Namen):</small></p><input class="nm" id="mp-name" maxlength="12" placeholder="Spitzname" value="' + esc(myName()) + '">' +
            '<div class="row"><button class="b go" id="mp-new">Raum erstellen</button></div>' +
            '<p><small>… oder Code von einem Freund eingeben:</small></p><div class="row"><input id="mp-code" maxlength="4" placeholder="CODE"><button class="b" id="mp-join">Beitreten</button></div>' +
            '<p id="mp-msg" style="color:#ff8a7a"></p><div class="row"><button class="b" id="mp-close">Schlie\xDFen</button></div>';
          const nm = stopKeys(box.querySelector("#mp-name")), msg = box.querySelector("#mp-msg");
          stopKeys(box.querySelector("#mp-code"));
          const go = (code) => {
            const nn = nm.value.trim();
            if (!nn) { msg.textContent = "Bitte einen Spitznamen eingeben."; return; }
            try { localStorage.setItem("milo_mp_name", nn); } catch (e2) { }
            net.join(code, nn); renderPanel();
          };
          box.querySelector("#mp-new").onclick = () => go(LIB.makeCode());
          box.querySelector("#mp-join").onclick = () => {
            const c = box.querySelector("#mp-code").value.trim().toUpperCase();
            if (!/^[A-Z]{4}$/.test(c)) { msg.textContent = "Der Code hat 4 Buchstaben."; return; }
            go(c);
          };
          box.querySelector("#mp-close").onclick = closePanel;
        } else {
          let pls = "";
          for (const id of net.order) {
            const p = net.players.get(id); if (!p) continue;
            const S = SLOTS[net.slotOf(id) % SLOTS.length];
            pls += '<div class="pl"><span class="dot" style="background:' + S.css + '"></span>' + esc(p.name) + (id === net.id ? " (du)" : "") + (id === net.hostId() ? ' <small>\xB7 Gastgeber</small>' : "") + "</div>";
          }
          box.innerHTML = '<h3>\u{1F465} Raum</h3><p><small>Diesen Code den Freunden geben:</small></p><div class="code">' + esc(net.room) + '</div><p id="mp-status"><small>Verbinde …</small></p>' + pls +
            '<p><small>Bis zu 4 Spieler. Die Monster sind f\xFCr alle gleich. Geht zusammen zu einer Station und tippt dort auf „Wettbewerb“.</small></p><div class="row"><button class="b" id="mp-leave">Raum verlassen</button><button class="b go" id="mp-close">Weiter spielen</button></div>';
          statusEl = box.querySelector("#mp-status small");
          statusEl.textContent = net.connected ? "Verbunden" : "Verbinde …";
          box.querySelector("#mp-leave").onclick = () => { net.leave(); h.puppet = false; h.remotes = []; lastCfg = ""; u.setTint([1, 1, 1], 0); refreshUI(); renderPanel(); };
          box.querySelector("#mp-close").onclick = closePanel;
        }
      }
      function openPanel() { panel.classList.add("show"); window.__mpOpen = true; renderPanel(); }
      function closePanel() { panel.classList.remove("show"); window.__mpOpen = false; }
      if (btn) btn.addEventListener("click", openPanel);

      // ---- Wettbewerb an einer Station ----
      let CP = null;
      const compBusy = () => !!window.__quizOpen || !!CP;
      function showInvite(p) {
        if (compBusy()) return;
        const st = o.stations.find((s2) => s2.id === p.station);
        if (!st || !xn[st.id]) return;
        inv.innerHTML = "<b>\u{1F3C6} " + esc(p.fromName || "Ein Freund") + " startet einen Wettbewerb</b><br><small>" + esc(st.name) + " \xB7 alle bekommen dieselben " + (p.ids ? p.ids.length : "") + ' Fragen</small><div class="row"><button class="go" id="inv-yes">Mitmachen</button><button id="inv-no">Nein danke</button></div>';
        inv.classList.add("show"); clearTimeout(invT); invT = setTimeout(() => inv.classList.remove("show"), 40000);
        inv.querySelector("#inv-no").onclick = () => inv.classList.remove("show");
        inv.querySelector("#inv-yes").onclick = () => {
          inv.classList.remove("show");
          if (compBusy()) return;
          net.sendCompJoin(p.cid);
          beginComp(st, p.ids, p.cid, { id: p.from, name: p.fromName });
        };
      }
      function startCompetition(st) {
        if (!st || !xn[st.id]) { toast("Hier gibt es keinen Wettbewerb."); return; }
        if (!net.inRoom) { toast("Erst einen Raum erstellen: oben auf \u{1F465} tippen."); return; }
        if (!net.connected) { toast("Noch keine Verbindung. Kurz warten oder Internet pr\xFCfen."); return; }
        if (net.others().length === 0) { toast("Du brauchst mindestens einen Mitspieler im Raum."); return; }
        if (Math.hypot(l.x - st.wx, l.z - st.wz) > 30) { toast("Lauft erst zusammen zur Station „" + st.name + "“."); return; }
        const pool = sa(xn[st.id].subj).slice();
        if (pool.length < 4) { toast("Zu wenige Fragen an dieser Station."); return; }
        for (let ix = pool.length - 1; ix > 0; ix--) { const jx = Math.floor(Math.random() * (ix + 1)); [pool[ix], pool[jx]] = [pool[jx], pool[ix]]; }
        const ids = pool.slice(0, 8).map((q2) => q2.id), cid = 1 + (Math.random() * 2e9 | 0);
        net.sendCompStart({ cid, station: st.id, ids });
        beginComp(st, ids, cid, null);
      }
      function beginComp(st, ids, cid, from) {
        CP = { cid, ids, st, tt: 0, players: new Map(), finished: false, myR: 0, myT: 0 };
        CP.players.set(net.id, { id: net.id, name: net.name, done: false });
        if (from) CP.players.set(from.id, { id: from.id, name: from.name, done: false });
        CP.finish = (r2, tt) => {
          CP.finished = true; CP.myR = r2; CP.myT = tt;
          const me = CP.players.get(net.id); me.done = true; me.r = r2; me.t = tt;
          net.sendCompDone({ cid, r: r2, t: Math.round(tt * 10) / 10, n: ids.length });
          renderRank();
        };
        CP.cancel = () => { net.sendCompDone({ cid, r: 0, t: 999, n: ids.length, quit: 1 }); CP = null; Ys(); };
        gf(xn[st.id], CP);
      }
      function compSeen(cid, id, name, res) {
        if (!CP || CP.cid !== cid || id === net.id) return;
        const e2 = CP.players.get(id) || { id, name, done: false };
        e2.name = name || e2.name;
        if (res) { e2.done = true; e2.r = res.r; e2.t = res.t; e2.quit = !!res.quit; }
        CP.players.set(id, e2);
        if (CP.finished) renderRank();
      }
      function renderRank() {
        if (!CP || !CP.finished) return;
        const list = [...CP.players.values()];
        list.sort((a2, b2) => (a2.done ? 0 : 1) - (b2.done ? 0 : 1) || (b2.r || 0) - (a2.r || 0) || (a2.t || 0) - (b2.t || 0));
        const medals = ["\u{1F947}", "\u{1F948}", "\u{1F949}", "\u{1F3C5}"];
        const allDone = list.every((p) => p.done);
        const rows = list.map((p, ix) => K("div", { class: "mprank" + (p.id === net.id ? " me" : "") },
          K("span", { class: "md" }, p.done ? medals[Math.min(ix, 3)] : "⏳"),
          K("b", {}, p.name + (p.id === net.id ? " (du)" : "")),
          p.done ? K("span", {}, p.quit ? K("small", {}, "aufgegeben") : [p.r + " / " + CP.ids.length + " ", K("small", {}, "\xB7 " + Math.round(p.t) + " s")]) : K("small", {}, "spielt noch …")));
        const top = list[0];
        const msg = !allDone ? "Warte auf die anderen …" : top && top.id === net.id ? "\u{1F389} Du hast gewonnen!" : "Gut gespielt! Beim n\xE4chsten Mal klappt es.";
        const root = ln();
        root.append(K("div", { class: "qbox" }, K("h2", {}, "\u{1F3C6} Wettbewerb"), K("p", { class: "qtag" }, CP.st.name + " \xB7 mehr richtige Antworten gewinnen, bei Gleichstand die schnelleren"), rows, K("p", { class: "qmsg" }, msg), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: () => { CP = null; Ys(); } }, "Zur\xFCck ins Spiel"))));
      }
      // Wettbewerb-Knopf an der Stationskarte
      const compBtn = te("card-comp");
      if (compBtn) compBtn.addEventListener("click", () => { const st = window.__selSt; if (st) { te("card").classList.remove("show"); startCompetition(st); } });
      function updateCompBtn() {
        if (!compBtn) return;
        const st = window.__selSt, show = !!(st && xn[st.id] && te("card").classList.contains("show"));
        compBtn.style.display = show && net.inRoom ? "" : "none";
        if (show && net.inRoom) {
          const near = Math.hypot(l.x - st.wx, l.z - st.wz) <= 30;
          compBtn.disabled = !near; compBtn.textContent = near ? "\u{1F3C6} Wettbewerb" : "\u{1F3C6} erst hingehen";
        }
      }

      // ---- jedes Bild ----
      function update(dt, t, camDist) {
        updateCompBtn();
        if (!net.inRoom) return;
        const remotes = [];
        for (const [id, rg] of rigs) {
          if (!rg.has) continue;
          const k = Math.min(1, dt * 9);
          rg.x += (rg.tx - rg.x) * k; rg.z += (rg.tz - rg.z) * k;
          let dy = rg.tyaw - rg.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); rg.yaw += dy * Math.min(1, dt * 10);
          rg.p.pose(rg.x, rg.z, rg.yaw, rg.sp, dt, camDist);
          rg.trail.track(rg.x, rg.z); rg.trail.update(t, dt, 0, 0, camDist);
          const sc = Math.min(Math.max(1, camDist / 28), 10);
          rg.label.position.set(rg.x, 3.4 + sc * 0.6, rg.z); rg.label.scale.set(4.2 * sc, 1.05 * sc, 1);
          remotes.push({ id, x: rg.x, z: rg.z, safe: rg.safe, remote: true });
        }
        h.remotes = remotes;
        h.puppet = !net.isHost();
      }
      // Senden läuft über eigene Uhr, damit auch während einer Aufgabe alles weiterläuft
      setInterval(() => {
        if (!net.inRoom) return;
        net.sendPos({ x: l.x, z: l.z, yaw: l.yaw, sp: l.speed, safe: !!(f.safe || window.__quizOpen) });
        if (net.isHost()) {
          if (window.__quizOpen) { try { h.remotes = h.remotes || []; h.update(0.16, performance.now() / 1000, l, l.x, l.z, 80, true, E); } catch (e2) { } }
          net.sendMon(h.snapshot());
        }
      }, 160);
      return { net, update, openPanel, startCompetition, stats };
    })();
    window.__mp = MP;
