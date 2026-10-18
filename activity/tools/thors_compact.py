"""Compact empty campus spans while keeping the entrance and stair heights native."""
import base64
import numpy as np

CUTS=[(0,-24.),(0,-4.),(0,4.),(0,24.),(2,-20.),(2,12.)]

def warp(points):
 p=points.copy();x=p[...,0];a=np.abs(x)
 p[...,0]=np.sign(x)*np.where(a<=4,a,np.where(a<24,4+(a-4)*.6,a-8))
 z=p[...,2];p[...,2]=np.where(z<=-20,z+24,np.where(z<12,12+(z-12)*.25,z))
 return p

def clip(poly,axis,cut,less):
 result=[]
 for a,b in zip(poly,[*poly[1:],poly[0]]):
  ia=a[axis]<=cut if less else a[axis]>=cut;ib=b[axis]<=cut if less else b[axis]>=cut
  if ia:result.append(a)
  if ia!=ib:result.append(a+(b-a)*((cut-a[axis])/(b[axis]-a[axis])))
 return result

def compact_campus(g,data):
 def read(id):
  a=g['accessors'][id];v=g['bufferViews'][a['bufferView']];n={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']];dtype={5126:'<f4',5123:'<u2',5125:'<u4'}[a['componentType']]
  return np.ndarray((a['count'],n),dtype=dtype,buffer=data,offset=v.get('byteOffset',0)+a.get('byteOffset',0),strides=(v.get('byteStride',n*np.dtype(dtype).itemsize),np.dtype(dtype).itemsize)).copy()
 old_nodes=g['nodes'];old_meshes=g['meshes'];new_meshes=[];accessors=[];views=[];out=bytearray()
 def write(array,kind,dtype,bounds=False):
  array=np.asarray(array,dtype=dtype);out.extend(b'\0'*((-len(out))%4));offset=len(out);out.extend(array.tobytes());view=len(views);views.append({'buffer':0,'byteOffset':offset,'byteLength':array.nbytes});a={'bufferView':view,'componentType':5126 if dtype=='<f4' else 5125,'count':len(array),'type':kind}
  if bounds:a.update(min=array.min(axis=0).tolist(),max=array.max(axis=0).tolist())
  accessors.append(a);return len(accessors)-1
 for node in old_nodes:
  if 'mesh' not in node:continue
  matrix=np.array(node.get('matrix',np.eye(4).flatten()),dtype=float).reshape(4,4).T;linear=matrix[:3,:3];normal_matrix=np.linalg.inv(linear).T
  mesh=old_meshes[node['mesh']];primitives=[]
  for primitive in mesh['primitives']:
   pos=read(primitive['attributes']['POSITION'])@linear.T+matrix[:3,3];normal=read(primitive['attributes']['NORMAL'])@normal_matrix.T;uv=read(primitive['attributes']['TEXCOORD_0']);vertices=np.concatenate([pos,normal,uv],axis=1);indices=read(primitive['indices']).reshape(-1,3)
   tris=vertices[indices];crossing=np.zeros(len(tris),dtype=bool)
   for axis,cut in CUTS:crossing|=(tris[:,:,axis].min(axis=1)<cut-1e-6)&(tris[:,:,axis].max(axis=1)>cut+1e-6)
   pieces=[tris[~crossing]]
   split=[]
   for triangle in tris[crossing]:
    polygons=[list(triangle)]
    for axis,cut in CUTS:
     next_polygons=[]
     for poly in polygons:
      if min(v[axis] for v in poly)<cut-1e-6 and max(v[axis] for v in poly)>cut+1e-6:
       for less in [True,False]:
        part=clip(poly,axis,cut,less)
        if len(part)>=3:next_polygons.append(part)
      else:next_polygons.append(poly)
     polygons=next_polygons
    for poly in polygons:
     split.extend([[poly[0],poly[i],poly[i+1]] for i in range(1,len(poly)-1)])
   if split:pieces.append(np.asarray(split))
   triangles=np.concatenate(pieces,axis=0);before=triangles[:,:,:3].copy();after=warp(before)
   # Ground tiling stays at its original physical density, rather than becoming miniature paving.
   if node.get('name','').startswith('base_'):
    a=before[:,1,[0,2]]-before[:,0,[0,2]];b=before[:,2,[0,2]]-before[:,0,[0,2]];det=a[:,0]*b[:,1]-a[:,1]*b[:,0];valid=(np.abs(det)>1e-7)&(np.abs(triangles[:,:,4]).min(axis=1)>.95)
    if valid.any():
     du=triangles[:,1,6:8]-triangles[:,0,6:8];dv=triangles[:,2,6:8]-triangles[:,0,6:8];den=np.where(valid,det,1)[:,None];gx=(du*b[:,1,None]-dv*a[:,1,None])/den;gz=(dv*a[:,0,None]-du*b[:,0,None])/den;delta=after-before
     triangles[valid,:,6:8]+=delta[valid,:,0,None]*gx[valid,None,:]+delta[valid,:,2,None]*gz[valid,None,:]
   triangles[:,:,:3]=after;nx=np.where((np.abs(before[:,:,0])>4)&(np.abs(before[:,:,0])<24),.6,1);nz=np.where((before[:,:,2]>-20)&(before[:,:,2]<12),.25,1)
   triangles[:,:,3]/=nx;triangles[:,:,5]/=nz;length=np.linalg.norm(triangles[:,:,3:6],axis=2,keepdims=True);triangles[:,:,3:6]/=np.maximum(length,1e-9)
   # Remove degenerate split triangles, then share identical position/normal/UV vertices.
   area=np.linalg.norm(np.cross(after[:,1]-after[:,0],after[:,2]-after[:,0]),axis=1);flat=triangles[area>1e-8].reshape(-1,8).astype('<f4');unique,inverse=np.unique(flat,axis=0,return_inverse=True)
   attrs={'POSITION':write(unique[:,:3],'VEC3','<f4',True),'NORMAL':write(unique[:,3:6],'VEC3','<f4'),'TEXCOORD_0':write(unique[:,6:8],'VEC2','<f4')};primitives.append({'attributes':attrs,'indices':write(inverse,'SCALAR','<u4'),'material':primitive['material']})
  node['mesh']=len(new_meshes);node.pop('matrix',None);node.pop('translation',None);node.pop('rotation',None);node.pop('scale',None);new_meshes.append({'name':mesh['name'],'primitives':primitives})
 g['meshes']=new_meshes;g['accessors']=accessors;g['bufferViews']=views
 return out
