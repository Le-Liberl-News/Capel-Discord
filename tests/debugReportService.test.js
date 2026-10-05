const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');

// discord.js and the Google sheets are not needed for these checks.
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
    if (request === 'discord.js') return {};
    if (request === './sheetManager' || request === './debugVideo') return {};
    return originalLoad.call(this, request, parent, isMain);
};
const { normalizedLine, requireSheetUrl } = require('../utils/debugReportService.js');
Module._load = originalLoad;

test('the overlay links lines on the platform', () => {
    const url = 'https://leliberlnews.fr/plateforme/entries.php?project=sky-sc&script=t0123#entry-63259';
    assert.equal(requireSheetUrl(url), url);
    assert.equal(requireSheetUrl(''), '');
    assert.throws(() => requireSheetUrl('https://example.com/plateforme/entries.php'));
    assert.throws(() => requireSheetUrl('http://leliberlnews.fr/plateforme/entries.php'));
});

test('a reported line matches its bubble whatever the spacing and codes', () => {
    assert.equal(normalizedLine('Bravo à vous !\nVous avez réussi.{wait}'),
                 normalizedLine('Bravo à vous ! Vous avez réussi.'));
    assert.equal(normalizedLine('#2CAttention#0C !'), normalizedLine('Attention !'));
    assert.notEqual(normalizedLine('Bonjour.'), normalizedLine('Bonjour !'));
});
