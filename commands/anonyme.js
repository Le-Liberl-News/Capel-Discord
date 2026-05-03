const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, WebhookClient } = require('discord.js');
const db = require('../utils/db.js');
const { state, saveState } = require('../rpg/gameState.js');
const databasePersos = require('../rpg/data/persos.json');
const { tenterRegenDiscussion } = require('../rpg/gestionFatigue.js');

const PSEUDOS = [
//   0-5                 1-6         2-7              3-8                   4-9
    "Estelle"         , "Joshua"  , "Scherazard"   , "Olivier"           , "Kloe",                 //0-4
    "Agate"           , "Tita"    , "Zin"          , "Nial"              , "Ries",                 //5-9
    "Kevin"           , "Dorothy" , "Luciola"      , "Walter"            , "Bleublanc",            //10-14
    "Campanella"      , "Loewe"   , "Weissmann"    , "Renne"             , "Professeur Russell",   //15-19
    "Julia"           , "Josette" , "Anelace"      , "Cassius"           , "Maire Maybelle",       //20-24
    "Richard"         , "Mueller" , "Grant"        , "Aina"              , "Proviseur Collins",    //25-29
    "Jill"            , "Hans"    , "Carna"        , "Jean"              , "Général Morgan",       //30-34
    "Lugran"          , "Kilika"  , "Kurt"         , "Elnan"             , "Majordome Philippe",   //35-39
    "Duc Dunan"       , "Lila"    , "Kyle"         , "Don"               , "Reine Alicia",         //40-44
    "Orvid"           , "Anton"   , "Kanone"       , "Chancelier Osborne", "Theresa",              //45-49
    "Maire Klaus"     , "Mme Mao" , "Antoine"      , "Lt-colonel Cid"    , "Dalmore",              //50-54
    "Sieg"            , "Clem"    , "Daniel"       , "Ambassadrice Elsa" , "Deen",                 //55-59
    "Rocco"           , "Rais"    , "Jack"         , "Ambassadeur Davil" , "Halle",                //60-64
    "Lucy"            , "Mary"    , "Erika Russell", "Lechter"           , "Ein Selnate",          //65-69
    "Leo"             , "Phyllis" , "Dan Russell"  , "Rufina Argent"     , "Celeste von Auslese",  //70-74
    "Intendante Hilda", "Gilbert" , "Polly"        , "Directeur Murdock" , "Chef-mécanicien Gustav"//75-79
];

const COMBO = [
    18, 16, 28, 26, 56,
    19, 5,  36, 11, 10,
    9,  8,  2,  7,  3,
    17, 1,  16, 17, 62,
    55, 1 , 25, 0,  41,
    23, 3 , 35, 2,  30,
    4,  29, 33, 32, 25,
    3,  13, 38, 37, 40,
    39, 24, 43, 42, 55,
    0,  28, 25, 3,  4,
    28, 11, 79, 23, 76,
    4,  49, 56, 7,  60,
    5,  60, 64, 26, 62,
    31, 49, 72, 65, 10,
    68, 22, 6,  9,  4,
    44, 15, 66, 19, 78
];

function getPseudoAnonyme(userId) {
    const existant = db.prepare('SELECT * FROM pseudos_anonymes WHERE user_id = ?').get(userId);

    if (existant) return PSEUDOS[existant.pseudo_index];

    const indexDejaAttribues = db.prepare('SELECT pseudo_index FROM pseudos_anonymes').all().map(r => r.pseudo_index);

    let nouvelIndex = null;

    if (Math.random() < Math.pow(0.5, Math.pow(indexDejaAttribues.length, 0.5))) {
        const comboDisponibles = COMBO.filter((valeur, index) =>
            indexDejaAttribues.includes(index) &&
            !indexDejaAttribues.includes(valeur));
        if (comboDisponibles.length > 0) {
            nouvelIndex = comboDisponibles[Math.floor(Math.random() * comboDisponibles.length)];
        }
    }

    if (nouvelIndex === null) {
        const indexDisponibles = PSEUDOS.map((_, i) => i).filter(i => !indexDejaAttribues.includes(i));
        nouvelIndex = indexDisponibles.length > 0
            ? indexDisponibles[Math.floor(Math.pow(Math.random(), 3) * indexDisponibles.length)]
            : null;
    }

    if (nouvelIndex === null) return "Pom";

    db.prepare(`
        INSERT INTO pseudos_anonymes (user_id, pseudo_index)
        VALUES (?, ?)
        ON CONFLICT(user_id) DO UPDATE SET pseudo_index = excluded.pseudo_index
    `).run(userId, nouvelIndex);

    return PSEUDOS[nouvelIndex];
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
    const texte = interaction.options.getString('message');
    const pseudo = getPseudoAnonyme(interaction.user.id);
    const BASE_URL = process.env.BASE_URL;
    const threadId = process.env.THREAD_ID;

    const statsJoueur = databasePersos[pseudo] || databasePersos["default"];
    
    if (!state.players[pseudo]) {
        state.players[pseudo] = { hpActuel: statsJoueur.hpMax, statuts: [], fatigueActuelle: statsJoueur.fatigueMax };
    }
    const playerInstance = state.players[pseudo];

    const regenResult = tenterRegenDiscussion(playerInstance, statsJoueur, state);
    saveState();

    try {
        const payload = {
            content: texte,
            username: pseudo,
            avatarURL: `${BASE_URL}/pp/${encodeURIComponent(pseudo)}.webp`
        };
        if (interaction.channelId !== roleplayId) payload.threadId = threadId;
        await webhook.send(payload);
        await interaction.reply({ content: "Message anonyme envoyé !", ephemeral: true });

    } catch (e) {
        console.error("Erreur envoi anonyme :", e);
        await interaction.reply({ content: "❌ Impossible d'envoyer le message.", ephemeral: true });
    }
}

module.exports = {
    getPseudoAnonyme,
    execute
};
