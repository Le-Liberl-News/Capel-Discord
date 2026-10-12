// Shared timing and physical motion for the server, local training and sprite playback.
function muellerPhases(a){const run=Math.max(60,Math.hypot(a.aim.x-a.origin.x,a.aim.z-a.origin.z)/12*1000),swing=420,rise=260,hold=300,fall=260,jump=rise+hold+fall;return {run,swing,rise,hold,fall,jump,first:run+240,second:run+swing+240,jumpAt:run+swing*2,land:run+swing*2+jump,end:run+swing*2+jump+300};}
function muellerSpec(a,s){const p=muellerPhases(a);return {...s,windup:0,dashDuration:p.land,duration:p.end};}
function muellerMotion(a,time){const p=muellerPhases(a),t=Math.max(0,Math.min(1,time/p.run));let y=a.origin.y+(a.aim.y-a.origin.y)*t;
 if(time>=p.jumpAt&&time<p.land){const age=time-p.jumpAt;const height=age<p.rise?4.2*Math.sin(age/p.rise*Math.PI/2):age<p.rise+p.hold?4.2:4.2*(1-((age-p.rise-p.hold)/p.fall)**2);y=a.aim.y+height;}
 return {active:time<p.land,position:{x:a.origin.x+(a.aim.x-a.origin.x)*t,y,z:a.origin.z+(a.aim.z-a.origin.z)*t}};
}
function muellerSlashPoint(a){const dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z,length=Math.hypot(dx,dz)||1;return {x:a.aim.x+dx/length*1.2,y:a.aim.y+1.2,z:a.aim.z+dz/length*1.2};}
const mirror=d=>(4-d+8)%8;
function muellerPose(a,time,direction){const p=muellerPhases(a),d=(direction+8)%8;
 if(time<p.run)return {bank:1,pose:Math.floor(time/55)%8};
 if(time>=p.jumpAt&&time<p.land)return {bank:6,pose:0};
 if(time>=p.land)return {bank:2,pose:[4,5,6,0,0][Math.min(4,Math.floor((time-p.land)/60))]};
 const second=time>=p.run+p.swing,age=time-p.run-(second?p.swing:0);let renderDirection=d,flipX=false;
 if(d===0)renderDirection=second?7:1;else if(d===4)renderDirection=second?5:3;
 else{flipX=second?d>=5:d>=1&&d<=3;if(flipX)renderDirection=mirror(d);}
 return {bank:2,pose:Math.min(6,Math.floor(age/60)),direction:renderDirection,flipX};
}
module.exports={muellerPhases,muellerSpec,muellerMotion,muellerPose,muellerSlashPoint};
