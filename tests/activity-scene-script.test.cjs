const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {compileScene,walkAt}=require('../activity/scene-script.cjs');
const {createSceneInvitations}=require('../utils/activitySceneInvitations');
const {createActivityLobby}=require('../utils/activityLobby');
const grid={origin:{x:0,z:0},step:1,width:10,height:10,cells:Array(100).fill(0),spawn:{x:1,y:0,z:1}};
test('text scenes schedule concurrent actions, interpolate walks and reject unknown commands',()=>{
 const scene=compileScene('fade in 2 0\nwalk player 0 0 1 0 0 3 3\nwait 3\nsay ray "Salut !"\nwait 7');
 assert.equal(scene.duration,10000);assert.equal(scene.events.at(-1).at,3000);assert.equal(walkAt(scene,'player',1500).position.z,2);assert.equal(walkAt(scene,'player',4000).moving,false);
 assert.throws(()=>compileScene('eval "bad"'),/ligne 1/);assert.throws(()=>compileScene('wait -2'),/durée/);
 const real=compileScene(fs.readFileSync('activity/assets/sky/halloween/ray.sky','utf8'));assert.equal(real.duration,57000);assert.equal(real.events.filter(e=>e.type==='say').length,7);
});
test('private scene starts only after readiness, walks authoritatively, then releases movement',async()=>{
 let time=0;const scene=compileScene('walk player 1 0 1 1 0 3 3\nwait 5');
 const lobby=createActivityLobby({grid,now:()=>time,resolveCharacter:async()=> 'Estelle',isHalloweenAdmin:async()=>true,halloween:{grid,getScript:()=>scene,residents:{disablePoms:true,npcs:[]}}});
 const session=await lobby.join({id:'tester',channel:'guild'});await lobby.enterHalloween('tester');
 time=9000;let state=await lobby.state(session.activity_token);assert.equal(state.halloween.started,null);assert.equal(state.health.canMove,false);
 state=await lobby.state(session.activity_token,{sceneReady:'halloween'});assert.equal(state.halloween.started,9000);
 time=10500;state=await lobby.state(session.activity_token);assert.equal(state.position.z,2);assert.equal(state.health.canMove,false);
 time=15000;state=await lobby.state(session.activity_token);assert.equal(state.position.z,3);assert.equal(state.health.canMove,true);
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
