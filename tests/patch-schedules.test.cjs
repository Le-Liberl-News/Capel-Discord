const {test}=require('node:test');
const assert=require('node:assert/strict');
const {PatchReleaseService}=require('../utils/patchReleaseService');
test('Each game polls its persistent schedule; repeated polls cannot overlap',async()=>{
 for(const project of ['sky-sc','sky-fc','sky-3rd']){
  const service=new PatchReleaseService({client:{},token:'fixture',channelId:'fixture',project});
  let calls=0,release;
  service.github=async(method,path,body)=>{calls++;assert.equal(method,'POST');assert.equal(path,'/plateforme/api/build.php');assert.deepEqual(body,{project,action:'scheduled'});await new Promise(resolve=>release=resolve);return {status:'started'};};
  const pending=service.checkScheduledBuild();
  assert.equal(await service.checkScheduledBuild(),undefined);assert.equal(calls,1);
  release();assert.equal((await pending).status,'started');assert.equal(service.checkingSchedule,false);
 }
});
test('A scheduling error is reported and releases the polling guard',async()=>{
 const service=new PatchReleaseService({client:{},token:'fixture',channelId:'fixture'});
 service.github=async()=>({status:'error',error:'GitHub indisponible'});
 await assert.rejects(service.checkScheduledBuild(),/GitHub indisponible/);assert.equal(service.checkingSchedule,false);
});
test('The old hard-coded nightly job cannot bypass a disabled schedule',()=>{
 const source=require('node:fs').readFileSync(require('node:path').join(__dirname,'../index.js'),'utf8');
 assert.ok(!source.includes("cron.schedule('0 3 * * *'"));assert.ok(source.includes('await service.checkScheduledBuild()'));
});
