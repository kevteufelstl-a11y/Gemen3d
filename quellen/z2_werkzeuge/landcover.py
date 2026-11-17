import cv2, numpy as np, json
from mosaic_common import OX,OY,MW,MH
Z2=json.load(open('zone2_poly.json'))
mos=cv2.imread('mosaic.png').astype(np.float32)
b,g,r=cv2.split(mos); lum=(r+g+b)/3
zm=np.zeros((MH,MW),np.uint8); cv2.fillPoly(zm,[np.array([(x-OX,y-OY) for x,y in Z2],np.int32)],1)
have=np.load('have.npy')
mu=cv2.blur(lum,(15,15)); sd=np.sqrt(np.maximum(cv2.blur(lum*lum,(15,15))-mu*mu,0))
lb=cv2.blur(lum,(7,7)); gb=cv2.blur(g,(7,7)); rb=cv2.blur(r,(7,7)); bb=cv2.blur(b,(7,7))
rm=cv2.imread('roadmask.png',0)>0
resid=cv2.dilate(rm.astype(np.uint8),cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(91,91)))
dens=cv2.blur(rm.astype(np.float32),(301,301))
residential=(dens>0.035)
water=(lb<68)&((gb-np.maximum(rb,bb))<12)&(zm>0)&(have>0)&(~residential)
water=cv2.morphologyEx(water.astype(np.uint8),cv2.MORPH_OPEN,np.ones((5,5),np.uint8))
n,lab,st,_=cv2.connectedComponentsWithStats(water,8)
keep=np.zeros(n,bool)
for i in range(1,n):
    a=st[i,cv2.CC_STAT_AREA]; w,h=st[i,cv2.CC_STAT_WIDTH],st[i,cv2.CC_STAT_HEIGHT]
    keep[i]= a>2500 and (max(w,h)>250 or a>15000)
water=keep[lab].astype(np.uint8)
water=cv2.morphologyEx(water,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(9,9)))
# vegetation
greenish=(gb>rb+6)&(gb>bb+4)
forest=greenish&(lb<85)&(sd>9)
meadow=((gb>rb-2)&(lb>=55))&(~residential)&(zm>0)
forest=cv2.morphologyEx(forest.astype(np.uint8),cv2.MORPH_OPEN,np.ones((9,9),np.uint8))
meadow=cv2.morphologyEx(meadow.astype(np.uint8),cv2.MORPH_OPEN,np.ones((11,11),np.uint8))
# keep only large patches (not gardens)
def big(m,amin):
    n,lab,st,_=cv2.connectedComponentsWithStats(m,8); k=np.zeros(n,bool); k[1:]=st[1:,cv2.CC_STAT_AREA]>amin; return k[lab].astype(np.uint8)
forest=big(forest,6000); meadow=big(meadow,12000); meadow[forest>0]=0; meadow[water>0]=0
np.savez_compressed('landcover.npz',water=water,forest=forest,meadow=meadow,zm=zm)
vis=(mos*0.6).astype(np.uint8)
vis[water>0]=(255,80,0); vis[forest>0]=(0,90,0); vis[meadow>0]=(80,220,120)
c=vis[-1450-OY:2400-OY,-3150-OX:1100-OX]; cv2.imwrite('landcover.jpg',cv2.resize(c,(c.shape[1]//4,c.shape[0]//4)))
