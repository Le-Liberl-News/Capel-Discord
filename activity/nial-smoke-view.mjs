import {bakedEffectSprite} from './baked-effects.mjs';
import smoke from './nial-smoke.cjs';
const CLOUD=18,WISPS=8,EXHALE=3,WISP_LIFE=1400,WISP_END=4500,CLOUD_GROWTH=2200;
export function createSmokeView(THREE,scene,banks,native){
 const views=new Map(),player=native.get('sc/mp050_00._ef');
 const item=player?.instances.find(i=>i.part.index===1),image=item&&player.textureImages.get(item.texture.texture);let smokeMap=null;
 if(image){const [u,v,u2,v2]=item.part.uv,canvas=document.createElement('canvas');canvas.width=Math.round((u2-u)*image.width);canvas.height=Math.round((v2-v)*image.height);const ctx=canvas.getContext('2d');ctx.drawImage(image,u*image.width,v*image.height,canvas.width,canvas.height,0,0,canvas.width,canvas.height);const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);for(let i=0;i<pixels.data.length;i+=4){const strength=Math.max(pixels.data[i],pixels.data[i+1],pixels.data[i+2])/255;pixels.data[i+3]*=Math.pow(strength,.7);pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=255;}ctx.putImageData(pixels,0,0);smokeMap=new THREE.CanvasTexture(canvas);smokeMap.colorSpace=THREE.SRGBColorSpace;}
 function puff(i,size){const bank=banks.get('sc/mp050_00._ef');if(!smokeMap)return bakedEffectSprite(THREE,bank,size);const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:smokeMap,transparent:true,depthWrite:false}));sprite.scale.setScalar(size);return {sprite,draw(ms){sprite.material.rotation=Math.sin(ms*.0004+i)*.15;},dispose(){sprite.material.dispose();}};}
 function add(fx,color,order){fx.sprite.material.blending=THREE.NormalBlending;fx.sprite.material.color.set(color);fx.sprite.material.depthWrite=false;fx.sprite.renderOrder=order;fx.sprite.visible=false;scene.add(fx.sprite);return fx;}
 function remove(id){const view=views.get(id);if(!view)return;for(const fx of [...view.cloud,...view.wisps.map(w=>w.fx),...view.exhale,view.ember]){scene.remove(fx.sprite);fx.dispose();}views.delete(id);}
 // A pixel of Nial's craft sheet (52x92, centred like his usual sprite) in world space, slightly in front of the billboard.
 const local=new THREE.Vector3();
 function pixel(body,info,[x,y]){const scale=info.height/info.frameHeight;body.mesh.updateMatrixWorld();return body.mesh.localToWorld(local.set((x+.5-info.frameWidth/2)*scale,(info.frameHeight-y-.5)*scale,.06)).clone();}
 function tipAt(body,event,time){
  const info=body?.craftInfo;if(!info||!body.mesh)return {x:event.origin.x,y:event.origin.y+1.2,z:event.origin.z};
  const drag=smoke.cigarettePose(info,time);
  // after the gesture he is back on his usual sprite: cigarette between the lips when facing the camera, otherwise the head
  return pixel(body,info,drag?drag.tip:body.direction===6?info.mouthTip:[info.frameWidth/2,info.mouthTip[1]]);
 }
 return {remove,draw(event,time,avatars){
  if(!banks.has('sc/mp050_00._ef'))return;let view=views.get(event.id);
  if(!view){view={cloud:Array.from({length:CLOUD},(_,i)=>add(puff(i,5),0xb9bbc0,6)),wisps:Array.from({length:WISPS},(_,i)=>({fx:add(puff(i,.4),0xd4d6db,7),born:-1e9,origin:null,drift:(i%2?1:-1)*(.1+i*.02)})),exhale:Array.from({length:EXHALE},(_,i)=>add(puff(i,.5),0xd4d6db,7)),ember:add(bakedEffectSprite(THREE,banks.get('sc/mp050_00._ef'),.2),0xff6633,8),seed:null,mouth:null};views.set(event.id,view);}
  const body=avatars.get(event.actor),info=body?.craftInfo,tip=tipAt(body,event,time),density=smoke.smokeDensity(time);
  const drag=info&&smoke.cigarettePose(info,time),gestureEnd=info?info.sequence.reduce((n,f)=>n+f.ms,0):0;
  // ember: glows brighter while he draws on it (poses 3-4)
  view.ember.sprite.visible=time<WISP_END;view.ember.sprite.position.copy(tip);view.ember.sprite.material.opacity=drag&&[3,4].includes(drag.pose)?1:.75;view.ember.sprite.scale.setScalar(drag&&[3,4].includes(drag.pose)?.32:.2);view.ember.draw(250+time%300);
  // thin wisp from the burning end: each puff keeps the point it left from, so the trail lags behind the hand
  const emitting=time<WISP_END,strength=time<(info?.exhaleAtMs??0)?.45:Math.max(0,Math.min(1,(WISP_END-time)/1200));
  view.wisps.forEach((w,i)=>{let age=time-w.born;if(age>=WISP_LIFE&&emitting&&time>=i*WISP_LIFE/WISPS){w.born=time;w.origin={x:tip.x,y:tip.y,z:tip.z};age=0;}
   const k=age/WISP_LIFE;w.fx.sprite.visible=!!w.origin&&k<1;if(!w.fx.sprite.visible)return;
   w.fx.sprite.position.set(w.origin.x+Math.sin(age*.004+i)*.06+w.drift*k,w.origin.y+k*.95,w.origin.z+Math.cos(age*.003+i)*.06);
   w.fx.sprite.scale.setScalar(.12+.5*k);w.fx.sprite.material.opacity=Math.min(1,k*6)*(1-k)*.7*strength;w.fx.draw(age);});
  // exhaled puff from the mouth once the hand comes down
  if(info&&body?.mesh&&!view.mouth&&time>=info.exhaleAtMs)view.mouth=pixel(body,info,[info.mouthTip[0]+3,info.mouthTip[1]-4]);
  view.exhale.forEach((fx,i)=>{const age=time-(info?.exhaleAtMs??0)-i*90,k=age/900;fx.sprite.visible=!!view.mouth&&k>=0&&k<1;if(!fx.sprite.visible)return;
   fx.sprite.position.set(view.mouth.x+(i-1)*.12*k,view.mouth.y+.15+k*.35,view.mouth.z+.1);fx.sprite.scale.setScalar(.2+1.1*k);fx.sprite.material.opacity=Math.min(1,k*5)*(1-k)*.75;fx.draw(age);});
  // the cloud is born from the cigarette, then spreads to the area the craft actually covers
  const start=info?.smokeStartsAtMs??0;if(!view.seed&&time>=start)view.seed={x:tip.x,y:tip.y,z:tip.z};
  const raw=Math.max(0,Math.min(1,(time-start)/CLOUD_GROWTH)),growth=1-Math.pow(1-raw,2);
  view.cloud.forEach((fx,i)=>{fx.sprite.visible=!!view.seed&&density>0&&raw>0;if(!fx.sprite.visible)return;
   const angle=i*2.399963+Math.sin(time*.0004+i)*.12,r=Math.sqrt((i+.5)/CLOUD)*5.4,target={x:event.origin.x+Math.cos(angle)*r,y:event.origin.y+.6+(i%3)*.45+Math.sin(time*.001+i)*.2,z:event.origin.z+Math.sin(angle)*r};
   const g=Math.max(0,Math.min(1,growth*1.15-i/CLOUD*.15));
   fx.sprite.position.set(view.seed.x+(target.x-view.seed.x)*g,view.seed.y+(target.y-view.seed.y)*g,view.seed.z+(target.z-view.seed.z)*g);
   fx.sprite.scale.setScalar(.5+4.5*g);fx.sprite.material.opacity=Math.min(density,g*1.4)*.85;fx.draw(250+(time+i*137)%1200);});
 },dispose(){for(const id of [...views.keys()])remove(id);smokeMap?.dispose();}};
}
