# Autos: Quaternius "Realistic Car Pack" (CC0), 7 Modelle, vorgebacken in cars.json (Positionen + Farben je Dreieck)
CARJ = open(D + '/cars.json', encoding='utf8').read().strip()
rep('  function Hu(i, t, e) {\n', '  const CARJ = ' + CARJ + ';\n  function Hu(i, t, e) {\n', 'Autos-Daten')
rep('o.push({ x: w, z: T, y: 0.02, rot: U, sx: 1, color: M ? 2762276 : c[n() * c.length | 0] }), i.carItems',
    'o.push({ x: w, z: T, y: 0.02, rot: U, sx: 1, color: M ? 2762276 : c[n() * c.length | 0], mdl: n() * 7 | 0 }), i.carItems', 'Autos-Modellwahl')
rep('''    es(i.root, r.toGeometry(), new ae({ vertexColors: true, roughness: 0.55, metalness: 0.3 }), o, 120, { shadow: e.shadows }), i.carCount = o.length;''',
'''    {
      const CM = new ae({ vertexColors: true, roughness: 0.5, metalness: 0.25 }), KEYS = ["NormalCar1", "NormalCar2", "SUV", "SportsCar", "SportsCar2", "Taxi", "Cop"];
      const b64 = (s3) => Uint8Array.from(atob(s3), (c3) => c3.charCodeAt(0));
      KEYS.forEach((K, mi) => {
        const pb = b64(CARJ[K].p), cb = b64(CARJ[K].c), pq = new Int16Array(pb.buffer, pb.byteOffset, pb.length / 2);
        const pos = new Float32Array(pq.length), col = new Float32Array(pq.length);
        for (let q = 0; q < pq.length; q++) pos[q] = pq[q] / 4000;
        for (let tri = 0; tri < cb.length / 3; tri++) for (let k = 0; k < 3; k++) for (let ch = 0; ch < 3; ch++) col[tri * 9 + k * 3 + ch] = cb[tri * 3 + ch] / 255;
        const g = new we();
        g.setAttribute("position", new xe(pos, 3)), g.setAttribute("color", new xe(col, 3)), g.computeVertexNormals();
        const list = o.filter((it) => it.mdl === mi);
        mi >= 5 && list.forEach((it) => it.color !== 2762276 && (it.color = 16777215));
        list.length && es(i.root, g, CM, list, 120, { shadow: e.shadows });
      });
    }
    i.carCount = o.length;''', 'Autos-Modelle')
