const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const db = require('../utils/db.js');

module.exports = {
    async execute(interaction) {
        const [missions] = await db.query('SELECT * FROM mission_actuelle WHERE id = 1');
        const userId = interaction.user.id;

        if (!missions) {
            return interaction.reply({ content: "❌ Aucune mission n'est active pour le moment.", ephemeral: true });
        }
        mission = missions[0];

        const [mesPropositions] = await db.query(`
            SELECT message_id, texte FROM propositions 
            WHERE user_id = ? AND sheet_id = ? AND ligne = ?
        `, [userId, mission.sheet_id, mission.ligne]);

        const [bracerConfirme_rows] = await db.query(`SELECT xp FROM users_stats WHERE user_id = ?`, [userId]);
        const bracerConfirme = (bracerConfirme_rows[0] && bracerConfirme_rows[0].xp >= 1300);
        if (bracerConfirme && mesPropositions.length > 0) {
            return interaction.reply({
                content: "Tu es un bracer confirmé désormais ! Tu n'as plus droit qu'à une seule proposition simultanée.",
                ephemeral: true
            });
        }

        if (mesPropositions.length >= 2) {
            const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

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
                .setCustomId('remplacer_trad')
                .setPlaceholder('Choisis une proposition à remplacer...')
                .addOptions(options);

            const row = new ActionRowBuilder().addComponents(select);

            return interaction.reply({
                content: "⚠️ Tu as déjà soumis **2 propositions** pour ce bloc. Veux-tu en supprimer une pour la remplacer ?",
                components: [row],
                ephemeral: true
            });
        }

        const modal = new ModalBuilder()
            .setCustomId('modal_trad_groupe')
            .setTitle(`Traduction : ${mission.nom_perso || "Perso"}`);

        console.log("Lignes, Jap, Eng:", mission.ligne, mission.texte_jap, mission.texte_eng);
        
        const lignes = String(mission.ligne).split(',');
        const textesJap = String(mission.texte_jap).split(' |BR| ');
        const textesEng = String(mission.texte_eng).split(' |BR| ');

        const  [tentativePrecedente] = await db.query(`SELECT * FROM tentatives WHERE user_id = ?`, [userId]);
        let textePrerempli = null;
        if (tentativePrecedente.length > 0) {
            try { textePrerempli = Object.values(JSON.parse(tentativePrecedente[0].texte));
            } catch (e) { textePrerempli = tentativePrecedente[0].texte; }
            console.log("Tentative précédente détectée:", textePrerempli);
        }

        lignes.forEach((numLigne, index) => {
            const input = new TextInputBuilder()
                .setCustomId(`bulle_${index}`)
                .setLabel(`Bulle ${index + 1} (Ligne ${numLigne.trim()})`)
                .setPlaceholder(`JAP: ${textesJap[index] ? textesJap[index].substring(0, 45) : "..."}`)
                .setStyle(TextInputStyle.Paragraph)
                .setValue(textePrerempli ? textePrerempli[index] : `JAP: ${textesJap[index]}\nEN: ${textesEng[index]}`)
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(input));
        });

        await interaction.showModal(modal);
    }
};
