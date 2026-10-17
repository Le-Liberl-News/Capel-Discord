const {COMBAT_STEP_HEIGHT,smallStep}=require('../activity/combat-ground.cjs');
const {rayBody,validateRay,bodyHeight}=require('../activity/fps-combat.cjs');

const {projectionPosition,projectionPath,tornadoPosition,segmentDistance}=require('../activity/combat-projection.cjs');

const {combatMotion}=require('../activity/combat-motion.cjs');

const {immobilized,attackFactor,applyStatus,applyBuff}=require('../activity/combat-status.cjs');

const {applyDamage}=require('./activityDamage');

const { combatSpec, attackPoint } = require("../activity/native-combat.cjs");

const moves=require("../activity/combat-moves.cjs");

function createActivityCombat({ now = Date.now, geometry = null, grid, onCraft = () => {}, onDefeat = () => {}, canDamage = () => true, dungeon=null, platforms=null }) {

  const attacks = new Map(), cooldowns = new Map(), projections=new Map();

  let players;const damagePolicy=canDamage;canDamage=(a,b)=>{const owner=a.owner?players?.get(a.owner)??a:a,target=b.owner?players?.get(b.owner)??b:b;return owner.id!==target.id&&target.catCling?.target!==owner.id&&damagePolicy(owner,target);};

  const floor = point => {

    const moving=platforms?.floor(point);if(moving!==null&&moving!==undefined)return moving;

    if (geometry) return geometry.floor(point.x, point.z, point.y + COMBAT_STEP_HEIGHT + .05);

    const x=Math.round((point.x-grid.origin.x)/grid.step), z=Math.round((point.z-grid.origin.z)/grid.step);

    return x<0||z<0||x>=grid.width||z>=grid.height ? null : grid.cells[z*grid.width+x];

  };

  const smoke=require('../activity/nial-smoke.cjs').createSmoke((attack,actor,target,amount,time,impact)=>hurt(attack,actor,target,amount/attackFactor(actor,time),time,impact));
  const special=require('./activitySpecialCrafts').createSpecialCrafts({now,geometry,floor,canDamage:(a,b)=>canDamage(a,b),hurt:(...args)=>hurt(...args),attacks,onCraft});

  const trinity=require('./activityTrinity').createTrinity({now,attacks,canDamage:(a,b)=>canDamage(a,b),hurt:(...args)=>hurt(...args)});

  const loewe=require('./activityLoeweCollapse').createLoeweCollapse({geometry,canDamage,project:(...args)=>project(...args),hurt:(...args)=>hurt(...args)});
  const dimension=require('./activityDimension').createDimension({geometry,canDamage,hurt:(...args)=>hurt(...args)});
  const cats=require('./activityCatCling').createCatCling({floor,geometry,canDamage:(a,b)=>canDamage(a,b),hurt:(...args)=>hurt(...args)});
  function action(player, command, room) {

    players=room;
    if(player.character==='Carna'&&['aim','fireEnd'].includes(command.kind)){
      const active=[...attacks.values()].find(a=>a.actor===player.id&&a.character==='Carna'&&!a.cancelled&&now()<a.started+combatSpec('Carna',a.kind).fireDuration);
      if(!active||player.hp<=0||player.spectator||immobilized(player,now()))return {error:'Rafale inactive.'};
      // Once triggered the normal volley always completes its three seconds.
      if(command.kind==='fireEnd'&&active.kind==='basic')return {};
      if(command.kind==='aim'&&active.kind==='craft'){
        const ray=validateRay(player,command.ray);if(!ray)return {error:'Visée invalide.'};
        active.baseRay=ray;player.heading={dx:ray.direction.x,dz:ray.direction.z};return {};
      }
      return {};
    }
    const cooking=require("../activity/phyllis-cooking.cjs");let food=null;
    if(player.character==='Phyllis'&&command.kind==='craft'){if(command.cookPhase==='end'){cooking.cookingTick(player,now());delete player.cooking;return {};}if(player.hp<=0||player.spectator||player.duelProtected||player.canMove===false||immobilized(player,now()))return {error:"Cuisine indisponible."};if(player.cooking)return {};if(!player.foodStock?.length){if(player.jump||player.knockback)return {error:'Cuisine au sol uniquement.'};cooking.beginCooking(player,now());return {cooking:true};}food=player.foodStock[0];}

    if(player.character==='Campanella'&&command.kind==='craft'&&player.hp>0&&!player.spectator&&!player.duelProtected&&!immobilized(player,now())&&special.detonate(player,room))return {combatId:command.id};

    let spec = combatSpec(player.character,command.kind);const time=now(),continuation=spec?.special==='trinity'&&trinity.active(player);if(spec?.special==='trinity')spec=trinity.prepare(player,spec);
    if(spec?.dodge)return dodge(player,command,spec,room,time);
    // basic attacks speed up with the combo (combat-moves.cjs)
    if(command.kind==='basic'&&spec)spec=moves.tempoSpec(spec,moves.comboFactor(moves.comboOf(player,time)));

    if (!spec || player.catCling || player.hp <= 0 || player.spectator || player.canMove === false || immobilized(player,time) || time<(player.combatLockedUntil??0))

      return { error: "Attaque indisponible." };

    if (time < (player.attackBusyUntil ?? 0) || (!continuation&&time < (cooldowns.get(player.id)?.[command.kind] ?? 0)))

      return { error: "Technique en récupération." };

    if (attacks.has(command.id)) return { error: "Attaque déjà reçue." };

    if(spec.special==='summon'&&[...special.entities.values()].filter(e=>e.owner===player.id&&e.hp>0).length>=3)return {error:'Trois tomates sont déjà actives.'};

    const fps=spec.fps?validateRay(player,command.ray):null;if(spec.fps&&!fps)return {error:'Visée invalide.'};

    const origin = {x:player.x,y:player.y??0,z:player.z}, endpoint = fps?{...fps.origin}:attackPoint(origin, command.aim, command.kind,player.character);

    if(continuation?.stage===2&&Math.hypot(endpoint.x-continuation.vertices[0].x,endpoint.z-continuation.vertices[0].z)<=1)Object.assign(endpoint,continuation.vertices[0]);

    if(fps)Object.assign(endpoint,{x:fps.origin.x+fps.direction.x*spec.range,y:fps.origin.y+fps.direction.y*spec.range,z:fps.origin.z+fps.direction.z*spec.range});

    if (!endpoint) return { error: "Visée invalide." };

    let supportTarget=null,obstacleImpact=false;

    if(spec.effect){supportTarget=spec.targetRequired?room.get(command.target):player;if(!supportTarget||supportTarget.enemy||supportTarget.hp<=0||supportTarget.spectator||(supportTarget.id!==player.id&&!dungeon)||Math.hypot(supportTarget.x-player.x,supportTarget.z-player.z)>spec.range||Math.abs((supportTarget.y??0)-origin.y)>3)return {error:'Cible de soutien indisponible.'};Object.assign(endpoint,{x:supportTarget.x,y:supportTarget.y??0,z:supportTarget.z});}

    if(spec.targetRequired&&!spec.effect){const target=room.get(command.target);if(!target||target.id===player.id||target.hp<=0||target.spectator||!canDamage(player,target)||Math.hypot(target.x-player.x,target.z-player.z)>spec.range)return {error:'Cible indisponible.'};if(spec.minRange&&Math.hypot(target.x-player.x,target.z-player.z)<spec.minRange)return {error:'La cible est trop proche pour charger.'};Object.assign(endpoint,{x:target.x,y:target.y??0,z:target.z});}

    const airborneMelee=spec.special==='photo'||command.kind==='basic'&&!spec.projectile;

    const ground = fps||spec.effect||airborneMelee||spec.fixedLength?endpoint.y:command.kind==='basic'?(floor(endpoint)??endpoint.y):floor(endpoint);

    if (ground === null || !Number.isFinite(ground) || Math.abs(ground-endpoint.y)>1.2)

      return { error: "Visez le sol." };

    endpoint.y=ground;
    if(Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z)>.001)player.heading={dx:endpoint.x-origin.x,dz:endpoint.z-origin.z};

    const from=fps?fps.origin:{...origin,y:origin.y+.85},to=fps?endpoint:{...endpoint,y:endpoint.y+.85};

    const hit=geometry?.sweep(from,to,.12);

    const distance=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);

    if((spec.effect||spec.chargeStun)&&hit&&Math.hypot(hit.point.x-from.x,hit.point.y-from.y,hit.point.z-from.z)<distance-.2)return {error:'La cible est derrière un obstacle.'};

    if(!spec.catLeap && spec.special!=='phoenix' && hit && Math.hypot(hit.point.x-from.x,hit.point.y-from.y,hit.point.z-from.z)<distance-.2) {

      obstacleImpact=!!fps;
      const stop=spec.dash?Math.max(0,Math.hypot(hit.point.x-origin.x,hit.point.z-origin.z)-.2):null;

      if(stop!==null){const length=Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z);endpoint.x=origin.x+(endpoint.x-origin.x)*stop/length;endpoint.z=origin.z+(endpoint.z-origin.z)*stop/length;}else{endpoint.x=hit.point.x;endpoint.z=hit.point.z;}endpoint.y=hit.point.y-(fps?0:.85);

    }

    if(spec.dash){

      const length=Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z);let previous=player.jump?floor(origin):origin.y;

      if(previous===null||!Number.isFinite(previous))return {error:'Le trajet doit rester sur un sol accessible.'};

      for(let n=1;n<=Math.ceil(length/.2);n++){

        const t=n/Math.ceil(length/.2),p={x:origin.x+(endpoint.x-origin.x)*t,y:previous,z:origin.z+(endpoint.z-origin.z)*t},height=floor(p);

        if(height===null||!Number.isFinite(height)||!smallStep(height,previous))return {error:'Le trajet doit rester sur un sol accessible.'};
        if(spec.special==='trinity'){const x=Math.round((p.x-grid.origin.x)/grid.step),z=Math.round((p.z-grid.origin.z)/grid.step);if(x<0||z<0||x>=grid.width||z>=grid.height||grid.cells[z*grid.width+x]===null)return {error:'Le trajet doit rester sur un sol accessible.'};}

        previous=height;

      }

      endpoint.y=previous;

    }

    if(spec.catLeap){const {combatMotion}=require('../activity/combat-motion.cjs');let previous={...origin,y:origin.y+.5};for(let t=40;t<spec.leapDuration+40;t+=40){const p=combatMotion({origin,aim:endpoint},Math.min(t,spec.leapDuration),spec).position,body={...p,y:p.y+.5};if(geometry?.sweep(previous,body,.15))return {error:'Le bond est bloqué.'};previous=body;}}
    if(spec.special==='phoenix'){
      const gx=Math.round((endpoint.x-grid.origin.x)/grid.step),gz=Math.round((endpoint.z-grid.origin.z)/grid.step);
      if(gx<0||gz<0||gx>=grid.width||gz>=grid.height||grid.cells[gz*grid.width+gx]===null)return {error:'Visez un sol accessible.'};
      const {phoenixPosition}=require('../activity/cassius-phoenix.cjs');let previous={...origin,y:origin.y+.8};
      for(let t=0;t<=spec.windup+spec.leapDuration;t+=40){const pos=phoenixPosition({origin,aim:endpoint},t,spec),body={...pos,y:pos.y+.8};if(geometry?.sweep(previous,body,.16))return {error:'Le trajet est bloqué par un obstacle.'};previous=body;}
      if(geometry?.sweep(previous,{...endpoint,y:endpoint.y+.8},.16))return {error:'Le trajet est bloqué par un obstacle.'};
    }
    if(spec.special==='mueller')spec=require('../activity/mueller-combo.cjs').muellerSpec({origin,aim:endpoint},spec);
    let lockedTarget=null,lockedOffset=null;

    if(fps){let closest=Math.hypot(endpoint.x-fps.origin.x,endpoint.y-fps.origin.y,endpoint.z-fps.origin.z);for(const target of room.values()){if(target.id===player.id||target.hp<=0||target.spectator||!canDamage(player,target))continue;const body=rayBody(fps.origin,fps.direction,target,closest);if(body&&body.distance<closest){closest=body.distance;obstacleImpact=false;Object.assign(endpoint,body.point);if(spec.lockOn){lockedTarget=target.id;lockedOffset={x:body.point.x-target.x,y:body.point.y-(target.y??0),z:body.point.z-target.z};}}}}

    const travel = fps?Math.hypot(endpoint.x-fps.origin.x,endpoint.y-fps.origin.y,endpoint.z-fps.origin.z)/spec.projectileSpeed*1000:spec.leap?spec.leapDuration:spec.dash ? spec.dashDuration : !spec.projectile ? 0 : Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z)/14*1000;

    const attack={id:command.id,actor:player.id,character:player.character,kind:command.kind,tempo:spec.tempo,technique:spec.name,target:supportTarget?.id??(spec.targetRequired?command.target:undefined),effect:spec.effect,origin:fps?fps.origin:origin,ray:fps,obstacleImpact,aim:endpoint,started:time,impactAt:time+spec.windup+travel,endsAt:time+Math.max(spec.duration,spec.windup+travel+(spec.persistentBuff?spec.buffDuration:spec.effectDuration??550)),resolved:false,nextHit:0,hits:[]};
    if(player.character==='Carna'){attack.baseRay=fps;attack.impactAt=time;}
    if(food){attack.food=food;attack.technique=cooking.FOODS[food].name;player.foodStock.shift();}

    if(spec.lockOn){attack.target=lockedTarget;attack.lockedOffset=lockedOffset;attack.shots=[];}

    if(spec.tornado){attack.impactAt=time+spec.windup;attack.flightEndsAt=attack.impactAt+Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z)/spec.projectileSpeed*1000;attack.endsAt=attack.flightEndsAt+300;}

    if(spec.leap&&spec.landingOffset){const length=Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z),ratio=length?1-Math.min(spec.landingOffset,Math.max(0,length-.2))/length:1,p={x:origin.x+(endpoint.x-origin.x)*ratio,y:endpoint.y,z:origin.z+(endpoint.z-origin.z)*ratio},height=floor(p);attack.landingPoint=height!==null&&Number.isFinite(height)&&Math.abs(height-p.y)<1.2?{...p,y:height}:{...endpoint};}

    special.setup(attack,spec,command,room);
    if(spec.special==='dimension')dimension.setup(attack,spec,room);
    if(spec.special==='trinity')trinity.setup(attack,spec,player);

    attacks.set(attack.id,attack);players=room;if(spec.chargeStun){const target=room.get(attack.target);applyStatus(target,{status:'stun',statusDuration:spec.duration},time);}

    if(spec.dash||spec.leap){Object.assign(player,{combatDash:attack.id,combatLockedUntil:time+spec.windup+(spec.leapDuration??spec.dashDuration),acceptedAt:time,jump:null,jumpTickAt:null,jumpLandedAt:time,platformId:null,platformOffset:null});}

    if(spec.lockMovement)player.combatLockedUntil=time+spec.duration;

    const cooldown=cooldowns.get(player.id)??{};cooldown[command.kind]=time+(spec.catLeap&&dungeon?20000:spec.cooldown);cooldowns.set(player.id,cooldown);

    player.attackBusyUntil=time+(food?spec.cooldown:spec.duration);

    if(player.character==='Anton'&&command.kind==='craft'){
      const phrases=["Aidios, je vous en prie...","Monde crueeeeel-- !!","V-Voudriez-vous bien... sortir avec moi ?!!"];
      attack.speech=phrases[Math.floor(Math.random()*phrases.length)];
    }
    if(command.kind==="craft")onCraft({...attack});
    if(attack.speech)return {combatId:attack.id,text:attack.speech,speaker:player.id,character:player.character,instant:true};
    return { combatId:attack.id };

  }

  // Dodge: a short dash along the movement direction, refused during a craft (combat-moves.cjs).
  function dodge(player,command,spec,room,time){
    if(player.catCling||player.hp<=0||player.spectator||player.canMove===false||player.cooking||immobilized(player,time)||time<(player.combatLockedUntil??0))return {error:'Esquive indisponible.'};
    if([...attacks.values()].some(a=>a.actor===player.id&&a.kind==='craft'&&!a.cancelled&&time<a.started+(combatSpec(a.character,'craft')?.duration??0)))return {error:'Esquive impossible pendant un craft.'};
    if(time<(cooldowns.get(player.id)?.[command.kind]??0))return {error:'Technique en récupération.'};
    if(attacks.has(command.id))return {error:'Attaque déjà reçue.'};
    const wanted=command.direction&&[command.direction.x,command.direction.z].every(Number.isFinite)?command.direction:{x:player.heading?.dx??0,z:player.heading?.dz??-1};
    const walkable=p=>{if(!grid)return true;const x=Math.round((p.x-grid.origin.x)/grid.step),z=Math.round((p.z-grid.origin.z)/grid.step);return x>=0&&z>=0&&x<grid.width&&z<grid.height&&grid.cells[z*grid.width+x]!==null;};
    const origin={x:player.x,y:player.y??0,z:player.z},endpoint=moves.dodgeEndpoint(origin,wanted,{floor,walkable,blocked:(a,b)=>!!geometry?.sweep(a,b,.12)});
    if(!endpoint)return {error:'Pas la place pour esquiver.'};
    // a basic attack in progress is abandoned
    for(const other of attacks.values())if(other.actor===player.id&&other.kind==='basic'&&!other.resolved){other.cancelled=true;other.resolved=true;}
    const attack={id:command.id,actor:player.id,character:player.character,kind:command.kind,technique:spec.name,dodge:true,origin,aim:endpoint,started:time,impactAt:time+spec.dashDuration,endsAt:time+spec.dashDuration+500,resolved:false,nextHit:0,hits:[]};
    attacks.set(attack.id,attack);
    player.heading={dx:endpoint.x-origin.x,dz:endpoint.z-origin.z};
    Object.assign(player,{combatDash:attack.id,combatLockedUntil:time+spec.dashDuration,acceptedAt:time,jump:null,jumpTickAt:null,jumpLandedAt:time,platformId:null,platformOffset:null});
    const cooldown=cooldowns.get(player.id)??{};cooldown[command.kind]=time+spec.cooldown;cooldowns.set(player.id,cooldown);
    player.attackBusyUntil=time+spec.dashDuration;
    return {combatId:attack.id};
  }
  // Parry: live for PARRY.window after the key; pressing again is refused for PARRY.cooldown.
  function parry(player,room,command={}){
    players=room;const time=now();
    if(command.phase==='end'){player.acceptedAt=time;player.movementCredit=0;player.guardHold=null;return {guarding:false};}
    if(player.hp<=0||player.spectator||player.catCling)return {error:'Parade indisponible.'};
    if(command.phase==='keep'){
      if(player.guardHold?.until>time){moves.turnGuard(player,{dx:command.direction?.x??player.heading?.dx,dz:command.direction?.z??player.heading?.dz},time);player.guardHold.until=time+moves.PARRY.holdLease;player.acceptedAt=time;player.movementCredit=0;}
      return {guarding:player.guardHold?.until>time};
    }
    if(command.phase==='begin'){
      if(player.guardHold?.until>time)return {guarding:true};
      const direction=command.direction??{x:player.heading?.dx??0,z:player.heading?.dz??-1},length=Math.hypot(direction.x,direction.z);
      if(!Number.isFinite(length)||length<.001)return {error:'Direction de garde invalide.'};
      player.guardHold={dx:direction.x/length,dz:direction.z/length,until:time+moves.PARRY.holdLease};player.heading={dx:player.guardHold.dx,dz:player.guardHold.dz};player.acceptedAt=time;player.movementCredit=0;
      if(time<(cooldowns.get(player.id)?.parry??0))return {guarding:true};
    }
    if(time<(cooldowns.get(player.id)?.parry??0))return {error:'Parade en récupération.'};
    const cooldown=cooldowns.get(player.id)??{};cooldown.parry=time+moves.PARRY.cooldown;cooldowns.set(player.id,cooldown);
    player.parry={at:time,held:command.phase==='begin'};
    return {parry:true};
  }
  // A craft landing on a fighter whose parry is live is blocked; its caster takes the counter.
  function parried(attack,victim,time){
    if(attack.kind!=='craft'||attack.character==='Nial'||!victim)return false;
    if(attack.parriedBy?.includes(victim.id))return true;
    if(!moves.parryActive(victim,time))return false;
    victim.parry=null;(attack.parriedBy??=[]).push(victim.id);attack.cancelled=true;attack.resolved=true;
    attack.hits.push({id:victim.id,at:time,parried:true,damage:0,point:{x:victim.x,y:(victim.y??0)+.9,z:victim.z}});
    const caster=players?.get(attack.actor);
    if(caster&&caster.id!==victim.id&&caster.hp>0&&!caster.spectator&&canDamage(victim,caster)){
      const counter={...attack,id:attack.id+':parry',actor:victim.id,character:victim.character,kind:'parry',technique:'Parade'};
      const dealt=hurt(counter,victim,caster,moves.PARRY.counterDamage,time,{nativeEffect:moves.PARRY.effect,parry:true,point:{x:caster.x,y:(caster.y??0)+.9,z:caster.z}});
      attack.hits.push({id:caster.id,at:time,counter:true,...dealt});
      if(caster.hp>0)project(counter,victim,caster,{knockback:moves.PARRY.knockback,knockbackDuration:moves.PARRY.knockbackDuration},{x:caster.x-victim.x||.01,z:caster.z-victim.z},time);
    }
    return true;
  }
  function blockedBasic(attack,attacker,player,time){
    if(attack.kind!=='basic'||!moves.blocksBasic(player,attack.ray?.origin??attack.origin??attacker,time))return false;
    attack.hits.push({id:player.id,at:time,blocked:true,damage:0,point:{x:player.x,y:(player.y??0)+.9,z:player.z}});
    return true;
  }
  function hurt(attack,attacker,player,amount,time,impact){
    if(reflectProjectile(attack,attacker,player,amount,time))return {damage:0,absorbed:amount,reflected:true};
    if(blockedBasic(attack,attacker,player,time))return {damage:0,absorbed:0,blocked:true};
    if(parried(attack,player,time))return {damage:0,absorbed:0,parried:true};

    const dealt=applyDamage(player,amount*attackFactor(attacker,time),time,impact);

    if(player.hp===0&&dealt.damage){player.deadUntil=time+(player.boss?120000:player.enemy?30000:10000);if(!player.enemy)onDefeat({victim:player,attacker:attack.actor,players:players,point:{x:player.x,y:player.y??0,z:player.z},action:{id:attack.id,kind:attack.kind,technique:attack.technique,follow:'projectile',started:attack.started,releaseAt:attack.highlight?attack.started:attack.started+combatSpec(attack.character,attack.kind).windup,impactAt:time,endsAt:Math.max(time+300,attack.endsAt),origin:{...attack.origin},aim:{x:player.x,y:player.y??0,z:player.z}},at:time});}

    return dealt;

  }

  function reflectProjectile(attack,attacker,player,amount,time){
    const spec=combatSpec(attack.character,attack.kind);
    if(attack.reflectedProjectile||!require('../activity/projectile-reflection.cjs').reflecting(player,time)||!(attack.ray||spec?.projectile||attack.food))return false;
    if(attacker?.hp>0&&canDamage(player,attacker)){
      const origin={x:player.x,y:(player.y??0)+.85,z:player.z},aim={x:attacker.x,y:(attacker.y??0)+.85,z:attacker.z},travel=Math.max(50,Math.hypot(aim.x-origin.x,aim.y-origin.y,aim.z-origin.z)/18*1000);
      const id=attack.id+':reflected:'+player.id+':'+time;
      attacks.set(id,{id,actor:player.id,character:'Josette',kind:'basic',technique:'Renvoi',reflectedProjectile:true,reflectedDamage:amount*attackFactor(attacker,time),target:attacker.id,origin,aim,started:time,impactAt:time+travel,endsAt:time+travel+350,resolved:false,hits:[]});
    }
    attack.hits.push({id:player.id,at:time,damage:0,reflected:true,point:{x:player.x,y:(player.y??0)+.85,z:player.z}});
    return true;
  }

  function project(attack,attacker,player,spec,direction,time){

    const safeFloor=point=>{if(!grid)return floor(point);const x=Math.round((point.x-grid.origin.x)/grid.step),z=Math.round((point.z-grid.origin.z)/grid.step);if(x<0||z<0||x>=grid.width||z>=grid.height||grid.cells[z*grid.width+x]===null)return null;const y=floor(point);return Number.isFinite(y)&&Math.abs(y-grid.cells[z*grid.width+x])<=.35?y:null;};
    const path=projectionPath(player,direction,spec.knockback,safeFloor,geometry);if(!path)return;

    const duration=spec.knockbackDuration??450,projection={...path,id:attack.id+':'+player.id,started:time,duration};

    player.knockback=projection;player.jump=null;player.platformId=null;player.platformOffset=null;player.combatLockedUntil=Math.max(player.combatLockedUntil??0,time+duration);player.acceptedAt=time;

    if(player.enemy){player.attack=null;player.charge=null;player.path=[];player.stunUntil=Math.max(player.stunUntil??0,time+duration);}

    projections.set(player.id,{projection,attack,attacker,spec});

  }

  const driveContacts=new Map();
  function tick(room) {
    const cooking=require("../activity/phyllis-cooking.cjs");for(const player of room.values())cooking.cookingTick(player,now());

    players=room;const time=now();for(const p of room.values())if(p.fallAnimation&&time>=p.fallAnimation.started+p.fallAnimation.duration)p.fallAnimation=null;cats.tick(room,time);special.tickEntities(room);

    for(const player of room.values())if(player.knockback&&!projections.has(player.id)){player.knockback=null;}

    for(const [id,push]of projections){const player=room.get(id),{projection,attack,attacker,spec}=push;if(!player||player.hp<=0||player.knockback?.id!==projection.id){projections.delete(id);if(player)player.knockback=null;continue;}

      Object.assign(player,projectionPosition(projection,time));player.acceptedAt=time;

      if(time>=projection.started+projection.duration){player.knockback=null;projections.delete(id);if(spec.collapse){const ended=projection.started+projection.duration;applyStatus(player,{status:'stun',statusDuration:spec.stunDuration},ended);player.downUntil=ended+spec.stunDuration;}if(projection.wall&&spec.wallDamage){const dealt=hurt(attack,attacker,player,spec.wallDamage,time,{point:{x:player.x,y:(player.y??0)+.8,z:player.z}});attack.hits.push({id:player.id,at:time,wall:true,...dealt});if(dealt.damage){applyStatus(player,{status:'stun',statusDuration:spec.wallStun},time);player.downUntil=time+spec.wallStun;}}}

    }

    smoke.tick([...attacks.values()].filter(a=>a.character==='Nial'&&a.kind==='craft'),room,time);
    for(const [id,attack]of attacks) {
      if(attack.reflectedProjectile){
        if(time>attack.endsAt+1800){attacks.delete(id);continue;}
        if(!attack.resolved&&time>=attack.impactAt){attack.resolved=true;const actor=room.get(attack.actor),target=room.get(attack.target),length=Math.hypot(attack.aim.x-attack.origin.x,attack.aim.y-attack.origin.y,attack.aim.z-attack.origin.z),direction={x:(attack.aim.x-attack.origin.x)/(length||1),y:(attack.aim.y-attack.origin.y)/(length||1),z:(attack.aim.z-attack.origin.z)/(length||1)};
          if(actor&&target?.hp>0&&canDamage(actor,target)&&rayBody(attack.origin,direction,target,length+.5)&&!geometry?.sweep(attack.origin,attack.aim,.05)){const dealt=hurt(attack,actor,target,attack.reflectedDamage/attackFactor(actor,time),time,{point:attack.aim});attack.hits.push({id:target.id,at:time,...dealt});}}
        continue;
      }

      if(time>attack.endsAt+5000){if(attack.special==='dimension')dimension.cancel(attack,room);attacks.delete(id);driveContacts.delete(id);continue;}

      const dashSpec=combatSpec(attack.character,attack.kind);
      if(dashSpec?.special==='smoke'){attack.resolved=true;continue;}
      if(dashSpec?.special==='photo'){if(!attack.resolved&&time>=attack.impactAt){const actor=room.get(attack.actor);if(!actor||actor.hp<=0||immobilized(actor,time)){attack.cancelled=true;}else require('../activity/dorothy-photo.cjs').resolvePhoto(attack,actor,room,canDamage,geometry);attack.resolved=true;}continue;}

      if(attack.food&&!attack.cancelled){cooking.advanceFood(attack,time,room,geometry,canDamage,hurt);continue;}
      if(dashSpec?.inertia&&!attack.cancelled&&attack.resolved&&time<attack.impactAt+dashSpec.buffDuration){
        const actor=room.get(attack.actor);if(!actor||actor.hp<=0||actor.character!==attack.character||immobilized(actor,time)){driveContacts.delete(id);continue;}
        const state=driveContacts.get(id)??{point:{...attack.origin},at:attack.impactAt,hits:new Map()},from=state.point,end={x:actor.x,y:actor.y??0,z:actor.z},distance=Math.hypot(end.x-from.x,end.z-from.z);
        if(distance>.02)for(const target of room.values()){
          if(target.id===actor.id||target.hp<=0||target.spectator||target.duelProtected||!canDamage(actor,target)||Math.abs((target.y??0)-end.y)>1.2||segmentDistance(target,from,end)>dashSpec.radius+(target.boss?2:0)||time<(state.hits.get(target.id)??0))continue;
          if(geometry?.sweep({x:actor.x,y:(actor.y??0)+.8,z:actor.z},{x:target.x,y:(target.y??0)+.8,z:target.z},.05))continue;
          state.hits.set(target.id,time+700);const dealt=hurt(attack,actor,target,dashSpec.damage,time,{point:{x:target.x,y:(target.y??0)+.8,z:target.z}});attack.hits.push({id:target.id,at:time,...dealt});if(dealt.damage&&target.hp>0)project(attack,actor,target,dashSpec,{x:end.x-from.x,z:end.z-from.z},time);
        }
        state.point=end;state.at=time;driveContacts.set(id,state);continue;
      }else if(dashSpec?.inertia)driveContacts.delete(id);
      if(dashSpec?.repulsion&&!attack.cancelled&&attack.resolved&&time<attack.impactAt+dashSpec.buffDuration){
        const actor=room.get(attack.actor);if(!actor||actor.hp<=0||actor.character!==attack.character){attack.cancelled=true;attack.endsAt=time;continue;}
        if(time>=(attack.nextPulseAt??attack.impactAt)){
          attack.nextPulseAt=time+dashSpec.pulseInterval;
          for(const target of room.values()){
            if(target.id===actor.id||target.hp<=0||target.spectator||target.duelProtected||target.enemy||!canDamage(actor,target)||require('../rpg/data/persos.json')[target.character]?.sexe!=='F'||Math.abs((target.y??0)-(actor.y??0))>1.5||Math.hypot(target.x-actor.x,target.z-actor.z)>dashSpec.radius)continue;
            if(target.knockback)continue;
            if(geometry?.sweep({x:actor.x,y:(actor.y??0)+.8,z:actor.z},{x:target.x,y:(target.y??0)+.8,z:target.z},.05))continue;
            project(attack,actor,target,dashSpec,{x:target.x-actor.x||.01,z:target.z-actor.z},time);
            attack.hits.push({id:target.id,at:time,repelled:true,point:{x:target.x,y:(target.y??0)+.8,z:target.z}});
          }
        }
        continue;
      }

      if(trinity.tick(attack,dashSpec,room,time))continue;
      if(dashSpec?.special==='loewe'){loewe.tick(attack,dashSpec,room,time);continue;}
      if(dashSpec?.special==='dimension'){dimension.tick(attack,dashSpec,room,time);continue;}
      if(special.tickAttack(attack,dashSpec,room,time))continue;

      if(dashSpec?.lockOn&&!attack.resolved&&!attack.cancelled){

        const actor=room.get(attack.actor);if(!actor||actor.hp<=0||actor.character!==attack.character||actor.spectator||immobilized(actor,time)){attack.cancelled=true;attack.resolved=true;continue;}

        const offsets=dashSpec.hitOffsets??[0];

        for(let index=0;index<offsets.length;index++){

          const release=attack.started+dashSpec.windup+offsets[index];if(time<release)continue;

          let shot=attack.shots[index];

          if(!shot){

            const origin={x:actor.x,y:(actor.y??0)+1.45,z:actor.z},target=room.get(attack.target);

            let aim={...attack.aim};

            const locked=target&&target.hp>0&&!target.spectator&&!target.duelProtected&&canDamage(actor,target)&&Math.hypot(target.x-origin.x,(target.y??0)-origin.y,target.z-origin.z)<=dashSpec.range;

            if(locked){const offset=attack.lockedOffset;aim={x:target.x+offset.x,y:(target.y??0)+offset.y,z:target.z+offset.z};}

            const length=Math.hypot(aim.x-origin.x,aim.y-origin.y,aim.z-origin.z)||1,direction={x:(aim.x-origin.x)/length,y:(aim.y-origin.y)/length,z:(aim.z-origin.z)/length};

            const wall=geometry?.sweep(origin,aim,.08);const blocked=wall&&Math.hypot(wall.point.x-origin.x,wall.point.y-origin.y,wall.point.z-origin.z)<length-.15;

            if(blocked)aim={...wall.point};

            shot={origin,aim,direction,started:release,impactAt:release+Math.hypot(aim.x-origin.x,aim.y-origin.y,aim.z-origin.z)/dashSpec.projectileSpeed*1000,locked:!!locked,blocked:!!blocked,resolved:false};attack.shots[index]=shot;attack.endsAt=Math.max(attack.endsAt,shot.impactAt+550);

          }

          if(shot.resolved||time<shot.impactAt)continue;shot.resolved=true;

          if(shot.blocked)continue;

          const target=room.get(attack.target);

          const targets=shot.locked&&target?[target]:[...room.values()];

          for(const victim of targets){

            if(victim.id===actor.id||victim.hp<=0||victim.spectator||victim.duelProtected||!canDamage(actor,victim))continue;

            const precise=shot.locked?{point:{x:victim.x+attack.lockedOffset.x,y:(victim.y??0)+attack.lockedOffset.y,z:victim.z+attack.lockedOffset.z},headshot:attack.lockedOffset.y>=bodyHeight(victim)*.78}:rayBody(shot.origin,shot.direction,victim,dashSpec.range);

            if(!precise)continue;

            const wall=geometry?.sweep(shot.origin,precise.point,.08);if(wall&&Math.hypot(wall.point.x-shot.origin.x,wall.point.y-shot.origin.y,wall.point.z-shot.origin.z)<Math.hypot(precise.point.x-shot.origin.x,precise.point.y-shot.origin.y,precise.point.z-shot.origin.z)-.15)continue;

            const dealt=hurt(attack,actor,victim,dashSpec.damage*(precise.headshot?dashSpec.headshotMultiplier:1)/offsets.length,shot.impactAt,precise);attack.hits.push({id:victim.id,hitIndex:index,at:shot.impactAt,...dealt});

            break;

          }

        }

        attack.resolved=attack.shots.length===offsets.length&&attack.shots.every(shot=>shot?.resolved);continue;

      }

      if(dashSpec?.tornado&&!attack.resolved&&!attack.cancelled){

        if(time<attack.impactAt)continue;

        const attacker=room.get(attack.actor);if(!attacker||attacker.hp<=0||attacker.character!==attack.character||immobilized(attacker,time)){attack.cancelled=true;attack.resolved=true;continue;}

        const end=tornadoPosition(attack,dashSpec,Math.min(time,attack.flightEndsAt)),from=attack.tornadoLast??attack.origin;

        for(const player of room.values()){

          if(player.id===attack.actor||player.hp<=0||player.spectator||player.duelProtected||!canDamage(attacker,player)||attack.hits.some(h=>h.id===player.id)||Math.abs((player.y??0)-end.y)>.9||segmentDistance(player,from,end)>dashSpec.radius+(player.boss?2:0))continue;

          const wall=geometry?.sweep({...end,y:end.y+.8},{x:player.x,y:(player.y??0)+.8,z:player.z},.08);if(wall)continue;

          const dealt=hurt(attack,attacker,player,dashSpec.damage,time);attack.hits.push({id:player.id,at:time,...dealt});

          if(dealt.damage&&player.hp>0){const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z,side=(player.x-attack.origin.x)*dz-(player.z-attack.origin.z)*dx;project(attack,attacker,player,dashSpec,{x:dz*(side>=0?1:-1),z:-dx*(side>=0?1:-1)},time);}

        }

        attack.tornadoLast=end;if(time>=attack.flightEndsAt)attack.resolved=true;continue;

      }

      if((dashSpec?.dash||dashSpec?.leap)&&!attack.dashFinished&&!attack.cancelled){

        const actor=room.get(attack.actor);

        if(!actor||actor.hp<=0||actor.character!==attack.character||actor.spectator){attack.cancelled=true;attack.resolved=true;if(actor)actor.combatLockedUntil=0;}

        else {const motion=combatMotion(attack,time-attack.started,dashSpec);Object.assign(actor,motion.position);if(!motion.active){attack.dashFinished=true;actor.acceptedAt=time;if(dashSpec.catLeap)cats.land(actor,attack,room,time);}}

      }

      if(dashSpec?.catLeap){if(attack.dashFinished)attack.resolved=true;continue;}
      if(attack.dodge){if(attack.dashFinished||attack.cancelled)attack.resolved=true;continue;}
      const hitOffsets=dashSpec?.hitOffsets??[0];

      if(attack.resolved||time<attack.impactAt+hitOffsets[attack.nextHit])continue;

      while(attack.nextHit<hitOffsets.length&&time>=attack.impactAt+hitOffsets[attack.nextHit]){

      const hitIndex=attack.nextHit++;attack.resolved=attack.nextHit===hitOffsets.length;

      const attacker=room.get(attack.actor),spec=combatSpec(attack.character,attack.kind);

      if(!attacker||attacker.hp<=0||attacker.character!==attack.character||attacker.spectator||immobilized(attacker,time)){attack.cancelled=true;attack.resolved=true;break;}
      if(spec.automatic){
        if(attack.fireStoppedAt&&attack.impactAt+hitOffsets[hitIndex]>=attack.fireStoppedAt){attack.resolved=true;break;}
        const base={origin:{x:attacker.x,y:(attacker.y??0)+1.45,z:attacker.z},direction:attack.baseRay.direction};
        const ray=require('../activity/carna-gun.cjs').shotRay(base,attack.id,hitIndex);
        attack.ray=ray;attack.origin={...ray.origin};let distance=spec.range;
        const endpoint={};for(const k of ['x','y','z'])endpoint[k]=ray.origin[k]+ray.direction[k]*distance;
        const wall=geometry?.sweep(ray.origin,endpoint,.02);if(wall)distance=Math.min(distance,Math.hypot(wall.point.x-ray.origin.x,wall.point.y-ray.origin.y,wall.point.z-ray.origin.z));
        for(const target of room.values()){if(target.id===attacker.id||target.hp<=0||target.spectator||!canDamage(attacker,target))continue;const body=rayBody(ray.origin,ray.direction,target,distance);if(body)distance=Math.min(distance,body.distance+.001);}
        attack.aim={};for(const k of ['x','y','z'])attack.aim[k]=ray.origin[k]+ray.direction[k]*distance;
        attack.shots??=[];const released=attack.impactAt+hitOffsets[hitIndex];attack.shots[hitIndex]={origin:{...ray.origin},aim:{...attack.aim},started:released,impactAt:released+90};
      }

      if(spec.effect){const target=room.get(attack.target);if(!target||target.hp<=0||target.enemy||target.spectator||Math.hypot(target.x-attacker.x,target.z-attacker.z)>spec.range||Math.abs((target.y??0)-(attacker.y??0))>3){attack.cancelled=true;attack.resolved=true;break;}attack.aim={x:target.x,y:target.y??0,z:target.z};if(spec.effect==='heal'){const heal=Math.max(0,Math.min(spec.heal,(target.maxHp??require('../activity/player-health.cjs').PLAYER_MAX_HP)-target.hp));target.hp+=heal;attack.hits.push({id:target.id,heal});}else if(spec.effect==='guard'){target.guard={until:time+spec.shieldDuration};attack.hits.push({id:target.id,guard:true});}else if(spec.effect.endsWith('Buff')){applyBuff(target,spec,time);attack.hits.push({id:target.id,buff:spec.effect});}else {target.shield={hp:spec.shield,maxHp:spec.shield,until:time+spec.shieldDuration};attack.hits.push({id:target.id,shield:spec.shield});}continue;}

      if(spec.trackTarget){const target=room.get(attack.target);if(target&&target.hp>0&&Math.hypot(target.x-attacker.x,target.z-attacker.z)<=spec.range){attack.aim={x:target.x,y:target.y??0,z:target.z};}}

      if(spec.arcFencer){const dx=attack.aim.x-attack.origin.x,dy=attack.aim.y-attack.origin.y,dz=attack.aim.z-attack.origin.z;attack.origin={x:attacker.x,y:attacker.y??0,z:attacker.z};attack.aim={x:attacker.x+dx,y:(attacker.y??0)+dy,z:attacker.z+dz};}

      if(spec.selfTarget){attack.origin={x:attacker.x,y:attacker.y??0,z:attacker.z};attack.aim={...attack.origin};}

      if(attack.kind==='basic'&&!spec.projectile){const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z;attack.origin={x:attacker.x,y:attacker.y??0,z:attacker.z};attack.aim={x:attacker.x+dx,y:attacker.y??0,z:attacker.z+dz};}
      const comboNext=attack.kind==='basic'?moves.comboOf(attacker,time)+1:0,comboHold=2*(combatSpec(attack.character,'basic')?.cooldown??700);let landed=false,blocked=false;

      for(const player of room.values()) {

        if(spec.targetRequired&&player.id!==attack.target||!canDamage(attacker,player)||player.id===attack.actor||player.hp<=0||player.spectator||player.duelProtected||!attack.ray&&Math.abs((player.y??0)-attack.aim.y)>.9)continue;

        let inRange=Math.hypot(player.x-attack.aim.x,player.z-attack.aim.z)<=spec.radius+(player.boss?2:0);

        if(attack.kind==="basic"&&!spec.projectile||spec.kick) {

          const dx=player.x-attack.origin.x,dz=player.z-attack.origin.z,d=Math.hypot(dx,dz),ax=attack.aim.x-attack.origin.x,az=attack.aim.z-attack.origin.z,ad=Math.hypot(ax,az);

          inRange=d<=spec.range+.35+(player.boss?2:0) && (d<.2 || (dx*ax+dz*az)/(d*ad)>.5);

        }

        if(spec.sweepShots){const dx=player.x-attack.origin.x,dz=player.z-attack.origin.z,angle=hitIndex*Math.PI/4,length=Math.hypot(dx,dz);inRange=!attack.hits.some(h=>h.id===player.id)&&length<=spec.range+(player.boss?2:0)&&(length<.3||(dx*Math.sin(angle)-dz*Math.cos(angle))/length>=Math.cos(spec.sweepArc));}

        if(spec.shape==='line'){

          const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z,length2=dx*dx+dz*dz;

          const projection=((player.x-attack.origin.x)*dx+(player.z-attack.origin.z)*dz)/(length2||1);

          const t=Math.max(0,Math.min(1,projection));

          inRange=projection>=0&&projection<=1&&Math.hypot(player.x-attack.origin.x-dx*t,player.z-attack.origin.z-dz*t)<=spec.radius+(player.boss?2:0);

        }

        if(spec.wave){

          const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z,length2=dx*dx+dz*dz;

          const t=((player.x-attack.origin.x)*dx+(player.z-attack.origin.z)*dz)/(spec.fixedLength?Math.sqrt(length2)*spec.range:length2||1);

          inRange=inRange&&t>=Math.max(0,(hitIndex-.5)/(hitOffsets.length-1))&&t<=Math.min(1,(hitIndex+.5)/(hitOffsets.length-1))&&!attack.hits.some(h=>h.id===player.id);

        }

        let precise=null;if(attack.ray){precise=rayBody(attack.ray.origin,attack.ray.direction,player,Math.hypot(attack.aim.x-attack.origin.x,attack.aim.y-attack.origin.y,attack.aim.z-attack.origin.z)+.08);inRange=!!precise;}if(spec.melee&&Math.hypot(player.x-attacker.x,player.z-attacker.z)>spec.range)inRange=false;

        if(!inRange)continue;

        const direct=!!attack.ray||attack.kind==="basic"&&!spec.projectile||spec.trackTarget,source=spec.trackTarget?attacker:attack.origin;

        const from=attack.ray?.origin??{x:direct?source.x:attack.aim.x,y:(direct?source.y:attack.aim.y)+.85,z:direct?source.z:attack.aim.z};

        const to=precise?.point??{x:player.x,y:(player.y??0)+.85,z:player.z},wall=geometry?.sweep(attack.ray?.origin??from,to,.08);

        if(wall && Math.hypot(wall.point.x-from.x,wall.point.y-from.y,wall.point.z-from.z)<Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z)-.15)continue;
        if(parried(attack,player,time))break;
        if(blockedBasic(attack,attacker,player,time)){blocked=true;continue;}

        if(reflectProjectile(attack,attacker,player,spec.damage*(precise?.headshot?spec.headshotMultiplier:1)/(spec.wave||spec.sweepShots?1:hitOffsets.length),time))continue;
        const dealt=applyDamage(player,spec.damage*(precise?.headshot?spec.headshotMultiplier:1)*attackFactor(attacker,time)/(spec.wave||spec.sweepShots?1:hitOffsets.length),attack.impactAt+hitOffsets[hitIndex],precise?{point:precise.point,headshot:precise.headshot}:spec.hitEffect?{nativeEffect:spec.hitEffect,hitIndex,...(comboNext?{combo:comboNext,comboHold,from:{x:source.x,z:source.z}}:{})}:comboNext?{nativeEffect:moves.COMBO.hitEffect,combo:comboNext,comboHold,from:{x:source.x,z:source.z}}:undefined);if(dealt.damage||dealt.absorbed)landed=true;if(dealt.damage)applyStatus(player,spec.status==='stun'?{...spec,statusDuration:Math.max(0,attack.started+spec.duration-time)}:spec,time);if(player.hp===0){player.deadUntil=time+(player.boss?120000:player.enemy?30000:10000);if(!player.enemy)onDefeat({victim:player,attacker:attack.actor,players:room,point:{x:player.x,y:player.y??0,z:player.z},action:{id:attack.id,kind:attack.kind,technique:attack.technique,follow:spec.projectile||spec.wave?"projectile":"actor",started:attack.started,releaseAt:attack.started+spec.windup,impactAt:attack.impactAt+hitOffsets[hitIndex],endsAt:attack.endsAt,origin:{...attack.origin},aim:spec.wave?{x:player.x,y:player.y??0,z:player.z}:{...attack.aim}},at:time});}

        attack.hits.push({id:player.id,hitIndex,at:attack.impactAt+hitOffsets[hitIndex],...dealt});

        if(spec.kick&&dealt.damage&&player.hp>0)project(attack,attacker,player,spec,{x:attack.aim.x-attack.origin.x,z:attack.aim.z-attack.origin.z},time);
        // Scherazard's whip: the opponent she chose is held bound, then pulled back to stand in front of her
        if(spec.pull&&!attack.pulled&&player.hp>0&&!player.boss){attack.pulled=player.id;const dx=attacker.x-player.x,dz=attacker.z-player.z,distance=Math.hypot(dx,dz)-spec.pullStop,caught=attack.impactAt+hitOffsets[hitIndex];
          if(distance>.2)project(attack,attacker,player,{knockback:distance,knockbackDuration:spec.pullDuration},{x:dx,z:dz},caught+spec.bindDelay);
          player.combatLockedUntil=Math.max(player.combatLockedUntil??0,caught+spec.bindDelay+spec.pullDuration);}

      }
      if(attack.cancelled)break;
      // a landed basic attack feeds the combo, a missed one resets it
      if(comboNext){if(landed)attacker.combo={count:comboNext,until:time+moves.COMBO.window};else{attacker.combo=null;if(!blocked)attack.missed={at:time,point:{x:attack.aim.x,y:(attack.aim.y??0)+.9,z:attack.aim.z}};}}

    }

    }

    for(const id of cooldowns.keys())if(!room.has(id))cooldowns.delete(id);

  }

  function snapshot(){return {attacks:[...attacks.values()].filter(a=>now()<=a.endsAt+1800).map(a=>({...a,hits:a.hits.map(h=>({...h}))})),cooldowns:{}};}

  return {action,parry,tick,snapshot,entities:special.entities,canDetonate:id=>!!special.activeSpire(id),cooldownsFor:id=>({...cooldowns.get(id)})};

}

module.exports={createActivityCombat};

