# Ablenkung + Konzentration im Lernmodus (u_) von Testversion 11
rep('  function u_(i) {\n    Xs();',
r'''  function dStyle() {
    if (document.getElementById("dstyle")) return;
    let st = document.createElement("style");
    st.id = "dstyle";
    st.textContent = "@keyframes dfly{0%{transform:translateX(-20vw)}100%{transform:translateX(120vw)}}@keyframes dwob{0%,100%{transform:rotate(-12deg) scale(1)}50%{transform:rotate(12deg) scale(1.15)}}.dist{position:fixed;z-index:99999;cursor:pointer;user-select:none;-webkit-user-select:none;line-height:1}";
    document.head.append(st);
  }
  function dStart(box) {
    let day = Li();
    day.nq = (day.nq || 0) + 1;
    if (Math.random() >= 0.4) return;
    let lvl = day.dl || 1, set = lvl === 1 ? ["\u{1F98B}", "\u{1F41D}"] : lvl === 2 ? ["\u{1F426}", "\u{1F415}", "\u{1F514}"] : ["\u{1F381}", "\u{1F388}", "\u{1F47B}"], size = lvl === 1 ? 34 : lvl === 2 ? 56 : 88;
    setTimeout(() => {
      if (!box.isConnected) return;
      dStyle();
      let el = document.createElement("div");
      el.className = "dist";
      el.textContent = set[Math.floor(Math.random() * set.length)];
      el.style.fontSize = size + "px";
      if (lvl === 1) {
        el.style.top = "4px";
        el.style.animation = "dfly 6s linear forwards";
      } else {
        el.style.top = (25 + Math.random() * 40) + "vh";
        el.style.animation = lvl === 2 ? "dfly 4.5s linear forwards" : "dfly 5s linear forwards, dwob .5s ease-in-out infinite";
      }
      day.dn = (day.dn || 0) + 1;
      el.onclick = () => {
        day.dt = (day.dt || 0) + 1;
        is = true;
        Pi();
        el.remove();
      };
      el.addEventListener("animationend", (ev) => { ev.animationName === "dfly" && el.remove(); });
      box.append(el);
    }, 2000 + Math.random() * 6000);
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
