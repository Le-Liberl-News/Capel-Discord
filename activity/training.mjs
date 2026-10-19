import donCannon from './don-cannon.cjs';
import altinaSword from './altina-scraft.cjs';
import cs2 from './cs2-test-characters.cjs';
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
export function createTraining({grid,geometry,character,opponent,encounter=null,now=Date.now,random=Math.random,ballSpawns=residents.ballSpawns,titles={},entrances={},introDuration=0,spawns=[{x:-1,z:3.25},{x:-1,z:-16.25}],ballChance}) {
 const between=([a,b])=>a+random()*(b-a),place=p=>pointAt(grid,nearestCell(grid,p));
 const players=new Map(),bots=[],monsterSpawns=[];
 function actor(member,side,slot,id){const name=typeof member==='string'?member:member.character,base=spawns[side==='blue'?0:1],position=place({x:base.x+(slot%2?1:-1)*Math.ceil(slot/2)*2.5,z:base.z});const p={id,character:name,name:name+' (IA)',teamId:side,team:side,...position,hp:member.hp??500,maxHp:member.hp??500,noRespawn:true};players.set(id,p);bots.push(p);return p;}
 const player=actor(character,'blue',0,'training:player');player.name=character;bots.pop();
 for(const [i,member]of (encounter?.allies??[]).entries())actor(member,'blue',i+1,'training:ally:'+i);
 let ai=null;for(const [i,member]of (encounter?.enemies??[opponent]).entries()){
  if(member.monster){const base=spawns[1],p=place({x:base.x+(i-((encounter.enemies.length-1)/2))*2.5,z:base.z});monsterSpawns.push({...p,teamId:'red',team:'red',noRespawn:true,ranged:member.character==='MishyArdent'});}
  else {const p=actor(member,'red',i,'training:ai'+(i?':'+i:''));ai??=p;}
 }
 // Altina's companion is an independent, damageable combatant, never a Discord draw.
 for(const owner of [...players.values()].filter(p=>p.character==='Altina')){
  const guardian=actor({character:cs2.COMPANION,hp:650},owner.teamId,0,owner.id+':guardian');
  Object.assign(guardian,place({x:owner.x+1.3,z:owner.z+(owner.teamId==='red'?1.4:-1.4)}),{guardianFor:owner.id});cs2.protectWithGuardian(owner,guardian);
 }
 const world=worldModule.createActivityWorld({grid,geometry,now,combatEnabled:true,jumpEnabled:true,ballSpawns,disablePoms:!ballSpawns.length,enemySpawns:monsterSpawns,enemyRespawn:false,projectilesEnabled:true,canDamage:(a,b)=>a.teamId!==b.teamId});
 const roster=()=>[...players.values(),...world.snapshot().enemies],teams=['blue','red'].map(side=>roster().filter(p=>p.teamId===side));
 if(!teams[1].length)throw Error('La rencontre doit contenir un adversaire.');
 let startsAt=now(),readyAt=startsAt+introDuration;const grouped=!!encounter;
 const groups=teams.map((team,i)=>({players:team.map(p=>p.id),name:i===0?(encounter?.allyName??(team.length>1?'Votre équipe':character)):(encounter?.name??opponent+' (IA)'),title:team.map(p=>p.id===player.id?p.character:(p.name??p.character)).join(' · ')}));
 const duel={id:'training:'+startsAt,startsAt,readyAt,players:[teams[0][0].id,teams[1][0].id],names:grouped?groups.map(g=>g.name):[character,opponent+' (IA)'],titles:grouped?groups.map(g=>g.title):[titles[character],titles[opponent]],streaks:[0,0],phrases:grouped?[]:[entrances[character]?.adversaires?.[opponent]??entrances[character]?.defaut,entrances[opponent]?.adversaires?.[character]??entrances[opponent]?.defaut],...(grouped?{groups}: {})};
 let previous=now(),finish=null;
 function controller(ai){
 let player=null,thinkAt=0,path=[],count=0,velocity={x:0,z:0},last=null,goal=null,trinity=null;
 let parryPlans=new Map(),pendingParry=null;
 let seen=[],ready={},restUntil=0,nextRest=readyAt+between(BREATHER_EVERY),wantsBall=false,ballDecisionAt=0,holdUntil=0;
 const chance=ballChance??(combat.combatSpec(ai.character,'craft')?.1:.6);
 const perceived=time=>{const at=time-between(PERCEPTION);return seen.find(s=>s.t>=at)??seen.at(-1)??player;};
 // partial, random lead and an error that grows with distance
 const aimAt=(target,speed=0)=>{const distance=Math.hypot(ai.x-target.x,ai.z-target.z),lead=speed?Math.min(.7,distance/speed)*random()*.8:0,error=(.35+.06*distance)*random(),angle=random()*2*Math.PI;return {x:target.x+velocity.x*lead+Math.cos(angle)*error,y:target.y??0,z:target.z+velocity.z*lead+Math.sin(angle)*error};};
 const send=(command)=>world.action(ai,{id:ai.id+':action:'+ ++count,...command},players);
 function navigate(target){if(path.length&&goal&&Math.hypot(goal.x-target.x,goal.z-target.z)<1.5)return;goal={...target};path=smoothRoute(grid,ai,route(grid,ai,target));}
 function think(time){if(player.smokeHiddenUntil>time){path=[];return;}
  if(ai.character==='Altina'&&ai.hp>0&&!status.immobilized(ai,time)){const cast=world.snapshot().combat.attacks.find(a=>a.actor===ai.id&&a.special==='altinaSword'&&!a.cancelled&&!a.resolved);if(cast&&time-cast.started<altinaSword.PHASE.surfEnd){const target=perceived(time),length=Math.hypot(target.x-ai.x,target.z-ai.z)||1;const h=cast.surfHeading??{x:0,z:1},dx=(target.x-ai.x)/length,dz=(target.z-ai.z)/length,turn=Math.atan2(h.x*dz-h.z*dx,h.x*dx+h.z*dz);send({type:'attack',kind:'altinaSteer',turn:Math.max(-1,Math.min(1,turn*2))});}if(cast&&!cast.diveAt&&time-cast.started>=altinaSword.PHASE.aimStart)send({type:'attack',kind:'altinaDive',aim:aimAt(perceived(time))});}
  if(ai.hp<=0||player.hp<=0||status.immobilized(ai,time)||time<(ai.combatLockedUntil??0))return;
  const target=perceived(time),snapshot=world.snapshot(),balls=snapshot.poms??[],held=balls.find(p=>p.owner===ai.id),distance=Math.hypot(ai.x-target.x,ai.z-target.z),busy=ai.attackBusyUntil>time;
  if(ai.guardianFor){
   const owner=players.get(ai.guardianFor);if(!owner||owner.hp<=0){ai.hp=0;path=[];return;}if(owner.altinaSwordUntil){path=[];ai.moving=false;return;}
   const dx=ai.x-target.x,dz=ai.z-target.z,length=Math.hypot(dx,dz)||1;
   const melee=place({x:target.x+dx/length*1.7,z:target.z+dz/length*1.7});
   if(distance>2.1)navigate(melee);else path=[];
   if(!busy&&distance<2.7&&time>=(world.cooldownsFor(ai.id).basic??0))send({type:'attack',kind:'basic',aim:aimAt(target),target:player.id});
   return;
  }
  if(time>=nextRest){restUntil=time+between(BREATHER);nextRest=restUntil+between(BREATHER_EVERY);}
  const resting=time<restUntil;
  if(time>=ballDecisionAt){wantsBall=random()<chance;ballDecisionAt=time+5000;}
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
    if(spec.fps){const origin={x:ai.x,y:ai.y+1.25,z:ai.z},end={...aim,y:player.y+bodyHeight(player)*.7},length=Math.hypot(end.x-origin.x,end.y-origin.y,end.z-origin.z);command.ray={origin,direction:ai.character==='Don'?donCannon.aimDirection({...origin,y:ai.y+1.45},end):{x:(end.x-origin.x)/length,y:(end.y-origin.y)/length,z:(end.z-origin.z)/length}};}
    if(spec.special==='trinity'){const origin={x:ai.x,y:ai.y,z:ai.z},dx=target.x-ai.x,dz=target.z-ai.z,len=Math.hypot(dx,dz)||1,first=place({x:target.x+dx/len*2-dz/len*3,z:target.z+dz/len*2+dx/len*3}),second=place({x:target.x+dx/len*2+dz/len*3,z:target.z+dz/len*2-dx/len*3});command.aim=first;if(!send(command).error){trinity={points:[second,origin],until:time+spec.comboWindow};path=[];return;}continue;}
    if(!send(command).error){delete ready[kind];break;}
   }
  }
  const ball=balls.filter(p=>p.mode==='rest').sort((a,b)=>Math.hypot(ai.x-a.x,ai.z-a.z)-Math.hypot(ai.x-b.x,ai.z-b.z))[0];
  if(ball&&wantsBall&&!resting&&distance>3&&Math.hypot(ai.x-ball.x,ai.z-ball.z)<8){if(Math.hypot(ai.x-ball.x,ai.z-ball.z)<1.8){send({type:'pickup',target:ball.id});holdUntil=time+between(HOLD);path=[];return;}navigate(ball);return;}
  // Strafe away from incoming attacks, otherwise approach melee range or keep ranged distance.
  const flying=balls.find(p=>p.mode==='flight'&&p.thrownBy!==ai.id&&Math.hypot(p.x-ai.x,p.z-ai.z)<6&&(ai.x-p.x)*p.vx+(ai.z-p.z)*p.vz>0);
  const danger=(flying||snapshot.combat.attacks.find(a=>a.actor!==ai.id&&roster().find(p=>p.id===a.actor)?.teamId!==ai.teamId&&!a.resolved&&Math.hypot(a.aim.x-ai.x,a.aim.z-ai.z)<2.5))&&random()<.5;
  const basic=combat.combatSpec(ai.character,'basic'),preferred=basic?.projectile?Math.min(7,basic.range*.65):1.1;
  if(danger||distance<preferred*.65){const dx=ai.x-target.x,dz=ai.z-target.z,len=Math.hypot(dx,dz)||1,side=random()<.5?-1:1;navigate({x:ai.x+dz/len*2*side+dx/len,z:ai.z-dx/len*2*side+dz/len});}
  // breather: hold position or drift sideways instead of chasing
  else if(resting){if(!path.length&&random()<.5){const dx=ai.x-target.x,dz=ai.z-target.z,len=Math.hypot(dx,dz)||1,side=random()<.5?-1:1;navigate({x:ai.x+dz/len*2.5*side,z:ai.z-dx/len*2.5*side});}}
  else if(distance>preferred+.5)navigate(target);else path=[];
 }

 return {step(time,dt){
 const targets=roster().filter(p=>p.teamId!==ai.teamId&&p.hp>0&&!p.spectator&&(ai.catCarrier?.active||p.catCling?.target!==ai.id)).sort((a,b)=>Math.hypot(ai.x-a.x,ai.z-a.z)-Math.hypot(ai.x-b.x,ai.z-b.z));
 const target=targets[0];if(!target||ai.hp<=0){path=[];ai.moving=false;return;}
 if(player?.id!==target.id){seen=[];last=null;velocity={x:0,z:0};}player=target;
 seen.push({t:time,x:player.x,y:player.y??0,z:player.z});while(seen.length&&seen[0].t<time-1000)seen.shift();
 if(last)velocity={x:Math.max(-4,Math.min(4,(player.x-last.x)/dt)),z:Math.max(-4,Math.min(4,(player.z-last.z)/dt))};last={...player};
 if(pendingParry&&time>=pendingParry.at){world.action(ai,{type:'parry',id:'training:parry:'+pendingParry.id},players);pendingParry=null;}
 if(time>=thinkAt){thinkAt=time+between(THINK);think(time);}
 if(!status.immobilized(ai,time)&&time>=(ai.combatLockedUntil??0)&&!ai.knockback&&!ai.jump){const before={...ai};advance(ai,path,dt,3.5*AI_SPEED*status.movementFactor(ai,time));const moved={dx:ai.x-before.x,dz:ai.z-before.z};ai.moving=Math.hypot(moved.dx,moved.dz)>.001;if(ai.moving)ai.heading=moved;}else ai.moving=false;
 }};
 }
 const controllers=bots.map(controller);
 function tick(position,command){if(position.heading)player.heading={...position.heading};const time=now(),dt=Math.min(.1,Math.max(.001,(time-previous)/1000));previous=time;require('./combat-moves.cjs').turnGuard(player,player.heading,time);
 if(player.cooking){if(position.cookingHeld)player.cooking.heldUntil=time+1500;else delete player.cooking;}
 if(player.hp>0&&!(player.guardHold?.until>time)&&!player.jump&&!player.siegDive&&!player.knockback&&time>=(player.combatLockedUntil??0)&&!status.immobilized(player,time))Object.assign(player,{x:position.x,y:position.y,z:position.z});
 let actionResult;if(command&&time>=readyAt){let result={};if(command.type==='say')result={text:command.text,speaker:player.id};else if(!finish)result=world.action(player,command,players);actionResult={id:command.id,...result};}
 if(!finish&&time>=readyAt){for(const p of players.values())if(p.guardianFor&&!(players.get(p.guardianFor)?.hp>0))p.hp=0;world.tick(players);const alive=roster().filter(p=>p.hp>0),blue=alive.some(p=>p.teamId==='blue'),red=alive.some(p=>p.teamId==='red');if(!blue||!red){finish={winner:blue?character:(encounter?.name??ai?.name??'Les monstres'),text:grouped?(blue?'Victoire de votre équipe':'Défaite de votre équipe'):undefined};for(const p of bots)p.moving=false;}else for(const brain of controllers)brain.step(time,dt);}
 const canMove=time>=readyAt&&!finish&&player.hp>0&&!status.immobilized(player,time)&&time>=(player.combatLockedUntil??0);
 return {duel,...world.snapshot(),joueurs:[...players.values()].map(p=>({...p})),position:{x:player.x,y:player.y,z:player.z},actionResult,health:{...player,canMove,canDetonate:world.canDetonate(player.id),frozenUntil:player.stoneUntil??0,movementFactor:status.movementFactor(player,time),cooldowns:world.cooldownsFor(player.id),serverTime:time},messages:actionResult?.text?[{id:command.id,author:actionResult.speaker,character:player.character,text:actionResult.text}]:[],finish};
 }
 return {player,ai,tick,world,players,beginIntro(){startsAt=now();readyAt=startsAt+introDuration;duel.startsAt=startsAt;duel.readyAt=readyAt;previous=startsAt;},characters:roster().map(p=>p.character),encounter};
}
