"""Sample native .vfx emitter graphs into the shared batched effect format. No AI assets."""
import sys,os
sys.path.insert(0,os.environ.get("SPRITE_WORKSHOP","E:/dev/sky-activity-tools/atelier-sprites"))
import kai_import as k,json,math,random,subprocess,sys,io,struct
from pathlib import Path
from PIL import Image
import numpy as np
OUT=Path(__file__).resolve().parents[2]/'assets/sky/effects/horizon';OUT.mkdir(parents=True,exist_ok=True)
GROUPS={'Van':['cr0000_30_2','cr0000_30_3','cr0000_30_4','cr0000_30_5'],'Elaine':['cr5110_20_'+str(i) for i in [1,2,3,4,5,7]],'Shizuna':['sc5117_00_'+str(i).zfill(2) for i in [2,4,8,9,11,13,14,16]]}
RAW=k.KAI/'vfx-raw/vfx/battle';textures=set();models=set()
for name in sum(GROUPS.values(),[]):
 d=json.loads((RAW/(name+'.vfx')).read_text('utf-8'))['VFX']
 for e in d['Emitter']:
  for m in e['Module']:
   if 'Renderer' in m['type']:
    textures.update(t['filename'] for t in m.get('texture',[]) if t['filename']);models.update([m['model_name']] if m.get('model_name') else [])
for path,data in k.extract('asset_image.p3a',{'asset/dx11/image/'+n+'.dds' for n in textures if not (OUT/(n+'.png')).exists()}):
 Image.open(io.BytesIO(data)).save(OUT/(Path(path).stem+'.png'))
for path,data in k.extract('asset_common_model.p3a',{'asset/common/model/'+n+'.mdl' for n in models if not (k.GLTF/(n+'.glb')).exists()}):(k.GLTF/Path(path).name).write_bytes(data)
for name in models:
 if not (k.GLTF/(name+'.glb')).exists():subprocess.run([sys.executable,str(k.TOOL),'-o',str(k.GLTF/(name+'.mdl'))],check=True,capture_output=True)

def curve(track,t,default):
 keys=track.get('Keys',[]) if track else []
 if not keys:return np.array(default,dtype=float)
 if t<=keys[0]['time']:return np.array(keys[0]['value'],dtype=float)
 for a,b in zip(keys,keys[1:]):
  if t<=b['time']:
   x=(t-a['time'])/(b['time']-a['time'] or 1)
   if a.get('interp')==5:x=x*x*(3-2*x)
   return np.array(a['value'])*(1-x)+np.array(b['value'])*x
 return np.array(keys[-1]['value'],dtype=float)
def vec(d):return np.array([d.get(a,0) for a in 'xyz'],dtype=float)
def rotation(v):
 x,y,z=np.radians(v);cx,sx=math.cos(x),math.sin(x);cy,sy=math.cos(y),math.sin(y);cz,sz=math.cos(z),math.sin(z)
 return np.array([[cz,-sz,0],[sz,cz,0],[0,0,1]])@np.array([[cy,0,sy],[0,1,0],[-sy,0,cy]])@np.array([[1,0,0],[0,cx,-sx],[0,sx,cx]])
def model_faces(name):
 b=(k.GLTF/(name+'.glb')).read_bytes();n=struct.unpack_from('<I',b,12)[0];d=json.loads(b[20:20+n]);binary=b[28+n:]
 def access(i):
  a=d['accessors'][i];v=d['bufferViews'][a['bufferView']];cols={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']];dt={5126:'<f4',5123:'<u2',5125:'<u4',5121:'u1'}[a['componentType']];size=np.dtype(dt).itemsize;start=v.get('byteOffset',0)+a.get('byteOffset',0);stride=v.get('byteStride',cols*size)
  return np.array([np.frombuffer(binary,dtype=dt,count=cols,offset=start+j*stride) for j in range(a['count'])])
 faces=[]
 for mesh in d['meshes']:
  for prim in mesh['primitives']:
   pos=access(prim['attributes']['POSITION']);uv=access(prim['attributes']['TEXCOORD_0']) if 'TEXCOORD_0' in prim['attributes'] else np.zeros((len(pos),2));ids=access(prim['indices']).ravel() if 'indices' in prim else np.arange(len(pos))
   for i in range(0,len(ids)-2,3):faces.append([list(map(float,pos[j]))+[float(uv[j,0]),float(1-uv[j,1])] for j in ids[i:i+3]])
 return faces
GEOMETRY={}
def geometry(m):
 shape=m.get('mesh_name','PlaneXY');key=(shape,m.get('model_name',''))
 if key in GEOMETRY:return GEOMETRY[key]
 def v(x,y,z,u,w):return [x,y,z,u,w]
 faces=[]
 if shape=='Model':faces=model_faces(m['model_name'])
 elif shape in ['PlaneXY','PlaneXZ']:
  faces=[[v(-.5,-.5,0,0,1),v(.5,-.5,0,1,1),v(.5,.5,0,1,0),v(-.5,.5,0,0,0)]]
  if shape=='PlaneXZ':faces=[[[a[0],0,a[1],a[3],a[4]] for a in f] for f in faces]
 elif shape in ['Cylinder','HemiCylinder']:
  angle=math.pi if shape=='HemiCylinder' else math.pi*2
  for i in range(20):
   a=i/20*angle;b=(i+1)/20*angle;faces.append([v(math.sin(a)*.5,-.5,math.cos(a)*.5,i/20,1),v(math.sin(b)*.5,-.5,math.cos(b)*.5,(i+1)/20,1),v(math.sin(b)*.5,.5,math.cos(b)*.5,(i+1)/20,0),v(math.sin(a)*.5,.5,math.cos(a)*.5,i/20,0)])
 else:
  for j in range(8):
   for i in range(16):
    face=[]
    for u,w in [(i/16,j/8),((i+1)/16,j/8),((i+1)/16,(j+1)/8),(i/16,(j+1)/8)]:
     a=u*math.pi*2;b=w*math.pi*(.5 if shape=='HemiSphere' else 1);face.append(v(math.sin(a)*math.sin(b)*.5,math.cos(b)*.5,math.cos(a)*math.sin(b)*.5,u,w))
    faces.append(face)
 GEOMETRY[key]=faces;return faces

def bake(name):
 d=json.loads((RAW/(name+'.vfx')).read_text('utf-8'))['VFX'];emitters=d['Emitter'];mods=[{m['type']:m for m in e['Module']} for e in emitters];events=[[m for m in e['Module'] if m['type']=='Event' and 0<=m['target_emitter']<len(emitters)] for e in emitters];children={m['target_emitter'] for es in events for m in es};segments=[];renderers={};used=set();rng=random.Random(name)
 for i,e in enumerate(emitters):
  renderer=next((m for m in e['Module'] if m['type'] in ['MeshRenderer','GPUParticleRenderer']),None)
  if not renderer or not renderer.get('texture') or e['name'].lower().startswith(('scrn','scr_')) or e['name'].lower() in ['scr','black']:continue
  tex=renderer['texture'][0]['filename']
  if not (OUT/(tex+'.png')).exists():continue
  seg={'name':e['name'],'texture':tex,'blend':2 if renderer['blend_mode']==2 else 1,'priority':min(8,max(-8,renderer.get('prio_offset',0))),'procedural':not renderer.get('is_billboard',False),'faces':geometry(renderer)};renderers[i]=(len(segments),renderer);segments.append(seg);used.add(tex)
 instances=[]
 def spawn(i,birth,parent=-1,chain=()):
  if len(instances)>=512 or i in chain:return
  e=emitters[i];sp=mods[i].get('Spawn',{});delay=rng.uniform(e.get('spawn_delay_min',0),e.get('spawn_delay_max',0));count=min(32,max(1,sp.get('count',1)));interval=sp.get('interval',0);duration=min(4.2,e.get('duration',1));times=[0]
  if interval>.001 and (interval<duration or sp.get('is_loop')):times=[j*interval for j in range(min(32,math.ceil(duration/interval)))]
  for start in times:
   for j in range(count):
    if len(instances)>=512:return
    at=birth+delay+start
    if at>4.2:return
    life=max(.02,rng.uniform(sp.get('min_time',1),sp.get('max_time',1)));ani=mods[i].get('Animation',{});randoms={key:vec(ani.get(key+'_random',{}))*np.array([rng.uniform(-1,1) for _ in range(3)]) for key in ['position','rotation','scale','orbit_rotation']}
    pos=mods[i].get('Position',{});shape=vec(pos.get('shape_param',{}));offset=vec(pos.get('offset',{}));offset+=shape*np.array([rng.uniform(-.5,.5) for _ in range(3)])
    vel=mods[i].get('Velocity',{});speed=rng.uniform(vel.get('min_speed',0),vel.get('max_speed',0));direction=np.array([rng.uniform(-1,1) for _ in range(3)]);direction/=max(.001,np.linalg.norm(direction));idx=len(instances);instances.append({'i':i,'birth':at,'life':life,'parent':parent,'random':randoms,'offset':offset,'velocity':direction*speed,'gravity':vel.get('gravity',0),'noise':rng.uniform(0,math.pi*2)})
    for event in events[i]:spawn(event['target_emitter'],at,idx,chain+(i,))
 for i in range(len(emitters)):
  if i not in children:spawn(i,0)
 frames=[]
 for frame in range(127):
  time=frame/30;matrices=[];nodes=[]
  for inst in instances:
   i=inst['i'];age=time-inst['birth'];life=inst['life'];t=max(0,min(1,age/life));ani=mods[i].get('Animation',{});r=inst['random'];position=curve(ani.get('position'),t,[0,0,0])+r['position']+inst['offset']+inst['velocity']*max(0,age);position[1]-=.5*inst['gravity']*max(0,age)**2
   angles=curve(ani.get('rotation'),t,[0,0,0])+r['rotation'];scale=curve(ani.get('scale'),t,[1,1,1])+r['scale'];matrix=np.eye(4);matrix[:3,:3]=rotation(angles)@np.diag(scale);matrix[:3,3]=position
   if inst['parent']>=0:matrix=matrices[inst['parent']]@matrix
   matrices.append(matrix)
   if age<0 or age>=life or i not in renderers or len(nodes)>=128:continue
   seg,renderer=renderers[i];color=curve(renderer.get('color'),t,[1,1,1,1]);add=curve(renderer.get('specular'),t,[0,0,0,0]);uv=curve(renderer['texture'][0].get('uv_info'),t,[0,0,1,1]);axes=matrix[:3,:3];scales=np.linalg.norm(axes,axis=0);axes=axes/np.maximum(scales,1e-8)
   node=[seg,int(renderer.get('is_billboard',False)),*matrix[:3,3],*axes[:,0],*axes[:,1],*axes[:,2],*scales,*color,*add,*uv];nodes.append([round(float(v),4) for v in node])
  frames.append(nodes)
 while frames and not frames[-1]:frames.pop()
 return {'segments':segments,'frames':frames,'source':'vfx/battle/'+name+'.vfx','instanceCount':len(instances),'peakNodes':max(map(len,frames),default=0)},used

for hero,names in GROUPS.items():
 pack={'fps':30,'textures':{},'effects':{},'source':'native Horizon .vfx emitter graphs; sampled transforms, curves and source textures','unsupported':['screen distortion','dynamic lighting','trail history'],'limits':{'instances':512,'visibleNodes':128,'spawnCount':32}}
 for name in names:
  effect,used=bake(name);pack['effects'][name]=effect;pack['textures'].update({t:'effects/horizon/'+t+'.png' for t in used});print(name,len(effect['segments']),effect['peakNodes'],flush=True)
 data=json.dumps(pack,separators=(',',':'));(OUT/(hero.lower()+'.json')).write_text(data,encoding='utf-8');print(hero,len(data),flush=True)
