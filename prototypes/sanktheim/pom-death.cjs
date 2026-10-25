const clamp=n=>Math.max(0,Math.min(1,n));
function deathPose(age,previous=1){const t=clamp(age/900),fall=t*t*(3-2*t);return {progress:fall,hop:Math.sin(Math.PI*t)*.2,hp:Math.max(0,previous)*(1-clamp(age/650)),flash:Math.max(0,1-age/180)};}
module.exports={deathPose};
