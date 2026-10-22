const test=require('node:test'),assert=require('node:assert/strict');
const {createAdventure,words}=require('../utils/adventure/engine');
const {createAdventureDiscord,chunks,BUTTON}=require('../utils/adventure/discord');
const data=require('../rpg/data/aventure.json');
const play=(game,state,...lines)=>lines.map(l=>game.handle(state,l));

test('commands are read without accents, articles or punctuation',()=>{
 assert.deepEqual(words("Ouvre-la porte, avec l'énorme Clé !"),['ouvre','porte','enorme','cle']);
});
test('every exit leads to a room and the start and final rooms exist',()=>{
 const ids=new Set(data.rooms.map(r=>String(r.id)));
 assert.ok(ids.has(String(data.start)));assert.ok(ids.has(String(data.final.room)));
 for(const r of data.rooms)for(const e of Object.values(r.exits||{}))assert.ok(ids.has(String(e.to??e)),r.id+' → '+(e.to??e));
});
test('a locked door opens with the key taken in the study, and the key is used up',()=>{
 const game=createAdventure(data),s=game.fresh();
 const [,locked]=play(game,s,'nord','nord');assert.match(locked.replies[0],/fermée/);assert.equal(s.room,'2');
 play(game,s,'est','nord');assert.match(game.describe(s),/clé rouillée/);
 const [take,again]=play(game,s,'prends la clef','ramasse la cle');assert.match(take.replies[0],/prenez/);assert.match(again.replies[0],/plus de clé/);
 assert.doesNotMatch(game.describe(s),/clé rouillée/);
 assert.match(game.handle(s,'inventaire').replies[0],/petite clé/);
 play(game,s,'sud','ouest');const open=game.handle(s,'ouvrir la porte avec la clé');assert.match(open.replies[0],/s'ouvre/);
 assert.deepEqual(s.inventory,[]);
 const go=game.handle(s,'aller au nord');assert.equal(s.room,'6');assert.equal(go.moved,true);assert.equal(go.first,true);
});
test('unknown words and walls are answered',()=>{
 const game=createAdventure(data),s=game.fresh();
 assert.equal(game.handle(s,'danser').replies[0],"Je n'ai pas compris.");
 assert.equal(game.handle(s,'ouest').replies[0],'Vous ne pouvez pas aller par là.');
 assert.equal(game.handle(s,'regarder').look,true);
});
test('long texts are cut under the Discord limit',()=>{
 const parts=chunks(('mot '.repeat(300)+'\n\n').repeat(3));assert.ok(parts.length>1);assert.ok(parts.every(p=>p.length<=1900));
});

function fakeDiscord(){
 const sent={dm:[],channels:{}},users={};
 const channel=id=>({send:async m=>{(sent.channels[id]??=[]).push(m);}});
 const client={channels:{fetch:async id=>channel(id)},users:{fetch:async id=>users[id]}};
 const user=id=>users[id]??={id,send:async m=>sent.dm.push([id,m]),createDM:async()=>({send:async m=>sent.dm.push([id,m])})};
 return {sent,client,user};
}
const button=(user,admin=false)=>{const r={};return {r,i:{isButton:()=>true,customId:BUTTON,user,memberPermissions:{has:()=>admin},deferReply:async()=>{},editReply:async m=>r.reply=m,reply:async m=>r.reply=m}};};
const dm=(user,content)=>({author:{id:user.id,bot:false},guild:null,content,channel:{send:async m=>user.send(m)}});
const tick=()=>new Promise(r=>setImmediate(r));

test('only administrators and allowed users may enter, and the game goes on in DMs',async()=>{
 const {sent,client,user}=fakeDiscord(),saved=[];
 const adv=createAdventureDiscord({client,data,store:{load:()=>null,save:s=>saved.push(JSON.stringify(s))},channelId:'c',closingChannelId:'rp',allowed:['744964573249011712'],files:require('node:path').join(__dirname,'fixtures-aventure')});
 const stranger=button(user('1'));await adv.handle(stranger.i);assert.match(stranger.r.reply.content,/pas encore ouverte/);assert.equal(sent.dm.length,0);
 assert.equal(adv.message(dm(user('1'),'nord')),false);
 const allowed=button(user('744964573249011712'));await adv.handle(allowed.i);assert.match(allowed.r.reply.content,/message privé/);
 assert.ok(sent.dm.some(([,m])=>/gigantesque porte/.test(m.content)));
 const admin=button(user('2'),true);await adv.handle(admin.i);assert.ok(adv.state.players['2']);
 assert.equal(adv.message(dm(user('2'),'nord')),true);await tick();await tick();
 assert.equal(adv.state.players['2'].room,'2');assert.ok(saved.length);
});
test('enough players in the final room win, and the roleplay channel hears the end once',async()=>{
 const {sent,client,user}=fakeDiscord();
 const small={...data,final:{...data.final,players:2}};
 const adv=createAdventureDiscord({client,data:small,store:{load:()=>null,save:()=>{}},channelId:'c',closingChannelId:'rp'});
 for(const id of ['a','b']){await adv.handle(button(user(id),true).i);adv.state.players[id].room='32';}
 adv.message(dm(user('a'),'est'));await tick();await tick();await tick();
 assert.deepEqual(adv.state.reached,['a']);assert.equal(adv.state.done,false);assert.equal(sent.channels.rp,undefined);
 adv.message(dm(user('b'),'est'));for(let i=0;i<6;i++)await tick();
 assert.equal(adv.state.done,true);assert.equal(sent.channels.rp.length,1);
 assert.equal(sent.dm.filter(([,m])=>m.content===small.final.victory).length,2);
});
test('a room with a picture sends it on entering and with « regarder », the others only text',async()=>{
 const {sent,client,user}=fakeDiscord(),dir=require('node:fs').mkdtempSync(require('node:path').join(require('node:os').tmpdir(),'aventure-'));
 require('node:fs').writeFileSync(require('node:path').join(dir,'hall.png'),'png');
 const pictured={...data,rooms:data.rooms.map(r=>String(r.id)==='2'?{...r,image:'hall.png'}:r)};
 const adv=createAdventureDiscord({client,data:pictured,store:{load:()=>null,save:()=>{}},channelId:'c',files:dir});
 await adv.handle(button(user('a'),true).i);assert.ok(sent.dm.every(([,m])=>!m.files));
 adv.message(dm(user('a'),'nord'));await tick();await tick();
 const last=sent.dm.at(-1)[1];assert.match(last.content,/hall d'entrée/);assert.equal(last.files[0].name,'hall.png');
 adv.message(dm(user('a'),'inventaire'));await tick();await tick();assert.equal(sent.dm.at(-1)[1].files,undefined);
 adv.message(dm(user('a'),'regarder'));await tick();await tick();assert.equal(sent.dm.at(-1)[1].files[0].name,'hall.png');
});
test('« /reset » in the DMs starts a player over, even after the end; strangers are not heard',async()=>{
 const {sent,client,user}=fakeDiscord();
 const tiny={start:1,intro:'Début.',rooms:[{id:1,description:'Entrée.',exits:{nord:2}},{id:2,description:'Sortie.',exits:{sud:1}}],final:{room:2,players:1,victory:'Gagné !',closing:'Fin.'}};
 const adv=createAdventureDiscord({client,data:tiny,store:{load:()=>null,save:()=>{}},channelId:'c',closingChannelId:'rp'});
 assert.equal(adv.message(dm(user('x'),'/reset')),false);
 await adv.handle(button(user('a'),true).i);
 adv.message(dm(user('a'),'nord'));for(let i=0;i<6;i++)await tick();
 assert.equal(adv.state.done,true);assert.deepEqual(adv.state.reached,['a']);
 adv.message(dm(user('a'),'  /RESET '));for(let i=0;i<4;i++)await tick();
 assert.equal(adv.state.players.a.room,'1');assert.deepEqual(adv.state.reached,[]);
 assert.ok(sent.dm.some(([,m])=>/recommence depuis le début/.test(m.content)&&/Début\./.test(m.content)));
 adv.message(dm(user('a'),'nord'));for(let i=0;i<6;i++)await tick();
 assert.equal(adv.state.players.a.room,'2');assert.equal(sent.channels.rp.length,1);
 assert.equal(sent.dm.filter(([,m])=>m.content==='Gagné !').length,1);
});
