const http=require('node:http'),{spawn}=require('node:child_process'),path=require('node:path');
const url='http://127.0.0.1:3030/',noOpen=process.argv.includes('--no-open');
function open(){console.log('Atelier cinématiques prêt : '+url);if(!noOpen){const p=spawn('cmd.exe',['/c','start','',url],{windowsHide:true,stdio:'ignore'});p.on('error',()=>console.log('Ouvrez '+url+' dans votre navigateur.'));}}
function probe(){return new Promise(resolve=>{const req=http.get(url,res=>{let text='';res.on('data',chunk=>{if(text.length<65536)text+=chunk;});res.on('end',()=>resolve(res.statusCode===200&&text.includes('<title>Atelier cinématiques · Capel</title>')?'editor':'other'));res.on('error',()=>resolve('other'));});req.setTimeout(2000,()=>req.destroy());req.on('error',()=>resolve('free'));});}
async function main(){const state=await probe();if(state==='editor'){console.log('L’éditeur est déjà ouvert ; réutilisation.');open();return;}if(state==='other'){console.error('Le port 3030 est occupé par une autre application.');process.exitCode=1;return;}
 const child=spawn(process.execPath,[path.join(__dirname,'server.cjs')],{windowsHide:true,stdio:['inherit','pipe','inherit']});let opened=false;
 child.stdout.on('data',data=>{process.stdout.write(data);if(!opened&&String(data).includes('Atelier cinématiques :')){opened=true;open();}});
 child.on('error',error=>{console.error('Impossible de démarrer l’éditeur : '+error.message);process.exitCode=1;});
 child.on('exit',async code=>{if(code&&!opened&&await probe()==='editor'){open();return;}process.exitCode=code??0;});
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
