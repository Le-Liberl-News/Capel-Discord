import {introDurationFor} from './duel-intro.mjs';
import axisResidents from './assets/sky/axis/residents.json';
// training also takes place one time in two at the top of the Axis Pillar
const TRAINING_VENUES={arena:{},axis:{spawns:[{x:0,z:-9.5},{x:0,z:9.5}],ballSpawns:axisResidents.ballSpawns}};let trainingVenue='arena';
import {createTraining} from './training.mjs';
import {pickSoloEncounter} from './solo-encounters.mjs';
import trainingCombat from './native-combat.cjs';
import {createCapturePublisher} from "./capture-publisher.mjs";
import {downloadDiagnostics,recordDiagnostic} from './diagnostics.mjs';
import {createTerminalUI} from "./terminal-ui.mjs";
import {keyboardLayout,createBindingOptions} from "./controls.mjs";
import { fetchJson, retryConnection } from "./network.mjs";
import { DiscordSDK } from "@discord/embedded-app-sdk";
import { createMapMusic } from "./music.mjs";
import { createCaptureTheFlag, ctfOpponents } from "./ctf.mjs";
import { effectsVolume, setEffectsVolume } from "./combat-sounds.mjs";
import { createSkyScene, prepareTrainingArena, ASSETS } from "./sky-scene.mjs";
const CLIENT_ID = window.__CLIENT_ID__ || "__CLIENT_ID__";
const dedansDiscord = new URLSearchParams(location.search).has("frame_id");
const apercuLocal = __ACTIVITY_PREVIEW__ && !dedansDiscord;
const bandeau = document.getElementById("bandeau"),
  toile = document.getElementById("scene");
const apiBase = window.__API_BASE__ || (dedansDiscord ? "/.proxy/api" : "/api");
const apiUrl = (route) =>
  apiBase.endsWith(".php") ? apiBase + "?r=" + route : apiBase + "/" + route;
const etape = (texte) => {
  bandeau.textContent = texte;
};
const etat = {
  salon: "local",
  moi: null,
  token: null,
  character: "Estelle",
  messageCursor: 0,
};
let scene, music, lastDuelIntro=null, training=null, trainingBusy=false, trainingTimer, trainingReturn=null, trainingStep=null, lastTrainingRequest=null;
const terminal=createTerminalUI({
 menu:()=>apercuLocal?Promise.resolve({characters:["Joshua","Lechter"],hunt:null,requests:[]}):fetchJson(apiUrl("terminal"),{headers:{Authorization:"Bearer "+etat.token}}),
 action:body=>body.action==='training'?startTraining(body.encounter??null):apercuLocal?Promise.resolve({message:"Aper\u00e7u."}):fetchJson(apiUrl("terminal"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+etat.token},body:JSON.stringify(body)}),
 changed:()=>wakePoll()
});
function bindScene(){scene.onAction(()=>{if(training){if(['leave_map','leave_duel'].includes(scene.action()?.type))void stopTraining();return;}if(apercuLocal&&scene.action()?.type==='hangar_enter')void previewTravel('hangar');else if(apercuLocal&&scene.action()?.type==='flight_board')void previewTravel('liberl');else if(apercuLocal&&['leave_map','leave_duel'].includes(scene.action()?.type))void previewTravel('anterose');else wakePoll();});scene.onTerminal(()=>void terminal.open());scene.onRematch(async id=>{try{const result=await fetchJson(apiUrl("terminal"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+etat.token},body:JSON.stringify({action:"rematch",invitation:id,request:crypto.randomUUID()})});scene?.captureNotice(result.message);wakePoll();}catch(error){scene?.captureNotice(error.message);throw error;}});scene.onCraftCapture(event=>void publishCraftCapture(event));}

// arena queue: a banner while waiting in the activity, a sound when the opponent is found
const queueBanner=document.createElement('div');queueBanner.id='sky-queue';queueBanner.hidden=true;queueBanner.style.cssText='position:fixed;top:56px;left:50%;transform:translateX(-50%);z-index:24;padding:6px 14px;background:#151019e0;border:1px solid #b49760;border-radius:6px;color:#ffe7b0;font:600 16px Cinzel,Georgia,serif;pointer-events:none';document.body.append(queueBanner);
function showQueue(queue,serverTime){if(!queue||training){queueBanner.hidden=true;return;}const s=Math.max(0,Math.floor(((serverTime??Date.now())-queue.since)/1000));queueBanner.textContent='⏳ En file d’attente… '+Math.floor(s/60)+':'+String(s%60).padStart(2,'0');queueBanner.hidden=false;}
function playMatchFound(){try{const audio=new Audio(new URL('sounds/se/fight.wav',ASSETS).href);audio.volume=effectsVolume();void audio.play().catch(()=>{});}catch{}}
// FPS / ping display (settings) and a perf line in the diagnostic every 5 s
const pings=[];function notePing(ms){pings.push(ms);if(pings.length>20)pings.shift();}
function pingMedian(){if(!pings.length)return null;const s=[...pings].sort((a,b)=>a-b);return Math.round(s[s.length>>1]);}
const perfHud=document.createElement('div');perfHud.id='sky-perf';perfHud.hidden=true;perfHud.style.cssText='position:fixed;top:8px;right:120px;z-index:30;padding:3px 8px;background:#000a;color:#bfffbf;font:12px ui-monospace,monospace;border-radius:4px;pointer-events:none';document.body.append(perfHud);
let perfTick=0;setInterval(()=>{const stats=scene?.performanceStats?.();if(!stats)return;const ping=training?null:pingMedian();perfHud.textContent=stats.fps+' fps · '+stats.cpuMs+' ms/image'+(ping==null?'':' · ping '+ping+' ms')+(stats.softwareGpu?' · GPU logiciel':'');if(++perfTick%5===0)recordDiagnostic('perf',{map:etat.map,...stats,ping,hidden:document.hidden});},1000);
const trainingResult=document.createElement('div');trainingResult.hidden=true;trainingResult.style.cssText='position:fixed;top:35%;left:50%;transform:translateX(-50%);z-index:35;background:#211c2af2;color:#ffe7b0;border:2px solid #b49760;padding:20px;text-align:center;font:22px AveriaSky,sans-serif';
const trainingWinner=document.createElement('p'),trainingAgain=document.createElement('button'),trainingExit=document.createElement('button');trainingAgain.textContent='Rejouer';trainingExit.textContent='Retour';for(const b of [trainingAgain,trainingExit])b.style.cssText='font:inherit;padding:8px;margin:5px;background:#ead29c;color:#241b15;border:1px solid #b49760;border-radius:4px';trainingResult.append(trainingWinner,trainingAgain,trainingExit);document.body.append(trainingResult);
trainingAgain.onclick=()=>void startTraining();trainingExit.onclick=()=>void stopTraining();
// Capture the flag: same local loop as the training (ctf.mjs), three a side, flag in the middle.
const CTF_VENUES={arena:{red:{x:-1,z:3.25},blue:{x:-1,z:-16.25},centre:{x:-1,z:-6.5}},axis:{red:{x:0,z:-9.5},blue:{x:0,z:9.5},centre:{x:0,z:0}}};
let trainingMode='duel';
function chooseTeam(){return new Promise(resolve=>{
 const box=document.createElement('div');box.style.cssText='position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;background:#0008';
 const panel=document.createElement('div');panel.style.cssText='background:#211c2af2;color:#ffe7b0;border:2px solid #b49760;border-radius:6px;padding:18px 22px;text-align:center;font:20px Cinzel,Georgia,serif';
 const title=document.createElement('p');title.textContent='Capture du drapeau · choisissez votre équipe';title.style.margin='0 0 12px';panel.append(title);
 const done=value=>{box.remove();resolve(value);};
 for(const [team,label,color] of [['red','Équipe rouge','#e0483e'],['blue','Équipe bleue','#3f7ee8']]){const b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText=`font:inherit;margin:6px;padding:10px 16px;border-radius:4px;border:2px solid ${color};background:${color}33;color:#fff;cursor:pointer`;b.onclick=()=>done(team);panel.append(b);}
 const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Annuler';cancel.style.cssText='display:block;margin:10px auto 0;font:14px Cinzel,Georgia,serif;background:none;border:0;color:#d8c49a;cursor:pointer';cancel.onclick=()=>done(null);panel.append(cancel);
 box.append(panel);document.body.append(box);
});}
async function startCaptureTheFlag(){
 if(trainingBusy)return;const team=await chooseTeam();if(!team||trainingBusy)return;
 trainingBusy=true;clearTimeout(trainingTimer);trainingResult.hidden=true;trainingMode='ctf';
 if(trainingStep)await trainingStep;
 if(!training)trainingReturn={map:etat.map??'anterose',player:{...etat.moi,...scene.position(),character:scene.playerCharacter?.()??etat.character}};
 const reuseArena=!!training;training=null;if(reuseArena)scene.resetTraining();else{scene.dispose();scene=null;trainingVenue=Math.random()<.5?'axis':'arena';}
 try{if(!reuseArena){scene=await createSkyScene(toile,trainingVenue,{localTraining:true});if(__ACTIVITY_PREVIEW__&&window.__activityPreview)window.__activityPreview=scene;}
  const game=createCaptureTheFlag({...scene.trainingGeometry(),character:trainingReturn.player.character,team,venue:CTF_VENUES[trainingVenue],candidates:ctfOpponents(scene.catalogue)});
  scene.retainCombatCharacters([trainingReturn.player.character,...game.characters]);training=game;bindScene();
  await Promise.all([scene.me(game.player),...[...new Set(game.characters)].map(c=>scene.prepareCombat(c))]);
  scene.setConnected(true);leave.hidden=false;connectionNotice.hidden=true;document.querySelector('#hud h1').textContent='Capture du drapeau';music.setTrack(musicUrl(trainingVenue));}
 catch(error){trainingBusy=false;await stopTraining();throw error;}
 trainingBusy=false;await tickTraining();
}
async function startTraining(forcedEncounter=null){
 if(trainingBusy)return;trainingMode='duel';const trainingLoadStarted=performance.now();trainingBusy=true;clearTimeout(trainingTimer);trainingResult.hidden=true;
 if(trainingStep)await trainingStep;
 if(!training)trainingReturn={map:etat.map??'anterose',player:{...etat.moi,...scene.position(),character:scene.playerCharacter?.()??etat.character}};
 let titles={},entrances={};try{if(!apercuLocal){const config=await fetchJson(apiUrl('terminal')+(apiUrl('terminal').includes('?')?'&':'?')+'training=1',{headers:{Authorization:'Bearer '+etat.token}});titles=config.titles;entrances=config.entrances;}}catch(error){trainingBusy=false;throw error;}
 const reuseArena=!!training;training=null;if(reuseArena)scene.resetTraining();else{scene.dispose();scene=null;trainingVenue=Math.random()<.5?'axis':'arena';}
 try{if(!reuseArena){scene=await createSkyScene(toile,trainingVenue,{localTraining:true});if(__ACTIVITY_PREVIEW__&&window.__activityPreview)window.__activityPreview=scene;}const forced=forcedEncounter??(__ACTIVITY_PREVIEW__?new URLSearchParams(location.search).get('opponent'):null),selection=pickSoloEncounter(scene.catalogue,{forced});training=createTraining({...scene.trainingGeometry(),...TRAINING_VENUES[trainingVenue],character:trainingReturn.player.character,...selection,titles,entrances,introDuration:introDurationFor(trainingVenue)});scene.retainCombatCharacters(training.characters);bindScene();await Promise.all([scene.me(training.player),...training.characters.map(name=>scene.prepareCombat(name))]);training.beginIntro();scene.setConnected(true);leave.hidden=false;connectionNotice.hidden=true;document.querySelector('#hud h1').textContent='Combat solo · '+selection.label;music.setTrack(musicUrl(trainingVenue));}
 catch(error){trainingBusy=false;await stopTraining();throw error;}
 trainingBusy=false;await tickTraining();recordDiagnostic('training-load',{durationMs:Math.round(performance.now()-trainingLoadStarted),reused:reuseArena});
}
function tickTraining(){trainingStep=runTrainingTick();return trainingStep;}
async function runTrainingTick(){
 const active=training,current=scene;if(!active||trainingBusy)return;
 try{const submitted=current.movement(),command=current.action(),result=active.tick(submitted,command);
 current.acknowledgeMovement(submitted.sequence);await current.world(result);await current.sync([...result.joueurs,...result.enemies,...result.poms.map(p=>({character:'Pom',npc:true,...p}))]);current.messages(result.messages);current.setCaptureTheFlag?.(result.ctf??null);
 if(result.finish){trainingResult.hidden=false;trainingWinner.textContent=result.finish.text??('Victoire de '+result.finish.winner);}
 }catch(error){recordDiagnostic('training-error',{message:error.message},true);current.captureNotice(error.message);}
 if(training===active&&scene===current)trainingTimer=setTimeout(tickTraining,33);
}
async function stopTraining(map){
 if(trainingBusy)return;trainingBusy=true;clearTimeout(trainingTimer);training=null;trainingResult.hidden=true;if(trainingStep)await trainingStep;
 const saved=trainingReturn;trainingReturn=null;scene?.dispose();scene=await createSkyScene(toile,map??saved?.map??'anterose');if(map)etat.map=map;bindScene();await scene.me({...saved?.player,character:etat.character});scene.setConnected(true);leave.hidden=(map??saved?.map??'anterose')==='anterose';document.querySelector('#hud h1').textContent=mapTitle(map??saved?.map??'anterose');music.setTrack(musicUrl(map??saved?.map??'anterose'));trainingBusy=false;wakePoll();
}

async function previewTravel(map){if(!__ACTIVITY_PREVIEW__)return;const previous=scene;scene=null;previous.dispose();etat.map=map;scene=await createSkyScene(toile,map);bindScene();await scene.me({...etat.moi,...scene.spawn,character:etat.character});scene.setConnected(true);leave.hidden=map==='anterose';document.querySelector('#hud h1').textContent=mapTitle(map);if(window.__activityPreview)window.__activityPreview=scene;music?.setTrack(musicUrl(map));}
const uploadCraftCapture=createCapturePublisher({send:async({id,bytes,final})=>{
 let binary="";for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
 await fetchJson(apiUrl("craft-capture"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+etat.token},body:JSON.stringify({id,gif:btoa(binary)}),signal:AbortSignal.timeout(final?45000:10000)});
},onEvent:(type,data)=>{recordDiagnostic(type,data,type.endsWith('failed')||type.includes('error'));if(type==='capture-failed'||type==='capture-encoding-error')scene?.captureNotice("Capture non publi\u00e9e.");}});
async function publishCraftCapture({id,bytes,error}) {
  if(training||trainingBusy)return;
  if(error){await uploadCraftCapture({id,error});return;}
  if(__ACTIVITY_PREVIEW__ && !new URLSearchParams(location.search).has("frame_id")) {
    if(window.__activityPreview)window.__activityPreview.lastCraftGif=new Blob([bytes],{type:"image/gif"});
    return;
  }
  if(bytes.length>(id.startsWith('duel-result:')?8000000:3000000)){scene.captureNotice("Capture trop volumineuse.");return;}
  await uploadCraftCapture({id,bytes});
}

const connectionNotice=document.createElement("div");connectionNotice.hidden=true;connectionNotice.setAttribute("role","status");connectionNotice.style.cssText="position:fixed;left:8px;bottom:190px;z-index:32;background:#211c2aee;color:#ffe7b0;padding:8px;max-width:calc(100vw - 32px);font:14px system-ui";document.body.append(connectionNotice);

const mapTitle = map => map==='axis'?'Pilier Axis - Sommet':map==='custom'?'Map personnalisée':map==='hangar'?'Antérose · Lynx':map==='liberl'?'Liberl · Lynx':/^tower[1-4]$/.test(map)?map==="tower4"?"Tour d’Esmelas · Sommet":"Tour d’Esmelas · Etage "+map.slice(5):map === "rolent" ? "Rolent · Prop Hunt" : map === "arena" ? "Arène de Grancel" : "Restaurant Antérose";
const musicUrl = map => map==='custom'?null:new URL(map === "arena" ? "music/arena.ogg?v=fc-tournament-20261009" : map === "axis" ? "music/axis.ogg" : /^tower[1-4]$/.test(map) ? "music/esmelas.ogg" : "music/anterose.ogg",ASSETS);
const gameHud = document.createElement("div"), blindfold = document.createElement("div");
gameHud.id="sky-prophunt"; gameHud.hidden=true;
gameHud.style.cssText="position:fixed;right:16px;top:64px;z-index:22;padding:12px;color:#ffe7b0;background:#211c2aee;border:1px solid #b49760;border-radius:5px;font:16px AveriaSky,sans-serif;white-space:pre-line";
blindfold.id="sky-preparation"; blindfold.hidden=true; blindfold.style.cssText="position:fixed;inset:0;background:#17121c;z-index:14";
document.body.append(blindfold,gameHud);
document.getElementById("hud").style.zIndex="21";
const huntText=document.createElement("span"),huntStart=document.createElement("button");huntStart.type="button";huntStart.textContent="D\u00e9marrer";huntText.style.display="block";huntStart.style.cssText="margin-top:8px";huntStart.hidden=true;gameHud.append(huntText,huntStart);huntStart.onclick=()=>void terminal.run({action:"hunt_start",invitation:huntState.id},gameHud);
let huntState;
function updateHunt(game) { huntState=game; drawHunt(); }
function drawHunt() {
 const g=huntState; gameHud.hidden=!g; blindfold.hidden=!(g?.phase==="preparation"&&g.role==="hunter");
 if(!g)return;
 const seconds=Math.max(0,Math.ceil((g.deadline-g.serverTime)/1000-(Date.now()-g.received)/1000));
 const timer=Math.floor(seconds/60)+":"+String(seconds%60).padStart(2,"0");
 huntStart.hidden=!(g.phase==="waiting"&&g.canStart);
 huntText.textContent = g.phase==="waiting" ? "Prop Hunt \u00b7 "+g.players+" joueurs" : g.phase==="finished" ? (g.winner==="hunter" ? "Le chasseur a gagné !" : g.winner==="cancelled" ? "Partie annulée." : "Les joueurs cachés ont gagné !") : g.phase==="preparation" ? "Préparation : "+seconds+" s\n"+(g.role==="hunter"?"Tu es le chasseur. Patiente !":"Trouve une cachette !") : timer+" · "+g.remaining+" joueurs cachés\n"+(g.role==="hunter"?"Chasseur":g.role==="found"?"Trouvé ! Tu es spectateur.":g.role==="spectator"?"Spectateur":"Reste discret !");
}
setInterval(drawHunt,250);
const leave = document.createElement("button"); leave.id="sky-leave"; leave.textContent = "Retour à l’Antérose"; leave.hidden = true; leave.style.cssText = "position:fixed;right:16px;top:16px;z-index:23;padding:8px 12px;color:#ffe7b0;background:#211c2a;border:1px solid #b49760;border-radius:4px;cursor:pointer"; leave.addEventListener("click",()=>scene?.leaveDuel()); document.body.append(leave);
const chat = document.createElement("form");
chat.id = "sky-chat";
chat.hidden = true;
chat.style.cssText = "position:fixed;right:16px;bottom:70px;z-index:15;width:300px;max-width:calc(100vw - 32px);padding:10px;box-sizing:border-box;background:#211c2aee;border:1px solid #b49760;border-radius:5px;color:#ffe7b0;font:13px system-ui";
const chatLabel = document.createElement("label");
chatLabel.textContent = "Discussion";
const chatInput = document.createElement("input");
chatInput.name = "message"; chatInput.maxLength = 4000; chatInput.autocomplete = "off";
chatInput.placeholder = "Votre message…";
chatInput.style.cssText = "box-sizing:border-box;width:100%;padding:8px;margin:6px 0;color:#211c2a;background:#fff3d6;border:0;border-radius:3px";
chatLabel.append(chatInput);
const chatSend = document.createElement("button"); chatSend.type = "submit"; chatSend.textContent = "Envoyer";
chatSend.style.cssText = "padding:6px 12px;background:#f3dfb4;color:#332319;border:0;border-radius:3px;cursor:pointer";
chat.append(chatLabel,chatSend); document.body.append(chat);
chat.addEventListener("submit", event => { event.preventDefault(); if (scene?.speak(chatInput.value,rpCheckbox.checked)) chatInput.value = ""; });
const chatToggle=document.createElement("button");chatToggle.id="sky-chat-toggle";chatToggle.type="button";chatToggle.textContent="💬";chatToggle.title="Discussion";chatToggle.setAttribute("aria-label","Discussion");chatToggle.setAttribute("aria-expanded","false");
const mobileStyle=document.createElement("style");mobileStyle.textContent="#sky-chat-toggle{display:none;position:fixed;right:12px;bottom:138px;z-index:25;min-height:44px;padding:8px 12px;background:#211c2a;color:#ffe7b0;border:1px solid #b49760;border-radius:5px;font:15px AveriaSky,sans-serif}body[data-sky-touch] #sky-chat-toggle{display:block}body[data-sky-touch] #sky-chat:not([data-open]){display:none}body[data-sky-touch] #sky-chat{bottom:190px}@media(any-pointer:coarse),(max-width:600px){#sky-chat-toggle{display:block}#sky-chat:not([data-open]){display:none}#sky-chat{bottom:190px!important;z-index:26!important}}";
document.head.append(mobileStyle);document.body.append(chatToggle);
chatToggle.addEventListener("click",()=>{const open=!chat.hasAttribute("data-open");chat.toggleAttribute("data-open",open);chatToggle.setAttribute("aria-expanded",String(open));if(open)chatInput.focus();else chatInput.blur();});
chatInput.addEventListener("focus", () => window.dispatchEvent(new Event("blur")));
// Keep the world framing stable when a mobile keyboard covers the activity.
try{if(navigator.virtualKeyboard)navigator.virtualKeyboard.overlaysContent=true;}catch{}
function keyboardInset(){const v=window.visualViewport;const editing=document.activeElement===chatInput;const inset=editing?Math.max(navigator.virtualKeyboard?.boundingRect?.height??0,innerHeight-(v?.height??innerHeight)-(v?.offsetTop??0),0):0;document.documentElement.style.setProperty("--sky-keyboard-inset",inset+"px");}
chatInput.addEventListener("focus",()=>{document.body.dataset.skyEditing="true";keyboardInset();});navigator.virtualKeyboard?.addEventListener("geometrychange",keyboardInset);window.visualViewport?.addEventListener("resize",keyboardInset);addEventListener("resize",keyboardInset);chatInput.addEventListener("blur",()=>{delete document.body.dataset.skyEditing;document.documentElement.style.setProperty("--sky-keyboard-inset","0px");dispatchEvent(new Event("resize"));});
const settings=document.createElement("details");settings.id="sky-settings";
const gear=document.createElement("summary");gear.textContent="\u2699";gear.setAttribute("aria-label","R\u00e9glages");gear.title="R\u00e9glages";
const layoutLabel=document.createElement("label");layoutLabel.textContent="Clavier ";const layoutSelect=document.createElement("select");for(const name of ["AZERTY","QWERTY"]){const option=document.createElement("option");option.value=name;option.textContent=name;layoutSelect.append(option);}layoutSelect.value=keyboardLayout();layoutSelect.addEventListener("change",()=>{try{localStorage.setItem("sky-keyboard",layoutSelect.value);}catch{}dispatchEvent(new Event("blur"));});layoutLabel.append(layoutSelect);
const rpLabel=document.createElement("label");rpLabel.style.display="block";const rpCheckbox=document.createElement("input");rpCheckbox.type="checkbox";try{rpCheckbox.checked=localStorage.getItem("sky-rp")==="true";}catch{}rpCheckbox.addEventListener("change",()=>{try{localStorage.setItem("sky-rp",String(rpCheckbox.checked));}catch{}});rpLabel.append(rpCheckbox," RP");
const diagnosticButton=document.createElement('button');diagnosticButton.type='button';diagnosticButton.textContent='Exporter le diagnostic';diagnosticButton.style.cssText='display:block;margin-top:8px';diagnosticButton.onclick=downloadDiagnostics;const settingsLeave=document.createElement('button');settingsLeave.id='sky-settings-leave';settingsLeave.type='button';settingsLeave.textContent=leave.textContent;settingsLeave.hidden=leave.hidden;settingsLeave.onclick=()=>{settings.open=false;leave.click();};new MutationObserver(()=>{settingsLeave.hidden=leave.hidden;}).observe(leave,{attributes:true,attributeFilter:['hidden']});const perfLabel=document.createElement('label');perfLabel.style.display='block';const perfBox=document.createElement('input');perfBox.type='checkbox';try{perfBox.checked=localStorage.getItem('sky-perf-hud')==='1';}catch{}perfHud.hidden=!perfBox.checked;perfBox.addEventListener('change',()=>{perfHud.hidden=!perfBox.checked;try{localStorage.setItem('sky-perf-hud',perfBox.checked?'1':'0');}catch{}});perfLabel.append(perfBox,' Afficher FPS et ping');
const effectsLabel=document.createElement('label');effectsLabel.style.cssText='display:flex;align-items:center;gap:8px;margin-top:10px';const effectsSlider=document.createElement('input');effectsSlider.type='range';effectsSlider.min='0';effectsSlider.max='100';effectsSlider.step='1';effectsSlider.value=String(Math.round(effectsVolume()*100));effectsSlider.style.cssText='width:100px;accent-color:#dab36a';effectsSlider.setAttribute('aria-label','Volume des effets');effectsSlider.addEventListener('input',()=>setEffectsVolume(Number(effectsSlider.value)/100));effectsLabel.append('🔊 Effets',effectsSlider);
settings.append(gear,layoutLabel,rpLabel,diagnosticButton,settingsLeave,effectsLabel,perfLabel);document.body.append(settings);createBindingOptions(settings);
const compactStyle=document.createElement("style");compactStyle.textContent=`/* phones: the chat is an icon in the top right, left of Discord's own buttons */body[data-sky-touch] #sky-chat-toggle{top:calc(10px + env(safe-area-inset-top,0px));bottom:auto!important;right:calc(100px + env(safe-area-inset-right,0px));min-height:40px;min-width:44px;padding:2px 8px;font-size:20px;line-height:1}/* phones: the return button lives in the settings */body[data-sky-touch] #sky-leave{display:none!important}#sky-settings-leave{display:none;margin-top:8px}body[data-sky-touch] #sky-settings-leave:not([hidden]){display:block}body[data-sky-editing] #sky-chat{bottom:calc(12px + var(--sky-keyboard-inset,0px))!important}#sky-settings{position:fixed;left:16px;bottom:82px;z-index:31;color:#ffe7b0;background:#211c2aee;border:1px solid #b49760;border-radius:5px;padding:8px;max-height:70vh;overflow:auto;max-width:280px;font:14px system-ui}#sky-settings summary{cursor:pointer;font-size:22px;list-style:none}#sky-settings select{font:inherit;padding:6px}body[data-sky-touch] #hud{display:none}body[data-sky-touch] #sky-settings{left:8px;bottom:190px}body[data-sky-touch] #sky-settings>label:first-of-type{display:none}body[data-sky-touch] #sky-leave{top:auto!important;right:auto!important;left:8px;bottom:125px;max-width:155px}body[data-sky-touch] #sky-chat{bottom:calc(190px + var(--sky-keyboard-inset,0px))!important}@media(any-pointer:coarse),(max-width:600px){body[data-sky-ready] #hud{display:none}#sky-settings{left:8px;bottom:190px}#sky-settings>label:first-of-type{display:none}#sky-leave{top:auto!important;right:auto!important;left:8px;bottom:125px;max-width:155px;min-height:44px}#sky-chat{bottom:calc(190px + var(--sky-keyboard-inset,0px))!important}#sky-prophunt{top:60px!important;left:8px;right:auto!important;max-width:220px!important}}`;
document.head.append(compactStyle);

function base64url(donnees) {
  const octets = new Uint8Array(donnees);
  let texte = "";
  for (const octet of octets) texte += String.fromCharCode(octet);
  return btoa(texte).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// PKCE : l'echange du code se fait sans secret d'application.
async function defiPkce() {
  const verifieur = base64url(crypto.getRandomValues(new Uint8Array(32)));
  const empreinte = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifieur),
  );
  return { verifieur, defi: base64url(empreinte) };
}

// Discord ne signale pas toujours un blocage : au-dela du delai on affiche
// l'erreur au lieu de rester indefiniment sur "connexion...".
function avecDelai(promesse, ms, libelle) {
  return Promise.race([
    promesse,
    new Promise((_, rejeter) => {
      setTimeout(() => rejeter(new Error(`${libelle} (${ms / 1000} s)`)), ms);
    }),
  ]);
}

async function entrer() {
  if (__ACTIVITY_PREVIEW__ && apercuLocal) {
    const suffixe = Math.random().toString(36).slice(2, 6);
    etat.moi = {
      id: `local-${suffixe}`,
      nom: `moi-${suffixe}`,
      ...scene.spawn,
    };
    bandeau.textContent = "Aperçu local · choisissez un personnage.";
    return;
  }

  const sdk = etat.sdk ??= new DiscordSDK(CLIENT_ID);
  etape(`1/4 SDK, client ${CLIENT_ID}`);
  await avecDelai(sdk.ready(), 10000, "Discord n a pas repondu (SDK)");
  etape("2/4 SDK pret, autorisation...");
  // An OAuth code is single-use: a retry obtains a fresh code and PKCE verifier.
  const reponse = await retryConnection(async () => {
  const { verifieur, defi } = await defiPkce();
  const { code } = await avecDelai(
    sdk.commands.authorize({
      client_id: CLIENT_ID,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: ["identify"],
      code_challenge: defi,
      code_challenge_method: "S256",
    }),
    15000,
    "Discord n a pas repondu (autorisation)",
  );
  etape("3/4 code recu, jeton...");
  return await fetchJson(apiUrl("token"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, code_verifier: verifieur }),
  });
  }, { onRetry: (_, attempt, total) => etape(`Connexion Discord : nouvelle tentative ${attempt}/${total}...`) });
  const { access_token: jeton, erreur } = reponse;
  if (!jeton)
    throw new Error(erreur ?? `jeton absent (HTTP ${reponse.status})`);
  etape("4/4 jeton recu, identification...");

  const auth = await sdk.commands.authenticate({ access_token: jeton });
  etat.salon = sdk.channelId ?? "local";
  etat.accessToken = jeton;
  const profileResponse = await retryConnection(() => fetchJson(apiUrl("profile"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jeton,
    },
    body: JSON.stringify({ channel: etat.salon, guild: sdk.guildId }),
  }), { onRetry: (_, attempt, total) => etape(`Connexion au duel : nouvelle tentative ${attempt}/${total}...`) });
  const profile = profileResponse;
  etat.map = profile.map ?? "anterose";
  etat.token = profile.activity_token;
  etat.messageCursor = profile.messageCursor ?? 0;
  etat.character = profile.character;
  etat.moi = {
    id: auth.user.id,
    nom: etat.character,
    character: etat.character,
    ...profile.player,
  };
  bandeau.textContent = `Votre personnage : ${etat.moi.nom}\nMonde partagé · Les messages envoyés ici ou en MP à Capel apparaissent en bulles.`;
}

let wakePoll = () => {};

async function publier() {
  if (!etat.token) return;
  const submitted = training||trainingBusy ? {} : scene.movement();
  const requestStarted=performance.now();
  const response = await fetchJson(apiUrl("state"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + etat.token,
    },
    body: JSON.stringify({
      ...submitted,
      trainingAck:lastTrainingRequest??undefined,
      passive:training||trainingBusy?true:undefined,
      after: etat.messageCursor,
      action: training||trainingBusy?undefined:scene.action(),
    }),
  });
  if(!training)notePing(performance.now()-requestStarted);
  const result = response;
  if(trainingBusy)return;
  const requestedTraining=result.trainingRequest&&result.trainingRequest!==lastTrainingRequest;if(result.trainingRequest)lastTrainingRequest=result.trainingRequest;
  if(training){terminal.setRequests(result.requests);if(result.map!=='arena'&&result.map!=='axis')return;await stopTraining(result.map);}
  terminal.setRequests(result.requests);
  const ownPlayer=result.joueurs.find(p=>p.id===result.ownId)??{id:result.ownId,character:result.character,...result.position,...result.health,prop:result.game?.prop??null};
  etat.moi=ownPlayer;
  if (result.map !== (etat.map ?? "anterose") || (etat.sceneKey && result.sceneKey !== etat.sceneKey)) {
    scene.dispose(); etat.map = result.map;
    scene = await createSkyScene(toile, etat.map);
    bindScene();
    await scene.me(ownPlayer);
    music.setTrack(musicUrl(etat.map));
    etat.messageCursor = result.messageCursor;
  } else if (result.relocated) {
    await scene.resetSession(ownPlayer);
    etat.messageCursor = result.messageCursor;
  }
  document.querySelector("#hud h1").textContent = mapTitle(result.map);
  etat.sceneKey = result.sceneKey; leave.hidden = result.map === "anterose";
  scene.setConnected(true);
  scene.acknowledgeMovement(result.movementSequence ?? submitted.sequence);
  scene.correct(result.position, submitted);
  updateHunt(result.game ? {...result.game,received:Date.now()} : null);
  if(result.duel&&result.duel.id!==lastDuelIntro&&result.health.serverTime<result.duel.readyAt){lastDuelIntro=result.duel.id;music.restart();playMatchFound();}
  showQueue(result.duel?null:result.queue,result.health?.serverTime);
  await scene.world(result);
  await scene.sync([
    ...result.joueurs,
    ...(result.npcs ?? []),
    ...(result.enemies??[]).filter(e=>e.hp>0||((e.deadUntil??0)-(result.health?.serverTime??Date.now()))>28000),
    ...(result.poms ?? (result.pom ? [{id:"world:pom",...result.pom}] : [])).map(p=>({character:"Pom",npc:true,...p})),
  ]);
  scene.messages(result.messages ?? []);
  etat.messageCursor = result.messageCursor ?? etat.messageCursor;
  if(requestedTraining&&result.map!=='arena'&&result.map!=='axis')await startTraining();
  if (result.character && result.character !== etat.character) {
    etat.character = result.character;
    bandeau.textContent = "Votre personnage du jour : " + result.character;
  }
}
async function start() {
  if (!dedansDiscord && !apercuLocal) {
    bandeau.textContent = "Ouvrez cette activité depuis Discord.";
    return;
  }
  etape("Chargement du restaurant Antérose…");
  if (apercuLocal) { etat.map = new URLSearchParams(location.search).get("map") ?? "anterose"; scene = await createSkyScene(toile, etat.map); }
  await entrer();
  scene ??= await createSkyScene(toile, etat.map ?? "anterose");
  bindScene();
  music = createMapMusic(musicUrl(etat.map),settings);
  leave.hidden = etat.map === "anterose";
  document.querySelector("#hud h1").textContent = mapTitle(etat.map);
  await scene.me({ ...etat.moi, character: etat.character });
  if((etat.map??'anterose')==='anterose'){const warm=()=>void prepareTrainingArena().catch(error=>recordDiagnostic('arena-preload-error',{message:error.message}));if(window.requestIdleCallback)window.requestIdleCallback(warm,{timeout:2500});else setTimeout(warm,500);}
  if(apercuLocal)scene.setConnected(true);
  chat.hidden = false;document.body.dataset.skyReady="true";
  if (
    __ACTIVITY_PREVIEW__ &&
    apercuLocal &&
    new URLSearchParams(location.search).has("inspect")
  )
    window.__activityPreview = Object.assign(scene,{setHuntState:game=>updateHunt(game?{...game,received:Date.now()}:null),setRequests:requests=>terminal.setRequests(requests)});
  if (__ACTIVITY_PREVIEW__ && apercuLocal) {
    const picker = document.getElementById("personnage");
    picker.hidden = false;
    const dialogueTest = document.getElementById("dialogue-test");
    dialogueTest.hidden = false;
    dialogueTest.addEventListener("submit", (event) => {
      event.preventDefault();
      scene.say(dialogueTest.elements.phrase.value);
    });
    for (const name of Object.keys(scene.catalogue).filter(n=>!n.startsWith("Concours "))) {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      picker.append(option);
    }
    const twoDialogues = document.createElement("button");
    twoDialogues.type = "button";
    twoDialogues.textContent = "Tester deux bulles";
    twoDialogues.addEventListener("click", () => void scene.demoConversation());
    dialogueTest.append(twoDialogues);
    if(etat.map==='anterose'){const demo=document.createElement('button');demo.type='button';demo.textContent='Voir la table du concours';demo.onclick=()=>void scene.demoDrinkingTable();dialogueTest.append(demo);}
    const trainingTest=document.createElement('button');trainingTest.type='button';trainingTest.textContent='Tester entraînement IA';trainingTest.onclick=()=>void startTraining();dialogueTest.append(trainingTest);if(etat.map==='arena'||etat.map==='axis'){const photo=document.createElement('button');photo.type='button';photo.textContent='Tester le flash photo';photo.onclick=()=>void scene.demoPhoto();dialogueTest.append(photo);const loewe=document.createElement('button');loewe.type='button';loewe.textContent='Tester Loewe';loewe.onclick=()=>void scene.demoLoewe();dialogueTest.append(loewe);const dimension=document.createElement('button');dimension.type='button';dimension.textContent='Tester Another Dimension';dimension.onclick=()=>void scene.demoDimension();dialogueTest.append(dimension);const emptyDimension=document.createElement('button');emptyDimension.type='button';emptyDimension.textContent='Tester la zone vide';emptyDimension.onclick=()=>void scene.demoDimension(true);dialogueTest.append(emptyDimension);const demo=document.createElement('button');demo.type='button';demo.textContent='Tester l’introduction';demo.onclick=()=>void scene.demoIntro();dialogueTest.append(demo);}
    picker.addEventListener("change", () =>
      scene.me({ ...etat.moi, ...scene.position(), character: picker.value }),
    );
  } else {
    bandeau.textContent =
      "Votre personnage du jour : " +
      etat.character +
      (scene.catalogue[etat.character] ? "" : " · sprite Estelle provisoire") +
      "";
  }
  let failures = 0, timer, inFlight = false, requested = false, stopped = false;
  wakePoll = () => { requested = true; if (!inFlight && !stopped) { clearTimeout(timer); void poll(); } };
  async function poll() {
    if (inFlight || stopped) return;
    inFlight = true; requested = false;
    try {
      await publier();if(failures)recordDiagnostic('connection-restored',{failures},true); failures = 0;connectionNotice.hidden=true;
      bandeau.textContent = "Votre personnage du jour : " + etat.character;
    } catch (error) {
      recordDiagnostic('connection-error',{status:error.status??0},true);if(!training)scene.setConnected(false); failures++;connectionNotice.textContent=error.message;connectionNotice.hidden=false;
      bandeau.textContent = error.message;
      if (error.status === 409) { inFlight = false; stopped = true; return; } // Do not steal control back from another window.
      if (error.status === 401) {
        try {
          const profile = await fetchJson(apiUrl("profile"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+etat.accessToken},body:JSON.stringify({channel:etat.salon,guild:etat.sdk.guildId})});
          etat.token = profile.activity_token; etat.messageCursor = profile.messageCursor ?? 0;
          etat.character = profile.character; etat.moi = profile.player;
          if (profile.map !== etat.map) {
            scene.dispose(); etat.map = profile.map; scene = await createSkyScene(toile,etat.map); bindScene();
            music.setTrack(musicUrl(etat.map));
          }
          await scene.resetSession(profile.player); etat.sceneKey = null;
          bandeau.textContent = "Connexion rétablie.";
        } catch (reconnectError) { bandeau.textContent = "Reconnexion en cours. " + reconnectError.message; }
      }
    }
    inFlight = false;
    timer = setTimeout(poll, training ? 1500 : requested ? 0 : Math.min(2000, failures ? 300 * failures : 150));
  }
  void poll();
}
function showLoadError(error) {
  bandeau.textContent = "Chargement impossible : " + error.message;
  const retry = document.createElement("button");
  retry.textContent = "Réessayer la connexion";
  retry.style.cssText = "display:block;margin-top:10px;padding:8px 12px;cursor:pointer";
  retry.onclick = () => { retry.remove(); scene?.dispose(); music?.dispose(); scene = null; music = null; void start().catch(showLoadError); };
  bandeau.append(retry);
  console.error(error);
}
void start().catch(showLoadError);
