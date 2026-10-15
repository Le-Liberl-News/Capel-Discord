const {splitAsset}=require('./split-assets.cjs');
function editablePieces(asset,mode='islands'){
 if(mode==='faces'){
  const count=asset.parts.reduce((n,p)=>n+p.positions.length/9,0);if(count>6000)throw Error('Trop de faces : isolez d’abord une partie plus petite du modèle (maximum 6 000 faces).');
  return asset.parts.flatMap((p,j)=>Array.from({length:p.positions.length/9},(_,i)=>({...asset,id:asset.id+':face:'+j+':'+i,label:'Face '+(j+1)+'.'+(i+1),group:false,parts:[{...p,material:structuredClone(p.material),positions:p.positions.slice(i*9,i*9+9),uv:p.uv.slice(i*6,i*6+6),colors:p.colors?.slice(i*12,i*12+12)??Array(12).fill(1)}]})));
 }
 if(mode==='surfaces')return asset.parts.map((p,i)=>({...structuredClone(asset),id:asset.id+':surface:'+i,label:'Surface '+(i+1)+' · '+p.texture.split('/').at(-1),parts:[structuredClone(p)],group:false}));
 const pieces=splitAsset(asset);return pieces.length?pieces:[{...structuredClone(asset),group:false}];
}
function assembleEdit(original,pieces,id){
 if(!pieces.length)throw Error('Gardez au moins un morceau, ou supprimez l’objet depuis la map.');
 const pivot=original.sourcePivot??[0,0,0];
 const parts=pieces.flatMap(a=>a.parts.map(p=>({...structuredClone(p),positions:p.positions.map((n,i)=>n+(a.sourcePivot?.[i%3]??0)-pivot[i%3])})));
 const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(const p of parts)for(let i=0;i<p.positions.length;i++){min[i%3]=Math.min(min[i%3],p.positions[i]);max[i%3]=Math.max(max[i%3],p.positions[i]);}
 return {...structuredClone(original),id,label:original.label+' modifié',type:'edited:'+id,parts,bounds:min.map((n,i)=>max[i]-n)};
}
module.exports={editablePieces,assembleEdit};
