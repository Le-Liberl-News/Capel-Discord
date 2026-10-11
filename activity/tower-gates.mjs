import {loadBakedEffect,bakedEffectSprite} from './baked-effects.mjs';
// Arm a gate only after leaving its arrival area, preventing floor-to-floor bouncing.
export function createGateTrigger(gates){
 const armed=new Set();let pending=false;
 return position=>{if(pending||!position)return null;for(const gate of gates){const distance=Math.hypot(position.x-gate.point.x,position.z-gate.point.z);if(distance>1.4)armed.add(gate.direction);if(armed.has(gate.direction)&&distance<.75&&Math.abs(position.y-gate.point.y)<.4){pending=true;return gate.direction;}}return null;};
}
export async function createTowerGates(THREE,scene,assets,layout,floor){
 const gates=[...(floor<4?[{direction:'up',point:layout.exit}]:[]),...(floor>1?[{direction:'down',point:layout.start}]:[])];
 const bank=await loadBakedEffect(THREE,assets,'sc-mp066_01',90);
 const effects=gates.map(g=>{const e=bakedEffectSprite(THREE,bank,2.2);e.sprite.position.set(g.point.x,g.point.y+.8,g.point.z);scene.add(e.sprite);return e;});
 return {check:createGateTrigger(gates),draw(time){for(const effect of effects)effect.draw(time%3000);},dispose(){for(const e of effects){scene.remove(e.sprite);e.dispose();}bank.dispose();}};
}
