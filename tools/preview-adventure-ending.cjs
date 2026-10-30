// Manual, owner-authorized preview only. Does not start or finish a game.
require('dotenv').config({quiet:true});
const fs=require('node:fs'),path=require('node:path');
const {messages}=require('./utils/adventure/discord');
(async()=>{
 const receipt=path.resolve('.runtime/ending-preview-2026-10-30.json');
 if(fs.existsSync(receipt)){console.log('Preview already delivered.');return;}
 const api=async(route,body)=>{
  const response=await fetch('https://discord.com/api/v10/'+route,{method:'POST',headers:{Authorization:'Bot '+process.env.DISCORD_TOKEN,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(25000)});
  if(!response.ok)throw Error('Discord HTTP '+response.status);return response.json();
 };
 const dm=await api('users/@me/channels',{recipient_id:'744964573249011712'});
 const parts=messages(require('./rpg/data/aventure.json').final.victory),ids=[];
 for(let i=0;i<parts.length;i++){
  const message=await api('channels/'+dm.id+'/messages',{content:parts[i],allowed_mentions:{parse:[]},nonce:'ending-20261030-'+i,enforce_nonce:true});ids.push(message.id);
 }
 fs.mkdirSync(path.dirname(receipt),{recursive:true});fs.writeFileSync(receipt,JSON.stringify({messages:ids}),{mode:0o600});
 console.log('Ending preview delivered in '+ids.length+' private messages.');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
