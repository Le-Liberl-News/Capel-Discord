const path=require('node:path'),esbuild=require('esbuild');const root=path.resolve(__dirname,'..');
esbuild.buildSync({entryPoints:[path.join(root,'craft-gif-worker.mjs')],bundle:true,format:'iife',minify:true,legalComments:'eof',outfile:path.join(root,'assets/sky/combat/gif-worker.js')});
esbuild.buildSync({entryPoints:[path.join(root,'main.js')],bundle:true,format:'esm',minify:true,legalComments:'eof',define:{__ACTIVITY_PREVIEW__:'false'},outfile:path.join(root,'bundle.js')});
