"""Decode one chosen Azure sprite; installed games stay read-only."""
import json,sys,subprocess
from pathlib import Path
from PIL import Image
base=Path('C:/GOG Games/The Legend of Heroes Trails to Azure/data')
cache=Path('E:/dev/sky-activity-tools/atelier-combat')
_,folder,name=sys.argv[1].split('/')
if folder not in ['chr','monster'] or Path(name).name!=name or not name.endswith('.itc'):raise ValueError('Sprite invalide')
source=base/folder/name
out=cache/'scene-sprites'/'Azure'/folder/name
out.mkdir(parents=True,exist_ok=True)
infofile=out/'sprite.json'
if not infofile.exists():
 subprocess.run(['E:/dev/sky-activity-tools/cradle-images.exe',str(source),'-o',str(out)],check=True,capture_output=True)
 metadata=json.loads((out/'cradle.itc.json').read_text(encoding='utf-8'))
 frames=[]
 for f in sorted(metadata['frames'],key=lambda f:f['frame']):
  image=Image.open(out/f['path']).convert('RGBA')
  if image.getbbox():frames.append(image)
 box=(min(i.getbbox()[0] for i in frames),min(i.getbbox()[1] for i in frames),max(i.getbbox()[2] for i in frames),max(i.getbbox()[3] for i in frames));w,h=box[2]-box[0],box[3]-box[1];rows=(len(frames)+7)//8
 atlas=Image.new('RGBA',(w*8,h*rows))
 for j,i in enumerate(frames):atlas.paste(i.crop(box),((j%8)*w,(j//8)*h))
 atlas.save(out/'atlas.png')
 info={'texture':'/cache/'+(out/'atlas.png').relative_to(cache).as_posix(),'frameWidth':w,'frameHeight':h,'columns':8,'rows':rows,'frameCount':len(frames)}
 infofile.write_text(json.dumps(info),encoding='utf-8')
print(infofile.read_text(encoding='utf-8'))
