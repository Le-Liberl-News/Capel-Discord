const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
function inspectPng(data){
 if(!Buffer.isBuffer(data)||data.length<33||data.length>16*1024*1024||!data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||data.toString('ascii',12,16)!=='IHDR')throw Error('Choisissez un PNG valide de 16 Mo maximum.');
 const width=data.readUInt32BE(16),height=data.readUInt32BE(20);if(!width||!height||width>8192||height>8192)throw Error('Dimensions PNG : 1 à 8192 pixels par côté.');
 let image=false,end=false;for(let offset=8;offset+12<=data.length;){const length=data.readUInt32BE(offset),tag=data.toString('ascii',offset+4,offset+8);if(offset+12+length>data.length)throw Error('PNG tronqué.');if(tag==='IDAT'&&length)image=true;if(tag==='IEND'){end=true;break;}offset+=12+length;}if(!image||!end)throw Error('Données PNG incomplètes.');return {width,height};
}
async function importPng(input,cache){
 if(typeof input.data!=='string'||!input.data.startsWith('data:image/png;base64,'))throw Error('Format PNG attendu.');
 const bytes=Buffer.from(input.data.slice(22),'base64'),size=inspectPng(bytes),hash=crypto.createHash('sha256').update(bytes).digest('hex').slice(0,20),dir=path.join(cache,'library-textures');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,hash+'.png'),bytes);
 const {pngQuad}=await import('./custom-assets.mjs'),label=String(input.name??'Image PNG').split(/[\\/]/).at(-1).slice(0,120),asset=pngQuad('png-'+hash,label,'/assets/sky/map-library/'+hash+'.png',2,2*size.height/size.width),file=path.join(cache,'custom-assets.json'),all=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{};all[asset.id]=asset;fs.writeFileSync(file,JSON.stringify(all));return {asset,...size};
}
module.exports={inspectPng,importPng};
