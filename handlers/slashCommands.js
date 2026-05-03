const db = require('../utils/db.js');
const sheetManager = require('../utils/sheetManager.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const ROLES_AUTORISES = ["1306002617725353997", "1020694737725956106"];
const TABLE_ID = '1U3A84MvYYfhdDkJ8Oc8nxFJKlyeS0-Xk_7fl_SLBGYo';

module.exports = async function handleSlashCommands(interaction, sheets) {
    const { commandName, options, member } = interaction;

    if (commandName === 'trad') {
        const cmdTrad = require('../commands/trad.js');
        return cmdTrad.execute(interaction);
    }
    if (commandName === 'votes') {
        const cmdSuppr = require('../commands/votes.js');
        return cmdSuppr.execute(interaction);
    }
    if (commandName === 'profil') {
        const cmdProfil = require('../commands/profil.js');
        return cmdProfil.execute(interaction);
    }
    if (commandName === 'suppr') {
        const cmdSuppr = require('../commands/suppr.js');
        return cmdSuppr.execute(interaction);
    }
    if (commandName === 'edition') {
        const cmdEdit = require('../commands/edit.js');
        return cmdEdit.execute(interaction);
    }
    if (commandName === 'context') {
        const cmdContext = require('../commands/context.js');
        return cmdContext.execute(interaction, sheets);
    }
    if (commandName === 'lexique') {
        const cmdLexique = require('../commands/lexique.js');
        return cmdLexique.execute(interaction, sheets);
    }
    if (commandName === 'anonyme') {
        const cmdAnonyme = require('../commands/anonyme.js');
        return cmdAnonyme.execute(interaction);
    }
    if (commandName === 'kisekijesuis') {
        const cmdAnonyme = require('../commands/anonyme.js');
        return cmdAnonyme.monIdentite(interaction);
    }

    const commandesRestreintes = ['read', 'write', 'open', 'test1', 'runtrad', 'closetrad', 'init-rank', 'testmodal', 'generer-map', 'naviguer', 'attaque'];
    if (commandesRestreintes.includes(commandName)) {
        const hasPermission = member.roles.cache.some(role => ROLES_AUTORISES.includes(role.id));
        if (!hasPermission) {
            return interaction.reply({
                content: "❌ Accès refusé : tu dois être administrateur pour utiliser cette commande.",
                ephemeral: true
            });
        }
    }

    if (commandName === 'test1') {
        const cmdTest1 = require('../commands/test1.js');
        return cmdTest1.execute(interaction, sheets, TABLE_ID);
    }
    if (commandName === 'runtrad') {
        const cmdTest2 = require('../commands/test2.js');
        return cmdTest2.execute(interaction, sheets, TABLE_ID);
    }
    if (commandName === 'closetrad') {
        const cmdTest3 = require('../commands/test3.js');
        return cmdTest3.execute(interaction, interaction.client);
    }
    if (commandName === 'testmodal') {
        const cmdTestModal = require('../commands/testModal.js');
        return cmdTestModal.execute(interaction);
    }
    if (commandName === 'init-rank') {
        const cmdInitRank = require('../commands/init-rank.js');
        return cmdInitRank.execute(interaction);
    }
    if (commandName === 'actu-rank') {
        const cmdActuRank = require('../commands/actu-rank.js');
        return cmdActuRank.execute(interaction);
    }
    if (commandName === 'add-votes') {
        const cmdAddVotes = require('../commands/add_votes.js');
        return cmdAddVotes.execute(interaction);
    }
    if (commandName === 'creerthread') {
        const { createTheThread } = require('../utils/createThread.js');
        const name = db.prepare(`SELECT texte_jap FROM mission_actuelle WHERE id = 1`).get().texte_jap;
        return createTheThread(interaction.client, String(name).substring(0, 10));
    }
    if (commandName === 'read') {
        await interaction.deferReply({ ephemeral: false });
        const feuille = options.getString('feuille');
        const ligne = options.getInteger('ligne');

        try {
            const candidats = await sheetManager.getFeuillesParNom(sheets, TABLE_ID, feuille);
            if (candidats.length === 0) return interaction.editReply(`❌ Feuille \`${feuille}\` introuvable.`);

            const row = await sheetManager.lireLigne(sheets, candidats[0].id, ligne);
            const texteReponse = sheetManager.formaterLigneDiscord(row, ligne, feuille, interaction.user.id, false);

            const btnEdit = new ButtonBuilder()
            .setCustomId(`btn_edit|${feuille}|${ligne}`)
            .setLabel('Éditer la traduction')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('✏️');

            const rowAction = new ActionRowBuilder().addComponents(btnEdit);

            const payload = typeof texteReponse === 'string'
            ? { content: texteReponse, components: [rowAction] }
            : { ...texteReponse, components: [rowAction] };

            await interaction.editReply(payload);

        } catch (e) {
            console.error(e);
            interaction.editReply("❌ Erreur lors de la lecture.");
        }
    }

    if (commandName === 'write') {
        await interaction.deferReply({ ephemeral: false });
        const feuille = options.getString('feuille');
        const ligne = options.getInteger('ligne');
        const trad = options.getString('trad');

        try {
            const candidats = await sheetManager.getFeuillesParNom(sheets, TABLE_ID, feuille);
            if (candidats.length === 0) return interaction.editReply(`❌ Feuille \`${feuille}\` introuvable.`);

            const sheetId = candidats[0].id;
            const rowAvant = await sheetManager.lireLigne(sheets, sheetId, ligne);
            const texteAncien = rowAvant ? (rowAvant[4] || '*vide*') : '*vide*';

            await sheetManager.ecrireEtVerifier(sheets, sheetId, 'E', ligne, trad);

            const readButton = new ButtonBuilder()
            .setCustomId(`btn_read|${feuille}|${ligne}`)
            .setLabel('Lire les détails (JAP/ENG)')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🔎');

            const row = new ActionRowBuilder().addComponents(readButton);

            await interaction.editReply({
                content: `Mis à jour par <@${interaction.user.id}>\n**Feuille :** ${feuille} (Ligne **${ligne}**)\n\`${texteAncien}\` ➔ \`${trad}\``,
                components: [row]
            });

        } catch (e) { interaction.editReply(`❌ **Échec de l'écriture ou de la vérification :**\n> ${e.message}`); }
    }

    if (commandName === 'open') {
        const feuille = options.getString('feuille');
        const candidats = await sheetManager.getFeuillesParNom(sheets, TABLE_ID, feuille);

        if (candidats.length === 0) return interaction.reply({ content: `❌ Feuille \`${feuille}\` introuvable.`, ephemeral: false });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel(`Ouvrir ${candidats[0].nom}`)
            .setStyle(ButtonStyle.Link)
            .setURL(candidats[0].lien)
        );

        await interaction.reply({
            content: `🔗 <@${interaction.user.id}> a demandé l'accès rapide au script **${candidats[0].nom}** :`,
            components: [row],
            ephemeral: false
        });
    }

    if (commandName === 'generer-map') {
        const cmdGenMap = require('../commands/generer_layout.js');
        return cmdGenMap.execute(interaction);
    }
    if (commandName === 'naviguer') {
        const cmdNavigate = require('../commands/naviguer_map.js');
        const traj = options.getString('trajectoire');
        return cmdNavigate.execute(interaction, traj);
    }
    if (commandName === 'attaque') {
        const cmdAttack = require('../commands/attaque.js');
        const cible = options.getString('cible');
        const desc = options.getString('description');
        return cmdAttack.execute(interaction, cible, desc);
    }
};
