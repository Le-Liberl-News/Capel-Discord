const DT=1/60,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const add=(a,b)=>({x:a.x+b.x,y:a.y+b.y,z:a.z+b.z}),mul=(a,n)=>({x:a.x*n,y:a.y*n,z:a.z*n});
const dot=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z;
const length=a=>Math.hypot(a.x,a.y,a.z),unit=a=>mul(a,1/(length(a)||1));
function product(a,b){return {x:a.w*b.x+a.x*b.w+a.y*b.z-a.z*b.y,y:a.w*b.y-a.x*b.z+a.y*b.w+a.z*b.x,z:a.w*b.z+a.x*b.y-a.y*b.x+a.z*b.w,w:a.w*b.w-a.x*b.x-a.y*b.y-a.z*b.z};}
function quaternion(q){const n=Math.hypot(q.x,q.y,q.z,q.w)||1;return {x:q.x/n,y:q.y/n,z:q.z/n,w:q.w/n};}
function axis(v,angle){const s=Math.sin(angle/2);return {x:v.x*s,y:v.y*s,z:v.z*s,w:Math.cos(angle/2)};}
function rotate(q,v){const t=product(product(q,{...v,w:0}),{x:-q.x,y:-q.y,z:-q.z,w:q.w});return {x:t.x,y:t.y,z:t.z};}
function initial(yaw=0){return axis({x:0,y:1,z:0},yaw);}
function direction(yaw,pitch){return {x:-Math.sin(yaw)*Math.cos(pitch),y:Math.sin(pitch),z:-Math.cos(yaw)*Math.cos(pitch)};}
function axes(s){const q=s.q??initial(s.yaw??0);return {forward:rotate(q,{x:0,y:0,z:-1}),right:rotate(q,{x:1,y:0,z:0}),up:rotate(q,{x:0,y:1,z:0})};}
function step(s,c,dt=DT){
 s.q=quaternion(s.q??initial(s.yaw??0));s.rates??={x:0,y:0,z:0};s.throttle=clamp((s.throttle??.65)+(c.power??0)*dt*.3,0,1);
 const frame=axes(s),desired=direction(c.yaw??s.yaw??0,c.pitch??0),local=rotate({x:-s.q.x,y:-s.q.y,z:-s.q.z,w:s.q.w},desired),pitchError=Math.atan2(local.y,Math.max(.001,-local.z)),yawError=Math.atan2(-local.x,-local.z),bank=Math.atan2(frame.right.y,frame.up.y),manual=Math.abs(c.pitchAxis??0)+Math.abs(c.rollAxis??0)+Math.abs(c.yawAxis??0)>.01;
 const bankGoal=clamp(yawError*1.25,-1.2,1.2),bankError=Math.atan2(Math.sin(bankGoal-bank),Math.cos(bankGoal-bank)),authority=clamp(Math.hypot(s.vx??0,s.vy??0,s.vz??0)/12,.25,1);
 const wanted={x:(manual?(c.pitchAxis??0)*1.5:clamp(pitchError*1.8,-1.1,1.1))*authority,y:(manual?(c.yawAxis??0)*.75:clamp(yawError*.35,-.35,.35))*authority,z:(manual?(c.rollAxis??0)*2.8:clamp(bankError*2.1,-1.9,1.9))*authority};
 const damping=1-Math.exp(-dt*5);for(const k of ['x','y','z'])s.rates[k]+=(wanted[k]-s.rates[k])*damping;
 const rotationSpeed=length(s.rates);if(rotationSpeed>.00001)s.q=product(s.q,axis(unit(s.rates),rotationSpeed*dt));
 // Bank causes a coordinated turn; rotating the hull is not just cosmetic.
 const turn=Math.sin(bank)*.9*authority;s.q=quaternion(product(axis({x:0,y:1,z:0},turn*dt),s.q));
 const forward=axes(s).forward,speed=s.airSpeed??(Math.hypot(s.vx??0,s.vy??0,s.vz??0)||12),targetSpeed=12+24*s.throttle,drag=Math.abs(s.rates.x)*.8+Math.abs(turn)*.8,accel=(targetSpeed-speed)*.55-forward.y*7-drag,nextSpeed=clamp(speed+accel*dt,5,48),blend=1-Math.exp(-dt*3.4);
 for(const k of ['x','y','z']){const key='v'+k;s[key]=(s[key]??forward[k]*nextSpeed)+(forward[k]*nextSpeed-(s[key]??forward[k]*nextSpeed))*blend;}
 s.airSpeed=nextSpeed;if(nextSpeed<10)s.vy-=3*(1-nextSpeed/10)*dt;
 s.x+=s.vx*dt;s.y+=s.vy*dt;s.z+=s.vz*dt;s.yaw=Math.atan2(-forward.x,-forward.z);s.pitch=Math.asin(clamp(forward.y,-1,1));s.roll=bank;s.speed=Math.hypot(s.vx,s.vy,s.vz);
 return s;
}
module.exports={DT,step,initial,axes,direction,rotate,product,quaternion,axis,unit,add,mul,dot,length,clamp};
