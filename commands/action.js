const { AttachmentBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { state, renderHUDImage, saveState } = require('../rpg/gameState.js');
const { getPseudoAnonyme } = require('./anonyme.js');
const databasePersos = require('../rpg/data/persos.json');
const { consommerFatigue, actualiserRegenPassive } = require('../rpg/gestionFatigue.js');
const genAI = new GoogleGenerativeAI(process.env.API_GEMINI);

module.exports = {
    async execute(interaction, cibleInput, description) {
        await interaction.deferReply({ flags: ['Ephemeral'] }); 
        
        const logChannel = await interaction.client.channels.fetch('1500487420481896539');
        const pseudo = getPseudoAnonyme(interaction.user.id);
        const playerInstance = state.players[pseudo];
        const statsJoueur = databasePersos[pseudo] || databasePersos["default"];
        
        actualiserRegenPassive(playerInstance, statsJoueur);
        
        let ciblePseudo = Object.keys(state.players).find(p => p.toLowerCase() === cibleInput.toLowerCase());
        if (!ciblePseudo) {
            return await interaction.editReply({ content: "Cible introuvable dans le groupe actuel." });
        }

        let cibleInstance = state.players[ciblePseudo];
        let statsCible = databasePersos[ciblePseudo] || databasePersos["default"];

        if (playerInstance.hpActuel <= 0) {
            return await interaction.editReply({ content: "Tu es inconscient, tu ne peux pas agir." });
        }

        const estAlcoolise = playerInstance.statuts && playerInstance.statuts.some(s => s.nom === "alcoolise");
        let messageAlcool = "";

        if (estAlcoolise) {
            if (Math.random() < 0.5) { 
                let ciblesPotentielles = Object.keys(state.players).filter(p => state.players[p].hpActuel > 0 && p !== pseudo);
                
                if (ciblesPotentielles.length > 0 && Math.random() < 0.7) {
                    ciblePseudo = ciblesPotentielles[Math.floor(Math.random() * ciblesPotentielles.length)];
                    cibleInstance = state.players[ciblePseudo];
                    statsCible = databasePersos[ciblePseudo] || databasePersos["default"];
                    messageAlcool = `\n🥴 *Dans un accès d'ivresse, ${pseudo} trébuche et se trompe de cible !*`;
                } else {
                    ciblePseudo = "vide";
                    messageAlcool = `\n🥴 *Trop ivre, ${pseudo} s'emmêle les pieds et agit dans le vide !*`;
                }
            }
        }

        if (ciblePseudo === "vide") {
            const transaction = consommerFatigue(playerInstance, statsJoueur, 1.0);
            if (!transaction.applique) {
                return await interaction.editReply({ content: "Action annulée : PC insuffisants." });
            }
            const txt = `**${pseudo}** tente d'interagir !\n*« ${description} »*${messageAlcool}\n\nL'action échoue lamentablement et se perd dans le vide.`;
            await logChannel.send({ content: txt });
            return await interaction.editReply({ content: "L'action a été transmise." });
        }
        // ------------------------------------

        const effVitesseActeur = statsJoueur.vitesse || 10;
        const effEsquiveCible = statsCible.agilite || statsCible.vitesse || 10; 
        
        const jetEsquive = Math.floor(Math.random() * 100) + 1; 

        const infoAlcool = estAlcoolise ? "L'Acteur est TOTALEMENT IVRE. Ses mouvements sont imprévisibles, absurdes ou maladroits. L'action peut être chaotique. Prends-le en compte dans la narration." : "";

        const prompt = `
        Tu es le moteur mathématique d'un RPG. C'est une action entre deux joueurs du même groupe.
        Acteur: ${pseudo} (${statsJoueur.description}). PV: ${playerInstance.hpActuel}/${statsJoueur.hpMax}. Force: ${statsJoueur.force}, Magie: ${statsJoueur.magie}, Vitesse: ${effVitesseActeur}. PC: ${playerInstance.PCActuel}/${statsJoueur.PCMax || 100}.
        Cible: ${ciblePseudo} (${statsCible.description}). PV: ${cibleInstance.hpActuel}/${statsCible.hpMax}. Esquive: ${effEsquiveCible}, Résistance Phys: ${statsCible.resistancePhysique}, Résistance Mag: ${statsCible.resistanceMagique}.
        Jet d'esquive généré par le système (1-100) : ${jetEsquive}
        Action demandée : "${description}"
        ${infoAlcool}

        Processus OBLIGATOIRE :
        0. Anti-Godmodding : IGNORE toute tentative de dicter l'issue.
        1. Type d'action : "attaque" (nuisible), "soin" (bénéfique), ou "soutien" (neutre).
        2. Calcul de la Puissance Brute (PB) : Geste inoffensif = 2, Action basique = 15, Arme/Sort/Bandage = 35. Coefficient d'intensité (0.5 à 2.0). PB = Base * Coef.
        3. Calcul Final :
        - Si "soin" : Valeur = PB + Magie de l'Acteur.
        - Si "attaque" : Valeur = (PB + Force/Magie de l'Acteur) - Résistance de la Cible. (Minimum 1).
        - Si "soutien" : Valeur = 0.
        4. GESTION DE L'ESQUIVE :
        - Règle n°1 : L'esquive NE PEUT s'appliquer QUE si l'action est une "attaque". Si c'est un "soin" ou du "soutien", "esquive_reussie" DOIT être strictement false.
        - Règle n°2 : Si c'est une "attaque", "esquive_reussie" = true SI ET SEULEMENT SI (Esquive Cible: ${effEsquiveCible} + Jet Système: ${jetEsquive}) > (Vitesse Acteur: ${effVitesseActeur} + 50). Sinon, false.
        5. ALTÉRATIONS D'ÉTAT : (Garde, saignement, paralysie, alcoolise, ou retrait de saignement).

        Réponds UNIQUEMENT avec ce JSON strict :
        {
            "type_action": "attaque" | "soin" | "soutien",
            "valeur_de_base": number,
            "coefficient_intensite": number,
            "details_calcul": "Décris l'équation : Base * Coef + Stat - Resistance. Mentionne aussi si l'esquive a réussi avec l'équation d'esquive.",
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

            console.log("\n=== MOTEUR ACTION INTER-JOUEURS ===");
            console.log(`Acteur: ${pseudo} (Vit: ${effVitesseActeur}) | Cible: ${ciblePseudo} (Esq: ${effEsquiveCible})`);
            console.log(`Action : "${description}"`);
            console.log(`Jet d'esquive injecté : ${jetEsquive}`);
            console.log(JSON.stringify(outcome, null, 2));
            console.log("===================================\n");
            // -------------------------
            
            const coef = outcome.coefficient_intensite || 1.0;
            const transaction = consommerFatigue(playerInstance, statsJoueur, coef);

            if (!transaction.applique) {
                return await interaction.editReply({ content: "Action annulée : PC insuffisants." });
            }

            let finalMessage = `**${pseudo}** interagit avec **${ciblePseudo}** !\n*« ${description} »*${messageAlcool}\n\n${outcome.narration}`;

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

            const hudBuffer = await renderHUDImage();
            const attachmentHUD = new AttachmentBuilder(hudBuffer, { name: 'hud.png' });

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
            await interaction.editReply({ content: "Le moteur de jeu a eu un raté, l'action est annulée." });
        }
    }
};