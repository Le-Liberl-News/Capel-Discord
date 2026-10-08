"""Export original Sky FC dialogue pieces from extracted ED6_DT00 CH files."""
import argparse,struct,sys,shutil
from pathlib import Path
try:
 from PIL import Image
except ImportError:
 sys.path.insert(0,r'E:\dev\_tools\pillow');from PIL import Image
def rgba4444(file):
 data=file.read_bytes();words=struct.unpack('<'+'H'*(len(data)//2),data)
 rgba=bytes(c for w in words for c in (((w>>8)&15)*17,((w>>4)&15)*17,(w&15)*17,((w>>12)&15)*17))
 return Image.frombytes('RGBA',(256,len(data)//512),rgba)
def main():
 p=argparse.ArgumentParser();p.add_argument('--ui-folder',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();a.output.mkdir(parents=True,exist_ok=True)
 atlas=rgba4444(a.ui_folder/'c_waku3._ch')
 # Nine-slice rectangle assembled away from the atlas's central speech spikes.
 frame=Image.new('RGBA',(160,96))
 xs=[(0,32,0,32),(32,48,32,128),(128,160,128,160)]
 ys=[(16,48,0,32),(48,80,32,64),(80,112,64,96)]
 for sx0,sx1,dx0,dx1 in xs:
  for sy0,sy1,dy0,dy1 in ys:
   part=atlas.crop((sx0,sy0,sx1,sy1)).resize((dx1-dx0,dy1-dy0),Image.Resampling.NEAREST);frame.paste(part,(dx0,dy0))
 frame.save(a.output/'frame.png')
 atlas.crop((8,140,120,162)).save(a.output/'name.png')
 atlas.crop((80,104,112,128)).save(a.output/'tail.png')
 rgba4444(a.ui_folder/'c_icon1._ch').crop((240,31,256,48)).save(a.output/'continue.png')
 shutil.copyfile(Path(__file__).resolve().parents[2]/'AveriaSansLibre-Regular.ttf',a.output/'AveriaSansLibre-Regular.ttf')
 print('Dialogue assets exported:',a.output)
if __name__=='__main__':main()
