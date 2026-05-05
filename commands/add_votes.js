const db = require('../utils/db.js');
const ROLES_AUTORISES = ["1306002617725353997", "1020694737725956106"];
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const SALON_VOTE_ID = "1492972991418732685";
const SALON_READONLY_ID = "1493171302624657428";

module.exports = {
    async execute(interaction) {
        const estAutorise = ROLES_AUTORISES.some(async id => interaction.member.roles.cache.has(id));
        if (!estAutorise) return interaction.reply({ content: "🛑 Accès refusé.", ephemeral: true });

        await interaction.deferReply({ ephemeral: true });

        try {
            const targetChannel = await interaction.client.channels.fetch(SALON_READONLY_ID);
            const [missions] = await db.query(`SELECT sheet_id, ligne FROM mission_actuelle WHERE id = 1`);
            
            if (!missions) return interaction.editReply({ content: "Aucune mission actuelle trouvée." });
            const mission = missions[0];

            const [propositions] = await db.query(`SELECT message_id FROM propositions WHERE (sheet_id, ligne) = (?, ?)`, [mission.sheet_id, mission.ligne]);
            
            if (propositions.length === 0) return interaction.editReply({ content: "Aucune proposition à mettre à jour." });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('upvote').setStyle(ButtonStyle.Success).setLabel('👍')
            );

            let successCount = 0;
            
            for (const proposition of propositions) {
                try {
                    const message = await targetChannel.messages.fetch(proposition.message_id);
                    await message.edit({ components: [row] });
                    successCount++;

                } catch (e) { console.error(`❌ Erreur sur le message ${proposition.message_id}:`, e.message); }
            }
            await interaction.editReply({ content: `✅ Opération terminée.` });

        } catch (error) {
            console.error("💥 Erreur critique dans add-votes :", error);
            await interaction.editReply({ content: "Une erreur inattendue est survenue." });
        }
    }
};
