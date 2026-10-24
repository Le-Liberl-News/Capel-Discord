"""Extend the native extracted terrain; deterministic geometry, no renderer required."""
import base64
import copy
import json
import math
from pathlib import Path
import struct
import subprocess

ROOT = Path(__file__).resolve().parents[1]
TARGET = 'activity/assets/sky/sanktheim/forest/terrain.gltf'
# Original forest extraction, before the approach extension.
BASE = 'f34db07533e0f1349b1b9bc07fb9f55bc2e58c89'
data = json.loads(subprocess.check_output(['git', 'show', f'{BASE}:{TARGET}'], cwd=ROOT))
buffer = bytearray(base64.b64decode(data['buffers'][0]['uri'].split(',')[1]))

def accessor(values, n):
    while len(buffer) % 4:
        buffer.append(0)
    offset = len(buffer)
    buffer.extend(struct.pack('<' + 'f' * len(values), *values))
    view = len(data['bufferViews'])
    data['bufferViews'].append(dict(buffer=0, byteOffset=offset, byteLength=len(values)*4, target=34962))
    index = len(data['accessors'])
    data['accessors'].append(dict(bufferView=view, componentType=5126, count=len(values)//n,
        type={2:'VEC2',3:'VEC3'}[n], min=[min(values[i::n]) for i in range(n)], max=[max(values[i::n]) for i in range(n)]))
    return index

def material(image, color=(1,1,1), crop=False):
    source = next(i for i,v in enumerate(data['images']) if v['uri'].endswith(image))
    sampler = len(data.setdefault('samplers', []))
    data['samplers'].append(dict(wrapS=10497, wrapT=10497, magFilter=9728, minFilter=9729))
    texture = len(data['textures'])
    data['textures'].append(dict(source=source, sampler=sampler))
    index = len(data['materials'])
    data['materials'].append(dict(doubleSided=True, pbrMetallicRoughness=dict(baseColorTexture=dict(index=texture), baseColorFactor=[*color,1], metallicFactor=0, roughnessFactor=1)))
    return index

def mesh(name, points, uvs, mat):
    index = len(data['meshes'])
    data['meshes'].append(dict(name=name, primitives=[dict(attributes=dict(POSITION=accessor(points,3),NORMAL=accessor([0,1,0]*(len(points)//3),3),TEXCOORD_0=accessor(uvs,2)),material=mat)]))
    node = len(data['nodes'])
    data['nodes'].append(dict(name=name, mesh=index))
    data['scenes'][data.get('scene',0)]['nodes'].append(node)

grass=material('r01o0304.png')
soil=material('r41o0705.png')
stone=material('r41o0605.png',(.88,.88,.88))
points=[];uvs=[]
for x,z in [(-360,-110),(-360,110),(-68,-110),(-68,-110),(-360,110),(-68,110)]:
    points.extend([x,.04,z]);uvs.extend([(x+360)/6,(z+110)/6])
mesh('Expanded Grancel approach',points,uvs,grass)

def road_z(x):
    return 7*math.sin((x+68)/42)+5*math.sin((x+68)/93)

def ribbon(name, centres, width):
    p=[];uv=[]
    for i in range(len(centres)-1):
        a,b=centres[i:i+2];dx=b[0]-a[0];dz=b[1]-a[1];length=math.hypot(dx,dz) or 1
        w=width*(1+.12*math.sin(i*.73));nx=-dz/length*w;nz=dx/length*w
        corners=[(a[0]+nx,a[1]+nz),(a[0]-nx,a[1]-nz),(b[0]+nx,b[1]+nz),(b[0]-nx,b[1]-nz)]
        for j in [0,1,2,2,1,3]:
            x,z=corners[j];p.extend([x,.065,z]);uv.extend([x/4,z/4])
    mesh(name,p,uv,soil)

ribbon('Winding central road',[(x,road_z(x)) for x in range(-360,-67,2)],3.5)
for n,(start,end,side) in enumerate([(-125,-180,-1),(-185,-222,1),(-270,-320,-1)]):
    centres=[]
    for i in range(51):
        t=i/50;x=start+(end-start)*t;z=road_z(start)+side*(43*t*t)+math.sin(t*math.pi)*6
        centres.append((x,z))
    ribbon('Side trail '+str(n),centres,1.3)
p=[];uv=[]
for x,z in [(-232,37),(-232,55),(-208,37),(-208,37),(-232,55),(-208,55)]:
    p.extend([x,.055,z]);uv.extend([.40+(x+232)/24*.20,.40+(z-37)/18*.20])
mesh('Quarry bedrock',p,uv,stone)
data['buffers'][0].update(byteLength=len(buffer),uri='data:application/octet-stream;base64,'+base64.b64encode(buffer).decode())
(ROOT/TARGET).write_text(json.dumps(data,separators=(',',':')),encoding='utf-8',newline='\n')
print('Expanded approach: 292 x 220 units; winding road and three side trails')
