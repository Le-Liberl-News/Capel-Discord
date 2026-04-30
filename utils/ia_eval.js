const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const db = require('./db.js');
require('dotenv').config();
const { recupererLexique, recupererScript } = require('./sheetManager.js');

const genAI = new GoogleGenerativeAI(process.env.API_GEMINI);

async function evaluerProposition(client, sheets, messageDiscord, mission, textePropose, propositionId) {
    try {
        const lignesNumeriques = String(mission.ligne).split(',').map(l => parseInt(l.trim()));
        
        const lexique_string = await recupererLexique(sheets);
        const contexte_texte = await recupererScript(sheets, mission.sheet_id, lignesNumeriques);

        const promptSysteme = `
Donne un rapport HYPER SUCCINCT sous la forme d'une liste de toutes les fautes de syntaxe, de conjugaison, de grammaire, de ligatures, d'accords en restant purement factuel. Si la traduction est parfaite linguistiquement, tu le dis et tu t'arrêtes là sans développer.

BLOC ORIGINAL (Japonais) : 
"${mission.texte_jap}"

TRADUCTION PROPOSÉE (Bulles séparées par des tirets) : 
"${textePropose}"

CONSIGNE : Utilise le lexique suivant pour vérifier les termes propres à l'univers :
${lexique_string}

CONTEXTE : Voici le script entourant les répliques (cibles marquées par >>> CIBLE <<<) :
${contexte_texte}`;

        const model = genAI.getGenerativeModel({ model: "models/gemma-4-31b-it" });
        
        console.log(`[IA] Lancement de l'évaluation pour la proposition ${propositionId}...`);
        const reponseJSON = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: promptSysteme }] }],
            generationConfig: {
                thinkingConfig: { includeThoughts: true }
            }
        });

        let texteFinal = "";

        for (const part of reponseJSON.response.candidates[0].content.parts) {
            if (part.text) texteFinal = part.text.trim();
        }

        console.log(`[DEBUG-SQL] Tentative d'UPDATE sur message_id: ${propositionId}`);
        const result_db = db.prepare('UPDATE propositions SET gemma_eval = ? WHERE message_id = ?').run(texteFinal, String(propositionId));
        console.log(`[DEBUG-SQL] Lignes modifiées : ${result_db.changes}`);

        const ancienneRow = messageDiscord.components[0];
        const nouveauBouton = new ButtonBuilder()
            .setCustomId(`voir_rapport_${propositionId}`)
            .setLabel(`Langue`)
            .setStyle(ButtonStyle.Secondary);

        const rowMiseAJour = ActionRowBuilder.from(ancienneRow).addComponents(nouveauBouton);

        await messageDiscord.edit({ components: [rowMiseAJour] });

    } catch (err) { console.error("❌ Échec de l'évaluation IA :", err); }
}

module.exports = { evaluerProposition };
