// Lern-Modus für Milo: Aufgaben an den Stationen, Ablenkung, Konzentrationswert.
// Keine KI, keine Kamera, kein Internet. Alle Daten bleiben auf dem Gerät (localStorage).

const KEY = 'milo_lernen_v1';

export const DEFAULTS = {
  ablenkung: true,      // Ablenkungen an/aus
  stufe: 'auto',        // 'auto' oder 1 / 2 / 3
  level: 1,             // aktuelle Stufe im Auto-Modus
  goodStreak: 0, badStreak: 0,
  abzugTippen: 40,      // Abzug, wenn auf die Ablenkung getippt wurde
  abzugFalsch: 30,      // Abzug bei falscher Antwort (wenn Milo sonst meist richtig liegt)
  abzugProSek: 5,       // Abzug pro Sekunde, die er länger braucht als sonst
  abzugMax: 30,         // Obergrenze für den Zeit-Abzug
  rundenGroesse: 6,     // Aufgaben pro Runde
  chance: 0.4,          // Anteil der Aufgaben mit Ablenkung
  pin: '',              // Eltern-PIN (wird beim ersten Öffnen gesetzt)
};

// Welche Station welches Fach hat (später im Admin änderbar)
export const STATION_FACH = { 0: 'Gemischt', 1: 'Sachkunde', 2: 'Mathe', 3: 'Deutsch', 4: 'Mathe', 5: 'Sachkunde', 6: 'Englisch', 7: 'Deutsch' };

// ---------- reine Funktionen (ohne Oberfläche, gut testbar) ----------
export function taskScore(t, cfg, ctx) {
  let w = 100;
  if (t.getippt > 0) w -= cfg.abzugTippen;
  if (!t.richtig && ctx.sonstRichtig) w -= cfg.abzugFalsch;
  const extra = Math.max(0, (t.zeit_ms - ctx.baseMs) / 1000);
  w -= Math.min(cfg.abzugMax, cfg.abzugProSek * extra);
  return Math.max(0, Math.round(w));
}
export const starsFor = (avg) => (avg >= 80 ? 3 : avg >= 55 ? 2 : 1);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const median = (a) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
export const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
export function nextLevel(cfg, roundAvg) {
  let { level, goodStreak, badStreak } = cfg;
  if (roundAvg >= 80) { goodStreak++; badStreak = 0; } else if (roundAvg < 55) { badStreak++; goodStreak = 0; } else { goodStreak = 0; badStreak = 0; }
  if (goodStreak >= 3) { level = Math.min(3, level + 1); goodStreak = 0; }
  if (badStreak >= 2) { level = Math.max(1, level - 1); badStreak = 0; }
  return { level, goodStreak, badStreak };
}
export function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const shuffle = (a, rng = Math.random) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (rng() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rnd = (lo, hi, rng = Math.random) => lo + rng() * (hi - lo);
// Wettbewerb: alle bekommen mit demselben Startwert dieselben Fragen in derselben Reihenfolge
export function pickSeeded(Qs, fach, n, seed) {
  let pool = fach === 'Gemischt' ? Object.values(Qs).flat() : (Qs[fach] || []);
  if (!pool.length) pool = Object.values(Qs).flat();
  pool = pool.slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return shuffle(pool, mulberry32(seed)).slice(0, n);
}
export function rankResults(list) { return list.slice().sort((a, b) => (b.richtig - a.richtig) || (a.ms - b.ms)); }
const dayKey = (t) => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

function load() {
  try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); return { cfg: { ...DEFAULTS, ...(o.cfg || {}) }, log: Array.isArray(o.log) ? o.log : [] }; }
  catch (e) { return { cfg: { ...DEFAULTS }, log: [] }; }
}
function save(st) { try { if (st.log.length > 3000) st.log = st.log.slice(-3000); localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { } }

// ---------- Ablenkungen ----------
const AB = {
  1: { size: 34, items: [['🦋', 'Schmetterling'], ['🐝', 'Biene']], sound: false },
  2: { size: 56, items: [['🐦', 'Vogel'], ['🐕', 'Hund'], ['🔔', 'Glocke']], sound: true },
  3: { size: 88, items: [['🎁', 'Geschenk'], ['🎈', 'Ballon'], ['👻', 'Geist']], sound: true },
};

let actx = null;
function beep(freq, dur, vol) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine'; o.frequency.value = freq; g.gain.value = vol;
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
    o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + dur);
  } catch (e) { }
}

const CSS = `
#lern,#lern-eltern{position:fixed;inset:0;z-index:30;display:none;align-items:center;justify-content:center;background:rgba(3,8,6,.88);touch-action:auto;user-select:text;-webkit-user-select:text}
#lern.show,#lern-eltern.show{display:flex}
#lern-panel,#lern-ep{position:relative;width:min(560px,calc(100vw - 20px));max-height:calc(100vh - 20px);overflow:auto;padding:16px;background:rgba(6,14,12,.96);border:1px solid var(--line);border-radius:14px}
#lern-ab{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:2}
.ab-item{position:absolute;left:0;top:0;pointer-events:auto;line-height:1;cursor:pointer;will-change:transform}
#lern .hd{display:flex;justify-content:space-between;align-items:center;font:700 12px/1 inherit;letter-spacing:.1em;color:var(--mut);margin-bottom:12px}
#lern .q{font:700 22px/1.35 inherit;color:#fff;margin:6px 0 16px}
#lern .opts{display:grid;gap:10px}
#lern .opt,#lern .btn2,#lern-eltern .btn2{min-height:54px;padding:10px 14px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.06);color:var(--ink);font:600 18px/1.2 inherit;text-align:left;cursor:pointer}
#lern .opt:active,#lern .btn2:active,#lern-eltern .btn2:active{background:rgba(89,255,90,.22)}
#lern .opt.ok{background:rgba(60,200,80,.35);border-color:#59ff5a}
#lern .opt.no{background:rgba(220,60,60,.35);border-color:#ff5a4a}
#lern .fb{margin:12px 0 0;font-size:15px;line-height:1.4;color:var(--ink);min-height:22px}
#lern .btn2{margin-top:12px;text-align:center;width:100%;background:rgba(89,255,90,.22);border-color:var(--g)}
#lern .stars{font-size:44px;letter-spacing:6px;text-align:center;margin:10px 0}
#lern .center{text-align:center}
#lern-eltern h3{margin:0 0 10px;color:var(--g)}
#lern-eltern .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:8px 0}
#lern-eltern .btn2{min-height:40px;font-size:14px;padding:6px 12px}
#lern-eltern .btn2.on{background:rgba(89,255,90,.3);border-color:var(--g)}
#lern-eltern input{width:72px;height:38px;border-radius:8px;border:1px solid var(--line);background:rgba(255,255,255,.08);color:#fff;font:600 15px inherit;padding:0 8px;touch-action:auto;user-select:text;-webkit-user-select:text}
#lern-eltern .bars{display:flex;align-items:flex-end;gap:6px;height:90px;margin:8px 0}
#lern-eltern .bar{flex:1;background:rgba(89,255,90,.5);border-radius:4px 4px 0 0;position:relative;min-height:2px}
#lern-eltern .bar span{position:absolute;top:-16px;left:0;right:0;text-align:center;font-size:11px;color:var(--mut)}
#lern-eltern .lbl{display:flex;gap:6px}#lern-eltern .lbl span{flex:1;text-align:center;font-size:11px;color:var(--mut)}
#lern-eltern p,#lern-eltern li{font-size:14px;line-height:1.5;margin:4px 0}
#lern-eltern ul{padding-left:18px;margin:6px 0}
#lern-eltern small{color:var(--mut)}
`;

export function initLernen(hooks = {}) {
  const st = load();
  const Qs = window.GEMEN_QUESTIONS || {};
  const style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);

  const root = document.createElement('div'); root.id = 'lern';
  root.innerHTML = '<div id="lern-panel"><div id="lern-ab"></div><div class="hd"><span id="lern-t"></span><span id="lern-n"></span><button class="btn" id="lern-x" style="min-width:36px;height:34px">✕</button></div><div id="lern-body"></div></div>';
  document.body.appendChild(root);
  const panel = root.querySelector('#lern-panel'), abLayer = root.querySelector('#lern-ab'), body = root.querySelector('#lern-body');
  const tEl = root.querySelector('#lern-t'), nEl = root.querySelector('#lern-n');
  const elt = document.createElement('div'); elt.id = 'lern-eltern'; elt.innerHTML = '<div id="lern-ep"></div>'; document.body.appendChild(elt);
  const ep = elt.querySelector('#lern-ep');

  let R = null; // aktuelle Runde
  let CMP = null; // laufender Wettbewerb: { cid, me, parts: Map(id -> {name, res}), view }
  const curLevel = () => (st.cfg.stufe === 'auto' ? st.cfg.level : Number(st.cfg.stufe) || 1);

  // ---- Fragen holen ----
  function pickQuestions(fach, n) {
    let pool = fach === 'Gemischt' ? Object.values(Qs).flat() : (Qs[fach] || []);
    if (!pool.length) pool = Object.values(Qs).flat();
    const seen = new Set(st.log.slice(-400).map(l => l.qid));
    const fresh = pool.filter(q => !seen.has(q.id));
    return shuffle(fresh.length >= n ? fresh : pool).slice(0, n);
  }

  // ---- Runde starten ----
  function startRound(station, opts = {}) {
    const comp = opts.comp || null; // { cid, seed, n, lvl }
    const fach = STATION_FACH[station.id] || 'Gemischt';
    const qs = comp ? pickSeeded(Qs, fach, comp.n, comp.seed) : pickQuestions(fach, st.cfg.rundenGroesse);
    if (!qs.length) { hooks.toast && hooks.toast('Keine Fragen gefunden'); return; }
    let abIdx = new Set();
    if ((comp || st.cfg.ablenkung) && qs.length > 1) {
      const k = Math.max(1, Math.round(qs.length * (comp ? 0.4 : st.cfg.chance)));
      shuffle([...Array(qs.length - 1).keys()].map(i => i + 1), comp ? mulberry32(comp.seed + 99) : Math.random).slice(0, k).forEach(i => abIdx.add(i)); // erste Aufgabe immer ohne
    }
    R = { station, fach, qs, i: 0, abIdx, tasks: [], correct: 0, timers: [], comp, level: comp ? comp.lvl : curLevel() };
    if (comp) {
      CMP = { cid: comp.cid, me: opts.me, parts: new Map(), view: false };
      CMP.parts.set(opts.me.id, { name: opts.me.name, res: null });
      if (opts.from && opts.from.id !== opts.me.id) CMP.parts.set(opts.from.id, { name: opts.from.name, res: null });
    }
    tEl.textContent = (comp ? '🏆 ' : '') + (station.id === 0 ? '★ ' : '') + station.name + ' · ' + fach;
    root.classList.add('show'); hooks.onOpen && hooks.onOpen();
    showQuestion();
  }
  function closeRound() {
    clearAll(); root.classList.remove('show'); R = null; if (CMP) CMP.view = false; hooks.onClose && hooks.onClose();
  }
  function clearAll() {
    if (!R) return; R.timers.forEach(clearTimeout); R.timers = []; if (R.idle) clearInterval(R.idle); R.idle = null; abLayer.innerHTML = '';
  }

  // ---- Frage anzeigen ----
  function showQuestion() {
    clearAll();
    const q = R.qs[R.i];
    nEl.textContent = (R.i + 1) + ' / ' + R.qs.length;
    const qr = R.comp ? mulberry32(R.comp.seed * 31 + R.i * 7919 + 1) : Math.random;
    const order = shuffle([0, 1, 2, 3].slice(0, q.optionen.length), qr);
    body.innerHTML = '';
    const qEl = document.createElement('div'); qEl.className = 'q'; qEl.textContent = q.frage; body.appendChild(qEl);
    const opts = document.createElement('div'); opts.className = 'opts'; body.appendChild(opts);
    const fb = document.createElement('div'); fb.className = 'fb'; body.appendChild(fb);
    const cur = R.cur = { q, qr, start: performance.now(), lastAct: performance.now(), idleSeen: false, pausen: 0, getippt: 0, abStart: 0, rueck: 0, abTyp: null, abStufe: 0, done: false };
    order.forEach(oi => {
      const b = document.createElement('button'); b.className = 'opt'; b.textContent = q.optionen[oi];
      b.addEventListener('click', () => answer(oi, b, opts, fb));
      opts.appendChild(b);
    });
    cur.idleTimer = R.idle = setInterval(() => { if (!cur.done && !cur.idleSeen && performance.now() - cur.lastAct > 10000) { cur.pausen++; cur.idleSeen = true; } }, 1000);
    if (R.abIdx.has(R.i)) {
      const delay = rnd(2000, 8000, qr);
      R.timers.push(setTimeout(() => spawn(cur), delay));
    }
  }
  // jedes Tippen auf die Aufgabe zählt als "ist wieder bei der Aufgabe"
  panel.addEventListener('pointerdown', (e) => {
    const c = R && R.cur; if (!c || c.done) return;
    if (e.target.closest && e.target.closest('.ab-item')) return;
    c.lastAct = performance.now(); c.idleSeen = false;
    if (c.abStart && !c.rueck) c.rueck = c.lastAct - c.abStart;
  });

  function spawn(cur) {
    if (!R || R.cur !== cur || cur.done) return;
    const lvl = R.level, cfg = AB[lvl], qr = cur.qr;
    const [emo, name] = cfg.items[(qr() * cfg.items.length) | 0];
    const dur = rnd(3000, 6000, qr);
    const it = document.createElement('div'); it.className = 'ab-item'; it.textContent = emo; it.style.fontSize = cfg.size + 'px';
    const W = panel.clientWidth, H = panel.clientHeight;
    abLayer.appendChild(it);
    let anim;
    if (lvl === 1) { // leise, am oberen Rand
      const y = H * 0.05;
      anim = it.animate([{ transform: `translate(${-cfg.size}px,${y}px)` }, { transform: `translate(${W * 0.3}px,${y + 14}px)` }, { transform: `translate(${W * 0.6}px,${y - 6}px)` }, { transform: `translate(${W}px,${y + 10}px)` }], { duration: dur, easing: 'linear' });
    } else if (lvl === 2) { // mittel, quer durch die Mitte, mit Ton
      const y = H * rnd(0.3, 0.5, qr), ltr = qr() < 0.5, a = ltr ? -cfg.size : W, b = ltr ? W : -cfg.size;
      anim = it.animate([{ transform: `translate(${a}px,${y}px)` }, { transform: `translate(${(a + b) / 2}px,${y - 20}px)` }, { transform: `translate(${b}px,${y}px)` }], { duration: dur, easing: 'ease-in-out' });
      beep(660, 0.18, 0.05); R.timers.push(setTimeout(() => beep(880, 0.18, 0.05), 400));
    } else { // stark, groß, wackelt und blinkt, mit Ton
      const x = W * rnd(0.55, 0.8, qr), y = H * rnd(0.3, 0.5, qr);
      anim = it.animate([{ transform: `translate(${x}px,${y}px) rotate(-12deg) scale(1)`, opacity: 1 }, { transform: `translate(${x - 40}px,${y - 50}px) rotate(12deg) scale(1.15)`, opacity: .55 }, { transform: `translate(${x}px,${y}px) rotate(-12deg) scale(1)`, opacity: 1 }, { transform: `translate(${x - 30}px,${y + 40}px) rotate(10deg) scale(1.15)`, opacity: .55 }, { transform: `translate(${x}px,${y}px) rotate(-12deg) scale(1)`, opacity: 1 }], { duration: dur, easing: 'ease-in-out' });
      beep(520, 0.15, 0.07); R.timers.push(setTimeout(() => beep(780, 0.15, 0.07), 300), setTimeout(() => beep(520, 0.15, 0.07), 700));
    }
    cur.abStart = performance.now(); cur.abTyp = name; cur.abStufe = lvl;
    it.addEventListener('pointerdown', (e) => {
      e.stopPropagation(); cur.getippt++; beep(1000, 0.08, 0.06);
      try { it.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150 }); } catch (err) { }
      it.remove();
    });
    anim.onfinish = () => it.remove();
    R.timers.push(setTimeout(() => it.remove(), dur + 200));
  }

  // ---- Antwort ----
  function answer(oi, btn, opts, fb) {
    const cur = R.cur; if (cur.done) return; cur.done = true;
    const now = performance.now();
    const q = cur.q;
    const correctText = q.optionen[q.richtig];
    const isRight = oi === q.richtig;
    clearAll();
    [...opts.children].forEach(b => { b.disabled = true; if (b.textContent === correctText) b.classList.add('ok'); });
    if (!isRight) btn.classList.add('no');
    const zeit = now - cur.start;
    const shown = !!cur.abStart;
    const rec = { t: Date.now(), fach: R.fach, thema: q.thema || '', station: R.station.id, qid: q.id, richtig: isRight, zeit_ms: Math.round(zeit), getippt: cur.getippt, pausen: cur.pausen, ab: shown ? { typ: cur.abTyp, stufe: cur.abStufe } : null, rueck_ms: shown ? Math.round(cur.rueck || zeit - (cur.abStart - cur.start)) : null, wert: null, comp: R.comp ? R.comp.cid : 0 };
    if (shown) {
      const same = st.log.filter(l => l.fach === R.fach && !l.ab).slice(-30);
      const thisRound = R.tasks.filter(t => !t.ab);
      const times = same.map(l => l.zeit_ms).concat(thisRound.map(t => t.zeit_ms));
      const base = times.length ? median(times) : 8000;
      const sonst = same.concat(thisRound);
      const sonstRichtig = sonst.length < 5 ? true : sonst.filter(l => l.richtig).length / sonst.length >= 0.6;
      rec.wert = taskScore(rec, st.cfg, { baseMs: base, sonstRichtig });
    }
    R.tasks.push(rec); if (isRight) R.correct++;
    fb.textContent = (isRight ? 'Richtig! ' : 'Nicht ganz. ') + (q.erklaerung || '');
    const nx = document.createElement('button'); nx.className = 'btn2'; nx.textContent = R.i + 1 < R.qs.length ? 'Weiter' : 'Fertig';
    nx.addEventListener('click', () => { if (R.i + 1 < R.qs.length) { R.i++; showQuestion(); } else finish(); });
    body.appendChild(nx);
  }

  // ---- Ende der Runde ----
  function finish() {
    clearAll();
    st.log.push(...R.tasks);
    const scored = R.tasks.filter(t => t.wert !== null).map(t => t.wert);
    if (R.comp) {
      const a = scored.length ? avg(scored) : null;
      const res = { cid: R.comp.cid, richtig: R.correct, n: R.qs.length, ms: Math.round(R.tasks.reduce((s, t) => s + t.zeit_ms, 0)), konz: a === null ? null : Math.round(a), sterne: a === null ? 0 : starsFor(a) };
      save(st);
      const me = CMP.parts.get(CMP.me.id); me.res = res;
      hooks.compDone && hooks.compDone(res);
      CMP.view = true; renderComp(); return;
    }
    let html = '<div class="center"><div class="q">Geschafft!</div><p>Richtig: <b>' + R.correct + ' von ' + R.qs.length + '</b></p>';
    if (scored.length) {
      const a = avg(scored), s = starsFor(a);
      html += '<div class="stars">' + '★'.repeat(s) + '<span style="opacity:.25">' + '★'.repeat(3 - s) + '</span></div><p><b>Dranbleiben</b></p><p>' +
        (s === 3 ? 'Super, du bist bei der Aufgabe geblieben!' : s === 2 ? 'Gut gemacht! Du bist fast immer dabei geblieben.' : 'Die Ablenkung war spannend. Nächstes Mal schaffst du es noch besser!') + '</p>';
      if (st.cfg.stufe === 'auto') Object.assign(st.cfg, nextLevel(st.cfg, a));
    }
    html += '</div>';
    save(st);
    body.innerHTML = html; nEl.textContent = '';
    const bt = document.createElement('button'); bt.className = 'btn2'; bt.textContent = 'Fertig'; bt.addEventListener('click', closeRound); body.appendChild(bt);
  }
  function renderComp() {
    if (!CMP || !CMP.view) return;
    const rows = [...CMP.parts.entries()].map(([id, e]) => ({ id, name: e.name, ...(e.res || {}), done: !!e.res }));
    const done = rankResults(rows.filter(r => r.done)), wait = rows.filter(r => !r.done);
    const medal = ['🥇', '🥈', '🥉'];
    let html = '<div class="center"><div class="q">🏆 Wettbewerb</div></div><div class="opts">';
    done.forEach((r, i) => {
      html += '<div class="opt" style="' + (r.id === CMP.me.id ? 'border-color:#59ff5a;background:rgba(89,255,90,.15)' : '') + '"><b>' + (medal[i] || (i + 1) + '.') + ' ' + esc(r.id === CMP.me.id ? r.name + ' (du)' : r.name) + '</b><br><small>Richtig: ' + r.richtig + ' von ' + r.n + ' · Zeit: ' + (r.ms / 1000).toFixed(0) + ' s · Dranbleiben: ' + (r.sterne ? '★'.repeat(r.sterne) : '–') + '</small></div>';
    });
    wait.forEach(r => { html += '<div class="opt" style="opacity:.6"><b>' + esc(r.name) + '</b><br><small>spielt noch …</small></div>'; });
    html += '</div><p class="fb">' + (wait.length ? 'Die Wertung aktualisiert sich, sobald alle fertig sind.' : (done.length > 1 && done[0].id === CMP.me.id ? 'Du hast gewonnen! 🎉' : done.length > 1 ? 'Gut gespielt! Beim nächsten Mal schaffst du es.' : '')) + '</p><small style="color:var(--mut)">Wer mehr richtig hat, liegt vorn. Bei gleich vielen zählt die Zeit.</small>';
    body.innerHTML = html; nEl.textContent = '';
    const bt = document.createElement('button'); bt.className = 'btn2'; bt.textContent = 'Fertig'; bt.addEventListener('click', closeRound); body.appendChild(bt);
  }
  function compUpdate(msg) {
    if (!CMP || CMP.cid !== msg.cid) return;
    const e = CMP.parts.get(msg.id) || { name: msg.name, res: null };
    e.name = msg.name || e.name;
    if (msg.kind === 'done') e.res = { richtig: msg.richtig, n: msg.n, ms: msg.ms, konz: msg.konz, sterne: msg.sterne };
    CMP.parts.set(msg.id, e);
    renderComp();
  }
  root.querySelector('#lern-x').addEventListener('click', () => { if (R) { st.log.push(...R.tasks); save(st); } closeRound(); });

  // ---------- Elternbereich ----------
  function openParent() {
    elt.classList.add('show'); hooks.onOpen && hooks.onOpen();
    if (!st.cfg.pin) return pinScreen(true);
    pinScreen(false);
  }
  function closeParent() { elt.classList.remove('show'); hooks.onClose && hooks.onClose(); }
  function pinScreen(setNew) {
    ep.innerHTML = '<h3>Elternbereich</h3><p>' + (setNew ? 'Wähle eine PIN mit 4 Ziffern. Die brauchst du später, um hier hineinzukommen.' : 'Bitte PIN eingeben.') + '</p><div class="row"><input id="ep-pin" type="password" inputmode="numeric" maxlength="4" placeholder="PIN"><button class="btn2" id="ep-ok">OK</button><button class="btn2" id="ep-x">Abbrechen</button></div><p id="ep-msg" style="color:#ff8a7a"></p>';
    const inp = ep.querySelector('#ep-pin');
    ep.querySelector('#ep-x').onclick = closeParent;
    ep.querySelector('#ep-ok').onclick = () => {
      const v = inp.value.trim();
      if (!/^\d{4}$/.test(v)) { ep.querySelector('#ep-msg').textContent = 'Bitte genau 4 Ziffern.'; return; }
      if (setNew) { st.cfg.pin = v; save(st); parentScreen(); } else if (v === st.cfg.pin) parentScreen(); else ep.querySelector('#ep-msg').textContent = 'Falsche PIN.';
    };
  }
  function parentScreen() {
    const c = st.cfg, log = st.log, ab = log.filter(l => l.ab && l.wert !== null);
    const days = []; for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push(dayKey(d.getTime())); }
    const perDay = days.map(k => { const v = ab.filter(l => dayKey(l.t) === k).map(l => l.wert); return v.length ? Math.round(avg(v)) : null; });
    const byTyp = {}; ab.forEach(l => { (byTyp[l.ab.typ] = byTyp[l.ab.typ] || []).push(l.wert); });
    const worst = Object.entries(byTyp).filter(([, v]) => v.length >= 2).sort((a, b) => avg(a[1]) - avg(b[1]))[0];
    const rueck = ab.map(l => l.rueck_ms).filter(x => x);
    const lbl = days.map(k => ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][new Date(k + 'T12:00:00').getDay()]);
    const num = (id, v, lab) => '<label><small>' + lab + '</small><br><input id="' + id + '" type="number" inputmode="numeric" value="' + v + '"></label>';
    ep.innerHTML = '<h3>Elternbereich</h3>' +
      '<p><b>Konzentration (Ø pro Tag, 0–100)</b></p><div class="bars">' + perDay.map(v => '<div class="bar" style="height:' + (v === null ? 2 : Math.max(4, v * 0.9)) + 'px;' + (v === null ? 'opacity:.25' : '') + '"><span>' + (v === null ? '–' : v) + '</span></div>').join('') + '</div><div class="lbl">' + lbl.map(x => '<span>' + x + '</span>').join('') + '</div>' +
      '<ul><li>Aufgaben insgesamt: <b>' + log.length + '</b>, davon mit Ablenkung: <b>' + ab.length + '</b></li>' +
      '<li>Auf die Ablenkung getippt: <b>' + ab.filter(l => l.getippt > 0).length + '</b> von ' + ab.length + '</li>' +
      '<li>Ø Zeit bis zum nächsten Tippen auf die Aufgabe: <b>' + (rueck.length ? (avg(rueck) / 1000).toFixed(1) + ' s' : '–') + '</b></li>' +
      '<li>Lenkt am meisten ab: <b>' + (worst ? worst[0] : '–') + '</b></li>' +
      '<li>Aktuelle Stufe: <b>' + curLevel() + '</b>' + (c.stufe === 'auto' ? ' (automatisch)' : ' (fest)') + '</li></ul>' +
      '<small>Das ist ein Übungswert aus dem Spiel, kein Test und keine Diagnose.</small>' +
      '<p><b>Einstellungen</b></p><div class="row"><button class="btn2 ' + (c.ablenkung ? 'on' : '') + '" id="ep-ab">Ablenkung: ' + (c.ablenkung ? 'AN' : 'AUS') + '</button></div>' +
      '<div class="row"><small>Stufe:</small>' + ['auto', 1, 2, 3].map(s => '<button class="btn2 ' + (String(c.stufe) === String(s) ? 'on' : '') + '" data-s="' + s + '">' + (s === 'auto' ? 'Auto' : s) + '</button>').join('') + '</div>' +
      '<div class="row">' + num('ep-a1', c.abzugTippen, 'Abzug Tippen') + num('ep-a2', c.abzugFalsch, 'Abzug falsch') + num('ep-a3', c.abzugProSek, 'Abzug je Sek.') + num('ep-a4', c.abzugMax, 'Max. Zeit-Abzug') + num('ep-a5', c.rundenGroesse, 'Aufgaben/Runde') + '</div>' +
      '<div class="row"><button class="btn2" id="ep-save">Speichern</button><button class="btn2" id="ep-del">Alle Daten löschen</button><button class="btn2" id="ep-close">Schließen</button></div><p id="ep-msg"></p>';
    ep.querySelector('#ep-ab').onclick = () => { c.ablenkung = !c.ablenkung; save(st); parentScreen(); };
    ep.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { c.stufe = b.dataset.s === 'auto' ? 'auto' : Number(b.dataset.s); save(st); parentScreen(); });
    ep.querySelector('#ep-save').onclick = () => {
      const g = (id, d, lo, hi) => { const v = parseInt(ep.querySelector(id).value, 10); return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d; };
      c.abzugTippen = g('#ep-a1', c.abzugTippen, 0, 100); c.abzugFalsch = g('#ep-a2', c.abzugFalsch, 0, 100); c.abzugProSek = g('#ep-a3', c.abzugProSek, 0, 50); c.abzugMax = g('#ep-a4', c.abzugMax, 0, 100); c.rundenGroesse = g('#ep-a5', c.rundenGroesse, 3, 20);
      save(st); ep.querySelector('#ep-msg').textContent = 'Gespeichert.';
    };
    let armed = false; const del = ep.querySelector('#ep-del');
    del.onclick = () => { if (!armed) { armed = true; del.textContent = 'Wirklich löschen? Nochmal tippen'; return; } st.log = []; st.cfg.level = 1; st.cfg.goodStreak = 0; st.cfg.badStreak = 0; save(st); parentScreen(); };
    ep.querySelector('#ep-close').onclick = closeParent;
  }

  return { startRound, openParent, compUpdate, busy: () => !!R, level: () => curLevel(), state: st };
}
