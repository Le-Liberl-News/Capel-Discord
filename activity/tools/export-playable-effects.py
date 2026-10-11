"""Copy only the selected EF assemblies and their dependencies from the local atelier."""
import json, shutil
from pathlib import Path
cache = Path('E:/dev/sky-activity-tools/atelier-combat')
output = Path(__file__).resolve().parents[1] / 'assets/sky/effects/native'
catalogue = json.loads((cache / 'catalogue.json').read_text(encoding='utf8'))
entries = {e['id'].lower(): e for e in catalogue['animations'] if e.get('animation')}
selected = {}

def resource(url):
    relative = url.removeprefix('/cache/')
    target = output / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(cache / relative, target)
    return relative

def effect(identifier):
    identifier = identifier.lower()
    if identifier in selected:
        return
    entry = entries[identifier]
    definition = json.loads((cache / entry['animation'].removeprefix('/cache/')).read_text(encoding='utf8'))
    selected[identifier] = {**entry, 'animation': entry['animation'].removeprefix('/cache/'), 'texture': entry['texture'].removeprefix('/cache/') if entry.get('texture') else None}
    for texture in definition['textures']:
        if texture:
            for key in ['texture', 'additiveTexture']:
                if texture.get(key): texture[key] = resource(texture[key])
    for part in definition['parts']:
        if part.get('model'):
            original=cache/part['model'].removeprefix('/cache/')
            model=json.loads(original.read_text(encoding='utf8'))
            for mesh in model['meshes']:
                for key in ['texture','additiveTexture']:
                    if mesh.get('texture',{}).get(key):mesh['texture'][key]=resource(mesh['texture'][key])
            relative=part['model'].removeprefix('/cache/');target=output/relative;target.parent.mkdir(parents=True,exist_ok=True)
            target.write_text(json.dumps(model,separators=(',',':')),encoding='utf8');part['model']=relative
    for name in definition['children']:
        if name: effect(entry['game'] + '/' + name.replace('.eff', '._ef'))
    target = output / selected[identifier]['animation']
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(definition, ensure_ascii=False, separators=(',', ':')), encoding='utf8')

heroes=json.loads((output.parents[1]/'combat/hero-actions.json').read_text(encoding='utf8'))
hero_effects={action['nativeEffect'] for hero in heroes.values() for action in hero.values() if isinstance(action,dict) and action.get('nativeEffect')}
hero_effects.update(e['id'] for hero in heroes.values() for action in hero.values() if isinstance(action,dict) for e in action.get('chargeEffects',[]))
for identifier in sorted(hero_effects) + [f'SC/damage{i}._ef' for i in [0,1,2,3,5]] + ['SC/mg050_0._ef', 'SC/sc001_10._ef', 'SC/mgaria0._ef', 'SC/mg011_0._ef']:
    effect(identifier)
for identifier in ['Third/msc0614._ef']:
    effect(identifier)
(output / 'catalogue.json').write_text(json.dumps(list(selected.values()), ensure_ascii=False, separators=(',', ':')), encoding='utf8')
print(len(selected), 'assemblies exported')
