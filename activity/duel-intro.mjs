import native from './assets/sky/arena/intro.json' with {type:'json'};
export const DUEL_INTRO_DURATION=native.duration;
export function duelHeading(from,to){return {dx:to.x-from.x,dz:to.z-from.z};}
export function duelPhase(duel,time){
 if(!duel||!Number.isFinite(duel.startsAt)||!Number.isFinite(duel.readyAt)||time>=duel.readyAt)return null;
 const duration=duel.readyAt-duel.startsAt;if(duration<=0)return null;const elapsed=Math.max(0,time-duel.startsAt)/duration*DUEL_INTRO_DURATION;
 if(elapsed<8000)return {kind:'overview',progress:Math.max(0,(elapsed-2000)/6000),fade:Math.max(0,1-elapsed/2000)};
 if(elapsed<10000)return {kind:'wide',progress:(elapsed-8000)/2000};
 if(elapsed<17000){const side=elapsed<13500?0:1;return {kind:'fighter',side,progress:(elapsed-(side?13500:10000))/3500};}
 if(elapsed<18200)return {kind:'versus',progress:(elapsed-17000)/1200};return {kind:'begin',progress:(elapsed-18200)/800};
}
const lerp=(a,b,t)=>a+(b-a)*t;
export function nativeArenaCamera(phase){const a=native.cameras.opening,b=native.cameras.pullback,w=native.cameras.wide,p=phase.kind==='overview'?phase.progress:1,wide=phase.kind!=='overview';const source=wide?w:a,target=wide?w.target:a.target.map((v,i)=>lerp(v,b.target[i],p)),distance=wide?w.distance:a.distance.map((v,i)=>lerp(v,b.distance[i],p)),zoom=wide?w.zoom:lerp(a.zoom,b.zoom,p),rotation=source.rotation*Math.PI/180000;
 const at={x:-target[0]/1000,y:target[1]/1000,z:target[2]/1000},offset={x:-(distance[0]*Math.cos(rotation)+distance[2]*Math.sin(rotation))/1000,y:distance[1]/1000,z:(-distance[0]*Math.sin(rotation)+distance[2]*Math.cos(rotation))/1000};const clearance=wide?1:lerp(2.5,1,p);return {target:at,position:{x:at.x+offset.x*clearance,y:at.y+offset.y*clearance,z:at.z+offset.z*clearance},fov:source.perspective/10,zoom:1};
}
export function fighterOrbit(from,to,progress){const dx=to.x-from.x,dz=to.z-from.z,heading=Math.atan2(dx,dz),angle=heading+(progress-.5)*Math.PI/6,radius=4.2;return {target:{x:from.x,y:from.y+.95,z:from.z},position:{x:from.x+Math.sin(angle)*radius,y:from.y+1.65,z:from.z+Math.cos(angle)*radius},fov:38,zoom:1};}
export function createDuelIntro({assets=null}={}){
 const overlay=document.createElement('div');overlay.id='sky-duel-intro';overlay.style.cssText='position:fixed;inset:0;z-index:25;pointer-events:none;display:none;border-top:8vh solid #09070df0;border-bottom:8vh solid #09070df0;box-sizing:border-box';
 const caption=document.createElement('div');caption.style.cssText="position:absolute;bottom:8%;left:3%;right:3%;text-align:center;color:white;font-family:AveriaSky,'Averia Sans Libre',sans-serif;paint-order:stroke fill;-webkit-text-stroke:2px #000;text-shadow:0 2px 3px #000,0 0 12px #000;line-height:1.05";
 const title=document.createElement('div'),subtitle=document.createElement('div');title.style.cssText='font-size:clamp(38px,7vw,94px);font-weight:bold;letter-spacing:.02em';subtitle.style.cssText='font-size:clamp(24px,4vw,52px);margin-top:12px';caption.append(title,subtitle);overlay.append(caption);document.body.append(overlay);
 const style=document.createElement('style');style.textContent='body[data-sky-intro] :is(#hud,#sky-chat,#sky-settings,#sky-renne-actions,#sky-jump,#sky-leave,#sky-chat-toggle,#sky-prophunt,#sky-labels,#sky-combat,#sky-actions){visibility:hidden!important}';document.head?.append(style);
 let duel=null,offset=0,announced=null,opening=null,fighters=null;const listeners=[];
 if(assets&&typeof Audio!=='undefined'){opening=new Audio(new URL(native.audio.opening,assets).href);fighters=new Audio(new URL(native.audio.fighters,assets).href);for(const sound of [opening,fighters]){sound.preload='auto';sound.volume=.35;}const unlock=()=>{if(duelPhase(duel,performance.now()+offset))void playCurrent();};for(const type of ['pointerdown','keydown']){document.addEventListener(type,unlock);listeners.push([type,unlock]);}}
 function soundPlay(sound){if(sound&&sound.paused)void sound.play().catch(()=>{});}
 function playCurrent(){const phase=duelPhase(duel,performance.now()+offset);soundPlay(phase?.kind==='fighter'||phase?.kind==='versus'||phase?.kind==='begin'?fighters:opening);}
 return {
  active(time){return !!duelPhase(duel,time+offset);},
  receive(value,serverTime){const changed=value?.id!==duel?.id;duel=value;offset=(serverTime??Date.now())-performance.now();if(changed){announced=null;for(const sound of [opening,fighters])if(sound){sound.pause();sound.currentTime=0;}}},
  update(time,avatars,camera,fallback){const phase=duelPhase(duel,time+offset);overlay.style.display=phase?'block':'none';document.body.toggleAttribute?.('data-sky-intro',!!phase);if(!phase){for(const sound of [opening,fighters])sound?.pause();return;}
   const players=duel.players.map(id=>avatars.get(id)),positions=players.map(p=>p?.position??fallback);for(let i=0;i<players.length;i++)if(players[i]&&players[1-i])players[i].heading=duelHeading(positions[i],positions[1-i]);
   const centre={x:(positions[0].x+positions[1].x)/2,y:(positions[0].y+positions[1].y)/2,z:(positions[0].z+positions[1].z)/2};
   let pose;if(phase.kind==='fighter')pose=fighterOrbit(positions[phase.side],positions[1-phase.side],phase.progress);else if(['overview','wide'].includes(phase.kind))pose=nativeArenaCamera(phase);else pose={target:{...centre,y:centre.y+.8},position:{x:centre.x+14,y:centre.y+11,z:centre.z},fov:48,zoom:1};
   camera.position.set(pose.position.x,pose.position.y,pose.position.z);camera.lookAt(pose.target.x,pose.target.y,pose.target.z);camera.zoom=pose.zoom;camera.fov=pose.fov;camera.updateProjectionMatrix();
   const names=players.map((p,i)=>duel.names?.[i]||p?.displayName||p?.character||'?'),titles=duel.titles??[];caption.style.opacity=phase.kind==='fighter'?String(Math.min(1,phase.progress*8,(1-phase.progress)*8)): '1';overlay.style.backgroundColor=phase.fade?'rgba(0,0,0,'+phase.fade+')':'transparent';
   title.textContent=phase.kind==='fighter'?names[phase.side]:phase.kind==='begin'?'Combat !':phase.kind==='versus'?names.join('  —  '):'';subtitle.textContent=phase.kind==='fighter'?(titles[phase.side]||'Titre à renseigner'):'';
   const sound=phase.kind==='overview'||phase.kind==='wide'?'opening':'fighters';if(sound!==announced){announced=sound;if(sound==='fighters')opening?.pause();soundPlay(sound==='opening'?opening:fighters);}
  },dispose(){for(const sound of [opening,fighters])if(sound){sound.pause();sound.removeAttribute('src');sound.load();}for(const [type,fn]of listeners)document.removeEventListener(type,fn);document.body.removeAttribute?.('data-sky-intro');style.remove();overlay.remove();}
 };
}
