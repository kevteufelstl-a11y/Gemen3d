import cv2,numpy as np
im=cv2.imread('g_mos.png').astype(np.int32); b,g,r=im[...,0],im[...,1],im[...,2]; lum=(r+g+b)/3
cov=np.load('g_cov.npy')>0
road=(r>=44)&(r<=120)&(b>=92)&(b<=160)&(lum<125)&(b-r>25)
traffic=((g>120)&(r<120)&(b<110)&(g-b>30))|((r>200)&(g>120)&(b<80))   # gruen/orange Verkehrslinie
text=(lum>125)
bld=(r>=18)&(r<=42)&(b>=84)&(b<=128)&(g>=44)&(g<=72)
park=(g>=44)&(g<=95)&(b>=56)&(b<=105)&(r<=22)&(g-r>30)
water=(lum<28)&(b>=28)&(r<=12)
foot=(g>100)&(g-r>40)&(g-b>10)&(lum<140)&~traffic
cls=np.zeros(r.shape,np.uint8)
cls[park]=1; cls[water]=2; cls[bld]=3; cls[road|traffic]=4; cls[foot]=5; cls[text]=6; cls[~cov]=7
np.save('g_cls.npy',cls)
pal=np.array([[60,30,20],[80,140,40],[160,60,0],[60,60,230],[200,200,200],[0,255,0],[255,255,255],[0,0,0]],np.uint8)
v=pal[cls]
c=v[2000:2900,1800:3000]; cv2.imwrite('cls_crop.png',c)
cv2.imwrite('cls_small.jpg',cv2.resize(v,(v.shape[1]//4,v.shape[0]//4),interpolation=cv2.INTER_NEAREST))
