const CAPACITY=3000,RELOAD=4000,INTERVAL=100,DAMAGE=12;
function advanceGun(v,time,elapsed,firing){
 if(v.gunRemaining==null){v.gunRemaining=CAPACITY;v.nextShot=null;v.reloadUntil=0;}let start=time-Math.max(0,elapsed);
 if(v.reloadUntil){if(time<v.reloadUntil)return [];start=Math.max(start,v.reloadUntil);v.reloadUntil=0;v.gunRemaining=CAPACITY;v.nextShot=start;}
 if(!firing||time<=start)return [];
 const end=Math.min(time,start+v.gunRemaining),emptyAt=start+v.gunRemaining,shots=[];
 v.nextShot=Math.max(v.nextShot??start,start);
 while(v.nextShot<end&&v.nextShot<emptyAt){shots.push(v.nextShot);v.nextShot+=INTERVAL;}
 v.gunRemaining=Math.max(0,v.gunRemaining-(end-start));
 if(v.gunRemaining===0)v.reloadUntil=end+RELOAD;
 return shots;
}
module.exports={advanceGun,CAPACITY,RELOAD,INTERVAL,DAMAGE};
