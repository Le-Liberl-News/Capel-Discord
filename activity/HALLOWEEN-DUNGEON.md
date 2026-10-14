# Donjon Halloween privé

Accès Capel : **Donjon Halloween (test)**, administrateurs Discord et utilisateur `744964573249011712`. Les cinq étages restent vides, séparés de la tour d’Esmelas. L’obscurité totale, les torches interactives et les feux follets sont une étape ultérieure ; l’éclairage actuel permet d’examiner la structure.

## Assets et disposition

- Esmelas FC `c0411` : sols et murs ; toit `c0403` : escaliers. Niveaux intermédiaires à 0, 1,8 et 3,6 unités, liaisons obliques et dernier escalier de 36 unités. Pas de plateformes superposées.
- Azure `t4010` : bancs, vitraux et **hikari00** et sa projection native **footlight00**, lumière intégrée au modèle de la cathédrale. Géométrie, UV et opacités des sommets natives conservées ; teinte rouge sombre orangée, rayon et motif projeté au sol. Le rayon est un décor lumineux ; l’éclairage local du sol est calculé séparément.
- FC `t0100` : arbres, avec le feuillage natif ; FC `t0200` : surface d’eau. Les bassins bloquent la marche et disposent d’une bordure issue des murs natifs. Leur texture ondule doucement.
- Azure `t1530` : fleurs violettes ; `m4040`, loge d’Altaïr : motif rituel. Pas de table de torture inventée : les tables du laboratoire de Zeiss `t3117` et les cages `c3114` sont conservées.
- Third `ms04550` : sols/murs animés d’Another Dimension, squelette partagé, sans dégâts ni déplacement de la navigation.

Le générateur n’ajoute que des triangles natifs copiés, découpés ou transformés ; les seules textures publiées sont celles effectivement référencées. Les manifestes `hallowN/layout.json` indiquent le mobilier, les obstacles et les emplacements réservés aux mécaniques futures.

## Réimporter

```powershell
python activity/tools/export-azure-environment.py --models t4010 t1530 m4040 --effects
node activity/tools/generate-halloween-dungeon.cjs
npm run activity:build
```

Les imports sélectionnés sont conservés localement sous `E:/dev/sky-activity-tools/atelier-combat/azure-environment`. Le jeu installé n’est jamais modifié. Le générateur utilise aussi les exports Esmelas, Rolent et du manoir du maire déjà présents dans le cache local.

## Effets Azure

Les **1 275 fichiers EF20** de l’installation actuelle sont décodés dans `azure-environment/effects.json` : textures, enfants, masques, parties, courbes brutes, couleurs et émissions. Ce catalogue reste local : il ne constitue pas encore un lecteur reproduisant toutes les animations d’Azure. Les valeurs flottantes non finies des champs inutilisés deviennent `null`, sans interprétation inventée.

Références de format : [EFF d’Ouroboros](https://github.com/Ouroboros/Falcom/blob/master/ED7/Decompiler/EffectFile.py), [VPA8/MAT4](https://github.com/eArmada8/Ys8_IT3), [décompression IT3 de uyjulian, MIT](https://gist.github.com/uyjulian/a6ba33dc29858327ffa0db57f447abe5). Les erreurs ou octets non interprétés sont signalés, pas ignorés.
