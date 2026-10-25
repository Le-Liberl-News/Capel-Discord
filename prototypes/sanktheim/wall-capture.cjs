const INSIDE_X=-7,DURATION=1850;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function createCatch(from,at,floor=.04){const anchor={x:-10,y:15,z:from.z},hold={x:from.x+(anchor.x-from.x)*.15,y:Math.max(from.y+1,16),z:from.z};return {type:'catch',at,from:{...from},hold,to:{x:-62,y:floor,z:from.z+(from.z>0?-3:3)},anchor};}
function catchPoint(c,at){const age=Math.max(0,at-c.at),k=clamp(age/450,0,1);if(age<450)return {x:c.from.x+(c.hold.x-c.from.x)*k,y:c.from.y+(c.hold.y-c.from.y)*k,z:c.from.z};const u=clamp((age-450)/1400,0,1),arc=Math.max(7,15-c.hold.y*.5);return {x:c.hold.x+(c.to.x-c.hold.x)*u,y:c.hold.y+(c.to.y-c.hold.y)*u+Math.sin(u*Math.PI)*arc,z:c.hold.z+(c.to.z-c.hold.z)*u};}
function captureCameraPose(age){const flight=clamp((age-450)/1400,0,1);return {pitch:flight*Math.PI*6,shake:Math.sin(age*.035)*(age<450?.12:.025),flight};}
module.exports={captureCameraPose,INSIDE_X,DURATION,createCatch,catchPoint};
