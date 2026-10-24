"""Extract one complete native orbal lamp from SC/r4101 after library-import.py decoding."""
import json,base64,struct,collections
from pathlib import Path
p=Path('E:/dev/sky-activity-tools/atelier-combat/scene-models/SC/r4101._x3/model.gltf');g=json.loads(p.read_text());buf=base64.b64decode(g['buffers'][0]['uri'].split(',')[1]);cache={}
def read(i):
 if i in cache:return cache[i]
 a=g['accessors'][i];v=g['bufferViews'][a['bufferView']];n={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']];fmt={5126:'f',5123:'H',5125:'I'}[a['componentType']];cache[i]=[struct.unpack_from('<'+fmt*n,buf,v.get('byteOffset',0)+a.get('byteOffset',0)+j*v.get('byteStride',struct.calcsize(fmt)*n)) for j in range(a['count'])];return cache[i]

import shutil
out=Path(__file__).resolve().parents[1]/'activity/assets/sky/sanktheim/props/royal-road-lamp';out.mkdir(parents=True,exist_ok=True)
attrs={'POSITION':[],'NORMAL':[],'TEXCOORD_0':[]}
for m in g['meshes']:
 for q in m['primitives']:
  mat=g['materials'][q['material']];image=g['images'][g['textures'][mat['pbrMetallicRoughness']['baseColorTexture']['index']]['source']]['uri']
  if image!='r41o1205.png':continue
  arrays={k:read(v) for k,v in q['attributes'].items()};ps=arrays['POSITION'];ids=[a[0] for a in read(q['indices'])] if 'indices' in q else list(range(len(ps)))
  for i in range(0,len(ids),3):
   tri=ids[i:i+3]
   if not all(-8.6<p[0]<-7.7 and 29.2<p[2]<30 for p in [ps[j] for j in tri]):continue
   for j in [tri[0],tri[2],tri[1]]:
    for k in attrs:
     v=arrays[k][j]
     if k=='POSITION':v=(-v[0]-8.18,v[1]+.08,v[2]-29.6)
     elif k=='NORMAL':v=(-v[0],v[1],v[2])
     attrs[k].extend(v)
b=bytearray();views=[];acc=[];attributes={}
for k,values in attrs.items():
 n=2 if k=='TEXCOORD_0' else 3;off=len(b);b.extend(struct.pack('<'+'f'*len(values),*values));views.append(dict(buffer=0,byteOffset=off,byteLength=len(values)*4));attributes[k]=len(acc);acc.append(dict(bufferView=len(views)-1,componentType=5126,count=len(values)//n,type='VEC2' if n==2 else 'VEC3',min=[min(values[i::n]) for i in range(n)],max=[max(values[i::n]) for i in range(n)]))
model=dict(asset=dict(version='2.0',generator='Native Erbe Royal Avenue lamp extraction'),extras=dict(source='SC/r4101._x3',texture='r41o1205.png'),scene=0,scenes=[dict(nodes=[0])],nodes=[dict(name='RoyalAvenueOrbalLamp',mesh=0)],meshes=[dict(primitives=[dict(attributes=attributes,material=0)])],materials=[dict(alphaMode='MASK',alphaCutoff=.05,doubleSided=True,pbrMetallicRoughness=dict(baseColorTexture=dict(index=0),metallicFactor=0,roughnessFactor=1))],images=[dict(uri='r41o1205.png')],textures=[dict(source=0,sampler=0)],samplers=[dict(magFilter=9728,minFilter=9987,wrapS=10497,wrapT=10497)],buffers=[dict(byteLength=len(b),uri='data:application/octet-stream;base64,'+base64.b64encode(b).decode())],bufferViews=views,accessors=acc)
(out/'model.gltf').write_text(json.dumps(model,separators=(',',':')),encoding='utf-8');shutil.copyfile(p.parent/'r41o1205.png',out/'r41o1205.png');print('Native lamp',len(attrs['POSITION'])//9,'triangles')
