// CS2 native S-craft choreography, shared by server and presentation.
const PHASE={prep:400,surfEnd:3900,aimStart:4500,timeout:10500,dive:550,recover:650};
const CRAFT={name:'Claiomh Solais — S-craft',key:'g',special:'altinaSword',selfTarget:true,windup:0,duration:11700,cooldown:18000,range:22,radius:4,damage:12,finalDamage:48,projectile:false,dash:true,dashDuration:11700,lockMovement:true};
const clamp=t=>Math.max(0,Math.min(1,t));
const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t});
function phases(a){const diveAt=a.diveAt==null?PHASE.timeout:a.diveAt-a.started;return {...PHASE,diveAt,impact:diveAt+PHASE.dive,end:diveAt+PHASE.dive+PHASE.recover};}
function perch(a){const base=a.surfPosition??a.aim;return {...base,y:base.y+(a.perchHeight??7)};}
function motion(a,t){const p=phases(a),high=perch(a),landing=a.landingPoint??a.aim;let position;
 if(t<PHASE.prep)position={...a.origin};
 else if(t<PHASE.surfEnd){position={...(a.localSurfPosition??a.surfPosition??a.origin)};position.y+=.25;}
 else if(t<PHASE.aimStart){const base=a.surfPosition??a.aim;position=mix({...base,y:base.y+.25},high,clamp((t-PHASE.surfEnd)/(PHASE.aimStart-PHASE.surfEnd)));}
 else if(t<p.diveAt)position=high;
 else position=mix(high,landing,clamp((t-p.diveAt)/PHASE.dive)**2);
 return {active:t<p.end,position};
}
function pose(a,t){const p=phases(a);let bank=5,start=0,duration=400;
 if(t>=p.impact){bank=10;start=p.impact;duration=p.recover;}
 else if(t>=p.diveAt){bank=9;start=p.diveAt;duration=p.dive;}
 else if(t>=PHASE.aimStart){bank=11;start=PHASE.aimStart;duration=1200;}
 else if(t>=PHASE.surfEnd){bank=8;start=PHASE.surfEnd;duration=600;}
 else if(t>=PHASE.prep){bank=7;start=PHASE.prep;duration=1000;}
 const loop=bank===7||bank===11;return {bank,pose:Math.min(11,Math.floor((loop?(t-start)%duration:Math.max(0,t-start))/duration*12))};
}
function aiming(a,t){return !!a&&!a.cancelled&&a.special==='altinaSword'&&t>=PHASE.aimStart&&t<phases(a).diveAt;}
function moveSurf(position,input,seconds,floor,geometry){const length=Math.hypot(input.x,input.z);if(!length||seconds<=0)return {...position};const direction={x:input.x/Math.max(1,length),z:input.z/Math.max(1,length)},distance=8*seconds*Math.min(1,length);return require('./combat-projection.cjs').projectionPath(position,direction,distance,floor,geometry)?.end??{...position};}
module.exports={CRAFT,PHASE,phases,perch,motion,pose,aiming,moveSurf};
