export function createNpcTalkView({canvas,getState,getOwn,send,scale}){
 let last=0,disposed=false;const button=document.createElement('button');button.hidden=true;button.style.cssText='position:fixed;bottom:145px;left:50%;transform:translateX(-50%);z-index:36;padding:8px 12px;border:1px solid #b59b67;border-radius:5px;background:#182a2fee;color:#ffe7b0;font:13px system-ui';document.body.append(button);
 function nearby(){const p=getOwn();if(!p||p.hp<=0||p.pomControlled||p.vehicleControl||p.lynxControl||p.turretControl||p.climb)return null;return getState().soldiers.filter(s=>s.hp>0&&!s.sleeping&&Math.abs(s.y-p.y)<2*scale&&Math.hypot(s.x-p.x,s.z-p.z)<3.5*scale).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))[0];}
 function talk(){const s=nearby();if(!s)return false;if(performance.now()-last<700)return true;last=performance.now();send({type:'npc-talk',target:s.id});return true;}
 function key(e){if(e.code!=='KeyE'||e.repeat||e.target.closest?.('input,textarea,[contenteditable=true]'))return;if(talk()){e.preventDefault();e.stopImmediatePropagation();}}
 function down(e){if(e.button===2&&talk()){e.preventDefault();e.stopImmediatePropagation();}}
 function context(e){if(nearby()){e.preventDefault();e.stopImmediatePropagation();}}
 button.onclick=talk;document.addEventListener('keydown',key,true);canvas.addEventListener('pointerdown',down,true);canvas.addEventListener('contextmenu',context,true);
 // pomgarou meat in hand and a hungry soldier: talking feeds them (wildlife.cjs)
 const hunger=s=>{const at=getState().at;return Math.max(0,(s.hunger??100)-(at-(s.hungerAt??at))/86400000*100);};
 return {update(){if(disposed)return;const s=nearby();button.hidden=!s;if(s){const h=hunger(s),feed=getOwn()?.meat>0&&h<75;button.textContent=(feed?'Nourrir '+s.name+' (faim '+Math.round(h)+' %)':'Parler à '+s.name)+' · E / clic droit';}},dispose(){disposed=true;button.remove();document.removeEventListener('keydown',key,true);canvas.removeEventListener('pointerdown',down,true);canvas.removeEventListener('contextmenu',context,true);}};
}
