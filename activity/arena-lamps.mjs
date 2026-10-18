import layout from './arena-lamp-layout.cjs';
import {setBloomEmission} from './map-bloom.mjs';
export async function createArenaLamps(THREE,scene,assets,map){
 const sources=layout.ARENA_LAMPS[map]??[],group=new THREE.Group(),lights=[],flames=[],maps=[];group.userData.noXRay=true;scene.add(group);
 const texture=map!=='gehenna'?await new THREE.TextureLoader().loadAsync(new URL('effects/fire-frames.png',assets).href):null;if(texture){texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=texture.minFilter=THREE.LinearFilter;}
 const metal=new THREE.MeshStandardMaterial({color:0x3e3025,roughness:.9}),rim=new THREE.MeshStandardMaterial({color:0x7e5131,roughness:.8});
 sources.forEach((source,i)=>{if(map==='gehenna')return;const [x,y,z]=source.position,color=new THREE.Color(...source.color),light=new THREE.PointLight(color,0,source.radius,1.4);light.position.set(x,y,z);group.add(light);lights.push({light,source,i});
  if(source.fill)return;
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.07,.13,source.wall?.9:1.6,5),metal);pole.position.set(x,y-(source.wall?.55:1),z);group.add(pole);
  const bowl=new THREE.Mesh(new THREE.ConeGeometry(.24,.3,6,1,true),rim);bowl.rotation.z=Math.PI;bowl.position.set(x,y-.22,z);group.add(bowl);
  const flameMap=texture.clone();flameMap.repeat.set(.25,1);maps.push(flameMap);const material=new THREE.SpriteMaterial({map:flameMap,transparent:true,depthWrite:false,color:0xffd0a0,blending:THREE.AdditiveBlending,toneMapped:false});setBloomEmission(material,.25);const fire=new THREE.Sprite(material);fire.position.set(x,y+.18,z);fire.scale.set(.65,.95,1);group.add(fire);flames.push({fire,i});
 });
 return {update(time,state){const lamps=state?.lamps??0;for(const {light,source,i}of lights){const flicker=source.fill?1:.88+.08*Math.sin(time*.011+i*2.4)+.05*Math.sin(time*.027+i);light.intensity=lamps*(source.fill?5.5:5)*flicker;}for(const {fire,i}of flames){fire.visible=lamps>.05;fire.material.opacity=Math.min(1,lamps*1.6);fire.material.map.offset.x=Math.floor(time*.009+i)%4/4;fire.scale.y=.9+.08*Math.sin(time*.013+i);}},dispose(){scene.remove(group);group.traverse(o=>{if(o.isMesh)o.geometry.dispose();if(o.isSprite)o.material.dispose();});metal.dispose();rim.dispose();for(const map of maps)map.dispose();texture?.dispose();}};
}
