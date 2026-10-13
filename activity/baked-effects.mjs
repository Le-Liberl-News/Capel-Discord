const imageCache=new Map();let cachedBytes=0;
const CACHE_LIMIT=128*1024*1024;
async function sharedImage(THREE,url){let entry=imageCache.get(url);if(!entry){entry={bytes:0,promise:new THREE.TextureLoader().loadAsync(url).then(texture=>{const image=texture.image;texture.dispose();entry.bytes=(image?.width??0)*(image?.height??0)*4;cachedBytes+=entry.bytes;for(const [key,old]of imageCache){if(cachedBytes<=CACHE_LIMIT)break;if(key!==url&&old.bytes){imageCache.delete(key);cachedBytes-=old.bytes;}}return image;}).catch(error=>{imageCache.delete(url);throw error;})};imageCache.set(url,entry);}else{imageCache.delete(url);imageCache.set(url,entry);}return entry.promise;}
export async function loadBakedEffect(THREE,assets,name,frames){
 const url=new URL(`effects/${name}-frames.png?v=combat-20261012-earth-gutter`,assets).href;const map=new THREE.Texture(await sharedImage(THREE,url));map.name=url;map.needsUpdate=true;
 map.colorSpace=THREE.SRGBColorSpace;map.generateMipmaps=false;map.minFilter=map.magFilter=THREE.LinearFilter;
 return {map,frames,columns:8,rows:Math.ceil(frames/8),dispose(){map.dispose();}};
}
export function bakedEffectSprite(THREE,bank,size){
 const map=bank.map.clone();const insetX=.5/(map.image?.width??bank.columns*128),insetY=.5/(map.image?.height??bank.rows*128);map.repeat.set(1/bank.columns-2*insetX,1/bank.rows-2*insetY);
 const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:bank.blend==='normal'?THREE.NormalBlending:THREE.AdditiveBlending}));
 sprite.scale.setScalar(size);sprite.renderOrder=5;
 return {sprite,draw(ms){const frame=Math.min(bank.frames-1,Math.max(0,Math.floor(ms*(bank.duration?bank.frames/bank.duration:30/1000))));map.offset.set(frame%bank.columns/bank.columns+insetX,1-(Math.floor(frame/bank.columns)+1)/bank.rows+insetY);},dispose(){map.dispose();sprite.material.dispose();}};
}

