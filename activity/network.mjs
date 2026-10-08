export class ApiError extends Error {
 constructor(message,status=0){super(message);this.status=status;}
}
export async function fetchJson(url, options = {}) {
 const response=await fetch(url,{...options,signal:options.signal ?? AbortSignal.timeout(10000)});
 const text=await response.text(); let data;
 try { data=JSON.parse(text); } catch { throw new ApiError("Serveur temporairement indisponible (HTTP "+response.status+").",response.status===401?401:502); }
 if (!response.ok) throw new ApiError(data.erreur ?? "Connexion indisponible (HTTP "+response.status+").",response.status);
 return data;
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
