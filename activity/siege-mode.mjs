import screen from '../prototypes/sanktheim/screen.html';
import {startSiege} from '../prototypes/sanktheim/arena-front.mjs';
export async function openSiege(options){
 // Keep the SDK/session in this document; no tokens in URLs or browser storage.
 document.body.replaceChildren();
 const template=document.createElement('template');template.innerHTML=screen;
 document.body.append(template.content.cloneNode(true));
 try{return await startSiege(options);}
 catch(error){const text=document.createElement('p');text.textContent='Impossible de rejoindre le siège : '+error.message;document.body.append(text);const back=document.createElement('button');back.textContent='Retour au Capel';back.onclick=()=>location.reload();document.body.append(back);throw error;}
}
