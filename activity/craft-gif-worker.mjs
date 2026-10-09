import {GIFEncoder,quantize,applyPalette} from 'gifenc';
self.onmessage=({data:{frames,width,height,delay=100,colors=128}})=>{
  try {
    const gif=GIFEncoder();
    for(const frame of frames){const rgba=new Uint8Array(frame);const palette=quantize(rgba,colors);gif.writeFrame(applyPalette(rgba,palette),width,height,{palette,delay,repeat:0});}
    gif.finish();const bytes=gif.bytes();self.postMessage({bytes},[bytes.buffer]);
  }catch(error){self.postMessage({error:error.message});}
};
