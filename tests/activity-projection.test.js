const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {combatSpec,COMBAT}=require('../activity/native-combat.cjs');
const {projectionPosition}=require('../activity/combat-projection.cjs');
const grid={origin:{x:-20,z:-20},step:1,width:41,height:41,cells:Array(1681).fill(0)};
function fixture(character,{wall,ally=false}={}){let time=0;const actor={id:'a',character,x:0,y:0,z:0,hp:100},target={id:'b',character:'Joshua',x:0,y:0,z:2,hp:100},room=new Map([['a',actor],['b',target]]),events=[];
 const geometry=wall?{floor:()=>0,sweep:(from,to)=>from.z<wall&&to.z>=wall?{point:{x:to.x,y:to.y,z:wall},distance:wall-from.z}:null}:null;
 const combat=createActivityCombat({grid,geometry,now:()=>time,canDamage:()=>!ally,onDefeat:e=>events.push(e)});
 return {actor,target,room,combat,events,tick(t){time=t;combat.tick(room);},start(kind,aim={x:0,y:0,z:12}){return combat.action(actor,{id:'attack',kind,aim},room);}};}
test('Josette mouse horizontal look follows the requested left/right convention',async()=>{const {fpsMouseLook}=await import('../activity/josette-view.mjs');assert.ok(fpsMouseLook(0,0,-20,0).yaw<0);assert.ok(fpsMouseLook(0,0,20,0).yaw>0);assert.equal(fpsMouseLook(0,0,0,10000).pitch,1.48);});
test('Luciola uses AS16 bank12, launches after the movement, hits once along its flight and pushes outward',()=>{
 assert.equal(COMBAT.Luciola.source.craftSlot,16);assert.ok(COMBAT.Luciola.sequences.craft.every(f=>f.bank===12));
 const f=fixture('Luciola'),spec=combatSpec('Luciola','craft');f.target.x=.7;f.target.z=4;
 assert.ok(f.start('craft').combatId);f.tick(spec.windup-1);assert.equal(f.target.hp,100);
 f.tick(spec.windup+500);assert.equal(f.target.hp,100);f.tick(spec.windup+800);assert.equal(f.target.hp,70);assert.ok(f.target.knockback.end.x>f.target.x);
 f.tick(spec.windup+2000);assert.equal(f.target.hp,70);assert.equal(f.target.knockback,null);
 const ally=fixture('Luciola',{ally:true});ally.start('craft');ally.tick(3000);assert.equal(ally.target.hp,100);
});
test('Walter lands four separate punches and melee kick cannot hit a distant target',()=>{const f=fixture('Walter'),s=combatSpec('Walter','basic');assert.ok(f.start('basic').combatId);for(let i=0;i<4;i++){f.tick(s.windup+s.hitOffsets[i]);assert.equal(f.target.hp,100-(i+1)*6);}assert.equal(f.target.damageEvents.length,4);
 const far=fixture('Walter');far.target.z=5;far.start('craft');far.tick(1000);assert.equal(far.target.hp,100);assert.equal(far.target.knockback,undefined);
 assert.ok(COMBAT.Walter.sequences.craft.every(f=>f.bank===12));
});
test('Walter projection stops at the first wall, damages and immobilizes one second after impact',()=>{const f=fixture('Walter',{wall:6}),s=combatSpec('Walter','craft');f.start('craft',{x:0,y:0,z:2});f.tick(s.windup);assert.equal(f.target.hp,76);const p=f.target.knockback;assert.equal(p.wall,true);assert.ok(p.end.z<6);f.tick(s.windup+450);assert.ok(f.target.z>2&&f.target.z<6);f.tick(s.windup+900);assert.equal(f.target.hp,60);assert.equal(f.target.knockback,null);assert.equal(f.target.stoneUntil,s.windup+1900);f.tick(s.windup+2000);assert.equal(f.target.hp,60);
});
test('Open-ground kick decelerates naturally without wall damage; protection blocks the projection',()=>{const f=fixture('Walter'),s=combatSpec('Walter','craft');f.start('craft',{x:0,y:0,z:2});f.tick(s.windup);const p=f.target.knockback;assert.equal(p.wall,false);const mid=projectionPosition(p,p.started+p.duration/2);assert.ok(mid.z>7);f.tick(p.started+p.duration);assert.equal(f.target.hp,76);assert.equal(f.target.z,12);assert.equal(f.target.stoneUntil,undefined);
 const guard=fixture('Walter');guard.target.guard={until:9999};guard.start('craft');guard.tick(1000);assert.equal(guard.target.hp,100);assert.equal(guard.target.knockback,undefined);
});
test('Lethal wall impact reports the defeat and cannot hit twice',()=>{const f=fixture('Walter',{wall:6});f.target.hp=30;f.start('craft',{x:0,y:0,z:2});f.tick(240);f.tick(1140);assert.equal(f.target.hp,0);assert.equal(f.events.length,1);f.tick(3000);assert.equal(f.events.length,1);});


test('Arc Fencer follows the caster during both its hits rather than leaving damage at the initial origin',()=>{
 const f=fixture('Ries'),s=combatSpec('Ries','craft');f.target.x=3;f.target.z=4;f.start('craft',{x:0,y:0,z:9});f.actor.x=3;f.tick(s.windup);assert.equal(f.target.hp,82);assert.equal(f.combat.snapshot().attacks[0].origin.x,3);f.tick(s.windup+s.hitOffsets[1]);assert.equal(f.target.hp,64);
});

test('Luciola fan attack retains every AS5 pose and each bank has eight directions',()=>{
 const c=COMBAT.Luciola;assert.ok(c.sequences.basic.some(f=>f.pose===15));assert.ok(c.sequences.basic.every(f=>c.banks[f.bank].directions===8));assert.equal(combatSpec('Luciola','craft').shape,'line');
});
