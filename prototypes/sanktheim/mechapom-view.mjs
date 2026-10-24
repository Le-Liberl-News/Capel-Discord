import {createPomFortress,TEXTURES} from './pom-fortress-model.mjs';
import {loadNativeProp} from './native-prop.mjs';
// The Mechapom fortress in the battle (mechapom.cjs): the model where the server puts it, coming down from the sky
// at a wave's start and rising back at its end; walking, its headlights, flamethrowers and pods turned toward the
// nearest defender; the missiles the server fires, homing on their target; the fire it leaves along its route.
const SKY=140,LANDING=8,TAKE_OFF=12,REACH=45;
export function createMechapomView({T,scene,asset,scale,getState,getOwn,sounds}){
 let view=null,loading=false,landed=false,shake=0;
 // a step, a landing: the ground shakes, the closer the stronger
 const onShake=(at,strength)=>{const own=getOwn();const d=own?Math.hypot(own.x-at.x,own.z-at.z):60;shake=Math.max(shake,strength*Math.max(0,1-d/(80*scale)));};const seen=new Set(),fires=new Map(),loader=new T.TextureLoader();let fireMap=null;
 async function load(){
  const textures={};
  await Promise.all([...TEXTURES.map(async name=>{textures[name]=await loader.loadAsync(asset(`/assets/siege/pom-fortress/${name}.png`));}),
   loader.loadAsync(asset('/assets/sky/effects/fire-frames.png')).then(map=>{map.colorSpace=T.SRGBColorSpace;textures.fire=fireMap=map;})]);
  const missile=await loadNativeProp(T,asset,'missile',.4).catch(()=>null);
  const fortress=createPomFortress(T,{textures,missile,missileSpeed:40*scale,autoFire:false,onStep:(leg,at)=>onShake(at,.35),onMissile:at=>sounds?.play('don-explosion',{gain:.8,position:at})});
  fortress.root.scale.setScalar(scale);
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
 // the burnt route: a few flames at each point it walked through
 function burn(trail){
  if(!fireMap)return;
  for(const p of trail){
   const key=Math.round(p.x*10)+':'+Math.round(p.z*10);if(fires.has(key))continue;
   const group=new T.Group();group.position.set(p.x,p.y,p.z);
   for(let i=0;i<3;i++){const map=fireMap.clone();map.repeat.set(.25,1);const sprite=new T.Sprite(new T.SpriteMaterial({map,transparent:true,depthWrite:false,blending:T.AdditiveBlending,opacity:.85}));
    sprite.position.set(Math.sin(i*2.1+p.x)*2.2,.9,Math.cos(i*2.1+p.x)*2.2);sprite.scale.set(1.6,2.2,1);group.add(sprite);}
   scene.add(group);fires.set(key,group);
  }
 }
 function update({time,seconds,serverAt,camera}){
  const m=getState().mechapom;
  if(!m){if(view){view.root.visible=false;}return;}
  if(!view){if(!loading){loading=true;load().then(v=>{view=v;}).catch(error=>{loading=false;console.error(error);});}return;}
  const age=Math.max(0,(serverAt-m.since)/1000);
  const height=m.grounded?SKY*Math.max(0,1-age/LANDING)**2:SKY*Math.min(1,age/TAKE_OFF)**2;
  view.root.visible=true;view.root.position.set(m.x,m.y+height,m.z);view.root.rotation.y=Math.PI/2-(m.heading??0);   // facing along the path
  const down=m.grounded&&age>=LANDING;
  if(down&&!landed)onShake(view.root.position,1);   // it lands: the ground shakes
  landed=down;
  view.animate(seconds,{walking:down,target:down?nearest(m):null,burning:down});
  for(const e of getState().events){
   if(seen.has(e.id)||e.type!=='mechapom-missile')continue;seen.add(e.id);
   if(getState().at-e.at>2500||!down)continue;
   view.fire(()=>where(e.to));sounds?.play('don-shot',{gain:.6,position:e.origin});
  }
  burn(m.trail??[]);
  if(shake>.01&&camera){camera.translateY(Math.sin(time*.09)*shake*.25);camera.translateX(Math.cos(time*.07)*shake*.12);shake*=.92;}
  for(const [i,group]of [...fires.values()].entries())for(const [k,sprite]of group.children.entries())sprite.material.map.offset.x=(Math.floor(time/80)+i+k)%4/4;
 }
 return {update};
}
