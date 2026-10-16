const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
function migrate(project,{localAssets,textureRoot}){
 project=structuredClone(project);project.map='custom';
 for(const asset of Object.values(project.assets??{}))for(const part of asset.parts??[]){
  const prefix='/assets/sky/',relative=part.texture?.slice(prefix.length);
  if(!relative||!part.texture.startsWith(prefix)||!relative.startsWith('hallow'))continue;
  const source=path.resolve(localAssets,relative);if(!source.startsWith(path.resolve(localAssets)+path.sep)||!fs.existsSync(source))continue;
  const bytes=fs.readFileSync(source),name=crypto.createHash('sha256').update(bytes).digest('hex').slice(0,20)+'.png';fs.mkdirSync(textureRoot,{recursive:true});const target=path.join(textureRoot,name);if(!fs.existsSync(target))fs.writeFileSync(target,bytes);part.texture=prefix+'map-library/'+name;
 }
 return project;
}
module.exports={migrate};
