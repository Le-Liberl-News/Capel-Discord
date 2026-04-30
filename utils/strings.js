function decouperTexte(texte, limite = 1950) {
    if (texte.length <= limite) return [texte];

    const morceaux = [];
    let reste = texte;

    while (reste.length > 0) {
        if (reste.length <= limite) {
            morceaux.push(reste);
            break;
        }

        let pointDeCoupe = reste.lastIndexOf('\n', limite);
        
        if (pointDeCoupe === -1) {
            pointDeCoupe = reste.lastIndexOf(' ', limite);
        }
        
        if (pointDeCoupe === -1) {
            pointDeCoupe = limite;
        }

        morceaux.push(reste.substring(0, pointDeCoupe).trim());
        reste = reste.substring(pointDeCoupe).trim();
    }

    return morceaux;
}

module.exports = { decouperTexte };
