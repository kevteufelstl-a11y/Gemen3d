import cv2,numpy as np,json
d=json.load(open('/home/claude/gemen_data.json'))
M=np.load('MOS2G.npy'); mos=cv2.imread('dk_mosaic.png')
X0,Y0,X1,Y1=-3400,-1600,1300,2500
A=np.array([[1,0,-X0],[0,1,-Y0],[0,0,1]])@M
w=cv2.warpAffine(mos,A[:2],(X1-X0,Y1-Y0))
for l in d['center']: cv2.polylines(w,[np.array([[x-X0,y-Y0] for x,y in l['p']],np.int32)],False,(0,0,255),3)
for wa in d['water']: cv2.polylines(w,[np.array([[x-X0,y-Y0] for x,y in wa['o']],np.int32)],True,(0,255,255),2)
cv2.rectangle(w,(0-X0,0-Y0),(1080-X0,1820-Y0),(255,0,255),3)
cv2.imwrite('anchor_all.jpg',cv2.resize(w,(w.shape[1]//4,w.shape[0]//4)))
c=w[300-Y0:1500-Y0,-400-X0:1080-X0]; cv2.imwrite('anchor_z1.jpg',cv2.resize(c,(c.shape[1]//2,c.shape[0]//2)))
np.save('warp_origin.npy',np.array([X0,Y0,X1,Y1]))
