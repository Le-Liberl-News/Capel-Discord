const fs=require('node:fs'),path=require('node:path'),{validate}=require('./project.cjs');
function filename(directory,name){if(!/^[a-zA-Z0-9_-]{1,64}$/.test(name??''))throw Error('Nom de projet invalide');return path.join(directory,name+'.json');}
function read(directory,name){const file=filename(directory,name);return fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{};}
function add(directory,name,asset){
 if(!asset?.id||typeof asset.id!=='string'||asset.id.length>250||!asset.label?.trim())throw Error('Asset nommé attendu');
 validate({version:1,map:'custom',assets:{[asset.id]:asset},objects:[]});
 const file=filename(directory,name),palette=read(directory,name);palette[asset.id]=structuredClone(asset);
 fs.mkdirSync(directory,{recursive:true});const temporary=file+'.tmp';fs.writeFileSync(temporary,JSON.stringify(palette));fs.renameSync(temporary,file);return palette;
}
module.exports={read,add};
