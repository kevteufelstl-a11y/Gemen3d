
  // ---------- Hintergrundmusik (26.11.2026): Hip-Hop-Beats, Akustikgitarre, Rock-Melodie ----------
  // Alles wird live im Spiel erzeugt (Web Audio), ohne Dateien und ohne KI. Auswahl und Lautstärke bleiben gespeichert.
  // Während der Abschlussprüfung ist die Musik stumm.
  (function MU_init() {
    const MU = { ctx: null, master: null, noise: null, bus: null, tm: null, mode: "aus", vol: 0.5, step: 0, nextT: 0, ks: {}, rev: null };
    try {
      const sv = JSON.parse(localStorage.getItem("milo3d_musik") || "{}");
      if (["aus", "hiphop", "gitarre", "rock"].includes(sv.mode)) MU.mode = sv.mode;
      if (typeof sv.vol === "number") MU.vol = Math.min(1, Math.max(0, sv.vol));
    } catch {
    }
    const save = () => {
      try {
        localStorage.setItem("milo3d_musik", JSON.stringify({ mode: MU.mode, vol: MU.vol }));
      } catch {
      }
    };
    const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
    const NAMES = { aus: "\u{1F507} Aus", hiphop: "\u{1F3A4} Hip-Hop-Beats", gitarre: "\u{1F3B8} Akustikgitarre", rock: "\u{1F918} Rock-Melodie" };

    function ensure() {
      if (MU.ctx) return true;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      const c = MU.ctx = new AC();
      MU.master = c.createGain(), MU.master.gain.value = MU.vol * 0.9;
      const comp = c.createDynamicsCompressor();
      MU.master.connect(comp), comp.connect(c.destination);
      // weisses Rauschen (Schlagzeug, Gitarrenanschlag)
      const nb = c.createBuffer(1, c.sampleRate, c.sampleRate), d = nb.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      MU.noise = nb;
      // kleiner Hall fuer die Gitarre
      const L = Math.floor(c.sampleRate * 1.3), ib = c.createBuffer(2, L, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const a = ib.getChannelData(ch);
        for (let i = 0; i < L; i++) a[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / L, 2.6);
      }
      MU.rev = c.createConvolver(), MU.rev.buffer = ib;
      return true;
    }
    const env = (g, t, a, peak, dur) => (g.gain.setValueAtTime(0.0001, t), g.gain.linearRampToValueAtTime(peak, t + a), g.gain.exponentialRampToValueAtTime(0.0001, t + dur));

    // ----- Schlagzeug -----
    function kick(t, v = 1) {
      const c = MU.ctx, o = c.createOscillator(), g = c.createGain();
      o.frequency.setValueAtTime(150, t), o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
      env(g, t, 0.003, 0.95 * v, 0.34), o.connect(g), g.connect(MU.bus), o.start(t), o.stop(t + 0.4);
    }
    function snare(t, v = 1) {
      const c = MU.ctx, n = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), o = c.createOscillator(), g2 = c.createGain();
      n.buffer = MU.noise, f.type = "bandpass", f.frequency.value = 1900, f.Q.value = 0.8;
      env(g, t, 0.002, 0.55 * v, 0.2), n.connect(f), f.connect(g), g.connect(MU.bus), n.start(t, Math.random() * 0.5, 0.25);
      o.type = "triangle", o.frequency.value = 190, env(g2, t, 0.002, 0.3 * v, 0.1), o.connect(g2), g2.connect(MU.bus), o.start(t), o.stop(t + 0.15);
    }
    function hat(t, open, v = 1) {
      const c = MU.ctx, n = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      n.buffer = MU.noise, f.type = "highpass", f.frequency.value = 7200;
      env(g, t, 0.001, 0.2 * v, open ? 0.2 : 0.045), n.connect(f), f.connect(g), g.connect(MU.bus), n.start(t, Math.random() * 0.5, 0.3);
    }
    // ----- Toene -----
    function bass808(t, m, dur, v = 1) {
      const c = MU.ctx, o = c.createOscillator(), g = c.createGain();
      o.frequency.setValueAtTime(hz(m) * 1.5, t), o.frequency.exponentialRampToValueAtTime(hz(m), t + 0.04);
      env(g, t, 0.005, 0.7 * v, dur), o.connect(g), g.connect(MU.bus), o.start(t), o.stop(t + dur + 0.05);
    }
    function keys(t, ms, dur, v = 1) {
      const c = MU.ctx;
      for (const m of ms) {
        const o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain();
        o.type = "triangle", o.frequency.value = hz(m), o2.type = "sine", o2.frequency.value = hz(m) * 2;
        env(g, t, 0.02, 0.07 * v, dur), o.connect(g), o2.connect(g), g.connect(MU.bus), o.start(t), o2.start(t), o.stop(t + dur + 0.05), o2.stop(t + dur + 0.05);
      }
    }
    // Karplus-Strong: gezupfte Saite aus Rauschen (einmal je Ton berechnet)
    function pluckBuf(m) {
      if (MU.ks[m]) return MU.ks[m];
      const c = MU.ctx, sr = c.sampleRate, N = Math.max(2, Math.round(sr / hz(m))), len = Math.floor(sr * 2.4), b = c.createBuffer(1, len, sr), d = b.getChannelData(0);
      for (let i = 0; i < N; i++) d[i] = Math.random() * 2 - 1;
      for (let i = N; i < len; i++) d[i] = 0.4985 * (d[i - N] + d[i - N + 1]);
      for (let i = 0; i < len; i++) d[i] *= Math.min(1, i / 60);
      return MU.ks[m] = b;
    }
    function pluck(t, m, v = 1) {
      const c = MU.ctx, s = c.createBufferSource(), g = c.createGain(), f = c.createBiquadFilter(), snd = c.createGain();
      s.buffer = pluckBuf(m), f.type = "lowpass", f.frequency.value = 5200, g.gain.value = 0.55 * v;
      s.connect(f), f.connect(g), g.connect(MU.bus), snd.gain.value = 0.35, g.connect(snd), snd.connect(MU.rev), MU.rev.connect(MU.bus), s.start(t);
    }
    function distCurve(k) {
      const n = 1024, cv = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const x = i * 2 / n - 1;
        cv[i] = (3 + k) * x * 20 * (Math.PI / 180) / (Math.PI + k * Math.abs(x));
      }
      return cv;
    }
    function rockChord(t, m, dur, v = 1, mute) {
      const c = MU.ctx, sh = c.createWaveShaper(), lp = c.createBiquadFilter(), g = c.createGain();
      sh.curve = distCurve(70), lp.type = "lowpass", lp.frequency.value = mute ? 900 : 2600;
      env(g, t, 0.004, 0.22 * v, dur), sh.connect(lp), lp.connect(g), g.connect(MU.bus);
      for (const k of [0, 7, 12]) {
        const o = c.createOscillator();
        o.type = "sawtooth", o.frequency.value = hz(m + k), o.connect(sh), o.start(t), o.stop(t + dur + 0.05);
      }
    }
    function lead(t, m, dur, v = 1) {
      const c = MU.ctx, o = c.createOscillator(), sh = c.createWaveShaper(), lp = c.createBiquadFilter(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
      o.type = "sawtooth", o.frequency.value = hz(m), lfo.frequency.value = 5.5, lg.gain.value = 6, lfo.connect(lg), lg.connect(o.detune);
      sh.curve = distCurve(30), lp.type = "lowpass", lp.frequency.value = 3400;
      env(g, t, 0.015, 0.2 * v, dur), o.connect(sh), sh.connect(lp), lp.connect(g), g.connect(MU.bus);
      o.start(t), lfo.start(t), o.stop(t + dur + 0.05), lfo.stop(t + dur + 0.05);
    }

    // ----- Stuecke (alles in a-Moll) -----
    const A = 57, F = 53, C = 60, G = 55;
    const STYLES = {
      hiphop: {
        dt: 60 / 88 / 4, swing: 0.14, len: 16, bars: 4,
        play(s, t) {
          const st = s % 16, bar = Math.floor(s / 16) % 4, root = [A - 24, F - 24, C - 24, G - 24][bar], ch = [[57, 60, 64], [53, 57, 60], [60, 64, 67], [55, 59, 62]][bar];
          if ([0, 7, 10].includes(st) || (bar === 3 && st === 14)) kick(t, st === 0 ? 1 : 0.85);
          if (st === 4 || st === 12) snare(t);
          if (st % 2 === 0) hat(t, st === 14, st % 4 === 0 ? 1 : 0.6);
          else if (st === 11 || st === 15) hat(t, false, 0.4);
          if (st === 0) bass808(t, root + 12, this.dt * 6), keys(t, ch, this.dt * 14, 0.9);
          if (st === 10) bass808(t, root + 12, this.dt * 3, 0.9);
          if (st === 14 && bar % 2) bass808(t, root + 19, this.dt * 2, 0.7);
        }
      },
      gitarre: {
        dt: 60 / 92 / 2, swing: 0, len: 8, bars: 4,
        play(s, t) {
          const st = s % 8, bar = Math.floor(s / 8) % 4, N = [[45, 57, 60, 64, 69], [41, 53, 57, 60, 65], [48, 55, 60, 64, 67], [43, 55, 59, 62, 67]][bar];
          // Zupfmuster: Bass, dann abwechselnd hohe Saiten
          const pat = [0, 2, 3, 2, 1, 3, 4, 3][st];
          pluck(t, N[pat], st === 0 ? 1 : st % 2 ? 0.55 : 0.75);
          if (st === 4) pluck(t + 0.004, N[1], 0.6);
          // ab und zu eine kleine Melodie obenauf
          if (bar % 2 === 1 && st === 6) pluck(t + this.dt * 0.5, N[4] + (bar === 3 ? 2 : 0), 0.7);
        }
      },
      rock: {
        dt: 60 / 124 / 4, swing: 0, len: 16, bars: 4,
        play(s, t) {
          const st = s % 16, bar = Math.floor(s / 16) % 4, r = [A - 24, A - 24, F - 24, G - 24][bar] + 12;
          if ([0, 6, 8, 10].includes(st)) kick(t, st === 0 ? 1 : 0.8);
          if (st === 4 || st === 12) snare(t, 1.1);
          if (st % 2 === 0) hat(t, st === 14, 0.8);
          // Riff: Powerchords auf Achteln, bei Schlag 1 und 3 offen
          if (st % 2 === 0) rockChord(t, r + 12, this.dt * (st % 8 === 0 ? 1.9 : 1.1), st % 8 === 0 ? 1 : 0.8, st % 8 !== 0);
          if (st === 0 || st === 6 || st === 10) bass808(t, r, this.dt * 1.8, 0.45);
          // Melodie (a-Moll-Pentatonik): je Takt vier Toene
          const M = [[[0, 69, 3], [4, 72, 2], [6, 69, 2], [8, 67, 4]], [[0, 64, 3], [4, 67, 2], [6, 69, 2], [8, 72, 4]], [[0, 72, 3], [4, 69, 2], [6, 72, 2], [8, 76, 5]], [[0, 74, 3], [4, 72, 2], [6, 69, 2], [8, 67, 6]]][bar];
          for (const [at, m, dl] of M) if (at === st) lead(t, m, this.dt * dl, 1);
        }
      }
    };

    function sched() {
      const c = MU.ctx, S = STYLES[MU.mode];
      if (!c || !S || !MU.bus) return;
      while (MU.nextT < c.currentTime + 0.25) {
        const t = MU.nextT + (MU.step % 2 === 1 ? S.dt * S.swing : 0);
        try {
          S.play(MU.step, t);
        } catch {
        }
        MU.step++, MU.nextT += S.dt;
      }
    }
    function stopPlay() {
      clearInterval(MU.tm), MU.tm = null;
      const b = MU.bus;
      if (b && MU.ctx) {
        b.gain.cancelScheduledValues(MU.ctx.currentTime), b.gain.setTargetAtTime(0, MU.ctx.currentTime, 0.12);
        setTimeout(() => {
          try {
            b.disconnect();
          } catch {
          }
        }, 2500);
      }
      MU.bus = null;
    }
    function startPlay() {
      stopPlay();
      if (MU.mode === "aus" || !ensure()) return;
      const c = MU.ctx;
      c.state === "suspended" && c.resume();
      MU.bus = c.createGain(), MU.bus.gain.value = MU.mode === "gitarre" ? 1.3 : 1, MU.bus.connect(MU.master);
      MU.step = 0, MU.nextT = c.currentTime + 0.15;
      MU.tm = setInterval(sched, 40), sched();
    }
    function setMode(m) {
      MU.mode = m, save(), startPlay(), btnUpd();
    }
    function setVol(v) {
      MU.vol = v, save(), MU.master && MU.master.gain.setTargetAtTime(duck() ? 0 : v * 0.9, MU.ctx.currentTime, 0.1);
    }
    // In der Abschlusspruefung ist die Musik stumm (Konzentration)
    const duck = () => !!document.querySelector(".pr-opt");
    let wasDuck = false;
    setInterval(() => {
      if (!MU.master) return;
      const d = duck();
      d !== wasDuck && (wasDuck = d, MU.master.gain.setTargetAtTime(d ? 0 : MU.vol * 0.9, MU.ctx.currentTime, 0.35));
    }, 1200);
    document.addEventListener("visibilitychange", () => {
      if (!MU.ctx) return;
      document.hidden ? MU.ctx.suspend() : MU.mode !== "aus" && MU.ctx.resume();
    });
    // Browser/Android erlauben Ton erst nach der ersten Beruehrung
    const first = () => {
      document.removeEventListener("pointerdown", first, true);
      MU.mode !== "aus" && !MU.tm && startPlay();
    };
    document.addEventListener("pointerdown", first, true);

    // ----- Bedienung -----
    let btn = null, panel = null;
    function btnUpd() {
      btn && (btn.textContent = MU.mode === "aus" ? "\u{1F507}" : "\u{1F3B5}", btn.style.opacity = MU.mode === "aus" ? "0.75" : "1");
    }
    function openPanel() {
      if (panel) return panel.remove(), panel = null;
      panel = document.createElement("div");
      panel.style.cssText = "position:fixed;inset:0;z-index:99;background:#0009;display:flex;align-items:center;justify-content:center;padding:14px";
      const box = document.createElement("div");
      box.style.cssText = "max-height:calc(100vh - 28px);overflow:auto;width:min(420px,100%);background:linear-gradient(#1d2c55,#0d1530);border:2px solid #ffffff40;border-radius:20px;padding:16px;color:#fff;font:700 18px system-ui,sans-serif;box-shadow:0 10px 40px #000a";
      const h = document.createElement("div");
      h.textContent = "\u{1F3B5} Hintergrundmusik", h.style.cssText = "font-size:22px;font-weight:900;margin-bottom:10px;text-align:center", box.append(h);
      const rows = {};
      const mark = () => {
        for (const k in rows) rows[k].style.background = k === MU.mode ? "#2f7d4a" : "#ffffff18", rows[k].style.borderColor = k === MU.mode ? "#6fd68a" : "#ffffff40";
      };
      for (const k of ["hiphop", "gitarre", "rock", "aus"]) {
        const b = document.createElement("button");
        b.textContent = NAMES[k], b.style.cssText = "display:block;width:100%;min-height:50px;margin:6px 0;border-radius:16px;border:2px solid #ffffff40;color:#fff;font:800 19px system-ui,sans-serif;cursor:pointer;text-align:left;padding:10px 16px";
        b.onclick = () => (setMode(k), mark()), rows[k] = b, box.append(b);
      }
      const l = document.createElement("div");
      l.textContent = "Lautstärke", l.style.cssText = "margin:12px 0 4px;font-size:16px";
      const sl = document.createElement("input");
      sl.type = "range", sl.min = 0, sl.max = 100, sl.value = Math.round(MU.vol * 100), sl.style.cssText = "width:100%;height:34px", sl.oninput = () => setVol(sl.value / 100);
      const n = document.createElement("div");
      n.textContent = "In der Abschlussprüfung ist die Musik automatisch aus.", n.style.cssText = "font-size:14px;opacity:.75;margin-top:8px;font-weight:600";
      const x = document.createElement("button");
      x.textContent = "Fertig", x.style.cssText = "display:block;width:100%;min-height:54px;margin-top:12px;border-radius:16px;border:0;background:#ffcf4d;color:#2a1a0c;font:900 20px system-ui,sans-serif;cursor:pointer", x.onclick = () => (panel.remove(), panel = null);
      box.append(l, sl, n, x), panel.append(box), panel.addEventListener("click", (e) => e.target === panel && (panel.remove(), panel = null)), document.body.append(panel), mark();
      // Ton nach Beruehrung sicher starten
      MU.mode !== "aus" && !MU.tm && startPlay();
    }
    function mkBtn() {
      if (btn || !document.body) return;
      btn = document.createElement("button");
      btn.id = "mu-btn", btn.setAttribute("aria-label", "Hintergrundmusik");
      btn.style.cssText = "position:fixed;right:max(10px,env(safe-area-inset-right));top:max(72px,calc(env(safe-area-inset-top) + 62px));z-index:60;width:46px;height:46px;border-radius:50%;border:2px solid #ffffff55;background:#101a38cc;color:#fff;font:22px system-ui;cursor:pointer;padding:0;line-height:1";
      btn.onclick = (e) => (e.stopPropagation(), openPanel()), document.body.append(btn), btnUpd();
    }
    document.body ? mkBtn() : document.addEventListener("DOMContentLoaded", mkBtn);
    window.__musik = { MU, setMode, setVol, open: openPanel, STYLES };
  })();
