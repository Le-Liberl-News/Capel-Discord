import {facing} from "./movement.mjs";
export function shadowDirection(phase){const angle=(phase-.5)*Math.PI*2;return {x:Math.cos(angle)*.75,y:1,z:Math.sin(angle)*.75};}
export function projectShadow(point,floor,light){const height=Math.max(0,point.y-floor);return {x:point.x-light.x/light.y*height,y:floor+.022,z:point.z-light.z/light.y*height};}
export function shadowBasis(light){const length=Math.hypot(light.x,light.z)||1;return {right:{x:light.z/length,z:-light.x/length},forward:{x:-light.x/length,z:-light.z/length}};}
export function createAvatarShadow(THREE,avatar,collision,map){
 const source=avatar.mesh.geometry.attributes.position,geometry=avatar.mesh.geometry.clone();
 const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2,uniforms:{atlas:{value:avatar.mesh.material.map},tile:{value:new THREE.Vector4()},opacity:{value:.25}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform sampler2D atlas;uniform vec4 tile;uniform float opacity;varying vec2 vUv;void main(){float alpha=texture2D(atlas,vUv*tile.xy+tile.zw).a;if(alpha<.15)discard;gl_FragColor=vec4(0.0,0.0,0.0,alpha*opacity);}' });
 const mesh=new THREE.Mesh(geometry,material);mesh.renderOrder=2;mesh.frustumCulled=false;const vertex=new THREE.Vector3();let floor=null,next=0;
 mesh.userData.update=(time,state)=>{
  const p=avatar.position;if(time>=next){floor=collision.floor(p.x,p.z,p.y+.15);next=time+100;}
  mesh.visible=Number.isFinite(floor)&&p.y-floor<10;if(!mesh.visible)return;
  const texture=avatar.mesh.material.map;material.uniforms.atlas.value=texture;material.uniforms.tile.value.set(texture.repeat.x,texture.repeat.y,texture.offset.x,texture.offset.y);
  const light=shadowDirection(state.phase),basis=shadowBasis(light);
  const direction=facing(avatar.heading.dx,avatar.heading.dz,basis.right,basis.forward)%(avatar.info.directions??8);material.uniforms.tile.value.z=direction*texture.repeat.x;
  material.uniforms.opacity.value=(map==='anterose'?.2:.06+.26*state.daylight)*Math.max(.15,1-(p.y-floor)/10);
  const output=geometry.attributes.position,c=Math.cos(avatar.mesh.rotation.z),sn=Math.sin(avatar.mesh.rotation.z);
  for(let i=0;i<source.count;i++){const sx=source.getX(i)*c-source.getY(i)*sn,sy=source.getX(i)*sn+source.getY(i)*c;vertex.set(p.x+basis.right.x*sx,p.y+sy,p.z+basis.right.z*sx);const projected=projectShadow(vertex,floor,light);output.setXYZ(i,projected.x,projected.y,projected.z);}
  output.needsUpdate=true;
 };
 return mesh;
}
