import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.argv[2]??'activity/assets/sky/liberl'),g=JSON.parse(await fs.readFile(path.join(root,'terrain.gltf'),'utf8')),layout=JSON.parse(await fs.readFile(path.join(root,'layout.json'),'utf8')),bytes=await fs.readFile(path.join(root,'terrain.bin'));
const step=2,minX=Math.floor(Math.min(...layout.regions.map(r=>r.bounds.min[0]+r.position[0]))/step)*step,minZ=Math.floor(Math.min(...layout.regions.map(r=>r.bounds.min[2]+r.position[2]))/step)*step;
const maxX=Math.max(...layout.regions.map(r=>r.bounds.max[0]+r.position[0])),maxZ=Math.max(...layout.regions.map(r=>r.bounds.max[2]+r.position[2]));
const width=Math.ceil((maxX-minX)/step)+1,height=Math.ceil((maxZ-minZ)/step)+1,cells=new Float32Array(width*height).fill(-10000);
function read(id,index,component=0){const a=g.accessors[id],v=g.bufferViews[a.bufferView],n=a.type==='VEC3'?3:1,size=a.componentType===5123?2:4,o=v.byteOffset+(a.byteOffset??0)+(index*n+component)*size;return a.componentType===5126?bytes.readFloatLE(o):a.componentType===5123?bytes.readUInt16LE(o):bytes.readUInt32LE(o);}
for(const node of g.nodes){const p=node.translation??[0,0,0];for(const primitive of g.meshes[node.mesh].primitives){const indices=primitive.indices,positions=primitive.attributes.POSITION;
 for(let i=0;i<g.accessors[indices].count;i+=3){const points=[0,1,2].map(k=>{const j=read(indices,i+k);return [read(positions,j,0)+p[0],read(positions,j,1)+p[1],read(positions,j,2)+p[2]];}),[a,b,c]=points;
  const ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2],vx=c[0]-a[0],vy=c[1]-a[1],vz=c[2]-a[2],nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;
  if(Math.abs(ny)<.65*Math.hypot(nx,ny,nz)||Math.abs(ny)<1e-8)continue;
  const den=(b[2]-c[2])*(a[0]-c[0])+(c[0]-b[0])*(a[2]-c[2]);
  const x0=Math.max(0,Math.ceil((Math.min(...points.map(p=>p[0]))-minX)/step)),x1=Math.min(width-1,Math.floor((Math.max(...points.map(p=>p[0]))-minX)/step)),z0=Math.max(0,Math.ceil((Math.min(...points.map(p=>p[2]))-minZ)/step)),z1=Math.min(height-1,Math.floor((Math.max(...points.map(p=>p[2]))-minZ)/step));
  for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){const px=minX+x*step,pz=minZ+z*step,u=((b[2]-c[2])*(px-c[0])+(c[0]-b[0])*(pz-c[2]))/den,v=((c[2]-a[2])*(px-c[0])+(a[0]-c[0])*(pz-c[2]))/den;if(u>=-.001&&v>=-.001&&u+v<=1.001){const y=u*a[1]+v*b[1]+(1-u-v)*c[1],j=z*width+x;if(y>cells[j])cells[j]=y;}}
 }
}}
const meta={origin:{x:minX,z:minZ},step,width,height,minY:Math.min(...layout.regions.map(r=>r.bounds.min[1]+r.position[1])),maxY:400,revision:layout.revision};
await fs.writeFile(path.join(root,'flight-ground.bin'),Buffer.from(cells.buffer));await fs.writeFile(path.join(root,'flight-ground.json'),JSON.stringify(meta));
// The lower, sloped runway at Bose; nose points along its rails towards +X.
const airport=layout.regions.find(r=>r.id==='t1102'),spawn={x:airport.position[0]-38,z:airport.position[2]+42,y:0,yaw:-Math.PI/2};
const ix=Math.round((spawn.x-minX)/step),iz=Math.round((spawn.z-minZ)/step);spawn.y=cells[iz*width+ix];
if(spawn.y<-1000)throw Error('Runway is outside terrain');await fs.writeFile(path.join(root,'airship.json'),JSON.stringify({spawn,model:'lynx/model.gltf',length:10,lobby:{x:-1.4,y:0,z:-3.6}},null,2));console.log({width,height,bytes:cells.byteLength,spawn});
