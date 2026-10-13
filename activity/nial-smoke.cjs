const CRAFT={name:'Pause cigarette',key:'g',special:'smoke',selfTarget:true,windup:0,duration:2000,cooldown:10000,range:6,radius:6,damage:0,projectile:false,effectDuration:20000};
function smokeDensity(age){return age<0||age>=20000?0:Math.min(1,age/2000)*Math.min(1,(20000-age)/6000);}
function contains(cloud,p,time){return time>=cloud.started&&time<cloud.endsAt&&!cloud.cancelled&&Math.abs((p.y??0)-cloud.origin.y)<2&&Math.hypot(p.x-cloud.origin.x,p.z-cloud.origin.z)<=6;}
function createSmoke(hurt){
 const exposure=new Map();
 return {tick(clouds,room,time){
  for(const p of room.values()){
   const cloud=clouds.find(c=>contains(c,p,time));
   if(!cloud||p.hp<=0||p.spectator||p.duelProtected){exposure.delete(p.id);p.smokeHiddenUntil=0;continue;}
   p.smokeHiddenUntil=p.character==='Nial'?time+350:0;
   const period=p.character==='Nial'?2000:1000;let state=exposure.get(p.id);
   if(!state){state={next:time+period};exposure.set(p.id,state);}
   if(time>=state.next){const actor=room.get(cloud.actor);if(actor){const dealt=hurt(cloud,actor,p,1,time,{point:{x:p.x,y:(p.y??0)+.8,z:p.z}});cloud.hits.push({id:p.id,at:time,smoke:true,...dealt});}state.next=time+period;}
  }
  for(const id of exposure.keys())if(!room.has(id))exposure.delete(id);
 }};
}
module.exports={CRAFT,smokeDensity,contains,createSmoke};
