// Système de défense du Capel (salon RP uniquement) : un nom de pays sans
// l'article de notre traduction, une graphie anglaise ou un gentilé non retenu
// retire des PV au personnage qui a parlé.
//
// Notre traduction : (au) Liberl, (au) Leman, masculins ; (en) Érébonia,
// Calvard, Artéria, Ambria du Nord, féminins. Gentilé : Liberlois.

const SALON_DEFENSE_ID = process.env.LIBERL_DEFENSE_CHANNEL_ID || '1499373178483507210';

// Ce qui peut précéder le nom (les caractères de mise en forme Discord sont ignorés).
const MASCULIN = /(?:^|[^\p{L}])(?:le|du|au|royaume\s+de)$/iu;
const FEMININ = /(?:^|[^\p{L}])(?:l['’]|la|en|d['’]|de)$/iu;
const MISE_EN_FORME = /[\s*_~`|>]+$/u;
const LETTRE = '\\p{L}\\p{N}';

const PAYS = [
    { nom: 'Liberl', motif: 'Liberl', avant: MASCULIN, exception: /^[\s-]*news/iu },
    { nom: 'Leman', motif: 'Leman', avant: MASCULIN },
    { nom: 'Érébonia', motif: 'Érébonia', avant: FEMININ },
    { nom: 'Calvard', motif: 'Calvard', avant: FEMININ },
    { nom: 'Artéria', motif: 'Artéria', avant: FEMININ },
    { nom: 'Ambria du Nord', motif: 'Ambria\\s+du\\s+Nord', avant: FEMININ },
];
// Graphies anglaises et gentilés non retenus : toujours fautifs, article ou pas.
const GRAPHIES = [
    { motif: 'Erebonia', attendu: 'Érébonia' },
    { motif: 'Arteria', attendu: 'Artéria' },
    { motif: 'North\\s+Ambria', attendu: 'Ambria du Nord' },
    { motif: 'Liberlien(?:ne)?s?', attendu: 'Liberlois' },
];

const mot = motif => new RegExp(`(?<![${LETTRE}])(?:${motif})(?![${LETTRE}])`, 'giu');

/** Fautes d'un texte, dans l'ordre : { ecrit, attendu? } (attendu absent : il manque l'article). */
function relever(texte) {
    const fautes = [];
    texte = texte || '';
    for (const pays of PAYS) {
        for (const occurrence of texte.matchAll(mot(pays.motif))) {
            const suite = texte.slice(occurrence.index + occurrence[0].length);
            if (pays.exception?.test(suite)) continue;
            const avant = texte.slice(0, occurrence.index).replace(MISE_EN_FORME, '');
            if (!pays.avant.test(avant)) fautes.push({ index: occurrence.index, ecrit: occurrence[0] });
        }
    }
    for (const graphie of GRAPHIES) {
        for (const occurrence of texte.matchAll(mot(graphie.motif))) {
            fautes.push({ index: occurrence.index, ecrit: occurrence[0], attendu: graphie.attendu });
        }
    }
    return fautes.sort((a, b) => a.index - b.index);
}

function compterLiberlSansArticle(texte) {
    return relever(texte).length;
}

/**
 * Applique la défense si `texte` contient une faute, dans le salon RP
 * seulement. Le personnage perd 10 à 20 % de ses PV max par faute (3 fautes
 * comptées au plus) ; Capel l'annonce sous le nom du personnage (jamais celui
 * de la personne : le salon est anonyme).
 */
async function defendreLeLiberl({ channel, pseudo, texte, state, saveState, databasePersos }) {
    if (!channel || channel.id !== SALON_DEFENSE_ID || !state?.players) return null;
    const fautes = relever(texte);
    if (fautes.length === 0) return null;

    const stats = databasePersos[pseudo] || databasePersos.default || {};
    const pvMax = stats.hpMax || 100;
    state.players[pseudo] ??= { hpActuel: pvMax, statuts: [], PCActuel: stats.PCMax };
    const joueur = state.players[pseudo];
    let degats = 0;
    for (let i = 0; i < Math.min(3, fautes.length); i += 1) {
        degats += Math.max(1, Math.round(pvMax * (0.1 + Math.random() * 0.1)));
    }
    joueur.hpActuel = Math.max(0, joueur.hpActuel - degats);
    saveState();

    const faute = fautes[0];
    const constat = faute.attendu
        ? `a écrit « ${faute.ecrit} » au lieu de « ${faute.attendu} »`
        : `a prononcé « ${faute.ecrit} » sans l'article approprié`;
    const annonce = `🚨 ALERTE MAXIMALE !! **${pseudo}** ${constat}. Le système de défense du Capel s'est activé et `
        + `**${pseudo}** a perdu ${degats} PV (${joueur.hpActuel}/${pvMax}).`;
    try {
        await channel.send({ content: annonce, allowedMentions: { parse: [] } });
    } catch (error) {
        console.error('Défense du Capel : message impossible', error);
    }
    return { fautes: fautes.length, degats, pv: joueur.hpActuel };
}

module.exports = { compterLiberlSansArticle, relever, defendreLeLiberl, SALON_DEFENSE_ID };
