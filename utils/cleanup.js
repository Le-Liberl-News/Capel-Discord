const db = require('./db.js');


const SALON_READONLY_ID = "1493171302624657428";

async function clearButtons(client, sheet_id, ligne) {
    try {
        const propositions = db.prepare('SELECT message_id FROM propositions WHERE sheet_id = ? AND ligne = ?').all(sheet_id, ligne);
        if (propositions.length === 0) return;

        const salon = await client.channels.fetch(SALON_READONLY_ID);

        for (const prop of propositions) {
            try {
                const msg = await salon.messages.fetch(prop.message_id);
                // Éditer le message avec un tableau vide supprime tous les boutons
                await msg.edit({ components: [] });
            } catch (errMsg) { console.error(`[ClearButtons] Message ${prop.message_id} introuvable ou déjà supprimé.`); }
        }
    } catch (erreur) { console.error("❌ Erreur critique dans clearButtons :", erreur); }
}

async function purgeMission(sheetId, ligne, validationMessageId) {
    try {
        db.prepare('DELETE FROM mission_actuelle WHERE sheet_id = ? AND ligne = ?').run(sheetId, ligne);
        const props = db.prepare('SELECT message_id FROM propositions WHERE sheet_id = ? AND ligne = ?').all(sheetId, ligne);

        for (const p of props) {
            db.prepare('DELETE FROM votes WHERE message_id = ?').run(p.message_id);
        }

        db.prepare('DELETE FROM propositions WHERE sheet_id = ? AND ligne = ?').run(sheetId, ligne);

        if (validationMessageId) {
            db.prepare('DELETE FROM validations WHERE message_id = ?').run(validationMessageId);
            db.prepare('DELETE FROM votes_juges WHERE message_id = ?').run(validationMessageId);
        }
        console.log(`🧹 [CLEANUP] Nettoyage parfait pour la ligne ${ligne} !`);

    } catch (err) { console.error(`❌ [CLEANUP] Erreur lors du nettoyage :`, err); }
}

module.exports = {
clearButtons,
purgeMission
};
