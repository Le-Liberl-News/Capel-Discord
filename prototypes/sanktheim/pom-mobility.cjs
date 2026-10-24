const {createCatch,catchPoint,INSIDE_X,DURATION}=require('./wall-capture.cjs');
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),pos=a=>({x:a.x,y:a.y,z:a.z}),finite=p=>p&&['x','y','z'].every(k=>Number.isFinite(p[k]));
function flightPoint(c,at){const t=Math.max(0,(at-c.launchAt)/1000);return {x:c.from.x+c.velocity.x*t,y:c.from.y+c.velocity.y*t-9*t*t,z:c.from.z+c.velocity.z*t};}
function createPomMobility({state,geometry,hurt,emit,clear,multiplier}){
 const definitions=()=>require('./mobility-anchors.cjs').anchors(state,(x,z,y)=>geometry()?.floor(x,z,y));
 const validAnchor=id=>definitions().find(a=>a.id===id);
 function lock(a){a.input={x:0,z:0};a.jump=null;a.falling=false;a.climb=null;a.moving=false;a.combatLockedUntil=state.at+1000;a.nativeSeen=null;}
 function catchPom(a){if(a.pomCraft?.type==='catch')return;const from=pos(a),floor=geometry()?.floor(-62,from.z,3)??.04;a.pomCraft=createCatch(from,state.at,floor);a.grapple=a.pomCraft;a.pomCraft.announced=true;lock(a);emit('pom-wall-catch','',{from:a.id,position:from});}
 function needsCatch(a,previous){return a.pomControlled&&a.online!==false&&a.hp>0&&a.x>INSIDE_X&&(!previous||previous.x<=INSIDE_X)&&(a.y>=4||!state.walls.some(w=>w.hp<=0&&Math.abs(w.z-a.z)<w.width/2));}
 function barrier(a,previous){if(!needsCatch(a,previous))return false;catchPom(a);return true;}
 function begin(a,data,scale){const t=state.at,c=a.pomCraft;
  if(c?.type==='sling'&&c.phase==='attached'){
   if(data.phase==='cancel'){clear(a);return {ok:true};}
   if(data.phase!=='release')return {error:'Relâchez les lianes pour vous propulser.'};
   const d=data.direction;if(!finite(d)||Math.hypot(d.x,d.z)<.1)return {error:'Direction invalide.'};const length=Math.hypot(d.x,d.y,d.z),dy=clamp(d.y/length,.18,.85),horizontal=Math.sqrt(1-dy*dy),n=Math.hypot(d.x,d.z),power=clamp(c.stretch/8,0,1),speed=16+power*27,ax=c.anchor.x-a.x/scale,az=c.anchor.z-a.z/scale,an=Math.hypot(ax,az)||1,mx=ax/an*.65+d.x/n*.35,mz=az/an*.65+d.z/n*.35,mn=Math.hypot(mx,mz)||1;
   Object.assign(c,{phase:'flight',from:{x:a.x/scale,y:a.y/scale,z:a.z/scale},launchAt:t,velocity:{x:mx/mn*horizontal*speed,y:dy*speed+5,z:mz/mn*horizontal*speed},lastAt:t});a.nextPomCraft=t+9000;lock(a);emit('pom-sling-launch','',{from:a.id,position:c.from,power});return {ok:true};
  }
  if(c||t<(a.nextPomCraft??0))return {error:'Craft en recharge.'};const from={x:a.x/scale,y:a.y/scale,z:a.z/scale};
  if(a.kind==='garou'){
   const aim=data.aim&&{x:data.aim.x/scale,y:data.aim.y/scale,z:data.aim.z/scale};if(!finite(aim)||Math.hypot(aim.x-from.x,aim.z-from.z)>20||Math.abs(aim.y-from.y)>3)return {error:'Choisissez le sol à moins de vingt mètres.'};const floor=geometry()?.floor(aim.x,aim.z,aim.y+.6);if(geometry()&&(floor==null||Math.abs(floor-aim.y)>.65))return {error:'Ce point ne se trouve pas sur le sol.'};aim.y=floor??aim.y;const duration=900,durationSeconds=duration/1000;
   a.pomCraft={type:'leap',phase:'flight',at:t,launchAt:t,from,aim,velocity:{x:(aim.x-from.x)/durationSeconds,z:(aim.z-from.z)/durationSeconds,y:(aim.y-from.y+9*durationSeconds**2)/durationSeconds},duration,lastAt:t};a.nextPomCraft=t+10000;lock(a);emit('pom-garou-leap','',{from:a.id,origin:from,aim});return {ok:true};
  }
  const anchor=validAnchor(data.anchor);if(!anchor||Math.hypot(anchor.x-from.x,anchor.y-from.y,anchor.z-from.z)>24)return {error:'Arbre ou lampadaire hors de portée.'};
  const hit=geometry()?.sweep({...from,y:from.y+.65},anchor,.05);if(hit&&hit.distance<Math.hypot(anchor.x-from.x,anchor.y-from.y-.65,anchor.z-from.z)-1)return {error:'Point d’accroche masqué.'};
  a.pomCraft={type:'sling',phase:'attached',at:t,anchor:pos(anchor),anchorId:anchor.id,restLength:Math.max(2,Math.hypot(from.x-anchor.x,from.z-anchor.z)),stretch:0};lock(a);emit('pom-vines-anchor','',{from:a.id,position:from,aim:anchor});return {ok:true};
 }
 function impact(a,c){const dx=c.aim.x-c.from.x,dz=c.aim.z-c.from.z,n=Math.hypot(dx,dz)||1;for(const v of [...state.soldiers,...Object.values(state.players).filter(p=>p.online&&!p.pomControlled),...state.turrets,...state.barricades]){const x=v.x-a.x,z=v.z-a.z,d=Math.hypot(x,z);if(v.hp>0&&Math.abs(v.y-a.y)<2.5&&d<4.5&&(d<.5||(x*dx+z*dz)/(d*n)>-.25)&&!geometry()?.sweep({...pos(a),y:a.y+.7},{...pos(v),y:v.y+.7},.1))hurt(v,64*multiplier,{actor:a.id});}emit('cleave','',{from:a.id,origin:pos(a),position:pos(a),direction:{dx:dx/n,dz:dz/n},large:true});}
 function update(a,dt){const c=a.pomCraft;if(!c||!['sling','leap','catch'].includes(c.type))return false;if(a.hp<=0||a.online===false||state.stoppedAt||c.type==='sling'&&(a.stage!==3||a.flying||a.kind==='garou')||c.type==='leap'&&a.kind!=='garou'||c.type!=='catch'&&a.stunUntil>state.at){clear(a);return true;}lock(a);
  if(c.type==='catch'){if(!c.announced){c.announced=true;emit('pom-wall-catch','',{from:a.id,position:pos(a)});}let stopped=false;for(let at=c.lastAt??c.at;at<state.at;){at=Math.min(state.at,at+40);const next=catchPoint(c,at),hit=geometry()?.sweep({...pos(a),y:a.y+.5},{...next,y:next.y+.5},.35);if(hit&&at>c.at+500){Object.assign(a,{x:hit.point.x,y:hit.point.y-.5,z:hit.point.z});stopped=true;break;}Object.assign(a,next);}c.lastAt=state.at;if(stopped||state.at-c.at>=DURATION){clear(a);a.falling=true;}return true;}
  if(c.type==='sling'&&c.phase==='attached'){
   if(!validAnchor(c.anchorId)||state.at-c.at>20000){clear(a);return true;}const input=a.mobilityInputAt>state.at-1000?a.mobilityInput:null,stretch=Math.max(0,Math.hypot(a.x-c.anchor.x,a.z-c.anchor.z)-c.restLength),factor=1/(1+(stretch/2)**2),rx=(input?.x??0)*5*dt,rz=(input?.z??0)*5*dt,length=Math.hypot(a.x-c.anchor.x,a.z-c.anchor.z)||1,ux=(a.x-c.anchor.x)/length,uz=(a.z-c.anchor.z)/length,out=Math.max(0,rx*ux+rz*uz),dx=rx-ux*out*(1-factor),dz=rz-uz*out*(1-factor),next={x:a.x+dx,y:a.y,z:a.z+dz},floor=geometry()?.floor(next.x,next.z,a.y+.6),hit=geometry()?.sweep({...pos(a),y:a.y+.65},{...next,y:a.y+.65},.4);if(!hit&&(floor===undefined||floor!==null&&Math.abs(floor-a.y)<.65)){Object.assign(a,next);a.y=floor??a.y;}c.stretch=clamp(Math.hypot(a.x-c.anchor.x,a.z-c.anchor.z)-c.restLength,0,8);return true;
  }
  let landed=false,blocked=false;for(let at=c.lastAt;at<state.at;){at=Math.min(state.at,at+30,c.type==='leap'?c.launchAt+c.duration:Infinity);const from=pos(a),next=flightPoint(c,at);if(needsCatch({...a,...next},from)){// initialize from the real actor, never from a detached copy
    catchPom(a);return true;
   }const hit=geometry()?.sweep({...from,y:from.y+.5},{...next,y:next.y+.5},.35),floor=geometry()?.floor(next.x,next.z,Math.max(from.y,next.y)+.5);if(hit){Object.assign(a,{x:hit.point.x,y:hit.point.y-.5,z:hit.point.z});landed=hit.normal?.y>.5;blocked=true;break;}if(floor!=null&&next.y<=floor&&at>c.launchAt+80){Object.assign(a,{...next,y:floor});landed=true;break;}Object.assign(a,next);if(c.type==='leap'&&at>=c.launchAt+c.duration){Object.assign(a,c.aim);landed=true;break;}}
  c.lastAt=state.at;if(landed||blocked||state.at-c.launchAt>6000){if(c.type==='leap'&&landed)impact(a,c);clear(a);a.falling=!landed;}
  return true;
 }
 return {begin,update,barrier,catchPom};
}
module.exports={createPomMobility,flightPoint,catchPoint};
