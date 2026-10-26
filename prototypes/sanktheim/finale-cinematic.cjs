// The finale's cinematic, shot by shot: the scene archived by finale-archive.cjs (the real fortress, walls, turrets,
// guards and defenders of that night), staged over a minute. frame(base,t) gives, at t seconds into the film, the
// siege as the server would hold it (map units), the camera (in the client's units), the lines to say (in the game's
// own bubbles) and what is drawn over the picture: the fades, the fleeing guards' fright, the blood of a bite.
//  1. from high up, the whole battlefield, slowly coming down and turning
//  2. at ground level, the fortress coming; two gate guards run, terrified, towards the camera and past it, a missile
//     after them
//  3. from above the road, a horde of poms running to the gate
//  4. poms on their vacuums flying past the camera
//  5. the melee before the walls, among walls of fire: a fighter leaps back, poms jump on the fighters and bite, a
//     guard throws a grenade that blows a pom away spinning
//  6. on the gate's wall, the officer in the gap of a crenel; 7. a soldier further along the wall
//  8. the night's MVP before the gate, the other defenders behind; at the end of their strength, they fall
//  9. from above their body, slowly rising, while the poms leap over it
// 10. cut, far back, still aimed at the body: the fortress charges the gate and tears it down, the poms never stop
//     pouring through the breach
// Each step of the fortress shakes the ground (the game's own view of it does); the trees in its way fall.
const {SCALE}=require('./world-space.cjs'),{ROUTE}=require('./mechapom.cjs'),{flingPose}=require('./knight-fling.cjs'),grenade=require('../../activity/guard-grenade.cjs');
const SHOTS=[0,8,14.5,20,23.5,32,37.5,42,48.5,52.5,62],DURATION=SHOTS.at(-1);
const GATE_X=-33.5,WALL_Y=11.75,BODY={x:-37.5,y:0,z:.8},OFFICER={x:-30.7,y:WALL_Y,z:-.4};
const LINES=[
 {who:'officer',at:32.4,text:'Balancez tout ce que vous avez ! On va quand même pas perdre contre ces nabots !'},
 {who:'soldier',at:37.7,text:'Chef, on a plus rien ! C’est fini !'},
 {who:'mvp',at:42.6,text:'J’ai… *halète*… tout donné… Il va falloir s’en remettre à Aidios.'}];
const FALL=47.6;   // the MVP falls
// the fortress: down the road until the last shot, then (cut) charging the gate from close by, and pounding it
const FORTRESS=[[0,-135],[SHOTS[9]-.01,-70],[SHOTS[9],-56],[57,-50],[DURATION,-50]];
const BREACH={gate:57.3,'west-tower':58,'east-tower':58.6},STRIKES=[57,57.9,58.7,59.5,60.3,61];
// the trees it crushes on its way: when, and which way they fall (towards the road)
const TREES=[['tree-102',39.5,.3],['tree-100',40.3,Math.PI-.3],['tree-098',44.4,.4],['tree-097',46.8,Math.PI-.4],['tree-090',52.6,.3],['tree-089',52.9,Math.PI-.3],['tree-086',54.6,.5],['tree-084',55.2,Math.PI-.5]];
const ease=t=>t<=0?0:t>=1?1:t*t*(3-2*t),lerp=(a,b,k)=>a+(b-a)*k,span=(t,a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));
// a small deterministic random, so that every render of the film is the same
const rand=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x);};
// the road's z where it crosses x (the forest path, then straight on to the gate)
function road(x){if(x>=ROUTE.at(-1)[0])return ROUTE.at(-1)[1]*(1-span(x,ROUTE.at(-1)[0],GATE_X));for(let i=1;i<ROUTE.length;i++)if(x<=ROUTE[i][0]){const a=ROUTE[i-1],b=ROUTE[i];return lerp(a[1],b[1],span(x,a[0],b[0]));}return ROUTE[0][1];}
function fortressX(t){for(let i=1;i<FORTRESS.length;i++)if(t<FORTRESS[i][0])return lerp(FORTRESS[i-1][1],FORTRESS[i][1],span(t,FORTRESS[i-1][0],FORTRESS[i][0]));return FORTRESS.at(-1)[1];}
// The client walks every actor towards where the state puts it at its own pace: speed (and npc, for the players) makes
// it be there at once. It builds a new actor a while after it enters the state: every one is there from the start,
// waiting far off the map; out of its part it is out of sight.
const exact={speed:1e4,npc:true};
const pom=(id,c,i,p,extra={})=>({id,character:'SiegePom',pomCharacter:c,stage:1+i%3,kind:'pom',flying:false,hp:90,maxHP:90,maxHp:90,teamId:'poms',enemy:true,useLadder:false,onWall:false,deadAt:null,respawnAt:0,...exact,...p,...extra});
const away=()=>({x:-320,y:0,z:80}),under=away;   // far off the map, out of every shot
// shot 10: a stream of poms that never stops, running to the gate and, once it falls, through
function streamPom(i,t,c){
 const start=SHOTS[9]-2.5+i*.21+rand(i+70)*.3,speed=6+rand(i+71)*2.5,lane=(rand(i+72)-.5)*10,x0=-88-rand(i+73)*6;if(t<start)return pom('pom-finale-stream-'+i,c,i,under(x0,lane+road(x0)));
 let x=x0+(t-start)*speed;if(t<BREACH.gate+.3)x=Math.min(x,-39.5-rand(i+74)*3);   // the first ones wait at the gate, a moment
 const through=x>GATE_X-2,z=lane*(through?.35:1);return pom('pom-finale-stream-'+i,c,i,{x,y:Math.abs(Math.sin((t-start)*3.4+i))*1.1,z:through?z:z+road(x)});
}
// shot 3: the horde on the road
function roadPom(i,t,c){const start=SHOTS[2]-.3+i*.38+rand(i+200)*.3,speed=6+rand(i+210)*2.5,x0=-98-rand(i+220)*3;if(t<start)return pom('pom-finale-road-'+i,c,i,under(x0,.4));if(t>=SHOTS[3])return pom('pom-finale-road-'+i,c,i,away(i+60));const x=x0+(t-start)*speed;return pom('pom-finale-road-'+i,c,i,{x,y:Math.abs(Math.sin((t-start)*3.6+i))*.9,z:.4+(rand(i+230)-.5)*4});}   // the paved road runs straight here (z 0), off the route's line
// shot 4: poms on their vacuums, flying past
// the fortress's aim: a point sweeping a cone before it, which its headlights follow and its flamethrowers burn (the
// client aims them at the nearest defender: an unseen one, there)
const BURN=.6;
function aim(s){const x=fortressX(s),a=Math.sin(s*1.1)*.75+Math.sin(s*2.9)*.2,d=13+Math.sin(s*1.7)*5;return {x:x+Math.cos(a)*d,z:road(x)+Math.sin(a)*d};}
// shot 4, below the vacuums: the foot poms on the road, hopping, the Pompoms rolling (their own craft, the fiery
// ball, at full power), the Pomdeters bounding
const FOOT=[[1,0],[2,1],[3,2],[1,3],[2,4],[3,5],[2,6],[1,7],[3,8]];
function footPom(i,t,c,ms){const [stage,k]=FOOT[i],id='pom-finale-foot-'+i,start=SHOTS[3]-.6+k*.36+rand(i+300)*.2,speed=stage===2?8.5:stage===3?5.5:6.5,x0=-97-rand(i+310)*2,z=.4+(rand(i+320)-.5)*2.6;
 if(t<start)return pom(id,c,stage-1,under(x0,z),{stage});if(t>=SHOTS[4])return pom(id,c,stage-1,away(i+120),{stage});
 const run=(t-start)*speed,x=x0+run;
 if(stage===2)return pom(id,c,1,{x,y:0,z},{stage,pomCraft:{type:'ball',phase:'roll',power:1,direction:{x:1,z:0},at:ms(start)}});
 const hop=stage===3?Math.abs(Math.sin((t-start)*2.6+i))*1.5:Math.abs(Math.sin((t-start)*4+i))*.8;return pom(id,c,stage-1,{x,y:hop,z},{stage});}
function aspiPom(i,t,c){const start=SHOTS[3]+.2+i*.7,x=-100+(t-start)*22;if(t<start)return pom('pom-finale-aspi-'+i,c,i,under(-100,0),{kind:'daspi',flying:true});if(t>=SHOTS[4])return pom('pom-finale-aspi-'+i,c,i,away(i+90),{kind:'daspi',flying:true});return pom('pom-finale-aspi-'+i,c,i,{x,y:3.2+i%2*1.4+Math.sin(t*5+i)*.2,z:-1.5+i%3*1.6},{kind:'daspi',flying:true});}
// the cast: the officer and a soldier on the gate's wall, two guards fleeing, the guard with the grenade, the fighters
// of the melee, the MVP and the other defenders of the wave
function castOf(base){
 const soldiers=base.view.soldiers??[],used=[],pick=test=>{const s=soldiers.find(s=>!used.includes(s.id)&&test(s))??soldiers.find(s=>!used.includes(s.id));if(s)used.push(s.id);return s;};
 const officer=pick(s=>/Adjudant|Sergent|Capitaine|Lieutenant/.test(s.name)),soldier=pick(s=>/^Soldat/.test(s.name)),runners=[pick(s=>/^Soldat/.test(s.name)),pick(s=>/^Soldat/.test(s.name))].filter(Boolean);
 const thrower=pick(()=>true),grabbed=pick(()=>true),brawler=pick(()=>true);
 const stats=Object.values(base.stats??{}).map(p=>({...p,score:(p.damage??0)+(p.kills??0)*100+(p.rescues??0)*250+(p.healing??0)*.5})).filter(p=>p.score>0&&base.participants?.[p.id]?.side!=='poms').sort((a,b)=>b.score-a.score);
 const best=base.mvp??stats[0],players=(base.view.players??[]).filter(p=>!p.pomControlled&&p.hp>0),known=best&&players.find(p=>p.id===best.id);
 const mvp=best?{id:best.id,name:best.name??known?.name??'Défenseur',character:known?.character??best.character??'Julia'}:null;
 const others=players.filter(p=>p.id!==mvp?.id).slice(0,4);
 const fighters=[...others.slice(0,2).map(p=>({id:p.id,player:true})),...soldiers.filter(s=>!used.includes(s.id)).map(s=>({id:s.id}))].slice(0,2);
 return {officer,soldier,runners,thrower,grabbed,brawler,mvp,others,fighters};
}
// the melee, before the gate's south tower, on the lit flagstones
// Where each one stands; the fighters' bounds: [when, x, z], each a quick leap from the place before (forward at the
// poms, back from them).
const MELEE={brawler:[[0,-42.2,-8.2],[24.5,-43.5,-6.6],[26.6,-42,-8.4],[28.4,-43.2,-7.2],[30,-41.8,-8.6]],
 kloe:[[0,-44.2,-.2],[23.8,-45.2,-1.2],[24.9,-44.3,-.3],[25.2,-45,-1]],kloeFrom:[-48.2,-1.4],
 oli:[[0,-43.4,-10.8],[24.2,-44.6,-9.8],[25.3,-43.6,-11],[26.5,-45,-9.4],[27.6,-44.2,-10]],oliFrom:[-47.6,-12.2],
 thrower:[-38.5,-9.8],flung:[-41.4,-12.6],grabbed:[-47.4,-5.3],pomdeter:[-49.4,-7.4],helpers:[[-46,-6.6],[-45.6,-12.6],[-40.2,-11.8]]};
// the knot the vines coil round: the client coils them a little above an actor's feet, and the guard turns round
// his feet; an unseen actor stands where his middle is (the sprite faces the melee camera, whose right is RIGHT)
const RIGHT={x:.74,z:.68},TALL=1.9,VINES_FROM=.75;
const knot=({x,y,z,spin})=>({x:x-RIGHT.x*Math.sin(spin)*TALL/2,y:y+Math.cos(spin)*TALL/2-.975,z:z-RIGHT.z*Math.sin(spin)*TALL/2});
// the guard in the Pomdeter's vines: caught, lifted, shaken about head down, then slammed to the ground
const SHAKE={catch:24.8,lift:[25.3,26.1],slam:[31,31.3]};
function shaken(t,[x,z]){const lift=span(t,...SHAKE.lift),slam=span(t,...SHAKE.slam),on=t>=SHAKE.lift[1]&&t<SHAKE.slam[0],u=t-SHAKE.lift[1];
 if(!on)return {x,y:lift*2.6*(1-slam*slam),z,spin:t<SHAKE.slam[1]?lift*Math.PI*(1-slam)*.9:0};
 return {x:x+Math.sin(u*7.3)*.9,y:2.8+Math.sin(u*11.7)*.55+Math.abs(Math.sin(u*5.1))*.4,z:z+Math.sin(u*5.9+1)*.5,spin:Math.PI*.9+Math.sin(u*9.4)*1.1+Math.sin(u*3.1)*.6};}
// a fighter's place at t: where its last bound brought it, a quick arc in between
function bounds(t,moves){let i=0;while(i+1<moves.length&&t>=moves[i+1][0])i++;const [s,x,z]=moves[i],prev=moves[Math.max(0,i-1)],k=i?span(t,s,s+.35):1;return {x:lerp(prev[1],x,k),y:Math.sin(Math.PI*k)*.7,z:lerp(prev[2],z,k),moving:k>0&&k<1};}
// the bites: on the second fighter, then on the first (who, when, where the blood flies)
const BITES=[...[26.3,26.9,27.5,28.1,28.7].map(at=>({who:2,at,x:MELEE.kloe.at(-1)[1],z:MELEE.kloe.at(-1)[2]})),...[29.5,30.1,30.7,31.3].map(at=>({who:1,at,x:MELEE.oli.at(-1)[1],z:MELEE.oli.at(-1)[2]}))];
// transient: false leaves out the actors that only come in during the film (to load each shot's scenery first)
function frame(base,t,pose=null,{transient=true}={}){
 const cast=castOf(base),view=base.view,at=base.at+t*1000,S=SCALE,ms=s=>base.at+s*1000;
 const characters=[...new Set([...(base.horde??[]),...(view.enemies??[]).filter(e=>!e.mechapom&&!e.siegeTank&&e.pomCharacter).map(e=>e.pomCharacter)])];if(characters.length<4)characters.push('Agate','Tita','Kloe','Olivier','Joshua','Zin','Renne');
 const state=JSON.parse(JSON.stringify(view));
 Object.assign(state,{at,wave:{id:'finale',number:view.wave?.number??0,started:at-300000,ends:at+3600000},events:[],corpses:[],shells:[],pomShots:[],fires:[],guardGrenades:[]});
 // an event's number follows its time (the client takes the events after the last number it has seen)
 const event=(s,e)=>{if(t>=s)state.events.push({id:'finale-'+Math.round(s*1000),at:ms(s),text:'',...e});};
 // the fortress, down for a while (no landing), walking the road
 const fx=fortressX(t),fz=road(fx),ahead=road(fx+1)-fz;
 state.mechapom={...(view.mechapom??{id:'pom-fortress',hp:5000000,maxHP:5000000}),x:fx,y:0,z:fz,heading:Math.atan2(ahead,1),grounded:true,since:at-600000,missiles:[],trail:[],arrived:t>=BREACH.gate};
 state.enemies=[{id:'pom-fortress',mechapom:true,boss:true,name:'Forteresse Mechapom',character:'MechaPom',pomCharacter:'Forteresse Mechapom',stage:3,kind:'fortress',flying:false,hp:state.mechapom.hp,maxHP:state.mechapom.maxHP,x:fx,y:0,z:fz,teamId:'poms',respawnAt:Number.MAX_SAFE_INTEGER,deadAt:null}];
 // every pom the film shows, once, out of sight from the start: its picture is loaded before it is needed
 for(const [i,ch] of characters.entries())for(const [j,kind] of ['pom','pom','pom','daspi'].entries())state.enemies.push(pom('pom-finale-wardrobe-'+i+'-'+j,ch,j,away(i*4+j),{kind,flying:kind==='daspi'}));
 const ch=i=>characters[i%characters.length];
 if(transient){
  for(let i=0;i<44;i++)state.enemies.push(streamPom(i,t,ch(i+5)));
  for(let i=0;i<14;i++)state.enemies.push(roadPom(i,t,ch(i+3)));
  for(let i=0;i<4;i++)state.enemies.push(aspiPom(i,t,ch(i+9)));
  for(let i=0;i<FOOT.length;i++)state.enemies.push(footPom(i,t,ch(i+13),ms));
 }
 // the trees in its way
 for(const [id,s,angle] of TREES){const tree=state.forestry?.trees?.find(x=>x.id===id);if(tree&&t>=s)Object.assign(tree,{cutAt:ms(s),fallAngle:angle,stage:0});}
 // the walls: whole until it pounds them, then a portion torn down
 for(const w of state.walls){const s=BREACH[w.id];if(s!==undefined&&t>=s){w.hp=0;w.stage=4;w.damageStep=11;}}
 // the guards: every one out of the way inside the walls, but those the film needs
 const place=(id,p,face,list=state.soldiers)=>{const g=list.find(x=>x.id===id);if(g)Object.assign(g,{y:0,...p,...exact,hp:Math.max(1,g.hp),transit:null,climb:null,sleeping:false,moving:!!p.moving,heading:face});};
 for(const [i,g] of state.soldiers.entries())Object.assign(g,{x:-14-i*1.5,y:0,z:14+i,transit:null,climb:null,...exact});
 // the flames turn to the nearest defender: a decoy under the fortress keeps them off the people in the shots
 state.soldiers.push({...state.soldiers[0],id:'soldier-finale-decoy',name:'',...aim(t),y:-2.5,hp:1,hidden:true,...exact});
 // where its flames fell, these last seconds, burn on (not near the body, in the last shots)
 if(t<SHOTS[9])for(let k=0;k<12;k++){const s=Math.floor(t/BURN)*BURN-k*BURN;if(s>0)state.fires.push({id:'finale-burn-'+Math.round(s*10),...aim(s),y:-.55,radius:1.5,at:ms(s)});}
 if(cast.officer)place(cast.officer.id,OFFICER,{dx:-1,dz:0});   // in the gap of a crenel
 if(cast.soldier)place(cast.soldier.id,{x:-29.4,y:WALL_Y,z:-4.4},{dx:-.4,dz:.9});
 // shot 2: the two guards fleeing (already running when it starts), a missile after them
 const runs=[[-66,-1,-36,6.5,6.6,13.6],[-70,.8,-36.5,-4.5,6.9,14.3]];
 for(const [i,r] of cast.runners.entries()){const [x0,z0,x1,z1,a,b]=runs[i],k=span(t,a,b);place(r.id,t<SHOTS[2]?{x:lerp(x0,x1,k),z:lerp(z0,z1,k*k),moving:t<b}:{x:-20,z:8+i},{dx:1,dz:0});}
 const chased=cast.runners.at(-1);
 if(chased){event(10.4,{type:'mechapom-missile',from:'pom-fortress',to:chased.id,origin:{x:fx+7,y:10,z:fz+2},aim:{x:-45,y:0,z:-2},side:1,hitAt:ms(13.2)});event(13.2,{type:'mechapom-blast',to:'',position:{x:lerp(-70,-36.5,span(13.2,6.9,14.3))-3,y:0,z:-2.5}});}
 // shot 5: the melee, among walls of fire, everyone fighting from the first second. The fighters bound forward and
 // back, the guards fire, the defenders parry; the poms lunge at them. A pom lunges at the guard in front, who bounds
 // back; a Pomdeter seizes another guard with its vines and lifts him; poms jump on the two defenders and bite; a
 // guard's grenade blows a pom away spinning.
 const [f1,f2]=cast.fighters,list=f=>f?.player?state.players:state.soldiers,c=i=>ch(i+20),M=MELEE;
 const leap=span(t,25.6,26.2),leap2=span(t,28.8,29.4),fling=27.95;
 const inMelee=t>=SHOTS[4]-1.5&&t<SHOTS[5]+.3;
 // a fighter striking: a guard fires, a defender parries (the client draws a stance for both)
 const strike=(f,s)=>f?.player?{parry:{at:ms(s)}}:{attackPose:{at:ms(s),duration:800}},last=(moments)=>moments.filter(s=>t>=s).at(-1)??-10;
 if(inMelee){
  if(cast.brawler)place(cast.brawler.id,{...bounds(t,M.brawler),...strike(null,last([23.3,24.1,25.2,26,27.2,28.1,29.3,30.4]))},{dx:-1,dz:-.4});
  if(f1)place(f1.id,{...bounds(t,M.oli),...strike(f1,last([23.6,24.7,25.9,27.1,28.2]))},{dx:-1,dz:-.2},list(f1));
  if(f2)place(f2.id,{...bounds(t,M.kloe),...strike(f2,last([23.9,24.6,25.3]))},{dx:-1,dz:.2},list(f2));
  if(cast.thrower)place(cast.thrower.id,{x:M.thrower[0],z:M.thrower[1],...strike(null,last([23.5,24.5,25.5]))},{dx:-1,dz:-.1});
  // the guard the Pomdeter seizes: firing, then caught, lifted in the air, and dropped
  const held=shaken(t,M.grabbed);if(cast.grabbed)place(cast.grabbed.id,{...held,...strike(null,last([23.4,24.2]))},{dx:-.6,dz:-1});
  state.soldiers.push({...state.soldiers[0],id:'soldier-finale-knot',name:'',...exact,...knot(held),hp:1,hidden:true,attackPose:null});
  // the fires, in lines and arcs, their feet sunk in the ground
  const fires=[];for(let i=0;i<12;i++)fires.push([-49+i*.95,-13.6+Math.sin(i*.7)*.5]);for(let i=0;i<10;i++)fires.push([-37.2+Math.sin(i*.6)*.4,-12+i]);for(let i=0;i<7;i++){const a=Math.PI*(.55+i*.09);fires.push([-46+Math.cos(a)*6,-9-Math.sin(a)*5.5]);}
  for(const [i,[x,z]] of fires.entries())state.fires.push({id:'finale-fire-'+i,x,y:-.55,z,radius:1.65,at:ms(SHOTS[4]-2)});
 }
 if(transient){
  const gone=t>=SHOTS[5]+.3,waiting=t<SHOTS[4]-.5,hide=p=>gone?away():waiting?under():p;
  // the poms lunge in short leaps, at their fighter and back, never still for long
  const lunging=(i,home,at)=>{const k=((t+i*.37)*1.3)%1,out=k<.3?Math.sin(Math.PI*k/.3):0;return {x:home[0]+(at[0]-home[0])*out*.45,y:out*1.1,z:home[1]+(at[1]-home[1])*out*.45};};
  const brawler=bounds(t,M.brawler),lunge=span(t,24,24.45);
  state.enemies.push(pom('pom-finale-melee-1',c(1),1,hide(t<24?lunging(1,[M.brawler[0][1]-2.8,M.brawler[0][2]-1.6],[brawler.x,brawler.z]):t<24.45?{x:lerp(M.brawler[0][1]-2.8,M.brawler[0][1]-.9,lunge),y:Math.sin(Math.PI*lunge)*1.3,z:lerp(M.brawler[0][2]-1.6,M.brawler[0][2]-.5,lunge)}:lunging(1,[M.brawler[0][1]-1.9,M.brawler[0][2]-1.2],[brawler.x,brawler.z]))));
  const kloe=M.kloe.at(-1);state.enemies.push(pom('pom-finale-melee-2',c(2),2,hide(t<25.6?lunging(2,M.kloeFrom,[kloe[1],kloe[2]]):leap<1?{x:lerp(M.kloeFrom[0],kloe[1]-.3,leap),y:Math.sin(Math.PI*leap)*2.4,z:lerp(M.kloeFrom[1],kloe[2],leap)}:{x:kloe[1]-.3,y:.75+Math.abs(Math.sin(t*9))*.12,z:kloe[2]})));
  const oli=M.oli.at(-1);state.enemies.push(pom('pom-finale-melee-3',c(3),3,hide(t<28.8?lunging(3,M.oliFrom,[oli[1],oli[2]]):leap2<1?{x:lerp(M.oliFrom[0],oli[1]-.3,leap2),y:Math.sin(Math.PI*leap2)*2.2,z:lerp(M.oliFrom[1],oli[2],leap2)}:{x:oli[1]-.3,y:.75+Math.abs(Math.sin(t*8+1))*.12,z:oli[2]})));
  for(const [i,p] of M.helpers.entries())state.enemies.push(pom('pom-finale-melee-'+(4+i),c(4+i),4+i,hide(lunging(4+i,p,[brawler.x,brawler.z]))));
  // the Pomdeter and its vines (pom-craft-view.mjs draws them from the pom to its victim)
  // the vines come from an unseen pom in its middle (the client starts them a little above a pom's feet)
  const hop=t<SHAKE.catch?Math.abs(Math.sin(t*3))*.4:0;
  state.enemies.push(pom('pom-finale-melee-7',c(8),2,hide({x:M.pomdeter[0],y:hop,z:M.pomdeter[1]}),{stage:3}));
  state.enemies.push(pom('pom-finale-vines',c(8),2,hide({x:M.pomdeter[0],y:hop+VINES_FROM,z:M.pomdeter[1]}),{stage:3,hidden:true,pomCraft:cast.grabbed&&t>=SHAKE.catch&&t<SHAKE.slam[1]+.2?{type:'vines',at:ms(Math.max(SHAKE.catch,t-1.2)),target:'soldier-finale-knot',origin:{x:M.pomdeter[0],z:M.pomdeter[1]}}:null}));
  // the pom the grenade blows away, spinning (drawn as the knight's fling: a player playing a pom)
  const from={x:M.flung[0],y:0,z:M.flung[1]},flight={at:ms(fling),from,away:{x:-.9,z:-.44},distance:13},flung=t<fling?lunging(9,M.flung,M.thrower):flingPose(flight,at);
  state.players.push({id:'finale-flung',name:'',character:'SiegePom',pomCharacter:c(7),originalCharacter:'SiegePom',pomControlled:true,stage:2,kind:'pom',teamId:'poms',online:true,hp:90,maxHP:90,maxHp:90,...exact,...hide({x:flung.x,y:flung.y,z:flung.z}),knightFling:!gone&&t>=fling&&!flung.done?flight:null});
  for(const b of BITES){const victim=b.who===2?f2:f1;if(victim)event(b.at,{type:'pom-hit',from:'pom-finale-melee-'+(b.who===2?2:3),to:victim.id,position:{x:b.x,y:1,z:b.z}});}
  // the grenade (already in the client's units: the snapshot leaves them as they are)
  if(cast.thrower&&t>=26.9&&!gone){const o={x:M.thrower[0]*S,y:1.2*S,z:M.thrower[1]*S},to={x:M.flung[0]*S,y:0,z:M.flung[1]*S},d=Math.hypot(to.x-o.x,to.z-o.z),dir={x:(to.x-o.x)/d,y:.05,z:(to.z-o.z)/d};state.guardGrenades.push({id:'finale-grenade',released:true,expired:false,projectile:grenade.launch(o,dir,ms(26.9)),explodedAt:t>=fling?ms(fling):null,explosionPoint:to});}
 }
 // fires before the gate too, in the last shots
 if(t>=SHOTS[8])for(let i=0;i<14;i++)state.fires.push({id:'finale-gatefire-'+i,x:-40-rand(i+400)*14,y:0,z:(rand(i+401)-.5)*24,radius:1.65,at:ms(SHOTS[8])});
 // the MVP before the gate, the other defenders behind on the sides: standing, then the MVP falls
 if(cast.mvp){state.players=state.players.filter(p=>p.id!==cast.mvp.id);state.players.push({id:cast.mvp.id,name:cast.mvp.name,character:cast.mvp.character,originalCharacter:cast.mvp.character,...BODY,hp:t>=FALL?0:40,maxHP:500,maxHp:500,online:true,teamId:'defenders',pomControlled:false,guardControlled:false,deadAt:t>=FALL?ms(FALL):null,heading:{dx:-1,dz:0},...exact});}
 const behind=[[-35.6,4.2],[-35.4,-2.8],[-34.4,6.8],[-34.3,-5.4]];
 for(const [i,p] of cast.others.entries())if(!inMelee||!cast.fighters.some(f=>f.id===p.id))place(p.id,{x:behind[i][0],z:behind[i][1]},{dx:-1,dz:0},state.players);
 // the fortress pounding the gate, its missiles at the wall's last defenders
 for(const s of STRIKES)event(s,{type:'mechapom-blast',to:'',position:{x:GATE_X-1,y:3,z:(rand(s)-.5)*6}});
 if(cast.officer)for(const s of [53.2,57.2])event(s,{type:'mechapom-missile',from:'pom-fortress',to:cast.officer.id,origin:{x:fx+(s%2?7:-7),y:10,z:fz+2},aim:OFFICER,side:s%2?1:-1,hitAt:ms(s+.9)});
 const camera=pose?{position:scaled(pose.position),target:scaled(pose.target),fov:pose.fov??46}:shot(t);
 return {state,camera,lines:LINES.map(l=>({...l,author:speaker(l.who,cast)})).filter(l=>l.author),overlay:overlay(t,cast,state),listener:{x:camera.target.x/S,z:camera.target.z/S}};
}
const scaled=v=>({x:v.x*SCALE,y:v.y*SCALE,z:v.z*SCALE});
function speaker(who,cast){const s=who==='officer'?cast.officer:who==='soldier'?cast.soldier:cast.mvp;return s&&{id:s.id,name:s.name};}
// the camera: position and aim in the client's units, its field of view; a shake when the fortress strikes (its steps
// shake it on their own, through the game's own view of it)
function shot(t){
 const n=Math.max(0,SHOTS.findIndex((s,i)=>t>=s&&t<SHOTS[i+1])),k=span(t,SHOTS[n],SHOTS[n+1]);let position,target,fov=46;
 switch(n){
  case 0:{const e=ease(t/SHOTS[1]),a=lerp(.8,.58,e),r=lerp(150,104,e),h=lerp(118,66,e),T={x:-70,y:0,z:0};position={x:T.x+Math.cos(a)*r,y:h,z:T.z+Math.sin(a)*r};target=T;fov=50;break;}
  case 1:position={x:-41.5,y:1.3,z:3.4+k*.4};target={x:-90,y:7-k*1.5,z:-1.5};fov=46;break;
  case 2:position={x:-86,y:6.5,z:7};target={x:-82,y:0,z:.4};fov=58;break;
  case 3:position={x:lerp(-80,-77,k),y:2.4,z:9};target={x:lerp(-80,-75,k),y:3.6,z:0};fov=62;break;
  case 4:position={x:lerp(-51.5,-51,k),y:2.6,z:lerp(3.2,2.6,k)};target={x:-44,y:1.1,z:-5.2};fov=50;break;
  case 5:case 6:{const j=ease(span(t,36.4,38.2));position={x:lerp(-26.6,-25.8,j),y:lerp(14.5,14.3,j),z:lerp(2.9,2.4,j)};target={x:lerp(-40,-32,j),y:lerp(12.2,12.5,j),z:lerp(-1.4,-3.6,j)};fov=50;break;}   // the officer, then (turning) the soldier further along the wall
  case 7:position={x:lerp(-43.5,-42.8,k),y:1.5,z:lerp(3.1,2.8,k)};target={x:BODY.x,y:1.2,z:BODY.z};fov=44;break;
  case 8:position={x:BODY.x+lerp(2.6,3.6,k),y:lerp(4.6,7.6,k),z:BODY.z+lerp(1.4,2,k)};target=BODY;fov=55;break;
  default:{const d=lerp(1,1.25,k),o={x:-24.5,y:13,z:23};position={x:BODY.x+o.x*d,y:BODY.y+o.y*d,z:BODY.z+o.z*d};target=BODY;fov=50;}
 }
 let shake=0;for(const s of STRIKES)if(t>=s&&t<s+.6)shake=Math.max(shake,(1-(t-s)/.6)*.5);
 if(shake)position={...position,x:position.x+Math.sin(t*61)*shake,y:position.y+Math.cos(t*47)*shake*.7};
 return {position:scaled(position),target:scaled(target),fov};
}
// what is drawn over the picture: the fade (0 clear, 1 black), the fleeing guards' fright (little white lines over their
// heads), the blood of the bites (bursts in map units, with their age)
function overlay(t,cast,state){
 const fade=Math.max(1-span(t,0,2.2),span(t,DURATION-2.5,DURATION));
 const fright=t>=SHOTS[1]&&t<SHOTS[2]?cast.runners.map(r=>state.soldiers.find(s=>s.id===r.id)).filter(Boolean).map(r=>({x:r.x,y:r.y+2.15,z:r.z})):[];
 const blood=t>=SHOTS[4]&&t<SHOTS[5]?BITES.filter(b=>t>=b.at&&t<b.at+.9&&(b.who===1?cast.fighters[0]:cast.fighters[1])).map(b=>({at:{x:b.x,y:1.1,z:b.z},age:t-b.at,seed:b.at})):[];
 return {fade,fright,blood,t};
}
// The sounds over the film (the fortress's steps aside: the client's model says when its feet land): [at, name, gain].
// The poms' hops are heard where they are seen: on the road, in the melee, through the breach.
function sounds(){
 const out=[],seen=(t,a,b)=>t>=a&&t<b,hops=(i,start,rate,a,b,gain)=>{for(let n=Math.ceil(i/Math.PI);;n++){const at=start+(Math.PI*n-i)/rate;if(at>=b)break;if(at>=Math.max(a,start))out.push([at,'ed6se093',gain]);}};
 for(let i=0;i<14;i++)hops(i,SHOTS[2]-.3+i*.38+rand(i+200)*.3,3.6,SHOTS[2],SHOTS[3],.22);
 for(let i=0;i<44;i+=3)hops(i,SHOTS[9]-2.5+i*.21+rand(i+70)*.3,3.4,SHOTS[9],DURATION,.18);
 for(const i of [1,2,3,4,5,6,9])for(let n=Math.ceil((SHOTS[4])*1.3+i*.37*1.3);;n++){const at=n/1.3-i*.37;if(at>=SHOTS[5])break;if(!(i===2&&at>25.6)&&!(i===3&&at>28.8))out.push([at,'ed6se093',.3]);}
 for(const at of [24,25.6,28.8])out.push([at,'ed6se093',.45]);
 for(let i=0;i<4;i++)out.push([SHOTS[3]+.2+i*.7+.3,'ed6se560',.7]);
 for(const s of STRIKES)out.push([s,'ed6se136',1]);
 return out.filter(([at])=>seen(at,0,DURATION)).sort((a,b)=>a[0]-b[0]);
}

module.exports={frame,sounds,DURATION,SHOTS,castOf};
