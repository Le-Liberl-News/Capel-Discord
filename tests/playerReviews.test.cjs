const test = require('node:test');
const assert = require('node:assert/strict');
process.env.NODE_PATH = [process.env.NODE_PATH, require('node:path').join(__dirname, '../../Capel-Discord/node_modules')].filter(Boolean).join(require('node:path').delimiter);
require('node:module').Module._initPaths();
const { createPlayerReviews } = require('../utils/playerReviews.js');

const CHANNEL = '1015201390244671498';

function platform(reviews) {
    const calls = [];
    const fetch = async (url, options) => {
        const body = options.body ? JSON.parse(options.body) : null;
        calls.push({ method: options.method, body, auth: options.headers.Authorization });
        const data = options.method === 'GET' ? { reviews: reviews.splice(0) } : { ok: true };
        return { ok: true, status: 200, json: async () => data };
    };
    return { calls, fetch };
}

test('posts each new review once, with its two buttons, then tells the platform', async () => {
    const sent = [];
    const client = { channels: { fetch: async id => { assert.equal(id, CHANNEL); return { send: async message => sent.push(message) }; } } };
    const server = platform([{ id: 7, project: 'sky-fc', title: 'Trails in the Sky FC', banner: null, author: 'Estelle', rating: 4, text: 'Super traduction !', date: '2026-11-14 18:00:00' }]);
    const reviews = createPlayerReviews({ client, channelId: CHANNEL, token: 'jeton', fetch: server.fetch, every: 1e9 });
    await reviews.tick();
    await reviews.tick();
    reviews.stop();
    assert.equal(sent.length, 1);
    const data = sent[0].embeds[0].toJSON();
    assert.match(data.title, /Trails in the Sky FC/);
    assert.match(data.description, /Estelle.*★★★★☆/s);
    const ids = sent[0].components[0].toJSON().components.map(button => button.custom_id);
    assert.deepEqual(ids, ['avis-joueur:published:7', 'avis-joueur:rejected:7']);
    assert.deepEqual(server.calls.filter(call => call.method === 'POST').map(call => call.body), [{ action: 'announced', id: 7 }]);
    assert.equal(server.calls[0].auth, 'Bearer jeton');
});

test('a click sends the decision with who clicked, and leaves one button to change it', async () => {
    const { embed, buttons } = require('../utils/playerReviews.js');
    const server = platform([]);
    const reviews = createPlayerReviews({ client: {}, channelId: CHANNEL, token: 'jeton', fetch: server.fetch, every: 1e9 });
    reviews.stop();
    const message = { embeds: [embed({ title: 'FC', author: 'A', rating: 5, text: 'Très bien fait.', date: '2026-11-14 18:00:00' }).toJSON()] };
    let edited = null;
    const interaction = {
        isButton: () => true, customId: 'avis-joueur:published:7', channelId: CHANNEL, message,
        member: { displayName: 'Twn' }, user: { username: 'twn' },
        deferUpdate: async () => {}, editReply: async value => { edited = value; }, followUp: async () => assert.fail('refused'),
    };
    assert.equal(await reviews.handle(interaction), true);
    assert.deepEqual(server.calls[0].body, { action: 'decide', id: 7, status: 'published', moderator: 'Twn' });
    assert.equal(edited.embeds[0].toJSON().footer.text, 'Publié par Twn');
    assert.deepEqual(edited.components[0].toJSON().components.map(button => button.custom_id), ['avis-joueur:rejected:7']);
    assert.equal(await reviews.handle({ isButton: () => true, customId: 'upvote' }), false);
    assert.ok(buttons(1, 'rejected'));
});

test('elsewhere than the admins channel, nothing is decided', async () => {
    const server = platform([]);
    const reviews = createPlayerReviews({ client: {}, channelId: CHANNEL, token: 'jeton', fetch: server.fetch, every: 1e9 });
    reviews.stop();
    let answer = null;
    await reviews.handle({ isButton: () => true, customId: 'avis-joueur:published:7', channelId: '1', reply: async value => { answer = value; } });
    assert.match(answer.content, /salon des admins/);
    assert.equal(server.calls.length, 0);
});
