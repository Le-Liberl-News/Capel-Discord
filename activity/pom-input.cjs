// Auto-pickup uses the same authoritative pickup action as a manual interaction.
function pickupCandidate(poms,player,id){
 if(!player||player.dead||player.hp<=0||player.spectator||player.duelProtected||poms.some(p=>p.owner===id))return null;
 return poms.filter(p=>p.mode==='rest'&&Math.hypot(p.x-player.x,p.z-player.z)<=.65&&Math.abs((p.y??0)-(player.y??0))<=1.2).sort((a,b)=>Math.hypot(a.x-player.x,a.z-player.z)-Math.hypot(b.x-player.x,b.z-player.z))[0]??null;
}
module.exports={pickupCandidate};
