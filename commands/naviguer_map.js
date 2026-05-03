const { AttachmentBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { state, renderMapImage, wait, saveState, generateMap, jouerTourEnnemis } = require('../rpg/gameState.js');
const { getPseudoAnonyme } = require('./anonyme.js'); // Ajuste le chemin si nécessaire
const bestiaire = require('../rpg/data/bestiaire.json');
const databasePersos = require('../rpg/data/persos.json');

const genAI = new GoogleGenerativeAI(process.env.API_GEMINI);

module.exports = {
    async execute(interaction, traj) {
        if (!state.messageId || !state.channelId) {
            return interaction.reply({ content: "Aucune carte active. Lancez `/generer-map` d'abord.", ephemeral: true });
        }

        if (state.isMoving) {
            return interaction.reply({ content: "Un déplacement est déjà en cours !", ephemeral: true });
        }

        const args = traj.toUpperCase().replace(/[^DHBG]/g, '').split('');

        if (args.length === 0) {
            return interaction.reply({ content: "Trajectoire invalide. Utilisez uniquement D, G, H ou B.", ephemeral: true });
        }

        const pseudo = getPseudoAnonyme(interaction.user.id);
        const statsJoueur = databasePersos[pseudo] || databasePersos["default"];

        if (!state.players[pseudo]) {
            state.players[pseudo] = { hpActuel: statsJoueur.hpMax, statuts: [] };
        }
        const playerInstance = state.players[pseudo];

        if (playerInstance.hpActuel <= 0) {
            return interaction.reply({ content: "Tu es inconscient et ne peux pas te déplacer.", ephemeral: true });
        }

        await interaction.reply({ content: "Trajectoire reçue, déplacement en cours...", ephemeral: true });

        state.isMoving = true;

        try {
            const channel = await interaction.client.channels.fetch(state.channelId);
            const mapMessage = await channel.messages.fetch(state.messageId);
            
            let collisionType = null;
            let rapportGlobal = "";

            for (let i = 0; i < args.length; i++) {
                const direction = args[i];
                await wait(1000);

                let newX = state.playerX;
                let newY = state.playerY;

                if (direction === 'H') newY--;
                else if (direction === 'B') newY++;
                else if (direction === 'G') newX--;
                else if (direction === 'D') newX++;

                if (newX >= 0 && newX < state.MAP_WIDTH && newY >= 0 && newY < state.MAP_HEIGHT) {
                    const targetTile = state.layout[newY][newX];

                    if (targetTile === 1) {
                        continue; // Mur : on ignore et on passe à la prochaine instruction
                    } 
                    
                    if (targetTile === 2) {
                        collisionType = 'enemy'; // On percute un monstre statique
                        break;
                    }

                    // Le joueur avance
                    state.playerX = newX;
                    state.playerY = newY;

                    if (targetTile === 3) {
                        collisionType = 'exit'; // On trouve la sortie
                        break;
                    }
                }

                // --- TOUR DES ENNEMIS (Après le pas du joueur) ---
                const rapportEnnemis = await jouerTourEnnemis(genAI, pseudo, statsJoueur, playerInstance);
                
                if (rapportEnnemis !== "") {
                    rapportGlobal += rapportEnnemis;
                    collisionType = 'enemy_attack'; // L'ennemi nous a attaqué, on stoppe la course !
                }

                const buffer = await renderMapImage(state.layout, state.playerX, state.playerY);
                const attachment = new AttachmentBuilder(buffer, { name: 'map.png' });
                
                const remainingPath = args.slice(i + 1).join('');

                await mapMessage.edit({ 
                    content: `Déplacement en cours... Trajectoire restante : ${remainingPath}\n${rapportGlobal}`, 
                    files: [attachment] 
                });

                // Si on a été attaqué ou tué pendant ce pas, on casse la boucle de déplacement
                if (collisionType === 'enemy_attack' || playerInstance.hpActuel <= 0) {
                    break;
                }
            }

            // --- FIN DU DÉPLACEMENT ---
            let finalMessage = "Le groupe a terminé son déplacement.";
            
            if (collisionType === 'exit') {
                state.currentFloor++;
                state.layout = generateMap();
                state.playerX = Math.floor(state.MAP_WIDTH / 2);
                state.playerY = Math.floor(state.MAP_HEIGHT / 2);
                state.layout[state.playerY][state.playerX] = 0;
                finalMessage = `✨ Vous avez pris l'escalier ! Bienvenue à l'étage ${state.currentFloor}.`;
                rapportGlobal = ""; // On nettoie les anciens rapports pour le nouvel étage
            } else if (collisionType === 'enemy') {
                finalMessage = "🛑 Un ennemi vous bloque la route ! Déplacement interrompu.";
            } else if (collisionType === 'enemy_attack') {
                finalMessage = "🛑 Mouvement interrompu par une embuscade !";
            }

            if (rapportGlobal !== "") {
                finalMessage += `\n${rapportGlobal}`;
            }

            const bufferFinal = await renderMapImage(state.layout, state.playerX, state.playerY);
            const attachmentFinal = new AttachmentBuilder(bufferFinal, { name: 'map.png' });
            
            await mapMessage.edit({ 
                content: finalMessage, 
                files: [attachmentFinal] 
            });

            saveState();

        } catch (error) {
            console.error(error);
        } finally {
            state.isMoving = false;
        }
    }
};