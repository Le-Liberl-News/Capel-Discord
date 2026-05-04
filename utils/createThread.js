const db = require('./db.js');
const SALON_VOTE_ID = "1492972991418732685";

async function createTheThread(client, name) {
    try {
        const [check_exists] = await db.query('SELECT thread_id FROM mission_actuelle WHERE id = 1');
if (check_exists[0]) return console.log('Thread déjà actif.');
        const discu_channel = await client.channels.fetch(SALON_VOTE_ID);
        const thread = await discu_channel.threads.create({
            name: name,
            autoArchiveDuration: 1440
        });

        await db.query('DELETE FROM pseudos_anonymes');
        await db.query('UPDATE mission_actuelle SET thread_id = ? WHERE id = 1', [thread.id]);

        const roleId = "1027700058935795722"; // Rôle SC
        await thread.send(`<@&${roleId}>\n💬 *Ce thread est prévu pour des échanges anonymes sur la mission du jour.\nUtilisez \`/anonyme\` pour y communiquer incognito.*`);

    } catch (e) { console.error("Thread échoué :", e)}
}


module.exports = { createTheThread };
