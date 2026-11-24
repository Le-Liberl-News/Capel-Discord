// The testers' progress, relayed by the platform (plateforme/api/tester-presence.php) instead of a Discord message:
// a message notified its whole channel before Capel deleted it.
const { signedByPlatform } = require('./platformSignature');

function registerTesterPresenceWeb({ app, service, secretFile }) {
    app.post('/api/tester-presence', async (req, res) => {
        res.set('Cache-Control', 'no-store');
        try {
            if (!signedByPlatform(req, 'Tester', secretFile)) return res.status(401).json({ error: 'Signature invalide.' });
            await service.receiveAndAnnounce(req.body);
            return res.json({ ok: true });
        } catch (error) {
            console.error('[Présence testeurs] Progression rejetée :', error);
            return res.status(400).json({ error: 'Progression invalide.' });
        }
    });
}

module.exports = { registerTesterPresenceWeb };
