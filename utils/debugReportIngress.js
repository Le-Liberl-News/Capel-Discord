const {
    applySheetUpdate,
    publishDebugReport,
    validateDebugReport,
    validateSheetUpdateRequest
} = require('./debugReportService');
const { WebhookClient } = require('discord.js');
const sheetManager = require('./sheetManager');

const REPORT_FILE_NAME = 'report.json';
const SHEET_UPDATE_FILE_NAME = 'sheet-update.json';
const SHEET_CONTEXT_FILE_NAME = 'sheet-context.json';
const SCREENSHOT_FILE_NAME = 'capture.png';
const MAX_REPORT_BYTES = 64 * 1024;
const MAX_SCREENSHOT_BYTES = 12 * 1024 * 1024;
const COMPLETED_REACTION = '✅';
const REPORT_MARKER = 'LIBERLNEWS_DEBUG_REPORT_V1';
const SHEET_UPDATE_MARKER = 'LIBERLNEWS_SHEET_UPDATE_V1';
const SHEET_CONTEXT_MARKER = 'LIBERLNEWS_SHEET_CONTEXT_V1';
const SHEET_CONTEXT_RESULT_MARKER = 'LIBERLNEWS_SHEET_CONTEXT_RESULT_V1';
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

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

    const response = await fetch(attachment.url, { signal: AbortSignal.timeout(30_000) });
    if (!response.ok) {
        throw new Error(`Téléchargement de ${attachment.name} impossible (HTTP ${response.status}).`);
    }
    const data = Buffer.from(await response.arrayBuffer());
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
    ingressWebhookUrl
}) {
    const processing = new Set();
    const ingressWebhook = ingressWebhookUrl ? new WebhookClient({ url: ingressWebhookUrl }) : null;

    function enabled() {
        return Boolean(ingressChannelId && ingressWebhookId);
    }

    function accepts(message) {
        return enabled()
            && message.channelId === ingressChannelId
            && message.webhookId === ingressWebhookId
            && [REPORT_MARKER, SHEET_UPDATE_MARKER, SHEET_CONTEXT_MARKER].includes(message.content);
    }

    async function processDebugReport(message) {
        if (message.attachments.size !== 2) {
            throw new Error('Un signalement doit contenir exactement deux pièces jointes.');
        }
        const reportAttachment = findAttachment(message, REPORT_FILE_NAME);
        const screenshotAttachment = findAttachment(message, SCREENSHOT_FILE_NAME);
        if (!reportAttachment || !screenshotAttachment) {
            throw new Error('Le message doit contenir report.json et capture.png.');
        }

        const [reportBuffer, screenshotBuffer] = await Promise.all([
            downloadAttachment(reportAttachment, MAX_REPORT_BYTES),
            downloadAttachment(screenshotAttachment, MAX_SCREENSHOT_BYTES)
        ]);
        if (!screenshotBuffer.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
            throw new Error('La pièce jointe capture.png n’est pas un fichier PNG valide.');
        }
        let rawReport;
        try {
            rawReport = JSON.parse(reportBuffer.toString('utf8'));
        } catch {
            throw new Error('Le fichier report.json ne contient pas un JSON valide.');
        }
        const report = validateDebugReport(rawReport);
        await publishDebugReport({
            client,
            sheets,
            tableId,
            destinationChannelId,
            report,
            screenshot: { data: screenshotBuffer, name: SCREENSHOT_FILE_NAME }
        });
        return report.clientReportId;
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

    async function processSheetContext(message) {
        if (!ingressWebhook) {
            throw new Error('DEBUG_INGRESS_WEBHOOK_URL est absent du serveur.');
        }
        if (message.attachments.size !== 1) {
            throw new Error('Une demande de contexte doit contenir uniquement sheet-context.json.');
        }
        const attachment = findAttachment(message, SHEET_CONTEXT_FILE_NAME);
        if (!attachment) throw new Error('Le fichier sheet-context.json est absent.');
        const buffer = await downloadAttachment(attachment, MAX_REPORT_BYTES);
        let query;
        try {
            query = JSON.parse(buffer.toString('utf8'));
        } catch {
            throw new Error('Le fichier sheet-context.json ne contient pas un JSON valide.');
        }
        if (query.schema !== 1 || typeof query.script !== 'string' ||
            typeof query.dialogue !== 'string' || typeof query.clientRequestId !== 'string') {
            throw new Error('La demande de contexte est invalide.');
        }
        const baseName = query.script.replace(/\.[^/.]+$/, '');
        const context = await sheetManager.findDialogueContext(
            sheets, tableId, baseName, query.dialogue
        );
        const result = context
            ? {
                schema: 1,
                status: 'ready',
                japanese: context.japanese.slice(0, 450),
                english: context.english.slice(0, 450),
                sheetUrl: context.sheetUrl,
                line: context.line
            }
            : { schema: 1, status: 'not_found', message: 'Réplique exacte introuvable dans Sheets.' };
        const encoded = Buffer.from(JSON.stringify(result), 'utf8').toString('base64');
        await ingressWebhook.editMessage(message.id, {
            content: `${SHEET_CONTEXT_RESULT_MARKER}\n${encoded}`,
            attachments: []
        });
        console.log(`[Debug ingress] Contexte ${query.clientRequestId} traité.`);
        return query.clientRequestId;
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

            if (message.content === SHEET_CONTEXT_MARKER) {
                await processSheetContext(message);
                return true;
            }
            const requestId = message.content === REPORT_MARKER
                ? await processDebugReport(message)
                : await processSheetUpdate(message);

            await message.react(COMPLETED_REACTION);
            await message.delete();
            console.log(`[Debug ingress] Message ${requestId} traité.`);
            return true;
        } catch (error) {
            console.error(`[Debug ingress] Message ${message.id} rejeté :`, error);
            if (message.content === SHEET_CONTEXT_MARKER && ingressWebhook) {
                const result = Buffer.from(JSON.stringify({
                    schema: 1,
                    status: 'failed',
                    message: error.message
                }), 'utf8').toString('base64');
                await ingressWebhook.editMessage(message.id, {
                    content: `${SHEET_CONTEXT_RESULT_MARKER}\n${result}`,
                    attachments: []
                }).catch(() => {});
                return false;
            }
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
            console.log('[Debug ingress] Désactivé : DEBUG_INGRESS_CHANNEL_ID ou DEBUG_INGRESS_WEBHOOK_ID absent.');
            return;
        }

        const channel = await client.channels.fetch(ingressChannelId);
        if (!channel || !channel.isTextBased() || !channel.messages) {
            throw new Error('Le salon DEBUG_INGRESS_CHANNEL_ID est invalide ou inaccessible.');
        }

        let before;
        do {
            const batch = await channel.messages.fetch({ limit: 100, before });
            if (batch.size === 0) break;
            const ordered = [...batch.values()].reverse();
            for (const message of ordered) {
                await processMessage(message);
            }
            before = batch.last().id;
        } while (before);
    }

    return { accepts, processMessage, scanPendingMessages };
}

module.exports = { createDebugReportIngress };
