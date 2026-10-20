import * as THREE from 'three';
import { Geo, mulberry32 } from './util.js';

const NEON = ['#ff59d6', '#4de1ff', '#8cff6a', '#ffa94d', '#b04bff', '#4de1ff', '#ffc46b'];

function atlas() {
  const N = 4, T = 512, S = N * T;
  const c = document.createElement('canvas'); c.width = c.height = S; const x = c.getContext('2d');
  const R = mulberry32(666);
  const glowStroke = (col, lw, draw) => {
    x.save(); x.lineCap = 'round'; x.lineJoin = 'round';
    x.shadowColor = col; x.shadowBlur = 26; x.strokeStyle = col; x.lineWidth = lw; draw(); x.stroke();
    x.shadowBlur = 0; x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = lw * 0.32; draw(); x.stroke(); x.restore();
  };
  const drips = (x0, y0, w, col) => { for (let i = 0; i < 5; i++) { const px = x0 + R() * w, len = 30 + R() * 90; x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 14; x.fillRect(px, y0, 8, len); x.beginPath(); x.arc(px + 4, y0 + len, 8, 0, 7); x.fill(); } x.shadowBlur = 0; };
  const text = (t, cx, cy, size, col, rot = 0) => {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.font = `900 ${size}px Impact, "Arial Black", sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.shadowColor = col; x.shadowBlur = 30; x.fillStyle = col; x.fillText(t, 0, 0); x.shadowBlur = 0; x.lineWidth = 7; x.strokeStyle = 'rgba(255,255,255,.9)'; x.strokeText(t, 0, 0); x.restore();
  };
  const tiles = [
    // 0 skull
    (cx, cy, col) => { glowStroke(col, 16, () => { x.beginPath(); x.ellipse(cx, cy - 20, 130, 120, 0, 0, 7); x.moveTo(cx - 70, cy + 90); x.lineTo(cx - 70, cy + 150); x.lineTo(cx + 70, cy + 150); x.lineTo(cx + 70, cy + 90); for (let k = -2; k <= 2; k++) { x.moveTo(cx + k * 30, cy + 110); x.lineTo(cx + k * 30, cy + 150); } }); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 20; for (const s of [-1, 1]) { x.beginPath(); x.ellipse(cx + s * 52, cy - 10, 30, 38, 0, 0, 7); x.fill(); } x.shadowBlur = 0; drips(cx - 90, cy + 150, 180, col); },
    // 1 big eye
    (cx, cy, col) => { glowStroke(col, 14, () => { x.beginPath(); x.moveTo(cx - 200, cy); x.quadraticCurveTo(cx, cy - 170, cx + 200, cy); x.quadraticCurveTo(cx, cy + 170, cx - 200, cy); x.moveTo(cx + 70, cy); x.arc(cx, cy, 70, 0, 7); }); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 24; x.beginPath(); x.arc(cx, cy, 30, 0, 7); x.fill(); x.shadowBlur = 0; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.28; glowStroke(col, 6, () => { x.beginPath(); x.moveTo(cx + Math.cos(a) * 215, cy + Math.sin(a) * 120); x.lineTo(cx + Math.cos(a) * 250, cy + Math.sin(a) * 150); }); } },
    // 2 RUN
    (cx, cy, col) => { text('RUN', cx, cy, 190, col, -0.08); drips(cx - 160, cy + 70, 320, col); },
    // 3 spiral
    (cx, cy, col) => { glowStroke(col, 14, () => { x.beginPath(); for (let a = 0; a < 38; a += 0.12) { const r = 6 + a * 6.2; x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } }); },
    // 4 monster grin
    (cx, cy, col) => { glowStroke(col, 15, () => { x.beginPath(); x.arc(cx, cy, 190, 0, 7); x.moveTo(cx - 130, cy + 40); x.quadraticCurveTo(cx, cy + 190, cx + 130, cy + 40); for (let k = -3; k <= 3; k++) { x.moveTo(cx + k * 36, cy + 45 + Math.abs(k) * 6); x.lineTo(cx + k * 36, cy + 105 - Math.abs(k) * 12); } }); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 22; for (const s of [-1, 1]) { x.beginPath(); x.moveTo(cx + s * 40, cy - 70); x.lineTo(cx + s * 110, cy - 95); x.lineTo(cx + s * 100, cy - 40); x.fill(); } x.shadowBlur = 0; },
    // 5 lightning
    (cx, cy, col) => { glowStroke(col, 18, () => { x.beginPath(); x.moveTo(cx + 50, cy - 200); x.lineTo(cx - 70, cy + 10); x.lineTo(cx + 10, cy + 10); x.lineTo(cx - 60, cy + 200); x.lineTo(cx + 110, cy - 40); x.lineTo(cx + 20, cy - 40); x.closePath(); }); },
    // 6 FLIEH
    (cx, cy, col) => { text('FLIEH', cx, cy, 150, col, 0.06); },
    // 7 X marks
    (cx, cy, col) => { glowStroke(col, 22, () => { x.beginPath(); x.moveTo(cx - 150, cy - 150); x.lineTo(cx + 150, cy + 150); x.moveTo(cx + 150, cy - 150); x.lineTo(cx - 150, cy + 150); }); drips(cx - 120, cy + 120, 240, col); },
    // 8 many eyes
    (cx, cy, col) => { for (let i = 0; i < 7; i++) { const ex = cx + (R() - 0.5) * 330, ey = cy + (R() - 0.5) * 300, s = 20 + R() * 36; glowStroke(col, 8, () => { x.beginPath(); x.ellipse(ex, ey, s * 1.6, s, 0, 0, 7); }); x.fillStyle = col; x.beginPath(); x.arc(ex, ey, s * 0.45, 0, 7); x.fill(); } },
    // 9 HÖLLE
    (cx, cy, col) => { text('HÖLLE', cx, cy, 140, col, -0.05); drips(cx - 200, cy + 55, 400, col); },
    // 10 hand
    (cx, cy, col) => { glowStroke(col, 14, () => { x.beginPath(); x.moveTo(cx - 80, cy + 180); x.lineTo(cx - 90, cy - 10); for (let k = 0; k < 5; k++) { const fx = cx - 90 + k * 45, fy = cy - 150 + Math.abs(k - 2) * 30; x.lineTo(fx, fy); x.lineTo(fx + 30, fy); x.lineTo(fx + 36, cy - 10); } x.lineTo(cx + 90, cy + 180); }); drips(cx - 80, cy + 180, 160, col); },
    // 11 web
    (cx, cy, col) => { glowStroke(col, 7, () => { x.beginPath(); for (let a = 0; a < 10; a++) { const ang = a / 10 * 6.28; x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ang) * 230, cy + Math.sin(ang) * 230); } for (let r = 50; r < 230; r += 45) { for (let a = 0; a <= 10; a++) { const ang = a / 10 * 6.28; const px = cx + Math.cos(ang) * r * (1 - 0.1 * Math.sin(a * 2)), py = cy + Math.sin(ang) * r * (1 - 0.1 * Math.sin(a * 2)); a ? x.lineTo(px, py) : x.moveTo(px, py); } } }); },
    // 12 TOD
    (cx, cy, col) => { text('TOD', cx, cy, 200, col, 0.04); },
    // 13 tentacles
    (cx, cy, col) => { for (let i = 0; i < 5; i++) { glowStroke(col, 12, () => { x.beginPath(); let px = cx - 170 + i * 85, py = cy + 200; x.moveTo(px, py); for (let k = 0; k < 8; k++) { px += Math.sin(k * 1.2 + i) * 26; py -= 50; x.lineTo(px, py); } }); } },
    // 14 flames
    (cx, cy, col) => { glowStroke(col, 12, () => { x.beginPath(); x.moveTo(cx - 190, cy + 190); for (let k = 0; k < 6; k++) { x.lineTo(cx - 190 + k * 70 + 20, cy - 30 - R() * 140); x.lineTo(cx - 190 + k * 70 + 50, cy + 60); } x.lineTo(cx + 190, cy + 190); }); },
    // 15 broken heart
    (cx, cy, col) => { glowStroke(col, 15, () => { x.beginPath(); x.moveTo(cx, cy + 170); x.bezierCurveTo(cx - 230, cy + 20, cx - 130, cy - 160, cx, cy - 60); x.bezierCurveTo(cx + 130, cy - 160, cx + 230, cy + 20, cx, cy + 170); x.moveTo(cx + 10, cy - 60); x.lineTo(cx - 30, cy); x.lineTo(cx + 20, cy + 40); x.lineTo(cx - 20, cy + 100); }); },
  ];
  for (let i = 0; i < 16; i++) {
    const tx = (i % N) * T + T / 2, ty = Math.floor(i / N) * T + T / 2;
    x.save(); x.beginPath(); x.rect((i % N) * T, Math.floor(i / N) * T, T, T); x.clip();
    tiles[i](tx, ty, NEON[(i * 3 + 1) % NEON.length]); x.restore();
  }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8; tex.generateMipmaps = true; tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

// neon colour variants per placement via vertex colours (hue shift by multiplying)
export function addGraffiti(world) {
  const walls = world.graffitiWalls || []; if (!walls.length) return;
  const g = new Geo(); const N = 4; const pad = 0.015;
  const TINTS = [[1, 1, 1], [1, 0.6, 0.9], [0.6, 1, 1], [0.8, 1, 0.5], [1, 0.8, 0.5], [0.85, 0.65, 1]];
  for (const w of walls) {
    const R = mulberry32(w.seed * 31 + 7);
    const n = R() < 0.35 ? 2 : 1;
    for (let k = 0; k < n; k++) {
      const size = Math.min(w.L - 0.8, 2.6 + R() * 3.2, w.wallH - 0.9); if (size < 1.6) continue;
      const t = n === 2 ? (0.28 + k * 0.44) : (0.3 + R() * 0.4); const cx = w.ax + (w.bx - w.ax) * t, cz = w.az + (w.bz - w.az) * t;
      const tx = (w.bx - w.ax) / w.L, tz = (w.bz - w.az) / w.L; const y0 = 0.5 + R() * 0.7; const off = 0.06;
      const a = [cx - tx * size / 2 + w.nx * off, y0, cz - tz * size / 2 + w.nz * off], b = [cx + tx * size / 2 + w.nx * off, y0, cz + tz * size / 2 + w.nz * off];
      const c = [b[0], y0 + size, b[2]], d = [a[0], y0 + size, a[2]];
      const SAFE_TILES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; const ti = SAFE_TILES[(R() * SAFE_TILES.length) | 0], u0 = (ti % N) / N + pad, v0 = 1 - (Math.floor(ti / N) + 1) / N + pad, u1 = u0 + 1 / N - 2 * pad, v1 = v0 + 1 / N - 2 * pad;
      const tint = TINTS[(R() * TINTS.length) | 0];
      g.quad(a, b, c, d, [u0, v0], [u1, v0], [u1, v1], [u0, v1], tint, [w.nx, 0, w.nz]);
    }
  }
  const mat = new THREE.MeshBasicMaterial({ map: atlas(), vertexColors: true, transparent: true, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3, side: THREE.FrontSide });
  const mesh = new THREE.Mesh(g.toGeometry(), mat); mesh.renderOrder = 3; world.root.add(mesh);
  world.graffitiMesh = mesh;
}
