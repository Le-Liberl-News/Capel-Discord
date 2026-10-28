// Explicit visitor-triggered private notifications; no channel posts or periodic jobs.
const crypto=require('node:crypto');
const RECIPIENT='744964573249011712',TTL=30*86400000,MAX=4096;
function createTeaserNotifications({client,store,now=Date.now}){
 const seen=store.load()||{},pending=new Map();
 async function deliver(visitor){const key=crypto.createHash('sha256').update(String(visitor)).digest('hex');
  if(seen[key])return {accepted:true,duplicate:true};if(pending.has(key))return pending.get(key);
  const task=(async()=>{const user=await client.users.fetch(RECIPIENT);await user.send({content:'Quelqu’un vient d’atteindre le compte à rebours de **Dolce Traccia**.\n<t:'+Math.floor(now()/1000)+':F>',allowedMentions:{parse:[]}});
   seen[key]=now();for(const [id,at]of Object.entries(seen))if(at<now()-TTL)delete seen[id];const ordered=Object.keys(seen).sort((a,b)=>seen[a]-seen[b]);for(const id of ordered.slice(0,Math.max(0,ordered.length-MAX)))delete seen[id];store.save(seen);return {accepted:true,duplicate:false};})();
  pending.set(key,task);try{return await task;}finally{pending.delete(key);}
 }
 return {notify:deliver};
}
module.exports={createTeaserNotifications,RECIPIENT};
