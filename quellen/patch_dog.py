# Hund: Kugel-Hund durch den animierten Shiba (Quaternius, CC0) ersetzen.
# Die Animationen sind in Blender vorgebacken (shiba_dog.json, 7 Animationen),
# damit keine Zusatz-Bibliothek noetig ist und alles offline laeuft.
SHIBA = open(D + '/shiba_dog.json', encoding='utf8').read().strip()

def cut(start, end, new, label):
    global s, n_ok
    a = s.find(start)
    if a < 0 or s.count(start) != 1:
        print('FEHLER', label, 'Start gefunden:', s.count(start)); sys.exit(1)
    b = s.find(end, a)
    if b < 0:
        print('FEHLER', label, 'Ende nicht gefunden'); sys.exit(1)
    s = s[:a] + new + s[b + len(end):]
    n_ok += 1

DOG_MODEL = '''      const SHIBA = ''' + SHIBA + ''';
      const b64u8 = (s3) => Uint8Array.from(atob(s3), (c3) => c3.charCodeAt(0));
      const NV = SHIBA.v, idxB = b64u8(SHIBA.idx), colI = b64u8(SHIBA.col);
      const colA = new Float32Array(NV * 3), posA = new Float32Array(NV * 3);
      for (let i3 = 0; i3 < NV; i3++) {
        const c3 = SHIBA.mats[colI[i3]];
        colA[i3 * 3] = c3[0]; colA[i3 * 3 + 1] = c3[1]; colA[i3 * 3 + 2] = c3[2];
      }
      const dgeo = new we();
      dgeo.setIndex(new xe(new Uint16Array(idxB.buffer, idxB.byteOffset, idxB.length / 2), 1));
      const posAttr = new xe(posA, 3);
      dgeo.setAttribute("position", posAttr);
      dgeo.setAttribute("color", new xe(colA, 3));
      const dmesh = new zt(dgeo, new ae({ vertexColors: true, roughness: 0.85, flatShading: true }));
      dmesh.castShadow = true;
      dmesh.frustumCulled = false;
      g2.add(dmesh);
      const ANI = {};
      for (const k3 in SHIBA.a) {
        const a3 = SHIBA.a[k3];
        ANI[k3] = { n: a3.n, fps: a3.fps, loop: a3.loop, min: a3.min, size: a3.size, d: b64u8(a3.d), dur: (a3.loop ? a3.n : a3.n - 1) / a3.fps };
      }
      const AN = { cur: "Idle", t: 0, prev: null, pt: 0, blend: 1, rate: 1 };
      const tmpB = new Float32Array(NV * 3);
      function frameInto(a3, t3, out) {
        let f3 = t3 * a3.fps, i0, i1;
        if (a3.loop) { f3 = ((f3 % a3.n) + a3.n) % a3.n; i0 = Math.floor(f3); i1 = (i0 + 1) % a3.n; }
        else { f3 = Math.min(Math.max(f3, 0), a3.n - 1); i0 = Math.floor(f3); i1 = Math.min(i0 + 1, a3.n - 1); }
        const fr = f3 - i0, d3 = a3.d, o0 = i0 * NV * 3, o1 = i1 * NV * 3, mn = a3.min, sz = a3.size;
        const k0 = sz[0] / 255, k1 = sz[1] / 255, k2 = sz[2] / 255;
        for (let j = 0; j < NV * 3; j += 3) {
          out[j] = mn[0] + (d3[o0 + j] + (d3[o1 + j] - d3[o0 + j]) * fr) * k0;
          out[j + 1] = mn[1] + (d3[o0 + j + 1] + (d3[o1 + j + 1] - d3[o0 + j + 1]) * fr) * k1;
          out[j + 2] = mn[2] + (d3[o0 + j + 2] + (d3[o1 + j + 2] - d3[o0 + j + 2]) * fr) * k2;
        }
      }
      function play(name, restart) {
        if (!ANI[name] || (AN.cur === name && !restart)) return;
        AN.prev = AN.cur; AN.pt = AN.t; AN.cur = name; AN.t = 0; AN.blend = AN.prev === name ? 1 : 0;
      }
      function animate(dt2) {
        AN.t += dt2 * AN.rate;
        AN.pt += dt2;
        AN.blend = Math.min(1, AN.blend + dt2 / 0.2);
        frameInto(ANI[AN.cur], AN.t, posA);
        if (AN.blend < 1 && AN.prev) {
          frameInto(ANI[AN.prev], AN.pt, tmpB);
          const w3 = AN.blend;
          for (let j = 0; j < posA.length; j++) posA[j] = tmpB[j] + (posA[j] - tmpB[j]) * w3;
        }
        posAttr.needsUpdate = true;
      }
      function pickAnim(dt2) {
        if (AN.cur === "Attack" && AN.t < ANI.Attack.dur) return;
        const s3 = D2.sp;
        if (s3 > 3.1 || (AN.cur === "Gallop" && s3 > 2.5)) {
          play("Gallop"); AN.rate = Math.min(2, Math.max(0.9, s3 / 3.45)); D2.idle = 0; return;
        }
        if (s3 > 0.45) {
          play("Walk"); AN.rate = Math.min(2.2, Math.max(0.8, s3 / 1.4)); D2.idle = 0; return;
        }
        AN.rate = 1;
        D2.idle = (D2.idle || 0) + dt2;
        if (!D2.idleWait) D2.idleWait = 3 + Math.random() * 2;
        const VAR = AN.cur === "Eating" || AN.cur === "Idle_2" || AN.cur === "Idle_2_HeadLow";
        if (!VAR && AN.cur !== "Idle") { play("Idle"); D2.idle = 0; }
        else if (!VAR && D2.idle > D2.idleWait) {
          const r3 = Math.random();
          play(r3 < 0.5 ? "Eating" : r3 < 0.8 ? "Idle_2_HeadLow" : "Idle_2");
          D2.idle = 0; D2.idleWait = 0;
        } else if (VAR && D2.idle > ANI[AN.cur].dur * (AN.cur === "Idle_2" ? 1 : 1.5)) { play("Idle"); D2.idle = 0; }
      }
      const vp3 = new Y();
      function inView(C2, m2) {
        vp3.set(C2.x, 1, C2.z).project(s);
        return vp3.z < 1 && Math.abs(vp3.x) < m2 && Math.abs(vp3.y) < m2;
      }
      animate(0);
      g2.scale.setScalar(1.12);
      g2.visible = false;
'''

# 1) Kugel-Modell (Koerper, Beine, Schwanz) -> Shiba-Modell
cut('      const mb = new ae({ color: 11565637, roughness: 0.8 })',
    '      g2.scale.setScalar(1.1);\n      g2.visible = false;\n',
    DOG_MODEL, 'Hund-Modell')

# 2) Zustand: Sterbe-Zeit und Stehzeit
rep('state: "follow", t: 0, active: false, on: true, down: 0, bait: 0, biteT: 0, ph: 0, sp: 0, inited: false };',
    'state: "follow", t: 0, active: false, on: true, down: 0, bait: 0, biteT: 0, ph: 0, sp: 0, inited: false, dying: 0, idle: 0 };',
    'Hund-Zustand')

# 3) Erschoepft: erst umfallen (Death), dann verschwinden
rep('''            D2.down = 25;
            D2.active = false;
            g2.visible = false;
            bar.show(false);''',
    '''            D2.down = 25;
            D2.active = false;
            D2.dying = ANI.Death.dur + 0.5;
            AN.rate = 1;
            play("Death");
            bar.show(false);''', 'Hund-Umfallen')

# 4) Beim Losschicken / Wiederkommen sauber mit Stehen anfangen
rep('''          D2.state = "hunt";
          D2.t = 18;
          D2.bait = 6;
          D2.active = true;
          g2.visible = true;''',
    '''          D2.state = "hunt";
          D2.t = 18;
          D2.bait = 6;
          D2.active = true;
          D2.dying = 0;
          play("Idle", true);
          g2.visible = true;''', 'Hund-Losschicken')
rep('''          if (D2.down > 0) {
            D2.down -= dt2;
            if (D2.down <= 0) {''',
    '''          if (D2.down > 0) {
            D2.down -= dt2;
            if (D2.dying > 0) {
              D2.dying -= dt2;
              animate(dt2);
              if (D2.dying <= 0) g2.visible = false;
            }
            if (D2.down <= 0) {
              D2.dying = 0;
              play("Idle", true);''', 'Hund-Wiederkommen')

# 5) Beissen = Attack-Animation
rep('''                D2.biteT = 0.9;
                FX.pop(best.x, 1, best.z, 16764714, 1.4, 0.25);''',
    '''                D2.biteT = 0.9;
                play("Attack", true);
                AN.rate = 1.35;
                FX.pop(best.x, 1, best.z, 16764714, 1.4, 0.25);''', 'Hund-Beissen')

# 6) Folgen: Tempo passt sich dem Abstand an (langsam gehen, schnell rennen)
rep('else if (d2 > 2.2) spd = mv(tx2, tz, d2 > 12 ? 10 : 5.5, dt2);',
    'else if (d2 > 2.2) spd = mv(tx2, tz, d2 > 12 ? 10 : Math.min(7.5, 1.6 + (d2 - 2.2) * 1.8), dt2);',
    'Hund-Folgetempo')

# 7) Bein-/Schwanz-Wackeln -> echte Animationen
cut('          D2.ph += dt2 * (3 + D2.sp * 1.4);\n',
    '          g2.position.y = Math.abs(Math.sin(D2.ph)) * 0.05 * Math.min(1, D2.sp / 3);\n',
    '''          g2.position.set(D2.x, 0, D2.z);
          g2.rotation.y = D2.yaw;
          pickAnim(dt2);
          animate(dt2);
''', 'Hund-Animation')

# 8) Angriff nur auf Gegner im Sichtfeld (auf dem Bildschirm sichtbar), nicht auf der ganzen Karte
rep("""          let best = null, bd2 = 40;
          for (const C2 of h.list) {
            if (C2.T.fly || !C2.g.visible) continue;
            const d2 = Math.hypot(C2.x - l.x, C2.z - l.z);""",
    """          let best = null, bd2 = 40;
          for (const C2 of h.list) {
            if (C2.T.fly || !C2.g.visible || !inView(C2, 0.95)) continue;
            const d2 = Math.hypot(C2.x - l.x, C2.z - l.z);""", 'Hund-Sichtfeld-Start')
rep("""          let px2, pz;
          if (best) {""",
    """          if (!best) {
            say("\\u{1F415} Kein Gegner im Sichtfeld");
            return;
          }
          let px2, pz;
          if (best) {""", 'Hund-Kein-Gegner')
rep("""            let best = null, bd2 = 35;
            for (const C2 of h.list) {
              if (C2.T.fly || !C2.g.visible) continue;
              const d2 = Math.hypot(C2.x - D2.x, C2.z - D2.z);""",
    """            let best = null, bd2 = 35;
            for (const C2 of h.list) {
              if (C2.T.fly || !C2.g.visible || !inView(C2, 1.12)) continue;
              const d2 = Math.hypot(C2.x - D2.x, C2.z - D2.z);""", 'Hund-Sichtfeld-Jagd')
