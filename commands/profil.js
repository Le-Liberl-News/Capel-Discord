const {EmbedBuilder } = require('discord.js');
const db = require('../utils/db.js');
const { RANGS_BRACERS } = require('../utils/xpManager.js');

function creerBarreXP(xpActuel, xpRequis, tailleBarre = 15) {
    const pourcentage = Math.min(xpActuel / xpRequis, 1);
    const blocsRemplis = Math.round(tailleBarre * pourcentage);
    const blocsVides = tailleBarre - blocsRemplis;

    const jauge = '▰'.repeat(blocsRemplis) + '▱'.repeat(blocsVides);
    return `**[** ${jauge} **]** ${Math.round(pourcentage * 100)}%`;
}

module.exports = {
    async execute(interaction) {
        const [stats_rows] = await db.query('SELECT xp, niveau FROM users_stats WHERE user_id = ?', [interaction.user.id]);
        const stats = stats_rows[0];

        if (!stats) {
            return interaction.reply({ 
                content: "⚠️ Aucun registre trouvé. Commence par valider des traductions pour activer ta licence de Bracer !", 
                ephemeral: true 
            });
        }

        const xpActuel = Number(stats.xp);
        const nomNiveauActuel = stats.niveau;
        const rangsInverses = [...RANGS_BRACERS].reverse(); 
        const prochainRang = rangsInverses.find(r => r.seuil > xpActuel);

        let affichageBarre = "";
        let texteProchainNiveau = "";

        if (prochainRang) {
            const xpRestant = prochainRang.seuil - xpActuel;
            affichageBarre = creerBarreXP(xpActuel, prochainRang.seuil);
            texteProchainNiveau = `Plus que **${xpRestant} PB** pour atteindre **${prochainRang.nom}** !`;
        } else {
            affichageBarre = creerBarreXP(1, 1);
            texteProchainNiveau = `🏆 Rang maximum atteint. Tu es une légende de la Guilde.`;
        }

        const embedProfil = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle(`💠 Rang de bracer : ${interaction.user.username}`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Rang actuel', value: `**${nomNiveauActuel}**`, inline: true },
                { name: 'PB', value: `**${xpActuel}**`, inline: true },
                { name: 'Progression', value: `${affichageBarre}\n*${texteProchainNiveau}*`, inline: false }
            )
            //.setFooter({ text: 'Le Capel', iconURL: interaction.client.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embedProfil], ephemeral: true });
    }
};
