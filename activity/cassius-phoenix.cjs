const clamp=t=>Math.max(0,Math.min(1,t));
function phoenixPhases(s){const rise=s.leapDuration*.2,spin=s.leapDuration*.4,transform=s.leapDuration*.13;return {riseAt:s.windup,spinAt:s.windup+rise,transformAt:s.windup+rise+spin,diveAt:s.windup+rise+spin+transform,impactAt:s.windup+s.leapDuration};}
function phoenixPosition(a,time,s){const p=phoenixPhases(s),dx=a.aim.x-a.origin.x,dz=a.aim.z-a.origin.z;let t=0,height=0;
 if(time<p.riseAt)return {...a.origin};
 if(time<p.spinAt){const q=clamp((time-p.riseAt)/(p.spinAt-p.riseAt));t=.12*q;height=4*Math.sin(q*Math.PI/2);}
 else if(time<p.transformAt){const q=clamp((time-p.spinAt)/(p.transformAt-p.spinAt));t=.12+.2*q;height=4+.35*Math.sin(q*Math.PI);}
 else if(time<p.diveAt){t=.32;height=4;}
 else {const q=clamp((time-p.diveAt)/(p.impactAt-p.diveAt))**2;t=.32+.68*q;height=4*(1-q);}
 return {x:a.origin.x+dx*t,y:a.origin.y+(a.aim.y-a.origin.y)*t+height,z:a.origin.z+dz*t};
}
function phoenixPose(time,s,direction){const p=phoenixPhases(s);if(time>=p.impactAt)return {bank:0,pose:0,flipX:false,hidden:false};const flipX=[0,1,7].includes(direction),front=[2,6].includes(direction);let pose;
 if(time<p.riseAt)pose=22+Math.min(8,Math.floor(Math.max(0,time)/p.riseAt*9));
 else if(time<p.spinAt)pose=32+Math.min(2,Math.floor((time-p.riseAt)/(p.spinAt-p.riseAt)*3));
 else pose=(front?41:35)+Math.floor((time-p.spinAt)/75)%6;
 return {bank:12,pose,flipX:!front&&flipX,hidden:time>=p.transformAt&&time<p.impactAt};
}
module.exports={phoenixPhases,phoenixPosition,phoenixPose};
