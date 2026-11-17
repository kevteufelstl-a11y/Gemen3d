# Backt die Figuren aus "Characters - Fantasy Races Kit" in kompakte Einzelbild-Animationen (wie die Monster).
import bpy, bmesh, sys, math, json, base64, struct
from mathutils import Vector, Matrix
NAME, OUT = sys.argv[sys.argv.index('--')+1], sys.argv[sys.argv.index('--')+2]
SRC = '/home/claude/races/Characters - Fantasy Races Kit[Standard]/Exports/GLB (Godot-Unreal)/'
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC + NAME + '.glb')
for o in list(bpy.data.objects):
    if o.name.startswith('Icosphere'): bpy.data.objects.remove(o)
arm = [o for o in bpy.data.objects if o.type == 'ARMATURE'][0]
pb = arm.pose.bones
def act(o):
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
def decimate(o, target):
    n0 = sum(len(p.vertices) - 2 for p in o.data.polygons)
    if n0 <= target: return
    act(o)
    if o.data.shape_keys: o.shape_key_clear()
    d = o.modifiers.new('Dec', 'DECIMATE'); d.ratio = target / n0
    bpy.ops.object.modifier_move_to_index(modifier='Dec', index=0); bpy.ops.object.modifier_apply(modifier='Dec')
parts = {}
for o in [o for o in bpy.data.objects if o.type == 'MESH']:
    k = o.name.split('_')[-1].lower()   # body, eyes, hair, horns
    parts[k] = o
decimate(parts['body'], 2600)
if 'hair' in parts: decimate(parts['hair'], 900)
if 'horns' in parts: decimate(parts['horns'], 300)
if 'eyes' in parts: decimate(parts['eyes'], 160)
# --- Kleidung aus dem Koerper erzeugen (Flaechen nach Knochen-Gewicht, leicht nach aussen geschoben)
SH = ('spine_01', 'spine_02', 'spine_03', 'clavicle', 'upperarm', 'lowerarm', 'neck_01')
PA = ('pelvis', 'thigh', 'calf')
def make_cloth(src, prefixes, longp, push, name):
    act(src); bpy.ops.object.duplicate(); c = bpy.context.view_layer.objects.active; c.name = name
    vg = {g.index: g.name for g in c.vertex_groups}
    me = c.data
    def dom(v):
        best, bw = None, 0
        for g in v.groups:
            if g.weight > bw: bw, best = g.weight, vg[g.group]
        return best or ''
    vdom = [dom(v) for v in me.vertices]
    bm = bmesh.new(); bm.from_mesh(me)
    kill = []; longf = set()
    for f in bm.faces:
        names = [vdom[v.index] for v in f.verts]
        ok = sum(1 for n in names if n.startswith(prefixes)) >= 2
        if name == 'shirt' and any(n in ('neck_01',) for n in names) and sum(1 for n in names if n == 'neck_01') > 1: ok = False
        if not ok: kill.append(f)
    bmesh.ops.delete(bm, geom=kill, context='FACES')
    for v in bm.verts: v.co += v.normal * push
    lay = bm.faces.layers.int.new('lng')
    for f in bm.faces:
        names = [vdom[v.index] for v in f.verts] if False else None
    bm.to_mesh(me); bm.free()
    # Markierung "nur lange Variante" (Unterarm bzw. Wade)
    me.attributes.new('lng', 'INT', 'FACE')
    for p in me.polygons:
        names = [vdom[i] for i in p.vertices]
        me.attributes['lng'].data[p.index].value = 1 if sum(1 for n in names if n.startswith(longp)) >= 2 else 0
    return c
parts['shirt'] = make_cloth(parts['body'], SH, ('lowerarm',), 0.014, 'shirt')
parts['pants'] = make_cloth(parts['body'], PA, ('calf',), 0.011, 'pants')
# --- Posen
def reset():
    for b in pb:
        b.rotation_mode = 'QUATERNION'; b.rotation_quaternion = (1, 0, 0, 0); b.location = (0, 0, 0); b.scale = (1, 1, 1)
    bpy.context.view_layer.update()
def aim(bone, tgt):
    b = pb[bone]; cur = b.matrix.col[1].xyz.normalized()
    R = cur.rotation_difference(Vector(tgt).normalized()).to_matrix()
    b.matrix = Matrix.Translation(b.matrix.translation) @ (R @ b.matrix.to_3x3()).to_4x4()
    bpy.context.view_layer.update()
def ang(a): return (0, -math.sin(a), math.cos(a))
def lean(a):
    for n, f in (('spine_01', 0.4), ('spine_02', 0.7), ('spine_03', 1.0), ('neck_01', 0.6), ('Head', 0.2)):
        aim(n, ang(a * f))
def leg(side, th, fl):
    s = 1 if side == 'l' else -1
    aim('thigh_' + side, (s * 0.02, -math.sin(th), -math.cos(th)))
    aim('calf_' + side, (s * 0.02, -math.sin(th - fl), -math.cos(th - fl)))
    aim('foot_' + side, (0, -0.35, -1))
    aim('ball_' + side, (0, -1, 0))
def armp(side, sw, bend):
    s = 1 if side == 'l' else -1
    aim('upperarm_' + side, (s * 0.16, -math.sin(sw), -math.cos(sw)))
    aim('lowerarm_' + side, (s * 0.1, -math.sin(sw + bend), -math.cos(sw + bend)))
def pose_idle(t):
    reset(); p = 2 * math.pi * t
    lean(0.02 + 0.015 * math.sin(p))
    leg('l', 0.03, 0.06); leg('r', -0.03, 0.06)
    armp('l', 0.05 + 0.03 * math.sin(p), 0.18); armp('r', 0.05 + 0.03 * math.sin(p), 0.18)
def pose_walk(t):
    reset(); p = 2 * math.pi * t
    lean(0.06)
    for side, ph in (('l', p), ('r', p + math.pi)):
        leg(side, 0.45 * math.sin(ph), 0.12 + 0.75 * max(0, math.cos(ph)))
    armp('l', -0.4 * math.sin(p), 0.3); armp('r', -0.4 * math.sin(p + math.pi), 0.3)
CLIPS = [('idle', 4, pose_idle), ('walk', 8, pose_walk)]
reset()
H = max((parts['body'].matrix_world @ v.co).z for v in parts['body'].data.vertices)
out = {'h': round(H, 4), 'parts': {}}
dg = lambda: bpy.context.evaluated_depsgraph_get()
def q16(v): return max(-32767, min(32767, round(v * 20000)))
for k, o in parts.items():
    e = o.evaluated_get(dg()); m = e.to_mesh(); m.calc_loop_triangles()
    uvl = m.uv_layers.active.data if m.uv_layers.active else None
    lng = m.attributes.get('lng')
    keymap = {}; src = []; uv = []; idx = []; lmask = []
    for tri in m.loop_triangles:
        for l in tri.loops:
            vi = m.loops[l].vertex_index; u = uvl[l].uv if uvl else (0, 0)
            key = (vi, round(u[0], 4), round(u[1], 4))
            if key not in keymap: keymap[key] = len(src); src.append(vi); uv.append((u[0], u[1]))
            idx.append(keymap[key])
        lmask.append(lng.data[tri.polygon_index].value if lng else 0)
    e.to_mesh_clear()
    out['parts'][k] = {'v': len(src), 'uv': base64.b64encode(struct.pack('<%dh' % (len(uv) * 2), *[round(c * 4096) for u in uv for c in u])).decode(),
                       'i': base64.b64encode(struct.pack('<%dH' % len(idx), *idx)).decode(), 'clips': {}, '_src': src}
    if any(lmask): out['parts'][k]['long'] = base64.b64encode(bytes(lmask)).decode()
for cname, n, fn in CLIPS:
    for i in range(n):
        fn(i / n)
        for k, o in parts.items():
            e = o.evaluated_get(dg()); m = e.to_mesh(); P = out['parts'][k]
            vals = []
            for vi in P['_src']:
                c = o.matrix_world @ m.vertices[vi].co
                vals += [q16(c.x / H), q16(c.z / H), q16(-c.y / H)]
            e.to_mesh_clear()
            P['clips'].setdefault(cname, []).append(base64.b64encode(struct.pack('<%dh' % len(vals), *vals)).decode())
for P in out['parts'].values(): del P['_src']
json.dump(out, open(OUT, 'w'), separators=(',', ':'))
import os; print(NAME, {k: v['v'] for k, v in out['parts'].items()}, os.path.getsize(OUT) // 1024, 'KB')
