const fs=require('node:fs'),path=require('node:path');
const directory='E:/dev/sky-activity-tools/map-editor/sources';
const labels={platform:'Plateforme / sol',wall:'Mur',rail:'Garde-corps',foundation:'Soubassement',stairs:'Escalier',bench:'Banc d’église',tree:'Arbre',flowers:'Fleurs',water:'Bassin',rays:'Rayons du vitrail',projection:'Motif du vitrail au sol',window:'Vitrail',ritual:'Sceau d’Altaïr','laboratory-table':'Table de laboratoire',prop:'Mobilier'};
const toEditor=p=>[p[0],-p[2],p[1]];
function writeSource(map,groups,pieces,gltf,layout){
 for(let i=0;i<pieces.length;i++)if(pieces[i].type==='water'&&pieces.slice(i+1,i+5).every(p=>p.type==='rail')){pieces[i].segments.push(...pieces.slice(i+1,i+5).flatMap(p=>p.segments));pieces.splice(i+1,4);}
 const keys=[...groups.keys()],assets={},objects=[],covered=new Map();
 for(const p of pieces)for(const s of p.segments){let ranges=covered.get(s.key);if(!ranges)covered.set(s.key,ranges=[]);ranges.push([s.start,s.start+s.count]);}
 for(const [key,g]of groups){const ranges=covered.get(key)??[];let start=null;for(let i=0;i<=g.vertices.length;i+=3){const unused=i<g.vertices.length&&!ranges.some(([a,b])=>i>=a&&i<b);if(unused&&start===null)start=i;if(!unused&&start!==null){pieces.push({id:'remainder-'+pieces.length,type:g.kind==='wall'?'cage':'prop',segments:[{key,start,count:i-start}]});start=null;}}}
 for(const piece of pieces){const verts=piece.segments.flatMap(s=>groups.get(s.key).vertices.slice(s.start,s.start+s.count)),bounds=[0,1,2].map(i=>[Math.min(...verts.map(v=>v.p[i])),Math.max(...verts.map(v=>v.p[i]))]),pivot=[(bounds[0][0]+bounds[0][1])/2,bounds[1][0],(bounds[2][0]+bounds[2][1])/2],id=map+':'+piece.id;
  const role=['platform','stairs'].includes(piece.type)?'floor':['wall','rail','cage'].includes(piece.type)?'wall':['bench','tree','water','laboratory-table','prop'].includes(piece.type)?'obstacle':'decoration';
  assets[id]={id,label:labels[piece.type]??piece.type,type:piece.type,role,source:layout.source,parts:piece.segments.map(s=>{const g=groups.get(s.key),mi=keys.indexOf(s.key),material=structuredClone(gltf.materials[mi]);return {texture:'/assets/sky/halloween-dungeon/'+g.texture,material,positions:g.vertices.slice(s.start,s.start+s.count).flatMap(v=>toEditor(v.p.map((n,i)=>n-pivot[i]))),uv:g.vertices.slice(s.start,s.start+s.count).flatMap(v=>v.uv),colors:g.vertices.slice(s.start,s.start+s.count).flatMap(v=>material.extras.dungeonLight?(v.color??[1,1,1,1]):[1,1,1,1])};})};
  objects.push({id:piece.id,asset:id,name:assets[id].label,role,position:toEditor(pivot),rotation:[0,0,0],scale:[1,1,1],visible:true});
 }
 function marker(name,position,binding){objects.push({id:'marker-'+objects.length,asset:null,name,role:'marker',position:toEditor([position.x,position.y,position.z]),rotation:[0,0,0],scale:[1,1,1],visible:true,binding});}
 marker('Entrée',layout.start,{kind:'start'});marker('Sortie',layout.exit,{kind:'exit'});
 layout.lights.forEach((l,i)=>marker('Lumière '+(i+1),{x:l.position[0],y:l.position[1],z:l.position[2]},{kind:'light',index:i}));
 layout.fixtures.forEach((f,i)=>{if(['blood-mark','unlit-sconce'].includes(f.kind))marker(f.kind==='blood-mark'?'Sang au sol':'Applique éteinte',f.position,{kind:'fixture',index:i});});
 layout.membranes.forEach((d,i)=>marker(d.surface==='wall'?'Mur de corps animés':'Sol de corps animés',d.position,{kind:'membrane',index:i}));
 const project={version:1,map,assets,objects,layout};fs.mkdirSync(directory,{recursive:true});fs.writeFileSync(path.join(directory,map+'.json'),JSON.stringify(project));console.log('Editor source',map,objects.length,'objects');
}
module.exports={writeSource,directory,toEditor};
