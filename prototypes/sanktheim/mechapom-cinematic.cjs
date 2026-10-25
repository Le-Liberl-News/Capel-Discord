const ease=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
function arrivalPose(m,age,scale=2/3){const size=scale*2/3,height=140*Math.max(0,1-age/8)**2,turn=age<8?0:(age-8)*.3,side=Math.PI/2-(m.heading??0)+.9+turn,r=62*size;return {height,camera:{x:m.x+Math.cos(side)*r,y:m.y+4+ease(turn/1.2)*14,z:m.z+Math.sin(side)*r},aim:{x:m.x,y:m.y+height+9*size,z:m.z}};}
module.exports={arrivalPose};
