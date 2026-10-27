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
test('signed gateway rejects forged identities and expired capabilities',async()=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'adventure-web-test-')),secretFile=path.join(dir,'key');const env=setup(),app=express();app.use(express.json());registerAdventureWeb({app,adventure:env.create(),secretFile});const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));const url='http://127.0.0.1:'+server.address().port+'/api/adventure/play';
 const secret=fs.readFileSync(secretFile,'utf8');const auth=(expires,player=id)=>{const v=player+'.'+expires;return 'Adventure '+v+'.'+crypto.createHmac('sha256',secret).update(v).digest('hex');};
 try{const call=authorization=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Authorization:authorization},body:JSON.stringify({action:'state',id:'123456789012345678'})});
  assert.equal((await call('')).status,401);assert.equal((await call(auth(Math.floor(Date.now()/1000)-1))).status,401);
  let response=await call(auth(Math.floor(Date.now()/1000)+120));assert.equal(response.status,200);assert.equal((await response.json()).started,false);
  assert.equal((await call(auth(Math.floor(Date.now()/1000)+120).replace(id,'web_'+'c'.repeat(24)))).status,401);
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));fs.unlinkSync(secretFile);fs.rmdirSync(dir);}
});
