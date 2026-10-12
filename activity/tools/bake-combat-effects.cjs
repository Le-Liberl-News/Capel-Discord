// Bake native assemblies once; combat only advances texture coordinates.
const fs=require('node:fs/promises'),path=require('node:path');
const {createCanvas,loadImage}=require('@napi-rs/canvas');
const root=path.resolve(__dirname,'../assets/sky/effects/native');
(async()=>{
 global.document={createElement:()=>createCanvas(128,128)};
 global.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(path.join(root,url),'utf8'))});
 const {NativeEffectPlayer}=await import('../native-effect-player.mjs');
 const entries=JSON.parse(await fs.readFile(path.join(root,'catalogue.json'),'utf8'));
 const heroes=JSON.parse(await fs.readFile(path.join(root,'../../combat/hero-actions.json'),'utf8'));
 const heroEffects=['Third/msc0614._ef',...new Set(Object.values(heroes).flatMap(h=>Object.values(h).filter(a=>a?.nativeEffect).map(a=>a.nativeEffect)))];
 heroEffects.push(...new Set(Object.values(heroes).flatMap(h=>Object.values(h).flatMap(a=>(a?.chargeEffects??[]).map(e=>e.id)))));
 heroEffects.push(...new Set(Object.values(heroes).flatMap(h=>Object.values(h).flatMap(a=>[a?.hitEffect,a?.explosionEffect,a?.edgeEffect,a?.trailEffect].filter(Boolean)))),'SC/mp050_00._ef','SC/ms10920._ef','SC/mp066_01._ef','SC/ms10011._ef','SC/msc0548._ef','SC/sc480_03._ef');
 const specs=[...['mg011_0','damage0','damage1','damage2','damage3','damage5'].map(name=>({id:`sc/${name}._ef`,name,frames:name.startsWith('damage')?24:54,zoom:4})),...heroEffects.map(id=>({id,name:id.toLowerCase().replace('/','-').replace('._ef',''),frames:90,zoom:2}))];
 const metadata=process.argv.some(a=>a==='--heroes-only'||a.startsWith('--only='))?JSON.parse(await fs.readFile(path.join(root,'../hero-frames.json'),'utf8')):{};
 for(const {id,name,frames,zoom} of specs){
  if(process.argv.includes('--heroes-only')&&!name.includes('-'))continue;
  const only=process.argv.find(a=>a.startsWith('--only='))?.slice(7).split(',');if(only&&!only.includes(name))continue;
  const player=await new NativeEffectPlayer(entries,url=>loadImage(path.join(root,url))).load(entries.find(e=>e.id.toLowerCase()===id.toLowerCase()));
  if(id.toLowerCase()==='third/sc014_02._ef'){
   // Bake one of the three identical native walls; runtime places it on each actual edge.
   const item=player.instances.find(i=>i.part.index===5);player.instances=[item];item.parent=null;item.position=[];item.rotation=[];item.offset=[0,0,0];player.yaw=0;player.pitch=0;player.fit();
  }
  if(name.includes('-')&&player.extent>20&&id.toLowerCase()!=='third/sc005_16._ef')player.extent=5;
  const columns=8,rows=Math.ceil(frames/columns);
  const hero=name.includes('-'),resolution=hero?256:128;
  const atlas=createCanvas(columns*128,rows*128),frame=createCanvas(resolution,resolution),ctx=frame.getContext('2d');
  const snapshots=[];let left=resolution,top=resolution,right=0,bottom=0;
  let peak=0;
  for(let i=0;i<frames;i++){
   ctx.clearRect(0,0,resolution,resolution);player.draw(ctx,i*1000/30+(id.toLowerCase()==='third/ms04671i._ef'?2000:0),resolution,resolution,zoom,false);
   const snapshot=ctx.getImageData(0,0,resolution,resolution),pixels=snapshot.data;let lit=0;
   for(let p=0;p<pixels.length;p+=4)if(pixels[p+3]&&Math.max(pixels[p],pixels[p+1],pixels[p+2])>12){lit++;const x=(p/4)%resolution,y=Math.floor(p/4/resolution);left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y);}
   peak=Math.max(peak,lit);snapshots.push(snapshot);
  }
  const side=hero?Math.min(resolution,Math.max(right-left,bottom-top)+12):resolution,cx=hero?(left+right)/2:resolution/2,cy=hero?(top+bottom)/2:resolution/2;
  for(let i=0;i<frames;i++){ctx.putImageData(snapshots[i],0,0);atlas.getContext('2d').drawImage(frame,cx-side/2,cy-side/2,side,side,i%columns*128,Math.floor(i/columns)*128,128,128);}

  if(!peak)throw Error(`Invisible native effect: ${name}`);
  await fs.writeFile(path.join(root,`../${name}-frames.png`),atlas.toBuffer('image/png'));
  metadata[id.toLowerCase()]={name,frames,duration:/third-sc014_02|third-sc005_16|sc-mp050_00/.test(name)?3000:name.includes('-')?Math.max(1000,...Object.values(heroes).flatMap(h=>Object.values(h).filter(a=>a?.nativeEffect===id).map(a=>a.effectDuration))):undefined,blend:/cr210_00|cr04080|mp050_00/.test(id)?'normal':undefined,size:id.toLowerCase().includes('sc003_10')?9:4};
  console.log(name,{extent:player.extent,peak,frames});
 }
 await fs.writeFile(path.join(root,'../hero-frames.json'),JSON.stringify(metadata,null,2)+'\n');
})().catch(error=>{console.error(error);process.exitCode=1;});

