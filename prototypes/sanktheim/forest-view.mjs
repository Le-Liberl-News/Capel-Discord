import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import forestry from './forestry.cjs';
const {TREES,growth,REACH}=forestry;
export function createForestView({T,model,asset,getState,getOwn,send,sounds,scale=2/3}){
 const root=new T.Group();root.name='sanktheim-forest';root.userData.noXRay=true;model.add(root);
 const views=new Map(),seen=new Set();let disposed=false,near=null,lastSound=0,lastRevision=-1,lastError=null,errorUntil=0;
 const button=document.createElement('button');button.id='siege-chop';button.hidden=true;button.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:35;padding:8px 12px;border:1px solid #b59b67;border-radius:5px;background:#182a2fee;color:#ffe7b0;font:13px system-ui';document.body.append(button);
 const request=()=>{const own=getOwn();if(own?.chopping)send({type:'forest',kind:'cancel'});else if(near)send({type:'forest',kind:'chop',tree:near.id});button.blur();};button.onclick=request;
 function key(e){if(e.code==='KeyX'&&!e.repeat&&!button.hidden&&!e.target.closest?.('input,textarea,[contenteditable=true]')){e.preventDefault();e.stopImmediatePropagation();request();}}
 document.addEventListener('keydown',key,true);
 const crossCanvas=document.createElement('canvas');crossCanvas.width=crossCanvas.height=64;const ctx=crossCanvas.getContext('2d');ctx.fillStyle='#c99f64';ctx.fillRect(0,0,64,64);ctx.strokeStyle='#8d663c';ctx.lineWidth=2;for(const r of [8,16,24,30]){ctx.beginPath();ctx.ellipse(32,32,r,r*.85,.15,0,Math.PI*2);ctx.stroke();}const crossMap=new T.CanvasTexture(crossCanvas);crossMap.colorSpace=T.SRGBColorSpace;
 const ready=new GLTFLoader().loadAsync(asset('/assets/sky/sanktheim/forest/trees.gltf')).then(g=>{if(disposed)return;for(const d of TREES){const tree=g.scene.getObjectByName(d.id);if(!tree)continue;tree.traverse(o=>{if(o.isMesh){o.raycast=()=>{};o.castShadow=true;}});root.add(tree);let bark=null;tree.traverse(o=>{for(const m of o.material?[].concat(o.material):[])if(m.map?.name?.endsWith('r01o0804.png'))bark=m;});const side=bark?.clone()??new T.MeshStandardMaterial({color:0x74512c});const top=new T.MeshStandardMaterial({map:crossMap,roughness:1});const stump=new T.Mesh(new T.CylinderGeometry(Math.max(.22,d.radius*.65),Math.max(.3,d.radius*.85),.32,9),[side,top,side]);stump.position.set(d.x,d.y+.16,d.z);stump.raycast=()=>{};stump.visible=false;root.add(stump);views.set(d.id,{tree,stump,d});}lastRevision=-1;}).catch(console.error);
 function update({time,avatars,dayNight}){
  const state=getState(),f=state.forestry;if(!f)return;const own=getOwn(),now=state.at;
  if(lastRevision!==f.revision){lastRevision=f.revision;dayNight.apply(root);}
  const states=new Map(f.trees.map(t=>[t.id,t]));near=null;let nearest=Infinity;
  for(const d of TREES){const s=states.get(d.id);if(!s)continue;const stage=growth(s,now),v=views.get(d.id);if(v){const age=s.cutAt==null?Infinity:now-s.cutAt,falling=age<4000;v.tree.position.set(d.x,d.y,d.z);v.tree.quaternion.identity();v.tree.scale.setScalar(stage/4);v.tree.visible=stage>0||falling;v.stump.visible=s.cutAt!=null&&stage<4;
    if(falling){const k=Math.min(1,age/2100),angle=k*k*Math.PI*.48,dir=new T.Vector3(Math.sin(s.fallAngle??0),0,Math.cos(s.fallAngle??0)),axis=new T.Vector3().crossVectors(new T.Vector3(0,1,0),dir);v.tree.scale.setScalar(1);v.tree.quaternion.setFromAxisAngle(axis,angle);}
  }
  if(own&&own.hp>0&&!own.pomControlled&&!own.climb&&!own.jump&&!own.turretControl&&stage===4&&(!s.worker||s.worker===own.id)){
    const distance=Math.hypot(own.x-d.x*scale,own.z-d.z*scale);if(Math.abs(own.y-d.y*scale)<1.6*scale&&distance<REACH*scale&&distance<nearest){near=d;nearest=distance;}
  }}
  const current=states.get(own?.chopping),chopping=current?.worker===own?.id;
  button.hidden=!chopping&&!near&&time>=errorUntil;button.textContent=time<errorUntil?lastError:chopping?`Coupe · ${Math.min(100,Math.floor(current.work/f.cutTime*100))} % · Annuler [X]`:near?`Couper cet arbre · 1 min · +${near.wood} bois [X]`:'';
  for(const p of state.players)if(p.chopping){const v=avatars.get(p.id),d=TREES.find(d=>d.id===p.chopping);if(v&&d){const beat=(time%900)/900,lean=Math.sin(beat*Math.PI*2)*.08;v.mesh.rotation.z+=lean;v.mesh.position.y+=Math.abs(Math.sin(beat*Math.PI*2))*.035;}}
  if(chopping&&time-lastSound>900){lastSound=time;sounds.play('siege-wall-hit',{gain:.13});}
  for(const e of state.events)if(e.type==='tree-felled'&&!seen.has(e.id)){seen.add(e.id);if(state.at-e.at<1200&&own){const gain=Math.max(0,1-Math.hypot(own.x-e.position.x,own.z-e.position.z)/25);if(gain)sounds.play('siege-wall-break',{gain:gain*.35});}}
 }
 return {ready,update,error(message){lastError=message;errorUntil=performance.now()+2500;},dispose(){disposed=true;root.removeFromParent();button.remove();document.removeEventListener('keydown',key,true);const materials=new Set();root.traverse(o=>{o.geometry?.dispose();for(const m of o.material?[].concat(o.material):[])materials.add(m);});const textures=new Set();for(const m of materials){if(m.map&&m.map!==crossMap)textures.add(m.map);m.dispose();}for(const map of textures)map.dispose();crossMap.dispose();}};
}
