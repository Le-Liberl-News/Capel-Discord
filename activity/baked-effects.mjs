export async function loadBakedEffect(THREE,assets,name,frames){
 const map=await new THREE.TextureLoader().loadAsync(new URL(`effects/${name}-frames.png`,assets).href);
 map.colorSpace=THREE.SRGBColorSpace;map.generateMipmaps=false;map.minFilter=map.magFilter=THREE.LinearFilter;
 return {map,frames,columns:8,rows:Math.ceil(frames/8),dispose(){map.dispose();}};
}
export function bakedEffectSprite(THREE,bank,size){
 const map=bank.map.clone();map.repeat.set(1/bank.columns,1/bank.rows);
 const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
 sprite.scale.setScalar(size);sprite.renderOrder=5;
 return {sprite,draw(ms){const frame=Math.min(bank.frames-1,Math.max(0,Math.floor(ms*30/1000)));map.offset.set(frame%bank.columns/bank.columns,1-(Math.floor(frame/bank.columns)+1)/bank.rows);},dispose(){map.dispose();sprite.material.dispose();}};
}
