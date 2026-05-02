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
Tu es le maître du jeu d'un jeu de rôle dans l'univers des jeux Trails (Kiseki).
Joueur: ${pseudo} (${statsJoueur.description}). PV: ${playerInstance.hpActuel}/${statsJoueur.hpMax}. Force: ${statsJoueur.force}, Magie: ${statsJoueur.magie}, Vitesse effective: ${effVitesseJoueur}. Statuts: [${playerInstance.statuts.join(', ')}].
Ennemi: ${baseEnemy.nom} (${baseEnemy.description}). PV: ${enemyInstance.hpActuel}/${baseEnemy.hpMax}. Esquive effective: ${effEsquiveEnnemi}, Vitesse effective: ${effVitesseEnnemi}. Statuts: [${enemyInstance.statuts.join(', ')}].
Action du joueur: "${attaque}"

Dans ton résultat, n'utilise pas toutes les informations des descriptions des protagonistes mais seulement celles qui sont pertinentes pour la réponse.

Règles:
0. Faisabilité : l'attaque va t-elle marcher ? Si elle est incohérente avec l'auteur de l'action, la cible, leurs statistiques : la faire échouer.
1. Surprise: L'attaque est-elle furtive/dans le dos en se basant sur le texte et le profil du joueur ? Si oui, l'ennemi ne peut ni attaquer le premier, ni contre-attaquer. 
2. Initiative: Si pas de surprise et vitesse ennemi très supérieure, l'ennemi frappe avant.
3. Esquive: Estimer si l'ennemi esquive l'attaque du joueur en fonction du score d'esquive de la cible et de la vitesse du joueur.
4. Contre-attaque: Si l'ennemi survit, n'est pas surpris, et a une vitesse > 0, il riposte.
5. Statuts: Intègre les statuts existants dans la narration si l'un des deux acteurs en souffre ("poison", "paralysie", "etourdissement"). 

Réponds UNIQUEMENT avec un JSON strict:
{
    "surprise": boolean,
    "initiative": "joueur" | "ennemi",
    "esquive_ennemi": boolean,
    "succes_joueur": boolean,
    "degats_joueur": number,
    "contre_attaque_ennemi": boolean,
    "degats_ennemi": number,
    "mort_ennemi": boolean,
    "statuts_ajoutes_joueur": [],
    "statuts_ajoutes_ennemi": [],
    "narration": "description épique du tour"
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

            if (outcome.degats_ennemi > 0) {
                playerInstance.hpActuel -= outcome.degats_ennemi;
                finalMessage += `\n💔 **${pseudo}** subit **${outcome.degats_ennemi}** dégâts (PV restants: ${playerInstance.hpActuel}/${statsJoueur.hpMax}).`;
                if (playerInstance.hpActuel <= 0) {
                    finalMessage += `\n💀 **${pseudo} s'effondre, vaincu !**`;
                }
            }

            if (outcome.statuts_ajoutes_ennemi && outcome.statuts_ajoutes_ennemi.length > 0) {
                outcome.statuts_ajoutes_ennemi.forEach(s => {
                    if (!enemyInstance.statuts.includes(s)) enemyInstance.statuts.push(s);
                });
            }

            if (outcome.succes_joueur && !outcome.esquive_ennemi) {
                enemyInstance.hpActuel -= outcome.degats_joueur;
                
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
                    finalMessage += `\n\n💥 L'ennemi subit **${outcome.degats_joueur}** dégâts (PV restants: ${enemyInstance.hpActuel}/${baseEnemy.hpMax}).`;
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