const { AttachmentBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { state, renderMapImage, renderHUDImage, wait, saveState, generateMap, jouerTourEnnemis, majBrouillard, gererTicksStatuts, MAX_FLOOR } = require('../rpg/gameState.js');
const { getPseudoAnonyme,getIdFromPseudo } = require('./anonyme.js'); // Ajuste le chemin si nécessaire
const bestiaire = require('../rpg/data/bestiaire.json');
const databasePersos = require('../rpg/data/persos.json');
const { actualiserRegenPassive} = require('../rpg/gestionFatigue.js');

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
        actualiserRegenPassive(playerInstance, statsJoueur);
        

        if (playerInstance.hpActuel <= 0) {
            return interaction.reply({ content: "Tu es inconscient et ne peux pas te déplacer.", ephemeral: true });
        }
        await interaction.deferReply({ ephemeral: true });
        state.isMoving = true;

        try {
            const channel = await interaction.client.channels.fetch(state.channelId);
            const mapMessage = await channel.messages.fetch(state.messageId);
            const hudMessage = await channel.messages.fetch(state.hudMessageId);

            let collisionType = null;
            let rapportGlobal = "";
            majBrouillard(state.playerX, state.playerY);
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
                        continue; 
                    } 
                    
                    if (targetTile === 2) {
                        collisionType = 'enemy';
                        break;
                    }

                    // Le joueur avance
                    state.playerX = newX;
                    state.playerY = newY;
                    majBrouillard(state.playerX, state.playerY);
                    if (targetTile === 3) {
                        collisionType = 'exit'; 
                        break;
                    }

                    if (targetTile === 4) {
                        for (const p of Object.keys(state.players)) {
                            const pInstance = state.players[p];
                            const pStats = databasePersos[p] || databasePersos["default"];
                            
                            pInstance.hpActuel = pStats.hpMax;
                            pInstance.PEActuel = pStats.PEMax || pStats.peMax || 100;
                            pInstance.PCActuel = pStats.pcMax || pStats.PCMax || 100;
                            
                            pInstance.statuts = []; 
                        }
                        
                        rapportGlobal += "\n✨ **Le groupe s'abreuve à la fontaine sacrée ! PV, PE et PT restaurés.**";
                        
                        state.layout[newY][newX] = 0; 
                    }
                }

               
                const rapportEnnemis = await jouerTourEnnemis(genAI);
                
                if (rapportEnnemis !== "") {
                    rapportGlobal += rapportEnnemis;
                    collisionType = 'enemy_attack'; 
                }
                // --- DÉCLENCHEMENT DES TICKS DE STATUTS DES JOUEURS ---
                const pseudosActifs = Object.keys(state.players).filter(p => state.players[p].hpActuel > 0);
                for (const p of pseudosActifs) {
                    const logStatut = gererTicksStatuts(state.players[p], p);
                    if (logStatut !== "") {
                        rapportGlobal += logStatut;
                        
                        // Vérification de décès suite à un saignement mortel
                        if (state.players[p].hpActuel <= 0) {
                            rapportGlobal += `\n💀 **${p} succombe à ses blessures !**`;
                            if (p === pseudo) collisionType = 'mort_saignement'; // Arrête le mouvement si c'est toi qui meurs
                        }
                    }
                }
                // --------------------------------------------------------

                const buffer = await renderMapImage(state.layout, state.playerX, state.playerY);
                const attachmentMap = new AttachmentBuilder(buffer, { name: 'map.png' });
                
                const hudBuffer = await renderHUDImage();
                const attachmentHUD = new AttachmentBuilder(hudBuffer, { name: 'hud.png' });
                
                const remainingPath = args.slice(i + 1).join('');

                // On met à jour les deux messages en parallèle pour ne pas perdre de temps
                await Promise.all([
                    mapMessage.edit({ 
                        content: `Déplacement en cours... Trajectoire restante : ${remainingPath}\n${rapportGlobal}`, 
                        files: [attachmentMap] 
                    }),
                    hudMessage.edit({
                        files: [attachmentHUD]
                    })
                ]);

                
                if (collisionType === 'enemy_attack' || playerInstance.hpActuel <= 0) {
                    break;
                }
            }

            
            let finalMessage = "Le groupe a terminé son déplacement.";
            
            if (collisionType === 'exit') {
                state.currentFloor++;
                state.layout = generateMap();
                state.playerX = Math.floor(state.MAP_WIDTH / 2);
                state.playerY = Math.floor(state.MAP_HEIGHT / 2);
                state.layout[state.playerY][state.playerX] = 0;
                majBrouillard(state.playerX, state.playerY);
                // Vérification si on vient d'arriver au sommet
                if (state.currentFloor === MAX_FLOOR) {
                    finalMessage = `🌤️ **LE SOMMET EST ATTEINT !** La lumière du jour vous éblouit. Vous avez survécu à l'ascension.`;
                    
                    const xpVictoire = 500; // Ajuste le montant comme tu le souhaites
                    const pseudosVivants = Object.keys(state.players).filter(p => state.players[p].hpActuel > 0);
                    
                    for (const p of pseudosVivants) {
                        const userId = getIdFromPseudo(p);
                        if (userId) {
                            ajouterXP(userId, xpVictoire, interaction.client);
                        }
                    }
                    finalMessage += `\n🏅 Chaque survivant reçoit un bonus massif de **${xpVictoire} XP** !`;
                } else {
                    finalMessage = `✨ Vous avez pris l'escalier ! Bienvenue à l'étage ${state.currentFloor}.`;
                }
                rapportGlobal = ""; 
            } else if (collisionType === 'enemy') {
                finalMessage = "🛑 Un ennemi vous bloque la route ! Déplacement interrompu.";
            } else if (collisionType === 'enemy_attack') {
                finalMessage = "🛑 Mouvement interrompu par une embuscade !";
            }

            if (rapportGlobal !== "") {
                finalMessage += `\n${rapportGlobal}`;
            }

            const bufferFinal = await renderMapImage(state.layout, state.playerX, state.playerY);
            const attachmentFinalMap = new AttachmentBuilder(bufferFinal, { name: 'map.png' });
            
            // --- NOUVEAU : On génère le HUD final ---
            const hudBufferFinal = await renderHUDImage();
            const attachmentFinalHUD = new AttachmentBuilder(hudBufferFinal, { name: 'hud.png' });
            // ----------------------------------------
            
            await Promise.all([
                mapMessage.edit({ 
                    content: finalMessage, 
                    files: [attachmentFinalMap] 
                }),
                hudMessage.edit({
                    files: [attachmentFinalHUD]
                })
            ]);

            saveState();

        } catch (error) {
            console.error(error);
        } finally {
            state.isMoving = false;
            try {
                await interaction.deleteReply();
            } catch (e) {
            }
        }
    }
};