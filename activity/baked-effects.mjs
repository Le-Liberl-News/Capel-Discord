export async function loadBakedEffect(THREE,assets,name,frames){
 const map=await new THREE.TextureLoader().loadAsync(new URL(`effects/${name}-frames.png?v=combat-20261012-earth-gutter`,assets).href);
 map.colorSpace=THREE.SRGBColorSpace;map.generateMipmaps=false;map.minFilter=map.magFilter=THREE.LinearFilter;
 return {map,frames,columns:8,rows:Math.ceil(frames/8),dispose(){map.dispose();}};
}
export function bakedEffectSprite(THREE,bank,size){
 const map=bank.map.clone();const insetX=.5/(map.image?.width??bank.columns*128),insetY=.5/(map.image?.height??bank.rows*128);map.repeat.set(1/bank.columns-2*insetX,1/bank.rows-2*insetY);
 const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:bank.blend==='normal'?THREE.NormalBlending:THREE.AdditiveBlending}));
 sprite.scale.setScalar(size);sprite.renderOrder=5;
 return {sprite,draw(ms){const frame=Math.min(bank.frames-1,Math.max(0,Math.floor(ms*(bank.duration?bank.frames/bank.duration:30/1000))));map.offset.set(frame%bank.columns/bank.columns+insetX,1-(Math.floor(frame/bank.columns)+1)/bank.rows+insetY);},dispose(){map.dispose();sprite.material.dispose();}};
}

