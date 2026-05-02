const { AttachmentBuilder } = require('discord.js');
const { state, renderMapImage, wait, saveState, generateMap } = require('../rpg/gameState.js');

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

        await interaction.reply({ content: "Trajectoire reçue, déplacement en cours...", ephemeral: true });

        state.isMoving = true;

        try {
            const channel = await interaction.client.channels.fetch(state.channelId);
            const mapMessage = await channel.messages.fetch(state.messageId);
            let collisionType = null;

            for (const direction of args) {
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

                    state.playerX = newX;
                    state.playerY = newY;

                    if (targetTile === 3) {
                        collisionType = 'exit';
                        break;
                    }
                }

                const buffer = await renderMapImage(state.layout, state.playerX, state.playerY);
                const attachment = new AttachmentBuilder(buffer, { name: 'map.png' });

                await mapMessage.edit({ 
                    content: `Déplacement en cours... Trajectoire restante : ${args.join(' ')}`, 
                    files: [attachment] 
                });
            }

            let finalMessage = "Le groupe a terminé son déplacement.";
            
            if (collisionType === 'exit') {
                state.currentFloor++;
                state.layout = generateMap();
                state.playerX = Math.floor(state.MAP_WIDTH / 2);
                state.playerY = Math.floor(state.MAP_HEIGHT / 2);
                state.layout[state.playerY][state.playerX] = 0;
                finalMessage = `✨ Vous avez pris l'escalier ! Bienvenue à l'étage ${state.currentFloor}.`;
            } else if (collisionType === 'enemy') {
                finalMessage = "🛑 Un ennemi vous bloque la route ! Déplacement interrompu.";
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