// The finale, live, in the players' own clients: when the server's finale (core.cjs's FINALE) reaches its cinematic,
// the siege client reloads into it (arena-front.mjs calls onFinale); the film is drawn in real time from the archived
// moment (finale-archive.cjs), in step with the server's clock so that its gate falls as the real one does, with its
// music; then the black, and the thanks. A client that comes after the film is told the siege is over.
import director from './finale-cinematic.cjs';
import './finale-cinematic-entry.mjs';
import {ASSETS} from '../../activity/sky-scene.mjs';
const FLAG='sanktheim-finale',THANKS=8;
export const finaleFlag={get:()=>{try{return sessionStorage.getItem(FLAG);}catch{return null;}},set:v=>{try{v?sessionStorage.setItem(FLAG,v):sessionStorage.removeItem(FLAG);}catch{}}};
// the siege client meets the finale: back to the start, into the film
export function enterFinale(){if(finaleFlag.get())return;finaleFlag.set('1');location.reload();}

// a screen over everything: the thanks, or the siege's end
export function farewell(text,sub=''){
 const el=document.createElement('div');el.id='finale-farewell';
 el.style.cssText='position:fixed;inset:0;z-index:100000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#000;color:#f3e2bd;font:600 clamp(22px,5vw,48px)/1.2 Georgia,serif;text-align:center;padding:16px;opacity:0;transition:opacity 1.6s';
 const title=document.createElement('div');title.textContent=text;el.append(title);
 if(sub){const s=document.createElement('div');s.textContent=sub;s.style.cssText='font:400 clamp(14px,2.6vw,20px)/1.4 Georgia,serif;color:#c9b48a;max-width:640px';el.append(s);}
 document.body.append(el);requestAnimationFrame(()=>el.style.opacity='1');return el;
}

// get: (route) => JSON from the activity's API relay
export async function playFinale({get}){
 finaleFlag.set(null);
 const status=await get('siege/status'),offset=status.serverTime-Date.now(),fin=status.finale;
 const film=()=>(Date.now()+offset-fin.cinematicAt)/1000;
 if(!fin?.cinematicAt||film()>director.DURATION+THANKS){farewell('Le siège de Sanktheim est terminé.','Merci d\'avoir joué !');return;}
 const {moments}=await get('siege/finale'),last=moments?.length?await get('siege/finale&i='+(moments.length-1)):null;
 if(!last){farewell('Le siège de Sanktheim est terminé.','Merci d\'avoir joué !');return;}
 await window.loadFinale({base:last});
 const music=new Audio(new URL('sanktheim/music/finale.mp3',ASSETS).href);music.volume=.8;
 const play=()=>{music.currentTime=Math.max(0,film());music.play().catch(()=>{});};play();
 // the browser may want a touch before it plays a sound
 const sound=document.createElement('button');sound.textContent='🔊 Activer le son';sound.style.cssText='position:fixed;right:16px;bottom:16px;z-index:100001;padding:10px 16px;border-radius:8px;border:1px solid #c9b48a;background:#2b2116;color:#f3e2bd;font:600 15px Georgia,serif';
 sound.onclick=()=>{play();sound.remove();};music.addEventListener('playing',()=>sound.remove(),{once:true});document.body.append(sound);
 for(let t=film();t<director.DURATION;t=film()){await window.drawFinale(Math.max(0,t));await new Promise(r=>requestAnimationFrame(r));}
 await window.drawFinale(director.DURATION-.01);
 farewell('Merci d\'avoir joué !','La porte de Sanktheim est tombée.');
 const fade=setInterval(()=>{music.volume=Math.max(0,music.volume-.04);if(!music.volume){music.pause();clearInterval(fade);}},250);
}
