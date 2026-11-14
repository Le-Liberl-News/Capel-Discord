const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
class Builder {
    setTitle(value) { this.title = value; return this; }
    setDescription() { return this; } setColor() { return this; } setURL() { return this; }
    setCustomId(value) { this.customId = value; return this; }
    setLabel() { return this; } setStyle() { return this; } setDisabled() { return this; }
    addComponents(value) { this.button = value; return this; }
}
const load = Module._load;
Module._load = function(name, ...args) {
    if (name === 'discord.js') return { ActionRowBuilder: Builder, ButtonBuilder: Builder, EmbedBuilder: Builder, ButtonStyle: { Secondary: 2, Success: 3 } };
    return load.call(this, name, ...args);
};
const { PatchReleaseService } = require('../utils/patchReleaseService');
Module._load = load;

test('project buttons and dispatches stay isolated; only SC permits a scheduled request', async () => {
    const ids = new Set();
    for (const project of ['sky-sc','sky-fc','sky-3rd']) {
        const service = new PatchReleaseService({client:{},token:'fixture',channelId:'channel',project});
        ids.add(service.panelPayload().components[0].button.customId);
        let request;
        service.github = async (method, endpoint, body) => { request = {method,endpoint,body}; };
        service.activeRun = async () => null;
        service.latestRelease = async () => null;
        service.updatePanel = async () => {};
        service.waitForRun = async () => ({id:1});
        service.startMonitor = () => {};
        if (project !== 'sky-sc') await assert.rejects(service.requestRelease(), /manuellement/);
        await service.requestRelease('42','Testeur');
        assert.equal(request.body.project, project);
        assert.equal(request.body.requested_by, 'Testeur');
    }
    assert.equal(ids.size,3);
});

test('platform builds, promotion, persisted deduplication and concurrent discovery', async t => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(),'capel-release-fixture-'));
    t.after(() => fs.rm(directory,{recursive:true,force:true}));
    const statePath = path.join(directory,'state.json');
    const sent = [];
    const channel = {isTextBased:()=>true,send:async message=>sent.push(message)};
    const old = {tag:'v2026.11.13.1200',name:'Old',url:'https://example.invalid/old',prerelease:true};
    const fresh = {tag:'v2026.11.14.1200',name:'New',url:'https://example.invalid/new',prerelease:true};
    let history = [old];
    function make() {
        const service = new PatchReleaseService({client:{channels:{fetch:async()=>channel}},token:'fixture',channelId:'channel',project:'sky-fc',statePath});
        service.bumpPanel = async () => {};
        service.github = async (method,endpoint) => {
            assert.ok(endpoint.includes('project=sky-fc'));
            if (endpoint.includes('&releases=')) return {releases:history};
            return {schema:1,changes:[{kind:'text',file:'test.json',key:1,segments:[{text:'Bonjour',changed:true}]}]};
        };
        return service;
    }
    let service = make();
    await service.checkReleaseUpdates();
    assert.equal(sent.length,0,'no historical spam on installation');
    history = [fresh,old];
    await Promise.all([service.checkReleaseUpdates(),service.finishSuccess({tag_name:fresh.tag,name:fresh.name,html_url:fresh.url,prerelease:true})]);
    assert.equal(sent.length,2,'one release plus its one example');
    service = make();
    await service.checkReleaseUpdates();
    assert.equal(sent.length,2,'no duplicate after restart');
    history = [{...fresh,name:'Patch FR FC 1.0',prerelease:false},old];
    await service.checkReleaseUpdates();
    assert.equal(sent.length,4,'promotion to public release notified separately');
    assert.ok(sent[2].content.includes(' — Release'));
    await make().checkReleaseUpdates();
    assert.equal(sent.length,4);
});


test('obsolete compilation panels are removed without posting or deleting release summaries', async () => {
    let removed=0, sent=0;
    const channel={isTextBased:()=>true,send:async()=>{sent++;},messages:{fetch:async()=>new Map([
        ['panel',{author:{id:'bot'},components:[{components:[{customId:'patch_release_start'}]}],delete:async()=>{removed++;}}],
        ['summary',{author:{id:'bot'},components:[],delete:async()=>{throw new Error('Summary must remain');}}],
        ['other',{author:{id:'someone'},components:[{components:[{customId:'patch_release_start'}]}],delete:async()=>{throw new Error('Other author must remain');}}],
    ])}};
    const service=new PatchReleaseService({client:{user:{id:'bot'},channels:{fetch:async()=>channel}},token:'fixture',channelId:'channel'});
    await service.ensurePanel();await service.bumpPanel();await service.updatePanel({busy:true});
    assert.equal(service.schedulePanelBump({channelId:'channel',webhookId:'hook'}),false);
    assert.equal(removed,1);assert.equal(sent,0);
});
