const noise=n=>{const v=Math.sin(n*127.1+31.7)*43758.5453;return v-Math.floor(v);};
function roadZ(x){const d=Math.max(0,-x-84),t=Math.max(0,Math.min(1,(d-16)/32));return (7*Math.sin((x+84)/42)+5*Math.sin((x+84)/93))*t*t*(3-2*t);}
const extraTrees=[...Array.from({length:64},(_,i)=>{const x=-80-Math.floor(i/2)*8;return {id:'extension-tree-'+i,x,y:.04,z:roadZ(x)+(i%2?1:-1)*(10+i%4*1.5),height:5.3,radius:.4,wood:10,template:'tree-001'};}),...Array.from({length:64},(_,i)=>({id:'isolated-tree-'+i,x:-85-noise(i+1)*255,y:.04,z:(i%2?1:-1)*(30+noise(i+109)*70),height:4.5+(i%4)*.45,radius:.4,wood:10,template:'tree-001'}))];
// the pomgarous' wood (wildlife.cjs), at the end of the path's north-east branch: thick round their dens, open where
// the branch comes in
const DENS=require('./wildlife.cjs').DENS,WOOD={x:-185,z:-66};
// distance to the branch's last stretch, kept clear
const branch=({x,z})=>{const ax=-160,az=-20,bx=-179,bz=-53,dx=bx-ax,dz=bz-az,k=Math.max(0,Math.min(1,((x-ax)*dx+(z-az)*dz)/(dx*dx+dz*dz)));return Math.hypot(x-ax-dx*k,z-az-dz*k);};
const garouWood=Array.from({length:90},(_,i)=>{const a=noise(i+301)*Math.PI*2,r=6+Math.sqrt(noise(i+401))*20;return {x:WOOD.x+Math.cos(a)*r,z:WOOD.z+Math.sin(a)*r*.85};})
 .filter(t=>DENS.every(([x,z])=>Math.hypot(t.x-x,t.z-z)>4.5)&&Math.hypot(t.x+179,t.z+53)>7&&branch(t)>4&&t.z>-108)
 .slice(0,44).map((t,i)=>({id:'garou-wood-'+i,x:Math.round(t.x*100)/100,y:.04,z:Math.round(t.z*100)/100,height:5+(i%5)*.5,radius:.45,wood:12,template:'tree-001'}));
const quarry=Array.from({length:8},(_,i)=>({id:'quarry-'+i,x:-216-(i%4)*3,y:.04,z:43+Math.floor(i/4)*4,height:1.7,radius:1,wood:0,stone:15}));
module.exports={extraTrees:[...extraTrees,...garouWood],garouWood,quarry,roadZ,MIN_X:-360,MAX_Z:110};
