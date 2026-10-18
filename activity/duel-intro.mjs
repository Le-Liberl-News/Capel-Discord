import characterTitles from './assets/sky/character-titles.json' with {type:'json'};
import native from './assets/sky/arena/intro.json' with {type:'json'};
import axis from './assets/sky/axis/intro.json' with {type:'json'};
// the fighter's title only (the win streak is no longer shown)
export function fighterSubtitle(character,title){const value=title&&title!=='Titre à renseigner'?title:characterTitles[character]??'';return value;}
export const DUEL_INTRO_DURATION=native.duration;
export const venueTitle=venue=>venue==='thors'?'Académie Thors · Parvis':venue==='gehenna'?'Géhenne':venue==='axis'?axis.title:native.title;
export const showsVenueTitle=phase=>['tower','overview'].includes(phase?.kind);
export function duelHeading(from,to){return {dx:to.x-from.x,dz:to.z-from.z};}
// Top of the Axis Pillar: far shot of the tower with its name, each fighter walks in, a fast orbit around the centre, then the fight.
function axisPhase(elapsed){
 const {tower,fighter,orbit}=axis.phases;
 if(elapsed<tower)return {kind:'tower',progress:elapsed/tower,fade:Math.max(0,1-elapsed/1000)};
 if(elapsed<tower+2*fighter){const side=elapsed<tower+fighter?0:1;return {kind:'fighter',side,progress:(elapsed-tower-side*fighter)/fighter};}
 if(elapsed<tower+2*fighter+orbit)return {kind:'orbit',progress:(elapsed-tower-2*fighter)/orbit};
 return {kind:'begin',progress:(elapsed-tower-2*fighter-orbit)/axis.phases.begin};
}
const VENUES={arena:{duration:native.duration,boundaries:[8000,10000,13500,17000],audio:native.audio},axis:{duration:axis.duration,boundaries:[axis.phases.tower,axis.phases.tower+axis.phases.fighter,axis.phases.tower+2*axis.phases.fighter,axis.phases.tower+2*axis.phases.fighter+axis.phases.orbit],audio:null}};
VENUES.gehenna={...VENUES.axis};VENUES.thors={...VENUES.axis};
const venueOf=name=>VENUES[name]?name:'arena';
export const introDurationFor=venue=>VENUES[venueOf(venue)].duration;
export function duelPhase(duel,time,venue=duel?.venue){
 if(!duel||!Number.isFinite(duel.startsAt)||!Number.isFinite(duel.readyAt)||time>=duel.readyAt)return null;
 const duration=duel.readyAt-duel.startsAt;if(duration<=0)return null;const elapsed=Math.max(0,time-duel.startsAt)/duration*VENUES[venueOf(venue)].duration;
 if(['axis','gehenna','thors'].includes(venueOf(venue)))return axisPhase(elapsed);
 if(elapsed<8000)return {kind:'overview',progress:Math.max(0,(elapsed-2000)/6000),fade:Math.max(0,1-elapsed/2000)};
 if(elapsed<10000)return {kind:'wide',progress:(elapsed-8000)/2000};
 if(elapsed<17000){const side=elapsed<13500?0:1;return {kind:'fighter',side,progress:(elapsed-(side?13500:10000))/3500};}
 if(elapsed<18200)return {kind:'versus',progress:(elapsed-17000)/1200};return {kind:'begin',progress:(elapsed-18200)/800};
}
const lerp=(a,b,t)=>a+(b-a)*t;
export function nativeArenaCamera(phase){const a=native.cameras.opening,b=native.cameras.pullback,w=native.cameras.wide,p=phase.kind==='overview'?phase.progress:1,wide=phase.kind!=='overview';const source=wide?w:a,target=wide?w.target:a.target.map((v,i)=>lerp(v,b.target[i],p)),distance=wide?w.distance:a.distance.map((v,i)=>lerp(v,b.distance[i],p)),zoom=wide?w.zoom:lerp(a.zoom,b.zoom,p),rotation=source.rotation*Math.PI/180000;
 const at={x:-target[0]/1000,y:target[1]/1000,z:target[2]/1000},offset={x:-(distance[0]*Math.cos(rotation)+distance[2]*Math.sin(rotation))/1000,y:distance[1]/1000,z:(-distance[0]*Math.sin(rotation)+distance[2]*Math.cos(rotation))/1000};const clearance=wide?1:lerp(2.5,1,p);return {target:at,position:{x:at.x+offset.x*clearance,y:at.y+offset.y*clearance,z:at.z+offset.z*clearance},fov:source.perspective/10,zoom:1};
}
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
export function axisTowerCamera(progress){const {from,to,fov}=axis.tower,p=ease(Math.max(0,Math.min(1,progress))),mix=(a,b)=>({x:lerp(a[0],b[0],p),y:lerp(a[1],b[1],p),z:lerp(a[2],b[2],p)});return {position:mix(from.position,to.position),target:mix(from.target,to.target),fov,zoom:1};}
// Level with the fighters, sweeping round the centre and ending side-on, both fighters face to face
export function axisOrbit(centre,from,to,progress){const {radius,height,turns,fov}=axis.orbit,side=Math.atan2(to.x-from.x,to.z-from.z)+Math.PI/2,angle=side-turns*2*Math.PI*(1-ease(Math.max(0,Math.min(1,progress))));return {target:{x:centre.x,y:centre.y+.9,z:centre.z},position:{x:centre.x+Math.sin(angle)*radius,y:centre.y+height,z:centre.z+Math.cos(angle)*radius},fov,zoom:1};}
export function fighterOrbit(from,to,progress){const dx=to.x-from.x,dz=to.z-from.z,heading=Math.atan2(dx,dz),angle=heading+(progress-.5)*Math.PI/6,radius=4.2;return {target:{x:from.x,y:from.y+.95,z:from.z},position:{x:from.x+Math.sin(angle)*radius,y:from.y+1.65,z:from.z+Math.cos(angle)*radius},fov:38,zoom:1};}
export function createDuelIntro({assets=null,onSpeech=()=>{},onPhase=()=>{},venue='arena'}={}){
 let lastPhase=null;
 const place=VENUES[venueOf(venue)];
 const overlay=document.createElement('div');overlay.id='sky-duel-intro';overlay.style.cssText='position:fixed;inset:0;z-index:25;pointer-events:none;display:none;border-top:8vh solid #09070df0;border-bottom:8vh solid #09070df0;box-sizing:border-box';
 const caption=document.createElement('div');caption.style.cssText="position:absolute;bottom:-8vh;left:0;right:0;text-align:center;color:white;font-family:Cinzel,'Cormorant Garamond',Georgia,serif;paint-order:stroke fill;-webkit-text-stroke:2px #000;text-shadow:0 2px 3px #000,0 0 12px #000;line-height:1.05;background:#09070d70;padding:16px 24px;border-radius:4px";
 const title=document.createElement('div'),subtitle=document.createElement('div');title.style.cssText='font-size:clamp(38px,7vw,94px);font-weight:bold;letter-spacing:.02em';subtitle.style.cssText='font-size:clamp(24px,4vw,52px);margin-top:12px';caption.append(title,subtitle);overlay.append(caption);
 // name of the venue over the far shot, in an engraved serif rather than the dialogue font
 // every intro text uses the place font
 if(assets&&typeof FontFace!=='undefined'&&document.fonts){const face=new FontFace('Cinzel','url("'+new URL('fonts/Cinzel.ttf',assets).href+'")',{weight:'400 900'});face.load().then(loaded=>document.fonts.add(loaded)).catch(()=>{});}
 const placeName=document.createElement('div');placeName.textContent=venueTitle(venue);placeName.style.cssText="position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;color:#f4ecd8;font-family:Cinzel,'Cormorant Garamond','Trajan Pro',Georgia,'Times New Roman',serif;font-size:clamp(34px,6.5vw,92px);letter-spacing:.14em;font-weight:600;text-shadow:0 0 18px #000c,0 2px 4px #000;display:none";overlay.append(placeName);document.body.append(overlay);
 const style=document.createElement('style');style.textContent='body[data-sky-intro] :is(#hud,#sky-chat,#sky-settings,#sky-renne-actions,#sky-jump,#sky-leave,#sky-chat-toggle,#sky-prophunt,#sky-labels,#sky-combat,#sky-actions){visibility:hidden!important}';document.head?.append(style);
 let duel=null,offset=0,announced=null,spoken=new Set(),opening=null,fighters=null;const listeners=[];
 if(assets&&place.audio&&typeof Audio!=='undefined'){opening=new Audio(new URL(place.audio.opening,assets).href);fighters=new Audio(new URL(place.audio.fighters,assets).href);for(const sound of [opening,fighters]){sound.preload='auto';sound.volume=.35;}opening.loop=true;const unlock=()=>{if(duelPhase(duel,performance.now()+offset,venue))void playCurrent();};for(const type of ['pointerdown','keydown']){document.addEventListener(type,unlock);listeners.push([type,unlock]);}}
 function soundPlay(sound){if(sound&&sound.paused)void sound.play().catch(()=>{});}
 function playCurrent(){if(duelPhase(duel,performance.now()+offset,venue))soundPlay(opening);}
 return {
  active(time){return !!duelPhase(duel,time+offset,venue);},
  receive(value,serverTime){const changed=value?.id!==duel?.id;duel=value;offset=(serverTime??Date.now())-performance.now();if(changed){announced=null;spoken.clear();for(const sound of [opening,fighters])if(sound){sound.pause();sound.currentTime=0;}}},
  update(time,avatars,camera,fallback){for(const avatar of avatars.values()){avatar.introOffset=null;avatar.introWalking=false;}const phase=duelPhase(duel,time+offset,venue);
  // tells the scene when the intro moves on (sounds), null once it is over
  if((phase?.kind??null)!==lastPhase){lastPhase=phase?.kind??null;onPhase(lastPhase);}
 overlay.style.display=phase?'block':'none';document.body.toggleAttribute?.('data-sky-intro',!!phase);if(!phase){for(const sound of [opening,fighters])sound?.pause();return;}
   const teams=duel.groups?.map(g=>g.players.map(id=>avatars.get(id)).filter(Boolean))??duel.players.map(id=>[avatars.get(id)].filter(Boolean)),players=teams.map(t=>t[0]),positions=teams.map(t=>t.length?{x:t.reduce((n,p)=>n+p.position.x,0)/t.length,y:t.reduce((n,p)=>n+p.position.y,0)/t.length,z:t.reduce((n,p)=>n+p.position.z,0)/t.length}:fallback);
   for(let i=0;i<teams.length;i++)for(const actor of teams[i]){actor.heading=duelHeading(actor.position,positions[1-i]);const walk=phase.kind==='fighter'?(phase.side>i?1:phase.side<i?0:Math.min(1,phase.progress/.6)):['versus','begin','orbit'].includes(phase.kind)?1:0,dx=positions[1-i].x-positions[i].x,dz=positions[1-i].z-positions[i].z,len=Math.hypot(dx,dz)||1;actor.introOffset={x:-dx/len*2*(1-walk),z:-dz/len*2*(1-walk)};actor.introWalking=phase.kind==='fighter'&&phase.side===i&&walk<1;if(phase.kind==='fighter'&&phase.side===i&&walk>=1&&!spoken.has(i)){spoken.add(i);if(duel.phrases?.[i])onSpeech({id:duel.id+':entrance:'+i,author:duel.players[i],character:actor.character,text:duel.phrases[i]});}}
   const centre={x:(positions[0].x+positions[1].x)/2,y:(positions[0].y+positions[1].y)/2,z:(positions[0].z+positions[1].z)/2};
   let pose;if(phase.kind==='fighter')pose=fighterOrbit({...positions[phase.side],x:positions[phase.side].x+(players[phase.side]?.introOffset?.x??0),z:positions[phase.side].z+(players[phase.side]?.introOffset?.z??0)},positions[1-phase.side],phase.progress);else if(['overview','wide'].includes(phase.kind))pose=nativeArenaCamera(phase);else if(phase.kind==='tower')pose=venue==='thors'?{position:{x:26-10*phase.progress,y:23-8*phase.progress,z:35-12*phase.progress},target:{x:0,y:8,z:-25},fov:52,zoom:1}:venue==='gehenna'?{position:{x:18-8*phase.progress,y:16-7*phase.progress,z:centre.z-26+8*phase.progress},target:{...centre,y:centre.y+1},fov:48,zoom:1}:axisTowerCamera(phase.progress);else if(phase.kind==='orbit'||venue==='axis')pose=axisOrbit(centre,positions[0],positions[1],phase.kind==='orbit'?phase.progress:1);else pose={target:{...centre,y:centre.y+.8},position:{x:centre.x+14,y:centre.y+11,z:centre.z},fov:48,zoom:1};
   if(phase.kind==='fighter'&&duel.groups){const factor=1+.7*(teams[phase.side].length-1);for(const axis of ['x','y','z'])pose.position[axis]=pose.target[axis]+(pose.position[axis]-pose.target[axis])*factor;}
   camera.position.set(pose.position.x,pose.position.y,pose.position.z);camera.lookAt(pose.target.x,pose.target.y,pose.target.z);camera.zoom=pose.zoom;camera.fov=pose.fov;camera.updateProjectionMatrix();
   caption.style.display=['fighter','versus','begin','orbit'].includes(phase.kind)?'block':'none';placeName.style.display=showsVenueTitle(phase)?'block':'none';if(showsVenueTitle(phase))placeName.style.opacity=String(Math.max(0,Math.min(1,(phase.progress-.12)*5,(1-phase.progress)*6)));const names=players.map((p,i)=>duel.names?.[i]||p?.displayName||p?.character||'?'),titles=duel.titles??[];caption.style.opacity=phase.kind==='fighter'?String(Math.min(1,phase.progress*8,(1-phase.progress)*8)): '1';const elapsed=(time+offset-duel.startsAt)/(duel.readyAt-duel.startsAt)*place.duration,transition=Math.max(0,...place.boundaries.map(boundary=>1-Math.abs(elapsed-boundary)/350)),fade=Math.max(phase.fade??0,transition);overlay.style.backgroundColor=fade?'rgba(0,0,0,'+fade+')':'transparent';
   title.textContent=phase.kind==='fighter'?names[phase.side]:phase.kind==='begin'?'Commencez !':['versus','orbit'].includes(phase.kind)?names.join('  —  '):'';subtitle.textContent=phase.kind==='fighter'?(duel.groups?titles[phase.side]:fighterSubtitle(players[phase.side]?.character,titles[phase.side],duel.streaks?.[phase.side]??0)):'';
   const sound=['overview','wide','tower'].includes(phase.kind)?'opening':'fighters'+(phase.side??1);if(sound!==announced){announced=sound;if(sound!=='opening'){fighters?.pause();if(fighters)fighters.currentTime=0;}soundPlay(sound==='opening'?opening:fighters);}
  },dispose(){for(const sound of [opening,fighters])if(sound){sound.pause();sound.removeAttribute('src');sound.load();}for(const [type,fn]of listeners)document.removeEventListener(type,fn);document.body.removeAttribute?.('data-sky-intro');style.remove();overlay.remove();}
 };
}
