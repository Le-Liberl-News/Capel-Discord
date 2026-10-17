const offsets=duration=>Array.from({length:duration/100},(_,i)=>i*100);
const common={fps:true,projectile:true,projectileSpeed:1000,range:30,radius:.1,windup:0,lockMovement:true,headshotMultiplier:1.25,shotVisual:'bullet',burstShots:true,noTempo:true,automatic:true,effectDuration:0};
const ACTIONS={basic:{...common,name:'Rafale',key:'f',duration:5000,cooldown:5000,fireDuration:3000,reloadDuration:2000,damage:90,hitOffsets:offsets(3000)},craft:{...common,name:'Tir de suppression',key:'g',duration:5000,cooldown:12000,fireDuration:5000,damage:150,hitOffsets:offsets(5000),thirdPersonCraft:true,steerFire:true}};
function shotRay(base,id,index,spread=.045){
 let seed=2166136261;for(const ch of String(id)+':'+index)seed=Math.imul(seed^ch.charCodeAt(0),16777619)>>>0;
 const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const d=base.direction,up=Math.abs(d.y)>.95?{x:1,y:0,z:0}:{x:0,y:1,z:0};
 let r={x:d.y*up.z-d.z*up.y,y:d.z*up.x-d.x*up.z,z:d.x*up.y-d.y*up.x},n=Math.hypot(r.x,r.y,r.z);for(const k of ['x','y','z'])r[k]/=n;
 const u={x:r.y*d.z-r.z*d.y,y:r.z*d.x-r.x*d.z,z:r.x*d.y-r.y*d.x},a=rnd()*2*Math.PI,radius=Math.sqrt(rnd())*spread;
 const direction={};for(const k of ['x','y','z'])direction[k]=d[k]+radius*(Math.cos(a)*r[k]+Math.sin(a)*u[k]);n=Math.hypot(...Object.values(direction));for(const k of ['x','y','z'])direction[k]/=n;
 return {origin:{...base.origin},direction};
}
module.exports={ACTIONS,shotRay};
