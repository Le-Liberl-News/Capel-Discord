const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityLobby}=require('../utils/activityLobby');
const {createHalloweenAccess}=require('../utils/activityHalloweenAccess');
const {PermissionFlagsBits}=require('discord.js');
const grid={origin:{x:0,z:0},step:1,width:10,height:10,cells:Array(100).fill(0),spawn:{x:1,y:0,z:1}};
test('Halloween scenes require admin permission, isolate players and never relay to Discord',async()=>{
 let time=0,admin=true,relayed=0;
 const lobby=createActivityLobby({grid,now:()=>time,resolveCharacter:async()=> 'Estelle',onSay:()=>relayed++,isHalloweenAdmin:async id=>admin&&id!=='outsider',halloween:{grid,residents:{disablePoms:true,npcs:[]},duration:54000}});
 const a=await lobby.join({id:'admin-a',channel:'guild'}),b=await lobby.join({id:'admin-b',channel:'guild'});
 await assert.rejects(lobby.enterHalloween('outsider'),e=>e.status===403);
 await lobby.enterHalloween('admin-a');await lobby.enterHalloween('admin-b');
 const first=await lobby.state(a.activity_token),second=await lobby.state(b.activity_token);
 assert.equal(first.map,'halloween');assert.equal(first.joueurs.length,1);assert.equal(second.joueurs.length,1);assert.notEqual(first.sceneKey,second.sceneKey);assert.equal(first.health.canMove,false);assert.equal(JSON.stringify(first).includes('admin-a'),false);
 time=55000;assert.equal((await lobby.state(a.activity_token)).health.canMove,true);
 await lobby.state(a.activity_token,{x:1,z:1,action:{id:'test-chat',type:'say',text:'Test privé'}});assert.equal(relayed,0);
 assert.equal((await lobby.state(b.activity_token)).messages.length,0);
 admin=false;assert.equal((await lobby.state(a.activity_token)).map,'anterose');
});
test('Halloween access checks Administrator, refreshes on entry and fails closed',async()=>{
 let permitted=true,calls=0;
 const allowed=createHalloweenAccess({guilds:{fetch:async()=>({members:{fetch:async()=>{calls++;return {permissions:{has:flag=>{assert.equal(flag,PermissionFlagsBits.Administrator);return permitted;}}};}}})}});
 assert.equal(await allowed('user'),true);permitted=false;assert.equal(await allowed('user',{force:true}),false);assert.equal(calls,2);
 assert.equal(await createHalloweenAccess({guilds:{fetch:async()=>{throw Error('offline');}}})('user'),false);
});
