const COMBAT=require('./assets/sky/combat/catalogue.json');
function combatSpec(character,kind){return Object.hasOwn(COMBAT,character)&&Object.hasOwn(COMBAT[character].actions,kind)?COMBAT[character].actions[kind]:null;}
function attackPoint(origin,aim,kind,character='Renne'){
 const spec=combatSpec(character,kind);if(!spec||!aim||![aim.x,aim.y,aim.z].every(Number.isFinite))return null;
 const dx=aim.x-origin.x,dz=aim.z-origin.z,distance=Math.hypot(dx,dz);if(distance<.05||distance>150||Math.abs(aim.y-origin.y)>30)return null;
 const length=Math.min(distance,spec.range);return {x:origin.x+dx*length/distance,y:kind==='basic'&&!spec.projectile?origin.y:origin.y+(aim.y-origin.y)*length/distance,z:origin.z+dz*length/distance};
}
module.exports={COMBAT,combatSpec,attackPoint};
