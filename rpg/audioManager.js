const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const path = require('path');
const fs = require('fs');
const SALON_VOCAL_ID = "1500777104730755102";
// Pour mémoriser l'état local du lecteur et éviter qu'il soit détruit par le garbage collector
let currentPlayer = null;

/**
 * Joue l'ambiance sonore en boucle pour un étage donné.
 * @param {object} interaction - L'interaction Discord pour récupérer le salon vocal du joueur.
 * @param {number} etage - L'étage actuel pour déterminer la piste.
 * @param {object} state - L'état global du jeu pour sauvegarder les infos de connexion.
 */
function jouerAmbianceMap(interaction, etage, state) {
    const guild = interaction.guild;
    const voiceChannel = await guild.channels.fetch(SALON_VOCAL_ID).catch(() => null);

    if (!voiceChannel) {
        console.error("Impossible de trouver le salon vocal fixe !");
        return;
    }

    // 1. Sauvegarde pour la résilience aux crashs
    state.audio = {
        voiceChannelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        currentEtage: etage
    };

    // On s'assure qu'une ancienne connexion ne bloque pas
    let connection = getVoiceConnection(voiceChannel.guild.id);
    if (!connection) {
        connection = joinVoiceChannel({
            channelId: SALON_VOCAL_ID,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });
    }

    // 2. Préparation du lecteur
    if (!currentPlayer) {
        currentPlayer = createAudioPlayer();
    }
    
    // On force la souscription pour que la connexion lise ce lecteur
    connection.subscribe(currentPlayer);

    // 3. Définition du fichier
    // Exemple : "etage_1.mp3", "etage_2.mp3", ou un son par défaut "donjon.mp3"
    let cheminMusique = path.join(__dirname, '../assets/audio', `etage_${etage}.mp3`);
    if (!fs.existsSync(cheminMusique)) {
         cheminMusique = path.join(__dirname, '../assets/audio', 'music_tower.mp3');
    }

    // 4. Lancement et Boucle
    const lancerPiste = () => {
        try {
             // Il est crucial de recréer la ressource à chaque tour de boucle
            const resource = createAudioResource(cheminMusique, { inlineVolume: true });
            resource.volume.setVolume(0.2); // Volume d'ambiance (20%)
            currentPlayer.play(resource);
        } catch (e) {
            console.error("Erreur lecture audio :", e);
        }
    };

    // On détruit l'ancien listener pour éviter de jouer la piste en double si on change de map
    currentPlayer.removeAllListeners(AudioPlayerStatus.Idle);

    // Quand la piste se termine (Idle), on la relance
    currentPlayer.on(AudioPlayerStatus.Idle, () => {
        lancerPiste();
    });

    // Lancement initial
    lancerPiste();
}

/**
 * Fonction à appeler lors du démarrage du bot (dans l'événement ready)
 * pour reprendre la musique si le bot avait planté.
 * @param {object} client - Le client Discord
 * @param {object} state - L'état chargé depuis map_state.json
 */
async function relancerAudioApresCrash(client, state) {
    if (!state.audio || !state.audio.voiceChannelId || !state.audio.guildId) return;

    try {
        const guild = await client.guilds.fetch(state.audio.guildId).catch(() => null);
        if (!guild) return;

        const voiceChannel = await guild.channels.fetch(SALON_VOCAL_ID).catch(() => null);
        // On vérifie s'il y a encore des joueurs dans le salon avant de relancer
        if (voiceChannel && voiceChannel.members.size > 0) {
            console.log(`[Audio] Reconnexion au salon vocal après crash pour l'étage ${state.audio.currentEtage}`);
            
            // On simule un objet interaction minimal pour réutiliser la fonction principale
            const pseudoInteraction = {
                member: { voice: { channel: voiceChannel } }
            };
            
            jouerAmbianceMap(pseudoInteraction, state.audio.currentEtage, state);
        }
    } catch (e) {
         console.error("Erreur lors de la reconnexion audio post-crash:", e);
    }
}

module.exports = { jouerAmbianceMap, relancerAudioApresCrash };