"""Build three connected seeded floors using only selected Esmelas textures."""
import argparse,base64,json,random,shutil,struct
from pathlib import Path
from PIL import Image
parser=argparse.ArgumentParser();parser.add_argument('--textures',type=Path,required=True);parser.add_argument('--seed',type=int,default=202610091);args=parser.parse_args()
root=Path(__file__).resolve().parents[1]/'assets'/'sky'
textures=['C07C0004.png','C07C0204.png','C07C1104.png']
for floor in range(1,4):
 rng=random.Random(args.seed+floor);n=25;cells=set();rooms=[]
 for k in range(9):
  w,h=rng.randint(3,6),rng.randint(3,6);x,z=rng.randint(1,n-w-1),rng.randint(1,n-h-1);room=(x+w//2,z+h//2);rooms.append(room)
  cells.update((a,b) for a in range(x,x+w) for b in range(z,z+h))
  if k:
   a,b=rooms[k-1];c,d=room
   while (a,b)!=(c,d):
    cells.add((a,b));cells.add((min(n-2,a+1),b))
    if a!=c and (b==d or rng.random()<.5):a+=1 if c>a else -1
    else:b+=1 if d>b else -1
   cells.add((a,b))
 start=rooms[0];front=[start];distance={start:0}
 for q in front:
  for dx,dz in [(1,0),(-1,0),(0,1),(0,-1)]:
   v=(q[0]+dx,q[1]+dz)
   if v in cells and v not in distance:distance[v]=distance[q]+1;front.append(v)
 end=max(distance,key=distance.get);assert len(distance)==len(cells)
 unit=1.5;point=lambda p:{'x':p[0]*unit,'y':0,'z':p[1]*unit}
 groups=[[],[],[]]
 def quad(points,material,uv=None):
  if uv is None:uv=[(0,0),(1,0),(1,1),(0,1)]
  for i in [0,1,2,0,2,3]:groups[material].append((*points[i],*uv[i]))
 def box(x,y,z,w,h,d,mat):
  a,b=x-w/2,x+w/2;c,e=z-d/2,z+d/2
  for face in [[(a,y,c),(a,y,e),(b,y,e),(b,y,c)],[(a,y+h,c),(b,y+h,c),(b,y+h,e),(a,y+h,e)],[(a,y,c),(b,y,c),(b,y+h,c),(a,y+h,c)],[(b,y,e),(a,y,e),(a,y+h,e),(b,y+h,e)],[(a,y,e),(a,y,c),(a,y+h,c),(a,y+h,e)],[(b,y,c),(b,y,e),(b,y+h,e),(b,y+h,c)]]:quad(face,mat)
 for x,z in sorted(cells):
  a,b=x*unit,z*unit;half=unit/2
  quad([(a-half,0,b-half),(a-half,0,b+half),(a+half,0,b+half),(a+half,0,b-half)],0)
  for dx,dz in [(1,0),(-1,0),(0,1),(0,-1)]:
   if (x+dx,z+dz) not in cells:box(a+dx*half,0,b+dz*half,.12 if dx else unit,1.5,unit if dx else .12,1)
 for q in [start,end]:
  a,b=q[0]*unit,q[1]*unit
  quad([(a-.48,.012,b-.48),(a-.48,.012,b+.48),(a+.48,.012,b+.48),(a+.48,.012,b-.48)],2)
 out=root/f'tower{floor}';out.mkdir(exist_ok=True)
 for t in textures:shutil.copyfile(args.textures/t,out/t)
 binary=bytearray();views=[];accessors=[];primitives=[]
 def attribute(values,width):
  while len(binary)%4:binary.append(0)
  at=len(binary)
  for v in values:binary.extend(struct.pack('<'+'f'*width,*v))
  views.append({'buffer':0,'byteOffset':at,'byteLength':len(binary)-at});a={'bufferView':len(views)-1,'componentType':5126,'count':len(values),'type':'VEC3' if width==3 else 'VEC2'}
  if width==3:a.update(min=[min(v[i] for v in values) for i in range(3)],max=[max(v[i] for v in values) for i in range(3)])
  accessors.append(a);return len(accessors)-1
 for i,vertices in enumerate(groups):
  primitives.append({'attributes':{'POSITION':attribute([v[:3] for v in vertices],3),'TEXCOORD_0':attribute([v[3:] for v in vertices],2)},'material':i})
 model={'asset':{'version':'2.0','generator':'Capel seeded Esmelas kit'},'buffers':[{'byteLength':len(binary),'uri':'data:application/octet-stream;base64,'+base64.b64encode(binary).decode()}],'bufferViews':views,'accessors':accessors,'images':[{'uri':t} for t in textures],'textures':[{'source':i,'sampler':0} for i in range(3)],'samplers':[{'magFilter':9728,'minFilter':9728,'wrapS':10497,'wrapT':10497}],'materials':[{'name':t,'doubleSided':True,'extensions':{'KHR_materials_unlit':{}},'pbrMetallicRoughness':{'baseColorTexture':{'index':i}},'extras':{'skyShadowReceiver':True}} for i,t in enumerate(textures)],'meshes':[{'primitives':primitives}],'nodes':[{'mesh':0,'name':f'Esmelas floor {floor}'}],'scenes':[{'nodes':[0]}],'scene':0,'extensionsUsed':['KHR_materials_unlit']}
 (out/'anterose.gltf').write_text(json.dumps(model,separators=(',',':')),encoding='utf-8')
 width=n*3;nav=[]
 for j in range(width):
  z=j*.5
  for i in range(width):
   x=i*.5;tile=(int((x+.75)//unit),int((z+.75)//unit));nav.append(0 if tile in cells else None)
 grid={'origin':{'x':0,'z':0},'step':.5,'width':width,'height':width,'cells':nav,'spawn':point(start)}
 (out/'navigation.json').write_text(json.dumps(grid,separators=(',',':')),encoding='utf-8')
 layout={'floor':floor,'seed':args.seed+floor,'start':point(start),'exit':point(end),'rooms':[point(r) for r in rooms],'tiles':[list(q) for q in sorted(cells)],'source':'SC ED6_DT2A/c0701._x3 textures'}
 (out/'layout.json').write_text(json.dumps(layout,indent=2),encoding='utf-8');print(f'Floor {floor}: {len(cells)} connected tiles, exit distance {distance[end]}')
# Small local portraits of the available characters, from their native idle sprites.
catalogue=json.loads((root/'characters.json').read_text(encoding='utf-8'));portraits=root/'portraits';portraits.mkdir(exist_ok=True)
for i,(name,info) in enumerate(catalogue.items()):
 image=Image.open(root/info['texture']).convert('RGBA');w,h=info['frameWidth'],info['frameHeight'];frame=6 if info.get('directions',8)>6 else 0
 crop=image.crop((frame*w,0,(frame+1)*w,h));bbox=crop.getbbox()
 if bbox:
  x,y,r,b=bbox;head=crop.crop((x,y,r,min(b,y+max(12,(b-y)//2))));side=max(head.size);portrait=Image.new('RGBA',(side,side));portrait.paste(head,((side-head.width)//2,0));file=f'{i:03}.png';portrait.resize((64,64),Image.Resampling.NEAREST).save(portraits/file);info['portrait']='portraits/'+file
(root/'characters.json').write_text(json.dumps(catalogue,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
