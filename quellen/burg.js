// ===== Burg Gemen (prozedural gebaut, nach Fotos) =====
// Lokale Achsen in Metern: +x Ost, +z Sued, y hoch. Ursprung = Mitte des Burghofs.
// Benutzt nur die Bauklasse Ot (tri/quad) und einen Zufallsgenerator. Gibt drei Bauer zurueck:
//   stone = Sandstein/Ziegel/Putz (mit Steintextur), plain = nur Farben (Fenster, Holz, Efeu, Gelaender),
//   roof  = Schiefer-Daecher (mit Dachtextur).
function burgGemenBuild(Ot, rng, OX, OZ, ROT) {
  ROT = ROT || 0;
  const RC = Math.cos(ROT), RS = Math.sin(ROT);
  const G = { stone: new Ot(), plain: new Ot(), roof: new Ot() };
  const T = (x, y, z) => [OX + x * RC - z * RS, y, OZ + x * RS + z * RC];
  const RN = (n) => [n[0] * RC - n[2] * RS, n[1], n[0] * RS + n[2] * RC];
  const mul = (c, f) => [c[0] * f, c[1] * f, c[2] * f];
  const C = {
    sand: [0.82, 0.69, 0.5], sandL: [0.9, 0.82, 0.66], sandD: [0.68, 0.55, 0.4],
    brick: [0.68, 0.38, 0.29], brickD: [0.52, 0.3, 0.24], plaster: [0.86, 0.7, 0.6],
    slate: [0.34, 0.36, 0.4], white: [0.94, 0.93, 0.89], glass: [0.09, 0.12, 0.17],
    wood: [0.36, 0.26, 0.18], cobble: [0.47, 0.46, 0.47], dark: [0.05, 0.05, 0.06],
    ivy: [0.27, 0.45, 0.17], lead: [0.36, 0.38, 0.42], grey: [0.52, 0.5, 0.48]
  };
  const YG = 1.1; // Hoehe von Hof und Sockel ueber dem Wasser

  function Q(b, P0, P1, P2, P3, col, nrm, k) {
    k = k || 0.25;
    const ax = Math.abs(nrm[0]), ay = Math.abs(nrm[1]), az = Math.abs(nrm[2]);
    const uv = (p) => ay > 0.7 ? [p[0] * k, p[2] * k] : ax > az ? [p[2] * k, p[1] * k] : [p[0] * k, p[1] * k];
    b.quad(T(P0[0], P0[1], P0[2]), T(P1[0], P1[1], P1[2]), T(P2[0], P2[1], P2[2]), T(P3[0], P3[1], P3[2]), uv(P0), uv(P1), uv(P2), uv(P3), col, RN(nrm));
  }
  function TRI(b, P0, P1, P2, col, nrm, k) {
    k = k || 0.25;
    const ax = Math.abs(nrm[0]), ay = Math.abs(nrm[1]), az = Math.abs(nrm[2]);
    const uv = (p) => ay > 0.7 ? [p[0] * k, p[2] * k] : ax > az ? [p[2] * k, p[1] * k] : [p[0] * k, p[1] * k];
    b.tri(T(P0[0], P0[1], P0[2]), T(P1[0], P1[1], P1[2]), T(P2[0], P2[1], P2[2]), uv(P0), uv(P1), uv(P2), col, RN(nrm));
  }
  // Quader, achsenparallel. skip: Buchstaben t,b,n,s,e,w (Flaechen weglassen)
  function BOX(b, x0, x1, y0, y1, z0, z1, col, skip, k) {
    skip = skip || '';
    if (!skip.includes('t')) Q(b, [x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1], col, [0, 1, 0], k);
    if (!skip.includes('b')) Q(b, [x0, y0, z0], [x0, y0, z1], [x1, y0, z1], [x1, y0, z0], mul(col, 0.5), [0, -1, 0], k);
    if (!skip.includes('e')) Q(b, [x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0], mul(col, 0.93), [1, 0, 0], k);
    if (!skip.includes('w')) Q(b, [x0, y0, z1], [x0, y0, z0], [x0, y1, z0], [x0, y1, z1], mul(col, 0.8), [-1, 0, 0], k);
    if (!skip.includes('s')) Q(b, [x1, y0, z1], [x0, y0, z1], [x0, y1, z1], [x1, y1, z1], mul(col, 0.88), [0, 0, 1], k);
    if (!skip.includes('n')) Q(b, [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], mul(col, 0.9), [0, 0, -1], k);
  }
  // Zylinder (nur Mantel). a0/a1 optional: Teilstueck in Radiant
  function CYL(b, cx, cz, r, y0, y1, col, seg, a0, a1, k) {
    seg = seg || 22; a0 = a0 == null ? 0 : a0; a1 = a1 == null ? Math.PI * 2 : a1;
    for (let i = 0; i < seg; i++) {
      const s0 = a0 + (a1 - a0) * i / seg, s1 = a0 + (a1 - a0) * (i + 1) / seg, sm = (s0 + s1) / 2;
      const n = [Math.cos(sm), 0, Math.sin(sm)];
      Q(b, [cx + r * Math.cos(s0), y0, cz + r * Math.sin(s0)], [cx + r * Math.cos(s1), y0, cz + r * Math.sin(s1)],
        [cx + r * Math.cos(s1), y1, cz + r * Math.sin(s1)], [cx + r * Math.cos(s0), y1, cz + r * Math.sin(s0)],
        mul(col, 0.84 + 0.1 * n[0] - 0.05 * n[2]), n, k);
    }
  }
  function CONE(b, cx, cz, r, y0, y1, col, seg) {
    seg = seg || 22;
    const h = y1 - y0;
    for (let i = 0; i < seg; i++) {
      const s0 = i / seg * Math.PI * 2, s1 = (i + 1) / seg * Math.PI * 2, sm = (s0 + s1) / 2;
      const nn = [Math.cos(sm) * h, r, Math.sin(sm) * h], l = Math.hypot(nn[0], nn[1], nn[2]);
      const n = [nn[0] / l, nn[1] / l, nn[2] / l];
      const f = (i % 2 ? 0.94 : 1.04) * (0.88 + 0.12 * n[0]);
      TRI(b, [cx + r * Math.cos(s0), y0, cz + r * Math.sin(s0)], [cx + r * Math.cos(s1), y0, cz + r * Math.sin(s1)], [cx, y1, cz], mul(col, f), n, 0.3);
    }
  }
  // Drehkoerper aus Profil [[radius, y], ...]
  function LATHE(b, cx, cz, prof, col, seg) {
    seg = seg || 24;
    for (let k = 0; k < prof.length - 1; k++) {
      const r0 = prof[k][0], y0 = prof[k][1], r1 = prof[k + 1][0], y1 = prof[k + 1][1];
      for (let i = 0; i < seg; i++) {
        const s0 = i / seg * Math.PI * 2, s1 = (i + 1) / seg * Math.PI * 2, sm = (s0 + s1) / 2;
        const dy = y1 - y0, dr = r1 - r0;
        const nn = [Math.cos(sm) * dy, -dr, Math.sin(sm) * dy], l = Math.hypot(nn[0], nn[1], nn[2]) || 1;
        const n = [nn[0] / l, nn[1] / l, nn[2] / l];
        const f = (i % 2 ? 0.95 : 1.03) * (0.88 + 0.12 * n[0]);
        const P = (r, y, s) => [cx + r * Math.cos(s), y, cz + r * Math.sin(s)];
        if (r1 < 1e-4) TRI(b, P(r0, y0, s0), P(r0, y0, s1), [cx, y1, cz], mul(col, f), n, 0.3);
        else Q(b, P(r0, y0, s0), P(r0, y0, s1), P(r1, y1, s1), P(r1, y1, s0), mul(col, f), n, 0.3);
      }
    }
  }
  // Walmdach: Traufrechteck [x0,x1]x[z0,z1] auf Hoehe yE, First y=yE+rise, Firstkuerzung ins
  function HIP(x0, x1, z0, z1, yE, rise, ins, ov, col) {
    const b = G.roof, ex0 = x0 - ov, ex1 = x1 + ov, ez0 = z0 - ov, ez1 = z1 + ov, zc = (z0 + z1) / 2, yT = yE + rise;
    const r0 = [x0 + ins, yT, zc], r1 = [x1 - ins, yT, zc], hz = (ez1 - zc), sl = rise / (hz - 0.0);
    const nS = [0, 1, sl], lS = Math.hypot(...nS), nN = [0, 1, -sl];
    Q(b, [ex0, yE - ov * sl * 0.3, ez1], [ex1, yE - ov * sl * 0.3, ez1], r1, r0, mul(col, 1.0), [0, nS[1] / lS, nS[2] / lS], 0.3);
    Q(b, [ex1, yE - ov * sl * 0.3, ez0], [ex0, yE - ov * sl * 0.3, ez0], r0, r1, mul(col, 0.95), [0, nS[1] / lS, -nS[2] / lS], 0.3);
    const hx = ins + ov, sx = rise / hx, ln = Math.hypot(1, sx);
    TRI(b, [ex0, yE - ov * sl * 0.3, ez1], r0, [ex0, yE - ov * sl * 0.3, ez0], mul(col, 0.9), [-sx / ln, 1 / ln, 0], 0.3);
    TRI(b, [ex1, yE - ov * sl * 0.3, ez0], r1, [ex1, yE - ov * sl * 0.3, ez1], mul(col, 1.02), [sx / ln, 1 / ln, 0], 0.3);
    // Firstkappe
    BOX(G.plain, x0 + ins, x1 - ins, yT - 0.05, yT + 0.16, zc - 0.13, zc + 0.13, mul(col, 0.8), 'b');
  }
  // Satteldach mit First in z-Richtung (Giebel zeigen nach Nord/Sued)
  function GABLE_Z(x0, x1, z0, z1, yE, rise, ov, col) {
    const b = G.roof, xc = (x0 + x1) / 2, ex0 = x0 - ov, ex1 = x1 + ov, yT = yE + rise, hx = (ex1 - xc), sl = rise / hx, ln = Math.hypot(1, sl);
    Q(b, [ex0, yE, z0], [ex0, yE, z1], [xc, yT, z1], [xc, yT, z0], mul(col, 0.9), [-sl / ln, 1 / ln, 0], 0.3);
    Q(b, [ex1, yE, z1], [ex1, yE, z0], [xc, yT, z0], [xc, yT, z1], mul(col, 1.02), [sl / ln, 1 / ln, 0], 0.3);
    BOX(G.plain, xc - 0.13, xc + 0.13, yT - 0.05, yT + 0.16, z0, z1, mul(col, 0.8), 'b');
  }
  // Fenster in einer Wand. face: N,S,E,W; pos = Lage entlang der Wand; c = Wandebene
  function WIN(face, pos, y0, w, h, c, big) {
    const t = 0.15;
    const rect = (b, h0, h1, ya, yb, d0, d1, col) => {
      if (face === 'N') BOX(b, h0, h1, ya, yb, c - d1, c - d0, col, 'bs');
      else if (face === 'S') BOX(b, h0, h1, ya, yb, c + d0, c + d1, col, 'bn');
      else if (face === 'E') BOX(b, c + d0, c + d1, ya, yb, h0, h1, col, 'bw');
      else BOX(b, c - d1, c - d0, ya, yb, h0, h1, col, 'be');
    };
    // 'skip'-Angaben: wir lassen Unterseite und Rueckseite weg, Vorderseite und Seiten bleiben
    rect(G.plain, pos - w / 2 - 0.13, pos + w / 2 + 0.13, y0 - 0.12, y0 + h + 0.12, 0, t, C.white);
    rect(G.plain, pos - w / 2, pos + w / 2, y0, y0 + h, t - 0.02, t + 0.02, C.glass);
    rect(G.plain, pos - 0.04, pos + 0.04, y0, y0 + h, t - 0.02, t + 0.05, C.white);
    rect(G.plain, pos - w / 2, pos + w / 2, y0 + h * 0.62 - 0.04, y0 + h * 0.62 + 0.04, t - 0.02, t + 0.05, C.white);
    if (big) { // Verdachung ueber hohen Erdgeschossfenstern
      const yt = y0 + h + 0.12;
      rect(G.stone, pos - w / 2 - 0.35, pos + w / 2 + 0.35, yt, yt + 0.2, 0, 0.32, C.sandL);
      const hs = [pos - w / 2 - 0.3, pos + w / 2 + 0.3, pos];
      const tr = (P) => face === 'N' ? [P[0], P[1], c - 0.28] : face === 'S' ? [P[0], P[1], c + 0.28] : face === 'E' ? [c + 0.28, P[1], P[0]] : [c - 0.28, P[1], P[0]];
      const nrm = face === 'N' ? [0, 0, -1] : face === 'S' ? [0, 0, 1] : face === 'E' ? [1, 0, 0] : [-1, 0, 0];
      TRI(G.stone, tr([hs[0], yt + 0.2]), tr([hs[1], yt + 0.2]), tr([hs[2], yt + 0.2 + 0.6]), mul(C.sandL, 0.98), nrm);
    }
  }
  // Schlitzfenster am Turm
  function SLIT(cx, cz, r, y, ang, w, h) {
    const wp = T(cx + (r + 0.02) * Math.cos(ang), y, cz + (r + 0.02) * Math.sin(ang));
    G.plain.box(wp[0], y, wp[2], w, h, 0.22, Math.PI / 2 - ang - ROT, C.dark, 1, false);
  }

  // ---------- Sockel, Hof ----------
  BOX(G.stone, -19, 18.6, -0.8, YG, -14.6, 13.6, C.plaster, 't');
  Q(G.stone, [-19, YG, -14.6], [18.6, YG, -14.6], [18.6, YG, 13.6], [-19, YG, 13.6], C.cobble, [0, 1, 0], 0.18);

  // ---------- Herrenhaus (Hauptfluegel) ----------
  const MX0 = -12, MX1 = 11, MZ0 = 0.5, MZ1 = 10.5, MY = 11.6;
  BOX(G.stone, MX0, MX1, YG, MY, MZ0, MZ1, C.sand, 't');
  BOX(G.stone, MX0 - 0.15, MX1 + 0.15, 11.15, MY, MZ0 - 0.3, MZ1 + 0.3, C.sandL, 'b'); // Gesims
  BOX(G.stone, MX0 - 0.1, MX1 + 0.1, YG, YG + 0.5, MZ0 - 0.12, MZ1 + 0.12, C.sandD, 't'); // Fusszone
  for (let i = 0; i < 7; i++) {
    const x = -9.5 + i * 3.3;
    for (const [face, c] of [['N', MZ0], ['S', MZ1]]) {
      WIN(face, x, YG + 1.5, 1.3, 2.5, c, true);
      WIN(face, x, YG + 5.0, 1.2, 2.1, c, false);
      WIN(face, x, YG + 8.0, 1.1, 1.7, c, false);
    }
  }
  // Ostwand mit ein paar Fenstern, Westwand ist vom Turm verdeckt
  // Gelaender oben auf dem Gesims
  for (const z of [MZ0 - 0.18, MZ1 + 0.18]) {
    BOX(G.stone, MX0, MX1, MY + 0.82, MY + 0.98, z - 0.14, z + 0.14, C.sandL);
    BOX(G.stone, MX0, MX1, MY + 0.0, MY + 0.14, z - 0.15, z + 0.15, C.sandL);
    for (let x = MX0 + 0.3; x <= MX1 - 0.2; x += 0.95) BOX(G.stone, x - 0.11, x + 0.11, MY + 0.14, MY + 0.82, z - 0.11, z + 0.11, C.sandL, 'tb');
  }
  HIP(MX0, MX1, MZ0 + 0.1, MZ1 - 0.1, MY, 6.0, 5.4, 0.0, C.slate);
  // Dachgauben und Schornsteine
  for (const [gx, side] of [[-6.5, -1], [-1.5, -1], [3.5, -1], [-6.5, 1], [3.5, 1]]) {
    const zc = (MZ0 + MZ1) / 2, zz = zc + side * 3.05, yb = MY + 1.55;
    BOX(G.stone, gx - 0.7, gx + 0.7, yb, yb + 1.45, zz - 0.5, zz + 0.5, C.sand, 'b');
    WIN(side < 0 ? 'N' : 'S', gx, yb + 0.25, 0.8, 0.95, side < 0 ? zz - 0.5 : zz + 0.5, false);
    const b = G.roof;
    TRI(b, [gx - 0.85, yb + 1.45, zz + side * 0.62], [gx + 0.85, yb + 1.45, zz + side * 0.62], [gx, yb + 2.35, zz + side * 0.62], mul(C.slate, 0.9), [0, 0.3, side]);
    Q(b, [gx - 0.85, yb + 1.45, zz - 0.62], [gx - 0.85, yb + 1.45, zz + 0.62], [gx, yb + 2.35, zz + 0.62], [gx, yb + 2.35, zz - 0.62], mul(C.slate, 0.9), [-0.8, 0.8, 0]);
    Q(b, [gx + 0.85, yb + 1.45, zz + 0.62], [gx + 0.85, yb + 1.45, zz - 0.62], [gx, yb + 2.35, zz - 0.62], [gx, yb + 2.35, zz + 0.62], mul(C.slate, 1.0), [0.8, 0.8, 0]);
  }
  for (const [cx, cz] of [[-4.2, 3.0], [5.2, 4.2]]) {
    BOX(G.stone, cx - 0.5, cx + 0.5, MY + 3, MY + 7.2, cz - 0.5, cz + 0.5, C.brickD);
    BOX(G.stone, cx - 0.62, cx + 0.62, MY + 7.2, MY + 7.5, cz - 0.62, cz + 0.62, C.sandD);
  }

  // ---------- Rundturm mit Kegeldach (West) ----------
  const T1x = -12.6, T1z = 8.4, T1r = 3.75;
  CYL(G.stone, T1x, T1z, T1r, YG, MY, C.sand, 26);
  CYL(G.stone, T1x, T1z, T1r + 0.18, 11.1, MY, C.sandL, 26);
  CYL(G.stone, T1x, T1z, T1r + 0.1, YG, YG + 0.55, C.sandD, 26);
  CONE(G.roof, T1x, T1z, T1r + 0.45, MY, 17.8, C.slate, 26);
  for (const [y, n] of [[4.0, 5], [7.5, 5], [10.0, 4]]) {
    for (let i = 0; i < n; i++) SLIT(T1x, T1z, T1r, y + (i % 2) * 0.3, 0.2 + i * 0.95 + (y > 5 ? 0.5 : 0), 0.28, 1.25);
  }
  BOX(G.plain, T1x - 0.06, T1x + 0.06, 17.8, 18.9, T1z - 0.06, T1z + 0.06, C.lead);

  // ---------- Turm mit Zwiebelhaube (Nordost-Ecke des Herrenhauses) ----------
  const T2x = 11.0, T2z = 1.3, T2r = 3.15, T2y = 15.6;
  CYL(G.stone, T2x, T2z, T2r, YG, T2y, C.sand, 26);
  CYL(G.stone, T2x, T2z, T2r + 0.12, YG, YG + 0.6, C.sandD, 26);
  CYL(G.stone, T2x, T2z, T2r + 0.22, T2y - 0.5, T2y, C.sandL, 26);
  LATHE(G.roof, T2x, T2z, [[3.45, T2y], [3.9, T2y + 0.5], [4.12, T2y + 1.3], [3.95, T2y + 2.1], [3.35, T2y + 2.9], [2.45, T2y + 3.6], [1.9, T2y + 4.1], [1.8, T2y + 4.6], [2.25, T2y + 5.2], [2.55, T2y + 5.9], [2.3, T2y + 6.7], [1.6, T2y + 7.4], [0.9, T2y + 7.9]], C.lead, 26);
  LATHE(G.roof, T2x, T2z, [[0.7, T2y + 7.8], [0.45, T2y + 8.5], [0.2, T2y + 9.6], [0, T2y + 10.6]], C.lead, 12);
  for (const [y, n] of [[5.0, 7], [8.0, 7], [11.0, 7], [13.8, 7]]) {
    for (let i = 0; i < n; i++) SLIT(T2x, T2z, T2r, y + (i % 2) * 0.4, -1.2 + i * 0.55 + (y > 6 ? 0.2 : 0), 0.26, 1.15);
  }
  // Efeu an der Ostseite des Turmes
  {
    const r = rng;
    for (let k = 0; k < 17; k++) {
      const a0 = -1.0 + k * 0.12, top = 8.2 + 2.2 * Math.sin(k * 0.8) + r() * 1.4, y0 = YG + 0.2;
      CYL(G.plain, T2x, T2z, T2r + 0.1 + r() * 0.08, y0, top, mul(C.ivy, 0.8 + r() * 0.45), 2, a0, a0 + 0.125);
    }
  }

  // ---------- Vorburg mit Treppengiebel (Ost) ----------
  const VX0 = 12.0, VX1 = 17.3, VZ0 = -12, VZ1 = 2.0, VY = 9.8;
  BOX(G.stone, VX0, VX1, YG, VY, VZ0, VZ1, C.brick, 't');
  BOX(G.stone, VX0 - 0.1, VX1 + 0.1, YG, YG + 0.5, VZ0 - 0.1, VZ1, C.sandD, 't');
  GABLE_Z(VX0, VX1, VZ0 + 0.7, VZ1, VY, 4.2, 0.35, C.slate);
  // Treppengiebel
  {
    const wv = VX1 - VX0, xc = (VX0 + VX1) / 2, widths = [wv, wv * 0.82, wv * 0.64, wv * 0.46, wv * 0.28, wv * 0.12];
    for (let k = 0; k < widths.length; k++) {
      const y0 = VY + k * 0.85, y1 = y0 + 0.85, hw = widths[k] / 2;
      BOX(G.stone, xc - hw, xc + hw, y0, y1, VZ0, VZ0 + 0.75, C.brick, 'b');
      BOX(G.stone, xc - hw - 0.12, xc + hw + 0.12, y1 - 0.01, y1 + 0.14, VZ0 - 0.08, VZ0 + 0.83, C.sandL, 'b');
    }
    BOX(G.stone, xc - 0.15, xc + 0.15, VY + 6 * 0.85 + 0.14, VY + 6 * 0.85 + 0.75, VZ0 + 0.25, VZ0 + 0.55, C.sandL);
    // Fenster im Giebel und Erdgeschoss
    WIN('N', xc - 1.4, YG + 1.6, 1.0, 1.7, VZ0, false); WIN('N', xc + 1.4, YG + 1.6, 1.0, 1.7, VZ0, false);
    WIN('N', xc - 1.4, YG + 4.8, 1.0, 1.7, VZ0, false); WIN('N', xc + 1.4, YG + 4.8, 1.0, 1.7, VZ0, false);
    WIN('N', xc, VY + 0.25, 0.9, 1.3, VZ0, false);
    for (const z of [-9, -5.5, -2]) {
      WIN('W', z, YG + 1.5, 1.0, 1.9, VX0, false); WIN('W', z, YG + 4.9, 1.0, 1.7, VX0, false);
      WIN('E', z, YG + 1.5, 1.0, 1.9, VX1, false); WIN('E', z, YG + 4.9, 1.0, 1.7, VX1, false);
    }
  }
  // Uhrtuermchen auf dem First
  {
    const tx = (VX0 + VX1) / 2, tz = -4.6, yb = VY + 3.6;
    BOX(G.stone, tx - 1.1, tx + 1.1, yb, yb + 3.0, tz - 1.1, tz + 1.1, C.sand, 'b');
    for (const s of [-1, 1]) {
      const x = tx + s * 1.13;
      Q(G.plain, [x, yb + 1.0, tz - 0.8], [x, yb + 1.0, tz + 0.8], [x, yb + 2.6, tz + 0.8], [x, yb + 2.6, tz - 0.8], C.white, [s, 0, 0]);
      Q(G.plain, [x + s * 0.02, yb + 1.75, tz - 0.05], [x + s * 0.02, yb + 1.75, tz + 0.05], [x + s * 0.02, yb + 2.25, tz + 0.05], [x + s * 0.02, yb + 2.25, tz - 0.05], C.dark, [s, 0, 0]);
      Q(G.plain, [x + s * 0.02, yb + 1.85, tz - 0.4], [x + s * 0.02, yb + 1.85, tz + 0.4], [x + s * 0.02, yb + 1.9, tz + 0.4], [x + s * 0.02, yb + 1.9, tz - 0.4], C.dark, [s, 0, 0]);
    }
    CONE(G.roof, tx, tz, 1.6, yb + 3.0, yb + 5.4, C.lead, 8);
    BOX(G.plain, tx - 0.05, tx + 0.05, yb + 5.4, yb + 6.4, tz - 0.05, tz + 0.05, C.lead);
  }

  // ---------- Ringmauer und Tor ----------
  const WH = 4.9, WN = 6.2;
  const wallN = (x0, x1) => BOX(G.stone, x0, x1, YG, WN, -13.9, -12.7, C.plaster, 't');
  BOX(G.stone, -18.2, -17.0, YG, WH, -13.9, 6.0, C.plaster, 't'); // West
  BOX(G.stone, 17.6, 18.5, YG, WH, -13.9, 12.8, C.plaster, 't'); // Ost
  BOX(G.stone, -18.2, 18.5, YG, WH + 0.2, 11.6, 12.8, C.plaster, 't'); // Sued
  BOX(G.stone, -19.2, 18.5, WH + 0.2, WH + 0.4, 11.5, 12.9, C.sandL, 't'); // Krone
  BOX(G.stone, -18.4, -16.9, WH, WH + 0.2, -14.0, 6.0, C.sandL, 't');
  BOX(G.stone, 17.5, 18.6, WH, WH + 0.2, -14.0, 12.9, C.sandL, 't');
  // Terrasse hinter der Suedmauer (flaches Dach)
  BOX(G.plain, -12, 11, WH - 0.65, WH - 0.5, 10.5, 11.6, C.grey, 'b');
  for (let x = -17; x < 17.6; x += 2.6) BOX(G.plain, x - 0.14, x + 0.14, 2.6, 3.4, 11.5, 11.62, C.dark, 'b'); // Schiessscharten
  // Nordmauer mit Tor
  const gx = 3.5, ri = 1.85, ro = 2.55, spring = YG + 2.2;
  wallN(-18.2, gx - ro); wallN(gx + ro, 18.5);
  BOX(G.stone, -18.4, gx - ro, WN, WN + 0.2, -14.0, -12.6, C.sandL, 't');
  BOX(G.stone, gx + ro, 18.6, WN, WN + 0.2, -14.0, -12.6, C.sandL, 't');
  // Torbogen
  {
    const N = 14, zF = -13.95, zB = -12.65, crown = spring + ro;
    for (let i = 0; i < N; i++) {
      const t0 = Math.PI * i / N, t1 = Math.PI * (i + 1) / N;
      const I = (t) => [gx + ri * Math.cos(t), spring + ri * Math.sin(t)], O = (t) => [gx + ro * Math.cos(t), spring + ro * Math.sin(t)];
      const i0 = I(t0), i1 = I(t1), o0 = O(t0), o1 = O(t1);
      const col = i % 2 ? C.sandL : mul(C.sandL, 0.9);
      Q(G.stone, [i0[0], i0[1], zF], [i1[0], i1[1], zF], [o1[0], o1[1], zF], [o0[0], o0[1], zF], col, [0, 0, -1]);
      Q(G.stone, [i1[0], i1[1], zB], [i0[0], i0[1], zB], [o0[0], o0[1], zB], [o1[0], o1[1], zB], col, [0, 0, 1]);
      Q(G.stone, [i0[0], i0[1], zF], [i1[0], i1[1], zF], [i1[0], i1[1], zB], [i0[0], i0[1], zB], mul(C.sandD, 0.7), [-Math.cos((t0 + t1) / 2), -Math.sin((t0 + t1) / 2), 0]);
      // Zwickel zwischen Bogen und Mauer
      Q(G.stone, [o0[0], o0[1], zF], [o1[0], o1[1], zF], [o1[0], crown, zF], [o0[0], crown, zF], C.plaster, [0, 0, -1]);
      Q(G.stone, [o1[0], o1[1], zB], [o0[0], o0[1], zB], [o0[0], crown, zB], [o1[0], crown, zB], C.plaster, [0, 0, 1]);
    }
    BOX(G.stone, gx - ro, gx - ri, YG, spring, zF - 0.02, zB + 0.02, C.sandL, 't');
    BOX(G.stone, gx + ri, gx + ro, YG, spring, zF - 0.02, zB + 0.02, C.sandL, 't');
    BOX(G.stone, gx - ro - 0.25, gx + ro + 0.25, crown, crown + 0.3, zF - 0.12, zB + 0.12, C.sandL, 'b');
    TRI(G.stone, [gx - ro - 0.25, crown + 0.3, zF - 0.12], [gx + ro + 0.25, crown + 0.3, zF - 0.12], [gx, crown + 1.1, zF - 0.12], C.sandL, [0, 0, -1]);
    BOX(G.plain, gx - ri, gx + ri, YG, crown - 0.4, zB - 0.3, zB - 0.1, C.dark, 'tbsew'); // dunkler Durchgang
    for (const s of [-1, 1]) {
      BOX(G.stone, gx + s * (ro + 0.3) - 0.25, gx + s * (ro + 0.3) + 0.25, crown, crown + 0.5, zF - 0.1, zF + 0.4, C.sandL);
    }
  }
  // Bruecke
  {
    const z0 = -14.0, z1 = -21.5, wd = 1.9;
    BOX(G.plain, gx - wd, gx + wd, YG - 0.3, YG, z1, z0, C.wood, 'b');
    for (let z = z0 - 0.6; z > z1 + 0.3; z -= 0.55) BOX(G.plain, gx - wd, gx + wd, YG - 0.02, YG + 0.04, z - 0.22, z + 0.22, mul(C.wood, 0.85 + 0.2 * rng()), 'b');
    for (const z of [-15.3, -18.0, -20.6]) BOX(G.stone, gx - 1.2, gx + 1.2, -0.8, YG - 0.3, z - 0.7, z + 0.7, C.grey, 't');
    for (const s of [-1, 1]) {
      const x = gx + s * (wd - 0.1);
      BOX(G.plain, x - 0.05, x + 0.05, YG + 0.95, YG + 1.05, z1, z0, C.wood);
      BOX(G.plain, x - 0.05, x + 0.05, YG + 0.45, YG + 0.55, z1, z0, C.wood);
      for (let z = z0 - 0.2; z >= z1; z -= 1.8) BOX(G.plain, x - 0.07, x + 0.07, YG, YG + 1.05, z - 0.07, z + 0.07, C.wood, 'b');
    }
  }
  return G;
}
if (typeof module !== 'undefined') module.exports = { burgGemenBuild };
