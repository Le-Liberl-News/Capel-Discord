const baseArts = require('./data/arts.json'); 

// --- NOUVELLE FONCTION UTILITAIRE ---
// Elle transforme "Éruption" en "Eruption", "Lâ Creston" en "La Creston"
function enleverAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// 1. Détecter si un sort est caché dans le texte du joueur
function detecterArt(description) {
    if (!description) return null;

    // On crée une version sans accents de la phrase tapée par le joueur
    // Ex: "J'utilise Eruption" -> "J'utilise Eruption"
    const descSansAccents = enleverAccents(description);

    for (const [nomArt, statsArt] of Object.entries(baseArts)) {
        
        // On enlève aussi les accents du nom du sort issu du JSON
        // Ex: "Éruption" -> "Eruption"
        const nomArtSansAccents = enleverAccents(nomArt);
        
        // On construit la regex stricte (SANS le 'i') sur la version SANS accents
        const regex = new RegExp(`\\b${nomArtSansAccents}\\b`);
        
        // On teste sur la description du joueur sans accents
        if (regex.test(descSansAccents)) {
            // On renvoie bien le vrai nom avec accents pour que l'affichage soit joli !
            return { nom: nomArt, stats: statsArt };
        }
    }
    return null;
}

// 2. Vérifier et consommer les PE
function consommerPE(playerInstance, coutPE) {
    if ((playerInstance.PEActuel || 0) < coutPE) {
        return false;
    }
    playerInstance.PEActuel -= coutPE;
    return true;
}

// 3. Générer le bloc d'instructions strictes pour l'IA
function genererInstructionsArt(artDetecte) {
    if (!artDetecte) return "";

    const { nom, stats } = artDetecte;

    let directiveSpeciale = "";
    if (stats.type === "soin_ko") {
        directiveSpeciale = "LA CIBLE DOIT ÊTRE RESSUSCITÉE. Ignore la règle de 'Cible Déjà Morte'. Calcule le soin et ramène la cible à la vie.";
    }

    return `
    ATTENTION MAGIE DÉTECTÉE : L'Acteur lance l'Art "${nom}".
    - Type : ${stats.type}
    - Élément : ${stats.element}
    - Puissance de base de l'Art : ${stats.puissance}
    - Description stricte du sort : "${stats.description}"
    ${directiveSpeciale}
    
    Instruction : Remplace ta 'Puissance Brute (PB)' par la Puissance de cet Art. Prends en compte l'élément. Le texte de narration DOIT décrire cet effet magique précis.
    `;
}

module.exports = {
    detecterArt,
    consommerPE,
    genererInstructionsArt
};