function terminalNearby(position,terminal,radius=2.5) {
 return !!position&&Math.hypot(position.x-terminal.position.x,position.z-terminal.position.z)<=radius&&Math.abs((position.y??0)-terminal.position.y)<=1;
}
function terminalNavigation(grid,terminal) {
 const cells=[...grid.cells],c=Math.cos(terminal.rotation),s=Math.sin(terminal.rotation),padding=.2;
 for(let z=0;z<grid.height;z++)for(let x=0;x<grid.width;x++) {
  const i=z*grid.width+x;if(cells[i]===null||Math.abs(cells[i]-terminal.position.y)>1.5)continue;
  const dx=grid.origin.x+x*grid.step-terminal.position.x,dz=grid.origin.z+z*grid.step-terminal.position.z,
   localX=c*dx-s*dz,localZ=s*dx+c*dz;
  if(localX>=terminal.bounds.min.x-padding&&localX<=terminal.bounds.max.x+padding&&localZ>=terminal.bounds.min.z-padding&&localZ<=terminal.bounds.max.z+padding)cells[i]=null;
 }
 return {...grid,cells};
}
module.exports={terminalNearby,terminalNavigation};
