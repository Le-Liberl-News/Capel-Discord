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
        user: { id: '42' },
        replies: [],
        async deferReply(options) { this.deferred = options; },
        async editReply(message) { this.replies.push(message); },
    };
}

test('activeRun locks on either GitHub workflow', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    service.workflowRuns = async workflow => workflow === 'nightly-translation.yml' ? [{
        id: 10, status: 'in_progress', created_at: '2026-08-30T10:00:00Z', html_url: 'nightly',
    }] : [{
        id: 9, status: 'completed', conclusion: 'success', created_at: '2026-08-30T09:00:00Z',
    }];
    const active = await service.activeRun();
    assert.equal(active.id, 10);
    assert.equal(active.stage, 'injection');
});

test('button dispatches the publishing workflow with publish=true', async () => {
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
        path: '/repos/Le-Liberl-News/PatchSC/actions/workflows/nightly-translation.yml/dispatches',
        body: { ref: 'main', inputs: { publish: 'true' } },
    });
    assert.equal(service.started.baseline, 7);
    assert.equal(service.started.requester, '42');
    assert.match(click.replies[0], /demandée/);
});

test('button refuses a second publication reported by GitHub', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    service.activeRun = async () => ({
        id: 12, stage: 'construction', status: 'queued', html_url: 'https://example/run',
    });
    service.updatePanel = async () => {};
    service.startMonitor = () => {};
    service.github = async () => assert.fail('dispatch must not be called');
    const click = interaction();
    await service.handleButton(click);
    assert.match(click.replies[0], /déjà en cours/);
});

test('successful two-stage pipeline publishes the resulting release', async () => {
    const service = new PatchReleaseService({ client: {}, token: 'token', channelId: 'channel' });
    const nightly = { id: 20, stage: 'injection', created_at: '2026-08-30T10:00:00Z' };
    const build = { id: 21, stage: 'construction', created_at: '2026-08-30T10:30:00Z' };
    service.waitForCompletion = async run => ({ ...run, status: 'completed', conclusion: 'success' });
    service.waitForRun = async () => build;
    service.latestRelease = async () => ({ id: 9, tag_name: 'patch-v0.5.5', html_url: 'release' });
    service.finishSuccess = async release => { service.release = release; };
    await service.monitorPipeline(nightly, 8);
    assert.equal(service.release.tag_name, 'patch-v0.5.5');
});
