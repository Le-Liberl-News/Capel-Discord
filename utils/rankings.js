const db = require('./db.js');
const { RANGS_BRACERS } = require('./xpManager.js');
const { AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');

GlobalFonts.registerFromPath('./AveriaSansLibre-Regular.ttf', 'Averia');

const couleursDeBase = [
    '#e33464', '#e73326', '#e84329', '#e8532c', '#e9632f', 
    '#e97232', '#ea8135', '#ea9038', '#eb9e3b', '#ebac3f', 
    '#ecba41', '#ecc745', '#ecd448', '#ede04b', '#edeb4e', 
    '#dfee53', '#adef4c', '#74f144', '#2df245', '#37f36f', 
    '#31f59e', '#2bf5cd', '#23dbf6', '#1c95f7', '#1449f9'
];

const ratio = 0.9;

const couleursAssombries = couleursDeBase.map(hex => {
    let r = Math.round(parseInt(hex.slice(1, 3), 16) * ratio);
    let g = Math.round(parseInt(hex.slice(3, 5), 16) * ratio);
    let b = Math.round(parseInt(hex.slice(5, 7), 16) * ratio);
    
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
});

async function actualiserClassement(client, top10) {
    const salonSecretId = '1497953103713144863';
    const messageMaitreId = '1497953689263149227';

    try {
        const salon = await client.channels.fetch(salonSecretId);
        const message = await salon.messages.fetch(messageMaitreId);

        const background = await loadImage('./bg_rankings.png');
        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(background, 0, 0);

        ctx.strokeStyle = '#000000'; 
        ctx.lineWidth = 3;           
        ctx.lineJoin = 'round';      

        const ecrireTexte = (texte, x, y) => {
            ctx.strokeText(texte, x, y); 
            ctx.fillText(texte, x, y);   
        };

        const startY = 230;
        const lineWeight = 45; 
        
        const colRG = 70;
        const colPseudo = colRG + 100;
        const colClasse = colPseudo + 270;
        const colPB = colClasse + 190;
        const colTrads = colPB + 295;
        
        ctx.fillStyle = '#FFFFFF'; 
        ctx.font = 'bold 37px "Averia"'; 
        const headerY = startY - lineWeight;
        const titleY = headerY - 5;
        
        ecrireTexte("RG", colRG, titleY);
        ecrireTexte("BRACER", colPseudo, titleY);
        ecrireTexte("CLASSE", colClasse, titleY);
        ecrireTexte("PB", colPB, titleY);
        ctx.textAlign = 'center';
        ecrireTexte("TRADS", colTrads, titleY);
        ctx.textAlign = 'left'; 

        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3; 

        const ligneGaucheX = colRG - 15;
        const ligneDroiteX = colTrads + 50;
        ctx.moveTo(ligneGaucheX, headerY + 8); 
        ctx.lineTo(ligneDroiteX, headerY + 8); 

        const pointHautY = headerY - 35; 
        const pointBasY = startY + (Math.max(10, top10.length - 1) * lineWeight) - 25;

        const sep1X = colRG + 80;
        ctx.moveTo(sep1X, pointHautY);
        ctx.lineTo(sep1X, pointBasY);

        const sep2X = colPseudo + 245;
        ctx.moveTo(sep2X, pointHautY);
        ctx.lineTo(sep2X, pointBasY);

        const sep3X = colClasse + 160;
        ctx.moveTo(sep3X, pointHautY);
        ctx.lineTo(sep3X, pointBasY);

        const sep4X = colPB + 230;
        ctx.moveTo(sep4X, pointHautY);
        ctx.lineTo(sep4X, pointBasY);

        ctx.stroke();

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;

        for (let i = 0; i < top10.length; i++) {
            const joueur = top10[i];
            const y = startY + (i * lineWeight);

            ctx.fillStyle = joueur.couleurHex; 

            ctx.font = 'bold 37px "Averia"'; 
            ecrireTexte(`#${String(i + 1).padStart(2, '0')}`, colRG, y);

            ecrireTexte(joueur.pseudo, colPseudo, y);
            ecrireTexte(joueur.nomRang, colClasse, y);

            ctx.font = '34px "Averia"'; 
            ecrireTexte(`${joueur.pb}/${joueur.seuilSuivant}`, colPB, y);

            ctx.textAlign = 'center';
            ctx.font = 'bold 34px "Averia"'; 
            ecrireTexte(String(joueur.trads), colTrads, y);
            ctx.textAlign = 'left'; 
        }
        const buffer = await canvas.encode('png');
        const attachment = new AttachmentBuilder(buffer, { name: 'classement.png' });

        await message.edit({
            content: null, 
            files: [attachment]
        });

    } catch (erreur) { console.error("Erreur maj classement image :", erreur); }
}

async function updateRanking(client) {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) return;

    const rawTop10 = db.prepare('SELECT user_id, xp, victoires AS trads FROM users_stats ORDER BY xp DESC LIMIT 10').all();
    let top10Formate = [];

    for (const ligne of rawTop10) {
        let pseudoBracer = "Inconnu";
        try {
            const user = await client.users.fetch(String(ligne.user_id));
            pseudoBracer = user.username;
        } catch (e) { }

        const indexRang = RANGS_BRACERS.findIndex(r => Number(ligne.xp) >= r.seuil);
        const rangActuel = RANGS_BRACERS[indexRang];

        const rangSuperieur = RANGS_BRACERS[indexRang - 1];
        const seuilSuivant = rangSuperieur ? rangSuperieur.seuil : "MAX";

        const indexSecurise = indexRang !== -1 ? indexRang : 0;
        const couleurLigne = couleursAssombries[indexSecurise] || '#FFFFFF';

        top10Formate.push({
            pseudo: pseudoBracer,
            pb: ligne.xp,
            seuilSuivant: seuilSuivant,
            nomRang: rangActuel ? rangActuel.nom : "Inconnu",
            trads: ligne.trads || 0,
            couleurHex: couleurLigne
        });
    }

    await actualiserClassement(client, top10Formate);
}

module.exports = { actualiserClassement, updateRanking };
