import unittest,struct,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'activity'/'tools'))
from export_sky_assets import decode_model_texture
def dds(words,masks):
 header=bytearray(128);header[:4]=b'DDS ';struct.pack_into('<7I',header,4,124,0x100f,1,len(words),len(words)*2,0,0);struct.pack_into('<8I',header,76,32,65,0,16,*masks);struct.pack_into('<I',header,108,4096);return bytes(header)+struct.pack('<'+'H'*len(words),*words)
class Textures(unittest.TestCase):
 def test_pure_red_key_and_real_alpha(self):
  im=decode_model_texture(dds([0xfc00,0x83e0,0x03e0,0xf800],(0x7c00,0x3e0,0x1f,0x8000)))
  self.assertEqual([im.getpixel((x,0))[3] for x in range(im.width)],[0,255,0,255])
  self.assertGreater(im.getpixel((3,0))[0],0)
 def test_32bit_colour_key_does_not_remove_dark_red(self):
  header=bytearray(128);header[:4]=b'DDS ';struct.pack_into('<7I',header,4,124,0x100f,1,3,12,0,0);struct.pack_into('<8I',header,76,32,65,0,32,0xff0000,0xff00,0xff,0xff000000);struct.pack_into('<I',header,108,4096)
  im=decode_model_texture(bytes(header)+struct.pack('<3I',0xffff0000,0xffdd0000,0x8000ff00))
  self.assertEqual([im.getpixel((x,0))[3] for x in range(3)],[0,255,128])
 def test_arena_plant_atlas_has_no_opaque_colour_key_pixels(self):
  from PIL import Image
  im=Image.open(Path(__file__).resolve().parents[1]/'activity/assets/sky/arena/T41O1201.png').convert('RGBA')
  self.assertGreater(sum(pixel[3]==0 for pixel in im.getdata()),30000)
  self.assertFalse(any(pixel[:3]==(255,0,0) and pixel[3]>0 for pixel in im.getdata()))
 def test_4444_keeps_red_and_fractional_alpha(self):
  im=decode_model_texture(dds([0xff00,0x8f00],(0xf00,0xf0,0xf,0xf000)))
  self.assertEqual([im.getpixel((x,0))[3] for x in range(im.width)],[255,136])
if __name__=='__main__':unittest.main()
