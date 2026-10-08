import importlib.util
import struct
import unittest
from pathlib import Path
spec = importlib.util.spec_from_file_location("sky_assets", Path(__file__).parents[1] / "activity/tools/export_sky_assets.py")
assets = importlib.util.module_from_spec(spec)
spec.loader.exec_module(assets)

def dds(bits, masks, words):
    data = bytearray(128)
    data[:4] = b"DDS "
    struct.pack_into("<I",data,4,124)
    struct.pack_into("<I",data,8,0x100f)
    struct.pack_into("<III",data,12,1,len(words),len(words)*bits//8)
    struct.pack_into("<8I",data,76,32,0x41,0,bits,*masks)
    struct.pack_into("<I",data,108,0x1000)
    return bytes(data)+struct.pack("<"+("H" if bits==16 else "I")*len(words),*words)

class Textures(unittest.TestCase):
    def test_4444_key_and_partial_alpha(self):
        image=assets.decode_model_texture(dds(16,(0xf00,0xf0,0xf,0xf000),[0xff00,0xff10,0x8fff,0x0000]))
        self.assertEqual(image.getpixel((0,0)),(0,0,0,0))
        self.assertEqual(image.getpixel((1,0)),(255,17,0,255))
        self.assertEqual(image.getpixel((2,0)),(255,255,255,136))
        self.assertEqual(image.getpixel((3,0))[3],0)
    def test_1555_preserves_other_reds(self):
        image=assets.decode_model_texture(dds(16,(0x7c00,0x3e0,0x1f,0x8000),[0xfc00,0xfc01,0x7fff]))
        self.assertEqual(image.getpixel((0,0)),(0,0,0,0))
        self.assertEqual(image.getpixel((1,0))[3],255)
        self.assertEqual(image.getpixel((2,0))[3],0)
    def test_32_bit_colour_key(self):
        image=assets.decode_model_texture(dds(32,(0xff0000,0xff00,0xff,0xff000000),[0xffff0000,0xffff0010,0x80ffffff]))
        self.assertEqual(image.getpixel((0,0)),(0,0,0,0))
        self.assertEqual(image.getpixel((1,0)),(255,0,16,255))
        self.assertEqual(image.getpixel((2,0))[3],128)

    def test_dark_red_is_not_the_colour_key(self):
        image=assets.decode_model_texture(dds(32,(0xff0000,0xff00,0xff,0xff000000),[0xffdd0000,0x8000ff00]))
        self.assertEqual(image.getpixel((0,0)),(221,0,0,255))
        self.assertEqual(image.getpixel((1,0))[3],128)
        image=assets.decode_model_texture(dds(16,(0x7c00,0x3e0,0x1f,0x8000),[0xf800]))
        self.assertEqual(image.getpixel((0,0))[3],255)
    def test_arena_plant_atlas_retains_transparency(self):
        image=assets.Image.open(Path(__file__).parents[1]/'activity/assets/sky/arena/T41O1201.png').convert('RGBA')
        self.assertGreater(sum(p[3]==0 for p in image.getdata()),30000)
        self.assertFalse(any(p[:3]==(255,0,0) and p[3]>0 for p in image.getdata()))
    def test_rolent_parasol_atlases_no_longer_contain_opaque_key_pixels(self):
        for name in ['T01O0801.png','T01O1001.png']:
            image=assets.Image.open(Path(__file__).parents[1]/'activity/assets/sky/rolent'/name).convert('RGBA')
            self.assertFalse(any(p[:3]==(255,0,0) and p[3]>0 for p in image.getdata()),name)

if __name__ == "__main__": unittest.main()
