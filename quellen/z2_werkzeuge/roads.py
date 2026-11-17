import cv2, numpy as np, json
from mosaic_common import OX,OY,MW,MH
from shapely.geometry import Polygon
Z2=[(-2960,1130),(-280,-1250),(80,-1250),(80,0),(0,0),(0,1820),(0,2370),(-2600,2370),(-2600,1500)]
json.dump(Z2,open('zone2_poly.json','w'))
mos=cv2.imread('mosaic.png').astype(int); b,g,r=mos[...,0],mos[...,1],mos[...,2]
mx=np.maximum(np.maximum(r,g),b); mn=np.minimum(np.minimum(r,g),b)
lum=(r+g+b)/3.0
mu=cv2.blur(lum,(5,5)); sd=np.sqrt(np.maximum(cv2.blur(lum*lum,(5,5))-mu*mu,0))
gray=((mx-mn)<16)&(lum>118)&(lum<190)&(r>=g-3)&(b>=g-3)&(sd<9)
yel=(r>200)&(g>185)&(b<175)&(b>90)&((r-b)>45)
zm=np.zeros((MH,MW),np.uint8)
cv2.fillPoly(zm,[np.array([(x-OX,y-OY) for x,y in Z2],np.int32)],1)
z1=np.zeros_like(zm); z1[0-OY:1820-OY,0-OX:1080-OX]=1
m=((gray|yel)&(zm>0)).astype(np.uint8)
m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
n,lab,st,_=cv2.connectedComponentsWithStats(m,8)
keep=np.zeros(n,bool); keep[1:]=st[1:,cv2.CC_STAT_AREA]>400
m=keep[lab].astype(np.uint8)
cv2.imwrite('roadmask.png',m*255)
np.save('yel.npy',(yel&(zm>0)))
sm=cv2.resize(m*255,(MW//4,MH//4),interpolation=cv2.INTER_AREA)
cv2.imwrite('roadmask_small.png',sm)
