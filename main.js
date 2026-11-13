import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { buildWorld, STATIONS } from './world.js';
import { addTrees, addLamps, addCars, addStations, addRuinPools } from './props.js';
import { buildHome, HOME_C } from './home.js';
import { buildPlayer } from './player.js';
import { addGraffiti } from './graffiti.js';
import { buildHeaven } from './heaven.js';
import { buildTrail } from './trail.js';
import { buildCreatures } from './creatures.js';
import { applyLook } from './look.js';
import { mulberry32, clamp, lerp } from './util.js';
import { initLernen } from './lernen.js';

const DATA = window.GEMEN_DATA;
const $ = (id) => document.getElementById(id);
const nextFrame = () => new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)));
const mobile = /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent) || Math.min(screen.width, screen.height) < 700;
const params = new URLSearchParams(location.search);
const Q = {
  shadows: params.get('shadows') !== '0',
  shadowRes: mobile ? 1024 : 2048,
  bloom: params.get('bloom') !== '0',
  treeDensity: mobile ? 0.65 : 1,
  maxPR: mobile ? 1.75 : 2.0,
};
let log = (m) => { const e = $('loadmsg'); if (e) e.textContent = m; };

let scene0;
async function main() {
  const canvas = $('view');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: params.get('pdb') === '1' });
  let pr = Math.min(window.devicePixelRatio || 1, Q.maxPR);
  renderer.setPixelRatio(pr);
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.45;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = Q.shadows; renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.info.autoReset = false;
  const scene = new THREE.Scene();
  {
    const envScene = new THREE.Scene();
    const sg = new THREE.SphereGeometry(50, 48, 24); const cols = []; const pp = sg.attributes.position;
    for (let i = 0; i < pp.count; i++) { const y = pp.getY(i) / 50; let c; if (y > 0) c = [0.05 + 0.08 * (1 - y), 0.08 + 0.12 * (1 - y), 0.16 + 0.22 * (1 - y)]; else c = [0.02, 0.03, 0.05]; cols.push(...c); }
    sg.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    envScene.add(new THREE.Mesh(sg, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
    const rr = mulberry32(3);
    for (let i = 0; i < 14; i++) { const a = rr() * 6.28, e = 0.05 + rr() * 0.35; const s = new THREE.Mesh(new THREE.SphereGeometry(1.6 + rr() * 2, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(rr() < 0.5 ? 0xff3a6a : (rr() < 0.5 ? 0x22e0ff : 0xb0ff30)).multiplyScalar(6) })); s.position.set(Math.cos(a) * Math.cos(e) * 44, Math.sin(e) * 44, Math.sin(a) * Math.cos(e) * 44); envScene.add(s); }
    const moonS = new THREE.Mesh(new THREE.SphereGeometry(4, 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff5a8a).multiplyScalar(5) })); moonS.position.set(-26, 36, -18); envScene.add(moonS);
    const pm = new THREE.PMREMGenerator(renderer); scene0 = pm.fromScene(envScene, 0.03).texture; pm.dispose();
  }
  scene.environment = scene0;
  scene.background = new THREE.Color(0x0b1220);
  scene.fog = new THREE.FogExp2(0x16212f, 0.004);
  const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.4, 5000);

  // lights
  const hemi = new THREE.HemisphereLight(0x7f95c0, 0x2b2118, 1.7); scene.add(hemi);
  const moon = new THREE.DirectionalLight(0xb9ccff, 1.5); moon.position.set(-60, 90, -40); scene.add(moon); scene.add(moon.target);
  if (Q.shadows) {
    moon.castShadow = true; moon.shadow.mapSize.set(Q.shadowRes, Q.shadowRes); moon.shadow.bias = -0.0004; moon.shadow.normalBias = 0.05;
    const sc = moon.shadow.camera; sc.near = 1; sc.far = 400; sc.left = -80; sc.right = 80; sc.top = 80; sc.bottom = -80;
  }

  log('Karte wird gebaut …'); await nextFrame();
  const world = await buildWorld(DATA, scene, Q);
  log('Bäume, Laternen, Autos …'); await nextFrame();
  addTrees(world, DATA, Q); addLamps(world, DATA); addCars(world, DATA, Q); addRuinPools(world); addGraffiti(world);
  log('Stationen …'); await nextFrame();
  addStations(world, Q);
  const home = buildHome(world, Q);
  log('Himmel …'); await nextFrame();
  buildHeaven(world, scene, Q);
  applyLook(world, scene, DATA, Q);

  // rasterise home blockers into walk grid
  {
    const w = world.walk;
    for (const b of world.homeBlockers) {
      if (b.type === 'rect') {
        const c = Math.cos(b.rot), s = Math.sin(b.rot);
        const rad = Math.hypot(b.w, b.d) / 2 + 1;
        for (let gz = Math.floor(b.cz - rad - w.g0z); gz <= Math.ceil(b.cz + rad - w.g0z); gz++) for (let gx = Math.floor(b.cx - rad - w.g0x); gx <= Math.ceil(b.cx + rad - w.g0x); gx++) {
          if (gx < 0 || gz < 0 || gx >= w.GW || gz >= w.GH) continue;
          const x = w.g0x + gx + 0.5 - b.cx, z = w.g0z + gz + 0.5 - b.cz;
          const u = x * c - z * s, v = x * s + z * c; // inverse of rot used in home (u*c+v*s ...)
          const uu = x * Math.cos(b.rot) - z * Math.sin(b.rot), vv = x * Math.sin(b.rot) + z * Math.cos(b.rot);
          // rotation used for objects: x' = u*c + v*s ; z' = -u*s + v*c  => u = x*c - z*s ; v = x*s + z*c
          if (Math.abs(uu) < b.w / 2 + 0.5 && Math.abs(vv) < b.d / 2 + 0.5) w.blocked[gz * w.GW + gx] = 1;
        }
      } else if (b.type === 'ring') {
        for (let gz = 0; gz < w.GH; gz++) {
          const z = w.g0z + gz + 0.5; if (Math.abs(z - b.cz) > b.r + 2) continue;
          for (let gx = 0; gx < w.GW; gx++) {
            const x = w.g0x + gx + 0.5; if (Math.abs(x - b.cx) > b.r + 2) continue;
            const d = Math.hypot(x - b.cx, z - b.cz); if (Math.abs(d - b.r) > b.w / 2 + 0.3) continue;
            const a = Math.atan2(z - b.cz, x - b.cx); let da = Math.abs(Math.atan2(Math.sin(a - b.gateAng), Math.cos(a - b.gateAng)));
            if (da * b.r < b.gateW / 2) continue;
            w.blocked[gz * w.GW + gx] = 1;
          }
        }
      }
    }
    // clear path from gate inwards
    for (let gz = 0; gz < w.GH; gz++) for (let gx = 0; gx < w.GW; gx++) {
      const x = w.g0x + gx + 0.5, z = w.g0z + gz + 0.5; if (Math.hypot(x - HOME_C.x, z - HOME_C.z) > HOME_C.fenceR + 3) continue;
    }
  }
  { const n0 = world.walk.nearest(2.6, 9.0) || [2.6, 9]; world.walk.reach = null; const cnt = world.walk.computeReach(n0[0], n0[1]); console.log('reachable cells', cnt); }
  // stations snapping after blockers
  for (const s of world.stations) { const n = world.walk.nearest(s.x, s.z); if (n) { s.wx = n[0]; s.wz = n[1]; } }

  const player = buildPlayer(world, scene);
  { const n = world.walk.nearest(player.x, player.z); if (n) { player.x = n[0]; player.z = n[1]; player.wx = n[0] - 1; player.wz = n[1] - 1; } }

  // ---------------- Spur-Tunnel + Monster ----------------
  log('Tunnel & Monster …'); await nextFrame();
  const trail = buildTrail(world, scene);
  const creatures = buildCreatures(world, scene, trail, Q, params.get('monsters') !== '0');
  const game = { hp: 100, hurt: 0, dead: 0, safe: true, monsters: params.get('monsters') !== '0' };
  const hpFill = $('hp-fill'), hpTxt = $('hp-txt'), zoneEl = $('zone'), fxHurt = $('fx-hurt'), fxSafe = $('fx-safe'), deadEl = $('dead');
  function die() {
    game.dead = 2.2; deadEl.classList.add('show');
    player.stop(); const sp = world.walk.nearest(2.6, 9.0) || [2.6, 9.0]; player.x = sp[0]; player.z = sp[1]; player.wx = sp[0] - 1; player.wz = sp[1] - 1;
    cam.follow = true; game.hp = 100; creatures.scatterNear(sp[0], sp[1], 70);
  }
  function onHit(dmg) { if (game.safe || game.dead > 0 || game.quiz) return; game.hp -= dmg; game.hurt = 1; if (game.hp <= 0) die(); }
  $('btn-mon').addEventListener('click', () => { game.monsters = !game.monsters; creatures.setEnabled(game.monsters); $('btn-mon').textContent = game.monsters ? '☠ AN' : '☠ AUS'; $('btn-mon').classList.toggle('on', game.monsters); });
  $('btn-mon').textContent = game.monsters ? '☠ AN' : '☠ AUS'; $('btn-mon').classList.toggle('on', game.monsters);

  // dust / embers
  const dustN = 700; const dpos = new Float32Array(dustN * 3), dcol = new Float32Array(dustN * 3), dR = mulberry32(5);
  for (let i = 0; i < dustN; i++) { dpos[i * 3] = (dR() - 0.5) * 90; dpos[i * 3 + 1] = dR() * 30; dpos[i * 3 + 2] = (dR() - 0.5) * 90; const g = dR() < 0.5; dcol[i * 3] = g ? 1 : 0.7; dcol[i * 3 + 1] = g ? 0.2 : 0.3; dcol[i * 3 + 2] = g ? 0.5 : 1; }
  const dgeo = new THREE.BufferGeometry(); dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3)); dgeo.setAttribute('color', new THREE.BufferAttribute(dcol, 3));
  const dust = new THREE.Points(dgeo, new THREE.PointsMaterial({ size: 0.28, vertexColors: true, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }));
  scene.add(dust);
  // fires (ruins + home) as flickering glow billboards
  const fireTex = new THREE.CanvasTexture((() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,220,140,1)'); g.addColorStop(0.25, 'rgba(255,140,40,.7)'); g.addColorStop(1, 'rgba(255,80,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return c; })());
  const fireSprites = [];
  const fireSrc = world.fires.slice(); for (const r of world.ruins) fireSrc.push([r[0], 1.2, r[1]]);
  for (const f of fireSrc) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: fireTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.9 })); sp.position.set(f[0], f[1], f[2]); const sc = 2.2 + Math.random() * 1.4; sp.scale.set(sc, sc, 1); sp.userData.base = sc; scene.add(sp); fireSprites.push(sp); }

  // postprocessing
  const size = renderer.getSize(new THREE.Vector2());
  const rt = new THREE.WebGLRenderTarget(size.x * pr, size.y * pr, { type: THREE.HalfFloatType, samples: mobile ? 0 : 4 });
  const composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x * pr * 0.5, size.y * pr * 0.5), Q.bloom ? 0.38 : 0, 0.6, 0.92);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  composer.setPixelRatio(pr); composer.setSize(size.x, size.y);

  // ---------------- camera rig ----------------
  const cam = { tx: 0, tz: 6, yaw: 0.62, pitch: 0.86, dist: 34, follow: true };
  const goal = { tx: 0, tz: 6, yaw: 0.62, pitch: 0.86, dist: 34 };
  const PRESETS = {
    nah: { dist: 30, pitch: 0.86 }, mittel: { dist: 110, pitch: 0.95 }, weit: { dist: 380, pitch: 1.04 }, karte: { dist: 760, pitch: 1.1 },
  };
  const bounds = world.bounds; const mapCx = (bounds.x0 + bounds.x1) / 2, mapCz = (bounds.z0 + bounds.z1) / 2;
  function setPreset(k) {
    const p = PRESETS[k]; goal.dist = p.dist; goal.pitch = p.pitch;
    if (k === 'karte') { goal.tx = mapCx; goal.tz = mapCz; cam.follow = false; goal.yaw = 0; }
    else { cam.follow = true; }
    setActive(k);
  }
  function setActive(k) { document.querySelectorAll('[data-preset]').forEach(b => b.classList.toggle('on', b.dataset.preset === k)); }
  document.querySelectorAll('[data-preset]').forEach(b => b.addEventListener('click', () => setPreset(b.dataset.preset)));
  $('btn-follow').addEventListener('click', () => { cam.follow = true; });
  $('btn-rotl').addEventListener('click', () => { goal.yaw += 0.5; });
  $('btn-rotr').addEventListener('click', () => { goal.yaw -= 0.5; });
  $('btn-north').addEventListener('click', () => { goal.yaw = 0; });
  $('btn-zin').addEventListener('click', () => { goal.dist = clamp(goal.dist * 0.7, 12, 1100); setActive(''); });
  $('btn-zout').addEventListener('click', () => { goal.dist = clamp(goal.dist / 0.7, 12, 1100); setActive(''); });

  function updateCamera(dt) {
    if (cam.follow) { goal.tx = player.x; goal.tz = player.z; }
    const k = 1 - Math.exp(-dt * (cam.follow ? 7 : 6));
    cam.tx += (goal.tx - cam.tx) * k; cam.tz += (goal.tz - cam.tz) * k;
    const k2 = 1 - Math.exp(-dt * 8);
    cam.yaw += (goal.yaw - cam.yaw) * k2; cam.pitch += (goal.pitch - cam.pitch) * k2; cam.dist += (goal.dist - cam.dist) * k2;
    const hd = Math.cos(cam.pitch) * cam.dist, vd = Math.sin(cam.pitch) * cam.dist;
    camera.position.set(cam.tx + Math.sin(cam.yaw) * hd, vd, cam.tz + Math.cos(cam.yaw) * hd);
    camera.lookAt(cam.tx, 0.6, cam.tz); camera.updateMatrixWorld(true);
    dust.visible = cam.dist < 260;
    scene.fog.density = clamp(0.16 / cam.dist, 0.00018, 0.0085);
    // Bloom nur nah am Spieler: beim Wegzoomen stapeln sich additive Glows -> Inf/NaN im Half-Float-Target -> schwarze Balken auf Handy-GPUs
    bloom.enabled = qlevel >= 1 && cam.dist < 140;
    { const far = clamp((cam.dist - 120) / 600, 0, 1); hemi.intensity = lerp(1.7, 2.8, far); renderer.toneMappingExposure = lerp(1.45, 1.8, far); }
    // moon follow
    moon.target.position.set(cam.tx, 0, cam.tz);
    moon.position.set(cam.tx - 60, 90, cam.tz - 40);
    if (Q.shadows) { const half = clamp(cam.dist * 1.15, 36, 120); const sc = moon.shadow.camera; if (Math.abs(sc.right - half) > 3) { sc.left = -half; sc.right = half; sc.top = half; sc.bottom = -half; sc.updateProjectionMatrix(); } }
  }

  // ---------------- input ----------------
  const joy = { x: 0, y: 0, run: false, active: false, id: null };
  const keys = {};
  addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) e.preventDefault(); });
  addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });
  const joyEl = $('joy'), stick = $('stick');
  const jr = () => joyEl.getBoundingClientRect();
  function joyMove(e) {
    const r = jr(), cx = r.left + r.width / 2, cy = r.top + r.height / 2; let dx = e.clientX - cx, dy = e.clientY - cy; const m = r.width / 2 - 14; const l = Math.hypot(dx, dy);
    if (l > m) { dx = dx / l * m; dy = dy / l * m; }
    stick.style.transform = `translate(${dx}px,${dy}px)`; joy.x = dx / m; joy.y = -dy / m; joy.run = l > m * 0.92;
  }
  joyEl.addEventListener('pointerdown', e => { joy.active = true; joy.id = e.pointerId; joyEl.setPointerCapture(e.pointerId); joyMove(e); e.preventDefault(); });
  joyEl.addEventListener('pointermove', e => { if (joy.active && e.pointerId === joy.id) joyMove(e); });
  const joyEnd = e => { if (e.pointerId !== joy.id) return; joy.active = false; joy.x = joy.y = 0; joy.run = false; stick.style.transform = 'translate(0,0)'; };
  joyEl.addEventListener('pointerup', joyEnd); joyEl.addEventListener('pointercancel', joyEnd);

  const ptrs = new Map(); let dragMoved = false, downAt = null, lastPinch = null;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function groundAt(cx, cy) {
    ndc.set(cx / innerWidth * 2 - 1, -(cy / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera);
    const o = ray.ray.origin, d = ray.ray.direction; if (d.y > -1e-4) return null; const t = -o.y / d.y; return [o.x + d.x * t, o.z + d.z * t];
  }
  const tapMark = document.createElement('div'); tapMark.id = 'tapmark'; document.body.appendChild(tapMark);
  let tapW = null;
  canvas.addEventListener('pointerdown', e => {
    canvas.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY, px: e.clientX, py: e.clientY, btn: e.button });
    if (ptrs.size === 1) { dragMoved = false; downAt = { x: e.clientX, y: e.clientY, t: performance.now() }; } else { dragMoved = true; lastPinch = null; }
  });
  canvas.addEventListener('pointermove', e => {
    const p = ptrs.get(e.pointerId); if (!p) return; const dx = e.clientX - p.x, dy = e.clientY - p.y; p.px = p.x; p.py = p.y; p.x = e.clientX; p.y = e.clientY;
    if (ptrs.size === 1) {
      if (!dragMoved && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 8) dragMoved = true;
      if (dragMoved) {
        if (p.btn === 2 || e.shiftKey) { goal.yaw -= dx * 0.005; goal.pitch = clamp(goal.pitch + dy * 0.003, 0.45, 1.3); }
        else {
          const ws = cam.dist * 0.0021; const r = [Math.cos(cam.yaw), -Math.sin(cam.yaw)], f = [-Math.sin(cam.yaw), -Math.cos(cam.yaw)];
          const fk = 1 / Math.max(0.5, Math.sin(cam.pitch));
          goal.tx -= r[0] * dx * ws; goal.tz -= r[1] * dx * ws; goal.tx += f[0] * dy * ws * fk; goal.tz += f[1] * dy * ws * fk;
          cam.follow = false; cam.tx = goal.tx; cam.tz = goal.tz; setActive('');
        }
      }
    } else if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); const ang = Math.atan2(b.y - a.y, b.x - a.x);
      if (lastPinch) { goal.dist = clamp(goal.dist * lastPinch.d / d, 12, 1100); let da = ang - lastPinch.a; da = Math.atan2(Math.sin(da), Math.cos(da)); goal.yaw += da; cam.dist = goal.dist; cam.yaw = goal.yaw; setActive(''); }
      lastPinch = { d, a: ang };
    }
  });
  const up = e => {
    const p = ptrs.get(e.pointerId); ptrs.delete(e.pointerId);
    if (!p) return;
    if (!dragMoved && ptrs.size === 0 && e.button !== 2) {
      const g = groundAt(e.clientX, e.clientY);
      if (g) { const ok = player.goTo(g[0], g[1]); tapW = g; showTap(e.clientX, e.clientY, ok); if (ok) { cam.follow = true; } }
    }
    if (ptrs.size < 2) lastPinch = null;
  };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', e => { ptrs.delete(e.pointerId); });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  canvas.addEventListener('wheel', e => { e.preventDefault(); goal.dist = clamp(goal.dist * Math.exp(e.deltaY * 0.0012), 12, 1100); setActive(''); }, { passive: false });
  function showTap(x, y, ok) { tapMark.style.left = x + 'px'; tapMark.style.top = y + 'px'; tapMark.className = ok ? 'ok' : 'no'; void tapMark.offsetWidth; tapMark.classList.add('go'); }

  // ---------------- stations UI ----------------
  const pinsEl = $('pins'), chipsEl = $('chips'), card = $('card');
  const pinEls = [];
  for (const s of world.stations) {
    const el = document.createElement('button'); el.className = 'pin'; el.innerHTML = `<span class="n">${s.id === 0 ? '★' : s.id}</span><span class="t">${s.name}</span>`; el.addEventListener('click', (e) => { e.stopPropagation(); openStation(s); });
    pinsEl.appendChild(el); pinEls.push(el);
    const ch = document.createElement('button'); ch.className = 'chip'; ch.innerHTML = `<b>${s.id === 0 ? '★' : s.id}</b> ${s.short}`; ch.addEventListener('click', () => openStation(s)); chipsEl.appendChild(ch);
  }
  let curSt = null;
  function openStation(s) {
    curSt = s; $('card-t').textContent = (s.id === 0 ? '★ ' : 'Station ' + s.id + ' · ') + s.name; $('card-d').textContent = s.desc; card.classList.add('show');
    cam.follow = false; goal.tx = s.x; goal.tz = s.z; goal.dist = 42; goal.pitch = 0.9; setActive('');
  }
  $('card-go').addEventListener('click', () => { if (curSt) { const ok = player.goTo(curSt.wx, curSt.wz); cam.follow = true; goal.dist = Math.min(goal.dist, 45); card.classList.remove('show'); } });
  $('card-x').addEventListener('click', () => card.classList.remove('show'));
  // ---------------- Lern-Modus (Aufgaben, Ablenkung, Auswertung) ----------------
  const lern = initLernen({ onOpen: () => { game.quiz = true; }, onClose: () => { game.quiz = false; } });
  $('card-task').addEventListener('click', () => { if (curSt) { card.classList.remove('show'); lern.startRound(curSt); } });
  $('btn-lern').addEventListener('click', () => lern.openParent());
  const v3 = new THREE.Vector3();
  function updatePins() {
    world.stations.forEach((s, i) => {
      v3.set(s.x, 8, s.z).project(camera); const el = pinEls[i];
      const behind = v3.z > 1 || Math.abs(v3.x) > 1.1 || Math.abs(v3.y) > 1.1;
      const d = Math.hypot(camera.position.x - s.x, camera.position.z - s.z);
      el.style.display = behind ? 'none' : 'flex';
      el.style.transform = `translate(${(v3.x * 0.5 + 0.5) * innerWidth}px, ${(-v3.y * 0.5 + 0.5) * innerHeight}px) translate(-50%,-100%)`;
      el.classList.toggle('small', cam.dist > 200);
    });
  }

  // ---------------- resize ----------------
  function resize() {
    renderer.setPixelRatio(pr); renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    composer.setPixelRatio(pr); composer.setSize(innerWidth, innerHeight); bloom.resolution.set(innerWidth * pr * 0.5, innerHeight * pr * 0.5);
  }
  addEventListener('resize', resize);

  // ---------------- loop ----------------
  let last = performance.now(), t = 0, fpsAcc = 0, fpsN = 0, lodT = 0, frame = 0;
  let paused = false;
  function tick() {
    const now = performance.now(); let dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    // keyboard input
    let kx = (keys['d'] || keys['arrowright'] ? 1 : 0) - (keys['a'] || keys['arrowleft'] ? 1 : 0), ky = (keys['w'] || keys['arrowup'] ? 1 : 0) - (keys['s'] || keys['arrowdown'] ? 1 : 0);
    const input = joy.active ? joy : (kx || ky ? { x: kx, y: ky, run: !!keys['shift'] } : null);
    if (input) cam.follow = true;
    player.update(dt, input, cam.yaw, cam.dist);
    trail.track(player.x, player.z);
    game.safe = trail.safeAt(player.x, player.z);
    if (game.dead > 0) game.dead -= dt; else deadEl.classList.remove('show');
    if (game.safe) game.hp = Math.min(100, game.hp + 22 * dt); else game.hp = Math.min(100, game.hp + 1.2 * dt);
    game.hurt = Math.max(0, game.hurt - dt * 1.6);
    creatures.update(dt, t, player, cam.tx, cam.tz, cam.dist, game.safe, onHit);
    trail.update(t, dt, cam.tx, cam.tz, cam.dist);
    hpFill.style.width = clamp(game.hp, 0, 100) + '%'; hpFill.style.background = game.hp > 55 ? 'linear-gradient(90deg,#7dff7a,#e8ff6a)' : game.hp > 28 ? 'linear-gradient(90deg,#ffd24a,#ff9a3a)' : 'linear-gradient(90deg,#ff3b4a,#ff7a3a)';
    hpTxt.textContent = Math.ceil(clamp(game.hp, 0, 100));
    const thr = game.monsters ? creatures.threat : 0;
    if (game.safe) { zoneEl.textContent = '☀ SICHER'; zoneEl.className = 'safe'; } else if (thr > 0.15) { zoneEl.textContent = '☠ GEFAHR'; zoneEl.className = 'danger'; } else { zoneEl.textContent = 'HÖLLE'; zoneEl.className = 'hell'; }
    fxHurt.style.opacity = clamp(game.hurt * 0.9 + (game.safe ? 0 : thr * 0.45), 0, 1); fxSafe.style.opacity = game.safe ? 0.55 : 0;
    updateCamera(dt);
    for (const u of world.update) u(t);
    // dust follows
    dust.position.set(cam.tx, 0, cam.tz); { const p = dgeo.attributes.position; for (let i = 0; i < dustN; i++) { let y = p.getY(i) + dt * (0.6 + (i % 5) * 0.15); if (y > 30) y = 0; p.setY(i, y); p.setX(i, p.getX(i) + Math.sin(t * 0.3 + i) * dt * 0.4); } p.needsUpdate = true; }
    dust.visible = cam.dist < 260;
    for (const s of fireSprites) { const f = 0.85 + 0.25 * Math.sin(t * 9 + s.position.x) + 0.12 * Math.sin(t * 17 + s.position.z); s.scale.set(s.userData.base * f, s.userData.base * f * 1.25, 1); }
    lodT -= dt; if (lodT <= 0) { world.treeLOD(cam.tx, cam.tz); lodT = 0.4; }
    updatePins();
    renderer.info.reset();
    composer.render();
    // adaptive resolution
    fpsAcc += dt; fpsN++; if (fpsAcc > 1.5) { const ms = fpsAcc / fpsN * 1000; fpsAcc = 0; fpsN = 0; if (ms > 38 && pr > 1) { pr = Math.max(1, pr - 0.25); resize(); } else if (ms < 17 && pr < Math.min(devicePixelRatio || 1, Q.maxPR)) { pr = Math.min(Math.min(devicePixelRatio || 1, Q.maxPR), pr + 0.25); resize(); } }
    if (!paused) requestAnimationFrame(tick);
  }

  // public API (used for exports/tests)
  window.__api = {
    diag() { const out = []; const B = new THREE.Box3(), S = new THREE.Vector3(), C = new THREE.Vector3(); scene.traverse(o => { if (!(o.isMesh || o.isSprite) || o.isInstancedMesh) return; B.setFromObject(o); B.getSize(S); B.getCenter(C); if (Math.hypot(C.x, C.z) < 80 && S.x > 14 && S.x < 140) out.push([o.type, o.material && o.material.type, Math.round(S.x), Math.round(S.y), Math.round(S.z), Math.round(C.x), Math.round(C.y), Math.round(C.z), o.geometry && o.geometry.type, o.renderOrder]); }); return out; },
    world, scene, camera, renderer, composer, cam, goal, player, setPreset,
    pause() { paused = true; }, resume() { paused = false; last = performance.now(); requestAnimationFrame(tick); },
    setView(v) { Object.assign(goal, v); Object.assign(cam, v); cam.follow = false; },
    trail, creatures, game,
    renderOnce() { player.update(0.0001, null, cam.yaw, cam.dist); updateCamera(0.001); world.treeLOD(cam.tx, cam.tz); updatePins(); renderer.info.reset(); composer.render(); },
    capture(w, h, type = 'image/jpeg', q = 0.93) {
      const oldPR = pr, ow = innerWidth, oh = innerHeight;
      renderer.setPixelRatio(1); renderer.setSize(w, h, false); composer.setPixelRatio(1); composer.setSize(w, h); bloom.resolution.set(w * 0.5, h * 0.5);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      updateCamera(0.001); world.treeLOD(cam.tx, cam.tz); composer.render();
      const url = canvas.toDataURL(type, q);
      renderer.setPixelRatio(oldPR); renderer.setSize(ow, oh, false); composer.setPixelRatio(oldPR); composer.setSize(ow, oh); camera.aspect = ow / oh; camera.updateProjectionMatrix();
      return url;
    },
    stats() { return { tri: renderer.info.render.triangles, trees: world.treeCount, lamps: world.lampCount, cars: world.carCount, ruins: world.ruinCount, tris: renderer.info.render.triangles, calls: renderer.info.render.calls }; },
  };
  $('btn-shot').addEventListener('click', () => {
    try { const u = window.__api.capture(2048, Math.round(2048 * innerHeight / innerWidth), 'image/png'); const a = document.createElement('a'); a.href = u; a.download = 'gemen-3d-2k.png'; a.click(); } catch (e) { alert('Screenshot fehlgeschlagen: ' + e.message); }
  });
  let qlevel = 2; const qNames = ['Niedrig', 'Mittel', 'Hoch'];
  function applyQ() {
    const hi = qlevel === 2, mid = qlevel === 1;
    bloom.enabled = qlevel >= 1; bloom.strength = hi ? 0.55 : 0.45;
    if (Q.shadows) { moon.castShadow = hi; }
    Q.maxPR = qlevel === 0 ? 1 : (mid ? 1.35 : (mobile ? 1.75 : 2)); pr = Math.min(pr, Math.min(devicePixelRatio || 1, Q.maxPR)); if (qlevel === 2) pr = Math.min(devicePixelRatio || 1, Q.maxPR);
    resize(); $('btn-q').textContent = 'Q:' + qNames[qlevel];
  }
  $('btn-q').addEventListener('click', () => { qlevel = (qlevel + 2) % 3; applyQ(); });
  window.__api.setQuality = (l) => { qlevel = l; applyQ(); };
  $('btn-full').addEventListener('click', () => { const el = document.documentElement; if (!document.fullscreenElement) (el.requestFullscreen || el.webkitRequestFullscreen || (() => { })).call(el); else document.exitFullscreen(); });

  resize();
  if (mobile) { qlevel = 1; applyQ(); } else $('btn-q').textContent = 'Q:Hoch';
  setTimeout(() => { const h = $('hint'); if (h) h.style.opacity = 0; }, 9000);
  setPreset('nah');
  cam.tx = goal.tx = player.x; cam.tz = goal.tz = player.z; cam.dist = goal.dist = 30;
  $('loading').classList.add('hide');
  window.__ready = true;
  requestAnimationFrame(tick);
}
main().catch(e => { console.error(e); const m = $('loadmsg'); if (m) m.textContent = 'Fehler: ' + e.message; window.__error = String(e && e.stack || e); });
