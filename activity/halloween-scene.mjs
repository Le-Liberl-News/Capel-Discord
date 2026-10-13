import sceneScript from './scene-script.cjs';
export function createHalloweenScene({definition,onSpeech}) {
 let started=null,cursor=0;
 const fade=document.createElement('div'),title=document.createElement('div');fade.id='sky-scene-fade';title.id='sky-scene-location';
 fade.style.cssText='position:fixed;inset:0;background:#000;opacity:1;pointer-events:none;z-index:100';
 title.style.cssText='position:fixed;left:10%;right:10%;top:22%;text-align:center;color:#fff;font:36px AveriaSky,serif;text-shadow:0 2px 5px #000,0 0 14px #000;opacity:0;pointer-events:none;z-index:101';document.body.append(fade,title);
 const ids={ray:'npc:halloween-ray',pumpkin:'npc:halloween-pumpkin'};
 const age=time=>started===null?-1:time-started;
 const ease=t=>t*t*(3-2*t),clamp=t=>Math.max(0,Math.min(1,t));
 return {
  start(time){if(started===null)started=time;},
  receive(state,serverTime){if(started===null&&Number.isFinite(state?.started))started=performance.now()-Math.max(0,serverTime-state.started);},
  active(time){return started===null||age(time)<definition.duration;},
  update(time,avatars,localId,camera,follow){
   const elapsed=age(time);if(elapsed<0)return;
   if(elapsed>=definition.duration){fade.style.opacity='0';title.style.opacity='0';title.hidden=true;for(const a of avatars.values()){a.scriptWalking=false;a.scriptControlled=false;}return;}
   const actors={player:avatars.get(localId),...Object.fromEntries(Object.entries(ids).map(([name,id])=>[name,avatars.get(id)]))};if(!actors.player||!actors.ray||!actors.pumpkin)return;
   while(cursor<definition.events.length&&elapsed>=definition.events[cursor].at){const e=definition.events[cursor++];if(e.type==='say')onSpeech({id:'scene:'+started+':'+cursor,author:e.actor==='player'?localId:ids[e.actor],character:actors[e.actor]?.character??e.actor,text:e.text});}
   for(const [name,a]of Object.entries(actors)){if(!a)continue;const walk=sceneScript.walkAt(definition,name,elapsed);if(walk){Object.assign(a.position,walk.position);a.scriptWalking=walk.moving;a.scriptControlled=true;if(walk.moving)a.heading=walk.heading;}const face=definition.events.filter(e=>e.type==='face'&&e.actor===name&&e.at<=elapsed).at(-1);if(face&&(!walk||face.at>=definition.events.filter(e=>e.type==='walk'&&e.actor===name&&e.at<=elapsed).at(-1).at||!walk.moving))a.heading={dx:face.dx,dz:face.dz};}
   const cameras=definition.events.filter(e=>e.type==='camera'&&e.at<=elapsed),e=cameras.at(-1);if(e){const before=cameras.at(-2)??e,t=ease(clamp((elapsed-e.at)/(e.duration||1))),focus={};for(const k of ['x','y','z'])focus[k]=before.focus[k]+(e.focus[k]-before.focus[k])*t;const yaw=before.yaw+(e.yaw-before.yaw)*t,pitch=before.pitch+(e.pitch-before.pitch)*t,distance=before.distance+(e.distance-before.distance)*t;follow.set(focus.x,focus.y,focus.z);camera.position.set(focus.x+Math.sin(yaw)*Math.cos(pitch)*distance,focus.y+Math.sin(pitch)*distance,focus.z-Math.cos(yaw)*Math.cos(pitch)*distance);camera.lookAt(focus.x,focus.y,focus.z);}
   const f=definition.events.filter(e=>e.type==='fade'&&e.at<=elapsed).at(-1);if(f){const t=ease(clamp((elapsed-f.at)/(f.duration||1)));fade.style.opacity=String(f.direction==='in'?1-t:t);}
   const location=definition.events.filter(e=>e.type==='title'&&e.at<=elapsed).at(-1);if(location){title.textContent=location.text;const t=elapsed-location.at;const opacity=ease(clamp(t/1200))*ease(clamp((location.duration-t)/1400));title.style.opacity=String(opacity);title.dataset.phase=opacity>.95?'visible':'fading';title.hidden=t>=location.duration;}
  },
  dispose(){fade.remove();title.remove();}
 };
}
