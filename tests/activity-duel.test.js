const test=require("node:test"),assert=require("node:assert/strict");
const {createActivityLobby}=require("../utils/activityLobby");
const {createActivityDuels}=require("../utils/activityDuels");
const grid={origin:{x:0,z:0},step:1,width:10,height:10,cells:Array(100).fill(0),spawn:{x:1,y:0,z:1}};
function fixture(){let now=0;const lobby=createActivityLobby({grid,now:()=>now,resolveCharacter:async id=>id==="real-alice"?"Estelle":"Joshua",arena:{grid,spawns:[{x:1,y:0,z:1},{x:8,y:0,z:1}],residents:{npcs:[],ballSpawns:[{x:1,y:.375,z:2},{x:8,y:.375,z:2}]}}});return{lobby,tick:ms=>now+=ms};}
test("private duel unites different DM channels, isolates other players and hides Discord IDs",async()=>{
 const {lobby}=fixture();
 const a=await lobby.join({id:"real-alice",channel:"guild-channel"});const b=await lobby.join({id:"real-bob",channel:"dm-bob"});const c=await lobby.join({id:"spectator",channel:"guild-channel"});
 await lobby.state(a.activity_token);await lobby.state(c.activity_token);
 lobby.createDuel({id:"match",channel:"guild-channel",players:["real-alice","real-bob"]});
 lobby.joinDuel("match","real-alice");lobby.joinDuel("match","real-bob");
 const first=await lobby.state(a.activity_token,{x:99,z:99});const second=await lobby.state(b.activity_token);
 assert.equal(first.map,"arena");assert.equal(second.joueurs.length,2);assert.equal(second.poms.length,2);assert.notEqual(first.position.x,second.position.x);
 assert.equal(JSON.stringify(second).includes("real-"),false);assert.equal(JSON.stringify(a).includes("real-alice"),false);
 assert.deepEqual(first.position,{x:1,y:0,z:1});
 const outside=await lobby.state(c.activity_token);assert.equal(outside.map,"anterose");assert.equal(outside.joueurs.length,1);
 assert.throws(()=>lobby.joinDuel("match","intruder"));
 const left=await lobby.state(a.activity_token,{action:{id:"leave",type:"leave_duel"},x:99,z:99});assert.equal(left.map,"anterose");
});
test("different duels cannot see or damage one another; invitation expires",async()=>{
 const {lobby,tick}=fixture();
 lobby.createDuel({id:"one",channel:"guild",players:["a","b"]});lobby.createDuel({id:"two",channel:"guild",players:["c","d"]});
 lobby.joinDuel("one","a");lobby.joinDuel("two","c");
 const a=await lobby.join({id:"a",channel:"dm-a"}),c=await lobby.join({id:"c",channel:"dm-c"});
 await lobby.state(a.activity_token);assert.equal((await lobby.state(c.activity_token)).joueurs.length,1);
 tick(30*60*1000+1);assert.throws(()=>lobby.joinDuel("one","b"));assert.equal((await lobby.state(a.activity_token)).map,"anterose");
});
test("separate Poms are atomic and a player cannot carry two",async()=>{
 const {lobby}=fixture();lobby.createDuel({id:"match",channel:"guild",players:["a","b"]});lobby.joinDuel("match","a");lobby.joinDuel("match","b");
 const a=await lobby.join({id:"a",channel:"dm-a"}),b=await lobby.join({id:"b",channel:"dm-b"});
 const first=await lobby.state(a.activity_token,{x:1,z:1,action:{id:"pick-a",type:"pickup",target:"world:pom:0"}});
 const second=await lobby.state(b.activity_token,{x:8,z:1,action:{id:"pick-b",type:"pickup",target:"world:pom:1"}});
 assert.equal(first.poms[0].mode,"held");assert.equal(second.poms[1].mode,"held");assert.notEqual(second.poms[0].owner,second.poms[1].owner);
 const denied=await lobby.state(a.activity_token,{x:1,z:1,action:{id:"again",type:"pickup",target:"world:pom:1"}});assert.ok(denied.actionResult.error);
 const thrown=await lobby.state(a.activity_token,{x:1,z:1,action:{id:"throw",type:"throw",aim:{x:7,y:.9,z:1}}});assert.equal(thrown.poms[0].mode,"flight");assert.equal(thrown.poms[1].mode,"held");
});
test("duel command uses character names and only private buttons launch",async()=>{
 let saved;const store={load:()=>saved,save:data=>saved=structuredClone(data)};
 const calls=[],{lobby}=fixture();const options={lobby,store,characterNames:["Estelle","Joshua"],resolveCharacter:async id=>id==="real-alice"?"Estelle":"Joshua",resolveOpponent:async()=>"real-bob"};let service=createActivityDuels(options);
 const interaction={isChatInputCommand:()=>true,isButton:()=>false,commandName:"duel",channelId:"guild",options:{getString:()=>"Joshua"},user:{id:"real-alice",send:async data=>calls.push(["private-a",data])},client:{users:{fetch:async()=>({send:async data=>calls.push(["private-b",data])})}},channel:{send:async data=>calls.push(["public",data])},deferReply:async()=>{},editReply:async data=>calls.push(["reply",data])};
 assert.equal(await service.handle(interaction),true);
 const publicMessage=calls.find(c=>c[0]==="public")[1];assert.equal(publicMessage.content.includes("real-"),false);assert.deepEqual(publicMessage.allowedMentions,{parse:[]});
 const customId=calls.find(c=>c[0]==="private-b")[1].components[0].components[0].custom_id;
 assert.equal(customId.includes("real-"),false);
 service=createActivityDuels(options); // Restart before the recipient opens the private invitation.
 let launched=false;await service.handle({isChatInputCommand:()=>false,isButton:()=>true,customId,user:{id:"real-bob"},channel:{isDMBased:()=>true},launchActivity:async()=>{launched=true;}});assert.equal(launched,true);
 let refused=false;await service.handle({isChatInputCommand:()=>false,isButton:()=>true,customId,user:{id:"intruder"},reply:async()=>{refused=true;}});assert.equal(refused,true);
});

test("native Grancel arena connects both spawns and every Pom sits on its real floor",async()=>{
 const fs=require("node:fs"),path=require("node:path"),root=path.join(__dirname,"../activity/assets/sky/arena");
 const g=JSON.parse(fs.readFileSync(path.join(root,"navigation.json"))),residents=JSON.parse(fs.readFileSync(path.join(root,"residents.json")));
 const geometry=require("../utils/activityGeometry").createActivityGeometry(JSON.parse(fs.readFileSync(path.join(root,"anterose.gltf"))));
 const {route}=await import("../activity/movement.mjs");assert.ok(route(g,{x:-6,y:0,z:3},{x:6,z:3}).length);
 for(const p of residents.ballSpawns) { assert.ok(Math.abs(geometry.floor(p.x,p.z,p.y)-p.y+.375)<.001); assert.ok(route(g,g.spawn,p).length); }
});

test("duel assignment survives restart and both opponents can resume the same arena",async()=>{
 let saved;const store={load:()=>saved,save:data=>saved=structuredClone(data)};
 const options={grid,store,resolveCharacter:async()=>"Joshua",arena:{grid,residents:{npcs:[],ballSpawns:[{x:1,y:.375,z:2}]}}};
 let lobby=createActivityLobby(options);lobby.createDuel({id:"persisted",channel:"guild",players:["a","b"]});lobby.joinDuel("persisted","a");lobby.joinDuel("persisted","b");
 const old=await lobby.join({id:"a",channel:"dm-a"});lobby=createActivityLobby(options);
 await assert.rejects(()=>lobby.state(old.activity_token),{status:401});
 const a=await lobby.join({id:"a",channel:"dm-a"}),b=await lobby.join({id:"b",channel:"dm-b"});
 const picked=await lobby.state(a.activity_token,{x:1,z:1,action:{id:"pickup",type:"pickup",target:"world:pom:0"}});
 const peer=await lobby.state(b.activity_token);assert.equal(peer.joueurs.length,2);assert.equal(peer.sceneKey,"persisted");assert.equal(peer.poms[0].owner,picked.ownId);
});
test("a second window cannot alternate movement with the current controller",async()=>{
 const {lobby}=fixture();const first=await lobby.join({id:"a",channel:"guild"});await lobby.state(first.activity_token);
 const second=await lobby.join({id:"a",channel:"guild"});await lobby.state(second.activity_token);
 await assert.rejects(()=>lobby.state(first.activity_token,{x:9,z:9}),{status:409});
 assert.deepEqual((await lobby.state(second.activity_token)).position,{x:1,y:0,z:1});
});

test("retrying the same duel resends both invitations and preserves the already joined arena",async()=>{
 let time=0,fail=false;const calls=[],{lobby}=fixture();
 const manager=createActivityDuels({lobby,now:()=>time,characterNames:["Estelle","Joshua"],resolveCharacter:async id=>id==="real-alice"?"Estelle":"Joshua",resolveOpponent:async()=>"real-bob"});
 const command={isChatInputCommand:()=>true,commandName:"duel",channelId:"guild",options:{getString:()=>"Joshua"},user:{id:"real-alice",send:async data=>calls.push(["a",data])},client:{users:{fetch:async()=>({send:async data=>{if(fail)throw Object.assign(new Error("private detail"),{code:50007});calls.push(["b",data]);}})}},channel:{send:async data=>calls.push(["public",data])},deferReply:async()=>{},editReply:async data=>calls.push(["reply",data])};
 await manager.handle(command);const id=calls.find(c=>c[0]==="b")[1].components[0].components[0].custom_id.slice(9);
 lobby.joinDuel(id,"real-alice");const player=await lobby.join({id:"real-alice",channel:"dm-a"});const before=await lobby.state(player.activity_token);
 time=30001;await manager.handle(command);const sent=calls.filter(c=>c[0]==="b");assert.equal(sent.length,2);assert.equal(sent[1][1].components[0].components[0].custom_id,"activity:"+id);
 assert.equal((await lobby.state(player.activity_token)).sceneKey,before.sceneKey);assert.equal(calls.filter(c=>c[0]==="public").length,1);
 time=60002;fail=true;await manager.handle(command);assert.equal((await lobby.state(player.activity_token)).sceneKey,id);assert.match(calls.at(-1)[1].content,/messages/);assert.doesNotMatch(calls.at(-1)[1].content,/private detail/);
});
test("a new challenge releases the initiating player's old assignment",async()=>{
 const {lobby}=fixture();lobby.createDuel({id:"occupied",channel:"guild",players:["real-alice","other"]});lobby.joinDuel("occupied","real-alice");
 let reply;const manager=createActivityDuels({lobby,characterNames:["Joshua"],resolveCharacter:async()=>"Estelle",resolveOpponent:async()=>"real-bob"});
 const command={isChatInputCommand:()=>true,commandName:"duel",channelId:"guild",options:{getString:()=>"Joshua"},user:{id:"real-alice",send:async()=>{}},client:{users:{fetch:async()=>({send:async()=>{}})}},channel:{send:async()=>{}},deferReply:async()=>{},editReply:async data=>reply=data.content};
 await manager.handle(command);assert.match(reply,/envoy/);assert.equal((await lobby.join({id:"real-alice",channel:"guild"})).map,"anterose");assert.ok(lobby.findDuel(["real-alice","real-bob"],"guild"));
});
test("closed activity releases stale assignments while a connected opponent remains protected",async()=>{
 const {lobby,tick}=fixture();lobby.createDuel({id:"old",channel:"guild",players:["a","b"]});lobby.joinDuel("old","a");lobby.joinDuel("old","b");
 const b=await lobby.join({id:"b",channel:"dm-b"});await lobby.state(b.activity_token);
 tick(60000);await lobby.state(b.activity_token);tick(60001);await lobby.state(b.activity_token);assert.throws(()=>lobby.prepareDuel("c","b"),/actif/);
 lobby.prepareDuel("c","a");lobby.createDuel({id:"new",channel:"guild",players:["c","a"]});lobby.joinDuel("new","a");
 assert.equal((await lobby.join({id:"a",channel:"dm-a"})).map,"arena");assert.equal((await lobby.state(b.activity_token)).sceneKey,"old");
});
test("accepting a new private invitation leaves the previous match",async()=>{
 const {lobby}=fixture();lobby.createDuel({id:"old",channel:"guild",players:["a","b"]});lobby.createDuel({id:"new",channel:"guild",players:["a","c"]});lobby.joinDuel("old","a");
 const a=await lobby.join({id:"a",channel:"dm-a"});await lobby.state(a.activity_token);lobby.joinDuel("new","a");assert.equal((await lobby.state(a.activity_token)).sceneKey,"new");
});
test("the same pair resumes its duel even when the new command comes from another channel",()=>{
 const {lobby}=fixture();lobby.createDuel({id:"old",channel:"first",players:["a","b"]});lobby.joinDuel("old","a");assert.equal(lobby.findDuel(["b","a"],"second").id,"old");
});
