// The Mechapom fortress (pom-fortress-model.mjs): it appears three minutes into the first wave after it is armed,
// at the far end of the forest path, then crawls along it to the gate, which it reaches on ARRIVAL_DATE and tears down. Its position only
// depends on the time, so restarts change nothing. During a wave it stands on the battlefield as an enemy with a
// huge health pool: everything hurts it a little, nothing brings it down. Between waves it rises high into the sky
// and comes down at the next one. Its flamethrowers burn whoever stands under it, its pods fire homing missiles at
// the nearest defender or at the Lynx, and part of the poms spawn on its deck and jump down from it.
const APPEAR_AFTER=180000,MAX_HP=5000000,ARRIVAL_DATE='2026-10-30',ARRIVAL_HOUR=12;
// SIZE: the model's scale in the battle (it is drawn 1.5 times smaller than built); its measures follow
const SIZE=1/1.5,DECK_Y=18.4*SIZE,DECK_SPOT=3*SIZE,DECK_WAIT=2500,DROP_TIME=1400,DROP_REACH=16*SIZE,BURN_RADIUS=11*SIZE,BURN_DAMAGE=16,MISSILE_REACH=70,LYNX_REACH=90,MISSILE_SPEED=70,MISSILE_EVERY=4000,MISSILE_DAMAGE=30,LYNX_DAMAGE=250,ASSAULT_RATE=.004;
const HIT_RADIUS=6*SIZE,HIT_HEIGHT=16*SIZE;   // metres, as the combat sees it
const {SCALE}=require('./world-space.cjs');
// the forest path, from the map's western edge to the gate (read off the terrain seen from above), and how far
// along it each point lies
const ROUTE=[[-350,-5],[-325,-2],[-300,-.5],[-275,1.5],[-250,2.5],[-225,0],[-200,-3],[-175,-6],[-150,-9.5],[-125,-10],[-100,-7],[-75,-4],[-52,0]];
const LENGTHS=ROUTE.map((p,i)=>i?Math.hypot(p[0]-ROUTE[i-1][0],p[1]-ROUTE[i-1][1]):0).map((d,i,a)=>a.slice(0,i+1).reduce((s,v)=>s+v,0)),TOTAL=LENGTHS.at(-1);
function along(k){
 const d=Math.max(0,Math.min(1,k))*TOTAL;let i=1;while(i<ROUTE.length-1&&LENGTHS[i]<d)i++;
 const a=ROUTE[i-1],b=ROUTE[i],t=(d-LENGTHS[i-1])/Math.max(1e-9,LENGTHS[i]-LENGTHS[i-1]);
 return {x:a[0]+(b[0]-a[0])*t,z:a[1]+(b[1]-a[1])*t,heading:Math.atan2(b[1]-a[1],b[0]-a[0])};
}   // the Lynx flies in metres, the siege's AI walks in the map's units

function createMechapom({state,hash,emit,geometry,damageWall,hurt,speech,civil,defenders,multiplier=1}){
 state.mechapomArmedAt??=state.at;
 // when it reaches the gate (kept in the state: a test, or an administrator, can bring it forward)
 const arrival=()=>state.mechapomArrival??=civil(ARRIVAL_DATE,ARRIVAL_HOUR);
 const progress=f=>Math.max(0,Math.min(1,(state.at-f.appearedAt)/Math.max(1,arrival()-f.appearedAt)));
 // the terrain under it (its route is the road: the floor just above it, never a treetop)
 const ground=(x,z)=>{const y=geometry()?.floor?.(x,z,6);return Number.isFinite(y)&&y>-6&&y<6?y:0;};
 function appear(){
  const start=along(0),f=state.mechapom={id:'pom-fortress',appearedAt:state.at,x:start.x,y:ground(start.x,start.z),z:start.z,heading:start.heading,hp:MAX_HP,maxHP:MAX_HP,grounded:true,since:state.at,trail:[],missiles:[],arrived:false,nextBurn:0,nextMissile:state.at+4000,salvo:0};
  emit('mechapom-arrival','La forteresse Mechapom fait son apparition sur le champ de bataille !',{position:{x:f.x,y:f.y,z:f.z},weather:state.weather?.kind??'clear'});
  speech(['C’est quoi, ça ?!']);
  return f;
 }
 // its enemy, for the length of a wave (the wave's end clears the enemies; the fortress keeps its health)
 function enemy(f){
  let e=state.enemies.find(e=>e.mechapom);
  if(!e){e={id:'pom-fortress',mechapom:true,boss:true,name:'Forteresse Mechapom',character:'MechaPom',pomCharacter:'Forteresse Mechapom',stage:3,kind:'fortress',flying:false,hp:f.hp,maxHP:f.maxHP,x:f.x,y:f.y,z:f.z,hitRadius:HIT_RADIUS,hitHeight:HIT_HEIGHT,respawnAt:Number.MAX_SAFE_INTEGER,nextAttack:Number.MAX_SAFE_INTEGER,deadAt:null};state.enemies.push(e);}
  return e;
 }
 function targets(f){
  const near=defenders().filter(a=>a.hp>0&&!a.transit&&Math.hypot(a.x-f.x,a.z-f.z)<MISSILE_REACH).map(a=>({id:a.id,actor:a,d:Math.hypot(a.x-f.x,a.z-f.z)}));
  const ship=state.lynx;if(ship?.pilot&&ship.hp>0){const at={x:ship.x/SCALE,y:ship.y/SCALE,z:ship.z/SCALE},d=Math.hypot(at.x-f.x,at.z-f.z);if(d<LYNX_REACH)near.push({id:'lynx',actor:at,d:d*.8});}   // the Lynx draws its fire
  return near.sort((a,b)=>a.d-b.d||a.id.localeCompare(b.id));
 }
 function update(dt){
  const t=state.at,w=state.wave;let f=state.mechapom;
  if(!f){if(!w||w.started<state.mechapomArmedAt||t<w.started+APPEAR_AFTER)return;f=appear();}
  const k=progress(f),{x,z,heading}=along(k),y=ground(x,z);
  if(f.trail?.length)f.trail=[]; // No burning trail behind the fortress.
  Object.assign(f,{x,y,z,heading,progress:k,toGate:(1-k)*TOTAL});   // toGate: what is left of its route, for the cinematics
  if(!!w!==f.grounded){f.grounded=!!w;f.since=t;f.missiles=[];}
  if(!w)return;
  const e=enemy(f);e.hp=f.hp=Math.max(1,Math.min(f.maxHP,e.hp));Object.assign(e,{x:f.x,y:f.y,z:f.z});
  // the poms jumping off its deck
  for(const p of state.enemies){
   if(!p.deckDrop)continue;const d=p.deckDrop,s=Math.max(0,Math.min(1,(t-d.at-DECK_WAIT)/DROP_TIME)),floor=p.flying?2.7:0;   // a moment on the deck, then the jump
   p.x=d.from.x+(d.to.x-d.from.x)*s;p.z=d.from.z+(d.to.z-d.from.z)*s;p.y=d.from.y+(floor-d.from.y)*s*s+Math.sin(Math.PI*s)*3;
   if(s>=1){p.y=floor;p.deckDrop=null;}
  }
  // the flamethrowers, under it
  if(t>=f.nextBurn){f.nextBurn=t+1000;for(const a of defenders())if(a.hp>0&&a.y<4&&Math.hypot(a.x-f.x,a.z-f.z)<BURN_RADIUS){hurt(a,BURN_DAMAGE*multiplier);emit('fire-hit','',{to:a.id,position:{x:a.x,y:a.y,z:a.z}});}}
  // the missiles: one at a time from each pod in turn; they hit when they would arrive
  if(t>=f.nextMissile){
   const target=targets(f)[0];f.nextMissile=t+MISSILE_EVERY;
   if(target){
    const side=f.salvo++%2?1:-1,origin={x:f.x+side*11*SIZE,y:f.y+15*SIZE,z:f.z+3*SIZE},aim=target.actor,distance=Math.hypot(aim.x-origin.x,aim.y-origin.y,aim.z-origin.z);
    const missile={id:'mechapom-missile-'+t+'-'+side,to:target.id,hitAt:t+350+distance/MISSILE_SPEED*1000};f.missiles.push(missile);
    emit('mechapom-missile','',{from:f.id,to:target.id,origin,aim:{x:aim.x,y:aim.y,z:aim.z},side,hitAt:missile.hitAt});
   }
  }
  for(const m of [...f.missiles]){
   if(t<m.hitAt)continue;f.missiles.splice(f.missiles.indexOf(m),1);
   if(m.to==='lynx'){const ship=state.lynx;if(ship?.pilot&&ship.hp>0){ship.hp=Math.max(0,ship.hp-LYNX_DAMAGE);emit('mechapom-blast','',{to:'lynx',position:{x:ship.x/SCALE,y:ship.y/SCALE,z:ship.z/SCALE}});}continue;}
   const a=defenders().find(a=>a.id===m.to);if(!a||a.hp<=0)continue;
   hurt(a,MISSILE_DAMAGE*multiplier*2);emit('mechapom-blast','',{to:a.id,position:{x:a.x,y:a.y,z:a.z}});
  }
  // at the walls: it tears them down
  if(k>=1){
   if(!f.arrived){f.arrived=true;emit('mechapom-assault','La forteresse Mechapom atteint les remparts et les écrase sous ses pattes !',{position:{x:f.x,y:f.y,z:f.z}});}
   for(const wall of state.walls)if(wall.hp>0)damageWall(wall,wall.maxHP*ASSAULT_RATE*dt,{from:f.id,position:{x:f.x+9,y:6,z:wall.z},kind:'mechapom'});
  }
 }
 // a fresh pom: one in two starts on the deck and jumps down, while the fortress stands on the battlefield
 function onSpawn(p){
  const f=state.mechapom;if(!f?.grounded||!state.wave||p.mechapom||hash(p.id+'deck'+state.at)%2)return;
  const angle=hash(p.id+'angle')%360*Math.PI/180;
  p.x=f.x+Math.cos(angle)*DECK_SPOT;p.z=f.z+Math.sin(angle)*DECK_SPOT;p.y=DECK_Y;
  p.deckDrop={at:state.at,from:{x:p.x,y:DECK_Y,z:p.z},to:{x:f.x+Math.cos(angle)*DROP_REACH,z:f.z+Math.sin(angle)*DROP_REACH}};
 }
 // the wave is over: it takes off
 function takeOff(){const f=state.mechapom;if(f?.grounded){f.grounded=false;f.since=state.at;f.missiles=[];}}
 return {update,onSpawn,takeOff};
}
// enemies with a life of their own, out of the poms' common AI: the tank, the fortress, the wild pomgarous (wildlife.cjs)
const giant=e=>!!(e?.siegeTank||e?.mechapom||e?.wild);
module.exports={createMechapom,giant,along,ROUTE,MAX_HP,SIZE,DECK_Y,APPEAR_AFTER,ARRIVAL_DATE};
