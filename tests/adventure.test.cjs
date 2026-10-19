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
 assert.equal(game.handle(s,'carte').map,true);
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
 const adv=createAdventureDiscord({client,data,store:{load:()=>null,save:s=>saved.push(JSON.stringify(s))},channelId:'c',closingChannelId:'rp',allowed:['744964573249011712'],renderMap:async()=>({attachment:Buffer.from('png'),name:'plan.png'})});
 const stranger=button(user('1'));await adv.handle(stranger.i);assert.match(stranger.r.reply.content,/pas encore ouverte/);assert.equal(sent.dm.length,0);
 assert.equal(adv.message(dm(user('1'),'nord')),false);
 const allowed=button(user('744964573249011712'));await adv.handle(allowed.i);assert.match(allowed.r.reply.content,/message privé/);
 assert.ok(sent.dm.some(([,m])=>/gigantesque porte/.test(m.content)&&m.files));
 const admin=button(user('2'),true);await adv.handle(admin.i);assert.ok(adv.state.players['2']);
 assert.equal(adv.message(dm(user('2'),'nord')),true);await tick();await tick();
 assert.equal(adv.state.players['2'].room,'2');assert.ok(saved.length);
});
test('enough players in the final room win, and the roleplay channel hears the end once',async()=>{
 const {sent,client,user}=fakeDiscord();
 const small={...data,final:{...data.final,players:2}};
 const adv=createAdventureDiscord({client,data:small,store:{load:()=>null,save:()=>{}},channelId:'c',closingChannelId:'rp',renderMap:async()=>null});
 for(const id of ['a','b']){await adv.handle(button(user(id),true).i);adv.state.players[id].room='32';}
 adv.message(dm(user('a'),'est'));await tick();await tick();await tick();
 assert.deepEqual(adv.state.reached,['a']);assert.equal(adv.state.done,false);assert.equal(sent.channels.rp,undefined);
 adv.message(dm(user('b'),'est'));for(let i=0;i<6;i++)await tick();
 assert.equal(adv.state.done,true);assert.equal(sent.channels.rp.length,1);
 assert.equal(sent.dm.filter(([,m])=>m.content===small.final.victory).length,2);
});
