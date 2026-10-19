// First playable adaptations of the native Horizon motions, in Daybreak I outfits.
// Times are real combat milliseconds; source animation files are recorded in source.json.
const SHARED={key:'g',special:'daybreak',groundTarget:true,windup:0,cooldown:10000,range:8,projectile:false,dash:true,lockMovement:true};
const CRAFTS={
 Van:{...SHARED,name:'Tir à la pièce',groundTarget:false,targetRequired:true,coinShot:true,projectile:true,dash:false,duration:2200,radius:.9,range:18,damage:40,throwAt:700,fireAt:1250,hitAt:1430,color:0xffd66b,stages:[{bank:5,frames:20,ms:400},{bank:6,frames:20,ms:800},{bank:7,frames:20,ms:150},{bank:8,frames:20,ms:400},{bank:9,frames:20,ms:450}]},
 Elaine:{...SHARED,name:'Kaleido Fencer',groundTarget:false,selfTarget:true,targetRequired:false,kaleido:true,dash:false,duration:5150,range:3,radius:3,captureAt:650,gatherEnd:1750,salvoAt:1900,flurryEnd:2850,finishAt:3850,damage:5,finalDamage:24,hitAt:1840,hitTimes:[1840,1980,2120,2260,2400,2540,2700,2810,4040],color:0x65d7b1,stages:[{bank:5,frames:20,ms:650},{bank:9,frames:8,ms:1100},{bank:11,frames:16,ms:150},{bank:6,frames:20,ms:500},{bank:10,frames:20,ms:450},{bank:7,frames:8,ms:1000,loopMs:1000},{bank:12,frames:20,ms:700},{bank:8,frames:20,ms:600}]},
 Shizuna:{...SHARED,name:'Zeroth Gleam',groundTarget:false,targetRequired:true,zeroth:true,duration:5100,dashDuration:5100,range:12,radius:1.4,damage:22,finalDamage:42,hitAt:2400,hitTimes:[2400,4488],moveStart:2300,moveEnd:2400,line:true,cooldown:15000,color:0xff3655,stages:[{bank:5,frames:22,ms:1000},{bank:6,frames:12,ms:300},{bank:7,frames:24,ms:1000},{bank:8,frames:16,ms:100},{bank:9,frames:12,ms:150},{bank:10,frames:24,ms:700},{bank:11,frames:16,ms:450},{bank:12,frames:12,ms:150},{bank:13,frames:24,ms:850},{bank:14,frames:20,ms:400,holdPose:0}]},
};
const clamp=t=>Math.max(0,Math.min(1,t));
function motion(a,time,s=CRAFTS[a.character]){
 if(!s.dash)return {active:time<s.duration,position:{...a.origin}};
 const end=s.zeroth?exitPoint(a):a.aim,t=clamp((time-s.moveStart)/(s.moveEnd-s.moveStart));
 return {active:time<s.duration,position:{x:a.origin.x+(end.x-a.origin.x)*t,y:a.origin.y+(end.y-a.origin.y)*t+(t>0&&t<1?(s.hop??0)*Math.sin(t*Math.PI):0),z:a.origin.z+(end.z-a.origin.z)*t}};
}
function pose(character,time){
 const stages=CRAFTS[character].stages;let t=Math.max(0,time);
 for(const stage of stages){if(t<stage.ms)return {bank:stage.bank,pose:stage.holdPose??Math.min(stage.frames-1,Math.floor((stage.loopMs?t%stage.loopMs/stage.loopMs:t/stage.ms)*stage.frames))};t-=stage.ms;}
 const end=stages.at(-1);return {bank:end.bank,pose:end.frames-1};
}
// The coin rises ahead of Van; the shot travels through it before reaching the enemy.
function coinPoint(a,time){
 const s=CRAFTS.Van,t=clamp((time-s.throwAt)/(s.fireAt-s.throwAt)),dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z,d=Math.hypot(dx,dz)||1;
 return {x:a.origin.x+dx/d*(.3+.7*t),y:a.origin.y+1.1+Math.sin(t*Math.PI)*1.05,z:a.origin.z+dz/d*(.3+.7*t)};
}
function exitPoint(a){if(a.exitPoint)return a.exitPoint;const dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z,d=Math.hypot(dx,dz)||1;return {x:a.aim.x+dx/d*2,y:a.aim.y,z:a.aim.z+dz/d*2};}

// Re-evaluated at dash launch, using the target's current location and the whole exit route.
function zerothPath(origin,aim,{floor,grid,geometry}){
 const end=exitPoint({origin,aim});let previous=origin.y;const distance=Math.hypot(end.x-origin.x,end.z-origin.z),steps=Math.max(1,Math.ceil(distance/.15));
 for(let i=1;i<=steps;i++){const p={x:origin.x+(end.x-origin.x)*i/steps,y:previous,z:origin.z+(end.z-origin.z)*i/steps},y=floor(p),gx=grid?Math.round((p.x-grid.origin.x)/grid.step):0,gz=grid?Math.round((p.z-grid.origin.z)/grid.step):0;
  if(!Number.isFinite(y)||Math.abs(y-previous)>.35||grid&&(gx<0||gz<0||gx>=grid.width||gz>=grid.height||grid.cells[gz*grid.width+gx]===null)||geometry?.sweep({...origin,y:origin.y+.8},{...p,y:y+.8},.16))return null;previous=y;
 }return {...end,y:previous};
}
function gatherPoint(a){const dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z,d=Math.hypot(dx,dz)||1;return {x:a.origin.x+dx/d*1.3,y:a.origin.y,z:a.origin.z+dz/d*1.3};}
function blackened(events,id,elapsed){return [...events].some(a=>!a.cancelled&&CRAFTS[a.character]?.zeroth&&elapsed(a)>=CRAFTS[a.character].hitAt&&elapsed(a)<CRAFTS[a.character].hitTimes.at(-1)+180&&a.hits?.some(h=>h.id===id&&h.damage>0));}
// A short local light pulse per thrust, independent of the final slash and UI.
function kaleidoFlash(a,time){
 if(a.cancelled||a.character!=='Elaine'||a.kind!=='craft')return null;
 const s=CRAFTS.Elaine;if(time<s.hitAt||time>s.flurryEnd+180)return null;
 const age=Math.min(...s.hitTimes.slice(0,-1).map(t=>time>=t?time-t:Infinity));if(age>220)return null;
 const p=gatherPoint(a);return {origin:{x:p.x,y:p.y+.65,z:p.z},direction:{x:0,z:1},color:[.025,1,.22],radius:2.7,omni:true,strength:.32*Math.exp(-age/85)};
}
module.exports={CRAFTS,kaleidoFlash,motion,pose,coinPoint,exitPoint,zerothPath,gatherPoint,blackened};
