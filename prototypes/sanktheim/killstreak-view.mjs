export function createKillstreakView(){
 const style=document.createElement('style');style.textContent=`
 .siege-streak{position:fixed;inset:17% 0 auto;z-index:45;text-align:center;pointer-events:none;color:#fff2c2;filter:drop-shadow(0 4px 5px #000);font-family:Georgia,serif;opacity:0}
 .siege-streak strong{display:block;font:900 clamp(76px,14vw,150px)/1 system-ui;color:#fff3c6;text-shadow:0 0 18px #ff9b32,0 0 55px #e04c1c}
 .siege-streak span{display:block;font:bold clamp(22px,4vw,42px)/1.4 Georgia,serif;letter-spacing:.09em;text-transform:uppercase}
 .siege-streak small{display:block;font:600 15px system-ui;letter-spacing:.15em;color:#ffe0aa}
 .siege-streak::before{content:'';position:absolute;inset:8% 15%;z-index:-1;background:radial-gradient(ellipse,#e6872755,transparent 65%);transform:scaleX(1.6)}
 .siege-streak.active{animation:siege-streak-burst 2.5s both}
 @keyframes siege-streak-burst{0%{opacity:0;transform:scale(1.8) rotate(-4deg)}9%{opacity:1;transform:scale(.95) rotate(1deg)}17%,75%{opacity:1;transform:scale(1) rotate(0)}100%{opacity:0;transform:translateY(-35px) scale(1.08)}}
 @media(prefers-reduced-motion:reduce){.siege-streak.active{animation-name:siege-streak-fade}@keyframes siege-streak-fade{0%,100%{opacity:0}10%,80%{opacity:1}}}`;
 document.head.append(style);const root=document.createElement('div');root.className='siege-streak';root.hidden=true;root.setAttribute('role','status');root.setAttribute('aria-live','polite');
 const number=document.createElement('strong'),label=document.createElement('span'),caption=document.createElement('small');caption.textContent='POMS ÉLIMINÉS SANS MOURIR';root.append(number,label,caption);document.body.append(root);
 const titles=['Inarrêtable','Folie meurtrière','Implacable','Fléau des poms','Légendaire','Au-delà des limites'];const queue=[];let playing=false,timer;
 function next(){if(playing||!queue.length)return;playing=true;root.hidden=false;const kills=queue.shift();number.textContent=kills;label.textContent=titles[Math.min(titles.length-1,Math.floor(kills/5)-1)];root.classList.remove('active');void root.offsetWidth;root.classList.add('active');timer=setTimeout(()=>{playing=false;root.classList.remove('active');if(!queue.length)root.hidden=true;next();},2500);}
 return {show(kills){if(kills>0&&kills%5===0){queue.push(kills);next();}},dispose(){clearTimeout(timer);root.remove();style.remove();}};
}
