import * as THREE from 'three';
import { mulberry32 } from './util.js';

function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function tex(c, { repeat = true, srgb = true, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

// tileable value noise
function valueNoise(size, cells, r) {
  const g = new Float32Array(cells * cells);
  for (let i = 0; i < g.length; i++) g[i] = r();
  const out = new Float32Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const fx = x / size * cells, fy = y / size * cells;
    const x0 = Math.floor(fx) % cells, y0 = Math.floor(fy) % cells;
    const x1 = (x0 + 1) % cells, y1 = (y0 + 1) % cells;
    const tx = fx - Math.floor(fx), ty = fy - Math.floor(fy);
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const a = g[y0 * cells + x0], b = g[y0 * cells + x1], c = g[y1 * cells + x0], d = g[y1 * cells + x1];
    out[y * size + x] = a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
  }
  return out;
}
function noiseCanvas(size, base, amp, seed, octs = [4, 8, 16, 32, 64], tint = null) {
  const r = mulberry32(seed);
  const c = canvas(size, size), ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const layers = octs.map(o => valueNoise(size, o, r));
  for (let i = 0; i < size * size; i++) {
    let v = 0, w = 1, tw = 0;
    for (let k = 0; k < layers.length; k++) { v += layers[k][i] * w; tw += w; w *= 0.62; }
    v = v / tw - 0.5;
    const grain = (r() - 0.5) * 0.12;
    const m = (v * amp * 2 + grain * amp);
    const T = tint ? tint(i, v) : [1, 1, 1];
    img.data[i * 4] = Math.max(0, Math.min(255, base[0] + m * 255 * T[0]));
    img.data[i * 4 + 1] = Math.max(0, Math.min(255, base[1] + m * 255 * T[1]));
    img.data[i * 4 + 2] = Math.max(0, Math.min(255, base[2] + m * 255 * T[2]));
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export function makeAsphalt() {
  const c = noiseCanvas(512, [52, 55, 60], 0.20, 11, [4, 8, 16, 32, 128]);
  const ctx = c.getContext('2d'), r = mulberry32(5);
  // cracks
  ctx.strokeStyle = 'rgba(8,8,10,.55)'; ctx.lineWidth = 1.4;
  for (let i = 0; i < 16; i++) {
    let x = r() * 512, y = r() * 512; ctx.beginPath(); ctx.moveTo(x, y);
    for (let k = 0; k < 12; k++) { x += (r() - .5) * 46; y += (r() - .5) * 46; ctx.lineTo(x, y); }
    ctx.stroke();
  }
  // patches
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = `rgba(${20 + r() * 20},${20 + r() * 20},${24 + r() * 20},.28)`;
    ctx.fillRect(r() * 512, r() * 512, 20 + r() * 80, 12 + r() * 50);
  }
  // wet sheen
  for (let i = 0; i < 18; i++) {
    const x = r() * 512, y = r() * 512, rad = 20 + r() * 50;
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, 'rgba(120,130,150,.20)'); g.addColorStop(1, 'rgba(120,130,150,0)');
    ctx.fillStyle = g; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  return tex(c);
}
export function makeGround(kind = 'dirt') {
  const base = kind === 'grass' ? [52, 72, 46] : kind === 'meadow' ? [82, 86, 50] : kind === 'sidewalk' ? [92, 90, 86] : [78, 76, 72];
  const c = noiseCanvas(512, base, kind === 'sidewalk' ? 0.12 : 0.30, kind.length * 17 + 3, [4, 8, 16, 32, 64, 128],
    kind === 'grass' || kind === 'meadow' ? (i, v) => [0.6, 1.1, 0.5] : null);
  const ctx = c.getContext('2d'), r = mulberry32(9);
  if (kind === 'grass' || kind === 'meadow') {
    for (let i = 0; i < 1800; i++) {
      const x = r() * 512, y = r() * 512, l = 3 + r() * 7;
      ctx.strokeStyle = `rgba(${50 + r() * 50},${80 + r() * 70},${30 + r() * 40},.55)`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (r() - .5) * 4, y - l); ctx.stroke();
    }
  } else if (kind === 'sidewalk') {
    ctx.strokeStyle = 'rgba(15,15,15,.55)'; ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(i * 128, 0); ctx.lineTo(i * 128, 512); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, i * 128); ctx.lineTo(512, i * 128); ctx.stroke(); }
  } else {
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = `rgba(${30 + r() * 40},${28 + r() * 30},${20 + r() * 20},.5)`;
      ctx.fillRect(r() * 512, r() * 512, 1 + r() * 3, 1 + r() * 3);
    }
  }
  return tex(c);
}

// Facade: 4x4 bays, each 256px; wall + window. Returns {map, emissive}
export function makeFacade(style = 'container') {
  const S = 1024, N = 4, C = S / N;
  const r = mulberry32(style === 'container' ? 77 : 177);
  const c = canvas(S, S), e = canvas(S, S);
  const ctx = c.getContext('2d'), ex = e.getContext('2d');
  ex.fillStyle = '#000'; ex.fillRect(0, 0, S, S);
  const CONT = [[138, 74, 56], [58, 106, 138], [74, 122, 85], [169, 133, 54], [122, 64, 64], [85, 96, 110], [150, 92, 50], [70, 90, 70]];
  const rgb = (a, k = 1, al = 1) => `rgba(${a[0] * k | 0},${a[1] * k | 0},${a[2] * k | 0},${al})`;
  if (style === 'bunker') ctx.drawImage(noiseCanvas(S, [126, 130, 134], 0.2, 41, [4, 8, 16, 64, 128]), 0, 0);
  const PAL = () => { const q = r(); return q < 0.60 ? [['#ffe0a0', '#f2992e'], [255, 200, 110], [240, 140, 50]] : q < 0.75 ? [['#aaf6ff', '#2a9ad0'], [110, 240, 255], [50, 150, 220]] : q < 0.90 ? [['#c4ff8a', '#3aa030'], [160, 255, 100], [60, 190, 50]] : [['#ff9be6', '#a02fb5'], [255, 110, 225], [170, 50, 190]]; };
  for (let by = 0; by < N; by++) for (let bx = 0; bx < N; bx++) {
    const x0 = bx * C, y0 = by * C;
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, C, C); ctx.clip();
    const col = CONT[(r() * CONT.length) | 0];
    if (style === 'container') {
      ctx.fillStyle = rgb(col); ctx.fillRect(x0, y0, C, C);
      for (let x = 0; x < C; x += 12) { ctx.fillStyle = 'rgba(0,0,0,0.16)'; ctx.fillRect(x0 + x, y0, 5, C); ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fillRect(x0 + x + 6, y0, 2, C); }
      for (let i = 0; i < 14; i++) { const g = ctx.createLinearGradient(0, y0, 0, y0 + C); g.addColorStop(0, 'rgba(120,60,20,0)'); g.addColorStop(1, `rgba(110,55,20,${0.15 + r() * 0.3})`); ctx.fillStyle = g; ctx.fillRect(x0 + r() * C, y0 + C * 0.3, 4 + r() * 16, C * 0.7); }
      for (let i = 0; i < 90; i++) { ctx.fillStyle = r() < 0.5 ? 'rgba(0,0,0,0.12)' : 'rgba(255,230,200,0.08)'; ctx.fillRect(x0 + r() * C, y0 + r() * C, 1 + r() * 3, 1 + r() * 3); }
      ctx.fillStyle = rgb(col, 0.55); ctx.fillRect(x0, y0, C, 12); ctx.fillRect(x0, y0 + C - 14, C, 14); ctx.fillRect(x0, y0, 9, C); ctx.fillRect(x0 + C - 9, y0, 9, C);
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(x0, y0 + C - 3, C, 3);
      if (r() < 0.28) { ctx.fillStyle = 'rgba(240,240,230,0.6)'; ctx.font = '700 15px monospace'; ctx.fillText('MSKU ' + (1000 + (r() * 8999 | 0)), x0 + 18, y0 + C - 22); }
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.0)';
      for (let y = 0; y < C; y += 38) { ctx.fillStyle = 'rgba(0,0,0,0.13)'; ctx.fillRect(x0, y0 + y, C, 2); }
      for (let i = 0; i < 6; i++) { const g = ctx.createLinearGradient(0, y0, 0, y0 + C); g.addColorStop(0, 'rgba(20,20,20,0)'); g.addColorStop(1, `rgba(25,28,20,${0.10 + r() * 0.2})`); ctx.fillStyle = g; ctx.fillRect(x0 + r() * C, y0 + C * 0.2, 6 + r() * 26, C * 0.8); }
      const mg = ctx.createLinearGradient(0, y0 + C * 0.8, 0, y0 + C); mg.addColorStop(0, 'rgba(60,100,40,0)'); mg.addColorStop(1, 'rgba(60,100,40,0.35)'); ctx.fillStyle = mg; ctx.fillRect(x0, y0 + C * 0.8, C, C * 0.2);
      ctx.fillStyle = 'rgba(0,0,0,0.30)'; ctx.fillRect(x0, y0, 5, C); ctx.fillRect(x0 + C - 5, y0, 5, C);
      if (r() < 0.3) { ctx.fillStyle = 'rgba(245,200,40,0.85)'; ctx.font = '800 22px monospace'; ctx.fillText('B-' + String(1 + (r() * 30 | 0)).padStart(2, '0'), x0 + 20, y0 + C - 20); }
      if (r() < 0.14) { for (let k = -2; k < 8; k++) { ctx.fillStyle = (k & 1) ? 'rgba(245,200,40,0.9)' : 'rgba(25,25,25,0.9)'; ctx.beginPath(); ctx.moveTo(x0 + k * 34, y0 + 6); ctx.lineTo(x0 + k * 34 + 17, y0 + 6); ctx.lineTo(x0 + k * 34 + 17 + 14, y0 + 24); ctx.lineTo(x0 + k * 34 + 14, y0 + 24); ctx.fill(); } }
    }
    // Fenster / Tür
    const state = r(); const door = style === 'container' && state > 0.88;
    const ww = style === 'container' ? C * 0.46 : C * 0.60, wh = style === 'container' ? C * 0.26 : C * 0.13;
    const wx = x0 + (C - ww) / 2, wy = y0 + (style === 'container' ? C * 0.30 : C * 0.40);
    if (door) {
      ctx.fillStyle = rgb(col, 0.45); ctx.fillRect(x0 + C * 0.2, y0 + C * 0.14, C * 0.6, C * 0.74);
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(x0 + C * 0.5 - 1, y0 + C * 0.14, 3, C * 0.74);
      ctx.fillStyle = 'rgba(200,200,190,0.6)'; for (const dx of [0.3, 0.42, 0.56, 0.68]) ctx.fillRect(x0 + C * dx, y0 + C * 0.2, 4, C * 0.6);
    } else {
      const lit = state < 0.45, boarded = state > 0.82;
      ctx.fillStyle = '#1c1c1e'; ctx.fillRect(wx - 6, wy - 6, ww + 12, wh + 12);
      if (boarded) {
        ctx.fillStyle = '#3d3a36'; ctx.fillRect(wx, wy, ww, wh); ctx.strokeStyle = '#5a554d'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(wx, wy + wh); ctx.lineTo(wx + ww, wy); ctx.stroke();
      } else if (lit) {
        const P = PAL(); const g = ctx.createLinearGradient(wx, wy, wx, wy + wh); g.addColorStop(0, P[0][0]); g.addColorStop(1, P[0][1]); ctx.fillStyle = g; ctx.fillRect(wx, wy, ww, wh);
        const eg = ex.createLinearGradient(wx, wy, wx, wy + wh); eg.addColorStop(0, `rgb(${P[1].join(',')})`); eg.addColorStop(1, `rgb(${P[2].join(',')})`); ex.fillStyle = eg; ex.fillRect(wx, wy, ww, wh);
      } else {
        const g = ctx.createLinearGradient(wx, wy, wx + ww, wy + wh); g.addColorStop(0, '#1c2733'); g.addColorStop(1, '#0a0f15'); ctx.fillStyle = g; ctx.fillRect(wx, wy, ww, wh);
        ctx.fillStyle = 'rgba(150,180,210,0.12)'; ctx.fillRect(wx + ww * 0.1, wy, ww * 0.18, wh);
      }
      ctx.strokeStyle = '#1c1c1e'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.stroke();
      if (lit) { ex.strokeStyle = '#000'; ex.lineWidth = 4; ex.beginPath(); ex.moveTo(wx + ww / 2, wy); ex.lineTo(wx + ww / 2, wy + wh); ex.stroke(); }
    }
    ctx.restore();
  }
  return { map: tex(c, { aniso: 16 }), emissive: tex(e, { aniso: 16 }) };
}

export function makeRoofTiles() {
  const S = 512, c = canvas(S, S), ctx = c.getContext('2d'), r = mulberry32(21);
  ctx.drawImage(noiseCanvas(S, [98, 102, 108], 0.22, 23, [4, 8, 16, 32, 128]), 0, 0);
  // Blech-/Betonplatten
  ctx.strokeStyle = 'rgba(10,12,16,0.55)'; ctx.lineWidth = 2;
  for (let x = 0; x <= S; x += 128) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, S); ctx.stroke(); }
  for (let y = 0; y <= S; y += 128) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(S, y); ctx.stroke(); }
  // Rostflecken
  for (let i = 0; i < 46; i++) { ctx.fillStyle = `rgba(${130 + r() * 40 | 0},${64 + r() * 26 | 0},${26 + r() * 14 | 0},${0.10 + r() * 0.2})`; ctx.beginPath(); ctx.ellipse(r() * S, r() * S, 5 + r() * 26, 4 + r() * 14, r() * 3, 0, 7); ctx.fill(); }
  // Moos
  for (let i = 0; i < 30; i++) { ctx.fillStyle = `rgba(50,84,40,${0.10 + r() * 0.16})`; ctx.beginPath(); ctx.arc(r() * S, r() * S, 4 + r() * 16, 0, 7); ctx.fill(); }
  // Pfützen mit kühlem Glanz
  for (let i = 0; i < 6; i++) { const x = r() * S, y = r() * S, rad = 26 + r() * 40; const g = ctx.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, 'rgba(120,160,200,0.30)'); g.addColorStop(1, 'rgba(120,160,200,0)'); ctx.fillStyle = g; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
  // Risse
  ctx.strokeStyle = 'rgba(6,6,8,0.5)'; ctx.lineWidth = 1.3;
  for (let i = 0; i < 9; i++) { let x = r() * S, y = r() * S; ctx.beginPath(); ctx.moveTo(x, y); for (let k = 0; k < 9; k++) { x += (r() - .5) * 50; y += (r() - .5) * 50; ctx.lineTo(x, y); } ctx.stroke(); }
  return tex(c);
}
export function makeGlow(stops) {
  const c = canvas(256, 256), ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  for (const [o, col] of stops) g.addColorStop(o, col);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
  const t = tex(c, { repeat: false, aniso: 1 });
  return t;
}

export function makeLabelTexture(text, { font = '600 54px "Segoe UI", Arial, sans-serif', color = '#e9f0e6', stroke = 'rgba(0,0,0,.75)', letter = 6 } = {}) {
  const c = canvas(1024, 128), ctx = c.getContext('2d');
  ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  try { ctx.letterSpacing = letter + 'px'; } catch (e) { }
  ctx.lineWidth = 9; ctx.strokeStyle = stroke; ctx.lineJoin = 'round';
  ctx.strokeText(text, 512, 66); ctx.fillStyle = color; ctx.fillText(text, 512, 66);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}

export function makeLeaf() {
  const S = 256, c = canvas(S, S), ctx = c.getContext('2d'), r = mulberry32(404);
  ctx.fillStyle = '#9ab87a'; ctx.fillRect(0, 0, S, S);
  for (let i = 0; i < 1400; i++) {
    const x = r() * S, y = r() * S, a = r() * 6.28, l = 5 + r() * 9, w = 2.2 + r() * 3;
    const v = 0.7 + r() * 0.55;
    const col = `rgba(${(120 * v) | 0},${(165 * v) | 0},${(78 * v) | 0},${0.55 + r() * 0.4})`;
    for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) {
      const xx = x + ox, yy = y + oy; if (xx < -20 || yy < -20 || xx > S + 20 || yy > S + 20) continue;
      ctx.save(); ctx.translate(xx, yy); ctx.rotate(a); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, l, w, 0, 0, 7); ctx.fill(); ctx.restore();
    }
  }
  for (let i = 0; i < 260; i++) { ctx.fillStyle = `rgba(10,18,8,${0.15 + r() * 0.25})`; ctx.beginPath(); ctx.arc(r() * S, r() * S, 1 + r() * 3.5, 0, 7); ctx.fill(); }
  return tex(c);
}

export function makeDot() {
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.35, 'rgba(255,255,255,.75)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
