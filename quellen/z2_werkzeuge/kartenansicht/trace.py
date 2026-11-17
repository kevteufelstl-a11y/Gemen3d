import cv2,numpy as np,json,math
from skimage.morphology import skeletonize
X0,Y0,X1,Y1=np.load('g_frame.npy')
m=np.load('roadmask.npy'); dt=np.load('roaddt.npy')
cls=np.load('g_cls.npy')
# Fusswege (gestrichelt): Luecken schliessen, nur lange Stuecke
foot=(cls==5).astype(np.uint8)
foot=cv2.morphologyEx(foot,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(15,15)))
n,lab,st,_=cv2.connectedComponentsWithStats(foot,8)
keep=np.zeros(n,bool); keep[1:]=np.maximum(st[1:,2],st[1:,3])>70
foot=keep[lab]&(m==0)
def trace(mask,min_len):
    sk=skeletonize(mask).astype(np.uint8); H,W=sk.shape
    k=cv2.filter2D(sk,-1,np.ones((3,3),np.float32),borderType=cv2.BORDER_CONSTANT)
    node=(sk==1)&((k==2)|(k>=4))
    def nb(y,x):
        o=[]
        for dy in (-1,0,1):
            for dx in (-1,0,1):
                if (dy or dx) and 0<=y+dy<H and 0<=x+dx<W and sk[y+dy,x+dx]: o.append((y+dy,x+dx))
        return o
    vis=np.zeros_like(sk,bool); out=[]
    for n0 in zip(*np.nonzero(node)):
        for n1 in nb(*n0):
            if vis[n1] and not node[n1]: continue
            path=[n0,n1]; prev=n0; cur=n1
            while not node[cur]:
                vis[cur]=True
                nx=[p for p in nb(*cur) if p!=prev and p!=path[-2] and (not vis[p] or node[p])]
                if not nx: break
                nn=[p for p in nx if node[p]]
                prev,cur=cur,(nn[0] if nn else nx[0]); path.append(cur)
            if len(path)>=min_len: out.append(path)
    seen=set(); res=[]
    for p in out:
        key=(min(p[0],p[-1]),max(p[0],p[-1]),len(p)//3)
        if key in seen: continue
        seen.add(key); res.append(p)
    # Ringe ohne Knoten (geschlossene Schleifen)
    return res
roads=trace(m>0,4); paths=trace(foot,10)
out=[]
for kind,ps in (('road',roads),('foot',paths)):
    for p in ps:
        arr=np.array([[x+X0,y+Y0] for y,x in p],np.float32)
        wv=float(np.median([dt[y,x] for y,x in p]))*2
        ap=cv2.approxPolyDP(arr.reshape(-1,1,2),1.2,False).reshape(-1,2)
        out.append({'p':ap.round(1).tolist(),'mw':round(wv,1),'kind':kind,'n':len(p)})
json.dump(out,open('raw_lines.json','w'))
print('Strassen',len(roads),'Wege',len(paths))
