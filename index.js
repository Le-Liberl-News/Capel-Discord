require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient, ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { google } = require('googleapis');

const db = require('./utils/db.js');
const cron = require('node-cron');
const { declencherNouvelleMission, cloreLeVoteActuel, genererMessageRecap } = require('./utils/missionLogic.js');

const SALON_VOTE_ID = "1492972991418732685";
const SALON_READONLY_ID = "1493171302624657428";

const handleSelectMenus = require('./handlers/selectMenus.js');
const handleButtons = require('./handlers/buttons.js');
const handleModals = require('./handlers/modals.js');
const handleSlashCommands = require('./handlers/slashCommands.js')

const { relancerAudioApresCrash } = require('./rpg/audioManager.js');

const cleanup = require('./utils/cleanup.js');
const { ajouterXP } = require('./utils/xpManager');
const { updateRanking } = require('./utils/rankings.js')
const { state, saveState } = require('./rpg/gameState.js');
const KEY_FILE = './credentials.json';
const TABLE_ID = '1U3A84MvYYfhdDkJ8Oc8nxFJKlyeS0-Xk_7fl_SLBGYo';

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const commands = [
    new SlashCommandBuilder().setName('test1').setDescription('Parse la TABLE'),
    new SlashCommandBuilder().setName('runtrad').setDescription('Cherche une réplique à traduire'),
    new SlashCommandBuilder().setName('trad').setDescription('Soumettre une traduction anonyme'),
    new SlashCommandBuilder().setName('context').setDescription('Donne le contexte de la réplique du jour'),
    new SlashCommandBuilder().setName('profil').setDescription('Affiche la progression de l\'utilisateur.'),
    new SlashCommandBuilder().setName('kisekijesuis').setDescription('Vous indique quel est votre rôle anonyme du jour'),
    new SlashCommandBuilder().setName('closetrad').setDescription('Clore les soumissions'),
    new SlashCommandBuilder().setName('init-rank').setDescription('Commande système : Initialise le panneau de classement'),
    new SlashCommandBuilder().setName('actu-rank').setDescription('Commande système : Actualise le panneau de classement'),
    new SlashCommandBuilder().setName('add-votes').setDescription('Commande système : Ajoute le bouton vote aux propositions'),
    new SlashCommandBuilder().setName('testmodal').setDescription('test modal'),
    new SlashCommandBuilder().setName('creerthread').setDescription('Création du thread quotidien'),
    new SlashCommandBuilder().setName('edition').setDescription('Modifier une de tes propositions en cours'),
    new SlashCommandBuilder().setName('suppr').setDescription('Supprimer une de tes propositions en cours'),
    new SlashCommandBuilder().setName('votes').setDescription('Récapitulatif de tes votes actifs'),

    new SlashCommandBuilder().setName('open').setDescription('Ouvrir une feuille dans le navigateur')
        .addStringOption(opt => opt.setName('feuille').setDescription('Nom (ex: T0100)').setRequired(true)),

    new SlashCommandBuilder().setName('read').setDescription('Lire une ligne spécifique')
        .addStringOption(opt => opt.setName('feuille').setDescription('Nom (ex: T0100)').setRequired(true))
        .addIntegerOption(opt => opt.setName('ligne').setDescription('Numéro de ligne').setRequired(true)),

    new SlashCommandBuilder().setName('write').setDescription('Écrire une traduction')
        .addStringOption(opt => opt.setName('feuille').setDescription('Nom (ex: T0100)').setRequired(true))
        .addIntegerOption(opt => opt.setName('ligne').setDescription('Numéro de ligne').setRequired(true))
        .addStringOption(opt => opt.setName('trad').setDescription('Le texte FR').setRequired(true)),

    new SlashCommandBuilder().setName('lexique').setDescription('Cherche un terme approximatif dans le lexique officiel')
        .addStringOption(opt => opt.setName('terme').setDescription('Le mot à chercher (ex: Aureole, bracer...)').setRequired(true)),

    new SlashCommandBuilder().setName('anonyme').setDescription('Envoyer un message anonyme dans le thread du jour')
        .addStringOption(opt => opt.setName('message').setDescription('Ton message').setMaxLength(1000).setRequired(true))
        .addAttachmentOption(opt => opt.setName('image').setDescription('Image à joindre').setRequired(false)),

    new ContextMenuCommandBuilder().setName('Répondre anonymement')
        .setType(ApplicationCommandType.Message),

    new SlashCommandBuilder().setName('generer-map').setDescription('Génère un étage'),
    new SlashCommandBuilder().setName('naviguer').setDescription('Définis une trajectoire à suivre')
        .addStringOption(opt => opt.setName('trajectoire').setDescription('Trajectoire (ex : D H D)').setRequired(true)),

    new SlashCommandBuilder().setName('attaque').setDescription('Lance une attaque sur la cible')
        .addStringOption(opt => opt.setName('cible').setDescription('Cible (ex : D H B G)').setRequired(true))
        .addStringOption(opt => opt.setName('description').setDescription('Description de l\'attaque').setRequired(true)),
    new SlashCommandBuilder().setName('action').setDescription('Lance une action sur la cible')
        .addStringOption(opt => opt.setName('cible').setDescription('Cible (ex : Joshua)').setRequired(true))
        .addStringOption(opt => opt.setName('description').setDescription('Description de l\'action').setRequired(true)),
    

].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log('✅ Commandes synchronisées !');
    } catch (e) { console.error(e); }
})();

client.once('clientReady', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
    relancerAudioApresCrash(client, state);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) return handleButtons(interaction, sheets);
    if (interaction.isStringSelectMenu()) return handleSelectMenus(interaction);
    if (interaction.isModalSubmit()) return handleModals(interaction, sheets);
    if (interaction.isChatInputCommand()) return handleSlashCommands(interaction, sheets);
    if (interaction.isMessageContextMenuCommand()) {
        if (interaction.commandName === 'Répondre anonymement') {
            const modal = new ModalBuilder()
                .setCustomId(`modal_anonyme_${interaction.targetId}`) // On stocke l'ID du message cible ici
                .setTitle('Réponse Anonyme');

            const input = new TextInputBuilder()
                .setCustomId('message_contenu')
                .setLabel('Ton message')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Écris ta réponse ici...')
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(input));
            await interaction.showModal(modal);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

setInterval(async () => {
    const maintenant = Date.now();
    const limiteTemps = 24 * 60 * 60 * 1000;

    const [validationsExpirees] = await db.query('SELECT * FROM validations WHERE (? - timestamp_debut) > ?', [maintenant, limiteTemps]);

    for (const val of validationsExpirees) {
        try {
            const channel = await client.channels.fetch(process.env.SECRET_CHANNEL_ID);
            const message = await channel.messages.fetch(val.message_id);
            if (message) await message.edit({ content: "⏳ **Traduction rejetée (Délai de 24h expiré sans majorité).**", components: [], embeds: [] });

        } catch (e) { console.log(`Le message expiré ${val.message_id} n'a pas pu être modifié (peut-être déjà supprimé).`); }

        await cleanup.clearButtons(client, val.sheet_id, val.ligne);
        cleanup.purgeMission(val.sheet_id, val.ligne, val.message_id);
    }
}, 10 * 1000);


const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sheetManager = require('./utils/sheetManager');

const app = express();
app.use('/img', express.static('./img'));
const upload = multer({ dest: 'uploads/' });


// Outil de screenshot ingame pour le debug, à partir d'ici'

app.post('/debug-screen', upload.single('screenshot'), async (req, res) => {
    try {
        const auteur = req.body.auteur || "Reporter Inconnu";
        const fichierBrut = req.body.fichier || "";
        const replique = req.body.replique || "";

        // 1. On nettoie le nom du fichier (on enlève le .v0 ou .x)
        const baseName = fichierBrut.replace(/\.[^/.]+$/, "");

        // 2. On lance la recherche massive via le sheetManager
        const matchs = await sheetManager.trouverOccurrencesBug(sheets, TABLE_ID, baseName, replique);

        const channel = await client.channels.fetch(process.env.SECRET_CHANNEL_ID);
        const attachment = new AttachmentBuilder(req.file.path, { name: 'capture.png' });

        let content = `**Nouveau bug report**\n**Auteur :** ${auteur}\nScript :** \`${baseName}\`\n**Réplique :**\n> ${replique}\n\n`;
        const components = [];

        if (matchs.length > 0) {
            content += `✅ **Match exact trouvé (${matchs.length} occurrence(s)) :**\n`;
            matchs.slice(0, 10).forEach(m => {
                content += `- Feuille **${m.feuille}** (Ligne ${m.ligne}) | *${m.perso}*\n`;
            });

            const fixButton = new ButtonBuilder()
                .setCustomId(`btn_fix_${baseName}`)
                .setLabel('Corriger ces lignes')
                .setStyle(ButtonStyle.Success)
                .setEmoji('✏️');

            components.push(new ActionRowBuilder().addComponents(fixButton));

        } else {
            content += `❌ **Aucun match exact trouvé.** (Réplique vide, tag caché, ou erreur ?)\n🔍 Inspectez manuellement les feuilles liées :`;

            const feuillesLiees = await sheetManager.getFeuillesParNom(sheets, TABLE_ID, baseName);

            if (feuillesLiees.length > 0) {
                const linkRow = new ActionRowBuilder();
                feuillesLiees.slice(0, 5).forEach(f => {
                    linkRow.addComponents(
                        new ButtonBuilder()
                            .setLabel(`Ouvrir ${f.nom}`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(f.lien)
                    );
                });
                components.push(linkRow);
            } else {
                 content += `\n⚠️ *Le script ${baseName} n'a pas été trouvé dans le Sommaire.*`;
            }
        }

        await channel.send({ content, files: [attachment], components });

        const fs = require('fs');
        fs.unlinkSync(req.file.path);
        res.status(200).send('OK');

    } catch (error) {
        console.error("❌ Erreur Route :", error);
        res.status(500).send('Erreur interne.');
    }
});

const cooldownsXP = new Map();

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const now = Date.now();
    const lastXP = cooldownsXP.get(message.author.id) || 0;

    if (now - lastXP > (15 * 60000)) {
        await ajouterXP(message.author.id, 1, client);
        cooldownsXP.set(message.author.id, now);
    }

    const threadId = process.env.THREAD_ID;
    const roleplayId = process.env.ROLEPLAY_ID;
    let webhook;
    if (message.channelId === threadId) {
        webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
    } else if (message.channelId === roleplayId) {
        webhook = new WebhookClient({ url: process.env.WEBHOOK_ROLEPLAY_URL });
    } else {
        return;
    }
    const { getPseudoAnonyme } = require('./commands/anonyme.js');
    const pseudo = await getPseudoAnonyme(message.author.id);
    const BASE_URL = process.env.BASE_URL;
    const texte = message.content;
    const fichiersTelecharges = await Promise.all(
        message.attachments.map(async attachment => {
            const response = await fetch(attachment.url);
            const buffer = await response.arrayBuffer();
            return {
                attachment: Buffer.from(buffer),
                name: attachment.name
            };
        })
    );
    const avertissement = await message.reply({ content: "⚠️ Utilisez `/anonyme` pour poster dans ce fil !"});
    setTimeout(() => avertissement.delete().catch(() => {}), 5000);

    try { await message.delete();
    } catch (e) { return console.error("Impossible de supprimer le message :", e.message); }

    const databasePersos = require('./rpg/data/persos.json');
    const statsJoueur = databasePersos[pseudo] || databasePersos["default"];

    if (!state.players[pseudo]) {
        state.players[pseudo] = { hpActuel: statsJoueur.hpMax, statuts: [], PCActuel: statsJoueur.PCMax };
    }
    const playerInstance = state.players[pseudo];
    const ko = (playerInstance.hpActuel > statsJoueur.hpMax / 5) ? "" : "_ko";

    try {
        const payload = {
            content: texte,
            username: pseudo,
            avatarURL: `${BASE_URL}/pp/${encodeURIComponent(pseudo + ko)}.webp`
        }
        if (fichiersTelecharges.length > 0) payload.files = fichiersTelecharges;
        if (message.channelId === threadId) payload.threadId = threadId;
        await webhook.send( payload );

    } catch (e) { console.error("Erreur envoi anonymisé :", e); }
});


app.listen(3000, () => {
    console.log('📡 Serveur de capture DLL actif sur http://localhost:3000');
});


cron.schedule('0 0 * * *', async () => {
    await db.query('DELETE FROM pseudos_anonymes');
    const discu_channel = await client.channels.fetch(SALON_VOTE_ID);
    const [voting_rows] = await db.query(`SELECT voting FROM mission_actuelle WHERE id = 1`);
    const voting = voting_rows[0]?.voting;
    if (voting) {
        try {
            console.log("🕒 [CRON] Lancement de la mission de minuit...");

            const channel = await client.channels.fetch(SALON_READONLY_ID);
            const result = await declencherNouvelleMission(sheets, TABLE_ID, SALON_READONLY_ID);
            const capelAvatar = new AttachmentBuilder('./capel.gif');

            if (typeof result === 'string') { return channel.send(result); }

            await channel.send({ files: [capelAvatar] });
            const missionMsg = await channel.send({ content: result.principal });

            const lienMission = `https://discord.com/channels/${process.env.GUILD_ID}/${SALON_READONLY_ID}/${missionMsg.id}`;
            const [multiplicateurs] = await db.query(`SELECT multiplicateur FROM mission_actuelle WHERE id = 1`);
            const bonus = (multiplicateurs[0].multiplicateur - 1) * 100;
            const bonusMessage = (bonus > 0) ? `\nBonus de ${bonus} % sur les propositions soumises aujourd'hui !` : "";
            const messageAnnonce = `\`\`\`text
        The Orbal Calculator
        CAPEL SYSTEM Ver.7.0
        COPYRIGHT C.T.Z.
        ----------------------------------
        [STATUT]  : NOUVELLE ENTREE DETECTEE
        [REQUETE] : SOUMISSIONS OUVERTES
        ----------------------------------\`\`\`
        **Cible localisée :**
        🔗 [Accéder au bloc de répliques du jour](${lienMission})

        **Fonctions système disponibles :**
        > \`/trad\`    : Transférer vos propositions dans la base de données.
        > \`/context\` : Extraire le script environnant et l'analyse de la situation.
        > (les autres commandes sont détaillées dans le message épinglé sur ce salon)
        ${bonusMessage}
        *Bonne chance aux participants !*`;

            const tutoMsg = await discu_channel.send({ content: messageAnnonce });

            await db.query('UPDATE mission_actuelle SET mission_message_id = ? WHERE id = 1', [missionMsg.id]);

            console.log("✅ [CRON] Mission de minuit déployée avec succès.");

        } catch (error) { console.error("❌ Erreur lors du Cron de minuit :", error); }

        try { await updateRanking(client);
        } catch (errTop) { console.error("[XP-DEBUG] ❌ Erreur classement :", errTop.message); }
    } else {
        const targetChannel = await client.channels.fetch(SALON_READONLY_ID);
        const [missions] = await db.query(`SELECT sheet_id, ligne FROM mission_actuelle WHERE id = 1`);
        const mission = missions[0];
        const [propositions] = await db.query(`SELECT message_id FROM propositions WHERE (sheet_id, ligne) = (?, ?)`, [mission.sheet_id, mission.ligne]);
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('upvote').setStyle(ButtonStyle.Success).setLabel('👍')
        );

        for (const proposition of propositions) {
            try {
                const message = await targetChannel.messages.fetch(proposition.message_id);
                await message.edit({ components: [row] });
            } catch (e) { console.error("❌ Erreur à l'ajout des boutons de vote:", e) }
        }

        await discu_channel.send({ content: "**Les votes sont ouverts !**" });
        await db.query(`UPDATE mission_actuelle SET voting = TRUE WHERE id = 1`);
    }
}, {
    timezone: "Europe/Paris"
});

cron.schedule('0 22 * * *', async () => {
    const [voting_rows] = await db.query(`SELECT voting FROM mission_actuelle WHERE id = 1`);
    const voting = voting_rows[0]?.voting;
    if (voting) {
        try { const resultat = await cloreLeVoteActuel(client);
        } catch (error) { console.error("❌ Erreur lors de la clôture de 22h :", error); }
    }
}, { timezone: "Europe/Paris" });
