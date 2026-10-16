"""Sky DDS key/alpha operations in Pillow's native pixel engine, without NumPy startup."""
import io,struct

def decode_texture(data,fallback):
 from PIL import Image,ImageChops,ImageMath
 if data[:4]!=b'DDS ':return Image.open(io.BytesIO(data)).convert('RGBA')
 _,flags,fourcc,bits,red,green,blue,alpha=struct.unpack_from('<8I',data,76)
 height,width,pitch=struct.unpack_from('<III',data,12)
 if not fourcc and bits==32 and flags&64 and all(m==0 or m in (255,65280,16711680,4278190080) for m in (red,green,blue,alpha)):
  order=['X']*4
  for name,mask in [('R',red),('G',green),('B',blue),('A',alpha)]:
   if mask:order[((mask&-mask).bit_length()-1)//8]=name
  stride=max(width*4,pitch) if struct.unpack_from('<I',data,8)[0]&8 else width*4
  try:image=Image.frombytes('RGBA' if alpha else 'RGB',(width,height),data[128:],'raw',''.join(order),stride).convert('RGBA')
  except ValueError:return fallback(data)
 elif not fourcc and bits==16 and flags&64:
  height,width,pitch=struct.unpack_from('<III',data,12)
  pitch=max(width*2,pitch) if struct.unpack_from('<I',data,8)[0]&8 else width*2
  words=Image.frombytes('I;16',(width,height),data[128:],'raw','I;16',pitch).convert('I')
  channels=[ImageMath.lambda_eval(lambda v:(v['w']&m)*255/m,w=words).convert('L') if m else Image.new('L',(width,height),0) for m in (red,green,blue)]
  image=Image.merge('RGBA',(*channels,Image.new('L',(width,height),255)))
  opacity=ImageMath.lambda_eval(lambda v:(v['w']&alpha)*255/alpha,w=words).convert('L') if alpha else Image.new('L',image.size,255)
  if red:
   keep=ImageMath.lambda_eval(lambda v:((v['w']&(red|green|blue))!=red)*255,w=words).convert('L')
   opacity=ImageChops.multiply(opacity,keep)
  image.putalpha(opacity)
  # The original decoder clears RGB as well as alpha on fully transparent pixels.
  visible=opacity.point(lambda p:255 if p else 0)
  return Image.composite(image,Image.new('RGBA',image.size),visible)
 else:image=Image.open(io.BytesIO(data)).convert('RGBA')
 r,g,b,a=image.split()
 key=ImageChops.multiply(r.point(lambda p:255 if p==255 else 0),ImageChops.multiply(g.point(lambda p:255 if p==0 else 0),b.point(lambda p:255 if p==0 else 0)))
 return Image.composite(Image.new('RGBA',image.size),image,key)
