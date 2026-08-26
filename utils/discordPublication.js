function verifierSalonPublication(channel, client, { attachmentOptional = false } = {}) {
    if (!channel || !channel.isTextBased()) {
        throw new Error(`Salon Discord ${channel?.id || 'inconnu'} non textuel ou inaccessible.`);
    }

    const permissions = channel.permissionsFor(client.user);
    if (!permissions) {
        throw new Error(`Permissions du bot impossibles à déterminer dans #${channel.name || channel.id}.`);
    }

    const requises = [
        ['ViewChannel', 'Voir le salon'],
        ['SendMessages', 'Envoyer des messages']
    ];
    if (channel.isThread()) {
        requises.push(['SendMessagesInThreads', 'Envoyer des messages dans les fils']);
    }
    const manquantes = requises.filter(([permission]) => !permissions.has(permission)).map(([, nom]) => nom);
    if (manquantes.length > 0) {
        throw new Error(
            `Permissions Discord manquantes dans #${channel.name || channel.id} (${channel.id}) : ${manquantes.join(', ')}.`
        );
    }

    const peutJoindre = permissions.has('AttachFiles');
    if (!peutJoindre && !attachmentOptional) {
        throw new Error(`Permission Discord manquante dans #${channel.name || channel.id} (${channel.id}) : Joindre des fichiers.`);
    }
    console.log(
        `[PERMISSIONS] #${channel.name || channel.id} (${channel.id}) : messages=OK, fichiers=${peutJoindre ? 'OK' : 'NON'}`
    );
    return { peutJoindre };
}

module.exports = { verifierSalonPublication };
