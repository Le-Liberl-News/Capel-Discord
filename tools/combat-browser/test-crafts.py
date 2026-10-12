import importlib.util,unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location('crafts',Path(__file__).with_name('export-crafts.py'));crafts=importlib.util.module_from_spec(spec);spec.loader.exec_module(crafts)
class CraftIndexTests(unittest.TestCase):
 def test_jump_reaches_branch_without_indexing_skipped_effect(self):
  skipped=b'\x12\x00\x00skip.eff\x00\x00';target=3+len(skipped);data=b'\x01'+target.to_bytes(2,'little')+skipped+b'\x12\x00\x00actual.eff\x00\x00';seen,errors=crafts.reachable(data,0,0);self.assertEqual(errors,[]);self.assertIn(target,seen);self.assertNotIn(3,seen)
 def test_julia_sc_craft_includes_the_conditional_effect_and_native_sprite(self):
  result=crafts.index_crafts(Path('E:/dev/sky-activity-tools/atelier-combat'),Path('E:/dev/sky-activity-tools'));tech=next(t for t in result['characters']['Julia']['techniques'] if t['slot']==26);ids={e['id'] for e in tech['effects']};self.assertTrue({'Third/sc014_02._ef','Third/sc014_04._ef','Third/sc005_16._ef'}<=ids);self.assertTrue(any(s['source'].lower()=='ch04588._ch' for s in tech['sprites']));self.assertTrue(result['characters']['Ries']['techniques'])
if __name__=='__main__':unittest.main()
