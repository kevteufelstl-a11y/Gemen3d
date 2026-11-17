import json, math, numpy as np
from shapely.geometry import LineString, Point, Polygon
from shapely.ops import unary_union, nearest_points
from mosaic_common import OX,OY
prob=np.load('roadprob.npy').astype(np.float32)
Z2=Polygon(json.load(open('zone2_poly.json')))
L=[{'L':LineString(c['p']),'w':c['w']} for c in json.load(open('center_z2_raw2.json'))+json.load(open('manual_paths.json'))]
# kurze Stichstrassen < 10 m entfernen
from collections import Counter
def key(p): return (round(p[0]/3),round(p[1]/3))
for _ in range(2):
    cnt=Counter()
    for l in L:
        for e in (l['L'].coords[0],l['L'].coords[-1]): cnt[key(e)]+=1
    def deg(p):
        P=Point(p); return sum(1 for m in L if m['L'].distance(P)<3)
    L=[l for l in L if l.get('link') or not (l['L'].length<22 and (deg(l['L'].coords[0])<=1 or deg(l['L'].coords[-1])<=1))]
def pmean(a,b):
    n=max(2,int(math.dist(a,b)/2)); v=[]
    for i in range(n+1):
        x=a[0]+(b[0]-a[0])*i/n; y=a[1]+(b[1]-a[1])*i/n
        yi,xi=int(y-OY),int(x-OX)
        v.append(prob[max(0,yi-3):yi+4,max(0,xi-3):xi+4].max() if 0<=yi<prob.shape[0] and 0<=xi<prob.shape[1] else 0)
    return float(np.mean(v))
def comps():
    U=unary_union([l['L'].buffer(2.5) for l in L]); cs=list(U.geoms) if U.geom_type=='MultiPolygon' else [U]
    lab=[]
    for l in L:
        for i,c in enumerate(cs):
            if l['L'].intersects(c): lab.append(i); break
    return cs,lab
nope=set()
for it in range(200):
    cs,lab=comps()
    if len(cs)==1: break
    size=[sum(L[i]['L'].length for i in range(len(L)) if lab[i]==k) for k in range(len(cs))]
    main=int(np.argmax(size)); made=0
    order=sorted(range(len(cs)),key=lambda k:-size[k])
    for k in order:
        if k==main: continue
        mine=[i for i in range(len(L)) if lab[i]==k]; others=[i for i in range(len(L)) if lab[i]!=k]
        best=None
        for i in mine:
            for e in (L[i]['L'].coords[0],L[i]['L'].coords[-1]):
                E=Point(e)
                for j in others:
                    d=L[j]['L'].distance(E)
                    if d>140: continue
                    P=nearest_points(L[j]['L'],E)[0]
                    pm=pmean(e,(P.x,P.y)) if d>20 else 1
                    if pm<0.12 and d>60: continue
                    c=d/(0.3+pm)
                    if best is None or c<best[0]: best=(c,e,(P.x,P.y),min(L[i]['w'],L[j]['w']))
        if best:
            L.append({'L':LineString([best[1],best[2]]),'w':best[3],'link':1}); made+=1
            break  # neu berechnen
        else:
            nope.add(k)
    if not made: break
cs,lab=comps()
size=[sum(L[i]['L'].length for i in range(len(L)) if lab[i]==k) for k in range(len(cs))]
print('Komponenten jetzt',len(cs),sorted([round(s) for s in size],reverse=True)[:8])
main=int(np.argmax(size))
# kleine, unverbundene Reste weg
L=[L[i] for i in range(len(L)) if lab[i]==main or size[lab[i]]>600]
print('nach Filter',len(comps()[0]))
print('nach Stub',len(comps()[0]))
json.dump([{'p':[[round(x,1),round(y,1)] for x,y in l['L'].coords],'w':l['w']} for l in L],open('center_z2_raw.json','w'))
print('Linien',len(L))
