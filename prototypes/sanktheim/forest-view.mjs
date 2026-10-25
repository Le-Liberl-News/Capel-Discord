import {loadNativeProp} from './native-prop.mjs';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import forestry from './forestry.cjs';
const {TREES,growth,REACH}=forestry;
export function createForestView({T,model,asset,getState,getOwn,send,sounds,scale=2/3}){
 const root=new T.Group();root.name='sanktheim-forest';root.userData.noXRay=true;model.add(root);
 const stoneMap=new T.TextureLoader().load(asset('/assets/sky/sanktheim/map/r41o0605.png'));stoneMap.colorSpace=T.SRGBColorSpace;stoneMap.magFilter=T.NearestFilter;stoneMap.repeat.set(.2,.2);stoneMap.offset.set(.4,.4);
 let axeTemplate=null;const axes=new Map();loadNativeProp(T,asset,'t03ono00',1.35).then(g=>axeTemplate=g).catch(console.error);
 const views=new Map(),seen=new Set();let disposed=false,near=null,lastSound=0,lastRevision=-1,lastError=null,errorUntil=0;
 const button=document.createElement('button');button.id='siege-chop';button.hidden=true;button.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:35;padding:8px 12px;border:1px solid #b59b67;border-radius:5px;background:#182a2fee;color:#ffe7b0;font:13px system-ui';document.body.append(button);
 const request=()=>{const own=getOwn();if(own?.chopping)send({type:'forest',kind:'cancel'});else if(near)send({type:'forest',kind:'chop',tree:near.id});button.blur();};button.onclick=request;
 function key(e){if(e.code==='KeyX'&&!e.repeat&&!button.hidden&&!e.target.closest?.('input,textarea,[contenteditable=true]')){e.preventDefault();e.stopImmediatePropagation();request();}}
 document.addEventListener('keydown',key,true);
 const crossCanvas=document.createElement('canvas');crossCanvas.width=crossCanvas.height=64;const ctx=crossCanvas.getContext('2d');ctx.fillStyle='#c99f64';ctx.fillRect(0,0,64,64);ctx.strokeStyle='#8d663c';ctx.lineWidth=2;for(const r of [8,16,24,30]){ctx.beginPath();ctx.ellipse(32,32,r,r*.85,.15,0,Math.PI*2);ctx.stroke();}const crossMap=new T.CanvasTexture(crossCanvas);crossMap.colorSpace=T.SRGBColorSpace;
 const ready=new GLTFLoader().loadAsync(asset('/assets/sky/sanktheim/forest/trees.gltf')).then(g=>{if(disposed)return;for(const d of TREES){const original=g.scene.getObjectByName(d.template??d.id)??root.getObjectByName(d.template??d.id);const tree=d.stone?new T.Mesh(new T.DodecahedronGeometry(d.radius,0),new T.MeshStandardMaterial({map:stoneMap,color:0xc8c8be,roughness:1})):d.template?original?.clone(true):original;if(!tree)continue;tree.traverse(o=>{if(o.isMesh){o.raycast=()=>{};o.castShadow=true;}});root.add(tree);let bark=null;tree.traverse(o=>{for(const m of o.material?[].concat(o.material):[])if(m.map?.name?.endsWith('r01o0804.png'))bark=m;});const side=d.stone?new T.MeshStandardMaterial({map:stoneMap,roughness:1}):bark?.clone()??new T.MeshStandardMaterial({color:0x74512c});const top=new T.MeshStandardMaterial({map:d.stone?stoneMap:crossMap,roughness:1});const stump=new T.Mesh(new T.CylinderGeometry(Math.max(.22,d.radius*.65),Math.max(.3,d.radius*.85),.32,9),[side,top,side]);stump.position.set(d.x,d.y+.16,d.z);stump.raycast=()=>{};stump.visible=false;root.add(stump);views.set(d.id,{tree,stump,d});}lastRevision=-1;}).catch(console.error);
 function update({time,avatars,dayNight}){
  const state=getState(),f=state.forestry;if(!f)return;const own=getOwn(),now=state.at;
  if(lastRevision!==f.revision){lastRevision=f.revision;dayNight.apply(root);}
  const states=new Map(f.trees.map(t=>[t.id,t]));near=null;let nearest=Infinity;
  for(const d of TREES){const s=states.get(d.id);if(!s)continue;const stage=growth(s,now),v=views.get(d.id);if(v){const age=s.cutAt==null?Infinity:now-s.cutAt,falling=age<4000;v.tree.position.set(d.x,d.y,d.z);v.tree.quaternion.identity();v.tree.scale.setScalar(stage/4);v.tree.visible=stage>0||falling;v.stump.visible=s.cutAt!=null&&stage<4;
    if(falling){const k=Math.min(1,age/2100),angle=k*k*Math.PI*.48,dir=new T.Vector3(Math.sin(s.fallAngle??0),0,Math.cos(s.fallAngle??0)),axis=new T.Vector3().crossVectors(new T.Vector3(0,1,0),dir);v.tree.scale.setScalar(1);v.tree.quaternion.setFromAxisAngle(axis,angle);}
  }
  if(own&&own.hp>0&&!own.pomControlled&&!own.vehicleControl&&!own.lynxControl&&!own.climb&&!own.jump&&!own.turretControl&&stage===4&&(!s.worker||s.worker===own.id)){
    const distance=Math.hypot(own.x-d.x*scale,own.z-d.z*scale);if(Math.abs(own.y-d.y*scale)<1.6*scale&&distance<REACH*scale&&distance<nearest){near=d;nearest=distance;}
  }}
  const current=states.get(own?.chopping),chopping=current?.worker===own?.id;
  button.hidden=!chopping&&!near&&time>=errorUntil;button.textContent=time<errorUntil?lastError:chopping?`${TREES.find(d=>d.id===own?.chopping)?.stone?'Extraction':'Coupe'} · ${Math.min(100,Math.floor(current.work/f.cutTime*100))} % · Annuler [X]`:near?`${near.stone?'Extraire la pierre':'Couper cet arbre'} · 8 s · +${near.stone??near.wood} ${near.stone?'pierre':'bois'} [X]`:'';
  const active=new Set();for(const p of state.players)if(p.chopping){const v=avatars.get(p.id),d=TREES.find(d=>d.id===p.chopping);if(v&&d){const beat=(time%900)/900,lean=Math.sin(beat*Math.PI*2)*.08;v.mesh.rotation.z+=lean;v.mesh.position.y+=Math.abs(Math.sin(beat*Math.PI*2))*.035;
    if(axeTemplate){active.add(p.id);let axe=axes.get(p.id);if(!axe){axe=new T.Group();const prop=axeTemplate.clone(true);prop.position.y=-1.05;axe.add(prop);root.add(axe);axes.set(p.id,axe);}const dx=d.x-p.x/scale,dz=d.z-p.z/scale,angle=Math.atan2(dx,dz);axe.position.set(p.x/scale+Math.cos(angle)*.45,p.y/scale+1.2,p.z/scale-Math.sin(angle)*.45);axe.rotation.set(0,angle,0);axe.rotateX(-.8+Math.sin(beat*Math.PI*2)*1.05);}
  }}for(const [id,axe]of axes)if(!active.has(id)){axe.removeFromParent();axes.delete(id);}

  if(chopping&&time-lastSound>900){lastSound=time;sounds.play('siege-wall-hit',{gain:.13,position:own});}
  for(const e of state.events)if(e.type==='tree-felled'&&!seen.has(e.id)){seen.add(e.id);if(state.at-e.at<1200&&own){const gain=Math.max(0,1-Math.hypot(own.x-e.position.x,own.z-e.position.z)/25);if(gain)sounds.play('siege-wall-break',{gain:.35,position:e.position});}}
 }
 return {ready,update,error(message){lastError=message;errorUntil=performance.now()+2500;},dispose(){disposed=true;root.removeFromParent();button.remove();document.removeEventListener('keydown',key,true);const materials=new Set();root.traverse(o=>{o.geometry?.dispose();for(const m of o.material?[].concat(o.material):[])materials.add(m);});const textures=new Set();for(const m of materials){if(m.map&&m.map!==crossMap)textures.add(m.map);m.dispose();}for(const map of textures)map.dispose();crossMap.dispose();}};
}
