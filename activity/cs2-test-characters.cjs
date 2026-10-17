// Combat-only prototypes. This module never participates in the Discord character draw.
const TEST_CHARACTERS=['Rean','Altina'];
const COMPANION='Claiomh Solais';
function protectWithGuardian(owner,guardian){Object.defineProperty(owner,'_guardian',{value:guardian,writable:true,configurable:true,enumerable:false});}
function livingGuardian(owner){const p=owner?._guardian;return !owner?.altinaSwordUntil&&owner?.hp>0&&p?.hp>0&&p.guardianFor===owner.id&&Math.hypot(owner.x-p.x,owner.z-p.z)<=3.5&&Math.abs((owner.y??0)-(p.y??0))<1.5?p:null;}
module.exports={TEST_CHARACTERS,COMPANION,protectWithGuardian,livingGuardian};
