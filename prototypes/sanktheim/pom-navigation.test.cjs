const test=require('node:test'),assert=require('node:assert/strict'),{moveAround}=require('./pom-navigation.cjs');
const geometry={sweep(a,b,r){const dx=b.x-a.x,dz=b.z-a.z,n=dx*dx+dz*dz,k=n?Math.max(0,Math.min(1,-(a.x*dx+a.z*dz)/n)):0;return Math.hypot(a.x+dx*k,a.z+dz*k)<1+r?{point:a}:null;},floor(){return 0;}};
test('a pom detours around a trunk without crossing it or remaining stuck',()=>{const e={id:'pom-1',x:-3,y:0,z:0},goal={x:4,z:0};for(let i=0;i<180;i++){moveAround(e,goal,.1,geometry);assert.ok(Math.hypot(e.x,e.z)>=1.4-1e-6);}assert.ok(e.x>3.8,JSON.stringify(e));});
