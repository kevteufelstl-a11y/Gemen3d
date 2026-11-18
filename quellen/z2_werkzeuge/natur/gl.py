import json,numpy as np,os
D='/home/claude/natur_zip/glTF/'
CT={5126:np.float32,5123:np.uint16,5121:np.uint8,5125:np.uint32}
NC={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}
def acc(g,b,i):
    a=g['accessors'][i];bv=g['bufferViews'][a['bufferView']];n=NC[a['type']]
    arr=np.frombuffer(b,CT[a['componentType']],a['count']*n,bv.get('byteOffset',0)+a.get('byteOffset',0))
    arr=arr.reshape(-1,n) if n>1 else arr
    if a.get('normalized') and a['componentType']!=5126: arr=arr/ np.iinfo(CT[a['componentType']]).max
    return arr.astype(np.float32) if a['componentType']!=5125 and a['componentType']!=5123 or a.get('normalized') or n>1 else arr
def load(name):
    g=json.load(open(D+name+'.gltf'));b=open(D+g['buffers'][0]['uri'],'rb').read()
    # Node-Transform pruefen
    nd=g['nodes'][0]
    out=[]
    for p in g['meshes'][0]['primitives']:
        A=p['attributes']
        P=acc(g,b,A['POSITION']);N=acc(g,b,A['NORMAL']);U=acc(g,b,A['TEXCOORD_0'])
        C=acc(g,b,A['COLOR_0'])[:,:3] if 'COLOR_0' in A else np.ones((len(P),3),np.float32)
        I=acc(g,b,p['indices']).astype(np.int64)
        out.append(dict(mat=g['materials'][p['material']]['name'],P=P,N=N,U=U,C=C,I=I))
    return out,nd
def comps(I,nv):
    par=np.arange(nv)
    def f(x):
        while par[x]!=x: par[x]=par[par[x]]; x=par[x]
        return x
    T=I.reshape(-1,3)
    for a,b_,c in T:
        ra,rb,rc=f(a),f(b_),f(c)
        par[rb]=ra; par[f(rc)]=ra
    roots=np.array([f(t[0]) for t in T])
    return roots
