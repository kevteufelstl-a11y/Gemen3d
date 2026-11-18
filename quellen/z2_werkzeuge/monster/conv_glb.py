import sys, io, json, base64, numpy as np, trimesh, fast_simplification
from PIL import Image
from scipy.spatial import cKDTree
src, name, target, out = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
sc = trimesh.load(src); m = list(sc.geometry.values())[0]
V = np.asarray(m.vertices, np.float64); F = np.asarray(m.faces); UV = np.asarray(m.visual.uv, np.float64)
V2, F2 = fast_simplification.simplify(V.astype(np.float32), F.astype(np.int64), target_count=target)
d, idx = cKDTree(V).query(V2); UV2 = UV[idx]
# normalisieren: Fuesse auf y=0, Hoehe 1, mittig
mn, mx = V2.min(0), V2.max(0); h = mx[1] - mn[1]
V2 = (V2 - [(mn[0]+mx[0])/2, mn[1], (mn[2]+mx[2])/2]) / h
img = m.visual.material.baseColorTexture if hasattr(m.visual.material,'baseColorTexture') else m.visual.material.image
def jpg(im, s, q=80, f=1.0):
    im = im.convert('RGB').resize((s, s), Image.LANCZOS)
    if f != 1.0: im = Image.eval(im, lambda c: min(255, int(c*f)))
    b = io.BytesIO(); im.save(b, 'JPEG', quality=q, optimize=True); return base64.b64encode(b.getvalue()).decode()
if len(sys.argv) > 5 and sys.argv[5] == 'kopf_minus_x':
    V2 = np.stack([V2[:,2], V2[:,1], -V2[:,0]], 1)
x, y, z = V2[:,0], V2[:,1], V2[:,2]
def frame(P):
    q = np.clip(np.round(P * 20000), -32767, 32767).astype('<i2'); return base64.b64encode(q.tobytes()).decode()
hip = 0.45
low = np.clip(1 - y/hip, 0, 1)          # 1 an den Fuessen, 0 ab Huefte
up = np.clip((y - hip)/(1-hip), 0, 1)   # 0 unten, 1 oben
side = np.sign(x); wing = np.clip((np.abs(x) - 0.25) / 0.3, 0, 1) * (y > 0.4)
def pose(walk=0.0, ph=0.0, breath=0.0, lean=0.0, flap=0.0):
    P = V2.copy()
    # Beine: links/rechts gegengleich vor und zurueck, Fuesse leicht anheben
    sw = np.sin(ph) * side
    P[:,2] += walk * 0.16 * sw * low
    P[:,1] += walk * 0.05 * np.maximum(0, sw) * low
    # Koerper: auf und ab, leichtes Wiegen
    P[:,1] += walk * 0.03 * abs(np.cos(ph)) * (1-low)
    P[:,0] += walk * 0.02 * np.sin(ph) * up
    # Atmen
    P[:,1] += breath * 0.02 * up; P[:,0] *= 1 + breath * 0.02 * up; P[:,2] *= 1 + breath * 0.02 * up
    # Fluegel / Arme
    P[:,1] += flap * 0.12 * wing
    # Vorbeugen (Angriff) um die Huefte
    if lean:
        a = lean * up; c, s_ = np.cos(a), np.sin(a); yy = P[:,1] - hip; zz = P[:,2].copy()
        P[:,1] = hip + yy * c - zz * s_; P[:,2] = zz + yy * s_
    return P
idle = [frame(pose(breath=np.sin(i/4*2*np.pi), flap=0.15*np.sin(i/4*2*np.pi))) for i in range(4)]
walk = [frame(pose(walk=1, ph=i/8*2*np.pi, flap=0.4*np.sin(i/8*4*np.pi))) for i in range(8)]
atk = []
for i in range(8):
    t = i/7; l = -0.25*np.sin(t/0.55*np.pi/2) if t < 0.55 else -0.25 + 0.85*np.sin((t-0.55)/0.45*np.pi)
    atk.append(frame(pose(lean=l, flap=1.0*np.sin(t*np.pi))))
uvq = np.clip(np.round(UV2 * 4096), -32767, 32767).astype('<i2')
model = {'h': 1.0, 'v': int(len(V2)), 'tris': int(len(F2)), 'uv': base64.b64encode(uvq.tobytes()).decode(),
         'i': base64.b64encode(F2.astype('<u2').tobytes()).decode(),
         'clips': {'idle': {'f': idle, 'loop': 1, 'n': 4}, 'walk': {'f': walk, 'loop': 1, 'n': 8}, 'atk': {'f': atk, 'loop': 0, 'n': 8}}}
dark = Image.new('RGB', (64, 64), (0, 0, 0))
D = {'c1': jpg(img, 512), 'c2': jpg(img, 512, f=1.15), 'c3': jpg(img, 512, f=0.85), 'em': jpg(dark, 64), 'model': model}
json.dump(D, open(out, 'w'), separators=(',', ':'))
print(name, len(V2), 'Punkte', len(F2), 'Dreiecke', 'h-orig', h, 'Breite', V2[:,0].ptp() if hasattr(V2[:,0],'ptp') else np.ptp(V2[:,0]), 'Tiefe', np.ptp(V2[:,2]))
