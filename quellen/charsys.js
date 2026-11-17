  // ================= Charakter-System (17.11.2026) =================
  // Packs: zentrale Liste CH_PACKS. Jedes Pack ist eine Datei in quellen/charpacks/ und wird beim Bau automatisch
  // mit CH_REG(...) eingetragen. Die Standardfigur ist fest eingebaut und kann nie verschwinden.
  // Gespeicherte Charaktere: Server (Tabelle characters, Funktion milo_chars), Kopie auf dem Gerät für ohne Internet.
  var CH_PACKS = new Map();
  function CH_REG(pk) {
    try {
      if (!pk || typeof pk.id !== "string" || !/^[a-z0-9_]+$/.test(pk.id)) return;
      let old = CH_PACKS.get(pk.id);
      if (old && (old.version || 0) > (pk.version || 0)) return;
      pk.characters = pk.characters || [], pk.elements = pk.elements || {}, pk.bodies = pk.bodies || [], CH_PACKS.set(pk.id, pk);
    } catch {
    }
  }
  CH_REG({ id: "standard", name: "Standard", version: 1, builtin: true, desc: "Die ursprüngliche Spielfigur mit Hut, Rucksack und Bollerwagen.", characters: [{ id: "classic", name: "Standardfigur" }] });
  /*CH_PACKS_HIER*/
  var CH = { list: [], active: null, intro: true, pid: null, server: true, loaded: false };
  var CH_STD = { id: null, name: "Standardfigur", pack: "standard", data: { pack: "standard", char: "classic" } };
  (function CH_css() {
    let st = document.createElement("style");
    st.textContent = ".ch-pv{display:block;margin:6px auto;border-radius:16px;background:radial-gradient(circle at 50% 35%,#3a5a46,#16221b);max-width:100%;touch-action:none}.ch-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:8px;margin:8px 0}.ch-card{position:relative;border:2px solid #ffffff22;border-radius:14px;background:rgba(255,255,255,.05);padding:6px;text-align:center;color:#fff;font:600 13px system-ui;cursor:pointer}.ch-card img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:10px;background:#1c2a22;display:block}.ch-card.on{border-color:#59ff5a;box-shadow:0 0 0 2px #59ff5a66,0 0 14px #59ff5a55;background:rgba(89,255,90,.12)}.ch-card .ch-badge{position:absolute;top:8px;left:8px;background:#59ff5a;color:#062;font:800 11px system-ui;padding:2px 7px;border-radius:9px}.ch-card small{display:block;color:#9ab;font-weight:500}.ch-tools{display:flex;gap:4px;justify-content:center;margin-top:4px}.ch-tools button{flex:1;padding:6px 0;border-radius:9px;border:1px solid #ffffff33;background:rgba(255,255,255,.08);color:#fff;font-size:15px}.ch-el{text-align:left;margin:8px 0}.ch-el b{display:block;font:700 14px system-ui;color:#cfe;margin-bottom:4px}.ch-chips{display:flex;flex-wrap:wrap;gap:6px}.ch-chip{padding:9px 12px;border-radius:12px;border:2px solid #ffffff2a;background:rgba(255,255,255,.07);color:#fff;font:600 14px system-ui;min-height:42px;display:flex;align-items:center;gap:6px}.ch-chip.on{border-color:#59ff5a;background:rgba(89,255,90,.2)}.ch-chip i{display:inline-block;width:18px;height:18px;border-radius:50%;border:1px solid #fff8}.ch-pack{margin:12px 0;padding:10px;border-radius:14px;background:rgba(255,255,255,.04);text-align:left}.ch-pack h3{margin:0;font:800 16px system-ui;color:#e8ffe0}.ch-pack p{margin:2px 0 4px;font-size:13px;color:#abc}.ch-big{display:flex;flex-direction:column;gap:8px;margin:10px 0}.ch-big .qbtn{min-height:58px;font-size:17px;margin:0}";
    document.head.append(st);
  })();

  // ---------- Aussehen auflösen (unbekannte Packs/Teile fallen sicher auf Standard zurück, die gespeicherten Daten bleiben unverändert)
  function CH_resolve(look) {
    if (!look || typeof look !== "object" || look.pack === "standard") return { classic: true };
    let pk = CH_PACKS.get(look.pack);
    if (!pk || !pk.models) return { classic: true, missing: true };
    let body = look.body, parts = Object.assign({}, look.parts && typeof look.parts === "object" ? look.parts : {});
    if (look.char) {
      let c = pk.characters.find((c2) => c2.id === look.char);
      c && (body = body || c.body, parts = Object.assign({}, c.parts || {}, parts));
    }
    let model = pk.models[body];
    if (!model) return { classic: true, missing: true };
    for (let k of Object.keys(pk.elements)) {
      if (!CH_elAvail(pk, body, k)) {
        delete parts[k];
        continue;
      }
      let el = pk.elements[k];
      el.options.some((o) => o.id === parts[k]) || (parts[k] = el.options[0].id);
    }
    return { pk, body, model, parts };
  }
  function CH_elAvail(pk, body, k) {
    let el = pk.elements[k], m = pk.models && pk.models[body];
    if (!el || !m || !el.options || !el.options.length) return false;
    if (el.part && !m.parts[el.part]) return false;
    for (let o of el.options) if (o.tex && !pk.tex[o.tex.replace("{base}", body)]) return false;
    return true;
  }
  function CH_elShown(pk, parts, k) {
    let nd = pk.elements[k].needs;
    return !nd || Object.entries(nd).every(([a, v]) => Array.isArray(v) ? v.includes(parts[a]) : parts[a] === v);
  }
  function CH_lookOf(rec) {
    return rec && rec.data ? rec.data : CH_STD.data;
  }
  function CH_packName(look) {
    let pk = CH_PACKS.get(look && look.pack || "standard");
    return pk ? pk.name : "Pack nicht vorhanden";
  }

  // ---------- 3D: Geometrien und Texturen (einmal pro Teil, von allen Figuren geteilt)
  var CH_GC = new Map(), CH_TC = new Map(), CH_pend = 0;
  var CH_b64 = (s2) => Uint8Array.from(atob(s2), (c) => c.charCodeAt(0));
  function CH_geo(pk, body, pn, short) {
    let key = pk.id + "/" + pk.version + "/" + body + "/" + pn + "/" + (short ? 1 : 0);
    if (CH_GC.has(key)) return CH_GC.get(key);
    let P = pk.models[body].parts[pn], ib = CH_b64(P.i), idx = new Uint16Array(ib.buffer, ib.byteOffset, ib.length / 2);
    if (short && P.long) {
      let lm = CH_b64(P.long), keep = [];
      for (let t2 = 0; t2 < lm.length; t2++) lm[t2] || keep.push(idx[t2 * 3], idx[t2 * 3 + 1], idx[t2 * 3 + 2]);
      idx = new Uint16Array(keep);
    }
    let ub = CH_b64(P.uv), uq = new Int16Array(ub.buffer, ub.byteOffset, ub.length / 2), uvf = new Float32Array(uq.length);
    for (let q = 0; q < uq.length; q++) uvf[q] = uq[q] / 4096;
    let idxA = new xe(idx, 1), uvA = new xe(uvf, 2), G = {};
    for (let cn in P.clips) G[cn] = P.clips[cn].map((fb) => {
      let bb = CH_b64(fb), pq = new Int16Array(bb.buffer, bb.byteOffset, bb.length / 2), pf = new Float32Array(pq.length);
      for (let q = 0; q < pq.length; q++) pf[q] = pq[q] / 20000;
      let g = new we();
      return g.setIndex(idxA), g.setAttribute("position", new xe(pf, 3)), g.setAttribute("uv", uvA), g.computeVertexNormals(), g.computeBoundingSphere(), g;
    });
    return CH_GC.set(key, G), G;
  }
  function CH_tex(pk, name) {
    let key = pk.id + "/" + name;
    if (CH_TC.has(key)) return CH_TC.get(key);
    let b = pk.tex[name];
    if (!b) return null;
    let sz = name.includes("skin") ? 512 : 256, cv = ji(sz, sz), tx = Qi(cv, { repeat: false, aniso: 4 }), im = new Image();
    CH_pend++, im.onload = im.onerror = () => {
      CH_pend--;
      try {
        cv.getContext("2d").drawImage(im, 0, 0, sz, sz), tx.needsUpdate = true;
      } catch {
      }
    }, im.src = "data:image/jpeg;base64," + b;
    return CH_TC.set(key, tx), tx;
  }
  // Baut eine Figur aus einem Pack. Rückgabe null = Standardfigur.
  function CH_build(look) {
    let r = CH_resolve(look);
    if (r.classic) return null;
    let { pk, body, model, parts } = r, grp = new pe(), list = [], mats = [];
    let opt = (k) => {
      let el = pk.elements[k];
      return el && el.options.find((o) => o.id === parts[k]);
    };
    let tex = (o) => o && o.tex ? CH_tex(pk, o.tex.replace("{base}", body)) : null;
    let add = (pn, short, mo) => {
      if (!model.parts[pn]) return;
      let G = CH_geo(pk, body, pn, short), mat = new ae(Object.assign({ roughness: 0.8, metalness: 0 }, mo)), me2 = new zt(G.idle[0], mat);
      me2.castShadow = true, me2.frustumCulled = false, grp.add(me2), list.push([me2, G]), mats.push(mat);
    };
    let col = (o, d) => new Xt(o && o.color || d);
    add("body", false, { map: tex(opt("skin")), roughness: 0.7 }), add("eyes", false, { map: tex(opt("eyes")), roughness: 0.25 });
    parts.hair === "an" && add("hair", false, { map: tex(opt("hairColor")), side: Ue });
    parts.horns === "an" && add("horns", false, { map: tex(opt("hairColor")), roughness: 0.55 });
    parts.shirt && parts.shirt !== "aus" && add("shirt", parts.shirt !== "lang", { color: col(opt("shirtColor"), "#467d3c"), roughness: 0.92, side: Ue });
    parts.pants && parts.pants !== "aus" && add("pants", parts.pants !== "lang", { color: col(opt("pantsColor"), "#5f4128"), roughness: 0.92, side: Ue });
    grp.scale.setScalar((model.h || 1.8) * 1.12);
    let it = Math.random() * 3;
    return { g: grp, anim(dt, speed, phase) {
      it += dt || 0;
      let cn, f;
      speed > 0.4 ? (cn = "walk", f = Math.floor(((phase / 6.2832 % 1) + 1) % 1 * 8) % 8) : (cn = "idle", f = Math.floor(it / 0.6) % 4);
      for (let [m2, G] of list) {
        let g = G[cn] && G[cn][f] || G.idle[0];
        m2.geometry !== g && (m2.geometry = g);
      }
    }, dispose() {
      for (let m2 of mats) m2.dispose();
    } };
  }

  // ---------- Vorschau (ein gemeinsamer kleiner 3D-Zeichner für alle Bilder)
  var CH_PV = null;
  function CH_pv() {
    if (CH_PV) return CH_PV;
    let cv = document.createElement("canvas"), r = new dr({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true });
    r.setPixelRatio(1), r.setSize(320, 400, false);
    let sc = new pr(), d1 = new Fo(16777215, 2.4), d2 = new Fo(11197951, 0.8);
    sc.add(new No(16777215, 4478276, 1.9)), d1.position.set(3, 5, 6), d2.position.set(-4, 2, -3), sc.add(d1, d2);
    let cam = new nn(30, 0.8, 0.1, 60);
    cam.position.set(0, 1.35, 5.6), cam.lookAt(0, 1.05, 0);
    let rig = Wu({ walk: { ok: () => true, path: () => null } }, sc, { remote: true });
    return CH_PV = { r, sc, cam, cv, rig, key: "" }, CH_PV;
  }
  function CH_pvRender(look, yaw, dt, walk) {
    let P = CH_pv(), k = JSON.stringify(look || null);
    k !== P.key && (P.rig.setLook(look), P.key = k);
    P.rig.pose(0, 0, yaw, walk ? 3.2 : 0, dt || 1, 0);
    P.r.render(P.sc, P.cam);
    return P.cv;
  }
  // Große, drehbare Live-Vorschau (immer nur eine gleichzeitig)
  var CH_live = null;
  function CH_view(look) {
    let cv = K("canvas", { class: "ch-pv", width: 320, height: 400 }), ctx = cv.getContext("2d"), st = { look, yaw: 0.5, drag: null, walk: false, t: performance.now() };
    cv.addEventListener("pointerdown", (e) => (st.drag = e.clientX, cv.setPointerCapture(e.pointerId)));
    cv.addEventListener("pointermove", (e) => st.drag != null && (st.yaw += (e.clientX - st.drag) * 0.012, st.drag = e.clientX));
    cv.addEventListener("pointerup", () => st.drag = null);
    cv.addEventListener("dblclick", () => st.walk = !st.walk);
    CH_live = st;
    let loop = () => {
      if (!cv.isConnected || CH_live !== st) return;
      let now = performance.now(), dt = Math.min(0.05, (now - st.t) / 1e3);
      st.t = now, st.drag == null && (st.yaw += dt * 0.5);
      try {
        ctx.clearRect(0, 0, 320, 400), ctx.drawImage(CH_pvRender(st.look, st.yaw, dt, st.walk), 0, 0);
      } catch {
      }
      requestAnimationFrame(loop);
    };
    return requestAnimationFrame(loop), cv.setLook = (l2) => st.look = l2, cv;
  }
  // Kleine Standbilder (werden nacheinander erzeugt und gemerkt)
  var CH_TH = new Map(), CH_TQ = [], CH_TB = false;
  function CH_thumb(look) {
    let img = K("img", { alt: "" }), k = JSON.stringify(look || null);
    if (CH_TH.has(k)) return img.src = CH_TH.get(k), img;
    return CH_TQ.push([k, look, img]), CH_thRun(), img;
  }
  function CH_thRun() {
    if (CH_TB || !CH_TQ.length) return;
    CH_TB = true;
    let step = (tries) => {
      let [k, look, img] = CH_TQ[0];
      if (CH_TH.has(k)) return CH_TQ.shift(), img.src = CH_TH.get(k), CH_TB = false, CH_thRun();
      try {
        CH_pvRender(look, 0.45, 0, false);
      } catch {
      }
      if (CH_pend > 0 && tries < 40) return void setTimeout(() => step(tries + 1), 60);
      let url = "";
      try {
        url = CH_pvRender(look, 0.45, 0, false).toDataURL("image/png");
      } catch {
      }
      CH_TH.set(k, url), CH_TQ.shift();
      for (let q of [img, ...CH_TQ.filter((x) => x[0] === k).map((x) => x[2])]) q.src = url;
      CH_TB = false, setTimeout(CH_thRun, 0);
    };
    setTimeout(() => step(0), 0);
  }

  // ---------- Speichern / Laden
  var CH_lsKey = () => "milo3d_chars_" + (CH.pid || "gast");
  function CH_cache(save) {
    try {
      if (save) return void localStorage.setItem(CH_lsKey(), JSON.stringify({ list: CH.list, active: CH.active, intro: CH.intro }));
      let c = JSON.parse(localStorage.getItem(CH_lsKey()) || "null");
      c && (CH.list = c.list || [], CH.active = c.active || null, CH.intro = c.intro !== false);
    } catch {
    }
  }
  var CH_online = () => !!(Ae && Ae.token && !Ae.offline && CH.server);
  async function CH_load() {
    CH.pid = Ae && (Ae.id || Ae.name) || null, CH.list = [], CH.active = null, CH.intro = true, CH_cache(false);
    if (Ae && !Ae.offline) {
      let r = await KO_call("charList");
      if (r.j && r.j.ok) CH.server = true, CH.list = r.j.chars || [], CH.active = r.j.active || null, CH.intro = !!r.j.introDone, CH_cache(true);
      else if (r.j && r.j.error === "forbidden") CH.server = false;
    }
    return CH.loaded = true, CH_apply(), CH;
  }
  function CH_activeRec() {
    return CH.list.find((c) => c.id === CH.active) || CH_STD;
  }
  function CH_apply() {
    let look = CH_lookOf(CH_activeRec());
    window.__myLook = look.pack === "standard" ? null : look;
    try {
      window.__player && window.__player.setLook(window.__myLook);
    } catch {
    }
    try {
      window.__mpLook && window.__mpLook();
    } catch {
    }
  }
  async function CH_call(action, body) {
    if (!CH.server) return { j: { ok: true, local: true } };
    if (!CH_online()) return { j: { error: "offline" } };
    return KO_call(action, body);
  }
  async function CH_select(id) {
    let r = await CH_call("charSelect", { id: id || null });
    if (!(r.j && r.j.ok)) return Zs(r.j && r.j.error === "offline" ? "Zum Wechseln bitte mit Internet anmelden." : KO_msg(r)), false;
    return CH.active = id || null, CH.intro = false, CH_cache(true), CH_apply(), Zs("Figur gewechselt: " + CH_activeRec().name), true;
  }
  async function CH_save(rec, select) {
    let body = { name: rec.name, pack: rec.pack, data: rec.data, select: !!select };
    rec.id && (body.id = rec.id);
    let r = await CH_call("charSave", body);
    if (!(r.j && r.j.ok)) return Zs(r.j && r.j.error === "offline" ? "Speichern geht nur mit Internet." : r.j && r.j.error === "too_many" ? "Höchstens 20 Charaktere." : KO_msg(r)), null;
    let c = r.j.char || Object.assign({}, rec, { id: rec.id || "lokal-" + Date.now().toString(36) }), i = CH.list.findIndex((x) => x.id === c.id);
    i >= 0 ? CH.list[i] = c : CH.list.push(c);
    return select && (CH.active = c.id, CH.intro = false), CH_cache(true), CH_apply(), c;
  }
  async function CH_delete(rec) {
    if (!confirm("„" + rec.name + "“ wirklich löschen?")) return false;
    let r = await CH_call("charDelete", { id: rec.id });
    if (!(r.j && r.j.ok)) return Zs(KO_msg(r)), false;
    return CH.list = CH.list.filter((c) => c.id !== rec.id), CH.active === rec.id && (CH.active = null), CH_cache(true), CH_apply(), true;
  }

  // ---------- Oberfläche
  var CH_head = (t2, back) => K("div", { class: "qhead" }, K("h2", {}, t2), K("button", { class: "qx", onclick: back || Ys }, "✕"));
  function CH_card(rec, on, onPick, tools) {
    let look = CH_lookOf(rec), miss = CH_resolve(look).missing;
    return K("div", { class: "ch-card" + (on ? " on" : ""), onclick: onPick }, on ? K("span", { class: "ch-badge" }, "✓ AKTIV") : null, CH_thumb(look), K("div", {}, rec.name), K("small", {}, miss ? "⚠ Pack fehlt – Standard wird gezeigt" : CH_packName(look)), tools ? K("div", { class: "ch-tools", onclick: (e) => e.stopPropagation() }, ...tools) : null);
  }
  function CH_screen() {
    if (!Ae) return Zs("Bitte zuerst anmelden.");
    let act = CH_activeRec(), box = KO_box("");
    let mine = K("div", { class: "ch-cards" }, CH_card(CH_STD, !CH.active, async () => CH.active && await CH_select(null) && CH_screen()));
    for (let c of CH.list) mine.append(CH_card(c, CH.active === c.id, async () => CH.active !== c.id && await CH_select(c.id) && CH_screen(), [
      K("button", { title: "Bearbeiten", onclick: () => CH_editor(c) }, "✏️"),
      K("button", { title: "Löschen", onclick: async () => await CH_delete(c) && CH_screen() }, "\u{1F5D1}")
    ]));
    box.append(...[CH_head("\u{1F9CD} MEIN CHARAKTER"), CH_view(CH_lookOf(act)), K("p", { class: "qsub" }, "Aktiv: ", K("b", {}, act.name)), K("p", { class: "ko-small" }, "Zum Drehen über die Figur wischen."),
      CH.server ? null : K("p", { class: "qmsg" }, "Hinweis: Der Server kennt Charaktere noch nicht. Sie werden vorerst nur auf diesem Gerät gespeichert."),
      Ae.offline ? K("p", { class: "qmsg" }, "Ohne Internet: Wechseln und Speichern geht erst wieder mit Internet.") : null,
      K("div", { class: "ko-sec" }, K("h3", {}, "Meine Charaktere (" + (CH.list.length + 1) + ")"), K("p", { class: "ko-small" }, "Tippe auf eine Figur, um mit ihr zu spielen."), mine),
      K("div", { class: "ch-big" }, K("button", { class: "qbtn go", onclick: () => CH_browse() }, "\u{1F3AD} Fertige Figur aus einem Pack"), K("button", { class: "qbtn go", onclick: () => CH_editor(null) }, "\u{1F6E0} Eigenen Charakter bauen"), CH.active ? K("button", { class: "qbtn", onclick: async () => await CH_select(null) && CH_screen() }, "↩ Standardfigur wiederherstellen") : null),
      K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: Ri }, "Zurück"))].filter(Boolean));
    ln().append(box);
  }
  function CH_browse(back) {
    back = back || CH_screen;
    let box = KO_box("");
    box.append(CH_head("\u{1F3AD} Fertige Figuren", back), K("p", { class: "qsub" }, "Wähle eine fertige Figur aus einem Charakter-Pack."));
    for (let pk of CH_PACKS.values()) {
      let cards = K("div", { class: "ch-cards" });
      if (pk.builtin) cards.append(CH_card(CH_STD, !CH.active, async () => await CH_select(null) && CH_screen()));
      else for (let c of pk.characters) {
        if (!pk.models || !pk.models[c.body]) continue;
        let look = { v: 1, pack: pk.id, packVersion: pk.version, char: c.id, body: c.body, parts: Object.assign({}, c.parts) };
        cards.append(CH_card({ name: c.name, data: look }, false, () => CH_preset(pk, c, look, back)));
      }
      cards.children.length && box.append(K("div", { class: "ch-pack" }, K("h3", {}, pk.name), K("p", {}, pk.desc || ""), K("p", { class: "ko-small" }, (pk.characters.length) + " Figuren · Version " + (pk.version || 1)), cards));
    }
    box.append(K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: back }, "Zurück"))), ln().append(box);
  }
  function CH_preset(pk, c, look, back) {
    let nm = KO_in("Name der Figur", "text", { value: c.name, maxlength: 24 }), m = K("p", { class: "qmsg" });
    ln().append(KO_box("", CH_head("\u{1F3AD} " + c.name, () => CH_browse(back)), CH_view(look), K("p", { class: "ko-small" }, "Aus dem Pack: " + pk.name), KO_field("Name", nm), m,
      K("div", { class: "ch-big" }, K("button", { class: "qbtn go big", onclick: async () => {
        let r = await CH_save({ name: nm.value.trim() || c.name, pack: pk.id, data: look }, true);
        r && (Zs("Du spielst jetzt als " + r.name + "!"), CH_screen());
      } }, "✓ Speichern und damit spielen"), K("button", { class: "qbtn", onclick: () => CH_editor(null, { pack: pk.id, data: look, name: c.name }) }, "\u{1F6E0} Erst anpassen")),
      K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: () => CH_browse(back) }, "Zurück"))));
  }
  function CH_editor(rec, init) {
    let packs = [...CH_PACKS.values()].filter((p2) => p2.models && p2.bodies.some((b) => p2.models[b.id]));
    if (!packs.length) return Zs("Es ist noch kein Charakter-Pack zum Bauen vorhanden.");
    let src = rec || init, d = src ? JSON.parse(JSON.stringify(src.data)) : null;
    let st = { id: rec && rec.id, name: src && src.name || "Mein Held", pack: d && CH_PACKS.get(d.pack) ? d.pack : packs[0].id, body: d && d.body, parts: d && d.parts || {} };
    let pv = null, box = KO_box(""), area = K("div", {}), nm = KO_in("Name", "text", { value: st.name, maxlength: 24 }), m = K("p", { class: "qmsg" });
    let look = () => {
      let pk = CH_PACKS.get(st.pack), r = CH_resolve({ pack: st.pack, body: st.body, parts: st.parts });
      return r.classic ? CH_STD.data : { v: 1, pack: pk.id, packVersion: pk.version, body: r.body, parts: r.parts };
    };
    let chips = (items, cur, pick) => K("div", { class: "ch-chips" }, ...items.map((o) => K("button", { class: "ch-chip" + (o.id === cur ? " on" : ""), onclick: () => pick(o.id) }, o.color ? K("i", { style: "background:" + o.color }) : null, o.icon ? o.icon + " " : "", o.label)));
    let draw = () => {
      let pk = CH_PACKS.get(st.pack);
      pk.models[st.body] || (st.body = pk.bodies.find((b) => pk.models[b.id]).id);
      st.parts = CH_resolve({ pack: st.pack, body: st.body, parts: st.parts }).parts;
      area.replaceChildren();
      packs.length > 1 && area.append(K("div", { class: "ch-el" }, K("b", {}, "\u{1F4E6} Pack"), chips(packs.map((p2) => ({ id: p2.id, label: p2.name })), st.pack, (v) => (st.pack = v, st.body = null, st.parts = {}, draw()))));
      area.append(K("div", { class: "ch-el" }, K("b", {}, "\u{1F9CD} Körper"), chips(pk.bodies.filter((b) => pk.models[b.id]), st.body, (v) => (st.body = v, draw()))));
      for (let k of Object.keys(pk.elements)) {
        if (!CH_elAvail(pk, st.body, k) || !CH_elShown(pk, st.parts, k)) continue;
        let el = pk.elements[k];
        area.append(K("div", { class: "ch-el" }, K("b", {}, (el.icon || "") + " " + el.label), chips(el.options, st.parts[k], (v) => (st.parts[k] = v, draw()))));
      }
      pv.setLook(look());
    };
    pv = CH_view(look()), box.append(CH_head(st.id ? "✏️ Charakter bearbeiten" : "\u{1F6E0} Eigenen Charakter bauen", CH_screen), pv, K("p", { class: "ko-small" }, "Wischen zum Drehen · Doppeltippen zum Laufen"), area, KO_field("Name", nm), m,
      K("div", { class: "ch-big" }, K("button", { class: "qbtn go big", onclick: async () => {
        let n2 = nm.value.trim();
        if (!n2) return void (m.textContent = "Bitte gib deiner Figur einen Namen.");
        let r = await CH_save({ id: st.id, name: n2, pack: st.pack, data: look() }, !st.id || CH.active === st.id);
        r && (Zs("Gespeichert: " + r.name), CH_screen());
      } }, st.id ? "✓ Änderungen speichern" : "✓ Speichern und damit spielen")),
      K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: CH_screen }, "Abbrechen")));
    ln().append(box), draw();
  }
  // Einmalige Frage nach der Anmeldung (nur wenn noch nicht entschieden)
  function CH_intro() {
    let done = async (then) => {
      let r = await CH_call("charIntro", {});
      r.j && r.j.ok && (CH.intro = true, CH_cache(true)), then ? then() : Ys();
    };
    ln().append(KO_box("", K("h2", {}, "✨ Neu: Dein eigener Charakter!"), CH_view(CH_STD.data), K("p", { class: "qsub" }, "Du kannst jetzt eine neue Spielfigur wählen oder selbst eine bauen. Deine bisherige Figur bleibt immer erhalten."),
      K("div", { class: "ch-big" }, K("button", { class: "qbtn go", onclick: () => done() }, "\u{1F60A} Meine bisherige Figur behalten"), K("button", { class: "qbtn go", onclick: () => done(() => CH_browse()) }, "\u{1F3AD} Neue Figur aus einem Pack"), K("button", { class: "qbtn go", onclick: () => done(() => CH_editor(null)) }, "\u{1F6E0} Eigenen Charakter bauen")),
      K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: Ys }, "Später entscheiden"))));
  }
  async function CH_onLogin() {
    try {
      await CH_load(), Ae && !Ae.offline && !CH.intro && setTimeout(function tryIntro(n) {
        CH.intro || !Ae || (window.__quizOpen ? (n || 0) < 60 && setTimeout(() => tryIntro((n || 0) + 1), 2e3) : CH_intro());
      }, 900);
    } catch {
    }
  }
  function CH_onLogout() {
    CH.list = [], CH.active = null, CH.pid = null, CH_apply();
  }
  window.__CH = { CH, CH_PACKS, CH_REG, CH_load, CH_screen, CH_select, CH_save, CH_delete, CH_resolve, CH_intro, CH_editor, CH_browse };
