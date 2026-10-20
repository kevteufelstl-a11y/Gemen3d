import * as THREE from 'three';
import { Geo, mulberry32, lerp, clamp } from './util.js';
import { makeTreeGeo, fenceGeo, towerGeo } from './props.js';
import { makeGlow } from './textures.js';

export const HOME_C = { x: -2, z: -3, R: 19, fenceR: 16.2, gateAng: 70 * Math.PI / 180 };

export function buildHome(world, Q) {
  const root = new THREE.Group(); world.root.add(root);
  const mats = world.mats; const R = mulberry32(8080);
  const C = HOME_C;
  const wallG = new Geo(), plainG = new Geo(), roofG = new Geo(), metalG = new Geo(), carG = new Geo(), neonG = new Geo(), glassG = new Geo();
  const PU = [0, 0];
  const blockers = [];
  const rot = (cx, cz, yaw) => { const c = Math.cos(yaw), s = Math.sin(yaw); return (u, v) => [cx + u * c + v * s, cz - u * s + v * c]; };

  // wall rectangle with facade uv; yaw rotates about Y
  function wallRect(cx, cz, w, d, yaw, y0, H, floors, tint, uOff = 0) {
    const P = rot(cx, cz, yaw);
    const c4 = [P(-w / 2, -d / 2), P(w / 2, -d / 2), P(w / 2, d / 2), P(-w / 2, d / 2)];
    const nrm = [[0, 0, -1], [1, 0, 0], [0, 0, 1], [-1, 0, 0]];
    const cs = Math.cos(yaw), sn = Math.sin(yaw);
    for (let i = 0; i < 4; i++) {
      const a = c4[i], b = c4[(i + 1) % 4]; const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const n = nrm[i]; const nh = [n[0] * cs + n[2] * sn, 0, -n[0] * sn + n[2] * cs];
      const bays = Math.max(1, Math.round(L / 3.2)); const u0 = uOff + i, u1 = u0 + bays;
      const sh = 0.85 + 0.15 * (nh[0] * -0.4 + nh[2] * 0.5);
      wallG.quad([a[0], y0, a[1]], [b[0], y0, b[1]], [b[0], y0 + H, b[1]], [a[0], y0 + H, a[1]], [u0 / 4, 0], [u1 / 4, 0], [u1 / 4, floors / 4], [u0 / 4, floors / 4], tint.map(x => x * sh), nh);
    }
  }
  function gable(cx, cz, w, d, yaw, wallTop, rise, tint, wallTint, over = 0.5) {
    const P = rot(cx, cz, yaw); const L = w / 2 + over, Wd = d / 2 + over, top = wallTop + rise;
    const slope = Math.hypot(Wd, rise);
    const pt = (u, v, y) => { const q = P(u, v); return [q[0], y, q[1]]; };
    const bs = wallTop - rise * over / (d / 2);
    roofG.quad(pt(-L, -Wd, bs), pt(L, -Wd, bs), pt(L, 0, top), pt(-L, 0, top), [0, 0], [L * 2, 0], [L * 2, slope], [0, slope], tint, [0, 1, 0]);
    roofG.quad(pt(L, Wd, bs), pt(-L, Wd, bs), pt(-L, 0, top), pt(L, 0, top), [0, 0], [L * 2, 0], [L * 2, slope], [0, slope], tint.map(x => x * 0.85), [0, 1, 0]);
    const cs = Math.cos(yaw), sn = Math.sin(yaw);
    for (const sg of [-1, 1]) {
      plainG.tri(pt(sg * (w / 2), -d / 2, wallTop), pt(sg * (w / 2), d / 2, wallTop), pt(sg * (w / 2), 0, top), PU, PU, PU, wallTint.map(x => x * 0.9), [sg * cs, 0, -sg * sn]);
    }
    return { pt, top };
  }

  const wallTint = [1.0, 0.96, 0.88], roofTint = [0.95, 0.52, 0.5], brick = [0.9, 0.52, 0.42];
  // ---------- main house ----------
  const HX = -6.5, HZ = -7.5, yaw = 0.1;
  wallRect(HX, HZ, 12, 8.4, yaw, 0, 6.2, 2, wallTint, 1);
  const gb = gable(HX, HZ, 12, 8.4, yaw, 6.2, 3.8, roofTint, wallTint);
  // dormer on front (south side, +v)
  {
    const P = rot(HX, HZ, yaw);
    const dc = P(-1.5, 3.0);
    wallRect(dc[0], dc[1], 3.2, 2.4, yaw, 5.0, 2.6, 1, wallTint, 2);
    gable(dc[0], dc[1], 3.2, 2.6, yaw + Math.PI / 2, 7.6, 1.5, roofTint.map(x => x * 1.05), wallTint, 0.35);
    // chimneys
    for (const [u, v] of [[3.8, -1.4], [-3.2, -1.0]]) { const q = P(u, v); plainG.box(q[0], 8.3, q[1], 0.9, 2.6, 0.9, yaw, brick); plainG.box(q[0], 9.65, q[1], 1.15, 0.18, 1.15, yaw, [0.5, 0.46, 0.42]); }
    // door + porch
    const dq = P(2.4, 4.25); plainG.box(dq[0], 1.15, dq[1], 1.2, 2.3, 0.18, yaw, [0.34, 0.2, 0.12]);
    const stp = P(2.4, 4.9); plainG.box(stp[0], 0.1, stp[1], 2.4, 0.2, 1.4, yaw, [0.45, 0.44, 0.42]);
    plainG.box(dq[0], 2.7, dq[1] + 0.0, 1.8, 0.14, 1.2, yaw, [0.26, 0.17, 0.14]); // canopy
    world.porch = [dq[0] + Math.sin(yaw) * -0.0, 2.4, dq[1] + 0.6];
    blockers.push({ type: 'rect', cx: HX, cz: HZ, w: 12.8, d: 9.2, rot: yaw });
  }
  // ---------- extension wing (west, flat roof with clutter) ----------
  {
    const EX = -15.2, EZ = -6.0;
    wallRect(EX, EZ, 5.6, 7.0, yaw, 0, 3.4, 1, [0.88, 0.84, 0.74], 3);
    const P = rot(EX, EZ, yaw);
    plainG.box(EX, 3.45, EZ, 6.0, 0.18, 7.4, yaw, [0.3, 0.3, 0.32]); // slab
    for (const [u, v, w, h, d] of [[-1.2, -1.2, 1.4, 0.9, 1.1], [1.1, 1.0, 1.2, 0.7, 1.2], [0.2, -2.1, 0.6, 1.4, 0.6]]) { const q = P(u, v); plainG.box(q[0], 3.5 + h / 2, q[1], w, h, d, yaw + R(), [0.55, 0.56, 0.58]); }
    // tires + junk on roof
    for (let k = 0; k < 5; k++) { const q = P((R() - 0.5) * 4, (R() - 0.5) * 5); plainG.box(q[0], 3.62, q[1], 0.7, 0.24, 0.7, R() * 3, [0.08, 0.08, 0.08]); }
    blockers.push({ type: 'rect', cx: EX, cz: EZ, w: 6.0, d: 7.4, rot: yaw });
  }
  // ---------- shed with solar (east) ----------
  {
    const SX = 9.2, SZ = -3.2;
    wallRect(SX, SZ, 3.6, 3.0, 0.2, 0, 2.5, 1, [0.5, 0.58, 0.55], 0);
    const P = rot(SX, SZ, 0.2);
    const a = P(-2.0, -1.7), b = P(2.0, -1.7), c = P(2.0, 1.7), d = P(-2.0, 1.7);
    metalG.quad([a[0], 3.3, a[1]], [b[0], 3.3, b[1]], [c[0], 2.5, c[1]], [d[0], 2.5, d[1]], PU, PU, PU, PU, [0.05, 0.1, 0.2], [0, 1, 0]);
    plainG.box(SX, 0.06, SZ, 4.2, 0.12, 3.6, 0.2, [0.3, 0.3, 0.28]);
    blockers.push({ type: 'rect', cx: SX, cz: SZ, w: 4, d: 3.4, rot: 0.2 });
  }
  // ---------- ground solar array (back) ----------
  for (let k = 0; k < 3; k++) {
    const px = -1.2 + k * 3.0, pz = -14.0;
    const T = (dx, dy, dz) => [px + dx, dy, pz + dz];
    metalG.quad(T(-1.3, 1.5, 0), T(1.3, 1.5, 0), T(1.3, 0.5, 1.6), T(-1.3, 0.5, 1.6), PU, PU, PU, PU, [0.05, 0.1, 0.22], [0, 1, 0.5]);
    plainG.box(px, 0.5, pz + 0.1, 0.1, 1.0, 0.1, 0, [0.4, 0.4, 0.42]);
    blockers.push({ type: 'rect', cx: px, cz: pz + 0.8, w: 2.8, d: 1.8, rot: 0 });
  }
  // ---------- terrace + table + fire ----------
  {
    const TX = 6.2, TZ = -9.0;
    plainG.box(TX, 0.05, TZ, 7.4, 0.1, 6.2, 0, [0.34, 0.31, 0.27]);
    plainG.box(TX, 0.78, TZ, 2.4, 0.1, 1.1, 0.2, [0.4, 0.26, 0.15]);
    for (const [dx, dz] of [[-1, -.4], [1, -.4], [-1, .4], [1, .4]]) plainG.box(TX + dx, 0.38, TZ + dz, 0.1, 0.76, 0.1, 0.2, [0.2, 0.13, 0.08]);
    for (let k = 0; k < 6; k++) { const a = k / 6 * 6.28 + 0.4; const cx_ = TX + Math.cos(a) * 1.9, cz_ = TZ + Math.sin(a) * 1.4; plainG.box(cx_, 0.45, cz_, 0.55, 0.1, 0.55, -a, [0.36, 0.22, 0.12]); plainG.box(cx_ - Math.cos(a) * 0.22, 0.85, cz_ - Math.sin(a) * 0.22, 0.08, 0.7, 0.55, -a, [0.3, 0.19, 0.1]); }
    // fire pit
    plainG.box(TX + 4.0, 0.2, TZ + 2.0, 1.4, 0.4, 1.4, 0, [0.2, 0.19, 0.18]);
    world.fires.push([TX + 4.0, 0.7, TZ + 2.0]);
    blockers.push({ type: 'rect', cx: TX, cz: TZ, w: 3.0, d: 1.8, rot: 0.2 });
    blockers.push({ type: 'rect', cx: TX + 4, cz: TZ + 2, w: 1.6, d: 1.6, rot: 0 });
    world.homeFire = [TX + 4.0, 1.0, TZ + 2.0];
  }
  // ---------- car (purple/white with green neon) ----------
  {
    const CX = 4.4, CZ = 4.4, cy = -0.55; const P = rot(CX, CZ, cy);
    const b = (u, y, v, w, h, d, col, g = carG) => { const q = P(u, v); g.box(q[0], y, q[1], w, h, d, cy, col, 1); };
    b(0, 0.62, 0, 4.5, 0.82, 1.9, [0.42, 0.14, 0.7]);           // lower body purple
    b(0.9, 0.67, 0, 1.7, 0.86, 1.92, [0.93, 0.93, 0.95]);       // white hood
    b(-1.0, 1.25, 0, 1.9, 0.14, 1.6, [0.95, 0.95, 0.97]);        // roof
    b(-0.2, 1.1, 0, 2.5, 0.58, 1.66, [0.05, 0.07, 0.1], glassG); // windows
    for (const sx of [-1.4, 1.4]) for (const sz of [-0.9, 0.9]) b(sx, 0.34, sz, 0.76, 0.68, 0.26, [0.03, 0.03, 0.03]);
    b(0, 0.12, 0, 4.4, 0.06, 1.85, [0.4, 1, 0.3], neonG);        // underglow
    for (const s of [-1, 1]) b(0.2, 0.62, s * 0.97, 3.0, 0.07, 0.03, [0.5, 1, 0.35], neonG);
    blockers.push({ type: 'rect', cx: CX, cz: CZ, w: 4.8, d: 2.2, rot: cy });
  }
  // ---------- driveway + lawn ----------
  {
    const gravel = [0.95, 0.9, 0.8];
    const q = (cx, cz, w, d, yaw, col, y = 0.045) => { const P = rot(cx, cz, yaw); const A = P(-w / 2, -d / 2), B = P(w / 2, -d / 2), Cc = P(w / 2, d / 2), D = P(-w / 2, d / 2); plainG.quad([A[0], y, A[1]], [B[0], y, B[1]], [Cc[0], y, Cc[1]], [D[0], y, D[1]], PU, PU, PU, PU, col, [0, 1, 0]); };
    q(4.0, 5.0, 8.0, 14.0, -0.2, gravel);
    q(-9, 5.2, 12, 5.5, 0.05, [0.5, 0.85, 0.4], 0.04);
    q(-8, -2.0, 8, 2, 0.08, [0.95, 0.88, 0.75], 0.05); // path
  }
  // ---------- bushes ----------
  const bushPos = [[-12, 1.5], [-14.5, -1.8], [-9.8, -3.0], [-2.2, -2.8], [1.8, -2.6], [11.5, 0.2], [-10.5, 7.4], [13, -8.5], [-3.8, -12], [8, -12.4]];
  for (const [bx, bz] of bushPos) {
    const ico = new THREE.IcosahedronGeometry(1, 1); const pos = ico.attributes.position, idx = ico.index; const sc = 0.7 + R() * 0.6;
    const V = (i) => [bx + pos.getX(i) * sc * 1.2, 0.55 * sc + pos.getY(i) * sc * 0.85, bz + pos.getZ(i) * sc * 1.2];
    const nI = idx ? idx.count : pos.count;
    for (let i = 0; i < nI; i += 3) { const a = V(idx ? idx.getX(i) : i), b2 = V(idx ? idx.getX(i + 1) : i + 1), c = V(idx ? idx.getX(i + 2) : i + 2); const t = clamp((a[1] + b2[1] + c[1]) / 3 / 1.4, 0, 1); plainG.tri(a, b2, c, PU, PU, PU, [lerp(0.18, 0.45, t), lerp(0.55, 0.95, t), lerp(0.2, 0.35, t)], [(a[0] + b2[0] + c[0]) / 3 - bx, (a[1] + b2[1] + c[1]) / 3 - 0.5, (a[2] + b2[2] + c[2]) / 3 - bz]); }
  }
  // ---------- fence ring + towers ----------
  const fg = new Geo();
  const posts = fenceGeo(fg, C.x, C.z, C.fenceR, C.gateAng, 5.0, { segs: 40, h: 1.9, rail: [1, 0.97, 0.92], picket: [1, 0.98, 0.94], post: [1, 0.9, 0.55] });
  const towerAngles = [0, 55, 110, 165, 220, 290].map(a => a * Math.PI / 180);
  const headPos = [];
  for (const a of towerAngles) { const tx = C.x + Math.cos(a) * (C.fenceR + 0.2), tz = C.z + Math.sin(a) * (C.fenceR + 0.2); towerGeo(fg, tx, tz, 6.2, 0, [1, 0.93, 0.75]); headPos.push([tx, 6.9, tz]); }
  // gate pillars + gate leaves
  for (const s of [-1, 1]) {
    const a = C.gateAng + s * (2.9 / C.fenceR); const gx = C.x + Math.cos(a) * C.fenceR, gz = C.z + Math.sin(a) * C.fenceR;
    fg.box(gx, 1.5, gz, 0.6, 3.0, 0.6, 0, [1, 0.95, 0.8]); headPos.push([gx, 3.15, gz]);
    blockers.push({ type: 'rect', cx: gx, cz: gz, w: 0.8, d: 0.8, rot: 0 });
  }
  blockers.push({ type: 'ring', cx: C.x, cz: C.z, r: C.fenceR, w: 1.0, gateAng: C.gateAng, gateW: 4.6 });
  // green LED strip on posts
  const ledG = new Geo();
  posts.forEach((p, i) => { if (i % 2 === 0) ledG.box(p[0], 2.12, p[1], 0.22, 0.14, 0.22, 0, i % 4 === 0 ? [1, 0.8, 0.3] : [1, 0.55, 0.8], 1, false); });
  for (const h of headPos) ledG.box(h[0], h[1], h[2], 0.8, 0.6, 0.8, 0, [1, 0.88, 0.45], 1, false);

  // ---------- compile meshes ----------
  const mk = (geo, mat, o = {}) => { const m = new THREE.Mesh(geo.toGeometry(), mat); m.castShadow = o.cast !== false; m.receiveShadow = true; root.add(m); return m; };
  mk(wallG, mats.wall); mk(plainG, mats.plain); mk(roofG, mats.roof); mk(fg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.5 }));
  mk(metalG, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.25, metalness: 0.7, color: 0x9fb4d8 }));
  mk(carG, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.22, metalness: 0.45 }));
  mk(glassG, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.05, metalness: 0.9 }), { cast: false });
  mk(neonG, new THREE.MeshBasicMaterial({ vertexColors: true }), { cast: false });
  mk(ledG, new THREE.MeshBasicMaterial({ vertexColors: true }), { cast: false });

  // ---------- big tree ----------
  const blossom = new THREE.MeshStandardMaterial({ vertexColors: true, map: world.treeMat.map, color: 0xffc2e2, emissive: 0x7a3a5a, emissiveIntensity: 0.45, roughness: 0.9 });
  const greenT = new THREE.MeshStandardMaterial({ vertexColors: true, map: world.treeMat.map, color: 0xc6ffb0, emissive: 0x1d5a18, emissiveIntensity: 0.5, roughness: 0.9 });
  const tree = new THREE.Mesh(makeTreeGeo(2, 7, 77, 1.7), blossom);
  tree.position.set(-12.6, 0, 5.2); tree.castShadow = true; root.add(tree);
  blockers.push({ type: 'rect', cx: -12.6, cz: 5.2, w: 1.2, d: 1.2, rot: 0 });
  // second smaller trees inside compound
  for (const [tx, tz, s] of [[2.2, -12.5, 1.1], [12.6, -4, 0.9]]) { const t = new THREE.Mesh(makeTreeGeo(1, 4, 12 + tx, 1.0), greenT); t.position.set(tx, 0, tz); t.scale.setScalar(s); t.castShadow = true; root.add(t); blockers.push({ type: 'rect', cx: tx, cz: tz, w: 0.9, d: 0.9, rot: 0 }); }

  // ---------- dome ----------
  const domeMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.FrontSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uR: { value: C.R }, uA: { value: 1.0 } },
    vertexShader: `varying vec3 vP; varying vec3 vN; varying vec3 vV; void main(){ vP=position; vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `
      varying vec3 vP; varying vec3 vN; varying vec3 vV; uniform float uTime; uniform float uR; uniform float uA;
      float hexDist(vec2 p){ p=abs(p); float c=dot(p,normalize(vec2(1.0,1.7320508))); return max(c,p.x); }
      vec2 hexCoord(vec2 uv,out float d){ vec2 r=vec2(1.0,1.7320508); vec2 h=r*0.5; vec2 a=mod(uv,r)-h; vec2 b=mod(uv-h,r)-h; vec2 gv=dot(a,a)<dot(b,b)?a:b; d=0.5-hexDist(gv); return gv; }
      void main(){
        vec3 dir=normalize(vP);
        vec2 uv=dir.xz/(dir.y+0.55)*11.0;
        float d; hexCoord(uv,d);
        float line=smoothstep(0.03,0.006,d);
        float fres=pow(1.0-abs(dot(normalize(vN),normalize(vV))),2.2);
        float pulse=0.5+0.5*sin(uTime*1.3-length(vP)*0.22);
        float scan=smoothstep(0.0,1.0,sin(uTime*0.8-dir.y*6.0)*0.5+0.5);
        float a=(0.004+line*(0.13+0.09*pulse)+fres*0.09+scan*0.01)*uA;
        a*=smoothstep(-0.02,0.12,dir.y+0.05);
        vec3 gold=vec3(1.0,0.86,0.42); vec3 pink=vec3(1.0,0.55,0.85); vec3 sky=vec3(0.55,0.9,1.0); float k=0.5+0.5*sin(uTime*0.5+dir.y*5.0+dir.x*3.0); vec3 col=mix(mix(gold,pink,k),sky,0.5+0.5*sin(uTime*0.3+dir.z*4.0)); gl_FragColor=vec4(col,a);
      }`
  });
  const domeGeo = new THREE.SphereGeometry(C.R, 64, 36, 0, Math.PI * 2, 0, Math.PI / 2);
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.set(C.x, 0, C.z); dome.renderOrder = 10; root.add(dome);
  const domeMatB = domeMat.clone(); domeMatB.side = THREE.BackSide; domeMatB.uniforms = { uTime: domeMat.uniforms.uTime, uR: domeMat.uniforms.uR, uA: { value: 0.55 } };
  const domeB = new THREE.Mesh(domeGeo, domeMatB); domeB.position.copy(dome.position); domeB.renderOrder = 9; root.add(domeB);
  // ground glow disc inside dome
  const gtex = makeGlow([[0, 'rgba(255,230,150,0.0)'], [0.82, 'rgba(255,230,150,0.05)'], [0.93, 'rgba(255,210,140,0.30)'], [1, 'rgba(255,200,120,0)']]);
  const gd = new THREE.Mesh(new THREE.PlaneGeometry(C.R * 2.1, C.R * 2.1), new THREE.MeshBasicMaterial({ map: gtex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -9, polygonOffsetUnits: -9 }));
  gd.rotation.x = -Math.PI / 2; gd.position.set(C.x, 0.3, C.z); root.add(gd);

  // ---------- lights ----------
  const lights = [];
  const green = new THREE.PointLight(0xffe9b0, 18, 34, 1.8); green.position.set(C.x, 9, C.z); root.add(green); lights.push(green);
  const porch = new THREE.PointLight(0xffb060, 36, 20, 1.8); porch.position.set(world.porch[0], 2.4, world.porch[2]); root.add(porch);
  const fire = new THREE.PointLight(0xff8a30, 22, 14, 1.8); fire.position.set(...world.homeFire); root.add(fire);
  const winL = new THREE.PointLight(0xffa850, 20, 18, 1.8); winL.position.set(-6.5, 3.2, -2.0); root.add(winL);

  world.update.push((t) => {
    domeMat.uniforms.uTime.value = t;
    fire.intensity = 22 + Math.sin(t * 11) * 4 + Math.sin(t * 23.7) * 3;
    green.intensity = 18 + Math.sin(t * 1.3) * 2;
  });
  world.homeBlockers = blockers;
  return { root, blockers, dome };
}
