"""Merge the meshes of an exported map glTF by material: the native maps split into
hundreds of tiny meshes, which makes GLTFLoader slow and costs one draw call each.
Usage: merge-gltf-meshes.py in.gltf out.gltf  (static maps only: nodes under the root carry no transform)."""
import sys,json,base64,struct
import numpy as np
source,target=sys.argv[1:3];g=json.load(open(source,encoding='utf-8'))
buf=base64.b64decode(g['buffers'][0]['uri'].split(',',1)[1])
SIZE={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4};TYPE={5126:np.float32,5123:np.uint16,5125:np.uint32,5121:np.uint8}
def read(i):
 a=g['accessors'][i];v=g['bufferViews'][a['bufferView']];n=SIZE[a['type']];dt=np.dtype(TYPE[a['componentType']]);off=v.get('byteOffset',0)+a.get('byteOffset',0);stride=v.get('byteStride') or n*dt.itemsize
 raw=np.frombuffer(buf,np.uint8,(a['count']-1)*stride+n*dt.itemsize,off)
 return np.lib.stride_tricks.as_strided(raw,(a['count'],n*dt.itemsize),(stride,1)).copy().view(dt).reshape(a['count'],n)
root=g['scenes'][g.get('scene',0)]['nodes'];holder=None
for i,n in enumerate(g['nodes']):
 if 'mesh' in n:
  assert not any(k in n for k in('matrix','translation','rotation','scale')),'transformed mesh node'
 elif n.get('children') and all('mesh' in g['nodes'][c] for c in n['children']):holder=i
groups={}
for n in g['nodes']:
 if 'mesh' not in n:continue
 for p in g['meshes'][n['mesh']]['primitives']:
  assert p.get('mode',4)==4
  groups.setdefault(p['material'],[]).append(p)
out=bytearray();views=[];accessors=[];meshes=[];nodes=[]
def add(array,target=None,normalized=False,minmax=False):
 data=np.ascontiguousarray(array);off=len(out);out.extend(data.tobytes());out.extend(b'\0'*(-len(out)%4))
 views.append({'buffer':0,'byteOffset':off,'byteLength':data.nbytes,**({'target':target} if target else {})})
 a={'bufferView':len(views)-1,'componentType':{np.dtype(np.float32):5126,np.dtype(np.uint32):5125,np.dtype(np.uint8):5121}[data.dtype],'count':len(data),'type':{1:'SCALAR',2:'VEC2',3:'VEC3',4:'VEC4'}[data.shape[1] if data.ndim>1 else 1]}
 if normalized:a['normalized']=True
 if minmax:a['min']=data.min(0).tolist();a['max']=data.max(0).tolist()
 accessors.append(a);return len(accessors)-1
for material,prims in sorted(groups.items()):
 names=sorted(set().union(*(p['attributes'] for p in prims)));assert all(set(p['attributes'])==set(names) for p in prims)
 columns={k:[] for k in names};indices=[];base=0
 for p in prims:
  idx=read(p['indices']).ravel().astype(np.uint32);used=np.unique(idx);remap=np.zeros(idx.max()+1,np.uint32);remap[used]=np.arange(len(used),dtype=np.uint32)+base
  for k in names:columns[k].append(read(p['attributes'][k])[used])
  indices.append(remap[idx]);base+=len(used)
 attributes={k:add(np.concatenate(columns[k]),34962,normalized=k.startswith('COLOR'),minmax=k=='POSITION') for k in names}
 meshes.append({'primitives':[{'attributes':attributes,'indices':add(np.concatenate(indices),34963),'material':material}]})
 nodes.append({'name':f'material_{material}','mesh':len(meshes)-1})
# keep the frame hierarchy (and its root mirror), drop the per-piece mesh nodes
keep=[n for n in g['nodes'] if 'mesh' not in n];index={id(n):i for i,n in enumerate(keep)}
old={i:id(n) for i,n in enumerate(g['nodes'])}
for n in keep:
 if 'children' in n:n['children']=[index[old[c]] for c in n['children'] if old[c] in index]
first=len(keep);keep[index[id(g['nodes'][holder])]].setdefault('children',[]).extend(range(first,first+len(nodes)))
g['nodes']=keep+nodes;g['scenes']=[{'nodes':[index[old[r]] for r in root]}];g['scene']=0
g['meshes']=meshes;g['accessors']=accessors;g['bufferViews']=views
g['buffers']=[{'byteLength':len(out),'uri':'data:application/octet-stream;base64,'+base64.b64encode(bytes(out)).decode()}]
json.dump(g,open(target,'w',encoding='utf-8'),separators=(',',':'))
print(len(groups),'meshes',len(out),'bytes')
