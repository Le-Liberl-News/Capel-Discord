const mysql = require('mysql2/promise');
require('dotenv').config();
// Création du pool de connexions
const pool = mysql.createPool({
    host: '127.0.0.1', // On force l'IPv4 ici
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306, // Port standard interne
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