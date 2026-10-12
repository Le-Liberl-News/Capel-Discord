"""Read native X3 skeletal weights and frame animation tracks (version 2)."""
import struct
from pathlib import Path

def read_animation(path):
 f=Path(path).open('rb');nodes=[];skins=[]
 def read(fmt):return struct.unpack('<'+fmt,f.read(struct.calcsize('<'+fmt)))
 def name(n):return f.read(n).split(b'\0',1)[0].decode('ascii')
 def frame(parent):
  node={'name':name(260),'matrix':list(read('16f')),'parent':parent};index=len(nodes);nodes.append(node)
  textures=read('H')[0];f.read(textures*852);meshes=read('H')[0]
  for _ in range(meshes):
   meshname=name(256);f.read(4);stride,refs=read('II');f.read(refs*120);count=read('I')[0];raw=f.read(count*stride);faces=read('I')[0];f.read(faces*2)
   skin=None
   if stride==48:
    f.read(8);bones=read('I')[0];inverses=[list(read('16f')) for _ in range(bones)];names=[name(256) for _ in range(bones)]
    weights=[struct.unpack_from('<f',raw,i*stride+12)[0] for i in range(count)];joints=[struct.unpack_from('<I',raw,i*stride+16)[0] for i in range(count)]
    packed=[struct.unpack_from('<I',raw,i*stride+36)[0] for i in range(count)];skin={'packedWeights':packed,'name':meshname,'weights':weights,'joints':joints,'bones':names,'inverseBind':inverses};skins.append(skin)
   f.read(40);extra=read('I')[0];f.read(extra*104)
  f.read(1);node['ranges']=list(read('6I'));f.read(8)
  for kind,size in [('translation',3),('rotation',4),('scale',3)]:
   count=read('I')[0];node[kind]=[{'frame':read('I')[0],'value':list(read(str(size)+'f'))} for _ in range(count)]
  assert read('I')[0]==0
  for _ in range(read('H')[0]):frame(index)
 kind,version=read('BB');assert version==2;(read('11f'))
 for _ in range(read('H')[0]):frame(-1)
 f.close();return {'nodes':nodes,'skins':skins}

if __name__=='__main__':
 import json,sys
 d=read_animation(sys.argv[1]);print('nodes',len(d['nodes']),'skins',len(d['skins']))
 for s in d['skins']:print(s['name'],'weights',sorted(set(s['weights']))[:10],'joints',min(s['joints']),max(s['joints']),'bones',len(s['bones']))
 for n in d['nodes']:
  if n['rotation']:print(n['name'],n['ranges'],'first',n['rotation'][:2],'last',n['rotation'][-1]);break
 Path(sys.argv[2]).write_text(json.dumps(d),encoding='utf8')

def export_rig(path):
 d=read_animation(path);assert len(d['skins'])==1
 skin=d['skins'][0];indices=[];weights=[]
 for packed,weight in zip(skin['joints'],skin['weights']):
  ids=[packed&255];packed>>=8
  while packed:ids.append(packed&255);packed>>=8
  assert all(i<len(skin['bones']) for i in ids)
  w=[1] if len(ids)==1 else [weight]+[(1-weight)/(len(ids)-1)]*(len(ids)-1)
  indices.append(ids+[0]*(4-len(ids)));weights.append(w+[0]*(4-len(ids)))
 assert set(skin['bones']).issubset({n['name'] for n in d['nodes']})
 return {'nodes':d['nodes'],'bones':skin['bones'],'inverseBind':skin['inverseBind'],'indices':indices,'weights':weights,'fps':30,'frames':1+max(k['frame'] for n in d['nodes'] for kind in ['translation','rotation','scale'] for k in n[kind])}
