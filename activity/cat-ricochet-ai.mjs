// Plan a short wall-normal throw so the returning Pom crosses its stationary owner.
export function catRicochetPlan(actor,grid,geometry){
 const origin={x:actor.x,y:(actor.y??0)+.9,z:actor.z},valid=p=>{const x=Math.round((p.x-grid.origin.x)/grid.step),z=Math.round((p.z-grid.origin.z)/grid.step);return x>=0&&z>=0&&x<grid.width&&z<grid.height&&grid.cells[z*grid.width+x]!=null;};let best=null;
 for(let i=0;i<(geometry?48:4);i++){const angle=i*Math.PI*2/(geometry?48:4),d={x:Math.cos(angle),y:0,z:Math.sin(angle)};let contact=geometry?.sweep(origin,{x:origin.x+d.x*35,y:origin.y,z:origin.z+d.z*35},.22);
 if(!geometry)for(let n=.1;n<35;n+=.1){const p={x:origin.x+d.x*n,y:origin.y,z:origin.z+d.z*n};if(!valid(p)){contact={point:p,normal:{x:-d.x,y:0,z:-d.z}};break;}}
 if(!contact||Math.abs(contact.normal.y)>.1)continue;const p=contact.point,n=contact.normal,stand={x:p.x+n.x*1.5,y:actor.y??0,z:p.z+n.z*1.5},distance=Math.hypot(stand.x-actor.x,stand.z-actor.z);if(!valid(stand)||distance>25)continue;if(!best||distance<best.distance)best={stand,aim:{x:p.x-n.x*.2,y:origin.y,z:p.z-n.z*.2},distance};
 }return best;
}
