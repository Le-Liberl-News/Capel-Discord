import {recordRequest} from './diagnostics.mjs';
export class ApiError extends Error {
 constructor(message,status=0){super(message);this.status=status;}
}
export async function fetchJson(url, options = {}) {
 const started=performance.now();let response,data,error;try{response=await fetch(url,{...options,signal:options.signal ?? AbortSignal.timeout(10000)});
 const text=await response.text(); 
 try { data=JSON.parse(text); } catch { throw new ApiError("Serveur temporairement indisponible (HTTP "+response.status+").",response.status===401?401:502); }
 if (!response.ok) throw new ApiError(data.erreur ?? "Connexion indisponible (HTTP "+response.status+").",response.status);
 return data;}catch(e){error=e;throw e;}finally{recordRequest(url,options,data,response?.status??0,performance.now()-started,error);}
}

export async function retryConnection(operation, { attempts = 8, onRetry = () => {}, wait = ms => new Promise(resolve => setTimeout(resolve, ms)) } = {}) {
 for (let attempt = 1; ; attempt++) {
  try { return await operation(); }
  catch (error) {
   const transient = (error instanceof ApiError && (error.status === 0 || error.status === 429 || error.status >= 500)) || error instanceof TypeError || error.name === "TimeoutError";
   if (!transient || attempt >= attempts) throw error;
   onRetry(error, attempt + 1, attempts);
   await wait(Math.min(2000, attempt * 500));
  }
 }
}
