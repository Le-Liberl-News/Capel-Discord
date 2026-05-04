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

        if (mesPropositions.length === 0) return interaction.reply({ content: "❌ Tu n'as aucune proposition à modifier pour la mission en cours.", ephemeral: true });

        if (mesPropositions.length === 1) return ouvrirModaleEdit(interaction, mission, mesPropositions[0]);

        const options = mesPropositions.map((p, index) => {
            let apercu = p.texte;
            try {
                const obj = JSON.parse(p.texte);
                apercu = Object.values(obj)[0];
            } catch (e) {}

            return new StringSelectMenuOptionBuilder()
                .setLabel(`Proposition ${index + 1}`)
                .setDescription(apercu.substring(0, 50) + "...")
                .setValue(p.message_id);
        });

        const select = new StringSelectMenuBuilder()
            .setCustomId('selectionner_prop_edit')
            .setPlaceholder('Choisis la proposition à modifier...')
            .addOptions(options);

        const row = new ActionRowBuilder().addComponents(select);

        await interaction.reply({
            content: "✏️ Quelle proposition souhaites-tu modifier ?",
            components: [row],
            ephemeral: true
        });
    }
};

async function ouvrirModaleEdit(interaction, mission, proposition) {
    const lignes = String(mission.ligne).split(',');
    const textesJap = mission.texte_jap.split(' |BR| ');

    let textesSauvegardes = {};
    try {
        textesSauvegardes = JSON.parse(proposition.texte);
    } catch (e) {
        textesSauvegardes[lignes[0].trim()] = proposition.texte;
    }

    const modal = new ModalBuilder()
        .setCustomId(`modal_edit_groupe:${proposition.message_id}`)
        .setTitle(`Modifier : ${mission.nom_perso || "Perso"}`);

    lignes.forEach((numLigne, index) => {
        const valeurActuelle = textesSauvegardes[numLigne.trim()] || "";

        const input = new TextInputBuilder()
            .setCustomId(`bulle_${index}`)
            .setLabel(`Bulle ${index + 1} (Ligne ${numLigne.trim()})`)
            .setPlaceholder(`JAP: ${textesJap[index] ? textesJap[index].substring(0, 45) : "..."}`)
            .setValue(valeurActuelle) // ← Pré-remplissage avec la trad existante
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(input));
    });

    await interaction.showModal(modal);
}

module.exports.ouvrirModaleEdit = ouvrirModaleEdit;
