export async function createAirshipExplosions(THREE,scene,assets){
 const texture=await new THREE.TextureLoader().loadAsync(new URL('effects/fire-frames.png',assets).href);texture.colorSpace=THREE.SRGBColorSpace;
 const bursts=[],seen=new Map();
 return {
  observe(id,state){const previous=seen.get(id);seen.set(id,state.crashes);if(!state.crashRemaining||previous===state.crashes)return;
   const sprites=Array.from({length:7},(_,i)=>{const map=texture.clone();map.repeat.set(.25,1);const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));sprite.position.set(state.x+(i%3-1)*2,state.y+1+(i%2)*1.5,state.z+(Math.floor(i/3)-1)*2);scene.add(sprite);return sprite;});bursts.push({sprites,time:0});
  },
  update(dt){for(let i=bursts.length-1;i>=0;i--){const b=bursts[i];b.time+=dt;for(const [j,s]of b.sprites.entries()){s.material.map.offset.x=Math.min(3,Math.floor(b.time*7+j%2))*.25;s.scale.setScalar(3+b.time*7);s.material.opacity=Math.max(0,1-b.time/1.8);s.position.y+=dt*2;}if(b.time>=2){for(const s of b.sprites){scene.remove(s);s.material.map.dispose();s.material.dispose();}bursts.splice(i,1);}}},
  dispose(){for(const b of bursts)for(const s of b.sprites){scene.remove(s);s.material.map.dispose();s.material.dispose();}bursts.length=0;texture.dispose();seen.clear();}
 };
}
