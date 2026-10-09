// Keep large scenes from opening hundreds of simultaneous HTTP requests.
export async function preloadAssets(urls,{fetcher=fetch,concurrency=6,onProgress=()=>{},createURL=URL.createObjectURL,revokeURL=URL.revokeObjectURL}={}){
 const queue=[...new Set(urls)],loaded=new Map();let next=0,done=0;
 async function worker(){while(next<queue.length){const url=queue[next++];let response,error;
  for(let attempt=0;attempt<3;attempt++){try{response=await fetcher(url);if(!response.ok)throw Error(`HTTP ${response.status}`);const blob=await response.blob();loaded.set(url,createURL(blob));error=null;break;}catch(e){error=e;if(attempt<2)await new Promise(resolve=>setTimeout(resolve,250*(attempt+1)));}}
  if(error)throw Error(`Chargement de ${new URL(url).pathname.split('/').pop()} : ${error.message}`);
  onProgress(++done,queue.length);
 }}
 const workers=await Promise.allSettled(Array.from({length:Math.min(concurrency,queue.length)},worker));
 const failure=workers.find(result=>result.status==='rejected');
 const dispose=()=>{for(const url of loaded.values())revokeURL(url);loaded.clear();};
 if(failure){dispose();throw failure.reason;}
 return {resolve:url=>loaded.get(url)??url,dispose};
}
