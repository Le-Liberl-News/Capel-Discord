import {nativeWorldEffect} from './native-effects.mjs';
// Preserve native geometry and alpha; tint is applied after texture sampling.
export function craftWorldEffect(THREE,player,{scale=1,tint,purpleOnly=false,groundClearance=false,keepWhite=true,groundParts,whiteKeyParts,radial=false,luminousWhite=false}={}){
 const fx=nativeWorldEffect(THREE,player,{spatial:true,nativeAxes:true,blend:'normal',groundParts,whiteKeyParts});fx.group.scale.setScalar(scale);
 fx.group.traverse(o=>{if(!o.material)return;const m=o.material;m.blending=THREE.NormalBlending;m.depthWrite=false;
  if(tint){m.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace(/#include <map_(?:particle_)?fragment>/,'$&\n'+(purpleOnly?'if(diffuseColor.b>diffuseColor.g*1.15&&diffuseColor.r>diffuseColor.g*1.1){':'{')+`float hi=max(max(diffuseColor.r,diffuseColor.g),diffuseColor.b);float lo=min(min(diffuseColor.r,diffuseColor.g),diffuseColor.b);float white=${keepWhite?'1.0-smoothstep(0.07,0.25,hi-lo)':'0.0'};diffuseColor.rgb=mix(hi*vec3(${tint.join(',')}),vec3(${luminousWhite?'1.0':'hi'}),white);}`+(radial?'diffuseColor.a*=1.0-smoothstep(0.38,0.5,length(vMapUv-vec2(0.5)));':''));};m.customProgramCacheKey=()=>`craft-normal-${tint}-${purpleOnly}-${keepWhite}-${radial}-${luminousWhite}`;}
 });
 const draw=fx.draw;fx.draw=ms=>{draw(ms);if(groundClearance)fx.group.traverse(o=>{if(o.isSprite&&o.visible)o.position.y=Math.max(o.position.y,Math.abs(o.scale.y)/2+.05);});};return fx;
}
