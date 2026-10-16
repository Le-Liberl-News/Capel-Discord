const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const editor=require('../tools/map-editor/project.cjs');
test('concave drawn floors preserve their outline in triangles and walkable navigation',async()=>{
 const {polygonFloor}=await import('../tools/map-editor/custom-assets.mjs');
 const a=polygonFloor('floor-l','Salle en L',[[0,0],[6,0],[6,-2],[2,-2],[2,-6],[0,-6]],'/assets/sky/tower1/floor.png',2),v=a.parts[0].positions;let area=0;for(let i=0;i<v.length;i+=9)area+=Math.abs((v[i+3]-v[i])*(v[i+7]-v[i+1])-(v[i+6]-v[i])*(v[i+4]-v[i+1]))/2;assert.equal(area,20);
 const p={version:1,map:'custom',assets:{'floor-l':a},layout:{start:{x:1,y:0,z:1},exit:{x:1,y:0,z:5}},objects:[{id:'room-l',name:'Salle en L',asset:a.id,role:'floor',position:[0,0,0],rotation:[0,0,0],scale:[1,1,1],visible:true}]},r=editor.build(p);assert.deepEqual(r.warnings,[]);const nav=r.navigation,x=Math.round((4-nav.origin.x)/nav.step),z=Math.round((4-nav.origin.z)/nav.step);assert.equal(nav.cells[z*nav.width+x],null);assert.ok(nav.cells.filter(x=>x!==null).every(x=>x===0));
 assert.throws(()=>polygonFloor('bad','Croisé',[[0,0],[4,-4],[0,-4],[4,0]],a.parts[0].texture),/croisent/);
 const rectangle=polygonFloor('rect','Salle rectangulaire',[[0,0],[10,0],[10,-8],[0,-8]],a.parts[0].texture);assert.equal(rectangle.parts[0].positions.length,18);
});
test('PNG imports retain original bytes, aspect ratio, transparency and a reusable asset',async()=>{
 const {inspectPng,importPng}=require('../tools/map-editor/png-import.cjs'),data=fs.readFileSync('activity/assets/sky/candlestick.png'),size=inspectPng(data),cache=fs.mkdtempSync(path.join(os.tmpdir(),'capel-png-test-'));
 const {asset}=await importPng({name:'Ma bougie.png',data:'data:image/png;base64,'+data.toString('base64')},cache);assert.equal(asset.parts[0].material.alphaMode,'BLEND');assert.equal(asset.parts[0].positions[8]/2,size.height/size.width);assert.equal(asset.role,'decoration');assert.deepEqual(fs.readFileSync(path.join(cache,'library-textures',path.basename(asset.parts[0].texture))),data);assert.equal(JSON.parse(fs.readFileSync(path.join(cache,'custom-assets.json'),'utf8'))[asset.id].label,'Ma bougie.png');assert.throws(()=>inspectPng(Buffer.from('not an image')),/PNG valide/);
});
