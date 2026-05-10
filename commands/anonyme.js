const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, WebhookClient, EmbedBuilder } = require('discord.js');
const db = require('../utils/db.js');
const { state, saveState } = require('../rpg/gameState.js');
const databasePersos = require('../rpg/data/persos.json');
const { tenterRegenDiscussion } = require('../rpg/gestionFatigue.js');

const PSEUDOS = [
//   0-5                 1-6         2-7              3-8                   4-9
    "Estelle"         , "Joshua"  , "Scherazard"   , "Olivier"           , "Kloe",                  //0-4
    "Agate"           , "Tita"    , "Zin"          , "Nial"              , "Ries",                  //5-9
    "Kevin"           , "Dorothy" , "Luciola"      , "Walter"            , "Bleublanc",             //10-14
    "Campanella"      , "Loewe"   , "Weissmann"    , "Renne"             , "Professeur Russell",    //15-19
    "Julia"           , "Josette" , "Anelace"      , "Cassius"           , "Maire Maybelle",        //20-24
    "Richard"         , "Mueller" , "Grant"        , "Aina"              , "Proviseur Collins",     //25-29
    "Jill"            , "Hans"    , "Carna"        , "Jean"              , "Général Morgan",        //30-34
    "Lugran"          , "Kilika"  , "Kurt"         , "Elnan"             , "Majordome Philippe",    //35-39
    "Duc Dunan"       , "Lila"    , "Kyle"         , "Don"               , "Reine Alicia",          //40-44
    "Orvid"           , "Anton"   , "Kanone"       , "Chancelier Osborne", "Theresa",               //45-49
    "Maire Klaus"     , "Mme Mao" , "Antoine"      , "Lt-colonel Cid"    , "Dalmore",               //50-54
    "Sieg"            , "Clem"    , "Daniel"       , "Ambassadrice Elsa" , "Deen",                  //55-59
    "Rocco"           , "Rais"    , "Jack"         , "Ambassadeur Davil" , "Halle",                 //60-64
    "Lucy"            , "Mary"    , "Erika Russell", "Lechter"           , "Ein Selnate",           //65-69
    "Leo"             , "Phyllis" , "Dan Russell"  , "Rufina Argent"     , "Celeste von Auslese",   //70-74
    "Intendante Hilda", "Gilbert" , "Polly"        , "Directeur Murdock" , "Chef-mécanicien Gustav",//75-79
    "Ray"             , "Terry"   , "Luke"         , "Pat"                                          //80-83
];

const COMBO = [
    18, 16, 28, 26, 56,
    19, 5,  36, 11, 10,
    9,  8,  2,  7,  3,
    17, 1,  16, 17, 67,
    55, 1 , 25, 0,  41,
    23, 3 , 35, 2,  30,
    4,  29, 33, 32, 25,
    3,  13, 38, 37, 40,
    39, 24, 43, 42, 55,
    0,  28, 25, 3,  4,
    28, 11, 81, 23, 76,
    4,  49, 56, 7,  60,
    5,  60, 64, 26, 62,
    31, 49, 72, 65, 10,
    68, 22, 6,  9,  4,
    44, 15, 66, 19, 78,
    52, 80, 83, 82
];

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

        const estAlcoolise = playerInstance.statuts && playerInstance.statuts.some(s => s.nom === "alcoolise");
        if (estAlcoolise && texte.length > 0) {
            const mots = texte.split(' ');

            texte = mots.map(mot => {
                if (Math.random() < 0.15) {
                    const bruit = Math.random() < 0.5 ? "*hic*" : "*hips*";
                    return `${mot} ${bruit}`;
                }
                return mot;
            }).join(' ');

            if (!texte.includes('*hic*') && !texte.includes('*hips*')) {
                texte += ' ... *hic*';
            }
        }

        const regenResult = tenterRegenDiscussion(playerInstance, statsJoueur, state);
        saveState();
    }
    try {
        const payload = {
            content: texte,
            username: pseudo,
            avatarURL: `${BASE_URL}/pp/${encodeURIComponent(pseudo + ko)}.webp`
        };
        if (image) payload.files = [image.url];
        if (interaction.channelId !== roleplayId) payload.threadId = threadId;
        
        await webhook.send(payload);
        await interaction.reply({ content: "Message anonyme envoyé !", flags: ['Ephemeral'] });

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
    getPseudoAnonyme,
    execute,
    monIdentite,
    getIdFromPseudo
};
