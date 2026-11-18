import json,base64,io,numpy as np
from PIL import Image
from gl import load,comps,D
rng=np.random.default_rng(7)
def b64(a): return base64.b64encode(np.ascontiguousarray(a).tobytes()).decode()
def merge(parts):
    P=[];N=[];U=[];C=[];I=[];o=0
    for p in parts:
        P.append(p['P']);N.append(p['N']);U.append(p['U']);C.append(p['C']);I.append(p['I']+o);o+=len(p['P'])
    return dict(P=np.concatenate(P),N=np.concatenate(N),U=np.concatenate(U),C=np.concatenate(C),I=np.concatenate(I))
def enc(g,uvs=1.0):
    P,N,U,C,I=g['P'],g['N'],g['U'],g['C'],g['I']
    used=np.unique(I); remap=-np.ones(len(P),np.int64); remap[used]=np.arange(len(used))
    P,N,U,C,I=P[used],N[used],U[used],C[used],remap[I]
    assert len(P)<65536
    s=float(np.abs(P).max())/32767 or 1
    nn=N/np.maximum(np.linalg.norm(N,axis=1,keepdims=True),1e-6)
    us=float(max(1.0,np.abs(U).max()))/32767
    c=np.clip(C.mean(1)*255,0,255).astype(np.uint8)
    return dict(s=s,us=us,p=b64(np.round(P/s).astype(np.int16)),n=b64(np.round(nn*127).astype(np.int8)),
                u=b64(np.round(U/us).astype(np.int16)),c=b64(c),i=b64(I.astype(np.uint16)),nt=int(len(I)//3))
def sub(p,mask_tris):
    T=p['I'].reshape(-1,3)[mask_tris].reshape(-1)
    return dict(P=p['P'],N=p['N'],U=p['U'],C=p['C'],I=T)
def leaf_lod(p,k,sc):
    r=comps(p['I'],len(p['P'])); T=p['I'].reshape(-1,3)
    ids=np.unique(r); keep=set(ids[rng.permutation(len(ids))[:max(1,len(ids)//k)]])
    m=np.array([x in keep for x in r])
    P=p['P'].copy()
    for cid in keep:
        vs=np.unique(T[r==cid].reshape(-1)); c=P[vs].mean(0); P[vs]=c+(P[vs]-c)*sc
    return dict(P=P,N=p['N'],U=p['U'],C=p['C'],I=T[m].reshape(-1))
def bark_lod(p,maxt):
    r=comps(p['I'],len(p['P'])); T=p['I'].reshape(-1,3)
    ids,cnt=np.unique(r,return_counts=True); o=np.argsort(-cnt); keep=[];tot=0
    for j in o:
        if keep and tot+cnt[j]>maxt: continue
        keep.append(ids[j]); tot+=cnt[j]
    m=np.isin(r,keep); return dict(P=p['P'],N=p['N'],U=p['U'],C=p['C'],I=T[m].reshape(-1))
def img_url(im,fmt,q=80):
    b=io.BytesIO(); im.save(b,fmt,quality=q, method=6) if fmt=='WEBP' else im.save(b,fmt,quality=q); return 'data:image/'+fmt.lower()+';base64,'+base64.b64encode(b.getvalue()).decode()
out=dict(tex={},trees={},clutter={})
# --- Baum-Texturen
bark=Image.open(D+'Bark_NormalTree.png').convert('RGB').resize((256,256),Image.LANCZOS)
out['tex']['bark']=img_url(bark,'JPEG',82)
leafcol={}
for key,f in [('leafN','Leaves_NormalTree_C.png'),('leafP','Leaf_Pine_C.png')]:
    im=Image.open(D+f).convert('RGBA').resize((256,256),Image.LANCZOS); a=np.asarray(im).astype(np.float32)
    al=a[...,3]>128; rgb=a[...,:3]/255; lum=rgb@np.array([.3,.59,.11])
    mc=rgb[al].mean(0); ml=lum[al].mean()
    L=np.clip(lum/ml*0.8,0,1)
    g=np.dstack([L*255]*3+[a[...,3]]).astype(np.uint8)
    leafcol[key]=(mc/0.8).tolist()
    out['tex'][key]=img_url(Image.fromarray(g,'RGBA'),'WEBP',85)
out['leafcol']=leafcol
print('Blattfarben',leafcol)
TREES=['CommonTree_1','CommonTree_2','CommonTree_3','CommonTree_4','CommonTree_5','Pine_1','Pine_2','Pine_3','Pine_4','Pine_5']
for t in TREES:
    ps,_=load(t); bk=merge([p for p in ps if p['mat'].startswith('Bark')]); lv=merge([p for p in ps if not p['mat'].startswith('Bark')])
    pine=t.startswith('Pine')
    c=lv['P'].mean(0); ext=np.maximum(lv['P'].max(0)-lv['P'].min(0),0.5)/2
    sn=(lv['P']-c)/ext; sn[:,1]+=0.35; sn/=np.linalg.norm(sn,axis=1,keepdims=True)
    on=lv['N']/np.maximum(np.linalg.norm(lv['N'],axis=1,keepdims=True),1e-6)
    lv['N']=0.8*sn+0.2*on
    l1=leaf_lod(lv,3 if pine else 4,1.45 if pine else 1.75); b1=bark_lod(bk,450)
    h=float(np.concatenate([bk['P'],lv['P']])[:,1].max())
    out['trees'][t]=dict(pine=pine,h=h,lf='leafP' if pine else 'leafN',
        l0=dict(bark=enc(bk),leaf=enc(lv)),l1=dict(bark=enc(b1),leaf=enc(l1)))
    print(t,'LOD0',out['trees'][t]['l0']['bark']['nt']+out['trees'][t]['l0']['leaf']['nt'],'LOD1',out['trees'][t]['l1']['bark']['nt']+out['trees'][t]['l1']['leaf']['nt'],'h',round(h,1))
# --- Atlas fuer Bodenbewuchs (1024x1024)
A=Image.new('RGBA',(1024,1024),(0,0,0,0))
SLOT={'Leaves':(0,0,512),'Flowers':(512,0,256),'Grass':(768,0,256),'Leaves_TwistedTree':(512,256,256),'Leaves_NormalTree':(768,256,256),
      'Mushrooms':(0,512,256),'PathRocks':(256,512,256),'Rocks':(512,512,256)}
SRC={'Leaves':'Leaves.png','Flowers':'Flowers.png','Grass':'Grass.png','Leaves_TwistedTree':'Leaves_TwistedTree_C.png','Leaves_NormalTree':'Leaves_NormalTree_C.png',
     'Mushrooms':'Mushrooms.png','PathRocks':'PathRocks_Diffuse.png','Rocks':'Rocks_Diffuse.png'}
for k,(x,y,s) in SLOT.items():
    im=Image.open(D+SRC[k]).convert('RGBA').resize((s-4,s-4),Image.LANCZOS)
    pad=Image.new('RGBA',(s,s)); pad.paste(im.resize((s,s),Image.LANCZOS)); pad.paste(im,(2,2)); A.paste(pad,(x,y))
out['tex']['atlas']=img_url(A,'WEBP',85)
CL={'grassA':'Grass_Common_Short','grassB':'Grass_Common_Tall','grassC':'Grass_Wispy_Short','grassD':'Grass_Wispy_Tall',
    'flowerA':'Flower_3_Group','flowerB':'Flower_4_Group','flowerC':'Flower_3_Single','flowerD':'Flower_4_Single',
    'bush':'Bush_Common','bushF':'Bush_Common_Flowers','fern':'Fern_1','clover':'Clover_1','clover2':'Clover_2','plant':'Plant_1','plantB':'Plant_1_Big','plant7':'Plant_7_Big',
    'mush':'Mushroom_Common','mushL':'Mushroom_Laetiporus','rock1':'Rock_Medium_1','rock2':'Rock_Medium_2','rock3':'Rock_Medium_3',
    'peb1':'Pebble_Round_1','peb2':'Pebble_Round_3','peb3':'Pebble_Square_2','peb4':'Pebble_Square_5'}
STILL={'mush','mushL','rock1','rock2','rock3','peb1','peb2','peb3','peb4'}
for k,f in CL.items():
    ps,_=load(f); parts=[]
    for p in ps:
        m=p['mat']; x,y,s=SLOT[m]; U=p['U'].copy()
        U=np.clip(U,0.002,0.998)
        U[:,0]=(x+2+U[:,0]*(s-4))/1024; U[:,1]=(y+2+U[:,1]*(s-4))/1024
        C=p['C']
        if k.startswith('grass') or k in('fern','plant','plantB'): C=0.5+0.5*C
        parts.append(dict(P=p['P'],N=p['N'],U=U,C=C,I=p['I']))
    g=merge(parts); e=enc(g); e['still']=k in STILL; e['h']=float(g['P'][:,1].max()); out['clutter'][k]=e
    print(k,e['nt'])
json.dump(out,open('natur_raw.json','w'),separators=(',',':'))
import os; print('Groesse',os.path.getsize('natur_raw.json')//1024,'KB'); print({k:len(v)//1024 for k,v in out['tex'].items()})
