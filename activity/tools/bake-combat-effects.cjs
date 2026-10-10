// Bake native assemblies once; combat only advances texture coordinates.
const fs=require('node:fs/promises'),path=require('node:path');
const {createCanvas,loadImage}=require('@napi-rs/canvas');
const root=path.resolve(__dirname,'../assets/sky/effects/native');
(async()=>{
 global.document={createElement:()=>createCanvas(128,128)};
 global.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(path.join(root,url),'utf8'))});
 const {NativeEffectPlayer}=await import('../native-effect-player.mjs');
 const entries=JSON.parse(await fs.readFile(path.join(root,'catalogue.json'),'utf8'));
 for(const name of ['mg011_0','damage0','damage1','damage2','damage3','damage5']){
  const player=await new NativeEffectPlayer(entries,url=>loadImage(path.join(root,url))).load(entries.find(e=>e.id.toLowerCase()===`sc/${name}._ef`));
  const damage=name.startsWith('damage'),frames=damage?24:54,columns=8,rows=Math.ceil(frames/columns);
  const atlas=createCanvas(columns*128,rows*128),frame=createCanvas(128,128),ctx=frame.getContext('2d');
  let peak=0;
  for(let i=0;i<frames;i++){
   ctx.clearRect(0,0,128,128);player.draw(ctx,i*1000/30,128,128,4,false);
   const pixels=ctx.getImageData(0,0,128,128).data;let lit=0;for(let p=0;p<pixels.length;p+=4)if(pixels[p+3]&&Math.max(pixels[p],pixels[p+1],pixels[p+2])>30)lit++;
   peak=Math.max(peak,lit);atlas.getContext('2d').drawImage(frame,i%columns*128,Math.floor(i/columns)*128);
  }
  if(!peak)throw Error(`Invisible native effect: ${name}`);
  await fs.writeFile(path.join(root,`../${name}-frames.png`),atlas.toBuffer('image/png'));
  console.log(name,{extent:player.extent,peak,frames});
 }
})().catch(error=>{console.error(error);process.exitCode=1;});

