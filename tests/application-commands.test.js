const test=require("node:test"),assert=require("node:assert/strict");
const {syncApplicationCommands}=require("../utils/syncApplicationCommands");
test("registration preserves the activity entry point and verifies the real bot application",async()=>{
 let state=[{id:"launch-id",type:4,name:"launch",description:"Launch",handler:2,application_id:"actual-bot",version:"ignored"}];
 const rest={get:async route=>route==="/oauth2/applications/@me"?{id:"actual-bot"}:state,put:async(route,{body})=>{assert.equal(route,"/applications/actual-bot/commands");assert.equal(body[1].id,"launch-id");assert.equal(body[1].handler,2);assert.equal(body[1].application_id,undefined);state=body;}};
 const registered=await syncApplicationCommands(rest,[{type:1,name:"duel",description:"Duel"}]);assert.ok(registered.some(c=>c.name==="duel"));assert.ok(registered.some(c=>c.type===4));
});
test("a missing command fails deployment verification",async()=>{
 const rest={get:async route=>route==="/oauth2/applications/@me"?{id:"app"}:[],put:async()=>{}};
 await assert.rejects(()=>syncApplicationCommands(rest,[{name:"duel",type:1}]),/duel/);
});

 test("prophunt is registered with an optional 1-30 minute duration",()=>{ const command=require("../utils/applicationCommands").commands.find(c=>c.name==="prophunt");assert.ok(command);assert.equal(command.options[0].min_value,1);assert.equal(command.options[0].max_value,30); });
