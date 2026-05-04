/**
 * Moteur de ciblage : Détermine qui est touché par l'action
 */
function determinerCibleFinale(typeCommande, cibleInput, acteur, state, bestiaire, databasePersos) {
    let cibleFinaleType = null;
    let cibleFinaleObjet = null;
    let nomCibleFinale = null;
    let statsCibleFinale = null;
    let targetX = null;
    let targetY = null;
    let messageAlcool = "";

    const pseudo = acteur.pseudo;
    const estAlcoolise = acteur.instance.statuts.some(s => s.nom === "alcoolise");

    // --- 1. CIBLAGE INITIAL ---
    if (typeCommande === "attaque") {
        targetX = state.playerX;
        targetY = state.playerY;
        const dir = cibleInput.toUpperCase();
        
        if (dir === 'H') targetY--;
        else if (dir === 'B') targetY++;
        else if (dir === 'G') targetX--;
        else if (dir === 'D') targetX++;
        else return { erreur: "Direction invalide (H, B, G, D attendu)." };

        if (targetX < 0 || targetX >= state.MAP_WIDTH || targetY < 0 || targetY >= state.MAP_HEIGHT) {
            return { erreur: "Cible hors limites." };
        }

        // On vérifie s'il y a un monstre sur la case
        if (state.layout[targetY][targetX] === 2) {
            cibleFinaleType = "monstre";
            cibleFinaleObjet = state.enemies[`${targetY},${targetX}`];
            if (!cibleFinaleObjet) return { erreur: "Erreur de synchronisation avec l'ennemi." };
            statsCibleFinale = bestiaire[cibleFinaleObjet.baseId];
            nomCibleFinale = statsCibleFinale.nom;
        }
    } 
    else if (typeCommande === "action") {
        const ciblePseudo = Object.keys(state.players).find(p => p.toLowerCase() === cibleInput.toLowerCase());
        if (!ciblePseudo) return { erreur: "Cible introuvable dans le groupe actuel." };
        
        cibleFinaleType = "joueur";
        nomCibleFinale = ciblePseudo;
        cibleFinaleObjet = state.players[ciblePseudo];
        statsCibleFinale = databasePersos[ciblePseudo] || databasePersos["default"];
    }

    // --- 2. DÉVIATION (ALCOOL) ---
    if (estAlcoolise && Math.random() < 0.5) {
        let ciblesPotentielles = [];

        // On récupère les autres joueurs vivants
        Object.keys(state.players).forEach(p => {
            if (state.players[p].hpActuel > 0 && p !== pseudo) {
                ciblesPotentielles.push({ type: "joueur", nom: p, ref: state.players[p], stats: databasePersos[p] || databasePersos["default"], x: null, y: null });
            }
        });

        // Si c'est une attaque, on ajoute aussi les monstres adjacents
        if (typeCommande === "attaque") {
            const dirs = [{dx:0,dy:-1}, {dx:0,dy:1}, {dx:-1,dy:0}, {dx:1,dy:0}];
            dirs.forEach(d => {
                let nx = state.playerX + d.dx;
                let ny = state.playerY + d.dy;
                if (nx >= 0 && nx < state.MAP_WIDTH && ny >= 0 && ny < state.MAP_HEIGHT && state.layout[ny][nx] === 2) {
                    let enemy = state.enemies[`${ny},${nx}`];
                    if (enemy) {
                        ciblesPotentielles.push({ type: "monstre", nom: bestiaire[enemy.baseId].nom, ref: enemy, stats: bestiaire[enemy.baseId], x: nx, y: ny });
                    }
                }
            });
        }

        // On détermine si le personnage tape quelqu'un ou tape dans le vide
        // On conserve tes probabilités (plus de chance de rater avec une action qu'avec une attaque brouillonne)
        let chanceDeToucher = typeCommande === "attaque" ? 1.0 : 0.7;

        if (ciblesPotentielles.length > 0 && Math.random() < chanceDeToucher) {
            const cibleTiree = ciblesPotentielles[Math.floor(Math.random() * ciblesPotentielles.length)];
            cibleFinaleType = cibleTiree.type;
            cibleFinaleObjet = cibleTiree.ref;
            nomCibleFinale = cibleTiree.nom;
            statsCibleFinale = cibleTiree.stats;
            targetX = cibleTiree.x;
            targetY = cibleTiree.y;
            messageAlcool = `\n🥴 *Dans un accès d'ivresse, ${pseudo} trébuche et se trompe totalement de cible !*`;
        } else {
            cibleFinaleType = "vide";
            messageAlcool = `\n🥴 *Trop ivre, ${pseudo} s'emmêle les pieds et agit dans le vide !*`;
        }
    }

    // --- 3. VALIDATION FINALE ---
    if (!cibleFinaleType && typeCommande === "attaque") {
        return { erreur: "Il n'y a pas d'ennemi dans cette direction." };
    }

    const isSelf = cibleFinaleType === "joueur" && nomCibleFinale === pseudo;
    const cibleDejaMorte = (cibleFinaleType !== "vide" && cibleFinaleObjet && cibleFinaleObjet.hpActuel <= 0);

    // On renvoie un paquet propre prêt à être digéré par le CombatEngine
    return {
        erreur: null,
        dataCible: {
            type: cibleFinaleType,
            nom: nomCibleFinale,
            instance: cibleFinaleObjet,
            stats: statsCibleFinale,
            x: targetX,
            y: targetY
        },
        contexteCiblage: {
            messageAlcool: messageAlcool,
            isSelf: isSelf,
            cibleDejaMorte: cibleDejaMorte
        }
    };
}

module.exports = { determinerCibleFinale };