"""Index native craft assets reachable through AS branches and threads."""
import argparse,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT.parent/'Website/toolchain'))
import third_as as decoder

def reachable(data,entry,end):
 pending=[entry];seen={};errors=[]
 while pending:
  pc=pending.pop()
  while end<=pc<len(data) and pc not in seen:
   try:it=decoder._decode_one(data,pc)
   except Exception as e:errors.append(str(e));break
   seen[pc]=it
   for op in it.operands:
    if op.kind=='address':pending.append(int.from_bytes(data[pc+op.offset:pc+op.offset+op.size],'little'))
   if it.opcode in (0,1,0x51):break
   pc=it.end
 return seen,errors

def index_crafts(cache,extracted,models=False):
 catalogue=json.loads((cache/'catalogue.json').read_text(encoding='utf8'));animations={e['id'].lower():e for e in catalogue['animations']};result={};model_requests=set()
 for name,char in catalogue['characters'].items():
  game=char.get('game');folder={'SC':'sc-subtitle-base/ED6_DT30','Third':'third-30/ED6_DT30','FC':'fc-combat-10/ED6_DT10'}.get(game);source=extracted/folder/char['source'] if folder else None
  if not source or not source.is_file():result[name]={'techniques':[],'unavailable':bool(char.get('routines') or char.get('configured'))};continue
  data=source.read_bytes()
  try:_,end,entries=decoder.craft_table(data)
  except Exception as e:result[name]={'techniques':[],'error':str(e)};continue
  techniques=[]
  for slot in range(16,min(30,len(entries))):
   instructions,errors=reachable(data,entries[slot],end);effects=set();used=set()
   for address,it in instructions.items():
    values=[int.from_bytes(data[address+o.offset:address+o.offset+o.size],'little') for o in it.operands if o.kind!='string']
    if it.opcode==0x12:
     for o in it.operands:
      if o.kind=='string':
       raw=data[address+o.offset:address+o.offset+o.size].decode('cp932','replace').rstrip('\0').replace('\\','/').split('/')[-1]
       if raw.lower().endswith(('.eff','._ef')):effects.add(game+'/'+raw.rsplit('.',1)[0]+'._ef')
    if it.opcode==0x1b and values[0]==255:used.add(str(values[1]))
    if it.opcode==0x6a:
     key=f'dynamic-{values[1]:08x}-{values[2]:08x}'
     if key in char['banks']:used.add(key)
   routine=char.get('routines',{}).get(str(slot),{});seq=routine.get('sequence',[]);used.update(str(f['bank']) for f in seq)
   if not effects and not seq:continue
   refs=[];pending=sorted(effects);seen=set()
   while pending:
    ef=pending.pop(0)
    if ef.lower() in seen:continue
    seen.add(ef.lower());entry=animations.get(ef.lower());refs.append({'id':entry['id'] if entry else ef,'available':bool(entry and entry.get('animation')),'dependency':ef not in effects})
    if entry and entry.get('animation'):
     path=cache/entry['animation'].removeprefix('/cache/')
     if path.exists():
      definition=json.loads(path.read_text(encoding='utf8'))
      for child in definition.get('children',[]):
       if child:pending.append(game+'/'+Path(child.replace('\\','/')).stem+'._ef')
      for part in definition['parts']:
       if part.get('model'):model_requests.add((game,Path(part['model']).stem))
   sprites=[]
   for bank in sorted(used):
    info=char['banks'].get(bank)
    if info:sprites.append({'bank':bank,**info,'poses':sorted({f['pose'] for f in seq if str(f['bank'])==bank})})
   techniques.append({'slot':slot,'name':routine.get('name') or ('Craft '+str(slot-15) if slot<26 else 'S-craft '+str(slot-25)),'effects':refs,'sprites':sprites,'sequence':seq,'errors':errors})
  result[name]={'game':game,'source':source.name,'techniques':techniques}
 if models:
  from export_models import export_model
  for game,name in sorted(model_requests):
   if (cache/'models'/game/(name+'.json')).exists():continue
   folder=extracted/('sc-33/ED6_DT33' if game=='SC' else 'third-33/ED6_DT33')
   if not folder.exists():folder=Path.home()/'.codex/sky-effect-work/third-33/ED6_DT33'
   source=folder/(name+'._x3')
   try:
    if source.exists():export_model(source,game,catalogue['effects'])
   except Exception as e:print('Model unavailable:',game,name,str(e))
 return {'format':1,'characters':result}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--cache',type=Path,default=Path('E:/dev/sky-activity-tools/atelier-combat'));p.add_argument('--extracted',type=Path,default=Path('E:/dev/sky-activity-tools'));p.add_argument('--models',action='store_true');a=p.parse_args();result=index_crafts(a.cache,a.extracted,a.models);target=a.cache/'crafts.json';tmp=target.with_suffix('.json.tmp');tmp.write_text(json.dumps(result,ensure_ascii=False),encoding='utf8');tmp.replace(target);print(sum(len(c['techniques']) for c in result['characters'].values()),'craft routines indexed')
