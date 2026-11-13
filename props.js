import * as THREE from 'three';
import { Geo, mulberry32, lerp, clamp } from './util.js';
import { makeGlow, makeLeaf } from './textures.js';

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _e = new THREE.Euler();
const UPV = new THREE.Vector3(0, 1, 0);

export function chunked(root, geo, mat, items, chunk = 100, opts = {}) {
  const groups = new Map();
  for (const it of items) { const k = Math.floor(it.x / chunk) + ',' + Math.floor(it.z / chunk); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(it); }
  const out = [];
  for (const [k, arr] of groups) {
    const im = new THREE.InstancedMesh(geo, mat, arr.length);
    const col = new THREE.Color();
    arr.forEach((it, i) => {
      _q.setFromAxisAngle(UPV, it.rot || 0); _p.set(it.x, it.y || 0, it.z); _s.set(it.sx || it.s || 1, it.sy || it.s || 1, it.sz || it.sx || it.s || 1);
      _m.compose(_p, _q, _s); im.setMatrixAt(i, _m);
      if (it.color !== undefined) { col.set(it.color); im.setColorAt(i, col); }
    });
    im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true;
    im.castShadow = !!opts.shadow; im.receiveShadow = !!opts.receive;
    im.computeBoundingSphere();
    root.add(im);
    let cx = 0, cz = 0; for (const it of arr) { cx += it.x; cz += it.z; }
    out.push({ mesh: im, cx: cx / arr.length, cz: cz / arr.length, n: arr.length });
  }
  return out;
}

export function makeTreeGeo(detail, blobs, seed, big = 1) {
  const R = mulberry32(seed); const g = new Geo();
  // trunk
  const trunk = new THREE.CylinderGeometry(0.16 * big, 0.28 * big, 3.2 * big, 6, 1).toNonIndexed(); trunk.translate(0, 1.6 * big, 0);
  const tp = trunk.attributes.position, tn = trunk.attributes.normal;
  for (let i = 0; i < tp.count; i += 3) g.tri([tp.getX(i), tp.getY(i), tp.getZ(i)], [tp.getX(i + 1), tp.getY(i + 1), tp.getZ(i + 1)], [tp.getX(i + 2), tp.getY(i + 2), tp.getZ(i + 2)], [0, 0], [1, 0], [0, 1], [0.34, 0.25, 0.18], [tn.getX(i), tn.getY(i), tn.getZ(i)]);
  for (let b = 0; b < blobs; b++) {
    const ico = new THREE.IcosahedronGeometry(1, detail);
    const ang = R() * 6.283, off = b === 0 ? 0 : (0.6 + R() * 1.1) * big;
    const cx = Math.cos(ang) * off, cz = Math.sin(ang) * off, cy = (3.6 + b * 0.9 + R() * 0.8) * big, rad = (1.9 + R() * 0.8 - b * 0.12) * big;
    const pos = ico.attributes.position;
    // jitter shared vertices consistently
    const jit = new Map();
    const key = (x, y, z) => ((x * 1000) | 0) + '_' + ((y * 1000) | 0) + '_' + ((z * 1000) | 0);
    for (let i = 0; i < pos.count; i++) {
      const k = key(pos.getX(i), pos.getY(i), pos.getZ(i)); if (!jit.has(k)) jit.set(k, detail >= 1 ? 0.9 + R() * 0.2 : 0.82 + R() * 0.36);
    }
    const V = (i) => { const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i); const j = jit.get(key(x, y, z)); return [cx + x * rad * j, cy + y * rad * 0.82 * j, cz + z * rad * j]; };
    const Nrm = (i) => { const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i); const l = Math.hypot(x, y * 1.2, z) || 1; return [x / l, y * 1.2 / l, z / l]; };
    const shade = (y) => { const t = clamp((y - cy) / rad * 0.5 + 0.5, 0, 1); return [lerp(0.16, 0.46, t), lerp(0.30, 0.66, t), lerp(0.11, 0.24, t)]; };
    const idx = ico.index; const triN = idx ? idx.count : pos.count;
    for (let i = 0; i < triN; i += 3) {
      const ia = idx ? idx.getX(i) : i, ib = idx ? idx.getX(i + 1) : i + 1, ic = idx ? idx.getX(i + 2) : i + 2;
      const a = V(ia), bb = V(ib), c = V(ic);
      const UVf = (q) => [(q[0] * 0.8 + q[2] * 0.6) * 0.32, (q[1] * 0.9 + q[2] * 0.3 - q[0] * 0.2) * 0.32];
      g.triS(a, bb, c, UVf(a), UVf(bb), UVf(c), [shade(a[1]), shade(bb[1]), shade(c[1])], Nrm(ia), Nrm(ib), Nrm(ic));
    }
  }
  return g.toGeometry();
}

export function addTrees(world, DATA, Q) {
  const S = world.S, R = mulberry32(555);
  const hi = makeTreeGeo(1, 4, 1), lo = makeTreeGeo(0, 2, 2);
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, map: makeLeaf(), envMapIntensity: 0.3 });
  world.treeMat = mat;
  const b = world.bounds; const items = [];
  const bad = (x, z) => { for (const [dx, dz] of [[0, 0], [2, 0], [-2, 0], [0, 2], [0, -2]]) { const c = world.clsAt(x + dx, z + dz); if (c === 1 || c === 2 || c === 3 || c === 4) return true; } return false; };
  const dens = Q.treeDensity;
  const palette = [0xb894d8, 0x9a78c4, 0x86b89a, 0xd08aae, 0x8f70b6, 0x70a89a];
  for (let x = b.x0 - 80; x < b.x1 + 80; x += 3.4) for (let z = b.z0 - 80; z < b.z1 + 80; z += 3.4) {
    const inside = x >= b.x0 && x <= b.x1 && z >= b.z0 && z <= b.z1;
    let p;
    if (inside) { const c = world.clsAt(x, z); p = c === 6 ? 0.11 : c === 5 ? 0.015 : c === 0 ? 0.05 : 0; for (const st of world.stations) { if (Math.hypot(x - st.x, z - st.z) < 11) { p = 0; break; } } if (c === 0) { /* gardens */ } }
    else { const d = Math.min(Math.abs(x - b.x0), Math.abs(x - b.x1), Math.abs(z - b.z0), Math.abs(z - b.z1)); const ed = (x < b.x0 ? b.x0 - x : x > b.x1 ? x - b.x1 : 0); const nz_ = 0.5 + 0.5 * Math.sin(x * 0.05 + z * 0.037) * Math.cos(z * 0.021 - x * 0.013); p = d < 55 * nz_ + 10 ? 0.38 : 0.0; }
    p *= dens; if (R() > p) continue;
    const jx = x + (R() - 0.5) * 2.6, jz = z + (R() - 0.5) * 2.6;
    if (inside && bad(jx, jz)) continue;
    if (Math.hypot(jx, jz) < 20) continue; // home compound handled separately
    const s = 0.85 + R() * 0.7;
    items.push({ x: jx, z: jz, rot: R() * 6.28, sx: s, sy: s * (0.9 + R() * 0.35), color: palette[(R() * palette.length) | 0] });
  }
  world.treeItems = items;
  const hiCh = chunked(world.root, hi, mat, items, 100, { shadow: Q.shadows, receive: false });
  const loCh = chunked(world.root, lo, mat, items, 100);
  // pair chunks by centre (same grouping => same order)
  const chunksHi = new Map(), chunksLo = new Map();
  for (const c of hiCh) chunksHi.set(Math.round(c.cx) + ',' + Math.round(c.cz), c);
  const pairs = [];
  for (let i = 0; i < hiCh.length; i++) pairs.push({ hi: hiCh[i], lo: loCh[i] });
  world.treeCount = items.length;
  world.treeLOD = (tx, tz) => {
    for (const p of pairs) { const d = Math.hypot(p.hi.cx - tx, p.hi.cz - tz); const near = d < 150; p.hi.mesh.visible = near; p.lo.mesh.visible = !near; }
  };
  world.treeLOD(0, 0);
}

export function addLamps(world, DATA) {
  const S = world.S, R = mulberry32(99);
  const items = [];
  for (const cl of DATA.center) {
    if (cl.w < 8) continue;
    const pts = cl.p.map(q => world.W2(q[0], q[1]));
    let acc = 14 + R() * 10, side = R() < 0.5 ? 1 : -1;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1]; const L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 1e-3) continue;
      const dx = (b[0] - a[0]) / L, dz = (b[1] - a[1]) / L; let pos = 0;
      while (acc <= L - pos) {
        pos += acc; acc = 36 + R() * 8;
        const x = a[0] + dx * pos, z = a[1] + dz * pos, off = cl.w * S / 2 + 0.7;
        const lx = x - dz * off * side, lz = z + dx * off * side; side = -side;
        if (world.clsAt(lx, lz) === 2) continue;
        items.push({ x: lx, z: lz, rot: Math.atan2(dx, dz) * 1, color: undefined, ax: -dz * side, az: dx * side });
      }
      acc -= (L - pos);
    }
  }
  // geometry
  const pole = new Geo();
  const cyl = new THREE.CylinderGeometry(0.07, 0.1, 6.4, 6, 1).toNonIndexed(); cyl.translate(0, 3.2, 0);
  const cp = cyl.attributes.position, cn = cyl.attributes.normal;
  for (let i = 0; i < cp.count; i += 3) pole.tri([cp.getX(i), cp.getY(i), cp.getZ(i)], [cp.getX(i + 1), cp.getY(i + 1), cp.getZ(i + 1)], [cp.getX(i + 2), cp.getY(i + 2), cp.getZ(i + 2)], [0, 0], [1, 0], [0, 1], [0.1, 0.1, 0.11], [cn.getX(i), cn.getY(i), cn.getZ(i)]);
  pole.box(0, 6.35, 0.5, 0.12, 0.12, 1.1, 0, [0.1, 0.1, 0.11]);
  const head = new Geo(); head.box(0, 6.22, 1.0, 0.5, 0.14, 0.9, 0, [1, 1, 1], 1, false);
  const poleMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.4 });
  const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const NEON = [0xffa94d, 0xffa94d, 0xffa94d, 0x4de1ff, 0xffa94d, 0x8cff6a, 0xffa94d, 0xff59d6];
  // lamps arm toward road: arm is along local +z; rotate so +z points to road centre
  const its = items.map((it, i) => ({ x: it.x, z: it.z, rot: Math.atan2(-it.ax, -it.az), sx: 1, color: NEON[(i * 7 + (i >> 2)) % NEON.length] }));
  chunked(world.root, pole.toGeometry(), poleMat, its, 120, { shadow: false });
  chunked(world.root, head.toGeometry(), headMat, its, 120);
  // light pools
  const glow = makeGlow([[0, 'rgba(255,255,255,0.5)'], [0.3, 'rgba(255,255,255,0.2)'], [0.7, 'rgba(255,255,255,0.05)'], [1, 'rgba(255,255,255,0)']]);
  const pg = new THREE.PlaneGeometry(13, 13); pg.rotateX(-Math.PI / 2);
  const pm = new THREE.MeshBasicMaterial({ map: glow, transparent: true, depthWrite: false, opacity: 0.7, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -8, polygonOffsetUnits: -8 });
  const poolItems = its.map(it => ({ x: it.x + Math.sin(it.rot) * 2.2, z: it.z + Math.cos(it.rot) * 2.2, y: 0.2, rot: 0, sx: 1, color: it.color }));
  chunked(world.root, pg, pm, poolItems, 120);
  world.lampCount = items.length; world.lampItems = its;
}

export function addRuinPools(world) {
  if (!world.ruinPools) return;
  const glow = makeGlow([[0, 'rgba(120,255,80,0.5)'], [0.3, 'rgba(100,255,70,0.2)'], [0.7, 'rgba(80,255,60,0.05)'], [1, 'rgba(60,255,40,0)']]);
  const pg = new THREE.PlaneGeometry(14, 14); pg.rotateX(-Math.PI / 2);
  const pm = new THREE.MeshBasicMaterial({ map: glow, transparent: true, depthWrite: false, opacity: 0.55, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -8, polygonOffsetUnits: -8 });
  chunked(world.root, pg, pm, world.ruinPools, 120);
}

export function addCars(world, DATA, Q) {
  const R = mulberry32(4242); const S = world.S;
  const g = new Geo(); const W = [1, 1, 1];
  g.box(0, 0.62, 0, 4.3, 0.85, 1.8, 0, W);
  g.box(-0.15, 1.28, 0, 2.3, 0.7, 1.6, 0, [0.82, 0.86, 0.9]);
  for (const sx of [-1.4, 1.4]) for (const sz of [-0.85, 0.85]) g.box(sx, 0.32, sz, 0.7, 0.64, 0.25, 0, [0.04, 0.04, 0.04]);
  g.box(-0.15, 1.3, 0, 2.32, 0.52, 1.62, 0, [0.05, 0.07, 0.09]);
  const items = [];
  const cols = [0x7a3b2e, 0x3d4f6a, 0x6f7377, 0x4d5a3c, 0xb3b0a4, 0x25272b, 0x8a6a2e, 0x5a2a2a];
  for (const cl of DATA.center) {
    if (cl.w < 10) continue;
    const pts = cl.p.map(q => world.W2(q[0], q[1]));
    let len = 0; for (let i = 0; i < pts.length - 1; i++) len += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    const n = Math.floor(len / 55 * (0.7 + R() * 0.6));
    for (let k = 0; k < n; k++) {
      let t = R() * len, acc = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const L = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
        if (acc + L >= t) {
          const f = (t - acc) / L, dx = (pts[i + 1][0] - pts[i][0]) / L, dz = (pts[i + 1][1] - pts[i][1]) / L;
          const lat = (R() - 0.5) * cl.w * S * 0.55;
          const x = lerp(pts[i][0], pts[i + 1][0], f) - dz * lat, z = lerp(pts[i][1], pts[i + 1][1], f) + dx * lat;
          if (Math.hypot(x, z) < 22) break;
          if (world.clsAt(x, z) !== 1) break;
          const rot = Math.atan2(dx, dz) - Math.PI / 2 + (R() < 0.15 ? Math.PI / 2 : 0) + (R() - 0.5) * 0.3 + (R() < 0.5 ? Math.PI : 0);
          const burnt = R() < 0.3;
          items.push({ x, z, y: 0.02, rot, sx: 1, color: burnt ? 0x2a2624 : cols[(R() * cols.length) | 0] });
          world.carItems = world.carItems || []; world.carItems.push({ x, z, burnt, rot });
          break;
        }
        acc += L;
      }
    }
  }
  chunked(world.root, g.toGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.3 }), items, 120, { shadow: Q.shadows });
  world.carCount = items.length;
}

// ---- generic fence + towers ----
export function fenceGeo(g, cx, cz, r, gapAng, gapW, opts = {}) {
  const segs = opts.segs || 36, h = opts.h || 1.9; const posts = [];
  for (let i = 0; i < segs; i++) {
    const a0 = i / segs * Math.PI * 2, a1 = (i + 1) / segs * Math.PI * 2, am = (a0 + a1) / 2;
    let dAng = Math.abs(((am - gapAng + Math.PI * 3) % (Math.PI * 2)) - Math.PI); // angular distance to gap
    const inGap = (Math.PI - dAng) * r < gapW / 2 + 0.01 || false;
    const dd = Math.abs(((am - gapAng + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI);
    if (dd * r < gapW / 2) continue;
    const x0 = cx + Math.cos(a0) * r, z0 = cz + Math.sin(a0) * r, x1 = cx + Math.cos(a1) * r, z1 = cz + Math.sin(a1) * r;
    const L = Math.hypot(x1 - x0, z1 - z0), yaw = -Math.atan2(z1 - z0, x1 - x0);
    const mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
    const cRail = opts.rail || [0.07, 0.09, 0.08], cPick = opts.picket || [0.09, 0.12, 0.1], cPost = opts.post || [0.12, 0.13, 0.12];
    g.box(mx, h - 0.1, mz, L, 0.07, 0.07, yaw, cRail, 1, false);
    g.box(mx, 0.45, mz, L, 0.06, 0.06, yaw, cRail, 1, false);
    // pickets
    const np = Math.max(2, Math.round(L / 0.32));
    for (let k = 0; k < np; k++) { const t = (k + 0.5) / np; g.box(lerp(x0, x1, t), h / 2, lerp(z0, z1, t), 0.04, h, 0.04, 0, cPick, 1, false); }
    posts.push([x0, z0]);
  }
  for (const p of posts) g.box(p[0], h / 2 + 0.15, p[1], 0.16, h + 0.3, 0.16, 0, opts.post || [0.12, 0.13, 0.12]);
  return posts;
}
export function towerGeo(g, x, z, h = 6.0, yaw = 0, col = null) {
  const c = col || [0.09, 0.14, 0.1];
  for (const [dx, dz] of [[-0.7, -0.7], [0.7, -0.7], [0.7, 0.7], [-0.7, 0.7]]) g.box(x + dx, h / 2, z + dz, 0.14, h, 0.14, 0, c, 1, false);
  for (const y of [1.5, 3.0, 4.5]) { g.box(x, y, z - 0.7, 1.5, 0.08, 0.08, 0, c, 1, false); g.box(x, y, z + 0.7, 1.5, 0.08, 0.08, 0, c, 1, false); g.box(x - 0.7, y, z, 0.08, 0.08, 1.5, 0, c, 1, false); g.box(x + 0.7, y, z, 0.08, 0.08, 1.5, 0, c, 1, false); }
  g.box(x, h + 0.05, z, 1.8, 0.14, 1.8, 0, col ? col.map(v => v * 0.95) : [0.12, 0.17, 0.12]);
  g.box(x, h + 0.55, z, 1.5, 0.9, 1.5, 0, col ? col.map(v => v * 0.9) : [0.1, 0.15, 0.11]);
}

export function addStations(world, Q) {
  const R = mulberry32(31337);
  const g = new Geo(), gl = new Geo();
  const ringTex = makeGlow([[0, 'rgba(90,255,90,0)'], [0.55, 'rgba(90,255,90,0)'], [0.78, 'rgba(90,255,90,0.55)'], [0.82, 'rgba(120,255,120,0.9)'], [0.86, 'rgba(90,255,90,0.35)'], [1, 'rgba(90,255,90,0)']]);
  const discTex = makeGlow([[0, 'rgba(70,255,70,0.30)'], [0.7, 'rgba(70,255,70,0.12)'], [1, 'rgba(70,255,70,0)']]);
  const rg = new THREE.PlaneGeometry(1, 1); rg.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -9, polygonOffsetUnits: -9 });
  const discMat = new THREE.MeshBasicMaterial({ map: discTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -9, polygonOffsetUnits: -9 });
  const beamMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, uniforms: { uTime: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: 'varying vec2 vUv; uniform float uTime; void main(){ float a=pow(1.0-vUv.y,1.8)*0.32; a*=0.75+0.25*sin(uTime*2.0+vUv.y*6.0); gl_FragColor=vec4(0.35,1.0,0.35,a);} '
  });
  const towerHead = new THREE.MeshBasicMaterial({ color: 0x66ff66 });
  const headItems = [];
  world.stationFx = [];
  for (const st of world.stations) {
    if (st.id === 0) continue; // home built separately
    const cx = st.wx, cz = st.wz;
    const ring = new THREE.Mesh(rg, ringMat); ring.scale.set(17, 1, 17); ring.position.set(cx, 0.3, cz); world.root.add(ring);
    const disc = new THREE.Mesh(rg, discMat); disc.scale.set(15, 1, 15); disc.position.set(cx, 0.28, cz); world.root.add(disc);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.9, 70, 14, 1, true), beamMat); beam.position.set(cx, 35, cz); world.root.add(beam);
    // towers + fence arcs
    const posts = fenceGeo(g, cx, cz, 7.4, Math.PI * 0.5, 2.6, { segs: 20, h: 1.6 });
    for (let k = 0; k < 4; k++) {
      const a = k * Math.PI / 2 + Math.PI / 4; const tx = cx + Math.cos(a) * 7.4, tz = cz + Math.sin(a) * 7.4;
      towerGeo(g, tx, tz, 5.2); headItems.push({ x: tx, y: 5.75, z: tz, sx: 1 });
    }
    world.stationFx.push({ ring, disc, st });
  }
  const mesh = new THREE.Mesh(g.toGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7, metalness: 0.4 })); mesh.castShadow = false; world.root.add(mesh);
  const hg = new THREE.BoxGeometry(0.7, 0.55, 0.7);
  const hm = new THREE.InstancedMesh(hg, towerHead, headItems.length);
  headItems.forEach((it, i) => { _m.makeTranslation(it.x, it.y, it.z); hm.setMatrixAt(i, _m); }); world.root.add(hm);
  world.beamMat = beamMat;
  world.update.push((t) => {
    beamMat.uniforms.uTime.value = t;
    for (const f of world.stationFx) { const s = 17 + Math.sin(t * 1.6 + f.st.id) * 0.8; f.ring.scale.set(s, 1, s); }
  });
}
