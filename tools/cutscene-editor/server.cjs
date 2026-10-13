const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),assets=path.join(root,'activity/assets/sky'),projects='E:/dev/sky-activity-tools/cutscenes';
fs.mkdirSync(projects,{recursive:true});require('esbuild').buildSync({entryPoints:[path.join(__dirname,'preview.mjs')],bundle:true,format:'esm',outfile:path.join(__dirname,'preview-bundle.js')});
const safeName=name=>{if(!/^[a-zA-Z0-9_-]{1,64}$/.test(name))throw Error('Nom : lettres, chiffres, tirets uniquement');return path.join(projects,name+'.sky');};
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.mjs':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.gltf':'model/gltf+json','.ttf':'font/ttf','.sky':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://127.0.0.1:3030');res.setHeader('Cache-Control','no-store');
 const json=data=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));};
 if(url.pathname==='/api/maps')return json(['anterose',...fs.readdirSync(assets).filter(name=>fs.existsSync(path.join(assets,name,'navigation.json')))].map(name=>({name})));
 if(url.pathname==='/api/projects')return json(fs.readdirSync(projects).filter(n=>n.endsWith('.sky')).map(n=>n.slice(0,-4)));
 if(url.pathname==='/api/project'){
  const file=safeName(url.searchParams.get('name')||'ray');
  if(req.method==='POST'){if(req.headers.origin&&req.headers.origin!=='http://127.0.0.1:3030')throw Error('Origine refusée');let body='';for await(const chunk of req){body+=chunk;if(body.length>1024*1024)throw Error('Projet trop volumineux');}const {script}=JSON.parse(body);require('../../activity/scene-script.cjs').compileScene(script);fs.writeFileSync(file,script,'utf8');return json({saved:file});}
  return json({script:fs.existsSync(file)?fs.readFileSync(file,'utf8'):fs.readFileSync(path.join(assets,'halloween/ray.sky'),'utf8')});
 }
 const base=url.pathname.startsWith('/assets/sky/')?assets:__dirname,rel=url.pathname.startsWith('/assets/sky/')?url.pathname.slice(12):url.pathname==='/'?'index.html':url.pathname.slice(1),file=path.resolve(base,decodeURIComponent(rel));if(!file.startsWith(base+path.sep))throw Error('Chemin refusé');res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
 }catch(error){res.statusCode=400;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({error:error.message}));}});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?'L’éditeur est déjà ouvert sur http://127.0.0.1:3030. Utilisez Lancer.cmd pour le retrouver.':error.message);process.exitCode=1;});
server.listen(3030,'127.0.0.1',()=>console.log('Atelier cinématiques : http://127.0.0.1:3030'));
