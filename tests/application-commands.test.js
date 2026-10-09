const test=require("node:test"),assert=require("node:assert/strict");
const {syncApplicationCommands}=require("../utils/syncApplicationCommands");
test("registration preserves the activity entry point and verifies the real bot application",async()=>{
 let state=[{id:"launch-id",type:4,name:"launch",description:"Launch",handler:2,application_id:"actual-bot",version:"ignored"}];
 const rest={get:async route=>route==="/oauth2/applications/@me"?{id:"actual-bot"}:state,put:async(route,{body})=>{assert.equal(route,"/applications/actual-bot/commands");assert.equal(body[1].id,"launch-id");assert.equal(body[1].handler,1);assert.equal(body[1].application_id,undefined);state=body;}};
 const registered=await syncApplicationCommands(rest,[{type:1,name:"duel",description:"Duel"}]);assert.ok(registered.some(c=>c.name==="duel"));assert.ok(registered.some(c=>c.type===4));
});
test("a missing command fails deployment verification",async()=>{
 const rest={get:async route=>route==="/oauth2/applications/@me"?{id:"app"}:[],put:async()=>{}};
 await assert.rejects(()=>syncApplicationCommands(rest,[{name:"duel",type:1}]),/duel/);
});

 test("prophunt is registered with an optional 1-30 minute duration",()=>{ const command=require("../utils/applicationCommands").commands.find(c=>c.name==="prophunt");assert.ok(command);assert.equal(command.options[0].min_value,1);assert.equal(command.options[0].max_value,30); });

test("activity entry sends only a private launch button, and launches from a DM",async()=>{
 const {handleActivityEntry}=require("../utils/activityEntry");let dm,reply,flags,launched=false;
 await handleActivityEntry({isChatInputCommand:()=>true,commandName:"anterose",channel:{isDMBased:()=>false},deferReply:async x=>flags=x.flags,user:{send:async x=>{dm=x;return{channelId:"private"};}},editReply:async x=>reply=x});
 assert.equal(flags,64);assert.equal(dm.components[0].components[0].custom_id,"activity:enter-private");assert.match(reply.components[0].components[0].url,/@me\/private$/);
 await handleActivityEntry({isButton:()=>true,customId:"activity:enter-private",channel:{isDMBased:()=>true},launchActivity:async()=>launched=true});assert.equal(launched,true);
});
