const Database = require('better-sqlite3');
const db = new Database('LN.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS propositions (
        message_id TEXT PRIMARY KEY,
        texte TEXT,
        score INTEGER DEFAULT 0,
        sheet_id TEXT, -- NOUVEAU
        ligne INTEGER,  -- NOUVEAU
        user_id TEXT,
        couleur TEXT DEFAULT '#2F3136'
    );

    CREATE TABLE IF NOT EXISTS votes (
        message_id TEXT,
        user_id TEXT,
        valeur INTEGER,
        PRIMARY KEY (message_id, user_id)
    );
	CREATE TABLE IF NOT EXISTS mission_actuelle (
        id INTEGER PRIMARY KEY CHECK (id = 1), -- Force une seule ligne maximum
        sheet_id TEXT,
        nom_feuille TEXT,
		endroit TEXT,
        ligne TEXT,
        texte_jap TEXT,  
        texte_eng TEXT,   
        mission_message_id TEXT,
		nom_perso TEXT,
        context TEXT
    );
	CREATE TABLE IF NOT EXISTS validations (
        message_id TEXT PRIMARY KEY,
        texte TEXT,
        sheet_id TEXT,
        ligne INTEGER,
        votes_positifs INTEGER DEFAULT 0,
        votes_negatifs INTEGER DEFAULT 0,
        timestamp_debut INTEGER,
        user_id TEXT
    );
    
    CREATE TABLE IF NOT EXISTS votes_juges (
        message_id TEXT,
        juge_id TEXT,
        valeur TEXT, -- 'OK' ou 'REJET'
        PRIMARY KEY (message_id, juge_id)
    );

    CREATE TABLE IF NOT EXISTS users_stats (
        user_id TEXT PRIMARY KEY,
        xp INTEGER DEFAULT 0,
        total_soumissions INTEGER DEFAULT 0,
        victoires INTEGER DEFAULT 0,
        niveau INTEGER DEFAULT 1
    );
`);

console.log("✅ Base SQLite locale prête !");

module.exports = db;
