import cv2,numpy as np,json,sys,colorsys
from shapely.geometry import LineString
from shapely.ops import unary_union
from mosaic_common import OX,OY
f=sys.argv[1]; out=sys.argv[2]
mos=(cv2.imread('mosaic.png')*0.6).astype(np.uint8)
L=json.load(open(f))
geoms=[LineString(l['p']) for l in L]
U=unary_union([g.buffer(2.5) for g in geoms]); comps=list(U.geoms) if U.geom_type=='MultiPolygon' else [U]
comps.sort(key=lambda c:-c.area)
for ci,c in enumerate(comps):
    col=(0,255,255) if ci==0 else tuple(int(v*255) for v in colorsys.hsv_to_rgb((ci*0.13)%1,1,1))
    for g in geoms:
        if g.intersects(c): cv2.polylines(mos,[np.array([[x-OX,y-OY] for x,y in g.coords],np.int32)],False,col,6)
c=mos[-1450-OY:2400-OY,-3150-OX:300-OX]; cv2.imwrite(out,cv2.resize(c,(c.shape[1]//4,c.shape[0]//4)))
print(len(comps))
