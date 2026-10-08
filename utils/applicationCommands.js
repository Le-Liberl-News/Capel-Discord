const {SlashCommandBuilder,ContextMenuCommandBuilder,ApplicationCommandType}=require('discord.js');
const commands = [
    new SlashCommandBuilder().setName("duel").setDescription("Défier un personnage dans l’arène de Grancel").setDMPermission(false)
        .addStringOption(o => o.setName("personnage").setDescription("Personnage de votre adversaire du jour").setRequired(true).setAutocomplete(true)),
    new SlashCommandBuilder().setName('test1').setDescription('Parse la TABLE'),
    new SlashCommandBuilder().setName('runtrad').setDescription('Cherche une réplique à traduire'),
    new SlashCommandBuilder().setName('trad').setDescription('Soumettre une traduction anonyme'),
    new SlashCommandBuilder().setName('context').setDescription('Donne le contexte de la réplique du jour'),
    new SlashCommandBuilder().setName('profil').setDescription('Affiche la progression de l\'utilisateur.'),
    new SlashCommandBuilder().setName('kisekijesuis').setDescription('Vous indique quel est votre rôle anonyme du jour'),
    new SlashCommandBuilder().setName('closetrad').setDescription('Clore les soumissions'),
    new SlashCommandBuilder().setName('init-rank').setDescription('Commande système : Initialise le panneau de classement'),
    new SlashCommandBuilder().setName('actu-rank').setDescription('Commande système : Actualise le panneau de classement'),
    new SlashCommandBuilder().setName('add-votes').setDescription('Commande système : Ajoute le bouton vote aux propositions'),
    new SlashCommandBuilder().setName('testmodal').setDescription('test modal'),
    new SlashCommandBuilder().setName('creerthread').setDescription('Création du thread quotidien'),
    new SlashCommandBuilder().setName('edition').setDescription('Modifier une de tes propositions en cours'),
    new SlashCommandBuilder().setName('suppr').setDescription('Supprimer une de tes propositions en cours'),
    new SlashCommandBuilder().setName('votes').setDescription('Récapitulatif de tes votes actifs'),

    new SlashCommandBuilder().setName('open').setDescription('Ouvrir une feuille dans le navigateur')
        .addStringOption(opt => opt.setName('feuille').setDescription('Nom (ex: T0100)').setRequired(true)),

    new SlashCommandBuilder().setName('read').setDescription('Lire une ligne spécifique')
        .addStringOption(opt => opt.setName('feuille').setDescription('Nom (ex: T0100)').setRequired(true))
        .addIntegerOption(opt => opt.setName('ligne').setDescription('Numéro de ligne').setRequired(true)),

    new SlashCommandBuilder().setName('write').setDescription('Écrire une traduction')
        .addStringOption(opt => opt.setName('feuille').setDescription('Nom (ex: T0100)').setRequired(true))
        .addIntegerOption(opt => opt.setName('ligne').setDescription('Numéro de ligne').setRequired(true))
        .addStringOption(opt => opt.setName('trad').setDescription('Le texte FR').setRequired(true)),

    new SlashCommandBuilder().setName('lexique').setDescription('Cherche un terme approximatif dans le lexique officiel')
        .addStringOption(opt => opt.setName('terme').setDescription('Le mot à chercher (ex: Aureole, bracer...)').setRequired(true)),

    new SlashCommandBuilder().setName('occurrences').setDescription('Cherche un terme dans les bulles de la plateforme de traduction')
        .addStringOption(opt => opt.setName('terme').setDescription('Le texte à chercher (ex : Aureole, bracer...)').setMinLength(2).setMaxLength(200).setRequired(true))
        .addStringOption(opt => opt.setName('langue').setDescription('Langue où chercher (toutes par défaut)').setRequired(false)
            .addChoices({ name: 'Toutes', value: 'toutes' }, { name: 'Japonais', value: 'jp' }, { name: 'Anglais', value: 'en' }, { name: 'Français', value: 'fr' }))
        .addStringOption(opt => opt.setName('jeu').setDescription('Jeu où chercher (tous les jeux par défaut)').setRequired(false)
            .addChoices({ name: 'Tous les jeux', value: 'tous' }, { name: 'The 3rd', value: 'sky-3rd' }, { name: 'SC', value: 'sky-sc' }, { name: 'FC', value: 'sky-fc' })),

    new SlashCommandBuilder().setName('anonyme').setDescription('Envoyer un message anonyme dans le thread du jour')
        .addStringOption(opt => opt.setName('message').setDescription('Ton message').setMaxLength(1000).setRequired(true))
        .addAttachmentOption(opt => opt.setName('image').setDescription('Image à joindre').setRequired(false)),

    new ContextMenuCommandBuilder().setName('Répondre anonymement')
        .setType(ApplicationCommandType.Message),

    new SlashCommandBuilder().setName('generer-map').setDescription('Génère un étage'),
    new SlashCommandBuilder().setName('naviguer').setDescription('Définis une trajectoire à suivre')
        .addStringOption(opt => opt.setName('trajectoire').setDescription('Trajectoire (ex : D H D)').setRequired(true)),

    new SlashCommandBuilder().setName('attaque').setDescription('Lance une attaque sur la cible')
        .addStringOption(opt => opt.setName('cible').setDescription('Cible (ex : D H B G)').setRequired(true))
        .addStringOption(opt => opt.setName('description').setDescription('Description de l\'attaque').setRequired(true)),
    new SlashCommandBuilder().setName('action').setDescription('Lance une action sur la cible')
        .addStringOption(opt => opt.setName('cible').setDescription('Cible (ex : Joshua)').setRequired(true))
        .addStringOption(opt => opt.setName('description').setDescription('Description de l\'action').setRequired(true)),
    

].map(c => c.toJSON());

module.exports = { commands };
