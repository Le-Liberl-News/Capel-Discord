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
let scene, music;
const leave = document.createElement("button"); leave.textContent = "Retour à l’Antérose"; leave.hidden = true; leave.style.cssText = "position:fixed;right:16px;top:16px;padding:8px 12px;color:#ffe7b0;background:#211c2a;border:1px solid #b49760;border-radius:4px;cursor:pointer"; leave.addEventListener("click",()=>scene?.leaveDuel()); document.body.append(leave);
const chat = document.createElement("form");
chat.id = "sky-chat";
chat.hidden = true;
chat.style.cssText = "position:fixed;right:16px;bottom:70px;z-index:15;width:300px;max-width:calc(100vw - 32px);padding:10px;box-sizing:border-box;background:#211c2aee;border:1px solid #b49760;border-radius:5px;color:#ffe7b0;font:13px system-ui";
const chatLabel = document.createElement("label");
chatLabel.textContent = "Discussion de la map";
const chatInput = document.createElement("input");
chatInput.name = "message"; chatInput.maxLength = 4000; chatInput.autocomplete = "off";
chatInput.placeholder = "Votre message…";
chatInput.style.cssText = "box-sizing:border-box;width:100%;padding:8px;margin:6px 0;color:#211c2a;background:#fff3d6;border:0;border-radius:3px";
chatLabel.append(chatInput);
const chatSend = document.createElement("button"); chatSend.type = "submit"; chatSend.textContent = "Envoyer";
chatSend.style.cssText = "padding:6px 12px;background:#f3dfb4;color:#332319;border:0;border-radius:3px;cursor:pointer";
const chatHint = document.createElement("small"); chatHint.textContent = " Visible par les joueurs de cette map.";
chat.append(chatLabel,chatSend,chatHint); document.body.append(chat);
chat.addEventListener("submit", event => { event.preventDefault(); if (scene?.speak(chatInput.value)) chatInput.value = ""; });
chatInput.addEventListener("focus", () => window.dispatchEvent(new Event("blur")));
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
  const submitted = scene.movement();
  const response = await fetchJson(apiUrl("state"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + etat.token,
    },
    body: JSON.stringify({
      ...submitted,
      after: etat.messageCursor,
      action: scene.action(),
    }),
  });
  const result = response;
  if (result.map !== (etat.map ?? "anterose") || (etat.sceneKey && result.sceneKey !== etat.sceneKey)) {
    scene.dispose(); etat.map = result.map;
    scene = await createSkyScene(toile, etat.map);
    scene.onAction(() => wakePoll());
    await scene.me({id:result.ownId,character:result.character,...result.position});
    music.setTrack(new URL(etat.map === "arena" ? "music/arena.ogg" : "music/anterose.ogg",ASSETS));
    etat.messageCursor = result.messageCursor;
  } else if (result.relocated) {
    await scene.resetSession({id:result.ownId,character:result.character,...result.position});
    etat.messageCursor = result.messageCursor;
  }
  document.querySelector("#hud h1").textContent = result.map === "arena" ? "Arène de Grancel" : "Restaurant Antérose";
  etat.sceneKey = result.sceneKey; leave.hidden = result.map !== "arena";
  scene.setConnected(true);
  scene.acknowledgeMovement(result.movementSequence ?? submitted.sequence);
  scene.correct(result.position, submitted);
  await scene.world(result);
  await scene.sync([
    ...result.joueurs,
    ...(result.npcs ?? []),
    ...(result.poms ?? (result.pom ? [{id:"world:pom",...result.pom}] : [])).map(p=>({character:"Pom",npc:true,...p})),
  ]);
  scene.messages(result.messages ?? []);
  etat.messageCursor = result.messageCursor ?? etat.messageCursor;
  if (result.character && result.character !== etat.character) {
    etat.character = result.character;
    await scene.me({
      ...etat.moi,
      ...scene.position(),
      character: result.character,
    });
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
  scene.onAction(() => wakePoll());
  music = createMapMusic(new URL(etat.map === "arena" ? "music/arena.ogg" : "music/anterose.ogg", ASSETS));
  leave.hidden = etat.map !== "arena";
  document.querySelector("#hud h1").textContent = etat.map === "arena" ? "Arène de Grancel" : "Restaurant Antérose";
  await scene.me({ ...etat.moi, character: etat.character });
  chat.hidden = false;
  if (
    __ACTIVITY_PREVIEW__ &&
    apercuLocal &&
    new URLSearchParams(location.search).has("inspect")
  )
    window.__activityPreview = scene;
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
    picker.addEventListener("change", () =>
      scene.me({ ...etat.moi, ...scene.position(), character: picker.value }),
    );
  } else {
    bandeau.textContent =
      "Votre personnage du jour : " +
      etat.character +
      (scene.catalogue[etat.character] ? "" : " · sprite Estelle provisoire") +
      "\nMonde partagé · Vos MP à Capel deviennent des bulles.";
  }
  let failures = 0, timer, inFlight = false, requested = false, stopped = false;
  wakePoll = () => { requested = true; if (!inFlight && !stopped) { clearTimeout(timer); void poll(); } };
  async function poll() {
    if (inFlight || stopped) return;
    inFlight = true; requested = false;
    try {
      await publier(); failures = 0;
      bandeau.textContent = "Votre personnage du jour : " + etat.character;
    } catch (error) {
      scene.setConnected(false); failures++;
      bandeau.textContent = error.message;
      if (error.status === 409) { inFlight = false; stopped = true; return; } // Do not steal control back from another window.
      if (error.status === 401) {
        try {
          const profile = await fetchJson(apiUrl("profile"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+etat.accessToken},body:JSON.stringify({channel:etat.salon,guild:etat.sdk.guildId})});
          etat.token = profile.activity_token; etat.messageCursor = profile.messageCursor ?? 0;
          etat.character = profile.character; etat.moi = profile.player;
          if (profile.map !== etat.map) {
            scene.dispose(); etat.map = profile.map; scene = await createSkyScene(toile,etat.map); scene.onAction(() => wakePoll());
            music.setTrack(new URL(etat.map === "arena" ? "music/arena.ogg" : "music/anterose.ogg",ASSETS));
          }
          await scene.resetSession(profile.player); etat.sceneKey = null;
          bandeau.textContent = "Connexion rétablie.";
        } catch (reconnectError) { bandeau.textContent = "Reconnexion en cours. " + reconnectError.message; }
      }
    }
    inFlight = false;
    timer = setTimeout(poll, requested ? 0 : Math.min(2000, failures ? 300 * failures : 150));
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
