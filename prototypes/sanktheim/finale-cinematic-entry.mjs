// The finale's cinematic in the game's own client (as scene-replay-entry.mjs does for the replays): finale-cinematic.cjs
// stages each moment, the client draws it, says the lines in its own bubbles, and an overlay adds the fades, the
// fleeing guards' fright and the blood of the bites.
import {startSiege} from './arena-front.mjs';
import director from './finale-cinematic.cjs';
import world from './world-space.cjs';
import {createCatalogue} from './catalogue.cjs';
import * as T from 'three';
const navigation=()=>({origin:{x:-65,z:-50},step:1,width:160,height:120,cells:Array(19200).fill(0),spawn:{x:0,y:0,z:0}});
let base,current,controller,overlay;
// the observer: where the camera looks, high above it (out of the pictures); the fortress's steps shake the ground
// for whoever is near
const ghost={id:'recording-observer',character:'Julia',name:'',x:10000,y:0,z:10000,hp:500,maxHP:500,maxHp:500,online:true};
const observer=()=>({...ghost,x:current.listener.x*world.SCALE,y:400,z:current.listener.z*world.SCALE});
const seen=()=>{const all=new Map();for(const t of director.SHOTS.slice(0,-1).map(t=>t+1)){const {state}=director.frame(base,t);for(const a of [...state.players,...state.enemies.filter(e=>!e.mechapom)])all.set(a.pomCharacter??a.character,{character:a.pomCharacter??a.character});}return [...all.values()];};
// every actor exactly where the film puts it: the client walks the others at their own pace, so each frame the
// staged positions are set on the avatars themselves (arena-front.mjs calls update), then the frame is drawn again
const pinned=new Map();
function pin({avatars}){for(const [id,{spin,hidden,...p}] of pinned){const v=avatars.get(id);if(v){Object.assign(v.position,p);v.target={...p};if(spin!=null&&v.mesh)v.mesh.rotation.z=spin;if(hidden&&v.mesh)v.mesh.visible=false;}}}
const recording={camera:null,update:pin,async api(route){
 const view=current&&world.snapshot(current.state),me=current&&observer(),state=view&&{...view,players:[...view.players,me]};
 if(route==='session')return {player:ghost,notice:''};
 if(route==='catalogue')return createCatalogue(seen)();
 if(route.startsWith('navigation'))return navigation();
 if(route==='music')return {};
 if(route==='state')return state;
 if(route==='arena')return {siege:state,player:me,position:me,movementSequence:0,combat:{attacks:[]},messages:[],health:{...me,spectator:true,serverTime:current.state.at,canMove:false,cooldowns:{}}};
 throw Error('Read-only cinematic: unsupported route '+route);
}};
let pending=0;T.DefaultLoadingManager.onStart=()=>pending++;T.DefaultLoadingManager.onLoad=()=>pending=0;
window.loadFinale=async job=>{
 base=job.base;current=director.frame(base,0);controller=await startSiege({recording});
 document.body.setAttribute('data-sky-cinematic','');
 const style=document.createElement('style');style.textContent='html,body{margin:0!important;width:100%;height:100%;overflow:hidden;background:#000}body.siege-mode>:not(#scene):not(#finale-overlay):not(#sky-dialogues){display:none!important}#scene,#sky-dialogues{display:block!important}#finale-overlay{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99}';document.head.append(style);
 overlay=document.createElement('canvas');overlay.id='finale-overlay';document.body.append(overlay);
 // every shot once, so that its models and textures are loaded before the film starts
 for(const t of director.SHOTS.slice(0,-1).map(t=>t+1)){current=director.frame(base,t,null,{transient:false});await controller.frame(current.camera);await new Promise(r=>setTimeout(r,250));}
 await document.fonts.ready;
 let stable=0;while(stable<6){await new Promise(r=>setTimeout(r,150));if(pending)stable=0;else stable++;}
 window.finaleReady=true;
};
const lens=new T.PerspectiveCamera();
// a point of the map on the picture (null behind the camera)
function screen(p,pose,w,h){
 lens.fov=pose.fov;lens.aspect=w/h;lens.near=.1;lens.far=5000;lens.position.set(pose.position.x,pose.position.y,pose.position.z);lens.lookAt(pose.target.x,pose.target.y,pose.target.z);lens.updateMatrixWorld();lens.updateProjectionMatrix();
 const v=new T.Vector3(p.x*world.SCALE,p.y*world.SCALE,p.z*world.SCALE).project(lens);return v.z>1?null:{x:(v.x+1)/2*w,y:(1-v.y)/2*h};
}
// fright: the little white lines over a head
function fright(c,at,t,pose,w,h){
 const top=screen(at,pose,w,h),low=screen({...at,y:at.y-.9},pose,w,h);if(!top||!low)return;
 const r=Math.min(h*.05,Math.max(4,Math.abs(low.y-top.y)*.45));c.strokeStyle='#fff';c.lineWidth=Math.max(2,r*.2);c.lineCap='round';
 for(const k of [-1,0,1]){const a=-Math.PI/2+k*.55,j=Math.sin(t*22+k)*r*.15,x=top.x+Math.cos(a)*r*.9,y=top.y+Math.sin(a)*r*.9;c.beginPath();c.moveTo(x,y+j);c.lineTo(x+Math.cos(a)*r,y+j+Math.sin(a)*r);c.stroke();}
}
// a bite's blood: drops thrown out and falling
function blood(c,b,pose,w,h){
 for(let i=0;i<14;i++){const a=(i/14)*Math.PI*2+b.seed,v=1.2+((i*37+b.seed*10)%7)/4,x=b.at.x+Math.cos(a)*v*b.age*.9,z=b.at.z+Math.sin(a)*v*b.age*.5,y=b.at.y+v*b.age*1.4-4.9*b.age*b.age,p=screen({x,y,z},pose,w,h),q=screen({x,y:y+.2,z},pose,w,h);if(!p||!q)continue;
  const r=Math.max(1.5,Math.abs(q.y-p.y)*.5)*(1-b.age*.6);c.fillStyle=`rgba(150,0,8,${Math.max(0,1-b.age/.9)})`;c.beginPath();c.ellipse(p.x,p.y,r,r*1.3,0,0,Math.PI*2);c.fill();}
}
const said=new Set();
// the fortress's steps, as its feet land: when, and how far from the camera (for how loud)
let drawing=0;window.finaleSteps=[];window.finaleSounds=()=>director.sounds();
addEventListener('fortress-step',({detail})=>{const c=current?.camera?.position;if(c)window.finaleSteps.push({at:drawing,distance:Math.hypot(detail.x-c.x,detail.z-c.z)});});
// pose: another camera (map units), to try a shot
window.drawFinale=async(t,pose=null)=>{
 drawing=t;current=director.frame(base,t,pose);
 // the lines, in the game's own bubbles, each once, when its time comes
 const lines=current.lines.filter(l=>t>=l.at&&t<l.at+6&&!said.has(l.at));for(const l of lines)said.add(l.at);
 if(lines.length)controller.game.messages(lines.map(l=>({id:'finale-line-'+l.at,author:l.author.id,character:l.author.name,text:l.text})));
 pinned.clear();const view=world.snapshot(current.state);for(const a of [...view.players,...view.soldiers,...view.enemies])if(!a.mechapom&&a.y>-20)pinned.set(a.id,{x:a.x,y:a.y,z:a.z,spin:a.spin,hidden:a.hidden});
 await controller.frame(current.camera);await controller.frame(current.camera);
 const scene=document.getElementById('scene'),w=overlay.width=Math.round(scene.clientWidth*devicePixelRatio),h=overlay.height=Math.round(scene.clientHeight*devicePixelRatio),c=overlay.getContext('2d'),o=current.overlay;
 c.clearRect(0,0,w,h);for(const f of o.fright)fright(c,f,o.t,current.camera,w,h);for(const b of o.blood)blood(c,b,current.camera,w,h);
 if(o.fade>0){c.fillStyle=`rgba(0,0,0,${Math.min(1,o.fade)})`;c.fillRect(0,0,w,h);}
 return {calls:controller.game.renderInfo?.().calls??0};
};
