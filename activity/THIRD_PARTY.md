# Sources techniques

- Convertisseur X2/X3 vers glTF : [uyjulian, x3_parser.py](https://gist.github.com/uyjulian/db43b5e19d8dde6af1f8e400bc78cfdc), licence MIT (en-tête conservé dans tools/vendor/x3_parser.py).
- Description du format et comparaison du lecteur : [spillerrec/skytrails-replacer](https://github.com/spillerrec/skytrails-replacer), fourni localement par Antoine. Le code du lecteur C++ n’est pas incorporé à l’activité.
- Lecture CH/CP : structure vérifiée dans cradle/chcp.rs de [Aureole](https://github.com/Aureole-Suite/Aureole), décodeur Python local dans tools/export_sky_assets.py.
- Three.js et le SDK Discord sont installés via npm, avec leurs licences d’origine.

Le modèle T1131 et ses textures proviennent de l’installation locale Steam de Sky FC. Les sprites proviennent des installations locales FC et SC. L’export ne modifie pas les archives du jeu.

Les éléments des bulles proviennent des atlas originaux ED6_DT00/c_waku3._ch et c_icon1._ch de Sky FC. Les découpes sont reproductibles avec tools/export_dialogue_assets.py.

Averia Sans Libre : [Google Fonts](https://github.com/google/fonts/tree/main/ofl/averiasanslibre), SIL Open Font License 1.1 ; le fichier OFL.txt est conservé avec la copie de la police dans assets/sky/dialogue.
