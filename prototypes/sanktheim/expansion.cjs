const noise=n=>{const v=Math.sin(n*127.1+31.7)*43758.5453;return v-Math.floor(v);};
function roadZ(x){return 7*Math.sin((x+68)/42)+5*Math.sin((x+68)/93);}
const extraTrees=[...Array.from({length:64},(_,i)=>{const x=-80-Math.floor(i/2)*8;return {id:'extension-tree-'+i,x,y:.04,z:roadZ(x)+(i%2?1:-1)*(10+i%4*1.5),height:5.3,radius:.4,wood:10,template:'tree-001'};}),...Array.from({length:64},(_,i)=>({id:'isolated-tree-'+i,x:-85-noise(i+1)*255,y:.04,z:(i%2?1:-1)*(30+noise(i+109)*70),height:4.5+(i%4)*.45,radius:.4,wood:10,template:'tree-001'}))];
const quarry=Array.from({length:8},(_,i)=>({id:'quarry-'+i,x:-216-(i%4)*3,y:.04,z:43+Math.floor(i/4)*4,height:1.7,radius:1,wood:0,stone:15}));
module.exports={extraTrees,quarry,roadZ,MIN_X:-360,MAX_Z:110};
