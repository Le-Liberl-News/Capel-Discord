// The adventure followed from the platform's editor (plateforme/aventure.php, « Parties »): every few seconds the bot
// sends the players' games when they changed and fetches the hints written there, which it sends in DM. Hints it could
// not deliver are reported on the next sync. Uses Capel's API token (PLATFORM_TOKEN), an account with the editor.
const PLATFORM_URL=(process.env.PLATFORM_URL||'https://leliberlnews.fr').replace(/\/+$/,'');
function startAdventureSync({adventure,token=process.env.PLATFORM_TOKEN,every=10000,fetch=globalThis.fetch,log=console.error}){
 let sentVersion=-1,failed=[],busy=false,warned=false;
 async function tick(){
  if(busy||!token)return;
  busy=true;
  try{
   const version=adventure.version(),body={failed};
   if(version!==sentVersion)body.players=adventure.snapshot();
   const response=await fetch(`${PLATFORM_URL}/plateforme/api/aventure.php`,{method:'POST',
    headers:{Accept:'application/json','Content-Type':'application/json',Authorization:`Bearer ${token}`,'X-Platform-Token':token},
    body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
   const data=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(data.error||`HTTP ${response.status}`);
   sentVersion=version;failed=[];warned=false;
   for(const hint of data.hints||[]){
    try{await adventure.hint(hint.user,hint.text);}
    catch(e){failed.push({id:hint.id,error:String(e.code??e.message??e).slice(0,200)});}
   }
  }catch(e){
   // one line per outage, not one every ten seconds
   if(!warned){log('Aventure, synchro plateforme :',e.message);warned=true;}
  }finally{busy=false;}
 }
 if(!token)log('Aventure : PLATFORM_TOKEN absent, les parties ne sont pas suivies sur la plateforme.');
 const timer=setInterval(tick,every);
 timer.unref?.();
 return {tick,stop:()=>clearInterval(timer)};
}
module.exports={startAdventureSync};
