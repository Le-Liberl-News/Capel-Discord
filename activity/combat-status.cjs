function immobilized(player,time){return time<Math.max(player.stunUntil??0,player.stoneUntil??0);}
function movementFactor(player,time){return immobilized(player,time)?0:time<(player.slowUntil??0)?player.slowFactor??.45:1;}
function attackFactor(player,time){return player.attackBuff?.until>time?1+player.attackBuff.amount:1;}
function defenseFactor(player,time){return player.defenseBuff?.until>time?1-Math.min(.8,player.defenseBuff.amount):1;}
function applyStatus(player,spec,time){
 if(spec.status==='slow'){player.slowUntil=Math.max(player.slowUntil??0,time+spec.statusDuration);player.slowFactor=spec.slowFactor;}
 if(spec.status==='blind')player.blindUntil=Math.max(player.blindUntil??0,time+spec.statusDuration);
 if(spec.status==='stun'||spec.status==='stone'){
  const field=spec.status==='stone'?'stoneUntil':'stunUntil';player[field]=Math.max(player[field]??0,time+spec.statusDuration);
  if(player.jump)player.jump.statusStop={x:player.x,z:player.z};
  if(player.enemy){player.attack=null;player.charge=null;player.moving=false;}
 }
}
function applyBuff(player,spec,time){for(const [field,amount]of [['attackBuff',spec.buffAttack],['defenseBuff',spec.buffDefense]])if(amount){const previous=player[field];if(previous?.until>time&&previous.amount>amount)continue;player[field]={amount,until:time+spec.buffDuration};}}
module.exports={immobilized,movementFactor,attackFactor,defenseFactor,applyStatus,applyBuff};
