const { AttachmentBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { state, renderMapImage, renderHUDImage, saveState } = require('../rpg/gameState.js');
const { determinerCibleFinale } = require('../rpg/targetingEngine.js'); // <-- NOUVEAU
const { consommerFatigue } = require('../rpg/gestionFatigue.js');
const {preparerAction, resoudreAction, construirePromptCombat } = require('../rpg/combatEngine.js');
const bestiaire = require('../rpg/data/bestiaire.json');
const databasePersos = require('../rpg/data/persos.json');

const genAI = new GoogleGenerativeAI(process.env.API_GEMINI);

module.exports = {
    async execute(interaction, cibleInput, attaque) {
        await interaction.deferReply({ flags: ['Ephemeral'] });
        const logChannel = await interaction.client.channels.fetch('1500487420481896539');
        
        // 1. Préparation de l'Acteur
        const prepa = await preparerAction(interaction, state, attaque);
        if (prepa.erreur) return await interaction.editReply({ content: prepa.erreur });

        // 2. Résolution de la Cible
        const ciblage = determinerCibleFinale("attaque", cibleInput, prepa.acteur, state, bestiaire, databasePersos);
        if (ciblage.erreur) return await interaction.editReply({ content: ciblage.erreur });

        // 3. Action dans le vide (Échec critique ivresse)
        if (ciblage.dataCible.type === "vide") {
            const transaction = consommerFatigue(prepa.acteur.instance, prepa.acteur.stats, 1.0);
            if (!transaction.applique) return interaction.editReply({ content: "Action annulée : PT insuffisants." });
            
            const txt = `**${prepa.acteur.pseudo}** tente une action !\n*« ${attaque} »*${ciblage.contexteCiblage.messageAlcool}\n\nL'attaque fend l'air et ne touche absolument rien.`;
            await logChannel.send({ content: txt });
            return await interaction.editReply({ content: "L'action a été transmise." });
        }

        // 4. Constitution du Contexte Global
        const contexteGlobal = {
            description: attaque,
            infoArtLLM: prepa.infoArtLLM,
            estAlcoolise: prepa.estAlcoolise,
            messageAlcool: ciblage.contexteCiblage.messageAlcool,
            isSelf: ciblage.contexteCiblage.isSelf,
            cibleDejaMorte: ciblage.contexteCiblage.cibleDejaMorte
        };

        // 5. Génération du Prompt et Appel LLM
        const promptFinal = construirePromptCombat(prepa.acteur, ciblage.dataCible, contexteGlobal);

        try {
            const model = genAI.getGenerativeModel({ model: "models/gemma-3-27b-it" });
            const result = await model.generateContent(promptFinal);
            const outcome = JSON.parse(result.response.text().replace(/```json/g, '').replace(/```/g, '').trim());

            // Paiement du coût en PT final
            const coef = outcome.coefficient_intensite || 1.0;
            const transaction = consommerFatigue(prepa.acteur.instance, prepa.acteur.stats, coef);
            if (!transaction.applique) return await interaction.editReply({ content: "Action annulée : PT insuffisants." });

            // 6. Résolution Post-Combat
            const resultatCombat = resoudreAction(outcome, prepa.acteur, ciblage.dataCible, contexteGlobal, state, interaction.client);

            // 7. Mises à jour Discord
            const hudBuffer = await renderHUDImage();
            const attachmentHUD = new AttachmentBuilder(hudBuffer, { name: 'hud.png' });

            let mapOptions = {};
            if (resultatCombat.mapAUpdate) {
                const bufferMap = await renderMapImage(state.layout, state.playerX, state.playerY);
                const attachmentMap = new AttachmentBuilder(bufferMap, { name: 'map.png' });
                mapOptions = { files: [attachmentMap] };
                const channelMapObj = await interaction.client.channels.fetch(state.channelId);
                const mapMessage = await channelMapObj.messages.fetch(state.messageId);
                await mapMessage.edit(mapOptions);
            }

            const channelMap = await interaction.client.channels.fetch(state.channelId);
            const hudMessage = await channelMap.messages.fetch(state.hudMessageId).catch(() => null);

            const actionsFutures = [
                logChannel.send({ content: resultatCombat.message }),
                interaction.editReply({ content: "L'action a été transmise au journal de combat." })
            ];
            if (hudMessage) actionsFutures.push(hudMessage.edit({ files: [attachmentHUD] }));

            await Promise.all(actionsFutures);
            saveState();

        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: "Le moteur de jeu a eu un raté, l'action est annulée." });
        }
    }
};