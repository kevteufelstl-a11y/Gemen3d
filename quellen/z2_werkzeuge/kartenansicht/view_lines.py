import cv2,numpy as np,json,sys,colorsys
from shapely.geometry import LineString
from shapely.ops import unary_union
X0,Y0,X1,Y1=np.load('g_frame.npy')
f=sys.argv[1]; out=sys.argv[2]
img=(cv2.imread('g_mos.png')*0.6).astype(np.uint8)
L=json.load(open(f)); geoms=[LineString(l['p']) for l in L]
U=unary_union([g.buffer(2) for g in geoms]); cs=sorted(list(getattr(U,'geoms',[U])),key=lambda c:-c.area)
lab={}
for i,c in enumerate(cs):
    for j,g in enumerate(geoms):
        if j not in lab and g.intersects(c): lab[j]=i
for j,l in enumerate(L):
    i=lab.get(j,0); col=(0,255,255) if i==0 else tuple(int(v*255) for v in colorsys.hsv_to_rgb((i*0.17)%1,1,1))
    if l.get('kind')=='foot': col=(0,255,0)
    cv2.polylines(img,[np.array([[x-X0,y-Y0] for x,y in l['p']],np.int32)],False,col,3)
if len(sys.argv)>3:
    x0,y0,x1,y1=map(int,sys.argv[3].split(','))
    c=img[y0-Y0:y1-Y0,x0-X0:x1-X0]; cv2.imwrite(out,c)
else:
    cv2.imwrite(out,cv2.resize(img,(img.shape[1]//4,img.shape[0]//4)))
print('Komponenten',len(cs))
