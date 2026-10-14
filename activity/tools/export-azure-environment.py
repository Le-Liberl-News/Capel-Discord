"""Read selected Azure IT3 models and structurally decode EFF files, without modifying the game.
VPA8/MAT4 layout: eArmada8/Ys8_IT3; EFF layout: Ouroboros/Falcom ED7/Decompiler/EffectFile.py.
Only requested models/textures are exported, never a full decompressed game.
"""
import argparse,base64,io,json,math,struct,subprocess
from pathlib import Path
from vendor.falcom_blocks import decompress_blocks_stream as blocks

GAME=Path('C:/GOG Games/The Legend of Heroes Trails to Azure/data')
CACHE=Path('E:/dev/sky-activity-tools/atelier-combat/azure-environment')
def text(d): return d.split(b'\0')[0].decode('cp932','replace')
def chunks(d):
 o=0
 while o<len(d):
  tag=d[o:o+4];n=struct.unpack_from('<I',d,o+4)[0]
  if o+8+n>len(d): raise ValueError('Truncated IT3 chunk')
  yield tag,d[o+8:o+8+n];o+=8+n
def effect(d):
 if d[:4]!=b'EF20': raise ValueError('Unknown EFF header')
 bits=struct.unpack_from('<H',d,26)[0];parts=[];o=124
 for i in range(16):
  if not bits&(1<<i): continue
  p=d[o:o+0x3b8]
  if len(p)!=0x3b8: raise ValueError('Truncated EFF part')
  count=p[18];extra=d[o+0x3b8:o+0x3b8+count*24]
  if len(extra)!=count*24: raise ValueError('Truncated EFF emissions')
  parts.append(dict(index=i,name=text(p[:16]),flags=struct.unpack_from('<I',p,20)[0],textureIndex=p[62],
    vectors=[list(struct.unpack_from('<3f',p,k)) for k in [68,80,92,164,176,188]],
    curves={n:list(struct.unpack_from('<36f',p,k)) for n,k in [('position',220),('rotation',364),('scale',508),('angular',652)]},
    colors=list(struct.unpack_from('<16I',p,796)),options=list(p[924:932]),
    emissions=[dict(part=extra[j*24+1],repeat=extra[j*24+2],count=extra[j*24+3],start=struct.unpack_from('<f',extra,j*24+8)[0],interval=list(struct.unpack_from('<3f',extra,j*24+12))) for j in range(count)]))
  o+=0x3b8+count*24
 if o!=len(d): raise ValueError('Unparsed EFF bytes')
 return dict(name=text(d[4:20]),flags=struct.unpack_from('<H',d,24)[0],textures=[text(d[28+i*16:44+i*16]) for i in range(4)],children=[text(d[92+i*16:108+i*16]) for i in range(2)],parts=parts)
def model(name):
 source=GAME/'map'/name/(name+'.it3');out=CACHE/name;out.mkdir(parents=True,exist_ok=True)
 nodes=[];textures={};cur=None
 for tag,d in chunks(source.read_bytes()):
  f=io.BytesIO(d)
  if tag==b'TEXF': textures[text(d[:36])]=text(d[36:68])
  elif tag==b'INFO':
   cur=dict(name=text(d[:64]),matrix=list(struct.unpack_from('<16f',d,64)),meshes=[],materials=[]);nodes.append(cur)
  elif tag==b'MAT4':
   count=struct.unpack('<I',f.read(4))[0];raw=blocks(f)
   cur['materials']=[dict(name=text(raw[i*384:i*384+64]),texture=text(raw[i*384+64:i*384+128])) for i in range(count)]
  elif tag==b'VPA8':
   count,_,sv,si=struct.unpack('<HHII',f.read(12));heads=blocks(f);vertices=b''.join(blocks(f) for _ in range(math.ceil(sv/0x40000)));ih=blocks(f);indices=b''.join(blocks(f) for _ in range(math.ceil(si/0x40000)));pv=pi=0
   for i in range(count):
    h=struct.unpack_from('<4f4I8f13I',heads,i*116);ni=struct.unpack_from('<I',ih,i*12+4)[0];nv=h[7]
    vs=[list(struct.unpack_from('<5f',vertices,pv+j*40)) for j in range(nv)];ids=list(struct.unpack_from('<'+'H'*ni,indices,pi));pv+=nv*40;pi+=ni*2
    assert not ids or max(ids)<nv
    colors=[[b/255 for b in vertices[pv-nv*40+j*40+20:pv-nv*40+j*40+24]] for j in range(nv)]
    cur['meshes'].append(dict(vertices=vs,colors=colors,indices=ids,material=h[5]))
   assert pv==len(vertices) and pi==len(indices)
 g=dict(asset={'version':'2.0','generator':'Native Azure VPA8 export'},scenes=[{'nodes':[]}],scene=0,nodes=[],meshes=[],materials=[],images=[],textures=[],buffers=[],bufferViews=[],accessors=[]);data=bytearray();textureIds={}
 def attr(values,n,kind=5126):
  while len(data)%4:data.append(0)
  start=len(data);flat=[x for v in values for x in v];data.extend(struct.pack('<'+('f' if kind==5126 else 'H')*len(flat),*flat));g['bufferViews'].append(dict(buffer=0,byteOffset=start,byteLength=len(data)-start));g['accessors'].append(dict(bufferView=len(g['bufferViews'])-1,componentType=kind,count=len(values),type={1:'SCALAR',2:'VEC2',3:'VEC3',4:'VEC4'}[n]));return len(g['accessors'])-1
 for node in nodes:
  primitives=[]
  for m in node['meshes']:
   texture=node['materials'][m['material']]['texture']
   if not texture: continue # Native untextured helper volumes are not scenery.
   if texture not in textureIds:
    textureIds[texture]=len(g['textures']);fname=textures[texture];src=GAME/'map_textures'/fname;target=out/(texture+'.png')
    subprocess.run(['E:/dev/sky-activity-tools/cradle-images.exe',str(src),'-o',str(target)],check=True,capture_output=True)
    if not target.exists(): raise ValueError('Texture conversion failed: '+fname)
    g['images'].append({'uri':target.name});g['textures'].append({'source':len(g['images'])-1})
   mi=len(g['materials']);g['materials'].append(dict(name=texture,doubleSided=True,alphaMode='MASK',alphaCutoff=.05,extensions={'KHR_materials_unlit':{}},pbrMetallicRoughness={'baseColorTexture':{'index':textureIds[texture]}}))
   primitives.append(dict(attributes={'POSITION':attr([v[:3] for v in m['vertices']],3),'TEXCOORD_0':attr([v[3:5] for v in m['vertices']],2),'COLOR_0':attr(m['colors'],4)},indices=attr([[i] for i in m['indices']],1,5123),material=mi))
  if not primitives:continue
  ni=len(g['nodes']);g['scenes'][0]['nodes'].append(ni);g['nodes'].append(dict(name=node['name'],matrix=node['matrix'],mesh=len(g['meshes'])));g['meshes'].append({'primitives':primitives})
 g['buffers']=[dict(byteLength=len(data),uri='data:application/octet-stream;base64,'+base64.b64encode(data).decode())];g['extensionsUsed']=['KHR_materials_unlit'];(out/'model.gltf').write_text(json.dumps(g),encoding='utf-8');print(name,len(g['meshes']),'native nodes')
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--models',nargs='*',default=[]);p.add_argument('--effects',action='store_true');a=p.parse_args()
 for n in a.models:model(n)
 if a.effects:
  result={};errors={}
  for src in (GAME/'effect').rglob('*.eff'):
   try:result[str(src.relative_to(GAME))]=effect(src.read_bytes())
   except ValueError as e:errors[str(src.relative_to(GAME))]=str(e)
  def finite(v):
   if isinstance(v,float):return v if math.isfinite(v) else None
   if isinstance(v,list):return [finite(x) for x in v]
   if isinstance(v,dict):return {k:finite(x) for k,x in v.items()}
   return v
  CACHE.mkdir(parents=True,exist_ok=True);(CACHE/'effects.json').write_text(json.dumps(finite({'effects':result,'unsupported':errors}),allow_nan=False),encoding='utf-8');print('EFF:',len(result),'decoded;',len(errors),'unsupported')
