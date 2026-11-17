import json, math, numpy as np
from shapely.geometry import LineString, Point, MultiLineString, Polygon
from shapely.ops import unary_union, linemerge, nearest_points
from shapely.strtree import STRtree
Z2=Polygon(json.load(open('zone2_poly.json')))
raw=json.load(open('center_z2_raw.json'))
lines=[{'L':LineString(c['p']).simplify(1.2),'w':c['w']} for c in raw]
def endpoints(L): return [Point(L.coords[0]),Point(L.coords[-1])]
def end_dir(L,first):
    cs=list(L.coords)
    if first: cs=cs[::-1]
    e=np.array(cs[-1]); acc=0; i=len(cs)-2
    while i>0 and acc<15: acc+=math.dist(cs[i],cs[i+1]); i-=1
    d=e-np.array(cs[max(i,0)]); n=np.linalg.norm(d) or 1
    return d/n
for rnd in range(3):
    geoms=[l['L'] for l in lines]; tree=STRtree(geoms)
    added=[]
    for li,l in enumerate(lines):
        L=l['L']
        for first in (True,False):
            e=Point(L.coords[0] if first else L.coords[-1])
            # schon verbunden?
            near=[j for j in tree.query(e.buffer(3.5)) if j!=li and geoms[j].distance(e)<3.5]
            if near: continue
            d=end_dir(L,first); best=None
            for j in tree.query(e.buffer(45)):
                if j==li: continue
                G=geoms[j]; dist=G.distance(e)
                if dist>45: continue
                P=nearest_points(G,e)[0]; v=np.array([P.x-e.x,P.y-e.y]); nv=np.linalg.norm(v)
                if nv<0.5: continue
                ang=math.degrees(math.acos(max(-1,min(1,float(v@d)/nv))))
                if dist>14 and ang>45: continue
                if ang>100: continue
                cost=dist*(1+ang/60)
                if best is None or cost<best[0]: best=(cost,P,l['w'])
            # auch Selbst-Verlaengerung zur eigenen Linie vermeiden; bestes Ziel verbinden
            if best:
                added.append({'L':LineString([(e.x,e.y),(best[1].x,best[1].y)]),'w':l['w']})
    lines+=added
    print('Runde',rnd,'Verbindungen',len(added))
# Komponenten
geoms=[l['L'] for l in lines]
U=unary_union([g.buffer(2.5) for g in geoms])
comps=list(U.geoms) if U.geom_type=='MultiPolygon' else [U]
keep_c=[]
for c in comps:
    tot=sum(g.length for g in geoms if g.intersects(c))
    keep_c.append((c,tot))
keep_c.sort(key=lambda t:-t[1]); print('Komponenten',len(keep_c),'groesste',[round(t[1]) for t in keep_c[:5]])
good=unary_union([c for c,t in keep_c if t>=250])
lines=[l for l in lines if l['L'].intersects(good)]
# Glaetten (Chaikin) ohne Endpunkte zu verschieben
def chaikin(cs,it=2):
    for _ in range(it):
        if len(cs)<3: return cs
        out=[cs[0]]
        for a,b in zip(cs[:-1],cs[1:]):
            out+= [(0.75*a[0]+0.25*b[0],0.75*a[1]+0.25*b[1]),(0.25*a[0]+0.75*b[0],0.25*a[1]+0.75*b[1])]
        out.append(cs[-1]); cs=out
    return cs
res=[]
for l in lines:
    cs=list(l['L'].coords)
    if len(cs)>2: cs=chaikin(cs)
    L=LineString(cs).simplify(0.6).intersection(Z2.buffer(0.5))
    for g in ([L] if L.geom_type=='LineString' else list(getattr(L,'geoms',[]))):
        if g.geom_type=='LineString' and g.length>3:
            res.append({'p':[[round(x,1),round(y,1)] for x,y in g.coords],'w':l['w']})
json.dump(res,open('center_z2_raw2.json','w'))
print('Linien',len(res))
