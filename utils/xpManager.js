const db = require('./db');

const RANGS_BRACERS = [
    { nom: "Rang S",  seuil: 22000, roleId: "1493649095472971906" },
    { nom: "Rang A+", seuil: 17500, roleId: "1493649082353324192" },
    { nom: "Rang A",  seuil: 14500, roleId: "1493649052234027080" },
    { nom: "Rang B+", seuil: 12000, roleId: "1493649011033510083" },
    { nom: "Rang B",  seuil: 10000, roleId: "1493648973628707057" },
    { nom: "Rang C+", seuil: 8300,  roleId: "1493648939071701185" },
    { nom: "Rang C",  seuil: 6900,  roleId: "1493648902602100978" },
    { nom: "Rang D+", seuil: 5700,  roleId: "1493648860818706552" },
    { nom: "Rang D",  seuil: 4700,  roleId: "1493648821446639780" },
    { nom: "Rang E+", seuil: 3850,  roleId: "1493648766551588964" },
    { nom: "Rang E",  seuil: 3150,  roleId: "1493648719130923018" },
    { nom: "Rang F+", seuil: 2550,  roleId: "1493648668786425916" },
    { nom: "Rang F",  seuil: 2050,  roleId: "1493648631016853515" },
    { nom: "Rang G+", seuil: 1650,  roleId: "1493648193311871027" },
    { nom: "Rang G",  seuil: 1300,  roleId: "1493648104061403236" },
    { nom: "Classe 1",  seuil: 1000, roleId: "1493644728862904410" },
    { nom: "Classe 2",  seuil: 760,  roleId: "1493644492367204423" },
    { nom: "Classe 3",  seuil: 560,  roleId: "1493644262590648511" },
    { nom: "Classe 4",  seuil: 400,  roleId: "1493643977063399434" },
    { nom: "Classe 5",  seuil: 270,  roleId: "1493643725639782521" },
    { nom: "Classe 6",  seuil: 170,  roleId: "1493643256074862773" },
    { nom: "Classe 7",  seuil: 100,  roleId: "1493643076269510707" },
    { nom: "Classe 8",  seuil: 50,   roleId: "1493642886154158131" },
    { nom: "Classe 9",  seuil: 20,   roleId: "1493642682801848380" },
    { nom: "Classe 10", seuil: 1,    roleId: "1493642482683089067" }
];

async function ajouterXP(userId, montantXP, client) {
    console.log(`\n[XP-DEBUG] --- Début traitement pour ${userId} (+${montantXP} XP) ---`);
    if (montantXP === null) return console.error(`[XP-DEBUG] ❌ XP null, il va encore falloir faire des corrections.`);

    try {
        await db.query(`
            INSERT INTO users_stats (user_id, xp, niveau) 
            VALUES (?, ?, 'Classe 10') 
            ON CONFLICT(user_id) DO UPDATE SET xp = xp + ?
        `, [userId, montantXP, montantXP]);
        console.log(`[XP-DEBUG] DB mise à jour avec succès.`);
    } catch (dbErr) { console.error(`[XP-DEBUG] ❌ Erreur écriture DB :`, dbErr.message); }

    const [stats_rows] = await db.query('SELECT xp, niveau FROM users_stats WHERE user_id = ?', [userId]);
    const stats = stats_rows[0];
    if (!stats) {
        console.error(`[XP-DEBUG] ❌ Impossible de récupérer les stats après update.`);
        return;
    }
    console.log(`[XP-DEBUG] Stats actuelles : ${stats.xp} XP | Niveau DB : ${stats.niveau}`);

    const nouveauRang = RANGS_BRACERS.find(r => Number(stats.xp) >= r.seuil);
    if (!nouveauRang) {
        console.log(`[XP-DEBUG] ⚠️ Aucun rang trouvé pour ${stats.xp} XP. Étrange.`);
        return;
    }
    console.log(`[XP-DEBUG] Cible détectée : ${nouveauRang.nom} (Seuil: ${nouveauRang.seuil})`);

    try {
        const guildId = process.env.GUILD_ID;
        const guild = client.guilds.cache.get(guildId);
        
        if (!guild) {
            console.error(`[DISCORD-CHECK] ❌ Guild ${guildId} non trouvée dans le cache. Vérifie le .env !`);
            return;
        }

        const member = await guild.members.fetch(userId).catch(() => null);
        if (!member) {
            console.error(`[DISCORD-CHECK] ❌ Utilisateur ${userId} introuvable sur le serveur.`);
            return;
        }

        console.log(`[DISCORD-CHECK] Analyse des rôles de ${member.user.tag}...`);
        const aDejaLeRole = member.roles.cache.has(nouveauRang.roleId);

        if (!aDejaLeRole) {
            console.log(`[PROMOTION] 🚀 Lancement de la procédure : ${stats.niveau} -> ${nouveauRang.nom}`);

            const tousLesIdsBracers = RANGS_BRACERS.map(r => r.roleId);
            console.log(`[PROMOTION] Nettoyage des anciens rôles Bracer...`);
            await member.roles.remove(tousLesIdsBracers).catch(e => console.error(`[PROMOTION] ❌ Erreur remove :`, e.message));
            
            console.log(`[PROMOTION] Attribution du rôle ${nouveauRang.nom} (${nouveauRang.roleId})...`);
            await member.roles.add(nouveauRang.roleId)
                .then(() => {
                    console.log(`[PROMOTION] ✅ Rôle attribué avec succès sur Discord.`);
                    await db.query('UPDATE users_stats SET niveau = ? WHERE user_id = ?', [nouveauRang.nom, userId]);
                    console.log(`[PROMOTION] DB synchronisée : Niveau = ${nouveauRang.nom}`);
                })
                .catch(e => {
                    console.error(`[PROMOTION] ❌ ÉCHEC CRITIQUE :`, e.message);
                    if (e.message.includes("Missing Permissions")) {
                        console.error(`[CONSEIL] Vérifie que mon rôle est BIEN AU-DESSUS du rôle ${nouveauRang.nom} !`);
                    }
                });
        } else {
            console.log(`[DISCORD-CHECK] ✅ ${member.user.tag} possède déjà le bon rôle.`);
        }
    } catch (err) { console.error(`[FATAL-XP] Erreur imprévue :`, err); }

    console.log(`[XP-DEBUG] --- Fin traitement ---\n`);
}
module.exports = { ajouterXP,RANGS_BRACERS };
