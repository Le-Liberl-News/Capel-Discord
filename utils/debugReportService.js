const {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const sheetManager = require('./sheetManager');

const MAX_AUTHOR_LENGTH = 100;
const MAX_SCRIPT_LENGTH = 128;
const MAX_DIALOGUE_LENGTH = 8000;
const MAX_DISCORD_CONTENT_LENGTH = 2000;

function requireString(value, fieldName, maxLength, allowEmpty = false) {
    if (typeof value !== 'string') {
        throw new Error(`Le champ ${fieldName} doit être une chaîne.`);
    }

    const normalized = value.trim();
    if (!allowEmpty && normalized.length === 0) {
        throw new Error(`Le champ ${fieldName} est vide.`);
    }
    if (normalized.length > maxLength) {
        throw new Error(`Le champ ${fieldName} dépasse ${maxLength} caractères.`);
    }
    return normalized;
}

function validateDebugReport(rawReport) {
    if (!rawReport || typeof rawReport !== 'object' || Array.isArray(rawReport)) {
        throw new Error('Le rapport JSON est invalide.');
    }
    if (rawReport.schema !== 1) {
        throw new Error(`Version de rapport non prise en charge : ${rawReport.schema}.`);
    }

    return {
        schema: 1,
        author: requireString(rawReport.author || 'Anonyme', 'author', MAX_AUTHOR_LENGTH),
        script: requireString(rawReport.script, 'script', MAX_SCRIPT_LENGTH),
        dialogue: requireString(rawReport.dialogue, 'dialogue', MAX_DIALOGUE_LENGTH),
        clientReportId: requireString(
            rawReport.clientReportId,
            'clientReportId',
            128
        )
    };
}

function legacyHttpReport(body) {
    return validateDebugReport({
        schema: 1,
        author: body.auteur || 'Reporter Inconnu',
        script: body.fichier || '',
        dialogue: body.replique || '',
        clientReportId: `legacy-http-${Date.now()}`
    });
}

function truncateDiscordContent(content) {
    if (content.length <= MAX_DISCORD_CONTENT_LENGTH) return content;
    const suffix = '\n\n… Réplique tronquée dans ce message Discord.';
    return content.slice(0, MAX_DISCORD_CONTENT_LENGTH - suffix.length) + suffix;
}

async function publishDebugReport({
    client,
    sheets,
    tableId,
    destinationChannelId,
    report,
    screenshot
}) {
    const validated = validateDebugReport(report);
    if (!screenshot || !Buffer.isBuffer(screenshot.data) || screenshot.data.length === 0) {
        throw new Error('La capture PNG est absente.');
    }

    const baseName = validated.script.replace(/\.[^/.]+$/, '');
    const matches = await sheetManager.trouverOccurrencesBug(
        sheets,
        tableId,
        baseName,
        validated.dialogue
    );
    const channel = await client.channels.fetch(destinationChannelId);
    if (!channel || !channel.isTextBased()) {
        throw new Error('Le salon de destination des signalements est introuvable.');
    }

    const attachment = new AttachmentBuilder(screenshot.data, {
        name: screenshot.name || 'capture.png'
    });
    let content = `**Nouveau bug report**\n**Auteur :** ${validated.author}\n**Script :** \`${baseName}\`\n**Réplique :**\n> ${validated.dialogue.replace(/\n/g, '\n> ')}\n\n`;
    const components = [];

    if (matches.length > 0) {
        content += `✅ **Match exact trouvé (${matches.length} occurrence(s)) :**\n`;
        matches.slice(0, 10).forEach(match => {
            content += `- Feuille **${match.feuille}** (ligne ${match.ligne}) | *${match.perso}*\n`;
        });

        const fixButton = new ButtonBuilder()
            .setCustomId(`btn_fix_${baseName}`)
            .setLabel('Corriger ces lignes')
            .setStyle(ButtonStyle.Success)
            .setEmoji('✍️');
        components.push(new ActionRowBuilder().addComponents(fixButton));
    } else {
        content += '❌ **Aucun match exact trouvé.** (Réplique vide, tag caché ou erreur ?)\n🔎 Inspectez manuellement les feuilles liées :';
        const linkedSheets = await sheetManager.getFeuillesParNom(sheets, tableId, baseName);

        if (linkedSheets.length > 0) {
            const linkRow = new ActionRowBuilder();
            linkedSheets.slice(0, 5).forEach(sheet => {
                linkRow.addComponents(
                    new ButtonBuilder()
                        .setLabel(`Ouvrir ${sheet.nom}`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(sheet.lien)
                );
            });
            components.push(linkRow);
        } else {
            content += `\n⚠️ *Le script ${baseName} n'a pas été trouvé dans le Sommaire.*`;
        }
    }

    return channel.send({
        content: truncateDiscordContent(content),
        files: [attachment],
        components,
        allowedMentions: { parse: [] }
    });
}

module.exports = {
    legacyHttpReport,
    publishDebugReport,
    validateDebugReport
};
