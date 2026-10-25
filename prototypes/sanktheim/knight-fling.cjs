// The pom knight's blow (knight.cjs) flings a defender far away, spinning like a waltz. As the tank's grip
// (tank-grip.cjs), the pose only depends on the time: the server applies it, the flung player's client draws it.
// Units: the map's (native); scale: what to multiply them by for the world the client draws.
const FLIGHT=1800,HEIGHT=7,DISTANCE=22,SPINS=2.5;
// fling: {at, from, away: unit direction, distance}
function flingPose(fling,t,scale=1){
 const k=Math.min(1,Math.max(0,(t-fling.at)/FLIGHT)),e=1-(1-k)*(1-k),d=fling.distance*e;
 return {x:fling.from.x+fling.away.x*d,y:fling.from.y+HEIGHT*scale*4*k*(1-k),z:fling.from.z+fling.away.z*d,spin:SPINS*Math.PI*2*e,done:k>=1};
}
module.exports={flingPose,FLIGHT,HEIGHT,DISTANCE,SPINS};
