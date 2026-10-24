// The hunt and the garrison's hunger. At the end of the forest path's north-east branch, a wood (expansion.cjs) where
// six wild pomgarous roam, belonging to no character: they wander round their den, fall on whoever comes close, and
// come back after each wave. Each one killed gives its killer a piece of pomgarou meat. The soldiers get hungry over
// a day; under STARVING they starve, losing health, and die a day later unless a defender feeds them (dialogue.cjs).
const FOREST={x:-185,z:-66},DENS=[[-181,-60],[-190,-58],[-178,-70],[-192,-70],[-185,-77],[-196,-64]];
const HP_FACTOR=2,AGGRO=14,LEASH=30,REACH=3.2,SPEED=2.2,WANDER=1,ATTACK_EVERY=2000,CLAW=48;
const DAY=24*3600000,STARVING=15,MEAL=50;
const WILD_NAME='sauvage';   // its sprite (chat/pom/sauvage-garou.png) and its name, « Pom-garou sauvage »

function createWildlife({state,hash,emit,hurt,defenders,garouHP,multiplier=1}){
 // the pomgarous themselves, kept apart from the siege's enemies (the combat and the clients see them: living())
 const fresh=([x,z],i)=>({id:'pom-wild-'+i,wild:true,character:WILD_NAME,pomCharacter:WILD_NAME,stage:3,kind:'garou',flying:false,hp:garouHP*HP_FACTOR,maxHP:garouHP*HP_FACTOR,
  home:{x,z},x,y:.04,z,nextAttack:0,deadAt:null,dead:false,heading:{dx:1,dz:0}});
 if(!state.wild?.garous?.[0]?.wild)state.wild={garous:DENS.map(fresh)};   // (an earlier draft kept only a record)
 for(const s of state.soldiers){s.hunger??=100;s.hungerAt??=state.at;}
 const living=()=>state.wild.garous.filter(g=>!g.dead&&g.hp>0);
 function update(dt){
  const t=state.at,targets=defenders().filter(a=>a.hp>0&&!a.transit&&a.type!=='barricade'&&!a.id?.startsWith('turret-'));
  for(const g of state.wild.garous){
   const e=g;if(g.dead||g.hp<=0)continue;   // its death is handled where the blow lands (registerDamage, kill)
   const near=targets.filter(a=>Math.hypot(a.x-e.x,a.z-e.z)<AGGRO&&Math.hypot(a.x-g.home.x,a.z-g.home.z)<LEASH&&Math.abs(a.y-e.y)<3).sort((a,b)=>Math.hypot(a.x-e.x,a.z-e.z)-Math.hypot(b.x-e.x,b.z-e.z))[0];
   let goal,speed;
   if(near){goal=near;speed=SPEED;}
   else{   // wandering round its den, a new spot now and then
    if(!e.wander||t>=e.wander.until)e.wander={x:g.home.x+((hash(g.id+t)%200)/100-1)*8,z:g.home.z+((hash(g.id+'z'+t)%200)/100-1)*8,until:t+4000+hash(g.id+'w'+t)%5000};
    goal=e.wander;speed=WANDER;
   }
   const dx=goal.x-e.x,dz=goal.z-e.z,d=Math.hypot(dx,dz);
   if(near&&d<=REACH){
    e.moving=false;
    if(t>=e.nextAttack){e.nextAttack=t+ATTACK_EVERY;hurt(near,CLAW*multiplier);emit('cleave','',{from:e.id,origin:{x:e.x,y:e.y,z:e.z},direction:{dx:dx/(d||1),dz:dz/(d||1)}});emit('attack','',{from:e.id,to:near.id});}
   }else if(d>.3){const step=Math.min(d,speed*dt);e.x+=dx/d*step;e.z+=dz/d*step;e.heading={dx:dx/d,dz:dz/d};e.moving=true;}
   else e.moving=false;
  }
 }
 // a wild pomgarou falls: its killer gets the meat; it stays down until the wave's end
 function die(e,killer){
  const g=state.wild.garous.find(g=>g.id===e.id);if(!g||g.dead)return;g.hp=0;
  g.dead=true;g.hp=0;e.deadAt=state.at;
  state.corpses.push({id:e.id+':'+state.at,character:WILD_NAME,stage:3,kind:'garou',flying:false,x:e.x,y:0,z:e.z,at:state.at});if(state.corpses.length>500)state.corpses.shift();
  const p=state.players[killer];if(p&&!p.pomControlled){p.meat=(p.meat??0)+1;emit('hunt','',{actor:p.id,meat:p.meat,position:{x:e.x,y:e.y,z:e.z}});}
 }
 // after each wave: the wood fills again
 function repopulate(){state.wild.garous=DENS.map(fresh);}
 // the garrison's hunger: starving soldiers lose health, so that a day without food kills them
 function starve(){
  for(const s of state.soldiers){
   if(s.hp<=0)continue;const h=hunger(state,s);
   if(h>STARVING){s.starvingSince=null;continue;}
   s.starvingSince??=(s.hungerAt??state.at)+((s.hunger??100)-STARVING)/100*DAY;
   const left=1-(state.at-s.starvingSince)/DAY;
   if(left<=0){s.hp=0;s.deadAt=state.at;s.starved=true;emit('soldier-death',`${s.name} est mort de faim.`,{soldier:s.id,name:s.name,hp:0,maxHP:s.maxHP,position:{x:s.x,y:s.y,z:s.z}});continue;}
   s.hp=Math.min(s.hp,Math.max(1,s.maxHP*left));
  }
 }
 return {update,die,repopulate,starve,living};
}
// a soldier's hunger, now (100 fed, 0 starved), from the last meal's value and time
function hunger(state,s){return Math.max(0,(s.hunger??100)-(state.at-(s.hungerAt??state.at))/DAY*100);}
// a defender gives a soldier a piece of meat (when it is hungry enough for it)
function canFeed(state,p,s){return p?.meat>0&&hunger(state,s)<100-MEAL/2;}
function feed(state,p,s){
 if(!canFeed(state,p,s))return null;
 p.meat--;s.hunger=Math.min(100,hunger(state,s)+MEAL);s.hungerAt=state.at;s.starvingSince=null;
 return s.hunger;
}
module.exports={createWildlife,hunger,canFeed,feed,FOREST,DENS,STARVING,MEAL,DAY,WILD_NAME};
