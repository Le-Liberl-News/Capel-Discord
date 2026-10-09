import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createRooftopSky} from './rooftop-sky.mjs';
async function main(){
const canvas=document.querySelector('canvas'),status=document.querySelector('#status'),renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0x26333e);
canvas.tabIndex=0;canvas.addEventListener('pointerdown',()=>canvas.focus());
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,1,.1,12000),controls=new OrbitControls(camera,canvas);
let dirty=true;controls.addEventListener('change',()=>dirty=true);
controls.enableDamping=true;controls.maxPolarAngle=Math.PI*.99;controls.minDistance=2;controls.maxDistance=4000;
const manager=new THREE.LoadingManager();manager.onProgress=(_,done,total)=>{status.textContent=`Chargement ${done}/${total}`;};
const assets=new URL('./',location.href),layout=await fetch(new URL('layout.json',assets),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Chargement impossible');return r.json();});
manager.setURLModifier(url=>{const result=new URL(url,assets);result.searchParams.set('v',layout.revision);return result.href;});
const loaded=await new GLTFLoader(manager).loadAsync(new URL('terrain.gltf',assets).href);scene.add(loaded.scene);
loaded.scene.traverse(o=>{if(o.isMesh)for(const m of [].concat(o.material)){if(m.map){m.map.magFilter=THREE.NearestFilter;m.map.minFilter=THREE.LinearMipmapLinearFilter;}m.polygonOffset=true;m.polygonOffsetFactor=.1;}});
const backdrop=new THREE.Group();backdrop.visible=false;scene.add(backdrop);const sky=await createRooftopSky(THREE,backdrop,new URL('../tower4/',assets),manager);
document.querySelector('#panorama').onchange=e=>{backdrop.visible=e.target.checked;dirty=true;};
const bounds=new THREE.Box3().setFromObject(loaded.scene),center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
const mapById=new Map(layout.regions.map(r=>[r.id,r]));
const links=new THREE.Group();links.visible=false;scene.add(links);
for(const link of layout.joins){const a=mapById.get(link.a),b=mapById.get(link.b),p=new THREE.Vector3().fromArray(a.position).add(new THREE.Vector3().fromArray(link.gateA)),q=new THREE.Vector3().fromArray(b.position).add(new THREE.Vector3().fromArray(link.gateB));p.y+=2;q.y+=2;
 const issue=Math.hypot(...link.residual)>2,color=issue?0xff5a3b:0x56ff95;
 const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([p,q]),new THREE.LineBasicMaterial({color,depthTest:false}));line.renderOrder=100;links.add(line);
 for(const point of [p,q]){const mesh=new THREE.Mesh(new THREE.SphereGeometry(1.2,8,6),new THREE.MeshBasicMaterial({color,depthTest:false}));mesh.position.copy(point);mesh.renderOrder=100;links.add(mesh);}
}
let flying=false,yaw=0,pitch=0,drag=null,last=performance.now();const keys=new Set();
const select=document.querySelector('#location');for(const region of layout.regions){const option=document.createElement('option');option.value=region.id;option.textContent=region.name;select.append(option);}
function orbitView(target,distance){flying=false;document.querySelector('#flight').checked=false;controls.enabled=true;controls.target.copy(target);camera.position.copy(target).add(new THREE.Vector3(.6,.8,-.7).normalize().multiplyScalar(distance));controls.update();}
function overview(){
 const eye=new THREE.Vector3(.6,.8,-.7).normalize(),right=new THREE.Vector3().crossVectors(new THREE.Vector3().copy(eye).negate(),new THREE.Vector3(0,1,0)).normalize(),up=new THREE.Vector3().crossVectors(eye,right).normalize(),vertical=Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),horizontal=vertical*camera.aspect;let distance=0;
 for(const region of layout.regions)for(const x of [region.bounds.min[0]+region.position[0],region.bounds.max[0]+region.position[0]])for(const y of [region.bounds.min[1]+region.position[1],region.bounds.max[1]+region.position[1]])for(const z of [region.bounds.min[2]+region.position[2],region.bounds.max[2]+region.position[2]]){const point=new THREE.Vector3(x,y,z).sub(center);distance=Math.max(distance,Math.abs(point.dot(right))/horizontal+point.dot(eye),Math.abs(point.dot(up))/vertical+point.dot(eye));}
 orbitView(center,distance*1.12);select.value='';backdrop.visible=false;document.querySelector('#panorama').checked=false;
}
function visit(id){const region=mapById.get(id);if(!region)return;const target=new THREE.Vector3().fromArray(region.center);target.y=Math.max(region.position[1],target.y-3);orbitView(target,id.startsWith('t')?65:100);select.value=id;backdrop.visible=true;document.querySelector('#panorama').checked=true;}
select.onchange=()=>select.value?visit(select.value):overview();document.querySelector('#overview').onclick=overview;document.querySelector('#bose').onclick=()=>visit('t1101');document.querySelector('#rolent').onclick=()=>visit('t0100');
document.querySelector('#seams').onchange=e=>{links.visible=e.target.checked;dirty=true;};
document.querySelector('#wireframe').onchange=e=>{loaded.scene.traverse(o=>{if(o.isMesh)for(const m of [].concat(o.material))m.wireframe=e.target.checked;});dirty=true;};
document.querySelector('#flight').onchange=e=>{flying=e.target.checked;controls.enabled=!flying;if(flying){const direction=camera.getWorldDirection(new THREE.Vector3());yaw=Math.atan2(direction.x,-direction.z);pitch=Math.asin(direction.y);}};
window.addEventListener('keydown',e=>{if(e.target.tagName==='SELECT'||e.target.tagName==='INPUT')return;keys.add(e.code);if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();});window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();drag=null;});
canvas.addEventListener('contextmenu',e=>e.preventDefault());canvas.addEventListener('pointerdown',e=>{if(flying){drag={x:e.clientX,y:e.clientY,id:e.pointerId};canvas.setPointerCapture(e.pointerId);}});canvas.addEventListener('pointermove',e=>{if(!drag||!flying)return;yaw+=(e.clientX-drag.x)*.004;pitch=Math.max(-1.5,Math.min(1.5,pitch-(e.clientY-drag.y)*.004));drag.x=e.clientX;drag.y=e.clientY;dirty=true;});canvas.addEventListener('pointerup',()=>drag=null);canvas.addEventListener('pointercancel',()=>drag=null);
function resize(){dirty=true;renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}window.addEventListener('resize',resize);resize();overview();
status.textContent=`${layout.regions.length} maps`;document.querySelector('#loading').hidden=true;
const label=document.querySelector('#nearest');
function frame(time){const dt=Math.min(.05,(time-last)/1000);last=time;
 if(flying){camera.rotation.set(pitch,-yaw,0,'YXZ');const direction=camera.getWorldDirection(new THREE.Vector3()),right=new THREE.Vector3().crossVectors(direction,new THREE.Vector3(0,1,0)).normalize(),delta=new THREE.Vector3();
  if(keys.has('KeyW')||keys.has('ArrowUp'))delta.add(direction);if(keys.has('KeyS')||keys.has('ArrowDown'))delta.sub(direction);if(keys.has('KeyA')||keys.has('ArrowLeft'))delta.sub(right);if(keys.has('KeyD')||keys.has('ArrowRight'))delta.add(right);if(keys.has('Space'))delta.y+=1;if(keys.has('ControlLeft')||keys.has('ControlRight'))delta.y-=1;
  if(delta.lengthSq()>0)dirty=true;camera.position.add(delta.multiplyScalar(dt*(keys.has('ShiftLeft')||keys.has('ShiftRight')?100:25)));controls.target.copy(camera.position).addScaledVector(direction,20);
 }else controls.update();
 if(dirty){sky.update(camera,{tint:[1,1,1]});renderer.render(scene,camera);dirty=false;}
 const here=flying?camera.position:controls.target;let nearest=null,distance=Infinity;for(const r of layout.regions){const d=Math.hypot(r.center[0]-here.x,r.center[2]-here.z);if(d<distance){nearest=r;distance=d;}}label.textContent=nearest?.name??'';
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

}
main().catch(error=>{document.querySelector("#loading").textContent="Chargement impossible. Rechargez la page.";console.error(error);});
