// Shared choreography: native CS2 poses, authoritative movement and three AoE impacts.
const CRAFT={name:'Flame Slash',key:'g',special:'flameSlash',groundTarget:true,shape:'line',windup:0,duration:3200,cooldown:12000,range:14,radius:2.6,damage:18,finalDamage:30,projectile:false,dash:true,dashDuration:3200,lockMovement:true};
const clamp=t=>Math.max(0,Math.min(1,t));
function flamePhases(a){
 const distance=Math.hypot(a.aim.x-a.origin.x,a.aim.z-a.origin.z),prep=240,rush=Math.max(120,Math.min(800,Math.max(0,distance-1.2)/17*1000)),contact=prep+rush;
 return {prep,rush,contact,first:contact+220,second:contact+720,raise:contact+940,finalStart:contact+1320,dashStart:contact+1500,third:contact+1640,dashEnd:contact+1870,end:contact+2120};
}
function flameSpec(a,s=CRAFT){const p=flamePhases(a);return {...s,duration:p.end,dashDuration:p.end};}
function flamePath(a){
 if(a.flamePath)return a.flamePath;
 const dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z,d=Math.hypot(dx,dz)||1,stop=Math.max(0,d-1.2)/d;
 return {approach:{x:a.origin.x+dx*stop,y:a.aim.y,z:a.origin.z+dz*stop},exit:{x:a.aim.x+dx/d*3.2,y:a.aim.y,z:a.aim.z+dz/d*3.2}};
}
function safeFlamePath(a,floor,blocked){
 const wanted=flamePath(a),walk=(start,end,truncate)=>{let prev={...start};const n=Math.max(1,Math.ceil(Math.hypot(end.x-start.x,end.z-start.z)/.15));
  for(let i=1;i<=n;i++){const p={x:start.x+(end.x-start.x)*i/n,y:prev.y,z:start.z+(end.z-start.z)*i/n},y=floor(p);
   if(!Number.isFinite(y)||Math.abs(y-prev.y)>.35||blocked({...prev,y:prev.y+.8},{...p,y:y+.8})){return truncate?prev:null;}p.y=y;prev=p;
  }return prev;
 };
 const approach=walk(a.origin,wanted.approach,false);if(!approach)return null;
 return {approach,exit:walk(approach,wanted.exit,true)};
}
function flameMotion(a,time){
 const p=flamePhases(a),path=flamePath(a),mix=(x,y,t)=>({x:x.x+(y.x-x.x)*t,y:x.y+(y.y-x.y)*t,z:x.z+(y.z-x.z)*t});
 const position=time<p.contact?mix(a.origin,path.approach,clamp((time-p.prep)/p.rush)):time<p.dashStart?path.approach:mix(path.approach,path.exit,clamp((time-p.dashStart)/(p.dashEnd-p.dashStart)));
 return {active:time<p.end,position:{...position}};
}
function flamePose(a,time){
 const p=flamePhases(a),sample=(bank,t,duration,count)=>({bank,pose:Math.min(count-1,Math.max(0,Math.floor(t/duration*count)))});
 if(time<p.prep)return sample(5,time,p.prep,8);
 if(time<p.contact)return {bank:6,pose:Math.floor((time-p.prep)/80)%4};
 if(time<p.contact+440)return sample(7,time-p.contact,440,12);
 if(time<p.raise)return sample(8,time-p.contact-440,500,14);
 if(time<p.finalStart)return sample(9,time-p.raise,380,10);
 return sample(10,time-p.finalStart,800,24);
}
module.exports={CRAFT,flamePhases,flameSpec,flamePath,safeFlamePath,flameMotion,flamePose};
