// --- LE REGISTRE UNIQUE DES STATUTS ---
// C'est ici que tu ajoutes un nouveau statut quand tu en inventes un.
const registreStatuts = {
    "saignement": {
        nomAffichage: "Saignement",
        icone: "🩸",
        incapacitant: false, // Ne bloque pas l'action
        // Fonction exécutée à chaque tour/déplacement
        onTick: (cibleInstance, nomCible, degatsParam) => {
            const degats = degatsParam || 5; // 5 par défaut si l'IA n'a rien précisé
            cibleInstance.hpActuel -= degats;
            return `\n🩸 **${nomCible}** perd ${degats} PV à cause du saignement.`;
        }
    },
    "paralysie": {
        nomAffichage: "Paralysie",
        icone: "⚡",
        incapacitant: true, // Vitesse à 0, empêche d'agir
        onTick: () => ""  // Ne fait pas de dégâts réguliers
    },
    "garde": {
        nomAffichage: "Garde",
        icone: "🛡️",
        incapacitant: false,
        onTick: () => ""
    },
    "alcoolise": {
        nomAffichage: "Alcoolisé",
        icone: "🥴",
        incapacitant: false,
        onTick: () => ""
    }
};

// --- FONCTIONS UTILITAIRES ---

// Liste des noms valides pour vérifier rapidement si l'IA invente des trucs
const statutsPossibles = Object.keys(registreStatuts);

// 1. Appliquer un ou plusieurs statuts proprement (Remplace ta fonction dans attaque.js)
function appliquerStatuts(cibleInstance, statutsAjoutes, nomCible) {
    let msg = "";
    if (!statutsAjoutes || statutsAjoutes.length === 0) return msg;

    statutsAjoutes.forEach(nouveauStatut => {
        // L'IA a inventé un statut qui n'est pas dans le registre ? On ignore.
        if (!registreStatuts[nouveauStatut.nom]) return;

        const indexExistant = cibleInstance.statuts.findIndex(s => s.nom === nouveauStatut.nom);
        
        if (indexExistant !== -1) {
            // Le statut existe déjà : on prolonge la durée au lieu de faire un doublon
            cibleInstance.statuts[indexExistant].duree = Math.max(cibleInstance.statuts[indexExistant].duree, nouveauStatut.duree || 2);
            if (nouveauStatut.degats) cibleInstance.statuts[indexExistant].degats = nouveauStatut.degats;
        } else {
            // Nouveau statut
            cibleInstance.statuts.push({
                nom: nouveauStatut.nom,
                duree: nouveauStatut.duree || 2,
                degats: nouveauStatut.degats || 0,
                protege: nouveauStatut.protege || null
            });
            msg += `\n⚠️ **${nomCible}** subit l'effet **${registreStatuts[nouveauStatut.nom].nomAffichage}** !`;
        }
    });
    return msg;
}

// 2. Gérer les "ticks" (la perte de durée et les dégâts, remplace celle de gameState.js)
function declencherTicksStatuts(cibleInstance, nomCible) {
    let log = "";
    if (!cibleInstance.statuts || cibleInstance.statuts.length === 0) return log;

    // Boucle inversée indispensable quand on utilise splice() pour supprimer un élément d'un tableau
    for (let i = cibleInstance.statuts.length - 1; i >= 0; i--) {
        let statutActuel = cibleInstance.statuts[i];
        let dataRegistre = registreStatuts[statutActuel.nom];

        if (!dataRegistre) {
            cibleInstance.statuts.splice(i, 1);
            continue;
        }

        // On déclenche l'effet spécifique du statut défini plus haut
        if (dataRegistre.onTick) {
            log += dataRegistre.onTick(cibleInstance, nomCible, statutActuel.degats);
        }

        statutActuel.duree--;
        if (statutActuel.duree <= 0) {
            log += `\n✨ L'effet **${dataRegistre.nomAffichage}** de ${nomCible} s'est dissipé.`;
            cibleInstance.statuts.splice(i, 1);
        }
    }
    return log;
}

// 3. Renvoyer les icônes pour le rendu visuel (HUD)
function getIconesStatutsHUD(cibleInstance) {
    if (!cibleInstance.statuts || cibleInstance.statuts.length === 0) return "";
    return cibleInstance.statuts
        .map(s => registreStatuts[s.nom] ? registreStatuts[s.nom].icone : "")
        .join(' ');
}

// 4. Savoir si quelqu'un a sa vitesse réduite à zéro
function estIncapacite(cibleInstance) {
    if (!cibleInstance.statuts) return false;
    return cibleInstance.statuts.some(s => registreStatuts[s.nom] && registreStatuts[s.nom].incapacitant);
}

module.exports = {
    statutsPossibles,
    appliquerStatuts,
    declencherTicksStatuts,
    getIconesStatutsHUD,
    estIncapacite
};