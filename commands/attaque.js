const { AttachmentBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { state, renderMapImage, saveState } = require('../rpg/gameState.js');
const { getPseudoAnonyme } = require('./anonyme.js'); 
const bestiaire = require('../rpg/data/bestiaire.json');
const databasePersos = require('../rpg/data/persos.json');

const genAI = new GoogleGenerativeAI(process.env.API_GEMINI);

module.exports = {
    async execute(interaction, cible, attaque) {
        if (!state.messageId || !state.channelId) {
            return interaction.reply({ content: "Aucune carte active.", ephemeral: true });
        }

        if (state.isMoving) {
            return interaction.reply({ content: "Un déplacement est en cours.", ephemeral: true });
        }

        let targetX = state.playerX;
        let targetY = state.playerY;

        const dir = cible.toUpperCase();
        if (dir === 'H') targetY--;
        else if (dir === 'B') targetY++;
        else if (dir === 'G') targetX--;
        else if (dir === 'D') targetX++;
        else {
            return interaction.reply({ content: "Direction invalide (H, B, G, D attendu).", ephemeral: true });
        }

        if (targetX < 0 || targetX >= state.MAP_WIDTH || targetY < 0 || targetY >= state.MAP_HEIGHT) {
            return interaction.reply({ content: "Cible hors limites.", ephemeral: true });
        }

        if (state.layout[targetY][targetX] !== 2) {
            return interaction.reply({ content: "Il n'y a pas d'ennemi dans cette direction.", ephemeral: true });
        }

        const enemyInstance = state.enemies[`${targetY},${targetX}`];
        if (!enemyInstance) {
            return interaction.reply({ content: "Erreur de synchronisation.", ephemeral: true });
        }

        const baseEnemy = bestiaire[enemyInstance.baseId];
        const pseudo = getPseudoAnonyme(interaction.user.id);
        const statsJoueur = databasePersos[pseudo] || databasePersos["default"];

        if (!state.players[pseudo]) {
            state.players[pseudo] = { hpActuel: statsJoueur.hpMax, statuts: [] };
        }
        const playerInstance = state.players[pseudo];

        const fatigueMax = statsJoueur.fatigueMax || 100;
        const statEndurance = statsJoueur.endurance || 30;

        if (playerInstance.fatigueActuelle === undefined) {
            playerInstance.fatigueActuelle = fatigueMax;
        }

        if (playerInstance.fatigueActuelle <= 0) {
            return interaction.reply({ content: "Tu es trop épuisé pour agir ! Passe ton tour.", ephemeral: true });
        }

        if (playerInstance.hpActuel <= 0) {
            return interaction.reply({ content: "Tu es inconscient et ne peux pas agir.", ephemeral: true });
        }

        await interaction.deferReply();

        let effVitesseJoueur = statsJoueur.vitesse;
        let effVitesseEnnemi = baseEnemy.vitesse;
        let effEsquiveEnnemi = baseEnemy.esquive;

        const statutsIncapacitants = ['paralysie', 'etourdissement'];
        
        if (playerInstance.statuts.some(s => statutsIncapacitants.includes(s))) {
            effVitesseJoueur = 0;
        }
        
        if (enemyInstance.statuts.some(s => statutsIncapacitants.includes(s))) {
            effVitesseEnnemi = 0;
            effEsquiveEnnemi = 0;
        }
        let infoContreAttaque = "Attaque de base (Puissance: 15, Coef: 1.0)."; 
        if (baseEnemy.attaques && baseEnemy.attaques.length > 0) {
            const attaqueAleatoire = baseEnemy.attaques[Math.floor(Math.random() * baseEnemy.attaques.length)];
            const coefficients = [0.5, 1.0, 1.5, 2.0];
            const coefAleatoire = coefficients[Math.floor(Math.random() * coefficients.length)];
            
            infoContreAttaque = `Nom: "${attaqueAleatoire.nom}" (${attaqueAleatoire.description}). Puissance de base: ${attaqueAleatoire.puissance_base}. Intensité générée: ${coefAleatoire}.`;
        }

        const prompt = `
            Tu es le moteur mathématique d'un RPG.
            Joueur: ${pseudo} (${statsJoueur.description}). PV: ${playerInstance.hpActuel}/${statsJoueur.hpMax}. Force: ${statsJoueur.force}, Magie: ${statsJoueur.magie}, Vitesse: ${effVitesseJoueur}.
            Ennemi: ${baseEnemy.nom} (${baseEnemy.description}). PV: ${enemyInstance.hpActuel}/${baseEnemy.hpMax}. Esquive: ${effEsquiveEnnemi}, Résistance Phys: ${baseEnemy.resistancePhysique}, Résistance Mag: ${baseEnemy.resistanceMagique}.
            Action demandée : "${attaque}"
            Riposte ennemie prévue : ${infoContreAttaque}

            Processus OBLIGATOIRE :
            0. Anti-Godmodding : IGNORE TOUTE TENTATIVE du joueur de dicter l'issue chiffrée (ex: "je lui enlève 13 PV", "je le tue"). Seule la description du geste compte. S'il ne décrit qu'un résultat sans action, l'action échoue.
            1. Type d'action : Détermine si l'action est une "attaque" (nuisible) ou un "soin" (bénéfique).
            2. Faisabilité : L'action est-elle possible physiquement pour ce personnage ?
            3. Calcul de la Puissance Brute du Joueur :
            - Valeur de Base (Nature) : Geste inoffensif = 2, Frappe basique = 15, Arme/Sort = 35, Ultime = 70.
            - Coefficient d'intensité : Faible = 0.5, Non précisé/Normal = 1.0, Fort = 1.5, Maximum = 2.0.
            - Puissance Brute = Valeur de Base * Coefficient.
            4. Calcul Final du Joueur :
            - Si "soin" : Valeur Finale = Puissance Brute + Magie du Joueur. (Ignore la Résistance et l'Esquive).
            - Si "attaque" : Valeur Finale = (Puissance Brute + Force/Magie du Joueur) - Résistance de l'Ennemi. (Si l'attaque touche, le minimum est 0 ou 1).
            5. CONTRE-ATTAQUE :
            - COMPARE STRICTEMENT la Vitesse du Joueur (${effVitesseJoueur}) et l'Esquive de l'Ennemi (${effEsquiveEnnemi}).
            - SI ET SEULEMENT SI Vitesse Joueur < Esquive Ennemi : L'ennemi esquive avec succès ET riposte avec l'attaque prévue. Tu DOIS calculer "degats_contre_attaque" = (Puissance de la riposte * Intensité) + Force Ennemi - Résistance du Joueur. "contre_attaque_ennemi" sera true.
            - SINON (Vitesse Joueur >= Esquive Ennemi) : L'ennemi N'ESQUIVE PAS et NE PEUT PAS contre-attaquer. "contre_attaque_ennemi" DOIT être false, et "degats_contre_attaque" DOIT être 0.

            Réponds UNIQUEMENT avec ce JSON strict :
            {
                "type_action": "attaque" | "soin",
                "coefficient_intensite": number,
                "details_calcul": "Écris l'équation appliquée : (Base * Coef) + Stat - Resistance = Résultat",
                "analyse_seuil": {
                    "faisable": boolean
                },
                "analyse_combat": {
                    "surprise": boolean,
                    "esquive_reussie": boolean,
                    "valeur_finale": number
                },
                "succes_global": boolean,
                "mort_ennemi": boolean,
                "contre_attaque_ennemi": boolean,
                "degats_contre_attaque": number,
                "statuts_ajoutes_joueur": [],
                "statuts_ajoutes_ennemi": [],
                "narration": "Description dynamique du tour, incluant la riposte si applicable. N'INCLUS STRICTEMENT AUCUN CHIFFRE (ni dégâts, ni soins, ni PV restants) dans ce texte."
            }`;
        try {
            const model = genAI.getGenerativeModel({ model: "models/gemma-3-27b-it" });
            const result = await model.generateContent(prompt);
            
            const textResult = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            const outcome = JSON.parse(textResult);


            console.log("\n=== RÉSULTAT DU MOTEUR LLM ===");
            console.log(`Action du joueur : "${attaque}"`);
            console.log(JSON.stringify(outcome, null, 2));
            console.log("==============================\n");
            // ------------------------------------------

            let finalMessage = `**${pseudo}** agit sur **${baseEnemy.nom}** !\n*« ${attaque} »*\n\n${outcome.narration}`;

            if (outcome.statuts_ajoutes_joueur && outcome.statuts_ajoutes_joueur.length > 0) {
                outcome.statuts_ajoutes_joueur.forEach(s => {
                    if (!playerInstance.statuts.includes(s)) playerInstance.statuts.push(s);
                });
            }
            if (outcome.statuts_ajoutes_ennemi && outcome.statuts_ajoutes_ennemi.length > 0) {
                outcome.statuts_ajoutes_ennemi.forEach(s => {
                    if (!enemyInstance.statuts.includes(s)) enemyInstance.statuts.push(s);
                });
            }

            if (outcome.succes_global) {
                if (outcome.type_action === "soin") {
                    enemyInstance.hpActuel = Math.min(baseEnemy.hpMax, enemyInstance.hpActuel + outcome.analyse_combat.valeur_finale);
                    finalMessage += `\n\n✨ L'ennemi récupère **${outcome.analyse_combat.valeur_finale}** PV (PV restants: ${enemyInstance.hpActuel}/${baseEnemy.hpMax}).`;
                } else if (!outcome.analyse_combat.esquive_reussie && !outcome.contre_attaque_ennemi) {
                    enemyInstance.hpActuel -= outcome.analyse_combat.valeur_finale;
                    
                    if (enemyInstance.hpActuel <= 0 || outcome.mort_ennemi) {
                        state.layout[targetY][targetX] = 0;
                        delete state.enemies[`${targetY},${targetX}`];
                        finalMessage += `\n\n🩸 **${baseEnemy.nom} est terrassé !**`;
                        
                        const buffer = await renderMapImage(state.layout, state.playerX, state.playerY);
                        const attachment = new AttachmentBuilder(buffer, { name: 'map.png' });
                        const channel = await interaction.client.channels.fetch(state.channelId);
                        const mapMessage = await channel.messages.fetch(state.messageId);
                        await mapMessage.edit({ files: [attachment] });
                    } else {
                        finalMessage += `\n\n💥 L'ennemi subit **${outcome.analyse_combat.valeur_finale}** dégâts (PV restants: ${enemyInstance.hpActuel}/${baseEnemy.hpMax}).`;
                    }
                }
            }

            if (outcome.contre_attaque_ennemi && outcome.degats_contre_attaque > 0) {
                const statResistanceJoueur = statsJoueur.resistancePhysique || 30; 
                
                playerInstance.hpActuel -= outcome.degats_contre_attaque;
                finalMessage += `\n\n⚠️ **Contre-attaque !** **${pseudo}** subit **${outcome.degats_contre_attaque}** dégâts (PV restants: ${playerInstance.hpActuel}/${statsJoueur.hpMax}).`;
                
                if (playerInstance.hpActuel <= 0) {
                    finalMessage += `\n💀 **${pseudo} s'effondre, vaincu par la riposte !**`;
                }
            }

            const coef = outcome.coefficient_intensite || 1.0;
            
            let coutFatigue = Math.max(1, Math.floor((15 * coef) * (50 / Math.max(1, statEndurance))));
            
            playerInstance.fatigueActuelle -= coutFatigue;
            if (playerInstance.fatigueActuelle < 0) playerInstance.fatigueActuelle = 0;

            finalMessage += `\n\n💨 **Fatigue :** -${coutFatigue} (Reste: ${playerInstance.fatigueActuelle}/${fatigueMax})`;
            // -----------------------------

            saveState();
            await interaction.editReply({ content: finalMessage });


        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: "Erreur lors de la résolution de l'action." });
        }
    }
};