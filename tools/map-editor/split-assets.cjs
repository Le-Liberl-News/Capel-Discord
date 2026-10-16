// Split by spatial connectivity across material/UV boundaries, not by draw call.
function splitAsset(asset){
 const triangles=[],parent=[],vertices=new Map();
 function find(i){while(parent[i]!==i){parent[i]=parent[parent[i]];i=parent[i];}return i;}
 function join(a,b){a=find(a);b=find(b);if(a!==b)parent[b]=a;}
 for(let part=0;part<asset.parts.length;part++){
  const p=asset.parts[part];
  for(let start=0;start<p.positions.length;start+=9){const i=triangles.length;triangles.push({part,start});parent.push(i);
   for(let v=0;v<3;v++){const key=p.positions.slice(start+v*3,start+v*3+3).map(n=>Math.round(n*10000)).join(',');if(vertices.has(key))join(i,vertices.get(key));else vertices.set(key,i);}
  }
 }
 const groups=new Map();for(let i=0;i<triangles.length;i++){const id=find(i);if(!groups.has(id))groups.set(id,[]);groups.get(id).push(triangles[i]);}
 if(groups.size<2)return [];
 return [...groups.values()].map((list,index)=>{
  const parts=new Map(),min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(const {part,start}of list){const src=asset.parts[part];let dst=parts.get(part);if(!dst){dst={...src,positions:[],uv:[],colors:[],...(src.animation?{animation:{...src.animation,frames:src.animation.frames.map(()=>[])}}:{})};parts.set(part,dst);}const positions=src.positions.slice(start,start+9);dst.positions.push(...positions);if(src.animation)src.animation.frames.forEach((frame,i)=>dst.animation.frames[i].push(...frame.slice(start,start+9)));dst.uv.push(...src.uv.slice(start/3*2,start/3*2+6));dst.colors.push(...src.colors.slice(start/3*4,start/3*4+12));for(let i=0;i<9;i++){min[i%3]=Math.min(min[i%3],positions[i]);max[i%3]=Math.max(max[i%3],positions[i]);}}
  const pivot=[(min[0]+max[0])/2,(min[1]+max[1])/2,min[2]];
  for(const p of parts.values()){p.positions=p.positions.map((n,i)=>n-pivot[i%3]);if(p.animation)p.animation.frames=p.animation.frames.map(frame=>frame.map((n,i)=>n-pivot[i%3]));}
  return {...asset,id:asset.id+':island:'+index,type:asset.type+':island:'+index,label:asset.label+' · objet '+(index+1),parts:[...parts.values()],bounds:min.map((n,i)=>max[i]-n),sourcePivot:pivot.map((n,i)=>n+(asset.sourcePivot?.[i]??0)),group:false};
 });
}
function completeModel(assets,id){
 const parts=assets.flatMap(a=>a.parts.map(p=>({...p,positions:p.positions.map((n,i)=>n+(a.sourcePivot?.[i%3]??0)),...(p.animation?{animation:{...p.animation,frames:p.animation.frames.map(frame=>frame.map((n,i)=>n+(a.sourcePivot?.[i%3]??0)))}}:{})})));
 const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(const p of parts)for(let i=0;i<p.positions.length;i++){min[i%3]=Math.min(min[i%3],p.positions[i]);max[i%3]=Math.max(max[i%3],p.positions[i]);}
 const pivot=[(min[0]+max[0])/2,(min[1]+max[1])/2,min[2]];for(const p of parts){p.positions=p.positions.map((n,i)=>n-pivot[i%3]);if(p.animation)p.animation.frames=p.animation.frames.map(frame=>frame.map((n,i)=>n-pivot[i%3]));}
 return {id:id+':node:all',type:'library:'+id+':all',source:id,label:id+' · modèle complet',role:'obstacle',parts,animations:parts.some(p=>p.animation)?[{name:parts.find(p=>p.animation).animation.name,duration:parts.find(p=>p.animation).animation.duration}]:[],bounds:min.map((n,i)=>max[i]-n),sourcePivot:pivot,group:true};
}
module.exports={splitAsset,completeModel};

