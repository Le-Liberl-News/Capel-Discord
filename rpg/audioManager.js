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
    const voiceChannel = await guild.channels.fetch(SALON_VOCAL_ID).catch(() => null);

    if (!voiceChannel) {
        console.error("[Audio] Erreur : Salon fixe introuvable.");
        return;
    }

    state.audio = { guildId: guild.id, currentEtage: etage };

    let connection = getVoiceConnection(guild.id);
    if (!connection) {
        connection = joinVoiceChannel({
            channelId: SALON_VOCAL_ID,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });
        console.log("[Audio] Connexion au salon établie.");
    }

    // --- ÉTAPE CRUCIALE : Attendre que la connexion soit prête ---
    try {
        await entersState(connection, VoiceConnectionStatus.Ready, 5000);
        console.log("[Audio] La connexion est prête à diffuser.");
    } catch (error) {
        console.error("[Audio] La connexion n'a pas pu s'établir en 5s:", error);
        return;
    }

    if (!currentPlayer) {
        currentPlayer = createAudioPlayer();
        // Log d'état du lecteur pour débugger
        currentPlayer.on('stateChange', (oldState, newState) => {
            console.log(`[Audio Player] ${oldState.status} -> ${newState.status}`);
        });
        
        currentPlayer.on('error', error => {
            console.error(`[Audio Player] Erreur : ${error.message} avec la ressource ${error.resource.metadata}`);
        });
    }
    
    connection.subscribe(currentPlayer);

    const lancerPiste = () => {
        let cheminMusique = path.join(__dirname, 'assets', 'audio', `etage_${etage}.mp3`);
        
        // Vérification du chemin (Attention au __dirname !)
        // Si ton audioManager est dans /rpg/ et tes sons dans /assets/audio/
        // le chemin devrait peut-être être '../assets/audio/...'
        if (!fs.existsSync(cheminMusique)) {
             console.log(`[Audio] Fichier etage_${etage}.mp3 non trouvé, repli sur donjon.mp3`);
             cheminMusique = path.resolve(__dirname, '../assets/audio/donjon.mp3');
        }

        if (!fs.existsSync(cheminMusique)) {
            console.error(`[Audio] ERREUR CRITIQUE : Aucun fichier trouvé à ${cheminMusique}`);
            return;
        }

        console.log(`[Audio] Lecture de : ${cheminMusique}`);

        try {
            const resource = createAudioResource(cheminMusique, { 
                inlineVolume: true,
                metadata: cheminMusique
            });
            resource.volume.setVolume(0.4); // On augmente un peu pour le test
            currentPlayer.play(resource);
        } catch (e) {
            console.error("[Audio] Erreur lors de la création de la ressource :", e);
        }
    };

    currentPlayer.removeAllListeners(AudioPlayerStatus.Idle);
    currentPlayer.on(AudioPlayerStatus.Idle, () => {
        console.log("[Audio] Piste terminée, relance de la boucle...");
        lancerPiste();
    });

    lancerPiste();
}

async function relancerAudioApresCrash(client, state) {
    if (!state.audio || !state.audio.guildId) return;
    const guild = await client.guilds.fetch(state.audio.guildId).catch(() => null);
    if (guild) {
        const mockInteraction = { guild: guild };
        await jouerAmbianceMap(mockInteraction, state.audio.currentEtage, state);
    }
}

module.exports = { jouerAmbianceMap, relancerAudioApresCrash };