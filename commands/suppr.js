const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const db = require('../utils/db.js');

module.exports = {
    async execute(interaction) {
        const [missions] = await db.query('SELECT * FROM mission_actuelle WHERE id = 1');
        const userId = interaction.user.id;

        if (!missions) return interaction.reply({ content: "❌ Aucune mission n'est active pour le moment.", ephemeral: true });
        const mission = missions[0];

        const [mesPropositions] = await db.query(`
            SELECT message_id, texte FROM propositions
            WHERE user_id = ? AND sheet_id = ? AND ligne = ?
        `, [userId, mission.sheet_id, mission.ligne]);

        if (mesPropositions.length === 0) return interaction.reply({ content: "❌ Tu n'as aucune proposition à supprimer pour la mission en cours.", ephemeral: true });

        const options = mesPropositions.map((p, index) => {
            let apercu = p.texte;
            try {
                const obj = JSON.parse(p.texte);
                apercu = Object.values(obj)[0];
            } catch (e) { console.error("Erreur parsage du JSON", e) }

            return new StringSelectMenuOptionBuilder()
                .setLabel(`Proposition ${index + 1}`)
                .setDescription(apercu.substring(0, 50) + "...")
                .setValue(p.message_id);
        });

        const select = new StringSelectMenuBuilder()
            .setCustomId('selectionner_suppr')
            .setPlaceholder('Choisis la proposition à supprimer...')
            .addOptions(options);

        const row = new ActionRowBuilder().addComponents(select);

        await interaction.reply({
            content: "✏️ Quelle proposition souhaites-tu supprimer ?",
            components: [row],
            ephemeral: true
        });
    }
};
