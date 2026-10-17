const test=require('node:test'),assert=require('node:assert/strict'),Module=require('node:module'),path=require('node:path');
const output=require('esbuild').buildSync({entryPoints:['activity/training.mjs'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text;
const mod=new Module(path.resolve('activity/training-test.cjs'),module);mod.filename=path.resolve('activity/training-test.cjs');mod.paths=module.paths;mod._compile(output,mod.filename);const {createTraining}=mod.exports;
const grid={origin:{x:-25,z:-25},step:.5,width:101,height:101,cells:Array(10201).fill(0),spawn:{x:0,y:0,z:0}};
const combat=require('../activity/native-combat.cjs');
function setup(opponent,options={}){let time=0;const game=createTraining({grid,character:'Estelle',opponent,now:()=>time,random:()=>.3,...options});return {game,step:(ms=50,command)=>{time+=ms;return game.tick(game.player,command);}};}
test('AI handles every available combat character without network or shared state',()=>{for(const opponent of Object.keys(combat.COMBAT)){const {game,step}=setup(opponent);for(let i=0;i<240;i++)step();assert.ok(game.ai.hp>=0,opponent);assert.ok(Number.isFinite(game.ai.x),opponent);const other=setup(opponent);assert.equal(other.game.player.hp,500);assert.notEqual(other.game.world,game.world);}});
test('AI uses an offensive craft and a basic strike at valid range',()=>{const {game,step}=setup('Walter',{ballSpawns:[]});Object.assign(game.ai,{x:game.player.x+1,y:0,z:game.player.z});for(let i=0;i<250;i++)step();const events=game.player.damageEvents??[];assert.ok(events.length>4);assert.ok(game.world.cooldownsFor(game.ai.id).craft);assert.ok(game.world.cooldownsFor(game.ai.id).basic);assert.ok(game.player.hp<500);});
test('AI heals itself when hurt',()=>{const {game,step}=setup('Kloe');game.ai.hp=200;Object.assign(game.ai,{x:game.player.x+5,y:0,z:game.player.z});for(let i=0;i<50;i++)step();assert.ok(game.ai.hp>200);assert.ok(game.world.cooldownsFor(game.ai.id).art);});
test('AI retrieves a Pom, throws toward the player and inflicts the same 40 damage',()=>{const {game,step}=setup('Walter',{ballChance:1});Object.assign(game.ai,{x:-3,y:0,z:2});Object.assign(game.player,{x:5,y:0,z:2});let thrown=false;for(let i=0;i<60;i++){const state=step();thrown ||= state.poms.some(p=>p.thrownBy===game.ai.id);}assert.ok(thrown);assert.ok(game.player.damageEvents?.some(e=>e.amount===40));});
test('Local match ends without respawning and accepts chat locally',()=>{const {game,step}=setup('Joshua');game.ai.hp=0;let result=step();assert.equal(result.finish.winner,'Estelle');result=step(20000,{id:'chat',type:'say',text:'Salut'});assert.equal(result.health.canMove,false);assert.equal(game.ai.hp,0);assert.equal(result.messages[0].text,'Salut');});

test('Julia completes a closed triangle and Campanella detonates before the long cooldown expires',()=>{const julia=setup('Julia',{ballSpawns:[]});Object.assign(julia.game.ai,{x:julia.game.player.x-5,y:0,z:julia.game.player.z});let closed=false;for(let i=0;i<120;i++){const state=julia.step();closed ||= state.combat.attacks.some(a=>a.actor===julia.game.ai.id&&a.closed);}assert.ok(closed);const camp=setup('Campanella',{ballSpawns:[]});Object.assign(camp.game.ai,{x:camp.game.player.x-5,y:0,z:camp.game.player.z});let exploded=false;for(let i=0;i<100;i++){const state=camp.step();exploded ||= state.combat.attacks.some(a=>a.special==='spire'&&a.explodedAt);}assert.ok(exploded);});

test("Training introductions use server titles, label the opponent as AI and prevent early attacks",()=>{const {game,step}=setup("Walter",{introDuration:19000,titles:{Estelle:"Bracère",Walter:"Le Loup"}});const state=step(1000,{id:"early",type:"attack",kind:"basic",aim:game.ai});assert.equal(state.health.canMove,false);assert.equal(state.duel.names[1],"Walter (IA)");assert.deepEqual(state.duel.titles,["Bracère","Le Loup"]);assert.equal(state.combat.attacks.length,0);assert.equal(step(19000).health.canMove,true);});
test('An AI carrying Antoine prioritizes retrieving a Pom and ricocheting it onto itself',()=>{const {game,step}=setup('Walter',{character:'Antoine',ballSpawns:[{x:23,y:.9,z:0}]});Object.assign(game.player,{x:22,y:0,z:0});Object.assign(game.ai,{x:23,y:0,z:0,attackBusyUntil:1000});step(50,{id:'cat-jump',type:'attack',kind:'craft',aim:{x:23,y:0,z:0}});step(350);assert.ok(game.player.catCling);let threw=false;for(let i=0;i<200&&game.player.catCling;i++){const state=step();threw ||=state.poms.some(p=>p.thrownBy===game.ai.id);}assert.ok(threw);assert.equal(game.player.catCling,undefined);assert.ok(game.ai.damageEvents?.some(e=>e.pom));assert.equal(game.player.hp,500);});
test('A human-like AI hesitates before a ready strike and an AI with crafts rarely goes for the Poms',()=>{
 const near=setup('Walter',{ballSpawns:[]});Object.assign(near.game.ai,{x:near.game.player.x+1,y:0,z:near.game.player.z});
 for(let i=0;i<10;i++)near.step();assert.equal((near.game.player.damageEvents??[]).length,0);
 let seed=7;const random=()=>(seed=(seed*16807)%2147483647)/2147483647;
 const {game,step}=setup('Walter',{random});let pickups=0,held=false;
 for(let i=0;i<1200;i++){const state=step();const now=state.poms.some(p=>p.owner===game.ai.id);if(now&&!held)pickups++;held=now;}
 assert.ok(pickups<=2,'pickups '+pickups);
});


test('training rejects walking while guard is held, but accepts turning the guard',()=>{
 const {game,step}=setup('Walter',{ballSpawns:[]});step(1000,{id:'guard',type:'parry',phase:'begin',direction:{x:1,z:0}});
 const before={x:game.player.x,y:game.player.y,z:game.player.z},parryAt=game.player.parry.at;
 const state=game.tick({...game.player,x:game.player.x+2,heading:{dx:0,dz:1}});
 assert.deepEqual(state.position,before);assert.equal(state.health.movementFactor,0);assert.equal(game.player.guardHold.dz,1);assert.equal(game.player.parry.at,parryAt);
 step(100,{id:'release',type:'parry',phase:'end'});assert.equal(game.player.guardHold,null);
});

test('team encounters share combat, protect allies and finish only after an entire side loses',()=>{
 const {game,step}=setup(null,{encounter:{name:'Le duo',allies:['Joshua'],enemies:['Walter','Loewe']},ballSpawns:[]});
 assert.equal(game.players.size,4);const intro=step(1).duel;assert.deepEqual(intro.groups.map(g=>g.players.length),[2,2]);
 game.ai.hp=0;assert.equal(step().finish,null);game.players.get('training:ai:1').hp=0;assert.equal(step().finish.text,'Victoire de votre équipe');
 const second=setup(null,{encounter:{name:'Adversaires',allies:['Joshua'],enemies:['Walter']},ballSpawns:[]});second.game.player.hp=0;assert.equal(second.step().finish,null);second.game.players.get('training:ally:0').hp=0;assert.equal(second.step().finish.text,'Défaite de votre équipe');
});
test('allied AIs fight with distinct action IDs and never hurt their own team',()=>{
 const {game,step}=setup(null,{encounter:{name:'Duo',allies:['Walter'],enemies:['Joshua','Mueller']},ballSpawns:[]});
 for(const p of game.players.values()){p.x=p.teamId==='blue'?0:1;p.y=0;p.z=0;p.hp=p.maxHp=5000;}
 const actors=new Set();for(let i=0;i<200;i++)for(const a of step().combat.attacks)actors.add(a.actor);
 assert.ok(actors.has('training:ally:0'));assert.ok(actors.has('training:ai'));assert.ok(actors.has('training:ai:1'));
 const ally=game.players.get('training:ally:0');ally.hp=500;for(const p of game.players.values())if(p.teamId==='red')Object.assign(p,{x:20,z:20});game.world.action(game.player,{id:'friendly-test',type:'attack',kind:'basic',aim:ally,target:ally.id},game.players);step(1500);assert.equal(ally.hp,500);
});
test('monster groups use native enemy sprites, combat and permanent deaths',()=>{
 const {game,step}=setup(null,{character:'Loewe',encounter:{name:'Les monstres',allies:[],enemies:[{monster:true,character:'Mishy'},{monster:true,character:'MishyArdent'}]},ballSpawns:[]});
 let s=step(1);assert.deepEqual(s.enemies.map(e=>e.character),['Mishy','MishyArdent']);assert.equal(s.duel.groups[1].players.length,2);assert.ok(s.enemies.every(e=>e.teamId==='red'));assert.ok(game.characters.includes('Mishy'));
 const target=s.enemies[0];Object.assign(game.player,{x:target.x,y:target.y,z:target.z+1,hp:50000});
 game.world.action(game.player,{id:'monster-hit-1',type:'attack',kind:'craft',aim:game.player},game.players);step(600);
 game.world.action(game.player,{id:'monster-hit-2',type:'attack',kind:'craft',aim:game.player},game.players);step(7000);
 game.world.action(game.player,{id:'monster-hit-3',type:'attack',kind:'craft',aim:game.player},game.players);step(600);
 assert.ok(game.world.snapshot().enemies.some(e=>e.hp===0));step(40000);game.world.tick(game.players);assert.ok(game.world.snapshot().enemies.some(e=>e.hp===0));
});

test('intro clock starts again after preparation rather than consuming the loading time',()=>{const {game,step}=setup('Walter',{introDuration:19000,ballSpawns:[]});step(10000);game.beginIntro();assert.equal(step(10000).health.canMove,false);assert.equal(step(9000).health.canMove,true);});
test('monster projectiles pass through their own team and damage only opponents',()=>{let clock=0;const {createDungeonFire}=require('../utils/activityDungeonFire'),source={id:'monster',teamId:'red',x:0,y:0,z:0,hp:75},ally={id:'ally',teamId:'red',x:2,y:0,z:0,hp:75},foe={id:'foe',teamId:'blue',x:4,y:0,z:0,hp:500},room=new Map([source,ally,foe].map(p=>[p.id,p])),fire=createDungeonFire({now:()=>clock,canDamage:(a,b)=>a.teamId!==b.teamId});fire.launch({x:0,y:.7,z:0},{x:1,y:0,z:0},{speed:10,damage:8,source:source.id});clock=500;fire.tick(room);assert.equal(ally.hp,75);assert.equal(foe.hp,492);});
