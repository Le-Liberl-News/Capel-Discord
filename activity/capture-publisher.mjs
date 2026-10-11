export function createCapturePublisher({send,wait=ms=>new Promise(resolve=>setTimeout(resolve,ms)),now=Date.now,onEvent=()=>{}}){
 const pending=new Map();
 return function publish({id,bytes,error}){
  if(error){onEvent('capture-encoding-error',{id,error});return Promise.resolve(false);}
  if(pending.has(id))return pending.get(id);
  const operation=(async()=>{
   const final=id.startsWith('duel-result:'),deadline=now()+(final?240000:30000);let attempt=0;
   while(true){attempt++;try{await send({id,bytes,final});onEvent('capture-posted',{id,attempt});return true;}
    catch(e){onEvent('capture-retry',{id,attempt,status:e.status??0});if([400,403,413].includes(e.status)||now()>=deadline){onEvent('capture-failed',{id,attempt,status:e.status??0});return false;}await wait(Math.min(final?10000:3000,1000*attempt));}
   }
  })().finally(()=>pending.delete(id));pending.set(id,operation);return operation;
 };
}
