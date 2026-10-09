"""Record idle foot anchors from the visible alpha pixels, without editing textures."""
import json
from pathlib import Path
from PIL import Image
root = Path(__file__).resolve().parents[1] / "assets" / "sky"
p = root / "characters.json"
catalogue = json.loads(p.read_text(encoding="utf-8"))
for name, info in catalogue.items():
    if "centerY" in info or name == "Pom":
        continue
    image = Image.open(root / info["texture"]).convert("RGBA")
    width, height = info["frameWidth"], info["frameHeight"]
    offsets = []
    for direction in range(info.get("directions", 8)):
        bottoms = []
        for pose in info["idle"]:
            frame = pose * 8 + direction
            x, y = frame % info["columns"] * width, frame // info["columns"] * height
            alpha = image.crop((x, y, x + width, y + height)).getchannel("A")
            bbox = alpha.point(lambda n: 255 if n >= 39 else 0).getbbox()
            if bbox:
                bottoms.append(bbox[3])
        offsets.append((height - max(bottoms)) / height * info["height"] if bottoms else 0)
    # Sieg: the tail extends below the talons in rear views. Use the talon
    # contact row in each native idle direction, not the silhouette bottom.
    if name == "Sieg":
        feet = [61, 60, 58, 60, 62, 64, 63, 63]
        offsets = [(height - row) / height * info["height"] for row in feet]
        info["footContactRows"] = feet
    info["footOffsets"] = offsets
p.write_text(json.dumps(catalogue, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
