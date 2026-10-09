const path=require('node:path'),esbuild=require('esbuild');const root=path.resolve(__dirname,'..');
esbuild.buildSync({entryPoints:[path.join(root,'craft-gif-worker.mjs')],bundle:true,format:'iife',minify:true,legalComments:'eof',outfile:path.join(root,'assets/sky/combat/gif-worker.js')});
esbuild.buildSync({entryPoints:[path.join(root,'main.js')],bundle:true,format:'esm',minify:true,legalComments:'eof',define:{__ACTIVITY_PREVIEW__:'false'},outfile:path.join(root,'bundle.js')});

esbuild.buildSync({entryPoints:[path.join(root,"liberl-viewer.mjs")],bundle:true,format:"esm",minify:true,legalComments:"eof",define:{__ACTIVITY_PREVIEW__:"false"},outfile:path.join(root,"assets/sky/liberl/viewer.js")});

{const fs=require('node:fs'),crypto=require('node:crypto'),folder=path.join(root,'assets/sky/liberl'),revision=crypto.createHash('sha256').update(fs.readFileSync(path.join(folder,'viewer.js'))).digest('hex').slice(0,12),page=path.join(folder,'viewer.html');fs.writeFileSync(page,fs.readFileSync(page,'utf8').replace(/src="viewer\.js(?:\?v=[a-f0-9]+)?"/,`src="viewer.js?v=${revision}"`));}
