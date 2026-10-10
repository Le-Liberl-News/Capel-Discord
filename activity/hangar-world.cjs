const width=81,height=97,step=.25;
const grid={origin:{x:-10,z:-12},width,height,step,cells:Array(width*height).fill(0),spawn:{x:4,y:0,z:0}};
// Keep walkers outside the full-size ship's footprint.
for(let z=0;z<height;z++)for(let x=0;x<width;x++)if(Math.abs(-10+x*step)<3&&Math.abs(-12+z*step)<5)grid.cells[z*width+x]=null;
module.exports={grid};
