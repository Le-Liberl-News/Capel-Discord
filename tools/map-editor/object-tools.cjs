function copyObject(project,object){
 if(!object?.asset||object.binding)throw Error('Sélectionnez un asset à copier.');
 return structuredClone({object,asset:project.assets[object.asset]});
}
function pasteObject(project,clipboard,id){
 if(!clipboard)throw Error('Copiez un asset avec Ctrl+C.');
 const o=structuredClone(clipboard.object);o.id=id;o.name+=' copie';o.position[0]+=.7;
 project.assets[o.asset]??=structuredClone(clipboard.asset);project.objects.push(o);return o;
}
function platformDefinition(o){
 if(!o.motion)return null;
 const [x,y,z]=o.position,[dx,dy]=o.motion.offset;
 return {id:'editor:'+o.id,from:{x,z:-y},to:{x:x+dx,z:-y-dy},y:z,width:o.motion.width,speed:o.motion.speed,dwell:o.motion.dwell,phase:0};
}
module.exports={copyObject,pasteObject,platformDefinition};
