const test=require('node:test'),assert=require('node:assert/strict');
const physics=require('../activity/airship-physics.cjs'),{loadAirshipTerrain}=require('../utils/activityAirshipTerrain'),{createActivityAirship}=require('../utils/activityAirship'),{createActivityLobby}=require('../utils/activityLobby');
const terrain=loadAirshipTerrain(require('node:path').join(__dirname,'../activity/assets/sky/liberl'));
const flat={meta:{origin:{x:-10000,z:-10000},width:20000,height:20000,step:1,minY:0,maxY:400},floor:()=>0},spawn={x:0,y:0,z:0,yaw:0};
function launch(ground=flat,start=spawn,n=600,pitch=.16){const s=physics.initialAirship(start);for(let i=0;i<n;i++)physics.stepAirship(s,{throttle:1,roll:0,pitch:s.pitch<pitch?1:0},ground,start);return s;}
test('Lynx accelerates on the runway then lifts off, without instant movement',()=>{const s=physics.initialAirship(spawn);physics.stepAirship(s,{throttle:1,pitch:1,roll:0},flat,spawn);assert.equal(s.grounded,true);assert.ok(Math.hypot(s.vx,s.vz)<1);const flying=launch();assert.equal(flying.grounded,false);assert.ok(flying.y>10);assert.ok(flying.z<-100);});
test('the native Bose runway permits a real takeoff before its ramp',()=>{const s=launch(terrain.ground,terrain.config.spawn,300,.4);assert.equal(s.crashes,0);assert.equal(s.grounded,false);assert.ok(s.y>terrain.config.spawn.y+2);});
test('cutting throttle keeps momentum, and low speed loses altitude',()=>{const s=launch();const before=Math.hypot(s.vx,s.vz);physics.stepAirship(s,{throttle:0,pitch:0,roll:0},flat,spawn);assert.ok(Math.hypot(s.vx,s.vz)>before*.99);Object.assign(s,{x:0,y:30,z:0,vx:0,vz:3,vy:0,pitch:0,grounded:false});for(let i=0;i<60;i++)physics.stepAirship(s,{throttle:0,pitch:0,roll:0},flat,spawn);assert.ok(s.y<29);});
test('banking right curves the trajectory right while preserving forward movement',()=>{const s=launch();const x=s.x,z=s.z;for(let i=0;i<150;i++)physics.stepAirship(s,{throttle:1,pitch:0,roll:1},flat,spawn);assert.ok(s.roll<-.5);assert.ok(s.yaw<0);assert.ok(s.x>x+2);assert.ok(s.z<z);});
test('cruise stays compact and a full bank turns around within three seconds',()=>{
 const s=launch(flat,spawn,1200,0.16),start={x:s.x,z:s.z,yaw:s.yaw};
 assert.ok(Math.hypot(s.vx,s.vz)<=18.01);
 Object.assign(s,{y:100,pitch:0,vy:0});
 for(let i=0;i<12;i++)physics.stepAirship(s,{throttle:1,pitch:0,roll:1},flat,spawn);
 assert.ok(s.yaw<start.yaw-.1);assert.ok(s.x>start.x+.05);
 for(let i=12;i<180;i++)physics.stepAirship(s,{throttle:1,pitch:0,roll:1},flat,spawn);
 assert.ok(s.yaw<start.yaw-Math.PI);assert.ok(Math.hypot(s.x-start.x,s.z-start.z)<35);assert.equal(s.crashes,0);
});
test('low throttle supports slow exploration and releasing bank retains a short drift',()=>{
 const s={...physics.initialAirship(spawn),y:100,grounded:false,vz:-7.2};
 for(let i=0;i<600;i++)physics.stepAirship(s,{throttle:.4,pitch:0,roll:0},flat,spawn);
 assert.ok(Math.hypot(s.vx,s.vz)<8);assert.ok(s.y>=100);
 for(let i=0;i<60;i++)physics.stepAirship(s,{throttle:.4,pitch:0,roll:1},flat,spawn);
 const yaw=s.yaw,roll=s.roll;physics.stepAirship(s,{throttle:.4,pitch:0,roll:0},flat,spawn);
 assert.ok(s.yaw<yaw);assert.ok(s.roll>roll&&s.roll<0);
});
test('hard impact resets the Lynx safely onto its runway',()=>{const s={...launch(),y:.001,vy:-12,pitch:0};physics.stepAirship(s,{throttle:0,pitch:0,roll:0},flat,spawn);assert.equal(s.crashes,1);assert.equal(s.grounded,true);assert.equal(s.x,spawn.x);assert.equal(s.throttle,0);});
test('server simulates sequenced controls, ignores client positions and avoids double application',async()=>{let now=0;const service=createActivityAirship({...terrain,now:()=>now,resolveCharacter:async()=> 'Estelle'}),session=await service.join({id:'pilot',channel:'map:liberl'}),frames=[],local=physics.initialAirship(terrain.config.spawn);
 for(let i=1;i<=120;i++){const controls={throttle:1,pitch:local.pitch<.16?1:0,roll:0};physics.stepAirship(local,controls,terrain.ground,terrain.config.spawn);local.sequence=i;frames.push({sequence:i,controls});}now=2000;
 const result=await service.state(session.activity_token,{x:999999,y:999999,z:999999,flight:{frames}});assert.deepEqual(result.airship,local);const repeat=await service.state(session.activity_token,{flight:{frames}});assert.deepEqual(repeat.airship,local);await assert.rejects(()=>service.state(session.activity_token,{flight:{frames:[{sequence:121,controls:{pitch:NaN,roll:0,throttle:1}}]}}),{status:400});});
test('boarding needs proximity, moves to Liberl and returns to the shared restaurant',async()=>{const grid={origin:{x:0,z:0},width:10,height:10,step:1,cells:Array(100).fill(0),spawn:{x:2,y:0,z:2}},airship={...terrain,config:{...terrain.config,lobby:grid.spawn}},lobby=createActivityLobby({grid,airship,resolveCharacter:async()=> 'Estelle'}),joined=await lobby.join({id:'pilot',channel:'discord'});await lobby.state(joined.activity_token);await assert.rejects(()=>lobby.state('invalid',{action:{id:'bad',type:'flight_board'}}),{status:401});
 const boarded=await lobby.state(joined.activity_token,{action:{id:'board',type:'flight_board'}});assert.equal(boarded.map,'liberl');assert.equal(boarded.airship.grounded,true);assert.equal(boarded.joueurs[0].id,boarded.ownId);assert.ok(boarded.ownId.startsWith('avatar:'));assert.deepEqual(boarded.position,{x:terrain.config.spawn.x,y:terrain.config.spawn.y,z:terrain.config.spawn.z});const home=await lobby.state(joined.activity_token,{action:{id:'leave',type:'leave_map'}});assert.equal(home.map,'anterose');
 const far=createActivityLobby({grid,airship:{...airship,config:{...airship.config,lobby:{x:20,y:0,z:20}}},resolveCharacter:async()=> 'Estelle'}),other=await far.join({id:'remote',channel:'discord'});await far.state(other.activity_token);const rejected=await far.state(other.activity_token,{...grid.spawn,action:{id:'far',type:'flight_board'}});assert.equal(rejected.map,'anterose');assert.match(rejected.actionResult.error,/Approchez/);
});
test('pilots share the same sky, chat is private unless RP is checked, and long loading keeps the session valid',async()=>{
 let time=0;const posted=[],service=createActivityAirship({...terrain,now:()=>time,resolveCharacter:async id=>id==='a'?'Estelle':'Joshua',onSay:e=>posted.push(e)}),a=await service.join({id:'a',channel:'one'}),b=await service.join({id:'b',channel:'two'});
 let result=await service.state(a.activity_token,{action:{id:'chat-1',type:'say',text:'Bonjour',rp:false}});assert.equal(result.joueurs.length,2);assert.equal(posted.length,0);result=await service.state(b.activity_token);assert.equal(result.messages[0].text,'Bonjour');
 time=1000;await service.state(a.activity_token,{action:{id:'chat-2',type:'say',text:'RP',rp:true}});time=2000;await service.state(a.activity_token,{action:{id:'chat-3',type:'say',text:'Encore',rp:true}});await new Promise(resolve=>setImmediate(resolve));assert.equal(posted.length,2);assert.notEqual(posted[0].id,posted[1].id);
 time=40000;result=await service.state(a.activity_token);assert.equal(result.joueurs.length,1);assert.equal(result.joueurs[0].id,'a');
});
