import {GIFEncoder,quantize,applyPalette} from 'gifenc';
self.onmessage=({data:{frames,width,height,delay=100,colors=128,maxBytes=Infinity}})=>{
  try {
    let bytes;
    const samples=[];
    for(let f=0;f<frames.length;f+=Math.max(1,Math.floor(frames.length/16))){const rgba=new Uint8Array(frames[f]);for(let p=0;p<rgba.length;p+=64)samples.push(rgba[p],rgba[p+1],rgba[p+2],rgba[p+3]);}
    const sample=new Uint8Array(samples);
    for(const count of [...new Set([colors,32,16,8])]){
      const gif=GIFEncoder();
      const palette=quantize(sample,count);
      for(const [i,frame]of frames.entries()){const rgba=new Uint8Array(frame);gif.writeFrame(applyPalette(rgba,palette),width,height,{palette:i===0?palette:undefined,delay,repeat:0});}
      gif.finish();bytes=gif.bytes();if(bytes.length<=maxBytes)break;
    }
    if(bytes.length>maxBytes)throw Error('GIF trop volumineux.');
    self.postMessage({bytes},[bytes.buffer]);
  }catch(error){self.postMessage({error:error.message});}
};
