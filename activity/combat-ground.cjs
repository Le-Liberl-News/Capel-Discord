// Small stair/curb transitions remain a continuous combat surface.
const COMBAT_STEP_HEIGHT=.5;
function smallStep(a,b){return Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=COMBAT_STEP_HEIGHT+1e-4;}
function stepAimPoint(point,grid){
 if(!grid)return null;const x=Math.round((point.x-grid.origin.x)/grid.step),z=Math.round((point.z-grid.origin.z)/grid.step);
 if(x<0||z<0||x>=grid.width||z>=grid.height)return null;const y=grid.cells[z*grid.width+x];
 return smallStep(y,point.y)?{x:point.x,y,z:point.z}:null;
}
function lineMarkerHeight(origin,target){return (smallStep(origin.y,target.y)?Math.max(origin.y,target.y):(origin.y+target.y)/2)+.07;}
module.exports={COMBAT_STEP_HEIGHT,smallStep,stepAimPoint,lineMarkerHeight};
