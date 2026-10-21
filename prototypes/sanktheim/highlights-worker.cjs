const {parentPort}=require('node:worker_threads');
const {renderHighlightDirect}=require('./highlights.cjs');
parentPort.on('message',async({id,event})=>{try{parentPort.postMessage({id,result:await renderHighlightDirect(event)});}catch(error){parentPort.postMessage({id,error:error.message});}});
