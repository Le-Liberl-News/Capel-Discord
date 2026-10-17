const { EmbedBuilder } = require('discord.js');
const stringSimilarity = require('string-similarity');
const platformTexts = require('../utils/platformTexts.js');

module.exports = {
    async execute(interaction, sheets) {
        const termeRecherche = interaction.options.getString('terme');
        await interaction.deferReply({ ephemeral: true });

        try {
            // SC's lexicon on the translation platform (Général, Items, Lieux, Noms, Ennemis).
            const entrees = await platformTexts.lexicon();
            let tousLesMotsDeRecherche = [];
            let dictionnaireReference = [];

            entrees.forEach(entree => {
                if (!entree.eng && !entree.fr && !entree.jap) return;
                if (entree.eng) { tousLesMotsDeRecherche.push(entree.eng.toLowerCase()); dictionnaireReference.push(entree); }
                if (entree.fr)  { tousLesMotsDeRecherche.push(entree.fr.toLowerCase());  dictionnaireReference.push(entree); }
                if (entree.jap) { tousLesMotsDeRecherche.push(entree.jap.toLowerCase()); dictionnaireReference.push(entree); }
            });

            if (tousLesMotsDeRecherche.length === 0) return interaction.editReply("❌ Impossible de lire les données du lexique.");

            const match = stringSimilarity.findBestMatch(termeRecherche.toLowerCase(), tousLesMotsDeRecherche);
            const score = match.bestMatch.rating;
            if (score < 0.3) return interaction.editReply(`❌ Aucun terme ressemblant à **${termeRecherche}** n'a été trouvé.`);

            const resultat = dictionnaireReference[match.bestMatchIndex];

            const embed = new EmbedBuilder()
                .setColor('#2E86C1')
                .setTitle(`🔍 Recherche : "${termeRecherche}"`)
                .setDescription(`Correspondance : **${match.bestMatch.target}**\n📂 Catégorie : **${resultat.source}**`)
                .addFields(
                    { name: '🇺🇸 Anglais', value: resultat.eng || "*Non défini*", inline: true },
                    { name: '🇫🇷 Français', value: resultat.fr || "*Non défini*", inline: true }
                );

            if (resultat.jap) embed.addFields({ name: '🇯🇵 Japonais', value: resultat.jap, inline: false });

            embed.setFooter({ text: `Précision : ${Math.round(score * 100)}%` });

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error("Erreur lexique de la plateforme :", error);
            await interaction.editReply(`❌ Lexique de la plateforme indisponible : ${error.message}`);
        }
    }
};
