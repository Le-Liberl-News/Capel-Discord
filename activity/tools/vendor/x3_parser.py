# SPDX-License-Identifier: MIT

# Work in progress script to extract model data from Trails in the Sky / Sora no Kiseki _X2/_X3 files to GLTF files.
# This is not very user friendly.
# For something more user friendly, see the following:
# https://github.com/rds1983/OpenSora
# https://github.com/spillerrec/skytrails-replacer


import sys
import struct

def read_unpack(fmt, f):
	return struct.unpack(fmt, f.read(struct.calcsize(fmt)))

def trim_null(s):
	return s[:s.find(b"\x00")]

def read_x_to_gltf(infn):
	gltf_data = {}
	asset = {}
	asset["generator"] = "ed6x2gltf"
	asset["version"] = "2.0"
	gltf_data["asset"] = asset
	buffers = []
	# We'll modify this later
	buffer0 = {}
	buffers.append(buffer0)
	gltf_data["buffers"] = buffers
	bufferviews = []
	gltf_data["bufferViews"] = bufferviews
	accessors = []
	gltf_data["accessors"] = accessors
	embedded_giant_buffer = []
	embedded_giant_buffer_length = [0]
	meshes = []
	gltf_data["meshes"] = meshes
	images = []
	gltf_data["images"] = images
	textures = []
	gltf_data["textures"] = textures
	materials = []
	gltf_data["materials"] = materials
	nodes = []
	gltf_data["nodes"] = nodes
	gltf_data["scene"] = 0
	scenes = []
	if True:
		scene = {}
		scene["nodes"] = [0]
		scenes.append(scene)
		node = {}
		nodes.append(node)
		node["name"] = "VisualSceneNode"
		node["scale"] = [-1, 1, 1]
	gltf_data["scenes"] = scenes

	texture_fn_dic = {}

	def append_texture(texture_name):
		image_id = len(images)
		image = {}
		images.append(image)
		image["uri"] = texture_name
		texture_id = len(textures)
		texture = {}
		textures.append(texture)
		texture["source"] = image_id
		return texture_id

	def append_material(texture_name, texture_normal_name, texture_roughness_name):
		if texture_name in texture_fn_dic:
			return texture_fn_dic[texture_name]
		material_id = len(materials)
		material = {}
		materials.append(material)
		if texture_name != "":
			textureInfo_baseColorTexture = {}
			textureInfo_baseColorTexture["index"] = append_texture(texture_name[:-4].upper() + ".png")
			pbrMetallicRoughness = {}
			pbrMetallicRoughness["baseColorTexture"] = textureInfo_baseColorTexture
			pbrMetallicRoughness["metallicFactor"] = 0.0
			if texture_roughness_name != "":
				textureInfo_metallicRoughnessTexture = {}
				textureInfo_metallicRoughnessTexture["index"] = append_texture(texture_roughness_name[:-4].upper() + ".png")
				pbrMetallicRoughness["metallicRoughnessTexture"] = textureInfo_metallicRoughnessTexture
			material["pbrMetallicRoughness"] = pbrMetallicRoughness
			if texture_normal_name != "":
				textureInfo_normalTexture = {}
				textureInfo_normalTexture["index"] = append_texture(texture_normal_name[:-4].upper() + ".png")
				material["normalTexture"] = textureInfo_normalTexture
		texture_fn_dic[texture_name] = material_id
		return material_id

	def append_bufferview(blobdata, data_stride=None):
		bufferview = {}
		bufferview["buffer"] = 0
		bufferview["byteOffset"] = embedded_giant_buffer_length[0]
		bufferview["byteLength"] = len(blobdata)
		if data_stride != None:
			bufferview["byteStride"] = data_stride
		embedded_giant_buffer.append(blobdata)
		embedded_giant_buffer_length[0] += len(blobdata)
		padding_length = (4 - (len(blobdata) % 4))
		embedded_giant_buffer.append(b"\x00" * padding_length)
		embedded_giant_buffer_length[0] += padding_length
		bufferview_id = len(bufferviews)
		bufferviews.append(bufferview)
		return bufferview_id

	def append_accessor(bufferview_id, component_type, value_type, byte_offset, value_count):
		accessor = {}
		accessor["bufferView"] = bufferview_id
		accessor["componentType"] = component_type
		accessor["type"] = value_type
		if byte_offset != None:
			accessor["byteOffset"] = byte_offset
		accessor["count"] = value_count
		accessor_id = len(accessors)
		accessors.append(accessor)
		return accessor_id

	def append_mesh_indice_data(data_bytes):
		bufferview_id = append_bufferview(data_bytes)

		return append_accessor(bufferview_id, component_type=5123, value_type="SCALAR", byte_offset=None, value_count=len(data_bytes) // 2)

	def append_mesh_segment_data(data_bytes, data_stride=0):
		bufferview_id = append_bufferview(data_bytes, data_stride)
		value_count = len(data_bytes) // data_stride

		attributes = {}

		attributes["POSITION"] = append_accessor(bufferview_id, component_type=5126, value_type="VEC3", byte_offset=0, value_count=value_count)
		attributes["NORMAL"] = append_accessor(bufferview_id, component_type=5126, value_type="VEC3", byte_offset=12, value_count=value_count)
		attributes["TEXCOORD_0"] = append_accessor(bufferview_id, component_type=5126, value_type="VEC2", byte_offset=(data_stride - 8), value_count=value_count)
		
		return attributes

	def parse_submodel(f, version, parent_node_id):
		submodel_name = trim_null(f.read(260)).decode("ASCII")
		submodel_matrix = read_unpack("<ffffffffffffffff", f)
		node_id = len(nodes)
		parent_node = nodes[parent_node_id]
		if "children" not in parent_node:
			parent_node["children"] = []
		parent_node["children"].append(node_id)
		submodel_node = {}
		nodes.append(submodel_node)
		submodel_node["name"] = submodel_name
		texture_count = 0
		if version >= 2:
			texture_count = read_unpack("<H", f)[0]
		texture_names = []
		texture_name_extra_map = {}
		for _ in range(texture_count):
			_ = read_unpack("<I", f)[0]
			read_unpack("<ffffffffffffffff", f)
			_ = read_unpack("<I", f)[0]
			texture_name = trim_null(f.read(204)).decode("ASCII")
			texture_normal_name = trim_null(f.read(204)).decode("ASCII")
			# Special case: T2300._X3 has a full-width character
			texture_roughness_name = trim_null(f.read(204)).decode("ms932")
			_ = f.read(168)
			texture_names.append(texture_name)
			texture_name_extra_map[texture_name] = [texture_normal_name, texture_roughness_name]
		mesh_count = read_unpack("<H", f)[0]
		for _ in range(mesh_count):
			mesh_name = trim_null(f.read(256)).decode("ASCII")
			magic = f.read(4) # [0xD2, 0x01, 0x00, 0x00] # Always 466 / 0x000001D2
			vertice_size = read_unpack("<I", f)[0]
			texture_ref_count = read_unpack("<I", f)[0]
			indice_segments = []
			for _ in range(texture_ref_count):
				face_start = read_unpack("<I", f)[0] # Face offset ((sizeof indices[0]) * 3) bytes
				face_count = read_unpack("<I", f)[0] # Face count ((sizeof indices[0]) * 3) bytes
				face_end = face_start + face_count
				texture_index = None
				if version == 1:
					_ = f.read(176)
					texture_name = trim_null(f.read(256)).decode("ASCII")
					texture_index = len(texture_names)
					texture_names.append(texture_name)
					_ = f.read(104)
				elif version >= 2:
					start2 = read_unpack("<I", f)[0] # Vertices start?
					count2 = read_unpack("<I", f)[0] # Vertices length?
					read_unpack("<IIIIIIIIIIIIIIIIIIIIIIII", f)
					texture_index = read_unpack("<I", f)[0]
					_ = read_unpack("<I", f)[0]
				indice_segments.append([face_start, face_end, texture_index])
			vertices_count = read_unpack("<I", f)[0]
			primitive_attributes = None
			if False:
				for _ in range(vertices_count):
					if vertice_size in [40, 48]:
						pos = read_unpack("<fff", f)
						normal = read_unpack("<fff", f)
						if vertice_size == 48:
							_ = read_unpack("<f", f)[0] # Range -1.0 to 1.0
							_ = read_unpack("<f", f)[0] # Range -1.0 to 1.0
						_ = read_unpack("<I", f)[0] # Usually 0xFFFFFFFF
						_ = read_unpack("<I", f)[0] # Usually 0x000000FF
						u = read_unpack("<f", f)[0]
						v = read_unpack("<f", f)[0]
			else:
				primitive_attributes = append_mesh_segment_data(data_bytes=f.read(vertice_size * vertices_count), data_stride=vertice_size)
			indice_count = read_unpack("<I", f)[0]
			primitive_indices = None
			if False:
				for _ in range(indice_count):
					indice = read_unpack("<H", f)[0]
			else:
				primitive_indices = f.read(2 * indice_count)
			if vertice_size == 48: # Bones
				_ = read_unpack("<I", f)[0]
				_ = read_unpack("<I", f)[0]
				bone_count = read_unpack("<I", f)[0]
				for _ in range(bone_count):
					content = read_unpack("<ffffffffffffffff", f) # Inverse bind matrix?
				for _ in range(bone_count):
					name = trim_null(f.read(256)).decode("ASCII")
			min_pos = read_unpack("<fff", f)
			max_pos = read_unpack("<fff", f)
			avg_pos = read_unpack("<fff", f)
			_ = read_unpack("<f", f)[0]
			unknown7 = read_unpack("<I", f)[0]
			for _ in range(unknown7 * 26):
				unknown_data = read_unpack("<f", f)[0]

			if False:
				# Validation: check to make sure textures are mapped on all faces, and there are no gaps
				indice_segment_face_begins = [indice_segment[0] for indice_segment in indice_segments]
				indice_segment_face_begins.append(indice_count // 3)
				for indice_segment in indice_segments:
					if indice_segment[1] not in indice_segment_face_begins:
						raise Exception("Gap detected " + ("%s %d %d %d" % (infn, indice_segment[0], indice_segment[1], indice_count // 3)))

			if vertices_count > 0:
				mesh_primitives = []
				for indice_segment in indice_segments:
					texture_normal_name = ""
					texture_roughness_name = ""
					texture_names.append(texture_name)
					texture_name = texture_names[indice_segment[2]]
					if texture_name in texture_name_extra_map:
						texture_normal_name = texture_name_extra_map[texture_name][0]
						texture_roughness_name = texture_name_extra_map[texture_name][1]
					primitive = {}
					primitive["attributes"] = primitive_attributes
					primitive["indices"] = append_mesh_indice_data(data_bytes=primitive_indices[indice_segment[0] * 2 * 3:indice_segment[1] * 2 * 3])
					primitive["material"] = append_material(texture_name, texture_normal_name, texture_roughness_name)
					primitive["mode"] = 4 # TRIANGLES
					mesh_primitives.append(primitive)
				mesh_id = len(meshes)
				mesh = {}
				meshes.append(mesh)
				mesh["name"] = mesh_name
				mesh["primitives"] = mesh_primitives
				mesh_node_id = len(nodes)
				mesh_node = {}
				nodes.append(mesh_node)
				mesh_node["name"] = "mesh_" + mesh_name
				mesh_node["mesh"] = mesh_id
				if "children" not in submodel_node:
					submodel_node["children"] = []
				submodel_node["children"].append(mesh_node_id)

		unknown1 = read_unpack("<B", f)[0]
		if True: # Unknown block (possibly animation related?)
			start_a = read_unpack("<I", f)[0]
			end_a = read_unpack("<I", f)[0]
			start_b = read_unpack("<I", f)[0]
			end_b = read_unpack("<I", f)[0]
			start_c = read_unpack("<I", f)[0]
			end_c = read_unpack("<I", f)[0]

			_ = read_unpack("<I", f)[0]
			_ = read_unpack("<I", f)[0]
			count = read_unpack("<I", f)[0]

			for _ in range(count): # Translation?
				step = read_unpack("<I", f)[0]
				_ = read_unpack("<f", f)[0]
				_ = read_unpack("<f", f)[0]
				_ = read_unpack("<f", f)[0]

			count2 = read_unpack("<I", f)[0]

			for _ in range(count2): # Rotation?
				step = read_unpack("<I", f)[0]
				_ = read_unpack("<f", f)[0]
				_ = read_unpack("<f", f)[0]
				_ = read_unpack("<f", f)[0]
				_ = read_unpack("<f", f)[0]

			count3 = read_unpack("<I", f)[0]

			for _ in range(count3): # Scale?
				step = read_unpack("<I", f)[0]
				_ = read_unpack("<f", f)[0]
				_ = read_unpack("<f", f)[0]
				_ = read_unpack("<f", f)[0]

			unknown9 = read_unpack("<I", f)[0]
			if unknown9 != 0:
				raise Exception("unknown9 not 0")
		submodel_count = read_unpack("<H", f)[0]

		for i in range(submodel_count):
			parse_submodel(f, version, parent_node_id=node_id)

	def parse_ed6_x(f):
		type_ = read_unpack("<B", f)[0]
		if type_ not in [0, 2, 4]:
			raise Exception("Unexpected type value " + str(type_))
		version = read_unpack("<B", f)[0]
		if version in [0]:
			raise Exception("Unhandled version value " + str(version))
		if version not in [1, 2]:
			raise Exception("Unexpected version value " + str(version))
		if version >= 2:
			read_unpack("<fffffffffff", f)
		frame_count = read_unpack("<H", f)[0]
		for i in range(frame_count):
			parse_submodel(f, version, parent_node_id=0)
		min_pos = read_unpack("<fff", f)
		min_pos = read_unpack("<fff", f)
		avg_pos = read_unpack("<fff", f)
		_ = read_unpack("<f", f)[0]

	with open(infn, "rb") as f:
		parse_ed6_x(f)

	if len(nodes) > 0 and (len(meshes) > 0):
		import json
		import base64
		embedded_giant_buffer_joined = b"".join(embedded_giant_buffer)
		buffer0["byteLength"] = len(embedded_giant_buffer_joined)
		if False:
			with open(infn + ".glb", "wb") as f:
				jsondata = json.dumps(gltf_data).encode("utf-8")
				jsondata += b"\x20" * (4 - (len(jsondata) % 4)) # padding
				f.write(struct.pack("<III", 0x46546C67, 2, 12 + 8 + len(jsondata) + 8 + len(embedded_giant_buffer_joined)))
				f.write(struct.pack("<II", len(jsondata), 0x4E4F534A))
				f.write(jsondata)
				f.write(struct.pack("<II", len(embedded_giant_buffer_joined), 0x004E4942))
				f.write(embedded_giant_buffer_joined)
		else:
			buffer0["uri"] = (b"data:application/octet-stream;base64," + base64.b64encode(embedded_giant_buffer_joined)).decode("ASCII")
			with open(infn + ".gltf", "wb") as f:
				jsondata = json.dumps(gltf_data, indent=4).encode("utf-8")
				f.write(jsondata)

if __name__ == "__main__":
	read_x_to_gltf(sys.argv[1])
