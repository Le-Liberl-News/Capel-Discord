// First playable adaptations of the native Horizon motions, in Daybreak I outfits.
// Times are real combat milliseconds; source animation files are recorded in source.json.
const SHARED={key:'g',special:'daybreak',groundTarget:true,windup:0,cooldown:10000,range:8,projectile:false,dash:true,lockMovement:true};
const CRAFTS={
 Van:{...SHARED,name:'Tir à la pièce',groundTarget:false,targetRequired:true,coinShot:true,projectile:true,dash:false,duration:2200,radius:.9,range:18,damage:40,throwAt:700,fireAt:1250,hitAt:1430,color:0xffd66b,stages:[{bank:5,frames:20,ms:400},{bank:6,frames:20,ms:800},{bank:7,frames:20,ms:150},{bank:8,frames:20,ms:400},{bank:9,frames:20,ms:450}]},
 Elaine:{...SHARED,name:'Estoc d’Elaine',duration:1400,dashDuration:1400,radius:1.1,damage:38,hitAt:650,moveStart:360,moveEnd:650,line:true,color:0x65d7b1,stages:[{bank:5,frames:20,ms:400},{bank:6,frames:20,ms:350},{bank:7,frames:20,ms:650}]},
 Shizuna:{...SHARED,name:'Iaï de Shizuna',duration:2200,dashDuration:2200,radius:1.6,damage:44,hitAt:1030,moveStart:650,moveEnd:1020,line:true,color:0xb2a0ff,stages:[{bank:5,frames:20,ms:600},{bank:6,frames:20,ms:700},{bank:7,frames:20,ms:900}]},
};
const clamp=t=>Math.max(0,Math.min(1,t));
function motion(a,time,s=CRAFTS[a.character]){
 if(s.coinShot)return {active:time<s.duration,position:{...a.origin}};
 const t=clamp((time-s.moveStart)/(s.moveEnd-s.moveStart));
 return {active:time<s.duration,position:{x:a.origin.x+(a.aim.x-a.origin.x)*t,y:a.origin.y+(a.aim.y-a.origin.y)*t+(t>0&&t<1?(s.hop??0)*Math.sin(t*Math.PI):0),z:a.origin.z+(a.aim.z-a.origin.z)*t}};
}
function pose(character,time){
 const stages=CRAFTS[character].stages;let t=Math.max(0,time);
 for(const stage of stages){if(t<stage.ms)return {bank:stage.bank,pose:Math.min(stage.frames-1,Math.floor(t/stage.ms*stage.frames))};t-=stage.ms;}
 const end=stages.at(-1);return {bank:end.bank,pose:end.frames-1};
}
// The coin rises ahead of Van; the shot travels through it before reaching the enemy.
function coinPoint(a,time){
 const s=CRAFTS.Van,t=clamp((time-s.throwAt)/(s.fireAt-s.throwAt)),dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z,d=Math.hypot(dx,dz)||1;
 return {x:a.origin.x+dx/d*(.3+.7*t),y:a.origin.y+1.1+Math.sin(t*Math.PI*.65)*.95,z:a.origin.z+dz/d*(.3+.7*t)};
}
module.exports={CRAFTS,motion,pose,coinPoint};
