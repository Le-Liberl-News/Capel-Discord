const flight=require('./lynx-flight.cjs');
const copy=s=>({...s,q:{...s.q},rates:{...(s.rates??{x:0,y:0,z:0})}});
// Run the same flight model at render cadence. Server corrections decay in screen
// space instead of snapping the aircraft each time a snapshot arrives.
function createPrediction(){
 let simulated=null,mode=null,offset={x:0,y:0,z:0};
 function receive(s,age=0,controls={}){
  s=copy(s);
  for(let left=Math.min(5,Math.max(0,age));left>1e-6;){const h=Math.min(left,flight.DT);left-=h;if(s.mode==='flight')flight.step(s,controls,h);else if(s.mode==='takeoff')s.y=Math.min(24,s.y+10*h);}
  if(!simulated||mode!==s.mode){simulated=copy(s);offset={x:0,y:0,z:0};}
  else{const shown={x:simulated.x+offset.x,y:simulated.y+offset.y,z:simulated.z+offset.z};simulated=copy(s);offset={x:shown.x-s.x,y:shown.y-s.y,z:shown.z-s.z};}
  mode=s.mode;
 }
 function step(c,dt){
  if(!simulated)return null;
  for(let left=Math.min(dt,.25);left>1e-6;){const h=Math.min(left,flight.DT);left-=h;if(mode==='flight')flight.step(simulated,c,h);else if(mode==='takeoff')simulated.y=Math.min(24,simulated.y+10*h);}
  const decay=Math.exp(-dt*2);for(const k of ['x','y','z'])offset[k]*=decay;
  return {...simulated,x:simulated.x+offset.x,y:simulated.y+offset.y,z:simulated.z+offset.z};
 }
 return {receive,step,reset(){simulated=null;mode=null;offset={x:0,y:0,z:0};}};
}
module.exports={createPrediction};
