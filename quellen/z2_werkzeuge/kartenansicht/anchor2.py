import cv2,numpy as np,json,math
from skimage.morphology import skeletonize
d=json.load(open('/home/claude/gemen_data.json'))
z2=json.load(open('/home/claude/z2/center_z2.json'))
# Startwert aus zwei Hand-Punkten (Mosaik -> Spiel)
P=np.array([[4296,2385],[270,2205]],float); Q=np.array([[899,673],[-2510,1610]],float)
dp=P[0]-P[1]; dq=Q[0]-Q[1]
s=np.linalg.norm(dq)/np.linalg.norm(dp); a=math.atan2(dq[1],dq[0])-math.atan2(dp[1],dp[0])
def mk(s,a,tx,ty): c,sn=math.cos(a)*s,math.sin(a)*s; return np.array([[c,-sn,tx],[sn,c,ty],[0,0,1]])
M=mk(s,a,0,0); t=Q[0]-(M@[*P[0],1])[:2]; M=mk(s,a,*t)
print('Start s',s,'rot',math.degrees(a))
X0,Y0,X1,Y1=-3600,-1800,1600,2600
R=np.zeros((Y1-Y0,X1-X0),np.uint8)
for l in d['center']:
    cv2.polylines(R,[np.array([[x-X0,y-Y0] for x,y in l['p']],np.int32)],False,255,3)
w1=R.copy()
for l in z2: cv2.polylines(R,[np.array([[x-X0,y-Y0] for x,y in l['p']],np.int32)],False,255,3)
DT=cv2.distanceTransform(255-R,cv2.DIST_L2,5); DT=np.minimum(DT,25)
road=cv2.imread('dk_road.png',0)>0
sk=skeletonize(road); ys,xs=np.nonzero(sk); idx=np.random.default_rng(0).choice(len(xs),min(25000,len(xs)),replace=False)
pts=np.stack([xs[idx],ys[idx],np.ones(len(idx))]).astype(float)
def cost(p):
    M=mk(*p); g=M@pts; x=(g[0]-X0).astype(int); y=(g[1]-Y0).astype(int)
    ok=(x>=0)&(y>=0)&(x<DT.shape[1])&(y<DT.shape[0])
    return DT[y[ok],x[ok]].mean()+25*(1-ok.mean())
p=np.array([s,a,M[0,2],M[1,2]]); c0=cost(p); print('Startkosten',c0)
steps=np.array([0.01,math.radians(1),20,20])
for it in range(60):
    imp=False
    for i in range(4):
        for sgn in (1,-1):
            q=p.copy(); q[i]+=sgn*steps[i]
            # bei Skalierung/Drehung um den Mittelpunkt drehen
            if i<2:
                cx,cy=pts[0].mean(),pts[1].mean(); g0=mk(*p)@[cx,cy,1]; g1=mk(*q)@[cx,cy,1]; q[2]+=g0[0]-g1[0]; q[3]+=g0[1]-g1[1]
            cq=cost(q)
            if cq<c0: p,c0,imp=q,cq,True
    if not imp:
        steps/=2
        if steps[2]<0.5: break
print('Ergebnis s',p[0],'rot',math.degrees(p[1]),'kosten',c0)
np.save('MOS2G.npy',mk(*p))
