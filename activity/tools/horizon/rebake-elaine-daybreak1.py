from pathlib import Path
import json
p=Path(__file__).with_name('bake-horizon-vfx.py');s=p.read_text('utf-8');s=s[:s.index('for hero,names in GROUPS.items():')];s=s.replace("GROUPS={'Van':", "GROUPS={'Van':",1)
# Execute only definitions (the existing extract phase uses locally cached textures/models).
s=s.replace("if age<0 or age>=life or i not in renderers", "if 0<=age<life and 'TrailRenderer' in mods[i]:TRAILTRACE.setdefault((name,frame),[]).append((instances.index(inst),i,age,life,matrix.copy()))\n   if age<0 or age>=life or i not in renderers")
s=s.replace("*add,*uv]", "*add,*uv,*curve(renderer['texture'][1].get('uv_info') if len(renderer['texture'])>1 else None,t,[0,0,1,1])]")
# Keep every charge emitter represented: early recursive particle chains must not starve the circular flash.
s=s.replace("if len(instances)>=512 or i in chain:return", "if len(instances)>=512 or i in chain:return\n  if name=='cr5110_20_3' and sum(v['i']==i for v in instances)>=8:return")
s=s.replace("if len(instances)>=512:return", "if len(instances)>=512:return\n    if name=='cr5110_20_3' and sum(v['i']==i for v in instances)>=8:return")
s=s.replace("or len(nodes)>=128", "or (name!='cr5110_20_3' and len(nodes)>=128)")
s=s.replace("  frames.append(nodes)", "  if name=='cr5110_20_3':\n   buckets={}\n   for node in nodes:buckets.setdefault(node[0],[]).append(node)\n   nodes=[bucket[j] for j in range(max(map(len,buckets.values()),default=0)) for bucket in buckets.values() if j<len(bucket)][:128]\n  frames.append(nodes)")
ns={'TRAILTRACE':{},'__file__':str(p)};exec(compile(s,str(p),'exec'),ns);ns['RAW']=Path('E:/dev/sky-activity-tools/daybreak1/vfx/battle');ns['OUT']=Path(__file__).resolve().parents[2]/'assets/sky/effects/horizon/daybreak1'
pack={'tintCurves':True,'fps':30,'format':'horizon-vfx-1','textures':{},'effects':{},'source':'Native Kaleido Fencer .vfx graphs; source curves, models and textures','unsupported':['screen distortion','native shader lighting'],'limits':{'instances':512,'visibleNodes':128,'spawnCount':32}}
for name in ['cr5110_20_'+str(i) for i in [1,2,3]]:
 effect,used=ns['bake'](name);raw=json.loads((ns['RAW']/(name+'.vfx')).read_text('utf-8'))['VFX'];renderers=[(e,m) for e in raw['Emitter'] for m in e['Module'] if m['type'] in ['MeshRenderer','GPUParticleRenderer'] and m.get('texture') and not e['name'].lower().startswith(('scrn','scr_')) and e['name'].lower() not in ['scr','black'] and (ns['OUT']/(m['texture'][0]['filename']+'.png')).exists()]
 for seg,(e,m) in zip(effect['segments'],renderers):
  seg['shader']=m['shader_name'];seg['sourceEmitter']=raw['Emitter'].index(e)
  if name=='cr5110_20_2' and m.get('mesh_name')=='PlaneXY':seg['autoPlaneAxes']=True
  if name=='cr5110_20_3' and m.get('is_billboard') and m.get('mesh_name') in ['Cylinder','HemiCylinder']:
   # Native billboard cylinder is a flat annular wave, not a zero-height cylinder side wall.
   import math
   seg['billboardAxes']='xz';inner=max(0,min(1,m.get('shape_param',{}).get('x',.7)))*.5;faces=[]
   for j in range(32):
    a=j/32*math.tau;b=(j+1)/32*math.tau
    faces.append([[math.sin(t)*radius,0,math.cos(t)*radius,u,w] for t,radius,u,w in [(a,inner,j/32,1),(a,.5,j/32,0),(b,.5,(j+1)/32,0),(b,inner,(j+1)/32,1)]])
   seg['faces']=faces
  if len(m['texture'])>1 and 'alpha' in m['shader_name']:
   seg['maskTexture']=m['texture'][1]['filename'];used.add(seg['maskTexture'])
 histories={}
 for frameIndex,frame in enumerate(effect['frames']):
  for instance,i,age,life,matrix in ns['TRAILTRACE'].get((name,frameIndex),[]):
   import numpy as np
   e=raw['Emitter'][i];m=next(m for m in e['Module'] if m['type']=='TrailRenderer');history=histories.setdefault(instance,[]);history.append(matrix[:3,3].copy());history[:]=history[-m.get('point_count',16):]
   if len(history)<2:continue
   faces=[];width=m.get('width',.1)*.5
   for a,b in zip(history,history[1:]):
    direction=b-a;side=np.cross(direction,np.array([0,0,1.]));length=np.linalg.norm(side)
    if length<1e-8:side=np.cross(direction,np.array([0,1.,0]));length=np.linalg.norm(side)
    if length<1e-8:continue
    side=side/length*width;faces.append([list(a-side)+[0,0],list(a+side)+[0,1],list(b+side)+[1,1],list(b-side)+[1,0]])
   if not faces:continue
   seg={'name':e['name'],'sourceEmitter':i,'texture':m['texture'][0]['filename'],'maskTexture':m['texture'][1]['filename'],'shader':m['shader_name'],'blend':2,'priority':0,'procedural':True,'faces':faces};idx=len(effect['segments']);effect['segments'].append(seg);used.update([seg['texture'],seg['maskTexture']]);t=age/life;uv=ns['curve'](m['texture'][0]['uv_info'],t,[0,0,1,1]);uv2=ns['curve'](m['texture'][1]['uv_info'],t,[0,0,1,1]);color=ns['curve'](m.get('color'),t,[1,1,1,1]);tint=ns['curve'](m.get('specular'),t,[1,1,1,1]);frame.append([idx,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,*color,*tint,*uv,*uv2])
 # Keep source tint curves in the existing additive slots, interpreted as tint by the Horizon renderer.
 for frame in effect['frames']:
  frame[:]=[n for n in frame if effect['segments'][int(n[0])]['shader'] not in ['vfx_distortion','vfx_multi_distortion_alpha']]
 pack['effects'][name]=effect;pack['textures'].update({t:'effects/horizon/'+t+'.png' for t in used});print(name,effect['peakNodes'],flush=True)
import gzip,hashlib
out=ns['OUT'].parent
base=json.loads(gzip.decompress((out/'elaine-native-57d3820fdb.vfxpack').read_bytes()))
for effect in pack['effects'].values():
 for seg in effect['segments']:
  seg['texture']='db1_'+seg['texture']
  if seg.get('maskTexture'):seg['maskTexture']='db1_'+seg['maskTexture']
pack['textures']={'db1_'+t:'effects/horizon/daybreak1/'+Path(path).name for t,path in pack['textures'].items()}
for key,effect in base['effects'].items():
 if key not in pack['effects']:pack['effects'][key]=effect
pack['textures'].update(base['textures']);pack['source']='Daybreak I Kaleido prep and salvo; approved Horizon final slash retained'
for key,effect in pack['effects'].items():
 for i,frame in enumerate(effect['frames']):
  trails=[n for n in frame if effect['segments'][int(n[0])]['name'].startswith('trail_rasen')]
  other=[n for n in frame if not effect['segments'][int(n[0])]['name'].startswith('trail_rasen')]
  effect['frames'][i]=other[:128-len(trails)]+trails
salvo=pack['effects']['cr5110_20_2'];salvo['excludedCinematicBackdrop']=['cylinder_base','cylinder_base_multi']
salvo['frames']=[[n for n in frame if salvo['segments'][int(n[0])]['name'] not in salvo['excludedCinematicBackdrop']] for frame in salvo['frames']]
# Gameplay thrust pass: retain native white/green lances, spiral trails and impact particles,
# separating the very large cinematic speed tunnel from the sword-to-target emission.
import copy
thrust=copy.deepcopy(pack['effects']['cr5110_20_2'])
keep={'giza','Motion_line_white','Motion_line_midori','trail_rasen01','trail_rasen02','trail_rasen03','par_spread'}
thrust['frames']=[[n for n in frame if thrust['segments'][int(n[0])]['name'] in keep] for frame in thrust['frames'][:19]]
for seg in thrust['segments']:
 if seg['name']=='par_spread':seg['procedural']=False;seg['faces']=[[[-.5,-.5,0,0,1],[.5,-.5,0,1,1],[.5,.5,0,1,0],[-.5,.5,0,0,0]]]
# Preserve source hues; balance HDR contribution per layer rather than washing all layers white.
for frame in thrust['frames']:
 for n in frame:
  name=thrust['segments'][int(n[0])]['name'];energy=1.4 if name=='giza' else .1 if name=='glow' else 1 if name=='Motion_line_midori' else .12 if name=='Motion_line_white' else .2
  n[17:20]=[x*energy for x in n[17:20]]
  if name=='giza':n[2]*=.25;n[4]*=.25;n[15]*=.25
  if name=='par_spread':n[1]=1;n[14:17]=[x*.3 for x in n[14:17]]
thrust['sourcePass']='Native Daybreak I white/green thrust and spiral layers; cinematic tunnel excluded'
thrust['webCalibration']='Source hues retained; HDR green lance/core/trail energy balanced against Daybreak reference'
pack['effects']['cr5110_20_2_thrust']=thrust
data=gzip.compress(json.dumps(pack,separators=(',',':')).encode(),mtime=0);h=hashlib.sha256(data).hexdigest()[:10];file='elaine-native-'+h+'.vfxpack';(out/file).write_bytes(data);print(file)
(out/'catalogue.json').write_text(json.dumps({'Elaine':file,'Van':'van.vfxpack','Shizuna':'shizuna.vfxpack'},indent=2),encoding='utf-8')
