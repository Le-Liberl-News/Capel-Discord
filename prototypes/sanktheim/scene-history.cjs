const {local}=require('./core.cjs');
const clone=value=>JSON.parse(JSON.stringify(value));
function sceneSnapshot(state,scale=1){
 const actor=a=>({...a,x:a.x/scale,y:a.y/scale,z:a.z/scale});
 const time=local(state.at);
 return clone({at:state.at,started:state.started,stoppedAt:state.stoppedAt,wave:state.wave?{id:state.wave.id,number:state.wave.number,started:state.wave.started,ends:state.wave.ends}:null,
  walls:state.walls,soldiers:(state.soldiers??[]).map(actor),players:Object.values(state.players??{}).filter(a=>a.online).map(actor),enemies:(state.enemies??[]).map(actor),
  shells:state.shells??[],fires:state.fires??[],corpses:state.corpses??[],forestry:{...state.forestry,costs:require('./forestry.cjs').COSTS},capel:require('./turrets.cjs').CAPEL,mines:state.mines??[],turrets:state.turrets??[],barricades:state.barricades??[],
  weather:state.weather,night:time.hour>=20||time.hour<7,local:time,counts:state.counts,population:(state.enemies??[]).filter(a=>!a.siegeTank).length,nextWave:state.at+3600000,
  events:(state.events??[]).slice(-80).map(({replay,...e})=>e)});
}
function createSceneHistory({siege,arena,now=Date.now,retention=12000}){
 const frames=[],pending=new Map();
 function record(){const state=sceneSnapshot(siege._state),frame={state,combat:clone(arena?.combat.snapshot()??{attacks:[]})};if(frames.at(-1)?.state.at===state.at)frames.pop();frames.push(frame);while(frames.length>1&&frames[0].state.at<state.at-retention)frames.shift();
  const queued=new Set(siege._state.outbox.map(e=>e.id));for(const [id]of pending)if(!queued.has(id))pending.delete(id);
  for(const e of siege._state.outbox){if(!e.replay?.scene)continue;const end=e.at+(e.type==='tank-arrival'?4000:1500);if(!pending.has(e.id))pending.set(e.id,{end,frames:frames.filter(f=>f.state.at>=e.at-7000&&f.state.at<=end)});else {const p=pending.get(e.id);if(frame.state.at<=p.end&&p.frames.at(-1)!==frame)p.frames.push(frame);}}
  return frame;}
 async function clip(event){
  const scene=event.replay?.scene;if(!scene)return null;
  const projectile=event.replay.hit?.projectile;
  const start=event.type==='tank-arrival'?event.at:Math.min(event.at-1000,Math.max(event.at-6500,projectile?projectile.at-300:event.at-1000));
  const end=event.type==='tank-arrival'?event.at+4000:event.at+1500;
  const wait=Math.min(4500,Math.max(0,end-now()));if(wait)await new Promise(r=>setTimeout(r,wait));
  const selected=(pending.get(event.id)?.frames??frames).filter(f=>f.state.at>=start-300&&f.state.at<=end+300).map(clone);
  if(!selected.some(f=>f.state.at<=start)){
   const before=clone(scene);before.at=start;before.events=before.events.filter(e=>e.at<start);
   // A projectile's complete trajectory is authoritative even after a restart.
   if(projectile){before.shells=before.shells.filter(s=>s.id!==projectile.id);before.shells.push({...clone(projectile),done:false});}
   selected.unshift({state:before,combat:{attacks:[]}});
  }
  if(!selected.some(f=>f.state.at===event.at))selected.push({state:clone(scene),combat:{attacks:[]}});
  selected.sort((a,b)=>a.state.at-b.state.at);
  // Keep the real hit, including its effect, when the threshold was emitted just before wall-hit/catapult-impact.
  const impact=projectile?'catapult-impact':'wall-hit';
  for(const frame of selected)if(event.type==='threshold'&&frame.state.at>=event.at&&!frame.state.events.some(e=>e.type===impact&&e.at===event.at&&e.from===event.replay.hit?.from))frame.state.events.push({id:event.id+'-impact',at:event.at,type:impact,from:event.replay.hit?.from,wall:event.wall,position:event.replay.hit?.position??event.position});
  return {event:clone({...event,position:event.replay.hit?.position??event.position,projectileId:projectile?.id,replayFrom:event.replay.hit?.from,replay:undefined}),start,end,frames:selected};
 }
 return {record,clip};
}
module.exports={sceneSnapshot,createSceneHistory};
