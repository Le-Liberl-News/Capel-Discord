const test=require('node:test'),assert=require('node:assert/strict');
const {Client,GatewayIntentBits,Partials,ChannelType}=require('discord.js');
const {createAdventureDiscord}=require('../utils/adventure/discord');
const {createAdventure}=require('../utils/adventure/engine');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {createStateStore}=require('../utils/stateStore');
const player='130000000000000001',channelId='120000000000000001';
const data={start:1,rooms:[{id:1,description:'Une porte.',exits:{nord:2}},{id:2,description:'Une cour.',exits:{sud:1}}]};
function setup(store){
 const client=new Client({intents:[GatewayIntentBits.DirectMessages,GatewayIntentBits.MessageContent],partials:[Partials.Channel]});
 client.user=client.users._add({id:'100000000000000001',username:'Bot',discriminator:'0',bot:true});
 const sent=[],errors=[];
 client.channels.fetch=async id=>{
  assert.equal(id,channelId);
  const channel=client.channels._add({id,type:ChannelType.DM,recipients:[{id:player,username:'Alice',discriminator:'0'}]});
  channel.send=async payload=>{sent.push(payload);return {id:'150000000000000001'};};return channel;
 };
 const adventure=createAdventureDiscord({client,data,store,channelId:null,log:(...args)=>errors.push(args)});
 client.on('raw',packet=>adventure.rawMessage(packet));client.on('messageCreate',msg=>adventure.message(msg));
 function deliver(id,content,overrides={}){
  const d={id,channel_id:channelId,author:{id:player,username:'Alice',discriminator:'0',bot:false},content,timestamp:new Date().toISOString(),type:0,attachments:[],embeds:[],mentions:[],mention_roles:[],pinned:false,mention_everyone:false,tts:false,...overrides};
  const packet={t:'MESSAGE_CREATE',d};client.emit('raw',packet);client.actions.MessageCreate.handle(d);return packet;
 }
 const idle=async()=>{for(let i=0;i<40;i++)await new Promise(r=>setImmediate(r));assert.deepEqual(errors,[]);};
 return {client,adventure,sent,deliver,idle};
}
test('saved player resumes by DM after a genuine cold-cache restart without clicking the invitation',async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'adventure-dm-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const store=createStateStore(path.join(dir,'state.json'));store.save({players:{[player]:createAdventure(data).fresh()},reached:[],done:false});
 const first=setup(store);assert.equal(first.client.channels.cache.size,0);
 // The SDK sees the same raw packet and may emit messageCreate once the cache is warm.
 first.deliver('140000000000000001','nord');await first.idle();assert.equal(first.adventure.state.players[player].room,'2');assert.equal(first.sent.length,1);
 first.client.destroy();
 const restarted=setup(store);assert.equal(restarted.client.channels.cache.size,0);
 restarted.deliver('140000000000000002','sud');await restarted.idle();
 assert.equal(restarted.sent.length,1);assert.match(restarted.sent[0].content,/Une porte/);
 const packet=restarted.deliver('140000000000000003','nord');restarted.client.emit('raw',packet);await restarted.idle();
 assert.equal(restarted.sent.length,2,'Raw, native and repeated dispatches answer once');
 assert.deepEqual(restarted.adventure.state.logs[player].filter(l=>l.kind==='command').map(l=>l.text),['nord','sud','nord']);restarted.client.destroy();
});
test('cold-cache commands remain ordered; guild messages, bots and strangers do not enter the adventure',async()=>{
 let saved={players:{[player]:createAdventure(data).fresh()},reached:[],done:false};const env=setup({load:()=>saved,save:s=>{saved=structuredClone(s);}});
 env.deliver('140000000000000010','nord');env.deliver('140000000000000011','sud');await env.idle();
 assert.match(env.sent.at(-1).content,/Une porte/);assert.equal(env.sent.length,2);
 for(const d of [{guild_id:'160000000000000001',author:{id:player},content:'nord'},{author:{id:player,bot:true},content:'nord'},{author:{id:'170000000000000001'},content:'nord'}])assert.equal(env.adventure.rawMessage({t:'MESSAGE_CREATE',d:{...d,id:'140000000000000012',channel_id:channelId}}),false);
 await env.idle();assert.equal(env.sent.length,2);env.client.destroy();
});
