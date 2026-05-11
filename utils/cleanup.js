const db = require('./db.js');


const SALON_READONLY_ID = "1493171302624657428";

async function clearButtons(client, sheet_id, ligne) {
    try {
        db.query(`DELETE FROM tentatives`);
        const [propositions] = await db.query('SELECT message_id FROM propositions WHERE sheet_id = ? AND ligne = ?', [sheet_id, ligne]);
        if (propositions.length === 0) return;

        const salon = await client.channels.fetch(SALON_READONLY_ID);

        for (const prop of propositions) {
            try {
                const msg = await salon.messages.fetch(prop.message_id);
                await msg.edit({ components: [] });
            } catch (errMsg) { console.error(`[ClearButtons] Message ${prop.message_id} introuvable ou déjà supprimé.`); }
        }
    } catch (erreur) { console.error("❌ Erreur critique dans clearButtons :", erreur); }
}

async function purgeMission(sheetId, ligne, validationMessageId) {
    try {
        await db.query('DELETE FROM mission_actuelle WHERE sheet_id = ? AND ligne = ?', [sheetId, ligne]);
        const [props] = await db.query('SELECT message_id FROM propositions WHERE sheet_id = ? AND ligne = ?', [sheetId, ligne]);

        for (const p of props) {
            await db.query('DELETE FROM votes WHERE message_id = ?', [p.message_id]);
        }

        await db.query('DELETE FROM propositions WHERE sheet_id = ? AND ligne = ?', [sheetId, ligne]);

        if (validationMessageId) {
            await db.query('DELETE FROM validations WHERE message_id = ?', [validationMessageId]);
            await db.query('DELETE FROM votes_juges WHERE message_id = ?', [validationMessageId]);
        }
        console.log(`🧹 [CLEANUP] Nettoyage terminé pour la ligne ${ligne} !`);

    } catch (err) { console.error(`❌ [CLEANUP] Erreur lors du nettoyage :`, err); }
}

module.exports = {
clearButtons,
purgeMission
};
