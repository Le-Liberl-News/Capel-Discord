const db = require('../utils/db.js');
const ROLES_AUTORISES = ["1306002617725353997", "1020694737725956106"];
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const SALON_VOTE_ID = "1492972991418732685";
const SALON_READONLY_ID = "1493171302624657428";

module.exports = {
    async execute(interaction) {
        const estAutorise = ROLES_AUTORISES.some(async id => interaction.member.roles.cache.has(id));
        if (!estAutorise) return interaction.reply({ content: "🛑 Accès refusé.", ephemeral: true });

        // 1. On met l'interaction en attente immédiatement
        await interaction.deferReply({ ephemeral: true });

        try {
            const targetChannel = await interaction.client.channels.fetch(SALON_READONLY_ID);
            const [mission] = await db.query(`SELECT sheet_id, ligne FROM mission_actuelle WHERE id = 1`).get();
            
            // Sécurité anti-crash si la table est vide
            if (!mission) {
                return interaction.editReply({ content: "Aucune mission actuelle trouvée." });
            }

            const [propositions_rows] = await db.query(`SELECT message_id FROM propositions WHERE (sheet_id, ligne) = (?, ?)`, [mission.sheet_id, mission.ligne]);
            const propositions = propositions_rows[0]; // TODO: Si c'était censé ramener plusieurs lignes, enlève le '_rows[0]'
            
            if (propositions.length === 0) {
                return interaction.editReply({ content: "Aucune proposition à mettre à jour." });
            }

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('upvote').setStyle(ButtonStyle.Success).setLabel('👍')
            );

            let successCount = 0;
            
            for (const proposition of propositions) {
                try {
                    const message = await targetChannel.messages.fetch(proposition.message_id);
                    await message.edit({ components: [row] });
                    successCount++;
                } catch (e) { 
                    console.error(`❌ Erreur sur le message ${proposition.message_id}:`, e.message); 
                }
            }

            // 2. On clôture l'interaction avec le bilan
            await interaction.editReply({ content: `✅ Opération terminée.` });

        } catch (error) {
            console.error("💥 Erreur critique dans add-votes :", error);
            await interaction.editReply({ content: "Une erreur inattendue est survenue." });
        }
    }
};