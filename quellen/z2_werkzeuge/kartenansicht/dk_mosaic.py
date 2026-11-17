import cv2,numpy as np
from dk_common import *
T=np.load('T_ref.npy',allow_pickle=True).item()
pts=[]
for f,M in T.items():
    for x,y in [(0,505),(1189,505),(0,1995),(1189,1995)]: pts.append((M@[x,y,1])[:2])
pts=np.array(pts); mn=np.floor(pts.min(0)).astype(int)-5; mx=np.ceil(pts.max(0)).astype(int)+5
W,H=mx-mn; print('Mosaik',W,H,'Ursprung',mn)
Sh=np.array([[1,0,-mn[0]],[0,1,-mn[1]],[0,0,1]],float)
acc=np.zeros((H,W,3),np.uint8)
order=sorted(T,key=lambda f:-np.sqrt(abs(np.linalg.det(T[f][:2,:2]))))  # finer (smaller scale) last
for f in order:
    im=cv2.imread(U+f+'-image.jpg'); m=cv2.erode(vmask(*im.shape[:2]),np.ones((7,7),np.uint8))
    A=(Sh@T[f])[:2]
    w=cv2.warpAffine(im,A,(W,H),flags=cv2.INTER_NEAREST); wm=cv2.warpAffine(m,A,(W,H),flags=cv2.INTER_NEAREST)>0
    acc[wm]=w[wm]
cv2.imwrite('dk_mosaic.png',acc); np.save('dk_shift.npy',mn)
cv2.imwrite('dk_small.jpg',cv2.resize(acc,(W//3,H//3)))
