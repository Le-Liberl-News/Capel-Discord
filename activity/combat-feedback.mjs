import {loadBakedEffect,bakedEffectSprite} from './baked-effects.mjs';
import moves from './combat-moves.cjs';
// What makes the shared moves readable (combat-moves.cjs): combo hits shake the target and show the
// combo counter, a missed swing puffs, a parried craft says so and blows up on its caster, a dodge
// leaves a trail of dust on the ground.
const SHAKE_MS=260,PUFF_MS=600,DUST_EVERY=45;
export async function createCombatFeedback(THREE,scene,assets,container){
 const bank=name=>loadBakedEffect(THREE,assets,name,90);
 const [hitBank,missBank,counterBank,dustBank]=await Promise.all(['sc-ms00271b','sc-ms04532','sc-mp094_00','sc-ms30001c'].map(bank));
 const lifetime={hit:400,miss:700,counter:900,dust:PUFF_MS};
 const bursts=[],shakes=new Map(),shown=new Map(),trails=new Map(),parries=new Map();
 function burst(kind,point,size,delay=0,follow=null){const source={hit:hitBank,miss:missBank,counter:counterBank,dust:dustBank}[kind],fx=bakedEffectSprite(THREE,source,size);fx.sprite.visible=false;fx.sprite.renderOrder=6;scene.add(fx.sprite);bursts.push({fx,kind,point:point?{...point}:null,follow,started:performance.now()+delay*1000});return fx;}
 const counter=document.createElement('div');counter.id='sky-combo';counter.hidden=true;
 counter.style.cssText='position:fixed;right:24px;bottom:96px;z-index:24;pointer-events:none;font:700 34px AveriaSky,serif;color:#ffe08a;text-shadow:0 0 6px #b2560f,0 2px 0 #4a2306;text-align:right;transition:transform .08s';
 container.append(counter);
 const callout=(text,color)=>{const el=document.createElement('div');el.textContent=text;el.style.cssText=`position:absolute;pointer-events:none;z-index:19;font:700 22px AveriaSky,serif;color:${color};text-shadow:0 0 5px #000,0 2px 0 #000;transform:translate(-50%,-100%);white-space:nowrap`;container.append(el);return el;};
 const labels=[];
 let comboShown=0;
 return {
  // a damage event of the server: combo hits and parry counters get their own impact and a shake
  impact(id,event,delay=0){
   if(event.combo==null&&!event.parry)return false;
   shakes.set(id,{started:performance.now()+delay*1000,strength:event.parry?.16:Math.min(.14,.06+.012*event.combo)});
   const own=!event.parry&&event.nativeEffect&&event.nativeEffect!==moves.COMBO.hitEffect;if(own)return false;
   if(event.parry)burst('counter',event.point,3.2,delay,id);else burst('hit',event.point,1.6,delay,id);
   return true;
  },
  // the local player pressed parry: a short glint on their sprite while it is live
  parryPressed(id){parries.set(id,performance.now());},
  setCombo(count){if(count===comboShown)return;const grew=count>comboShown;comboShown=count;counter.hidden=count<2;if(count>=2){counter.innerHTML=`${count}<small style="font-size:18px;margin-left:6px">COMBO</small>`;if(grew){counter.style.transform='scale(1.25)';setTimeout(()=>counter.style.transform='',90);}}},
  update(actions,avatars,camera,width,height){
   const now=performance.now();
   for(const [id,event]of actions){
    // a swing that touched nobody
    // what was already shown, per attack (ids may contain ':', e.g. the training AI's)
    let done=shown.get(id);if(!done)shown.set(id,done=new Set());
    if(event.missed&&!done.has('miss')){done.add('miss');burst('miss',event.missed.point,1.4);}
    for(const hit of event.hits??[])if(hit.parried&&!done.has('parry:'+hit.id)){done.add('parry:'+hit.id);labels.push({el:callout('Parade !','#9fe8ff'),id:hit.id,started:now});}
    // dodge: puffs of dust left on the ground along the way
    const owner=avatars.get(event.actor);
    if(isDodge(event)&&owner&&!event.cancelled){let trail=trails.get(id);if(!trail){trail={next:0};trails.set(id,trail);}
     const age=now-event.localStart;if(age<moves.DODGE.dashDuration+40&&now>=trail.next){trail.next=now+DUST_EVERY;burst('dust',{x:owner.position.x,y:owner.position.y+.15,z:owner.position.z},1.3);}}
   }
   for(const id of trails.keys())if(!actions.has(id))trails.delete(id);
   for(const id of shown.keys())if(!actions.has(id))shown.delete(id);
   for(let i=bursts.length-1;i>=0;i--){const b=bursts[i],age=now-b.started;if(age>=lifetime[b.kind]){scene.remove(b.fx.sprite);b.fx.dispose();bursts.splice(i,1);continue;}
    const target=b.follow&&avatars.get(b.follow),point=b.point??(target&&{x:target.position.x,y:target.position.y+Math.min(target.info?.bodyHeight??target.info?.height??1.6,1.8)*.55,z:target.position.z});
    b.fx.sprite.visible=age>=0&&!!point;if(!b.fx.sprite.visible)continue;b.fx.sprite.position.set(point.x,point.y,point.z);
    // nudge towards the camera so the flash stays in front of the body it hits
    if(b.kind!=='dust')b.fx.sprite.position.add(new THREE.Vector3().subVectors(camera.position,b.fx.sprite.position).normalize().multiplyScalar(.25));
    if(b.kind==='dust')b.fx.sprite.material.opacity=.8*(1-age/lifetime.dust);
    b.fx.draw(age*(1000/lifetime[b.kind]));}
   // shake: a quick sideways tremble of the sprite, applied after the scene placed it this frame
   const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0);
   for(const [id,s]of shakes){const avatar=avatars.get(id),age=now-s.started;if(!avatar||age>SHAKE_MS){shakes.delete(id);continue;}if(age<0)continue;
    const k=s.strength*(1-age/SHAKE_MS)*Math.sin(age*.12);avatar.mesh.position.addScaledVector(right,k);}
   for(const [id,started]of parries){const avatar=avatars.get(id),age=now-started;if(!avatar||age>moves.PARRY.window){if(avatar)avatar.mesh.material.color.setRGB(1,1,1);parries.delete(id);continue;}
    const glow=1-age/moves.PARRY.window;avatar.mesh.material.color.setRGB(1-.35*glow,1-.1*glow,1);}
   for(let i=labels.length-1;i>=0;i--){const l=labels[i],avatar=avatars.get(l.id),age=(now-l.started)/1000;if(!avatar||age>1.1){l.el.remove();labels.splice(i,1);continue;}
    const h=avatar.info?.bodyHeight??avatar.info?.height??1.6,screen=new THREE.Vector3(avatar.position.x,avatar.position.y+h+.5,avatar.position.z).project(camera);
    l.el.hidden=screen.z>1;l.el.style.left=((screen.x+1)*width/2)+'px';l.el.style.top=((1-screen.y)*height/2-30*age)+'px';l.el.style.opacity=String(Math.min(1,(1.1-age)/.4));}
  },
  dispose(){for(const b of bursts){scene.remove(b.fx.sprite);b.fx.dispose();}bursts.length=0;for(const l of labels)l.el.remove();counter.remove();for(const b of [hitBank,missBank,counterBank,dustBank])b.dispose();}
 };
}
export function isDodge(event){return !!event.dodge;}
