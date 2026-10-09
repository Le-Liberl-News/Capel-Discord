"""Export Renne's native Third combat banks and short AS pose sequences.
Inputs are read-only. Effects use the already extracted SC DT33 textures.
"""
import argparse,hashlib,json,struct,sys
from pathlib import Path
from export_sky_assets import decode_sprite,decode_model_texture,Image
p=argparse.ArgumentParser();p.add_argument('--chips',type=Path,required=True);p.add_argument('--as-file',type=Path,required=True);p.add_argument('--decoder-directory',type=Path,required=True);p.add_argument('--effects',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();sys.path.insert(0,str(a.decoder_directory));import third_as as decoder
a.output.mkdir(parents=True,exist_ok=True)
frames={};boxes=[]
for bank in range(7):
 name=f'ch0451{bank}';frames[bank]=decode_sprite((a.chips/(name+'._ch')).read_bytes(),(a.chips/(name+'p._cp')).read_bytes());boxes.extend(f.getbbox() for f in frames[bank] if f.getbbox())
box=(min(b[0]for b in boxes),min(b[1]for b in boxes),max(b[2]for b in boxes),max(b[3]for b in boxes));w,h=box[2]-box[0],box[3]-box[1]
body=[f.getbbox()for f in frames[0]if f.getbbox()];foot=max(b[3]for b in body);scale=1.7/(foot-min(b[1]for b in body))
banks={}
for bank,poses in frames.items():
 image=Image.new('RGBA',(w*8,h*((len(poses)+7)//8)))
 for i,f in enumerate(poses):image.paste(f.crop(box),((i%8)*w,(i//8)*h))
 image.save(a.output/f'renne-{bank}.png');banks[str(bank)]={'texture':f'combat/renne-{bank}.png','columns':8,'rows':len(poses)//8,'frameWidth':w,'frameHeight':h,'frames':len(poses),'directions':8,'height':h*scale,'centerX':((box[0]+box[2])/2-128)*scale,'centerY':(foot-(box[1]+box[3])/2)*scale,'idle':[0],'run':list(range(len(poses)//8)),'fps':8}
d=a.as_file.read_bytes();_,end,entries=decoder.craft_table(d)
def sequence(slot):
 pc=entries[slot];bank=0;result=[];stack=[];visited={}
 for _ in range(800):
  if not end<=pc<len(d):break
  visited[pc]=visited.get(pc,0)+1
  if visited[pc]>1:break
  it=decoder._decode_one(d,pc);values=[int.from_bytes(d[pc+o.offset:pc+o.offset+o.size],'little')for o in it.operands if o.kind!='string']
  if it.opcode==0x1b and values[0]==255:bank=values[1]
  if it.opcode==2 and values[0]==255 and bank in banks_int:result.append({'bank':bank,'pose':values[1],'ms':0})
  if it.opcode==6 and result:result[-1]['ms']+=values[0]
  if it.opcode==1:pc=values[0];continue
  if it.opcode==0x50:stack.append(it.end);pc=values[0];continue
  if it.opcode==0x51:
   if not stack:break
   pc=stack.pop();continue
  if it.opcode==0:break
  pc=it.end
 for item in result:item['ms']=max(30,min(200,item['ms'] or 80))
 return result
banks_int={int(k)for k in banks}
sequences={name:sequence(slot)for name,slot in [('basic',5),('spell',6),('cast',7),('craft',17)]}
assert all(sequences.values())
for poses in sequences.values():
 for pose in poses:assert pose['pose']*8+7<banks[str(pose['bank'])]['frames']
metadata={'character':'Renne','banks':banks,'sequences':sequences,'source':{'game':'Sky Third JP','as':a.as_file.name,'sha256':hashlib.sha256(d).hexdigest(),'craftSlot':17,'effect':'SC cr153_00._ds'}}
(a.output/'renne.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
effect=decode_model_texture((a.effects/'cr153_00._ds').read_bytes());effect.crop((0,0,128,128)).save(a.output/'blood-circle.png');effect.crop((128,0,256,128)).save(a.output/'blood-vortex.png')
print('Native Renne banks:',len(banks),'poses:',{k:len(v)for k,v in sequences.items()},'crop',box)
