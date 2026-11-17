import cv2, numpy as np, json
from mosaic_common import *
Z2=json.load(open('zone2_poly.json'))
T=np.array([[1,0,-OX],[0,1,-OY],[0,0,1]],float)
votes=np.zeros((MH,MW),np.float32); cover=np.zeros((MH,MW),np.float32)
for f,M in S2G.items():
    im=cv2.imread(U+f+'-image.jpg').astype(np.float32)
    b,g,r=im[...,0],im[...,1],im[...,2]
    mx=np.maximum(np.maximum(r,g),b); mn=np.minimum(np.minimum(r,g),b); lum=(r+g+b)/3
    mu=cv2.blur(lum,(5,5)); sd=np.sqrt(np.maximum(cv2.blur(lum*lum,(5,5))-mu*mu,0))
    road=((mx-mn)<18)&(lum>105)&(lum<200)&(r>=g-4)&(b>=g-4)&(sd<10)
    yel=(r>190)&(g>175)&(b<180)&((r-b)>40)&(sd<14)
    m=(road|yel).astype(np.uint8)*255
    m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
    vm=mask_for(*m.shape); vm=cv2.erode(vm,np.ones((9,9),np.uint8))
    A=(T@M)[:2]
    scale=np.sqrt(abs(np.linalg.det(M[:2,:2])))
    w=cv2.warpAffine(m,A,(MW,MH),flags=cv2.INTER_LINEAR).astype(np.float32)/255
    c=cv2.warpAffine(vm,A,(MW,MH),flags=cv2.INTER_NEAREST).astype(np.float32)/255
    wt=1.0/max(scale,0.5)   # detailed images count more
    votes+=w*c*wt; cover+=c*wt
p=votes/np.maximum(cover,1e-3)
np.save('roadprob.npy',p.astype(np.float16))
zm=np.zeros((MH,MW),np.uint8); cv2.fillPoly(zm,[np.array([(x-OX,y-OY) for x,y in Z2],np.int32)],1)
m=((p>0.17)&(zm>0)).astype(np.uint8)
m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(13,13)))
n,lab,st,_=cv2.connectedComponentsWithStats(m,8)
keep=np.zeros(n,bool); keep[1:]=st[1:,cv2.CC_STAT_AREA]>500
m=keep[lab].astype(np.uint8)
cv2.imwrite('roadmask.png',m*255)
cv2.imwrite('roadmask_small.png',cv2.resize(m*255,(MW//4,MH//4),interpolation=cv2.INTER_AREA))
