const {dashPosition}=require('./black-fang.cjs');
function combatMotion(event,time,spec){
 if(!spec.leap)return dashPosition(event,time,spec);
 const t=Math.max(0,Math.min(1,(time-spec.windup)/spec.leapDuration)),active=time<spec.windup+spec.leapDuration;
 const length=Math.hypot(event.aim.x-event.origin.x,event.aim.z-event.origin.z),offset=Math.min(spec.landingOffset??0,Math.max(0,length-.2)),ratio=length?1-offset/length:1;
 const destination=event.landingPoint??{x:event.origin.x+(event.aim.x-event.origin.x)*ratio,y:event.aim.y,z:event.origin.z+(event.aim.z-event.origin.z)*ratio};
 return {active,position:{x:event.origin.x+(destination.x-event.origin.x)*t,y:event.origin.y+(destination.y-event.origin.y)*t+(t>=1?0:Math.sin(t*Math.PI)*2.3),z:event.origin.z+(destination.z-event.origin.z)*t}};
}
module.exports={combatMotion};
