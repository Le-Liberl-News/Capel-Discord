const SPEED=3.5,DT=1/60;
function validWalk(c){return c&&Number.isFinite(c.dx)&&Number.isFinite(c.dz)&&Math.abs(c.dx)<=1&&Math.abs(c.dz)<=1;}
function insideShip(p,s){const dx=p.x-s.x,dz=p.z-s.z,c=Math.cos(s.yaw),n=Math.sin(s.yaw);return s.grounded&&Math.abs(p.y-s.y)<3&&((c*dx-n*dz)/3.8)**2+((n*dx+c*dz)/5.2)**2<1;}
function stepWalk(p,c,surface,ships=[]){if(!validWalk(c))return p;const length=Math.max(1,Math.hypot(c.dx,c.dz)),dx=c.dx/length*SPEED*DT,dz=c.dz/length*SPEED*DT;p.walking=false;
 for(const [x,z]of [[p.x+dx,p.z+dz],[p.x+dx,p.z],[p.x,p.z+dz]]){if(Math.hypot(x-p.x,z-p.z)<1e-7)continue;const y=surface.floor(x,z,p.y+.6);if(y===null||y-p.y>.5||p.y-y>1.1)continue;const next={x,y,z};if(ships.some(s=>insideShip(next,s)))continue;if(surface.sweep?.({...p,y:p.y+.65},{...next,y:y+.65},.15))continue;p.heading={dx:x-p.x,dz:z-p.z};Object.assign(p,next,{walking:true});break;}return p;
}
function exitPoint(ship,surface){if(!ship.grounded||ship.landing||ship.crashRemaining||Math.hypot(ship.vx,ship.vz)>1)return null;
 for(const r of [4.5,5.5,6.5])for(let i=0;i<12;i++){const angle=ship.yaw+i*Math.PI/6,x=ship.x+Math.cos(angle)*r,z=ship.z+Math.sin(angle)*r,y=surface.floor(x,z,ship.y+.6);if(y===null||Math.abs(y-ship.y)>1.1)continue;const p={x,y,z,heading:{dx:0,dz:-1},walking:false};if(!insideShip(p,ship))return p;}return null;
}
function canBoard(p,s){return p&&s.grounded&&!s.landing&&!s.crashRemaining&&Math.hypot(p.x-s.x,p.z-s.z)<=6.8&&Math.abs(p.y-s.y)<1.5;}
module.exports={SPEED,DT,validWalk,stepWalk,exitPoint,canBoard,insideShip};
