const { EmbedBuilder } = require('discord.js');

// Searches the lines of the translation platform through its API
// (GET /plateforme/api/occurrences.php) and links each bubble.
const PLATFORM_URL = (process.env.PLATFORM_URL || 'https://leliberlnews.fr').replace(/\/+$/, '');
const DEFAULT_PROJECT = process.env.PLATFORM_PROJECT || 'sky-3rd';
const SHOWN = 5;
const GAMES = { 'sky-3rd': 'the 3rd', 'sky-sc': 'SC', 'sky-fc': 'FC' };

function cut(text, length) {
    const value = (text || '').trim();
    if (!value) return '*vide*';
    return value.length > length ? `${value.slice(0, length - 1)}…` : value;
}

module.exports = {
    async execute(interaction) {
        const term = interaction.options.getString('terme').trim();
        const language = interaction.options.getString('langue') || 'toutes';
        // "tous" searches every game: the platform then answers with the first
        // bubbles of each game and the total per game.
        const project = interaction.options.getString('jeu') || DEFAULT_PROJECT;
        const everyGame = project === 'tous';
        await interaction.deferReply();

        const languages = language === 'toutes' ? 'jp,en,fr' : language;
        const api = new URL(`${PLATFORM_URL}/plateforme/api/occurrences.php`);
        api.search = new URLSearchParams({ q: term, lang: languages, limit: String(everyGame ? 3 : SHOWN), project }).toString();

        let data;
        try {
            const response = await fetch(api, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(15000) });
            data = await response.json();
            if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
        } catch (error) {
            console.error('Recherche d’occurrences sur la plateforme :', error);
            return interaction.editReply(`Impossible de chercher **${term}** sur la plateforme : ${error.message}`);
        }

        // The same search, whole, on the platform.
        const full = new URL(`${PLATFORM_URL}/plateforme/entries.php`);
        full.searchParams.set('project', everyGame ? 'sky-3rd' : project);
        full.searchParams.set('q', term);
        for (const code of languages.split(',')) full.searchParams.append('lang[]', code);

        const where = everyGame ? ' dans les trois jeux' : ` dans ${GAMES[project] || project}`;
        const inLanguage = language === 'toutes' ? '' : ` en ${language.toUpperCase()}`;
        if (data.total === 0) {
            return interaction.editReply(`Aucune bulle ne contient **${term}**${inLanguage}${where}.`);
        }

        const perGame = everyGame
            ? Object.entries(data.projects || {}).map(([slug, game]) => `${GAMES[slug] || game.name} : **${game.total}**`).join(' · ')
            : '';
        const embed = new EmbedBuilder()
            .setColor('#C8814A')
            .setTitle(`Occurrences de « ${cut(term, 200)} »`)
            .setURL(full.toString())
            .setDescription(`**${data.total}** bulle(s) trouvée(s)${inLanguage}${where}. `
                + (everyGame ? `\n${perGame}\nLes premières de chaque jeu ci-dessous.`
                    : (data.total > SHOWN ? `Les ${SHOWN} premières ci-dessous, [toutes sur la plateforme](${full}).` : '')));

        // Discord caps an embed at 6000 characters: shorter texts when every game is listed.
        const length = everyGame ? 140 : 260;
        for (const result of data.results.slice(0, 10)) {
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
    },
};
