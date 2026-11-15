# Ablenkung + Konzentration im Lernmodus (u_) von Testversion 11
rep('  function u_(i) {\n    Xs();',
r'''  function dStyle() {
    if (document.getElementById("dstyle")) return;
    let st = document.createElement("style");
    st.id = "dstyle";
    st.textContent = "@keyframes dfly{0%{transform:translateX(-20vw)}100%{transform:translateX(120vw)}}@keyframes dwob{0%,100%{transform:rotate(-12deg) scale(1)}50%{transform:rotate(12deg) scale(1.15)}}.dist{position:fixed;z-index:1;cursor:pointer;user-select:none;-webkit-user-select:none;line-height:1}@keyframes dfl{0%,100%{transform:translateX(0)}50%{transform:translateX(18px) rotate(12deg)}}@keyframes dfr{0%,100%{transform:translateX(0)}50%{transform:translateX(-18px) rotate(-12deg)}}@keyframes dbo{0%,100%{transform:scale(.4);opacity:0}50%{transform:scale(1.2);opacity:1}}@keyframes dwv{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(14deg)}}.dmsg{padding:8px 12px;border-radius:14px;background:#fff8d6;color:#3a2a10;font:700 15px system-ui;box-shadow:0 2px 8px #0006;white-space:nowrap}.dfight{font-size:44px;white-space:nowrap}.dfight span{display:inline-block}.dfl{animation:dfl .45s ease-in-out infinite}.dfr{animation:dfr .45s ease-in-out infinite}.dbo{font-size:26px;animation:dbo .45s ease-in-out infinite}.dwave{display:flex;align-items:center;gap:8px}.dwv{font-size:50px;display:inline-block;animation:dwv .6s ease-in-out infinite;transform-origin:50% 90%}.dwbtn{padding:8px 12px;border-radius:12px;border:1px solid #9dff5a;background:rgba(89,255,90,.2);color:#fff;font:700 14px system-ui}.dframe{position:fixed}";
    document.head.append(st);
  }
  function dStart(box, cp) {
    let day = cp || Li();
    day.nq = (day.nq || 0) + 1;
    if (Math.random() >= (cp ? 0.5 : 0.4)) return;
    let card0 = box.querySelector(".qbox");
    setTimeout(() => {
      if (!box.isConnected || box.style.display === "none" || !card0 || !card0.isConnected) return;
      dStyle();
      let kinds = ["fly", "gift", "msg", "fight", "build", "wave"], kind = cp ? "fly" : kinds[Math.floor(Math.random() * kinds.length)];
      dShow(kind, box, card0, day, cp);
    }, 2000 + Math.random() * 6000);
  }
  // Freie Fläche um die Aufgabenkarte. Ablenkungen liegen HINTER der Karte (z-index), verdecken sie also nie.
  function dSpot(card, w, h) {
    let R = card.getBoundingClientRect(), W = innerWidth, H = innerHeight, top = R.top - 70, bot = H - R.bottom, out = [];
    top >= h + 6 && out.push({ x: Math.max(6, Math.min(W - w - 6, R.left + Math.random() * Math.max(1, R.width - w))), y: 70 + (top - h) / 2 });
    bot >= h + 6 && out.push({ x: Math.max(6, Math.min(W - w - 6, R.left + Math.random() * Math.max(1, R.width - w))), y: R.bottom + (bot - h) / 2 });
    R.left >= w + 6 && out.push({ x: (R.left - w) / 2, y: R.top + Math.random() * Math.max(1, R.height - h) });
    W - R.right >= w + 6 && out.push({ x: R.right + (W - R.right - w) / 2, y: R.top + Math.random() * Math.max(1, R.height - h) });
    return out.length ? out[Math.floor(Math.random() * out.length)] : null;
  }
  function dEl(box, html, cls) {
    let el = document.createElement("div");
    return el.className = "dist " + (cls || ""), el.innerHTML = html, box.append(el), el;
  }
  function dTap(el, day, cp, after) {
    el.onclick = () => {
      day.dt = (day.dt || 0) + 1, cp || (is = true, Pi()), after ? after() : el.remove();
    };
  }
  function dPath(R, pad, u) {
    // Punkt auf dem Rand eines um pad vergrößerten Rechtecks, u = 0..1 (im Uhrzeigersinn ab oben links)
    let x0 = Math.max(4, R.left - pad), y0 = Math.max(74, R.top - pad), x1 = Math.min(innerWidth - 40, R.right + pad), y1 = Math.min(innerHeight - 40, R.bottom + pad), w = x1 - x0, h = y1 - y0, P = 2 * (w + h), s = (u % 1) * P;
    return s < w ? [x0 + s, y0] : s < w + h ? [x1, y0 + s - w] : s < 2 * w + h ? [x1 - (s - w - h), y1] : [x0, y1 - (s - 2 * w - h)];
  }
  function dShow(kind, box, card, day, cp) {
    let R = card.getBoundingClientRect(), end = (el, ms) => setTimeout(() => el.isConnected && (el.style.transition = "opacity .5s", el.style.opacity = "0", setTimeout(() => el.remove(), 550)), ms);
    if (kind === "fly") {
      let lvl = cp ? 2 : day.dl || 1, set = lvl === 1 ? ["\u{1F98B}", "\u{1F41D}"] : lvl === 2 ? ["\u{1F426}", "\u{1F415}", "\u{1F514}"] : ["\u{1F381}", "\u{1F388}", "\u{1F47B}"], size = lvl === 1 ? 34 : lvl === 2 ? 56 : 88, el = dEl(box, set[Math.floor(Math.random() * set.length)]);
      el.style.fontSize = size + "px", lvl === 1 ? (el.style.top = "74px", el.style.animation = "dfly 6s linear forwards") : (el.style.top = 25 + Math.random() * 40 + "vh", el.style.animation = lvl === 2 ? "dfly 4.5s linear forwards" : "dfly 5s linear forwards, dwob .5s ease-in-out infinite"), day.dn = (day.dn || 0) + 1, dTap(el, day, cp), el.addEventListener("animationend", (ev) => {
        ev.animationName === "dfly" && el.remove();
      });
      return;
    }
    if (kind === "gift") {
      // A: das fliegende Geschenk – kreist einmal um das Aufgabenfeld
      let el = dEl(box, "\u{1F381}"), t0 = performance.now(), dur = 6500, u0 = Math.random();
      el.style.fontSize = "40px", el.style.left = "0", el.style.top = "0", day.dn = (day.dn || 0) + 1, dTap(el, day, cp);
      let step = (now) => {
        if (!el.isConnected) return;
        let p = (now - t0) / dur;
        if (p >= 1) return el.remove();
        let [x, y] = dPath(R, 26, u0 + p);
        el.style.transform = "translate(" + (x - 20) + "px," + (y - 22) + "px) rotate(" + Math.sin(p * 30) * 15 + "deg)", requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      return;
    }
    if (kind === "msg" || kind === "fight" || kind === "wave") {
      let sz = kind === "msg" ? [230, 44] : kind === "fight" ? [130, 60] : [200, 64], at = dSpot(card, sz[0], sz[1]);
      if (!at) return dShow("gift", box, card, day, cp);
      let el;
      if (kind === "msg") el = dEl(box, "\u{1F426} Hallo! Nicht ablenken lassen!", "dmsg");
      else if (kind === "fight") el = dEl(box, '<span class="dfl">\u{1F9CD}</span><span class="dbo">\u{1F4A5}</span><span class="dfr">\u{1F9CD}‍♂️</span>', "dfight");
      else el = dEl(box, '<span class="dwv">\u{1F64B}</span>', "dwave");
      if (el.style.left = at.x + "px", el.style.top = at.y + "px", kind === "wave") {
        // E: die winkende Figur – zurückwinken ist freiwillig und kostet keine Sterne
        let b = document.createElement("button");
        b.className = "dwbtn", b.textContent = "\u{1F44B} Zur\xFCckwinken", b.onclick = (ev) => {
          ev.stopPropagation(), day.wv = (day.wv || 0) + 1, cp || (is = true, Pi()), el.firstChild.textContent = "\u{1F970}", b.remove(), end(el, 1200);
        }, el.append(b), end(el, 6500);
        return;
      }
      day.dn = (day.dn || 0) + 1, dTap(el, day, cp), end(el, kind === "msg" ? 3500 : 5000);
      return;
    }
    if (kind === "build") {
      // D: der kleine Baumeister baut einen Rahmen um das Lernfeld
      let pad = 10, fr = dEl(box, "", "dframe"), bars = [0, 1, 2, 3].map(() => {
        let b = document.createElement("i");
        return fr.append(b), b;
      }), man = dEl(box, "\u{1F477}"), x0 = R.left - pad, y0 = R.top - pad, w = R.width + 2 * pad, h = R.height + 2 * pad, t0 = performance.now(), dur = 6e3;
      fr.style.cssText = "left:0;top:0;pointer-events:none", man.style.fontSize = "34px", man.style.left = "0", man.style.top = "0", day.dn = (day.dn || 0) + 1, dTap(man, day, cp, () => (man.remove(), fr.remove()));
      let B = (b, x, y, bw, bh) => b.style.cssText = "position:fixed;background:#d9a441;box-shadow:0 0 0 1px #7a4b12;left:" + x + "px;top:" + y + "px;width:" + Math.max(0, bw) + "px;height:" + Math.max(0, bh) + "px", step = (now) => {
        if (!man.isConnected) return fr.remove();
        let p = Math.min(1, (now - t0) / dur), q = (a) => Math.max(0, Math.min(1, (p - a) * 4)), T = 6;
        B(bars[0], x0, y0, w * q(0), T), B(bars[1], x0 + w - T, y0, T, h * q(0.25)), B(bars[2], x0 + w - w * q(0.5), y0 + h - T, w * q(0.5), T), B(bars[3], x0, y0 + h - h * q(0.75), T, h * q(0.75));
        let [mx, my] = p < 0.25 ? [x0 + w * q(0), y0] : p < 0.5 ? [x0 + w, y0 + h * q(0.25)] : p < 0.75 ? [x0 + w - w * q(0.5), y0 + h] : [x0, y0 + h - h * q(0.75)];
        if (man.style.transform = "translate(" + (mx - 17) + "px," + (my - 34) + "px)", p < 1) return requestAnimationFrame(step);
        end(man, 1500), end(fr, 1500);
      };
      requestAnimationFrame(step);
    }
  }
  function dText(day) {
    if (!day.dn) return "";
    let ok = Math.round(100 * (1 - (day.dt || 0) / day.dn));
    return "\u{1F3AF} Konzentration heute: " + (ok >= 80 ? "⭐⭐⭐" : ok >= 55 ? "⭐⭐" : "⭐") + " (" + (day.dn - (day.dt || 0)) + " von " + day.dn + " Ablenkungen ignoriert)";
  }
  function dLevel(day, good) {
    day.dr = good ? (day.dr || 0) + 1 : 0;
    if (good && day.dr >= 3 && (day.dl || 1) < 3) day.dl = (day.dl || 1) + 1, day.dr = 0;
    if (!good && (day.dl || 1) > 1 && Math.random() < 0.5) day.dl = day.dl - 1;
  }
  function u_(i) {
    Xs();''', 'Ablenkung-Funktionen')
rep('K("div", { class: "qopts" }, l), o, c));\n    };\n    e();',
    'K("div", { class: "qopts" }, l), o, c)), dStart(s);\n    };\n    e();', 'Ablenkung-Start')
rep('    l && u.append(K("button", { class: "qbtn go", onclick: () => Pr(Ri) }',
    '    dText(t) && u.append(K("p", { class: "qmsg" }, dText(t))), l && u.append(K("button", { class: "qbtn go", onclick: () => Pr(Ri) }', 'Ablenkung-Lernbuch')
rep('K("div", { class: "qrow" }, U, x))), ia = setInterval(() => {', 'K("div", { class: "qrow" }, U, x))), CP && dStart(u, CP), ia = setInterval(() => {', 'Ablenkung-Wettbewerb')
