const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),Module=require('node:module'),path=require('node:path');
const {protectWithGuardian,TEST_CHARACTERS}=require('../activity/cs2-test-characters.cjs'),{applyDamage}=require('../utils/activityDamage'),{createTestCharacters}=require('../utils/activityTestCharacters');
test('CS2 prototypes exist in the Capel test catalogue, remain selectable, and do not enter the Discord draw',()=>{
 const fields=require('../activity/assets/sky/characters.json'),daily=require('../rpg/data/persos.json'),combat=require('../activity/native-combat.cjs');
 const choices=createTestCharacters({characters:fields,expires:0,permanent:TEST_CHARACTERS});
 assert.deepEqual(choices.menu('user').characters,TEST_CHARACTERS);
 for(const name of TEST_CHARACTERS){assert.ok(fs.existsSync('activity/assets/sky/'+fields[name].texture));assert.equal(daily[name],undefined);assert.ok(combat.combatSpec(name,'basic'));assert.equal(combat.combatSpec(name,'craft').special,name==='Rean'?'flameSlash':name==='Altina'?'altinaSword':'daybreak');choices.set('user',name);}
});
test('a nearby living guardian takes damage, and a defeated or distant guardian cannot protect',()=>{
 const owner={id:'altina',hp:500,x:0,y:0,z:0},pet={id:'pet',hp:100,x:1,y:0,z:0,guardianFor:'altina'};protectWithGuardian(owner,pet);
 assert.equal(JSON.stringify(owner).includes('_guardian'),false);assert.equal(applyDamage(owner,40,1000).guardedBy,'pet');assert.equal(owner.hp,500);assert.equal(pet.hp,60);
 pet.x=5;applyDamage(owner,40,1100);assert.equal(owner.hp,460);pet.x=1;pet.hp=0;applyDamage(owner,40,1200);assert.equal(owner.hp,420);
});
const code=require('esbuild').buildSync({entryPoints:['activity/training.mjs'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,m=new Module(path.resolve('activity/cs2-training-test.cjs'),module);m.filename=path.resolve('activity/cs2-training-test.cjs');m.paths=module.paths;m._compile(code,m.filename);
test('the Rean/Altina encounter has one group introduction, a damageable guardian and working ranged magic',()=>{
 let time=0;const grid={origin:{x:-25,z:-25},step:.5,width:101,height:101,cells:Array(10201).fill(0),spawn:{x:0,y:0,z:0}},encounter=require('../activity/assets/sky/combat/solo-encounters.json').groups.find(g=>g.id==='rean-altina');
 const game=m.exports.createTraining({grid,character:'Estelle',encounter,now:()=>time,random:()=>.3,ballSpawns:[]}),owner=[...game.players.values()].find(p=>p.character==='Altina'),pet=game.players.get(owner.id+':guardian');
 assert.equal(pet.guardianFor,owner.id);assert.equal(pet.maxHp,650);const state=game.tick(game.player);assert.equal(state.duel.groups.length,2);assert.equal(state.duel.groups[1].name,'Rean et Altina');
 Object.assign(owner,{x:0,z:0});Object.assign(pet,{x:1,z:1});Object.assign(game.player,{x:0,z:6,hp:5000,maxHp:5000});let magic=false,guardianEngaged=false,guardianStruck=false;
 for(let i=0;i<500;i++){time+=50;const state=game.tick(game.player);magic ||= state.combat.attacks.some(a=>a.character==='Altina'&&a.kind==='basic');guardianEngaged ||= Math.hypot(pet.x-game.player.x,pet.z-game.player.z)<2.8;guardianStruck ||= game.world.cooldownsFor(pet.id).basic>0;assert.doesNotThrow(()=>JSON.stringify(state));}
 assert.ok(magic);assert.ok(guardianEngaged,'guardian engages at melee range');assert.ok(guardianStruck,'guardian strikes in melee');owner.hp=0;time+=50;game.tick(game.player);assert.equal(pet.hp,0);
});
