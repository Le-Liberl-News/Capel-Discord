const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),v8=require('node:v8');
function signature(file,code){const dir=path.dirname(file),files=[file,...fs.readdirSync(dir).filter(n=>/\.png$/i.test(n)).map(n=>path.join(dir,n)),...code];return files.map(p=>{const s=fs.statSync(p);return p+':'+s.size+':'+s.mtimeMs;}).join('|');}
function readPrepared(folder,key,stamp){const file=path.join(folder,crypto.createHash('sha256').update(key).digest('hex')+'.bin');try{const value=v8.deserialize(fs.readFileSync(file));return value.stamp===stamp?value.assets:null;}catch{return null;}}
function writePrepared(folder,key,stamp,assets){fs.mkdirSync(folder,{recursive:true});const file=path.join(folder,crypto.createHash('sha256').update(key).digest('hex')+'.bin'),tmp=file+'.'+process.pid+'.tmp';fs.writeFileSync(tmp,v8.serialize({stamp,assets}));fs.renameSync(tmp,file);}
module.exports={signature,readPrepared,writePrepared};
