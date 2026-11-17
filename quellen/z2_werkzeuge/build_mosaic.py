from mosaic_common import *
# order: finest resolution last so it overwrites (smaller game-px per screen px = more detail)
items=sorted(S2G.items(), key=lambda kv: -np.sqrt(abs(np.linalg.det(kv[1][:2,:2]))))
acc=np.zeros((MH,MW,3),np.uint8); have=np.zeros((MH,MW),np.uint8)
T=np.array([[1,0,-OX],[0,1,-OY],[0,0,1]],float)
for f,M in items:
    im=cv2.imread(U+f+'-image.jpg'); m=mask_for(*im.shape[:2])
    m=cv2.erode(m,np.ones((9,9),np.uint8))
    A=(T@M)[:2]
    w=cv2.warpAffine(im,A,(MW,MH),flags=cv2.INTER_LINEAR)
    wm=cv2.warpAffine(m,A,(MW,MH),flags=cv2.INTER_NEAREST)>0
    acc[wm]=w[wm]; have|=wm.astype(np.uint8)
cv2.imwrite('mosaic.png',acc); np.save('have.npy',have)
small=cv2.resize(acc,(MW//4,MH//4),interpolation=cv2.INTER_AREA)
# draw zone1 rect
x0,y0=(0-OX)//4,(0-OY)//4; cv2.rectangle(small,(x0,y0),(x0+1080//4,y0+1820//4),(255,0,255),2)
cv2.imwrite('mosaic_small.jpg',small)
print('ok')
