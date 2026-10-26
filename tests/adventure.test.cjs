const test=require('node:test'),assert=require('node:assert/strict');
const {createAdventure,words}=require('../utils/adventure/engine');
const {createAdventureDiscord,chunks,BUTTON}=require('../utils/adventure/discord');
const data=require('../rpg/data/aventure.json');
const play=(game,state,...lines)=>lines.map(l=>game.handle(state,l));

test('commands are read without accents, articles or punctuation; a hyphen stays in its word',()=>{
 assert.deepEqual(words("Ouvre la porte, avec l'énorme Clé !"),['ouvre','porte','enorme','cle']);
 assert.deepEqual(words('Regarde le porte-manteau'),['regarde','porte-manteau']);
});
test('every exit leads to a room and the start and final rooms exist',()=>{
 const ids=new Set(data.rooms.map(r=>String(r.id)));
 assert.ok(ids.has(String(data.start)));assert.ok(ids.has(String(data.final.room)));
 for(const r of data.rooms)for(const e of Object.values(r.exits||{}))assert.ok(ids.has(String(e.to??e)),r.id+' → '+(e.to??e));
});
test('the front door opens once its cat flap is seen, the library once its code is given',()=>{
 const game=createAdventure(data),s=game.fresh();
 const [shut]=play(game,s,'nord');assert.match(shut.replies[0],/trop haute/);assert.equal(s.room,'1');
 assert.match(game.handle(s,'regarder la porte').replies[0],/chatière/);
 const [hall]=play(game,s,'nord');assert.equal(s.room,'2');assert.equal(hall.moved,true);assert.equal(hall.first,true);
 const [locked]=play(game,s,'est');assert.match(locked.replies[0],/cadenas/);assert.equal(s.room,'2');
 play(game,s,'code 1234');play(game,s,'est');assert.equal(s.room,'2');
 play(game,s,'code 2406','est');assert.equal(s.room,'7');
});
test('an object is taken once, then shown in the inventory',()=>{
 const game=createAdventure(data),s=game.fresh();
 play(game,s,'regarder la porte','nord','ouest');assert.equal(s.room,'3');
 const [take,again]=play(game,s,'prendre le couteau','prends le couteau');
 assert.deepEqual(s.inventory,['couteau']);assert.notEqual(take.replies[0],again.replies[0]);
 assert.match(game.handle(s,'inventaire').replies[0],/un couteau/);
});
test('unknown words and walls are answered',()=>{
 const game=createAdventure(data),s=game.fresh();
 assert.equal(game.handle(s,'danser').replies[0],"Je n'ai pas compris.");
 assert.equal(game.handle(s,'ouest').replies[0],'Vous ne pouvez pas aller par là.');
 play(game,s,'regarder la porte','nord');
 assert.notEqual(game.handle(s,'regarder').replies[0],"Je n'ai pas compris.");
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

test('anyone may enter through the button, and the game goes on in DMs',async()=>{
 const {sent,client,user}=fakeDiscord(),saved=[];
 const adv=createAdventureDiscord({client,data,store:{load:()=>null,save:s=>saved.push(JSON.stringify(s))},channelId:'c',files:require('node:path').join(__dirname,'fixtures-aventure')});
 assert.equal(adv.message(dm(user('1'),'nord')),false);   // a DM before the button is not read
 const player=button(user('744964573249011712'));await adv.handle(player.i);assert.match(player.r.reply.content,/message privé/);
 assert.ok(sent.dm.some(([,m])=>/gigantesque porte/.test(m.content)));
 const admin=button(user('2'),true);await adv.handle(admin.i);assert.ok(adv.state.players['2']);
 adv.message(dm(user('2'),'regarder la porte'));await tick();await tick();
 assert.equal(adv.message(dm(user('2'),'nord')),true);await tick();await tick();
 assert.equal(adv.state.players['2'].room,'2');assert.ok(saved.length);
});
test('enough players in the final room win, and the invitation channel hears the end once',async()=>{
 const {sent,client,user}=fakeDiscord();
 const small={...data,final:{...data.final,players:2,victory:'Victoire !',closing:'Le fort est tombé.'}};
 const adv=createAdventureDiscord({client,data:small,store:{load:()=>null,save:()=>{}},channelId:'c'});
 for(const id of ['a','b']){await adv.handle(button(user(id),true).i);Object.assign(adv.state.players[id],{room:'16',triggers:['trone_ouvert']});}
 adv.message(dm(user('a'),'est'));await tick();await tick();await tick();
 assert.deepEqual(adv.state.reached,['a']);assert.equal(adv.state.done,false);assert.equal(sent.channels.c,undefined);
 adv.message(dm(user('b'),'est'));for(let i=0;i<6;i++)await tick();
 assert.equal(adv.state.done,true);assert.equal(sent.channels.c.length,1);
 assert.equal(sent.dm.filter(([,m])=>m.content===small.final.victory).length,2);
});
test('a room with a picture sends it on entering, other replies are only text',async()=>{
 const {sent,client,user}=fakeDiscord(),dir=require('node:fs').mkdtempSync(require('node:path').join(require('node:os').tmpdir(),'aventure-'));
 require('node:fs').writeFileSync(require('node:path').join(dir,'hall.png'),'png');
 const pictured={...data,rooms:data.rooms.map(r=>String(r.id)==='2'?{...r,image:'hall.png'}:r)};
 const adv=createAdventureDiscord({client,data:pictured,store:{load:()=>null,save:()=>{}},channelId:'c',files:dir});
 await adv.handle(button(user('a'),true).i);assert.ok(sent.dm.every(([,m])=>!m.files));
 adv.message(dm(user('a'),'regarder la porte'));await tick();await tick();
 adv.message(dm(user('a'),'nord'));await tick();await tick();
 const last=sent.dm.at(-1)[1];assert.match(last.content,/hall d'entrée/);assert.equal(last.files[0].name,'hall.png');
 adv.message(dm(user('a'),'inventaire'));await tick();await tick();assert.equal(sent.dm.at(-1)[1].files,undefined);
});
test('« /reset » in the DMs starts a player over, even after the end; strangers are not heard',async()=>{
 const {sent,client,user}=fakeDiscord();
 const tiny={start:1,intro:'Début.',rooms:[{id:1,description:'Entrée.',exits:{nord:2}},{id:2,description:'Sortie.',exits:{sud:1}}],final:{room:2,players:1,victory:'Gagné !',closing:'Fin.'}};
 const adv=createAdventureDiscord({client,data:tiny,store:{load:()=>null,save:()=>{}},channelId:'c'});
 assert.equal(adv.message(dm(user('x'),'/reset')),false);
 await adv.handle(button(user('a'),true).i);
 adv.message(dm(user('a'),'nord'));for(let i=0;i<6;i++)await tick();
 assert.equal(adv.state.done,true);assert.deepEqual(adv.state.reached,['a']);
 adv.message(dm(user('a'),'  /RESET '));for(let i=0;i<4;i++)await tick();
 assert.equal(adv.state.players.a.room,'1');assert.deepEqual(adv.state.reached,[]);
 assert.ok(sent.dm.some(([,m])=>/recommence depuis le début/.test(m.content)&&/Début\./.test(m.content)));
 adv.message(dm(user('a'),'nord'));for(let i=0;i<6;i++)await tick();
 assert.equal(adv.state.players.a.room,'2');assert.equal(sent.channels.c.length,1);
 assert.equal(sent.dm.filter(([,m])=>m.content==='Gagné !').length,1);
});
test('each exchange is kept for the platform, and a hint written there is sent in DM',async()=>{
 const {sent,client,user}=fakeDiscord();
 const tiny={start:1,intro:'Début.',rooms:[{id:1,description:'Entrée.',exits:{nord:2}},{id:2,description:'Sortie.',exits:{sud:1}}],final:{room:2,players:2,victory:'Gagné !'}};
 const adv=createAdventureDiscord({client,data:tiny,store:{load:()=>null,save:()=>{}},channelId:'c'});
 const before=adv.version();
 const press=button(user('123456'),true);press.i.user.globalName='Twn';await adv.handle(press.i);
 adv.message(dm(user('123456'),'nord'));for(let i=0;i<4;i++)await tick();
 assert.ok(adv.version()>before);
 const [game]=adv.snapshot();
 assert.equal(game.id,'123456');assert.equal(game.name,'Twn');assert.equal(game.state.room,'2');
 assert.deepEqual(game.log.map(l=>l.kind),['reply','command','reply','reply']);assert.equal(game.log[1].text,'nord');
 assert.match(game.log[3].text,/Il faut être 2/);assert.equal(game.log[2].room,'2');
 await adv.hint('123456','Cherchez la chatière.');
 assert.match(sent.dm.at(-1)[1].content,/Indice.*Cherchez la chatière\./);
 assert.equal(adv.snapshot()[0].log.at(-1).kind,'hint');
 await assert.rejects(adv.hint('999999','?'),/joueur inconnu/);
});
test('the sync sends the games once they changed and delivers the hints, reporting those that failed',async()=>{
 const {startAdventureSync}=require('../utils/adventure/platformSync');
 const calls=[];let version=1;const delivered=[];
 const adventure={version:()=>version,snapshot:()=>[{id:'1',name:'a',state:{},log:[]}],hint:async(user,text)=>{if(user==='bad')throw Object.assign(new Error('x'),{code:50007});delivered.push(text);}};
 const replies=[{hints:[{id:7,user:'1',text:'Indice'},{id:8,user:'bad',text:'?'}]},{hints:[]}];
 const fetch=async(url,options)=>{calls.push(JSON.parse(options.body));return {ok:true,status:200,json:async()=>replies.shift()};};
 const sync=startAdventureSync({adventure,token:'t',fetch,every:1e9,log:()=>{}});
 await sync.tick();await sync.tick();sync.stop();
 assert.equal(calls[0].players.length,1);assert.equal(calls[1].players,undefined);
 assert.deepEqual(delivered,['Indice']);assert.deepEqual(calls[1].failed,[{id:8,error:'50007'}]);
});
test('an elided letter goes with its apostrophe, and numbers said in a row make one word',()=>{
 assert.deepEqual(words("S'asseoir sur la chaise"),['asseoir','chaise']);
 assert.deepEqual(words('s'),['s']);
 assert.deepEqual(words('distribuer 20, 13, 1, 100'),['distribuer','20-13-1-100']);
 assert.deepEqual(words('distribuer 20 13-1 100'),['distribuer','20-13-1-100']);
 const game=createAdventure({start:1,rooms:[{id:1,description:'Salle.',exits:{sud:1}}],actions:[{place:[1],verb:"s'asseoir",noun:['chaise'],text:'Assis.'},{place:[1],verb:'distribuer',noun:['1-2-3-4'],text:'Bravo.',animation:'cartes'}]});
 const s=game.fresh();
 assert.equal(game.handle(s,"s'asseoir sur la chaise").replies[0],'Assis.');
 const dealt=game.handle(s,'distribuer 1, 2, 3, 4');
 assert.equal(dealt.replies[0],'Bravo.');assert.deepEqual(dealt.animation,{name:'cartes',words:['1-2-3-4']});
});
test('an action marked "alone" answers the verb alone; another one without noun answers the verb with anything else',()=>{
 const game=createAdventure({start:1,rooms:[{id:1,description:'Salle.'}],actions:[
  {place:[1],verb:'regarder',noun:[],text:'Rien de tel ici.'},{place:[1],verb:'regarder',noun:[],alone:true,text:'Une pièce vide.'},
  {place:[1],verb:'regarder',noun:['porte'],text:'Une porte.'}]});
 const s=game.fresh();
 assert.equal(game.handle(s,'regarder').replies[0],'Une pièce vide.');
 assert.equal(game.handle(s,'regarder la table').replies[0],'Rien de tel ici.');
 assert.equal(game.handle(s,'regarder la porte').replies[0],'Une porte.');
});
test('card dealing streams a bounded low-resolution GIF',async()=>{
 const {renderAnimation,renderStats}=require('../utils/adventure/animations'),{gifInfo}=require('../utils/gifInfo');
 const {createRenderGate,createBudget}=require('../utils/mediaRender'),gate=createRenderGate({budget:()=>createBudget({maxDuration:60000})});
 const gif=await renderAnimation('cartes',['20-13-1-100'],{schedule:(task,options)=>gate.run(task,options)});
 assert.ok(gif,'render should fit its memory/time budget');assert.equal(gif.name,'distribution.gif');
 assert.deepEqual(gifInfo(gif.attachment,{maxFrames:64}),{width:360,height:308,frames:29});
 assert.equal(renderStats().frameBuffers,1);assert.equal(renderStats().indexedWorkingBytes,360*308*4);
 assert.equal(await renderAnimation('cartes',[]),null);
 const clean=await renderAnimation('cartes',['20-13-1-100']),noisy=await renderAnimation('cartes',['20-abc-13-1-22-100']);
 assert.ok(noisy.attachment.equals(clean.attachment));
 assert.equal(await renderAnimation('cartes',['abc','0','42']),null);
 await assert.rejects(renderAnimation('rien',[]),/inconnue/);
});

test('a deal is four distinct cards; 0, banjo and excuse are all the Excuse',async()=>{
 const {renderAnimation}=require('../utils/adventure/animations');
 assert.equal(await renderAnimation('cartes',['1-1-7-1']),null);   // a card typed again is dealt once: three cards
 assert.equal(await renderAnimation('cartes',['1-2-3-4-5']),null);
 const excuse=await renderAnimation('cartes',['1-2-3-100']);
 for(const alias of ['0','banjo','Excuse'])assert.ok((await renderAnimation('cartes',['1-2-3-'+alias])).attachment.equals(excuse.attachment));
});

test('in the final room, players wait for the others; one arriving after the end still wins',async()=>{
 const {sent,client,user}=fakeDiscord();
 const tiny={start:1,rooms:[{id:1,description:'Entrée.',exits:{nord:2}},{id:2,description:'Trône.'}],final:{room:2,players:2,victory:'Victoire !',closing:'Fin.'}};
 const adv=createAdventureDiscord({client,data:tiny,store:{load:()=>null,save:()=>{}},channelId:'c'});
 for(const id of ['a','b','c'])await adv.handle(button(user(id),true).i);
 const go=async id=>{adv.message(dm(user(id),'nord'));for(let i=0;i<30;i++)await tick();};
 await go('a');
 assert.ok(sent.dm.some(([id,m])=>id==='a'&&/Il faut être 2.*vous êtes 1/.test(m.content)));
 await go('b');
 assert.equal(sent.dm.filter(([,m])=>m.content==='Victoire !').length,2);assert.equal(sent.channels.c.length,1);
 await go('c');
 assert.ok(sent.dm.some(([id,m])=>id==='c'&&m.content==='Victoire !'));assert.equal(sent.channels.c.length,1);
});
test('the closing words go where the invitation was posted, even once the invitation channel has changed; a list is several messages',async()=>{
 const {sent,client,user}=fakeDiscord();
 const tiny={start:1,rooms:[{id:1,description:'Entrée.',exits:{nord:2}},{id:2,description:'Trône.'}],final:{room:2,players:1,victory:['Victoire !','Et gloire.'],closing:['Première partie.','x'.repeat(2500)]}};
 let saved=null;const store={load:()=>saved&&JSON.parse(saved),save:s=>{saved=JSON.stringify(s);}};
 const first=createAdventureDiscord({client,data:tiny,store,channelId:'old'});
 await first.handle({isChatInputCommand:()=>true,commandName:'aventure',memberPermissions:{has:()=>true},reply:async()=>{}});
 const adv=createAdventureDiscord({client,data:tiny,store,channelId:'new'});   // the bot restarted with another channel
 await adv.handle(button(user('a')).i);adv.message(dm(user('a'),'nord'));for(let i=0;i<30;i++)await tick();
 assert.equal(sent.channels.new,undefined);
 assert.deepEqual(sent.channels.old.slice(1).map(m=>m.content.length),['Première partie.'.length,1900,600]);   // after the invitation
 assert.deepEqual(sent.dm.filter(([,m])=>/Victoire|gloire/.test(m.content)).map(([,m])=>m.content),['Victoire !','Et gloire.']);
});
test('the notices channel hears of every game started (with its link on the website) and won',async()=>{
 const {sent,client,user}=fakeDiscord();
 const tiny={start:1,rooms:[{id:1,description:'Entrée.',exits:{nord:2}},{id:2,description:'Trône.'}],final:{room:2,players:1,victory:'Victoire !'}};
 const adv=createAdventureDiscord({client,data:tiny,store:{load:()=>null,save:()=>{}},channelId:'c',notifyChannelId:'notes',shareWait:50});
 const b=button({...user('123456'),globalName:'Estelle'});await adv.handle(b.i);
 assert.equal(sent.channels.notes,undefined);   // it waits for the platform's link
 adv.shared({'123456':'abc'});for(let i=0;i<5;i++)await tick();
 assert.equal(sent.channels.notes[0].content,'**Estelle** commence une partie de l’aventure.\nÀ suivre ici : <https://leliberlnews.fr/aventure/?p=abc>');
 adv.message(dm(user('123456'),'nord'));for(let i=0;i<30;i++)await tick();
 assert.match(sent.channels.notes[1].content,/^\*\*Estelle\*\* a terminé l’aventure !\nÀ suivre ici/);
 await adv.handle(button(user('999999')).i);await new Promise(r=>setTimeout(r,80));
 assert.equal(sent.channels.notes[2].content,'**999999** commence une partie de l’aventure.');   // no link given in time: the notice alone
});
test('an animation sent is kept in the log and handed once to the platform',async()=>{
 const {sent,client,user}=fakeDiscord();
 const tiny={start:1,rooms:[{id:1,description:'Bureau.'}],actions:[{place:[1],verb:'distribuer',noun:[],text:'Rien.',animation:'cartes'}],final:{room:2,players:1}};
 const adv=createAdventureDiscord({client,data:tiny,store:{load:()=>null,save:()=>{}},channelId:'c'});
 await adv.handle(button(user('123456'),true).i);
 adv.message(dm(user('123456'),'distribuer 1, 2, 3, 4'));for(let i=0;i<200&&!adv.snapshot()[0].log.at(-1)?.media?.length;i++)await tick();
 const reply=adv.snapshot()[0].log.at(-1);
 assert.equal(reply.media[0].type,'animation');assert.match(reply.media[0].sha,/^[0-9a-f]{40}$/);
 assert.equal(sent.dm.at(-1)[1].files[0].name,'distribution.gif');
 const media=adv.media();assert.equal(media.length,1);assert.equal(media[0].sha,reply.media[0].sha);
 adv.mediaSent([media[0].sha]);assert.equal(adv.media().length,0);
});
test('the sync sends a game as soon as it moves',async()=>{
 const {startAdventureSync}=require('../utils/adventure/platformSync');
 let version=1,listener=null;const calls=[];
 const adventure={version:()=>version,snapshot:()=>[],media:()=>[],hint:async()=>{},subscribe:fn=>{listener=fn;return()=>{};}};
 const fetch=async(url,options)=>{calls.push(JSON.parse(options.body));return {ok:true,status:200,json:async()=>({hints:[]})};};
 const sync=startAdventureSync({adventure,token:'t',fetch,every:1e9,gather:5,log:()=>{}});
 version=2;listener();listener();
 await new Promise(r=>setTimeout(r,60));sync.stop();
 assert.equal(calls.length,1);assert.deepEqual(calls[0].players,[]);
});
test('memory pressure produces the complete final card table as PNG',async()=>{
 const {renderAnimation}=require('../utils/adventure/animations'),{createRenderGate,createBudget}=require('../utils/mediaRender'),{loadImage,createCanvas}=require('@napi-rs/canvas');
 const gate=createRenderGate({budget:()=>createBudget({available:()=>0}),canFallback:()=>true,onSkip:()=>{}});
 const image=await renderAnimation('cartes',['1-2-3-4'],{schedule:(task,options)=>gate.run(task,options)});
 assert.equal(image.name,'distribution.png');assert.equal(image.attachment.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 const decoded=await loadImage(image.attachment);assert.equal(decoded.width,360);assert.equal(decoded.height,308);
 const canvas=createCanvas(360,308),ctx=canvas.getContext('2d');ctx.drawImage(decoded,0,0);
 for(const [x,y]of [[53,154],[180,58],[307,154],[180,243]])assert.notDeepEqual([...ctx.getImageData(x,y,1,1).data],[47,93,58,255]);
});
test('PNG fallback attachments keep the correct MIME type in platform sync',async()=>{
 const {sent,client,user}=fakeDiscord(),{renderStill}=require('../utils/adventure/animations');
 const tiny={start:1,rooms:[{id:1,description:'Bureau.'}],actions:[{place:[1],verb:'distribuer',noun:[],text:'Rien.',animation:'cartes'}],final:{room:2,players:1}};
 const adv=createAdventureDiscord({client,data:tiny,store:{load:()=>null,save:()=>{}},channelId:'c',render:(_,words)=>renderStill(words)});
 await adv.handle(button(user('123456'),true).i);adv.message(dm(user('123456'),'distribuer 1-2-3-4'));
 for(let i=0;i<200&&!adv.snapshot()[0].log.at(-1)?.media?.length;i++)await tick();
 assert.equal(sent.dm.at(-1)[1].files[0].name,'distribution.png');assert.equal(adv.media()[0].type,'image/png');
});
test('every command typed is counted, beyond the exchanges the log keeps, with each distinct one and its uses',async()=>{
 const {client,user}=fakeDiscord();
 const adv=createAdventureDiscord({client,data,store:{load:()=>null,save:()=>{}},channelId:'c'});
 await adv.handle(button(user('a')).i);
 for(let i=0;i<70;i++)adv.message(dm(user('a'),i%2?'Écouter le vent…':'  inventaire '));
 for(let i=0;i<400;i++)await tick();
 const game=adv.snapshot()[0];
 assert.ok(game.log.filter(line=>line.kind==='command').length<70);   // the log only keeps the last exchanges
 assert.equal(game.typed.count,70);assert.deepEqual(game.typed.commands,{'inventaire':35,'écouter le vent':35});
});
test('a game begun before the count was kept starts from its log, marked partial',()=>{
 const {client}=fakeDiscord();
 const saved={players:{a:{room:'1'}},reached:[],done:false,logs:{a:[{kind:'command',text:'Nord'},{kind:'reply',text:'…'},{kind:'command',text:'nord'}]}};
 const adv=createAdventureDiscord({client,data,store:{load:()=>saved,save:()=>{}},channelId:'c'});
 const typed=adv.snapshot()[0].typed;assert.equal(typed.count,2);assert.deepEqual(typed.commands,{nord:2});assert.equal(typed.partial,true);assert.equal(typed.history.partial,true);
});
test('a long text is cut at a paragraph, else a sentence, never in the middle of one when it can be helped; each message is one whole line of the log',async()=>{
 const paragraph='Une phrase assez longue pour remplir le message. '.repeat(30).trim();   // about 1470 characters
 const parts=chunks(paragraph+'\n\n'+paragraph+'\n\n'+paragraph);
 assert.equal(parts.length,3);assert.ok(parts.every(p=>p===paragraph));
 const long='Une phrase assez longue pour remplir le message. '.repeat(60).trim();   // one paragraph, no line break
 assert.ok(chunks(long).every(p=>p.endsWith('message.')));
 const {sent,client,user}=fakeDiscord();
 const tiny={start:1,rooms:[{id:1,description:'Entrée.',exits:{nord:2}},{id:2,description:'Trône.'}],final:{room:2,players:1,victory:paragraph+'\n\n'+paragraph+' Fin.'}};
 const adv=createAdventureDiscord({client,data:tiny,store:{load:()=>null,save:()=>{}},channelId:'c'});
 await adv.handle(button(user('a')).i);adv.message(dm(user('a'),'nord'));for(let i=0;i<30;i++)await tick();
 const told=adv.snapshot()[0].log.filter(line=>line.kind==='reply').slice(-2).map(line=>line.text);
 assert.deepEqual(told,[paragraph,paragraph+' Fin.']);
});

test('room actions survive beyond the recent feed and survive restarting the bot',async()=>{const {client,user}=fakeDiscord();let saved;const store={load:()=>saved,save:s=>{saved=structuredClone(s);}},adv=createAdventureDiscord({client,data,store,channelId:'c'});await adv.handle(button(user('history')).i);adv.message(dm(user('history'),'regarder la porte'));adv.message(dm(user('history'),'nord'));for(let i=0;i<80;i++)adv.message(dm(user('history'),'inventaire'));for(let i=0;i<600;i++)await tick();const game=adv.snapshot()[0];assert.ok(!game.log.some(l=>l.text==='regarder la porte'));const lines=game.typed.history.lines;assert.equal(game.typed.history.partial,false);const command=lines.findIndex(l=>l.kind==='command'&&l.text==='regarder la porte');assert.equal(lines[command].room,'1');assert.match(lines[command+1].text,/chati/);const north=lines.findIndex(l=>l.kind==='command'&&l.text==='nord');assert.equal(lines[north].room,'1');assert.equal(lines[north+1].room,'2');const restored=createAdventureDiscord({client,data,store,channelId:'c'});assert.deepEqual(restored.snapshot()[0].typed.history,game.typed.history);});
test('room history has a bounded memory budget and never embeds animation payloads',()=>{const h=require('../utils/adventure/roomHistory'),history=h.create();for(let i=0;i<5000;i++){h.append(history,{kind:'command',room:'1',text:'ouvrir '+i,media:[{data:'secret'}]});h.append(history,{kind:'reply',room:'1',text:'x'.repeat(20000)});}assert.ok(history.lines.length<=h.MAX_LINES);assert.ok(history.bytes<=h.MAX_BYTES);assert.equal(history.partial,true);assert.equal(history.lines[0].kind,'command');assert.ok(!JSON.stringify(history).includes('secret'));});

test('production journal archives every line without growing the in-memory history, and deletion/reset distinguish runs',async t=>{const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'adventure-live-test-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));const archive=require('../utils/adventure/lineArchive').createLineArchive(dir),{client,user}=fakeDiscord();let saved;const store={load:()=>saved,save:s=>{saved=structuredClone(s);}},adv=createAdventureDiscord({client,data,archive,store,channelId:'c'});await adv.handle(button(user('123456')).i);const old=adv.snapshot()[0].archive.run;for(let i=0;i<90;i++)adv.message(dm(user('123456'),'inventaire'));for(let i=0;i<500;i++)await tick();assert.equal(adv.state.logs['123456'].length,120);assert.equal(adv.snapshot()[0].log.length,0);assert.equal(adv.snapshot()[0].typed.history,undefined);const batch=adv.archiveBatch();assert.ok(batch[0].lines.length>=181);const restored=createAdventureDiscord({client,data,archive,store,channelId:'c'});assert.equal(restored.snapshot()[0].archive.run,old);restored.message(dm(user('123456'),'/reset'));for(let i=0;i<40;i++)await tick();const next=restored.snapshot()[0].archive.run;assert.notEqual(next,old);restored.forget([{run:old,user:'123456'}]);assert.equal(restored.snapshot().length,1);restored.forget([{run:next,user:'123456'}]);assert.equal(restored.snapshot().length,0);assert.equal(restored.state.logs['123456'],undefined);});

test('deleting a run while a reply renders cannot recreate it when rendering finishes',async t=>{const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'adventure-delete-test-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));const archive=require('../utils/adventure/lineArchive').createLineArchive(dir),{client,user}=fakeDiscord(),tiny={start:1,rooms:[{id:1,description:'Salle.'}],actions:[{place:[1],verb:'distribuer',noun:[],text:'Cartes.',animation:'cartes'}]};let finish,started=false;const adv=createAdventureDiscord({client,data:tiny,archive,store:{load:()=>null,save:()=>{}},channelId:'c',render:()=>{started=true;return new Promise(resolve=>finish=resolve);}});await adv.handle(button(user('123456')).i);adv.message(dm(user('123456'),'distribuer 1 2 3 4'));for(let i=0;i<40&&!started;i++)await tick();assert.ok(started);const run=adv.snapshot()[0].archive.run;adv.forget([{user:'123456',run}]);finish({attachment:Buffer.from('x'),name:'cards.png'});for(let i=0;i<40;i++)await tick();assert.equal(adv.snapshot().length,0);assert.equal(adv.archiveBatch().length,0);assert.equal(adv.media().length,0);});
