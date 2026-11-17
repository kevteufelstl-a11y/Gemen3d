import cv2,numpy as np,json,math
from skimage.morphology import skeletonize
from shapely.geometry import LineString,Polygon,Point
from shapely.ops import unary_union
from mosaic_common import OX,OY,MW,MH
Z2=json.load(open('zone2_poly.json'))
mos=cv2.imread('mosaic.png').astype(np.float32); b,g,r=cv2.split(mos); lum=(r+g+b)/3
mx=np.maximum(np.maximum(r,g),b); mn=np.minimum(np.minimum(r,g),b)
rm=cv2.imread('roadmask.png',0)>0
dens=cv2.blur(rm.astype(np.float32),(301,301))
zm=np.zeros((MH,MW),np.uint8); cv2.fillPoly(zm,[np.array([(x-OX,y-OY) for x,y in Z2],np.int32)],1)
c=((mx-mn)<24)&(lum>140)&(lum<225)&(zm>0)&(dens<0.03)
c=cv2.morphologyEx(c.astype(np.uint8),cv2.MORPH_OPEN,np.ones((2,2),np.uint8))
# nur duenne, lange Strukturen
n,lab,st,_=cv2.connectedComponentsWithStats(c,8)
keep=np.zeros(n,bool)
for i in range(1,n):
    w,h,a=st[i,2],st[i,3],st[i,4]
    keep[i]= max(w,h)>120 and a/(w*h+1)<0.25
m=keep[lab].astype(np.uint8)
m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(9,9)))
sk=skeletonize(m>0)
cv2.imwrite('paths_small.png',cv2.resize((m*255),(MW//4,MH//4)))
# trace via contours of skeleton -> use approx of each component pixels ordered by simple walk
ys,xs=np.nonzero(sk)
print('pfad pixel',len(xs))
np.save('pathskel.npy',sk.astype(np.uint8))
