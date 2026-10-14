// Recover only an authoritative ground position stranded at a rasterized edge.
// The submitted destination never participates in choosing the recovery point.
function recoverGround(grid,player,radius=.75){
 const {step,width,height,origin,cells}=grid;
 const ax=Math.round((player.x-origin.x)/step),az=Math.round((player.z-origin.z)/step);
 if(ax>=0&&az>=0&&ax<width&&az<height&&cells[az*width+ax]!=null)return null;
 let best=null,score=radius*radius;
 const reach=Math.ceil(radius/step);
 for(let z=Math.max(0,az-reach);z<=Math.min(height-1,az+reach);z++)for(let x=Math.max(0,ax-reach);x<=Math.min(width-1,ax+reach);x++){
  const y=cells[z*width+x];if(y==null||Math.abs(y-player.y)>.5)continue;
  const p={x:origin.x+x*step,y,z:origin.z+z*step},d=(p.x-player.x)**2+(p.z-player.z)**2;
  if(d<score){score=d;best=p;}
 }
 return best;
}
module.exports={recoverGround};
