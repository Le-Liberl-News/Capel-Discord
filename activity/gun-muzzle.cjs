// A world-space point in front of the actor, on the weapon side. Never a camera-facing overlay.
function muzzlePosition(position,direction){
 const length=Math.hypot(direction.x,direction.z)||1,dx=direction.x/length,dz=direction.z/length;
 return {x:position.x+dx*.9-dz*.22,y:(position.y??0)+1.05,z:position.z+dz*.9+dx*.22};
}
module.exports={muzzlePosition};
