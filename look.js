import * as THREE from 'three';
import { Geo, mulberry32, lerp } from './util.js';
import { chunked } from './props.js';
import { makeGlow } from './textures.js';

function containerTex() {
  const W = 512, H = 256, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); const r = mulberry32(5);
  x.fillStyle = '#c9c9c9'; x.fillRect(0, 0, W, H);
  for (let i = 0; i < W; i += 16) { x.fillStyle = 'rgba(0,0,0,0.30)'; x.fillRect(i, 0, 6, H); x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(i + 8, 0, 3, H); }
  for (let i = 0; i < 40; i++) { const g = x.createLinearGradient(0, 0, 0, H); const px = r() * W, w = 10 + r() * 40; g.addColorStop(0, 'rgba(120,60,20,0)'); g.addColorStop(1, `rgba(120,55,20,${0.2 + r() * 0.4})`); x.fillStyle = g; x.fillRect(px, 0, w, H); }
  for (let i = 0; i < 220; i++) { x.fillStyle = r() < 0.5 ? 'rgba(0,0,0,0.18)' : 'rgba(255,225,190,0.12)'; x.fillRect(r() * W, r() * H, 1 + r() * 4, 1 + r() * 3); }
  x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(0, 0, W, 10); x.fillRect(0, H - 14, W, 14); x.fillRect(0, 0, 10, H); x.fillRect(W - 10, 0, 10, H);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}

// "Dämmerung": blaugraue Nacht, warme Laternen, nasser Asphalt, Container/Fässer/Sandsäcke.
// Ändert NICHT die Anordnung von Straßen, Häusern, Stationen. Neue Props nur auf freien Flächen
// (Klasse 0), werden nicht als Hindernisse eingetragen.
export function applyLook(world, scene, DATA, Q) {
  const M = world.mats;
  // --- Materialien: dunkler, kühler, nasser ---
  M.road.color.set(0x8c96a8); M.road.roughness = 0.26; M.road.metalness = 0.18;
  M.ground.color.set(0xa4aab8);
  M.grass.color.set(0x7b9a6c);
  M.meadow.color.set(0x8f9a6a);
  M.side.color.set(0x8a8d96);
  M.curb.color.set(0x55585f);
  M.marking.color.set(0xb8b49a);
  if (M.plain) M.plain.roughness = 0.85;

  const S = world.S, R = mulberry32(777);
  const free = (x, z) => {
    // nur Klasse 0 (freie Fläche), nie Straße/Gebäude/Wasser
    if (world.clsAt(x, z) !== 0) return false;
    for (const o of [[3, 0], [-3, 0], [0, 3], [0, -3]]) { const c = world.clsAt(x + o[0], z + o[1]); if (c === 2 || c === 3 || c === 4) return false; }
    return true;
  };
  const homeD = (x, z) => Math.hypot(x + 2, z + 3);

  // --- Geometrien ---
  const crate = (g, w, h, d, col, rib) => {
    g.box(0, h / 2, 0, w, h, d, 0, col);
    if (rib) for (let i = -2; i <= 2; i++) { g.box(i * w / 5.2, h / 2, d / 2 + 0.02, 0.07, h * 0.96, 0.05, 0, col.map(v => v * 0.72), 1, false); g.box(i * w / 5.2, h / 2, -d / 2 - 0.02, 0.07, h * 0.96, 0.05, 0, col.map(v => v * 0.72), 1, false); }
  };
  const cont = new Geo(); crate(cont, 6.0, 2.6, 2.4, [1, 1, 1], true);
  const contHi = new Geo(); contHi.box(0, 0, 0, 0.01, 0.01, 0.01, 0, [1, 1, 1]); // placeholder to keep API simple
  const barrel = new Geo();
  { const cyl = new THREE.CylinderGeometry(0.34, 0.34, 0.95, 10, 1).toNonIndexed(); cyl.translate(0, 0.475, 0);
    const p = cyl.attributes.position, n = cyl.attributes.normal;
    for (let i = 0; i < p.count; i += 3) barrel.tri([p.getX(i), p.getY(i), p.getZ(i)], [p.getX(i + 1), p.getY(i + 1), p.getZ(i + 1)], [p.getX(i + 2), p.getY(i + 2), p.getZ(i + 2)], [0, 0], [1, 0], [0, 1], [1, 1, 1], [n.getX(i), n.getY(i), n.getZ(i)]);
    barrel.box(0, 0.5, 0, 0.72, 0.08, 0.72, 0, [0.35, 0.3, 0.2], 1, false); }
  const sand = new Geo();
  for (let i = 0; i < 5; i++) sand.box(-1.6 + i * 0.8, 0.22, 0, 0.78, 0.44, 0.5, 0, [0.62, 0.55, 0.42]);
  for (let i = 0; i < 4; i++) sand.box(-1.2 + i * 0.8, 0.62, 0, 0.78, 0.4, 0.5, 0, [0.58, 0.51, 0.39]);
  for (let i = 0; i < 3; i++) sand.box(-0.8 + i * 0.8, 0.98, 0, 0.78, 0.36, 0.5, 0, [0.55, 0.49, 0.37]);
  const sign = new Geo();
  sign.box(0, 0.7, 0, 0.06, 1.4, 0.06, 0, [0.2, 0.2, 0.2], 1, false);
  sign.box(0, 1.5, 0, 0.9, 0.9, 0.05, Math.PI / 4, [0.95, 0.78, 0.1]);
  sign.box(0, 1.5, 0.03, 0.4, 0.4, 0.04, Math.PI / 4, [0.1, 0.1, 0.1], 1, false);
  const std = (rough, metal) => new THREE.MeshStandardMaterial({ vertexColors: true, roughness: rough, metalness: metal });

  const CONT_COL = [0x7a4030, 0x2f5068, 0x35563c, 0x8a6a26, 0x5a3030, 0x4a5560];
  const BAR_COL = [0xb8962e, 0x8a3a2a, 0x4a6a4a, 0x6a6a72];
  const contItems = [], barItems = [], sandItems = [], signItems = [], glowItems = [], greenGlow = [];

  // entlang der Straßenmittellinien, seitlich neben der Straße
  for (const cl of DATA.center) {
    if (cl.w < 8) continue;
    const pts = cl.p.map(q => world.W2(q[0], q[1]));
    let len = 0; for (let i = 0; i < pts.length - 1; i++) len += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    const n = Math.floor(len / 24);
    for (let k = 0; k < n; k++) {
      let t = R() * len, acc = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const L = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
        if (acc + L >= t) {
          const f = (t - acc) / L, dx = (pts[i + 1][0] - pts[i][0]) / L, dz = (pts[i + 1][1] - pts[i][1]) / L;
          const side = R() < 0.5 ? 1 : -1;
          const lat = side * (cl.w * S / 2 + 2.2 + R() * 5);
          const x = lerp(pts[i][0], pts[i + 1][0], f) - dz * lat, z = lerp(pts[i][1], pts[i + 1][1], f) + dx * lat;
          if (homeD(x, z) < 26 || !free(x, z)) break;
          const rot = Math.atan2(dx, dz) + Math.PI / 2 + (R() - 0.5) * 0.35;
          const kind = R();
          if (kind < 0.30) {
            const c = CONT_COL[(R() * CONT_COL.length) | 0];
            contItems.push({ x, z, y: 0, rot, sx: 1, color: c });
            if (R() < 0.45) contItems.push({ x: x + Math.sin(rot) * 0.2, z: z + Math.cos(rot) * 0.2, y: 2.6, rot: rot + (R() - 0.5) * 0.12, sx: 1, color: CONT_COL[(R() * CONT_COL.length) | 0] });
            if (R() < 0.4) contItems.push({ x: x + Math.cos(rot) * 2.6, z: z - Math.sin(rot) * 2.6, y: 0, rot, sx: 1, color: CONT_COL[(R() * CONT_COL.length) | 0] });
          } else if (kind < 0.62) {
            const m = 2 + ((R() * 4) | 0);
            for (let b = 0; b < m; b++) { const bx = x + (R() - 0.5) * 1.8, bz = z + (R() - 0.5) * 1.8; barItems.push({ x: bx, z: bz, y: 0, rot: R() * 6, sx: 1, color: BAR_COL[(R() * BAR_COL.length) | 0] }); }
            if (R() < 0.5) greenGlow.push({ x, z, y: 0.25, rot: 0, sx: 1, color: 0x8cff6a });
          } else if (kind < 0.82) {
            sandItems.push({ x, z, y: 0, rot, sx: 1, color: 0xffffff });
          } else {
            signItems.push({ x, z, y: 0, rot: rot + (R() - 0.5), sx: 1, color: 0xffffff });
          }
          break;
        }
        acc += L;
      }
    }
  }
  const sh = { shadow: Q.shadows, receive: false };
  const ct = containerTex(); const boxGeo = new THREE.BoxGeometry(6.0, 2.6, 2.4); boxGeo.translate(0, 1.3, 0);
  const cmat = new THREE.MeshStandardMaterial({ map: ct, roughness: 0.6, metalness: 0.4 });
  chunked(world.root, boxGeo, cmat, contItems, 120, sh);
  if (world.roofConts) { const rg2 = new THREE.BoxGeometry(6.0, 2.6, 2.4); chunked(world.root, rg2, cmat, world.roofConts, 120, sh); }
  chunked(world.root, barrel.toGeometry(), std(0.5, 0.5), barItems, 120, sh);
  chunked(world.root, sand.toGeometry(), std(0.95, 0.0), sandItems, 120, sh);
  chunked(world.root, sign.toGeometry(), std(0.6, 0.2), signItems, 120, { shadow: false });
  // grünes Leuchten bei einigen Fässern
  const glow = makeGlow([[0, 'rgba(255,255,255,0.55)'], [0.35, 'rgba(255,255,255,0.2)'], [1, 'rgba(255,255,255,0)']]);
  const pg = new THREE.PlaneGeometry(6, 6); pg.rotateX(-Math.PI / 2);
  const pm = new THREE.MeshBasicMaterial({ map: glow, transparent: true, depthWrite: false, opacity: 0.8, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -9, polygonOffsetUnits: -9 });
  chunked(world.root, pg, pm, greenGlow, 120);

  // --- Horror-Details: Blutspuren auf Straßen, giftige Pfützen ---
  {
    const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); const rr = mulberry32(31);
    x.clearRect(0, 0, 256, 256);
    for (let k = 0; k < 3; k++) { // Schleifspur
      x.strokeStyle = `rgba(${70 + rr() * 20 | 0},4,6,${0.55 + rr() * 0.3})`; x.lineCap = 'round'; x.lineWidth = 10 + rr() * 14;
      x.beginPath(); let px = 20 + rr() * 40, py = 60 + k * 60; x.moveTo(px, py); for (let i = 0; i < 6; i++) { px += 30 + rr() * 18; py += (rr() - 0.5) * 36; x.lineTo(px, py); } x.stroke();
    }
    for (let k = 0; k < 40; k++) { const a = rr() * 6.28, d = rr() * 100, rad = 2 + rr() * 9; x.fillStyle = `rgba(${60 + rr() * 30 | 0},3,5,${0.5 + rr() * 0.4})`; x.beginPath(); x.arc(128 + Math.cos(a) * d, 128 + Math.sin(a) * d, rad, 0, 7); x.fill(); }
    const bt = new THREE.CanvasTexture(c); bt.colorSpace = THREE.SRGBColorSpace; bt.anisotropy = 4;
    const bgeo = new THREE.PlaneGeometry(6, 6); bgeo.rotateX(-Math.PI / 2);
    const bmat = new THREE.MeshStandardMaterial({ map: bt, transparent: true, depthWrite: false, roughness: 0.25, metalness: 0.1, polygonOffset: true, polygonOffsetFactor: -7, polygonOffsetUnits: -7 });
    const Rb = mulberry32(4711), blood = [];
    for (const cl of DATA.center) {
      if (cl.w < 6) continue; const pts = cl.p.map(q => world.W2(q[0], q[1]));
      let len = 0; for (let i = 0; i < pts.length - 1; i++) len += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
      const n = Math.floor(len / 42);
      for (let k = 0; k < n; k++) {
        let t = Rb() * len, acc = 0;
        for (let i = 0; i < pts.length - 1; i++) {
          const L = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
          if (acc + L >= t) { const f = (t - acc) / L, dx = (pts[i + 1][0] - pts[i][0]) / L, dz = (pts[i + 1][1] - pts[i][1]) / L, lat = (Rb() - 0.5) * cl.w * S * 0.6;
            const x2 = lerp(pts[i][0], pts[i + 1][0], f) - dz * lat, z2 = lerp(pts[i][1], pts[i + 1][1], f) + dx * lat;
            if (homeD(x2, z2) > 28 && world.clsAt(x2, z2) === 1) blood.push({ x: x2, z: z2, y: 0.05, rot: Math.atan2(dx, dz) + (Rb() - 0.5) * 0.5, sx: 0.8 + Rb() * 1.1 });
            break; }
          acc += L;
        }
      }
    }
    chunked(world.root, bgeo, bmat, blood, 120);
    // giftige Pfützen bei den Fässern
    const pc = document.createElement('canvas'); pc.width = pc.height = 128; const px2 = pc.getContext('2d'); const pgr = px2.createRadialGradient(64, 64, 6, 64, 64, 62);
    pgr.addColorStop(0, 'rgba(190,255,120,0.95)'); pgr.addColorStop(0.6, 'rgba(90,230,60,0.8)'); pgr.addColorStop(0.9, 'rgba(40,120,30,0.5)'); pgr.addColorStop(1, 'rgba(30,90,20,0)'); px2.fillStyle = pgr; px2.fillRect(0, 0, 128, 128);
    const ptex = new THREE.CanvasTexture(pc); ptex.colorSpace = THREE.SRGBColorSpace;
    const pgeo = new THREE.PlaneGeometry(3.2, 3.2); pgeo.rotateX(-Math.PI / 2);
    const pmat2 = new THREE.MeshBasicMaterial({ map: ptex, transparent: true, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -8, polygonOffsetUnits: -8 });
    chunked(world.root, pgeo, pmat2, greenGlow.map(p => ({ x: p.x + 0.8, z: p.z - 0.6, y: 0.08, rot: Rb() * 6, sx: 0.8 + Rb() * 1.2, color: 0xffffff })), 120);
    world.lookBlood = blood.length;
  }
  world.lookCounts = { cont: contItems.length, barrels: barItems.length, sand: sandItems.length, sign: signItems.length };

  addDetails(world, Q);
}

// ---- Gebäude-Details: weniger Kasten, mehr Leben ----
function addGeoTo(g, geo, m, col) {
  const gg = geo.index ? geo.toNonIndexed() : geo.clone(); gg.applyMatrix4(m);
  const p = gg.attributes.position, n = gg.attributes.normal;
  for (let i = 0; i < p.count; i += 3) g.tri([p.getX(i), p.getY(i), p.getZ(i)], [p.getX(i + 1), p.getY(i + 1), p.getZ(i + 1)], [p.getX(i + 2), p.getY(i + 2), p.getZ(i + 2)], [0, 0], [1, 0], [0, 1], col, [n.getX(i), n.getY(i), n.getZ(i)]);
}
function pip(pts, x, z) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const a = pts[i], b = pts[j]; if ((a[1] > z) !== (b[1] > z) && x < (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }

function addDetails(world, Q) {
  const g = new Geo(); const M = new THREE.Matrix4(), Qn = new THREE.Quaternion(), E = new THREE.Euler(), V = new THREE.Vector3(), Sc = new THREE.Vector3(1, 1, 1);
  const put = (geo, x, y, z, ry, col, sx = 1, sy = 1, sz = 1, rx = 0, rz = 0) => { E.set(rx, ry, rz); Qn.setFromEuler(E); V.set(x, y, z); Sc.set(sx, sy, sz); M.compose(V, Qn, Sc); addGeoTo(g, geo, M, col); };
  const cyl = new THREE.CylinderGeometry(1, 1, 1, 8, 1), cone = new THREE.ConeGeometry(1, 1, 8), bx = new THREE.BoxGeometry(1, 1, 1), ico = new THREE.IcosahedronGeometry(1, 0), disc = new THREE.CylinderGeometry(1, 1, 1, 12, 1);
  const RUST = [[0.42, 0.22, 0.14], [0.36, 0.2, 0.15], [0.3, 0.3, 0.32]];
  for (const b of world.bldInfo || []) {
    if (b.kind === 'castle') continue;
    const R = mulberry32(b.seed * 97 + 5), top = b.wallH + 0.03, bb = b.box;
    const spot = () => { for (let k = 0; k < 8; k++) { const u = (R() - 0.5) * bb.w * 0.6, v = (R() - 0.5) * bb.d * 0.6, c = Math.cos(bb.ang), sn = Math.sin(bb.ang); const x = bb.cx + u * c - v * sn, z = bb.cz + u * sn + v * c; if (pip(b.pts, x, z)) return [x, z]; } return null; };
    if (b.area > 25) {
      // Klimagerät mit Lüfter
      if (R() < 0.7) { const q = spot(); if (q) { put(bx, q[0], top + 0.45, q[1], R() * 3, [0.55, 0.57, 0.6], 1.3, 0.9, 1.0); put(disc, q[0], top + 0.93, q[1], 0, [0.12, 0.12, 0.13], 0.38, 0.05, 0.38); } }
      // Entlüftungsrohre mit Kappe
      const nv = 1 + ((R() * 3) | 0); for (let i = 0; i < nv; i++) { const q = spot(); if (!q) continue; const h = 0.9 + R() * 1.1, col = RUST[(R() * 3) | 0]; put(cyl, q[0], top + h / 2, q[1], 0, col, 0.16, h, 0.16); put(cone, q[0], top + h + 0.14, q[1], 0, col.map(v => v * 0.8), 0.28, 0.28, 0.28); }
      // Antenne
      if (R() < 0.5) { const q = spot(); if (q) { const h = 3 + R() * 3; put(cyl, q[0], top + h / 2, q[1], 0, [0.2, 0.2, 0.22], 0.04, h, 0.04); put(bx, q[0], top + h * 0.8, q[1], R() * 3, [0.2, 0.2, 0.22], 1.1, 0.03, 0.03); put(bx, q[0], top + h * 0.6, q[1], R() * 3, [0.2, 0.2, 0.22], 0.8, 0.03, 0.03); } }
      // Wassertank auf Stützen
      if (b.area > 70 && R() < 0.5) { const q = spot(); if (q) { const col = R() < 0.5 ? [0.34, 0.24, 0.17] : [0.2, 0.3, 0.4]; for (const [dx, dz] of [[-0.6, -0.6], [0.6, -0.6], [0.6, 0.6], [-0.6, 0.6]]) put(cyl, q[0] + dx, top + 0.6, q[1] + dz, 0, [0.15, 0.15, 0.16], 0.05, 1.2, 0.05); put(cyl, q[0], top + 1.8, q[1], 0, col, 0.95, 1.4, 0.95); put(cone, q[0], top + 2.75, q[1], 0, col.map(v => v * 0.8), 1.0, 0.5, 1.0); } }
      // Solarpaneel
      if (R() < 0.35) { const q = spot(); if (q) put(bx, q[0], top + 0.7, q[1], bb.ang, [0.08, 0.13, 0.22], 2.2, 0.06, 1.3, -0.5, 0); }
    }
    // Regenrohre und Kabel an der Wand
    for (let i = 0; i < b.pts.length; i++) {
      const a = b.pts[i], c2 = b.pts[(i + 1) % b.pts.length]; const dx = c2[0] - a[0], dz = c2[1] - a[1], L = Math.hypot(dx, dz); if (L < 4.5 || R() > 0.4) continue;
      const gs = b.orient > 0 ? 1 : -1, nx = gs * dz / L, nz = -gs * dx / L; const t = 0.08 + R() * 0.12; const x = a[0] + dx * t + nx * 0.1, z = a[1] + dz * t + nz * 0.1;
      put(cyl, x, b.wallH / 2, z, 0, [0.22, 0.22, 0.24], 0.07, b.wallH, 0.07);
      if (R() < 0.5) { const y = 2.4 + R() * (b.wallH - 3); put(bx, a[0] + dx * 0.5 + nx * 0.08, y, a[1] + dz * 0.5 + nz * 0.08, Math.atan2(dx, dz) + Math.PI / 2, [0.05, 0.05, 0.06], L * 0.9, 0.04, 0.04); }
    }
  }
  // Ruinen: Schutthaufen mit Armierungseisen
  for (const r of world.ruinInfo || []) {
    const R = mulberry32(r.seed * 53 + 9), n = 8 + Math.min(18, (r.area / 8) | 0), rad = Math.sqrt(r.area) * 0.5;
    for (let i = 0; i < n; i++) {
      const a = R() * 6.28, d = R() * rad, x = r.cen[0] + Math.cos(a) * d, z = r.cen[1] + Math.sin(a) * d; if (!pip(r.pts, x, z) && R() < 0.6) continue;
      const sz = 0.35 + R() * 0.9, gcol = 0.26 + R() * 0.16; put(ico, x, sz * 0.4, z, R() * 6, [gcol, gcol * 0.98, gcol * 0.95], sz * (0.8 + R() * 0.7), sz * 0.7, sz * (0.8 + R() * 0.6), R(), R());
    }
    for (let i = 0; i < 4; i++) { const a = R() * 6.28, d = R() * rad * 0.7; put(cyl, r.cen[0] + Math.cos(a) * d, 1.2, r.cen[1] + Math.sin(a) * d, 0, [0.3, 0.17, 0.12], 0.03, 2.4, 0.03, (R() - 0.5) * 0.5, (R() - 0.5) * 0.5); }
  }
  const mesh = new THREE.Mesh(g.toGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75, metalness: 0.3 }));
  mesh.castShadow = Q.shadows; mesh.receiveShadow = true; world.root.add(mesh);
  world.detailTris = g.p.length / 9;
}
