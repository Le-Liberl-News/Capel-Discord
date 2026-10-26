// The roleplay characters' hit points (the Liberl defence takes them, the avatar turns "_ko" below a fifth), kept in
// .runtime/joueurs.json. They used to live in the retired dungeon's map_state.json: read from there once, if present.
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../.runtime/joueurs.json');
const LEGACY = path.join(__dirname, 'map_state.json');

function load() {
    for (const file of [FILE, LEGACY]) {
        try { if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8')).players ?? {}; }
        catch (error) { console.error('Points de vie des personnages illisibles :', error.message); }
    }
    return {};
}

const state = { players: load() };

function saveState() {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.writeFileSync(FILE + '.tmp', JSON.stringify({ players: state.players }));
    fs.renameSync(FILE + '.tmp', FILE);
}

module.exports = { state, saveState };
