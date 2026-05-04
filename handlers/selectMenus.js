const db = require('../utils/db.js');
const { ajouterXP } = require('../utils/xpManager.js');
const { ouvrirModaleEdit } = require('../commands/edit.js');
const SALON_READONLY_ID = "1493171302624657428";

module.exports = async function handleSelectMenus(interaction) {

    if (interaction.customId === 'remplacer_trad') {
        const oldMessageId = interaction.values[0];
        
        try {
            const targetChannel = await interaction.client.channels.fetch(SALON_READONLY_ID);
            const oldMsg = await targetChannel.messages.fetch(oldMessageId);
            if (oldMsg) await oldMsg.delete();
          
        } catch (e) { console.log("Ancien message déjà supprimé ou introuvable."); }
      
        await db.query('DELETE FROM propositions WHERE message_id = ?', [oldMessageId]);
      
        await interaction.update({
            content: "✅ Ancienne proposition supprimée !",
            components: [],
            ephemeral: true
        });
    }

    if (interaction.customId === 'selectionner_prop_edit') {
        const messageId = interaction.values[0];
        const [mission_rows] = await db.query('SELECT * FROM mission_actuelle WHERE id = 1');
        const mission = mission_rows[0];
        const [proposition_rows] = await db.query('SELECT * FROM propositions WHERE message_id = ?', [messageId]);
        const proposition = proposition_rows[0];

        if (!proposition || !mission) return interaction.reply({ content: "❌ Proposition introuvable.", ephemeral: true });
        await ouvrirModaleEdit(interaction, mission, proposition);
    }

    if (interaction.customId === 'selectionner_suppr') {
  	    const messageId = interaction.values[0];
  	    const [mission_rows] = await db.query('SELECT * FROM mission_actuelle WHERE id = 1');
  	    const mission = mission_rows[0];
  	    const [proposition_rows] = await db.query('SELECT * FROM propositions WHERE message_id = ?', [messageId]);
  	    const proposition = proposition_rows[0];
  	
  	    if (!proposition || !mission) return interaction.reply({ content: "❌ Proposition introuvable.", ephemeral: true });
		await interaction.update({ content: "🗑️ Suppression de la proposition", components: [] });
        await db.query('DELETE FROM propositions WHERE message_id = ?', [messageId]);
		await db.query('DELETE FROM votes WHERE message_id = ?', [messageId]);

        const [dejaSoumis_rows] = await db.query(`
            SELECT 1 FROM propositions 
            WHERE user_id = ? AND sheet_id = ? AND ligne = ? AND message_id != ? 
            LIMIT 1
		    `, [interaction.user.id, mission.sheet_id, mission.ligne, messageId]);
        const dejaSoumis = dejaSoumis_rows[0];
		
        if (!dejaSoumis) {
            await db.query(`
                INSERT INTO users_stats (user_id, total_soumissions) VALUES (?, 1) 
                ON DUPLICATE KEY UPDATE total_soumissions = total_soumissions - 1
            `, [interaction.user.id]);
            await ajouterXP(interaction.user.id, -20, interaction.client);
        }
		
        try {
            const targetChannel = await interaction.client.channels.fetch(SALON_READONLY_ID);
            const oldMsg = await targetChannel.messages.fetch(messageId);
            if (oldMsg) await oldMsg.delete();
          
        } catch (e) { console.log("Message déjà supprimé ou introuvable.");	}
    }
};
