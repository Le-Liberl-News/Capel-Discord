const db = require('../utils/db.js');
const { ajouterXP } = require('../utils/xpManager.js');
const cleanup = require('../utils/cleanup.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const SALON_READONLY_ID = "1493171302624657428";

module.exports = async function handleButtons(interaction, sheets) {

    if (interaction.customId === 'upvote') {
        await interaction.deferUpdate();
        const messageId = interaction.message.id;
        const userId = interaction.user.id;
        let messageRetour = "";

        try {
            const [propositions] = await db.query('SELECT * FROM propositions WHERE message_id = ?', messageId);
            if (!propositions) return interaction.followUp({ content: "Cette proposition n'est plus dans la base.", ephemeral: true });
            const proposition = propositions[0];
            const [missionRows] = await db.query('SELECT * FROM mission_actuelle WHERE id = 1');
            const mission = missionRows[0] ? missionRows[0] : null;

            const [votePrecedent_rows] = await db.query('SELECT 1 FROM votes WHERE message_id = ? AND user_id = ?', [messageId, userId]);
            const votePrecedent = votePrecedent_rows[0];
            const [nombreVotes_rows] = await db.query(`
                SELECT votes.* FROM votes
                JOIN propositions ON votes.message_id = propositions.message_id
                WHERE votes.user_id = ?
                AND propositions.sheet_id = ?
                AND propositions.ligne = ?
                `, [userId, mission.sheet_id, mission.ligne]);
            const nombreVotes = nombreVotes_rows[0];
            let change = false;
      
            if (votePrecedent) {
                await db.query('DELETE FROM votes WHERE message_id = ? AND user_id = ?', [messageId, userId]);
                await db.query('UPDATE propositions SET score = score - 1 WHERE message_id = ?', [messageId]);
                messageRetour = "Ton vote a été retiré ! 🔙";
                change = true;
            } else {
                if (proposition.user_id === userId) {
                    messageRetour = "☝️ Interdit de voter pour sa propre proposition !";
                } else if (nombreVotes >= 3) {
                    messageRetour = "☝️ Maximum 3 votes simultanés ! Utilisez /votes pour retrouver vos votes actifs.";
                } else {
                    await db.query('INSERT INTO votes (message_id, user_id) VALUES (?, ?)', [messageId, userId]);
                    await db.query('UPDATE propositions SET score = score + 1 WHERE message_id = ?', [messageId]);
                    messageRetour = "Ton vote a été pris en compte ! 👍";
                    change = true;
                }
            }

            if (change) {
                const [scoreRows] = await db.query('SELECT score FROM propositions WHERE message_id = ?', [messageId]);
                const nouveauScore = scoreRows[0].score;
                const componentsActuels = interaction.message.components;

                const rowButtons = ActionRowBuilder.from(componentsActuels[0]);

                let texteAafficher = proposition.texte;
                try {
                    const objetTrad = JSON.parse(proposition.texte);
                    texteAafficher = Object.values(objetTrad).join('\n---\n');
                } catch (e) {
                    texteAafficher = proposition.texte;// Fallback de sécurité si ancienne version
                }

                const embedMisAJour = new EmbedBuilder()
                .setColor(proposition.couleur || '#2F3136')
                .setDescription(`${texteAafficher}\n### **Score actuel :** \`${nouveauScore}\``);

                await interaction.message.edit({
                    content: '',
                    embeds: [embedMisAJour],
                    components: [rowButtons]
                });
            }
            await interaction.followUp({ content: messageRetour, ephemeral: true });

        } catch (err) {
            console.error("Erreur bouton toggle :", err);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: "❌ Erreur interne lors du vote.", ephemeral: true });
            }
        }
    }
  
    if (interaction.customId.startsWith('voir_rapport_')) {
        const propId = interaction.customId.split('_')[2];
        const [data_rows] = await db.query('SELECT gemma_eval FROM propositions WHERE message_id = ?', [propId]);
        const data = data_rows[0];

        if (data && data.gemma_eval) {
            await interaction.reply({ 
                content: `### Évaluation du Capel\n\n${data.gemma_eval}`, 
                ephemeral: true 
            });
        } else {
            await interaction.reply({ content: "⚠️ Rapport en cours de génération ou indisponible.", ephemeral: true });
        }
    }
  
    if (interaction.customId === 'juge_ok' || interaction.customId === 'juge_rejet') {
        await interaction.deferUpdate();
        const val = interaction.customId === 'juge_ok' ? 'OK' : 'REJET';
        const msgId = interaction.message.id;

        const [dejaVote_rows] = await db.query('SELECT * FROM votes_juges WHERE message_id = ? AND juge_id = ?', [msgId, interaction.user.id]);
        const dejaVote = dejaVote_rows[0];
        if (dejaVote) return interaction.followUp({ content: "Tu as déjà voté, l'ami !", ephemeral: true });
        
        await db.query('INSERT INTO votes_juges (message_id, juge_id) VALUES (?, ?)', [msgId, interaction.user.id, val]);

        if (val === 'OK') {
            await db.query('UPDATE validations SET votes_positifs = votes_positifs + 1 WHERE message_id = ?', [msgId]);
        } else {
            await db.query('UPDATE validations SET votes_negatifs = votes_negatifs + 1 WHERE message_id = ?', [msgId]);
        }
    
        const [v_rows] = await db.query('SELECT * FROM validations WHERE message_id = ?', [msgId]);
        const v = v_rows[0];

        const estRejete = v.votes_negatifs >= 2;
        const estValide = v.votes_positifs >= 2;
        const estEgalite = v.votes_positifs >= 1 && v.votes_negatifs >= 1;
    
        if (estRejete || estValide || estEgalite) {
            try {
                await interaction.message.edit({ components: [] });
            } catch (e) {
                console.error("Impossible de supprimer les boutons :", e);
            }
            const [mission_rows] = await db.query('SELECT nom_feuille FROM mission_actuelle WHERE sheet_id = ? AND ligne = ?', [v.sheet_id, v.ligne]);
            const mission = mission_rows[0];
            const nomFeuille = mission ? mission.nom_feuille.trim() : 'Sheet1';
        
            try {
                if (estValide || estEgalite) {
                    if (estValide) await ajouterXP(v.user_id, 60, interaction.client);
                    if (estEgalite) await ajouterXP(v.user_id, 30, interaction.client);
        
                    const dataTraduite = JSON.parse(v.texte);
        
                    for (const [ligneExcel, texteTraduit] of Object.entries(dataTraduite)) {
                        await sheets.spreadsheets.values.update({
                            spreadsheetId: v.sheet_id,
                            range: `Sheet1!E${ligneExcel}`,
                            valueInputOption: 'USER_ENTERED',
                            requestBody: { values: [[texteTraduit]] }
                        });
                    }
                    console.log(`[JURY] Bloc validé et écrit pour ${v.user_id}.`);
        
                } else {
                    await interaction.message.edit({ 
                        content: "❌ **Traduction rejetée. Archivage des propositions en F...**", 
                        components: [], 
                        embeds: [] 
                    });
                    console.log(`[JURY] Proposition rejetée pour la ligne ${v.ligne}.`);
                }

                const lignesDuGroupe = String(v.ligne).split(',');
                for (const ligneUnique of lignesDuGroupe) {
                    const checkF = await sheets.spreadsheets.values.get({
                        spreadsheetId: v.sheet_id,
                        range: `Sheet1!F${ligneUnique}`,
                    });
                    let valeurExistanteF = (checkF.data.values && checkF.data.values[0][0]) ? checkF.data.values[0][0] : "";
                    const [toutesLesPropsJSON] = await db.query('SELECT texte FROM propositions WHERE sheet_id = ? AND ligne = ?', [v.sheet_id, v.ligne]);
                    let archivesLigne = [];
                    toutesLesPropsJSON.forEach(async p => {
                        const objet = JSON.parse(p.texte);
                        const texteBulle = objet[ligneUnique];
                                
                        if (estValide) {
                            const gagnanteObjet = JSON.parse(v.texte);
                            if (texteBulle !== gagnanteObjet[ligneUnique]) archivesLigne.push(texteBulle);
                        } else {
                            archivesLigne.push(texteBulle);
                        }
                    });
        
                    if (archivesLigne.length > 0) {
                        const blocArchives = archivesLigne.join('\n');
                        const separateur = valeurExistanteF ? "\n\n--- Nouvelles propositions ---\n" : "Propositions communautaires :\n";
                        const nouveauContenuF = `${valeurExistanteF}${separateur}${blocArchives}`;
                        await sheets.spreadsheets.values.update({
                            spreadsheetId: v.sheet_id,
                            range: `Sheet1!F${ligneUnique}`,
                            valueInputOption: 'USER_ENTERED',
                            requestBody: { values: [[nouveauContenuF]] }
                        });
                    }
                }

                const statusMsg = estValide  ? "validées et écrites en E" : estEgalite ? "écrites en E mais nécessitent correction" : "rejetées";
                await interaction.channel.send(`✅ Système : Groupe de lignes [${v.ligne}] ${statusMsg}. Archivage en F terminé.`);

                const [validationsRestantes] = await db.query(`
                    SELECT COUNT(*) as total FROM validations
                    WHERE sheet_id = ? AND ligne = ?
                `, [v.sheet_id, v.ligne]);

                if (validationsRestantes.total <= 1) {
                    await cleanup.clearButtons(interaction.client, v.sheet_id, v.ligne);
                    cleanup.purgeMission(v.sheet_id, v.ligne, v.message_id);
                } else {
                    await db.query('DELETE FROM validations WHERE message_id = ?', [v.message_id]);
                    await db.query('DELETE FROM votes_juges WHERE message_id = ?', [v.message_id]);
                    await interaction.channel.send(`✅ Décision enregistrée. ${validationsRestantes.total - 1} proposition(s) encore en attente de jugement.`);
                }
        
            } catch (e) {
                console.error("⚠️ ERREUR ORBALE :", e);
                await interaction.channel.send(`⚠️ Alerte : Échec de la synchronisation avec le Google Sheet.`);
            }
        } else {
            await interaction.followUp({ content: "Vote enregistré. En attente de la décision finale.", ephemeral: true });
        }
    }

    if (interaction.customId.startsWith('btn_fix_')) {
        const baseName = interaction.customId.split('_')[2];

        const modal = new ModalBuilder()
        .setCustomId(`modal_fix_${baseName}`)
        .setTitle(`Correction pour ${baseName}`);

        const textInput = new TextInputBuilder()
        .setCustomId('new_translation')
        .setLabel("Nouvelle traduction :")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(textInput));
        await interaction.showModal(modal);
    }
    if (interaction.customId.startsWith('btn_read|')) {
        const parts = interaction.customId.split('|');
        const feuille = parts[1];
        const ligne = parseInt(parts[2], 10);

        await interaction.deferReply({ ephemeral: true });

        try {
            const candidats = await sheetManager.getFeuillesParNom(sheets, TABLE_ID, feuille);
            if (candidats.length === 0) return interaction.editReply(`❌ Feuille \`${feuille}\` introuvable.`);

            const row = await sheetManager.lireLigne(sheets, candidats[0].id, ligne);
            const reponse = sheetManager.formaterLigneDiscord(row, ligne, feuille, interaction.user.id, false);

            await interaction.editReply(reponse);
        } catch (error) {
            console.error("Erreur bouton Read :", error);
            await interaction.editReply("❌ Erreur lors de la lecture des détails.");
        }
    }
    if (interaction.customId.startsWith('btn_edit|')) {
        const parts = interaction.customId.split('|');
        const feuille = parts[1];
        const ligne = parseInt(parts[2], 10);

        try {
            const candidats = await sheetManager.getFeuillesParNom(sheets, TABLE_ID, feuille);
            const row = await sheetManager.lireLigne(sheets, candidats[0].id, ligne);
            const texteActuel = (row && row[4]) ? row[4] : '';

            const modal = new ModalBuilder()
            .setCustomId(`modal_save|${feuille}|${ligne}`)
            .setTitle(`Correction : ${feuille} (L.${ligne})`);

            const textInput = new TextInputBuilder()
            .setCustomId('input_trad_fr')
            .setLabel("Traduction (FR)")
            .setStyle(TextInputStyle.Paragraph)
            .setValue(texteActuel)
            .setRequired(true);

            const rowModal = new ActionRowBuilder().addComponents(textInput);
            modal.addComponents(rowModal);
            await interaction.showModal(modal);

        } catch (error) {
            console.error("❌ ERREUR MODALE :", error);
            await interaction.reply({ content: "❌ Impossible d'ouvrir l'éditeur orbal.", ephemeral: true });
        }
    }

    if (interaction.customId.startsWith('btn_revert_')) { //Clic sur le bouton rouge "Annuler" -> Restaure l'original
        const baseName = interaction.customId.split('_')[2];

        const parentMessage = await interaction.channel.messages.fetch(interaction.message.reference.messageId);
        const repliqueOriginale = parentMessage.content.split('💬 **Réplique :**\n> ')[1].split('\n')[0];
        const tradAnnulee = interaction.message.content.split('Nouveau texte : `')[1].split('`')[0];

        await interaction.deferUpdate();

        try {
            await sheetManager.updateTranslation(sheets, TABLE_ID, baseName, tradAnnulee, repliqueOriginale);
            await interaction.editReply({
                content: `⏪ **Restauration effectuée**.\nLe texte original (\`${repliqueOriginale}\`) a été remis à la place de (\`${tradAnnulee}\`).`,
                components: []
            });

        } catch (error) { await interaction.followUp({ content: "❌ Impossible d'annuler.", ephemeral: true }); }
    }

    if (interaction.customId === 'resultats') {
        await interaction.deferUpdate();
        userId = interaction.user.id;
        const [resultats] = await db.query(`SELECT * FROM users_stats WHERE user_id = ?`, [userId]);
        if (!resultats.length < 1 || !resultats[0].resultats_du_jour) return interaction.followUp({ content: "Tu n'as pas proposé de traduction à la dernière mission ! (ou alors il y a un bug)", ephemeral: true });
        await interaction.followUp({ content : resultats[0].resultats_du_jour, ephemeral: true});
    }
}
