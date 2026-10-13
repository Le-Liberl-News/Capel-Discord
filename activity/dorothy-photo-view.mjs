import {nativeWorldEffect} from './native-effects.mjs';
export function createPhotoView(THREE,scene,native){
 const views=new Map();
 function remove(id){const v=views.get(id);if(!v)return;scene.remove(v.fx.group);v.fx.dispose();views.delete(id);}
 return {remove,draw(event,time,avatars){
  const age=time-500;if(age<0||age>600){remove(event.id);return;}
  let v=views.get(event.id);if(!v){const fx=nativeWorldEffect(THREE,native.get('sc/ms02070a._ef'));scene.add(fx.group);v={fx};views.set(event.id,v);}
  const p=avatars.get(event.actor)?.position??event.origin,dx=event.aim.x-event.origin.x,dz=event.aim.z-event.origin.z,n=Math.hypot(dx,dz)||1;
  v.fx.group.position.set(p.x+dx/n*.35,p.y+1.1,p.z+dz/n*.35);v.fx.draw(age);
 },dispose(){for(const id of views.keys())remove(id);}};
}
