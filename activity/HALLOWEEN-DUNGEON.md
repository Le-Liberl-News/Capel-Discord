# Donjon Halloween privÃ©

AccÃ¨s Capel : **Donjon Halloween (test)**, administrateurs Discord et utilisateur `744964573249011712`. Les cinq Ã©tages restent vides, sÃ©parÃ©s de la tour dâ€™Esmelas. Lâ€™obscuritÃ© totale, les torches interactives et les feux follets sont une Ã©tape ultÃ©rieure ; lâ€™Ã©clairage actuel permet dâ€™examiner la structure.

## Assets et disposition

- Esmelas FC `c0411` : sols et murs ; toit `c0403` : escaliers. Niveaux intermÃ©diaires Ã  0, 1,8 et 3,6 unitÃ©s, liaisons obliques et dernier escalier de 36 unitÃ©s. Pas de plateformes superposÃ©es.
- Azure `t4010` : bancs, vitraux et **hikari00**, lumiÃ¨re intÃ©grÃ©e au modÃ¨le de la cathÃ©drale. GÃ©omÃ©trie, UV et couleurs/opacitÃ©s des sommets natives conservÃ©es. Le rayon est un dÃ©cor lumineux ; lâ€™Ã©clairage local du sol est calculÃ© sÃ©parÃ©ment.
- FC `t0100` : arbres, avec le feuillage natif ; le tronc bloque la marche, les feuilles et les fleurs sont purement visuelles ; FC `t0200` : surface dâ€™eau. Les bassins bloquent la marche et disposent dâ€™une bordure issue des murs natifs. Leur texture ondule doucement.
- Azure `t1530` : fleurs violettes ; `m4040`, loge dâ€™AltaÃ¯r : motif rituel. Pas de table de torture inventÃ©e : les tables du laboratoire de Zeiss `t3117` et les cages `c3114` sont conservÃ©es.
- Third `ms04550` : sols/murs animÃ©s dâ€™Another Dimension, squelette partagÃ©, sans dÃ©gÃ¢ts ni dÃ©placement de la navigation.

Le gÃ©nÃ©rateur nâ€™ajoute que des triangles natifs copiÃ©s, dÃ©coupÃ©s ou transformÃ©s ; les seules textures publiÃ©es sont celles effectivement rÃ©fÃ©rencÃ©es. Les manifestes `hallowN/layout.json` indiquent le mobilier, les obstacles et les emplacements rÃ©servÃ©s aux mÃ©caniques futures.

## RÃ©importer

```powershell
python activity/tools/export-azure-environment.py --models t4010 t1530 m4040 --effects
node activity/tools/generate-halloween-dungeon.cjs
npm run activity:build
```

Les imports sÃ©lectionnÃ©s sont conservÃ©s localement sous `E:/dev/sky-activity-tools/atelier-combat/azure-environment`. Le jeu installÃ© nâ€™est jamais modifiÃ©. Le gÃ©nÃ©rateur utilise aussi les exports Esmelas, Rolent et du manoir du maire dÃ©jÃ  prÃ©sents dans le cache local.

## Effets Azure

Les **1 275 fichiers EF20** de lâ€™installation actuelle sont dÃ©codÃ©s dans `azure-environment/effects.json` : textures, enfants, masques, parties, courbes brutes, couleurs et Ã©missions. Ce catalogue reste local : il ne constitue pas encore un lecteur reproduisant toutes les animations dâ€™Azure. Les valeurs flottantes non finies des champs inutilisÃ©s deviennent `null`, sans interprÃ©tation inventÃ©e.

RÃ©fÃ©rences de format : [EFF dâ€™Ouroboros](https://github.com/Ouroboros/Falcom/blob/master/ED7/Decompiler/EffectFile.py), [VPA8/MAT4](https://github.com/eArmada8/Ys8_IT3), [dÃ©compression IT3 de uyjulian, MIT](https://gist.github.com/uyjulian/a6ba33dc29858327ffa0db57f447abe5). Les erreurs ou octets non interprÃ©tÃ©s sont signalÃ©s, pas ignorÃ©s.
