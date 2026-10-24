const {TREES,growth}=require('./forestry.cjs'),{roadZ}=require('./expansion.cjs');
const LAMPS=Array.from({length:17},(_,i)=>{const x=-62-i*18;return {id:'road-lamp-'+i,x,y:.04,z:roadZ(x)+1+(i%2?-6.5:6.5),height:4.8};});
function anchors(state,floor){const trees=new Map((state.forestry?.trees??[]).map(t=>[t.id,t]));return [...TREES.filter(d=>!d.stone&&(!trees.has(d.id)||growth(trees.get(d.id),state.at)>=2)).map(d=>({...d,y:d.y+d.height*.65*(trees.has(d.id)?growth(trees.get(d.id),state.at)/4:1),anchorKind:'tree'})),...LAMPS.map(d=>({...d,y:(floor?.(d.x,d.z,2)??d.y)+3.95,anchorKind:'lamp'}))];}
module.exports={LAMPS,anchors};
