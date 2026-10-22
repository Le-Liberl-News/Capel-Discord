function pomSpawn(p){return {x:-75,y:p.flying?2.7:.04,z:0,onWall:false,escaped:false,waitingWave:false,jump:null,climb:null,falling:false,fallVelocity:0};}
function defenderSpawn(){return {x:-23,y:11.75,z:0,onWall:true,jump:null,climb:null,falling:false,fallVelocity:0};}
module.exports={pomSpawn,defenderSpawn};
