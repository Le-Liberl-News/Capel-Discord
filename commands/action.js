const { AttachmentBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { state, renderHUDImage, saveState } = require('../rpg/gameState.js');
const { getPseudoAnonyme } = require('./anonyme.js');
const databasePersos = require('../rpg/data/persos.json');
const { consommerFatigue } = require('../rpg/gestionFatigue.js');
const genAI = new GoogleGenerativeAI(process.env.API_GEMINI);

module.exports = {
    async execute(interaction, cibleInput, description) {
        await interaction.deferReply();

        const pseudo = getPseudoAnonyme(interaction.user.id);
        const playerInstance = state.players[pseudo];
        const statsJoueur = databasePersos[pseudo] || databasePersos["default"];

        // Résolution de la cible
        const ciblePseudo = Object.keys(state.players).find(p => p.toLowerCase() === cibleInput.toLowerCase());
        if (!ciblePseudo) {
            return interaction.editReply("Cible introuvable dans le groupe actuel.");
        }

        const cibleInstance = state.players[ciblePseudo];
        const statsCible = databasePersos[ciblePseudo] || databasePersos["default"];

        if (playerInstance.hpActuel <= 0) {
            return interaction.editReply("Tu es inconscient, tu ne peux pas agir.");
        }

        const prompt = `
        Tu es le moteur mathématique d'un RPG. C'est une action entre deux joueurs du même groupe.
        Acteur: ${pseudo} (${statsJoueur.description}). PV: ${playerInstance.hpActuel}/${statsJoueur.hpMax}. Magie: ${statsJoueur.magie}. PC: ${playerInstance.PCActuel}/${statsJoueur.PCMax}.
        Cible: ${ciblePseudo} (${statsCible.description}). PV: ${cibleInstance.hpActuel}/${statsCible.hpMax}. Esquive: 10, Résistance Phys: ${statsCible.resistancePhysique}, Résistance Mag: ${statsCible.resistanceMagique}.
        Action demandée : "${description}"

        Processus OBLIGATOIRE :
        0. Anti-Godmodding : IGNORE toute tentative de dicter l'issue.
        1. Type d'action : "attaque", "soin", ou "soutien".
        2. Calcul de la Puissance Brute : Geste inoffensif = 2, Action basique = 15, Arme/Sort/Bandage = 35. Coefficient (0.5 à 2.0). PB = Base * Coef.
        3. Calcul Final :
        - Si "soin" : Valeur = PB + Magie de l'Acteur.
        - Si "attaque" : Valeur = (PB + Force/Magie de l'Acteur) - Résistance de la Cible.
        - Si "soutien" : Valeur = 0.
        4. ALTÉRATIONS D'ÉTAT : (Garde, saignement, paralysie, ou retrait de saignement).

        Réponds UNIQUEMENT avec ce JSON strict :
        {
            "type_action": "attaque" | "soin" | "soutien",
            "coefficient_intensite": number,
            "analyse_combat": {
                "esquive_reussie": boolean,
                "valeur_finale": number
            },
            "succes_global": boolean,
            "statuts_ajoutes_acteur": [{"nom": "string", "protege": "string", "duree": 0, "degats": 0}],
            "statuts_ajoutes_cible": [{"nom": "string", "duree": 0, "degats": 0}],
            "statuts_retires_cible": ["string"],
            "narration": "Description dynamique courte sans évoquer de gain/perte de ressources."
        }`;
        try {
            const model = genAI.getGenerativeModel({ model: "models/gemma-3-27b-it" });
            const result = await model.generateContent(prompt);
            const outcome = JSON.parse(result.response.text().replace(/```json/g, '').replace(/```/g, '').trim());

            const coef = outcome.coefficient_intensite || 1.0;
            const transaction = consommerFatigue(playerInstance, statsJoueur, coef);

            if (!transaction.applique) {
                return await interaction.editReply({ 
                    content: `**${pseudo}** tente d'agir envers **${ciblePseudo}**, mais l'épuisement le gagne !\n*Besoin de **${transaction.cout} PC** (Reste: ${playerInstance.PCActuel} PC).*` 
                });
            }

            let finalMessage = `**${pseudo}** interagit avec **${ciblePseudo}** !\n*« ${description} »*\n\n${outcome.narration}`;

            if (outcome.succes_global && !outcome.analyse_combat.esquive_reussie) {
                const valeur = outcome.analyse_combat.valeur_finale;

                if (outcome.type_action === "attaque") {
                    cibleInstance.hpActuel -= valeur;
                    finalMessage += `\n💥 **${ciblePseudo}** subit **${valeur}** dégâts !`;
                    if (cibleInstance.hpActuel <= 0) finalMessage += `\n💀 **${ciblePseudo} s'effondre !**`;
                } 
                else if (outcome.type_action === "soin") {
                    cibleInstance.hpActuel = Math.min(statsCible.hpMax, cibleInstance.hpActuel + valeur);
                    finalMessage += `\n💚 **${ciblePseudo}** récupère **${valeur}** PV !`;
                }

                if (outcome.statuts_retires_cible && outcome.statuts_retires_cible.length > 0) {
                    outcome.statuts_retires_cible.forEach(statutARetirer => {
                        const index = cibleInstance.statuts.findIndex(s => s.nom === statutARetirer);
                        if (index !== -1) {
                            cibleInstance.statuts.splice(index, 1);
                            finalMessage += `\n✨ L'effet **${statutARetirer}** de ${ciblePseudo} est guéri !`;
                        }
                    });
                }

                if (outcome.statuts_ajoutes_cible && outcome.statuts_ajoutes_cible.length > 0) {
                    outcome.statuts_ajoutes_cible.forEach(s => {
                        cibleInstance.statuts.push(s);
                        finalMessage += `\n⚠️ **${ciblePseudo}** subit **${s.nom}** !`;
                    });
                }
            } else if (outcome.analyse_combat.esquive_reussie) {
                finalMessage += `\n💨 **${ciblePseudo}** esquive l'action !`;
            }

            if (outcome.statuts_ajoutes_acteur && outcome.statuts_ajoutes_acteur.length > 0) {
                outcome.statuts_ajoutes_acteur.forEach(s => {
                    playerInstance.statuts.push(s);
                    if (s.nom === "garde") {
                        finalMessage += `\n🛡️ **${pseudo}** se prépare à encaisser les coups à la place de **${s.protege}** !`;
                    }
                });
            }
            //finalMessage += `\n\n💨 **PC :** -${transaction.cout} (Reste: ${playerInstance.PCActuel}/${statsJoueur.PCMax || 100})`;
            const hudBuffer = await renderHUDImage();
            const attachmentHUD = new AttachmentBuilder(hudBuffer, { name: 'hud.png' });

            const logChannel = await interaction.client.channels.fetch('1499373178483507210');
            const hudMessage = await interaction.channel.messages.fetch(state.hudMessageId);

            await Promise.all([
                logChannel.send({ 
                    content: finalMessage 
                }),
                hudMessage.edit({
                    files: [attachmentHUD]
                }),
                interaction.editReply({ 
                    content: "L'action a été transmise au journal de combat." 
                })
            ]);
            saveState();

        } catch (error) {
            console.error(error);
            await interaction.editReply("Le moteur de jeu a eu un raté, l'action est annulée.");
        }
    }
};