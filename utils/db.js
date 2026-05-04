const mysql = require('mysql2/promise');
require('dotenv').config();
// Création du pool de connexions
const pool = mysql.createPool({
    host: process.env.DB_HOST, // ou l'IP de ton serveur MySQL
    port: process.env.DB_PORT || 5009,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Optionnel : un petit test de connexion au démarrage
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connexion MySQL réussie !");
        connection.release();
    } catch (err) {
        console.error("❌ Erreur de connexion MySQL :", err);
    }
})();

module.exports = pool;