import cv2,numpy as np,json,math
d=json.load(open('/home/claude/gemen_data.json'))
z2=json.load(open('/home/claude/z2/center_z2.json'))
mos=cv2.imread('dk_mosaic.png').astype(int); b,g,r=mos[...,0],mos[...,1],mos[...,2]; lum=(r+g+b)/3
road=((r>=44)&(r<=110)&(b>=95)&(b<=150)&(lum<120)).astype(np.uint8)
road=cv2.morphologyEx(road,cv2.MORPH_OPEN,np.ones((2,2),np.uint8))
cv2.imwrite('dk_road.png',road*255)
X0,Y0,X1,Y1,RS=-5200,-3200,3200,4200,0.25
W,H=int((X1-X0)*RS),int((Y1-Y0)*RS)
R=np.zeros((H,W),np.uint8)
for l in d['center']+z2:
    p=np.array([[(x-X0)*RS,(y-Y0)*RS] for x,y in l['p']],np.int32); cv2.polylines(R,[p],False,255,2)
Rb=cv2.GaussianBlur(R.astype(np.float32),(0,0),2.5)
small=cv2.resize(road.astype(np.float32),None,fx=0.25,fy=0.25,interpolation=cv2.INTER_AREA)
best=(-1,)
for sc in np.arange(0.6,1.45,0.025):
    s=sc*RS/0.25   # game-raster px per small-mosaic px
    for rot in np.arange(-60,61,2):
        a=math.radians(rot); c,sn=math.cos(a)*s,math.sin(a)*s
        h,w=small.shape
        corners=np.array([[0,0],[w,0],[0,h],[w,h]],float)
        M=np.array([[c,-sn,0],[sn,c,0]])
        cc=corners@M[:,:2].T; mn=cc.min(0); M[:,2]=-mn; sz=np.ceil(cc.max(0)-mn).astype(int)+1
        if sz[0]>=W or sz[1]>=H: continue
        Tm=cv2.warpAffine(small,M,(sz[0],sz[1]))
        Tb=cv2.GaussianBlur(Tm,(0,0),1.5)
        res=cv2.matchTemplate(Rb,Tb,cv2.TM_CCORR_NORMED)
        _,v,_,loc=cv2.minMaxLoc(res)
        if v>best[0]: best=(v,sc,rot,M.copy(),loc)
print('best',best[0],best[1],best[2])
v,sc,rot,M,loc=best
# compose: mosaic px -> small (0.25) -> warped template -> raster -> game
A=np.vstack([M,[0,0,1]])@np.diag([0.25,0.25,1])
A=np.array([[1,0,loc[0]],[0,1,loc[1]],[0,0,1]])@A
A=np.array([[1/RS,0,X0],[0,1/RS,Y0],[0,0,1]])@A
np.save('MOS2G.npy',A); print(A)
