# Monster: Imp und Puglin (Quaternius "Bestiary - Dungeon Monsters Kit", CC0) ersetzen alle alten Monster.
# Animationen (Stehen, Laufen, Angriff) sind in Blender vorgebacken (monsters.json) und werden als
# Vollbild-Geometrien getauscht - keine Skelett-Berechnung auf dem Handy noetig.
MONJ = open(D + '/monsters.json', encoding='utf8').read().strip()

rep('  function Qu(i, t, e, n, s = true) {\n    Qx();',
    '  const MONJ = ' + MONJ + ';\n  function Qu(i, t, e, n, s = true) {\n    Qx();', 'Monster-Daten')

SETUP = '''let a = me(13013), l = null, c = null, u = null;
    const MON = { cl: {}, mat: {} };
    {
      const b64 = (s3) => Uint8Array.from(atob(s3), (c3) => c3.charCodeAt(0));
      const loadTex = (b, w) => {
        const cv = ji(w, w), tx = Qi(cv, { repeat: false, aniso: 4 }), im = new Image();
        im.onload = () => {
          cv.getContext("2d").drawImage(im, 0, 0, w, w);
          tx.needsUpdate = true;
        };
        im.src = "data:image/jpeg;base64," + b;
        return tx;
      };
      for (const nm of ["Imp", "Puglin"]) {
        const D0 = MONJ[nm], md = D0.model;
        const ib = b64(md.i), ub = b64(md.uv);
        const idx = new Uint16Array(ib.buffer, ib.byteOffset, ib.length / 2), uvq = new Int16Array(ub.buffer, ub.byteOffset, ub.length / 2);
        const uvf = new Float32Array(uvq.length);
        for (let q = 0; q < uvq.length; q++) uvf[q] = uvq[q] / 4096;
        const idxA = new xe(idx, 1), uvA = new xe(uvf, 2), cl = {};
        for (const cn in md.clips) {
          cl[cn] = md.clips[cn].f.map((fb) => {
            const bb = b64(fb), pq = new Int16Array(bb.buffer, bb.byteOffset, bb.length / 2), pf = new Float32Array(pq.length);
            for (let q = 0; q < pq.length; q++) pf[q] = pq[q] / 20000;
            const g3 = new we();
            g3.setIndex(idxA);
            g3.setAttribute("position", new xe(pf, 3));
            g3.setAttribute("uv", uvA);
            g3.computeVertexNormals();
            g3.computeBoundingSphere();
            return g3;
          });
        }
        MON.cl[nm] = cl;
        const em = loadTex(D0.em, 256);
        for (const ci of [1, 2, 3]) MON.mat[nm + ci] = new ae({ map: loadTex(D0["c" + ci], 512), emissiveMap: em, emissive: new Xt(1, 0.45, 0.12), emissiveIntensity: 1.6, color: new Xt(1.25, 1.25, 1.25), roughness: 0.85, metalness: 0 });
      }
    }
    const EIN = (mon, ci, sc, spd, sense, reach, dmg) => ({ mon, mat: mon + ci, scale: sc, reach, sense, speed: spd, wander: 1.5, dmg, hp: 1 });
    for (const k of Object.keys(Ei)) delete Ei[k];
    Ei.imp1 = EIN("Imp", 1, 3.8, 5, 34, 3.4, 14);
    Ei.imp2 = EIN("Imp", 2, 3.9, 4.4, 36, 3.5, 16);
    Ei.imp3 = EIN("Imp", 3, 3.7, 5.6, 32, 3.3, 12);
    Ei.pug1 = EIN("Puglin", 1, 3.6, 3.8, 28, 3.8, 16);
    Ei.pug2 = EIN("Puglin", 2, 3.7, 3.4, 30, 3.9, 18);
    Ei.pug3 = EIN("Puglin", 3, 3.5, 4.2, 26, 3.7, 14);
'''
a0 = s.find('    let a = me(13013), o = (U, M = 1.7) =>')
b0 = s.find('    let h = [], f = i.walk,', a0)
if a0 < 0 or b0 < 0: print('FEHLER Monster-Setup'); sys.exit(1)
s = s[:a0] + '    ' + SETUP + s[b0:]; n_ok += 1

NEWP = '''function p(U) {
      let M = Ei[U], q = new pe(), ht = new zt(MON.cl[M.mon].idle[0], MON.mat[M.mat]);
      ht.castShadow = true, q.add(ht);
      let H = new pe(), $ = new pe(), et = new pe();
      q.add(H, $, et);
      let pt = M.scale * (0.9 + a() * 0.2);
      q.scale.setScalar(pt), r.add(q);
      let V = { type: U, T: M, g: q, bm: ht, gm: H, pa: $, pb: et, x: 0, z: 0, y: 0, yaw: a() * 6.28, yawT: 0, phase: a() * 6, cd: 0, wanderT: 0, wx: 0, wz: 0, state: "wander", sc: pt, hurt: 0, spd: 0, seed: a() * 100, wt: a() };
      return x(V), h.push(V), V;
    }
'''
a1 = s.find('    function p(U) {\n      let M = Ei[U], S = u[U]')
b1 = s.find('return x(V), h.push(V), V;\n    }\n', a1)
if a1 < 0 or b1 < 0: print('FEHLER Monster-p'); sys.exit(1)
s = s[:a1] + '    ' + NEWP + s[b1 + len('return x(V), h.push(V), V;\n    }\n'):]; n_ok += 1

rep('let v = { spider: 14, blob: 9, stilt: 5, eye: 9, bat: 10 };', 'let v = { imp1: 9, imp2: 8, imp3: 8, pug1: 8, pug2: 7, pug3: 7 };', 'Monster-Anzahl')
rep('const mix = { spider: 14, blob: 9, stilt: 5, eye: 9, bat: 10 }, sum = 47;', 'const mix = { imp1: 9, imp2: 8, imp3: 8, pug1: 8, pug2: 7, pug3: 7 }, sum = 47;', 'Monster-Mix')

ANIM_OLD_A = '} else if (C.type === "spider") C.pa.rotation.y = X * 0.24'
a2 = s.find(ANIM_OLD_A)
END = 'C.bm.rotation.z = Math.sin(M * 7 + C.seed) * 0.04);\n'
b2 = s.find(END, a2)
if a2 < 0 or b2 < 0: print('FEHLER Monster-Anim'); sys.exit(1)
ANIM = '''} else {
          const cl2 = MON.cl[gt.mon];
          let cn2, fi2;
          if (C.wind > 0 || C.lunge > 0) {
            const pr = C.wind > 0 ? (0.6 - C.wind) / 0.6 * 0.55 : 0.55 + Math.min(1, (0.35 - C.lunge) / 0.35) * 0.45;
            cn2 = "atk", fi2 = Math.max(0, Math.min(7, Math.round(pr * 7)));
          } else if (ot > 0.2) {
            C.wt += U * ot * 0.2, cn2 = "walk", fi2 = Math.floor((C.wt % 1) * 8) % 8;
          } else cn2 = "idle", fi2 = Math.floor(((M * 0.7 + C.seed) % 1) * 4) % 4;
          const g4 = cl2[cn2][fi2];
          C.bm.geometry !== g4 && (C.bm.geometry = g4);
          ct = 0;
        }
'''
s = s[:a2] + ANIM + s[b2 + len(END):]; n_ok += 1
