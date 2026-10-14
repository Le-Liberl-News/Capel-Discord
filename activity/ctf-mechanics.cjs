// Capture the flag: red against blue, three a side. One flag starts at the centre; whoever walks onto it
// carries it, a team scores the time its members hold it, a carrier who dies drops it on the spot.
// The match lasts five minutes; the team that held the flag longest wins.
const CTF={duration:300000,respawn:10000,pickupRadius:1,teams:['red','blue'],size:3};
function createFlag(centre,startedAt){
  return {x:centre.x,y:centre.y??0,z:centre.z,holder:null,team:null,startedAt,endsAt:startedAt+CTF.duration,score:{red:0,blue:0},last:startedAt,finished:null};
}
const alive=p=>p&&p.hp>0&&!p.spectator;
// advance the flag to `time`; players is a Map of fighters carrying a `team`
function tickFlag(flag,players,time){
  if(flag.finished)return flag;
  const now=Math.min(time,flag.endsAt),dt=Math.max(0,now-flag.last);flag.last=now;
  let holder=flag.holder&&players.get(flag.holder);
  if(holder){
    flag.score[holder.team]+=dt;
    // the carrier fell: the flag lies where they died
    if(!alive(holder)){flag.holder=null;flag.team=null;holder=null;}
    else{flag.x=holder.x;flag.y=holder.y??0;flag.z=holder.z;}
  }
  if(!holder){
    let best=null,distance=CTF.pickupRadius;
    for(const p of players.values()){if(!alive(p)||!p.team||p.knockback)continue;const d=Math.hypot(p.x-flag.x,p.z-flag.z);if(d<=distance&&Math.abs((p.y??0)-flag.y)<1.5){best=p;distance=d;}}
    if(best){flag.holder=best.id;flag.team=best.team;flag.x=best.x;flag.y=best.y??0;flag.z=best.z;}
  }
  if(time>=flag.endsAt){const {red,blue}=flag.score;flag.finished={winner:red===blue?null:red>blue?'red':'blue',score:{...flag.score}};flag.holder=null;}
  return flag;
}
module.exports={CTF,createFlag,tickFlag};
