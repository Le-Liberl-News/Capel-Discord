// Centres of the ten dining tables, measured on the native T1131 mesh.
export const TABLES=[[8,-1],[-10,-1],[10,4.2],[4,6],[-6,6],[-12,4],[8,10],[2,11],[-10,10],[-4,11]];
export async function createTavernTables(THREE,model,collision,assets){
 const group=new THREE.Group(),lights=[],flames=[];
 const glass=new THREE.MeshBasicMaterial({color:0xe7e6ca,transparent:true,opacity:.5,depthWrite:false});
 const wine=new THREE.MeshBasicMaterial({color:0x711629}),wax=new THREE.MeshBasicMaterial({color:0xefdab5}),brass=new THREE.MeshBasicMaterial({color:0x9b7747});
 const fire=await new THREE.TextureLoader().loadAsync(new URL('effects/fire-frames.png',assets).href);fire.colorSpace=THREE.SRGBColorSpace;
 for(const [i,[x,z]]of TABLES.entries()){
  const y=collision.floor(x,z,2.65);if(y===null)continue;
  const table=new THREE.Group();table.position.set(x,y+.012,z);group.add(table);
  function mesh(geometry,material,px,py,pz){const m=new THREE.Mesh(geometry,material);m.raycast=()=>{};m.position.set(px,py,pz);table.add(m);return m;}
  mesh(new THREE.CylinderGeometry(.09,.02,.15,16,1,true),glass,.35,.22,.12);
  mesh(new THREE.CylinderGeometry(.065,.035,.075,16),wine,.35,.205,.12);
  mesh(new THREE.CylinderGeometry(.012,.012,.12,8),glass,.35,.09,.12);
  mesh(new THREE.CylinderGeometry(.07,.07,.012,16),glass,.35,.012,.12);
  mesh(new THREE.CylinderGeometry(.09,.12,.035,12),brass,-.25,.02,-.1);
  mesh(new THREE.CylinderGeometry(.045,.045,.25,12),wax,-.25,.155,-.1);
  const map=fire.clone();map.repeat.set(.25,1);const flame=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));flame.raycast=()=>{};flame.position.set(-.25,.32,-.1);flame.scale.set(.1,.16,1);table.add(flame);flames.push(flame);
  lights.push({id:'candle-'+i,position:[x-.25,y+.32,z-.1],color:[1,.58,.22],radius:4,strength:1.5});
 }
 model.add(group);model.updateMatrixWorld(true);
 return {lights,update(time){for(const [i,f]of flames.entries()){f.material.map.offset.x=(Math.floor(time/90+i)%4)/4;f.scale.y=.16*(.9+.1*Math.sin(time*.019+i));}},dispose(){group.removeFromParent();group.traverse(o=>{o.geometry?.dispose();});for(const f of flames){f.material.map.dispose();f.material.dispose();}for(const m of [glass,wine,wax,brass])m.dispose();fire.dispose();}};
}
