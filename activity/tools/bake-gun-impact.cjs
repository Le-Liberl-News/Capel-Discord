// SC/ms10920's initial hit only: omit its axe, rotating afterimage and smoke.
const fs=require('node:fs/promises'),path=require('node:path'),{createCanvas,loadImage}=require('@napi-rs/canvas');
async function bake(){
 const root=path.resolve(__dirname,'../assets/sky/effects/native');global.document={createElement:()=>createCanvas(256,256)};
 global.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(path.join(root,url),'utf8'))});
 const {NativeEffectPlayer}=await import('../native-effect-player.mjs'),entries=JSON.parse(await fs.readFile(path.join(root,'catalogue.json'),'utf8'));
 const player=await new NativeEffectPlayer(entries,url=>loadImage(path.join(root,url))).load(entries.find(e=>e.id.toLowerCase()==='sc/ms10920._ef'));
 for(const item of player.instances)if(player.root.parts.includes(item.part)&&[2,3,4].includes(item.part.index))item.part.enabled=false;
 const frame=createCanvas(256,256),ctx=frame.getContext('2d'),snapshots=[];let left=256,top=256,right=0,bottom=0;
 for(let i=0;i<30;i++){
  ctx.clearRect(0,0,256,256);player.draw(ctx,i*1000/30,256,256,2,false);const data=ctx.getImageData(0,0,256,256);snapshots.push(data);
  for(let p=0;p<data.data.length;p+=4)if(data.data[p+3]&&Math.max(...data.data.slice(p,p+3))>12){const x=p/4%256,y=Math.floor(p/4/256);left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
 }
 if(right<=left)throw Error('Native initial hit is empty');
 const side=Math.max(right-left,bottom-top)+12,cx=(left+right)/2,cy=(top+bottom)/2,atlas=createCanvas(8*128,4*128),ac=atlas.getContext('2d');
 snapshots.forEach((data,i)=>{ctx.putImageData(data,0,0);ac.drawImage(frame,cx-side/2,cy-side/2,side,side,i%8*128,Math.floor(i/8)*128,128,128);});
 await fs.writeFile(path.join(root,'../sc-ms10920-hit-frames.png'),atlas.toBuffer('image/png'));console.log('Baked 30 native hit frames, without axe/afterimage/smoke');
}
bake().catch(e=>{console.error(e);process.exitCode=1;});
