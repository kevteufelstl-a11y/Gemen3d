import json,math,numpy as np
from shapely.geometry import LineString,Point
from shapely.ops import unary_union,nearest_points
from shapely.strtree import STRtree
X0,Y0,X1,Y1=np.load('g_frame.npy')
text=np.load('textmask.npy'); road=np.load('roadmask.npy')>0
good=text|road
L=[{'L':LineString(l['p']),'mw':l['mw'],'kind':l['kind']} for l in json.load(open('lines_clean.json')) if len(l['p'])>=2]
# doppelte, parallele Linien (breite Hauptstrassen) entfernen
L.sort(key=lambda l:-l['L'].length)
keep=[]; kt=None
for l in L:
    if keep and l['L'].length>10:
        tr=STRtree([k['L'] for k in keep]); near=[keep[j]['L'] for j in tr.query(l['L'].buffer(10))]
        if near:
            cov=l['L'].intersection(unary_union([g.buffer(10) for g in near])).length/l['L'].length
            if cov>0.8: continue
    keep.append(l)
print('Doppelte entfernt',len(L)-len(keep)); L=keep
def frac(a,b):
    n=max(2,int(math.dist(a,b))); v=0
    for i in range(n+1):
        x=int(a[0]+(b[0]-a[0])*i/n-X0); y=int(a[1]+(b[1]-a[1])*i/n-Y0)
        if 0<=y<good.shape[0] and 0<=x<good.shape[1] and good[y,x]: v+=1
    return v/(n+1)
def ends():
    out=[]
    geoms=[l['L'] for l in L]; tree=STRtree(geoms)
    for i,l in enumerate(L):
        for first in (True,False):
            cs=list(l['L'].coords); 
            if first: cs=cs[::-1]
            e=cs[-1]; E=Point(e)
            if any(j!=i and geoms[j].distance(E)<3 for j in tree.query(E.buffer(3))): continue
            # Richtung aus den letzten 15 px
            acc=0;k=len(cs)-2
            while k>0 and acc<15: acc+=math.dist(cs[k],cs[k+1]); k-=1
            d=np.array(e)-np.array(cs[max(k,0)]); nd=np.linalg.norm(d)
            if nd<1: continue
            out.append((i,e,d/nd))
    return out
# 0) Strassen unter Strassennamen rekonstruieren
import cv2
cls=np.load('g_cls.npy'); rawroad=(cls==4)|(cls==6)
tm=text.astype(np.uint8); n_,lab_,st_,_=cv2.connectedComponentsWithStats(tm,8)
geoms=[l['L'] for l in L]; tree=STRtree(geoms); n0=0
for k in range(1,n_):
    x,y,w,h,a=st_[k]
    if max(w,h)<60 or a<300: continue
    ys,xs=np.nonzero(lab_[y:y+h,x:x+w]==k)
    pts=np.stack([xs+x,ys+y],1).astype(np.float32)
    (cx,cy),(rw,rh),ang=cv2.minAreaRect(pts)
    if max(rw,rh)/max(1,min(rw,rh))<3: continue
    Lr=max(rw,rh); a_=math.radians(ang if rw>=rh else ang+90)
    p1=(cx-math.cos(a_)*Lr/2+X0,cy-math.sin(a_)*Lr/2+Y0); p2=(cx+math.cos(a_)*Lr/2+X0,cy+math.sin(a_)*Lr/2+Y0)
    # Strassenfarbe zwischen den Buchstaben?
    n=int(Lr); hit=0
    for t in range(n):
        xx=int(cx-math.cos(a_)*Lr/2+math.cos(a_)*t); yy=int(cy-math.sin(a_)*Lr/2+math.sin(a_)*t)
        if 0<=yy<cls.shape[0] and 0<=xx<cls.shape[1] and rawroad[max(0,yy-3):yy+4,max(0,xx-3):xx+4].any(): hit+=1
    if hit/max(1,n)<0.5: continue
    ends_=[]
    for p in (p1,p2):
        P=Point(p); c=[geoms[j] for j in tree.query(P.buffer(40))]
        if not c: break
        q=min((nearest_points(g,P)[0] for g in c),key=lambda q:q.distance(P))
        if q.distance(P)>40: break
        ends_.append((q.x,q.y))
    if len(ends_)==2 and math.dist(*ends_)>30:
        L.append({'L':LineString([ends_[0],p1,p2,ends_[1]]) if math.dist(ends_[0],p1)<math.dist(ends_[0],p2) else LineString([ends_[0],p2,p1,ends_[1]]),'mw':9,'kind':'road','link':1}); n0+=1
        geoms=[l['L'] for l in L]; tree=STRtree(geoms)
print('Strassen unter Namen',n0)
# 1) gegenueberliegende Enden ueber Schriftluecken verbinden
E=ends(); used=set(); n1=0
for a in range(len(E)):
    if a in used: continue
    ia,ea,da=E[a]; best=None
    for b in range(len(E)):
        if b==a or b in used: continue
        ib,eb,db=E[b]
        if ib==ia: continue
        v=np.array(eb)-np.array(ea); dist=np.linalg.norm(v)
        if dist<1 or dist>260: continue
        v/=dist
        if v@da<math.cos(math.radians(22)) or -(v@db)<math.cos(math.radians(22)): continue
        if dist>25 and frac(ea,eb)<0.6: continue
        if best is None or dist<best[0]: best=(dist,b)
    if best:
        b=best[1]; ib,eb,_=E[b]
        L.append({'L':LineString([ea,eb]),'mw':min(L[ia]['mw'],L[ib]['mw']),'kind':L[ia]['kind'],'link':1}); used|={a,b}; n1+=1
print('Luecken geschlossen',n1)
# 1b) Strahl in Fahrtrichtung bis zur naechsten Strasse (ueber Beschriftungen hinweg)
E=ends(); geoms=[l['L'] for l in L]; tree=STRtree(geoms); nb=0
for i,e,d in E:
    if L[i]['kind']=='foot': continue
    ray=LineString([e,(e[0]+d[0]*260,e[1]+d[1]*260)]); best=None
    for j in tree.query(ray):
        if j==i: continue
        x=ray.intersection(geoms[j])
        if x.is_empty: continue
        pts=[x] if x.geom_type=='Point' else [g for g in getattr(x,'geoms',[]) if g.geom_type=='Point']
        for q in pts:
            dist=Point(e).distance(q)
            if dist<2: continue
            if best is None or dist<best[0]: best=(dist,(q.x,q.y))
    if best and (best[0]<20 or frac(e,best[1])>=0.7):
        L.append({'L':LineString([e,best[1]]),'mw':L[i]['mw'],'kind':'road','link':1}); nb+=1
        geoms=[l['L'] for l in L]; tree=STRtree(geoms)
print('Strahl-Verbindungen',nb)
# 1c) freie Enden: unter Beschriftungen zum naechsten Strassenpunkt (Weg fast nur Schrift/Strasse)
E=ends(); geoms=[l['L'] for l in L]; tree=STRtree(geoms); nc=0
for i,e,d in E:
    if L[i]['kind']=='foot': continue
    P=Point(e); best=None
    for j in tree.query(P.buffer(260)):
        if j==i: continue
        for c in list(geoms[j].coords)+[nearest_points(geoms[j],P)[0].coords[0]]:
            dist=math.dist(e,c)
            if dist<20 or dist>260: continue
            if best is not None and dist>=best[0]: continue
            if frac(e,c)>=0.88: best=(dist,c)
    if best:
        L.append({'L':LineString([e,best[1]]),'mw':L[i]['mw'],'kind':'road','link':1}); nc+=1
        geoms=[l['L'] for l in L]; tree=STRtree(geoms)
print('Schrift-Verbindungen',nc)
# 2) T-Anschluesse
E=ends(); geoms=[l['L'] for l in L]; tree=STRtree(geoms); n2=0
for i,e,d in E:
    P=Point(e); best=None
    for j in tree.query(P.buffer(35)):
        if j==i: continue
        q=nearest_points(geoms[j],P)[0]; v=np.array([q.x-e[0],q.y-e[1]]); dist=np.linalg.norm(v)
        if dist<0.5 or dist>35: continue
        ang=math.degrees(math.acos(max(-1,min(1,(v/dist)@d))))
        lim=35 if L[i]['kind']=='foot' else 35
        if ang>70 and dist>8: continue
        if dist>12 and frac(e,(q.x,q.y))<0.5 and L[i]['kind']!='foot': continue
        if best is None or dist<best[0]: best=(dist,(q.x,q.y))
    if best:
        L.append({'L':LineString([e,best[1]]),'mw':L[i]['mw'],'kind':L[i]['kind'],'link':1}); n2+=1
print('Anschluesse',n2)
# 3) Komponenten
def comps():
    U=unary_union([l['L'].buffer(1.5) for l in L]); cs=list(getattr(U,'geoms',[U]))
    lab=[next(k for k,c in enumerate(cs) if l['L'].intersects(c)) for l in L]
    return cs,lab
for it in range(400):
    cs,lab=comps()
    size=np.zeros(len(cs))
    for i,l in enumerate(L): size[lab[i]]+=l['L'].length
    main=int(size.argmax()); order=[k for k in np.argsort(-size) if k!=main]
    done=False
    for k in order:
        mine=[i for i in range(len(L)) if lab[i]==k]; others=[i for i in range(len(L)) if lab[i]!=k]
        oth=STRtree([L[i]['L'] for i in others]); best=None
        for i in mine:
            for e in (L[i]['L'].coords[0],L[i]['L'].coords[-1]):
                P=Point(e)
                for jj in oth.query(P.buffer(90)):
                    j=others[jj]; q=nearest_points(L[j]['L'],P)[0]; dist=P.distance(q)
                    if dist>90: continue
                    f=frac(e,(q.x,q.y)) if dist>30 else 1
                    if f<0.45: continue
                    c=dist*(1.6-f)
                    if best is None or c<best[0]: best=(c,e,(q.x,q.y),i)
        if best:
            L.append({'L':LineString([best[1],best[2]]),'mw':L[best[3]]['mw'],'kind':L[best[3]]['kind'],'link':1}); done=True; break
    if not done: break
cs,lab=comps(); size=np.zeros(len(cs))
for i,l in enumerate(L): size[lab[i]]+=l['L'].length
print('Komponenten',len(cs),'Groessen',sorted(size.round(),reverse=True)[:8])
L=[l for i,l in enumerate(L) if size[lab[i]]>=120]
def gw(l):
    if l['kind']=='foot': return 5.7
    m=l['mw']
    return 21.6 if m>=19 else 15.3 if m>=12.5 else 13.4 if m>=6.5 else 9.5
json.dump([{'p':[[round(x,1),round(y,1)] for x,y in l['L'].coords],'w':gw(l),'kind':l['kind']} for l in L],open('lines_joined.json','w'))
print('Linien',len(L))
