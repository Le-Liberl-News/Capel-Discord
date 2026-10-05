const {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const sheetManager = require('./sheetManager');
const { prepareDebugVideo } = require('./debugVideo');

const MAX_AUTHOR_LENGTH = 100;
const MAX_SCRIPT_LENGTH = 128;
const MAX_DIALOGUE_LENGTH = 8000;
const MAX_COMMENT_LENGTH = 1000;
const MAX_PATCH_VERSION_LENGTH = 64;
const MAX_DLL_VERSION_LENGTH = 64;
const MAX_DIRECTX_VERSION_LENGTH = 16;
const MAX_SCENE_FILE_LENGTH = 128;
const MAX_MAP_NAME_LENGTH = 256;
const MAX_TRANSLATION_LENGTH = 8000;
const MAX_DISCORD_CONTENT_LENGTH = 2000;
// Sky SC's lines live on the translation platform (no more Google sheets):
// the overlay links them there, and a bug report looks its line up there.
const PLATFORM_URL = (process.env.PLATFORM_URL || 'https://leliberlnews.fr').replace(/\/+$/, '');
const PLATFORM_HOST = new URL(PLATFORM_URL).hostname;
const PLATFORM_PROJECT = process.env.DEBUG_REPORT_PROJECT || 'sky-sc';

function requireString(value, fieldName, maxLength, allowEmpty = false) {
    if (typeof value !== 'string') {
        throw new Error(`Le champ ${fieldName} doit être une chaîne.`);
    }

    const normalized = value.trim();
    if (!allowEmpty && normalized.length === 0) {
        throw new Error(`Le champ ${fieldName} est vide.`);
    }
    if (normalized.length > maxLength) {
        throw new Error(`Le champ ${fieldName} dépasse ${maxLength} caractères.`);
    }
    return normalized;
}

function nonNegativeInteger(value) {
    return Number.isSafeInteger(value) && value >= 0 ? value : 0;
}

function requireSheetUrl(value) {
    if (value === undefined || value === null || value === '') return '';
    const normalized = requireString(value, 'sheetUrl', 2048);
    let parsed;
    try {
        parsed = new URL(normalized);
    } catch {
        throw new Error('Le lien de la réplique est invalide.');
    }
    const platform = parsed.hostname === PLATFORM_HOST && parsed.pathname.startsWith('/plateforme/');
    const sheet = parsed.hostname === 'docs.google.com' &&
        /^\/spreadsheets\/d\/[a-zA-Z0-9_-]+(?:\/|$)/.test(parsed.pathname);
    if (parsed.protocol !== 'https:' || (!platform && !sheet)) {
        throw new Error('Le lien doit cibler la plateforme de traduction.');
    }
    return parsed.toString();
}

function isPlatformUrl(value) {
    try {
        return new URL(value).hostname === PLATFORM_HOST;
    } catch {
        return false;
    }
}

// The comparison of the overlay: spacing, the platform's {…} codes and the
// game's #…X codes do not tell two lines apart.
function normalizedLine(value) {
    return String(value || '')
        .replace(/[\u00a0\u2007\u2009\u200a\u202f]/g, ' ')
        .replace(/\{[^{}]{1,16}\}/g, '')
        .replace(/#\d*[ACFKPSVW]/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// The bubbles of a script (and its _N parts) whose French, English or
// Japanese is the reported line, from the platform's in-game API.
async function platformMatches(script, dialogue) {
    const api = new URL(`${PLATFORM_URL}/plateforme/api/ingame.php`);
    api.search = new URLSearchParams({ action: 'script', project: PLATFORM_PROJECT, script: script.toLowerCase() }).toString();
    const response = await fetch(api, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(15000) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
    const wanted = normalizedLine(dialogue);
    return (data.items || []).filter(item => [item.fr, item.en, item.jp].some(text => normalizedLine(text) === wanted));
}

function targetSheetUrl(baseUrl, line) {
    const parsed = new URL(baseUrl);
    const fragment = new URLSearchParams(parsed.hash.slice(1));
    fragment.set('range', `E${line}`);
    parsed.hash = fragment.toString();
    return parsed.toString();
}

function validateDebugReport(rawReport) {
    if (!rawReport || typeof rawReport !== 'object' || Array.isArray(rawReport)) {
        throw new Error('Le rapport JSON est invalide.');
    }
    if (rawReport.schema !== 1) {
        throw new Error(`Version de rapport non prise en charge : ${rawReport.schema}.`);
    }
    if (rawReport.sheetUpdate !== undefined) {
        throw new Error('Une modification Sheets doit utiliser le protocole dédié.');
    }

    return {
        schema: 1,
        author: requireString(rawReport.author || 'Anonyme', 'author', MAX_AUTHOR_LENGTH),
        script: requireString(rawReport.script || '', 'script', MAX_SCRIPT_LENGTH, true),
        dialogue: requireString(rawReport.dialogue || '', 'dialogue', MAX_DIALOGUE_LENGTH, true),
        sheetUrl: requireSheetUrl(rawReport.sheetUrl),
        comment: requireString(rawReport.comment || '', 'comment', MAX_COMMENT_LENGTH, true),
        patchVersion: requireString(
            rawReport.patchVersion || 'inconnue',
            'patchVersion',
            MAX_PATCH_VERSION_LENGTH
        ),
        dllVersion: requireString(
            rawReport.dllVersion || 'inconnue',
            'dllVersion',
            MAX_DLL_VERSION_LENGTH
        ),
        directXVersion: requireString(
            rawReport.directXVersion || 'inconnue',
            'directXVersion',
            MAX_DIRECTX_VERSION_LENGTH
        ),
        sceneFile: requireString(
            rawReport.sceneFile || '',
            'sceneFile',
            MAX_SCENE_FILE_LENGTH,
            true
        ),
        mapName: requireString(
            rawReport.mapName || '',
            'mapName',
            MAX_MAP_NAME_LENGTH,
            true
        ),
        chapter: nonNegativeInteger(rawReport.chapter),
        stage: nonNegativeInteger(rawReport.stage),
        stageCount: nonNegativeInteger(rawReport.stageCount),
        stageLabel: requireString(rawReport.stageLabel || '', 'stageLabel', 128, true),
        checkpoint: nonNegativeInteger(rawReport.checkpoint),
        checkpointCount: nonNegativeInteger(rawReport.checkpointCount),
        mediaType: rawReport.mediaType === 'video' ? 'video' : 'screenshot',
        durationMs: nonNegativeInteger(rawReport.durationMs),
        clientReportId: requireString(
            rawReport.clientReportId,
            'clientReportId',
            128
        )
    };
}

function validateSheetUpdateRequest(rawRequest) {
    if (!rawRequest || typeof rawRequest !== 'object' || Array.isArray(rawRequest)) {
        throw new Error('La demande de modification JSON est invalide.');
    }
    if (rawRequest.schema !== 1) {
        throw new Error(`Version de modification non prise en charge : ${rawRequest.schema}.`);
    }

    return {
        schema: 1,
        author: requireString(rawRequest.author || 'Anonyme', 'author', MAX_AUTHOR_LENGTH),
        script: requireString(rawRequest.script, 'script', MAX_SCRIPT_LENGTH),
        originalDialogue: requireString(rawRequest.originalDialogue, 'originalDialogue', MAX_DIALOGUE_LENGTH),
        replacement: requireString(rawRequest.replacement, 'replacement', MAX_TRANSLATION_LENGTH),
        clientRequestId: requireString(rawRequest.clientRequestId, 'clientRequestId', 128)
    };
}

function validateSheetAudit(rawAudit) {
    if (!rawAudit || typeof rawAudit !== 'object' || Array.isArray(rawAudit) ||
        rawAudit.schema !== 1) {
        throw new Error('Le journal de modification est invalide.');
    }
    return {
        schema: 1,
        author: requireString(rawAudit.author || 'Anonyme', 'author', MAX_AUTHOR_LENGTH),
        script: requireString(rawAudit.script, 'script', MAX_SCRIPT_LENGTH),
        sheetUrl: requireSheetUrl(rawAudit.sheetUrl),
        previous: requireString(rawAudit.previous || '', 'previous', MAX_TRANSLATION_LENGTH, true),
        replacement: requireString(rawAudit.replacement, 'replacement', MAX_TRANSLATION_LENGTH),
        clientRequestId: requireString(rawAudit.clientRequestId, 'clientRequestId', 128)
    };
}

function legacyHttpReport(body) {
    return validateDebugReport({
        schema: 1,
        author: body.auteur || 'Reporter Inconnu',
        script: body.fichier || '',
        dialogue: body.replique || '',
        comment: body.commentaire || '',
        clientReportId: `legacy-http-${Date.now()}`
    });
}

function truncateDiscordContent(content) {
    if (content.length <= MAX_DISCORD_CONTENT_LENGTH) return content;
    const suffix = '\n\n… Réplique tronquée dans ce message Discord.';
    return content.slice(0, MAX_DISCORD_CONTENT_LENGTH - suffix.length) + suffix;
}

async function publishDebugReport({
    client,
    sheets,
    tableId,
    destinationChannelId,
    report,
    media,
    save
}) {
    const validated = validateDebugReport(report);
    if (!media || !Buffer.isBuffer(media.data) || media.data.length === 0) {
        throw new Error('La capture du signalement est absente.');
    }
    const hasSave = Boolean(save && Buffer.isBuffer(save.data) && save.data.length > 0);

    const baseName = validated.script.replace(/\.[^/.]+$/, '');
    const hasDialogueContext = Boolean(baseName && validated.dialogue);
    let matches = [];
    let lookupError = '';
    if (hasDialogueContext) {
        try {
            matches = await platformMatches(baseName, validated.dialogue);
        } catch (error) {
            lookupError = error.message;
        }
    }
    const channel = await client.channels.fetch(destinationChannelId);
    if (!channel || !channel.isTextBased()) {
        throw new Error('Le salon de destination des signalements est introuvable.');
    }

    const attachmentData = validated.mediaType === 'video'
        ? await prepareDebugVideo(media.data) : media.data;
    const attachment = new AttachmentBuilder(attachmentData, {
        name: media.name || (validated.mediaType === 'video' ? 'capture.mp4' : 'capture.png')
    });
    // La sauvegarde accompagne le rapport : elle est republiee telle quelle pour
    // que le testeur la retrouve dans le post nettoye.
    const saveName = hasSave ? (save.name || 'save.sav') : null;
    const files = hasSave ? [attachment, new AttachmentBuilder(save.data, { name: saveName })] : [attachment];
    let content = validated.mediaType === 'video'
        ? `**Nouveau bug report vidéo**\n**Auteur :** ${validated.author}\n`
        : `**Nouveau bug report**\n**Auteur :** ${validated.author}\n`;
    content += `**Version de la DLL :** \`${validated.dllVersion}\`\n`;
    content += `**Version du patch FR :** \`${validated.patchVersion}\`\n`;
    content += `**Version DirectX :** \`${validated.directXVersion}\`\n`;
    if (baseName) content += `**Script :** \`${baseName}\`\n`;
    if (validated.sceneFile) content += `**Fichier scène :** \`${validated.sceneFile}\`\n`;
    if (validated.mapName) content += `**Map :** ${validated.mapName}\n`;
    if (validated.mediaType === 'video' && validated.durationMs) {
        content += `**Durée :** ${(validated.durationMs / 1000).toFixed(1)} s\n`;
    }
    if (saveName) content += `**Sauvegarde :** \`${saveName}\` (état du jeu au moment de l'envoi)\n`;
    if (validated.stageLabel) {
        content += `**Progression :** chapitre ${validated.chapter}, ` +
            `${validated.stageLabel} (${validated.stage + 1}/${validated.stageCount || '?'})\n`;
        content += `**Jalon global :** ${validated.checkpoint}/${validated.checkpointCount || '?'}\n`;
    }
    if (validated.dialogue) {
        content += `**Réplique :**\n> ${validated.dialogue.replace(/\n/g, '\n> ')}\n\n`;
    } else {
        content += '**Réplique :** aucune — signalement général\n\n';
    }
    if (validated.comment) {
        content += `**Commentaire :**\n> ${validated.comment.replace(/\n/g, '\n> ')}\n\n`;
    }
    const components = [];

    let dialogueUrl = validated.sheetUrl;
    if (!dialogueUrl && matches.length > 0) dialogueUrl = matches[0].url;

    if (matches.length > 0) {
        content += `✅ **Match exact trouvé (${matches.length} occurrence(s)) :**\n`;
        matches.slice(0, 10).forEach(match => {
            content += `- [\`${match.script}\` bulle ${match.ordinal}](${match.url})\n`;
        });
    } else if (hasDialogueContext) {
        content += lookupError
            ? `⚠️ **Recherche sur la plateforme impossible :** ${lookupError}\n`
            : '❌ **Aucun match exact trouvé.** (Réplique vide, tag caché ou erreur ?)\n';
        const scriptUrl = new URL(`${PLATFORM_URL}/plateforme/entries.php`);
        scriptUrl.search = new URLSearchParams({ project: PLATFORM_PROJECT, script: baseName.toLowerCase() }).toString();
        components.push(new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(`Ouvrir ${baseName} sur la plateforme`)
                .setStyle(ButtonStyle.Link)
                .setURL(scriptUrl.toString())
        ));
    }

    if (dialogueUrl) {
        components.push(new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(isPlatformUrl(dialogueUrl) ? 'Ouvrir la réplique sur la plateforme'
                    : 'Ouvrir la réplique dans Sheets')
                .setStyle(ButtonStyle.Link)
                .setURL(dialogueUrl)
        ));
    }

    return channel.send({
        content: truncateDiscordContent(content),
        files,
        components,
        allowedMentions: { parse: [] }
    });
}

function quotedPreview(value, maxLength = 500) {
    const normalized = value.length > maxLength
        ? `${value.slice(0, maxLength - 1)}…`
        : value;
    return normalized.replace(/\n/g, '\n> ');
}

async function applySheetUpdate({
    client,
    sheets,
    tableId,
    destinationChannelId,
    request
}) {
    const validated = validateSheetUpdateRequest(request);
    if (validated.originalDialogue === validated.replacement) {
        throw new Error('Le nouveau texte est identique au texte actuel.');
    }

    const baseName = validated.script.replace(/\.[^/.]+$/, '');
    const matches = await sheetManager.trouverOccurrencesBug(
        sheets,
        tableId,
        baseName,
        validated.originalDialogue
    );
    if (matches.length === 0) {
        throw new Error(`Aucune occurrence exacte trouvée pour le script ${baseName}.`);
    }

    const channel = await client.channels.fetch(destinationChannelId);
    if (!channel || !channel.isTextBased()) {
        throw new Error('Le salon de journalisation est introuvable.');
    }
    const updatedRows = await sheetManager.updateOccurrencesVerified(
        sheets,
        matches,
        validated.originalDialogue,
        validated.replacement
    );

    const locations = matches.slice(0, 10)
        .map(match => `- **${match.feuille}**, ligne ${match.ligne}`)
        .join('\n');
    let content = '📝 **Modification Sheets depuis le jeu**\n';
    content += `**Auteur :** ${validated.author}\n`;
    content += `**Script :** \`${baseName}\`\n`;
    content += `**Ancien texte :**\n> ${quotedPreview(validated.originalDialogue)}\n`;
    content += `**Nouveau texte :**\n> ${quotedPreview(validated.replacement)}\n`;
    content += `**Lignes modifiées :** ${updatedRows}\n${locations}`;

    return channel.send({
        content: truncateDiscordContent(content),
        allowedMentions: { parse: [] }
    });
}

async function publishSheetAudit({ client, destinationChannelId, audit }) {
    const validated = validateSheetAudit(audit);
    const channel = await client.channels.fetch(destinationChannelId);
    if (!channel || !channel.isTextBased()) {
        throw new Error('Le salon de journalisation est introuvable.');
    }
    const baseName = validated.script.replace(/\.[^/.]+$/, '');
    const onPlatform = isPlatformUrl(validated.sheetUrl);
    let content = onPlatform
        ? '📝 **Modification de la plateforme effectuée depuis le jeu**\n'
        : '📝 **Modification Sheets effectuée depuis le jeu**\n';
    content += `**Auteur :** ${validated.author}\n`;
    content += `**Script :** \`${baseName}\`\n`;
    content += `**Ancien texte :**\n> ${quotedPreview(validated.previous || '*vide*')}\n`;
    content += `**Nouveau texte :**\n> ${quotedPreview(validated.replacement)}`;
    const components = validated.sheetUrl
        ? [new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(onPlatform ? 'Ouvrir sur la plateforme' : 'Ouvrir la réplique dans Sheets')
                .setStyle(ButtonStyle.Link)
                .setURL(validated.sheetUrl)
        )]
        : [];
    await channel.send({
        content: truncateDiscordContent(content),
        components,
        allowedMentions: { parse: [] }
    });
    return validated;
}

module.exports = {
    normalizedLine,
    requireSheetUrl,
    applySheetUpdate,
    legacyHttpReport,
    publishDebugReport,
    publishSheetAudit,
    validateDebugReport,
    validateSheetUpdateRequest,
    validateSheetAudit
};
