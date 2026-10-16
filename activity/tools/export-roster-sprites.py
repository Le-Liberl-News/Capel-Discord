"""Complete chat-roster sprites from installed Sky archives (read-only sources)."""
import json,sys,struct
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
def main():
 helper=ROOT/'tools/cutscene-editor/library-import.py'
 saved=sys.argv;sys.argv=['library','Third','none'];ns={'__file__':str(helper)}
 exec(helper.read_text().split('if len(sys.argv)==1:')[0],ns);sys.argv=saved
 from export_sky_assets import decode_sprite,Image,ImageDraw
 entries={
 'Aina':('ch02560','t0700'), 'Jean':('ch02400','SC'),
 'Chancelier Osborne':('ch03950','t4105'), 'Theresa':('ch02570','t2410'),
 'Mme Mao':('ch02430','t3221'), 'Dalmore':('ch02410','SC'),
 'Ambassadrice Elsa':('ch03720','t3221'), 'Ambassadeur Davil':('ch03710','t4138'),
 'Lucy':('ch02690','t2510'), 'Leo':('ch02680','t2510'),
 'Ein Selnate':('ch20744','e1210'), 'Rufina Argent':('ch03940','m5415'),
 'Dan Russell':('ch03980','t3121'),
 'Celeste von Auslese':('ch02890','u4205'),
 'Directeur Murdock':('ch02620','t3130'), 'Chef-mécanicien Gustav':('ch02440','t3102')}
 out=ROOT/'activity/assets/sky';cat=json.loads((out/'characters.json').read_text(encoding='utf8'))
 mapping=json.loads((ROOT/'activity/tools/character-map.json').read_text(encoding='utf8'));audit=[];tiles=[]
 for name,(chip,scene) in entries.items():
  frames=decode_sprite(ns['read']('Third',chip+'._ch'),ns['read']('Third',chip+'p._cp'))
  boxes=[f.getbbox() for f in frames if f.getbbox()];box=(min(b[0] for b in boxes),min(b[1] for b in boxes),max(b[2] for b in boxes),max(b[3] for b in boxes));w,h=box[2]-box[0],box[3]-box[1]
  if name=='Ein Selnate':
   # This cutscene bank has sequential acting frames, not eight facing directions.
   frames=[frames[18]];box=frames[0].getbbox();w,h=box[2]-box[0],box[3]-box[1]
  directions=8 if len(frames)>=8 else 1;rows=(len(frames)+7)//8;atlas=Image.new('RGBA',(w*8,h*rows))
  for i,f in enumerate(frames):atlas.paste(f.crop(box),((i%8)*w,(i//8)*h))
  file='roster-'+chip+'.png';atlas.save(out/file)
  cat[name]={'texture':file,'columns':8,'rows':rows,'frameWidth':w,'frameHeight':h,'frames':len(frames),'idle':[0],'run':list(range(min(8,len(frames)//directions))),'directions':directions,'fps':8,'height':h*.02,'pixelScale':.02,'bodyHeight':h*.02,'centerX':(box[0]+w/2-128)*.02,'source':{'game':'Third','chip':chip,'scene':scene}}
  mapping[name]=chip;audit.append({'character':name,'game':'Third','chip':chip,'scene':scene,'frames':len(frames)})
  im=frames[0].crop(frames[0].getbbox());im.thumbnail((110,140));tiles.append((name,im));print(name,chip,len(frames),flush=True)
 # Sun Door 4 renders these people as original transparent illustrations only.
 # Keep their actual identity; do not pretend there are eight native walk directions.
 for name,source in [('Halle','c_vis550'),('Jack','c_vis560')]:
  data=ns['read']('Third',source+'._ch')
  rgba=bytes(c for v in struct.unpack('<393216H',data) for c in (((v>>10)&31)*255//31,((v>>5)&31)*255//31,(v&31)*255//31,255 if v&32768 else 0))
  im=Image.frombytes('RGBA',(768,512),rgba);im=im.crop(im.getbbox());im=im.resize((round(im.width*86/im.height),86),Image.Resampling.LANCZOS)
  file='roster-'+source+'.png';im.save(out/file);w,h=im.size
  cat[name]={'texture':file,'columns':1,'rows':1,'frameWidth':w,'frameHeight':h,'frames':1,'idle':[0],'run':[0],'directions':1,'fps':1,'height':h*.02,'pixelScale':.02,'bodyHeight':h*.02,'source':{'game':'Third','chip':source,'scene':'e1000','kind':'illustration','limitedAnimation':True}}
  audit.append({'character':name,**cat[name]['source'],'frames':1});tiles.append((name,im))
 (out/'characters.json').write_text(json.dumps(cat,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 (ROOT/'activity/tools/character-map.json').write_text(json.dumps(mapping,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 (out/'roster-sources.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 sheet=Image.new('RGB',(750,((len(tiles)+4)//5)*180),'#303840');d=ImageDraw.Draw(sheet)
 for i,(name,im) in enumerate(tiles):
  x=i%5*150;y=i//5*180;sheet.paste(im,(x+(150-im.width)//2,y+30),im);d.text((x+2,y+4),name,fill='white')
 sheet.save('E:/dev/sky-activity-tools/roster-added.png')
if __name__=='__main__':main()
