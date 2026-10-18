// Moves shared by every fighter, on top of the native basic attack / art / craft:
// - parry (key V): pressed right as a craft lands, it blocks the craft and counters its caster;
//   a basic attack coming from the front is blocked outright (side and back hits land);
// - dodge: replaces the art (except Kloe's): a short dash in the direction of movement;
// - basic-attack combo: each landed hit speeds the next ones up, a miss resets it.
// The authoritative world, the local training and the renderer all read these rules.
const PARRY={key:'v',holdLease:1800,holdRefresh:450,window:350,cooldown:1200,counterDamage:20,knockback:2,knockbackDuration:300,effect:'SC/mp094_00._ef',blockEffect:'SC/mp008_01._ef',frontCos:.5};
const DODGE={name:'Esquive',key:'c',dodge:true,dash:true,easeOut:true,windup:0,dashDuration:160,duration:160,cooldown:3500,range:2,radius:0,damage:0,projectile:false,trailEffect:'SC/ms30001c._ef'};
const COMBO={window:2500,speedStep:.2,minFactor:.4,hitEffect:'SC/ms00271b._ef',missEffect:'SC/ms04532._ef'};
const KEEPS_ART=new Set(['Kloe']);

function keepsArt(character){return KEEPS_ART.has(character);}
// current combo of a fighter: it fades when no basic attack lands for COMBO.window
function comboOf(player,time){return player?.combo&&time<player.combo.until?player.combo.count:0;}
// each landed hit makes the next basic attack 20 % quicker: full speed (40 % of the normal timing) after 3 hits
function comboFactor(count){return Math.max(COMBO.minFactor,1-COMBO.speedStep*Math.max(0,count||0));}
function tempoSpec(spec,factor){
 if(!spec||spec.noTempo||factor===1)return spec;
 const scale=v=>v==null?v:v*factor;
 return {...spec,windup:scale(spec.windup),duration:scale(spec.duration),cooldown:scale(spec.cooldown),hitOffsets:spec.hitOffsets?.map(scale),tempo:factor};
}
// a parry is live for PARRY.window after it was pressed
function parryActive(player,time){return !!player?.parry&&time>=player.parry.at&&time<=player.parry.at+PARRY.window;}
// The dodge runs straight along `direction` and stops before a wall, a ledge or a step it cannot take.
// `floor(point)` gives the ground height (or null), `walkable(point)` the navigation grid, `blocked(from,to)` walls.
function dodgeEndpoint(origin,direction,{floor,walkable=()=>true,blocked=()=>false}){
 const length=Math.hypot(direction?.x??0,direction?.z??0);if(!(length>1e-6))return null;
 const dx=direction.x/length,dz=direction.z/length,steps=Math.ceil(DODGE.range/.2);let previous=origin.y??0,last=null;
 for(let n=1;n<=steps;n++){
  const d=DODGE.range*n/steps,p={x:origin.x+dx*d,y:previous,z:origin.z+dz*d},height=floor(p);
  if(height===null||!Number.isFinite(height)||Math.abs(height-previous)>.35||!walkable(p))break;
  if(blocked({x:origin.x,y:(origin.y??0)+.8,z:origin.z},{x:p.x,y:height+.8,z:p.z}))break;
  previous=height;last={x:p.x,y:height,z:p.z};
 }
 return last&&Math.hypot(last.x-origin.x,last.z-origin.z)>=.5?last:null;
}
// the attack comes from within 60° of where the defender faces
function fromFront(defender,source){
 const hx=defender?.heading?.dx??0,hz=defender?.heading?.dz??-1,dx=source.x-defender.x,dz=source.z-defender.z,h=Math.hypot(hx,hz),d=Math.hypot(dx,dz);
 return d<1e-6||h<1e-6||(hx*dx+hz*dz)/(h*d)>=PARRY.frontCos;
}
// A maintained guard blocks basics only inside its camera-directed forward cone. Heartbeats
// keep it alive without reopening the timed craft-parry window.
function blocksBasic(player,source,time){
 const hold=player?.guardHold;if(player.hp<=0||player.spectator||player.catCling||player.stunUntil>time||player.stoneUntil>time||player.frozenUntil>time||player.downUntil>time)return false;
 if(!hold||hold.until<=time)return !player.parry?.held&&parryActive(player,time)&&fromFront(player,source);
 const dx=source.x-player.x,dz=source.z-player.z,d=Math.hypot(dx,dz);
 return d<.05||(dx*hold.dx+dz*hold.dz)/d>=PARRY.frontCos;
}
function turnGuard(player,direction,time){
 if(!(player.guardHold?.until>time))return false;
 const length=Math.hypot(direction?.dx,direction?.dz);if(!Number.isFinite(length)||length<.001)return false;
 player.guardHold.dx=direction.dx/length;player.guardHold.dz=direction.dz/length;
 player.heading={dx:player.guardHold.dx,dz:player.guardHold.dz};return true;
}
function usesCombatFacing(map){return map==='arena'||map==='axis'||map==='gehenna'||map==='thors'||/^tower[1-4]$/.test(map)||map==='custom';}
function cameraFacing(yaw){return {dx:-Math.sin(yaw),dz:Math.cos(yaw)};}
function forwardAim(origin,heading,range){const length=Math.hypot(heading.dx,heading.dz)||1;return {x:origin.x+heading.dx/length*range,y:origin.y,z:origin.z+heading.dz/length*range};}
module.exports={usesCombatFacing,cameraFacing,forwardAim,turnGuard,blocksBasic,fromFront,PARRY,DODGE,COMBO,keepsArt,comboOf,comboFactor,tempoSpec,parryActive,dodgeEndpoint};
