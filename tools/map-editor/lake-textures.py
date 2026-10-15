"""Manual palette edits and cut/paste of native Sky blossoms; no generated imagery."""
from pathlib import Path
from PIL import Image, ImageFilter
import math

ROOT = Path(__file__).resolve().parents[2] / 'activity/assets/sky'
OUT = ROOT / 'lac-rouge-prototype'

def build():
    OUT.mkdir(exist_ok=True)
    original = Image.open(ROOT / 'halloween-dungeon/T153nk10.png').convert('RGBA')
    # Isolate the existing violet/white petals, leaving native leaf pixels alone.
    petals = Image.new('RGBA', original.size)
    for y in range(original.height):
        for x in range(original.width):
            r,g,b,a = original.getpixel((x,y))
            if a and (b > g * 1.04 and r > g * 1.02 or min(r,g,b) > 165 and max(r,g,b)-min(r,g,b) < 42):
                petals.putpixel((x,y),(r,g,b,a))
    # Reuse a flower already drawn by Falcom to form compact hydrangea-like heads.
    flower = petals.crop((20,173,48,200)).resize((9,9),Image.Resampling.NEAREST)
    variants = {}
    for name, tint in [('blanc',(1,.96,1)), ('violet',(.7,.42,1))]:
        im=original.copy()
        # Copy/paste several small florets into five overlapping round bouquets.
        for cx,cy in [(57,102),(107,80),(160,100),(90,134),(149,140)]:
            for i in range(38):
                angle=i*2.39996; radius=22*math.sqrt(i/38)
                dx=round(math.cos(angle)*radius);dy=round(math.sin(angle)*radius*.8)
                stamp=flower.rotate((i%4)*90)
                for y in range(stamp.height):
                    for x in range(stamp.width):
                        r,g,b,a=stamp.getpixel((x,y))
                        if a:
                            light=max(r,g,b)/255
                            stamp.putpixel((x,y),tuple(round(255*light*c) for c in tint)+(a,))
                im.alpha_composite(stamp,(cx+dx-4,cy+dy-4))
        glow=Image.new('RGBA', im.size)
        for y in range(im.height):
            for x in range(im.width):
                r,g,b,a=im.getpixel((x,y))
                if a and (b>g*1.04 and r>g*1.02 or min(r,g,b)>165 and max(r,g,b)-min(r,g,b)<42):
                    glow.putpixel((x,y),tuple(round(c*255) for c in tint)+(round(a*.7),))
        glow=glow.filter(ImageFilter.GaussianBlur(2.5))
        im.save(OUT / f'hortensias-{name}.png')
        glow.save(OUT / f'hortensias-{name}-halo.png')
        variants[name]=str(OUT / f'hortensias-{name}.png')
    for source,name in [('T02O1703.png','eau-rouge'),('T02O1803.png','reflets-rouges')]:
        im=Image.open(ROOT/'halloween-dungeon'/source).convert('RGBA')
        for y in range(im.height):
            for x in range(im.width):
                r,g,b,a=im.getpixel((x,y)); lum=(r*.2126+g*.7152+b*.0722)/255
                im.putpixel((x,y),(round(45+lum*145),round(6+lum*26),round(16+lum*42),a))
        im.save(OUT/f'{name}.png')
    print('Native lake palettes ready:',OUT)

if __name__=='__main__':
    build()
