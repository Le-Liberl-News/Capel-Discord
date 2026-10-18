# Thors courtyard prototype

Native source: installed Trails of Cold Steel II, map `t0000` (`Thors Military Academy` in `t_place.tbl`).

The ED8Editor-based local extractor exports `M_T0000`, `O_T00EVT28` (the separate ground), `O_T00TRE00`, `O_T00TRE01`, `O_T00DOR02B`, and `O_T00DOR05`. Their glTF exports are the input to:

```powershell
python activity/tools/import-thors.py --source E:/dev/sky-activity-tools/cold-steel2/gltf
node activity/tools/build-thors-navigation.cjs
npm run activity:build
```

The importer preserves native mesh transforms and texture bindings, omits collision-only proxies and night/evening variants, then prunes unreachable geometry and textures. It does not change the installed game. The courtyard's walking grid covers X −18..18 and Z −18..14; scenery beyond that remains a backdrop. Native curbs and surfaces supply the actual heights.

Access: Capel → `Tester Thors · Parvis`, with the Cold Steel I Discord role. This is a solo-combat test venue, in daylight, with an entrance shot and a wider default camera. It is not in the random arena pool or online duel rotation. The existing opponent spoiler-role filter still applies.

Visual QA must preserve normal Math.random: fixing it to a constant gives Three.js duplicate UUIDs and corrupts glTF material/texture caches, producing false texture failures.
