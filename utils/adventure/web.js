// Anonymous browser sessions are signed by the PHP gateway; game rules and storage stay in the bot.
const crypto=require('node:crypto');
const fs=require('node:fs'),path=require('node:path');
function registerAdventureWeb({app,adventure,teaserNotifications=null,authenticate=null,secretFile=path.join(__dirname,'../../.runtime/adventure-web.key')}){
 let secret=null;if(!authenticate){fs.mkdirSync(path.dirname(secretFile),{recursive:true});try{fs.writeFileSync(secretFile,crypto.randomBytes(32).toString('hex'),{flag:'wx',mode:0o600});}catch(e){if(e.code!=='EEXIST')throw e;}secret=fs.readFileSync(secretFile,'utf8').trim();if(!/^[a-f0-9]{64}$/.test(secret))throw Error('Invalid adventure web key');}
 const rates=new Map();
 async function identify(req){if(authenticate)return authenticate(req);
  const parts=String(req.headers.authorization||'').match(/^Adventure (web_[a-f0-9]{24})\.(\d{10})\.([a-f0-9]{64})$/);
  if(!parts)throw Object.assign(Error('Session de jeu invalide.'),{status:401});
  const [,id,expires,signature]=parts,now=Math.floor(Date.now()/1000);
  const expected=crypto.createHmac('sha256',secret).update(id+'.'+expires).digest('hex');
  if(Number(expires)<now||Number(expires)>now+300||!crypto.timingSafeEqual(Buffer.from(expected,'hex'),Buffer.from(signature,'hex')))throw Object.assign(Error('Session de jeu expirée.'),{status:401});
  return {id,name:'Voyageur'};
 }
 app.post('/api/adventure/play',async(req,res)=>{res.set('Cache-Control','no-store');try{
  const user=await identify(req),action=String(req.body?.action||'state');
  if(rates.size>1024)for(const [key,v]of rates)if(v.until<Date.now())rates.delete(key);
  const rate=rates.get(user.id)||{until:0,count:0};if(rate.until<Date.now()){rate.until=Date.now()+60000;rate.count=0;}rate.count++;rates.set(user.id,rate);
  if(rate.count>120)throw Object.assign(Error('Trop de requêtes. Patientez quelques instants.'),{status:429});
  if(action==='countdown-reached'){if(!teaserNotifications)throw Object.assign(Error('Notification indisponible.'),{status:503});return res.json(await teaserNotifications.notify(user.id));}
  if(action==='feedback')return res.json(await adventure.feedback(user.id,req.body?.text,req.body?.requestId));
  if(action==='media'){const media=adventure.webMedia(user.id,{file:req.body.file,sha:req.body.sha});if(!media)return res.status(404).json({error:'Illustration indisponible.'});return res.json(media);}
  const result=await adventure.web({...user,name:action==='start'?req.body?.name:undefined,action,text:req.body?.text,requestId:req.body?.requestId});res.json(result);
 }catch(e){res.status(e.status||503).json({error:e.status?e.message:'La partie est temporairement indisponible. Votre progression est conservée.'});}});
 return {identify};
}
module.exports={registerAdventureWeb};
