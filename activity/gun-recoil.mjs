// Shot indices survive prediction acknowledgement. Never replay old shots after a sync.
export function releasedShots(event,spec,now){
 if(!event||!spec||event.cancelled)return [];
 const elapsed=now-event.localStart,tempo=event.tempo??1;
 return (spec.hitOffsets??[0]).flatMap((offset,index)=>{
  const release=(spec.windup+offset)/tempo;
  if(event.fireStoppedAt&&release>=event.fireStoppedAt-event.started)return [];
  const age=elapsed-release;
  return age>=0?[{index,age}]:[];
 });
}
export function createGunRecoil(specFor,random=Math.random){
 let current=null,seen=new Set();
 return (event,character,now,active)=>{
  const kick={yaw:0,pitch:0};
  if(!active||!event||!['Carna','Josette'].includes(character)||!['basic','craft'].includes(event.kind))return kick;
  if(current!==event.id){current=event.id;seen=new Set();}
  for(const shot of releasedShots(event,specFor(character,event.kind),now)){
   if(seen.has(shot.index))continue;seen.add(shot.index);
   if(shot.age>150)continue;
   kick.pitch-=character==='Carna'?.005:.065;
   kick.yaw+=(random()*2-1)*(character==='Carna'?.004:.025);
  }
  return kick;
 };
}
