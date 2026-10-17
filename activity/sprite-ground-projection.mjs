// Imported isometric pixels can extend below their ground anchor (toes, tails).
// Project only their depth onto the ground instead of lifting the whole character.
const states=new WeakMap();
function uniforms(THREE,material){
 if(states.has(material))return states.get(material);
 const u={spriteFloorY:{value:.01},spriteCamera:{value:new THREE.Vector3()},spriteDirection:{value:new THREE.Vector3()},spritePV:{value:new THREE.Matrix4()},spriteOrtho:{value:false}};states.set(material,u);
 material.userData.groundProjection=true;
 material.onBeforeCompile=shader=>{
  Object.assign(shader.uniforms,u);
  shader.vertexShader='varying vec3 vGroundSpriteWorld;\n'+shader.vertexShader.replace('#include <project_vertex>','#include <project_vertex>\nvGroundSpriteWorld=(modelMatrix*vec4(transformed,1.0)).xyz;');
  shader.fragmentShader='varying vec3 vGroundSpriteWorld;uniform float spriteFloorY;uniform vec3 spriteCamera;uniform vec3 spriteDirection;uniform mat4 spritePV;uniform bool spriteOrtho;\n'+shader.fragmentShader.replace('#include <dithering_fragment>',`#include <dithering_fragment>
   gl_FragDepth=gl_FragCoord.z;
   if(vGroundSpriteWorld.y<spriteFloorY){
    vec3 ray=spriteOrtho?spriteDirection:normalize(vGroundSpriteWorld-spriteCamera);
    if(ray.y<-.03){vec3 ground=vGroundSpriteWorld+ray*((spriteFloorY-vGroundSpriteWorld.y)/ray.y);vec4 projected=spritePV*vec4(ground,1.0);gl_FragDepth=min(gl_FragCoord.z,projected.z/projected.w*.5+.5-.000001);}
   }`);
 };
 material.customProgramCacheKey=()=> 'cs2-ground-projection-v1';material.needsUpdate=true;return u;
}
export function attachSpriteGroundProjection(THREE,mesh){
 uniforms(THREE,mesh.material);const previous=mesh.onBeforeRender;
 mesh.onBeforeRender=function(renderer,scene,camera,geometry,material,group){
  previous?.call(this,renderer,scene,camera,geometry,material,group);
  const u=uniforms(THREE,material);u.spriteFloorY.value=mesh.userData.spriteFloorY??mesh.position.y+.01;camera.getWorldPosition(u.spriteCamera.value);camera.getWorldDirection(u.spriteDirection.value);u.spritePV.value.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);u.spriteOrtho.value=!!camera.isOrthographicCamera;
 };
}
