import json,math,random,base64,io
import numpy as np,cv2
from PIL import Image
from shapely.geometry import LineString,Polygon,Point,box,MultiPolygon
from shapely.ops import unary_union,nearest_points
from shapely import affinity
from shapely.strtree import STRtree
random.seed(171120)
X0,Y0,X1,Y1=np.load('g_frame.npy')
d=json.load(open('/home/claude/gemen_data.json'))
cls=np.load('g_cls.npy'); det=np.load('g_det.npy')>0; cov=np.load('g_cov.npy')>0
Z1=box(0,0,1080,1820)
# --- Zonenflaeche: Handpolygon ∩ Bildabdeckung − Zone 1
hand=Polygon([(-3150,1030),(-400,-1500),(1080,-1500),(1080,0),(0,0),(0,1820),(1080,1820),(1080,2480),(-2700,2480),(-3150,1700)])
cs,_=cv2.findContours(cv2.erode(cov.astype(np.uint8),np.ones((9,9),np.uint8)),cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
c=max(cs,key=cv2.contourArea); covP=Polygon([(p[0][0]+X0,p[0][1]+Y0) for p in c]).buffer(0).simplify(6)
Z2=hand.intersection(covP).difference(Z1)
if Z2.geom_type!='Polygon': Z2=max(Z2.geoms,key=lambda g:g.area)
Z2=Polygon(Z2.exterior).simplify(2)
print('Zone 2 Flaeche km2',round(Z2.area*0.492**2/1e6,2))
def at(arr,x,y):
    xi,yi=int(x-X0),int(y-Y0); return arr[yi,xi] if 0<=yi<arr.shape[0] and 0<=xi<arr.shape[1] else 0
# --- Strassen
def chaikin(cs):
    if len(cs)<3: return cs
    o=[cs[0]]
    for a,b in zip(cs[:-1],cs[1:]): o+=[(0.75*a[0]+0.25*b[0],0.75*a[1]+0.25*b[1]),(0.25*a[0]+0.75*b[0],0.25*a[1]+0.75*b[1])]
    return o+[cs[-1]]
lines=[]
for l in json.load(open('lines_joined.json')):
    w={13.4:12.0}.get(l['w'],l['w'])
    g=LineString(chaikin([tuple(p) for p in l['p']])).intersection(Z2.buffer(0.5))
    for s in ([g] if g.geom_type=='LineString' else [x for x in getattr(g,'geoms',[]) if x.geom_type=='LineString']):
        if s.length>3: lines.append((s,w))
# Anschluss an Zone-1-Strassenenden
tree=STRtree([L for L,w in lines]); nconn=0
for c in d['center']:
    for e in (c['p'][0],c['p'][-1]):
        if not (e[0]<=6 or e[1]<=6 or e[1]>=1814): continue
        P=Point(e); j=tree.nearest(P); q=nearest_points(lines[j][0],P)[0]
        if P.distance(q)<45: lines.append((LineString([(q.x,q.y),tuple(e)]),c['w'])); nconn+=1
print('Anschluesse an Zone 1',nconn)
road=unary_union([L.buffer(w/2,cap_style=1,join_style=1) for L,w in lines]).intersection(Z2)
sideL=[(L,w) for L,w in lines if 11<=w<20]
side=unary_union([L.buffer(w/2+0.8+2.4,cap_style=2) for L,w in sideL]).difference(unary_union([L.buffer(w/2+0.8,cap_style=1) for L,w in lines])).intersection(Z2)
# --- Flaechen aus der Karte
def polys(mask,eps=1.5,amin=40):
    cs,h=cv2.findContours(mask.astype(np.uint8),cv2.RETR_CCOMP,cv2.CHAIN_APPROX_SIMPLE); out=[]
    if h is None: return out
    h=h[0]
    for i,c in enumerate(cs):
        if h[i][3]!=-1 or len(c)<3: continue
        holes=[]; j=h[i][2]
        while j!=-1:
            if len(cs[j])>=3: holes.append([(p[0][0]+X0,p[0][1]+Y0) for p in cs[j]])
            j=h[j][0]
        ap=cv2.approxPolyDP(c,eps,True)
        if len(ap)<3: continue
        holes=[hh for hh in holes if len(hh)>=3]
        P=Polygon([(p[0][0]+X0,p[0][1]+Y0) for p in ap],holes).buffer(0)
        if P.area>=amin: out.append(P)
    return out
wm=cv2.morphologyEx((cls==2).astype(np.uint8),cv2.MORPH_CLOSE,np.ones((3,3),np.uint8)); wm=cv2.dilate(wm,np.ones((3,3),np.uint8))
water=unary_union(polys(wm,1.5,60)).intersection(Z2).difference(road)
pm=cv2.morphologyEx((cls==1).astype(np.uint8),cv2.MORPH_OPEN,np.ones((5,5),np.uint8))
meadow=unary_union(polys(pm,3,1500)).intersection(Z2).difference(road).difference(water)
# Wald aus dem Satellitenbild (gleiches Spielraster)
lc=np.load('/home/claude/z2/landcover.npz'); fm=lc['forest']; SOX,SOY=-3400,-1550
fcs,_=cv2.findContours(fm.astype(np.uint8),cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
forest=unary_union([Polygon([(p[0][0]+SOX,p[0][1]+SOY) for p in c]).buffer(0).simplify(3) for c in fcs if len(c)>=3 and cv2.contourArea(c)>2000]).intersection(Z2).difference(road).difference(water)
# --- Gebaeude: echte Umrisse
block=unary_union([road.buffer(1.0),side,water.buffer(1)])
houses=[]; kinds=[]
for P in polys(cv2.morphologyEx((cls==3).astype(np.uint8),cv2.MORPH_OPEN,np.ones((2,2),np.uint8)),1.0,45):
    if not Z2.contains(P.centroid) or not at(det,P.centroid.x,P.centroid.y): continue
    P=P.intersection(Z2)
    if P.intersects(block):
        Q=P.difference(block)
        if Q.area<0.6*P.area: continue
        P=max(Q.geoms,key=lambda g:g.area) if Q.geom_type!='Polygon' else Q
    if P.geom_type!='Polygon' or P.area<45: continue
    houses.append(Polygon(P.exterior).simplify(0.8)); kinds.append('house')
nreal=len(houses); print('echte Gebaeude',nreal)
# --- Auffuellen nur dort, wo die Karte keine Haeuser zeigt (grobe Zoomstufe)
idx={}
for i,P in enumerate(houses): idx.setdefault((int(P.centroid.x//60),int(P.centroid.y//60)),[]).append(P)
def near(P):
    cx,cy=int(P.centroid.x//60),int(P.centroid.y//60)
    for a in (-1,0,1):
        for b in (-1,0,1): yield from idx.get((cx+a,cy+b),[])
def rect(cx,cy,w,h,ang): return affinity.translate(affinity.rotate(box(-w/2,-h/2,w/2,h/2),ang,origin=(0,0)),cx,cy)
nf=0
for L,w in sorted(lines,key=lambda t:-t[0].length):
    if w<9 or w>20 or L.length<25: continue
    for sg in (1,-1):
        t=random.uniform(4,10)
        while t<L.length-5:
            p=L.interpolate(t); p2=L.interpolate(min(L.length,t+2)); p1=L.interpolate(max(0,t-2))
            a=math.atan2(p2.y-p1.y,p2.x-p1.x); nx,ny=-math.sin(a)*sg,math.cos(a)*sg
            fw=random.uniform(17,24); fd=random.uniform(18,25); sb=w/2+3.4+random.uniform(5,9)
            cx,cy=p.x+nx*(sb+fd/2),p.y+ny*(sb+fd/2)
            P=rect(cx,cy,fw,fd,math.degrees(a))
            ok=(not at(det,cx,cy)) and at(cov,cx,cy) and at(cls,cx,cy) not in (1,2) and Z2.contains(P) and not P.intersects(block) and all(q.distance(P)>=3 for q in near(P))
            if ok:
                houses.append(P); kinds.append('house'); idx.setdefault((int(cx//60),int(cy//60)),[]).append(P); nf+=1; t+=fw+random.uniform(6,11)
            else: t+=5
print('aufgefuellt (Gebiete ohne Hausansicht)',nf)
# --- Villen: freistehende grosse Haeuser
cand=[]
for i,P in enumerate(houses[:nreal]):
    a=P.area*0.242
    if 160<=a<=320 and P.minimum_rotated_rectangle.area<1.35*P.area:
        others=[q for q in near(P) if q is not P]
        if all(q.distance(P)>8 for q in others): cand.append(i)
random.shuffle(cand); nv=0
for i in cand:
    if nv>=14: break
    if any(kinds[j]=='villa' and houses[j].distance(houses[i])<150 for j in range(len(houses))): continue
    kinds[i]='villa'; nv+=1
print('Villen',nv)
# --- Burgen auf freien Flaechen
allb=unary_union(houses)
def castle_at(cx,cy):
    for r in range(0,260,10):
        for k in range(max(1,r//5)):
            a=2*math.pi*k/max(1,r//5); x,y=cx+r*math.cos(a),cy+r*math.sin(a)
            P=rect(x,y,76,76,0)
            if Z2.contains(P) and not P.intersects(road.buffer(4)) and not P.intersects(water.buffer(3)) and not P.intersects(allb.buffer(4)): return P
for cx,cy in [(-1230,2150),(-1230,-130),(-2300,2200)]:
    P=castle_at(cx,cy)
    if P is not None: houses.append(P); kinds.append('castle'); allb=allb.union(P); print('Burg bei',round(P.centroid.x),round(P.centroid.y))
    else: print('keine Burg bei',cx,cy)
# --- Export im eigenen Pixelraster
mnx,mny,mxx,mxy=Z2.bounds; DX,DY=int(-mnx)+10,int(-mny)+10; W,H=int(mxx+DX)+10,int(mxy+DY)+10
def tr(G): return affinity.translate(G,DX,DY)
def pl(G):
    G=tr(G); gs=[G] if G.geom_type=='Polygon' else [g for g in getattr(G,'geoms',[]) if g.geom_type=='Polygon']
    return [{'o':[[round(x,1),round(y,1)] for x,y in g.exterior.coords[:-1]],'h':[[[round(x,1),round(y,1)] for x,y in r.coords[:-1]] for r in g.interiors]} for g in gs if g.area>4]
out={'w':W,'h':H,'scale':d['scale'],'home':[d['home'][0]+DX,d['home'][1]+DY],
     'roads':pl(road),'sidewalk':pl(side),'water':pl(water),'olive':pl(meadow),'green':[],'streams':[],
     'buildings':[dict({'p':[[round(x,1),round(y,1)] for x,y in tr(h).exterior.coords[:-1]]},**({'t':k} if k!='house' else {})) for h,k in zip(houses,kinds)],
     'center':[{'p':[[round(x+DX,1),round(y+DY,1)] for x,y in L.coords],'w':w} for L,w in lines],
     'polygon':[[round(x+DX,1),round(y+DY,1)] for x,y in Z2.exterior.coords[:-1]],
     'source':'Google-Maps-Kartenansicht (24 Bilder, 17.11.) + Satellitenbilder fuer Wald'}
cm=np.full((H,W),4,np.uint8)
def fill(G,v):
    G=tr(G); gs=[G] if G.geom_type=='Polygon' else [g for g in getattr(G,'geoms',[]) if g.geom_type=='Polygon']
    for g in gs:
        t=np.zeros_like(cm); cv2.fillPoly(t,[np.array(g.exterior.coords,np.int32)],1)
        for r in g.interiors: cv2.fillPoly(t,[np.array(r.coords,np.int32)],0)
        cm[t>0]=v
fill(Z2,0); fill(forest,6); fill(meadow,5); fill(water,3); fill(side,0); fill(road,1)
for h in houses: fill(h,2)
buf=io.BytesIO(); Image.fromarray(cm).save(buf,'PNG',optimize=True)
out['classmap']='data:image/png;base64,'+base64.b64encode(buf.getvalue()).decode()
json.dump(out,open('zone2_geo.json','w'),separators=(',',':'))
print('Gebaeude gesamt',len(houses),'Raster',W,H,'classmap KB',len(buf.getvalue())//1024,'json MB',round(len(json.dumps(out))/1e6,2))
vis=np.zeros((H,W,3),np.uint8); pal=np.array([[40,60,40],[170,170,170],[60,60,220],[200,90,20],[0,0,0],[80,200,120],[0,100,0]],np.uint8); vis=pal[cm]
cv2.imwrite('z2_cls.jpg',cv2.resize(vis,(W//4,H//4),interpolation=cv2.INTER_AREA))
