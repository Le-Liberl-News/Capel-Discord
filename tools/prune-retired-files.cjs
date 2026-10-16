// One-way deployment cleanup, explicitly disabled on Windows developer machines.
const fs=require('node:fs'),path=require('node:path');
function prune(root,list){if(process.platform==='win32')throw Error('Retired-file cleanup runs only on the deployment server.');const base=path.resolve(root);for(const relative of list){const target=path.resolve(base,relative);if(!target.startsWith(base+path.sep))throw Error('Unsafe retired path');fs.rmSync(target,{force:true});}}
if(require.main===module)prune(path.resolve(__dirname,'..'),require('./deployment-retired-files.json'));
module.exports={prune};
