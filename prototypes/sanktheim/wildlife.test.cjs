const test=require('node:test'),assert=require('node:assert/strict');
const {createSiege,civil}=require('./core.cjs'),{hunger,STARVING,DAY,DENS}=require('./wildlife.cjs');
const {interact}=require('./dialogue.cjs');
function fixture(){let at=civil('2026-10-24',14);const s=createSiege({now:()=>at,cohort:()=>[{character:'Estelle',stage:1}]});s.start();s.advance(at+=1000);s.join('player-h','Julia','Julia');
 const p=s._state.players['player-h'];
 // a player standing somewhere, kept online
 const go=(ms,where)=>{for(let left=ms;left>0;left-=250){if(where)Object.assign(p,where);Object.assign(p,{online:true,lastSeen:at,arenaControlled:true});s.advance(at+=Math.min(250,left));}};
 return {s,p,go,get at(){return at;}};}

test('six wild pomgarous roam their wood and maul whoever comes close',()=>{const f=fixture();f.go(500);const wild=f.s.snapshot().wild;assert.equal(wild.length,6);assert.ok(!f.s._state.enemies.some(e=>e.wild));assert.ok(wild.every(e=>e.kind==='garou'&&e.pomCharacter==='sauvage'));
 const hp=f.p.hp;f.go(15000,{x:DENS[0][0]+1,z:DENS[0][1],y:.04});assert.ok(f.p.hp<hp);assert.ok(f.s._state.events.some(e=>e.type==='cleave'&&e.from.startsWith('pom-wild-')));});

test('they leave whoever is far from their den alone, and the server idles when nobody is there',()=>{const f=fixture();const hp=f.p.hp;f.go(10000,{x:-40,z:0,y:.04});assert.equal(f.p.hp,hp);});

test('a wild pomgarou killed gives its hunter a piece of meat; it comes back after the wave',()=>{const f=fixture();f.go(500);const e=f.s._state.wild.garous[0];e.hp=0;f.s.registerDamage({actor:'player-h',target:e,amount:50,lethal:true});f.go(500);
 const alive=()=>f.s.snapshot().wild.length;assert.equal(f.p.meat,1);assert.equal(alive(),5);
 f.s.testWave();f.go(1000);assert.equal(alive(),5);   // not before the wave's end
 f.go(11*60000);assert.equal(f.s._state.wave,null);f.go(500);assert.equal(alive(),6);assert.ok(f.s._state.wild.garous.every(g=>g.hitHeight===2.7&&g.hitRadius===.8));});

test('soldiers get hungry over a day, starve under 15 % and die of it a day later',()=>{
 // the wildlife alone: no skirmish to hurt the soldier meanwhile
 const {createWildlife}=require('./wildlife.cjs'),events=[],st={at:0,soldiers:[{id:'soldier-x',name:'Soldat X',hp:100,maxHP:100,hunger:100,hungerAt:0}],enemies:[],corpses:[],players:{}};
 const w=createWildlife({state:st,hash:()=>0,emit:(type,text)=>events.push({type,text}),hurt:()=>{},defenders:()=>[],garouHP:100}),s=st.soldiers[0],starving=(100-STARVING)/100*DAY;
 st.at=DAY/2;w.starve();assert.equal(Math.round(hunger(st,s)),50);assert.equal(s.hp,100);
 st.at=starving-60000;w.starve();assert.equal(s.hp,100);
 st.at=starving+DAY*.6;w.starve();assert.ok(Math.abs(s.hp-40)<.5);   // losing health as it starves
 st.at=starving+DAY+1;w.starve();assert.equal(s.hp,0);assert.deepEqual(events.at(-1),{type:'soldier-death',text:'Soldat X est mort de faim.'});
});
test('a defender with meat feeds a hungry soldier by talking to them, and it stops their starving',()=>{const f=fixture();const st=f.s._state,s=st.soldiers.find(s=>s.hp>0&&!s.sleeping)??st.soldiers[0];s.sleeping=false;s.hunger=10;s.hungerAt=st.at;
 Object.assign(f.p,{x:s.x+1,y:s.y,z:s.z,online:true,meat:1});
 let r=interact(st,f.p,s.id);assert.ok(r.fed);assert.equal(f.p.meat,0);assert.equal(Math.round(hunger(st,s)),60);
 st.at+=2000;r=interact(st,f.p,s.id);assert.ok(!r.fed);});   // no more meat: they just talk

test('existing wild pomgarous keep their health ratio when their maximum health is halved',()=>{const {createWildlife}=require('./wildlife.cjs'),state={at:1000,soldiers:[],corpses:[],wild:{garous:[{id:'pom-wild-0',wild:true,hp:150,maxHP:200}]}};const options={state,hash:()=>0,emit:()=>{},hurt:()=>{},defenders:()=>[],garouHP:100};createWildlife(options);assert.equal(state.wild.garous[0].maxHP,100);assert.equal(state.wild.garous[0].hp,75);createWildlife(options);assert.equal(state.wild.garous[0].hp,75);});
test('hunger relief restores only empty gauges, once, without resurrecting or healing soldiers',()=>{const {createWildlife}=require('./wildlife.cjs'),state={at:DAY,soldiers:[{id:'empty',hp:10,maxHP:100,hunger:100,hungerAt:0,starvingSince:10},{id:'fed',hp:100,maxHP:100,hunger:70,hungerAt:DAY}],corpses:[]};const options={state,hash:()=>0,emit:()=>{},hurt:()=>{},defenders:()=>[],garouHP:100};createWildlife(options);assert.equal(hunger(state,state.soldiers[0]),50);assert.equal(state.soldiers[0].hp,10);assert.equal(state.soldiers[0].starvingSince,null);assert.equal(hunger(state,state.soldiers[1]),70);state.at+=DAY;createWildlife(options);assert.equal(hunger(state,state.soldiers[0]),0);});
