"""Export the native Anterose residents, French lines and Pom (read-only inputs)."""
import argparse, json, re, hashlib, math
from pathlib import Path
from export_sky_assets import decode_sprite, Image

FR_GLYPHS = {"\uff83": "\u00c0", "\uff61": "\u00c2", "\uff64": "\u00c4", "\uff66": "\u00c7", "\uff67": "\u00c8", "\uff68": "\u00c9", "\uff69": "\u00ca", "\uff6a": "\u00cb", "\uff6b": "\u00ce", "\uff6c": "\u00cf", "\uff6d": "\u00d4", "\uff6e": "\u00d9", "\uff82": "\u0178", "\uff70": "\u00dc", "\uff71": "\u00e0", "\uff72": "\u00e2", "\uff73": "\u00e4", "\uff74": "\u00e7", "\uff75": "\u00e8", "\uff76": "\u00e9", "\uff77": "\u00ea", "\uff78": "\u00eb", "\uff79": "\u00ee", "\uff7a": "\u00ef", "\uff7b": "\u00f4", "\uff7c": "\u00f9", "\uff7d": "\u00fb", "\uff7e": "\u00fc", "\uff7f": "\u00ff", "\uff80": "\u0152", "\uff81": "\u0153", "\uff84": "\u00b0", "\uff85": "\u00ab", "\uff86": "\u00bb", "\uff88": "\u202f", "\uff89": "\u00f6", "\uff8a": "\u00d6", "\uff8b": "\u200a"}

def atlas(directory,chip,output,height,death=False,limit=0):
 ch=directory/(chip+'._ch');cp=directory/(chip+'p._cp')
 if not ch.exists() or not cp.exists():return None
 frames=decode_sprite(ch.read_bytes(),cp.read_bytes());frames=frames[:limit] if limit else frames;boxes=[f.getbbox() for f in frames if f.getbbox()]
 b=(min(x[0] for x in boxes),min(x[1] for x in boxes),max(x[2] for x in boxes),max(x[3] for x in boxes));w,h=b[2]-b[0],b[3]-b[1]
 image=Image.new('RGBA',(w*8,h*((len(frames)+7)//8)))
 for i,f in enumerate(frames):image.paste(f.crop(b),((i%8)*w,(i//8)*h))
 image.save(output/(chip+'.png'))
 return dict(texture=chip+'.png',columns=8,rows=(len(frames)+7)//8,frameWidth=w,frameHeight=h,frames=len(frames),idle=[0],run=list(range(max(1,min(8,len(frames)//8)))),directions=8,fps=8,height=height)

def main():
 p=argparse.ArgumentParser();p.add_argument('--scenario',type=Path,required=True);p.add_argument('--chips',type=Path,required=True);p.add_argument('--monsters',type=Path,required=True);p.add_argument('--battle',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
 s=a.scenario.read_text(encoding='utf8').translate(str.maketrans(FR_GLYPHS));catalogue=json.loads((a.output/'characters.json').read_text(encoding='utf8'));npcs=[]
 def world(raw):return dict(x=-int(raw[0])/1000-45,y=int(raw[1])/1000,z=int(raw[2])/1000)
 definitions=[('manager','G\u00e9rant Lechter','ch01560',6,[7,8,9,10,11,14],0),('lenore','Lenore','ch02540',11,[0,1,2,11,12],4),('horrace','Horrace','ch01003',12,[0,8,9,10,12,13,14],5)]

 for ident,name,chip,fn,select,npc_index in definitions:
  native=re.search(r'^npc char\['+str(npc_index)+r'\]:\n(.*?)(?=^npc char\[|\Z)',s,re.M|re.S).group(1)
  raw=re.search(r'pos \(([-\d]+), ([-\d]+), ([-\d]+)\)',native).groups();waypoints=[world(raw)]
  angle=int(re.search(r'angle (\d+)deg',native).group(1));heading=dict(dx=-math.sin(math.radians(angle)),dz=math.cos(math.radians(angle)))
  if ident=='lenore':
   walking=re.search(r'^fn\[3\]:\n(.*?)(?=^fn\[|\Z)',s,re.M|re.S).group(1)
   for command in walking.splitlines():
    target=re.search(r'CharWalkToPos self \(([-\d]+), ([-\d]+), ([-\d]+)\)',command)
    if target:waypoints.append(world(target.groups()))
    turn=re.search(r'CharTurnTo self (\d+)deg',command)
    if turn:waypoints[-1]['angle']=int(turn.group(1))
    sleep=re.search(r'Sleep (\d+)ms',command)
    if sleep:waypoints[-1]['wait']=int(sleep.group(1))/1000
  block=re.search(r'^fn\['+str(fn)+r'\]:\n(.*?)(?=^fn\[|\Z)',s,re.M|re.S).group(1);lines=[]
  for text in re.findall(r'TextTalk self \{\n(.*?)\n\s*\}',block,re.S):
   text=' '.join(re.sub(r'\{[^}]*\}','',text).split())
   if text and text not in lines:lines.append(text)
  info=atlas(a.chips,chip,a.output,1.7,limit=8 if ident=='horrace' else 0)
  if info is None:raise ValueError('Missing resident sprite '+chip)
  if ident=='horrace':
   frames=decode_sprite((a.chips/'ch01000._ch').read_bytes(),(a.chips/'ch01000p._cp').read_bytes());boxes=[f.getbbox() for f in frames if f.getbbox()];standing=max(b[3] for b in boxes)-min(b[1] for b in boxes);info['height']=1.7*info['frameHeight']/standing;info['run']=[0]
  if ident=='manager':info['idle']=list(range(8));info['fps']=1/1.45
  catalogue[name]=info;npcs.append(dict(id=ident,name=name,character=name,static=ident!='lenore',speed=2,initialPause=0,heading=heading,waypoints=waypoints,lines=[lines[i] for i in select],source=dict(script='T1131',npc=npc_index,position=[int(v) for v in raw],angle=angle,function=fn,chip=chip)))
 catalogue['Pom']=atlas(a.monsters,'ch10140',a.output,.75)
 if catalogue['Pom'] is None:raise ValueError('Missing Pom sprite')
 original=json.loads((Path(__file__).parent/'character-map.json').read_text(encoding='utf8'))
 for name,chip in original.items():
  if name not in catalogue:continue
  battle=int(chip[2:])
  if battle<100: battle+=3000
  elif name=='Josette':battle=3100
  elif name=='Anelace':battle=3740
  elif name=='Cassius':battle=3670
  else:battle=battle//10*10
  death=atlas(a.battle,'ch'+str(battle+4).zfill(5),a.output,1.7,True)
  if death and name in catalogue:catalogue[name]['death']=death
 (a.output/'characters.json').write_text(json.dumps(catalogue,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 (a.output/'residents.json').write_text(json.dumps(dict(npcs=npcs,ballSpawn=dict(x=2.2,y=2.7275,z=11.4),source=dict(script='T1131',language='FR',sha256=hashlib.sha256(a.scenario.read_bytes()).hexdigest())),ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 print('Exported',len(npcs),'residents and Pom; death poses:',sum('death' in x for x in catalogue.values()))
if __name__=='__main__':main()
