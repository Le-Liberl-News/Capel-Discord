const { AttachmentBuilder } = require('discord.js');
const { state, renderMapImage, wait, saveState } = require('../rpg/gameState.js');

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

            for (const direction of args) {
                await wait(500);

                let newX = state.playerX;
                let newY = state.playerY;

                if (direction === 'H') newY--;
                else if (direction === 'B') newY++;
                else if (direction === 'G') newX--;
                else if (direction === 'D') newX++;

                if (newX >= 0 && newX < state.MAP_WIDTH && 
                    newY >= 0 && newY < state.MAP_HEIGHT && 
                    state.layout[newY][newX] === 0) {
                    
                    state.playerX = newX;
                    state.playerY = newY;
                }

                const buffer = await renderMapImage(state.layout, state.playerX, state.playerY, state.iconPath);
                const attachment = new AttachmentBuilder(buffer, { name: 'map.png' });

                await mapMessage.edit({ 
                    content: `Déplacement en cours... Trajectoire restante : ${args.join(' ')}`, 
                    files: [attachment] 
                });
            }
            
            await mapMessage.edit({ content: "Le groupe a terminé son déplacement." });

            saveState();

        } catch (error) {
            console.error("Erreur durant le déplacement :", error);
        } finally {
            state.isMoving = false;
        }
    }
};