const test=require('node:test'),assert=require('node:assert/strict');
const {createActivityCombat}=require('../utils/activityCombat');
const {createActivityService}=require('../utils/activityService');
const {createActivityLobby}=require('../utils/activityLobby');
const {createActivityRoleplay,gifInfo}=require('../utils/activityRoleplay');
const {createRoleplayDiscordSender}=require('../utils/activityRoleplayDiscord');
const {GIFEncoder}=require('gifenc');
const grid={origin:{x:-12,z:-12},step:1,width:25,height:25,cells:Array(625).fill(0),spawn:{x:0,y:0,z:0}};
function fixture(extra={}){let clock=1000;const players=new Map([['renne',{id:'renne',character:'Renne',x:0,y:0,z:0,hp:100}],['victim',{id:'victim',character:'Joshua',x:2,y:0,z:0,hp:100}]]);const crafts=[];const combat=createActivityCombat({grid,now:()=>clock,onCraft:e=>crafts.push(e),...extra});return {players,combat,crafts,tick(ms){clock+=ms;combat.tick(players);},start(kind,aim={x:2,y:0,z:0},id='attack-'+kind){return combat.action(players.get('renne'),{id,kind,aim},players);}};}
test('Renne melee deals server-owned damage once, in front and on the same floor',()=>{const f=fixture();f.players.set('behind',{id:'behind',x:-1,y:0,z:0,hp:100});f.players.set('above',{id:'above',x:2,y:2,z:0,hp:100});f.players.set('watch',{id:'watch',x:2,y:0,z:0,hp:100,spectator:true});assert.ok(f.start('basic').combatId);f.tick(149);assert.equal(f.players.get('victim').hp,100);f.tick(1);assert.equal(f.players.get('victim').hp,88);f.tick(1000);assert.equal(f.players.get('victim').hp,88);for(const id of ['behind','above','watch'])assert.equal(f.players.get(id).hp,100);});
test('art and craft have distinct damage and the target can dodge before impact',()=>{for(const [kind,damage]of [['art',20],['craft',30]]){const f=fixture();assert.ok(f.start(kind).combatId);f.tick(1800);assert.equal(f.players.get('victim').hp,100-damage);assert.equal(f.crafts.length,kind==='craft'?1:0);}const f=fixture();f.start('craft');f.players.get('victim').z=6;f.tick(1800);assert.equal(f.players.get('victim').hp,100);});
test('character, dead, spectator, aim, cooldown and wall checks cannot be bypassed',()=>{const f=fixture();const p=f.players.get('renne');p.character='Sieg';assert.ok(f.start('basic').error);p.character='Renne';p.hp=0;assert.ok(f.start('basic').error);p.hp=100;p.spectator=true;assert.ok(f.start('basic').error);p.spectator=false;assert.ok(f.start('craft',{x:Infinity,y:0,z:0}).error);assert.ok(f.start('craft',{x:2,y:20,z:0}).error);assert.ok(f.start('basic').combatId);assert.ok(f.start('craft',undefined,'another-id').error);f.tick(700);assert.ok(f.start('basic',undefined,'next-id').combatId);const wall=fixture({geometry:{floor:()=>0,sweep:(a,b)=>a.x<1&&b.x>1?{point:{x:1,y:.85,z:0},normal:{x:-1,y:0,z:0}}:null}});wall.start('basic');wall.tick(400);assert.equal(wall.players.get('victim').hp,100);});
test('death or departure before impact cancels damage, and deaths use ten seconds',()=>{const f=fixture();f.start('craft');f.players.get('renne').hp=0;f.tick(1800);assert.equal(f.players.get('victim').hp,100);assert.equal(f.combat.snapshot().attacks[0].cancelled,true);const g=fixture();g.players.get('victim').hp=10;g.start('basic');g.tick(300);assert.equal(g.players.get('victim').hp,0);assert.equal(g.players.get('victim').deadUntil,11300);});
test('service retries, including older action IDs, do not repeat chat or crafts',async()=>{let clock=1000;const speech=[],crafts=[];const service=createActivityService({grid,combatEnabled:true,now:()=>clock,resolveCharacter:async()=> 'Renne',onSay:e=>speech.push(e),onCraft:e=>crafts.push(e)});const session=await service.join({id:'account',channel:'map:arena'});const token=session.activity_token;const action={id:'say-first',type:'say',text:'Bonjour @everyone'};await service.state(token,{x:0,z:0,action});clock+=1001;await service.state(token,{x:0,z:0,action:{...action,id:'say-second'}});await service.state(token,{x:0,z:0,action});await new Promise(resolve=>setImmediate(resolve));assert.equal(speech.length,2);const craft={id:'craft-first',type:'attack',kind:'craft',aim:{x:3,y:0,z:0},damage:999};await service.state(token,{x:0,z:0,action:craft});await service.state(token,{x:0,z:0,action:craft});assert.equal(crafts.length,1);clock+=200;const moving=await service.state(token,{x:.6,z:0});assert.equal(moving.position.x,.6);assert.equal(moving.health.canMove,true);});
test('arena combat events contain anonymous aliases, not account IDs',async()=>{let clock=1000;const lobby=createActivityLobby({grid,now:()=>clock,resolveCharacter:async id=>id==='private-one'?'Renne':'Joshua',arena:{grid,combatEnabled:true,spawns:[{x:0,y:0,z:0},{x:2,y:0,z:0}]}});lobby.createDuel({id:'match',players:['private-one','private-two'],channel:'channel'});lobby.joinDuel('match','private-one');lobby.joinDuel('match','private-two');const a=await lobby.join({id:'private-one',channel:'channel'}),b=await lobby.join({id:'private-two',channel:'channel'});await lobby.state(a.activity_token);await lobby.state(b.activity_token);await lobby.state(a.activity_token,{x:0,z:0,action:{id:'anon-hit',type:'attack',kind:'basic',aim:{x:2,y:0,z:0}}});clock+=400;const result=await lobby.state(b.activity_token);assert.equal(result.health.hp,88);assert.match(result.combat.attacks[0].actor,/^avatar:/);assert.match(result.combat.attacks[0].hits[0].id,/^avatar:/);assert.equal(JSON.stringify(result).includes('private-'),false);});
function animatedGif(frames=4,width=96,height=64){const gif=GIFEncoder();for(let i=0;i<frames;i++)gif.writeFrame(new Uint8Array(width*height).fill(i%2),width,height,{palette:[[0,0,0],[255,0,100]],delay:100});gif.finish();return Buffer.from(gif.bytes());}
test('only the craft owner can publish a bounded animated GIF, once even concurrently',async()=>{const posts=[];let release;const relay=createActivityRoleplay({send:payload=>{posts.push(payload);return new Promise(resolve=>release=resolve);},setTimer:()=>null});relay.craft({id:'craft-id',actor:'account',character:'Renne',technique:'Cercle sanglant'});const body={id:'craft-id',gif:animatedGif().toString('base64')};await assert.rejects(()=>relay.capture('other-account',body),{status:403});await assert.rejects(()=>relay.capture('account',{...body,gif:Buffer.from('not-gif').toString('base64')}),{status:400});const one=relay.capture('account',body),two=relay.capture('account',body);await new Promise(resolve=>setImmediate(resolve));assert.equal(posts.length,1);release();await Promise.all([one,two]);await relay.capture('account',body);assert.equal(posts.length,1);assert.equal(posts[0].text,'Renne lance Cercle sanglant.');assert.equal(gifInfo(posts[0].gif).frames,4);});
test('GIF validation rejects excessive dimensions, frames and truncation',()=>{assert.throws(()=>gifInfo(animatedGif(4,449,64)));assert.throws(()=>gifInfo(animatedGif(25)));assert.throws(()=>gifInfo(animatedGif().subarray(0,30)));assert.throws(()=>gifInfo(animatedGif(1)));});
test('all chat text is published in bounded chunks under character identity',async()=>{const posts=[];const relay=createActivityRoleplay({send:async p=>posts.push(p),setTimer:()=>null});const event={id:'speech',character:'Renne',text:'x'.repeat(4000)};await relay.speech(event);await relay.speech(event);assert.equal(posts.length,3);assert.equal(posts.map(p=>p.text).join(''),event.text);assert.ok(posts.every(p=>p.character==='Renne'&&p.text.length<=1800));});
test('Discord sender never replies, pings, exposes an account or uses a webhook in another channel',async()=>{const posts=[],fallback=[];class Hook{async fetch(){return {channelId:'roleplay'};}async send(p){posts.push(p);}}const sender=createRoleplayDiscordSender({WebhookClient:Hook,webhookUrl:'fixture',channelId:'roleplay',baseUrl:'https://example.test',client:{}});await sender({character:'Renne',text:'@everyone',gif:animatedGif()});assert.equal(posts[0].username,'Renne');assert.deepEqual(posts[0].allowedMentions.parse,[]);assert.equal(posts[0].reply,undefined);assert.equal(posts[0].files[0].name,'craft.gif');class Wrong extends Hook{async fetch(){return {channelId:'other'};}}const safe=createRoleplayDiscordSender({WebhookClient:Wrong,webhookUrl:'fixture',channelId:'roleplay',client:{channels:{fetch:async id=>{assert.equal(id,'roleplay');return {guild:{},isTextBased:()=>true,send:async p=>fallback.push(p)};}}}});await safe({character:'Renne',text:'Bonjour'});assert.equal(posts.length,1);assert.equal(fallback[0].content,'**Renne** : Bonjour');});
test('craft capture preserves its original match even after the player leaves it',async()=>{
 const posts=[],relay=createActivityRoleplay({send:async p=>posts.push(p),setTimer:()=>null});
 const event={id:'routed-craft',actor:'account',character:'Renne',technique:'Cercle sanglant',match:'match-one'};relay.craft(event);event.match='match-two';
 await relay.speech({id:'routed-speech',character:'Renne',text:'En garde',match:'match-two'});
 await relay.capture('account',{id:'routed-craft',match:'malicious-client-match',gif:animatedGif().toString('base64')});
 assert.equal(posts[0].match,'match-two');assert.equal(posts[1].match,'match-one');assert.ok(posts[1].gif);
});
test('match thread GIFs cannot use a webhook belonging to a different parent channel',async()=>{
 const posts=[];let hooks=0;class Hook{constructor(){hooks++;}async fetch(){return{channelId:'roleplay'};}async send(p){posts.push({hook:p});}}
 const thread={id:'match-thread',parentId:'general',guild:{},isThread:()=>true,isTextBased:()=>true,send:async p=>posts.push({bot:p})};
 const sender=createRoleplayDiscordSender({client:{channels:{fetch:async id=>{assert.equal(id,'match-thread');return thread;}}},WebhookClient:Hook,webhookUrl:'fixture',channelId:'roleplay'});
 await sender({character:'Renne',text:'Craft',gif:animatedGif(),threadId:'match-thread'});
 assert.equal(hooks,0);assert.equal(posts[0].bot.files[0].name,'craft.gif');assert.equal(posts[0].bot.content,'**Renne** : Craft');assert.deepEqual(posts[0].bot.allowedMentions.parse,[]);
 thread.parentId='roleplay';await sender({character:'Renne',text:'Next',threadId:'match-thread'});assert.equal(posts[1].hook.threadId,'match-thread');assert.equal(posts[1].hook.username,'Renne');
});


test('duel presentation protects targets from damage even when another match attacks them',()=>{
 for(const kind of ['basic','art','craft']){const f=fixture();f.players.get('victim').duelProtected=true;f.start(kind);f.tick(1800);assert.equal(f.players.get('victim').hp,100);}
});


test('last action GIF accepts either duelist, rejects outsiders and posts once to its original match',async()=>{
 const posts=[],relay=createActivityRoleplay({send:async p=>posts.push(p)});
 relay.finish({id:'match-one',captureId:'duel-result:one',actors:['one','two'],winnerName:'Renne'});
 const body={id:'duel-result:one',gif:animatedGif().toString('base64'),match:'forged'};
 await assert.rejects(()=>relay.capture('outsider',body),{status:403});
 await Promise.all([relay.capture('one',body),relay.capture('two',body)]);assert.equal(posts.length,1);assert.equal(posts[0].match,'match-one');assert.match(posts[0].text,/ralenti/);assert.ok(posts[0].gif);
});


test('lethal attacks retain anonymous cinematic timing and target markers',()=>{
 const events=[],f=fixture({onDefeat:e=>events.push(e)});f.players.get('victim').hp=10;f.start('craft');f.tick(1800);
 const a=events[0].action;assert.equal(a.started,1000);assert.ok(a.releaseAt>a.started);assert.ok(a.impactAt>a.releaseAt);assert.ok(a.endsAt>a.impactAt);assert.deepEqual(a.origin,{x:0,y:0,z:0});assert.deepEqual(a.aim,{x:2,y:0,z:0});assert.equal(a.actor,undefined);assert.equal(a.kind,'craft');
});

 test('cinematic GIF accepts doubled resolution and rejects excess height and upload size',()=>{assert.deepEqual(gifInfo(animatedGif(4,448,336)),{width:448,height:336,frames:4});assert.throws(()=>gifInfo(animatedGif(4,448,337)));assert.throws(()=>gifInfo(Buffer.alloc(3000001)));});


test('all native combatants have valid local banks and server-owned actions, civilians cannot invent them',()=>{
 const fs=require('node:fs'),path=require('node:path'),{COMBAT,combatSpec}=require('../activity/native-combat.cjs');assert.equal(Object.keys(COMBAT).length,36);assert.equal(Object.values(COMBAT).filter(c=>c.actions.art).length,31);
 for(const [character,meta]of Object.entries(COMBAT)){
  for(const info of Object.values(meta.banks)){assert.ok(fs.existsSync(path.join(__dirname,'../activity/assets/sky',info.texture)),info.texture);assert.ok(info.frames>0);}
  for(const frames of Object.values(meta.sequences))for(const frame of frames){assert.ok(frame.pose*8+7<meta.banks[frame.bank].frames,character);assert.ok(frame.ms>0);}
  for(const [kind,spec]of Object.entries(meta.actions)){const f=fixture();f.players.get('renne').character=character;const spec=combatSpec(character,kind),target=spec.effect?'renne':'victim';assert.ok(f.combat.action(f.players.get('renne'),{id:'all-'+kind,kind,aim:{x:2,y:0,z:0},target},f.players).combatId,character+' '+kind);f.tick(3000);assert.equal(f.players.get('victim').hp,100-combatSpec(character,kind).damage,character+' '+kind);}
 }
 assert.equal(combatSpec('Sieg','basic'),null);assert.equal(combatSpec('Grant','art'),null);assert.equal(combatSpec('__proto__','basic'),null);
});

 test('arena speech keeps its map destination through chunking and after relocation',async()=>{const posts=[],relay=createActivityRoleplay({send:async p=>posts.push(p)});const event={id:'arena-chat',character:'Renne',text:'x'.repeat(2000),map:'arena',match:'match'};const pending=relay.speech(event);event.map='anterose';await pending;assert.equal(posts.length,2);assert.ok(posts.every(p=>p.map==='arena'));const spoken=[];const lobby=createActivityLobby({grid,resolveCharacter:async()=> 'Renne',onSay:e=>spoken.push(e),arena:{grid}});lobby.createDuel({id:'map-chat',players:['a','b'],channel:'origin'});lobby.joinDuel('map-chat','a');const session=await lobby.join({id:'a',channel:'dm'});await lobby.state(session.activity_token,{x:session.player.x,z:session.player.z,action:{id:'arena-say',type:'say',text:'Bonjour'}});await new Promise(resolve=>setImmediate(resolve));assert.equal(spoken[0].map,'arena');});

test('smooth cinematic GIFs accept 93 frames only for a confirmed duel result',async()=>{
 const bytes=animatedGif(93,448,336);assert.throws(()=>gifInfo(bytes));assert.equal(gifInfo(bytes,{maxFrames:96,maxBytes:8000000}).frames,93);
 const posts=[],relay=createActivityRoleplay({send:async p=>posts.push(p),setTimer:()=>null});relay.craft({id:'craft',actor:'one',character:'Renne',technique:'Craft'});
 await assert.rejects(()=>relay.capture('one',{id:'craft',gif:bytes.toString('base64')}),{status:400});
 relay.finish({id:'match',captureId:'duel-result:smooth',actors:['one','two'],winnerName:'Renne'});
 await assert.rejects(()=>relay.capture('outsider',{id:'duel-result:smooth',gif:bytes.toString('base64')}),{status:403});
 await relay.capture('two',{id:'duel-result:smooth',gif:bytes.toString('base64')});assert.equal(posts.length,1);assert.equal(posts[0].fileName,'last-action.gif');assert.equal(posts[0].match,'match');
 assert.throws(()=>gifInfo(animatedGif(97),{maxFrames:96,maxBytes:8000000}));assert.throws(()=>gifInfo(Buffer.alloc(8000001),{maxFrames:96,maxBytes:8000000}));
});
