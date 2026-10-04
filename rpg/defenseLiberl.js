// Système de défense du Liberl (salon RP uniquement) : dans notre traduction,
// le pays est masculin (« le Liberl », « du Liberl », « au Liberl », « le
// royaume de Liberl »). Un « Liberl » sans article déclenche la défense du
// royaume, qui retire des PV au personnage qui a parlé.

const SALON_DEFENSE_ID = process.env.LIBERL_DEFENSE_CHANNEL_ID || '1499373178483507210';

// Ce qui peut précéder « Liberl » : un article masculin (contracté ou non),
// ou « royaume de ». Les caractères de mise en forme Discord sont ignorés.
const ARTICLE = /(?:^|[^\p{L}])(?:le|du|au|royaume\s+de)$/iu;
const MISE_EN_FORME = /[\s*_~`|>]+$/u;

const MESSAGES = [
    "🛡️ **ALERTE GÉNÉRIQUE !** {pseudo} a prononcé « Liberl » sans article. Les Sentinelles royales ouvrent le feu : **−{degats} PV** ({pv}/{pvMax}). On dit *le* Liberl, merci.",
    "📯 Le Royaume du Liberl n'est pas un prénom ! La garde de Grancel inflige **{degats} PV** de dégâts grammaticaux à {pseudo} ({pv}/{pvMax}).",
    "⚙️ *Bzzt.* L'Orbal Grammatical du Professeur Russell détecte un Liberl orphelin. {pseudo} est électrocuté·e : **−{degats} PV** ({pv}/{pvMax}).",
    "🏰 La Reine Alicia fronce les sourcils. Le Chevalier Blanc surgit et corrige {pseudo} d'un coup de rapière : **−{degats} PV** ({pv}/{pvMax}). C'est *le* Liberl.",
    "🐦 Sieg pique {pseudo} au visage pour avoir oublié l'article devant Liberl : **−{degats} PV** ({pv}/{pvMax}).",
    "📜 Article 1 de la Constitution : « Le Liberl est masculin. » {pseudo} écope d'une amende de **{degats} PV** ({pv}/{pvMax}).",
    "💥 Le Glorieux (version grammaticale) tire sur {pseudo} depuis l'orbite : **−{degats} PV** ({pv}/{pvMax}). Dites *du* Liberl, pas « de Liberl » tout court.",
];
const MESSAGE_KO = "☠️ {pseudo} s'effondre sous le poids de son erreur. Le Liberl reste masculin, même sur un cadavre.";

/** Nombre de « Liberl » sans article dans un texte (« Liberl News » et « Liberlien » ne comptent pas). */
function compterLiberlSansArticle(texte) {
    let fautes = 0;
    for (const occurrence of (texte || '').matchAll(/(?<![\p{L}\p{N}])liberl(?![\p{L}\p{N}])/giu)) {
        const suite = texte.slice(occurrence.index + occurrence[0].length);
        if (/^[\s-]*news/iu.test(suite)) continue;
        const avant = texte.slice(0, occurrence.index).replace(MISE_EN_FORME, '');
        if (!ARTICLE.test(avant)) fautes += 1;
    }
    return fautes;
}

/**
 * Applique la défense si `texte` contient un Liberl sans article, dans le salon
 * RP seulement. Le personnage perd 10 à 20 % de ses PV max par faute (3 fautes
 * comptées au plus) ; Capel l'annonce dans le salon, sous le nom du personnage
 * (jamais celui de la personne : le salon est anonyme).
 */
async function defendreLeLiberl({ channel, pseudo, texte, state, saveState, databasePersos }) {
    if (!channel || channel.id !== SALON_DEFENSE_ID || !state?.players) return null;
    const fautes = Math.min(3, compterLiberlSansArticle(texte));
    if (fautes === 0) return null;

    const stats = databasePersos[pseudo] || databasePersos.default || {};
    const pvMax = stats.hpMax || 100;
    state.players[pseudo] ??= { hpActuel: pvMax, statuts: [], PCActuel: stats.PCMax };
    const joueur = state.players[pseudo];
    let degats = 0;
    for (let i = 0; i < fautes; i += 1) {
        degats += Math.max(1, Math.round(pvMax * (0.1 + Math.random() * 0.1)));
    }
    joueur.hpActuel = Math.max(0, joueur.hpActuel - degats);
    saveState();

    const remplir = modele => modele
        .replaceAll('{pseudo}', `**${pseudo}**`)
        .replaceAll('{degats}', String(degats))
        .replaceAll('{pv}', String(joueur.hpActuel))
        .replaceAll('{pvMax}', String(pvMax));
    let annonce = remplir(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
    if (fautes > 1) annonce += ` (×${fautes} Liberl sans article !)`;
    if (joueur.hpActuel === 0) annonce += `\n${remplir(MESSAGE_KO)}`;
    try {
        await channel.send({ content: annonce, allowedMentions: { parse: [] } });
    } catch (error) {
        console.error('Défense du Liberl : message impossible', error);
    }
    return { fautes, degats, pv: joueur.hpActuel };
}

module.exports = { compterLiberlSansArticle, defendreLeLiberl, SALON_DEFENSE_ID };
