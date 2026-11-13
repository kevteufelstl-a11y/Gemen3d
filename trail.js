import * as THREE from 'three';
import { mulberry32, clamp } from './util.js';
import { HOME_C } from './home.js';
import { makeDot } from './textures.js';
const DOT = makeDot();

// Spur-Tunnel: wo der Spieler gelaufen ist, entsteht ein durchsichtiger Tunnel voller Freude.
// Im Tunnel ist es sicher. 2 m um den Tunnel strahlt eine Aura, an deren Rand Himmel gegen Hölle kämpft.
export const TUNNEL_R = 1.7;      // Innenradius (m)
export const AURA_W = 2.0;        // Aura-Breite außerhalb des Tunnels (m)
export const SAFE_R = 2.05;       // Monster dürfen nicht näher als das

const MAXR = 4200, NV = 11, STEP = 1.45;
const hash = (x, z) => ((Math.floor(x / 4) + 5000) * 10007 + (Math.floor(z / 4) + 5000));

export function buildTrail(world, scene, opts = {}) {
  const root = new THREE.Group(); world.root.add(root);
  const T = { pts: [], rings: 0, hash: new Map(), lastBreak: true, sparkNear: [], tNear: 0, lights: [] };
  const R = mulberry32(4242);

  // ---------------- geometry buffers
  const shellPos = new Float32Array(MAXR * NV * 3), shellNor = new Float32Array(MAXR * NV * 3), shellUv = new Float32Array(MAXR * NV * 2);
  const shellIdx = new Uint32Array((MAXR - 1) * (NV - 1) * 6);
  for (let i = 0; i < MAXR - 1; i++) for (let k = 0; k < NV - 1; k++) { const a = i * NV + k, b = (i + 1) * NV + k; const o = (i * (NV - 1) + k) * 6; shellIdx.set([a, b, a + 1, a + 1, b, b + 1], o); }
  const shellGeo = new THREE.BufferGeometry();
  shellGeo.setAttribute('position', new THREE.BufferAttribute(shellPos, 3)); shellGeo.setAttribute('normal', new THREE.BufferAttribute(shellNor, 3)); shellGeo.setAttribute('uv', new THREE.BufferAttribute(shellUv, 2)); shellGeo.setIndex(new THREE.BufferAttribute(shellIdx, 1));
  shellGeo.setDrawRange(0, 0);
  const mkRibbon = () => {
    const pos = new Float32Array(MAXR * 2 * 3), uv = new Float32Array(MAXR * 2 * 2), idx = new Uint32Array((MAXR - 1) * 6);
    for (let i = 0; i < MAXR - 1; i++) { const a = i * 2, b = (i + 1) * 2; idx.set([a, b, a + 1, a + 1, b, b + 1], i * 6); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); g.setIndex(new THREE.BufferAttribute(idx, 1)); g.setDrawRange(0, 0); return g;
  };
  const floorGeo = mkRibbon(), auraGeo = mkRibbon();

  // ---------------- materials
  const U = { uTime: { value: 0 }, uTint: { value: new THREE.Vector3(1, 1, 1) }, uAmt: { value: 0 } };
  const hexGLSL = `
    float hash21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
    float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x),f.y); }
  `;
  const shellMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, uniforms: U,
    vertexShader: 'varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main(){ vUv=uv; vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }',
    fragmentShader: hexGLSL + `
      varying vec2 vUv; varying vec3 vN; varying vec3 vV; uniform float uTime; uniform vec3 uTint; uniform float uAmt;
      float hexD(vec2 p){ p=abs(p); float c=dot(p,normalize(vec2(1.0,1.7320508))); return max(c,p.x); }
      void main(){
        vec2 uv=vec2(vUv.x*0.55, vUv.y*3.4);
        vec2 r=vec2(1.0,1.7320508); vec2 h=r*0.5; vec2 a=mod(uv,r)-h; vec2 b=mod(uv-h,r)-h; vec2 gv=dot(a,a)<dot(b,b)?a:b; float d=0.5-hexD(gv);
        float line=smoothstep(0.035,0.008,d);
        float fres=pow(1.0-abs(dot(normalize(vN),normalize(vV))),2.0);
        float flow=0.5+0.5*sin(vUv.x*0.9-uTime*1.6);
        float hue=vUv.x*0.05+uTime*0.15;
        vec3 c1=vec3(1.0,0.72,0.18), c2=vec3(1.0,0.28,0.7), c3=vec3(0.25,0.8,1.0);
        vec3 col=mix(mix(c1,c2,0.5+0.5*sin(hue*6.28)),c3,0.5+0.5*sin(hue*6.28*0.7+1.3));
        float a2=0.02+line*(0.22+0.14*flow)+fres*0.2;
        col=mix(col,vec3(dot(col,vec3(0.333))*1.6)*uTint,uAmt);
        gl_FragColor=vec4(col,a2);
      }`
  });
  const floorMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, uniforms: U, polygonOffset: true, polygonOffsetFactor: -12, polygonOffsetUnits: -12,
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: hexGLSL + `
      varying vec2 vUv; uniform float uTime; uniform vec3 uTint; uniform float uAmt;
      void main(){
        float x=vUv.y; // -1..1 across, uv.x metres along
        float ax=abs(x);
        vec2 p=vec2(vUv.x*1.3, x*2.2);
        float n=vnoise(p*3.0)*0.5+vnoise(p*9.0)*0.3+vnoise(p*21.0)*0.2;
        vec3 grass=mix(vec3(0.012,0.09,0.015),vec3(0.05,0.24,0.04),n);
        // flowers
        vec2 cell=floor(p*2.4); vec2 f=fract(p*2.4)-0.5; float hh=hash21(cell); float on=step(0.62,hh);
        vec2 off=(vec2(hash21(cell+7.1),hash21(cell+3.3))-0.5)*0.5; float dd=length(f-off);
        float petals=on*smoothstep(0.24,0.15,dd); float core=on*smoothstep(0.08,0.05,dd);
        vec3 fc=pow(0.5+0.5*cos(6.28*(hh*3.7+vec3(0.0,0.33,0.67))),vec3(2.2));
        vec3 col=grass; col=mix(col,fc,petals); col=mix(col,vec3(0.8,0.55,0.05),core);
        // golden stepping stones along the middle
        float stone=smoothstep(0.2,0.16,abs(x)) * step(0.5,fract(vUv.x*0.7)) * 0.45; col=mix(col,vec3(0.35,0.3,0.2),stone);
        float glow=0.35+0.12*sin(uTime*1.3+vUv.x*0.8);
        col+=vec3(1.0,0.85,0.5)*glow*0.04;
        float alpha=smoothstep(1.0,0.78,ax)*0.96;
        col=mix(col,col*uTint*1.5,uAmt*0.7);
        gl_FragColor=vec4(col,alpha);
      }`
  });
  const auraMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, uniforms: Object.assign({ uCore: { value: TUNNEL_R / (TUNNEL_R + AURA_W) } }, U), polygonOffset: true, polygonOffsetFactor: -11, polygonOffsetUnits: -11,
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: hexGLSL + `
      varying vec2 vUv; uniform float uTime; uniform float uCore; uniform vec3 uTint; uniform float uAmt;
      void main(){
        float ax=abs(vUv.y);
        float e=clamp((ax-uCore)/(1.0-uCore),0.0,1.0);   // 0 at tunnel wall .. 1 at aura edge
        float u=vUv.x;
        float n=vnoise(vec2(u*0.9+uTime*0.8, ax*7.0-uTime*1.5));
        float front=0.50+0.22*sin(u*1.9+uTime*3.1)+0.22*(n-0.5)*2.0;   // where heaven meets hell
        vec3 gold=vec3(1.0,0.86,0.45), pink=vec3(1.0,0.55,0.85);
        vec3 heaven=mix(gold,pink,0.5+0.5*sin(u*0.5+uTime*0.6));
        float fl=step(0.5,fract(uTime*7.0+u*0.8));
        vec3 hell=mix(vec3(1.0,0.12,0.22),mix(vec3(0.1,0.9,1.0),vec3(0.65,1.0,0.1),fl),step(0.62,n));
        float inH=smoothstep(front+0.05,front-0.05,e);
        vec3 col=mix(hell,heaven,inH);
        float arc=smoothstep(0.075,0.0,abs(e-front)) * (0.55+0.45*sin(u*11.0+uTime*21.0));
        float inside=smoothstep(uCore+0.02,uCore-0.02,ax);       // under the tunnel
        float a=0.0;
        a+=mix(0.0,0.30,1.0-smoothstep(0.0,1.0,e*0.9))*(1.0-inside)*0.8;     // aura falls off outward
        a+=arc*0.6;
        a+=inside*0.035;
        a*=smoothstep(1.0,0.86,ax);
        col=mix(col,vec3(1.0),arc*0.25);
        col=mix(col,vec3(dot(col,vec3(0.333))*1.6)*uTint,uAmt);
        gl_FragColor=vec4(col,clamp(a,0.0,1.0));
      }`
  });
  const shell = new THREE.Mesh(shellGeo, shellMat); shell.frustumCulled = false; shell.renderOrder = 13;
  const floor = new THREE.Mesh(floorGeo, floorMat); floor.frustumCulled = false; floor.renderOrder = 6;
  const aura = new THREE.Mesh(auraGeo, auraMat); aura.frustumCulled = false; aura.renderOrder = 7;
  root.add(floor, aura, shell);

  // ---------------- ring writer
  const up = new THREE.Vector3(0, 1, 0), tan = new THREE.Vector3(), side = new THREE.Vector3();
  let uAcc = 0;
  function writeRing(i, x, z, tx, tz, r, u) {
    // side = up x tangent
    const L = Math.hypot(tx, tz) || 1; tx /= L; tz /= L; const sx = -tz, sz = tx; // right-hand perpendicular in XZ
    for (let k = 0; k < NV; k++) {
      const th = k / (NV - 1) * Math.PI, ct = Math.cos(th), st = Math.sin(th);
      const o = (i * NV + k) * 3;
      shellPos[o] = x + sx * ct * r; shellPos[o + 1] = st * r * 1.12; shellPos[o + 2] = z + sz * ct * r;
      shellNor[o] = sx * ct; shellNor[o + 1] = st; shellNor[o + 2] = sz * ct;
      const uo = (i * NV + k) * 2; shellUv[uo] = u; shellUv[uo + 1] = k / (NV - 1);
    }
    const wF = r > 0 ? TUNNEL_R : 0, wA = r > 0 ? TUNNEL_R + AURA_W : 0;
    for (const [geo, w, y] of [[floorGeo, wF, 0.07], [auraGeo, wA, 0.09]]) {
      const pa = geo.attributes.position.array, ua = geo.attributes.uv.array;
      const o = i * 6; pa[o] = x - sx * w; pa[o + 1] = y; pa[o + 2] = z - sz * w; pa[o + 3] = x + sx * w; pa[o + 4] = y; pa[o + 5] = z + sz * w;
      const q = i * 4; ua[q] = u; ua[q + 1] = -1; ua[q + 2] = u; ua[q + 3] = 1;
    }
  }
  const ringPts = []; // per ring: [x,z,r,u]
  function flush(from) {
    shellGeo.attributes.position.needsUpdate = true; shellGeo.attributes.normal.needsUpdate = true; shellGeo.attributes.uv.needsUpdate = true;
    for (const g of [floorGeo, auraGeo]) { g.attributes.position.needsUpdate = true; g.attributes.uv.needsUpdate = true; }
    const n = T.rings;
    shellGeo.setDrawRange(0, Math.max(0, n - 1) * (NV - 1) * 6); floorGeo.setDrawRange(0, Math.max(0, n - 1) * 6); auraGeo.setDrawRange(0, Math.max(0, n - 1) * 6);
  }
  function pushRing(x, z, r) {
    if (T.rings >= MAXR - 2) return false;
    const prev = ringPts[T.rings - 1];
    const u = prev ? prev[3] + (r > 0 && prev[2] > 0 ? Math.hypot(x - prev[0], z - prev[1]) : 0.0) : 0;
    ringPts.push([x, z, r, u]); T.rings++;
    return true;
  }
  function refresh(i0) {
    // recompute rings i0..end with tangents from neighbours
    for (let i = Math.max(0, i0); i < T.rings; i++) {
      const p = ringPts[i]; let tx = 0, tz = 0;
      if (p[2] < TUNNEL_R * 0.99) { // cap ring: look forward (or backward at the closing cap)
        for (let k = 1; k <= 6 && Math.abs(tx) + Math.abs(tz) < 1e-3; k++) { const b = ringPts[i + k]; if (b) { tx = b[0] - p[0]; tz = b[1] - p[1]; } }
        for (let k = 1; k <= 6 && Math.abs(tx) + Math.abs(tz) < 1e-3; k++) { const a = ringPts[i - k]; if (a) { tx = p[0] - a[0]; tz = p[1] - a[1]; } }
      } else { const a = ringPts[i - 1] || p, b = ringPts[i + 1] || p; tx = b[0] - a[0]; tz = b[1] - a[1]; }
      if (Math.abs(tx) + Math.abs(tz) < 1e-4) { tx = 1; tz = 0; }
      writeRing(i, p[0], p[1], tx, tz, p[2], p[3]);
    }
    flush();
  }
  function closeStrand() {
    if (T.rings < 2 || T.lastBreak) return; const a = T.pts[T.pts.length - 2], b = T.pts[T.pts.length - 1]; if (!b) return;
    let dx = a ? b[0] - a[0] : 1, dz = a ? b[1] - a[1] : 0; const L = Math.hypot(dx, dz) || 1; dx /= L; dz /= L;
    pushRing(b[0] + dx * 0.35, b[1] + dz * 0.35, TUNNEL_R * 0.62); pushRing(b[0] + dx * 0.6, b[1] + dz * 0.6, 0);
    refresh(T.rings - 4); T.lastBreak = true;
  }

  // ---------------- public API
  const gate = [HOME_C.x + Math.cos(HOME_C.gateAng) * (HOME_C.fenceR + 0.2), HOME_C.z + Math.sin(HOME_C.gateAng) * (HOME_C.fenceR + 0.2)];
  const addHash = (x, z, i) => { const k = hash(x, z); let a = T.hash.get(k); if (!a) { a = []; T.hash.set(k, a); } a.push(i); };
  function addPoint(x, z) {
    const idx = T.pts.length; const last = T.pts[idx - 1];
    if (T.lastBreak) {
      // closing cap at old end + opening cap at the new start
      pushRing(x, z, 0); pushRing(x, z, TUNNEL_R * 0.6); T.lastBreak = false;
    }
    T.pts.push([x, z]); addHash(x, z, idx);
    pushRing(x, z, TUNNEL_R);
    if (ringPts[T.rings - 2] && ringPts[T.rings - 2][2] < TUNNEL_R && ringPts[T.rings - 2][2] > 0) ringPts[T.rings - 2][2] = TUNNEL_R * 0.85;
    refresh(T.rings - 4);
  }
  T.pointCount = () => T.pts.length;
  T.near = (x, z, r = SAFE_R) => {
    const r2 = r * r; const cx = Math.floor(x / 4), cz = Math.floor(z / 4);
    for (let ox = -1; ox <= 1; ox++) for (let oz = -1; oz <= 1; oz++) { const a = T.hash.get((cx + ox + 5000) * 10007 + (cz + oz + 5000)); if (!a) continue; for (const i of a) { const p = T.pts[i]; const dx = p[0] - x, dz = p[1] - z; if (dx * dx + dz * dz < r2) return true; } }
    return false;
  };
  T.distTo = (x, z) => { let best = 1e9; const cx = Math.floor(x / 4), cz = Math.floor(z / 4); for (let ox = -1; ox <= 1; ox++) for (let oz = -1; oz <= 1; oz++) { const a = T.hash.get((cx + ox + 5000) * 10007 + (cz + oz + 5000)); if (!a) continue; for (const i of a) { const p = T.pts[i]; const d = Math.hypot(p[0] - x, p[1] - z); if (d < best) best = d; } } return best; };
  const insideHome = (x, z) => Math.hypot(x - HOME_C.x, z - HOME_C.z) < HOME_C.fenceR + 1.0;
  T.homeSafe = insideHome;
  T.safeAt = (x, z) => insideHome(x, z) || T.near(x, z, SAFE_R);

  let lastX = null, lastZ = null;
  T.track = (x, z) => {
    if (insideHome(x, z)) { if (T.pts.length && lastX !== null) closeStrand(); lastX = null; return; }
    if (lastX === null) { // just left home: start at the gate
      T.lastBreak = true; addPoint(gate[0], gate[1]); lastX = gate[0]; lastZ = gate[1];
    }
    const d = Math.hypot(x - lastX, z - lastZ);
    if (d >= STEP) { const n = Math.floor(d / STEP); for (let i = 1; i <= n; i++) { const t = i * STEP / d; addPoint(lastX + (x - lastX) * t, lastZ + (z - lastZ) * t); } lastX = T.pts[T.pts.length - 1][0]; lastZ = T.pts[T.pts.length - 1][1]; }
  };

  // ---------------- lights along the trail near the camera
  for (let i = 0; i < (opts.simple ? 0 : 5); i++) { const l = new THREE.PointLight(i % 2 ? 0xffd9a0 : 0xffb6e0, 0, 16, 1.8); l.position.set(0, 1.6, 0); root.add(l); T.lights.push(l); }

  // ---------------- sparkles (heaven) + fight sparks (frontier)
  const mkP = (N, size) => { const g = new THREE.BufferGeometry(); const pos = new Float32Array(N * 3), col = new Float32Array(N * 3); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3)); const p = new THREE.Points(g, new THREE.PointsMaterial({ size, map: DOT, alphaTest: 0.01, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true, toneMapped: false })); p.frustumCulled = false; root.add(p); return { p, pos, col, N, life: new Float32Array(N), max: new Float32Array(N).fill(1), base: new Float32Array(N * 3), vel: new Float32Array(N * 3) }; };
  const SP = opts.simple ? null : mkP(520, 0.34), FP = opts.simple ? null : mkP(260, 0.3);
  const HC = [[1, 0.9, 0.5], [1, 0.65, 0.85], [1, 1, 1], [0.6, 0.95, 1], [1, 0.95, 0.7]];
  const FCOL = [[1, 0.15, 0.2], [1, 0.1, 0.6], [0.1, 0.95, 1], [0.7, 1, 0.1], [1, 0.5, 0.1]];
  T.update = (t, dt, camX, camZ, camDist) => {
    U.uTime.value = t;
    if (opts.simple) return;
    const vis = camDist < 420; root.visible = true; SP.p.visible = FP.p.visible = camDist < 150;
    T.tNear -= dt;
    if (T.tNear <= 0) { // collect points near camera focus
      T.tNear = 0.4; T.sparkNear.length = 0; const r2 = 90 * 90;
      for (let i = 0; i < T.pts.length; i++) { const p = T.pts[i]; const dx = p[0] - camX, dz = p[1] - camZ; if (dx * dx + dz * dz < r2) T.sparkNear.push(i); }
      // lights at spaced points nearest to the camera
      const cand = T.sparkNear.map(i => [Math.hypot(T.pts[i][0] - camX, T.pts[i][1] - camZ), i]).sort((a, b) => a[0] - b[0]);
      const chosen = [];
      for (const [d, i] of cand) { if (chosen.length >= T.lights.length) break; const p = T.pts[i]; if (chosen.every(q => Math.hypot(T.pts[q][0] - p[0], T.pts[q][1] - p[1]) > 12)) chosen.push(i); }
      T.lights.forEach((l, k) => { if (k < chosen.length) { const p = T.pts[chosen[k]]; l.position.set(p[0], 1.8, p[1]); l.userData.on = 1; } else l.userData.on = 0; });
    }
    T.lights.forEach((l, k) => { const target = (l.userData.on ? 22 + Math.sin(t * 2 + k) * 4 : 0); l.intensity += (target - l.intensity) * Math.min(1, dt * 4); });
    const near = T.sparkNear; if (!near.length || camDist > 150) return;
    const upd = (S, heaven) => {
      for (let i = 0; i < S.N; i++) {
        S.life[i] -= dt;
        if (S.life[i] <= 0) {
          const pi = near[(R() * near.length) | 0]; const p = T.pts[pi]; const q = T.pts[Math.min(T.pts.length - 1, pi + 1)] || p; let tx = q[0] - p[0], tz = q[1] - p[1]; const L = Math.hypot(tx, tz) || 1; tx /= L; tz /= L; const sx = -tz, sz = tx;
          const ox = heaven ? (R() - 0.5) * 2 * (TUNNEL_R + AURA_W * 0.7) : ((R() < 0.5 ? -1 : 1) * (TUNNEL_R + AURA_W * (0.45 + R() * 0.35)));
          S.pos[i * 3] = p[0] + sx * ox; S.pos[i * 3 + 1] = 0.15 + R() * 1.6; S.pos[i * 3 + 2] = p[1] + sz * ox;
          S.vel[i * 3] = (R() - 0.5) * (heaven ? 0.25 : 2.2); S.vel[i * 3 + 1] = heaven ? 0.25 + R() * 0.55 : (R() - 0.3) * 2.0; S.vel[i * 3 + 2] = (R() - 0.5) * (heaven ? 0.25 : 2.2);
          S.life[i] = heaven ? 1.6 + R() * 2.6 : 0.25 + R() * 0.55; S.max[i] = S.life[i];
          S.base.set((heaven ? HC : FCOL)[(R() * 5) | 0], i * 3);
        }
        S.pos[i * 3] += S.vel[i * 3] * dt; S.pos[i * 3 + 1] += S.vel[i * 3 + 1] * dt; S.pos[i * 3 + 2] += S.vel[i * 3 + 2] * dt;
        const l = S.life[i], m = S.max[i]; const f = clamp(Math.min(l / (m * 0.4), (m - l) / (m * 0.15 + 1e-3)), 0, 1);
        S.col[i * 3] = S.base[i * 3] * f; S.col[i * 3 + 1] = S.base[i * 3 + 1] * f; S.col[i * 3 + 2] = S.base[i * 3 + 2] * f;
      }
      S.p.geometry.attributes.position.needsUpdate = true; S.p.geometry.attributes.color.needsUpdate = true;
    };
    upd(SP, true); upd(FP, false);
  };
  T.setTint = (rgb, amt) => { U.uTint.value.set(rgb[0], rgb[1], rgb[2]); U.uAmt.value = amt; };
  T.root = root; T.gate = gate; T.shellMat = shellMat;
  return T;
}
