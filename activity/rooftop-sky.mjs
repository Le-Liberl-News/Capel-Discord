// Twelve native landscape tiles, four columns and three rows.
export const PANORAMA_FILES=Array.from({length:12},(_,i)=>`C04C${20+i}07.png`);
export function removeNativeBackdrop(model) {
  const panels=[];
  model.traverse(object=>{if(object.isMesh&&[].concat(object.material??[]).some(m=>m.userData?.skyBackdrop===true))panels.push(object);});
  const materials=new Set(),maps=new Set();
  for(const panel of panels){panel.removeFromParent();panel.geometry.dispose();for(const material of [].concat(panel.material)){materials.add(material);if(material.map)maps.add(material.map);}}
  for(const map of maps)map.dispose();for(const material of materials)material.dispose();
  return panels.length;
}
export async function createRooftopSky(THREE,scene,assets,manager) {
  const textures=await Promise.all(PANORAMA_FILES.map(file=>new THREE.TextureLoader(manager).loadAsync(new URL(file,assets).href)));
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=768;
  const context=canvas.getContext('2d');
  textures.forEach((texture,i)=>{context.drawImage(texture.image,(i%4)*256,Math.floor(i/4)*256);texture.dispose();});
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const material=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,depthTest:false,
    uniforms:{panorama:{value:texture},tint:{value:new THREE.Vector3(1,1,1)},eye:{value:new THREE.Vector3()}},
    vertexShader:`varying vec3 direction;uniform vec3 eye;void main(){vec4 world=modelMatrix*vec4(position,1.);direction=world.xyz-eye;gl_Position=projectionMatrix*viewMatrix*world;}`,
    fragmentShader:`varying vec3 direction;uniform sampler2D panorama;uniform vec3 tint;void main(){vec3 d=normalize(direction);float longitude=atan(d.z,d.x)/6.28318530718+.5;
      // Mirror alternate repeats: the original panorama has different left/right edges.
      float u=1.-abs(fract(longitude*2.)*2.-1.);
      float elevation=asin(clamp(d.y,-1.,1.));
      // Mountains sit above eye level; the top/bottom rows extend to both poles.
      float v=clamp((elevation+.95)/1.35,0.002,0.998);
      gl_FragColor=vec4(texture2D(panorama,vec2(u,v)).rgb*tint,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`});
  const globe=new THREE.Mesh(new THREE.SphereGeometry(100,64,32),material);globe.renderOrder=-100;globe.frustumCulled=false;globe.raycast=()=>{};scene.add(globe);
  return {update(camera,state){globe.position.copy(camera.position);material.uniforms.eye.value.copy(camera.position);material.uniforms.tint.value.set(...state.tint);},dispose(){globe.removeFromParent();globe.geometry.dispose();material.dispose();texture.dispose();}};
}
