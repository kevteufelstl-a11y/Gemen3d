import cv2,numpy as np
im=cv2.imread('g_mos.png').astype(np.int32); b,g,r=im[...,0],im[...,1],im[...,2]; lum=(r+g+b)/3
cls=np.load('g_cls.npy')
traffic=(g>120)&(r<120)&(b<110)&(g-b>30)
text=((lum>118)&~traffic).astype(np.uint8)
text=cv2.morphologyEx(text,cv2.MORPH_OPEN,np.ones((2,2),np.uint8))
n_,lab_,st_,_=cv2.connectedComponentsWithStats(text,8); k_=np.zeros(n_,bool); k_[1:]=st_[1:,4]>=6; text=k_[lab_].astype(np.uint8)
text=cv2.dilate(text,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(9,9)))>0
road=((cls==4)|traffic)&~text
road=cv2.morphologyEx(road.astype(np.uint8),cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
road=cv2.morphologyEx(road,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5)))
n,lab,st,_=cv2.connectedComponentsWithStats(road,8)
keep=np.zeros(n,bool); keep[1:]=(st[1:,4]>60)
road=keep[lab].astype(np.uint8)
# kleine Loecher in Strassen fuellen
inv=(1-road).astype(np.uint8); n2,l2,s2,_=cv2.connectedComponentsWithStats(inv,4)
small=np.zeros(n2,bool); small[1:]=s2[1:,4]<250; road[small[l2]]=1
dt=cv2.distanceTransform(road,cv2.DIST_L2,5)
np.save('roadmask.npy',road); np.save('roaddt.npy',dt); np.save('textmask.npy',text)
