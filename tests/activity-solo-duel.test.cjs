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
test("a duel against a Discord member: both play their character of the day, the challenger waits on the stage",async()=>{
 const sent=[],joined=[],accepted=[],created=[];
 const lobby={matchFor:()=>null,prepareDuel(){},createDuel:d=>created.push(d),cancelDuel(){},joinDuel:(id,user)=>joined.push(user),acceptDuel:(id,user)=>accepted.push(user)};
 const duels=createActivityDuels({lobby,resolveCharacter:async id=>id==="alice"?"Estelle":"Joshua",resolveOpponent:async()=>null,characterNames:[]});
 const client={users:{fetch:async id=>({send:async m=>sent.push([id,m])})}};
 const result=await duels.discordChallenge("alice","bob",client);
 assert.deepEqual(created[0].names,["Estelle","Joshua"]);assert.deepEqual(joined,["alice"]);assert.deepEqual(accepted,["alice"]);
 assert.equal(sent[0][0],"bob");assert.match(sent[0][1].content,/Estelle/);assert.equal(sent[0][1].components[0].components[0].custom_id,"activity:"+result.id);
 await assert.rejects(duels.discordChallenge("alice","alice",client),/autre joueur/);
});