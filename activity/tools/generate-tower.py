"""Generate shared Esmelas FC platforms and bridges with purpose-specific atlas UVs."""
import argparse, base64, collections, json, math, random, shutil, struct
from pathlib import Path
parser=argparse.ArgumentParser()
parser.add_argument('--textures',type=Path,required=True,help='Exported FC c0411 model directory')
parser.add_argument('--seed',type=int,default=202610091)
args=parser.parse_args()
root=Path(__file__).resolve().parents[1]/'assets'/'sky'
textures=['C04C0107.png','C04C0607.png','C04C0307.png','C04C1007.png','C04C0007.png','C04C0207.png']

def inside(p,poly):
 x,z=p;result=False
 for a,b in zip(poly,poly[1:]+poly[:1]):
  if (a[1]>z)!=(b[1]>z) and x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0]:result=not result
 return result

def segment_distance(p,a,b):
 dx,dz=b[0]-a[0],b[1]-a[1];t=max(0,min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dz)/(dx*dx+dz*dz)))
 return math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dz)

for floor in range(1,4):
 rng=random.Random(args.seed+floor);platforms=[]
 # An irregular spanning network, not filled rectangular rooms.
 sites=[(x,z) for z in range(3) for x in range(3)];rng.shuffle(sites)
 for i,(x,z) in enumerate(sites[:rng.randint(7,9)]):
  cx,cz=x*19+rng.uniform(-1.5,1.5),z*19+rng.uniform(-1.5,1.5)
  rx,rz=rng.uniform(3.2,5.3),rng.uniform(3.2,5.3)
  if i%3==1:
   if rng.random()<.5:rx+=rng.uniform(2,4)
   else:rz+=rng.uniform(2,4)
  # Rounded stone platforms, with occasional elongated octagonal galleries.
  poly=[(cx+rx*math.cos(k*math.tau/16),cz+rz*math.sin(k*math.tau/16)) for k in range(16)]
  platforms.append({'x':cx,'z':cz,'rx':rx,'rz':rz,'polygon':poly,'walls':[]})
 edges=[];joined={0}
 while len(joined)<len(platforms):
  _,a,b=min((math.hypot(platforms[a]['x']-p['x'],platforms[a]['z']-p['z']),a,b) for a in joined for b,p in enumerate(platforms) if b not in joined)
  edges.append((a,b));joined.add(b)
 # One loop permits an alternative route; keep bridges short enough to read visually.
 possible=[(a,b) for a in range(len(platforms)) for b in range(a+1,len(platforms)) if (a,b) not in edges and (b,a) not in edges and math.hypot(platforms[a]['x']-platforms[b]['x'],platforms[a]['z']-platforms[b]['z'])<23]
 if possible:edges.append(rng.choice(possible))
 bridges=[]
 for a,b in edges:
  p,q=platforms[a],platforms[b];dx,dz=q['x']-p['x'],q['z']-p['z'];length=math.hypot(dx,dz);ux,uz=dx/length,dz/length
  ra=1/math.sqrt((ux/p['rx'])**2+(uz/p['rz'])**2);rb=1/math.sqrt((ux/q['rx'])**2+(uz/q['rz'])**2)
  start=(p['x']+ux*(ra-.8),p['z']+uz*(ra-.8));end=(q['x']-ux*(rb-.8),q['z']-uz*(rb-.8));width=rng.uniform(2.5,3.4)
  bridges.append({'a':a,'b':b,'start':start,'end':end,'width':width,'railings':rng.random()<.65,'deckHeight':.06})
 ferries=[]
 candidates=sorted((math.hypot(p['x']-q['x'],p['z']-q['z']),a,b) for a,p in enumerate(platforms) for b,q in enumerate(platforms) if a<b and (a,b) not in edges and (b,a) not in edges and 16<math.hypot(p['x']-q['x'],p['z']-q['z'])<27)
 for _,a,b in candidates[:2]:
  p,q=platforms[a],platforms[b];dx,dz=q['x']-p['x'],q['z']-p['z'];length=math.hypot(dx,dz);ux,uz=dx/length,dz/length
  ra=1/math.sqrt((ux/p['rx'])**2+(uz/p['rz'])**2);rb=1/math.sqrt((ux/q['rx'])**2+(uz/q['rz'])**2)
  ferries.append({'id':f'ferry:{len(ferries)}','from':{'x':p['x']+ux*(ra-.75),'z':p['z']+uz*(ra-.75)},'to':{'x':q['x']-ux*(rb-.75),'z':q['z']-uz*(rb-.75)},'width':2.6,'y':.12,'speed':1.6,'dwell':1800,'phase':floor*1300})
 islands=[];jump_links=[]
 for p in sorted(platforms,key=lambda p:math.hypot(p['x']-19,p['z']-19),reverse=True)[:2]:
  dx,dz=p['x']-19,p['z']-19;length=math.hypot(dx,dz);ux,uz=dx/length,dz/length
  radius=1/math.sqrt((ux/p['rx'])**2+(uz/p['rz'])**2);r=2.2
  cx,cz=p['x']+ux*(radius+r+2.2),p['z']+uz*(radius+r+2.2)
  islands.append({'x':cx,'z':cz,'rx':r,'rz':r,'polygon':[(cx+r*math.cos(k*math.tau/16),cz+r*math.sin(k*math.tau/16)) for k in range(16)],'walls':[],'island':True})
  jump_links.append({'from':{'x':p['x']+ux*(radius-.35),'y':0,'z':p['z']+uz*(radius-.35)},'to':{'x':cx-ux*(r-.35),'y':0,'z':cz-uz*(r-.35)}})
 groups=[[] for _ in textures]
 def triangle(points,mat,uv):
  for p,t in zip(points,uv):groups[mat].append((*p,*t))
 def quad(points,mat,uv):
  for ix in [(0,1,2),(0,2,3)]:triangle([points[i] for i in ix],mat,[uv[i] for i in ix])
 def vertical(a,b,low,high,mat,uv):
  quad([(a[0],low,a[1]),(b[0],low,b[1]),(b[0],high,b[1]),(a[0],high,a[1])],mat,uv)
 def pillar(x,z):
  r=.35
  for k in range(8):
   a=(x+r*math.cos(k*math.tau/8),z+r*math.sin(k*math.tau/8));b=(x+r*math.cos((k+1)*math.tau/8),z+r*math.sin((k+1)*math.tau/8))
   vertical(a,b,-4,1.7,2,[(.03+k/8*.66,.12),(.03+(k+1)/8*.66,.12),(.03+(k+1)/8*.66,.45),(.03+k/8*.66,.45)])
   triangle([(x,1.7,z),(a[0],1.7,a[1]),(b[0],1.7,b[1])],2,[(.195,.82),(.195+.17*math.cos(k*math.tau/8),.82+.16*math.sin(k*math.tau/8)),(.195+.17*math.cos((k+1)*math.tau/8),.82+.16*math.sin((k+1)*math.tau/8))])
 walls=[];pillars=[]
 for i,p in enumerate(platforms+islands):
  poly=p['polygon'];center=(p['x'],0,p['z'])
  for k,(a,b) in enumerate(zip(poly,poly[1:]+poly[:1])):
   pts=[center,(a[0],0,a[1]),(b[0],0,b[1])]
   triangle(pts,0,[(v[0]/4,v[2]/4) for v in pts])
   # Deep foundations and a pale stone border visually separate floor from the void.
   vertical(a,b,-4,0,1,[(0,.48),(1,.48),(1,.95),(0,.95)])
   midpoint=((a[0]+b[0])/2,(a[1]+b[1])/2)
   opening=any(segment_distance(midpoint,t['start'],t['end'])<t['width']/2+.75 for t in bridges if i in (t['a'],t['b']))
   opening=opening or any(segment_distance(midpoint,(link['from']['x'],link['from']['z']),(link['to']['x'],link['to']['z']))<1.4 for link in jump_links)
   opening=opening or any(segment_distance(midpoint,(t['from']['x'],t['from']['z']),(t['to']['x'],t['to']['z']))<2 for t in ferries)
   if opening:continue
   inner=[(p['x']+(v[0]-p['x'])*.95,p['z']+(v[1]-p['z'])*.95) for v in [a,b]]
   quad([(a[0],.045,a[1]),(b[0],.045,b[1]),(inner[1][0],.045,inner[1][1]),(inner[0][0],.045,inner[0][1])],4,[(0,.82),(.48,.82),(.48,.98),(0,.98)])
   # Contiguous wall arcs, interspersed with completely open stretches.
   enclosed=not p.get('island') and (k//4+i+floor)%3==0
   if enclosed:
    vertical(a,b,0,1.45,1,[(0,.52),(1,.52),(1,.98),(0,.98)])
    quad([(a[0],1.45,a[1]),(b[0],1.45,b[1]),(inner[1][0],1.45,inner[1][1]),(inner[0][0],1.45,inner[0][1])],4,[(0,.82),(.48,.82),(.48,.98),(0,.98)])
    p['walls'].append(k);walls.append([a,b])
    if k%4==0:pillar(*a);pillars.append(a)
 for t in bridges:
  a,b=t['start'],t['end'];dx,dz=b[0]-a[0],b[1]-a[1];length=math.hypot(dx,dz);nx,nz=-dz/length,dx/length;w=t['width']/2
  corners=[(a[0]+nx*w,a[1]+nz*w),(a[0]-nx*w,a[1]-nz*w),(b[0]-nx*w,b[1]-nz*w),(b[0]+nx*w,b[1]+nz*w)]
  t['polygon']=corners
  # The bridge atlas is masonry, while platforms use the irregular green paving.
  quad([(x,t['deckHeight'],z) for x,z in corners],3,[(0,0),(.45,0),(.45,length/4),(0,length/4)])
  for u,v in [(corners[0],corners[3]),(corners[2],corners[1])]:
   vertical(u,v,-.9,t['deckHeight'],1,[(0,.5),(length/4,.5),(length/4,.92),(0,.92)])
   if t['railings']:
    vertical(u,v,t['deckHeight'],t['deckHeight']+.8,1,[(0,.03),(length/4,.03),(length/4,.48),(0,.48)])
    pillar(*u);pillars.append(u)
 # Accurate circular dais: paving, stone rim and the native central ornament.
 for i in [0,len(platforms)-1]:
  p=platforms[i];r=1.1
  for k in range(32):
   a,b=k*math.tau/32,(k+1)*math.tau/32
   triangle([(p['x'],.015,p['z']),(p['x']+r*math.cos(a),.015,p['z']+r*math.sin(a)),(p['x']+r*math.cos(b),.015,p['z']+r*math.sin(b))],5,[(.5,.5),(.5+.415*math.cos(a),.5+.415*math.sin(a)),(.5+.415*math.cos(b),.5+.415*math.sin(b))])
 out=root/f'tower{floor}';out.mkdir(exist_ok=True)
 for old in out.glob('C07*.png'):old.unlink()
 for t in textures:shutil.copyfile(args.textures/t,out/t)
 binary=bytearray();views=[];accessors=[];primitives=[]
 def attribute(values,width):
  at=len(binary)
  for v in values:binary.extend(struct.pack('<'+'f'*width,*v))
  views.append({'buffer':0,'byteOffset':at,'byteLength':len(binary)-at});a={'bufferView':len(views)-1,'componentType':5126,'count':len(values),'type':'VEC3' if width==3 else 'VEC2'}
  if width==3:a.update(min=[min(v[i] for v in values) for i in range(3)],max=[max(v[i] for v in values) for i in range(3)])
  accessors.append(a);return len(accessors)-1
 for i,vertices in enumerate(groups):
  if vertices:primitives.append({'attributes':{'POSITION':attribute([v[:3] for v in vertices],3),'TEXCOORD_0':attribute([v[3:] for v in vertices],2)},'material':i})
 model={'asset':{'version':'2.0','generator':'Capel Esmelas FC platform network v2'},'buffers':[{'byteLength':len(binary),'uri':'data:application/octet-stream;base64,'+base64.b64encode(binary).decode()}],'bufferViews':views,'accessors':accessors,'images':[{'uri':t} for t in textures],'textures':[{'source':i,'sampler':0} for i in range(len(textures))],'samplers':[{'magFilter':9728,'minFilter':9728,'wrapS':10497,'wrapT':10497}],'materials':[{'name':t,'doubleSided':True,'extensions':{'KHR_materials_unlit':{}},'pbrMetallicRoughness':{'baseColorTexture':{'index':i}},'extras':{'skyShadowReceiver':True}} for i,t in enumerate(textures)],'meshes':[{'primitives':primitives}],'nodes':[{'mesh':0,'name':f'Esmelas platforms floor {floor}'}],'scenes':[{'nodes':[0]}],'scene':0,'extensionsUsed':['KHR_materials_unlit']}
 (out/'anterose.gltf').write_text(json.dumps(model,separators=(',',':')),encoding='utf-8')
 step=.3;origin={'x':-12,'z':-12};width=height=215;nav=[]
 for j in range(height):
  for k in range(width):
   p=(origin['x']+k*step,origin['z']+j*step)
   walk=any(inside(p,t['polygon']) for t in platforms+islands) or any(segment_distance(p,t['start'],t['end'])<t['width']/2-.25 for t in bridges)
   if walk and any(segment_distance(p,a,b)<.3 for a,b in walls):walk=False
   if walk and any(math.hypot(p[0]-a,p[1]-b)<.6 for a,b in pillars):walk=False
   nav.append(max([t['deckHeight'] for t in bridges if inside(p,t['polygon'])],default=0) if walk else None)
 # Retain the connected network and verify each platform can be reached.
 point=lambda p:{'x':p['x'],'y':0,'z':p['z']}
 start=point(platforms[0]);start_idx=round((start['z']-origin['z'])/step)*width+round((start['x']-origin['x'])/step)
 seeds=[start_idx]+[round((p['z']-origin['z'])/step)*width+round((p['x']-origin['x'])/step) for p in islands]
 seen=set(seeds);queue=seeds[:]
 for k in queue:
  for n in [k-1,k+1,k-width,k+width]:
   if 0<=n<len(nav) and abs(n%width-k%width)<=1 and nav[n] is not None and n not in seen:seen.add(n);queue.append(n)
 nav=[v if k in seen else None for k,v in enumerate(nav)]
 for p in platforms:
  ix=round((p['z']-origin['z'])/step)*width+round((p['x']-origin['x'])/step);assert ix in seen,'Disconnected platform'
 end=point(platforms[-1]);grid={'origin':origin,'step':step,'width':width,'height':height,'cells':nav,'spawn':start}
 (out/'navigation.json').write_text(json.dumps(grid,separators=(',',':')),encoding='utf-8')
 torches=[{'id':f'torch:{i}','position':[p['x']+p['rx']*.6,1.8,p['z']+.5],'color':[1,.45,.12],'radius':6,'strength':1.9} for i,p in enumerate(platforms+islands)]
 traps=[{'id':f'trap:{i}','start':{'x':t['start'][0],'y':t['deckHeight'],'z':t['start'][1]},'end':{'x':t['end'][0],'y':t['deckHeight'],'z':t['end'][1]},'width':t['width']-.4,'height':.45 if i%2==0 else 2.35,'period':3200,'phase':i*900} for i,t in enumerate(bridges[:2])]
 layout={'version':2,'movingPlatforms':ferries,'islands':islands,'jumpLinks':jump_links,'torches':torches,'traps':traps,'floor':floor,'seed':args.seed+floor,'start':start,'exit':end,'rooms':[point(p) for p in platforms],'platforms':platforms,'bridges':bridges,'tiles':[[k%width,k//width] for k in sorted(seen)],'source':'FC ED6_DT0A/c0411._x2 purpose-specific native texture atlas'}
 (out/'layout.json').write_text(json.dumps(layout,indent=2),encoding='utf-8')
 print(f'Floor {floor}: {len(platforms)} platforms, {len(bridges)} bridges, {len(seen)} connected cells')
