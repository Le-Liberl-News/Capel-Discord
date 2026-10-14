import importlib.util,struct,sys,unittest
from pathlib import Path
TOOLS=Path(__file__).resolve().parents[1]/'activity/tools'
sys.path.insert(0,str(TOOLS))
spec=importlib.util.spec_from_file_location('azure_environment',TOOLS/'export-azure-environment.py')
azure=importlib.util.module_from_spec(spec);spec.loader.exec_module(azure)

class AzureEffectTests(unittest.TestCase):
 def test_sparse_parts_and_variable_emissions_have_exact_boundaries(self):
  header=bytearray(124);header[:4]=b'EF20';struct.pack_into('<H',header,26,1<<3);header[28:32]=b'glow'
  part=bytearray(0x3b8);part[:4]=b'rays';part[18]=1;part[62]=2;struct.pack_into('<I',part,20,0x40);struct.pack_into('<f',part,220,1.5)
  emission=bytearray(24);emission[1]=3;emission[3]=4;struct.pack_into('<f',emission,8,.25)
  d=bytes(header+part+emission);result=azure.effect(d)
  self.assertEqual(result['textures'][0],'glow');self.assertEqual(result['parts'][0]['index'],3)
  self.assertEqual(result['parts'][0]['curves']['position'][0],1.5);self.assertEqual(result['parts'][0]['emissions'][0]['start'],.25)
  with self.assertRaises(ValueError):azure.effect(d[:-1])
  with self.assertRaises(ValueError):azure.effect(d+b'\0')
if __name__=='__main__':unittest.main()
