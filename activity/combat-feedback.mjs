import {loadBakedEffect,bakedEffectSprite} from './baked-effects.mjs';
import {combatSpec} from './native-combat.cjs';
import {releasedShots} from './gun-recoil.mjs';
import moves from './combat-moves.cjs';
import daybreakCrafts from './daybreak-crafts.cjs';
import {playReanCraftSounds} from './rean-craft-sounds.mjs';
// What makes the shared moves readable (combat-moves.cjs): combo hits shake the target and show the
// combo counter, a missed swing puffs, a parried craft says so and blows up on its caster, a dodge
// leaves a trail of dust on the ground.
const SHAKE_MS=260,PUFF_MS=600,DUST_EVERY=22,FLASH_MS=90;
// combo count drawn like the damage numbers, outlined in yellow
let comboLabelId=0;
function comboMarkup(count){const text=count+(count>1?' coups':' coup'),width=text.length*34+36,id='combo-glow-'+(++comboLabelId);return {width,markup:`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${width} 100" style="overflow:visible"><defs><filter id="${id}" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="3"/></filter></defs><text x="${width/2}" y="73" text-anchor="middle" font-family="Arial, sans-serif" font-size="58" font-weight="900" font-style="italic" fill="#ffc400" stroke="#ffc400" stroke-width="5" filter="url(#${id})">${text}</text><text x="${width/2}" y="73" text-anchor="middle" font-family="Arial, sans-serif" font-size="58" font-weight="900" font-style="italic" fill="white" stroke="#e0a800" stroke-width="2" paint-order="stroke fill">${text}</text></svg>`};}
// game sounds of the moves (combat-sounds.mjs)
const HIT_SOUNDS=['hit1','hit2','hit3','hit4'],CRAFT_SOUNDS={Olivier:'olivier',Antoine:'antoine',Joshua:'joshua'};
export async function createCombatFeedback(THREE,scene,assets,container,sounds=null){
 const bank=name=>loadBakedEffect(THREE,assets,name,90);
 const [hitBank,missBank,counterBank,dustBank,sparkBank]=await Promise.all(['sc-ms00271b','sc-ms04532','sc-mp094_00','sc-ms30001c','sc-mp008_01'].map(bank));
 const lifetime={hit:400,miss:700,counter:900,dust:PUFF_MS,spark:450};
 const bursts=[],shakes=new Map(),shown=new Map(),trails=new Map(),parries=new Map(),flashes=new Map(),combos=new Map();
 function burst(kind,point,size,delay=0,follow=null,from=null){const source={hit:hitBank,miss:missBank,counter:counterBank,dust:dustBank,spark:sparkBank}[kind],fx=bakedEffectSprite(THREE,source,size);fx.sprite.visible=false;fx.sprite.renderOrder=6;scene.add(fx.sprite);bursts.push({fx,kind,point:point?{...point}:null,follow,from,started:performance.now()+delay*1000});return fx;}
 const callout=(text,color)=>{const el=document.createElement('div');el.textContent=text;el.style.cssText=`position:absolute;pointer-events:none;z-index:19;font:700 22px AveriaSky,serif;color:${color};text-shadow:0 0 5px #000,0 2px 0 #000;transform:translate(-50%,-100%);white-space:nowrap`;container.append(el);return el;};
 const labels=[];
 return {
  // a damage event of the server: combo hits and parry counters get their own impact and a shake
  impact(id,event,delay=0){
   if(event.amount>0)this.hurt(id,delay);
   if(event.combo!=null){this.comboCount(id,event.combo,event.comboHold,delay);setTimeout(()=>sounds?.playAny(HIT_SOUNDS),delay*1000);}
   if(event.combo==null&&!event.parry)return false;
   shakes.set(id,{started:performance.now()+delay*1000,strength:event.parry?.16:Math.min(.14,.06+.012*event.combo)});
   const own=!event.parry&&event.nativeEffect&&event.nativeEffect!==moves.COMBO.hitEffect;if(own)return false;
   if(event.parry)burst('counter',event.point,3.2,delay,id);else burst('hit',event.point,3.2,delay,id,event.from??null);
   return true;
  },
  // the local player pressed parry: a short glint on their sprite while it is live
  parryPressed(id){parries.set(id,performance.now());},
  // any damage: the sprite flashes white for an instant
  hurt(id,delay=0){flashes.set(id,performance.now()+delay*1000);},
  // combo count next to the hit, kept for comboHold ms (two slow basic-attack cooldowns)
  comboCount(id,count,hold=1400,delay=0){
   const old=combos.get(id);old?.el.remove();
   const label=comboMarkup(count),el=document.createElement('div');el.className='sky-combo';el.style.cssText='position:absolute;pointer-events:none;display:flex;z-index:18;transform:translate(0,-100%)';el.innerHTML=label.markup;el.hidden=true;container.append(el);
   combos.set(id,{el,width:label.width,started:performance.now()+delay*1000,hold});
  },
  update(actions,avatars,camera,width,height){
   const now=performance.now();
   for(const [id,event]of actions){
    // a swing that touched nobody
    // what was already shown, per attack (ids may contain ':', e.g. the training AI's)
    let done=shown.get(id);if(!done)shown.set(id,done=new Set());
    const fresh=now-event.localStart<1000;
    if(event.missed&&!done.has('miss')){done.add('miss');if(fresh)sounds?.play('miss');}
    if(!done.has('start')){done.add('start');if(fresh&&isDodge(event))sounds?.play('dash');else if(fresh&&event.kind==='craft'&&CRAFT_SOUNDS[event.character])sounds?.play(CRAFT_SOUNDS[event.character]);}
    const spec=combatSpec(event.character,event.kind);
    playReanCraftSounds(event,now,done,sounds);
    if(event.character==='Don'&&event.special==='donCannon'&&!event.cancelled){
      const elapsed=now-event.localStart,marks=event.kind==='basic'?[['don-shot',140],...(event.explodedAt==null?[]:[['don-explosion',event.explodedAt-event.started]])]:[['don-slam',900]];
      for(const [sound,at]of marks)if(elapsed>=at&&!done.has(sound)){done.add(sound);if(elapsed-at<200)sounds?.play(sound);}
    }

    if(event.kind==='craft'&&!event.cancelled&&Object.hasOwn(daybreakCrafts.CRAFTS,event.character)){const spec=daybreakCrafts.CRAFTS[event.character],elapsed=now-event.localStart;for(const [name,at,gain]of (spec.coinShot?[['block',spec.throwAt,.25],['josette-shot',spec.fireAt,.75]]:spec.zeroth?[['block',1900,.35],['dash',spec.moveStart,.55],['hit2',spec.hitAt,.8],['hit4',spec.hitTimes[1],.8]]:spec.hitTimes.map((at,i)=>['hit'+(i%4+1),at,i===spec.hitTimes.length-1?.65:.35]))){const key='daybreak-sound:'+name+':'+at,age=elapsed-at;if(age>=0&&!done.has(key)){done.add(key);if(age<180)sounds?.play(name,{gain});}}}
    const sound=event.character==='Carna'&&['basic','craft'].includes(event.kind)?'carna-shot':event.character==='Josette'&&event.kind==='basic'?'josette-shot':event.character==='Scherazard'&&['basic','craft'].includes(event.kind)?'schera-whip':null;
    if(sound&&!event.cancelled&&!event.reflectedProjectile){
     for(const shot of releasedShots(event,spec,now)){
      const key='sound:'+shot.index;if(done.has(key))continue;done.add(key);
      if(shot.age<150)sounds?.play(sound,{gain:event.character==='Carna'?.3:1});
     }
    }
    for(const hit of event.hits??[]){
     if(hit.parried&&!done.has('parry:'+hit.id)){done.add('parry:'+hit.id);labels.push({el:callout('Parade !','#9fe8ff'),id:hit.id,started:now});}
     // a basic attack stopped by a guard facing it
     if(hit.blocked&&!done.has('block:'+hit.id+':'+hit.at)){done.add('block:'+hit.id+':'+hit.at);burst('spark',hit.point,2.8,0,hit.point?null:hit.id);sounds?.play('block');}
    }
    // dodge: puffs of dust left on the ground along the way
    const owner=avatars.get(event.actor);
    if(isDodge(event)&&owner&&!event.cancelled){let trail=trails.get(id);if(!trail){trail={next:0};trails.set(id,trail);}
     const age=now-event.localStart;if(age<moves.DODGE.dashDuration+40&&now>=trail.next){trail.next=now+DUST_EVERY;burst('dust',{x:owner.position.x,y:owner.position.y+.2,z:owner.position.z},2.6);}}
   }
   for(const id of trails.keys())if(!actions.has(id))trails.delete(id);
   for(const id of shown.keys())if(!actions.has(id))shown.delete(id);
   for(let i=bursts.length-1;i>=0;i--){const b=bursts[i],age=now-b.started;if(age>=lifetime[b.kind]){scene.remove(b.fx.sprite);b.fx.dispose();bursts.splice(i,1);continue;}
    const target=b.follow&&avatars.get(b.follow),point=b.point??(target&&{x:target.position.x,y:target.position.y+Math.min(target.info?.bodyHeight??target.info?.height??1.6,1.8)*.55,z:target.position.z});
    b.fx.sprite.visible=age>=0&&!!point;if(!b.fx.sprite.visible)continue;b.fx.sprite.position.set(point.x,point.y,point.z);
    // nudge towards the camera so the flash stays in front of the body it hits
    if(b.kind!=='dust')b.fx.sprite.position.add(new THREE.Vector3().subVectors(camera.position,b.fx.sprite.position).normalize().multiplyScalar(.25));
    if(b.kind==='dust')b.fx.sprite.material.opacity=.8*(1-age/lifetime.dust);
    // the hit flash points the way the blow travelled (its spikes face up in the source frames)
    if(b.kind==='hit'&&b.from){const at=new THREE.Vector3(point.x,point.y,point.z).project(camera),src=new THREE.Vector3(b.from.x,point.y,b.from.z).project(camera),dx=(at.x-src.x)*width,dy=(at.y-src.y)*height;if(Math.hypot(dx,dy)>1e-6)b.fx.sprite.material.rotation=Math.atan2(dy,dx)-Math.PI/2;}
    b.fx.draw(age*(1000/lifetime[b.kind]));}
   // shake: a quick sideways tremble of the sprite, applied after the scene placed it this frame
   const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0);
   for(const [id,s]of shakes){const avatar=avatars.get(id),age=now-s.started;if(!avatar||age>SHAKE_MS){shakes.delete(id);continue;}if(age<0)continue;
    const k=s.strength*(1-age/SHAKE_MS)*Math.sin(age*.12);avatar.mesh.position.addScaledVector(right,k);}
   for(const [id,started]of flashes){const avatar=avatars.get(id),age=now-started;if(!avatar||age>FLASH_MS){flashes.delete(id);continue;}if(age>=0&&!avatar.zerothBlack)avatar.mesh.material.color.setScalar(4);}
   for(const [id,c]of combos){const avatar=avatars.get(id),age=now-c.started;if(!avatar||age>c.hold){c.el.remove();combos.delete(id);continue;}
    c.el.hidden=age<0;if(age<0)continue;
    const h=avatar.info?.bodyHeight??avatar.info?.height??1.6,screen=new THREE.Vector3(avatar.position.x,avatar.position.y+h+.3,avatar.position.z).project(camera),pop=Math.min(1,age/80),scale=.55+.15*(1-pop);
    c.el.hidden=screen.z>1;const tremble=age<1000?4*(1-age/1000):0;
    c.el.style.left=((screen.x+1)*width/2+26+tremble*Math.sin(age*.09))+'px';c.el.style.top=((1-screen.y)*height/2+18+tremble*Math.cos(age*.13))+'px';c.el.style.width=(c.width*scale)+'px';c.el.style.height=(100*scale)+'px';c.el.style.opacity=String(Math.min(1,(c.hold-age)/300));}
   for(const [id,started]of parries){const avatar=avatars.get(id),age=now-started;if(!avatar||age>moves.PARRY.window){if(avatar)avatar.mesh.material.color.set(avatar.guarding?0xb8daff:0xffffff);parries.delete(id);continue;}
    const glow=1-age/moves.PARRY.window;avatar.mesh.material.color.setRGB(1-.35*glow,1-.1*glow,1);}
   for(const [id,avatar] of avatars)if(avatar.guarding&&!flashes.has(id))avatar.mesh.material.color.set(0xb8daff);
   for(let i=labels.length-1;i>=0;i--){const l=labels[i],avatar=avatars.get(l.id),age=(now-l.started)/1000;if(!avatar||age>1.1){l.el.remove();labels.splice(i,1);continue;}
    const h=avatar.info?.bodyHeight??avatar.info?.height??1.6,screen=new THREE.Vector3(avatar.position.x,avatar.position.y+h+.5,avatar.position.z).project(camera);
    l.el.hidden=screen.z>1;l.el.style.left=((screen.x+1)*width/2)+'px';l.el.style.top=((1-screen.y)*height/2-30*age)+'px';l.el.style.opacity=String(Math.min(1,(1.1-age)/.4));}
  },
  dispose(){for(const b of bursts){scene.remove(b.fx.sprite);b.fx.dispose();}bursts.length=0;for(const l of labels)l.el.remove();for(const c of combos.values())c.el.remove();combos.clear();for(const b of [hitBank,missBank,counterBank,dustBank,sparkBank])b.dispose();}
 };
}
export function isDodge(event){return !!event.dodge;}
