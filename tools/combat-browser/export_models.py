"""Export an effect's real X3 meshes and UVs for the local Canvas viewer."""
import base64,importlib.util,json,shutil,struct,tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
CACHE=Path('E:/dev/sky-activity-tools/atelier-combat')
def export_model(source,game,textures):
 spec=importlib.util.spec_from_file_location('sky_x',ROOT/'activity/tools/vendor/x3_parser.py')
 module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
 with tempfile.TemporaryDirectory(prefix='sky-effect-model-') as work:
  file=Path(work)/source.name;shutil.copyfile(source,file);module.read_x_to_gltf(str(file));g=json.loads(Path(str(file)+'.gltf').read_text(encoding='utf-8'))
 data=base64.b64decode(g['buffers'][0]['uri'].split(',')[1])
 def values(index):
  a=g['accessors'][index];v=g['bufferViews'][a['bufferView']];n={'SCALAR':1,'VEC2':2,'VEC3':3}[a['type']];fmt={5126:'f',5123:'H',5125:'I'}[a['componentType']];size=struct.calcsize('<'+fmt*n)
  return [list(struct.unpack_from('<'+fmt*n,data,v.get('byteOffset',0)+a.get('byteOffset',0)+i*v.get('byteStride',size))) for i in range(a['count'])]
 raw=source.read_bytes();native_materials={}
 # X3 texture records use a 16-byte name followed by the material render flags.
 for entry in textures:
  name=Path(entry['source']).stem.lower();offset=raw.find((name+'.bmp').encode('ascii'))
  if offset>=0:native_materials[name]=struct.unpack_from('<I',raw,offset+16)[0]
 meshes=[]
 for mesh in g['meshes']:
  for primitive in mesh['primitives']:
   material=g['materials'][primitive.get('material',0)];texture_id=material.get('pbrMetallicRoughness',{}).get('baseColorTexture',{}).get('index')
   if texture_id is None:continue
   name=Path(g['images'][g['textures'][texture_id]['source']]['uri'].replace('\\','/')).stem.lower()
   texture=next((t for t in textures if t['game']==game and Path(t['source']).stem.lower()==name),None)
   if not texture:raise ValueError('Texture du modèle absente : '+name)
   # X3 converter's root flips X to preserve the original handedness.
   positions=[[-p[0],p[1],p[2]] for p in values(primitive['attributes']['POSITION'])]
   meshes.append({'positions':positions,'uv':values(primitive['attributes']['TEXCOORD_0']),'indices':[p[0] for p in values(primitive['indices'])],'texture':texture,'renderFlags':native_materials.get(name,0)})
 result={'meshes':meshes,'extent':max(abs(v) for m in meshes for p in m['positions'] for v in p)}
 target=CACHE/'models'/game/(source.stem+'.json');target.parent.mkdir(parents=True,exist_ok=True);target.write_text(json.dumps(result),encoding='utf-8');return target
if __name__=='__main__':
 import sys
 catalogue=json.loads((CACHE/'catalogue.json').read_text(encoding='utf-8'))
 for game,folder in [('SC',Path('E:/dev/sky-activity-tools/sc-33/ED6_DT33')),('Third',Path.home()/'.codex/sky-effect-work/third-33/ED6_DT33')]:
  for name in sys.argv[1:] or ['cr04150b']:
   print(export_model(folder/(name+'._x3'),game,catalogue['effects']))
