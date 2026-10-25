const {install}=require('../../utils/runtimeDiagnostics');
const monitor=install({force:true});
const {spawnSync}=require('node:child_process');
const assert=require('node:assert/strict'),{EventEmitter}=require('node:events'),{promisify}=require('node:util');
const emitter=new EventEmitter();let count=0;const listener=()=>count++;
emitter.on('messageCreate',listener);assert.deepEqual(emitter.listeners('messageCreate'),[listener]);emitter.off('messageCreate',listener);emitter.emit('messageCreate');assert.equal(count,0);
emitter.once('messageCreate',listener);assert.deepEqual(emitter.listeners('messageCreate'),[listener]);emitter.emit('messageCreate');emitter.emit('messageCreate');assert.equal(count,1);
assert.ok(typeof global.setTimeout[promisify.custom]==='function');
assert.ok(typeof require('node:child_process').exec[promisify.custom]==='function');

setTimeout(async()=>{
 const child=spawnSync(process.execPath,['-e','void 0','sensitive-argument-must-not-be-recorded']);
 if(child.status!==0)throw Error('child failed');
 await new Promise(resolve=>setTimeout(resolve,15));
 monitor.flush(true);
},5);
