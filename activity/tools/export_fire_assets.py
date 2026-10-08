"""Export the native SC fire projectile and flame frames from decoded ED6_DT33.
Usage: python activity/tools/export_fire_assets.py <extracted-ED6_DT33> <output>
"""
import sys
from pathlib import Path
from export_sky_assets import decode_model_texture

source, output = map(Path, sys.argv[1:3])
output.mkdir(parents=True, exist_ok=True)
for name, crop, target in [
    ("fire._ds", (0, 192, 256, 256), "fire-bolt.png"),
    ("mgfire3._ds", (0, 0, 256, 64), "fire-frames.png"),
]:
    image = decode_model_texture((source / name).read_bytes())
    if image.size != (256, 256):
        raise ValueError(f"Unexpected native texture size: {name}: {image.size}")
    image.crop(crop).save(output / target)
