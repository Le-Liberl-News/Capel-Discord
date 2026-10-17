// Sky SC's lines on the translation platform, in place of the Google sheets:
// a "feuille" is a script with its parts (T0100 = t0100, t0100_1, ...) and a
// "ligne" the number of a bubble in that order, as the platform lists them.
// Reading is open (plateforme/api/ingame.php); writing and the lexicon use
// Capel's API token (PLATFORM_TOKEN), an account allowed to translate.
const PLATFORM_URL = (process.env.PLATFORM_URL || 'https://leliberlnews.fr').replace(/\/+$/, '');
const PROJECT = 'sky-sc';
const LEXICON_SECTIONS = [
    ['g-n-ral', 'Général'], ['items', 'Items'], ['lieux', 'Lieux'], ['noms', 'Noms'], ['ennemis', 'Ennemis'],
];
const LEXICON_CACHE_MS = 10 * 60 * 1000;
let lexiconCache = null;

function token() {
    return (process.env.PLATFORM_TOKEN || '').trim();
}

async function request(path, { method = 'GET', query = {}, body = null, auth = false } = {}) {
    const url = new URL(`${PLATFORM_URL}${path}`);
    url.search = new URLSearchParams(query).toString();
    const headers = { Accept: 'application/json' };
    if (auth || body) {
        if (!token()) throw new Error('PLATFORM_TOKEN est absent : Capel ne peut pas écrire sur la plateforme.');
        headers.Authorization = `Bearer ${token()}`;
        headers['X-Platform-Token'] = token();
    }
    if (body) headers['Content-Type'] = 'application/json';
    const response = await fetch(url, {
        method, headers, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(20000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const error = new Error(data.error || `Plateforme : HTTP ${response.status}`);
        error.status = response.status;
        error.current = data.current;
        throw error;
    }
    return data;
}

function scriptCode(feuille) {
    const code = String(feuille || '').trim().toLowerCase();
    if (!/^[a-z0-9]+$/.test(code)) throw new Error(`Nom de fichier invalide : ${feuille}`);
    return code;
}

/** The bubbles of a file and its parts, in the platform's order. */
async function bubbles(feuille) {
    const data = await request('/plateforme/api/ingame.php', { query: { action: 'script', project: PROJECT, script: scriptCode(feuille) } });
    return data.items || [];
}

/** Bubble number `ligne` (from 1) of a file, or null. */
async function bubble(feuille, ligne) {
    const items = await bubbles(feuille);
    return Number.isInteger(ligne) && ligne >= 1 ? items[ligne - 1] || null : null;
}

function scriptUrl(feuille) {
    const url = new URL(`${PLATFORM_URL}/plateforme/entries.php`);
    url.search = new URLSearchParams({ project: PROJECT, script: scriptCode(feuille) }).toString();
    return url.toString();
}

/** Writes a bubble's French if it still is `expected`, then reads it back. */
async function writeBubble(item, expected, text) {
    await request('/plateforme/api/ingame.php', { method: 'POST', body: { kind: 'entry', id: item.id, expected, text } });
    const again = (await bubbles(item.script)).find(candidate => candidate.id === item.id);
    if (!again || again.fr.replace(/\r\n/g, '\n') !== text.replace(/\r\n/g, '\n')) {
        throw new Error('Vérification échouée : la plateforme ne renvoie pas le texte écrit.');
    }
    return again;
}

// As the overlay compares: spacing and the {…} / #…X codes do not tell two lines apart.
function normalizedLine(value) {
    return String(value || '')
        .replace(/[     ]/g, ' ')
        .replace(/\{[^{}]{1,16}\}/g, '')
        .replace(/#\d*[ACFKPSVW]/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}

/** Bubbles of a file whose French or English is `text`. */
async function findBubbles(feuille, text) {
    const wanted = normalizedLine(text);
    return (await bubbles(feuille)).filter(item => normalizedLine(item.fr) === wanted || normalizedLine(item.en) === wanted);
}

/** Replaces `text` by `replacement` in every bubble of the file showing it; returns how many. */
async function replaceTranslation(feuille, text, replacement) {
    const matches = await findBubbles(feuille, text);
    if (matches.length === 0) throw new Error('Impossible de mettre à jour : le texte original est introuvable.');
    let written = 0;
    for (const item of matches) {
        try {
            await writeBubble(item, item.fr, replacement);
            written++;
        } catch (error) {
            console.error(`[Plateforme] Écriture de ${item.script} bulle ${item.ordinal} impossible :`, error.message);
        }
    }
    return written;
}

function formatBubble(item, ligne, feuille, userId = null, isUpdate = false) {
    if (!item) return `❌ La ligne **${ligne}** de ${feuille} n'existe pas sur la plateforme.`;
    const header = isUpdate
        ? `✅ **MISE À JOUR VÉRIFIÉE** par <@${userId}>\n📄 **Fichier :** ${feuille} (Ligne **${ligne}**)`
        : (userId ? `📖 <@${userId}> lit la **Ligne ${ligne} de ${feuille}** :` : `📖 **Ligne ${ligne} de ${feuille}** :`);
    return `${header}\n🇯🇵 **Jap :** ${item.jp || '?'}\n🇬🇧 **ENG :** ${item.en || '?'}\n🇫🇷 **FR :** ${item.fr || '*vide*'}\n🔗 <${item.url}>`;
}

/** SC's lexicon (Général, Items, Lieux, Noms, Ennemis), cached a few minutes. */
async function lexicon() {
    if (lexiconCache && Date.now() - lexiconCache.at < LEXICON_CACHE_MS) return lexiconCache.rows;
    const rows = [];
    for (const [section, label] of LEXICON_SECTIONS) {
        for (let page = 1, count = 1; page <= count; page++) {
            const data = await request('/api/v1/lexicon', {
                auth: true, query: { project: PROJECT, section, page, per_page: 500, include_empty: 1 },
            });
            count = data.page_count || 1;
            for (const entry of data.items || []) {
                rows.push({ eng: (entry.source_en || '').trim(), fr: (entry.translation_fr || '').trim(),
                    jap: (entry.source_jp || '').trim(), source: label });
            }
        }
    }
    lexiconCache = { at: Date.now(), rows };
    return rows;
}

/** "English = French" lines of the lexicon, for the AI prompts. */
async function lexiconText() {
    try {
        return (await lexicon()).filter(row => row.eng && row.fr).map(row => `${row.eng} = ${row.fr}`).join('\n');
    } catch (error) {
        console.error('Lexique de la plateforme indisponible :', error.message);
        return 'Lexique indisponible.';
    }
}

module.exports = {
    PLATFORM_URL, bubbles, bubble, scriptUrl, writeBubble, findBubbles, replaceTranslation, formatBubble,
    lexicon, lexiconText, normalizedLine,
};
