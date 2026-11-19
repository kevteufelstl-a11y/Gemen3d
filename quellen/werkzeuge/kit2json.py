# Wandelt ausgewaehlte glTF-Teile des Quaternius "Modular SciFi MegaKit" (CC0) in eine kompakte JSON-Datei um.
import json, base64, struct, sys, os, io, math
from PIL import Image
ROOT = sys.argv[1]; OUT = sys.argv[2]
PARTS = sys.argv[3].split(',')
def qrot(q, v):
    x, y, z, w = q; vx, vy, vz = v
    ix = w*vx + y*vz - z*vy; iy = w*vy + z*vx - x*vz; iz = w*vz + x*vy - y*vx; iw = -x*vx - y*vy - z*vz
    return (ix*w + iw*-x + iy*-z - iz*-y, iy*w + iw*-y + iz*-x - ix*-z, iz*w + iw*-z + ix*-y - iy*-x)
out = {"parts": {}, "tex": {}}
TEXMAP = {}
for name in PARTS:
    f = None
    for sub in os.listdir(ROOT + '/glTF'):
        p = ROOT + '/glTF/' + sub + '/' + name + '.gltf'
        if os.path.exists(p): f = p
    if not f: print('FEHLT', name); continue
    g = json.load(open(f)); d = os.path.dirname(f)
    bins = [open(d + '/' + b['uri'], 'rb').read() for b in g['buffers']]
    def acc(i):
        a = g['accessors'][i]; bv = g['bufferViews'][a['bufferView']]
        n = {'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']]; fmt = {5126:'f',5123:'H',5125:'I',5121:'B'}[a['componentType']]
        sz = struct.calcsize(fmt); st = bv.get('byteStride', sz*n); off = bv.get('byteOffset',0) + a.get('byteOffset',0); b = bins[bv['buffer']]
        return [struct.unpack_from('<' + fmt*n, b, off + k*st) for k in range(a['count'])]
    prims = []
    for node in g['nodes']:
        if 'mesh' not in node: continue
        T = node.get('translation', [0,0,0]); R = node.get('rotation', [0,0,0,1]); S = node.get('scale', [1,1,1])
        for pr in g['meshes'][node['mesh']]['primitives']:
            m = g['materials'][pr['material']]; mn = m['name']
            P = acc(pr['attributes']['POSITION']); N = acc(pr['attributes']['NORMAL']); U = acc(pr['attributes']['TEXCOORD_0']) if 'TEXCOORD_0' in pr['attributes'] else [(0,0)]*len(P)
            I = [i[0] for i in acc(pr['indices'])]
            P = [tuple(a+b for a,b in zip(qrot(R,(p[0]*S[0],p[1]*S[1],p[2]*S[2])),T)) for p in P]
            N = [qrot(R,n) for n in N]
            pb = m.get('pbrMetallicRoughness', {})
            if mn not in TEXMAP:
                bt = pb.get('baseColorTexture'); TEXMAP[mn] = {'tex': g['images'][g['textures'][bt['index']]['source']]['uri'] if bt else None, 'col': pb.get('baseColorFactor'), 'em': m.get('emissiveFactor'), 'mask': m.get('alphaMode') == 'MASK'}
            prims.append({"m": mn,
              "p": base64.b64encode(struct.pack('<%dh' % (len(P)*3), *[max(-32767,min(32767,round(c*1000))) for p in P for c in p])).decode(),
              "n": base64.b64encode(struct.pack('<%db' % (len(N)*3), *[max(-127,min(127,round(c*127))) for n in N for c in n])).decode(),
              "u": base64.b64encode(struct.pack('<%dh' % (len(U)*2), *[max(-32767,min(32767,round(c*4096))) for u in U for c in u[:2]])).decode(),
              "i": base64.b64encode(struct.pack('<%dH' % len(I), *I)).decode()})
    out['parts'][name] = prims
out['mats'] = TEXMAP
# Texturen: kuehle Varianten statt der roten Standardfarben
SWAP = {'T_Trim_01_BaseColor_Red.png': 'T_Trim_01_BaseColor.png', 'T_Trim_02_BaseColor_Red.png': 'T_Trim_02_BaseColor_Blue.png'}
for mn, t in TEXMAP.items():
    if t['tex']: t['tex'] = SWAP.get(t['tex'], t['tex'])
need = sorted({t['tex'] for t in TEXMAP.values() if t['tex']})
for tn in need:
    im = Image.open(ROOT + '/Textures/' + tn)
    sz = 512 if 'Decals' in tn or 'Cables' in tn else 1024
    b = io.BytesIO()
    if im.mode == 'RGBA' and ('Decals' in tn or 'Cables' in tn):
        im.resize((sz, sz), Image.LANCZOS).save(b, 'PNG', optimize=True); mime = 'png'
    else:
        im.convert('RGB').resize((sz, sz), Image.LANCZOS).save(b, 'JPEG', quality=82); mime = 'jpeg'
    out['tex'][tn] = 'data:image/' + mime + ';base64,' + base64.b64encode(b.getvalue()).decode()
em = Image.open(ROOT + '/Textures/T_Trim_01_Emissive.png').convert('L').resize((512,512)); b = io.BytesIO(); em.save(b, 'PNG', optimize=True)
out['tex']['EM_Trim01'] = 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()
json.dump(out, open(OUT, 'w'), separators=(',', ':'))
print(OUT, os.path.getsize(OUT)//1024, 'KB', len(out['parts']), 'Teile', need)
