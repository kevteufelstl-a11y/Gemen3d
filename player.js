import * as THREE from 'three';
import { Geo } from './util.js';
import { makeGlow } from './textures.js';

function part(geo, color, mat) { const m = new THREE.Mesh(geo.toGeometry(), mat); m.castShadow = true; return m; }

export function buildPlayer(world, scene) {
  const std = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8 });
  const root = new THREE.Group(); scene.add(root);
  const fig = new THREE.Group(); root.add(fig);
  // legs
  const mkLeg = (x) => { const g = new Geo(); g.box(0, -0.45, 0, 0.22, 0.9, 0.24, 0, [0.16, 0.2, 0.3]); g.box(0, -0.93, 0.07, 0.24, 0.14, 0.38, 0, [0.07, 0.06, 0.05]); const m = part(g, 0, std); const piv = new THREE.Group(); piv.position.set(x, 0.95, 0); piv.add(m); fig.add(piv); return piv; };
  const legL = mkLeg(-0.16), legR = mkLeg(0.16);
  // torso (jacket)
  { const g = new Geo(); g.box(0, 1.28, 0, 0.62, 0.72, 0.34, 0, [0.22, 0.3, 0.2]); g.box(0, 0.98, 0, 0.64, 0.12, 0.36, 0, [0.12, 0.12, 0.12]); fig.add(part(g, 0, std)); }
  // arms
  const mkArm = (x) => { const g = new Geo(); g.box(0, -0.3, 0, 0.17, 0.62, 0.19, 0, [0.22, 0.3, 0.2]); g.box(0, -0.66, 0, 0.17, 0.14, 0.18, 0, [0.76, 0.58, 0.46]); const m = part(g, 0, std); const piv = new THREE.Group(); piv.position.set(x, 1.55, 0); piv.add(m); fig.add(piv); return piv; };
  const armL = mkArm(-0.4), armR = mkArm(0.4);
  // head, hat, beard
  { const g = new Geo(); g.box(0, 1.8, 0, 0.3, 0.34, 0.3, 0, [0.78, 0.6, 0.48]);
    g.box(0, 1.66, 0.1, 0.32, 0.22, 0.18, 0, [0.23, 0.15, 0.1]);   // beard
    g.box(0, 2.0, 0, 0.55, 0.05, 0.55, 0, [0.15, 0.12, 0.1]);       // hat brim
    g.box(0, 2.12, 0, 0.34, 0.22, 0.34, 0, [0.17, 0.14, 0.12]);     // hat crown
    g.box(0, 2.04, 0, 0.36, 0.06, 0.36, 0, [0.55, 0.12, 0.1]);       // band
    fig.add(part(g, 0, std)); }
  // backpack
  { const g = new Geo(); g.box(0, 1.3, -0.3, 0.42, 0.55, 0.22, 0, [0.28, 0.22, 0.14]); fig.add(part(g, 0, std)); }
  // wagon (Bollerwagen)
  const wagon = new THREE.Group(); scene.add(wagon);
  { const g = new Geo();
    g.box(0, 0.62, 0, 1.0, 0.45, 1.4, 0, [0.5, 0.25, 0.12]);
    g.box(0, 0.88, 0, 1.06, 0.06, 1.46, 0, [0.35, 0.18, 0.09]);
    g.box(0, 0.88, -0.2, 0.7, 0.3, 0.55, 0, [0.2, 0.55, 0.22]);         // cargo crate
    g.box(0, 0.96, 0.35, 0.5, 0.22, 0.4, 0, [0.7, 0.5, 0.2]);
    wagon.add(part(g, 0, std)); }
  const wheels = [];
  for (const [x, z] of [[-0.58, -0.5], [0.58, -0.5], [-0.58, 0.5], [0.58, 0.5]]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.1, 10).rotateZ(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.9 }));
    w.position.set(x, 0.26, z); wagon.add(w); wheels.push(w);
  }
  const handle = new Geo(); handle.box(0, 0.5, 1.2, 0.05, 0.05, 1.2, 0, [0.4, 0.4, 0.4]); wagon.add(part(handle, 0, std));
  // light on head
  const torch = new THREE.PointLight(0xfff0d0, 9, 14, 1.8); torch.position.set(0, 2.4, 0.5); root.add(torch);
  // marker ring
  const ringTex = makeGlow([[0, 'rgba(120,255,120,0)'], [0.6, 'rgba(120,255,120,0)'], [0.76, 'rgba(120,255,120,0.95)'], [0.86, 'rgba(120,255,120,0.9)'], [0.92, 'rgba(120,255,120,0.15)'], [1, 'rgba(120,255,120,0)']]);
  const ring = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending }));
  ring.renderOrder = 20; scene.add(ring);
  // arrow marker (visible when zoomed out)
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(1, 2.4, 4).rotateX(Math.PI), new THREE.MeshBasicMaterial({ color: 0x66ff66, transparent: true, opacity: 0.95, depthTest: false }));
  arrow.renderOrder = 21; scene.add(arrow);

  const P = { x: 4.6, z: 10.5, yaw: Math.PI * 0.75, vx: 0, vz: 0, phase: 0, speed: 0, path: null, target: null, wx: 0, wz: 0, wyaw: 0 };
  P.wx = P.x - 2; P.wz = P.z - 2;
  // start inside compound: near gate, facing the house
  P.x = 2.6; P.z = 9.0; P.yaw = Math.PI * 1.0;
  P.wx = 3.2; P.wz = 11.2;
  const tgt = new THREE.Vector3();

  function tryMove(nx, nz) {
    if (world.walk.ok(nx, nz)) { P.x = nx; P.z = nz; return true; }
    if (world.walk.ok(nx, P.z)) { P.x = nx; return true; }
    if (world.walk.ok(P.x, nz)) { P.z = nz; return true; }
    return false;
  }

  P.goTo = (x, z) => {
    const p = world.walk.path(P.x, P.z, x, z);
    if (p && p.length > 1) { P.path = p.slice(1); P.target = [x, z]; return true; }
    return false;
  };
  P.stop = () => { P.path = null; };
  P.update = (dt, input, camYaw, camDist) => {
    let mx = 0, mz = 0, sp = 0;
    if (input && (Math.abs(input.x) > 0.05 || Math.abs(input.y) > 0.05)) {
      // input.x right, input.y forward (screen up) -> world via camera yaw
      const f = [-Math.sin(camYaw), -Math.cos(camYaw)], r = [Math.cos(camYaw), -Math.sin(camYaw)];
      mx = f[0] * input.y + r[0] * input.x; mz = f[1] * input.y + r[1] * input.x;
      const l = Math.hypot(mx, mz); sp = Math.min(1, l) * (input.run ? 6.2 : 4.0); mx /= l || 1; mz /= l || 1;
      P.path = null;
    } else if (P.path && P.path.length) {
      const [wx, wz] = P.path[0]; const dx = wx - P.x, dz = wz - P.z; const d = Math.hypot(dx, dz);
      if (d < 0.5) { P.path.shift(); if (!P.path.length) P.path = null; }
      else { mx = dx / d; mz = dz / d; sp = 4.6; }
    }
    if (sp > 0) {
      const nx = P.x + mx * sp * dt, nz = P.z + mz * sp * dt;
      const moved = tryMove(nx, nz);
      const want = Math.atan2(mx, mz); let dy = want - P.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); P.yaw += dy * Math.min(1, dt * 12);
      if (!moved && P.path) { P.path = null; }
      P.phase += sp * dt * 2.3; P.speed = sp;
    } else { P.speed *= 0.8; }
    const sw = Math.sin(P.phase) * Math.min(1, P.speed / 3) * 0.7;
    legL.rotation.x = sw; legR.rotation.x = -sw; armL.rotation.x = -sw * 0.8; armR.rotation.x = sw * 0.8;
    fig.position.y = Math.abs(Math.sin(P.phase)) * 0.05 * Math.min(1, P.speed / 3);
    root.position.set(P.x, 0, P.z); fig.rotation.y = P.yaw;
    // wagon follows with rope
    const bx = Math.sin(P.yaw), bz = Math.cos(P.yaw);
    const tx = P.x - bx * 2.3, tz = P.z - bz * 2.3;
    const wd = Math.hypot(tx - P.wx, tz - P.wz);
    P.wx += (tx - P.wx) * Math.min(1, dt * 7); P.wz += (tz - P.wz) * Math.min(1, dt * 7);
    const wy = Math.atan2(P.x - P.wx, P.z - P.wz); let dw = wy - P.wyaw; dw = Math.atan2(Math.sin(dw), Math.cos(dw)); P.wyaw += dw * Math.min(1, dt * 8);
    wagon.position.set(P.wx, 0, P.wz); wagon.rotation.y = P.wyaw + Math.PI;
    for (const w of wheels) w.rotation.x += P.speed * dt * 3;
    const sc = Math.min(Math.max(1, camDist / 28), 14);
    ring.position.set(P.x, 0.35, P.z); ring.scale.set(2.6 * sc, 1, 2.6 * sc);
    arrow.position.set(P.x, 2.9 + 1.4 * sc * 0.5 + Math.sin(performance.now() / 300) * 0.2 * sc, P.z); arrow.scale.set(0.5 * sc, 0.5 * sc, 0.5 * sc);
    arrow.visible = camDist > 70; ring.visible = true;
  };
  P.root = root;
  return P;
}
