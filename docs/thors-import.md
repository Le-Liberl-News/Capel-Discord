# Thors courtyard prototype

Native source: installed Trails of Cold Steel II, map `t0000` (`Thors Military Academy` in `t_place.tbl`).

The ED8Editor-based local extractor exports `M_T0000`, `O_T00EVT28` (the separate ground), `O_T00TRE00`, `O_T00TRE01`, `O_T00DOR02B`, and `O_T00DOR05`. Their glTF exports are the input to:

```powershell
python activity/tools/import-thors.py --source E:/dev/sky-activity-tools/cold-steel2/gltf
node activity/tools/build-thors-navigation.cjs
npm run activity:build
```

The importer omits collision-only proxies and night/evening variants, then prunes unreachable geometry and textures. It does not change the installed game. `--layout compact` is the default; `--layout original` reconstructs the native layout from the retained extraction. An exact copy of the original published assets is also retained locally at `E:/dev/sky-activity-tools/thors-original-2080bfd`.

The compact layout shortens the empty Z span −20..12 to one quarter of its length, moving the main facade 24 m closer. X spans 4..24 and −24..−4 shrink to 60%, while the central 8 m entrance strip stays full width. Geometry is split at the warp boundaries before deformation, so the stairs and central entrance keep their dimensions and all heights stay unchanged. Ground UVs are adjusted to preserve the paving density. The walking grid covers X −12.5..12.5 and Z 0..14, compared with the original 36 × 32 m area. Combat spawns and the introduction follow the compact layout. The standard combat camera and sprite scale are unchanged.

Access: Capel → `Tester Thors · Parvis`, with the Cold Steel I Discord role. This is a solo-combat test venue, in daylight, with an entrance shot and the standard combat camera. It is not in the random arena pool or online duel rotation. The existing opponent spoiler-role filter still applies.

Visual QA must preserve normal Math.random: fixing it to a constant gives Three.js duplicate UUIDs and corrupts glTF material/texture caches, producing false texture failures.
