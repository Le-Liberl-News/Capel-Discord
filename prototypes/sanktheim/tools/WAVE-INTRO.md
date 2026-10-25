# Wave intro media

The wave-start Discord announcement is posted first. Its image job edits that same message with the intro, preserving the text and the distance captured at wave start.

Production never renders WebGL or launches Chromium for this clip. `wave-intro.cjs` reads one prepared WebP frame at a time and reuses one decoded image, through the shared `utils/loopingGif.js` encoder and `utils/mediaRender.js` gate used for card animation. Only one shared encoding task runs at once. Bounds: 384×240, 48 frames, 4 fps, 2 MiB output, 8 seconds encoding, 64 MiB observed RSS growth, and at least 128 MiB available memory. Checks are cooperative guardrails, not a hard process/container memory reservation. Concurrent unrelated work can also trip them.

Budget rejection falls back to the final PNG. If memory is already low before loading Canvas, the final prepared WebP is sent directly. The distance also appears in the Discord embed, including this early fallback. Diagnostics records the media task's ordinary call stack, including `wave-intro.cjs`; no labels need to be maintained.

The model, crew, scale and landing camera match the game's cinematic. The camera equations are shared in `mechapom-cinematic.cjs`. Scenery and lighting are prepared ahead of time; the clip is not a recording of current players, weather, felled trees or placed structures. The distance caption is updated from the actual event.

To regenerate the prepared frames on a development PC with Chrome installed:

    node tools/prepare-wave-intro.cjs

The script bundles its local preparation page, serves it on an ephemeral loopback port, captures frames individually and closes both browser and server. The browser and all preparation code stay outside the production media path. Commit the resulting `assets/highlights/wave-intro/` files with source changes affecting the cinematic.
