from pathlib import Path
import json
p=Path(__file__).with_name('bake-horizon-vfx.py');s=p.read_text('utf-8');s=s[:s.index('for hero,names in GROUPS.items():')];s=s.replace("GROUPS={'Van':", "GROUPS={'Van':",1)
# Execute only definitions (the existing extract phase uses locally cached textures/models).
s=s.replace("if age<0 or age>=life or i not in renderers", "if 0<=age<life and 'TrailRenderer' in mods[i]:TRAILTRACE.setdefault((name,frame),[]).append((instances.index(inst),i,age,life,matrix.copy()))\n   if age<0 or age>=life or i not in renderers")
s=s.replace("*add,*uv]", "*add,*uv,*curve(renderer['texture'][1].get('uv_info') if len(renderer['texture'])>1 else None,t,[0,0,1,1])]")
ns={'TRAILTRACE':{}};exec(compile(s,str(p),'exec'),ns)
pack={'tintCurves':True,'fps':30,'format':'horizon-vfx-1','textures':{},'effects':{},'source':'Native Kaleido Fencer .vfx graphs; source curves, models and textures','unsupported':['screen distortion','native shader lighting'],'limits':{'instances':512,'visibleNodes':128,'spawnCount':32}}
for name in ['cr5110_20_'+str(i) for i in [1,2,3,4,5,6,7]]:
 effect,used=ns['bake'](name);raw=json.loads((ns['RAW']/(name+'.vfx')).read_text('utf-8'))['VFX'];renderers=[(e,m) for e in raw['Emitter'] for m in e['Module'] if m['type'] in ['MeshRenderer','GPUParticleRenderer'] and m.get('texture') and not e['name'].lower().startswith(('scrn','scr_')) and e['name'].lower() not in ['scr','black'] and (ns['OUT']/(m['texture'][0]['filename']+'.png')).exists()]
 for seg,(e,m) in zip(effect['segments'],renderers):
  seg['shader']=m['shader_name'];seg['sourceEmitter']=raw['Emitter'].index(e)
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
out=ns['OUT'];data=gzip.compress(json.dumps(pack,separators=(',',':')).encode(),mtime=0);h=hashlib.sha256(data).hexdigest()[:10];file='elaine-native-'+h+'.vfxpack';(out/file).write_bytes(data);print(file)
(out/'catalogue.json').write_text(json.dumps({'Elaine':file,'Van':'van.vfxpack','Shizuna':'shizuna.vfxpack'},indent=2),encoding='utf-8')
