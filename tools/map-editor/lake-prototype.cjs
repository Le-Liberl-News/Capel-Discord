// Hand-built low-poly floor plan with native Esmelas materials and native props. Editor Z is up.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const {directory}=require('../../activity/tools/map-editor-source.cjs');
const {build}=require('./project.cjs');
const NAME='lac-rouge-prototype',N=24,TAU=Math.PI*2;
function clip(poly,a,b){const side=p=>(b[0]-a[0])*(p.p[1]-a[1])-(b[1]-a[1])*(p.p[0]-a[0]),out=[];for(let i=0;i<poly.length;i++){const v=poly[i],w=poly[(i+1)%poly.length],d=side(v),e=side(w);if(d>=-1e-7)out.push(v);if((d>=0)!==(e>=0)){const t=d/(d-e);out.push({p:v.p.map((n,k)=>n+(w.p[k]-n)*t),uv:v.uv.map((n,k)=>n+(w.uv[k]-n)*t)});}}return out;}
function cut(tris,outline){return tris.flatMap(t=>{let p=t;for(let i=0;i<outline.length&&p.length;i++)p=clip(p,outline[i],outline[(i+1)%outline.length]);return p.slice(1,-1).map((_,i)=>[p[0],p[i+1],p[i+2]]);});}
function packed(template,tris){return {...structuredClone(template),positions:tris.flat(2).flatMap(v=>v.p),uv:tris.flat(2).flatMap(v=>v.uv),colors:Array(tris.length*12).fill(1)};}
function makePrototype(source){
 const assets={},objects=[],lights=[],byType=t=>Object.values(source.assets).find(a=>a.type===t),floor=byType('platform').parts[0],wall=byType('wall').parts[0],flowers=byType('flowers'),water=byType('water').parts.filter(p=>p.material.extras.dungeonWater);
 const prototype={version:1,map:'hallow1',assets,objects,layout:{version:1,floor:1,totalFloors:1,name:'Le lac des hortensias',theme:'crimson-lake',start:{x:0,y:0,z:15.5},exit:{x:0,y:0,z:-15.5},rooms:[],platforms:[],bridges:[],stairs:[],fixtures:[],sockets:[],obstacles:[],membranes:[],lights,torches:[],traps:[],movingPlatforms:[],enemySpawns:[],editorLighting:true,editorGrid:false,editorBackground:'#090a12',prototype:NAME,source:{geometry:'Hand-assembled stone floors with native Esmelas materials and wall panels; native Sky flower cutouts and water',textures:'Native 256px flower cut/paste and palette edits; native animated water palette edits'}}};
 let next=0;
 function asset(id,label,type,role,parts){return assets[id]={id,label,type,role,source:prototype.layout.source,parts};}
 function put(a,name,x,y,z=0,yaw=0,scale=[1,1,1],role=a.role){const o={id:'lake-'+next++,asset:a.id,name,role,position:[x,y,z],rotation:[0,0,yaw],scale,visible:true};objects.push(o);return o;}
 function marker(kind,p){objects.push({id:kind,asset:null,name:kind==='start'?'Entrée · rive sud':'Sortie · rive nord',role:'marker',binding:{kind},position:[p.x,-p.z,p.y],rotation:[0,0,0],scale:[1,1,1],visible:true});}
 function light(name,x,y,z,color,radius,strength){const index=lights.length;lights.push({position:[x,z,-y],color,radius,strength,flicker:false});objects.push({id:'light-'+index,asset:null,name,role:'marker',binding:{kind:'light',index},position:[x,y,z],rotation:[0,0,0],scale:[1,1,1],visible:true});}
 // Closed floor tiles: the old room's cropped native triangles contain small gaps.
 // Keep the native stone texel density, but do not copy those gaps into navigation.
 const corners=[[-1,-1],[1,-1],[1,1],[-1,1]].map(p=>({p:[...p,0],uv:[p[0]/8,-p[1]/8]})),tile=[[corners[0],corners[1],corners[2]],[corners[0],corners[2],corners[3]]];
 function surface(id,label,outline,z=0){const xs=outline.map(p=>p[0]),ys=outline.map(p=>p[1]),tris=[];for(let x=Math.floor(Math.min(...xs)/2)*2;x<=Math.max(...xs)+1;x+=2)for(let y=Math.floor(Math.min(...ys)/2)*2;y<=Math.max(...ys)+1;y+=2){const moved=tile.map(t=>t.map(v=>({...v,p:[v.p[0]+x,v.p[1]+y,z]})));tris.push(...cut(moved,outline));}const a=asset(id,label,'lake:stone','floor',[packed(floor,tris)]);put(a,label,0,0);return a;}
 // Slightly irregular 24-sided shoreline, independent editable sectors.
 const shore=Array.from({length:N},(_,i)=>{const a=TAU*i/N,r=1+.045*Math.sin(i*2.7);return [16*Math.cos(a)*r,11.8*Math.sin(a)*r];});
 const outer=Array.from({length:N},(_,i)=>[21*Math.cos(TAU*i/N),17.5*Math.sin(TAU*i/N)]);
 const island=Array.from({length:N},(_,i)=>[4.5*Math.cos(TAU*i/N),3.8*Math.sin(TAU*i/N)]);
 for(let i=0;i<N;i++){const j=(i+1)%N;surface('bank-'+i,'Berge de pierre '+(i+1),[shore[i],outer[i],outer[j],shore[j]]);}
 surface('island','Îlot central',island);
 surface('bridge-s','Pont sud',[[-1.25,-13],[1.25,-13],[1.25,-3.4],[-1.25,-3.4]],.035);
 surface('bridge-n','Pont nord',[[-1.25,3.4],[1.25,3.4],[1.25,13],[-1.25,13]],.035);
 // Water follows the shoreline and has a hole around the island. Bridge is above it.
 for(let layer=0;layer<2;layer++){
  const template=structuredClone(water[layer]);template.texture='/assets/sky/'+NAME+'/'+(layer?'reflets-rouges':'eau-rouge')+'.png';template.material.pbrMetallicRoughness.baseColorFactor=[1,1,1,layer?.48:.96];template.material.extras.dungeonWaterLayer=layer;
  const tris=[];for(let i=0;i<N;i++){const j=(i+1)%N,points=[shore[i],shore[j],island[j],island[i]],vs=points.map(p=>({p:[p[0],p[1],-.42+layer*.012],uv:[p[0]/4,p[1]/4]}));tris.push([vs[0],vs[1],vs[2]],[vs[0],vs[2],vs[3]]);}
  put(asset('water-'+layer,layer?'Reflets animés rouges':'Lac rouge animé','lake:water','decoration',[packed(template,tris)]),'Lac · couche '+layer,0,0);
 }
 // Native wall panel normalized to its own tangent, retaining UVs and ornament.
 const p0=wall.positions.slice(0,3),p1=wall.positions.slice(3,6),len=Math.hypot(p1[0]-p0[0],p1[1]-p0[1]),unit=[(p1[0]-p0[0])/len,(p1[1]-p0[1])/len],panel=structuredClone(wall);
 panel.positions=panel.positions.map((v,i,a)=>i%3===0?a[i]*unit[0]+a[i+1]*unit[1]:i%3===1?0:v);
 const panelAsset=asset('wall','Mur orné d’Esmelas','lake:wall','wall',[panel]);
 function edge(a,b,z,height,name,role='wall'){const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);put(panelAsset,name,(a[0]+b[0])/2,(a[1]+b[1])/2,z,Math.atan2(dy,dx),[length/len,1,height/3.5],role);}
 for(let i=0;i<N;i++){const j=(i+1)%N;edge(shore[i],shore[j],-1.25,1.25,'Soubassement de berge '+i);edge(island[i],island[j],-1.25,1.25,'Soubassement de l’îlot '+i);if(![5,6,17,18].includes(i))edge(outer[i],outer[j],0,i%4===0?4.8:3.9,'Mur périphérique '+i);}
 for(const [lo,hi]of [[-12,-4.1],[4.1,12]])for(const x of [-1.35,1.35])edge([x,lo],[x,hi],-.8,.8,'Tablier du pont');
 // Native railing below knee height, with gaps around the central island.
 for(const [lo,hi]of [[-11.8,-4.2],[4.2,11.8]])for(const x of [-1.32,1.32])edge([x,lo],[x,hi],.03,.65,'Parapet bas du pont');
 for(const variant of ['blanc','violet']){
  // Reassemble the native cutout as crossed full panels. Its original folded,
  // half-texture planes would shear the newly pasted round flower heads.
  const flora=[];for(let i=0;i<3;i++){const a=Math.PI*i/3,dx=.85*Math.cos(a),dy=.85*Math.sin(a),vs=[{p:[-dx,-dy,0],uv:[0,1]},{p:[dx,dy,0],uv:[1,1]},{p:[dx,dy,1.35],uv:[1,0]},{p:[-dx,-dy,1.35],uv:[0,0]}];flora.push([vs[0],vs[1],vs[2]],[vs[0],vs[2],vs[3]]);}
  const base=packed(flowers.parts[0],flora);base.texture='/assets/sky/'+NAME+'/hortensias-'+variant+'.png';base.material.alphaMode='MASK';base.material.alphaCutoff=.12;base.material.extras.skyBackdrop=false;base.material.extras.horrorDecal=false;
  const glow=structuredClone(base);glow.texture='/assets/sky/'+NAME+'/hortensias-'+variant+'-halo.png';glow.material.alphaMode='BLEND';glow.material.extras={dungeonFloralGlow:true};glow.material.pbrMetallicRoughness.baseColorFactor=[1,1,1,.8];
  asset('flowers-'+variant,'Hortensias '+(variant==='blanc'?'blancs':'violets'),'lake:flowers-'+variant,'decoration',[base,glow]);
 }
 for(let i=0;i<76;i++){const a=TAU*i/76;if(Math.abs(Math.cos(a))<.12)continue;const k=Math.round(i*N/76)%N,r=1.035+.025*Math.sin(i*5),x=16*Math.cos(a)*r,y=11.8*Math.sin(a)*r,v=i%5<2?'blanc':'violet',s=.87+.16*Math.sin(i*2.3);put(assets['flowers-'+v],'Hortensias · rive · '+i,x,y,.02,a,[s,s,.83*s]);}
 for(let i=0;i<18;i++){const a=TAU*i/18;if(Math.abs(Math.cos(a))<.33)continue;const v=i%3?'blanc':'violet';put(assets['flowers-'+v],'Hortensias · îlot · '+i,3.9*Math.cos(a),3.25*Math.sin(a),.02,a,[.77,.77,.66]);}
 // A few shared lights per mass of flowers rather than a light per plant.
 for(let i=0;i<12;i++){const a=TAU*(i+.5)/12,v=i%3===0;light('Lueur des hortensias '+i,16*Math.cos(a),11.8*Math.sin(a),1.1,v?[.76,.72,1]:[.5,.26,.9],6.5,1.8);}
 light('Clarté sur l’îlot',0,0,3.8,[.64,.56,.85],11,1.25);
 light('Reflet rouge du lac est',8,0,.1,[.85,.08,.15],10,1.1);light('Reflet rouge du lac ouest',-8,0,.1,[.85,.08,.15],10,1.1);
 light('Entrée',0,-15,2,[.5,.44,.7],7,1.7);light('Sortie',0,15,2,[.5,.44,.7],7,1.7);
 marker('start',prototype.layout.start);marker('exit',prototype.layout.exit);
 return prototype;
}
function generate(){const result=spawnSync('python',[path.join(__dirname,'lake-textures.py')],{stdio:'inherit',windowsHide:true});if(result.status!==0)throw Error('Retouche des textures impossible');const source=JSON.parse(fs.readFileSync(path.join(directory,'hallow1.json'),'utf8')),p=makePrototype(source),built=build(p);if(built.warnings.length)throw Error(built.warnings.join(' '));const dest=path.join(directory,NAME+'.json');fs.writeFileSync(dest,JSON.stringify(p));const out='E:/dev/sky-activity-tools/map-editor/exports/'+NAME;fs.mkdirSync(out,{recursive:true});for(const [name,data]of [['anterose.gltf',built.gltf],['navigation.json',built.navigation],['layout.json',built.layout]])fs.writeFileSync(path.join(out,name),JSON.stringify(data));console.log(JSON.stringify({source:dest,export:out,stats:built.stats,warnings:built.warnings}));return {project:p,built};}
if(require.main===module)generate();
module.exports={makePrototype,generate};
