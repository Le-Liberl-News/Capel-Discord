const { AttachmentBuilder } = require('discord.js');
const { state, generateMap, renderMapImage } = require('../rpg/gameState.js'); 

module.exports = {
    async execute(interaction) {
        if (state.isMoving) {
            return interaction.reply({ content: "Impossible de générer une carte pendant un déplacement !", ephemeral: true });
        }

        await interaction.deferReply(); 

        state.layout = generateMap();
        state.playerX = Math.floor(state.MAP_WIDTH / 2);
        state.playerY = Math.floor(state.MAP_HEIGHT / 2);
        state.layout[state.playerY][state.playerX] = 0; 

        const buffer = await renderMapImage(state.layout, state.playerX, state.playerY, state.iconPath);
        const attachment = new AttachmentBuilder(buffer, { name: 'map.png' });

        state.mapMessage = await interaction.editReply({ 
            content: "Nouvelle zone initialisée. Utilisez `/naviguer` pour avancer.", 
            files: [attachment] 
        });
    }
};