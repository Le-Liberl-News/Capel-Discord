const { AttachmentBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { state, renderMapImage, saveState } = require('../rpg/gameState.js');
const { getPseudoAnonyme } = require('./anonyme.js'); 
const bestiaire = require('../rpg/data/bestiaire.json');
const databasePersos = require('../rpg/data/persos.json');

const genAI = new GoogleGenerativeAI(process.env.API_GEMINI);

module.exports = {
    async execute(interaction, cible, attaque) {
        if (!state.messageId || !state.channelId) {
            return interaction.reply({ content: "Aucune carte active.", ephemeral: true });
        }

        if (state.isMoving) {
            return interaction.reply({ content: "Un déplacement est en cours.", ephemeral: true });
        }

        let targetX = state.playerX;
        let targetY = state.playerY;

        const dir = cible.toUpperCase();
        if (dir === 'H') targetY--;
        else if (dir === 'B') targetY++;
        else if (dir === 'G') targetX--;
        else if (dir === 'D') targetX++;
        else {
            return interaction.reply({ content: "Direction invalide (H, B, G, D attendu).", ephemeral: true });
        }

        if (targetX < 0 || targetX >= state.MAP_WIDTH || targetY < 0 || targetY >= state.MAP_HEIGHT) {
            return interaction.reply({ content: "Cible hors limites.", ephemeral: true });
        }

        if (state.layout[targetY][targetX] !== 2) {
            return interaction.reply({ content: "Il n'y a pas d'ennemi dans cette direction.", ephemeral: true });
        }

        const enemyInstance = state.enemies[`${targetY},${targetX}`];
        if (!enemyInstance) {
            return interaction.reply({ content: "Erreur de synchronisation.", ephemeral: true });
        }

        const baseEnemy = bestiaire[enemyInstance.baseId];
        const pseudo = getPseudoAnonyme(interaction.user.id);
        const statsJoueur = databasePersos[pseudo] || databasePersos["default"];

        if (!state.players[pseudo]) {
            state.players[pseudo] = { hpActuel: statsJoueur.hpMax, statuts: [] };
        }
        const playerInstance = state.players[pseudo];

        if (playerInstance.hpActuel <= 0) {
            return interaction.reply({ content: "Tu es inconscient et ne peux pas attaquer.", ephemeral: true });
        }

        await interaction.deferReply();

        let effVitesseJoueur = statsJoueur.vitesse;
        let effVitesseEnnemi = baseEnemy.vitesse;
        let effEsquiveEnnemi = baseEnemy.esquive;

        const statutsIncapacitants = ['paralysie', 'etourdissement'];
        
        if (playerInstance.statuts.some(s => statutsIncapacitants.includes(s))) {
            effVitesseJoueur = 0;
        }
        
        if (enemyInstance.statuts.some(s => statutsIncapacitants.includes(s))) {
            effVitesseEnnemi = 0;
            effEsquiveEnnemi = 0;
        }

        const prompt = `
Tu es le moteur de résolution d'un RPG. 
Joueur: ${pseudo} (${statsJoueur.description}). PV: ${playerInstance.hpActuel}/${statsJoueur.hpMax}. Force: ${statsJoueur.force}, Magie: ${statsJoueur.magie}, Vitesse: ${effVitesseJoueur}. Statuts: [${playerInstance.statuts.join(', ')}].
Ennemi: ${baseEnemy.nom} (${baseEnemy.description}). PV: ${enemyInstance.hpActuel}/${baseEnemy.hpMax}. Esquive: ${effEsquiveEnnemi}, Vitesse: ${effVitesseEnnemi}, Résistance Phys: ${baseEnemy.resistancePhysique}, Résistance Mag: ${baseEnemy.resistanceMagique}. Statuts: [${enemyInstance.statuts.join(', ')}].
Action demandée par le joueur: "${attaque}"

Processus de résolution OBLIGATOIRE (les stats font loi) :
1. Faisabilité (Seuil) : Estime le seuil de Force ou de Magie requis pour réaliser l'action décrite. Compare ce seuil à la stat du Joueur. Si la stat est inférieure, l'action échoue.
2. Touche/Esquive : Si l'action est faisable, compare la Vitesse du Joueur à l'Esquive de l'Ennemi. La surprise (déduite de l'action) annule l'Esquive ennemie.
3. Encaissement : Si l'attaque touche, estime d'abord la "puissance de base" de l'action décrite (ex: quasi-nulle pour un simple toucher, élevée pour une frappe armée). Additionne cette puissance à la stat appropriée du Joueur (Force ou Magie) pour obtenir l'impact total. ENFIN, confronte cet impact total à la Résistance (Physique ou Magique) de l'Ennemi. Si la Résistance est supérieure à l'impact, le coup est encaissé/absorbé et les dégâts tombent à 0 (ou 1 point symbolique).

Réponds UNIQUEMENT avec un JSON strict :
{
    "analyse_seuil": {
        "stat_requise": "force" | "magie",
        "valeur_seuil": number,
        "faisable": boolean
    },
    "analyse_combat": {
        "surprise": boolean,
        "esquive_reussie": boolean,
        "degats_infliges": number
    },
    "succes_global": boolean,
    "mort_ennemi": boolean,
    "contre_attaque_ennemi": boolean,
    "degats_contre_attaque": number,
    "statuts_ajoutes_joueur": [],
    "statuts_ajoutes_ennemi": [],
    "narration": "Description dynamique du tour avec des détails issus de la description des différents acteurs, basée rigoureusement sur les analyses ci-dessus. N'INCLUS STRICTEMENT AUCUN CHIFFRE (ni dégâts, ni PV restants) dans ce texte."
}`;
        try {
            const model = genAI.getGenerativeModel({ model: "models/gemma-3-27b-it" });
            const result = await model.generateContent(prompt);
            
            const textResult = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            const outcome = JSON.parse(textResult);

            let finalMessage = `**${pseudo}** engage **${baseEnemy.nom}** !\n*« ${attaque} »*\n\n${outcome.narration}`;

            if (outcome.statuts_ajoutes_joueur && outcome.statuts_ajoutes_joueur.length > 0) {
                outcome.statuts_ajoutes_joueur.forEach(s => {
                    if (!playerInstance.statuts.includes(s)) playerInstance.statuts.push(s);
                });
            }

            if (outcome.degats_contre_attaque > 0) {
                playerInstance.hpActuel -= outcome.degats_contre_attaque;
                finalMessage += `\n💔 **${pseudo}** subit **${outcome.degats_contre_attaque}** dégâts (PV restants: ${playerInstance.hpActuel}/${statsJoueur.hpMax}).`;
                if (playerInstance.hpActuel <= 0) {
                    finalMessage += `\n💀 **${pseudo} s'effondre, vaincu !**`;
                }
            }

            if (outcome.statuts_ajoutes_ennemi && outcome.statuts_ajoutes_ennemi.length > 0) {
                outcome.statuts_ajoutes_ennemi.forEach(s => {
                    if (!enemyInstance.statuts.includes(s)) enemyInstance.statuts.push(s);
                });
            }

            if (outcome.succes_global && !outcome.analyse_combat.esquive_reussie) {
                enemyInstance.hpActuel -= outcome.analyse_combat.degats_infliges;
                
                if (enemyInstance.hpActuel <= 0 || outcome.mort_ennemi) {
                    state.layout[targetY][targetX] = 0;
                    delete state.enemies[`${targetY},${targetX}`];
                    saveState();
                    
                    finalMessage += `\n\n🩸 **${baseEnemy.nom} est terrassé !**`;
                    
                    const buffer = await renderMapImage(state.layout, state.playerX, state.playerY);
                    const attachment = new AttachmentBuilder(buffer, { name: 'map.png' });
                    
                    const channel = await interaction.client.channels.fetch(state.channelId);
                    const mapMessage = await channel.messages.fetch(state.messageId);
                    await mapMessage.edit({ files: [attachment] });
                } else {
                    saveState();
                    finalMessage += `\n\n💥 L'ennemi subit **${outcome.analyse_combat.degats_infliges}** dégâts (PV restants: ${enemyInstance.hpActuel}/${baseEnemy.hpMax}).`;
                }
            } else {
                saveState();
            }

            await interaction.editReply({ content: finalMessage });

        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: "Erreur lors de la résolution de l'attaque." });
        }
    }
};