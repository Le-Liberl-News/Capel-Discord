import {createPomFortress,TEXTURES} from './pom-fortress-model.mjs';
import {loadNativeProp} from './native-prop.mjs';
// The Mechapom fortress in the battle (mechapom.cjs): the model where the server puts it, coming down from the sky
// at a wave's start and rising back at its end; walking, its headlights, flamethrowers and pods turned toward the
// nearest defender; the missiles the server fires, homing on their target; the fire it leaves along its route.
// Its landing and its take-off are cinematics, for everyone connected at once (they follow the server's clock): the
// camera low as it comes down, then round it, its name and how far it still is from the gate; at a wave's end a
// two-second travelling from where the player was looking up to it, then it rises out of sight.
const SKY=140,LANDING=8,TAKE_OFF=12,REACH=45,SIZE=1/1.5;   // SIZE: as in mechapom.cjs
const LANDED_SHOT=4,TAKE_OFF_SHOT=7,TRAVELLING=2;   // seconds of film after it lands, and of its take-off
// the crew standing on its deck: poms of every kind
const CREW=['pom-tiron','agate-2','estelle-aspi','aina-2','joshua-2','kloe-funebre','olivier-aspi'];
const ease=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
// ready: resolves once the game is playable; its 3D model and textures load only then
export function createMechapomView({T,scene,asset,scale,getState,getOwn,sounds,ready=Promise.resolve()}){
 let view=null,loading=false,landed=false,shake=0,clock=0;   // clock: its own seconds (the scene hands the frame's length)
 // a step, a landing: the ground shakes, the closer the stronger
 const onShake=(at,strength)=>{const own=getOwn();const d=own?Math.hypot(own.x-at.x,own.z-at.z):60;shake=Math.max(shake,strength*Math.max(0,1-d/(80*scale)));};const seen=new Set(),fires=new Map(),loader=new T.TextureLoader();let fireMap=null;
 async function load(){
  const textures={};
  await Promise.all([...TEXTURES.map(async name=>{textures[name]=await loader.loadAsync(asset(`/assets/siege/pom-fortress/${name}.png`));}),
   loader.loadAsync(asset('/assets/sky/effects/fire-frames.png')).then(map=>{map.colorSpace=T.SRGBColorSpace;textures.fire=fireMap=map;})]);
  const missile=await loadNativeProp(T,asset,'missile',.4).catch(()=>null);
  const fortress=createPomFortress(T,{textures,missile,missileSpeed:70*scale,autoFire:false,lights:false,onStep:(leg,at)=>onShake(at,.35),onMissile:at=>sounds?.play('don-explosion',{gain:.8,position:at})});
  fortress.root.scale.setScalar(scale*SIZE);
  // the crew: the poms' sprites on the deck, still
  for(const [i,at] of fortress.crew.entries()){
   const name=CREW[i%CREW.length];
   loader.loadAsync(asset(name==='pom-tiron'?'/assets/sky/chat/pom-tiron.png':`/assets/sky/chat/pom/${name}.png`)).then(map=>{
    map.colorSpace=T.SRGBColorSpace;map.magFilter=map.minFilter=T.NearestFilter;
    const sprite=new T.Sprite(new T.SpriteMaterial({map,transparent:true,alphaTest:.08}));sprite.scale.setScalar(2.4);sprite.position.copy(at).add(new T.Vector3(0,1.1,0));fortress.hull.add(sprite);
   }).catch(()=>{});
  }
  scene.add(fortress.root,fortress.effects);
  return fortress;
 }
 // where an actor is now, in the scene; the Lynx flies in the scene's units already
 function where(id){
  const state=getState();if(id==='lynx'){const s=state.lynx;return s?.pilot&&s.hp>0?new T.Vector3(s.x,s.y+.6,s.z):null;}
  const a=[...state.players,...state.soldiers].find(a=>a.id===id);return a&&a.hp>0?new T.Vector3(a.x,a.y+.8,a.z):null;
 }
 function nearest(m){
  const state=getState();let best=null,d=REACH*scale;
  for(const a of [...state.players.filter(p=>!p.pomControlled),...state.soldiers])if(a.hp>0){const k=Math.hypot(a.x-m.x,a.z-m.z);if(k<d){d=k;best=a;}}
  return best&&new T.Vector3(best.x,best.y+.8,best.z);
 }
 // the burnt route: a flame at each of the last points it walked through (the older ones die out)
 function burn(trail){
  if(!fireMap)return;
  const keep=new Set();
  for(const p of trail.slice(-14)){
   const key=Math.round(p.x*10)+':'+Math.round(p.z*10);keep.add(key);if(fires.has(key))continue;
   const group=new T.Group();group.position.set(p.x,p.y,p.z);
   const map=fireMap.clone();map.repeat.set(.25,1);const sprite=new T.Sprite(new T.SpriteMaterial({map,transparent:true,depthWrite:false,blending:T.AdditiveBlending,opacity:.85}));
   sprite.position.set(0,.9,0);sprite.scale.set(2.4,2.6,1);group.add(sprite);
   scene.add(group);fires.set(key,group);
  }
  for(const [key,group]of fires)if(!keep.has(key)){scene.remove(group);for(const sprite of group.children){sprite.material.map.dispose();sprite.material.dispose();}fires.delete(key);}
 }
 // the cinematics' own camera and caption
 const film=new T.PerspectiveCamera(45,1,.5,900),aim=new T.PerspectiveCamera(),canvas=document.getElementById('scene');let filming=false,from=null;
 const caption=document.createElement('div');caption.style.cssText='position:fixed;left:0;right:0;bottom:16%;z-index:25;display:none;text-align:center;pointer-events:none;padding:10px 0;background:linear-gradient(90deg,transparent,#14080699 20%,#14080699 80%,transparent);transition:opacity .4s';
 const title=document.createElement('div');title.style.cssText='font:700 30px Cinzel,Georgia,serif;letter-spacing:.06em;color:#ffb36a;text-shadow:0 2px 0 #2a0c06,0 0 14px #c2361a';
 const line=document.createElement('div');line.style.cssText='margin-top:4px;font:600 16px system-ui;color:#ffe7b0;text-shadow:0 1px 3px #000';
 caption.append(title,line);document.body.append(caption);
 function shoot(m,age,camera){
  const landing=m.grounded&&age<LANDING+LANDED_SHOT,rising=!m.grounded&&age<TAKE_OFF_SHOT;
  if(!landing&&!rising||!camera){if(filming){filming=false;from=null;caption.style.display='none';}return;}
  if(!filming){filming=true;from={position:camera.position.clone(),quaternion:camera.quaternion.clone()};}
  film.aspect=(canvas?.clientWidth||innerWidth)/(canvas?.clientHeight||innerHeight);film.updateProjectionMatrix();
  const S=scale*SIZE,spot=new T.Vector3(m.x,m.y,m.z),centre=view.root.position.clone().add(new T.Vector3(0,9*S,0)),side=Math.PI/2-(m.heading??0)+.9,r=62*S;
  if(landing){
   // low on the road beside where it lands, watching it fall; once down, round it and up
   const turn=age<LANDING?0:(age-LANDING)*.3;
   film.position.set(spot.x+Math.cos(side+turn)*r,spot.y+4+ease(turn/1.2)*14,spot.z+Math.sin(side+turn)*r);film.lookAt(centre);   // rising over the deck, to its crew
  }else{
   // from where the player looked, to it in two seconds; then watching it rise
   const goal=new T.Vector3(spot.x+Math.cos(side)*r*.8,spot.y+6,spot.z+Math.sin(side)*r*.8),k=ease(age/TRAVELLING);
   film.position.lerpVectors(from.position,goal,k);
   aim.position.copy(film.position);aim.lookAt(centre);film.quaternion.slerpQuaternions(from.quaternion,aim.quaternion,k);   // aim: a camera, whose lookAt turns its view (not its back) to it
  }
  // its name, and how far it still is from the gate
  const left=Math.round(m.toGate??0);
  title.textContent='Forteresse Mechapom';
  line.textContent=rising?'La forteresse redécolle… elle reviendra à la prochaine vague, à '+left+' m de la porte':m.arrived?'Elle est aux portes de Sanktheim !':'À '+left+' m de la porte';
  caption.style.display='';caption.style.opacity=landing&&age<1||rising&&age>TAKE_OFF_SHOT-1?'0':'1';
 }
 function update({time,seconds,serverAt,camera}){
  clock+=seconds;const m=getState().mechapom;
  if(!m){if(view){view.root.visible=false;}shoot({grounded:false},Infinity,null);return;}
  if(!view){if(!loading){loading=true;ready.then(load).then(v=>{view=v;}).catch(error=>{loading=false;console.error(error);});}return;}
  const age=Math.max(0,(serverAt-m.since)/1000);
  const height=m.grounded?SKY*Math.max(0,1-age/LANDING)**2:SKY*Math.min(1,age/TAKE_OFF)**2;
  view.root.visible=true;view.root.position.set(m.x,m.y+height,m.z);view.root.rotation.y=Math.PI/2-(m.heading??0);   // facing along the path
  const down=m.grounded&&age>=LANDING;
  if(down&&!landed)onShake(view.root.position,1);   // it lands: the ground shakes
  landed=down;
  view.animate(clock,{walking:down,target:down?nearest(m):null,burning:down});
  for(const e of getState().events){
   if(seen.has(e.id)||e.type!=='mechapom-missile')continue;seen.add(e.id);
   if(getState().at-e.at>2500||!down)continue;
   view.fire(()=>where(e.to));sounds?.play('don-shot',{gain:.6,position:e.origin});
  }
  burn(m.trail??[]);
  shoot(m,age,camera);
  const shaken=filming?film:camera;
  if(shake>.01&&shaken){shaken.translateY(Math.sin(time*.09)*shake*.25);shaken.translateX(Math.cos(time*.07)*shake*.12);shake*=.92;}
  for(const [i,group]of [...fires.values()].entries())for(const [k,sprite]of group.children.entries())sprite.material.map.offset.x=(Math.floor(time/80)+i+k)%4/4;
 }
 return {update,get camera(){return filming?film:null;}};
}
