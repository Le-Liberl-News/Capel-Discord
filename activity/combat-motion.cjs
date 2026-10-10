const {dashPosition}=require('./black-fang.cjs');
function combatMotion(event,time,spec){
 if(!spec.leap)return dashPosition(event,time,spec);
 const t=Math.max(0,Math.min(1,(time-spec.windup)/spec.leapDuration)),active=time<spec.windup+spec.leapDuration;
 return {active,position:{x:event.origin.x+(event.aim.x-event.origin.x)*t,y:event.origin.y+(event.aim.y-event.origin.y)*t+(t>=1?0:Math.sin(t*Math.PI)*2.3),z:event.origin.z+(event.aim.z-event.origin.z)*t}};
}
module.exports={combatMotion};
