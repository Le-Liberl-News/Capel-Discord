# SPDX-License-Identifier: MIT
# uyjulian: https://gist.github.com/uyjulian/a6ba33dc29858327ffa0db57f447abe5
import sys
import io
import struct

def check_eof(ident, f):
	savepos = f.tell()
	f.seek(0, io.SEEK_END)
	savepos2 = f.tell()
	f.seek(savepos)
	if savepos != savepos2:
		print(ident + " Not EOF " + str(savepos) + " " + str(savepos2))

def read_unpack(fmt, f):
	return struct.unpack(fmt, f.read(struct.calcsize(fmt)))

def read_check(f, bytes_len):
	d = f.read(bytes_len)
	if len(d) != bytes_len:
		raise Exception("Bytes read not expected")

def read_fixed_string(f, str_len=64):
	return f.read(str_len).rstrip(b"\x00")

def read_matrix4_float(f):
	return read_unpack("ffffffffffffffff", f)

def read_vector2_float(f):
	return read_unpack("ff", f)

def read_vector3_float(f):
	return read_unpack("fff", f)

def read_vector4_float(f):
	return read_unpack("ffff", f)

def read_vector2_uint32(f):
	return read_unpack("II", f)

def read_vector3_uint32(f):
	return read_unpack("III", f)

def read_vector4_uint32(f):
	return read_unpack("IIII", f)

# Reference: CEgPacks3_C77::ExecUnpack
def decompress_blocks_single(f, dst, in_dst_offset, block_size, uncompressed_block_size):
	dst_offset = in_dst_offset
	block_type = read_unpack("<I", f)[0]
	is_compressed = (block_type == 8)
	if block_type not in [0, 8]:
		raise Exception("Unsupported block type " + str(block_type))
	if is_compressed:
		src = f.read(block_size - 4)
		src_offset = 0
		while src_offset < len(src):
			match_len = src[src_offset]
			src_offset += 1
			num = src[src_offset]
			src_offset += 1
			if match_len == 0:
				dst[dst_offset:dst_offset + num] = src[src_offset:src_offset + num]
				src_offset += num
				dst_offset += num
			else:
				offset = num + 1
				if offset < match_len:
					for i in range(match_len):
						dst[dst_offset + i] = dst[(dst_offset - offset) + i]
				else:
					sliding_window_pos = dst_offset - offset
					dst[dst_offset:dst_offset + match_len] = dst[sliding_window_pos:sliding_window_pos + match_len]
				dst_offset += match_len
				dst[dst_offset:dst_offset + 1] = src[src_offset:src_offset + 1]
				src_offset += 1
				dst_offset += 1
	else:
		dst[dst_offset:dst_offset + uncompressed_block_size] = f.read(uncompressed_block_size)
	return dst

# Reference: CEgPacks2::UnpackBZMode2
# Also known as falcom_compress / BZ / BZip / zero method
def decompress(buffer, output, size):
	offset = 0 # u16
	bits = 8 # 8 to start off with, then 16
	flags = int.from_bytes(buffer[offset:offset + 2], byteorder="little")
	offset += 2
	flags >>= 8
	outputoffset = 0 # u16
	def getflag():
		nonlocal bits
		nonlocal flags
		nonlocal offset

		if bits == 0:
			slice_ = buffer[offset:offset + 2]
			if len(slice_) < 2:
				raise Exception("Out of data")
			flags = int.from_bytes(slice_, byteorder="little")
			offset += 2
			bits = 16
		flag = flags & 1
		flags >>= 1
		bits -= 1
		return flag
	def setup_run(prev_u_buffer_pos):
		nonlocal offset
		nonlocal buffer
		nonlocal output
		nonlocal outputoffset

		run = 2 # u16
		if getflag() == 0:
			run += 1
			if getflag() == 0:
				run += 1
				if getflag() == 0:
					run += 1
					if getflag() == 0:
						if getflag() == 0:
							slice_ = buffer[offset:offset + 1]
							if len(slice_) < 1:
								raise Exception("Out of data")
							run = int.from_bytes(slice_, byteorder="little")
							offset += 1
							run += 0xE
						else:
							run = 0
							for i in range(3):
								run = (run << 1) | getflag()
							run += 0x6
		# Does the 'copy from buffer' thing
		for i in range(run):
			output[outputoffset] = output[outputoffset - prev_u_buffer_pos]
			outputoffset += 1
	while True:
		if getflag() != 0: # Call next method to process next flag
			if getflag() != 0: # Long look-back distance or exit program or repeating sequence (flags = 11)
				run = 0 # u16
				for i in range(5): # Load high-order distance from flags (max = 0x31)
					run = (run << 1) | getflag()
				prev_u_buffer_pos = int.from_bytes(buffer[offset:offset + 1], byteorder="little") # Load low-order distance (max = 0xFF)
																												   # Also acts as flag byte
																												   # run = 0 and byte = 0 -> exit program
																												   # run = 0 and byte = 1 -> sequence of repeating bytes
				offset += 1
				if run != 0:
					prev_u_buffer_pos = prev_u_buffer_pos | (run << 8) # Add high and low order distance (max distance = 0x31FF)
					setup_run(prev_u_buffer_pos) # Get run length and finish unpacking (write to output)
				elif prev_u_buffer_pos > 2: # Is this used? Seems inefficient.
					setup_run(prev_u_buffer_pos)
				elif prev_u_buffer_pos == 0: # Decompression complete. End program.
					break
				else: # Repeating byte
					branch = getflag() # True = long repeating sequence (> 30)
					for i in range(4):
						run = (run << 1) | getflag()
					if branch != 0:
						run = (run << 0x8) | int.from_bytes(buffer[offset:offset + 1], byteorder="little")  # Load run length from byte and add high-order run length (max = 0xFFF + 0xE)
						offset += 1
					run += 0xE
					output[outputoffset:outputoffset + run] = bytes(buffer[offset:offset + 1]) * run
					offset += 1
					outputoffset += run
			else: # Short look-back distance (flags = 10)
				prev_u_buffer_pos = int.from_bytes(buffer[offset:offset + 1], byteorder="little") # Get the look-back distance (max = 0xFF)
				offset += 1
				setup_run(prev_u_buffer_pos) # Get run length and finish unpacking (write to output)
		else: # Copy byte (flags = 0)
			output[outputoffset:outputoffset + 1] = buffer[offset:offset + 1]
			outputoffset += 1
			offset += 1
	return outputoffset, offset

# Reference: CSafeFile::freadP
# Also known as FALCOM3 compression
def decompress_blocks_stream(f):
	flags = read_unpack("<I", f)[0]
	dst = None
	dst_offset = 0
	if (flags & 0x80000000) != 0:
		num_blocks, compressed_size, segment_size, uncompressed_size = read_unpack("<4I", f)
		dst = bytearray(uncompressed_size)
		for i in range(num_blocks):
			block_size, uncompressed_block_size = read_unpack("<2I", f)
			if (flags & 0x7FFFFFFF) == 1:
				decompress_blocks_single(f, dst, dst_offset, block_size, uncompressed_block_size)
				dst_offset += uncompressed_block_size
	else:
		compressed_size = flags
		uncompressed_size, num_blocks = read_unpack("<2I", f)
		dst = bytearray(uncompressed_size) # Should already be initialized with 0
		cdata = io.BytesIO(f.read(compressed_size - 8))
		for i in range(num_blocks):
			block_size = read_unpack("<H", cdata)[0]
			output_tmp = bytearray(65536)
			inbuf = cdata.read(block_size - 2)
			if inbuf[0] != 0:
				raise Exception("Non-zero method currently not supported")
			num1, num2 = decompress(inbuf, output_tmp, block_size)
			dst[dst_offset:dst_offset + num1] = output_tmp[0:num1]
			dst_offset += num1
			if dst_offset >= uncompressed_size:
				break
			x = cdata.read(1)
			if len(x) == 0:
				break
			if x[0] == 0:
				break
	return bytes(dst)

