"""Add selected Azure ITC sprite banks to the local catalogue (no public assets)."""
import argparse,json,subprocess
from pathlib import Path
from PIL import Image
p=argparse.ArgumentParser()
p.add_argument('--game',type=Path,default=Path('C:/GOG Games/The Legend of Heroes Trails to Azure'))
p.add_argument('--cradle',type=Path,default=Path('E:/dev/sky-activity-tools/cradle-images.exe'))
p.add_argument('--output',type=Path,default=Path('E:/dev/sky-activity-tools/atelier-combat'))
a=p.parse_args()
banks={}
for chip in ['ch03600']+[f'ch0365{i}' for i in range(5)]:
 source=a.game/'data/chr'/(chip+'.itc')
 folder=a.output/'azure-source'/chip;folder.mkdir(parents=True,exist_ok=True)
 subprocess.run([str(a.cradle),str(source),'-o',str(folder)],check=True)
 metadata=json.loads((folder/'cradle.itc.json').read_text())
 frames={f['frame']:Image.open(folder/f['path']).convert('RGBA') for f in metadata['frames']}
 w=max(im.width for im in frames.values());h=max(im.height for im in frames.values());count=max(frames)+1
 atlas=Image.new('RGBA',(w*8,h*((count+7)//8)))
 for n,im in frames.items():atlas.paste(im,((n%8)*w+(w-im.width)//2,(n//8)*h+(h-im.height)//2))
 target=a.output/'sprites/azure-campanella'/(chip+'.png');target.parent.mkdir(parents=True,exist_ok=True);atlas.save(target,optimize=True)
 banks[chip]={'texture':'/cache/'+target.relative_to(a.output).as_posix(),'columns':8,'rows':(count+7)//8,'frameWidth':w,'frameHeight':h,'frames':count,'frameIndices':sorted(frames),'directions':8,'source':chip+'.itc'}
 print(chip,len(frames),'frames')
file=a.output/'catalogue.json';catalogue=json.loads(file.read_text(encoding='utf-8'))
character={'source':'data/chr/ch03600.itc, ch03650–ch03654.itc','game':'Azure','banks':banks,'routines':{},'configured':None}
catalogue.setdefault('localCharacters',{})['Campanella (Azure)']=character
catalogue['characters']['Campanella (Azure)']=character
file.write_text(json.dumps(catalogue,ensure_ascii=False),encoding='utf-8')
