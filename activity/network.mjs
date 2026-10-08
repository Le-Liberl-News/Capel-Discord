export class ApiError extends Error {
 constructor(message,status=0){super(message);this.status=status;}
}
export async function fetchJson(url, options = {}) {
 const response=await fetch(url,{...options,signal:options.signal ?? AbortSignal.timeout(10000)});
 const text=await response.text(); let data;
 try { data=JSON.parse(text); } catch { throw new ApiError("Serveur temporairement indisponible (HTTP "+response.status+"). Nouvelle tentative en cours.",response.status===401?401:502); }
 if (!response.ok) throw new ApiError(data.erreur ?? "Connexion indisponible (HTTP "+response.status+").",response.status);
 return data;
}
