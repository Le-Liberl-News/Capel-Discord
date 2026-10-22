import {loadNativeProp} from './native-prop.mjs';
// The climb route clears the parapet; the visible rope must drape over the actual stone.
export function createRopeView({T,scene,asset,routes}){let template=null,built=false;const roots=[];
 loadNativeProp(T,asset,'c22naw00',1).then(t=>template=t).catch(console.error);
 function update({collision,sun,dayNight}){if(built||!template||!collision)return;built=true;
  for(const r of routes){let anchor=null;for(let i=1;i<=16;i++){const x=r.top.x+(r.across.x-r.top.x)*i/16,y=collision.floor(x,r.top.z,r.top.y+.4);if(y!=null&&y>r.bottom.y+2&&(!anchor||y>anchor.y-.08))if(!anchor||y>anchor.y+.01)anchor={x,y,z:r.top.z};}if(!anchor)anchor={...r.across,y:r.top.y-.2};anchor.y+=.1;
   const root=new T.Group();root.userData.noXRay=true;template.updateMatrixWorld(true);
   // Keep only the game's rope/pulley mesh and original UVs. Bend its final
   // portion onto the stone; no procedural tube is superimposed over it.
   const height=anchor.y-r.bottom.y;
   template.traverse(o=>{if(!o.isMesh)return;const geometry=o.geometry.clone(),positions=geometry.getAttribute('position');for(let i=0;i<positions.count;i++){const p=new T.Vector3().fromBufferAttribute(positions,i).applyMatrix4(o.matrixWorld),u=Math.max(0,Math.min(1,p.y)),t=Math.max(0,Math.min(1,(u-.86)/.14)),bend=t*t*(3-2*t);positions.setXYZ(i,r.bottom.x+p.x*24+(anchor.x-r.bottom.x)*bend,r.bottom.y+u*height,r.bottom.z+p.z*24+(anchor.z-r.bottom.z)*bend);}geometry.computeVertexNormals();geometry.computeBoundingBox();geometry.computeBoundingSphere();root.add(new T.Mesh(geometry,o.material));});
   scene.add(root);sun?.apply(root);root.traverse(o=>{for(const m of [].concat(o.material??[])){m.emissive?.setHex(0x8b7049);m.emissiveMap=m.map;m.emissiveIntensity=.3;m.needsUpdate=true;}});dayNight.apply(root);roots.push(root);
  }
 }
 return {update,dispose(){for(const r of roots)scene.remove(r);}};
}
