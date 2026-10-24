const capture=require('./wall-capture.cjs');
// The poms that ride a vacuum (Pom-daspi, Pomfunèbre), played by someone: they fly, fast, in first person (the client,
// sky-scene.mjs), anywhere outside Sanktheim and over its wall, but not beyond it: the garrison's grappling hook catches
// whoever crosses it and flings them far back. Movements are in world metres (arena-bridge.cjs), the hook's flight in
// the map's own units (core.cjs, like a mine's launch).
const status=require('../../activity/combat-status.cjs');
const SPEED=14,MAX_Y=24,INSIDE_X=-7,BODY=.25,CENTER=.4;
const HOOK={duration:capture.DURATION,arc:7,anchor:{x:-10,y:12.5},thrown:-62};
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
 const from={x:me.x/scale,y:me.y/scale,z:me.z/scale};me.grapple=me.pomCraft=capture.createCatch(from,now);me.combatLockedUntil=now+capture.DURATION;me.input={x:0,z:0};me.jump=null;me.moving=false;
}
// The craft service owns the collision-aware flight; standalone consumers can still advance the same trajectory.
function grappled(p,t){const g=p.grapple;if(!g)return false;if(p.pomCraft?.type==='catch'&&g.lastAt===t)return true;if(!g.hold){p.grapple=capture.createCatch({x:p.x,y:p.y,z:p.z},t);return true;}Object.assign(p,capture.catchPoint(g,t));if(t-g.at>=capture.DURATION){p.grapple=null;if(p.pomCraft?.type==='catch')p.pomCraft=null;return false;}return true;}
module.exports={flyer,acceptFlight,grappled,SPEED,MAX_Y,INSIDE_X,HOOK};
