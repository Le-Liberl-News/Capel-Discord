const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, WebhookClient, EmbedBuilder } = require('discord.js');
const db = require('../utils/db.js');
const { state, saveState } = require('../rpg/gameState.js');
const databasePersos = require('../rpg/data/persos.json');
const { tenterRegenDiscussion } = require('../rpg/gestionFatigue.js');
const { defendreLeLiberl } = require('../rpg/defenseLiberl.js');

const {characterNames:PSEUDOS,characterCombos:COMBO}=require('../utils/characters');

async function getPseudoAnonyme(userId) {
    const [existant_rows] = await db.query('SELECT * FROM pseudos_anonymes WHERE user_id = ?', [userId]);

    console.log("id anonyme existant :", existant_rows);
    if (existant_rows.length === 1) return PSEUDOS[existant_rows[0].pseudo_index];

    const [indexRows] = await db.query('SELECT pseudo_index FROM pseudos_anonymes');
    const indexDejaAttribues = indexRows.map(r => r.pseudo_index);

    const comboDisponibles = [
        ...COMBO.filter((valeur, index) => indexDejaAttribues.includes(index) && !indexDejaAttribues.includes(valeur)),
        ...COMBO.map((valeur, index) => !indexDejaAttribues.includes(index) && indexDejaAttribues.includes(valeur) ? index : null).filter(v => v !== null)
    ];

    let nouvelIndex = null;
    const [coefs] = await db.query(`SELECT anon_coef FROM users_stats WHERE user_id = ?`, [userId]);
    let coef;
    if (coefs.length === 0) {
        await db.query(`INSERT INTO users_stats (user_id, niveau) VALUES (?, 'Classe 10') `, [userId]);
        console.log("Nouvel utilisateur dans anonyme:", userId);
        coef = 0.5;
    } else {
        coef = coefs[0].anon_coef;
    }

    if (Math.random() > Math.pow(0.5, Math.pow(comboDisponibles.length * coef / 4, 0.5))) {
        if (comboDisponibles.length > 0) {
            nouvelIndex = comboDisponibles[Math.floor(Math.random() * comboDisponibles.length)];
            console.log(`Rôle attribué par combo : "${PSEUDOS[nouvelIndex]}" pour l'utilisateur ${userId}`);
        }
    }

    if (nouvelIndex === null) {
        const indexDisponibles = PSEUDOS.map ((_, i) => i).filter(i => !indexDejaAttribues.includes(i));
        if (indexDisponibles.length > 0) {
            nouvelIndex = indexDisponibles[Math.floor(Math.pow(Math.random(), 2.4 * coef) * indexDisponibles.length)];
            console.log(`Rôle attribué au hasard : "${PSEUDOS[nouvelIndex]}" pour l'utilisateur ${userId}`);
        }
    }

    if (nouvelIndex === null) return "Pom";

    const newCoef = (coef * 3 + nouvelIndex / PSEUDOS.length ) / 4;
    await db.query(`UPDATE users_stats SET anon_coef = ? WHERE user_id = ?`, [newCoef, userId]);

    await db.query(`
        INSERT INTO pseudos_anonymes (user_id, pseudo_index)
        VALUES (?, ?)
    `, [userId, nouvelIndex]);

    return PSEUDOS[nouvelIndex];
}

async function getAssignedCharacterNames() {
 const [rows]=await db.query('SELECT pseudo_index FROM pseudos_anonymes');
 return [...new Set(rows.map(row=>PSEUDOS[row.pseudo_index]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'fr'));
}

async function getIdFromPseudo(pseudoRecherche) {
    const pseudoIndex = PSEUDOS.indexOf(pseudoRecherche);

    if (pseudoIndex === -1) return null;

    try {
        const [row_rows] = await db.query("SELECT user_id FROM pseudos_anonymes WHERE pseudo_index = ?", [pseudoIndex]);
        const row = row_rows[0]
        return row ? row.user_id : null;

    } catch (error) {
        console.error("Erreur DB lors de la récupération de l'ID :", error);
        return null;
    }
}

async function execute(interaction) {
    const messageRef = interaction.reference;
    const roleplayId = process.env.ROLEPLAY_ID;

    let webhook;
    if (interaction.channelId === roleplayId) {
        webhook = new WebhookClient({ url: process.env.WEBHOOK_ROLEPLAY_URL })
    } else {
        webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
    }
    
    let texte = interaction.options.getString('message') || '';
    const image = interaction.options.getAttachment('image');
    const pseudo = await getPseudoAnonyme(interaction.user.id);
    const BASE_URL = process.env.BASE_URL;
    const threadId = process.env.THREAD_ID;

    const statsJoueur = databasePersos[pseudo] || databasePersos["default"];

    let ko = "";
    if (state?.players) {
        if (!state.players[pseudo]) {
            state.players[pseudo] = { hpActuel: statsJoueur.hpMax, statuts: [], PCActuel: statsJoueur.PCMax };
        }
        const playerInstance = state.players[pseudo];
        const ko = (playerInstance.hpActuel > statsJoueur.hpMax / 5) ? "" : "_ko";

        texte = require('../rpg/alcool').texteAlcoolise(texte, playerInstance);

        const regenResult = tenterRegenDiscussion(playerInstance, statsJoueur, state);
        saveState();
    }
    try {
        const payload = {
            content: texte,
            username: pseudo,
            avatarURL: `${BASE_URL}/pp/${encodeURIComponent(pseudo + ko)}.webp`
        };
        // the rhumertume: the pom's bubble in place of the text, its name and avatar
        const malade = interaction.channelId === roleplayId ? await interaction.client.rhumertume?.message(pseudo, texte) : null;
        if (malade) { payload.content = malade.content; payload.username = malade.username; payload.avatarURL = malade.avatarURL; }
        const fichiers = [...(malade?.files ?? []), ...(image ? [image.url] : [])];
        if (fichiers.length) payload.files = fichiers;
        if (interaction.channelId !== roleplayId) payload.threadId = threadId;
        
        await webhook.send(payload);
        if (malade) interaction.client.rhumertume.after(pseudo).catch(e => console.error('Rhumertume :', e.message));
        await interaction.reply({ content: "Message anonyme envoyé !", flags: ['Ephemeral'] });
        await defendreLeLiberl({ channel: interaction.channel, pseudo, texte, state, saveState, databasePersos });

    } catch (e) {
        console.error("Erreur envoi anonyme :", e);
        await interaction.reply({ content: "❌ Impossible d'envoyer le message.", flags: ['Ephemeral'] });
    }
}

async function monIdentite(interaction) {
    const pseudo = await getPseudoAnonyme(interaction.user.id);
    const BASE_URL = process.env.BASE_URL;

    const embedProfil = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle(`Tu es : ${pseudo}`)
        .setThumbnail(`${BASE_URL}/pp/${encodeURIComponent(pseudo)}.webp`);

    await interaction.reply({ embeds: [embedProfil], ephemeral: true });
}

module.exports = {
    characterNames: PSEUDOS,
    getPseudoAnonyme,
    execute,
    monIdentite,
    getIdFromPseudo,
    getAssignedCharacterNames
};
