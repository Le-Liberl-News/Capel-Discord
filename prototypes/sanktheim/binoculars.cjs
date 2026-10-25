const SITE={x:-32.75,y:13.5,z:-11.5};
function target(state,scale=2/3){const m=state.mechapom;if(!m)return {x:-260*scale,y:9*scale,z:0};const age=Math.max(0,(state.at-m.since)/1000),height=m.grounded?140*Math.max(0,1-age/8)**2:140*Math.min(1,age/12)**2;return {x:m.x,y:m.y+height+9*scale,z:m.z};}
function canUse(p,site,scale=2/3){return !!p&&p.hp>0&&!p.pomControlled&&!p.vehicleControl&&!p.lynxControl&&!p.climb&&!p.jump&&!p.turretControl&&Math.hypot(p.x-site.x,p.y-site.y,p.z-site.z)<4.5*scale;}
module.exports={SITE,target,canUse};
