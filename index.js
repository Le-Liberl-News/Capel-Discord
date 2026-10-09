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

const { relancerAudioApresCrash } = require('./rpg/audioManager.js');

const cleanup = require('./utils/cleanup.js');
const { ajouterXP } = require('./utils/xpManager');
const { updateRanking } = require('./utils/rankings.js')
const { createDebugReportIngress } = require('./utils/debugReportIngress.js');
const { legacyHttpReport, publishDebugReport } = require('./utils/debugReportService.js');
const { createPatchReleaseService } = require('./utils/patchReleaseService.js');
const { createTesterPresenceService } = require('./utils/testerPresenceService.js');
const { state, saveState } = require('./rpg/gameState.js');
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
    token: process.env.PATCHSC_GITHUB_TOKEN,
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
    relancerAudioApresCrash(client, state);
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
    if (await require('./utils/activityEntry').handleActivityEntry(interaction)) return;
    if (await activiteDuels.handle(interaction)) return;
    if (await activitePropHunt.handle(interaction)) return;
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
app.use('/api/craft-capture', express.json({limit:'5mb'}));
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

// ---------------------------------------------------------------------------
// Activité Discord : carte isométrique (voir le dossier `activity/`).
// L'app Capel porte à la fois le bot et l'activité : mêmes identifiants OAuth.
// ---------------------------------------------------------------------------
const ACTIVITE_DOSSIER = path.join(__dirname, 'activity');
const ACTIVITE_ID = process.env.DISCORD_CLIENT_ID || process.env.CLIENT_ID || '';
const ACTIVITE_SECRET = process.env.DISCORD_CLIENT_SECRET || process.env.CLIENT_SECRET || '';
const { createActivityLobby } = require('./utils/activityLobby.js');
const huntGame = require('./utils/activityPropHuntGame').createPropHuntGame({store:require('./utils/activityStateStore').createActivityStateStore(path.join(__dirname,'.runtime/activity-prophunt.json'))});
const testCharacters=require("./utils/activityTestCharacters").createTestCharacters({characters:require("./activity/assets/sky/characters.json")});
const capelModel=require("./activity/assets/sky/capel.json");
const activityRoleplaySender=require("./utils/activityRoleplayDiscord").createRoleplayDiscordSender({client,WebhookClient,channelId:process.env.ACTIVITY_ROLEPLAY_ID || "1499373178483507210",webhookUrl:process.env.WEBHOOK_ROLEPLAY_URL,baseUrl:process.env.BASE_URL});
const activityArenaSender=require("./utils/activityRoleplayDiscord").createRoleplayDiscordSender({client,WebhookClient,channelId:"1558125759682576475",baseUrl:process.env.BASE_URL});
const activityRoleplay=require('./utils/activityRoleplay').createActivityRoleplay({
  send:async payload=>payload.map==="arena"?activityArenaSender(payload):activityRoleplaySender({...payload,threadId:payload.match?await activiteDuels.publicationThread(payload.match,client):undefined}),
  onError:error=>console.error('Activity roleplay publication failed:',error.code??'unavailable'),
});
const activityTavern=require("./utils/activityTavern").createActivityTavern({state,stats:require("./rpg/data/persos.json"),save:saveState,announce:activityRoleplaySender});
const activiteService = createActivityLobby({
    huntGame,
    tower:[1,2,3].map(floor=>{
      const root=path.join(__dirname,'activity/assets/sky/tower'+floor),grid=require(path.join(root,'navigation.json')),layout=require(path.join(root,'layout.json'));
      return {grid,layout,enemySpawns:layout.rooms.slice(1,-1).filter(p=>Math.hypot(p.x-grid.spawn.x,p.z-grid.spawn.z)>8).slice(0,4),
        geometry:require('./utils/activityGeometry').createActivityGeometry(JSON.parse(fs.readFileSync(path.join(root,'anterose.gltf'),'utf8')))};
    }),
    onDuelEnd:async event=>{activityRoleplay.finish(event);await activiteDuels.publishResult(event,client);},
    onDrink:event=>activityTavern.drink(event),
    onSay:require("./utils/activitySpeech").createActivitySpeech({relay:activityRoleplay,players:()=>state.players,matchFor:actor=>activiteService.matchFor(actor)}),
    onCraft:event=>activityRoleplay.craft({...event,match:activiteService.matchFor(event.actor)}),
    rolent: {
      grid: require('./activity/assets/sky/rolent/navigation.json'),
      residents: require('./activity/assets/sky/rolent/residents.json'),
      geometry: require('./utils/activityGeometry').createActivityGeometry(JSON.parse(require('fs').readFileSync(path.join(__dirname,'activity/assets/sky/rolent/anterose.gltf'),'utf8'))),
    },
    worldStores: {
      ...Object.fromEntries([1,2,3].map(floor=>["tower"+floor,require("./utils/activityStateStore").createActivityStateStore(path.join(__dirname,".runtime/activity-world-tower"+floor+"-v2.json"))])),
      rolent: require("./utils/activityStateStore").createActivityStateStore(path.join(__dirname,".runtime/activity-world-rolent.json")),
      anterose: require("./utils/activityStateStore").createActivityStateStore(path.join(__dirname,".runtime/activity-world-anterose.json")),
      arena: require("./utils/activityStateStore").createActivityStateStore(path.join(__dirname,".runtime/activity-world-arena.json")),
    },
    store: require("./utils/activityStateStore").createActivityStateStore(path.join(__dirname,".runtime/activity-duels.json")),
    arena: {
      combatEnabled: true,
      spectatorGrid: require("./activity/assets/sky/arena/spectator-navigation.json"),
      introDuration:9000,
      spawns: [{x:-1,y:0,z:3.25},{x:-1,y:0,z:-16.25}],
      grid: require('./activity/assets/sky/arena/navigation.json'),
      residents: require('./activity/assets/sky/arena/residents.json'),
      geometry: require('./utils/activityGeometry.js').createActivityGeometry(JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'activity/assets/sky/arena/anterose.gltf'), 'utf8'))),
    },
    grid: require("./activity/terminal-world.cjs").terminalNavigation(require("./activity/assets/sky/navigation.json"),capelModel),
    residents: require('./activity/assets/sky/residents.json'),
    geometry: require('./utils/activityGeometry.js').createActivityGeometry(JSON.parse(fs.readFileSync(path.join(__dirname,'activity/assets/sky/anterose.gltf'),'utf8')),[{...capelModel,model:JSON.parse(fs.readFileSync(path.join(__dirname,'activity/assets/sky/capel/model.gltf'),'utf8'))}]),
    resolveCharacter: userId => testCharacters.resolve(userId,require('./commands/anonyme.js').getPseudoAnonyme)
});
const activiteDuels = require('./utils/activityDuels.js').createActivityDuels({store:require("./utils/activityStateStore").createActivityStateStore(path.join(__dirname,".runtime/activity-invitations.json")),lobby:activiteService, resolveCharacter:require('./commands/anonyme.js').getPseudoAnonyme, resolveOpponent:require('./commands/anonyme.js').getIdFromPseudo, characterNames:require('./commands/anonyme.js').characterNames});
const activitePropHunt = require("./utils/activityPropHunt").createActivityPropHunt({client,lobby:activiteService,resolveCharacter:require("./commands/anonyme").getPseudoAnonyme});
const activiteTerminal = require("./utils/activityTerminal").createActivityTerminal({announceHunt:activitePropHunt.announce,huntStarted:activitePropHunt.started,testCharacters,lobby:activiteService,duels:activiteDuels,client,resolveCharacter:require("./commands/anonyme").getPseudoAnonyme,assignedCharacters:require("./commands/anonyme").getAssignedCharacterNames,terminal:require("./activity/assets/sky/capel.json")});
const activiteBearer = req => String(req.headers.authorization || '').replace(/^Bearer /, '');

app.post('/api/token', async (req, res) => {
    try {
        const corps = new URLSearchParams({
            client_id: ACTIVITE_ID,
            grant_type: 'authorization_code',
            code: String(req.body?.code ?? '')
        });
        if (req.body?.code_verifier) {
            corps.set('code_verifier', String(req.body.code_verifier));   // PKCE : pas de secret
        } else if (ACTIVITE_SECRET) {
            corps.set('client_secret', ACTIVITE_SECRET);
        } else {
            throw new Error('ni code_verifier (PKCE) ni client secret');
        }
        const reponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: corps
        });
        if (!reponse.ok) throw new Error(`Discord a refusé l'échange (${reponse.status})`);
        res.json(await reponse.json());
    } catch (erreur) {
        console.error("❌ Activité /api/token :", erreur.message);
        res.status(500).json({ erreur: erreur.message });
    }
});

app.post('/api/profile', async (req, res) => {
    try {
        const response = await fetch('https://discord.com/api/users/@me', {headers: {Authorization: 'Bearer ' + activiteBearer(req)}});
        if (!response.ok) return res.status([401,403].includes(response.status) ? 401 : response.status === 429 ? 429 : 502).json({erreur: [401,403].includes(response.status) ? 'Identification Discord requise.' : 'Connexion Discord temporairement indisponible.'});
        const user = await response.json();
        const channel = await client.channels.fetch(String(req.body?.channel || ''));
        if (channel?.guild) {
          if (channel.guild.id !== String(req.body?.guild || '')) return res.status(403).json({erreur:'Salon Discord invalide.'});
          const member = await channel.guild.members.fetch(user.id);
          if (!member || !channel.permissionsFor(member)?.has('ViewChannel')) return res.status(403).json({erreur:'Accès au salon refusé.'});
        } else if (!channel?.isDMBased?.() || channel.recipient?.id !== user.id) {
          return res.status(403).json({erreur:'Conversation privée invalide.'});
        }
        res.set('Cache-Control', 'no-store');
        res.json(await activiteService.join({id: user.id, channel: channel.id}));
    } catch (error) {
        const denied = [10003,10007,50001,50013].includes(error.code);
        res.status(denied ? 403 : 502).json({erreur: denied ? 'Impossible de rejoindre ce salon Discord.' : 'Connexion Discord temporairement indisponible.'});
    }
});
app.get('/api/state', async (req, res) => {
    try { res.set('Cache-Control', 'no-store');const token=activiteBearer(req);const state=await activiteService.state(token, undefined, Number(req.query.after));res.json({...state,requests:activiteDuels.pending(activiteService.identity(token).id)}); }
    catch(error){res.status(error.status || 500).json({erreur:error.message});}
});
app.post('/api/state', async (req, res) => {
    try { res.set('Cache-Control', 'no-store');const token=activiteBearer(req);const state=await activiteService.state(token, req.body, req.body?.after);res.json({...state,requests:activiteDuels.pending(activiteService.identity(token).id)}); }
    catch(error){res.status(error.status || 500).json({erreur:error.message});}
});
app.get('/api/terminal',async(req,res)=>{try{res.set('Cache-Control','no-store');res.json(await activiteTerminal.menu(activiteBearer(req)));}catch(error){res.status(error.status||500).json({erreur:error.status?error.message:"Capel temporairement indisponible."});}});
app.post('/api/terminal',async(req,res)=>{try{res.set('Cache-Control','no-store');res.json(await activiteTerminal.action(activiteBearer(req),req.body));}catch(error){res.status(error.status||400).json({erreur:error.status||error.constructor.name==='DuelError'?error.message:"Action temporairement indisponible."});}});
app.post('/api/craft-capture',async(req,res)=>{
  try{const {id}=activiteService.identity(activiteBearer(req));const replay=activiteService.duelCaptureFor(id);if(replay)activityRoleplay.finish(replay);res.set('Cache-Control','no-store');res.json(await activityRoleplay.capture(id,req.body));}
  catch(error){res.status(error.status||502).json({erreur:error.status?error.message:'Publication roleplay temporairement indisponible.'});}
});
app.use('/assets/sky', express.static(path.join(ACTIVITE_DOSSIER, 'assets', 'sky')));

function envoyerClientActivite(nomFichier, res) {
    fs.readFile(path.join(ACTIVITE_DOSSIER, nomFichier), (erreur, donnees) => {
        if (erreur) return res.status(404).send('introuvable');
        const estJs = nomFichier.endsWith('.js');
        res.set('Cache-Control', 'no-store');
        res.type(estJs ? 'application/javascript' : 'text/html');
        res.send(estJs
            ? donnees.toString('utf8').replaceAll('__CLIENT_ID__', ACTIVITE_ID)
            : donnees);
    });
}

app.get('/', (req, res) => envoyerClientActivite('index.html', res));
app.get('/bundle.js', (req, res) => envoyerClientActivite('bundle.js', res));

// Only messages whose author already has an avatar in this activity room are relayed.
client.on('messageCreate', message => {
    activiteService.captureMessage({id: message.id, channel: message.channelId, author: message.author.id, text: message.cleanContent ?? message.content, direct: Boolean(message.channel.isDMBased?.()), bot: message.author.bot, webhook: Boolean(message.webhookId)});
});

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
    await db.query('DELETE FROM pseudos_anonymes');
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
