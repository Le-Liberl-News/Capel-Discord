// World-space warning circles for server-owned enemy attacks.
export function createEnemyEffects(THREE,scene){
 const rings=new Map(),geometry=new THREE.RingGeometry(.88,1.1,32);
 return {update(enemies,time){const seen=new Set();for(const e of enemies){if(!e.attack||e.hp<=0)continue;seen.add(e.id);let ring=rings.get(e.id);if(!ring){ring=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0xff493d,transparent:true,opacity:.6,side:THREE.DoubleSide,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.renderOrder=3;scene.add(ring);rings.set(e.id,ring);}ring.position.set(e.attack.point.x,e.attack.point.y+.035,e.attack.point.z);ring.material.opacity=.35+.35*Math.max(0,Math.min(1,(time-e.attack.started)/(e.attack.at-e.attack.started)));}for(const[id,ring]of rings)if(!seen.has(id)){scene.remove(ring);ring.material.dispose();rings.delete(id);}},dispose(){for(const r of rings.values()){scene.remove(r);r.material.dispose();}rings.clear();geometry.dispose();}};
}
