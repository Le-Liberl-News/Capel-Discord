function passiveCombatPose(metadata,{moving=false,defeated=false,down=false,time=0,deathElapsed=0}={}){
 const bank=defeated?(metadata.banks[4]?4:0):moving&&metadata.banks[1]?1:0,info=metadata.banks[bank];
 const count=Math.max(1,Math.floor(info.frames/(info.directions??8))),fps=info.playbackFps??(defeated?10:8);
 const pose=defeated?Math.min(count-1,down?count-1:Math.max(0,Math.floor(deathElapsed*fps/1000))):Math.floor(time*fps)%count;
 return {bank,pose};
}
function spriteFloorClearance(info,frame){return info.floorClearance?.[frame]??0;}
module.exports={passiveCombatPose,spriteFloorClearance};
