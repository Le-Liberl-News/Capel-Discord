import {loadNativeProp} from './native-prop.mjs';
// The climb route clears the parapet; the visible rope must drape over the actual stone.
export function createRopeView({T,scene,asset,routes}){let template=null,built=false;const roots=[];
 loadNativeProp(T,asset,'c22naw00',1).then(t=>template=t).catch(console.error);
 function update({collision,sun,dayNight}){if(built||!template||!collision)return;built=true;
  for(const r of routes){let anchor=null;for(let i=1;i<=16;i++){const x=r.top.x+(r.across.x-r.top.x)*i/16,y=collision.floor(x,r.top.z,r.top.y+.4);if(y!=null&&y>r.bottom.y+2&&(!anchor||y>anchor.y-.08))if(!anchor||y>anchor.y+.01)anchor={x,y,z:r.top.z};}if(!anchor)anchor={...r.across,y:r.top.y-.2};anchor.y+=.1;
   const bend={x:r.bottom.x,y:anchor.y+.02,z:r.bottom.z},over={x:(bend.x+anchor.x)/2,y:anchor.y+.13,z:anchor.z},points=[r.bottom,bend,over,anchor],root=new T.Group();root.userData.noXRay=true;
   const rope=template.clone(true);rope.scale.set(12,bend.y-r.bottom.y,12);rope.position.set(r.bottom.x,r.bottom.y,r.bottom.z);root.add(rope);
   // A continuous strand links the native pulley to the actual merlon. Reuse
   // the rope strip from its native atlas, retaining texture and depth testing.
   let source;template.traverse(o=>{if(!source&&o.material?.map)source=o.material.map;});const canvas=document.createElement('canvas');canvas.width=128;canvas.height=12;const ctx=canvas.getContext('2d');if(source?.image)ctx.drawImage(source.image,124,160,128,12,0,0,128,12);const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set((bend.y-r.bottom.y)*3,1);
   const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(p.x,p.y,p.z)),false,'centripetal'),strand=new T.Mesh(new T.TubeGeometry(curve,64,.065,7,false),new T.MeshStandardMaterial({map,roughness:1}));root.add(strand);
   scene.add(root);sun?.apply(root);root.traverse(o=>{for(const m of [].concat(o.material??[])){m.emissive?.setHex(0x8b7049);m.emissiveMap=m.map;m.emissiveIntensity=.3;m.needsUpdate=true;}});dayNight.apply(root);roots.push(root);
  }
 }
 return {update,dispose(){for(const r of roots)scene.remove(r);}};
}
