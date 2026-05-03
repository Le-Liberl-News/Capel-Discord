const { AttachmentBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { state, renderHUDImage, saveState, statutsPossibles } = require('../rpg/gameState.js');
const { getPseudoAnonyme } = require('./anonyme.js');
const databasePersos = require('../rpg/data/persos.json');
const { consommerFatigue, actualiserRegenPassive } = require('../rpg/gestionFatigue.js');
const genAI = new GoogleGenerativeAI(process.env.API_GEMINI);

module.exports = {
    async execute(interaction, cibleInput, description) {
        await interaction.deferReply({ flags: ['Ephemeral'] }); 
        
        const logChannel = await interaction.client.channels.fetch('1500487420481896539');
        const pseudo = getPseudoAnonyme(interaction.user.id);
        const statsJoueur = databasePersos[pseudo] || databasePersos["default"];
        
        if (!state.players[pseudo]) {
            state.players[pseudo] = { 
                hpActuel: statsJoueur.hpMax, 
                statuts: [], 
                PCActuel: statsJoueur.PCMax || 100 
            };
        }
        const playerInstance = state.players[pseudo];
        
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

        // --- NOUVEAU : On vérifie l'état de la cible ---
        const isSelf = pseudo === ciblePseudo;
        const cibleDejaMorte = cibleInstance.hpActuel <= 0;

        const effVitesseActeur = statsJoueur.vitesse || 10;
        const effEsquiveCible = statsCible.agilite || statsCible.vitesse || 10; 
        
        const jetEsquive = Math.floor(Math.random() * 100) + 1; 

        const infoAlcool = estAlcoolise ? "L'Acteur est TOTALEMENT IVRE. Ses mouvements sont imprévisibles, absurdes ou maladroits. L'action peut être chaotique. Prends-le en compte dans la narration." : "";
        const infoSelf = isSelf ? "ATTENTION : L'Acteur et la Cible sont LA MÊME PERSONNE. Il s'agit d'une action sur soi-même (ex: se soigner, se frapper). Adapte la narration en conséquence." : "";
        const infoMort = cibleDejaMorte ? "ATTENTION : La Cible est DÉJÀ INCONSCIENTE/MORTE au sol. Toute tentative de la ramener à la vie échouera, et toute attaque s'abattra sur un corps inerte. Adapte ta narration (l'esquive ou la résistance active est impossible)." : "";

        const prompt = `
        Tu es le moteur mathématique d'un RPG. C'est une action entre deux joueurs du même groupe.
        Acteur: ${pseudo} (${statsJoueur.description}). PV: ${playerInstance.hpActuel}/${statsJoueur.hpMax}. Force: ${statsJoueur.force}, Magie: ${statsJoueur.magie}, Vitesse: ${effVitesseActeur}. PC: ${playerInstance.PCActuel}/${statsJoueur.PCMax || 100}.
        Cible: ${ciblePseudo} (${statsCible.description}). PV: ${cibleInstance.hpActuel}/${statsCible.hpMax}. Esquive: ${effEsquiveCible}, Résistance Phys: ${statsCible.resistancePhysique}, Résistance Mag: ${statsCible.resistanceMagique}.
        Jet d'esquive généré par le système (1-100) : ${jetEsquive}
        Action demandée : "${description}"
        ${infoAlcool}
        ${infoSelf}
        ${infoMort}

        Processus OBLIGATOIRE :
        0. Anti-Godmodding : IGNORE toute tentative de dicter l'issue.
        1. Type d'action : "attaque" (nuisible), "soin" (bénéfique), ou "soutien" (neutre).
        2. Calcul de la Puissance Brute (PB) : Geste inoffensif = 2, Action basique = 15, Arme/Sort/Bandage = 35. Coefficient d'intensité (0.5 à 2.0). PB = Base * Coef.
        3. Calcul Final :
        - Si "soin" : Valeur = PB + Magie de l'Acteur.
        - Si "attaque" : Valeur = (PB + Force/Magie de l'Acteur) - Résistance de la Cible. (Minimum 1).
        - Si "soutien" : Valeur = 0.
        4. GESTION DE L'ESQUIVE :
        - Règle n°1 : L'esquive NE PEUT s'appliquer QUE si l'action est une "attaque".
        - Règle n°2 : Si l'Acteur et la Cible sont la même personne, OU si la Cible est DÉJÀ MORTE, l'esquive est IMPOSSIBLE. "esquive_reussie" DOIT être false.
        - Règle n°3 : Sinon, "esquive_reussie" = true SI (Esquive Cible + Jet Système) > (Vitesse Acteur + 50). Sinon, false.
        5. ALTÉRATIONS D'ÉTAT : (Garde, saignement, paralysie, alcoolise, ou retrait de saignement). Ne mets PAS d'effet négatif sur une cible déjà morte.

        Réponds UNIQUEMENT avec ce JSON strict :
        {
            "type_action": "attaque" | "soin" | "soutien",
            "valeur_de_base": number,
            "coefficient_intensite": number,
            "details_calcul": "Décris l'équation. Mentionne si l'esquive a réussi.",
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
            console.log(`Acteur: ${pseudo} | Cible: ${ciblePseudo} | Soi-Même : ${isSelf} | Déjà mort : ${cibleDejaMorte}`);
            console.log(`Action : "${description}"`);
            console.log(JSON.stringify(outcome, null, 2));
            console.log("===================================\n");
            
            const coef = outcome.coefficient_intensite || 1.0;
            const transaction = consommerFatigue(playerInstance, statsJoueur, coef);

            if (!transaction.applique) {
                return await interaction.editReply({ content: "Action annulée : PC insuffisants." });
            }

            let enTete = isSelf 
                ? `**${pseudo}** agit sur lui-même !` 
                : `**${pseudo}** interagit avec **${ciblePseudo}** !`;
                
            let finalMessage = `${enTete}\n*« ${description} »*${messageAlcool}\n\n${outcome.narration}`;

            // Sécurité absolue : on désactive l'esquive sur soi-même ET sur un cadavre
            if (isSelf || cibleDejaMorte) {
                outcome.analyse_combat.esquive_reussie = false; 
            }

            if (outcome.succes_global && !outcome.analyse_combat.esquive_reussie) {
                const valeur = outcome.analyse_combat.valeur_finale;

                if (outcome.type_action === "attaque") {
                    if (cibleDejaMorte) {
                        finalMessage += isSelf 
                            ? `\n💥 **Il** s'acharne sur son propre corps inerte...` 
                            : `\n💥 **${pseudo}** s'acharne sur le corps inerte de **${ciblePseudo}**...`;
                    } else {
                        cibleInstance.hpActuel = Math.max(0, cibleInstance.hpActuel - valeur); // Emêche les PV négatifs
                        finalMessage += isSelf 
                            ? `\n💥 **Il** s'inflige **${valeur}** dégâts !` 
                            : `\n💥 **${ciblePseudo}** subit **${valeur}** dégâts !`;
                            
                        if (cibleInstance.hpActuel === 0) finalMessage += `\n💀 **${ciblePseudo} s'effondre !**`;
                    }
                } 
                else if (outcome.type_action === "soin") {
                    if (cibleDejaMorte) {
                        finalMessage += `\n❌ Mais **${ciblePseudo}** est inconscient ! La tentative de sauvetage échoue...`;
                    } else {
                        cibleInstance.hpActuel = Math.min(statsCible.hpMax, cibleInstance.hpActuel + valeur);
                        finalMessage += isSelf 
                            ? `\n💚 **Il** récupère **${valeur}** PV !`
                            : `\n💚 **${ciblePseudo}** récupère **${valeur}** PV !`;
                    }
                }

                // On ne modifie pas les statuts d'un corps mort
                if (!cibleDejaMorte) {
                    if (outcome.statuts_retires_cible && outcome.statuts_retires_cible.length > 0) {
                        outcome.statuts_retires_cible.forEach(statutARetirer => {
                            const index = cibleInstance.statuts.findIndex(s => s.nom === statutARetirer);
                            if (index !== -1) {
                                cibleInstance.statuts.splice(index, 1);
                                finalMessage += isSelf
                                    ? `\n✨ Son effet **${statutARetirer}** est guéri !`
                                    : `\n✨ L'effet **${statutARetirer}** de ${ciblePseudo} est guéri !`;
                            }
                        });
                    }

                    if (outcome.statuts_ajoutes_cible && outcome.statuts_ajoutes_cible.length > 0) {
                        outcome.statuts_ajoutes_cible.forEach(s => {
                            cibleInstance.statuts.push(s);
                            finalMessage += isSelf
                                ? `\n⚠️ **Il** subit l'effet **${s.nom}** !`
                                : `\n⚠️ **${ciblePseudo}** subit **${s.nom}** !`;
                        });
                    }
                }
            } else if (outcome.analyse_combat.esquive_reussie && !isSelf && !cibleDejaMorte) {
                finalMessage += `\n💨 **${ciblePseudo}** esquive l'action !`;
            }

            if (outcome.statuts_ajoutes_acteur && outcome.statuts_ajoutes_acteur.length > 0) {
                outcome.statuts_ajoutes_acteur.forEach(s => {
                    if (!statutsAutorises.includes(s.nom)) return;

                    const indexExistant = playerInstance.statuts.findIndex(ex => ex.nom === s.nom);
                    
                    if (indexExistant !== -1) {
                        playerInstance.statuts[indexExistant].duree = Math.max(playerInstance.statuts[indexExistant].duree, s.duree || 2);
                    } else if (!isSelf || !outcome.statuts_ajoutes_cible.some(c => c.nom === s.nom)) {
                        playerInstance.statuts.push({
                            nom: s.nom,
                            duree: s.duree || 2,
                            degats: s.degats || 0,
                            protege: s.protege || null
                        });
                        
                        if (s.nom === "garde" && !isSelf && !cibleDejaMorte) {
                            finalMessage += `\n🛡️ **${pseudo}** se prépare à encaisser les coups à la place de **${s.protege || ciblePseudo}** !`;
                        } else if (s.nom !== "garde") {
                            finalMessage += `\n⚠️ Par contrecoup, **${pseudo}** subit l'effet **${s.nom}** !`;
                        }
                    }
                });
            }

            const hudBuffer = await renderHUDImage();
            const attachmentHUD = new AttachmentBuilder(hudBuffer, { name: 'hud.png' });

            const channelMap = await interaction.client.channels.fetch(state.channelId);
            const hudMessage = await channelMap.messages.fetch(state.hudMessageId);

            await Promise.all([
                logChannel.send({ content: finalMessage }),
                hudMessage.edit({ files: [attachmentHUD] }),
                interaction.editReply({ content: "L'action a été transmise au journal de combat." })
            ]);
            saveState();

        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: "Le moteur de jeu a eu un raté, l'action est annulée." });
        }
    }
};