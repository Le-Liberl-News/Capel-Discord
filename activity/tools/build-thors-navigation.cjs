const fs=require('node:fs'),path=require('node:path'),{createActivityGeometry}=require('../../utils/activityGeometry');
const dir=path.resolve(__dirname,'../assets/sky/thors'),source=JSON.parse(fs.readFileSync(dir+'/source.json')),bounds=source.playableBounds,geometry=createActivityGeometry(JSON.parse(fs.readFileSync(dir+'/anterose.gltf')));
const step=.25,grid={origin:{x:bounds.minX,z:bounds.minZ},step,width:Math.round((bounds.maxX-bounds.minX)/step)+1,height:Math.round((bounds.maxZ-bounds.minZ)/step)+1,cells:[],spawn:{...source.spawn,y:0}};
for(let z=0;z<grid.height;z++)for(let x=0;x<grid.width;x++){const y=geometry.floor(grid.origin.x+x*step,grid.origin.z+z*step,2);grid.cells.push(Number.isFinite(y)&&Math.abs(y)<1?Math.round(y*1000)/1000:null);}
grid.spawn.y=geometry.floor(grid.spawn.x,grid.spawn.z,2);if(!Number.isFinite(grid.spawn.y))throw Error('Thors spawn has no native floor');
for(const file of ['navigation.json','spectator-navigation.json'])fs.writeFileSync(dir+'/'+file,JSON.stringify(grid));console.log('navigation',grid.spawn,grid.width,grid.height,grid.cells.filter(x=>x!==null).length);
