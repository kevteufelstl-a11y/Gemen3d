import json, numpy as np, cv2, math
from shapely.geometry import LineString, Point, Polygon
from shapely.ops import linemerge, unary_union
from mosaic_common import OX,OY
Z2=Polygon(json.load(open('zone2_poly.json')))
P=json.load(open('polys_raw.json'))
mos=cv2.imread('mosaic.png')
def colat(x,y):
    return mos[int(y-OY),int(x-OX)].astype(int)[::-1]
lines=[]
for p in P:
    L=LineString(p['p'])
    if L.length<8: continue
    # yellow (B70)?
    pts=[L.interpolate(t,normalized=True) for t in np.linspace(0,1,9)]
    yel=sum(1 for q in pts if (lambda c:(c[0]-c[2]>40 and c[0]>170))(colat(q.x,q.y)))>=5
    lines.append({'L':L,'mw':p['mw'],'yel':yel})
# endpoint degree
eps=[]
for i,l in enumerate(lines):
    for e in (l['L'].coords[0],l['L'].coords[-1]): eps.append((i,e))
def deg(e):
    return sum(1 for j,f in eps if math.dist(e,f)<4)
keep=[]
for i,l in enumerate(lines):
    a,b=l['L'].coords[0],l['L'].coords[-1]
    free=(deg(a)<=1)+(deg(b)<=1)
    if l['mw']<3.5: continue
    if free==2 and l['L'].length<70: continue
    if free>=1 and l['mw']<5 and l['L'].length<40: continue
    keep.append(l)
print(len(lines),'->',len(keep))
# drop loops / tortuous junk
k2=[]
for l in keep:
    L=l['L']; a,b=L.coords[0],L.coords[-1]; ch=math.dist(a,b)
    if ch<8 and L.length<200: continue
    if L.length<150 and L.length/max(ch,1)>2.2: continue
    k2.append(l)
keep=k2
mids=np.array([[l['L'].interpolate(0.5,normalized=True).x,l['L'].interpolate(0.5,normalized=True).y] for l in keep])
mws=np.array([l['mw'] for l in keep])
out=[]
for i,l in enumerate(keep):
    dd=np.hypot(*(mids-mids[i]).T); nb=mws[(dd<300)&(mws>=4)]
    med=np.median(nb) if len(nb)>3 else 8
    r=l['mw']/med
    if l['yel']: w=21.6
    elif r>1.4 and l['L'].length>60: w=15.3
    elif r<0.62: w=5.7
    else: w=13.4
    out.append({'p':[list(map(lambda v:round(v,1),c)) for c in l['L'].coords],'w':w})
json.dump(out,open('center_z2_raw.json','w'))
import collections; print(collections.Counter(o['w'] for o in out))
