const db = require('../utils/db.js');
const ROLES_AUTORISES = ["1306002617725353997", "1020694737725956106"];
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const SALON_VOTE_ID = "1492972991418732685";
const SALON_READONLY_ID = "1493171302624657428";

module.exports = {
    async execute(interaction) {
        const estAutorise = ROLES_AUTORISES.some(id => interaction.member.roles.cache.has(id));
        if (!estAutorise) return interaction.reply({ content: "🛑 Accès refusé.", ephemeral: true });

        const targetChannel = await interaction.client.channels.fetch(SALON_READONLY_ID);
        const mission = db.prepare(`SELECT sheet_id, ligne FROM mission_actuelle WHERE id = 1`).get();
        const propositions = db.prepare(`SELECT message_id FROM propositions WHERE (sheet_id, ligne) = (?, ?)`).all(mission.sheet_id, mission.ligne);
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('upvote').setStyle(ButtonStyle.Success).setLabel('👍')
        );

        for (const proposition of propositions) {
            try {
                const message = await targetChannel.messages.fetch(proposition.message_id);
                await message.edit({ components: [row] });
            } catch (e) { console.error("❌ Erreur à l'ajout des boutons de vote:", e) }
        }

    }
};
