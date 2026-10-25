const SITE={x:-32.75,y:13.5,z:-11.5};
function canUse(p,site,scale=2/3){return !!p&&p.hp>0&&!p.pomControlled&&!p.vehicleControl&&!p.lynxControl&&!p.climb&&!p.jump&&!p.turretControl&&Math.hypot(p.x-site.x,p.y-site.y,p.z-site.z)<4.5*scale;}
module.exports={SITE,canUse};
