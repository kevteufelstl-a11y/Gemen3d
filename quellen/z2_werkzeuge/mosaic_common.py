import cv2, numpy as np
U='/mnt/user-data/uploads/'
S2G=np.load('/home/claude/z2/S2G.npy',allow_pickle=True).item()
OX,OY=-3400,-1550
MW,MH=6400,5900
def mask_for(h,w):
    m=np.zeros((h,w),np.uint8); m[505:1985,:]=255
    m[550:880,985:]=0; m[1595:1975,975:]=0; m[1895:1990,30:390]=0
    return m
