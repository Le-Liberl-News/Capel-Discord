const db = require('../utils/db.js');
const { ajouterXP } = require('../utils/xpManager.js');
const { evaluerProposition } = require('../utils/ia_eval.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, WebhookClient } = require('discord.js');
const sheetManager = require('../utils/sheetManager.js');
const stringSimilarity = require('string-similarity');
const TABLE_ID = '1U3A84MvYYfhdDkJ8Oc8nxFJKlyeS0-Xk_7fl_SLBGYo';

const SALON_READONLY_ID = "1493171302624657428";

function couleurAleatoire() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}

module.exports = async function handleModals(interaction, sheets) {

    if (interaction.customId === 'modal_trad_groupe') {
        try {
            const [missions] = await db.query('SELECT * FROM mission_actuelle WHERE id = 1');
            if (!missions) throw new Error("Aucune mission active en BDD");
            const mission = missions[0];

            const userId = interaction.user.id;
            const lignes = String(mission.ligne).split(',');
            let textesSaisis = [];

            await interaction.reply({ content: "⏳ Enregistrement...", ephemeral: true });

            for (let i = 0; i < lignes.length; i++) {
                const contenu = interaction.fields.getTextInputValue(`bulle_${i}`);
                console.log(`>>> [DEBUG] Saisie Bulle ${i} : ${contenu ? "Reçue" : "VIDE"}`);

                if (!contenu || contenu.trim().length < 2) { 
                    console.log(`>>> [DEBUG] Erreur : Bulle ${i} trop courte`);
                    return interaction.editReply({ content: `❌ Bulle ${i + 1} invalide.` });
                }
                textesSaisis.push(contenu.trim());
            }

            const texteActuel = textesSaisis.join(' ');
            const [autresPropositions] = await db.query('SELECT texte FROM propositions');

            let objetStockage = {};
            lignes.forEach((numLigne, i) => {
                objetStockage[numLigne.trim()] = textesSaisis[i];
            });
            const jsonAStocker = JSON.stringify(objetStockage);

            for (const autreProposition of autresPropositions) {
                let ancienTexte = "";
                try { ancienTexte = Object.values(JSON.parse(autreProposition.texte)).join(' ');
                } catch (e) { ancienTexte = autreProposition.texte; }

                const ressemblance = stringSimilarity.compareTwoStrings(texteActuel, ancienTexte);
                if (ressemblance > 0.8) {
                    db.query(`INSERT INTO tentatives (user_id, texte) VALUES(?, ?) ON DUPLICATE KEY UPDATE texte = VALUES(texte)`, [userId, jsonAStocker]);
                    return interaction.editReply({
                        content: `❌ Proposition refusée : ressemblance trop forte avec une proposition précédente.\nSi tu en es l'auteur, modifie-la avec /edition. Sinon, discutes-en sur un des salons dédiés.`
                    });

                } else { db.query('DELETE FROM tentatives WHERE user_id = ?', [userId]); }
            }

            const texteComplet = textesSaisis.join('\n---\n');
            const targetChannel = await interaction.client.channels.fetch(SALON_READONLY_ID);

            const maintenant = new Date();
            const heureParis = new Date(maintenant.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }));
            const heure = heureParis.getHours();

            let row = null;
            if (heure >= 19 && heure < 22) {
                row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId('upvote').setStyle(ButtonStyle.Success).setLabel('👍')
                );
            }

            const couleur = couleurAleatoire();

            const embedProposition = new EmbedBuilder()
            .setColor(couleur)

            const publicMessage = await targetChannel.send({
                embeds: [embedProposition],
                reply: { messageReference: mission.mission_message_id, failIfNotExists: false },
                components: row ? [row] : []
            });

            console.log(">>> [DEBUG] Tentative d'insertion en BDD...");
            await db.query('INSERT INTO propositions (message_id, texte, score, sheet_id, ligne, user_id, couleur) VALUES (?, ?, 0, ?, ?, ?, ?)', [publicMessage.id, jsonAStocker, mission.sheet_id, mission.ligne, userId, couleur]);
            console.log(">>> [DEBUG] Insertion réussie");

            const [dejaSoumis_rows] = await db.query(`
                SELECT 1 FROM propositions 
                WHERE user_id = ? AND sheet_id = ? AND ligne = ? AND message_id != ? 
                LIMIT 1
            `, [userId, mission.sheet_id, mission.ligne, publicMessage.id]);
            const dejaSoumis = dejaSoumis_rows[0];

            let messageFinal = "✅ Ton bloc de propositions a été soumis !";

            if (!dejaSoumis) {
                await db.query(`
                    INSERT INTO users_stats (user_id, total_soumissions) VALUES (?, 1) 
                    ON DUPLICATE KEY UPDATE total_soumissions = total_soumissions + 1
                `, [userId]);

                await ajouterXP(userId, 20, interaction.client);
                messageFinal = "✅ Bloc soumis ! Tu as gagné **20 PB** ! 🎖️";
            }

            await interaction.editReply({ content: "✅ Bloc de propositions soumis avec succès !" });

            if (typeof sheets !== 'undefined') {
                console.log(">>> [DEBUG] Lancement de l'évaluation IA...");
                evaluerProposition(interaction.client, sheets, publicMessage, mission, texteComplet, publicMessage.id);
            } else {
                console.log(">>> [DEBUG] IA ignorée : variable 'sheets' non accessible dans index.js");
            }

        } catch (err) {
            console.error(">>> [CRITICAL ERROR] :", err.stack);
            if (interaction.replied || interaction.deferred) {
                await interaction.editReply({ content: "❌ Erreur : " + err.message });
            } else {
                await interaction.reply({ content: "❌ Crash : " + err.message, ephemeral: true });
            }
        }
    }

    if (interaction.customId.startsWith('modal_edit_groupe:')) {
        const ancienMessageId = interaction.customId.split(':')[1];

        try {
            const [mission_rows] = await db.query('SELECT * FROM mission_actuelle WHERE id = 1');
            const mission = mission_rows[0];
            if (!mission) throw new Error("Aucune mission active en BDD");

            await interaction.reply({ content: "⏳ Mise à jour...", ephemeral: true });

            const lignes = String(mission.ligne).split(',');
            let textesSaisis = [];

            for (let i = 0; i < lignes.length; i++) {
                const contenu = interaction.fields.getTextInputValue(`bulle_${i}`);
                if (!contenu || contenu.trim().length < 2) {
                    return interaction.editReply({ content: `❌ Bulle ${i + 1} invalide.` });
                }
                textesSaisis.push(contenu.trim());
            }

            const [propActuelle_rows] = await db.query('SELECT score, couleur, texte, texte_original FROM propositions WHERE message_id = ?', [ancienMessageId]);
            const propActuelle = propActuelle_rows[0];

            const texteActuel = textesSaisis.join(' ');
            const [autresPropositions] = await db.query('SELECT texte FROM propositions WHERE message_id <> ?', [ancienMessageId]);

            for (const autreProposition of autresPropositions) {
                let ancienTexte = "";
                try { ancienTexte = Object.values(JSON.parse(autreProposition.texte)).join(' ');
                } catch (e) { ancienTexte = autreProposition.texte; }

                const ressemblance = stringSimilarity.compareTwoStrings(texteActuel, ancienTexte);
                if (ressemblance > 0.8) {
                    return interaction.editReply({
                        content: `❌ Proposition refusée : ressemblance trop forte avec une autre proposition.\nSi tu n'en es pas l'auteur, n'hésite pas à en discuter sur un des salons dédiés.`
                    });
                }
            }

            const [votesExistants] = await db.query('SELECT COUNT(*) as total FROM votes WHERE message_id = ?', [ancienMessageId]);

            if (votesExistants[0].total > 0) {
                const texteReference = propActuelle.texte_original || propActuelle.texte;

                let ancienTexte = "";
                try { ancienTexte = Object.values(JSON.parse(texteReference)).join(' ');
                } catch (e) { ancienTexte = texteReference; }

                const ressemblance = stringSimilarity.compareTwoStrings(texteActuel, ancienTexte);

                if (ressemblance < 0.65) {
                    return interaction.editReply({
                        content: `❌ Modification refusée : ton texte est trop différent de l'original (similarité : ${Math.round(score * 100)}%). Seules les corrections mineures sont autorisées après réception d'un vote.`
                    });
                }
                if (!propActuelle.texte_original) {
                    await db.query('UPDATE propositions SET texte_original = ? WHERE message_id = ?', [propActuelle.texte, ancienMessageId]);
                }
            }

            let objetStockage = {};
            lignes.forEach ((numLigne, i) => {
                objetStockage[numLigne.trim()] = textesSaisis[i];
            });
            const jsonAStocker = JSON.stringify(objetStockage);

            const texteComplet = textesSaisis.join('\n---\n');

            await db.query('UPDATE propositions SET texte = ? WHERE message_id = ?', [jsonAStocker, ancienMessageId]);

            const targetChannel = await interaction.client.channels.fetch(SALON_READONLY_ID);
            const ancienMessage = await targetChannel.messages.fetch(ancienMessageId);

            const embedEdite = new EmbedBuilder()
                .setColor(propActuelle?.couleur || '#2F3136')
            await ancienMessage.edit({ embeds: [embedEdite] });

            await interaction.editReply({ content: "✅ Ta proposition a été mise à jour !" });

            if (typeof sheets !== 'undefined') {
                evaluerProposition(interaction.client, sheets, ancienMessage, mission, texteComplet, ancienMessageId);
            }

        } catch (err) {
            console.error(">>> [EDIT ERROR] :", err.stack);
            if (interaction.replied || interaction.deferred) {
                await interaction.editReply({ content: "❌ Erreur : " + err.message });
            } else {
                await interaction.reply({ content: "❌ Crash : " + err.message, ephemeral: true });
            }
        }
    }

    if (interaction.customId.startsWith('modal_save|')) {
        await interaction.deferReply({ ephemeral: false }); 

        const parts = interaction.customId.split('|');
        const feuille = parts[1];
        const ligne = parseInt(parts[2], 10);

        const nouvelleTrad = interaction.fields.getTextInputValue('input_trad_fr');

        try {
            const candidats = await sheetManager.getFeuillesParNom(sheets, TABLE_ID, feuille);
            if (candidats.length === 0) throw new Error("Feuille disparue.");
            const sheetId = candidats[0].id;

            await sheetManager.ecrireEtVerifier(sheets, sheetId, 'E', ligne, nouvelleTrad);

            console.log(`[CAPEL-LOG] Modification manuelle réussie : ${feuille} L${ligne}`);
            await interaction.editReply(`✅ **CORRECTION APPLIQUÉE** par <@${interaction.user.id}>\n📄 **Fichier :** ${feuille} (Ligne **${ligne}**)\n📝 ➔ \`${nouvelleTrad}\``);

        } catch (error) {
            console.error("❌ ERREUR ÉCRITURE MODALE :", error);
            await interaction.editReply("❌ **Échec de l'écriture.** Vérifiez l'intégrité de la liaison avec le serveur distant.");
        }
    }

    if (interaction.customId.startsWith('modal_fix_')) {
        const baseName = interaction.customId.split('_')[2];
        const nouvelleTrad = interaction.fields.getTextInputValue('new_translation');

        const messageContent = interaction.message.content;
        const repliqueOriginale = messageContent.split('💬 **Réplique :**\n> ')[1].split('\n')[0];

        await interaction.deferReply({ ephemeral: false });

        try {
            await sheetManager.updateTranslation(sheets, TABLE_ID, baseName, repliqueOriginale, nouvelleTrad);

            const revertButton = new ButtonBuilder()
                .setCustomId(`btn_revert_${baseName}`)
                .setLabel('Annuler (Remettre l\'original)')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('⏪');

            const row = new ActionRowBuilder().addComponents(revertButton);

            await interaction.message.edit({ components: [] });
            await interaction.editReply({
                content: `✨ Correction appliquée sur **${baseName}** par <@${interaction.user.id}>.\nNouveau texte : \`${nouvelleTrad}\``,
                components: [row]
            });

        } catch (error) {
            console.error("Erreur fix :", error);
            await interaction.editReply("❌ Erreur lors de l'application de la correction.");
        }
    }

    if (interaction.customId.startsWith('modal_anonyme_')) {
        const targetMessageId = interaction.customId.split('_')[2];
        const texte = interaction.fields.getTextInputValue('message_contenu');
        const { getPseudoAnonyme } = require('../commands/anonyme.js');

        await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

        const roleplayId = process.env.ROLEPLAY_ID;
        const isRoleplay = interaction.channelId === roleplayId;
        const threadId = isRoleplay ? roleplayId : process.env.THREAD_ID;
        const webhookUrl = isRoleplay ? process.env.WEBHOOK_ROLEPLAY_URL : process.env.WEBHOOK_URL;
        const webhook = new WebhookClient({ url: webhookUrl });

        const pseudo = await getPseudoAnonyme(interaction.user.id);

        const targetChannel = await interaction.client.channels.fetch(threadId);
        const targetMsg = await targetChannel.messages.fetch(targetMessageId);

        const lignesOriginales = targetMsg.content.split('\n');
        const texteFiltre = lignesOriginales
            .filter(ligne => !ligne.trim().startsWith('>'))
            .join(' ').replace(/\s+/g, ' ').trim();

        const extrait = (texteFiltre.substring(0, 100) || "...") + ((texteFiltre.length > 100) ? "..." : "");
        const auteurOriginal = targetMsg.author.username;
        const guildId = interaction.guildId;
        const messageUrl = `https://discord.com/channels/${guildId}/${threadId}/${targetMessageId}`;

        try {
            const payload = {
                content: `> [**${auteurOriginal}** : ${extrait}](${messageUrl})\n${texte}`,
                username: pseudo,
                avatarURL: `${process.env.BASE_URL}/pp/${encodeURIComponent(pseudo)}.webp`,
            };
            if (!isRoleplay) payload.threadId = threadId;

            await webhook.send(payload);
            await interaction.deleteReply();

        } catch (e) { console.error(e); }
    }
};
