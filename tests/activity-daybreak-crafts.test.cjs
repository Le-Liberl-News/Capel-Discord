const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {combatSpec}=require('../activity/native-combat.cjs');
const {CRAFTS,motion,pose}=require('../activity/daybreak-crafts.cjs');
const grid={origin:{x:-20,z:-20},step:1,width:41,height:41,cells:Array(1681).fill(0),spawn:{x:0,y:0,z:0}};
function fixture(character,extra={}){
 let time=1000;const actor={id:'a',character,x:0,y:0,z:0,hp:500,team:'blue',heading:{dx:1,dz:0}},target={id:'e',character:'Estelle',x:character==='Elaine'?2:5,y:0,z:0,hp:500,team:'red'},room=new Map([['a',actor],['e',target]]);
 const combat=createActivityCombat({grid,now:()=>time,canDamage:(a,b)=>a.team!==b.team,...extra});
 return {actor,target,room,combat,cast:()=>combat.action(actor,{id:'craft',kind:'craft',target:'e',aim:{x:target.x,y:0,z:0}},room),tick(ms){time+=ms;combat.tick(room);},get time(){return time;}};
}
for(const name of Object.keys(CRAFTS)){
 test(`${name}: native poses, one synchronized hit, grounded landing and recovery`,()=>{
  const f=fixture(name),s=combatSpec(name,'craft');assert.equal(s.special,'daybreak');assert.ok(f.cast().combatId);
  f.tick(s.hitAt-1);assert.equal(f.target.hp,500);f.tick(1);assert.equal(f.target.hp,500-s.damage);assert.equal(f.actor.x,s.dash?7:0);assert.ok(Math.abs(f.actor.y)<1e-6);
  if(s.stun)assert.equal(f.target.stunUntil,f.time+s.stun);
  f.tick(s.duration);assert.equal(f.target.hp,500-(s.hitTimes?(s.hitTimes.length-1)*s.damage+s.finalDamage:s.damage));assert.equal(f.actor.combatLockedUntil<=f.time,true);
  assert.equal(s.stages.reduce((a,b)=>a+b.ms,0),s.duration);assert.equal(pose(name,0).bank,5);
  for(let t=0;t<s.duration+50;t+=17){const p=pose(name,t),stage=s.stages.find(s=>s.bank===p.bank);assert.ok(p.pose>=0&&p.pose<stage.frames);}
  assert.deepEqual(motion({character:name,origin:{x:0,y:0,z:0},aim:{x:5,y:0,z:0}},s.duration).position,{x:s.dash?7:0,y:0,z:0});
 });
 test(`${name}: cancellation on stun/death cannot damage an enemy`,()=>{
  for(const reason of ['stun','death']){const f=fixture(name);f.cast();f.tick(100);if(reason==='stun')f.actor.stunUntil=10000;else f.actor.hp=0;f.tick(20);assert.equal(f.target.hp,500);assert.equal(f.combat.snapshot().attacks[0].cancelled,true);assert.equal(f.actor.y,0);f.tick(5000);assert.equal(f.target.hp,500);}
 });
}
test('dash lines hit crossed opponents once, preserving allies and vertical separation',()=>{
 for(const name of ['Elaine','Shizuna']){const f=fixture(name),s=CRAFTS[name];f.room.set('cross',{id:'cross',x:1.5,y:0,z:.2,hp:100,team:'red'});f.room.set('ally',{id:'ally',x:2,y:0,z:0,hp:100,team:'blue'});f.room.set('high',{id:'high',x:2,y:4,z:0,hp:100,team:'red'});f.cast();f.tick(s.duration);assert.equal(f.room.get('cross').hp,100-((s.hitTimes.length-1)*s.damage+s.finalDamage));assert.equal(f.room.get('ally').hp,100);assert.equal(f.room.get('high').hp,100);}
});
test('craft paths reject gaps and walls instead of teleporting through them',()=>{
 for(const name of ['Shizuna']){
  const cells=[...grid.cells];for(let z=0;z<41;z++)cells[z*41+22]=null;
  const gap=fixture(name,{grid:{...grid,cells}});assert.ok(gap.cast().error);assert.equal(gap.actor.x,0);
  const wall=fixture(name,{geometry:{floor:()=>0,sweep:()=>({point:{x:1,y:.8,z:0}})}});assert.ok(wall.cast().error);assert.equal(wall.actor.x,0);
 }
});
test('a live parry cancels the Daybreak impact and counters the caster',()=>{
 const f=fixture('Elaine');f.cast();f.target.parry={at:1000+CRAFTS.Elaine.hitAt-10};f.tick(CRAFTS.Elaine.hitAt);assert.equal(f.target.hp,500);assert.ok(f.actor.hp<500);assert.equal(f.combat.snapshot().attacks[0].cancelled,true);
});
test('Van requires an enemy and shoots from his position, even across a floor gap',()=>{
 const f=fixture('Van'),s=CRAFTS.Van;
 assert.ok(f.combat.action(f.actor,{id:'invalid',kind:'craft',aim:{x:5,y:0,z:0}},f.room).error);
 const cells=[...grid.cells];for(let z=0;z<41;z++)cells[z*41+22]=null;
 const gap=fixture('Van',{grid:{...grid,cells}});assert.ok(gap.cast().combatId);gap.tick(s.hitAt);assert.equal(gap.target.hp,460);assert.equal(gap.actor.x,0);
 const wall=fixture('Van',{geometry:{floor:()=>0,sweep:()=>({point:{x:1,y:.8,z:0}})}});assert.ok(wall.cast().error);assert.equal(wall.target.hp,500);
});
test('Van follows his target until firing, then the target can dodge the released shot',()=>{
 const s=CRAFTS.Van,f=fixture('Van');f.cast();f.target.z=3;f.tick(s.fireAt);const shot=f.combat.snapshot().attacks[0];assert.equal(shot.aim.z,3);assert.equal(f.target.hp,500);f.target.z=6;f.tick(s.hitAt-s.fireAt);assert.equal(f.target.hp,500);assert.equal(f.actor.x,0);
 const dead=fixture('Van');dead.cast();dead.target.hp=0;dead.tick(s.fireAt);assert.equal(dead.combat.snapshot().attacks[0].cancelled,true);
});
test('Van cannot deal ranged damage through a newly intervening wall',()=>{
 let blocked=false;const f=fixture('Van',{geometry:{floor:()=>0,sweep:()=>blocked?{point:{x:2,y:.8,z:0}}:null}});f.cast();blocked=true;f.tick(CRAFTS.Van.hitAt);assert.equal(f.target.hp,500);
});
test('Zeroth Gleam crosses its selected enemy, stuns only actual line hits, then cuts again',()=>{
 const f=fixture('Shizuna'),s=CRAFTS.Shizuna;
 f.room.set('cross',{id:'cross',x:2.5,y:0,z:.2,hp:500,team:'red'});
 f.room.set('outside',{id:'outside',x:3,y:0,z:3,hp:500,team:'red'});
 f.cast();f.tick(s.hitAt);
 assert.equal(f.actor.x,7);assert.equal(f.target.hp,478);assert.equal(f.room.get('cross').hp,478);assert.equal(f.room.get('outside').hp,500);
 assert.equal(f.target.stunUntil,1000+s.hitTimes[1]+180);
 f.tick(s.hitTimes[1]-s.hitAt-1);assert.equal(f.target.hp,478);f.tick(1);assert.equal(f.target.hp,436);assert.equal(f.room.get('cross').hp,436);
});
test('Zeroth Gleam cannot teleport into a wall immediately behind its target',()=>{
 const f=fixture('Shizuna',{geometry:{floor:()=>0,sweep:(from,to)=>to.x>5.6?{point:{x:5.6,y:.8,z:0}}:null}});
 assert.ok(f.cast().error);assert.equal(f.actor.x,0);
});
test('Kaleido Fencer activates without a target and slowly captures nearby opponents before its salvos',()=>{
 const f=fixture('Elaine'),s=CRAFTS.Elaine;
 f.room.set('behind',{id:'behind',x:-1.5,y:0,z:0,hp:500,team:'red'});
 f.room.set('ally',{id:'ally',x:1,y:0,z:0,hp:500,team:'blue'});
 f.room.set('far',{id:'far',x:6,y:0,z:0,hp:500,team:'red'});
 assert.ok(f.combat.action(f.actor,{id:'craft',kind:'craft'},f.room).combatId);
 f.tick(s.captureAt);assert.equal(f.actor.x,0);
 for(const id of ['e','behind']){const p=f.room.get(id);assert.equal(p.hp,500);assert.ok(p.knockback);assert.equal(p.knockback.duration,s.gatherEnd-s.captureAt);assert.ok(Math.abs(p.knockback.end.x-1.3)<.25);assert.equal(p.stunUntil,1000+s.hitTimes.at(-1)+180);}
 f.tick(400);assert.ok(f.target.x<2&&f.target.x>1.3);assert.equal(f.target.hp,500);
 f.room.get('far').x=1;f.tick(s.hitAt-s.captureAt-400);assert.equal(f.target.hp,495);
 f.tick(s.flurryEnd-s.hitAt);const hp=f.target.hp;assert.equal(hp,460);
 f.tick(s.finishAt-s.flurryEnd);assert.equal(f.target.hp,hp,'pause has no extra damage');
 f.tick(s.duration-s.finishAt);assert.equal(f.room.get('far').hp,500);assert.equal(f.target.hp,436);assert.equal(f.room.get('ally').hp,500);
});
test('Kaleido Fencer works empty and next to a wall without aiming at reachable ground',()=>{
 const f=fixture('Elaine',{geometry:{floor:()=>0,sweep:()=>({point:{x:1,y:.8,z:0}})}});f.target.x=8;
 assert.ok(f.combat.action(f.actor,{id:'craft',kind:'craft'},f.room).combatId);f.tick(CRAFTS.Elaine.duration);assert.equal(f.target.hp,500);assert.equal(f.actor.x,0);
});
test('Kaleido Fencer plays the complete native salvo once, then its pause and ending clips',()=>{
 const s=CRAFTS.Elaine;assert.equal(s.targetRequired,false);assert.equal(s.selfTarget,true);
 assert.equal(pose('Elaine',1000).bank,9);assert.equal(pose('Elaine',1750).bank,11);assert.equal(pose('Elaine',2500).bank,10);
 assert.notDeepEqual(pose('Elaine',2025),pose('Elaine',2325));assert.equal(pose('Elaine',3300).bank,7);assert.equal(pose('Elaine',6000).bank,8);
 assert.equal(s.stages.find(s=>s.bank===6).loopMs,undefined);assert.equal(s.stages.find(s=>s.bank===10).loopMs,undefined);const profile=require('../activity/assets/sky/combat/daybreak/source.json').profiles.Elaine;assert.ok(profile.motions.kaleidoSalvoA.endsWith('chr5110_mot_btl_craft02_3.glb'));assert.ok(profile.motions.kaleidoSalvoB.endsWith('chr5110_mot_btl_craft02_3.glb'));assert.deepEqual(profile.clipWindows.kaleidoSalvoA,[.12,.36]);assert.deepEqual(profile.clipWindows.kaleidoSalvoB,[.36,.6]);assert.deepEqual(profile.clipWindows.kaleidoFinalCut,[.6,1]);assert.deepEqual(profile.forwardThrustClips,[]);assert.deepEqual(profile.plantedCraftClips,[]);assert.deepEqual(profile.clipWindows.kaleidoPause,[.6,.60001]);
});

test('interrupting a captured multi-hit craft releases its own remaining stun and cancels later damage',()=>{
 for(const name of ['Elaine','Shizuna']){const f=fixture(name),s=CRAFTS[name];f.cast();f.tick(s.hitAt);const hp=f.target.hp;f.actor.stunUntil=f.time+1000;f.tick(20);assert.equal(f.target.stunUntil,f.time);f.tick(5000);assert.equal(f.target.hp,hp);}
});
test('the black silhouette uses confirmed damage and ends after the sheathing strike',()=>{
 const {blackened}=require('../activity/daybreak-crafts.cjs'),a={character:'Shizuna',hits:[{id:'hit',damage:22},{id:'blocked',damage:0}]};
 assert.equal(blackened([a],'hit',()=>2500),true);assert.equal(blackened([a],'blocked',()=>2500),false);assert.equal(blackened([a],'hit',()=>CRAFTS.Shizuna.hitTimes.at(-1)+180),false);a.cancelled=true;assert.equal(blackened([a],'hit',()=>2500),false);
});
test('run and idle grounding never uses the bottom of a sword as a foot contact',()=>{
 const catalogue=require('../activity/assets/sky/combat/catalogue.json');
 for(const name of ['Shizuna','Elaine'])for(const bank of ['0','1'])assert.ok(catalogue[name].banks[bank].floorClearance.every(n=>n<=.025));
 for(const name of ['Shizuna','Elaine'])for(const stage of CRAFTS[name].stages){const bank=catalogue[name].banks[stage.bank];assert.equal(bank.rows,stage.frames);assert.ok(bank.frameHeight*bank.rows<=4096);}
});
test('compressed native effect packs contain the correct source effects and bounded particle data',()=>{
 const fs=require('node:fs'),zlib=require('node:zlib'),path=require('node:path');
 for(const name of ['van','elaine','shizuna']){const p=JSON.parse(zlib.gunzipSync(fs.readFileSync('activity/assets/sky/effects/horizon/'+require('../activity/assets/sky/effects/horizon/catalogue.json')[name[0].toUpperCase()+name.slice(1)])));assert.equal(p.format,'horizon-vfx-1');
  for(const e of Object.values(p.effects))for(const frame of e.frames){assert.ok(frame.length<=128);for(const node of frame){assert.ok(node.every(Number.isFinite));assert.ok(p.textures[e.segments[node[0]].texture]);}}
  for(const file of Object.values(p.textures))assert.ok(fs.existsSync(path.join('activity/assets/sky',file)));
 }
});
test('Van shows a spinning coin followed by two shot segments, never a melee slash',async()=>{
 const THREE=await import('three'),{createDaybreakCraftView}=await import('../activity/daybreak-craft-view.mjs'),scene=new THREE.Scene(),view=createDaybreakCraftView(THREE,scene),s=CRAFTS.Van,a={id:'coin',character:'Van',origin:{x:0,y:0,z:0},aim:{x:5,y:0,z:0}};
 view.draw(a,s.throwAt+100,new Map());assert.equal(scene.getObjectByName('van-coin').visible,true);assert.equal(scene.getObjectByName('van-shot-to-coin').visible,false);assert.equal(scene.getObjectByName('daybreak-slash'),undefined);
 view.draw(a,s.fireAt+30,new Map());assert.equal(scene.getObjectByName('van-shot-to-coin').visible,true);assert.equal(scene.getObjectByName('van-ricochet').visible,true);view.dispose();assert.equal(scene.children.length,0);
});
test('visual accents release their geometry on event removal and disposal',async()=>{
 const THREE=await import('three'),{createDaybreakCraftView}=await import('../activity/daybreak-craft-view.mjs'),scene=new THREE.Scene(),view=createDaybreakCraftView(THREE,scene);
 for(let i=0;i<30;i++){const event={id:String(i),character:'Van',actor:'a',origin:{x:0,y:0,z:0},aim:{x:5,y:0,z:0}};view.draw(event,CRAFTS.Van.hitAt+50,new Map());assert.equal(view.size,1);view.remove(event.id);assert.equal(scene.children.length,0);}
 view.dispose();assert.equal(view.size,0);
});


test('interrupting Elaine during gathering stops the pull without inflicting an early hit',()=>{
 const f=fixture('Elaine'),s=CRAFTS.Elaine;f.cast();f.tick(s.captureAt);assert.ok(f.target.knockback);f.actor.stunUntil=f.time+1000;f.tick(100);const x=f.target.x;assert.equal(f.target.knockback,null);assert.equal(f.target.stunUntil,f.time);f.tick(2000);assert.equal(f.target.x,x);assert.equal(f.target.hp,500);
});


test('Zeroth locks its line at launch on the moved target and includes enemies on that new line',()=>{
 const f=fixture('Shizuna'),s=CRAFTS.Shizuna;f.cast();f.tick(s.moveStart-1);f.target.x=6;f.target.z=4;
 f.room.set('new-line',{id:'new-line',x:3,y:0,z:2,hp:500,team:'red'});f.room.set('old-line',{id:'old-line',x:3,y:0,z:-.7,hp:500,team:'red'});
 f.tick(1);const a=f.combat.snapshot().attacks[0];assert.ok(a.lineLocked);assert.equal(a.aim.x,6);assert.equal(a.aim.z,4);assert.equal(f.actor.x,0);
 f.tick(s.hitAt-s.moveStart);assert.equal(f.target.hp,478);assert.equal(f.room.get('new-line').hp,478);assert.equal(f.room.get('old-line').hp,500);assert.ok(f.actor.x>f.target.x&&f.actor.z>f.target.z);
});
test('Zeroth rechecks the launch route and cancels rather than crossing a new wall',()=>{
 let blocked=false;const f=fixture('Shizuna',{geometry:{floor:()=>0,sweep:()=>blocked?{point:{x:2,y:.8,z:0}}:null}});f.cast();blocked=true;f.tick(CRAFTS.Shizuna.moveStart);assert.equal(f.actor.x,0);assert.ok(f.combat.snapshot().attacks[0].cancelled);assert.equal(f.target.hp,500);
});
test('the second Zeroth slash coincides with the fully sheathed final frame',()=>{
 const hit=CRAFTS.Shizuna.hitTimes[1];assert.deepEqual(pose('Shizuna',hit),{bank:13,pose:18});assert.equal(pose('Shizuna',hit-30).pose,17);
});


test('clients wait for the launch line instead of dashing down the stale intro line',async()=>{
 const {dashPlayback}=await import('../activity/combat-dash-playback.mjs'),s=CRAFTS.Shizuna,a={actor:'a',character:'Shizuna',accepted:true,origin:{x:0,y:0,z:0},aim:{x:5,y:0,z:0}},events=new Map([['a',a]]);
 assert.deepEqual(dashPlayback(events,'a',()=>s.moveStart+50,()=>s).position,a.origin);
 a.lineLocked=true;a.aim={x:4,y:0,z:4};a.exitPoint={x:6,y:0,z:6};assert.deepEqual(dashPlayback(events,'a',()=>s.moveEnd,()=>s).position,a.exitPoint);
});
test('changed Elaine craft atlases have content-addressed names, so old cached dimensions cannot be reused',()=>{
 const fs=require('node:fs'),crypto=require('node:crypto'),catalogue=require('../activity/assets/sky/combat/catalogue.json');
 for(const bank of [5,6,7,8,9,10,11,12]){const b=catalogue.Elaine.banks[bank],hash=crypto.createHash('sha256').update(fs.readFileSync('activity/assets/sky/'+b.texture)).digest('hex').slice(0,10);assert.ok(b.texture.endsWith('-'+hash+'.png'));const png=fs.readFileSync('activity/assets/sky/'+b.texture);assert.equal(png.readUInt32BE(16),b.columns*b.frameWidth);assert.equal(png.readUInt32BE(20),b.rows*b.frameHeight);}
 assert.equal(catalogue.Elaine.banks[6].rows,20);
});


test('Elaine takes the camera launch heading, not the stale last movement heading',()=>{
 const f=fixture('Elaine');f.actor.heading={dx:1,dz:0};
 assert.ok(f.combat.action(f.actor,{id:'craft',kind:'craft',direction:{x:0,z:1}},f.room).combatId);
 const a=f.combat.snapshot().attacks[0];assert.equal(a.aim.x,0);assert.equal(a.aim.z,1.3);assert.equal(f.actor.heading.dx,0);assert.equal(f.actor.heading.dz,1.3);
 f.tick(CRAFTS.Elaine.captureAt);assert.ok(Math.abs(f.target.knockback.end.x)<.15);assert.ok(f.target.knockback.end.z>1.1);
});


test('Elaine has a separate sword-cut animation at the final impact, before recovery',()=>{
 const s=CRAFTS.Elaine,p=pose('Elaine',s.hitTimes.at(-1));assert.equal(p.bank,12);assert.equal(p.pose,5);assert.equal(pose('Elaine',s.finishAt-1).bank,7);assert.equal(pose('Elaine',5700).bank,8);
});
test('Elaine exports finite weapon endpoints for every craft frame and direction',()=>{
 const c=require('../activity/assets/sky/combat/catalogue.json').Elaine;
 for(const s of CRAFTS.Elaine.stages){const b=c.banks[s.bank];assert.equal(b.bladeAnchors.length,b.frames);for(const pair of b.bladeAnchors){assert.equal(pair.length,2);assert.ok(pair.flat().every(Number.isFinite));}}
});
test('Elaine green blade follows the sprite, stays visible through the pause and releases its trails',async()=>{
 const THREE=await import('three'),{createElaineBladeView}=await import('../activity/elaine-blade-view.mjs'),scene=new THREE.Scene(),texture=new THREE.Texture(),api={...THREE,TextureLoader:class{async loadAsync(){return texture;}}},view=createElaineBladeView(api,scene,'http://test/assets/'),camera=new THREE.PerspectiveCamera();camera.position.set(0,4,-6);camera.lookAt(0,1,0);camera.updateMatrixWorld(true);
 const mesh=new THREE.Mesh(new THREE.PlaneGeometry(),new THREE.MeshBasicMaterial());mesh.position.set(2,0,3);mesh.quaternion.copy(camera.quaternion);const avatar={mesh,direction:6},a={id:'green',actor:'a',character:'Elaine'};await view.prepare();
 for(const t of [100,1000,2100,2500,3300,5000,6000]){view.draw(a,t,avatar,camera);assert.equal(view.size,1);assert.ok(scene.children[0].visible);const trail=scene.children[0].children[0];assert.ok(trail.geometry.drawRange.count<=48);assert.ok(Array.from(trail.geometry.attributes.position.array).every(Number.isFinite));}
 let disposed=false;scene.children[0].children[0].geometry.addEventListener('dispose',()=>disposed=true);view.remove(a.id);assert.ok(disposed);assert.equal(scene.children.length,0);view.dispose();
});

 test('Kaleido native pack preserves animated green tint, mask UVs, spiral trails and final slash mesh',()=>{
 const fs=require('node:fs'),zlib=require('node:zlib'),files=require('../activity/assets/sky/effects/horizon/catalogue.json');const p=JSON.parse(zlib.gunzipSync(fs.readFileSync('activity/assets/sky/effects/horizon/'+files.Elaine)));
 assert.equal(p.tintCurves,true);const beam=p.effects.cr5110_20_2;for(const name of ['trail_rasen01','trail_rasen02','trail_rasen03'])assert.ok(beam.segments.some(s=>s.name===name&&s.faces.length>1));
 assert.ok(p.effects.cr5110_20_4.segments.some(s=>s.name==='Slash_Core'&&s.maskTexture&&s.faces.length>20));assert.ok(p.effects.cr5110_20_6);
 assert.ok(beam.frames.flat().some(n=>n.length===33&&n[22]>n[21]*2));assert.notDeepEqual(beam.frames[3],beam.frames[15]);
 });

test('Elaine uses the Daybreak I thrust clip without procedural arm or leg overrides and preserves the approved final VFX',()=>{
 const fs=require('node:fs'),zlib=require('node:zlib'),source=require('../activity/assets/sky/combat/daybreak/source.json'),files=require('../activity/assets/sky/effects/horizon/catalogue.json');
 assert.ok(source.clipDurations.Elaine.kaleidoSalvoA>1.8&&source.clipDurations.Elaine.kaleidoSalvoA<1.9);assert.deepEqual(source.profiles.Elaine.forwardThrustClips,[]);assert.deepEqual(source.profiles.Elaine.plantedCraftClips,[]);
 const read=file=>JSON.parse(zlib.gunzipSync(fs.readFileSync('activity/assets/sky/effects/horizon/'+file)));const old=read('elaine-native-57d3820fdb.vfxpack'),now=read(files.Elaine);assert.deepEqual(now.effects.cr5110_20_4,old.effects.cr5110_20_4);assert.deepEqual(now.effects.cr5110_20_6,old.effects.cr5110_20_6);assert.ok(now.textures.db1_efsl_a002);assert.ok(now.effects.cr5110_20_2.frames.every(frame=>frame.every(n=>!['cylinder_base','cylinder_base_multi'].includes(now.effects.cr5110_20_2.segments[n[0]].name))));
});
