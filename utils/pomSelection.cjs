// A craftless NPC has six times the draw weight of a character with a custom craft.
function weightedPick(names,hasCraft,random=Math.random){
 if(!names.length)return null;
 const weights=names.map(n=>hasCraft(n)?1:6),total=weights.reduce((a,b)=>a+b,0);
 let draw=Math.min(.999999999999,Math.max(0,random()))*total;
 for(let i=0;i<names.length;i++){draw-=weights[i];if(draw<0)return names[i];}
 return names.at(-1);
}
function weightedSample(names,count,hasCraft,random=Math.random){const left=[...names],out=[];while(out.length<count&&left.length){const n=weightedPick(left,hasCraft,random);out.push(n);left.splice(left.indexOf(n),1);}return out;}
module.exports={weightedPick,weightedSample};
