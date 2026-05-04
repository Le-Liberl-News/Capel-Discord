const { 
    joinVoiceChannel, 
    createAudioPlayer, 
    createAudioResource, 
    AudioPlayerStatus, 
    getVoiceConnection, 
    VoiceConnectionStatus,
    entersState,
    StreamType // Ajouté ici pour l'utiliser plus bas
} = require('@discordjs/voice');

const path = require('path');
const fs = require('fs');
const ffmpegStatic = require('ffmpeg-static');

const SALON_VOCAL_ID = "1500777104730755102";
let currentPlayer = null;

async function jouerAmbianceMap(interaction, etage, state) {
    const guild = interaction.guild;
    
    // 1. On nettoie TOUJOURS l'ancienne connexion si elle existe
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
        selfDeaf: true,
        selfMute: false,
        // On force le bot à ne pas attendre une IP publique si le réseau est masqué
        group: interaction.client.user.id 
    });

    // On ajoute un listener spécifique sur les erreurs réseau
    connection.on('error', (error) => {
        console.error("[Audio Connection] Erreur réseau :", error.message);
    });

    try {
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
    let cheminMusique = path.resolve(__dirname, '/assets/audio', `etage_${etage}.mp3`);
    const cheminParDefaut = path.resolve(__dirname, '/assets/audio', 'music_tower.mp3');

    if (!fs.existsSync(cheminMusique)) {
        cheminMusique = cheminParDefaut;
    }

    try {
        // On laisse Discord.js gérer le décodage tout seul (il est très fort pour ça en local)
        const resource = createAudioResource(cheminMusique, { 
            inlineVolume: true 
        });
        
        resource.volume.setVolume(0.25); 
        currentPlayer.play(resource);
        console.log(`[Audio] Lecture lancée pour : ${path.basename(cheminMusique)}`);
    } catch (e) {
        console.error("[Audio] Erreur critique lors de la lecture :", e);
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