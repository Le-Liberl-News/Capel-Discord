const BEER={x:2.2,y:2.352426565763779,z:11.4};
function beerNearby(p){return !!p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z)&&Math.hypot(p.x-BEER.x,p.z-BEER.z)<=1.8&&Math.abs(p.y-BEER.y)<=1.2;}
module.exports={BEER,beerNearby};
