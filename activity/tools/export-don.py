"""Extract Don's native cannon for the FPS HUD; no generated art."""
from pathlib import Path
import json
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1]/'assets/sky'
src=Image.open(root/'combat/as00290/2.png');frame=src.crop((392,0,490,117));mask=Image.new('L',frame.size)
ImageDraw.Draw(mask).polygon([(52,51),(63,49),(78,48),(84,54),(86,65),(79,71),(68,75),(55,75),(51,65)],fill=255)
gun=Image.new('RGBA',frame.size);gun.paste(frame,(0,0),mask);gun=gun.crop((50,47,88,77));sheet=Image.new('RGBA',(120,30))
for i in range(3):sheet.paste(gun,(i*40,0))
sheet.save(root/'combat/don-gun.png')
