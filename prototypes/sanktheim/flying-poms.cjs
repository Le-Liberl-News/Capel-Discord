const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
// Flying attackers hover outside the outer facade, never above or through the wall.
function updateFlying(e,{state,dt,geometry,hurt,emit,damageMultiplier,damageWall,wallX}){
 const t=state.at,guards=state.soldiers.filter(g=>g.hp>0&&!g.transit),rampart=guards.filter(g=>g.y>7),ground=guards.filter(g=>g.y<=7),pool=rampart.length?rampart:ground;
 const target=pool.sort((a,b)=>dist(e,a)-dist(e,b))[0]??null,wall=state.walls.find(w=>w.id===e.wall)??state.walls[0],breach=state.walls.filter(w=>w.hp<=0).sort((a,b)=>Math.abs(a.z-e.z)-Math.abs(b.z-e.z))[0];
 e.climb=null;e.useLadder=false;e.onWall=false;e.target=target?.id??null;
 let goal;
 if(breach&&!rampart.length&&(!target||target.x>-35))goal=e.x<-35&&Math.abs(e.z-breach.z)>1.2?{x:-38,y:2.7,z:breach.z}:{x:0,y:2.7,z:breach.z};
 else if(target)goal={x:Math.min(-37,target.x-3),y:target.y>7?target.y+4.5:2.7,z:target.z};
 else if(breach)goal=e.x<-35&&Math.abs(e.z-breach.z)>1.2?{x:-38,y:2.7,z:breach.z}:{x:0,y:2.7,z:breach.z};
 else goal={x:-37,y:2.7,z:wall.z};
 const delta={x:goal.x-e.x,y:goal.y-e.y,z:goal.z-e.z},length=Math.hypot(delta.x,delta.y,delta.z),step=Math.min(length,2.4*dt),next=length?{x:e.x+delta.x/length*step,y:e.y+delta.y/length*step,z:e.z+delta.z/length*step}:{x:e.x,y:e.y,z:e.z};
 // Even above crenellations, crossing is allowed only through an actual ground-level breach.
 if(!breach||Math.abs(next.z-breach.z)>1.8||next.y>6)next.x=Math.min(next.x,-35.8);
 const hit=geometry?.sweep({x:e.x,y:e.y+.6,z:e.z},{x:next.x,y:next.y+.6,z:next.z},.45);
 if(!hit)Object.assign(e,next);else{e.x=hit.point.x;e.y=hit.point.y-.6;e.z=hit.point.z;}
 if(breach&&e.x>-7){e.escaped=true;e.hp=0;e.respawnAt=t+6000;state.counts.passed++;emit('passed',(e.pomCharacter??e.character)+' a franchi la brèche.',{pom:e.id,wall:breach.id});return;}
 const aim=target?{x:target.x,y:target.y+1.8,z:target.z}:{x:wallX(wall),y:2,z:wall.z},clear=!geometry?.sweep({x:e.x,y:e.y+.6,z:e.z},aim,.08),inRange=dist(e,aim)<(target?11:8);
 if(!inRange||!clear||t<e.nextAttack||!target&&wall.hp<=0)return;
 if(target){hurt(target,12*damageMultiplier);emit('attack','',{from:e.id,to:target.id,ranged:true});}
 else {const before=wall.hp;damageWall(wall,(state.balance?.wallBaseDamage??4)*damageMultiplier);emit('wall-hit','',{from:e.id,wall:wall.id,amount:before-wall.hp,position:aim});}
 if(t>=(e.nextFire??0)){const fire={id:'fire-'+e.id+'-'+t,x:aim.x,y:target?.y>7?11.75:0,z:aim.z,radius:1.65,at:t,nextDamage:t+700};if(state.fires.length<80&&!state.fires.some(f=>dist(f,fire)<1.2)){state.fires.push(fire);emit('fire-launch','',{from:e.id,origin:{x:e.x,y:e.y,z:e.z},aim:fire});}e.nextFire=t+9000;}
 e.nextAttack=t+2000;
}
module.exports={updateFlying};
