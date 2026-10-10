import argparse,json,sys,hashlib
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--extracted',type=Path,default=Path('E:/dev/sky-activity-tools'));p.add_argument('--decoder',type=Path,default=Path('E:/dev/Website/toolchain'));p.add_argument('--output',type=Path,default=Path('E:/dev/sky-activity-tools/atelier-combat'));p.add_argument('--animations-only',action='store_true');p.add_argument('--sprites-only',action='store_true');a=p.parse_args()
third_effects = a.extracted/'third-33/ED6_DT33'
if not third_effects.exists():
 third_effects = Path.home()/'.codex/sky-effect-work/third-33/ED6_DT33'
if a.animations_only:
 from native_effects import export_effects,export_additive_textures
 file=a.output/'catalogue.json';catalogue=json.loads(file.read_text(encoding='utf-8'))
 export_additive_textures([a.extracted/'sc-33/ED6_DT33',third_effects],catalogue['effects'],a.output)
 catalogue['animations']=export_effects([a.extracted/'sc-33/ED6_DT33',third_effects],catalogue['effects'],a.output)
 file.write_text(json.dumps(catalogue,ensure_ascii=False),encoding='utf-8');print(len(catalogue['animations']),'effets');raise SystemExit()
repo=Path(__file__).resolve().parents[2];sys.path.insert(0,str(repo/'activity/tools'));from export_sky_assets import decode_sprite,decode_model_texture,Image
sys.path.insert(0,str(a.decoder));import third_as as decoder
out=a.output;out.mkdir(parents=True,exist_ok=True);characters={};warnings=[]
previous=json.loads((out/'catalogue.json').read_text(encoding='utf-8'))['characters'] if (out/'catalogue.json').exists() else {}
def sequence(data,entries,end,slot,available,dynamic):
 pc=entries[slot];bank=0;mapping={int(k):k for k in available if k.isdigit()};result=[];stack=[];visited={}
 for _ in range(1600):
  if not end<=pc<len(data):break
  visited[pc]=visited.get(pc,0)+1
  if visited[pc]>2:
   if stack:pc=stack.pop();continue
   break
  it=decoder._decode_one(data,pc);values=[int.from_bytes(data[pc+o.offset:pc+o.offset+o.size],'little') for o in it.operands if o.kind!='string']
  if it.opcode==0x6a and tuple(values[1:3]) in dynamic:mapping[values[0]]=dynamic[tuple(values[1:3])]
  if it.opcode==0x22 and values[0]==255 and end<=values[2]<len(data):stack.append(it.end);pc=values[2];continue
  if it.opcode==0x1b and values[0]==255:bank=values[1]
  if it.opcode==2 and values[0]==255 and mapping.get(bank) in available:result.append({'bank':mapping[bank],'pose':values[1],'ms':0})
  if it.opcode==6 and result:result[-1]['ms']+=values[0]
  if it.opcode==1:pc=values[0];continue
  if it.opcode==0x50:stack.append(it.end);pc=values[0];continue
  if it.opcode==0x51:
   if not stack:break
   pc=stack.pop();continue
  if it.opcode==0:
   if stack:pc=stack.pop();continue
   break
  pc=it.end
 for item in result:item['ms']=max(30,min(300,item['ms'] or 80))
 return result
rows=json.loads((a.extracted/'combat/characters.json').read_text(encoding='utf-8'))['characters']
avatars=json.loads((repo/'activity/assets/sky/characters.json').read_text(encoding='utf-8'))
configured=json.loads((repo/'activity/assets/sky/combat/catalogue.json').read_text(encoding='utf-8'))
for row in rows:
 if not (row.get('currentAvatar') or row['character'] in configured or row['character'] in avatars) or not row.get('source'):continue
 name=row['character'];src=row['source'];game=src['game'].lower();folder=a.extracted/('sc-subtitle-base' if game=='sc' else 'third-30')/'ED6_DT30'
 if game=='fc':folder=a.extracted/'fc-combat-10/ED6_DT10'
 try:
  data=(folder/src['file']).read_bytes();_,end,entries=decoder.craft_table(data);banks={};slug=game+'-'+src['file'].split('.')[0]
  target=out/'sprites'/slug;target.mkdir(parents=True,exist_ok=True)
  for i,b in enumerate(src['banks']):
   base=a.extracted/(game+'-'+b['archive'][-2:].lower())/b['archive'];ch=base/b['ch'].lower();cp=base/b['cp'].lower()
   if not ch.exists() or not cp.exists():warnings.append(name+': banque '+str(i)+' absente');continue
   file=target/(str(i)+'.png');digest=hashlib.sha256(ch.read_bytes()+cp.read_bytes()).hexdigest();old=previous.get(name,{}).get('banks',{}).get(str(i))
   if file.exists() and old and old.get('sha256') in [None,digest]:banks[str(i)]={**old,'sha256':digest};continue
   frames=decode_sprite(ch.read_bytes(),cp.read_bytes());w,h=frames[0].size;image=Image.new('RGBA',(w*8,h*((len(frames)+7)//8)))
   for n,f in enumerate(frames):image.paste(f,((n%8)*w,(n//8)*h))
   file=target/(str(i)+'.png')
   image.save(file,optimize=True)
   banks[str(i)]={'texture':'/cache/'+file.relative_to(out).as_posix(),'columns':8,'rows':(len(frames)+7)//8,'frameWidth':w,'frameHeight':h,'frames':len(frames),'directions':8,'source':b['ch'],'sha256':digest}
  dynamic={}
  try:instructions=decoder.decode(data)
  except Exception as e:warnings.append(name+': branches AS : '+str(e));instructions={}
  for address,it in instructions.items():
   if it.opcode!=0x6a:continue
   values=[int.from_bytes(data[address+o.offset:address+o.offset+o.size],'little') for o in it.operands]
   logical,chid,cpid=values
   key=f'dynamic-{chid:08x}-{cpid:08x}'
   if key in banks:dynamic[(chid,cpid)]=key;continue
   paths=[]
   for resource in (chid,cpid):
    archive=f'ED6_DT{resource>>16:02X}';base=a.extracted/(game+'-'+archive[-2:].lower())
    if not (base/(archive+'.json')).exists():break
    lookup=json.loads((base/(archive+'.json')).read_text(encoding='utf-8'))
    entry=lookup[f'0x{resource:08X}'];filename=entry.get('path') or entry.get('name')
    paths.append(base/archive/filename.replace('\\','/').split('/')[-1].lower())
   if len(paths)!=2 or not all(path.exists() for path in paths):warnings.append(name+': banque dynamique absente : '+key);continue
   ch,cp=paths
   frames=decode_sprite(ch.read_bytes(),cp.read_bytes());w,h=frames[0].size
   image=Image.new('RGBA',(w*8,h*((len(frames)+7)//8)))
   for n,f in enumerate(frames):image.paste(f,((n%8)*w,(n//8)*h))
   file=target/(key+'.png');image.save(file,optimize=True)
   banks[key]={'texture':'/cache/'+file.relative_to(out).as_posix(),'columns':8,'rows':(len(frames)+7)//8,'frameWidth':w,'frameHeight':h,'frames':len(frames),'directions':8 if len(frames)>=8 and len(frames)%8==0 else 1,'source':ch.name,'logicalBank':logical}
   dynamic[(chid,cpid)]=key
  routines={}
  for slot in [5,6,7]+list(range(16,len(entries))):
   try:frames=sequence(data,entries,end,slot,banks,dynamic)
   except Exception as e:warnings.append(name+': AS '+str(slot)+' : '+str(e));continue
   for f in frames:
    info=banks[f['bank']]
    if f['bank'].startswith('dynamic-') and info['frames']//8<=f['pose']<info['frames']:info['directions']=1
   frames=[f for f in frames if f['pose']*banks[f['bank']]['directions']+banks[f['bank']]['directions']-1<banks[f['bank']]['frames']]
   if frames:routines[str(slot)]={'name':{5:'Attaque',6:'Incantation',7:'Lancement'}.get(slot,'Craft '+str(slot-15) if slot<26 else 'S-craft' if slot in (26,27) else 'Routine '+str(slot)),'sequence':frames}
  characters[name]={'source':src['file'],'game':src['game'],'banks':banks,'routines':routines,'configured':configured.get(name)}
  print(name,len(banks),'banques',len(routines),'routines',flush=True)
 except Exception as e:warnings.append(name+': '+str(e))
for name,info in avatars.items():
 if name not in characters:characters[name]={'source':info['texture'],'game':'Sky','banks':{'0':{**info,'texture':'/assets/'+info['texture'],'source':info['texture']}},'routines':{},'configured':configured.get(name)}
if a.sprites_only:
 catalogue=json.loads((out/'catalogue.json').read_text(encoding='utf-8'));catalogue['characters']=characters;catalogue['warnings']=warnings
 (out/'catalogue.json').write_text(json.dumps(catalogue,ensure_ascii=False),encoding='utf-8');print(warnings);raise SystemExit()
effects=[]
for folder in [a.extracted/'sc-33/ED6_DT33',third_effects]:
 if not folder.exists():continue
 for file in sorted(folder.iterdir()):
  if not file.is_file() or file.suffix.lower()!='._ds':continue
  try:
   game='SC' if folder.parent.name.startswith('sc-') else 'Third';target=out/'effects'/game/(file.stem+'.png');target.parent.mkdir(parents=True,exist_ok=True)
   if not target.exists():decode_model_texture(file.read_bytes()).save(target)
   with Image.open(target) as im:w,h=im.size
   effects.append({'id':game+'/'+file.name,'texture':'/cache/'+target.relative_to(out).as_posix(),'width':w,'height':h,'source':file.name,'game':game})
  except Exception as e:warnings.append(file.name+': '+str(e))
from native_effects import export_effects,export_additive_textures
export_additive_textures([a.extracted/'sc-33/ED6_DT33',third_effects],effects,out)
animations=export_effects([a.extracted/'sc-33/ED6_DT33',third_effects],effects,out)
(out/'catalogue.json').write_text(json.dumps({'characters':characters,'effects':effects,'animations':animations,'warnings':warnings},ensure_ascii=False),encoding='utf-8')
print(len(characters),'personnages,',len(effects),'textures,',len(warnings),'avertissements',flush=True)
