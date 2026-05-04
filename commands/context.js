const { EmbedBuilder } = require('discord.js');
const db = require('../utils/db.js');

module.exports = {
    async execute(interaction, sheets) {
        await interaction.deferReply({ ephemeral: true });

        try {
            const [mission_rows] = await db.query('SELECT * FROM mission_actuelle WHERE id = 1');
            const mission = mission_rows[0];
            if (!mission) {
                return interaction.editReply("❌ Aucune réplique du jour n'est actuellement définie.");
            }

            const lignesCibles = String(mission.ligne).split(',').map(l => parseInt(l.trim()));
            const premiereLigne = Math.min(...lignesCibles);
            const derniereLigne = Math.max(...lignesCibles);
            const startLine = Math.max(1, premiereLigne - 3);
            const endLine = derniereLigne + 3;
            const range = `'Sheet1'!A${startLine}:E${endLine}`;

            const sheetRes = await sheets.spreadsheets.values.get({
                spreadsheetId: mission.sheet_id,
                range: range, 
            });

            const rows = sheetRes.data.values;
            if (!rows || rows.length === 0) {
                return interaction.editReply("❌ Impossible de récupérer le contexte depuis la feuille.");
            }

            const indexHeader = rows.findIndex(row => row[4] && row[4].toString().trim().toUpperCase() === 'TRADUCTION');

            let texteContexte = "";
            for (let i = 0; i < rows.length; i++) {
                if (indexHeader !== -1 && i <= indexHeader) continue;

                const numLigneReelle = startLine + i;
                const perso = rows[i][1] || "???"; 
                const jap = rows[i][2] || "";
                const eng = rows[i][3] || "";
                const fr = rows[i][4] || "";

                if (!jap && !eng) continue;

                const safeJap = jap ? jap.replace(/\n/g, '\n> ') : "...";
                const safeEng = eng ? eng.replace(/\n/g, '\n> ') : "...";
                const safeFr = fr ? fr.replace(/\n/g, '\n> ') : null;

                const affichageFr = safeFr ? `> 🇫🇷 ${safeFr}\n` : "";

                if (lignesCibles.includes(numLigneReelle)) {
                    texteContexte += `\n🎯 **[LIGNE ${numLigneReelle}] ${perso}**\n> 🇯🇵 ${safeJap}\n> 🇺🇸 ${safeEng}\n`;
                } else {
                    texteContexte += `\n*[Ligne ${numLigneReelle}]* **${perso}**\n> 🇯🇵 ${safeJap}\n> 🇺🇸 ${safeEng}\n${affichageFr}`;
                }
            }

            let scriptSafe = texteContexte;
            if (scriptSafe.length > 4000) scriptSafe = scriptSafe.substring(0, 4000) + "\n...[Texte tronqué car trop long]...";

            if (mission.context) {
                let iaSafe = mission.context;
                if (iaSafe.length > 4000) iaSafe = iaSafe.substring(0, 4000) + "...";

                const embedIA = new EmbedBuilder()
                    .setColor('#4A90E2')
                    .setTitle(`Résumé et remarques`)
                    .setDescription(iaSafe);
                await interaction.editReply({ embeds: [embedIA] });

                const embedScript = new EmbedBuilder()
                    .setColor('#2F3136')
                    .setTitle(`📚 Script : ${mission.nom_feuille}\n📍 Lieu : ${mission.endroit}`)
                    .setDescription(`**Autour du bloc ${mission.ligne} :**\n${scriptSafe}`)
                await interaction.followUp({ embeds: [embedScript], ephemeral: true });

            } else {
                const embedScript = new EmbedBuilder()
                    .setColor('#2F3136')
                    .setTitle(`📚 Contexte : ${mission.nom_feuille}\n📍 Lieu : ${mission.endroit}`)
                    .setDescription(`**Script (Autour du bloc ${mission.ligne}) :**\n${scriptSafe}`)
                await interaction.editReply({ embeds: [embedScript] });
            }

        } catch (err) {
            console.error("Erreur /context :", err);
            await interaction.editReply("❌ Une erreur est survenue lors de la récupération du contexte.");
        }
    }
};
