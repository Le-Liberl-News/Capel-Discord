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
            return interaction.reply({ content: "Erreur de synchronisation, ennemi introuvable dans l'état.", ephemeral: true });
        }

        const baseEnemy = bestiaire[enemyInstance.baseId];

        await interaction.deferReply();

        const pseudo = getPseudoAnonyme(interaction.user.id);
        const statsJoueur = databasePersos[pseudo] || databasePersos["default"];

        const prompt = `
Tu es le maître du jeu.
Joueur: ${pseudo} (${statsJoueur.description}). Force: ${statsJoueur.force}, Magie: ${statsJoueur.magie}, Agilité: ${statsJoueur.agilite}.
Ennemi: ${baseEnemy.nom} (${baseEnemy.description}). HP: ${enemyInstance.hpActuel}/${baseEnemy.hpMax}, Résistance Physique: ${baseEnemy.resistancePhysique}, Résistance Magique: ${baseEnemy.resistanceMagique}, Esquive: ${baseEnemy.esquive}.
Action du joueur: "${attaque}"

Analyse la faisabilité.
Réponds UNIQUEMENT avec un objet JSON strict :
{
    "succes": boolean,
    "degats": number,
    "narration": "courte description épique"
}`;

        try {
            const model = genAI.getGenerativeModel({ model: "models/gemma-3-27b-it" });
            const result = await model.generateContent(prompt);
            
            const textResult = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            const outcome = JSON.parse(textResult);

            let finalMessage = `**${pseudo}** attaque **${baseEnemy.nom}** !\n*« ${attaque} »*\n\n${outcome.narration}`;

            if (outcome.succes) {
                enemyInstance.hpActuel -= outcome.degats;
                
                if (enemyInstance.hpActuel <= 0) {
                    state.layout[targetY][targetX] = 0;
                    delete state.enemies[`${targetY},${targetX}`];
                    saveState();
                    
                    finalMessage += `\n\n💀 **L'ennemi est terrassé !**`;
                    
                    const buffer = await renderMapImage(state.layout, state.playerX, state.playerY);
                    const attachment = new AttachmentBuilder(buffer, { name: 'map.png' });
                    
                    const channel = await interaction.client.channels.fetch(state.channelId);
                    const mapMessage = await channel.messages.fetch(state.messageId);
                    await mapMessage.edit({ files: [attachment] });
                } else {
                    saveState();
                    finalMessage += `\n\n💥 L'ennemi subit **${outcome.degats}** dégâts (HP restants: ${enemyInstance.hpActuel}/${baseEnemy.hpMax}).`;
                }
            } else {
                finalMessage += `\n\n💨 L'attaque a échoué.`;
            }

            await interaction.editReply({ content: finalMessage });

        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: "Erreur lors de la résolution de l'attaque." });
        }
    }
};