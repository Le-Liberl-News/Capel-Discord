const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const bestiaire = require('./data/bestiaire.json');
const databasePersos = require('./data/persos.json');
const STATE_FILE = path.join(__dirname, 'map_state.json');
const VISION_RADIUS = 2;
const MAX_FLOOR = 10;


let state = {
    layout: null,
    playerX: 0,
    playerY: 0,
    messageId: null,
    hudMessageId: null, 
    channelId: null,
    isMoving: false,
    MAP_WIDTH: 20,
    MAP_HEIGHT: 20,
    TILE_SIZE: 30,
    currentFloor: 1,
    enemies: {},
    players: {},
    iconPath: path.join(__dirname, 'assets', 'player_icon.png'),
    enemyIconPath: path.join(__dirname, 'assets', 'enemy_icon.png'),
    exitIconPath: path.join(__dirname, 'assets', 'exit_icon.png'),
    floorIconPath: path.join(__dirname, 'assets', 'floor_tile.png')
};

function saveState() {
    const dataToSave = {
        layout: state.layout,
        playerX: state.playerX,
        playerY: state.playerY,
        messageId: state.messageId,
        hudMessageId: state.hudMessageId,
        channelId: state.channelId,
        currentFloor: state.currentFloor,
        enemies: state.enemies,
        players: state.players,
        explored: state.explored
    };
    fs.writeFileSync(STATE_FILE, JSON.stringify(dataToSave, null, 2));
}

function loadState() {
    if (fs.existsSync(STATE_FILE)) {
        try {
            const rawData = fs.readFileSync(STATE_FILE);
            const parsedData = JSON.parse(rawData);
            
            state.layout = parsedData.layout || state.layout;
            state.playerX = parsedData.playerX || state.playerX;
            state.playerY = parsedData.playerY || state.playerY;
            state.messageId = parsedData.messageId || state.messageId;
            state.hudMessageId = parsedData.hudMessageId || state.hudMessageId;
            state.channelId = parsedData.channelId || state.channelId;
            state.currentFloor = parsedData.currentFloor || 1;
            state.enemies = parsedData.enemies || {};
            state.players = parsedData.players || {};
            state.explored = parsedData.explored || undefined;
            state.isMoving = false;
        } catch (error) {
            console.error(error);
        }
    }
}

loadState();

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function generateMap() {
    state.enemies = {};
    let map = Array(state.MAP_HEIGHT).fill().map(() => Array(state.MAP_WIDTH).fill(1));
    const rooms = [];
    const numRooms = 7;
    const minSize = 3;
    const maxSize = 6;

    for (let i = 0; i < numRooms; i++) {
        let w = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        let h = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        let x = Math.floor(Math.random() * (state.MAP_WIDTH - w - 2)) + 1;
        let y = Math.floor(Math.random() * (state.MAP_HEIGHT - h - 2)) + 1;

        for (let ry = y; ry < y + h; ry++) {
            for (let rx = x; rx < x + w; rx++) {
                map[ry][rx] = 0;
            }
        }

        let cx = Math.floor(x + w / 2);
        let cy = Math.floor(y + h / 2);

        if (rooms.length > 0) {
            let prev = rooms[rooms.length - 1];
            let pcx = prev.x;
            let pcy = prev.y;

            if (Math.random() < 0.5) {
                for (let px = Math.min(pcx, cx); px <= Math.max(pcx, cx); px++) map[pcy][px] = 0;
                for (let py = Math.min(pcy, cy); py <= Math.max(pcy, cy); py++) map[py][cx] = 0;
            } else {
                for (let py = Math.min(pcy, cy); py <= Math.max(pcy, cy); py++) map[py][pcx] = 0;
                for (let px = Math.min(pcx, cx); px <= Math.max(pcx, cx); px++) map[cy][px] = 0;
            }
        }
        rooms.push({ x: cx, y: cy });
    }

    let centerX = Math.floor(state.MAP_WIDTH / 2);
    let centerY = Math.floor(state.MAP_HEIGHT / 2);
    let startRoom = rooms[0];
    
    for (let px = Math.min(centerX, startRoom.x); px <= Math.max(centerX, startRoom.x); px++) map[centerY][px] = 0;
    for (let py = Math.min(centerY, startRoom.y); py <= Math.max(centerY, startRoom.y); py++) map[py][startRoom.x] = 0;

    let lastRoom = rooms[rooms.length - 1];
    if (state.currentFloor < 10) {
        map[lastRoom.y][lastRoom.x] = 3; // L'escalier n'apparaît qu'avant le niveau 10
    }

    const mobKeys = Object.keys(bestiaire);

    let mobKeysValides = mobKeys.filter(key => {
        const range = bestiaire[key].etages || [1, 999]; 
        return state.currentFloor >= range[0] && state.currentFloor <= range[1];
    });

    if (mobKeysValides.length === 0) mobKeysValides = mobKeys;

    for (let y = 1; y < state.MAP_HEIGHT - 1; y++) {
        for (let x = 1; x < state.MAP_WIDTH - 1; x++) {
            if (map[y][x] === 0) {
                let isHoriz = map[y-1][x] === 1 && map[y+1][x] === 1 && map[y][x-1] === 0 && map[y][x+1] === 0;
                let isVert = map[y][x-1] === 1 && map[y][x+1] === 1 && map[y-1][x] === 0 && map[y+1][x] === 0;
                
                if ((isHoriz || isVert) && Math.random() < 0.25) {
                    map[y][x] = 2;
                    const randomMobId = mobKeysValides[Math.floor(Math.random() * mobKeysValides.length)];
                    state.enemies[`${y},${x}`] = {
                        baseId: randomMobId,
                        hpActuel: bestiaire[randomMobId].hpMax,
                        statuts: []
                    };
                }
            }
        }
    }
    state.explored = Array(state.MAP_HEIGHT).fill(0).map(() => Array(state.MAP_WIDTH).fill(false));
    majBrouillard(centerX, centerY);
    return map;
}
function majBrouillard(px, py) {
    if (!state.explored || !Array.isArray(state.explored) || state.explored.length !== state.MAP_HEIGHT) {
        state.explored = Array(state.MAP_HEIGHT).fill(0).map(() => Array(state.MAP_WIDTH).fill(false));
    }

    for (let y = 0; y < state.MAP_HEIGHT; y++) {
        if (!state.explored[y]) {
            state.explored[y] = Array(state.MAP_WIDTH).fill(false);
        }
        
        for (let x = 0; x < state.MAP_WIDTH; x++) {
            const dist = Math.sqrt(Math.pow(px - x, 2) + Math.pow(py - y, 2));
            if (dist <= VISION_RADIUS) {
                state.explored[y][x] = true;
            }
        }
    }
}

async function renderMapImage(map, playerX, playerY) {
    let minX = state.MAP_WIDTH;
    let maxX = 0;
    let minY = state.MAP_HEIGHT;
    let maxY = 0;

    for (let y = 0; y < state.MAP_HEIGHT; y++) {
        for (let x = 0; x < state.MAP_WIDTH; x++) {
            if (map[y][x] !== 1) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    minX = Math.max(0, minX - 1);
    maxX = Math.min(state.MAP_WIDTH - 1, maxX + 1);
    minY = Math.max(0, minY - 1);
    maxY = Math.min(state.MAP_HEIGHT - 1, maxY + 1);

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;

    const canvas = createCanvas(cropW * state.TILE_SIZE, cropH * state.TILE_SIZE);
    const ctx = canvas.getContext('2d');

    let playerIcon, exitIcon;
    try { playerIcon = await loadImage(state.iconPath); } catch (e) {}
    try { exitIcon = await loadImage(state.exitIconPath); } catch (e) {}
    try { floorIcon = await loadImage(state.floorIconPath); } catch (e) {}
    let loadedEnemyIcons = {};
    if (state.enemies) {
        const uniqueEnemyIds = [...new Set(Object.values(state.enemies).map(e => e.baseId))];
        
        for (const id of uniqueEnemyIds) {
            const nomIcone = bestiaire[id].icone;
            if (nomIcone) {
                try {
                    loadedEnemyIcons[id] = await loadImage(path.join(__dirname, 'assets', nomIcone));
                } catch (e) {
                    console.error(`Erreur chargement icone pour ${id}`);
                }
            }
        }
    }

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const drawX = x - minX;
            const drawY = y - minY;

            // --- GESTION DE L'EXPLORATION ---
            const isExplored = state.currentFloor >= MAX_FLOOR ? true : (state.explored ? state.explored[y][x] : true);

            if (!isExplored) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
                continue; // On passe à la case suivante, on ne dessine ni mur ni monstre
            }
            // --------------------------------

            if (map[y][x] === 1) {
                // Les "murs" deviennent le ciel bleu au sommet
                ctx.fillStyle = state.currentFloor >= MAX_FLOOR ? '#87CEEB' : '#2C2F33';
            } else {
                if (floorIcon) {
                    // Sol texturé
                    ctx.drawImage(floorIcon, drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
                } else {
                    // Sol couleur de secours
                    ctx.fillStyle = '#99AAB5';
                    ctx.fillRect(drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
                }
            }
            
            ctx.fillRect(drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
            ctx.strokeStyle = '#23272A';
            ctx.strokeRect(drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);

            if (map[y][x] === 2) {
                const enemyInstance = state.enemies[`${y},${x}`];
                let isDrawn = false;
                
                if (enemyInstance && loadedEnemyIcons[enemyInstance.baseId]) {
                    ctx.drawImage(loadedEnemyIcons[enemyInstance.baseId], drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
                    isDrawn = true;
                }
                
                // Si pas d'image trouvée, on garde le carré rouge par défaut
                if (!isDrawn) {
                    ctx.fillStyle = '#8B0000';
                    ctx.fillRect(drawX * state.TILE_SIZE + 5, drawY * state.TILE_SIZE + 5, state.TILE_SIZE - 10, state.TILE_SIZE - 10);
                }
            } else if (map[y][x] === 3) {
                if (exitIcon) {
                    ctx.drawImage(exitIcon, drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
                } else {
                    ctx.fillStyle = '#FFD700';
                    ctx.fillRect(drawX * state.TILE_SIZE + 5, drawY * state.TILE_SIZE + 5, state.TILE_SIZE - 10, state.TILE_SIZE - 10);
                }
            }

            const dist = Math.sqrt(Math.pow(playerX - x, 2) + Math.pow(playerY - y, 2));
            if (dist > VISION_RADIUS) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'; // Voile assombrissant
                ctx.fillRect(drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
            }
            // --------------------------------------------
        }
    }

    const pDrawX = playerX - minX;
    const pDrawY = playerY - minY;

    if (playerIcon) {
        ctx.drawImage(playerIcon, pDrawX * state.TILE_SIZE, pDrawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
    } else {
        ctx.fillStyle = '#ED4245';
        ctx.beginPath();
        ctx.arc(pDrawX * state.TILE_SIZE + state.TILE_SIZE / 2, pDrawY * state.TILE_SIZE + state.TILE_SIZE / 2, state.TILE_SIZE / 3, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = 'rgba(44, 47, 51, 0.85)';
    ctx.fillRect(5, 5, 100, 30);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Arial';
    const libelleEtage = state.currentFloor >= MAX_FLOOR ? "Sommet" : `Étage ${state.currentFloor}`;
    ctx.fillText(libelleEtage, 15, 27);

    ctx.fillText(`Étage ${state.currentFloor}`, 15, 27);

    return canvas.toBuffer('image/png');
}


async function jouerTourEnnemis(genAI) { // <-- On garde juste genAI
    let rapportTour = "";
    let alertesAttaques = [];
    
    const ennemisCoordonnees = Object.keys(state.enemies);

    for (const coord of ennemisCoordonnees) {
        let [y, x] = coord.split(',').map(Number);
        const enemyInstance = state.enemies[coord];
        if (!enemyInstance) continue; 
        
        const baseEnemy = bestiaire[enemyInstance.baseId];


        // --- GESTION DE LA PARALYSIE ENNEMIE ---
        if (enemyInstance.statuts && enemyInstance.statuts.some(s => s.nom === "paralysie")) {
            rapportTour += `\n⚡ **${baseEnemy.nom}** est paralysé et ne peut pas agir !`;
            rapportTour += gererTicksStatuts(enemyInstance, baseEnemy.nom); // Il prend quand même ses ticks s'il saigne !
            continue; // On coupe court : il ne bouge pas et n'attaque pas
        }

        // --- PHASE 1 : DÉPLACEMENT ---
        if (baseEnemy.mobile) {
            let aBouge = false;
            const distAuJoueur = Math.abs(state.playerX - x) + Math.abs(state.playerY - y);

            if (baseEnemy.agressif && distAuJoueur <= 6 && distAuJoueur > 1) {
                let movesOptimaux = [];
                if (state.playerX < x) movesOptimaux.push({ dy: 0, dx: -1 });
                else if (state.playerX > x) movesOptimaux.push({ dy: 0, dx: 1 });
                if (state.playerY < y) movesOptimaux.push({ dy: -1, dx: 0 });
                else if (state.playerY > y) movesOptimaux.push({ dy: 1, dx: 0 });

                movesOptimaux.sort(() => Math.random() - 0.5);

                for (const move of movesOptimaux) {
                    const ny = y + move.dy;
                    const nx = x + move.dx;

                    if (ny >= 0 && ny < state.MAP_HEIGHT && nx >= 0 && nx < state.MAP_WIDTH &&
                        state.layout[ny][nx] === 0 && !(nx === state.playerX && ny === state.playerY)) {
                        
                        state.layout[y][x] = 0;
                        state.layout[ny][nx] = 2;
                        state.enemies[`${ny},${nx}`] = state.enemies[coord];
                        delete state.enemies[coord];
                        
                        y = ny; 
                        x = nx;
                        aBouge = true;
                        break;
                    }
                }
            }

            if (!aBouge) {
                const directionsPossibles = [
                    { dy: -1, dx: 0 }, { dy: 1, dx: 0 },
                    { dy: 0, dx: -1 }, { dy: 0, dx: 1 }
                ];

                const casesValides = directionsPossibles.filter(dir => {
                    const ny = y + dir.dy;
                    const nx = x + dir.dx;
                    return ny >= 0 && ny < state.MAP_HEIGHT &&
                           nx >= 0 && nx < state.MAP_WIDTH &&
                           state.layout[ny][nx] === 0 &&
                           !(nx === state.playerX && ny === state.playerY);
                });

                if (casesValides.length > 0) {
                    const move = casesValides[Math.floor(Math.random() * casesValides.length)];
                    const ny = y + move.dy;
                    const nx = x + move.dx;

                    state.layout[y][x] = 0;
                    state.layout[ny][nx] = 2;
                    state.enemies[`${ny},${nx}`] = state.enemies[coord];
                    delete state.enemies[coord];
                    
                    y = ny;
                    x = nx;
                }
            }
        }

        // --- PHASE 2 : DÉTECTION D'ATTAQUE ---
        const isAdjacent = (Math.abs(state.playerX - x) + Math.abs(state.playerY - y)) === 1;
        
        // On vérifie s'il reste au moins UNE personne en vie dans le groupe
        const groupeVivant = Object.values(state.players).some(p => p.hpActuel > 0);

        if (isAdjacent && baseEnemy.agressif && groupeVivant) {
            alertesAttaques.push({ enemyInstance, baseEnemy });
        }
    }

    // --- PHASE 3 : RÉSOLUTION DES ATTAQUES ---
    for (const attaquant of alertesAttaques) {
        const { enemyInstance, baseEnemy } = attaquant;
        
        // --- TIRAGE AU SORT DE LA CIBLE ---
        const pseudosVivants = Object.keys(state.players).filter(p => state.players[p].hpActuel > 0);
        if (pseudosVivants.length === 0) {
            rapportTour += `\n💀 **Le groupe a été entièrement décimé !**`;
            break;
        }
        
        const ciblePseudo = pseudosVivants[Math.floor(Math.random() * pseudosVivants.length)];

        const gardien = pseudosVivants.find(p => 
            state.players[p].statuts && state.players[p].statuts.some(s => s.nom === "garde" && s.protege === ciblePseudo)
        );

        if (gardien && gardien !== ciblePseudo) {
            rapportTour += `\n🛡️ **${gardien}** s'interpose héroïquement pour protéger ${ciblePseudo} !`;
            ciblePseudo = gardien; 
        }

        const cibleInstance = state.players[ciblePseudo];
        const cibleStats = databasePersos[ciblePseudo] || databasePersos["default"];

        let infoAttaque = "Attaque de base (Puissance: 15, Coef: 1.0)."; 
        let nomAttaque = "une attaque";
        let statutAAppliquer = null; // Prépare la variable pour l'altération
        
        if (baseEnemy.attaques && baseEnemy.attaques.length > 0) {
            const attaqueAleatoire = baseEnemy.attaques[Math.floor(Math.random() * baseEnemy.attaques.length)];
            const coefficients = [0.5, 1.0, 1.5, 2.0];
            const coefAleatoire = coefficients[Math.floor(Math.random() * coefficients.length)];
            
            nomAttaque = `*${attaqueAleatoire.nom}*`;
            infoAttaque = `Nom: "${attaqueAleatoire.nom}" (${attaqueAleatoire.description}). Puissance de base: ${attaqueAleatoire.puissance_base}. Intensité générée: ${coefAleatoire}.`;
            if (attaqueAleatoire.effet && Math.random() < attaqueAleatoire.effet.chance) {
                statutAAppliquer = attaqueAleatoire.effet;
            }
        }

        rapportTour += `\n\n⚠️ **${baseEnemy.nom} bondit sur ${ciblePseudo} et utilise ${nomAttaque} !**`;
        
        const prompt = `
Tu es le moteur mathématique d'un RPG. L'ennemi attaque un joueur spécifique du groupe !
Attaquant (Ennemi): ${baseEnemy.nom} (${baseEnemy.description}). Force: ${baseEnemy.attaquePhysique}, Magie: ${baseEnemy.attaqueMagique}.
Cible (Joueur): ${ciblePseudo} (${cibleStats.description}). PV: ${cibleInstance.hpActuel}/${cibleStats.hpMax}. Résistance Phys: ${cibleStats.resistancePhysique || 30}, Résistance Mag: ${cibleStats.resistanceMagique || 30}, Esquive: 10.
Action de l'ennemi : ${infoAttaque}

Calcule les dégâts infligés au joueur selon la formule stricte : (Puissance de base * Intensité générée) + Force/Magie de l'ennemi - Résistance du Joueur. (Minimum 1 dégât).
Fais une narration TRÈS COURTE (< 200 caractères) de l'attaque sans inclure de chiffres.

Réponds UNIQUEMENT avec ce JSON strict :
{
    "esquive_joueur": boolean,
    "degats_infliges": number,
    "narration": "Texte court"
}`;

        try {
            const model = genAI.getGenerativeModel({ model: "models/gemma-3-27b-it" });
            const result = await model.generateContent(prompt);
            const outcome = JSON.parse(result.response.text().replace(/```json/g, '').replace(/```/g, '').trim());

            rapportTour += `\n*${outcome.narration}*`;

            if (!outcome.esquive_joueur) {
                cibleInstance.hpActuel -= outcome.degats_infliges;
                rapportTour += `\n💥 ${ciblePseudo} subit **${outcome.degats_infliges}** dégâts (PV restants: ${cibleInstance.hpActuel}/${cibleStats.hpMax}).`;

               
                if (statutAAppliquer && cibleInstance.hpActuel > 0) {
                    cibleInstance.statuts.push({
                        nom: statutAAppliquer.nom,
                        duree: statutAAppliquer.duree,
                        degats: statutAAppliquer.degats
                    });
                    rapportTour += `\n⚠️ ${ciblePseudo} souffre de **${statutAAppliquer.nom}** !`;
                }
                

                if (cibleInstance.hpActuel <= 0) {
                    rapportTour += `\n💀 **${ciblePseudo} s'effondre, vaincu !**`;
                }
            } else {
                rapportTour += `\n💨 ${ciblePseudo} esquive l'attaque in extremis !`;
            }
        } catch (e) {
            console.error("Erreur d'attaque auto", e);
        }
    }

    return rapportTour;
}

function gererTicksStatuts(instance, nomInstance) {
    let log = "";
    if (!instance.statuts || instance.statuts.length === 0) return log;

    // On boucle à l'envers pour pouvoir utiliser splice() sans casser l'index
    for (let i = instance.statuts.length - 1; i >= 0; i--) {
        let statut = instance.statuts[i];
        
        // Effet actif du saignement
        if (statut.nom === "saignement") {
            const degats = statut.degats || 5; // 5 par défaut si non précisé
            instance.hpActuel -= degats;
            log += `\n🩸 **${nomInstance}** perd ${degats} PV à cause du saignement.`;
        }

        // Réduction de la durée
        statut.duree--;
        if (statut.duree <= 0) {
            log += `\n✨ L'effet **${statut.nom}** de ${nomInstance} s'est dissipé.`;
            instance.statuts.splice(i, 1);
        }
    }
    return log;
}

async function renderHUDImage() {
    const players = Object.keys(state.players);
    
    // S'il n'y a pas encore de joueurs, on fait une petite image vide
    if (players.length === 0) {
        const canvas = createCanvas(450, 50);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#2C2F33';
        ctx.fillRect(0, 0, 450, 50);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px Arial';
        ctx.fillText("Aucun joueur n'a rejoint le groupe.", 20, 30);
        return canvas.toBuffer('image/png');
    }

    const width = 450;
    const rowHeight = 60; // Hauteur allouée à chaque joueur
    const height = players.length * rowHeight + 20;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Fond global de l'interface (couleur sombre Discord)
    ctx.fillStyle = '#2C2F33';
    ctx.fillRect(0, 0, width, height);

    players.forEach((pseudo, index) => {
        const y = 10 + index * rowHeight;
        const instance = state.players[pseudo];
        const stats = databasePersos[pseudo] || databasePersos["default"];
        
        const hpMax = stats.hpMax || 100;
        // J'utilise pcActuel/pcMax comme tu l'as renommé, avec un fallback au cas où
        const pcMax = stats.pcMax || stats.fatigueMax || 100; 
        const hp = Math.max(0, instance.hpActuel);
        const pc = Math.max(0, instance.PCActuel || 0);

        // 1. DESSINER LE PSEUDO
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(pseudo, 15, y + 20);

        // 2. DESSINER LES STATUTS (À côté du pseudo)
        if (instance.statuts && instance.statuts.length > 0) {
            const iconesStatuts = { 
                'saignement': '🩸', 
                'paralysie': '⚡', 
                'garde': '🛡️' 
            };
            const statutsTexte = instance.statuts.map(s => iconesStatuts[s.nom] || s.nom).join(' ');
            ctx.font = '14px Arial';
            ctx.fillText(statutsTexte, 180, y + 20);
        }

        // 3. JAUGE DE PV (Rouge / Verte)
        const hpRatio = hp / hpMax;
        ctx.fillStyle = '#440000'; // Fond de jauge rouge sombre
        ctx.fillRect(15, y + 30, 200, 16);
        ctx.fillStyle = hpRatio > 0.3 ? '#43B581' : '#ED4245'; // Vert, ou Rouge si bas PV
        ctx.fillRect(15, y + 30, Math.floor(200 * hpRatio), 16);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Arial';
        ctx.fillText(`PV: ${hp}/${hpMax}`, 20, y + 43);

        // 4. JAUGE DE PC (Bleue)
        const pcRatio = pc / pcMax;
        ctx.fillStyle = '#001a33'; // Fond de jauge bleu sombre
        ctx.fillRect(230, y + 30, 200, 16);
        ctx.fillStyle = '#5865F2'; // Bleu vif Discord
        ctx.fillRect(230, y + 30, Math.floor(200 * pcRatio), 16);

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`PC: ${pc}/${pcMax}`, 235, y + 43);
    });

    return canvas.toBuffer('image/png');
}

module.exports = { state, wait, generateMap, renderMapImage, saveState, jouerTourEnnemis, majBrouillard,gererTicksStatuts, renderHUDImage};