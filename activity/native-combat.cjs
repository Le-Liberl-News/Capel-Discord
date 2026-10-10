const COMBAT=require('./assets/sky/combat/catalogue.json');
const HEROES=require('./assets/sky/combat/hero-actions.json');
function combatSpec(character,kind){const base=Object.hasOwn(COMBAT,character)&&Object.hasOwn(COMBAT[character].actions,kind)?COMBAT[character].actions[kind]:null;const raw=base?{...base,...HEROES[character]?.[kind]}:null;return raw?{...raw,windup:raw.windup/2,duration:raw.duration/2,dashDuration:raw.dashDuration==null?undefined:raw.dashDuration/2,leapDuration:raw.leapDuration==null?undefined:raw.leapDuration/2,hitOffsets:raw.hitOffsets?.map(t=>t/2)}:null;}
function attackPoint(origin,aim,kind,character='Renne'){
 const spec=combatSpec(character,kind);if(spec?.effect||spec?.selfTarget)return {...origin};
 if(!spec||!aim||![aim.x,aim.y,aim.z].every(Number.isFinite))return null;
 const dx=aim.x-origin.x,dz=aim.z-origin.z,distance=Math.hypot(dx,dz);if(distance<.05||distance>150||Math.abs(aim.y-origin.y)>30)return null;
 const length=Math.min(distance,spec.range);return {x:origin.x+dx*length/distance,y:kind==='basic'&&!spec.projectile?origin.y:origin.y+(aim.y-origin.y)*length/distance,z:origin.z+dz*length/distance};
}
module.exports={COMBAT,combatSpec,attackPoint};
