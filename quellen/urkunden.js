  // ---------- Meine Urkunden: dauerhaftes Archiv, große Ansicht, Handy-Download ----------
  // Hauptspeicher sind die Lerntage im Spieler-Konto (Server-Tabelle game_saves, Spiel "milo3d_days").
  // Eine Urkunde ist ein Lerntag mit geschaffter Tagesprüfung. Sie wird bei Bedarf aus diesen Daten neu gezeichnet,
  // darum ist sie nach Logout, Gerätewechsel oder Neuinstallation wieder da. Der Download ist nur eine Kopie.
  var UKX = (() => {
    const st = document.createElement("style");
    st.textContent = ".ukx-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:4px 0 10px}.ukx-bar select{min-height:44px;padding:0 10px;border-radius:10px;border:1px solid var(--line);background:rgba(0,0,0,.5);color:var(--ink);font-size:15px}"
      + ".ukx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:16px;text-align:left}.ukx-it{display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)}"
      + ".ukx-th{width:100%;aspect-ratio:1152/2064;border-radius:8px;background:#e9d7a8 center/cover no-repeat;box-shadow:0 3px 12px #0009;cursor:zoom-in;border:0}.ukx-t{font:800 15px/1.25 system-ui,sans-serif;color:#fff}.ukx-s{font:500 13px/1.3 system-ui,sans-serif;color:var(--mut)}.ukx-it .qbtn{min-height:46px;margin:0}"
      + "@media (max-width:560px),(max-height:520px){.ukx-grid{grid-template-columns:1fr;gap:10px}.ukx-it{flex-direction:row;align-items:center}.ukx-th{width:84px;flex:0 0 84px}.ukx-txt{flex:1;min-width:0}.ukx-it .ukx-acts{display:flex;flex-direction:column;gap:6px}.ukx-it .qbtn{min-width:120px;font-size:14px}}"
      + "#ukx-view{position:fixed;inset:0;z-index:80;background:rgba(2,6,10,.97);display:none;flex-direction:column}#ukx-view.show{display:flex}#ukx-view .vbar{display:flex;gap:8px;align-items:center;justify-content:space-between;padding:calc(8px + env(safe-area-inset-top)) max(10px,env(safe-area-inset-right)) 8px max(10px,env(safe-area-inset-left));background:rgba(8,16,22,.95);border-bottom:1px solid rgba(255,255,255,.12)}"
      + "#ukx-view .vbar b{color:#fff;font:800 16px system-ui,sans-serif;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#ukx-view .vbtn{min-height:46px;min-width:46px;padding:0 12px;border-radius:12px;border:1px solid rgba(255,255,255,.2);background:#122028;color:#fff;font:700 15px system-ui,sans-serif;white-space:nowrap}#ukx-view .vbtn.go{background:#1d6b3a;border-color:#59ff5a}"
      + "#ukx-view .vbody{flex:1;overflow:auto;display:flex;justify-content:center;align-items:flex-start;padding:14px;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y pinch-zoom}#ukx-view canvas{display:block;border-radius:10px;box-shadow:0 8px 30px #000;background:#fff}"
      + "#ukx-view.fit canvas{height:calc(100vh - 110px);width:auto;max-width:100%}#ukx-view.read canvas{width:min(100%,1000px);height:auto}#ukx-view .vmsg{position:absolute;left:50%;bottom:calc(14px + env(safe-area-inset-bottom));transform:translateX(-50%);padding:10px 14px;border-radius:12px;background:#0d1a20f0;color:#fff;font:600 14px system-ui,sans-serif;max-width:90vw;display:none}#ukx-view .vmsg.show{display:block}"
      + "@media (max-width:560px),(max-height:520px){#ukx-view .vbtn i{display:none}}";
    document.head.append(st);
    const days = () => ye.days || {};
    const isCert = (d) => !!(d && d.ex && d.ex.n);
    const keys = () => Object.keys(days()).filter((k) => isCert(days()[k])).sort();
    const fmt = (k, o) => new Date(k + "T12:00:00").toLocaleDateString("de-DE", o || { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    function info(k) {
      const d = days()[k]; let rows = [];
      try { rows = UK_rows(d); } catch (e) {}
      const subj = rows.filter((x) => !x.exam).map((x) => x.name), ex = rows.find((x) => x.exam);
      return { subj, note: ex ? ex.note : null, pct: ex ? ex.pct : null };
    }
    const safeName = (s) => String(s || "").normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").replace(/[^A-Za-z0-9-]+/g, "_").replace(/^_+|_+$/g, "") || "Milo";
    const fileName = (k) => "Urkunde_" + safeName(Ae && Ae.name || "Milo") + "_Tagesurkunde_" + k + ".pdf";
    // PDF (A4 hoch) mit der Urkunde in voller Auflösung, unverzerrt und vollständig auf der Seite
    function pdf(c) {
      const jb = atob(c.toDataURL("image/jpeg", 0.95).split(",")[1]), img = new Uint8Array(jb.length);
      for (let i = 0; i < jb.length; i++) img[i] = jb.charCodeAt(i);
      const PW = 595.28, PH = 841.89, sc = Math.min(PW / c.width, PH / c.height), w = c.width * sc, h2 = c.height * sc, x = (PW - w) / 2, y = (PH - h2) / 2;
      const enc = new TextEncoder(), parts = [], off = []; let len = 0;
      const put = (d) => { typeof d === "string" && (d = enc.encode(d)), parts.push(d), len += d.length; };
      const obj = (n2, body) => { off[n2] = len, put(n2 + " 0 obj\n"), body(), put("\nendobj\n"); };
      const cs = "q " + w.toFixed(2) + " 0 0 " + h2.toFixed(2) + " " + x.toFixed(2) + " " + y.toFixed(2) + " cm /Im0 Do Q";
      put("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
      obj(1, () => put("<< /Type /Catalog /Pages 2 0 R >>"));
      obj(2, () => put("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"));
      obj(3, () => put("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + PW + " " + PH + "] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>"));
      obj(4, () => (put("<< /Type /XObject /Subtype /Image /Width " + c.width + " /Height " + c.height + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + img.length + " >>\nstream\n"), put(img), put("\nendstream")));
      obj(5, () => put("<< /Length " + cs.length + " >>\nstream\n" + cs + "\nendstream"));
      const xr = len;
      put("xref\n0 6\n0000000000 65535 f \n");
      for (let i = 1; i <= 5; i++) put(String(off[i]).padStart(10, "0") + " 00000 n \n");
      put("trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xr + "\n%%EOF\n");
      return new Blob(parts, { type: "application/pdf" });
    }
    const b64 = (blob) => new Promise((ok, no) => { const fr = new FileReader(); fr.onload = () => ok(String(fr.result).split(",")[1]), fr.onerror = no, fr.readAsDataURL(blob); });
    // Speichern: In der App zuerst in "Dokumente/Urkunden" (bleibt nach dem Schließen), sonst Teilen-Menü; im Browser normaler Download.
    // Erfolg wird nur gemeldet, wenn die Datei wirklich geschrieben wurde (Prüfung mit stat).
    async function saveBlob(blob, name) {
      const C = window.Capacitor, P = C && C.Plugins, nat = !!(C && C.isNativePlatform && C.isNativePlatform());
      if (nat && P && P.Filesystem) {
        const data = await b64(blob), FS = P.Filesystem;
        const tryWrite = async (directory, path) => { const r = await FS.writeFile({ path, data, directory, recursive: true }); const s2 = await FS.stat({ path, directory }); if (!s2 || !(s2.size > 0)) throw new Error("leer"); return r.uri; };
        let uri = null;
        try { uri = await tryWrite("DOCUMENTS", "Urkunden/" + name); } catch (e) {
          try { await FS.requestPermissions(); uri = await tryWrite("DOCUMENTS", "Urkunden/" + name); } catch (e2) { uri = null; }
        }
        if (uri) return { ok: true, where: "Dokumente › Urkunden", uri, share: P.Share };
        try {
          const cu = await tryWrite("CACHE", name);
          if (P.Share) { await P.Share.share({ title: name, dialogTitle: "Urkunde speichern", files: [cu] }); return { ok: true, shared: true }; }
        } catch (e) { if (/cancel/i.test(String(e && e.message || e))) return { ok: false, cancel: true }; return { ok: false, err: String(e && e.message || e) }; }
        return { ok: false, err: "Speichern ist auf diesem Gerät nicht möglich." };
      }
      try {
        const u2 = URL.createObjectURL(blob), a = document.createElement("a");
        a.href = u2, a.download = name, a.rel = "noopener", document.body.append(a), a.click(), a.remove(), setTimeout(() => URL.revokeObjectURL(u2), 6e4);
        return { ok: true, browser: true };
      } catch (e) { return { ok: false, err: String(e && e.message || e) }; }
    }
    function report(r, name, msg) {
      const say = (t) => (msg ? (msg.textContent = t, msg.classList.add("show"), clearTimeout(msg._t), msg._t = setTimeout(() => msg.classList.remove("show"), 7000)) : Zs(t));
      if (r.ok && r.where) say("✅ Gespeichert in " + r.where + ": " + name);
      else if (r.ok && r.shared) say("✅ Urkunde übergeben – wähle im Menü, wo sie gespeichert werden soll.");
      else if (r.ok && r.browser) say("⬇ Download gestartet: " + name + " (Ordner „Downloads“).");
      else if (r.cancel) say("Abgebrochen. Die Urkunde bleibt in „Meine Urkunden“.");
      else say("❌ Download hat nicht geklappt. Die Urkunde bleibt sicher in „Meine Urkunden“. " + (r.err ? "(" + r.err + ")" : ""));
      return r;
    }
    async function saveCanvas(c, name, msg) {
      let r;
      try { r = await saveBlob(pdf(c), name); } catch (e) { r = { ok: false, err: String(e && e.message || e) }; }
      return report(r, name, msg);
    }
    async function download(k, msg) {
      const d = days()[k];
      if (!isCert(d)) return report({ ok: false, err: "keine Urkunde" }, "", msg);
      let c; try { c = UK_draw(d); } catch (e) { return report({ ok: false, err: "Zeichnen fehlgeschlagen" }, "", msg); }
      if (!UK_loadTpl(() => {})) await new Promise((ok) => setTimeout(ok, 600)), c = UK_draw(d);
      return saveCanvas(c, fileName(k), msg);
    }
    // Große Ansicht (eigene Ebene über allem)
    const V2 = K("div", { id: "ukx-view", class: "fit" });
    document.body.append(V2);
    let vk = [], vi = 0;
    function view(k, list) {
      const ph = Math.min(innerWidth, innerHeight) < 560;
      V2.classList.toggle("read", ph), V2.classList.toggle("fit", !ph);
      vk = list && list.length ? list : keys().reverse(), vi = Math.max(0, vk.indexOf(k)), V2.classList.add("show"), show();
    }
    function show() {
      const k = vk[vi], d = days()[k], msg = K("div", { class: "vmsg" });
      let c; try { c = UK_draw(d); } catch (e) { c = K("p", { class: "qmsg" }, "Die Urkunde kann gerade nicht angezeigt werden."); }
      UK_loadTpl(() => V2.classList.contains("show") && vk[vi] === k && show());
      const big = V2.classList.contains("read");
      V2.replaceChildren(K("div", { class: "vbar" },
        K("button", { class: "vbtn", onclick: () => V2.classList.remove("show") }, "✕", K("i", {}, " Schließen")),
        K("b", {}, "\u{1F4DC} " + fmt(k)),
        vk.length > 1 ? K("button", { class: "vbtn", disabled: vi >= vk.length - 1, onclick: () => (vi++, show()) }, "◀") : "",
        vk.length > 1 ? K("button", { class: "vbtn", disabled: vi <= 0, onclick: () => (vi--, show()) }, "▶") : "",
        K("button", { class: "vbtn", onclick: () => (V2.classList.toggle("read"), V2.classList.toggle("fit"), show()) }, big ? "\u{1F5BC}" : "\u{1F50D}", K("i", {}, big ? " Ganz zeigen" : " Lesen")),
        K("button", { class: "vbtn go", onclick: async (ev) => { const b = ev.currentTarget; b.disabled = true; try { await download(k, msg); } finally { b.disabled = false; } } }, "⬇", K("i", {}, " Auf Handy herunterladen"))),
        K("div", { class: "vbody" }, c), msg);
    }
    // Archiv
    function archive() {
      const all = keys();
      const body = K("div", {});
      const subjAll = [...new Set(all.flatMap((k) => info(k).subj))].sort();
      const sort = K("select", {}, [["neu", "Neueste zuerst"], ["alt", "Älteste zuerst"], ["note", "Beste Note zuerst"]].map(([v, t]) => K("option", { value: v }, t)));
      const fach = K("select", {}, [K("option", { value: "" }, "Alle Fächer"), ...subjAll.map((s2) => K("option", { value: s2 }, s2))]);
      const draw = () => {
        let L = all.slice();
        fach.value && (L = L.filter((k) => info(k).subj.includes(fach.value)));
        sort.value === "neu" ? L.reverse() : sort.value === "note" && L.sort((a, b) => (info(a).note || 9) - (info(b).note || 9) || (b > a ? 1 : -1));
        if (!L.length) return void body.replaceChildren(K("p", { class: "qmsg" }, all.length ? "Für dieses Fach gibt es noch keine Urkunde." : "Noch keine Urkunden. Schaffe eine Tagesprüfung – dann landet deine erste Urkunde hier."));
        const grid = K("div", { class: "ukx-grid" });
        for (const k of L) {
          const inf = info(k), th = K("button", { class: "ukx-th", "aria-label": "Urkunde ansehen", onclick: () => view(k, L) });
          thumb(k, th);
          grid.append(K("div", { class: "ukx-it" }, th, K("div", { class: "ukx-txt" }, K("div", { class: "ukx-t" }, fmt(k, { weekday: "short", day: "numeric", month: "long", year: "numeric" })), K("div", { class: "ukx-s" }, (inf.note ? "⭐ Note " + inf.note + " · " : "") + (inf.subj.join(", ") || "–"))),
            K("div", { class: "ukx-acts" }, K("button", { class: "qbtn", onclick: () => view(k, L) }, "\u{1F50D} Öffnen"), K("button", { class: "qbtn", onclick: async (ev) => { const b = ev.currentTarget; b.disabled = true; try { await download(k); } finally { b.disabled = false; } } }, "⬇ Herunterladen"))));
        }
        body.replaceChildren(grid);
      };
      sort.onchange = fach.onchange = draw;
      ln().append(KO_box("wide ukx-box", K("div", { class: "qhead" }, K("h2", {}, "\u{1F4DC} Meine Urkunden"), K("button", { class: "qx", onclick: Ys }, "✕")),
        K("p", { class: "qmsg", style: "margin-top:0" }, all.length + (all.length === 1 ? " Urkunde" : " Urkunden") + " · sicher in deinem Spieler-Konto gespeichert" + (Ae && !Ae.offline ? "" : " (ohne Anmeldung nur auf diesem Gerät)")),
        K("div", { class: "ukx-bar" }, sort, fach), body));
      draw();
      typeof uf === "function" && Ae && !Ae.offline && uf().then(() => keys().length !== all.length && (Ys(), archive())).catch(() => {});
    }
    // Vorschaubilder klein zeichnen und merken (die große Urkunde wird erst beim Öffnen gezeichnet)
    const TH = new Map();
    function thumb(k, el) {
      const d = days()[k], sig = k + ":" + (d.sec | 0) + ":" + (d.ex && d.ex.r) + ":" + (Ae && Ae.name);
      if (TH.has(sig)) return void (el.style.backgroundImage = "url(" + TH.get(sig) + ")");
      const go = () => {
        try {
          const big = UK_draw(d), c = document.createElement("canvas"); c.width = 288, c.height = 516;
          c.getContext("2d").drawImage(big, 0, 0, 288, 516);
          const u2 = c.toDataURL("image/jpeg", 0.8); UK_loadTpl() && TH.set(sig, u2), el.style.backgroundImage = "url(" + u2 + ")";
        } catch (e) {}
      };
      if ("IntersectionObserver" in window) { const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && (io.disconnect(), setTimeout(go, 30))); io.observe(el); } else setTimeout(go, 50);
    }
    return { archive, view, download, saveCanvas, saveBlob, pdf, keys, fileName };
  })();
