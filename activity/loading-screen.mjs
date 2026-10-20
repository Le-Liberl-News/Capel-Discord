// The loading screen: the stage's picture, its name and a bar that follows the files three.js loads (its default
// loading manager, used by the scenes' loaders). It covers everything, menus included, so nothing can be clicked
// while a fight, the tower or a duel is being loaded.
import * as THREE from 'three';
const PICTURES={arena:'loading/arena.jpg',axis:'loading/axis.jpg',gehenna:'loading/gehenna.jpg',tower1:'loading/tower.jpg',tower2:'loading/tower.jpg',tower3:'loading/tower.jpg',tower4:'loading/tower.jpg'};
export function createLoadingScreen({assets}){
 // shown and hidden through `display` (an inline display beats the hidden attribute)
 const root=document.createElement('div');root.id='sky-loading';
 root.style.cssText='position:fixed;inset:0;z-index:60;display:none;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:#120e0c;color:#ffe7b0;font:16px system-ui;overflow:hidden';
 const blur=document.createElement('div');blur.style.cssText='position:absolute;inset:-40px;background:#120e0c center/cover no-repeat;filter:blur(18px) brightness(.45)';
 const card=document.createElement('div');card.style.cssText='position:relative;width:min(84vw,640px);aspect-ratio:16/9;border-radius:10px;border:2px solid #b49760;background:#201b18 center/cover no-repeat;box-shadow:0 10px 40px #000c';
 const title=document.createElement('p');title.style.cssText='position:relative;margin:0;font:26px Cinzel,Georgia,serif;letter-spacing:.04em;text-shadow:0 2px 10px #000';
 const track=document.createElement('div');track.style.cssText='position:relative;width:min(84vw,640px);height:12px;border-radius:6px;background:#2a2019;border:1px solid #6d5a3f;overflow:hidden';
 const bar=document.createElement('div');bar.style.cssText='height:100%;width:0;background:linear-gradient(90deg,#b49760,#ffd27a);transition:width .25s ease-out';
 const label=document.createElement('p');label.style.cssText='position:relative;margin:0;font:13px system-ui;color:#c9b48a';
 track.append(bar);root.append(blur,card,title,track,label);document.body.append(root);
 let shown=false,best=0,done=0,total=0,creep=null;
 const draw=()=>{bar.style.width=Math.round(best*100)+'%';label.textContent=total?`Chargement… ${done} / ${total}`:'Chargement…';};
 // the share never goes back, even when new files are discovered on the way
 const progress=(loaded,count)=>{if(!shown)return;done=loaded;total=count;best=Math.max(best,Math.min(.97,count?loaded/count:0));draw();};
 const manager=THREE.DefaultLoadingManager,previous=manager.onProgress;
 manager.onProgress=(url,loaded,count)=>{progress(loaded,count);previous?.(url,loaded,count);};
 return {
  // map: the stage being loaded (arena, axis, gehenna, tower1…); name: the title shown
  show(map,name){
   const picture=PICTURES[map],url=picture?'url('+JSON.stringify(new URL(picture,assets).href)+')':'none';
   blur.style.backgroundImage=url;card.style.backgroundImage=url;card.style.display=picture?'':'none';title.textContent=name??'';
   shown=true;best=.03;done=total=0;draw();root.style.display='flex';
   // between the files it can count (data, set-up) the bar still creeps on, slower and slower, up to 60 %
   clearInterval(creep);creep=setInterval(()=>{if(best<.6){best+=(.6-best)*.04;draw();}},200);
  },
  // the bar fills, then the screen goes
  hide(){if(!shown)return;shown=false;clearInterval(creep);best=1;draw();setTimeout(()=>{if(!shown)root.style.display='none';},300);},
  get visible(){return shown;}
 };
}