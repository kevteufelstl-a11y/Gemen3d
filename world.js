import * as THREE from 'three';
import { Geo, mulberry32, polyArea, polyCentroid, obb, lerp, clamp, mixCol, hexToRgb } from './util.js';
import { makeAsphalt, makeGround, makeFacade, makeRoofTiles, makeGlow, makeLabelTexture } from './textures.js';

const UP = [0, 1, 0];

export const STATIONS = [
  { id: 0, name: 'Das grüne Haus', short: 'START', px: null, desc: 'Startpunkt an der Hook. Sicherer Bereich unter der grünen Kuppel.', color: '#59ff5a' },
  { id: 1, name: 'Burg Gemen', short: 'BURG', px: [925, 668], desc: 'Die Wasserburg im Burgbezirk. Umgeben vom Wassergraben, nur über die Brücke erreichbar.', color: '#59ff5a' },
  { id: 2, name: 'Der Hof', short: 'HOF', px: [768, 905], desc: 'Der große U-förmige Gebäudekomplex nahe der Freiheit.', color: '#59ff5a' },
  { id: 3, name: 'Neustraße', short: 'ZEILE', px: [585, 1005], desc: 'Dichte Häuserzeile entlang der Neustraße, enge Gassen, viele Verstecke.', color: '#59ff5a' },
  { id: 4, name: 'Die Brücke', short: 'BRÜCKE', px: [800, 1098], desc: 'Die Waake kreuzt hier die Straße. Wichtiger Übergang.', color: '#59ff5a' },
  { id: 5, name: 'Kirche', short: 'KIRCHE', px: [428, 1158], desc: 'Das große Gebäude mit Apsis im Westen des Ortskerns.', color: '#59ff5a' },
  { id: 6, name: 'Südwiese', short: 'WIESE', px: [600, 1640], desc: 'Offene Wiese im Süden. Wenig Deckung, viel Sicht.', color: '#59ff5a' },
  { id: 7, name: 'Siedlung West', short: 'WEST', px: [128, 1370], desc: 'Wohnsiedlung am Teveskamp mit vielen kleinen Häusern.', color: '#59ff5a' },
];

const STREET_LABELS = [
  ['Ahauser Straße', 742, 1465, 56, 38], ['Hook', 556, 1287, -52, 16], ['Holzplatz', 628, 1193, -66, 26],
  ['Neustraße', 570, 990, 47, 28], ['Freiheit', 748, 1020, -48, 20], ['Achter de Waake', 832, 1055, -32, 38],
  ['Coesfelder Straße', 868, 1252, -24, 52], ['Burgbezirk', 1047, 935, 78, 26], ['Hagenstiege', 700, 337, -28, 40],
  ['Feldstiege', 175, 917, 2, 30], ['Bömelbergstraße', 372, 400, -23, 36], ['Teveskamp', 120, 1507, 12, 28],
  ['Dr.-Kubisch-Weg', 452, 1345, 90, 34], ['Neumühlenallee', 330, 1226, 2, 34], ['Goswinstraße', 235, 1076, -8, 28],
  ['Bocholter Aa', 620, 985, 53, 28],
];

export async function buildWorld(DATA, scene, Q) {
  const S = DATA.scale, HX = DATA.home[0], HY = DATA.home[1];
  const W2 = (px, py) => [(px - HX) * S, (py - HY) * S];
  const world = { S, HX, HY, W2, update: [], stations: [], blockers: [], lampPositions: [], fires: [] };
  const MAPW = DATA.w * S, MAPH = DATA.h * S;
  world.bounds = { x0: -HX * S, x1: (DATA.w - HX) * S, z0: -HY * S, z1: (DATA.h - HY) * S };

  // ---- class map ----
  const img = await new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = DATA.classmap; });
  const cc = document.createElement('canvas'); cc.width = DATA.w; cc.height = DATA.h;
  const cx = cc.getContext('2d'); cx.drawImage(img, 0, 0);
  const idata = cx.getImageData(0, 0, DATA.w, DATA.h).data;
  const CLS = new Uint8Array(DATA.w * DATA.h);
  for (let i = 0; i < CLS.length; i++) CLS[i] = idata[i * 4];
  world.cls = (px, py) => { px = px | 0; py = py | 0; if (px < 0 || py < 0 || px >= DATA.w || py >= DATA.h) return 0; return CLS[py * DATA.w + px]; };
  world.clsAt = (x, z) => world.cls(x / S + HX, z / S + HY);

  const R = mulberry32(20261019);
  const root = new THREE.Group(); scene.add(root); world.root = root;

  // ---- textures & materials ----
  const asphalt = makeAsphalt();
  const dirt = makeGround('dirt'), grass = makeGround('grass'), meadow = makeGround('meadow'), sidewalkT = makeGround('sidewalk');
  const facade = makeFacade('container'), facadeB = makeFacade('bunker'); const roofT = makeRoofTiles();
  const mats = {
    ground: new THREE.MeshStandardMaterial({ map: dirt, color: 0xe6d8c4, roughness: 1 }),
    grass: new THREE.MeshStandardMaterial({ map: grass, color: 0xc9e0b8, roughness: 1, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),
    meadow: new THREE.MeshStandardMaterial({ map: meadow, color: 0xdcd9a8, roughness: 1, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),
    road: new THREE.MeshStandardMaterial({ map: asphalt, color: 0xd0d4dc, roughness: 0.38, metalness: 0.08, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
    side: new THREE.MeshStandardMaterial({ map: sidewalkT, color: 0xb9b3aa, roughness: 0.9 }),
    curb: new THREE.MeshStandardMaterial({ color: 0x6d6a66, roughness: 0.95 }),
    water: new THREE.MeshStandardMaterial({ color: 0x0e2a30, roughness: 0.08, metalness: 0.55, emissive: 0x0b3a34, emissiveIntensity: 0.55, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }),
    wall: new THREE.MeshStandardMaterial({ map: facade.map, emissiveMap: facade.emissive, emissive: 0xffffff, emissiveIntensity: 1.9, vertexColors: true, roughness: 0.92 }),
    wallB: new THREE.MeshStandardMaterial({ map: facadeB.map, emissiveMap: facadeB.emissive, emissive: 0xffffff, emissiveIntensity: 1.9, vertexColors: true, roughness: 0.95 }),
    plain: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }),
    roof: new THREE.MeshStandardMaterial({ map: roofT, vertexColors: true, roughness: 0.85 }),
    marking: new THREE.MeshBasicMaterial({ color: 0x8f8e7c, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }),
  };
  mats.road.envMapIntensity = 1.6; mats.water.envMapIntensity = 2.0; mats.ground.envMapIntensity = 0.3; mats.grass.envMapIntensity = 0.3; mats.meadow.envMapIntensity = 0.3; mats.side.envMapIntensity = 0.5; mats.wall.envMapIntensity = 0.35; mats.plain.envMapIntensity = 0.35; mats.roof.envMapIntensity = 0.5;
  world.mats = mats;

  // ---- ground ----
  {
    const cxm = (world.bounds.x0 + world.bounds.x1) / 2, czm = (world.bounds.z0 + world.bounds.z1) / 2;
    const g = new THREE.PlaneGeometry(4000, 4000); g.rotateX(-Math.PI / 2);
    const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 4000 / 14, uv.getY(i) * 4000 / 14);
    const m = new THREE.Mesh(g, mats.ground); m.position.set(cxm, -0.02, czm); m.receiveShadow = true; root.add(m);
    world.groundMesh = m;
  }

  // ---- polygon helper ----
  function shapeGeo(shape, y, uvScale, col = [1, 1, 1], g = new Geo()) {
    const clean = (arr) => { const o = []; for (const q of arr) { const w = W2(q[0], q[1]); const l = o[o.length - 1]; if (!l || Math.abs(l[0] - w[0]) + Math.abs(l[1] - w[1]) > 1e-3) o.push(w); } if (o.length > 2) { const a = o[0], b = o[o.length - 1]; if (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) < 1e-3) o.pop(); } return o; };
    const outer = clean(shape.o); const holes = shape.h.map(clean).filter(h => h.length > 2);
    if (outer.length < 3) return g;
    const V = (p) => new THREE.Vector2(p[0], p[1]);
    const tris = THREE.ShapeUtils.triangulateShape(outer.map(V), holes.map(h => h.map(V)));
    const all = outer.concat(...holes);
    for (const t of tris) {
      const a = all[t[0]], b = all[t[1]], c = all[t[2]];
      g.tri([a[0], y, a[1]], [b[0], y, b[1]], [c[0], y, c[1]], [a[0] / uvScale, a[1] / uvScale], [b[0] / uvScale, b[1] / uvScale], [c[0] / uvScale, c[1] / uvScale], col, UP);
    }
    return g;
  }
  const addMesh = (geo, mat, { shadow = false, receive = false } = {}) => { const m = new THREE.Mesh(geo, mat); m.castShadow = shadow; m.receiveShadow = receive; root.add(m); return m; };

  // ---- green / olive / water / road / sidewalk ----
  { const g = new Geo(); for (const s of DATA.green) shapeGeo(s, 0.012, 9, [1, 1, 1], g); addMesh(g.toGeometry(), mats.grass, { receive: true }); }
  { const g = new Geo(); for (const s of DATA.olive) shapeGeo(s, 0.011, 9, [1, 1, 1], g); addMesh(g.toGeometry(), mats.meadow, { receive: true }); }
  { const g = new Geo(); for (const s of DATA.water) shapeGeo(s, 0.025, 10, [1, 1, 1], g); addMesh(g.toGeometry(), mats.water, { receive: true }); }
  { const g = new Geo(); for (const s of DATA.sidewalk) shapeGeo(s, 0.15, 5, [1, 1, 1], g); addMesh(g.toGeometry(), mats.side, { receive: true }); }
  { const g = new Geo(); for (const s of DATA.roads) shapeGeo(s, 0.02, 7, [1, 1, 1], g); addMesh(g.toGeometry(), mats.road, { receive: true }); }
  // curbs along road contours
  {
    const g = new Geo(); const grey = [0.5, 0.49, 0.47];
    const edge = (pts) => {
      for (let i = 0; i < pts.length; i++) {
        const a = W2(pts[i][0], pts[i][1]), b = W2(pts[(i + 1) % pts.length][0], pts[(i + 1) % pts.length][1]);
        const L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 0.2) continue;
        g.quad([a[0], 0.02, a[1]], [b[0], 0.02, b[1]], [b[0], 0.15, b[1]], [a[0], 0.15, a[1]], [0, 0], [1, 0], [1, 1], [0, 1], grey, null);
      }
    };
    for (const r of DATA.roads) { edge(r.o); for (const h of r.h) edge(h); }
    const geo = g.toGeometry(); const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x77736c, roughness: 0.95, side: THREE.DoubleSide, vertexColors: true })); root.add(m);
  }

  // ---- road markings ----
  {
    const g = new Geo(); const col = [1, 1, 1];
    for (const cl of DATA.center) {
      if (cl.w < 11) continue;
      const pts = cl.p.map(q => W2(q[0], q[1]));
      let acc = 0, on = true, rem = 2.2;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1]; const L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 1e-3) continue;
        const dx = (b[0] - a[0]) / L, dz = (b[1] - a[1]) / L; let pos = 0;
        while (pos < L) {
          const step = Math.min(rem, L - pos);
          if (on) {
            const x0 = a[0] + dx * pos, z0 = a[1] + dz * pos, x1 = a[0] + dx * (pos + step), z1 = a[1] + dz * (pos + step);
            const nx = -dz * 0.11, nz = dx * 0.11;
            g.quad([x0 + nx, 0.035, z0 + nz], [x1 + nx, 0.035, z1 + nz], [x1 - nx, 0.035, z1 - nz], [x0 - nx, 0.035, z0 - nz], [0, 0], [1, 0], [1, 1], [0, 1], col, UP);
          }
          rem -= step; pos += step;
          if (rem <= 1e-3) { on = !on; rem = on ? 2.2 : 3.6; }
        }
      }
    }
    addMesh(g.toGeometry(), mats.marking);
  }

  // ---- buildings ----
  const wallG = new Geo(), wallB = new Geo(), plainG = new Geo(), roofG = new Geo();
  const HELL = (a) => [a[0] * 0.78, a[1] * 0.62, a[2] * 0.82];
  const wallTints = [[0.93, 0.9, 0.8], [0.72, 0.42, 0.34], [0.74, 0.74, 0.72], [0.9, 0.84, 0.62], [0.92, 0.92, 0.9], [0.55, 0.44, 0.36], [0.66, 0.58, 0.5]].map(HELL);
  const roofTints = [[0.36, 0.34, 0.33], [0.3, 0.34, 0.38], [0.38, 0.37, 0.35], [0.34, 0.28, 0.25], [0.4, 0.34, 0.27]];
  const castlePx = STATIONS[1].px, churchPx = STATIONS[5].px;
  const castlePieces = [];
  const ruinList = [];
  const PLAIN_UV = [0, 0];

  function wallQuad(a, b, h0, h1, tint, bays, uOff, floors, vOff, lenW) {
    // a,b : [x,z] ; walls from y=0..h0 at a, 0..h1 at b (h0==h1 usually)
    const nx0 = b[1] - a[1], nz0 = -(b[0] - a[0]); // later oriented through nHint
    return [nx0, nz0];
  }

  function addWalls(pts, orient, wallH, floors, tint, R, opts = {}) {
    const n = pts.length; const sign = orient > 0 ? 1 : -1;
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n];
      const dx = b[0] - a[0], dz = b[1] - a[1]; const L = Math.hypot(dx, dz); if (L < 0.15) continue;
      const nh = [sign * dz / L, 0, -sign * dx / L];
      const shade = 0.82 + 0.18 * (nh[0] * -0.5 + nh[2] * -0.8);
      const col = [tint[0] * shade, tint[1] * shade, tint[2] * shade];
      const segs = opts.ruin ? Math.max(1, Math.round(L / 2.2)) : 1;
      for (let s = 0; s < segs; s++) {
        const t0 = s / segs, t1 = (s + 1) / segs;
        const p0 = [a[0] + dx * t0, a[1] + dz * t0], p1 = [a[0] + dx * t1, a[1] + dz * t1];
        let h = wallH; if (opts.ruin) h = wallH * (R() < 0.35 ? 1 : 0.28 + R() * 0.6);
        if (L * (t1 - t0) < 1.9) {
          plainG.quad([p0[0], 0, p0[1]], [p1[0], 0, p1[1]], [p1[0], h, p1[1]], [p0[0], h, p0[1]], PLAIN_UV, PLAIN_UV, PLAIN_UV, PLAIN_UV, col.map(c => c * 0.9), nh);
        } else {
          const segL = L * (t1 - t0); const bays = Math.max(1, Math.round(segL / 3.3));
          const u0 = (opts.uOff || 0) + (s * 3 + i * 2) % 4, u1 = u0 + bays;
          const v0 = (opts.vOff || 0), v1 = v0 + floors * (h / wallH);
          (opts.bunker ? wallB : wallG).quad([p0[0], 0, p0[1]], [p1[0], 0, p1[1]], [p1[0], h, p1[1]], [p0[0], h, p0[1]], [u0 / 4, v0 / 4], [u1 / 4, v0 / 4], [u1 / 4, v1 / 4], [u0 / 4, v1 / 4], col, nh);
        }
      }
    }
  }

  function addGable(o, wallH, rise, roofTint, wallTint, R, partial = false) {
    const c = Math.cos(o.ang), s = Math.sin(o.ang);
    const L = o.w / 2 + 0.45, Wd = o.d / 2 + 0.45;
    const P = (u, v, y) => [o.cx + u * c - v * s, y, o.cz + u * s + v * c];
    const top = wallH + rise, base = wallH - rise * 0.45 / (o.d / 2 + 0.001);
    const rcol = roofTint;
    const rcolB = rcol.map(x => x * 0.82);
    const lenU = L * 2, slope = Math.hypot(Wd, rise);
    const sideB = [P(-L, -Wd, base), P(L, -Wd, base), P(L, 0, top), P(-L, 0, top)];
    const sideA = [P(L, Wd, base), P(-L, Wd, base), P(-L, 0, top), P(L, 0, top)];
    const nA = [-s * rise / slope * -1, Wd / slope, 0]; // unused hint, computed orientation below
    // normals: compute upward-facing
    roofG.quad(sideB[0], sideB[1], sideB[2], sideB[3], [0, 0], [lenU, 0], [lenU, slope], [0, slope], rcol, [0, 1, 0]);
    if (!partial) roofG.quad(sideA[0], sideA[1], sideA[2], sideA[3], [0, 0], [lenU, 0], [lenU, slope], [0, slope], rcolB, [0, 1, 0]);
    // gable triangles
    const gcol = wallTint.map(x => x * 0.88);
    for (const sg of [-1, 1]) {
      const A = P(sg * L * (1 - 0.45 / L), -Wd + 0.45, wallH), B = P(sg * L * (1 - 0.45 / L), Wd - 0.45, wallH), C = P(sg * L * (1 - 0.45 / L), 0, top);
      plainG.tri(A, B, C, PLAIN_UV, PLAIN_UV, PLAIN_UV, gcol, [sg * c, 0, sg * s]);
    }
    // ridge cap
    return { P, top, L, Wd };
  }

  function chimney(P, top, L, R) {
    const u = (R() - 0.5) * L * 1.2, v = (R() < 0.5 ? -1 : 1) * 0.3;
    const p = P(u, v, top);
    plainG.box(p[0], p[1] - 0.2 + 0.9, p[2], 0.8, 1.9, 0.8, 0, [0.42, 0.26, 0.2]);
  }

  const bpx = DATA.buildings;
  let ruinCount = 0;
  const startStationsPx = STATIONS.filter(s => s.px).map(s => s.px);
  for (let bi = 0; bi < bpx.length; bi++) {
    const b = bpx[bi];
    let pts = b.p.map(q => W2(q[0], q[1]));
    // dedupe
    pts = pts.filter((p, i) => { const q = pts[(i + 1) % pts.length]; return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) > 0.2; });
    if (pts.length < 3) continue;
    const A = polyArea(pts), area = Math.abs(A); if (area < 7) continue;
    const orient = A > 0 ? 1 : -1;
    const Rb = mulberry32(bi * 7919 + 13);
    const cen = polyCentroid(pts); const cpx = [cen[0] / S + HX, cen[1] / S + HY];
    const box = obb(pts); const rectLike = area / box.area > 0.78 && area > 22;
    const dCastle = Math.hypot(cpx[0] - castlePx[0], cpx[1] - castlePx[1]);
    const dChurch = Math.hypot(cpx[0] - churchPx[0], cpx[1] - churchPx[1]);
    let floors = area < 40 ? 1 : area < 120 ? 2 : (Rb() < 0.65 ? 2 : 3);
    let wallH = floors * 3.0 + (floors === 1 ? 0.5 : 0);
    let tint = [0.97, 0.97, 0.97].map(x => x * (0.85 + Rb() * 0.2));
    const roofTint = roofTints[(Rb() * roofTints.length) | 0].map(x => x * (0.8 + Rb() * 0.35));
    let kind = 'house';
    if (dCastle < 62) { kind = 'castle'; wallH = 10 + Rb() * 2; floors = 3; tint = [0.8, 0.82, 0.86]; }
    else if (dChurch < 22 && area > 120) { kind = 'church'; wallH = 9; floors = 3; tint = [0.9, 0.9, 0.9]; }
    const nearStation = startStationsPx.some(sp => Math.hypot(cpx[0] - sp[0], cpx[1] - sp[1]) < 14);
    const ruin = kind === 'house' && !nearStation && Rb() < 0.14 && area > 25;
    const uOff = (Rb() * 4) | 0, vOff = (Rb() * 4) | 0;
    if (kind !== 'castle') {
      const Rg = mulberry32(bi * 131 + 977); world.graffitiWalls = world.graffitiWalls || [];
      for (let gi = 0; gi < pts.length; gi++) {
        const ga = pts[gi], gb2 = pts[(gi + 1) % pts.length]; const gdx = gb2[0] - ga[0], gdz = gb2[1] - ga[1], gL = Math.hypot(gdx, gdz);
        if (gL < 4.2 || Rg() > 0.42) continue;
        const gs = orient > 0 ? 1 : -1;
        world.graffitiWalls.push({ ax: ga[0], az: ga[1], bx: gb2[0], bz: gb2[1], nx: gs * gdz / gL, nz: -gs * gdx / gL, L: gL, wallH, seed: bi * 17 + gi });
      }
    }
    if (ruin) {
      ruinCount++;
      (world.ruinInfo = world.ruinInfo || []).push({ pts, cen, area, wallH, seed: bi });
      const rt = tint.map(x => x * 0.78);
      addWalls(pts, orient, wallH, floors, rt, Rb, { ruin: true, uOff, vOff });
      // dark floor
      const tris = THREE.ShapeUtils.triangulateShape(pts.map(p => new THREE.Vector2(p[0], p[1])), []);
      for (const t of tris) plainG.tri([pts[t[0]][0], 0.06, pts[t[0]][1]], [pts[t[1]][0], 0.06, pts[t[1]][1]], [pts[t[2]][0], 0.06, pts[t[2]][1]], PLAIN_UV, PLAIN_UV, PLAIN_UV, [0.16, 0.13, 0.11], UP);
      // debris
      const nd = 3 + ((Rb() * 5) | 0);
      for (let k = 0; k < nd; k++) {
        const t = Rb(), q = pts[(Rb() * pts.length) | 0];
        const px_ = lerp(cen[0], q[0], Rb() * 0.85), pz_ = lerp(cen[1], q[1], Rb() * 0.85);
        const sz = 0.5 + Rb() * 1.4;
        plainG.box(px_, sz * 0.35, pz_, sz * (0.8 + Rb()), sz * 0.7, sz * (0.6 + Rb()), Rb() * 6.28, [0.34 + Rb() * 0.14, 0.3 + Rb() * 0.12, 0.27 + Rb() * 0.1]);
      }
      if (rectLike && Rb() < 0.6) { const gg = addGable(box, wallH * 0.82, Math.min(2.6, box.d * 0.35), roofTint.map(x => x * 0.6), rt, Rb, true); }
      if (Rb() < 0.45) ruinList.push([cen[0], cen[1], wallH]);
      world.ruinPools = world.ruinPools || []; world.ruinPools.push({ x: cen[0], z: cen[1], y: 0.22, rot: 0, sx: 1.0 + Math.min(1.2, Math.sqrt(area) / 14) });
      continue;
    }
    const bunker = kind === 'castle' || kind === 'church' || (kind === 'house' && area < 55);
    addWalls(pts, orient, wallH, floors, tint, Rb, { uOff, vOff, bunker });
    (world.bldInfo = world.bldInfo || []).push({ pts, orient, wallH, area, box, kind, rectLike, cen, seed: bi });
    if (kind === 'castle') {
      // flat roof + merlons
      const tris = THREE.ShapeUtils.triangulateShape(pts.map(p => new THREE.Vector2(p[0], p[1])), []);
      for (const t of tris) roofG.tri([pts[t[0]][0], wallH + 0.02, pts[t[0]][1]], [pts[t[1]][0], wallH + 0.02, pts[t[1]][1]], [pts[t[2]][0], wallH + 0.02, pts[t[2]][1]], [0, 0], [1, 0], [0, 1], [0.32, 0.31, 0.3], UP);
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i], bb = pts[(i + 1) % pts.length]; const L = Math.hypot(bb[0] - a[0], bb[1] - a[1]);
        const n = Math.floor(L / 2.0);
        for (let k = 0; k < n; k++) { const t = (k + 0.5) / n; plainG.box(lerp(a[0], bb[0], t), wallH + 0.55, lerp(a[1], bb[1], t), 1.0, 1.1, 1.0, Math.atan2(bb[1] - a[1], bb[0] - a[0]) * -1, [0.58, 0.52, 0.46]); }
      }
      castlePieces.push(pts);
    } else if (rectLike && kind !== 'house') {
      const rise = clamp(Math.min(box.d, 12) * 0.36, 1.3, 4.6);
      const gg = addGable(box, wallH, rise, roofTint, tint, Rb);
      if (Rb() < 0.5) chimney(gg.P, gg.top, gg.L, Rb);
      if (kind === 'church') {
        const c = Math.cos(box.ang), s = Math.sin(box.ang);
        const tx = box.cx + c * (box.w / 2 - 1.8), tz = box.cz + s * (box.w / 2 - 1.8);
        plainG.box(tx, 11, tz, 4.2, 22, 4.2, -box.ang, [0.74, 0.68, 0.58]);
        // spire
        const sp = 9; const P0 = (dx, dz) => [tx + dx * c - dz * s, 22, tz + dx * s + dz * c], T = [tx, 22 + sp, tz];
        const cs = [[-2.3, -2.3], [2.3, -2.3], [2.3, 2.3], [-2.3, 2.3]];
        for (let k = 0; k < 4; k++) { const a = P0(cs[k][0], cs[k][1]), bb = P0(cs[(k + 1) % 4][0], cs[(k + 1) % 4][1]); roofG.tri(a, bb, T, [0, 0], [4, 0], [2, 9], [0.28, 0.3, 0.33], [0, 1, 0]); }
      }
    } else {
      // flat roof with clutter
      const tris = THREE.ShapeUtils.triangulateShape(pts.map(p => new THREE.Vector2(p[0], p[1])), []);
      for (const t of tris) roofG.tri([pts[t[0]][0], wallH + 0.02, pts[t[0]][1]], [pts[t[1]][0], wallH + 0.02, pts[t[1]][1]], [pts[t[2]][0], wallH + 0.02, pts[t[2]][1]], [pts[t[0]][0] / 5, pts[t[0]][1] / 5], [pts[t[1]][0] / 5, pts[t[1]][1] / 5], [pts[t[2]][0] / 5, pts[t[2]][1] / 5], roofTint.map(x => x * 1.1), UP);
      if (area > 45 && Rb() < 0.6) for (let i = 0; i < pts.length; i++) { const a = pts[i], bb = pts[(i + 1) % pts.length]; const L = Math.hypot(bb[0] - a[0], bb[1] - a[1]); if (L < 3) continue; plainG.box((a[0] + bb[0]) / 2 + (cen[0] - (a[0] + bb[0]) / 2) * 0.03, wallH + 0.25, (a[1] + bb[1]) / 2 + (cen[1] - (a[1] + bb[1]) / 2) * 0.03, L, 0.62, 0.55, Math.atan2(bb[1] - a[1], bb[0] - a[0]) * -1, [0.38 + Rb() * 0.05, 0.33, 0.24]); }
      if (area > 60) { const nC = area > 140 ? 2 : 1; const CC = [[0.54, 0.29, 0.22], [0.23, 0.42, 0.54], [0.29, 0.48, 0.33], [0.66, 0.52, 0.21], [0.48, 0.25, 0.25]]; for (let k = 0; k < nC; k++) { if (Rb() < 0.7) { (world.roofConts = world.roofConts || []).push({ x: cen[0] + (Rb() - 0.5) * box.w * 0.35, y: wallH + 1.3, z: cen[1] + (Rb() - 0.5) * box.d * 0.35, rot: box.ang + (Rb() < 0.3 ? 1.57 : 0), sx: 1, color: [0x7a4030, 0x2f5068, 0x35563c, 0x8a6a26, 0x5a3030, 0x4a5560][(Rb() * 6) | 0] }); } } }
      if (area > 80 && Rb() < 0.7) plainG.box(cen[0], wallH + 0.5, cen[1], 1.6, 1.0, 1.1, Rb() * 3, [0.5, 0.5, 0.52]);
      if (Rb() < 0.4) plainG.box(cen[0] + 1.5, wallH + 0.9, cen[1] - 1, 0.8, 1.8, 0.8, 0, [0.42, 0.26, 0.2]);
    }
  }
  // castle towers
  if (castlePieces.length) {
    const all = [].concat(...castlePieces); const cen = polyCentroid(all);
    const quads = [[], [], [], []];
    for (const p of all) { const q = (p[0] > cen[0] ? 1 : 0) + (p[1] > cen[1] ? 2 : 0); quads[q].push(p); }
    for (const qd of quads) {
      if (!qd.length) continue; let best = qd[0], bd = 0;
      for (const p of qd) { const d = Math.hypot(p[0] - cen[0], p[1] - cen[1]); if (d > bd) { bd = d; best = p; } }
      const tx = lerp(best[0], cen[0], 0.06), tz = lerp(best[1], cen[1], 0.06);
      const cyl = new THREE.CylinderGeometry(3.0, 3.3, 17, 14, 1).toNonIndexed(); cyl.translate(tx, 8.5, tz);
      const pos = cyl.attributes.position, nor = cyl.attributes.normal, uvA = cyl.attributes.uv;
      for (let i = 0; i < pos.count; i += 3) wallG.tri([pos.getX(i), pos.getY(i), pos.getZ(i)], [pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1)], [pos.getX(i + 2), pos.getY(i + 2), pos.getZ(i + 2)], [uvA.getX(i) * 3, uvA.getY(i) * 4], [uvA.getX(i + 1) * 3, uvA.getY(i + 1) * 4], [uvA.getX(i + 2) * 3, uvA.getY(i + 2) * 4], [0.6, 0.54, 0.47], [nor.getX(i), nor.getY(i), nor.getZ(i)]);
      const cone = new THREE.ConeGeometry(3.9, 6, 14).toNonIndexed(); cone.translate(tx, 17 + 3, tz);
      const cp = cone.attributes.position, cn = cone.attributes.normal;
      for (let i = 0; i < cp.count; i += 3) roofG.tri([cp.getX(i), cp.getY(i), cp.getZ(i)], [cp.getX(i + 1), cp.getY(i + 1), cp.getZ(i + 1)], [cp.getX(i + 2), cp.getY(i + 2), cp.getZ(i + 2)], [0, 0], [1, 0], [0, 1], [0.24, 0.27, 0.3], [cn.getX(i), cn.getY(i), cn.getZ(i)]);
    }
  }
  addMesh(wallG.toGeometry(), mats.wall, { shadow: true, receive: true });
  addMesh(wallB.toGeometry(), mats.wallB, { shadow: true, receive: true });
  addMesh(plainG.toGeometry(), mats.plain, { shadow: true, receive: true });
  addMesh(roofG.toGeometry(), mats.roof, { shadow: true, receive: true });
  world.ruins = ruinList;
  world.ruinCount = ruinCount;

  // ---- stations: resolve px positions ----
  const homeStation = STATIONS[0]; homeStation.px = [HX, HY];
  for (const s of STATIONS) { const w = W2(s.px[0], s.px[1]); s.x = w[0]; s.z = w[1]; world.stations.push(s); }

  // ---- walk grid ----
  const GW = Math.ceil(MAPW), GH = Math.ceil(MAPH);
  const blocked = new Uint8Array(GW * GH);
  const g0x = world.bounds.x0, g0z = world.bounds.z0;
  for (let gy = 0; gy < GH; gy++) for (let gx = 0; gx < GW; gx++) {
    const px0 = Math.floor(gx / S), py0 = Math.floor(gy / S), px1 = Math.min(DATA.w - 1, Math.floor((gx + 1) / S)), py1 = Math.min(DATA.h - 1, Math.floor((gy + 1) / S));
    let bl = 0;
    for (let py = py0; py <= py1 && !bl; py++) for (let px = px0; px <= px1; px++) { const c = CLS[py * DATA.w + px]; if (c === 2 || c === 3 || c === 4) { bl = 1; break; } }
    blocked[gy * GW + gx] = bl;
  }
  // inflate by 1 cell (player radius) but keep roads open
  const infl = new Uint8Array(blocked);
  for (let gy = 1; gy < GH - 1; gy++) for (let gx = 1; gx < GW - 1; gx++) {
    if (blocked[gy * GW + gx]) continue;
    let n = 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) n += blocked[(gy + dy) * GW + gx + dx];
    if (n >= 2) infl[gy * GW + gx] = 1;
  }
  const walk = { GW, GH, blocked: infl, g0x, g0z };
  walk.cell = (x, z) => [Math.floor(x - g0x), Math.floor(z - g0z)];
  walk.ok = (x, z) => { const gx = Math.floor(x - g0x), gz = Math.floor(z - g0z); if (gx < 0 || gz < 0 || gx >= GW || gz >= GH) return false; return !walk.blocked[gz * GW + gx]; };
  world.walk = walk;

  // ---- A* ----
  walk.nearest = (x, z) => {
    if (walk.ok(x, z) && (!walk.reach || walk.reach[walk.cell(x, z)[1] * GW + walk.cell(x, z)[0]])) return [x, z];
    const [cx0, cz0] = walk.cell(x, z);
    for (let r = 1; r < 90; r++) {
      let best = null, bd = 1e9;
      for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        const gx = cx0 + dx, gz = cz0 + dz; if (gx < 0 || gz < 0 || gx >= GW || gz >= GH) continue;
        if (!walk.blocked[gz * GW + gx] && (!walk.reach || walk.reach[gz * GW + gx])) { const d = dx * dx + dz * dz; if (d < bd) { bd = d; best = [gx, gz]; } }
      }
      if (best) return [g0x + best[0] + 0.5, g0z + best[1] + 0.5];
    }
    return null;
  };
  walk.los = (x0, z0, x1, z1) => {
    const d = Math.hypot(x1 - x0, z1 - z0), n = Math.ceil(d / 0.5);
    for (let i = 0; i <= n; i++) { const t = i / n; if (!walk.ok(lerp(x0, x1, t), lerp(z0, z1, t))) return false; }
    return true;
  };
  walk.path = (x0, z0, x1, z1) => {
    const s = walk.nearest(x0, z0), e = walk.nearest(x1, z1); if (!s || !e) return null;
    const [sx, sz] = walk.cell(s[0], s[1]), [ex, ez] = walk.cell(e[0], e[1]);
    const N = GW * GH, gScore = new Float32Array(N).fill(1e9), came = new Int32Array(N).fill(-1), closed = new Uint8Array(N);
    const heap = []; // binary heap of [f, idx]
    const push = (f, i) => { heap.push([f, i]); let k = heap.length - 1; while (k > 0) { const p = (k - 1) >> 1; if (heap[p][0] <= heap[k][0]) break;[heap[p], heap[k]] = [heap[k], heap[p]]; k = p; } };
    const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let k = 0; for (; ;) { let l = 2 * k + 1, r = l + 1, m = k; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === k) break;[heap[m], heap[k]] = [heap[k], heap[m]]; k = m; } } return top; };
    const si = sz * GW + sx, ei = ez * GW + ex; gScore[si] = 0; push(0, si);
    const H = (x, z) => Math.hypot(x - ex, z - ez);
    const roadCost = (gx, gz) => { const c = CLS[Math.min(DATA.h - 1, Math.floor((gz + 0.5) / S)) * DATA.w + Math.min(DATA.w - 1, Math.floor((gx + 0.5) / S))]; return c === 1 ? 1.0 : 2.4; }; // Straßen stark bevorzugen
    let found = false, it = 0;
    while (heap.length && it++ < 400000) {
      const [, cur] = pop(); if (closed[cur]) continue; closed[cur] = 1;
      if (cur === ei) { found = true; break; }
      const cx = cur % GW, cz = (cur / GW) | 0;
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dz) continue; const nx = cx + dx, nz = cz + dz; if (nx < 0 || nz < 0 || nx >= GW || nz >= GH) continue;
        const ni = nz * GW + nx; if (walk.blocked[ni] || closed[ni]) continue;
        if (dx && dz && (walk.blocked[cz * GW + nx] || walk.blocked[nz * GW + cx])) continue;
        const step = (dx && dz ? 1.414 : 1) * roadCost(nx, nz); const tg = gScore[cur] + step;
        if (tg < gScore[ni]) { gScore[ni] = tg; came[ni] = cur; push(tg + H(nx, nz), ni); }
      }
    }
    if (!found) return null;
    const out = []; let c = ei; while (c !== -1) { out.push([g0x + (c % GW) + 0.5, g0z + ((c / GW) | 0) + 0.5]); c = came[c]; } out.reverse();
    // string pulling
    // Abkürzungen nur, wenn sie nicht mehr Straße verlassen als der gefundene Weg selbst
    const isRoad = (x, z) => world.clsAt(x, z) === 1;
    const lineRoad = (x0, z0, x1, z1) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / 0.5)); let r = 0; for (let i = 0; i <= n; i++) if (isRoad(lerp(x0, x1, i / n), lerp(z0, z1, i / n))) r++; return r / (n + 1); };
    const pathRoad = (a0, b0) => { let r = 0; for (let i = a0; i <= b0; i++) if (isRoad(out[i][0], out[i][1])) r++; return r / (b0 - a0 + 1); };
    const sm = [out[0]]; let a = 0;
    while (a < out.length - 1) {
      let b = out.length - 1;
      while (b > a + 1) {
        if (walk.los(out[a][0], out[a][1], out[b][0], out[b][1]) && (Math.hypot(out[b][0] - out[a][0], out[b][1] - out[a][1]) <= 4 || lineRoad(out[a][0], out[a][1], out[b][0], out[b][1]) >= pathRoad(a, b) - 0.1)) break;
        b--;
      }
      sm.push(out[b]); a = b;
    }
    return sm;
  };
  walk.computeReach = (sx, sz) => {
    const [cx0, cz0] = walk.cell(sx, sz); const reach = new Uint8Array(GW * GH); const q = new Int32Array(GW * GH); let h = 0, t = 0;
    q[t++] = cz0 * GW + cx0; reach[cz0 * GW + cx0] = 1;
    while (h < t) { const cur = q[h++]; const cx = cur % GW, cz = (cur / GW) | 0;
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { if (!dx && !dz) continue; const nx = cx + dx, nz = cz + dz; if (nx < 0 || nz < 0 || nx >= GW || nz >= GH) continue; const ni = nz * GW + nx; if (reach[ni] || walk.blocked[ni]) continue; if (dx && dz && (walk.blocked[cz * GW + nx] || walk.blocked[nz * GW + cx])) continue; reach[ni] = 1; q[t++] = ni; } }
    walk.reach = reach; return t;
  };
  // snap stations to walkable spots
  for (const s of world.stations) { const n = walk.nearest(s.x, s.z); if (n) { s.wx = n[0]; s.wz = n[1]; } else { s.wx = s.x; s.wz = s.z; } }

  // ---- street labels ----
  {
    for (const [text, px, py, ang, len] of STREET_LABELS) {
      const w = W2(px, py);
      const tex = makeLabelTexture(text, { font: '700 52px "Segoe UI", Arial, sans-serif', color: '#e4ecdf', letter: 5 });
      const wmeters = text.length * 3.3, hm = wmeters / 8;
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(wmeters, hm), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.78, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6 }));
      plane.rotation.x = -Math.PI / 2;
      const grp = new THREE.Group(); grp.add(plane); grp.position.set(w[0], 0.25, w[1]); grp.rotation.y = -ang * Math.PI / 180; root.add(grp);
    }
  }

  return world;
}
