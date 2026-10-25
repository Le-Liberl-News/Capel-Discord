const db = require('./db.js');
const { RANGS_BRACERS } = require('./xpManager.js');
const { AttachmentBuilder } = require('discord.js');
const { renderRankings } = require('./rankingsImage.js');
const path = require('node:path');
const historique = require('./activityStateStore.js').createActivityStateStore(path.join(__dirname, '../.runtime/rankings-history.json'));

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
        const attachment = new AttachmentBuilder(buffer, { name: 'classement.' + require('./loopingGif').extension(buffer) });

        await message.edit({
            content: null, 
            attachments: [],
            files: [attachment]
        });
        console.log(`[CLASSEMENT] Image mise à jour (${top10.length} bracers).`);
        return true;

    } catch (erreur) { console.error("Erreur maj classement image :", erreur); return false; }
}

// Each bracer's points, trads and place as the day starts (Paris, taken by the midnight cron), kept for a few days: the board shows what the
// previous day brought (points of this morning minus points of yesterday morning, trads and places likewise).
// Arena wins, all days together, come from the arena's own record.
const arene = require('./activityStateStore.js').createActivityStateStore(path.join(__dirname, '../.runtime/activity-arena-ranking.json'));
function victoiresArene(maintenant = new Date()) {
    const totaux = new Map(), jours = arene.load()?.days ?? {};
    for (const jour of Object.values(jours)) for (const [userId, ligne] of Object.entries(jour)) totaux.set(userId, (totaux.get(userId) ?? 0) + (ligne.wins ?? 0));
    // the arena keeps each day apart: the previous day's wins are read straight from it
    const veille = jours[jourParis(new Date(maintenant.getTime() - 86400000))] ?? {};
    return { totaux, veille: userId => veille[userId]?.wins ?? 0 };
}
const jourParis = (date = new Date()) => date.toLocaleDateString('sv-SE', { timeZone: 'Europe/Paris' });
let photoEnCours = null;
async function photographierJour(maintenant = new Date()) {
    const jour = jourParis(maintenant), etat = historique.load() ?? { jours: {} };
    if (etat.jours[jour]) return etat;
    if (photoEnCours?.jour === jour) return photoEnCours.promesse;
    const promesse = (async () => {
        const [lignes] = await db.query('SELECT user_id, xp, victoires FROM users_stats ORDER BY xp DESC, user_id');
        etat.jours[jour] = Object.fromEntries(lignes.map((l, i) => [String(l.user_id), { xp: Number(l.xp), trads: Number(l.victoires ?? 0), place: i + 1 }]));
        for (const ancien of Object.keys(etat.jours).sort().slice(0, -4)) delete etat.jours[ancien];
        historique.save(etat);
        return etat;
    })().finally(() => { photoEnCours = null; });
    photoEnCours = { jour, promesse };
    return promesse;
}
function evolutionVeille(etat, maintenant = new Date()) {
    const jour = jourParis(maintenant), veille = jourParis(new Date(maintenant.getTime() - 86400000));
    const aujourdhui = etat.jours[jour], hier = etat.jours[veille];
    if (!aujourdhui || !hier) return () => ({});
    return userId => {
        const a = aujourdhui[userId], h = hier[userId];
        if (!a) return {};
        return { pbGain: Math.max(0, a.xp - (h?.xp ?? 0)), tradsGain: a.trads === undefined || (h && h.trads === undefined) ? 0 : Math.max(0, a.trads - (h?.trads ?? 0)), placeChange: h ? h.place - a.place : 0 };
    };
}

async function updateRanking(client) {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) return;

    let evolution = () => ({});
    // only midnight takes the day's picture: a refresh during the day must not stand in for the start of the day
    try { evolution = evolutionVeille(historique.load() ?? { jours: {} }); } catch (e) { console.error("Erreur historique classement :", e); }
    let arenes = { totaux: new Map(), veille: () => 0 };
    try { arenes = victoiresArene(); } catch (e) { console.error("Erreur victoires arène :", e); }
    const [rawTop10] = await db.query('SELECT user_id, xp, victoires AS trads FROM users_stats ORDER BY xp DESC, user_id LIMIT 10');
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
            couleurHex: couleurLigne,
            arenaWins: arenes.totaux.get(String(ligne.user_id)) ?? 0,
            arenaGain: arenes.veille(String(ligne.user_id)),
            ...evolution(String(ligne.user_id))
        });
    }

    return actualiserClassement(client, top10Formate);
}

// The nightly update: the day's picture then the board. Midnight asks for it, and a regular check asks again
// so a night the bot was down or Discord failed is caught up as soon as possible.
let quotidienneEnCours = null;
function miseAJourQuotidienne(client) {
    return quotidienneEnCours ??= (async () => {
        const jour = jourParis();
        if (historique.load()?.rafraichi === jour) return;
        await photographierJour();
        if (await updateRanking(client)) { const etat = historique.load() ?? { jours: {} }; etat.rafraichi = jour; historique.save(etat); }
    })().catch(erreur => console.error("[CLASSEMENT] Mise à jour quotidienne :", erreur)).finally(() => { quotidienneEnCours = null; });
}

module.exports = { actualiserClassement, updateRanking, photographierJour, evolutionVeille, miseAJourQuotidienne };
