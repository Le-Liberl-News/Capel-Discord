"""Assemble native FC exteriors from their ._en gate coordinates, without rescaling."""
import argparse,json,struct,subprocess,sys,math
from collections import deque
from pathlib import Path

EXTERIORS=['t0100','t0200','t0300','t0400','t0500','t0600','t0700','t1100','t1101','t1102','t1200','t1300','t1400','t1500','c0100','c1100','c1400','c1500','c1501']+[f'r{prefix}{i:02d}' for prefix,count in [('01',3),('02',3),('03',4),('11',4),('12',3),('13',2),('14',3),('15',4)] for i in range(count)]
LABELS={'t0100':'Rolent','t0200':'Résidence du maire de Rolent','t0300':'Maison des Bright','t0400':'Ferme de Perzel','t0500':'Pont de Verte','t0600':'Porte de Gurune','t0700':'Aéroport de Rolent','t1100':'Bose · quartier sud','t1101':'Bose · quartier nord','t1102':'Aeroport de Bose','t1200':'Village de Ravennue','t1300':'Porte de Krone','t1400':'Porte de Haken','t1500':'Auberge du lac Valleria','c0100':'Bois brumeux','c1100':'Entrée de la mine abandonnée','c1400':'Gorges Nebel','c1500':'Sentier de Krone','c1501':'Porte de Krone · sud'}
ROADS={'01':'Chemin Elize','02':'Route de Milch','03':'Sentier de Malga','11':'Route est de Bose','12':'Sentier de Krone','13':'Route d’Eisen','14':'Nouvelle route d’Ansel','15':'Sentier de Ravennue'}

def read_entrances(data):
 count=struct.unpack_from('<H',data)[0]
 if len(data)<2+count*144:raise ValueError('Truncated entrance table')
 entries=[]
 for i in range(count):
  o=2+i*144; values=struct.unpack_from('<9f',data,o+16)
  entries.append(dict(index=i,destination=data[o+76:o+92].split(b'\0')[0].decode('ascii').lower(),target=struct.unpack_from('<H',data,o+96)[0],bounds=[list(values[:3]),list(values[3:6])],arrival=list(values[6:])))
 return entries

def gate(entry):
 a,b=entry['bounds'];return [-(a[0]+b[0])/2,min(a[1],b[1]),(a[2]+b[2])/2]

def placements(tables,root='t1101'):
 positions={root:[0.,0.,0.]};queue=deque([root]);joins=[]
 while queue:
  source=queue.popleft()
  for e in tables[source]:
   target=e['destination']
   if target not in tables or target==source or e['target']>=len(tables[target]):continue
   other=tables[target][e['target']]
   # Story variants may point at an unrelated entrance; never use them as a seam.
   if other['destination'] not in [source,target,'']:continue
   a,b=gate(e),gate(other);delta=[positions[source][i]+a[i]-b[i] for i in range(3)]
   if {source,target}=={'t1100','t1101'}:
    # The city's three level-changing portals cannot share a vertical offset.
    # Preserve the native elevations of both city halves.
    delta[1]=positions[source][1]
   if target not in positions:positions[target]=delta;queue.append(target)
   if source<target:
    joins.append(dict(a=source,b=target,entrance=e['index'],target=e['target'],gateA=a,gateB=b))
 missing=set(tables)-set(positions)
 if missing:raise ValueError('Unconnected exteriors: '+','.join(sorted(missing)))
 for j in joins:
  j['residual']=[round(positions[j['a']][i]+j['gateA'][i]-positions[j['b']][i]-j['gateB'][i],4)for i in range(3)]
  j['status']='portal-gap' if math.dist(j['residual'],[0,0,0])>2 else 'aligned'
 return positions,joins

def main():
 p=argparse.ArgumentParser();p.add_argument('--game',type=Path,required=True);p.add_argument('--models',type=Path,required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--cache',type=Path,required=True);p.add_argument('--entrances',type=Path,required=True);a=p.parse_args()
 a.output.mkdir(parents=True,exist_ok=True);a.cache.mkdir(parents=True,exist_ok=True)
 tables={key:read_entrances((a.entrances/(key+'._en')).read_bytes())for key in EXTERIORS}
 positions,joins=placements(tables)
 regions=[]
 for key in EXTERIORS:
  output=a.cache/key;output.mkdir(exist_ok=True)
  if not (output/'anterose.gltf').exists():subprocess.run([sys.executable,str(Path(__file__).with_name('export_sky_assets.py')),'--game',str(a.game),'--model',str(a.models/(key+'._x2')),'--chips',str(a.cache),'--output',str(output),'--only-map'],check=True,stdout=subprocess.DEVNULL)
  label=LABELS.get(key,ROADS.get(key[1:3],key)+' '+str(int(key[-2:])+1))
  regions.append(dict(id=key,name=label,position=[round(v,5)for v in positions[key]],source='ED6_DT0A/'+key+'._x2'))
  print(key,label,flush=True)
 manifest=dict(version=1,root='t1101',regions=regions,joins=joins,units='native game units',source='FC ._x2 geometry; reciprocal ED6_DT12 ._en exit boxes',excluded='Interiors, destroyed/story variants and other regions are omitted. No invented connecting terrain.')
 (a.output/'layout.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('Maps',len(regions),'joins',len(joins),'nonclosing joins',sum(math.dist(j['residual'],[0,0,0])>2 for j in joins))
if __name__=='__main__':main()
