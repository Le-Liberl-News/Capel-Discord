const { updateRanking } = require('../utils/rankings.js');

const ROLES_AUTORISES = ["1306002617725353997", "1020694737725956106"];

module.exports = {
    async execute(interaction) {
        const estAutorise = ROLES_AUTORISES.some(id => interaction.member.roles.cache.has(id));
        if (!estAutorise) return interaction.reply({ content: "🛑 Accès refusé.", ephemeral: true });

        await interaction.deferReply({ ephemeral: true });
        try {
            await updateRanking(interaction.client);
            await interaction.editReply("✅ Classement mis à jour !");

        } catch (err) { await interaction.editReply("❌ Erreur : " + err.message); }
    }
};
