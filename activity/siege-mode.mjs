import screen from '../prototypes/sanktheim/screen.html';
import {startSiege} from '../prototypes/sanktheim/arena-front.mjs';
import {enterFinale,playFinale,farewell} from '../prototypes/sanktheim/finale-live.mjs';
export {finaleFlag} from '../prototypes/sanktheim/finale-live.mjs';
let opening;
export function openSiege(options){return opening??=mountSiege({...options,onFinale:enterFinale});}
function mountScreen(){document.body.replaceChildren();const template=document.createElement('template');template.innerHTML=screen;document.body.append(template.content.cloneNode(true));}
// the finale's film (finale-live.mjs), or the siege's end once it is over
export async function openFinale(get){mountScreen();try{await playFinale({get});}catch(error){console.error(error);farewell('Le siège de Sanktheim est terminé.',"Merci d'avoir joué !");}}
export function siegeClosed(){mountScreen();farewell('Le siège de Sanktheim est terminé.',"Merci d'avoir joué !");}
async function mountSiege(options){
 // Keep the SDK/session in this document; no tokens in URLs or browser storage.
 mountScreen();
 try{return await startSiege(options);}
 catch(error){const text=document.createElement('p');text.textContent='Impossible de rejoindre le siège : '+error.message;document.body.append(text);const back=document.createElement('button');back.textContent='Retour au Capel';back.onclick=()=>location.reload();document.body.append(back);throw error;}
}
