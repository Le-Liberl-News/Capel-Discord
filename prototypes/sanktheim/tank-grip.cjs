// The tank's mechanical arms (tank.cjs): they seize a defender who comes too close, lift them up, slam them down on
// the ground and fling them far back. The pose only depends on the time since the seizure: the server applies it, the
// seized player's own client draws it at its frame rate (arena-front.mjs), and the arms follow it (tank-view.mjs).
// Units: the map's (native); scale: what to multiply them by for the world the client draws.
const LIFT=1100,SLAM=1350,THROW=2100,HEIGHT=5.5,HOP=1.6,DISTANCE=13,PULL=1.5;
const ease=k=>k*k*(3-2*k);
// grip: {at, from: where it stood, pull: towards the tank, away: unit direction it is flung, distance}
function gripPose(grip,t,scale=1){
 const age=Math.max(0,t-grip.at),top={x:grip.from.x+grip.pull.x,y:grip.from.y+HEIGHT*scale,z:grip.from.z+grip.pull.z};
 if(age<LIFT){const k=ease(age/LIFT);return {x:grip.from.x+grip.pull.x*k,y:grip.from.y+HEIGHT*scale*k,z:grip.from.z+grip.pull.z*k,phase:'lift'};}
 if(age<SLAM){const k=(age-LIFT)/(SLAM-LIFT);return {...top,y:grip.from.y+HEIGHT*scale*(1-k*k),phase:'slam'};}
 const k=Math.min(1,(age-SLAM)/(THROW-SLAM)),e=1-(1-k)*(1-k),d=grip.distance*e;
 return {x:top.x+grip.away.x*d,y:grip.from.y+HOP*scale*4*k*(1-k),z:top.z+grip.away.z*d,phase:k<1?'thrown':'done'};
}
module.exports={gripPose,LIFT,SLAM,THROW,HEIGHT,HOP,DISTANCE,PULL};
