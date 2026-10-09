# Capel

Native SC parts: T3119._X3 pedestal (centre x=-0.5, z=7.1), T31MAC03._X3 control panel and T31ORB00._X3 orb. Export these three with `export_sky_assets.py --only-map --center-x 0`, then:

```
python activity/tools/export-capel.py --room <room>/anterose.gltf --panel <panel>/anterose.gltf --orb <orb>/anterose.gltf --output activity/assets/sky/capel
```

Only indexed triangles of the central pedestal are retained; floors and adjacent machines are omitted. Placement and footprint are in `assets/sky/capel.json`. Client navigation, server navigation and projectile surfaces use the same placement.

Right-click the nearby terminal, use Space nearby, or use Actions / a long press on mobile. Prop Hunt opens a shared waiting game at Rolent; participants join from Capel and the owner starts in game. Duel opponents come from today's assigned characters. Connected opponents accept in game; otherwise they receive the existing private Discord invitation. Public spectator announcements still require both players to accept.

`GET /api/terminal` returns the menu; `POST /api/terminal` performs an authenticated action. Real Discord identifiers remain server-side. Creating/joining games and challenging require proximity to Capel; invitations and the host's Start control also work after leaving the tavern. Request UUIDs prevent replayed launches for one minute.
