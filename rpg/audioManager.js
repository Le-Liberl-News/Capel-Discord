const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const path = require('path');
const fs = require('fs');

const SALON_VOCAL_ID = "1500777104730755102";
let currentPlayer = null;

/**
 * Joue l'ambiance sonore sur le salon fixe
 */
async function jouerAmbianceMap(interaction, etage, state) {
    const guild = interaction.guild;
    // On récupère le salon fixe
    const voiceChannel = await guild.channels.fetch(SALON_VOCAL_ID).catch(() => null);

    if (!voiceChannel) {
        console.error("Impossible de trouver le salon vocal fixe !");
        return;
    }

    // Sauvegarde de l'étage pour la résilience
    state.audio = {
        guildId: guild.id,
        currentEtage: etage
    };

    // Connexion
    let connection = getVoiceConnection(guild.id);
    if (!connection) {
        connection = joinVoiceChannel({
            channelId: SALON_VOCAL_ID,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });
    }

    if (!currentPlayer) currentPlayer = createAudioPlayer();
    connection.subscribe(currentPlayer);

    let cheminMusique = path.join(__dirname, '../assets/audio', `etage_${etage}.mp3`);
    if (!fs.existsSync(cheminMusique)) {
         cheminMusique = path.join(__dirname, '../assets/audio', 'donjon.mp3');
    }

    const lancerPiste = () => {
        try {
            const resource = createAudioResource(cheminMusique, { inlineVolume: true });
            resource.volume.setVolume(0.2);
            currentPlayer.play(resource);
        } catch (e) {
            console.error("Erreur lecture audio :", e);
        }
    };

    currentPlayer.removeAllListeners(AudioPlayerStatus.Idle);
    currentPlayer.on(AudioPlayerStatus.Idle, () => lancerPiste());
    lancerPiste();
}

/**
 * Relance l'audio au démarrage si nécessaire
 */
async function relancerAudioApresCrash(client, state) {
    if (!state.audio || !state.audio.guildId) return;

    try {
        const guild = await client.guilds.fetch(state.audio.guildId).catch(() => null);
        if (!guild) return;

        // On vérifie si le salon fixe contient encore des gens
        const voiceChannel = await guild.channels.fetch(SALON_VOCAL_ID).catch(() => null);
        
        if (voiceChannel && voiceChannel.members.size > 0) {
            console.log(`[Audio] Reprise de l'ambiance sur le salon fixe.`);
            // Mock de l'interaction pour réutiliser la fonction
            const mockInteraction = { guild: guild };
            await jouerAmbianceMap(mockInteraction, state.audio.currentEtage, state);
        }
    } catch (e) {
         console.error("Erreur crash audio:", e);
    }
}

module.exports = { jouerAmbianceMap, relancerAudioApresCrash };