import sceneScript from './scene-script.cjs';
import {installCinematicStyle} from './cinematic-frame.mjs';
export function createHalloweenScene({definition,onSpeech,onAdvance=()=>({closed:true}),bindings={ray:"npc:halloween-ray",pumpkin:"npc:halloween-pumpkin"}}) {
 installCinematicStyle();let started=null;const clock=sceneScript.createSceneClock(definition),activatedAt=new Map();const bars=document.createElement('div');bars.className='sky-letterbox sky-cinematic-element';document.body.append(bars);document.body.setAttribute('data-sky-cinematic','');
 const click=e=>{if(!document.body.hasAttribute('data-sky-cinematic'))return;if(e.button!==0)return;e.preventDefault();e.stopImmediatePropagation();if(e.type==='pointerdown'&&clock.state().waiting&&onAdvance().closed)clock.advance();};for(const type of ['pointerdown','pointerup','click'])document.addEventListener(type,click,true);
 const fade=document.createElement('div'),title=document.createElement('div');fade.id='sky-scene-fade';title.id='sky-scene-location';fade.className=title.className='sky-cinematic-element';
 fade.style.cssText='position:fixed;inset:0;background:#000;opacity:1;pointer-events:none;z-index:130';
 title.style.cssText='position:fixed;left:10%;right:10%;top:22%;text-align:center;color:#fff;font:36px AveriaSky,serif;text-shadow:0 2px 5px #000,0 0 14px #000;opacity:0;pointer-events:none;z-index:131';document.body.append(fade,title);
 const ids=bindings;
 const age=time=>started===null?-1:time-started;
 const ease=t=>t*t*(3-2*t),clamp=t=>Math.max(0,Math.min(1,t));
 return {
  start(time){if(started===null)started=time;},
  receive(state,serverTime){if(started===null&&Number.isFinite(state?.started))started=performance.now()-Math.max(0,serverTime-state.started);},
  active(){return started===null||!clock.state().done;},
  state(){const s=clock.state();return {sceneTime:s.time,sceneDone:s.done,sceneIndex:s.index};},
  update(time,avatars,localId,camera,follow){
   if(started===null)return;const actors={player:avatars.get(localId),...Object.fromEntries(Object.entries(ids).map(([name,id])=>[name,avatars.get(id)]))};if(!actors.player)return;
   const elapsed=clock.tick(time,(e,index)=>onSpeech({id:'scene:'+started+':'+index,author:e.actor==='player'?localId:ids[e.actor],character:actors[e.actor]?.character??e.actor,text:e.text,manual:true}));
   if(clock.state().done){document.body.removeAttribute('data-sky-cinematic');bars.hidden=true;fade.style.opacity='0';title.style.opacity='0';title.hidden=true;for(const a of avatars.values()){a.scriptWalking=false;a.scriptControlled=false;}return;}
   const activeEvents=definition.events.slice(0,clock.state().index);for(const event of activeEvents)if(!activatedAt.has(event))activatedAt.set(event,time);
   for(const [name,a]of Object.entries(actors)){if(!a)continue;const walk=sceneScript.walkAt({events:activeEvents},name,elapsed);if(walk){Object.assign(a.position,walk.position);a.scriptWalking=walk.moving;a.scriptControlled=true;if(walk.moving)a.heading=walk.heading;}const face=activeEvents.filter(e=>e.type==='face'&&e.actor===name&&e.at<=elapsed).at(-1);if(face&&(!walk||face.at>=activeEvents.filter(e=>e.type==='walk'&&e.actor===name&&e.at<=elapsed).at(-1).at||!walk.moving))a.heading={dx:face.dx,dz:face.dz};}
   const cameras=activeEvents.filter(e=>e.type==='camera'&&e.at<=elapsed),e=cameras.at(-1);if(e){const before=cameras.at(-2)??e,t=ease(clamp((time-activatedAt.get(e))/(e.duration||1))),focus={};for(const k of ['x','y','z'])focus[k]=before.focus[k]+(e.focus[k]-before.focus[k])*t;const yaw=before.yaw+(e.yaw-before.yaw)*t,pitch=before.pitch+(e.pitch-before.pitch)*t,distance=before.distance+(e.distance-before.distance)*t;follow.set(focus.x,focus.y,focus.z);camera.position.set(focus.x+Math.sin(yaw)*Math.cos(pitch)*distance,focus.y+Math.sin(pitch)*distance,focus.z-Math.cos(yaw)*Math.cos(pitch)*distance);camera.lookAt(focus.x,focus.y,focus.z);}
   const f=activeEvents.filter(e=>e.type==='fade'&&e.at<=elapsed).at(-1);if(f){const t=ease(clamp((time-activatedAt.get(f))/(f.duration||1)));fade.style.opacity=String(f.direction==='in'?1-t:t);}
   const location=activeEvents.filter(e=>e.type==='title'&&e.at<=elapsed).at(-1);if(location){title.textContent=location.text;const t=time-activatedAt.get(location);const opacity=ease(clamp(t/1200))*ease(clamp((location.duration-t)/1400));title.style.opacity=String(opacity);title.dataset.phase=opacity>.95?'visible':'fading';title.hidden=t>=location.duration;}
  },
  dispose(){document.body.removeAttribute('data-sky-cinematic');for(const type of ['pointerdown','pointerup','click'])document.removeEventListener(type,click,true);bars.remove();fade.remove();title.remove();}
 };
}
