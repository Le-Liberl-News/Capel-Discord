const fs=require('node:fs'),path=require('node:path');
const REGIONS=[['west-wall','Muraille ouest','#6ab8f0'],['west-tower','Tour ouest','#b09aef'],['gate','Porte renforcée','#e8c065'],['east-tower','Tour est','#ec91a6'],['east-wall','Muraille est','#63cdb0']];
// The wave recap, in one picture: the whole map seen from above (tools/bake-full-map.html), cropped round the castle,
// with each defense's remaining strength set on the walls, the installations, the outskirts (trees, the pond) and the
// Mechapom fortress where it stands, the route it has burnt behind it; the legend in a corner.
const TOP_Z=-82,BOTTOM_Z=70,HEADER=88;
// the defenses' outlines: the close plan's mask (assets/overview, its camera centred on (-22, 0), +Z to the left, 132
// units wide), coloured once
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));let regions;
async function loadRegions(){
 regions??=(async()=>{const {createCanvas,loadImage}=require('@napi-rs/canvas'),folder=path.join(__dirname,'assets/overview'),layout=JSON.parse(fs.readFileSync(path.join(folder,'layout.json'),'utf8')),mask=await loadImage(path.join(folder,'mask.png')),canvas=createCanvas(layout.width,layout.height),ctx=canvas.getContext('2d');
  ctx.drawImage(mask,0,0);const pixels=ctx.getImageData(0,0,layout.width,layout.height).data,ids=new Int8Array(layout.width*layout.height).fill(-1);
  for(let i=0;i<ids.length;i++){const r=pixels[i*4],id=Math.round(r/40)-1;if(r>=32&&id>=0&&id<5&&pixels[i*4+1]<10&&pixels[i*4+2]<10)ids[i]=id;}
  const overlay=ctx.createImageData(layout.width,layout.height);
  for(let i=0;i<ids.length;i++){const id=ids[i];if(id<0)continue;const border=[i-1,i+1,i-layout.width,i+layout.width].some(j=>ids[j]!==id);overlay.data.set([...rgb(REGIONS[id][2]),border?220:120],i*4);}
  ctx.clearRect(0,0,layout.width,layout.height);ctx.putImageData(overlay,0,0);return {layout,overlay:canvas};})();
 return regions;
}
// a point of the close plan, in the map's units
const fromPlan=(layout,u,v)=>({z:(layout.width/2-u)*132/layout.width,x:-22+(v-layout.height/2)*132/layout.width});
const SYMBOLS=[['mine','Mine','#f5d85e'],['barricade','Barricade','#f6a56a'],['auto','Tourelle auto','#80e9ee'],['manual','Canon manuel','#f2b9f2']];
let fullMap;
async function loadFullMap(){
 fullMap??=(async()=>{const {loadImage}=require('@napi-rs/canvas'),folder=path.join(__dirname,'assets/overview');
  return {image:await loadImage(path.join(folder,'full-map.png')),bounds:JSON.parse(fs.readFileSync(path.join(folder,'full-map.json'),'utf8'))};})();
 return fullMap;
}
function symbol(ctx,kind,color,x,y,r){
 ctx.save();ctx.translate(x,y);ctx.fillStyle=color;ctx.strokeStyle='#101b23';ctx.lineWidth=2;ctx.beginPath();
 if(kind==='mine'){ctx.moveTo(0,-r);ctx.lineTo(r,0);ctx.lineTo(0,r);ctx.lineTo(-r,0);ctx.closePath();}else if(kind==='barricade')ctx.rect(-r*1.3,-r*.6,r*2.6,r*1.2);else ctx.arc(0,0,r,0,Math.PI*2);
 ctx.fill();ctx.stroke();
 if(kind==='auto'||kind==='manual'){ctx.fillStyle='#101b23';ctx.font=`bold ${Math.round(r*1.2)}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(kind==='auto'?'A':'M',0,1);}
 ctx.restore();
}
async function renderFortressReport(summary,{demo=false}={}){
 if(!summary?.walls?.length)return null;
 const {createCanvas}=require('@napi-rs/canvas'),map=await loadFullMap(),plan=await loadRegions(),b=map.bounds,width=b.width,unit=b.height/(b.maxZ-b.minZ);
 const top=(TOP_Z-b.minZ)*unit,height=Math.round((BOTTOM_Z-TOP_Z)*unit),canvas=createCanvas(width,HEADER+height),ctx=canvas.getContext('2d');
 const to=(x,z)=>[(x-b.minX)/(b.maxX-b.minX)*width,HEADER+(z-TOP_Z)*unit];
 ctx.fillStyle='#14232b';ctx.fillRect(0,0,width,HEADER);ctx.fillStyle='#f3e4bc';ctx.font='bold 28px sans-serif';ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillText('SANKTHEIM · ÉTAT DES DÉFENSES',28,38);
 ctx.font='17px sans-serif';ctx.fillStyle='#c2d0ce';ctx.fillText('Fin de vague '+(summary.number??'')+' · solidité restante',28,65);
 if(demo){ctx.textAlign='right';ctx.fillStyle='#e8c065';ctx.font='bold 15px sans-serif';ctx.fillText('APERÇU · POURCENTAGES FICTIFS',width-28,37);ctx.textAlign='left';}
 ctx.drawImage(map.image,0,top,width,height,0,HEADER,width,height);
 // the outskirts' trees (the forest's own are on the picture) and the pond by the quarry
 const {extraTrees}=require('./expansion.cjs');ctx.fillStyle='#1e3d1c';
 for(const t of extraTrees){const [x,y]=to(t.x,t.z);if(y<HEADER)continue;ctx.beginPath();ctx.arc(x,y,3.2,0,Math.PI*2);ctx.fill();}
 {const [x,y]=to(-221,61),[ex]=to(-213,61),[,ey]=to(-221,67);ctx.fillStyle='#2f8f9a';ctx.beginPath();ctx.ellipse(x,y,ex-x,ey-y,0,0,Math.PI*2);ctx.fill();}
 // the fortress and its burnt route
 const m=summary.mechapom;
 if(m){
  const {ROUTE,along}=require('./mechapom.cjs'),k=Math.max(0,Math.min(1,m.progress??0)),burnt=[ROUTE[0]];for(let i=1;i<=60;i++){const p=along(k*i/60);burnt.push([p.x,p.z]);}
  const path=(color,w)=>{ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();burnt.forEach(([x,z],i)=>{const [px,py]=to(x,z);if(i)ctx.lineTo(px,py);else ctx.moveTo(px,py);});ctx.stroke();};
  path('rgba(150,40,15,.85)',9);path('#ffb048',3);drawMechapom(ctx,m,to,13);
 }
 // the installations
 for(const item of summary.installations??[]){if(!Number.isFinite(item.x)||!Number.isFinite(item.z))continue;const s=SYMBOLS.find(v=>v[0]===item.kind);if(!s)continue;const [x,y]=to(item.x,item.z);symbol(ctx,item.kind,s[2],x,y,6);}
 // the walls: each section in its colour, its strength beside it (the towers' to the side: they sit close to the gate)
 const byId=new Map(summary.walls.map(w=>[w.id,w]));
 // the plan's outlines turned onto the map: its u runs along -z, its v along x
 {const L=plan.layout,k=132/L.width,sx=width/(b.maxX-b.minX);ctx.save();ctx.setTransform(0,-k*unit,k*sx,0,(-L.height/2*k-22-b.minX)*sx,HEADER+(L.width/2*k-TOP_Z)*unit);ctx.drawImage(plan.overlay,0,0);ctx.restore();}
 for(const [id]of REGIONS){const z=fromPlan(plan.layout,plan.layout.regions.find(r=>r.id===id).x,0).z;
  const region=REGIONS.find(r=>r[0]===id),wall=byId.get(id),percent=wall?Math.round(Math.max(0,Math.min(100,wall.remainingPercent??wall.hp/wall.maxHP*100))):null,text=percent==null?'—':percent+' %';
  // left of the walls; the towers' further out and pushed away from the gate's, which they nearly touch
  const r=plan.layout.regions.find(r=>r.id===id),c=fromPlan(plan.layout,r.x,r.y),[wx,wy]=to(c.x,c.z),tower=id.endsWith('tower');
  ctx.font='bold 19px sans-serif';const bw=Math.max(64,ctx.measureText(text).width+20),bx=wx-bw-(tower?110:16),by=wy+(tower?Math.sign(z)*16:0);
  ctx.strokeStyle=region[2];ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(bx+bw,by);ctx.lineTo(wx-6,wy);ctx.stroke();
  ctx.fillStyle='#132028ee';ctx.fillRect(bx,by-15,bw,30);ctx.strokeRect(bx,by-15,bw,30);
  ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,bx+bw/2,by+1);
 }
 // the legend, bottom left
 const rows=[...REGIONS.map(([,label,color])=>({label,draw:(x,y)=>{ctx.fillStyle=color;ctx.fillRect(x-7,y-7,14,14);}})),...SYMBOLS.map(([kind,label,color])=>({label:kind==='auto'&&summary.autoTurretKills!=null?label+' · '+summary.autoTurretKills+' victime'+(summary.autoTurretKills>1?'s':''):label,draw:(x,y)=>symbol(ctx,kind,color,x,y,7)})),
  ...(m?[{label:'Forteresse Mechapom',draw:(x,y)=>drawMechapom(ctx,{x:0,z:0,heading:0},()=>[x,y],7)},{label:'Sillage brûlé',draw:(x,y)=>{ctx.strokeStyle='#ffb048';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x-9,y);ctx.lineTo(x+9,y);ctx.stroke();}}]:[])];
 const half=Math.ceil(rows.length/2),lw=380,lh=half*22+18,lx=16,ly=HEADER+height-lh-16;
 ctx.fillStyle='rgba(16,27,35,.82)';ctx.fillRect(lx,ly,lw,lh);ctx.strokeStyle='#b39153';ctx.lineWidth=1;ctx.strokeRect(lx,ly,lw,lh);
 ctx.font='bold 14px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
 rows.forEach((row,i)=>{const x=lx+20+(i<half?0:lw/2),y=ly+20+(i%half)*22;row.draw(x,y);ctx.fillStyle='#e6eeeb';ctx.font='bold 14px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(row.label,x+16,y+1);});
 return {attachment:canvas.toBuffer('image/png'),name:'sanktheim-bilan-vague-'+(summary.number??'')+'.png'};
}
function drawMechapom(ctx,m,to,r){
 const [x,y]=to(m.x,m.z),[ax,ay]=to(m.x+Math.cos(m.heading??0),m.z+Math.sin(m.heading??0)),a=Math.atan2(ay-y,ax-x);
 ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.lineCap='round';
 for(const s of [-1,1])for(const k of [-.7,0,.7]){ctx.strokeStyle='#1d1a1c';ctx.lineWidth=r*.28;ctx.beginPath();ctx.moveTo(k*r*.5,s*r*.5);ctx.lineTo(k*r*1.1,s*r*1.55);ctx.stroke();ctx.strokeStyle='#5c5860';ctx.lineWidth=r*.14;ctx.stroke();}
 ctx.fillStyle='#e8701f';ctx.strokeStyle='#2a1208';ctx.lineWidth=Math.max(2,r*.14);ctx.beginPath();ctx.ellipse(0,0,r*.95,r*1.15,0,0,Math.PI*2);ctx.fill();ctx.stroke();
 ctx.fillStyle='#8a7f70';ctx.beginPath();ctx.ellipse(-r*.1,0,r*.5,r*.62,0,0,Math.PI*2);ctx.fill();   // its deck
 ctx.fillStyle='#ff2a18';for(const s of [-1,1]){ctx.beginPath();ctx.arc(r*.82,s*r*.28,Math.max(2,r*.16),0,Math.PI*2);ctx.fill();}
 ctx.restore();
}
module.exports={renderFortressReport,REGIONS};
