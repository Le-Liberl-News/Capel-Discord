const db = require('./db.js');
const { RANGS_BRACERS } = require('./xpManager.js');
const { AttachmentBuilder } = require('discord.js');
const { renderRankings } = require('./rankingsImage.js');

const couleursDeBase = [
    '#e33464', '#e73326', '#e84329', '#e8532c', '#e9632f', 
    '#e97232', '#ea8135', '#ea9038', '#eb9e3b', '#ebac3f', 
    '#ecba41', '#ecc745', '#ecd448', '#ede04b', '#edeb4e', 
    '#dfee53', '#adef4c', '#74f144', '#2df245', '#37f36f', 
    '#31f59e', '#2bf5cd', '#23dbf6', '#1c95f7', '#1449f9'
];

const ratio = 0.9;

const couleursAssombries = couleursDeBase.map(hex => {
    let r = Math.round(parseInt(hex.slice(1, 3), 16) * ratio);
    let g = Math.round(parseInt(hex.slice(3, 5), 16) * ratio);
    let b = Math.round(parseInt(hex.slice(5, 7), 16) * ratio);
    
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
});

async function actualiserClassement(client, top10) {
    const salonSecretId = '1497953103713144863';
    const messageMaitreId = '1497953689263149227';

    try {
        const salon = await client.channels.fetch(salonSecretId);
        const message = await salon.messages.fetch(messageMaitreId);

        const buffer = await renderRankings(top10);
        const attachment = new AttachmentBuilder(buffer, { name: 'classement.gif' });

        await message.edit({
            content: null, 
            attachments: [],
            files: [attachment]
        });

    } catch (erreur) { console.error("Erreur maj classement image :", erreur); }
}

async function updateRanking(client) {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) return;

    const [rawTop10] = await db.query('SELECT user_id, xp, victoires AS trads FROM users_stats ORDER BY xp DESC LIMIT 10');
    let top10Formate = [];

    for (const ligne of rawTop10) {
        let pseudoBracer = "Inconnu";
        let avatar = null;
        try {
            // the name and picture they use on the server, the account's when they left it
            const membre = await guild.members.fetch(String(ligne.user_id)).catch(() => null);
            const user = membre?.user ?? await client.users.fetch(String(ligne.user_id));
            pseudoBracer = membre?.displayName ?? user.globalName ?? user.username;
            const reponse = await fetch((membre ?? user).displayAvatarURL({ extension: 'png', size: 64 }));
            if (reponse.ok) avatar = Buffer.from(await reponse.arrayBuffer());
        } catch (e) { }

        const indexRang = RANGS_BRACERS.findIndex(r => Number(ligne.xp) >= r.seuil);
        const rangActuel = RANGS_BRACERS[indexRang];

        const rangSuperieur = RANGS_BRACERS[indexRang - 1];
        const seuilSuivant = rangSuperieur ? rangSuperieur.seuil : "MAX";

        const indexSecurise = indexRang !== -1 ? indexRang : 0;
        const couleurLigne = couleursAssombries[indexSecurise] || '#FFFFFF';

        top10Formate.push({
            pseudo: pseudoBracer,
            avatar: avatar,
            pb: Number(ligne.xp),
            seuil: rangActuel ? rangActuel.seuil : 0,
            seuilSuivant: seuilSuivant,
            nomRang: rangActuel ? rangActuel.nom : "Inconnu",
            trads: ligne.trads || 0,
            couleurHex: couleurLigne
        });
    }

    await actualiserClassement(client, top10Formate);
}

module.exports = { actualiserClassement, updateRanking };
