const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const express=require('express');
test('published siege authenticates daily characters, denies test/admin forgery and sends its introduction',async()=>{
 const app=express();app.use(express.json());const runtime=fs.mkdtempSync(path.join(os.tmpdir(),'sanktheim-live-test-')),messages=[];
 const client={user:{id:'bot'},isReady:()=>true,channels:{fetch:async()=>({messages:{fetch:async()=>new Map()},send:async p=>{messages.push(p);return {id:'m'+messages.length};}})}};
 const service=require('./production.cjs').createProductionSiege({app,client,runtime,lobby:{identity:t=>{if(t!=='valid')throw Object.assign(Error('Reconnectez-vous.'),{status:401});return {id:'123'};}},access:{assertMember:async()=>{}},bearer:req=>req.headers.authorization?.replace('Bearer ',''),rhumertume:{infected:()=>[],isInfected:()=>false},resolveCharacter:async()=> 'Julia',channelId:'rp',ownerId:'owner'});
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));const url='http://127.0.0.1:'+server.address().port+'/api/siege',headers={Authorization:'Bearer valid','Content-Type':'application/json'};
 try{
  assert.equal((await fetch(url+'/state')).status,401);
  assert.equal((await fetch(url+'/state',{headers})).status,503);
  await service.start();assert.equal(messages.length,1);
  const session=await (await fetch(url+'/session',{headers})).json();assert.equal(session.player.character,'Julia');assert.equal(session.player.id,'player-123');assert.equal(session.owner,false);
  assert.equal((await fetch(url+'/admin-stop',{method:'POST',headers,body:'{}'})).status,403);
  assert.equal((await fetch(url+'/test-wave',{method:'POST',headers,body:'{}'})).status,404);
  const state=await (await fetch(url+'/state',{headers})).json();assert.equal(state.population,0);assert.ok(state.soldiers.every(s=>s.maxHP===1500));assert.equal(state.started,true);
  const packet=await (await fetch(url+'/arena',{method:'POST',headers,body:JSON.stringify({character:'Cassius',testWave:true})})).json();assert.equal(packet.player.character,'Julia');assert.equal(packet.siege.wave,null);
 }finally{service.close();await new Promise(r=>server.close(r));fs.rmSync(runtime,{recursive:true,force:true});}
});
