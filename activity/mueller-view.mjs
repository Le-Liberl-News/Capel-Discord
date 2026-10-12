import mueller from './mueller-combo.cjs';
import {bakedEffectSprite} from './baked-effects.mjs';
export function createMuellerView(THREE,scene,banks){
 const views=new Map();
 function draw(a,time){let view=views.get(a.id);if(!view){view=Array.from({length:3},()=>{const fx=bakedEffectSprite(THREE,banks.get('sc/cr130_02._ef'),3.8);fx.sprite.material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace(/#include <map_(?:particle_)?fragment>/,'$&\n diffuseColor.rgb=vec3(max(max(diffuseColor.r,diffuseColor.g),diffuseColor.b))*vec3(0.72,0.16,1.0);');};fx.sprite.material.customProgramCacheKey=()=> 'mueller-violet';scene.add(fx.sprite);return fx;});views.set(a.id,view);}
 const p=mueller.muellerPhases(a),times=[p.first,p.second,p.land];for(const [i,fx] of view.entries()){const age=time-times[i];fx.sprite.visible=!a.cancelled&&age>=0&&age<330;if(!fx.sprite.visible)continue;fx.sprite.position.set(a.aim.x,a.aim.y+1,a.aim.z);fx.sprite.material.rotation=.318646+(i===0?Math.PI/4:i===1?-Math.PI/4:0);fx.sprite.material.opacity=Math.min(1,(330-age)/100);fx.draw(age*2.4);}
 }
 function remove(id){const view=views.get(id);if(view){for(const fx of view){scene.remove(fx.sprite);fx.dispose();}views.delete(id);}}
 return {draw,remove,dispose(){for(const id of views.keys())remove(id);}};
}
