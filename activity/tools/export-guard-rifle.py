from pathlib import Path
from PIL import Image
# The rifle and its hands from the garrison's native right-facing shooting poses.
source=Path(__file__).resolve().parents[1]/'assets/sky/sanktheim/props/guards/2.png'
sheet=Image.open(source).convert('RGBA');atlas=Image.new('RGBA',(67*3,24))
for i,pose in enumerate([2,3,4]):
 frame=sheet.crop((4*256,pose*256,5*256,(pose+1)*256))
 atlas.paste(frame.crop((132,127,199,151)),(67*i,0))
atlas.save(Path(__file__).resolve().parents[1]/'assets/sky/combat/guard-rifle.png',optimize=True)
