# Sources techniques

- Convertisseur X2/X3 vers glTF : [uyjulian, x3_parser.py](https://gist.github.com/uyjulian/db43b5e19d8dde6af1f8e400bc78cfdc), licence MIT (en-tête conservé dans tools/vendor/x3_parser.py).
- Description du format et comparaison du lecteur : [spillerrec/skytrails-replacer](https://github.com/spillerrec/skytrails-replacer), fourni localement par Antoine. Le code du lecteur C++ n’est pas incorporé à l’activité.
- Lecture CH/CP : structure vérifiée dans cradle/chcp.rs de [Aureole](https://github.com/Aureole-Suite/Aureole), décodeur Python local dans tools/export_sky_assets.py.
- Three.js et le SDK Discord sont installés via npm, avec leurs licences d’origine.

Le modèle T1131 et ses textures proviennent de l’installation locale Steam de Sky FC. Les sprites proviennent des installations locales FC et SC. L’export ne modifie pas les archives du jeu.

Les éléments des bulles proviennent des atlas originaux ED6_DT00/c_waku3._ch et c_icon1._ch de Sky FC. Les découpes sont reproductibles avec tools/export_dialogue_assets.py.

Averia Sans Libre : [Google Fonts](https://github.com/google/fonts/tree/main/ofl/averiasanslibre), SIL Open Font License 1.1 ; le fichier OFL.txt est conservé avec la copie de la police dans assets/sky/dialogue.

Cinzel (titre de l’arène du Pilier Axis) : [Google Fonts](https://github.com/google/fonts/tree/main/ofl/cinzel), SIL Open Font License 1.1 ; licence conservée dans assets/sky/fonts/Cinzel-OFL.txt.

Pilier Axis, sommet : modèle SC C5313 (ED6_DT2A/c5313._x3) et textures ED6_DT35, exportés depuis l’installation Steam SC ; musique BGM/ED6403.ogg (BGM 43 du scénario c5313), copiée dans assets/sky/music/axis.ogg.

Musique de la map : BGM/ED6101.ogg (Commercial City of Bose), copie de l’installation Steam FC dans assets/sky/music/anterose.ogg. Le scénario T1131 utilise BGM 11.

Rolent : modèle SC T0100, textures et objets T01TAR00 (tonneau), T01BOX00 (caisse), exportés depuis la même installation Steam SC. Les gradins utilisent le modèle original de Grancel, avec une grille de navigation séparée.
