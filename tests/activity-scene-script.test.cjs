const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {compileScene,walkAt}=require('../activity/scene-script.cjs');
const {createSceneInvitations}=require('../utils/activitySceneInvitations');
const {createActivityLobby}=require('../utils/activityLobby');
const grid={origin:{x:0,z:0},step:1,width:10,height:10,cells:Array(100).fill(0),spawn:{x:1,y:0,z:1}};
test('text scenes schedule concurrent actions, interpolate walks and reject unknown commands',()=>{
 const scene=compileScene('fade in 2 0\nwalk player 0 0 1 0 0 3 3\nwait 3\nsay ray "Salut !"\nwait 7');
 assert.equal(scene.duration,10000);assert.equal(scene.events.at(-1).at,3000);assert.equal(walkAt(scene,'player',1500).position.z,2);assert.equal(walkAt(scene,'player',4000).moving,false);
 assert.throws(()=>compileScene('eval "bad"'),/ligne 1/);assert.throws(()=>compileScene('wait -2'),/durée/);
 const real=compileScene(fs.readFileSync('activity/assets/sky/halloween/ray.sky','utf8'));assert.equal(real.duration,6000);assert.equal(real.events.filter(e=>e.type==='say').length,7);
});
test('private scene starts only after readiness, walks authoritatively, then releases movement',async()=>{
 let time=0;const scene=compileScene('walk player 1 0 1 1 0 3 3\nwait 5');
 const lobby=createActivityLobby({grid,now:()=>time,resolveCharacter:async()=> 'Estelle',isHalloweenAdmin:async()=>true,halloween:{grid,getScript:()=>scene,residents:{disablePoms:true,npcs:[]}}});
 const session=await lobby.join({id:'tester',channel:'guild'});await lobby.enterHalloween('tester');
 time=9000;let state=await lobby.state(session.activity_token);assert.equal(state.halloween.started,null);assert.equal(state.health.canMove,false);
 state=await lobby.state(session.activity_token,{sceneReady:'halloween'});assert.equal(state.halloween.started,9000);
 time=10500;state=await lobby.state(session.activity_token,{sceneTime:1500});assert.equal(state.position.z,2);assert.equal(state.health.canMove,false);
 time=15000;state=await lobby.state(session.activity_token,{x:1,y:0,z:3,sceneTime:5000,sceneDone:true});assert.equal(state.position.z,3);assert.equal(state.health.canMove,true);
});
test('scene links are bound to a member, survive restart and expire without leaking user IDs',async()=>{
 let time=0,saved;const options={now:()=>time,canInvite:async id=>id==='issuer',client:{application:{id:'app'},guilds:{fetch:async()=>({members:{fetch:async()=>({})}})}},store:{load:()=>saved,save:data=>saved=data}};
 let invites=createSceneInvitations(options);await assert.rejects(invites.create('intruder','recipient'),e=>e.status===403);
 const link=await invites.create('issuer','recipient'),id=new URL(link).searchParams.get('custom_id');assert.equal(link.includes('recipient'),false);assert.equal(invites.allowed('recipient'),false);assert.throws(()=>invites.claim(id,'other'),e=>e.status===403);
 invites.claim(id,'recipient');assert.equal(invites.allowed('recipient'),true);invites=createSceneInvitations(options);assert.equal(invites.allowed('recipient'),true);time=7*86400000;assert.equal(invites.allowed('recipient'),false);assert.throws(()=>invites.claim(id,'recipient'),e=>e.status===403);
});
test('scene command returns a private link and never sends a DM',async()=>{
 let reply,privateReply;const invites=createSceneInvitations({canInvite:async()=>true,client:{application:{id:'app'},guilds:{fetch:async()=>({members:{fetch:async()=>({})}})}}});
 await invites.handle({commandName:'scene',isChatInputCommand:()=>true,user:{id:'issuer',send:()=>{throw Error('Unexpected DM');}},options:{getUser:()=>({id:'recipient',bot:false})},deferReply:async value=>privateReply=value.flags,editReply:async value=>reply=value});
 assert.equal(privateReply,64);assert.match(reply.content,/https:\/\/discord.com\/activities\/app/);assert.equal(JSON.stringify(reply).includes('recipient'),false);
});

test('a scene shared in a human DM uses the authenticated recipient own private context',async()=>{
 const dm={id:'bot-private',recipient:{id:'recipient'},isDMBased:()=>true};let fetched;
 const invites=createSceneInvitations({canInvite:async()=>true,client:{application:{id:'app'},guilds:{fetch:async()=>({members:{fetch:async()=>({})}})},users:{fetch:async id=>{fetched=id;return {createDM:async()=>dm};}}}});
 const link=await invites.create('issuer','recipient'),id=new URL(link).searchParams.get('custom_id');
 assert.equal(await invites.launchContext(id,'recipient'),dm);assert.equal(fetched,'recipient');await assert.rejects(invites.launchContext(id,'other'),e=>e.status===403);
});

test('manual scene clock blocks forever on speech and resumes only after advancement',()=>{
 const {createSceneClock}=require('../activity/scene-script.cjs'),scene=compileScene('wait 1\nsay ray "First"\nsay ray "Second"\nwait 1'),clock=createSceneClock(scene),spoken=[];
 clock.tick(0,e=>spoken.push(e.text));clock.tick(2000,e=>spoken.push(e.text));assert.deepEqual(spoken,['First']);assert.equal(clock.state().time,1000);
 clock.tick(100000,e=>spoken.push(e.text));assert.equal(clock.state().done,false);assert.deepEqual(spoken,['First']);clock.advance();clock.tick(100010,e=>spoken.push(e.text));assert.deepEqual(spoken,['First','Second']);clock.advance();clock.tick(101100,()=>{});assert.equal(clock.state().done,true);
});
test('map and staged actors round-trip from text and reject duplicate aliases',()=>{
 const scene=compileScene('map tower1\nactor player "Estelle" 0 0 1 player\nactor foe "Mishy" 2 0 3 enemy\nwait 1');assert.equal(scene.map,'tower1');assert.equal(scene.actors[1].kind,'enemy');assert.equal(scene.actors[1].position.x,2);assert.throws(()=>compileScene('actor a "Ray" 0 0 0 npc\nactor a "Ray" 0 0 0 npc\nwait 1'),/doublon/);
});
