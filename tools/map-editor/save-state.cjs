function savedState(project){
 const used=new Set(project.objects.map(o=>o.asset).filter(Boolean));
 return {objects:project.objects,layout:project.layout,assets:Object.fromEntries([...used].sort().map(id=>[id,project.assets[id]]))};
}
function snapshot(project){return JSON.stringify(savedState(project));}
function payload(project,serialized){return {...project,...JSON.parse(serialized)};}
module.exports={savedState,snapshot,payload};
