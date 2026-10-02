const { EmbedBuilder } = require('discord.js');

// Searches the lines of the translation platform through its API
// (GET /plateforme/api/occurrences.php) and links each bubble.
const PLATFORM_URL = (process.env.PLATFORM_URL || 'https://leliberlnews.fr').replace(/\/+$/, '');
// Without the jeu option, every game is searched.
const DEFAULT_PROJECT = process.env.PLATFORM_PROJECT || 'tous';
// A post stays short: 3 bubbles at most, one per game when every game is searched.
const SHOWN = 3;
const GAMES = { 'sky-3rd': 'the 3rd', 'sky-sc': 'SC', 'sky-fc': 'FC' };

function cut(text, length) {
    const value = (text || '').trim();
    if (!value) return '*vide*';
    return value.length > length ? `${value.slice(0, length - 1)}…` : value;
}

module.exports = {
    async execute(interaction) {
        // Discord drops a command not acknowledged within 3 seconds ("l'application
        // ne répond plus"): acknowledge first, then report any failure in the reply.
        await interaction.deferReply();
        try {
            return await search(interaction);
        } catch (error) {
            console.error('/occurrences :', error);
            return interaction.editReply(`La recherche a échoué : ${error.message}`);
        }
    },
};

async function search(interaction) {
    const term = (interaction.options.getString('terme') || '').trim();
    const language = interaction.options.getString('langue') || 'toutes';
    // "tous" searches every game: the platform then answers with the first
    // bubbles of each game and the total per game.
    const project = interaction.options.getString('jeu') || DEFAULT_PROJECT;
    const everyGame = project === 'tous';

    const languages = language === 'toutes' ? 'jp,en,fr' : language;
    const api = new URL(`${PLATFORM_URL}/plateforme/api/occurrences.php`);
    api.search = new URLSearchParams({ q: term, lang: languages, limit: String(everyGame ? 1 : SHOWN), project }).toString();

    let data;
    try {
        const response = await fetch(api, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(15000) });
        data = await response.json();
        if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
    } catch (error) {
        console.error('Recherche d’occurrences sur la plateforme :', error);
        return interaction.editReply(`Impossible de chercher **${term}** sur la plateforme : ${error.message}`);
    }

    // The same search, whole, on the platform: one page per game.
    const searchUrl = slug => {
        const url = new URL(`${PLATFORM_URL}/plateforme/entries.php`);
        url.searchParams.set('project', slug);
        url.searchParams.set('q', term);
        for (const code of languages.split(',')) url.searchParams.append('lang[]', code);
        return url.toString();
    };

    const where = everyGame ? ' dans les trois jeux' : ` dans ${GAMES[project] || project}`;
    const inLanguage = language === 'toutes' ? '' : ` en ${language.toUpperCase()}`;
    if (data.total === 0) {
        return interaction.editReply(`Aucune bulle ne contient **${term}**${inLanguage}${where}.`);
    }

    // Results per game, each linked to the whole search on the platform.
    const games = Object.entries(data.projects || { [project]: { total: data.total } })
        .filter(([, game]) => game.total > 0)
        .map(([slug, game]) => `[${GAMES[slug] || game.name} : ${game.total}](${searchUrl(slug)})`)
        .join(' · ');
    const embed = new EmbedBuilder()
        .setColor('#C8814A')
        .setTitle(`Occurrences de « ${cut(term, 200)} »`)
        .setDescription(`**${data.total}** bulle(s) trouvée(s)${inLanguage}${where}.\nToutes les bulles : ${games}`);

    // Three bubbles of 260 characters stay well under Discord's 6000 per embed.
    const length = 260;
    for (const result of data.results.slice(0, SHOWN)) {
        const game = everyGame ? `[${GAMES[result.project] || result.game}] ` : '';
        embed.addFields({
            name: cut(`${game}${result.script} #${result.bubble}${result.character ? ` · ${result.character}` : ''}`, 250),
            value: [
                `**JP** ${cut(result.jp, length)}`,
                `**EN** ${cut(result.en, length)}`,
                `**FR** ${cut(result.fr, length)}`,
                `[Ouvrir la bulle](${result.url})`,
            ].join('\n').slice(0, 1024),
        });
    }
    return interaction.editReply({ embeds: [embed] });
}
