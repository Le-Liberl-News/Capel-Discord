import {setBloomEmission} from './map-bloom.mjs';
// A fixed world volume: moving the camera never drags the embers along with it.
export function createGehennaEmbers(THREE,scene){
 const count=640,positions=new Float32Array(count*6),colors=new Float32Array(count*6),geometry=new THREE.BufferGeometry();
 const seed=i=>{const n=Math.sin(i*78.233+19.19)*43758.5453;return n-Math.floor(n);},wrap=(n,size)=>((n%size)+size)%size;
 geometry.setAttribute('position',new THREE.BufferAttribute(positions,3).setUsage(THREE.DynamicDrawUsage));
 geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
 for(let i=0;i<count;i++){const orange=.22+seed(i*7+5)*.35;colors.set([.65,orange*.25,.005,1,orange,.015],i*6);}
 const material=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false});setBloomEmission(material,.15);
 const sparks=new THREE.LineSegments(geometry,material);sparks.name='gehenna-world-embers';sparks.frustumCulled=false;sparks.userData.noXRay=true;scene.add(sparks);
 function update(time){const t=time/1000;for(let i=0;i<count;i++){
  const speed=4+seed(i*7+1)*7,vy=1+seed(i*7+2)*1.8,vz=1+seed(i*7+3)*2;
  const x=wrap(seed(i*7)*94+t*speed,94)-47,z=wrap(seed(i*7+4)*125+t*vz,125)-40,y=wrap(seed(i*7+6)*20+t*vy,20)-2,tail=.015+seed(i*7+5)*.028;
  positions.set([x-speed*tail,y-vy*tail,z-vz*tail,x,y,z],i*6);
 }geometry.attributes.position.needsUpdate=true;}
 update(0);return {update,count,dispose(){scene.remove(sparks);geometry.dispose();material.dispose();}};
}
