"""Index installed archives; decode only a selected sound or sprite. Never write to game folders."""
import json,struct,sys,hashlib,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT.parent/'Website/tools'))
from ed6_decompress import decompress
GAMES={'FC':Path('C:/Program Files (x86)/Steam/steamapps/common/Trails in the Sky FC'),'SC':Path('C:/Program Files (x86)/Steam/steamapps/common/Trails in the Sky SC'),'Third':Path('C:/GOG Games/Trails in the Sky the 3rd')}
CACHE=Path('E:/dev/sky-activity-tools/atelier-combat')
def index(game):
 result={}
 for p in GAMES[game].glob('ED6_DT*.dir'):
  data=p.read_bytes();archive=int(p.stem[-2:],16)
  for i in range(struct.unpack_from('<I',data,8)[0]):
   o=16+i*36;raw=data[o:o+12].decode('ascii','replace');name=(raw[:8].rstrip()+raw[8:].rstrip('\0 ')).lower();size,_,_,_,offset=struct.unpack_from('<5I',data,o+16)
   if size:result.setdefault(name,{'archive':archive,'offset':offset,'size':size})
 return result
requested_game=sys.argv[1] if len(sys.argv)>=3 else None
indexes={g:index(g) for g in GAMES if requested_game is None or g==requested_game}
def read(game,name):
 entry=indexes[game][name]
 with (GAMES[game]/f"ED6_DT{entry['archive']:02X}.dat").open('rb') as f:f.seek(entry['offset']);data=f.read(entry['size'])
 try:return decompress(data)
 except Exception:return data
if len(sys.argv)==1:
 sounds=[];characters={};models=[]
 for g,entries in indexes.items():
  for n in entries:
   if n.endswith(('._x3','._x2')):models.append({'id':f'/cache/scene-models/{g}/{n}/model.gltf','name':f'{g}/{n}'})
   if n.endswith('.wav'):sounds.append({'id':f'/cache/sounds/{g}/{n}','name':f'{g}/{n}'})
   if n.endswith('._ch') and n.replace('._ch','p._cp') in entries:characters[f'{g}/{n}']={'raw':True,'game':g,'source':n}
 print(json.dumps({'sounds':sounds,'characters':characters,'models':models}))
else:
 game,name=sys.argv[1:3]
 if game not in GAMES or name not in indexes[game]:raise ValueError('Asset absent')
 if name.endswith('.wav'):
  p=CACHE/'sounds'/game/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(read(game,name));print(json.dumps({'file':str(p)}))
 elif name.endswith(('._x3','._x2')):
  import importlib.util,tempfile
  sys.path.insert(0,str(ROOT/'activity/tools'))
  from export_sky_assets import decode_model_texture
  spec=importlib.util.spec_from_file_location('x3',ROOT/'activity/tools/vendor/x3_parser.py');parser=importlib.util.module_from_spec(spec);spec.loader.exec_module(parser)
  target=CACHE/'scene-models'/game/name;target.mkdir(parents=True,exist_ok=True)
  with tempfile.TemporaryDirectory(prefix='scene-model-') as tmp:
   raw=Path(tmp)/name;raw.write_bytes(read(game,name));parser.read_x_to_gltf(str(raw));model=json.loads(Path(str(raw)+'.gltf').read_text(encoding='utf-8'))
  texture_names={n.split('.')[0]:n for n in indexes[game] if n.endswith(('._dt','._ds','.dds','.bmp'))}
  from fast_model_texture import decode_texture
  for image in model.get('images',[]):
   stem=Path(image['uri'].replace('\\','/')).stem.lower();texture=texture_names.get(stem)
   if texture is None:raise ValueError('Texture absente : '+stem)
   png=stem+'.png'
   if not (target/png).exists():
    entry=indexes[game][texture];archive=GAMES[game]/f"ED6_DT{entry['archive']:02X}.dat"
    stamp=f"{texture}:{entry}:{archive.stat().st_size}:{archive.stat().st_mtime_ns}"
    shared=CACHE/'scene-textures'/game/(hashlib.sha256(stamp.encode()).hexdigest()+'.png');shared.parent.mkdir(parents=True,exist_ok=True)
    if not shared.exists():decode_texture(read(game,texture),decode_model_texture).save(shared)
    shutil.copyfile(shared,target/png)
   image['uri']=png
  for material in model.get('materials',[]):material['alphaMode']='MASK';material['alphaCutoff']=0.05;material['doubleSided']=True
  (target/'model.gltf').write_text(json.dumps(model),encoding='utf-8');print(json.dumps({'file':str(target/'model.gltf')}))
 else:
  sys.path.insert(0,str(ROOT/'activity/tools'))
  from export_sky_assets import decode_sprite,Image
  frames=decode_sprite(read(game,name),read(game,name.replace('._ch','p._cp')))
  boxes=[f.getbbox() for f in frames if f.getbbox()];box=(min(b[0] for b in boxes),min(b[1] for b in boxes),max(b[2] for b in boxes),max(b[3] for b in boxes));w,h=box[2]-box[0],box[3]-box[1];rows=(len(frames)+7)//8;atlas=Image.new('RGBA',(w*8,h*rows))
  for i,f in enumerate(frames):atlas.paste(f.crop(box),((i%8)*w,(i//8)*h))
  p=CACHE/'scene-sprites'/game/(name+'.png');p.parent.mkdir(parents=True,exist_ok=True);atlas.save(p)
  info={'texture':'/cache/'+p.relative_to(CACHE).as_posix(),'columns':8,'rows':rows,'frameWidth':w,'frameHeight':h,'directions':8 if len(frames)>=8 else 1,'height':h*.0198,'centerX':(box[0]+w/2-128)*.0198,'idle':[0],'run':list(range(min(rows,4))),'fps':8}
  p.with_suffix('.json').write_text(json.dumps(info),encoding='utf-8');print(json.dumps(info))
