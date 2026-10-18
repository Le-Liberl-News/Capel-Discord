// CS2 native S-craft choreography, shared by server and presentation.
const PHASE={prep:1400,surfEnd:4900,aimStart:5500,timeout:11500,dive:550,recover:650};
const CRAFT={name:'Claiomh Solais — S-craft',key:'g',special:'altinaSword',selfTarget:true,windup:0,duration:12700,cooldown:18000,range:22,radius:4,damage:12,finalDamage:48,projectile:false,dash:true,dashDuration:12700,lockMovement:true};
const clamp=t=>Math.max(0,Math.min(1,t));
const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t});
function phases(a){const diveAt=a.diveAt==null?PHASE.timeout:a.diveAt-a.started;return {...PHASE,diveAt,impact:diveAt+PHASE.dive,end:diveAt+PHASE.dive+PHASE.recover};}
function perch(a){const base=a.surfPosition??a.aim;return {...base,y:base.y+(a.perchHeight??7)};}
function motion(a,t){const p=phases(a),high=perch(a),landing=a.landingPoint??a.aim;let position;
 if(t<PHASE.prep){const jump=clamp((t-600)/(PHASE.prep-600));position=mix(a.origin,a.mountPosition??a.origin,jump);position.y+=Math.sin(jump*Math.PI)*1.2+jump*.25;}
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
 else if(t>=600){bank=6;start=600;duration=PHASE.prep-600;}
 const loop=bank===7||bank===11;return {bank,pose:Math.min(11,Math.floor((loop?(t-start)%duration:Math.max(0,t-start))/duration*12))};
}
function aiming(a,t){return !!a&&!a.cancelled&&a.special==='altinaSword'&&t>=PHASE.aimStart&&t<phases(a).diveAt;}
function surfDirection(input,previous={x:0,z:-1}){const requested=Math.hypot(input?.x??0,input?.z??0)>.08?input:previous,length=Math.hypot(requested.x,requested.z)||1;return Math.hypot(requested.x,requested.z)>.001?{x:requested.x/length,z:requested.z/length}:{x:0,z:-1};}
function steerHeading(heading,turn,seconds,launchHeading){const h=surfDirection(null,heading),f=surfDirection(null,launchHeading??heading),angle=Math.max(-1,Math.min(1,turn||0))*Math.PI/3,c=Math.cos(angle),s=Math.sin(angle),target={x:f.x*c-f.z*s,z:f.x*s+f.z*c},blend=1-Math.exp(-seconds*9);return surfDirection({x:h.x+(target.x-h.x)*blend,z:h.z+(target.z-h.z)*blend},f);}

function moveSurf(position,input,seconds,floor,geometry){
 if(seconds<=0)return {...position};const direction=surfDirection(input);let end={...position};
 const valid=next=>{const y=floor(next);return Number.isFinite(y)&&Math.abs(y-end.y)<=.45?{...next,y}:null;};
 for(let left=8*seconds;left>1e-6;){const step=Math.min(.1,left);left-=step;const next={x:end.x+direction.x*step,y:end.y,z:end.z+direction.z*step},from={...end,y:end.y+.8},hit=geometry?.sweep(from,{...next,y:next.y+.8},.25);let accepted=!hit&&valid(next);
  if(!accepted){const n=hit?.normal,normal=n&&Math.hypot(n.x,n.z)>.1?surfDirection({x:n.x,z:n.z}):null;
   let tangent=normal?{x:direction.x-normal.x*(direction.x*normal.x+direction.z*normal.z),z:direction.z-normal.z*(direction.x*normal.x+direction.z*normal.z)}:null;
   if(tangent&&Math.hypot(tangent.x,tangent.z)<.05)tangent={x:-normal.z,z:normal.x};
   const candidates=tangent?[tangent,{x:-tangent.x,z:-tangent.z}]:[{x:direction.x,z:0},{x:0,z:direction.z}].sort((a,b)=>Math.hypot(b.x,b.z)-Math.hypot(a.x,a.z));
   for(const candidate of candidates){if(Math.hypot(candidate.x,candidate.z)<.01)continue;const d=surfDirection(candidate),point={x:end.x+d.x*step,y:end.y,z:end.z+d.z*step},ground=valid(point);if(ground&&!geometry?.sweep(from,{...point,y:point.y+.8},.25)){accepted=ground;break;}}
  }if(!accepted)break;end=accepted;
 }return end;
}

module.exports={CRAFT,PHASE,phases,perch,motion,pose,aiming,moveSurf,surfDirection,steerHeading};
