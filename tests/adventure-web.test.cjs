const test=require('node:test'),assert=require('node:assert/strict'),express=require('express'),crypto=require('node:crypto'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {createAdventureDiscord}=require('../utils/adventure/discord');const {registerAdventureWeb}=require('../utils/adventure/web');
const fixture={start:1,intro:'Bienvenue',rooms:[{id:1,name:'Entrée',description:'Une porte.',exits:{nord:2}},{id:2,name:'Fin',description:'La fin.'}],objects:[{id:'cle',name:'Une clé'}],verbs:{prendre:['prends']},nouns:{cle:['clé']},actions:[{place:[1],verb:'prendre',noun:['cle'],give:['cle'],effect:['cle_prise'],mustnot:['cle_prise'],text:'Vous prenez la clé.'}],final:{room:2,players:2,victory:'Victoire !',closing:[]}};
function setup(){let saved=null,fetches=0;const store={load:()=>saved,save:s=>saved=structuredClone(s)};const client={users:{fetch:async()=>{fetches++;return {send:async()=>{}};}},channels:{fetch:async()=>({send:async()=>{}})}};const create=()=>createAdventureDiscord({client,data:fixture,store,channelId:null,shareWait:0,render:async()=>null});return {create,get fetches(){return fetches;}};}
const id='web_'+ 'a'.repeat(24),requestId=()=>crypto.randomUUID();
test('anonymous browser saves, retries, commands and restart use the existing game service',async()=>{const env=setup(),a=env.create();let r=await a.web({id,action:'start',requestId:requestId()});assert.equal(r.room.id,'1');assert.equal(env.fetches,0);
 const command={id,action:'command',text:'prendre la clé',requestId:requestId()};r=await a.web(command);const lines=r.lines.length;assert.equal(r.inventory[0].id,'cle');assert.equal((await a.web(command)).lines.length,lines);
 const reloaded=env.create();assert.equal(reloaded.webView(id).inventory[0].id,'cle');assert.notEqual(reloaded.webView(id).instance,a.webView(id).instance);assert.equal((await reloaded.web(command)).lines.length,lines);
 await reloaded.web({id,action:'command',text:'nord',requestId:requestId()});assert.equal(reloaded.webView(id).ended,false);
 const other='web_'+'b'.repeat(24);await reloaded.web({id:other,action:'start',requestId:requestId()});await reloaded.web({id:other,action:'command',text:'nord',requestId:requestId()});assert.equal(reloaded.webView(id).ended,true);assert.ok(reloaded.webView(id).lines.some(l=>l.text==='Victoire !'));assert.equal(env.fetches,0);
 await reloaded.web({id,action:'restart',requestId:requestId()});assert.equal(reloaded.webView(id).room.id,'1');assert.equal(reloaded.webView(id).inventory.length,0);
});
test('signed gateway rejects forged identities and expired capabilities',async()=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'adventure-web-test-')),secretFile=path.join(dir,'key');const env=setup(),app=express();app.use(express.json());registerAdventureWeb({app,adventure:env.create(),secretFile,teaserNotifications:{notify:async visitor=>({accepted:true,visitor})}});const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));const url='http://127.0.0.1:'+server.address().port+'/api/adventure/play';
 const secret=fs.readFileSync(secretFile,'utf8');const auth=(expires,player=id)=>{const v=player+'.'+expires;return 'Adventure '+v+'.'+crypto.createHmac('sha256',secret).update(v).digest('hex');};
 try{const call=authorization=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Authorization:authorization},body:JSON.stringify({action:'state',id:'123456789012345678'})});
  assert.equal((await call('')).status,401);assert.equal((await call(auth(Math.floor(Date.now()/1000)-1))).status,401);
  let response=await call(auth(Math.floor(Date.now()/1000)+120));assert.equal(response.status,200);assert.equal((await response.json()).started,false);
  assert.equal((await call(auth(Math.floor(Date.now()/1000)+120).replace(id,'web_'+'c'.repeat(24)))).status,401);
  response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Authorization:auth(Math.floor(Date.now()/1000)+120)},body:JSON.stringify({action:'countdown-reached',id:'forged',recipient:'forged'})});assert.equal(response.status,200);assert.deepEqual(await response.json(),{accepted:true,visitor:id});
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));fs.unlinkSync(secretFile);fs.rmdirSync(dir);}
});

test('browser card dealing sends ordered metadata without any server render',async()=>{
 const data={start:1,rooms:[{id:1,description:'Table.'}],actions:[{place:[1],verb:'distribuer',noun:[],text:'Cartes.',animation:'cartes'}]};let renders=0;
 const a=createAdventureDiscord({client:{},data,store:{load:()=>null,save:()=>{}},channelId:null,render:async()=>{renders++;throw Error('No server animation');}});
 await a.web({id,action:'start',requestId:requestId()});const view=await a.web({id,action:'command',text:'distribuer 20-13-1-100',requestId:requestId()});
 assert.equal(renders,0);assert.deepEqual(view.lines.at(-1).media,[{type:'cards',values:[20,13,1,100]}]);assert.equal(view.progress.room,'1');
});

test('browser chosen name persists in saves and admin snapshots without being reset by the gateway',async()=>{
 const env=setup(),a=env.create();await assert.rejects(a.web({id,action:'start',name:' ',requestId:requestId()}),/nom/);
 await a.web({id,action:'start',name:'  Éléonore du Lac  ',requestId:requestId()});
 assert.equal(a.webView(id).name,'Éléonore du Lac');assert.equal(a.snapshot()[0].name,'Éléonore du Lac');
 await a.web({id,action:'command',name:'Voyageur',text:'regarder',requestId:requestId()});assert.equal(a.webView(id).name,'Éléonore du Lac');
 const b=env.create();assert.equal(b.webView(id).name,'Éléonore du Lac');await b.web({id,action:'start',name:'Other',requestId:requestId()});assert.equal(b.webView(id).name,'Éléonore du Lac');
});

test('browser suggestions receive full command frequencies beyond the bounded recent feed',async()=>{
 const env=setup(),a=env.create();await a.web({id,action:'start',requestId:requestId()});
 for(let i=0;i<125;i++)await a.web({id,action:'command',text:i<123?'regarder':'réfléchir',requestId:requestId()});
 const view=env.create().webView(id);assert.equal(view.commandUsage.regarder,123);assert.equal(view.commandUsage['réfléchir'],2);
});

test('admin hints for anonymous browser players enter the saved journal without attempting Discord DMs',async()=>{
 const env=setup(),a=env.create();await a.web({id,name:'Browser player',action:'start',requestId:requestId()});
 await a.hint(id,'Cherchez près de la porte.');const line=a.webView(id).lines.at(-1);
 assert.equal(line.kind,'hint');assert.equal(line.text,'Cherchez près de la porte.');assert.ok(line.key);assert.equal(env.fetches,0);
 assert.equal(env.create().webView(id).lines.at(-1).text,line.text);
});
test('collective ending names each reader’s two actual companions in browser state and saved story',async()=>{
 const data={...fixture,final:{...fixture.final,players:3,victory:['Deux autres humains, pomifiés comme vous, sont désormais à vos côtés.']}};
 const a=createAdventureDiscord({client:{users:{fetch:async()=>({send:async()=>{}})}},data,store:{load:()=>null,save:()=>{}},channelId:null});
 const players=['a','b','c'].map(c=>'web_'+c.repeat(24));
 for(let i=0;i<3;i++){await a.web({id:players[i],name:['Alice','Benoît','Chloé'][i],action:'start',requestId:requestId()});await a.web({id:players[i],action:'command',text:'nord',requestId:requestId()});}
 assert.match(a.webView(players[0]).ending[0],/^Benoît et Chloé, deux autres humains pomifiés comme vous,/);
 assert.match(a.webView(players[1]).ending[0],/^Alice et Chloé,/);
 assert.ok(a.webView(players[0]).lines.some(l=>l.text.startsWith('Benoît et Chloé,')));
});
test('ending feedback mentions only the creator, is restricted to winners and survives retry/restart without duplicate posts',async()=>{
 let saved=null,posts=[];const client={channels:{fetch:async channel=>{assert.equal(channel,'889835278494203915');return {send:async payload=>{posts.push(payload);return {id:'message1'};}};}}};
 const store={load:()=>saved,save:s=>{saved=structuredClone(s);}};
 const make=()=>createAdventureDiscord({client,data:fixture,store,channelId:null});const a=make();
 await assert.rejects(a.feedback(id,'Très bien !',requestId()),e=>e.status===403);
 a.state.won.push(id);a.state.names[id]='Alice';
 await assert.rejects(a.feedback(id,'x'.repeat(1501),requestId()),e=>e.status===400);
 await Promise.all([a.feedback(id,'Super aventure ! @everyone',requestId()),a.feedback(id,'Super aventure ! @everyone',requestId())]);
 assert.equal(posts.length,1);assert.match(posts[0].content,/Alice/);assert.match(posts[0].content,/^<@369731837053894656>/);assert.deepEqual(posts[0].allowedMentions,{parse:[],users:['369731837053894656']});
 await make().feedback(id,'Nouvelle tentative',requestId());assert.equal(posts.length,1);
});
