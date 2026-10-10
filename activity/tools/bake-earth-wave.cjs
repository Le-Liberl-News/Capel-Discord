// Export the native earth animation once, instead of drawing particles in combat.
const fs=require('node:fs/promises'),path=require('node:path');
const {createCanvas,loadImage}=require('@napi-rs/canvas');
const root=path.resolve(__dirname,'../assets/sky/effects/native');
(async()=>{
  global.document={createElement:()=>createCanvas(128,128)};
  global.fetch=async relative=>({ok:true,json:async()=>JSON.parse(await fs.readFile(path.join(root,relative),'utf8'))});
  const {NativeEffectPlayer}=await import('../native-effect-player.mjs');
  const entries=JSON.parse(await fs.readFile(path.join(root,'catalogue.json'),'utf8'));
  const player=await new NativeEffectPlayer(entries,url=>loadImage(path.join(root,url))).load(entries.find(e=>e.id.toLowerCase()==='sc/mg011_0._ef'));
  const atlas=createCanvas(896,512),frame=createCanvas(128,128),ctx=frame.getContext('2d'),target=atlas.getContext('2d');
  for(let index=0;index<27;index++){
    ctx.clearRect(0,0,128,128);player.draw(ctx,index*1000/30,128,128,4,false);
    target.drawImage(frame,index%7*128,Math.floor(index/7)*128);
  }
  const texture=player.root.textures[0],image=player.textureImages.get(texture.additiveTexture??texture.texture),ground=createCanvas(112,112),groundCtx=ground.getContext('2d');
  groundCtx.drawImage(image,8,136,112,112,0,0,112,112);
  const pixels=groundCtx.getImageData(0,0,112,112);
  for(let y=0;y<112;y++)for(let x=0;x<112;x++)pixels.data[(y*112+x)*4+3]*=Math.min(1,Math.max(0,Math.min(x,y,111-x,111-y)/18));
  groundCtx.putImageData(pixels,0,0);target.drawImage(ground,768,384,128,128);
  const output=path.join(root,'../earth-wave.png');await fs.writeFile(output,atlas.toBuffer('image/png'));
  // CPU comparison excludes GPU work; it measures the eliminated canvas draws.
  const start=performance.now();for(let step=0;step<9;step++)player.draw(ctx,600-step*60,128,128,4,false);
  console.log('Atlas exported:',output,'Native rendering of nine portions:',(performance.now()-start).toFixed(1),'ms');
})().catch(error=>{console.error(error);process.exitCode=1;});
