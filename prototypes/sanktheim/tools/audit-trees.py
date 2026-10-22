import json,base64,struct,collections
from pathlib import Path
import argparse,shutil
root=Path(__file__).resolve().parents[3]
cli=argparse.ArgumentParser(description='Audit des troncs et extraction témoin, sans modifier la carte.');cli.add_argument('--model',type=Path,default=root/'activity/assets/sky/sanktheim/map/model.gltf');cli.add_argument('--out',type=Path,default=root/'.runtime/sanktheim-tree-audit');args=cli.parse_args();args.out.mkdir(parents=True,exist_ok=True)
p=args.model;g=json.loads(p.read_text());buffers=[base64.b64decode(b['uri'].split(',')[1]) for b in g['buffers']]
def read(i):
 a=g['accessors'][i];v=g['bufferViews'][a['bufferView']];n={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']];fmt={5126:'f',5123:'H',5125:'I',5121:'B'}[a['componentType']];size=struct.calcsize(fmt)*n;return [struct.unpack_from('<'+fmt*n,buffers[v['buffer']],v.get('byteOffset',0)+a.get('byteOffset',0)+j*v.get('byteStride',size)) for j in range(a['count'])]
tris=[];parent=[];seen={}
def find(i):
 while parent[i]!=i:parent[i]=parent[parent[i]];i=parent[i]
 return i
for mi,m in enumerate(g['meshes']):
 for pi,prim in enumerate(m['primitives']):
  mat=g['materials'][prim['material']];tex=g['images'][g['textures'][mat['pbrMetallicRoughness']['baseColorTexture']['index']]['source']]['uri']
  if tex!='r01o0804.png':continue
  points=read(prim['attributes']['POSITION']);ids=[a[0] for a in read(prim['indices'])] if 'indices' in prim else list(range(len(points)))
  for j in range(0,len(ids),3):
   ps=[points[v] for v in ids[j:j+3]];i=len(tris);tris.append((mi,pi,j,ps));parent.append(i)
   for v in ps:
    key=tuple(round(x,4) for x in v)
    if key in seen:parent[find(i)]=find(seen[key])
    else:seen[key]=i
clusters=collections.defaultdict(list)
for i,t in enumerate(tris):clusters[find(i)].append(t)
report=[]
for cluster in clusters.values():
 pts=[v for t in cluster for v in t[3]];lo=[min(p[k] for p in pts) for k in range(3)];hi=[max(p[k] for p in pts) for k in range(3)];report.append({'triangles':len(cluster),'min':lo,'max':hi,'chunks':sorted(set(t[0] for t in cluster))})
report.sort(key=lambda r:r['min']);out=args.out/'tree-components.json';out.write_text(json.dumps(report,indent=2));print('bark triangles',len(tris),'connected components',len(report));print('height distribution',collections.Counter(round(r['max'][1]-r['min'][1],1) for r in report));print('first 4',report[:4])
# Add an isolated tree proof to the geometry audit, without touching the source map.
centers=[[(r['min'][0]+r['max'][0])/2,(r['min'][2]+r['max'][2])/2] for r in report]
chosen=min(range(len(centers)),key=lambda i:(centers[i][0]-46)**2+centers[i][1]**2)
selected=[];counts=collections.Counter()
for mi,m in enumerate(g['meshes']):
 for prim in m['primitives']:
  tex=g['images'][g['textures'][g['materials'][prim['material']]['pbrMetallicRoughness']['baseColorTexture']['index']]['source']]['uri']
  if tex not in ['r01o0804.png','t06o0005.png']:continue
  points=read(prim['attributes']['POSITION']);ids=[a[0] for a in read(prim['indices'])] if 'indices' in prim else list(range(len(points)));keep=[]
  for j in range(0,len(ids),3):
   ps=[points[v] for v in ids[j:j+3]];c=[sum(v[k] for v in ps)/3 for k in range(3)]
   if tex=='t06o0005.png' and c[1]<3:continue
   nearest=min(range(len(centers)),key=lambda i:(centers[i][0]-c[0])**2+(centers[i][1]-c[2])**2)
   if nearest==chosen and (centers[chosen][0]-c[0])**2+(centers[chosen][1]-c[2])**2<25:keep+=ids[j:j+3]
  if keep:
   b=struct.pack('<'+'I'*len(keep),*keep);bi=len(g['buffers']);g['buffers'].append({'byteLength':len(b),'uri':'data:application/octet-stream;base64,'+base64.b64encode(b).decode()});vi=len(g['bufferViews']);g['bufferViews'].append({'buffer':bi,'byteLength':len(b)});ai=len(g['accessors']);g['accessors'].append({'bufferView':vi,'componentType':5125,'count':len(keep),'type':'SCALAR'});selected.append({**prim,'indices':ai});counts[tex]+=len(keep)//3
import copy
outg=copy.deepcopy(g);outg['meshes']=[{'primitives':selected}];outg['nodes']=[{'scale':[-1,1,1],'mesh':0}];outg['scenes']=[{'nodes':[0]}];outg['scene']=0
for image in outg['images']:
 image['uri']=Path(image['uri']).name
 if (p.parent/image['uri']).exists():shutil.copyfile(p.parent/image['uri'],args.out/image['uri'])
(args.out/'isolated-tree.gltf').write_text(json.dumps(outg));print('isolated tree',chosen,'center',centers[chosen],'triangles',dict(counts))
