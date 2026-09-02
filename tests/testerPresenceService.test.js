const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
    if (request !== 'discord.js') return originalLoad.call(this, request, parent, isMain);
    return { EmbedBuilder: class {
        constructor() { this.data = {}; }
        setTitle(value) { this.data.title = value; return this; }
        setDescription(value) { this.data.description = value; return this; }
        setColor(value) { this.data.color = value; return this; }
    } };
};
const { TesterPresenceService } = require('../utils/testerPresenceService.js');
Module._load = originalLoad;

test('distingue les pseudos identiques sans utiliser une IP', () => {
    const service = new TesterPresenceService({ client: {} });
    service.receive({ installationId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', author: '' }, 1_000);
    service.receive({ installationId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', author: '' }, 1_000);
    assert.deepEqual(service.displayRows(1_001).map(row => row.name), ['Anonyme #1', 'Anonyme #2']);
});

test('passe hors ligne sans afficher de date', () => {
    const service = new TesterPresenceService({ client: {}, offlineAfterMs: 100 });
    service.receive({
        installationId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', author: 'Test', mapName: 'Grancel',
    }, 1_000);
    assert.equal(service.displayRows(1_050)[0].online, true);
    assert.equal(service.displayRows(1_101)[0].online, false);
    assert.doesNotMatch(service.payload(1_101).embeds[0].data.description, /dernier|heure|1.?000/i);
});

test('affiche le compteur de bulles et une barre bornée', () => {
    const service = new TesterPresenceService({ client: {} });
    service.receive({
        installationId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', author: 'Test',
        bubblesRead: 25, bubblesTotal: 100,
    }, 1_000);
    assert.match(service.payload(1_001).embeds[0].data.description, /25\/100/);
    assert.match(service.payload(1_001).embeds[0].data.description, /███░░░░░░░/);
});

test('accepte uniquement le webhook et le salon configurés', () => {
    const service = new TesterPresenceService({
        client: {}, channelId: '1166042889046995074', webhookId: '1544780925496205432'
    });
    assert.equal(service.acceptsMessage({
        channelId: '1166042889046995074', webhookId: '1544780925496205432',
        content: 'LIBERLNEWS_TESTER_PRESENCE_V1\n{}'
    }), true);
    assert.equal(service.acceptsMessage({
        channelId: 'autre', webhookId: '1544780925496205432',
        content: 'LIBERLNEWS_TESTER_PRESENCE_V1\n{}'
    }), false);
});
