import numpy as np
U='/mnt/user-data/uploads/'
def vmask(h,w):
    m=np.zeros((h,w),np.uint8); m[505:1995,:]=255
    m[540:870,1010:]=0; m[1600:1970,980:]=0; m[1890:1995,40:390]=0
    return m
