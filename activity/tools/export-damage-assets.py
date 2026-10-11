"""Export the original SC damage digits and ground each death-animation frame."""
import argparse, json, struct
from pathlib import Path
from PIL import Image
parser=argparse.ArgumentParser()
parser.add_argument('--battle3',type=Path,default=Path('E:/dev/PatchSC/src/archives/ED6_DT2F/battle3._ch'))
args=parser.parse_args()
root=Path(__file__).resolve().parents[1]/'assets/sky'
image=Image.new('RGBA',(256,256))
image.putdata([((w>>10&31)*255//31,(w>>5&31)*255//31,(w&31)*255//31,255 if w&32768 else 0) for (w,) in struct.iter_unpack('<H',args.battle3.read_bytes())])
strip=image.crop((0,192,160,224))
strip.putdata([(max(g,b),r,r,a) for r,g,b,a in strip.getdata()])
strip.save(root/'effects/damage-digits.png')
p=root/'combat/catalogue.json'
catalogue=json.loads(p.read_text(encoding='utf8'))
for hero in catalogue.values():
 info=hero.get('banks',{}).get('4')
 if not info: continue
 atlas=Image.open(root/info['texture']).convert('RGBA')
 w,h=info['frameWidth'],info['frameHeight'];scale=info['height']/h
 offsets=[]
 for n in range(info['frames']):
  x,y=n%info['columns']*w,n//info['columns']*h
  box=atlas.crop((x,y,x+w,y+h)).getchannel('A').point(lambda a:255 if a>=39 else 0).getbbox()
  bottom=box[3] if box else h
  anchor=info.get('anchors')
  anchor_y=(anchor[n%8][1]-176)*info.get('pixelScale',0) if anchor else 0
  offsets.append(round(-(info.get('centerY',info['height']/2)-info['height']/2+(h-bottom)*scale+anchor_y)+.025,6))
 info['groundOffsets']=offsets
p.write_text(json.dumps(catalogue,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf8')
