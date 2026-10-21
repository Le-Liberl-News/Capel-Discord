// Shared ballistic path. Contacts block the current step, not the intent to move after clearing a ledge.
function plan(origin,direction,geometry){
 let p={...origin},vy=6.6;const vx=direction.dx*4.5,vz=direction.dz*4.5,points=[{...p,t:0}],dt=.02;
 for(let i=1;i<=400;i++){
  const t=i*20;vy-=13.2*dt;
  let q={x:p.x+vx*dt,y:p.y+vy*dt,z:p.z+vz*dt};
  const contacts=[.24,.75].map(h=>geometry.sweep({...p,y:p.y+h},{...q,y:q.y+h},.18)).filter(hit=>hit&&(!hit.surfacePoint||(hit.surfacePoint.x-p.x)*(q.x-p.x)+(hit.surfacePoint.z-p.z)*(q.z-p.z)>=-1e-7)).sort((a,b)=>a.distance-b.distance),hit=contacts[0];
  if(hit){
   if(hit.normal?.y<-.5){vy=Math.min(vy,0);q.y=Math.min(q.y,p.y);}
   const n=hit.normal??{x:0,z:0},dot=vx*n.x+vz*n.z;
   let stepVx=vx,stepVz=vz;
   if(dot<0){stepVx-=dot*n.x;stepVz-=dot*n.z;}
   q.x=p.x+stepVx*dt;q.z=p.z+stepVz*dt;
   if([.24,.75].some(h=>geometry.sweep({...p,y:p.y+h},{...q,y:q.y+h},.18))){q.x=p.x;q.z=p.z;}
  }
  // Resolve horizontal contact before checking landing, including the final falling step.
  const floor=geometry.floor(q.x,q.z,Math.max(p.y,q.y)+.06);
  if(vy<=0&&floor!==null&&floor<=p.y+.06&&q.y<=floor){q.y=floor;points.push({...q,t});return points;}
  p=q;if(i%2===0)points.push({...p,t});
 }
 return points;
}
function position(jump,time){const points=jump.trajectory,elapsed=Math.max(0,time-jump.started);let i=0;while(i<points.length-2&&points[i+1].t<elapsed)i++;const a=points[i],b=points[i+1]??a,k=Math.max(0,Math.min(1,(elapsed-a.t)/(b.t-a.t||1)));return {x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k,z:a.z+(b.z-a.z)*k};}
module.exports={plan,position};
