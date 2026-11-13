  // ===== Mehrspieler: Hilfsfunktion (alle Tunnel zusammenfassen) =====
  function $makeTA(local) {
    const extra = [];
    const all = () => [local, ...extra];
    return {
      extra,
      near: (x, z, r) => all().some((t) => t.near(x, z, r)),
      safeAt: (x, z) => all().some((t) => t.safeAt(x, z)),
      distTo: (x, z) => Math.min(...all().map((t) => t.distTo(x, z)))
    };
  }
