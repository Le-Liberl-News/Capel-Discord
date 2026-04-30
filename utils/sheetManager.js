async function lireLigne(sheets, sheetId, ligne) {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `A${ligne}:E${ligne}`,
        });
        return res.data.values ? res.data.values[0] : null; 
    } catch (error) {
        console.error(`❌ Erreur de lecture sur la feuille ${sheetId} (Ligne ${ligne}) :`, error);
        throw error;
    }
}

async function ecrireEtVerifier(sheets, sheetId, colonne, ligne, nouvelleValeur) {
    const range = `${colonne}${ligne}`; 

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: range,
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [[nouvelleValeur]] }
        });

        const verifyRes = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range,
        });

        const valeurEcrite = verifyRes.data.values ? verifyRes.data.values[0][0] : null;

        if (!valeurEcrite || valeurEcrite.trim() !== nouvelleValeur.trim()) {
            throw new Error(`Vérification échouée. Attendu : "${nouvelleValeur}", Trouvé : "${valeurEcrite}"`);
        }
        return true; 
        
    } catch (error) {
        console.error(`❌ Erreur d'écriture/vérification sur ${range} :`, error);
        throw error;
    }
}

function formaterLigneDiscord(row, ligne, feuille, userId = null, isUpdate = false) {
    if (!row) return `❌ La ligne **${ligne}** est vide ou introuvable.`;

    let header = "";
    if (isUpdate) {
        header = `✅ **MISE À JOUR VÉRIFIÉE** par <@${userId}>\n📄 **Feuille :** ${feuille} (Ligne **${ligne}**)`;
    } else {
        header = userId ? `📖 <@${userId}> lit la **Ligne ${ligne} de ${feuille}** :` : `📖 **Ligne ${ligne} de ${feuille}** :`;
    }

    return `${header}\n**Perso :** ${row[1] || '?'}\n🇯🇵 **Jap :** ${row[2] || '?'}\n🇬🇧 **ENG :** ${row[3] || '?'}\n🇫🇷 **FR :** ${row[4] || '*vide*'}`;
}




function extractSheetId(url) {
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
}

async function getToutesLesFeuillesCandidates(sheets, tableId) {
    const onglets = ["Prolog.", "Ch. 1", "Ch. 2", "Ch. 3", "Ch. 4", "Ch. 5", "Ch. 6", "Ch. 7", "Final"];
    const rangesToFetch = onglets.map(onglet => `'${onglet}'!A3:F`);

    const tableRes = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: tableId,
        ranges: rangesToFetch,
    });

    const candidats = [];
    tableRes.data.valueRanges.forEach(rangeData => {
        if (!rangeData.values) return;
        rangeData.values.forEach(row => {
            const nomFeuille = row[0];
			const endroit = row[1];
            const statut = row[2];
            const lien = row[5];
            if (nomFeuille && lien && (statut === "Non commencée")) {
                const sheetId = extractSheetId(lien);
                if (sheetId) candidats.push({ nom: nomFeuille, endroit: endroit, statut, id: sheetId, lien });
            }
        });
    });
    return candidats;
}

async function trouverBulleDansFeuille(sheets, sheetId) {
    const sheetRes = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'A1:E2000', 
    });

    const rows = sheetRes.data.values;
    if (!rows) return null;

    let startLine = -1;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] && rows[i][0].trim().toUpperCase() === "PERSONNAGE") {
            startLine = i + 1;
            break;
        }
    }

    if (startLine === -1) return null;

    let candidats = [];

    for (let i = startLine; i < rows.length; i++) {
        const colB = rows[i][1];
        const colC = rows[i][2];
        const colD = rows[i][3];
        const colE = rows[i][4];

        if (colC && (!colE || colE.trim() === "")) {
            const texteEng = colD ? colD.trim() : "";
            
            candidats.push({
                ligne: i + 1,
                perso: colB || "*Inconnu*",
                jap: colC,
                eng: texteEng || "*vide*",
                taille: texteEng.length
            });
        }
    }

    if (candidats.length === 0) return null;

	const rank = Math.floor(Math.random() * candidats.length);

    const meilleureBulle = candidats[rank];
    delete meilleureBulle.taille;
    return meilleureBulle;
}
async function determinerGroupe(sheets, sheetName, spreadsheetId) {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: `Sheet1!A1:G2000`, 
    });
    const rows = response.data.values;
    if (!rows) return null;

    let startLine = -1;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] && rows[i][0].trim().toUpperCase() === "PERSONNAGE") break;
    }

    if (startLine === -1) {
        console.log(`[!] Header "PERSONNAGE" introuvable dans ${sheetName}`);
        return null;
    }

    let cibleIndex = -1;
    let maxDiff = null;
	const charNumberAimed = 40 + (Math.random() * 200);

    for (let i = startLine; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length < 3) continue;

        const nom = row[1] ? row[1].trim() : "";
        const jap = row[2] ? row[2].trim() : "";
        const eng = row[3] ? row[3].trim() : "";
        const trad = row[4] ? row[4].trim() : "";

        if (jap && (!trad || trad === "")) {
            if (maxDiff === null || Math.abs(charNumberAimed - eng.length) < maxDiff) {
                maxDiff = Math.abs(charNumberAimed - eng.length);
                cibleIndex = i;
            }
        }
    }

    if (cibleIndex === -1) return null;

    const persoCible = rows[cibleIndex][1] ? rows[cibleIndex][1].trim() : "";
    let indicesGroupe = [cibleIndex];

    const estGroupable = (idx) => {
        if (idx < startLine || idx >= rows.length) return false; 
        const nom = rows[idx][1] ? rows[idx][1].trim() : "";
        const jap = rows[idx][2] ? rows[idx][2].trim() : "";
        const trad = rows[idx][4] ? rows[idx][4].trim() : "";
        
        return (nom === persoCible && jap !== "" && trad === "");
    };

    let indexHaut = cibleIndex - 1;
    while (indicesGroupe.length < 3 && estGroupable(indexHaut)) {
        indicesGroupe.unshift(indexHaut);
        indexHaut--;
    }

    let indexBas = cibleIndex + 1;
    while (indicesGroupe.length < 3 && estGroupable(indexBas)) {
        indicesGroupe.push(indexBas);
        indexBas++;
    }

    return {
        nom_perso: persoCible || "*Inconnu*",
        lignes: indicesGroupe.map(idx => idx + 1).join(','), 
        jap: indicesGroupe.map(idx => rows[idx][2] || "").join(' |BR| '), // Colonne C
        eng: indicesGroupe.map(idx => rows[idx][3] || "").join(' |BR| ')  // Colonne D
    };
}

async function trouverMissionDuJour(sheets, tableId) {
    const candidats = await getToutesLesFeuillesCandidates(sheets, tableId);
    if (candidats.length === 0) return null;

    for (let i = candidats.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [candidats[i], candidats[j]] = [candidats[j], candidats[i]];
    }

    for (const candidat of candidats) {
        const groupeMissions = await determinerGroupe(sheets, candidat.nom, candidat.id);
        if (groupeMissions) return { feuille: candidat, bulle: groupeMissions };
    }
    return null;
}

async function getFeuillesParNom(sheets, tableId, baseName) {
    const onglets = ["Prolog.", "Ch. 1", "Ch. 2", "Ch. 3", "Ch. 4", "Ch. 5", "Ch. 6", "Ch. 7", "Final"];
    const rangesToFetch = onglets.map(onglet => `'${onglet}'!A3:F`);

    const tableRes = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: tableId,
        ranges: rangesToFetch,
    });

    const candidats = [];
    tableRes.data.valueRanges.forEach(rangeData => {
        if (!rangeData.values) return;
        rangeData.values.forEach(row => {
            const nomFeuille = row[0];
            const lien = row[5];
            
            if (nomFeuille && lien && nomFeuille.startsWith(baseName)) {
                const sheetId = extractSheetId(lien);
                if (sheetId) candidats.push({ nom: nomFeuille, id: sheetId, lien: lien });
            }
        });
    });
    return candidats;
}

async function chercherTexteExact(sheets, sheetId, texteRecherche) {
    try {
        const sheetRes = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'A1:E2000', 
        });

        const rows = sheetRes.data.values;
        if (!rows) return [];

        let startLine = -1;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][0] && rows[i][0].trim().toUpperCase() === "PERSONNAGE") {
                startLine = i + 1;
                break;
            }
        }
        if (startLine === -1) return [];

        const matchs = [];
        for (let i = startLine; i < rows.length; i++) {
            const colE = rows[i][4];

            if (colE && colE.trim() === texteRecherche.trim()) {
                matchs.push({
                    ligne: i + 1,
                    perso: rows[i][1] || "*Inconnu*",
                    texte_fr: colE
                });
            }
        }
        return matchs;
    } catch (error) {
        console.error(`Erreur lecture feuille ID ${sheetId}:`, error);
        return [];
    }
}

async function trouverOccurrencesBug(sheets, tableId, baseName, texteRecherche) {
    const candidats = await getFeuillesParNom(sheets, tableId, baseName);
    
    const resultatsGlobaux = [];
    for (const candidat of candidats) {
        const matchsDansFeuille = await chercherTexteExact(sheets, candidat.id, texteRecherche);

        matchsDansFeuille.forEach(match => {
            resultatsGlobaux.push({
                feuille: candidat.nom,
                sheetId: candidat.id,
                lien: candidat.lien,
                ligne: match.ligne,
                perso: match.perso
            });
        });
    }
    return resultatsGlobaux;
}

async function updateTranslation(sheets, tableId, baseName, texteCherche, nouveauTexte) {
    const occurrences = await trouverOccurrencesBug(sheets, tableId, baseName, texteCherche);

    if (occurrences.length === 0) {
        throw new Error("Impossible de mettre à jour : le texte original est introuvable.");
    }

    let modifs = 0;
    for (const occ of occurrences) {
        try {
            await sheets.spreadsheets.values.update({
                spreadsheetId: occ.sheetId,
                range: `E${occ.ligne}`,
                valueInputOption: 'USER_ENTERED',
                requestBody: { values: [[nouveauTexte]] }
            });
            modifs++;
        } catch (error) { console.error(`Erreur d'écriture sur la feuille ${occ.sheetId} ligne ${occ.ligne}:`, error); }
    }
    return modifs;
}

async function recupererLexique(sheets) {
    try {
        const lexiqueResponse = await sheets.spreadsheets.values.batchGet({
            spreadsheetId: '1fDydK9_A185s2bz9EnLEeuLosDKS7hre5NK8Zd_a-jM',
            ranges: ['Général!B3:D', 'Items!C2:E', 'Lieux!B2:D', 'Noms!B2:D', 'Ennemis!B2:D'],
        });
        
        let lexiqueTerms = [];
        lexiqueResponse.data.valueRanges.forEach(vr => {
            if (!vr.values) return;
            vr.values.forEach(row => {
                const eng = row[0] ? row[0].trim() : "";
                const fr = row[1] ? row[1].trim() : "";
                if (eng && fr) lexiqueTerms.push(`${eng} = ${fr}`);
            });
        });
        return lexiqueTerms.join('\n');
    } catch (e) {
        console.error("Erreur lors de la récupération du lexique :", e);
        return "Lexique indisponible.";
    }
}

async function recupererScript(sheets, spreadsheetId, targetLines) {
    try {
        const scriptResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: `'Sheet1'!A:D`
        });

        const rows = scriptResponse.data.values || [];
        let contexte_texte = "";
        let startRow = -1;
        
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][0] && rows[i][0].toString().trim().toUpperCase() === "PERSONNAGE") {
                startRow = i + 1;
                break;
            }
        }

        if (startRow !== -1) {
            for (let i = startRow; i < rows.length; i++) {
                const numLigneActuelle = i + 1;
                const perso = rows[i][1] ? rows[i][1].trim() : "";
                const jap = rows[i][2] ? rows[i][2].trim() : "N/A";
                const eng = rows[i][3] ? rows[i][3].trim() : "";

                if (eng || jap) {
                    if (targetLines.includes(numLigneActuelle)) {
                        contexte_texte += `\n>>> CIBLE [Ligne ${numLigneActuelle}] ${perso} : ${jap} | ${eng} <<<\n`;
                    } else {
                        contexte_texte += `[${perso}] : ${eng}\n`;
                    }
                }
            }
        } else {
            contexte_texte = "Erreur : Balise PERSONNAGE introuvable dans le document source.";
        }

        return contexte_texte;
    } catch (e) {
        console.error("Erreur lors de la récupération du script :", e);
        return "Script indisponible.";
    }
}
module.exports = {
    trouverMissionDuJour,
    trouverOccurrencesBug,
    getFeuillesParNom,
    updateTranslation,
	lireLigne,
    ecrireEtVerifier,
    formaterLigneDiscord,
    recupererLexique,
    recupererScript,
    determinerGroupe
};
