# Aventure textuelle d'Halloween

Le Capel publie l'invitation avec `/aventure` (administrateurs) dans le salon 889835278494203915. Le bouton ouvre la
partie en MP ; chaque MP du joueur est ensuite une commande. Le jeu est entièrement textuel, avec au plus une image
par salle. Pour l'instant, seuls les administrateurs et
744964573249011712 et 188414629376950273 peuvent jouer (`allowed` dans `index.js`).

Tout le contenu est dans `rpg/data/aventure.json` ; le moteur (`utils/adventure/engine.js`) ne fait que l'appliquer.
Les parties sont gardées dans `.runtime/aventure.json` : la supprimer remet tout le monde au départ.

## Racine

| Champ | Rôle |
|---|---|
| `post` | `{text, button}` : le message publié dans le salon et le libellé du bouton |
| `intro` | texte envoyé en MP au début, avant la description de la première salle |
| `start` | id de la salle de départ |
| `inventory` | objets au départ (facultatif) |
| `final` | `{room, players, victory, closing}` : quand `players` joueurs sont dans la salle `room`, chacun reçoit `victory` en MP et `closing` est posté dans le salon roleplay (une seule fois) |
| `messages` | textes du moteur à remplacer : `unknown`, `fail`, `noexit`, `empty`, `inventory`, `help`, `resume`, `over` |
| `rooms`, `objects`, `actions` | voir plus bas |
| `verbs`, `nouns`, `directions`, `commands` | synonymes : `{"prendre": ["prends", "ramasse"]}` ; chaque mot de la liste vaut la clé |

Les commandes intégrées : `inventaire` (`inv`, `i`, `sac`), `regarder` (`r`), `aide`, `aller`
(« aller au nord »), et les directions `nord`/`n`, `sud`/`s`, `est`/`e`, `ouest`/`o`, `haut`/`monter`,
`bas`/`descendre`. Accents, majuscules, articles et ponctuation sont ignorés : « Ouvre la porte avec la clé ! » =
`ouvre porte cle`.

## Salles

```json
{"id": 2, "name": "Hall d'entrée", "image": "hall.png",
 "description": "Vous êtes dans le hall d'entrée…",
 "exits": {"sud": 1, "nord": {"to": 6, "must": ["porte_cour_ouverte"], "fail": "La porte est fermée à clé."}},
 "details": [{"mustnot": ["cle_prise"], "text": "Une petite clé rouillée traîne sur les documents."}]}
```

- `exits` : direction → id de salle, ou objet `{to, must, mustnot, use, tool, fail, text}` (une sortie peut demander
  un déclencheur ou un objet ; `text` s'affiche en passant).
- `details` : phrases ajoutées à la description tant que leurs conditions tiennent (un objet encore là…).
- `image` (facultatif) : une illustration de la salle, fichier de `rpg/data/aventure/`, envoyée avec la description
  quand le joueur entre dans la salle et quand il tape « regarder ». Tout le reste est du texte.

## Objets

`{"id": "cle", "name": "une petite clé rouillée"}` : `name` est ce qu'affiche l'inventaire.

## Actions

```json
{"place": [2], "verb": "ouvrir", "noun": ["porte"], "use": ["cle"], "tool": [],
 "must": [], "mustnot": ["porte_cour_ouverte"], "effect": ["porte_cour_ouverte"], "give": [],
 "move": null, "text": "La porte s'ouvre.", "fail": "La porte est fermée à clé."}
```

| Champ | Rôle |
|---|---|
| `place` | salles où l'action marche ; `[0]` = partout |
| `verb` | le verbe (ses synonymes dans `verbs`) |
| `noun` | les noms qui doivent tous être dits (synonymes dans `nouns`) |
| `use` | objets nécessaires, **perdus** après l'action |
| `tool` | objets nécessaires, **gardés** |
| `must` / `mustnot` | déclencheurs qui doivent être / ne pas être déjà activés |
| `effect` | déclencheurs activés (un déclencheur reste activé) |
| `give` | objets reçus |
| `move` | salle où l'action emmène le joueur (facultatif) |
| `text` | réponse si l'action réussit |
| `fail` | réponse si aucune action de la même commande ne réussit |

Pour une commande, les actions qui correspondent (verbe, noms, salle) sont essayées dans l'ordre du fichier, celles
qui demandent le plus de noms d'abord ; la première dont les conditions tiennent est faite. Si aucune ne tient, le
premier `fail` trouvé est affiché (sinon « Rien ne se passe. »). Les déclencheurs et l'inventaire sont propres à
chaque joueur.

## Contenu actuel

Première version tirée du plan et de `descriptions.txt` : les sorties sont déduites du plan, l'escalier, la cave,
les cellules et la tour sont reliés au mieux, et l'énigme de la clé (bureau → porte de la cour) n'est qu'un exemple
du format, à remplacer par le JSON des énigmes.

## Suivi du plan sur la plateforme

En production, chaque nouvelle ligne est inscrite dans le journal disque prive `.runtime/adventure-outbox`.
La synchronisation en lit au plus 256 Kio a la fois (huit parties maximum) ; le serveur dedoublonne les lignes
par leur identifiant puis acquitte le lot. Seules les donnees acquittees sont effacees du journal local.
Le bot conserve ses 120 lignes recentes en memoire, mais toutes les lignes restent en base jusqu a suppression
explicite de la partie. Les reponses tres longues sont decoupees sans perte, medias stockes separement.
Un `/reset` ouvre une nouvelle partie ; les precedentes restent consultables. Les echanges deja purges par les
anciennes versions ne sont pas reconstruits. L ancien historique compact sert seulement a leur migration.

La plateforme lit les echanges par pages de 100 lignes, y compris pour une salle du plan. Elle affiche le volume
des donnees, l allocation MySQL (tables et index, qui ne retrecissent pas necessairement apres une suppression)
et la taille de chaque partie. La suppression exige les droits editeur et un jeton CSRF ; une marque de
suppression empeche un ancien lot de recrer la partie et le bot retire son etat actif a la synchronisation.
Les anciennes parties du meme joueur restent intactes. Les medias references restent disponibles tant que
la partie existe. Les marques de suppression ne contiennent que les identifiants, pas les conversations.

Tests : `node --test tests/adventure.test.cjs tests/adventure-archive.test.cjs` ; dans Website,
`node --test tests/adventure-history.cjs` et `php tests/adventure-archive-mysql.php` (base de test MySQL isolee).
