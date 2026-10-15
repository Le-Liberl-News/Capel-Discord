Prototype local « Le lac des hortensias ».

- `eau-rouge.png` : palette rouge de l’eau native `T02O1703.png`.
- `reflets-rouges.png` : palette rouge des reflets natifs `T02O1803.png`.
- `hortensias-feuillage.png` : larges feuilles découpées et retouchées depuis `T153nk10.png`, assemblées manuellement.
- `bouquet-blanc.png` / `bouquet-violet.png` : petites fleurs à quatre sépales dessinées à la main en pixels, regroupées en têtes rondes d’après les deux photos de référence de l’utilisateur. Textures 128 × 128 sur petits volumes facettés de 48 triangles par tête.
- `bouquet-halo-blanc.png` : halo blanc à alpha diffus, indépendant de la lumière de la scène. RGB blanc conservé jusque dans les zones transparentes pour éviter une double atténuation.
- `hortensias-blanc.png` / `hortensias-violet.png` : atlas de contrôle du buisson complet, 256 × 256. Les anciens `*-halo.png` restent des masques de contrôle.

Retouches déterministes dans `tools/map-editor/lake-textures.py`. Aucun asset généré par IA. Les photos servent de référence de forme et de palette ; elles ne sont pas utilisées comme textures photographiques. Les petits volumes des têtes sont assemblés manuellement dans `lake-prototype.cjs` pour éviter la forme d’étoile des panneaux croisés vus d’en haut.
