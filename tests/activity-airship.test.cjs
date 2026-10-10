const test=require('node:test'),assert=require('node:assert/strict');
const physics=require('../activity/airship-physics.cjs'),{loadAirshipTerrain}=require('../utils/activityAirshipTerrain'),{createActivityAirship}=require('../utils/activityAirship'),{createActivityLobby}=require('../utils/activityLobby');
const terrain=loadAirshipTerrain(require('node:path').join(__dirname,'../activity/assets/sky/liberl'));
const flat={meta:{origin:{x:-10000,z:-10000},width:20000,height:20000,step:1,minY:0,maxY:400},floor:()=>0},spawn={x:0,y:0,z:0,yaw:0};
test('selected exit checks distance, native floor, ship footprint and headroom',async()=>{
 const walk=require('../activity/liberl-walking.cjs'),ship=physics.initialAirship(spawn);
 assert.equal(walk.exitPoint(ship,flat,{x:20,y:0,z:0}),null);
 assert.equal(walk.exitPoint(ship,flat,{x:6,y:8,z:0}),null);
 assert.equal(walk.exitPoint(ship,flat,{x:0,y:0,z:0}),null);
 assert.equal(walk.exitPoint(ship,{...flat,sweep:()=>({})},{x:6,y:0,z:0}),null);
 const service=createActivityAirship({config:{spawn},ground:flat}),a=await service.join({id:'a',channel:'one'});
 let r=await service.state(a.activity_token,{action:{id:'bad-exit',type:'flight_exit',target:{x:999,y:0,z:0}}});assert.equal(r.mode,'pilot');assert.ok(r.actionResult.error);
 r=await service.state(a.activity_token,{action:{id:'good-exit',type:'flight_exit',target:{x:6,y:0,z:0}}});assert.equal(r.mode,'foot');assert.deepEqual(r.position,{x:6,y:0,z:0});
});
test('vertical takeoff clears surrounding roofs before acquiring forward speed',()=>{
 const ground={...flat,floor:(x,z)=>Math.abs(x)<1&&Math.abs(z)<1?0:20},s=physics.initialAirship(spawn);
 assert.equal(physics.startTakeoff(s,ground),null);assert.equal(s.takeoff.y,32);
 for(let i=0;i<200;i++)physics.stepAirship(s,{throttle:1,roll:1,pitch:-1},ground,spawn);
 assert.equal(s.x,0);assert.equal(s.z,0);assert.ok(s.y>25);assert.equal(s.crashes,0);
 for(let i=0;i<60;i++)physics.stepAirship(s,{throttle:.5,roll:0,pitch:0},ground,spawn);
 assert.equal(s.takeoff,undefined);assert.equal(s.grounded,false);assert.ok(Math.hypot(s.vx,s.vz)>8);assert.ok(s.y>=31);assert.equal(s.crashes,0);
});
test('crash returns to the last completed landing, including after a server restart',async()=>{
 const s={...physics.initialAirship(spawn),x:30,y:1,z:20,grounded:false,yaw:1};assert.equal(physics.startLanding(s,flat),null);
 for(let i=0;i<180;i++)physics.stepAirship(s,{throttle:0,roll:0,pitch:0},flat,spawn);assert.deepEqual(s.checkpoint,{x:30,y:0,z:20,yaw:1});
 const store={load:()=>({ships:[['a',{character:'Estelle',airship:{...s,x:40,y:.01,z:40,grounded:false,vy:-10}}]]}),save:()=>{}};let time=0;
 const service=createActivityAirship({config:{spawn},ground:flat,store,now:()=>time}),a=await service.join({id:'a',channel:'one'});
 time=2200;const r=await service.state(a.activity_token,{flight:{frames:Array.from({length:132},(_,i)=>({sequence:i+1,controls:{throttle:0,roll:0,pitch:0}}))}});
 assert.equal(r.airship.crashes,1);assert.equal(r.airship.grounded,true);assert.equal(r.airship.x,30);assert.equal(r.airship.z,20);assert.equal(r.airship.yaw,1);
});
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
test('hard impact resets the Lynx safely onto its runway',()=>{const s={...launch(),y:.001,vy:-12,pitch:0};physics.stepAirship(s,{throttle:0,pitch:0,roll:0},flat,spawn);assert.equal(s.crashes,1);assert.ok(s.crashRemaining>1.9);for(let i=0;i<121;i++)physics.stepAirship(s,{throttle:0,pitch:0,roll:0},flat,spawn);assert.equal(s.grounded,true);assert.equal(s.x,spawn.x);assert.equal(s.throttle,0);});
test('server simulates sequenced controls, ignores client positions and avoids double application',async()=>{let now=0;const service=createActivityAirship({...terrain,now:()=>now,resolveCharacter:async()=> 'Estelle'}),session=await service.join({id:'pilot',channel:'map:liberl'}),frames=[],local=physics.initialAirship(terrain.config.spawn);
 for(let i=1;i<=120;i++){const controls={throttle:1,pitch:local.pitch<.16?1:0,roll:0};physics.stepAirship(local,controls,terrain.ground,terrain.config.spawn);local.sequence=i;frames.push({sequence:i,controls});}now=2000;
 const result=await service.state(session.activity_token,{x:999999,y:999999,z:999999,flight:{frames}});assert.deepEqual(result.airship,local);const repeat=await service.state(session.activity_token,{flight:{frames}});assert.deepEqual(repeat.airship,local);await assert.rejects(()=>service.state(session.activity_token,{flight:{frames:[{sequence:121,controls:{pitch:NaN,roll:0,throttle:1}}]}}),{status:400});});
test('boarding needs proximity, moves to Liberl and returns to the shared restaurant',async()=>{const grid={origin:{x:0,z:0},width:10,height:10,step:1,cells:Array(100).fill(0),spawn:{x:2,y:0,z:2}},airship={...terrain,config:{...terrain.config,door:grid.spawn}},lobby=createActivityLobby({grid,airship,resolveCharacter:async()=> 'Estelle'}),joined=await lobby.join({id:'pilot',channel:'discord'});await lobby.state(joined.activity_token);await assert.rejects(()=>lobby.state('invalid',{action:{id:'bad',type:'flight_board'}}),{status:401});
 const dock=await lobby.state(joined.activity_token,{action:{id:'dock',type:'hangar_enter'}});assert.equal(dock.map,'hangar');const boarded=await lobby.state(joined.activity_token,{action:{id:'board',type:'flight_board'}});assert.equal(boarded.map,'liberl');assert.equal(boarded.airship.grounded,true);assert.equal(boarded.joueurs[0].id,boarded.ownId);assert.ok(boarded.ownId.startsWith('avatar:'));assert.deepEqual(boarded.position,{x:terrain.config.spawn.x,y:terrain.config.spawn.y,z:terrain.config.spawn.z});const home=await lobby.state(joined.activity_token,{action:{id:'leave',type:'leave_map'}});assert.equal(home.map,'anterose');
 const far=createActivityLobby({grid,airship:{...airship,config:{...airship.config,door:{x:20,y:0,z:20}}},resolveCharacter:async()=> 'Estelle'}),other=await far.join({id:'remote',channel:'discord'});await far.state(other.activity_token);const rejected=await far.state(other.activity_token,{...grid.spawn,action:{id:'far',type:'hangar_enter'}});assert.equal(rejected.map,'anterose');assert.match(rejected.actionResult.error,/Approchez/);
});
test('pilots share the same sky, chat is private unless RP is checked, and long loading keeps the session valid',async()=>{
 let time=0;const posted=[],service=createActivityAirship({...terrain,now:()=>time,resolveCharacter:async id=>id==='a'?'Estelle':'Joshua',onSay:e=>posted.push(e)}),a=await service.join({id:'a',channel:'one'}),b=await service.join({id:'b',channel:'two'});
 let result=await service.state(a.activity_token,{action:{id:'chat-1',type:'say',text:'Bonjour',rp:false}});assert.equal(result.joueurs.length,2);assert.equal(posted.length,0);result=await service.state(b.activity_token);assert.equal(result.messages[0].text,'Bonjour');
 time=1000;await service.state(a.activity_token,{action:{id:'chat-2',type:'say',text:'RP',rp:true}});time=2000;await service.state(a.activity_token,{action:{id:'chat-3',type:'say',text:'Encore',rp:true}});await new Promise(resolve=>setImmediate(resolve));assert.equal(posted.length,2);assert.notEqual(posted[0].id,posted[1].id);
 time=40000;result=await service.state(a.activity_token);assert.equal(result.joueurs.length,2);assert.equal(result.joueurs[0].id,'a');
});
test('vertical landing fixes the chosen position, rejects void and speed, and allows departure there',()=>{
 const s={...physics.initialAirship(spawn),x:20,y:12,z:-30,vx:4,grounded:false};
 assert.equal(physics.startLanding(s,flat),null);
 for(let i=0;i<600&&!s.grounded;i++)physics.stepAirship(s,{throttle:1,pitch:1,roll:1},flat,spawn);
 assert.equal(s.grounded,true);assert.equal(s.x,20);assert.equal(s.z,-30);assert.equal(s.y,0);assert.equal(s.crashes,0);
 for(let i=0;i<120;i++)physics.stepAirship(s,{throttle:1,pitch:1,roll:0},flat,spawn);
 assert.equal(s.grounded,false);assert.ok(s.x>10);
 const fast={...s,vx:20};assert.match(physics.startLanding(fast,flat),/Ralentissez/);
 assert.match(physics.startLanding({...s,vx:0,vz:0},{...flat,floor:()=>null}),/surface/);
 assert.match(physics.startLanding({...s,y:-1,vx:0,vz:0},flat),/surface/);
});
test('each parked Lynx survives leaving, expiration and a server restart in the same shared sky',async()=>{
 let data={ships:[['a',{character:'Estelle',airship:{...physics.initialAirship(spawn),x:22,z:-33}}]]},time=0;
 const store={load:()=>structuredClone(data),save:value=>data=structuredClone(value)},options={config:{spawn},ground:flat,store,now:()=>time,resolveCharacter:async()=> 'Estelle'};
 let service=createActivityAirship(options),a=await service.join({id:'a',channel:'one'}),b=await service.join({id:'b',channel:'two'});
 assert.equal(a.player.x,22);service.leave(a.activity_token);let world=await service.state(b.activity_token);assert.equal(world.joueurs.find(p=>p.id==='a').x,22);
 time=130000;await service.join({id:'b',channel:'two'});service=createActivityAirship(options);a=await service.join({id:'a',channel:'new'});
 assert.equal(a.player.x,22);assert.equal(a.player.z,-33);assert.equal(a.player.airship.sequence,0);
});
test('landing is server-authoritative and a repeated action does not restart the descent',async()=>{
 let time=0;const start={...physics.initialAirship(spawn),x:25,y:10,z:-25,grounded:false,vz:-3},store={load:()=>({ships:[['a',{character:'Estelle',airship:start}]]}),save:()=>{}};
 const service=createActivityAirship({config:{spawn},ground:flat,store,now:()=>time}),a=await service.join({id:'a',channel:'one'});
 const action={id:'land-1',type:'flight_land'},first=await service.state(a.activity_token,{action,x:999,z:999});assert.deepEqual(first.airship.landing,{x:25,y:0,z:-25});
 const frames=Array.from({length:120},(_,i)=>({sequence:i+1,controls:{throttle:1,pitch:1,roll:1}}));time=2000;
 const next=await service.state(a.activity_token,{action,flight:{frames}});assert.ok(next.airship.y<first.airship.y);assert.equal(next.airship.x,25);assert.equal(next.airship.crashes,0);
});
test('the pilot walks independently beside the parked Lynx, then boards only their own nearby ship',async()=>{
 let time=0;const service=createActivityAirship({config:{spawn},ground:flat,now:()=>time}),a=await service.join({id:'a',channel:'one'});
 let r=await service.state(a.activity_token,{action:{id:'exit',type:'flight_exit'}});assert.equal(r.mode,'foot');const start={...r.position};assert.notDeepEqual(start,spawn);
 time=2000;r=await service.state(a.activity_token,{flight:{frames:Array.from({length:120},(_,i)=>({sequence:i+1,mode:'foot',controls:{dx:1,dz:0}}))}});
 assert.ok(r.position.x>start.x+6.9);assert.equal(r.airship.x,0);assert.equal(r.airship.z,0);assert.equal(r.joueurs[0].mode,'foot');
 r=await service.state(a.activity_token,{action:{id:'far-enter',type:'flight_enter'}});assert.match(r.actionResult.error,/Approchez/);assert.equal(r.mode,'foot');
 time=4000;r=await service.state(a.activity_token,{flight:{frames:Array.from({length:120},(_,i)=>({sequence:i+121,mode:'foot',controls:{dx:-1,dz:0}}))}});
 r=await service.state(a.activity_token,{action:{id:'enter',type:'flight_enter'}});assert.equal(r.mode,'pilot');assert.equal(r.position.x,0);
});
test('native walking surfaces allow a safe exit at Bose and a return home recalls the ship',async()=>{
 assert.ok(terrain.surface.floor(terrain.config.spawn.x,terrain.config.spawn.z,terrain.config.spawn.y+.6)!==null);
 const service=createActivityAirship(terrain),a=await service.join({id:'a',channel:'one'}),r=await service.state(a.activity_token,{action:{id:'native-exit',type:'flight_exit'}});assert.equal(r.mode,'foot');
 const grid={origin:{x:0,z:0},width:10,height:10,step:1,cells:Array(100).fill(0),spawn:{x:2,y:0,z:2}},worldStore={data:null,load(){return this.data;},save(value){this.data=structuredClone(value);}},lobby=createActivityLobby({grid,airship:{...terrain,config:{...terrain.config,door:grid.spawn}},worldStores:{liberl:worldStore},resolveCharacter:async()=> 'Estelle'}),joined=await lobby.join({id:'b',channel:'one'});
 await lobby.state(joined.activity_token);await lobby.state(joined.activity_token,{action:{id:'hangar',type:'hangar_enter'}});await lobby.state(joined.activity_token,{action:{id:'board',type:'flight_board'}});
 await lobby.state(joined.activity_token,{action:{id:'exit',type:'flight_exit'}});const home=await lobby.state(joined.activity_token,{action:{id:'home',type:'leave_map'}});assert.equal(home.map,'anterose');assert.equal(worldStore.data.ships.length,0);
});
test('walking collides with native walls, rejects void and high steps, and slides along obstacles',()=>{
 const THREE=require('three'),root=new THREE.Group(),floor=new THREE.Mesh(new THREE.PlaneGeometry(10,10),new THREE.MeshBasicMaterial());floor.rotation.x=-Math.PI/2;root.add(floor);
 const wall=new THREE.Mesh(new THREE.BoxGeometry(.2,3,10),new THREE.MeshBasicMaterial());wall.position.set(1,1.5,0);root.add(wall);
 const surface=require('../activity/walking-surface.cjs').createWalkingSurface(THREE,root),walk=require('../activity/liberl-walking.cjs'),p={x:0,y:0,z:0};
 for(let i=0;i<60;i++)walk.stepWalk(p,{dx:1,dz:0},surface);assert.ok(p.x<.9);assert.equal(p.y,0);
 const z=p.z;for(let i=0;i<20;i++)walk.stepWalk(p,{dx:1,dz:1},surface);assert.ok(p.z>z+.7);assert.ok(p.x<.9);
 const edge={x:0,y:0,z:4.99};walk.stepWalk(edge,{dx:0,dz:1},surface);assert.equal(edge.z,4.99);
 const high={x:0,y:0,z:0};walk.stepWalk(high,{dx:1,dz:0},{floor:()=>2});assert.equal(high.x,0);
});
test('foot mode survives restart while stale flight frames never move the parked ship',async()=>{
 let time=0,data={ships:[]};const store={load:()=>structuredClone(data),save:v=>data=structuredClone(v)},options={config:{spawn},ground:flat,store,now:()=>time};
 let service=createActivityAirship(options),a=await service.join({id:'a',channel:'one'}),r=await service.state(a.activity_token,{action:{id:'exit',type:'flight_exit'}}),position={...r.position};
 time=1000;r=await service.state(a.activity_token,{x:999,y:999,z:999,flight:{frames:Array.from({length:60},(_,i)=>({sequence:i+1,mode:'pilot',controls:{throttle:1,roll:1,pitch:1}}))}});
 assert.deepEqual(r.position,position);assert.equal(r.airship.x,0);assert.equal(r.airship.sequence,60);
 service.leave(a.activity_token);service=createActivityAirship(options);a=await service.join({id:'a',channel:'other'});assert.equal(a.player.mode,'foot');assert.equal(a.player.x,position.x);assert.equal(a.player.airship.sequence,0);
});
