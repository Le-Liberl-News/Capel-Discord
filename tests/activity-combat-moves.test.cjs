const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {combatSpec}=require('../activity/native-combat.cjs');
const moves=require('../activity/combat-moves.cjs');
const grid={origin:{x:-10,z:-10},step:.25,width:81,height:81,cells:Array(81*81).fill(0)};
const fighter=(id,character,x,z=0)=>({id,character,x,y:0,z,hp:500,maxHp:500,heading:{dx:1,dz:0}});
function arena(...fighters){let time=1000;const room=new Map(fighters.map(f=>[f.id,f])),combat=createActivityCombat({grid,now:()=>time});return {room,combat,at:t=>{time=t;},step(ms){const end=time+ms;while(time<end){time=Math.min(end,time+20);combat.tick(room);}},time:()=>time};}

test('the art key dodges for everyone except Kloe, who keeps her healing art',()=>{
 for(const name of ['Joshua','Estelle','Walter','Renne','Nial'])assert.equal(combatSpec(name,'art')?.dodge,true,name);
 assert.equal(combatSpec('Kloe','art').effect,'heal');
});

test('a dodge dashes about two metres along the movement direction, then waits three and a half seconds',()=>{
 const a=fighter('a','Joshua',0),{room,combat,step}=arena(a);
 assert.ok(combat.action(a,{id:'d1',type:'attack',kind:'art',direction:{x:0,z:1}},room).combatId);
 step(moves.DODGE.dashDuration+40);
 assert.ok(Math.abs(a.x)<.01&&a.z>1.7&&a.z<2.1,`landed at ${a.x},${a.z}`);
 assert.match(combat.action(a,{id:'d2',type:'attack',kind:'art',direction:{x:1,z:0}},room).error,/récupération/);
 step(moves.DODGE.cooldown);assert.ok(combat.action(a,{id:'d3',type:'attack',kind:'art',direction:{x:1,z:0}},room).combatId);
});

test('a dodge stops at the edge of the walkable area and is refused during a craft',()=>{
 const a=fighter('a','Joshua',9),{room,combat,step}=arena(a);
 combat.action(a,{id:'edge',type:'attack',kind:'art',direction:{x:1,z:0}},room);step(400);assert.ok(a.x<=10.01&&a.x>9.4,`x ${a.x}`);
 const b=fighter('b','Walter',0),c=fighter('c','Joshua',3),{room:r2,combat:c2}=arena(b,c);
 assert.ok(c2.action(b,{id:'craft',type:'attack',kind:'craft',aim:{x:3,y:0,z:0}},r2).combatId);
 assert.match(c2.action(b,{id:'dodge',type:'attack',kind:'art',direction:{x:-1,z:0}},r2).error,/craft/);
});

test('a parry timed on the impact blocks the craft and counters its caster, pushing them back',()=>{
 const a=fighter('a','Walter',0),b=fighter('b','Joshua',2),{room,combat,step}=arena(a,b);
 const spec=combatSpec('Walter','craft');
 combat.action(a,{id:'kick',type:'attack',kind:'craft',aim:{x:2,y:0,z:0}},room);
 step(spec.windup-100);assert.ok(combat.parry(b,room).parry);
 step(400);
 assert.equal(b.hp,500,'the craft is blocked');
 assert.equal(a.hp,500-moves.PARRY.counterDamage);
 assert.ok(a.damageEvents.at(-1).parry&&a.damageEvents.at(-1).nativeEffect===moves.PARRY.effect);
 assert.ok(a.x<-1.5,`pushed back to ${a.x}`);
 const kick=combat.snapshot().attacks.find(x=>x.id==='kick');assert.ok(kick.cancelled&&kick.hits.some(h=>h.parried&&h.id==='b'));
});

test('a parry pressed too early fails, and the key cannot be spammed through the impact',()=>{
 const a=fighter('a','Walter',0),b=fighter('b','Joshua',2),{room,combat,step}=arena(a,b);
 assert.ok(combat.parry(b,room).parry);step(moves.PARRY.window+50);
 combat.action(a,{id:'kick',type:'attack',kind:'craft',aim:{x:2,y:0,z:0}},room);
 step(200);assert.match(combat.parry(b,room).error,/récupération/);
 step(700);assert.ok(b.hp<500,'the craft lands');assert.equal(a.hp,500);
});

test('basic attacks build a combo that speeds them up, and a miss resets it with its own effect',()=>{
 const a=fighter('a','Estelle',0),b=fighter('b','Joshua',1.5),{room,combat,step,time}=arena(a,b);
 const normal=combatSpec('Estelle','basic');
 for(let n=1;n<=3;n++){
  assert.ok(combat.action(a,{id:'hit'+n,type:'attack',kind:'basic',aim:{x:1.5,y:0,z:0}},room).combatId);
  const attack=combat.snapshot().attacks.find(x=>x.id==='hit'+n);
  assert.equal(attack.tempo??1,moves.comboFactor(n-1));
  step(Math.max(normal.cooldown,normal.duration)+20);
  assert.equal(moves.comboOf(a,time()),n);
  assert.equal(b.damageEvents.at(-1).combo,n);assert.equal(b.damageEvents.at(-1).nativeEffect,moves.COMBO.hitEffect);
 }
 assert.ok(moves.comboFactor(3)<1);
 combat.action(a,{id:'miss',type:'attack',kind:'basic',aim:{x:-1.5,y:0,z:0}},room);step(normal.duration+20);
 assert.equal(moves.comboOf(a,time()),0);assert.ok(combat.snapshot().attacks.find(x=>x.id==='miss').missed);
});

test('a guard facing a basic attack blocks it with a spark; from behind the hit lands',()=>{
 const a=fighter('a','Estelle',0),b=fighter('b','Joshua',1.5),{room,combat,step}=arena(a,b);
 b.heading={dx:-1,dz:0};assert.ok(combat.parry(b,room).parry);
 combat.action(a,{id:'front',type:'attack',kind:'basic',aim:{x:1.5,y:0,z:0}},room);step(300);
 assert.equal(b.hp,500);assert.ok(combat.snapshot().attacks.find(x=>x.id==='front').hits.some(h=>h.blocked&&h.id==='b'));
 assert.equal(a.combo,null,'a blocked hit breaks the combo');
 step(moves.PARRY.cooldown);b.heading={dx:1,dz:0};assert.ok(combat.parry(b,room).parry);
 combat.action(a,{id:'back',type:'attack',kind:'basic',aim:{x:1.5,y:0,z:0}},room);step(300);
 assert.ok(b.hp<500,'hit from behind lands');
});

test('the basic attack reaches full speed after three landed hits',()=>{
 assert.deepEqual([0,1,2,3,6].map(moves.comboFactor),[1,.8,.6,.4,.4]);
});

test('held guard blocks repeated frontal basics beyond the parry window, including all four Walter impacts',()=>{
 const a=fighter('a','Walter',0),b=fighter('b','Joshua',1.5),w=arena(a,b);
 w.combat.parry(b,w.room,{phase:'begin',direction:{x:-1,z:0}});
 for(let n=0;n<4;n++){
  w.combat.parry(b,w.room,{phase:'keep'});
  assert.ok(w.combat.action(a,{id:'punch'+n,kind:'basic',aim:{x:b.x,y:0,z:0}},w.room).combatId);
  w.step(Math.max(combatSpec('Walter','basic').cooldown,combatSpec('Walter','basic').duration)+20);
 }
 assert.equal(b.hp,500);assert.ok(w.combat.snapshot().attacks.some(a=>a.hits.filter(h=>h.blocked).length===4));
});

test('held guard allows rear attacks and stops immediately on release or after a lost connection',()=>{
 for(const mode of ['rear','release','expired']){
  const a=fighter('a','Estelle',0),b=fighter('b','Joshua',1.5),w=arena(a,b);
  w.combat.parry(b,w.room,{phase:'begin',direction:{x:mode==='rear'?1:-1,z:0}});
  if(mode==='release')w.combat.parry(b,w.room,{phase:'end'});
  if(mode==='expired')w.step(moves.PARRY.holdLease+1);
  w.combat.action(a,{id:mode,kind:'basic',aim:{x:b.x,y:0,z:0}},w.room);w.step(600);
  assert.ok(b.hp<500,mode);
 }
});

test('renewing a held guard never renews its timed craft parry',()=>{
 const a=fighter('a','Walter',0),b=fighter('b','Joshua',2),w=arena(a,b);
 w.combat.parry(b,w.room,{phase:'begin',direction:{x:-1,z:0}});
 for(let i=0;i<5;i++){w.step(400);w.combat.parry(b,w.room,{phase:'keep'});}
 w.combat.action(a,{id:'late-kick',kind:'craft',aim:{x:2,y:0,z:0}},w.room);w.step(700);
 assert.ok(b.hp<500);assert.equal(a.hp,500);
});

test('guard may be raised during parry cooldown, but cannot create another craft-counter window',()=>{
 const a=fighter('a','Estelle',0),b=fighter('b','Joshua',1.5),w=arena(a,b);
 w.combat.parry(b,w.room,{phase:'begin',direction:{x:-1,z:0}});w.step(400);w.combat.parry(b,w.room,{phase:'end'});
 assert.ok(w.combat.parry(b,w.room,{phase:'begin',direction:{x:-1,z:0}}).guarding);
 assert.equal(moves.parryActive(b,w.time()),false);
 w.combat.action(a,{id:'blocked-during-cooldown',kind:'basic',aim:{x:b.x,y:0,z:0}},w.room);w.step(600);assert.equal(b.hp,500);
});

test('held guard also blocks a frontal projectile but not one from behind or outside its cone',()=>{
 const b=fighter('b','Joshua',0),w=arena(b);w.combat.parry(b,w.room,{phase:'begin',direction:{x:1,z:0}});
 assert.equal(moves.blocksBasic(b,{x:10,z:0},w.time()),true);
 assert.equal(moves.blocksBasic(b,{x:-10,z:0},w.time()),false);
 assert.equal(moves.blocksBasic(b,{x:0,z:10},w.time()),false);
 b.stunUntil=w.time()+100;assert.equal(moves.blocksBasic(b,{x:10,z:0},w.time()),false);
});


test('a held guard blocks the actual ranged basic attack on its impact',()=>{
 const a=fighter('a','Olivier',0),b=fighter('b','Joshua',5),w=arena(a,b);
 w.combat.parry(b,w.room,{phase:'begin',direction:{x:-1,z:0}});
 assert.ok(w.combat.action(a,{id:'bullet',kind:'basic',aim:{x:5,y:0,z:0}},w.room).combatId);w.step(1200);
 assert.equal(b.hp,500);assert.ok(w.combat.snapshot().attacks.find(x=>x.id==='bullet').hits.some(h=>h.blocked));
});

test('the touch guard starts on press and ends on release or pointer cancellation, even during cooldown',async()=>{
 class Element{
  constructor(tag){this.tag=tag;this.children=[];this.dataset={};this.style={};this.listeners={};this.firstChild={nodeValue:''};}
  append(...children){this.children.push(...children);}addEventListener(type,fn){this.listeners[type]=fn;}
  setAttribute(){}toggleAttribute(){}remove(){}querySelector(tag){return this.children.find(c=>c.tag===tag);}
  setPointerCapture(id){this.pointer=id;}hasPointerCapture(id){return this.pointer===id;}releasePointerCapture(){this.pointer=null;this.listeners.lostpointercapture?.();}
  dispatch(type){this.listeners[type]?.({pointerId:1,clientX:0,clientY:0,preventDefault(){}});}
 }
 const previous=global.document,body=new Element('body');global.document={body,head:new Element('head'),createElement:tag=>new Element(tag)};
 try{
  const {createCombatControls}=await import('../activity/combat-controls.mjs'),calls=[],attacks=[],controls=createCombatControls(k=>attacks.push(k),()=>false,phase=>(calls.push(phase),true));
  const button=body.children[0].children.find(b=>b.dataset.kind==='parry');
  const update=()=>controls.update({arena:true,character:'Joshua',connected:true,alive:true,spectator:false,busy:false,health:{}});
  controls.started('parry','Joshua');update();assert.equal(button.disabled,false);
  button.dispatch('pointerdown');assert.deepEqual(calls,['begin']);button.dispatch('pointerup');assert.deepEqual(calls,['begin','end']);
  button.dispatch('pointerdown');button.dispatch('pointercancel');assert.deepEqual(calls,['begin','end','begin','end']);assert.deepEqual(attacks,[]);
  controls.dispose();
 }finally{global.document=previous;}
});


test('releasing a held guard stops basic blocking even inside its initial parry window',()=>{
 const b=fighter('b','Joshua',0),w=arena(b);w.combat.parry(b,w.room,{phase:'begin',direction:{x:1,z:0}});
 assert.ok(moves.blocksBasic(b,{x:1,z:0},w.time()));w.combat.parry(b,w.room,{phase:'end'});
 assert.equal(moves.blocksBasic(b,{x:1,z:0},w.time()),false);assert.ok(moves.parryActive(b,w.time()),'the separate craft-parry timing is preserved');
});


test('turning a held guard changes its blocking cone without reopening the craft parry',()=>{
 const b=fighter('b','Joshua',0),w=arena(b);w.combat.parry(b,w.room,{phase:'begin',direction:{x:1,z:0}});const at=b.parry.at;
 w.step(500);w.combat.parry(b,w.room,{phase:'keep',direction:{x:0,z:3}});
 assert.ok(moves.blocksBasic(b,{x:0,z:5},w.time()));assert.equal(moves.blocksBasic(b,{x:5,z:0},w.time()),false);
 assert.equal(b.parry.at,at);assert.equal(moves.parryActive(b,w.time()),false);assert.deepEqual(b.heading,{dx:0,dz:1});
 const status=require('../activity/combat-status.cjs');assert.equal(status.movementFactor(b,w.time()),0);
 w.combat.parry(b,w.room,{phase:'end'});assert.equal(status.movementFactor(b,w.time()),1);
});

test('camera-facing normal attacks aim straight ahead at every camera angle',()=>{
 const origin={x:3,y:-.3,z:7};
 for(const yaw of [0,Math.PI/2,Math.PI,-Math.PI/2,.7]){
  const h=moves.cameraFacing(yaw),aim=moves.forwardAim(origin,h,5);
  assert.ok(Math.abs(Math.hypot(aim.x-origin.x,aim.z-origin.z)-5)<1e-8);assert.equal(aim.y,origin.y);
  assert.ok(Math.abs((aim.x-origin.x)/5+Math.sin(yaw))<1e-8);assert.ok(Math.abs((aim.z-origin.z)/5-Math.cos(yaw))<1e-8);
 }
});


test('a forward ranged basic can hit a wall even when its full-range endpoint has no floor',()=>{
 const a=fighter('a','Olivier',0),combat=createActivityCombat({now:()=>1000,geometry:{floor:x=>x<3?0:null,sweep:(from,to)=>to.x>3?{point:{x:3,y:.85,z:0},distance:3}:null}});
 assert.ok(combat.action(a,{id:'wall-shot',kind:'basic',aim:{x:12,y:0,z:0}},new Map([['a',a]])).combatId);
});

test('left mouse press during right-button camera drag confirms a click without ending the drag',()=>{
 const source=require('fs').readFileSync('activity/sky-scene.mjs','utf8'),body=source.match(/function mouseChordDown\(event\)\{([\s\S]*?)\n  \}/)[1],drag={moved:false},clicks=[];
 const down=new Function('event','drag','click',body);let prevented=false;
 down({button:0,buttons:3,preventDefault(){prevented=true;}},drag,e=>clicks.push(e));assert.equal(clicks.length,1);assert.equal(drag.moved,true);assert.ok(prevented);
 down({button:2,buttons:2},drag,e=>clicks.push(e));assert.equal(clicks.length,1);
});


test('starting a right-button camera drag preserves compatibility mouse events for the second button',()=>{
 const source=require('fs').readFileSync('activity/sky-scene.mjs','utf8'),body=source.match(/function pointerdown\(event\) \{([\s\S]*?)\n  \}/)[1];
 let prevented=false;const down=new Function('event','connected','fpsActive','canvas','click','let drag;'+body+';return drag;');
 const drag=down({button:2,pointerId:1,pointerType:'mouse',clientX:5,clientY:6,preventDefault(){prevented=true;}},true,()=>false,{setPointerCapture(){}},()=>{});
 assert.equal(drag.id,1);assert.equal(prevented,false,'cancelling pointerdown would suppress the subsequent chorded mousedown');
});


test('camera-driven facing applies only in arenas and exploration dungeons',()=>{
 for(const map of ['arena','axis','tower1','tower2','tower3','tower4','custom'])assert.equal(moves.usesCombatFacing(map),true,map);
 for(const map of ['anterose','hangar','rolent','liberl'])assert.equal(moves.usesCombatFacing(map),false,map);
});

test('dash cooldown is three and a half seconds',()=>assert.equal(moves.DODGE.cooldown,3500));

test("Scherazard's whip binds the opponent she clicked, not one standing by, then pulls them to stand in front of her",()=>{
 const s=fighter('s','Scherazard',0),j=fighter('j','Joshua',6),k=fighter('k','Kloe',4,.5),{room,combat,step,time}=arena(s,j,k),spec=combatSpec('Scherazard','craft');
 assert.ok(combat.action(s,{id:'whip',type:'attack',kind:'craft',target:'j',aim:{x:6,y:0,z:0}},room).combatId);
 step(spec.windup+60);assert.ok(j.hp<500||j.slowUntil>time(),'caught');assert.ok(Math.abs(j.x-6)<.05,'held while bound');
 assert.match(combat.action(j,{id:'j1',type:'attack',kind:'basic',aim:{x:0,y:0,z:0}},room).error??'',/./);
 step(spec.bindDelay+spec.pullDuration+60);
 assert.ok(Math.abs(j.x-spec.pullStop)<.2&&Math.abs(j.z)<.05,`pulled to ${j.x},${j.z}`);
 assert.equal(k.hp,500);assert.equal(k.x,4);
});
