const { trouverFeuilleCible } = require('../utils/sheetManager.js');

module.exports = {
    async execute(interaction, sheets, tableId) {
        await interaction.deferReply({ ephemeral: false });

        try {
            const cible = await trouverFeuilleCible(sheets, tableId);

            if (!cible) {
                return interaction.editReply("❌ Aucune feuille trouvée avec le statut 'Non commencée' ou 'Traduction en cours'.");
            }

            const message = [
                `🎯 **Cible verrouillée pour la traduction !**`,
                `**Fichier :** ${cible.nom}`,
                `**Statut actuel :** ${cible.statut}`,
                `**Lien :** [Ouvrir la Sheet](${cible.lien})`
            ].join('\n');

            await interaction.editReply(message);

        } catch (err) {
            await interaction.editReply("❌ Erreur Test 1 : " + err.message);
        }
    }
};
