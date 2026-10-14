"""Export only two native six-face sky sets from the installed SC archives (read only)."""
import json,sys
from pathlib import Path
from export_sky_assets import archive_entries,decode_model_texture
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT.parents[1]/'Website/tools'))
from ed6_decompress import decompress
GAME=Path('C:/Program Files (x86)/Steam/steamapps/common/Trails in the Sky SC')
# Native cube faces: right, left, up, down, front, back.
FACES='rludfb'
SETS={'arena':1,'axis':3}
wanted={f'sky0{face}{variant}._ds' for variant in SETS.values() for face in FACES}
found={}
for entry,(name,data,offset,packed,_) in enumerate(archive_entries(GAME,'ED6_DT35')):
 if name not in wanted:continue
 data.seek(offset);raw=data.read(packed)
 try:raw=decompress(raw)
 except Exception:pass
 found[name]=(decode_model_texture(raw),entry)
assert set(found)==wanted,'Native sky faces missing'
for venue,variant in SETS.items():
 folder=ROOT/'assets/sky'/venue;folder.mkdir(exist_ok=True)
 sources=[];faces=[]
 for face in FACES:
  name=f'sky0{face}{variant}._ds';im,entry=found[name];filename=f'sky-{face}.png';im.save(folder/filename,optimize=True);faces.append(filename);sources.append({'file':name,'archive':'ED6_DT35','entry':entry})
 manifest={'game':'Trails in the Sky SC','faces':faces,'sources':sources,'variant':variant,'association':'Native daylight sky' if venue=='arena' else 'Elevated cloud-sea variant; exact c5313 variant number not explicitly specified by its scenario script. Native c5313 cloud layers E00O0006/E00O0106/E00O0206 remain in the map.'}
 (folder/'skybox.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print(venue,'native sky variant',variant,'6 faces')
