const CHARACTER='SiegeGuard';
const basic={name:'Tir de fusil',key:'f',damage:18,cooldown:2400,windup:300,duration:800,range:12,radius:.7,projectile:true,projectileSpeed:20,shotVisual:'bullet',mobileProjectile:true,lockMovement:false};
const banks=Object.fromEntries([0,1,2,4].map(bank=>[bank,{texture:`sanktheim/props/guards/${bank}.png`,columns:8,rows:8,frameWidth:256,frameHeight:256,frames:64,directions:8,height:5.12,bodyHeight:1.7,centerY:1.04,idle:[0,1,2,3,4,5,6,7],run:[0,1,2,3,4,5,6,7],fps:8}]));
const metadata={character:CHARACTER,banks,sequences:{basic:Array.from({length:8},(_,pose)=>({bank:2,pose,ms:100}))},actions:{basic}};
banks[4]={...banks[4],rows:4,frames:32,run:[0,1,2,3],idle:[0]};
module.exports={CHARACTER,basic,metadata};
