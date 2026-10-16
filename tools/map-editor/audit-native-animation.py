import sys,json,tempfile,shutil,contextlib,io
from pathlib import Path
sys.path.insert(0,'activity/tools/vendor')
import x3_parser
base=Path('E:/dev/sky-activity-tools/fc-0a/ED6_DT0A')
files=sorted(base.glob('*._x2'),key=lambda p:(p.stat().st_size,p.name))
with tempfile.TemporaryDirectory() as tmp:
 for src in files:
  if not src.exists():continue
  dest=Path(tmp)/src.name;shutil.copy(src,dest)
  try:
   with contextlib.redirect_stdout(io.StringIO()):x3_parser.read_x_to_gltf(str(dest))
   g=json.loads(Path(str(dest)+'.gltf').read_text())
   active=[]
   for i,n in enumerate(g['nodes']):
    a=n.get('extras',{}).get('nativeAnimation',{})
    if any(any(any(abs(v-r[0][j+1])>.0001 for j,v in enumerate(row[1:])) for row in r) for r in [a.get(k,[]) for k in ['translation','rotation','scale']] if r):active.append(dict(node=i,name=n.get('name'),keys={k:len(a.get(k,[])) for k in ['translation','rotation','scale']},ranges=a.get('ranges')))
   if active:print(src.name,json.dumps(active[:12]),flush=True)
  except Exception as e:print(src.name,str(e)[:80],flush=True)
