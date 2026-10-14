import {catRicochetPlan} from './cat-ricochet-ai.mjs';
import worldModule from '../utils/activityWorld.js';
import combat from './native-combat.cjs';
import status from './combat-status.cjs';
import {route,advance,nearestCell,pointAt,smoothRoute} from './movement.mjs';
import residents from './assets/sky/arena/residents.json';
import {bodyHeight} from './fps-combat.cjs';

// The same combat rules as online matches, with an isolated in-memory world.
// The AI is meant to feel like a human opponent, not a perfect one: it reacts late, aims loosely,
// hesitates before using a ready technique, takes short breathers and rarely goes for the Poms
// unless it has no craft of its own.
// Parry on crafts is off for the AI (too strong); the planning code stays for a future tuning.
const PARRY_CHANCE=0,PARRY_LEAD=[-80,320],DODGE_CHANCE=.5;
const PERCEPTION=[200,350],THINK=[300,650],HESITATION=[250,1150],BREATHER_EVERY=[6000,11000],BREATHER=[1200,2400],HOLD=[500,1200],AI_SPEED=.9;
export function createTraining({grid,geometry,character,opponent,now=Date.now,random=Math.random,ballSpawns=residents.ballSpawns,titles={},entrances={},introDuration=0,spawns=[{x:-1,z:3.25},{x:-1,z:-16.25}],ballChance=combat.combatSpec(opponent,'craft')?.1:.6}) {
 const between=([a,b])=>a+random()*(b-a);
 const place=p=>pointAt(grid,nearestCell(grid,p));
 const player={id:'training:player',character,...place(spawns[0]),hp:500,maxHp:500,noRespawn:true};
 const ai={id:'training:ai',character:opponent,name:opponent+' (IA)',...place(spawns[1]),hp:500,maxHp:500,noRespawn:true};
 const players=new Map([[player.id,player],[ai.id,ai]]);
 const world=worldModule.createActivityWorld({grid,geometry,now,combatEnabled:true,jumpEnabled:true,ballSpawns,disablePoms:!ballSpawns.length,canDamage:(a,b)=>a.id!==b.id});
 const startsAt=now(),readyAt=startsAt+introDuration,duel={id:"training:"+startsAt,startsAt,readyAt,players:[player.id,ai.id],names:[character,opponent+" (IA)"],titles:[titles[character],titles[opponent]],streaks:[0,0],phrases:[entrances[character]?.adversaires?.[opponent]??entrances[character]?.defaut,entrances[opponent]?.adversaires?.[character]??entrances[opponent]?.defaut]};
 let previous=now(),thinkAt=0,path=[],finish=null,count=0,velocity={x:0,z:0},last={...player},goal=null,trinity=null;
 let parryPlans=new Map(),pendingParry=null;
 let seen=[],ready={},restUntil=0,nextRest=readyAt+between(BREATHER_EVERY),wantsBall=false,ballDecisionAt=0,holdUntil=0;
 // what the AI believes: the player as seen a fraction of a second ago
 const perceived=time=>{const at=time-between(PERCEPTION);return seen.find(s=>s.t>=at)??seen.at(-1)??player;};
 // partial, random lead and an error that grows with distance
 const aimAt=(target,speed=0)=>{const distance=Math.hypot(ai.x-target.x,ai.z-target.z),lead=speed?Math.min(.7,distance/speed)*random()*.8:0,error=(.35+.06*distance)*random(),angle=random()*2*Math.PI;return {x:target.x+velocity.x*lead+Math.cos(angle)*error,y:target.y??0,z:target.z+velocity.z*lead+Math.sin(angle)*error};};
 const send=(command)=>world.action(ai,{id:'training:action:'+ ++count,...command},players);
 function navigate(target){if(path.length&&goal&&Math.hypot(goal.x-target.x,goal.z-target.z)<1.5)return;goal={...target};path=smoothRoute(grid,ai,route(grid,ai,target));}
 function think(time){if(player.smokeHiddenUntil>time){path=[];return;}
  if(ai.hp<=0||player.hp<=0||status.immobilized(ai,time)||time<(ai.combatLockedUntil??0))return;
  const target=perceived(time),snapshot=world.snapshot(),balls=snapshot.poms??[],held=balls.find(p=>p.owner===ai.id),distance=Math.hypot(ai.x-target.x,ai.z-target.z),busy=ai.attackBusyUntil>time;
  if(time>=nextRest){restUntil=time+between(BREATHER);nextRest=restUntil+between(BREATHER_EVERY);}
  const resting=time<restUntil;
  if(time>=ballDecisionAt){wantsBall=random()<ballChance;ballDecisionAt=time+5000;}
  if(ai.catCarrier?.active){
   trinity=null;
   if(held){const plan=catRicochetPlan(ai,grid,geometry);if(plan){if(plan.distance>.25)navigate(plan.stand);else{path=[];send({type:'throw',aim:plan.aim});}}return;}
   if(balls.some(p=>p.mode==='flight'&&p.thrownBy===ai.id)){path=[];return;}
   const ball=balls.filter(p=>p.mode==='rest').sort((a,b)=>Math.hypot(ai.x-a.x,ai.z-a.z)-Math.hypot(ai.x-b.x,ai.z-b.z))[0];if(ball){if(Math.hypot(ai.x-ball.x,ai.z-ball.z)<1.8){send({type:'pickup',target:ball.id});path=[];}else navigate(ball);}return;
  }
  if(held){path=[];if(time<holdUntil)return;const aim=aimAt(target,18);aim.y+=.9;send({type:'throw',aim});return;}
  const spire=snapshot.combat.attacks.find(a=>a.actor===ai.id&&a.special==='spire'&&!a.explodedAt&&time>a.impactAt+600);
  if(spire&&world.canDetonate(ai.id)&&(Math.hypot(target.x-spire.aim.x,target.z-spire.aim.z)<2.8||time>spire.objectExpiresAt-800)){send({type:'attack',kind:'craft',aim:spire.aim});return;}
  if(trinity&&time>trinity.until)trinity=null;
  if(trinity){path=[];if(!busy){const result=send({type:'attack',kind:'craft',aim:trinity.points[0]});if(!result.error){trinity.points.shift();if(!trinity.points.length)trinity=null;}else trinity=null;}return;}
  // a craft of the player about to land on the AI: maybe parry it, otherwise maybe dodge out of it
  const incoming=snapshot.combat.attacks.find(a=>a.actor===player.id&&a.kind==='craft'&&!a.cancelled&&!a.resolved&&time<a.impactAt&&Math.hypot(a.aim.x-ai.x,a.aim.z-ai.z)<4);
  if(incoming&&!parryPlans.has(incoming.id)){const plan=random()<PARRY_CHANCE?incoming.impactAt-between(PARRY_LEAD):null;parryPlans.set(incoming.id,plan);if(plan!=null)pendingParry={at:plan,id:incoming.id};}
  const dodge=combat.combatSpec(ai.character,'art');
  if(dodge?.dodge&&time>=(world.cooldownsFor(ai.id).art??0)&&!busy){
   const threatened=incoming&&parryPlans.get(incoming.id)==null&&incoming.impactAt-time<700&&random()<DODGE_CHANCE,cornered=distance<1.6&&ai.hp<player.hp&&random()<.12;
   if(threatened||cornered){const dx=ai.x-target.x,dz=ai.z-target.z,len=Math.hypot(dx,dz)||1,side=random()<.5?-1:1;if(!send({type:'attack',kind:'art',direction:{x:dx/len*.6+dz/len*side,z:dz/len*.6-dx/len*side}}).error){path=[];return;}}
  }
  if(!busy){const cooldowns=world.cooldownsFor(ai.id),kinds=['craft','art','basic'];
   for(const kind of kinds){const spec=combat.combatSpec(ai.character,kind);if(!spec||spec.dodge||time<(cooldowns[kind]??0)){delete ready[kind];continue;}
    if(resting&&spec.effect!=='heal')continue;
    if(spec.effect){if(spec.effect==='heal'&&ai.hp>330)continue;if(spec.effect==='guard'&&ai.guard?.until>time)continue;if(spec.effect.includes('Buff')&&ai.attackBuff?.until>time||spec.effect.includes('Buff')&&ai.defenseBuff?.until>time)continue;}
    else if(spec.minRange&&distance<spec.minRange||!spec.effect&&distance>spec.range+(spec.radius??0)*.3)continue;
    // a ready technique is used after a short, human hesitation
    ready[kind]??=time+between(HESITATION);if(time<ready[kind])continue;
    const aim=spec.effect?{x:ai.x,y:ai.y,z:ai.z}:aimAt(target,spec.projectileSpeed??0);
    const command={type:'attack',kind,aim,target:spec.effect?ai.id:player.id};
    if(ai.character==='Sieg'){const length=Math.hypot(aim.x-ai.x,aim.y-ai.y,aim.z-ai.z);command.type='sieg_dive';command.direction={x:(aim.x-ai.x)/length,y:(aim.y-ai.y)/length,z:(aim.z-ai.z)/length};}
    if(spec.fps){const origin={x:ai.x,y:ai.y+1.25,z:ai.z},end={...aim,y:player.y+bodyHeight(player)*.7},length=Math.hypot(end.x-origin.x,end.y-origin.y,end.z-origin.z);command.ray={origin,direction:{x:(end.x-origin.x)/length,y:(end.y-origin.y)/length,z:(end.z-origin.z)/length}};}
    if(spec.special==='trinity'){const origin={x:ai.x,y:ai.y,z:ai.z},dx=target.x-ai.x,dz=target.z-ai.z,len=Math.hypot(dx,dz)||1,first=place({x:target.x+dx/len*2-dz/len*3,z:target.z+dz/len*2+dx/len*3}),second=place({x:target.x+dx/len*2+dz/len*3,z:target.z+dz/len*2-dx/len*3});command.aim=first;if(!send(command).error){trinity={points:[second,origin],until:time+spec.comboWindow};path=[];return;}continue;}
    if(!send(command).error){delete ready[kind];break;}
   }
  }
  const ball=balls.filter(p=>p.mode==='rest').sort((a,b)=>Math.hypot(ai.x-a.x,ai.z-a.z)-Math.hypot(ai.x-b.x,ai.z-b.z))[0];
  if(ball&&wantsBall&&!resting&&distance>3&&Math.hypot(ai.x-ball.x,ai.z-ball.z)<8){if(Math.hypot(ai.x-ball.x,ai.z-ball.z)<1.8){send({type:'pickup',target:ball.id});holdUntil=time+between(HOLD);path=[];return;}navigate(ball);return;}
  // Strafe away from incoming attacks, otherwise approach melee range or keep ranged distance.
  const flying=balls.find(p=>p.mode==='flight'&&p.thrownBy!==ai.id&&Math.hypot(p.x-ai.x,p.z-ai.z)<6&&(ai.x-p.x)*p.vx+(ai.z-p.z)*p.vz>0);
  const danger=(flying||snapshot.combat.attacks.find(a=>a.actor!==ai.id&&!a.resolved&&Math.hypot(a.aim.x-ai.x,a.aim.z-ai.z)<2.5))&&random()<.5;
  const basic=combat.combatSpec(ai.character,'basic'),preferred=basic?.projectile?Math.min(7,basic.range*.65):1.1;
  if(danger||distance<preferred*.65){const dx=ai.x-target.x,dz=ai.z-target.z,len=Math.hypot(dx,dz)||1,side=random()<.5?-1:1;navigate({x:ai.x+dz/len*2*side+dx/len,z:ai.z-dx/len*2*side+dz/len});}
  // breather: hold position or drift sideways instead of chasing
  else if(resting){if(!path.length&&random()<.5){const dx=ai.x-target.x,dz=ai.z-target.z,len=Math.hypot(dx,dz)||1,side=random()<.5?-1:1;navigate({x:ai.x+dz/len*2.5*side,z:ai.z-dx/len*2.5*side});}}
  else if(distance>preferred+.5)navigate(target);else path=[];
 }
 function tick(position,command){if(position.heading)player.heading={...position.heading};const time=now(),dt=Math.min(.1,Math.max(.001,(time-previous)/1000));previous=time;
  if(player.cooking){if(position.cookingHeld)player.cooking.heldUntil=time+1500;else delete player.cooking;}
  seen.push({t:time,x:position.x,y:position.y??0,z:position.z});while(seen.length&&seen[0].t<time-1000)seen.shift();
  velocity={x:(position.x-last.x)/dt,z:(position.z-last.z)/dt};for(const axis of ['x','z'])velocity[axis]=Math.max(-4,Math.min(4,velocity[axis]));last={...position};
  if(!player.jump&&!player.siegDive&&!player.knockback&&time>=(player.combatLockedUntil??0)&&!status.immobilized(player,time))Object.assign(player,{x:position.x,y:position.y,z:position.z});
  let actionResult;if(command&&time>=readyAt){let result={};if(command.type==='say')result={text:command.text,speaker:player.id};else if(!finish)result=world.action(player,command,players);actionResult={id:command.id,...result};}
  if(pendingParry&&time>=pendingParry.at&&!finish&&ai.hp>0){world.action(ai,{type:'parry',id:'training:parry:'+pendingParry.id},players);pendingParry=null;}
  if(!finish&&time>=readyAt){world.tick(players);if(player.hp<=0||ai.hp<=0){finish={winner:player.hp>0?player.character:ai.name};path=[];}else{if(time>=thinkAt){thinkAt=time+between(THINK);think(time);}if(!status.immobilized(ai,time)&&time>=(ai.combatLockedUntil??0)){const before={...ai};advance(ai,path,dt,3.5*AI_SPEED*status.movementFactor(ai,time));const moved={dx:ai.x-before.x,dz:ai.z-before.z};ai.moving=Math.hypot(moved.dx,moved.dz)>.001;if(ai.moving)ai.heading=moved;}}}
  const canMove=time>=readyAt&&!finish&&player.hp>0&&!status.immobilized(player,time)&&time>=(player.combatLockedUntil??0);
  return {duel,...world.snapshot(),joueurs:[...players.values()].map(p=>({...p})),position:{x:player.x,y:player.y,z:player.z},actionResult,health:{...player,canMove,canDetonate:world.canDetonate(player.id),frozenUntil:player.stoneUntil??0,movementFactor:status.movementFactor(player,time),cooldowns:world.cooldownsFor(player.id),serverTime:time},messages:actionResult?.text?[{id:command.id,author:actionResult.speaker,character:player.character,text:actionResult.text}]:[],finish};
 }
 return {player,ai,tick,world,players};
}
