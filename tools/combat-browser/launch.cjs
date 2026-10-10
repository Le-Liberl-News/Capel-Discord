const http=require('node:http'),{spawn}=require('node:child_process'),path=require('node:path');
const url='http://127.0.0.1:3020';
function open(){console.log(url);spawn('cmd.exe',['/c','start','',url],{windowsHide:true,stdio:'ignore'});}
function start(){const child=spawn(process.execPath,[path.join(__dirname,'server.cjs')],{windowsHide:true,stdio:['inherit','pipe','inherit']});let opened=false;child.stdout.on('data',data=>{process.stdout.write(data);if(!opened&&String(data).includes('Atelier combat')){opened=true;open();}});child.on('exit',code=>process.exitCode=code??0);}
const req=http.get(url,res=>{let text='';res.on('data',chunk=>text+=chunk);res.on('end',()=>{if(text.includes('Atelier combat'))open();else{console.error('Le port 3020 est déjà utilisé par une autre application.');process.exitCode=1;}});});req.setTimeout(2000,()=>req.destroy());req.on('error',start);
