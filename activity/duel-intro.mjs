// Short adaptation of FC t4104: arena overview, each side, centre, Begin.
export function duelPhase(duel,time){
 if(!duel||!Number.isFinite(duel.startsAt)||!Number.isFinite(duel.readyAt)||time>=duel.readyAt)return null;
 const elapsed=Math.max(0,time-duel.startsAt),duration=duel.readyAt-duel.startsAt;
 if(duration<=0)return null;
 const p=elapsed/duration;
 return p<.12?{kind:"overview",progress:p/.12}:p<.38?{kind:"fighter",side:0,progress:(p-.12)/.26}:p<.64?{kind:"fighter",side:1,progress:(p-.38)/.26}:p<.89?{kind:"versus",progress:(p-.64)/.25}:{kind:"begin",progress:(p-.89)/.11};
}
export function createDuelIntro(){
 const overlay=document.createElement("div");overlay.id="sky-duel-intro";
 overlay.style.cssText="position:fixed;inset:0;z-index:25;pointer-events:none;display:none;border-top:8vh solid #0b090ddd;border-bottom:8vh solid #0b090ddd;box-sizing:border-box";
 const title=document.createElement("div");title.style.cssText="position:absolute;bottom:32%;left:0;right:0;text-align:center;color:#ffe5a5;text-shadow:0 2px 3px #000,0 0 16px #000;font:clamp(24px,5vw,48px) 'Averia Sans Libre',sans-serif;letter-spacing:.04em";overlay.append(title);document.body.append(overlay);
 let duel=null,offset=0;
 return {
  receive(value,serverTime){duel=value;offset=(serverTime??Date.now())-performance.now();},
  update(time,avatars,camera,fallback){
   const phase=duelPhase(duel,time+offset);overlay.style.display=phase?"block":"none";
   if(!phase){if(camera.zoom!==1){camera.zoom=1;camera.updateProjectionMatrix();}return;}
   const players=duel.players.map(id=>avatars.get(id)),positions=players.map(p=>p?.position??fallback);
   const center={x:(positions[0].x+positions[1].x)/2,y:(positions[0].y+positions[1].y)/2,z:(positions[0].z+positions[1].z)/2};
   const fighter=phase.kind==="fighter",target=fighter?positions[phase.side]:center;
   const smooth=phase.progress*phase.progress*(3-2*phase.progress);
   const angle=fighter?(phase.side===0?-.7:.7):-.3+smooth*.6;
   const distance=fighter?9:14;
   camera.position.set(target.x+Math.sin(angle)*distance,target.y+distance*.8,target.z-Math.cos(angle)*distance);
   camera.lookAt(target.x,target.y+.7,target.z);
   const span=Math.hypot(positions[0].x-positions[1].x,positions[0].z-positions[1].z);
   camera.zoom=fighter?1.2:Math.min(.58,(camera.right-camera.left)/Math.max(18,span*1.5));camera.updateProjectionMatrix();
   const names=players.map((player,i)=>duel.names?.[i]||player?.displayName||player?.character||"?");
   title.textContent=phase.kind==="overview"?"Arène de Grancel":fighter?names[phase.side]:phase.kind==="begin"?"Combat !":names.join("  —  ");
   title.style.color=fighter?(phase.side===0?"#a6caff":"#ffa99a"):"#ffe5a5";
  },
  dispose(){overlay.remove();}
 };
}
