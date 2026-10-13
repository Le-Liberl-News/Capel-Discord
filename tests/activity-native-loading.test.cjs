const test=require('node:test'),assert=require('node:assert/strict');
test('native bank initially loads shared essentials, then coalesces requested effects',async()=>{
 const previous=global.fetch,calls=[];
 const entries=['Third/cr151_00._ef','SC/mp050_00._ef','SC/extra._ef'].map((id,i)=>({id,game:id.split('/')[0],animation:`animations/${i}.json`}));
 global.fetch=async url=>{calls.push(String(url));return {ok:true,json:async()=>String(url).includes('catalogue.json')?entries:{children:[],textures:[],parts:[{index:0,enabled:false,textureIndex:0,flags:0,renderFlags:1,duration:1,position:[],rotation:[],angular:[],scale:[],color:[],emissions:[]}]}};};
 try{const {loadNativeEffects}=await import('../activity/native-effects.mjs');const bank=await loadNativeEffects(new URL('https://fixture.invalid/lazy-native/'));assert.equal(bank.size,2);assert.equal(calls.length,3);assert.equal(bank.has('sc/extra._ef'),false);await bank.ensure(['sc/extra._ef','SC/extra._ef']);assert.equal(bank.size,3);assert.equal(calls.length,4);await bank.ensure(['sc/extra._ef']);assert.equal(calls.length,4);}finally{global.fetch=previous;}
});
