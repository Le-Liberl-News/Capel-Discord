function copyObject(project,object){
 if(object?.binding?.kind==='light'){const light=project.layout.lights[object.binding.index];if(!light)throw Error('Lumière introuvable.');return structuredClone({object,light});}
 if(!object?.asset||object.binding)throw Error('Sélectionnez un asset ou une lumière à copier.');
 return structuredClone({object,asset:project.assets[object.asset]});
}
function pasteObject(project,clipboard,id){
 if(!clipboard)throw Error('Copiez un asset avec Ctrl+C.');
 const o=structuredClone(clipboard.object);o.id=id;o.name+=' copie';o.position[0]+=.7;
 if(clipboard.light){if(project.layout.lights.length>=32)throw Error('Maximum 32 lumières par étage.');const light=structuredClone(clipboard.light);light.id=id;light.name=o.name;light.position=[o.position[0],o.position[2],-o.position[1]];o.binding={kind:'light',index:project.layout.lights.length};project.layout.lights.push(light);project.objects.push(o);return o;}
 project.assets[o.asset]??=structuredClone(clipboard.asset);project.objects.push(o);return o;
}
function platformDefinition(o){
 if(!o.motion)return null;
 const [x,y,z]=o.position,[dx,dy]=o.motion.offset;
 return {id:'editor:'+o.id,from:{x,z:-y},to:{x:x+dx,z:-y-dy},y:z,width:o.motion.width,speed:o.motion.speed,dwell:o.motion.dwell,phase:0};
}
module.exports={copyObject,pasteObject,platformDefinition};
