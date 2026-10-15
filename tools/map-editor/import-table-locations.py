"""Read-only import of user-maintained place labels for the local map catalogue."""
import json,re
from pathlib import Path
import openpyxl
ROOT=Path(__file__).resolve().parent
FILES={'FC':Path('E:/TABLE FC.xlsx'),'SC':Path('E:/TABLE SC.xlsx'),'Third':Path('E:/TABLE 3RD (3).xlsx'),'Azure':Path('E:/TABLE ZERO.xlsx')}
CODE=re.compile(r'^[a-z][0-9][a-z0-9]{3}(?:_\d+)?$',re.I)
def extract(path):
 w=openpyxl.load_workbook(path,read_only=True,data_only=True);exact={};variants={}
 sheets=sorted(w.worksheets,key=lambda s:s.title.upper()=='ALL')
 for sheet in sheets:
  for rowno,row in enumerate(sheet.iter_rows(values_only=True),1):
   if len(row)<2:continue
   code=str(row[0] or '').strip().lower();label=row[1]
   if not CODE.fullmatch(code) or not isinstance(label,str) or not label.strip():continue
   info={'name':' '.join(label.split()),'source':path.name+' · '+sheet.title+' · ligne '+str(rowno)}
   if '_' in code:variants.setdefault(code.split('_')[0],info)
   else:exact.setdefault(code,info)
 w.close()
 return {**variants,**exact}
def main():
 tables={game:extract(path) for game,path in FILES.items()}
 out=ROOT/'table-locations.json';out.write_text(json.dumps({'schema':1,'sources':{g:p.name for g,p in FILES.items()},'games':tables},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print(json.dumps({game:len(rows) for game,rows in tables.items()}))
if __name__=='__main__':main()
