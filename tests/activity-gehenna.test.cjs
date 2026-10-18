const {test}=require('node:test'),assert=require('node:assert/strict');
const grid=require('../activity/assets/sky/gehenna/navigation.json');
const {createActivityGeometry}=require('../utils/activityGeometry');
test('Gehenna uses the native m7309 floor, with connected opposing spawns and obstacle geometry',()=>{const g=JSON.parse(require('node:fs').readFileSync('activity/assets/sky/gehenna/anterose.gltf','utf8')),geometry=createActivityGeometry(g);for(const z of [-12,12]){const x=Math.round(-grid.origin.x/grid.step),row=Math.round((z-grid.origin.z)/grid.step);assert.equal(grid.cells[row*grid.width+x],0);assert.ok(Math.abs(geometry.floor(0,z,.8))<.01);}assert.ok(grid.cells.filter(x=>x!==null).length>4000);assert.ok(grid.cells.some(x=>x===null));});
test('online duels can select Gehenna and retain its spawns and introduction',async()=>{let time=0;const config={grid,residents:{npcs:[],disablePoms:true},spawns:[{x:0,y:0,z:-12},{x:0,y:0,z:12}],introDuration:16300};const lobby=require('../utils/activityLobby').createActivityLobby({...config,arena:config,axis:config,gehenna:config,random:()=>.9,now:()=>time,resolveCharacter:async()=>'Rean'});const a=await lobby.join({id:'a',channel:'x'});await lobby.join({id:'b',channel:'x'});lobby.createDuel({id:'g',channel:'x',players:['a','b']});for(const id of ['a','b']){lobby.joinDuel('g',id);lobby.acceptDuel('g',id);}const state=await lobby.state(a.activity_token);assert.equal(state.map,'gehenna');assert.equal(state.duel.venue,'gehenna');assert.equal(state.duel.readyAt-state.duel.startsAt,16300);assert.equal(state.position.z,-12);});

test('both Gehenna staircases reach their upper landings, and Altina can jump freely',async()=>{
 const {createActivityService}=require('../utils/activityService'),geometry=createActivityGeometry(JSON.parse(require('node:fs').readFileSync('activity/assets/sky/gehenna/anterose.gltf','utf8')));let time=1000;
 const service=createActivityService({grid,geometry,now:()=>time,spawnFor:()=>({x:0,y:0,z:19}),resolveCharacter:async()=>'Altina',jumpEnabled:true,combatEnabled:true,residents:{npcs:[],disablePoms:true}});
 const session=await service.join({id:'altina',channel:'stairs'});await service.state(session.activity_token);
 let result;for(let z=19.25;z<=58;z+=.25){time+=150;result=await service.state(session.activity_token,{x:0,z});assert.ok(Math.abs(result.position.z-z)<.01,'stopped at '+z);}
 assert.ok(result.position.y>3);for(let z=57.75;z>=19;z-=.25){time+=150;result=await service.state(session.activity_token,{x:0,z});assert.ok(Math.abs(result.position.z-z)<.01,'descent stopped at '+z);}
 time+=150;result=await service.state(session.activity_token,{x:0,z:19,action:{id:'jump',type:'jump',origin:result.position,direction:{dx:0,dz:0}}});assert.ok(result.health.jump);
 time+=400;result=await service.state(session.activity_token);assert.ok(result.position.y>1);
});
