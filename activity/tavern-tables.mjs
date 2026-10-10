// Centres of the ten dining tables, measured on the native T1131 mesh.
export const TABLES=[[8,-1],[-10,-1],[10,4.2],[4,6],[-6,6],[-12,4],[8,10],[2,11],[-10,10],[-4,11]];
export async function createTavernTables(THREE,model,collision,assets){
 const group=new THREE.Group(),lights=[],flames=[],objects=[];
 const loader=new THREE.TextureLoader();
 const [wine,candle,fire]=await Promise.all(['wine-glass.png','candlestick.png','effects/fire-frames.png'].map(n=>loader.loadAsync(new URL(n+'?v=native-tables-2',assets).href)));
 for(const map of [wine,candle,fire]){map.colorSpace=THREE.SRGBColorSpace;map.magFilter=THREE.NearestFilter;}
 const materials=[];
 for(const [i,[x,z]]of TABLES.entries()){
  const y=collision.floor(x,z,2.65);if(y===null)continue;
  const table=new THREE.Group();table.position.set(x,y+.012,z);group.add(table);
  function nativeObject(map,width,height,x,z){const material=new THREE.MeshBasicMaterial({map,transparent:true,alphaTest:.1,depthWrite:true,side:THREE.DoubleSide});materials.push(material);const geometry=new THREE.PlaneGeometry(width,height);geometry.translate(0,height/2,0);const sprite=new THREE.Mesh(geometry,material);objects.push(sprite);sprite.position.set(x,0,z);sprite.raycast=()=>{};table.add(sprite);}
  nativeObject(wine,.12,.35,.35,.12);
  nativeObject(candle,.15,.38,-.25,-.1);
  const map=fire.clone();map.repeat.set(.25,1);const flame=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));flame.raycast=()=>{};flame.position.set(-.25,.4,-.1);flame.scale.set(.1,.16,1);table.add(flame);flames.push(flame);
  lights.push({id:'candle-'+i,position:[x-.25,y+.4,z-.1],color:[1,.58,.22],radius:4,strength:1.5});
 }
 model.add(group);model.updateMatrixWorld(true);
 return {lights,update(time,camera){if(camera)for(const o of objects)o.rotation.y=Math.atan2(camera.matrixWorld.elements[8],camera.matrixWorld.elements[10]);for(const [i,f]of flames.entries()){f.material.map.offset.x=(Math.floor(time/90+i)%4)/4;f.scale.y=.16*(.9+.1*Math.sin(time*.019+i));}},dispose(){group.removeFromParent();group.traverse(o=>{o.geometry?.dispose();});for(const f of flames){f.material.map.dispose();f.material.dispose();}for(const m of materials)m.dispose();wine.dispose();candle.dispose();fire.dispose();}};
}
