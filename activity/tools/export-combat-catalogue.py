"""Export only the native banks used by the first playable actions of audited characters."""
import argparse, hashlib, json, struct, sys
from pathlib import Path
from export_sky_assets import decode_sprite, Image
p=argparse.ArgumentParser();p.add_argument('--character');p.add_argument('--audit',type=Path,required=True);p.add_argument('--extracted',type=Path,required=True);p.add_argument('--decoder-directory',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
sys.path.insert(0,str(a.decoder_directory));import third_as as decoder
rows=json.loads(a.audit.read_text(encoding='utf8'))['characters'];catalogue=json.loads((a.output/'catalogue.json').read_text(encoding='utf8')) if a.character else {};omitted=[]
def sequence(data,entries,end,slot,available):
 pc=entries[slot];bank=0;result=[];stack=[];visited={}
 for _ in range(1600):
  if not end<=pc<len(data):break
  visited[pc]=visited.get(pc,0)+1
  if visited[pc]>2:break
  it=decoder._decode_one(data,pc);values=[int.from_bytes(data[pc+o.offset:pc+o.offset+o.size],'little') for o in it.operands if o.kind!='string']
  if it.opcode==0x1b and values[0]==255:bank=values[1]
  if it.opcode==2 and values[0]==255 and bank in available:result.append({'bank':bank,'pose':values[1],'ms':0})
  if it.opcode==6 and result:result[-1]['ms']+=values[0]
  if it.opcode==1:pc=values[0];continue
  if it.opcode==0x50:stack.append(it.end);pc=values[0];continue
  if it.opcode==0x51:
   if not stack:break
   pc=stack.pop();continue
  if it.opcode==0:break
  pc=it.end
 for item in result:item['ms']=max(30,min(300,item['ms'] or 80))
 return result
for row in rows:
 if row['category'] not in ['trio','attack-craft','attack'] or row['character']=='Renne':continue
 if a.character and row['character']!=a.character:continue
 source=row['source'];game=source['game'].lower();asfolder=a.extracted/('sc-subtitle-base' if game=='sc' else 'third-30')/'ED6_DT30';data=(asfolder/source['file']).read_bytes();_,end,entries=decoder.craft_table(data)
 files={}
 for i,b in enumerate(source['banks']):
  folder=a.extracted/(game+'-'+b['archive'][-2:].lower())/b['archive'];ch=folder/b['ch'].lower();cp=folder/b['cp'].lower()
  if ch.exists() and cp.exists():files[i]=(ch,cp)
 try:
  sequences={'basic':sequence(data,entries,end,5,files)}
  if row['art']:sequences.update(spell=sequence(data,entries,end,6,files),cast=sequence(data,entries,end,7,files))
  craftSlot=None
  if row['craft']:
   for slot in range(16,min(26,len(entries))):
    seq=sequence(data,entries,end,slot,files)
    if seq:craftSlot=slot;sequences['craft']=seq;break
  if not sequences['basic']:raise ValueError('No playable self frames')
  if 'spell' in sequences and (not sequences['spell'] or not sequences['cast']):sequences.pop('spell');sequences.pop('cast')
  needed={0,1,4}.intersection(files)|{f['bank'] for seq in sequences.values() for f in seq}
  frames={bank:decode_sprite(files[bank][0].read_bytes(),files[bank][1].read_bytes()) for bank in needed}
  for seq in sequences.values():
   for f in seq:
    if len(frames[f['bank']])==8 and f['pose']<8:f['pose']=0
  for key,seq in list(sequences.items()):
   seq[:]=[f for f in seq if f['pose']*8+7<len(frames[f['bank']])]
   if not seq:sequences.pop(key)
  if not sequences.get('basic'):raise ValueError('No valid attack poses')
  boxes=[f.getbbox() for poses in frames.values() for f in poses if f.getbbox()];box=(min(b[0] for b in boxes),min(b[1] for b in boxes),max(b[2] for b in boxes),max(b[3] for b in boxes));w,h=box[2]-box[0],box[3]-box[1]
  body=[f.getbbox() for f in frames[0] if f.getbbox()];foot=max(b[3] for b in body);scale=1.7/(foot-min(b[1] for b in body));slug=source['file'].split('.')[0];folder=a.output/slug;folder.mkdir(parents=True,exist_ok=True);banks={}
  for bank,poses in frames.items():
   image=Image.new('RGBA',(w*8,h*((len(poses)+7)//8)))
   for i,f in enumerate(poses):image.paste(f.crop(box),((i%8)*w,(i//8)*h))
   image.save(folder/f'{bank}.png',optimize=True);banks[str(bank)]={'texture':f'combat/{slug}/{bank}.png','columns':8,'rows':(len(poses)+7)//8,'frameWidth':w,'frameHeight':h,'frames':len(poses),'directions':8,'height':h*scale,'centerX':((box[0]+box[2])/2-128)*scale,'centerY':(foot-(box[1]+box[3])/2)*scale,'idle':[0],'run':list(range(len(poses)//8)),'fps':8}
  actions={'basic':{'name':'Attaque','key':'f','damage':12,'cooldown':700,'windup':300,'duration':max(650,min(1800,sum(f['ms'] for f in sequences['basic']))),'range':2.5,'radius':1.05}}
  # Gun/bow attacks keep a ranged hit instead of a melee cone.
  if row['character'] in ['Olivier','Tita','Kevin','Josette','Kanone','Gilbert','Dorothy']:actions['basic'].update(range=8,radius=.7,projectile=True,windup=350)
  if sequences.get('spell') and sequences.get('cast'):actions['art']={'name':'Flèche de feu','key':'c','damage':20,'cooldown':3500,'windup':1000,'duration':1800,'range':9,'radius':1.4,'projectile':True}
  if sequences.get('craft'):actions['craft']={'name':f'Craft {craftSlot-15}','key':'g','damage':30,'cooldown':6000,'windup':650,'duration':max(1650,min(2500,sum(f['ms'] for f in sequences['craft']))),'range':6,'radius':1.9,'projectile':False}
  catalogue[row['character']]={'character':row['character'],'banks':banks,'sequences':sequences,'actions':actions,'source':{'game':source['game'],'as':source['file'],'sha256':hashlib.sha256(data).hexdigest(),'craftSlot':craftSlot}}
  print(row['character'],list(actions),craftSlot)
 except Exception as e:omitted.append({'character':row['character'],'reason':str(e)});print('OMITTED',row['character'],str(e))
# Retain the existing hand-tuned Renne implementation.
renne=json.loads((a.output/'renne.json').read_text(encoding='utf8'));renne['actions']={'basic':{'name':'Coup de faux','key':'f','damage':12,'cooldown':700,'windup':300,'duration':650,'range':2.5,'radius':1.05},'art':{'name':'Flèche de feu','key':'c','damage':20,'cooldown':3500,'windup':1000,'duration':1650,'range':9,'radius':1.4,'projectile':True},'craft':{'name':'Cercle sanglant','key':'g','damage':30,'cooldown':6000,'windup':650,'duration':1650,'range':8,'radius':1.9,'projectile':True}};catalogue['Renne']=renne
(a.output/'catalogue.json').write_text(json.dumps(catalogue,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf8')
(a.output/'export-report.json').write_text(json.dumps({'characters':len(catalogue),'omitted':omitted},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Exported',len(catalogue),'characters; omitted',len(omitted))
