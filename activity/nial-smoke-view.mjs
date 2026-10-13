import {bakedEffectSprite} from './baked-effects.mjs';
import smoke from './nial-smoke.cjs';
export function createSmokeView(THREE,scene,banks,native){
 const views=new Map(),player=native.get('sc/mp050_00._ef');
 const item=player?.instances.find(i=>i.part.index===1),image=item&&player.textureImages.get(item.texture.texture);let smokeMap=null;
 if(image){const [u,v,u2,v2]=item.part.uv,canvas=document.createElement('canvas');canvas.width=Math.round((u2-u)*image.width);canvas.height=Math.round((v2-v)*image.height);const ctx=canvas.getContext('2d');ctx.drawImage(image,u*image.width,v*image.height,canvas.width,canvas.height,0,0,canvas.width,canvas.height);const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);for(let i=0;i<pixels.data.length;i+=4){const strength=Math.max(pixels.data[i],pixels.data[i+1],pixels.data[i+2])/255;pixels.data[i+3]*=Math.pow(strength,.7);pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=255;}ctx.putImageData(pixels,0,0);smokeMap=new THREE.CanvasTexture(canvas);smokeMap.colorSpace=THREE.SRGBColorSpace;}
 function puff(i){const bank=banks.get('sc/mp050_00._ef');if(i===18||!smokeMap)return bakedEffectSprite(THREE,bank,i===18?.2:5);const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:smokeMap,transparent:true,depthWrite:false}));sprite.scale.setScalar(5);return {sprite,draw(ms){sprite.material.rotation=Math.sin(ms*.0004+i)*.15;},dispose(){sprite.material.dispose();}};}
 function remove(id){const view=views.get(id);if(!view)return;for(const fx of view){scene.remove(fx.sprite);fx.dispose();}views.delete(id);}
 return {remove,draw(event,time,avatars){
  if(!banks.has('sc/mp050_00._ef'))return;let view=views.get(event.id);
  if(!view){view=Array.from({length:19},(_,i)=>{const fx=puff(i);fx.sprite.material.blending=THREE.NormalBlending;fx.sprite.material.color.set(i===18?0xff6633:0xb9bbc0);fx.sprite.material.depthWrite=false;fx.sprite.renderOrder=6;scene.add(fx.sprite);return fx;});views.set(event.id,view);}
  const density=smoke.smokeDensity(time),body=avatars.get(event.actor),heading=body?.heading??{dx:0,dz:-1},length=Math.hypot(heading.dx,heading.dz)||1;
  view.forEach((fx,i)=>{if(i===18){const p=body?.position??event.origin;fx.sprite.visible=time<2000;fx.sprite.position.set(p.x+heading.dx/length*.18,p.y+1.25,p.z+heading.dz/length*.18);fx.sprite.material.opacity=.9;fx.draw(250+time%300);return;}
   const angle=i*2.399963+Math.sin(time*.0004+i)*.12,r=Math.sqrt((i+.5)/18)*5.4,growth=Math.min(1,time/2000);fx.sprite.position.set(event.origin.x+Math.cos(angle)*r*growth,event.origin.y+.6+(i%3)*.45+Math.sin(time*.001+i)*.2,event.origin.z+Math.sin(angle)*r*growth);fx.sprite.visible=density>0;fx.sprite.material.opacity=density*.85;fx.draw(250+(time+i*137)%1200);
  });
 },dispose(){for(const id of views.keys())remove(id);smokeMap?.dispose();}};
}
