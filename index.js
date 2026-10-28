require('./utils/runtimeDiagnostics').install();
require('dotenv').config();
const { Client, GatewayIntentBits, Partials, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient, ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { google } = require('googleapis');

const db = require('./utils/db.js');
const cron = require('node-cron');
const { declencherNouvelleMission, enregistrerMission, cloreLeVoteActuel, genererMessageRecap } = require('./utils/missionLogic.js');
const { verifierSalonPublication } = require('./utils/discordPublication.js');

const SALON_VOTE_ID = "1492972991418732685";
const SALON_READONLY_ID = "1493171302624657428";

const handleSelectMenus = require('./handlers/selectMenus.js');
const handleButtons = require('./handlers/buttons.js');
const handleModals = require('./handlers/modals.js');
const handleSlashCommands = require('./handlers/slashCommands.js')

const cleanup = require('./utils/cleanup.js');
const { ajouterXP } = require('./utils/xpManager');
const { miseAJourQuotidienne } = require('./utils/rankings.js')
const { createDebugReportIngress } = require('./utils/debugReportIngress.js');
const { legacyHttpReport, publishDebugReport } = require('./utils/debugReportService.js');
const { createPatchReleaseService } = require('./utils/patchReleaseService.js');
const { createTesterPresenceService } = require('./utils/testerPresenceService.js');
const { state, saveState } = require('./rpg/joueurs.js');
const { defendreLeLiberl } = require('./rpg/defenseLiberl.js');
const KEY_FILE = './credentials.json';
const TABLE_ID = '1U3A84MvYYfhdDkJ8Oc8nxFJKlyeS0-Xk_7fl_SLBGYo';
const REPORT_DESTINATION_CHANNEL_ID = process.env.DEBUG_REPORT_DESTINATION_CHANNEL_ID ||
    '660891802517110817';
const TECHNICAL_INGRESS_CHANNEL_ID = process.env.DEBUG_INGRESS_CHANNEL_ID ||
    '889835278494203915';
// Seule la mission quotidienne utilise la table de Sky the 3rd. Les commandes
// de consultation/correction et les rapports restent branchés sur SC.
const DAILY_TABLE_ID = process.env.DAILY_TABLE_ID || '1JZm08gB7IdSR9cvdPCQ0G2t9ymI8nF45RwMQ0d7wWjY';
const DAILY_TABLE_GID = Number(process.env.DAILY_TABLE_GID || '824641947');

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel]
});
const debugReportIngress = createDebugReportIngress({
    client,
    sheets,
    tableId: TABLE_ID,
    destinationChannelId: REPORT_DESTINATION_CHANNEL_ID,
    ingressChannelId: TECHNICAL_INGRESS_CHANNEL_ID,
    ingressWebhookId: process.env.DEBUG_INGRESS_WEBHOOK_ID
});
const patchReleaseService = createPatchReleaseService({
    client,
    // The platform starts Patch2nd's build with its GitHub App: no GitHub token here.
    token: process.env.PLATFORM_TOKEN,
    channelId: process.env.PATCH_RELEASE_CHANNEL_ID,
});
const testerPresenceService = createTesterPresenceService({
    client,
    ingressChannelId: process.env.TESTER_PRESENCE_INGRESS_CHANNEL_ID ||
        process.env.DEBUG_INGRESS_CHANNEL_ID || process.env.TESTER_PROGRESS_CHANNEL_ID,
    ingressWebhookId: process.env.TESTER_PRESENCE_INGRESS_WEBHOOK_ID ||
        process.env.DEBUG_INGRESS_WEBHOOK_ID || process.env.TESTER_PROGRESS_WEBHOOK_ID,
    destinationChannelId: process.env.TESTER_PROGRESS_CHANNEL_ID ||
        process.env.PATCH_RELEASE_CHANNEL_ID,
    scanChannelIds: [
        TECHNICAL_INGRESS_CHANNEL_ID,
        REPORT_DESTINATION_CHANNEL_ID,
    ],
    statePath: require('path').join(__dirname, '.runtime', 'tester-presence.json'),
    onChapterCompleted: async ({ tester, chapter }) => {
        const channel = await client.channels.fetch(REPORT_DESTINATION_CHANNEL_ID);
        const name = tester.author || 'Anonyme';
        const label = chapter === 0 ? 'le prologue' : `le chapitre ${chapter}`;
        await channel.send({
            content: `**${name.replace(/([\\_*~`>|])/g, '\\$1')}** a fini ${label}.`,
            allowedMentions: { parse: [] },
        });
        await patchReleaseService.bumpPanel().catch(error =>
            console.error('[PatchSC release] Remontée du panneau impossible :', error));
    },
});

const { commands } = require('./utils/applicationCommands.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        await require('./utils/syncApplicationCommands.js').syncApplicationCommands(rest, commands);
        console.log('✅ Commandes synchronisées !');
    } catch (e) { console.error("Synchronisation des commandes impossible :", e.code ?? e.status ?? "erreur Discord"); }
})();

client.once('clientReady', async () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
    try {
        await debugReportIngress.scanPendingMessages();
    } catch (error) {
        console.error('[Debug ingress] Reprise des rapports impossible :', error);
    }
    try {
        await testerPresenceService.scanPendingMessages();
    } catch (error) {
        console.error('[Présence testeurs] Reprise des heartbeats impossible :', error);
    }
    try {
        await testerPresenceService.ensurePanel();
    } catch (error) {
        console.error('[Présence testeurs] Initialisation du panneau impossible :', error);
    }
    try {
        await patchReleaseService.ensurePanel();
    } catch (error) {
        console.error('[PatchSC release] Initialisation du panneau impossible :', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (await rhumertume.handle(interaction)) return;
    if (await adventure.handle(interaction)) return;
    if (interaction.isButton()) {
        if (await patchReleaseService.handleButton(interaction)) return;
        return handleButtons(interaction, sheets);
    }
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

const app = express();
app.get('/api/health', (req,res) => res.status(client.isReady()?200:503).json({ready:client.isReady(),serverTime:Date.now()}));
app.use(require('./utils/runtimeDiagnostics').middleware);
app.use(express.json({ limit: '16kb' }));
app.use('/img', express.static('./img'));
const upload = multer({ dest: 'uploads/' });

// Outil de screenshot ingame pour le debug, à partir d'ici'

app.post('/debug-screen', upload.single('screenshot'), async (req, res) => {
    try {
        if (!req.file) throw new Error('La capture PNG est absente.');
        const report = legacyHttpReport(req.body);
        const screenshot = await fs.promises.readFile(req.file.path);
        await publishDebugReport({
            client,
            sheets,
            tableId: TABLE_ID,
            destinationChannelId: REPORT_DESTINATION_CHANNEL_ID,
            report,
            media: { data: screenshot, name: 'capture.png' }
        });
        res.status(200).send('OK');
    } catch (error) {
        console.error("❌ Erreur Route :", error);
        res.status(500).send('Erreur interne.');
    } finally {
        if (req.file?.path) fs.promises.unlink(req.file.path).catch(() => {});
    }
});

// Preserve existing pom identities, with all automatic RP events disabled.
const rhumertume=require('./utils/rhumertume').createRhumertume({automaticEvents:false,store:require('./utils/stateStore').createStateStore(path.join(__dirname,'.runtime/rhumertume.json')),charactersOfTheDay:()=>require('./commands/anonyme').getAssignedCharacterNames(),characterNames:require('./utils/characters').characterNames,announce:async(text,files=[])=>{const channel=await client.channels.fetch(process.env.ROLEPLAY_ID);await channel.send({content:text,files,allowedMentions:{parse:[]}});},log:console.log});
// Halloween text adventure: invitation (and closing words) in channelId, played in DMs; every game started or won is
// told in test-discord (notifyChannelId), which stays when the invitation moves to another channel
const adventure=require('./utils/adventure/discord').createAdventureDiscord({client,archive:require('./utils/adventure/lineArchive').createLineArchive(path.join(__dirname,'.runtime/adventure-outbox')),data:require('./rpg/data/aventure.json'),store:require('./utils/stateStore').createStateStore(path.join(__dirname,'.runtime/aventure.json')),channelId:'889835278494203915',notifyChannelId:'889835278494203915'});
client.on('messageCreate',message=>{adventure.message(message);});
// the games followed and the hints sent from the platform's editor
require('./utils/adventure/platformSync').startAdventureSync({adventure,log:console.error});
try { require('./utils/adventure/web').registerAdventureWeb({app,adventure}); }
catch(error){console.error('Aventure navigateur indisponible:',error.code||error.message);app.post('/api/adventure/play',(req,res)=>res.status(503).json({error:'La passerelle de l’aventure est temporairement indisponible.'}));}
client.rhumertume=rhumertume;
// catches up the ranking's nightly update when midnight was missed (the bot down, Discord or the database failing)
client.once('clientReady',()=>{const rattraper=()=>miseAJourQuotidienne(client).catch(e=>console.error('Classement :',e));setTimeout(rattraper,60000);setInterval(rattraper,15*60000);});

const cooldownsXP = new Map();

client.on('messageCreate', message => {
    if (testerPresenceService.acceptsMessage(message)) {
        void testerPresenceService.processMessage(message);
        return;
    }
    patchReleaseService.schedulePanelBump(message);
    if (debugReportIngress.accepts(message)) {
        void debugReportIngress.processMessage(message);
    }
});

client.on('messageCreate', async message => {
    if (!message.guild || message.author.bot) return;

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
        // the rhumertume: the pom's words in place of the text, its name and avatar
        const malade = message.channelId === roleplayId ? await rhumertume.message(pseudo, texte) : null;
        if (malade) { payload.content = malade.content; payload.username = malade.username; payload.avatarURL = malade.avatarURL; }
        if (fichiersTelecharges.length > 0) payload.files = fichiersTelecharges;
        if (message.channelId === threadId) payload.threadId = threadId;
        await webhook.send( payload );
        await defendreLeLiberl({ channel: message.channel, pseudo, texte, state, saveState, databasePersos });

    } catch (e) { console.error("Erreur envoi anonymisé :", e); }
});


app.listen(3000, () => {
    console.log('📡 Serveur de capture DLL actif sur http://localhost:3000');
});


cron.schedule('0 0 * * *', async () => {
    // the ranking's picture of the day, and the board, missions or not
    await miseAJourQuotidienne(client);
    // from October 31 on, everyone keeps the character they have (a mini-game will decide later)
    if (require('./utils/rhumertume').parisParts(Date.now()).date < '2026-10-31') await db.query('DELETE FROM pseudos_anonymes');
    const discu_channel = await client.channels.fetch(SALON_VOTE_ID);
    const [voting_rows] = await db.query(`SELECT voting FROM mission_actuelle WHERE id = 1`);
    const voting = voting_rows[0]?.voting;
    if (voting) {
        try {
            console.log("🕒 [CRON] Lancement de la mission de minuit...");

            const channel = await client.channels.fetch(SALON_READONLY_ID);
            verifierSalonPublication(discu_channel, client, { attachmentOptional: true });
            const permissionsMission = verifierSalonPublication(channel, client, { attachmentOptional: true });
            const result = await declencherNouvelleMission(
                sheets,
                DAILY_TABLE_ID,
                SALON_READONLY_ID,
                { discoverSheets: true, sheetGid: DAILY_TABLE_GID }
            );
            const capelAvatar = new AttachmentBuilder('./capel.gif');

            if (typeof result === 'string') { return channel.send(result); }

            if (permissionsMission.peutJoindre) {
                await channel.send({ files: [capelAvatar] });
            } else {
                console.warn(`[PERMISSIONS] capel.gif ignoré : permission Joindre des fichiers absente dans ${SALON_READONLY_ID}.`);
            }
            const missionMsg = await channel.send({ content: result.principal });

            const lienMission = `https://discord.com/channels/${process.env.GUILD_ID}/${SALON_READONLY_ID}/${missionMsg.id}`;
            const bonus = (result.mission.multiplicateur - 1) * 100;
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

            await enregistrerMission(result.mission, missionMsg.id);

            console.log("✅ [CRON] Mission de minuit déployée avec succès.");

        } catch (error) { console.error("❌ Erreur lors du Cron de minuit :", error); }

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

cron.schedule('0 3 * * *', async () => {
    try {
        const result = await patchReleaseService.requestRelease();
        console.log(result.alreadyRunning
            ? '[PatchSC release] La publication quotidienne est déjà en cours.'
            : '[PatchSC release] Publication quotidienne de 3 h déclenchée.');
    } catch (error) {
        console.error('[PatchSC release] Échec du déclenchement quotidien de 3 h :', error);
    }
}, { timezone: 'Europe/Paris' });
