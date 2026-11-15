// The players' reviews sent from the installer (InstallateurLN), posted in the admins' channel with a button to publish
// each one and one to refuse it. The platform keeps them (plateforme/api/reviews-moderation.php): the Capel asks every
// minute for the pending reviews not posted yet, posts them, tells the platform, and sends the admins' decisions.
// Uses Capel's API token (PLATFORM_TOKEN). After an acceptance the message keeps a button to withdraw it; a refusal is final.
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const PLATFORM_URL = (process.env.PLATFORM_URL || 'https://leliberlnews.fr').replace(/\/+$/, '');
const PREFIX = 'avis-joueur:';
const COLOURS = { pending: 0xecd078, published: 0x5fc99a, rejected: 0xe88a96 };

function stars(rating) {
    const value = Math.max(0, Math.min(5, Number(rating) || 0));
    return '★'.repeat(value) + '☆'.repeat(5 - value);
}

function buttons(id, status) {
    const publish = new ButtonBuilder().setCustomId(`${PREFIX}published:${id}`).setLabel('Accepter').setStyle(ButtonStyle.Success);
    const reject = new ButtonBuilder().setCustomId(`${PREFIX}rejected:${id}`).setLabel('Refuser').setStyle(ButtonStyle.Danger);
    if (status === 'published') return [new ActionRowBuilder().addComponents(reject.setLabel('Retirer'))];
    // A refused review stays refused: no button left on it.
    if (status === 'rejected') return [];
    return [new ActionRowBuilder().addComponents(publish, reject)];
}

function embed(review) {
    const built = new EmbedBuilder()
        .setTitle(`Avis sur ${review.title}`)
        .setDescription(`**${review.author}** · ${stars(review.rating)}\n\n${String(review.text).slice(0, 3800)}`)
        .setColor(COLOURS.pending)
        .setFooter({ text: 'En attente · envoyé depuis l’installateur' })
        .setTimestamp(new Date(String(review.date).replace(' ', 'T')));
    if (review.banner) built.setThumbnail(review.banner);
    return built;
}

function createPlayerReviews({ client, channelId, token = process.env.PLATFORM_TOKEN, every = 60_000, fetch = globalThis.fetch, log = console.error }) {
    let busy = false;
    let warned = false;

    async function call(method, body) {
        const response = await fetch(`${PLATFORM_URL}/plateforme/api/reviews-moderation.php`, {
            method,
            headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'X-Platform-Token': token },
            body: body === undefined ? undefined : JSON.stringify(body),
            signal: AbortSignal.timeout(15_000),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
        return data;
    }

    // New reviews: posted, then marked as posted (a failed mark posts it again next time rather than never).
    async function tick() {
        if (!token || busy) return;
        busy = true;
        try {
            const { reviews = [] } = await call('GET');
            if (reviews.length) {
                const channel = await client.channels.fetch(channelId);
                for (const review of reviews) {
                    await channel.send({ embeds: [embed(review)], components: buttons(review.id, 'pending'), allowedMentions: { parse: [] } });
                    await call('POST', { action: 'announced', id: review.id });
                }
            }
            warned = false;
        } catch (error) {
            if (!warned) log('Avis des joueurs :', error.message);
            warned = true;
        } finally {
            busy = false;
        }
    }

    // A button of one of these messages: true when it was one.
    async function handle(interaction) {
        if (!interaction.isButton?.() || !interaction.customId.startsWith(PREFIX)) return false;
        const [status, rawId] = interaction.customId.slice(PREFIX.length).split(':');
        const id = Number(rawId);
        if (interaction.channelId !== channelId) {
            await interaction.reply({ content: 'Ces boutons ne marchent que dans le salon des admins.', ephemeral: true });
            return true;
        }
        await interaction.deferUpdate();
        const moderator = interaction.member?.displayName || interaction.user.globalName || interaction.user.username;
        try {
            await call('POST', { action: 'decide', id, status, moderator });
            const before = interaction.message.embeds[0];
            const updated = EmbedBuilder.from(before)
                .setColor(COLOURS[status])
                .setFooter({ text: status === 'published' ? `Publié par ${moderator}` : `Refusé par ${moderator}` });
            await interaction.editReply({ embeds: [updated], components: buttons(id, status) });
        } catch (error) {
            await interaction.followUp({ content: `La plateforme a refusé : ${error.message}`, ephemeral: true });
        }
        return true;
    }

    if (!token) log('Avis des joueurs : PLATFORM_TOKEN absent, les avis ne sont pas postés.');
    const timer = setInterval(tick, every);
    timer.unref?.();
    return { tick, handle, stop: () => clearInterval(timer) };
}

module.exports = { createPlayerReviews, embed, buttons, stars };
