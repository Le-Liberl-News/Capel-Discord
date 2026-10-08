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
 const calls=[],{lobby}=fixture();const service=createActivityDuels({lobby,characterNames:["Estelle","Joshua"],resolveCharacter:async id=>id==="real-alice"?"Estelle":"Joshua",resolveOpponent:async()=>"real-bob"});
 const interaction={isChatInputCommand:()=>true,isButton:()=>false,commandName:"duel",channelId:"guild",options:{getString:()=>"Joshua"},user:{id:"real-alice",send:async data=>calls.push(["private-a",data])},client:{users:{fetch:async()=>({send:async data=>calls.push(["private-b",data])})}},channel:{send:async data=>calls.push(["public",data])},deferReply:async()=>{},editReply:async data=>calls.push(["reply",data])};
 assert.equal(await service.handle(interaction),true);
 const publicMessage=calls.find(c=>c[0]==="public")[1];assert.equal(publicMessage.content.includes("real-"),false);assert.deepEqual(publicMessage.allowedMentions,{parse:[]});
 const customId=calls.find(c=>c[0]==="private-b")[1].components[0].components[0].custom_id;
 assert.equal(customId.includes("real-"),false);
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
