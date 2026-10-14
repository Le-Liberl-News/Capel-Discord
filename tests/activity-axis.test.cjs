const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityLobby}=require('../utils/activityLobby');
const grid={origin:{x:0,z:0},step:1,width:10,height:10,cells:Array(100).fill(0),spawn:{x:1,y:0,z:1}};
const venue=(spawns,introDuration)=>({grid,spawns,introDuration,residents:{npcs:[],ballSpawns:[{x:1,y:.375,z:2}]}});
function fixture(draw){let now=0;const lobby=createActivityLobby({grid,now:()=>now,random:()=>draw,resolveCharacter:async id=>id==='alice'?'Estelle':'Joshua',
 arena:venue([{x:1,y:0,z:1},{x:8,y:0,z:1}],19000),axis:venue([{x:4,y:0,z:2},{x:4,y:0,z:7}],16300)});return {lobby,tick:ms=>now+=ms};}
async function duel(lobby){
 const a=await lobby.join({id:'alice',channel:'dm-a'}),b=await lobby.join({id:'bob',channel:'dm-b'});
 lobby.createDuel({id:'match',channel:'guild',players:['alice','bob']});lobby.joinDuel('match','alice');lobby.joinDuel('match','bob');
 lobby.acceptDuel('match','alice');lobby.acceptDuel('match','bob');return {a,b};
}
test('one duel in two takes place at the top of the Axis Pillar, with its own spawns and intro',async()=>{
 const {lobby}=fixture(.2),{a,b}=await duel(lobby);
 const first=await lobby.state(a.activity_token,{x:99,z:99}),second=await lobby.state(b.activity_token);
 assert.equal(first.map,'axis');assert.equal(first.sceneKey,'arena:match');assert.deepEqual(first.position,{x:4,y:0,z:2});
 assert.equal(second.joueurs.length,2);assert.equal(first.duel.venue,'axis');assert.equal(first.duel.readyAt-first.duel.startsAt,16300);
 const left=await lobby.state(a.activity_token,{action:{id:'leave',type:'leave_duel'},x:4,z:2});assert.equal(left.map,'anterose');
});
test('the other half stays in Grancel, unchanged',async()=>{
 const {lobby}=fixture(.7),{a}=await duel(lobby);
 const first=await lobby.state(a.activity_token,{x:99,z:99});
 assert.equal(first.map,'arena');assert.deepEqual(first.position,{x:1,y:0,z:1});assert.equal(first.duel.venue,'arena');assert.equal(first.duel.readyAt-first.duel.startsAt,19000);
});
test('without an Axis venue every duel is in Grancel',async()=>{
 let now=0;const lobby=createActivityLobby({grid,now:()=>now,random:()=>0,resolveCharacter:async()=>'Estelle',arena:venue([{x:1,y:0,z:1},{x:8,y:0,z:1}],0)});
 const {a}=await duel(lobby);assert.equal((await lobby.state(a.activity_token,{x:99,z:99})).map,'arena');
});
test('Axis intro: far shot of the tower, both entrances, a fast orbit, then the fight',async()=>{
 const {duelPhase,axisOrbit}=await import('../activity/duel-intro.mjs');const d={startsAt:0,readyAt:16300,venue:'axis'};
 assert.deepEqual([0,4000,5000,9000,12000,15800].map(t=>duelPhase(d,t).kind),['tower','tower','fighter','fighter','orbit','begin']);
 assert.equal(duelPhase(d,5000).side,0);assert.equal(duelPhase(d,9000).side,1);assert.equal(duelPhase(d,16300),null);
 assert.equal(duelPhase({startsAt:0,readyAt:19000},500).kind,'overview');
 const end=axisOrbit({x:0,y:0,z:0},{x:0,y:0,z:-9.5},{x:0,y:0,z:9.5},1);assert.ok(Math.abs(end.position.z)<1e-9&&Math.abs(end.position.x)===14);
});
