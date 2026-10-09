import {GIFEncoder,quantize,applyPalette} from 'gifenc';
self.onmessage=({data:{frames,width,height}})=>{
  try {
    const gif=GIFEncoder();
    for(const frame of frames){const rgba=new Uint8Array(frame);const palette=quantize(rgba,128);gif.writeFrame(applyPalette(rgba,palette),width,height,{palette,delay:100,repeat:0});}
    gif.finish();const bytes=gif.bytes();self.postMessage({bytes},[bytes.buffer]);
  }catch(error){self.postMessage({error:error.message});}
};
