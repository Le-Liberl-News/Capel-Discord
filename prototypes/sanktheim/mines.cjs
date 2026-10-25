const MAX_MINES=75,FLIGHT=1600;
function createMines({state,geometry,hurt,emit,land=(_,e)=>hurt(e,Math.max(e.hp,1))}){
 state.mines??=[];
 function install(owner,q){
  if(state.mines.filter(m=>!m.spent).length>=MAX_MINES)return {error:MAX_MINES+' mines maximum sur la carte.'};
  if(!q||![q.x,q.y,q.z].every(Number.isFinite)||q.x<-360||q.x>20||Math.abs(q.z)>110)return {error:'Emplacement invalide.'};
  const floor=geometry()?.floor(q.x,q.z,q.y+.3);
  if(floor==null||Math.abs(q.y-floor)>.4)return {error:'Placez la mine sur une surface praticable.'};
  if(state.mines.some(m=>!m.spent&&Math.hypot(m.x-q.x,m.z-q.z)<1&&Math.abs(m.y-floor)<1))return {error:'Une mine occupe déjà cet emplacement.'};
  const m={id:'mine-'+(++state.seq),owner,x:q.x,y:floor,z:q.z,armedAt:state.at+1200,spent:false};state.mines.push(m);
  emit('mine-installed','Mine installée.',{position:q});return {ok:true,mine:m.id};
 }
 function update(){
  const targets=[...state.enemies,...Object.values(state.players).filter(p=>p.online&&p.pomControlled)];
  for(const e of targets)if(e.mineLaunch){const f=e.mineLaunch,k=Math.min(1,(state.at-f.at)/FLIGHT);Object.assign(e,{x:f.x,y:f.y+4*5*k*(1-k),z:f.z,moving:false});if(k>=1){e.mineLaunch=null;e.y=f.y;land(f.owner,e);}}
  if(!state.wave||state.stoppedAt)return;
  for(const m of state.mines){if(m.spent||state.at<m.armedAt)continue;const hit=targets.find(e=>e.hp>0&&!e.escaped&&!e.flying&&!e.mineLaunch&&Math.abs(e.y-m.y)<.7&&Math.hypot(e.x-m.x,e.z-m.z)<.85);if(!hit)continue;
   m.spent=true;m.explodedAt=state.at;emit('mine-explosion','',{from:m.id,position:{x:m.x,y:m.y,z:m.z}});
   for(const e of targets)if(e.hp>0&&!e.escaped&&!e.mineLaunch&&Math.abs(e.y-m.y)<1.1&&Math.hypot(e.x-m.x,e.z-m.z)<2.2){if(e.siegeTank||e.mechapom||e.knight){hurt(e,500);if(e.knight)e.pauseUntil=Math.max(e.pauseUntil??0,state.at+1200);continue;}e.mineLaunch={at:state.at,owner:m.owner,x:e.x,y:e.y,z:e.z};e.combatLockedUntil=state.at+FLIGHT;e.cling=null;e.leap=null;e.climb=null;e.jump=null;e.input={x:0,z:0};}
  }
  state.mines=state.mines.filter(m=>!m.spent||state.at-m.explodedAt<3000);
 }
 return {install,update};
}
module.exports={createMines,MAX_MINES,FLIGHT};
