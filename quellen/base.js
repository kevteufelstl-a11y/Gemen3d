(() => {
  var Fc = "160";
  var Af = 0, yl = 1, Rf = 2;
  var tu = 1, zc = 2, jn = 3, bn = 0, Ze = 1, Ue = 2;
  var Hn = 0, pi = 1, Ee = 2, Ml = 3, bl = 4, Cf = 5, Bi = 100, Pf = 101, Lf = 102, Sl = 103, El = 104, If = 200, Uf = 201, Df = 202, Nf = 203, Ja = 204, $a = 205, Of = 206, Ff = 207, zf = 208, Bf = 209, kf = 210, Hf = 211, Gf = 212, Vf = 213, Wf = 214, Xf = 0, qf = 1, Yf = 2, fo = 3, Zf = 4, Jf = 5, $f = 6, Kf = 7, eu = 0, jf = 1, Qf = 2, mi = 0, Bc = 1, kc = 2, Hc = 3, yr = 4, td = 5, Gc = 6;
  var nu = 300, Ls = 301, Is = 302, Ka = 303, ja = 304, ko = 306, Xi = 1e3, Pn = 1001, Qa = 1002, an = 1003, wl = 1004;
  var ma = 1005;
  var yn = 1006, ed = 1007;
  var ni = 1008;
  var gi = 1009, nd = 1010, id = 1011, Vc = 1012, iu = 1013, fi = 1014, di = 1015, mn = 1016, su = 1017, ru = 1018, Gi = 1020, sd = 1021, Ln = 1023, rd = 1024, od = 1025, Vi = 1026, Us = 1027, ad = 1028, ou = 1029, cd = 1030, au = 1031, cu = 1033, ga = 33776, xa = 33777, _a = 33778, va = 33779, Tl = 35840, Al = 35841, Rl = 35842, Cl = 35843, lu = 36196, Pl = 37492, Ll = 37496, Il = 37808, Ul = 37809, Dl = 37810, Nl = 37811, Ol = 37812, Fl = 37813, zl = 37814, Bl = 37815, kl = 37816, Hl = 37817, Gl = 37818, Vl = 37819, Wl = 37820, Xl = 37821, ya = 36492, ql = 36494, Yl = 36495, ld = 36283, Zl = 36284, Jl = 36285, $l = 36286;
  var po = 2300, mo = 2301, Ma = 2302, Kl = 2400, jl = 2401, Ql = 2402;
  var hu = 3e3, Wi = 3001, hd = 3200, ud = 3201, uu = 0, fd = 1, Mn = "", Se = "srgb", ii = "srgb-linear", Wc = "display-p3", Ho = "display-p3-linear", go = "linear", Me = "srgb", xo = "rec709", _o = "p3";
  var rs = 7680;
  var th = 519, dd = 512, pd = 513, md = 514, fu = 515, gd = 516, xd = 517, _d = 518, vd = 519, tc = 35044;
  var eh = "300 es", ec = 1035, ei = 2e3, vo = 2001, _i = class {
    addEventListener(t, e) {
      this._listeners === void 0 && (this._listeners = {});
      let n = this._listeners;
      n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
    }
    hasEventListener(t, e) {
      if (this._listeners === void 0) return false;
      let n = this._listeners;
      return n[t] !== void 0 && n[t].indexOf(e) !== -1;
    }
    removeEventListener(t, e) {
      if (this._listeners === void 0) return;
      let s = this._listeners[t];
      if (s !== void 0) {
        let r = s.indexOf(e);
        r !== -1 && s.splice(r, 1);
      }
    }
    dispatchEvent(t) {
      if (this._listeners === void 0) return;
      let n = this._listeners[t.type];
      if (n !== void 0) {
        t.target = this;
        let s = n.slice(0);
        for (let r = 0, a = s.length; r < a; r++) s[r].call(this, t);
        t.target = null;
      }
    }
  }, tn = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
  var ba = Math.PI / 180, nc = 180 / Math.PI;
  function xi() {
    let i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
    return (tn[i & 255] + tn[i >> 8 & 255] + tn[i >> 16 & 255] + tn[i >> 24 & 255] + "-" + tn[t & 255] + tn[t >> 8 & 255] + "-" + tn[t >> 16 & 15 | 64] + tn[t >> 24 & 255] + "-" + tn[e & 63 | 128] + tn[e >> 8 & 255] + "-" + tn[e >> 16 & 255] + tn[e >> 24 & 255] + tn[n & 255] + tn[n >> 8 & 255] + tn[n >> 16 & 255] + tn[n >> 24 & 255]).toLowerCase();
  }
  function hn(i, t, e) {
    return Math.max(t, Math.min(e, i));
  }
  function yd(i, t) {
    return (i % t + t) % t;
  }
  function Sa(i, t, e) {
    return (1 - e) * i + e * t;
  }
  function nh(i) {
    return (i & i - 1) === 0 && i !== 0;
  }
  function ic(i) {
    return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
  }
  function ti(i, t) {
    switch (t.constructor) {
      case Float32Array:
        return i;
      case Uint32Array:
        return i / 4294967295;
      case Uint16Array:
        return i / 65535;
      case Uint8Array:
        return i / 255;
      case Int32Array:
        return Math.max(i / 2147483647, -1);
      case Int16Array:
        return Math.max(i / 32767, -1);
      case Int8Array:
        return Math.max(i / 127, -1);
      default:
        throw new Error("Invalid component type.");
    }
  }
  function be(i, t) {
    switch (t.constructor) {
      case Float32Array:
        return i;
      case Uint32Array:
        return Math.round(i * 4294967295);
      case Uint16Array:
        return Math.round(i * 65535);
      case Uint8Array:
        return Math.round(i * 255);
      case Int32Array:
        return Math.round(i * 2147483647);
      case Int16Array:
        return Math.round(i * 32767);
      case Int8Array:
        return Math.round(i * 127);
      default:
        throw new Error("Invalid component type.");
    }
  }
  var Bt = class i {
    constructor(t = 0, e = 0) {
      i.prototype.isVector2 = true, this.x = t, this.y = e;
    }
    get width() {
      return this.x;
    }
    set width(t) {
      this.x = t;
    }
    get height() {
      return this.y;
    }
    set height(t) {
      this.y = t;
    }
    set(t, e) {
      return this.x = t, this.y = e, this;
    }
    setScalar(t) {
      return this.x = t, this.y = t, this;
    }
    setX(t) {
      return this.x = t, this;
    }
    setY(t) {
      return this.y = t, this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this;
    }
    add(t) {
      return this.x += t.x, this.y += t.y, this;
    }
    addScalar(t) {
      return this.x += t, this.y += t, this;
    }
    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this;
    }
    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this;
    }
    sub(t) {
      return this.x -= t.x, this.y -= t.y, this;
    }
    subScalar(t) {
      return this.x -= t, this.y -= t, this;
    }
    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this;
    }
    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this;
    }
    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this;
    }
    divide(t) {
      return this.x /= t.x, this.y /= t.y, this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    applyMatrix3(t) {
      let e = this.x, n = this.y, s = t.elements;
      return this.x = s[0] * e + s[3] * n + s[6], this.y = s[1] * e + s[4] * n + s[7], this;
    }
    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
    }
    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
    }
    clamp(t, e) {
      return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this;
    }
    clampScalar(t, e) {
      return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this;
    }
    clampLength(t, e) {
      let n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(t) {
      let e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (e === 0) return Math.PI / 2;
      let n = this.dot(t) / e;
      return Math.acos(hn(n, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      let e = this.x - t.x, n = this.y - t.y;
      return e * e + n * n;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
    }
    lerpVectors(t, e, n) {
      return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y;
    }
    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t;
    }
    fromBufferAttribute(t, e) {
      return this.x = t.getX(e), this.y = t.getY(e), this;
    }
    rotateAround(t, e) {
      let n = Math.cos(e), s = Math.sin(e), r = this.x - t.x, a = this.y - t.y;
      return this.x = r * n - a * s + t.x, this.y = r * s + a * n + t.y, this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y;
    }
  }, ue = class i {
    constructor(t, e, n, s, r, a, o, c, l) {
      i.prototype.isMatrix3 = true, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], t !== void 0 && this.set(t, e, n, s, r, a, o, c, l);
    }
    set(t, e, n, s, r, a, o, c, l) {
      let u = this.elements;
      return u[0] = t, u[1] = s, u[2] = o, u[3] = e, u[4] = r, u[5] = c, u[6] = n, u[7] = a, u[8] = l, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }
    copy(t) {
      let e = this.elements, n = t.elements;
      return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
    }
    extractBasis(t, e, n) {
      return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
    }
    setFromMatrix4(t) {
      let e = t.elements;
      return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      let n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[3], c = n[6], l = n[1], u = n[4], h = n[7], f = n[2], d = n[5], g = n[8], _ = s[0], m = s[3], p = s[6], x = s[1], v = s[4], E = s[7], R = s[2], w = s[5], T = s[8];
      return r[0] = a * _ + o * x + c * R, r[3] = a * m + o * v + c * w, r[6] = a * p + o * E + c * T, r[1] = l * _ + u * x + h * R, r[4] = l * m + u * v + h * w, r[7] = l * p + u * E + h * T, r[2] = f * _ + d * x + g * R, r[5] = f * m + d * v + g * w, r[8] = f * p + d * E + g * T, this;
    }
    multiplyScalar(t) {
      let e = this.elements;
      return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
    }
    determinant() {
      let t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], c = t[6], l = t[7], u = t[8];
      return e * a * u - e * o * l - n * r * u + n * o * c + s * r * l - s * a * c;
    }
    invert() {
      let t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], c = t[6], l = t[7], u = t[8], h = u * a - o * l, f = o * c - u * r, d = l * r - a * c, g = e * h + n * f + s * d;
      if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      let _ = 1 / g;
      return t[0] = h * _, t[1] = (s * l - u * n) * _, t[2] = (o * n - s * a) * _, t[3] = f * _, t[4] = (u * e - s * c) * _, t[5] = (s * r - o * e) * _, t[6] = d * _, t[7] = (n * c - l * e) * _, t[8] = (a * e - n * r) * _, this;
    }
    transpose() {
      let t, e = this.elements;
      return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose();
    }
    transposeIntoArray(t) {
      let e = this.elements;
      return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
    }
    setUvTransform(t, e, n, s, r, a, o) {
      let c = Math.cos(r), l = Math.sin(r);
      return this.set(n * c, n * l, -n * (c * a + l * o) + a + t, -s * l, s * c, -s * (-l * a + c * o) + o + e, 0, 0, 1), this;
    }
    scale(t, e) {
      return this.premultiply(Ea.makeScale(t, e)), this;
    }
    rotate(t) {
      return this.premultiply(Ea.makeRotation(-t)), this;
    }
    translate(t, e) {
      return this.premultiply(Ea.makeTranslation(t, e)), this;
    }
    makeTranslation(t, e) {
      return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, e, 0, 0, 1), this;
    }
    makeRotation(t) {
      let e = Math.cos(t), n = Math.sin(t);
      return this.set(e, -n, 0, n, e, 0, 0, 0, 1), this;
    }
    makeScale(t, e) {
      return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this;
    }
    equals(t) {
      let e = this.elements, n = t.elements;
      for (let s = 0; s < 9; s++) if (e[s] !== n[s]) return false;
      return true;
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
      return this;
    }
    toArray(t = [], e = 0) {
      let n = this.elements;
      return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }, Ea = new ue();
  function du(i) {
    for (let t = i.length - 1; t >= 0; --t) if (i[t] >= 65535) return true;
    return false;
  }
  function yo(i) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", i);
  }
  function Md() {
    let i = yo("canvas");
    return i.style.display = "block", i;
  }
  var ih = {};
  function cr(i) {
    i in ih || (ih[i] = true, console.warn(i));
  }
  var sh = new ue().set(0.8224621, 0.177538, 0, 0.0331941, 0.9668058, 0, 0.0170827, 0.0723974, 0.9105199), rh = new ue().set(1.2249401, -0.2249404, 0, -0.0420569, 1.0420571, 0, -0.0196376, -0.0786361, 1.0982735), Nr = { [ii]: { transfer: go, primaries: xo, toReference: (i) => i, fromReference: (i) => i }, [Se]: { transfer: Me, primaries: xo, toReference: (i) => i.convertSRGBToLinear(), fromReference: (i) => i.convertLinearToSRGB() }, [Ho]: { transfer: go, primaries: _o, toReference: (i) => i.applyMatrix3(rh), fromReference: (i) => i.applyMatrix3(sh) }, [Wc]: { transfer: Me, primaries: _o, toReference: (i) => i.convertSRGBToLinear().applyMatrix3(rh), fromReference: (i) => i.applyMatrix3(sh).convertLinearToSRGB() } }, bd = /* @__PURE__ */ new Set([ii, Ho]), ge = { enabled: true, _workingColorSpace: ii, get workingColorSpace() {
    return this._workingColorSpace;
  }, set workingColorSpace(i) {
    if (!bd.has(i)) throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  }, convert: function(i, t, e) {
    if (this.enabled === false || t === e || !t || !e) return i;
    let n = Nr[t].toReference, s = Nr[e].fromReference;
    return s(n(i));
  }, fromWorkingColorSpace: function(i, t) {
    return this.convert(i, this._workingColorSpace, t);
  }, toWorkingColorSpace: function(i, t) {
    return this.convert(i, t, this._workingColorSpace);
  }, getPrimaries: function(i) {
    return Nr[i].primaries;
  }, getTransfer: function(i) {
    return i === Mn ? go : Nr[i].transfer;
  } };
  function Cs(i) {
    return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
  }
  function wa(i) {
    return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
  }
  var os, Mo = class {
    static getDataURL(t) {
      if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
      let e;
      if (t instanceof HTMLCanvasElement) e = t;
      else {
        os === void 0 && (os = yo("canvas")), os.width = t.width, os.height = t.height;
        let n = os.getContext("2d");
        t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = os;
      }
      return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
    }
    static sRGBToLinear(t) {
      if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
        let e = yo("canvas");
        e.width = t.width, e.height = t.height;
        let n = e.getContext("2d");
        n.drawImage(t, 0, 0, t.width, t.height);
        let s = n.getImageData(0, 0, t.width, t.height), r = s.data;
        for (let a = 0; a < r.length; a++) r[a] = Cs(r[a] / 255) * 255;
        return n.putImageData(s, 0, 0), e;
      } else if (t.data) {
        let e = t.data.slice(0);
        for (let n = 0; n < e.length; n++) e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(Cs(e[n] / 255) * 255) : e[n] = Cs(e[n]);
        return { data: e, width: t.width, height: t.height };
      } else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
    }
  }, Sd = 0, bo = class {
    constructor(t = null) {
      this.isSource = true, Object.defineProperty(this, "id", { value: Sd++ }), this.uuid = xi(), this.data = t, this.version = 0;
    }
    set needsUpdate(t) {
      t === true && this.version++;
    }
    toJSON(t) {
      let e = t === void 0 || typeof t == "string";
      if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid];
      let n = { uuid: this.uuid, url: "" }, s = this.data;
      if (s !== null) {
        let r;
        if (Array.isArray(s)) {
          r = [];
          for (let a = 0, o = s.length; a < o; a++) s[a].isDataTexture ? r.push(Ta(s[a].image)) : r.push(Ta(s[a]));
        } else r = Ta(s);
        n.url = r;
      }
      return e || (t.images[this.uuid] = n), n;
    }
  };
  function Ta(i) {
    return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Mo.getDataURL(i) : i.data ? { data: Array.from(i.data), width: i.width, height: i.height, type: i.data.constructor.name } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
  }
  var Ed = 0, Sn = class i extends _i {
    constructor(t = i.DEFAULT_IMAGE, e = i.DEFAULT_MAPPING, n = Pn, s = Pn, r = yn, a = ni, o = Ln, c = gi, l = i.DEFAULT_ANISOTROPY, u = Mn) {
      super(), this.isTexture = true, Object.defineProperty(this, "id", { value: Ed++ }), this.uuid = xi(), this.name = "", this.source = new bo(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = a, this.anisotropy = l, this.format = o, this.internalFormat = null, this.type = c, this.offset = new Bt(0, 0), this.repeat = new Bt(1, 1), this.center = new Bt(0, 0), this.rotation = 0, this.matrixAutoUpdate = true, this.matrix = new ue(), this.generateMipmaps = true, this.premultiplyAlpha = false, this.flipY = true, this.unpackAlignment = 4, typeof u == "string" ? this.colorSpace = u : (cr("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = u === Wi ? Se : Mn), this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = false, this.needsPMREMUpdate = false;
    }
    get image() {
      return this.source.data;
    }
    set image(t = null) {
      this.source.data = t;
    }
    updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = true, this;
    }
    toJSON(t) {
      let e = t === void 0 || typeof t == "string";
      if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
      let n = { metadata: { version: 4.6, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, image: this.source.toJSON(t).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment };
      return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    transformUv(t) {
      if (this.mapping !== nu) return t;
      if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
        case Xi:
          t.x = t.x - Math.floor(t.x);
          break;
        case Pn:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case Qa:
          Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
          break;
      }
      if (t.y < 0 || t.y > 1) switch (this.wrapT) {
        case Xi:
          t.y = t.y - Math.floor(t.y);
          break;
        case Pn:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case Qa:
          Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
          break;
      }
      return this.flipY && (t.y = 1 - t.y), t;
    }
    set needsUpdate(t) {
      t === true && (this.version++, this.source.needsUpdate = true);
    }
    get encoding() {
      return cr("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace === Se ? Wi : hu;
    }
    set encoding(t) {
      cr("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = t === Wi ? Se : Mn;
    }
  };
  Sn.DEFAULT_IMAGE = null;
  Sn.DEFAULT_MAPPING = nu;
  Sn.DEFAULT_ANISOTROPY = 1;
  var Pe = class i {
    constructor(t = 0, e = 0, n = 0, s = 1) {
      i.prototype.isVector4 = true, this.x = t, this.y = e, this.z = n, this.w = s;
    }
    get width() {
      return this.z;
    }
    set width(t) {
      this.z = t;
    }
    get height() {
      return this.w;
    }
    set height(t) {
      this.w = t;
    }
    set(t, e, n, s) {
      return this.x = t, this.y = e, this.z = n, this.w = s, this;
    }
    setScalar(t) {
      return this.x = t, this.y = t, this.z = t, this.w = t, this;
    }
    setX(t) {
      return this.x = t, this;
    }
    setY(t) {
      return this.y = t, this;
    }
    setZ(t) {
      return this.z = t, this;
    }
    setW(t) {
      return this.w = t, this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        case 3:
          this.w = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
    }
    add(t) {
      return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
    }
    addScalar(t) {
      return this.x += t, this.y += t, this.z += t, this.w += t, this;
    }
    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
    }
    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
    }
    sub(t) {
      return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
    }
    subScalar(t) {
      return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
    }
    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
    }
    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
    }
    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
    }
    applyMatrix4(t) {
      let e = this.x, n = this.y, s = this.z, r = this.w, a = t.elements;
      return this.x = a[0] * e + a[4] * n + a[8] * s + a[12] * r, this.y = a[1] * e + a[5] * n + a[9] * s + a[13] * r, this.z = a[2] * e + a[6] * n + a[10] * s + a[14] * r, this.w = a[3] * e + a[7] * n + a[11] * s + a[15] * r, this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    setAxisAngleFromQuaternion(t) {
      this.w = 2 * Math.acos(t.w);
      let e = Math.sqrt(1 - t.w * t.w);
      return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
    }
    setAxisAngleFromRotationMatrix(t) {
      let e, n, s, r, c = t.elements, l = c[0], u = c[4], h = c[8], f = c[1], d = c[5], g = c[9], _ = c[2], m = c[6], p = c[10];
      if (Math.abs(u - f) < 0.01 && Math.abs(h - _) < 0.01 && Math.abs(g - m) < 0.01) {
        if (Math.abs(u + f) < 0.1 && Math.abs(h + _) < 0.1 && Math.abs(g + m) < 0.1 && Math.abs(l + d + p - 3) < 0.1) return this.set(1, 0, 0, 0), this;
        e = Math.PI;
        let v = (l + 1) / 2, E = (d + 1) / 2, R = (p + 1) / 2, w = (u + f) / 4, T = (h + _) / 4, U = (g + m) / 4;
        return v > E && v > R ? v < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(v), s = w / n, r = T / n) : E > R ? E < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(E), n = w / s, r = U / s) : R < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(R), n = T / r, s = U / r), this.set(n, s, r, e), this;
      }
      let x = Math.sqrt((m - g) * (m - g) + (h - _) * (h - _) + (f - u) * (f - u));
      return Math.abs(x) < 1e-3 && (x = 1), this.x = (m - g) / x, this.y = (h - _) / x, this.z = (f - u) / x, this.w = Math.acos((l + d + p - 1) / 2), this;
    }
    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
    }
    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
    }
    clamp(t, e) {
      return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this;
    }
    clampScalar(t, e) {
      return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this.w = Math.max(t, Math.min(e, this.w)), this;
    }
    clampLength(t, e) {
      let n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
    }
    lerpVectors(t, e, n) {
      return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
    }
    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
    }
    fromBufferAttribute(t, e) {
      return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z, yield this.w;
    }
  }, sc = class extends _i {
    constructor(t = 1, e = 1, n = {}) {
      super(), this.isRenderTarget = true, this.width = t, this.height = e, this.depth = 1, this.scissor = new Pe(0, 0, t, e), this.scissorTest = false, this.viewport = new Pe(0, 0, t, e);
      let s = { width: t, height: e, depth: 1 };
      n.encoding !== void 0 && (cr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."), n.colorSpace = n.encoding === Wi ? Se : Mn), n = Object.assign({ generateMipmaps: false, internalFormat: null, minFilter: yn, depthBuffer: true, stencilBuffer: false, depthTexture: null, samples: 0 }, n), this.texture = new Sn(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace), this.texture.isRenderTargetTexture = true, this.texture.flipY = false, this.texture.generateMipmaps = n.generateMipmaps, this.texture.internalFormat = n.internalFormat, this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
    }
    setSize(t, e, n = 1) {
      (this.width !== t || this.height !== e || this.depth !== n) && (this.width = t, this.height = e, this.depth = n, this.texture.image.width = t, this.texture.image.height = e, this.texture.image.depth = n, this.dispose()), this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.texture = t.texture.clone(), this.texture.isRenderTargetTexture = true;
      let e = Object.assign({}, t.texture.image);
      return this.texture.source = new bo(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }, Je = class extends sc {
    constructor(t = 1, e = 1, n = {}) {
      super(t, e, n), this.isWebGLRenderTarget = true;
    }
  }, So = class extends Sn {
    constructor(t = null, e = 1, n = 1, s = 1) {
      super(null), this.isDataArrayTexture = true, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = an, this.minFilter = an, this.wrapR = Pn, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
  };
  var rc = class extends Sn {
    constructor(t = null, e = 1, n = 1, s = 1) {
      super(null), this.isData3DTexture = true, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = an, this.minFilter = an, this.wrapR = Pn, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
  };
  var En = class {
    constructor(t = 0, e = 0, n = 0, s = 1) {
      this.isQuaternion = true, this._x = t, this._y = e, this._z = n, this._w = s;
    }
    static slerpFlat(t, e, n, s, r, a, o) {
      let c = n[s + 0], l = n[s + 1], u = n[s + 2], h = n[s + 3], f = r[a + 0], d = r[a + 1], g = r[a + 2], _ = r[a + 3];
      if (o === 0) {
        t[e + 0] = c, t[e + 1] = l, t[e + 2] = u, t[e + 3] = h;
        return;
      }
      if (o === 1) {
        t[e + 0] = f, t[e + 1] = d, t[e + 2] = g, t[e + 3] = _;
        return;
      }
      if (h !== _ || c !== f || l !== d || u !== g) {
        let m = 1 - o, p = c * f + l * d + u * g + h * _, x = p >= 0 ? 1 : -1, v = 1 - p * p;
        if (v > Number.EPSILON) {
          let R = Math.sqrt(v), w = Math.atan2(R, p * x);
          m = Math.sin(m * w) / R, o = Math.sin(o * w) / R;
        }
        let E = o * x;
        if (c = c * m + f * E, l = l * m + d * E, u = u * m + g * E, h = h * m + _ * E, m === 1 - o) {
          let R = 1 / Math.sqrt(c * c + l * l + u * u + h * h);
          c *= R, l *= R, u *= R, h *= R;
        }
      }
      t[e] = c, t[e + 1] = l, t[e + 2] = u, t[e + 3] = h;
    }
    static multiplyQuaternionsFlat(t, e, n, s, r, a) {
      let o = n[s], c = n[s + 1], l = n[s + 2], u = n[s + 3], h = r[a], f = r[a + 1], d = r[a + 2], g = r[a + 3];
      return t[e] = o * g + u * h + c * d - l * f, t[e + 1] = c * g + u * f + l * h - o * d, t[e + 2] = l * g + u * d + o * f - c * h, t[e + 3] = u * g - o * h - c * f - l * d, t;
    }
    get x() {
      return this._x;
    }
    set x(t) {
      this._x = t, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      this._y = t, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      this._z = t, this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(t) {
      this._w = t, this._onChangeCallback();
    }
    set(t, e, n, s) {
      return this._x = t, this._y = e, this._z = n, this._w = s, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(t) {
      return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
    }
    setFromEuler(t, e = true) {
      let n = t._x, s = t._y, r = t._z, a = t._order, o = Math.cos, c = Math.sin, l = o(n / 2), u = o(s / 2), h = o(r / 2), f = c(n / 2), d = c(s / 2), g = c(r / 2);
      switch (a) {
        case "XYZ":
          this._x = f * u * h + l * d * g, this._y = l * d * h - f * u * g, this._z = l * u * g + f * d * h, this._w = l * u * h - f * d * g;
          break;
        case "YXZ":
          this._x = f * u * h + l * d * g, this._y = l * d * h - f * u * g, this._z = l * u * g - f * d * h, this._w = l * u * h + f * d * g;
          break;
        case "ZXY":
          this._x = f * u * h - l * d * g, this._y = l * d * h + f * u * g, this._z = l * u * g + f * d * h, this._w = l * u * h - f * d * g;
          break;
        case "ZYX":
          this._x = f * u * h - l * d * g, this._y = l * d * h + f * u * g, this._z = l * u * g - f * d * h, this._w = l * u * h + f * d * g;
          break;
        case "YZX":
          this._x = f * u * h + l * d * g, this._y = l * d * h + f * u * g, this._z = l * u * g - f * d * h, this._w = l * u * h - f * d * g;
          break;
        case "XZY":
          this._x = f * u * h - l * d * g, this._y = l * d * h - f * u * g, this._z = l * u * g + f * d * h, this._w = l * u * h + f * d * g;
          break;
        default:
          console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
      }
      return e === true && this._onChangeCallback(), this;
    }
    setFromAxisAngle(t, e) {
      let n = e / 2, s = Math.sin(n);
      return this._x = t.x * s, this._y = t.y * s, this._z = t.z * s, this._w = Math.cos(n), this._onChangeCallback(), this;
    }
    setFromRotationMatrix(t) {
      let e = t.elements, n = e[0], s = e[4], r = e[8], a = e[1], o = e[5], c = e[9], l = e[2], u = e[6], h = e[10], f = n + o + h;
      if (f > 0) {
        let d = 0.5 / Math.sqrt(f + 1);
        this._w = 0.25 / d, this._x = (u - c) * d, this._y = (r - l) * d, this._z = (a - s) * d;
      } else if (n > o && n > h) {
        let d = 2 * Math.sqrt(1 + n - o - h);
        this._w = (u - c) / d, this._x = 0.25 * d, this._y = (s + a) / d, this._z = (r + l) / d;
      } else if (o > h) {
        let d = 2 * Math.sqrt(1 + o - n - h);
        this._w = (r - l) / d, this._x = (s + a) / d, this._y = 0.25 * d, this._z = (c + u) / d;
      } else {
        let d = 2 * Math.sqrt(1 + h - n - o);
        this._w = (a - s) / d, this._x = (r + l) / d, this._y = (c + u) / d, this._z = 0.25 * d;
      }
      return this._onChangeCallback(), this;
    }
    setFromUnitVectors(t, e) {
      let n = t.dot(e) + 1;
      return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
    }
    angleTo(t) {
      return 2 * Math.acos(Math.abs(hn(this.dot(t), -1, 1)));
    }
    rotateTowards(t, e) {
      let n = this.angleTo(t);
      if (n === 0) return this;
      let s = Math.min(1, e / n);
      return this.slerp(t, s), this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
    }
    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
      let t = this.length();
      return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
    }
    multiply(t) {
      return this.multiplyQuaternions(this, t);
    }
    premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }
    multiplyQuaternions(t, e) {
      let n = t._x, s = t._y, r = t._z, a = t._w, o = e._x, c = e._y, l = e._z, u = e._w;
      return this._x = n * u + a * o + s * l - r * c, this._y = s * u + a * c + r * o - n * l, this._z = r * u + a * l + n * c - s * o, this._w = a * u - n * o - s * c - r * l, this._onChangeCallback(), this;
    }
    slerp(t, e) {
      if (e === 0) return this;
      if (e === 1) return this.copy(t);
      let n = this._x, s = this._y, r = this._z, a = this._w, o = a * t._w + n * t._x + s * t._y + r * t._z;
      if (o < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, o = -o) : this.copy(t), o >= 1) return this._w = a, this._x = n, this._y = s, this._z = r, this;
      let c = 1 - o * o;
      if (c <= Number.EPSILON) {
        let d = 1 - e;
        return this._w = d * a + e * this._w, this._x = d * n + e * this._x, this._y = d * s + e * this._y, this._z = d * r + e * this._z, this.normalize(), this;
      }
      let l = Math.sqrt(c), u = Math.atan2(l, o), h = Math.sin((1 - e) * u) / l, f = Math.sin(e * u) / l;
      return this._w = a * h + this._w * f, this._x = n * h + this._x * f, this._y = s * h + this._y * f, this._z = r * h + this._z * f, this._onChangeCallback(), this;
    }
    slerpQuaternions(t, e, n) {
      return this.copy(t).slerp(e, n);
    }
    random() {
      let t = Math.random(), e = Math.sqrt(1 - t), n = Math.sqrt(t), s = 2 * Math.PI * Math.random(), r = 2 * Math.PI * Math.random();
      return this.set(e * Math.cos(s), n * Math.sin(r), n * Math.cos(r), e * Math.sin(s));
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
    }
    fromArray(t, e = 0) {
      return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
    }
    fromBufferAttribute(t, e) {
      return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(t) {
      return this._onChangeCallback = t, this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._w;
    }
  }, Y = class i {
    constructor(t = 0, e = 0, n = 0) {
      i.prototype.isVector3 = true, this.x = t, this.y = e, this.z = n;
    }
    set(t, e, n) {
      return n === void 0 && (n = this.z), this.x = t, this.y = e, this.z = n, this;
    }
    setScalar(t) {
      return this.x = t, this.y = t, this.z = t, this;
    }
    setX(t) {
      return this.x = t, this;
    }
    setY(t) {
      return this.y = t, this;
    }
    setZ(t) {
      return this.z = t, this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this;
    }
    add(t) {
      return this.x += t.x, this.y += t.y, this.z += t.z, this;
    }
    addScalar(t) {
      return this.x += t, this.y += t, this.z += t, this;
    }
    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
    }
    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
    }
    sub(t) {
      return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
    }
    subScalar(t) {
      return this.x -= t, this.y -= t, this.z -= t, this;
    }
    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
    }
    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
    }
    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this.z *= t, this;
    }
    multiplyVectors(t, e) {
      return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
    }
    applyEuler(t) {
      return this.applyQuaternion(oh.setFromEuler(t));
    }
    applyAxisAngle(t, e) {
      return this.applyQuaternion(oh.setFromAxisAngle(t, e));
    }
    applyMatrix3(t) {
      let e = this.x, n = this.y, s = this.z, r = t.elements;
      return this.x = r[0] * e + r[3] * n + r[6] * s, this.y = r[1] * e + r[4] * n + r[7] * s, this.z = r[2] * e + r[5] * n + r[8] * s, this;
    }
    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }
    applyMatrix4(t) {
      let e = this.x, n = this.y, s = this.z, r = t.elements, a = 1 / (r[3] * e + r[7] * n + r[11] * s + r[15]);
      return this.x = (r[0] * e + r[4] * n + r[8] * s + r[12]) * a, this.y = (r[1] * e + r[5] * n + r[9] * s + r[13]) * a, this.z = (r[2] * e + r[6] * n + r[10] * s + r[14]) * a, this;
    }
    applyQuaternion(t) {
      let e = this.x, n = this.y, s = this.z, r = t.x, a = t.y, o = t.z, c = t.w, l = 2 * (a * s - o * n), u = 2 * (o * e - r * s), h = 2 * (r * n - a * e);
      return this.x = e + c * l + a * h - o * u, this.y = n + c * u + o * l - r * h, this.z = s + c * h + r * u - a * l, this;
    }
    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
    }
    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
    }
    transformDirection(t) {
      let e = this.x, n = this.y, s = this.z, r = t.elements;
      return this.x = r[0] * e + r[4] * n + r[8] * s, this.y = r[1] * e + r[5] * n + r[9] * s, this.z = r[2] * e + r[6] * n + r[10] * s, this.normalize();
    }
    divide(t) {
      return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
    }
    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
    }
    clamp(t, e) {
      return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this;
    }
    clampScalar(t, e) {
      return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this;
    }
    clampLength(t, e) {
      let n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
    }
    lerpVectors(t, e, n) {
      return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
    }
    cross(t) {
      return this.crossVectors(this, t);
    }
    crossVectors(t, e) {
      let n = t.x, s = t.y, r = t.z, a = e.x, o = e.y, c = e.z;
      return this.x = s * c - r * o, this.y = r * a - n * c, this.z = n * o - s * a, this;
    }
    projectOnVector(t) {
      let e = t.lengthSq();
      if (e === 0) return this.set(0, 0, 0);
      let n = t.dot(this) / e;
      return this.copy(t).multiplyScalar(n);
    }
    projectOnPlane(t) {
      return Aa.copy(this).projectOnVector(t), this.sub(Aa);
    }
    reflect(t) {
      return this.sub(Aa.copy(t).multiplyScalar(2 * this.dot(t)));
    }
    angleTo(t) {
      let e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (e === 0) return Math.PI / 2;
      let n = this.dot(t) / e;
      return Math.acos(hn(n, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      let e = this.x - t.x, n = this.y - t.y, s = this.z - t.z;
      return e * e + n * n + s * s;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
    }
    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }
    setFromSphericalCoords(t, e, n) {
      let s = Math.sin(e) * t;
      return this.x = s * Math.sin(n), this.y = Math.cos(e) * t, this.z = s * Math.cos(n), this;
    }
    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }
    setFromCylindricalCoords(t, e, n) {
      return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
    }
    setFromMatrixPosition(t) {
      let e = t.elements;
      return this.x = e[12], this.y = e[13], this.z = e[14], this;
    }
    setFromMatrixScale(t) {
      let e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), s = this.setFromMatrixColumn(t, 2).length();
      return this.x = e, this.y = n, this.z = s, this;
    }
    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, e * 4);
    }
    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, e * 3);
    }
    setFromEuler(t) {
      return this.x = t._x, this.y = t._y, this.z = t._z, this;
    }
    setFromColor(t) {
      return this.x = t.r, this.y = t.g, this.z = t.b, this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }
    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
    }
    fromBufferAttribute(t, e) {
      return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
    }
    randomDirection() {
      let t = (Math.random() - 0.5) * 2, e = Math.random() * Math.PI * 2, n = Math.sqrt(1 - t ** 2);
      return this.x = n * Math.cos(e), this.y = n * Math.sin(e), this.z = t, this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z;
    }
  }, Aa = new Y(), oh = new En(), In = class {
    constructor(t = new Y(1 / 0, 1 / 0, 1 / 0), e = new Y(-1 / 0, -1 / 0, -1 / 0)) {
      this.isBox3 = true, this.min = t, this.max = e;
    }
    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this;
    }
    setFromArray(t) {
      this.makeEmpty();
      for (let e = 0, n = t.length; e < n; e += 3) this.expandByPoint(An.fromArray(t, e));
      return this;
    }
    setFromBufferAttribute(t) {
      this.makeEmpty();
      for (let e = 0, n = t.count; e < n; e++) this.expandByPoint(An.fromBufferAttribute(t, e));
      return this;
    }
    setFromPoints(t) {
      this.makeEmpty();
      for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
      return this;
    }
    setFromCenterAndSize(t, e) {
      let n = An.copy(e).multiplyScalar(0.5);
      return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
    }
    setFromObject(t, e = false) {
      return this.makeEmpty(), this.expandByObject(t, e);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this;
    }
    makeEmpty() {
      return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(t) {
      return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(t) {
      return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
    }
    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this;
    }
    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this;
    }
    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this;
    }
    expandByObject(t, e = false) {
      t.updateWorldMatrix(false, false);
      let n = t.geometry;
      if (n !== void 0) {
        let r = n.getAttribute("position");
        if (e === true && r !== void 0 && t.isInstancedMesh !== true) for (let a = 0, o = r.count; a < o; a++) t.isMesh === true ? t.getVertexPosition(a, An) : An.fromBufferAttribute(r, a), An.applyMatrix4(t.matrixWorld), this.expandByPoint(An);
        else t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), Or.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Or.copy(n.boundingBox)), Or.applyMatrix4(t.matrixWorld), this.union(Or);
      }
      let s = t.children;
      for (let r = 0, a = s.length; r < a; r++) this.expandByObject(s[r], e);
      return this;
    }
    containsPoint(t) {
      return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z);
    }
    containsBox(t) {
      return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
    }
    getParameter(t, e) {
      return e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z));
    }
    intersectsBox(t) {
      return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z);
    }
    intersectsSphere(t) {
      return this.clampPoint(t.center, An), An.distanceToSquared(t.center) <= t.radius * t.radius;
    }
    intersectsPlane(t) {
      let e, n;
      return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
    }
    intersectsTriangle(t) {
      if (this.isEmpty()) return false;
      this.getCenter(js), Fr.subVectors(this.max, js), as.subVectors(t.a, js), cs.subVectors(t.b, js), ls.subVectors(t.c, js), ai.subVectors(cs, as), ci.subVectors(ls, cs), Di.subVectors(as, ls);
      let e = [0, -ai.z, ai.y, 0, -ci.z, ci.y, 0, -Di.z, Di.y, ai.z, 0, -ai.x, ci.z, 0, -ci.x, Di.z, 0, -Di.x, -ai.y, ai.x, 0, -ci.y, ci.x, 0, -Di.y, Di.x, 0];
      return !Ra(e, as, cs, ls, Fr) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Ra(e, as, cs, ls, Fr)) ? false : (zr.crossVectors(ai, ci), e = [zr.x, zr.y, zr.z], Ra(e, as, cs, ls, Fr));
    }
    clampPoint(t, e) {
      return e.copy(t).clamp(this.min, this.max);
    }
    distanceToPoint(t) {
      return this.clampPoint(t, An).distanceTo(t);
    }
    getBoundingSphere(t) {
      return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(An).length() * 0.5), t;
    }
    intersect(t) {
      return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
    }
    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this;
    }
    applyMatrix4(t) {
      return this.isEmpty() ? this : (Yn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), Yn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), Yn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), Yn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), Yn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), Yn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), Yn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), Yn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(Yn), this);
    }
    translate(t) {
      return this.min.add(t), this.max.add(t), this;
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max);
    }
  }, Yn = [new Y(), new Y(), new Y(), new Y(), new Y(), new Y(), new Y(), new Y()], An = new Y(), Or = new In(), as = new Y(), cs = new Y(), ls = new Y(), ai = new Y(), ci = new Y(), Di = new Y(), js = new Y(), Fr = new Y(), zr = new Y(), Ni = new Y();
  function Ra(i, t, e, n, s) {
    for (let r = 0, a = i.length - 3; r <= a; r += 3) {
      Ni.fromArray(i, r);
      let o = s.x * Math.abs(Ni.x) + s.y * Math.abs(Ni.y) + s.z * Math.abs(Ni.z), c = t.dot(Ni), l = e.dot(Ni), u = n.dot(Ni);
      if (Math.max(-Math.max(c, l, u), Math.min(c, l, u)) > o) return false;
    }
    return true;
  }
  var wd = new In(), Qs = new Y(), Ca = new Y(), vi = class {
    constructor(t = new Y(), e = -1) {
      this.isSphere = true, this.center = t, this.radius = e;
    }
    set(t, e) {
      return this.center.copy(t), this.radius = e, this;
    }
    setFromPoints(t, e) {
      let n = this.center;
      e !== void 0 ? n.copy(e) : wd.setFromPoints(t).getCenter(n);
      let s = 0;
      for (let r = 0, a = t.length; r < a; r++) s = Math.max(s, n.distanceToSquared(t[r]));
      return this.radius = Math.sqrt(s), this;
    }
    copy(t) {
      return this.center.copy(t.center), this.radius = t.radius, this;
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), this.radius = -1, this;
    }
    containsPoint(t) {
      return t.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(t) {
      return t.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(t) {
      let e = this.radius + t.radius;
      return t.center.distanceToSquared(this.center) <= e * e;
    }
    intersectsBox(t) {
      return t.intersectsSphere(this);
    }
    intersectsPlane(t) {
      return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(t, e) {
      let n = this.center.distanceToSquared(t);
      return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
    }
    getBoundingBox(t) {
      return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
    }
    applyMatrix4(t) {
      return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
    }
    translate(t) {
      return this.center.add(t), this;
    }
    expandByPoint(t) {
      if (this.isEmpty()) return this.center.copy(t), this.radius = 0, this;
      Qs.subVectors(t, this.center);
      let e = Qs.lengthSq();
      if (e > this.radius * this.radius) {
        let n = Math.sqrt(e), s = (n - this.radius) * 0.5;
        this.center.addScaledVector(Qs, s / n), this.radius += s;
      }
      return this;
    }
    union(t) {
      return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === true ? this.radius = Math.max(this.radius, t.radius) : (Ca.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(Qs.copy(t.center).add(Ca)), this.expandByPoint(Qs.copy(t.center).sub(Ca))), this);
    }
    equals(t) {
      return t.center.equals(this.center) && t.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }, Zn = new Y(), Pa = new Y(), Br = new Y(), li = new Y(), La = new Y(), kr = new Y(), Ia = new Y(), hr = class {
    constructor(t = new Y(), e = new Y(0, 0, -1)) {
      this.origin = t, this.direction = e;
    }
    set(t, e) {
      return this.origin.copy(t), this.direction.copy(e), this;
    }
    copy(t) {
      return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
    }
    at(t, e) {
      return e.copy(this.origin).addScaledVector(this.direction, t);
    }
    lookAt(t) {
      return this.direction.copy(t).sub(this.origin).normalize(), this;
    }
    recast(t) {
      return this.origin.copy(this.at(t, Zn)), this;
    }
    closestPointToPoint(t, e) {
      e.subVectors(t, this.origin);
      let n = e.dot(this.direction);
      return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
    }
    distanceToPoint(t) {
      return Math.sqrt(this.distanceSqToPoint(t));
    }
    distanceSqToPoint(t) {
      let e = Zn.subVectors(t, this.origin).dot(this.direction);
      return e < 0 ? this.origin.distanceToSquared(t) : (Zn.copy(this.origin).addScaledVector(this.direction, e), Zn.distanceToSquared(t));
    }
    distanceSqToSegment(t, e, n, s) {
      Pa.copy(t).add(e).multiplyScalar(0.5), Br.copy(e).sub(t).normalize(), li.copy(this.origin).sub(Pa);
      let r = t.distanceTo(e) * 0.5, a = -this.direction.dot(Br), o = li.dot(this.direction), c = -li.dot(Br), l = li.lengthSq(), u = Math.abs(1 - a * a), h, f, d, g;
      if (u > 0) if (h = a * c - o, f = a * o - c, g = r * u, h >= 0) if (f >= -g) if (f <= g) {
        let _ = 1 / u;
        h *= _, f *= _, d = h * (h + a * f + 2 * o) + f * (a * h + f + 2 * c) + l;
      } else f = r, h = Math.max(0, -(a * f + o)), d = -h * h + f * (f + 2 * c) + l;
      else f = -r, h = Math.max(0, -(a * f + o)), d = -h * h + f * (f + 2 * c) + l;
      else f <= -g ? (h = Math.max(0, -(-a * r + o)), f = h > 0 ? -r : Math.min(Math.max(-r, -c), r), d = -h * h + f * (f + 2 * c) + l) : f <= g ? (h = 0, f = Math.min(Math.max(-r, -c), r), d = f * (f + 2 * c) + l) : (h = Math.max(0, -(a * r + o)), f = h > 0 ? r : Math.min(Math.max(-r, -c), r), d = -h * h + f * (f + 2 * c) + l);
      else f = a > 0 ? -r : r, h = Math.max(0, -(a * f + o)), d = -h * h + f * (f + 2 * c) + l;
      return n && n.copy(this.origin).addScaledVector(this.direction, h), s && s.copy(Pa).addScaledVector(Br, f), d;
    }
    intersectSphere(t, e) {
      Zn.subVectors(t.center, this.origin);
      let n = Zn.dot(this.direction), s = Zn.dot(Zn) - n * n, r = t.radius * t.radius;
      if (s > r) return null;
      let a = Math.sqrt(r - s), o = n - a, c = n + a;
      return c < 0 ? null : o < 0 ? this.at(c, e) : this.at(o, e);
    }
    intersectsSphere(t) {
      return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
    }
    distanceToPlane(t) {
      let e = t.normal.dot(this.direction);
      if (e === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null;
      let n = -(this.origin.dot(t.normal) + t.constant) / e;
      return n >= 0 ? n : null;
    }
    intersectPlane(t, e) {
      let n = this.distanceToPlane(t);
      return n === null ? null : this.at(n, e);
    }
    intersectsPlane(t) {
      let e = t.distanceToPoint(this.origin);
      return e === 0 || t.normal.dot(this.direction) * e < 0;
    }
    intersectBox(t, e) {
      let n, s, r, a, o, c, l = 1 / this.direction.x, u = 1 / this.direction.y, h = 1 / this.direction.z, f = this.origin;
      return l >= 0 ? (n = (t.min.x - f.x) * l, s = (t.max.x - f.x) * l) : (n = (t.max.x - f.x) * l, s = (t.min.x - f.x) * l), u >= 0 ? (r = (t.min.y - f.y) * u, a = (t.max.y - f.y) * u) : (r = (t.max.y - f.y) * u, a = (t.min.y - f.y) * u), n > a || r > s || ((r > n || isNaN(n)) && (n = r), (a < s || isNaN(s)) && (s = a), h >= 0 ? (o = (t.min.z - f.z) * h, c = (t.max.z - f.z) * h) : (o = (t.max.z - f.z) * h, c = (t.min.z - f.z) * h), n > c || o > s) || ((o > n || n !== n) && (n = o), (c < s || s !== s) && (s = c), s < 0) ? null : this.at(n >= 0 ? n : s, e);
    }
    intersectsBox(t) {
      return this.intersectBox(t, Zn) !== null;
    }
    intersectTriangle(t, e, n, s, r) {
      La.subVectors(e, t), kr.subVectors(n, t), Ia.crossVectors(La, kr);
      let a = this.direction.dot(Ia), o;
      if (a > 0) {
        if (s) return null;
        o = 1;
      } else if (a < 0) o = -1, a = -a;
      else return null;
      li.subVectors(this.origin, t);
      let c = o * this.direction.dot(kr.crossVectors(li, kr));
      if (c < 0) return null;
      let l = o * this.direction.dot(La.cross(li));
      if (l < 0 || c + l > a) return null;
      let u = -o * li.dot(Ia);
      return u < 0 ? null : this.at(u / a, r);
    }
    applyMatrix4(t) {
      return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
    }
    equals(t) {
      return t.origin.equals(this.origin) && t.direction.equals(this.direction);
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }, ve = class i {
    constructor(t, e, n, s, r, a, o, c, l, u, h, f, d, g, _, m) {
      i.prototype.isMatrix4 = true, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], t !== void 0 && this.set(t, e, n, s, r, a, o, c, l, u, h, f, d, g, _, m);
    }
    set(t, e, n, s, r, a, o, c, l, u, h, f, d, g, _, m) {
      let p = this.elements;
      return p[0] = t, p[4] = e, p[8] = n, p[12] = s, p[1] = r, p[5] = a, p[9] = o, p[13] = c, p[2] = l, p[6] = u, p[10] = h, p[14] = f, p[3] = d, p[7] = g, p[11] = _, p[15] = m, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    clone() {
      return new i().fromArray(this.elements);
    }
    copy(t) {
      let e = this.elements, n = t.elements;
      return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
    }
    copyPosition(t) {
      let e = this.elements, n = t.elements;
      return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
    }
    setFromMatrix3(t) {
      let e = t.elements;
      return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this;
    }
    extractBasis(t, e, n) {
      return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
    }
    makeBasis(t, e, n) {
      return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this;
    }
    extractRotation(t) {
      let e = this.elements, n = t.elements, s = 1 / hs.setFromMatrixColumn(t, 0).length(), r = 1 / hs.setFromMatrixColumn(t, 1).length(), a = 1 / hs.setFromMatrixColumn(t, 2).length();
      return e[0] = n[0] * s, e[1] = n[1] * s, e[2] = n[2] * s, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }
    makeRotationFromEuler(t) {
      let e = this.elements, n = t.x, s = t.y, r = t.z, a = Math.cos(n), o = Math.sin(n), c = Math.cos(s), l = Math.sin(s), u = Math.cos(r), h = Math.sin(r);
      if (t.order === "XYZ") {
        let f = a * u, d = a * h, g = o * u, _ = o * h;
        e[0] = c * u, e[4] = -c * h, e[8] = l, e[1] = d + g * l, e[5] = f - _ * l, e[9] = -o * c, e[2] = _ - f * l, e[6] = g + d * l, e[10] = a * c;
      } else if (t.order === "YXZ") {
        let f = c * u, d = c * h, g = l * u, _ = l * h;
        e[0] = f + _ * o, e[4] = g * o - d, e[8] = a * l, e[1] = a * h, e[5] = a * u, e[9] = -o, e[2] = d * o - g, e[6] = _ + f * o, e[10] = a * c;
      } else if (t.order === "ZXY") {
        let f = c * u, d = c * h, g = l * u, _ = l * h;
        e[0] = f - _ * o, e[4] = -a * h, e[8] = g + d * o, e[1] = d + g * o, e[5] = a * u, e[9] = _ - f * o, e[2] = -a * l, e[6] = o, e[10] = a * c;
      } else if (t.order === "ZYX") {
        let f = a * u, d = a * h, g = o * u, _ = o * h;
        e[0] = c * u, e[4] = g * l - d, e[8] = f * l + _, e[1] = c * h, e[5] = _ * l + f, e[9] = d * l - g, e[2] = -l, e[6] = o * c, e[10] = a * c;
      } else if (t.order === "YZX") {
        let f = a * c, d = a * l, g = o * c, _ = o * l;
        e[0] = c * u, e[4] = _ - f * h, e[8] = g * h + d, e[1] = h, e[5] = a * u, e[9] = -o * u, e[2] = -l * u, e[6] = d * h + g, e[10] = f - _ * h;
      } else if (t.order === "XZY") {
        let f = a * c, d = a * l, g = o * c, _ = o * l;
        e[0] = c * u, e[4] = -h, e[8] = l * u, e[1] = f * h + _, e[5] = a * u, e[9] = d * h - g, e[2] = g * h - d, e[6] = o * u, e[10] = _ * h + f;
      }
      return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }
    makeRotationFromQuaternion(t) {
      return this.compose(Td, t, Ad);
    }
    lookAt(t, e, n) {
      let s = this.elements;
      return dn.subVectors(t, e), dn.lengthSq() === 0 && (dn.z = 1), dn.normalize(), hi.crossVectors(n, dn), hi.lengthSq() === 0 && (Math.abs(n.z) === 1 ? dn.x += 1e-4 : dn.z += 1e-4, dn.normalize(), hi.crossVectors(n, dn)), hi.normalize(), Hr.crossVectors(dn, hi), s[0] = hi.x, s[4] = Hr.x, s[8] = dn.x, s[1] = hi.y, s[5] = Hr.y, s[9] = dn.y, s[2] = hi.z, s[6] = Hr.z, s[10] = dn.z, this;
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      let n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[4], c = n[8], l = n[12], u = n[1], h = n[5], f = n[9], d = n[13], g = n[2], _ = n[6], m = n[10], p = n[14], x = n[3], v = n[7], E = n[11], R = n[15], w = s[0], T = s[4], U = s[8], M = s[12], S = s[1], q = s[5], J = s[9], ht = s[13], H = s[2], $ = s[6], et = s[10], pt = s[14], V = s[3], C = s[7], gt = s[11], xt = s[15];
      return r[0] = a * w + o * S + c * H + l * V, r[4] = a * T + o * q + c * $ + l * C, r[8] = a * U + o * J + c * et + l * gt, r[12] = a * M + o * ht + c * pt + l * xt, r[1] = u * w + h * S + f * H + d * V, r[5] = u * T + h * q + f * $ + d * C, r[9] = u * U + h * J + f * et + d * gt, r[13] = u * M + h * ht + f * pt + d * xt, r[2] = g * w + _ * S + m * H + p * V, r[6] = g * T + _ * q + m * $ + p * C, r[10] = g * U + _ * J + m * et + p * gt, r[14] = g * M + _ * ht + m * pt + p * xt, r[3] = x * w + v * S + E * H + R * V, r[7] = x * T + v * q + E * $ + R * C, r[11] = x * U + v * J + E * et + R * gt, r[15] = x * M + v * ht + E * pt + R * xt, this;
    }
    multiplyScalar(t) {
      let e = this.elements;
      return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
    }
    determinant() {
      let t = this.elements, e = t[0], n = t[4], s = t[8], r = t[12], a = t[1], o = t[5], c = t[9], l = t[13], u = t[2], h = t[6], f = t[10], d = t[14], g = t[3], _ = t[7], m = t[11], p = t[15];
      return g * (+r * c * h - s * l * h - r * o * f + n * l * f + s * o * d - n * c * d) + _ * (+e * c * d - e * l * f + r * a * f - s * a * d + s * l * u - r * c * u) + m * (+e * l * h - e * o * d - r * a * h + n * a * d + r * o * u - n * l * u) + p * (-s * o * u - e * c * h + e * o * f + s * a * h - n * a * f + n * c * u);
    }
    transpose() {
      let t = this.elements, e;
      return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
    }
    setPosition(t, e, n) {
      let s = this.elements;
      return t.isVector3 ? (s[12] = t.x, s[13] = t.y, s[14] = t.z) : (s[12] = t, s[13] = e, s[14] = n), this;
    }
    invert() {
      let t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], c = t[6], l = t[7], u = t[8], h = t[9], f = t[10], d = t[11], g = t[12], _ = t[13], m = t[14], p = t[15], x = h * m * l - _ * f * l + _ * c * d - o * m * d - h * c * p + o * f * p, v = g * f * l - u * m * l - g * c * d + a * m * d + u * c * p - a * f * p, E = u * _ * l - g * h * l + g * o * d - a * _ * d - u * o * p + a * h * p, R = g * h * c - u * _ * c - g * o * f + a * _ * f + u * o * m - a * h * m, w = e * x + n * v + s * E + r * R;
      if (w === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      let T = 1 / w;
      return t[0] = x * T, t[1] = (_ * f * r - h * m * r - _ * s * d + n * m * d + h * s * p - n * f * p) * T, t[2] = (o * m * r - _ * c * r + _ * s * l - n * m * l - o * s * p + n * c * p) * T, t[3] = (h * c * r - o * f * r - h * s * l + n * f * l + o * s * d - n * c * d) * T, t[4] = v * T, t[5] = (u * m * r - g * f * r + g * s * d - e * m * d - u * s * p + e * f * p) * T, t[6] = (g * c * r - a * m * r - g * s * l + e * m * l + a * s * p - e * c * p) * T, t[7] = (a * f * r - u * c * r + u * s * l - e * f * l - a * s * d + e * c * d) * T, t[8] = E * T, t[9] = (g * h * r - u * _ * r - g * n * d + e * _ * d + u * n * p - e * h * p) * T, t[10] = (a * _ * r - g * o * r + g * n * l - e * _ * l - a * n * p + e * o * p) * T, t[11] = (u * o * r - a * h * r - u * n * l + e * h * l + a * n * d - e * o * d) * T, t[12] = R * T, t[13] = (u * _ * s - g * h * s + g * n * f - e * _ * f - u * n * m + e * h * m) * T, t[14] = (g * o * s - a * _ * s - g * n * c + e * _ * c + a * n * m - e * o * m) * T, t[15] = (a * h * s - u * o * s + u * n * c - e * h * c - a * n * f + e * o * f) * T, this;
    }
    scale(t) {
      let e = this.elements, n = t.x, s = t.y, r = t.z;
      return e[0] *= n, e[4] *= s, e[8] *= r, e[1] *= n, e[5] *= s, e[9] *= r, e[2] *= n, e[6] *= s, e[10] *= r, e[3] *= n, e[7] *= s, e[11] *= r, this;
    }
    getMaxScaleOnAxis() {
      let t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], s = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, n, s));
    }
    makeTranslation(t, e, n) {
      return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this;
    }
    makeRotationX(t) {
      let e = Math.cos(t), n = Math.sin(t);
      return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationY(t) {
      let e = Math.cos(t), n = Math.sin(t);
      return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationZ(t) {
      let e = Math.cos(t), n = Math.sin(t);
      return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    makeRotationAxis(t, e) {
      let n = Math.cos(e), s = Math.sin(e), r = 1 - n, a = t.x, o = t.y, c = t.z, l = r * a, u = r * o;
      return this.set(l * a + n, l * o - s * c, l * c + s * o, 0, l * o + s * c, u * o + n, u * c - s * a, 0, l * c - s * o, u * c + s * a, r * c * c + n, 0, 0, 0, 0, 1), this;
    }
    makeScale(t, e, n) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
    }
    makeShear(t, e, n, s, r, a) {
      return this.set(1, n, r, 0, t, 1, a, 0, e, s, 1, 0, 0, 0, 0, 1), this;
    }
    compose(t, e, n) {
      let s = this.elements, r = e._x, a = e._y, o = e._z, c = e._w, l = r + r, u = a + a, h = o + o, f = r * l, d = r * u, g = r * h, _ = a * u, m = a * h, p = o * h, x = c * l, v = c * u, E = c * h, R = n.x, w = n.y, T = n.z;
      return s[0] = (1 - (_ + p)) * R, s[1] = (d + E) * R, s[2] = (g - v) * R, s[3] = 0, s[4] = (d - E) * w, s[5] = (1 - (f + p)) * w, s[6] = (m + x) * w, s[7] = 0, s[8] = (g + v) * T, s[9] = (m - x) * T, s[10] = (1 - (f + _)) * T, s[11] = 0, s[12] = t.x, s[13] = t.y, s[14] = t.z, s[15] = 1, this;
    }
    decompose(t, e, n) {
      let s = this.elements, r = hs.set(s[0], s[1], s[2]).length(), a = hs.set(s[4], s[5], s[6]).length(), o = hs.set(s[8], s[9], s[10]).length();
      this.determinant() < 0 && (r = -r), t.x = s[12], t.y = s[13], t.z = s[14], Rn.copy(this);
      let l = 1 / r, u = 1 / a, h = 1 / o;
      return Rn.elements[0] *= l, Rn.elements[1] *= l, Rn.elements[2] *= l, Rn.elements[4] *= u, Rn.elements[5] *= u, Rn.elements[6] *= u, Rn.elements[8] *= h, Rn.elements[9] *= h, Rn.elements[10] *= h, e.setFromRotationMatrix(Rn), n.x = r, n.y = a, n.z = o, this;
    }
    makePerspective(t, e, n, s, r, a, o = ei) {
      let c = this.elements, l = 2 * r / (e - t), u = 2 * r / (n - s), h = (e + t) / (e - t), f = (n + s) / (n - s), d, g;
      if (o === ei) d = -(a + r) / (a - r), g = -2 * a * r / (a - r);
      else if (o === vo) d = -a / (a - r), g = -a * r / (a - r);
      else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
      return c[0] = l, c[4] = 0, c[8] = h, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = d, c[14] = g, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
    }
    makeOrthographic(t, e, n, s, r, a, o = ei) {
      let c = this.elements, l = 1 / (e - t), u = 1 / (n - s), h = 1 / (a - r), f = (e + t) * l, d = (n + s) * u, g, _;
      if (o === ei) g = (a + r) * h, _ = -2 * h;
      else if (o === vo) g = r * h, _ = -1 * h;
      else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
      return c[0] = 2 * l, c[4] = 0, c[8] = 0, c[12] = -f, c[1] = 0, c[5] = 2 * u, c[9] = 0, c[13] = -d, c[2] = 0, c[6] = 0, c[10] = _, c[14] = -g, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
    }
    equals(t) {
      let e = this.elements, n = t.elements;
      for (let s = 0; s < 16; s++) if (e[s] !== n[s]) return false;
      return true;
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
      return this;
    }
    toArray(t = [], e = 0) {
      let n = this.elements;
      return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
    }
  }, hs = new Y(), Rn = new ve(), Td = new Y(0, 0, 0), Ad = new Y(1, 1, 1), hi = new Y(), Hr = new Y(), dn = new Y(), ah = new ve(), ch = new En(), Ds = class i {
    constructor(t = 0, e = 0, n = 0, s = i.DEFAULT_ORDER) {
      this.isEuler = true, this._x = t, this._y = e, this._z = n, this._order = s;
    }
    get x() {
      return this._x;
    }
    set x(t) {
      this._x = t, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      this._y = t, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      this._z = t, this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(t) {
      this._order = t, this._onChangeCallback();
    }
    set(t, e, n, s = this._order) {
      return this._x = t, this._y = e, this._z = n, this._order = s, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(t) {
      return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
    }
    setFromRotationMatrix(t, e = this._order, n = true) {
      let s = t.elements, r = s[0], a = s[4], o = s[8], c = s[1], l = s[5], u = s[9], h = s[2], f = s[6], d = s[10];
      switch (e) {
        case "XYZ":
          this._y = Math.asin(hn(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-u, d), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(f, l), this._z = 0);
          break;
        case "YXZ":
          this._x = Math.asin(-hn(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(o, d), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-h, r), this._z = 0);
          break;
        case "ZXY":
          this._x = Math.asin(hn(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(-h, d), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(c, r));
          break;
        case "ZYX":
          this._y = Math.asin(-hn(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._x = Math.atan2(f, d), this._z = Math.atan2(c, r)) : (this._x = 0, this._z = Math.atan2(-a, l));
          break;
        case "YZX":
          this._z = Math.asin(hn(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-u, l), this._y = Math.atan2(-h, r)) : (this._x = 0, this._y = Math.atan2(o, d));
          break;
        case "XZY":
          this._z = Math.asin(-hn(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(f, l), this._y = Math.atan2(o, r)) : (this._x = Math.atan2(-u, d), this._y = 0);
          break;
        default:
          console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
      }
      return this._order = e, n === true && this._onChangeCallback(), this;
    }
    setFromQuaternion(t, e, n) {
      return ah.makeRotationFromQuaternion(t), this.setFromRotationMatrix(ah, e, n);
    }
    setFromVector3(t, e = this._order) {
      return this.set(t.x, t.y, t.z, e);
    }
    reorder(t) {
      return ch.setFromEuler(this), this.setFromQuaternion(ch, t);
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
    }
    fromArray(t) {
      return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
    }
    _onChange(t) {
      return this._onChangeCallback = t, this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._order;
    }
  };
  Ds.DEFAULT_ORDER = "XYZ";
  var ur = class {
    constructor() {
      this.mask = 1;
    }
    set(t) {
      this.mask = (1 << t | 0) >>> 0;
    }
    enable(t) {
      this.mask |= 1 << t | 0;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(t) {
      this.mask ^= 1 << t | 0;
    }
    disable(t) {
      this.mask &= ~(1 << t | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(t) {
      return (this.mask & t.mask) !== 0;
    }
    isEnabled(t) {
      return (this.mask & (1 << t | 0)) !== 0;
    }
  }, Rd = 0, lh = new Y(), us = new En(), Jn = new ve(), Gr = new Y(), tr = new Y(), Cd = new Y(), Pd = new En(), hh = new Y(1, 0, 0), uh = new Y(0, 1, 0), fh = new Y(0, 0, 1), Ld = { type: "added" }, Id = { type: "removed" }, $e = class i extends _i {
    constructor() {
      super(), this.isObject3D = true, Object.defineProperty(this, "id", { value: Rd++ }), this.uuid = xi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = i.DEFAULT_UP.clone();
      let t = new Y(), e = new Ds(), n = new En(), s = new Y(1, 1, 1);
      function r() {
        n.setFromEuler(e, false);
      }
      function a() {
        e.setFromQuaternion(n, void 0, false);
      }
      e._onChange(r), n._onChange(a), Object.defineProperties(this, { position: { configurable: true, enumerable: true, value: t }, rotation: { configurable: true, enumerable: true, value: e }, quaternion: { configurable: true, enumerable: true, value: n }, scale: { configurable: true, enumerable: true, value: s }, modelViewMatrix: { value: new ve() }, normalMatrix: { value: new ue() } }), this.matrix = new ve(), this.matrixWorld = new ve(), this.matrixAutoUpdate = i.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = false, this.layers = new ur(), this.visible = true, this.castShadow = false, this.receiveShadow = false, this.frustumCulled = true, this.renderOrder = 0, this.animations = [], this.userData = {};
    }
    onBeforeShadow() {
    }
    onAfterShadow() {
    }
    onBeforeRender() {
    }
    onAfterRender() {
    }
    applyMatrix4(t) {
      this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(t) {
      return this.quaternion.premultiply(t), this;
    }
    setRotationFromAxisAngle(t, e) {
      this.quaternion.setFromAxisAngle(t, e);
    }
    setRotationFromEuler(t) {
      this.quaternion.setFromEuler(t, true);
    }
    setRotationFromMatrix(t) {
      this.quaternion.setFromRotationMatrix(t);
    }
    setRotationFromQuaternion(t) {
      this.quaternion.copy(t);
    }
    rotateOnAxis(t, e) {
      return us.setFromAxisAngle(t, e), this.quaternion.multiply(us), this;
    }
    rotateOnWorldAxis(t, e) {
      return us.setFromAxisAngle(t, e), this.quaternion.premultiply(us), this;
    }
    rotateX(t) {
      return this.rotateOnAxis(hh, t);
    }
    rotateY(t) {
      return this.rotateOnAxis(uh, t);
    }
    rotateZ(t) {
      return this.rotateOnAxis(fh, t);
    }
    translateOnAxis(t, e) {
      return lh.copy(t).applyQuaternion(this.quaternion), this.position.add(lh.multiplyScalar(e)), this;
    }
    translateX(t) {
      return this.translateOnAxis(hh, t);
    }
    translateY(t) {
      return this.translateOnAxis(uh, t);
    }
    translateZ(t) {
      return this.translateOnAxis(fh, t);
    }
    localToWorld(t) {
      return this.updateWorldMatrix(true, false), t.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(t) {
      return this.updateWorldMatrix(true, false), t.applyMatrix4(Jn.copy(this.matrixWorld).invert());
    }
    lookAt(t, e, n) {
      t.isVector3 ? Gr.copy(t) : Gr.set(t, e, n);
      let s = this.parent;
      this.updateWorldMatrix(true, false), tr.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Jn.lookAt(tr, Gr, this.up) : Jn.lookAt(Gr, tr, this.up), this.quaternion.setFromRotationMatrix(Jn), s && (Jn.extractRotation(s.matrixWorld), us.setFromRotationMatrix(Jn), this.quaternion.premultiply(us.invert()));
    }
    add(t) {
      if (arguments.length > 1) {
        for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
        return this;
      }
      return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.parent !== null && t.parent.remove(t), t.parent = this, this.children.push(t), t.dispatchEvent(Ld)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
    }
    remove(t) {
      if (arguments.length > 1) {
        for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
        return this;
      }
      let e = this.children.indexOf(t);
      return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(Id)), this;
    }
    removeFromParent() {
      let t = this.parent;
      return t !== null && t.remove(this), this;
    }
    clear() {
      return this.remove(...this.children);
    }
    attach(t) {
      return this.updateWorldMatrix(true, false), Jn.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(true, false), Jn.multiply(t.parent.matrixWorld)), t.applyMatrix4(Jn), this.add(t), t.updateWorldMatrix(false, true), this;
    }
    getObjectById(t) {
      return this.getObjectByProperty("id", t);
    }
    getObjectByName(t) {
      return this.getObjectByProperty("name", t);
    }
    getObjectByProperty(t, e) {
      if (this[t] === e) return this;
      for (let n = 0, s = this.children.length; n < s; n++) {
        let a = this.children[n].getObjectByProperty(t, e);
        if (a !== void 0) return a;
      }
    }
    getObjectsByProperty(t, e, n = []) {
      this[t] === e && n.push(this);
      let s = this.children;
      for (let r = 0, a = s.length; r < a; r++) s[r].getObjectsByProperty(t, e, n);
      return n;
    }
    getWorldPosition(t) {
      return this.updateWorldMatrix(true, false), t.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(t) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(tr, t, Cd), t;
    }
    getWorldScale(t) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(tr, Pd, t), t;
    }
    getWorldDirection(t) {
      this.updateWorldMatrix(true, false);
      let e = this.matrixWorld.elements;
      return t.set(e[8], e[9], e[10]).normalize();
    }
    raycast() {
    }
    traverse(t) {
      t(this);
      let e = this.children;
      for (let n = 0, s = e.length; n < s; n++) e[n].traverse(t);
    }
    traverseVisible(t) {
      if (this.visible === false) return;
      t(this);
      let e = this.children;
      for (let n = 0, s = e.length; n < s; n++) e[n].traverseVisible(t);
    }
    traverseAncestors(t) {
      let e = this.parent;
      e !== null && (t(e), e.traverseAncestors(t));
    }
    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(t) {
      this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = false, t = true);
      let e = this.children;
      for (let n = 0, s = e.length; n < s; n++) {
        let r = e[n];
        (r.matrixWorldAutoUpdate === true || t === true) && r.updateMatrixWorld(t);
      }
    }
    updateWorldMatrix(t, e) {
      let n = this.parent;
      if (t === true && n !== null && n.matrixWorldAutoUpdate === true && n.updateWorldMatrix(true, false), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), e === true) {
        let s = this.children;
        for (let r = 0, a = s.length; r < a; r++) {
          let o = s[r];
          o.matrixWorldAutoUpdate === true && o.updateWorldMatrix(false, true);
        }
      }
    }
    toJSON(t) {
      let e = t === void 0 || typeof t == "string", n = {};
      e && (t = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, n.metadata = { version: 4.6, type: "Object", generator: "Object3D.toJSON" });
      let s = {};
      s.uuid = this.uuid, s.type = this.type, this.name !== "" && (s.name = this.name), this.castShadow === true && (s.castShadow = true), this.receiveShadow === true && (s.receiveShadow = true), this.visible === false && (s.visible = false), this.frustumCulled === false && (s.frustumCulled = false), this.renderOrder !== 0 && (s.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (s.userData = this.userData), s.layers = this.layers.mask, s.matrix = this.matrix.toArray(), s.up = this.up.toArray(), this.matrixAutoUpdate === false && (s.matrixAutoUpdate = false), this.isInstancedMesh && (s.type = "InstancedMesh", s.count = this.count, s.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (s.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (s.type = "BatchedMesh", s.perObjectFrustumCulled = this.perObjectFrustumCulled, s.sortObjects = this.sortObjects, s.drawRanges = this._drawRanges, s.reservedRanges = this._reservedRanges, s.visibility = this._visibility, s.active = this._active, s.bounds = this._bounds.map((o) => ({ boxInitialized: o.boxInitialized, boxMin: o.box.min.toArray(), boxMax: o.box.max.toArray(), sphereInitialized: o.sphereInitialized, sphereRadius: o.sphere.radius, sphereCenter: o.sphere.center.toArray() })), s.maxGeometryCount = this._maxGeometryCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.geometryCount = this._geometryCount, s.matricesTexture = this._matricesTexture.toJSON(t), this.boundingSphere !== null && (s.boundingSphere = { center: s.boundingSphere.center.toArray(), radius: s.boundingSphere.radius }), this.boundingBox !== null && (s.boundingBox = { min: s.boundingBox.min.toArray(), max: s.boundingBox.max.toArray() }));
      function r(o, c) {
        return o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(t)), c.uuid;
      }
      if (this.isScene) this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true && (s.environment = this.environment.toJSON(t).uuid);
      else if (this.isMesh || this.isLine || this.isPoints) {
        s.geometry = r(t.geometries, this.geometry);
        let o = this.geometry.parameters;
        if (o !== void 0 && o.shapes !== void 0) {
          let c = o.shapes;
          if (Array.isArray(c)) for (let l = 0, u = c.length; l < u; l++) {
            let h = c[l];
            r(t.shapes, h);
          }
          else r(t.shapes, c);
        }
      }
      if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(t.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
        let o = [];
        for (let c = 0, l = this.material.length; c < l; c++) o.push(r(t.materials, this.material[c]));
        s.material = o;
      } else s.material = r(t.materials, this.material);
      if (this.children.length > 0) {
        s.children = [];
        for (let o = 0; o < this.children.length; o++) s.children.push(this.children[o].toJSON(t).object);
      }
      if (this.animations.length > 0) {
        s.animations = [];
        for (let o = 0; o < this.animations.length; o++) {
          let c = this.animations[o];
          s.animations.push(r(t.animations, c));
        }
      }
      if (e) {
        let o = a(t.geometries), c = a(t.materials), l = a(t.textures), u = a(t.images), h = a(t.shapes), f = a(t.skeletons), d = a(t.animations), g = a(t.nodes);
        o.length > 0 && (n.geometries = o), c.length > 0 && (n.materials = c), l.length > 0 && (n.textures = l), u.length > 0 && (n.images = u), h.length > 0 && (n.shapes = h), f.length > 0 && (n.skeletons = f), d.length > 0 && (n.animations = d), g.length > 0 && (n.nodes = g);
      }
      return n.object = s, n;
      function a(o) {
        let c = [];
        for (let l in o) {
          let u = o[l];
          delete u.metadata, c.push(u);
        }
        return c;
      }
    }
    clone(t) {
      return new this.constructor().copy(this, t);
    }
    copy(t, e = true) {
      if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), e === true) for (let n = 0; n < t.children.length; n++) {
        let s = t.children[n];
        this.add(s.clone());
      }
      return this;
    }
  };
  $e.DEFAULT_UP = new Y(0, 1, 0);
  $e.DEFAULT_MATRIX_AUTO_UPDATE = true;
  $e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
  var Cn = new Y(), $n = new Y(), Ua = new Y(), Kn = new Y(), fs = new Y(), ds = new Y(), dh = new Y(), Da = new Y(), Na = new Y(), Oa = new Y(), Vr = false, Hi = class i {
    constructor(t = new Y(), e = new Y(), n = new Y()) {
      this.a = t, this.b = e, this.c = n;
    }
    static getNormal(t, e, n, s) {
      s.subVectors(n, e), Cn.subVectors(t, e), s.cross(Cn);
      let r = s.lengthSq();
      return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
    }
    static getBarycoord(t, e, n, s, r) {
      Cn.subVectors(s, e), $n.subVectors(n, e), Ua.subVectors(t, e);
      let a = Cn.dot(Cn), o = Cn.dot($n), c = Cn.dot(Ua), l = $n.dot($n), u = $n.dot(Ua), h = a * l - o * o;
      if (h === 0) return r.set(0, 0, 0), null;
      let f = 1 / h, d = (l * c - o * u) * f, g = (a * u - o * c) * f;
      return r.set(1 - d - g, g, d);
    }
    static containsPoint(t, e, n, s) {
      return this.getBarycoord(t, e, n, s, Kn) === null ? false : Kn.x >= 0 && Kn.y >= 0 && Kn.x + Kn.y <= 1;
    }
    static getUV(t, e, n, s, r, a, o, c) {
      return Vr === false && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), Vr = true), this.getInterpolation(t, e, n, s, r, a, o, c);
    }
    static getInterpolation(t, e, n, s, r, a, o, c) {
      return this.getBarycoord(t, e, n, s, Kn) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(r, Kn.x), c.addScaledVector(a, Kn.y), c.addScaledVector(o, Kn.z), c);
    }
    static isFrontFacing(t, e, n, s) {
      return Cn.subVectors(n, e), $n.subVectors(t, e), Cn.cross($n).dot(s) < 0;
    }
    set(t, e, n) {
      return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
    }
    setFromPointsAndIndices(t, e, n, s) {
      return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[s]), this;
    }
    setFromAttributeAndIndices(t, e, n, s) {
      return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, s), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
    }
    getArea() {
      return Cn.subVectors(this.c, this.b), $n.subVectors(this.a, this.b), Cn.cross($n).length() * 0.5;
    }
    getMidpoint(t) {
      return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
    getNormal(t) {
      return i.getNormal(this.a, this.b, this.c, t);
    }
    getPlane(t) {
      return t.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(t, e) {
      return i.getBarycoord(t, this.a, this.b, this.c, e);
    }
    getUV(t, e, n, s, r) {
      return Vr === false && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), Vr = true), i.getInterpolation(t, this.a, this.b, this.c, e, n, s, r);
    }
    getInterpolation(t, e, n, s, r) {
      return i.getInterpolation(t, this.a, this.b, this.c, e, n, s, r);
    }
    containsPoint(t) {
      return i.containsPoint(t, this.a, this.b, this.c);
    }
    isFrontFacing(t) {
      return i.isFrontFacing(this.a, this.b, this.c, t);
    }
    intersectsBox(t) {
      return t.intersectsTriangle(this);
    }
    closestPointToPoint(t, e) {
      let n = this.a, s = this.b, r = this.c, a, o;
      fs.subVectors(s, n), ds.subVectors(r, n), Da.subVectors(t, n);
      let c = fs.dot(Da), l = ds.dot(Da);
      if (c <= 0 && l <= 0) return e.copy(n);
      Na.subVectors(t, s);
      let u = fs.dot(Na), h = ds.dot(Na);
      if (u >= 0 && h <= u) return e.copy(s);
      let f = c * h - u * l;
      if (f <= 0 && c >= 0 && u <= 0) return a = c / (c - u), e.copy(n).addScaledVector(fs, a);
      Oa.subVectors(t, r);
      let d = fs.dot(Oa), g = ds.dot(Oa);
      if (g >= 0 && d <= g) return e.copy(r);
      let _ = d * l - c * g;
      if (_ <= 0 && l >= 0 && g <= 0) return o = l / (l - g), e.copy(n).addScaledVector(ds, o);
      let m = u * g - d * h;
      if (m <= 0 && h - u >= 0 && d - g >= 0) return dh.subVectors(r, s), o = (h - u) / (h - u + (d - g)), e.copy(s).addScaledVector(dh, o);
      let p = 1 / (m + _ + f);
      return a = _ * p, o = f * p, e.copy(n).addScaledVector(fs, a).addScaledVector(ds, o);
    }
    equals(t) {
      return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
    }
  }, pu = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, ui = { h: 0, s: 0, l: 0 }, Wr = { h: 0, s: 0, l: 0 };
  function Fa(i, t, e) {
    return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
  }
  var Xt = class {
    constructor(t, e, n) {
      return this.isColor = true, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n);
    }
    set(t, e, n) {
      if (e === void 0 && n === void 0) {
        let s = t;
        s && s.isColor ? this.copy(s) : typeof s == "number" ? this.setHex(s) : typeof s == "string" && this.setStyle(s);
      } else this.setRGB(t, e, n);
      return this;
    }
    setScalar(t) {
      return this.r = t, this.g = t, this.b = t, this;
    }
    setHex(t, e = Se) {
      return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, ge.toWorkingColorSpace(this, e), this;
    }
    setRGB(t, e, n, s = ge.workingColorSpace) {
      return this.r = t, this.g = e, this.b = n, ge.toWorkingColorSpace(this, s), this;
    }
    setHSL(t, e, n, s = ge.workingColorSpace) {
      if (t = yd(t, 1), e = hn(e, 0, 1), n = hn(n, 0, 1), e === 0) this.r = this.g = this.b = n;
      else {
        let r = n <= 0.5 ? n * (1 + e) : n + e - n * e, a = 2 * n - r;
        this.r = Fa(a, r, t + 1 / 3), this.g = Fa(a, r, t), this.b = Fa(a, r, t - 1 / 3);
      }
      return ge.toWorkingColorSpace(this, s), this;
    }
    setStyle(t, e = Se) {
      function n(r) {
        r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
      }
      let s;
      if (s = /^(\w+)\(([^\)]*)\)/.exec(t)) {
        let r, a = s[1], o = s[2];
        switch (a) {
          case "rgb":
          case "rgba":
            if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, e);
            if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, e);
            break;
          case "hsl":
          case "hsla":
            if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, e);
            break;
          default:
            console.warn("THREE.Color: Unknown color model " + t);
        }
      } else if (s = /^\#([A-Fa-f\d]+)$/.exec(t)) {
        let r = s[1], a = r.length;
        if (a === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, e);
        if (a === 6) return this.setHex(parseInt(r, 16), e);
        console.warn("THREE.Color: Invalid hex color " + t);
      } else if (t && t.length > 0) return this.setColorName(t, e);
      return this;
    }
    setColorName(t, e = Se) {
      let n = pu[t.toLowerCase()];
      return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(t) {
      return this.r = t.r, this.g = t.g, this.b = t.b, this;
    }
    copySRGBToLinear(t) {
      return this.r = Cs(t.r), this.g = Cs(t.g), this.b = Cs(t.b), this;
    }
    copyLinearToSRGB(t) {
      return this.r = wa(t.r), this.g = wa(t.g), this.b = wa(t.b), this;
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this;
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this;
    }
    getHex(t = Se) {
      return ge.fromWorkingColorSpace(en.copy(this), t), Math.round(hn(en.r * 255, 0, 255)) * 65536 + Math.round(hn(en.g * 255, 0, 255)) * 256 + Math.round(hn(en.b * 255, 0, 255));
    }
    getHexString(t = Se) {
      return ("000000" + this.getHex(t).toString(16)).slice(-6);
    }
    getHSL(t, e = ge.workingColorSpace) {
      ge.fromWorkingColorSpace(en.copy(this), e);
      let n = en.r, s = en.g, r = en.b, a = Math.max(n, s, r), o = Math.min(n, s, r), c, l, u = (o + a) / 2;
      if (o === a) c = 0, l = 0;
      else {
        let h = a - o;
        switch (l = u <= 0.5 ? h / (a + o) : h / (2 - a - o), a) {
          case n:
            c = (s - r) / h + (s < r ? 6 : 0);
            break;
          case s:
            c = (r - n) / h + 2;
            break;
          case r:
            c = (n - s) / h + 4;
            break;
        }
        c /= 6;
      }
      return t.h = c, t.s = l, t.l = u, t;
    }
    getRGB(t, e = ge.workingColorSpace) {
      return ge.fromWorkingColorSpace(en.copy(this), e), t.r = en.r, t.g = en.g, t.b = en.b, t;
    }
    getStyle(t = Se) {
      ge.fromWorkingColorSpace(en.copy(this), t);
      let e = en.r, n = en.g, s = en.b;
      return t !== Se ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
    }
    offsetHSL(t, e, n) {
      return this.getHSL(ui), this.setHSL(ui.h + t, ui.s + e, ui.l + n);
    }
    add(t) {
      return this.r += t.r, this.g += t.g, this.b += t.b, this;
    }
    addColors(t, e) {
      return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
    }
    addScalar(t) {
      return this.r += t, this.g += t, this.b += t, this;
    }
    sub(t) {
      return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
    }
    multiply(t) {
      return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
    }
    multiplyScalar(t) {
      return this.r *= t, this.g *= t, this.b *= t, this;
    }
    lerp(t, e) {
      return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
    }
    lerpColors(t, e, n) {
      return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
    }
    lerpHSL(t, e) {
      this.getHSL(ui), t.getHSL(Wr);
      let n = Sa(ui.h, Wr.h, e), s = Sa(ui.s, Wr.s, e), r = Sa(ui.l, Wr.l, e);
      return this.setHSL(n, s, r), this;
    }
    setFromVector3(t) {
      return this.r = t.x, this.g = t.y, this.b = t.z, this;
    }
    applyMatrix3(t) {
      let e = this.r, n = this.g, s = this.b, r = t.elements;
      return this.r = r[0] * e + r[3] * n + r[6] * s, this.g = r[1] * e + r[4] * n + r[7] * s, this.b = r[2] * e + r[5] * n + r[8] * s, this;
    }
    equals(t) {
      return t.r === this.r && t.g === this.g && t.b === this.b;
    }
    fromArray(t, e = 0) {
      return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
    }
    fromBufferAttribute(t, e) {
      return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
    }
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      yield this.r, yield this.g, yield this.b;
    }
  }, en = new Xt();
  Xt.NAMES = pu;
  var Ud = 0, si = class extends _i {
    constructor() {
      super(), this.isMaterial = true, Object.defineProperty(this, "id", { value: Ud++ }), this.uuid = xi(), this.name = "", this.type = "Material", this.blending = pi, this.side = bn, this.vertexColors = false, this.opacity = 1, this.transparent = false, this.alphaHash = false, this.blendSrc = Ja, this.blendDst = $a, this.blendEquation = Bi, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Xt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = fo, this.depthTest = true, this.depthWrite = true, this.stencilWriteMask = 255, this.stencilFunc = th, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = rs, this.stencilZFail = rs, this.stencilZPass = rs, this.stencilWrite = false, this.clippingPlanes = null, this.clipIntersection = false, this.clipShadows = false, this.shadowSide = null, this.colorWrite = true, this.precision = null, this.polygonOffset = false, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = false, this.alphaToCoverage = false, this.premultipliedAlpha = false, this.forceSinglePass = false, this.visible = true, this.toneMapped = true, this.userData = {}, this.version = 0, this._alphaTest = 0;
    }
    get alphaTest() {
      return this._alphaTest;
    }
    set alphaTest(t) {
      this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
    }
    onBuild() {
    }
    onBeforeRender() {
    }
    onBeforeCompile() {
    }
    customProgramCacheKey() {
      return this.onBeforeCompile.toString();
    }
    setValues(t) {
      if (t !== void 0) for (let e in t) {
        let n = t[e];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        let s = this[e];
        if (s === void 0) {
          console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        s && s.isColor ? s.set(n) : s && s.isVector3 && n && n.isVector3 ? s.copy(n) : this[e] = n;
      }
    }
    toJSON(t) {
      let e = t === void 0 || typeof t == "string";
      e && (t = { textures: {}, images: {} });
      let n = { metadata: { version: 4.6, type: "Material", generator: "Material.toJSON" } };
      n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== pi && (n.blending = this.blending), this.side !== bn && (n.side = this.side), this.vertexColors === true && (n.vertexColors = true), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === true && (n.transparent = true), this.blendSrc !== Ja && (n.blendSrc = this.blendSrc), this.blendDst !== $a && (n.blendDst = this.blendDst), this.blendEquation !== Bi && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== fo && (n.depthFunc = this.depthFunc), this.depthTest === false && (n.depthTest = this.depthTest), this.depthWrite === false && (n.depthWrite = this.depthWrite), this.colorWrite === false && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== th && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== rs && (n.stencilFail = this.stencilFail), this.stencilZFail !== rs && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== rs && (n.stencilZPass = this.stencilZPass), this.stencilWrite === true && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === true && (n.polygonOffset = true), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === true && (n.dithering = true), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === true && (n.alphaHash = true), this.alphaToCoverage === true && (n.alphaToCoverage = true), this.premultipliedAlpha === true && (n.premultipliedAlpha = true), this.forceSinglePass === true && (n.forceSinglePass = true), this.wireframe === true && (n.wireframe = true), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === true && (n.flatShading = true), this.visible === false && (n.visible = false), this.toneMapped === false && (n.toneMapped = false), this.fog === false && (n.fog = false), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
      function s(r) {
        let a = [];
        for (let o in r) {
          let c = r[o];
          delete c.metadata, a.push(c);
        }
        return a;
      }
      if (e) {
        let r = s(t.textures), a = s(t.images);
        r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a);
      }
      return n;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
      let e = t.clippingPlanes, n = null;
      if (e !== null) {
        let s = e.length;
        n = new Array(s);
        for (let r = 0; r !== s; ++r) n[r] = e[r].clone();
      }
      return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    set needsUpdate(t) {
      t === true && this.version++;
    }
  }, se = class extends si {
    constructor(t) {
      super(), this.isMeshBasicMaterial = true, this.type = "MeshBasicMaterial", this.color = new Xt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = eu, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = true, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
    }
  };
  var ke = new Y(), Xr = new Bt(), xe = class {
    constructor(t, e, n = false) {
      if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      this.isBufferAttribute = true, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = tc, this._updateRange = { offset: 0, count: -1 }, this.updateRanges = [], this.gpuType = di, this.version = 0;
    }
    onUploadCallback() {
    }
    set needsUpdate(t) {
      t === true && this.version++;
    }
    get updateRange() {
      return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."), this._updateRange;
    }
    setUsage(t) {
      return this.usage = t, this;
    }
    addUpdateRange(t, e) {
      this.updateRanges.push({ start: t, count: e });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(t) {
      return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
    }
    copyAt(t, e, n) {
      t *= this.itemSize, n *= e.itemSize;
      for (let s = 0, r = this.itemSize; s < r; s++) this.array[t + s] = e.array[n + s];
      return this;
    }
    copyArray(t) {
      return this.array.set(t), this;
    }
    applyMatrix3(t) {
      if (this.itemSize === 2) for (let e = 0, n = this.count; e < n; e++) Xr.fromBufferAttribute(this, e), Xr.applyMatrix3(t), this.setXY(e, Xr.x, Xr.y);
      else if (this.itemSize === 3) for (let e = 0, n = this.count; e < n; e++) ke.fromBufferAttribute(this, e), ke.applyMatrix3(t), this.setXYZ(e, ke.x, ke.y, ke.z);
      return this;
    }
    applyMatrix4(t) {
      for (let e = 0, n = this.count; e < n; e++) ke.fromBufferAttribute(this, e), ke.applyMatrix4(t), this.setXYZ(e, ke.x, ke.y, ke.z);
      return this;
    }
    applyNormalMatrix(t) {
      for (let e = 0, n = this.count; e < n; e++) ke.fromBufferAttribute(this, e), ke.applyNormalMatrix(t), this.setXYZ(e, ke.x, ke.y, ke.z);
      return this;
    }
    transformDirection(t) {
      for (let e = 0, n = this.count; e < n; e++) ke.fromBufferAttribute(this, e), ke.transformDirection(t), this.setXYZ(e, ke.x, ke.y, ke.z);
      return this;
    }
    set(t, e = 0) {
      return this.array.set(t, e), this;
    }
    getComponent(t, e) {
      let n = this.array[t * this.itemSize + e];
      return this.normalized && (n = ti(n, this.array)), n;
    }
    setComponent(t, e, n) {
      return this.normalized && (n = be(n, this.array)), this.array[t * this.itemSize + e] = n, this;
    }
    getX(t) {
      let e = this.array[t * this.itemSize];
      return this.normalized && (e = ti(e, this.array)), e;
    }
    setX(t, e) {
      return this.normalized && (e = be(e, this.array)), this.array[t * this.itemSize] = e, this;
    }
    getY(t) {
      let e = this.array[t * this.itemSize + 1];
      return this.normalized && (e = ti(e, this.array)), e;
    }
    setY(t, e) {
      return this.normalized && (e = be(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
    }
    getZ(t) {
      let e = this.array[t * this.itemSize + 2];
      return this.normalized && (e = ti(e, this.array)), e;
    }
    setZ(t, e) {
      return this.normalized && (e = be(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
    }
    getW(t) {
      let e = this.array[t * this.itemSize + 3];
      return this.normalized && (e = ti(e, this.array)), e;
    }
    setW(t, e) {
      return this.normalized && (e = be(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
    }
    setXY(t, e, n) {
      return t *= this.itemSize, this.normalized && (e = be(e, this.array), n = be(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
    }
    setXYZ(t, e, n, s) {
      return t *= this.itemSize, this.normalized && (e = be(e, this.array), n = be(n, this.array), s = be(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this;
    }
    setXYZW(t, e, n, s, r) {
      return t *= this.itemSize, this.normalized && (e = be(e, this.array), n = be(n, this.array), s = be(s, this.array), r = be(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this.array[t + 3] = r, this;
    }
    onUpload(t) {
      return this.onUploadCallback = t, this;
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
      let t = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized };
      return this.name !== "" && (t.name = this.name), this.usage !== tc && (t.usage = this.usage), t;
    }
  };
  var Eo = class extends xe {
    constructor(t, e, n) {
      super(new Uint16Array(t), e, n);
    }
  };
  var wo = class extends xe {
    constructor(t, e, n) {
      super(new Uint32Array(t), e, n);
    }
  };
  var de = class extends xe {
    constructor(t, e, n) {
      super(new Float32Array(t), e, n);
    }
  };
  var Dd = 0, vn = new ve(), za = new $e(), ps = new Y(), pn = new In(), er = new In(), Ye = new Y(), we = class i extends _i {
    constructor() {
      super(), this.isBufferGeometry = true, Object.defineProperty(this, "id", { value: Dd++ }), this.uuid = xi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = false, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
    }
    getIndex() {
      return this.index;
    }
    setIndex(t) {
      return Array.isArray(t) ? this.index = new (du(t) ? wo : Eo)(t, 1) : this.index = t, this;
    }
    getAttribute(t) {
      return this.attributes[t];
    }
    setAttribute(t, e) {
      return this.attributes[t] = e, this;
    }
    deleteAttribute(t) {
      return delete this.attributes[t], this;
    }
    hasAttribute(t) {
      return this.attributes[t] !== void 0;
    }
    addGroup(t, e, n = 0) {
      this.groups.push({ start: t, count: e, materialIndex: n });
    }
    clearGroups() {
      this.groups = [];
    }
    setDrawRange(t, e) {
      this.drawRange.start = t, this.drawRange.count = e;
    }
    applyMatrix4(t) {
      let e = this.attributes.position;
      e !== void 0 && (e.applyMatrix4(t), e.needsUpdate = true);
      let n = this.attributes.normal;
      if (n !== void 0) {
        let r = new ue().getNormalMatrix(t);
        n.applyNormalMatrix(r), n.needsUpdate = true;
      }
      let s = this.attributes.tangent;
      return s !== void 0 && (s.transformDirection(t), s.needsUpdate = true), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
    }
    applyQuaternion(t) {
      return vn.makeRotationFromQuaternion(t), this.applyMatrix4(vn), this;
    }
    rotateX(t) {
      return vn.makeRotationX(t), this.applyMatrix4(vn), this;
    }
    rotateY(t) {
      return vn.makeRotationY(t), this.applyMatrix4(vn), this;
    }
    rotateZ(t) {
      return vn.makeRotationZ(t), this.applyMatrix4(vn), this;
    }
    translate(t, e, n) {
      return vn.makeTranslation(t, e, n), this.applyMatrix4(vn), this;
    }
    scale(t, e, n) {
      return vn.makeScale(t, e, n), this.applyMatrix4(vn), this;
    }
    lookAt(t) {
      return za.lookAt(t), za.updateMatrix(), this.applyMatrix4(za.matrix), this;
    }
    center() {
      return this.computeBoundingBox(), this.boundingBox.getCenter(ps).negate(), this.translate(ps.x, ps.y, ps.z), this;
    }
    setFromPoints(t) {
      let e = [];
      for (let n = 0, s = t.length; n < s; n++) {
        let r = t[n];
        e.push(r.x, r.y, r.z || 0);
      }
      return this.setAttribute("position", new de(e, 3)), this;
    }
    computeBoundingBox() {
      this.boundingBox === null && (this.boundingBox = new In());
      let t = this.attributes.position, e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) {
        console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(new Y(-1 / 0, -1 / 0, -1 / 0), new Y(1 / 0, 1 / 0, 1 / 0));
        return;
      }
      if (t !== void 0) {
        if (this.boundingBox.setFromBufferAttribute(t), e) for (let n = 0, s = e.length; n < s; n++) {
          let r = e[n];
          pn.setFromBufferAttribute(r), this.morphTargetsRelative ? (Ye.addVectors(this.boundingBox.min, pn.min), this.boundingBox.expandByPoint(Ye), Ye.addVectors(this.boundingBox.max, pn.max), this.boundingBox.expandByPoint(Ye)) : (this.boundingBox.expandByPoint(pn.min), this.boundingBox.expandByPoint(pn.max));
        }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
    }
    computeBoundingSphere() {
      this.boundingSphere === null && (this.boundingSphere = new vi());
      let t = this.attributes.position, e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) {
        console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new Y(), 1 / 0);
        return;
      }
      if (t) {
        let n = this.boundingSphere.center;
        if (pn.setFromBufferAttribute(t), e) for (let r = 0, a = e.length; r < a; r++) {
          let o = e[r];
          er.setFromBufferAttribute(o), this.morphTargetsRelative ? (Ye.addVectors(pn.min, er.min), pn.expandByPoint(Ye), Ye.addVectors(pn.max, er.max), pn.expandByPoint(Ye)) : (pn.expandByPoint(er.min), pn.expandByPoint(er.max));
        }
        pn.getCenter(n);
        let s = 0;
        for (let r = 0, a = t.count; r < a; r++) Ye.fromBufferAttribute(t, r), s = Math.max(s, n.distanceToSquared(Ye));
        if (e) for (let r = 0, a = e.length; r < a; r++) {
          let o = e[r], c = this.morphTargetsRelative;
          for (let l = 0, u = o.count; l < u; l++) Ye.fromBufferAttribute(o, l), c && (ps.fromBufferAttribute(t, l), Ye.add(ps)), s = Math.max(s, n.distanceToSquared(Ye));
        }
        this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
      }
    }
    computeTangents() {
      let t = this.index, e = this.attributes;
      if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
        console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
        return;
      }
      let n = t.array, s = e.position.array, r = e.normal.array, a = e.uv.array, o = s.length / 3;
      this.hasAttribute("tangent") === false && this.setAttribute("tangent", new xe(new Float32Array(4 * o), 4));
      let c = this.getAttribute("tangent").array, l = [], u = [];
      for (let S = 0; S < o; S++) l[S] = new Y(), u[S] = new Y();
      let h = new Y(), f = new Y(), d = new Y(), g = new Bt(), _ = new Bt(), m = new Bt(), p = new Y(), x = new Y();
      function v(S, q, J) {
        h.fromArray(s, S * 3), f.fromArray(s, q * 3), d.fromArray(s, J * 3), g.fromArray(a, S * 2), _.fromArray(a, q * 2), m.fromArray(a, J * 2), f.sub(h), d.sub(h), _.sub(g), m.sub(g);
        let ht = 1 / (_.x * m.y - m.x * _.y);
        isFinite(ht) && (p.copy(f).multiplyScalar(m.y).addScaledVector(d, -_.y).multiplyScalar(ht), x.copy(d).multiplyScalar(_.x).addScaledVector(f, -m.x).multiplyScalar(ht), l[S].add(p), l[q].add(p), l[J].add(p), u[S].add(x), u[q].add(x), u[J].add(x));
      }
      let E = this.groups;
      E.length === 0 && (E = [{ start: 0, count: n.length }]);
      for (let S = 0, q = E.length; S < q; ++S) {
        let J = E[S], ht = J.start, H = J.count;
        for (let $ = ht, et = ht + H; $ < et; $ += 3) v(n[$ + 0], n[$ + 1], n[$ + 2]);
      }
      let R = new Y(), w = new Y(), T = new Y(), U = new Y();
      function M(S) {
        T.fromArray(r, S * 3), U.copy(T);
        let q = l[S];
        R.copy(q), R.sub(T.multiplyScalar(T.dot(q))).normalize(), w.crossVectors(U, q);
        let ht = w.dot(u[S]) < 0 ? -1 : 1;
        c[S * 4] = R.x, c[S * 4 + 1] = R.y, c[S * 4 + 2] = R.z, c[S * 4 + 3] = ht;
      }
      for (let S = 0, q = E.length; S < q; ++S) {
        let J = E[S], ht = J.start, H = J.count;
        for (let $ = ht, et = ht + H; $ < et; $ += 3) M(n[$ + 0]), M(n[$ + 1]), M(n[$ + 2]);
      }
    }
    computeVertexNormals() {
      let t = this.index, e = this.getAttribute("position");
      if (e !== void 0) {
        let n = this.getAttribute("normal");
        if (n === void 0) n = new xe(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
        else for (let f = 0, d = n.count; f < d; f++) n.setXYZ(f, 0, 0, 0);
        let s = new Y(), r = new Y(), a = new Y(), o = new Y(), c = new Y(), l = new Y(), u = new Y(), h = new Y();
        if (t) for (let f = 0, d = t.count; f < d; f += 3) {
          let g = t.getX(f + 0), _ = t.getX(f + 1), m = t.getX(f + 2);
          s.fromBufferAttribute(e, g), r.fromBufferAttribute(e, _), a.fromBufferAttribute(e, m), u.subVectors(a, r), h.subVectors(s, r), u.cross(h), o.fromBufferAttribute(n, g), c.fromBufferAttribute(n, _), l.fromBufferAttribute(n, m), o.add(u), c.add(u), l.add(u), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(_, c.x, c.y, c.z), n.setXYZ(m, l.x, l.y, l.z);
        }
        else for (let f = 0, d = e.count; f < d; f += 3) s.fromBufferAttribute(e, f + 0), r.fromBufferAttribute(e, f + 1), a.fromBufferAttribute(e, f + 2), u.subVectors(a, r), h.subVectors(s, r), u.cross(h), n.setXYZ(f + 0, u.x, u.y, u.z), n.setXYZ(f + 1, u.x, u.y, u.z), n.setXYZ(f + 2, u.x, u.y, u.z);
        this.normalizeNormals(), n.needsUpdate = true;
      }
    }
    normalizeNormals() {
      let t = this.attributes.normal;
      for (let e = 0, n = t.count; e < n; e++) Ye.fromBufferAttribute(t, e), Ye.normalize(), t.setXYZ(e, Ye.x, Ye.y, Ye.z);
    }
    toNonIndexed() {
      function t(o, c) {
        let l = o.array, u = o.itemSize, h = o.normalized, f = new l.constructor(c.length * u), d = 0, g = 0;
        for (let _ = 0, m = c.length; _ < m; _++) {
          o.isInterleavedBufferAttribute ? d = c[_] * o.data.stride + o.offset : d = c[_] * u;
          for (let p = 0; p < u; p++) f[g++] = l[d++];
        }
        return new xe(f, u, h);
      }
      if (this.index === null) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
      let e = new i(), n = this.index.array, s = this.attributes;
      for (let o in s) {
        let c = s[o], l = t(c, n);
        e.setAttribute(o, l);
      }
      let r = this.morphAttributes;
      for (let o in r) {
        let c = [], l = r[o];
        for (let u = 0, h = l.length; u < h; u++) {
          let f = l[u], d = t(f, n);
          c.push(d);
        }
        e.morphAttributes[o] = c;
      }
      e.morphTargetsRelative = this.morphTargetsRelative;
      let a = this.groups;
      for (let o = 0, c = a.length; o < c; o++) {
        let l = a[o];
        e.addGroup(l.start, l.count, l.materialIndex);
      }
      return e;
    }
    toJSON() {
      let t = { metadata: { version: 4.6, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
      if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
        let c = this.parameters;
        for (let l in c) c[l] !== void 0 && (t[l] = c[l]);
        return t;
      }
      t.data = { attributes: {} };
      let e = this.index;
      e !== null && (t.data.index = { type: e.array.constructor.name, array: Array.prototype.slice.call(e.array) });
      let n = this.attributes;
      for (let c in n) {
        let l = n[c];
        t.data.attributes[c] = l.toJSON(t.data);
      }
      let s = {}, r = false;
      for (let c in this.morphAttributes) {
        let l = this.morphAttributes[c], u = [];
        for (let h = 0, f = l.length; h < f; h++) {
          let d = l[h];
          u.push(d.toJSON(t.data));
        }
        u.length > 0 && (s[c] = u, r = true);
      }
      r && (t.data.morphAttributes = s, t.data.morphTargetsRelative = this.morphTargetsRelative);
      let a = this.groups;
      a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
      let o = this.boundingSphere;
      return o !== null && (t.data.boundingSphere = { center: o.center.toArray(), radius: o.radius }), t;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
      let e = {};
      this.name = t.name;
      let n = t.index;
      n !== null && this.setIndex(n.clone(e));
      let s = t.attributes;
      for (let l in s) {
        let u = s[l];
        this.setAttribute(l, u.clone(e));
      }
      let r = t.morphAttributes;
      for (let l in r) {
        let u = [], h = r[l];
        for (let f = 0, d = h.length; f < d; f++) u.push(h[f].clone(e));
        this.morphAttributes[l] = u;
      }
      this.morphTargetsRelative = t.morphTargetsRelative;
      let a = t.groups;
      for (let l = 0, u = a.length; l < u; l++) {
        let h = a[l];
        this.addGroup(h.start, h.count, h.materialIndex);
      }
      let o = t.boundingBox;
      o !== null && (this.boundingBox = o.clone());
      let c = t.boundingSphere;
      return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }, ph = new ve(), Oi = new hr(), qr = new vi(), mh = new Y(), ms = new Y(), gs = new Y(), xs = new Y(), Ba = new Y(), Yr = new Y(), Zr = new Bt(), Jr = new Bt(), $r = new Bt(), gh = new Y(), xh = new Y(), _h = new Y(), Kr = new Y(), jr = new Y(), zt = class extends $e {
    constructor(t = new we(), e = new se()) {
      super(), this.isMesh = true, this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets();
    }
    copy(t, e) {
      return super.copy(t, e), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
    }
    updateMorphTargets() {
      let e = this.geometry.morphAttributes, n = Object.keys(e);
      if (n.length > 0) {
        let s = e[n[0]];
        if (s !== void 0) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let r = 0, a = s.length; r < a; r++) {
            let o = s[r].name || String(r);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
          }
        }
      }
    }
    getVertexPosition(t, e) {
      let n = this.geometry, s = n.attributes.position, r = n.morphAttributes.position, a = n.morphTargetsRelative;
      e.fromBufferAttribute(s, t);
      let o = this.morphTargetInfluences;
      if (r && o) {
        Yr.set(0, 0, 0);
        for (let c = 0, l = r.length; c < l; c++) {
          let u = o[c], h = r[c];
          u !== 0 && (Ba.fromBufferAttribute(h, t), a ? Yr.addScaledVector(Ba, u) : Yr.addScaledVector(Ba.sub(e), u));
        }
        e.add(Yr);
      }
      return e;
    }
    raycast(t, e) {
      let n = this.geometry, s = this.material, r = this.matrixWorld;
      s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), qr.copy(n.boundingSphere), qr.applyMatrix4(r), Oi.copy(t.ray).recast(t.near), !(qr.containsPoint(Oi.origin) === false && (Oi.intersectSphere(qr, mh) === null || Oi.origin.distanceToSquared(mh) > (t.far - t.near) ** 2)) && (ph.copy(r).invert(), Oi.copy(t.ray).applyMatrix4(ph), !(n.boundingBox !== null && Oi.intersectsBox(n.boundingBox) === false) && this._computeIntersections(t, e, Oi)));
    }
    _computeIntersections(t, e, n) {
      let s, r = this.geometry, a = this.material, o = r.index, c = r.attributes.position, l = r.attributes.uv, u = r.attributes.uv1, h = r.attributes.normal, f = r.groups, d = r.drawRange;
      if (o !== null) if (Array.isArray(a)) for (let g = 0, _ = f.length; g < _; g++) {
        let m = f[g], p = a[m.materialIndex], x = Math.max(m.start, d.start), v = Math.min(o.count, Math.min(m.start + m.count, d.start + d.count));
        for (let E = x, R = v; E < R; E += 3) {
          let w = o.getX(E), T = o.getX(E + 1), U = o.getX(E + 2);
          s = Qr(this, p, t, n, l, u, h, w, T, U), s && (s.faceIndex = Math.floor(E / 3), s.face.materialIndex = m.materialIndex, e.push(s));
        }
      }
      else {
        let g = Math.max(0, d.start), _ = Math.min(o.count, d.start + d.count);
        for (let m = g, p = _; m < p; m += 3) {
          let x = o.getX(m), v = o.getX(m + 1), E = o.getX(m + 2);
          s = Qr(this, a, t, n, l, u, h, x, v, E), s && (s.faceIndex = Math.floor(m / 3), e.push(s));
        }
      }
      else if (c !== void 0) if (Array.isArray(a)) for (let g = 0, _ = f.length; g < _; g++) {
        let m = f[g], p = a[m.materialIndex], x = Math.max(m.start, d.start), v = Math.min(c.count, Math.min(m.start + m.count, d.start + d.count));
        for (let E = x, R = v; E < R; E += 3) {
          let w = E, T = E + 1, U = E + 2;
          s = Qr(this, p, t, n, l, u, h, w, T, U), s && (s.faceIndex = Math.floor(E / 3), s.face.materialIndex = m.materialIndex, e.push(s));
        }
      }
      else {
        let g = Math.max(0, d.start), _ = Math.min(c.count, d.start + d.count);
        for (let m = g, p = _; m < p; m += 3) {
          let x = m, v = m + 1, E = m + 2;
          s = Qr(this, a, t, n, l, u, h, x, v, E), s && (s.faceIndex = Math.floor(m / 3), e.push(s));
        }
      }
    }
  };
  function Nd(i, t, e, n, s, r, a, o) {
    let c;
    if (t.side === Ze ? c = n.intersectTriangle(a, r, s, true, o) : c = n.intersectTriangle(s, r, a, t.side === bn, o), c === null) return null;
    jr.copy(o), jr.applyMatrix4(i.matrixWorld);
    let l = e.ray.origin.distanceTo(jr);
    return l < e.near || l > e.far ? null : { distance: l, point: jr.clone(), object: i };
  }
  function Qr(i, t, e, n, s, r, a, o, c, l) {
    i.getVertexPosition(o, ms), i.getVertexPosition(c, gs), i.getVertexPosition(l, xs);
    let u = Nd(i, t, e, n, ms, gs, xs, Kr);
    if (u) {
      s && (Zr.fromBufferAttribute(s, o), Jr.fromBufferAttribute(s, c), $r.fromBufferAttribute(s, l), u.uv = Hi.getInterpolation(Kr, ms, gs, xs, Zr, Jr, $r, new Bt())), r && (Zr.fromBufferAttribute(r, o), Jr.fromBufferAttribute(r, c), $r.fromBufferAttribute(r, l), u.uv1 = Hi.getInterpolation(Kr, ms, gs, xs, Zr, Jr, $r, new Bt()), u.uv2 = u.uv1), a && (gh.fromBufferAttribute(a, o), xh.fromBufferAttribute(a, c), _h.fromBufferAttribute(a, l), u.normal = Hi.getInterpolation(Kr, ms, gs, xs, gh, xh, _h, new Y()), u.normal.dot(n.direction) > 0 && u.normal.multiplyScalar(-1));
      let h = { a: o, b: c, c: l, normal: new Y(), materialIndex: 0 };
      Hi.getNormal(ms, gs, xs, h.normal), u.face = h;
    }
    return u;
  }
  var qi = class i extends we {
    constructor(t = 1, e = 1, n = 1, s = 1, r = 1, a = 1) {
      super(), this.type = "BoxGeometry", this.parameters = { width: t, height: e, depth: n, widthSegments: s, heightSegments: r, depthSegments: a };
      let o = this;
      s = Math.floor(s), r = Math.floor(r), a = Math.floor(a);
      let c = [], l = [], u = [], h = [], f = 0, d = 0;
      g("z", "y", "x", -1, -1, n, e, t, a, r, 0), g("z", "y", "x", 1, -1, n, e, -t, a, r, 1), g("x", "z", "y", 1, 1, t, n, e, s, a, 2), g("x", "z", "y", 1, -1, t, n, -e, s, a, 3), g("x", "y", "z", 1, -1, t, e, n, s, r, 4), g("x", "y", "z", -1, -1, t, e, -n, s, r, 5), this.setIndex(c), this.setAttribute("position", new de(l, 3)), this.setAttribute("normal", new de(u, 3)), this.setAttribute("uv", new de(h, 2));
      function g(_, m, p, x, v, E, R, w, T, U, M) {
        let S = E / T, q = R / U, J = E / 2, ht = R / 2, H = w / 2, $ = T + 1, et = U + 1, pt = 0, V = 0, C = new Y();
        for (let gt = 0; gt < et; gt++) {
          let xt = gt * q - ht;
          for (let At = 0; At < $; At++) {
            let rt = At * S - J;
            C[_] = rt * x, C[m] = xt * v, C[p] = H, l.push(C.x, C.y, C.z), C[_] = 0, C[m] = 0, C[p] = w > 0 ? 1 : -1, u.push(C.x, C.y, C.z), h.push(At / T), h.push(1 - gt / U), pt += 1;
          }
        }
        for (let gt = 0; gt < U; gt++) for (let xt = 0; xt < T; xt++) {
          let At = f + xt + $ * gt, rt = f + xt + $ * (gt + 1), yt = f + (xt + 1) + $ * (gt + 1), wt = f + (xt + 1) + $ * gt;
          c.push(At, rt, wt), c.push(rt, yt, wt), V += 6;
        }
        o.addGroup(d, V, M), d += V, f += pt;
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
    }
  };
  function Ns(i) {
    let t = {};
    for (let e in i) {
      t[e] = {};
      for (let n in i[e]) {
        let s = i[e][n];
        s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion) ? s.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[e][n] = null) : t[e][n] = s.clone() : Array.isArray(s) ? t[e][n] = s.slice() : t[e][n] = s;
      }
    }
    return t;
  }
  function on(i) {
    let t = {};
    for (let e = 0; e < i.length; e++) {
      let n = Ns(i[e]);
      for (let s in n) t[s] = n[s];
    }
    return t;
  }
  function Od(i) {
    let t = [];
    for (let e = 0; e < i.length; e++) t.push(i[e].clone());
    return t;
  }
  function mu(i) {
    return i.getRenderTarget() === null ? i.outputColorSpace : ge.workingColorSpace;
  }
  var bi = { clone: Ns, merge: on }, Fd = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, zd = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, Te = class extends si {
    constructor(t) {
      super(), this.isShaderMaterial = true, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Fd, this.fragmentShader = zd, this.linewidth = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.fog = false, this.lights = false, this.clipping = false, this.forceSinglePass = true, this.extensions = { derivatives: false, fragDepth: false, drawBuffers: false, shaderTextureLOD: false, clipCullDistance: false }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = false, this.glslVersion = null, t !== void 0 && this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = Ns(t.uniforms), this.uniformsGroups = Od(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
    }
    toJSON(t) {
      let e = super.toJSON(t);
      e.glslVersion = this.glslVersion, e.uniforms = {};
      for (let s in this.uniforms) {
        let a = this.uniforms[s].value;
        a && a.isTexture ? e.uniforms[s] = { type: "t", value: a.toJSON(t).uuid } : a && a.isColor ? e.uniforms[s] = { type: "c", value: a.getHex() } : a && a.isVector2 ? e.uniforms[s] = { type: "v2", value: a.toArray() } : a && a.isVector3 ? e.uniforms[s] = { type: "v3", value: a.toArray() } : a && a.isVector4 ? e.uniforms[s] = { type: "v4", value: a.toArray() } : a && a.isMatrix3 ? e.uniforms[s] = { type: "m3", value: a.toArray() } : a && a.isMatrix4 ? e.uniforms[s] = { type: "m4", value: a.toArray() } : e.uniforms[s] = { value: a };
      }
      Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
      let n = {};
      for (let s in this.extensions) this.extensions[s] === true && (n[s] = true);
      return Object.keys(n).length > 0 && (e.extensions = n), e;
    }
  }, To = class extends $e {
    constructor() {
      super(), this.isCamera = true, this.type = "Camera", this.matrixWorldInverse = new ve(), this.projectionMatrix = new ve(), this.projectionMatrixInverse = new ve(), this.coordinateSystem = ei;
    }
    copy(t, e) {
      return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
    }
    getWorldDirection(t) {
      return super.getWorldDirection(t).negate();
    }
    updateMatrixWorld(t) {
      super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    updateWorldMatrix(t, e) {
      super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }, nn = class extends To {
    constructor(t = 50, e = 1, n = 0.1, s = 2e3) {
      super(), this.isPerspectiveCamera = true, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = s, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
    }
    copy(t, e) {
      return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
    }
    setFocalLength(t) {
      let e = 0.5 * this.getFilmHeight() / t;
      this.fov = nc * 2 * Math.atan(e), this.updateProjectionMatrix();
    }
    getFocalLength() {
      let t = Math.tan(ba * 0.5 * this.fov);
      return 0.5 * this.getFilmHeight() / t;
    }
    getEffectiveFOV() {
      return nc * 2 * Math.atan(Math.tan(ba * 0.5 * this.fov) / this.zoom);
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }
    setViewOffset(t, e, n, s, r, a) {
      this.aspect = t / e, this.view === null && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      let t = this.near, e = t * Math.tan(ba * 0.5 * this.fov) / this.zoom, n = 2 * e, s = this.aspect * n, r = -0.5 * s, a = this.view;
      if (this.view !== null && this.view.enabled) {
        let c = a.fullWidth, l = a.fullHeight;
        r += a.offsetX * s / c, e -= a.offsetY * n / l, s *= a.width / c, n *= a.height / l;
      }
      let o = this.filmOffset;
      o !== 0 && (r += t * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
    }
  }, _s = -90, vs = 1, oc = class extends $e {
    constructor(t, e, n) {
      super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
      let s = new nn(_s, vs, t, e);
      s.layers = this.layers, this.add(s);
      let r = new nn(_s, vs, t, e);
      r.layers = this.layers, this.add(r);
      let a = new nn(_s, vs, t, e);
      a.layers = this.layers, this.add(a);
      let o = new nn(_s, vs, t, e);
      o.layers = this.layers, this.add(o);
      let c = new nn(_s, vs, t, e);
      c.layers = this.layers, this.add(c);
      let l = new nn(_s, vs, t, e);
      l.layers = this.layers, this.add(l);
    }
    updateCoordinateSystem() {
      let t = this.coordinateSystem, e = this.children.concat(), [n, s, r, a, o, c] = e;
      for (let l of e) this.remove(l);
      if (t === ei) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), c.up.set(0, 1, 0), c.lookAt(0, 0, -1);
      else if (t === vo) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), c.up.set(0, -1, 0), c.lookAt(0, 0, -1);
      else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
      for (let l of e) this.add(l), l.updateMatrixWorld();
    }
    update(t, e) {
      this.parent === null && this.updateMatrixWorld();
      let { renderTarget: n, activeMipmapLevel: s } = this;
      this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
      let [r, a, o, c, l, u] = this.children, h = t.getRenderTarget(), f = t.getActiveCubeFace(), d = t.getActiveMipmapLevel(), g = t.xr.enabled;
      t.xr.enabled = false;
      let _ = n.texture.generateMipmaps;
      n.texture.generateMipmaps = false, t.setRenderTarget(n, 0, s), t.render(e, r), t.setRenderTarget(n, 1, s), t.render(e, a), t.setRenderTarget(n, 2, s), t.render(e, o), t.setRenderTarget(n, 3, s), t.render(e, c), t.setRenderTarget(n, 4, s), t.render(e, l), n.texture.generateMipmaps = _, t.setRenderTarget(n, 5, s), t.render(e, u), t.setRenderTarget(h, f, d), t.xr.enabled = g, n.texture.needsPMREMUpdate = true;
    }
  }, Ao = class extends Sn {
    constructor(t, e, n, s, r, a, o, c, l, u) {
      t = t !== void 0 ? t : [], e = e !== void 0 ? e : Ls, super(t, e, n, s, r, a, o, c, l, u), this.isCubeTexture = true, this.flipY = false;
    }
    get images() {
      return this.image;
    }
    set images(t) {
      this.image = t;
    }
  }, ac = class extends Je {
    constructor(t = 1, e = {}) {
      super(t, t, e), this.isWebGLCubeRenderTarget = true;
      let n = { width: t, height: t, depth: 1 }, s = [n, n, n, n, n, n];
      e.encoding !== void 0 && (cr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."), e.colorSpace = e.encoding === Wi ? Se : Mn), this.texture = new Ao(s, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = true, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : false, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : yn;
    }
    fromEquirectangularTexture(t, e) {
      this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
      let n = { uniforms: { tEquirect: { value: null } }, vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`, fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			` }, s = new qi(5, 5, 5), r = new Te({ name: "CubemapFromEquirect", uniforms: Ns(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: Ze, blending: Hn });
      r.uniforms.tEquirect.value = e;
      let a = new zt(s, r), o = e.minFilter;
      return e.minFilter === ni && (e.minFilter = yn), new oc(1, 10, this).update(t, a), e.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
    }
    clear(t, e, n, s) {
      let r = t.getRenderTarget();
      for (let a = 0; a < 6; a++) t.setRenderTarget(this, a), t.clear(e, n, s);
      t.setRenderTarget(r);
    }
  }, ka = new Y(), Bd = new Y(), kd = new ue(), Qn = class {
    constructor(t = new Y(1, 0, 0), e = 0) {
      this.isPlane = true, this.normal = t, this.constant = e;
    }
    set(t, e) {
      return this.normal.copy(t), this.constant = e, this;
    }
    setComponents(t, e, n, s) {
      return this.normal.set(t, e, n), this.constant = s, this;
    }
    setFromNormalAndCoplanarPoint(t, e) {
      return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
    }
    setFromCoplanarPoints(t, e, n) {
      let s = ka.subVectors(n, e).cross(Bd.subVectors(t, e)).normalize();
      return this.setFromNormalAndCoplanarPoint(s, t), this;
    }
    copy(t) {
      return this.normal.copy(t.normal), this.constant = t.constant, this;
    }
    normalize() {
      let t = 1 / this.normal.length();
      return this.normal.multiplyScalar(t), this.constant *= t, this;
    }
    negate() {
      return this.constant *= -1, this.normal.negate(), this;
    }
    distanceToPoint(t) {
      return this.normal.dot(t) + this.constant;
    }
    distanceToSphere(t) {
      return this.distanceToPoint(t.center) - t.radius;
    }
    projectPoint(t, e) {
      return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
    }
    intersectLine(t, e) {
      let n = t.delta(ka), s = this.normal.dot(n);
      if (s === 0) return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
      let r = -(t.start.dot(this.normal) + this.constant) / s;
      return r < 0 || r > 1 ? null : e.copy(t.start).addScaledVector(n, r);
    }
    intersectsLine(t) {
      let e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
      return e < 0 && n > 0 || n < 0 && e > 0;
    }
    intersectsBox(t) {
      return t.intersectsPlane(this);
    }
    intersectsSphere(t) {
      return t.intersectsPlane(this);
    }
    coplanarPoint(t) {
      return t.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(t, e) {
      let n = e || kd.getNormalMatrix(t), s = this.coplanarPoint(ka).applyMatrix4(t), r = this.normal.applyMatrix3(n).normalize();
      return this.constant = -s.dot(r), this;
    }
    translate(t) {
      return this.constant -= t.dot(this.normal), this;
    }
    equals(t) {
      return t.normal.equals(this.normal) && t.constant === this.constant;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }, Fi = new vi(), to = new Y(), fr = class {
    constructor(t = new Qn(), e = new Qn(), n = new Qn(), s = new Qn(), r = new Qn(), a = new Qn()) {
      this.planes = [t, e, n, s, r, a];
    }
    set(t, e, n, s, r, a) {
      let o = this.planes;
      return o[0].copy(t), o[1].copy(e), o[2].copy(n), o[3].copy(s), o[4].copy(r), o[5].copy(a), this;
    }
    copy(t) {
      let e = this.planes;
      for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
      return this;
    }
    setFromProjectionMatrix(t, e = ei) {
      let n = this.planes, s = t.elements, r = s[0], a = s[1], o = s[2], c = s[3], l = s[4], u = s[5], h = s[6], f = s[7], d = s[8], g = s[9], _ = s[10], m = s[11], p = s[12], x = s[13], v = s[14], E = s[15];
      if (n[0].setComponents(c - r, f - l, m - d, E - p).normalize(), n[1].setComponents(c + r, f + l, m + d, E + p).normalize(), n[2].setComponents(c + a, f + u, m + g, E + x).normalize(), n[3].setComponents(c - a, f - u, m - g, E - x).normalize(), n[4].setComponents(c - o, f - h, m - _, E - v).normalize(), e === ei) n[5].setComponents(c + o, f + h, m + _, E + v).normalize();
      else if (e === vo) n[5].setComponents(o, h, _, v).normalize();
      else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
      return this;
    }
    intersectsObject(t) {
      if (t.boundingSphere !== void 0) t.boundingSphere === null && t.computeBoundingSphere(), Fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
      else {
        let e = t.geometry;
        e.boundingSphere === null && e.computeBoundingSphere(), Fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
      }
      return this.intersectsSphere(Fi);
    }
    intersectsSprite(t) {
      return Fi.center.set(0, 0, 0), Fi.radius = 0.7071067811865476, Fi.applyMatrix4(t.matrixWorld), this.intersectsSphere(Fi);
    }
    intersectsSphere(t) {
      let e = this.planes, n = t.center, s = -t.radius;
      for (let r = 0; r < 6; r++) if (e[r].distanceToPoint(n) < s) return false;
      return true;
    }
    intersectsBox(t) {
      let e = this.planes;
      for (let n = 0; n < 6; n++) {
        let s = e[n];
        if (to.x = s.normal.x > 0 ? t.max.x : t.min.x, to.y = s.normal.y > 0 ? t.max.y : t.min.y, to.z = s.normal.z > 0 ? t.max.z : t.min.z, s.distanceToPoint(to) < 0) return false;
      }
      return true;
    }
    containsPoint(t) {
      let e = this.planes;
      for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return false;
      return true;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  function gu() {
    let i = null, t = false, e = null, n = null;
    function s(r, a) {
      e(r, a), n = i.requestAnimationFrame(s);
    }
    return { start: function() {
      t !== true && e !== null && (n = i.requestAnimationFrame(s), t = true);
    }, stop: function() {
      i.cancelAnimationFrame(n), t = false;
    }, setAnimationLoop: function(r) {
      e = r;
    }, setContext: function(r) {
      i = r;
    } };
  }
  function Hd(i, t) {
    let e = t.isWebGL2, n = /* @__PURE__ */ new WeakMap();
    function s(l, u) {
      let h = l.array, f = l.usage, d = h.byteLength, g = i.createBuffer();
      i.bindBuffer(u, g), i.bufferData(u, h, f), l.onUploadCallback();
      let _;
      if (h instanceof Float32Array) _ = i.FLOAT;
      else if (h instanceof Uint16Array) if (l.isFloat16BufferAttribute) if (e) _ = i.HALF_FLOAT;
      else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else _ = i.UNSIGNED_SHORT;
      else if (h instanceof Int16Array) _ = i.SHORT;
      else if (h instanceof Uint32Array) _ = i.UNSIGNED_INT;
      else if (h instanceof Int32Array) _ = i.INT;
      else if (h instanceof Int8Array) _ = i.BYTE;
      else if (h instanceof Uint8Array) _ = i.UNSIGNED_BYTE;
      else if (h instanceof Uint8ClampedArray) _ = i.UNSIGNED_BYTE;
      else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + h);
      return { buffer: g, type: _, bytesPerElement: h.BYTES_PER_ELEMENT, version: l.version, size: d };
    }
    function r(l, u, h) {
      let f = u.array, d = u._updateRange, g = u.updateRanges;
      if (i.bindBuffer(h, l), d.count === -1 && g.length === 0 && i.bufferSubData(h, 0, f), g.length !== 0) {
        for (let _ = 0, m = g.length; _ < m; _++) {
          let p = g[_];
          e ? i.bufferSubData(h, p.start * f.BYTES_PER_ELEMENT, f, p.start, p.count) : i.bufferSubData(h, p.start * f.BYTES_PER_ELEMENT, f.subarray(p.start, p.start + p.count));
        }
        u.clearUpdateRanges();
      }
      d.count !== -1 && (e ? i.bufferSubData(h, d.offset * f.BYTES_PER_ELEMENT, f, d.offset, d.count) : i.bufferSubData(h, d.offset * f.BYTES_PER_ELEMENT, f.subarray(d.offset, d.offset + d.count)), d.count = -1), u.onUploadCallback();
    }
    function a(l) {
      return l.isInterleavedBufferAttribute && (l = l.data), n.get(l);
    }
    function o(l) {
      l.isInterleavedBufferAttribute && (l = l.data);
      let u = n.get(l);
      u && (i.deleteBuffer(u.buffer), n.delete(l));
    }
    function c(l, u) {
      if (l.isGLBufferAttribute) {
        let f = n.get(l);
        (!f || f.version < l.version) && n.set(l, { buffer: l.buffer, type: l.type, bytesPerElement: l.elementSize, version: l.version });
        return;
      }
      l.isInterleavedBufferAttribute && (l = l.data);
      let h = n.get(l);
      if (h === void 0) n.set(l, s(l, u));
      else if (h.version < l.version) {
        if (h.size !== l.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
        r(h.buffer, l, u), h.version = l.version;
      }
    }
    return { get: a, remove: o, update: c };
  }
  var Ke = class i extends we {
    constructor(t = 1, e = 1, n = 1, s = 1) {
      super(), this.type = "PlaneGeometry", this.parameters = { width: t, height: e, widthSegments: n, heightSegments: s };
      let r = t / 2, a = e / 2, o = Math.floor(n), c = Math.floor(s), l = o + 1, u = c + 1, h = t / o, f = e / c, d = [], g = [], _ = [], m = [];
      for (let p = 0; p < u; p++) {
        let x = p * f - a;
        for (let v = 0; v < l; v++) {
          let E = v * h - r;
          g.push(E, -x, 0), _.push(0, 0, 1), m.push(v / o), m.push(1 - p / c);
        }
      }
      for (let p = 0; p < c; p++) for (let x = 0; x < o; x++) {
        let v = x + l * p, E = x + l * (p + 1), R = x + 1 + l * (p + 1), w = x + 1 + l * p;
        d.push(v, E, w), d.push(E, R, w);
      }
      this.setIndex(d), this.setAttribute("position", new de(g, 3)), this.setAttribute("normal", new de(_, 3)), this.setAttribute("uv", new de(m, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.width, t.height, t.widthSegments, t.heightSegments);
    }
  }, Gd = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Vd = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Wd = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Xd = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, qd = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`, Yd = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Zd = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Jd = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, $d = `#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Kd = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`, jd = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Qd = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, tp = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, ep = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, np = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, ip = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`, sp = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, rp = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, op = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, ap = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, cp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, lp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`, hp = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`, up = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, fp = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, dp = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, pp = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, mp = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, gp = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, xp = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, _p = "gl_FragColor = linearToOutputTexel( gl_FragColor );", vp = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`, yp = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Mp = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, bp = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Sp = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Ep = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, wp = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Tp = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Ap = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Rp = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Cp = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Pp = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`, Lp = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Ip = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Up = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Dp = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Np = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Op = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Fp = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, zp = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Bp = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, kp = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, Hp = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Gp = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Vp = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, Wp = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Xp = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, qp = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Yp = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`, Zp = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`, Jp = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, $p = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Kp = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, jp = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Qp = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, t0 = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, e0 = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, n0 = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`, i0 = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`, s0 = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`, r0 = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, o0 = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, a0 = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, c0 = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, l0 = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, h0 = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, u0 = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, f0 = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, d0 = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, p0 = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, m0 = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, g0 = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, x0 = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, _0 = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, v0 = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, y0 = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, M0 = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, b0 = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, S0 = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`, E0 = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, w0 = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, T0 = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, A0 = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, R0 = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, C0 = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, P0 = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, L0 = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, I0 = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, U0 = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, D0 = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, N0 = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, O0 = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, F0 = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, z0 = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, B0 = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, k0 = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`, H0 = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, G0 = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, V0 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, W0 = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, X0 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, q0 = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Y0 = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, Z0 = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`, J0 = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, $0 = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, K0 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, j0 = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Q0 = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, tm = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, em = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, nm = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, im = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, sm = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, rm = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, om = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, am = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, cm = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, lm = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, hm = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, um = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, fm = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, dm = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, pm = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, mm = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, gm = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, xm = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, _m = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, vm = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, ym = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, oe = { alphahash_fragment: Gd, alphahash_pars_fragment: Vd, alphamap_fragment: Wd, alphamap_pars_fragment: Xd, alphatest_fragment: qd, alphatest_pars_fragment: Yd, aomap_fragment: Zd, aomap_pars_fragment: Jd, batching_pars_vertex: $d, batching_vertex: Kd, begin_vertex: jd, beginnormal_vertex: Qd, bsdfs: tp, iridescence_fragment: ep, bumpmap_pars_fragment: np, clipping_planes_fragment: ip, clipping_planes_pars_fragment: sp, clipping_planes_pars_vertex: rp, clipping_planes_vertex: op, color_fragment: ap, color_pars_fragment: cp, color_pars_vertex: lp, color_vertex: hp, common: up, cube_uv_reflection_fragment: fp, defaultnormal_vertex: dp, displacementmap_pars_vertex: pp, displacementmap_vertex: mp, emissivemap_fragment: gp, emissivemap_pars_fragment: xp, colorspace_fragment: _p, colorspace_pars_fragment: vp, envmap_fragment: yp, envmap_common_pars_fragment: Mp, envmap_pars_fragment: bp, envmap_pars_vertex: Sp, envmap_physical_pars_fragment: Np, envmap_vertex: Ep, fog_vertex: wp, fog_pars_vertex: Tp, fog_fragment: Ap, fog_pars_fragment: Rp, gradientmap_pars_fragment: Cp, lightmap_fragment: Pp, lightmap_pars_fragment: Lp, lights_lambert_fragment: Ip, lights_lambert_pars_fragment: Up, lights_pars_begin: Dp, lights_toon_fragment: Op, lights_toon_pars_fragment: Fp, lights_phong_fragment: zp, lights_phong_pars_fragment: Bp, lights_physical_fragment: kp, lights_physical_pars_fragment: Hp, lights_fragment_begin: Gp, lights_fragment_maps: Vp, lights_fragment_end: Wp, logdepthbuf_fragment: Xp, logdepthbuf_pars_fragment: qp, logdepthbuf_pars_vertex: Yp, logdepthbuf_vertex: Zp, map_fragment: Jp, map_pars_fragment: $p, map_particle_fragment: Kp, map_particle_pars_fragment: jp, metalnessmap_fragment: Qp, metalnessmap_pars_fragment: t0, morphcolor_vertex: e0, morphnormal_vertex: n0, morphtarget_pars_vertex: i0, morphtarget_vertex: s0, normal_fragment_begin: r0, normal_fragment_maps: o0, normal_pars_fragment: a0, normal_pars_vertex: c0, normal_vertex: l0, normalmap_pars_fragment: h0, clearcoat_normal_fragment_begin: u0, clearcoat_normal_fragment_maps: f0, clearcoat_pars_fragment: d0, iridescence_pars_fragment: p0, opaque_fragment: m0, packing: g0, premultiplied_alpha_fragment: x0, project_vertex: _0, dithering_fragment: v0, dithering_pars_fragment: y0, roughnessmap_fragment: M0, roughnessmap_pars_fragment: b0, shadowmap_pars_fragment: S0, shadowmap_pars_vertex: E0, shadowmap_vertex: w0, shadowmask_pars_fragment: T0, skinbase_vertex: A0, skinning_pars_vertex: R0, skinning_vertex: C0, skinnormal_vertex: P0, specularmap_fragment: L0, specularmap_pars_fragment: I0, tonemapping_fragment: U0, tonemapping_pars_fragment: D0, transmission_fragment: N0, transmission_pars_fragment: O0, uv_pars_fragment: F0, uv_pars_vertex: z0, uv_vertex: B0, worldpos_vertex: k0, background_vert: H0, background_frag: G0, backgroundCube_vert: V0, backgroundCube_frag: W0, cube_vert: X0, cube_frag: q0, depth_vert: Y0, depth_frag: Z0, distanceRGBA_vert: J0, distanceRGBA_frag: $0, equirect_vert: K0, equirect_frag: j0, linedashed_vert: Q0, linedashed_frag: tm, meshbasic_vert: em, meshbasic_frag: nm, meshlambert_vert: im, meshlambert_frag: sm, meshmatcap_vert: rm, meshmatcap_frag: om, meshnormal_vert: am, meshnormal_frag: cm, meshphong_vert: lm, meshphong_frag: hm, meshphysical_vert: um, meshphysical_frag: fm, meshtoon_vert: dm, meshtoon_frag: pm, points_vert: mm, points_frag: gm, shadow_vert: xm, shadow_frag: _m, sprite_vert: vm, sprite_frag: ym }, Dt = { common: { diffuse: { value: new Xt(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new ue() }, alphaMap: { value: null }, alphaMapTransform: { value: new ue() }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new ue() } }, envmap: { envMap: { value: null }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new ue() } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new ue() } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new ue() }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new ue() }, normalScale: { value: new Bt(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new ue() }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new ue() } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new ue() } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new ue() } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new Xt(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMap: { value: [] }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotShadowMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMap: { value: [] }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null } }, points: { diffuse: { value: new Xt(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new ue() }, alphaTest: { value: 0 }, uvTransform: { value: new ue() } }, sprite: { diffuse: { value: new Xt(16777215) }, opacity: { value: 1 }, center: { value: new Bt(0.5, 0.5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new ue() }, alphaMap: { value: null }, alphaMapTransform: { value: new ue() }, alphaTest: { value: 0 } } }, kn = { basic: { uniforms: on([Dt.common, Dt.specularmap, Dt.envmap, Dt.aomap, Dt.lightmap, Dt.fog]), vertexShader: oe.meshbasic_vert, fragmentShader: oe.meshbasic_frag }, lambert: { uniforms: on([Dt.common, Dt.specularmap, Dt.envmap, Dt.aomap, Dt.lightmap, Dt.emissivemap, Dt.bumpmap, Dt.normalmap, Dt.displacementmap, Dt.fog, Dt.lights, { emissive: { value: new Xt(0) } }]), vertexShader: oe.meshlambert_vert, fragmentShader: oe.meshlambert_frag }, phong: { uniforms: on([Dt.common, Dt.specularmap, Dt.envmap, Dt.aomap, Dt.lightmap, Dt.emissivemap, Dt.bumpmap, Dt.normalmap, Dt.displacementmap, Dt.fog, Dt.lights, { emissive: { value: new Xt(0) }, specular: { value: new Xt(1118481) }, shininess: { value: 30 } }]), vertexShader: oe.meshphong_vert, fragmentShader: oe.meshphong_frag }, standard: { uniforms: on([Dt.common, Dt.envmap, Dt.aomap, Dt.lightmap, Dt.emissivemap, Dt.bumpmap, Dt.normalmap, Dt.displacementmap, Dt.roughnessmap, Dt.metalnessmap, Dt.fog, Dt.lights, { emissive: { value: new Xt(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: oe.meshphysical_vert, fragmentShader: oe.meshphysical_frag }, toon: { uniforms: on([Dt.common, Dt.aomap, Dt.lightmap, Dt.emissivemap, Dt.bumpmap, Dt.normalmap, Dt.displacementmap, Dt.gradientmap, Dt.fog, Dt.lights, { emissive: { value: new Xt(0) } }]), vertexShader: oe.meshtoon_vert, fragmentShader: oe.meshtoon_frag }, matcap: { uniforms: on([Dt.common, Dt.bumpmap, Dt.normalmap, Dt.displacementmap, Dt.fog, { matcap: { value: null } }]), vertexShader: oe.meshmatcap_vert, fragmentShader: oe.meshmatcap_frag }, points: { uniforms: on([Dt.points, Dt.fog]), vertexShader: oe.points_vert, fragmentShader: oe.points_frag }, dashed: { uniforms: on([Dt.common, Dt.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: oe.linedashed_vert, fragmentShader: oe.linedashed_frag }, depth: { uniforms: on([Dt.common, Dt.displacementmap]), vertexShader: oe.depth_vert, fragmentShader: oe.depth_frag }, normal: { uniforms: on([Dt.common, Dt.bumpmap, Dt.normalmap, Dt.displacementmap, { opacity: { value: 1 } }]), vertexShader: oe.meshnormal_vert, fragmentShader: oe.meshnormal_frag }, sprite: { uniforms: on([Dt.sprite, Dt.fog]), vertexShader: oe.sprite_vert, fragmentShader: oe.sprite_frag }, background: { uniforms: { uvTransform: { value: new ue() }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: oe.background_vert, fragmentShader: oe.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 } }, vertexShader: oe.backgroundCube_vert, fragmentShader: oe.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: oe.cube_vert, fragmentShader: oe.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: oe.equirect_vert, fragmentShader: oe.equirect_frag }, distanceRGBA: { uniforms: on([Dt.common, Dt.displacementmap, { referencePosition: { value: new Y() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: oe.distanceRGBA_vert, fragmentShader: oe.distanceRGBA_frag }, shadow: { uniforms: on([Dt.lights, Dt.fog, { color: { value: new Xt(0) }, opacity: { value: 1 } }]), vertexShader: oe.shadow_vert, fragmentShader: oe.shadow_frag } };
  kn.physical = { uniforms: on([kn.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new ue() }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new ue() }, clearcoatNormalScale: { value: new Bt(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new ue() }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new ue() }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new ue() }, sheen: { value: 0 }, sheenColor: { value: new Xt(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new ue() }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new ue() }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new ue() }, transmissionSamplerSize: { value: new Bt() }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new ue() }, attenuationDistance: { value: 0 }, attenuationColor: { value: new Xt(0) }, specularColor: { value: new Xt(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new ue() }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new ue() }, anisotropyVector: { value: new Bt() }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new ue() } }]), vertexShader: oe.meshphysical_vert, fragmentShader: oe.meshphysical_frag };
  var eo = { r: 0, b: 0, g: 0 };
  function Mm(i, t, e, n, s, r, a) {
    let o = new Xt(0), c = r === true ? 0 : 1, l, u, h = null, f = 0, d = null;
    function g(m, p) {
      let x = false, v = p.isScene === true ? p.background : null;
      v && v.isTexture && (v = (p.backgroundBlurriness > 0 ? e : t).get(v)), v === null ? _(o, c) : v && v.isColor && (_(v, 1), x = true);
      let E = i.xr.getEnvironmentBlendMode();
      E === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : E === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || x) && i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil), v && (v.isCubeTexture || v.mapping === ko) ? (u === void 0 && (u = new zt(new qi(1, 1, 1), new Te({ name: "BackgroundCubeMaterial", uniforms: Ns(kn.backgroundCube.uniforms), vertexShader: kn.backgroundCube.vertexShader, fragmentShader: kn.backgroundCube.fragmentShader, side: Ze, depthTest: false, depthWrite: false, fog: false })), u.geometry.deleteAttribute("normal"), u.geometry.deleteAttribute("uv"), u.onBeforeRender = function(R, w, T) {
        this.matrixWorld.copyPosition(T.matrixWorld);
      }, Object.defineProperty(u.material, "envMap", { get: function() {
        return this.uniforms.envMap.value;
      } }), s.update(u)), u.material.uniforms.envMap.value = v, u.material.uniforms.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === false ? -1 : 1, u.material.uniforms.backgroundBlurriness.value = p.backgroundBlurriness, u.material.uniforms.backgroundIntensity.value = p.backgroundIntensity, u.material.toneMapped = ge.getTransfer(v.colorSpace) !== Me, (h !== v || f !== v.version || d !== i.toneMapping) && (u.material.needsUpdate = true, h = v, f = v.version, d = i.toneMapping), u.layers.enableAll(), m.unshift(u, u.geometry, u.material, 0, 0, null)) : v && v.isTexture && (l === void 0 && (l = new zt(new Ke(2, 2), new Te({ name: "BackgroundMaterial", uniforms: Ns(kn.background.uniforms), vertexShader: kn.background.vertexShader, fragmentShader: kn.background.fragmentShader, side: bn, depthTest: false, depthWrite: false, fog: false })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", { get: function() {
        return this.uniforms.t2D.value;
      } }), s.update(l)), l.material.uniforms.t2D.value = v, l.material.uniforms.backgroundIntensity.value = p.backgroundIntensity, l.material.toneMapped = ge.getTransfer(v.colorSpace) !== Me, v.matrixAutoUpdate === true && v.updateMatrix(), l.material.uniforms.uvTransform.value.copy(v.matrix), (h !== v || f !== v.version || d !== i.toneMapping) && (l.material.needsUpdate = true, h = v, f = v.version, d = i.toneMapping), l.layers.enableAll(), m.unshift(l, l.geometry, l.material, 0, 0, null));
    }
    function _(m, p) {
      m.getRGB(eo, mu(i)), n.buffers.color.setClear(eo.r, eo.g, eo.b, p, a);
    }
    return { getClearColor: function() {
      return o;
    }, setClearColor: function(m, p = 1) {
      o.set(m), c = p, _(o, c);
    }, getClearAlpha: function() {
      return c;
    }, setClearAlpha: function(m) {
      c = m, _(o, c);
    }, render: g };
  }
  function bm(i, t, e, n) {
    let s = i.getParameter(i.MAX_VERTEX_ATTRIBS), r = n.isWebGL2 ? null : t.get("OES_vertex_array_object"), a = n.isWebGL2 || r !== null, o = {}, c = m(null), l = c, u = false;
    function h(H, $, et, pt, V) {
      let C = false;
      if (a) {
        let gt = _(pt, et, $);
        l !== gt && (l = gt, d(l.object)), C = p(H, pt, et, V), C && x(H, pt, et, V);
      } else {
        let gt = $.wireframe === true;
        (l.geometry !== pt.id || l.program !== et.id || l.wireframe !== gt) && (l.geometry = pt.id, l.program = et.id, l.wireframe = gt, C = true);
      }
      V !== null && e.update(V, i.ELEMENT_ARRAY_BUFFER), (C || u) && (u = false, U(H, $, et, pt), V !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(V).buffer));
    }
    function f() {
      return n.isWebGL2 ? i.createVertexArray() : r.createVertexArrayOES();
    }
    function d(H) {
      return n.isWebGL2 ? i.bindVertexArray(H) : r.bindVertexArrayOES(H);
    }
    function g(H) {
      return n.isWebGL2 ? i.deleteVertexArray(H) : r.deleteVertexArrayOES(H);
    }
    function _(H, $, et) {
      let pt = et.wireframe === true, V = o[H.id];
      V === void 0 && (V = {}, o[H.id] = V);
      let C = V[$.id];
      C === void 0 && (C = {}, V[$.id] = C);
      let gt = C[pt];
      return gt === void 0 && (gt = m(f()), C[pt] = gt), gt;
    }
    function m(H) {
      let $ = [], et = [], pt = [];
      for (let V = 0; V < s; V++) $[V] = 0, et[V] = 0, pt[V] = 0;
      return { geometry: null, program: null, wireframe: false, newAttributes: $, enabledAttributes: et, attributeDivisors: pt, object: H, attributes: {}, index: null };
    }
    function p(H, $, et, pt) {
      let V = l.attributes, C = $.attributes, gt = 0, xt = et.getAttributes();
      for (let At in xt) if (xt[At].location >= 0) {
        let yt = V[At], wt = C[At];
        if (wt === void 0 && (At === "instanceMatrix" && H.instanceMatrix && (wt = H.instanceMatrix), At === "instanceColor" && H.instanceColor && (wt = H.instanceColor)), yt === void 0 || yt.attribute !== wt || wt && yt.data !== wt.data) return true;
        gt++;
      }
      return l.attributesNum !== gt || l.index !== pt;
    }
    function x(H, $, et, pt) {
      let V = {}, C = $.attributes, gt = 0, xt = et.getAttributes();
      for (let At in xt) if (xt[At].location >= 0) {
        let yt = C[At];
        yt === void 0 && (At === "instanceMatrix" && H.instanceMatrix && (yt = H.instanceMatrix), At === "instanceColor" && H.instanceColor && (yt = H.instanceColor));
        let wt = {};
        wt.attribute = yt, yt && yt.data && (wt.data = yt.data), V[At] = wt, gt++;
      }
      l.attributes = V, l.attributesNum = gt, l.index = pt;
    }
    function v() {
      let H = l.newAttributes;
      for (let $ = 0, et = H.length; $ < et; $++) H[$] = 0;
    }
    function E(H) {
      R(H, 0);
    }
    function R(H, $) {
      let et = l.newAttributes, pt = l.enabledAttributes, V = l.attributeDivisors;
      et[H] = 1, pt[H] === 0 && (i.enableVertexAttribArray(H), pt[H] = 1), V[H] !== $ && ((n.isWebGL2 ? i : t.get("ANGLE_instanced_arrays"))[n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](H, $), V[H] = $);
    }
    function w() {
      let H = l.newAttributes, $ = l.enabledAttributes;
      for (let et = 0, pt = $.length; et < pt; et++) $[et] !== H[et] && (i.disableVertexAttribArray(et), $[et] = 0);
    }
    function T(H, $, et, pt, V, C, gt) {
      gt === true ? i.vertexAttribIPointer(H, $, et, V, C) : i.vertexAttribPointer(H, $, et, pt, V, C);
    }
    function U(H, $, et, pt) {
      if (n.isWebGL2 === false && (H.isInstancedMesh || pt.isInstancedBufferGeometry) && t.get("ANGLE_instanced_arrays") === null) return;
      v();
      let V = pt.attributes, C = et.getAttributes(), gt = $.defaultAttributeValues;
      for (let xt in C) {
        let At = C[xt];
        if (At.location >= 0) {
          let rt = V[xt];
          if (rt === void 0 && (xt === "instanceMatrix" && H.instanceMatrix && (rt = H.instanceMatrix), xt === "instanceColor" && H.instanceColor && (rt = H.instanceColor)), rt !== void 0) {
            let yt = rt.normalized, wt = rt.itemSize, dt = e.get(rt);
            if (dt === void 0) continue;
            let ot = dt.buffer, bt = dt.type, Et = dt.bytesPerElement, O = n.isWebGL2 === true && (bt === i.INT || bt === i.UNSIGNED_INT || rt.gpuType === iu);
            if (rt.isInterleavedBufferAttribute) {
              let W = rt.data, L = W.stride, ct = rt.offset;
              if (W.isInstancedInterleavedBuffer) {
                for (let X = 0; X < At.locationSize; X++) R(At.location + X, W.meshPerAttribute);
                H.isInstancedMesh !== true && pt._maxInstanceCount === void 0 && (pt._maxInstanceCount = W.meshPerAttribute * W.count);
              } else for (let X = 0; X < At.locationSize; X++) E(At.location + X);
              i.bindBuffer(i.ARRAY_BUFFER, ot);
              for (let X = 0; X < At.locationSize; X++) T(At.location + X, wt / At.locationSize, bt, yt, L * Et, (ct + wt / At.locationSize * X) * Et, O);
            } else {
              if (rt.isInstancedBufferAttribute) {
                for (let W = 0; W < At.locationSize; W++) R(At.location + W, rt.meshPerAttribute);
                H.isInstancedMesh !== true && pt._maxInstanceCount === void 0 && (pt._maxInstanceCount = rt.meshPerAttribute * rt.count);
              } else for (let W = 0; W < At.locationSize; W++) E(At.location + W);
              i.bindBuffer(i.ARRAY_BUFFER, ot);
              for (let W = 0; W < At.locationSize; W++) T(At.location + W, wt / At.locationSize, bt, yt, wt * Et, wt / At.locationSize * W * Et, O);
            }
          } else if (gt !== void 0) {
            let yt = gt[xt];
            if (yt !== void 0) switch (yt.length) {
              case 2:
                i.vertexAttrib2fv(At.location, yt);
                break;
              case 3:
                i.vertexAttrib3fv(At.location, yt);
                break;
              case 4:
                i.vertexAttrib4fv(At.location, yt);
                break;
              default:
                i.vertexAttrib1fv(At.location, yt);
            }
          }
        }
      }
      w();
    }
    function M() {
      J();
      for (let H in o) {
        let $ = o[H];
        for (let et in $) {
          let pt = $[et];
          for (let V in pt) g(pt[V].object), delete pt[V];
          delete $[et];
        }
        delete o[H];
      }
    }
    function S(H) {
      if (o[H.id] === void 0) return;
      let $ = o[H.id];
      for (let et in $) {
        let pt = $[et];
        for (let V in pt) g(pt[V].object), delete pt[V];
        delete $[et];
      }
      delete o[H.id];
    }
    function q(H) {
      for (let $ in o) {
        let et = o[$];
        if (et[H.id] === void 0) continue;
        let pt = et[H.id];
        for (let V in pt) g(pt[V].object), delete pt[V];
        delete et[H.id];
      }
    }
    function J() {
      ht(), u = true, l !== c && (l = c, d(l.object));
    }
    function ht() {
      c.geometry = null, c.program = null, c.wireframe = false;
    }
    return { setup: h, reset: J, resetDefaultState: ht, dispose: M, releaseStatesOfGeometry: S, releaseStatesOfProgram: q, initAttributes: v, enableAttribute: E, disableUnusedAttributes: w };
  }
  function Sm(i, t, e, n) {
    let s = n.isWebGL2, r;
    function a(u) {
      r = u;
    }
    function o(u, h) {
      i.drawArrays(r, u, h), e.update(h, r, 1);
    }
    function c(u, h, f) {
      if (f === 0) return;
      let d, g;
      if (s) d = i, g = "drawArraysInstanced";
      else if (d = t.get("ANGLE_instanced_arrays"), g = "drawArraysInstancedANGLE", d === null) {
        console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
        return;
      }
      d[g](r, u, h, f), e.update(h, r, f);
    }
    function l(u, h, f) {
      if (f === 0) return;
      let d = t.get("WEBGL_multi_draw");
      if (d === null) for (let g = 0; g < f; g++) this.render(u[g], h[g]);
      else {
        d.multiDrawArraysWEBGL(r, u, 0, h, 0, f);
        let g = 0;
        for (let _ = 0; _ < f; _++) g += h[_];
        e.update(g, r, 1);
      }
    }
    this.setMode = a, this.render = o, this.renderInstances = c, this.renderMultiDraw = l;
  }
  function Em(i, t, e) {
    let n;
    function s() {
      if (n !== void 0) return n;
      if (t.has("EXT_texture_filter_anisotropic") === true) {
        let T = t.get("EXT_texture_filter_anisotropic");
        n = i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else n = 0;
      return n;
    }
    function r(T) {
      if (T === "highp") {
        if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0) return "highp";
        T = "mediump";
      }
      return T === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
    }
    let a = typeof WebGL2RenderingContext < "u" && i.constructor.name === "WebGL2RenderingContext", o = e.precision !== void 0 ? e.precision : "highp", c = r(o);
    c !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", c, "instead."), o = c);
    let l = a || t.has("WEBGL_draw_buffers"), u = e.logarithmicDepthBuffer === true, h = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), f = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), d = i.getParameter(i.MAX_TEXTURE_SIZE), g = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), _ = i.getParameter(i.MAX_VERTEX_ATTRIBS), m = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), p = i.getParameter(i.MAX_VARYING_VECTORS), x = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), v = f > 0, E = a || t.has("OES_texture_float"), R = v && E, w = a ? i.getParameter(i.MAX_SAMPLES) : 0;
    return { isWebGL2: a, drawBuffers: l, getMaxAnisotropy: s, getMaxPrecision: r, precision: o, logarithmicDepthBuffer: u, maxTextures: h, maxVertexTextures: f, maxTextureSize: d, maxCubemapSize: g, maxAttributes: _, maxVertexUniforms: m, maxVaryings: p, maxFragmentUniforms: x, vertexTextures: v, floatFragmentTextures: E, floatVertexTextures: R, maxSamples: w };
  }
  function wm(i) {
    let t = this, e = null, n = 0, s = false, r = false, a = new Qn(), o = new ue(), c = { value: null, needsUpdate: false };
    this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(h, f) {
      let d = h.length !== 0 || f || n !== 0 || s;
      return s = f, n = h.length, d;
    }, this.beginShadows = function() {
      r = true, u(null);
    }, this.endShadows = function() {
      r = false;
    }, this.setGlobalState = function(h, f) {
      e = u(h, f, 0);
    }, this.setState = function(h, f, d) {
      let g = h.clippingPlanes, _ = h.clipIntersection, m = h.clipShadows, p = i.get(h);
      if (!s || g === null || g.length === 0 || r && !m) r ? u(null) : l();
      else {
        let x = r ? 0 : n, v = x * 4, E = p.clippingState || null;
        c.value = E, E = u(g, f, v, d);
        for (let R = 0; R !== v; ++R) E[R] = e[R];
        p.clippingState = E, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += x;
      }
    };
    function l() {
      c.value !== e && (c.value = e, c.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
    }
    function u(h, f, d, g) {
      let _ = h !== null ? h.length : 0, m = null;
      if (_ !== 0) {
        if (m = c.value, g !== true || m === null) {
          let p = d + _ * 4, x = f.matrixWorldInverse;
          o.getNormalMatrix(x), (m === null || m.length < p) && (m = new Float32Array(p));
          for (let v = 0, E = d; v !== _; ++v, E += 4) a.copy(h[v]).applyMatrix4(x, o), a.normal.toArray(m, E), m[E + 3] = a.constant;
        }
        c.value = m, c.needsUpdate = true;
      }
      return t.numPlanes = _, t.numIntersection = 0, m;
    }
  }
  function Tm(i) {
    let t = /* @__PURE__ */ new WeakMap();
    function e(a, o) {
      return o === Ka ? a.mapping = Ls : o === ja && (a.mapping = Is), a;
    }
    function n(a) {
      if (a && a.isTexture) {
        let o = a.mapping;
        if (o === Ka || o === ja) if (t.has(a)) {
          let c = t.get(a).texture;
          return e(c, a.mapping);
        } else {
          let c = a.image;
          if (c && c.height > 0) {
            let l = new ac(c.height / 2);
            return l.fromEquirectangularTexture(i, a), t.set(a, l), a.addEventListener("dispose", s), e(l.texture, a.mapping);
          } else return null;
        }
      }
      return a;
    }
    function s(a) {
      let o = a.target;
      o.removeEventListener("dispose", s);
      let c = t.get(o);
      c !== void 0 && (t.delete(o), c.dispose());
    }
    function r() {
      t = /* @__PURE__ */ new WeakMap();
    }
    return { get: n, dispose: r };
  }
  var Os = class extends To {
    constructor(t = -1, e = 1, n = 1, s = -1, r = 0.1, a = 2e3) {
      super(), this.isOrthographicCamera = true, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = s, this.near = r, this.far = a, this.updateProjectionMatrix();
    }
    copy(t, e) {
      return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
    }
    setViewOffset(t, e, n, s, r, a) {
      this.view === null && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      let t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, s = (this.top + this.bottom) / 2, r = n - t, a = n + t, o = s + e, c = s - e;
      if (this.view !== null && this.view.enabled) {
        let l = (this.right - this.left) / this.view.fullWidth / this.zoom, u = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        r += l * this.view.offsetX, a = r + l * this.view.width, o -= u * this.view.offsetY, c = o - u * this.view.height;
      }
      this.projectionMatrix.makeOrthographic(r, a, o, c, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
    }
  }, Ts = 4, vh = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], ki = 20, Ha = new Os(), yh = new Xt(), Ga = null, Va = 0, Wa = 0, zi = (1 + Math.sqrt(5)) / 2, ys = 1 / zi, Mh = [new Y(1, 1, 1), new Y(-1, 1, 1), new Y(1, 1, -1), new Y(-1, 1, -1), new Y(0, zi, ys), new Y(0, zi, -ys), new Y(ys, 0, zi), new Y(-ys, 0, zi), new Y(zi, ys, 0), new Y(-zi, ys, 0)], Fs = class {
    constructor(t) {
      this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
    }
    fromScene(t, e = 0, n = 0.1, s = 100) {
      Ga = this._renderer.getRenderTarget(), Va = this._renderer.getActiveCubeFace(), Wa = this._renderer.getActiveMipmapLevel(), this._setSize(256);
      let r = this._allocateTargets();
      return r.depthBuffer = true, this._sceneToCubeUV(t, n, s, r), e > 0 && this._blur(r, 0, 0, e), this._applyPMREM(r), this._cleanup(r), r;
    }
    fromEquirectangular(t, e = null) {
      return this._fromTexture(t, e);
    }
    fromCubemap(t, e = null) {
      return this._fromTexture(t, e);
    }
    compileCubemapShader() {
      this._cubemapMaterial === null && (this._cubemapMaterial = Eh(), this._compileMaterial(this._cubemapMaterial));
    }
    compileEquirectangularShader() {
      this._equirectMaterial === null && (this._equirectMaterial = Sh(), this._compileMaterial(this._equirectMaterial));
    }
    dispose() {
      this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
    }
    _setSize(t) {
      this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
    }
    _dispose() {
      this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
      for (let t = 0; t < this._lodPlanes.length; t++) this._lodPlanes[t].dispose();
    }
    _cleanup(t) {
      this._renderer.setRenderTarget(Ga, Va, Wa), t.scissorTest = false, no(t, 0, 0, t.width, t.height);
    }
    _fromTexture(t, e) {
      t.mapping === Ls || t.mapping === Is ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), Ga = this._renderer.getRenderTarget(), Va = this._renderer.getActiveCubeFace(), Wa = this._renderer.getActiveMipmapLevel();
      let n = e || this._allocateTargets();
      return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
    }
    _allocateTargets() {
      let t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = { magFilter: yn, minFilter: yn, generateMipmaps: false, type: mn, format: Ln, colorSpace: ii, depthBuffer: false }, s = bh(t, e, n);
      if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
        this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = bh(t, e, n);
        let { _lodMax: r } = this;
        ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Am(r)), this._blurMaterial = Rm(r, t, e);
      }
      return s;
    }
    _compileMaterial(t) {
      let e = new zt(this._lodPlanes[0], t);
      this._renderer.compile(e, Ha);
    }
    _sceneToCubeUV(t, e, n, s) {
      let o = new nn(90, 1, e, n), c = [1, -1, 1, 1, 1, 1], l = [1, 1, 1, -1, -1, -1], u = this._renderer, h = u.autoClear, f = u.toneMapping;
      u.getClearColor(yh), u.toneMapping = mi, u.autoClear = false;
      let d = new se({ name: "PMREM.Background", side: Ze, depthWrite: false, depthTest: false }), g = new zt(new qi(), d), _ = false, m = t.background;
      m ? m.isColor && (d.color.copy(m), t.background = null, _ = true) : (d.color.copy(yh), _ = true);
      for (let p = 0; p < 6; p++) {
        let x = p % 3;
        x === 0 ? (o.up.set(0, c[p], 0), o.lookAt(l[p], 0, 0)) : x === 1 ? (o.up.set(0, 0, c[p]), o.lookAt(0, l[p], 0)) : (o.up.set(0, c[p], 0), o.lookAt(0, 0, l[p]));
        let v = this._cubeSize;
        no(s, x * v, p > 2 ? v : 0, v, v), u.setRenderTarget(s), _ && u.render(g, o), u.render(t, o);
      }
      g.geometry.dispose(), g.material.dispose(), u.toneMapping = f, u.autoClear = h, t.background = m;
    }
    _textureToCubeUV(t, e) {
      let n = this._renderer, s = t.mapping === Ls || t.mapping === Is;
      s ? (this._cubemapMaterial === null && (this._cubemapMaterial = Eh()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === false ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Sh());
      let r = s ? this._cubemapMaterial : this._equirectMaterial, a = new zt(this._lodPlanes[0], r), o = r.uniforms;
      o.envMap.value = t;
      let c = this._cubeSize;
      no(e, 0, 0, 3 * c, 2 * c), n.setRenderTarget(e), n.render(a, Ha);
    }
    _applyPMREM(t) {
      let e = this._renderer, n = e.autoClear;
      e.autoClear = false;
      for (let s = 1; s < this._lodPlanes.length; s++) {
        let r = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), a = Mh[(s - 1) % Mh.length];
        this._blur(t, s - 1, s, r, a);
      }
      e.autoClear = n;
    }
    _blur(t, e, n, s, r) {
      let a = this._pingPongRenderTarget;
      this._halfBlur(t, a, e, n, s, "latitudinal", r), this._halfBlur(a, t, n, n, s, "longitudinal", r);
    }
    _halfBlur(t, e, n, s, r, a, o) {
      let c = this._renderer, l = this._blurMaterial;
      a !== "latitudinal" && a !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
      let u = 3, h = new zt(this._lodPlanes[s], l), f = l.uniforms, d = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * d) : 2 * Math.PI / (2 * ki - 1), _ = r / g, m = isFinite(r) ? 1 + Math.floor(u * _) : ki;
      m > ki && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ki}`);
      let p = [], x = 0;
      for (let T = 0; T < ki; ++T) {
        let U = T / _, M = Math.exp(-U * U / 2);
        p.push(M), T === 0 ? x += M : T < m && (x += 2 * M);
      }
      for (let T = 0; T < p.length; T++) p[T] = p[T] / x;
      f.envMap.value = t.texture, f.samples.value = m, f.weights.value = p, f.latitudinal.value = a === "latitudinal", o && (f.poleAxis.value = o);
      let { _lodMax: v } = this;
      f.dTheta.value = g, f.mipInt.value = v - n;
      let E = this._sizeLods[s], R = 3 * E * (s > v - Ts ? s - v + Ts : 0), w = 4 * (this._cubeSize - E);
      no(e, R, w, 3 * E, 2 * E), c.setRenderTarget(e), c.render(h, Ha);
    }
  };
  function Am(i) {
    let t = [], e = [], n = [], s = i, r = i - Ts + 1 + vh.length;
    for (let a = 0; a < r; a++) {
      let o = Math.pow(2, s);
      e.push(o);
      let c = 1 / o;
      a > i - Ts ? c = vh[a - i + Ts - 1] : a === 0 && (c = 0), n.push(c);
      let l = 1 / (o - 2), u = -l, h = 1 + l, f = [u, u, h, u, h, h, u, u, h, h, u, h], d = 6, g = 6, _ = 3, m = 2, p = 1, x = new Float32Array(_ * g * d), v = new Float32Array(m * g * d), E = new Float32Array(p * g * d);
      for (let w = 0; w < d; w++) {
        let T = w % 3 * 2 / 3 - 1, U = w > 2 ? 0 : -1, M = [T, U, 0, T + 2 / 3, U, 0, T + 2 / 3, U + 1, 0, T, U, 0, T + 2 / 3, U + 1, 0, T, U + 1, 0];
        x.set(M, _ * g * w), v.set(f, m * g * w);
        let S = [w, w, w, w, w, w];
        E.set(S, p * g * w);
      }
      let R = new we();
      R.setAttribute("position", new xe(x, _)), R.setAttribute("uv", new xe(v, m)), R.setAttribute("faceIndex", new xe(E, p)), t.push(R), s > Ts && s--;
    }
    return { lodPlanes: t, sizeLods: e, sigmas: n };
  }
  function bh(i, t, e) {
    let n = new Je(i, t, e);
    return n.texture.mapping = ko, n.texture.name = "PMREM.cubeUv", n.scissorTest = true, n;
  }
  function no(i, t, e, n, s) {
    i.viewport.set(t, e, n, s), i.scissor.set(t, e, n, s);
  }
  function Rm(i, t, e) {
    let n = new Float32Array(ki), s = new Y(0, 1, 0);
    return new Te({ name: "SphericalGaussianBlur", defines: { n: ki, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / e, CUBEUV_MAX_MIP: `${i}.0` }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: n }, latitudinal: { value: false }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: s } }, vertexShader: Xc(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`, blending: Hn, depthTest: false, depthWrite: false });
  }
  function Sh() {
    return new Te({ name: "EquirectangularToCubeUV", uniforms: { envMap: { value: null } }, vertexShader: Xc(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`, blending: Hn, depthTest: false, depthWrite: false });
  }
  function Eh() {
    return new Te({ name: "CubemapToCubeUV", uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: Xc(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`, blending: Hn, depthTest: false, depthWrite: false });
  }
  function Xc() {
    return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
  }
  function Cm(i) {
    let t = /* @__PURE__ */ new WeakMap(), e = null;
    function n(o) {
      if (o && o.isTexture) {
        let c = o.mapping, l = c === Ka || c === ja, u = c === Ls || c === Is;
        if (l || u) if (o.isRenderTargetTexture && o.needsPMREMUpdate === true) {
          o.needsPMREMUpdate = false;
          let h = t.get(o);
          return e === null && (e = new Fs(i)), h = l ? e.fromEquirectangular(o, h) : e.fromCubemap(o, h), t.set(o, h), h.texture;
        } else {
          if (t.has(o)) return t.get(o).texture;
          {
            let h = o.image;
            if (l && h && h.height > 0 || u && h && s(h)) {
              e === null && (e = new Fs(i));
              let f = l ? e.fromEquirectangular(o) : e.fromCubemap(o);
              return t.set(o, f), o.addEventListener("dispose", r), f.texture;
            } else return null;
          }
        }
      }
      return o;
    }
    function s(o) {
      let c = 0, l = 6;
      for (let u = 0; u < l; u++) o[u] !== void 0 && c++;
      return c === l;
    }
    function r(o) {
      let c = o.target;
      c.removeEventListener("dispose", r);
      let l = t.get(c);
      l !== void 0 && (t.delete(c), l.dispose());
    }
    function a() {
      t = /* @__PURE__ */ new WeakMap(), e !== null && (e.dispose(), e = null);
    }
    return { get: n, dispose: a };
  }
  function Pm(i) {
    let t = {};
    function e(n) {
      if (t[n] !== void 0) return t[n];
      let s;
      switch (n) {
        case "WEBGL_depth_texture":
          s = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
          break;
        case "EXT_texture_filter_anisotropic":
          s = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
          break;
        case "WEBGL_compressed_texture_s3tc":
          s = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
          break;
        case "WEBGL_compressed_texture_pvrtc":
          s = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
          break;
        default:
          s = i.getExtension(n);
      }
      return t[n] = s, s;
    }
    return { has: function(n) {
      return e(n) !== null;
    }, init: function(n) {
      n.isWebGL2 ? (e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance")) : (e("WEBGL_depth_texture"), e("OES_texture_float"), e("OES_texture_half_float"), e("OES_texture_half_float_linear"), e("OES_standard_derivatives"), e("OES_element_index_uint"), e("OES_vertex_array_object"), e("ANGLE_instanced_arrays")), e("OES_texture_float_linear"), e("EXT_color_buffer_half_float"), e("WEBGL_multisampled_render_to_texture");
    }, get: function(n) {
      let s = e(n);
      return s === null && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), s;
    } };
  }
  function Lm(i, t, e, n) {
    let s = {}, r = /* @__PURE__ */ new WeakMap();
    function a(h) {
      let f = h.target;
      f.index !== null && t.remove(f.index);
      for (let g in f.attributes) t.remove(f.attributes[g]);
      for (let g in f.morphAttributes) {
        let _ = f.morphAttributes[g];
        for (let m = 0, p = _.length; m < p; m++) t.remove(_[m]);
      }
      f.removeEventListener("dispose", a), delete s[f.id];
      let d = r.get(f);
      d && (t.remove(d), r.delete(f)), n.releaseStatesOfGeometry(f), f.isInstancedBufferGeometry === true && delete f._maxInstanceCount, e.memory.geometries--;
    }
    function o(h, f) {
      return s[f.id] === true || (f.addEventListener("dispose", a), s[f.id] = true, e.memory.geometries++), f;
    }
    function c(h) {
      let f = h.attributes;
      for (let g in f) t.update(f[g], i.ARRAY_BUFFER);
      let d = h.morphAttributes;
      for (let g in d) {
        let _ = d[g];
        for (let m = 0, p = _.length; m < p; m++) t.update(_[m], i.ARRAY_BUFFER);
      }
    }
    function l(h) {
      let f = [], d = h.index, g = h.attributes.position, _ = 0;
      if (d !== null) {
        let x = d.array;
        _ = d.version;
        for (let v = 0, E = x.length; v < E; v += 3) {
          let R = x[v + 0], w = x[v + 1], T = x[v + 2];
          f.push(R, w, w, T, T, R);
        }
      } else if (g !== void 0) {
        let x = g.array;
        _ = g.version;
        for (let v = 0, E = x.length / 3 - 1; v < E; v += 3) {
          let R = v + 0, w = v + 1, T = v + 2;
          f.push(R, w, w, T, T, R);
        }
      } else return;
      let m = new (du(f) ? wo : Eo)(f, 1);
      m.version = _;
      let p = r.get(h);
      p && t.remove(p), r.set(h, m);
    }
    function u(h) {
      let f = r.get(h);
      if (f) {
        let d = h.index;
        d !== null && f.version < d.version && l(h);
      } else l(h);
      return r.get(h);
    }
    return { get: o, update: c, getWireframeAttribute: u };
  }
  function Im(i, t, e, n) {
    let s = n.isWebGL2, r;
    function a(d) {
      r = d;
    }
    let o, c;
    function l(d) {
      o = d.type, c = d.bytesPerElement;
    }
    function u(d, g) {
      i.drawElements(r, g, o, d * c), e.update(g, r, 1);
    }
    function h(d, g, _) {
      if (_ === 0) return;
      let m, p;
      if (s) m = i, p = "drawElementsInstanced";
      else if (m = t.get("ANGLE_instanced_arrays"), p = "drawElementsInstancedANGLE", m === null) {
        console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
        return;
      }
      m[p](r, g, o, d * c, _), e.update(g, r, _);
    }
    function f(d, g, _) {
      if (_ === 0) return;
      let m = t.get("WEBGL_multi_draw");
      if (m === null) for (let p = 0; p < _; p++) this.render(d[p] / c, g[p]);
      else {
        m.multiDrawElementsWEBGL(r, g, 0, o, d, 0, _);
        let p = 0;
        for (let x = 0; x < _; x++) p += g[x];
        e.update(p, r, 1);
      }
    }
    this.setMode = a, this.setIndex = l, this.render = u, this.renderInstances = h, this.renderMultiDraw = f;
  }
  function Um(i) {
    let t = { geometries: 0, textures: 0 }, e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
    function n(r, a, o) {
      switch (e.calls++, a) {
        case i.TRIANGLES:
          e.triangles += o * (r / 3);
          break;
        case i.LINES:
          e.lines += o * (r / 2);
          break;
        case i.LINE_STRIP:
          e.lines += o * (r - 1);
          break;
        case i.LINE_LOOP:
          e.lines += o * r;
          break;
        case i.POINTS:
          e.points += o * r;
          break;
        default:
          console.error("THREE.WebGLInfo: Unknown draw mode:", a);
          break;
      }
    }
    function s() {
      e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
    }
    return { memory: t, render: e, programs: null, autoReset: true, reset: s, update: n };
  }
  function Dm(i, t) {
    return i[0] - t[0];
  }
  function Nm(i, t) {
    return Math.abs(t[1]) - Math.abs(i[1]);
  }
  function Om(i, t, e) {
    let n = {}, s = new Float32Array(8), r = /* @__PURE__ */ new WeakMap(), a = new Pe(), o = [];
    for (let l = 0; l < 8; l++) o[l] = [l, 0];
    function c(l, u, h) {
      let f = l.morphTargetInfluences;
      if (t.isWebGL2 === true) {
        let d = u.morphAttributes.position || u.morphAttributes.normal || u.morphAttributes.color, g = d !== void 0 ? d.length : 0, _ = r.get(u);
        if (_ === void 0 || _.count !== g) {
          let H = function() {
            J.dispose(), r.delete(u), u.removeEventListener("dispose", H);
          };
          _ !== void 0 && _.texture.dispose();
          let x = u.morphAttributes.position !== void 0, v = u.morphAttributes.normal !== void 0, E = u.morphAttributes.color !== void 0, R = u.morphAttributes.position || [], w = u.morphAttributes.normal || [], T = u.morphAttributes.color || [], U = 0;
          x === true && (U = 1), v === true && (U = 2), E === true && (U = 3);
          let M = u.attributes.position.count * U, S = 1;
          M > t.maxTextureSize && (S = Math.ceil(M / t.maxTextureSize), M = t.maxTextureSize);
          let q = new Float32Array(M * S * 4 * g), J = new So(q, M, S, g);
          J.type = di, J.needsUpdate = true;
          let ht = U * 4;
          for (let $ = 0; $ < g; $++) {
            let et = R[$], pt = w[$], V = T[$], C = M * S * 4 * $;
            for (let gt = 0; gt < et.count; gt++) {
              let xt = gt * ht;
              x === true && (a.fromBufferAttribute(et, gt), q[C + xt + 0] = a.x, q[C + xt + 1] = a.y, q[C + xt + 2] = a.z, q[C + xt + 3] = 0), v === true && (a.fromBufferAttribute(pt, gt), q[C + xt + 4] = a.x, q[C + xt + 5] = a.y, q[C + xt + 6] = a.z, q[C + xt + 7] = 0), E === true && (a.fromBufferAttribute(V, gt), q[C + xt + 8] = a.x, q[C + xt + 9] = a.y, q[C + xt + 10] = a.z, q[C + xt + 11] = V.itemSize === 4 ? a.w : 1);
            }
          }
          _ = { count: g, texture: J, size: new Bt(M, S) }, r.set(u, _), u.addEventListener("dispose", H);
        }
        let m = 0;
        for (let x = 0; x < f.length; x++) m += f[x];
        let p = u.morphTargetsRelative ? 1 : 1 - m;
        h.getUniforms().setValue(i, "morphTargetBaseInfluence", p), h.getUniforms().setValue(i, "morphTargetInfluences", f), h.getUniforms().setValue(i, "morphTargetsTexture", _.texture, e), h.getUniforms().setValue(i, "morphTargetsTextureSize", _.size);
      } else {
        let d = f === void 0 ? 0 : f.length, g = n[u.id];
        if (g === void 0 || g.length !== d) {
          g = [];
          for (let v = 0; v < d; v++) g[v] = [v, 0];
          n[u.id] = g;
        }
        for (let v = 0; v < d; v++) {
          let E = g[v];
          E[0] = v, E[1] = f[v];
        }
        g.sort(Nm);
        for (let v = 0; v < 8; v++) v < d && g[v][1] ? (o[v][0] = g[v][0], o[v][1] = g[v][1]) : (o[v][0] = Number.MAX_SAFE_INTEGER, o[v][1] = 0);
        o.sort(Dm);
        let _ = u.morphAttributes.position, m = u.morphAttributes.normal, p = 0;
        for (let v = 0; v < 8; v++) {
          let E = o[v], R = E[0], w = E[1];
          R !== Number.MAX_SAFE_INTEGER && w ? (_ && u.getAttribute("morphTarget" + v) !== _[R] && u.setAttribute("morphTarget" + v, _[R]), m && u.getAttribute("morphNormal" + v) !== m[R] && u.setAttribute("morphNormal" + v, m[R]), s[v] = w, p += w) : (_ && u.hasAttribute("morphTarget" + v) === true && u.deleteAttribute("morphTarget" + v), m && u.hasAttribute("morphNormal" + v) === true && u.deleteAttribute("morphNormal" + v), s[v] = 0);
        }
        let x = u.morphTargetsRelative ? 1 : 1 - p;
        h.getUniforms().setValue(i, "morphTargetBaseInfluence", x), h.getUniforms().setValue(i, "morphTargetInfluences", s);
      }
    }
    return { update: c };
  }
  function Fm(i, t, e, n) {
    let s = /* @__PURE__ */ new WeakMap();
    function r(c) {
      let l = n.render.frame, u = c.geometry, h = t.get(c, u);
      if (s.get(h) !== l && (t.update(h), s.set(h, l)), c.isInstancedMesh && (c.hasEventListener("dispose", o) === false && c.addEventListener("dispose", o), s.get(c) !== l && (e.update(c.instanceMatrix, i.ARRAY_BUFFER), c.instanceColor !== null && e.update(c.instanceColor, i.ARRAY_BUFFER), s.set(c, l))), c.isSkinnedMesh) {
        let f = c.skeleton;
        s.get(f) !== l && (f.update(), s.set(f, l));
      }
      return h;
    }
    function a() {
      s = /* @__PURE__ */ new WeakMap();
    }
    function o(c) {
      let l = c.target;
      l.removeEventListener("dispose", o), e.remove(l.instanceMatrix), l.instanceColor !== null && e.remove(l.instanceColor);
    }
    return { update: r, dispose: a };
  }
  var Ro = class extends Sn {
    constructor(t, e, n, s, r, a, o, c, l, u) {
      if (u = u !== void 0 ? u : Vi, u !== Vi && u !== Us) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
      n === void 0 && u === Vi && (n = fi), n === void 0 && u === Us && (n = Gi), super(null, s, r, a, o, c, u, n, l), this.isDepthTexture = true, this.image = { width: t, height: e }, this.magFilter = o !== void 0 ? o : an, this.minFilter = c !== void 0 ? c : an, this.flipY = false, this.generateMipmaps = false, this.compareFunction = null;
    }
    copy(t) {
      return super.copy(t), this.compareFunction = t.compareFunction, this;
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
    }
  }, xu = new Sn(), _u = new Ro(1, 1);
  _u.compareFunction = fu;
  var vu = new So(), yu = new rc(), Mu = new Ao(), wh = [], Th = [], Ah = new Float32Array(16), Rh = new Float32Array(9), Ch = new Float32Array(4);
  function ks(i, t, e) {
    let n = i[0];
    if (n <= 0 || n > 0) return i;
    let s = t * e, r = wh[s];
    if (r === void 0 && (r = new Float32Array(s), wh[s] = r), t !== 0) {
      n.toArray(r, 0);
      for (let a = 1, o = 0; a !== t; ++a) o += e, i[a].toArray(r, o);
    }
    return r;
  }
  function Ge(i, t) {
    if (i.length !== t.length) return false;
    for (let e = 0, n = i.length; e < n; e++) if (i[e] !== t[e]) return false;
    return true;
  }
  function Ve(i, t) {
    for (let e = 0, n = t.length; e < n; e++) i[e] = t[e];
  }
  function Go(i, t) {
    let e = Th[t];
    e === void 0 && (e = new Int32Array(t), Th[t] = e);
    for (let n = 0; n !== t; ++n) e[n] = i.allocateTextureUnit();
    return e;
  }
  function zm(i, t) {
    let e = this.cache;
    e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
  }
  function Bm(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
    else {
      if (Ge(e, t)) return;
      i.uniform2fv(this.addr, t), Ve(e, t);
    }
  }
  function km(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
    else if (t.r !== void 0) (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
    else {
      if (Ge(e, t)) return;
      i.uniform3fv(this.addr, t), Ve(e, t);
    }
  }
  function Hm(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
    else {
      if (Ge(e, t)) return;
      i.uniform4fv(this.addr, t), Ve(e, t);
    }
  }
  function Gm(i, t) {
    let e = this.cache, n = t.elements;
    if (n === void 0) {
      if (Ge(e, t)) return;
      i.uniformMatrix2fv(this.addr, false, t), Ve(e, t);
    } else {
      if (Ge(e, n)) return;
      Ch.set(n), i.uniformMatrix2fv(this.addr, false, Ch), Ve(e, n);
    }
  }
  function Vm(i, t) {
    let e = this.cache, n = t.elements;
    if (n === void 0) {
      if (Ge(e, t)) return;
      i.uniformMatrix3fv(this.addr, false, t), Ve(e, t);
    } else {
      if (Ge(e, n)) return;
      Rh.set(n), i.uniformMatrix3fv(this.addr, false, Rh), Ve(e, n);
    }
  }
  function Wm(i, t) {
    let e = this.cache, n = t.elements;
    if (n === void 0) {
      if (Ge(e, t)) return;
      i.uniformMatrix4fv(this.addr, false, t), Ve(e, t);
    } else {
      if (Ge(e, n)) return;
      Ah.set(n), i.uniformMatrix4fv(this.addr, false, Ah), Ve(e, n);
    }
  }
  function Xm(i, t) {
    let e = this.cache;
    e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
  }
  function qm(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
    else {
      if (Ge(e, t)) return;
      i.uniform2iv(this.addr, t), Ve(e, t);
    }
  }
  function Ym(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
    else {
      if (Ge(e, t)) return;
      i.uniform3iv(this.addr, t), Ve(e, t);
    }
  }
  function Zm(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
    else {
      if (Ge(e, t)) return;
      i.uniform4iv(this.addr, t), Ve(e, t);
    }
  }
  function Jm(i, t) {
    let e = this.cache;
    e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
  }
  function $m(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
    else {
      if (Ge(e, t)) return;
      i.uniform2uiv(this.addr, t), Ve(e, t);
    }
  }
  function Km(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
    else {
      if (Ge(e, t)) return;
      i.uniform3uiv(this.addr, t), Ve(e, t);
    }
  }
  function jm(i, t) {
    let e = this.cache;
    if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
    else {
      if (Ge(e, t)) return;
      i.uniform4uiv(this.addr, t), Ve(e, t);
    }
  }
  function Qm(i, t, e) {
    let n = this.cache, s = e.allocateTextureUnit();
    n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
    let r = this.type === i.SAMPLER_2D_SHADOW ? _u : xu;
    e.setTexture2D(t || r, s);
  }
  function tg(i, t, e) {
    let n = this.cache, s = e.allocateTextureUnit();
    n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture3D(t || yu, s);
  }
  function eg(i, t, e) {
    let n = this.cache, s = e.allocateTextureUnit();
    n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTextureCube(t || Mu, s);
  }
  function ng(i, t, e) {
    let n = this.cache, s = e.allocateTextureUnit();
    n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture2DArray(t || vu, s);
  }
  function ig(i) {
    switch (i) {
      case 5126:
        return zm;
      case 35664:
        return Bm;
      case 35665:
        return km;
      case 35666:
        return Hm;
      case 35674:
        return Gm;
      case 35675:
        return Vm;
      case 35676:
        return Wm;
      case 5124:
      case 35670:
        return Xm;
      case 35667:
      case 35671:
        return qm;
      case 35668:
      case 35672:
        return Ym;
      case 35669:
      case 35673:
        return Zm;
      case 5125:
        return Jm;
      case 36294:
        return $m;
      case 36295:
        return Km;
      case 36296:
        return jm;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return Qm;
      case 35679:
      case 36299:
      case 36307:
        return tg;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return eg;
      case 36289:
      case 36303:
      case 36311:
      case 36292:
        return ng;
    }
  }
  function sg(i, t) {
    i.uniform1fv(this.addr, t);
  }
  function rg(i, t) {
    let e = ks(t, this.size, 2);
    i.uniform2fv(this.addr, e);
  }
  function og(i, t) {
    let e = ks(t, this.size, 3);
    i.uniform3fv(this.addr, e);
  }
  function ag(i, t) {
    let e = ks(t, this.size, 4);
    i.uniform4fv(this.addr, e);
  }
  function cg(i, t) {
    let e = ks(t, this.size, 4);
    i.uniformMatrix2fv(this.addr, false, e);
  }
  function lg(i, t) {
    let e = ks(t, this.size, 9);
    i.uniformMatrix3fv(this.addr, false, e);
  }
  function hg(i, t) {
    let e = ks(t, this.size, 16);
    i.uniformMatrix4fv(this.addr, false, e);
  }
  function ug(i, t) {
    i.uniform1iv(this.addr, t);
  }
  function fg(i, t) {
    i.uniform2iv(this.addr, t);
  }
  function dg(i, t) {
    i.uniform3iv(this.addr, t);
  }
  function pg(i, t) {
    i.uniform4iv(this.addr, t);
  }
  function mg(i, t) {
    i.uniform1uiv(this.addr, t);
  }
  function gg(i, t) {
    i.uniform2uiv(this.addr, t);
  }
  function xg(i, t) {
    i.uniform3uiv(this.addr, t);
  }
  function _g(i, t) {
    i.uniform4uiv(this.addr, t);
  }
  function vg(i, t, e) {
    let n = this.cache, s = t.length, r = Go(e, s);
    Ge(n, r) || (i.uniform1iv(this.addr, r), Ve(n, r));
    for (let a = 0; a !== s; ++a) e.setTexture2D(t[a] || xu, r[a]);
  }
  function yg(i, t, e) {
    let n = this.cache, s = t.length, r = Go(e, s);
    Ge(n, r) || (i.uniform1iv(this.addr, r), Ve(n, r));
    for (let a = 0; a !== s; ++a) e.setTexture3D(t[a] || yu, r[a]);
  }
  function Mg(i, t, e) {
    let n = this.cache, s = t.length, r = Go(e, s);
    Ge(n, r) || (i.uniform1iv(this.addr, r), Ve(n, r));
    for (let a = 0; a !== s; ++a) e.setTextureCube(t[a] || Mu, r[a]);
  }
  function bg(i, t, e) {
    let n = this.cache, s = t.length, r = Go(e, s);
    Ge(n, r) || (i.uniform1iv(this.addr, r), Ve(n, r));
    for (let a = 0; a !== s; ++a) e.setTexture2DArray(t[a] || vu, r[a]);
  }
  function Sg(i) {
    switch (i) {
      case 5126:
        return sg;
      case 35664:
        return rg;
      case 35665:
        return og;
      case 35666:
        return ag;
      case 35674:
        return cg;
      case 35675:
        return lg;
      case 35676:
        return hg;
      case 5124:
      case 35670:
        return ug;
      case 35667:
      case 35671:
        return fg;
      case 35668:
      case 35672:
        return dg;
      case 35669:
      case 35673:
        return pg;
      case 5125:
        return mg;
      case 36294:
        return gg;
      case 36295:
        return xg;
      case 36296:
        return _g;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return vg;
      case 35679:
      case 36299:
      case 36307:
        return yg;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return Mg;
      case 36289:
      case 36303:
      case 36311:
      case 36292:
        return bg;
    }
  }
  var cc = class {
    constructor(t, e, n) {
      this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = ig(e.type);
    }
  }, lc = class {
    constructor(t, e, n) {
      this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = Sg(e.type);
    }
  }, hc = class {
    constructor(t) {
      this.id = t, this.seq = [], this.map = {};
    }
    setValue(t, e, n) {
      let s = this.seq;
      for (let r = 0, a = s.length; r !== a; ++r) {
        let o = s[r];
        o.setValue(t, e[o.id], n);
      }
    }
  }, Xa = /(\w+)(\])?(\[|\.)?/g;
  function Ph(i, t) {
    i.seq.push(t), i.map[t.id] = t;
  }
  function Eg(i, t, e) {
    let n = i.name, s = n.length;
    for (Xa.lastIndex = 0; ; ) {
      let r = Xa.exec(n), a = Xa.lastIndex, o = r[1], c = r[2] === "]", l = r[3];
      if (c && (o = o | 0), l === void 0 || l === "[" && a + 2 === s) {
        Ph(e, l === void 0 ? new cc(o, i, t) : new lc(o, i, t));
        break;
      } else {
        let h = e.map[o];
        h === void 0 && (h = new hc(o), Ph(e, h)), e = h;
      }
    }
  }
  var Ps = class {
    constructor(t, e) {
      this.seq = [], this.map = {};
      let n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
      for (let s = 0; s < n; ++s) {
        let r = t.getActiveUniform(e, s), a = t.getUniformLocation(e, r.name);
        Eg(r, a, this);
      }
    }
    setValue(t, e, n, s) {
      let r = this.map[e];
      r !== void 0 && r.setValue(t, n, s);
    }
    setOptional(t, e, n) {
      let s = e[n];
      s !== void 0 && this.setValue(t, n, s);
    }
    static upload(t, e, n, s) {
      for (let r = 0, a = e.length; r !== a; ++r) {
        let o = e[r], c = n[o.id];
        c.needsUpdate !== false && o.setValue(t, c.value, s);
      }
    }
    static seqWithValue(t, e) {
      let n = [];
      for (let s = 0, r = t.length; s !== r; ++s) {
        let a = t[s];
        a.id in e && n.push(a);
      }
      return n;
    }
  };
  function Lh(i, t, e) {
    let n = i.createShader(t);
    return i.shaderSource(n, e), i.compileShader(n), n;
  }
  var wg = 37297, Tg = 0;
  function Ag(i, t) {
    let e = i.split(`
`), n = [], s = Math.max(t - 6, 0), r = Math.min(t + 6, e.length);
    for (let a = s; a < r; a++) {
      let o = a + 1;
      n.push(`${o === t ? ">" : " "} ${o}: ${e[a]}`);
    }
    return n.join(`
`);
  }
  function Rg(i) {
    let t = ge.getPrimaries(ge.workingColorSpace), e = ge.getPrimaries(i), n;
    switch (t === e ? n = "" : t === _o && e === xo ? n = "LinearDisplayP3ToLinearSRGB" : t === xo && e === _o && (n = "LinearSRGBToLinearDisplayP3"), i) {
      case ii:
      case Ho:
        return [n, "LinearTransferOETF"];
      case Se:
      case Wc:
        return [n, "sRGBTransferOETF"];
      default:
        return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"];
    }
  }
  function Ih(i, t, e) {
    let n = i.getShaderParameter(t, i.COMPILE_STATUS), s = i.getShaderInfoLog(t).trim();
    if (n && s === "") return "";
    let r = /ERROR: 0:(\d+)/.exec(s);
    if (r) {
      let a = parseInt(r[1]);
      return e.toUpperCase() + `

` + s + `

` + Ag(i.getShaderSource(t), a);
    } else return s;
  }
  function Cg(i, t) {
    let e = Rg(t);
    return `vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`;
  }
  function Pg(i, t) {
    let e;
    switch (t) {
      case Bc:
        e = "Linear";
        break;
      case kc:
        e = "Reinhard";
        break;
      case Hc:
        e = "OptimizedCineon";
        break;
      case yr:
        e = "ACESFilmic";
        break;
      case Gc:
        e = "AgX";
        break;
      case td:
        e = "Custom";
        break;
      default:
        console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
    }
    return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
  }
  function Lg(i) {
    return [i.extensionDerivatives || i.envMapCubeUVHeight || i.bumpMap || i.normalMapTangentSpace || i.clearcoatNormalMap || i.flatShading || i.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "", (i.extensionFragDepth || i.logarithmicDepthBuffer) && i.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", i.extensionDrawBuffers && i.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (i.extensionShaderTextureLOD || i.envMap || i.transmission) && i.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(As).join(`
`);
  }
  function Ig(i) {
    return [i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : ""].filter(As).join(`
`);
  }
  function Ug(i) {
    let t = [];
    for (let e in i) {
      let n = i[e];
      n !== false && t.push("#define " + e + " " + n);
    }
    return t.join(`
`);
  }
  function Dg(i, t) {
    let e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
    for (let s = 0; s < n; s++) {
      let r = i.getActiveAttrib(t, s), a = r.name, o = 1;
      r.type === i.FLOAT_MAT2 && (o = 2), r.type === i.FLOAT_MAT3 && (o = 3), r.type === i.FLOAT_MAT4 && (o = 4), e[a] = { type: r.type, location: i.getAttribLocation(t, a), locationSize: o };
    }
    return e;
  }
  function As(i) {
    return i !== "";
  }
  function Uh(i, t) {
    let e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
    return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
  }
  function Dh(i, t) {
    return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
  }
  var Ng = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function uc(i) {
    return i.replace(Ng, Fg);
  }
  var Og = /* @__PURE__ */ new Map([["encodings_fragment", "colorspace_fragment"], ["encodings_pars_fragment", "colorspace_pars_fragment"], ["output_fragment", "opaque_fragment"]]);
  function Fg(i, t) {
    let e = oe[t];
    if (e === void 0) {
      let n = Og.get(t);
      if (n !== void 0) e = oe[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
      else throw new Error("Can not resolve #include <" + t + ">");
    }
    return uc(e);
  }
  var zg = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function Nh(i) {
    return i.replace(zg, Bg);
  }
  function Bg(i, t, e, n) {
    let s = "";
    for (let r = parseInt(t); r < parseInt(e); r++) s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
    return s;
  }
  function Oh(i) {
    let t = "precision " + i.precision + ` float;
precision ` + i.precision + " int;";
    return i.precision === "highp" ? t += `
#define HIGH_PRECISION` : i.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
  }
  function kg(i) {
    let t = "SHADOWMAP_TYPE_BASIC";
    return i.shadowMapType === tu ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === zc ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === jn && (t = "SHADOWMAP_TYPE_VSM"), t;
  }
  function Hg(i) {
    let t = "ENVMAP_TYPE_CUBE";
    if (i.envMap) switch (i.envMapMode) {
      case Ls:
      case Is:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case ko:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
    return t;
  }
  function Gg(i) {
    let t = "ENVMAP_MODE_REFLECTION";
    if (i.envMap) switch (i.envMapMode) {
      case Is:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
    return t;
  }
  function Vg(i) {
    let t = "ENVMAP_BLENDING_NONE";
    if (i.envMap) switch (i.combine) {
      case eu:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case jf:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case Qf:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
    return t;
  }
  function Wg(i) {
    let t = i.envMapCubeUVHeight;
    if (t === null) return null;
    let e = Math.log2(t) - 2, n = 1 / t;
    return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 7 * 16)), texelHeight: n, maxMip: e };
  }
  function Xg(i, t, e, n) {
    let s = i.getContext(), r = e.defines, a = e.vertexShader, o = e.fragmentShader, c = kg(e), l = Hg(e), u = Gg(e), h = Vg(e), f = Wg(e), d = e.isWebGL2 ? "" : Lg(e), g = Ig(e), _ = Ug(r), m = s.createProgram(), p, x, v = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
    e.isRawShaderMaterial ? (p = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, _].filter(As).join(`
`), p.length > 0 && (p += `
`), x = [d, "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, _].filter(As).join(`
`), x.length > 0 && (x += `
`)) : (p = [Oh(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, _, e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", e.batching ? "#define USE_BATCHING" : "", e.instancing ? "#define USE_INSTANCING" : "", e.instancingColor ? "#define USE_INSTANCING_COLOR" : "", e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.map ? "#define USE_MAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + u : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.mapUv ? "#define MAP_UV " + e.mapUv : "", e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "", e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "", e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "", e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "", e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "", e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "", e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "", e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "", e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "", e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "", e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "", e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "", e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "", e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "", e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "", e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "", e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "", e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "", e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "", e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "", e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "", e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.skinning ? "#define USE_SKINNING" : "", e.morphTargets ? "#define USE_MORPHTARGETS" : "", e.morphNormals && e.flatShading === false ? "#define USE_MORPHNORMALS" : "", e.morphColors && e.isWebGL2 ? "#define USE_MORPHCOLORS" : "", e.morphTargetsCount > 0 && e.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", e.morphTargetsCount > 0 && e.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "", e.morphTargetsCount > 0 && e.isWebGL2 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + c : "", e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.useLegacyLights ? "#define LEGACY_LIGHTS" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.logarithmicDepthBuffer && e.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(As).join(`
`), x = [d, Oh(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, _, e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.map ? "#define USE_MAP" : "", e.matcap ? "#define USE_MATCAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + l : "", e.envMap ? "#define " + u : "", e.envMap ? "#define " + h : "", f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "", f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "", f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoat ? "#define USE_CLEARCOAT" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.iridescence ? "#define USE_IRIDESCENCE" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaTest ? "#define USE_ALPHATEST" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.sheen ? "#define USE_SHEEN" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors || e.instancingColor ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.gradientMap ? "#define USE_GRADIENTMAP" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + c : "", e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.useLegacyLights ? "#define LEGACY_LIGHTS" : "", e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.logarithmicDepthBuffer && e.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", e.toneMapping !== mi ? "#define TONE_MAPPING" : "", e.toneMapping !== mi ? oe.tonemapping_pars_fragment : "", e.toneMapping !== mi ? Pg("toneMapping", e.toneMapping) : "", e.dithering ? "#define DITHERING" : "", e.opaque ? "#define OPAQUE" : "", oe.colorspace_pars_fragment, Cg("linearToOutputTexel", e.outputColorSpace), e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "", `
`].filter(As).join(`
`)), a = uc(a), a = Uh(a, e), a = Dh(a, e), o = uc(o), o = Uh(o, e), o = Dh(o, e), a = Nh(a), o = Nh(o), e.isWebGL2 && e.isRawShaderMaterial !== true && (v = `#version 300 es
`, p = [g, "precision mediump sampler2DArray;", "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + p, x = ["precision mediump sampler2DArray;", "#define varying in", e.glslVersion === eh ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", e.glslVersion === eh ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
` + x);
    let E = v + p + a, R = v + x + o, w = Lh(s, s.VERTEX_SHADER, E), T = Lh(s, s.FRAGMENT_SHADER, R);
    s.attachShader(m, w), s.attachShader(m, T), e.index0AttributeName !== void 0 ? s.bindAttribLocation(m, 0, e.index0AttributeName) : e.morphTargets === true && s.bindAttribLocation(m, 0, "position"), s.linkProgram(m);
    function U(J) {
      if (i.debug.checkShaderErrors) {
        let ht = s.getProgramInfoLog(m).trim(), H = s.getShaderInfoLog(w).trim(), $ = s.getShaderInfoLog(T).trim(), et = true, pt = true;
        if (s.getProgramParameter(m, s.LINK_STATUS) === false) if (et = false, typeof i.debug.onShaderError == "function") i.debug.onShaderError(s, m, w, T);
        else {
          let V = Ih(s, w, "vertex"), C = Ih(s, T, "fragment");
          console.error("THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(m, s.VALIDATE_STATUS) + `

Program Info Log: ` + ht + `
` + V + `
` + C);
        }
        else ht !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", ht) : (H === "" || $ === "") && (pt = false);
        pt && (J.diagnostics = { runnable: et, programLog: ht, vertexShader: { log: H, prefix: p }, fragmentShader: { log: $, prefix: x } });
      }
      s.deleteShader(w), s.deleteShader(T), M = new Ps(s, m), S = Dg(s, m);
    }
    let M;
    this.getUniforms = function() {
      return M === void 0 && U(this), M;
    };
    let S;
    this.getAttributes = function() {
      return S === void 0 && U(this), S;
    };
    let q = e.rendererExtensionParallelShaderCompile === false;
    return this.isReady = function() {
      return q === false && (q = s.getProgramParameter(m, wg)), q;
    }, this.destroy = function() {
      n.releaseStatesOfProgram(this), s.deleteProgram(m), this.program = void 0;
    }, this.type = e.shaderType, this.name = e.shaderName, this.id = Tg++, this.cacheKey = t, this.usedTimes = 1, this.program = m, this.vertexShader = w, this.fragmentShader = T, this;
  }
  var qg = 0, fc = class {
    constructor() {
      this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
    }
    update(t) {
      let e = t.vertexShader, n = t.fragmentShader, s = this._getShaderStage(e), r = this._getShaderStage(n), a = this._getShaderCacheForMaterial(t);
      return a.has(s) === false && (a.add(s), s.usedTimes++), a.has(r) === false && (a.add(r), r.usedTimes++), this;
    }
    remove(t) {
      let e = this.materialCache.get(t);
      for (let n of e) n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
      return this.materialCache.delete(t), this;
    }
    getVertexShaderID(t) {
      return this._getShaderStage(t.vertexShader).id;
    }
    getFragmentShaderID(t) {
      return this._getShaderStage(t.fragmentShader).id;
    }
    dispose() {
      this.shaderCache.clear(), this.materialCache.clear();
    }
    _getShaderCacheForMaterial(t) {
      let e = this.materialCache, n = e.get(t);
      return n === void 0 && (n = /* @__PURE__ */ new Set(), e.set(t, n)), n;
    }
    _getShaderStage(t) {
      let e = this.shaderCache, n = e.get(t);
      return n === void 0 && (n = new dc(t), e.set(t, n)), n;
    }
  }, dc = class {
    constructor(t) {
      this.id = qg++, this.code = t, this.usedTimes = 0;
    }
  };
  function Yg(i, t, e, n, s, r, a) {
    let o = new ur(), c = new fc(), l = [], u = s.isWebGL2, h = s.logarithmicDepthBuffer, f = s.vertexTextures, d = s.precision, g = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distanceRGBA", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" };
    function _(M) {
      return M === 0 ? "uv" : `uv${M}`;
    }
    function m(M, S, q, J, ht) {
      let H = J.fog, $ = ht.geometry, et = M.isMeshStandardMaterial ? J.environment : null, pt = (M.isMeshStandardMaterial ? e : t).get(M.envMap || et), V = pt && pt.mapping === ko ? pt.image.height : null, C = g[M.type];
      M.precision !== null && (d = s.getMaxPrecision(M.precision), d !== M.precision && console.warn("THREE.WebGLProgram.getParameters:", M.precision, "not supported, using", d, "instead."));
      let gt = $.morphAttributes.position || $.morphAttributes.normal || $.morphAttributes.color, xt = gt !== void 0 ? gt.length : 0, At = 0;
      $.morphAttributes.position !== void 0 && (At = 1), $.morphAttributes.normal !== void 0 && (At = 2), $.morphAttributes.color !== void 0 && (At = 3);
      let rt, yt, wt, dt;
      if (C) {
        let Jt = kn[C];
        rt = Jt.vertexShader, yt = Jt.fragmentShader;
      } else rt = M.vertexShader, yt = M.fragmentShader, c.update(M), wt = c.getVertexShaderID(M), dt = c.getFragmentShaderID(M);
      let ot = i.getRenderTarget(), bt = ht.isInstancedMesh === true, Et = ht.isBatchedMesh === true, O = !!M.map, W = !!M.matcap, L = !!pt, ct = !!M.aoMap, X = !!M.lightMap, tt = !!M.bumpMap, z = !!M.normalMap, D = !!M.displacementMap, G = !!M.emissiveMap, y = !!M.metalnessMap, b = !!M.roughnessMap, N = M.anisotropy > 0, I = M.clearcoat > 0, A = M.iridescence > 0, B = M.sheen > 0, it = M.transmission > 0, Z = N && !!M.anisotropyMap, st = I && !!M.clearcoatMap, lt = I && !!M.clearcoatNormalMap, St = I && !!M.clearcoatRoughnessMap, j = A && !!M.iridescenceMap, vt = A && !!M.iridescenceThicknessMap, Mt = B && !!M.sheenColorMap, Nt = B && !!M.sheenRoughnessMap, Pt = !!M.specularMap, It = !!M.specularColorMap, kt = !!M.specularIntensityMap, $t = it && !!M.transmissionMap, ee = it && !!M.thicknessMap, Ct = !!M.gradientMap, at = !!M.alphaMap, F = M.alphaTest > 0, _t = !!M.alphaHash, Tt = !!M.extensions, Rt = !!$.attributes.uv1, Ut = !!$.attributes.uv2, Gt = !!$.attributes.uv3, Vt = mi;
      return M.toneMapped && (ot === null || ot.isXRRenderTarget === true) && (Vt = i.toneMapping), { isWebGL2: u, shaderID: C, shaderType: M.type, shaderName: M.name, vertexShader: rt, fragmentShader: yt, defines: M.defines, customVertexShaderID: wt, customFragmentShaderID: dt, isRawShaderMaterial: M.isRawShaderMaterial === true, glslVersion: M.glslVersion, precision: d, batching: Et, instancing: bt, instancingColor: bt && ht.instanceColor !== null, supportsVertexTextures: f, outputColorSpace: ot === null ? i.outputColorSpace : ot.isXRRenderTarget === true ? ot.texture.colorSpace : ii, map: O, matcap: W, envMap: L, envMapMode: L && pt.mapping, envMapCubeUVHeight: V, aoMap: ct, lightMap: X, bumpMap: tt, normalMap: z, displacementMap: f && D, emissiveMap: G, normalMapObjectSpace: z && M.normalMapType === fd, normalMapTangentSpace: z && M.normalMapType === uu, metalnessMap: y, roughnessMap: b, anisotropy: N, anisotropyMap: Z, clearcoat: I, clearcoatMap: st, clearcoatNormalMap: lt, clearcoatRoughnessMap: St, iridescence: A, iridescenceMap: j, iridescenceThicknessMap: vt, sheen: B, sheenColorMap: Mt, sheenRoughnessMap: Nt, specularMap: Pt, specularColorMap: It, specularIntensityMap: kt, transmission: it, transmissionMap: $t, thicknessMap: ee, gradientMap: Ct, opaque: M.transparent === false && M.blending === pi, alphaMap: at, alphaTest: F, alphaHash: _t, combine: M.combine, mapUv: O && _(M.map.channel), aoMapUv: ct && _(M.aoMap.channel), lightMapUv: X && _(M.lightMap.channel), bumpMapUv: tt && _(M.bumpMap.channel), normalMapUv: z && _(M.normalMap.channel), displacementMapUv: D && _(M.displacementMap.channel), emissiveMapUv: G && _(M.emissiveMap.channel), metalnessMapUv: y && _(M.metalnessMap.channel), roughnessMapUv: b && _(M.roughnessMap.channel), anisotropyMapUv: Z && _(M.anisotropyMap.channel), clearcoatMapUv: st && _(M.clearcoatMap.channel), clearcoatNormalMapUv: lt && _(M.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: St && _(M.clearcoatRoughnessMap.channel), iridescenceMapUv: j && _(M.iridescenceMap.channel), iridescenceThicknessMapUv: vt && _(M.iridescenceThicknessMap.channel), sheenColorMapUv: Mt && _(M.sheenColorMap.channel), sheenRoughnessMapUv: Nt && _(M.sheenRoughnessMap.channel), specularMapUv: Pt && _(M.specularMap.channel), specularColorMapUv: It && _(M.specularColorMap.channel), specularIntensityMapUv: kt && _(M.specularIntensityMap.channel), transmissionMapUv: $t && _(M.transmissionMap.channel), thicknessMapUv: ee && _(M.thicknessMap.channel), alphaMapUv: at && _(M.alphaMap.channel), vertexTangents: !!$.attributes.tangent && (z || N), vertexColors: M.vertexColors, vertexAlphas: M.vertexColors === true && !!$.attributes.color && $.attributes.color.itemSize === 4, vertexUv1s: Rt, vertexUv2s: Ut, vertexUv3s: Gt, pointsUvs: ht.isPoints === true && !!$.attributes.uv && (O || at), fog: !!H, useFog: M.fog === true, fogExp2: H && H.isFogExp2, flatShading: M.flatShading === true, sizeAttenuation: M.sizeAttenuation === true, logarithmicDepthBuffer: h, skinning: ht.isSkinnedMesh === true, morphTargets: $.morphAttributes.position !== void 0, morphNormals: $.morphAttributes.normal !== void 0, morphColors: $.morphAttributes.color !== void 0, morphTargetsCount: xt, morphTextureStride: At, numDirLights: S.directional.length, numPointLights: S.point.length, numSpotLights: S.spot.length, numSpotLightMaps: S.spotLightMap.length, numRectAreaLights: S.rectArea.length, numHemiLights: S.hemi.length, numDirLightShadows: S.directionalShadowMap.length, numPointLightShadows: S.pointShadowMap.length, numSpotLightShadows: S.spotShadowMap.length, numSpotLightShadowsWithMaps: S.numSpotLightShadowsWithMaps, numLightProbes: S.numLightProbes, numClippingPlanes: a.numPlanes, numClipIntersection: a.numIntersection, dithering: M.dithering, shadowMapEnabled: i.shadowMap.enabled && q.length > 0, shadowMapType: i.shadowMap.type, toneMapping: Vt, useLegacyLights: i._useLegacyLights, decodeVideoTexture: O && M.map.isVideoTexture === true && ge.getTransfer(M.map.colorSpace) === Me, premultipliedAlpha: M.premultipliedAlpha, doubleSided: M.side === Ue, flipSided: M.side === Ze, useDepthPacking: M.depthPacking >= 0, depthPacking: M.depthPacking || 0, index0AttributeName: M.index0AttributeName, extensionDerivatives: Tt && M.extensions.derivatives === true, extensionFragDepth: Tt && M.extensions.fragDepth === true, extensionDrawBuffers: Tt && M.extensions.drawBuffers === true, extensionShaderTextureLOD: Tt && M.extensions.shaderTextureLOD === true, extensionClipCullDistance: Tt && M.extensions.clipCullDistance && n.has("WEBGL_clip_cull_distance"), rendererExtensionFragDepth: u || n.has("EXT_frag_depth"), rendererExtensionDrawBuffers: u || n.has("WEBGL_draw_buffers"), rendererExtensionShaderTextureLod: u || n.has("EXT_shader_texture_lod"), rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"), customProgramCacheKey: M.customProgramCacheKey() };
    }
    function p(M) {
      let S = [];
      if (M.shaderID ? S.push(M.shaderID) : (S.push(M.customVertexShaderID), S.push(M.customFragmentShaderID)), M.defines !== void 0) for (let q in M.defines) S.push(q), S.push(M.defines[q]);
      return M.isRawShaderMaterial === false && (x(S, M), v(S, M), S.push(i.outputColorSpace)), S.push(M.customProgramCacheKey), S.join();
    }
    function x(M, S) {
      M.push(S.precision), M.push(S.outputColorSpace), M.push(S.envMapMode), M.push(S.envMapCubeUVHeight), M.push(S.mapUv), M.push(S.alphaMapUv), M.push(S.lightMapUv), M.push(S.aoMapUv), M.push(S.bumpMapUv), M.push(S.normalMapUv), M.push(S.displacementMapUv), M.push(S.emissiveMapUv), M.push(S.metalnessMapUv), M.push(S.roughnessMapUv), M.push(S.anisotropyMapUv), M.push(S.clearcoatMapUv), M.push(S.clearcoatNormalMapUv), M.push(S.clearcoatRoughnessMapUv), M.push(S.iridescenceMapUv), M.push(S.iridescenceThicknessMapUv), M.push(S.sheenColorMapUv), M.push(S.sheenRoughnessMapUv), M.push(S.specularMapUv), M.push(S.specularColorMapUv), M.push(S.specularIntensityMapUv), M.push(S.transmissionMapUv), M.push(S.thicknessMapUv), M.push(S.combine), M.push(S.fogExp2), M.push(S.sizeAttenuation), M.push(S.morphTargetsCount), M.push(S.morphAttributeCount), M.push(S.numDirLights), M.push(S.numPointLights), M.push(S.numSpotLights), M.push(S.numSpotLightMaps), M.push(S.numHemiLights), M.push(S.numRectAreaLights), M.push(S.numDirLightShadows), M.push(S.numPointLightShadows), M.push(S.numSpotLightShadows), M.push(S.numSpotLightShadowsWithMaps), M.push(S.numLightProbes), M.push(S.shadowMapType), M.push(S.toneMapping), M.push(S.numClippingPlanes), M.push(S.numClipIntersection), M.push(S.depthPacking);
    }
    function v(M, S) {
      o.disableAll(), S.isWebGL2 && o.enable(0), S.supportsVertexTextures && o.enable(1), S.instancing && o.enable(2), S.instancingColor && o.enable(3), S.matcap && o.enable(4), S.envMap && o.enable(5), S.normalMapObjectSpace && o.enable(6), S.normalMapTangentSpace && o.enable(7), S.clearcoat && o.enable(8), S.iridescence && o.enable(9), S.alphaTest && o.enable(10), S.vertexColors && o.enable(11), S.vertexAlphas && o.enable(12), S.vertexUv1s && o.enable(13), S.vertexUv2s && o.enable(14), S.vertexUv3s && o.enable(15), S.vertexTangents && o.enable(16), S.anisotropy && o.enable(17), S.alphaHash && o.enable(18), S.batching && o.enable(19), M.push(o.mask), o.disableAll(), S.fog && o.enable(0), S.useFog && o.enable(1), S.flatShading && o.enable(2), S.logarithmicDepthBuffer && o.enable(3), S.skinning && o.enable(4), S.morphTargets && o.enable(5), S.morphNormals && o.enable(6), S.morphColors && o.enable(7), S.premultipliedAlpha && o.enable(8), S.shadowMapEnabled && o.enable(9), S.useLegacyLights && o.enable(10), S.doubleSided && o.enable(11), S.flipSided && o.enable(12), S.useDepthPacking && o.enable(13), S.dithering && o.enable(14), S.transmission && o.enable(15), S.sheen && o.enable(16), S.opaque && o.enable(17), S.pointsUvs && o.enable(18), S.decodeVideoTexture && o.enable(19), M.push(o.mask);
    }
    function E(M) {
      let S = g[M.type], q;
      if (S) {
        let J = kn[S];
        q = bi.clone(J.uniforms);
      } else q = M.uniforms;
      return q;
    }
    function R(M, S) {
      let q;
      for (let J = 0, ht = l.length; J < ht; J++) {
        let H = l[J];
        if (H.cacheKey === S) {
          q = H, ++q.usedTimes;
          break;
        }
      }
      return q === void 0 && (q = new Xg(i, S, M, r), l.push(q)), q;
    }
    function w(M) {
      if (--M.usedTimes === 0) {
        let S = l.indexOf(M);
        l[S] = l[l.length - 1], l.pop(), M.destroy();
      }
    }
    function T(M) {
      c.remove(M);
    }
    function U() {
      c.dispose();
    }
    return { getParameters: m, getProgramCacheKey: p, getUniforms: E, acquireProgram: R, releaseProgram: w, releaseShaderCache: T, programs: l, dispose: U };
  }
  function Zg() {
    let i = /* @__PURE__ */ new WeakMap();
    function t(r) {
      let a = i.get(r);
      return a === void 0 && (a = {}, i.set(r, a)), a;
    }
    function e(r) {
      i.delete(r);
    }
    function n(r, a, o) {
      i.get(r)[a] = o;
    }
    function s() {
      i = /* @__PURE__ */ new WeakMap();
    }
    return { get: t, remove: e, update: n, dispose: s };
  }
  function Jg(i, t) {
    return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
  }
  function Fh(i, t) {
    return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
  }
  function zh() {
    let i = [], t = 0, e = [], n = [], s = [];
    function r() {
      t = 0, e.length = 0, n.length = 0, s.length = 0;
    }
    function a(h, f, d, g, _, m) {
      let p = i[t];
      return p === void 0 ? (p = { id: h.id, object: h, geometry: f, material: d, groupOrder: g, renderOrder: h.renderOrder, z: _, group: m }, i[t] = p) : (p.id = h.id, p.object = h, p.geometry = f, p.material = d, p.groupOrder = g, p.renderOrder = h.renderOrder, p.z = _, p.group = m), t++, p;
    }
    function o(h, f, d, g, _, m) {
      let p = a(h, f, d, g, _, m);
      d.transmission > 0 ? n.push(p) : d.transparent === true ? s.push(p) : e.push(p);
    }
    function c(h, f, d, g, _, m) {
      let p = a(h, f, d, g, _, m);
      d.transmission > 0 ? n.unshift(p) : d.transparent === true ? s.unshift(p) : e.unshift(p);
    }
    function l(h, f) {
      e.length > 1 && e.sort(h || Jg), n.length > 1 && n.sort(f || Fh), s.length > 1 && s.sort(f || Fh);
    }
    function u() {
      for (let h = t, f = i.length; h < f; h++) {
        let d = i[h];
        if (d.id === null) break;
        d.id = null, d.object = null, d.geometry = null, d.material = null, d.group = null;
      }
    }
    return { opaque: e, transmissive: n, transparent: s, init: r, push: o, unshift: c, finish: u, sort: l };
  }
  function $g() {
    let i = /* @__PURE__ */ new WeakMap();
    function t(n, s) {
      let r = i.get(n), a;
      return r === void 0 ? (a = new zh(), i.set(n, [a])) : s >= r.length ? (a = new zh(), r.push(a)) : a = r[s], a;
    }
    function e() {
      i = /* @__PURE__ */ new WeakMap();
    }
    return { get: t, dispose: e };
  }
  function Kg() {
    let i = {};
    return { get: function(t) {
      if (i[t.id] !== void 0) return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = { direction: new Y(), color: new Xt() };
          break;
        case "SpotLight":
          e = { position: new Y(), direction: new Y(), color: new Xt(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
          break;
        case "PointLight":
          e = { position: new Y(), color: new Xt(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          e = { direction: new Y(), skyColor: new Xt(), groundColor: new Xt() };
          break;
        case "RectAreaLight":
          e = { color: new Xt(), position: new Y(), halfWidth: new Y(), halfHeight: new Y() };
          break;
      }
      return i[t.id] = e, e;
    } };
  }
  function jg() {
    let i = {};
    return { get: function(t) {
      if (i[t.id] !== void 0) return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Bt() };
          break;
        case "SpotLight":
          e = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Bt() };
          break;
        case "PointLight":
          e = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Bt(), shadowCameraNear: 1, shadowCameraFar: 1e3 };
          break;
      }
      return i[t.id] = e, e;
    } };
  }
  var Qg = 0;
  function tx(i, t) {
    return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
  }
  function ex(i, t) {
    let e = new Kg(), n = jg(), s = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 };
    for (let u = 0; u < 9; u++) s.probe.push(new Y());
    let r = new Y(), a = new ve(), o = new ve();
    function c(u, h) {
      let f = 0, d = 0, g = 0;
      for (let J = 0; J < 9; J++) s.probe[J].set(0, 0, 0);
      let _ = 0, m = 0, p = 0, x = 0, v = 0, E = 0, R = 0, w = 0, T = 0, U = 0, M = 0;
      u.sort(tx);
      let S = h === true ? Math.PI : 1;
      for (let J = 0, ht = u.length; J < ht; J++) {
        let H = u[J], $ = H.color, et = H.intensity, pt = H.distance, V = H.shadow && H.shadow.map ? H.shadow.map.texture : null;
        if (H.isAmbientLight) f += $.r * et * S, d += $.g * et * S, g += $.b * et * S;
        else if (H.isLightProbe) {
          for (let C = 0; C < 9; C++) s.probe[C].addScaledVector(H.sh.coefficients[C], et);
          M++;
        } else if (H.isDirectionalLight) {
          let C = e.get(H);
          if (C.color.copy(H.color).multiplyScalar(H.intensity * S), H.castShadow) {
            let gt = H.shadow, xt = n.get(H);
            xt.shadowBias = gt.bias, xt.shadowNormalBias = gt.normalBias, xt.shadowRadius = gt.radius, xt.shadowMapSize = gt.mapSize, s.directionalShadow[_] = xt, s.directionalShadowMap[_] = V, s.directionalShadowMatrix[_] = H.shadow.matrix, E++;
          }
          s.directional[_] = C, _++;
        } else if (H.isSpotLight) {
          let C = e.get(H);
          C.position.setFromMatrixPosition(H.matrixWorld), C.color.copy($).multiplyScalar(et * S), C.distance = pt, C.coneCos = Math.cos(H.angle), C.penumbraCos = Math.cos(H.angle * (1 - H.penumbra)), C.decay = H.decay, s.spot[p] = C;
          let gt = H.shadow;
          if (H.map && (s.spotLightMap[T] = H.map, T++, gt.updateMatrices(H), H.castShadow && U++), s.spotLightMatrix[p] = gt.matrix, H.castShadow) {
            let xt = n.get(H);
            xt.shadowBias = gt.bias, xt.shadowNormalBias = gt.normalBias, xt.shadowRadius = gt.radius, xt.shadowMapSize = gt.mapSize, s.spotShadow[p] = xt, s.spotShadowMap[p] = V, w++;
          }
          p++;
        } else if (H.isRectAreaLight) {
          let C = e.get(H);
          C.color.copy($).multiplyScalar(et), C.halfWidth.set(H.width * 0.5, 0, 0), C.halfHeight.set(0, H.height * 0.5, 0), s.rectArea[x] = C, x++;
        } else if (H.isPointLight) {
          let C = e.get(H);
          if (C.color.copy(H.color).multiplyScalar(H.intensity * S), C.distance = H.distance, C.decay = H.decay, H.castShadow) {
            let gt = H.shadow, xt = n.get(H);
            xt.shadowBias = gt.bias, xt.shadowNormalBias = gt.normalBias, xt.shadowRadius = gt.radius, xt.shadowMapSize = gt.mapSize, xt.shadowCameraNear = gt.camera.near, xt.shadowCameraFar = gt.camera.far, s.pointShadow[m] = xt, s.pointShadowMap[m] = V, s.pointShadowMatrix[m] = H.shadow.matrix, R++;
          }
          s.point[m] = C, m++;
        } else if (H.isHemisphereLight) {
          let C = e.get(H);
          C.skyColor.copy(H.color).multiplyScalar(et * S), C.groundColor.copy(H.groundColor).multiplyScalar(et * S), s.hemi[v] = C, v++;
        }
      }
      x > 0 && (t.isWebGL2 ? i.has("OES_texture_float_linear") === true ? (s.rectAreaLTC1 = Dt.LTC_FLOAT_1, s.rectAreaLTC2 = Dt.LTC_FLOAT_2) : (s.rectAreaLTC1 = Dt.LTC_HALF_1, s.rectAreaLTC2 = Dt.LTC_HALF_2) : i.has("OES_texture_float_linear") === true ? (s.rectAreaLTC1 = Dt.LTC_FLOAT_1, s.rectAreaLTC2 = Dt.LTC_FLOAT_2) : i.has("OES_texture_half_float_linear") === true ? (s.rectAreaLTC1 = Dt.LTC_HALF_1, s.rectAreaLTC2 = Dt.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), s.ambient[0] = f, s.ambient[1] = d, s.ambient[2] = g;
      let q = s.hash;
      (q.directionalLength !== _ || q.pointLength !== m || q.spotLength !== p || q.rectAreaLength !== x || q.hemiLength !== v || q.numDirectionalShadows !== E || q.numPointShadows !== R || q.numSpotShadows !== w || q.numSpotMaps !== T || q.numLightProbes !== M) && (s.directional.length = _, s.spot.length = p, s.rectArea.length = x, s.point.length = m, s.hemi.length = v, s.directionalShadow.length = E, s.directionalShadowMap.length = E, s.pointShadow.length = R, s.pointShadowMap.length = R, s.spotShadow.length = w, s.spotShadowMap.length = w, s.directionalShadowMatrix.length = E, s.pointShadowMatrix.length = R, s.spotLightMatrix.length = w + T - U, s.spotLightMap.length = T, s.numSpotLightShadowsWithMaps = U, s.numLightProbes = M, q.directionalLength = _, q.pointLength = m, q.spotLength = p, q.rectAreaLength = x, q.hemiLength = v, q.numDirectionalShadows = E, q.numPointShadows = R, q.numSpotShadows = w, q.numSpotMaps = T, q.numLightProbes = M, s.version = Qg++);
    }
    function l(u, h) {
      let f = 0, d = 0, g = 0, _ = 0, m = 0, p = h.matrixWorldInverse;
      for (let x = 0, v = u.length; x < v; x++) {
        let E = u[x];
        if (E.isDirectionalLight) {
          let R = s.directional[f];
          R.direction.setFromMatrixPosition(E.matrixWorld), r.setFromMatrixPosition(E.target.matrixWorld), R.direction.sub(r), R.direction.transformDirection(p), f++;
        } else if (E.isSpotLight) {
          let R = s.spot[g];
          R.position.setFromMatrixPosition(E.matrixWorld), R.position.applyMatrix4(p), R.direction.setFromMatrixPosition(E.matrixWorld), r.setFromMatrixPosition(E.target.matrixWorld), R.direction.sub(r), R.direction.transformDirection(p), g++;
        } else if (E.isRectAreaLight) {
          let R = s.rectArea[_];
          R.position.setFromMatrixPosition(E.matrixWorld), R.position.applyMatrix4(p), o.identity(), a.copy(E.matrixWorld), a.premultiply(p), o.extractRotation(a), R.halfWidth.set(E.width * 0.5, 0, 0), R.halfHeight.set(0, E.height * 0.5, 0), R.halfWidth.applyMatrix4(o), R.halfHeight.applyMatrix4(o), _++;
        } else if (E.isPointLight) {
          let R = s.point[d];
          R.position.setFromMatrixPosition(E.matrixWorld), R.position.applyMatrix4(p), d++;
        } else if (E.isHemisphereLight) {
          let R = s.hemi[m];
          R.direction.setFromMatrixPosition(E.matrixWorld), R.direction.transformDirection(p), m++;
        }
      }
    }
    return { setup: c, setupView: l, state: s };
  }
  function Bh(i, t) {
    let e = new ex(i, t), n = [], s = [];
    function r() {
      n.length = 0, s.length = 0;
    }
    function a(h) {
      n.push(h);
    }
    function o(h) {
      s.push(h);
    }
    function c(h) {
      e.setup(n, h);
    }
    function l(h) {
      e.setupView(n, h);
    }
    return { init: r, state: { lightsArray: n, shadowsArray: s, lights: e }, setupLights: c, setupLightsView: l, pushLight: a, pushShadow: o };
  }
  function nx(i, t) {
    let e = /* @__PURE__ */ new WeakMap();
    function n(r, a = 0) {
      let o = e.get(r), c;
      return o === void 0 ? (c = new Bh(i, t), e.set(r, [c])) : a >= o.length ? (c = new Bh(i, t), o.push(c)) : c = o[a], c;
    }
    function s() {
      e = /* @__PURE__ */ new WeakMap();
    }
    return { get: n, dispose: s };
  }
  var pc = class extends si {
    constructor(t) {
      super(), this.isMeshDepthMaterial = true, this.type = "MeshDepthMaterial", this.depthPacking = hd, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = false, this.wireframeLinewidth = 1, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
    }
  }, mc = class extends si {
    constructor(t) {
      super(), this.isMeshDistanceMaterial = true, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
    }
  }, ix = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, sx = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
  function rx(i, t, e) {
    let n = new fr(), s = new Bt(), r = new Bt(), a = new Pe(), o = new pc({ depthPacking: ud }), c = new mc(), l = {}, u = e.maxTextureSize, h = { [bn]: Ze, [Ze]: bn, [Ue]: Ue }, f = new Te({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new Bt() }, radius: { value: 4 } }, vertexShader: ix, fragmentShader: sx }), d = f.clone();
    d.defines.HORIZONTAL_PASS = 1;
    let g = new we();
    g.setAttribute("position", new xe(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
    let _ = new zt(g, f), m = this;
    this.enabled = false, this.autoUpdate = true, this.needsUpdate = false, this.type = tu;
    let p = this.type;
    this.render = function(w, T, U) {
      if (m.enabled === false || m.autoUpdate === false && m.needsUpdate === false || w.length === 0) return;
      let M = i.getRenderTarget(), S = i.getActiveCubeFace(), q = i.getActiveMipmapLevel(), J = i.state;
      J.setBlending(Hn), J.buffers.color.setClear(1, 1, 1, 1), J.buffers.depth.setTest(true), J.setScissorTest(false);
      let ht = p !== jn && this.type === jn, H = p === jn && this.type !== jn;
      for (let $ = 0, et = w.length; $ < et; $++) {
        let pt = w[$], V = pt.shadow;
        if (V === void 0) {
          console.warn("THREE.WebGLShadowMap:", pt, "has no shadow.");
          continue;
        }
        if (V.autoUpdate === false && V.needsUpdate === false) continue;
        s.copy(V.mapSize);
        let C = V.getFrameExtents();
        if (s.multiply(C), r.copy(V.mapSize), (s.x > u || s.y > u) && (s.x > u && (r.x = Math.floor(u / C.x), s.x = r.x * C.x, V.mapSize.x = r.x), s.y > u && (r.y = Math.floor(u / C.y), s.y = r.y * C.y, V.mapSize.y = r.y)), V.map === null || ht === true || H === true) {
          let xt = this.type !== jn ? { minFilter: an, magFilter: an } : {};
          V.map !== null && V.map.dispose(), V.map = new Je(s.x, s.y, xt), V.map.texture.name = pt.name + ".shadowMap", V.camera.updateProjectionMatrix();
        }
        i.setRenderTarget(V.map), i.clear();
        let gt = V.getViewportCount();
        for (let xt = 0; xt < gt; xt++) {
          let At = V.getViewport(xt);
          a.set(r.x * At.x, r.y * At.y, r.x * At.z, r.y * At.w), J.viewport(a), V.updateMatrices(pt, xt), n = V.getFrustum(), E(T, U, V.camera, pt, this.type);
        }
        V.isPointLightShadow !== true && this.type === jn && x(V, U), V.needsUpdate = false;
      }
      p = this.type, m.needsUpdate = false, i.setRenderTarget(M, S, q);
    };
    function x(w, T) {
      let U = t.update(_);
      f.defines.VSM_SAMPLES !== w.blurSamples && (f.defines.VSM_SAMPLES = w.blurSamples, d.defines.VSM_SAMPLES = w.blurSamples, f.needsUpdate = true, d.needsUpdate = true), w.mapPass === null && (w.mapPass = new Je(s.x, s.y)), f.uniforms.shadow_pass.value = w.map.texture, f.uniforms.resolution.value = w.mapSize, f.uniforms.radius.value = w.radius, i.setRenderTarget(w.mapPass), i.clear(), i.renderBufferDirect(T, null, U, f, _, null), d.uniforms.shadow_pass.value = w.mapPass.texture, d.uniforms.resolution.value = w.mapSize, d.uniforms.radius.value = w.radius, i.setRenderTarget(w.map), i.clear(), i.renderBufferDirect(T, null, U, d, _, null);
    }
    function v(w, T, U, M) {
      let S = null, q = U.isPointLight === true ? w.customDistanceMaterial : w.customDepthMaterial;
      if (q !== void 0) S = q;
      else if (S = U.isPointLight === true ? c : o, i.localClippingEnabled && T.clipShadows === true && Array.isArray(T.clippingPlanes) && T.clippingPlanes.length !== 0 || T.displacementMap && T.displacementScale !== 0 || T.alphaMap && T.alphaTest > 0 || T.map && T.alphaTest > 0) {
        let J = S.uuid, ht = T.uuid, H = l[J];
        H === void 0 && (H = {}, l[J] = H);
        let $ = H[ht];
        $ === void 0 && ($ = S.clone(), H[ht] = $, T.addEventListener("dispose", R)), S = $;
      }
      if (S.visible = T.visible, S.wireframe = T.wireframe, M === jn ? S.side = T.shadowSide !== null ? T.shadowSide : T.side : S.side = T.shadowSide !== null ? T.shadowSide : h[T.side], S.alphaMap = T.alphaMap, S.alphaTest = T.alphaTest, S.map = T.map, S.clipShadows = T.clipShadows, S.clippingPlanes = T.clippingPlanes, S.clipIntersection = T.clipIntersection, S.displacementMap = T.displacementMap, S.displacementScale = T.displacementScale, S.displacementBias = T.displacementBias, S.wireframeLinewidth = T.wireframeLinewidth, S.linewidth = T.linewidth, U.isPointLight === true && S.isMeshDistanceMaterial === true) {
        let J = i.properties.get(S);
        J.light = U;
      }
      return S;
    }
    function E(w, T, U, M, S) {
      if (w.visible === false) return;
      if (w.layers.test(T.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && S === jn) && (!w.frustumCulled || n.intersectsObject(w))) {
        w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse, w.matrixWorld);
        let ht = t.update(w), H = w.material;
        if (Array.isArray(H)) {
          let $ = ht.groups;
          for (let et = 0, pt = $.length; et < pt; et++) {
            let V = $[et], C = H[V.materialIndex];
            if (C && C.visible) {
              let gt = v(w, C, M, S);
              w.onBeforeShadow(i, w, T, U, ht, gt, V), i.renderBufferDirect(U, null, ht, gt, w, V), w.onAfterShadow(i, w, T, U, ht, gt, V);
            }
          }
        } else if (H.visible) {
          let $ = v(w, H, M, S);
          w.onBeforeShadow(i, w, T, U, ht, $, null), i.renderBufferDirect(U, null, ht, $, w, null), w.onAfterShadow(i, w, T, U, ht, $, null);
        }
      }
      let J = w.children;
      for (let ht = 0, H = J.length; ht < H; ht++) E(J[ht], T, U, M, S);
    }
    function R(w) {
      w.target.removeEventListener("dispose", R);
      for (let U in l) {
        let M = l[U], S = w.target.uuid;
        S in M && (M[S].dispose(), delete M[S]);
      }
    }
  }
  function ox(i, t, e) {
    let n = e.isWebGL2;
    function s() {
      let F = false, _t = new Pe(), Tt = null, Rt = new Pe(0, 0, 0, 0);
      return { setMask: function(Ut) {
        Tt !== Ut && !F && (i.colorMask(Ut, Ut, Ut, Ut), Tt = Ut);
      }, setLocked: function(Ut) {
        F = Ut;
      }, setClear: function(Ut, Gt, Vt, ce, Jt) {
        Jt === true && (Ut *= ce, Gt *= ce, Vt *= ce), _t.set(Ut, Gt, Vt, ce), Rt.equals(_t) === false && (i.clearColor(Ut, Gt, Vt, ce), Rt.copy(_t));
      }, reset: function() {
        F = false, Tt = null, Rt.set(-1, 0, 0, 0);
      } };
    }
    function r() {
      let F = false, _t = null, Tt = null, Rt = null;
      return { setTest: function(Ut) {
        Ut ? Et(i.DEPTH_TEST) : O(i.DEPTH_TEST);
      }, setMask: function(Ut) {
        _t !== Ut && !F && (i.depthMask(Ut), _t = Ut);
      }, setFunc: function(Ut) {
        if (Tt !== Ut) {
          switch (Ut) {
            case Xf:
              i.depthFunc(i.NEVER);
              break;
            case qf:
              i.depthFunc(i.ALWAYS);
              break;
            case Yf:
              i.depthFunc(i.LESS);
              break;
            case fo:
              i.depthFunc(i.LEQUAL);
              break;
            case Zf:
              i.depthFunc(i.EQUAL);
              break;
            case Jf:
              i.depthFunc(i.GEQUAL);
              break;
            case $f:
              i.depthFunc(i.GREATER);
              break;
            case Kf:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          Tt = Ut;
        }
      }, setLocked: function(Ut) {
        F = Ut;
      }, setClear: function(Ut) {
        Rt !== Ut && (i.clearDepth(Ut), Rt = Ut);
      }, reset: function() {
        F = false, _t = null, Tt = null, Rt = null;
      } };
    }
    function a() {
      let F = false, _t = null, Tt = null, Rt = null, Ut = null, Gt = null, Vt = null, ce = null, Jt = null;
      return { setTest: function(re) {
        F || (re ? Et(i.STENCIL_TEST) : O(i.STENCIL_TEST));
      }, setMask: function(re) {
        _t !== re && !F && (i.stencilMask(re), _t = re);
      }, setFunc: function(re, _e, k) {
        (Tt !== re || Rt !== _e || Ut !== k) && (i.stencilFunc(re, _e, k), Tt = re, Rt = _e, Ut = k);
      }, setOp: function(re, _e, k) {
        (Gt !== re || Vt !== _e || ce !== k) && (i.stencilOp(re, _e, k), Gt = re, Vt = _e, ce = k);
      }, setLocked: function(re) {
        F = re;
      }, setClear: function(re) {
        Jt !== re && (i.clearStencil(re), Jt = re);
      }, reset: function() {
        F = false, _t = null, Tt = null, Rt = null, Ut = null, Gt = null, Vt = null, ce = null, Jt = null;
      } };
    }
    let o = new s(), c = new r(), l = new a(), u = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), f = {}, d = {}, g = /* @__PURE__ */ new WeakMap(), _ = [], m = null, p = false, x = null, v = null, E = null, R = null, w = null, T = null, U = null, M = new Xt(0, 0, 0), S = 0, q = false, J = null, ht = null, H = null, $ = null, et = null, pt = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS), V = false, C = 0, gt = i.getParameter(i.VERSION);
    gt.indexOf("WebGL") !== -1 ? (C = parseFloat(/^WebGL (\d)/.exec(gt)[1]), V = C >= 1) : gt.indexOf("OpenGL ES") !== -1 && (C = parseFloat(/^OpenGL ES (\d)/.exec(gt)[1]), V = C >= 2);
    let xt = null, At = {}, rt = i.getParameter(i.SCISSOR_BOX), yt = i.getParameter(i.VIEWPORT), wt = new Pe().fromArray(rt), dt = new Pe().fromArray(yt);
    function ot(F, _t, Tt, Rt) {
      let Ut = new Uint8Array(4), Gt = i.createTexture();
      i.bindTexture(F, Gt), i.texParameteri(F, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(F, i.TEXTURE_MAG_FILTER, i.NEAREST);
      for (let Vt = 0; Vt < Tt; Vt++) n && (F === i.TEXTURE_3D || F === i.TEXTURE_2D_ARRAY) ? i.texImage3D(_t, 0, i.RGBA, 1, 1, Rt, 0, i.RGBA, i.UNSIGNED_BYTE, Ut) : i.texImage2D(_t + Vt, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, Ut);
      return Gt;
    }
    let bt = {};
    bt[i.TEXTURE_2D] = ot(i.TEXTURE_2D, i.TEXTURE_2D, 1), bt[i.TEXTURE_CUBE_MAP] = ot(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), n && (bt[i.TEXTURE_2D_ARRAY] = ot(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), bt[i.TEXTURE_3D] = ot(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1)), o.setClear(0, 0, 0, 1), c.setClear(1), l.setClear(0), Et(i.DEPTH_TEST), c.setFunc(fo), G(false), y(yl), Et(i.CULL_FACE), z(Hn);
    function Et(F) {
      f[F] !== true && (i.enable(F), f[F] = true);
    }
    function O(F) {
      f[F] !== false && (i.disable(F), f[F] = false);
    }
    function W(F, _t) {
      return d[F] !== _t ? (i.bindFramebuffer(F, _t), d[F] = _t, n && (F === i.DRAW_FRAMEBUFFER && (d[i.FRAMEBUFFER] = _t), F === i.FRAMEBUFFER && (d[i.DRAW_FRAMEBUFFER] = _t)), true) : false;
    }
    function L(F, _t) {
      let Tt = _, Rt = false;
      if (F) if (Tt = g.get(_t), Tt === void 0 && (Tt = [], g.set(_t, Tt)), F.isWebGLMultipleRenderTargets) {
        let Ut = F.texture;
        if (Tt.length !== Ut.length || Tt[0] !== i.COLOR_ATTACHMENT0) {
          for (let Gt = 0, Vt = Ut.length; Gt < Vt; Gt++) Tt[Gt] = i.COLOR_ATTACHMENT0 + Gt;
          Tt.length = Ut.length, Rt = true;
        }
      } else Tt[0] !== i.COLOR_ATTACHMENT0 && (Tt[0] = i.COLOR_ATTACHMENT0, Rt = true);
      else Tt[0] !== i.BACK && (Tt[0] = i.BACK, Rt = true);
      Rt && (e.isWebGL2 ? i.drawBuffers(Tt) : t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Tt));
    }
    function ct(F) {
      return m !== F ? (i.useProgram(F), m = F, true) : false;
    }
    let X = { [Bi]: i.FUNC_ADD, [Pf]: i.FUNC_SUBTRACT, [Lf]: i.FUNC_REVERSE_SUBTRACT };
    if (n) X[Sl] = i.MIN, X[El] = i.MAX;
    else {
      let F = t.get("EXT_blend_minmax");
      F !== null && (X[Sl] = F.MIN_EXT, X[El] = F.MAX_EXT);
    }
    let tt = { [If]: i.ZERO, [Uf]: i.ONE, [Df]: i.SRC_COLOR, [Ja]: i.SRC_ALPHA, [kf]: i.SRC_ALPHA_SATURATE, [zf]: i.DST_COLOR, [Of]: i.DST_ALPHA, [Nf]: i.ONE_MINUS_SRC_COLOR, [$a]: i.ONE_MINUS_SRC_ALPHA, [Bf]: i.ONE_MINUS_DST_COLOR, [Ff]: i.ONE_MINUS_DST_ALPHA, [Hf]: i.CONSTANT_COLOR, [Gf]: i.ONE_MINUS_CONSTANT_COLOR, [Vf]: i.CONSTANT_ALPHA, [Wf]: i.ONE_MINUS_CONSTANT_ALPHA };
    function z(F, _t, Tt, Rt, Ut, Gt, Vt, ce, Jt, re) {
      if (F === Hn) {
        p === true && (O(i.BLEND), p = false);
        return;
      }
      if (p === false && (Et(i.BLEND), p = true), F !== Cf) {
        if (F !== x || re !== q) {
          if ((v !== Bi || w !== Bi) && (i.blendEquation(i.FUNC_ADD), v = Bi, w = Bi), re) switch (F) {
            case pi:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Ee:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case Ml:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case bl:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", F);
              break;
          }
          else switch (F) {
            case pi:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Ee:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case Ml:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case bl:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", F);
              break;
          }
          E = null, R = null, T = null, U = null, M.set(0, 0, 0), S = 0, x = F, q = re;
        }
        return;
      }
      Ut = Ut || _t, Gt = Gt || Tt, Vt = Vt || Rt, (_t !== v || Ut !== w) && (i.blendEquationSeparate(X[_t], X[Ut]), v = _t, w = Ut), (Tt !== E || Rt !== R || Gt !== T || Vt !== U) && (i.blendFuncSeparate(tt[Tt], tt[Rt], tt[Gt], tt[Vt]), E = Tt, R = Rt, T = Gt, U = Vt), (ce.equals(M) === false || Jt !== S) && (i.blendColor(ce.r, ce.g, ce.b, Jt), M.copy(ce), S = Jt), x = F, q = false;
    }
    function D(F, _t) {
      F.side === Ue ? O(i.CULL_FACE) : Et(i.CULL_FACE);
      let Tt = F.side === Ze;
      _t && (Tt = !Tt), G(Tt), F.blending === pi && F.transparent === false ? z(Hn) : z(F.blending, F.blendEquation, F.blendSrc, F.blendDst, F.blendEquationAlpha, F.blendSrcAlpha, F.blendDstAlpha, F.blendColor, F.blendAlpha, F.premultipliedAlpha), c.setFunc(F.depthFunc), c.setTest(F.depthTest), c.setMask(F.depthWrite), o.setMask(F.colorWrite);
      let Rt = F.stencilWrite;
      l.setTest(Rt), Rt && (l.setMask(F.stencilWriteMask), l.setFunc(F.stencilFunc, F.stencilRef, F.stencilFuncMask), l.setOp(F.stencilFail, F.stencilZFail, F.stencilZPass)), N(F.polygonOffset, F.polygonOffsetFactor, F.polygonOffsetUnits), F.alphaToCoverage === true ? Et(i.SAMPLE_ALPHA_TO_COVERAGE) : O(i.SAMPLE_ALPHA_TO_COVERAGE);
    }
    function G(F) {
      J !== F && (F ? i.frontFace(i.CW) : i.frontFace(i.CCW), J = F);
    }
    function y(F) {
      F !== Af ? (Et(i.CULL_FACE), F !== ht && (F === yl ? i.cullFace(i.BACK) : F === Rf ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : O(i.CULL_FACE), ht = F;
    }
    function b(F) {
      F !== H && (V && i.lineWidth(F), H = F);
    }
    function N(F, _t, Tt) {
      F ? (Et(i.POLYGON_OFFSET_FILL), ($ !== _t || et !== Tt) && (i.polygonOffset(_t, Tt), $ = _t, et = Tt)) : O(i.POLYGON_OFFSET_FILL);
    }
    function I(F) {
      F ? Et(i.SCISSOR_TEST) : O(i.SCISSOR_TEST);
    }
    function A(F) {
      F === void 0 && (F = i.TEXTURE0 + pt - 1), xt !== F && (i.activeTexture(F), xt = F);
    }
    function B(F, _t, Tt) {
      Tt === void 0 && (xt === null ? Tt = i.TEXTURE0 + pt - 1 : Tt = xt);
      let Rt = At[Tt];
      Rt === void 0 && (Rt = { type: void 0, texture: void 0 }, At[Tt] = Rt), (Rt.type !== F || Rt.texture !== _t) && (xt !== Tt && (i.activeTexture(Tt), xt = Tt), i.bindTexture(F, _t || bt[F]), Rt.type = F, Rt.texture = _t);
    }
    function it() {
      let F = At[xt];
      F !== void 0 && F.type !== void 0 && (i.bindTexture(F.type, null), F.type = void 0, F.texture = void 0);
    }
    function Z() {
      try {
        i.compressedTexImage2D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function st() {
      try {
        i.compressedTexImage3D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function lt() {
      try {
        i.texSubImage2D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function St() {
      try {
        i.texSubImage3D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function j() {
      try {
        i.compressedTexSubImage2D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function vt() {
      try {
        i.compressedTexSubImage3D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function Mt() {
      try {
        i.texStorage2D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function Nt() {
      try {
        i.texStorage3D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function Pt() {
      try {
        i.texImage2D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function It() {
      try {
        i.texImage3D.apply(i, arguments);
      } catch (F) {
        console.error("THREE.WebGLState:", F);
      }
    }
    function kt(F) {
      wt.equals(F) === false && (i.scissor(F.x, F.y, F.z, F.w), wt.copy(F));
    }
    function $t(F) {
      dt.equals(F) === false && (i.viewport(F.x, F.y, F.z, F.w), dt.copy(F));
    }
    function ee(F, _t) {
      let Tt = h.get(_t);
      Tt === void 0 && (Tt = /* @__PURE__ */ new WeakMap(), h.set(_t, Tt));
      let Rt = Tt.get(F);
      Rt === void 0 && (Rt = i.getUniformBlockIndex(_t, F.name), Tt.set(F, Rt));
    }
    function Ct(F, _t) {
      let Rt = h.get(_t).get(F);
      u.get(_t) !== Rt && (i.uniformBlockBinding(_t, Rt, F.__bindingPointIndex), u.set(_t, Rt));
    }
    function at() {
      i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(true, true, true, true), i.clearColor(0, 0, 0, 0), i.depthMask(true), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), n === true && (i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null)), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), f = {}, xt = null, At = {}, d = {}, g = /* @__PURE__ */ new WeakMap(), _ = [], m = null, p = false, x = null, v = null, E = null, R = null, w = null, T = null, U = null, M = new Xt(0, 0, 0), S = 0, q = false, J = null, ht = null, H = null, $ = null, et = null, wt.set(0, 0, i.canvas.width, i.canvas.height), dt.set(0, 0, i.canvas.width, i.canvas.height), o.reset(), c.reset(), l.reset();
    }
    return { buffers: { color: o, depth: c, stencil: l }, enable: Et, disable: O, bindFramebuffer: W, drawBuffers: L, useProgram: ct, setBlending: z, setMaterial: D, setFlipSided: G, setCullFace: y, setLineWidth: b, setPolygonOffset: N, setScissorTest: I, activeTexture: A, bindTexture: B, unbindTexture: it, compressedTexImage2D: Z, compressedTexImage3D: st, texImage2D: Pt, texImage3D: It, updateUBOMapping: ee, uniformBlockBinding: Ct, texStorage2D: Mt, texStorage3D: Nt, texSubImage2D: lt, texSubImage3D: St, compressedTexSubImage2D: j, compressedTexSubImage3D: vt, scissor: kt, viewport: $t, reset: at };
  }
  function ax(i, t, e, n, s, r, a) {
    let o = s.isWebGL2, c = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? false : /OculusBrowser/g.test(navigator.userAgent), u = /* @__PURE__ */ new WeakMap(), h, f = /* @__PURE__ */ new WeakMap(), d = false;
    try {
      d = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
    } catch {
    }
    function g(y, b) {
      return d ? new OffscreenCanvas(y, b) : yo("canvas");
    }
    function _(y, b, N, I) {
      let A = 1;
      if ((y.width > I || y.height > I) && (A = I / Math.max(y.width, y.height)), A < 1 || b === true) if (typeof HTMLImageElement < "u" && y instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && y instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && y instanceof ImageBitmap) {
        let B = b ? ic : Math.floor, it = B(A * y.width), Z = B(A * y.height);
        h === void 0 && (h = g(it, Z));
        let st = N ? g(it, Z) : h;
        return st.width = it, st.height = Z, st.getContext("2d").drawImage(y, 0, 0, it, Z), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + y.width + "x" + y.height + ") to (" + it + "x" + Z + ")."), st;
      } else return "data" in y && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + y.width + "x" + y.height + ")."), y;
      return y;
    }
    function m(y) {
      return nh(y.width) && nh(y.height);
    }
    function p(y) {
      return o ? false : y.wrapS !== Pn || y.wrapT !== Pn || y.minFilter !== an && y.minFilter !== yn;
    }
    function x(y, b) {
      return y.generateMipmaps && b && y.minFilter !== an && y.minFilter !== yn;
    }
    function v(y) {
      i.generateMipmap(y);
    }
    function E(y, b, N, I, A = false) {
      if (o === false) return b;
      if (y !== null) {
        if (i[y] !== void 0) return i[y];
        console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + y + "'");
      }
      let B = b;
      if (b === i.RED && (N === i.FLOAT && (B = i.R32F), N === i.HALF_FLOAT && (B = i.R16F), N === i.UNSIGNED_BYTE && (B = i.R8)), b === i.RED_INTEGER && (N === i.UNSIGNED_BYTE && (B = i.R8UI), N === i.UNSIGNED_SHORT && (B = i.R16UI), N === i.UNSIGNED_INT && (B = i.R32UI), N === i.BYTE && (B = i.R8I), N === i.SHORT && (B = i.R16I), N === i.INT && (B = i.R32I)), b === i.RG && (N === i.FLOAT && (B = i.RG32F), N === i.HALF_FLOAT && (B = i.RG16F), N === i.UNSIGNED_BYTE && (B = i.RG8)), b === i.RGBA) {
        let it = A ? go : ge.getTransfer(I);
        N === i.FLOAT && (B = i.RGBA32F), N === i.HALF_FLOAT && (B = i.RGBA16F), N === i.UNSIGNED_BYTE && (B = it === Me ? i.SRGB8_ALPHA8 : i.RGBA8), N === i.UNSIGNED_SHORT_4_4_4_4 && (B = i.RGBA4), N === i.UNSIGNED_SHORT_5_5_5_1 && (B = i.RGB5_A1);
      }
      return (B === i.R16F || B === i.R32F || B === i.RG16F || B === i.RG32F || B === i.RGBA16F || B === i.RGBA32F) && t.get("EXT_color_buffer_float"), B;
    }
    function R(y, b, N) {
      return x(y, N) === true || y.isFramebufferTexture && y.minFilter !== an && y.minFilter !== yn ? Math.log2(Math.max(b.width, b.height)) + 1 : y.mipmaps !== void 0 && y.mipmaps.length > 0 ? y.mipmaps.length : y.isCompressedTexture && Array.isArray(y.image) ? b.mipmaps.length : 1;
    }
    function w(y) {
      return y === an || y === wl || y === ma ? i.NEAREST : i.LINEAR;
    }
    function T(y) {
      let b = y.target;
      b.removeEventListener("dispose", T), M(b), b.isVideoTexture && u.delete(b);
    }
    function U(y) {
      let b = y.target;
      b.removeEventListener("dispose", U), q(b);
    }
    function M(y) {
      let b = n.get(y);
      if (b.__webglInit === void 0) return;
      let N = y.source, I = f.get(N);
      if (I) {
        let A = I[b.__cacheKey];
        A.usedTimes--, A.usedTimes === 0 && S(y), Object.keys(I).length === 0 && f.delete(N);
      }
      n.remove(y);
    }
    function S(y) {
      let b = n.get(y);
      i.deleteTexture(b.__webglTexture);
      let N = y.source, I = f.get(N);
      delete I[b.__cacheKey], a.memory.textures--;
    }
    function q(y) {
      let b = y.texture, N = n.get(y), I = n.get(b);
      if (I.__webglTexture !== void 0 && (i.deleteTexture(I.__webglTexture), a.memory.textures--), y.depthTexture && y.depthTexture.dispose(), y.isWebGLCubeRenderTarget) for (let A = 0; A < 6; A++) {
        if (Array.isArray(N.__webglFramebuffer[A])) for (let B = 0; B < N.__webglFramebuffer[A].length; B++) i.deleteFramebuffer(N.__webglFramebuffer[A][B]);
        else i.deleteFramebuffer(N.__webglFramebuffer[A]);
        N.__webglDepthbuffer && i.deleteRenderbuffer(N.__webglDepthbuffer[A]);
      }
      else {
        if (Array.isArray(N.__webglFramebuffer)) for (let A = 0; A < N.__webglFramebuffer.length; A++) i.deleteFramebuffer(N.__webglFramebuffer[A]);
        else i.deleteFramebuffer(N.__webglFramebuffer);
        if (N.__webglDepthbuffer && i.deleteRenderbuffer(N.__webglDepthbuffer), N.__webglMultisampledFramebuffer && i.deleteFramebuffer(N.__webglMultisampledFramebuffer), N.__webglColorRenderbuffer) for (let A = 0; A < N.__webglColorRenderbuffer.length; A++) N.__webglColorRenderbuffer[A] && i.deleteRenderbuffer(N.__webglColorRenderbuffer[A]);
        N.__webglDepthRenderbuffer && i.deleteRenderbuffer(N.__webglDepthRenderbuffer);
      }
      if (y.isWebGLMultipleRenderTargets) for (let A = 0, B = b.length; A < B; A++) {
        let it = n.get(b[A]);
        it.__webglTexture && (i.deleteTexture(it.__webglTexture), a.memory.textures--), n.remove(b[A]);
      }
      n.remove(b), n.remove(y);
    }
    let J = 0;
    function ht() {
      J = 0;
    }
    function H() {
      let y = J;
      return y >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + y + " texture units while this GPU supports only " + s.maxTextures), J += 1, y;
    }
    function $(y) {
      let b = [];
      return b.push(y.wrapS), b.push(y.wrapT), b.push(y.wrapR || 0), b.push(y.magFilter), b.push(y.minFilter), b.push(y.anisotropy), b.push(y.internalFormat), b.push(y.format), b.push(y.type), b.push(y.generateMipmaps), b.push(y.premultiplyAlpha), b.push(y.flipY), b.push(y.unpackAlignment), b.push(y.colorSpace), b.join();
    }
    function et(y, b) {
      let N = n.get(y);
      if (y.isVideoTexture && D(y), y.isRenderTargetTexture === false && y.version > 0 && N.__version !== y.version) {
        let I = y.image;
        if (I === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
        else if (I.complete === false) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
        else {
          wt(N, y, b);
          return;
        }
      }
      e.bindTexture(i.TEXTURE_2D, N.__webglTexture, i.TEXTURE0 + b);
    }
    function pt(y, b) {
      let N = n.get(y);
      if (y.version > 0 && N.__version !== y.version) {
        wt(N, y, b);
        return;
      }
      e.bindTexture(i.TEXTURE_2D_ARRAY, N.__webglTexture, i.TEXTURE0 + b);
    }
    function V(y, b) {
      let N = n.get(y);
      if (y.version > 0 && N.__version !== y.version) {
        wt(N, y, b);
        return;
      }
      e.bindTexture(i.TEXTURE_3D, N.__webglTexture, i.TEXTURE0 + b);
    }
    function C(y, b) {
      let N = n.get(y);
      if (y.version > 0 && N.__version !== y.version) {
        dt(N, y, b);
        return;
      }
      e.bindTexture(i.TEXTURE_CUBE_MAP, N.__webglTexture, i.TEXTURE0 + b);
    }
    let gt = { [Xi]: i.REPEAT, [Pn]: i.CLAMP_TO_EDGE, [Qa]: i.MIRRORED_REPEAT }, xt = { [an]: i.NEAREST, [wl]: i.NEAREST_MIPMAP_NEAREST, [ma]: i.NEAREST_MIPMAP_LINEAR, [yn]: i.LINEAR, [ed]: i.LINEAR_MIPMAP_NEAREST, [ni]: i.LINEAR_MIPMAP_LINEAR }, At = { [dd]: i.NEVER, [vd]: i.ALWAYS, [pd]: i.LESS, [fu]: i.LEQUAL, [md]: i.EQUAL, [_d]: i.GEQUAL, [gd]: i.GREATER, [xd]: i.NOTEQUAL };
    function rt(y, b, N) {
      if (N ? (i.texParameteri(y, i.TEXTURE_WRAP_S, gt[b.wrapS]), i.texParameteri(y, i.TEXTURE_WRAP_T, gt[b.wrapT]), (y === i.TEXTURE_3D || y === i.TEXTURE_2D_ARRAY) && i.texParameteri(y, i.TEXTURE_WRAP_R, gt[b.wrapR]), i.texParameteri(y, i.TEXTURE_MAG_FILTER, xt[b.magFilter]), i.texParameteri(y, i.TEXTURE_MIN_FILTER, xt[b.minFilter])) : (i.texParameteri(y, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(y, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), (y === i.TEXTURE_3D || y === i.TEXTURE_2D_ARRAY) && i.texParameteri(y, i.TEXTURE_WRAP_R, i.CLAMP_TO_EDGE), (b.wrapS !== Pn || b.wrapT !== Pn) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), i.texParameteri(y, i.TEXTURE_MAG_FILTER, w(b.magFilter)), i.texParameteri(y, i.TEXTURE_MIN_FILTER, w(b.minFilter)), b.minFilter !== an && b.minFilter !== yn && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), b.compareFunction && (i.texParameteri(y, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(y, i.TEXTURE_COMPARE_FUNC, At[b.compareFunction])), t.has("EXT_texture_filter_anisotropic") === true) {
        let I = t.get("EXT_texture_filter_anisotropic");
        if (b.magFilter === an || b.minFilter !== ma && b.minFilter !== ni || b.type === di && t.has("OES_texture_float_linear") === false || o === false && b.type === mn && t.has("OES_texture_half_float_linear") === false) return;
        (b.anisotropy > 1 || n.get(b).__currentAnisotropy) && (i.texParameterf(y, I.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, s.getMaxAnisotropy())), n.get(b).__currentAnisotropy = b.anisotropy);
      }
    }
    function yt(y, b) {
      let N = false;
      y.__webglInit === void 0 && (y.__webglInit = true, b.addEventListener("dispose", T));
      let I = b.source, A = f.get(I);
      A === void 0 && (A = {}, f.set(I, A));
      let B = $(b);
      if (B !== y.__cacheKey) {
        A[B] === void 0 && (A[B] = { texture: i.createTexture(), usedTimes: 0 }, a.memory.textures++, N = true), A[B].usedTimes++;
        let it = A[y.__cacheKey];
        it !== void 0 && (A[y.__cacheKey].usedTimes--, it.usedTimes === 0 && S(b)), y.__cacheKey = B, y.__webglTexture = A[B].texture;
      }
      return N;
    }
    function wt(y, b, N) {
      let I = i.TEXTURE_2D;
      (b.isDataArrayTexture || b.isCompressedArrayTexture) && (I = i.TEXTURE_2D_ARRAY), b.isData3DTexture && (I = i.TEXTURE_3D);
      let A = yt(y, b), B = b.source;
      e.bindTexture(I, y.__webglTexture, i.TEXTURE0 + N);
      let it = n.get(B);
      if (B.version !== it.__version || A === true) {
        e.activeTexture(i.TEXTURE0 + N);
        let Z = ge.getPrimaries(ge.workingColorSpace), st = b.colorSpace === Mn ? null : ge.getPrimaries(b.colorSpace), lt = b.colorSpace === Mn || Z === st ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
        i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, b.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, b.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, b.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, lt);
        let St = p(b) && m(b.image) === false, j = _(b.image, St, false, s.maxTextureSize);
        j = G(b, j);
        let vt = m(j) || o, Mt = r.convert(b.format, b.colorSpace), Nt = r.convert(b.type), Pt = E(b.internalFormat, Mt, Nt, b.colorSpace, b.isVideoTexture);
        rt(I, b, vt);
        let It, kt = b.mipmaps, $t = o && b.isVideoTexture !== true && Pt !== lu, ee = it.__version === void 0 || A === true, Ct = R(b, j, vt);
        if (b.isDepthTexture) Pt = i.DEPTH_COMPONENT, o ? b.type === di ? Pt = i.DEPTH_COMPONENT32F : b.type === fi ? Pt = i.DEPTH_COMPONENT24 : b.type === Gi ? Pt = i.DEPTH24_STENCIL8 : Pt = i.DEPTH_COMPONENT16 : b.type === di && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), b.format === Vi && Pt === i.DEPTH_COMPONENT && b.type !== Vc && b.type !== fi && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), b.type = fi, Nt = r.convert(b.type)), b.format === Us && Pt === i.DEPTH_COMPONENT && (Pt = i.DEPTH_STENCIL, b.type !== Gi && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), b.type = Gi, Nt = r.convert(b.type))), ee && ($t ? e.texStorage2D(i.TEXTURE_2D, 1, Pt, j.width, j.height) : e.texImage2D(i.TEXTURE_2D, 0, Pt, j.width, j.height, 0, Mt, Nt, null));
        else if (b.isDataTexture) if (kt.length > 0 && vt) {
          $t && ee && e.texStorage2D(i.TEXTURE_2D, Ct, Pt, kt[0].width, kt[0].height);
          for (let at = 0, F = kt.length; at < F; at++) It = kt[at], $t ? e.texSubImage2D(i.TEXTURE_2D, at, 0, 0, It.width, It.height, Mt, Nt, It.data) : e.texImage2D(i.TEXTURE_2D, at, Pt, It.width, It.height, 0, Mt, Nt, It.data);
          b.generateMipmaps = false;
        } else $t ? (ee && e.texStorage2D(i.TEXTURE_2D, Ct, Pt, j.width, j.height), e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, j.width, j.height, Mt, Nt, j.data)) : e.texImage2D(i.TEXTURE_2D, 0, Pt, j.width, j.height, 0, Mt, Nt, j.data);
        else if (b.isCompressedTexture) if (b.isCompressedArrayTexture) {
          $t && ee && e.texStorage3D(i.TEXTURE_2D_ARRAY, Ct, Pt, kt[0].width, kt[0].height, j.depth);
          for (let at = 0, F = kt.length; at < F; at++) It = kt[at], b.format !== Ln ? Mt !== null ? $t ? e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, at, 0, 0, 0, It.width, It.height, j.depth, Mt, It.data, 0, 0) : e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, at, Pt, It.width, It.height, j.depth, 0, It.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : $t ? e.texSubImage3D(i.TEXTURE_2D_ARRAY, at, 0, 0, 0, It.width, It.height, j.depth, Mt, Nt, It.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, at, Pt, It.width, It.height, j.depth, 0, Mt, Nt, It.data);
        } else {
          $t && ee && e.texStorage2D(i.TEXTURE_2D, Ct, Pt, kt[0].width, kt[0].height);
          for (let at = 0, F = kt.length; at < F; at++) It = kt[at], b.format !== Ln ? Mt !== null ? $t ? e.compressedTexSubImage2D(i.TEXTURE_2D, at, 0, 0, It.width, It.height, Mt, It.data) : e.compressedTexImage2D(i.TEXTURE_2D, at, Pt, It.width, It.height, 0, It.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : $t ? e.texSubImage2D(i.TEXTURE_2D, at, 0, 0, It.width, It.height, Mt, Nt, It.data) : e.texImage2D(i.TEXTURE_2D, at, Pt, It.width, It.height, 0, Mt, Nt, It.data);
        }
        else if (b.isDataArrayTexture) $t ? (ee && e.texStorage3D(i.TEXTURE_2D_ARRAY, Ct, Pt, j.width, j.height, j.depth), e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, j.width, j.height, j.depth, Mt, Nt, j.data)) : e.texImage3D(i.TEXTURE_2D_ARRAY, 0, Pt, j.width, j.height, j.depth, 0, Mt, Nt, j.data);
        else if (b.isData3DTexture) $t ? (ee && e.texStorage3D(i.TEXTURE_3D, Ct, Pt, j.width, j.height, j.depth), e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, j.width, j.height, j.depth, Mt, Nt, j.data)) : e.texImage3D(i.TEXTURE_3D, 0, Pt, j.width, j.height, j.depth, 0, Mt, Nt, j.data);
        else if (b.isFramebufferTexture) {
          if (ee) if ($t) e.texStorage2D(i.TEXTURE_2D, Ct, Pt, j.width, j.height);
          else {
            let at = j.width, F = j.height;
            for (let _t = 0; _t < Ct; _t++) e.texImage2D(i.TEXTURE_2D, _t, Pt, at, F, 0, Mt, Nt, null), at >>= 1, F >>= 1;
          }
        } else if (kt.length > 0 && vt) {
          $t && ee && e.texStorage2D(i.TEXTURE_2D, Ct, Pt, kt[0].width, kt[0].height);
          for (let at = 0, F = kt.length; at < F; at++) It = kt[at], $t ? e.texSubImage2D(i.TEXTURE_2D, at, 0, 0, Mt, Nt, It) : e.texImage2D(i.TEXTURE_2D, at, Pt, Mt, Nt, It);
          b.generateMipmaps = false;
        } else $t ? (ee && e.texStorage2D(i.TEXTURE_2D, Ct, Pt, j.width, j.height), e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Mt, Nt, j)) : e.texImage2D(i.TEXTURE_2D, 0, Pt, Mt, Nt, j);
        x(b, vt) && v(I), it.__version = B.version, b.onUpdate && b.onUpdate(b);
      }
      y.__version = b.version;
    }
    function dt(y, b, N) {
      if (b.image.length !== 6) return;
      let I = yt(y, b), A = b.source;
      e.bindTexture(i.TEXTURE_CUBE_MAP, y.__webglTexture, i.TEXTURE0 + N);
      let B = n.get(A);
      if (A.version !== B.__version || I === true) {
        e.activeTexture(i.TEXTURE0 + N);
        let it = ge.getPrimaries(ge.workingColorSpace), Z = b.colorSpace === Mn ? null : ge.getPrimaries(b.colorSpace), st = b.colorSpace === Mn || it === Z ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
        i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, b.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, b.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, b.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, st);
        let lt = b.isCompressedTexture || b.image[0].isCompressedTexture, St = b.image[0] && b.image[0].isDataTexture, j = [];
        for (let at = 0; at < 6; at++) !lt && !St ? j[at] = _(b.image[at], false, true, s.maxCubemapSize) : j[at] = St ? b.image[at].image : b.image[at], j[at] = G(b, j[at]);
        let vt = j[0], Mt = m(vt) || o, Nt = r.convert(b.format, b.colorSpace), Pt = r.convert(b.type), It = E(b.internalFormat, Nt, Pt, b.colorSpace), kt = o && b.isVideoTexture !== true, $t = B.__version === void 0 || I === true, ee = R(b, vt, Mt);
        rt(i.TEXTURE_CUBE_MAP, b, Mt);
        let Ct;
        if (lt) {
          kt && $t && e.texStorage2D(i.TEXTURE_CUBE_MAP, ee, It, vt.width, vt.height);
          for (let at = 0; at < 6; at++) {
            Ct = j[at].mipmaps;
            for (let F = 0; F < Ct.length; F++) {
              let _t = Ct[F];
              b.format !== Ln ? Nt !== null ? kt ? e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, F, 0, 0, _t.width, _t.height, Nt, _t.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, F, It, _t.width, _t.height, 0, _t.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : kt ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, F, 0, 0, _t.width, _t.height, Nt, Pt, _t.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, F, It, _t.width, _t.height, 0, Nt, Pt, _t.data);
            }
          }
        } else {
          Ct = b.mipmaps, kt && $t && (Ct.length > 0 && ee++, e.texStorage2D(i.TEXTURE_CUBE_MAP, ee, It, j[0].width, j[0].height));
          for (let at = 0; at < 6; at++) if (St) {
            kt ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, 0, 0, 0, j[at].width, j[at].height, Nt, Pt, j[at].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, 0, It, j[at].width, j[at].height, 0, Nt, Pt, j[at].data);
            for (let F = 0; F < Ct.length; F++) {
              let Tt = Ct[F].image[at].image;
              kt ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, F + 1, 0, 0, Tt.width, Tt.height, Nt, Pt, Tt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, F + 1, It, Tt.width, Tt.height, 0, Nt, Pt, Tt.data);
            }
          } else {
            kt ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, 0, 0, 0, Nt, Pt, j[at]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, 0, It, Nt, Pt, j[at]);
            for (let F = 0; F < Ct.length; F++) {
              let _t = Ct[F];
              kt ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, F + 1, 0, 0, Nt, Pt, _t.image[at]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + at, F + 1, It, Nt, Pt, _t.image[at]);
            }
          }
        }
        x(b, Mt) && v(i.TEXTURE_CUBE_MAP), B.__version = A.version, b.onUpdate && b.onUpdate(b);
      }
      y.__version = b.version;
    }
    function ot(y, b, N, I, A, B) {
      let it = r.convert(N.format, N.colorSpace), Z = r.convert(N.type), st = E(N.internalFormat, it, Z, N.colorSpace);
      if (!n.get(b).__hasExternalTextures) {
        let St = Math.max(1, b.width >> B), j = Math.max(1, b.height >> B);
        A === i.TEXTURE_3D || A === i.TEXTURE_2D_ARRAY ? e.texImage3D(A, B, st, St, j, b.depth, 0, it, Z, null) : e.texImage2D(A, B, st, St, j, 0, it, Z, null);
      }
      e.bindFramebuffer(i.FRAMEBUFFER, y), z(b) ? c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, I, A, n.get(N).__webglTexture, 0, tt(b)) : (A === i.TEXTURE_2D || A >= i.TEXTURE_CUBE_MAP_POSITIVE_X && A <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, I, A, n.get(N).__webglTexture, B), e.bindFramebuffer(i.FRAMEBUFFER, null);
    }
    function bt(y, b, N) {
      if (i.bindRenderbuffer(i.RENDERBUFFER, y), b.depthBuffer && !b.stencilBuffer) {
        let I = o === true ? i.DEPTH_COMPONENT24 : i.DEPTH_COMPONENT16;
        if (N || z(b)) {
          let A = b.depthTexture;
          A && A.isDepthTexture && (A.type === di ? I = i.DEPTH_COMPONENT32F : A.type === fi && (I = i.DEPTH_COMPONENT24));
          let B = tt(b);
          z(b) ? c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, B, I, b.width, b.height) : i.renderbufferStorageMultisample(i.RENDERBUFFER, B, I, b.width, b.height);
        } else i.renderbufferStorage(i.RENDERBUFFER, I, b.width, b.height);
        i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, y);
      } else if (b.depthBuffer && b.stencilBuffer) {
        let I = tt(b);
        N && z(b) === false ? i.renderbufferStorageMultisample(i.RENDERBUFFER, I, i.DEPTH24_STENCIL8, b.width, b.height) : z(b) ? c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, I, i.DEPTH24_STENCIL8, b.width, b.height) : i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, b.width, b.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, y);
      } else {
        let I = b.isWebGLMultipleRenderTargets === true ? b.texture : [b.texture];
        for (let A = 0; A < I.length; A++) {
          let B = I[A], it = r.convert(B.format, B.colorSpace), Z = r.convert(B.type), st = E(B.internalFormat, it, Z, B.colorSpace), lt = tt(b);
          N && z(b) === false ? i.renderbufferStorageMultisample(i.RENDERBUFFER, lt, st, b.width, b.height) : z(b) ? c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, lt, st, b.width, b.height) : i.renderbufferStorage(i.RENDERBUFFER, st, b.width, b.height);
        }
      }
      i.bindRenderbuffer(i.RENDERBUFFER, null);
    }
    function Et(y, b) {
      if (b && b.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
      if (e.bindFramebuffer(i.FRAMEBUFFER, y), !(b.depthTexture && b.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
      (!n.get(b.depthTexture).__webglTexture || b.depthTexture.image.width !== b.width || b.depthTexture.image.height !== b.height) && (b.depthTexture.image.width = b.width, b.depthTexture.image.height = b.height, b.depthTexture.needsUpdate = true), et(b.depthTexture, 0);
      let I = n.get(b.depthTexture).__webglTexture, A = tt(b);
      if (b.depthTexture.format === Vi) z(b) ? c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, I, 0, A) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, I, 0);
      else if (b.depthTexture.format === Us) z(b) ? c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, I, 0, A) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, I, 0);
      else throw new Error("Unknown depthTexture format");
    }
    function O(y) {
      let b = n.get(y), N = y.isWebGLCubeRenderTarget === true;
      if (y.depthTexture && !b.__autoAllocateDepthBuffer) {
        if (N) throw new Error("target.depthTexture not supported in Cube render targets");
        Et(b.__webglFramebuffer, y);
      } else if (N) {
        b.__webglDepthbuffer = [];
        for (let I = 0; I < 6; I++) e.bindFramebuffer(i.FRAMEBUFFER, b.__webglFramebuffer[I]), b.__webglDepthbuffer[I] = i.createRenderbuffer(), bt(b.__webglDepthbuffer[I], y, false);
      } else e.bindFramebuffer(i.FRAMEBUFFER, b.__webglFramebuffer), b.__webglDepthbuffer = i.createRenderbuffer(), bt(b.__webglDepthbuffer, y, false);
      e.bindFramebuffer(i.FRAMEBUFFER, null);
    }
    function W(y, b, N) {
      let I = n.get(y);
      b !== void 0 && ot(I.__webglFramebuffer, y, y.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), N !== void 0 && O(y);
    }
    function L(y) {
      let b = y.texture, N = n.get(y), I = n.get(b);
      y.addEventListener("dispose", U), y.isWebGLMultipleRenderTargets !== true && (I.__webglTexture === void 0 && (I.__webglTexture = i.createTexture()), I.__version = b.version, a.memory.textures++);
      let A = y.isWebGLCubeRenderTarget === true, B = y.isWebGLMultipleRenderTargets === true, it = m(y) || o;
      if (A) {
        N.__webglFramebuffer = [];
        for (let Z = 0; Z < 6; Z++) if (o && b.mipmaps && b.mipmaps.length > 0) {
          N.__webglFramebuffer[Z] = [];
          for (let st = 0; st < b.mipmaps.length; st++) N.__webglFramebuffer[Z][st] = i.createFramebuffer();
        } else N.__webglFramebuffer[Z] = i.createFramebuffer();
      } else {
        if (o && b.mipmaps && b.mipmaps.length > 0) {
          N.__webglFramebuffer = [];
          for (let Z = 0; Z < b.mipmaps.length; Z++) N.__webglFramebuffer[Z] = i.createFramebuffer();
        } else N.__webglFramebuffer = i.createFramebuffer();
        if (B) if (s.drawBuffers) {
          let Z = y.texture;
          for (let st = 0, lt = Z.length; st < lt; st++) {
            let St = n.get(Z[st]);
            St.__webglTexture === void 0 && (St.__webglTexture = i.createTexture(), a.memory.textures++);
          }
        } else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
        if (o && y.samples > 0 && z(y) === false) {
          let Z = B ? b : [b];
          N.__webglMultisampledFramebuffer = i.createFramebuffer(), N.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, N.__webglMultisampledFramebuffer);
          for (let st = 0; st < Z.length; st++) {
            let lt = Z[st];
            N.__webglColorRenderbuffer[st] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, N.__webglColorRenderbuffer[st]);
            let St = r.convert(lt.format, lt.colorSpace), j = r.convert(lt.type), vt = E(lt.internalFormat, St, j, lt.colorSpace, y.isXRRenderTarget === true), Mt = tt(y);
            i.renderbufferStorageMultisample(i.RENDERBUFFER, Mt, vt, y.width, y.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + st, i.RENDERBUFFER, N.__webglColorRenderbuffer[st]);
          }
          i.bindRenderbuffer(i.RENDERBUFFER, null), y.depthBuffer && (N.__webglDepthRenderbuffer = i.createRenderbuffer(), bt(N.__webglDepthRenderbuffer, y, true)), e.bindFramebuffer(i.FRAMEBUFFER, null);
        }
      }
      if (A) {
        e.bindTexture(i.TEXTURE_CUBE_MAP, I.__webglTexture), rt(i.TEXTURE_CUBE_MAP, b, it);
        for (let Z = 0; Z < 6; Z++) if (o && b.mipmaps && b.mipmaps.length > 0) for (let st = 0; st < b.mipmaps.length; st++) ot(N.__webglFramebuffer[Z][st], y, b, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, st);
        else ot(N.__webglFramebuffer[Z], y, b, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0);
        x(b, it) && v(i.TEXTURE_CUBE_MAP), e.unbindTexture();
      } else if (B) {
        let Z = y.texture;
        for (let st = 0, lt = Z.length; st < lt; st++) {
          let St = Z[st], j = n.get(St);
          e.bindTexture(i.TEXTURE_2D, j.__webglTexture), rt(i.TEXTURE_2D, St, it), ot(N.__webglFramebuffer, y, St, i.COLOR_ATTACHMENT0 + st, i.TEXTURE_2D, 0), x(St, it) && v(i.TEXTURE_2D);
        }
        e.unbindTexture();
      } else {
        let Z = i.TEXTURE_2D;
        if ((y.isWebGL3DRenderTarget || y.isWebGLArrayRenderTarget) && (o ? Z = y.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), e.bindTexture(Z, I.__webglTexture), rt(Z, b, it), o && b.mipmaps && b.mipmaps.length > 0) for (let st = 0; st < b.mipmaps.length; st++) ot(N.__webglFramebuffer[st], y, b, i.COLOR_ATTACHMENT0, Z, st);
        else ot(N.__webglFramebuffer, y, b, i.COLOR_ATTACHMENT0, Z, 0);
        x(b, it) && v(Z), e.unbindTexture();
      }
      y.depthBuffer && O(y);
    }
    function ct(y) {
      let b = m(y) || o, N = y.isWebGLMultipleRenderTargets === true ? y.texture : [y.texture];
      for (let I = 0, A = N.length; I < A; I++) {
        let B = N[I];
        if (x(B, b)) {
          let it = y.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D, Z = n.get(B).__webglTexture;
          e.bindTexture(it, Z), v(it), e.unbindTexture();
        }
      }
    }
    function X(y) {
      if (o && y.samples > 0 && z(y) === false) {
        let b = y.isWebGLMultipleRenderTargets ? y.texture : [y.texture], N = y.width, I = y.height, A = i.COLOR_BUFFER_BIT, B = [], it = y.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = n.get(y), st = y.isWebGLMultipleRenderTargets === true;
        if (st) for (let lt = 0; lt < b.length; lt++) e.bindFramebuffer(i.FRAMEBUFFER, Z.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + lt, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, Z.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + lt, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, Z.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, Z.__webglFramebuffer);
        for (let lt = 0; lt < b.length; lt++) {
          B.push(i.COLOR_ATTACHMENT0 + lt), y.depthBuffer && B.push(it);
          let St = Z.__ignoreDepthValues !== void 0 ? Z.__ignoreDepthValues : false;
          if (St === false && (y.depthBuffer && (A |= i.DEPTH_BUFFER_BIT), y.stencilBuffer && (A |= i.STENCIL_BUFFER_BIT)), st && i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, Z.__webglColorRenderbuffer[lt]), St === true && (i.invalidateFramebuffer(i.READ_FRAMEBUFFER, [it]), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [it])), st) {
            let j = n.get(b[lt]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, j, 0);
          }
          i.blitFramebuffer(0, 0, N, I, 0, 0, N, I, A, i.NEAREST), l && i.invalidateFramebuffer(i.READ_FRAMEBUFFER, B);
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), st) for (let lt = 0; lt < b.length; lt++) {
          e.bindFramebuffer(i.FRAMEBUFFER, Z.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + lt, i.RENDERBUFFER, Z.__webglColorRenderbuffer[lt]);
          let St = n.get(b[lt]).__webglTexture;
          e.bindFramebuffer(i.FRAMEBUFFER, Z.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + lt, i.TEXTURE_2D, St, 0);
        }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, Z.__webglMultisampledFramebuffer);
      }
    }
    function tt(y) {
      return Math.min(s.maxSamples, y.samples);
    }
    function z(y) {
      let b = n.get(y);
      return o && y.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === true && b.__useRenderToTexture !== false;
    }
    function D(y) {
      let b = a.render.frame;
      u.get(y) !== b && (u.set(y, b), y.update());
    }
    function G(y, b) {
      let N = y.colorSpace, I = y.format, A = y.type;
      return y.isCompressedTexture === true || y.isVideoTexture === true || y.format === ec || N !== ii && N !== Mn && (ge.getTransfer(N) === Me ? o === false ? t.has("EXT_sRGB") === true && I === Ln ? (y.format = ec, y.minFilter = yn, y.generateMipmaps = false) : b = Mo.sRGBToLinear(b) : (I !== Ln || A !== gi) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", N)), b;
    }
    this.allocateTextureUnit = H, this.resetTextureUnits = ht, this.setTexture2D = et, this.setTexture2DArray = pt, this.setTexture3D = V, this.setTextureCube = C, this.rebindTextures = W, this.setupRenderTarget = L, this.updateRenderTargetMipmap = ct, this.updateMultisampleRenderTarget = X, this.setupDepthRenderbuffer = O, this.setupFrameBufferTexture = ot, this.useMultisampledRTT = z;
  }
  function cx(i, t, e) {
    let n = e.isWebGL2;
    function s(r, a = Mn) {
      let o, c = ge.getTransfer(a);
      if (r === gi) return i.UNSIGNED_BYTE;
      if (r === su) return i.UNSIGNED_SHORT_4_4_4_4;
      if (r === ru) return i.UNSIGNED_SHORT_5_5_5_1;
      if (r === nd) return i.BYTE;
      if (r === id) return i.SHORT;
      if (r === Vc) return i.UNSIGNED_SHORT;
      if (r === iu) return i.INT;
      if (r === fi) return i.UNSIGNED_INT;
      if (r === di) return i.FLOAT;
      if (r === mn) return n ? i.HALF_FLOAT : (o = t.get("OES_texture_half_float"), o !== null ? o.HALF_FLOAT_OES : null);
      if (r === sd) return i.ALPHA;
      if (r === Ln) return i.RGBA;
      if (r === rd) return i.LUMINANCE;
      if (r === od) return i.LUMINANCE_ALPHA;
      if (r === Vi) return i.DEPTH_COMPONENT;
      if (r === Us) return i.DEPTH_STENCIL;
      if (r === ec) return o = t.get("EXT_sRGB"), o !== null ? o.SRGB_ALPHA_EXT : null;
      if (r === ad) return i.RED;
      if (r === ou) return i.RED_INTEGER;
      if (r === cd) return i.RG;
      if (r === au) return i.RG_INTEGER;
      if (r === cu) return i.RGBA_INTEGER;
      if (r === ga || r === xa || r === _a || r === va) if (c === Me) if (o = t.get("WEBGL_compressed_texture_s3tc_srgb"), o !== null) {
        if (r === ga) return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (r === xa) return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (r === _a) return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (r === va) return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else return null;
      else if (o = t.get("WEBGL_compressed_texture_s3tc"), o !== null) {
        if (r === ga) return o.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (r === xa) return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (r === _a) return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (r === va) return o.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else return null;
      if (r === Tl || r === Al || r === Rl || r === Cl) if (o = t.get("WEBGL_compressed_texture_pvrtc"), o !== null) {
        if (r === Tl) return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (r === Al) return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (r === Rl) return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (r === Cl) return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
      if (r === lu) return o = t.get("WEBGL_compressed_texture_etc1"), o !== null ? o.COMPRESSED_RGB_ETC1_WEBGL : null;
      if (r === Pl || r === Ll) if (o = t.get("WEBGL_compressed_texture_etc"), o !== null) {
        if (r === Pl) return c === Me ? o.COMPRESSED_SRGB8_ETC2 : o.COMPRESSED_RGB8_ETC2;
        if (r === Ll) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : o.COMPRESSED_RGBA8_ETC2_EAC;
      } else return null;
      if (r === Il || r === Ul || r === Dl || r === Nl || r === Ol || r === Fl || r === zl || r === Bl || r === kl || r === Hl || r === Gl || r === Vl || r === Wl || r === Xl) if (o = t.get("WEBGL_compressed_texture_astc"), o !== null) {
        if (r === Il) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : o.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (r === Ul) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : o.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (r === Dl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : o.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (r === Nl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : o.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (r === Ol) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : o.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (r === Fl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : o.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (r === zl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : o.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (r === Bl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : o.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (r === kl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : o.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (r === Hl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : o.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (r === Gl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : o.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (r === Vl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : o.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (r === Wl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : o.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (r === Xl) return c === Me ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : o.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
      if (r === ya || r === ql || r === Yl) if (o = t.get("EXT_texture_compression_bptc"), o !== null) {
        if (r === ya) return c === Me ? o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : o.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (r === ql) return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (r === Yl) return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
      if (r === ld || r === Zl || r === Jl || r === $l) if (o = t.get("EXT_texture_compression_rgtc"), o !== null) {
        if (r === ya) return o.COMPRESSED_RED_RGTC1_EXT;
        if (r === Zl) return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (r === Jl) return o.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (r === $l) return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
      return r === Gi ? n ? i.UNSIGNED_INT_24_8 : (o = t.get("WEBGL_depth_texture"), o !== null ? o.UNSIGNED_INT_24_8_WEBGL : null) : i[r] !== void 0 ? i[r] : null;
    }
    return { convert: s };
  }
  var gc = class extends nn {
    constructor(t = []) {
      super(), this.isArrayCamera = true, this.cameras = t;
    }
  }, pe = class extends $e {
    constructor() {
      super(), this.isGroup = true, this.type = "Group";
    }
  }, lx = { type: "move" }, lr = class {
    constructor() {
      this._targetRay = null, this._grip = null, this._hand = null;
    }
    getHandSpace() {
      return this._hand === null && (this._hand = new pe(), this._hand.matrixAutoUpdate = false, this._hand.visible = false, this._hand.joints = {}, this._hand.inputState = { pinching: false }), this._hand;
    }
    getTargetRaySpace() {
      return this._targetRay === null && (this._targetRay = new pe(), this._targetRay.matrixAutoUpdate = false, this._targetRay.visible = false, this._targetRay.hasLinearVelocity = false, this._targetRay.linearVelocity = new Y(), this._targetRay.hasAngularVelocity = false, this._targetRay.angularVelocity = new Y()), this._targetRay;
    }
    getGripSpace() {
      return this._grip === null && (this._grip = new pe(), this._grip.matrixAutoUpdate = false, this._grip.visible = false, this._grip.hasLinearVelocity = false, this._grip.linearVelocity = new Y(), this._grip.hasAngularVelocity = false, this._grip.angularVelocity = new Y()), this._grip;
    }
    dispatchEvent(t) {
      return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
    }
    connect(t) {
      if (t && t.hand) {
        let e = this._hand;
        if (e) for (let n of t.hand.values()) this._getHandJoint(e, n);
      }
      return this.dispatchEvent({ type: "connected", data: t }), this;
    }
    disconnect(t) {
      return this.dispatchEvent({ type: "disconnected", data: t }), this._targetRay !== null && (this._targetRay.visible = false), this._grip !== null && (this._grip.visible = false), this._hand !== null && (this._hand.visible = false), this;
    }
    update(t, e, n) {
      let s = null, r = null, a = null, o = this._targetRay, c = this._grip, l = this._hand;
      if (t && e.session.visibilityState !== "visible-blurred") {
        if (l && t.hand) {
          a = true;
          for (let _ of t.hand.values()) {
            let m = e.getJointPose(_, n), p = this._getHandJoint(l, _);
            m !== null && (p.matrix.fromArray(m.transform.matrix), p.matrix.decompose(p.position, p.rotation, p.scale), p.matrixWorldNeedsUpdate = true, p.jointRadius = m.radius), p.visible = m !== null;
          }
          let u = l.joints["index-finger-tip"], h = l.joints["thumb-tip"], f = u.position.distanceTo(h.position), d = 0.02, g = 5e-3;
          l.inputState.pinching && f > d + g ? (l.inputState.pinching = false, this.dispatchEvent({ type: "pinchend", handedness: t.handedness, target: this })) : !l.inputState.pinching && f <= d - g && (l.inputState.pinching = true, this.dispatchEvent({ type: "pinchstart", handedness: t.handedness, target: this }));
        } else c !== null && t.gripSpace && (r = e.getPose(t.gripSpace, n), r !== null && (c.matrix.fromArray(r.transform.matrix), c.matrix.decompose(c.position, c.rotation, c.scale), c.matrixWorldNeedsUpdate = true, r.linearVelocity ? (c.hasLinearVelocity = true, c.linearVelocity.copy(r.linearVelocity)) : c.hasLinearVelocity = false, r.angularVelocity ? (c.hasAngularVelocity = true, c.angularVelocity.copy(r.angularVelocity)) : c.hasAngularVelocity = false));
        o !== null && (s = e.getPose(t.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (o.matrix.fromArray(s.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = true, s.linearVelocity ? (o.hasLinearVelocity = true, o.linearVelocity.copy(s.linearVelocity)) : o.hasLinearVelocity = false, s.angularVelocity ? (o.hasAngularVelocity = true, o.angularVelocity.copy(s.angularVelocity)) : o.hasAngularVelocity = false, this.dispatchEvent(lx)));
      }
      return o !== null && (o.visible = s !== null), c !== null && (c.visible = r !== null), l !== null && (l.visible = a !== null), this;
    }
    _getHandJoint(t, e) {
      if (t.joints[e.jointName] === void 0) {
        let n = new pe();
        n.matrixAutoUpdate = false, n.visible = false, t.joints[e.jointName] = n, t.add(n);
      }
      return t.joints[e.jointName];
    }
  }, xc = class extends _i {
    constructor(t, e) {
      super();
      let n = this, s = null, r = 1, a = null, o = "local-floor", c = 1, l = null, u = null, h = null, f = null, d = null, g = null, _ = e.getContextAttributes(), m = null, p = null, x = [], v = [], E = new Bt(), R = null, w = new nn();
      w.layers.enable(1), w.viewport = new Pe();
      let T = new nn();
      T.layers.enable(2), T.viewport = new Pe();
      let U = [w, T], M = new gc();
      M.layers.enable(1), M.layers.enable(2);
      let S = null, q = null;
      this.cameraAutoUpdate = true, this.enabled = false, this.isPresenting = false, this.getController = function(rt) {
        let yt = x[rt];
        return yt === void 0 && (yt = new lr(), x[rt] = yt), yt.getTargetRaySpace();
      }, this.getControllerGrip = function(rt) {
        let yt = x[rt];
        return yt === void 0 && (yt = new lr(), x[rt] = yt), yt.getGripSpace();
      }, this.getHand = function(rt) {
        let yt = x[rt];
        return yt === void 0 && (yt = new lr(), x[rt] = yt), yt.getHandSpace();
      };
      function J(rt) {
        let yt = v.indexOf(rt.inputSource);
        if (yt === -1) return;
        let wt = x[yt];
        wt !== void 0 && (wt.update(rt.inputSource, rt.frame, l || a), wt.dispatchEvent({ type: rt.type, data: rt.inputSource }));
      }
      function ht() {
        s.removeEventListener("select", J), s.removeEventListener("selectstart", J), s.removeEventListener("selectend", J), s.removeEventListener("squeeze", J), s.removeEventListener("squeezestart", J), s.removeEventListener("squeezeend", J), s.removeEventListener("end", ht), s.removeEventListener("inputsourceschange", H);
        for (let rt = 0; rt < x.length; rt++) {
          let yt = v[rt];
          yt !== null && (v[rt] = null, x[rt].disconnect(yt));
        }
        S = null, q = null, t.setRenderTarget(m), d = null, f = null, h = null, s = null, p = null, At.stop(), n.isPresenting = false, t.setPixelRatio(R), t.setSize(E.width, E.height, false), n.dispatchEvent({ type: "sessionend" });
      }
      this.setFramebufferScaleFactor = function(rt) {
        r = rt, n.isPresenting === true && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
      }, this.setReferenceSpaceType = function(rt) {
        o = rt, n.isPresenting === true && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
      }, this.getReferenceSpace = function() {
        return l || a;
      }, this.setReferenceSpace = function(rt) {
        l = rt;
      }, this.getBaseLayer = function() {
        return f !== null ? f : d;
      }, this.getBinding = function() {
        return h;
      }, this.getFrame = function() {
        return g;
      }, this.getSession = function() {
        return s;
      }, this.setSession = async function(rt) {
        if (s = rt, s !== null) {
          if (m = t.getRenderTarget(), s.addEventListener("select", J), s.addEventListener("selectstart", J), s.addEventListener("selectend", J), s.addEventListener("squeeze", J), s.addEventListener("squeezestart", J), s.addEventListener("squeezeend", J), s.addEventListener("end", ht), s.addEventListener("inputsourceschange", H), _.xrCompatible !== true && await e.makeXRCompatible(), R = t.getPixelRatio(), t.getSize(E), s.renderState.layers === void 0 || t.capabilities.isWebGL2 === false) {
            let yt = { antialias: s.renderState.layers === void 0 ? _.antialias : true, alpha: true, depth: _.depth, stencil: _.stencil, framebufferScaleFactor: r };
            d = new XRWebGLLayer(s, e, yt), s.updateRenderState({ baseLayer: d }), t.setPixelRatio(1), t.setSize(d.framebufferWidth, d.framebufferHeight, false), p = new Je(d.framebufferWidth, d.framebufferHeight, { format: Ln, type: gi, colorSpace: t.outputColorSpace, stencilBuffer: _.stencil });
          } else {
            let yt = null, wt = null, dt = null;
            _.depth && (dt = _.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, yt = _.stencil ? Us : Vi, wt = _.stencil ? Gi : fi);
            let ot = { colorFormat: e.RGBA8, depthFormat: dt, scaleFactor: r };
            h = new XRWebGLBinding(s, e), f = h.createProjectionLayer(ot), s.updateRenderState({ layers: [f] }), t.setPixelRatio(1), t.setSize(f.textureWidth, f.textureHeight, false), p = new Je(f.textureWidth, f.textureHeight, { format: Ln, type: gi, depthTexture: new Ro(f.textureWidth, f.textureHeight, wt, void 0, void 0, void 0, void 0, void 0, void 0, yt), stencilBuffer: _.stencil, colorSpace: t.outputColorSpace, samples: _.antialias ? 4 : 0 });
            let bt = t.properties.get(p);
            bt.__ignoreDepthValues = f.ignoreDepthValues;
          }
          p.isXRRenderTarget = true, this.setFoveation(c), l = null, a = await s.requestReferenceSpace(o), At.setContext(s), At.start(), n.isPresenting = true, n.dispatchEvent({ type: "sessionstart" });
        }
      }, this.getEnvironmentBlendMode = function() {
        if (s !== null) return s.environmentBlendMode;
      };
      function H(rt) {
        for (let yt = 0; yt < rt.removed.length; yt++) {
          let wt = rt.removed[yt], dt = v.indexOf(wt);
          dt >= 0 && (v[dt] = null, x[dt].disconnect(wt));
        }
        for (let yt = 0; yt < rt.added.length; yt++) {
          let wt = rt.added[yt], dt = v.indexOf(wt);
          if (dt === -1) {
            for (let bt = 0; bt < x.length; bt++) if (bt >= v.length) {
              v.push(wt), dt = bt;
              break;
            } else if (v[bt] === null) {
              v[bt] = wt, dt = bt;
              break;
            }
            if (dt === -1) break;
          }
          let ot = x[dt];
          ot && ot.connect(wt);
        }
      }
      let $ = new Y(), et = new Y();
      function pt(rt, yt, wt) {
        $.setFromMatrixPosition(yt.matrixWorld), et.setFromMatrixPosition(wt.matrixWorld);
        let dt = $.distanceTo(et), ot = yt.projectionMatrix.elements, bt = wt.projectionMatrix.elements, Et = ot[14] / (ot[10] - 1), O = ot[14] / (ot[10] + 1), W = (ot[9] + 1) / ot[5], L = (ot[9] - 1) / ot[5], ct = (ot[8] - 1) / ot[0], X = (bt[8] + 1) / bt[0], tt = Et * ct, z = Et * X, D = dt / (-ct + X), G = D * -ct;
        yt.matrixWorld.decompose(rt.position, rt.quaternion, rt.scale), rt.translateX(G), rt.translateZ(D), rt.matrixWorld.compose(rt.position, rt.quaternion, rt.scale), rt.matrixWorldInverse.copy(rt.matrixWorld).invert();
        let y = Et + D, b = O + D, N = tt - G, I = z + (dt - G), A = W * O / b * y, B = L * O / b * y;
        rt.projectionMatrix.makePerspective(N, I, A, B, y, b), rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert();
      }
      function V(rt, yt) {
        yt === null ? rt.matrixWorld.copy(rt.matrix) : rt.matrixWorld.multiplyMatrices(yt.matrixWorld, rt.matrix), rt.matrixWorldInverse.copy(rt.matrixWorld).invert();
      }
      this.updateCamera = function(rt) {
        if (s === null) return;
        M.near = T.near = w.near = rt.near, M.far = T.far = w.far = rt.far, (S !== M.near || q !== M.far) && (s.updateRenderState({ depthNear: M.near, depthFar: M.far }), S = M.near, q = M.far);
        let yt = rt.parent, wt = M.cameras;
        V(M, yt);
        for (let dt = 0; dt < wt.length; dt++) V(wt[dt], yt);
        wt.length === 2 ? pt(M, w, T) : M.projectionMatrix.copy(w.projectionMatrix), C(rt, M, yt);
      };
      function C(rt, yt, wt) {
        wt === null ? rt.matrix.copy(yt.matrixWorld) : (rt.matrix.copy(wt.matrixWorld), rt.matrix.invert(), rt.matrix.multiply(yt.matrixWorld)), rt.matrix.decompose(rt.position, rt.quaternion, rt.scale), rt.updateMatrixWorld(true), rt.projectionMatrix.copy(yt.projectionMatrix), rt.projectionMatrixInverse.copy(yt.projectionMatrixInverse), rt.isPerspectiveCamera && (rt.fov = nc * 2 * Math.atan(1 / rt.projectionMatrix.elements[5]), rt.zoom = 1);
      }
      this.getCamera = function() {
        return M;
      }, this.getFoveation = function() {
        if (!(f === null && d === null)) return c;
      }, this.setFoveation = function(rt) {
        c = rt, f !== null && (f.fixedFoveation = rt), d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = rt);
      };
      let gt = null;
      function xt(rt, yt) {
        if (u = yt.getViewerPose(l || a), g = yt, u !== null) {
          let wt = u.views;
          d !== null && (t.setRenderTargetFramebuffer(p, d.framebuffer), t.setRenderTarget(p));
          let dt = false;
          wt.length !== M.cameras.length && (M.cameras.length = 0, dt = true);
          for (let ot = 0; ot < wt.length; ot++) {
            let bt = wt[ot], Et = null;
            if (d !== null) Et = d.getViewport(bt);
            else {
              let W = h.getViewSubImage(f, bt);
              Et = W.viewport, ot === 0 && (t.setRenderTargetTextures(p, W.colorTexture, f.ignoreDepthValues ? void 0 : W.depthStencilTexture), t.setRenderTarget(p));
            }
            let O = U[ot];
            O === void 0 && (O = new nn(), O.layers.enable(ot), O.viewport = new Pe(), U[ot] = O), O.matrix.fromArray(bt.transform.matrix), O.matrix.decompose(O.position, O.quaternion, O.scale), O.projectionMatrix.fromArray(bt.projectionMatrix), O.projectionMatrixInverse.copy(O.projectionMatrix).invert(), O.viewport.set(Et.x, Et.y, Et.width, Et.height), ot === 0 && (M.matrix.copy(O.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), dt === true && M.cameras.push(O);
          }
        }
        for (let wt = 0; wt < x.length; wt++) {
          let dt = v[wt], ot = x[wt];
          dt !== null && ot !== void 0 && ot.update(dt, yt, l || a);
        }
        gt && gt(rt, yt), yt.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: yt }), g = null;
      }
      let At = new gu();
      At.setAnimationLoop(xt), this.setAnimationLoop = function(rt) {
        gt = rt;
      }, this.dispose = function() {
      };
    }
  };
  function hx(i, t) {
    function e(m, p) {
      m.matrixAutoUpdate === true && m.updateMatrix(), p.value.copy(m.matrix);
    }
    function n(m, p) {
      p.color.getRGB(m.fogColor.value, mu(i)), p.isFog ? (m.fogNear.value = p.near, m.fogFar.value = p.far) : p.isFogExp2 && (m.fogDensity.value = p.density);
    }
    function s(m, p, x, v, E) {
      p.isMeshBasicMaterial || p.isMeshLambertMaterial ? r(m, p) : p.isMeshToonMaterial ? (r(m, p), h(m, p)) : p.isMeshPhongMaterial ? (r(m, p), u(m, p)) : p.isMeshStandardMaterial ? (r(m, p), f(m, p), p.isMeshPhysicalMaterial && d(m, p, E)) : p.isMeshMatcapMaterial ? (r(m, p), g(m, p)) : p.isMeshDepthMaterial ? r(m, p) : p.isMeshDistanceMaterial ? (r(m, p), _(m, p)) : p.isMeshNormalMaterial ? r(m, p) : p.isLineBasicMaterial ? (a(m, p), p.isLineDashedMaterial && o(m, p)) : p.isPointsMaterial ? c(m, p, x, v) : p.isSpriteMaterial ? l(m, p) : p.isShadowMaterial ? (m.color.value.copy(p.color), m.opacity.value = p.opacity) : p.isShaderMaterial && (p.uniformsNeedUpdate = false);
    }
    function r(m, p) {
      m.opacity.value = p.opacity, p.color && m.diffuse.value.copy(p.color), p.emissive && m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity), p.map && (m.map.value = p.map, e(p.map, m.mapTransform)), p.alphaMap && (m.alphaMap.value = p.alphaMap, e(p.alphaMap, m.alphaMapTransform)), p.bumpMap && (m.bumpMap.value = p.bumpMap, e(p.bumpMap, m.bumpMapTransform), m.bumpScale.value = p.bumpScale, p.side === Ze && (m.bumpScale.value *= -1)), p.normalMap && (m.normalMap.value = p.normalMap, e(p.normalMap, m.normalMapTransform), m.normalScale.value.copy(p.normalScale), p.side === Ze && m.normalScale.value.negate()), p.displacementMap && (m.displacementMap.value = p.displacementMap, e(p.displacementMap, m.displacementMapTransform), m.displacementScale.value = p.displacementScale, m.displacementBias.value = p.displacementBias), p.emissiveMap && (m.emissiveMap.value = p.emissiveMap, e(p.emissiveMap, m.emissiveMapTransform)), p.specularMap && (m.specularMap.value = p.specularMap, e(p.specularMap, m.specularMapTransform)), p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest);
      let x = t.get(p).envMap;
      if (x && (m.envMap.value = x, m.flipEnvMap.value = x.isCubeTexture && x.isRenderTargetTexture === false ? -1 : 1, m.reflectivity.value = p.reflectivity, m.ior.value = p.ior, m.refractionRatio.value = p.refractionRatio), p.lightMap) {
        m.lightMap.value = p.lightMap;
        let v = i._useLegacyLights === true ? Math.PI : 1;
        m.lightMapIntensity.value = p.lightMapIntensity * v, e(p.lightMap, m.lightMapTransform);
      }
      p.aoMap && (m.aoMap.value = p.aoMap, m.aoMapIntensity.value = p.aoMapIntensity, e(p.aoMap, m.aoMapTransform));
    }
    function a(m, p) {
      m.diffuse.value.copy(p.color), m.opacity.value = p.opacity, p.map && (m.map.value = p.map, e(p.map, m.mapTransform));
    }
    function o(m, p) {
      m.dashSize.value = p.dashSize, m.totalSize.value = p.dashSize + p.gapSize, m.scale.value = p.scale;
    }
    function c(m, p, x, v) {
      m.diffuse.value.copy(p.color), m.opacity.value = p.opacity, m.size.value = p.size * x, m.scale.value = v * 0.5, p.map && (m.map.value = p.map, e(p.map, m.uvTransform)), p.alphaMap && (m.alphaMap.value = p.alphaMap, e(p.alphaMap, m.alphaMapTransform)), p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest);
    }
    function l(m, p) {
      m.diffuse.value.copy(p.color), m.opacity.value = p.opacity, m.rotation.value = p.rotation, p.map && (m.map.value = p.map, e(p.map, m.mapTransform)), p.alphaMap && (m.alphaMap.value = p.alphaMap, e(p.alphaMap, m.alphaMapTransform)), p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest);
    }
    function u(m, p) {
      m.specular.value.copy(p.specular), m.shininess.value = Math.max(p.shininess, 1e-4);
    }
    function h(m, p) {
      p.gradientMap && (m.gradientMap.value = p.gradientMap);
    }
    function f(m, p) {
      m.metalness.value = p.metalness, p.metalnessMap && (m.metalnessMap.value = p.metalnessMap, e(p.metalnessMap, m.metalnessMapTransform)), m.roughness.value = p.roughness, p.roughnessMap && (m.roughnessMap.value = p.roughnessMap, e(p.roughnessMap, m.roughnessMapTransform)), t.get(p).envMap && (m.envMapIntensity.value = p.envMapIntensity);
    }
    function d(m, p, x) {
      m.ior.value = p.ior, p.sheen > 0 && (m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen), m.sheenRoughness.value = p.sheenRoughness, p.sheenColorMap && (m.sheenColorMap.value = p.sheenColorMap, e(p.sheenColorMap, m.sheenColorMapTransform)), p.sheenRoughnessMap && (m.sheenRoughnessMap.value = p.sheenRoughnessMap, e(p.sheenRoughnessMap, m.sheenRoughnessMapTransform))), p.clearcoat > 0 && (m.clearcoat.value = p.clearcoat, m.clearcoatRoughness.value = p.clearcoatRoughness, p.clearcoatMap && (m.clearcoatMap.value = p.clearcoatMap, e(p.clearcoatMap, m.clearcoatMapTransform)), p.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = p.clearcoatRoughnessMap, e(p.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), p.clearcoatNormalMap && (m.clearcoatNormalMap.value = p.clearcoatNormalMap, e(p.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale), p.side === Ze && m.clearcoatNormalScale.value.negate())), p.iridescence > 0 && (m.iridescence.value = p.iridescence, m.iridescenceIOR.value = p.iridescenceIOR, m.iridescenceThicknessMinimum.value = p.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = p.iridescenceThicknessRange[1], p.iridescenceMap && (m.iridescenceMap.value = p.iridescenceMap, e(p.iridescenceMap, m.iridescenceMapTransform)), p.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = p.iridescenceThicknessMap, e(p.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), p.transmission > 0 && (m.transmission.value = p.transmission, m.transmissionSamplerMap.value = x.texture, m.transmissionSamplerSize.value.set(x.width, x.height), p.transmissionMap && (m.transmissionMap.value = p.transmissionMap, e(p.transmissionMap, m.transmissionMapTransform)), m.thickness.value = p.thickness, p.thicknessMap && (m.thicknessMap.value = p.thicknessMap, e(p.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = p.attenuationDistance, m.attenuationColor.value.copy(p.attenuationColor)), p.anisotropy > 0 && (m.anisotropyVector.value.set(p.anisotropy * Math.cos(p.anisotropyRotation), p.anisotropy * Math.sin(p.anisotropyRotation)), p.anisotropyMap && (m.anisotropyMap.value = p.anisotropyMap, e(p.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = p.specularIntensity, m.specularColor.value.copy(p.specularColor), p.specularColorMap && (m.specularColorMap.value = p.specularColorMap, e(p.specularColorMap, m.specularColorMapTransform)), p.specularIntensityMap && (m.specularIntensityMap.value = p.specularIntensityMap, e(p.specularIntensityMap, m.specularIntensityMapTransform));
    }
    function g(m, p) {
      p.matcap && (m.matcap.value = p.matcap);
    }
    function _(m, p) {
      let x = t.get(p).light;
      m.referencePosition.value.setFromMatrixPosition(x.matrixWorld), m.nearDistance.value = x.shadow.camera.near, m.farDistance.value = x.shadow.camera.far;
    }
    return { refreshFogUniforms: n, refreshMaterialUniforms: s };
  }
  function ux(i, t, e, n) {
    let s = {}, r = {}, a = [], o = e.isWebGL2 ? i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
    function c(x, v) {
      let E = v.program;
      n.uniformBlockBinding(x, E);
    }
    function l(x, v) {
      let E = s[x.id];
      E === void 0 && (g(x), E = u(x), s[x.id] = E, x.addEventListener("dispose", m));
      let R = v.program;
      n.updateUBOMapping(x, R);
      let w = t.render.frame;
      r[x.id] !== w && (f(x), r[x.id] = w);
    }
    function u(x) {
      let v = h();
      x.__bindingPointIndex = v;
      let E = i.createBuffer(), R = x.__size, w = x.usage;
      return i.bindBuffer(i.UNIFORM_BUFFER, E), i.bufferData(i.UNIFORM_BUFFER, R, w), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, v, E), E;
    }
    function h() {
      for (let x = 0; x < o; x++) if (a.indexOf(x) === -1) return a.push(x), x;
      return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
    }
    function f(x) {
      let v = s[x.id], E = x.uniforms, R = x.__cache;
      i.bindBuffer(i.UNIFORM_BUFFER, v);
      for (let w = 0, T = E.length; w < T; w++) {
        let U = Array.isArray(E[w]) ? E[w] : [E[w]];
        for (let M = 0, S = U.length; M < S; M++) {
          let q = U[M];
          if (d(q, w, M, R) === true) {
            let J = q.__offset, ht = Array.isArray(q.value) ? q.value : [q.value], H = 0;
            for (let $ = 0; $ < ht.length; $++) {
              let et = ht[$], pt = _(et);
              typeof et == "number" || typeof et == "boolean" ? (q.__data[0] = et, i.bufferSubData(i.UNIFORM_BUFFER, J + H, q.__data)) : et.isMatrix3 ? (q.__data[0] = et.elements[0], q.__data[1] = et.elements[1], q.__data[2] = et.elements[2], q.__data[3] = 0, q.__data[4] = et.elements[3], q.__data[5] = et.elements[4], q.__data[6] = et.elements[5], q.__data[7] = 0, q.__data[8] = et.elements[6], q.__data[9] = et.elements[7], q.__data[10] = et.elements[8], q.__data[11] = 0) : (et.toArray(q.__data, H), H += pt.storage / Float32Array.BYTES_PER_ELEMENT);
            }
            i.bufferSubData(i.UNIFORM_BUFFER, J, q.__data);
          }
        }
      }
      i.bindBuffer(i.UNIFORM_BUFFER, null);
    }
    function d(x, v, E, R) {
      let w = x.value, T = v + "_" + E;
      if (R[T] === void 0) return typeof w == "number" || typeof w == "boolean" ? R[T] = w : R[T] = w.clone(), true;
      {
        let U = R[T];
        if (typeof w == "number" || typeof w == "boolean") {
          if (U !== w) return R[T] = w, true;
        } else if (U.equals(w) === false) return U.copy(w), true;
      }
      return false;
    }
    function g(x) {
      let v = x.uniforms, E = 0, R = 16;
      for (let T = 0, U = v.length; T < U; T++) {
        let M = Array.isArray(v[T]) ? v[T] : [v[T]];
        for (let S = 0, q = M.length; S < q; S++) {
          let J = M[S], ht = Array.isArray(J.value) ? J.value : [J.value];
          for (let H = 0, $ = ht.length; H < $; H++) {
            let et = ht[H], pt = _(et), V = E % R;
            V !== 0 && R - V < pt.boundary && (E += R - V), J.__data = new Float32Array(pt.storage / Float32Array.BYTES_PER_ELEMENT), J.__offset = E, E += pt.storage;
          }
        }
      }
      let w = E % R;
      return w > 0 && (E += R - w), x.__size = E, x.__cache = {}, this;
    }
    function _(x) {
      let v = { boundary: 0, storage: 0 };
      return typeof x == "number" || typeof x == "boolean" ? (v.boundary = 4, v.storage = 4) : x.isVector2 ? (v.boundary = 8, v.storage = 8) : x.isVector3 || x.isColor ? (v.boundary = 16, v.storage = 12) : x.isVector4 ? (v.boundary = 16, v.storage = 16) : x.isMatrix3 ? (v.boundary = 48, v.storage = 48) : x.isMatrix4 ? (v.boundary = 64, v.storage = 64) : x.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", x), v;
    }
    function m(x) {
      let v = x.target;
      v.removeEventListener("dispose", m);
      let E = a.indexOf(v.__bindingPointIndex);
      a.splice(E, 1), i.deleteBuffer(s[v.id]), delete s[v.id], delete r[v.id];
    }
    function p() {
      for (let x in s) i.deleteBuffer(s[x]);
      a = [], s = {}, r = {};
    }
    return { bind: c, update: l, dispose: p };
  }
  var dr = class {
    constructor(t = {}) {
      let { canvas: e = Md(), context: n = null, depth: s = true, stencil: r = true, alpha: a = false, antialias: o = false, premultipliedAlpha: c = true, preserveDrawingBuffer: l = false, powerPreference: u = "default", failIfMajorPerformanceCaveat: h = false } = t;
      this.isWebGLRenderer = true;
      let f;
      n !== null ? f = n.getContextAttributes().alpha : f = a;
      let d = new Uint32Array(4), g = new Int32Array(4), _ = null, m = null, p = [], x = [];
      this.domElement = e, this.debug = { checkShaderErrors: true, onShaderError: null }, this.autoClear = true, this.autoClearColor = true, this.autoClearDepth = true, this.autoClearStencil = true, this.sortObjects = true, this.clippingPlanes = [], this.localClippingEnabled = false, this._outputColorSpace = Se, this._useLegacyLights = false, this.toneMapping = mi, this.toneMappingExposure = 1;
      let v = this, E = false, R = 0, w = 0, T = null, U = -1, M = null, S = new Pe(), q = new Pe(), J = null, ht = new Xt(0), H = 0, $ = e.width, et = e.height, pt = 1, V = null, C = null, gt = new Pe(0, 0, $, et), xt = new Pe(0, 0, $, et), At = false, rt = new fr(), yt = false, wt = false, dt = null, ot = new ve(), bt = new Bt(), Et = new Y(), O = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true };
      function W() {
        return T === null ? pt : 1;
      }
      let L = n;
      function ct(P, nt) {
        for (let ft = 0; ft < P.length; ft++) {
          let mt = P[ft], ut = e.getContext(mt, nt);
          if (ut !== null) return ut;
        }
        return null;
      }
      try {
        let P = { alpha: true, depth: s, stencil: r, antialias: o, premultipliedAlpha: c, preserveDrawingBuffer: l, powerPreference: u, failIfMajorPerformanceCaveat: h };
        if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${Fc}`), e.addEventListener("webglcontextlost", at, false), e.addEventListener("webglcontextrestored", F, false), e.addEventListener("webglcontextcreationerror", _t, false), L === null) {
          let nt = ["webgl2", "webgl", "experimental-webgl"];
          if (v.isWebGL1Renderer === true && nt.shift(), L = ct(nt, P), L === null) throw ct(nt) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
        }
        typeof WebGLRenderingContext < "u" && L instanceof WebGLRenderingContext && console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."), L.getShaderPrecisionFormat === void 0 && (L.getShaderPrecisionFormat = function() {
          return { rangeMin: 1, rangeMax: 1, precision: 1 };
        });
      } catch (P) {
        throw console.error("THREE.WebGLRenderer: " + P.message), P;
      }
      let X, tt, z, D, G, y, b, N, I, A, B, it, Z, st, lt, St, j, vt, Mt, Nt, Pt, It, kt, $t;
      function ee() {
        X = new Pm(L), tt = new Em(L, X, t), X.init(tt), It = new cx(L, X, tt), z = new ox(L, X, tt), D = new Um(L), G = new Zg(), y = new ax(L, X, z, G, tt, It, D), b = new Tm(v), N = new Cm(v), I = new Hd(L, tt), kt = new bm(L, X, I, tt), A = new Lm(L, I, D, kt), B = new Fm(L, A, I, D), Mt = new Om(L, tt, y), St = new wm(G), it = new Yg(v, b, N, X, tt, kt, St), Z = new hx(v, G), st = new $g(), lt = new nx(X, tt), vt = new Mm(v, b, N, z, B, f, c), j = new rx(v, B, tt), $t = new ux(L, D, tt, z), Nt = new Sm(L, X, D, tt), Pt = new Im(L, X, D, tt), D.programs = it.programs, v.capabilities = tt, v.extensions = X, v.properties = G, v.renderLists = st, v.shadowMap = j, v.state = z, v.info = D;
      }
      ee();
      let Ct = new xc(v, L);
      this.xr = Ct, this.getContext = function() {
        return L;
      }, this.getContextAttributes = function() {
        return L.getContextAttributes();
      }, this.forceContextLoss = function() {
        let P = X.get("WEBGL_lose_context");
        P && P.loseContext();
      }, this.forceContextRestore = function() {
        let P = X.get("WEBGL_lose_context");
        P && P.restoreContext();
      }, this.getPixelRatio = function() {
        return pt;
      }, this.setPixelRatio = function(P) {
        P !== void 0 && (pt = P, this.setSize($, et, false));
      }, this.getSize = function(P) {
        return P.set($, et);
      }, this.setSize = function(P, nt, ft = true) {
        if (Ct.isPresenting) {
          console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
          return;
        }
        $ = P, et = nt, e.width = Math.floor(P * pt), e.height = Math.floor(nt * pt), ft === true && (e.style.width = P + "px", e.style.height = nt + "px"), this.setViewport(0, 0, P, nt);
      }, this.getDrawingBufferSize = function(P) {
        return P.set($ * pt, et * pt).floor();
      }, this.setDrawingBufferSize = function(P, nt, ft) {
        $ = P, et = nt, pt = ft, e.width = Math.floor(P * ft), e.height = Math.floor(nt * ft), this.setViewport(0, 0, P, nt);
      }, this.getCurrentViewport = function(P) {
        return P.copy(S);
      }, this.getViewport = function(P) {
        return P.copy(gt);
      }, this.setViewport = function(P, nt, ft, mt) {
        P.isVector4 ? gt.set(P.x, P.y, P.z, P.w) : gt.set(P, nt, ft, mt), z.viewport(S.copy(gt).multiplyScalar(pt).floor());
      }, this.getScissor = function(P) {
        return P.copy(xt);
      }, this.setScissor = function(P, nt, ft, mt) {
        P.isVector4 ? xt.set(P.x, P.y, P.z, P.w) : xt.set(P, nt, ft, mt), z.scissor(q.copy(xt).multiplyScalar(pt).floor());
      }, this.getScissorTest = function() {
        return At;
      }, this.setScissorTest = function(P) {
        z.setScissorTest(At = P);
      }, this.setOpaqueSort = function(P) {
        V = P;
      }, this.setTransparentSort = function(P) {
        C = P;
      }, this.getClearColor = function(P) {
        return P.copy(vt.getClearColor());
      }, this.setClearColor = function() {
        vt.setClearColor.apply(vt, arguments);
      }, this.getClearAlpha = function() {
        return vt.getClearAlpha();
      }, this.setClearAlpha = function() {
        vt.setClearAlpha.apply(vt, arguments);
      }, this.clear = function(P = true, nt = true, ft = true) {
        let mt = 0;
        if (P) {
          let ut = false;
          if (T !== null) {
            let Ft = T.texture.format;
            ut = Ft === cu || Ft === au || Ft === ou;
          }
          if (ut) {
            let Ft = T.texture.type, qt = Ft === gi || Ft === fi || Ft === Vc || Ft === Gi || Ft === su || Ft === ru, Kt = vt.getClearColor(), jt = vt.getClearAlpha(), le = Kt.r, ne = Kt.g, ie = Kt.b;
            qt ? (d[0] = le, d[1] = ne, d[2] = ie, d[3] = jt, L.clearBufferuiv(L.COLOR, 0, d)) : (g[0] = le, g[1] = ne, g[2] = ie, g[3] = jt, L.clearBufferiv(L.COLOR, 0, g));
          } else mt |= L.COLOR_BUFFER_BIT;
        }
        nt && (mt |= L.DEPTH_BUFFER_BIT), ft && (mt |= L.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), L.clear(mt);
      }, this.clearColor = function() {
        this.clear(true, false, false);
      }, this.clearDepth = function() {
        this.clear(false, true, false);
      }, this.clearStencil = function() {
        this.clear(false, false, true);
      }, this.dispose = function() {
        e.removeEventListener("webglcontextlost", at, false), e.removeEventListener("webglcontextrestored", F, false), e.removeEventListener("webglcontextcreationerror", _t, false), st.dispose(), lt.dispose(), G.dispose(), b.dispose(), N.dispose(), B.dispose(), kt.dispose(), $t.dispose(), it.dispose(), Ct.dispose(), Ct.removeEventListener("sessionstart", Jt), Ct.removeEventListener("sessionend", re), dt && (dt.dispose(), dt = null), _e.stop();
      };
      function at(P) {
        P.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), E = true;
      }
      function F() {
        console.log("THREE.WebGLRenderer: Context Restored."), E = false;
        let P = D.autoReset, nt = j.enabled, ft = j.autoUpdate, mt = j.needsUpdate, ut = j.type;
        ee(), D.autoReset = P, j.enabled = nt, j.autoUpdate = ft, j.needsUpdate = mt, j.type = ut;
      }
      function _t(P) {
        console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", P.statusMessage);
      }
      function Tt(P) {
        let nt = P.target;
        nt.removeEventListener("dispose", Tt), Rt(nt);
      }
      function Rt(P) {
        Ut(P), G.remove(P);
      }
      function Ut(P) {
        let nt = G.get(P).programs;
        nt !== void 0 && (nt.forEach(function(ft) {
          it.releaseProgram(ft);
        }), P.isShaderMaterial && it.releaseShaderCache(P));
      }
      this.renderBufferDirect = function(P, nt, ft, mt, ut, Ft) {
        nt === null && (nt = O);
        let qt = ut.isMesh && ut.matrixWorld.determinant() < 0, Kt = Re(P, nt, ft, mt, ut);
        z.setMaterial(mt, qt);
        let jt = ft.index, le = 1;
        if (mt.wireframe === true) {
          if (jt = A.getWireframeAttribute(ft), jt === void 0) return;
          le = 2;
        }
        let ne = ft.drawRange, ie = ft.attributes.position, Fe = ne.start * le, fn = (ne.start + ne.count) * le;
        Ft !== null && (Fe = Math.max(Fe, Ft.start * le), fn = Math.min(fn, (Ft.start + Ft.count) * le)), jt !== null ? (Fe = Math.max(Fe, 0), fn = Math.min(fn, jt.count)) : ie != null && (Fe = Math.max(Fe, 0), fn = Math.min(fn, ie.count));
        let qe = fn - Fe;
        if (qe < 0 || qe === 1 / 0) return;
        kt.setup(ut, mt, Kt, ft, jt);
        let qn, Ie = Nt;
        if (jt !== null && (qn = I.get(jt), Ie = Pt, Ie.setIndex(qn)), ut.isMesh) mt.wireframe === true ? (z.setLineWidth(mt.wireframeLinewidth * W()), Ie.setMode(L.LINES)) : Ie.setMode(L.TRIANGLES);
        else if (ut.isLine) {
          let he = mt.linewidth;
          he === void 0 && (he = 1), z.setLineWidth(he * W()), ut.isLineSegments ? Ie.setMode(L.LINES) : ut.isLineLoop ? Ie.setMode(L.LINE_LOOP) : Ie.setMode(L.LINE_STRIP);
        } else ut.isPoints ? Ie.setMode(L.POINTS) : ut.isSprite && Ie.setMode(L.TRIANGLES);
        if (ut.isBatchedMesh) Ie.renderMultiDraw(ut._multiDrawStarts, ut._multiDrawCounts, ut._multiDrawCount);
        else if (ut.isInstancedMesh) Ie.renderInstances(Fe, qe, ut.count);
        else if (ft.isInstancedBufferGeometry) {
          let he = ft._maxInstanceCount !== void 0 ? ft._maxInstanceCount : 1 / 0, ua = Math.min(ft.instanceCount, he);
          Ie.renderInstances(Fe, qe, ua);
        } else Ie.render(Fe, qe);
      };
      function Gt(P, nt, ft) {
        P.transparent === true && P.side === Ue && P.forceSinglePass === false ? (P.side = Ze, P.needsUpdate = true, Zt(P, nt, ft), P.side = bn, P.needsUpdate = true, Zt(P, nt, ft), P.side = Ue) : Zt(P, nt, ft);
      }
      this.compile = function(P, nt, ft = null) {
        ft === null && (ft = P), m = lt.get(ft), m.init(), x.push(m), ft.traverseVisible(function(ut) {
          ut.isLight && ut.layers.test(nt.layers) && (m.pushLight(ut), ut.castShadow && m.pushShadow(ut));
        }), P !== ft && P.traverseVisible(function(ut) {
          ut.isLight && ut.layers.test(nt.layers) && (m.pushLight(ut), ut.castShadow && m.pushShadow(ut));
        }), m.setupLights(v._useLegacyLights);
        let mt = /* @__PURE__ */ new Set();
        return P.traverse(function(ut) {
          let Ft = ut.material;
          if (Ft) if (Array.isArray(Ft)) for (let qt = 0; qt < Ft.length; qt++) {
            let Kt = Ft[qt];
            Gt(Kt, ft, ut), mt.add(Kt);
          }
          else Gt(Ft, ft, ut), mt.add(Ft);
        }), x.pop(), m = null, mt;
      }, this.compileAsync = function(P, nt, ft = null) {
        let mt = this.compile(P, nt, ft);
        return new Promise((ut) => {
          function Ft() {
            if (mt.forEach(function(qt) {
              G.get(qt).currentProgram.isReady() && mt.delete(qt);
            }), mt.size === 0) {
              ut(P);
              return;
            }
            setTimeout(Ft, 10);
          }
          X.get("KHR_parallel_shader_compile") !== null ? Ft() : setTimeout(Ft, 10);
        });
      };
      let Vt = null;
      function ce(P) {
        Vt && Vt(P);
      }
      function Jt() {
        _e.stop();
      }
      function re() {
        _e.start();
      }
      let _e = new gu();
      _e.setAnimationLoop(ce), typeof self < "u" && _e.setContext(self), this.setAnimationLoop = function(P) {
        Vt = P, Ct.setAnimationLoop(P), P === null ? _e.stop() : _e.start();
      }, Ct.addEventListener("sessionstart", Jt), Ct.addEventListener("sessionend", re), this.render = function(P, nt) {
        if (nt !== void 0 && nt.isCamera !== true) {
          console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
          return;
        }
        if (E === true) return;
        P.matrixWorldAutoUpdate === true && P.updateMatrixWorld(), nt.parent === null && nt.matrixWorldAutoUpdate === true && nt.updateMatrixWorld(), Ct.enabled === true && Ct.isPresenting === true && (Ct.cameraAutoUpdate === true && Ct.updateCamera(nt), nt = Ct.getCamera()), P.isScene === true && P.onBeforeRender(v, P, nt, T), m = lt.get(P, x.length), m.init(), x.push(m), ot.multiplyMatrices(nt.projectionMatrix, nt.matrixWorldInverse), rt.setFromProjectionMatrix(ot), wt = this.localClippingEnabled, yt = St.init(this.clippingPlanes, wt), _ = st.get(P, p.length), _.init(), p.push(_), k(P, nt, 0, v.sortObjects), _.finish(), v.sortObjects === true && _.sort(V, C), this.info.render.frame++, yt === true && St.beginShadows();
        let ft = m.state.shadowsArray;
        if (j.render(ft, P, nt), yt === true && St.endShadows(), this.info.autoReset === true && this.info.reset(), vt.render(_, P), m.setupLights(v._useLegacyLights), nt.isArrayCamera) {
          let mt = nt.cameras;
          for (let ut = 0, Ft = mt.length; ut < Ft; ut++) {
            let qt = mt[ut];
            Q(_, P, qt, qt.viewport);
          }
        } else Q(_, P, nt);
        T !== null && (y.updateMultisampleRenderTarget(T), y.updateRenderTargetMipmap(T)), P.isScene === true && P.onAfterRender(v, P, nt), kt.resetDefaultState(), U = -1, M = null, x.pop(), x.length > 0 ? m = x[x.length - 1] : m = null, p.pop(), p.length > 0 ? _ = p[p.length - 1] : _ = null;
      };
      function k(P, nt, ft, mt) {
        if (P.visible === false) return;
        if (P.layers.test(nt.layers)) {
          if (P.isGroup) ft = P.renderOrder;
          else if (P.isLOD) P.autoUpdate === true && P.update(nt);
          else if (P.isLight) m.pushLight(P), P.castShadow && m.pushShadow(P);
          else if (P.isSprite) {
            if (!P.frustumCulled || rt.intersectsSprite(P)) {
              mt && Et.setFromMatrixPosition(P.matrixWorld).applyMatrix4(ot);
              let qt = B.update(P), Kt = P.material;
              Kt.visible && _.push(P, qt, Kt, ft, Et.z, null);
            }
          } else if ((P.isMesh || P.isLine || P.isPoints) && (!P.frustumCulled || rt.intersectsObject(P))) {
            let qt = B.update(P), Kt = P.material;
            if (mt && (P.boundingSphere !== void 0 ? (P.boundingSphere === null && P.computeBoundingSphere(), Et.copy(P.boundingSphere.center)) : (qt.boundingSphere === null && qt.computeBoundingSphere(), Et.copy(qt.boundingSphere.center)), Et.applyMatrix4(P.matrixWorld).applyMatrix4(ot)), Array.isArray(Kt)) {
              let jt = qt.groups;
              for (let le = 0, ne = jt.length; le < ne; le++) {
                let ie = jt[le], Fe = Kt[ie.materialIndex];
                Fe && Fe.visible && _.push(P, qt, Fe, ft, Et.z, ie);
              }
            } else Kt.visible && _.push(P, qt, Kt, ft, Et.z, null);
          }
        }
        let Ft = P.children;
        for (let qt = 0, Kt = Ft.length; qt < Kt; qt++) k(Ft[qt], nt, ft, mt);
      }
      function Q(P, nt, ft, mt) {
        let ut = P.opaque, Ft = P.transmissive, qt = P.transparent;
        m.setupLightsView(ft), yt === true && St.setGlobalState(v.clippingPlanes, ft), Ft.length > 0 && Lt(ut, Ft, nt, ft), mt && z.viewport(S.copy(mt)), ut.length > 0 && Yt(ut, nt, ft), Ft.length > 0 && Yt(Ft, nt, ft), qt.length > 0 && Yt(qt, nt, ft), z.buffers.depth.setTest(true), z.buffers.depth.setMask(true), z.buffers.color.setMask(true), z.setPolygonOffset(false);
      }
      function Lt(P, nt, ft, mt) {
        if ((ft.isScene === true ? ft.overrideMaterial : null) !== null) return;
        let Ft = tt.isWebGL2;
        dt === null && (dt = new Je(1, 1, { generateMipmaps: true, type: X.has("EXT_color_buffer_half_float") ? mn : gi, minFilter: ni, samples: Ft ? 4 : 0 })), v.getDrawingBufferSize(bt), Ft ? dt.setSize(bt.x, bt.y) : dt.setSize(ic(bt.x), ic(bt.y));
        let qt = v.getRenderTarget();
        v.setRenderTarget(dt), v.getClearColor(ht), H = v.getClearAlpha(), H < 1 && v.setClearColor(16777215, 0.5), v.clear();
        let Kt = v.toneMapping;
        v.toneMapping = mi, Yt(P, ft, mt), y.updateMultisampleRenderTarget(dt), y.updateRenderTargetMipmap(dt);
        let jt = false;
        for (let le = 0, ne = nt.length; le < ne; le++) {
          let ie = nt[le], Fe = ie.object, fn = ie.geometry, qe = ie.material, qn = ie.group;
          if (qe.side === Ue && Fe.layers.test(mt.layers)) {
            let Ie = qe.side;
            qe.side = Ze, qe.needsUpdate = true, Ht(Fe, ft, mt, fn, qe, qn), qe.side = Ie, qe.needsUpdate = true, jt = true;
          }
        }
        jt === true && (y.updateMultisampleRenderTarget(dt), y.updateRenderTargetMipmap(dt)), v.setRenderTarget(qt), v.setClearColor(ht, H), v.toneMapping = Kt;
      }
      function Yt(P, nt, ft) {
        let mt = nt.isScene === true ? nt.overrideMaterial : null;
        for (let ut = 0, Ft = P.length; ut < Ft; ut++) {
          let qt = P[ut], Kt = qt.object, jt = qt.geometry, le = mt === null ? qt.material : mt, ne = qt.group;
          Kt.layers.test(ft.layers) && Ht(Kt, nt, ft, jt, le, ne);
        }
      }
      function Ht(P, nt, ft, mt, ut, Ft) {
        P.onBeforeRender(v, nt, ft, mt, ut, Ft), P.modelViewMatrix.multiplyMatrices(ft.matrixWorldInverse, P.matrixWorld), P.normalMatrix.getNormalMatrix(P.modelViewMatrix), ut.onBeforeRender(v, nt, ft, mt, P, Ft), ut.transparent === true && ut.side === Ue && ut.forceSinglePass === false ? (ut.side = Ze, ut.needsUpdate = true, v.renderBufferDirect(ft, nt, mt, ut, P, Ft), ut.side = bn, ut.needsUpdate = true, v.renderBufferDirect(ft, nt, mt, ut, P, Ft), ut.side = Ue) : v.renderBufferDirect(ft, nt, mt, ut, P, Ft), P.onAfterRender(v, nt, ft, mt, ut, Ft);
      }
      function Zt(P, nt, ft) {
        nt.isScene !== true && (nt = O);
        let mt = G.get(P), ut = m.state.lights, Ft = m.state.shadowsArray, qt = ut.state.version, Kt = it.getParameters(P, ut.state, Ft, nt, ft), jt = it.getProgramCacheKey(Kt), le = mt.programs;
        mt.environment = P.isMeshStandardMaterial ? nt.environment : null, mt.fog = nt.fog, mt.envMap = (P.isMeshStandardMaterial ? N : b).get(P.envMap || mt.environment), le === void 0 && (P.addEventListener("dispose", Tt), le = /* @__PURE__ */ new Map(), mt.programs = le);
        let ne = le.get(jt);
        if (ne !== void 0) {
          if (mt.currentProgram === ne && mt.lightsStateVersion === qt) return Qt(P, Kt), ne;
        } else Kt.uniforms = it.getUniforms(P), P.onBuild(ft, Kt, v), P.onBeforeCompile(Kt, v), ne = it.acquireProgram(Kt, jt), le.set(jt, ne), mt.uniforms = Kt.uniforms;
        let ie = mt.uniforms;
        return (!P.isShaderMaterial && !P.isRawShaderMaterial || P.clipping === true) && (ie.clippingPlanes = St.uniform), Qt(P, Kt), mt.needsLights = $s(P), mt.lightsStateVersion = qt, mt.needsLights && (ie.ambientLightColor.value = ut.state.ambient, ie.lightProbe.value = ut.state.probe, ie.directionalLights.value = ut.state.directional, ie.directionalLightShadows.value = ut.state.directionalShadow, ie.spotLights.value = ut.state.spot, ie.spotLightShadows.value = ut.state.spotShadow, ie.rectAreaLights.value = ut.state.rectArea, ie.ltc_1.value = ut.state.rectAreaLTC1, ie.ltc_2.value = ut.state.rectAreaLTC2, ie.pointLights.value = ut.state.point, ie.pointLightShadows.value = ut.state.pointShadow, ie.hemisphereLights.value = ut.state.hemi, ie.directionalShadowMap.value = ut.state.directionalShadowMap, ie.directionalShadowMatrix.value = ut.state.directionalShadowMatrix, ie.spotShadowMap.value = ut.state.spotShadowMap, ie.spotLightMatrix.value = ut.state.spotLightMatrix, ie.spotLightMap.value = ut.state.spotLightMap, ie.pointShadowMap.value = ut.state.pointShadowMap, ie.pointShadowMatrix.value = ut.state.pointShadowMatrix), mt.currentProgram = ne, mt.uniformsList = null, ne;
      }
      function Wt(P) {
        if (P.uniformsList === null) {
          let nt = P.currentProgram.getUniforms();
          P.uniformsList = Ps.seqWithValue(nt.seq, P.uniforms);
        }
        return P.uniformsList;
      }
      function Qt(P, nt) {
        let ft = G.get(P);
        ft.outputColorSpace = nt.outputColorSpace, ft.batching = nt.batching, ft.instancing = nt.instancing, ft.instancingColor = nt.instancingColor, ft.skinning = nt.skinning, ft.morphTargets = nt.morphTargets, ft.morphNormals = nt.morphNormals, ft.morphColors = nt.morphColors, ft.morphTargetsCount = nt.morphTargetsCount, ft.numClippingPlanes = nt.numClippingPlanes, ft.numIntersection = nt.numClipIntersection, ft.vertexAlphas = nt.vertexAlphas, ft.vertexTangents = nt.vertexTangents, ft.toneMapping = nt.toneMapping;
      }
      function Re(P, nt, ft, mt, ut) {
        nt.isScene !== true && (nt = O), y.resetTextureUnits();
        let Ft = nt.fog, qt = mt.isMeshStandardMaterial ? nt.environment : null, Kt = T === null ? v.outputColorSpace : T.isXRRenderTarget === true ? T.texture.colorSpace : ii, jt = (mt.isMeshStandardMaterial ? N : b).get(mt.envMap || qt), le = mt.vertexColors === true && !!ft.attributes.color && ft.attributes.color.itemSize === 4, ne = !!ft.attributes.tangent && (!!mt.normalMap || mt.anisotropy > 0), ie = !!ft.morphAttributes.position, Fe = !!ft.morphAttributes.normal, fn = !!ft.morphAttributes.color, qe = mi;
        mt.toneMapped && (T === null || T.isXRRenderTarget === true) && (qe = v.toneMapping);
        let qn = ft.morphAttributes.position || ft.morphAttributes.normal || ft.morphAttributes.color, Ie = qn !== void 0 ? qn.length : 0, he = G.get(mt), ua = m.state.lights;
        if (yt === true && (wt === true || P !== M)) {
          let _n = P === M && mt.id === U;
          St.setState(mt, P, _n);
        }
        let Oe = false;
        mt.version === he.__version ? (he.needsLights && he.lightsStateVersion !== ua.state.version || he.outputColorSpace !== Kt || ut.isBatchedMesh && he.batching === false || !ut.isBatchedMesh && he.batching === true || ut.isInstancedMesh && he.instancing === false || !ut.isInstancedMesh && he.instancing === true || ut.isSkinnedMesh && he.skinning === false || !ut.isSkinnedMesh && he.skinning === true || ut.isInstancedMesh && he.instancingColor === true && ut.instanceColor === null || ut.isInstancedMesh && he.instancingColor === false && ut.instanceColor !== null || he.envMap !== jt || mt.fog === true && he.fog !== Ft || he.numClippingPlanes !== void 0 && (he.numClippingPlanes !== St.numPlanes || he.numIntersection !== St.numIntersection) || he.vertexAlphas !== le || he.vertexTangents !== ne || he.morphTargets !== ie || he.morphNormals !== Fe || he.morphColors !== fn || he.toneMapping !== qe || tt.isWebGL2 === true && he.morphTargetsCount !== Ie) && (Oe = true) : (Oe = true, he.__version = mt.version);
        let Ii = he.currentProgram;
        Oe === true && (Ii = Zt(mt, nt, ut));
        let _l = false, Ks = false, fa = false, Qe = Ii.getUniforms(), Ui = he.uniforms;
        if (z.useProgram(Ii.program) && (_l = true, Ks = true, fa = true), mt.id !== U && (U = mt.id, Ks = true), _l || M !== P) {
          Qe.setValue(L, "projectionMatrix", P.projectionMatrix), Qe.setValue(L, "viewMatrix", P.matrixWorldInverse);
          let _n = Qe.map.cameraPosition;
          _n !== void 0 && _n.setValue(L, Et.setFromMatrixPosition(P.matrixWorld)), tt.logarithmicDepthBuffer && Qe.setValue(L, "logDepthBufFC", 2 / (Math.log(P.far + 1) / Math.LN2)), (mt.isMeshPhongMaterial || mt.isMeshToonMaterial || mt.isMeshLambertMaterial || mt.isMeshBasicMaterial || mt.isMeshStandardMaterial || mt.isShaderMaterial) && Qe.setValue(L, "isOrthographic", P.isOrthographicCamera === true), M !== P && (M = P, Ks = true, fa = true);
        }
        if (ut.isSkinnedMesh) {
          Qe.setOptional(L, ut, "bindMatrix"), Qe.setOptional(L, ut, "bindMatrixInverse");
          let _n = ut.skeleton;
          _n && (tt.floatVertexTextures ? (_n.boneTexture === null && _n.computeBoneTexture(), Qe.setValue(L, "boneTexture", _n.boneTexture, y)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."));
        }
        ut.isBatchedMesh && (Qe.setOptional(L, ut, "batchingTexture"), Qe.setValue(L, "batchingTexture", ut._matricesTexture, y));
        let da = ft.morphAttributes;
        if ((da.position !== void 0 || da.normal !== void 0 || da.color !== void 0 && tt.isWebGL2 === true) && Mt.update(ut, ft, Ii), (Ks || he.receiveShadow !== ut.receiveShadow) && (he.receiveShadow = ut.receiveShadow, Qe.setValue(L, "receiveShadow", ut.receiveShadow)), mt.isMeshGouraudMaterial && mt.envMap !== null && (Ui.envMap.value = jt, Ui.flipEnvMap.value = jt.isCubeTexture && jt.isRenderTargetTexture === false ? -1 : 1), Ks && (Qe.setValue(L, "toneMappingExposure", v.toneMappingExposure), he.needsLights && Bn(Ui, fa), Ft && mt.fog === true && Z.refreshFogUniforms(Ui, Ft), Z.refreshMaterialUniforms(Ui, mt, pt, et, dt), Ps.upload(L, Wt(he), Ui, y)), mt.isShaderMaterial && mt.uniformsNeedUpdate === true && (Ps.upload(L, Wt(he), Ui, y), mt.uniformsNeedUpdate = false), mt.isSpriteMaterial && Qe.setValue(L, "center", ut.center), Qe.setValue(L, "modelViewMatrix", ut.modelViewMatrix), Qe.setValue(L, "normalMatrix", ut.normalMatrix), Qe.setValue(L, "modelMatrix", ut.matrixWorld), mt.isShaderMaterial || mt.isRawShaderMaterial) {
          let _n = mt.uniformsGroups;
          for (let pa = 0, Tf = _n.length; pa < Tf; pa++) if (tt.isWebGL2) {
            let vl = _n[pa];
            $t.update(vl, Ii), $t.bind(vl, Ii);
          } else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
        }
        return Ii;
      }
      function Bn(P, nt) {
        P.ambientLightColor.needsUpdate = nt, P.lightProbe.needsUpdate = nt, P.directionalLights.needsUpdate = nt, P.directionalLightShadows.needsUpdate = nt, P.pointLights.needsUpdate = nt, P.pointLightShadows.needsUpdate = nt, P.spotLights.needsUpdate = nt, P.spotLightShadows.needsUpdate = nt, P.rectAreaLights.needsUpdate = nt, P.hemisphereLights.needsUpdate = nt;
      }
      function $s(P) {
        return P.isMeshLambertMaterial || P.isMeshToonMaterial || P.isMeshPhongMaterial || P.isMeshStandardMaterial || P.isShadowMaterial || P.isShaderMaterial && P.lights === true;
      }
      this.getActiveCubeFace = function() {
        return R;
      }, this.getActiveMipmapLevel = function() {
        return w;
      }, this.getRenderTarget = function() {
        return T;
      }, this.setRenderTargetTextures = function(P, nt, ft) {
        G.get(P.texture).__webglTexture = nt, G.get(P.depthTexture).__webglTexture = ft;
        let mt = G.get(P);
        mt.__hasExternalTextures = true, mt.__hasExternalTextures && (mt.__autoAllocateDepthBuffer = ft === void 0, mt.__autoAllocateDepthBuffer || X.has("WEBGL_multisampled_render_to_texture") === true && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), mt.__useRenderToTexture = false));
      }, this.setRenderTargetFramebuffer = function(P, nt) {
        let ft = G.get(P);
        ft.__webglFramebuffer = nt, ft.__useDefaultFramebuffer = nt === void 0;
      }, this.setRenderTarget = function(P, nt = 0, ft = 0) {
        T = P, R = nt, w = ft;
        let mt = true, ut = null, Ft = false, qt = false;
        if (P) {
          let jt = G.get(P);
          jt.__useDefaultFramebuffer !== void 0 ? (z.bindFramebuffer(L.FRAMEBUFFER, null), mt = false) : jt.__webglFramebuffer === void 0 ? y.setupRenderTarget(P) : jt.__hasExternalTextures && y.rebindTextures(P, G.get(P.texture).__webglTexture, G.get(P.depthTexture).__webglTexture);
          let le = P.texture;
          (le.isData3DTexture || le.isDataArrayTexture || le.isCompressedArrayTexture) && (qt = true);
          let ne = G.get(P).__webglFramebuffer;
          P.isWebGLCubeRenderTarget ? (Array.isArray(ne[nt]) ? ut = ne[nt][ft] : ut = ne[nt], Ft = true) : tt.isWebGL2 && P.samples > 0 && y.useMultisampledRTT(P) === false ? ut = G.get(P).__webglMultisampledFramebuffer : Array.isArray(ne) ? ut = ne[ft] : ut = ne, S.copy(P.viewport), q.copy(P.scissor), J = P.scissorTest;
        } else S.copy(gt).multiplyScalar(pt).floor(), q.copy(xt).multiplyScalar(pt).floor(), J = At;
        if (z.bindFramebuffer(L.FRAMEBUFFER, ut) && tt.drawBuffers && mt && z.drawBuffers(P, ut), z.viewport(S), z.scissor(q), z.setScissorTest(J), Ft) {
          let jt = G.get(P.texture);
          L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_CUBE_MAP_POSITIVE_X + nt, jt.__webglTexture, ft);
        } else if (qt) {
          let jt = G.get(P.texture), le = nt || 0;
          L.framebufferTextureLayer(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, jt.__webglTexture, ft || 0, le);
        }
        U = -1;
      }, this.readRenderTargetPixels = function(P, nt, ft, mt, ut, Ft, qt) {
        if (!(P && P.isWebGLRenderTarget)) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
          return;
        }
        let Kt = G.get(P).__webglFramebuffer;
        if (P.isWebGLCubeRenderTarget && qt !== void 0 && (Kt = Kt[qt]), Kt) {
          z.bindFramebuffer(L.FRAMEBUFFER, Kt);
          try {
            let jt = P.texture, le = jt.format, ne = jt.type;
            if (le !== Ln && It.convert(le) !== L.getParameter(L.IMPLEMENTATION_COLOR_READ_FORMAT)) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
              return;
            }
            let ie = ne === mn && (X.has("EXT_color_buffer_half_float") || tt.isWebGL2 && X.has("EXT_color_buffer_float"));
            if (ne !== gi && It.convert(ne) !== L.getParameter(L.IMPLEMENTATION_COLOR_READ_TYPE) && !(ne === di && (tt.isWebGL2 || X.has("OES_texture_float") || X.has("WEBGL_color_buffer_float"))) && !ie) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
              return;
            }
            nt >= 0 && nt <= P.width - mt && ft >= 0 && ft <= P.height - ut && L.readPixels(nt, ft, mt, ut, It.convert(le), It.convert(ne), Ft);
          } finally {
            let jt = T !== null ? G.get(T).__webglFramebuffer : null;
            z.bindFramebuffer(L.FRAMEBUFFER, jt);
          }
        }
      }, this.copyFramebufferToTexture = function(P, nt, ft = 0) {
        let mt = Math.pow(2, -ft), ut = Math.floor(nt.image.width * mt), Ft = Math.floor(nt.image.height * mt);
        y.setTexture2D(nt, 0), L.copyTexSubImage2D(L.TEXTURE_2D, ft, 0, 0, P.x, P.y, ut, Ft), z.unbindTexture();
      }, this.copyTextureToTexture = function(P, nt, ft, mt = 0) {
        let ut = nt.image.width, Ft = nt.image.height, qt = It.convert(ft.format), Kt = It.convert(ft.type);
        y.setTexture2D(ft, 0), L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL, ft.flipY), L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL, ft.premultiplyAlpha), L.pixelStorei(L.UNPACK_ALIGNMENT, ft.unpackAlignment), nt.isDataTexture ? L.texSubImage2D(L.TEXTURE_2D, mt, P.x, P.y, ut, Ft, qt, Kt, nt.image.data) : nt.isCompressedTexture ? L.compressedTexSubImage2D(L.TEXTURE_2D, mt, P.x, P.y, nt.mipmaps[0].width, nt.mipmaps[0].height, qt, nt.mipmaps[0].data) : L.texSubImage2D(L.TEXTURE_2D, mt, P.x, P.y, qt, Kt, nt.image), mt === 0 && ft.generateMipmaps && L.generateMipmap(L.TEXTURE_2D), z.unbindTexture();
      }, this.copyTextureToTexture3D = function(P, nt, ft, mt, ut = 0) {
        if (v.isWebGL1Renderer) {
          console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
          return;
        }
        let Ft = P.max.x - P.min.x + 1, qt = P.max.y - P.min.y + 1, Kt = P.max.z - P.min.z + 1, jt = It.convert(mt.format), le = It.convert(mt.type), ne;
        if (mt.isData3DTexture) y.setTexture3D(mt, 0), ne = L.TEXTURE_3D;
        else if (mt.isDataArrayTexture || mt.isCompressedArrayTexture) y.setTexture2DArray(mt, 0), ne = L.TEXTURE_2D_ARRAY;
        else {
          console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
          return;
        }
        L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL, mt.flipY), L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL, mt.premultiplyAlpha), L.pixelStorei(L.UNPACK_ALIGNMENT, mt.unpackAlignment);
        let ie = L.getParameter(L.UNPACK_ROW_LENGTH), Fe = L.getParameter(L.UNPACK_IMAGE_HEIGHT), fn = L.getParameter(L.UNPACK_SKIP_PIXELS), qe = L.getParameter(L.UNPACK_SKIP_ROWS), qn = L.getParameter(L.UNPACK_SKIP_IMAGES), Ie = ft.isCompressedTexture ? ft.mipmaps[ut] : ft.image;
        L.pixelStorei(L.UNPACK_ROW_LENGTH, Ie.width), L.pixelStorei(L.UNPACK_IMAGE_HEIGHT, Ie.height), L.pixelStorei(L.UNPACK_SKIP_PIXELS, P.min.x), L.pixelStorei(L.UNPACK_SKIP_ROWS, P.min.y), L.pixelStorei(L.UNPACK_SKIP_IMAGES, P.min.z), ft.isDataTexture || ft.isData3DTexture ? L.texSubImage3D(ne, ut, nt.x, nt.y, nt.z, Ft, qt, Kt, jt, le, Ie.data) : ft.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), L.compressedTexSubImage3D(ne, ut, nt.x, nt.y, nt.z, Ft, qt, Kt, jt, Ie.data)) : L.texSubImage3D(ne, ut, nt.x, nt.y, nt.z, Ft, qt, Kt, jt, le, Ie), L.pixelStorei(L.UNPACK_ROW_LENGTH, ie), L.pixelStorei(L.UNPACK_IMAGE_HEIGHT, Fe), L.pixelStorei(L.UNPACK_SKIP_PIXELS, fn), L.pixelStorei(L.UNPACK_SKIP_ROWS, qe), L.pixelStorei(L.UNPACK_SKIP_IMAGES, qn), ut === 0 && mt.generateMipmaps && L.generateMipmap(ne), z.unbindTexture();
      }, this.initTexture = function(P) {
        P.isCubeTexture ? y.setTextureCube(P, 0) : P.isData3DTexture ? y.setTexture3D(P, 0) : P.isDataArrayTexture || P.isCompressedArrayTexture ? y.setTexture2DArray(P, 0) : y.setTexture2D(P, 0), z.unbindTexture();
      }, this.resetState = function() {
        R = 0, w = 0, T = null, z.reset(), kt.reset();
      }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    get coordinateSystem() {
      return ei;
    }
    get outputColorSpace() {
      return this._outputColorSpace;
    }
    set outputColorSpace(t) {
      this._outputColorSpace = t;
      let e = this.getContext();
      e.drawingBufferColorSpace = t === Wc ? "display-p3" : "srgb", e.unpackColorSpace = ge.workingColorSpace === Ho ? "display-p3" : "srgb";
    }
    get outputEncoding() {
      return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace === Se ? Wi : hu;
    }
    set outputEncoding(t) {
      console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace = t === Wi ? Se : ii;
    }
    get useLegacyLights() {
      return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights;
    }
    set useLegacyLights(t) {
      console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights = t;
    }
  }, _c = class extends dr {
  };
  _c.prototype.isWebGL1Renderer = true;
  var Co = class i {
    constructor(t, e = 25e-5) {
      this.isFogExp2 = true, this.name = "", this.color = new Xt(t), this.density = e;
    }
    clone() {
      return new i(this.color, this.density);
    }
    toJSON() {
      return { type: "FogExp2", name: this.name, color: this.color.getHex(), density: this.density };
    }
  };
  var pr = class extends $e {
    constructor() {
      super(), this.isScene = true, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    copy(t, e) {
      return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e;
    }
  }, vc = class {
    constructor(t, e) {
      this.isInterleavedBuffer = true, this.array = t, this.stride = e, this.count = t !== void 0 ? t.length / e : 0, this.usage = tc, this._updateRange = { offset: 0, count: -1 }, this.updateRanges = [], this.version = 0, this.uuid = xi();
    }
    onUploadCallback() {
    }
    set needsUpdate(t) {
      t === true && this.version++;
    }
    get updateRange() {
      return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."), this._updateRange;
    }
    setUsage(t) {
      return this.usage = t, this;
    }
    addUpdateRange(t, e) {
      this.updateRanges.push({ start: t, count: e });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(t) {
      return this.array = new t.array.constructor(t.array), this.count = t.count, this.stride = t.stride, this.usage = t.usage, this;
    }
    copyAt(t, e, n) {
      t *= this.stride, n *= e.stride;
      for (let s = 0, r = this.stride; s < r; s++) this.array[t + s] = e.array[n + s];
      return this;
    }
    set(t, e = 0) {
      return this.array.set(t, e), this;
    }
    clone(t) {
      t.arrayBuffers === void 0 && (t.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = xi()), t.arrayBuffers[this.array.buffer._uuid] === void 0 && (t.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
      let e = new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(e, this.stride);
      return n.setUsage(this.usage), n;
    }
    onUpload(t) {
      return this.onUploadCallback = t, this;
    }
    toJSON(t) {
      return t.arrayBuffers === void 0 && (t.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = xi()), t.arrayBuffers[this.array.buffer._uuid] === void 0 && (t.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), { uuid: this.uuid, buffer: this.array.buffer._uuid, type: this.array.constructor.name, stride: this.stride };
    }
  }, rn = new Y(), Po = class i {
    constructor(t, e, n, s = false) {
      this.isInterleavedBufferAttribute = true, this.name = "", this.data = t, this.itemSize = e, this.offset = n, this.normalized = s;
    }
    get count() {
      return this.data.count;
    }
    get array() {
      return this.data.array;
    }
    set needsUpdate(t) {
      this.data.needsUpdate = t;
    }
    applyMatrix4(t) {
      for (let e = 0, n = this.data.count; e < n; e++) rn.fromBufferAttribute(this, e), rn.applyMatrix4(t), this.setXYZ(e, rn.x, rn.y, rn.z);
      return this;
    }
    applyNormalMatrix(t) {
      for (let e = 0, n = this.count; e < n; e++) rn.fromBufferAttribute(this, e), rn.applyNormalMatrix(t), this.setXYZ(e, rn.x, rn.y, rn.z);
      return this;
    }
    transformDirection(t) {
      for (let e = 0, n = this.count; e < n; e++) rn.fromBufferAttribute(this, e), rn.transformDirection(t), this.setXYZ(e, rn.x, rn.y, rn.z);
      return this;
    }
    setX(t, e) {
      return this.normalized && (e = be(e, this.array)), this.data.array[t * this.data.stride + this.offset] = e, this;
    }
    setY(t, e) {
      return this.normalized && (e = be(e, this.array)), this.data.array[t * this.data.stride + this.offset + 1] = e, this;
    }
    setZ(t, e) {
      return this.normalized && (e = be(e, this.array)), this.data.array[t * this.data.stride + this.offset + 2] = e, this;
    }
    setW(t, e) {
      return this.normalized && (e = be(e, this.array)), this.data.array[t * this.data.stride + this.offset + 3] = e, this;
    }
    getX(t) {
      let e = this.data.array[t * this.data.stride + this.offset];
      return this.normalized && (e = ti(e, this.array)), e;
    }
    getY(t) {
      let e = this.data.array[t * this.data.stride + this.offset + 1];
      return this.normalized && (e = ti(e, this.array)), e;
    }
    getZ(t) {
      let e = this.data.array[t * this.data.stride + this.offset + 2];
      return this.normalized && (e = ti(e, this.array)), e;
    }
    getW(t) {
      let e = this.data.array[t * this.data.stride + this.offset + 3];
      return this.normalized && (e = ti(e, this.array)), e;
    }
    setXY(t, e, n) {
      return t = t * this.data.stride + this.offset, this.normalized && (e = be(e, this.array), n = be(n, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this;
    }
    setXYZ(t, e, n, s) {
      return t = t * this.data.stride + this.offset, this.normalized && (e = be(e, this.array), n = be(n, this.array), s = be(s, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = s, this;
    }
    setXYZW(t, e, n, s, r) {
      return t = t * this.data.stride + this.offset, this.normalized && (e = be(e, this.array), n = be(n, this.array), s = be(s, this.array), r = be(r, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = s, this.data.array[t + 3] = r, this;
    }
    clone(t) {
      if (t === void 0) {
        console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
        let e = [];
        for (let n = 0; n < this.count; n++) {
          let s = n * this.data.stride + this.offset;
          for (let r = 0; r < this.itemSize; r++) e.push(this.data.array[s + r]);
        }
        return new xe(new this.array.constructor(e), this.itemSize, this.normalized);
      } else return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new i(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
    }
    toJSON(t) {
      if (t === void 0) {
        console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
        let e = [];
        for (let n = 0; n < this.count; n++) {
          let s = n * this.data.stride + this.offset;
          for (let r = 0; r < this.itemSize; r++) e.push(this.data.array[s + r]);
        }
        return { itemSize: this.itemSize, type: this.array.constructor.name, array: e, normalized: this.normalized };
      } else return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)), { isInterleavedBufferAttribute: true, itemSize: this.itemSize, data: this.data.uuid, offset: this.offset, normalized: this.normalized };
    }
  }, yi = class extends si {
    constructor(t) {
      super(), this.isSpriteMaterial = true, this.type = "SpriteMaterial", this.color = new Xt(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = true, this.transparent = true, this.fog = true, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.rotation = t.rotation, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
    }
  }, Ms, nr = new Y(), bs = new Y(), Ss = new Y(), Es = new Bt(), ir = new Bt(), bu = new ve(), io = new Y(), sr = new Y(), so = new Y(), kh = new Bt(), qa = new Bt(), Hh = new Bt(), Yi = class extends $e {
    constructor(t = new yi()) {
      if (super(), this.isSprite = true, this.type = "Sprite", Ms === void 0) {
        Ms = new we();
        let e = new Float32Array([-0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5, 0, 0, 1]), n = new vc(e, 5);
        Ms.setIndex([0, 1, 2, 0, 2, 3]), Ms.setAttribute("position", new Po(n, 3, 0, false)), Ms.setAttribute("uv", new Po(n, 2, 3, false));
      }
      this.geometry = Ms, this.material = t, this.center = new Bt(0.5, 0.5);
    }
    raycast(t, e) {
      t.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), bs.setFromMatrixScale(this.matrixWorld), bu.copy(t.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse, this.matrixWorld), Ss.setFromMatrixPosition(this.modelViewMatrix), t.camera.isPerspectiveCamera && this.material.sizeAttenuation === false && bs.multiplyScalar(-Ss.z);
      let n = this.material.rotation, s, r;
      n !== 0 && (r = Math.cos(n), s = Math.sin(n));
      let a = this.center;
      ro(io.set(-0.5, -0.5, 0), Ss, a, bs, s, r), ro(sr.set(0.5, -0.5, 0), Ss, a, bs, s, r), ro(so.set(0.5, 0.5, 0), Ss, a, bs, s, r), kh.set(0, 0), qa.set(1, 0), Hh.set(1, 1);
      let o = t.ray.intersectTriangle(io, sr, so, false, nr);
      if (o === null && (ro(sr.set(-0.5, 0.5, 0), Ss, a, bs, s, r), qa.set(0, 1), o = t.ray.intersectTriangle(io, so, sr, false, nr), o === null)) return;
      let c = t.ray.origin.distanceTo(nr);
      c < t.near || c > t.far || e.push({ distance: c, point: nr.clone(), uv: Hi.getInterpolation(nr, io, sr, so, kh, qa, Hh, new Bt()), face: null, object: this });
    }
    copy(t, e) {
      return super.copy(t, e), t.center !== void 0 && this.center.copy(t.center), this.material = t.material, this;
    }
  };
  function ro(i, t, e, n, s, r) {
    Es.subVectors(i, e).addScalar(0.5).multiply(n), s !== void 0 ? (ir.x = r * Es.x - s * Es.y, ir.y = s * Es.x + r * Es.y) : ir.copy(Es), i.copy(t), i.x += ir.x, i.y += ir.y, i.applyMatrix4(bu);
  }
  var Lo = class extends xe {
    constructor(t, e, n, s = 1) {
      super(t, e, n), this.isInstancedBufferAttribute = true, this.meshPerAttribute = s;
    }
    copy(t) {
      return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this;
    }
    toJSON() {
      let t = super.toJSON();
      return t.meshPerAttribute = this.meshPerAttribute, t.isInstancedBufferAttribute = true, t;
    }
  }, ws = new ve(), Gh = new ve(), oo = [], Vh = new In(), fx = new ve(), rr = new zt(), or = new vi(), ri = class extends zt {
    constructor(t, e, n) {
      super(t, e), this.isInstancedMesh = true, this.instanceMatrix = new Lo(new Float32Array(n * 16), 16), this.instanceColor = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
      for (let s = 0; s < n; s++) this.setMatrixAt(s, fx);
    }
    computeBoundingBox() {
      let t = this.geometry, e = this.count;
      this.boundingBox === null && (this.boundingBox = new In()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
      for (let n = 0; n < e; n++) this.getMatrixAt(n, ws), Vh.copy(t.boundingBox).applyMatrix4(ws), this.boundingBox.union(Vh);
    }
    computeBoundingSphere() {
      let t = this.geometry, e = this.count;
      this.boundingSphere === null && (this.boundingSphere = new vi()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
      for (let n = 0; n < e; n++) this.getMatrixAt(n, ws), or.copy(t.boundingSphere).applyMatrix4(ws), this.boundingSphere.union(or);
    }
    copy(t, e) {
      return super.copy(t, e), this.instanceMatrix.copy(t.instanceMatrix), t.instanceColor !== null && (this.instanceColor = t.instanceColor.clone()), this.count = t.count, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
    }
    getColorAt(t, e) {
      e.fromArray(this.instanceColor.array, t * 3);
    }
    getMatrixAt(t, e) {
      e.fromArray(this.instanceMatrix.array, t * 16);
    }
    raycast(t, e) {
      let n = this.matrixWorld, s = this.count;
      if (rr.geometry = this.geometry, rr.material = this.material, rr.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), or.copy(this.boundingSphere), or.applyMatrix4(n), t.ray.intersectsSphere(or) !== false)) for (let r = 0; r < s; r++) {
        this.getMatrixAt(r, ws), Gh.multiplyMatrices(n, ws), rr.matrixWorld = Gh, rr.raycast(t, oo);
        for (let a = 0, o = oo.length; a < o; a++) {
          let c = oo[a];
          c.instanceId = r, c.object = this, e.push(c);
        }
        oo.length = 0;
      }
    }
    setColorAt(t, e) {
      this.instanceColor === null && (this.instanceColor = new Lo(new Float32Array(this.instanceMatrix.count * 3), 3)), e.toArray(this.instanceColor.array, t * 3);
    }
    setMatrixAt(t, e) {
      e.toArray(this.instanceMatrix.array, t * 16);
    }
    updateMorphTargets() {
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  };
  var oi = class extends si {
    constructor(t) {
      super(), this.isPointsMaterial = true, this.type = "PointsMaterial", this.color = new Xt(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = true, this.fog = true, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
    }
  }, Wh = new ve(), yc = new hr(), ao = new vi(), co = new Y(), Mi = class extends $e {
    constructor(t = new we(), e = new oi()) {
      super(), this.isPoints = true, this.type = "Points", this.geometry = t, this.material = e, this.updateMorphTargets();
    }
    copy(t, e) {
      return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
    }
    raycast(t, e) {
      let n = this.geometry, s = this.matrixWorld, r = t.params.Points.threshold, a = n.drawRange;
      if (n.boundingSphere === null && n.computeBoundingSphere(), ao.copy(n.boundingSphere), ao.applyMatrix4(s), ao.radius += r, t.ray.intersectsSphere(ao) === false) return;
      Wh.copy(s).invert(), yc.copy(t.ray).applyMatrix4(Wh);
      let o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = o * o, l = n.index, h = n.attributes.position;
      if (l !== null) {
        let f = Math.max(0, a.start), d = Math.min(l.count, a.start + a.count);
        for (let g = f, _ = d; g < _; g++) {
          let m = l.getX(g);
          co.fromBufferAttribute(h, m), Xh(co, m, c, s, t, e, this);
        }
      } else {
        let f = Math.max(0, a.start), d = Math.min(h.count, a.start + a.count);
        for (let g = f, _ = d; g < _; g++) co.fromBufferAttribute(h, g), Xh(co, g, c, s, t, e, this);
      }
    }
    updateMorphTargets() {
      let e = this.geometry.morphAttributes, n = Object.keys(e);
      if (n.length > 0) {
        let s = e[n[0]];
        if (s !== void 0) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let r = 0, a = s.length; r < a; r++) {
            let o = s[r].name || String(r);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
          }
        }
      }
    }
  };
  function Xh(i, t, e, n, s, r, a) {
    let o = yc.distanceSqToPoint(i);
    if (o < e) {
      let c = new Y();
      yc.closestPointToPoint(i, c), c.applyMatrix4(n);
      let l = s.ray.origin.distanceTo(c);
      if (l < s.near || l > s.far) return;
      r.push({ distance: l, distanceToRay: Math.sqrt(o), point: c, index: t, face: null, object: a });
    }
  }
  var wn = class extends Sn {
    constructor(t, e, n, s, r, a, o, c, l) {
      super(t, e, n, s, r, a, o, c, l), this.isCanvasTexture = true, this.needsUpdate = true;
    }
  };
  var Io = class i extends we {
    constructor(t = 1, e = 32, n = 0, s = Math.PI * 2) {
      super(), this.type = "CircleGeometry", this.parameters = { radius: t, segments: e, thetaStart: n, thetaLength: s }, e = Math.max(3, e);
      let r = [], a = [], o = [], c = [], l = new Y(), u = new Bt();
      a.push(0, 0, 0), o.push(0, 0, 1), c.push(0.5, 0.5);
      for (let h = 0, f = 3; h <= e; h++, f += 3) {
        let d = n + h / e * s;
        l.x = t * Math.cos(d), l.y = t * Math.sin(d), a.push(l.x, l.y, l.z), o.push(0, 0, 1), u.x = (a[f] / t + 1) / 2, u.y = (a[f + 1] / t + 1) / 2, c.push(u.x, u.y);
      }
      for (let h = 1; h <= e; h++) r.push(h, h + 1, 0);
      this.setIndex(r), this.setAttribute("position", new de(a, 3)), this.setAttribute("normal", new de(o, 3)), this.setAttribute("uv", new de(c, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.radius, t.segments, t.thetaStart, t.thetaLength);
    }
  }, sn = class i extends we {
    constructor(t = 1, e = 1, n = 1, s = 32, r = 1, a = false, o = 0, c = Math.PI * 2) {
      super(), this.type = "CylinderGeometry", this.parameters = { radiusTop: t, radiusBottom: e, height: n, radialSegments: s, heightSegments: r, openEnded: a, thetaStart: o, thetaLength: c };
      let l = this;
      s = Math.floor(s), r = Math.floor(r);
      let u = [], h = [], f = [], d = [], g = 0, _ = [], m = n / 2, p = 0;
      x(), a === false && (t > 0 && v(true), e > 0 && v(false)), this.setIndex(u), this.setAttribute("position", new de(h, 3)), this.setAttribute("normal", new de(f, 3)), this.setAttribute("uv", new de(d, 2));
      function x() {
        let E = new Y(), R = new Y(), w = 0, T = (e - t) / n;
        for (let U = 0; U <= r; U++) {
          let M = [], S = U / r, q = S * (e - t) + t;
          for (let J = 0; J <= s; J++) {
            let ht = J / s, H = ht * c + o, $ = Math.sin(H), et = Math.cos(H);
            R.x = q * $, R.y = -S * n + m, R.z = q * et, h.push(R.x, R.y, R.z), E.set($, T, et).normalize(), f.push(E.x, E.y, E.z), d.push(ht, 1 - S), M.push(g++);
          }
          _.push(M);
        }
        for (let U = 0; U < s; U++) for (let M = 0; M < r; M++) {
          let S = _[M][U], q = _[M + 1][U], J = _[M + 1][U + 1], ht = _[M][U + 1];
          u.push(S, q, ht), u.push(q, J, ht), w += 6;
        }
        l.addGroup(p, w, 0), p += w;
      }
      function v(E) {
        let R = g, w = new Bt(), T = new Y(), U = 0, M = E === true ? t : e, S = E === true ? 1 : -1;
        for (let J = 1; J <= s; J++) h.push(0, m * S, 0), f.push(0, S, 0), d.push(0.5, 0.5), g++;
        let q = g;
        for (let J = 0; J <= s; J++) {
          let H = J / s * c + o, $ = Math.cos(H), et = Math.sin(H);
          T.x = M * et, T.y = m * S, T.z = M * $, h.push(T.x, T.y, T.z), f.push(0, S, 0), w.x = $ * 0.5 + 0.5, w.y = et * 0.5 * S + 0.5, d.push(w.x, w.y), g++;
        }
        for (let J = 0; J < s; J++) {
          let ht = R + J, H = q + J;
          E === true ? u.push(H, H + 1, ht) : u.push(H + 1, H, ht), U += 3;
        }
        l.addGroup(p, U, E === true ? 1 : 2), p += U;
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
    }
  }, zs = class i extends sn {
    constructor(t = 1, e = 1, n = 32, s = 1, r = false, a = 0, o = Math.PI * 2) {
      super(0, t, e, n, s, r, a, o), this.type = "ConeGeometry", this.parameters = { radius: t, height: e, radialSegments: n, heightSegments: s, openEnded: r, thetaStart: a, thetaLength: o };
    }
    static fromJSON(t) {
      return new i(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
    }
  }, Mc = class i extends we {
    constructor(t = [], e = [], n = 1, s = 0) {
      super(), this.type = "PolyhedronGeometry", this.parameters = { vertices: t, indices: e, radius: n, detail: s };
      let r = [], a = [];
      o(s), l(n), u(), this.setAttribute("position", new de(r, 3)), this.setAttribute("normal", new de(r.slice(), 3)), this.setAttribute("uv", new de(a, 2)), s === 0 ? this.computeVertexNormals() : this.normalizeNormals();
      function o(x) {
        let v = new Y(), E = new Y(), R = new Y();
        for (let w = 0; w < e.length; w += 3) d(e[w + 0], v), d(e[w + 1], E), d(e[w + 2], R), c(v, E, R, x);
      }
      function c(x, v, E, R) {
        let w = R + 1, T = [];
        for (let U = 0; U <= w; U++) {
          T[U] = [];
          let M = x.clone().lerp(E, U / w), S = v.clone().lerp(E, U / w), q = w - U;
          for (let J = 0; J <= q; J++) J === 0 && U === w ? T[U][J] = M : T[U][J] = M.clone().lerp(S, J / q);
        }
        for (let U = 0; U < w; U++) for (let M = 0; M < 2 * (w - U) - 1; M++) {
          let S = Math.floor(M / 2);
          M % 2 === 0 ? (f(T[U][S + 1]), f(T[U + 1][S]), f(T[U][S])) : (f(T[U][S + 1]), f(T[U + 1][S + 1]), f(T[U + 1][S]));
        }
      }
      function l(x) {
        let v = new Y();
        for (let E = 0; E < r.length; E += 3) v.x = r[E + 0], v.y = r[E + 1], v.z = r[E + 2], v.normalize().multiplyScalar(x), r[E + 0] = v.x, r[E + 1] = v.y, r[E + 2] = v.z;
      }
      function u() {
        let x = new Y();
        for (let v = 0; v < r.length; v += 3) {
          x.x = r[v + 0], x.y = r[v + 1], x.z = r[v + 2];
          let E = m(x) / 2 / Math.PI + 0.5, R = p(x) / Math.PI + 0.5;
          a.push(E, 1 - R);
        }
        g(), h();
      }
      function h() {
        for (let x = 0; x < a.length; x += 6) {
          let v = a[x + 0], E = a[x + 2], R = a[x + 4], w = Math.max(v, E, R), T = Math.min(v, E, R);
          w > 0.9 && T < 0.1 && (v < 0.2 && (a[x + 0] += 1), E < 0.2 && (a[x + 2] += 1), R < 0.2 && (a[x + 4] += 1));
        }
      }
      function f(x) {
        r.push(x.x, x.y, x.z);
      }
      function d(x, v) {
        let E = x * 3;
        v.x = t[E + 0], v.y = t[E + 1], v.z = t[E + 2];
      }
      function g() {
        let x = new Y(), v = new Y(), E = new Y(), R = new Y(), w = new Bt(), T = new Bt(), U = new Bt();
        for (let M = 0, S = 0; M < r.length; M += 9, S += 6) {
          x.set(r[M + 0], r[M + 1], r[M + 2]), v.set(r[M + 3], r[M + 4], r[M + 5]), E.set(r[M + 6], r[M + 7], r[M + 8]), w.set(a[S + 0], a[S + 1]), T.set(a[S + 2], a[S + 3]), U.set(a[S + 4], a[S + 5]), R.copy(x).add(v).add(E).divideScalar(3);
          let q = m(R);
          _(w, S + 0, x, q), _(T, S + 2, v, q), _(U, S + 4, E, q);
        }
      }
      function _(x, v, E, R) {
        R < 0 && x.x === 1 && (a[v] = x.x - 1), E.x === 0 && E.z === 0 && (a[v] = R / 2 / Math.PI + 0.5);
      }
      function m(x) {
        return Math.atan2(x.z, -x.x);
      }
      function p(x) {
        return Math.atan2(-x.y, Math.sqrt(x.x * x.x + x.z * x.z));
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.vertices, t.indices, t.radius, t.details);
    }
  };
  var dx = { triangulate: function(i, t, e = 2) {
    let n = t && t.length, s = n ? t[0] * e : i.length, r = Su(i, 0, s, e, true), a = [];
    if (!r || r.next === r.prev) return a;
    let o, c, l, u, h, f, d;
    if (n && (r = _x(i, t, r, e)), i.length > 80 * e) {
      o = l = i[0], c = u = i[1];
      for (let g = e; g < s; g += e) h = i[g], f = i[g + 1], h < o && (o = h), f < c && (c = f), h > l && (l = h), f > u && (u = f);
      d = Math.max(l - o, u - c), d = d !== 0 ? 32767 / d : 0;
    }
    return mr(r, a, e, o, c, d, 0), a;
  } };
  function Su(i, t, e, n, s) {
    let r, a;
    if (s === Cx(i, t, e, n) > 0) for (r = t; r < e; r += n) a = qh(r, i[r], i[r + 1], a);
    else for (r = e - n; r >= t; r -= n) a = qh(r, i[r], i[r + 1], a);
    return a && Vo(a, a.next) && (xr(a), a = a.next), a;
  }
  function Zi(i, t) {
    if (!i) return i;
    t || (t = i);
    let e = i, n;
    do
      if (n = false, !e.steiner && (Vo(e, e.next) || De(e.prev, e, e.next) === 0)) {
        if (xr(e), e = t = e.prev, e === e.next) break;
        n = true;
      } else e = e.next;
    while (n || e !== t);
    return t;
  }
  function mr(i, t, e, n, s, r, a) {
    if (!i) return;
    !a && r && Sx(i, n, s, r);
    let o = i, c, l;
    for (; i.prev !== i.next; ) {
      if (c = i.prev, l = i.next, r ? mx(i, n, s, r) : px(i)) {
        t.push(c.i / e | 0), t.push(i.i / e | 0), t.push(l.i / e | 0), xr(i), i = l.next, o = l.next;
        continue;
      }
      if (i = l, i === o) {
        a ? a === 1 ? (i = gx(Zi(i), t, e), mr(i, t, e, n, s, r, 2)) : a === 2 && xx(i, t, e, n, s, r) : mr(Zi(i), t, e, n, s, r, 1);
        break;
      }
    }
  }
  function px(i) {
    let t = i.prev, e = i, n = i.next;
    if (De(t, e, n) >= 0) return false;
    let s = t.x, r = e.x, a = n.x, o = t.y, c = e.y, l = n.y, u = s < r ? s < a ? s : a : r < a ? r : a, h = o < c ? o < l ? o : l : c < l ? c : l, f = s > r ? s > a ? s : a : r > a ? r : a, d = o > c ? o > l ? o : l : c > l ? c : l, g = n.next;
    for (; g !== t; ) {
      if (g.x >= u && g.x <= f && g.y >= h && g.y <= d && Rs(s, o, r, c, a, l, g.x, g.y) && De(g.prev, g, g.next) >= 0) return false;
      g = g.next;
    }
    return true;
  }
  function mx(i, t, e, n) {
    let s = i.prev, r = i, a = i.next;
    if (De(s, r, a) >= 0) return false;
    let o = s.x, c = r.x, l = a.x, u = s.y, h = r.y, f = a.y, d = o < c ? o < l ? o : l : c < l ? c : l, g = u < h ? u < f ? u : f : h < f ? h : f, _ = o > c ? o > l ? o : l : c > l ? c : l, m = u > h ? u > f ? u : f : h > f ? h : f, p = bc(d, g, t, e, n), x = bc(_, m, t, e, n), v = i.prevZ, E = i.nextZ;
    for (; v && v.z >= p && E && E.z <= x; ) {
      if (v.x >= d && v.x <= _ && v.y >= g && v.y <= m && v !== s && v !== a && Rs(o, u, c, h, l, f, v.x, v.y) && De(v.prev, v, v.next) >= 0 || (v = v.prevZ, E.x >= d && E.x <= _ && E.y >= g && E.y <= m && E !== s && E !== a && Rs(o, u, c, h, l, f, E.x, E.y) && De(E.prev, E, E.next) >= 0)) return false;
      E = E.nextZ;
    }
    for (; v && v.z >= p; ) {
      if (v.x >= d && v.x <= _ && v.y >= g && v.y <= m && v !== s && v !== a && Rs(o, u, c, h, l, f, v.x, v.y) && De(v.prev, v, v.next) >= 0) return false;
      v = v.prevZ;
    }
    for (; E && E.z <= x; ) {
      if (E.x >= d && E.x <= _ && E.y >= g && E.y <= m && E !== s && E !== a && Rs(o, u, c, h, l, f, E.x, E.y) && De(E.prev, E, E.next) >= 0) return false;
      E = E.nextZ;
    }
    return true;
  }
  function gx(i, t, e) {
    let n = i;
    do {
      let s = n.prev, r = n.next.next;
      !Vo(s, r) && Eu(s, n, n.next, r) && gr(s, r) && gr(r, s) && (t.push(s.i / e | 0), t.push(n.i / e | 0), t.push(r.i / e | 0), xr(n), xr(n.next), n = i = r), n = n.next;
    } while (n !== i);
    return Zi(n);
  }
  function xx(i, t, e, n, s, r) {
    let a = i;
    do {
      let o = a.next.next;
      for (; o !== a.prev; ) {
        if (a.i !== o.i && Tx(a, o)) {
          let c = wu(a, o);
          a = Zi(a, a.next), c = Zi(c, c.next), mr(a, t, e, n, s, r, 0), mr(c, t, e, n, s, r, 0);
          return;
        }
        o = o.next;
      }
      a = a.next;
    } while (a !== i);
  }
  function _x(i, t, e, n) {
    let s = [], r, a, o, c, l;
    for (r = 0, a = t.length; r < a; r++) o = t[r] * n, c = r < a - 1 ? t[r + 1] * n : i.length, l = Su(i, o, c, n, false), l === l.next && (l.steiner = true), s.push(wx(l));
    for (s.sort(vx), r = 0; r < s.length; r++) e = yx(s[r], e);
    return e;
  }
  function vx(i, t) {
    return i.x - t.x;
  }
  function yx(i, t) {
    let e = Mx(i, t);
    if (!e) return t;
    let n = wu(e, i);
    return Zi(n, n.next), Zi(e, e.next);
  }
  function Mx(i, t) {
    let e = t, n = -1 / 0, s, r = i.x, a = i.y;
    do {
      if (a <= e.y && a >= e.next.y && e.next.y !== e.y) {
        let f = e.x + (a - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
        if (f <= r && f > n && (n = f, s = e.x < e.next.x ? e : e.next, f === r)) return s;
      }
      e = e.next;
    } while (e !== t);
    if (!s) return null;
    let o = s, c = s.x, l = s.y, u = 1 / 0, h;
    e = s;
    do
      r >= e.x && e.x >= c && r !== e.x && Rs(a < l ? r : n, a, c, l, a < l ? n : r, a, e.x, e.y) && (h = Math.abs(a - e.y) / (r - e.x), gr(e, i) && (h < u || h === u && (e.x > s.x || e.x === s.x && bx(s, e))) && (s = e, u = h)), e = e.next;
    while (e !== o);
    return s;
  }
  function bx(i, t) {
    return De(i.prev, i, t.prev) < 0 && De(t.next, i, i.next) < 0;
  }
  function Sx(i, t, e, n) {
    let s = i;
    do
      s.z === 0 && (s.z = bc(s.x, s.y, t, e, n)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
    while (s !== i);
    s.prevZ.nextZ = null, s.prevZ = null, Ex(s);
  }
  function Ex(i) {
    let t, e, n, s, r, a, o, c, l = 1;
    do {
      for (e = i, i = null, r = null, a = 0; e; ) {
        for (a++, n = e, o = 0, t = 0; t < l && (o++, n = n.nextZ, !!n); t++) ;
        for (c = l; o > 0 || c > 0 && n; ) o !== 0 && (c === 0 || !n || e.z <= n.z) ? (s = e, e = e.nextZ, o--) : (s = n, n = n.nextZ, c--), r ? r.nextZ = s : i = s, s.prevZ = r, r = s;
        e = n;
      }
      r.nextZ = null, l *= 2;
    } while (a > 1);
    return i;
  }
  function bc(i, t, e, n, s) {
    return i = (i - e) * s | 0, t = (t - n) * s | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
  }
  function wx(i) {
    let t = i, e = i;
    do
      (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
    while (t !== i);
    return e;
  }
  function Rs(i, t, e, n, s, r, a, o) {
    return (s - a) * (t - o) >= (i - a) * (r - o) && (i - a) * (n - o) >= (e - a) * (t - o) && (e - a) * (r - o) >= (s - a) * (n - o);
  }
  function Tx(i, t) {
    return i.next.i !== t.i && i.prev.i !== t.i && !Ax(i, t) && (gr(i, t) && gr(t, i) && Rx(i, t) && (De(i.prev, i, t.prev) || De(i, t.prev, t)) || Vo(i, t) && De(i.prev, i, i.next) > 0 && De(t.prev, t, t.next) > 0);
  }
  function De(i, t, e) {
    return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
  }
  function Vo(i, t) {
    return i.x === t.x && i.y === t.y;
  }
  function Eu(i, t, e, n) {
    let s = ho(De(i, t, e)), r = ho(De(i, t, n)), a = ho(De(e, n, i)), o = ho(De(e, n, t));
    return !!(s !== r && a !== o || s === 0 && lo(i, e, t) || r === 0 && lo(i, n, t) || a === 0 && lo(e, i, n) || o === 0 && lo(e, t, n));
  }
  function lo(i, t, e) {
    return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
  }
  function ho(i) {
    return i > 0 ? 1 : i < 0 ? -1 : 0;
  }
  function Ax(i, t) {
    let e = i;
    do {
      if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && Eu(e, e.next, i, t)) return true;
      e = e.next;
    } while (e !== i);
    return false;
  }
  function gr(i, t) {
    return De(i.prev, i, i.next) < 0 ? De(i, t, i.next) >= 0 && De(i, i.prev, t) >= 0 : De(i, t, i.prev) < 0 || De(i, i.next, t) < 0;
  }
  function Rx(i, t) {
    let e = i, n = false, s = (i.x + t.x) / 2, r = (i.y + t.y) / 2;
    do
      e.y > r != e.next.y > r && e.next.y !== e.y && s < (e.next.x - e.x) * (r - e.y) / (e.next.y - e.y) + e.x && (n = !n), e = e.next;
    while (e !== i);
    return n;
  }
  function wu(i, t) {
    let e = new Sc(i.i, i.x, i.y), n = new Sc(t.i, t.x, t.y), s = i.next, r = t.prev;
    return i.next = t, t.prev = i, e.next = s, s.prev = e, n.next = e, e.prev = n, r.next = n, n.prev = r, n;
  }
  function qh(i, t, e, n) {
    let s = new Sc(i, t, e);
    return n ? (s.next = n.next, s.prev = n, n.next.prev = s, n.next = s) : (s.prev = s, s.next = s), s;
  }
  function xr(i) {
    i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
  }
  function Sc(i, t, e) {
    this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = false;
  }
  function Cx(i, t, e, n) {
    let s = 0;
    for (let r = t, a = e - n; r < e; r += n) s += (i[a] - i[r]) * (i[r + 1] + i[a + 1]), a = r;
    return s;
  }
  var Ji = class i {
    static area(t) {
      let e = t.length, n = 0;
      for (let s = e - 1, r = 0; r < e; s = r++) n += t[s].x * t[r].y - t[r].x * t[s].y;
      return n * 0.5;
    }
    static isClockWise(t) {
      return i.area(t) < 0;
    }
    static triangulateShape(t, e) {
      let n = [], s = [], r = [];
      Yh(t), Zh(n, t);
      let a = t.length;
      e.forEach(Yh);
      for (let c = 0; c < e.length; c++) s.push(a), a += e[c].length, Zh(n, e[c]);
      let o = dx.triangulate(n, s);
      for (let c = 0; c < o.length; c += 3) r.push(o.slice(c, c + 3));
      return r;
    }
  };
  function Yh(i) {
    let t = i.length;
    t > 2 && i[t - 1].equals(i[0]) && i.pop();
  }
  function Zh(i, t) {
    for (let e = 0; e < t.length; e++) i.push(t[e].x), i.push(t[e].y);
  }
  var Un = class i extends Mc {
    constructor(t = 1, e = 0) {
      let n = (1 + Math.sqrt(5)) / 2, s = [-1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, 0, 0, -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, n, 0, -1, n, 0, 1, -n, 0, -1, -n, 0, 1], r = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
      super(s, r, t, e), this.type = "IcosahedronGeometry", this.parameters = { radius: t, detail: e };
    }
    static fromJSON(t) {
      return new i(t.radius, t.detail);
    }
  };
  var Dn = class i extends we {
    constructor(t = 1, e = 32, n = 16, s = 0, r = Math.PI * 2, a = 0, o = Math.PI) {
      super(), this.type = "SphereGeometry", this.parameters = { radius: t, widthSegments: e, heightSegments: n, phiStart: s, phiLength: r, thetaStart: a, thetaLength: o }, e = Math.max(3, Math.floor(e)), n = Math.max(2, Math.floor(n));
      let c = Math.min(a + o, Math.PI), l = 0, u = [], h = new Y(), f = new Y(), d = [], g = [], _ = [], m = [];
      for (let p = 0; p <= n; p++) {
        let x = [], v = p / n, E = 0;
        p === 0 && a === 0 ? E = 0.5 / e : p === n && c === Math.PI && (E = -0.5 / e);
        for (let R = 0; R <= e; R++) {
          let w = R / e;
          h.x = -t * Math.cos(s + w * r) * Math.sin(a + v * o), h.y = t * Math.cos(a + v * o), h.z = t * Math.sin(s + w * r) * Math.sin(a + v * o), g.push(h.x, h.y, h.z), f.copy(h).normalize(), _.push(f.x, f.y, f.z), m.push(w + E, 1 - v), x.push(l++);
        }
        u.push(x);
      }
      for (let p = 0; p < n; p++) for (let x = 0; x < e; x++) {
        let v = u[p][x + 1], E = u[p][x], R = u[p + 1][x], w = u[p + 1][x + 1];
        (p !== 0 || a > 0) && d.push(v, E, w), (p !== n - 1 || c < Math.PI) && d.push(E, R, w);
      }
      this.setIndex(d), this.setAttribute("position", new de(g, 3)), this.setAttribute("normal", new de(_, 3)), this.setAttribute("uv", new de(m, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
    }
  };
  var Uo = class i extends we {
    constructor(t = 1, e = 0.4, n = 12, s = 48, r = Math.PI * 2) {
      super(), this.type = "TorusGeometry", this.parameters = { radius: t, tube: e, radialSegments: n, tubularSegments: s, arc: r }, n = Math.floor(n), s = Math.floor(s);
      let a = [], o = [], c = [], l = [], u = new Y(), h = new Y(), f = new Y();
      for (let d = 0; d <= n; d++) for (let g = 0; g <= s; g++) {
        let _ = g / s * r, m = d / n * Math.PI * 2;
        h.x = (t + e * Math.cos(m)) * Math.cos(_), h.y = (t + e * Math.cos(m)) * Math.sin(_), h.z = e * Math.sin(m), o.push(h.x, h.y, h.z), u.x = t * Math.cos(_), u.y = t * Math.sin(_), f.subVectors(h, u).normalize(), c.push(f.x, f.y, f.z), l.push(g / s), l.push(d / n);
      }
      for (let d = 1; d <= n; d++) for (let g = 1; g <= s; g++) {
        let _ = (s + 1) * d + g - 1, m = (s + 1) * (d - 1) + g - 1, p = (s + 1) * (d - 1) + g, x = (s + 1) * d + g;
        a.push(_, m, x), a.push(m, p, x);
      }
      this.setIndex(a), this.setAttribute("position", new de(o, 3)), this.setAttribute("normal", new de(c, 3)), this.setAttribute("uv", new de(l, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new i(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
    }
  };
  var Do = class extends Te {
    constructor(t) {
      super(t), this.isRawShaderMaterial = true, this.type = "RawShaderMaterial";
    }
  }, ae = class extends si {
    constructor(t) {
      super(), this.isMeshStandardMaterial = true, this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new Xt(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Xt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = uu, this.normalScale = new Bt(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = false, this.fog = true, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
    }
  };
  function uo(i, t, e) {
    return !i || !e && i.constructor === t ? i : typeof t.BYTES_PER_ELEMENT == "number" ? new t(i) : Array.prototype.slice.call(i);
  }
  function Px(i) {
    return ArrayBuffer.isView(i) && !(i instanceof DataView);
  }
  var Bs = class {
    constructor(t, e, n, s) {
      this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = s !== void 0 ? s : new e.constructor(n), this.sampleValues = e, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
    }
    evaluate(t) {
      let e = this.parameterPositions, n = this._cachedIndex, s = e[n], r = e[n - 1];
      n: {
        t: {
          let a;
          e: {
            i: if (!(t < s)) {
              for (let o = n + 2; ; ) {
                if (s === void 0) {
                  if (t < r) break i;
                  return n = e.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
                }
                if (n === o) break;
                if (r = s, s = e[++n], t < s) break t;
              }
              a = e.length;
              break e;
            }
            if (!(t >= r)) {
              let o = e[1];
              t < o && (n = 2, r = o);
              for (let c = n - 2; ; ) {
                if (r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
                if (n === c) break;
                if (s = r, r = e[--n - 1], t >= r) break t;
              }
              a = n, n = 0;
              break e;
            }
            break n;
          }
          for (; n < a; ) {
            let o = n + a >>> 1;
            t < e[o] ? a = o : n = o + 1;
          }
          if (s = e[n], r = e[n - 1], r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
          if (s === void 0) return n = e.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
        }
        this._cachedIndex = n, this.intervalChanged_(n, r, s);
      }
      return this.interpolate_(n, r, t, s);
    }
    getSettings_() {
      return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(t) {
      let e = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = t * s;
      for (let a = 0; a !== s; ++a) e[a] = n[r + a];
      return e;
    }
    interpolate_() {
      throw new Error("call to abstract method");
    }
    intervalChanged_() {
    }
  }, Ec = class extends Bs {
    constructor(t, e, n, s) {
      super(t, e, n, s), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = { endingStart: Kl, endingEnd: Kl };
    }
    intervalChanged_(t, e, n) {
      let s = this.parameterPositions, r = t - 2, a = t + 1, o = s[r], c = s[a];
      if (o === void 0) switch (this.getSettings_().endingStart) {
        case jl:
          r = t, o = 2 * e - n;
          break;
        case Ql:
          r = s.length - 2, o = e + s[r] - s[r + 1];
          break;
        default:
          r = t, o = n;
      }
      if (c === void 0) switch (this.getSettings_().endingEnd) {
        case jl:
          a = t, c = 2 * n - e;
          break;
        case Ql:
          a = 1, c = n + s[1] - s[0];
          break;
        default:
          a = t - 1, c = e;
      }
      let l = (n - e) * 0.5, u = this.valueSize;
      this._weightPrev = l / (e - o), this._weightNext = l / (c - n), this._offsetPrev = r * u, this._offsetNext = a * u;
    }
    interpolate_(t, e, n, s) {
      let r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = t * o, l = c - o, u = this._offsetPrev, h = this._offsetNext, f = this._weightPrev, d = this._weightNext, g = (n - e) / (s - e), _ = g * g, m = _ * g, p = -f * m + 2 * f * _ - f * g, x = (1 + f) * m + (-1.5 - 2 * f) * _ + (-0.5 + f) * g + 1, v = (-1 - d) * m + (1.5 + d) * _ + 0.5 * g, E = d * m - d * _;
      for (let R = 0; R !== o; ++R) r[R] = p * a[u + R] + x * a[l + R] + v * a[c + R] + E * a[h + R];
      return r;
    }
  }, wc = class extends Bs {
    constructor(t, e, n, s) {
      super(t, e, n, s);
    }
    interpolate_(t, e, n, s) {
      let r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = t * o, l = c - o, u = (n - e) / (s - e), h = 1 - u;
      for (let f = 0; f !== o; ++f) r[f] = a[l + f] * h + a[c + f] * u;
      return r;
    }
  }, Tc = class extends Bs {
    constructor(t, e, n, s) {
      super(t, e, n, s);
    }
    interpolate_(t) {
      return this.copySampleValue_(t - 1);
    }
  }, Nn = class {
    constructor(t, e, n, s) {
      if (t === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
      if (e === void 0 || e.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
      this.name = t, this.times = uo(e, this.TimeBufferType), this.values = uo(n, this.ValueBufferType), this.setInterpolation(s || this.DefaultInterpolation);
    }
    static toJSON(t) {
      let e = t.constructor, n;
      if (e.toJSON !== this.toJSON) n = e.toJSON(t);
      else {
        n = { name: t.name, times: uo(t.times, Array), values: uo(t.values, Array) };
        let s = t.getInterpolation();
        s !== t.DefaultInterpolation && (n.interpolation = s);
      }
      return n.type = t.ValueTypeName, n;
    }
    InterpolantFactoryMethodDiscrete(t) {
      return new Tc(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodLinear(t) {
      return new wc(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodSmooth(t) {
      return new Ec(this.times, this.values, this.getValueSize(), t);
    }
    setInterpolation(t) {
      let e;
      switch (t) {
        case po:
          e = this.InterpolantFactoryMethodDiscrete;
          break;
        case mo:
          e = this.InterpolantFactoryMethodLinear;
          break;
        case Ma:
          e = this.InterpolantFactoryMethodSmooth;
          break;
      }
      if (e === void 0) {
        let n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
        if (this.createInterpolant === void 0) if (t !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
        else throw new Error(n);
        return console.warn("THREE.KeyframeTrack:", n), this;
      }
      return this.createInterpolant = e, this;
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return po;
        case this.InterpolantFactoryMethodLinear:
          return mo;
        case this.InterpolantFactoryMethodSmooth:
          return Ma;
      }
    }
    getValueSize() {
      return this.values.length / this.times.length;
    }
    shift(t) {
      if (t !== 0) {
        let e = this.times;
        for (let n = 0, s = e.length; n !== s; ++n) e[n] += t;
      }
      return this;
    }
    scale(t) {
      if (t !== 1) {
        let e = this.times;
        for (let n = 0, s = e.length; n !== s; ++n) e[n] *= t;
      }
      return this;
    }
    trim(t, e) {
      let n = this.times, s = n.length, r = 0, a = s - 1;
      for (; r !== s && n[r] < t; ) ++r;
      for (; a !== -1 && n[a] > e; ) --a;
      if (++a, r !== 0 || a !== s) {
        r >= a && (a = Math.max(a, 1), r = a - 1);
        let o = this.getValueSize();
        this.times = n.slice(r, a), this.values = this.values.slice(r * o, a * o);
      }
      return this;
    }
    validate() {
      let t = true, e = this.getValueSize();
      e - Math.floor(e) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), t = false);
      let n = this.times, s = this.values, r = n.length;
      r === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), t = false);
      let a = null;
      for (let o = 0; o !== r; o++) {
        let c = n[o];
        if (typeof c == "number" && isNaN(c)) {
          console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, c), t = false;
          break;
        }
        if (a !== null && a > c) {
          console.error("THREE.KeyframeTrack: Out of order keys.", this, o, c, a), t = false;
          break;
        }
        a = c;
      }
      if (s !== void 0 && Px(s)) for (let o = 0, c = s.length; o !== c; ++o) {
        let l = s[o];
        if (isNaN(l)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, l), t = false;
          break;
        }
      }
      return t;
    }
    optimize() {
      let t = this.times.slice(), e = this.values.slice(), n = this.getValueSize(), s = this.getInterpolation() === Ma, r = t.length - 1, a = 1;
      for (let o = 1; o < r; ++o) {
        let c = false, l = t[o], u = t[o + 1];
        if (l !== u && (o !== 1 || l !== t[0])) if (s) c = true;
        else {
          let h = o * n, f = h - n, d = h + n;
          for (let g = 0; g !== n; ++g) {
            let _ = e[h + g];
            if (_ !== e[f + g] || _ !== e[d + g]) {
              c = true;
              break;
            }
          }
        }
        if (c) {
          if (o !== a) {
            t[a] = t[o];
            let h = o * n, f = a * n;
            for (let d = 0; d !== n; ++d) e[f + d] = e[h + d];
          }
          ++a;
        }
      }
      if (r > 0) {
        t[a] = t[r];
        for (let o = r * n, c = a * n, l = 0; l !== n; ++l) e[c + l] = e[o + l];
        ++a;
      }
      return a !== t.length ? (this.times = t.slice(0, a), this.values = e.slice(0, a * n)) : (this.times = t, this.values = e), this;
    }
    clone() {
      let t = this.times.slice(), e = this.values.slice(), n = this.constructor, s = new n(this.name, t, e);
      return s.createInterpolant = this.createInterpolant, s;
    }
  };
  Nn.prototype.TimeBufferType = Float32Array;
  Nn.prototype.ValueBufferType = Float32Array;
  Nn.prototype.DefaultInterpolation = mo;
  var $i = class extends Nn {
  };
  $i.prototype.ValueTypeName = "bool";
  $i.prototype.ValueBufferType = Array;
  $i.prototype.DefaultInterpolation = po;
  $i.prototype.InterpolantFactoryMethodLinear = void 0;
  $i.prototype.InterpolantFactoryMethodSmooth = void 0;
  var Ac = class extends Nn {
  };
  Ac.prototype.ValueTypeName = "color";
  var Rc = class extends Nn {
  };
  Rc.prototype.ValueTypeName = "number";
  var Cc = class extends Bs {
    constructor(t, e, n, s) {
      super(t, e, n, s);
    }
    interpolate_(t, e, n, s) {
      let r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = (n - e) / (s - e), l = t * o;
      for (let u = l + o; l !== u; l += 4) En.slerpFlat(r, 0, a, l - o, a, l, c);
      return r;
    }
  }, _r = class extends Nn {
    InterpolantFactoryMethodLinear(t) {
      return new Cc(this.times, this.values, this.getValueSize(), t);
    }
  };
  _r.prototype.ValueTypeName = "quaternion";
  _r.prototype.DefaultInterpolation = mo;
  _r.prototype.InterpolantFactoryMethodSmooth = void 0;
  var Ki = class extends Nn {
  };
  Ki.prototype.ValueTypeName = "string";
  Ki.prototype.ValueBufferType = Array;
  Ki.prototype.DefaultInterpolation = po;
  Ki.prototype.InterpolantFactoryMethodLinear = void 0;
  Ki.prototype.InterpolantFactoryMethodSmooth = void 0;
  var Pc = class extends Nn {
  };
  Pc.prototype.ValueTypeName = "vector";
  var Lc = class {
    constructor(t, e, n) {
      let s = this, r = false, a = 0, o = 0, c, l = [];
      this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function(u) {
        o++, r === false && s.onStart !== void 0 && s.onStart(u, a, o), r = true;
      }, this.itemEnd = function(u) {
        a++, s.onProgress !== void 0 && s.onProgress(u, a, o), a === o && (r = false, s.onLoad !== void 0 && s.onLoad());
      }, this.itemError = function(u) {
        s.onError !== void 0 && s.onError(u);
      }, this.resolveURL = function(u) {
        return c ? c(u) : u;
      }, this.setURLModifier = function(u) {
        return c = u, this;
      }, this.addHandler = function(u, h) {
        return l.push(u, h), this;
      }, this.removeHandler = function(u) {
        let h = l.indexOf(u);
        return h !== -1 && l.splice(h, 2), this;
      }, this.getHandler = function(u) {
        for (let h = 0, f = l.length; h < f; h += 2) {
          let d = l[h], g = l[h + 1];
          if (d.global && (d.lastIndex = 0), d.test(u)) return g;
        }
        return null;
      };
    }
  }, Lx = new Lc(), Ic = class {
    constructor(t) {
      this.manager = t !== void 0 ? t : Lx, this.crossOrigin = "anonymous", this.withCredentials = false, this.path = "", this.resourcePath = "", this.requestHeader = {};
    }
    load() {
    }
    loadAsync(t, e) {
      let n = this;
      return new Promise(function(s, r) {
        n.load(t, s, e, r);
      });
    }
    parse() {
    }
    setCrossOrigin(t) {
      return this.crossOrigin = t, this;
    }
    setWithCredentials(t) {
      return this.withCredentials = t, this;
    }
    setPath(t) {
      return this.path = t, this;
    }
    setResourcePath(t) {
      return this.resourcePath = t, this;
    }
    setRequestHeader(t) {
      return this.requestHeader = t, this;
    }
  };
  Ic.DEFAULT_MATERIAL_NAME = "__DEFAULT";
  var vr = class extends $e {
    constructor(t, e = 1) {
      super(), this.isLight = true, this.type = "Light", this.color = new Xt(t), this.intensity = e;
    }
    dispose() {
    }
    copy(t, e) {
      return super.copy(t, e), this.color.copy(t.color), this.intensity = t.intensity, this;
    }
    toJSON(t) {
      let e = super.toJSON(t);
      return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (e.object.distance = this.distance), this.angle !== void 0 && (e.object.angle = this.angle), this.decay !== void 0 && (e.object.decay = this.decay), this.penumbra !== void 0 && (e.object.penumbra = this.penumbra), this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()), e;
    }
  }, No = class extends vr {
    constructor(t, e, n) {
      super(t, n), this.isHemisphereLight = true, this.type = "HemisphereLight", this.position.copy($e.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Xt(e);
    }
    copy(t, e) {
      return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
    }
  }, Ya = new ve(), Jh = new Y(), $h = new Y(), Oo = class {
    constructor(t) {
      this.camera = t, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Bt(512, 512), this.map = null, this.mapPass = null, this.matrix = new ve(), this.autoUpdate = true, this.needsUpdate = false, this._frustum = new fr(), this._frameExtents = new Bt(1, 1), this._viewportCount = 1, this._viewports = [new Pe(0, 0, 1, 1)];
    }
    getViewportCount() {
      return this._viewportCount;
    }
    getFrustum() {
      return this._frustum;
    }
    updateMatrices(t) {
      let e = this.camera, n = this.matrix;
      Jh.setFromMatrixPosition(t.matrixWorld), e.position.copy(Jh), $h.setFromMatrixPosition(t.target.matrixWorld), e.lookAt($h), e.updateMatrixWorld(), Ya.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Ya), n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), n.multiply(Ya);
    }
    getViewport(t) {
      return this._viewports[t];
    }
    getFrameExtents() {
      return this._frameExtents;
    }
    dispose() {
      this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
    }
    copy(t) {
      return this.camera = t.camera.clone(), this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      let t = {};
      return this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(false).object, delete t.camera.matrix, t;
    }
  };
  var Kh = new ve(), ar = new Y(), Za = new Y(), Uc = class extends Oo {
    constructor() {
      super(new nn(90, 1, 0.5, 500)), this.isPointLightShadow = true, this._frameExtents = new Bt(4, 2), this._viewportCount = 6, this._viewports = [new Pe(2, 1, 1, 1), new Pe(0, 1, 1, 1), new Pe(3, 1, 1, 1), new Pe(1, 1, 1, 1), new Pe(3, 0, 1, 1), new Pe(1, 0, 1, 1)], this._cubeDirections = [new Y(1, 0, 0), new Y(-1, 0, 0), new Y(0, 0, 1), new Y(0, 0, -1), new Y(0, 1, 0), new Y(0, -1, 0)], this._cubeUps = [new Y(0, 1, 0), new Y(0, 1, 0), new Y(0, 1, 0), new Y(0, 1, 0), new Y(0, 0, 1), new Y(0, 0, -1)];
    }
    updateMatrices(t, e = 0) {
      let n = this.camera, s = this.matrix, r = t.distance || n.far;
      r !== n.far && (n.far = r, n.updateProjectionMatrix()), ar.setFromMatrixPosition(t.matrixWorld), n.position.copy(ar), Za.copy(n.position), Za.add(this._cubeDirections[e]), n.up.copy(this._cubeUps[e]), n.lookAt(Za), n.updateMatrixWorld(), s.makeTranslation(-ar.x, -ar.y, -ar.z), Kh.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Kh);
    }
  }, cn = class extends vr {
    constructor(t, e, n = 0, s = 2) {
      super(t, e), this.isPointLight = true, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new Uc();
    }
    get power() {
      return this.intensity * 4 * Math.PI;
    }
    set power(t) {
      this.intensity = t / (4 * Math.PI);
    }
    dispose() {
      this.shadow.dispose();
    }
    copy(t, e) {
      return super.copy(t, e), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this;
    }
  }, Dc = class extends Oo {
    constructor() {
      super(new Os(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = true;
    }
  }, Fo = class extends vr {
    constructor(t, e) {
      super(t, e), this.isDirectionalLight = true, this.type = "DirectionalLight", this.position.copy($e.DEFAULT_UP), this.updateMatrix(), this.target = new $e(), this.shadow = new Dc();
    }
    dispose() {
      this.shadow.dispose();
    }
    copy(t) {
      return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
    }
  };
  var zo = class {
    constructor(t = true) {
      this.autoStart = t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = false;
    }
    start() {
      this.startTime = jh(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = true;
    }
    stop() {
      this.getElapsedTime(), this.running = false, this.autoStart = false;
    }
    getElapsedTime() {
      return this.getDelta(), this.elapsedTime;
    }
    getDelta() {
      let t = 0;
      if (this.autoStart && !this.running) return this.start(), 0;
      if (this.running) {
        let e = jh();
        t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t;
      }
      return t;
    }
  };
  function jh() {
    return (typeof performance > "u" ? Date : performance).now();
  }
  var qc = "\\[\\]\\.:\\/", Ix = new RegExp("[" + qc + "]", "g"), Yc = "[^" + qc + "]", Ux = "[^" + qc.replace("\\.", "") + "]", Dx = /((?:WC+[\/:])*)/.source.replace("WC", Yc), Nx = /(WCOD+)?/.source.replace("WCOD", Ux), Ox = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Yc), Fx = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Yc), zx = new RegExp("^" + Dx + Nx + Ox + Fx + "$"), Bx = ["material", "materials", "bones", "map"], Nc = class {
    constructor(t, e, n) {
      let s = n || Ce.parseTrackName(e);
      this._targetGroup = t, this._bindings = t.subscribe_(e, s);
    }
    getValue(t, e) {
      this.bind();
      let n = this._targetGroup.nCachedObjects_, s = this._bindings[n];
      s !== void 0 && s.getValue(t, e);
    }
    setValue(t, e) {
      let n = this._bindings;
      for (let s = this._targetGroup.nCachedObjects_, r = n.length; s !== r; ++s) n[s].setValue(t, e);
    }
    bind() {
      let t = this._bindings;
      for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].bind();
    }
    unbind() {
      let t = this._bindings;
      for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].unbind();
    }
  }, Ce = class i {
    constructor(t, e, n) {
      this.path = e, this.parsedPath = n || i.parseTrackName(e), this.node = i.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
    static create(t, e, n) {
      return t && t.isAnimationObjectGroup ? new i.Composite(t, e, n) : new i(t, e, n);
    }
    static sanitizeNodeName(t) {
      return t.replace(/\s/g, "_").replace(Ix, "");
    }
    static parseTrackName(t) {
      let e = zx.exec(t);
      if (e === null) throw new Error("PropertyBinding: Cannot parse trackName: " + t);
      let n = { nodeName: e[2], objectName: e[3], objectIndex: e[4], propertyName: e[5], propertyIndex: e[6] }, s = n.nodeName && n.nodeName.lastIndexOf(".");
      if (s !== void 0 && s !== -1) {
        let r = n.nodeName.substring(s + 1);
        Bx.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, s), n.objectName = r);
      }
      if (n.propertyName === null || n.propertyName.length === 0) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
      return n;
    }
    static findNode(t, e) {
      if (e === void 0 || e === "" || e === "." || e === -1 || e === t.name || e === t.uuid) return t;
      if (t.skeleton) {
        let n = t.skeleton.getBoneByName(e);
        if (n !== void 0) return n;
      }
      if (t.children) {
        let n = function(r) {
          for (let a = 0; a < r.length; a++) {
            let o = r[a];
            if (o.name === e || o.uuid === e) return o;
            let c = n(o.children);
            if (c) return c;
          }
          return null;
        }, s = n(t.children);
        if (s) return s;
      }
      return null;
    }
    _getValue_unavailable() {
    }
    _setValue_unavailable() {
    }
    _getValue_direct(t, e) {
      t[e] = this.targetObject[this.propertyName];
    }
    _getValue_array(t, e) {
      let n = this.resolvedProperty;
      for (let s = 0, r = n.length; s !== r; ++s) t[e++] = n[s];
    }
    _getValue_arrayElement(t, e) {
      t[e] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(t, e) {
      this.resolvedProperty.toArray(t, e);
    }
    _setValue_direct(t, e) {
      this.targetObject[this.propertyName] = t[e];
    }
    _setValue_direct_setNeedsUpdate(t, e) {
      this.targetObject[this.propertyName] = t[e], this.targetObject.needsUpdate = true;
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(t, e) {
      this.targetObject[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_array(t, e) {
      let n = this.resolvedProperty;
      for (let s = 0, r = n.length; s !== r; ++s) n[s] = t[e++];
    }
    _setValue_array_setNeedsUpdate(t, e) {
      let n = this.resolvedProperty;
      for (let s = 0, r = n.length; s !== r; ++s) n[s] = t[e++];
      this.targetObject.needsUpdate = true;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(t, e) {
      let n = this.resolvedProperty;
      for (let s = 0, r = n.length; s !== r; ++s) n[s] = t[e++];
      this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_arrayElement(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e];
    }
    _setValue_arrayElement_setNeedsUpdate(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = true;
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_fromArray(t, e) {
      this.resolvedProperty.fromArray(t, e);
    }
    _setValue_fromArray_setNeedsUpdate(t, e) {
      this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = true;
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(t, e) {
      this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _getValue_unbound(t, e) {
      this.bind(), this.getValue(t, e);
    }
    _setValue_unbound(t, e) {
      this.bind(), this.setValue(t, e);
    }
    bind() {
      let t = this.node, e = this.parsedPath, n = e.objectName, s = e.propertyName, r = e.propertyIndex;
      if (t || (t = i.findNode(this.rootNode, e.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
        console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
        return;
      }
      if (n) {
        let l = e.objectIndex;
        switch (n) {
          case "materials":
            if (!t.material) {
              console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
              return;
            }
            if (!t.material.materials) {
              console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
              return;
            }
            t = t.material.materials;
            break;
          case "bones":
            if (!t.skeleton) {
              console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
              return;
            }
            t = t.skeleton.bones;
            for (let u = 0; u < t.length; u++) if (t[u].name === l) {
              l = u;
              break;
            }
            break;
          case "map":
            if ("map" in t) {
              t = t.map;
              break;
            }
            if (!t.material) {
              console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
              return;
            }
            if (!t.material.map) {
              console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
              return;
            }
            t = t.material.map;
            break;
          default:
            if (t[n] === void 0) {
              console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
              return;
            }
            t = t[n];
        }
        if (l !== void 0) {
          if (t[l] === void 0) {
            console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
            return;
          }
          t = t[l];
        }
      }
      let a = t[s];
      if (a === void 0) {
        let l = e.nodeName;
        console.error("THREE.PropertyBinding: Trying to update property for track: " + l + "." + s + " but it wasn't found.", t);
        return;
      }
      let o = this.Versioning.None;
      this.targetObject = t, t.needsUpdate !== void 0 ? o = this.Versioning.NeedsUpdate : t.matrixWorldNeedsUpdate !== void 0 && (o = this.Versioning.MatrixWorldNeedsUpdate);
      let c = this.BindingType.Direct;
      if (r !== void 0) {
        if (s === "morphTargetInfluences") {
          if (!t.geometry) {
            console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
            return;
          }
          if (!t.geometry.morphAttributes) {
            console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
            return;
          }
          t.morphTargetDictionary[r] !== void 0 && (r = t.morphTargetDictionary[r]);
        }
        c = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = r;
      } else a.fromArray !== void 0 && a.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (c = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = s;
      this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][o];
    }
    unbind() {
      this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
  };
  Ce.Composite = Nc;
  Ce.prototype.BindingType = { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 };
  Ce.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 };
  Ce.prototype.GetterByBindingType = [Ce.prototype._getValue_direct, Ce.prototype._getValue_array, Ce.prototype._getValue_arrayElement, Ce.prototype._getValue_toArray];
  Ce.prototype.SetterByBindingTypeAndVersioning = [[Ce.prototype._setValue_direct, Ce.prototype._setValue_direct_setNeedsUpdate, Ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [Ce.prototype._setValue_array, Ce.prototype._setValue_array_setNeedsUpdate, Ce.prototype._setValue_array_setMatrixWorldNeedsUpdate], [Ce.prototype._setValue_arrayElement, Ce.prototype._setValue_arrayElement_setNeedsUpdate, Ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [Ce.prototype._setValue_fromArray, Ce.prototype._setValue_fromArray_setNeedsUpdate, Ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
  var __ = new Float32Array(1);
  var Bo = class {
    constructor(t, e, n = 0, s = 1 / 0) {
      this.ray = new hr(t, e), this.near = n, this.far = s, this.camera = null, this.layers = new ur(), this.params = { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} };
    }
    set(t, e) {
      this.ray.set(t, e);
    }
    setFromCamera(t, e) {
      e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, 0.5).unproject(e).sub(this.ray.origin).normalize(), this.camera = e) : e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld), this.camera = e) : console.error("THREE.Raycaster: Unsupported camera type: " + e.type);
    }
    intersectObject(t, e = true, n = []) {
      return Oc(t, this, n, e), n.sort(Qh), n;
    }
    intersectObjects(t, e = true, n = []) {
      for (let s = 0, r = t.length; s < r; s++) Oc(t[s], this, n, e);
      return n.sort(Qh), n;
    }
  };
  function Qh(i, t) {
    return i.distance - t.distance;
  }
  function Oc(i, t, e, n) {
    if (i.layers.test(t.layers) && i.raycast(t, e), n === true) {
      let s = i.children;
      for (let r = 0, a = s.length; r < a; r++) Oc(s[r], t, e, true);
    }
  }
  typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: Fc } }));
  typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Fc);
  var Wo = { name: "CopyShader", uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } }, vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}` };
  var gn = class {
    constructor() {
      this.isPass = true, this.enabled = true, this.needsSwap = true, this.clear = false, this.renderToScreen = false;
    }
    setSize() {
    }
    render() {
      console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
    dispose() {
    }
  }, kx = new Os(-1, 1, 1, -1, 0, 1), Zc = class extends we {
    constructor() {
      super(), this.setAttribute("position", new de([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new de([0, 2, 0, 0, 2, 0], 2));
    }
  }, Hx = new Zc(), Si = class {
    constructor(t) {
      this._mesh = new zt(Hx, t);
    }
    dispose() {
      this._mesh.geometry.dispose();
    }
    render(t) {
      t.render(this._mesh, kx);
    }
    get material() {
      return this._mesh.material;
    }
    set material(t) {
      this._mesh.material = t;
    }
  };
  var Xo = class extends gn {
    constructor(t, e) {
      super(), this.textureID = e !== void 0 ? e : "tDiffuse", t instanceof Te ? (this.uniforms = t.uniforms, this.material = t) : t && (this.uniforms = bi.clone(t.uniforms), this.material = new Te({ name: t.name !== void 0 ? t.name : "unspecified", defines: Object.assign({}, t.defines), uniforms: this.uniforms, vertexShader: t.vertexShader, fragmentShader: t.fragmentShader })), this.fsQuad = new Si(this.material);
    }
    render(t, e, n) {
      this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this.fsQuad.material = this.material, this.renderToScreen ? (t.setRenderTarget(null), this.fsQuad.render(t)) : (t.setRenderTarget(e), this.clear && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), this.fsQuad.render(t));
    }
    dispose() {
      this.material.dispose(), this.fsQuad.dispose();
    }
  };
  var Mr = class extends gn {
    constructor(t, e) {
      super(), this.scene = t, this.camera = e, this.clear = true, this.needsSwap = false, this.inverse = false;
    }
    render(t, e, n) {
      let s = t.getContext(), r = t.state;
      r.buffers.color.setMask(false), r.buffers.depth.setMask(false), r.buffers.color.setLocked(true), r.buffers.depth.setLocked(true);
      let a, o;
      this.inverse ? (a = 0, o = 1) : (a = 1, o = 0), r.buffers.stencil.setTest(true), r.buffers.stencil.setOp(s.REPLACE, s.REPLACE, s.REPLACE), r.buffers.stencil.setFunc(s.ALWAYS, a, 4294967295), r.buffers.stencil.setClear(o), r.buffers.stencil.setLocked(true), t.setRenderTarget(n), this.clear && t.clear(), t.render(this.scene, this.camera), t.setRenderTarget(e), this.clear && t.clear(), t.render(this.scene, this.camera), r.buffers.color.setLocked(false), r.buffers.depth.setLocked(false), r.buffers.color.setMask(true), r.buffers.depth.setMask(true), r.buffers.stencil.setLocked(false), r.buffers.stencil.setFunc(s.EQUAL, 1, 4294967295), r.buffers.stencil.setOp(s.KEEP, s.KEEP, s.KEEP), r.buffers.stencil.setLocked(true);
    }
  }, qo = class extends gn {
    constructor() {
      super(), this.needsSwap = false;
    }
    render(t) {
      t.state.buffers.stencil.setLocked(false), t.state.buffers.stencil.setTest(false);
    }
  };
  var Yo = class {
    constructor(t, e) {
      if (this.renderer = t, this._pixelRatio = t.getPixelRatio(), e === void 0) {
        let n = t.getSize(new Bt());
        this._width = n.width, this._height = n.height, e = new Je(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: mn }), e.texture.name = "EffectComposer.rt1";
      } else this._width = e.width, this._height = e.height;
      this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = true, this.passes = [], this.copyPass = new Xo(Wo), this.copyPass.material.blending = Hn, this.clock = new zo();
    }
    swapBuffers() {
      let t = this.readBuffer;
      this.readBuffer = this.writeBuffer, this.writeBuffer = t;
    }
    addPass(t) {
      this.passes.push(t), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    insertPass(t, e) {
      this.passes.splice(e, 0, t), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    removePass(t) {
      let e = this.passes.indexOf(t);
      e !== -1 && this.passes.splice(e, 1);
    }
    isLastEnabledPass(t) {
      for (let e = t + 1; e < this.passes.length; e++) if (this.passes[e].enabled) return false;
      return true;
    }
    render(t) {
      t === void 0 && (t = this.clock.getDelta());
      let e = this.renderer.getRenderTarget(), n = false;
      for (let s = 0, r = this.passes.length; s < r; s++) {
        let a = this.passes[s];
        if (a.enabled !== false) {
          if (a.renderToScreen = this.renderToScreen && this.isLastEnabledPass(s), a.render(this.renderer, this.writeBuffer, this.readBuffer, t, n), a.needsSwap) {
            if (n) {
              let o = this.renderer.getContext(), c = this.renderer.state.buffers.stencil;
              c.setFunc(o.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, t), c.setFunc(o.EQUAL, 1, 4294967295);
            }
            this.swapBuffers();
          }
          Mr !== void 0 && (a instanceof Mr ? n = true : a instanceof qo && (n = false));
        }
      }
      this.renderer.setRenderTarget(e);
    }
    reset(t) {
      if (t === void 0) {
        let e = this.renderer.getSize(new Bt());
        this._pixelRatio = this.renderer.getPixelRatio(), this._width = e.width, this._height = e.height, t = this.renderTarget1.clone(), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
      }
      this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
    }
    setSize(t, e) {
      this._width = t, this._height = e;
      let n = this._width * this._pixelRatio, s = this._height * this._pixelRatio;
      this.renderTarget1.setSize(n, s), this.renderTarget2.setSize(n, s);
      for (let r = 0; r < this.passes.length; r++) this.passes[r].setSize(n, s);
    }
    setPixelRatio(t) {
      this._pixelRatio = t, this.setSize(this._width, this._height);
    }
    dispose() {
      this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
    }
  };
  var Zo = class extends gn {
    constructor(t, e, n = null, s = null, r = null) {
      super(), this.scene = t, this.camera = e, this.overrideMaterial = n, this.clearColor = s, this.clearAlpha = r, this.clear = true, this.clearDepth = false, this.needsSwap = false, this._oldClearColor = new Xt();
    }
    render(t, e, n) {
      let s = t.autoClear;
      t.autoClear = false;
      let r, a;
      this.overrideMaterial !== null && (a = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (t.getClearColor(this._oldClearColor), t.setClearColor(this.clearColor)), this.clearAlpha !== null && (r = t.getClearAlpha(), t.setClearAlpha(this.clearAlpha)), this.clearDepth == true && t.clearDepth(), t.setRenderTarget(this.renderToScreen ? null : n), this.clear === true && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), t.render(this.scene, this.camera), this.clearColor !== null && t.setClearColor(this._oldClearColor), this.clearAlpha !== null && t.setClearAlpha(r), this.overrideMaterial !== null && (this.scene.overrideMaterial = a), t.autoClear = s;
    }
  };
  var Tu = { name: "LuminosityHighPassShader", shaderID: "luminosityHighPass", uniforms: { tDiffuse: { value: null }, luminosityThreshold: { value: 1 }, smoothWidth: { value: 1 }, defaultColor: { value: new Xt(0) }, defaultOpacity: { value: 0 } }, vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}` };
  var Hs = class i extends gn {
    constructor(t, e, n, s) {
      super(), this.strength = e !== void 0 ? e : 1, this.radius = n, this.threshold = s, this.resolution = t !== void 0 ? new Bt(t.x, t.y) : new Bt(256, 256), this.clearColor = new Xt(0, 0, 0), this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
      let r = Math.round(this.resolution.x / 2), a = Math.round(this.resolution.y / 2);
      this.renderTargetBright = new Je(r, a, { type: mn }), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = false;
      for (let h = 0; h < this.nMips; h++) {
        let f = new Je(r, a, { type: mn });
        f.texture.name = "UnrealBloomPass.h" + h, f.texture.generateMipmaps = false, this.renderTargetsHorizontal.push(f);
        let d = new Je(r, a, { type: mn });
        d.texture.name = "UnrealBloomPass.v" + h, d.texture.generateMipmaps = false, this.renderTargetsVertical.push(d), r = Math.round(r / 2), a = Math.round(a / 2);
      }
      let o = Tu;
      this.highPassUniforms = bi.clone(o.uniforms), this.highPassUniforms.luminosityThreshold.value = s, this.highPassUniforms.smoothWidth.value = 0.01, this.materialHighPassFilter = new Te({ uniforms: this.highPassUniforms, vertexShader: o.vertexShader, fragmentShader: o.fragmentShader }), this.separableBlurMaterials = [];
      let c = [3, 5, 7, 9, 11];
      r = Math.round(this.resolution.x / 2), a = Math.round(this.resolution.y / 2);
      for (let h = 0; h < this.nMips; h++) this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[h])), this.separableBlurMaterials[h].uniforms.invSize.value = new Bt(1 / r, 1 / a), r = Math.round(r / 2), a = Math.round(a / 2);
      this.compositeMaterial = this.getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = e, this.compositeMaterial.uniforms.bloomRadius.value = 0.1;
      let l = [1, 0.8, 0.6, 0.4, 0.2];
      this.compositeMaterial.uniforms.bloomFactors.value = l, this.bloomTintColors = [new Y(1, 1, 1), new Y(1, 1, 1), new Y(1, 1, 1), new Y(1, 1, 1), new Y(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
      let u = Wo;
      this.copyUniforms = bi.clone(u.uniforms), this.blendMaterial = new Te({ uniforms: this.copyUniforms, vertexShader: u.vertexShader, fragmentShader: u.fragmentShader, blending: Ee, depthTest: false, depthWrite: false, transparent: true }), this.enabled = true, this.needsSwap = false, this._oldClearColor = new Xt(), this.oldClearAlpha = 1, this.basic = new se(), this.fsQuad = new Si(null);
    }
    dispose() {
      for (let t = 0; t < this.renderTargetsHorizontal.length; t++) this.renderTargetsHorizontal[t].dispose();
      for (let t = 0; t < this.renderTargetsVertical.length; t++) this.renderTargetsVertical[t].dispose();
      this.renderTargetBright.dispose();
      for (let t = 0; t < this.separableBlurMaterials.length; t++) this.separableBlurMaterials[t].dispose();
      this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this.basic.dispose(), this.fsQuad.dispose();
    }
    setSize(t, e) {
      let n = Math.round(t / 2), s = Math.round(e / 2);
      this.renderTargetBright.setSize(n, s);
      for (let r = 0; r < this.nMips; r++) this.renderTargetsHorizontal[r].setSize(n, s), this.renderTargetsVertical[r].setSize(n, s), this.separableBlurMaterials[r].uniforms.invSize.value = new Bt(1 / n, 1 / s), n = Math.round(n / 2), s = Math.round(s / 2);
    }
    render(t, e, n, s, r) {
      t.getClearColor(this._oldClearColor), this.oldClearAlpha = t.getClearAlpha();
      let a = t.autoClear;
      t.autoClear = false, t.setClearColor(this.clearColor, 0), r && t.state.buffers.stencil.setTest(false), this.renderToScreen && (this.fsQuad.material = this.basic, this.basic.map = n.texture, t.setRenderTarget(null), t.clear(), this.fsQuad.render(t)), this.highPassUniforms.tDiffuse.value = n.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this.fsQuad.material = this.materialHighPassFilter, t.setRenderTarget(this.renderTargetBright), t.clear(), this.fsQuad.render(t);
      let o = this.renderTargetBright;
      for (let c = 0; c < this.nMips; c++) this.fsQuad.material = this.separableBlurMaterials[c], this.separableBlurMaterials[c].uniforms.colorTexture.value = o.texture, this.separableBlurMaterials[c].uniforms.direction.value = i.BlurDirectionX, t.setRenderTarget(this.renderTargetsHorizontal[c]), t.clear(), this.fsQuad.render(t), this.separableBlurMaterials[c].uniforms.colorTexture.value = this.renderTargetsHorizontal[c].texture, this.separableBlurMaterials[c].uniforms.direction.value = i.BlurDirectionY, t.setRenderTarget(this.renderTargetsVertical[c]), t.clear(), this.fsQuad.render(t), o = this.renderTargetsVertical[c];
      this.fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, t.setRenderTarget(this.renderTargetsHorizontal[0]), t.clear(), this.fsQuad.render(t), this.fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, r && t.state.buffers.stencil.setTest(true), this.renderToScreen ? (t.setRenderTarget(null), this.fsQuad.render(t)) : (t.setRenderTarget(n), this.fsQuad.render(t)), t.setClearColor(this._oldClearColor, this.oldClearAlpha), t.autoClear = a;
    }
    getSeperableBlurMaterial(t) {
      let e = [];
      for (let n = 0; n < t; n++) e.push(0.39894 * Math.exp(-0.5 * n * n / (t * t)) / t);
      return new Te({ defines: { KERNEL_RADIUS: t }, uniforms: { colorTexture: { value: null }, invSize: { value: new Bt(0.5, 0.5) }, direction: { value: new Bt(0.5, 0.5) }, gaussianCoefficients: { value: e } }, vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`, fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}` });
    }
    getCompositeMaterial(t) {
      return new Te({ defines: { NUM_MIPS: t }, uniforms: { blurTexture1: { value: null }, blurTexture2: { value: null }, blurTexture3: { value: null }, blurTexture4: { value: null }, blurTexture5: { value: null }, bloomStrength: { value: 1 }, bloomFactors: { value: null }, bloomTintColors: { value: null }, bloomRadius: { value: 0 } }, vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`, fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}` });
    }
  };
  Hs.BlurDirectionX = new Bt(1, 0);
  Hs.BlurDirectionY = new Bt(0, 1);
  var Au = { name: "OutputShader", uniforms: { tDiffuse: { value: null }, toneMappingExposure: { value: 1 } }, vertexShader: `
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}` };
  var Jo = class extends gn {
    constructor() {
      super();
      let t = Au;
      this.uniforms = bi.clone(t.uniforms), this.material = new Do({ name: t.name, uniforms: this.uniforms, vertexShader: t.vertexShader, fragmentShader: t.fragmentShader }), this.fsQuad = new Si(this.material), this._outputColorSpace = null, this._toneMapping = null;
    }
    render(t, e, n) {
      this.uniforms.tDiffuse.value = n.texture, this.uniforms.toneMappingExposure.value = t.toneMappingExposure, (this._outputColorSpace !== t.outputColorSpace || this._toneMapping !== t.toneMapping) && (this._outputColorSpace = t.outputColorSpace, this._toneMapping = t.toneMapping, this.material.defines = {}, ge.getTransfer(this._outputColorSpace) === Me && (this.material.defines.SRGB_TRANSFER = ""), this._toneMapping === Bc ? this.material.defines.LINEAR_TONE_MAPPING = "" : this._toneMapping === kc ? this.material.defines.REINHARD_TONE_MAPPING = "" : this._toneMapping === Hc ? this.material.defines.CINEON_TONE_MAPPING = "" : this._toneMapping === yr ? this.material.defines.ACES_FILMIC_TONE_MAPPING = "" : this._toneMapping === Gc && (this.material.defines.AGX_TONE_MAPPING = ""), this.material.needsUpdate = true), this.renderToScreen === true ? (t.setRenderTarget(null), this.fsQuad.render(t)) : (t.setRenderTarget(e), this.clear && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), this.fsQuad.render(t));
    }
    dispose() {
      this.material.dispose(), this.fsQuad.dispose();
    }
  };
  function me(i) {
    return function() {
      i |= 0, i = i + 1831565813 | 0;
      let t = Math.imul(i ^ i >>> 15, 1 | i);
      return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  var Ot = class {
    constructor() {
      this.p = [], this.n = [], this.u = [], this.c = [];
    }
    tri(t, e, n, s, r, a, o, c) {
      let l = e[0] - t[0], u = e[1] - t[1], h = e[2] - t[2], f = n[0] - t[0], d = n[1] - t[1], g = n[2] - t[2], _ = u * g - h * d, m = h * f - l * g, p = l * d - u * f, x = Math.hypot(_, m, p) || 1;
      if (_ /= x, m /= x, p /= x, c && _ * c[0] + m * c[1] + p * c[2] < 0) {
        let v = e;
        e = n, n = v;
        let E = r;
        r = a, a = E, _ = -_, m = -m, p = -p;
      }
      this.p.push(t[0], t[1], t[2], e[0], e[1], e[2], n[0], n[1], n[2]);
      for (let v = 0; v < 3; v++) this.n.push(_, m, p);
      this.u.push(s[0], s[1], r[0], r[1], a[0], a[1]);
      for (let v = 0; v < 3; v++) this.c.push(o[0], o[1], o[2]);
    }
    triS(t, e, n, s, r, a, o, c, l, u) {
      let h = e[0] - t[0], f = e[1] - t[1], d = e[2] - t[2], g = n[0] - t[0], _ = n[1] - t[1], m = n[2] - t[2], p = f * m - d * _, x = d * g - h * m, v = h * _ - f * g, E = c[0] + l[0] + u[0], R = c[1] + l[1] + u[1], w = c[2] + l[2] + u[2];
      if (p * E + x * R + v * w < 0) {
        let U = e;
        e = n, n = U, U = r, r = a, a = U, U = l, l = u, u = U;
      }
      this.p.push(t[0], t[1], t[2], e[0], e[1], e[2], n[0], n[1], n[2]), this.n.push(c[0], c[1], c[2], l[0], l[1], l[2], u[0], u[1], u[2]), this.u.push(s[0], s[1], r[0], r[1], a[0], a[1]);
      let T = Array.isArray(o[0]) ? o : [o, o, o];
      this.c.push(...T[0], ...T[1], ...T[2]);
    }
    quad(t, e, n, s, r, a, o, c, l, u) {
      this.tri(t, e, n, r, a, o, l, u), this.tri(t, n, s, r, o, c, l, u);
    }
    box(t, e, n, s, r, a, o, c, l = 1, u = true) {
      let h = s / 2, f = r / 2, d = a / 2, g = Math.cos(o), _ = Math.sin(o), m = (v, E, R) => [t + v * g + R * _, e + E, n - v * _ + R * g], p = [[-h, -f, -d], [h, -f, -d], [h, f, -d], [-h, f, -d], [-h, -f, d], [h, -f, d], [h, f, d], [-h, f, d]].map((v) => m(v[0], v[1], v[2])), x = [[0, 1, 2, 3, [0, 0, -1]], [5, 4, 7, 6, [0, 0, 1]], [4, 0, 3, 7, [-1, 0, 0]], [1, 5, 6, 2, [1, 0, 0]], [3, 2, 6, 7, [0, 1, 0]], [4, 5, 1, 0, [0, -1, 0]]];
      for (let v of x) {
        let E = v[4], R = [E[0] * g + E[2] * _, E[1], -E[0] * _ + E[2] * g], w = 1;
        u && (w = E[1] > 0 ? 1 : E[1] < 0 ? 0.5 : 0.78 + 0.1 * E[0]);
        let T = [c[0] * w, c[1] * w, c[2] * w];
        this.quad(p[v[0]], p[v[1]], p[v[2]], p[v[3]], [0, 0], [l, 0], [l, l], [0, l], T, R);
      }
    }
    toGeometry() {
      let t = new we();
      return t.setAttribute("position", new de(this.p, 3)), t.setAttribute("normal", new de(this.n, 3)), t.setAttribute("uv", new de(this.u, 2)), t.setAttribute("color", new de(this.c, 3)), t.computeBoundingSphere(), t.computeBoundingBox(), t;
    }
  };
  function Ru(i) {
    let t = 0;
    for (let e = 0; e < i.length; e++) {
      let n = i[(e + 1) % i.length];
      t += i[e][0] * n[1] - n[0] * i[e][1];
    }
    return t / 2;
  }
  function Jc(i) {
    let t = 0, e = 0;
    for (let n of i) t += n[0], e += n[1];
    return [t / i.length, e / i.length];
  }
  function Cu(i) {
    let t = null;
    for (let h = 0; h < i.length; h++) {
      let f = i[(h + 1) % i.length], d = Math.atan2(f[1] - i[h][1], f[0] - i[h][0]), g = Math.cos(-d), _ = Math.sin(-d), m = 1e9, p = -1e9, x = 1e9, v = -1e9;
      for (let R of i) {
        let w = R[0] * g - R[1] * _, T = R[0] * _ + R[1] * g;
        w < m && (m = w), w > p && (p = w), T < x && (x = T), T > v && (v = T);
      }
      let E = (p - m) * (v - x);
      (!t || E < t.area) && (t = { area: E, ang: d, x0: m, x1: p, z0: x, z1: v });
    }
    let e = (t.x0 + t.x1) / 2, n = (t.z0 + t.z1) / 2, s = Math.cos(t.ang), r = Math.sin(t.ang), a = e * s - n * r, o = e * r + n * s, c = t.x1 - t.x0, l = t.z1 - t.z0, u = t.ang;
    if (l > c) {
      let h = c;
      c = l, l = h, u += Math.PI / 2;
    }
    return { cx: a, cz: o, w: c, d: l, ang: u, area: t.area };
  }
  function fe(i, t, e) {
    return i + (t - i) * e;
  }
  function Le(i, t, e) {
    return Math.max(t, Math.min(e, i));
  }
  function ji(i, t) {
    let e = document.createElement("canvas");
    return e.width = i, e.height = t, e;
  }
  function Qi(i, { repeat: t = true, srgb: e = true, aniso: n = 8 } = {}) {
    let s = new wn(i);
    return t && (s.wrapS = s.wrapT = Xi), e && (s.colorSpace = Se), s.anisotropy = n, s.generateMipmaps = true, s.minFilter = ni, s;
  }
  function Gx(i, t, e) {
    let n = new Float32Array(t * t);
    for (let r = 0; r < n.length; r++) n[r] = e();
    let s = new Float32Array(i * i);
    for (let r = 0; r < i; r++) for (let a = 0; a < i; a++) {
      let o = a / i * t, c = r / i * t, l = Math.floor(o) % t, u = Math.floor(c) % t, h = (l + 1) % t, f = (u + 1) % t, d = o - Math.floor(o), g = c - Math.floor(c), _ = d * d * (3 - 2 * d), m = g * g * (3 - 2 * g), p = n[u * t + l], x = n[u * t + h], v = n[f * t + l], E = n[f * t + h];
      s[r * i + a] = p + (x - p) * _ + (v - p) * m + (p - x - v + E) * _ * m;
    }
    return s;
  }
  function $c(i, t, e, n, s = [4, 8, 16, 32, 64], r = null) {
    let a = me(n), o = ji(i, i), c = o.getContext("2d"), l = c.createImageData(i, i), u = s.map((h) => Gx(i, h, a));
    for (let h = 0; h < i * i; h++) {
      let f = 0, d = 1, g = 0;
      for (let x = 0; x < u.length; x++) f += u[x][h] * d, g += d, d *= 0.62;
      f = f / g - 0.5;
      let _ = (a() - 0.5) * 0.12, m = f * e * 2 + _ * e, p = r ? r(h, f) : [1, 1, 1];
      l.data[h * 4] = Math.max(0, Math.min(255, t[0] + m * 255 * p[0])), l.data[h * 4 + 1] = Math.max(0, Math.min(255, t[1] + m * 255 * p[1])), l.data[h * 4 + 2] = Math.max(0, Math.min(255, t[2] + m * 255 * p[2])), l.data[h * 4 + 3] = 255;
    }
    return c.putImageData(l, 0, 0), o;
  }
  function Pu() {
    let i = $c(512, [52, 55, 60], 0.2, 11, [4, 8, 16, 32, 128]), t = i.getContext("2d"), e = me(5);
    t.strokeStyle = "rgba(8,8,10,.55)", t.lineWidth = 1.4;
    for (let n = 0; n < 16; n++) {
      let s = e() * 512, r = e() * 512;
      t.beginPath(), t.moveTo(s, r);
      for (let a = 0; a < 12; a++) s += (e() - 0.5) * 46, r += (e() - 0.5) * 46, t.lineTo(s, r);
      t.stroke();
    }
    for (let n = 0; n < 14; n++) t.fillStyle = `rgba(${20 + e() * 20},${20 + e() * 20},${24 + e() * 20},.28)`, t.fillRect(e() * 512, e() * 512, 20 + e() * 80, 12 + e() * 50);
    for (let n = 0; n < 18; n++) {
      let s = e() * 512, r = e() * 512, a = 20 + e() * 50, o = t.createRadialGradient(s, r, 0, s, r, a);
      o.addColorStop(0, "rgba(120,130,150,.20)"), o.addColorStop(1, "rgba(120,130,150,0)"), t.fillStyle = o, t.fillRect(s - a, r - a, a * 2, a * 2);
    }
    return Qi(i);
  }
  function ts(i = "dirt") {
    let e = $c(512, i === "grass" ? [42, 58, 36] : i === "meadow" ? [74, 76, 42] : i === "sidewalk" ? [92, 90, 86] : [58, 50, 40], i === "sidewalk" ? 0.12 : 0.3, i.length * 17 + 3, [4, 8, 16, 32, 64, 128], i === "grass" || i === "meadow" ? (r, a) => [0.6, 1.1, 0.5] : null), n = e.getContext("2d"), s = me(9);
    if (i === "grass" || i === "meadow") for (let r = 0; r < 1800; r++) {
      let a = s() * 512, o = s() * 512, c = 3 + s() * 7;
      n.strokeStyle = `rgba(${50 + s() * 50},${80 + s() * 70},${30 + s() * 40},.55)`, n.lineWidth = 1, n.beginPath(), n.moveTo(a, o), n.lineTo(a + (s() - 0.5) * 4, o - c), n.stroke();
    }
    else if (i === "sidewalk") {
      n.strokeStyle = "rgba(15,15,15,.55)", n.lineWidth = 2;
      for (let r = 0; r <= 4; r++) n.beginPath(), n.moveTo(r * 128, 0), n.lineTo(r * 128, 512), n.stroke(), n.beginPath(), n.moveTo(0, r * 128), n.lineTo(512, r * 128), n.stroke();
    } else for (let r = 0; r < 600; r++) n.fillStyle = `rgba(${30 + s() * 40},${28 + s() * 30},${20 + s() * 20},.5)`, n.fillRect(s() * 512, s() * 512, 1 + s() * 3, 1 + s() * 3);
    return Qi(e);
  }
  function Lu() {
    let n = me(77), s = ji(1024, 1024), r = ji(1024, 1024), a = s.getContext("2d"), o = r.getContext("2d");
    o.fillStyle = "#000", o.fillRect(0, 0, 1024, 1024);
    let c = $c(1024, [208, 204, 196], 0.18, 31, [4, 8, 16, 64, 128]);
    a.drawImage(c, 0, 0);
    for (let l = 0; l < 4; l++) for (let u = 0; u < 4; u++) {
      let h = u * 256, f = l * 256;
      for (let R = 0; R < 5; R++) {
        let w = a.createLinearGradient(0, f, 0, f + 256);
        a.fillStyle = `rgba(30,25,20,${0.04 + n() * 0.07})`, a.fillRect(h + n() * 256, f + n() * 256 * 0.3, 8 + n() * 30, 40 + n() * 140);
      }
      let d = 256 * 0.4, g = 256 * 0.52, _ = h + (256 - d) / 2, m = f + 256 * 0.2, p = n(), x = p < 0.4, v = p > 0.9, E = p > 0.8 && p <= 0.9;
      if (a.fillStyle = "#2b241f", a.fillRect(_ - 7, m - 7, d + 14, g + 14), v) {
        a.fillStyle = "#4a3a2b", a.fillRect(_, m, d, g), a.strokeStyle = "#1e1710", a.lineWidth = 3;
        for (let R = 1; R < 5; R++) a.beginPath(), a.moveTo(_, m + R * g / 5), a.lineTo(_ + d, m + R * g / 5), a.stroke();
        a.strokeStyle = "#6b573f", a.lineWidth = 6, a.beginPath(), a.moveTo(_ - 4, m + g * 0.8), a.lineTo(_ + d + 4, m + g * 0.15), a.stroke();
      } else if (x) {
        let R = a.createLinearGradient(_, m, _, m + g), w = n(), T = w < 0.4 ? [["#ffd88a", "#f28f2e"], [255, 200, 100], [240, 130, 40]] : w < 0.62 ? [["#ff6a6a", "#b0102a"], [255, 70, 70], [190, 20, 50]] : w < 0.8 ? [["#b6ff5a", "#2fa02a"], [150, 255, 80], [50, 190, 50]] : w < 0.92 ? [["#ff6bd6", "#9a1fb5"], [255, 90, 220], [160, 40, 190]] : [["#6af0ff", "#2a6fd0"], [100, 240, 255], [50, 120, 220]];
        R.addColorStop(0, T[0][0]), R.addColorStop(1, T[0][1]), a.fillStyle = R, a.fillRect(_, m, d, g), n() < 0.6 && (a.fillStyle = "rgba(60,10,30,.40)", a.fillRect(_, m, d * (0.2 + n() * 0.25), g));
        let U = o.createLinearGradient(_, m, _, m + g);
        U.addColorStop(0, `rgb(${T[1].join(",")})`), U.addColorStop(1, `rgb(${T[2].join(",")})`), o.fillStyle = U, o.fillRect(_, m, d, g);
      } else {
        let R = a.createLinearGradient(_, m, _ + d, m + g);
        R.addColorStop(0, "#1a2430"), R.addColorStop(1, "#0a0f15"), a.fillStyle = R, a.fillRect(_, m, d, g), a.fillStyle = "rgba(120,150,180,.10)", a.beginPath(), a.moveTo(_, m + g), a.lineTo(_ + d * 0.5, m), a.lineTo(_ + d * 0.7, m), a.lineTo(_ + d * 0.2, m + g), a.fill(), E && (a.strokeStyle = "rgba(200,220,240,.5)", a.lineWidth = 2, a.beginPath(), a.moveTo(_ + d * 0.3, m), a.lineTo(_ + d * 0.55, m + g * 0.5), a.lineTo(_ + d * 0.2, m + g * 0.7), a.moveTo(_ + d * 0.55, m + g * 0.5), a.lineTo(_ + d * 0.9, m + g * 0.35), a.stroke());
      }
      a.strokeStyle = "#2b241f", a.lineWidth = 5, a.beginPath(), a.moveTo(_ + d / 2, m), a.lineTo(_ + d / 2, m + g), a.moveTo(_, m + g * 0.45), a.lineTo(_ + d, m + g * 0.45), a.stroke(), x && (o.strokeStyle = "#000", o.lineWidth = 5, o.beginPath(), o.moveTo(_ + d / 2, m), o.lineTo(_ + d / 2, m + g), o.moveTo(_, m + g * 0.45), o.lineTo(_ + d, m + g * 0.45), o.stroke()), a.fillStyle = "#8c857a", a.fillRect(_ - 12, m + g + 7, d + 24, 9);
    }
    return { map: Qi(s, { aniso: 16 }), emissive: Qi(r, { aniso: 16 }) };
  }
  function Iu() {
    let t = ji(512, 512), e = t.getContext("2d"), n = me(21);
    e.fillStyle = "#7a7470", e.fillRect(0, 0, 512, 512);
    let s = 16, r = 12, a = 512 / s, o = 512 / r;
    for (let c = 0; c < s; c++) for (let l = 0; l < r; l++) {
      let u = c % 2 * o / 2, h = 0.55 + n() * 0.45;
      e.fillStyle = `rgb(${h * 170 | 0},${h * 164 | 0},${h * 160 | 0})`, e.beginPath(), e.roundRect(l * o + u + 1, c * a + 1, o - 2, a + 6, 4), e.fill(), e.fillStyle = "rgba(0,0,0,.35)", e.fillRect(l * o + u, c * a + a - 3, o, 4);
    }
    for (let c = 0; c < 120; c++) e.fillStyle = `rgba(60,90,40,${0.1 + n() * 0.2})`, e.beginPath(), e.arc(n() * 512, n() * 512, 3 + n() * 14, 0, 7), e.fill();
    return Qi(t);
  }
  function Fn(i) {
    let t = ji(256, 256), e = t.getContext("2d"), n = e.createRadialGradient(128, 128, 0, 128, 128, 128);
    for (let [r, a] of i) n.addColorStop(r, a);
    return e.fillStyle = n, e.fillRect(0, 0, 256, 256), Qi(t, { repeat: false, aniso: 1 });
  }
  function $o(i, { font: t = '600 54px "Segoe UI", Arial, sans-serif', color: e = "#e9f0e6", stroke: n = "rgba(0,0,0,.75)", letter: s = 6 } = {}) {
    let r = ji(1024, 128), a = r.getContext("2d");
    a.font = t, a.textAlign = "center", a.textBaseline = "middle";
    try {
      a.letterSpacing = s + "px";
    } catch {
    }
    a.lineWidth = 9, a.strokeStyle = n, a.lineJoin = "round", a.strokeText(i, 512, 66), a.fillStyle = e, a.fillText(i, 512, 66);
    let o = new wn(r);
    return o.colorSpace = Se, o.anisotropy = 8, o;
  }
  function Uu() {
    let t = ji(256, 256), e = t.getContext("2d"), n = me(404);
    e.fillStyle = "#9ab87a", e.fillRect(0, 0, 256, 256);
    for (let s = 0; s < 1400; s++) {
      let r = n() * 256, a = n() * 256, o = n() * 6.28, c = 5 + n() * 9, l = 2.2 + n() * 3, u = 0.7 + n() * 0.55, h = `rgba(${120 * u | 0},${165 * u | 0},${78 * u | 0},${0.55 + n() * 0.4})`;
      for (let f of [-256, 0, 256]) for (let d of [-256, 0, 256]) {
        let g = r + f, _ = a + d;
        g < -20 || _ < -20 || g > 276 || _ > 276 || (e.save(), e.translate(g, _), e.rotate(o), e.fillStyle = h, e.beginPath(), e.ellipse(0, 0, c, l, 0, 0, 7), e.fill(), e.restore());
      }
    }
    for (let s = 0; s < 260; s++) e.fillStyle = `rgba(10,18,8,${0.15 + n() * 0.25})`, e.beginPath(), e.arc(n() * 256, n() * 256, 1 + n() * 3.5, 0, 7), e.fill();
    return Qi(t);
  }
  function Ko() {
    let i = document.createElement("canvas");
    i.width = i.height = 64;
    let t = i.getContext("2d"), e = t.createRadialGradient(32, 32, 0, 32, 32, 32);
    e.addColorStop(0, "rgba(255,255,255,1)"), e.addColorStop(0.35, "rgba(255,255,255,.75)"), e.addColorStop(1, "rgba(255,255,255,0)"), t.fillStyle = e, t.fillRect(0, 0, 64, 64);
    let n = new wn(i);
    return n.colorSpace = Se, n;
  }
  var br = [0, 1, 0], Sr = [{ id: 0, name: "Das gr\xFCne Haus", short: "START", px: null, desc: "Startpunkt an der Hook. Sicherer Bereich unter der gr\xFCnen Kuppel.", color: "#59ff5a" }, { id: 1, name: "Burg Gemen", short: "BURG", px: [925, 668], desc: "Die Wasserburg im Burgbezirk. Umgeben vom Wassergraben, nur \xFCber die Br\xFCcke erreichbar.", color: "#59ff5a" }, { id: 2, name: "Der Hof", short: "HOF", px: [768, 905], desc: "Der gro\xDFe U-f\xF6rmige Geb\xE4udekomplex nahe der Freiheit.", color: "#59ff5a" }, { id: 3, name: "Neustra\xDFe", short: "ZEILE", px: [585, 1005], desc: "Dichte H\xE4userzeile entlang der Neustra\xDFe, enge Gassen, viele Verstecke.", color: "#59ff5a" }, { id: 4, name: "Die Br\xFCcke", short: "BR\xDCCKE", px: [800, 1098], desc: "Die Waake kreuzt hier die Stra\xDFe. Wichtiger \xDCbergang.", color: "#59ff5a" }, { id: 5, name: "Kirche", short: "KIRCHE", px: [428, 1158], desc: "Das gro\xDFe Geb\xE4ude mit Apsis im Westen des Ortskerns.", color: "#59ff5a" }, { id: 6, name: "S\xFCdwiese", short: "WIESE", px: [600, 1640], desc: "Offene Wiese im S\xFCden. Wenig Deckung, viel Sicht.", color: "#59ff5a" }, { id: 7, name: "Siedlung West", short: "WEST", px: [128, 1370], desc: "Wohnsiedlung am Teveskamp mit vielen kleinen H\xE4usern.", color: "#59ff5a" }], Vx = [["Ahauser Stra\xDFe", 742, 1465, 56, 38], ["Hook", 556, 1287, -52, 16], ["Holzplatz", 628, 1193, -66, 26], ["Neustra\xDFe", 570, 990, 47, 28], ["Freiheit", 748, 1020, -48, 20], ["Achter de Waake", 832, 1055, -32, 38], ["Coesfelder Stra\xDFe", 868, 1252, -24, 52], ["Burgbezirk", 1047, 935, 78, 26], ["Hagenstiege", 700, 337, -28, 40], ["Feldstiege", 175, 917, 2, 30], ["B\xF6melbergstra\xDFe", 372, 400, -23, 36], ["Teveskamp", 120, 1507, 12, 28], ["Dr.-Kubisch-Weg", 452, 1345, 90, 34], ["Neum\xFChlenallee", 330, 1226, 2, 34], ["Goswinstra\xDFe", 235, 1076, -8, 28], ["Bocholter Aa", 620, 985, 53, 28]];
  async function Du(i, t, e) {
    let n = i.scale, s = i.home[0], r = i.home[1], a = (D, G) => [(D - s) * n, (G - r) * n], o = { S: n, HX: s, HY: r, W2: a, update: [], stations: [], blockers: [], lampPositions: [], fires: [] }, c = i.w * n, l = i.h * n;
    o.bounds = { x0: -s * n, x1: (i.w - s) * n, z0: -r * n, z1: (i.h - r) * n };
    let u = await new Promise((D, G) => {
      let y = new Image();
      y.onload = () => D(y), y.onerror = G, y.src = i.classmap;
    }), h = document.createElement("canvas");
    h.width = i.w, h.height = i.h;
    let f = h.getContext("2d");
    f.drawImage(u, 0, 0);
    let d = f.getImageData(0, 0, i.w, i.h).data, g = new Uint8Array(i.w * i.h);
    for (let D = 0; D < g.length; D++) g[D] = d[D * 4];
    o.cls = (D, G) => (D = D | 0, G = G | 0, D < 0 || G < 0 || D >= i.w || G >= i.h ? 0 : g[G * i.w + D]), o.clsAt = (D, G) => o.cls(D / n + s, G / n + r);
    let _ = me(20261019), m = new pe();
    t.add(m), o.root = m;
    let p = Pu(), x = ts("dirt"), v = ts("grass"), E = ts("meadow"), R = ts("sidewalk"), w = Lu(), T = Iu(), U = { ground: new ae({ map: x, color: 15128772, roughness: 1 }), grass: new ae({ map: v, color: 13230264, roughness: 1, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }), meadow: new ae({ map: E, color: 14473640, roughness: 1, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }), road: new ae({ map: p, color: 13685980, roughness: 0.38, metalness: 0.08, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }), side: new ae({ map: R, color: 12170154, roughness: 0.9 }), curb: new ae({ color: 7170662, roughness: 0.95 }), water: new ae({ color: 928304, roughness: 0.08, metalness: 0.55, emissive: 735796, emissiveIntensity: 0.55, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }), wall: new ae({ map: w.map, emissiveMap: w.emissive, emissive: 16777215, emissiveIntensity: 1.9, vertexColors: true, roughness: 0.92 }), plain: new ae({ vertexColors: true, roughness: 0.95 }), roof: new ae({ map: T, vertexColors: true, roughness: 0.85 }), marking: new se({ color: 9408124, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }) };
    U.road.envMapIntensity = 1.6, U.water.envMapIntensity = 2, U.ground.envMapIntensity = 0.3, U.grass.envMapIntensity = 0.3, U.meadow.envMapIntensity = 0.3, U.side.envMapIntensity = 0.5, U.wall.envMapIntensity = 0.35, U.plain.envMapIntensity = 0.35, U.roof.envMapIntensity = 0.5, o.mats = U;
    {
      let D = (o.bounds.x0 + o.bounds.x1) / 2, G = (o.bounds.z0 + o.bounds.z1) / 2, y = new Ke(4e3, 4e3);
      y.rotateX(-Math.PI / 2);
      let b = y.attributes.uv;
      for (let I = 0; I < b.count; I++) b.setXY(I, b.getX(I) * 4e3 / 14, b.getY(I) * 4e3 / 14);
      let N = new zt(y, U.ground);
      N.position.set(D, -0.02, G), N.receiveShadow = true, m.add(N), o.groundMesh = N;
    }
    function M(D, G, y, b = [1, 1, 1], N = new Ot()) {
      let I = (lt) => {
        let St = [];
        for (let j of lt) {
          let vt = a(j[0], j[1]), Mt = St[St.length - 1];
          (!Mt || Math.abs(Mt[0] - vt[0]) + Math.abs(Mt[1] - vt[1]) > 1e-3) && St.push(vt);
        }
        if (St.length > 2) {
          let j = St[0], vt = St[St.length - 1];
          Math.abs(j[0] - vt[0]) + Math.abs(j[1] - vt[1]) < 1e-3 && St.pop();
        }
        return St;
      }, A = I(D.o), B = D.h.map(I).filter((lt) => lt.length > 2);
      if (A.length < 3) return N;
      let it = (lt) => new Bt(lt[0], lt[1]), Z = Ji.triangulateShape(A.map(it), B.map((lt) => lt.map(it))), st = A.concat(...B);
      for (let lt of Z) {
        let St = st[lt[0]], j = st[lt[1]], vt = st[lt[2]];
        N.tri([St[0], G, St[1]], [j[0], G, j[1]], [vt[0], G, vt[1]], [St[0] / y, St[1] / y], [j[0] / y, j[1] / y], [vt[0] / y, vt[1] / y], b, br);
      }
      return N;
    }
    let S = (D, G, { shadow: y = false, receive: b = false } = {}) => {
      let N = new zt(D, G);
      return N.castShadow = y, N.receiveShadow = b, m.add(N), N;
    };
    {
      let D = new Ot();
      for (let G of i.green) M(G, 0.012, 9, [1, 1, 1], D);
      S(D.toGeometry(), U.grass, { receive: true });
    }
    {
      let D = new Ot();
      for (let G of i.olive) M(G, 0.011, 9, [1, 1, 1], D);
      S(D.toGeometry(), U.meadow, { receive: true });
    }
    {
      let D = new Ot();
      for (let G of i.water) M(G, 0.025, 10, [1, 1, 1], D);
      S(D.toGeometry(), U.water, { receive: true });
    }
    {
      let D = new Ot();
      for (let G of i.sidewalk) M(G, 0.15, 5, [1, 1, 1], D);
      S(D.toGeometry(), U.side, { receive: true });
    }
    {
      let D = new Ot();
      for (let G of i.roads) M(G, 0.02, 7, [1, 1, 1], D);
      S(D.toGeometry(), U.road, { receive: true });
    }
    {
      let D = new Ot(), G = [0.5, 0.49, 0.47], y = (I) => {
        for (let A = 0; A < I.length; A++) {
          let B = a(I[A][0], I[A][1]), it = a(I[(A + 1) % I.length][0], I[(A + 1) % I.length][1]);
          Math.hypot(it[0] - B[0], it[1] - B[1]) < 0.2 || D.quad([B[0], 0.02, B[1]], [it[0], 0.02, it[1]], [it[0], 0.15, it[1]], [B[0], 0.15, B[1]], [0, 0], [1, 0], [1, 1], [0, 1], G, null);
        }
      };
      for (let I of i.roads) {
        y(I.o);
        for (let A of I.h) y(A);
      }
      let b = D.toGeometry(), N = new zt(b, new ae({ color: 7828332, roughness: 0.95, side: Ue, vertexColors: true }));
      m.add(N);
    }
    {
      let D = new Ot(), G = [1, 1, 1];
      for (let y of i.center) {
        if (y.w < 11) continue;
        let b = y.p.map((B) => a(B[0], B[1])), N = 0, I = true, A = 2.2;
        for (let B = 0; B < b.length - 1; B++) {
          let it = b[B], Z = b[B + 1], st = Math.hypot(Z[0] - it[0], Z[1] - it[1]);
          if (st < 1e-3) continue;
          let lt = (Z[0] - it[0]) / st, St = (Z[1] - it[1]) / st, j = 0;
          for (; j < st; ) {
            let vt = Math.min(A, st - j);
            if (I) {
              let Mt = it[0] + lt * j, Nt = it[1] + St * j, Pt = it[0] + lt * (j + vt), It = it[1] + St * (j + vt), kt = -St * 0.11, $t = lt * 0.11;
              D.quad([Mt + kt, 0.035, Nt + $t], [Pt + kt, 0.035, It + $t], [Pt - kt, 0.035, It - $t], [Mt - kt, 0.035, Nt - $t], [0, 0], [1, 0], [1, 1], [0, 1], G, br);
            }
            A -= vt, j += vt, A <= 1e-3 && (I = !I, A = I ? 2.2 : 3.6);
          }
        }
      }
      S(D.toGeometry(), U.marking);
    }
    let q = new Ot(), J = new Ot(), ht = new Ot(), H = (D) => [D[0] * 0.78, D[1] * 0.62, D[2] * 0.82], $ = [[0.93, 0.9, 0.8], [0.72, 0.42, 0.34], [0.74, 0.74, 0.72], [0.9, 0.84, 0.62], [0.92, 0.92, 0.9], [0.55, 0.44, 0.36], [0.66, 0.58, 0.5]].map(H), et = [[0.55, 0.3, 0.24], [0.34, 0.36, 0.4], [0.5, 0.46, 0.42], [0.3, 0.24, 0.22], [0.42, 0.28, 0.2]].map((D) => [D[0] * 0.8, D[1] * 0.6, D[2] * 0.85]), pt = Sr[1].px, V = Sr[5].px, C = [], gt = [], xt = [0, 0];
    function At(D, G, y, b, N, I, A, B, it, Z) {
      let st = G[1] - D[1], lt = -(G[0] - D[0]);
      return [st, lt];
    }
    function rt(D, G, y, b, N, I, A = {}) {
      let B = D.length, it = G > 0 ? 1 : -1;
      for (let Z = 0; Z < B; Z++) {
        let st = D[Z], lt = D[(Z + 1) % B], St = lt[0] - st[0], j = lt[1] - st[1], vt = Math.hypot(St, j);
        if (vt < 0.15) continue;
        let Mt = [it * j / vt, 0, -it * St / vt], Nt = 0.82 + 0.18 * (Mt[0] * -0.5 + Mt[2] * -0.8), Pt = [N[0] * Nt, N[1] * Nt, N[2] * Nt], It = A.ruin ? Math.max(1, Math.round(vt / 2.2)) : 1;
        for (let kt = 0; kt < It; kt++) {
          let $t = kt / It, ee = (kt + 1) / It, Ct = [st[0] + St * $t, st[1] + j * $t], at = [st[0] + St * ee, st[1] + j * ee], F = y;
          if (A.ruin && (F = y * (I() < 0.35 ? 1 : 0.28 + I() * 0.6)), vt * (ee - $t) < 1.9) J.quad([Ct[0], 0, Ct[1]], [at[0], 0, at[1]], [at[0], F, at[1]], [Ct[0], F, Ct[1]], xt, xt, xt, xt, Pt.map((_t) => _t * 0.9), Mt);
          else {
            let _t = vt * (ee - $t), Tt = Math.max(1, Math.round(_t / 3.3)), Rt = (A.uOff || 0) + (kt * 3 + Z * 2) % 4, Ut = Rt + Tt, Gt = A.vOff || 0, Vt = Gt + b * (F / y);
            q.quad([Ct[0], 0, Ct[1]], [at[0], 0, at[1]], [at[0], F, at[1]], [Ct[0], F, Ct[1]], [Rt / 4, Gt / 4], [Ut / 4, Gt / 4], [Ut / 4, Vt / 4], [Rt / 4, Vt / 4], Pt, Mt);
          }
        }
      }
    }
    function yt(D, G, y, b, N, I, A = false) {
      let B = Math.cos(D.ang), it = Math.sin(D.ang), Z = D.w / 2 + 0.45, st = D.d / 2 + 0.45, lt = (Ct, at, F) => [D.cx + Ct * B - at * it, F, D.cz + Ct * it + at * B], St = G + y, j = G - y * 0.45 / (D.d / 2 + 1e-3), vt = b, Mt = vt.map((Ct) => Ct * 0.82), Nt = Z * 2, Pt = Math.hypot(st, y), It = [lt(-Z, -st, j), lt(Z, -st, j), lt(Z, 0, St), lt(-Z, 0, St)], kt = [lt(Z, st, j), lt(-Z, st, j), lt(-Z, 0, St), lt(Z, 0, St)], $t = [-it * y / Pt * -1, st / Pt, 0];
      ht.quad(It[0], It[1], It[2], It[3], [0, 0], [Nt, 0], [Nt, Pt], [0, Pt], vt, [0, 1, 0]), A || ht.quad(kt[0], kt[1], kt[2], kt[3], [0, 0], [Nt, 0], [Nt, Pt], [0, Pt], Mt, [0, 1, 0]);
      let ee = N.map((Ct) => Ct * 0.88);
      for (let Ct of [-1, 1]) {
        let at = lt(Ct * Z * (1 - 0.45 / Z), -st + 0.45, G), F = lt(Ct * Z * (1 - 0.45 / Z), st - 0.45, G), _t = lt(Ct * Z * (1 - 0.45 / Z), 0, St);
        J.tri(at, F, _t, xt, xt, xt, ee, [Ct * B, 0, Ct * it]);
      }
      return { P: lt, top: St, L: Z, Wd: st };
    }
    function wt(D, G, y, b) {
      let N = (b() - 0.5) * y * 1.2, I = (b() < 0.5 ? -1 : 1) * 0.3, A = D(N, I, G);
      J.box(A[0], A[1] - 0.2 + 0.9, A[2], 0.8, 1.9, 0.8, 0, [0.42, 0.26, 0.2]);
    }
    let dt = i.buildings, ot = 0, bt = Sr.filter((D) => D.px).map((D) => D.px);
    for (let D = 0; D < dt.length; D++) {
      let y = dt[D].p.map((Ct) => a(Ct[0], Ct[1]));
      if (y = y.filter((Ct, at) => {
        let F = y[(at + 1) % y.length];
        return Math.abs(Ct[0] - F[0]) + Math.abs(Ct[1] - F[1]) > 0.2;
      }), y.length < 3) continue;
      let b = Ru(y), N = Math.abs(b);
      if (N < 7) continue;
      let I = b > 0 ? 1 : -1, A = me(D * 7919 + 13), B = Jc(y), it = [B[0] / n + s, B[1] / n + r], Z = Cu(y), st = N / Z.area > 0.78 && N > 22, lt = Math.hypot(it[0] - pt[0], it[1] - pt[1]), St = Math.hypot(it[0] - V[0], it[1] - V[1]), j = N < 40 ? 1 : N < 120 || A() < 0.65 ? 2 : 3, vt = j * 3 + (j === 1 ? 0.5 : 0), Mt = $[A() * $.length | 0].map((Ct) => Ct * (0.85 + A() * 0.2)), Nt = et[A() * et.length | 0].map((Ct) => Ct * (0.8 + A() * 0.35)), Pt = "house";
      lt < 62 ? (Pt = "castle", vt = 10 + A() * 2, j = 3, Mt = [0.62, 0.55, 0.48]) : St < 22 && N > 120 && (Pt = "church", vt = 9, j = 3, Mt = [0.78, 0.72, 0.62]);
      let It = bt.some((Ct) => Math.hypot(it[0] - Ct[0], it[1] - Ct[1]) < 14), kt = Pt === "house" && !It && A() < 0.14 && N > 25, $t = A() * 4 | 0, ee = A() * 4 | 0;
      if (Pt !== "castle") {
        let Ct = me(D * 131 + 977);
        o.graffitiWalls = o.graffitiWalls || [];
        for (let at = 0; at < y.length; at++) {
          let F = y[at], _t = y[(at + 1) % y.length], Tt = _t[0] - F[0], Rt = _t[1] - F[1], Ut = Math.hypot(Tt, Rt);
          if (Ut < 4.2 || Ct() > 0.42) continue;
          let Gt = I > 0 ? 1 : -1;
          o.graffitiWalls.push({ ax: F[0], az: F[1], bx: _t[0], bz: _t[1], nx: Gt * Rt / Ut, nz: -Gt * Tt / Ut, L: Ut, wallH: vt, seed: D * 17 + at });
        }
      }
      if (kt) {
        ot++;
        let Ct = Mt.map((_t) => _t * 0.78);
        rt(y, I, vt, j, Ct, A, { ruin: true, uOff: $t, vOff: ee });
        let at = Ji.triangulateShape(y.map((_t) => new Bt(_t[0], _t[1])), []);
        for (let _t of at) J.tri([y[_t[0]][0], 0.06, y[_t[0]][1]], [y[_t[1]][0], 0.06, y[_t[1]][1]], [y[_t[2]][0], 0.06, y[_t[2]][1]], xt, xt, xt, [0.16, 0.13, 0.11], br);
        let F = 3 + (A() * 5 | 0);
        for (let _t = 0; _t < F; _t++) {
          let Tt = A(), Rt = y[A() * y.length | 0], Ut = fe(B[0], Rt[0], A() * 0.85), Gt = fe(B[1], Rt[1], A() * 0.85), Vt = 0.5 + A() * 1.4;
          J.box(Ut, Vt * 0.35, Gt, Vt * (0.8 + A()), Vt * 0.7, Vt * (0.6 + A()), A() * 6.28, [0.34 + A() * 0.14, 0.3 + A() * 0.12, 0.27 + A() * 0.1]);
        }
        if (st && A() < 0.6) {
          let _t = yt(Z, vt * 0.82, Math.min(2.6, Z.d * 0.35), Nt.map((Tt) => Tt * 0.6), Ct, A, true);
        }
        A() < 0.45 && gt.push([B[0], B[1], vt]), o.ruinPools = o.ruinPools || [], o.ruinPools.push({ x: B[0], z: B[1], y: 0.22, rot: 0, sx: 1 + Math.min(1.2, Math.sqrt(N) / 14) });
        continue;
      }
      if (rt(y, I, vt, j, Mt, A, { uOff: $t, vOff: ee }), Pt === "castle") {
        let Ct = Ji.triangulateShape(y.map((at) => new Bt(at[0], at[1])), []);
        for (let at of Ct) ht.tri([y[at[0]][0], vt + 0.02, y[at[0]][1]], [y[at[1]][0], vt + 0.02, y[at[1]][1]], [y[at[2]][0], vt + 0.02, y[at[2]][1]], [0, 0], [1, 0], [0, 1], [0.32, 0.31, 0.3], br);
        for (let at = 0; at < y.length; at++) {
          let F = y[at], _t = y[(at + 1) % y.length], Tt = Math.hypot(_t[0] - F[0], _t[1] - F[1]), Rt = Math.floor(Tt / 2);
          for (let Ut = 0; Ut < Rt; Ut++) {
            let Gt = (Ut + 0.5) / Rt;
            J.box(fe(F[0], _t[0], Gt), vt + 0.55, fe(F[1], _t[1], Gt), 1, 1.1, 1, Math.atan2(_t[1] - F[1], _t[0] - F[0]) * -1, [0.58, 0.52, 0.46]);
          }
        }
        C.push(y);
      } else if (st) {
        let Ct = Le(Math.min(Z.d, 12) * 0.36, 1.3, 4.6), at = yt(Z, vt, Ct, Nt, Mt, A);
        if (A() < 0.5 && wt(at.P, at.top, at.L, A), Pt === "church") {
          let F = Math.cos(Z.ang), _t = Math.sin(Z.ang), Tt = Z.cx + F * (Z.w / 2 - 1.8), Rt = Z.cz + _t * (Z.w / 2 - 1.8);
          J.box(Tt, 11, Rt, 4.2, 22, 4.2, -Z.ang, [0.74, 0.68, 0.58]);
          let Ut = 9, Gt = (Jt, re) => [Tt + Jt * F - re * _t, 22, Rt + Jt * _t + re * F], Vt = [Tt, 22 + Ut, Rt], ce = [[-2.3, -2.3], [2.3, -2.3], [2.3, 2.3], [-2.3, 2.3]];
          for (let Jt = 0; Jt < 4; Jt++) {
            let re = Gt(ce[Jt][0], ce[Jt][1]), _e = Gt(ce[(Jt + 1) % 4][0], ce[(Jt + 1) % 4][1]);
            ht.tri(re, _e, Vt, [0, 0], [4, 0], [2, 9], [0.28, 0.3, 0.33], [0, 1, 0]);
          }
        }
      } else {
        let Ct = Ji.triangulateShape(y.map((at) => new Bt(at[0], at[1])), []);
        for (let at of Ct) ht.tri([y[at[0]][0], vt + 0.02, y[at[0]][1]], [y[at[1]][0], vt + 0.02, y[at[1]][1]], [y[at[2]][0], vt + 0.02, y[at[2]][1]], [0, 0], [1, 0], [0, 1], Nt.map((F) => F * 0.55), br);
        N > 80 && A() < 0.7 && J.box(B[0], vt + 0.5, B[1], 1.6, 1, 1.1, A() * 3, [0.5, 0.5, 0.52]), A() < 0.4 && J.box(B[0] + 1.5, vt + 0.9, B[1] - 1, 0.8, 1.8, 0.8, 0, [0.42, 0.26, 0.2]);
      }
    }
    if (C.length) {
      let D = [].concat(...C), G = Jc(D), y = [[], [], [], []];
      for (let b of D) {
        let N = (b[0] > G[0] ? 1 : 0) + (b[1] > G[1] ? 2 : 0);
        y[N].push(b);
      }
      for (let b of y) {
        if (!b.length) continue;
        let N = b[0], I = 0;
        for (let Mt of b) {
          let Nt = Math.hypot(Mt[0] - G[0], Mt[1] - G[1]);
          Nt > I && (I = Nt, N = Mt);
        }
        let A = fe(N[0], G[0], 0.06), B = fe(N[1], G[1], 0.06), it = new sn(3, 3.3, 17, 14, 1).toNonIndexed();
        it.translate(A, 8.5, B);
        let Z = it.attributes.position, st = it.attributes.normal, lt = it.attributes.uv;
        for (let Mt = 0; Mt < Z.count; Mt += 3) q.tri([Z.getX(Mt), Z.getY(Mt), Z.getZ(Mt)], [Z.getX(Mt + 1), Z.getY(Mt + 1), Z.getZ(Mt + 1)], [Z.getX(Mt + 2), Z.getY(Mt + 2), Z.getZ(Mt + 2)], [lt.getX(Mt) * 3, lt.getY(Mt) * 4], [lt.getX(Mt + 1) * 3, lt.getY(Mt + 1) * 4], [lt.getX(Mt + 2) * 3, lt.getY(Mt + 2) * 4], [0.6, 0.54, 0.47], [st.getX(Mt), st.getY(Mt), st.getZ(Mt)]);
        let St = new zs(3.9, 6, 14).toNonIndexed();
        St.translate(A, 20, B);
        let j = St.attributes.position, vt = St.attributes.normal;
        for (let Mt = 0; Mt < j.count; Mt += 3) ht.tri([j.getX(Mt), j.getY(Mt), j.getZ(Mt)], [j.getX(Mt + 1), j.getY(Mt + 1), j.getZ(Mt + 1)], [j.getX(Mt + 2), j.getY(Mt + 2), j.getZ(Mt + 2)], [0, 0], [1, 0], [0, 1], [0.24, 0.27, 0.3], [vt.getX(Mt), vt.getY(Mt), vt.getZ(Mt)]);
      }
    }
    S(q.toGeometry(), U.wall, { shadow: true, receive: true }), S(J.toGeometry(), U.plain, { shadow: true, receive: true }), S(ht.toGeometry(), U.roof, { shadow: true, receive: true }), o.ruins = gt, o.ruinCount = ot;
    let Et = Sr[0];
    Et.px = [s, r];
    for (let D of Sr) {
      let G = a(D.px[0], D.px[1]);
      D.x = G[0], D.z = G[1], o.stations.push(D);
    }
    let O = Math.ceil(c), W = Math.ceil(l), L = new Uint8Array(O * W), ct = o.bounds.x0, X = o.bounds.z0;
    for (let D = 0; D < W; D++) for (let G = 0; G < O; G++) {
      let y = Math.floor(G / n), b = Math.floor(D / n), N = Math.min(i.w - 1, Math.floor((G + 1) / n)), I = Math.min(i.h - 1, Math.floor((D + 1) / n)), A = 0;
      for (let B = b; B <= I && !A; B++) for (let it = y; it <= N; it++) {
        let Z = g[B * i.w + it];
        if (Z === 2 || Z === 3 || Z === 4) {
          A = 1;
          break;
        }
      }
      L[D * O + G] = A;
    }
    let tt = new Uint8Array(L);
    for (let D = 1; D < W - 1; D++) for (let G = 1; G < O - 1; G++) {
      if (L[D * O + G]) continue;
      let y = 0;
      for (let b = -1; b <= 1; b++) for (let N = -1; N <= 1; N++) y += L[(D + b) * O + G + N];
      y >= 2 && (tt[D * O + G] = 1);
    }
    let z = { GW: O, GH: W, blocked: tt, g0x: ct, g0z: X };
    z.cell = (D, G) => [Math.floor(D - ct), Math.floor(G - X)], z.ok = (D, G) => {
      let y = Math.floor(D - ct), b = Math.floor(G - X);
      return y < 0 || b < 0 || y >= O || b >= W ? false : !z.blocked[b * O + y];
    }, o.walk = z, z.nearest = (D, G) => {
      if (z.ok(D, G) && (!z.reach || z.reach[z.cell(D, G)[1] * O + z.cell(D, G)[0]])) return [D, G];
      let [y, b] = z.cell(D, G);
      for (let N = 1; N < 90; N++) {
        let I = null, A = 1e9;
        for (let B = -N; B <= N; B++) for (let it = -N; it <= N; it++) {
          if (Math.max(Math.abs(it), Math.abs(B)) !== N) continue;
          let Z = y + it, st = b + B;
          if (!(Z < 0 || st < 0 || Z >= O || st >= W) && !z.blocked[st * O + Z] && (!z.reach || z.reach[st * O + Z])) {
            let lt = it * it + B * B;
            lt < A && (A = lt, I = [Z, st]);
          }
        }
        if (I) return [ct + I[0] + 0.5, X + I[1] + 0.5];
      }
      return null;
    }, z.los = (D, G, y, b) => {
      let N = Math.hypot(y - D, b - G), I = Math.ceil(N / 0.5);
      for (let A = 0; A <= I; A++) {
        let B = A / I;
        if (!z.ok(fe(D, y, B), fe(G, b, B))) return false;
      }
      return true;
    }, z.path = (D, G, y, b) => {
      let N = z.nearest(D, G), I = z.nearest(y, b);
      if (!N || !I) return null;
      let [A, B] = z.cell(N[0], N[1]), [it, Z] = z.cell(I[0], I[1]), st = O * W, lt = new Float32Array(st).fill(1e9), St = new Int32Array(st).fill(-1), j = new Uint8Array(st), vt = [], Mt = (Rt, Ut) => {
        vt.push([Rt, Ut]);
        let Gt = vt.length - 1;
        for (; Gt > 0; ) {
          let Vt = Gt - 1 >> 1;
          if (vt[Vt][0] <= vt[Gt][0]) break;
          [vt[Vt], vt[Gt]] = [vt[Gt], vt[Vt]], Gt = Vt;
        }
      }, Nt = () => {
        let Rt = vt[0], Ut = vt.pop();
        if (vt.length) {
          vt[0] = Ut;
          let Gt = 0;
          for (; ; ) {
            let Vt = 2 * Gt + 1, ce = Vt + 1, Jt = Gt;
            if (Vt < vt.length && vt[Vt][0] < vt[Jt][0] && (Jt = Vt), ce < vt.length && vt[ce][0] < vt[Jt][0] && (Jt = ce), Jt === Gt) break;
            [vt[Jt], vt[Gt]] = [vt[Gt], vt[Jt]], Gt = Jt;
          }
        }
        return Rt;
      }, Pt = B * O + A, It = Z * O + it;
      lt[Pt] = 0, Mt(0, Pt);
      let kt = (Rt, Ut) => Math.hypot(Rt - it, Ut - Z), $t = (Rt, Ut) => g[Math.min(i.h - 1, Math.floor((Ut + 0.5) / n)) * i.w + Math.min(i.w - 1, Math.floor((Rt + 0.5) / n))] === 1 ? 0.8 : 1, ee = false, Ct = 0;
      for (; vt.length && Ct++ < 4e5; ) {
        let [, Rt] = Nt();
        if (j[Rt]) continue;
        if (j[Rt] = 1, Rt === It) {
          ee = true;
          break;
        }
        let Ut = Rt % O, Gt = Rt / O | 0;
        for (let Vt = -1; Vt <= 1; Vt++) for (let ce = -1; ce <= 1; ce++) {
          if (!ce && !Vt) continue;
          let Jt = Ut + ce, re = Gt + Vt;
          if (Jt < 0 || re < 0 || Jt >= O || re >= W) continue;
          let _e = re * O + Jt;
          if (z.blocked[_e] || j[_e] || ce && Vt && (z.blocked[Gt * O + Jt] || z.blocked[re * O + Ut])) continue;
          let k = (ce && Vt ? 1.414 : 1) * $t(Jt, re), Q = lt[Rt] + k;
          Q < lt[_e] && (lt[_e] = Q, St[_e] = Rt, Mt(Q + kt(Jt, re), _e));
        }
      }
      if (!ee) return null;
      let at = [], F = It;
      for (; F !== -1; ) at.push([ct + F % O + 0.5, X + (F / O | 0) + 0.5]), F = St[F];
      at.reverse();
      let _t = [at[0]], Tt = 0;
      for (; Tt < at.length - 1; ) {
        let Rt = at.length - 1;
        for (; Rt > Tt + 1 && !z.los(at[Tt][0], at[Tt][1], at[Rt][0], at[Rt][1]); ) Rt--;
        _t.push(at[Rt]), Tt = Rt;
      }
      return _t;
    }, z.computeReach = (D, G) => {
      let [y, b] = z.cell(D, G), N = new Uint8Array(O * W), I = new Int32Array(O * W), A = 0, B = 0;
      for (I[B++] = b * O + y, N[b * O + y] = 1; A < B; ) {
        let it = I[A++], Z = it % O, st = it / O | 0;
        for (let lt = -1; lt <= 1; lt++) for (let St = -1; St <= 1; St++) {
          if (!St && !lt) continue;
          let j = Z + St, vt = st + lt;
          if (j < 0 || vt < 0 || j >= O || vt >= W) continue;
          let Mt = vt * O + j;
          N[Mt] || z.blocked[Mt] || St && lt && (z.blocked[st * O + j] || z.blocked[vt * O + Z]) || (N[Mt] = 1, I[B++] = Mt);
        }
      }
      return z.reach = N, B;
    };
    for (let D of o.stations) {
      let G = z.nearest(D.x, D.z);
      G ? (D.wx = G[0], D.wz = G[1]) : (D.wx = D.x, D.wz = D.z);
    }
    for (let [D, G, y, b, N] of Vx) {
      let I = a(G, y), A = $o(D, { font: '700 52px "Segoe UI", Arial, sans-serif', color: "#e4ecdf", letter: 5 }), B = D.length * 3.3, it = B / 8, Z = new zt(new Ke(B, it), new se({ map: A, transparent: true, opacity: 0.78, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6 }));
      Z.rotation.x = -Math.PI / 2;
      let st = new pe();
      st.add(Z), st.position.set(I[0], 0.25, I[1]), st.rotation.y = -b * Math.PI / 180, m.add(st);
    }
    return o;
  }
  var jo = new ve(), Nu = new En(), Ou = new Y(), Fu = new Y(), rv = new Ds(), Wx = new Y(0, 1, 0);
  function es(i, t, e, n, s = 100, r = {}) {
    let a = /* @__PURE__ */ new Map();
    for (let c of n) {
      let l = Math.floor(c.x / s) + "," + Math.floor(c.z / s);
      a.has(l) || a.set(l, []), a.get(l).push(c);
    }
    let o = [];
    for (let [c, l] of a) {
      let u = new ri(t, e, l.length), h = new Xt();
      l.forEach((g, _) => {
        Nu.setFromAxisAngle(Wx, g.rot || 0), Ou.set(g.x, g.y || 0, g.z), Fu.set(g.sx || g.s || 1, g.sy || g.s || 1, g.sz || g.sx || g.s || 1), jo.compose(Ou, Nu, Fu), u.setMatrixAt(_, jo), g.color !== void 0 && (h.set(g.color), u.setColorAt(_, h));
      }), u.instanceMatrix.needsUpdate = true, u.instanceColor && (u.instanceColor.needsUpdate = true), u.castShadow = !!r.shadow, u.receiveShadow = !!r.receive, u.computeBoundingSphere(), i.add(u);
      let f = 0, d = 0;
      for (let g of l) f += g.x, d += g.z;
      o.push({ mesh: u, cx: f / l.length, cz: d / l.length, n: l.length });
    }
    return o;
  }
  function Er(i, t, e, n = 1) {
    let s = me(e), r = new Ot(), a = new sn(0.16 * n, 0.28 * n, 3.2 * n, 6, 1).toNonIndexed();
    a.translate(0, 1.6 * n, 0);
    let o = a.attributes.position, c = a.attributes.normal;
    for (let l = 0; l < o.count; l += 3) r.tri([o.getX(l), o.getY(l), o.getZ(l)], [o.getX(l + 1), o.getY(l + 1), o.getZ(l + 1)], [o.getX(l + 2), o.getY(l + 2), o.getZ(l + 2)], [0, 0], [1, 0], [0, 1], [0.34, 0.25, 0.18], [c.getX(l), c.getY(l), c.getZ(l)]);
    for (let l = 0; l < t; l++) {
      let u = new Un(1, i), h = s() * 6.283, f = l === 0 ? 0 : (0.6 + s() * 1.1) * n, d = Math.cos(h) * f, g = Math.sin(h) * f, _ = (3.6 + l * 0.9 + s() * 0.8) * n, m = (1.9 + s() * 0.8 - l * 0.12) * n, p = u.attributes.position, x = /* @__PURE__ */ new Map(), v = (M, S, q) => (M * 1e3 | 0) + "_" + (S * 1e3 | 0) + "_" + (q * 1e3 | 0);
      for (let M = 0; M < p.count; M++) {
        let S = v(p.getX(M), p.getY(M), p.getZ(M));
        x.has(S) || x.set(S, i >= 1 ? 0.9 + s() * 0.2 : 0.82 + s() * 0.36);
      }
      let E = (M) => {
        let S = p.getX(M), q = p.getY(M), J = p.getZ(M), ht = x.get(v(S, q, J));
        return [d + S * m * ht, _ + q * m * 0.82 * ht, g + J * m * ht];
      }, R = (M) => {
        let S = p.getX(M), q = p.getY(M), J = p.getZ(M), ht = Math.hypot(S, q * 1.2, J) || 1;
        return [S / ht, q * 1.2 / ht, J / ht];
      }, w = (M) => {
        let S = Le((M - _) / m * 0.5 + 0.5, 0, 1);
        return [fe(0.16, 0.46, S), fe(0.3, 0.66, S), fe(0.11, 0.24, S)];
      }, T = u.index, U = T ? T.count : p.count;
      for (let M = 0; M < U; M += 3) {
        let S = T ? T.getX(M) : M, q = T ? T.getX(M + 1) : M + 1, J = T ? T.getX(M + 2) : M + 2, ht = E(S), H = E(q), $ = E(J), et = (pt) => [(pt[0] * 0.8 + pt[2] * 0.6) * 0.32, (pt[1] * 0.9 + pt[2] * 0.3 - pt[0] * 0.2) * 0.32];
        r.triS(ht, H, $, et(ht), et(H), et($), [w(ht[1]), w(H[1]), w($[1])], R(S), R(q), R(J));
      }
    }
    return r.toGeometry();
  }
  function zu(i, t, e) {
    let n = i.S, s = me(555), r = Er(1, 4, 1), a = Er(0, 2, 2), o = new ae({ vertexColors: true, roughness: 0.95, map: Uu(), envMapIntensity: 0.3 });
    i.treeMat = o;
    let c = i.bounds, l = [], u = (x, v) => {
      for (let [E, R] of [[0, 0], [2, 0], [-2, 0], [0, 2], [0, -2]]) {
        let w = i.clsAt(x + E, v + R);
        if (w === 1 || w === 2 || w === 3 || w === 4) return true;
      }
      return false;
    }, h = e.treeDensity, f = [12096728, 10123460, 8829082, 13666990, 9400502, 7383194];
    for (let x = c.x0 - 80; x < c.x1 + 80; x += 3.4) for (let v = c.z0 - 80; v < c.z1 + 80; v += 3.4) {
      let E = x >= c.x0 && x <= c.x1 && v >= c.z0 && v <= c.z1, R;
      if (E) {
        let M = i.clsAt(x, v);
        R = M === 6 ? 0.11 : M === 5 ? 0.015 : M === 0 ? 0.05 : 0;
        for (let S of i.stations) if (Math.hypot(x - S.x, v - S.z) < 11) {
          R = 0;
          break;
        }
      } else {
        let M = Math.min(Math.abs(x - c.x0), Math.abs(x - c.x1), Math.abs(v - c.z0), Math.abs(v - c.z1)), S = x < c.x0 ? c.x0 - x : x > c.x1 ? x - c.x1 : 0, q = 0.5 + 0.5 * Math.sin(x * 0.05 + v * 0.037) * Math.cos(v * 0.021 - x * 0.013);
        R = M < 55 * q + 10 ? 0.38 : 0;
      }
      if (R *= h, s() > R) continue;
      let w = x + (s() - 0.5) * 2.6, T = v + (s() - 0.5) * 2.6;
      if (E && u(w, T) || Math.hypot(w, T) < 20) continue;
      let U = 0.85 + s() * 0.7;
      l.push({ x: w, z: T, rot: s() * 6.28, sx: U, sy: U * (0.9 + s() * 0.35), color: f[s() * f.length | 0] });
    }
    let d = es(i.root, r, o, l, 100, { shadow: e.shadows, receive: false }), g = es(i.root, a, o, l, 100), _ = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map();
    for (let x of d) _.set(Math.round(x.cx) + "," + Math.round(x.cz), x);
    let p = [];
    for (let x = 0; x < d.length; x++) p.push({ hi: d[x], lo: g[x] });
    i.treeCount = l.length, i.treeLOD = (x, v) => {
      for (let E of p) {
        let w = Math.hypot(E.hi.cx - x, E.hi.cz - v) < 150;
        E.hi.mesh.visible = w, E.lo.mesh.visible = !w;
      }
    }, i.treeLOD(0, 0);
  }
  function Bu(i, t) {
    let e = i.S, n = me(99), s = [];
    for (let x of t.center) {
      if (x.w < 8) continue;
      let v = x.p.map((w) => i.W2(w[0], w[1])), E = 14 + n() * 10, R = n() < 0.5 ? 1 : -1;
      for (let w = 0; w < v.length - 1; w++) {
        let T = v[w], U = v[w + 1], M = Math.hypot(U[0] - T[0], U[1] - T[1]);
        if (M < 1e-3) continue;
        let S = (U[0] - T[0]) / M, q = (U[1] - T[1]) / M, J = 0;
        for (; E <= M - J; ) {
          J += E, E = 36 + n() * 8;
          let ht = T[0] + S * J, H = T[1] + q * J, $ = x.w * e / 2 + 0.7, et = ht - q * $ * R, pt = H + S * $ * R;
          R = -R, i.clsAt(et, pt) !== 2 && s.push({ x: et, z: pt, rot: Math.atan2(S, q) * 1, color: void 0, ax: -q * R, az: S * R });
        }
        E -= M - J;
      }
    }
    let r = new Ot(), a = new sn(0.07, 0.1, 6.4, 6, 1).toNonIndexed();
    a.translate(0, 3.2, 0);
    let o = a.attributes.position, c = a.attributes.normal;
    for (let x = 0; x < o.count; x += 3) r.tri([o.getX(x), o.getY(x), o.getZ(x)], [o.getX(x + 1), o.getY(x + 1), o.getZ(x + 1)], [o.getX(x + 2), o.getY(x + 2), o.getZ(x + 2)], [0, 0], [1, 0], [0, 1], [0.1, 0.1, 0.11], [c.getX(x), c.getY(x), c.getZ(x)]);
    r.box(0, 6.35, 0.5, 0.12, 0.12, 1.1, 0, [0.1, 0.1, 0.11]);
    let l = new Ot();
    l.box(0, 6.22, 1, 0.5, 0.14, 0.9, 0, [1, 1, 1], 1, false);
    let u = new ae({ vertexColors: true, roughness: 0.6, metalness: 0.4 }), h = new se({ color: 16777215, toneMapped: false }), f = [16722570, 1697535, 9109290, 16747034, 11553791, 16724016], d = s.map((x, v) => ({ x: x.x, z: x.z, rot: Math.atan2(-x.ax, -x.az), sx: 1, color: f[(v * 7 + (v >> 2)) % f.length] }));
    es(i.root, r.toGeometry(), u, d, 120, { shadow: false }), es(i.root, l.toGeometry(), h, d, 120);
    let g = Fn([[0, "rgba(255,255,255,0.5)"], [0.3, "rgba(255,255,255,0.2)"], [0.7, "rgba(255,255,255,0.05)"], [1, "rgba(255,255,255,0)"]]), _ = new Ke(13, 13);
    _.rotateX(-Math.PI / 2);
    let m = new se({ map: g, transparent: true, depthWrite: false, opacity: 0.7, blending: Ee, polygonOffset: true, polygonOffsetFactor: -8, polygonOffsetUnits: -8 }), p = d.map((x) => ({ x: x.x + Math.sin(x.rot) * 2.2, z: x.z + Math.cos(x.rot) * 2.2, y: 0.2, rot: 0, sx: 1, color: x.color }));
    es(i.root, _, m, p, 120), i.lampCount = s.length, i.lampItems = d;
  }
  function ku(i) {
    if (!i.ruinPools) return;
    let t = Fn([[0, "rgba(255,110,30,0.55)"], [0.3, "rgba(255,90,20,0.22)"], [0.7, "rgba(255,70,10,0.05)"], [1, "rgba(255,60,0,0)"]]), e = new Ke(14, 14);
    e.rotateX(-Math.PI / 2);
    let n = new se({ map: t, transparent: true, depthWrite: false, opacity: 0.55, blending: Ee, polygonOffset: true, polygonOffsetFactor: -8, polygonOffsetUnits: -8 });
    es(i.root, e, n, i.ruinPools, 120);
  }
  function Hu(i, t, e) {
    let n = me(4242), s = i.S, r = new Ot(), a = [1, 1, 1];
    r.box(0, 0.62, 0, 4.3, 0.85, 1.8, 0, a), r.box(-0.15, 1.28, 0, 2.3, 0.7, 1.6, 0, [0.82, 0.86, 0.9]);
    for (let l of [-1.4, 1.4]) for (let u of [-0.85, 0.85]) r.box(l, 0.32, u, 0.7, 0.64, 0.25, 0, [0.04, 0.04, 0.04]);
    r.box(-0.15, 1.3, 0, 2.32, 0.52, 1.62, 0, [0.05, 0.07, 0.09]);
    let o = [], c = [8010542, 4018026, 7304055, 5069372, 11776164, 2434859, 9071150, 5909034];
    for (let l of t.center) {
      if (l.w < 10) continue;
      let u = l.p.map((d) => i.W2(d[0], d[1])), h = 0;
      for (let d = 0; d < u.length - 1; d++) h += Math.hypot(u[d + 1][0] - u[d][0], u[d + 1][1] - u[d][1]);
      let f = Math.floor(h / 55 * (0.7 + n() * 0.6));
      for (let d = 0; d < f; d++) {
        let g = n() * h, _ = 0;
        for (let m = 0; m < u.length - 1; m++) {
          let p = Math.hypot(u[m + 1][0] - u[m][0], u[m + 1][1] - u[m][1]);
          if (_ + p >= g) {
            let x = (g - _) / p, v = (u[m + 1][0] - u[m][0]) / p, E = (u[m + 1][1] - u[m][1]) / p, R = (n() - 0.5) * l.w * s * 0.55, w = fe(u[m][0], u[m + 1][0], x) - E * R, T = fe(u[m][1], u[m + 1][1], x) + v * R;
            if (Math.hypot(w, T) < 22 || i.clsAt(w, T) !== 1) break;
            let U = Math.atan2(v, E) - Math.PI / 2 + (n() < 0.15 ? Math.PI / 2 : 0) + (n() - 0.5) * 0.3 + (n() < 0.5 ? Math.PI : 0), M = n() < 0.3;
            o.push({ x: w, z: T, y: 0.02, rot: U, sx: 1, color: M ? 2762276 : c[n() * c.length | 0] }), i.carItems = i.carItems || [], i.carItems.push({ x: w, z: T, burnt: M });
            break;
          }
          _ += p;
        }
      }
    }
    es(i.root, r.toGeometry(), new ae({ vertexColors: true, roughness: 0.55, metalness: 0.3 }), o, 120, { shadow: e.shadows }), i.carCount = o.length;
  }
  function Kc(i, t, e, n, s, r, a = {}) {
    let o = a.segs || 36, c = a.h || 1.9, l = [];
    for (let u = 0; u < o; u++) {
      let h = u / o * Math.PI * 2, f = (u + 1) / o * Math.PI * 2, d = (h + f) / 2, g = Math.abs((d - s + Math.PI * 3) % (Math.PI * 2) - Math.PI), _ = (Math.PI - g) * n < r / 2 + 0.01 || false;
      if (Math.abs(((d - s + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI) * n < r / 2) continue;
      let p = t + Math.cos(h) * n, x = e + Math.sin(h) * n, v = t + Math.cos(f) * n, E = e + Math.sin(f) * n, R = Math.hypot(v - p, E - x), w = -Math.atan2(E - x, v - p), T = (p + v) / 2, U = (x + E) / 2, M = a.rail || [0.07, 0.09, 0.08], S = a.picket || [0.09, 0.12, 0.1], q = a.post || [0.12, 0.13, 0.12];
      i.box(T, c - 0.1, U, R, 0.07, 0.07, w, M, 1, false), i.box(T, 0.45, U, R, 0.06, 0.06, w, M, 1, false);
      let J = Math.max(2, Math.round(R / 0.32));
      for (let ht = 0; ht < J; ht++) {
        let H = (ht + 0.5) / J;
        i.box(fe(p, v, H), c / 2, fe(x, E, H), 0.04, c, 0.04, 0, S, 1, false);
      }
      l.push([p, x]);
    }
    for (let u of l) i.box(u[0], c / 2 + 0.15, u[1], 0.16, c + 0.3, 0.16, 0, a.post || [0.12, 0.13, 0.12]);
    return l;
  }
  function jc(i, t, e, n = 6, s = 0, r = null) {
    let a = r || [0.09, 0.14, 0.1];
    for (let [o, c] of [[-0.7, -0.7], [0.7, -0.7], [0.7, 0.7], [-0.7, 0.7]]) i.box(t + o, n / 2, e + c, 0.14, n, 0.14, 0, a, 1, false);
    for (let o of [1.5, 3, 4.5]) i.box(t, o, e - 0.7, 1.5, 0.08, 0.08, 0, a, 1, false), i.box(t, o, e + 0.7, 1.5, 0.08, 0.08, 0, a, 1, false), i.box(t - 0.7, o, e, 0.08, 0.08, 1.5, 0, a, 1, false), i.box(t + 0.7, o, e, 0.08, 0.08, 1.5, 0, a, 1, false);
    i.box(t, n + 0.05, e, 1.8, 0.14, 1.8, 0, r ? r.map((o) => o * 0.95) : [0.12, 0.17, 0.12]), i.box(t, n + 0.55, e, 1.5, 0.9, 1.5, 0, r ? r.map((o) => o * 0.9) : [0.1, 0.15, 0.11]);
  }
  function Gu(i, t) {
    let e = me(31337), n = new Ot(), s = new Ot(), r = Fn([[0, "rgba(90,255,90,0)"], [0.55, "rgba(90,255,90,0)"], [0.78, "rgba(90,255,90,0.55)"], [0.82, "rgba(120,255,120,0.9)"], [0.86, "rgba(90,255,90,0.35)"], [1, "rgba(90,255,90,0)"]]), a = Fn([[0, "rgba(70,255,70,0.30)"], [0.7, "rgba(70,255,70,0.12)"], [1, "rgba(70,255,70,0)"]]), o = new Ke(1, 1);
    o.rotateX(-Math.PI / 2);
    let c = new se({ map: r, transparent: true, depthWrite: false, blending: Ee, polygonOffset: true, polygonOffsetFactor: -9, polygonOffsetUnits: -9 }), l = new se({ map: a, transparent: true, depthWrite: false, blending: Ee, polygonOffset: true, polygonOffsetFactor: -9, polygonOffsetUnits: -9 }), u = new Te({ transparent: true, depthWrite: false, blending: Ee, side: Ue, uniforms: { uTime: { value: 0 } }, vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}", fragmentShader: "varying vec2 vUv; uniform float uTime; void main(){ float a=pow(1.0-vUv.y,1.8)*0.32; a*=0.75+0.25*sin(uTime*2.0+vUv.y*6.0); gl_FragColor=vec4(0.35,1.0,0.35,a);} " }), h = new se({ color: 6750054 }), f = [];
    i.stationFx = [];
    for (let m of i.stations) {
      if (m.id === 0) continue;
      let p = m.wx, x = m.wz, v = new zt(o, c);
      v.scale.set(17, 1, 17), v.position.set(p, 0.3, x), i.root.add(v);
      let E = new zt(o, l);
      E.scale.set(15, 1, 15), E.position.set(p, 0.28, x), i.root.add(E);
      let R = new zt(new sn(0.35, 0.9, 70, 14, 1, true), u);
      R.position.set(p, 35, x), i.root.add(R);
      let w = Kc(n, p, x, 7.4, Math.PI * 0.5, 2.6, { segs: 20, h: 1.6 });
      for (let T = 0; T < 4; T++) {
        let U = T * Math.PI / 2 + Math.PI / 4, M = p + Math.cos(U) * 7.4, S = x + Math.sin(U) * 7.4;
        jc(n, M, S, 5.2), f.push({ x: M, y: 5.75, z: S, sx: 1 });
      }
      i.stationFx.push({ ring: v, disc: E, st: m });
    }
    let d = new zt(n.toGeometry(), new ae({ vertexColors: true, roughness: 0.7, metalness: 0.4 }));
    d.castShadow = false, i.root.add(d);
    let g = new qi(0.7, 0.55, 0.7), _ = new ri(g, h, f.length);
    f.forEach((m, p) => {
      jo.makeTranslation(m.x, m.y, m.z), _.setMatrixAt(p, jo);
    }), i.root.add(_), i.beamMat = u, i.update.push((m) => {
      u.uniforms.uTime.value = m;
      for (let p of i.stationFx) {
        let x = 17 + Math.sin(m * 1.6 + p.st.id) * 0.8;
        p.ring.scale.set(x, 1, x);
      }
    });
  }
  var He = { x: -2, z: -3, R: 19, fenceR: 16.2, gateAng: 70 * Math.PI / 180 };
  function Vu(i, t) {
    let e = new pe();
    i.root.add(e);
    let n = i.mats, s = me(8080), r = He, a = new Ot(), o = new Ot(), c = new Ot(), l = new Ot(), u = new Ot(), h = new Ot(), f = new Ot(), d = [0, 0], g = [], _ = (W, L, ct) => {
      let X = Math.cos(ct), tt = Math.sin(ct);
      return (z, D) => [W + z * X + D * tt, L - z * tt + D * X];
    };
    function m(W, L, ct, X, tt, z, D, G, y, b = 0) {
      let N = _(W, L, tt), I = [N(-ct / 2, -X / 2), N(ct / 2, -X / 2), N(ct / 2, X / 2), N(-ct / 2, X / 2)], A = [[0, 0, -1], [1, 0, 0], [0, 0, 1], [-1, 0, 0]], B = Math.cos(tt), it = Math.sin(tt);
      for (let Z = 0; Z < 4; Z++) {
        let st = I[Z], lt = I[(Z + 1) % 4], St = Math.hypot(lt[0] - st[0], lt[1] - st[1]), j = A[Z], vt = [j[0] * B + j[2] * it, 0, -j[0] * it + j[2] * B], Mt = Math.max(1, Math.round(St / 3.2)), Nt = b + Z, Pt = Nt + Mt, It = 0.85 + 0.15 * (vt[0] * -0.4 + vt[2] * 0.5);
        a.quad([st[0], z, st[1]], [lt[0], z, lt[1]], [lt[0], z + D, lt[1]], [st[0], z + D, st[1]], [Nt / 4, 0], [Pt / 4, 0], [Pt / 4, G / 4], [Nt / 4, G / 4], y.map((kt) => kt * It), vt);
      }
    }
    function p(W, L, ct, X, tt, z, D, G, y, b = 0.5) {
      let N = _(W, L, tt), I = ct / 2 + b, A = X / 2 + b, B = z + D, it = Math.hypot(A, D), Z = (j, vt, Mt) => {
        let Nt = N(j, vt);
        return [Nt[0], Mt, Nt[1]];
      }, st = z - D * b / (X / 2);
      c.quad(Z(-I, -A, st), Z(I, -A, st), Z(I, 0, B), Z(-I, 0, B), [0, 0], [I * 2, 0], [I * 2, it], [0, it], G, [0, 1, 0]), c.quad(Z(I, A, st), Z(-I, A, st), Z(-I, 0, B), Z(I, 0, B), [0, 0], [I * 2, 0], [I * 2, it], [0, it], G.map((j) => j * 0.85), [0, 1, 0]);
      let lt = Math.cos(tt), St = Math.sin(tt);
      for (let j of [-1, 1]) o.tri(Z(j * (ct / 2), -X / 2, z), Z(j * (ct / 2), X / 2, z), Z(j * (ct / 2), 0, B), d, d, d, y.map((vt) => vt * 0.9), [j * lt, 0, -j * St]);
      return { pt: Z, top: B };
    }
    let x = [1, 0.96, 0.88], v = [0.95, 0.52, 0.5], E = [0.9, 0.52, 0.42], R = -6.5, w = -7.5, T = 0.1;
    m(R, w, 12, 8.4, T, 0, 6.2, 2, x, 1);
    let U = p(R, w, 12, 8.4, T, 6.2, 3.8, v, x);
    {
      let W = _(R, w, T), L = W(-1.5, 3);
      m(L[0], L[1], 3.2, 2.4, T, 5, 2.6, 1, x, 2), p(L[0], L[1], 3.2, 2.6, T + Math.PI / 2, 7.6, 1.5, v.map((tt) => tt * 1.05), x, 0.35);
      for (let [tt, z] of [[3.8, -1.4], [-3.2, -1]]) {
        let D = W(tt, z);
        o.box(D[0], 8.3, D[1], 0.9, 2.6, 0.9, T, E), o.box(D[0], 9.65, D[1], 1.15, 0.18, 1.15, T, [0.5, 0.46, 0.42]);
      }
      let ct = W(2.4, 4.25);
      o.box(ct[0], 1.15, ct[1], 1.2, 2.3, 0.18, T, [0.34, 0.2, 0.12]);
      let X = W(2.4, 4.9);
      o.box(X[0], 0.1, X[1], 2.4, 0.2, 1.4, T, [0.45, 0.44, 0.42]), o.box(ct[0], 2.7, ct[1] + 0, 1.8, 0.14, 1.2, T, [0.26, 0.17, 0.14]), i.porch = [ct[0] + Math.sin(T) * -0, 2.4, ct[1] + 0.6], g.push({ type: "rect", cx: R, cz: w, w: 12.8, d: 9.2, rot: T });
    }
    {
      m(-15.2, -6, 5.6, 7, T, 0, 3.4, 1, [0.88, 0.84, 0.74], 3);
      let ct = _(-15.2, -6, T);
      o.box(-15.2, 3.45, -6, 6, 0.18, 7.4, T, [0.3, 0.3, 0.32]);
      for (let [X, tt, z, D, G] of [[-1.2, -1.2, 1.4, 0.9, 1.1], [1.1, 1, 1.2, 0.7, 1.2], [0.2, -2.1, 0.6, 1.4, 0.6]]) {
        let y = ct(X, tt);
        o.box(y[0], 3.5 + D / 2, y[1], z, D, G, T + s(), [0.55, 0.56, 0.58]);
      }
      for (let X = 0; X < 5; X++) {
        let tt = ct((s() - 0.5) * 4, (s() - 0.5) * 5);
        o.box(tt[0], 3.62, tt[1], 0.7, 0.24, 0.7, s() * 3, [0.08, 0.08, 0.08]);
      }
      g.push({ type: "rect", cx: -15.2, cz: -6, w: 6, d: 7.4, rot: T });
    }
    {
      m(9.2, -3.2, 3.6, 3, 0.2, 0, 2.5, 1, [0.5, 0.58, 0.55], 0);
      let ct = _(9.2, -3.2, 0.2), X = ct(-2, -1.7), tt = ct(2, -1.7), z = ct(2, 1.7), D = ct(-2, 1.7);
      l.quad([X[0], 3.3, X[1]], [tt[0], 3.3, tt[1]], [z[0], 2.5, z[1]], [D[0], 2.5, D[1]], d, d, d, d, [0.05, 0.1, 0.2], [0, 1, 0]), o.box(9.2, 0.06, -3.2, 4.2, 0.12, 3.6, 0.2, [0.3, 0.3, 0.28]), g.push({ type: "rect", cx: 9.2, cz: -3.2, w: 4, d: 3.4, rot: 0.2 });
    }
    for (let W = 0; W < 3; W++) {
      let L = -1.2 + W * 3, ct = -14, X = (tt, z, D) => [L + tt, z, ct + D];
      l.quad(X(-1.3, 1.5, 0), X(1.3, 1.5, 0), X(1.3, 0.5, 1.6), X(-1.3, 0.5, 1.6), d, d, d, d, [0.05, 0.1, 0.22], [0, 1, 0.5]), o.box(L, 0.5, ct + 0.1, 0.1, 1, 0.1, 0, [0.4, 0.4, 0.42]), g.push({ type: "rect", cx: L, cz: ct + 0.8, w: 2.8, d: 1.8, rot: 0 });
    }
    {
      o.box(6.2, 0.05, -9, 7.4, 0.1, 6.2, 0, [0.34, 0.31, 0.27]), o.box(6.2, 0.78, -9, 2.4, 0.1, 1.1, 0.2, [0.4, 0.26, 0.15]);
      for (let [ct, X] of [[-1, -0.4], [1, -0.4], [-1, 0.4], [1, 0.4]]) o.box(6.2 + ct, 0.38, -9 + X, 0.1, 0.76, 0.1, 0.2, [0.2, 0.13, 0.08]);
      for (let ct = 0; ct < 6; ct++) {
        let X = ct / 6 * 6.28 + 0.4, tt = 6.2 + Math.cos(X) * 1.9, z = -9 + Math.sin(X) * 1.4;
        o.box(tt, 0.45, z, 0.55, 0.1, 0.55, -X, [0.36, 0.22, 0.12]), o.box(tt - Math.cos(X) * 0.22, 0.85, z - Math.sin(X) * 0.22, 0.08, 0.7, 0.55, -X, [0.3, 0.19, 0.1]);
      }
      o.box(6.2 + 4, 0.2, -7, 1.4, 0.4, 1.4, 0, [0.2, 0.19, 0.18]), i.fires.push([6.2 + 4, 0.7, -7]), g.push({ type: "rect", cx: 6.2, cz: -9, w: 3, d: 1.8, rot: 0.2 }), g.push({ type: "rect", cx: 6.2 + 4, cz: -7, w: 1.6, d: 1.6, rot: 0 }), i.homeFire = [6.2 + 4, 1, -7];
    }
    {
      let X = _(4.4, 4.4, -0.55), tt = (z, D, G, y, b, N, I, A = u) => {
        let B = X(z, G);
        A.box(B[0], D, B[1], y, b, N, -0.55, I, 1);
      };
      tt(0, 0.62, 0, 4.5, 0.82, 1.9, [0.42, 0.14, 0.7]), tt(0.9, 0.67, 0, 1.7, 0.86, 1.92, [0.93, 0.93, 0.95]), tt(-1, 1.25, 0, 1.9, 0.14, 1.6, [0.95, 0.95, 0.97]), tt(-0.2, 1.1, 0, 2.5, 0.58, 1.66, [0.05, 0.07, 0.1], f);
      for (let z of [-1.4, 1.4]) for (let D of [-0.9, 0.9]) tt(z, 0.34, D, 0.76, 0.68, 0.26, [0.03, 0.03, 0.03]);
      tt(0, 0.12, 0, 4.4, 0.06, 1.85, [0.4, 1, 0.3], h);
      for (let z of [-1, 1]) tt(0.2, 0.62, z * 0.97, 3, 0.07, 0.03, [0.5, 1, 0.35], h);
      g.push({ type: "rect", cx: 4.4, cz: 4.4, w: 4.8, d: 2.2, rot: -0.55 });
    }
    {
      let W = [0.95, 0.9, 0.8], L = (ct, X, tt, z, D, G, y = 0.045) => {
        let b = _(ct, X, D), N = b(-tt / 2, -z / 2), I = b(tt / 2, -z / 2), A = b(tt / 2, z / 2), B = b(-tt / 2, z / 2);
        o.quad([N[0], y, N[1]], [I[0], y, I[1]], [A[0], y, A[1]], [B[0], y, B[1]], d, d, d, d, G, [0, 1, 0]);
      };
      L(4, 5, 8, 14, -0.2, W), L(-9, 5.2, 12, 5.5, 0.05, [0.5, 0.85, 0.4], 0.04), L(-8, -2, 8, 2, 0.08, [0.95, 0.88, 0.75], 0.05);
    }
    let M = [[-12, 1.5], [-14.5, -1.8], [-9.8, -3], [-2.2, -2.8], [1.8, -2.6], [11.5, 0.2], [-10.5, 7.4], [13, -8.5], [-3.8, -12], [8, -12.4]];
    for (let [W, L] of M) {
      let ct = new Un(1, 1), X = ct.attributes.position, tt = ct.index, z = 0.7 + s() * 0.6, D = (y) => [W + X.getX(y) * z * 1.2, 0.55 * z + X.getY(y) * z * 0.85, L + X.getZ(y) * z * 1.2], G = tt ? tt.count : X.count;
      for (let y = 0; y < G; y += 3) {
        let b = D(tt ? tt.getX(y) : y), N = D(tt ? tt.getX(y + 1) : y + 1), I = D(tt ? tt.getX(y + 2) : y + 2), A = Le((b[1] + N[1] + I[1]) / 3 / 1.4, 0, 1);
        o.tri(b, N, I, d, d, d, [fe(0.18, 0.45, A), fe(0.55, 0.95, A), fe(0.2, 0.35, A)], [(b[0] + N[0] + I[0]) / 3 - W, (b[1] + N[1] + I[1]) / 3 - 0.5, (b[2] + N[2] + I[2]) / 3 - L]);
      }
    }
    let S = new Ot(), q = Kc(S, r.x, r.z, r.fenceR, r.gateAng, 5, { segs: 40, h: 1.9, rail: [1, 0.97, 0.92], picket: [1, 0.98, 0.94], post: [1, 0.9, 0.55] }), J = [0, 55, 110, 165, 220, 290].map((W) => W * Math.PI / 180), ht = [];
    for (let W of J) {
      let L = r.x + Math.cos(W) * (r.fenceR + 0.2), ct = r.z + Math.sin(W) * (r.fenceR + 0.2);
      jc(S, L, ct, 6.2, 0, [1, 0.93, 0.75]), ht.push([L, 6.9, ct]);
    }
    for (let W of [-1, 1]) {
      let L = r.gateAng + W * (2.9 / r.fenceR), ct = r.x + Math.cos(L) * r.fenceR, X = r.z + Math.sin(L) * r.fenceR;
      S.box(ct, 1.5, X, 0.6, 3, 0.6, 0, [1, 0.95, 0.8]), ht.push([ct, 3.15, X]), g.push({ type: "rect", cx: ct, cz: X, w: 0.8, d: 0.8, rot: 0 });
    }
    g.push({ type: "ring", cx: r.x, cz: r.z, r: r.fenceR, w: 1, gateAng: r.gateAng, gateW: 4.6 });
    let H = new Ot();
    q.forEach((W, L) => {
      L % 2 === 0 && H.box(W[0], 2.12, W[1], 0.22, 0.14, 0.22, 0, L % 4 === 0 ? [1, 0.8, 0.3] : [1, 0.55, 0.8], 1, false);
    });
    for (let W of ht) H.box(W[0], W[1], W[2], 0.8, 0.6, 0.8, 0, [1, 0.88, 0.45], 1, false);
    let $ = (W, L, ct = {}) => {
      let X = new zt(W.toGeometry(), L);
      return X.castShadow = ct.cast !== false, X.receiveShadow = true, e.add(X), X;
    };
    $(a, n.wall), $(o, n.plain), $(c, n.roof), $(S, new ae({ vertexColors: true, roughness: 0.6, metalness: 0.5 })), $(l, new ae({ vertexColors: true, roughness: 0.25, metalness: 0.7, color: 10466520 })), $(u, new ae({ vertexColors: true, roughness: 0.22, metalness: 0.45 })), $(f, new ae({ vertexColors: true, roughness: 0.05, metalness: 0.9 }), { cast: false }), $(h, new se({ vertexColors: true }), { cast: false }), $(H, new se({ vertexColors: true }), { cast: false });
    let et = new ae({ vertexColors: true, map: i.treeMat.map, color: 16761570, emissive: 8010330, emissiveIntensity: 0.45, roughness: 0.9 }), pt = new ae({ vertexColors: true, map: i.treeMat.map, color: 13041584, emissive: 1923608, emissiveIntensity: 0.5, roughness: 0.9 }), V = new zt(Er(2, 7, 77, 1.7), et);
    V.position.set(-12.6, 0, 5.2), V.castShadow = true, e.add(V), g.push({ type: "rect", cx: -12.6, cz: 5.2, w: 1.2, d: 1.2, rot: 0 });
    for (let [W, L, ct] of [[2.2, -12.5, 1.1], [12.6, -4, 0.9]]) {
      let X = new zt(Er(1, 4, 12 + W, 1), pt);
      X.position.set(W, 0, L), X.scale.setScalar(ct), X.castShadow = true, e.add(X), g.push({ type: "rect", cx: W, cz: L, w: 0.9, d: 0.9, rot: 0 });
    }
    let C = new Te({ transparent: true, depthWrite: false, side: bn, blending: Ee, uniforms: { uTime: { value: 0 }, uR: { value: r.R }, uA: { value: 1 } }, vertexShader: "varying vec3 vP; varying vec3 vN; varying vec3 vV; void main(){ vP=position; vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }", fragmentShader: `
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
      }` }), gt = new Dn(r.R, 64, 36, 0, Math.PI * 2, 0, Math.PI / 2), xt = new zt(gt, C);
    xt.position.set(r.x, 0, r.z), xt.renderOrder = 10, e.add(xt);
    let At = C.clone();
    At.side = Ze, At.uniforms = { uTime: C.uniforms.uTime, uR: C.uniforms.uR, uA: { value: 0.55 } };
    let rt = new zt(gt, At);
    rt.position.copy(xt.position), rt.renderOrder = 9, e.add(rt);
    let yt = Fn([[0, "rgba(255,230,150,0.0)"], [0.82, "rgba(255,230,150,0.05)"], [0.93, "rgba(255,210,140,0.30)"], [1, "rgba(255,200,120,0)"]]), wt = new zt(new Ke(r.R * 2.1, r.R * 2.1), new se({ map: yt, transparent: true, depthWrite: false, blending: Ee, polygonOffset: true, polygonOffsetFactor: -9, polygonOffsetUnits: -9 }));
    wt.rotation.x = -Math.PI / 2, wt.position.set(r.x, 0.3, r.z), e.add(wt);
    let dt = [], ot = new cn(16771504, 18, 34, 1.8);
    ot.position.set(r.x, 9, r.z), e.add(ot), dt.push(ot);
    let bt = new cn(16756832, 36, 20, 1.8);
    bt.position.set(i.porch[0], 2.4, i.porch[2]), e.add(bt);
    let Et = new cn(16747056, 22, 14, 1.8);
    Et.position.set(...i.homeFire), e.add(Et);
    let O = new cn(16754768, 20, 18, 1.8);
    return O.position.set(-6.5, 3.2, -2), e.add(O), i.update.push((W) => {
      C.uniforms.uTime.value = W, Et.intensity = 22 + Math.sin(W * 11) * 4 + Math.sin(W * 23.7) * 3, ot.intensity = 18 + Math.sin(W * 1.3) * 2;
    }), i.homeBlockers = g, { root: e, blockers: g, dome: xt };
  }
  function ns(i, t, e) {
    let n = new zt(i.toGeometry(), e);
    return n.castShadow = true, n;
  }
  function Wu(i, t) {
    let e = new ae({ vertexColors: true, roughness: 0.8 }), n = new pe();
    t.add(n);
    let s = new pe();
    n.add(s);
    let r = (R) => {
      let w = new Ot();
      w.box(0, -0.45, 0, 0.22, 0.9, 0.24, 0, [0.16, 0.2, 0.3]), w.box(0, -0.93, 0.07, 0.24, 0.14, 0.38, 0, [0.07, 0.06, 0.05]);
      let T = ns(w, 0, e), U = new pe();
      return U.position.set(R, 0.95, 0), U.add(T), s.add(U), U;
    }, a = r(-0.16), o = r(0.16);
    {
      let R = new Ot();
      R.box(0, 1.28, 0, 0.62, 0.72, 0.34, 0, [0.22, 0.3, 0.2]), R.box(0, 0.98, 0, 0.64, 0.12, 0.36, 0, [0.12, 0.12, 0.12]), s.add(ns(R, 0, e));
    }
    let c = (R) => {
      let w = new Ot();
      w.box(0, -0.3, 0, 0.17, 0.62, 0.19, 0, [0.22, 0.3, 0.2]), w.box(0, -0.66, 0, 0.17, 0.14, 0.18, 0, [0.76, 0.58, 0.46]);
      let T = ns(w, 0, e), U = new pe();
      return U.position.set(R, 1.55, 0), U.add(T), s.add(U), U;
    }, l = c(-0.4), u = c(0.4);
    {
      let R = new Ot();
      R.box(0, 1.8, 0, 0.3, 0.34, 0.3, 0, [0.78, 0.6, 0.48]), R.box(0, 1.66, 0.1, 0.32, 0.22, 0.18, 0, [0.23, 0.15, 0.1]), R.box(0, 2, 0, 0.55, 0.05, 0.55, 0, [0.15, 0.12, 0.1]), R.box(0, 2.12, 0, 0.34, 0.22, 0.34, 0, [0.17, 0.14, 0.12]), R.box(0, 2.04, 0, 0.36, 0.06, 0.36, 0, [0.55, 0.12, 0.1]), s.add(ns(R, 0, e));
    }
    {
      let R = new Ot();
      R.box(0, 1.3, -0.3, 0.42, 0.55, 0.22, 0, [0.28, 0.22, 0.14]), s.add(ns(R, 0, e));
    }
    let h = new pe();
    t.add(h);
    {
      let R = new Ot();
      R.box(0, 0.62, 0, 1, 0.45, 1.4, 0, [0.5, 0.25, 0.12]), R.box(0, 0.88, 0, 1.06, 0.06, 1.46, 0, [0.35, 0.18, 0.09]), R.box(0, 0.88, -0.2, 0.7, 0.3, 0.55, 0, [0.2, 0.55, 0.22]), R.box(0, 0.96, 0.35, 0.5, 0.22, 0.4, 0, [0.7, 0.5, 0.2]), h.add(ns(R, 0, e));
    }
    let f = [];
    for (let [R, w] of [[-0.58, -0.5], [0.58, -0.5], [-0.58, 0.5], [0.58, 0.5]]) {
      let T = new zt(new sn(0.26, 0.26, 0.1, 10).rotateZ(Math.PI / 2), new ae({ color: 1776411, roughness: 0.9 }));
      T.position.set(R, 0.26, w), h.add(T), f.push(T);
    }
    let d = new Ot();
    d.box(0, 0.5, 1.2, 0.05, 0.05, 1.2, 0, [0.4, 0.4, 0.4]), h.add(ns(d, 0, e));
    let g = new cn(16773328, 9, 14, 1.8);
    g.position.set(0, 2.4, 0.5), n.add(g);
    let _ = Fn([[0, "rgba(120,255,120,0)"], [0.6, "rgba(120,255,120,0)"], [0.76, "rgba(120,255,120,0.95)"], [0.86, "rgba(120,255,120,0.9)"], [0.92, "rgba(120,255,120,0.15)"], [1, "rgba(120,255,120,0)"]]), m = new zt(new Ke(1, 1).rotateX(-Math.PI / 2), new se({ map: _, transparent: true, depthWrite: false, depthTest: false, blending: Ee }));
    m.renderOrder = 20, t.add(m);
    let p = new zt(new zs(1, 2.4, 4).rotateX(Math.PI), new se({ color: 6750054, transparent: true, opacity: 0.95, depthTest: false }));
    p.renderOrder = 21, t.add(p);
    let x = { x: 4.6, z: 10.5, yaw: Math.PI * 0.75, vx: 0, vz: 0, phase: 0, speed: 0, path: null, target: null, wx: 0, wz: 0, wyaw: 0 };
    x.wx = x.x - 2, x.wz = x.z - 2, x.x = 2.6, x.z = 9, x.yaw = Math.PI * 1, x.wx = 3.2, x.wz = 11.2;
    let v = new Y();
    function E(R, w) {
      return i.walk.ok(R, w) ? (x.x = R, x.z = w, true) : i.walk.ok(R, x.z) ? (x.x = R, true) : i.walk.ok(x.x, w) ? (x.z = w, true) : false;
    }
    return x.goTo = (R, w) => {
      let T = i.walk.path(x.x, x.z, R, w);
      return T && T.length > 1 ? (x.path = T.slice(1), x.target = [R, w], true) : false;
    }, x.spdMul = 1, x.stop = () => {
      x.path = null;
    }, x.update = (R, w, T, U) => {
      let M = 0, S = 0, q = 0;
      if (w && (Math.abs(w.x) > 0.05 || Math.abs(w.y) > 0.05)) {
        let xt = [-Math.sin(T), -Math.cos(T)], At = [Math.cos(T), -Math.sin(T)];
        M = xt[0] * w.y + At[0] * w.x, S = xt[1] * w.y + At[1] * w.x;
        let rt = Math.hypot(M, S);
        q = Math.min(1, rt) * (w.run ? 6.2 : 4) * x.spdMul, M /= rt || 1, S /= rt || 1, x.path = null;
      } else if (x.path && x.path.length) {
        let [xt, At] = x.path[0], rt = xt - x.x, yt = At - x.z, wt = Math.hypot(rt, yt);
        wt < 0.5 ? (x.path.shift(), x.path.length || (x.path = null)) : (M = rt / wt, S = yt / wt, q = 4.6 * x.spdMul);
      }
      if (q > 0) {
        let xt = x.x + M * q * R, At = x.z + S * q * R, rt = E(xt, At), wt = Math.atan2(M, S) - x.yaw;
        wt = Math.atan2(Math.sin(wt), Math.cos(wt)), x.yaw += wt * Math.min(1, R * 12), !rt && x.path && (x.path = null), x.phase += q * R * 2.3, x.speed = q;
      } else x.speed *= 0.8;
      let J = Math.sin(x.phase) * Math.min(1, x.speed / 3) * 0.7;
      a.rotation.x = J, o.rotation.x = -J, l.rotation.x = -J * 0.8, u.rotation.x = J * 0.8, s.position.y = Math.abs(Math.sin(x.phase)) * 0.05 * Math.min(1, x.speed / 3), n.position.set(x.x, 0, x.z), s.rotation.y = x.yaw;
      let ht = Math.sin(x.yaw), H = Math.cos(x.yaw), $ = x.x - ht * 2.3, et = x.z - H * 2.3, pt = Math.hypot($ - x.wx, et - x.wz);
      x.wx += ($ - x.wx) * Math.min(1, R * 7), x.wz += (et - x.wz) * Math.min(1, R * 7);
      let C = Math.atan2(x.x - x.wx, x.z - x.wz) - x.wyaw;
      C = Math.atan2(Math.sin(C), Math.cos(C)), x.wyaw += C * Math.min(1, R * 8), h.position.set(x.wx, 0, x.wz), h.rotation.y = x.wyaw + Math.PI;
      for (let xt of f) xt.rotation.x += x.speed * R * 3;
      let gt = Math.min(Math.max(1, U / 28), 14);
      m.position.set(x.x, 0.35, x.z), m.scale.set(2.6 * gt, 1, 2.6 * gt), p.position.set(x.x, 2.9 + 1.4 * gt * 0.5 + Math.sin(performance.now() / 300) * 0.2 * gt, x.z), p.scale.set(0.5 * gt, 0.5 * gt, 0.5 * gt), p.visible = U > 70 && !x.hideBody, m.visible = !x.hideBody, n.visible = !x.hideBody, h.visible = !x.hideBody;
    }, x.root = n, x;
  }
  var Xu = ["#ff2a8a", "#19e6ff", "#8aff2a", "#ff8a1a", "#b04bff", "#ff3030", "#fff23a"];
  function Xx() {
    let n = document.createElement("canvas");
    n.width = n.height = 2048;
    let s = n.getContext("2d"), r = me(666), a = (h, f, d) => {
      s.save(), s.lineCap = "round", s.lineJoin = "round", s.shadowColor = h, s.shadowBlur = 26, s.strokeStyle = h, s.lineWidth = f, d(), s.stroke(), s.shadowBlur = 0, s.strokeStyle = "rgba(255,255,255,.85)", s.lineWidth = f * 0.32, d(), s.stroke(), s.restore();
    }, o = (h, f, d, g) => {
      for (let _ = 0; _ < 5; _++) {
        let m = h + r() * d, p = 30 + r() * 90;
        s.fillStyle = g, s.shadowColor = g, s.shadowBlur = 14, s.fillRect(m, f, 8, p), s.beginPath(), s.arc(m + 4, f + p, 8, 0, 7), s.fill();
      }
      s.shadowBlur = 0;
    }, c = (h, f, d, g, _, m = 0) => {
      s.save(), s.translate(f, d), s.rotate(m), s.font = `900 ${g}px Impact, "Arial Black", sans-serif`, s.textAlign = "center", s.textBaseline = "middle", s.shadowColor = _, s.shadowBlur = 30, s.fillStyle = _, s.fillText(h, 0, 0), s.shadowBlur = 0, s.lineWidth = 7, s.strokeStyle = "rgba(255,255,255,.9)", s.strokeText(h, 0, 0), s.restore();
    }, l = [(h, f, d) => {
      a(d, 16, () => {
        s.beginPath(), s.ellipse(h, f - 20, 130, 120, 0, 0, 7), s.moveTo(h - 70, f + 90), s.lineTo(h - 70, f + 150), s.lineTo(h + 70, f + 150), s.lineTo(h + 70, f + 90);
        for (let g = -2; g <= 2; g++) s.moveTo(h + g * 30, f + 110), s.lineTo(h + g * 30, f + 150);
      }), s.fillStyle = d, s.shadowColor = d, s.shadowBlur = 20;
      for (let g of [-1, 1]) s.beginPath(), s.ellipse(h + g * 52, f - 10, 30, 38, 0, 0, 7), s.fill();
      s.shadowBlur = 0, o(h - 90, f + 150, 180, d);
    }, (h, f, d) => {
      a(d, 14, () => {
        s.beginPath(), s.moveTo(h - 200, f), s.quadraticCurveTo(h, f - 170, h + 200, f), s.quadraticCurveTo(h, f + 170, h - 200, f), s.moveTo(h + 70, f), s.arc(h, f, 70, 0, 7);
      }), s.fillStyle = d, s.shadowColor = d, s.shadowBlur = 24, s.beginPath(), s.arc(h, f, 30, 0, 7), s.fill(), s.shadowBlur = 0;
      for (let g = 0; g < 9; g++) {
        let _ = g / 9 * 6.28;
        a(d, 6, () => {
          s.beginPath(), s.moveTo(h + Math.cos(_) * 215, f + Math.sin(_) * 120), s.lineTo(h + Math.cos(_) * 250, f + Math.sin(_) * 150);
        });
      }
    }, (h, f, d) => {
      c("RUN", h, f, 190, d, -0.08), o(h - 160, f + 70, 320, d);
    }, (h, f, d) => {
      a(d, 14, () => {
        s.beginPath();
        for (let g = 0; g < 38; g += 0.12) {
          let _ = 6 + g * 6.2;
          s.lineTo(h + Math.cos(g) * _, f + Math.sin(g) * _);
        }
      });
    }, (h, f, d) => {
      a(d, 15, () => {
        s.beginPath(), s.arc(h, f, 190, 0, 7), s.moveTo(h - 130, f + 40), s.quadraticCurveTo(h, f + 190, h + 130, f + 40);
        for (let g = -3; g <= 3; g++) s.moveTo(h + g * 36, f + 45 + Math.abs(g) * 6), s.lineTo(h + g * 36, f + 105 - Math.abs(g) * 12);
      }), s.fillStyle = d, s.shadowColor = d, s.shadowBlur = 22;
      for (let g of [-1, 1]) s.beginPath(), s.moveTo(h + g * 40, f - 70), s.lineTo(h + g * 110, f - 95), s.lineTo(h + g * 100, f - 40), s.fill();
      s.shadowBlur = 0;
    }, (h, f, d) => {
      a(d, 18, () => {
        s.beginPath(), s.moveTo(h + 50, f - 200), s.lineTo(h - 70, f + 10), s.lineTo(h + 10, f + 10), s.lineTo(h - 60, f + 200), s.lineTo(h + 110, f - 40), s.lineTo(h + 20, f - 40), s.closePath();
      });
    }, (h, f, d) => {
      c("FLIEH", h, f, 150, d, 0.06);
    }, (h, f, d) => {
      a(d, 22, () => {
        s.beginPath(), s.moveTo(h - 150, f - 150), s.lineTo(h + 150, f + 150), s.moveTo(h + 150, f - 150), s.lineTo(h - 150, f + 150);
      }), o(h - 120, f + 120, 240, d);
    }, (h, f, d) => {
      for (let g = 0; g < 7; g++) {
        let _ = h + (r() - 0.5) * 330, m = f + (r() - 0.5) * 300, p = 20 + r() * 36;
        a(d, 8, () => {
          s.beginPath(), s.ellipse(_, m, p * 1.6, p, 0, 0, 7);
        }), s.fillStyle = d, s.beginPath(), s.arc(_, m, p * 0.45, 0, 7), s.fill();
      }
    }, (h, f, d) => {
      c("H\xD6LLE", h, f, 140, d, -0.05), o(h - 200, f + 55, 400, d);
    }, (h, f, d) => {
      a(d, 14, () => {
        s.beginPath(), s.moveTo(h - 80, f + 180), s.lineTo(h - 90, f - 10);
        for (let g = 0; g < 5; g++) {
          let _ = h - 90 + g * 45, m = f - 150 + Math.abs(g - 2) * 30;
          s.lineTo(_, m), s.lineTo(_ + 30, m), s.lineTo(_ + 36, f - 10);
        }
        s.lineTo(h + 90, f + 180);
      }), o(h - 80, f + 180, 160, d);
    }, (h, f, d) => {
      a(d, 7, () => {
        s.beginPath();
        for (let g = 0; g < 10; g++) {
          let _ = g / 10 * 6.28;
          s.moveTo(h, f), s.lineTo(h + Math.cos(_) * 230, f + Math.sin(_) * 230);
        }
        for (let g = 50; g < 230; g += 45) for (let _ = 0; _ <= 10; _++) {
          let m = _ / 10 * 6.28, p = h + Math.cos(m) * g * (1 - 0.1 * Math.sin(_ * 2)), x = f + Math.sin(m) * g * (1 - 0.1 * Math.sin(_ * 2));
          _ ? s.lineTo(p, x) : s.moveTo(p, x);
        }
      });
    }, (h, f, d) => {
      c("TOD", h, f, 200, d, 0.04);
    }, (h, f, d) => {
      for (let g = 0; g < 5; g++) a(d, 12, () => {
        s.beginPath();
        let _ = h - 170 + g * 85, m = f + 200;
        s.moveTo(_, m);
        for (let p = 0; p < 8; p++) _ += Math.sin(p * 1.2 + g) * 26, m -= 50, s.lineTo(_, m);
      });
    }, (h, f, d) => {
      a(d, 12, () => {
        s.beginPath(), s.moveTo(h - 190, f + 190);
        for (let g = 0; g < 6; g++) s.lineTo(h - 190 + g * 70 + 20, f - 30 - r() * 140), s.lineTo(h - 190 + g * 70 + 50, f + 60);
        s.lineTo(h + 190, f + 190);
      });
    }, (h, f, d) => {
      a(d, 15, () => {
        s.beginPath(), s.moveTo(h, f + 170), s.bezierCurveTo(h - 230, f + 20, h - 130, f - 160, h, f - 60), s.bezierCurveTo(h + 130, f - 160, h + 230, f + 20, h, f + 170), s.moveTo(h + 10, f - 60), s.lineTo(h - 30, f), s.lineTo(h + 20, f + 40), s.lineTo(h - 20, f + 100);
      });
    }];
    for (let h = 0; h < 16; h++) {
      let f = h % 4 * 512 + 256, d = Math.floor(h / 4) * 512 + 512 / 2;
      s.save(), s.beginPath(), s.rect(h % 4 * 512, Math.floor(h / 4) * 512, 512, 512), s.clip(), l[h](f, d, Xu[(h * 3 + 1) % Xu.length]), s.restore();
    }
    let u = new wn(n);
    return u.colorSpace = Se, u.anisotropy = 8, u.generateMipmaps = true, u.minFilter = ni, u;
  }
  function qu(i) {
    let t = i.graffitiWalls || [];
    if (!t.length) return;
    let e = new Ot(), n = 4, s = 0.015, r = [[1, 1, 1], [1, 0.6, 0.9], [0.6, 1, 1], [0.8, 1, 0.5], [1, 0.8, 0.5], [0.85, 0.65, 1]];
    for (let c of t) {
      let l = me(c.seed * 31 + 7), u = l() < 0.35 ? 2 : 1;
      for (let h = 0; h < u; h++) {
        let f = Math.min(c.L - 0.8, 2.6 + l() * 3.2, c.wallH - 0.9);
        if (f < 1.6) continue;
        let d = u === 2 ? 0.28 + h * 0.44 : 0.3 + l() * 0.4, g = c.ax + (c.bx - c.ax) * d, _ = c.az + (c.bz - c.az) * d, m = (c.bx - c.ax) / c.L, p = (c.bz - c.az) / c.L, x = 0.5 + l() * 0.7, v = 0.06, E = [g - m * f / 2 + c.nx * v, x, _ - p * f / 2 + c.nz * v], R = [g + m * f / 2 + c.nx * v, x, _ + p * f / 2 + c.nz * v], w = [R[0], x + f, R[2]], T = [E[0], x + f, E[2]], U = l() * 16 | 0, M = U % n / n + s, S = 1 - (Math.floor(U / n) + 1) / n + s, q = M + 1 / n - 2 * s, J = S + 1 / n - 2 * s, ht = r[l() * r.length | 0];
        e.quad(E, R, w, T, [M, S], [q, S], [q, J], [M, J], ht, [c.nx, 0, c.nz]);
      }
    }
    let a = new se({ map: Xx(), vertexColors: true, transparent: true, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3, side: bn }), o = new zt(e.toGeometry(), a);
    o.renderOrder = 3, i.root.add(o), i.graffitiMesh = o;
  }
  var Qo = new ve(), ta = new En(), Gs = new Y(), wr = new Y(), Yu = new Xt(), qx = new Y(0, 1, 0), Zu = [[0.96, 0.78, 0.64], [0.86, 0.62, 0.46], [0.62, 0.4, 0.28], [0.98, 0.84, 0.72], [0.45, 0.3, 0.22]], Gn = [[1, 0.35, 0.55], [1, 0.82, 0.2], [0.3, 0.8, 1], [0.55, 1, 0.45], [0.8, 0.5, 1], [1, 0.6, 0.2], [1, 1, 1], [0.2, 0.9, 0.8]], Ju = [[0.15, 0.1, 0.07], [0.7, 0.5, 0.2], [0.85, 0.75, 0.4], [0.5, 0.2, 0.12], [0.08, 0.08, 0.1], [0.9, 0.9, 0.92]];
  function Yx(i, t) {
    let e = new pe(), n = new pe();
    e.add(n);
    let s = t.s || 1;
    n.scale.setScalar(s);
    let r = (u) => {
      let h = new zt(u.toGeometry(), i);
      return h.castShadow = true, h;
    }, a = new Ot();
    a.box(0, 1.28, 0, 0.62, 0.72, 0.34, 0, t.shirt), t.dress ? a.box(0, 0.86, 0, 0.8, 0.5, 0.5, 0, t.shirt) : a.box(0, 0.98, 0, 0.64, 0.12, 0.36, 0, t.pants), a.box(0, 1.8, 0, 0.34, 0.36, 0.34, 0, t.skin), a.box(0, 2, -0.02, 0.38, 0.14, 0.38, 0, t.hair), a.box(0, 1.84, -0.17, 0.38, 0.3, 0.06, 0, t.hair), t.long && (a.box(-0.19, 1.7, 0, 0.05, 0.5, 0.3, 0, t.hair), a.box(0.19, 1.7, 0, 0.05, 0.5, 0.3, 0, t.hair));
    for (let u of [-1, 1]) a.box(u * 0.085, 1.85, 0.175, 0.05, 0.06, 0.02, 0, [0.04, 0.04, 0.05], 1, false), a.box(u * 0.12, 1.75, 0.175, 0.06, 0.04, 0.02, 0, [1, 0.6, 0.65], 1, false);
    a.box(0, 1.71, 0.175, 0.12, 0.03, 0.02, 0, [0.75, 0.08, 0.14], 1, false);
    for (let u of [-1, 1]) a.box(u * 0.065, 1.735, 0.175, 0.03, 0.04, 0.02, 0, [0.75, 0.08, 0.14], 1, false);
    t.hat && (a.box(0, 2.1, 0, 0.5, 0.05, 0.5, 0, t.hat), a.box(0, 2.2, 0, 0.3, 0.2, 0.3, 0, t.hat)), n.add(r(a));
    let o = (u, h, f) => {
      let d = new Ot();
      f(d);
      let g = new pe();
      return g.position.set(u, h, 0), g.add(r(d)), n.add(g), g;
    }, c = t.dress ? [] : [o(-0.16, 0.95, (u) => {
      u.box(0, -0.45, 0, 0.22, 0.9, 0.24, 0, t.pants), u.box(0, -0.93, 0.07, 0.24, 0.14, 0.38, 0, [0.95, 0.95, 0.95]);
    }), o(0.16, 0.95, (u) => {
      u.box(0, -0.45, 0, 0.22, 0.9, 0.24, 0, t.pants), u.box(0, -0.93, 0.07, 0.24, 0.14, 0.38, 0, [0.95, 0.95, 0.95]);
    })];
    if (t.dress) for (let u of [-1, 1]) c.push(o(u * 0.14, 0.62, (h) => {
      h.box(0, -0.3, 0, 0.16, 0.62, 0.18, 0, t.skin), h.box(0, -0.62, 0.05, 0.18, 0.1, 0.3, 0, [0.9, 0.2, 0.4]);
    }));
    let l = [o(-0.4, 1.55, (u) => {
      u.box(0, -0.3, 0, 0.17, 0.62, 0.19, 0, t.shirt), u.box(0, -0.66, 0, 0.17, 0.14, 0.18, 0, t.skin);
    }), o(0.4, 1.55, (u) => {
      u.box(0, -0.3, 0, 0.17, 0.62, 0.19, 0, t.shirt), u.box(0, -0.66, 0, 0.17, 0.14, 0.18, 0, t.skin);
    })];
    return { g: e, fig: n, arms: l, legs: c };
  }
  function Zx() {
    let i = new Ot(), t = [0.85, 0.6, 0.3], e = [0.6, 0.38, 0.18];
    i.box(0, 0.55, 0, 0.45, 0.4, 0.9, 0, t), i.box(0, 0.78, 0.55, 0.34, 0.34, 0.36, 0, t), i.box(0, 0.74, 0.78, 0.18, 0.16, 0.2, 0, e), i.box(0, 0.78, 0.9, 0.06, 0.06, 0.04, 0, [0.05, 0.05, 0.05]);
    for (let n of [-1, 1]) i.box(n * 0.17, 0.96, 0.5, 0.1, 0.2, 0.14, 0, e), i.box(n * 0.11, 0.86, 0.72, 0.05, 0.05, 0.03, 0, [0.05, 0.05, 0.05]);
    return i.box(0, 0.12, 0, 0.1, 0.1, 0.1, 0, t), i;
  }
  function $u(i, t, e) {
    let n = He, s = new pe();
    i.root.add(s);
    let r = me(2024), a = i.update, o = i.homeBlockers || [], c = (O, W, L = 0.6) => {
      for (let ct of o) {
        if (ct.type !== "rect") continue;
        let X = Math.cos(ct.rot), tt = Math.sin(ct.rot), z = O - ct.cx, D = W - ct.cz, G = z * X - D * tt, y = z * tt + D * X;
        if (Math.abs(G) < ct.w / 2 + L && Math.abs(y) < ct.d / 2 + L) return true;
      }
      {
        let ct = O - 4, X = W - 5, tt = Math.cos(0.2), z = Math.sin(0.2), D = ct * tt - X * z, G = ct * z + X * tt;
        if (Math.abs(D) < 4.8 && Math.abs(G) < 7.6) return true;
      }
      return Math.abs(O - 6.2) < 4.2 && Math.abs(W + 9) < 3.6;
    }, l = (O, W, L = n.fenceR - 0.9) => Math.hypot(O - n.x, W - n.z) < L, u = (O, W) => O + r() * (W - O);
    {
      let O = ts("grass").clone();
      O.repeat.set(5, 5), O.wrapS = O.wrapT = Xi, O.needsUpdate = true;
      let W = new zt(new Io(n.fenceR + 0.6, 72).rotateX(-Math.PI / 2), new ae({ map: O, color: 13172640, emissive: 4040754, emissiveIntensity: 0.3, roughness: 1, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }));
      W.position.set(n.x, 0.035, n.z), W.receiveShadow = true, s.add(W);
      let L = Fn([[0, "rgba(255,240,180,0.10)"], [0.7, "rgba(255,230,160,0.06)"], [1, "rgba(255,220,140,0)"]]), ct = new zt(new Ke(n.R * 2.4, n.R * 2.4).rotateX(-Math.PI / 2), new se({ map: L, transparent: true, depthWrite: false, blending: Ee, polygonOffset: true, polygonOffsetFactor: -10, polygonOffsetUnits: -10 }));
      ct.position.set(n.x, 0.4, n.z), s.add(ct);
      let X = new Ot(), tt = n.x + Math.cos(n.gateAng) * n.fenceR, z = n.z + Math.sin(n.gateAng) * n.fenceR, D = i.porch[0], G = i.porch[2] + 1, y = Math.hypot(D - tt, G - z), b = Math.floor(y / 0.95);
      for (let N = 0; N < b; N++) {
        let I = N / b, A = Math.sin(I * 6.28) * 0.9, B = fe(tt, D, I) + A * (-(G - z) / y), it = fe(z, G, I) + A * ((D - tt) / y);
        X.box(B, 0.075, it, 0.8, 0.06, 0.6, r() * 3, [0.98, 0.94, 0.86], 1, false);
      }
      s.add(new zt(X.toGeometry(), new ae({ vertexColors: true, roughness: 0.8, emissive: 5588019, emissiveIntensity: 0.5 })));
    }
    {
      let O = [16740272, 16769354, 16777215, 8046847, 16730714, 13146879, 16752954, 16751312], W = 900, L = new Ot();
      for (let A = 0; A < 6; A++) {
        let B = A / 6 * Math.PI * 2, it = Math.cos(B), Z = Math.sin(B), st = (lt, St, j) => [it * lt - Z * St, j, Z * lt + it * St];
        L.tri(st(0, 0, 0), st(0.12, 0.05, 0.03), st(0.12, -0.05, 0.03), [0, 0], [1, 0], [0, 1], [1, 1, 1], [0, 1, 0]), L.tri(st(0.12, 0.05, 0.03), st(0.2, 0, 0.05), st(0.12, -0.05, 0.03), [0, 0], [1, 0], [0, 1], [1, 1, 1], [0, 1, 0]);
      }
      let ct = L.toGeometry(), X = new Un(0.06, 0);
      X.translate(0, 0.045, 0);
      let tt = new sn(0.012, 0.016, 1, 4);
      tt.translate(0, 0.5, 0);
      let z = new ri(ct, new se({ side: Ue, toneMapped: false }), W), D = new ri(X, new se({ color: 16765498 }), W), G = new ri(tt, new ae({ color: 5029952, emissive: 1726996, roughness: 1 }), W), y = 0, b = 0;
      for (; y < W && b++ < 2e4; ) {
        let A = r() * 6.283, B = Math.sqrt(r()) * (n.fenceR - 0.7), it = n.x + Math.cos(A) * B, Z = n.z + Math.sin(A) * B;
        if (c(it, Z, 0.5)) continue;
        let st = u(0.25, 0.75), lt = u(1.1, 2), St = r() * 6.28, j = O[(Math.floor(it / 2.4 + 100) * 7 + Math.floor(Z / 2.4 + 100) * 3 + (r() < 0.25 ? 1 : 0)) % O.length];
        ta.setFromAxisAngle(qx, St), Gs.set(it, 0.04 + st, Z), wr.set(lt, lt, lt), Qo.compose(Gs, ta, wr), z.setMatrixAt(y, Qo), Yu.set(j), z.setColorAt(y, Yu), Gs.set(it, 0.04 + st, Z), D.setMatrixAt(y, Qo.compose(Gs, ta, wr.set(lt, lt, lt))), Gs.set(it, 0.04, Z), wr.set(1, st, 1), G.setMatrixAt(y, Qo.compose(Gs, ta, wr)), y++;
      }
      for (let A of [z, D, G]) A.count = y, A.instanceMatrix.needsUpdate = true, A.frustumCulled = false, s.add(A);
      z.instanceColor.needsUpdate = true;
      let N = new Ot(), I = 0;
      for (let A = 0; I < 26 && A < 400; A++) {
        let B = r() * 6.283, it = u(6, n.fenceR - 0.6), Z = n.x + Math.cos(B) * it, st = n.z + Math.sin(B) * it;
        if (c(Z, st, 0.8)) continue;
        I++;
        let lt = u(1.3, 2), St = r() * 6.28;
        N.box(Z, lt / 2, st, 0.07, lt, 0.07, 0, [0.25, 0.65, 0.2], 1, false), N.box(Z - 0.18, lt * 0.55, st, 0.34, 0.03, 0.12, 0, [0.3, 0.75, 0.25], 1, false);
        let j = Z + Math.sin(St) * 0.04, vt = st + Math.cos(St) * 0.04;
        for (let Mt = 0; Mt < 12; Mt++) {
          let Nt = Mt / 12 * 6.28;
          N.box(j + Math.cos(Nt) * 0.27 * Math.cos(St), lt + 0.02 + Math.sin(Nt) * 0.27, vt - Math.cos(Nt) * 0.27 * Math.sin(St), 0.16, 0.16, 0.04, St, [1, 0.82, 0.1], 1, false);
        }
        N.box(j, lt + 0.02, vt, 0.28, 0.28, 0.07, St, [0.4, 0.22, 0.08], 1, false);
      }
      s.add(new zt(N.toGeometry(), new se({ vertexColors: true, toneMapped: false })));
    }
    {
      let O = [16726843, 16751147, 16771130, 4513888, 3848447, 4873215, 11553791], W = new pe();
      W.position.set(n.x - 3, -0.4, n.z - 9), W.rotation.y = 0.15, O.forEach((L, ct) => {
        let X = new zt(new Uo(15.2 - ct * 0.56, 0.3, 8, 90, Math.PI), new se({ color: L, transparent: true, opacity: 0.5, blending: Ee, depthWrite: false, toneMapped: false }));
        W.add(X);
      }), s.add(W), i.rainbow = W;
    }
    let h = [];
    {
      let O = new ae({ vertexColors: true, roughness: 1, emissive: 16777215, emissiveIntensity: 0.25, transparent: true, opacity: 0.85 }), L = new Un(1, 1).toNonIndexed().attributes.position;
      for (let ct = 0; ct < 10; ct++) {
        let X = new Ot(), tt = 4 + (r() * 4 | 0);
        for (let y = 0; y < tt; y++) {
          let b = (y - tt / 2) * 1.5 + u(-0.4, 0.4), N = u(-0.3, 0.4), I = u(-0.8, 0.8), A = u(1.1, 2);
          for (let B = 0; B < L.count; B += 3) {
            let it = (St) => [b + L.getX(B + St) * A * 1.2, N + Math.max(L.getY(B + St), -0.35) * A * 0.8, I + L.getZ(B + St) * A], Z = it(0), st = it(1), lt = it(2);
            X.tri(Z, st, lt, [0, 0], [0, 0], [0, 0], [1, 1, 1], [(Z[0] + st[0] + lt[0]) / 3 - b, (Z[1] + st[1] + lt[1]) / 3 - N, (Z[2] + st[2] + lt[2]) / 3 - I]);
          }
        }
        let z = new zt(X.toGeometry(), O), D = ct / 10 * 6.28, G = u(22, 40);
        z.userData = { ang: D, rad: G, y: u(16, 26), sp: u(0.02, 0.05) * (r() < 0.5 ? 1 : -1), sc: u(0.8, 1.3) }, z.scale.setScalar(z.userData.sc), s.add(z), h.push(z);
      }
    }
    {
      let O = new Ot(), W = [], L = 36;
      for (let z = 0; z < L; z++) {
        let D = z / L * 6.283;
        Math.abs(Math.atan2(Math.sin(D - n.gateAng), Math.cos(D - n.gateAng))) * n.fenceR < 3 || W.push([D, n.x + Math.cos(D) * n.fenceR, n.z + Math.sin(D) * n.fenceR]);
      }
      let ct = [[1, 0.3, 0.5], [1, 0.85, 0.2], [0.3, 0.8, 1], [0.5, 1, 0.4], [0.8, 0.45, 1], [1, 0.6, 0.2]], X = 0;
      for (let z = 0; z < W.length - 1; z++) {
        let D = W[z], G = W[z + 1];
        if (Math.hypot(D[1] - G[1], D[2] - G[2]) > 3.4) continue;
        let y = 4;
        for (let b = 0; b < y; b++) {
          let N = (b + 0.5) / y, I = fe(D[1], G[1], N), A = fe(D[2], G[2], N), it = 2.5 - Math.sin(N * Math.PI) * 0.3, Z = (G[1] - D[1]) / 4.6, st = (G[2] - D[2]) / 4.6, lt = ct[X++ % ct.length];
          O.tri([I - Z * 0.5, it, A - st * 0.5], [I + Z * 0.5, it, A + st * 0.5], [I, it - 0.55, A], [0, 0], [0, 0], [0, 0], lt, [0, 0, 1]), O.tri([I + Z * 0.5, it, A + st * 0.5], [I - Z * 0.5, it, A - st * 0.5], [I, it - 0.55, A], [0, 0], [0, 0], [0, 0], lt, [0, 0, -1]);
        }
      }
      let tt = new zt(O.toGeometry(), new se({ vertexColors: true, side: Ue, toneMapped: false }));
      s.add(tt);
    }
    let f = [];
    {
      let O = new Dn(0.4, 14, 12);
      O.scale(1, 1.2, 1), O.translate(0, 2.7, 0);
      let W = new sn(8e-3, 8e-3, 2.3, 3);
      W.translate(0, 1.15, 0);
      let L = new se({ color: 16777215 }), ct = [[6.2, -9], [9.8, -5], [3.6, 12], [-1, 11], [5, 11.4], [-11, -1.8], [-8.5, 9], [11.5, -11], [1.5, -13.8]];
      for (let [X, tt] of ct) for (let z = 0; z < 3; z++) {
        let D = Gn[r() * Gn.length | 0], G = new pe();
        G.position.set(X + u(-0.4, 0.4), 0.1, tt + u(-0.4, 0.4));
        let y = new zt(O, new ae({ color: new Xt(D[0], D[1], D[2]), emissive: new Xt(D[0], D[1], D[2]), emissiveIntensity: 0.45, roughness: 0.25, metalness: 0.1 }));
        G.add(y), G.add(new zt(W, L)), G.userData = { ph: r() * 6.28, amp: u(0.05, 0.12), len: u(0.8, 1.15) }, G.scale.y = G.userData.len, s.add(G), f.push(G);
      }
    }
    let d = new ae({ vertexColors: true, roughness: 0.7, emissive: 2760728, emissiveIntensity: 0.6 }), g = [], _ = i.homeFire || [10.2, 1, -7], m = (O, W = {}) => {
      let L = Yx(d, Object.assign({ skin: Zu[O % Zu.length], shirt: Gn[O * 3 % Gn.length], pants: Gn[(O * 5 + 2) % Gn.length].map((ct) => ct * 0.55), hair: Ju[O * 2 % Ju.length], dress: O % 3 === 1, long: O % 3 === 1, hat: O % 4 === 0 ? [1, 0.5, 0.6] : null }, W));
      return s.add(L.g), L;
    }, p = [];
    for (let O = 0; O < 7; O++) p.push(m(O + 1, { s: 0.98 + O % 3 * 0.04 }));
    let x = m(2, { s: 0.62, dress: false }), v = m(5, { s: 0.58, dress: true, long: true }), E = m(7, { s: 0.55, dress: false }), R = [m(9, { s: 1 }), m(10, { s: 0.95 }), m(11, { s: 0.65 })], w = m(12, { s: 1.02, hat: [1, 0.85, 0.3] }), T = new zt(new Dn(0.22, 14, 10), new ae({ color: 16730730, emissive: 16722506, emissiveIntensity: 0.5, roughness: 0.3 }));
    s.add(T);
    let U = new zt(Zx().toGeometry(), new ae({ vertexColors: true, roughness: 0.8, emissive: 3350544, emissiveIntensity: 0.6 }));
    U.castShadow = true, s.add(U);
    let M = (() => {
      let O = document.createElement("canvas");
      O.width = O.height = 64;
      let W = O.getContext("2d");
      W.fillStyle = "#ff5a8a", W.shadowColor = "#ff9ac0", W.shadowBlur = 8, W.beginPath(), W.moveTo(32, 54), W.bezierCurveTo(2, 32, 10, 6, 32, 20), W.bezierCurveTo(54, 6, 62, 32, 32, 54), W.fill();
      let L = new wn(O);
      return L.colorSpace = Se, L;
    })(), S = Ko(), q = [];
    for (let O = 0; O < 16; O++) {
      let W = new Yi(new yi({ map: M, transparent: true, depthWrite: false, toneMapped: false }));
      W.visible = false, W.userData = { life: 0, vx: 0, vz: 0 }, s.add(W), q.push(W);
    }
    let J = 0, ht = (O, W, L, ct = true) => {
      let X = new Float32Array(O * 3), tt = new Float32Array(O * 3);
      for (let G = 0; G < O; G++) L(G, X, tt);
      let z = new we();
      z.setAttribute("position", new xe(X, 3)), z.setAttribute("color", new xe(tt, 3));
      let D = new Mi(z, new oi({ size: W, map: S, alphaTest: 0.01, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false, blending: ct ? Ee : pi, sizeAttenuation: true, toneMapped: false }));
      return D.frustumCulled = false, s.add(D), D;
    }, H = (O, W, L, ct) => {
      let X = r() * 6.28, tt = Math.sqrt(r()) * (n.fenceR + 1);
      O[W * 3] = n.x + Math.cos(X) * tt, O[W * 3 + 1] = u(L, ct), O[W * 3 + 2] = n.z + Math.sin(X) * tt;
    }, $ = ht(380, 0.34, (O, W, L) => {
      H(W, O, 0.2, 7);
      let ct = [[1, 0.9, 0.5], [1, 0.7, 0.85], [1, 1, 1], [0.6, 1, 1]][O % 4];
      L.set(ct, O * 3);
    }), et = ht(260, 0.22, (O, W, L) => {
      H(W, O, 0.2, 14);
      let ct = Gn[O % Gn.length];
      L.set(ct, O * 3);
    }, false), pt = [];
    {
      let O = new Ke(0.22, 0.17);
      O.translate(0.11, 0, 0);
      for (let W = 0; W < 16; W++) {
        let L = Gn[W % Gn.length], ct = new se({ color: new Xt(L[0], L[1], L[2]), side: Ue, toneMapped: false }), X = new pe(), tt = new zt(O, ct), z = new zt(O, ct);
        z.scale.x = -1, X.add(tt, z), X.userData = { a: tt, b: z, ph: r() * 6.28, cx: n.x + u(-11, 11), cz: n.z + u(-11, 11), rx: u(2, 5), rz: u(2, 5), sp: u(0.4, 0.9), y: u(0.8, 2.4) }, s.add(X), pt.push(X);
      }
    }
    {
      let O = $o("SAFEPLACE", { font: '900 84px "Segoe UI", Arial, sans-serif', color: "#ffffff", stroke: "rgba(255,120,190,.95)", letter: 12 }), W = new Yi(new yi({ map: O, transparent: true, depthWrite: false, toneMapped: false }));
      W.scale.set(7, 0.9, 1);
      let L = n.x + Math.cos(n.gateAng) * n.fenceR, ct = n.z + Math.sin(n.gateAng) * n.fenceR;
      W.position.set(L, 5.4, ct), s.add(W), i.signSprite = W;
    }
    let V = new cn(16773583, 230, 70, 1.6);
    V.position.set(n.x, 20, n.z), s.add(V);
    let C = new cn(16762854, 45, 34, 1.7);
    C.position.set(n.x + 6, 6, n.z + 9), s.add(C);
    let gt = new cn(13235199, 35, 30, 1.7);
    gt.position.set(n.x - 8, 6, n.z - 4), s.add(gt);
    let xt = _[0], At = _[2], rt = 6.2, yt = -9, wt = 0.3, dt = { A: [-9.6, 8], B: [-9.6 + 5.4, 8 + 0.8], C: [-12.6, 5.5] }, ot = (O, W, L, ct, X = 0) => {
      O.g.position.set(W, X, L), O.fig.rotation.y = ct;
    }, bt = [-8, 11], Et = 0;
    return a.push((O, W = 0.016) => {
      p.forEach((I, A) => {
        let B = O * 0.55 + A / p.length * Math.PI * 2, it = 3;
        ot(I, xt + Math.cos(B) * it, At + Math.sin(B) * it, -B - Math.PI, Math.abs(Math.sin(O * 5 + A)) * 0.28);
        let Z = Math.sin(O * 5 + A);
        I.arms[0].rotation.z = -2.2 + Z * 0.35, I.arms[1].rotation.z = 2.2 - Z * 0.35, I.arms[0].rotation.x = 0, I.arms[1].rotation.x = 0, I.legs.forEach((st, lt) => {
          st.rotation.x = Math.sin(O * 5 + A + lt * 3.14) * 0.7;
        });
      });
      let ct = O * 0.5 % 2, X = ct % 1, tt = ct < 1 ? 1 : -1, z = dt.A, D = dt.B;
      ot({ g: x.g, fig: x.fig }, z[0], z[1], Math.atan2(D[0] - z[0], D[1] - z[1]), 0), ot({ g: v.g, fig: v.fig }, D[0], D[1], Math.atan2(z[0] - D[0], z[1] - D[1]), 0);
      let G = tt > 0 ? z : D, y = tt > 0 ? D : z;
      T.position.set(fe(G[0], y[0], X), wt + 0.6 + Math.sin(X * Math.PI) * 1.9, fe(G[1], y[1], X)), T.rotation.x += 0.1;
      let b = tt < 0 ? X : 0, N = tt > 0 ? X : 0;
      x.arms.forEach((I) => I.rotation.x = -Math.PI * (0.3 + 0.6 * (b > 0.7 ? 1 : 0))), v.arms.forEach((I) => I.rotation.x = -Math.PI * (0.3 + 0.6 * (N > 0.7 ? 1 : 0))), x.fig.position.y = Math.abs(Math.sin(O * 6)) * 0.12, v.fig.position.y = Math.abs(Math.sin(O * 6 + 1)) * 0.12;
      {
        let I = O * 0.9;
        ot(E, dt.C[0] + Math.cos(I) * 2.2, dt.C[1] + Math.sin(I) * 2.2, -I + Math.PI, 0), E.fig.position.y = Math.abs(Math.sin(O * 7)) * 0.18, E.arms[0].rotation.z = -2.4, E.arms[1].rotation.z = 2.4, E.legs.forEach((A, B) => A.rotation.x = Math.sin(O * 7 + B * 3.14) * 0.9);
      }
      R.forEach((I, A) => {
        let B = rt - 1.6 + A * 1.7, it = yt + 1.9 + (A === 2 ? 0.4 : 0);
        ot(I, B, it, Math.PI + (A - 1) * 0.3, 0);
        let Z = Math.abs(Math.sin(O * 4 + A * 1.3));
        I.fig.position.y = Z * 0.3, I.arms[0].rotation.z = -2.6 + Z * 0.3, I.arms[1].rotation.z = 2.6 - Z * 0.3;
      });
      {
        let I = n.x + Math.cos(n.gateAng) * (n.fenceR - 2.6) - 2, A = n.z + Math.sin(n.gateAng) * (n.fenceR - 2.6);
        ot(w, I, A, 0.5, 0), w.arms[1].rotation.z = 2.5 + Math.sin(O * 8) * 0.4, w.arms[0].rotation.z = -0.15;
      }
      {
        let I = O * 1.3, A = bt[0] + Math.cos(I) * 3.2, B = bt[1] + Math.sin(I) * 3.2;
        U.position.set(A, Math.abs(Math.sin(O * 9)) * 0.12, B), U.rotation.y = -I + Math.PI, U.rotation.z = Math.sin(O * 9) * 0.05;
      }
      for (let I of f) {
        let A = I.userData;
        I.rotation.z = Math.sin(O * 1.2 + A.ph) * A.amp, I.rotation.x = Math.cos(O * 0.9 + A.ph) * A.amp;
      }
      for (let I of h) {
        let A = I.userData;
        A.ang += A.sp * 0.016, I.position.set(n.x + Math.cos(A.ang) * A.rad, A.y + Math.sin(O * 0.2 + A.ang * 3) * 0.4, n.z + Math.sin(A.ang) * A.rad), I.rotation.y = -A.ang;
      }
      for (let I of pt) {
        let A = I.userData, B = O * A.sp + A.ph;
        I.position.set(A.cx + Math.cos(B) * A.rx, A.y + Math.sin(B * 2.3) * 0.5, A.cz + Math.sin(B * 1.3) * A.rz), I.rotation.y = -B;
        let it = Math.sin(O * 22 + A.ph) * 0.9;
        A.a.rotation.z = it, A.b.rotation.z = -it;
      }
      {
        let I = $.geometry.attributes.position;
        for (let A = 0; A < I.count; A++) {
          let B = I.getY(A) + 0.016 * (0.25 + A % 5 * 0.08);
          I.setX(A, I.getX(A) + Math.sin(O * 0.6 + A) * 6e-3), I.setZ(A, I.getZ(A) + Math.cos(O * 0.5 + A * 1.7) * 6e-3), B > 8 && (B = 0.2), I.setY(A, B);
        }
        I.needsUpdate = true;
      }
      {
        let I = et.geometry.attributes.position;
        for (let A = 0; A < I.count; A++) {
          let B = I.getY(A) - 0.016 * (0.9 + A % 4 * 0.25);
          I.setX(A, I.getX(A) + Math.sin(O * 1.4 + A) * 0.012), B < 0.1 && (B = 14), I.setY(A, B);
        }
        I.needsUpdate = true;
      }
      if (J -= 0.016, J <= 0) {
        J = 0.28;
        let I = q.find((A) => !A.visible);
        if (I) {
          let A = [...p, x, v, E, ...R, w][r() * 14 | 0];
          I.position.set(A.g.position.x, 2.6 * A.fig.scale.x, A.g.position.z), I.userData.life = 2.4, I.userData.vx = u(-0.25, 0.25), I.userData.vz = u(-0.25, 0.25), I.visible = true;
        }
      }
      for (let I of q) {
        if (!I.visible) continue;
        let A = I.userData;
        A.life -= 0.016, I.position.y += 0.016 * 0.9, I.position.x += A.vx * 0.016, I.position.z += A.vz * 0.016;
        let B = 0.45 + 0.25 * Math.sin((2.4 - A.life) * 4);
        I.scale.set(B, B, 1), I.material.opacity = Math.min(1, A.life), A.life <= 0 && (I.visible = false);
      }
      V.intensity = 230 + Math.sin(O * 0.7) * 12, i.rainbow.children.forEach((I, A) => {
        I.material.opacity = 0.42 + 0.1 * Math.sin(O * 1.1 + A * 0.4);
      });
    }), { root: s };
  }
  var Jx = Ko(), Tn = 1.7, Vs = 2, ea = 2.05, Vn = 4200, un = 11, Qc = 1.45, $x = (i, t) => (Math.floor(i / 4) + 5e3) * 10007 + (Math.floor(t / 4) + 5e3);
  function Ku(i, t) {
    let e = new pe();
    i.root.add(e);
    let n = { pts: [], rings: 0, hash: /* @__PURE__ */ new Map(), lastBreak: true, sparkNear: [], tNear: 0, lights: [] }, s = me(4242), r = new Float32Array(Vn * un * 3), a = new Float32Array(Vn * un * 3), o = new Float32Array(Vn * un * 2), c = new Uint32Array((Vn - 1) * (un - 1) * 6);
    for (let dt = 0; dt < Vn - 1; dt++) for (let ot = 0; ot < un - 1; ot++) {
      let bt = dt * un + ot, Et = (dt + 1) * un + ot, O = (dt * (un - 1) + ot) * 6;
      c.set([bt, Et, bt + 1, bt + 1, Et, Et + 1], O);
    }
    let l = new we();
    l.setAttribute("position", new xe(r, 3)), l.setAttribute("normal", new xe(a, 3)), l.setAttribute("uv", new xe(o, 2)), l.setIndex(new xe(c, 1)), l.setDrawRange(0, 0);
    let u = () => {
      let dt = new Float32Array(Vn * 2 * 3), ot = new Float32Array(Vn * 2 * 2), bt = new Uint32Array((Vn - 1) * 6);
      for (let O = 0; O < Vn - 1; O++) {
        let W = O * 2, L = (O + 1) * 2;
        bt.set([W, L, W + 1, W + 1, L, L + 1], O * 6);
      }
      let Et = new we();
      return Et.setAttribute("position", new xe(dt, 3)), Et.setAttribute("uv", new xe(ot, 2)), Et.setIndex(new xe(bt, 1)), Et.setDrawRange(0, 0), Et;
    }, h = u(), f = u(), d = { uTime: { value: 0 } }, g = `
    float hash21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
    float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x),f.y); }
  `, _ = new Te({ transparent: true, depthWrite: false, side: Ue, blending: Ee, uniforms: d, vertexShader: "varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main(){ vUv=uv; vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }", fragmentShader: g + `
      varying vec2 vUv; varying vec3 vN; varying vec3 vV; uniform float uTime;
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
        gl_FragColor=vec4(col,a2);
      }` }), m = new Te({ transparent: true, depthWrite: false, side: Ue, uniforms: d, polygonOffset: true, polygonOffsetFactor: -12, polygonOffsetUnits: -12, vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }", fragmentShader: g + `
      varying vec2 vUv; uniform float uTime;
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
        gl_FragColor=vec4(col,alpha);
      }` }), p = new Te({ transparent: true, depthWrite: false, side: Ue, blending: Ee, uniforms: Object.assign({ uCore: { value: Tn / (Tn + Vs) } }, d), polygonOffset: true, polygonOffsetFactor: -11, polygonOffsetUnits: -11, vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }", fragmentShader: g + `
      varying vec2 vUv; uniform float uTime; uniform float uCore;
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
        gl_FragColor=vec4(col,clamp(a,0.0,1.0));
      }` }), x = new zt(l, _);
    x.frustumCulled = false, x.renderOrder = 13;
    let v = new zt(h, m);
    v.frustumCulled = false, v.renderOrder = 6;
    let E = new zt(f, p);
    E.frustumCulled = false, E.renderOrder = 7, e.add(v, E, x);
    let R = new Y(0, 1, 0), w = new Y(), T = new Y(), U = 0;
    function M(dt, ot, bt, Et, O, W, L) {
      let ct = Math.hypot(Et, O) || 1;
      Et /= ct, O /= ct;
      let X = -O, tt = Et;
      for (let G = 0; G < un; G++) {
        let y = G / (un - 1) * Math.PI, b = Math.cos(y), N = Math.sin(y), I = (dt * un + G) * 3;
        r[I] = ot + X * b * W, r[I + 1] = N * W * 1.12, r[I + 2] = bt + tt * b * W, a[I] = X * b, a[I + 1] = N, a[I + 2] = tt * b;
        let A = (dt * un + G) * 2;
        o[A] = L, o[A + 1] = G / (un - 1);
      }
      let z = W > 0 ? Tn : 0, D = W > 0 ? Tn + Vs : 0;
      for (let [G, y, b] of [[h, z, 0.07], [f, D, 0.09]]) {
        let N = G.attributes.position.array, I = G.attributes.uv.array, A = dt * 6;
        N[A] = ot - X * y, N[A + 1] = b, N[A + 2] = bt - tt * y, N[A + 3] = ot + X * y, N[A + 4] = b, N[A + 5] = bt + tt * y;
        let B = dt * 4;
        I[B] = L, I[B + 1] = -1, I[B + 2] = L, I[B + 3] = 1;
      }
    }
    let S = [];
    function q(dt) {
      l.attributes.position.needsUpdate = true, l.attributes.normal.needsUpdate = true, l.attributes.uv.needsUpdate = true;
      for (let bt of [h, f]) bt.attributes.position.needsUpdate = true, bt.attributes.uv.needsUpdate = true;
      let ot = n.rings;
      l.setDrawRange(0, Math.max(0, ot - 1) * (un - 1) * 6), h.setDrawRange(0, Math.max(0, ot - 1) * 6), f.setDrawRange(0, Math.max(0, ot - 1) * 6);
    }
    function J(dt, ot, bt) {
      if (n.rings >= Vn - 2) return false;
      let Et = S[n.rings - 1], O = Et ? Et[3] + (bt > 0 && Et[2] > 0 ? Math.hypot(dt - Et[0], ot - Et[1]) : 0) : 0;
      return S.push([dt, ot, bt, O]), n.rings++, true;
    }
    function ht(dt) {
      for (let ot = Math.max(0, dt); ot < n.rings; ot++) {
        let bt = S[ot], Et = 0, O = 0;
        if (bt[2] < Tn * 0.99) {
          for (let W = 1; W <= 6 && Math.abs(Et) + Math.abs(O) < 1e-3; W++) {
            let L = S[ot + W];
            L && (Et = L[0] - bt[0], O = L[1] - bt[1]);
          }
          for (let W = 1; W <= 6 && Math.abs(Et) + Math.abs(O) < 1e-3; W++) {
            let L = S[ot - W];
            L && (Et = bt[0] - L[0], O = bt[1] - L[1]);
          }
        } else {
          let W = S[ot - 1] || bt, L = S[ot + 1] || bt;
          Et = L[0] - W[0], O = L[1] - W[1];
        }
        Math.abs(Et) + Math.abs(O) < 1e-4 && (Et = 1, O = 0), M(ot, bt[0], bt[1], Et, O, bt[2], bt[3]);
      }
      q();
    }
    function H() {
      if (n.rings < 2 || n.lastBreak) return;
      let dt = n.pts[n.pts.length - 2], ot = n.pts[n.pts.length - 1];
      if (!ot) return;
      let bt = dt ? ot[0] - dt[0] : 1, Et = dt ? ot[1] - dt[1] : 0, O = Math.hypot(bt, Et) || 1;
      bt /= O, Et /= O, J(ot[0] + bt * 0.35, ot[1] + Et * 0.35, Tn * 0.62), J(ot[0] + bt * 0.6, ot[1] + Et * 0.6, 0), ht(n.rings - 4), n.lastBreak = true;
    }
    let $ = [He.x + Math.cos(He.gateAng) * (He.fenceR + 0.2), He.z + Math.sin(He.gateAng) * (He.fenceR + 0.2)], et = (dt, ot, bt) => {
      let Et = $x(dt, ot), O = n.hash.get(Et);
      O || (O = [], n.hash.set(Et, O)), O.push(bt);
    };
    function pt(dt, ot) {
      let bt = n.pts.length, Et = n.pts[bt - 1];
      n.lastBreak && (J(dt, ot, 0), J(dt, ot, Tn * 0.6), n.lastBreak = false), n.pts.push([dt, ot]), et(dt, ot, bt), J(dt, ot, Tn), S[n.rings - 2] && S[n.rings - 2][2] < Tn && S[n.rings - 2][2] > 0 && (S[n.rings - 2][2] = Tn * 0.85), ht(n.rings - 4);
    }
    n.pointCount = () => n.pts.length, n.near = (dt, ot, bt = ea) => {
      let Et = bt * bt, O = Math.floor(dt / 4), W = Math.floor(ot / 4);
      for (let L = -1; L <= 1; L++) for (let ct = -1; ct <= 1; ct++) {
        let X = n.hash.get((O + L + 5e3) * 10007 + (W + ct + 5e3));
        if (X) for (let tt of X) {
          let z = n.pts[tt], D = z[0] - dt, G = z[1] - ot;
          if (D * D + G * G < Et) return true;
        }
      }
      return false;
    }, n.distTo = (dt, ot) => {
      let bt = 1e9, Et = Math.floor(dt / 4), O = Math.floor(ot / 4);
      for (let W = -1; W <= 1; W++) for (let L = -1; L <= 1; L++) {
        let ct = n.hash.get((Et + W + 5e3) * 10007 + (O + L + 5e3));
        if (ct) for (let X of ct) {
          let tt = n.pts[X], z = Math.hypot(tt[0] - dt, tt[1] - ot);
          z < bt && (bt = z);
        }
      }
      return bt;
    };
    let V = (dt, ot) => Math.hypot(dt - He.x, ot - He.z) < He.fenceR + 1;
    n.homeSafe = V, n.shield = null, n.safeAt = (dt, ot) => V(dt, ot) || !!(n.shield && n.shield.on && Math.hypot(dt - n.shield.x, ot - n.shield.z) < n.shield.r);
    let C = null, gt = null;
    n.track = (dt, ot) => {
      if (V(dt, ot)) {
        n.pts.length && C !== null && H(), C = null;
        return;
      }
      C === null && (n.lastBreak = true, pt($[0], $[1]), C = $[0], gt = $[1]);
      let bt = Math.hypot(dt - C, ot - gt);
      if (bt >= Qc) {
        let Et = Math.floor(bt / Qc);
        for (let O = 1; O <= Et; O++) {
          let W = O * Qc / bt;
          pt(C + (dt - C) * W, gt + (ot - gt) * W);
        }
        C = n.pts[n.pts.length - 1][0], gt = n.pts[n.pts.length - 1][1];
      }
    };
    for (let dt = 0; dt < 5; dt++) {
      let ot = new cn(dt % 2 ? 16767392 : 16758496, 0, 16, 1.8);
      ot.position.set(0, 1.6, 0), e.add(ot), n.lights.push(ot);
    }
    let xt = (dt, ot) => {
      let bt = new we(), Et = new Float32Array(dt * 3), O = new Float32Array(dt * 3);
      bt.setAttribute("position", new xe(Et, 3)), bt.setAttribute("color", new xe(O, 3));
      let W = new Mi(bt, new oi({ size: ot, map: Jx, alphaTest: 0.01, vertexColors: true, transparent: true, depthWrite: false, blending: Ee, sizeAttenuation: true, toneMapped: false }));
      return W.frustumCulled = false, e.add(W), { p: W, pos: Et, col: O, N: dt, life: new Float32Array(dt), max: new Float32Array(dt).fill(1), base: new Float32Array(dt * 3), vel: new Float32Array(dt * 3) };
    }, At = xt(520, 0.34), rt = xt(260, 0.3), yt = [[1, 0.9, 0.5], [1, 0.65, 0.85], [1, 1, 1], [0.6, 0.95, 1], [1, 0.95, 0.7]], wt = [[1, 0.15, 0.2], [1, 0.1, 0.6], [0.1, 0.95, 1], [0.7, 1, 0.1], [1, 0.5, 0.1]];
    return n.update = (dt, ot, bt, Et, O) => {
      d.uTime.value = dt;
      let W = O < 420;
      if (e.visible = true, At.p.visible = rt.p.visible = O < 150, n.tNear -= ot, n.tNear <= 0) {
        n.tNear = 0.4, n.sparkNear.length = 0;
        let X = 90 * 90;
        for (let D = 0; D < n.pts.length; D++) {
          let G = n.pts[D], y = G[0] - bt, b = G[1] - Et;
          y * y + b * b < X && n.sparkNear.push(D);
        }
        let tt = n.sparkNear.map((D) => [Math.hypot(n.pts[D][0] - bt, n.pts[D][1] - Et), D]).sort((D, G) => D[0] - G[0]), z = [];
        for (let [D, G] of tt) {
          if (z.length >= n.lights.length) break;
          let y = n.pts[G];
          z.every((b) => Math.hypot(n.pts[b][0] - y[0], n.pts[b][1] - y[1]) > 12) && z.push(G);
        }
        n.lights.forEach((D, G) => {
          if (G < z.length) {
            let y = n.pts[z[G]];
            D.position.set(y[0], 1.8, y[1]), D.userData.on = 1;
          } else D.userData.on = 0;
        });
      }
      n.lights.forEach((X, tt) => {
        let z = X.userData.on ? 22 + Math.sin(dt * 2 + tt) * 4 : 0;
        X.intensity += (z - X.intensity) * Math.min(1, ot * 4);
      });
      let L = n.sparkNear;
      if (!L.length || O > 150) return;
      let ct = (X, tt) => {
        for (let z = 0; z < X.N; z++) {
          if (X.life[z] -= ot, X.life[z] <= 0) {
            let b = L[s() * L.length | 0], N = n.pts[b], I = n.pts[Math.min(n.pts.length - 1, b + 1)] || N, A = I[0] - N[0], B = I[1] - N[1], it = Math.hypot(A, B) || 1;
            A /= it, B /= it;
            let Z = -B, st = A, lt = tt ? (s() - 0.5) * 2 * (Tn + Vs * 0.7) : (s() < 0.5 ? -1 : 1) * (Tn + Vs * (0.45 + s() * 0.35));
            X.pos[z * 3] = N[0] + Z * lt, X.pos[z * 3 + 1] = 0.15 + s() * 1.6, X.pos[z * 3 + 2] = N[1] + st * lt, X.vel[z * 3] = (s() - 0.5) * (tt ? 0.25 : 2.2), X.vel[z * 3 + 1] = tt ? 0.25 + s() * 0.55 : (s() - 0.3) * 2, X.vel[z * 3 + 2] = (s() - 0.5) * (tt ? 0.25 : 2.2), X.life[z] = tt ? 1.6 + s() * 2.6 : 0.25 + s() * 0.55, X.max[z] = X.life[z], X.base.set((tt ? yt : wt)[s() * 5 | 0], z * 3);
          }
          X.pos[z * 3] += X.vel[z * 3] * ot, X.pos[z * 3 + 1] += X.vel[z * 3 + 1] * ot, X.pos[z * 3 + 2] += X.vel[z * 3 + 2] * ot;
          let D = X.life[z], G = X.max[z], y = Le(Math.min(D / (G * 0.4), (G - D) / (G * 0.15 + 1e-3)), 0, 1);
          X.col[z * 3] = X.base[z * 3] * y, X.col[z * 3 + 1] = X.base[z * 3 + 1] * y, X.col[z * 3 + 2] = X.base[z * 3 + 2] * y;
        }
        X.p.geometry.attributes.position.needsUpdate = true, X.p.geometry.attributes.color.needsUpdate = true;
      };
      ct(At, true), ct(rt, false);
    }, n.root = e, n.gate = $, n.shellMat = _, n;
  }
  var Kx = new Un(1, 1).toNonIndexed(), Wn = Kx.attributes.position, el = [];
  for (let i = 0; i < Wn.count; i += 3) el.push([[Wn.getX(i), Wn.getY(i), Wn.getZ(i)], [Wn.getX(i + 1), Wn.getY(i + 1), Wn.getZ(i + 1)], [Wn.getX(i + 2), Wn.getY(i + 2), Wn.getZ(i + 2)]]);
  var Xe = [0, 0];
  function We(i, t, e, n, s, r, a, o, c = null) {
    for (let l of el) {
      let u = l.map((d) => [t + d[0] * s, e + d[1] * r, n + d[2] * a]), h = [(l[0][0] + l[1][0] + l[2][0]) / 3, (l[0][1] + l[1][1] + l[2][1]) / 3, (l[0][2] + l[1][2] + l[2][2]) / 3], f = o;
      if (c) {
        let d = Le(h[1] * 0.5 + 0.5, 0, 1);
        f = [fe(c[0], o[0], d), fe(c[1], o[1], d), fe(c[2], o[2], d)];
      }
      i.tri(u[0], u[1], u[2], Xe, Xe, Xe, f, h);
    }
  }
  var jx = (i, t) => [i[0] - t[0], i[1] - t[1], i[2] - t[2]], ju = (i, t) => [i[1] * t[2] - i[2] * t[1], i[2] * t[0] - i[0] * t[2], i[0] * t[1] - i[1] * t[0]], tl = (i) => {
    let t = Math.hypot(i[0], i[1], i[2]) || 1;
    return [i[0] / t, i[1] / t, i[2] / t];
  };
  function ze(i, t, e, n, s, r) {
    let a = tl(jx(e, t)), o = ju(a, Math.abs(a[1]) > 0.92 ? [1, 0, 0] : [0, 1, 0]);
    o = tl(o);
    let c = tl(ju(a, o)), l = (h, f, d, g) => [h[0] + (o[0] * d + c[0] * g) * f, h[1] + (o[1] * d + c[1] * g) * f, h[2] + (o[2] * d + c[2] * g) * f], u = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
    for (let h = 0; h < 4; h++) {
      let f = u[h], d = u[(h + 1) % 4], g = [o[0] * (f[0] + d[0]) + c[0] * (f[1] + d[1]), o[1] * (f[0] + d[0]) + c[1] * (f[1] + d[1]), o[2] * (f[0] + d[0]) + c[2] * (f[1] + d[1])];
      i.quad(l(t, n, f[0], f[1]), l(t, n, d[0], d[1]), l(e, s, d[0], d[1]), l(e, s, f[0], f[1]), Xe, Xe, Xe, Xe, r, g);
    }
  }
  var zn = { pink: [1, 0.1, 0.55], cyan: [0.1, 0.95, 1], lime: [0.65, 1, 0.1], orange: [1, 0.5, 0.05], red: [1, 0.08, 0.1], yellow: [1, 0.95, 0.15], purple: [0.7, 0.2, 1] }, Ei = {};
  function Qx() {
    {
      let i = new Ot(), t = new Ot(), e = new Ot(), n = new Ot();
      We(i, 0, 1, -0.8, 0.7, 0.58, 0.95, [0.32, 0.08, 0.42], [0.12, 0.03, 0.2]), We(i, 0, 0.95, 0.6, 0.48, 0.42, 0.55, [0.3, 0.07, 0.4], [0.1, 0.02, 0.18]), ze(i, [0, 0.62, 0.95], [0.18, 0.3, 1.25], 0.08, 0.02, [0.95, 0.95, 0.9]), ze(i, [0, 0.62, 0.95], [-0.18, 0.3, 1.25], 0.08, 0.02, [0.95, 0.95, 0.9]);
      for (let [s, r, a, o] of [[-0.14, 1.12, 1.04, 0.1], [0.14, 1.12, 1.04, 0.1], [-0.3, 1.04, 0.98, 0.07], [0.3, 1.04, 0.98, 0.07], [-0.07, 1.26, 0.96, 0.06], [0.07, 1.26, 0.96, 0.06]]) We(t, s, r, a, o, o, o, zn.red);
      for (let s = 0; s < 6; s++) We(t, 0, 1.54, -1.4 + s * 0.35, 0.09, 0.09, 0.2, zn.pink);
      for (let s of [-1, 1]) for (let r = 0; r < 4; r++) {
        let a = [s * 0.4, 0.95, 0.65 - r * 0.5], o = [s * 1.25, 1.55, a[2] + (r - 1.5) * -0.15], c = [s * 1.8, 0, a[2] + (r - 1.5) * -0.45], l = (r + (s > 0 ? 1 : 0)) % 2 === 0 ? e : n;
        ze(l, a, o, 0.075, 0.06, [0.2, 0.05, 0.3]), ze(l, o, c, 0.06, 0.02, [0.2, 0.05, 0.3]), We(t, c[0], 0.03, c[2], 0.05, 0.05, 0.05, zn.pink);
      }
      Ei.spider = { body: i, glow: t, lA: e, lB: n, scale: 1.25, reach: 2, sense: 28, speed: 4.5, wander: 1.4, dmg: 12, hp: 1 };
    }
    {
      let i = new Ot(), t = new Ot(), e = new Ot(), n = new Ot();
      We(i, 0, 1, 0, 1.05, 0.95, 1.05, [0.35, 0.95, 0.12], [0.08, 0.35, 0.05]), We(i, 0, 0.95, 0.85, 0.62, 0.42, 0.34, [0.25, 0, 0.08]);
      for (let s = 0; s < 12; s++) {
        let r = s / 12 * Math.PI * 2, a = Math.cos(r) * 0.5, o = 0.95 + Math.sin(r) * 0.32;
        ze(i, [a, o, 0.98], [a * 0.85, o * 0.93 + (Math.sin(r) > 0 ? -0.1 : 0.1), 1.2], 0.05, 5e-3, [1, 1, 0.9]);
      }
      for (let [s, r] of [[-0.45, 0.2], [0.45, 0.2], [0, -0.3]]) ze(i, [s, 1.85, r], [s * 1.3, 2.45, r + 0.1], 0.06, 0.05, [0.3, 0.8, 0.1]), We(t, s * 1.3, 2.5, r + 0.15, 0.2, 0.2, 0.2, zn.yellow), We(i, s * 1.3, 2.5, r + 0.32, 0.08, 0.1, 0.05, [0, 0, 0]);
      for (let s = 0; s < 9; s++) We(t, Math.cos(s * 2.4) * 0.8, 1.2 + Math.sin(s * 1.7) * 0.4, Math.sin(s * 2.4) * 0.6 - 0.3, 0.09, 0.09, 0.09, zn.lime);
      for (let s = 0; s < 8; s++) {
        let r = s / 8 * Math.PI * 2, a = s % 2 ? e : n, o = [Math.cos(r) * 0.6, 0.6, Math.sin(r) * 0.6], c = [Math.cos(r) * 1.3, 0.35, Math.sin(r) * 1.3], l = [Math.cos(r + 0.4) * 1.9, 0.1, Math.sin(r + 0.4) * 1.9], u = [Math.cos(r + 0.2) * 2.3, 0.7, Math.sin(r + 0.2) * 2.3];
        ze(a, o, c, 0.17, 0.12, [0.25, 0.78, 0.1]), ze(a, c, l, 0.12, 0.08, [0.25, 0.78, 0.1]), ze(a, l, u, 0.08, 0.02, [0.5, 1, 0.3]);
      }
      Ei.blob = { body: i, glow: t, lA: e, lB: n, scale: 1.1, reach: 2.6, sense: 20, speed: 3.4, wander: 1, dmg: 14, hp: 1 };
    }
    {
      let i = new Ot(), t = new Ot(), e = new Ot(), n = new Ot();
      We(i, 0, 3.4, 0, 0.55, 0.7, 0.4, [0.1, 0.02, 0.16], [0.05, 0.01, 0.08]), ze(i, [0, 3.9, 0.05], [0, 4.5, 0.4], 0.1, 0.07, [0.14, 0.04, 0.2]), We(i, 0, 4.65, 0.55, 0.38, 0.32, 0.5, [0.18, 0.05, 0.26]);
      for (let s = -3; s <= 3; s++) ze(i, [s * 0.09, 4.55, 0.98], [s * 0.09, 4.4, 1], 0.03, 0.03, [1, 1, 0.9]);
      for (let s of [-1, 1]) We(t, s * 0.17, 4.78, 0.95, 0.13, 0.13, 0.07, zn.yellow), ze(i, [s * 0.2, 4.95, 0.7], [s * 0.4, 5.55, 0.5], 0.05, 5e-3, [0.25, 0.05, 0.3]);
      for (let s = 0; s < 4; s++) ze(t, [-0.5, 3.1 + s * 0.25, 0.3], [0.5, 3.1 + s * 0.25, 0.3], 0.025, 0.025, zn.pink);
      for (let s of [-1, 1]) {
        let r = s > 0 ? e : n;
        ze(r, [s * 0.25, 3, 0], [s * 0.55, 1.6, 0.35], 0.08, 0.06, [0.14, 0.04, 0.2]), ze(r, [s * 0.55, 1.6, 0.35], [s * 0.4, 0.05, 0.05], 0.06, 0.03, [0.14, 0.04, 0.2]), We(t, s * 0.4, 0.05, 0.05, 0.08, 0.08, 0.08, zn.red), ze(i, [s * 0.5, 3.7, 0], [s * 1, 2.1, 0.5], 0.06, 0.05, [0.14, 0.04, 0.2]), ze(i, [s * 1, 2.1, 0.5], [s * 0.8, 0.6, 1.2], 0.05, 0.015, [0.14, 0.04, 0.2]);
      }
      Ei.stilt = { body: i, glow: t, lA: e, lB: n, scale: 1, reach: 3, sense: 36, speed: 4.3, wander: 1.5, dmg: 16, hp: 1 };
    }
    {
      let i = new Ot(), t = new Ot(), e = new Ot(), n = new Ot();
      for (let s of el) {
        let r = s.map((c) => [c[0] * 1.1, 1.35 + c[1] * 1.1, c[2] * 1.1]), a = [(s[0][0] + s[1][0] + s[2][0]) / 3, (s[0][1] + s[1][1] + s[2][1]) / 3, (s[0][2] + s[1][2] + s[2][2]) / 3], o = Math.sin(a[0] * 19) * Math.sin(a[1] * 23) * Math.sin(a[2] * 17) > 0.18;
        i.tri(r[0], r[1], r[2], Xe, Xe, Xe, o ? [0.9, 0.25, 0.3] : [0.97, 0.93, 0.9], a);
      }
      We(t, 0, 1.35, 1, 0.62, 0.62, 0.14, zn.cyan), We(i, 0, 1.35, 1.1, 0.26, 0.34, 0.1, [0, 0, 0]);
      for (let s = 0; s < 6; s++) {
        let r = s / 6 * Math.PI * 2 + 0.3, a = s % 2 ? e : n;
        ze(a, [Math.cos(r) * 0.5, 0.5, Math.sin(r) * 0.5], [Math.cos(r) * 1, 0.7, Math.sin(r) * 1], 0.07, 0.06, [0.7, 0.15, 0.25]), ze(a, [Math.cos(r) * 1, 0.7, Math.sin(r) * 1], [Math.cos(r) * 1.25, 0, Math.sin(r) * 1.25], 0.06, 0.02, [0.7, 0.15, 0.25]);
      }
      Ei.eye = { body: i, glow: t, lA: e, lB: n, scale: 1, reach: 2.2, sense: 30, speed: 4, wander: 1.2, dmg: 12, hp: 1, hop: true };
    }
    {
      let i = new Ot(), t = new Ot(), e = new Ot(), n = new Ot();
      We(i, 0, 0, 0, 0.38, 0.32, 0.6, [0.18, 0.04, 0.26]), We(i, 0, 0.12, 0.62, 0.3, 0.27, 0.3, [0.2, 0.05, 0.28]);
      for (let s of [-1, 1]) ze(i, [s * 0.14, 0.34, 0.7], [s * 0.2, 0.7, 0.62], 0.07, 0.01, [0.2, 0.05, 0.3]), We(t, s * 0.13, 0.15, 0.88, 0.08, 0.08, 0.06, zn.red);
      for (let s of [-1, 1]) {
        let r = s > 0 ? e : n, a = [0.55, 0.08, 0.5];
        r.tri([s * 0.2, 0, 0.2], [s * 2.2, 0.5, 0.1], [s * 1.5, -0.2, -0.8], Xe, Xe, Xe, a, [0, 1, 0]), r.tri([s * 0.2, 0, 0.2], [s * 1.5, -0.2, -0.8], [s * 0.2, 0, -0.5], Xe, Xe, Xe, a, [0, 1, 0]), r.tri([s * 0.2, 0, 0.2], [s * 2.2, 0.5, 0.1], [s * 1.9, 0.1, 0.9], Xe, Xe, Xe, [0.75, 0.1, 0.6], [0, 1, 0]), ze(r, [s * 0.2, 0.05, 0.2], [s * 2.2, 0.5, 0.1], 0.05, 0.02, zn.pink.map((o) => o * 0.6));
      }
      Ei.bat = { body: i, glow: t, lA: e, lB: n, scale: 1.1, reach: 1.9, sense: 42, speed: 5.4, wander: 3, dmg: 9, hp: 1, fly: true };
    }
  }
  function Qu(i, t, e, n, s = true) {
    Qx();
    let r = new pe();
    i.root.add(r);
    let a = me(13013), o = (U, M = 1.7) => new ae({ vertexColors: true, color: new Xt(M, M, M), roughness: 0.6, metalness: 0.05, emissive: U, emissiveIntensity: 1, side: Ue }), c = { spider: o(2754616), blob: o(1935888, 2), stilt: o(2754616), eye: o(4198424, 1.5), bat: o(3803184) }, l = new se({ vertexColors: true, toneMapped: false }), u = {};
    for (let U in Ei) {
      let M = Ei[U];
      u[U] = { body: M.body.toGeometry(), glow: M.glow.toGeometry(), lA: M.lA.p.length ? M.lA.toGeometry() : null, lB: M.lB.p.length ? M.lB.toGeometry() : null };
    }
    let h = [], f = i.walk, d = i.bounds, g = He.x, _ = He.z, m = (U, M) => f.ok(U, M) && (!f.reach || f.reach[f.cell(U, M)[1] * f.GW + f.cell(U, M)[0]]);
    function p(U) {
      let M = Ei[U], S = u[U], q = new pe(), J = c[U], ht = new zt(S.body, J);
      ht.castShadow = false, q.add(ht);
      let H = new zt(S.glow, l);
      q.add(H);
      let $ = new pe(), et = new pe();
      S.lA && $.add(new zt(S.lA, J)), S.lB && et.add(new zt(S.lB, J)), q.add($, et);
      let pt = M.scale * (0.88 + a() * 0.3);
      q.scale.setScalar(pt), r.add(q);
      let V = { type: U, T: M, g: q, bm: ht, gm: H, pa: $, pb: et, x: 0, z: 0, y: 0, yaw: a() * 6.28, yawT: 0, phase: a() * 6, cd: 0, wanderT: 0, wx: 0, wz: 0, state: "wander", sc: pt, hurt: 0, spd: 0, seed: a() * 100 };
      return x(V), h.push(V), V;
    }
    var GAPv = 14;
    function x(U) {
      for (let M = 0; M < 600; M++) {
        let S = fe(d.x0 + 8, d.x1 - 8, a()), q = fe(d.z0 + 8, d.z1 - 8, a());
        if (Math.hypot(S - g, q - _) < 55 || !U.T.fly && !m(S, q) || e.near(S, q, 8)) continue;
        let J = true;
        for (let ht of h) if (ht !== U && Math.hypot(ht.x - S, ht.z - q) < GAPv) {
          J = false;
          break;
        }
        if (J) return U.x = S, U.z = q, U.wx = S, U.wz = q, U.y = U.T.fly ? 4.5 : 0, true;
      }
      return U.x = g + 90, U.z = _ + 90, false;
    }
    let v = { spider: 14, blob: 9, stilt: 5, eye: 9, bat: 10 };
    for (let U in v) for (let M = 0; M < v[U]; M++) p(U);
    let E = { list: h, enabled: s, threat: 0, chasers: 0, root: r };
    E.peace = false;
    E.dog = null;
    E.pick = (C, S, H) => {
      const D = E.dog;
      if (D && D.active) {
        const dd2 = Math.hypot(D.x - C.x, D.z - C.z), pd2 = Math.hypot(S.x - C.x, S.z - C.z);
        if (dd2 < C.T.sense && (H || D.bait > 0 || dd2 < pd2)) return D;
      }
      return S;
    };
    E.relocate = (U) => {
      x(U);
      U.state = "wander";
    };
    E.setCount = (tot) => {
      const mix = { spider: 14, blob: 9, stilt: 5, eye: 9, bat: 10 }, sum = 47;
      GAPv = tot > 200 ? 3 : tot > 100 ? 6 : tot > 60 ? 9 : 14;
      const want = {};
      for (const k in mix) want[k] = Math.round(tot * mix[k] / sum);
      for (const k in mix) {
        let have = h.filter((c2) => c2.type === k);
        while (have.length > want[k]) {
          const c2 = have.pop();
          r.remove(c2.g);
          c2.bar && c2.bar.dispose();
          h.splice(h.indexOf(c2), 1);
        }
      }
      const todo = [];
      for (const k in mix) {
        let have = h.filter((c2) => c2.type === k).length;
        for (let j = have; j < want[k]; j++) todo.push(k);
      }
      E._tok = (E._tok || 0) + 1;
      const tok = E._tok;
      const step = () => {
        if (tok !== E._tok) return;
        for (let j = 0; j < 12 && todo.length; j++) p(todo.pop());
        todo.length && setTimeout(step, 30);
      };
      step();
    };
    E.setEnabled = (U) => {
      E.enabled = U, r.visible = U;
    }, r.visible = s, E.scatterNear = (U, M, S) => {
      for (let q of h) Math.hypot(q.x - U, q.z - M) < S && (x(q), q.state = "wander");
    };
    function R(U, M, S) {
      return !(!U.T.fly && !f.ok(M, S) || e.safeAt(M, S));
    }
    let w = [0, 0.55, -0.55, 1.1, -1.1, 1.7, -1.7, 2.4];
    function T(U, M, S, q, J) {
      let ht = M - U.x, H = S - U.z, $ = Math.hypot(ht, H) || 1;
      ht /= $, H /= $;
      let et = U.side || 1;
      for (let pt of w) {
        let V = pt * et, C = Math.cos(V), gt = Math.sin(V), xt = ht * C - H * gt, At = ht * gt + H * C, rt = U.x + xt * q * J, yt = U.z + At * q * J;
        if (R(U, rt, yt)) return U.x = rt, U.z = yt, U.yawT = Math.atan2(xt, At), pt !== 0 && (U.side = Math.sign(V) || et), true;
      }
      return U.side = -(U.side || 1), false;
    }
    return E.update = (U, M, S, q, J, ht, H, $) => {
      if (!E.enabled) return;
      let et = 0, pt = 0, V = Math.max(170, ht * 1.25);
      for (let C of h) {
        let gt = C.T, PT = E.pick(C, S, H), xt = PT.x - C.x, At = PT.z - C.z, rt = Math.hypot(xt, At), PH = PT === S ? H : false, yt = Math.hypot(C.x - q, C.z - J) < V, wt = !PH && !E.peace && rt < gt.sense, dt = C.state === "chase";
        C.state = wt ? "chase" : "wander";
        let ot = 0, Et = false, O = 1;
        if (C.state === "chase") {
          let tt = gt.reach;
          C.cd -= U, C.wind > 0 ? (C.wind -= U, C.yawT = Math.atan2(xt, At), ot = 0, C.wind <= 0 && (C.cd = 1.4, C.lunge = 0.35, !PH && rt < tt + (gt.fly ? 1 : 0.8) && (PT === S ? $ && $(gt.dmg, C) : E.dogHit && E.dogHit(gt.dmg, C)))) : (rt > tt * 0.7 ? (ot = gt.speed * O, T(C, PT.x, PT.z, ot, U) || (ot = 0.3)) : C.yawT = Math.atan2(xt, At), rt < tt + (gt.fly ? 0.6 : 0.4) && C.cd <= 0 && !PH && (C.wind = 0.6)), pt++, et = Math.max(et, 1 - Le((rt - 3) / (gt.sense - 3), 0, 1));
        } else {
          if (C.wind = 0, C.wanderT -= U, C.wanderT <= 0) {
            let z = a() * 6.28, D = 5 + a() * 14;
            C.wx = C.x + Math.cos(z) * D, C.wz = C.z + Math.sin(z) * D, C.wanderT = 3 + a() * 5, C.idle = a() < 0.3;
          }
          let tt = Math.hypot(C.wx - C.x, C.wz - C.z);
          !C.idle && tt > 1 ? (ot = gt.wander * O, T(C, C.wx, C.wz, ot, U)) : C.wanderT -= U, H && rt < 12 ? (C.yawT = Math.atan2(xt, At), C.snarl = 1) : C.snarl = 0;
        }
        C.spd = ot, C.phase += U * (2 + ot * (gt.hop ? 2.6 : 1.9));
        let W = C.yawT - C.yaw;
        if (W = Math.atan2(Math.sin(W), Math.cos(W)), C.yaw += W * Math.min(1, U * (C.state === "chase" ? 9 : 4)), !yt) {
          C.g.visible = false;
          continue;
        }
        C.g.visible = true;
        let L = C.g;
        L.position.x = C.x, L.position.z = C.z, L.rotation.y = C.yaw;
        let ct = C.y, X = Math.sin(C.phase);
        if (gt.fly) {
          let tt = C.state === "chase" ? rt < 10 ? 1.7 : 4 + Math.sin(C.phase * 0.5) * 0.8 : 5 + Math.sin(M * 0.8 + C.seed) * 0.8;
          C.y += (tt - C.y) * Math.min(1, U * 2.2), ct = C.y + Math.sin(M * 5 + C.seed) * 0.12;
          let z = Math.sin(M * 16 + C.seed) * 0.95;
          C.pa.rotation.z = z, C.pb.rotation.z = -z, L.rotation.z = Math.sin(M * 2 + C.seed) * 0.15, L.rotation.x = C.state === "chase" ? 0.3 : 0;
        } else if (C.type === "spider") C.pa.rotation.y = X * 0.24, C.pb.rotation.y = -X * 0.24, ct = Math.abs(X) * 0.06, C.bm.rotation.z = X * 0.03;
        else if (C.type === "blob") {
          C.pa.rotation.y = Math.sin(M * 2.4 + C.seed) * 0.28, C.pb.rotation.y = -Math.sin(M * 2.1 + C.seed) * 0.3;
          let tt = 1 + 0.07 * Math.sin(M * 5 + C.seed);
          C.bm.scale.set(1 / Math.sqrt(tt), tt, 1 / Math.sqrt(tt)), ct = 0;
        } else C.type === "stilt" ? (C.pa.rotation.x = X * 0.55, C.pb.rotation.x = -X * 0.55, L.rotation.z = Math.sin(C.phase * 0.5) * 0.05, ct = Math.abs(X) * 0.08) : C.type === "eye" && (ct = ot > 0.2 ? Math.abs(X) * 0.5 : Math.abs(Math.sin(M * 1.5 + C.seed)) * 0.06, C.pa.rotation.x = X * 0.12, C.pb.rotation.x = -X * 0.12, C.bm.rotation.z = Math.sin(M * 7 + C.seed) * 0.04);
        C.lunge > 0 && (C.lunge -= U, L.position.x += Math.sin(C.yaw) * Math.sin(C.lunge * 9) * 0.5, L.position.z += Math.cos(C.yaw) * Math.sin(C.lunge * 9) * 0.5), C.snarl && (L.position.x += Math.sin(M * 40 + C.seed) * 0.04, L.rotation.x = (L.rotation.x || 0) + Math.sin(M * 25 + C.seed) * 0.02), Et && rt < 60 && (L.position.x += Math.sin(M * 50 + C.seed) * 0.05), L.position.y = ct, C.wind > 0 && (L.position.x += Math.sin(M * 60 + C.seed) * 0.08), L.scale.setScalar(C.sc * (C.wind > 0 ? 1.15 : 1) * (Et ? 0.94 + 0.06 * Math.sin(M * 30 + C.seed) : 1));
      }
      E.threat += (et - E.threat) * Math.min(1, U * 4), E.chasers = pt;
    }, E;
  }
  var cf = "https://kdhkricbouhnznnduget.supabase.co/functions/v1/api", t_ = "milo3d", je = { examCount: 20, examSeconds: 20, examUnlockAll: true, examUnlockPercent: 100, syncMs: 3e4, dailyMinutes: 15, idleSec: 45, minConcSec: 120, grades: [95, 80, 65, 50, 25] }, xn = { 1: { title: "Burg \xB7 Deutsch", subj: [1] }, 2: { title: "Hof \xB7 Englisch", subj: [2] }, 3: { title: "Mathe-Endboss", subj: [0], exam: true }, 4: { title: "Br\xFCcke \xB7 Mischfragen", subj: [0, 1, 2, 3] }, 5: { title: "Kirche \xB7 Sachkunde", subj: [3] }, 6: { title: "Wiese \xB7 Aufkl\xE4rung", subj: [4] }, 7: { title: "West \xB7 Mischfragen", subj: [0, 1, 2, 3] } }, fl = window.MILO_Q || [], il = (i) => document.getElementById(i), Xn = [];
  fl.forEach((i, t) => i.b.forEach((e, n) => e.q.forEach((s, r) => Xn.push({ id: t + "." + n + "." + r, fi: t, bi: n, q: s[0], o: s[1], a: s[2], e: s[3], bn: e.n }))));
  var sl = new Map(Xn.map((i) => [i.id, i])), sa = (i) => Xn.filter((t) => i.includes(t.fi)), rl = (i) => {
    i = i.slice();
    for (let t = i.length - 1; t > 0; t--) {
      let e = Math.floor(Math.random() * (t + 1));
      [i[t], i[e]] = [i[e], i[t]];
    }
    return i;
  }, Ae = null, ye = { p: {}, ex: 0, days: {} }, Ti = [], lf = (i) => "milo3d_v1_" + i;
  function ol(i) {
    try {
      let t = JSON.parse(localStorage.getItem(lf(i)) || "null");
      t ? (ye = t.P || { p: {}, ex: 0 }, Ti = t.queue || []) : (ye = { p: {}, ex: 0, days: {} }, Ti = []);
    } catch {
      ye = { p: {}, ex: 0, days: {} }, Ti = [];
    }
  }
  function Pi() {
    try {
      localStorage.setItem(lf(Ae.name), JSON.stringify({ P: ye, queue: Ti }));
    } catch {
    }
  }
  function hf(i, t) {
    let e = ye.p[i] || (ye.p[i] = { r: 0, w: 0, c: 0, s: 0 });
    t ? (e.r = 1, e.s++) : (e.w = 1, e.c++, e.s = 0), Ti.push({ question_id: i, correct: t });
    let n = sl.get(i);
    if (n && Ae) {
      let s = Li(), r = s.s[n.fi] || (s.s[n.fi] = { n: 0, r: 0, a: {} });
      r.n++, t && r.r++, r.a[n.bn] = (r.a[n.bn] || 0) + 1;
    }
    is = true, Pi(), qs();
  }
  function e_(i) {
    let t = ye.p[i];
    return t ? t.w ? Math.max(1.5, 1 + t.c * 2 - t.s * 0.5) + (t.s === 0 ? 3 : 0) : 1 : 6;
  }
  var na = [];
  function n_(i) {
    let t = i.filter((o) => !na.includes(o.id)), e = t.length ? t : i, n = 0, s = e.map((o) => {
      let c = e_(o.id);
      return n += c, c;
    }), r = Math.random() * n, a = e[e.length - 1];
    for (let o = 0; o < e.length; o++) if (r -= s[o], r <= 0) {
      a = e[o];
      break;
    }
    return na.push(a.id), na.length > 10 && na.shift(), a;
  }
  var al = (i) => i.reduce((t, e) => t + (ye.p[e.id] && ye.p[e.id].r ? 1 : 0), 0);
  function qs() {
    aa();
    let i = il("qstat");
    !i || !Ae || (i.textContent = "\u{1F4DA} " + al(Xn) + " / " + Xn.length + " richtig");
  }
  async function ss(i, t, e) {
    let n = await fetch(cf, { method: "POST", headers: { "content-type": "application/json" }, keepalive: !!e, body: JSON.stringify(Object.assign({ action: i, name: Ae.name, pin: Ae.pin }, t || {})) }), s = {};
    try {
      s = await n.json();
    } catch {
    }
    return { status: n.status, j: s };
  }
  var nl = false, is = false;
  async function Rr(i) {
    if (!(nl || !Ae || Ae.offline)) {
      nl = true;
      try {
        if (Ti.length) {
          let t = Ti.slice(0, 500), e = await ss("progress", { answers: t }, i);
          e.j && e.j.ok && (Ti.splice(0, t.length), Pi());
        }
        if (is) {
          is = false;
          let t = await ss("save", { game: "milo3d_days", state: { days: ye.days } }, i);
          t.j && t.j.ok || (is = true);
        }
      } catch {
      }
      nl = false;
    }
  }
  async function uf() {
    try {
      let i = await ss("loadAll");
      if (!(i.j && i.j.ok)) return;
      for (let e of i.j.progress || []) {
        let n = ye.p[e.question_id] || (ye.p[e.question_id] = { r: 0, w: 0, c: 0, s: 0 });
        e.ever_right && (n.r = 1), e.ever_wrong && (n.w = 1, n.c = Math.max(n.c, 1));
      }
      let t = (i.j.saves || []).find((e) => e.game === "milo3d_days");
      if (t && t.state && t.state.days) for (let e in t.state.days) {
        let n = t.state.days[e], s = ye.days[e];
        if (!s) {
          ye.days[e] = n;
          continue;
        }
        n.sec > s.sec && (s.sec = n.sec, s.s = n.s), s.idle = Math.max(s.idle || 0, n.idle || 0), s.pauses = Math.max(s.pauses || 0, n.pauses || 0), s.ok = s.ok || n.ok, s.cert = Math.max(s.cert || 0, n.cert || 0), !s.reward && n.reward && (s.reward = n.reward);
      }
      Pi(), qs();
    } catch {
    }
  }
  setInterval(() => Rr(false), je.syncMs);
  document.addEventListener("visibilitychange", () => {
    document.hidden && Rr(true);
  });
  addEventListener("pagehide", () => Rr(true));
  function K(i, t, ...e) {
    let n = document.createElement(i);
    for (let s in t || {}) {
      let r = t[s];
      s === "class" ? n.className = r : s.startsWith("on") ? n.addEventListener(s.slice(2), r) : r != null && r !== false && n.setAttribute(s, r === true ? "" : r);
    }
    for (let s of e.flat(3)) s == null || s === false || n.append(s.nodeType ? s : document.createTextNode(s));
    return n;
  }
  var wi = null;
  function ln() {
    return wi || (wi = K("div", { id: "quiz" }), document.body.append(wi)), wi.innerHTML = "", wi.style.display = "flex", window.__quizOpen = true, Cr(false), wi;
  }
  function Ys() {
    wi && (wi.style.display = "none"), window.__quizOpen = false, Xs(), Cr(false);
  }
  function cl(i, t) {
    let e = ln(), n = K("input", { class: "qin", value: Ae && Ae.name || "Milo", autocomplete: "off", maxlength: 20 }), s = K("input", { class: "qin", type: "password", inputmode: "numeric", autocomplete: "off", placeholder: "Passwort (4\u20138 Ziffern)", maxlength: 8 }), r = K("p", { class: "qmsg" }, i || "Beim ersten Mal w\xE4hlst du hier dein Passwort."), a = async () => {
      let c = n.value.trim(), l = s.value.trim();
      if (!c) {
        r.textContent = "Bitte einen Namen eingeben.";
        return;
      }
      Ae = { name: c, pin: l }, r.textContent = "Einen Moment \u2026";
      try {
        let u = await ss("login");
        if (u.status === 200 && u.j.ok) {
          try {
            localStorage.setItem("milo3d_cred", JSON.stringify({ name: c, pin: l }));
          } catch {
          }
          ol(c), await uf(), qs(), Ys(), u.j.firstLogin && Zs("Passwort gespeichert. Merk es dir gut!");
        } else u.status === 400 && u.j.firstLogin ? r.textContent = "W\xE4hle dein Passwort: 4 bis 8 Ziffern." : u.status === 401 ? r.textContent = "Falsches Passwort." : u.status === 404 ? r.textContent = "Dieses Profil gibt es nicht." : r.textContent = "Hat nicht geklappt (" + (u.j.error || u.status) + ").";
      } catch {
        r.textContent = "Keine Verbindung zum Speicher.", o.style.display = "";
      }
    }, o = K("button", { class: "qbtn", style: t ? "" : "display:none", onclick: () => {
      Ae = { name: n.value.trim() || "Milo", pin: "", offline: true }, ol(Ae.name), qs(), Ys(), Zs("Offline: Fortschritt bleibt nur auf diesem Handy.");
    } }, "Ohne Internet spielen");
    e.append(K("div", { class: "qbox" }, K("h2", {}, "Milos Lern-Welt"), K("p", { class: "qsub" }, "Wer spielt?"), n, s, r, K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: a }, "Los geht's"), o))), s.addEventListener("keydown", (c) => {
      c.key === "Enter" && a();
    });
  }
  async function ff() {
    try {
      ml(JSON.parse(localStorage.getItem(dl) || "null"));
    } catch {
    }
    f_();
    let i = null;
    try {
      i = JSON.parse(localStorage.getItem("milo3d_cred") || "null");
    } catch {
    }
    if (!i) {
      Ae = null, cl();
      return;
    }
    Ae = { name: i.name, pin: i.pin }, ol(Ae.name), qs(), ss("login").then(async (t) => {
      t.status === 200 && t.j.ok ? uf() : t.status === 401 && (window.__quizOpen = true, cl("Das Passwort stimmt nicht mehr. Bitte neu anmelden."));
    }).catch(() => {
      Ae.offline = true;
    });
  }
  function i_() {
    try {
      localStorage.removeItem("milo3d_cred");
    } catch {
    }
    Rr(true), Ae = null, cl();
  }
  var Tr = (i = /* @__PURE__ */ new Date()) => i.getFullYear() + "-" + String(i.getMonth() + 1).padStart(2, "0") + "-" + String(i.getDate()).padStart(2, "0");
  function Li() {
    ye.days || (ye.days = {});
    let i = Tr();
    return ye.days[i] || (ye.days[i] = { sec: 0, idle: 0, pauses: 0, s: {}, cert: 0 });
  }
  var df = false, ll = false, Js = Date.now(), tf = Date.now(), hl = false, ra = false, Ai = () => je.dailyMinutes * 60, oa = (i) => Math.floor(i / 60) + ":" + String(Math.floor(i % 60)).padStart(2, "0");
  function Cr(i) {
    df = i, i && (Js = Date.now());
  }
  function aa() {
    if (!Ae) return;
    let i = il("qtime");
    if (!i) {
      let n = il("qstat");
      if (!n) return;
      i = K("div", { id: "qtime", onclick: () => {
        Ae && !window.__quizOpen && Ri();
      } }, K("span", {}), K("div", { class: "qbar" }, K("i")), K("small", {}, "tippen = Lernbuch")), n.parentNode.append(i);
    }
    let t = Li(), e = Math.min(100, t.sec / Ai() * 100);
    i.firstChild.textContent = "\u23F1 Heute gelernt: " + oa(t.sec) + " / " + je.dailyMinutes + ":00" + (t.sec >= Ai() ? " \u2713" : ""), i.children[1].firstChild.style.width = e + "%", i.classList.toggle("done", t.sec >= Ai());
  }
  function s_() {
    hl = true;
    let i = Li();
    i.pauses++;
    let t = K("div", { id: "qidle" }, K("div", { class: "qbox" }, K("h2", {}, "Hey " + (Ae && Ae.name || "Milo") + ", noch da?"), K("p", { class: "qsub" }, "Die Uhr ist angehalten."), K("button", { class: "qbtn go big", onclick: () => {
      Js = Date.now(), hl = false, t.remove();
    } }, "Ich bin da!")));
    document.body.append(t);
  }
  document.addEventListener("pointerdown", () => {
    Js = Date.now();
  }, true);
  document.addEventListener("keydown", () => {
    Js = Date.now();
  }, true);
  setInterval(() => {
    let i = Date.now(), t = Math.min(1, (i - tf) / 1e3);
    if (tf = i, !Ae || !df || ll || document.hidden) return;
    let e = Li();
    if ((i - Js) / 1e3 < je.idleSec) {
      let s = e.sec;
      e.sec += t, s < Ai() && e.sec >= Ai() && (ra = true, Zs("\u{1F389} " + je.dailyMinutes + " Minuten geschafft! Gleich gibt es deine Urkunde."));
    } else hl || s_(), e.idle += t;
    is = true, Math.floor(i / 1e3) % 5 === 0 && Pi(), aa();
  }, 250);
  function r_(i) {
    let t = je.grades;
    for (let e = 0; e < t.length; e++) if (i >= t[e]) return e + 1;
    return 6;
  }
  function o_(i) {
    if (i.sec < je.minConcSec) return { pts: 0, note: null };
    let t = i.pauses * 2 + Math.floor(i.idle / 30), e = [0, 2, 5, 9, 14], n = 6;
    for (let s = 0; s < e.length; s++) if (t <= e[s]) {
      n = s + 1;
      break;
    }
    return { pts: t, note: n };
  }
  function a_(i) {
    let t = Object.keys(i.s).map((n) => {
      let s = i.s[n], r = s.n ? s.r / s.n * 100 : 0, a = Object.entries(s.a).sort((o, c) => c[1] - o[1]).slice(0, 3).map((o) => o[0]);
      return { name: fl[n].f, n: s.n, r: s.r, pct: r, note: r_(r), areas: a };
    }), e = t.length ? t.reduce((n, s) => n + s.note, 0) / t.length : null;
    return { rows: t, avg: e, conc: o_(i) };
  }
  var c_ = (i) => (Math.round(i * 10) / 10).toString().replace(".", ",");
  function ef(i, t, e, n, s, r) {
    let a = t.split(" "), o = "";
    for (let c of a) {
      let l = o ? o + " " + c : c;
      i.measureText(l).width > s && o ? (i.fillText(o, e, n), o = c, n += r) : o = l;
    }
    return i.fillText(o, e, n), n + r;
  }
  function l_(i) {
    let t = a_(i), e = 1240, n = 1754, s = document.createElement("canvas");
    s.width = e, s.height = n;
    let r = s.getContext("2d"), a = r.createLinearGradient(0, 0, e, n);
    a.addColorStop(0, "#f6e7c1"), a.addColorStop(0.5, "#efd9a3"), a.addColorStop(1, "#e3c78a"), r.fillStyle = a, r.fillRect(0, 0, e, n), r.strokeStyle = "#7a1f1f", r.lineWidth = 14, r.strokeRect(50, 50, e - 100, n - 100), r.strokeStyle = "#b8892b", r.lineWidth = 5, r.strokeRect(78, 78, e - 156, n - 156), r.textAlign = "center", r.fillStyle = "#7a1f1f", r.font = "bold 96px Georgia,serif", r.fillText("\u2694 URKUNDE \u2694", e / 2, 220), r.fillStyle = "#3a2a10", r.font = "italic 40px Georgia,serif", r.fillText("f\xFCr tapferes Lernen", e / 2, 285);
    let o = /* @__PURE__ */ new Date(), c = o.toLocaleDateString("de-DE") + " um " + o.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) + " Uhr";
    r.font = "bold 64px Georgia,serif", r.fillText("Ritter " + (Ae && Ae.name || "Milo"), e / 2, 420), r.font = "38px Georgia,serif";
    let l = t.rows.reduce((h, f) => h + f.n, 0), u = ef(r, "hat am " + c + " " + oa(i.sec) + " Minuten lang konzentriert gelernt und " + l + " Aufgaben gel\xF6st.", e / 2, 500, e - 300, 52);
    u += 20, r.textAlign = "left", r.font = "bold 34px Georgia,serif", r.fillStyle = "#7a1f1f", r.fillText("Fach", 130, u), r.fillText("Richtig", 700, u), r.fillText("Note", 940, u), u += 14, r.fillRect(130, u, e - 260, 3), u += 52, r.fillStyle = "#3a2a10";
    for (let h of t.rows) r.font = "bold 38px Georgia,serif", r.fillText(h.name.replace(" bis Klasse 6", ""), 130, u), r.fillText(h.r + " von " + h.n, 700, u), r.fillText(String(h.note), 960, u), r.font = "italic 28px Georgia,serif", u += 40, u = ef(r, "Themen: " + h.areas.join(", "), 130, u, e - 260, 36) + 20;
    return u += 10, r.fillStyle = "#7a1f1f", r.fillRect(130, u, e - 260, 3), u += 70, r.fillStyle = "#3a2a10", r.font = "bold 44px Georgia,serif", t.avg != null && (r.fillText("Gesamtnote: " + c_(t.avg), 130, u), u += 68), r.fillText("Konzentration: " + (t.conc.note ? t.conc.note : "noch nicht gemessen"), 130, u), r.textAlign = "center", r.fillStyle = "#7a1f1f", r.font = "bold 72px Georgia,serif", r.fillText("Geil gemacht Milo \u{1F4AA}\u{1F44D}", e / 2, n - 170), s;
  }
  function h_(i) {
    let t = atob(i.toDataURL("image/jpeg", 0.92).split(",")[1]), e = new Uint8Array(t.length);
    for (let d = 0; d < t.length; d++) e[d] = t.charCodeAt(d);
    let n = new TextEncoder(), s = [], r = 0, a = [], o = (d) => {
      typeof d == "string" && (d = n.encode(d)), s.push(d), r += d.length;
    };
    o(`%PDF-1.4
`);
    let c = (d, g) => {
      a[d] = r, o(d + ` 0 obj
`), o(g), o(`
endobj
`);
    };
    c(1, "<< /Type /Catalog /Pages 2 0 R >>"), c(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>"), c(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>"), a[4] = r, o(`4 0 obj
<< /Type /XObject /Subtype /Image /Width ` + i.width + " /Height " + i.height + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + e.length + ` >>
stream
`), o(e), o(`
endstream
endobj
`);
    let l = "q 595 0 0 842 0 0 cm /Im0 Do Q";
    c(5, "<< /Length " + l.length + ` >>
stream
` + l + `
endstream`);
    let u = r;
    o(`xref
0 6
0000000000 65535 f 
`);
    for (let d = 1; d <= 5; d++) o(String(a[d]).padStart(10, "0") + ` 00000 n 
`);
    o(`trailer
<< /Size 6 /Root 1 0 R >>
startxref
` + u + `
%%EOF`);
    let h = new Uint8Array(r), f = 0;
    for (let d of s) h.set(d, f), f += d.length;
    return new Blob([h], { type: "application/pdf" });
  }
  function Pr(i) {
    ra = false, Cr(false);
    let t = Li();
    t.cert = 1, Pi();
    let e = l_(t);
    e.style.cssText = "width:100%;max-width:420px;border-radius:8px;box-shadow:0 4px 18px #000a", ln().append(K("div", { class: "qbox" }, K("h2", {}, "\u{1F3C5} Deine Urkunde"), e, K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: () => {
      let s = URL.createObjectURL(h_(e)), r = K("a", { href: s, download: "Urkunde-" + Tr() + ".pdf" });
      document.body.append(r), r.click(), r.remove(), setTimeout(() => URL.revokeObjectURL(s), 1e4);
    } }, "\u2B07 PDF herunterladen"), !t.ok && K("button", { class: "qbtn boss", onclick: () => gl(t, () => Pr(i)) }, "\u{1F468}\u200D\u{1F469} Eltern best\xE4tigen"), K("button", { class: "qbtn", onclick: i }, "Weiter lernen"), K("button", { class: "qbtn", onclick: Ys }, "Schlie\xDFen"))));
  }
  var Ws, nf;
  function Zs(i) {
    Ws || (Ws = K("div", { id: "qtoast" }), document.body.append(Ws)), Ws.textContent = i, Ws.classList.add("show"), clearTimeout(nf), nf = setTimeout(() => Ws.classList.remove("show"), 3200);
  }
  var ia = null;
  function Xs() {
    ia && (clearInterval(ia), ia = null);
  }
  function pf(i) {
    let t = xn[i];
    t && Ar(t);
  }
  function Ar(i) {
    Xs();
    let t = ln(), e = sa(i.subj), n = al(e), s = sa([0]), r = al(s), a = je.examUnlockAll ? s.length : Math.ceil(s.length * je.examUnlockPercent / 100), o = K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, i.title), K("button", { class: "qx", onclick: Ys }, "\u2715")), K("p", { class: "qsub" }, n + " von " + e.length + " Fragen schon richtig"), Ne.school && K("p", { class: "qmsg" }, "\u{1F4CC} In der Schule dran: " + Ne.school), K("div", { class: "qbar" }, K("i", { style: "width:" + (e.length ? n / e.length * 100 : 0) + "%" })), K("button", { class: "qbtn go big", onclick: () => u_(i) }, "\u{1F4D6} Lernen"));
    if (i.exam) {
      let c = r >= a;
      o.append(K("button", { class: "qbtn big" + (c ? " boss" : ""), disabled: !c, onclick: () => gf(i) }, "\u2694 Abschlusspr\xFCfung"), K("p", { class: "qmsg" }, c ? "20 Fragen \xB7 je " + je.examSeconds + " Sekunden \xB7 Bereits falsch beantwortete kommen zuerst." : "Noch " + (a - r) + " Mathe-Fragen m\xFCssen einmal richtig sein, dann geht der Endboss auf.")), ye.ex && o.append(K("p", { class: "qmsg" }, "Beste Pr\xFCfung: " + ye.ex + " / " + je.examCount));
    }
    Li().sec >= Ai() && o.append(K("button", { class: "qbtn", onclick: () => Pr(() => Ar(i)) }, "\u{1F3C5} Urkunde von heute")), t.append(o);
  }
  function mf(i) {
    return rl([0, 1, 2, 3].slice(0, i.o.length));
  }
  function u_(i) {
    Xs();
    let t = sa(i.subj), e = () => {
      if (ra) return Pr(() => e());
      let n = n_(t), s = ln();
      Cr(true);
      let r = mf(n), a = false, o = K("div", { class: "qfb" }), c = K("button", { class: "qbtn go", style: "display:none", onclick: e }, "Weiter"), l = r.map((u) => K("button", { class: "qopt", onclick: () => {
        if (a) return;
        a = true;
        let h = u === n.a;
        hf(n.id, h), l.forEach((f, d) => {
          f.disabled = true, r[d] === n.a ? f.classList.add("right") : r[d] === u && f.classList.add("wrong");
        }), o.textContent = (h ? "\u2713 Richtig! " : "\u2717 Leider falsch. ") + (n.e || ""), o.className = "qfb " + (h ? "ok" : "bad"), c.style.display = "";
      } }, n.o[u]));
      s.append(K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, i.title), K("button", { class: "qx", onclick: () => Ar(i) }, "\u2715")), K("p", { class: "qtag" }, fl[n.fi].f + " \xB7 " + n.bn), K("p", { class: "qq" }, n.q), K("div", { class: "qopts" }, l), o, c));
    };
    e();
  }
  function gf(i) {
    Xs();
    let t = sa([0]), e = (l) => ye.p[l.id] && ye.p[l.id].w, n = rl(t.filter(e)).concat(rl(t.filter((l) => !e(l)))).slice(0, je.examCount), s = 0, r = 0, a = () => {
      if (s >= n.length) return o();
      let l = n[s], u = ln(), h = mf(l);
      Cr(true), ll = false;
      let f = false, d = false, g = je.examSeconds, _ = K("i", { style: "width:100%" }), m = K("span", { class: "qtime" }, String(g)), p = K("div", { class: "qfb" }), x = K("button", { class: "qbtn go", style: "display:none", onclick: () => {
        s++, a();
      } }, s + 1 >= n.length ? "Ergebnis" : "Weiter"), v = K("div", { class: "qquiz" }), E = (M) => {
        if (f) return;
        f = true, Xs();
        let S = M === l.a;
        S && r++, hf(l.id, S), R.forEach((q, J) => {
          q.disabled = true, h[J] === l.a ? q.classList.add("right") : h[J] === M && q.classList.add("wrong");
        }), p.textContent = (M === -1 ? "\u23F0 Zeit abgelaufen. " : S ? "\u2713 Richtig! " : "\u2717 Falsch. ") + (l.e || ""), p.className = "qfb " + (S ? "ok" : "bad"), x.style.display = "", U.style.display = "none";
      }, R = h.map((M) => K("button", { class: "qopt", onclick: () => E(M) }, l.o[M])), w = K("div", { class: "qpause", style: "display:none" }, K("p", {}, "\u23F8 Pause"), K("button", { class: "qbtn go big", onclick: () => T(false) }, "Weiter")), T = (M) => {
        d = M, ll = M, M || (Js = Date.now()), v.style.display = M ? "none" : "", w.style.display = M ? "" : "none";
      }, U = K("button", { class: "qbtn", onclick: () => T(true) }, "\u23F8 Pause");
      v.append(K("p", { class: "qtag" }, "Frage " + (s + 1) + " von " + n.length + " \xB7 Richtig: " + r), K("p", { class: "qq" }, l.q), K("div", { class: "qopts" }, R)), u.append(K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, "\u2694 " + i.title), K("button", { class: "qx", onclick: () => {
        confirm("Pr\xFCfung abbrechen?") && Ar(i);
      } }, "\u2715")), K("div", { class: "qbar t" }, _, m), v, w, p, K("div", { class: "qrow" }, U, x))), ia = setInterval(() => {
        d || f || (g -= 0.1, _.style.width = Math.max(0, g / je.examSeconds * 100) + "%", m.textContent = String(Math.ceil(Math.max(0, g))), g <= 0 && E(-1));
      }, 100);
    }, o = () => {
      if (Xs(), r > ye.ex && (ye.ex = r, Pi()), ss("highscore", { game: t_, score: r }).catch(() => {
      }), ra) return Pr(() => c());
      c();
    }, c = () => {
      let l = ln(), u = r / n.length;
      l.append(K("div", { class: "qbox" }, K("h2", {}, "Ergebnis"), K("p", { class: "qbig" }, r + " / " + n.length), K("p", { class: "qsub" }, u >= 0.9 ? "\u{1F3C6} Endboss besiegt! Super!" : u >= 0.6 ? "\u{1F44D} Gut gemacht! \xDCbe die falschen Fragen im Lernmodus." : "\u{1F4AA} Weiter \xFCben, du schaffst das!"), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: () => gf(i) }, "Nochmal"), K("button", { class: "qbtn", onclick: () => Ar(i) }, "Zur\xFCck"))));
    };
    a();
  }
  var dl = "milo3d_cfg", sf = JSON.parse(JSON.stringify(xn)), xf = ["Filmabend aussuchen", "Eis essen gehen", "10 Minuten l\xE4nger aufbleiben", "Pizza-Chef sein", "Wettrennen mit den Hunden", "Lieblingsessen w\xFCnschen", "Ausflug aussuchen", "Spieleabend mit Mama und Papa"], pl = ["Mathe", "Deutsch", "Englisch", "Sachkunde", "Aufkl\xE4rung"], Ne = { st: {}, extra: [], qs: [], rewards: [], monthGoal: 20, grades: null, school: "" }, ul = null;
  function _f(i) {
    ul = i;
  }
  function ml(i) {
    Ne = Object.assign({ st: {}, extra: [], qs: [], rewards: [], monthGoal: 20, grades: null, school: "" }, i || {}), Ne.grades && Ne.grades.length === 5 && (je.grades = Ne.grades.map(Number));
    for (let t of Object.keys(xn)) delete xn[t];
    for (let t in sf) xn[t] = Object.assign({}, sf[t]);
    for (let t in Ne.st) {
      let e = Ne.st[t], n = xn[t] || (xn[t] = { title: "", subj: [] });
      e.name && (n.title = e.name), e.subj && (n.subj = e.subj), "exam" in e && (n.exam = !!e.exam), n.subj.length || delete xn[t];
    }
    for (let t of Ne.extra) t.subj && t.subj.length && (xn[t.id] = { title: t.name, subj: t.subj, exam: !!t.exam });
    for (let t = Xn.length - 1; t >= 0; t--) Xn[t].custom && (sl.delete(Xn[t].id), Xn.splice(t, 1));
    for (let t of Ne.qs) {
      let e = { id: t.id, fi: t.fi, bi: -1, q: t.q, o: t.o, a: t.a, e: t.e, bn: t.bn || "Eigene Aufgaben", custom: true };
      Xn.push(e), sl.set(e.id, e);
    }
    ul && ul(Ne), qs();
  }
  async function vf(i) {
    let t = await fetch(cf, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(i) }), e = {};
    try {
      e = await t.json();
    } catch {
    }
    return { status: t.status, j: e };
  }
  async function f_() {
    try {
      let i = await vf({ action: "getConfig" });
      i.j && i.j.ok && i.j.config && (localStorage.setItem(dl, JSON.stringify(i.j.config)), ml(i.j.config));
    } catch {
    }
  }
  async function ca(i) {
    ml(i);
    try {
      localStorage.setItem(dl, JSON.stringify(i));
    } catch {
    }
    try {
      let t = await ss("setConfig", { config: i });
      Zs(t.j && t.j.ok ? "\u2713 Gespeichert" : "Nicht gespeichert (" + (t.j && t.j.error || t.status) + ")");
    } catch {
      Zs("Keine Verbindung \u2013 nur auf diesem Handy gespeichert");
    }
  }
  var la = (i) => JSON.parse(JSON.stringify(i)), yf = () => Ae && Ae.name === "Admin";
  function Mf(i) {
    if (yf()) return i();
    let t = ln(), e = K("input", { class: "qin", type: "password", inputmode: "numeric", placeholder: "Eltern-Passwort", maxlength: 8 }), n = K("p", { class: "qmsg" }, "Nur f\xFCr Mama und Papa."), s = async () => {
      n.textContent = "Pr\xFCfe \u2026";
      try {
        let r = await vf({ action: "parentCheck", pin: e.value.trim() });
        r.j.ok ? i() : r.status === 404 ? n.textContent = "Noch kein Eltern-Passwort. Mit dem Namen \u201EAdmin\u201C anmelden und eins w\xE4hlen." : n.textContent = "Falsches Passwort.";
      } catch {
        n.textContent = "Keine Verbindung.";
      }
    };
    t.append(K("div", { class: "qbox" }, K("h2", {}, "\u{1F468}\u200D\u{1F469} Eltern-Bereich"), e, n, K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: s }, "OK"), K("button", { class: "qbtn", onclick: Ri }, "Zur\xFCck")))), e.addEventListener("keydown", (r) => {
      r.key === "Enter" && s();
    });
  }
  function gl(i, t) {
    Mf(() => {
      i.ok = 1;
      let e = Ne.rewards.length ? Ne.rewards : xf;
      i.reward = e[Math.floor(Math.random() * e.length)], is = true, Pi(), Rr(false), aa(), ln().append(K("div", { class: "qbox fw" }, K("div", { class: "qfire" }, "\u{1F386}\u{1F387}\u2728\u{1F386}\u{1F387}"), K("h2", {}, "Tag best\xE4tigt! \u2694"), K("p", { class: "qsub" }, "Deine Belohnung:"), K("p", { class: "qbig" }, i.reward), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: Ys }, "NOCH EINE RUNDE"), K("button", { class: "qbtn", onclick: t || Ri }, "\u{1F3C5} Urkunde / Lernbuch"))));
    });
  }
  var rf = [[0, "Knappe"], [3, "Abenteurer"], [7, "Ritter"], [15, "Drachenj\xE4ger"], [30, "Held"], [60, "Legende"]], d_ = () => Object.values(ye.days || {}).filter((i) => i.ok).length;
  function p_() {
    let i = d_(), t = rf[0][1];
    for (let [e, n] of rf) i >= e && (t = n);
    return t;
  }
  function m_() {
    let i = /* @__PURE__ */ new Date();
    (ye.days[Tr(i)] || {}).ok || i.setDate(i.getDate() - 1);
    let t = 0;
    for (; (ye.days[Tr(i)] || {}).ok; ) t++, i.setDate(i.getDate() - 1);
    return t;
  }
  function Ri() {
    let i = ln(), t = Li(), e = /* @__PURE__ */ new Date(), n = e.getFullYear(), s = e.getMonth(), r = new Date(n, s + 1, 0).getDate(), a = K("div", { class: "qgrid" }), o = 0;
    for (let h = 1; h <= r; h++) {
      let f = Tr(new Date(n, s, h)), d = (ye.days[f] || {}).ok;
      d && o++, a.append(K("div", { class: "qcell" + (d ? " ok" : "") + (h === e.getDate() ? " now" : "") }, d ? "\u2694" : h === e.getDate() ? "\u{1F6E1}" : String(h)));
    }
    let c = Ne.monthGoal || 20, l = t.sec >= Ai(), u = K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F4D6} Mein Lernbuch"), K("button", { class: "qx", onclick: Ys }, "\u2715")), K("p", { class: "qsub" }, "\u{1F3F0} Rang: " + p_() + " \xB7 \u{1F525} Serie: " + m_() + " Tag(e)"), K("p", { class: "qmsg" }, "Heute gelernt: " + oa(t.sec) + " von " + je.dailyMinutes + ":00 Minuten" + (t.ok ? " \xB7 von Eltern best\xE4tigt \u2713" : "")), K("p", { class: "qtag" }, e.toLocaleDateString("de-DE", { month: "long", year: "numeric" }) + ": " + o + " von " + c + " Tagen"), a, K("p", { class: "qmsg" }, o >= c ? "\u{1F4B0} Monats-Schatz geschafft!" : "Noch " + (c - o) + " Tage bis zum Monats-Schatz \u{1F4B0}"), Ne.school && K("p", { class: "qmsg" }, "\u{1F4CC} In der Schule dran: " + Ne.school));
    l && u.append(K("button", { class: "qbtn go", onclick: () => Pr(Ri) }, "\u{1F3C5} Urkunde von heute")), l && !t.ok && u.append(K("button", { class: "qbtn boss", onclick: () => gl(t, Ri) }, "\u{1F468}\u200D\u{1F469} Eltern best\xE4tigen")), u.append(K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: () => Mf(bf) }, "\u{1F468}\u200D\u{1F469} Eltern-Bereich"), yf() && K("button", { class: "qbtn go", onclick: Ci }, "\u2699 Admin"), K("button", { class: "qbtn", onclick: i_ }, "Abmelden"))), i.append(u);
  }
  function bf() {
    let i = ln(), t = Li();
    i.append(K("div", { class: "qbox" }, K("h2", {}, "\u{1F468}\u200D\u{1F469} Eltern-Bereich"), K("p", { class: "qmsg" }, "Heute: " + oa(t.sec) + " gelernt" + (t.ok ? ", best\xE4tigt \u2713" : "")), K("button", { class: "qbtn", onclick: () => {
      let e = parseFloat((prompt("Wie viele Minuten nachtragen?", "5") || "").replace(",", "."));
      e > 0 && e <= 30 && (t.sec += e * 60, is = true, Pi(), aa(), Zs("+" + e + " Minuten"), bf());
    } }, "\u23F1 Zeit nachtragen"), K("button", { class: "qbtn", disabled: t.sec < Ai() || t.ok, onclick: () => gl(t, Ri) }, "\u2713 Heutigen Tag best\xE4tigen"), K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: Ri }, "Zur\xFCck"))));
  }
  function Ci() {
    ln().append(K("div", { class: "qbox" }, K("div", { class: "qhead" }, K("h2", {}, "\u2699 Admin"), K("button", { class: "qx", onclick: Ri }, "\u2715")), K("p", { class: "qmsg" }, "Hier \xE4nderst du Orte, Aufgaben und Einstellungen. Alles gilt sofort f\xFCr Milo (er braucht Internet beim App-Start)."), K("button", { class: "qbtn go big", onclick: xl }, "\u{1F4CD} Orte & Namen"), K("button", { class: "qbtn big", onclick: Sf }, "\u2795 Neue Aufgabe"), K("button", { class: "qbtn big", onclick: Ef }, "\u{1F4CB} Eigene Aufgaben (" + Ne.qs.length + ")"), K("button", { class: "qbtn big", onclick: g_ }, "\u{1F381} Belohnungen, Noten, Schule")));
  }
  var of = (i, t, e) => {
    let n = K("input", { type: "checkbox" });
    return n.checked = !!t, n.addEventListener("change", () => e(n.checked)), K("label", { class: "qchk" }, n, " " + i);
  };
  function af(i, t, e) {
    let n = new Set(i.subj || []);
    return K("div", { class: "qplace" }, K("input", { class: "qin", value: i.name, placeholder: "Name des Ortes", onchange: (s) => {
      i.name = s.target.value.trim() || i.name;
    } }), K("input", { class: "qin", value: i.desc || "", placeholder: "Beschreibung (kurzer Text)", onchange: (s) => {
      i.desc = s.target.value;
    } }), K("div", { class: "qchks" }, pl.map((s, r) => of(s, n.has(r), (a) => {
      a ? n.add(r) : n.delete(r), i.subj = [...n].sort();
    }))), K("div", { class: "qchks" }, of("Abschlusspr\xFCfung (Endboss, Mathe)", i.exam, (s) => {
      i.exam = s;
    })), !e && K("button", { class: "qbtn", onclick: () => {
      t.extra = t.extra.filter((s) => s !== i), xl(t);
    } }, "\u{1F5D1} Ort l\xF6schen"));
  }
  function xl(i) {
    i = i && i.st ? i : la(Ne);
    let t = ln(), e = window.__api, s = (e && e.world ? e.world.stations.filter((a) => !a.custom) : []).map((a) => {
      let o = i.st[a.id] || (i.st[a.id] = {}), c = xn[a.id] || {}, l = { name: o.name || a.name0 || a.name, desc: o.desc != null ? o.desc : a.desc0 || a.desc, subj: o.subj || c.subj || [], exam: "exam" in o ? o.exam : !!c.exam };
      return i.st[a.id] = l, K("div", {}, K("p", { class: "qtag" }, a.id === 0 ? "Start" : "Station " + a.id), af(l, i, true));
    }), r = i.extra.map((a) => K("div", {}, K("p", { class: "qtag" }, "Neuer Ort"), af(a, i, false)));
    t.append(K("div", { class: "qbox wide" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F4CD} Orte & Namen"), K("button", { class: "qx", onclick: Ci }, "\u2715")), s, r, K("p", { class: "qmsg" }, "Neuen Ort setzen: Speichern, \u2715, mit der Figur an die gew\xFCnschte Stelle laufen, dann wieder hier den Knopf dr\xFCcken."), K("div", { class: "qrow" }, K("button", { class: "qbtn", onclick: () => {
      if (!e) return;
      let a = (prompt("Name des neuen Ortes?", "") || "").trim();
      if (!a) return;
      let o = e.player, c = e.world.walk.nearest(o.x, o.z) || [o.x, o.z], l = 100 + i.extra.reduce((u, h) => Math.max(u, h.id - 99), 0);
      i.extra.push({ id: l, name: a, desc: "", x: o.x, z: o.z, wx: c[0], wz: c[1], subj: [0], exam: false }), xl(i);
    } }, "\u{1F4CD} Neuen Ort hier setzen"), K("button", { class: "qbtn go", onclick: async () => {
      for (let a in i.st) i.st[a].short = String(i.st[a].name).slice(0, 12);
      i.extra.forEach((a) => {
        a.short = a.name.slice(0, 12);
      }), await ca(i), Ci();
    } }, "\u{1F4BE} Speichern"))));
  }
  function Sf() {
    let i = ln(), t = { fi: 0, bn: "", q: "", o: ["", "", "", ""], a: 0, e: "" }, e = K("p", { class: "qmsg" }, "Eine Frage, vier Antworten, eine richtig."), n = K("select", { class: "qin", onchange: (a) => {
      t.fi = +a.target.value;
    } }, pl.map((a, o) => K("option", { value: o }, a))), s = (a, o, c) => K("input", { class: "qin", placeholder: a, value: c || "", onchange: (l) => o(l.target.value) }), r = [0, 1, 2, 3].map((a) => K("div", { class: "qrow" }, K("input", { type: "radio", name: "qa", checked: a === 0, onchange: () => {
      t.a = a;
    } }), s("Antwort " + (a + 1) + (a === 0 ? " (richtig)" : ""), (o) => {
      t.o[a] = o;
    })));
    i.append(K("div", { class: "qbox wide" }, K("div", { class: "qhead" }, K("h2", {}, "\u2795 Neue Aufgabe"), K("button", { class: "qx", onclick: Ci }, "\u2715")), n, s("Themenbereich (z. B. Addition)", (a) => {
      t.bn = a;
    }), s("Frage", (a) => {
      t.q = a;
    }), r, s("Erkl\xE4rung (Weil \u2026)", (a) => {
      t.e = a;
    }), e, K("p", { class: "qmsg" }, "Den Punkt neben der richtigen Antwort antippen."), K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: async () => {
      if (!t.q.trim() || t.o.some((o) => !o.trim())) {
        e.textContent = "Bitte Frage und alle 4 Antworten ausf\xFCllen.";
        return;
      }
      let a = la(Ne);
      a.qs.push({ id: "c" + Date.now().toString(36), fi: t.fi, bn: t.bn.trim() || "Eigene Aufgaben", q: t.q.trim(), o: t.o.map((o) => o.trim()), a: t.a, e: t.e.trim() }), await ca(a), Sf();
    } }, "\u{1F4BE} Speichern & noch eine"), K("button", { class: "qbtn", onclick: Ci }, "Fertig"))));
  }
  function Ef() {
    ln().append(K("div", { class: "qbox wide" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F4CB} Eigene Aufgaben"), K("button", { class: "qx", onclick: Ci }, "\u2715")), Ne.qs.length ? Ne.qs.map((t) => K("div", { class: "qrow qli" }, K("span", {}, pl[t.fi] + " \xB7 " + t.q), K("button", { class: "qbtn", onclick: async () => {
      let e = la(Ne);
      e.qs = e.qs.filter((n) => n.id !== t.id), await ca(e), Ef();
    } }, "\u{1F5D1}"))) : K("p", { class: "qmsg" }, "Noch keine eigenen Aufgaben.")));
  }
  function g_() {
    let i = la(Ne), t = ln(), e = K("textarea", { class: "qin", rows: 6 });
    e.value = (i.rewards.length ? i.rewards : xf).join(`
`);
    let n = K("input", { class: "qin", type: "number", value: i.monthGoal || 20 }), s = je.grades.map((a) => K("input", { class: "qin g", type: "number", value: a })), r = K("input", { class: "qin", value: i.school || "", placeholder: "z. B. Einmaleins mit 6 und 7" });
    t.append(K("div", { class: "qbox wide" }, K("div", { class: "qhead" }, K("h2", {}, "\u{1F381} Einstellungen"), K("button", { class: "qx", onclick: Ci }, "\u2715")), K("p", { class: "qtag" }, "Belohnungen (eine pro Zeile)"), e, K("p", { class: "qtag" }, "Monatsziel (Tage)"), n, K("p", { class: "qtag" }, "Notenspiegel: ab wie viel % gibt es Note 1 \xB7 2 \xB7 3 \xB7 4 \xB7 5"), K("div", { class: "qrow" }, s), K("p", { class: "qtag" }, "Gerade dran in der Schule"), r, K("div", { class: "qrow" }, K("button", { class: "qbtn go", onclick: async () => {
      i.rewards = e.value.split(`
`).map((a) => a.trim()).filter(Boolean), i.monthGoal = +n.value || 20, i.grades = s.map((a) => +a.value), i.school = r.value.trim(), await ca(i), Ci();
    } }, "\u{1F4BE} Speichern"))));
  }
  var ha = window.GEMEN_DATA, te = (i) => document.getElementById(i), Lr = () => new Promise((i) => requestAnimationFrame(() => setTimeout(i, 0))), Ur = /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent) || Math.min(screen.width, screen.height) < 700, Dr = new URLSearchParams(location.search), Be = { shadows: Dr.get("shadows") !== "0", shadowRes: Ur ? 1024 : 2048, bloom: Dr.get("bloom") !== "0", treeDensity: Ur ? 0.65 : 1, maxPR: Ur ? 1.75 : 2 }, Ir = (i) => {
    let t = te("loadmsg");
    t && (t.textContent = i);
  }, wf;
  async function x_() {
    let i = te("view"), t = new dr({ canvas: i, antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: Dr.get("pdb") === "1" }), e = Math.min(window.devicePixelRatio || 1, Be.maxPR);
    t.setPixelRatio(e), t.setSize(innerWidth, innerHeight, false), t.toneMapping = yr, t.toneMappingExposure = 1.15, t.outputColorSpace = Se, t.shadowMap.enabled = Be.shadows, t.shadowMap.type = zc, t.info.autoReset = false;
    let n = new pr();
    {
      let k = new pr(), Q = new Dn(50, 48, 24), Lt = [], Yt = Q.attributes.position;
      for (let Qt = 0; Qt < Yt.count; Qt++) {
        let Re = Yt.getY(Qt) / 50, Bn;
        Re > 0 ? Bn = [0.12 + 0.2 * (1 - Re), 0.02 + 0.05 * (1 - Re), 0.1 + 0.16 * (1 - Re)] : Bn = [0.05, 0.01, 0.03], Lt.push(...Bn);
      }
      Q.setAttribute("color", new de(Lt, 3)), k.add(new zt(Q, new se({ vertexColors: true, side: Ze })));
      let Ht = me(3);
      for (let Qt = 0; Qt < 14; Qt++) {
        let Re = Ht() * 6.28, Bn = 0.05 + Ht() * 0.35, $s = new zt(new Dn(1.6 + Ht() * 2, 8, 6), new se({ color: new Xt(Ht() < 0.5 ? 16726634 : Ht() < 0.5 ? 2285823 : 11599664).multiplyScalar(6) }));
        $s.position.set(Math.cos(Re) * Math.cos(Bn) * 44, Math.sin(Bn) * 44, Math.sin(Re) * Math.cos(Bn) * 44), k.add($s);
      }
      let Zt = new zt(new Dn(4, 12, 8), new se({ color: new Xt(16734858).multiplyScalar(5) }));
      Zt.position.set(-26, 36, -18), k.add(Zt);
      let Wt = new Fs(t);
      wf = Wt.fromScene(k, 0.03).texture, Wt.dispose();
    }
    n.environment = wf, n.background = new Xt(1705490), n.fog = new Co(2755100, 4e-3);
    let s = new nn(38, innerWidth / innerHeight, 0.4, 5e3), r = new No(10117832, 3806244, 1.15);
    n.add(r);
    let a = new Fo(16738970, 1.25);
    if (a.position.set(-60, 90, -40), n.add(a), n.add(a.target), Be.shadows) {
      a.castShadow = true, a.shadow.mapSize.set(Be.shadowRes, Be.shadowRes), a.shadow.bias = -4e-4, a.shadow.normalBias = 0.05;
      let k = a.shadow.camera;
      k.near = 1, k.far = 400, k.left = -80, k.right = 80, k.top = 80, k.bottom = -80;
    }
    Ir("Karte wird gebaut \u2026"), await Lr();
    let o = await Du(ha, n, Be);
    Ir("B\xE4ume, Laternen, Autos \u2026"), await Lr(), zu(o, ha, Be), Bu(o, ha), Hu(o, ha, Be), ku(o), qu(o), Ir("Stationen \u2026"), await Lr(), Gu(o, Be);
    let c = Vu(o, Be);
    Ir("Himmel \u2026"), await Lr(), $u(o, n, Be);
    {
      let k = o.walk;
      for (let Q of o.homeBlockers) if (Q.type === "rect") {
        let Lt = Math.cos(Q.rot), Yt = Math.sin(Q.rot), Ht = Math.hypot(Q.w, Q.d) / 2 + 1;
        for (let Zt = Math.floor(Q.cz - Ht - k.g0z); Zt <= Math.ceil(Q.cz + Ht - k.g0z); Zt++) for (let Wt = Math.floor(Q.cx - Ht - k.g0x); Wt <= Math.ceil(Q.cx + Ht - k.g0x); Wt++) {
          if (Wt < 0 || Zt < 0 || Wt >= k.GW || Zt >= k.GH) continue;
          let Qt = k.g0x + Wt + 0.5 - Q.cx, Re = k.g0z + Zt + 0.5 - Q.cz, Bn = Qt * Lt - Re * Yt, $s = Qt * Yt + Re * Lt, P = Qt * Math.cos(Q.rot) - Re * Math.sin(Q.rot), nt = Qt * Math.sin(Q.rot) + Re * Math.cos(Q.rot);
          Math.abs(P) < Q.w / 2 + 0.5 && Math.abs(nt) < Q.d / 2 + 0.5 && (k.blocked[Zt * k.GW + Wt] = 1);
        }
      } else if (Q.type === "ring") for (let Lt = 0; Lt < k.GH; Lt++) {
        let Yt = k.g0z + Lt + 0.5;
        if (!(Math.abs(Yt - Q.cz) > Q.r + 2)) for (let Ht = 0; Ht < k.GW; Ht++) {
          let Zt = k.g0x + Ht + 0.5;
          if (Math.abs(Zt - Q.cx) > Q.r + 2) continue;
          let Wt = Math.hypot(Zt - Q.cx, Yt - Q.cz);
          if (Math.abs(Wt - Q.r) > Q.w / 2 + 0.3) continue;
          let Qt = Math.atan2(Yt - Q.cz, Zt - Q.cx);
          Math.abs(Math.atan2(Math.sin(Qt - Q.gateAng), Math.cos(Qt - Q.gateAng))) * Q.r < Q.gateW / 2 || (k.blocked[Lt * k.GW + Ht] = 1);
        }
      }
      for (let Q = 0; Q < k.GH; Q++) for (let Lt = 0; Lt < k.GW; Lt++) {
        let Yt = k.g0x + Lt + 0.5, Ht = k.g0z + Q + 0.5;
        Math.hypot(Yt - He.x, Ht - He.z) > He.fenceR + 3;
      }
    }
    {
      let k = o.walk.nearest(2.6, 9) || [2.6, 9];
      o.walk.reach = null;
      let Q = o.walk.computeReach(k[0], k[1]);
      console.log("reachable cells", Q);
    }
    for (let k of o.stations) {
      let Q = o.walk.nearest(k.x, k.z);
      Q && (k.wx = Q[0], k.wz = Q[1]);
    }
    let l = Wu(o, n);
    {
      let k = o.walk.nearest(l.x, l.z);
      k && (l.x = k[0], l.z = k[1], l.wx = k[0] - 1, l.wz = k[1] - 1);
    }
    Ir("Tunnel & Monster \u2026"), await Lr();
    let u = Ku(o, n), h = Qu(o, n, u, Be, Dr.get("monsters") !== "0"), f = { hp: 100, hurt: 0, dead: 0, safe: true, monsters: Dr.get("monsters") !== "0" }, d = te("hp-fill"), g = te("hp-txt"), _ = te("zone"), m = te("fx-hurt"), p = te("fx-safe"), x = te("dead");
    function v() {
      f.dead = 2.2, x.classList.add("show"), l.stop();
      let k = o.walk.nearest(2.6, 9) || [2.6, 9];
      l.x = k[0], l.z = k[1], l.wx = k[0] - 1, l.wz = k[1] - 1, V.follow = true, f.hp = 100, h.scatterNear(k[0], k[1], 70);
    }
    function E(k) {
      f.safe || f.dead > 0 || f.peace || (f.hp -= k, f.hurt = 1, f.hp <= 0 && v());
    }
    let SH = (() => {
      const R2 = 10, N2 = 20, DUR = 30, CD = 20, ARR = 1.3, GROW = 3.4, FADE = 1.6;
      const g2 = new pe();
      o.root.add(g2);
      g2.visible = false;
      const dg2 = new Dn(R2, 48, 26, 0, Math.PI * 2, 0, Math.PI / 2);
      const dome = new zt(dg2, new Te({
        transparent: true,
        depthWrite: false,
        side: Ue,
        uniforms: { uTime: { value: 0 }, uA: { value: 0 }, uFace: { value: 0 } },
        vertexShader: "varying vec3 vD; void main(){ vD=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
        fragmentShader: `uniform float uTime; uniform float uA; uniform float uFace; varying vec3 vD;
vec3 h3(vec3 p){ p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6))); return fract(sin(p)*43758.5453); }
void main(){
 vec3 p=vD*4.2; vec3 ip=floor(p); vec3 fp=fract(p);
 float d1=9.0; float d2=9.0; vec3 id=vec3(0.0);
 for(int i=-1;i<=1;i++) for(int j=-1;j<=1;j++) for(int k=-1;k<=1;k++){
  vec3 g=vec3(float(i),float(j),float(k)); vec3 o=h3(ip+g); vec3 r=g+o-fp; float d=dot(r,r);
  if(d<d1){ d2=d1; d1=d; id=ip+g; } else if(d<d2){ d2=d; } }
 float e=sqrt(d2)-sqrt(d1);
 float cr=1.0-smoothstep(0.0,0.08,e);
 float hh=h3(id).x;
 vec3 rain=0.5+0.5*cos(6.2831*(vD.y*1.1+uTime*0.07+vec3(0.0,0.33,0.67)));
 vec3 stone=vec3(0.26+0.2*h3(id+3.0).y);
 float win=step(hh,0.3);
 vec3 col=mix(stone,rain*1.15,win);
 float a=mix(0.36,0.14,win);
 col=mix(col,rain*2.4,cr); a=mix(a,1.0,cr);
 float rim=smoothstep(0.0,0.1,vD.y);
float ca=cos(uFace); float sa=sin(uFace);
 float lz=vD.x*sa+vD.z*ca; float lx=vD.x*ca-vD.z*sa;
 vec2 fq=vec2(lx,-lz)*1.55;
 float fm=smoothstep(1.0,0.82,length(fq))*smoothstep(0.15,0.4,vD.y);
 vec2 ep=vec2(abs(fq.x)-0.36,fq.y-0.22);
 float ee=length(vec2(ep.x/0.2,ep.y/0.1));
 float socket=1.0-smoothstep(0.7,1.0,ee);
 float pupil=1.0-smoothstep(0.0,0.38,ee);
 float brow=(1.0-smoothstep(0.0,0.035,abs(fq.y-(0.42+0.18*(abs(fq.x)-0.2)))))*step(0.14,abs(fq.x))*step(abs(fq.x),0.62);
 float nose=(1.0-smoothstep(0.0,0.03,abs(fq.x)))*step(-0.14,fq.y)*step(fq.y,0.2);
 float nostril=1.0-smoothstep(0.6,1.0,length(vec2((abs(fq.x)-0.1)/0.07,(fq.y+0.17)/0.04)));
 float mouth=(1.0-smoothstep(0.0,0.035,abs(fq.y-(-0.40+0.1*fq.x*fq.x))))*step(abs(fq.x),0.34);
 float lip=(1.0-smoothstep(0.0,0.04,abs(fq.y-(-0.50+0.1*fq.x*fq.x))))*step(abs(fq.x),0.24);
 col=mix(col,vec3(0.5+0.12*h3(id).y),fm*0.9); a=max(a,0.7*fm);
 float shade=max(max(socket,brow),max(max(nose,nostril),max(mouth,lip)));
 col=mix(col,vec3(0.02),shade*fm*0.92);
 col=mix(col,rain*3.0,pupil*fm);
 a=mix(a,1.0,max(shade,pupil)*fm);
 gl_FragColor=vec4(col,a*uA*rim);
}`
      }));
      dome.renderOrder = 12;
      g2.add(dome);
      const ribMat = new ae({ color: 9399295, emissive: 8022527, emissiveIntensity: 1.7, transparent: true, opacity: 0, roughness: 0.35, depthWrite: false });
      const grid = new pe();
      grid.material = ribMat;
      g2.add(grid);
      {
        const NR = 14, SEG = 34, dm2 = new pe(), inst = new ri(new Dn(1, 8, 6), ribMat, NR * SEG + 120);
        let c2 = 0;
        for (let k = 0; k < NR; k++) {
          const ph2 = k / NR * Math.PI * 2;
          for (let j2 = 0; j2 < SEG; j2++) {
            const th2 = (j2 + 0.5) / SEG * Math.PI / 2, rr2 = R2 * 1.005, q2 = 1 - j2 / SEG;
            dm2.position.set(Math.cos(th2) * Math.cos(ph2) * rr2, Math.sin(th2) * rr2, Math.cos(th2) * Math.sin(ph2) * rr2);
            const sz = 0.17 + 0.1 * q2;
            dm2.scale.set(sz, sz, sz);
            dm2.updateMatrix();
            inst.setMatrixAt(c2++, dm2.matrix);
          }
        }
        for (const an2 of [0.3, 0.7, 1.1]) {
          const rr2 = Math.cos(an2) * R2 * 1.005, yy = Math.sin(an2) * R2 * 1.005;
          for (let j2 = 0; j2 < 40; j2++) {
            const a2 = j2 / 40 * Math.PI * 2;
            dm2.position.set(Math.cos(a2) * rr2, yy, Math.sin(a2) * rr2);
            dm2.scale.set(0.15, 0.15, 0.15);
            dm2.updateMatrix();
            inst.setMatrixAt(c2++, dm2.matrix);
          }
        }
        inst.frustumCulled = false;
        inst.renderOrder = 13;
        grid.add(inst);
      }
      dome.visible = false;
      grid.visible = false;
      const gm2 = new ae({ color: 10516479, emissive: 8014335, emissiveIntensity: 1.8, transparent: true, opacity: 0, roughness: 0.4, depthWrite: false });
      const GG = new pe();
      g2.add(GG);
      {
        const pts = [], P = (x2, y2, z2, sz) => pts.push([x2, y2, z2, sz]);
        for (let j2 = 0; j2 < 22; j2++) P(0, j2 * 0.5, -5.2, 0.46 - 0.12 * j2 / 22);
        for (let i2 = 0; i2 < 8; i2++) {
          const yy = 2 + i2 * 0.85, a2 = 6.4 - Math.abs(i2 - 3) * 0.22 - i2 * 0.05, b2 = 5.2 - i2 * 0.08;
          for (let j2 = 0; j2 <= 26; j2++) {
            const ph2 = -2.25 + 4.5 * j2 / 26;
            P(a2 * Math.sin(ph2), yy - 0.35 * (1 - Math.cos(ph2)), -b2 * Math.cos(ph2), 0.3);
          }
        }
        for (let j2 = 0; j2 <= 24; j2++) {
          const u2 = j2 / 24 * 2 - 1;
          P(u2 * 7.2, 9.8 + 0.5 * (1 - u2 * u2), -4.2 + u2 * u2 * 1.2, 0.38);
        }
        for (const sd2 of [-1, 1]) {
          const S02 = [sd2 * 7.2, 9.4, -4], C02 = [sd2 * 11.8, 5.2, -0.5], H02 = [sd2 * 6.3, 0.8, 5.5];
          for (let j2 = 0; j2 <= 28; j2++) {
            const t2 = j2 / 28, m2 = 1 - t2;
            P(m2 * m2 * S02[0] + 2 * m2 * t2 * C02[0] + t2 * t2 * H02[0], m2 * m2 * S02[1] + 2 * m2 * t2 * C02[1] + t2 * t2 * H02[1], m2 * m2 * S02[2] + 2 * m2 * t2 * C02[2] + t2 * t2 * H02[2], 0.44 - 0.22 * t2);
          }
          for (let k = 0; k < 5; k++) {
            const sp2 = (k - 2) * 0.28;
            for (let j2 = 1; j2 <= 6; j2++) P(H02[0] + sd2 * sp2 * j2 * 0.6, 0.8 - j2 * 0.04, H02[2] + j2 * 0.55, 0.2 - 0.012 * j2);
          }
        }
        const gi2 = new ri(new Dn(1, 8, 6), gm2, pts.length), dm2 = new pe();
        pts.forEach((p2, i2) => {
          dm2.position.set(p2[0], p2[1], p2[2]);
          dm2.scale.setScalar(p2[3]);
          dm2.updateMatrix();
          gi2.setMatrixAt(i2, dm2.matrix);
        });
        gi2.frustumCulled = false;
        gi2.renderOrder = 14;
        GG.add(gi2);
      }
      const pm2 = new ae({ color: 9399295, emissive: 6045183, emissiveIntensity: 1, transparent: true, opacity: 0, depthWrite: false, side: Ue });
      for (const sd2 of [-1, 1]) {
        const pa = new zt(new Dn(1, 16, 12), pm2);
        pa.scale.set(1.9, 1.4, 1.9);
        pa.position.set(sd2 * 7.4, 9.6, -4);
        GG.add(pa);
      }
      const fc2 = ji(240, 347), fx2 = fc2.getContext("2d");
      fx2.fillStyle = "#555";
      fx2.fillRect(0, 0, 240, 347);
      const ftex = new wn(fc2);
      {
        const im2 = new Image();
        im2.onload = () => {
          fx2.drawImage(im2, 0, 0, 240, 347);
          ftex.needsUpdate = true;
        };
        im2.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAFbAPADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDyGiiitBBRRRQAUUUUAFFJRQAtFJRQAtFJRQAtLmhEZzhFLH0AzV+20a7mGSFjH+2efypOSW5Si3sUaK6GDwzvTL3eG9FT/Gr0Hhuw2gSmdiDyQwGaj2sS/YzOQpa7Q+EdPkB8u4uYyem7awH6VXm8ET4zaXsUh7LIpQ/nyKFVi+oOlNdDlKUVp33h/VbBS9xZyeWP44/nX8xWZVppmbTW4opwptOFMQ4CnCminUxi09FyaYoyau20WaGBNbQ55xWhGuBUcSYFSlgq1k3dmgy4lWKMsegrHZ2mkLN1NPu5zNJtB+UfrVjT7YyOOO/A9a1iuVXZD1Zz1JS0UiQooooAKKKSgAoopM0ALSVJBDJO+2JSx7+grZsdFXIac7z/AHR0FRKajuXGEpbGRb201wcRIW9+1bFnoQOGnYsf7o4FblvZqgAAwB2FXo4lAGBXPOu3sdMMOluUrWwSJAEjVR7CrqW4HvVgxggZJFSonYc1g5NnQopDIoeOlS+SF7cGnopzwOKsKuaV2VYjjTH0qxGhznqKI1weBUygnpTuFiSJWXlcj8apXuiaVqOTdWUXmH/log2N+Y/rV4ZAIpVIFNSa2JcU9zi9V8AzIGk0mfzh18mXhvwPQ1x00EttM0NxG0ciHDI4wRXtkRLdCBiodW0Ww1qDy76LLgYSZOHX8f6V0QrPqc86C3ieLinitjxH4avdClzKPNtWOEnQcH2PoayEXJFdKaZytNbk0Ee41p28eBVe1j6VooMCokykhQMCqGoXOP3SHk9asXdwIYye/YVlRhpXyeSTThHqKT6EtrCZGArrdJsnhEIiiMt3OdlvEBySe9UtGsY0ja4uOIY+Tn+I+lesfD7w80Kf23qMeLqdcQRkf6mM/wBT/Km3zMmUuRHzdRRRTEFJS0lABRRRQAGr2m6bJekM2Vi/vev0qXRtNN4/mSj90p6f3jXWwQqigAAKOKwqVbaI3pUubVlK0sUhVUjQACtKG3AqeOL2qwseK5G7nZGKWxCIuOlSBcYGakIxxmkZWPQVJY0kA8U5D6LTkiJ6VPHB60wGITkHbVqI5HFCxbBzkmpoF4yRg/SgYBalUA9qcEOM96VVAzkUBcYx49qNwxTTynTFIM/jQBYtyAST+VW1Ygg/0rPiOGOT+lXoQNuATnFXEiRZMMF1A8F1EskUgwyOMg15j4q8KS6FdiWHMljKf3b4+6f7pr0+AEYzzirclvb6jaS2l2m+GVcEenv9a6qZzVEmeKwKAKmdwqkngVe13SJtDv2tZuUPMUnZ19a57Ubjny1PXrVWbZg9CG4mM8pP8I4FaejWDTzKAOvf0HrWdYwmWQDHFd5oWjz3dxDplnxc3AzK/aKPuTVyfRCXdm74L8PrrWoLJIn/ABK7Fhx2mk9PoO9erEhRnoBVbS7C20nT4bK0TZDCuB6n1J9zU0g3LnPHpRFHJUlzM+PKKKKZ0BRRSUAFWLG0e8uFiXp1Y+gqBQWYKoyScAV2ejacLS3G4DzG5c/0rKpPlRrShzstWVsIo1RBhVGAKvxxgqoK474pqJgcYNWYoz1PFcTZ3JWHolOCknAPHepANo5pS2OAOtIdxuzJqRYh35+lCKz8Y5qzHCP4j0oAYkag1YQZFIdi98fhTlliB+8KB3HBeeaUDH9KerRsAVIp+AQTnigdwQf5NIyYPJqWJeaGGSaAKjrhuKQL2NTyrxntTQAetADUTnirkYBZQBUSLxx2qWJgDkcU0xMuovyDJ5qWIlWGD061WEwBAY9elWoJFJ2nvXTCSOeasQeJdITX9DlhAH2qFS8Df7Q7fjXgjq5mZXBD7sEH1r6OtW8uYH3ryjxRoAg8bXcaLtgkYTKQOAG5P610J2Vzma1sUdDs1t7f7XMu7BxGvd27AV7H4P0P+xdPM10AdQusPO390dkHsP51yXgHS01XWHvGQGy03CxL2aX1/CvTTID6cUob3ZM9iwHVo8N6d6hS5CghgcdiBVZmyefu9DU7yRLEFjOfatFuYSjZHyJRRRUmolFFJyTgUmBueF7D7Rcm4cZWM4X612sUQ29OKo6DZC1sIkIG4jLfU1sRxjPPT0rhqS5pHfTjyxGRxjrip0Q4yfwqnrGpxaXAjCIyyyZ2Rg44HUk+lDXbR2yzXl3FAp52xw5I9ssf6Uo05S1FOrGL1LjdcCpI7ZsbmB59axYZbrU5CNPW8liHWWSURL/46M1cXwzJcN/pM8QPcKrSH83Jp8qW7KU7rY0vOghJDzwr9ZFFRtqNqPu3VuD/ANdV/wAaqnwjp6L88spb6AD9KYfDem4xtP1OKTUSk2yWW9ic/LcwnPpIP8aarZ5Vg30OaW28N6dISoLA47Yqvc+GLdWPkykH3BFFovqHM72sWknZD3H1q7DdEjG6udOj3kB/cXjj23kj9ajM+rWh/eRrMo9Bz/Sp5L7Mrn7o7KCYkcnipi43HHeuW07X4WbZMjo/cAZx+HX9K2YNRtZDlbiP8Wx/OlysfNEuyOQKaCRg0x5UfBWRD9GBqOW5jRMl0GPVhS1HdFnzAKY10Ae1Y1xq9tGeZgf90E1Qm1yD+ASt+A/xppMTa7nVpco/B5NXIpuRnr9a4JfEEqthLK6dfYAVbh8UtGf3mm3nHcFT/WripIzbTPRIZw5HIyKzfHFg1xpL6jbLm5t4yGA7p/8AWrBtvFtkMGa2u4/coD/Wul0/xHo95CYmu1UONpWRSMg11QkpaM5qkGtUaHw3sPsvg+12r+8l3SufUk//AFq3GU9B949cVD4fSKPRbZbaQOkamPKNkYBNWpSFQFeDnqa0dkYq7GA/IVddpHSoXcB+QAw71K7FYxmoo4y77kByemKtXewnZbnyfRRSUhBVvRoPtGp28Z6F8n8Kp5roPBtsZdRaVhgInH1NRUdosuCvJHc20WFHFTzyR2kDSyngdu5PpSK8dvH5krhVHXNYV5dNe3PnOfLtoeefT0+prijG71OypPlVluRa7KZ7WOV3VGKPhcEk5I4X8KyCXvpow7FtzBTz0rSS+ZmDzoggTPlxY5A9M/zqNFEt1BcqoX98FYD0PIrdSsrGHs3uzp4tRitIVht1wqDAxQmqu5ySM5rJEZ3HI71Nb2Ukh+UHFYXOy2hsm8Lqctz6DmmCMyfxMKjigEYCj52Hp0H41YAkJA3bfZRSbuKMeUmsLZ1uFOeCcZNRXQeN2JPerHlAjJDH3JqtPGMnqD7GoaLVr3IzJx+FUrmT5s+1OmIXjdn6VBgyE4HSqiiZFWazS8Qhhhh91x1Wse5edIgC5DKecdM9K6uBBGpJP1rmoLeTVNQNpEdq8s7/AN0ZreDsc81fQaZmuIEWQLlyqngcjPNXY4ZH1KO3t1jWRgFBAAC59fpWpF4LgKfu7+dJByCwDDP0qla2l1pWvJHeqC/VWH3XGDyKTs9UNRlE0X0uxt3+dBPL/FLL8xP0HQVZt4oF5WKMfRRVeeZZGLAEZ7ZoifGAeR7Vi2zeK01NQGHyyNq5/wB0UqKuchVP/ARUcJTaM7vf5elWoSjEbXGfQ0kVYlFuhj+eCMj/AHRSR6Fo18dtxamNj/HE5U1cRuNrDg1CriG4wCcZrSKtqYyd00SnwLd20aT+HtYnikPISZiAfbIrOPi7XtFvDZ63Asssf8MgxuHqGHWu70y5VkWPcMx4bPqCK5L4vwxtHplwgG4F0J7noa6HojlV2zY0LxXZ6/MtqIpILj72wnIYD0NdfBHsHzYz29q8W8CuU8V2G3+JmX6/Ka9pSVBGdx249a1hJuJhWjZnx5TeTwKXrTlGOadxgoC9OT6+ldv4KtsWTSkfNK/XvjpXFKOa7C4un0rwxbQQ5+03S7E29QO5+vb8axq6pI2paNsXU9dW71mGwtmBtImIkkz95sEZ+gqveXSOVSIHy1+4p6k/3jWXb2wtUGV3St2Hr6fhXXeHfD5IF3qC5duVjP8AX/CspWjojWnFyfMyhp2kXF/hnykX94jrWtqWnRWWnGSHLNE6MT7A10CxgDCgAD0qK7gWaF4yBh1IrLndzo5dCqIllCsgAU81JKyINhYJGByB1as/SJ2khNm/+ugOxl9R2NaL2qgHe3zdcdAKTQJ6DGvYY41ULhTwCeP0rKuddWHzDEhcLxgetakkcLLtJU++agl0yxfkom49SuRmmrdQlfoZ0WsTTReaso279u3HX/63vV+5eeNcsVJI7GmmzsYwpSPcQehJNS5LcJGPrim7dBRutygks7ybRB5nuOBWikKLET90nqoqMI4OTjIqzb27zMB0HrTSCUrlG7cQWksjHAA61J4T0021ibmUYmuTvOey9hUV9GmpavFpcPMMXz3BHoO34niuk2hFChcDH5U27KxMFd3GxuFOTUupaeNUsFdFH2i3PmRH19V/EVXxyMEH61taVgEAflUrc1a0OKuVWI5JGGGcVD9rijAJbaDWrr9jAmpTIUCsjbgQeqnkf1FZM9mbnYsbKCnO0jrTtqS3poXLW+gJx5h/GtSL7NKAHJHo3auRGn3cU7uyM6FcBQucH1rR00XUFvl1k3buEPYUSihRnJu1jpF8y1yxk8yHOCf7tNuinmgluccEHrTLIu0Dbo22t95T0prxHYAB93geuKSlYUldl621YWus2QckRyw7WP0NZ3xE1D7fJ+7KmGLIQDufWia3c3lpIx/dwqzHn8qxNXuTf3qxD7m4L09TzXS2pK5zJWbO1+HOjC1t21WVB50y7Icj7idz9Sf0rtZUBTzJGKoo5LVV02W2MSPbbWg8tdhHQKBilurpbhhggIvTPc+tbUtVoctaVmfKBHajvTsEngZJ4A9a7LT/AAZi2WS93tKw5VTwnt9aiU1Hc2hTlPY4+PG9c9MjNdRekzaoEjXf9niWGIZ74yT+tMu/CsqyE2j8A/dft+Nbeg6I8LSXV5hpiTgKcge/1rKc4tXRtGlKLsyxpGjR2o8+4xJcnvjhPYV0KLhRiqkB55B/HiroyErlbbOmOggHUAVHIe2KmH3aQrnk0izH1LSRcyLc2szW12g4kXoR6Ed6r/avEFsMXGmwXq/34JME/hW8w9RgComYg8DmrUhciexkJqWVLXel3cBPGD2pp13RS5DrPF7SRE1qedICcZpjXM2eQT2pXQ+R9yousaRgeVPGoxzkYNMl1rSl5a8T8BmrvmyYx5KH6qKaJJjysKD6KKakhODM1df05nxCtzOfSOE81NPqV/PCEsrX7PvH3pc5A/L+VW2N45xuIHtVux07+OYkn3pufYnk7so+E7E2aTNL888rZkc+nYVuXOMgDrSMqQDgflTVUv8AM2alu7uVFEYX5gTzWpp8pVwBWd5TlsY4q1ErRgZppltaFbxZbXUlxBf2UQlaNCksXQuuc8e9c7FqumySGOWRrWYdYp124/GvQ7W3F3bspJzjI9q5q+WOWRoL+2hnCnH7xAat2MlvZFSGIS8wyq4PTawar0cRSJlKAsSOWTpWe+g6VOMwRtD6Kjnj881GuhpAf3WpajH/ALsuRUOw9TfslfuQw/2G/pU0tr+93heG7Viw6Pck7k1+/X6opq7DoV9IMN4j1Eg9CEUU0lsQ7pj/ABPA8WmRvECGZtpPoMVwc0m1HFu+WQEKx7sev5V1nirwwtt4cur46nqN1PCFIEswC4zg8AVwtvIpjHl8AdvSuunC6OSpOzZ1ngjxYbVxZ3zEQMcOP7h9fpXqgIlUGPa3AII5GK+fLiNtwmh4kH613nw+8ZrCVsNQf903yo7H/Vn0PtXVHQ4asW9TzDwtbrca/ZqwBVGMhH+6Cf54rt9K806jJIHYKc7xnhvrXK+BkLa07YHy27nP5Cuy0rpJJ74rzK+sz2sKrU2zQ8pXkJzwOMipkj2gjPBqjaysl425v3cgwfr2q/uwSp4rJmjMkAG8Kktnce/atlVG3AJ9KxsH7W+eCX6Dt7VuR4aNaSJY3aTjB708r0yKkRMHgUkhYAbRkk4pgQulNEIIqyU54pVjx+NA7kCW6AEkfjTPJUv0q12OTTScZGP0poogMSZ4H6U7CKOgyKUAjqSajf5TkmmDEb5nG3oOvFTxyhQVHJqq77enNSWBVpmdhwvND2J6llbQyAyzHA7ZqeJ4YxhMMR3xXNeKNamiQrb8H+9jp+FcjDc6nMWaG4ufOJ+V/MOB74qFqW42R6nNJkZxz7VXFxjv09azdPv5ZrTy53DTxqNzYxn/AOvUKyvLcBFPJNJyKjFs6yyufKt95J5Paq2sWiyYvITuSQ4b/ZNcf4i1S+S5itoWaO3jPGP+Wh7k10mjXjzaZMknI2A4PrmnzdBOm7c5DHGATxiphEZPvGjg9DUiAZHtTJsPgtSMYNaNsrRtljVa3kHHatKIq4A4rSOplPQNTtftuhX9uF3eZbuAPfGRXgyl7aTDDnuPWvoey3I4APPavAdTb/iZTwTHMqu24njJ3Guyi+hwVVqSpIGUMp4NQTxMredBw46j1qFS9uw3A7W5+oq2rBgGHINdBzvQXwIv+mXrjG4W+APxGa7a0gMVhEH4LDJ/GuB8Fz+Rr0UbfcnVoj+I4/UV394/l4UcbQBXmVl79z1sM707Fa6mW3jJVdz9ql0i7N7bZlAEqHDe/oazZmMmT1qzoEbCZ8tgspxnvWT1N3oiaQBZ2wMYY4rStHzGB7VnyxkSg4J6nk1fsBjNStyGX4zgDvSjk4/yaFTKnacH6U5BlsU7kjfYDvSkcUjHC/L+FOU5GcdqZSGMnII4qGUMQQpwasEcZqNsDH8qBohAwvzHmoyM5qw4AGTgVBuUNgEE/WmFxnl1CnmQSE7SVIwcVZlnjhGWIzjpmqdzqKBTgDJoYluRz28F422Uce4oht7PT4CkCpz3HNULi/3JsGcfrSpKxjBfO4dh/jUPRaGnNcnaWTnaoP061LZExsSyAk9c+lRiURRcLkj7xHI+lRNdAMB17jH61NiubQ0rnT7a5AkJ+6ckVesrfZbFE4JrJguNpXjIPB+lXobnynKPgleN3r6VSWtyOZpWJyrI3Ip6tzk1LHJHcgg4DDpioZYnUkJyfSmwTuWIXBbmtG3k2kDH41h28+Hw4ww61qQkkBgfypxYpRN60IaRSOteL+LraO41a+OwLMkxw68Z5717HYnIBHY15F4lZW1m6KjBeUsf6V34fVnmV9DmUlMpMU/yyLxSo7Qvg/d7irF3aiZQyfLIv3W/pVaKTzMxyjbIvHNdTVjnvcoWs7Wt1FcJ96Jww/A16fqH+lQx3UHzJKgcY9xXlZr0LwDqIu9PaxkbMtvyoPeM/wCBrgrRurndhp8rsJH5rMVCE468VoWMqxMwfCtjgntW4LeIKQFHX86o3NvGjbigPtXNc7HqQ3Um5iwwc8nFT6c2eCfwrNkkLy/LwGIH4Vfsz+9bHGOM4rPqJrQ2FPTkc0hbCnkjv+FQg4wT65OKN5AYnGSeB6CmShrSgvtxgVPHhwBjgVQLbjv7ds96u2ThwcdqoZLLgIcDpVZGO0yMMemewqxdHgIP4utZup3BVcITgdulAyveXpZyqngdSR/KqT3Emck4z07mmp8ybm4J6Z70rR4bOOcZPOe1RcqxUlnlbjPPUmot7NkknPsasTRZUbRyRk8dKfHCvl8suduOaLjsUo4WcAgHJXp6c1atFJlO4ZAIAB5zz1qQGJIl+cBwaIJoQ3ylgAfTrzQPlZPIpKsFXLdBnovvVAL+9MZPy5yrDsRWglwuSWUnPIHamF0YOBGQzcg+lCK5WLCG2fN1XnIPWpsk4JJ68j/69RC6VThhtYDIxT0vbdpcxqduf4vpQmS4SLcQJO5Dkr1//XVrznQAvjHuM1UiuIlztbPUHHpU6MPKZJcEKCQQeo9aq5m00TyolzHvVdsy9COje1XtJbeuw1lWknkyfKflbjBPStGxwlyZQNp3fMp/nRYObSzNvSW3NIjZyM15l41g8nXJGBHzqCfrXpdgwjvZ+mK8++IUdxFqQkiVWUqGII+92IGe/SuvDytJHDXje5zIqteWvnDfH8si9D61ZifzgCoyT2A5/Knkc4NeluefezOVarOk6jNpWoRXlufnjPKnoy9warsKYRXG1c607ansuk65Y6xbhrSQCTHzRN95amuYQ64PfivGIZZIHWSKRkZTkMpwRXWaV4wv3dYJY1uGxwW4Y/jXLOi1qjsp1k9zpbuPbcFY1wFGcjtUlmfvA46dc1RN41xCsu3ZnOQKmt324IzkgDArnNzWZ9w2qSB2PtTjk7dxzntVeNxlATkgc896lDEFF5wDuOKAsOnAR9ue2adpz7W69+tV7uTO5+57UWZAO7rTQNGhM/7zJ6Csi9QuAGzg5JFakp3qGBHGOKpXKbgWPU559BSkEdzPmUIRjgYzn04qNJdrZKgLjr7U9yTGUI4U02OMueclcDrUI0M641JEQou4OThiyn9KiSd5T8kcj59sD9a6SO1ikA3qMj2qwmnQgjHP4VskgUrHOx213LkhYlH+0Sf5U5rK9A+V4h7bT/jXRHTxwUIGKjNvJzjJ9sU7I0jNGEthebciZcDts/8Ar1KtjdEAvPxjHyx8/wA62BHKDgc/hU0UbldpXB9TS0NOZGKNHuW63OQemEFO/sKbHzTP78Ct2ON04B/WrBgd0zv/AAosiXNnFXkF5p53wnzcfwng1csryR0RbiMxHkMDzxit+eyVlJPJrGvYDvwBj271LRjKV2WLdyCoHQHr61tWcgDqrchhgjriuftgQSCOvQ+laltLjYzcBRj60loZy1N6B2FzIyjr1ye1c742WGSBTKjPHJhGA7Z6Ee4rcgcDJ6lhn/61Z/iRfM08FsGP+ME9e/HuK1i9TnmjzKQvazxIMLG+RIV7gdyfp2qzvSQ7o+lQ6qDBM+w5L8eYOmB/Ws62vpopSlw5IY5JPf3r0aVTozgqQvqjOYUypWFM6GoLGqD1GOO5rV0dYnu0YAjb8x9Mj+lZgDOwUdT0FaGlPhpkj6hNwP8AewRn9Kifwlw3Ots901gnReSAPpVm3U5wGOAuTUelustqcrxuyD7Hmp+AikEAHJrzpbnox1RaUlPnzlsHrVqOQdOrcc+tZ8cpK4YEkNnn1qUny1y5+mP6Uxks5YKRncf4QO9SxqUUEnn0FV2wMbuWyOB2pWdvNx1QdT6GmgZoRuNhzUUqb1PzDkYNVfMK42nrT2fEWBxjk880mJFCQNGzq5Ix1qSIqPmPKHg47H0prgupU87ugbnNNVvLKoAA3UkHv6VKLNGJ1VAQwwenNTxzYGMk+4rIW5G4o7YbPHykAfXFTxzvt3b856dhjvVcwrGmbojAAyT60yW+EK5PeqHn4b94xYY4APOPpTCUbakr5UHjdgn/AOtTuxl83vyq7NgHrTpZyoV435z1rJm8oqI1MkaD+90/P/GnMWj2KF82NuuGAK0XFc3fNV267XAyvYGnpcZTg/gK577UvmAAkj3PP5+tPSVlbcjMAeCSvGPf0NFw1N4XIdOCA44IPes+dt7bXUZ7HuKp/astyjEZ69vzpsc7A5RmIDZwBS5hWJWVtxI4PQ4q9YRoCScs4HBz0rHadm6ltwPfAFXIJfk+4xfP3s8CmmJo6FJVIByCRxhemag1MedZyJzyvH161BZzMzD7p4xwBS3rlbSTJ2jnD+h7VS3MZbHnN4YpUVx5mASCpIBB9zWdPCso4Xb6HOcVrypm4lQouxmywX19aEtM9uK7FocL3OaYVHipyuelROVXgkA1oAiZDZH0q5YQvE/nPwv3QPU/4VnmcL90HNS206qxLr93DADr1H+NTLYuO53OmMWtkdTlmJ3H3FW1YiJTt+bGM+2aytCcx2sQkzlyXPsM4A/KtHeyZ6HaMAmvNmtWejDYN7b2dmxzgA1OZd0eWzkdM1TlIU+WrAn7ox6+tKr54zwue1MZdaYjAJySKcjkJkH5T0BqlFIGBBxipoHZ5OpGSMfn1pgW4Q0kp7IOCfX6VMsXBzxkE/lUVvKY45nUZWI4Ve31P481LFIogSbO5Y5Duyeu6kxEATa0eGHBU5x7f/XqiybvM44BOCf1rQUMswLYweevX61n3J4LKf3QXC47nPJqSyIyjcFXDN0AzxTzcOOBgA9BntUMMQQqvWRsHj+HNGRvJk65yR0yPSnYLkivuAYOSOwzUoIb7+M9snrUEJ80lgcKo54/LFTyLghgvz45HUKfSgBZDhQuSCe3r71CZGQ/d3egIzn6VIqSMjlxtOMhj3/CmxuVUjdhfWmA1mYybXjT69gabh8gpKenpipto+8g5+vWn7VBBAGHG5f9k0hkIZx3ZvoaWWb5QZMYPQkdKldNvzBT6k0jR7037gwHPXp70yWxsU7YwGHsQKvWcvPTOTgFWwDVBYihyRgenap4IyD3K/WmiWzchUhxgBQeQN2abq582zkjzgAcY9O9MtnQhFbIK4zin3LhmZNoPHC+vFWlqZS2Oajtt0rluuOT71HOwjwB+Bqw90hlcBGBIJBPPSs+bcydjyTxzXWloee9zjHldhy2B6Coi5HXn60FcdTTcgdq0KAMu7kY9e9WIY0LHZI3zLzleg+uarZGec49qckm0EKuB9eT+NJjR19pOHkZNx5RSPatjzdyR/7IBYfhXL6RkiIuxy2FyOmP8mt4Sb5pHXAVmPX0zgVwTjZnfCWgGT5t56g8Y+tOknCphVG5sZ9T7fSmBlIyATg/nUa8ucn5s9MdOamxdyeJ13kHoOTUkNx5cijkEj8qpg/vGx6ZOO1Cn5t3I5wKYjXhcFnLHCMuD9aLZyI54G+7IMj0GKrrKFyMEBo859zUlt++2Fs7SSp5xmk0NM0sBlznIHLHt0rORPOnMePk+VsHue9WoZCbeVQwBJ/i6YH/AOuoImKXezOUZ1TI7cVBSKx/4+RI55MgG7HQnrVeRSpdSo3AfNk5NWl5uMSHbyTkj0Of6U62jJZpZFB8v5sHuff8cUANjItx5YILnAOOxxkn8BUiEK0pYk5OearXRIVEUfvJySzEdj2p8hJWMr94qCR6jOP8aaGybJ8zcDwwIJPPBqHndtYhcVCjfuZl6mNxjd6HrTRJuRgOueDimJFnOHwMhDzg1OxxGgX5sDLKeTg5/wDrVTjcPGeVHPOD0pkM+LjzWbC5P4A8YpWC5dSbCRjOAowQehGePoaklUJgxg5VsPGx5/A/Sq4VlEyNyOzL2qVZGZwQcsoXIB6jof51SJY+Y+W0ezhSuV44x0qRQpwVbg84HrSSBVRk3HCN19RSWyjAG4EKOSfSmSX4TjA4BwCSR+dO1MiKPzGY7R0OM4J6UsaLlCTgEYVRzj3o1Ng9tLGhC4P4EZ6Va3M5HKXJlTUcHftORvU8NkdxWK9wY3MbNKhUngOR3rb1wNC0r7CXVsqB16f5NclPP5ku9m5ZQTz09a7KbOSoioSRkUm/qPXtTGfAqJpPSqJuT7gOqqw9DTwVMUgTIUFTgjnvVPzDTkYn6UBc6XR5o/JgQ4XaAVPbJPr68VrLL98NtJ39R0xn0rk7WdWiEKHay5IDH73fAPrWrDcEyZI+YqfzIrmnDU6qcro0xKqo43A7WwPxpzMxjznJz8xrNExGGPXdnp1xVlZD5SLnnqQKycTW5ZjlB3gD0P0xUkjY2kHJYZFUoCNjNnlmVc+3J/pT4ZWkmRSR8hzj19qVirmnM2UgydoaPgjvz/8Arq7bOVRVYD5XBz68Yzis9XE1gQTzbuTkjscf41aBO1C3XBJPbOOoqWFySyLi4ZSTkJwf7oYen4UQfNMueods49s4p8YCTSHPG3qOvNQeaEmV0bBYHGfUCoaLTLDAPPICMHOcEeop0GCkilgSygKfQZ6/pReKZA8sTYYpuXjGehFOhfzHDrhd8eQPUen86QyhdEQPJI2Qqe33T61JImYUKgMh4B/ut979ealvU82HcflkJ+dfxqLScZu4JAfLdgwB7YHamBXuWMR81gSkhweOlRgEMXjYHYe39R/nrWnJAn2SVHBZSobn+HnGfwrMuUMF2GcKucK+O57fpTQMlZQN4RQo53nGAR1BqoFYhXiU4Y8qe1W512QlyqlZCBzzntVV3ztXB3KGwM9cVRJoxf6tY88OmBj1B4z/ACpwysoYfeCYPHWoohlZBuwiYYH0GKVHWU7Srbs9aBMkdcFgcgEDA/CpYRtCktwTzgZPvTZU/dwYzgrkknnrU8AG8kn92o7rycUxM0oZFRi4JVUXBY9j6VTuWE97skwUJAOD6+v+NPWaUAtINzAAKpHAz3xVNZgb5WxlRlyx78Hj6VaM2ZGvSnDrcxpPsJwJOmB2GMEEVy51ZYpPNtlcJnmIspH0PHT3rrtRT7RaySbCxZd2Ac71PGMeuO9cDd2xtJim0MvVHY8EdjiummlY5pt3KhpD0paQg1oYht44P4UoB29+Kbg5qWOMsOc4/nTAdAvzBjgc9+9accrKVAxms88dKs7xNlh8vOfpUTRpBl9pYwkec5GSBjHU+tTJcZ2nKr2xWeQzjceoGDUiAMAOjjnH94e1ZOKN1JmgTtB/TnvQNwmRxneeSPSq0bggqBz1FSNJvhPBHY+1TYu5r2MilJVLAgjJHcjGCB/P8KswS7beWPcd0e05z2PTFYls5VGK5yoAyKvRSqrshYOrp0HB4P8Ak1nJFJmy3LOFbAKA7c9/amWrMxCgDK/Mhx1BBHWkfLQO4zuAxkVHbyu1qhZQCHzg+oByKzLTNCLMsUDbAp24GTg5Hb+lNz9mmG5C0IwwB7ZPI/DNRW1wWjEe7JVhIu7jB9P1FTDFxalTxKgyyjvz1xUFkj8vtLKWwQuDgSDHB+tZ4UrMHQ4LNt6dTzU52NaBWUqYyCpHYdc/h/WmzSsjrOACxBJxwCf/ANVAItqRJFE2f+WZjdTx34/rWPf72CFhlVIBfHGB0/nWvCcq7AcbW79Ociq11GDPnaSsygsuO+cGmhkEQzGsHcgSL7jOMUxYiDIxBABBPv6/0oiKwlI8n9x8h3c/rU0rDymABLlz0PDccVRLFtxvlcFgF8vBB9+lAPk2wVQWd2IP046fzoAWJ1YdSAcD+LFNZ/8ASR1O12bJ9een6UyS/krGOxwvUevanWjmUPgbzjqR2xUbggRrJkOEBBPrii2IjVo8YHl7iRTRLYsVxmNyWCsWI+ZegA5/rVG6iYQNEs0Rk27FCvlsZy1SyygQKyDJB7ng8Y/xpI4dumtMyLnfu3Z7A8gH9c1rFGUmZs9wocRozmNisWwnnb3I7Z5Brjbi/mlT7PdgO0WQsjL8wOe/rWlfXapqkbLloMg7T2Oex7GsO4m86ZnIxn3zXRBHNN3HbaQrUwiY9eKkWML9a0IIYoO7j6CpTTzxUZpARNUlo22Xaeh65pjcikQ7XVh1BoeqGnZm0qBfkcYV1+UgdajlJjVcglR94Acr/tVJM2+0AIzt4GPSo1c/ITgqwz7g1gdCCM4kLI3qeOhq4ApY870I6gcj2PrVCVGUh4zg5Bx/Ue1TR3SGUGUYz94jof8ACk0NMsAKFJR8g44I2n9afEHFxblTjYwUnPaonZogC2Xgboy8/mKkiX94sqNx94+4FQ0aI3bdy9pIjfeXHTtgVVikffHmTiNvmAHHPrSRz+UeT8hLOSPQ4H9KRYcTMjAZT5UZT1B//V+tZWLuWrdtqBxypOCCMbfUfStBZxa3mCoZuGB6Zz1H5VntiBDGH/gwp9WPPNLdgecEEgVkCgHGegxioaNEy7c5EheMnYCCuR94c5FJDHHMpgU4O/8AdgnPI5I/KohKxHzE4DBQevOOR+n61LKyWtxHMuQk4wP9lwOKVhlvYggZWUhZY9np6gVDcuz27YADQsmeePr+v6VanfiKM84URMSejj09smorhXV2ZTvW4jHuNwJyP8+lJMZlyqXnnYDcCM49SKniTzIyvBZJBxj1FNhcFFZsjLEMD1p8LrA8ucozDBHvnH+frVohixffLuwKJkBvXOBRsDXhicAt91cdyOcf59aaQHhIJxkgHHrQjEyfagMf8tAQfSqJLV0rM0TOeFTafr/+qk+U5LOwQdVjxnH+RU10OPOUEo4BYAdM9/pWXfs7xrbwHh2ZpWZSPlXsPUfzq4q5nJjoA0xMYbKgg4q5eER3dtk4glLxgY4BwP8ACqVvOnmJFGwKEEFmPPA6fpUeo3QuIZ4UYLIirOoY/KACVYZ7HkGtLambZxOpDytQ2424559eR/Ss0CruoyNNcEupUjjmoBHmulbHM3qWhzS/WkHNOpiEPT3qJqlIBPSo3UjPekwGckGmEU/kUvBHNMCeG8aM5IByADkelT5Vl+Q/L191rOIwadHKY2wc47EdR/iKzcS4yNAvhgrrkhMe4NKIw0QZGVj/ABD+tMD72OcNuGVYc8VKYggyCQD6dDUWNUxIDNHgIDtParUbGMOsy7S3HHPHXI/SqLK2SRkirMDt5Sbjxkht39KlopM0IQWJhYgxouSwH8Pf+dXYJsEOoYbNqEg9MdDz+RrNtpUl3BpNvUg4/LP0qwJHYjDKST0J4IrNo0TNEq0gDSMRggn1ximznct0rKd6ksOOeG//AFVFFKRtDcMeCCeMVZk3CQ+YB8ww+P8AP0rJo1T0GWKPcaazyKv7twzN354B/CrhbfCqyxg+XiRQT95h0H4motOdowkRUFZCVbI/AH9KmVl8tIznhsK2O/JH45HT3qXuUnoSWEyTaXKzkF4pFLE9cmnmVnQgtjB3r+J6H8ar2nln7aFUBZot2OykYP8AjUAn3TPtGFAGDnqcf1qepS2HB4nnhfp5j4Kk8eh5oKOGdWU5UEbux9x7VXkLB1MTFU84MTn7p7j6YFNsrhZJHjbIGM4zwM9vp/KtI7GctzThjBCBwfMch9vHA+tRacm2N45eMEpk/wB08gfnTY9wZVyCAvBPfmpYoB5jrwNzZB657g/0qiWOlvTHaqy8tETE4PHHpUGqsLWBVjJCtHnBAYKOpznuelM3maE+XkM0mWYDPTgZ+uao6+Z5Jhc2siy25XafL+YLhujCtaauzCpKyKkE5LDKqP3UjHb2JrN1O6aLUmmt3KkgBj+PSrCSjkrGqkg5wTg1l3YBuJMA9a6VFHNzsrvtdyQgTJ6KeB9Kci0AelPX8aokeYnB4waCjDqKmyCO+e1Jn3oGQZpDzU5APUUzywTwaAIHUsSSeaZyDyKsEFe1MYAigCI8imEU8gjik9qACCRo3AH3c5x71uQIZ0GPvEdfWsEjmt7RpQyD8qymrGtN9AktpIyfMXB+tQvHxhfXOc108cYniKtzxxxWReaWyqWj+Yf3cdKzualFX8pjuXqOPUVN5wURAHDYzkcCq4U4AYEgccmpTA/ykDgAcYpMuJpWjgXcTk9WywPpitIMWDA8qBkOD0I4OfwrGhBVA7LzH8v+8D1q3aTvFcKpHAIU+4Pr+FZSRoi4srfuQDtkK7kzyGYEnH41M2y4LqHwu7zBjO5e/T1HNZ80qrdyRKdhyAvJ4HYgVMH2YlXBZwQyDsc81Fiky3DMFJmxsjVHEin1Ix+tZ8zIJV8sYG3KjPUVYck20as2VlJRvfHQ/hxWZJKVaIbyDgKQememaSjqO5dmcG2kZMnzER/l9j3/AM96oQDZdLLkYCjIA6qSP6VZWZnimjyiuoCKQP4gf6iqckyxSeYFdJHTbwufxxWkV0IbNssjTBFKkgYUgZBwP8/lVu0lXy1JYEKxXp3z2rFtZI3KqVwyr64yAO/pSHUPIdhJG53LnaTkY9aai2Q5JFnUp2jd2tol2OxVkJwQw6ce3PFYkNy8aPESQWOVdTgqfwrS1GYyTRyhPMtZkRXAPRsZzn+RNZbRCKbapLRkZRwPvD/PWuqnFWOSpJ3HghyHwAD6dKzLkEzPn1rSJI7YrNlG6QkevetjFEQGacKAMEcUoHegZaUDPPaoyMVI2e9NqShn0oA7mn0UAIcgVGyK3tUh5OKjbIPrQBG8TY6Z+lV2BB5FXcmkYK3UZoApGtDR5Ns+0/UVWaAH7h/A0kZaCZXwRg1MldFRdmdxZv096uvGJQCSQSRyp6Vl2TiRFZDkEZBrXt2G3aawN7mdc6aqQvMqHKAt06n0pIbeO4hWaNTtK4x6GttOQeme9IsCquEAVR2FS0UpHOz2pVsKepyCehqJotw+YZZSN3rx0robi33g8Aj3rONqySHdnPUH2qbFqRRIzIJCAWj5Ge/sahEvJjDkKx3xt1ye49v/AK1WZ4XMm8kYLYINRzwLsHrnHHakoj5kSRXKmNdxGCzsT6ccH9KingWdonRguATjPHGaZGcnbGvWNlA/CnvPFbkRznEYZVRv7vv9M4o5ewufuVbYSGG5DDfhQwIPUg/5NU76YPEs6L84GHb29cU43cbSO8Enly4OEL7VDA9B6j8aS7dXcNlBJ/EsbjGe/HQfStYwdzOVRWKKXEtuHjPJcZYE9f8APWppJA3luXY7l45+ZfY+opjFmOHGFwBwPyqQq2xFJ3IM7D9eordROdyY5mG4E5BCryO9WLYoU8qQnYckOP4G/wADVcJ1+704JqUBc8FfatEjJsWQ4Q5xkenNUSoHIJOetXZAGjYr0HvVXaTgDtTEho6YIBpMDJqTbxTSvWgdyZuvtSZAGaV+tDDAFQUNNIeDS9c59KbIPmH0oGBPpyaTAI5/Wgk/rR2oACvXB/Pmm7SOoP4c1Igy6A9DSnoKAIj2/pRt4qZBlwD60UCuSWV/PacL88f9xv6HtXRWGs2cwAaQQv02yHH69DXLGmsAeCMipcUylJnoMV3bbcm5gH/bRf8AGlOp2MYBe9th/wBtRXmEwCyEAAfhTBS5EVzs9Lk13Sl638H4HNVJ9e0pgSt0CV5yEY/0rgcmpOlvx3fB/Kl7ND9ozrJ9a01shJXbv/qjVK51mz5CmU/8A/8Ar1zeTnrTWo9mg9ozoI9ZtBIpRJAQc4YCqNzcPMQ46AbAvbiqEI+Y1fhA8mTgVSgkS5tkYGWZsAE84HanLEMH1pU7/wC7VlAODirSM2yOON8HA2579Mip4ogMrI2Ef7wx09CKUdM0vXrzzTsK4fZ4wcEknofQ1KLaBgOCM8g+tRMSzZPJPWnDgDFNCYG3WPmMkqeCrVWdQGIJANWWYgjnqDmoLj7yH1HNUJDCBzx+mKYykn1qRBuYA8jJqYABD9aAuf/Z";
      }
      const face = new zt(new Ke(5.2, 7.5, 64, 92), new Te({
        transparent: true,
        depthWrite: false,
        uniforms: { uTex: { value: ftex }, uA: { value: 0 }, uTime: { value: 0 } },
        vertexShader: `uniform sampler2D uTex; varying vec2 vUv; varying vec3 vP;
void main(){ vUv=uv; vec2 q=(uv-vec2(0.5,0.5))*2.0; float r=length(q*vec2(1.0,0.95));
 float bulge=sqrt(max(0.0,1.0-r*r));
 float l=dot(texture2D(uTex,uv).rgb,vec3(0.3,0.59,0.11));
 float h=bulge*1.5+(l-0.45)*0.5*bulge;
 vec3 p=position+vec3(0.0,0.0,h);
 vec4 mv=modelViewMatrix*vec4(p,1.0); vP=mv.xyz; gl_Position=projectionMatrix*mv; }`,
        fragmentShader: `uniform sampler2D uTex; uniform float uA; uniform float uTime; varying vec2 vUv; varying vec3 vP;
void main(){ vec3 c=texture2D(uTex,vUv).rgb; float l=dot(c,vec3(0.3,0.59,0.11));
 vec2 q=(vUv-vec2(0.5,0.5))*2.0; float d=length(q*vec2(1.0,0.95));
 float m=1.0-smoothstep(0.8,1.0,d);
 vec3 n=normalize(cross(dFdx(vP),dFdy(vP)));
 float diff=max(dot(n,normalize(vec3(-0.45,0.55,0.7))),0.0);
 float rim=pow(1.0-abs(n.z),2.0);
 vec3 tint=mix(c*vec3(0.85,0.62,1.15),mix(vec3(0.10,0.02,0.32),vec3(0.9,0.62,1.0),pow(l,1.1)),0.45);
 vec3 col=tint*(0.5+0.85*diff)+vec3(0.5,0.3,1.0)*rim*0.9*(0.8+0.2*sin(uTime*3.0));
 gl_FragColor=vec4(col*1.15,m*uA*0.96); }`
      }));
      face.renderOrder = 20;
      g2.add(face);
      const halo = new zt(new Ke(12, 12), new se({ map: Fn([[0, "rgba(170,110,255,.85)"], [0.5, "rgba(110,60,230,.35)"], [1, "rgba(60,20,160,0)"]]), transparent: true, depthWrite: false, blending: Ee, opacity: 0 }));
      halo.renderOrder = 19;
      g2.add(halo);
      const gring = new zt(new Ke(R2 * 2.3, R2 * 2.3), new se({ map: Fn([[0, "rgba(0,0,0,0)"], [0.74, "rgba(120,70,255,0)"], [0.87, "rgba(200,140,255,.6)"], [0.96, "rgba(0,0,0,0)"]]), transparent: true, depthWrite: false, blending: Ee, opacity: 0 }));
      gring.rotation.x = -Math.PI / 2;
      gring.position.y = 0.12;
      g2.add(gring);
      const lt2 = new cn(10676479, 0, 26, 1.8);
      lt2.position.y = 3;
      g2.add(lt2);
      const cols = [16729156, 16766720, 5635925, 5636095, 16733695, 16744192];
      const figs = [];
      for (let i2 = 0; i2 < N2; i2++) {
        const f2 = new pe(), c2 = cols[i2 % cols.length];
        const mat = new ae({ color: c2, emissive: c2, emissiveIntensity: 0.35, roughness: 0.6 });
        const body = new zt(new Dn(0.34, 12, 9), mat);
        body.scale.set(1, 1.5, 1);
        body.position.y = 0.55;
        f2.add(body);
        const head = new zt(new Dn(0.24, 12, 9), new ae({ color: 16764057, roughness: 0.7 }));
        head.position.y = 1.35;
        f2.add(head);
        const hat = new zt(new Dn(0.26, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat);
        hat.position.y = 1.42;
        f2.add(hat);
        const arms = [-1, 1].map((sd2) => {
          const p2 = new pe();
          p2.position.set(sd2 * 0.3, 1, 0);
          const a2 = new zt(new Dn(0.09, 8, 6), mat);
          a2.scale.set(0.7, 3.2, 0.7);
          a2.position.y = 0.3;
          p2.add(a2);
          f2.add(p2);
          return p2;
        });
        f2.userData = { ang: i2 / N2 * Math.PI * 2, delay: i2 / N2 * 0.55, arms, ph: i2 * 1.7 };
        g2.add(f2);
        figs.push(f2);
      }
      const sh2 = { on: false, x: 0, z: 0, r: 0 };
      u.shield = sh2;
      let st2 = "idle", T2 = 0, cd2 = 0, sc2 = false, fa = 0, faI = false;
      const btn = te("btn-shield");
      const ease = (k) => k <= 0 ? 0 : k >= 1 ? 1 : k * k * (3 - 2 * k);
      function setBtn() {
        if (!btn) return;
        let tx2 = "\u{1F6E1}", on2 = false, dis = false;
        if (st2 !== "idle") {
          tx2 = "\u{1F6E1} " + Math.max(0, Math.ceil(DUR - T2));
          on2 = true;
        } else if (cd2 > 0) {
          tx2 = "\u{1F6E1} " + Math.ceil(cd2);
          dis = true;
        }
        if (btn.textContent !== tx2) btn.textContent = tx2;
        btn.classList.toggle("on", on2);
        btn.style.opacity = dis ? ".45" : "1";
      }
      const api = {
        get active() {
          return st2 !== "idle";
        },
        activate() {
          if (st2 !== "idle" || cd2 > 0 || f.dead > 0) return false;
          faI = false;
          sh2.x = l.x;
          sh2.z = l.z;
          sh2.r = 3.5;
          sh2.on = true;
          g2.position.set(l.x, 0, l.z);
          g2.visible = true;
          st2 = "build";
          T2 = 0;
          sc2 = false;
          lt2.intensity = 0;
          h.scatterNear(l.x, l.z, R2 + 3);
          return true;
        },
        update(dt2, t2) {
          if (st2 === "idle") {
            if (cd2 > 0) cd2 = Math.max(0, cd2 - dt2);
            setBtn();
            return;
          }
          T2 += dt2;
          if (!sc2 && T2 >= ARR) {
            sc2 = true;
            h.scatterNear(sh2.x, sh2.z, R2 + 2);
            sh2.r = R2;
          }
          const grow = ease((T2 - ARR * 0.7) / GROW);
          const fade = T2 > DUR ? Math.min(1, (T2 - DUR) / FADE) : 0;
          dome.scale.set(1, Math.max(1e-3, grow * (1 - fade * 0.6)), 1);
          dome.material.uniforms.uA.value = grow * (1 - fade);
          {
            const tg2 = Math.atan2(s.position.x - sh2.x, s.position.z - sh2.z);
            if (!faI) {
              fa = tg2;
              faI = true;
            }
            let df2 = tg2 - fa;
            df2 = Math.atan2(Math.sin(df2), Math.cos(df2));
            fa += df2 * Math.min(1, dt2 * 3);
            dome.material.uniforms.uFace.value = fa;
          }
          dome.material.uniforms.uTime.value = t2;
          grid.scale.copy(dome.scale);
          grid.material.opacity = 0.85 * grow * (1 - fade);
          {
            GG.scale.set(0.8, 0.8 * Math.max(1e-3, grow), 0.8);
            GG.rotation.y = fa;
            gm2.opacity = 0.8 * grow * (1 - fade);
            pm2.opacity = 0.35 * grow * (1 - fade);
            face.material.uniforms.uA.value = grow * (1 - fade);
            face.material.uniforms.uTime.value = t2;
            const fy = 7.6 * Math.max(0.15, grow), fz = -3.8;
            face.position.set(fz * Math.sin(fa), fy, fz * Math.cos(fa));
            face.quaternion.copy(s.quaternion);
            face.rotateY(Math.sin(t2 * 0.9) * 0.38);
            face.rotateX(-0.1 + Math.sin(t2 * 0.7) * 0.1);
            halo.position.copy(face.position);
            halo.quaternion.copy(s.quaternion);
            halo.material.opacity = 0.55 * grow * (1 - fade);
            gring.material.opacity = 0.9 * grow * (1 - fade);
          }
          lt2.intensity = 10 * grow * (1 - fade);
          for (const f2 of figs) {
            const d2 = f2.userData;
            const k = ease((T2 - d2.delay) / 0.8);
            const rad = R2 + 9 - 9 * k;
            f2.position.set(Math.cos(d2.ang) * rad, 0, Math.sin(d2.ang) * rad);
            f2.rotation.y = -d2.ang - Math.PI / 2 + Math.PI;
            const working = T2 < ARR + GROW;
            const up2 = working ? 2.7 + 0.45 * Math.sin(t2 * 9 + d2.ph) : 2.4 + 0.25 * Math.sin(t2 * 3 + d2.ph);
            d2.arms[0].rotation.z = -up2 * (k > 0.95 ? 1 : 0.2);
            d2.arms[1].rotation.z = up2 * (k > 0.95 ? 1 : 0.2);
            f2.position.y = k < 0.95 ? Math.abs(Math.sin(t2 * 14 + d2.ph)) * 0.18 : working ? Math.abs(Math.sin(t2 * 7 + d2.ph)) * 0.08 : 0;
            const s2 = 1 - fade;
            f2.scale.setScalar(Math.max(1e-3, s2));
          }
          sh2.r = T2 < ARR ? 3.5 : R2 * (fade > 0 ? Math.max(0, 1 - fade) : 1);
          if (T2 >= DUR + FADE) {
            st2 = "idle";
            sh2.on = false;
            sh2.r = 0;
            g2.visible = false;
            cd2 = CD;
          }
          setBtn();
        }
      };
      return api;
    })();
    let FX = (() => {
      const g2 = new pe();
      o.root.add(g2);
      const list = [], sph = new Dn(1, 10, 8), cyl = new sn(0.05, 0.05, 1, 6, 1, true);
      return {
        pop(x2, y2, z2, col, sz, dur) {
          const m2 = new zt(sph, new ae({ color: col, emissive: col, emissiveIntensity: 2, transparent: true, opacity: 0.8, depthWrite: false }));
          m2.position.set(x2, y2, z2);
          m2.scale.setScalar(0.3);
          g2.add(m2);
          list.push({ m: m2, t: 0, dur: dur || 0.45, sz: sz || 1.5, k: 0 });
        },
        beam(a2, b2, col) {
          const dx2 = b2.x - a2.x, dy = b2.y - a2.y, dz = b2.z - a2.z, len = Math.hypot(dx2, dy, dz) || 1;
          const m2 = new zt(cyl, new ae({ color: col, emissive: col, emissiveIntensity: 3, transparent: true, opacity: 0.9, depthWrite: false }));
          m2.scale.set(1, len, 1);
          m2.position.set((a2.x + b2.x) / 2, (a2.y + b2.y) / 2, (a2.z + b2.z) / 2);
          m2.quaternion.setFromUnitVectors(new Y(0, 1, 0), new Y(dx2 / len, dy / len, dz / len));
          g2.add(m2);
          list.push({ m: m2, t: 0, dur: 0.14, k: 1 });
        },
        update(dt2) {
          for (let i2 = list.length - 1; i2 >= 0; i2--) {
            const e2 = list[i2];
            e2.t += dt2;
            const k = e2.t / e2.dur;
            if (k >= 1) {
              g2.remove(e2.m);
              e2.m.material.dispose();
              list.splice(i2, 1);
              continue;
            }
            if (e2.k === 0) {
              e2.m.scale.setScalar(0.3 + e2.sz * k);
              e2.m.material.opacity = 0.8 * (1 - k);
            } else e2.m.material.opacity = 0.9 * (1 - k);
          }
        }
      };
    })();
    let BAR = (() => {
      const g2 = new pe();
      o.root.add(g2);
      const pg2 = new Ke(1, 1);
      return { make() {
        const bm2 = new zt(pg2, new se({ color: 0, transparent: true, opacity: 0.7, depthTest: false, depthWrite: false })), fm2 = new zt(pg2, new se({ color: 7274347, transparent: true, depthTest: false, depthWrite: false }));
        bm2.renderOrder = 40;
        fm2.renderOrder = 41;
        g2.add(bm2, fm2);
        const b2 = {
          set(x2, y2, z2, ratio, w2) {
            const e2 = s.matrixWorld.elements;
            ratio = Math.max(0, Math.min(1, ratio));
            bm2.position.set(x2, y2, z2);
            bm2.quaternion.copy(s.quaternion);
            bm2.scale.set(w2, w2 * 0.16, 1);
            const fw = w2 * 0.94 * ratio, off = (w2 * 0.94 - fw) / 2;
            fm2.position.set(x2 - e2[0] * off, y2 - e2[1] * off, z2 - e2[2] * off);
            fm2.quaternion.copy(s.quaternion);
            fm2.scale.set(Math.max(1e-3, fw), w2 * 0.1, 1);
            fm2.material.color.setHex(ratio > 0.55 ? 7274347 : ratio > 0.28 ? 16756794 : 16728128);
          },
          show(v2) {
            bm2.visible = fm2.visible = v2;
          },
          dispose() {
            g2.remove(bm2, fm2);
            bm2.material.dispose();
            fm2.material.dispose();
          }
        };
        return b2;
      } };
    })();
    let DOG = (() => {
      const g2 = new pe();
      o.root.add(g2);
      const mb = new ae({ color: 11565637, roughness: 0.8 }), mc2 = new ae({ color: 15983296, roughness: 0.8 }), md2 = new ae({ color: 5913120, roughness: 0.8 }), mk = new ae({ color: 1381653, roughness: 0.5 });
      const sp2 = (geo, m2, x2, y2, z2, sx2, sy, sz, par) => {
        const q2 = new zt(geo, m2);
        q2.position.set(x2, y2, z2);
        q2.scale.set(sx2, sy, sz);
        (par || g2).add(q2);
        return q2;
      };
      const G1 = new Dn(1, 10, 8);
      sp2(G1, mb, 0, 0.62, 0, 0.46 * 1.5, 0.46 * 0.85, 0.46 * 0.85);
      sp2(G1, mc2, 0, 0.55, 0.35, 0.3, 0.28, 0.3);
      sp2(G1, mb, 0, 0.98, 0.62, 0.3, 0.3, 0.3);
      sp2(G1, mc2, 0, 0.9, 0.92, 0.15, 0.12, 0.2);
      sp2(G1, mk, 0, 0.95, 1.1, 0.06, 0.05, 0.05);
      sp2(G1, mk, -0.12, 1.04, 0.86, 0.035, 0.035, 0.035);
      sp2(G1, mk, 0.12, 1.04, 0.86, 0.035, 0.035, 0.035);
      sp2(G1, md2, -0.2, 1.2, 0.58, 0.1, 0.2, 0.08);
      sp2(G1, md2, 0.2, 1.2, 0.58, 0.1, 0.2, 0.08);
      const legs = [[-0.2, 0.38], [0.2, 0.38], [-0.2, -0.38], [0.2, -0.38]].map(([x2, z2]) => {
        const p2 = new pe();
        p2.position.set(x2, 0.5, z2);
        g2.add(p2);
        sp2(G1, mb, 0, -0.22, 0, 0.1, 0.3, 0.1, p2);
        sp2(G1, mc2, 0, -0.46, 0.03, 0.11, 0.06, 0.14, p2);
        return p2;
      });
      const tail = new pe();
      tail.position.set(0, 0.85, -0.62);
      g2.add(tail);
      sp2(G1, mb, 0, 0.2, -0.05, 0.07, 0.26, 0.07, tail);
      tail.rotation.x = -0.7;
      g2.scale.setScalar(1.1);
      g2.visible = false;
      const D2 = { x: 0, z: 0, yaw: 0, hp: 40, max: 40, state: "follow", t: 0, active: false, on: true, down: 0, bait: 0, biteT: 0, ph: 0, sp: 0, inited: false };
      const bar = BAR.make();
      bar.show(false);
      h.dog = D2;
      const btn = te("btn-dog");
      function say(m2) {
        try {
          Zs(m2);
        } catch (e2) {
        }
      }
      function mv(tx2, tz, spd, dt2) {
        const dx2 = tx2 - D2.x, dz = tz - D2.z, d2 = Math.hypot(dx2, dz);
        if (d2 < 0.05) return 0;
        const st2 = Math.min(d2, spd * dt2), nx2 = D2.x + dx2 / d2 * st2, nz = D2.z + dz / d2 * st2;
        if (o.walk.ok(nx2, nz)) {
          D2.x = nx2;
          D2.z = nz;
        } else if (o.walk.ok(nx2, D2.z)) D2.x = nx2;
        else if (o.walk.ok(D2.x, nz)) D2.z = nz;
        let a2 = Math.atan2(dx2, dz) - D2.yaw;
        a2 = Math.atan2(Math.sin(a2), Math.cos(a2));
        D2.yaw += a2 * Math.min(1, dt2 * 10);
        return st2 / dt2;
      }
      function nearCart() {
        const q2 = o.walk.nearest(l.wx, l.wz) || [l.x, l.z];
        D2.x = q2[0];
        D2.z = q2[1];
      }
      function setBtn() {
        if (!btn) return;
        btn.style.display = D2.on ? "flex" : "none";
        const tx2 = D2.down > 0 ? "\u{1F415} " + Math.ceil(D2.down) : D2.state === "hunt" ? "\u{1F415}\u21A9" : "\u{1F415}";
        if (btn.textContent !== tx2) btn.textContent = tx2;
        btn.style.opacity = D2.down > 0 ? ".45" : "1";
        btn.classList.toggle("on", D2.state === "hunt");
      }
      const api = {
        D: D2,
        setOn(v2) {
          D2.on = v2;
          D2.active = v2 && D2.down <= 0;
          g2.visible = D2.active;
          if (!v2) bar.show(false);
          setBtn();
        },
        hit(dmg, C2) {
          if (!D2.active) return;
          D2.hp -= dmg * 0.55;
          FX.pop(D2.x, 1, D2.z, 16728128, 1.2, 0.3);
          if (D2.hp <= 0) {
            D2.down = 25;
            D2.active = false;
            g2.visible = false;
            bar.show(false);
            D2.state = "follow";
            say("\u{1F415} Hund ist ersch\xF6pft \u2013 gleich wieder da");
          }
        },
        send() {
          if (!D2.on || D2.down > 0) return;
          if (D2.state === "hunt") {
            D2.state = "follow";
            return;
          }
          let best = null, bd2 = 40;
          for (const C2 of h.list) {
            if (C2.T.fly || !C2.g.visible) continue;
            const d2 = Math.hypot(C2.x - l.x, C2.z - l.z);
            if (d2 < bd2) {
              bd2 = d2;
              best = C2;
            }
          }
          let px2, pz;
          if (best) {
            const a2 = Math.atan2(best.x - l.x, best.z - l.z), dd2 = Math.max(4, bd2 - 3);
            px2 = l.x + Math.sin(a2) * dd2;
            pz = l.z + Math.cos(a2) * dd2;
          } else {
            px2 = l.x + Math.sin(l.yaw) * 10;
            pz = l.z + Math.cos(l.yaw) * 10;
          }
          const q2 = o.walk.nearest(px2, pz) || [l.x, l.z];
          D2.x = q2[0];
          D2.z = q2[1];
          D2.state = "hunt";
          D2.t = 18;
          D2.bait = 6;
          D2.active = true;
          g2.visible = true;
          FX.pop(D2.x, 0.8, D2.z, 16777215, 2.8, 0.5);
          FX.pop(D2.x, 0.8, D2.z, 16733525, 1.7, 0.35);
        },
        update(dt2, t2) {
          if (!D2.inited) {
            D2.inited = true;
            nearCart();
            D2.yaw = l.yaw || 0;
            D2.active = D2.on;
            g2.visible = D2.on;
          }
          if (!D2.on) {
            setBtn();
            return;
          }
          if (D2.down > 0) {
            D2.down -= dt2;
            if (D2.down <= 0) {
              D2.hp = D2.max * 0.6;
              nearCart();
              D2.active = true;
              g2.visible = true;
              FX.pop(D2.x, 0.8, D2.z, 16777215, 2.2, 0.5);
            }
            setBtn();
            return;
          }
          if (D2.bait > 0) D2.bait -= dt2;
          D2.biteT -= dt2;
          let spd = 0;
          if (D2.state === "hunt") {
            D2.t -= dt2;
            let best = null, bd2 = 35;
            for (const C2 of h.list) {
              if (C2.T.fly || !C2.g.visible) continue;
              const d2 = Math.hypot(C2.x - D2.x, C2.z - D2.z);
              if (d2 < bd2) {
                bd2 = d2;
                best = C2;
              }
            }
            if (!best || D2.t <= 0 || !h.enabled) D2.state = "follow";
            else if (bd2 > 1.7) spd = mv(best.x, best.z, 8, dt2);
            else {
              D2.yaw = Math.atan2(best.x - D2.x, best.z - D2.z);
              if (D2.biteT <= 0) {
                D2.biteT = 0.9;
                FX.pop(best.x, 1, best.z, 16764714, 1.4, 0.25);
                ATK.hit(best, 7, "dog");
              }
            }
          }
          if (D2.state === "follow") {
            const dx2 = l.wx - l.x, dz = l.wz - l.z, tx2 = l.wx + dx2 * 0.6, tz = l.wz + dz * 0.6, d2 = Math.hypot(tx2 - D2.x, tz - D2.z);
            if (d2 > 40) nearCart();
            else if (d2 > 2.2) spd = mv(tx2, tz, d2 > 12 ? 10 : 5.5, dt2);
          }
          D2.sp = D2.sp * 0.8 + spd * 0.2;
          D2.ph += dt2 * (3 + D2.sp * 1.4);
          g2.position.set(D2.x, 0, D2.z);
          g2.rotation.y = D2.yaw;
          const sw = Math.sin(D2.ph) * Math.min(0.8, D2.sp / 6);
          legs[0].rotation.x = sw;
          legs[3].rotation.x = sw;
          legs[1].rotation.x = -sw;
          legs[2].rotation.x = -sw;
          tail.rotation.z = Math.sin(t2 * (D2.state === "hunt" ? 22 : 9)) * 0.5;
          g2.position.y = Math.abs(Math.sin(D2.ph)) * 0.05 * Math.min(1, D2.sp / 3);
          D2.active = true;
          bar.set(D2.x, 2.2, D2.z, D2.hp / D2.max, 1.6);
          bar.show(true);
          if (D2.state === "follow" && D2.hp < D2.max) D2.hp = Math.min(D2.max, D2.hp + dt2 * 2);
          setBtn();
        }
      };
      return api;
    })();
    let ATK = (() => {
      const W2 = [{ n: "Faust", ic: "\u270A", dmg: 6, rng: 3.4, cd: 0.45, need: 0 }, { n: "Schwert", ic: "\u{1F5E1}", dmg: 18, rng: 4.8, cd: 0.6, need: 10 }, { n: "Pistole", ic: "\u{1F52B}", dmg: 12, rng: 28, cd: 0.35, need: 30 }];
      const HP = { spider: 30, blob: 40, stilt: 70, eye: 35, bat: 18 };
      let cur = 0, cdT = 0, all = false, lastN = -1, acc = 2, kills = 0;
      const ab = te("btn-atk"), wb = te("btn-weapon");
      const correct = () => {
        try {
          return al(Xn);
        } catch (e2) {
          return 0;
        }
      };
      const avail = () => {
        const n2 = correct();
        return W2.filter((w2) => all || n2 >= w2.need);
      };
      const cw = () => {
        const a2 = avail();
        return a2[cur] || a2[0];
      };
      function ensure(C2) {
        if (C2.max === void 0) {
          C2.max = HP[C2.type] || 30;
          C2.hp = C2.max;
        }
      }
      const api = {
        W: W2,
        get kills() {
          return kills;
        },
        setAll(v2) {
          all = v2;
          cur = 0;
        },
        hit(C2, dmg, who) {
          ensure(C2);
          C2.hp -= dmg;
          if (C2.hp <= 0) {
            FX.pop(C2.x, 1.2, C2.z, 16766720, 3.2, 0.55);
            C2.hp = C2.max;
            kills++;
            if (C2.bar) C2.bar.show(false);
            h.relocate(C2);
          }
        },
        fire() {
          if (f.dead > 0 || cdT > 0 || !h.enabled) return;
          const w2 = cw();
          let best = null, bd2 = w2.rng;
          for (const C2 of h.list) {
            if (!C2.g.visible) continue;
            const d2 = Math.hypot(C2.x - l.x, C2.z - l.z);
            if (d2 < bd2) {
              bd2 = d2;
              best = C2;
            }
          }
          cdT = best ? w2.cd : 0.25;
          if (!best) {
            FX.pop(l.x + Math.sin(l.yaw) * 1.6, 1.1, l.z + Math.cos(l.yaw) * 1.6, 16777215, 1.2, 0.2);
            return;
          }
          l.yaw = Math.atan2(best.x - l.x, best.z - l.z);
          if (w2.n === "Pistole") {
            FX.beam({ x: l.x, y: 1.35, z: l.z }, { x: best.x, y: 1.2, z: best.z }, 16769110);
          }
          FX.pop(best.x, 1.2, best.z, w2.n === "Schwert" ? 11393279 : 16772224, w2.n === "Schwert" ? 2.4 : 1.6, 0.3);
          api.hit(best, w2.dmg, "player");
        },
        cycle() {
          const a2 = avail();
          if (a2.length > 1) cur = (cur + 1) % a2.length;
        },
        update(dt2, t2) {
          cdT = Math.max(0, cdT - dt2);
          acc += dt2;
          const av = avail();
          if (cur >= av.length) cur = 0;
          if (acc > 1) {
            acc = 0;
            const n2 = correct();
            if (lastN >= 0 && n2 > lastN) {
              for (const w2 of W2) if (w2.need > 0 && lastN < w2.need && n2 >= w2.need) Zs(w2.ic + " " + w2.n + " freigeschaltet!");
            }
            lastN = n2;
          }
          if (ab) {
            const tx2 = cw().ic;
            if (ab.textContent !== tx2) ab.textContent = tx2;
            ab.style.opacity = cdT > 0 ? ".5" : "1";
          }
          if (wb) {
            const sh2 = av.length > 1 ? "flex" : "none";
            if (wb.style.display !== sh2) wb.style.display = sh2;
            const tx2 = "\u21BB " + cw().n;
            if (wb.textContent !== tx2) wb.textContent = tx2;
          }
          for (const C2 of h.list) {
            ensure(C2);
            const d2 = Math.hypot(C2.x - l.x, C2.z - l.z);
            const vis = h.enabled && C2.g.visible && d2 < 55 && (d2 < 42 || C2.hp < C2.max);
            if (vis) {
              if (!C2.bar) C2.bar = BAR.make();
              C2.bar.set(C2.x, C2.g.position.y + 2.1 * C2.sc + 0.7, C2.z, C2.hp / C2.max, 2.4);
              C2.bar.show(true);
            } else if (C2.bar) C2.bar.show(false);
          }
          FX.update(dt2);
        }
      };
      return api;
    })();
    h.dogHit = null;
    h.dogHit = (d2, C2) => DOG.hit(d2, C2);
    addEventListener("keydown", (k) => {
      if (window.__quizOpen || k.repeat) return;
      if (k.key === " ") ATK.fire();
      if (k.key === "f" || k.key === "F") DOG.send();
    });
    te("btn-atk").addEventListener("click", () => ATK.fire());
    te("btn-weapon").addEventListener("click", () => ATK.cycle());
    te("btn-dog").addEventListener("click", () => DOG.send());
    let SETM = (() => {
      const SC = n, HEMI = r, SUN = a, REN = t;
      const rows = [
        { k: "q", l: "Qualit\xE4t", o: ["Niedrig", "Mittel", "Hoch"] },
        { k: "spd", l: "Lauf-Geschwindigkeit", o: ["Langsam", "Normal", "Schnell", "Sehr schnell"] },
        { k: "mon", l: "Monster", o: ["An", "Aus"] },
        { k: "atk", l: "Monster-Verhalten", o: ["Angriff", "Friedlich"] },
        { k: "cnt", l: "Monster-Menge", o: ["Wenig", "Mittel", "Viele", "Extrem viele"], n: "Monster pro Bildschirm: 1 \xB7 3 \xB7 5 \xB7 10" },
        { k: "tp", l: "Teleport zu den Zielen", o: ["An", "Aus"], n: "An: sofort dort. Aus: du l\xE4ufst jeden Weg." },
        { k: "day", l: "Tageszeit", o: ["Tag", "Nacht"] },
        { k: "dog", l: "Hund", o: ["Dabei", "Aus"] },
        { k: "wp", l: "Waffen", o: ["Durch Aufgaben", "Alle offen (Test)"], n: "Schwert ab 10, Pistole ab 30 richtigen Antworten" }
      ];
      const SPD = [0.7, 1, 1.5, 2.2], PER = [1, 3, 5, 10];
      const S2 = { q: 0, spd: 1, mon: 0, atk: 0, cnt: 1, tp: 1, day: 1, dog: 0, wp: 0 };
      try {
        const sv = JSON.parse(localStorage.getItem("milo3d_settings") || "null");
        if (sv) {
          for (const k in sv) if (k !== "q" && k in S2 && Number.isInteger(sv[k])) S2[k] = sv[k];
        }
      } catch (e2) {
      }
      const save = () => {
        try {
          const c2 = { ...S2 };
          delete c2.q;
          localStorage.setItem("milo3d_settings", JSON.stringify(c2));
        } catch (e2) {
        }
      };
      const fieldArea = () => {
        const D2 = 110, fov = 38 * Math.PI / 180, asp = 16 / 9, w2 = 2 * D2 * Math.tan(fov / 2), W2 = w2 * asp, H2 = w2 / Math.sin(0.95);
        return W2 * H2;
      };
      const reachCells = () => {
        let c2 = 0;
        const rc2 = o.walk.reach;
        if (rc2) {
          for (let i2 = 0; i2 < rc2.length; i2++) if (rc2[i2]) c2++;
        }
        return c2 || 3e5;
      };
      let RC = 0;
      const day = (b2) => {
        window.__day = b2;
        SC.background = new Xt(b2 ? 10474751 : 1705490);
        SC.fog = new Co(b2 ? 13624063 : 2755100, b2 ? 16e-4 : 4e-3);
        HEMI.color.set(b2 ? 15269887 : 10117832);
        HEMI.groundColor.set(b2 ? 8033632 : 3806244);
        HEMI.intensity = b2 ? 2.8 : 1.15;
        SUN.color.set(b2 ? 16774614 : 16738970);
        SUN.intensity = b2 ? 4.8 : 1.25;
        SUN.position.set(b2 ? 50 : -60, b2 ? 110 : 90, b2 ? 35 : -40);
        REN.toneMappingExposure = b2 ? 1.3 : 1.15;
        try {
          SC.environmentIntensity = b2 ? 1.1 : 1;
        } catch (e2) {
        }
        pt.strength = Math.min(pt.strength, (Jt === 2 ? 0.55 : 0.45) * (b2 ? 0.3 : 1));
        if (!b2) pt.strength = Jt === 2 ? 0.55 : Jt === 1 ? 0.45 : pt.strength;
      };
      const apply = (k) => {
        const v2 = S2[k];
        if (k === "q") {
          Jt = v2;
          _e();
        } else if (k === "spd") l.spdMul = SPD[v2];
        else if (k === "mon") {
          f.monsters = v2 === 0;
          h.setEnabled(f.monsters);
        } else if (k === "atk") {
          h.peace = v2 === 1;
          f.peace = v2 === 1;
        } else if (k === "cnt") {
          if (!RC) RC = reachCells();
          h.setCount(Math.max(1, Math.round(PER[v2] * RC / fieldArea())));
        } else if (k === "tp") window.__tp = v2 === 0;
        else if (k === "day") day(v2 === 0);
        else if (k === "dog") DOG.setOn(v2 === 0);
        else if (k === "wp") ATK.setAll(v2 === 1);
      };
      window.__tpGo = (st2) => {
        const q2 = o.walk.nearest(st2.wx, st2.wz) || [st2.wx, st2.wz];
        l.stop();
        l.x = q2[0];
        l.z = q2[1];
        l.wx = q2[0] - 1;
        l.wz = q2[1] - 1;
        V.tx = C.tx = q2[0];
        V.tz = C.tz = q2[1];
      };
      const panel = te("setp"), body = te("setbody");
      function render() {
        body.innerHTML = "";
        for (const r2 of rows) {
          const d2 = document.createElement("div");
          d2.className = "srow";
          const lb = document.createElement("div");
          lb.className = "slab";
          lb.textContent = r2.l;
          d2.appendChild(lb);
          const seg = document.createElement("div");
          seg.className = "sseg";
          r2.o.forEach((t2, i2) => {
            const b2 = document.createElement("button");
            b2.className = "btn" + (S2[r2.k] === i2 ? " on" : "");
            b2.textContent = t2;
            b2.addEventListener("click", () => {
              S2[r2.k] = i2;
              if (r2.k !== "q") save();
              apply(r2.k);
              render();
            });
            seg.appendChild(b2);
          });
          d2.appendChild(seg);
          if (r2.n) {
            const n2 = document.createElement("div");
            n2.className = "snote";
            n2.textContent = r2.n;
            d2.appendChild(n2);
          }
          body.appendChild(d2);
        }
        const sb = document.createElement("button");
        sb.className = "btn";
        sb.style.cssText = "width:100%;margin-top:10px";
        sb.textContent = "\u{1F4F7} 2K-Bild speichern";
        sb.addEventListener("click", () => te("btn-shot").click());
        body.appendChild(sb);
        const lbk = document.createElement("button");
        lbk.className = "btn";
        lbk.style.cssText = "width:100%;margin-top:8px";
        lbk.textContent = "\u{1F4DA} Lernbuch / Fortschritt";
        lbk.addEventListener("click", () => {
          panel.style.display = "none";
          if (!window.__quizOpen) Ri();
        });
        body.appendChild(lbk);
      }
      te("btn-set").addEventListener("click", () => {
        S2.q = Jt;
        render();
        panel.style.display = "flex";
      });
      te("set-x").addEventListener("click", () => {
        panel.style.display = "none";
      });
      panel.addEventListener("click", (e2) => {
        if (e2.target === panel) panel.style.display = "none";
      });
      window.__settingsInit = () => {
        S2.q = 0;
        for (const k of ["q", "spd", "mon", "atk", "cnt", "tp", "day", "dog", "wp"]) apply(k);
      };
      return { S: S2 };
    })();
    te("btn-mon").addEventListener("click", () => {
      f.monsters = !f.monsters, h.setEnabled(f.monsters), te("btn-mon").textContent = f.monsters ? "\u2620 AN" : "\u2620 AUS", te("btn-mon").classList.toggle("on", f.monsters);
    }), te("btn-mon").textContent = f.monsters ? "\u2620 AN" : "\u2620 AUS", te("btn-mon").classList.toggle("on", f.monsters), te("btn-shield").addEventListener("click", () => SH.activate()), addEventListener("keydown", (k) => {
      (k.key === "e" || k.key === "E") && !k.repeat && !window.__quizOpen && SH.activate();
    });
    let R = 700, w = new Float32Array(R * 3), T = new Float32Array(R * 3), U = me(5);
    for (let k = 0; k < R; k++) {
      w[k * 3] = (U() - 0.5) * 90, w[k * 3 + 1] = U() * 30, w[k * 3 + 2] = (U() - 0.5) * 90;
      let Q = U() < 0.5;
      T[k * 3] = Q ? 1 : 0.7, T[k * 3 + 1] = Q ? 0.2 : 0.3, T[k * 3 + 2] = Q ? 0.5 : 1;
    }
    let M = new we();
    M.setAttribute("position", new xe(w, 3)), M.setAttribute("color", new xe(T, 3));
    let S = new Mi(M, new oi({ size: 0.28, vertexColors: true, transparent: true, opacity: 0.55, depthWrite: false, blending: Ee, sizeAttenuation: true }));
    n.add(S);
    let q = new wn((() => {
      let k = document.createElement("canvas");
      k.width = k.height = 128;
      let Q = k.getContext("2d"), Lt = Q.createRadialGradient(64, 64, 0, 64, 64, 64);
      return Lt.addColorStop(0, "rgba(255,220,140,1)"), Lt.addColorStop(0.25, "rgba(255,140,40,.7)"), Lt.addColorStop(1, "rgba(255,80,0,0)"), Q.fillStyle = Lt, Q.fillRect(0, 0, 128, 128), k;
    })()), J = [], ht = o.fires.slice();
    for (let k of o.ruins) ht.push([k[0], 1.2, k[1]]);
    for (let k of ht) {
      let Q = new Yi(new yi({ map: q, transparent: true, depthWrite: false, blending: Ee, opacity: 0.9 }));
      Q.position.set(k[0], k[1], k[2]);
      let Lt = 2.2 + Math.random() * 1.4;
      Q.scale.set(Lt, Lt, 1), Q.userData.base = Lt, n.add(Q), J.push(Q);
    }
    let H = t.getSize(new Bt()), $ = new Je(H.x * e, H.y * e, { type: mn, samples: (Be.bloom, 4) }), et = new Yo(t, $);
    et.addPass(new Zo(n, s));
    let pt = new Hs(new Bt(H.x * e * 0.5, H.y * e * 0.5), Be.bloom ? 0.55 : 0, 0.65, 0.82);
    et.addPass(pt), et.addPass(new Jo()), et.setPixelRatio(e), et.setSize(H.x, H.y);
    let V = { tx: 0, tz: 6, yaw: 0.62, pitch: 0.86, dist: 34, follow: true }, C = { tx: 0, tz: 6, yaw: 0.62, pitch: 0.86, dist: 34 }, gt = { nah: { dist: 30, pitch: 0.86 }, mittel: { dist: 110, pitch: 0.95 }, weit: { dist: 380, pitch: 1.04 }, karte: { dist: 760, pitch: 1.1 } }, xt = o.bounds, At = (xt.x0 + xt.x1) / 2, rt = (xt.z0 + xt.z1) / 2;
    function yt(k) {
      dt && (dt = false, l.hideBody = false, s.fov = 38, s.updateProjectionMatrix(), te("btn-pov").classList.remove("on"));
      let Q = gt[k];
      C.dist = Q.dist, C.pitch = Q.pitch, k === "karte" ? (C.tx = At, C.tz = rt, V.follow = false, C.yaw = 0) : V.follow = true, wt(k);
    }
    function wt(k) {
      document.querySelectorAll("[data-preset]").forEach((Q) => Q.classList.toggle("on", Q.dataset.preset === k));
    }
    document.querySelectorAll("[data-preset]").forEach((k) => k.addEventListener("click", () => yt(k.dataset.preset))), te("btn-follow").addEventListener("click", () => {
      V.follow = true;
    }), te("btn-rotl").addEventListener("click", () => {
      C.yaw += 0.5;
    }), te("btn-rotr").addEventListener("click", () => {
      C.yaw -= 0.5;
    }), te("btn-north").addEventListener("click", () => {
      C.yaw = 0;
    }), te("btn-zin").addEventListener("click", () => {
      C.dist = Le(C.dist * 0.7, 12, 1100), wt("");
    }), te("btn-zout").addEventListener("click", () => {
      C.dist = Le(C.dist / 0.7, 12, 1100), wt("");
    });
    let dt = false, ot = 0;
    function bt(k) {
      dt = k, l.hideBody = k, s.fov = k ? 72 : 38, s.updateProjectionMatrix(), te("btn-pov").classList.toggle("on", k), k ? (C.yaw = V.yaw = l.yaw + Math.PI, ot = 0, V.follow = true, C.dist = V.dist = 30, j.classList.remove("show"), wt("")) : yt("nah");
    }
    te("btn-pov").addEventListener("click", () => bt(!dt));
    function Et(k) {
      dt && (V.tx = C.tx = l.x, V.tz = C.tz = l.z, V.yaw = C.yaw, V.dist = C.dist = 30), V.follow && (C.tx = l.x, C.tz = l.z);
      let Q = 1 - Math.exp(-k * (V.follow ? 7 : 6));
      V.tx += (C.tx - V.tx) * Q, V.tz += (C.tz - V.tz) * Q;
      let Lt = 1 - Math.exp(-k * 8);
      V.yaw += (C.yaw - V.yaw) * Lt, V.pitch += (C.pitch - V.pitch) * Lt, V.dist += (C.dist - V.dist) * Lt;
      let Yt = Math.cos(V.pitch) * V.dist, Ht = Math.sin(V.pitch) * V.dist;
      if (dt) {
        let Zt = [-Math.sin(V.yaw), -Math.cos(V.yaw)], Wt = Math.cos(ot), Qt = Math.sin(ot);
        s.position.set(l.x + Zt[0] * 0.25, 1.75, l.z + Zt[1] * 0.25), s.lookAt(l.x + Zt[0] * 10 * Wt, 1.75 + 10 * Qt, l.z + Zt[1] * 10 * Wt);
      } else s.position.set(V.tx + Math.sin(V.yaw) * Yt, Ht, V.tz + Math.cos(V.yaw) * Yt), s.lookAt(V.tx, 0.6, V.tz);
      s.updateMatrixWorld(true), S.visible = V.dist < 260, n.fog.density = Le(0.16 / V.dist, 18e-5, 85e-4);
      {
        let Zt = Le((V.dist - 120) / 600, 0, 1);
        r.intensity = fe(1.15, 2.6, Zt), t.toneMappingExposure = fe(1.15, 1.75, Zt);
      }
      if (a.target.position.set(V.tx, 0, V.tz), a.position.set(V.tx - 60, 90, V.tz - 40), Be.shadows) {
        let Zt = Le(V.dist * 1.15, 36, 120), Wt = a.shadow.camera;
        Math.abs(Wt.right - Zt) > 3 && (Wt.left = -Zt, Wt.right = Zt, Wt.top = Zt, Wt.bottom = -Zt, Wt.updateProjectionMatrix());
      }
    }
    let O = { x: 0, y: 0, run: false, active: false, id: null }, W = {};
    addEventListener("keydown", (k) => {
      W[k.key.toLowerCase()] = true, ["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k.key.toLowerCase()) && k.preventDefault();
    }), addEventListener("keyup", (k) => {
      W[k.key.toLowerCase()] = false;
    });
    let L = te("joy"), ct = te("stick"), X = () => L.getBoundingClientRect();
    function tt(k) {
      let Q = X(), Lt = Q.left + Q.width / 2, Yt = Q.top + Q.height / 2, Ht = k.clientX - Lt, Zt = k.clientY - Yt, Wt = Q.width / 2 - 14, Qt = Math.hypot(Ht, Zt);
      Qt > Wt && (Ht = Ht / Qt * Wt, Zt = Zt / Qt * Wt), ct.style.transform = `translate(${Ht}px,${Zt}px)`, O.x = Ht / Wt, O.y = -Zt / Wt, O.run = Qt > Wt * 0.92;
    }
    L.addEventListener("pointerdown", (k) => {
      O.active = true, O.id = k.pointerId, L.setPointerCapture(k.pointerId), tt(k), k.preventDefault();
    }), L.addEventListener("pointermove", (k) => {
      O.active && k.pointerId === O.id && tt(k);
    });
    let z = (k) => {
      k.pointerId === O.id && (O.active = false, O.x = O.y = 0, O.run = false, ct.style.transform = "translate(0,0)");
    };
    L.addEventListener("pointerup", z), L.addEventListener("pointercancel", z);
    let D = /* @__PURE__ */ new Map(), G = false, y = null, b = null, N = new Bo(), I = new Bt();
    function A(k, Q) {
      I.set(k / innerWidth * 2 - 1, -(Q / innerHeight) * 2 + 1), N.setFromCamera(I, s);
      let Lt = N.ray.origin, Yt = N.ray.direction;
      if (Yt.y > -1e-4) return null;
      let Ht = -Lt.y / Yt.y;
      return [Lt.x + Yt.x * Ht, Lt.z + Yt.z * Ht];
    }
    let B = document.createElement("div");
    B.id = "tapmark", document.body.appendChild(B);
    let it = null;
    i.addEventListener("pointerdown", (k) => {
      i.setPointerCapture(k.pointerId), D.set(k.pointerId, { x: k.clientX, y: k.clientY, px: k.clientX, py: k.clientY, btn: k.button }), D.size === 1 ? (G = false, y = { x: k.clientX, y: k.clientY, t: performance.now() }) : (G = true, b = null);
    }), i.addEventListener("pointermove", (k) => {
      let Q = D.get(k.pointerId);
      if (!Q) return;
      let Lt = k.clientX - Q.x, Yt = k.clientY - Q.y;
      if (Q.px = Q.x, Q.py = Q.y, Q.x = k.clientX, Q.y = k.clientY, D.size === 1) {
        if (!G && Math.hypot(k.clientX - y.x, k.clientY - y.y) > 8 && (G = true), G && dt) C.yaw -= Lt * 5e-3, ot = Le(ot + Yt * 4e-3, -0.8, 0.7);
        else if (G) if (Q.btn === 2 || k.shiftKey) C.yaw -= Lt * 5e-3, C.pitch = Le(C.pitch + Yt * 3e-3, 0.45, 1.3);
        else {
          let Ht = V.dist * 21e-4, Zt = [Math.cos(V.yaw), -Math.sin(V.yaw)], Wt = [-Math.sin(V.yaw), -Math.cos(V.yaw)], Qt = 1 / Math.max(0.5, Math.sin(V.pitch));
          C.tx -= Zt[0] * Lt * Ht, C.tz -= Zt[1] * Lt * Ht, C.tx += Wt[0] * Yt * Ht * Qt, C.tz += Wt[1] * Yt * Ht * Qt, V.follow = false, V.tx = C.tx, V.tz = C.tz, wt("");
        }
      } else if (D.size === 2) {
        let [Ht, Zt] = [...D.values()], Wt = Math.hypot(Ht.x - Zt.x, Ht.y - Zt.y), Qt = Math.atan2(Zt.y - Ht.y, Zt.x - Ht.x);
        if (dt) b = null;
        else if (b) {
          C.dist = Le(C.dist * b.d / Wt, 12, 1100);
          let Re = Qt - b.a;
          Re = Math.atan2(Math.sin(Re), Math.cos(Re)), C.yaw += Re, V.dist = C.dist, V.yaw = C.yaw, wt("");
        }
        b = { d: Wt, a: Qt };
      }
    });
    let Z = (k) => {
      let Q = D.get(k.pointerId);
      if (D.delete(k.pointerId), !!Q) {
        if (!G && D.size === 0 && k.button !== 2) {
          let Lt = A(k.clientX, k.clientY);
          if (Lt) {
            let Yt = l.goTo(Lt[0], Lt[1]);
            it = Lt, st(k.clientX, k.clientY, Yt), Yt && (V.follow = true);
          }
        }
        D.size < 2 && (b = null);
      }
    };
    i.addEventListener("pointerup", Z), i.addEventListener("pointercancel", (k) => {
      D.delete(k.pointerId);
    }), i.addEventListener("contextmenu", (k) => k.preventDefault()), i.addEventListener("wheel", (k) => {
      k.preventDefault(), C.dist = Le(C.dist * Math.exp(k.deltaY * 12e-4), 12, 1100), wt("");
    }, { passive: false });
    function st(k, Q, Lt) {
      B.style.left = k + "px", B.style.top = Q + "px", B.className = Lt ? "ok" : "no", B.offsetWidth, B.classList.add("go");
    }
    let lt = te("pins"), St = te("chips"), j = te("card"), vt = [], Mt = /* @__PURE__ */ new Map();
    function Nt() {
      lt.innerHTML = "", St.innerHTML = "", vt.length = 0;
      for (let k of o.stations) {
        let Q = k.custom ? "\uFF0B" : k.id === 0 ? "\u2605" : k.id, Lt = document.createElement("button");
        Lt.className = "pin", Lt.innerHTML = `<span class="n">${Q}</span><span class="t"></span>`, Lt.querySelector(".t").textContent = k.name, Lt.addEventListener("click", (Ht) => {
          Ht.stopPropagation(), It(k);
        }), lt.appendChild(Lt), vt.push(Lt);
        let Yt = document.createElement("button");
        Yt.className = "chip", Yt.innerHTML = `<b>${Q}</b> <span></span>`, Yt.querySelector("span").textContent = k.short, Yt.addEventListener("click", () => It(k)), St.appendChild(Yt);
      }
    }
    Nt(), _f((k) => {
      for (let Q of o.stations) Q.name0 === void 0 && (Q.name0 = Q.name, Q.short0 = Q.short, Q.desc0 = Q.desc);
      for (let Q = o.stations.length - 1; Q >= 0; Q--) o.stations[Q].custom && o.stations.splice(Q, 1);
      for (let Q of o.stations) {
        let Lt = (k.st || {})[Q.id] || {};
        Q.name = Lt.name || Q.name0, Q.short = Lt.short || Lt.name || Q.short0, Q.desc = Lt.desc != null ? Lt.desc : Q.desc0;
      }
      for (let Q of k.extra || []) o.stations.push({ id: Q.id, name: Q.name, short: Q.short || Q.name, desc: Q.desc || "", x: Q.x, z: Q.z, wx: Q.wx != null ? Q.wx : Q.x, wz: Q.wz != null ? Q.wz : Q.z, custom: true });
      Nt();
      for (let Q of Mt.values()) n.remove(Q), Q.geometry.dispose();
      Mt.clear();
      for (let Q of o.stations) if (Q.custom) {
        let Lt = new zt(new sn(0.6, 0.6, 40, 10, 1, true), new se({ color: 16765773, transparent: true, opacity: 0.35, blending: Ee, depthWrite: false }));
        Lt.position.set(Q.x, 20, Q.z), n.add(Lt), Mt.set(Q.id, Lt);
      }
    });
    let Pt = null;
    function It(k) {
      Pt = k, te("card-t").textContent = (k.custom ? "\uFF0B " : k.id === 0 ? "\u2605 " : "Station " + k.id + " \xB7 ") + k.name, te("card-d").textContent = k.desc, j.classList.add("show"), V.follow = false, C.tx = k.x, C.tz = k.z, C.dist = 42, C.pitch = 0.9, wt(""), te("card-quiz").style.display = xn[k.id] ? "" : "none", $t();
    }
    let kt = 16;
    function $t() {
      let k = te("card-quiz");
      if (!Pt || !xn[Pt.id]) return;
      let Lt = Math.hypot(l.x - Pt.wx, l.z - Pt.wz) < kt;
      k.disabled = !Lt, k.textContent = Lt ? "\u{1F4DA} Aufgaben" : "\u{1F4DA} erst hingehen", k.classList.toggle("go", Lt);
    }
    te("card-quiz").addEventListener("click", () => {
      Pt && !te("card-quiz").disabled && (j.classList.remove("show"), pf(Pt.id));
    }), te("card-go").addEventListener("click", () => {
      if (Pt) {
        window.__tp ? window.__tpGo(Pt) : l.goTo(Pt.wx, Pt.wz);
        V.follow = true, C.dist = Math.min(C.dist, 45), j.classList.remove("show");
      }
    }), te("card-x").addEventListener("click", () => j.classList.remove("show"));
    let ee = new Y();
    function Ct() {
      o.stations.forEach((k, Q) => {
        ee.set(k.x, 8, k.z).project(s);
        let Lt = vt[Q], Yt = ee.z > 1 || Math.abs(ee.x) > 1.1 || Math.abs(ee.y) > 1.1, Ht = Math.hypot(s.position.x - k.x, s.position.z - k.z);
        Lt.style.display = Yt ? "none" : "flex", Lt.style.transform = `translate(${(ee.x * 0.5 + 0.5) * innerWidth}px, ${(-ee.y * 0.5 + 0.5) * innerHeight}px) translate(-50%,-100%)`, Lt.classList.toggle("small", V.dist > 200);
      });
    }
    function at() {
      t.setPixelRatio(e), t.setSize(innerWidth, innerHeight, false), s.aspect = innerWidth / innerHeight, s.updateProjectionMatrix(), et.setPixelRatio(e), et.setSize(innerWidth, innerHeight), pt.resolution.set(innerWidth * e * 0.5, innerHeight * e * 0.5);
    }
    addEventListener("resize", at);
    let F = performance.now(), _t = 0, Tt = 0, Rt = 0, Ut = 0, Gt = 0, Vt = false;
    function ce() {
      if (window.__quizOpen) {
        F = performance.now(), Vt || requestAnimationFrame(ce);
        return;
      }
      let k = performance.now(), Q = Math.min(0.05, (k - F) / 1e3);
      F = k, _t += Q;
      let Lt = (W.d || W.arrowright ? 1 : 0) - (W.a || W.arrowleft ? 1 : 0), Yt = (W.w || W.arrowup ? 1 : 0) - (W.s || W.arrowdown ? 1 : 0), Ht = O.active ? O : Lt || Yt ? { x: Lt, y: Yt, run: !!W.shift } : null;
      Ht && (V.follow = true), l.update(Q, Ht, V.yaw, V.dist), u.track(l.x, l.z), f.safe = u.safeAt(l.x, l.z), f.dead > 0 ? f.dead -= Q : x.classList.remove("show"), f.safe ? f.hp = Math.min(100, f.hp + 22 * Q) : f.hp = Math.min(100, f.hp + 1.2 * Q), f.hurt = Math.max(0, f.hurt - Q * 1.6), h.update(Q, _t, l, V.tx, V.tz, V.dist, f.safe, E), u.update(_t, Q, V.tx, V.tz, V.dist), SH.update(Q, _t), DOG.update(Q, _t), ATK.update(Q, _t), d.style.width = Le(f.hp, 0, 100) + "%", d.style.background = f.hp > 55 ? "linear-gradient(90deg,#7dff7a,#e8ff6a)" : f.hp > 28 ? "linear-gradient(90deg,#ffd24a,#ff9a3a)" : "linear-gradient(90deg,#ff3b4a,#ff7a3a)", g.textContent = Math.ceil(Le(f.hp, 0, 100));
      let Zt = f.monsters ? h.threat : 0;
      f.safe ? (_.textContent = "\u2600 SICHER", _.className = "safe") : Zt > 0.15 ? (_.textContent = "\u2620 GEFAHR", _.className = "danger") : (_.textContent = "H\xD6LLE", _.className = "hell"), m.style.opacity = Le(f.hurt * 0.9 + (f.safe ? 0 : Zt * 0.45), 0, 1), p.style.opacity = f.safe ? 0.55 : 0, Et(Q);
      for (let Wt of o.update) Wt(_t);
      S.position.set(V.tx, 0, V.tz);
      {
        let Wt = M.attributes.position;
        for (let Qt = 0; Qt < R; Qt++) {
          let Re = Wt.getY(Qt) + Q * (0.6 + Qt % 5 * 0.15);
          Re > 30 && (Re = 0), Wt.setY(Qt, Re), Wt.setX(Qt, Wt.getX(Qt) + Math.sin(_t * 0.3 + Qt) * Q * 0.4);
        }
        Wt.needsUpdate = true;
      }
      S.visible = V.dist < 260;
      for (let Wt of J) {
        let Qt = 0.85 + 0.25 * Math.sin(_t * 9 + Wt.position.x) + 0.12 * Math.sin(_t * 17 + Wt.position.z);
        Wt.scale.set(Wt.userData.base * Qt, Wt.userData.base * Qt * 1.25, 1);
      }
      if (Ut -= Q, Ut <= 0 && (o.treeLOD(V.tx, V.tz), Ut = 0.4), Ct(), j.classList.contains("show") && $t(), t.info.reset(), et.render(), Tt += Q, Rt++, Tt > 1.5) {
        let Wt = Tt / Rt * 1e3;
        Tt = 0, Rt = 0, Wt > 38 && e > 1 ? (e = Math.max(1, e - 0.25), at()) : Wt < 17 && e < Math.min(devicePixelRatio || 1, Be.maxPR) && (e = Math.min(Math.min(devicePixelRatio || 1, Be.maxPR), e + 0.25), at());
      }
      Vt || requestAnimationFrame(ce);
    }
    window.__api = { diag() {
      let k = [], Q = new In(), Lt = new Y(), Yt = new Y();
      return n.traverse((Ht) => {
        !(Ht.isMesh || Ht.isSprite) || Ht.isInstancedMesh || (Q.setFromObject(Ht), Q.getSize(Lt), Q.getCenter(Yt), Math.hypot(Yt.x, Yt.z) < 80 && Lt.x > 14 && Lt.x < 140 && k.push([Ht.type, Ht.material && Ht.material.type, Math.round(Lt.x), Math.round(Lt.y), Math.round(Lt.z), Math.round(Yt.x), Math.round(Yt.y), Math.round(Yt.z), Ht.geometry && Ht.geometry.type, Ht.renderOrder]));
      }), k;
    }, world: o, scene: n, camera: s, renderer: t, composer: et, cam: V, goal: C, player: l, setPreset: yt, pause() {
      Vt = true;
    }, resume() {
      Vt = false, F = performance.now(), requestAnimationFrame(ce);
    }, setView(k) {
      Object.assign(C, k), Object.assign(V, k), V.follow = false;
    }, trail: u, creatures: h, game: f, renderOnce() {
      l.update(1e-4, null, V.yaw, V.dist), Et(1e-3), o.treeLOD(V.tx, V.tz), Ct(), t.info.reset(), et.render();
    }, capture(k, Q, Lt = "image/jpeg", Yt = 0.93) {
      let Ht = e, Zt = innerWidth, Wt = innerHeight;
      t.setPixelRatio(1), t.setSize(k, Q, false), et.setPixelRatio(1), et.setSize(k, Q), pt.resolution.set(k * 0.5, Q * 0.5), s.aspect = k / Q, s.updateProjectionMatrix(), Et(1e-3), o.treeLOD(V.tx, V.tz), et.render();
      let Qt = i.toDataURL(Lt, Yt);
      return t.setPixelRatio(Ht), t.setSize(Zt, Wt, false), et.setPixelRatio(Ht), et.setSize(Zt, Wt), s.aspect = Zt / Wt, s.updateProjectionMatrix(), Qt;
    }, stats() {
      return { tri: t.info.render.triangles, trees: o.treeCount, lamps: o.lampCount, cars: o.carCount, ruins: o.ruinCount, tris: t.info.render.triangles, calls: t.info.render.calls };
    } }, te("btn-shot").addEventListener("click", () => {
      try {
        let k = window.__api.capture(2048, Math.round(2048 * innerHeight / innerWidth), "image/png"), Q = document.createElement("a");
        Q.href = k, Q.download = "gemen-3d-2k.png", Q.click();
      } catch (k) {
        alert("Screenshot fehlgeschlagen: " + k.message);
      }
    });
    let Jt = 2, re = ["Niedrig", "Mittel", "Hoch"];
    function _e() {
      let k = Jt === 2, Q = Jt === 1;
      pt.enabled = Jt >= 1, pt.strength = (k ? 0.55 : 0.45) * (window.__day ? 0.3 : 1), Be.shadows && (a.castShadow = k), Be.maxPR = Jt === 0 ? 1 : Q ? 1.35 : Ur ? 1.75 : 2, e = Math.min(e, Math.min(devicePixelRatio || 1, Be.maxPR)), Jt === 2 && (e = Math.min(devicePixelRatio || 1, Be.maxPR)), at(), te("btn-q").textContent = "Q:" + re[Jt];
    }
    te("btn-q").addEventListener("click", () => {
      Jt = (Jt + 2) % 3, _e();
    }), window.__api.setQuality = (k) => {
      Jt = k, _e();
    }, te("btn-full").addEventListener("click", () => {
      let k = document.documentElement;
      document.fullscreenElement ? document.exitFullscreen() : (k.requestFullscreen || k.webkitRequestFullscreen || (() => {
      })).call(k);
    }), at(), Jt = 0, _e(), window.__settingsInit && window.__settingsInit(), setTimeout(() => {
      let k = te("hint");
      k && (k.style.opacity = 0);
    }, 9e3), yt("nah"), V.tx = C.tx = l.x, V.tz = C.tz = l.z, V.dist = C.dist = 30, te("loading").classList.add("hide"), window.__ready = true, requestAnimationFrame(ce), ff();
  }
  x_().catch((i) => {
    console.error(i);
    let t = te("loadmsg");
    t && (t.textContent = "Fehler: " + i.message), window.__error = String(i && i.stack || i);
  });
})();
