const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, WebhookClient } = require('discord.js');
const db = require('../utils/db.js');

const PSEUDOS = [
    "Estelle"   , "Joshua"      , "Scherazard", "Olivier" , "Kloe",
    "Agate"     , "Tita"        , "Zin"       , "Nial"    , "Ries",
    "Kevin"     , "Dorothy"     , "Luciola"   , "Walter"  , "Bleublanc",
    "Campanella", "Loewe"       , "Weissmann" , "Renne"   , "Professeur Russell",
    "Julia"     , "Josette"     , "Anelace"   , "Cassius" , "Maire Maybelle",
    "Richard"   , "Mueller"     , "Grant"     , "Aina"    , "Proviseur Collins",
    "Jill"      , "Hans"        , "Carna"     , "Jean"    , "Général Morgan",
    "Lugran"    , "Kilika"      , "Kurt"      , "Elnan"   , "Majordome Philippe",
    "Duc Dunan" , "Lila"        , "Kyle"      , "Don"     , "Reine Alicia",
    "Orvid"     , "Anton"       , "Kanone"    , "Chancelier Osborne",
    "Theresa"   , "Maire Klaus" , "Mme Mao"   , "Antoine" , "Lt-colonel Cid",
    "Dalmore"   , "Sieg"        , "Clem"      , "Daniel"  , "Ambassadrice Elsa",
    "Deen"      , "Rocco"       , "Rais"      , "Jack"    , "Ambassadeur Davil",
    "Halle"     , "Lucy"        , "Mary"      , "Erika Russell",
    "Lechter"   , "Ein Selnate" , "Leo"       , "Phyllis" , "Dan Russell",
    "Rufina Argent"             , "Celeste von Auslese"   , "Intendante Hilda",
    "Chef-mécanicien Gustav"    , "Directeur Murdock"
];

function getPseudoAnonyme(userId) {
    const existant = db.prepare('SELECT * FROM pseudos_anonymes WHERE user_id = ?').get(userId);

    if (existant) return PSEUDOS[existant.pseudo_index];

    const indexDejaAttribues = db.prepare('SELECT pseudo_index FROM pseudos_anonymes').all().map(r => r.pseudo_index);
    const indexDisponibles = PSEUDOS.map((_, i) => i).filter(i => !indexDejaAttribues.includes(i));
    const nouvelIndex = indexDisponibles.length > 0
        ? indexDisponibles[Math.floor(Math.pow(Math.random(), 3) * indexDisponibles.length)]
        : null;

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
