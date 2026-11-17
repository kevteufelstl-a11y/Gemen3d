import json,math,numpy as np
from shapely.geometry import LineString,Point,MultiLineString
from shapely.ops import linemerge,unary_union
from shapely.strtree import STRtree
R=json.load(open('raw_lines.json'))
roads=[r for r in R if r['kind']=='road' and len(r['p'])>=2]
foot=[r for r in R if r['kind']=='foot' and len(r['p'])>=2]
def key(p): return (round(p[0]/2.5),round(p[1]/2.5))
L=[{'L':LineString(r['p']),'mw':r['mw']} for r in roads]
for it in range(6):
    from collections import Counter
    cnt=Counter()
    for l in L:
        for e in (l['L'].coords[0],l['L'].coords[-1]): cnt[key(e)]+=1
    def deg(e):
        k=key(e); return sum(cnt.get((k[0]+a,k[1]+b),0) for a in (-1,0,1) for b in (-1,0,1))
    n0=len(L)
    L=[l for l in L if not ((deg(l['L'].coords[0])<=1 or deg(l['L'].coords[-1])<=1) and l['L'].length<(14 if it<4 else 22))]
    L=[l for l in L if l['L'].length>2]
    if len(L)==n0: break
print('nach Stummel-Entfernung',len(L))
# Laengere Strassen zusammenfuegen (Breite = laengengewichtet)
merged=linemerge(MultiLineString([l['L'] for l in L]))
geoms=list(merged.geoms) if merged.geom_type=='MultiLineString' else [merged]
tree=STRtree([l['L'] for l in L])
out=[]
for g in geoms:
    idx=tree.query(g.buffer(0.5))
    ws=[(L[i]['L'].length,L[i]['mw']) for i in idx if L[i]['L'].within(g.buffer(0.6))]
    mw=sum(a*b for a,b in ws)/max(1,sum(a for a,b in ws)) if ws else 8
    out.append({'p':[list(c) for c in g.simplify(0.8).coords],'mw':round(mw,1),'kind':'road'})
for f in foot: out.append({'p':LineString(f['p']).simplify(1.0).coords[:] ,'mw':4,'kind':'foot'})
out=[dict(o,p=[list(c) for c in o['p']]) for o in out]
json.dump(out,open('lines_clean.json','w')); print('Linien',len(out))
