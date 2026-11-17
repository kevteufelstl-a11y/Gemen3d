import cv2,numpy as np,json
from mosaic_common import OX,OY,MW,MH
Z2=json.load(open('zone2_poly.json'))
mos=cv2.imread('mosaic.png')
f=mos.astype(np.float32); b,g,r=cv2.split(f); lum=(r+g+b)/3
hsv=cv2.cvtColor(mos,cv2.COLOR_BGR2HSV).astype(np.float32); H,S,V=cv2.split(hsv)
road=cv2.dilate(cv2.imread('roadmask.png',0),np.ones((5,5),np.uint8))>0
dens=cv2.blur((cv2.imread('roadmask.png',0)>0).astype(np.float32),(301,301))
zm=np.zeros((MH,MW),np.uint8); cv2.fillPoly(zm,[np.array([(x-OX,y-OY) for x,y in Z2],np.int32)],1)
veg=(g>r+2)&(g>=b-2)
redroof=(r>g+18)&(r>b+18)&(lum>55)
grayroof=((np.maximum(np.maximum(r,g),b)-np.minimum(np.minimum(r,g),b))<22)&(lum>38)&(lum<110)
roof=(redroof|grayroof)&(~veg)&(~road)&(zm>0)&(dens>0.02)
roof=cv2.morphologyEx(roof.astype(np.uint8),cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
roof=cv2.morphologyEx(roof,cv2.MORPH_CLOSE,np.ones((3,3),np.uint8))
# Trennen zusammenhaengender Doppelhaeuser per Distanztransformation
n,lab,st,_=cv2.connectedComponentsWithStats(roof,8)
out=[]
for i in range(1,n):
    a=st[i,4]
    if a<110 or a>4000: continue
    x,y,w,h=st[i,:4]
    sub=(lab[y:y+h,x:x+w]==i).astype(np.uint8)
    cs,_=cv2.findContours(sub,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
    c=max(cs,key=cv2.contourArea)
    rect=cv2.minAreaRect(c); (cx,cy),(rw,rh),ang=rect
    if rw*rh<1: continue
    sol=a/(rw*rh)
    if sol<0.55 or max(rw,rh)/max(1,min(rw,rh))>4.5: continue
    if min(rw,rh)<8: continue
    out.append({'c':[cx+x+OX,cy+y+OY],'s':[rw,rh],'a':ang,'col':'red' if redroof[int(cy+y),int(cx+x)] else 'gray','area':int(a)})
print('Daecher',len(out))
json.dump(out,open('roofs.json','w'))
vis=(mos*0.7).astype(np.uint8)
for o in out:
    bx=cv2.boxPoints(((o['c'][0]-OX,o['c'][1]-OY),tuple(o['s']),o['a'])).astype(np.int32)
    cv2.polylines(vis,[bx],True,(0,255,255),2)
c=vis[400-OY:1300-OY,-1300-OX:-200-OX]; cv2.imwrite('roofs_view.jpg',cv2.resize(c,(c.shape[1]*3//4,c.shape[0]*3//4)))
