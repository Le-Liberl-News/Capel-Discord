// The same timed segment is used by the authoritative world and the renderer.
function dashPosition(event,time,spec){
 const progress=Math.max(0,Math.min(1,(time-spec.windup)/spec.dashDuration));
 return {position:{x:event.origin.x+(event.aim.x-event.origin.x)*progress,y:event.origin.y+(event.aim.y-event.origin.y)*progress,z:event.origin.z+(event.aim.z-event.origin.z)*progress},progress,active:time<spec.windup+spec.dashDuration};
}
module.exports={dashPosition};
