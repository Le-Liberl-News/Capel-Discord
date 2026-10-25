const CHARACTER='SiegeGuard';
const basic={name:'Tir de fusil',key:'f',damage:10,cooldown:300,windup:0,duration:200,range:35,radius:.7,projectile:true,projectileSpeed:45,shotVisual:'bullet',fps:true,headshotMultiplier:2,lockMovement:false,hitEffect:'SC/ms10920._ef',noTempo:true};
const craft={name:'Grenade de dégagement',key:'g',special:'guardGrenade',fps:true,projectile:true,projectileSpeed:22,range:35,radius:4.5,damage:35,stunDuration:2000,knockback:5,windup:180,duration:500,cooldown:10000,lockMovement:false,noTempo:true};
const banks=Object.fromEntries([0,1,2,4].map(bank=>[bank,{texture:`sanktheim/props/guards/${bank}.png`,columns:8,rows:8,frameWidth:256,frameHeight:256,frames:64,directions:8,height:5.12,bodyHeight:1.7,centerY:1.04,idle:[0,1,2,3,4,5,6,7],run:[0,1,2,3,4,5,6,7],fps:8}]));
const metadata={character:CHARACTER,banks,sequences:{craft:[{bank:0,pose:0,ms:180},{bank:0,pose:1,ms:200},{bank:0,pose:0,ms:120}],basic:Array.from({length:8},(_,pose)=>({bank:2,pose,ms:25}))},actions:{basic,craft}};
banks[4]={...banks[4],rows:4,frames:32,run:[0,1,2,3],idle:[0]};
module.exports={CHARACTER,basic,craft,metadata};
