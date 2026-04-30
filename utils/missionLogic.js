// utils/missionLogic.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const db = require('./db.js');
const { ajouterXP } = require('./xpManager.js');
const { trouverMissionDuJour, recupererLexique, recupererScript} = require('./sheetManager.js');
const { AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const cleanup = require('./cleanup.js');
const genAI = new GoogleGenerativeAI(process.env.API_GEMINI);
const SALON_READONLY_ID = "1493171302624657428";

async function declencherNouvelleMission(sheets, tableId, channelId) {
    console.log("🕵️ Recherche d'une nouvelle mission...");
    const mission = await trouverMissionDuJour(sheets, tableId);

    if (!mission) { return "❌ Fin du jeu : Absolument toutes les feuilles candidates sont déjà traduites à 100% !"; }

    
    const lignesArray = mission.bulle.lignes.split(',');
    const japsArray = mission.bulle.jap.split(' |BR| ');
    const engsArray = mission.bulle.eng.split(' |BR| ');
    console.log(`Mission trouvée (${lignesArray.length} bulles). Début de l'analyse orbale...`);

    let texteGemma = "⚠️ *L'analyse contextuelle est indisponible pour le moment.*";

    try {
        const lexique_string = await recupererLexique(sheets);
        const lignesNumeriques = lignesArray.map(l => parseInt(l.trim()));
        const contexte_texte = await recupererScript(sheets, mission.feuille.id, lignesNumeriques);

        const consignes_systeme = `
Tu es un expert en localisation de la série de JRPG 'Trails' (Kiseki).
Ta mission est de fournir du contexte à une équipe de traducteurs pour un groupe de répliques spécifique tiré au sort et prononcé par un même personnage de Trails in the Sky SC.

RÈGLE ABSOLUE : Tu dois impérativement utiliser ce lexique pour les termes spécifiques à l'univers :
${lexique_string}
Si un terme n'y est pas, laisse-le en anglais dans ton résumé.

Voici le script duquel sont tirées les répliques à analyser, qui sont encadrées par >>> CIBLE <<<.
${contexte_texte}

Tu dois répondre UNIQUEMENT sous cette forme, dans un court paragraphe, sans rien ajouter autre que des précisions sur le contexte. Pour le contexte, tu te bases UNIQUEMENT sur les informations données par le script japonais, l'anglais servant surtout pour les termes du lexique souvent plus en anglais qu'en japonais. Tu démarreras avec le titre suivant :

## Contexte spatio-temporel
(Analyse la scène : Où sommes-nous géographiquement dans le jeu ? À quel moment ou dans quelle situation précise ? Qui sont les acteurs en présence et quelle est l'ambiance de la conversation ?)
## Points importants JP vs EN
(Ici tu restes strictement factuel de façon à ne pas brider la créativité des traducteurs ou les biaiser. Dans cette partie, tu ne diras qu'un simple "Rien à signaler." sauf en cas de contradiction majeure entre le bloc de répliques japonaises et leur traduction anglaise, ou pour toute nouvelle information extrapolée par le script anglais, non présente dans le script japonais, il faudra avertir les traducteurs de rester prudents.)
`;

        const model = genAI.getGenerativeModel({ model: "models/gemma-4-31b-it" });
        
        console.log("Envoi du prompt à Gemma...");
        const result = await model.generateContent(consignes_systeme);
        texteGemma = result.response.text().trim();
        console.log("✅ Analyse Gemma terminée !");

    } catch (error) { console.error("❌ Erreur critique lors de l'appel à l'IA ou de la récupération des données :", error); }

    let textePropre = texteGemma;

    const indexDernierTitre = texteGemma.lastIndexOf('## Contexte spatio-temporel');

    if (indexDernierTitre !== -1) {
        textePropre = texteGemma.substring(indexDernierTitre).trim();
        console.log("✅ Raisonnement ignoré, récupération de la réponse finale.");
    } else { console.log("⚠️ Impossible de trouver le titre de section dans la réponse."); }

    texteGemma = textePropre;

    db.prepare(`
        INSERT INTO mission_actuelle (id, sheet_id, nom_feuille, endroit, ligne, texte_jap, texte_eng, nom_perso, context) 
        VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?) 
        ON CONFLICT(id) DO UPDATE SET 
        sheet_id = excluded.sheet_id, 
        nom_feuille = excluded.nom_feuille, 
        endroit = excluded.endroit, 
        ligne = excluded.ligne,
        texte_jap = excluded.texte_jap,
        texte_eng = excluded.texte_eng,
        nom_perso = excluded.nom_perso,
        context = excluded.context
    `).run(
        mission.feuille.id, 
        mission.feuille.nom, 
        mission.feuille.endroit, 
        mission.bulle.lignes,
        mission.bulle.jap, 
        mission.bulle.eng,
        mission.bulle.nom_perso,
        texteGemma
    );
    
    let blocTexteJapEng = "";
    lignesArray.forEach((ligne, i) => {
        blocTexteJapEng += `    - LIGNE ${ligne} -\n`;
        blocTexteJapEng += `>> JAP : ${japsArray[i].replaceAll("\n", "\n         ")}\n`;
        blocTexteJapEng += `>> ENG : ${engsArray[i].replaceAll("\n", "\n         ")}\n\n`;
    });

    const messagePrincipal = `\`\`\`text
      The Orbal Calculator
      CAPEL SYSTEM Ver.7.0
----------------------------------
 [FICHIER] : ${mission.feuille.nom}
 [ENDROIT] : ${mission.feuille.endroit}
 [LIGNES]  : ${mission.bulle.lignes}
----------------------------------
 [SUJET]   : ${mission.bulle.nom_perso}

${blocTexteJapEng}\`\`\`
    `;

    const premierJap = japsArray[0] || "";
    const motsJap = premierJap.replace(/\n/g, ' ').trim().split(/\s+/).slice(0, 10).join(' ');
    const nomThread = `${motsJap}…`;
    
    return {
        principal: messagePrincipal,
        nomThread: nomThread
    };
}

async function genererMessageRecap(client) {
    const mission = db.prepare('SELECT * FROM mission_actuelle WHERE id = 1').get();
    if (!mission) return null;

    const tops = db.prepare(`
        SELECT * FROM propositions 
        WHERE sheet_id = ? AND ligne = ?
        ORDER BY score DESC, message_id ASC 
        LIMIT 3
    `).all(mission.sheet_id, mission.ligne);

    const displayJap = mission.texte_jap.split(' |BR| ').map((t, i) => `    [${i+1}] ${t}`).join('\n');
    const displayEng = mission.texte_eng.split(' |BR| ').map((t, i) => `    [${i+1}] ${t}`).join('\n');

    let header = `\`\`\`text\n` +
                 `---------------------------------------\n` +
                 `      CLASSEMENT DES PROPOSITIONS\n` +
                 `---------------------------------------\n`;

    let body = "";
    if (tops.length === 0) {
        body = "  [!] AUCUNE DONNEE ENREGISTREE\n";
    } else {
        tops.forEach((p, index) => {
            const rang = index + 1;
            
            let texteAafficher = p.texte;
            try {
                const objetTrad = JSON.parse(p.texte);
                texteAafficher = Object.values(objetTrad)
                    .map((traduction, i) => `[${i+1}] ${traduction}`)
                    .join('\n');
            } catch (e) { texteAafficher = p.texte; }

            const texteIndente = texteAafficher.split('\n').map(l => `   ${l}`).join('\n');
            body += `  RANG ${rang} [SCORE: ${p.score}]\n${texteIndente}\n\n`;
        });
    }

    const footer = `---------------------------------------\n` +
                   ` END OF FILE\n` +
                   `\`\`\``;

    return header + body + footer;
}

async function cloreLeVoteActuel(client) {
    const mission = db.prepare('SELECT * FROM mission_actuelle WHERE id = 1').get();
    if (!mission) return "❌ Aucune mission en cours.";

    const recapFinal = await genererMessageRecap(client);
    const secretChannel = await client.channels.fetch(process.env.SECRET_CHANNEL_ID);
    const publicChannel = await client.channels.fetch(SALON_READONLY_ID);

    const topScore = db.prepare(`
        SELECT MAX(score) as maxScore FROM propositions
        WHERE sheet_id = ? AND ligne = ?
    `).get(mission.sheet_id, mission.ligne);

    if (!topScore || topScore.maxScore <= 0) {
        cleanup.clearButtons(client, mission.sheet_id, mission.ligne);
        return "❌ Aucune proposition valide. Mission annulée.";
    }
    
    const gagnantes = db.prepare(`
        SELECT * FROM propositions
        WHERE sheet_id = ? AND ligne = ? AND score = ?
    `).all(mission.sheet_id, mission.ligne, topScore.maxScore);
    
    const secondes = db.prepare(`
        SELECT user_id, MAX(score) as score FROM propositions
        WHERE sheet_id = ? AND ligne = ?
        GROUP BY user_id
    `).all(mission.sheet_id, mission.ligne);

    const inactifs = db.prepare(`
        SELECT user_id FROM users_stats
        WHERE user_id NOT IN (SELECT user_id FROM propositions WHERE sheet_id = ? AND ligne = ?)
        AND jours_consecutifs > 0
    `).all(mission.sheet_id, mission.ligne);

    const votants = db.prepare(`
        SELECT DISTINCT votes.user_id FROM votes
        JOIN propositions ON votes.message_id = propositions.message_id
        WHERE propositions.sheet_id = ? AND propositions.ligne = ?
    `).all(mission.sheet_id, mission.ligne);

    for (const votant of votants) {
        await ajouterXP(votant.user_id, 3, client);
    }

    db.prepare(`UPDATE users_stats SET resultats_du_jour = NULL`).run();
    for (const seconde of secondes) {
        const joursConsecutifs = db.prepare(`SELECT jours_consecutifs FROM users_stats WHERE user_id = ?`).get(seconde.user_id).jours_consecutifs;
        const consecutifXP = Math.max(Math.round(Math.pow(joursConsecutifs / 365, 1/5) * 70 - 19), 0);
        const voteXP = Math.round((1.2 * seconde.score) * (seconde.score + 5));
        await ajouterXP(seconde.user_id, voteXP + consecutifXP, client);
        db.prepare(`UPDATE users_stats SET jours_consecutifs = jours_consecutifs + 1 WHERE user_id = ?`).run(seconde.user_id);
        let messageXP = `Merci d'avoir envoyé une proposition de traduction aujourd'hui !\nTu as remporté ${ seconde.score } votes.\n`;
        if (seconde.score > 0) {
            if (seconde.score === topScore.maxScore) {
                messageXP += `Tu es en tête du classement, félicitations !\nTu gagnes ainsi ${voteXP} PB pour les ${seconde.score} votes que tu as reçus, ainsi que 20 PB pour ta victoire.\nDes points supplémentaires peuvent t'être attribués selon l'avis des juges.`;
            } else {
                messageXP += `Tu gagnes ${voteXP} PB pour les ${seconde.score} votes que tu as reçus !`;
            }
        } else {
            messageXP += "Tu n'a pas reçu de vote, malheureusement, mais n'hésite pas à retenter ta chance demain !\n";
        }
        if (joursConsecutifs > 0) {
            messageXP += `C'est par ailleurs ton ${joursConsecutifs + 1}ème jour consécutif à participer.\nTu reçois donc ${consecutifXP} PB en bonus.`
        }
        try { db.prepare(`UPDATE users_stats SET resultats_du_jour = ? WHERE user_id = ?`).run(messageXP, seconde.user_id);
        } catch (e) { console.error(`Echec de l'enregistrement du message de fin de journée.`, e.message, e.code); }
    }

    for (const inactif of inactifs) {
        db.prepare('UPDATE users_stats SET jours_consecutifs = 0 WHERE user_id = ?').run(inactif.user_id);
    }

    const dernierIdRow = db.prepare('SELECT MAX(id) AS maxId FROM palmares').get();
    let prochainId = (dernierIdRow && dernierIdRow.maxId ? dernierIdRow.maxId : 0) + 1;

    for (const gagnante of gagnantes) {
        db.prepare('INSERT INTO palmares (id, user_id) VALUES (?, ?)').run(prochainId, gagnante.user_id);
        prochainId++;
        
        let texteAffichageJuge = "";
        try {
            const dataTraduite = JSON.parse(gagnante.texte);

            Object.entries(dataTraduite).forEach(([ligne, trad], index) => {
                texteAffichageJuge += `**Bulle ${index + 1} (L.${ligne}) :**\n> ${trad}\n\n`;
            });
        } catch (e) { texteAffichageJuge = gagnante.texte; }
        
        const embedJuge = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle(`⚖️ Validation : ${mission.nom_feuille}`)
            .setDescription(`**La communauté a choisi ce bloc (Score: ${gagnante.score}) :**\n\n${texteAffichageJuge}`)
            .addFields(
                { name: 'Lignes concernées', value: `\`${mission.ligne}\``, inline: true },
                { name: 'Auteur', value: `<@${gagnante.user_id}>`, inline: true }
            )
            .setFooter({ text: "Action requise sous 24h." });
    
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('juge_ok').setLabel('Valider (✅)').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('juge_rejet').setLabel('Rejeter (❌)').setStyle(ButtonStyle.Danger)
        );
    
        const msgSecret = await secretChannel.send({ embeds: [embedJuge], components: [row] });
    
        await ajouterXP(gagnante.user_id, 20, client);
        db.prepare('UPDATE users_stats SET victoires = victoires + 1 WHERE user_id = ?').run(gagnante.user_id);
    
        db.prepare(`
            INSERT INTO validations (message_id, texte, sheet_id, ligne, timestamp_debut, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(msgSecret.id, gagnante.texte, mission.sheet_id, mission.ligne, Date.now(), gagnante.user_id);
    }

    let messageComplet = "";
    if (recapFinal) { messageComplet += "🏁 **FIN DES VOTES**\n" + recapFinal + "\n\n"; }
    messageComplet += "📢 **DÉCISION FINALE**\nLa meilleure proposition a été envoyée aux juges.";

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('resultats').setLabel('Voir mon XP du jour').setStyle(ButtonStyle.Success)
    );

    await publicChannel.send({ content: messageComplet, components: [row] });
    await cleanup.clearButtons(client, mission.sheet_id, mission.ligne);
}



module.exports = { declencherNouvelleMission, cloreLeVoteActuel,genererMessageRecap };
