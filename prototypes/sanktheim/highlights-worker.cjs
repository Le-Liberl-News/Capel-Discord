const {parentPort}=require('node:worker_threads');
const {renderHighlightDirect}=require('./highlights.cjs');
let queue=Promise.resolve();
parentPort.on('message',({id,event})=>{queue=queue.then(async()=>{try{parentPort.postMessage({id,result:await renderHighlightDirect(event)});}catch(error){parentPort.postMessage({id,error:error.message});}});});
