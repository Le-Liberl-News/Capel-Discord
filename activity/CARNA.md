# Carna

`carna-gun.cjs` owns the timings shared by online combat and local solo training.

- Normal: hold left mouse for up to 3 seconds, 10 shots/s in a uniform angular disk (0.045 rad). The initial aiming axis stays fixed; releasing stops future bullets. Two seconds of reload follow a full burst. Holding through the recovery starts another burst.
- Craft: 5 seconds, 10 shots/s, 12 second cooldown. Smooth third-person transition; camera yaw/pitch steer subsequent bullets. Carna cannot walk during either action/recovery.
- Normal/craft damage budgets: 90/150 before headshots (1.25×), defense and blocks. Bullets hit the nearest enemy or scenery and respect teams.
- Shot rays and cooldowns are authoritative. Active-craft aim updates validate the origin and normalized direction. Solo mode uses the same combat code.

The normal firing sequence comes from Third `as00400._dt`, slot 22. `CH00400` and `CH00402` are exported as supplemental banks; the firing loop uses the actual AS22 firing poses rather than the idle poses in CH00400. Reload uses CH00402. The first-person weapon is a manually masked crop of Carna's original gun, with no generated artwork.

Rebuild supplemental sprites using `python activity/tools/export-carna.py` with the local extracted game files present, then `npm run activity:build`.
