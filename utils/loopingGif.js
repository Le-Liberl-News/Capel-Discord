const {createCanvas}=require('@napi-rs/canvas');
const {GIFEncoder,quantize,applyPalette}=require('gifenc');
const {render}=require('./mediaRender');
// A looping GIF made of a still picture and small animated touches drawn over it each frame.
// One palette is taken from the still picture; each frame only stores the pixels that changed since the
// previous one, and only the rows the animation touched are matched against the palette again.
// delay: milliseconds per frame, or a function of the frame number for frames held longer.
// Drawn through the shared media gate (utils/mediaRender.js), within its budget; declined, the still picture (PNG).
function encodeLoop(base,options){return render(budget=>loop(base,options,budget),{fallback:async()=>base.toBuffer('image/png'),limits:{maxGrowth:96*1048576,maxDuration:15000,maxBytes:2*1048576,...options.limits}}).then(result=>result??base.toBuffer('image/png'));}
async function loop(base,{frames,delay,draw},budget){
 const W=base.width,H=base.height,baseData=base.getContext('2d').getImageData(0,0,W,H).data;
 const palette=quantize(baseData,255),transparentIndex=palette.length,fullPalette=[...palette,[0,0,0]];
 const baseIndex=applyPalette(baseData,palette),baseWords=new Uint32Array(baseData.buffer,baseData.byteOffset,W*H);
 const gif=GIFEncoder(),frame=createCanvas(W,H),c=frame.getContext('2d');let previous=null;
 for(let f=0;f<frames;f++){
  await new Promise(setImmediate);budget.check(gif.bytesView().length);// tens of ms per frame: let the bot answer interactions in between
  c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.drawImage(base,0,0);c.save();await draw(c,f);c.restore();
  const data=c.getImageData(0,0,W,H).data,words=new Uint32Array(data.buffer,data.byteOffset,W*H),index=baseIndex.slice(),changed=[];
  for(let y=0;y<H;y++)for(let x=y*W,end=x+W;x<end;x++)if(words[x]!==baseWords[x]){changed.push(y);break;}
  if(changed.length){const rows=new Uint8ClampedArray(changed.length*W*4);changed.forEach((y,n)=>rows.set(data.subarray(y*W*4,(y+1)*W*4),n*W*4));const rowsIndex=applyPalette(rows,palette);changed.forEach((y,n)=>index.set(rowsIndex.subarray(n*W,(n+1)*W),y*W));}
  let out=index;if(previous){out=new Uint8Array(index.length);for(let i=0;i<index.length;i++)out[i]=index[i]===previous[i]?transparentIndex:index[i];}
  const ms=typeof delay==='function'?delay(f):delay;
  gif.writeFrame(out,W,H,f===0?{palette:fullPalette,delay:ms,repeat:0}:{delay:ms,transparent:true,transparentIndex,dispose:1});previous=index;
 }
 gif.finish();const bytes=Buffer.from(gif.bytes());budget.check(bytes.length);return bytes;
}
// the file name's extension for what encodeLoop gave: the GIF, or the still picture when it was declined
const extension=bytes=>bytes.subarray(0,3).toString()==='GIF'?'gif':'png';
module.exports={encodeLoop,extension};
