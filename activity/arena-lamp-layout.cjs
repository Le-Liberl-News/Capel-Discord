const ARENA_LAMPS={
 arena:[
 {position:[-10.9,2.2,-16],wall:true},{position:[8.9,2.2,-16],wall:true},{position:[-10.9,2.2,-3],wall:true},{position:[8.9,2.2,-3],wall:true},{position:[-1,2.2,-20.7],wall:true},{position:[-1,2.2,7.7],wall:true},
 {position:[-6,3.8,-8],fill:true},{position:[4,3.8,-8],fill:true}],
 axis:[{position:[-17,2,-14]},{position:[17,2,-14]},{position:[-17,2,14]},{position:[17,2,14]},{position:[-5,4,0],fill:true},{position:[5,4,0],fill:true}],
 gehenna:[{position:[-5,-1,-12],fill:true},{position:[5,-1,12],fill:true},{position:[-8,0,34],fill:true},{position:[8,1,60],fill:true}]
};
for(const lamps of Object.values(ARENA_LAMPS))for(const lamp of lamps)Object.assign(lamp,{color:lamp.fill?[1,.69,.4]:[1,.38,.09],radius:lamp.fill?17:11,strength:lamp.fill?.6:1.15,flicker:!lamp.fill});
module.exports={ARENA_LAMPS};
