"""Sky's fixed 0x4BD0 EF records, independent of the texture atlas.

Offsets checked against ed6_win3.exe: 45E1C0, 55E990, 55EBB0,
55ED20, 55EE90, 55F050, 55F120. The Falcom-Tools effect decompiler
documents the related packed ED7 format; do not confuse it with this one.
"""
import math
import struct
from pathlib import Path

PART_START = 100
PART_SIZE = 0x3F4
EXTRA_START = PART_START + 16 * PART_SIZE

def export_additive_textures(folders, textures, output):
    # The native additive blend uses RGB, including pixels whose DDS alpha is 0.
    # decode_model_texture intentionally clears transparent RGB for map meshes;
    # that conversion must not be used for an additive particle texture.
    from PIL import Image, ImageChops
    for folder in folders:
        game = 'SC' if folder.parent.name.startswith('sc-') else 'Third'
        for entry in textures:
            if entry['game'] != game: continue
            target = output / 'effects' / game / (Path(entry['source']).stem + '-add.png')
            valid = False
            if target.exists():
                try:
                    with Image.open(target) as existing: existing.verify()
                    valid = True
                except (OSError, SyntaxError): pass
            if not valid:
                with Image.open(folder / entry['source']) as image:
                    r, g, b, _ = image.convert('RGBA').split()
                    red = ImageChops.multiply(r.point(lambda x: 255 if x == 255 else 0),
                        ImageChops.multiply(g.point(lambda x: 255 if x == 0 else 0),
                                            b.point(lambda x: 255 if x == 0 else 0)))
                    Image.merge('RGBA', (r, g, b, ImageChops.invert(red))).save(target)
            entry['additiveTexture'] = '/cache/' + target.relative_to(output).as_posix()

def parse_effect(data):
    if len(data) != 0x4BD0:
        raise ValueError(f'Format EF non pris en charge ({len(data)} octets)')
    def text(start, size):
        return data[start:start + size].split(b'\0', 1)[0].decode('cp932', 'replace')
    textures = [text(i * 16, 16) for i in range(4)]
    parts = []
    for i in range(16):
        base = PART_START + i * PART_SIZE
        def u(off): return struct.unpack_from('<I', data, base + off)[0]
        def f(off):
            value = struct.unpack_from('<f', data, base + off)[0]
            return value if math.isfinite(value) else 0
        def vector(off): return [f(off + k * 4) for k in range(3)]
        def curve(off):
            count = min(4, u(off + 4 * 36))
            return [{'flags': u(off + n * 36), 'time': u(off + n * 36 + 4),
                     'jitter': u(off + n * 36 + 8),
                     'min': vector(off + n * 36 + 12),
                     'max': vector(off + n * 36 + 24)} for n in range(count)]
        def values(off):
            count = min(4, u(off + 4 * 16))
            return [{'flags': u(off + n * 16), 'time': u(off + n * 16 + 4),
                     'jitter': u(off + n * 16 + 8),
                     'value': u(off + n * 16 + 12)} for n in range(count)]
        emissions = []
        for n in range(8):
            start = EXTRA_START + (i * 8 + n) * 24
            raw = data[start:start + 24]
            if not any(raw): continue
            delay, interval, variation = struct.unpack_from('<3f', raw, 4)
            if not all(math.isfinite(v) for v in [interval, delay, variation]):
                raise ValueError('Émission EF non finie')
            emissions.append({'kind': raw[0], 'part': raw[1], 'repeat': raw[2],
                              'count': raw[3], 'interval': interval, 'delay': delay,
                              'variation': variation, 'trigger': raw[16], 'attachment': raw[17]})
        parts.append({'index': i, 'name': text(base + 1, 16), 'modelName': text(base + 17, 16),
                      'textureIndex': data[base + 0x21],
                      'renderFlags': struct.unpack_from('<H', data, base + 0x4E)[0],
                      'enabled': bool(u(0x54) & 2), 'flags': u(0x58), 'primitive': data[base + 0x5C],
                      'duration': max(0, f(0x60)), 'motion': data[base + 0xD4],
                      'vertices': [vector(0x24), vector(0x30)],
                      'uv': [f(off) for off in [0x3C, 0x40, 0x44, 0x48]],
                      'position': curve(0x104), 'rotation': curve(0x198),
                      'scale': curve(0x22C), 'angular': curve(0x2C0),
                      'color': values(0x354), 'secondaryColor': values(0x398),
                      'uvAnimation': {'mode': struct.unpack_from('<H', data, base + 0x3DC)[0],
                                      'speed': [f(0x3E0), f(0x3E4)], 'interval': u(0x3E8),
                                      'last': data[base + 0x3F0], 'loop': data[base + 0x3F1]},
                      'emissions': emissions})
    children = [text(len(data) - 36, 16), text(len(data) - 20, 16)]
    return {'textures': textures, 'name': text(80, 16),
            'flags': struct.unpack_from('<I', data, 96)[0],
            'parts': parts, 'children': children}

def export_effects(folders, textures, output):
    lookup = {(e['game'], Path(e['source']).stem.lower()): e for e in textures}
    def texture(game, name):
        key = Path(name).stem.lower()
        entry = lookup.get((game, key))
        shared = False
        if entry is None and game == 'SC':
            entry = lookup.get(('Third', key)); shared = entry is not None
        return {**entry, 'blackKey': name.lower().endswith('.bmp'), 'sharedFromThird': shared} if entry else None
    result = []
    for folder in folders:
        if not folder.exists(): continue
        game = 'SC' if folder.parent.name.startswith('sc-') else 'Third'
        for file in sorted(folder.glob('*._ef')):
            try:
                effect = parse_effect(file.read_bytes())
                effect.update(id=game + '/' + file.name, game=game, source=file.name)
                for part in effect['parts']:
                    if part['primitive'] == 10 and part['modelName']:
                        part['model'] = '/cache/models/' + game + '/' + Path(part['modelName']).stem.lower() + '.json'
                effect['textures'] = [texture(game, name) if name else None for name in effect['textures']]
                effect['missing'] = sorted({str(p['textureIndex']) for p in effect['parts']
                    if p['enabled'] and not p['renderFlags'] & 1 and
                    (p['textureIndex'] >= 4 or not effect['textures'][p['textureIndex']])})
                file_out = output / 'animations' / game / (file.stem + '.json')
                file_out.parent.mkdir(parents=True, exist_ok=True)
                import json
                file_out.write_text(json.dumps(effect, ensure_ascii=False, allow_nan=False), encoding='utf-8')
                thumbnail = next((t['texture'] for t in effect['textures'] if t), None)
                result.append({'id': effect['id'], 'name': effect['name'], 'game': game,
                               'source': file.name, 'texture': thumbnail,
                               'animation': '/cache/' + file_out.relative_to(output).as_posix(),
                               'missing': effect['missing']})
            except ValueError as error:
                result.append({'id': game + '/' + file.name, 'source': file.name,
                               'game': game, 'unsupported': str(error)})
    return result
