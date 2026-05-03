const { AttachmentBuilder } = require('discord.js');
const { state, generateMap, renderMapImage, saveState, renderHUDImage } = require('../rpg/gameState.js'); 

const databasePersos = require('../rpg/data/persos.json');

module.exports = {
    async execute(interaction) {
        if (state.isMoving) {
            return interaction.reply({ content: "Impossible de générer une carte pendant un déplacement !", ephemeral: true });
        }

        await interaction.deferReply(); 

        state.currentFloor = 1;
    
        for (const pseudo in state.players) {
            const stats = databasePersos[pseudo] || databasePersos["default"];
            state.players[pseudo].hpActuel = stats.hpMax || 100;
            state.players[pseudo].PCActuel = stats.pcMax || stats.fatigueMax || 100;
            state.players[pseudo].statuts = [];
        }

        state.enemies = {};

        state.layout = generateMap();
        state.playerX = Math.floor(state.MAP_WIDTH / 2);
        state.playerY = Math.floor(state.MAP_HEIGHT / 2);
        state.layout[state.playerY][state.playerX] = 0; 

        const buffer = await renderMapImage(state.layout, state.playerX, state.playerY);
        const attachment = new AttachmentBuilder(buffer, { name: 'map.png' });

        const mapMessage = await interaction.editReply({ 
            content: "Nouvelle zone initialisée. Utilisez `/naviguer` pour avancer.", 
            files: [attachment] 
        });

        const bufferHUD = await renderHUDImage();
        const attachmentHUD = new AttachmentBuilder(bufferHUD, { name: 'hud.png' });
        
        
        const hudMessage = await interaction.followUp({
            content: "État du groupe :",
            files: [attachmentHUD]
        });

        state.messageId = mapMessage.id;
        state.hudMessageId = hudMessage.id; 
        state.channelId = interaction.channelId;
        saveState();
    }
};