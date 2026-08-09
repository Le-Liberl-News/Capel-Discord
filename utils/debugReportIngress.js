const { publishDebugReport, validateDebugReport } = require('./debugReportService');

const REPORT_FILE_NAME = 'report.json';
const SCREENSHOT_FILE_NAME = 'capture.png';
const MAX_REPORT_BYTES = 64 * 1024;
const MAX_SCREENSHOT_BYTES = 12 * 1024 * 1024;
const COMPLETED_REACTION = '✅';
const REPORT_MARKER = 'LIBERLNEWS_DEBUG_REPORT_V1';
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
    ingressWebhookId
}) {
    const processing = new Set();

    function enabled() {
        return Boolean(ingressChannelId && ingressWebhookId);
    }

    function accepts(message) {
        return enabled()
            && message.channelId === ingressChannelId
            && message.webhookId === ingressWebhookId
            && message.content === REPORT_MARKER;
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

            await message.react(COMPLETED_REACTION);
            await message.delete();
            console.log(`[Debug ingress] Rapport ${report.clientReportId} traité.`);
            return true;
        } catch (error) {
            console.error(`[Debug ingress] Message ${message.id} rejeté :`, error);
            await message.reply({
                content: `❌ Rapport non traité : ${error.message}`,
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
