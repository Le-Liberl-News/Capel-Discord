const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const point=a=>({x:a.x,y:a.y,z:a.z});
function kind(a){return !a.flying&&!['daspi','garou','funebre','tank'].includes(a.kind)?a.stage===3?'vines':a.stage===2?'ball':null:null;}
function segment(a,b,p){const dx=b.x-a.x,dz=b.z-a.z,n=dx*dx+dz*dz,k=clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(n||1),0,1);return {k,d:Math.hypot(a.x+dx*k-p.x,a.z+dz*k-p.z)};}
function createPomCrafts({state,geometry,hurt,damageWall,wallX,emit,multiplier=.5}){
 const all=()=>[...state.enemies,...Object.values(state.players)],defenders=()=>[...state.soldiers,...Object.values(state.players).filter(p=>p.online&&!p.pomControlled),...state.turrets,...state.barricades].filter(a=>a.hp>0);
 const allowed=a=>a&&a.hp>0&&a.online!==false&&!state.stoppedAt&&!a.cling&&!a.climb&&!a.mineLaunch&&state.at>=(a.stunUntil??0);
 function clear(a){for(const v of [...state.soldiers,...Object.values(state.players)])if(v.pomBoundBy===a.id){v.pomBoundUntil=0;delete v.pomBoundBy;}a.pomCraft=null;a.combatLockedUntil=0;a.nativeSeen=null;}
 function action(id,data,scale=1){const a=state.players[id];if(!a?.pomControlled)return {error:'Réservé aux poms.'};return begin(a,{...data,ai:false},scale);}
 function begin(a,data,scale=1){const type=kind(a),t=state.at,c=a.pomCraft;
  if(!type||!allowed(a))return {error:'Craft indisponible.'};
  if(data.phase==='cancel'){if(c?.phase==='charge')clear(a);return {ok:true};}
  if(type==='ball'&&c?.phase==='charge'&&['hold','release'].includes(data.phase)){
   if(t-c.heldAt>1500){clear(a);return {error:'Charge interrompue.'};}c.heldAt=t;
   if(data.phase==='hold')return {ok:true};
   const d=data.direction,n=Math.hypot(d?.x??0,d?.z??0);if(!Number.isFinite(n)||n<.01)return {error:'Direction invalide.'};
   if(a.y/scale>3&&!a.onWall)return {error:'Posez-vous avant de foncer.'};const power=clamp((t-c.at)/1000,0,1);Object.assign(c,{phase:'dash',launchAt:t,power,direction:{x:d.x/n,z:d.z/n},distance:c.ai?150:9+41*power,speed:35+65*power,hits:[],travelled:0});a.nextPomCraft=t+9000;a.heading={dx:d.x/n,dz:d.z/n};a.combatLockedUntil=t+6000;a.jump=null;a.falling=false;emit('pom-ball-launch','',{from:a.id,position:{x:a.x/scale,y:a.y/scale,z:a.z/scale},power});return {ok:true};
  }
  if(type==='ball'&&data.phase!=='begin'&&!data.ai)return {error:'Aucune charge en cours.'};
  if(c||t<(a.nextPomCraft??0))return {error:'Craft en recharge.'};
  if(type==='ball'){a.pomCraft={type,phase:'charge',at:t,heldAt:t,ai:!!data.ai};a.combatLockedUntil=t+5000;a.input={x:0,z:0};a.jump=null;return {ok:true};}
  const from={x:a.x/scale,y:a.y/scale,z:a.z/scale},target=defenders().find(v=>v.id===data.target&&(v.id.startsWith('soldier-')||v.id.startsWith('player-'))),to=target&&{x:target.x/scale,y:target.y/scale,z:target.z/scale};
  if(!target||target.pomBoundUntil>t||Math.hypot(to.x-from.x,to.z-from.z)>12||Math.abs(to.y-from.y)>3||geometry()?.sweep({...from,y:from.y+.7},{...to,y:to.y+.7},.12))return {error:'Cible hors de portée ou masquée.'};
  a.pomCraft={type,at:t,target:target.id,origin:from};a.nextPomCraft=t+11000;a.combatLockedUntil=t+2100;a.input={x:0,z:0};a.jump=null;emit('pom-vines','',{from:a.id,to:target.id,position:from});return {ok:true};
 }
 function bump(target,dir,power){const t=state.at,from=point(target),goal={x:from.x+dir.x*(2+power*3),y:from.y,z:from.z+dir.z*(2+power*3)},hit=geometry()?.sweep({...from,y:from.y+.65},{...goal,y:goal.y+.65},.4),end=hit?{x:hit.point.x,y:from.y,z:hit.point.z}:goal;target.pomBump={at:t,from,to:end};target.stunUntil=Math.max(target.stunUntil??0,t+550);target.jump=null;target.climb=null;target.input={x:0,z:0};}
 function wallHit(a,c,p){const w=state.walls.filter(w=>w.hp>0&&Math.abs(p.z-w.z)<=w.width/2+.6&&Math.abs(p.x-wallX(w))<2).sort((x,y)=>Math.abs(p.x-wallX(x))-Math.abs(p.x-wallX(y)))[0];if(!w)return;const before=w.hp;damageWall(w,(state.balance?.wallBaseDamage??4)*(3+6*c.power)*multiplier,{from:a.id,position:p,kind:'ball'});if(state.wave&&a.pomControlled){const s=state.wave.stats[a.id]??={id:a.id,character:a.name,damage:0,kills:0,rescues:0,healing:0,wallDamage:0};s.wallDamage=(s.wallDamage??0)+before-w.hp;}emit('wall-hit','',{from:a.id,wall:w.id,position:p,amount:before-w.hp});}
 function update(dt){const t=state.at;
  for(const v of defenders())if(v.pomBump){const c=v.pomBump,k=clamp((t-c.at)/550,0,1);v.x=c.from.x+(c.to.x-c.from.x)*k;v.z=c.from.z+(c.to.z-c.from.z)*k;v.y=c.from.y+Math.sin(k*Math.PI)*.7;if(k===1){v.y=c.from.y;v.pomBump=null;}}
  for(const a of all()){
   const c=a.pomCraft;if(!c)continue;
   if(!allowed(a)||a.online===false||kind(a)!==c.type){clear(a);continue;}
   a.moving=false;
   if(c.type==='vines'){
    const victim=defenders().find(v=>v.id===c.target),age=t-c.at;
    if(!victim||age>=2100){clear(a);continue;}
    if(age>=450&&!c.bound){c.bound=true;c.grab=point(victim);victim.pomBoundUntil=c.at+1650;victim.pomBoundBy=a.id;victim.jump=null;victim.climb=null;victim.transit=null;victim.input={x:0,z:0};hurt(victim,28*multiplier);}
    if(c.bound&&age>=650&&age<=1650){const dx=c.grab.x-a.x,dz=c.grab.z-a.z,d=Math.hypot(dx,dz)||1,k=clamp((age-650)/1000,0,1),end={x:a.x+dx/d*1.35,y:a.y,z:a.z+dz/d*1.35},desired={x:c.grab.x+(end.x-c.grab.x)*k,y:c.grab.y+(end.y-c.grab.y)*k+.18*Math.sin(k*Math.PI),z:c.grab.z+(end.z-c.grab.z)*k},hit=geometry()?.sweep({x:victim.x,y:victim.y+.6,z:victim.z},{...desired,y:desired.y+.6},.4);Object.assign(victim,hit?{x:hit.point.x,y:victim.y,z:hit.point.z}:desired);victim.moving=false;}
    continue;
   }
   if(c.phase==='charge'){if(c.ai&&t-c.at>=1000){const target=defenders().find(v=>v.id===a.target),g=target??{x:wallX(state.walls.find(w=>w.id===a.wall)??state.walls[0]),z:a.z};c.heldAt=t;begin(a,{phase:'release',direction:{x:g.x-a.x,z:g.z-a.z}});}else if(!c.ai&&t-c.heldAt>1500)clear(a);continue;}
   const from=point(a),step=Math.min(c.distance-c.travelled,c.speed*dt),to={x:from.x+c.direction.x*step,y:from.y,z:from.z+c.direction.z*step};let hit=null,stop={...from};const g=geometry();
   for(let left=step;left>1e-6;){const part=Math.min(.25,left),next={x:stop.x+c.direction.x*part,y:stop.y,z:stop.z+c.direction.z*part},floor=g?.floor(next.x,next.z,stop.y+.8);if(g&&(floor==null||Math.abs(floor-stop.y)>=.8)){hit={};break;}if(floor!=null)next.y=floor;const contact=g?.sweep({...stop,y:stop.y+.65},{...next,y:next.y+.65},.4);if(contact&&(!contact.normal||contact.normal.y<.6)){hit=contact;stop={x:contact.point.x,y:stop.y,z:contact.point.z};break;}stop=next;left-=part;}

   // Without scene geometry, use closed wall planes rather than letting a charge cross them.
   if(!geometry())for(const w of state.walls.filter(w=>w.hp>0)){const x=wallX(w),k=(x-from.x)/(to.x-from.x);if(k>=0&&k<=1&&Math.abs(from.z+(to.z-from.z)*k-w.z)<=w.width/2){stop={x,y:from.y,z:from.z+(to.z-from.z)*k};hit={surfacePoint:stop};break;}}
   const contacts=defenders().map(v=>({v,...segment(from,stop,v)})).filter(h=>h.d<(h.v.type==='barricade'?2.2:1.25)&&Math.abs(h.v.y-from.y)<2&&!c.hits.includes(h.v.id)&&((h.v.type==='barricade'&&hit&&Math.hypot(h.v.x-stop.x,h.v.z-stop.z)<2.2)||!geometry()?.sweep({...from,y:from.y+.7},{x:h.v.x,y:h.v.y+.7,z:h.v.z},.1))).sort((a,b)=>a.k-b.k);
   for(const {v,k}of contacts){c.hits.push(v.id);hurt(v,(24+42*c.power)*multiplier);emit('pom-ball-hit','',{from:a.id,to:v.id,position:point(v)});if(v.id.startsWith('turret-')||v.id.startsWith('barricade-')){stop={x:from.x+(stop.x-from.x)*k,y:from.y,z:from.z+(stop.z-from.z)*k};hit={};break;}bump(v,c.direction,c.power);}
   Object.assign(a,stop);a.nativeSeen=null;c.travelled+=Math.hypot(stop.x-from.x,stop.z-from.z);
   if(hit||c.travelled>=c.distance-.01||t-c.launchAt>6000){if(hit?.surfacePoint||hit?.point)wallHit(a,c,hit.surfacePoint??hit.point);clear(a);}
  }
 }
 return {action,begin,update,kind};
}
module.exports={createPomCrafts,kind,segment};
