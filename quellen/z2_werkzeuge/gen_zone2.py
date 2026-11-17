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
# ---------------- Haeuser: erkannte Daecher + Auffuellen + Villen + Burgen ----------------
block=unary_union([road.buffer(2.0), side.buffer(0.3), water.buffer(3)])
houses=[]; kinds=[]; idx={}
def near(P,r=1):
    cx,cy=int(P.centroid.x//60),int(P.centroid.y//60)
    for i in range(-r,r+1):
        for j in range(-r,r+1):
            yield from idx.get((cx+i,cy+j),[])
def add(P,k='house'):
    houses.append(P); kinds.append(k); idx.setdefault((int(P.centroid.x//60),int(P.centroid.y//60)),[]).append(P)
def free(P,gap=2.5):
    if not Z2.contains(P) or P.intersects(block): return False
    for q in near(P):
        if q.distance(P)<gap: return False
    return True
rtree=STRtree([L for L,w in lines])
def road_dir(x,y):
    i=rtree.nearest(Point(x,y)); L=lines[i][0]
    t=L.project(Point(x,y)); a=L.interpolate(max(0,t-3)); b=L.interpolate(min(L.length,t+3))
    return math.degrees(math.atan2(b.y-a.y,b.x-a.x)), L.distance(Point(x,y))
def rect(cx,cy,w,h,ang):
    R=box(-w/2,-h/2,w/2,h/2); return affinity.translate(affinity.rotate(R,ang,origin=(0,0)),cx,cy)
# Burgen (feste Orte)
CASTLES=[(-630,2150),(-1230,2150),(-1230,-130)]
for cx,cy in CASTLES:
    done=False
    for r in range(0,140,8):
        for k in range(max(1,r//4)):
            a=2*math.pi*k/max(1,r//4); x,y=cx+r*math.cos(a),cy+r*math.sin(a)
            rd,_=road_dir(x,y); P=rect(x,y,76,76,rd)
            if Z2.contains(P) and not P.intersects(road.buffer(3)) and not P.intersects(water.buffer(2)):
                add(P,'castle'); done=True; break
        if done: break
    print('Burg', (cx,cy), 'gesetzt' if done else 'NICHT gesetzt', round(P.centroid.x),round(P.centroid.y))
# 1) erkannte Daecher
roofs=json.load(open('roofs.json'))
nr=0
for o in sorted(roofs,key=lambda o:-o['area']):
    (cx,cy),(w,h),a=o['c'],o['s'],o['a']
    if o['area']<100: continue
    rd,dist=road_dir(cx,cy)
    w,h=max(w,15),max(h,15)
    # Ausrichtung an der Strasse, wenn die erkannte Richtung nahe dran ist
    d=((a-rd+45)%90)-45
    ang=rd if abs(d)<22 else a
    if abs(((a-rd)%180)-90)<45 and abs(d)<22: w,h=h,w
    w,h=min(w,34),min(h,30)
    P=rect(cx,cy,w,h,ang)
    if free(P): add(P); nr+=1
print('aus Luftbild',nr)
# 2) Luecken an den Strassen auffuellen
nf=0
for L,w in sorted(lines,key=lambda t:-t[0].length):
    if w<11 or w>20 or L.length<25: continue
    for sgn in (1,-1):
        t=random.uniform(4,10)
        while t<L.length-5:
            p=L.interpolate(t); p2=L.interpolate(min(L.length,t+2)); p1=L.interpolate(max(0,t-2))
            ang=math.atan2(p2.y-p1.y,p2.x-p1.x); nx,ny=-math.sin(ang)*sgn,math.cos(ang)*sgn
            fw=random.uniform(16,23); fd=random.uniform(17,24); sb=w/2+3.4+random.uniform(4,9)
            cx,cy=p.x+nx*(sb+fd/2),p.y+ny*(sb+fd/2)
            P=rect(cx,cy,fw,fd,math.degrees(ang))
            if random.random()<0.2:
                A=affinity.translate(affinity.rotate(box(fw/2-1,-fd/2,fw/2+random.uniform(5,9),-fd/2+random.uniform(8,12)),math.degrees(ang),origin=(0,0)),cx,cy)
                U2=unary_union([P,A]); P=U2 if U2.geom_type=='Polygon' else P
            c=P.centroid
            ok=mos_at(c.x,c.y,dens)>=0.02 and not mos_at(c.x,c.y,forest_m) and not mos_at(c.x,c.y,meadow_m) and not mos_at(c.x,c.y,water_m)
            if ok and free(P,3.0): add(P); nf+=1; t+=fw+random.uniform(5,10)
            else: t+=5
print('aufgefuellt',nf)
# 3) Villen: Haeuser mit viel Platz drumherum werden zu Villen auf grossem Grundstueck
cand=[]
for i,P in enumerate(houses):
    if kinds[i]!='house': continue
    c=P.centroid; n=sum(1 for q in near(P,1) if q.distance(c)<45)
    rd,dd=road_dir(c.x,c.y)
    if dd>30 or mos_at(c.x,c.y,dens)<0.025 or n<1: continue
    cand.append((n,i))
cand.sort(); nv=0
for n,i in cand:
    if nv>=14: break
    P=houses[i]; c=P.centroid; rd,_=road_dir(c.x,c.y)
    V=rect(c.x,c.y,34,26,rd)
    others=[q for q in near(P,1) if q is not P]
    if not Z2.contains(V) or V.intersects(block) or any(q.distance(V)<6 for q in others): continue
    if any(kinds[j]=='villa' and houses[j].distance(V)<160 for j in range(len(houses))): continue
    houses[i]=V; kinds[i]='villa'; nv+=1
print('Villen',nv)
print('Haeuser',len(houses))
# ---------------- export (zone-2 px frame) ----------------
def tr(P): return affinity.translate(P,DX,DY)
def polys(G):
    G=tr(G); gs=[G] if G.geom_type=='Polygon' else [g for g in getattr(G,'geoms',[]) if g.geom_type=='Polygon']
    return [{'o':[[round(x,1),round(y,1)] for x,y in g.exterior.coords[:-1]],'h':[[[round(x,1),round(y,1)] for x,y in r.coords[:-1]] for r in g.interiors]} for g in gs if g.area>4]
out={'w':W,'h':H,'scale':0.5037783375314862,'home':[538+DX,1290+DY],
     'roads':polys(road),'sidewalk':polys(side),'water':polys(water),'olive':polys(meadow),'green':[],
     'streams':[], 'buildings':[dict({'p':[[round(x,1),round(y,1)] for x,y in tr(h).exterior.coords[:-1]]},**({'t':k} if k!='house' else {})) for h,k in zip(houses,kinds)],
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
