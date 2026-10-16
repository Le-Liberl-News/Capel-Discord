import sys,struct,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'activity/tools'))
sys.path.insert(0,str(ROOT/'tools/cutscene-editor'))
from export_sky_assets import decode_model_texture
from fast_model_texture import decode_texture
class TextureTest(unittest.TestCase):
 def test_native_masks_match_original_pixels(self):
  cases=[(32,(0xff0000,0xff00,0xff,0xff000000)),(32,(0xff,0xff00,0xff0000,0xff000000)),(32,(0xff0000,0xff00,0xff,0)),(16,(0xf800,0x7e0,0x1f,0)),(16,(0x7c00,0x3e0,0x1f,0x8000)),(16,(0xf00,0xf0,0xf,0xf000))]
  for bits,masks in cases:
   with self.subTest(bits=bits,masks=masks):
    header=bytearray(128);header[:4]=b'DDS ';struct.pack_into('<7I',header,4,124,0x100f,16,16,16*bits//8,0,0);struct.pack_into('<8I',header,76,32,0x41 if masks[3] else 0x40,0,bits,*masks);struct.pack_into('<I',header,108,0x1000)
    values=[0,(1<<bits)-1,masks[0]]+[(i*7919)&((1<<bits)-1) for i in range(253)]
    data=bytes(header)+b''.join(v.to_bytes(bits//8,'little') for v in values)
    self.assertEqual(decode_texture(data,decode_model_texture).tobytes(),decode_model_texture(data).tobytes())
if __name__=='__main__':unittest.main()
