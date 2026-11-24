const test = require('node:test');
const assert = require('node:assert');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
// Only EmbedBuilder is taken from discord.js here.
const load = Module._load;
Module._load = function (name, ...rest) { return name === 'discord.js' ? { EmbedBuilder: class {} } : load.call(this, name, ...rest); };
const { registerTesterPresenceWeb } = require('../utils/testerPresenceWeb');
const { TesterPresenceService } = require('../utils/testerPresenceService');

test('a signed progress is recorded without Discord, a chapter announced once, anything else refused', async () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'presence-'));
    const secret = 'ab'.repeat(32), secretFile = path.join(folder, 'key');
    fs.writeFileSync(secretFile, secret);
    const announced = [];
    const service = new TesterPresenceService({ client: {}, onChapterCompleted: async ({ chapter }) => announced.push(chapter) });
    service.scheduleRefresh = () => {};
    let handler;
    registerTesterPresenceWeb({ app: { post: (route, f) => { assert.equal(route, '/api/tester-presence'); handler = f; } }, service, secretFile });
    const call = async (body, authorization) => {
        const res = { code: 200, set() {}, status(code) { this.code = code; return this; }, json() { return this; } };
        await handler({ headers: { authorization }, body }, res);
        return res.code;
    };
    const sign = expires => `Tester ${expires}.${crypto.createHmac('sha256', secret).update(`tester.${expires}`).digest('hex')}`;
    const soon = Math.floor(Date.now() / 1000) + 60;
    const body = { installationId: '12345678-1234-4234-8234-123456789abc', author: 'T', chapter: 4, stage: 8, checkpoint: 44, checkpointCount: 80 };
    assert.equal(await call(body, undefined), 401);
    assert.equal(await call(body, sign(soon - 3600)), 401);
    assert.equal(await call(body, sign(soon + 3600)), 401);
    assert.equal(service.testers.size, 0);
    assert.equal(await call({ ...body, installationId: 'x' }, sign(soon)), 400);
    assert.equal(await call(body, sign(soon)), 200);
    assert.equal(await call({ ...body, chapter: 5, stage: 1, checkpoint: 46 }, sign(soon)), 200);
    assert.equal(await call({ ...body, chapter: 5, stage: 1, checkpoint: 46 }, sign(soon)), 200);
    assert.deepEqual(announced, [4]);
    assert.equal([...service.testers.values()][0].checkpoint, 46);
});
