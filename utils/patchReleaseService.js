const https = require('https');
const { escape: escapeExample } = require('./patchReleaseExamples');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

// Sky SC's patch is built from the translation platform by Patch2nd (build.yml):
// texts of the platform, compiled, published as a release only if a file changed.
// The platform starts and follows that build with its own GitHub App
// (plateforme/api/build.php): Capel only holds its platform token.
const PLATFORM_URL = new URL(process.env.PLATFORM_URL || 'https://leliberlnews.fr');
const PROJECTS = { 'sky-sc': 'Sky SC', 'sky-fc': 'Sky FC', 'sky-3rd': 'The 3rd' };
const NIGHTLY_WORKFLOW = 'build.yml';
const DAILY_REQUESTER = 'Capel (publication quotidienne)';
const BUTTON_ID = 'patch_release_start';
const ACTIVE_STATUSES = new Set(['queued', 'in_progress', 'waiting', 'pending', 'requested']);
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const RETRYABLE_NETWORK_ERRORS = new Set([
    'EAI_AGAIN', 'ENETDOWN', 'ENETUNREACH', 'ENOTFOUND',
    'ECONNREFUSED', 'ECONNRESET', 'EHOSTUNREACH', 'ETIMEDOUT',
]);

class PatchReleaseService {
    constructor({ client, token, channelId, project = 'sky-sc', statePath }) {
        if (!PROJECTS[project]) throw new Error('Projet de patch inconnu.');
        this.project = project;
        this.label = PROJECTS[project];
        this.buildApi = `/plateforme/api/build.php?project=${project}`;
        this.buttonId = project === 'sky-sc' ? BUTTON_ID : `${BUTTON_ID}_${project}`;
        this.statePath = statePath || require('path').join(__dirname, '..', '.runtime', `release-announcements-${project}.json`);
        this.announcementState = null;
        this.announcementQueue = Promise.resolve();
        this.polling = false;
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
        if (!this.token) throw new Error('PLATFORM_TOKEN est absent.');
        const attempts = 4;
        for (let attempt = 1; attempt <= attempts; attempt += 1) {
            try {
                return await this.githubRequest(method, path, body);
            } catch (error) {
                if (!RETRYABLE_NETWORK_ERRORS.has(error.code) || attempt === attempts) throw error;
                console.warn(
                    `[Patch release] Plateforme inaccessible (${error.code}), ` +
                    `nouvelle tentative ${attempt}/${attempts - 1}.`);
                await delay(1_000 * (2 ** (attempt - 1)));
            }
        }
    }

    async githubRequest(method, path, body = null) {
        const payload = body === null ? null : Buffer.from(JSON.stringify(body), 'utf8');
        const options = {
            hostname: PLATFORM_URL.hostname, port: PLATFORM_URL.port || undefined, path, method,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this.token}`,
                // Some hostings drop Authorization before PHP.
                'X-Platform-Token': this.token,
                'User-Agent': 'Capel-Patch-Release',
            },
        };
        if (payload) {
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = payload.length;
        }
        return new Promise((resolve, reject) => {
            const request = https.request(options, response => {
                const chunks = [];
                let bytes = 0;
                response.on('error', reject);
                response.on('data', chunk => {
                    bytes += chunk.length;
                    if (bytes > 16 * 1024 * 1024) {
                        response.destroy(new Error('Réponse de la plateforme trop volumineuse.'));
                        return;
                    }
                    chunks.push(chunk);
                });
                response.on('end', () => {
                    const raw = Buffer.concat(chunks).toString('utf8');
                    let parsed = null;
                    if (raw) {
                        try { parsed = JSON.parse(raw); } catch { parsed = raw; }
                    }
                    if (response.statusCode < 200 || response.statusCode >= 300) {
                        const detail = parsed && (parsed.error || parsed.message) ? (parsed.error || parsed.message) : raw;
                        reject(new Error(`Plateforme HTTP ${response.statusCode}${detail ? ` : ${String(detail).slice(0, 500)}` : ''}`));
                        return;
                    }
                    resolve(parsed);
                });
            });
            request.on('error', reject);
            request.setTimeout(30_000, () => {
                const error = new Error('La plateforme ne répond pas.');
                error.code = 'ETIMEDOUT';
                request.destroy(error);
            });
            if (payload) request.write(payload);
            request.end();
        });
    }

    // The build's latest runs, as GitHub names their fields.
    async workflowRuns() {
        const result = await this.github('GET', this.buildApi);
        return (Array.isArray(result.runs) ? result.runs : []).map(run => ({
            id: run.id, status: run.status, conclusion: run.conclusion || null,
            created_at: run.created_at, html_url: run.url,
        }));
    }

    async activeRun() {
        const nightly = await this.workflowRuns(NIGHTLY_WORKFLOW);
        return nightly.map(run => ({ ...run, stage: 'publication' }))
            .filter(run => ACTIVE_STATUSES.has(run.status))
            .sort((left, right) => new Date(right.created_at) - new Date(left.created_at))[0] || null;
    }

    // The newest patch release ("v…", not the backups), its tag as identity.
    async latestRelease() {
        const release = (await this.github('GET', this.buildApi)).release;
        return release ? {
            id: release.tag, tag_name: release.tag, name: release.name,
            html_url: release.url, body: release.body || '', created_at: release.date, prerelease: release.prerelease !== false,
        } : null;
    }

    panelPayload(state = {}) {
        const busy = Boolean(state.busy);
        const embed = new EmbedBuilder()
            .setTitle(`Publication du patch français ${this.label}`)
            .setDescription(state.description ||
                `Récupère les traductions de la plateforme et compile le patch ${this.label}.${this.project === 'sky-sc' ? '' : ' Déclenchement manuel uniquement.'}`)
            .setColor(state.failed ? 0xC0392B : (busy ? 0xE67E22 : 0x2ECC71));
        if (state.url) embed.setURL(state.url);
        const button = new ButtonBuilder()
            .setCustomId(this.buttonId)
            .setLabel(busy ? 'Publication en cours…' : 'Générer une release')
            .setStyle(busy ? ButtonStyle.Secondary : ButtonStyle.Success)
            .setDisabled(busy || !this.token);
        return { embeds: [embed], components: [new ActionRowBuilder().addComponents(button)] };
    }

    // Compilation is started on the platform; Discord only receives results.
    // Remove the obsolete button panels once at startup, preserving announcements.
    async ensurePanel() {
        if (!this.channelId) return null;
        const channel = await this.client.channels.fetch(this.channelId);
        if (!channel?.isTextBased()) return null;
        const messages = await channel.messages.fetch({ limit: 100 });
        for (const message of messages.values()) {
            if (message.author.id === this.client.user.id && message.components.some(row =>
                row.components.some(component => component.customId === this.buttonId))) {
                await message.delete();
            }
        }
        this.panelMessage = null;
        return null;
    }

    async updatePanel() {}
    schedulePanelBump() { return false; }
    async bumpPanel() {}

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
            current = (await this.workflowRuns()).find(candidate => candidate.id === current.id) || current;
        }
        return current;
    }

    startMonitor(run, baselineReleaseId, requestedBy) {
        if (this.monitorPromise) return;
        this.requestedBy = requestedBy;
        this.monitorPromise = this.monitorPipeline(run, baselineReleaseId)
            .catch(async error => {
                console.error('[Patch release] Surveillance échouée :', error);
                await this.updatePanel({ failed: true, description: `Échec : ${error.message}` });
                if (this.requestedBy && this.panelMessage) await this.panelMessage.channel.send(
                    `❌ Publication du patch ${this.label} interrompue : ${error.message}`);
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
                `ℹ️ Patch ${this.label} vérifié : aucun fichier n’a changé depuis la dernière release.`);
            return;
        }
        await this.finishSuccess(release);
    }

    // The release and what changed (its notes), as PatchSC's webhook announced it.
    async finishSuccess(release) {
        // The build monitor and passive release watcher may discover the same
        // publication simultaneously. Serialize and persist their shared receipt.
        const pending = this.announcementQueue.catch(() => {}).then(() => this.announceRelease(release));
        this.announcementQueue = pending;
        return pending;
    }

    releaseKey(release) {
        return `${release.tag_name}:${release.prerelease === false ? 'release' : 'test'}`;
    }

    async loadAnnouncementState() {
        if (this.announcementState) return;
        try {
            const saved = JSON.parse(await require('fs/promises').readFile(this.statePath, 'utf8'));
            if (saved.schema !== 1 || !Array.isArray(saved.seen) || saved.seen.length > 200) throw new Error('Invalid release state');
            this.announcementState = { schema: 1, seen: saved.seen, initialized: true };
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
            this.announcementState = { schema: 1, seen: [], initialized: false };
        }
    }

    async saveAnnouncementState() {
        const fs = require('fs/promises');
        await fs.mkdir(require('path').dirname(this.statePath), { recursive: true });
        const state = this.announcementState;
        state.seen = state.seen.slice(-200);
        await fs.writeFile(`${this.statePath}.tmp`, JSON.stringify(state), { mode: 0o600 });
        await fs.rename(`${this.statePath}.tmp`, this.statePath);
    }

    async announceRelease(release) {
        await this.loadAnnouncementState();
        const key = this.releaseKey(release);
        if (this.announcementState.seen.includes(key)) return;
        const channel = this.panelMessage?.channel || await this.client.channels.fetch(this.channelId);
        if (channel && channel.isTextBased()) {
            const report = new URL('/plateforme/release-changes.php', PLATFORM_URL);
            report.searchParams.set('project', this.project);
            const button = new ButtonBuilder().setLabel('Voir les changements').setStyle(ButtonStyle.Link).setURL(report.href);
            await channel.send({
                content: `**${escapeExample(release.name || release.tag_name)}** — ${release.prerelease === false ? 'Release' : 'Version de test'}\nLe détail des fichiers et des corrections est disponible sur la plateforme.`,
                components: [new ActionRowBuilder().addComponents(button)],
                allowedMentions: { parse: [] },
            });
            this.announcementState.seen.push(key);
            await this.saveAnnouncementState();
        }
        await this.bumpPanel();
    }

    /** Observe releases from Discord OR the platform. This never starts a build. */
    async checkReleaseUpdates() {
        if (!this.channelId || !this.token || this.polling) return;
        this.polling = true;
        try {
            const result = await this.github('GET', `${this.buildApi}&releases=1`);
            if (!Array.isArray(result.releases)) throw new Error('Historique de releases invalide.');
            const releases = result.releases.map(release => ({
                id: release.tag, tag_name: release.tag, name: release.name,
                html_url: release.url, body: release.body || '', created_at: release.date,
                prerelease: release.prerelease !== false,
            }));
            // First installation only: do not replay the old release history.
            // Both forms are seeded for existing stable versions, so an older
            // stable tag cannot be mistaken for a new test notification.
            const pending = this.announcementQueue.catch(() => {}).then(async () => {
            await this.loadAnnouncementState();
            if (!this.announcementState.initialized) {
                for (const release of releases) {
                    this.announcementState.seen.push(this.releaseKey(release));
                    if (!release.prerelease) this.announcementState.seen.push(`${release.tag_name}:test`);
                }
                this.announcementState.initialized = true;
                await this.saveAnnouncementState();
                return;
            }
            for (const release of releases.reverse()) await this.announceRelease(release);
            });
            this.announcementQueue = pending;
            await pending;
        } finally { this.polling = false; }
    }

    async checkScheduledBuild() {
        if (this.checkingSchedule) return;
        this.checkingSchedule = true;
        try {
            const result = await this.github('POST', '/plateforme/api/build.php', {
                project: this.project, action: 'scheduled',
            });
            if (result.status === 'error') throw new Error(result.error || 'Échec de compilation automatique.');
            return result;
        } finally { this.checkingSchedule = false; }
    }

    async requestRelease(requestedBy = null, requesterName = null) {
        if (this.project !== 'sky-sc' && !requestedBy) {
            throw new Error('Les compilations FC et The 3rd doivent être lancées manuellement.');
        }
        if (this.dispatching) {
            throw new Error('Une demande de publication est déjà en cours de traitement.');
        }
        this.dispatching = true;
        try {
            if (!this.token) throw new Error('PLATFORM_TOKEN n’est pas configuré sur Capel.');
            const active = await this.activeRun();
            if (active) {
                await this.updatePanel({
                    busy: true,
                    description: `Une ${active.stage} du patch ${this.label} est déjà en cours.`,
                    url: active.html_url,
                });
                this.startMonitor(active, null, requestedBy);
                return { alreadyRunning: true, run: active };
            }
            const baseline = await this.latestRelease();
            const requestedAt = Date.now();
            await this.github('POST', '/plateforme/api/build.php', {
                project: this.project,
                requested_by: requestedBy ? (requesterName || 'Discord') : DAILY_REQUESTER,
            });
            await this.updatePanel({
                busy: true,
                description: requestedBy
                    ? `Publication demandée par <@${requestedBy}>. Récupération des traductions de la plateforme…`
                    : 'Publication quotidienne de 3 h demandée. Récupération des traductions de la plateforme…',
            });
            const run = await this.waitForRun(NIGHTLY_WORKFLOW, requestedAt, 120_000);
            if (!run) throw new Error('La plateforme a accepté la demande mais la compilation n’est pas apparue.');
            run.stage = 'publication';
            this.startMonitor(run, baseline ? baseline.id : null, requestedBy);
            return { alreadyRunning: false, run };
        } finally {
            this.dispatching = false;
        }
    }

    async handleButton(interaction) {
        if (interaction.customId !== this.buttonId) return false;
        await interaction.reply({ content: `Les compilations se lancent désormais depuis la plateforme : ${PLATFORM_URL.origin}/plateforme/build.php?project=${this.project}`, ephemeral: true });
        return true;
    }
}

module.exports = {
    createPatchReleaseService: options => new PatchReleaseService(options),
    PatchReleaseService,
    BUTTON_ID,
};
