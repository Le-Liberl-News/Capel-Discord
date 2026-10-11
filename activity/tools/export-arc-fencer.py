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

# Keep the native X3 skeleton and its 45 keyed poses; the general map
# converter deliberately discards these animation records.
import struct, tempfile
parser = (Path(__file__).resolve().parent / 'vendor/x3_parser.py').read_text(encoding='utf-8')
parser = parser.replace('submodel_node["name"] = submodel_name', 'submodel_node["name"] = submodel_name\n\t\tsubmodel_node["native"] = {"matrix":submodel_matrix,"parent":parent_node_id}')
parser = parser.replace('primitive_attributes = append_mesh_segment_data(data_bytes=f.read(vertice_size * vertices_count), data_stride=vertice_size)', 'raw_vertices=f.read(vertice_size * vertices_count)\n\t\t\tprimitive_attributes = append_mesh_segment_data(data_bytes=raw_vertices, data_stride=vertice_size)\n\t\t\tskin={"vertices":[list(struct.unpack_from("<12f",raw_vertices,i*48)) for i in range(vertices_count)],"joints":[list(raw_vertices[i*48+16:i*48+20]) for i in range(vertices_count)],"bind":[],"bones":[]} if vertice_size==48 else None')
parser = parser.replace('content = read_unpack("<ffffffffffffffff", f) # Inverse bind matrix?', 'content = read_unpack("<ffffffffffffffff", f) # Inverse bind matrix?\n\t\t\t\t\tskin["bind"].append(content)')
parser = parser.replace('\t\t\t\t\tname = trim_null(f.read(256)).decode("ASCII")', '\t\t\t\t\tname = trim_null(f.read(256)).decode("ASCII")\n\t\t\t\t\tskin["bones"].append(name)')
parser = parser.replace('mesh["name"] = mesh_name', 'mesh["name"] = mesh_name\n\t\t\t\tmesh["nativeSkin"] = skin')
for count, width, key in [('count',3,'translation'),('count2',4,'rotation'),('count3',3,'scale')]:
    label={'translation':'Translation','rotation':'Rotation','scale':'Scale'}[key]
    start=f'\t\t\tfor _ in range({count}): # {label}?'
    end='\n\n' if key!='scale' else '\n\n'
    a=parser.index(start); b=parser.index(end,a)
    parser=parser[:a]+f'\t\t\tsubmodel_node["native"]["{key}"] = [list(read_unpack("<I'+ 'f'*width +f'",f)) for _ in range({count})]'+parser[b:]
namespace={};exec(compile(parser,'arc-fencer-x3','exec'),namespace)
source=Path.home()/'.codex/sky-effect-work/third-33/ED6_DT33/cr04150b._x3'
with tempfile.TemporaryDirectory() as work:
    target=Path(work)/source.name;shutil.copyfile(source,target)
    namespace['read_x_to_gltf'](str(target))
    gltf=json.loads(Path(str(target)+'.gltf').read_text(encoding='utf-8'))
model['skeleton']=gltf['nodes']
for mesh,original in zip(model['meshes'],gltf['meshes']):
    skin=original['nativeSkin']
    vertices=skin.pop('vertices');skin['positions']=[v[:3] for v in vertices];skin['weights']=[[v[3]]*round(1/v[3]) for v in vertices]
    # This mesh uses equal-weight packed bone indices (1, 1/2 or 1/3).
    mesh['skin']=skin
(output / 'model.json').write_text(json.dumps(model)+'\n',encoding='utf-8')
