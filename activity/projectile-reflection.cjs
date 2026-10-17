function reflecting(player,time){const r=player?.projectileReflection;return player?.character==='Bleublanc'&&player.hp>0&&!player.spectator&&r&&time>=r.from&&time<r.until&&player.combatDash===r.id;}
module.exports={reflecting};
