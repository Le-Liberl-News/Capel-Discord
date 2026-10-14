import worldModule from '../utils/activityWorld.js';
import combat from './native-combat.cjs';
import status from './combat-status.cjs';
import {route,advance,nearestCell,pointAt,smoothRoute} from './movement.mjs';
import ctfMechanics from './ctf-mechanics.cjs';
import {bodyHeight} from './fps-combat.cjs';

// Capture the flag, played locally like the training: the player and two AI allies against three AIs,
// on the same combat rules as online matches (ctf-mechanics.cjs for the flag itself).
const {CTF,createFlag,tickFlag}=ctfMechanics;
const THINK=[300,650],HESITATION=[250,900],AI_SPEED=.9,TEAM_NAMES={red:'l’équipe rouge',blue:'l’équipe bleue'};
// techniques the simple team AI cannot drive (aimed dives, first-person shots, cooking, detonations, combos)
const AI_UNSUITED=new Set(['Sieg','Josette','Phyllis','Campanella','Julia']);
export function ctfOpponents(catalogue){return Object.keys(combat.COMBAT).filter(name=>catalogue[name]&&!AI_UNSUITED.has(name)&&combat.combatSpec(name,'basic'));}
export function createCaptureTheFlag({grid,geometry,character,team,venue,candidates,now=Date.now,random=Math.random}){
 const between=([a,b])=>a+random()*(b-a);
 const place=p=>pointAt(grid,nearestCell(grid,p));
 const spawnOf=(side,slot)=>place({x:venue[side].x+(slot-1)*1.5,z:venue[side].z});
 const other=side=>side==='red'?'blue':'red';
 const pool=[...candidates].sort(()=>random()-.5);
 const players=new Map(),bots=[];
 const player={id:'ctf:player',character,team,slot:0,...spawnOf(team,0),hp:500,maxHp:500};players.set(player.id,player);
 const roster=[[team,1],[team,2],[other(team),0],[other(team),1],[other(team),2]];
 roster.forEach(([side,slot],n)=>{const name=pool[n%pool.length],bot={id:'ctf:ai:'+n,character:name,name:name+' (IA)',team:side,slot,...spawnOf(side,slot),hp:500,maxHp:500};players.set(bot.id,bot);bots.push({fighter:bot,thinkAt:0,path:[],goal:null,ready:{},count:0});});
 const world=worldModule.createActivityWorld({grid,geometry,now,combatEnabled:true,jumpEnabled:true,ballSpawns:[],disablePoms:true,canDamage:(a,b)=>!!a.team&&!!b.team&&a.team!==b.team});
 const startedAt=now(),flag=createFlag(place(venue.centre),startedAt),respawns=new Map([...players.values()].map(p=>[p.id,p.respawn??0]));
 let previous=startedAt,finish=null,ignoreClientUntil=0;
 const alive=p=>p.hp>0&&!p.spectator;
 const enemiesOf=p=>[...players.values()].filter(o=>o.team!==p.team&&alive(o));
 const nearest=(p,list)=>list.reduce((best,o)=>!best||Math.hypot(o.x-p.x,o.z-p.z)<Math.hypot(best.x-p.x,best.z-p.z)?o:best,null);
 // loose aim: a little lead and an error growing with distance, like the training AI
 const aimAt=(from,target)=>{const d=Math.hypot(from.x-target.x,from.z-target.z),error=(.3+.05*d)*random(),angle=random()*2*Math.PI;return {x:target.x+Math.cos(angle)*error,y:target.y??0,z:target.z+Math.sin(angle)*error};};
 function navigate(bot,target){const f=bot.fighter;if(bot.path.length&&bot.goal&&Math.hypot(bot.goal.x-target.x,bot.goal.z-target.z)<1.2)return;bot.goal={...target};bot.path=smoothRoute(grid,f,route(grid,f,place(target)));}
 function send(bot,command){return world.action(bot.fighter,{id:bot.fighter.id+':'+ ++bot.count,...command},players);}
 function think(bot,time){
  const f=bot.fighter;if(!alive(f)||status.immobilized(f,time)||time<(f.combatLockedUntil??0))return;
  const enemies=enemiesOf(f),holder=flag.holder&&players.get(flag.holder),threat=nearest(f,enemies);
  // where to go: the free flag, escort an ally carrier, hunt an enemy carrier, or run while carrying it
  if(holder?.id===f.id){if(threat&&Math.hypot(threat.x-f.x,threat.z-f.z)<7){const dx=f.x-threat.x,dz=f.z-threat.z,l=Math.hypot(dx,dz)||1,side=random()<.5?-1:1;navigate(bot,{x:f.x+dx/l*4+dz/l*1.5*side,z:f.z+dz/l*4-dx/l*1.5*side});}else bot.path=[];}
  else if(!holder)navigate(bot,flag);
  else if(holder.team===f.team){const near=nearest(holder,enemies);if(near&&Math.hypot(near.x-holder.x,near.z-holder.z)<8)navigate(bot,near);else if(Math.hypot(holder.x-f.x,holder.z-f.z)>2.5)navigate(bot,holder);else bot.path=[];}
  else navigate(bot,holder);
  // fight: the enemy carrier first, otherwise the closest enemy
  const target=holder&&holder.team!==f.team&&Math.hypot(holder.x-f.x,holder.z-f.z)<10?holder:threat;if(!target)return;
  const distance=Math.hypot(target.x-f.x,target.z-f.z);
  if(f.attackBusyUntil>time)return;
  const dodge=combat.combatSpec(f.character,'art'),cooldowns=world.cooldownsFor(f.id);
  if(dodge?.dodge&&time>=(cooldowns.art??0)&&f.hp<200&&distance<1.8&&random()<.15){const dx=f.x-target.x,dz=f.z-target.z;if(!send(bot,{type:'attack',kind:'art',direction:{x:dx,z:dz}}).error){bot.path=[];return;}}
  for(const kind of ['craft','basic']){
   const spec=combat.combatSpec(f.character,kind);if(!spec||spec.dodge||time<(cooldowns[kind]??0)){delete bot.ready[kind];continue;}
   if(spec.effect){if(spec.effect==='heal'&&f.hp>300)continue;if(spec.effect!=='heal'&&random()<.7)continue;}
   else if(spec.minRange&&distance<spec.minRange||distance>spec.range+(spec.radius??0)*.3)continue;
   bot.ready[kind]??=time+between(HESITATION);if(time<bot.ready[kind])continue;
   const aim=spec.effect?{x:f.x,y:f.y,z:f.z}:aimAt(f,target),command={type:'attack',kind,aim,target:spec.effect?f.id:target.id};
   if(spec.fps){const origin={x:f.x,y:(f.y??0)+1.25,z:f.z},end={...aim,y:(target.y??0)+bodyHeight(target)*.7},l=Math.hypot(end.x-origin.x,end.y-origin.y,end.z-origin.z)||1;command.ray={origin,direction:{x:(end.x-origin.x)/l,y:(end.y-origin.y)/l,z:(end.z-origin.z)/l}};}
   if(!send(bot,command).error){delete bot.ready[kind];if(kind==='basic')bot.path=[];break;}
  }
 }
 function respawn(time){
  for(const p of players.values()){const count=p.respawn??0;if(count===respawns.get(p.id))continue;respawns.set(p.id,count);Object.assign(p,spawnOf(p.team,p.slot??0));if(p===player)ignoreClientUntil=time+600;}
 }
 function tick(position,command){
  const time=now(),dt=Math.min(.1,Math.max(.001,(time-previous)/1000));previous=time;
  if(position?.heading)player.heading={...position.heading};
  if(position&&time>=ignoreClientUntil&&alive(player)&&!player.jump&&!player.knockback&&time>=(player.combatLockedUntil??0)&&!status.immobilized(player,time))Object.assign(player,{x:position.x,y:position.y,z:position.z});
  let actionResult;if(command){let result={};if(command.type==='say')result={text:command.text,speaker:player.id};else if(!finish)result=world.action(player,command,players);actionResult={id:command.id,...result};}
  if(!finish){
   world.tick(players);respawn(time);tickFlag(flag,players,time);
   if(flag.finished)finish=flag.finished.winner?{winner:TEAM_NAMES[flag.finished.winner],team:flag.finished.winner}:{text:'Égalité !'};
   else for(const bot of bots){const f=bot.fighter;if(time>=bot.thinkAt){bot.thinkAt=time+between(THINK);think(bot,time);}
    if(alive(f)&&!status.immobilized(f,time)&&time>=(f.combatLockedUntil??0)&&!f.knockback){const before={x:f.x,z:f.z};advance(f,bot.path,dt,3.5*AI_SPEED*status.movementFactor(f,time));const moved={dx:f.x-before.x,dz:f.z-before.z};f.moving=Math.hypot(moved.dx,moved.dz)>.001;if(f.moving)f.heading=moved;}else f.moving=false;}
  }
  const canMove=!finish&&alive(player)&&!status.immobilized(player,time)&&time>=(player.combatLockedUntil??0);
  return {duel:null,...world.snapshot(),joueurs:[...players.values()].map(p=>({...p})),position:{x:player.x,y:player.y,z:player.z},actionResult,
   health:{...player,canMove,canDetonate:world.canDetonate(player.id),frozenUntil:player.stoneUntil??0,movementFactor:status.movementFactor(player,time),cooldowns:world.cooldownsFor(player.id),serverTime:time},
   messages:actionResult?.text?[{id:command.id,author:actionResult.speaker,character:player.character,text:actionResult.text}]:[],finish,
   ctf:{x:flag.x,y:flag.y,z:flag.z,holder:flag.holder,team:flag.team,score:{...flag.score},remaining:Math.max(0,flag.endsAt-time),playerTeam:team}};
 }
 return {player,players,world,flag,tick,characters:bots.map(b=>b.fighter.character)};
}
export {CTF};
