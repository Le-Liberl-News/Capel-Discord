// Fighters and effects hidden behind a wall stay readable: after the normal frame, everything that is
// not scenery is drawn again, darkened and see-through, only where something nearer already covers it.
// Scenery (the map model), skies, ground shadows and the audience opt out with userData.noXRay.
export const XRAY_TINT=.5,XRAY_OPACITY=.7;
export function createXRayPass(THREE){
  const touched=[],seen=new Set();
  function collect(object){
    if(!object.visible||object.userData.noXRay)return;
    if(object.isMesh||object.isSprite||object.isPoints||object.isLine)for(const material of [].concat(object.material??[])){
      if(!material||seen.has(material)||material.userData?.noXRay||material.depthTest===false||material.isShadowMaterial)continue;
      seen.add(material);touched.push([material,material.depthFunc,material.depthWrite,material.transparent,material.opacity,material.color?.r,material.color?.g,material.color?.b]);
      material.depthFunc=THREE.GreaterDepth;material.depthWrite=false;material.transparent=true;material.opacity*=XRAY_OPACITY;material.color?.multiplyScalar(XRAY_TINT);
    }
    for(const child of object.children)collect(child);
  }
  return {render(renderer,scene,camera,{only=null}={}){
    if(only)collect(only);else for(const child of scene.children)collect(child);
    if(!touched.length)return;
    // only the materials above are touched; the rest of the scene is hidden for this pass
    const hidden=[];scene.traverse(object=>{if((object.isMesh||object.isSprite||object.isPoints||object.isLine)&&object.visible&&![].concat(object.material??[]).some(m=>seen.has(m))){object.visible=false;hidden.push(object);}});
    const autoClear=renderer.autoClear,autoReset=renderer.info.autoReset,background=scene.background;renderer.autoClear=false;renderer.info.autoReset=false;scene.background=null;
    try{renderer.render(scene,camera);}
    finally{
      renderer.autoClear=autoClear;renderer.info.autoReset=autoReset;scene.background=background;for(const object of hidden)object.visible=true;
      for(const [material,depthFunc,depthWrite,transparent,opacity,r,g,b] of touched){Object.assign(material,{depthFunc,depthWrite,transparent,opacity});if(material.color)material.color.setRGB(r,g,b);}
      touched.length=0;seen.clear();
    }
  }};
}
