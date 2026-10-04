const assert = require('node:assert/strict');
const { test } = require('node:test');
const { compterLiberlSansArticle, relever, defendreLeLiberl, SALON_DEFENSE_ID } = require('../rpg/defenseLiberl.js');

test('les noms avec le bon article ne comptent pas', () => {
    for (const texte of [
        'Bienvenue dans le Liberl !', 'La reine du Liberl', 'Je vis au Liberl.', 'Le royaume de Liberl est beau',
        'LE LIBERL', 'le **Liberl**', 'Merci au Liberl News', 'Liberl News sort un patch', 'https://leliberlnews.fr',
        'Les Liberlois sont sympas', 'au Leman', "dans l'état du Leman",
        "l'Érébonia", 'en Érébonia', "l'Empire d'Érébonia", "de l'Érébonia", 'la Calvard', 'en Calvard',
        'la République de Calvard', "l'Artéria", "en Ambria du Nord", "l’Ambria du Nord",
    ]) {
        assert.equal(compterLiberlSansArticle(texte), 0, texte);
    }
});

test('un nom sans le bon article compte, une fois par occurrence', () => {
    assert.equal(compterLiberlSansArticle('Vive Liberl !'), 1);
    assert.equal(compterLiberlSansArticle('La reine de Liberl'), 1);
    assert.equal(compterLiberlSansArticle('Liberl, Liberl et le Liberl'), 2);
    assert.equal(compterLiberlSansArticle('Leman est neutre'), 1);
    assert.equal(compterLiberlSansArticle('Érébonia attaque'), 1);
    assert.equal(compterLiberlSansArticle('le Calvard'), 1);
    assert.equal(compterLiberlSansArticle('au Artéria'), 1);
    assert.equal(compterLiberlSansArticle('Ambria du Nord est froide'), 1);
});

test('graphies anglaises et gentilés non retenus', () => {
    assert.deepEqual(relever("l'Erebonia et l'Arteria").map(f => f.attendu), ['Érébonia', 'Artéria']);
    assert.deepEqual(relever('North Ambria').map(f => f.attendu), ['Ambria du Nord']);
    assert.deepEqual(relever('les Liberliens et une Liberlienne').map(f => f.attendu), ['Liberlois', 'Liberlois']);
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
    assert.equal(rp.envois[0], `🚨 ALERTE MAXIMALE !! **Estelle** a prononcé « Liberl » sans l'article approprié. Le système de défense du Capel s'est activé et **Estelle** a perdu ${resultat.degats} PV (${150 - resultat.degats}/150).`);
});

test('les PV ne descendent pas sous zéro', async () => {
    const state = { players: { Joshua: { hpActuel: 3, statuts: [] } } };
    const rp = salon(SALON_DEFENSE_ID);
    const resultat = await defendreLeLiberl({ channel: rp, pseudo: 'Joshua', texte: 'Erebonia', state, saveState: () => {}, databasePersos: { Joshua: { hpMax: 140 } } });
    assert.equal(resultat.pv, 0);
    assert.match(rp.envois[0], /a écrit « Erebonia » au lieu de « Érébonia »/);
});
