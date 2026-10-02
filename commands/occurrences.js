const { EmbedBuilder } = require('discord.js');

// Searches the lines of the translation platform through its API
// (GET /plateforme/api/occurrences.php) and links each bubble.
const PLATFORM_URL = (process.env.PLATFORM_URL || 'https://leliberlnews.fr').replace(/\/+$/, '');
const PROJECT = process.env.PLATFORM_PROJECT || 'sky-3rd';
const SHOWN = 5;

function cut(text, length) {
    const value = (text || '').trim();
    if (!value) return '*vide*';
    return value.length > length ? `${value.slice(0, length - 1)}…` : value;
}

module.exports = {
    async execute(interaction) {
        const term = interaction.options.getString('terme').trim();
        const language = interaction.options.getString('langue') || 'toutes';
        await interaction.deferReply();

        const languages = language === 'toutes' ? 'jp,en,fr' : language;
        const api = new URL(`${PLATFORM_URL}/plateforme/api/occurrences.php`);
        api.search = new URLSearchParams({ q: term, lang: languages, limit: String(SHOWN), project: PROJECT }).toString();

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
        full.searchParams.set('project', PROJECT);
        full.searchParams.set('q', term);
        for (const code of languages.split(',')) full.searchParams.append('lang[]', code);

        if (data.total === 0) {
            return interaction.editReply(`Aucune bulle ne contient **${term}**${language === 'toutes' ? '' : ` en ${language.toUpperCase()}`}.`);
        }

        const embed = new EmbedBuilder()
            .setColor('#C8814A')
            .setTitle(`Occurrences de « ${cut(term, 200)} »`)
            .setURL(full.toString())
            .setDescription(`**${data.total}** bulle(s) trouvée(s)${language === 'toutes' ? '' : ` en ${language.toUpperCase()}`}. `
                + (data.total > SHOWN ? `Les ${SHOWN} premières ci-dessous, [toutes sur la plateforme](${full}).` : ''));

        for (const result of data.results) {
            embed.addFields({
                name: cut(`${result.script} #${result.bubble}${result.character ? ` · ${result.character}` : ''}`, 250),
                value: [
                    `**JP** ${cut(result.jp, 260)}`,
                    `**EN** ${cut(result.en, 260)}`,
                    `**FR** ${cut(result.fr, 260)}`,
                    `[Ouvrir la bulle](${result.url})`,
                ].join('\n').slice(0, 1024),
            });
        }
        return interaction.editReply({ embeds: [embed] });
    },
};
