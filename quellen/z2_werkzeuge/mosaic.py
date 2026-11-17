import cv2, numpy as np, json, math, itertools
U='/mnt/user-data/uploads/'
files=['e9da125a','afc95152','5158c63b','da49096c','570bfe6e','8f86f45a','dbf0c21a','73aa2759','a1851ec5','cf4c140d','4357e01b','ecb0b953','7c5660c9',
       '555f05fa','169e5d9c','5a8c1163','35360a3e','c3f0e6be','131a828a','872e4c4d','15d6c949','e90d81c9','4b939c29']
def mask_for(h,w):
    m=np.zeros((h,w),np.uint8); m[505:1985,:]=255
    m[550:880,985:]=0; m[1595:1975,975:]=0; m[1895:1990,30:390]=0
    return m
sift=cv2.SIFT_create(6000)
data={}
for f in files:
    im=cv2.imread(U+f+'-image.jpg'); g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
    m=mask_for(*g.shape)
    kp,des=sift.detectAndCompute(g,m)
    data[f]=(im,kp,des,m)
# anchor: game->screen similarity for e9da125a
t=json.load(open('/home/claude/reg13.json'))
s,a,tx,ty=t['s'],t['a'],t['tx'],t['ty']
c,sn=math.cos(a),math.sin(a)
# screen = s*R*(g-[540,910]) + [tx,ty]  -> 3x3
G2S=np.array([[s*c,-s*sn,tx-s*(c*540-sn*910)],[s*sn,s*c,ty-s*(sn*540+c*910)],[0,0,1]])
S2G={'e9da125a':np.linalg.inv(G2S)}
bf=cv2.BFMatcher()
def match(f1,f2):
    _,k1,d1,_=data[f1]; _,k2,d2,_=data[f2]
    if d1 is None or d2 is None: return None
    mm=bf.knnMatch(d1,d2,k=2)
    good=[x for x,y in (p for p in mm if len(p)==2) if x.distance<0.72*y.distance]
    if len(good)<12: return None
    p1=np.float32([k1[x.queryIdx].pt for x in good]); p2=np.float32([k2[x.trainIdx].pt for x in good])
    M,inl=cv2.estimateAffinePartial2D(p1,p2,method=cv2.RANSAC,ransacReprojThreshold=4,maxIters=5000)
    if M is None: return None
    n=int(inl.sum()); return n,np.vstack([M,[0,0,1]])  # maps f1 -> f2
pending=[f for f in files if f not in S2G]
log=[]
while pending:
    best=None
    for f in pending:
        for r in S2G:
            res=match(f,r)
            if res and (best is None or res[0]>best[0]): best=(res[0],f,r,res[1])
    if best is None or best[0]<25: print('stop, rest:',pending, best and best[:3]); break
    n,f,r,M=best
    S2G[f]=S2G[r]@M
    sc=math.sqrt(abs(np.linalg.det(S2G[f][:2,:2]))); rot=math.degrees(math.atan2(S2G[f][1,0],S2G[f][0,0]))
    print(f'{f} <- {r} inliers {n}  game-px pro Bildpunkt {sc:.3f} rot {rot:.1f}')
    pending.remove(f)
np.save('S2G.npy',{k:v for k,v in S2G.items()},allow_pickle=True)
