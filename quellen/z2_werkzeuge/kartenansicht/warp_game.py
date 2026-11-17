import cv2,numpy as np
from dk_common import *
T=np.load('T_ref.npy',allow_pickle=True).item(); M=np.load('MOS2G.npy'); mn=np.load('dk_shift.npy')
X0,Y0,X1,Y1=-3250,-1550,1200,2550
G=np.array([[1,0,-X0],[0,1,-Y0],[0,0,1]])@M@np.array([[1,0,-mn[0]],[0,1,-mn[1]],[0,0,1]])
W,H=X1-X0,Y1-Y0
acc=np.zeros((H,W,3),np.uint8); det=np.zeros((H,W),np.uint8); cov=np.zeros((H,W),np.uint8)
order=sorted(T,key=lambda f:-np.sqrt(abs(np.linalg.det(T[f][:2,:2]))))
for f in order:
    im=cv2.imread(U+f+'-image.jpg'); m=cv2.erode(vmask(*im.shape[:2]),np.ones((7,7),np.uint8))
    A=(G@T[f])[:2]; sc=np.sqrt(abs(np.linalg.det(T[f][:2,:2])))
    w=cv2.warpAffine(im,A,(W,H),flags=cv2.INTER_LINEAR); wm=cv2.warpAffine(m,A,(W,H),flags=cv2.INTER_NEAREST)>0
    acc[wm]=w[wm]; cov[wm]=1; det[wm]=1 if sc<1.2 else 0
cv2.imwrite('g_mos.png',acc); np.save('g_det.npy',det); np.save('g_cov.npy',cov)
np.save('g_frame.npy',np.array([X0,Y0,X1,Y1]))
print(W,H,'detail-Anteil',det.mean().round(3))
