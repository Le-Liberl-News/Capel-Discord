const {TREES,growth}=require('./forestry.cjs');
// Trunks and stumps are shared cylinders. Falling crowns never become invisible walls.
function createForestCollision(base,getForest,scale=1,getBarricades=()=>[]){
 let revision=null,cylinders=[];
 function current(){const f=getForest();const key=f?.revision??'full';if(key!==revision){revision=key;const states=new Map((f?.trees??[]).map(t=>[t.id,t]));cylinders=TREES.map(d=>{const t=states.get(d.id),stage=t?growth(t,f.at??Date.now()):4,s=stage/4;return {x:d.x*scale,y:d.y*scale,z:d.z*scale,r:Math.max(.17,d.radius*s)*scale,h:(stage?d.height*s:.32)*scale};});}return [...cylinders,...getBarricades().filter(b=>b.hp>0).map(b=>({x:b.x*scale,y:b.y*scale,z:b.z*scale,r:1.1*scale,h:2.025*scale}))];}
 function sweep(from,to,radius=.25){let best=base.sweep(from,to,radius);const dx=to.x-from.x,dy=to.y-from.y,dz=to.z-from.z,length=Math.hypot(dx,dy,dz);if(!length)return best;for(const c of current()){
  const r=c.r+radius,ox=from.x-c.x,oz=from.z-c.z,a=dx*dx+dz*dz,b=2*(ox*dx+oz*dz),cc=ox*ox+oz*oz-r*r,roots=[];
  if(a>1e-12){const disc=b*b-4*a*cc;if(disc>=0){const root=(-b-Math.sqrt(disc))/(2*a);if(root>=0&&root<=1)roots.push(root);}}
  if(dy<0){const top=(c.y+c.h+radius-from.y)/dy;if(top>=0&&top<=1)roots.push(top);}
  for(const k of roots){const x=from.x+dx*k,y=from.y+dy*k,z=from.z+dz*k;if(y<c.y-radius||y>c.y+c.h+radius+1e-6||Math.hypot(x-c.x,z-c.z)>r+1e-6)continue;const distance=k*length;if(best&&best.distance<=distance)continue;const top=Math.abs(y-c.y-c.h-radius)<1e-5,normal=top?{x:0,y:1,z:0}:{x:(x-c.x)/(Math.hypot(x-c.x,z-c.z)||1),y:0,z:(z-c.z)/(Math.hypot(x-c.x,z-c.z)||1)},point={x:from.x+dx*Math.max(0,k-.005/length),y:from.y+dy*Math.max(0,k-.005/length),z:from.z+dz*Math.max(0,k-.005/length)};best={distance,normal,point,surfacePoint:{x:x-normal.x*radius,y:y-normal.y*radius,z:z-normal.z*radius}};}
 }return best;}
 function floor(x,z,ceiling=10){let h=base.floor(x,z,ceiling);for(const c of current())if(c.y+c.h<=ceiling&&Math.hypot(x-c.x,z-c.z)<c.r)h=Math.max(h??-Infinity,c.y+c.h);return h;}
 return {floor,sweep};
}
module.exports={createForestCollision};
