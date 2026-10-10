const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const os=require('node:os'),{execFile}=require('node:child_process');
const root=__dirname,repo=path.resolve(root,'../..'),cache=process.argv[2]||'E:/dev/sky-activity-tools/atelier-combat',port=Number(process.argv[3]||3020);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png'};
http.createServer((req,res)=>{
 if(req.method==='POST'&&req.url==='/copy-gif'){
  const origin=req.headers.origin;if(origin&&origin!==`http://127.0.0.1:${port}`&&origin!==`http://localhost:${port}`){res.writeHead(403);res.end();return;}
  const chunks=[];let size=0;
  req.on('data',chunk=>{size+=chunk.length;if(size>25*1024*1024)req.destroy();else chunks.push(chunk);});
  req.on('end',()=>{
   const data=Buffer.concat(chunks);res.setHeader('Content-Type','application/json');
   if(!['GIF89a','GIF87a'].includes(data.subarray(0,6).toString())){res.writeHead(400);res.end(JSON.stringify({error:'GIF invalide'}));return;}
   const directory=path.join(os.tmpdir(),'sky-combat-gifs');fs.mkdirSync(directory,{recursive:true});
   const file=path.join(directory,'animation-'+Date.now()+'.gif');fs.writeFileSync(file,data);
   const script=`Add-Type -AssemblyName System.Windows.Forms; $files = New-Object System.Collections.Specialized.StringCollection; [void]$files.Add('${file.replaceAll("'","''")}'); [System.Windows.Forms.Clipboard]::SetFileDropList($files)`;
   execFile('powershell.exe',['-NoProfile','-STA','-Command',script],{windowsHide:true,timeout:15000},error=>{res.writeHead(error?500:200);res.end(JSON.stringify({copied:!error,error:error?'Presse-papiers Windows indisponible':undefined}));});
  });return;
 }
 try{const url=new URL(req.url,'http://localhost'),part=decodeURIComponent(url.pathname);let base=root,relative=part==='/'?'index.html':part.slice(1);if(part.startsWith('/cache/')){base=cache;relative=part.slice(7);}else if(part.startsWith('/assets/')){base=path.join(repo,'activity/assets/sky');relative=part.slice(8);}const file=path.resolve(base,relative);if(!file.startsWith(path.resolve(base)+path.sep)){res.writeHead(403);res.end();return;}const stat=fs.statSync(file);if(!stat.isFile())throw Error();res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});fs.createReadStream(file).pipe(res);}catch{res.writeHead(404);res.end('Introuvable');}}).listen(port,'127.0.0.1',()=>console.log('Atelier combat : http://127.0.0.1:'+port));
