"""FPS hand/weapon frames cropped from Josette's original shooting sprites."""
import sys
from pathlib import Path
from export_sky_assets import decode_sprite, Image

source=Path('E:/dev/sky-activity-tools/third-07/ED6_DT07')
frames=decode_sprite((source/'ch00312._ch').read_bytes(),(source/'ch00312p._cp').read_bytes())
output=Path(__file__).resolve().parents[1]/'assets/sky/combat/josette-gun.png'
# Right-facing aim, discharge and recoil; the HUD mirrors this toward its centre.
box=(143,119,183,149)
atlas=Image.new('RGBA',(40*3,30))
for i,pose in enumerate([2,3,4]):
    atlas.paste(frames[pose*8+4].crop(box),(40*i,0))
atlas.save(output,optimize=True)
