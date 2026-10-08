# Publication de l’activité Antérose

Le client publié exige une ouverture dans Discord. Le personnage vient exclusivement de getPseudoAnonyme côté bot ; les bulles viennent des nouveaux messages du salon dont l’auteur possède un avatar actif. Aucun sélecteur ni formulaire de test n’est présent dans les pages ou le bundle de production.

1. Dans Capel-Discord, exécuter npm run activity:build puis npm run activity:test. Le build de production fixe __ACTIVITY_PREVIEW__ à false.
2. Commiter la version du bot, puis exécuter node activity/tools/publish-client.cjs E:/dev/Website/activite. Ce script copie seulement les fichiers PHP, le bundle et les assets ; release.json contient le commit du bot et les empreintes des fichiers.
3. Pousser Capel-Discord/main et Website/main. Le premier workflow transfère les fichiers au VPS et redémarre le bot ; le second vérifie le site puis publie le dossier activite par FTP. Les deux composants doivent être mis à jour ensemble.
4. Vérifier les deux workflows, les fichiers publics de release.json et le refus des appels non authentifiés sur api.php?r=state et api.php?r=profile.

Le mapping de l’application Discord reste / vers le domaine du site /activite. L’identifiant d’application est injecté par deploy/index.php. Le relais PHP transmet Authorization à 127.0.0.1:3000.

L’aperçu local utilise preview.html et un bundle distinct construit au lancement de npm run activity:preview. Cette page et ce bundle ne sont pas copiés sur le site.
