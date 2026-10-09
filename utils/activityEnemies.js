const {applyDamage}=require('./activityDamage');
const {inSector}=require('../activity/dungeon-mechanics.cjs');
// Server-owned PvE enemies. A telegraphed strike can be dodged; no client supplies damage.
function createActivityEnemies({grid,spawns=[],now=Date.now,geometry=null,initialState=null,fire=null}) {
 const index=p=>{const x=Math.round((p.x-grid.origin.x)/grid.step),z=Math.round((p.z-grid.origin.z)/grid.step);return x<0||z<0||x>=grid.width||z>=grid.height?-1:z*grid.width+x;};
 const point=i=>({x:grid.origin.x+i%grid.width*grid.step,y:grid.cells[i],z:grid.origin.z+Math.floor(i/grid.width)*grid.step});
 const valid=i=>i>=0&&i<grid.cells.length&&grid.cells[i]!==null;
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
 function path(from,to){const start=index(from),goal=index(to);if(!valid(start)||!valid(goal))return [];const parents=new Map([[start,null]]),queue=[start];for(let h=0;h<queue.length&&!parents.has(goal);h++){const i=queue[h];for(const j of [i-1,i+1,i-grid.width,i+grid.width])if(valid(j)&&Math.abs(j%grid.width-i%grid.width)<=1&&!parents.has(j)&&Math.abs(grid.cells[i]-grid.cells[j])<.35){parents.set(j,i);queue.push(j);}}if(!parents.has(goal))return [];const route=[];for(let j=goal;j!==start;j=parents.get(j))route.push(point(j));route.reverse();return route.filter((q,i)=>i===0||i===route.length-1||Math.sign(q.x-route[i-1].x)!==Math.sign(route[i+1].x-q.x)||Math.sign(q.z-route[i-1].z)!==Math.sign(route[i+1].z-q.z));}
 const enemies=new Map(spawns.map((home,i)=>{const id='world:enemy:'+i,saved=initialState?.enemies?.find(e=>e.id===id),restore=saved&&valid(index(saved));return[id,{id,enemy:true,character:home.ranged?'MishyArdent':'Mishy',name:home.ranged?'Mishy ardent':'Mishy',...home,home:{...home},hp:75,maxHp:75,heading:{dx:0,dz:-1},state:'idle',moving:false,speed:3.3,path:[],nextPath:0,cooldown:0,patrolAt:now()+i*700,...(restore?{x:saved.x,y:saved.y,z:saved.z,hp:Number.isFinite(saved.hp)?Math.max(0,Math.min(75,saved.hp)):75,deadUntil:saved.deadUntil??0}: {})}];}));
 let last=now();
 function tick(players){const time=now(),dt=Math.max(0,Math.min(.15,(time-last)/1000));last=time;
  for(const e of enemies.values()){
   if(e.hp<=0){e.moving=false;e.state='dead';e.path=[];e.attack=null;if(!e.deadUntil)e.deadUntil=time+30000;if(time>=e.deadUntil){Object.assign(e,e.home,{hp:e.maxHp,deadUntil:0,state:'idle',cooldown:time+2000,patrolAt:time+1000});}continue;}
   if(e.impact&&time>e.impact.at+700)e.impact=null;
   const targets=[...players.values()].filter(p=>p.hp>0&&!p.spectator&&Math.abs((p.y??0)-e.y)<(e.ranged?2.5:1.2)&&distance(p,e.home)<14);
   const target=targets.sort((a,b)=>distance(a,e)-distance(b,e))[0];
   if(e.attack){e.state='attack';e.moving=false;if(time>=e.attack.at){const aim=e.attack.point;if(e.attack.kind==='fire'){fire?.launch({x:e.x,y:e.y+.7,z:e.z},{x:aim.x-e.x,y:0,z:aim.z-e.z},{speed:7,damage:12,ttl:2200});}else for(const p of targets){if(!inSector(p,e.attack))continue;const from={x:e.x,y:e.y+.65,z:e.z},to={x:p.x,y:(p.y??0)+.65,z:p.z},wall=geometry?.sweep(from,to,.05);if(wall&&wall.distance<distance(e,p)-.15)continue;applyDamage(p,10,time);if(!p.hp)p.deadUntil=time+10000;}e.impact={...e.attack,id:e.id+':'+e.attack.started,at:time};e.attack=null;e.cooldown=time+1600;e.state='idle';}continue;}
   const engaged=target&&distance(target,e)<9;
   if(engaged&&e.ranged&&distance(target,e)<8.5){e.moving=false;e.attack=null;e.heading={dx:target.x-e.x,dz:target.z-e.z};if(time>=e.cooldown){const angle=Math.atan2(target.z-e.z,target.x-e.x);for(const offset of [-.16,0,.16])fire?.launch({x:e.x,y:e.y+.7,z:e.z},{x:Math.cos(angle+offset),y:0,z:Math.sin(angle+offset)},{speed:8.5,damage:8,ttl:1800});e.cooldown=time+650;e.shootUntil=time+160;}e.state=time<(e.shootUntil??0)?'shoot':'idle';continue;}
   if(engaged&&distance(target,e)<1.8){e.moving=false;e.heading={dx:target.x-e.x,dz:target.z-e.z};if(time>=e.cooldown){const length=distance(target,e)||1;e.attack={kind:'melee',at:time+420,started:time,origin:{x:e.x,y:e.y,z:e.z},direction:{dx:(target.x-e.x)/length,dz:(target.z-e.z)/length},radius:1.9,angle:Math.PI*.65,point:{x:target.x,y:target.y??0,z:target.z}};e.state='attack';}else e.state='idle';continue;}
   if(time>=e.nextPath){e.nextPath=time+900;let goal;
    if(engaged){goal=target;e.state='chase';}
    else if(distance(e,e.home)>2){goal=e.home;e.state='return';}
    else if(time>=e.patrolAt){const angle=(time/3000+Number(e.id.split(':').at(-1)))% (Math.PI*2);goal={x:e.home.x+Math.cos(angle)*1.6,y:e.home.y,z:e.home.z+Math.sin(angle)*1.6};e.patrolAt=time+4500;e.state='patrol';}
    if(goal)e.path=path(e,goal);
   }
   let budget=dt*(engaged?3.3:1.3);e.moving=!!e.path.length;e.speed=engaged?3.3:1.3;
   while(budget>0&&e.path.length){const q=e.path[0],d=distance(e,q);if(d<.01){e.path.shift();continue;}const move=Math.min(d,budget);e.heading={dx:q.x-e.x,dz:q.z-e.z};e.x+=(q.x-e.x)/d*move;e.z+=(q.z-e.z)/d*move;e.y=q.y;budget-=move;if(move>=d)e.path.shift();}
   if(!e.path.length)e.moving=false;
  }
 }
 return {entities:enemies,tick,snapshot:()=>[...enemies.values()].map(({path,nextPath,cooldown,patrolAt,home,...e})=>({...e,heading:{...e.heading},attack:e.attack?{...e.attack,point:{...e.attack.point}}:null}))};
}
module.exports={createActivityEnemies};
