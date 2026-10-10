import {nativeEffectSprite} from './native-effects.mjs';

// Each earth eruption follows the same timing and segment as the server hit.
export function createEarthWave(THREE,scene,event,spec,player) {
  const texture=player.root.textures[0],image=player.textureImages.get(texture.additiveTexture??texture.texture),canvas=document.createElement('canvas');
  canvas.width=canvas.height=112;canvas.getContext('2d').drawImage(image,8,136,112,112,0,0,112,112);
  const ctx=canvas.getContext('2d'),pixels=ctx.getImageData(0,0,112,112);
  for(let y=0;y<112;y++)for(let x=0;x<112;x++){const edge=Math.min(x,y,111-x,111-y)/18;pixels.data[(y*112+x)*4+3]*=Math.min(1,Math.max(0,edge));}
  ctx.putImageData(pixels,0,0);
  const groundMap=new THREE.CanvasTexture(canvas);groundMap.colorSpace=THREE.SRGBColorSpace;
  const angle=-Math.atan2(event.aim.z-event.origin.z,event.aim.x-event.origin.x);
  const steps=spec.hitOffsets.map((delay,index)=>{
    const t=index/(spec.hitOffsets.length-1),effect=nativeEffectSprite(THREE,player,3,4);
    const crack=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.5),new THREE.MeshBasicMaterial({map:groundMap,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,color:0x8a6840}));
    crack.rotation.set(-Math.PI/2,0,angle);
    crack.position.set(event.origin.x+(event.aim.x-event.origin.x)*t,event.origin.y+(event.aim.y-event.origin.y)*t+.04,event.origin.z+(event.aim.z-event.origin.z)*t);scene.add(crack);
    effect.sprite.position.set(event.origin.x+(event.aim.x-event.origin.x)*t,event.origin.y+(event.aim.y-event.origin.y)*t+.45,event.origin.z+(event.aim.z-event.origin.z)*t);
    effect.sprite.material.color.set(0xb6a27d);
    scene.add(effect.sprite);
    return {delay,effect,crack};
  });
  return {draw(time){for(const {delay,effect,crack} of steps){const age=time-spec.windup-delay;effect.sprite.visible=age>=0&&age<900;crack.visible=effect.sprite.visible;crack.scale.setScalar(.5+Math.min(1,Math.max(0,age)/100)*.5);crack.material.opacity=.45*Math.max(0,1-age/900);if(effect.sprite.visible){effect.draw(age);effect.sprite.material.opacity=Math.min(1,(900-age)/200);}}},dispose(){for(const {effect,crack}of steps){scene.remove(effect.sprite,crack);effect.dispose();crack.geometry.dispose();crack.material.dispose();}groundMap.dispose();}};
}
