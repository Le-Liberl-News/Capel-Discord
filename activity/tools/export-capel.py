"""Isolate Capel from exported native SC T3119, T31MAC03 and T31ORB00 models.
First export each _X3 with export_sky_assets.py --only-map --center-x 0.
The room's centre pedestal is split across sector meshes; keep indexed triangles
only, not unused vertices or the surrounding grate, floor and machinery.
"""
import argparse,base64,json,struct,shutil
from pathlib import Path
parser=argparse.ArgumentParser()
for name in ['room','panel','orb','output']:parser.add_argument('--'+name,type=Path,required=True)
a=parser.parse_args();a.output.mkdir(parents=True,exist_ok=True)
out={'asset':{'version':'2.0','generator':'Sky Capel extractor'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'name':'Capel','children':[]}],'meshes':[],'accessors':[],'bufferViews':[],'buffers':[],'images':[],'textures':[],'materials':[],'extensionsUsed':['KHR_materials_unlit'],'extras':{'source':['T3119._X3','T31MAC03._X3','T31ORB00._X3']}}
binary=bytearray();formats={5121:('B',1),5123:('H',2),5125:('I',4),5126:('f',4)};counts={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}
def values(g,b,i):
 ac=g['accessors'][i];v=g['bufferViews'][ac['bufferView']];fmt,size=formats[ac['componentType']];n=counts[ac['type']];return [struct.unpack_from('<'+fmt*n,b,v.get('byteOffset',0)+ac.get('byteOffset',0)+j*v.get('byteStride',size*n)) for j in range(ac['count'])]
def append(data,component,kind,normalized=False):
 while len(binary)%4:binary.append(0)
 offset=len(binary);fmt,size=formats[component];n=counts[kind]
 for row in data:binary.extend(struct.pack('<'+fmt*n,*row))
 out['bufferViews'].append({'buffer':0,'byteOffset':offset,'byteLength':len(binary)-offset})
 ac={'bufferView':len(out['bufferViews'])-1,'componentType':component,'type':kind,'count':len(data)}
 if normalized:ac['normalized']=True
 if kind=='VEC3':ac.update(min=[min(p[k]for p in data)for k in range(3)],max=[max(p[k]for p in data)for k in range(3)])
 out['accessors'].append(ac);return len(out['accessors'])-1
for source,part in [(a.room,'body'),(a.panel,'panel'),(a.orb,'orb')]:
 g=json.loads(source.read_text());b=base64.b64decode(g['buffers'][0]['uri'].split(',')[1]);material_offset=len(out['materials']);texture_offset=len(out['textures']);image_offset=len(out['images'])
 for image in g['images']:
  out['images'].append(image);shutil.copyfile(source.parent/image['uri'],a.output/image['uri'])
 for t in g['textures']:out['textures'].append({**t,'source':t['source']+image_offset})
 for m in g['materials']:
  m=json.loads(json.dumps(m));m.get('pbrMetallicRoughness',{}).get('baseColorTexture',{})['index']+=texture_offset;out['materials'].append(m)
 for mi,mesh in enumerate(g['meshes']):
  for pi,p in enumerate(mesh['primitives']):
   points=values(g,b,p['attributes']['POSITION']);ix=[v[0]for v in values(g,b,p['indices'])];triangles=[]
   for i in range(0,len(ix),3):
    tri=ix[i:i+3];pts=[points[j]for j in tri]
    if part=='body' and (not all(-1.25<=x<=.25 and 6.55<=z<=7.85 and -.001<=y<=1.25 for x,y,z in pts) or max(p[1]for p in pts)<.02):continue
    triangles.extend(tri)
   if not triangles:continue
   used=sorted(set(triangles));remap={k:i for i,k in enumerate(used)};attrs={}
   for name,accessor in p['attributes'].items():
    ac=g['accessors'][accessor];all_values=values(g,b,accessor);data=[all_values[k]for k in used]
    if name=='POSITION':
     if part=='body':data=[(-x-.5,y,z-7.1)for x,y,z in data]
     elif part=='panel':data=[(x,y,1-z)for x,y,z in data]
     else:data=[(-x,y,z)for x,y,z in data]
    elif name=='NORMAL':data=[((x if part=='panel' else -x),y,(-z if part=='panel' else z))for x,y,z in data]
    attrs[name]=append(data,ac['componentType'],ac['type'],ac.get('normalized',False))
   indices=append([(remap[k],)for k in triangles],5123,'SCALAR');out['meshes'].append({'primitives':[{'attributes':attrs,'indices':indices,'material':p['material']+material_offset}]});out['nodes'].append({'name':part+'_'+str(mi)+'_'+str(pi),'mesh':len(out['meshes'])-1});out['nodes'][0]['children'].append(len(out['nodes'])-1)
# Keep only textures/materials referenced by the isolated object.
materials=sorted({p['material']for m in out['meshes']for p in m['primitives']});mat_map={old:new for new,old in enumerate(materials)}
for m in out['meshes']:
 for p in m['primitives']:p['material']=mat_map[p['material']]
out['materials']=[out['materials'][i]for i in materials];textures=sorted({m['pbrMetallicRoughness']['baseColorTexture']['index']for m in out['materials']});tex_map={old:new for new,old in enumerate(textures)}
for m in out['materials']:m['pbrMetallicRoughness']['baseColorTexture']['index']=tex_map[m['pbrMetallicRoughness']['baseColorTexture']['index']]
out['textures']=[out['textures'][i]for i in textures];images=sorted({t['source']for t in out['textures']});img_map={old:new for new,old in enumerate(images)}
for t in out['textures']:t['source']=img_map[t['source']]
out['images']=[out['images'][i]for i in images];needed={i['uri']for i in out['images']}
for p in a.output.glob('*.png'):
 if p.name not in needed:p.unlink()
out['buffers']=[{'byteLength':len(binary),'uri':'data:application/octet-stream;base64,'+base64.b64encode(binary).decode()}]
(a.output/'model.gltf').write_text(json.dumps(out,separators=(',',':')))
print(len(out['meshes']),'primitives, textures:',sorted(needed))
