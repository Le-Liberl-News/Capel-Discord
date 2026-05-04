const db = require('../utils/db.js');

module.exports = {
    async execute(interaction) {
        const [mission] = await db.query('SELECT * FROM mission_actuelle WHERE id = 1').get();
        if (!mission) { return interaction.reply({ content: "❌ Aucune mission n'est active pour le moment.", ephemeral: true }); }
        const userId = interaction.user.id;

        const [mesVotes_rows] = await db.query(`
            SELECT votes.*, propositions.texte FROM votes
            JOIN propositions ON votes.message_id = propositions.message_id
            WHERE votes.user_id = ?
            AND propositions.sheet_id = ?
            AND propositions.ligne = ?
            `, [userId, mission.sheet_id, mission.ligne]);
        const mesVotes = mesVotes_rows[0]; // TODO: Si c'était censé ramener plusieurs lignes, enlève le '_rows[0]'

        if (mesVotes.length === 0) {
            return interaction.reply({ content: "Tu n'as pas encore voté... ou alors tu as changé d'avis entre temps.", ephemeral: true });
        }

        let votesActifs = "Voici la liste de tes votes actuels :\n";
        for (let i = 0; i < mesVotes.length; i++) {
            const row = mesVotes[i];
            let paragraphe = "";

            try {
                const obj = JSON.parse(row.texte);
                paragraphe = Object.values(obj).join('\n');
            } catch (e) { paragraphe = "Erreur de lecture..."; }
          
            let nouvelAjout = `**[${i + 1}]**\n${paragraphe}`;
            if (nouvelAjout.length > 500) { nouvelAjout = nouvelAjout.substring(0,500) + "..."; }

            votesActifs += nouvelAjout + `\n\n`;
        }

        return interaction.reply({ content: votesActifs, ephemeral: true })
    }
};
