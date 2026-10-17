import sys,json,ast
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent))
from export_sky_assets import decode_sprite,Image
root=Path(__file__).resolve().parents[1]/'assets/sky';src=Path('E:/dev/sky-activity-tools/fc-07/ED6_DT07')
cat=json.loads((root/'combat/catalogue.json').read_text(encoding='utf8'));c=cat['Carna'];decoded={}
sys.path.insert(0,'E:/dev/Website/toolchain');import third_as as decoder
tree=ast.parse((Path(__file__).parent/'export-combat-catalogue.py').read_text(encoding='utf8'))
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='sequence'],type_ignores=[]),'<sequence>','exec'))
data=Path('E:/dev/sky-activity-tools/third-30/ED6_DT30/as00400._dt').read_bytes();_,end,entries=decoder.craft_table(data)
firing=sequence(data,entries,end,22,set(range(7)))
print('AS22',firing)
for bank,ch in [(12,'ch00400'),(13,'ch00402')]:
 frames=decode_sprite((src/(ch+'._ch')).read_bytes(),(src/(ch+'p._cp')).read_bytes());decoded[bank]=frames
 image=Image.new('RGBA',(256*8,256*((len(frames)+7)//8)))
 for i,f in enumerate(frames):image.paste(f,((i%8)*256,(i//8)*256))
 folder=root/'combat/carna';folder.mkdir(exist_ok=True);image.save(folder/(str(bank)+'.png'))
 c['banks'][str(bank)]={**c['banks']['0'],'texture':f'combat/carna/{bank}.png','frameWidth':256,'frameHeight':256,'height':5.12,'centerX':0,'centerY':.96,'columns':8,'rows':(len(frames)+7)//8,'frames':len(frames),'run':list(range(len(frames)//8))}
contact=Image.new('RGBA',(256*8,256*2))
for row,(bank,frames) in enumerate(decoded.items()):
 for pose in range(min(8,len(frames)//8)):contact.paste(frames[pose*8+5],(pose*256,row*256))
contact.save('E:/dev/sky-activity-tools/carna-contact.png')
c['sequences']['carnaFire']=firing or c['sequences']['basic']
c['sequences']['carnaCraft']=c['sequences']['carnaFire']
c['sequences']['carnaReload']=[{'bank':13,'pose':i,'ms':150} for i in range(len(decoded[13])//8)]
c['actions']['basic']={'key':'f'};c['actions']['craft']={'key':'g'}
(root/'combat/catalogue.json').write_text(json.dumps(cat,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf8')

decoded[13][2*8+4].crop((85,85,195,180)).resize((660,570)).save('E:/dev/sky-activity-tools/carna-gun-source.png')
from PIL import ImageDraw
frame=decoded[13][2*8+4];mask=Image.new('L',frame.size);draw=ImageDraw.Draw(mask)
draw.polygon([(111,129),(126,124),(136,122),(151,119),(152,124),(139,130),(135,137),(129,145),(124,144),(125,135),(113,136)],fill=255)
gun=Image.new('RGBA',frame.size);gun.paste(frame,(0,0),mask);gun=gun.crop((111,118,153,147)).resize((40,30),Image.Resampling.NEAREST)
sheet=Image.new('RGBA',(120,30))
for i in range(3):sheet.paste(gun,(i*40,0))
sheet.save(root/'combat/carna-gun.png')
