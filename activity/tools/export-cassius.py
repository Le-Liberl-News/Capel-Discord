"""Export Cassius's native Phoenix bank without changing his body anchor."""
import json,hashlib,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent))
from export_sky_assets import decode_sprite,Image
root=Path(__file__).resolve().parents[1]/'assets/sky/combat'
source=Path('E:/dev/sky-activity-tools/third-27/ED6_DT27')
frames=decode_sprite((source/'ch04679._ch').read_bytes(),(source/'ch04679p._cp').read_bytes())
body=decode_sprite((source/'ch04670._ch').read_bytes(),(source/'ch04670p._cp').read_bytes());boxes=[f.getbbox() for f in body if f.getbbox()];foot=max(b[3] for b in boxes);scale=1.7/(foot-min(b[1] for b in boxes))
atlas=Image.new('RGBA',(256*8,256*((len(frames)+7)//8)))
for i,f in enumerate(frames):atlas.paste(f,((i%8)*256,(i//8)*256))
atlas.save(root/'cassius-phoenix.png',optimize=True)
p=root/'catalogue.json';data=json.loads(p.read_text(encoding='utf8'));c=data['Cassius'];c['banks']['12']={'texture':'combat/cassius-phoenix.png','columns':8,'rows':(len(frames)+7)//8,'frameWidth':256,'frameHeight':256,'frames':len(frames),'directions':1,'height':256*scale,'centerX':0,'centerY':(foot-128)*scale,'idle':[0],'run':[0],'fps':12}
c['sequences']['craft']=[{'bank':12,'pose':i,'ms':100} for i in range(22,47)];c['source']['phoenixBank']={'file':'ch04679._ch','sha256':hashlib.sha256((source/'ch04679._ch').read_bytes()).hexdigest()}
p.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf8');print('Cassius:',len(frames),'native frames, foot',foot,'scale',scale)
proof=Image.new('RGBA',(256*5,256*2),(30,35,42,255))
for n,i in enumerate([22,26,30,32,34,35,38,40,41,46]):proof.alpha_composite(frames[i],((n%5)*256,(n//5)*256))
proof.save(Path.home()/'.codex/sky-effect-work/cassius-poses.png')
