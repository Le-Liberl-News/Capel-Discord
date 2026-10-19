import cannon from './don-cannon.cjs';
import {bakedEffectSprite} from './baked-effects.mjs';
export function createDonCannonView(THREE,scene,banks,ballMap){
 const views=new Map();
 function make(a){const ball=new THREE.Sprite(new THREE.SpriteMaterial({map:ballMap,transparent:true,depthWrite:false}));ball.scale.setScalar(.38);scene.add(ball);
  const muzzle=bakedEffectSprite(THREE,{...banks.get('sc/sc000_10._ef'),duration:300,bloom:.4},1.15),impact=bakedEffectSprite(THREE,{...banks.get(a.kind==='craft'?'sc/sc006_17._ef':'sc/msc0640._ef'),duration:1250,bloom:.4},a.kind==='craft'?10:6.5);scene.add(muzzle.sprite,impact.sprite);const v={ball,muzzle,impact};views.set(a.id,v);return v;
 }
 function draw(a,time,avatars){const v=views.get(a.id)??make(a);v.ball.visible=v.muzzle.sprite.visible=v.impact.sprite.visible=false;if(a.cancelled)return;
  if(a.kind==='basic'&&a.ray){const p=a.projectile??{...cannon.launch(a.ray.origin,a.ray.direction),started:a.started+140},age=time-(p.started-a.started);v.ball.visible=age>=0&&age<cannon.MAX_FLIGHT&&a.explodedAt==null&&!a.expired;if(v.ball.visible){const point=cannon.ballPoint(p,age);v.ball.position.set(point.x,point.y,point.z);}v.muzzle.sprite.visible=age>=0&&age<300&&avatars?.get(a.actor)?.mesh?.visible!==false;if(v.muzzle.sprite.visible){v.muzzle.sprite.position.set(p.origin.x,p.origin.y,p.origin.z);v.muzzle.draw(age);}}
  const impact=a.explodedAt==null?(a.kind==='craft'?cannon.ACTIONS.craft.impactAt:Infinity):a.explodedAt-a.started,age=time-impact;if(age>=0&&Number.isFinite(impact)&&v.impactSeenAt==null)v.impactSeenAt=time;const visibleAge=v.impactSeenAt==null?-1:time-v.impactSeenAt;v.impact.sprite.visible=visibleAge>=0&&visibleAge<1250;if(v.impact.sprite.visible){const p=a.explosionPoint??a.aim;v.impact.sprite.position.set(p.x,p.y+(a.kind==='craft'?2.4:0),p.z);v.impact.draw(visibleAge);}
 }
 function remove(id){const v=views.get(id);if(!v)return;scene.remove(v.ball,v.muzzle.sprite,v.impact.sprite);v.ball.material.dispose();v.muzzle.dispose();v.impact.dispose();views.delete(id);}
 return {draw,remove,dispose(){for(const id of [...views.keys()])remove(id);},get size(){return views.size;}};
}
