import cv2, numpy as np, json, math
U='/mnt/user-data/uploads/'
F=['1d2123b3','835358cd','208f6117','510878d7','b0c6ce95','7b702e23','b29bcd12','6b874889','c5b7d10c','a4880ba5',
   'f6215239','f0fbef47','1770106a','fb54fe7e','cb787309','22282d57','78946273','0bf30a1b','7af98be5','bb1cd764',
   '8e7790eb','da132660','c01159ad','2a4d7ebe']
def _vm(h,w):
    m=np.zeros((h,w),np.uint8); m[505:1995,:]=255
    m[540:870,1010:]=0; m[1600:1970,980:]=0; m[1890:1995,40:390]=0
    return m
from dk_common import vmask
sift=cv2.SIFT_create(8000,contrastThreshold=0.02)
D={}
for f in F:
    im=cv2.imread(U+f+'-image.jpg').astype(int); b,g,r=im[...,0],im[...,1],im[...,2]
    lum=(r+g+b)/3
    cls=np.zeros(lum.shape,np.uint8)
    cls[(g>45)&(b>60)&(r<20)&(g-b>-25)]=70          # park/teal
    cls[(r>=18)&(r<=40)&(b>=85)&(b<=125)&(g>=45)&(g<=70)]=130   # buildings
    cls[(r>=44)&(r<=110)&(b>=95)&(b<=150)&(lum<120)]=230        # roads
    text=(lum>125)|((r>150)&(b<120))|((g>150)&(r<150))
    text=cv2.dilate(text.astype(np.uint8),np.ones((9,9),np.uint8))>0
    cls=cv2.GaussianBlur(cls,(3,3),0)
    m=vmask(*cls.shape); m[text]=0
    kp,de=sift.detectAndCompute(cls,m); D[f]=(kp,de)
bf=cv2.BFMatcher()
def match(a,b):
    k1,d1=D[a];k2,d2=D[b]
    mm=bf.knnMatch(d1,d2,k=2)
    good=[x for x,y in (p for p in mm if len(p)==2) if x.distance<0.75*y.distance]
    if len(good)<10: return None
    p1=np.float32([k1[x.queryIdx].pt for x in good]);p2=np.float32([k2[x.trainIdx].pt for x in good])
    M,inl=cv2.estimateAffinePartial2D(p1,p2,method=cv2.RANSAC,ransacReprojThreshold=5,maxIters=5000)
    if M is None: return None
    sc=math.hypot(M[0,0],M[1,0])
    if not 0.4<sc<2.5: return None
    return int(inl.sum()),np.vstack([M,[0,0,1]])
# pairwise
pairs={}
for i,a in enumerate(F):
    for b in F[i+1:]:
        r=match(a,b)
        if r and r[0]>=30: pairs[(a,b)]=r
print(len(pairs),'Paare')
# spanning tree from most connected
deg={f:sum(1 for k in pairs if f in k) for f in F}
root='0bf30a1b' if deg['0bf30a1b'] else max(deg,key=deg.get)
T={root:np.eye(3)}; pend=set(F)-{root}
while pend:
    best=None
    for (a,b),(n,M) in pairs.items():
        if a in T and b in pend: cand=(n,b,T[a]@np.linalg.inv(M))
        elif b in T and a in pend: cand=(n,a,T[b]@M)
        else: continue
        if best is None or cand[0]>best[0]: best=cand
    if not best: break
    n,f,M=best; T[f]=M; pend.remove(f)
    s=math.sqrt(abs(np.linalg.det(M[:2,:2]))); r=math.degrees(math.atan2(M[1,0],M[0,0]))
    print(f,'inl',n,'scale',round(s,3),'rot',round(r,1))
print('nicht verbunden:',pend,'root',root)
np.save('T_ref.npy',{k:v for k,v in T.items()},allow_pickle=True)
