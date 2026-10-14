import {ShapeUtils,Vector2} from 'three';

const material=()=>({alphaMode:'OPAQUE',doubleSided:true,extensions:{KHR_materials_unlit:{}},pbrMetallicRoughness:{baseColorFactor:[1,1,1,1]}});
export function pngQuad(id,label,texture,width,height){
  const m=material();m.alphaMode='BLEND';
  return {id,label,type:'png:'+id,role:'decoration',source:'PNG personnel',parts:[{texture,material:m,positions:[-width/2,0,0,width/2,0,0,width/2,0,height,-width/2,0,0,width/2,0,height,-width/2,0,height],uv:[0,1,1,1,1,0,0,1,1,0,0,0],colors:Array(24).fill(1)}]};
}
const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
function intersects(a,b,c,d){const on=(a,b,p)=>Math.abs(cross(a,b,p))<1e-8&&p.x>=Math.min(a.x,b.x)-1e-8&&p.x<=Math.max(a.x,b.x)+1e-8&&p.y>=Math.min(a.y,b.y)-1e-8&&p.y<=Math.max(a.y,b.y)+1e-8;return cross(a,b,c)*cross(a,b,d)<0&&cross(c,d,a)*cross(c,d,b)<0||on(a,b,c)||on(a,b,d)||on(c,d,a)||on(c,d,b);}
export function polygonFloor(id,label,points,texture,tile=2){
  if(!Number.isFinite(tile)||tile<=0)throw Error('La taille des carreaux doit être positive.');
  const clean=[];for(const p of points){if(!p.every(Number.isFinite)||p.length!==2)throw Error('Sommet invalide.');const v=new Vector2(...p);if(!clean.length||v.distanceTo(clean.at(-1))>1e-6)clean.push(v);}
  if(clean.length>2&&clean[0].distanceTo(clean.at(-1))<1e-6)clean.pop();
  if(clean.length<3||clean.length>256)throw Error('Il faut entre 3 et 256 sommets.');
  for(let i=0;i<clean.length;i++)for(let j=i+1;j<clean.length;j++){if(j===i+1||i===0&&j===clean.length-1)continue;if(intersects(clean[i],clean[(i+1)%clean.length],clean[j],clean[(j+1)%clean.length]))throw Error('Les bords du sol se croisent.');}
  if(Math.abs(ShapeUtils.area(clean))<.01)throw Error('Le sol est trop petit ou ses sommets sont alignés.');
  const triangles=ShapeUtils.triangulateShape(clean,[]),positions=[],uv=[];
  for(const tri of triangles)for(const i of tri){const p=clean[i];positions.push(p.x,p.y,0);uv.push(p.x/tile,-p.y/tile);}
  return {id,label,type:'floor:'+id,role:'floor',source:'Sol dessiné',outline:clean.map(p=>p.toArray()),tile,parts:[{texture,material:material(),positions,uv,colors:Array(positions.length/3*4).fill(1)}]};
}
