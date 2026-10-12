import {DUEL_INTRO_DURATION} from './duel-intro.mjs';
import {createTraining} from './training.mjs';
import trainingCombat from './native-combat.cjs';
import {createCapturePublisher} from "./capture-publisher.mjs";
import {downloadDiagnostics,recordDiagnostic} from './diagnostics.mjs';
import {createTerminalUI} from "./terminal-ui.mjs";
import {keyboardLayout,createBindingOptions} from "./controls.mjs";
import { fetchJson, retryConnection } from "./network.mjs";
import { DiscordSDK } from "@discord/embedded-app-sdk";
import { createMapMusic } from "./music.mjs";
import { createSkyScene, ASSETS } from "./sky-scene.mjs";
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
 action:body=>body.action==='training'?startTraining():apercuLocal?Promise.resolve({message:"Aper\u00e7u."}):fetchJson(apiUrl("terminal"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+etat.token},body:JSON.stringify(body)}),
 changed:()=>wakePoll()
});
function bindScene(){scene.onAction(()=>{if(training){if(['leave_map','leave_duel'].includes(scene.action()?.type))void stopTraining();return;}if(apercuLocal&&scene.action()?.type==='hangar_enter')void previewTravel('hangar');else if(apercuLocal&&scene.action()?.type==='flight_board')void previewTravel('liberl');else if(apercuLocal&&['leave_map','leave_duel'].includes(scene.action()?.type))void previewTravel('anterose');else wakePoll();});scene.onTerminal(()=>void terminal.open());scene.onCraftCapture(event=>void publishCraftCapture(event));}

const trainingResult=document.createElement('div');trainingResult.hidden=true;trainingResult.style.cssText='position:fixed;top:35%;left:50%;transform:translateX(-50%);z-index:35;background:#211c2af2;color:#ffe7b0;border:2px solid #b49760;padding:20px;text-align:center;font:22px AveriaSky,sans-serif';
const trainingWinner=document.createElement('p'),trainingAgain=document.createElement('button'),trainingExit=document.createElement('button');trainingAgain.textContent='Rejouer';trainingExit.textContent='Retour';for(const b of [trainingAgain,trainingExit])b.style.cssText='font:inherit;padding:8px;margin:5px;background:#ead29c;color:#241b15;border:1px solid #b49760;border-radius:4px';trainingResult.append(trainingWinner,trainingAgain,trainingExit);document.body.append(trainingResult);
trainingAgain.onclick=()=>void startTraining();trainingExit.onclick=()=>void stopTraining();
async function startTraining(){
 if(trainingBusy)return;trainingBusy=true;clearTimeout(trainingTimer);trainingResult.hidden=true;
 if(trainingStep)await trainingStep;
 if(!training)trainingReturn={map:etat.map??'anterose',player:{...etat.moi,...scene.position(),character:scene.playerCharacter?.()??etat.character}};
 let titles={};try{if(!apercuLocal)titles=(await fetchJson(apiUrl('terminal')+(apiUrl('terminal').includes('?')?'&':'?')+'training=1',{headers:{Authorization:'Bearer '+etat.token}})).titles;}catch(error){trainingBusy=false;throw error;}
 training=null;scene.dispose();scene=null;
 try{scene=await createSkyScene(toile,'arena',{localTraining:true});const opponents=Object.keys(trainingCombat.COMBAT).filter(name=>scene.catalogue[name]&&['basic','craft','art'].some(kind=>trainingCombat.combatSpec(name,kind)));const opponent=opponents[Math.floor(Math.random()*opponents.length)];training=createTraining({...scene.trainingGeometry(),character:trainingReturn.player.character,opponent,titles,introDuration:DUEL_INTRO_DURATION});bindScene();await scene.me(training.player);scene.setConnected(true);leave.hidden=false;connectionNotice.hidden=true;document.querySelector('#hud h1').textContent='Entraînement · '+opponent+' (IA)';music.setTrack(musicUrl('arena'));}
 catch(error){trainingBusy=false;await stopTraining();throw error;}
 trainingBusy=false;void tickTraining();
}
function tickTraining(){trainingStep=runTrainingTick();return trainingStep;}
async function runTrainingTick(){
 const active=training,current=scene;if(!active||trainingBusy)return;
 try{const submitted=current.movement(),command=current.action(),result=active.tick(submitted,command);
 current.acknowledgeMovement(submitted.sequence);await current.world(result);await current.sync([...result.joueurs,...result.enemies,...result.poms.map(p=>({character:'Pom',npc:true,...p}))]);current.messages(result.messages);
 if(result.finish){trainingResult.hidden=false;trainingWinner.textContent='Victoire de '+result.finish.winner;}
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

const mapTitle = map => map==='hangar'?'Antérose · Lynx':map==='liberl'?'Liberl · Lynx':/^tower[1-4]$/.test(map)?map==="tower4"?"Tour d’Esmelas · Sommet":"Tour d’Esmelas · Etage "+map.slice(5):map === "rolent" ? "Rolent · Prop Hunt" : map === "arena" ? "Arène de Grancel" : "Restaurant Antérose";
const musicUrl = map => new URL(map === "arena" ? "music/arena.ogg?v=fc-tournament-20261009" : /^tower[1-4]$/.test(map) ? "music/esmelas.ogg" : "music/anterose.ogg",ASSETS);
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
const chatToggle=document.createElement("button");chatToggle.id="sky-chat-toggle";chatToggle.type="button";chatToggle.textContent="Discussion";chatToggle.setAttribute("aria-expanded","false");
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
const diagnosticButton=document.createElement('button');diagnosticButton.type='button';diagnosticButton.textContent='Exporter le diagnostic';diagnosticButton.style.cssText='display:block;margin-top:8px';diagnosticButton.onclick=downloadDiagnostics;settings.append(gear,layoutLabel,rpLabel,diagnosticButton);document.body.append(settings);createBindingOptions(settings);
const compactStyle=document.createElement("style");compactStyle.textContent=`body[data-sky-editing] #sky-chat{bottom:calc(12px + var(--sky-keyboard-inset,0px))!important}#sky-settings{position:fixed;left:16px;bottom:82px;z-index:31;color:#ffe7b0;background:#211c2aee;border:1px solid #b49760;border-radius:5px;padding:8px;max-height:70vh;overflow:auto;max-width:280px;font:14px system-ui}#sky-settings summary{cursor:pointer;font-size:22px;list-style:none}#sky-settings select{font:inherit;padding:6px}body[data-sky-touch] #hud{display:none}body[data-sky-touch] #sky-settings{left:8px;bottom:190px}body[data-sky-touch] #sky-settings>label:first-of-type{display:none}body[data-sky-touch] #sky-leave{top:auto!important;right:auto!important;left:8px;bottom:125px;max-width:155px}body[data-sky-touch] #sky-chat{bottom:calc(190px + var(--sky-keyboard-inset,0px))!important}@media(any-pointer:coarse),(max-width:600px){body[data-sky-ready] #hud{display:none}#sky-settings{left:8px;bottom:190px}#sky-settings>label:first-of-type{display:none}#sky-leave{top:auto!important;right:auto!important;left:8px;bottom:125px;max-width:155px;min-height:44px}#sky-chat{bottom:calc(190px + var(--sky-keyboard-inset,0px))!important}#sky-prophunt{top:60px!important;left:8px;right:auto!important;max-width:220px!important}}`;
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
  const result = response;
  if(trainingBusy)return;
  const requestedTraining=result.trainingRequest&&result.trainingRequest!==lastTrainingRequest;if(result.trainingRequest)lastTrainingRequest=result.trainingRequest;
  if(training){terminal.setRequests(result.requests);if(result.map!=='arena')return;await stopTraining(result.map);}
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
  if(result.duel&&result.duel.id!==lastDuelIntro&&result.health.serverTime<result.duel.readyAt){lastDuelIntro=result.duel.id;music.restart();}
  await scene.world(result);
  await scene.sync([
    ...result.joueurs,
    ...(result.npcs ?? []),
    ...(result.enemies??[]).filter(e=>e.hp>0||((e.deadUntil??0)-(result.health?.serverTime??Date.now()))>28000),
    ...(result.poms ?? (result.pom ? [{id:"world:pom",...result.pom}] : [])).map(p=>({character:"Pom",npc:true,...p})),
  ]);
  scene.messages(result.messages ?? []);
  etat.messageCursor = result.messageCursor ?? etat.messageCursor;
  if(requestedTraining&&result.map!=='arena')await startTraining();
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
    for (const name of Object.keys(scene.catalogue)) {
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
    if(etat.map==='arena'){const demo=document.createElement('button');demo.type='button';demo.textContent='Tester l’introduction';demo.onclick=()=>void scene.demoIntro();dialogueTest.append(demo);}
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
