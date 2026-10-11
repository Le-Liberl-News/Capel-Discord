const {projectilePosition,divePosition}=require('../activity/special-crafts.cjs');
const {segmentDistance}=require('../activity/combat-projection.cjs');
const {immobilized,applyStatus}=require('../activity/combat-status.cjs');
function createSpecialCrafts({now,geometry,floor,canDamage,hurt,attacks,onCraft=()=>{}}){
 const entities=new Map(),highlights=new Map();let last=now();
 const activeSpire=id=>[...attacks.values()].find(a=>a.actor===id&&a.special==='spire'&&!a.explodedAt&&!a.cancelled&&now()>=a.impactAt&&now()<a.objectExpiresAt);
 function damageArea(a,actor,room,point,radius,damage,time,freeze=false){
  for(const target of room.values()){
   if(target.hp<=0||target.spectator||target.duelProtected||target.id===actor.id||!canDamage(actor,target)||Math.hypot(target.x-point.x,target.z-point.z)>radius+(target.boss?1:0)||Math.abs((target.y??0)-point.y)>2)continue;
   const wall=geometry?.sweep({...point,y:point.y+.8},{x:target.x,y:(target.y??0)+.8,z:target.z},.08);if(wall)continue;
   if(freeze){applyStatus(target,{status:'stone',statusDuration:5000},time);target.stoneSource=a.id;a.hits.push({id:target.id,at:time,frozen:true});}
   else {const dealt=hurt(a,actor,target,damage,time,{point:{x:target.x,y:(target.y??0)+.8,z:target.z}});a.hits.push({id:target.id,at:time,...dealt});}
  }
 }
 function detonate(actor,room){const a=activeSpire(actor.id);if(!a)return false;a.explodedAt=now();a.endsAt=now()+700;for(const target of room.values())if(target.stoneSource===a.id){target.stoneUntil=0;delete target.stoneSource;}damageArea(a,actor,room,a.aim,2.8,36,now());return true;}
 function setup(a,s,command,room){
  a.special=s.special;
  if(s.special==='spire'){a.impactAt=a.started+s.windup;a.objectExpiresAt=a.impactAt+12000;a.endsAt=a.objectExpiresAt+700;}
  if(s.special==='summon')a.impactAt=a.started+s.windup;
  if(s.special==='boomerang'){a.flightEndsAt=a.started+s.windup+2200;a.endsAt=a.flightEndsAt+600;}
  if(['fireball','crescent'].includes(s.special)){a.flightEndsAt=a.started+s.windup+Math.hypot(a.aim.x-a.origin.x,a.aim.z-a.origin.z)/(s.projectileSpeed??10)*1000;a.endsAt=a.flightEndsAt+700;}
  if(s.special==='dive'){const t=room.get(command.target);if(t&&t.hp>0&&!t.spectator&&!t.duelProtected&&canDamage(room.get(a.actor),t)&&Math.hypot(t.x-a.origin.x,t.z-a.origin.z)<=s.range)a.target=t.id;a.impactAt=a.started+s.windup+s.leapDuration;}
 }
 function tickAttack(a,s,room,time){
  if(!s.special)return false;
  if(a.cancelled)return true;
  const actor=room.get(a.actor);if(!actor||actor.hp<=0||actor.character!==a.character||actor.spectator){a.cancelled=true;a.endsAt=time;return true;}
  if(s.special==='dive'){
   if(a.resolved)return true;
   const target=room.get(a.target);if(target&&target.hp>0&&Math.hypot(target.x-a.origin.x,target.z-a.origin.z)<=s.range*1.5){const y=floor({x:target.x,y:target.y??0,z:target.z});if(Number.isFinite(y))a.aim={x:target.x,y,z:target.z};}
   Object.assign(actor,divePosition(a,time-a.started,s));actor.acceptedAt=time;
   if(time>=a.impactAt){actor.combatLockedUntil=0;a.resolved=true;damageArea(a,actor,room,a.aim,s.radius,s.damage,time);}
   return true;
  }
  if(s.special==='spire'){
   if(!a.resolved&&time>=a.impactAt){a.resolved=true;damageArea(a,actor,room,a.aim,s.radius,0,a.impactAt,true);}return true;
  }
  if(s.special==='summon'){
   if(a.resolved||time<a.impactAt)return true;a.resolved=true;
   if([...entities.values()].filter(e=>e.owner===actor.id&&e.hp>0).length>=3){a.cancelled=true;return true;}
   const e={id:'world:summon:'+a.id,owner:actor.id,character:'Tomate amère',name:'Tomate amère',enemy:true,summoned:true,hp:45,maxHp:45,x:a.aim.x,y:a.aim.y,z:a.aim.z,spawnedAt:time,expiresAt:time+90000,heading:{dx:0,dz:-1},moving:false,speed:2.8,nextHit:time+1000};entities.set(e.id,e);room.set(e.id,e);return true;
  }
  if(a.resolved||time<a.started+s.windup)return true;
  const end=projectilePosition(a,s,Math.min(time,a.flightEndsAt),{x:actor.x,y:actor.y??0,z:actor.z}),from=a.projectile??{...a.origin,y:a.origin.y+.9};
  const wall=geometry?.sweep(from,end,.12);let collision=wall?.point;
  for(const target of room.values()){
   if(target.hp<=0||target.spectator||target.duelProtected||target.id===actor.id||!canDamage(actor,target)||Math.abs((target.y??0)+.8-end.y)>1.5||segmentDistance(target,from,end)>(s.special==='crescent'?.65:s.radius??.4)+(target.boss?1:0))continue;
   if(geometry?.sweep(from,{x:target.x,y:(target.y??0)+.8,z:target.z},.08))continue;
   if(s.special==='boomerang'){
    const pass=time-a.started-s.windup<1100?0:1;if(a.hits.some(h=>h.id===target.id&&h.pass===pass))continue;const dealt=hurt(a,actor,target,s.damage/2,time,{point:{x:target.x,y:(target.y??0)+.8,z:target.z}});a.hits.push({id:target.id,at:time,pass,...dealt});
   }else {collision={x:target.x,y:(target.y??0)+.8,z:target.z};break;}
  }
  a.projectile=collision??end;
  if(collision||time>=a.flightEndsAt){a.resolved=true;a.explodedAt=s.special==='boomerang'?undefined:time;a.explosionPoint={...a.projectile,y:(a.projectile.y??0)-.8};if(s.special!=='boomerang')damageArea(a,actor,room,a.explosionPoint,s.special==='crescent'?2:s.radius,s.damage,time);a.endsAt=time+700;}
  return true;
 }
 function tickEntities(room){const time=now(),dt=Math.max(0,Math.min(.1,(time-last)/1000));last=time;
  for(const[id,e]of entities){const owner=room.get(e.owner);if(!owner||owner.hp<=0||owner.character!=='Ray'||time>=e.expiresAt){entities.delete(id);room.delete(id);continue;}if(e.hp<=0){e.deathAt??=time;e.deadUntil=e.deathAt+30000;e.moving=false;if(time-e.deathAt>=1500){entities.delete(id);room.delete(id);}continue;}if(time<e.spawnedAt+700||immobilized(e,time))continue;
   const target=[...room.values()].filter(t=>t.hp>0&&!t.spectator&&!t.duelProtected&&canDamage(owner,t)).sort((a,b)=>Math.hypot(a.x-e.x,a.z-e.z)-Math.hypot(b.x-e.x,b.z-e.z))[0];const goal=target??owner,dx=goal.x-e.x,dz=goal.z-e.z,d=Math.hypot(dx,dz);e.heading={dx,dz};e.moving=d>1.1;
   if(e.moving){const move=Math.min(d-1,dt*2.8),q={x:e.x+dx/d*move,y:e.y,z:e.z+dz/d*move},y=floor(q);if(Number.isFinite(y)&&Math.abs(y-e.y)<.4&&!geometry?.sweep({...e,y:e.y+.5},{...q,y:y+.5},.15))Object.assign(e,{...q,y});}
   if(target&&d<1.5&&time>=e.nextHit){e.nextHit=time+900;const attack={id:e.id+':hit:'+time,actor:owner.id,character:'Ray',kind:'craft',technique:'Tomate am\u00e8re',started:time,impactAt:time,endsAt:time+1800,origin:{x:e.x,y:e.y,z:e.z},aim:{x:target.x,y:target.y??0,z:target.z},resolved:true,highlight:true,hits:[]};const dealt=hurt(attack,owner,target,8,time,{point:{x:target.x,y:(target.y??0)+.7,z:target.z}});
    const previous=highlights.get(owner.id)??{count:0,at:-Infinity};
    if(dealt.damage&&previous.count<3&&time-previous.at>=20000){highlights.set(owner.id,{count:previous.count+1,at:time});attack.hits.push({id:target.id,at:time,...dealt});attacks.set(attack.id,attack);onCraft({...attack,text:'Les tomates de Ray passent \u00e0 l\u2019attaque !'});}}
  }
 }
 return {entities,setup,tickAttack,tickEntities,detonate,activeSpire};
}
module.exports={createSpecialCrafts};
