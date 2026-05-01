const { declencherNouvelleMission } = require('../utils/missionLogic.js');
const { AttachmentBuilder } = require('discord.js');
const db = require('../utils/db.js');
const { decouperTexte } = require('../utils/strings.js');

const ROLES_AUTORISES = [
    "1020694737725956106"
];
const SALON_READONLY_ID = "1493171302624657428";
const SALON_VOTE_ID = "1492972991418732685";

module.exports = {
    async execute(interaction, sheets, tableId) {
        const membreRoles = interaction.member.roles.cache;
        const estAutorise = ROLES_AUTORISES.some(roleId => membreRoles.has(roleId));
        if (!estAutorise) return interaction.reply({ content: "🛑 Tu n'as pas le rôle requis.", ephemeral: true });

        await interaction.deferReply({ ephemeral: true });

        try {
            const result = await declencherNouvelleMission(sheets, tableId, SALON_READONLY_ID);

            console.log(`[CAPEL-LOG] Redirection de la mission vers le salon : ${SALON_READONLY_ID}`);
            const targetChannel = await interaction.client.channels.fetch(SALON_READONLY_ID);
            
            const capelAvatar = new AttachmentBuilder('./capel.gif');
            
            if (typeof result === 'string') return targetChannel.send(result);

            await targetChannel.send({ files: [capelAvatar] });


            const missionMsg = await targetChannel.send({ content: result.principal });
            const discu_channel = await interaction.client.channels.fetch(SALON_VOTE_ID);
            const lienMission = `https://discord.com/channels/${interaction.guildId}/${SALON_READONLY_ID}/${missionMsg.id}`;

            const messageAnnonce = `\`\`\`text
    The Orbal Calculator
    CAPEL SYSTEM Ver.7.0
    COPYRIGHT C.T.Z.
    ----------------------------------
    [STATUT]  : NOUVELLE ENTREE DETECTEE
    [REQUETE] : SOUMISSIONS OUVERTES
    ----------------------------------\`\`\`
    **Cible localisée :**
    🔗 [Accéder au bloc de répliques du jour](${lienMission})

    **Fonctions système disponibles :**
    > \`/trad\`    : Transférer vos propositions dans la base de données.
    > \`/context\` : Extraire le script environnant et l'analyse de la situation.
    > (les autres commandes sont détaillées dans le message épinglé sur ce salon)

    *Bonne chance aux participants !*`;

            const tutoMsg = await discu_channel.send({ content: messageAnnonce });

            db.prepare('UPDATE mission_actuelle SET mission_message_id = ? WHERE id = 1').run(missionMsg.id);

            await interaction.editReply(`✅ Mission déployée avec succès dans <#${SALON_READONLY_ID}> !`);

        } catch (err) {
            const messageErreur = err.message || "Erreur inconnue";
            const erreurCourte = messageErreur.substring(0, 1900);

            try { await interaction.editReply("❌ Erreur Test 2 : " + erreurCourte);
            } catch (finalErr) { console.error("Impossible d'envoyer l'erreur à Discord, crash total."); }

            console.error("[CAPEL-ERREUR]", err);
        }
    }
};
