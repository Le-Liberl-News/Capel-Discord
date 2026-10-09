const FLIGHT_SPEED=4,FLIGHT_RADIUS=.15,FLIGHT_CENTER=.4;
function flightBounds(grid) {
 let low=Infinity,high=-Infinity;for(const y of grid.cells)if(Number.isFinite(y)){low=Math.min(low,y);high=Math.max(high,y);}
 return {minX:grid.origin.x-grid.step/2,maxX:grid.origin.x+(grid.width-.5)*grid.step,minZ:grid.origin.z-grid.step/2,maxZ:grid.origin.z+(grid.height-.5)*grid.step,minY:(Number.isFinite(low)?low:0)+.08,maxY:(Number.isFinite(high)?high:0)+25};
}
function insideFlight(p,b){return ['x','y','z'].every(k=>Number.isFinite(p[k]))&&p.x>=b.minX&&p.x<=b.maxX&&p.y>=b.minY&&p.y<=b.maxY&&p.z>=b.minZ&&p.z<=b.maxZ;}
const center=p=>({...p,y:p.y+FLIGHT_CENTER});
function clearFlight(from,to,geometry){const length=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);const hit=geometry?.sweep(center(from),center(to),FLIGHT_RADIUS);return !hit||hit.distance>=length-.025;}
function moveFlight(position,vector,seconds,bounds,geometry,record=()=>{}) {
 const magnitude=Math.hypot(vector.x,vector.y,vector.z);if(!magnitude)return {moving:false,dx:0,dz:0};
 const scale=FLIGHT_SPEED*Math.max(0,Math.min(.1,seconds))/Math.max(1,magnitude),from={...position};
 const next={x:Math.max(bounds.minX,Math.min(bounds.maxX,position.x+vector.x*scale)),y:Math.max(bounds.minY,Math.min(bounds.maxY,position.y+vector.y*scale)),z:Math.max(bounds.minZ,Math.min(bounds.maxZ,position.z+vector.z*scale))};
 let destination=next;
 for(let attempt=0;attempt<3;attempt++){
  const start={...position},length=Math.hypot(destination.x-start.x,destination.y-start.y,destination.z-start.z),hit=geometry?.sweep(center(start),center(destination),FLIGHT_RADIUS);
  const fraction=hit&&length?Math.max(0,Math.min(1,(hit.distance-.03)/length)):1;
  for(const k of ['x','y','z'])position[k]=start[k]+(destination[k]-start[k])*fraction;
  if(Math.hypot(position.x-start.x,position.y-start.y,position.z-start.z)>.00001)record({...position});
  if(!hit?.normal||fraction===1)break;
  const remaining={x:destination.x-position.x,y:destination.y-position.y,z:destination.z-position.z},n=hit.normal,dot=remaining.x*n.x+remaining.y*n.y+remaining.z*n.z;
  if(dot>=0)break;
  for(const k of ['x','y','z'])remaining[k]-=n[k]*dot;
  if(Math.hypot(remaining.x,remaining.y,remaining.z)<.00001)break;
  destination={x:position.x+remaining.x,y:position.y+remaining.y,z:position.z+remaining.z};
 }
 const moved=Math.hypot(position.x-from.x,position.y-from.y,position.z-from.z)>.00001;
 return {moving:moved,dx:vector.x/magnitude,dz:vector.z/magnitude};
}
function approachFlight(position,target,seconds,speed=6){if(!target)return {moving:false,dx:0,dz:0};const dx=target.x-position.x,dy=target.y-position.y,dz=target.z-position.z,length=Math.hypot(dx,dy,dz),fraction=length?Math.min(1,Math.max(0,seconds)*speed/length):0;position.x+=dx*fraction;position.y+=dy*fraction;position.z+=dz*fraction;return {moving:length>.00001,dx:length?dx/length:0,dz:length?dz/length:0};}
function landingPoint(grid,p){let best=grid.spawn,score=Infinity;for(let i=0;i<grid.cells.length;i++){const y=grid.cells[i];if(!Number.isFinite(y))continue;const q={x:grid.origin.x+i%grid.width*grid.step,y,z:grid.origin.z+Math.floor(i/grid.width)*grid.step},d=(q.x-p.x)**2+(q.z-p.z)**2+4*(q.y-p.y)**2;if(d<score){score=d;best=q;}}return {...best};}
module.exports={FLIGHT_SPEED,FLIGHT_RADIUS,flightBounds,insideFlight,clearFlight,moveFlight,approachFlight,landingPoint};
