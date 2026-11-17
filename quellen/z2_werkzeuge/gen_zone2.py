import json, math, random, base64, io
import numpy as np, cv2
from PIL import Image
from shapely.geometry import LineString, Polygon, Point, box, MultiPolygon
from shapely.ops import unary_union
from shapely import affinity
from shapely.strtree import STRtree
from mosaic_common import OX,OY
random.seed(20261117)
DX,DY=3100,1420             # zone-2 px = game px + (DX,DY)
W,H=3180,3790
Z2=Polygon(json.load(open('zone2_poly.json')))
C=json.load(open('center_z2.json'))
lc=np.load('landcover.npz'); water_m,forest_m,meadow_m=lc['water'],lc['forest'],lc['meadow']
rm=cv2.imread('roadmask.png',0)>0
dens=cv2.blur(rm.astype(np.float32),(301,301))
def mos_at(x,y,arr):  # game px -> mosaic array value
    xi,yi=int(x-OX),int(y-OY)
    return arr[yi,xi] if 0<=yi<arr.shape[0] and 0<=xi<arr.shape[1] else 0
lines=[(LineString(c['p']),c['w']) for c in C]
road=unary_union([L.buffer(w/2,cap_style=1,join_style=1) for L,w in lines]).intersection(Z2)
sideL=[(L,w) for L,w in lines if w>=11 and w<20]
side=unary_union([L.buffer(w/2+0.8+2.4,cap_style=2) for L,w in sideL]).difference(unary_union([L.buffer(w/2+0.8,cap_style=1) for L,w in lines])).intersection(Z2)
# water / meadow / forest polygons from masks (game px)
def mask_polys(m,simp=2.0,amin=400):
    cs,hier=cv2.findContours(m.astype(np.uint8),cv2.RETR_CCOMP,cv2.CHAIN_APPROX_SIMPLE)
    out=[]
    if hier is None: return out
    hier=hier[0]
    for i,c in enumerate(cs):
        if hier[i][3]!=-1 or len(c)<4: continue
        holes=[]
        j=hier[i][2]
        while j!=-1:
            if len(cs[j])>=4: holes.append([(p[0][0]+OX,p[0][1]+OY) for p in cs[j]])
            j=hier[j][0]
        P=Polygon([(p[0][0]+OX,p[0][1]+OY) for p in c],holes).buffer(0).simplify(simp)
        if P.area>amin: out.append(P)
    return out
water=unary_union(mask_polys(water_m)).intersection(Z2).difference(road.buffer(-1))
meadow=unary_union(mask_polys(meadow_m,3,2000)).intersection(Z2).difference(road).difference(water)
forest_polys=unary_union(mask_polys(forest_m,3,2000)).intersection(Z2)
# ---------------- houses along streets ----------------
block=unary_union([road.buffer(2.5), side.buffer(0.5), water.buffer(3)])
houses=[]; tree_list=[]
def ok_house(P):
    if not Z2.contains(P): return False
    if P.intersects(block): return False
    c=P.centroid
    if mos_at(c.x,c.y,dens)<0.03: return False
    if mos_at(c.x,c.y,forest_m) or mos_at(c.x,c.y,meadow_m) or mos_at(c.x,c.y,water_m): return False
    for q in near(P):
        if q.intersects(P.buffer(3)): return False
    return True
idx={}
def near(P):
    cx,cy=int(P.centroid.x//60),int(P.centroid.y//60)
    for i in (-1,0,1):
        for j in (-1,0,1):
            yield from idx.get((cx+i,cy+j),[])
def add(P):
    houses.append(P); idx.setdefault((int(P.centroid.x//60),int(P.centroid.y//60)),[]).append(P)
for L,w in sorted(lines,key=lambda t:-t[0].length):
    if w<11 or w>20 or L.length<30: continue
    for side_sign in (1,-1):
        t=random.uniform(8,20)
        while t<L.length-8:
            p=L.interpolate(t); p2=L.interpolate(min(L.length,t+2)); p1=L.interpolate(max(0,t-2))
            ang=math.atan2(p2.y-p1.y,p2.x-p1.x); nx,ny=-math.sin(ang)*side_sign,math.cos(ang)*side_sign
            fw=random.uniform(17,25); fd=random.uniform(18,26); setback=w/2+3.4+random.uniform(5,11)
            cx,cy=p.x+nx*(setback+fd/2),p.y+ny*(setback+fd/2)
            R=box(-fw/2,-fd/2,fw/2,fd/2)
            R=affinity.rotate(R,math.degrees(ang),origin=(0,0)); R=affinity.translate(R,cx,cy)
            if random.random()<0.22:   # L-shaped annex sometimes
                A=box(fw/2-1,-fd/2,fw/2+random.uniform(5,9),-fd/2+random.uniform(8,12))
                A=affinity.translate(affinity.rotate(A,math.degrees(ang),origin=(0,0)),cx,cy)
                R2=unary_union([R,A])
                if R2.geom_type=='Polygon': R=R2
            if ok_house(R): add(R); t+=fw+random.uniform(9,16)
            else: t+=6
print('Haeuser',len(houses))
# ---------------- export (zone-2 px frame) ----------------
def tr(P): return affinity.translate(P,DX,DY)
def polys(G):
    G=tr(G); gs=[G] if G.geom_type=='Polygon' else [g for g in getattr(G,'geoms',[]) if g.geom_type=='Polygon']
    return [{'o':[[round(x,1),round(y,1)] for x,y in g.exterior.coords[:-1]],'h':[[[round(x,1),round(y,1)] for x,y in r.coords[:-1]] for r in g.interiors]} for g in gs if g.area>4]
out={'w':W,'h':H,'scale':0.5037783375314862,'home':[538+DX,1290+DY],
     'roads':polys(road),'sidewalk':polys(side),'water':polys(water),'olive':polys(meadow),'green':[],
     'streams':[], 'buildings':[{'p':[[round(x),round(y)] for x,y in tr(h).exterior.coords[:-1]]} for h in houses],
     'center':[{'p':[[round(x+DX,1),round(y+DY,1)] for x,y in L.coords],'w':w} for L,w in lines],
     'polygon':[[x+DX,y+DY] for x,y in Z2.exterior.coords[:-1]]}
# classmap
cm=np.full((H,W),4,np.uint8)
def fill(G,v):
    G=tr(G); gs=[G] if G.geom_type=='Polygon' else [g for g in getattr(G,'geoms',[]) if g.geom_type=='Polygon']
    for g in gs:
        cv2.fillPoly(cm,[np.array(g.exterior.coords,np.int32)],v)
        for r in g.interiors: cv2.fillPoly(cm,[np.array(r.coords,np.int32)],0 if v!=4 else 4)
fill(Z2,0); fill(forest_polys,6); fill(meadow,5); fill(water,3); fill(side,0); fill(road,1)
for h in houses: fill(h,2)
buf=io.BytesIO(); Image.fromarray(cm).save(buf,'PNG',optimize=True)
out['classmap']='data:image/png;base64,'+base64.b64encode(buf.getvalue()).decode()
json.dump(out,open('zone2_geo.json','w'),separators=(',',':'))
print('classmap KB',len(buf.getvalue())//1024,'json MB',round(len(json.dumps(out))/1e6,2))
vis=cv2.applyColorMap((cm*36).astype(np.uint8),cv2.COLORMAP_JET); cv2.imwrite('z2_cls.jpg',cv2.resize(vis,(W//4,H//4)))
