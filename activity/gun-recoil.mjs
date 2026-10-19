// Shot indices survive prediction acknowledgement. Never replay old shots after a sync.
export function releasedShots(event,spec,now){
 if(!event||!spec||event.cancelled)return [];
 const elapsed=now-event.localStart,tempo=event.tempo??1;
 return (spec.hitOffsets??[0]).flatMap((offset,index)=>{
  const shot=event.shots?.[index],release=shot?shot.started-event.started:(spec.windup+offset)*(spec.noTempo?1:tempo);
  if(event.fireStoppedAt&&release>=event.fireStoppedAt-event.started)return [];
  const age=elapsed-release;
  return age>=0?[{index,age}]:[];
 });
}
export function createGunRecoil(specFor,random=Math.random){
 let current=null,seen=new Set();
 return (event,character,now,active)=>{
  const kick={yaw:0,pitch:0};if(character==='Don'&&event?.kind!=='basic')return kick;
  if(!active||!event||!['Carna','Josette','Don'].includes(character)||!['basic','craft'].includes(event.kind))return kick;
  if(current!==event.id){current=event.id;seen=new Set();}
  for(const shot of releasedShots(event,specFor(character,event.kind),now)){
   if(seen.has(shot.index))continue;seen.add(shot.index);
   if(shot.age>150)continue;
   kick.pitch-=character==='Don'?.2:character==='Carna'?(event.kind==='basic'?.008:.005):.065;
   kick.yaw+=(random()*2-1)*(character==='Don'?.08:character==='Carna'?(event.kind==='basic'?.006:.004):.025);
  }
  return kick;
 };
}
