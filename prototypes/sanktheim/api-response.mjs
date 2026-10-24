export async function readSiegeResponse(response,route){
 const text=await response.text();let value;
 try{value=JSON.parse(text);}catch{
  const status=response.status,html=/^\s*</.test(text);
  const error=new Error(`Connexion à Sanktheim interrompue (${route.split('?')[0]}, HTTP ${status}${html?' : page HTML reçue': ' : réponse invalide'}). ${route.split('?')[0]==='arena'?'Nouvelle tentative en cours.':'Réessayez dans quelques instants.'}`);
  error.retryable=true;throw error;
 }
 if(!response.ok||value.error||value.erreur)throw Error(value.error??value.erreur??`Sanktheim : HTTP ${response.status}`);
 return value;
}
