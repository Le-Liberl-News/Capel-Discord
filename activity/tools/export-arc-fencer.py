"""Copy only Arc Fencer's original X3 geometry, UVs and material textures."""
import json, shutil
from pathlib import Path

cache = Path('E:/dev/sky-activity-tools/atelier-combat')
output = Path(__file__).resolve().parents[1] / 'assets/sky/combat/arc-fencer'
output.mkdir(parents=True, exist_ok=True)
model = json.loads((cache / 'models/Third/cr04150b.json').read_text(encoding='utf-8'))
for mesh in model['meshes']:
    source = cache / mesh['texture']['texture'].removeprefix('/cache/')
    shutil.copyfile(source, output / source.name)
    mesh['texture'] = source.name
(output / 'model.json').write_text(json.dumps(model) + '\n', encoding='utf-8')
