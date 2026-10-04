const assert = require('node:assert/strict');
const { test } = require('node:test');
const { compterLiberlSansArticle, defendreLeLiberl, SALON_DEFENSE_ID } = require('../rpg/defenseLiberl.js');

test('un Liberl avec article masculin ne compte pas', () => {
    for (const texte of [
        'Bienvenue dans le Liberl !', 'La reine du Liberl', 'Je vis au Liberl.',
        'Le royaume de Liberl est beau', 'LE LIBERL', 'le **Liberl**', 'les Liberliens sont sympas',
        'Merci au Liberl News', 'Liberl News sort un patch', 'https://leliberlnews.fr', 'Liberlienne de souche',
    ]) {
        assert.equal(compterLiberlSansArticle(texte), 0, texte);
    }
});

test('un Liberl sans article compte, une fois par occurrence', () => {
    assert.equal(compterLiberlSansArticle('Vive Liberl !'), 1);
    assert.equal(compterLiberlSansArticle('Liberl est un pays'), 1);
    assert.equal(compterLiberlSansArticle('La reine de Liberl'), 1);
    assert.equal(compterLiberlSansArticle('Liberl, Liberl et le Liberl'), 2);
    assert.equal(compterLiberlSansArticle('la Liberl'), 1);
});

function salon(id) {
    const envois = [];
    return { id, envois, send: async message => { envois.push(message.content); } };
}

test('la défense retire des PV dans le salon RP seulement', async () => {
    const state = { players: { Estelle: { hpActuel: 150, statuts: [] } } };
    let sauvegardes = 0;
    const persos = { Estelle: { hpMax: 150 }, default: { hpMax: 100 } };
    const ailleurs = salon('123');
    assert.equal(await defendreLeLiberl({ channel: ailleurs, pseudo: 'Estelle', texte: 'Vive Liberl', state, saveState: () => sauvegardes++, databasePersos: persos }), null);
    assert.equal(ailleurs.envois.length, 0);

    const rp = salon(SALON_DEFENSE_ID);
    assert.equal(await defendreLeLiberl({ channel: rp, pseudo: 'Estelle', texte: 'Vive le Liberl', state, saveState: () => sauvegardes++, databasePersos: persos }), null);
    const resultat = await defendreLeLiberl({ channel: rp, pseudo: 'Estelle', texte: 'Vive Liberl', state, saveState: () => sauvegardes++, databasePersos: persos });
    assert.ok(resultat.degats >= 15 && resultat.degats <= 30);
    assert.equal(state.players.Estelle.hpActuel, 150 - resultat.degats);
    assert.equal(sauvegardes, 1);
    assert.match(rp.envois[0], /\*\*Estelle\*\*/);
});

test('les PV ne descendent pas sous zéro', async () => {
    const state = { players: { Joshua: { hpActuel: 3, statuts: [] } } };
    const rp = salon(SALON_DEFENSE_ID);
    const resultat = await defendreLeLiberl({ channel: rp, pseudo: 'Joshua', texte: 'Liberl', state, saveState: () => {}, databasePersos: { Joshua: { hpMax: 140 } } });
    assert.equal(resultat.pv, 0);
    assert.match(rp.envois[0], /s'effondre/);
});
