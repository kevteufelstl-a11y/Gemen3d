import * as THREE from 'three';
import { Geo, mulberry32, lerp, clamp } from './util.js';
import { makeGround, makeGlow, makeLabelTexture, makeDot } from './textures.js';
import { HOME_C } from './home.js';

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _c = new THREE.Color();
const UPV = new THREE.Vector3(0, 1, 0);

// ---------------------------------------------------------------- person
const SKINS = [[0.96, 0.78, 0.64], [0.86, 0.62, 0.46], [0.62, 0.4, 0.28], [0.98, 0.84, 0.72], [0.45, 0.3, 0.22]];
const BRIGHT = [[1, 0.35, 0.55], [1, 0.82, 0.2], [0.3, 0.8, 1], [0.55, 1, 0.45], [0.8, 0.5, 1], [1, 0.6, 0.2], [1, 1, 1], [0.2, 0.9, 0.8]];
const HAIR = [[0.15, 0.1, 0.07], [0.7, 0.5, 0.2], [0.85, 0.75, 0.4], [0.5, 0.2, 0.12], [0.08, 0.08, 0.1], [0.9, 0.9, 0.92]];

function makePerson(mat, o) {
  const g = new THREE.Group(); const fig = new THREE.Group(); g.add(fig);
  const sc = o.s || 1; fig.scale.setScalar(sc);
  const part = (geo) => { const m = new THREE.Mesh(geo.toGeometry(), mat); m.castShadow = true; return m; };
  const body = new Geo();
  body.box(0, 1.28, 0, 0.62, 0.72, 0.34, 0, o.shirt);
  if (o.dress) body.box(0, 0.86, 0, 0.8, 0.5, 0.5, 0, o.shirt); else body.box(0, 0.98, 0, 0.64, 0.12, 0.36, 0, o.pants);
  body.box(0, 1.8, 0, 0.34, 0.36, 0.34, 0, o.skin);
  body.box(0, 2.0, -0.02, 0.38, 0.14, 0.38, 0, o.hair); body.box(0, 1.84, -0.17, 0.38, 0.3, 0.06, 0, o.hair);
  if (o.long) { body.box(-0.19, 1.7, 0, 0.05, 0.5, 0.3, 0, o.hair); body.box(0.19, 1.7, 0, 0.05, 0.5, 0.3, 0, o.hair); }
  for (const s of [-1, 1]) { body.box(s * 0.085, 1.85, 0.175, 0.05, 0.06, 0.02, 0, [0.04, 0.04, 0.05], 1, false); body.box(s * 0.12, 1.75, 0.175, 0.06, 0.04, 0.02, 0, [1, 0.6, 0.65], 1, false); }
  body.box(0, 1.71, 0.175, 0.12, 0.03, 0.02, 0, [0.75, 0.08, 0.14], 1, false);
  for (const s of [-1, 1]) body.box(s * 0.065, 1.735, 0.175, 0.03, 0.04, 0.02, 0, [0.75, 0.08, 0.14], 1, false);
  if (o.hat) { body.box(0, 2.1, 0, 0.5, 0.05, 0.5, 0, o.hat); body.box(0, 2.2, 0, 0.3, 0.2, 0.3, 0, o.hat); }
  fig.add(part(body));
  const mkLimb = (x, y, geoFn) => { const gg = new Geo(); geoFn(gg); const piv = new THREE.Group(); piv.position.set(x, y, 0); piv.add(part(gg)); fig.add(piv); return piv; };
  const legs = o.dress ? [] : [mkLimb(-0.16, 0.95, (gg) => { gg.box(0, -0.45, 0, 0.22, 0.9, 0.24, 0, o.pants); gg.box(0, -0.93, 0.07, 0.24, 0.14, 0.38, 0, [0.95, 0.95, 0.95]); }), mkLimb(0.16, 0.95, (gg) => { gg.box(0, -0.45, 0, 0.22, 0.9, 0.24, 0, o.pants); gg.box(0, -0.93, 0.07, 0.24, 0.14, 0.38, 0, [0.95, 0.95, 0.95]); })];
  if (o.dress) for (const s of [-1, 1]) legs.push(mkLimb(s * 0.14, 0.62, (gg) => { gg.box(0, -0.3, 0, 0.16, 0.62, 0.18, 0, o.skin); gg.box(0, -0.62, 0.05, 0.18, 0.1, 0.3, 0, [0.9, 0.2, 0.4]); }));
  const arms = [mkLimb(-0.4, 1.55, (gg) => { gg.box(0, -0.3, 0, 0.17, 0.62, 0.19, 0, o.shirt); gg.box(0, -0.66, 0, 0.17, 0.14, 0.18, 0, o.skin); }), mkLimb(0.4, 1.55, (gg) => { gg.box(0, -0.3, 0, 0.17, 0.62, 0.19, 0, o.shirt); gg.box(0, -0.66, 0, 0.17, 0.14, 0.18, 0, o.skin); })];
  return { g, fig, arms, legs };
}

function dogGeo() {
  const g = new Geo(); const c = [0.85, 0.6, 0.3], d = [0.6, 0.38, 0.18];
  g.box(0, 0.55, 0, 0.45, 0.4, 0.9, 0, c); g.box(0, 0.78, 0.55, 0.34, 0.34, 0.36, 0, c); g.box(0, 0.74, 0.78, 0.18, 0.16, 0.2, 0, d); g.box(0, 0.78, 0.9, 0.06, 0.06, 0.04, 0, [0.05, 0.05, 0.05]);
  for (const s of [-1, 1]) { g.box(s * 0.17, 0.96, 0.5, 0.1, 0.2, 0.14, 0, d); g.box(s * 0.11, 0.86, 0.72, 0.05, 0.05, 0.03, 0, [0.05, 0.05, 0.05]); }
  g.box(0, 0.12, 0, 0.1, 0.1, 0.1, 0, c);
  return g;
}

// ---------------------------------------------------------------- builder
export function buildHeaven(world, scene, Q) {
  const C = HOME_C; const root = new THREE.Group(); world.root.add(root);
  const R = mulberry32(2024);
  const update = world.update;
  const blockers = world.homeBlockers || [];

  // -------- helpers
  const blockedAt = (x, z, pad = 0.6) => {
    for (const b of blockers) {
      if (b.type !== 'rect') continue; const c = Math.cos(b.rot), s = Math.sin(b.rot); const dx = x - b.cx, dz = z - b.cz;
      const u = dx * c - dz * s, v = dx * s + dz * c; if (Math.abs(u) < b.w / 2 + pad && Math.abs(v) < b.d / 2 + pad) return true;
    }
    // driveway + car area, terrace, fire
    { const dx = x - 4.0, dz = z - 5.0; const c = Math.cos(0.2), s = Math.sin(0.2); const u = dx * c - dz * s, v = dx * s + dz * c; if (Math.abs(u) < 4.8 && Math.abs(v) < 7.6) return true; }
    if (Math.abs(x - 6.2) < 4.2 && Math.abs(z + 9.0) < 3.6) return true;
    return false;
  };
  const inLawn = (x, z, r = C.fenceR - 0.9) => Math.hypot(x - C.x, z - C.z) < r;
  const rnd = (a, b) => a + R() * (b - a);

  // -------- lawn
  {
    const gt = makeGround('grass').clone(); gt.repeat.set(5, 5); gt.wrapS = gt.wrapT = THREE.RepeatWrapping; gt.needsUpdate = true;
    const lawn = new THREE.Mesh(new THREE.CircleGeometry(C.fenceR + 0.6, 72).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ map: gt, color: 0x9fd08a, emissive: 0x2a7a24, emissiveIntensity: 0.12, roughness: 1, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }));
    lawn.position.set(C.x, 0.035, C.z); lawn.receiveShadow = true; root.add(lawn);
    // golden light disc
    const gl = makeGlow([[0, 'rgba(255,240,180,0.10)'], [0.7, 'rgba(255,230,160,0.06)'], [1, 'rgba(255,220,140,0)']]);
    const d = new THREE.Mesh(new THREE.PlaneGeometry(C.R * 2.4, C.R * 2.4).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: gl, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -10, polygonOffsetUnits: -10 }));
    d.position.set(C.x, 0.4, C.z); root.add(d);
    // paved path gate -> door
    const pg = new Geo(); const gx = C.x + Math.cos(C.gateAng) * C.fenceR, gz = C.z + Math.sin(C.gateAng) * C.fenceR; const dx = world.porch[0], dz = world.porch[2] + 1.0;
    const L = Math.hypot(dx - gx, dz - gz), n = Math.floor(L / 0.95);
    for (let i = 0; i < n; i++) { const t = i / n, w = Math.sin(t * 6.28) * 0.9; const px = lerp(gx, dx, t) + w * (-(dz - gz) / L), pz = lerp(gz, dz, t) + w * ((dx - gx) / L); pg.box(px, 0.075, pz, 0.8, 0.06, 0.6, R() * 3, [0.98, 0.94, 0.86], 1, false); }
    root.add(new THREE.Mesh(pg.toGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, emissive: 0x554433, emissiveIntensity: 0.5 })));
  }

  // -------- flowers (instanced)
  {
    const FL = [0xff6fb0, 0xffe14a, 0xffffff, 0x7ac8ff, 0xff4a5a, 0xc89aff, 0xffa13a, 0xff9ad0];
    const N = 900; const petal = new Geo();
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a); const px = (u, v, y) => [ca * u - sa * v, y, sa * u + ca * v]; petal.tri(px(0, 0, 0.0), px(0.12, 0.05, 0.03), px(0.12, -0.05, 0.03), [0, 0], [1, 0], [0, 1], [1, 1, 1], [0, 1, 0]); petal.tri(px(0.12, 0.05, 0.03), px(0.2, 0, 0.05), px(0.12, -0.05, 0.03), [0, 0], [1, 0], [0, 1], [1, 1, 1], [0, 1, 0]); }
    const pGeo = petal.toGeometry();
    const cGeo = new THREE.IcosahedronGeometry(0.06, 0); cGeo.translate(0, 0.045, 0);
    const sGeo = new THREE.CylinderGeometry(0.012, 0.016, 1, 4); sGeo.translate(0, 0.5, 0);
    const bloom = new THREE.InstancedMesh(pGeo, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false }), N);
    const cen = new THREE.InstancedMesh(cGeo, new THREE.MeshBasicMaterial({ color: 0xffd23a }), N);
    const stem = new THREE.InstancedMesh(sGeo, new THREE.MeshStandardMaterial({ color: 0x4cc040, emissive: 0x1a5a14, roughness: 1 }), N);
    let k = 0; let tries = 0;
    while (k < N && tries++ < 20000) {
      const a = R() * 6.283, r = Math.sqrt(R()) * (C.fenceR - 0.7); const x = C.x + Math.cos(a) * r, z = C.z + Math.sin(a) * r;
      if (blockedAt(x, z, 0.5)) continue;
      const h = rnd(0.25, 0.75), s = rnd(1.1, 2.0), rot = R() * 6.28;
      // clustered colours: choose by noise cell
      const col = FL[(Math.floor(x / 2.4 + 100) * 7 + Math.floor(z / 2.4 + 100) * 3 + (R() < 0.25 ? 1 : 0)) % FL.length];
      _q.setFromAxisAngle(UPV, rot); _p.set(x, 0.04 + h, z); _s.set(s, s, s); _m.compose(_p, _q, _s); bloom.setMatrixAt(k, _m); _c.set(col); bloom.setColorAt(k, _c);
      _p.set(x, 0.04 + h, z); cen.setMatrixAt(k, _m.compose(_p, _q, _s.set(s, s, s)));
      _p.set(x, 0.04, z); _s.set(1, h, 1); stem.setMatrixAt(k, _m.compose(_p, _q, _s)); k++;
    }
    for (const im of [bloom, cen, stem]) { im.count = k; im.instanceMatrix.needsUpdate = true; im.frustumCulled = false; root.add(im); }
    bloom.instanceColor.needsUpdate = true;
    // sunflowers + tall tulips merged
    const sf = new Geo(); let sn = 0;
    for (let tries2 = 0; sn < 26 && tries2 < 400; tries2++) {
      const a = R() * 6.283, r = rnd(6, C.fenceR - 0.6); const x = C.x + Math.cos(a) * r, z = C.z + Math.sin(a) * r; if (blockedAt(x, z, 0.8)) continue; sn++;
      const h = rnd(1.3, 2.0), yaw = R() * 6.28; sf.box(x, h / 2, z, 0.07, h, 0.07, 0, [0.25, 0.65, 0.2], 1, false);
      sf.box(x - 0.18, h * 0.55, z, 0.34, 0.03, 0.12, 0, [0.3, 0.75, 0.25], 1, false);
      const hx = x + Math.sin(yaw) * 0.04, hz = z + Math.cos(yaw) * 0.04;
      for (let p = 0; p < 12; p++) { const pa = p / 12 * 6.28; sf.box(hx + Math.cos(pa) * 0.27 * Math.cos(yaw) , h + 0.02 + Math.sin(pa) * 0.27, hz - Math.cos(pa) * 0.27 * Math.sin(yaw), 0.16, 0.16, 0.04, yaw, [1, 0.82, 0.1], 1, false); }
      sf.box(hx, h + 0.02, hz, 0.28, 0.28, 0.07, yaw, [0.4, 0.22, 0.08], 1, false);
    }
    root.add(new THREE.Mesh(sf.toGeometry(), new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false })));
  }

  // -------- rainbow
  {
    const cols = [0xff3b3b, 0xff9a2b, 0xffe83a, 0x44e060, 0x3ab8ff, 0x4a5bff, 0xb04bff];
    const rb = new THREE.Group(); rb.position.set(C.x - 3, -0.4, C.z - 9); rb.rotation.y = 0.15;
    cols.forEach((c, i) => { const m = new THREE.Mesh(new THREE.TorusGeometry(15.2 - i * 0.56, 0.3, 8, 90, Math.PI), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); rb.add(m); });
    root.add(rb); world.rainbow = rb;
  }

  // -------- clouds (puffy, soft, drifting)
  const clouds = [];
  {
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, emissive: 0xffffff, emissiveIntensity: 0.25, transparent: true, opacity: 0.85 });
    const ico = new THREE.IcosahedronGeometry(1, 1); const pos = ico.attributes.position;
    for (let ci = 0; ci < 10; ci++) {
      const g = new Geo(); const nb = 4 + ((R() * 4) | 0);
      for (let b = 0; b < nb; b++) {
        const cx = (b - nb / 2) * 1.5 + rnd(-0.4, 0.4), cy = rnd(-0.3, 0.4), cz = rnd(-0.8, 0.8), sc = rnd(1.1, 2.0);
        for (let i = 0; i < pos.count; i += 3) { const V = (j) => [cx + pos.getX(i + j) * sc * 1.2, cy + Math.max(pos.getY(i + j), -0.35) * sc * 0.8, cz + pos.getZ(i + j) * sc]; const a = V(0), b2 = V(1), c = V(2); g.tri(a, b2, c, [0, 0], [0, 0], [0, 0], [1, 1, 1], [(a[0] + b2[0] + c[0]) / 3 - cx, (a[1] + b2[1] + c[1]) / 3 - cy, (a[2] + b2[2] + c[2]) / 3 - cz]); }
      }
      const m = new THREE.Mesh(g.toGeometry(), mat); const ang = ci / 10 * 6.28; const rad = rnd(22, 40);
      m.userData = { ang, rad, y: rnd(16, 26), sp: rnd(0.02, 0.05) * (R() < 0.5 ? 1 : -1), sc: rnd(0.8, 1.3) }; m.scale.setScalar(m.userData.sc);
      root.add(m); clouds.push(m);
    }
  }

  // -------- bunting
  {
    const bg = new Geo(); const ring = []; const n = 36;
    for (let i = 0; i < n; i++) { const a = i / n * 6.283; const dd = Math.abs(Math.atan2(Math.sin(a - C.gateAng), Math.cos(a - C.gateAng))); if (dd * C.fenceR < 3.0) continue; ring.push([a, C.x + Math.cos(a) * C.fenceR, C.z + Math.sin(a) * C.fenceR]); }
    const FC = [[1, 0.3, 0.5], [1, 0.85, 0.2], [0.3, 0.8, 1], [0.5, 1, 0.4], [0.8, 0.45, 1], [1, 0.6, 0.2]]; let ci = 0;
    for (let i = 0; i < ring.length - 1; i++) {
      const a = ring[i], b = ring[i + 1]; if (Math.hypot(a[1] - b[1], a[2] - b[2]) > 3.4) continue; const nf = 4;
      for (let f = 0; f < nf; f++) { const t = (f + 0.5) / nf; const x = lerp(a[1], b[1], t), z = lerp(a[2], b[2], t), sag = Math.sin(t * Math.PI) * 0.3; const y = 2.5 - sag; const dx = (b[1] - a[1]) / 4.6, dz = (b[2] - a[2]) / 4.6; const col = FC[(ci++) % FC.length]; bg.tri([x - dx * 0.5, y, z - dz * 0.5], [x + dx * 0.5, y, z + dz * 0.5], [x, y - 0.55, z], [0, 0], [0, 0], [0, 0], col, [0, 0, 1]); bg.tri([x + dx * 0.5, y, z + dz * 0.5], [x - dx * 0.5, y, z - dz * 0.5], [x, y - 0.55, z], [0, 0], [0, 0], [0, 0], col, [0, 0, -1]); }
    }
    const m = new THREE.Mesh(bg.toGeometry(), new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, toneMapped: false })); root.add(m);
  }

  // -------- balloons
  const balloons = [];
  {
    const bGeo = new THREE.SphereGeometry(0.4, 14, 12); bGeo.scale(1, 1.2, 1); bGeo.translate(0, 2.7, 0);
    const sGeo = new THREE.CylinderGeometry(0.008, 0.008, 2.3, 3); sGeo.translate(0, 1.15, 0);
    const smat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const spots = [[6.2, -9.0], [9.8, -5.0], [3.6, 12.0], [-1.0, 11.0], [5.0, 11.4], [-11, -1.8], [-8.5, 9.0], [11.5, -11], [1.5, -13.8]];
    for (const [sx, sz] of spots) for (let k = 0; k < 3; k++) {
      const c = BRIGHT[(R() * BRIGHT.length) | 0]; const gr = new THREE.Group(); gr.position.set(sx + rnd(-0.4, 0.4), 0.1, sz + rnd(-0.4, 0.4));
      const bm = new THREE.Mesh(bGeo, new THREE.MeshStandardMaterial({ color: new THREE.Color(c[0], c[1], c[2]), emissive: new THREE.Color(c[0], c[1], c[2]), emissiveIntensity: 0.45, roughness: 0.25, metalness: 0.1 }));
      gr.add(bm); gr.add(new THREE.Mesh(sGeo, smat)); gr.userData = { ph: R() * 6.28, amp: rnd(0.05, 0.12), len: rnd(0.8, 1.15) }; gr.scale.y = gr.userData.len; root.add(gr); balloons.push(gr);
    }
  }

  // -------- people
  const PM = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7, emissive: 0x2a2018, emissiveIntensity: 0.6 });
  const people = [];
  const fire = world.homeFire || [10.2, 1, -7];
  const mkP = (i, extra = {}) => { const p = makePerson(PM, Object.assign({ skin: SKINS[i % SKINS.length], shirt: BRIGHT[(i * 3) % BRIGHT.length], pants: BRIGHT[(i * 5 + 2) % BRIGHT.length].map(x => x * 0.55), hair: HAIR[(i * 2) % HAIR.length], dress: i % 3 === 1, long: i % 3 === 1, hat: i % 4 === 0 ? [1, 0.5, 0.6] : null }, extra)); root.add(p.g); return p; };
  // dance circle around fire
  const dancers = []; for (let i = 0; i < 7; i++) dancers.push(mkP(i + 1, { s: 0.98 + (i % 3) * 0.04 }));
  // ball kids
  const kidA = mkP(2, { s: 0.62, dress: false }), kidB = mkP(5, { s: 0.58, dress: true, long: true }), kidC = mkP(7, { s: 0.55, dress: false });
  // cheering at table
  const cheer = [mkP(9, { s: 1.0 }), mkP(10, { s: 0.95 }), mkP(11, { s: 0.65 })];
  // sunbathers / waving at gate
  const waver = mkP(12, { s: 1.02, hat: [1, 0.85, 0.3] });
  // ball
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 10), new THREE.MeshStandardMaterial({ color: 0xff4a6a, emissive: 0xff2a4a, emissiveIntensity: 0.5, roughness: 0.3 })); root.add(ball);
  // dog
  const dog = new THREE.Mesh(dogGeo().toGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, emissive: 0x332010, emissiveIntensity: 0.6 })); dog.castShadow = true; root.add(dog);

  // -------- hearts
  const heartTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); x.fillStyle = '#ff5a8a'; x.shadowColor = '#ff9ac0'; x.shadowBlur = 8; x.beginPath(); x.moveTo(32, 54); x.bezierCurveTo(2, 32, 10, 6, 32, 20); x.bezierCurveTo(54, 6, 62, 32, 32, 54); x.fill(); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  const DOT = makeDot();
  const hearts = []; for (let i = 0; i < 16; i++) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: heartTex, transparent: true, depthWrite: false, toneMapped: false })); sp.visible = false; sp.userData = { life: 0, vx: 0, vz: 0 }; root.add(sp); hearts.push(sp); }
  let heartT = 0;

  // -------- pollen + confetti
  const mkPts = (N, size, fn, add = true) => { const pos = new Float32Array(N * 3), col = new Float32Array(N * 3); for (let i = 0; i < N; i++) fn(i, pos, col); const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3)); const p = new THREE.Points(g, new THREE.PointsMaterial({ size, map: DOT, alphaTest: 0.01, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false, blending: add ? THREE.AdditiveBlending : THREE.NormalBlending, sizeAttenuation: true, toneMapped: false })); p.frustumCulled = false; root.add(p); return p; };
  const spawnIn = (pos, i, h0, h1) => { const a = R() * 6.28, r = Math.sqrt(R()) * (C.fenceR + 1); pos[i * 3] = C.x + Math.cos(a) * r; pos[i * 3 + 1] = rnd(h0, h1); pos[i * 3 + 2] = C.z + Math.sin(a) * r; };
  const pollen = mkPts(380, 0.34, (i, pos, col) => { spawnIn(pos, i, 0.2, 7); const c = [[1, 0.9, 0.5], [1, 0.7, 0.85], [1, 1, 1], [0.6, 1, 1]][i % 4]; col.set(c, i * 3); });
  const confetti = mkPts(260, 0.22, (i, pos, col) => { spawnIn(pos, i, 0.2, 14); const c = BRIGHT[i % BRIGHT.length]; col.set(c, i * 3); }, false);

  // -------- butterflies
  const flies = [];
  { const wg = new THREE.PlaneGeometry(0.22, 0.17); wg.translate(0.11, 0, 0);
    for (let i = 0; i < 16; i++) { const c = BRIGHT[i % BRIGHT.length]; const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(c[0], c[1], c[2]), side: THREE.DoubleSide, toneMapped: false }); const g = new THREE.Group(); const a = new THREE.Mesh(wg, mat), b = new THREE.Mesh(wg, mat); b.scale.x = -1; g.add(a, b); g.userData = { a, b, ph: R() * 6.28, cx: C.x + rnd(-11, 11), cz: C.z + rnd(-11, 11), rx: rnd(2, 5), rz: rnd(2, 5), sp: rnd(0.4, 0.9), y: rnd(0.8, 2.4) }; root.add(g); flies.push(g); } }

  // -------- welcome sign
  {
    const tex = makeLabelTexture('SAFEPLACE', { font: '900 84px "Segoe UI", Arial, sans-serif', color: '#ffffff', stroke: 'rgba(255,120,190,.95)', letter: 12 });
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false })); sp.scale.set(7, 0.9, 1);
    const gx = C.x + Math.cos(C.gateAng) * C.fenceR, gz = C.z + Math.sin(C.gateAng) * C.fenceR; sp.position.set(gx, 5.4, gz); root.add(sp); world.signSprite = sp;
  }

  // -------- lights (bright, warm, golden)
  const sun = new THREE.PointLight(0xffd7a0, 70, 60, 1.7); sun.position.set(C.x, 20, C.z); root.add(sun);
  const warmL = new THREE.PointLight(0xffc7e6, 45, 34, 1.7); warmL.position.set(C.x + 6, 6, C.z + 9); root.add(warmL);
  const warmR = new THREE.PointLight(0xc9f3ff, 35, 30, 1.7); warmR.position.set(C.x - 8, 6, C.z - 4); root.add(warmR);

  // -------- animation
  const fcx = fire[0], fcz = fire[2];
  const tableX = 6.2, tableZ = -9.0, ballY = 0.3;
  const kidPos = { A: [-9.6, 8.0], B: [-9.6 + 5.4, 8.0 + 0.8], C: [-12.6, 5.5] };
  const setP = (p, x, z, yaw, y = 0) => { p.g.position.set(x, y, z); p.fig.rotation.y = yaw; };
  const dogC = [-8.0, 11.0];
  let tP = 0;
  update.push((t, dt = 0.016) => {
    // dancers
    dancers.forEach((p, i) => { const a = t * 0.55 + i / dancers.length * Math.PI * 2; const r = 3.0; setP(p, fcx + Math.cos(a) * r, fcz + Math.sin(a) * r, -a - Math.PI, Math.abs(Math.sin(t * 5 + i)) * 0.28); const sw = Math.sin(t * 5 + i); p.arms[0].rotation.z = -2.2 + sw * 0.35; p.arms[1].rotation.z = 2.2 - sw * 0.35; p.arms[0].rotation.x = 0; p.arms[1].rotation.x = 0; p.legs.forEach((l, k) => { l.rotation.x = Math.sin(t * 5 + i + k * 3.14) * 0.7; }); });
    // ball kids
    const T = 0.5; const s = (t * T) % 2; const fr = s % 1; const dir = s < 1 ? 1 : -1;
    const A = kidPos.A, B = kidPos.B; setP({ g: kidA.g, fig: kidA.fig }, A[0], A[1], Math.atan2(B[0] - A[0], B[1] - A[1]), 0); setP({ g: kidB.g, fig: kidB.fig }, B[0], B[1], Math.atan2(A[0] - B[0], A[1] - B[1]), 0);
    const from = dir > 0 ? A : B, to = dir > 0 ? B : A; ball.position.set(lerp(from[0], to[0], fr), ballY + 0.6 + Math.sin(fr * Math.PI) * 1.9, lerp(from[1], to[1], fr)); ball.rotation.x += 0.1;
    const catchA = dir < 0 ? fr : 0, catchB = dir > 0 ? fr : 0; kidA.arms.forEach(a => a.rotation.x = -Math.PI * (0.3 + 0.6 * (catchA > 0.7 ? 1 : 0))); kidB.arms.forEach(a => a.rotation.x = -Math.PI * (0.3 + 0.6 * (catchB > 0.7 ? 1 : 0)));
    kidA.fig.position.y = Math.abs(Math.sin(t * 6)) * 0.12; kidB.fig.position.y = Math.abs(Math.sin(t * 6 + 1)) * 0.12;
    // third kid skipping in a circle
    { const a = t * 0.9; setP(kidC, kidPos.C[0] + Math.cos(a) * 2.2, kidPos.C[1] + Math.sin(a) * 2.2, -a + Math.PI, 0); kidC.fig.position.y = Math.abs(Math.sin(t * 7)) * 0.18; kidC.arms[0].rotation.z = -2.4; kidC.arms[1].rotation.z = 2.4; kidC.legs.forEach((l, k) => l.rotation.x = Math.sin(t * 7 + k * 3.14) * 0.9); }
    // cheering at table
    cheer.forEach((p, i) => { const x = tableX - 1.6 + i * 1.7, z = tableZ + 1.9 + (i === 2 ? 0.4 : 0); setP(p, x, z, Math.PI + (i - 1) * 0.3, 0); const j = Math.abs(Math.sin(t * 4 + i * 1.3)); p.fig.position.y = j * 0.3; p.arms[0].rotation.z = -2.6 + j * 0.3; p.arms[1].rotation.z = 2.6 - j * 0.3; });
    // waver near gate
    { const gx = C.x + Math.cos(C.gateAng) * (C.fenceR - 2.6) - 2.0, gz = C.z + Math.sin(C.gateAng) * (C.fenceR - 2.6); setP(waver, gx, gz, 0.5, 0); waver.arms[1].rotation.z = 2.5 + Math.sin(t * 8) * 0.4; waver.arms[0].rotation.z = -0.15; }
    // dog
    { const a = t * 1.3; const x = dogC[0] + Math.cos(a) * 3.2, z = dogC[1] + Math.sin(a) * 3.2; dog.position.set(x, Math.abs(Math.sin(t * 9)) * 0.12, z); dog.rotation.y = -a + Math.PI; dog.rotation.z = Math.sin(t * 9) * 0.05; }
    // balloons
    for (const b of balloons) { const u = b.userData; b.rotation.z = Math.sin(t * 1.2 + u.ph) * u.amp; b.rotation.x = Math.cos(t * 0.9 + u.ph) * u.amp; }
    // clouds
    for (const c of clouds) { const u = c.userData; u.ang += u.sp * 0.016; c.position.set(C.x + Math.cos(u.ang) * u.rad, u.y + Math.sin(t * 0.2 + u.ang * 3) * 0.4, C.z + Math.sin(u.ang) * u.rad); c.rotation.y = -u.ang; }
    // butterflies
    for (const f of flies) { const u = f.userData; const a = t * u.sp + u.ph; f.position.set(u.cx + Math.cos(a) * u.rx, u.y + Math.sin(a * 2.3) * 0.5, u.cz + Math.sin(a * 1.3) * u.rz); f.rotation.y = -a; const fl = Math.sin(t * 22 + u.ph) * 0.9; u.a.rotation.z = fl; u.b.rotation.z = -fl; }
    // pollen
    { const p = pollen.geometry.attributes.position; for (let i = 0; i < p.count; i++) { let y = p.getY(i) + 0.016 * (0.25 + (i % 5) * 0.08); p.setX(i, p.getX(i) + Math.sin(t * 0.6 + i) * 0.006); p.setZ(i, p.getZ(i) + Math.cos(t * 0.5 + i * 1.7) * 0.006); if (y > 8) y = 0.2; p.setY(i, y); } p.needsUpdate = true; }
    { const p = confetti.geometry.attributes.position; for (let i = 0; i < p.count; i++) { let y = p.getY(i) - 0.016 * (0.9 + (i % 4) * 0.25); p.setX(i, p.getX(i) + Math.sin(t * 1.4 + i) * 0.012); if (y < 0.1) { y = 14; } p.setY(i, y); } p.needsUpdate = true; }
    // hearts
    heartT -= 0.016; if (heartT <= 0) { heartT = 0.28; const h = hearts.find(h => !h.visible); if (h) { const src = [...dancers, kidA, kidB, kidC, ...cheer, waver][(R() * 14) | 0]; h.position.set(src.g.position.x, 2.6 * (src.fig.scale.x), src.g.position.z); h.userData.life = 2.4; h.userData.vx = rnd(-0.25, 0.25); h.userData.vz = rnd(-0.25, 0.25); h.visible = true; } }
    for (const h of hearts) { if (!h.visible) continue; const u = h.userData; u.life -= 0.016; h.position.y += 0.016 * 0.9; h.position.x += u.vx * 0.016; h.position.z += u.vz * 0.016; const s = 0.45 + 0.25 * Math.sin((2.4 - u.life) * 4); h.scale.set(s, s, 1); h.material.opacity = Math.min(1, u.life); if (u.life <= 0) h.visible = false; }
    // light flicker
    sun.intensity = 230 + Math.sin(t * 0.7) * 12;
    world.rainbow.children.forEach((m, i) => { m.material.opacity = 0.42 + 0.1 * Math.sin(t * 1.1 + i * 0.4); });
  });
  return { root };
}
