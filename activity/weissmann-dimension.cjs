const clamp=t=>Math.max(0,Math.min(1,t));
function liftPosition(lift,time){const t=clamp((time-lift.started)/lift.duration);return {...lift.origin,y:lift.origin.y+4*lift.height*t*(1-t)};}
function dimensionPose(time,direction){if(time<2000)return {bank:5,pose:Math.floor(time/130)%4,direction};return {bank:2,pose:Math.min(13,Math.floor((time-2000)/80)),direction};}
module.exports={liftPosition,dimensionPose};
