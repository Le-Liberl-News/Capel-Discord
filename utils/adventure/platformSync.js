// The adventure followed from the platform (plateforme/aventure.php « Parties », and the spectators' page
// /aventure/?p=…): the bot sends a game as soon as it moves (gathered over a moment), with the animations drawn since,
// and asks every few seconds for the hints written there, which it sends in DM. Hints it could not deliver are
// reported on the next sync; the platform answers with the spectators' links of the games sent. Uses Capel's API
// token (PLATFORM_TOKEN), an account with the editor.
const PLATFORM_URL=(process.env.PLATFORM_URL||'https://leliberlnews.fr').replace(/\/+$/,'');
function startAdventureSync({adventure,token=process.env.PLATFORM_TOKEN,every=3000,gather=300,fetch=globalThis.fetch,log=console.error}){
 let sentVersion=-1,failed=[],busy=false,again=false,warned=false,soon=null;
 async function tick(){
  if(!token)return;
  if(busy){again=true;return;}
  busy=true;
  try{
   const version=adventure.version(),body={failed},media=adventure.media?.()||[];
   if(version!==sentVersion)body.players=adventure.snapshot();
   const archives=adventure.archiveBatch?.()??[];if(archives.length)body.archives=archives.map(({end,...item})=>item);
   if(media.length)body.media=media;
   const response=await fetch(`${PLATFORM_URL}/plateforme/api/aventure.php`,{method:'POST',
    headers:{Accept:'application/json','Content-Type':'application/json',Authorization:`Bearer ${token}`,'X-Platform-Token':token},
    body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
   const data=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(data.error||`HTTP ${response.status}`);
   sentVersion=version;failed=[];warned=false;
   adventure.archiveAck?.(archives,data.archived??[]);adventure.forget?.(data.deleted??[]);
   if(media.length)adventure.mediaSent?.(media.map(item=>item.sha));
   adventure.shared?.(data.shares);   // the spectators' links of the games just sent
   for(const hint of data.hints||[]){
    try{await adventure.hint(hint.user,hint.text);}
    catch(e){failed.push({id:hint.id,error:String(e.code??e.message??e).slice(0,200)});}
   }
  }catch(e){
   // one line per outage, not one every few seconds
   if(!warned){log('Aventure, synchro plateforme :',e.message);warned=true;}
  }finally{
   busy=false;
   if(again){again=false;setTimeout(tick,0);}
  }
 }
 if(!token)log('Aventure : PLATFORM_TOKEN absent, les parties ne sont pas suivies sur la plateforme.');
 // a change is sent at once, the exchanges of a moment together
 const unsubscribe=adventure.subscribe?.(()=>{if(!soon)soon=setTimeout(()=>{soon=null;tick();},gather);});
 const timer=setInterval(tick,every);
 timer.unref?.();
 return {tick,stop:()=>{clearInterval(timer);clearTimeout(soon);unsubscribe?.();}};
}
module.exports={startAdventureSync};
