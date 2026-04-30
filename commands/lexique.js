const { EmbedBuilder } = require('discord.js');
const stringSimilarity = require('string-similarity');

module.exports = {
    async execute(interaction, sheets) {
        const termeRecherche = interaction.options.getString('terme');
        await interaction.deferReply({ ephemeral: true });

        const spreadsheetId = '1fDydK9_A185s2bz9EnLEeuLosDKS7hre5NK8Zd_a-jM';
        
        const configFeuilles = [
            { nom: 'Général', range: 'Général!B3:D', mapping: { eng: 0, fr: 1, jap: 2 } },
            { nom: 'Items',   range: 'Items!C2:E',   mapping: { jap: 0, eng: 1, fr: 2 } },
            { nom: 'Lieux',   range: 'Lieux!B2:D',   mapping: { jap: 0, eng: 1, fr: 2 } },
            { nom: 'Noms',    range: 'Noms!B2:D',    mapping: { jap: 0, eng: 1, fr: 2 } },
            { nom: 'Ennemis', range: 'Ennemis!B2:D', mapping: { jap: 0, eng: 1, fr: 2 } }
        ];

        try {
            const response = await sheets.spreadsheets.values.batchGet({
                spreadsheetId,
                ranges: configFeuilles.map(f => f.range),
            });

            const valueRanges = response.data.valueRanges;
            let tousLesMotsDeRecherche = [];
            let dictionnaireReference = [];

            valueRanges.forEach((vr, index) => {
                const rows = vr.values;
                const config = configFeuilles[index];
                if (!rows) return;

                rows.forEach(row => {
                    const eng = row[config.mapping.eng] ? row[config.mapping.eng].trim() : "";
                    const fr  = row[config.mapping.fr]  ? row[config.mapping.fr].trim()  : "";
                    const jap = row[config.mapping.jap] ? row[config.mapping.jap].trim() : "";
                    if (!eng && !fr && !jap) return;

                    const entree = { eng, fr, jap, source: config.nom };
                    
                    if (eng) { tousLesMotsDeRecherche.push(eng.toLowerCase()); dictionnaireReference.push(entree); }
                    if (fr)  { tousLesMotsDeRecherche.push(fr.toLowerCase());  dictionnaireReference.push(entree); }
                    if (jap) { tousLesMotsDeRecherche.push(jap.toLowerCase()); dictionnaireReference.push(entree); }
                });
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
            console.error("Erreur multifeuilles lexique :", error);
            await interaction.editReply("❌ Erreur lors de la lecture des multiples feuilles du lexique.");
        }
    }
};
