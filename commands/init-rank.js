const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('init-rank')
        .setDescription('Commande système : Initialise le panneau de classement des Bracers'),

    async execute(interaction) {
        await interaction.reply({
            content: "```text\nCAPEL SYSTEM Ver.7.0\n\n>> INITIALISATION DU NOYAU D'ARCHIVES...\n>> En attente du calcul de l'expérience orbal.\n```"
        });
    }
};
