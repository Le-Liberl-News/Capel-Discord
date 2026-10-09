// All sources of damage share the same temporary shield, including Poms and traps.
function applyDamage(player,amount,time){let damage=Math.max(0,amount),absorbed=0;if(player.shield?.until>time&&player.shield.hp>0){absorbed=Math.min(damage,player.shield.hp);player.shield.hp-=absorbed;damage-=absorbed;}if(player.shield&&(player.shield.until<=time||player.shield.hp<=0))player.shield=null;const lost=Math.min(player.hp,damage);player.hp=Math.max(0,player.hp-damage);return {damage:lost,absorbed};}
module.exports={applyDamage};
