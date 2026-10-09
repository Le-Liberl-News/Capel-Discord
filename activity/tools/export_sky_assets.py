"""Extract the restaurant textures and decode Sky CH/CP sprites. Original files are read only."""
import argparse
import base64
import importlib.util
import json
from pathlib import Path
import struct
import sys

try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.path.insert(0, r'E:\dev\_tools\pillow')
    from PIL import Image, ImageDraw


def archive_entries(game, archive):
    directory = (game / (archive + '.dir')).read_bytes()
    count = struct.unpack_from('<I', directory, 8)[0]
    with (game / (archive + '.dat')).open('rb') as data:
        for index in range(count):
            offset = 16 + index * 36
            rawname = directory[offset:offset + 12].decode('ascii', errors='replace')
            name = rawname[:8].rstrip() + rawname[8:].rstrip('\0 ')
            packed, unpacked, _, _, location = struct.unpack_from('<IIIII', directory, offset + 16)
            yield name.lower(), data, location, packed, unpacked


def decode_model_texture(data):
    """Sky DDS uses exact pure red as a colour key, including RGB1555 and ARGB4444."""
    import io
    image = Image.open(io.BytesIO(data)).convert('RGBA')
    if data[:4] != b'DDS ':
        return image
    _, flags, fourcc, bits, red, green, blue, alpha = struct.unpack_from('<8I', data, 76)
    if not fourcc and bits == 32 and flags & 64:
        pixels = image.load()
        for y in range(image.height):
            for x in range(image.width):
                if pixels[x, y][:3] == (255, 0, 0): pixels[x, y] = (0, 0, 0, 0)
        return image
    if fourcc or bits != 16 or not flags & 64:
        pixels = image.load()
        for y in range(image.height):
            for x in range(image.width):
                if pixels[x, y][:3] == (255, 0, 0): pixels[x, y] = (0, 0, 0, 0)
        return image
    height, width, pitch = struct.unpack_from('<III', data, 12)
    pitch = max(width * 2, pitch) if struct.unpack_from('<I', data, 8)[0] & 8 else width * 2
    pixels = image.load()
    for y in range(height):
        for x in range(width):
            word = struct.unpack_from('<H', data, 128 + y * pitch + x * 2)[0]
            opacity = 255
            if alpha:
                shift = (alpha & -alpha).bit_length() - 1
                opacity = ((word & alpha) >> shift) * 255 // (alpha >> shift)
            # Confirmed by the supplied xxViewer: only exact pure red is keyed.
            if red and word & (red | green | blue) == red:
                opacity = 0
            r, g, b, _ = pixels[x, y]
            pixels[x, y] = (r, g, b, opacity) if opacity else (0, 0, 0, 0)
    return image


def decode_sprite(ch, cp):
    tiles = struct.unpack_from('<H', ch)[0]
    if len(ch) != 2 + tiles * 512:
        raise ValueError('Invalid CH tiles')
    tile_images = []
    for index in range(tiles):
        words = struct.unpack_from('<256H', ch, 2 + index * 512)
        rgba = bytes(channel for word in words for channel in (((word >> 8) & 15) * 17, ((word >> 4) & 15) * 17, (word & 15) * 17, ((word >> 12) & 15) * 17))
        tile_images.append(Image.frombytes('RGBA', (16, 16), rgba))
    count = struct.unpack_from('<H', cp)[0]
    if len(cp) != 2 + count * 512:
        raise ValueError('Invalid CP frames')
    frames = []
    for frame in range(count):
        image = Image.new('RGBA', (256, 256))
        for index, tile in enumerate(struct.unpack_from('<256H', cp, 2 + frame * 512)):
            if tile == 65535:
                continue
            if tile >= tiles:
                raise ValueError('Invalid CP tile reference')
            image.paste(tile_images[tile], ((index % 16) * 16, (index // 16) * 16))
        frames.append(image)
    return frames


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--game', required=True, type=Path)
    parser.add_argument('--model', required=True, type=Path)
    parser.add_argument('--chips', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('--extra-chips', type=Path)
    parser.add_argument('--textures', type=Path, help='Folder of decoded DDS entries')
    parser.add_argument('--center-x', type=float, default=0)
    parser.add_argument('--only-map', action='store_true')
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    spec = importlib.util.spec_from_file_location('sky_x', Path(__file__).parent / 'vendor/x3_parser.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    module.read_x_to_gltf(str(args.model))
    model = json.loads(Path(str(args.model) + '.gltf').read_text())
    # Some FC maps retain the developer's absolute Windows texture paths.
    for image in model['images']:
        image['uri'] = image['uri'].replace('\\', '/').rsplit('/', 1)[-1]
    needed = {image['uri'].lower().replace('.png', '._ds'): image['uri'] for image in model['images']}
    found = set()
    for archive in sorted(args.game.glob('*.dir')):
        if found == set(needed):
            break
        for name, stream, offset, packed, unpacked in archive_entries(args.game, archive.stem):
            if name not in needed or name in found:
                continue
            decoded = args.textures / name if args.textures else None
            if decoded and decoded.is_file():
                decode_model_texture(decoded.read_bytes()).save(args.output / needed[name])
                found.add(name)
                continue
            if packed != unpacked:
                raise ValueError(f'Compressed texture {name}: extract with ed6-archive first')
            stream.seek(offset)
            decode_model_texture(stream.read(packed)).save(args.output / needed[name])
            found.add(name)
    if found != set(needed):
        raise ValueError(f'Missing textures: {set(needed) - found}')
    # Preserve the original diffuse vertex colours (packed ARGB) alongside the textures.
    binary = bytearray(base64.b64decode(model['buffers'][0]['uri'].split(',')[1]))
    colours = {}
    for mesh in model['meshes']:
        for primitive in mesh['primitives']:
            position_id = primitive['attributes']['POSITION']
            if position_id not in colours:
                accessor = model['accessors'][position_id]
                view = model['bufferViews'][accessor['bufferView']]
                if view.get('byteStride') != 40:
                    continue
                data = bytearray()
                for index in range(accessor['count']):
                    word = struct.unpack_from('<I', binary, view['byteOffset'] + index * 40 + 24)[0]
                    data.extend(((word >> 16) & 255, (word >> 8) & 255, word & 255, (word >> 24) & 255))
                offset = len(binary)
                binary.extend(data)
                model['bufferViews'].append({'buffer': 0, 'byteOffset': offset, 'byteLength': len(data)})
                colours[position_id] = len(model['accessors'])
                model['accessors'].append({'bufferView': len(model['bufferViews']) - 1, 'componentType': 5121, 'type': 'VEC4', 'count': accessor['count'], 'normalized': True})
            primitive['attributes']['COLOR_0'] = colours[position_id]
    model['buffers'][0]['byteLength'] = len(binary)
    model['buffers'][0]['uri'] = 'data:application/octet-stream;base64,' + base64.b64encode(binary).decode('ascii', errors='replace')
    # The original game uses vertex colours and unlit textures, not PBR lighting.
    for material in model['materials']:
        material['extensions'] = {'KHR_materials_unlit': {}}
        texture_index = material.get('pbrMetallicRoughness', {}).get('baseColorTexture', {}).get('index')
        translucent, opaque = False, True
        if texture_index is not None:
            texture_name = model['images'][model['textures'][texture_index]['source']]['uri']
            alpha_values = Image.open(args.output / texture_name).convert('RGBA').getchannel('A').histogram()
            translucent = any(alpha_values[1:255])
            opaque = sum(alpha_values[:255]) == 0
        material['alphaMode'] = 'BLEND' if translucent else 'MASK'
        material['extras'] = {'skyShadowReceiver': opaque}
        material['alphaCutoff'] = 0.1
        material['doubleSided'] = True
    model['extensionsUsed'] = ['KHR_materials_unlit']
    model['nodes'][model['scenes'][model.get('scene', 0)]['nodes'][0]]['translation'] = [-args.center_x, 0, 0]
    (args.output / 'anterose.gltf').write_text(json.dumps(model, separators=(',', ':')))
    if args.only_map:
        print(json.dumps({'meshes': len(model['meshes']), 'textures': len(found)}))
        return
    characters = json.loads((Path(__file__).parent / 'character-map.json').read_text(encoding='utf8'))
    catalogue = {}
    for name, chip in characters.items():
        directory = args.extra_chips if args.extra_chips and (args.extra_chips / (chip + '._ch')).is_file() else args.chips
        ch, cp = directory / (chip + '._ch'), directory / (chip + 'p._cp')
        if not ch.is_file() or not cp.is_file():
            continue
        frames = decode_sprite(ch.read_bytes(), cp.read_bytes())
        boxes = [frame.getbbox() for frame in frames if frame.getbbox()]
        bounds = (min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes))
        width, height = bounds[2] - bounds[0], bounds[3] - bounds[1]
        atlas = Image.new('RGBA', (width * 8, height * ((len(frames) + 7) // 8)))
        for index, frame in enumerate(frames):
            atlas.paste(frame.crop(bounds), ((index % 8) * width, (index // 8) * height))
        atlas.save(args.output / (chip + '.png'))
        catalogue[name] = {'texture': chip + '.png', 'columns': 8, 'rows': (len(frames) + 7) // 8, 'frameWidth': width, 'frameHeight': height, 'frames': len(frames), 'idle': [0], 'run': list(range(max(1, min(8, len(frames) // 8)))), 'directions': min(8, len(frames)), 'fps': 12, 'height': 1.7}
        if name == 'Sieg': catalogue[name].update(idle=[0], run=[3, 4], fps=6)
        if name == 'Estelle':
            preview = Image.new('RGB', (256 * 8, 280 * ((len(frames) + 7) // 8)), '#556060')
            draw = ImageDraw.Draw(preview)
            for index, frame in enumerate(frames):
                preview.paste(frame, ((index % 8) * 256, (index // 8) * 280), frame)
                draw.text(((index % 8) * 256, (index // 8) * 280 + 256), str(index), fill='white')
            preview.save(args.output / 'sprite-audit.png')
    (args.output / 'characters.json').write_text(json.dumps(catalogue, ensure_ascii=False, indent=2))
    print(json.dumps({'meshes': len(model['meshes']), 'textures': len(found), 'characters': len(catalogue)}))

if __name__ == '__main__':
    main()
