import cv2, numpy as np, json, math
from skimage.morphology import skeletonize
from mosaic_common import OX,OY,MW,MH
m=(cv2.imread('roadmask.png',0)>0)
yel=np.load('yel.npy') if False else None
dt=cv2.distanceTransform(m.astype(np.uint8),cv2.DIST_L2,5)
sk=skeletonize(m).astype(np.uint8)
def nbrs(y,x):
    out=[]
    for dy in (-1,0,1):
        for dx in (-1,0,1):
            if (dy or dx) and 0<=y+dy<MH and 0<=x+dx<MW and sk[y+dy,x+dx]: out.append((y+dy,x+dx))
    return out
# ---- gap bridging: from endpoints extend along direction
ys,xs=np.nonzero(sk)
def endpoints():
    k=cv2.filter2D(sk,-1,np.ones((3,3),np.float32),borderType=cv2.BORDER_CONSTANT)
    return list(zip(*np.nonzero((sk==1)&(k==2))))
for it in range(2):
    eps=endpoints(); added=0
    for (y,x) in eps:
        # direction from walking back 12 px
        path=[(y,x)]; prev=None; cur=(y,x)
        for _ in range(12):
            nb=[p for p in nbrs(*cur) if p!=prev and p not in path]
            if not nb: break
            prev,cur=cur,nb[0]; path.append(cur)
        if len(path)<6: continue
        dy,dx=y-path[-1][0],x-path[-1][1]; L=math.hypot(dy,dx); dy/=L; dx/=L
        hit=None
        for step in range(3,55):
            py,px=int(round(y+dy*step)),int(round(x+dx*step))
            if not(0<=py<MH and 0<=px<MW): break
            win=sk[max(0,py-2):py+3,max(0,px-2):px+3]
            if win.any():
                hit=(py,px); break
        if hit:
            cv2.line(sk,(x,y),(hit[1],hit[0]),1,1); added+=1
    sk=skeletonize(sk>0).astype(np.uint8)
    print('bridged',added)
np.save('skel.npy',sk)
# ---- trace graph
k=cv2.filter2D(sk,-1,np.ones((3,3),np.float32),borderType=cv2.BORDER_CONSTANT)
node=(sk==1)&((k==2)|(k>=4))
visited=np.zeros_like(sk,bool)
polys=[]
nodes=list(zip(*np.nonzero(node)))
for n in nodes:
    for nb in nbrs(*n):
        if visited[nb] and not node[nb]: continue
        path=[n,nb]; prev=n; cur=nb
        while not node[cur]:
            visited[cur]=True
            nx=[p for p in nbrs(*cur) if p!=prev and p!=path[-2]]
            nx=[p for p in nx if not visited[p] or node[p]]
            if not nx: break
            # prefer node if adjacent
            nn=[p for p in nx if node[p]]
            prev,cur=cur,(nn[0] if nn else nx[0]); path.append(cur)
        if len(path)>=8:
            polys.append(path)
# dedupe (each edge traced twice from both ends)
seen=set(); out=[]
for p in polys:
    key=(min(p[0],p[-1]),max(p[0],p[-1]),len(p)//4)
    if key in seen: continue
    seen.add(key); out.append(p)
res=[]
for p in out:
    arr=np.array([[x+OX,y+OY] for y,x in p],np.float32)
    w=float(np.median([dt[y,x] for y,x in p]))*2
    ap=cv2.approxPolyDP(arr.reshape(-1,1,2),1.6,False).reshape(-1,2)
    res.append({'p':ap.round(1).tolist(),'mw':round(w,1),'len':len(p)})
json.dump(res,open('polys_raw.json','w'))
print(len(res),'Linien')
