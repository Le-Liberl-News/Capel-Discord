const ropes=require('./ladders.json');
const motion=require('./ladder-motion.cjs');
// Catch only while airborne. Persistent climb paths stay in native map coordinates.
function catchRope(p,at,scale=1){
 if(!p.jump||p.pomControlled||p.hp<=0||p.climb||at<(p.ladderCooldown??0))return false;
 const x=p.x/scale,y=p.y/scale,z=p.z/scale;
 const l=ropes.find(l=>Math.hypot(x-l.bottom.x,z-l.bottom.z)<.95&&y+.9>=l.bottom.y&&y<l.top.y);
 if(!l)return false;
 const from={...l.bottom},to={...l.landing},points=[from,{...l.top},{...l.across},to],total=require('./ladder-control.cjs').length({points});
 p.climb={rope:true,controlled:true,progress:Math.max(0,Math.min(.96,(y-l.bottom.y)/total)),rate:0,updatedAt:at,at,from,to,points};p.jump=null;p.falling=false;p.fallVelocity=0;p.moving=false;
 const pos=motion.point(p.climb,at);p.x=pos.x*scale;p.y=pos.y*scale;p.z=pos.z*scale;return true;
}
module.exports={catchRope};
