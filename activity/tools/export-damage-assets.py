"""Export the original SC damage digits and ground each death-animation frame."""
import argparse, json, struct
from pathlib import Path
from PIL import Image, ImageFilter
parser=argparse.ArgumentParser()
parser.add_argument('--battle3',type=Path,default=Path('E:/dev/PatchSC/src/archives/ED6_DT2F/hbattle3._ch'))
parser.add_argument('--digits-only',action='store_true')
args=parser.parse_args()
root=Path(__file__).resolve().parents[1]/'assets/sky'
# HD menu textures are ARGB4444; their antialiased alpha must be preserved.
image=Image.new('RGBA',(512,512))
image.putdata([((w>>8&15)*17,(w>>4&15)*17,(w&15)*17,(w>>12&15)*17) for (w,) in struct.iter_unpack('<H',args.battle3.read_bytes())])
strip=Image.new('RGBA',(1280,256))
for digit in range(10):
 core=image.crop((digit*32,128,(digit+1)*32,192)).getchannel('A').resize((128,256),Image.Resampling.LANCZOS)
 core=core.filter(ImageFilter.GaussianBlur(3)).point(lambda a:max(0,min(255,round((a-24)*255/207))))
 border=core.filter(ImageFilter.MaxFilter(13)).filter(ImageFilter.GaussianBlur(2))
 glow=border.filter(ImageFilter.GaussianBlur(14)).point(lambda a:round(a*.8))
 cell=Image.new('RGBA',(128,256))
 for color,mask in [((255,30,30),glow),((235,20,20),border),((255,255,255),core)]:
  layer=Image.new('RGBA',cell.size,(*color,0));layer.putalpha(mask);cell.alpha_composite(layer)
 strip.alpha_composite(cell,(digit*128,0))
strip.save(root/'effects/damage-digits.png')
if args.digits_only: raise SystemExit(0)
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
