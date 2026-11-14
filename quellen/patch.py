#!/usr/bin/env python3
# Baut aus Testversion 11 (base.js) + Mehrspieler die fertige Datei.
import sys, subprocess, os
D = os.path.dirname(os.path.abspath(__file__))
s = open(D + '/base.js', encoding='utf8').read()
n_ok = 0

def rep(old, new, label, count=1):
    global s, n_ok
    c = s.count(old)
    if c != count:
        print('FEHLER', label, 'gefunden:', c, 'erwartet:', count)
        sys.exit(1)
    s = s.replace(old, new)
    n_ok += 1

# ---------------- Spieler (Wu) ----------------
rep('  function Wu(i, t) {\n    let e = new ae({ vertexColors: true, roughness: 0.8 }), n = new pe();',
    '  function Wu(i, t, opts = {}) {\n    const JK = opts.jacket || [0.22, 0.3, 0.2];\n    let e = new ae({ vertexColors: true, roughness: 0.8 }), n = new pe();', 'Wu-Kopf')
rep('R.box(0, 1.28, 0, 0.62, 0.72, 0.34, 0, [0.22, 0.3, 0.2])', 'R.box(0, 1.28, 0, 0.62, 0.72, 0.34, 0, JK)', 'Wu-Jacke')
rep('w.box(0, -0.3, 0, 0.17, 0.62, 0.19, 0, [0.22, 0.3, 0.2])', 'w.box(0, -0.3, 0, 0.17, 0.62, 0.19, 0, JK)', 'Wu-Arm')
rep('    let g = new cn(16773328, 9, 14, 1.8);\n    g.position.set(0, 2.4, 0.5), n.add(g);',
    '    let g = opts.remote ? null : new cn(16773328, 9, 14, 1.8);\n    g && (g.position.set(0, 2.4, 0.5), n.add(g));', 'Wu-Fackel')
rep('m.renderOrder = 20, t.add(m);', 'm.renderOrder = 20, opts.remote || t.add(m);', 'Wu-Ring')
rep('color: 6750054, transparent: true, opacity: 0.95, depthTest: false', 'color: opts.arrowColor || 6750054, transparent: true, opacity: 0.95, depthTest: false', 'Wu-Pfeil')
rep('      } else x.speed *= 0.8;\n      let J = Math.sin(x.phase) * Math.min(1, x.speed / 3) * 0.7;',
    '      } else x.speed *= 0.8;\n      x.animate(R, U);\n    }, x.animate = (R, U) => {\n      let J = Math.sin(x.phase) * Math.min(1, x.speed / 3) * 0.7;', 'Wu-animate')
rep('    }, x.root = n, x;',
    '    }, x.pose = (px, pz, pyaw, psp, pdt, pcd) => {\n      x.x = px, x.z = pz, x.yaw = pyaw, x.speed = psp, x.phase += psp * pdt * 2.3, x.animate(pdt, pcd);\n    }, x.dispose = () => {\n      t.remove(n), t.remove(h), t.remove(m), t.remove(p);\n    }, x.root = n, x;', 'Wu-Ende')

# ---------------- Tunnel (Ku) ----------------
rep('  function Ku(i, t) {', '  function Ku(i, t, opts = {}) {', 'Ku-Kopf')
rep('d = { uTime: { value: 0 } }, g = `', 'd = { uTime: { value: 0 }, uTint: { value: new Y(1, 1, 1) }, uAmt: { value: 0 } }, g = `', 'Ku-uniforms')
rep('      varying vec2 vUv; varying vec3 vN; varying vec3 vV; uniform float uTime;\n',
    '      varying vec2 vUv; varying vec3 vN; varying vec3 vV; uniform float uTime; uniform vec3 uTint; uniform float uAmt;\n', 'Ku-shader1')
rep('        gl_FragColor=vec4(col,a2);', '        col=mix(col,vec3(dot(col,vec3(0.333))*1.6)*uTint,uAmt);\n        gl_FragColor=vec4(col,a2);', 'Ku-farbe1')
rep('      varying vec2 vUv; uniform float uTime;\n      void main(){\n        float x=vUv.y;',
    '      varying vec2 vUv; uniform float uTime; uniform vec3 uTint; uniform float uAmt;\n      void main(){\n        float x=vUv.y;', 'Ku-shader2')
rep('        gl_FragColor=vec4(col,alpha);', '        col=mix(col,col*uTint*1.5,uAmt*0.7);\n        gl_FragColor=vec4(col,alpha);', 'Ku-farbe2')
rep('      varying vec2 vUv; uniform float uTime; uniform float uCore;', '      varying vec2 vUv; uniform float uTime; uniform float uCore; uniform vec3 uTint; uniform float uAmt;', 'Ku-shader3')
rep('        gl_FragColor=vec4(col,clamp(a,0.0,1.0));', '        col=mix(col,vec3(dot(col,vec3(0.333))*1.6)*uTint,uAmt);\n        gl_FragColor=vec4(col,clamp(a,0.0,1.0));', 'Ku-farbe3')
rep('    for (let dt = 0; dt < 5; dt++) {\n      let ot = new cn(', '    for (let dt = 0; dt < (opts.simple ? 0 : 5); dt++) {\n      let ot = new cn(', 'Ku-Lichter')
rep('At = xt(520, 0.34), rt = xt(260, 0.3),', 'At = opts.simple ? null : xt(520, 0.34), rt = opts.simple ? null : xt(260, 0.3),', 'Ku-Funken')
rep('      d.uTime.value = dt;\n      let W = O < 420;', '      d.uTime.value = dt;\n      if (opts.simple) return;\n      let W = O < 420;', 'Ku-update')
rep('    }, n.root = e, n.gate = $, n.shellMat = _, n;', '    }, n.setTint = (rgb, amt) => {\n      d.uTint.value.set(rgb[0], rgb[1], rgb[2]), d.uAmt.value = amt;\n    }, n.root = e, n.gate = $, n.shellMat = _, n;', 'Ku-Ende')

# ---------------- Monster (Qu) ----------------
rep('let u = Ku(o, n), h = Qu(o, n, u, Be,', 'let u = Ku(o, n), TA = $makeTA(u), h = Qu(o, n, TA, Be,', 'Qu-Aufruf')
rep('''    E.pick = (C, S, H) => {
      const D = E.dog;
      if (D && D.active) {
        const dd2 = Math.hypot(D.x - C.x, D.z - C.z), pd2 = Math.hypot(S.x - C.x, S.z - C.z);
        if (dd2 < C.T.sense && (H || D.bait > 0 || dd2 < pd2)) return D;
      }
      return S;
    };''', '''    E.remotes = [];
    E.puppet = false;
    E.pick = (C, S, H) => {
      let TG = S, td = Math.hypot(S.x - C.x, S.z - C.z) + (H ? 1e5 : 0);
      for (const RM of E.remotes) {
        const dr = Math.hypot(RM.x - C.x, RM.z - C.z) + (RM.safe ? 1e5 : 0);
        if (dr < td) { TG = RM; td = dr; }
      }
      const D = E.dog;
      if (D && D.active) {
        const dd2 = Math.hypot(D.x - C.x, D.z - C.z);
        if (dd2 < C.T.sense && (td >= 1e5 || D.bait > 0 || dd2 < td)) return D;
      }
      return TG;
    };''', 'Qu-pick')
rep('PH = PT === S ? H : false,', 'PH = PT === S ? H : PT.remote ? PT.safe : false,', 'Qu-PH')
rep('wt = !PH && !E.peace && rt < gt.sense', 'wt = !PH && !E.peace && !E.puppet && rt < gt.sense', 'Qu-wt')
rep('(PT === S ? $ && $(gt.dmg, C) : E.dogHit && E.dogHit(gt.dmg, C))', '(PT === S ? $ && $(gt.dmg, C) : PT.remote ? E.onRemoteHit && E.onRemoteHit(PT.id, gt.dmg) : E.dogHit && E.dogHit(gt.dmg, C))', 'Qu-Treffer')
rep('C.idle = a() < 0.3', 'C.idle = E.puppet ? true : a() < 0.3', 'Qu-idle')
rep('!C.idle && tt > 1 ?', '!C.idle && !E.puppet && tt > 1 ?', 'Qu-wandern')
rep('C.spd = ot, C.phase += U * (2 + ot * (gt.hop ? 2.6 : 1.9));', 'E.puppet && E.puppetStep && (ot = E.puppetStep(C, U)), C.spd = ot, C.phase += U * (2 + ot * (gt.hop ? 2.6 : 1.9));', 'Qu-puppet')

# ---------------- Kampf ----------------
rep('        hit(C2, dmg, who) {\n          ensure(C2);\n', '        hit(C2, dmg, who) {\n          ensure(C2);\n          if (h.puppet && h.mpHit) {\n            h.mpHit(C2, dmg), FX.pop(C2.x, 1.2, C2.z, 16772224, 1.4, 0.25);\n            return;\n          }\n', 'ATK-hit')
rep('f.safe || f.dead > 0 || f.peace || (f.hp -= k', 'f.safe || f.dead > 0 || f.peace || window.__mpOpen || (f.hp -= k', 'Treffer-Sperre')

exec(open(D + '/patch_world.py', encoding='utf8').read())
exec(open(D + '/patch_distract.py', encoding='utf8').read())
exec(open(D + '/patch_house.py', encoding='utf8').read())
exec(open(D + '/patch_cart.py', encoding='utf8').read())
exec(open(D + '/patch_update.py', encoding='utf8').read())
exec(open(D + '/patch_dog.py', encoding='utf8').read())
# ---------------- Stationen / Schleife / Einbau ----------------
rep('    function It(k) {\n      Pt = k,', '    function It(k) {\n      Pt = k, window.__selSt = k,', 'Station-merken')
rep('h.update(Q, _t, l, V.tx, V.tz, V.dist, f.safe, E)', 'MP.update(Q, _t, V.dist), h.update(Q, _t, l, V.tx, V.tz, V.dist, f.safe, E)', 'Schleife')
anchor = '    let R = 700, w = new Float32Array(R * 3), T = new Float32Array(R * 3), U = me(5);'
rep(anchor, open(D + '/adapter.js', encoding='utf8').read() + anchor, 'Einbau')
rep('  async function x_() {', open(D + '/pre.js', encoding='utf8').read() + '  async function x_() {', 'Hilfsfunktion')

# ---------------- Wettbewerb in der Prüfung (gf) ----------------
rep('  function gf(i) {\n    Xs();', '  function gf(i, CP) {\n    Xs();', 'gf-Kopf')
rep('n = rl(t.filter(e)).concat(rl(t.filter((l) => !e(l)))).slice(0, je.examCount)', 'n = CP ? CP.ids.map((id) => sl.get(id)).filter(Boolean) : rl(t.filter(e)).concat(rl(t.filter((l) => !e(l)))).slice(0, je.examCount)', 'gf-Fragen')
rep('        f = true, Xs();\n        let S = M === l.a;', '        f = true, Xs(), CP && (CP.tt += je.examSeconds - Math.max(0, g), CP.n = (CP.n || 0) + 1, M === l.a && (CP.pts = (CP.pts || 0) + 100 + Math.round(40 * Math.max(0, g) / je.examSeconds)));\n        let S = M === l.a;', 'gf-Zeit')
rep('confirm("Pr\\xFCfung abbrechen?") && Ar(i);', 'confirm(CP ? "Wettbewerb aufgeben?" : "Pr\\xFCfung abbrechen?") && (CP ? CP.cancel() : Ar(i));', 'gf-Abbruch')
rep('    }, o = () => {\n      if (Xs(), r > ye.ex', '    }, o = () => {\n      if (CP) {\n        Xs(), CP.finish(r, CP.tt);\n        return;\n      }\n      if (Xs(), r > ye.ex', 'gf-Ende')

open(D + '/game_mp.js', 'w', encoding='utf8').write(s)

# ---------------- HTML zusammensetzen ----------------
head = open(D + '/part_head.html', encoding='utf8').read()
tail = open(D + '/part_tail.html', encoding='utf8').read()
assert head.count('<head>\n') == 1
head = head.replace('<head>\n', '<head>\n' + UPD_HEAD)
a = '<button class="btn" id="btn-set" title="Einstellungen" style="font-size:20px">⚙</button>'
assert head.count(a) == 1, 'HTML btn-set'
head = head.replace(a, a + '\n    <button class="btn" id="btn-mp" title="Zusammen spielen">👥</button>')
b = '<button class="btn" id="card-quiz" style="display:none">📚 Aufgaben</button>'
assert head.count(b) == 1, 'HTML card-quiz'
head = head.replace(b, b + '<button class="btn go" id="card-comp" style="display:none">🏆 Wettbewerb</button>')
net = open(D + '/net.js', encoding='utf8').read()
mini = len(sys.argv) > 1 and sys.argv[1] == 'min'
game = s
if mini:
    subprocess.run(['/home/claude/gemen3d/node_modules/.bin/esbuild', D + '/game_mp.js', '--minify', '--outfile=' + D + '/game_mp.min.js', '--log-level=error'], check=True)
    game = open(D + '/game_mp.min.js', encoding='utf8').read()
# Schutz fuer den Update-Knopf: wird diese Datei als Update in eine laufende alte Version
# geschrieben, darf der Rest der alten Datei nicht mehr starten (sonst laeuft das Spiel doppelt)
UPD_GUARD = '<script>if(window.__upd&&document.readyState==="loading"){document.write(\'<plaintext style="display:none">\');}</script>\n'
out = head + '<script>' + net + '</script>\n<script>' + game + '\n</script>\n' + UPD_GUARD + tail
open(D + '/index.html', 'w', encoding='utf8').write(out)
print('OK', n_ok, 'Patches,', len(out), 'Bytes')
