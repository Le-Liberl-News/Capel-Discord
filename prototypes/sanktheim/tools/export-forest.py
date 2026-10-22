"""Separate harvestable trees from the original terrain, retaining native UVs/normals.
Run manually after changing the source map; never writes to installed game files.
"""
import base64, collections, copy, json, struct
from pathlib import Path

ROOT=Path(__file__).resolve().parents[3]
SOURCE=ROOT/'activity/assets/sky/sanktheim/map/model.gltf'
OUT=ROOT/'activity/assets/sky/sanktheim/forest'
g=json.loads(SOURCE.read_text(encoding='utf-8'))
buffers=[base64.b64decode(b['uri'].split(',')[1]) for b in g['buffers']]
cache={}
def read(i):
 if i in cache:return cache[i]
 a=g['accessors'][i];v=g['bufferViews'][a['bufferView']]
 n={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']];fmt={5126:'f',5123:'H',5125:'I',5121:'B'}[a['componentType']];size=struct.calcsize(fmt)*n
 cache[i]=[struct.unpack_from('<'+fmt*n,buffers[v['buffer']],v.get('byteOffset',0)+a.get('byteOffset',0)+j*v.get('byteStride',size)) for j in range(a['count'])]
 return cache[i]
def texture(p):return g['images'][g['textures'][g['materials'][p['material']]['pbrMetallicRoughness']['baseColorTexture']['index']]['source']]['uri']
def indices(p):return [a[0] for a in read(p['indices'])] if 'indices' in p else list(range(g['accessors'][p['attributes']['POSITION']]['count']))
trunks=[];parents=[];vertices={}
def find(i):
 while parents[i]!=i:parents[i]=parents[parents[i]];i=parents[i]
 return i
for mi,m in enumerate(g['meshes']):
 for pi,p in enumerate(m['primitives']):
  if texture(p)!='r01o0804.png':continue
  points=read(p['attributes']['POSITION']);ids=indices(p)
  for j in range(0,len(ids),3):
   ps=[points[k] for k in ids[j:j+3]];i=len(trunks);trunks.append((mi,pi,j,ps));parents.append(i)
   for v in ps:
    key=tuple(round(x,4) for x in v)
    if key in vertices:parents[find(i)]=find(vertices[key])
    else:vertices[key]=i
groups=collections.defaultdict(list)
for i,t in enumerate(trunks):groups[find(i)].append(t)
groups=sorted(groups.values(),key=lambda group:tuple(min(p[k] for t in group for p in t[3]) for k in range(3)))
trees=[];assigned={}
for i,group in enumerate(groups):
 pts=[p for t in group for p in t[3]];lo=[min(p[k] for p in pts) for k in range(3)];hi=[max(p[k] for p in pts) for k in range(3)]
 # Native geometry has a mirrored X root; gameplay coordinates include that transform.
 trees.append({'id':f'tree-{i+1:03}','x':-(lo[0]+hi[0])/2,'y':lo[1],'z':(lo[2]+hi[2])/2,'height':hi[1]-lo[1],
  'radius':max(hi[0]-lo[0],hi[2]-lo[2])*.32,'wood':1000//len(groups)+(i<1000%len(groups))})
 for mi,pi,j,_ in group:assigned[(mi,pi,j)]=i
parts=[collections.defaultdict(list) for _ in trees];unassigned=0
terrain=copy.deepcopy(g);terrain_bytes=bytearray(buffers[0])
def append_indices(ids):
 while len(terrain_bytes)%4:terrain_bytes.append(0)
 off=len(terrain_bytes);terrain_bytes.extend(struct.pack('<'+'I'*len(ids),*ids));vi=len(terrain['bufferViews']);terrain['bufferViews'].append({'buffer':0,'byteOffset':off,'byteLength':len(ids)*4});ai=len(terrain['accessors']);terrain['accessors'].append({'bufferView':vi,'componentType':5125,'count':len(ids),'type':'SCALAR'});return ai
for mi,m in enumerate(g['meshes']):
 for pi,p in enumerate(m['primitives']):
  tex=texture(p)
  if tex not in ['r01o0804.png','t06o0005.png']:continue
  points=read(p['attributes']['POSITION']);ids=indices(p);keep=[]
  for j in range(0,len(ids),3):
   tri=ids[j:j+3];owner=assigned.get((mi,pi,j))
   if owner is None and tex=='t06o0005.png':
    c=[sum(points[k][d] for k in tri)/3 for d in range(3)]
    if c[1]>=3:
     nearest=min(range(len(trees)),key=lambda t:(trees[t]['x']+c[0])**2+(trees[t]['z']-c[2])**2)
     if (trees[nearest]['x']+c[0])**2+(trees[nearest]['z']-c[2])**2<25:owner=nearest
     else:unassigned+=1
   if owner is None:keep.extend(tri)
   else:
    dst=parts[owner][p['material']]
    for k in tri:
     attrs={name:read(a)[k] for name,a in p['attributes'].items()};pos=attrs['POSITION'];tree=trees[owner];attrs['POSITION']=(-pos[0]-tree['x'],pos[1]-tree['y'],pos[2]-tree['z'])
     if 'NORMAL' in attrs:n=attrs['NORMAL'];attrs['NORMAL']=(-n[0],n[1],n[2])
     dst.append(attrs)
  target=terrain['meshes'][mi]['primitives'][pi];target['indices']=append_indices(keep) if keep else None
for m in terrain['meshes']:m['primitives']=[p for p in m['primitives'] if p.get('indices') is not None]
terrain['buffers']=[{'byteLength':len(terrain_bytes),'uri':'data:application/octet-stream;base64,'+base64.b64encode(terrain_bytes).decode()}]
for image in terrain['images']:image['uri']='../map/'+Path(image['uri']).name
forest={'asset':{'version':'2.0'},'scene':0,'scenes':[{'nodes':list(range(len(trees)))}],
 'nodes':[],'meshes':[],'buffers':[],'bufferViews':[],'accessors':[],
 'materials':copy.deepcopy(g['materials']),'textures':g['textures'],'samplers':g.get('samplers',[]),'images':copy.deepcopy(g['images'])}
for image in forest['images']:image['uri']='../map/'+Path(image['uri']).name
data=bytearray()
def attribute(values):
 n=len(values[0]);flat=[v for row in values for v in row];off=len(data);data.extend(struct.pack('<'+'f'*len(flat),*flat));vi=len(forest['bufferViews']);forest['bufferViews'].append({'buffer':0,'byteOffset':off,'byteLength':len(flat)*4});ai=len(forest['accessors']);forest['accessors'].append({'bufferView':vi,'componentType':5126,'count':len(values),'type':{2:'VEC2',3:'VEC3',4:'VEC4'}[n],'min':[min(v[k] for v in values) for k in range(n)],'max':[max(v[k] for v in values) for k in range(n)]});return ai
for i,tree in enumerate(trees):
 primitives=[]
 for material,verts in parts[i].items():
  # Reverse winding after reflecting X. Double-sided materials keep the original look.
  verts=[v for j in range(0,len(verts),3) for v in (verts[j],verts[j+2],verts[j+1])]
  primitives.append({'attributes':{name:attribute([v[name] for v in verts]) for name in verts[0]},'material':material})
 forest['meshes'].append({'primitives':primitives});forest['nodes'].append({'name':tree['id'],'mesh':i,'translation':[tree['x'],tree['y'],tree['z']]})
forest['buffers']=[{'byteLength':len(data),'uri':'data:application/octet-stream;base64,'+base64.b64encode(data).decode()}]
OUT.mkdir(exist_ok=True)
(OUT/'terrain.gltf').write_text(json.dumps(terrain,separators=(',',':')),encoding='utf-8')
(OUT/'trees.gltf').write_text(json.dumps(forest,separators=(',',':')),encoding='utf-8')
(ROOT/'prototypes/sanktheim/forest.json').write_text(json.dumps(trees,separators=(',',':')),encoding='utf-8')
print(f'{len(trees)} trees; {sum(t["wood"] for t in trees)} wood; {unassigned} unassigned high foliage triangles; {len(data)} tree bytes')
assert len(trees)==103 and sum(t['wood'] for t in trees)==1000 
