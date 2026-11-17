import json, math
from shapely.geometry import LineString, Point, Polygon, box
from shapely.ops import nearest_points
d=json.load(open('/home/claude/gemen_data.json'))
Z2=Polygon(json.load(open('zone2_poly.json')))
Z1=box(0,0,1080,1820)
lines=json.load(open('center_z2_raw.json'))
# clip away anything inside zone 1
clip=[]
for l in lines:
    g=LineString(l['p']).difference(Z1.buffer(-0.5))
    gs=[g] if g.geom_type=='LineString' else list(getattr(g,'geoms',[]))
    for s in gs:
        if s.length>6: clip.append({'p':[list(c) for c in s.coords],'w':l['w']})
# zone1 border endpoints (left edge and top edge x<80)
ends=[]
for c in d['center']:
    for e in (c['p'][0],c['p'][-1]):
        if e[0]<=6 or (e[1]<=6 and e[0]<=80): ends.append((tuple(e),c['w']))
print('Zone-1-Anschluesse:',[(e,w) for e,w in ends])
conn=[]
for e,w in ends:
    P=Point(e); best=None
    for i,l in enumerate(clip):
        L=LineString(l['p']); dd=L.distance(P)
        if best is None or dd<best[0]: best=(dd,i)
    dd,i=best
    L=LineString(clip[i]['p']); q=nearest_points(L,P)[0]
    if dd<45:
        # snap: extend zone2 line to exactly the zone1 endpoint
        conn.append({'p':[[round(q.x,1),round(q.y,1)],[e[0],e[1]]],'w':w,'link':'z1'})
        print('verbunden',e,'Abstand',round(dd,1),'px =',round(dd*0.492,1),'m')
    else:
        print('KEIN Gegenstueck fuer',e,'naechste Linie',round(dd,1),'px')
json.dump(clip+conn,open('center_z2.json','w'))
print(len(clip)+len(conn),'Linien')
