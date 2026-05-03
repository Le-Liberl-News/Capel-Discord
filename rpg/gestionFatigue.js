function actualiserRegenPassive(playerInstance, statsJoueur) {
    const now = Date.now();
    const PCMax = statsJoueur.PCMax || 100;

    // Initialisation si le joueur est nouveau
    if (playerInstance.PCActuel === undefined) {
        playerInstance.PCActuel = PCMax;
        playerInstance.lastActionTime = now;
        return;
    }

    if (playerInstance.lastActionTime) {
        const minutesElapsed = (now - playerInstance.lastActionTime) / 60000;
        
        const regenAmount = Math.floor(minutesElapsed * 2); 
        
        if (regenAmount > 0) {
            playerInstance.PCActuel = Math.min(PCMax, playerInstance.PCActuel + regenAmount);
            
            
            playerInstance.lastActionTime += (regenAmount / 2) * 60000; 
        }
    } else {
        playerInstance.lastActionTime = now;
    }
}

function tenterRegenDiscussion(playerInstance, statsJoueur, state) {
    const PCMax = statsJoueur.PCMax || 100;
    const PCInitial = playerInstance.PCActuel;
    const RAYON_SECURITE = 3;
    let ennemiProche = false;

    if (PCInitial >= PCMax) {
        return { notify: false };
    }

    for (const coord of Object.keys(state.enemies)) {
        const [ey, ex] = coord.split(',').map(Number);
        const distance = Math.abs(state.playerX - ex) + Math.abs(state.playerY - ey);
        
        if (distance <= RAYON_SECURITE) {
            ennemiProche = true;
            break;
        }
    }

    if (!ennemiProche) {
        const regain = 30; 
        playerInstance.PCActuel = Math.min(PCMax, playerInstance.PCActuel + regain);
        
        if (playerInstance.PCActuel === PCMax) {
            return { 
                notify: true, 
                message: `✨ À force de discuter au calme, tu es totalement reposé ! (max de PCs atteint)` 
            };
        } else {
            
            return { notify: false };
        }
    } else {
        
        return { notify: false }; 
    }
}


function consommerFatigue(playerInstance, statsJoueur, coefficientIntensite = 1.0) {
    const statEndurance = statsJoueur.endurance || 30;
    
    // Formule mathématique (minimum 1 pt)
    let cout = Math.max(1, Math.floor((15 * coefficientIntensite) * (50 / Math.max(1, statEndurance))));
    
    // Vérification de la transaction
    if (playerInstance.PCActuel >= cout) {
        // Les fonds sont suffisants, on applique la déduction
        playerInstance.PCActuel -= cout;
        playerInstance.lastActionTime = Date.now(); 
        
        return { cout: cout, applique: true };
    } else {
        // Fonds insuffisants, on annule l'opération
        return { cout: cout, applique: false };
    }
}

module.exports = { actualiserRegenPassive, tenterRegenDiscussion, consommerFatigue };