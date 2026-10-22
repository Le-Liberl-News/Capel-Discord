const world=require('./world-space.cjs'),catapult=require('./catapult.cjs');
function sample(clip,at){
 const frames=clip.frames;let index=0;while(index<frames.length-1&&frames[index+1].state.at<=at)index++;
 const a=frames[index],b=frames[Math.min(index+1,frames.length-1)],k=Math.max(0,Math.min(1,(at-a.state.at)/(b.state.at-a.state.at||1))),state={...a.state,at};
 for(const group of ['players','soldiers','enemies']){const next=new Map(b.state[group].map(v=>[v.id,v]));state[group]=a.state[group].map(v=>{const n=next.get(v.id);if(!n||v.hp<=0||n.hp<=0||Math.hypot(n.x-v.x,n.z-v.z)>5)return {...v};return {...v,x:v.x+(n.x-v.x)*k,y:v.y+(n.y-v.y)*k,z:v.z+(n.z-v.z)*k};});}
 const shells=new Map();for(const f of frames)for(const s of f.state.shells??[])if(s.at<=at&&at<s.at+s.points.at(-1).t+1800)shells.set(s.id,{...s,done:at>=s.at+s.points.at(-1).t});state.shells=[...shells.values()];
 const events=new Map();for(const f of frames)for(const e of f.state.events)if(e.at<=at)events.set(e.id,e);state.events=[...events.values()].sort((a,b)=>a.at-b.at);
 return {state:world.snapshot(state),combat:a.combat??{attacks:[]}};
}
function camera(clip,at){
 const e=clip.event,S=world.SCALE,point=p=>({x:p.x*S,y:p.y*S,z:p.z*S});
 if(e.type==='tank-arrival'){
  const {state}=sample(clip,at),tank=state.enemies.find(t=>t.id===e.tank);const p=tank??point(e.position);
  return {position:{x:p.x-8,y:p.y+10,z:p.z+10},target:{x:p.x,y:p.y+1.8,z:p.z},fov:40};
 }
 const p=point(e.position),hitFrame=clip.frames.find(f=>f.state.at>=e.at)??clip.frames.at(-1),shell=hitFrame.state.shells.find(s=>e.projectileId?s.id===e.projectileId:Math.abs(s.at+s.points.at(-1).t-e.at)<300);
 let target={...p,y:p.y+1.1};
 if(shell&&at<e.at){const q=point(catapult.at(shell,at));target={...q,y:q.y+.3};}
 // The observer stays outside the attacked facade, following the actual projectile into the impact.
 return {position:{x:target.x-11,y:target.y+6.5,z:target.z+10},target,fov:48};
}
module.exports={sample,camera};
