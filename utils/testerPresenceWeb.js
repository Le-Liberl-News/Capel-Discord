// The testers' progress, relayed by the platform (plateforme/api/tester-presence.php) instead of a Discord message:
// a message notified its whole channel before Capel deleted it. Signed with the key shared with the site.
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

function registerTesterPresenceWeb({ app, service, secretFile = path.join(__dirname, '../.runtime/adventure-web.key'), now = Date.now }) {
    function signed(req) {
        const parts = String(req.headers.authorization || '').match(/^Tester (\d{10})\.([a-f0-9]{64})$/);
        if (!parts) return false;
        const secret = fs.readFileSync(secretFile, 'utf8').trim();
        const seconds = Math.floor(now() / 1000);
        if (!/^[a-f0-9]{64}$/.test(secret) || Number(parts[1]) < seconds || Number(parts[1]) > seconds + 300) return false;
        const expected = crypto.createHmac('sha256', secret).update(`tester.${parts[1]}`).digest();
        return crypto.timingSafeEqual(expected, Buffer.from(parts[2], 'hex'));
    }
    app.post('/api/tester-presence', async (req, res) => {
        res.set('Cache-Control', 'no-store');
        try {
            if (!signed(req)) return res.status(401).json({ error: 'Signature invalide.' });
            await service.receiveAndAnnounce(req.body);
            return res.json({ ok: true });
        } catch (error) {
            console.error('[Présence testeurs] Progression rejetée :', error);
            return res.status(400).json({ error: 'Progression invalide.' });
        }
    });
}

module.exports = { registerTesterPresenceWeb };
