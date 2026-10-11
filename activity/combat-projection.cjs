function projectionPosition(projection,time){
 const t=Math.max(0,Math.min(1,(time-projection.started)/projection.duration)),ease=1-(1-t)*(1-t);
 return {x:projection.origin.x+(projection.end.x-projection.origin.x)*ease,y:projection.origin.y+(projection.end.y-projection.origin.y)*ease,z:projection.origin.z+(projection.end.z-projection.origin.z)*ease};
}
function projectionPath(player,direction,distance,floor,geometry){
 const length=Math.hypot(direction.x,direction.z);if(length<1e-6)return null;
 const origin={x:player.x,y:player.y??0,z:player.z},dx=direction.x/length,dz=direction.z/length;
 let end={...origin},wall=false;
 for(let travel=.15;travel<=distance+.15;travel+=.15){
  const step=Math.min(distance,travel),next={x:origin.x+dx*step,y:end.y,z:origin.z+dz*step};
  const hit=geometry?.sweep({...end,y:end.y+.8},{...next,y:next.y+.8},.25);
  if(hit){wall=true;
    // Stop with enough clearance to start walking away from the wall.
    const back={x:end.x-dx*.2,y:end.y,z:end.z-dz*.2},height=floor(back);
    if(Number.isFinite(height)&&Math.abs(height-end.y)<.35&&step>.3)end={...back,y:height};
    break;}
  const height=floor(next);if(height===null||!Number.isFinite(height)||Math.abs(height-end.y)>.45)break;
  end={...next,y:height};if(step===distance)break;
 }
 return {origin,end,wall};
}
function tornadoPosition(attack,spec,time){
 const length=Math.hypot(attack.aim.x-attack.origin.x,attack.aim.z-attack.origin.z),travel=Math.max(0,Math.min(length,(time-attack.started-spec.windup)/1000*spec.projectileSpeed)),t=length?travel/length:0;
 return {x:attack.origin.x+(attack.aim.x-attack.origin.x)*t,y:attack.origin.y+(attack.aim.y-attack.origin.y)*t,z:attack.origin.z+(attack.aim.z-attack.origin.z)*t};
}
function segmentDistance(point,from,to){const dx=to.x-from.x,dz=to.z-from.z,t=Math.max(0,Math.min(1,((point.x-from.x)*dx+(point.z-from.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(point.x-from.x-dx*t,point.z-from.z-dz*t);}
module.exports={projectionPosition,projectionPath,tornadoPosition,segmentDistance};
