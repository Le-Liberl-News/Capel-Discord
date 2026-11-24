// The requests the platform relays to Capel on this machine are signed with the key they share.
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const SECRET_FILE = path.join(__dirname, '../.runtime/adventure-web.key');

// `Authorization: <scheme> <expires>.<HMAC of "<scheme in lower case>.<expires>">`, valid a few minutes.
function signedByPlatform(req, scheme, secretFile = SECRET_FILE, now = Date.now) {
    const parts = String(req.headers.authorization || '').match(/^(\w+) (\d{10})\.([a-f0-9]{64})$/);
    if (!parts || parts[1] !== scheme) return false;
    const secret = fs.readFileSync(secretFile, 'utf8').trim();
    const seconds = Math.floor(now() / 1000);
    if (!/^[a-f0-9]{64}$/.test(secret) || Number(parts[2]) < seconds || Number(parts[2]) > seconds + 300) return false;
    const expected = crypto.createHmac('sha256', secret).update(`${scheme.toLowerCase()}.${parts[2]}`).digest();
    return crypto.timingSafeEqual(expected, Buffer.from(parts[3], 'hex'));
}

module.exports = { signedByPlatform };
