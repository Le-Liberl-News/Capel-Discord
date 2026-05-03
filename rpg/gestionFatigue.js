function actualiserRegenPassive(playerInstance, statsJoueur) {
    const now = Date.now();
    const fatigueMax = statsJoueur.fatigueMax || 100;

    // Initialisation si le joueur est nouveau
    if (playerInstance.fatigueActuelle === undefined) {
        playerInstance.fatigueActuelle = fatigueMax;
        playerInstance.lastActionTime = now;
        return;
    }

    if (playerInstance.lastActionTime) {
        const minutesElapsed = (now - playerInstance.lastActionTime) / 60000;
        
        const regenAmount = Math.floor(minutesElapsed * 2); 
        
        if (regenAmount > 0) {
            playerInstance.fatigueActuelle = Math.min(fatigueMax, playerInstance.fatigueActuelle + regenAmount);
            
            
            playerInstance.lastActionTime += (regenAmount / 2) * 60000; 
        }
    } else {
        playerInstance.lastActionTime = now;
    }
}

function tenterRegenDiscussion(playerInstance, statsJoueur, state) {
    const fatigueMax = statsJoueur.fatigueMax || 100;
    const fatigueInitiale = playerInstance.fatigueActuelle;
    const RAYON_SECURITE = 3;
    let ennemiProche = false;

    if (fatigueInitiale >= fatigueMax) {
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
        playerInstance.fatigueActuelle = Math.min(fatigueMax, playerInstance.fatigueActuelle + regain);
        
        if (playerInstance.fatigueActuelle === fatigueMax) {
            return { 
                notify: true, 
                message: `✨ À force de discuter au calme, tu es totalement reposé ! (Fatigue maximale atteinte)` 
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
    
    playerInstance.fatigueActuelle -= cout;
    if (playerInstance.fatigueActuelle < 0) playerInstance.fatigueActuelle = 0;
    
    playerInstance.lastActionTime = Date.now(); 

    return cout; 
}

module.exports = { actualiserRegenPassive, tenterRegenDiscussion, consommerFatigue };