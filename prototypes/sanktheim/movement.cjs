const surfaceWalk=require('../../activity/surface-walk.cjs');
const status=require('../../activity/combat-status.cjs');
function acceptMovement(me,move,{geometry,navigation,scale,now}){
 const elapsed=Math.min(3,Math.max(0,(now-(me.nativeSeen??now-150))/1000));
 const allowance=Math.min(18,(me.movementCredit??.25)+6*elapsed*status.movementFactor(me,now));
 me.nativeSeen=now;
 if(!move||!Number.isFinite(move.x)||!Number.isFinite(move.z)){me.movementCredit=allowance;return;}
 const last=me.movementSequence??0;
 if(Number.isSafeInteger(move.sequence)&&move.sequence<last)return;
 const raw=Array.isArray(move.trace)?move.trace:[];
 if(raw.length>1024)return;
 let sequence=0;
 for(const p of raw){if(!Number.isFinite(p.x)||!Number.isFinite(p.z)||!Number.isSafeInteger(p.sequence)||p.sequence<=sequence)return;sequence=p.sequence;}
 if(raw.length&&raw.every(p=>p.sequence<=last)){me.movementCredit=allowance;return;}
 const trace=scale!==1?raw.filter(p=>p.sequence>last):[];
 const points=[...trace,move],nav=navigation(me.onWall);let travelled=0,acceptedSequence=last;
 for(const next of points){
  const segment=Math.hypot(next.x-me.x,next.z-me.z);if(travelled+segment>allowance+.01)break;
  const ix=Math.round((next.x-nav.origin.x)/nav.step),iz=Math.round((next.z-nav.origin.z)/nav.step);if(ix<0||iz<0||ix>=nav.width||iz>=nav.height)break;
  const hit=geometry.sweep({x:me.x,y:me.y+.7,z:me.z},{x:next.x,y:me.y+.7,z:next.z},.22);
  const accepted=scale!==1?surfaceWalk.move(geometry,me,next):next;
  const height=scale!==1?geometry.floor(accepted.x,accepted.z,me.y+.8):nav.cells[iz*nav.width+ix];
  if(height==null||!accepted.falling&&Math.abs(height-me.y)>=.8||hit&&scale===1)break;
  const actual=Math.hypot(accepted.x-me.x,accepted.z-me.z);me.x=accepted.x;me.z=accepted.z;me.y=accepted.falling?accepted.y:height;me.falling=!!accepted.falling;travelled+=actual;
  if(Number.isSafeInteger(next.sequence))acceptedSequence=Math.max(acceptedSequence,next.sequence);
 }
 me.movementSequence=acceptedSequence;me.movementCredit=Math.max(0,allowance-travelled);me.moving=travelled>.015;me.heading=move.heading??me.heading;
}
module.exports={acceptMovement};
