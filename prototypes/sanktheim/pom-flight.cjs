// The poms that ride a vacuum (Pom-daspi, Pomfunèbre), played by someone: they fly, fast, in first person (the client,
// sky-scene.mjs), anywhere outside Sanktheim and over its wall, but not beyond it: the garrison's grappling hook catches
// whoever crosses it and flings them far back. Movements are in world metres (arena-bridge.cjs), the hook's flight in
// the map's own units (core.cjs, like a mine's launch).
const status=require('../../activity/combat-status.cjs');
const SPEED=14,MAX_Y=24,INSIDE_X=-7,BODY=.25,CENTER=.4;
const HOOK={duration:1100,arc:7,anchor:{x:-10,y:12.5},thrown:-62};
const flyer=p=>!!p?.pomControlled&&(!!p.flying||p.kind==='funebre');
// over a breached stretch, low down, a pom goes through like the others
const breach=(walls,z)=>walls.some(w=>w.hp<=0&&Math.abs(z-w.z)<=w.width/2);
function acceptFlight(me,move,{geometry,scale,now,walls=[]}){
 const elapsed=Math.min(3,Math.max(0,(now-(me.nativeSeen??now-150))/1000));
 const allowance=Math.min(SPEED*2,(me.movementCredit??.25)+SPEED*1.15*elapsed*status.movementFactor(me,now));
 me.nativeSeen=now;
 if(!move||![move.x,move.y,move.z].every(Number.isFinite)){me.movementCredit=allowance;return;}
 const last=me.movementSequence??0;
 if(Number.isSafeInteger(move.sequence)&&move.sequence<last)return;
 const raw=Array.isArray(move.trace)?move.trace:[];
 if(raw.length>1024)return;
 let sequence=0;
 for(const p of raw){if(![p.x,p.y,p.z].every(Number.isFinite)||!Number.isSafeInteger(p.sequence)||p.sequence<=sequence)return;sequence=p.sequence;}
 if(raw.length&&raw.every(p=>p.sequence<=last)){me.movementCredit=allowance;return;}
 let travelled=0,acceptedSequence=last;
 for(const next of [...raw.filter(p=>p.sequence>last),move]){
  const floor=geometry.floor(next.x,next.z,next.y+.5),y=Math.min(MAX_Y*scale,Math.max(next.y,Number.isFinite(floor)?floor:next.y));
  const segment=Math.hypot(next.x-me.x,y-me.y,next.z-me.z);if(travelled+segment>allowance+.01)break;
  if(next.x/scale>INSIDE_X&&!(y/scale<4&&breach(walls,next.z/scale))){hook(me,scale,now);break;}
  if(geometry.sweep({x:me.x,y:me.y+CENTER,z:me.z},{x:next.x,y:y+CENTER,z:next.z},BODY))break;
  Object.assign(me,{x:next.x,y,z:next.z});me.falling=false;travelled+=segment;
  if(Number.isSafeInteger(next.sequence))acceptedSequence=Math.max(acceptedSequence,next.sequence);
 }
 me.movementSequence=acceptedSequence;me.movementCredit=Math.max(0,allowance-travelled);me.moving=travelled>.015;me.heading=move.heading??me.heading;
}
// caught: from where it is (map units) back over the fields, the hook's rope from the rampart's top
function hook(me,scale,now){
 const from={x:me.x/scale,y:me.y/scale,z:me.z/scale};
 me.grapple={at:now,from,anchor:{x:HOOK.anchor.x,y:HOOK.anchor.y,z:from.z},to:{x:HOOK.thrown,y:Math.max(4,from.y),z:from.z}};
 me.combatLockedUntil=now+HOOK.duration;me.input={x:0,z:0};me.jump=null;me.moving=false;
}
// the flight on the rope, step by step (core.cjs, map units); true while it lasts
function grappled(p,t){
 const g=p.grapple;if(!g)return false;
 const k=Math.min(1,(t-g.at)/HOOK.duration),pull=k<.25?k/.25:1;
 // a short tug towards the rampart, then flung away
 const start={x:g.from.x+(g.anchor.x-g.from.x)*.15*Math.min(1,k/.25),y:g.from.y,z:g.from.z},s=k<.25?0:(k-.25)/.75;
 Object.assign(p,{x:start.x+(g.to.x-start.x)*s,y:start.y+(g.to.y-start.y)*s+HOOK.arc*4*s*(1-s)*pull,z:g.from.z,moving:false});
 if(k>=1){p.grapple=null;return false;}
 return true;
}
module.exports={flyer,acceptFlight,grappled,SPEED,MAX_Y,INSIDE_X,HOOK};
