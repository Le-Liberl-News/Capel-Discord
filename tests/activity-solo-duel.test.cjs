const test=require("node:test"),assert=require("node:assert/strict");
const {createActivityTerminal}=require("../utils/activityTerminal");
const {createActivityDuels}=require("../utils/activityDuels");
function fakeLobby(map="anterose"){
 const calls=[];
 return {calls,identity:()=>({id:"alice",map}),playTowerAs:(user,character)=>calls.push(["playAs",user,character]),enterTower:(user,floor)=>calls.push(["tower",user,floor]),huntSummary:()=>null};
}
test("the menu sends to the tower with a character the player's roles unlock, and refuses the others",async()=>{
 const lobby=fakeLobby(),terminal=createActivityTerminal({lobby,duels:{pending:()=>[]},resolveCharacter:async()=>"Estelle",assignedCharacters:async()=>["Estelle","Joshua"],allowedCharacters:async()=>["Kloe","Estelle"]});
 await terminal.action("token",{action:"tower",character:"Kloe",request:"tower-kloe-1"});
 assert.deepEqual(lobby.calls,[["playAs","alice","Kloe"],["tower","alice",1]]);
 await assert.rejects(terminal.action("token",{action:"tower",character:"Rean",request:"tower-rean-1"}),/indisponible/);
 const menu=await terminal.menu("token");assert.equal(menu.own,"Estelle");assert.deepEqual(menu.characters,["Joshua"]);
});
test("the menu works from home only, without walking up to the Capel",async()=>{
 const terminal=createActivityTerminal({lobby:fakeLobby("arena"),duels:{pending:()=>[]},resolveCharacter:async()=>"Estelle",assignedCharacters:async()=>[]});
 await assert.rejects(terminal.menu("token"),/menu/);
});
test("a duel against a Discord member is one of free choice: the challenger waits, the other gets a DM",async()=>{
 const sent=[],joined=[],accepted=[],created=[];
 const lobby={matchFor:()=>null,prepareDuel(){},createDuel:d=>created.push(d),cancelDuel(){},joinDuel:(id,user)=>joined.push(user),acceptDuel:(id,user)=>accepted.push(user)};
 const duels=createActivityDuels({lobby,resolveCharacter:async()=>"Joshua",resolveOpponent:async()=>null,characterNames:[]});
 const client={users:{fetch:async id=>({send:async m=>sent.push([id,m])})}};
 const id=await duels.soloChallenge("alice","bob",{allowed:["Estelle","Kloe"],labels:["Alice","Bob"]},client);
 assert.deepEqual(created[0].free,{allowed:["Estelle","Kloe"]});assert.deepEqual(created[0].players,["alice","bob"]);
 assert.deepEqual(joined,["alice"]);assert.deepEqual(accepted,["alice"]);
 assert.equal(sent[0][0],"bob");assert.match(sent[0][1].content,/Alice/);assert.equal(sent[0][1].components[0].components[0].custom_id,"activity:"+id);
 await assert.rejects(duels.soloChallenge("alice","alice",{allowed:["Estelle"],labels:["Alice","Alice"]},client),/autre joueur/);
 await assert.rejects(duels.soloChallenge("alice","carol",{allowed:[],labels:["Alice","Carol"]},client),/Aucun personnage/);
});
const {createActivityLobby}=require("../utils/activityLobby");
const grid={origin:{x:0,z:0},step:1,width:10,height:10,cells:Array(100).fill(0),spawn:{x:1,y:0,z:1}};
function fixture(){let now=0;const lobby=createActivityLobby({grid,now:()=>now,resolveCharacter:async()=>"Joshua",arena:{grid,spawns:[{x:1,y:0,z:1},{x:8,y:0,z:1}],residents:{npcs:[],ballSpawns:[{x:1,y:.375,z:2},{x:8,y:.375,z:2}]}}});return{lobby,tick:ms=>now+=ms};}
test("a duel of free choice waits for both characters and the first stage chosen, then each plays its pick",async()=>{
 const {lobby}=fixture();
 const a=await lobby.join({id:"alice",channel:"dm-a"}),b=await lobby.join({id:"bob",channel:"dm-b"});
 lobby.createDuel({id:"free",channel:"guild",players:["alice","bob"],names:["Alice","Bob"],free:{allowed:["Estelle","Kloe"]}});
 lobby.joinDuel("free","alice");lobby.acceptDuel("free","alice");lobby.joinDuel("free","bob");assert.equal(lobby.acceptDuel("free","bob"),false);
 // nothing chosen yet: both stay where they are, and see what is left to choose
 const waiting=await lobby.state(a.activity_token);assert.equal(waiting.map,"anterose");
 assert.deepEqual(waiting.selection,{id:"free",allowed:["Estelle","Kloe"],character:null,venue:null,opponent:"Bob",opponentPicked:false,opponentAccepted:true});
 assert.throws(()=>lobby.pickDuel("free","alice",{character:"Rean"}),/indisponible/);
 assert.equal(lobby.pickDuel("free","alice",{character:"Kloe",venue:"arena"}).ready,false);
 // the second one's stage does not count, the first one set it
 const done=lobby.pickDuel("free","bob",{character:"Estelle",venue:"gehenna"});
 assert.equal(done.ready,true);assert.deepEqual(done.names,["Kloe","Estelle"]);assert.equal(lobby.selection("bob"),null);
 const inArena=await lobby.state(a.activity_token),other=await lobby.state(b.activity_token);
 assert.equal(inArena.map,"arena");assert.equal(inArena.selection,null);
 assert.deepEqual(other.joueurs.map(p=>p.character).sort(),["Estelle","Kloe"]);
 assert.throws(()=>lobby.pickDuel("free","bob",{character:"Kloe"}),/n'attend plus/);
});
test("opening the activity starts on the menu, even after leaving it in the tower; a reconnection keeps the tower",async()=>{
 const simple={origin:{x:0,z:0},step:1,width:5,height:5,cells:Array(25).fill(0),spawn:{x:1,y:0,z:1}};
 const lobby=createActivityLobby({grid:simple,tower:[{grid:simple,layout:{start:simple.spawn,exit:{x:2,y:0,z:2}}}],now:()=>1000,resolveCharacter:async()=>"Joshua"});
 lobby.enterTower("alice");
 assert.equal((await lobby.join({id:"alice",channel:"dm"})).map,"tower1");               // a reconnection
 assert.equal((await lobby.join({id:"alice",channel:"dm",fresh:true})).map,"anterose");   // the activity opened again
});
