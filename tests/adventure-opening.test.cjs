const {test}=require('node:test'),assert=require('node:assert/strict');
const {createOpening,OPENS_AT}=require('../utils/adventure/opening');
test('opening waits, publishes once, preserves direct link and explicitly allows the requested mentions',async()=>{
 let now=OPENS_AT-1,saved=null,posts=[],invites=0;
 const options={now:()=>now,store:{load:()=>saved,save:s=>{saved={...s};}},adventure:{publishInvitation:async()=>{invites++;return {channel:'1563508228019454024',message:'123'};}},client:{isReady:()=>true,channels:{fetch:async id=>{assert.equal(id,'915557045774716969');return {guildId:'456',send:async payload=>{posts.push(payload);return {id:'789'};}};}}}};
 const tick=createOpening(options);await tick();assert.equal(posts.length,0);
 now++;await Promise.all([tick(),tick()]);assert.equal(posts.length,1);assert.equal(invites,1);
 assert.match(posts[0].content,/^@everyone\n/);assert.match(posts[0].content,/https:\/\/discord.com\/channels\/456\/1563508228019454024\/123/);
 assert.match(posts[0].content,/appelée \*Dolce Traccia\*/);assert.match(posts[0].content,/\*\*Aisoce\*\*/);assert.equal(posts[0].files[0].name,'dolce-traccia.png');assert.ok(require('node:fs').existsSync(posts[0].files[0].attachment));
 assert.deepEqual(posts[0].allowedMentions,{parse:['everyone'],users:['369731837053894656']});
 await createOpening(options)();assert.equal(posts.length,1);
});
test('announcement failure remains retryable',async()=>{
 let attempts=0;
 const tick=createOpening({now:()=>OPENS_AT,store:{load:()=>null,save:()=>{}},adventure:{publishInvitation:async()=>({channel:'a',message:'b'})},client:{isReady:()=>true,channels:{fetch:async()=>({guildId:'g',send:async()=>{if(++attempts===1)throw Error('offline');return {id:'ok'};}})}}});
 await assert.rejects(tick());await tick();assert.equal(attempts,2);
});
