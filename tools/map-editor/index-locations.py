"""Read scenario headers and native place tables; write only a small local index."""
import json,struct,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT.parent/'Website/tools'))
from ed6_decompress import decompress
GAMES={'FC':Path('C:/Program Files (x86)/Steam/steamapps/common/Trails in the Sky FC'),'SC':Path('C:/Program Files (x86)/Steam/steamapps/common/Trails in the Sky SC'),'Third':Path('C:/GOG Games/Trails in the Sky the 3rd')}
def entries(game):
 for p in game.glob('ED6_DT*.dir'):
  b=p.read_bytes()
  for i in range(struct.unpack_from('<I',b,8)[0]):
   o=16+i*36;raw=b[o:o+12].decode('ascii','replace');name=(raw[:8].rstrip()+raw[8:].rstrip('\0 ')).lower();size=struct.unpack_from('<I',b,o+16)[0];offset=struct.unpack_from('<I',b,o+32)[0]
   if size and (name.endswith('._sn') or name=='t_town._dt'):yield name,p.with_suffix('.dat'),offset,size

def read(e):
 _,p,offset,size=e
 with p.open('rb') as f:f.seek(offset);b=f.read(size)
 try:return decompress(b)
 except Exception:return b

def cstring(b,o):return b[o:b.index(0,o)].decode('cp932','replace')
def build():
 result={}
 for game,folder in GAMES.items():
  if not folder.exists():continue
  es=list(entries(folder));town=next((read(e) for e in es if e[0]=='t_town._dt'),None)
  if town is None:continue
  count=struct.unpack_from('<H',town)[0];names=[cstring(town,struct.unpack_from('<H',town,2+i*2)[0]) for i in range(count)]
  for e in es:
   if not e[0].endswith('._sn'):continue
   b=read(e)
   if len(b)<26:continue
   source=b[10:20].split(b'\0')[0].decode('ascii','replace').lower();town_id=struct.unpack_from('<H',b,24)[0]
   if not source.endswith('.x') or town_id>=len(names) or not names[town_id]:continue
   if e[0].split('._sn')[0].split('_')[0]!=source[:-2]:continue
   key=game+'/'+source[:-2];region=cstring(b,0);name=(region+' · lieu précis non renseigné') if town_id==1 else (region+' — '+names[town_id] if region and region.lower() not in names[town_id].lower() else names[town_id]);entry=result.setdefault(key,{'names':[],'sources':[]})
   if name not in entry['names']:entry['names'].append(name)
   if e[0] not in entry['sources']:entry['sources'].append(e[0])
 azure=Path('C:/GOG Games/The Legend of Heroes Trails to Azure/data')
 if (azure/'text/t_town._dt').exists():
  b=(azure/'text/t_town._dt').read_bytes();count=struct.unpack_from('<H',b)[0];names=[cstring(b,struct.unpack_from('<H',b,2+i*2)[0]) for i in range(count)]
  for p in (azure/'scena').glob('*.bin'):
   b=p.read_bytes()
   if len(b)<24:continue
   source=b[10:20].split(b'\0')[0].decode('ascii','replace').lower();town_id=struct.unpack_from('<H',b,20)[0]
   if p.stem.split('_')[0]!=source or not (azure/'map'/source/(source+'.it3')).exists() or town_id>=len(names) or not names[town_id].strip():continue
   entry=result.setdefault('Azure/'+source,{'names':[],'sources':[]})
   if names[town_id] not in entry['names']:entry['names'].append(names[town_id])
   entry['sources'].append(p.name)
 out=ROOT.parent/'sky-activity-tools/map-editor/locations.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False),encoding='utf-8');print(json.dumps({'file':str(out),'models':len(result)}))
if __name__=='__main__':build()

