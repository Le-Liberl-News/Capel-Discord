const fs=require('node:fs'),path=require('node:path');
const REGIONS=[['west-wall','Muraille ouest','#6ab8f0'],['west-tower','Tour ouest','#b09aef'],['gate','Porte renforcée','#e8c065'],['east-tower','Tour est','#ec91a6'],['east-wall','Muraille est','#63cdb0']];
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));let assets;
async function load(){if(!assets)assets=(async()=>{const {createCanvas,loadImage}=require('@napi-rs/canvas'),folder=path.join(__dirname,'assets/overview'),layout=JSON.parse(fs.readFileSync(path.join(folder,'layout.json'),'utf8')),base=await loadImage(path.join(folder,'base.png')),mask=await loadImage(path.join(folder,'mask.png')),canvas=createCanvas(layout.width,layout.height),ctx=canvas.getContext('2d');ctx.drawImage(mask,0,0);const pixels=ctx.getImageData(0,0,layout.width,layout.height).data,ids=new Int8Array(layout.width*layout.height).fill(-1);for(let i=0;i<ids.length;i++){const r=pixels[i*4],id=Math.round(r/40)-1;if(r>=32&&id>=0&&id<5&&pixels[i*4+1]<10&&pixels[i*4+2]<10)ids[i]=id;}const overlay=ctx.createImageData(layout.width,layout.height);for(let i=0;i<ids.length;i++){const id=ids[i];if(id<0)continue;const border=[i-1,i+1,i-layout.width,i+layout.width].some(j=>ids[j]!==id);overlay.data.set([...rgb(REGIONS[id][2]),border?190:88],i*4);}ctx.clearRect(0,0,layout.width,layout.height);ctx.putImageData(overlay,0,0);return {layout,base,overlay:canvas};})();return assets;}
async function renderFortressReport(summary,{demo=false}={}){
 if(!summary?.walls?.length)return null;const {createCanvas}=require('@napi-rs/canvas'),{layout,base,overlay}=await load(),width=layout.width,header=88,footer=102,map=summary.mechapom?await loadFullMap():null,route=map?fullMapHeight(map,width):0,canvas=createCanvas(width,header+layout.height+route+footer),ctx=canvas.getContext('2d');
 ctx.fillStyle='#14232b';ctx.fillRect(0,0,width,canvas.height);ctx.fillStyle='#f3e4bc';ctx.font='bold 28px sans-serif';ctx.fillText('SANKTHEIM · ÉTAT DES DÉFENSES',28,38);ctx.font='17px sans-serif';ctx.fillStyle='#c2d0ce';ctx.fillText('Fin de vague '+(summary.number??'')+' · solidité restante',28,65);if(demo){ctx.textAlign='right';ctx.fillStyle='#e8c065';ctx.font='bold 15px sans-serif';ctx.fillText('APERÇU · POURCENTAGES FICTIFS',width-28,37);ctx.textAlign='left';}
 ctx.drawImage(base,0,header);ctx.drawImage(overlay,0,header);const byId=new Map(summary.walls.map(w=>[w.id,w]));
 for(const r of layout.regions){const region=REGIONS.find(v=>v[0]===r.id),w=byId.get(r.id),percent=w?Math.round(Math.max(0,Math.min(100,w.remainingPercent??w.hp/w.maxHP*100))):null,text=percent==null?'—':percent+' %';ctx.font='bold 25px sans-serif';const bw=Math.max(74,ctx.measureText(text).width+26),x=r.x,y=header+r.y;ctx.fillStyle='#132028ec';ctx.fillRect(x-bw/2,y-22,bw,43);ctx.strokeStyle=region[2];ctx.lineWidth=2;ctx.strokeRect(x-bw/2,y-22,bw,43);ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,x,y);}
 // The baked top-down orthographic camera is centred at (-22, 0), with +Z left.
 const symbols=[['mine','Mine','#f5d85e'],['barricade','Barricade','#f6a56a'],['auto','Tourelle auto','#80e9ee'],['manual','Canon manuel','#f2b9f2']];
 ctx.save();ctx.beginPath();ctx.rect(0,header,width,layout.height);ctx.clip();
 for(const item of summary.installations??[]){if(!Number.isFinite(item.x)||!Number.isFinite(item.z))continue;const symbol=symbols.find(v=>v[0]===item.kind);if(!symbol)continue;const x=width/2-item.z*width/132,y=header+layout.height/2+(item.x+22)*width/132;ctx.save();ctx.translate(x,y);ctx.fillStyle=symbol[2];ctx.strokeStyle='#101b23';ctx.lineWidth=3;ctx.beginPath();if(item.kind==='mine'){ctx.moveTo(0,-8);ctx.lineTo(8,0);ctx.lineTo(0,8);ctx.lineTo(-8,0);ctx.closePath();}else if(item.kind==='barricade'){ctx.rect(-11,-5,22,10);}else{ctx.arc(0,0,10,0,Math.PI*2);}ctx.fill();ctx.stroke();if(item.kind==='auto'||item.kind==='manual'){ctx.fillStyle='#101b23';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(item.kind==='auto'?'A':'M',0,1);}ctx.restore();}
 if(summary.mechapom)drawMechapom(ctx,summary.mechapom,(x,z)=>[width/2-z*width/132,header+layout.height/2+(x+22)*width/132],20);
 ctx.restore();
 if(map)drawFullMap(ctx,summary.mechapom,map,width,header+layout.height);
 ctx.textAlign='left';ctx.textBaseline='alphabetic';const top=header+layout.height+route;ctx.fillStyle='#102029';ctx.fillRect(0,top,width,footer);ctx.font='bold 17px sans-serif';for(const [i,region]of REGIONS.entries()){const x=25+i*(width-32)/5;ctx.fillStyle=region[2];ctx.fillRect(x,top+23,15,15);ctx.fillStyle='#e6eeeb';ctx.fillText(region[1],x+23,top+37);}ctx.fillStyle='#a2b8ba';ctx.font='15px sans-serif';for(const [i,[kind,label,color]]of symbols.entries()){const x=25+i*width/4;ctx.fillStyle=color;ctx.font='bold 17px sans-serif';ctx.beginPath();if(kind==='mine'){ctx.moveTo(x+8,top+62);ctx.lineTo(x+15,top+70);ctx.lineTo(x+8,top+78);ctx.lineTo(x+1,top+70);ctx.closePath();}else if(kind==='barricade')ctx.rect(x,top+66,17,8);else ctx.arc(x+9,top+70,9,0,Math.PI*2);ctx.fill();if(kind==='auto'||kind==='manual'){ctx.fillStyle='#102029';ctx.font='bold 12px sans-serif';ctx.fillText(kind==='auto'?'A':'M',x+5,top+74);}ctx.fillStyle=color;ctx.font='bold 17px sans-serif';ctx.fillText(label,x+25,top+78);}
 return {attachment:canvas.toBuffer('image/png'),name:'sanktheim-bilan-vague-'+(summary.number??'')+'.png'};
}
// The Mechapom fortress (mechapom.cjs) seen from above: a ball of orange plates on six legs, its two red
// headlights toward where it goes; at (x, z) of the map through `to`, radius r in pixels
function drawMechapom(ctx,m,to,r){
 const [x,y]=to(m.x,m.z),[ax,ay]=to(m.x+Math.cos(m.heading??0),m.z+Math.sin(m.heading??0)),a=Math.atan2(ay-y,ax-x);
 ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.lineCap='round';
 for(const s of [-1,1])for(const k of [-.7,0,.7]){ctx.strokeStyle='#1d1a1c';ctx.lineWidth=r*.28;ctx.beginPath();ctx.moveTo(k*r*.5,s*r*.5);ctx.lineTo(k*r*1.1,s*r*1.55);ctx.stroke();ctx.strokeStyle='#5c5860';ctx.lineWidth=r*.14;ctx.stroke();}
 ctx.fillStyle='#e8701f';ctx.strokeStyle='#2a1208';ctx.lineWidth=Math.max(2,r*.14);ctx.beginPath();ctx.ellipse(0,0,r*.95,r*1.15,0,0,Math.PI*2);ctx.fill();ctx.stroke();
 ctx.fillStyle='#8a7f70';ctx.beginPath();ctx.ellipse(-r*.1,0,r*.5,r*.62,0,0,Math.PI*2);ctx.fill();   // its deck
 ctx.fillStyle='#ff2a18';for(const s of [-1,1]){ctx.beginPath();ctx.arc(r*.82,s*r*.28,Math.max(2,r*.16),0,Math.PI*2);ctx.fill();}
 ctx.restore();
}
// the whole map seen from above (tools/bake-full-map.html), to watch the fortress come: the outskirts' trees, the
// pond, the route it has burnt and where it stands now
const MAP_TITLE=30;
let fullMap;
async function loadFullMap(){
 fullMap??=(async()=>{const {loadImage}=require('@napi-rs/canvas'),folder=path.join(__dirname,'assets/overview');
  return {image:await loadImage(path.join(folder,'full-map.png')),bounds:JSON.parse(fs.readFileSync(path.join(folder,'full-map.json'),'utf8'))};})();
 return fullMap;
}
const fullMapHeight=(map,width)=>Math.round(map.bounds.height*width/map.bounds.width)+MAP_TITLE;
function drawFullMap(ctx,m,map,width,top){
 const {ROUTE,along}=require('./mechapom.cjs'),{extraTrees}=require('./expansion.cjs'),b=map.bounds,height=fullMapHeight(map,width)-MAP_TITLE,y0=top+MAP_TITLE;
 const to=(x,z)=>[(x-b.minX)/(b.maxX-b.minX)*width,y0+(z-b.minZ)/(b.maxZ-b.minZ)*height];
 ctx.fillStyle='#102029';ctx.fillRect(0,top,width,MAP_TITLE);
 ctx.fillStyle='#c2d0ce';ctx.font='bold 16px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText('Carte de Sanktheim · avancée de la forteresse Mechapom',28,top+MAP_TITLE/2);
 ctx.drawImage(map.image,0,y0,width,height);
 // the outskirts' trees (the forest's own are on the picture), the pond by the quarry
 ctx.fillStyle='#1e3d1c';for(const t of extraTrees){const [x,y]=to(t.x,t.z);ctx.beginPath();ctx.arc(x,y,3.2,0,Math.PI*2);ctx.fill();}
 {const [x,y]=to(-221,61),[ex]=to(-213,61),[,ey]=to(-221,67);ctx.fillStyle='#2f8f9a';ctx.beginPath();ctx.ellipse(x,y,ex-x,ey-y,0,0,Math.PI*2);ctx.fill();}
 const path=(points,color,w)=>{ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();points.forEach(([x,z],i)=>{const [px,py]=to(x,z);if(i)ctx.lineTo(px,py);else ctx.moveTo(px,py);});ctx.stroke();};
 const k=Math.max(0,Math.min(1,m.progress??0)),burnt=[ROUTE[0]];for(let i=1;i<=60;i++){const p=along(k*i/60);burnt.push([p.x,p.z]);}
 path(burnt,'rgba(150,40,15,.85)',9);path(burnt,'#ffb048',3);
 const [gx,gy]=to(-33,0);ctx.fillStyle='#f3e4bc';ctx.font='bold 14px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';ctx.strokeStyle='#102029';ctx.lineWidth=4;ctx.strokeText('Porte',gx+8,gy-18);ctx.fillText('Porte',gx+8,gy-18);
 drawMechapom(ctx,m,to,13);
}
module.exports={renderFortressReport,REGIONS};
