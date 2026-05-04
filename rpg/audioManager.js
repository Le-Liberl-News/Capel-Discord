const { 
    joinVoiceChannel, 
    createAudioPlayer, 
    createAudioResource, 
    AudioPlayerStatus, 
    getVoiceConnection, 
    VoiceConnectionStatus,
    entersState 
} = require('@discordjs/voice');
const path = require('path');
const fs = require('fs');

const SALON_VOCAL_ID = "1500777104730755102";
let currentPlayer = null;

async function jouerAmbianceMap(interaction, etage, state) {
    const guild = interaction.guild;
    
    // 1. On nettoie TOUJOURS l'ancienne connexion si elle existe et qu'elle bugue
    let connection = getVoiceConnection(guild.id);
    if (connection) {
        console.log("[Audio] Nettoyage d'une ancienne connexion...");
        connection.destroy();
    }

    // 2. Nouvelle tentative de connexion
    connection = joinVoiceChannel({
        channelId: SALON_VOCAL_ID,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: true, // Économise de la bande passante
    });

    try {
        // On attend que la connexion soit prête (on passe à 10s pour être large)
        console.log("[Audio] Tentative de connexion au salon...");
        await entersState(connection, VoiceConnectionStatus.Ready, 10_000);
        console.log("[Audio] Connecté et prêt !");
    } catch (error) {
        console.error("[Audio] Impossible de se connecter au salon vocal en 10s.");
        connection.destroy();
        return;
    }

    // 3. Gestion du lecteur audio
    if (!currentPlayer) {
        currentPlayer = createAudioPlayer();
        
        currentPlayer.on('error', error => {
            console.error(`[Audio Player] Erreur : ${error.message}`);
        });

        currentPlayer.on(AudioPlayerStatus.Idle, () => {
            console.log("[Audio] Piste terminée, relance...");
            lancerPiste(etage);
        });
    }
    
    connection.subscribe(currentPlayer);
    lancerPiste(etage);
}

function lancerPiste(etage) {
    // Chemin corrigé (on remonte d'un cran si on est dans /rpg/)
    let cheminMusique = path.resolve(__dirname, '../assets/audio', `etage_${etage}.mp3`);
    const cheminParDefaut = path.resolve(__dirname, '../assets/audio', 'donjon.mp3');

    if (!fs.existsSync(cheminMusique)) {
        console.log(`[Audio] etage_${etage}.mp3 absent, test du défaut...`);
        cheminMusique = cheminParDefaut;
    }

    if (!fs.existsSync(cheminMusique)) {
        console.error("[Audio] ERREUR : Aucun fichier audio trouvé !");
        return;
    }

    try {
        const resource = createAudioResource(cheminMusique, { inlineVolume: true });
        resource.volume.setVolume(0.25); 
        currentPlayer.play(resource);
        console.log(`[Audio] Lecture en cours : ${path.basename(cheminMusique)}`);
    } catch (e) {
        console.error("[Audio] Erreur lecture :", e);
    }
}

async function relancerAudioApresCrash(client, state) {
    if (!state.audio || !state.audio.guildId) return;
    const guild = await client.guilds.fetch(state.audio.guildId).catch(() => null);
    if (guild) {
        await jouerAmbianceMap({ guild: guild }, state.audio.currentEtage, state);
    }
}

module.exports = { jouerAmbianceMap, relancerAudioApresCrash };