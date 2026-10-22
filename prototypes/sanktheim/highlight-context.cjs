// Freeze the real scene at the damaging hit; never retain mutable world entities.
function capture(state,hit){
 if(!hit?.position)return null;
 const scale=hit.scale??1,point=p=>({x:p.x/scale,y:p.y/scale,z:p.z/scale});
 const actors=[...state.soldiers,...Object.values(state.players).filter(p=>p.online),...state.enemies]
  .filter(a=>a.hp>0&&!a.siegeTank&&Math.hypot(a.x/scale-hit.position.x,a.z/scale-hit.position.z)<26)
  .map(a=>({id:a.id,character:a.pomCharacter??a.character??a.name,name:a.name,...point(a),
   pom:!!(a.pomControlled||a.id.startsWith('pom-')),soldier:a.id.startsWith('soldier-'),
   stage:a.stage,kind:a.kind,flying:a.flying,moving:a.moving,heading:a.heading&&{...a.heading}}));
 return {at:state.at,actors,hit:{from:hit.from,kind:hit.kind,position:{...hit.position},points:hit.points?.map(p=>({...p}))}};
}
module.exports={capture};
