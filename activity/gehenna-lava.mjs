import {setBloomEmission} from './map-bloom.mjs';
// Original Third Gehenna battle textures, animated over the non-walkable abyss.
export async function createGehennaLava(THREE,scene,assets){
 const [lavaMap,skyMap]=await Promise.all(['m73ba6','m73ba7'].map(id=>new THREE.TextureLoader().loadAsync(new URL('gehenna/'+id+'-native.png',assets).href)));
 for(const map of [lavaMap,skyMap]){map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.magFilter=map.minFilter=THREE.LinearFilter;map.generateMipmaps=false;}
 const shaders=new Set(),lavaMaterial=new THREE.MeshBasicMaterial({map:lavaMap,color:0xffbd6e,toneMapped:false,side:THREE.DoubleSide,fog:false});setBloomEmission(lavaMaterial,.22);
 lavaMaterial.onBeforeCompile=shader=>{
  shader.uniforms.nativeLavaTime={value:0};shader.uniforms.nativeCrust={value:skyMap};shaders.add(shader);
  const chunk=THREE.ShaderChunk.map_fragment.replace('texture2D( map, vMapUv )','texture2D(map,(fract(vMapUv*65.0+vec2(nativeLavaTime*.012,nativeLavaTime*.004))+vec2(mod(floor(nativeLavaTime*10.0),4.0),3.0-floor(mod(floor(nativeLavaTime*10.0),16.0)/4.0)))/4.0)').replace('diffuseColor *= sampledDiffuseColor;','vec2 drift=vMapUv*12.0+vec2(nativeLavaTime*.003,-nativeLavaTime*.002);vec3 crust=max(texture2D(nativeCrust,fract(drift)).rgb,texture2D(nativeCrust,fract(drift*1.61+vec2(.37,.63))).rgb*.7)*vec3(1.8,.85,.35);vec2 tile=fract(vMapUv*65.0+vec2(nativeLavaTime*.012,nativeLavaTime*.004));float edge=smoothstep(0.0,.1,tile.x)*smoothstep(0.0,.1,tile.y)*smoothstep(0.0,.1,1.0-tile.x)*smoothstep(0.0,.1,1.0-tile.y);sampledDiffuseColor.rgb=mix(crust,sampledDiffuseColor.rgb,.22*edge);diffuseColor *= sampledDiffuseColor;');
  shader.fragmentShader='uniform float nativeLavaTime;uniform sampler2D nativeCrust;\n'+shader.fragmentShader.replace('#include <map_fragment>',chunk);
 };lavaMaterial.customProgramCacheKey=()=> 'third-gehenna-lava-atlas-v3';
 const basin=new THREE.Mesh(new THREE.PlaneGeometry(200,220),lavaMaterial);basin.rotation.x=-Math.PI/2;basin.position.set(0,-6.2,20);basin.userData.noXRay=true;scene.add(basin);
 const backdrop=new THREE.Mesh(new THREE.SphereGeometry(165,24,12),new THREE.MeshBasicMaterial({map:skyMap,color:0x7b321c,side:THREE.BackSide,depthWrite:false,fog:false,toneMapped:false}));backdrop.position.set(0,0,20);backdrop.userData.noXRay=true;scene.add(backdrop);
 return {update(time){for(const shader of shaders)shader.uniforms.nativeLavaTime.value=time/1000;skyMap.offset.set(time*.000008,time*.000003);backdrop.rotation.y=time*.00001;},dispose(){scene.remove(basin,backdrop);for(const mesh of [basin,backdrop]){mesh.geometry.dispose();mesh.material.dispose();}lavaMap.dispose();skyMap.dispose();shaders.clear();}};
}
