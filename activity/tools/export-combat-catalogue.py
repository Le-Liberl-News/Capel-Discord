"""Export only the native banks used by the first playable actions of audited characters."""
import argparse, hashlib, json, struct, sys
from pathlib import Path
from export_sky_assets import decode_sprite, Image
p=argparse.ArgumentParser();p.add_argument('--character');p.add_argument('--audit',type=Path,required=True);p.add_argument('--extracted',type=Path,required=True);p.add_argument('--decoder-directory',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
sys.path.insert(0,str(a.decoder_directory));import third_as as decoder
heroes=json.loads((Path(__file__).resolve().parents[1]/'assets/sky/combat/hero-actions.json').read_text(encoding='utf8'))
rows=json.loads(a.audit.read_text(encoding='utf8'))['characters'];catalogue=json.loads((a.output/'catalogue.json').read_text(encoding='utf8')) if a.character else {};omitted=[]
def sequence(data,entries,end,slot,available,native_timing=False):
 pc=entries[slot];bank=0;result=[];stack=[];visited={};heading=0
 for _ in range(1600):
  if not end<=pc<len(data):break
  visited[pc]=visited.get(pc,0)+1
  if visited[pc]>(32 if native_timing else 2):break
  it=decoder._decode_one(data,pc);values=[int.from_bytes(data[pc+o.offset:pc+o.offset+o.size],'little') for o in it.operands if o.kind!='string']
  if it.opcode==0x1b and values[0]==255:bank=values[1]
  if it.opcode==3 and values[0]==255 and native_timing:
   heading=values[1]
   if result:result.append({**result[-1],'ms':0,'heading':heading})
  if it.opcode==2 and values[0]==255 and bank in available:result.append({'bank':bank,'pose':values[1],'ms':0,**({'heading':heading} if native_timing else {})})
  if it.opcode==6 and result:result[-1]['ms']+=values[0]
  if it.opcode==1:pc=values[0];continue
  if it.opcode==0x50:stack.append(it.end);pc=values[0];continue
  if it.opcode==0x51:
   if not stack:break
   pc=stack.pop();continue
  if it.opcode==0:break
  pc=it.end
 for item in result:item['ms']=max(16,item['ms']) if native_timing else max(30,min(300,item['ms'] or 80))
 return result
for row in rows:
 if row['category'] not in ['trio','attack-craft','attack'] or row['character']=='Renne':continue
 if a.character and row['character']!=a.character:continue
 source=dict(row['source'])
 if row['character']=='Olivier':
  source={'game':'SC','file':'as04030._dt','banks':[{'ch':f'CH0013{n}._CH','cp':f'CH0013{n}P._CP','archive':'ED6_DT07'} for n in range(7)]}
 if row['character']=='Joshua':
  source['banks']=[{'ch':f'CH0420{n:x}._CH','cp':f'CH0420{n:x}P._CP','archive':'ED6_DT27'} for n in range(13)]
  # AS 27 opcode 0x6A explicitly loads CH0420A/CP0420AP into bank 12.
  source['banks'][12]={'ch':'CH0420A._CH','cp':'CH0420AP._CP','archive':'ED6_DT27'}
 game=source['game'].lower();asfolder=a.extracted/('sc-subtitle-base' if game=='sc' else 'third-30')/'ED6_DT30';data=(asfolder/source['file']).read_bytes();_,end,entries=decoder.craft_table(data)
 files={}
 for i,b in enumerate(source['banks']):
  folder=a.extracted/(game+'-'+b['archive'][-2:].lower())/b['archive'];ch=folder/b['ch'].lower();cp=folder/b['cp'].lower()
  if ch.exists() and cp.exists():files[i]=(ch,cp)
 if row['character']=='Olivier':
  for bank,ch in [(12,'ch0403a'),(13,'ch0403c')]:
   folder=a.extracted/'sc-27/ED6_DT27';files[bank]=(folder/(ch+'._ch'),folder/(ch+'p._cp'))
 try:
  sequences={'basic':sequence(data,entries,end,5,files)}
  if row['art']:sequences.update(spell=sequence(data,entries,end,6,files),cast=sequence(data,entries,end,7,files))
  craftSlot=None
  if row['craft']:
   for slot in range(16,min(26,len(entries))):
    seq=sequence(data,entries,end,slot,files)
    if seq:craftSlot=slot;sequences['craft']=seq;break
  if not sequences['basic']:raise ValueError('No playable self frames')
  if heroes.get(row['character'],{}).get('slot') is not None:
   craftSlot=heroes[row['character']]['slot'];sequences['craft']=sequence(data,entries,end,craftSlot,files,native_timing=row['character']=='Olivier')
  if row['character']=='Olivier':
   # Requiem's luth bank contains individual poses; skip the rose prelude.
   sequences['craft']=[{'bank':12,'pose':i,'ms':80,'heading':0} for i in range(4,12)]+[{'bank':12,'pose':12,'ms':500,'heading':i*45,'firing':True} for i in range(8)]
  if row['character']=='Estelle':
   sequences['craft']=sequence(data,entries,end,17,files);craftSlot=17
  if row['character']=='Joshua':
   sequences['art']=sequence(data,entries,end,19,files)
   sequences['craft']=[f for f in sequence(data,entries,end,27,files) if f['bank']==12]
   craftSlot=27
  if 'spell' in sequences and (not sequences['spell'] or not sequences['cast']):sequences.pop('spell');sequences.pop('cast')
  needed={0,1,4}.intersection(files)|{f['bank'] for seq in sequences.values() for f in seq}
  frames={bank:decode_sprite(files[bank][0].read_bytes(),files[bank][1].read_bytes()) for bank in needed}
  for seq in sequences.values():
   for f in seq:
    if len(frames[f['bank']])==8 and f['pose']<8:f['pose']=0
  for key,seq in list(sequences.items()):
   seq[:]=[f for f in seq if (f['pose'] if row['character']=='Olivier' and f['bank']==12 else f['pose']*8+7)<len(frames[f['bank']])]
   if not seq:sequences.pop(key)
  if not sequences.get('basic'):raise ValueError('No valid attack poses')
  boxes=[f.getbbox() for poses in frames.values() for f in poses if f.getbbox()];box=(min(b[0] for b in boxes),min(b[1] for b in boxes),max(b[2] for b in boxes),max(b[3] for b in boxes));w,h=box[2]-box[0],box[3]-box[1]
  body=[f.getbbox() for f in frames[0] if f.getbbox()];foot=max(b[3] for b in body);scale=1.7/(foot-min(b[1] for b in body));slug=source['file'].split('.')[0];folder=a.output/slug;folder.mkdir(parents=True,exist_ok=True);banks={}
  for bank,poses in frames.items():
   image=Image.new('RGBA',(w*8,h*((len(poses)+7)//8)))
   for i,f in enumerate(poses):image.paste(f.crop(box),((i%8)*w,(i//8)*h))
   image.save(folder/f'{bank}.png',optimize=True);banks[str(bank)]={'texture':f'combat/{slug}/{bank}.png','columns':8,'rows':(len(poses)+7)//8,'frameWidth':w,'frameHeight':h,'frames':len(poses),'directions':1 if row['character']=='Olivier' and bank==12 else 8,'height':h*scale,'centerX':((box[0]+box[2])/2-128)*scale,'centerY':(foot-(box[1]+box[3])/2)*scale,'idle':[0],'run':list(range(len(poses)//8)),'fps':8}
  actions={'basic':{'name':'Attaque','key':'f','damage':12,'cooldown':700,'windup':300,'duration':max(650,min(1800,sum(f['ms'] for f in sequences['basic']))),'range':2.5,'radius':1.05}}
  # Gun/bow attacks keep a ranged hit instead of a melee cone.
  if row['character'] in ['Olivier','Tita','Kevin','Josette','Kanone','Gilbert','Dorothy']:actions['basic'].update(range=8,radius=.7,projectile=True,windup=350)
  if sequences.get('spell') and sequences.get('cast'):actions['art']={'name':'Flèche de feu','key':'c','damage':20,'cooldown':3500,'windup':1000,'duration':1800,'range':9,'radius':1.4,'projectile':True}
  if sequences.get('craft'):actions['craft']={'name':f'Craft {craftSlot-15}','key':'g','damage':30,'cooldown':6000,'windup':650,'duration':max(1650,min(2500,sum(f['ms'] for f in sequences['craft']))),'range':6,'radius':1.9,'projectile':False}
  if row['character']=='Estelle':
   actions['art'].update(name='Lance de terre',element='earth',nativeEffect='SC/mg011_0._ef',effectDuration=1800,projectile=False,windup=2000,duration=2600,castEffect='SC/mgaria0._ef',castDuration=1000)
   actions['craft'].update(name='Onde sismique',shape='line',groundTarget=True,wave=True,hitOffsets=list(range(0,961,120)),range=8,radius=.75,windup=420,duration=1060,effectDuration=1700,nativeEffect='SC/mg011_0._ef')
  if row['character']=='Joshua':
   actions['art'].update(name='Lame de vent',element='wind',effectDuration=3000,nativeEffect='SC/mg050_0._ef',poseSequence='art',projectile=False,windup=2000,duration=2400,castEffect='SC/mgaria0._ef',castDuration=1000)
   actions['craft'].update(name='Black Fang',shape='line',dash=True,groundTarget=True,hitOffsets=[0,160,320],range=9,radius=.8,windup=160,dashDuration=440,duration=1100,effectDuration=750,nativeEffect='SC/sc001_10._ef')
  catalogue[row['character']]={'character':row['character'],'banks':banks,'sequences':sequences,'actions':actions,'source':{'game':source['game'],'as':source['file'],'sha256':hashlib.sha256(data).hexdigest(),'craftSlot':craftSlot}}
  print(row['character'],list(actions),craftSlot)
 except Exception as e:omitted.append({'character':row['character'],'reason':str(e)});print('OMITTED',row['character'],str(e))
# Retain the existing hand-tuned Renne implementation.
renne=json.loads((a.output/'renne.json').read_text(encoding='utf8'));renne['actions']={'basic':{'name':'Coup de faux','key':'f','damage':12,'cooldown':700,'windup':300,'duration':650,'range':2.5,'radius':1.05},'art':{'name':'Flèche de feu','key':'c','damage':20,'cooldown':3500,'windup':1000,'duration':1650,'range':9,'radius':1.4,'projectile':True},'craft':{'name':'Cercle sanglant','key':'g','damage':30,'cooldown':6000,'windup':650,'duration':1650,'range':8,'radius':1.9,'projectile':True}};catalogue['Renne']=renne
(a.output/'catalogue.json').write_text(json.dumps(catalogue,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf8')
if a.character and (a.output/'export-report.json').exists():
 omitted=[e for e in json.loads((a.output/'export-report.json').read_text(encoding='utf8'))['omitted'] if e['character']!=a.character]+omitted
(a.output/'export-report.json').write_text(json.dumps({'characters':len(catalogue),'omitted':omitted},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Exported',len(catalogue),'characters; omitted',len(omitted))
