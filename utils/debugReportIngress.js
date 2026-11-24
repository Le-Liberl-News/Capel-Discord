const {
    applySheetUpdate,
    publishDebugReport,
    publishSheetAudit,
    validateDebugReport,
    validateSheetUpdateRequest,
    validateSheetAudit
} = require('./debugReportService');

const REPORT_FILE_NAME = 'report.json';
const SHEET_UPDATE_FILE_NAME = 'sheet-update.json';
const SHEET_AUDIT_FILE_NAME = 'sheet-audit.json';
const SCREENSHOT_FILE_NAME = 'capture.png';
const VIDEO_FILE_NAME = 'capture.mp4';
// Sauvegarde du jeu jointe par la DLL au moment de l'envoi. Facultative :
// les rapports des anciennes versions n'en contiennent pas.
const SAVE_FILE_NAME = 'save.sav';
const MAX_REPORT_BYTES = 64 * 1024;
const MAX_SCREENSHOT_BYTES = 12 * 1024 * 1024;
const MAX_VIDEO_BYTES = 20 * 1000 * 1000;
const MAX_SAVE_BYTES = 1024 * 1024;
const COMPLETED_REACTION = '✅';
const REPORT_MARKER = 'LIBERLNEWS_DEBUG_REPORT_V1';
const VIDEO_REPORT_MARKER = 'LIBERLNEWS_VIDEO_REPORT_V1';
const SHEET_UPDATE_MARKER = 'LIBERLNEWS_SHEET_UPDATE_V1';
const SHEET_AUDIT_MARKER = 'LIBERLNEWS_SHEET_AUDIT_V1';
const LEGACY_SHEET_CONTEXT_MARKER = 'LIBERLNEWS_SHEET_CONTEXT_V1';
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function isMp4(buffer) {
    return buffer.length >= 12 && buffer.subarray(4, 8).toString('ascii') === 'ftyp';
}

function isDiscordAttachmentUrl(rawUrl) {
    try {
        const url = new URL(rawUrl);
        return url.protocol === 'https:' && [
            'cdn.discordapp.com',
            'media.discordapp.net'
        ].includes(url.hostname);
    } catch {
        return false;
    }
}

async function downloadAttachment(attachment, maxBytes) {
    if (!attachment || !isDiscordAttachmentUrl(attachment.url)) {
        throw new Error('URL de pièce jointe Discord invalide.');
    }
    if (attachment.size > maxBytes) {
        throw new Error(`La pièce jointe ${attachment.name} est trop volumineuse.`);
    }

    const response = await fetch(attachment.url, { signal: AbortSignal.timeout(30_000), redirect: 'error' });
    if (!response.ok) {
        throw new Error(`Téléchargement de ${attachment.name} impossible (HTTP ${response.status}).`);
    }
    const chunks = [];
    let total = 0;
    for await (const chunk of response.body) {
        total += chunk.length;
        if (total > maxBytes) throw new Error(`Taille de ${attachment.name} invalide.`);
        chunks.push(Buffer.from(chunk));
    }
    const data = Buffer.concat(chunks, total);
    if (data.length === 0 || data.length > maxBytes) {
        throw new Error(`Taille de ${attachment.name} invalide.`);
    }
    return data;
}

function findAttachment(message, expectedName) {
    return message.attachments.find(
        attachment => attachment.name?.toLowerCase() === expectedName
    );
}

function createDebugReportIngress({
    client,
    sheets,
    tableId,
    destinationChannelId,
    ingressChannelId,
    ingressWebhookId,
    // A report the platform already relayed (overlayInbox), sent again through the webhook.
    alreadyReceived = () => false
}) {
    const processing = new Set();

    function enabled() {
        return Boolean(ingressWebhookId);
    }

    function accepts(message) {
        const recognizedContent = message.content === SHEET_UPDATE_MARKER ||
            message.content === SHEET_AUDIT_MARKER ||
            message.content === LEGACY_SHEET_CONTEXT_MARKER ||
            message.content === REPORT_MARKER ||
            message.content.startsWith(`${REPORT_MARKER}\n`) ||
            message.content === VIDEO_REPORT_MARKER ||
            message.content.startsWith(`${VIDEO_REPORT_MARKER}\n`);
        return enabled()
            && message.webhookId === ingressWebhookId
            && recognizedContent;
    }

    async function processDebugReport(message) {
        const reportAttachment = findAttachment(message, REPORT_FILE_NAME);
        const videoReport = message.content === VIDEO_REPORT_MARKER ||
            message.content.startsWith(`${VIDEO_REPORT_MARKER}\n`);
        const mediaName = videoReport ? VIDEO_FILE_NAME : SCREENSHOT_FILE_NAME;
        const mediaAttachment = findAttachment(message, mediaName);
        const saveAttachment = findAttachment(message, SAVE_FILE_NAME);
        const expectedAttachments = saveAttachment ? 3 : 2;
        if (message.attachments.size !== expectedAttachments) {
            throw new Error('Un signalement doit contenir report.json, la capture et, au plus, save.sav.');
        }
        if (!reportAttachment || !mediaAttachment) {
            throw new Error(`Le message doit contenir report.json et ${mediaName}.`);
        }

        const [reportBuffer, mediaBuffer, saveBuffer] = await Promise.all([
            downloadAttachment(reportAttachment, MAX_REPORT_BYTES),
            downloadAttachment(mediaAttachment, videoReport ? MAX_VIDEO_BYTES : MAX_SCREENSHOT_BYTES),
            saveAttachment ? downloadAttachment(saveAttachment, MAX_SAVE_BYTES) : null
        ]);
        const kind = videoReport ? 'video' : 'screenshot';
        const files = { report: reportBuffer, media: mediaBuffer, save: saveBuffer };
        const { id } = check(kind, files);
        if (!alreadyReceived(id)) await publish(kind, files);
        return id;
    }

    /** The checked item of a report ('screenshot', 'video') or of a correction notice ('audit'). */
    function check(kind, files) {
        if (!['screenshot', 'video', 'audit'].includes(kind)) throw new Error('Type d’envoi inconnu.');
        if (!files.report || files.report.length > MAX_REPORT_BYTES) throw new Error('Le rapport est absent ou trop long.');
        let raw;
        try {
            raw = JSON.parse(files.report.toString('utf8'));
        } catch {
            throw new Error('Le rapport ne contient pas un JSON valide.');
        }
        if (kind === 'audit') {
            const audit = validateSheetAudit(raw);
            return { id: audit.clientRequestId, audit };
        }
        const videoReport = kind === 'video';
        if (!files.media || files.media.length > (videoReport ? MAX_VIDEO_BYTES : MAX_SCREENSHOT_BYTES)) {
            throw new Error('La capture est absente ou trop volumineuse.');
        }
        if (!videoReport && !files.media.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
            throw new Error('La pièce jointe capture.png n’est pas un fichier PNG valide.');
        }
        if (videoReport && !isMp4(files.media)) {
            throw new Error('La pièce jointe capture.mp4 n’est pas un fichier MP4 valide.');
        }
        const report = validateDebugReport(raw);
        if ((report.mediaType === 'video') !== videoReport) {
            throw new Error('Le type du rapport ne correspond pas à sa pièce jointe.');
        }
        return { id: report.clientReportId, report };
    }

    async function publish(kind, files) {
        const { report, audit } = check(kind, files);
        if (audit) {
            await publishSheetAudit({ client, destinationChannelId, audit });
            return;
        }
        await publishDebugReport({
            client,
            sheets,
            tableId,
            destinationChannelId,
            report,
            media: { data: files.media, name: kind === 'video' ? VIDEO_FILE_NAME : SCREENSHOT_FILE_NAME },
            save: files.save ? { data: files.save, name: SAVE_FILE_NAME } : null
        });
    }

    async function processSheetUpdate(message) {
        if (message.attachments.size !== 1) {
            throw new Error('Une modification Sheets ne doit contenir que sheet-update.json.');
        }
        const requestAttachment = findAttachment(message, SHEET_UPDATE_FILE_NAME);
        if (!requestAttachment) {
            throw new Error('Le message doit contenir sheet-update.json.');
        }

        const requestBuffer = await downloadAttachment(requestAttachment, MAX_REPORT_BYTES);
        let rawRequest;
        try {
            rawRequest = JSON.parse(requestBuffer.toString('utf8'));
        } catch {
            throw new Error('Le fichier sheet-update.json ne contient pas un JSON valide.');
        }
        const request = validateSheetUpdateRequest(rawRequest);
        await applySheetUpdate({
            client,
            sheets,
            tableId,
            destinationChannelId,
            request
        });
        return request.clientRequestId;
    }

    async function processSheetAudit(message) {
        if (message.attachments.size !== 1) {
            throw new Error('Un journal Sheets doit contenir uniquement sheet-audit.json.');
        }
        const attachment = findAttachment(message, SHEET_AUDIT_FILE_NAME);
        if (!attachment) throw new Error('Le fichier sheet-audit.json est absent.');
        const files = { report: await downloadAttachment(attachment, MAX_REPORT_BYTES) };
        const { id } = check('audit', files);
        if (!alreadyReceived(id)) await publish('audit', files);
        return id;
    }

    async function processMessage(message) {
        if (!accepts(message) || processing.has(message.id)) return false;
        processing.add(message.id);

        try {
            const alreadyCompleted = message.reactions.cache.get(COMPLETED_REACTION)?.me;
            if (alreadyCompleted) {
                await message.delete().catch(() => {});
                return true;
            }
            if (message.content === LEGACY_SHEET_CONTEXT_MARKER) {
                await message.delete();
                console.log(`[Debug ingress] Ancienne demande de contexte ${message.id} supprimée.`);
                return true;
            }

            const requestId = message.content === REPORT_MARKER ||
                message.content.startsWith(`${REPORT_MARKER}\n`) ||
                message.content === VIDEO_REPORT_MARKER ||
                message.content.startsWith(`${VIDEO_REPORT_MARKER}\n`)
                ? await processDebugReport(message)
                : (message.content === SHEET_AUDIT_MARKER
                    ? await processSheetAudit(message)
                    : await processSheetUpdate(message));

            await message.react(COMPLETED_REACTION);
            await message.delete();
            console.log(`[Debug ingress] Message ${requestId} traité.`);
            return true;
        } catch (error) {
            console.error(`[Debug ingress] Message ${message.id} rejeté :`, error);
            await message.reply({
                content: `❌ Message non traité : ${error.message}`,
                allowedMentions: { parse: [] }
            }).catch(() => {});
            return false;
        } finally {
            processing.delete(message.id);
        }
    }

    async function scanPendingMessages() {
        if (!enabled()) {
            console.log('[Debug ingress] Désactivé : DEBUG_INGRESS_WEBHOOK_ID absent.');
            return;
        }
        const channelIds = [...new Set([ingressChannelId, destinationChannelId].filter(Boolean))];
        if (!channelIds.length) {
            console.log('[Debug ingress] Reprise au démarrage désactivée : aucun salon à parcourir.');
            return;
        }

        for (const channelId of channelIds) {
            const channel = await client.channels.fetch(channelId);
            if (!channel || !channel.isTextBased() || !channel.messages) {
                throw new Error(`Le salon d'entrée ${channelId} est invalide ou inaccessible.`);
            }

            // Le véritable salon d'entrée est parcouru en entier. Dans le salon
            // de sortie, les paquets bruts issus d'un déplacement récent du
            // webhook ne peuvent être que parmi les 100 derniers messages.
            const scanAll = channelId === ingressChannelId;
            let before;
            do {
                const batch = await channel.messages.fetch({ limit: 100, before });
                if (batch.size === 0) break;
                const ordered = [...batch.values()].reverse();
                for (const message of ordered) {
                    if (message.author.id === client.user.id &&
                        message.content === '❌ Message non traité : Le journal de modification Sheets est invalide.') {
                        await message.delete().catch(() => {});
                        continue;
                    }
                    await processMessage(message);
                }
                before = batch.last().id;
            } while (scanAll && before);
        }
    }

    return { accepts, processMessage, scanPendingMessages, check, publish };
}

module.exports = { createDebugReportIngress };
