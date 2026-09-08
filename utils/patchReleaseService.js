const https = require('https');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const OWNER = 'Le-Liberl-News';
const REPOSITORY = 'PatchSC';
const NIGHTLY_WORKFLOW = 'nightly-translation.yml';
const BUTTON_ID = 'patch_release_start';
const ACTIVE_STATUSES = new Set(['queued', 'in_progress', 'waiting', 'pending', 'requested']);
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const RETRYABLE_NETWORK_ERRORS = new Set([
    'EAI_AGAIN', 'ENETDOWN', 'ENETUNREACH', 'ENOTFOUND',
    'ECONNREFUSED', 'ECONNRESET', 'EHOSTUNREACH', 'ETIMEDOUT',
]);

class PatchReleaseService {
    constructor({ client, token, channelId }) {
        this.client = client;
        this.token = (token || '').trim();
        this.channelId = (channelId || '').trim();
        this.panelMessage = null;
        this.dispatching = false;
        this.monitorPromise = null;
        this.requestedBy = null;
        this.panelBumpTimer = null;
    }

    async github(method, path, body = null) {
        if (!this.token) throw new Error('PATCHSC_GITHUB_TOKEN est absent.');
        const attempts = 4;
        for (let attempt = 1; attempt <= attempts; attempt += 1) {
            try {
                return await this.githubRequest(method, path, body);
            } catch (error) {
                if (!RETRYABLE_NETWORK_ERRORS.has(error.code) || attempt === attempts) throw error;
                console.warn(
                    `[PatchSC release] GitHub inaccessible (${error.code}), ` +
                    `nouvelle tentative ${attempt}/${attempts - 1}.`);
                await delay(1_000 * (2 ** (attempt - 1)));
            }
        }
    }

    async githubRequest(method, path, body = null) {
        const payload = body === null ? null : Buffer.from(JSON.stringify(body), 'utf8');
        const options = {
            hostname: 'api.github.com', path, method,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${this.token}`,
                'User-Agent': 'Capel-PatchSC-Release',
                'X-GitHub-Api-Version': '2022-11-28',
            },
        };
        if (payload) {
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = payload.length;
        }
        return new Promise((resolve, reject) => {
            const request = https.request(options, response => {
                const chunks = [];
                response.on('data', chunk => chunks.push(chunk));
                response.on('end', () => {
                    const raw = Buffer.concat(chunks).toString('utf8');
                    let parsed = null;
                    if (raw) {
                        try { parsed = JSON.parse(raw); } catch { parsed = raw; }
                    }
                    if (response.statusCode < 200 || response.statusCode >= 300) {
                        const detail = parsed && parsed.message ? parsed.message : raw;
                        reject(new Error(`GitHub HTTP ${response.statusCode}${detail ? ` : ${detail}` : ''}`));
                        return;
                    }
                    resolve(parsed);
                });
            });
            request.on('error', reject);
            request.setTimeout(30_000, () => {
                const error = new Error('GitHub ne répond pas.');
                error.code = 'ETIMEDOUT';
                request.destroy(error);
            });
            if (payload) request.write(payload);
            request.end();
        });
    }

    async workflowRuns(workflow) {
        const result = await this.github('GET',
            `/repos/${OWNER}/${REPOSITORY}/actions/workflows/${workflow}/runs?branch=main&per_page=20`);
        return Array.isArray(result.workflow_runs) ? result.workflow_runs : [];
    }

    async activeRun() {
        const nightly = await this.workflowRuns(NIGHTLY_WORKFLOW);
        return nightly.map(run => ({ ...run, stage: 'publication' }))
            .filter(run => ACTIVE_STATUSES.has(run.status))
            .sort((left, right) => new Date(right.created_at) - new Date(left.created_at))[0] || null;
    }

    async latestRelease() {
        try {
            return await this.github('GET', `/repos/${OWNER}/${REPOSITORY}/releases/latest`);
        } catch (error) {
            if (String(error.message).includes('HTTP 404')) return null;
            throw error;
        }
    }

    panelPayload(state = {}) {
        const busy = Boolean(state.busy);
        const embed = new EmbedBuilder()
            .setTitle('Publication du patch français Sky SC')
            .setDescription(state.description ||
                'Récupère les traductions depuis Drive, vérifie leur réinjection, incrémente la version puis publie PatchSC.')
            .setColor(state.failed ? 0xC0392B : (busy ? 0xE67E22 : 0x2ECC71));
        if (state.url) embed.setURL(state.url);
        const button = new ButtonBuilder()
            .setCustomId(BUTTON_ID)
            .setLabel(busy ? 'Publication en cours…' : 'Générer une release')
            .setStyle(busy ? ButtonStyle.Secondary : ButtonStyle.Success)
            .setDisabled(busy || !this.token);
        return { embeds: [embed], components: [new ActionRowBuilder().addComponents(button)] };
    }

    async ensurePanel() {
        if (!this.channelId) {
            console.log('[PatchSC release] PATCH_RELEASE_CHANNEL_ID absent : panneau désactivé.');
            return null;
        }
        const channel = await this.client.channels.fetch(this.channelId);
        if (!channel || !channel.isTextBased()) {
            throw new Error(`Le salon PatchSC ${this.channelId} n'est pas un salon texte accessible.`);
        }
        const messages = await channel.messages.fetch({ limit: 100 });
        this.panelMessage = messages.find(message =>
            message.author.id === this.client.user.id && message.components.some(row =>
                row.components.some(component => component.customId === BUTTON_ID))) || null;
        const active = this.token ? await this.activeRun() : null;
        const payload = active ? this.panelPayload({
            busy: true,
            description: `Une ${active.stage} PatchSC est déjà en cours.`,
            url: active.html_url,
        }) : this.panelPayload();
        if (this.panelMessage) await this.panelMessage.edit(payload);
        else this.panelMessage = await channel.send(payload);
        if (active) this.startMonitor(active, null, null);
        return this.panelMessage;
    }

    async updatePanel(state) {
        if (!this.panelMessage) await this.ensurePanel();
        if (this.panelMessage) await this.panelMessage.edit(this.panelPayload(state));
    }

    schedulePanelBump(message) {
        if (!this.channelId || message.channelId !== this.channelId || !message.webhookId) return false;
        if (this.panelBumpTimer) clearTimeout(this.panelBumpTimer);
        this.panelBumpTimer = setTimeout(() => {
            this.panelBumpTimer = null;
            this.bumpPanel().catch(error =>
                console.error('[PatchSC release] Remontée du panneau impossible :', error));
        }, 2_000);
        return true;
    }

    async bumpPanel() {
        const channel = this.panelMessage?.channel || await this.client.channels.fetch(this.channelId);
        if (!channel || !channel.isTextBased()) return;
        const messages = await channel.messages.fetch({ limit: 100 });
        const panels = messages.filter(message =>
            message.author.id === this.client.user.id && message.components.some(row =>
                row.components.some(component => component.customId === BUTTON_ID)));
        for (const panel of panels.values()) {
            await panel.delete().catch(() => {});
        }
        this.panelMessage = null;
        const active = this.token ? await this.activeRun() : null;
        this.panelMessage = await channel.send(active ? this.panelPayload({
            busy: true,
            description: `Une ${active.stage} PatchSC est déjà en cours.`,
            url: active.html_url,
        }) : this.panelPayload());
        if (active) this.startMonitor(active, null, null);
    }

    async waitForRun(workflow, createdAfter, timeoutMs) {
        const deadline = Date.now() + timeoutMs;
        while (Date.now() < deadline) {
            const runs = await this.workflowRuns(workflow);
            const run = runs.find(candidate =>
                new Date(candidate.created_at).getTime() >= createdAfter - 10_000);
            if (run) return run;
            await delay(5_000);
        }
        return null;
    }

    async waitForCompletion(run, label) {
        let current = run;
        while (current.status !== 'completed') {
            const requester = this.requestedBy ? ` — demandée par <@${this.requestedBy}>` : '';
            await this.updatePanel({
                busy: true,
                description: `${label} en cours${requester}.`,
                url: current.html_url,
            });
            await delay(30_000);
            current = await this.github('GET',
                `/repos/${OWNER}/${REPOSITORY}/actions/runs/${current.id}`);
        }
        return current;
    }

    startMonitor(run, baselineReleaseId, requestedBy) {
        if (this.monitorPromise) return;
        this.requestedBy = requestedBy;
        this.monitorPromise = this.monitorPipeline(run, baselineReleaseId)
            .catch(async error => {
                console.error('[PatchSC release] Surveillance échouée :', error);
                await this.updatePanel({ failed: true, description: `Échec : ${error.message}` });
                if (this.requestedBy && this.panelMessage) await this.panelMessage.channel.send(
                    `❌ Publication PatchSC interrompue : ${error.message}`);
            })
            .finally(() => {
                this.monitorPromise = null;
                this.requestedBy = null;
            });
    }

    async monitorPipeline(initialRun, baselineReleaseId) {
        const run = await this.waitForCompletion(initialRun, 'Publication complète');
        if (run.conclusion !== 'success') {
            throw new Error(`la publication a échoué (${run.html_url})`);
        }
        const release = await this.latestRelease();
        if (!release || (baselineReleaseId && release.id === baselineReleaseId)) {
            await this.updatePanel({
                description: 'Vérification terminée : aucun fichier binaire n’a changé, aucune release créée.',
            });
            if (this.requestedBy && this.panelMessage) await this.panelMessage.channel.send(
                'ℹ️ PatchSC vérifié : aucun changement à publier.');
            return;
        }
        await this.finishSuccess(release);
    }

    async finishSuccess(release) {
        await this.bumpPanel();
    }

    async requestRelease(requestedBy = null) {
        if (this.dispatching) {
            throw new Error('Une demande de publication est déjà en cours de traitement.');
        }
        this.dispatching = true;
        try {
            if (!this.token) throw new Error('Le token GitHub PatchSC n’est pas configuré sur Capel.');
            const active = await this.activeRun();
            if (active) {
                await this.updatePanel({
                    busy: true,
                    description: `Une ${active.stage} PatchSC est déjà en cours.`,
                    url: active.html_url,
                });
                this.startMonitor(active, null, requestedBy);
                return { alreadyRunning: true, run: active };
            }
            const baseline = await this.latestRelease();
            const requestedAt = Date.now();
            await this.github('POST',
                `/repos/${OWNER}/${REPOSITORY}/actions/workflows/${NIGHTLY_WORKFLOW}/dispatches`,
                { ref: 'main', inputs: {
                    publish: 'true',
                    notify_discord: requestedBy ? 'true' : 'false',
                } });
            await this.updatePanel({
                busy: true,
                description: requestedBy
                    ? `Publication demandée par <@${requestedBy}>. Démarrage de la réinjection…`
                    : 'Publication quotidienne de 3 h demandée. Démarrage de la réinjection…',
            });
            const run = await this.waitForRun(NIGHTLY_WORKFLOW, requestedAt, 120_000);
            if (!run) throw new Error('GitHub a accepté la demande mais le workflow n’est pas apparu.');
            run.stage = 'publication';
            this.startMonitor(run, baseline ? baseline.id : null, requestedBy);
            return { alreadyRunning: false, run };
        } finally {
            this.dispatching = false;
        }
    }

    async handleButton(interaction) {
        if (interaction.customId !== BUTTON_ID) return false;
        await interaction.deferReply({ ephemeral: true });
        try {
            const result = await this.requestRelease(interaction.user.id);
            await interaction.editReply(result.alreadyRunning
                ? `Une publication est déjà en cours : ${result.run.html_url}`
                : '✅ Publication PatchSC demandée. Le bouton restera verrouillé jusqu’au résultat.');
            return true;
        } catch (error) {
            await this.updatePanel({ failed: true, description: `Impossible de démarrer : ${error.message}` });
            await interaction.editReply(`❌ ${error.message}`);
            return true;
        }
    }
}

module.exports = {
    createPatchReleaseService: options => new PatchReleaseService(options),
    PatchReleaseService,
    BUTTON_ID,
};
