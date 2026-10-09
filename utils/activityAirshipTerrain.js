const fs=require('node:fs'),path=require('node:path');
function loadAirshipTerrain(folder){const meta=JSON.parse(fs.readFileSync(path.join(folder,'flight-ground.json'),'utf8')),bytes=fs.readFileSync(path.join(folder,'flight-ground.bin')),config=JSON.parse(fs.readFileSync(path.join(folder,'airship.json'),'utf8'));
 if(bytes.length!==meta.width*meta.height*4)throw Error('Invalid Liberl flight terrain');
 return {config,ground:require('../activity/airship-physics.cjs').groundField(meta,new Float32Array(bytes.buffer,bytes.byteOffset,bytes.length/4))};
}
module.exports={loadAirshipTerrain};
