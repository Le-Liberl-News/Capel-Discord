const test=require('node:test'),assert=require('node:assert/strict');
const THREE=require('three');
test('rain stays at the camera and splashes only on real floors with bounded raycasts',async()=>{
 const {createArenaRain}=await import('../activity/arena-rain.mjs');const scene=new THREE.Scene();let calls=0;
 const rain=createArenaRain(THREE,scene,{document:null,floor:(x)=>{calls++;return x>0?2:null;}}),camera=new THREE.PerspectiveCamera(50,1.5,.1,1000);
 assert.equal(rain.state().rainDrops,0);rain.setEnabled(true);rain.update(1000,camera,{x:0,y:0,z:0});assert.equal(calls,96);assert.ok(rain.state().rainSplashes>0&&rain.state().rainSplashes<96);
 const [streaks,splashes]=scene.children;const first=Array.from(streaks.geometry.attributes.position.array);camera.position.set(300,500,600);camera.zoom=.05;camera.updateProjectionMatrix();rain.update(1000,camera,{x:0,y:0,z:0});assert.deepEqual(Array.from(streaks.geometry.attributes.position.array),first);assert.equal(calls,96);
 const matrix=new THREE.Matrix4();for(let i=0;i<96;i++){splashes.getMatrixAt(i,matrix);if(matrix.elements[0]!==0)assert.ok(Math.abs(matrix.elements[13]-2.025)<.001);else assert.equal(matrix.elements[13],-10000);}
 assert.ok(streaks.userData.bloomExclude&&splashes.userData.noXRay);rain.update(2300,camera,{x:0,y:0,z:0});assert.equal(calls,192);rain.setEnabled(false);rain.update(4000,camera);assert.equal(calls,192);assert.equal(rain.state().rainSplashes,0);assert.ok(scene.children.every(o=>!o.visible));rain.dispose();assert.equal(scene.children.length,0);
});
test('lens droplets never capture input and are removed on disposal',async()=>{
 const {createArenaRain}=await import('../activity/arena-rain.mjs');const make=()=>({style:{},children:[],setAttribute(k,v){this[k]=v;},append(e){this.children.push(e);},remove(){this.removed=true;}}),body=make();const rain=createArenaRain(THREE,new THREE.Scene(),{document:{body,createElement:make}});const lens=body.children[0];assert.equal(lens['aria-hidden'],'true');assert.match(lens.style.cssText,/pointer-events:none/);rain.setEnabled(true);assert.equal(lens.style.display,'block');assert.equal(rain.state().lensDrops,9);rain.setEnabled(false);assert.equal(lens.style.display,'none');rain.dispose();assert.ok(lens.removed);
});
