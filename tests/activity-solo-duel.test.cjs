const test=require("node:test"),assert=require("node:assert/strict");
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