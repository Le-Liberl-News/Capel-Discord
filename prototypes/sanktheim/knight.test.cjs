const test=require('node:test'),assert=require('node:assert/strict');
const {createKnight,HP,PATH_TIME,GATE_SHARE,GATE_TIME}=require('./knight.cjs'),{along}=require('./mechapom.cjs'),fling=require('./knight-fling.cjs');
function fixture({number=3,progress=0}={}){
 const gate={id:'gate',name:'Porte renforcée',hp:2500000,maxHP:2500000,z:0,width:4};
 const state={at:0,wave:{id:'wave-test',number,started:0,ends:600000},enemies:[],shells:[],counts:{total:0},soldiers:[{id:'soldier-1',hp:3000,maxHP:3000,x:0,y:0,z:0}],players:{},walls:[gate],barricades:[],turrets:[],mines:[],mechapom:{grounded:true,progress,x:along(progress).x,z:along(progress).z}},events=[],killed=[];
 const knight=createKnight({state,hash:()=>0,emit:(type,text,data)=>events.push({type,text,...data}),geometry:()=>null,damageWall:(w,d)=>{w.hp-=d;},hurt:(a,d)=>{a.hp-=d;},kill:a=>killed.push(a.id),speech:()=>{},wallX:()=>-33.5});
 return {state,knight,events,killed,gate,run(until,dt=.25){while(state.at<until){state.at+=dt*1000;knight.update(dt,[{character:'Estelle'}]);}},get e(){return state.enemies.find(e=>e.knight);}};
}
test('every third wave, a 50 000 HP pom knight comes down from the fortress, announced once; never in the others',()=>{
 const f=fixture();f.run(11000);assert.equal(f.e,undefined);f.run(13000);assert.equal(f.e.maxHP,HP);assert.equal(HP,50000);assert.equal(f.events.filter(e=>e.type==='knight-arrival').length,1);
 const other=fixture({number:4});other.run(60000);assert.equal(other.e,undefined);
});
test('left alone, it walks the whole path in about eight minutes, then strikes the gate: a tenth of it in two minutes',()=>{
 const f=fixture();f.run(12250);const start=f.state.at;let arrived=null;
 while(f.state.at<start+PATH_TIME+30000&&!f.e.atGate){f.run(f.state.at+1000);}arrived=f.state.at-start;
 assert.ok(f.e.atGate);assert.ok(arrived>PATH_TIME-30000&&arrived<PATH_TIME+30000,'arrived after '+arrived);
 const before=f.gate.hp;f.run(f.state.at+GATE_TIME);const share=(before-f.gate.hp)/f.gate.maxHP;assert.ok(Math.abs(share-GATE_SHARE)<.01,'took '+share);
});
test('nearer the gate, the fortress lets it arrive sooner',()=>{const f=fixture({progress:.5});f.run(12250);const start=f.state.at;while(!f.e.atGate&&f.state.at<start+PATH_TIME)f.run(f.state.at+1000);assert.ok(f.state.at-start<PATH_TIME*.6);});
test('it smashes the barricades and turrets in its way, each holding it up a moment',()=>{
 const f=fixture();f.run(12250);const e=f.e;e.pauseUntil=0;const p=along(e.routeK+.02);
 f.state.barricades.push({id:'barricade-1',hp:5,maxHP:5,x:p.x,y:0,z:p.z});f.state.turrets.push({id:'turret-1',type:'auto',hp:700,maxHP:700,x:along(e.routeK+.04).x,y:0,z:along(e.routeK+.04).z});
 const walkUntil=t=>{while(f.state.at<t)f.run(f.state.at+250);};walkUntil(f.state.at+40000);
 assert.equal(f.state.barricades[0].hp,0);assert.equal(f.state.turrets[0].hp,0);assert.deepEqual(f.killed,['barricade-1','turret-1']);
 assert.equal(f.events.filter(ev=>ev.type==='knight-smash').length,2);
});
test('a defender in its way loses half their health and is flung far, spinning; the guards are left alone',()=>{
 const f=fixture();f.run(12250);const e=f.e;e.pauseUntil=0;
 const p=f.state.players.a={id:'a',online:true,hp:1200,maxHP:1200,x:e.x+1.5,y:e.y,z:e.z};Object.assign(f.state.soldiers[0],{x:e.x-1,z:e.z});
 f.run(f.state.at+250);assert.equal(p.hp,600);assert.ok(p.knightFling);assert.equal(f.state.soldiers[0].hp,3000);
 const from=p.knightFling.from;f.run(f.state.at+fling.FLIGHT/2);assert.ok(p.y>from.y+3);
 f.run(f.state.at+fling.FLIGHT);assert.equal(p.knightFling,null);assert.ok(Math.hypot(p.x-from.x,p.z-from.z)>fling.DISTANCE-1);assert.equal(p.hp,600);
});
