import * as THREE from 'three';
import { Geo, mulberry32, lerp, clamp } from './util.js';
import { SAFE_R, AURA_W } from './trail.js';
import { HOME_C } from './home.js';

// ------------------------------------------------------------------ geometry helpers
const ico = new THREE.IcosahedronGeometry(1, 1); const ICP = ico.attributes.position;
const ICO = []; for (let i = 0; i < ICP.count; i += 3) ICO.push([[ICP.getX(i), ICP.getY(i), ICP.getZ(i)], [ICP.getX(i + 1), ICP.getY(i + 1), ICP.getZ(i + 1)], [ICP.getX(i + 2), ICP.getY(i + 2), ICP.getZ(i + 2)]]);
const UV0 = [0, 0];
function ell(g, cx, cy, cz, rx, ry, rz, col, col2 = null) {
  for (const t of ICO) {
    const v = t.map(p => [cx + p[0] * rx, cy + p[1] * ry, cz + p[2] * rz]);
    const n = [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3, (t[0][2] + t[1][2] + t[2][2]) / 3];
    let c = col; if (col2) { const k = clamp(n[1] * 0.5 + 0.5, 0, 1); c = [lerp(col2[0], col[0], k), lerp(col2[1], col[1], k), lerp(col2[2], col[2], k)]; }
    g.tri(v[0], v[1], v[2], UV0, UV0, UV0, c, n);
  }
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
function bone(g, a, b, r0, r1, col) {
  const d = norm(sub(b, a)); let p1 = cross(d, Math.abs(d[1]) > 0.92 ? [1, 0, 0] : [0, 1, 0]); p1 = norm(p1); const p2 = norm(cross(d, p1));
  const corner = (o, r, s1, s2) => [o[0] + (p1[0] * s1 + p2[0] * s2) * r, o[1] + (p1[1] * s1 + p2[1] * s2) * r, o[2] + (p1[2] * s1 + p2[2] * s2) * r];
  const S = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
  for (let i = 0; i < 4; i++) {
    const s = S[i], t = S[(i + 1) % 4];
    const nh = [p1[0] * (s[0] + t[0]) + p2[0] * (s[1] + t[1]), p1[1] * (s[0] + t[0]) + p2[1] * (s[1] + t[1]), p1[2] * (s[0] + t[0]) + p2[2] * (s[1] + t[1])];
    g.quad(corner(a, r0, s[0], s[1]), corner(a, r0, t[0], t[1]), corner(b, r1, t[0], t[1]), corner(b, r1, s[0], s[1]), UV0, UV0, UV0, UV0, col, nh);
  }
}
const NEON = { pink: [1, 0.1, 0.55], cyan: [0.1, 0.95, 1], lime: [0.65, 1, 0.1], orange: [1, 0.5, 0.05], red: [1, 0.08, 0.1], yellow: [1, 0.95, 0.15], purple: [0.7, 0.2, 1] };

// ------------------------------------------------------------------ type builders (static geometry, shared between instances)
const TYPES = {};
function build() {
  // ---- Spinnenhund
  {
    const body = new Geo(), glow = new Geo(), lA = new Geo(), lB = new Geo();
    ell(body, 0, 1.0, -0.8, 0.7, 0.58, 0.95, [0.32, 0.08, 0.42], [0.12, 0.03, 0.2]);
    ell(body, 0, 0.95, 0.6, 0.48, 0.42, 0.55, [0.3, 0.07, 0.4], [0.1, 0.02, 0.18]);
    bone(body, [0, 0.62, 0.95], [0.18, 0.3, 1.25], 0.08, 0.02, [0.95, 0.95, 0.9]); bone(body, [0, 0.62, 0.95], [-0.18, 0.3, 1.25], 0.08, 0.02, [0.95, 0.95, 0.9]);
    for (const [x, y, z, s] of [[-0.14, 1.12, 1.04, 0.1], [0.14, 1.12, 1.04, 0.1], [-0.3, 1.04, 0.98, 0.07], [0.3, 1.04, 0.98, 0.07], [-0.07, 1.26, 0.96, 0.06], [0.07, 1.26, 0.96, 0.06]]) ell(glow, x, y, z, s, s, s, NEON.red);
    for (let i = 0; i < 6; i++) ell(glow, 0, 1.54, -1.4 + i * 0.35, 0.09, 0.09, 0.2, NEON.pink);
    for (const s of [-1, 1]) for (let k = 0; k < 4; k++) {
      const hip = [s * 0.4, 0.95, 0.65 - k * 0.5], knee = [s * 1.25, 1.55, hip[2] + (k - 1.5) * -0.15], foot = [s * 1.8, 0, hip[2] + (k - 1.5) * -0.45];
      const g = ((k + (s > 0 ? 1 : 0)) % 2 === 0) ? lA : lB; bone(g, hip, knee, 0.075, 0.06, [0.2, 0.05, 0.3]); bone(g, knee, foot, 0.06, 0.02, [0.2, 0.05, 0.3]); ell(glow, foot[0], 0.03, foot[2], 0.05, 0.05, 0.05, NEON.pink);
    }
    TYPES.spider = { body, glow, lA, lB, scale: 1.25, reach: 2.0, sense: 28, speed: 4.5, wander: 1.4, dmg: 12, hp: 1 };
  }
  // ---- Schleimer (Tentakel-Blob)
  {
    const body = new Geo(), glow = new Geo(), lA = new Geo(), lB = new Geo();
    ell(body, 0, 1.0, 0, 1.05, 0.95, 1.05, [0.35, 0.95, 0.12], [0.08, 0.35, 0.05]);
    ell(body, 0, 0.95, 0.85, 0.62, 0.42, 0.34, [0.25, 0.0, 0.08]);
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const x = Math.cos(a) * 0.5, y = 0.95 + Math.sin(a) * 0.32; bone(body, [x, y, 0.98], [x * 0.85, y * 0.93 + (Math.sin(a) > 0 ? -0.1 : 0.1), 1.2], 0.05, 0.005, [1, 1, 0.9]); }
    for (const [x, z] of [[-0.45, 0.2], [0.45, 0.2], [0, -0.3]]) { bone(body, [x, 1.85, z], [x * 1.3, 2.45, z + 0.1], 0.06, 0.05, [0.3, 0.8, 0.1]); ell(glow, x * 1.3, 2.5, z + 0.15, 0.2, 0.2, 0.2, NEON.yellow); ell(body, x * 1.3, 2.5, z + 0.32, 0.08, 0.1, 0.05, [0, 0, 0]); }
    for (let i = 0; i < 9; i++) ell(glow, Math.cos(i * 2.4) * 0.8, 1.2 + Math.sin(i * 1.7) * 0.4, Math.sin(i * 2.4) * 0.6 - 0.3, 0.09, 0.09, 0.09, NEON.lime);
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const g = i % 2 ? lA : lB; const p0 = [Math.cos(a) * 0.6, 0.6, Math.sin(a) * 0.6], p1 = [Math.cos(a) * 1.3, 0.35, Math.sin(a) * 1.3], p2 = [Math.cos(a + 0.4) * 1.9, 0.1, Math.sin(a + 0.4) * 1.9], p3 = [Math.cos(a + 0.2) * 2.3, 0.7, Math.sin(a + 0.2) * 2.3]; bone(g, p0, p1, 0.17, 0.12, [0.25, 0.78, 0.1]); bone(g, p1, p2, 0.12, 0.08, [0.25, 0.78, 0.1]); bone(g, p2, p3, 0.08, 0.02, [0.5, 1, 0.3]); }
    TYPES.blob = { body, glow, lA, lB, scale: 1.1, reach: 2.6, sense: 20, speed: 3.4, wander: 1.0, dmg: 14, hp: 1 };
  }
  // ---- Stelzenwesen
  {
    const body = new Geo(), glow = new Geo(), lA = new Geo(), lB = new Geo();
    ell(body, 0, 3.4, 0, 0.55, 0.7, 0.4, [0.1, 0.02, 0.16], [0.05, 0.01, 0.08]);
    bone(body, [0, 3.9, 0.05], [0, 4.5, 0.4], 0.1, 0.07, [0.14, 0.04, 0.2]);
    ell(body, 0, 4.65, 0.55, 0.38, 0.32, 0.5, [0.18, 0.05, 0.26]);
    for (let i = -3; i <= 3; i++) { bone(body, [i * 0.09, 4.55, 0.98], [i * 0.09, 4.4, 1.0], 0.03, 0.03, [1, 1, 0.9]); }
    for (const s of [-1, 1]) { ell(glow, s * 0.17, 4.78, 0.95, 0.13, 0.13, 0.07, NEON.yellow); bone(body, [s * 0.2, 4.95, 0.7], [s * 0.4, 5.55, 0.5], 0.05, 0.005, [0.25, 0.05, 0.3]); }
    for (let r = 0; r < 4; r++) bone(glow, [-0.5, 3.1 + r * 0.25, 0.3], [0.5, 3.1 + r * 0.25, 0.3], 0.025, 0.025, NEON.pink);
    for (const s of [-1, 1]) {
      const g = s > 0 ? lA : lB; bone(g, [s * 0.25, 3.0, 0], [s * 0.55, 1.6, 0.35], 0.08, 0.06, [0.14, 0.04, 0.2]); bone(g, [s * 0.55, 1.6, 0.35], [s * 0.4, 0.05, 0.05], 0.06, 0.03, [0.14, 0.04, 0.2]); ell(glow, s * 0.4, 0.05, 0.05, 0.08, 0.08, 0.08, NEON.red);
      bone(body, [s * 0.5, 3.7, 0], [s * 1.0, 2.1, 0.5], 0.06, 0.05, [0.14, 0.04, 0.2]); bone(body, [s * 1.0, 2.1, 0.5], [s * 0.8, 0.6, 1.2], 0.05, 0.015, [0.14, 0.04, 0.2]);
    }
    TYPES.stilt = { body, glow, lA, lB, scale: 1.0, reach: 3.0, sense: 36, speed: 4.3, wander: 1.5, dmg: 16, hp: 1 };
  }
  // ---- Glotzer (laufendes Auge)
  {
    const body = new Geo(), glow = new Geo(), lA = new Geo(), lB = new Geo();
    for (const t of ICO) { const v = t.map(p => [p[0] * 1.1, 1.35 + p[1] * 1.1, p[2] * 1.1]); const n = [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3, (t[0][2] + t[1][2] + t[2][2]) / 3]; const vein = (Math.sin(n[0] * 19) * Math.sin(n[1] * 23) * Math.sin(n[2] * 17)) > 0.18; body.tri(v[0], v[1], v[2], UV0, UV0, UV0, vein ? [0.9, 0.25, 0.3] : [0.97, 0.93, 0.9], n); }
    ell(glow, 0, 1.35, 1.0, 0.62, 0.62, 0.14, NEON.cyan); ell(body, 0, 1.35, 1.1, 0.26, 0.34, 0.1, [0, 0, 0]);
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.3; const g = i % 2 ? lA : lB; bone(g, [Math.cos(a) * 0.5, 0.5, Math.sin(a) * 0.5], [Math.cos(a) * 1.0, 0.7, Math.sin(a) * 1.0], 0.07, 0.06, [0.7, 0.15, 0.25]); bone(g, [Math.cos(a) * 1.0, 0.7, Math.sin(a) * 1.0], [Math.cos(a) * 1.25, 0.0, Math.sin(a) * 1.25], 0.06, 0.02, [0.7, 0.15, 0.25]); }
    TYPES.eye = { body, glow, lA, lB, scale: 1.0, reach: 2.2, sense: 30, speed: 4.0, wander: 1.2, dmg: 12, hp: 1, hop: true };
  }
  // ---- Fledermaus-Ding (fliegt)
  {
    const body = new Geo(), glow = new Geo(), lA = new Geo(), lB = new Geo();
    ell(body, 0, 0, 0, 0.38, 0.32, 0.6, [0.18, 0.04, 0.26]); ell(body, 0, 0.12, 0.62, 0.3, 0.27, 0.3, [0.2, 0.05, 0.28]);
    for (const s of [-1, 1]) { bone(body, [s * 0.14, 0.34, 0.7], [s * 0.2, 0.7, 0.62], 0.07, 0.01, [0.2, 0.05, 0.3]); ell(glow, s * 0.13, 0.15, 0.88, 0.08, 0.08, 0.06, NEON.red); }
    for (const s of [-1, 1]) {
      const g = s > 0 ? lA : lB; const col = [0.55, 0.08, 0.5];
      g.tri([s * 0.2, 0, 0.2], [s * 2.2, 0.5, 0.1], [s * 1.5, -0.2, -0.8], UV0, UV0, UV0, col, [0, 1, 0]); g.tri([s * 0.2, 0, 0.2], [s * 1.5, -0.2, -0.8], [s * 0.2, 0, -0.5], UV0, UV0, UV0, col, [0, 1, 0]);
      g.tri([s * 0.2, 0, 0.2], [s * 2.2, 0.5, 0.1], [s * 1.9, 0.1, 0.9], UV0, UV0, UV0, [0.75, 0.1, 0.6], [0, 1, 0]);
      bone(g, [s * 0.2, 0.05, 0.2], [s * 2.2, 0.5, 0.1], 0.05, 0.02, NEON.pink.map(x => x * 0.6));
    }
    TYPES.bat = { body, glow, lA, lB, scale: 1.1, reach: 1.9, sense: 42, speed: 5.4, wander: 3, dmg: 9, hp: 1, fly: true };
  }
}

// ------------------------------------------------------------------ system
export function buildCreatures(world, scene, trail, Q, enabled = true) {
  build();
  const root = new THREE.Group(); world.root.add(root);
  const R = mulberry32(13013);
  const mkBody = (em, k = 1.7) => new THREE.MeshStandardMaterial({ vertexColors: true, color: new THREE.Color(k, k, k), roughness: 0.6, metalness: 0.05, emissive: em, emissiveIntensity: 1, side: THREE.DoubleSide });
  const bodyMats = { spider: mkBody(0x2a0838), blob: mkBody(0x1d8a10, 2.0), stilt: mkBody(0x2a0838), eye: mkBody(0x401018, 1.5), bat: mkBody(0x3a0830) };
  const glowMat = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
  const geos = {}; for (const k in TYPES) { const T = TYPES[k]; geos[k] = { body: T.body.toGeometry(), glow: T.glow.toGeometry(), lA: T.lA.p.length ? T.lA.toGeometry() : null, lB: T.lB.p.length ? T.lB.toGeometry() : null }; }
  const list = []; const walk = world.walk, b = world.bounds;
  const homeX = HOME_C.x, homeZ = HOME_C.z;
  const okGround = (x, z) => walk.ok(x, z) && (!walk.reach || walk.reach[walk.cell(x, z)[1] * walk.GW + walk.cell(x, z)[0]]);

  function spawnOne(type) {
    const T = TYPES[type]; const G = geos[type]; const g = new THREE.Group();
    const bodyMat = bodyMats[type]; const bm = new THREE.Mesh(G.body, bodyMat); bm.castShadow = false; g.add(bm);
    const gm = new THREE.Mesh(G.glow, glowMat); g.add(gm);
    const pa = new THREE.Group(), pb = new THREE.Group();
    if (G.lA) { pa.add(new THREE.Mesh(G.lA, bodyMat)); } if (G.lB) { pb.add(new THREE.Mesh(G.lB, bodyMat)); }
    g.add(pa, pb);
    const sc = T.scale * (0.88 + R() * 0.3); g.scale.setScalar(sc);
    root.add(g);
    const c = { type, T, g, bm, gm, pa, pb, x: 0, z: 0, y: 0, yaw: R() * 6.28, yawT: 0, phase: R() * 6, cd: 0, wanderT: 0, wx: 0, wz: 0, state: 'wander', sc, hurt: 0, spd: 0, seed: R() * 100 };
    place(c); list.push(c); return c;
  }
  function place(c) {
    for (let tries = 0; tries < 600; tries++) {
      const x = lerp(b.x0 + 8, b.x1 - 8, R()), z = lerp(b.z0 + 8, b.z1 - 8, R());
      if (Math.hypot(x - homeX, z - homeZ) < 55) continue;
      if (!c.T.fly && !okGround(x, z)) continue;
      if (trail.near(x, z, 8)) continue;
      let ok = true; for (const o of list) if (o !== c && Math.hypot(o.x - x, o.z - z) < 14) { ok = false; break; }
      if (!ok) continue;
      c.x = x; c.z = z; c.wx = x; c.wz = z; c.y = c.T.fly ? 4.5 : 0; return true;
    }
    c.x = homeX + 90; c.z = homeZ + 90; return false;
  }
  const COUNTS = { spider: 14, blob: 9, stilt: 5, eye: 9, bat: 10 };
  for (const k in COUNTS) for (let i = 0; i < COUNTS[k]; i++) spawnOne(k);

  const C = { list, enabled, threat: 0, chasers: 0, root, remotes: [], puppet: false, onRemoteHit: null };
  // Mehrspieler: Host schickt Momentaufnahme, die anderen setzen Ziele
  C.snapshot = () => { const a = []; for (const c of list) a.push(+c.x.toFixed(1), +c.z.toFixed(1), +c.yaw.toFixed(2), c.state === 'chase' ? 1 : 0); return a; };
  C.applySnapshot = (a) => { for (let i = 0; i < list.length && i * 4 + 3 < a.length; i++) { const c = list[i]; c.nx = a[i * 4]; c.nz = a[i * 4 + 1]; c.nyaw = a[i * 4 + 2]; c.nstate = a[i * 4 + 3]; } };
  C.setEnabled = (on) => { C.enabled = on; root.visible = on; };
  root.visible = enabled;
  C.scatterNear = (x, z, r) => { for (const c of list) if (Math.hypot(c.x - x, c.z - z) < r) { place(c); c.state = 'wander'; } };

  function canStand(c, nx, nz) {
    if (!c.T.fly && !walk.ok(nx, nz)) return false;
    if (trail.safeAt(nx, nz)) return false;
    return true;
  }
  const TRY = [0, 0.55, -0.55, 1.1, -1.1, 1.7, -1.7, 2.4];
  function step(c, tx, tz, spd, dt) {
    let dx = tx - c.x, dz = tz - c.z; const d = Math.hypot(dx, dz) || 1; dx /= d; dz /= d;
    // prefer last successful side to avoid oscillation
    const pref = c.side || 1;
    for (const a0 of TRY) {
      const a = a0 * pref; const ca = Math.cos(a), sa = Math.sin(a); const mx = dx * ca - dz * sa, mz = dx * sa + dz * ca; const nx = c.x + mx * spd * dt, nz = c.z + mz * spd * dt;
      if (canStand(c, nx, nz)) { c.x = nx; c.z = nz; c.yawT = Math.atan2(mx, mz); if (a0 !== 0) c.side = Math.sign(a) || pref; return true; }
    }
    c.side = -(c.side || 1); return false;
  }

  C.update = (dt, t, P, camX, camZ, camDist, playerSafe, onHit) => {
    if (!C.enabled) return;
    let threat = 0, chasers = 0;
    const camFar = Math.max(170, camDist * 1.25);
    for (const c of list) {
      const T = c.T;
      // Ziel wählen: nächster Spieler (ich oder Mitspieler), der nicht in Sicherheit ist; sonst der nächste überhaupt
      let tx = P.x, tz = P.z, tSafe = playerSafe, tId = null, d = Math.hypot(P.x - c.x, P.z - c.z);
      for (const r of C.remotes) { const dr = Math.hypot(r.x - c.x, r.z - c.z); if ((tSafe && !r.safe) || (tSafe === r.safe && dr < d)) { tx = r.x; tz = r.z; tSafe = r.safe; tId = r.id; d = dr; } }
      const dx = tx - c.x, dz = tz - c.z;
      const nearCam = Math.hypot(c.x - camX, c.z - camZ) < camFar;
      let spd = 0;
      const dTr = trail.pts.length ? trail.distTo(c.x, c.z) : 99;
      const inAura = dTr < SAFE_R + AURA_W;
      const slow = inAura ? 0.45 : 1;
      if (C.puppet) {
        // Mitspieler-Modus: Positionen kommen vom Host, hier wird nur weich nachgezogen
        const ox = c.x, oz = c.z;
        if (c.nx !== undefined) {
          const k = Math.min(1, dt * 8); c.x += (c.nx - c.x) * k; c.z += (c.nz - c.z) * k;
          if (Math.hypot(c.nx - c.x, c.nz - c.z) > 30) { c.x = c.nx; c.z = c.nz; }
          c.yawT = c.nyaw;
        }
        c.state = c.nstate ? 'chase' : 'wander';
        spd = Math.hypot(c.x - ox, c.z - oz) / Math.max(dt, 1e-3);
        if (c.state === 'chase') { chasers++; threat = Math.max(threat, (playerSafe ? 0 : 1) * (1 - clamp((Math.hypot(P.x - c.x, P.z - c.z) - 3) / (T.sense - 3), 0, 1))); }
        c.snarl = 0;
      } else {
        // ---- state
        const sees = !tSafe && d < T.sense;
        c.state = sees ? 'chase' : 'wander';
        if (c.state === 'chase') {
          const reach = T.reach;
          if (d > reach * 0.7) { spd = T.speed * slow; if (!step(c, tx, tz, spd, dt)) spd = 0.3; }
          else { c.yawT = Math.atan2(dx, dz); }
          c.cd -= dt;
          if (d < reach + (T.fly ? 0.6 : 0.4) && c.cd <= 0 && !tSafe) { c.cd = 1.15; c.lunge = 0.35; if (tId === null) onHit && onHit(T.dmg, c); else C.onRemoteHit && C.onRemoteHit(tId, T.dmg); }
          chasers++; if (tId === null) threat = Math.max(threat, 1 - clamp((d - 3) / (T.sense - 3), 0, 1));
        } else {
          c.wanderT -= dt;
          if (c.wanderT <= 0) { const a = R() * 6.28, r = 5 + R() * 14; c.wx = c.x + Math.cos(a) * r; c.wz = c.z + Math.sin(a) * r; c.wanderT = 3 + R() * 5; c.idle = R() < 0.3; }
          const dd = Math.hypot(c.wx - c.x, c.wz - c.z);
          if (!c.idle && dd > 1.0) { spd = T.wander * slow; step(c, c.wx, c.wz, spd, dt); } else c.wanderT -= dt;
          // gnash at the safe boundary
          if (tSafe && d < 12) { c.yawT = Math.atan2(dx, dz); c.snarl = 1; } else c.snarl = 0;
        }
      }
      c.spd = spd;
      // ---- animation
      c.phase += dt * (2 + spd * (T.hop ? 2.6 : 1.9));
      let dy = c.yawT - c.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); c.yaw += dy * Math.min(1, dt * (c.state === 'chase' ? 9 : 4));
      if (!nearCam) { c.g.visible = false; continue; } c.g.visible = true;
      const g = c.g; g.position.x = c.x; g.position.z = c.z; g.rotation.y = c.yaw;
      let yy = c.y; const sw = Math.sin(c.phase);
      if (T.fly) {
        const target = c.state === 'chase' ? (d < 10 ? 1.7 : 4.0 + Math.sin(c.phase * 0.5) * 0.8) : 5.0 + Math.sin(t * 0.8 + c.seed) * 0.8;
        c.y += (target - c.y) * Math.min(1, dt * 2.2); yy = c.y + Math.sin(t * 5 + c.seed) * 0.12;
        const fl = Math.sin(t * 16 + c.seed) * 0.95; c.pa.rotation.z = fl; c.pb.rotation.z = -fl; g.rotation.z = Math.sin(t * 2 + c.seed) * 0.15; g.rotation.x = c.state === 'chase' ? 0.3 : 0;
      } else if (c.type === 'spider') {
        c.pa.rotation.y = sw * 0.24; c.pb.rotation.y = -sw * 0.24; yy = Math.abs(sw) * 0.06; c.bm.rotation.z = sw * 0.03;
      } else if (c.type === 'blob') {
        c.pa.rotation.y = Math.sin(t * 2.4 + c.seed) * 0.28; c.pb.rotation.y = -Math.sin(t * 2.1 + c.seed) * 0.3; const pu = 1 + 0.07 * Math.sin(t * 5 + c.seed); c.bm.scale.set(1 / Math.sqrt(pu), pu, 1 / Math.sqrt(pu)); yy = 0;
      } else if (c.type === 'stilt') {
        c.pa.rotation.x = sw * 0.55; c.pb.rotation.x = -sw * 0.55; g.rotation.z = Math.sin(c.phase * 0.5) * 0.05; yy = Math.abs(sw) * 0.08;
      } else if (c.type === 'eye') {
        yy = spd > 0.2 ? Math.abs(sw) * 0.5 : Math.abs(Math.sin(t * 1.5 + c.seed)) * 0.06; c.pa.rotation.x = sw * 0.12; c.pb.rotation.x = -sw * 0.12; c.bm.rotation.z = Math.sin(t * 7 + c.seed) * 0.04;
      }
      if (c.lunge > 0) { c.lunge -= dt; g.position.x += Math.sin(c.yaw) * Math.sin(c.lunge * 9) * 0.5; g.position.z += Math.cos(c.yaw) * Math.sin(c.lunge * 9) * 0.5; }
      if (c.snarl) { g.position.x += Math.sin(t * 40 + c.seed) * 0.04; g.rotation.x = (g.rotation.x || 0) + Math.sin(t * 25 + c.seed) * 0.02; }
      if (inAura && d < 60) { g.position.x += Math.sin(t * 50 + c.seed) * 0.05; }
      g.position.y = yy;
      g.scale.setScalar(c.sc * (inAura ? 0.94 + 0.06 * Math.sin(t * 30 + c.seed) : 1));
    }
    C.threat += (threat - C.threat) * Math.min(1, dt * 4); C.chasers = chasers;
  };
  return C;
}
