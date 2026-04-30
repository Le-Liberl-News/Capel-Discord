const db = require('./db.js');
const SALON_VOTE_ID = "1492972991418732685";

async function createTheThread(client, name) {
    try {
        if (db.prepare('SELECT thread_id FROM mission_actuelle WHERE id = 1').get()) return console.log('Thread déjà actif.');
        const discu_channel = await client.channels.fetch(SALON_VOTE_ID);
        const thread = await discu_channel.threads.create({
            name: name,
            autoArchiveDuration: 1440
        });

        db.prepare('DELETE FROM pseudos_anonymes').run();
        db.prepare('UPDATE mission_actuelle SET thread_id = ? WHERE id = 1').run(thread.id);

        const roleId = "1027700058935795722"; // Rôle SC
        await thread.send(`<@&${roleId}>\n💬 *Ce thread est prévu pour des échanges anonymes sur la mission du jour.\nUtilisez \`/anonyme\` pour y communiquer incognito.*`);

    } catch (e) { console.error("Thread échoué :", e)}
}


module.exports = { createTheThread };
