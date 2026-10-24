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
        type={2:'VEC2',3:'VEC3',4:'VEC4'}[n], min=[min(values[i::n]) for i in range(n)], max=[max(values[i::n]) for i in range(n)]))
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

# Reuse the native terrain triangles, including their atlas UVs and normals.
# The original map is mirrored in X and actually ends at world X=-84.
JOIN=-84
native_meshes=copy.deepcopy(data['meshes'])
def read(index):
    a=data['accessors'][index];v=data['bufferViews'][a['bufferView']]
    n={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']];fmt={5126:'f',5123:'H',5125:'I',5121:'B'}[a['componentType']]
    return [struct.unpack_from('<'+fmt*n,buffer,v.get('byteOffset',0)+a.get('byteOffset',0)+j*v.get('byteStride',struct.calcsize(fmt)*n)) for j in range(a['count'])]
def clip(poly,axis,bound,greater):
    result=[]
    for a,b in zip(poly,poly[1:]+poly[:1]):
        va=a['POSITION'][axis];vb=b['POSITION'][axis];ina=va>=bound-1e-6 if greater else va<=bound+1e-6;inb=vb>=bound-1e-6 if greater else vb<=bound+1e-6
        if ina:result.append(a)
        if ina!=inb:
            t=(bound-va)/(vb-va)
            result.append({k:tuple(x+(y-x)*t for x,y in zip(a[k],b[k])) for k in a})
    return result

def patch(x0,x1,z0,z1,allowed):
    out={}
    for m in native_meshes:
        for p in m['primitives']:
            mat=data['materials'][p['material']];image=data['images'][data['textures'][mat['pbrMetallicRoughness']['baseColorTexture']['index']]['source']]['uri']
            if Path(image).name not in allowed:continue
            attrs={k:read(v) for k,v in p['attributes'].items()};positions=attrs['POSITION'];ids=[v[0] for v in read(p['indices'])] if 'indices' in p else list(range(len(positions)))
            for j in range(0,len(ids),3):
                indices=ids[j:j+3];ps=[positions[i] for i in indices]
                if max(v[0] for v in ps)<x0 or min(v[0] for v in ps)>x1 or max(v[2] for v in ps)<z0 or min(v[2] for v in ps)>z1 or max(v[1] for v in ps)>1.4:continue
                poly=[{k:values[i] for k,values in attrs.items()} for i in indices]
                for axis,bound,greater in [(0,x0,True),(0,x1,False),(2,z0,True),(2,z1,False)]:
                    if poly:poly=clip(poly,axis,bound,greater)
                for k in range(1,len(poly)-1):out.setdefault(p['material'],[]).extend([poly[0],poly[k],poly[k+1]])
    return out

def emit_native(name,batches):
    primitives=[]
    for mat,verts in batches.items():
        if not verts:continue
        primitives.append(dict(material=mat,attributes={k:accessor([v for row in verts for v in row[k]],len(verts[0][k])) for k in verts[0]}))
    mi=len(data['meshes']);data['meshes'].append(dict(name=name,primitives=primitives));ni=len(data['nodes']);data['nodes'].append(dict(name=name,mesh=mi));data['scenes'][data.get('scene',0)]['nodes'].append(ni)

def road_z(x):
    d=max(0,-x-84);t=max(0,min(1,(d-16)/32));fade=t*t*(3-2*t)
    return (7*math.sin((x+84)/42)+5*math.sin((x+84)/93))*fade

def ground_y(x,native_y):
    t=max(0,min(1,(-x-84)/16));return native_y*(1-t)+.04*t

road=patch(76,84,-10,12,{'r41o0705.png','r41o0605.png','r01o0304.png','r01o0104.png'})
turf=patch(4,12,-64,-56,{'r01o0304.png','r01o0104.png','r41o0605.png'})
join_edge=patch(83.99,84,-110,110,{'r01o0304.png','r01o0104.png','r41o0605.png','r41o0705.png'})
assert road and turf
# Weld every repeated cross-section to the same native end profile; copying the
# original small height variations independently would leave cracks between strips.
profile={}
for verts in join_edge.values():
    for row in verts:
        x,y,z=row['POSITION']
        if abs(x-84)<.0001:profile.setdefault(round(z,5),[]).append(y)
profile=sorted((z,sum(ys)/len(ys)) for z,ys in profile.items())
def verge_height(z):
    if z<=profile[0][0]:return profile[0][1]
    for (a,h),(b,H) in zip(profile,profile[1:]):
        if z<=b:return h+(H-h)*(z-a)/(b-a)
    return profile[-1][1]
batches={}
for x in range(-364,-84,8):
    for z in range(-110,110,8):
        for mat,verts in turf.items():
            dst=batches.setdefault(mat,[])
            for row in verts:
                a=dict(row);p=row['POSITION'];wx=x+(12-p[0]);wz=z+(p[2]+64);a['POSITION']=(wx,ground_y(wx,verge_height(wz-road_z(wx))),wz)
                n=row.get('NORMAL',(0,1,0));a['NORMAL']=(-n[0],n[1],n[2]);dst.append(a)
# Reserve the full native road cross-section; grass must not cover the lower pavement.
for mat,verts in batches.items():
    clipped=[]
    for i in range(0,len(verts),3):
        poly=[]
        for row in verts[i:i+3]:
            a=dict(row);x,y,z=a['POSITION'];a['POSITION']=(x,y,z-road_z(x));poly.append(a)
        for bound,greater in [(-10,False),(12,True)]:
            part=clip(poly,2,bound,greater)
            for k in range(1,len(part)-1):
                for row in [part[0],part[k],part[k+1]]:
                    a=dict(row);x,y,z=a['POSITION'];a['POSITION']=(x,y,z+road_z(x));clipped.append(a)
    batches[mat]=clipped
# Reflection reverses winding; retain native atlas coordinates.
for mat,verts in batches.items():batches[mat]=[v for i in range(0,len(verts),3) for v in (verts[i],verts[i+2],verts[i+1])]
emit_native('Expanded native turf',batches)
batches={}
for x in range(-84,-360,-8):
    for mat,verts in road.items():
        dst=batches.setdefault(mat,[])
        for row in verts:
            a=dict(row);p=row['POSITION'];wx=x-(p[0]-76);a['POSITION']=(wx,ground_y(wx,verge_height(p[2]))+.006,p[2]+road_z(wx));n=row.get('NORMAL',(0,1,0));a['NORMAL']=(-n[0],n[1],n[2]);dst.append(a)
for mat,verts in batches.items():batches[mat]=[v for i in range(0,len(verts),3) for v in (verts[i],verts[i+2],verts[i+1])]
emit_native('Extended native road and verges',batches)
# Branches follow their own tangent and arc length. Only the narrow paving and
# verge are copied, rather than the native strip's large rectangular grass apron.
branch_patch=patch(76,84,-3.5,5.5,{'r41o0705.png','r41o0605.png'})
for number,(start,end,side) in enumerate([(-125,-180,-1),(-185,-222,1),(-270,-320,-1)]):
    def centre(t):return (start+(end-start)*t,road_z(start)+1+side*(43*t*t+math.sin(t*math.pi)*6))
    arc=[(0,0)];last=centre(0);distance=0
    for sample in range(1,501):
        t=sample/500;point=centre(t);distance+=math.hypot(point[0]-last[0],point[1]-last[1]);arc.append((distance,t));last=point
    def parameter(d):
        d=min(distance,max(0,d))
        lo=0;hi=len(arc)-1
        while hi-lo>1:
            mid=(lo+hi)//2
            if arc[mid][0]<d:lo=mid
            else:hi=mid
        A,t=arc[lo];B,T=arc[hi];return t+(T-t)*(d-A)/(B-A)
    batches={}
    for i in range(math.ceil(distance/(8*.4))):
        for mat,verts in branch_patch.items():
            dst=batches.setdefault(mat,[])
            for j in range(0,len(verts),3):
                poly=[]
                for row in verts[j:j+3]:
                    a=dict(row);p=row['POSITION'];d=(i*8+p[0]-76)*.4
                    # Clip the final native section to its real length before bending.
                    a['POSITION']=(d,p[1],p[2]);poly.append(a)
                poly=clip(poly,0,distance,False)
                mapped=[]
                for row in poly:
                    a=dict(row);d,_,z=row['POSITION'];t=parameter(d);wx,wz=centre(t)
                    dx=end-start;dz=side*(86*t+math.pi*6*math.cos(t*math.pi));length=math.hypot(dx,dz);offset=(z-1)*.4
                    a['POSITION']=(wx+dz/length*offset,.055,wz-dx/length*offset);a['NORMAL']=(0,1,0);mapped.append(a)
                # Do not lay the branch's grass/stone rectangles across the main lane.
                for row in mapped:
                    x,y,z=row['POSITION'];row['POSITION']=(x,y,z-road_z(x))
                mapped=clip(mapped,2,4 if side>0 else -2,side>0) if mapped else []
                for k in range(1,len(mapped)-1):
                    for row in [mapped[0],mapped[k+1],mapped[k]]:
                        a=dict(row);x,y,z=a['POSITION'];a['POSITION']=(x,y,z+road_z(x));dst.append(a)
    emit_native('Native side trail '+str(number),batches)
# Native edge polygons are intentionally irregular. Back the narrow uncovered
# slivers with turf instead of exposing the scene background between copies.
backing=material('r01o0304.png')
mesh('Native turf seam backing',[-364,-.12,-114,-364,-.12,114,-83.9,-.12,-114,-83.9,-.12,-114,-364,-.12,114,-83.9,-.12,114],[0,0,0,28.5,35,0,35,0,0,28.5,35,28.5],backing)
stone=material('r41o0605.png',(.88,.88,.88))
p=[];uv=[]
for x,z in [(-232,37),(-232,55),(-208,37),(-208,37),(-232,55),(-208,55)]:
    p.extend([x,.055,z]);uv.extend([.40+(x+232)/24*.20,.40+(z-37)/18*.20])
mesh('Quarry bedrock',p,uv,stone)
data['buffers'][0].update(byteLength=len(buffer),uri='data:application/octet-stream;base64,'+base64.b64encode(buffer).decode())
(ROOT/TARGET).write_text(json.dumps(data,separators=(',',':')),encoding='utf-8',newline='\n')
print('Expanded approach: 292 x 220 units; winding road and three side trails')
