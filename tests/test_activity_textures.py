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
 def test_4444_keeps_red_and_fractional_alpha(self):
  im=decode_model_texture(dds([0xff00,0x8f00],(0xf00,0xf0,0xf,0xf000)))
  self.assertEqual([im.getpixel((x,0))[3] for x in range(im.width)],[255,136])
if __name__=='__main__':unittest.main()
