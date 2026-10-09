"""Export only the selected native Azure monster, aligned to its feet."""
import json,subprocess,tempfile,argparse
from pathlib import Path
from PIL import Image
p=argparse.ArgumentParser();p.add_argument('--game',type=Path,required=True);p.add_argument('--cradle',type=Path,required=True);args=p.parse_args()
out=Path(__file__).resolve().parents[1]/'assets/sky/enemies'
with tempfile.TemporaryDirectory(prefix='capel-charger-') as tmp:
 subprocess.run([str(args.cradle),str(args.game/'data/monster/ch60050.itc'),'-o',tmp],check=True)
 files=sorted(Path(tmp).glob('*.png'),key=lambda p:int(p.stem));frames=[Image.open(p).convert('RGBA') for p in files];assert len(frames)==32
 w=max(p.width for p in frames);h=max(p.height for p in frames);atlas=Image.new('RGBA',(w*8,h*4))
 for i,im in enumerate(frames):
  box=im.getbbox();atlas.paste(im,((i%8)*w,(i//8)*h+h-box[3]))
 atlas.save(out/'charger.png')
c=json.loads((out/'catalogue.json').read_text(encoding='utf-8'));c['TowerCharger']={'texture':'enemies/charger.png','columns':8,'rows':4,'frameWidth':w,'frameHeight':h,'frames':32,'idle':[0],'run':[1,2,3],'attack':[1,2,3],'directions':8,'fps':12,'height':1.7,'source':'Azure data/monster/ch60050.itc; native locomotion frames'};c['MishyBoss']={**c['Mishy'],'height':4.8};(out/'catalogue.json').write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
