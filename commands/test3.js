// commands/test3.js
const { cloreLeVoteActuel } = require('../utils/missionLogic.js');

const ROLES_AUTORISES = [
    "1020694737725956106"
];

module.exports = {
    async execute(interaction, client) {
        const membreRoles = interaction.member.roles.cache;
        const estAutorise = ROLES_AUTORISES.some(roleId => membreRoles.has(roleId));
        if (!estAutorise) { return interaction.reply({ content: "🛑 Tu n'as pas le rôle requis.", ephemeral: true }); }

        await interaction.deferReply({ ephemeral: true });

        try {
            await cloreLeVoteActuel(client);
            await interaction.deleteReply();

        } catch (err) {
            console.error(err);
            await interaction.editReply("❌ Erreur lors de la clôture : " + err.message);
        }
    }
};
