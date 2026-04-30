const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testmodal')
        .setDescription('Affiche un aperçu de la saisie multi-bulles'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal_test_trad')
            .setTitle('Configuration Capel : Saisie Multi-Bulles');
        
        const champBulle1 = new TextInputBuilder()
            .setCustomId('bulle_1')
            .setLabel("Bulle 1 (Celle qui lance le dialogue)")
            .setPlaceholder("Ex: Tiens, qui voilà...")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMinLength(1)
            .setMaxLength(500);

        const champBulle2 = new TextInputBuilder()
            .setCustomId('bulle_2')
            .setLabel("Bulle 2 (La suite du texte)")
            .setPlaceholder("Ex: Je ne t'attendais pas si tôt.")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);

        const champBulle3 = new TextInputBuilder()
            .setCustomId('bulle_3')
            .setLabel("Bulle 3 (La conclusion)")
            .setPlaceholder("Ex: Entre donc, j'ai infusé le thé.")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);

        const firstActionRow = new ActionRowBuilder().addComponents(champBulle1);
        const secondActionRow = new ActionRowBuilder().addComponents(champBulle2);
        const thirdActionRow = new ActionRowBuilder().addComponents(champBulle3);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        await interaction.showModal(modal);
    },
};
