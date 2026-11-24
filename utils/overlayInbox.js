// The overlay's bug reports and correction notices, relayed by the platform (plateforme/api/overlay-report.php)
// instead of raw Discord messages. Each one is written to disk before it is accepted, then published: a restart or
// a Discord failure never loses it.
const fs = require('node:fs');
const path = require('node:path');
const { signedByPlatform } = require('./platformSignature');

const ID = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
const FILES = { report: 64 * 1024, media: 20 * 1000 * 1000, save: 1024 * 1024 };

function createOverlayInbox({ ingress, folder, retryMs = 60_000, remembered = 500 }) {
    const donePath = path.join(folder, 'done.json');
    let done = [];
    try { done = JSON.parse(fs.readFileSync(donePath, 'utf8')); } catch { done = []; }
    const processing = new Set();
    let retryTimer = null;

    const known = id => ID.test(id) && (done.includes(id.toLowerCase()) || fs.existsSync(path.join(folder, id.toLowerCase())));

    function markDone(id) {
        done = [...done.filter(other => other !== id), id].slice(-remembered);
        fs.mkdirSync(folder, { recursive: true });
        fs.writeFileSync(`${donePath}.tmp`, JSON.stringify(done));
        fs.renameSync(`${donePath}.tmp`, donePath);
    }

    /** Checks an item and keeps it; an item sent twice is kept once. */
    function accept(kind, files) {
        const id = String(ingress.check(kind, files).id).toLowerCase();
        if (!ID.test(id)) throw new Error('Identifiant invalide.');
        if (known(id)) return id;
        const partial = path.join(folder, `.${id}.partial`);
        fs.rmSync(partial, { recursive: true, force: true });
        fs.mkdirSync(partial, { recursive: true });
        fs.writeFileSync(path.join(partial, 'kind'), kind);
        for (const name of Object.keys(FILES)) {
            if (files[name]) fs.writeFileSync(path.join(partial, name), files[name]);
        }
        fs.renameSync(partial, path.join(folder, id));
        return id;
    }

    async function publish(id) {
        const directory = path.join(folder, id);
        if (processing.has(id) || !fs.existsSync(directory)) return;
        processing.add(id);
        try {
            const files = {};
            for (const name of Object.keys(FILES)) {
                const file = path.join(directory, name);
                if (fs.existsSync(file)) files[name] = fs.readFileSync(file);
            }
            await ingress.publish(fs.readFileSync(path.join(directory, 'kind'), 'utf8'), files);
            markDone(id);
            fs.rmSync(directory, { recursive: true, force: true });
        } catch (error) {
            console.error(`[Rapports] ${id} non publié, nouvel essai dans une minute :`, error);
            if (!retryTimer) {
                retryTimer = setTimeout(() => { retryTimer = null; void publishPending(); }, retryMs);
                retryTimer.unref?.();
            }
        } finally {
            processing.delete(id);
        }
    }

    async function publishPending() {
        const entries = fs.existsSync(folder) ? fs.readdirSync(folder) : [];
        for (const id of entries.filter(name => ID.test(name))) await publish(id);
    }

    function register({ app, multer, secretFile }) {
        const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: FILES.media, files: 3, fields: 2 } })
            .fields(Object.keys(FILES).map(name => ({ name, maxCount: 1 })));
        app.post('/api/overlay-report', (req, res, next) => {
            res.set('Cache-Control', 'no-store');
            let signed = false;
            try { signed = signedByPlatform(req, 'Overlay', secretFile); } catch { signed = false; }
            return signed ? next() : res.status(401).json({ error: 'Signature invalide.' });
        }, (req, res, next) => upload(req, res, error => error
            ? res.status(400).json({ error: 'Envoi invalide.' }) : next()), (req, res) => {
            let id;
            try {
                const files = {};
                for (const [name, maximum] of Object.entries(FILES)) {
                    const data = req.files?.[name]?.[0]?.buffer;
                    if (data && data.length > maximum) throw new Error(`Fichier ${name} trop volumineux.`);
                    if (data?.length) files[name] = data;
                }
                id = accept(String(req.body?.kind || ''), files);
            } catch (error) {
                console.error('[Rapports] Envoi refusé :', error);
                return res.status(400).json({ error: error.message });
            }
            res.status(202).json({ ok: true });
            return void publish(id);
        });
    }

    return { accept, publish, publishPending, known, register };
}

module.exports = { createOverlayInbox };
