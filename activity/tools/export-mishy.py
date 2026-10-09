"""Export only Mishy's forty Azure frames, keeping direction order and planted feet."""
import argparse,json,subprocess,tempfile
from pathlib import Path
from PIL import Image
p=argparse.ArgumentParser();p.add_argument('--chip',default='ch10200');p.add_argument('--character',default='Mishy');p.add_argument('--texture',default='mishy');p.add_argument('--game',type=Path,required=True);p.add_argument('--cradle',type=Path,required=True);args=p.parse_args()
out=Path(__file__).resolve().parents[1]/'assets'/'sky'/'enemies';out.mkdir(exist_ok=True)
with tempfile.TemporaryDirectory(prefix='capel-mishy-') as tmp:
 subprocess.run([str(args.cradle),str(args.game/'data'/'chr'/(args.chip+'.itc')),'-o',tmp],check=True)
 frames=[Image.open(Path(tmp)/f'{i}.png').convert('RGBA') for i in range(40)]
 atlas=Image.new('RGBA',(256*8,241*5))
 for i,im in enumerate(frames):
  box=im.getbbox();aligned=Image.new('RGBA',(256,241));aligned.paste(im,(0,241-box[3]));atlas.paste(aligned,((i%8)*256,(i//8)*241))
 atlas.save(out/(args.texture+'.png'))
meta={args.character:{'texture':'enemies/'+args.texture+'.png','columns':8,'rows':5,'frameWidth':256,'frameHeight':241,'frames':40,'idle':[0],'run':[1,2,3,4],'attack':[1,2,3,4],'directions':8,'fps':8,'height':1.6,'source':'Azure data/chr/'+args.chip+'.itc; original locomotion frames reused for attacks'}}
existing=json.loads((out/'catalogue.json').read_text(encoding='utf-8')) if (out/'catalogue.json').exists() else {};existing.update(meta)
meta=existing
(out/'catalogue.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Mishy: 40 native frames, 8 directions; only one PNG is published.')
