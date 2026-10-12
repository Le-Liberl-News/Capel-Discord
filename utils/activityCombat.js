const {rayBody,validateRay,bodyHeight}=require('../activity/fps-combat.cjs');

const {projectionPosition,projectionPath,tornadoPosition,segmentDistance}=require('../activity/combat-projection.cjs');

const {combatMotion}=require('../activity/combat-motion.cjs');

const {immobilized,attackFactor,applyStatus,applyBuff}=require('../activity/combat-status.cjs');

const {applyDamage}=require('./activityDamage');

const { combatSpec, attackPoint } = require("../activity/native-combat.cjs");

function createActivityCombat({ now = Date.now, geometry = null, grid, onCraft = () => {}, onDefeat = () => {}, canDamage = () => true, dungeon=null, platforms=null }) {

  const attacks = new Map(), cooldowns = new Map(), projections=new Map();

  let players;const damagePolicy=canDamage;canDamage=(a,b)=>{const owner=a.owner?players?.get(a.owner)??a:a,target=b.owner?players?.get(b.owner)??b:b;return owner.id!==target.id&&damagePolicy(owner,target);};

  const floor = point => {

    const moving=platforms?.floor(point);if(moving!==null&&moving!==undefined)return moving;

    if (geometry) return geometry.floor(point.x, point.z, point.y + .5);

    const x=Math.round((point.x-grid.origin.x)/grid.step), z=Math.round((point.z-grid.origin.z)/grid.step);

    return x<0||z<0||x>=grid.width||z>=grid.height ? null : grid.cells[z*grid.width+x];

  };

  const special=require('./activitySpecialCrafts').createSpecialCrafts({now,geometry,floor,canDamage:(a,b)=>canDamage(a,b),hurt:(...args)=>hurt(...args),attacks,onCraft});

  const trinity=require('./activityTrinity').createTrinity({now,attacks,canDamage:(a,b)=>canDamage(a,b),hurt:(...args)=>hurt(...args)});

  function action(player, command, room) {

    players=room;

    if(player.character==='Campanella'&&command.kind==='craft'&&player.hp>0&&!player.spectator&&!player.duelProtected&&!immobilized(player,now())&&special.detonate(player,room))return {combatId:command.id};

    let spec = combatSpec(player.character,command.kind);const time=now(),continuation=spec?.special==='trinity'&&trinity.active(player);if(spec?.special==='trinity')spec=trinity.prepare(player,spec);

    if (!spec || player.hp <= 0 || player.spectator || player.canMove === false || immobilized(player,time) || time<(player.combatLockedUntil??0))

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

    const airborneMelee=command.kind==='basic'&&!spec.projectile;

    const ground = fps||spec.effect||airborneMelee?endpoint.y:floor(endpoint);

    if (ground === null || !Number.isFinite(ground) || Math.abs(ground-endpoint.y)>1.2)

      return { error: "Visez le sol." };

    endpoint.y=ground;

    const from=fps?fps.origin:{...origin,y:origin.y+.85},to=fps?endpoint:{...endpoint,y:endpoint.y+.85};

    const hit=geometry?.sweep(from,to,.12);

    const distance=Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z);

    if((spec.effect||spec.chargeStun)&&hit&&Math.hypot(hit.point.x-from.x,hit.point.y-from.y,hit.point.z-from.z)<distance-.2)return {error:'La cible est derrière un obstacle.'};

    if(spec.special!=='phoenix' && hit && Math.hypot(hit.point.x-from.x,hit.point.y-from.y,hit.point.z-from.z)<distance-.2) {

      obstacleImpact=!!fps;
      const stop=spec.dash?Math.max(0,Math.hypot(hit.point.x-origin.x,hit.point.z-origin.z)-.2):null;

      if(stop!==null){const length=Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z);endpoint.x=origin.x+(endpoint.x-origin.x)*stop/length;endpoint.z=origin.z+(endpoint.z-origin.z)*stop/length;}else{endpoint.x=hit.point.x;endpoint.z=hit.point.z;}endpoint.y=hit.point.y-(fps?0:.85);

    }

    if(spec.dash){

      const length=Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z);let previous=player.jump?floor(origin):origin.y;

      if(previous===null||!Number.isFinite(previous))return {error:'Le trajet doit rester sur un sol accessible.'};

      for(let n=1;n<=Math.ceil(length/.2);n++){

        const t=n/Math.ceil(length/.2),p={x:origin.x+(endpoint.x-origin.x)*t,y:previous,z:origin.z+(endpoint.z-origin.z)*t},height=floor(p);

        if(height===null||!Number.isFinite(height)||Math.abs(height-previous)>.35)return {error:'Le trajet doit rester sur un sol accessible.'};
        if(spec.special==='trinity'){const x=Math.round((p.x-grid.origin.x)/grid.step),z=Math.round((p.z-grid.origin.z)/grid.step);if(x<0||z<0||x>=grid.width||z>=grid.height||grid.cells[z*grid.width+x]===null)return {error:'Le trajet doit rester sur un sol accessible.'};}

        previous=height;

      }

      endpoint.y=previous;

    }

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

    const attack={id:command.id,actor:player.id,character:player.character,kind:command.kind,technique:spec.name,target:supportTarget?.id??(spec.targetRequired?command.target:undefined),effect:spec.effect,origin:fps?fps.origin:origin,ray:fps,obstacleImpact,aim:endpoint,started:time,impactAt:time+spec.windup+travel,endsAt:time+Math.max(spec.duration,spec.windup+travel+(spec.persistentBuff?spec.buffDuration:spec.effectDuration??550)),resolved:false,nextHit:0,hits:[]};

    if(spec.lockOn){attack.target=lockedTarget;attack.lockedOffset=lockedOffset;attack.shots=[];}

    if(spec.tornado){attack.impactAt=time+spec.windup;attack.flightEndsAt=attack.impactAt+Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z)/spec.projectileSpeed*1000;attack.endsAt=attack.flightEndsAt+300;}

    if(spec.leap&&spec.landingOffset){const length=Math.hypot(endpoint.x-origin.x,endpoint.z-origin.z),ratio=length?1-Math.min(spec.landingOffset,Math.max(0,length-.2))/length:1,p={x:origin.x+(endpoint.x-origin.x)*ratio,y:endpoint.y,z:origin.z+(endpoint.z-origin.z)*ratio},height=floor(p);attack.landingPoint=height!==null&&Number.isFinite(height)&&Math.abs(height-p.y)<1.2?{...p,y:height}:{...endpoint};}

    special.setup(attack,spec,command,room);
    if(spec.special==='trinity')trinity.setup(attack,spec,player);

    attacks.set(attack.id,attack);players=room;if(spec.chargeStun){const target=room.get(attack.target);applyStatus(target,{status:'stun',statusDuration:spec.duration},time);}

    if(spec.dash||spec.leap){Object.assign(player,{combatDash:attack.id,combatLockedUntil:time+spec.windup+(spec.leapDuration??spec.dashDuration),acceptedAt:time,jump:null,jumpTickAt:null,jumpLandedAt:time,platformId:null,platformOffset:null});}

    if(spec.lockMovement)player.combatLockedUntil=time+spec.duration;

    const cooldown=cooldowns.get(player.id)??{};cooldown[command.kind]=time+spec.cooldown;cooldowns.set(player.id,cooldown);

    player.attackBusyUntil=time+spec.duration;

    if(player.character==='Anton'&&command.kind==='craft'){
      const phrases=["Aidios, je vous en prie...","Monde crueeeeel-- !!","V-Voudriez-vous bien... sortir avec moi ?!!"];
      attack.speech=phrases[Math.floor(Math.random()*phrases.length)];
    }
    if(command.kind==="craft")onCraft({...attack});
    if(attack.speech)return {combatId:attack.id,text:attack.speech,speaker:player.id,character:player.character,instant:true};
    return { combatId:attack.id };

  }

  function hurt(attack,attacker,player,amount,time,impact){

    const dealt=applyDamage(player,amount*attackFactor(attacker,time),time,impact);

    if(player.hp===0&&dealt.damage){player.deadUntil=time+(player.boss?120000:player.enemy?30000:10000);if(!player.enemy)onDefeat({victim:player,attacker:attack.actor,players:players,point:{x:player.x,y:player.y??0,z:player.z},action:{id:attack.id,kind:attack.kind,technique:attack.technique,follow:'projectile',started:attack.started,releaseAt:attack.highlight?attack.started:attack.started+combatSpec(attack.character,attack.kind).windup,impactAt:time,endsAt:Math.max(time+300,attack.endsAt),origin:{...attack.origin},aim:{x:player.x,y:player.y??0,z:player.z}},at:time});}

    return dealt;

  }

  function project(attack,attacker,player,spec,direction,time){

    const safeFloor=point=>{const x=Math.round((point.x-grid.origin.x)/grid.step),z=Math.round((point.z-grid.origin.z)/grid.step);if(x<0||z<0||x>=grid.width||z>=grid.height||grid.cells[z*grid.width+x]===null)return null;const y=floor(point);return Number.isFinite(y)&&Math.abs(y-grid.cells[z*grid.width+x])<=.35?y:null;};
    const path=projectionPath(player,direction,spec.knockback,safeFloor,geometry);if(!path)return;

    const duration=spec.knockbackDuration??450,projection={...path,id:attack.id+':'+player.id,started:time,duration};

    player.knockback=projection;player.jump=null;player.platformId=null;player.platformOffset=null;player.combatLockedUntil=Math.max(player.combatLockedUntil??0,time+duration);player.acceptedAt=time;

    if(player.enemy){player.attack=null;player.charge=null;player.path=[];player.stunUntil=Math.max(player.stunUntil??0,time+duration);}

    projections.set(player.id,{projection,attack,attacker,spec});

  }

  function tick(room) {

    players=room;const time=now();special.tickEntities(room);

    for(const player of room.values())if(player.knockback&&!projections.has(player.id)){player.knockback=null;}

    for(const [id,push]of projections){const player=room.get(id),{projection,attack,attacker,spec}=push;if(!player||player.hp<=0||player.knockback?.id!==projection.id){projections.delete(id);if(player)player.knockback=null;continue;}

      Object.assign(player,projectionPosition(projection,time));player.acceptedAt=time;

      if(time>=projection.started+projection.duration){player.knockback=null;projections.delete(id);if(projection.wall&&spec.wallDamage){const dealt=hurt(attack,attacker,player,spec.wallDamage,time,{point:{x:player.x,y:(player.y??0)+.8,z:player.z}});attack.hits.push({id:player.id,at:time,wall:true,...dealt});if(dealt.damage){applyStatus(player,{status:'stun',statusDuration:spec.wallStun},time);player.downUntil=time+spec.wallStun;}}}

    }

    for(const [id,attack]of attacks) {

      if(time>attack.endsAt+5000){attacks.delete(id);continue;}

      const dashSpec=combatSpec(attack.character,attack.kind);
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

        else {const motion=combatMotion(attack,time-attack.started,dashSpec);Object.assign(actor,motion.position);if(!motion.active){attack.dashFinished=true;actor.acceptedAt=time;}}

      }

      const hitOffsets=dashSpec?.hitOffsets??[0];

      if(attack.resolved||time<attack.impactAt+hitOffsets[attack.nextHit])continue;

      while(attack.nextHit<hitOffsets.length&&time>=attack.impactAt+hitOffsets[attack.nextHit]){

      const hitIndex=attack.nextHit++;attack.resolved=attack.nextHit===hitOffsets.length;

      const attacker=room.get(attack.actor),spec=combatSpec(attack.character,attack.kind);

      if(!attacker||attacker.hp<=0||attacker.character!==attack.character||attacker.spectator||immobilized(attacker,time)){attack.cancelled=true;attack.resolved=true;break;}

      if(spec.effect){const target=room.get(attack.target);if(!target||target.hp<=0||target.enemy||target.spectator||Math.hypot(target.x-attacker.x,target.z-attacker.z)>spec.range||Math.abs((target.y??0)-(attacker.y??0))>3){attack.cancelled=true;attack.resolved=true;break;}attack.aim={x:target.x,y:target.y??0,z:target.z};if(spec.effect==='heal'){const heal=Math.max(0,Math.min(spec.heal,(target.maxHp??require('../activity/player-health.cjs').PLAYER_MAX_HP)-target.hp));target.hp+=heal;attack.hits.push({id:target.id,heal});}else if(spec.effect==='guard'){target.guard={until:time+spec.shieldDuration};attack.hits.push({id:target.id,guard:true});}else if(spec.effect.endsWith('Buff')){applyBuff(target,spec,time);attack.hits.push({id:target.id,buff:spec.effect});}else {target.shield={hp:spec.shield,maxHp:spec.shield,until:time+spec.shieldDuration};attack.hits.push({id:target.id,shield:spec.shield});}continue;}

      if(spec.trackTarget){const target=room.get(attack.target);if(target&&target.hp>0&&Math.hypot(target.x-attacker.x,target.z-attacker.z)<=spec.range){attack.aim={x:target.x,y:target.y??0,z:target.z};}}

      if(spec.arcFencer){const dx=attack.aim.x-attack.origin.x,dy=attack.aim.y-attack.origin.y,dz=attack.aim.z-attack.origin.z;attack.origin={x:attacker.x,y:attacker.y??0,z:attacker.z};attack.aim={x:attacker.x+dx,y:(attacker.y??0)+dy,z:attacker.z+dz};}

      if(spec.selfTarget){attack.origin={x:attacker.x,y:attacker.y??0,z:attacker.z};attack.aim={...attack.origin};}

      if(attack.kind==='basic'&&!spec.projectile){const dx=attack.aim.x-attack.origin.x,dz=attack.aim.z-attack.origin.z;attack.origin={x:attacker.x,y:attacker.y??0,z:attacker.z};attack.aim={x:attacker.x+dx,y:attacker.y??0,z:attacker.z+dz};}

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

          const t=((player.x-attack.origin.x)*dx+(player.z-attack.origin.z)*dz)/(length2||1);

          inRange=inRange&&t>=Math.max(0,(hitIndex-.5)/(hitOffsets.length-1))&&t<=Math.min(1,(hitIndex+.5)/(hitOffsets.length-1))&&!attack.hits.some(h=>h.id===player.id);

        }

        let precise=null;if(attack.ray){precise=rayBody(attack.ray.origin,attack.ray.direction,player,Math.hypot(attack.aim.x-attack.origin.x,attack.aim.y-attack.origin.y,attack.aim.z-attack.origin.z)+.08);inRange=!!precise;}if(spec.melee&&Math.hypot(player.x-attacker.x,player.z-attacker.z)>spec.range)inRange=false;

        if(!inRange)continue;

        const direct=!!attack.ray||attack.kind==="basic"&&!spec.projectile||spec.trackTarget,source=spec.trackTarget?attacker:attack.origin;

        const from=attack.ray?.origin??{x:direct?source.x:attack.aim.x,y:(direct?source.y:attack.aim.y)+.85,z:direct?source.z:attack.aim.z};

        const to=precise?.point??{x:player.x,y:(player.y??0)+.85,z:player.z},wall=geometry?.sweep(attack.ray?.origin??from,to,.08);

        if(wall && Math.hypot(wall.point.x-from.x,wall.point.y-from.y,wall.point.z-from.z)<Math.hypot(to.x-from.x,to.y-from.y,to.z-from.z)-.15)continue;

        const dealt=applyDamage(player,spec.damage*(precise?.headshot?spec.headshotMultiplier:1)*attackFactor(attacker,time)/(spec.wave||spec.sweepShots?1:hitOffsets.length),attack.impactAt+hitOffsets[hitIndex],precise?{point:precise.point,headshot:precise.headshot}:spec.hitEffect?{nativeEffect:spec.hitEffect,hitIndex}:undefined);if(dealt.damage)applyStatus(player,spec.status==='stun'?{...spec,statusDuration:Math.max(0,attack.started+spec.duration-time)}:spec,time);if(player.hp===0){player.deadUntil=time+(player.boss?120000:player.enemy?30000:10000);if(!player.enemy)onDefeat({victim:player,attacker:attack.actor,players:room,point:{x:player.x,y:player.y??0,z:player.z},action:{id:attack.id,kind:attack.kind,technique:attack.technique,follow:spec.projectile||spec.wave?"projectile":"actor",started:attack.started,releaseAt:attack.started+spec.windup,impactAt:attack.impactAt+hitOffsets[hitIndex],endsAt:attack.endsAt,origin:{...attack.origin},aim:spec.wave?{x:player.x,y:player.y??0,z:player.z}:{...attack.aim}},at:time});}

        attack.hits.push({id:player.id,hitIndex,at:attack.impactAt+hitOffsets[hitIndex],...dealt});

        if(spec.kick&&dealt.damage&&player.hp>0)project(attack,attacker,player,spec,{x:attack.aim.x-attack.origin.x,z:attack.aim.z-attack.origin.z},time);

      }

    }

    }

    for(const id of cooldowns.keys())if(!room.has(id))cooldowns.delete(id);

  }

  function snapshot(){return {attacks:[...attacks.values()].filter(a=>now()<=a.endsAt+1800).map(a=>({...a,hits:a.hits.map(h=>({...h}))})),cooldowns:{}};}

  return {action,tick,snapshot,entities:special.entities,canDetonate:id=>!!special.activeSpire(id),cooldownsFor:id=>({...cooldowns.get(id)})};

}

module.exports={createActivityCombat};

