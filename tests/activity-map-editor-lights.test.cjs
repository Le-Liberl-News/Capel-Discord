const test=require('node:test'),assert=require('node:assert/strict');
const {copyObject,pasteObject}=require('../tools/map-editor/object-tools.cjs');
test('duplicated light settings and clipboard stay independent when source indices change',()=>{
 const source={id:'source',name:'Light',asset:null,binding:{kind:'light',index:0},position:[1,-2,3],rotation:[0,0,0],scale:[1,1,1],visible:true};
 const project={objects:[source],assets:{},layout:{lights:[{position:[1,3,2],color:[1,.2,.1],strength:2,radius:7,flicker:true}]}};
 const clipboard=copyObject(project,source),first=pasteObject(project,clipboard,'copy');
 assert.equal(first.binding.index,1);assert.deepEqual(project.layout.lights[1].position,[1.7,3,2]);assert.equal(project.layout.lights[1].id,'copy');
 project.layout.lights[1].color[0]=0;assert.equal(project.layout.lights[0].color[0],1);
 project.layout.lights.splice(0,1);const second=pasteObject(project,clipboard,'again');assert.equal(second.binding.index,1);assert.deepEqual(project.layout.lights[1].color,[1,.2,.1]);assert.equal(project.layout.lights[1].strength,2);
 project.layout.lights=Array(32).fill({});const count=project.objects.length;assert.throws(()=>pasteObject(project,clipboard,'overflow'));assert.equal(project.objects.length,count);
});
