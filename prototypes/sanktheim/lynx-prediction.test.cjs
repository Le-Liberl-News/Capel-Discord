const {test}=require('node:test'),assert=require('node:assert/strict');
const F=require('./lynx-flight.cjs'),{createPrediction}=require('./lynx-prediction.cjs');
const ship=()=>({x:0,y:50,z:0,q:F.initial(0),vx:0,vy:0,vz:-24,airSpeed:24,throttle:.65,mode:'flight'});
test('flight advances every frame across a five-second snapshot gap',()=>{
 const prediction=createPrediction(),s=ship(),controls={yaw:0,pitch:0};prediction.receive(s);let last=prediction.step(controls,0),count=0;
 for(let i=0;i<300;i++){const next=prediction.step(controls,1/60);assert.ok(last.z-next.z>.1);assert.ok(Math.abs(next.z-last.z)<1);last=next;count++;}
 assert.equal(count,300);assert.ok(last.z<-100);
});
test('a delayed correction never teleports the displayed aircraft',()=>{
 const prediction=createPrediction(),s=ship(),c={yaw:0,pitch:0};prediction.receive(s);let before;
 for(let i=0;i<300;i++)before=prediction.step(c,1/60);
 prediction.receive({...s,z:-60});const next=prediction.step(c,1/60);
 assert.ok(Math.abs(next.z-before.z)<3);
});
test('manual roll responds without waiting for another server packet',()=>{
 const prediction=createPrediction();prediction.receive(ship());let s;
 for(let i=0;i<120;i++)s=prediction.step({yaw:0,pitch:0,rollAxis:1},1/60);
 assert.ok(Math.abs(s.q.z)>.1);assert.ok(s.x!==0);
});
test('late snapshots are advanced to the present before reconciliation',()=>{
 const prediction=createPrediction(),s=ship(),c={yaw:0,pitch:0};prediction.receive(s);let before;
 for(let i=0;i<300;i++)before=prediction.step(c,1/60);
 prediction.receive(s,5,c);const after=prediction.step(c,1/60);
 assert.ok(after.z<before.z);assert.ok(Math.abs(after.z-before.z)<1);
});
