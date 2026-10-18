// First playable adaptations of the native Horizon motions, in Daybreak I outfits.
// Times are real combat milliseconds; source animation files are recorded in source.json.
const SHARED={key:'g',special:'daybreak',groundTarget:true,windup:0,cooldown:10000,range:8,projectile:false,dash:true,lockMovement:true};
const CRAFTS={
 Van:{...SHARED,name:'Assaut au stun-calibur',duration:2000,dashDuration:2000,radius:2.2,damage:40,hitAt:960,moveStart:250,moveEnd:950,hop:.75,color:0x4b9dff,stun:600,stages:[{bank:5,frames:20,ms:1100},{bank:6,frames:20,ms:900}]},
 Elaine:{...SHARED,name:'Estoc d’Elaine',duration:1400,dashDuration:1400,radius:1.1,damage:38,hitAt:650,moveStart:360,moveEnd:650,line:true,color:0x65d7b1,stages:[{bank:5,frames:20,ms:400},{bank:6,frames:20,ms:350},{bank:7,frames:20,ms:650}]},
 Shizuna:{...SHARED,name:'Iaï de Shizuna',duration:2200,dashDuration:2200,radius:1.6,damage:44,hitAt:1030,moveStart:650,moveEnd:1020,line:true,color:0xb2a0ff,stages:[{bank:5,frames:20,ms:600},{bank:6,frames:20,ms:700},{bank:7,frames:20,ms:900}]},
};
const clamp=t=>Math.max(0,Math.min(1,t));
function motion(a,time,s=CRAFTS[a.character]){
 const t=clamp((time-s.moveStart)/(s.moveEnd-s.moveStart));
 return {active:time<s.duration,position:{x:a.origin.x+(a.aim.x-a.origin.x)*t,y:a.origin.y+(a.aim.y-a.origin.y)*t+(t>0&&t<1?(s.hop??0)*Math.sin(t*Math.PI):0),z:a.origin.z+(a.aim.z-a.origin.z)*t}};
}
function pose(character,time){
 const stages=CRAFTS[character].stages;let t=Math.max(0,time);
 for(const stage of stages){if(t<stage.ms)return {bank:stage.bank,pose:Math.min(stage.frames-1,Math.floor(t/stage.ms*stage.frames))};t-=stage.ms;}
 const end=stages.at(-1);return {bank:end.bank,pose:end.frames-1};
}
module.exports={CRAFTS,motion,pose};
