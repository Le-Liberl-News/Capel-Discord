const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PRESENCE_MARKER = 'LIBERLNEWS_TESTER_PRESENCE_V1';

function clean(value, maximum) {
    return typeof value === 'string' ? value.trim().slice(0, maximum) : '';
}

class TesterPresenceService {
    constructor({ client, channelId, webhookId, offlineAfterMs = 90_000,
        statePath = '', onChapterCompleted = null }) {
        this.client = client;
        this.channelId = clean(channelId, 32);
        this.webhookId = clean(webhookId, 32);
        this.offlineAfterMs = offlineAfterMs;
        this.statePath = statePath;
        this.onChapterCompleted = onChapterCompleted;
        this.testers = new Map();
        this.highestChapters = new Map();
        this.notifiedChapters = new Map();
        this.panelMessage = null;
        this.refreshTimer = null;
        this.offlineTimer = null;
        this.loadState();
    }

    loadState() {
        if (!this.statePath) return;
        try {
            const saved = JSON.parse(fs.readFileSync(this.statePath, 'utf8'));
            for (const [installationId, chapter] of Object.entries(saved.highestChapters || {})) {
                if (UUID.test(installationId) && Number.isSafeInteger(chapter) && chapter >= 0) {
                    this.highestChapters.set(installationId.toLowerCase(), chapter);
                }
            }
            for (const [installationId, chapter] of Object.entries(saved.notifiedChapters || {})) {
                if (UUID.test(installationId) && Number.isSafeInteger(chapter) && chapter >= 0) {
                    this.notifiedChapters.set(installationId.toLowerCase(), chapter);
                }
            }
            for (const [installationId, chapter] of this.highestChapters) {
                if (!this.notifiedChapters.has(installationId)) {
                    this.notifiedChapters.set(installationId, chapter);
                }
            }
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error('[Présence testeurs] État local illisible :', error);
            }
        }
    }

    saveState() {
        if (!this.statePath) return;
        const directory = path.dirname(this.statePath);
        fs.mkdirSync(directory, { recursive: true });
        const temporary = `${this.statePath}.tmp`;
        fs.writeFileSync(temporary, JSON.stringify({
            highestChapters: Object.fromEntries(this.highestChapters),
            notifiedChapters: Object.fromEntries(this.notifiedChapters),
        }), 'utf8');
        fs.renameSync(temporary, this.statePath);
    }

    acceptsMessage(message) {
        return Boolean(this.channelId && this.webhookId) &&
            message.channelId === this.channelId &&
            message.webhookId === this.webhookId &&
            (message.content === PRESENCE_MARKER ||
                message.content.startsWith(`${PRESENCE_MARKER}\n`));
    }

    async processMessage(message) {
        if (!this.acceptsMessage(message)) return false;
        try {
            const separator = message.content.indexOf('\n');
            if (separator < 0) throw new Error('payload JSON absent');
            const result = this.receive(JSON.parse(message.content.slice(separator + 1)));
            await message.delete().catch(() => {});
            for (const chapter of result.completedChapters) {
                await this.onChapterCompleted?.({ tester: result.tester, chapter });
            }
            if (result.completedChapters.length) {
                this.notifiedChapters.set(result.tester.installationId, result.tester.chapter);
                this.saveState();
            }
            return true;
        } catch (error) {
            console.error(`[Présence testeurs] Message ${message.id} rejeté :`, error);
            await message.delete().catch(() => {});
            return false;
        }
    }

    receive(body, now = Date.now()) {
        const installationId = clean(body?.installationId, 64);
        if (!UUID.test(installationId)) throw new Error('installationId invalide.');
        const tester = {
            installationId: installationId.toLowerCase(),
            author: clean(body.author, 64),
            sceneFile: clean(body.sceneFile, 64),
            mapName: clean(body.mapName, 128),
            dllVersion: clean(body.dllVersion, 32),
            patchVersion: clean(body.patchVersion, 32),
            renderer: clean(body.renderer, 16),
            chapter: Math.max(0, Number.isSafeInteger(body.chapter) ? body.chapter : 0),
            stage: Math.max(0, Number.isSafeInteger(body.stage) ? body.stage : 0),
            stageCount: Math.max(0, Number.isSafeInteger(body.stageCount) ? body.stageCount : 0),
            stageLabel: clean(body.stageLabel, 128),
            checkpoint: Math.max(0, Number.isSafeInteger(body.checkpoint) ? body.checkpoint : 0),
            checkpointCount: Math.max(0,
                Number.isSafeInteger(body.checkpointCount) ? body.checkpointCount : 0),
            bubblesRead: Math.max(0, Number.isSafeInteger(body.bubblesRead) ? body.bubblesRead : 0),
            bubblesTotal: Math.max(0, Number.isSafeInteger(body.bubblesTotal) ? body.bubblesTotal : 0),
            lastSeen: now,
        };
        this.testers.set(tester.installationId, tester);
        const previousChapter = this.highestChapters.get(tester.installationId);
        const notifiedChapter = this.notifiedChapters.get(tester.installationId);
        const completedChapters = [];
        if (notifiedChapter !== undefined && tester.chapter > notifiedChapter) {
            for (let chapter = notifiedChapter; chapter < tester.chapter; chapter += 1) {
                completedChapters.push(chapter);
            }
        }
        if (previousChapter === undefined) {
            this.notifiedChapters.set(tester.installationId, tester.chapter);
        }
        if (previousChapter === undefined || tester.chapter > previousChapter) {
            this.highestChapters.set(tester.installationId, tester.chapter);
            this.saveState();
        }
        this.scheduleRefresh();
        if (this.offlineTimer) clearTimeout(this.offlineTimer);
        this.offlineTimer = setTimeout(() => {
            this.offlineTimer = null;
            this.scheduleRefresh();
        }, this.offlineAfterMs + 250);
        this.offlineTimer.unref?.();
        return { tester, completedChapters };
    }

    displayRows(now = Date.now()) {
        const rows = [...this.testers.values()].sort((a, b) =>
            (a.author || '').localeCompare(b.author || '', 'fr') ||
            a.installationId.localeCompare(b.installationId));
        const counts = new Map();
        for (const row of rows) {
            const base = row.author || 'Anonyme';
            counts.set(base, (counts.get(base) || 0) + 1);
        }
        const indexes = new Map();
        return rows.map(row => {
            const base = row.author || 'Anonyme';
            const index = (indexes.get(base) || 0) + 1;
            indexes.set(base, index);
            const name = counts.get(base) > 1 ? `${base} #${index}` : base;
            const online = now - row.lastSeen <= this.offlineAfterMs;
            const location = row.mapName || row.sceneFile || 'Zone inconnue';
            return { ...row, name, online, location };
        });
    }

    payload(now = Date.now()) {
        const rows = this.displayRows(now);
        const lines = [];
        let displayed = 0;
        for (const row of rows) {
            const total = row.bubblesTotal;
            const read = Math.min(row.bubblesRead, total || row.bubblesRead);
            const filled = total ? Math.round((read / total) * 10) : 0;
            const story = row.stageLabel
                ? `Chapitre ${row.chapter} - ${row.stageLabel} (${row.stage + 1}/${row.stageCount || '?'})\n`
                : '';
            const storyFilled = row.checkpointCount
                ? Math.round((Math.min(row.checkpoint, row.checkpointCount) /
                    row.checkpointCount) * 10)
                : 0;
            const storyBar = row.stageLabel
                ? `Scénario \`${'█'.repeat(storyFilled)}${'░'.repeat(10 - storyFilled)}\` ` +
                    `${row.checkpoint}/${row.checkpointCount || '?'}\n`
                : '';
            const bar = `${'█'.repeat(filled)}${'░'.repeat(10 - filled)}`;
            const line = `${row.online ? '🟢' : '⚫'} **${row.name}** — ${row.location}\n` +
                story + storyBar + `Bulles \`${bar}\` ${read}/${total || '?'}`;
            if (lines.join('\n').length + line.length + 40 > 4_000) break;
            lines.push(line);
            displayed += 1;
        }
        if (rows.length > displayed) lines.push(`… et ${rows.length - displayed} autre(s).`);
        return {
            embeds: [new EmbedBuilder()
                .setTitle('Avancée des testeurs')
                .setDescription(lines.length ? lines.join('\n') : 'Aucun testeur enregistré.')
                .setColor(rows.some(row => row.online) ? 0x2ECC71 : 0x7F8C8D)],
        };
    }

    async ensurePanel() {
        if (!this.channelId) return null;
        const channel = await this.client.channels.fetch(this.channelId);
        if (!channel?.isTextBased()) throw new Error('Salon de suivi des testeurs inaccessible.');
        if (!this.panelMessage) {
            const messages = await channel.messages.fetch({ limit: 100 });
            this.panelMessage = messages.find(message =>
                message.author.id === this.client.user.id &&
                message.embeds[0]?.title === 'Avancée des testeurs') || null;
        }
        if (this.panelMessage) await this.panelMessage.edit(this.payload());
        else this.panelMessage = await channel.send(this.payload());
        return this.panelMessage;
    }

    async bumpPanel() {
        if (!this.channelId) return null;
        const channel = this.panelMessage?.channel || await this.client.channels.fetch(this.channelId);
        if (!channel?.isTextBased()) return null;
        if (this.panelMessage) await this.panelMessage.delete().catch(() => {});
        this.panelMessage = await channel.send(this.payload());
        return this.panelMessage;
    }

    scheduleRefresh() {
        if (this.refreshTimer) return;
        this.refreshTimer = setTimeout(() => {
            this.refreshTimer = null;
            this.ensurePanel().catch(error =>
                console.error('[Présence testeurs] Mise à jour Discord impossible :', error));
        }, 1_000);
        this.refreshTimer.unref?.();
    }
}

function createTesterPresenceService(options) {
    return new TesterPresenceService(options);
}

module.exports = { TesterPresenceService, createTesterPresenceService };
