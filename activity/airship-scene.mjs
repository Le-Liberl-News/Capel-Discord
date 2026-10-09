import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {loadLynx} from './lynx-model.mjs';
import {preloadAssets} from './asset-preload.mjs';
import {createRooftopSky,PANORAMA_FILES} from './rooftop-sky.mjs';
import physics from './airship-physics.cjs';
import {createDialogues} from './dialogue.mjs';
import {keyboardLayout} from './controls.mjs';
export async function createAirshipScene(canvas,assets){
 const scene=new THREE.Scene(),renderer=new THREE.WebGLRenderer({canvas,antialias:true}),camera=new THREE.PerspectiveCamera(55,1,.2,12000);
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x4b667e);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const folder=new URL('liberl/',assets),config=await fetch(new URL('airship.json',folder),{cache:'no-store'}).then(r=>r.json()),layout=await fetch(new URL('layout.json',folder),{cache:'no-store'}).then(r=>r.json());
 const versioned=url=>{const u=new URL(url,folder);u.searchParams.set('v',layout.revision);return u.href;};
 const terrain=await fetch(versioned('terrain.gltf')).then(r=>r.json()),meta=await fetch(versioned('flight-ground.json')).then(r=>r.json()),groundBytes=await fetch(versioned('flight-ground.bin')).then(r=>r.arrayBuffer()),ground=physics.groundField(meta,new Float32Array(groundBytes));
 const loading=document.createElement('div');loading.style.cssText='position:fixed;inset:0;display:grid;place-items:center;background:#201b18e8;color:#ffe7b0;z-index:40;font:20px system-ui';loading.textContent='Chargement du Liberl…';document.body.append(loading);
 const skyAssets=new URL('tower4/',assets),manager=new THREE.LoadingManager();let cached;
 try{cached=await preloadAssets(terrain.buffers.filter(b=>!b.uri.startsWith('data:')).map(b=>versioned(b.uri)).concat(PANORAMA_FILES.map(f=>versioned(new URL(f,skyAssets).href))),{onProgress:(n,total)=>loading.textContent=`Chargement ${n}/${total}`});
 manager.setURLModifier(url=>url.startsWith('blob:')||url.startsWith('data:')?url:cached.resolve(versioned(url)));
 const model=(await new GLTFLoader(manager).loadAsync(new URL('terrain.gltf',folder).href)).scene;scene.add(model);
 const sky=await createRooftopSky(THREE,scene,skyAssets,manager);cached.dispose();cached=null;
 const ship=await loadLynx(THREE,assets,config.length);scene.add(ship);
 model.traverse(o=>{if(o.isMesh)for(const m of [].concat(o.material)){if(m.map){m.map.magFilter=THREE.NearestFilter;m.map.minFilter=THREE.LinearMipmapLinearFilter;}m.polygonOffset=true;m.polygonOffsetFactor=.1;}});
 loading.remove();return finish({scene,renderer,camera,ship,sky,config,ground,canvas,assets,layout,model});
 }catch(error){cached?.dispose();loading.remove();renderer.dispose();throw error;}
}
async function finish({scene,renderer,camera,ship,sky,config,ground,canvas,assets,layout,model}){
 const {DT,stepAirship,initialAirship}=physics,keys=new Set(),remote=new Map(),dialogues=await createDialogues(assets);
 let state=initialAirship(config.spawn),localId=null,character='?',connected=false,disposed=false,sequence=0,frames=[],actions=[],notify=()=>{},last=performance.now(),accumulator=0,orbit=0,pitchOrbit=.7,drag=null,noticeUntil=0,takeoffAssist=false;
 const avatars=new Map(),panel=document.createElement('div');panel.id='sky-airship';panel.style.cssText='position:fixed;left:12px;bottom:100px;z-index:24;background:#211c2ae8;color:#ffe7b0;border:1px solid #b49760;border-radius:5px;padding:10px;font:15px AveriaSky,system-ui;max-width:260px';
 const stats=document.createElement('div'),label=document.createElement('label'),throttle=document.createElement('input');throttle.type='range';throttle.min=0;throttle.max=100;throttle.value=0;label.textContent='Gaz ';label.append(throttle);label.style.display='block';
 const takeoff=document.createElement('button');takeoff.textContent='Décoller';takeoff.onclick=()=>{throttle.value='100';takeoffAssist=true;};
 const reset=document.createElement('button');reset.textContent='Retour piste';reset.onclick=()=>queue('flight_reset');
 const help=document.createElement('details'),title=document.createElement('summary');title.textContent='Commandes';help.append(title,document.createTextNode('↑/↓ : cabrer/piquer · ←/→ : incliner · Maj/Ctrl : gaz. ZQSD ou WASD aussi. Clic droit : caméra.'));
 const touch=document.createElement('div');touch.style.cssText='display:flex;gap:5px;margin-top:8px';const held={pitch:0,roll:0};
 for(const [text,axis,value]of [['←','roll',-1],['↑','pitch',1],['↓','pitch',-1],['→','roll',1]]){const b=document.createElement('button');b.textContent=text;b.style.cssText='min-width:42px;min-height:42px;touch-action:none';b.onpointerdown=e=>{held[axis]=value;b.setPointerCapture(e.pointerId);};b.onpointerup=b.onpointercancel=()=>held[axis]=0;touch.append(b);}
 const touchStyle=document.createElement('style');touchStyle.textContent='#sky-airship button{background:#f3dfb4;color:#332319;border:0;border-radius:3px;padding:6px;margin:3px;cursor:pointer}#sky-airship details{font:12px system-ui;max-width:250px;margin-top:6px}#sky-airship label{display:flex;align-items:center}#sky-airship input{max-width:170px}#sky-airship[data-connected=false]{opacity:.6}#sky-airship>div:last-child{display:none}@media(any-pointer:coarse),(max-width:600px){#sky-airship{bottom:14px;left:8px;padding:6px;max-width:235px;font-size:13px}#sky-airship>div:last-child{display:flex!important}#sky-airship details{display:none}}';
 panel.append(stats,label,takeoff,reset,help,touch);document.body.append(panel);document.head.append(touchStyle);
 function queue(type,text,rp){if(__ACTIVITY_PREVIEW__&&!new URLSearchParams(location.search).has('frame_id')&&type==='flight_reset'){physics.resetAirship(state,config.spawn);throttle.value='0';takeoffAssist=false;return true;}const action={id:crypto.randomUUID(),type,text,rp};if(actions.length<16){actions.push(action);notify();return true;}return false;}
 function controls(){const azerty=keyboardLayout()==='AZERTY',up=azerty?'z':'w',left=azerty?'q':'a';if(keys.has('ShiftLeft')||keys.has('ShiftRight'))throttle.value=String(Math.min(100,+throttle.value+30*DT));if(keys.has('ControlLeft')||keys.has('ControlRight'))throttle.value=String(Math.max(0,+throttle.value-30*DT));if(!state.grounded)takeoffAssist=false;return {pitch:held.pitch||((keys.has('ArrowUp')||keys.has(up)?1:0)-(keys.has('ArrowDown')||keys.has('s')?1:0))||(takeoffAssist&&state.pitch<.4?1:0),roll:held.roll||((keys.has('ArrowRight')||keys.has('d')?1:0)-(keys.has('ArrowLeft')||keys.has(left)?1:0)),throttle:+throttle.value/100};}
 function keydown(e){if(e.target.closest?.('input,textarea,select,[contenteditable]'))return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ControlLeft','ControlRight','Space'].includes(e.code))e.preventDefault();keys.add(e.code);keys.add(e.key.toLowerCase());}
 function keyup(e){keys.delete(e.code);keys.delete(e.key.toLowerCase());}function blur(){keys.clear();held.pitch=held.roll=0;drag=null;}
 function down(e){if(e.button===2||e.pointerType==='touch'){drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);}}
 function move(e){if(!drag||drag.id!==e.pointerId)return;orbit+=(e.clientX-drag.x)*.006;pitchOrbit=Math.max(-.15,Math.min(1.1,pitchOrbit-(e.clientY-drag.y)*.006));drag.x=e.clientX;drag.y=e.clientY;}
 function up(){drag=null;}function context(e){e.preventDefault();}
 function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}
 for(const [event,handler]of [['keydown',keydown],['keyup',keyup],['blur',blur],['resize',resize]])addEventListener(event,handler);
 for(const [event,handler]of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',up],['contextmenu',context]])canvas.addEventListener(event,handler);resize();
 const target=new THREE.Vector3();camera.position.set(state.x,state.y+40,state.z+25);
 function place(model,s){model.position.set(s.x,s.y,s.z);model.rotation.set(s.pitch,s.yaw,s.roll,'YXZ');}
 function frame(time){if(disposed)return;const delta=Math.min(.1,(time-last)/1000);last=time;accumulator+=delta;
  while(accumulator>=DT){accumulator-=DT;if(connected&&frames.length<180){const input=controls(),before=state.crashes;stepAirship(state,input,ground,config.spawn);frames.push({sequence:++sequence,controls:input});state.sequence=sequence;if(state.crashes>before){throttle.value='0';takeoffAssist=false;stats.textContent='Impact · retour sur la piste';noticeUntil=time+2500;}if(__ACTIVITY_PREVIEW__&&!new URLSearchParams(location.search).has('frame_id'))frames=[];}}
  place(ship,state);const speed=Math.hypot(state.vx,state.vz),angle=state.yaw+orbit,distance=24;
  target.set(state.x+Math.sin(angle)*distance*Math.cos(pitchOrbit),Math.max(state.y+6+Math.sin(pitchOrbit)*distance,(ground.floor(state.x,state.z)??state.y-40)+38),state.z+Math.cos(angle)*distance*Math.cos(pitchOrbit));camera.position.lerp(target,1-Math.exp(-delta*5));camera.lookAt(state.x,state.y+3,state.z);
  if(localId)avatars.set(localId,{mesh:ship,character,position:state,height:5,info:{height:5}});
  for(const r of remote.values()){r.model.position.lerp(new THREE.Vector3(r.target.x,r.target.y,r.target.z),1-Math.exp(-delta*10));r.model.quaternion.slerp(new THREE.Quaternion().setFromEuler(new THREE.Euler(r.target.pitch,r.target.yaw,r.target.roll,'YXZ')),1-Math.exp(-delta*10));}
  if(time>noticeUntil){const nearest=layout.regions.reduce((a,b)=>Math.hypot(a.center[0]-state.x,a.center[2]-state.z)<Math.hypot(b.center[0]-state.x,b.center[2]-state.z)?a:b);stats.textContent=`Lynx · ${Math.round(speed)} u/s · ${Math.round(state.y-(ground.floor(state.x,state.z)??ground.meta.minY))} m\n${state.grounded?'Au sol':speed<physics.STALL_SPEED?'Décrochage':'En vol'} · ${nearest.name}`;}
  sky.update(camera,{tint:[1,1,1]});dialogues.update(time,avatars,camera);renderer.render(scene,camera);requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);
 return {spawn:config.spawn,catalogue:{},onAction(fn){notify=fn;},onTerminal(){},onCraftCapture(){},setConnected(value){connected=value;panel.dataset.connected=String(value);if(!value)blur();},
  async me(player){localId=player.id;character=player.character;state={...(player.airship??initialAirship(config.spawn))};sequence=state.sequence;throttle.value=String(state.throttle*100);},
  async resetSession(player){frames=[];actions=[];await this.me(player);},
  position:()=>({x:state.x,y:state.y,z:state.z}),movement:()=>({flight:{frames:frames.map(f=>({...f,controls:{...f.controls}}))},sequence}),acknowledgeMovement(){},correct(){},
  async world(result){if(result.airship){const ack=result.airship.sequence,oldCrash=state.crashes;frames=frames.filter(f=>f.sequence>ack);state={...result.airship};for(const f of frames){stepAirship(state,f.controls,ground,config.spawn);state.sequence=f.sequence;}sequence=Math.max(sequence,ack);if(state.crashes>oldCrash){throttle.value='0';frames=[];sequence=ack;stats.textContent='Impact · retour sur la piste';noticeUntil=performance.now()+2500;}}
   if(actions[0]&&result.actionResult?.id===actions[0].id){const action=actions.shift();if(action.type==='flight_reset'){state={...result.airship};frames=[];sequence=state.sequence;throttle.value='0';takeoffAssist=false;}if(result.actionResult.error){stats.textContent=result.actionResult.error;noticeUntil=performance.now()+3000;}}
  },
  async sync(players){const present=new Set();for(const p of players){if(p.id===localId||!p.airship)continue;present.add(p.id);let r=remote.get(p.id);if(!r){const model=ship.clone(true);scene.add(model);r={model,target:p.airship};place(model,p.airship);remote.set(p.id,r);}r.target=p.airship;avatars.set(p.id,{mesh:r.model,character:p.character,position:r.target,height:5,info:{height:5}});}for(const [id,r]of remote)if(!present.has(id)){scene.remove(r.model);remote.delete(id);avatars.delete(id);}},
  messages:m=>dialogues.receive(m),speak:(text,rp)=>connected&&text.trim()?queue('say',text.trim(),rp):false,action:()=>actions[0],leaveDuel:()=>queue('leave_map'),captureNotice(text){stats.textContent=text;noticeUntil=performance.now()+3000;},
  ...(__ACTIVITY_PREVIEW__?{airshipState:()=>({...state}),setThrottle:value=>throttle.value=String(value*100),startFlight:()=>{throttle.value='100';takeoffAssist=true;},renderInfo:()=>({calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,camera:camera.position.toArray()})}:{}),
  dispose(){disposed=true;blur();for(const [event,handler]of [['keydown',keydown],['keyup',keyup],['blur',blur],['resize',resize]])removeEventListener(event,handler);for(const [event,handler]of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',up],['contextmenu',context]])canvas.removeEventListener(event,handler);panel.remove();touchStyle.remove();dialogues.dispose();sky.dispose();const materials=new Set(),textures=new Set();scene.traverse(o=>{o.geometry?.dispose();for(const m of [].concat(o.material??[])){materials.add(m);if(m.map)textures.add(m.map);}});for(const t of textures)t.dispose();for(const m of materials)m.dispose();renderer.dispose();}
 };
}
