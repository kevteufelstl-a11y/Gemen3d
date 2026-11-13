import * as THREE from 'three';

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Non-indexed triangle accumulator with per-vertex colour + uv
export class Geo {
  constructor() { this.p = []; this.n = []; this.u = []; this.c = []; }
  tri(a, b, c, ua, ub, uc, col, nHint) {
    const ax = b[0] - a[0], ay = b[1] - a[1], az = b[2] - a[2];
    const bx = c[0] - a[0], by = c[1] - a[1], bz = c[2] - a[2];
    let nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
    let l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    if (nHint && nx * nHint[0] + ny * nHint[1] + nz * nHint[2] < 0) {
      // flip winding
      const t = b; b = c; c = t; const tu = ub; ub = uc; uc = tu;
      nx = -nx; ny = -ny; nz = -nz;
    }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    for (let i = 0; i < 3; i++) this.n.push(nx, ny, nz);
    this.u.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
    for (let i = 0; i < 3; i++) this.c.push(col[0], col[1], col[2]);
  }
  triS(a, b, c, ua, ub, uc, col, na, nb, nc) {
    const ax = b[0] - a[0], ay = b[1] - a[1], az = b[2] - a[2];
    const bx = c[0] - a[0], by = c[1] - a[1], bz = c[2] - a[2];
    const nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
    const hx = na[0] + nb[0] + nc[0], hy = na[1] + nb[1] + nc[1], hz = na[2] + nb[2] + nc[2];
    if (nx * hx + ny * hy + nz * hz < 0) { let t = b; b = c; c = t; t = ub; ub = uc; uc = t; t = nb; nb = nc; nc = t; }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(na[0], na[1], na[2], nb[0], nb[1], nb[2], nc[0], nc[1], nc[2]);
    this.u.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
    const col0 = Array.isArray(col[0]) ? col : [col, col, col];
    this.c.push(...col0[0], ...col0[1], ...col0[2]);
  }
  quad(a, b, c, d, ua, ub, uc, ud, col, nHint) {
    this.tri(a, b, c, ua, ub, uc, col, nHint);
    this.tri(a, c, d, ua, uc, ud, col, nHint);
  }
  // axis aligned/rotated box: centre, size, rotation about Y
  box(cx, cy, cz, sx, sy, sz, rotY, col, uvScale = 1, shade = true) {
    const hx = sx / 2, hy = sy / 2, hz = sz / 2;
    const cs = Math.cos(rotY), sn = Math.sin(rotY);
    const T = (x, y, z) => [cx + x * cs + z * sn, cy + y, cz - x * sn + z * cs];
    const v = [[-hx, -hy, -hz], [hx, -hy, -hz], [hx, hy, -hz], [-hx, hy, -hz], [-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz]].map(q => T(q[0], q[1], q[2]));
    const f = [[0, 1, 2, 3, [0, 0, -1]], [5, 4, 7, 6, [0, 0, 1]], [4, 0, 3, 7, [-1, 0, 0]], [1, 5, 6, 2, [1, 0, 0]], [3, 2, 6, 7, [0, 1, 0]], [4, 5, 1, 0, [0, -1, 0]]];
    for (const fa of f) {
      const nh = fa[4];
      const nn = [nh[0] * cs + nh[2] * sn, nh[1], -nh[0] * sn + nh[2] * cs];
      let k = 1;
      if (shade) k = nh[1] > 0 ? 1 : (nh[1] < 0 ? 0.5 : 0.78 + 0.1 * nh[0]);
      const cc = [col[0] * k, col[1] * k, col[2] * k];
      this.quad(v[fa[0]], v[fa[1]], v[fa[2]], v[fa[3]], [0, 0], [uvScale, 0], [uvScale, uvScale], [0, uvScale], cc, nn);
    }
  }
  toGeometry() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.u, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
    g.computeBoundingSphere(); g.computeBoundingBox();
    return g;
  }
}

export function polyArea(p) {
  let a = 0;
  for (let i = 0; i < p.length; i++) { const q = p[(i + 1) % p.length]; a += p[i][0] * q[1] - q[0] * p[i][1]; }
  return a / 2;
}
export function polyCentroid(p) {
  let x = 0, z = 0; for (const q of p) { x += q[0]; z += q[1]; } return [x / p.length, z / p.length];
}
// minimum-area oriented bounding box via edge directions
export function obb(p) {
  let best = null;
  for (let i = 0; i < p.length; i++) {
    const q = p[(i + 1) % p.length];
    const ang = Math.atan2(q[1] - p[i][1], q[0] - p[i][0]);
    const c = Math.cos(-ang), s = Math.sin(-ang);
    let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (const r of p) {
      const x = r[0] * c - r[1] * s, z = r[0] * s + r[1] * c;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (z < z0) z0 = z; if (z > z1) z1 = z;
    }
    const area = (x1 - x0) * (z1 - z0);
    if (!best || area < best.area) best = { area, ang, x0, x1, z0, z1 };
  }
  const cx = (best.x0 + best.x1) / 2, cz = (best.z0 + best.z1) / 2;
  const ca = Math.cos(best.ang), sa = Math.sin(best.ang);
  // centre back in world
  const wx = cx * ca - cz * sa, wz = cx * sa + cz * ca;
  let w = best.x1 - best.x0, d = best.z1 - best.z0, ang = best.ang;
  if (d > w) { const t = w; w = d; d = t; ang += Math.PI / 2; }
  return { cx: wx, cz: wz, w, d, ang, area: best.area };
}
export function lerp(a, b, t) { return a + (b - a) * t; }
export function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
export function hexToRgb(h) { return [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255]; }
export function mixCol(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
