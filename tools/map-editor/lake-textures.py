"""Hand-drawn low-resolution hydrangeas using native leaf pixels; no AI imagery."""
from pathlib import Path
from PIL import Image, ImageFilter, ImageDraw, ImageChops
import math
import random

ROOT = Path(__file__).resolve().parents[2] / 'activity/assets/sky'
OUT = ROOT / 'lac-rouge-prototype'

def build():
    OUT.mkdir(exist_ok=True)
    original = Image.open(ROOT / 'halloween-dungeon/T153nk10.png').convert('RGBA')
    # Reference silhouette: broad, opposite leaves and large rounded mopheads.
    # Hand-built pixel collage from native foliage; no photographs are textured in.
    leaf=original.crop((82,160,118,204)).resize((20,25),Image.Resampling.NEAREST)
    leaf_mask=Image.new('L',leaf.size)
    ImageDraw.Draw(leaf_mask).polygon([(10,0),(17,5),(19,13),(16,20),(10,24),(3,20),(0,12),(3,5)],fill=255)
    leaf.putalpha(leaf_mask)
    ld=ImageDraw.Draw(leaf);ld.line([(10,2),(10,23)],fill=(115,145,75,255),width=1)
    for yy in (7,12,17):
        ld.line([(10,yy+4),(4,yy)],fill=(80,111,51,255),width=1)
        ld.line([(10,yy+4),(16,yy)],fill=(80,111,51,255),width=1)
    for name, tint in [('blanc',(240,240,222)), ('violet',(137,112,210))]:
        rng=random.Random(451)
        im=Image.new('RGBA',(128,128))
        draw=ImageDraw.Draw(im)
        for x,y in [(36,41),(85,45),(65,70)]:
            draw.line([(64,121),(x,y)],fill=(61,82,37,255),width=2)
        for x,y,angle in [(29,87,-50),(48,104,-22),(78,104,32),(99,86,50),(38,65,-60),(89,64,65),(61,87,12),(64,114,-8),(17,103,-55),(108,106,60)]:
            patch=leaf.rotate(angle,resample=Image.Resampling.NEAREST,expand=True)
            im.alpha_composite(patch,(round(x-patch.width/2),round(y-patch.height/2)))
        foliage=im.crop((0,64,128,128)).resize((256,256),Image.Resampling.NEAREST)
        foliage.save(OUT/'hortensias-feuillage.png')
        bloom=Image.new('L',im.size)
        # Three large heads, each composed of overlapping four-sepal flowers.
        for cx,cy,r in [(36,37,25),(87,40,24),(65,70,23)]:
            draw=ImageDraw.Draw(im)
            draw.ellipse((cx-r+2,cy-r+2,cx+r-2,cy+r-2),fill=tuple(round(v*.47) for v in tint)+(255,))
            ImageDraw.Draw(bloom).ellipse((cx-r,cy-r,cx+r,cy+r),fill=255)
            for i in range(40):
                a=i*2.39996;rr=(r-2)*math.sqrt(i/40)
                x=round(cx+math.cos(a)*rr);y=round(cy+math.sin(a)*rr)
                shade=.68+.25*(1-(y-(cy-r))/(2*r)) + rng.uniform(-.09,.09)
                # Low-resolution light/shadow patches, like the native plant atlas.
                col=tuple(min(255,round(v*shade)) for v in tint)+(255,)
                hi=tuple(min(255,round(v*min(1.12,shade+.15))) for v in tint)+(255,)
                draw.ellipse((x-4,y-2,x,y+2),fill=col)
                draw.ellipse((x,y-2,x+4,y+2),fill=col)
                draw.ellipse((x-2,y-4,x+2,y),fill=hi)
                draw.ellipse((x-2,y,x+2,y+4),fill=col)
                draw.point((x,y),fill=tuple(round(v*.52) for v in tint)+(255,))
        head=im.crop((11,12,62,63)).resize((128,128),Image.Resampling.NEAREST)
        head.save(OUT/f'bouquet-{name}.png')
        im=im.resize((256,256),Image.Resampling.NEAREST)
        # White RGB throughout: blurring RGBA would darken RGB as well as alpha,
        # squaring attenuation and making the old halo almost invisible.
        mask=bloom.resize((256,256),Image.Resampling.NEAREST)
        wide=mask.filter(ImageFilter.MaxFilter(13)).filter(ImageFilter.GaussianBlur(11))
        edge=ImageChops.subtract(wide,mask.point(lambda v:round(v*.72)))
        glow=Image.new('RGBA',im.size,(255,255,255,0))
        glow.putalpha(edge.point(lambda v:round(v*.85)))
        im.save(OUT / f'hortensias-{name}.png')
        glow.save(OUT / f'hortensias-{name}-halo.png')
    # Straight alpha with white RGB for the soft volume surrounding each head.
    aura=Image.new('RGBA',(128,128),(255,255,255,0))
    for y in range(128):
        for x in range(128):
            r=math.hypot((x-63.5)/63.5,(y-63.5)/63.5)
            a=round(180*max(0,1-r*r)**2)
            aura.putpixel((x,y),(255,255,255,a))
    aura.save(OUT/'bouquet-halo-blanc.png')
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
