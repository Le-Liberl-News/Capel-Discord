// Carte isometrique minimale : une grille, un cube rouge par joueur Discord,
// deplacement au clic. Les positions sont echangees avec le serveur par
// l'intermediaire du proxy Discord (`/.proxy/api/...`).

import { DiscordSDK } from '@discord/embedded-app-sdk';

const CLIENT_ID = window.__CLIENT_ID__ || '__CLIENT_ID__';
const VERSION = 'v4';

// Journal a l'ecran : Discord refuse une poignee de main par un message CLOSE
// que le SDK ignore, donc on note tout ce qui arrive.
const journal = [];
let etapeTexte = '';

const etape = (texte) => {
  etapeTexte = texte;
  majBandeau();
};

function majBandeau() {
  bandeau.textContent = [
    `${VERSION} — ${etapeTexte}`,
    `client ${CLIENT_ID}`,
    `origine ${location.origin}`,
    `referrer ${document.referrer || 'aucun'}`,
    ...journal,
  ].join('\n');
}

const GRILLE = 12;                        // tuiles par cote
const TUILE_L = 56;                       // largeur d'une tuile (pixels)
const TUILE_H = 28;                       // hauteur d'une tuile (rapport 2:1)
const HAUTEUR = 34;                       // hauteur du cube d'un joueur
const PAS_RESEAU = 150;                   // ms entre deux echanges avec le serveur
const VITESSE = 0.18;                     // fraction du chemin par image

const bandeau = document.getElementById('bandeau');
const toile = document.getElementById('scene');
const contexte = toile.getContext('2d');

const dedansDiscord = new URLSearchParams(location.search).has('frame_id');

// Base des appels API. Par defaut celle du proxy Discord ; on peut aussi la
// pointer sur un relais PHP (/.proxy/api.php?r=...) quand l'activite est servie
// depuis un site qui ne sait pas router /api/... vers le bot.
const apiBase = window.__API_BASE__ || (dedansDiscord ? '/.proxy/api' : '/api');
const apiUrl = (route) => (apiBase.endsWith('.php')
  ? `${apiBase}?r=${route}`
  : `${apiBase}/${route}`);

if (dedansDiscord) {
  addEventListener('message', (evenement) => {
    let resume;
    try {
      resume = JSON.stringify(evenement.data);
    } catch {
      resume = String(evenement.data);
    }
    journal.push(`recu [${evenement.origin}] ${resume.slice(0, 80)}`);
    while (journal.length > 5) journal.shift();
    majBandeau();
  });
}

const etat = {
  salon: 'local',
  moi: { id: 'local', nom: 'moi', x: 3, z: 3 },
  autres: new Map(),
  cible: null,
};

function ajuster() {
  const echelle = Math.min(window.devicePixelRatio || 1, 2);
  toile.width = Math.floor(innerWidth * echelle);
  toile.height = Math.floor(innerHeight * echelle);
  contexte.setTransform(echelle, 0, 0, echelle, 0, 0);
}

function origine() {
  return {
    x: innerWidth / 2,
    y: innerHeight / 2 - ((GRILLE - 1) * TUILE_H) / 2,
  };
}

function projeter(x, z) {
  return { x: (x - z) * (TUILE_L / 2), y: (x + z) * (TUILE_H / 2) };
}

function versTuile(px, py) {
  const o = origine();
  const dx = px - o.x;
  const dy = py - o.y;
  return {
    x: Math.floor((dx / (TUILE_L / 2) + dy / (TUILE_H / 2)) / 2),
    z: Math.floor((dy / (TUILE_H / 2) - dx / (TUILE_L / 2)) / 2),
  };
}

function tuile(o, x, z, claire) {
  const c = projeter(x, z);
  contexte.beginPath();
  contexte.moveTo(o.x + c.x, o.y + c.y - TUILE_H / 2);
  contexte.lineTo(o.x + c.x + TUILE_L / 2, o.y + c.y);
  contexte.lineTo(o.x + c.x, o.y + c.y + TUILE_H / 2);
  contexte.lineTo(o.x + c.x - TUILE_L / 2, o.y + c.y);
  contexte.closePath();
  contexte.fillStyle = claire ? '#243040' : '#1d2836';
  contexte.fill();
  contexte.strokeStyle = '#2f3d4e';
  contexte.lineWidth = 1;
  contexte.stroke();
}

function cube(o, joueur, estMoi) {
  const c = projeter(joueur.x, joueur.z);
  const cx = o.x + c.x;
  const cy = o.y + c.y;

  contexte.beginPath();
  contexte.ellipse(cx, cy + 2, TUILE_L * 0.32, TUILE_H * 0.28, 0, 0, Math.PI * 2);
  contexte.fillStyle = 'rgba(0, 0, 0, 0.35)';
  contexte.fill();

  const ouest = { x: cx - TUILE_L * 0.25, y: cy };
  const sud = { x: cx, y: cy + TUILE_H * 0.25 };
  const est = { x: cx + TUILE_L * 0.25, y: cy };
  const haut = { x: cx, y: cy - TUILE_H * 0.25 };

  const face = (a, b, couleur) => {
    contexte.beginPath();
    contexte.moveTo(a.x, a.y);
    contexte.lineTo(b.x, b.y);
    contexte.lineTo(b.x, b.y - HAUTEUR);
    contexte.lineTo(a.x, a.y - HAUTEUR);
    contexte.closePath();
    contexte.fillStyle = couleur;
    contexte.fill();
  };

  face(ouest, sud, estMoi ? '#8f1c1c' : '#7d2020');
  face(sud, est, estMoi ? '#c02020' : '#a02525');

  contexte.beginPath();
  contexte.moveTo(haut.x, haut.y - HAUTEUR);
  contexte.lineTo(est.x, est.y - HAUTEUR);
  contexte.lineTo(sud.x, sud.y - HAUTEUR);
  contexte.lineTo(ouest.x, ouest.y - HAUTEUR);
  contexte.closePath();
  contexte.fillStyle = estMoi ? '#f04040' : '#d84848';
  contexte.fill();
  if (estMoi) {
    contexte.strokeStyle = '#ffffff';
    contexte.lineWidth = 1.5;
    contexte.stroke();
  }

  contexte.fillStyle = estMoi ? '#e8eef4' : '#aebccb';
  contexte.font = '12px system-ui, sans-serif';
  contexte.textAlign = 'center';
  contexte.fillText(joueur.nom, cx, cy - HAUTEUR - 10);
}

function dessiner() {
  const fond = contexte.createLinearGradient(0, 0, 0, innerHeight);
  fond.addColorStop(0, '#111a22');
  fond.addColorStop(1, '#0a0e12');
  contexte.fillStyle = fond;
  contexte.fillRect(0, 0, innerWidth, innerHeight);

  const o = origine();
  const joueurs = [...etat.autres.values(), etat.moi];
  const parProfondeur = new Map();
  for (const joueur of joueurs) {
    const cle = Math.round(joueur.x + joueur.z);
    if (!parProfondeur.has(cle)) parProfondeur.set(cle, []);
    parProfondeur.get(cle).push(joueur);
  }

  for (let somme = 0; somme <= 2 * (GRILLE - 1); somme += 1) {
    for (let x = 0; x < GRILLE; x += 1) {
      const z = somme - x;
      if (z < 0 || z >= GRILLE) continue;
      tuile(o, x, z, (x + z) % 2 === 0);
    }
    for (const joueur of parProfondeur.get(somme) ?? []) {
      cube(o, joueur, joueur === etat.moi);
    }
  }
}

function animer() {
  const moi = etat.moi;
  if (etat.cible) {
    moi.x += (etat.cible.x - moi.x) * VITESSE;
    moi.z += (etat.cible.z - moi.z) * VITESSE;
    if (Math.hypot(etat.cible.x - moi.x, etat.cible.z - moi.z) < 0.01) {
      moi.x = etat.cible.x;
      moi.z = etat.cible.z;
      etat.cible = null;
    }
  }
  for (const joueur of etat.autres.values()) {
    if (!joueur.cible) continue;
    joueur.x += (joueur.cible.x - joueur.x) * 0.12;
    joueur.z += (joueur.cible.z - joueur.z) * 0.12;
  }
  dessiner();
  requestAnimationFrame(animer);
}

toile.addEventListener('pointerdown', (evenement) => {
  const case_ = versTuile(evenement.clientX, evenement.clientY);
  if (case_.x < 0 || case_.z < 0 || case_.x >= GRILLE || case_.z >= GRILLE) return;
  etat.cible = { x: case_.x, z: case_.z };
});

async function publier() {
  try {
    const reponse = await fetch(apiUrl('state'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel: etat.salon,
        id: etat.moi.id,
        nom: etat.moi.nom,
        x: etat.moi.x,
        z: etat.moi.z,
      }),
    });
    if (!reponse.ok) return;
    const { joueurs } = await reponse.json();
    const vus = new Set();
    for (const joueur of joueurs) {
      if (joueur.id === etat.moi.id) continue;
      vus.add(joueur.id);
      const connu = etat.autres.get(joueur.id);
      if (connu) {
        connu.nom = joueur.nom;
        connu.cible = { x: joueur.x, z: joueur.z };
      } else {
        etat.autres.set(joueur.id, {
          id: joueur.id,
          nom: joueur.nom,
          x: joueur.x,
          z: joueur.z,
          cible: { x: joueur.x, z: joueur.z },
        });
      }
    }
    for (const cle of [...etat.autres.keys()]) {
      if (!vus.has(cle)) etat.autres.delete(cle);
    }
  } catch {
    // pas de reseau : on retente au prochain tour
  }
}

function base64url(donnees) {
  const octets = new Uint8Array(donnees);
  let texte = '';
  for (const octet of octets) texte += String.fromCharCode(octet);
  return btoa(texte).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// PKCE : l'echange du code se fait sans secret d'application.
async function defiPkce() {
  const verifieur = base64url(crypto.getRandomValues(new Uint8Array(32)));
  const empreinte = await crypto.subtle.digest(
    'SHA-256', new TextEncoder().encode(verifieur));
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
  if (!dedansDiscord) {
    const suffixe = Math.random().toString(36).slice(2, 6);
    etat.moi = { id: `local-${suffixe}`, nom: `moi-${suffixe}`, x: 3, z: 3 };
    bandeau.textContent = 'Hors Discord : mode local.\nOuvre un second onglet pour voir deux carres.';
    return;
  }

  const sdk = new DiscordSDK(CLIENT_ID);
  etape(`1/4 SDK, client ${CLIENT_ID}`);
  await avecDelai(sdk.ready(), 10000, 'Discord n a pas repondu (SDK)');
  etape('2/4 SDK pret, autorisation...');
  const { verifieur, defi } = await defiPkce();
  const { code } = await avecDelai(sdk.commands.authorize({
    client_id: CLIENT_ID,
    response_type: 'code',
    state: '',
    prompt: 'none',
    scope: ['identify'],
    code_challenge: defi,
    code_challenge_method: 'S256',
  }), 15000, 'Discord n a pas repondu (autorisation)');
  etape('3/4 code recu, jeton...');
  const reponse = await fetch(apiUrl('token'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, code_verifier: verifieur }),
  });
  const { access_token: jeton, erreur } = await reponse.json();
  if (!jeton) throw new Error(erreur ?? `jeton absent (HTTP ${reponse.status})`);
  etape('4/4 jeton recu, identification...');

  const auth = await sdk.commands.authenticate({ access_token: jeton });
  etat.salon = sdk.channelId ?? 'local';
  etat.moi = {
    id: auth.user.id,
    nom: auth.user.global_name ?? auth.user.username,
    x: 3,
    z: 3,
  };
  bandeau.textContent = `Connecte : ${etat.moi.nom}\nSalon ${etat.salon}`;
}

ajuster();
addEventListener('resize', ajuster);
requestAnimationFrame(animer);

entrer()
  .catch((erreur) => {
    bandeau.textContent = `Erreur de connexion : ${erreur.message}`;
  })
  .finally(() => {
    publier();
    setInterval(publier, PAS_RESEAU);
  });
