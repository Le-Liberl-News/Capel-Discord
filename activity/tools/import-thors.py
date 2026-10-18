from pathlib import Path
import json,base64,copy,shutil,re
import argparse
parser=argparse.ArgumentParser();parser.add_argument('--source',default='E:/dev/sky-activity-tools/cold-steel2/gltf');args=parser.parse_args()
root=Path(args.source);out=Path(__file__).resolve().parents[1]/'assets/sky/thors';out.mkdir(parents=True,exist_ok=True)
g={'asset':{'version':'2.0','generator':'Native CS2 Thors courtyard import'},'scene':0,'scenes':[{'nodes':[]}],'nodes':[],'meshes':[],'materials':[],'textures':[],'images':[],'accessors':[],'bufferViews':[],'samplers':[{'wrapS':10497,'wrapT':10497,'magFilter':9728,'minFilter':9987}],'extensionsUsed':['KHR_materials_unlit']};data=bytearray()
parts=[('M_T0000',None),('O_T00EVT28',None),('O_T00TRE00',None),('O_T00TRE01',None),('O_T00DOR02B',[0,.5,-24.424]),('O_T00DOR05',[0,0,19.125])]
for id,translation in parts:
 s=json.loads((root/id/'model.gltf').read_text());offsets={k:len(g[k]) for k in ['nodes','meshes','materials','textures','images','accessors','bufferViews']};pad=(-len(data))%4;data.extend(b'\0'*pad);bo=len(data);data.extend((root/id/'model.bin').read_bytes())
 for view in s['bufferViews']:v=copy.deepcopy(view);v['byteOffset']=v.get('byteOffset',0)+bo;g['bufferViews'].append(v)
 for a in s['accessors']:a=copy.deepcopy(a);a['bufferView']+=offsets['bufferViews'];g['accessors'].append(a)
 for i,img in enumerate(s['images']):name=id+'-'+img['uri'];shutil.copyfile(root/id/img['uri'],out/name);g['images'].append({'uri':name})
 for t in s['textures']:g['textures'].append({'source':t['source']+offsets['images'],'sampler':0})
 for m in s['materials']:
  m=copy.deepcopy(m);tex=m['pbrMetallicRoughness'].get('baseColorTexture');
  if tex:tex['index']+=offsets['textures']
  m['extensions']={'KHR_materials_unlit':{}};g['materials'].append(m)
 for m in s['meshes']:
  m=copy.deepcopy(m)
  for p in m['primitives']:
   p['attributes']={k:v+offsets['accessors'] for k,v in p['attributes'].items()};p['indices']+=offsets['accessors'];p['material']+=offsets['materials']
  g['meshes'].append(m)
 for n in s['nodes']:
  if 'mesh' not in n:continue
  name=n.get('name','')
  if re.match(r'^(CA|CK|CS)(\d|_)',name) or name.startswith('mountain2') or any(k in name for k in ['evening','night']):continue
  n=copy.deepcopy(n);n['mesh']+=offsets['meshes'];n.pop('children',None)
  if translation:n['matrix'][12]+=translation[0];n['matrix'][13]+=translation[1];n['matrix'][14]+=translation[2]
  g['scenes'][0]['nodes'].append(len(g['nodes']));g['nodes'].append(n)
# Keep only reachable mesh data and textures in the distributable.
def compact(key,used):
 ids=sorted(set(used));mapping={old:new for new,old in enumerate(ids)};g[key]=[g[key][i] for i in ids];return mapping
remap=compact('meshes',[n['mesh'] for n in g['nodes']]);
for n in g['nodes']:n['mesh']=remap[n['mesh']]
primitives=[p for m in g['meshes'] for p in m['primitives']]
remap=compact('materials',[p['material'] for p in primitives])
for p in primitives:p['material']=remap[p['material']]
refs=[m['pbrMetallicRoughness']['baseColorTexture'] for m in g['materials'] if 'baseColorTexture' in m['pbrMetallicRoughness']]
remap=compact('textures',[r['index'] for r in refs])
for r in refs:r['index']=remap[r['index']]
remap=compact('images',[t['source'] for t in g['textures']])
for t in g['textures']:t['source']=remap[t['source']]
kept={i['uri'] for i in g['images']}
for image in out.glob('*.png'):
 if image.name not in kept:image.unlink()
remap=compact('accessors',[i for p in primitives for i in [p['indices'],*p['attributes'].values()]])
for p in primitives:p['indices']=remap[p['indices']];p['attributes']={k:remap[v] for k,v in p['attributes'].items()}
remap=compact('bufferViews',[a['bufferView'] for a in g['accessors']])
for a in g['accessors']:a['bufferView']=remap[a['bufferView']]
old=data;data=bytearray()
for v in g['bufferViews']:
 data.extend(b'\0'*((-len(data))%4));offset=len(data);data.extend(old[v.get('byteOffset',0):v.get('byteOffset',0)+v['byteLength']]);v['byteOffset']=offset
g['buffers']=[{'uri':'data:application/octet-stream;base64,'+base64.b64encode(data).decode(),'byteLength':len(data)}]
(out/'anterose.gltf').write_text(json.dumps(g,separators=(',',':')),encoding='utf8')
(out/'residents.json').write_text(json.dumps({'npcs':[],'disablePoms':True}),encoding='utf8')
(out/'source.json').write_text(json.dumps({'game':'Trails of Cold Steel II','map':'t0000','assets':[x[0] for x in parts],'playableBounds':{'minX':-18,'maxX':18,'minZ':-18,'maxZ':14},'note':'Native buildings, event ground, trees and entrance doors. Only the main-building forecourt is walkable.'},indent=2),encoding='utf8')
print('packed',len(g['nodes']),'meshes',len(data),'bytes')
