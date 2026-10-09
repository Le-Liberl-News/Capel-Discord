# Bose et Rolent — assemblage extérieur

`assets/sky/liberl/viewer.html` affiche les 45 modèles dans une seule scène et un seul repère. La sélection d’un lieu ne remplace pas la map : elle déplace seulement la caméra. Le vol libre permet de traverser le même espace sans chargement de zone.

Les positions viennent des boîtes de sortie des fichiers FC `ED6_DT12/*._en`. Une arête relie deux sorties lorsque leurs centres coïncident après translation. Les géométries natives `ED6_DT0A/*._x2` gardent leur échelle, leur relief, leurs couleurs et leurs textures. Les matrices natives sont appliquées aux sommets ; les triangles des nœuds miroir sont retournés. Les primitives sont regroupées par matériau et par zone, les sommets inutilisés sont retirés, et les PNG identiques sont partagés.

## Limites du premier assemblage

Les passages du jeu ne définissent pas tous un monde continu. Certaines boucles impliquent des téléportations, notamment sur Malga et Ravennue ; les trois passages entre les quartiers de Bose changent aussi d’altitude. On ne déforme pas les modèles pour cacher ces écarts. `layout.json` conserve les points d’origine, les translations, les résidus et le statut de chaque raccord. **Options → Raccords** les affiche : vert si l’écart est inférieur à deux unités, rouge sinon. Les raccords rouges, les chevauchements et les bords exposés doivent encore être aménagés avant d’utiliser l’ensemble comme terrain de jeu.

La vue d’ensemble utilise un fond neutre pour voir les limites réelles des modèles. Le panorama lointain des vues rapprochées est un décor, pas du terrain supplémentaire. Les intérieurs et les variantes détruites sont exclus. Il n’y a encore ni Lynx, ni collisions de vol, ni joueurs dans cette vue de travail.

## Reproduction

Utiliser uniquement les modèles et les tables d’entrées déjà extraits du jeu possédé localement. Les fichiers du jeu ne sont pas modifiés.

```powershell
python activity/tools/assemble-liberl.py --game <dossier-FC> --models <ED6_DT0A> --entrances <ED6_DT12> --cache <cache-local> --output activity/assets/sky/liberl
node activity/tools/pack-liberl.mjs activity/assets/sky/liberl <cache-local>
npm run activity:build
```

Le cache garde les exports intermédiaires sur le PC. Seuls le terrain assemblé, ses textures utiles, la description des raccords et la vue compilée sont publiés. Le script réutilise les exports présents dans le cache ; pour réexporter une zone, retirer son export intermédiaire dans ce cache.
