function loewePose(time){return {bank:12,pose:time<780?Math.min(32,21+Math.floor(time/65)):31+Math.floor((time-780)/100)%2,direction:0};}
function fallPose(fall,time){const t=Math.max(0,Math.min(1,(time-fall.started)/fall.duration));return {active:t<1,angle:(fall.sign??1)*Math.PI*2*t,hop:Math.sin(t*Math.PI)*.5};}
module.exports={loewePose,fallPose};
