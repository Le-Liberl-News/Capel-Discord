const assert = require('node:assert/strict');
const test = require('node:test');
const Module = require('node:module');
class Builder {
    setTitle() { return this; }
    setDescription() { return this; }
    setColor() { return this; }
    setURL() { return this; }
    setCustomId() { return this; }
    setLabel() { return this; }
    setStyle() { return this; }
    setDisabled() { return this; }
    addComponents() { return this; }
}
const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
    if (request === 'discord.js') return {
        ActionRowBuilder: Builder,
        ButtonBuilder: Builder,
        EmbedBuilder: Builder,
        ButtonStyle: { Secondary: 2, Success: 3 },
    };
    return originalLoad.call(this, request, parent, isMain);
};
const { PatchReleaseService } = require('../utils/patchReleaseService.js');
Module._load = originalLoad;

function interaction() {
    return {
        customId: 'patch_release_start',
        user: { id: '42', username: 'estelle' },
        member: { displayName: 'Estelle' },
        replies: [],
        async deferReply(options) { this.deferred = options; },
        async editReply(message) { this.replies.push(message); },
    };
}

test('activeRun locks on the single publishing workflow', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    service.workflowRuns = async workflow => workflow === 'build.yml' ? [{
        id: 10, status: 'in_progress', created_at: '2026-08-30T10:00:00Z', html_url: 'nightly',
    }] : [];
    const active = await service.activeRun();
    assert.equal(active.id, 10);
    assert.equal(active.stage, 'publication');
});

test('GitHub calls retry transient DNS failures', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    let calls = 0;
    service.githubRequest = async () => {
        calls += 1;
        if (calls < 3) {
            const error = new Error('getaddrinfo ENOTFOUND api.github.com');
            error.code = 'ENOTFOUND';
            throw error;
        }
        return { ok: true };
    };
    assert.deepEqual(await service.github('GET', '/test'), { ok: true });
    assert.equal(calls, 3);
});

test('GitHub calls do not retry HTTP or authentication failures', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    let calls = 0;
    service.githubRequest = async () => {
        calls += 1;
        throw new Error('GitHub HTTP 401');
    };
    await assert.rejects(service.github('GET', '/test'), /HTTP 401/);
    assert.equal(calls, 1);
});

test('button dispatches the Patch2nd build with the requester', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    const calls = [];
    service.activeRun = async () => null;
    service.latestRelease = async () => ({ id: 7 });
    service.updatePanel = async () => {};
    service.github = async (method, path, body) => { calls.push({ method, path, body }); };
    service.waitForRun = async () => ({
        id: 11, status: 'queued', created_at: new Date().toISOString(), html_url: 'run',
    });
    service.startMonitor = (run, baseline, requester) => {
        service.started = { run, baseline, requester };
    };
    const click = interaction();
    assert.equal(await service.handleButton(click), true);
    assert.deepEqual(calls[0], {
        method: 'POST',
        path: '/repos/Le-Liberl-News/Patch2nd/actions/workflows/build.yml/dispatches',
        body: { ref: 'main', inputs: { requested_by: 'Estelle', force: 'false' } },
    });
    assert.equal(service.started.baseline, 7);
    assert.equal(service.started.requester, '42');
    assert.match(click.replies[0], /demandée/);
});

test('daily publication names Capel as the requester', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    const calls = [];
    service.activeRun = async () => null;
    service.latestRelease = async () => ({ id: 7 });
    service.updatePanel = async () => {};
    service.github = async (method, path, body) => { calls.push({ method, path, body }); };
    service.waitForRun = async () => ({
        id: 13, status: 'queued', created_at: new Date().toISOString(), html_url: 'run',
    });
    service.startMonitor = () => {};

    await service.requestRelease();

    assert.equal(calls[0].body.inputs.requested_by, 'Capel (publication quotidienne)');
});

test('daily no-change result does not post a Discord message', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    let messages = 0;
    service.panelMessage = { channel: { send: async () => { messages += 1; } } };
    service.updatePanel = async () => {};
    service.waitForCompletion = async run => ({ ...run, status: 'completed', conclusion: 'success' });
    service.latestRelease = async () => ({ id: 8 });

    await service.monitorPipeline({ id: 20 }, 8);

    assert.equal(messages, 0);
});

test('button refuses a second publication reported by GitHub', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    service.activeRun = async () => ({
        id: 12, stage: 'publication', status: 'queued', html_url: 'https://example/run',
    });
    service.updatePanel = async () => {};
    service.startMonitor = () => {};
    service.github = async () => assert.fail('dispatch must not be called');
    const click = interaction();
    await service.handleButton(click);
    assert.match(click.replies[0], /déjà en cours/);
});

test('successful publishing workflow publishes the resulting release', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    const nightly = { id: 20, stage: 'publication', created_at: '2026-08-30T10:00:00Z' };
    service.waitForCompletion = async run => ({ ...run, status: 'completed', conclusion: 'success' });
    service.latestRelease = async () => ({ id: 9, tag_name: 'patch-v0.5.5', html_url: 'release' });
    service.finishSuccess = async release => { service.release = release; };
    await service.monitorPipeline(nightly, 8);
    assert.equal(service.release.tag_name, 'patch-v0.5.5');
});

test('latest release skips backups and older patch releases', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    service.github = async () => [
        { id: 1, tag_name: 'v2026.10.05-1257', created_at: '2026-10-05T12:51:47Z' },
        { id: 2, tag_name: 'sauvegarde-2026-10-16', created_at: '2026-10-16T01:00:00Z' },
        { id: 3, tag_name: 'v2026.10.06-0721', created_at: '2026-10-06T07:10:20Z' },
    ];
    assert.equal((await service.latestRelease()).id, 3);
});

test('a new release is announced with its notes, in messages Discord accepts', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    const newline = String.fromCharCode(10);
    const lines = Array.from({ length: 300 }, (_, index) => `- scripts/c${String(index).padStart(4, '0')}.json`);
    const messages = service.releaseMessages({ name: 'Patch FR SC 2026.10.18-0100', html_url: 'https://example/release',
        body: ['Version de test.', '', 'Modifié depuis v2026.10.17-0100 (300 fichier(s)) :', ...lines].join(newline) });
    assert.ok(messages.length > 1);
    assert.ok(messages.every(message => message.length <= 2000));
    assert.ok(messages[0].startsWith(['**Patch FR SC 2026.10.18-0100**', 'https://example/release'].join(newline)));
    assert.equal(messages.join(newline).split('- scripts/c').length - 1, 300);
});
