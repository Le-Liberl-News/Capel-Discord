// Run manually on the production host; never prints Discord credentials.
const fs=require('node:fs'),path=require('node:path');require('dotenv').config({quiet:true});
(async()=>{
 const receipt=path.resolve('.runtime/dolce-announcement-2026-10-28.json'),lock=receipt+'.lock';fs.mkdirSync(path.dirname(receipt),{recursive:true});
 if(fs.existsSync(receipt)){console.log('Announcement already sent.');return;}
 const fd=fs.openSync(lock,'wx');
 try{
 const url='https://leliberlnews.fr/aventure/dolce-traccia/',channel='915557045774716969';
 const page=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!page.ok||!/<title>\s*Dolce Traccia\s*<\/title>/.test(await page.text()))throw Error('Public page unavailable');
 const token=process.env.DISCORD_TOKEN;if(!token)throw Error('Discord credential unavailable');
 const api=async(route,method='GET',body)=>{const r=await fetch('https://discord.com/api/v10/'+route,{method,headers:{Authorization:'Bot '+token,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error('Discord HTTP '+r.status);return r.json();};
 const recent=await api('channels/'+channel+'/messages?limit=50');
 const matches=components=>(components||[]).some(c=>c.url===url||matches(c.components));
 let msg=recent.find(m=>m.author?.bot&&matches(m.components));
 if(!msg)msg=await api('channels/'+channel+'/messages','POST',{allowed_mentions:{parse:[]},components:[{type:1,components:[{type:2,style:5,label:'Une voix myst\u00e9rieuse vous appelle',url}]}]});
 fs.writeFileSync(receipt,JSON.stringify({message_id:msg.id,channel_id:channel,url}));console.log('Announcement confirmed: '+msg.id);
 }finally{fs.closeSync(fd);fs.unlinkSync(lock);}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
