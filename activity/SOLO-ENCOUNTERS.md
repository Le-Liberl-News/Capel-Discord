# Rencontres de combat solo

Configuration : `activity/assets/sky/combat/solo-encounters.json`.

Le groupe `rean-altina` réunit les prototypes CS2 Rean et Altina. Ils ont seulement une attaque normale, en attendant leurs crafts : tachi pour Rean, magie à distance pour Altina. Claiomh Solais est ajouté automatiquement auprès de chaque Altina, avec 650 PV ; il se place devant elle et absorbe ses dégâts tant qu'il est vivant à moins de 3,5 m. Il cesse de protéger à sa défaite et n'est pas réinvoqué pendant le combat. Les trois sont exclus de `rpg/data/persos.json` et du tirage Discord. Rean et Altina restent sélectionnables dans le menu de test du Capel après l'expiration du sélecteur temporaire général.

- `groupChance` : probabilité de tirer un groupe (0 à 1). Par défaut 0.5. Sinon, duel contre un personnage avec craft.
- `groups` : liste des compositions, tirées à chances égales. Chaque groupe a un `id`, un `name`, des `allies` et des `enemies`.
- Le joueur est automatiquement ajouté aux alliés : deux entrées dans `allies` donnent donc une équipe de trois.
- Un personnage s'écrit simplement `"Walter"` (ou `{ "character": "Walter", "hp": 500 }`). Il doit avoir ses sprites et une attaque ou un craft dans les catalogues du jeu ; il n'a pas besoin de faire partie du tirage Discord.
- Un monstre s'écrit `{ "monster": true, "character": "Mishy" }`. Types disponibles pour ces rencontres : `Mishy` et `MishyArdent`, avec leurs sprites et comportements natifs. Les nouveaux types pourront être raccordés au même système après ajout de leurs assets et comportements.
- `allyName` permet de nommer le groupe du joueur. Chaque camp reçoit un seul plan d'introduction avec le nom du groupe et ses membres.

Exemple 2 contre 3 :

```json
{
  "id": "rencontre-test",
  "name": "La garde des Mishy",
  "allyName": "Votre duo",
  "allies": ["Joshua"],
  "enemies": ["Gilbert", {"monster": true, "character": "Mishy"}, {"monster": true, "character": "MishyArdent"}]
}
```

Les rencontres sont locales, sans notification Discord, classement ni PB. Une rencontre humaine trouvée en file d'attente reste prioritaire. Après une modification de cette configuration, reconstruire et publier le client (`npm run activity:build`).
Pour forcer un groupe dans l'aperçu local, utiliser `?opponent=rencontre-test` au lancement du combat solo.
