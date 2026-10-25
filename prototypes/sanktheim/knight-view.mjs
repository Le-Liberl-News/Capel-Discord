import knightFling from './knight-fling.cjs';
// The pom knight (knight.cjs): a three-metre knight in black, gold-trimmed plate, broad pauldrons and a skirt of
// plates, a crimson cape with its hood down, a long lance with a red tassel, the gait of a wuxia general, and, where a
// helm should be, a pom's head, always facing the eye. It walks slowly and heavily, sweeps its lance at whoever stands
// in its way, thrusts it into the gate, and falls when brought down.
const STEP=2200,STRIKE=700;
function buildKnight(T,headMap){
 const armor=new T.MeshStandardMaterial({color:0x22252c,metalness:.85,roughness:.32}),plate=new T.MeshStandardMaterial({color:0x2d3139,metalness:.8,roughness:.28});
 const gold=new T.MeshStandardMaterial({color:0xb48c3c,metalness:.9,roughness:.25}),leather=new T.MeshStandardMaterial({color:0x2a2320,roughness:.85});
 const cloth=new T.MeshStandardMaterial({color:0x4a0f18,roughness:.92,side:T.DoubleSide}),sash=new T.MeshStandardMaterial({color:0x8e1220,roughness:.85,side:T.DoubleSide}),steel=new T.MeshStandardMaterial({color:0xd5dce2,metalness:.95,roughness:.16}),tassel=new T.MeshStandardMaterial({color:0xc4141f,roughness:.8});
 const mesh=(geometry,material,x=0,y=0,z=0)=>{const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;return m;};
 const root=new T.Group(),body=new T.Group();root.add(body);root.userData.noXRay=true;
 // legs: thigh and shin on hip and knee pivots, flared knee guards, pointed sabatons
 const legs=[-1,1].map(side=>{const hip=new T.Group();hip.position.set(side*.22,1.4,0);body.add(hip);
  hip.add(mesh(new T.CylinderGeometry(.19,.15,.72,12),armor,0,-.36,0));
  const knee=new T.Group();knee.position.y=-.72;hip.add(knee);
  const guard=mesh(new T.ConeGeometry(.17,.3,8,1,true),gold,0,.02,.1);guard.rotation.x=-Math.PI/2+.25;knee.add(guard);
  knee.add(mesh(new T.CylinderGeometry(.15,.12,.64,12),plate,0,-.33,0));
  const boot=mesh(new T.BoxGeometry(.26,.16,.42),armor,0,-.66,.07);knee.add(boot);const tip=mesh(new T.ConeGeometry(.12,.24,4),armor,0,-.66,.38);tip.rotation.x=Math.PI/2;tip.rotation.y=Math.PI/4;tip.scale.y=.9;knee.add(tip);
  return {hip,knee};});
 // hips and a long skirt of plates
 body.add(mesh(new T.BoxGeometry(.74,.32,.48),plate,0,1.46,0));
 for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2,p=mesh(new T.BoxGeometry(.3,.6,.05),i%2?armor:plate,Math.sin(a)*.38,1.12,Math.cos(a)*.29);p.rotation.y=a;p.rotation.x=.16;body.add(p);const rim=mesh(new T.BoxGeometry(.3,.04,.06),gold,Math.sin(a)*.42,.85,Math.cos(a)*.33);rim.rotation.y=a;body.add(rim);}
 // the red sash hanging in front (it sways: update)
 const sashes=[-1,1].map(side=>{const g=new T.PlaneGeometry(.16,.85,1,6);g.translate(0,-.42,0);const m=mesh(g,sash,side*.09,1.5,.3);m.rotation.y=side*.08;body.add(m);return m;});
 // the abdomen in bands, the chest broad above a narrow waist, pectoral plates and a gold ridge
 for(let i=0;i<3;i++)body.add(mesh(new T.CylinderGeometry(.35+i*.02,.34+i*.02,.11,12),i%2?armor:plate,0,1.62+i*.11,0)).scale.z=.72;
 for(const c of body.children.slice(-3))c.scale.z=.72;
 const chest=mesh(new T.CylinderGeometry(.56,.38,.62,12),armor,0,2.12,0);chest.scale.z=.7;body.add(chest);
 for(const side of [-1,1]){const pec=mesh(new T.BoxGeometry(.44,.36,.1),plate,side*.21,2.17,.29);pec.rotation.y=side*-.32;pec.rotation.x=-.12;body.add(pec);}
 body.add(mesh(new T.BoxGeometry(.06,.5,.08),gold,0,2.13,.36));body.add(mesh(new T.CylinderGeometry(.22,.27,.18,12),plate,0,2.5,0));
 // the hood, down on the nape, and the long cape from the shoulders to the ground (animated in update)
 const hood=mesh(new T.TorusGeometry(.3,.13,8,18,Math.PI*1.25),cloth,0,2.5,-.14);hood.rotation.set(Math.PI/2+.35,0,Math.PI*-.125+Math.PI);body.add(hood);
 const capeGeometry=new T.PlaneGeometry(1.6,2.5,8,16);capeGeometry.translate(0,-1.25,0);const cape=mesh(capeGeometry,cloth,0,2.46,-.36);body.add(cape);
 const capeRest=capeGeometry.attributes.position.array.slice();
 // pauldrons: big, layered, a gold ridge and a horn on each
 for(const side of [-1,1]){for(const [r,y]of [[.42,2.4],[.35,2.24]]){const p=mesh(new T.SphereGeometry(r,16,8,0,Math.PI*2,0,Math.PI/2),plate,side*.66,y,0);p.scale.set(1,.72,.95);body.add(p);const rim=mesh(new T.TorusGeometry(r*.98,.026,6,24),gold,side*.66,y,0);rim.rotation.x=Math.PI/2;body.add(rim);}
  const ridge=mesh(new T.BoxGeometry(.05,.14,.66),gold,side*.66,2.64,0);body.add(ridge);
  const horn=mesh(new T.ConeGeometry(.07,.5,6),gold,side*.86,2.78,-.04);horn.rotation.z=side*-.55;body.add(horn);}
 // arms: shoulder and elbow pivots; heavy gauntlets; the right hand holds the lance
 const arms=[-1,1].map(side=>{const shoulder=new T.Group();shoulder.position.set(side*.68,2.3,0);body.add(shoulder);
  shoulder.add(mesh(new T.CylinderGeometry(.13,.12,.56,10),armor,0,-.3,0));const elbow=new T.Group();elbow.position.y=-.58;shoulder.add(elbow);
  elbow.add(mesh(new T.SphereGeometry(.12,10,8),gold));elbow.add(mesh(new T.CylinderGeometry(.13,.11,.5,10),plate,0,-.26,0));elbow.add(mesh(new T.BoxGeometry(.22,.24,.24),armor,0,-.6,0));
  return {shoulder,elbow};});
 // the lance: a long dark shaft, a gold guard, a steel blade and the red tassel under it
 const lance=new T.Group();lance.position.set(0,-.62,.04);arms[1].elbow.add(lance);
 lance.add(mesh(new T.CylinderGeometry(.04,.045,4.4,8),leather,0,1.1,0));lance.add(mesh(new T.CylinderGeometry(.08,.08,.09,8),gold,0,3.3,0));
 const blade=mesh(new T.ConeGeometry(.1,.7,4),steel,0,3.7,0);blade.scale.z=.35;lance.add(blade);
 const tassels=[];for(let i=0;i<6;i++){const t=mesh(new T.ConeGeometry(.03,.48,4),tassel,Math.sin(i*1.1)*.06,3.06,Math.cos(i*1.1)*.06);t.rotation.x=Math.PI;lance.add(t);tassels.push(t);}
 // the head: a pom, big for the armour, always facing the eye (update)
 const head=new T.Mesh(new T.PlaneGeometry(1.3,1.3),new T.MeshBasicMaterial({map:headMap,transparent:true,alphaTest:.08,side:T.DoubleSide}));head.position.set(0,3.12,.04);root.add(head);
 return {root,body,legs,arms,lance,tassels,sashes,cape,capeRest,head};
}
export function createKnightView({T,scene,asset,getState,getOwn,sounds,dayNight,sun}){
 const knights=new Map(),loading=new Set(),seen=new Set(),loader=new T.TextureLoader();let shakeUntil=0,shakeFrom=0,shakeGain=0;
 function load(e){loading.add(e.id);loader.loadAsync(asset('/assets/sky/chat/pom-tiron.png')).then(map=>{   // a plain pom-tiron, nobody in particular

  map.colorSpace=T.SRGBColorSpace;const v=buildKnight(T,map);
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=64;const label=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(canvas),transparent:true,depthTest:true,depthWrite:false}));label.position.y=4.75;label.scale.set(3.4,.85,1);v.root.add(label);v.health={canvas,label,last:null};
  v.root.scale.setScalar(.95);scene.add(v.root);sun?.apply?.(v.root);dayNight?.apply?.(v.root);knights.set(e.id,v);}).catch(console.error);}
 function health(v,e){if(v.health.last===e.hp)return;v.health.last=e.hp;const c=v.health.canvas.getContext('2d');c.clearRect(0,0,256,64);c.textAlign='center';c.font='bold 20px sans-serif';c.fillStyle='#e9d6a4';c.fillText('Chevalier pom',128,22);c.fillStyle='#1d1416';c.fillRect(20,30,216,13);c.fillStyle='#b5303c';c.fillRect(20,30,216*Math.max(0,e.hp/e.maxHP),13);c.font='16px sans-serif';c.fillStyle='white';c.fillText(Math.ceil(e.hp)+' / '+e.maxHP,128,61);v.health.label.material.map.needsUpdate=true;}
 function update({time,camera,avatars,serverAt}){
  const state=getState(),own=getOwn(),eye=camera.getWorldPosition(new T.Vector3());
  for(const e of state.enemies.filter(e=>e.knight)){
   let v=knights.get(e.id);if(!v){if(!loading.has(e.id))load(e);continue;}
   const p=avatars.get(e.id)?.position??e;v.root.position.set(p.x,p.y,p.z);health(v,e);
   const heading=Math.atan2(e.heading?.dx??1,e.heading?.dz??0);v.root.rotation.y+=Math.atan2(Math.sin(heading-v.root.rotation.y),Math.cos(heading-v.root.rotation.y))*.08;
   // the fall
   if(e.hp<=0){v.fallAt??=time;const k=Math.min(1,(time-v.fallAt)/1400);v.body.rotation.x=-k*k*1.35;v.body.position.y=-k*.4;v.head.position.y=2.98-k*2.1;v.head.position.z=-k*1.9;v.health.label.visible=false;v.root.visible=time-v.fallAt<9000;continue;}
   // the walk: a slow, heavy stride
   const walking=e.moving,phase=walking?(time%STEP)/STEP*Math.PI*2:0,swing=walking?Math.sin(phase)*.36:0;
   v.legs[0].hip.rotation.x=swing;v.legs[1].hip.rotation.x=-swing;v.legs[0].knee.rotation.x=walking?Math.max(0,-Math.sin(phase))*.55:0;v.legs[1].knee.rotation.x=walking?Math.max(0,Math.sin(phase))*.55:0;
   v.body.position.y=walking?Math.abs(Math.cos(phase))*-.06:0;v.body.rotation.z=walking?Math.sin(phase)*.03:0;
   v.arms[0].shoulder.rotation.x=-swing*.6;
   // the lance: held slanted forward; swept at whoever is struck, thrust into the gate
   const struck=e.strikeAt!=null?serverAt-e.strikeAt:Infinity;
   const [left,right]=v.arms;
   if(struck<STRIKE){const k=struck/STRIKE;if(e.atGate){right.shoulder.rotation.set(-1.35,0,0);right.elbow.rotation.x=-.2+Math.sin(k*Math.PI)*.2;v.lance.rotation.x=-1.4;v.lance.position.z=.04+Math.sin(k*Math.PI)*1.1;}else{right.shoulder.rotation.set(-1.2,(k-.5)*2.8,0);right.elbow.rotation.x=0;v.lance.rotation.x=-1.45;v.lance.position.z=.04;}}
   // at rest the lance stands upright by the knight, as a general's; it leans forward as it walks
   else{right.shoulder.rotation.set(-.32,0,.08);right.elbow.rotation.x=-.55;v.lance.rotation.x=.87-(walking?.32:0);v.lance.position.z=.04;}
   left.elbow.rotation.x=-.25;
   for(const [i,m]of v.sashes.entries())m.rotation.x=.08+Math.sin(time*.003+i*1.7)*.08+(walking?Math.abs(Math.sin(phase))*.18:0);
   // the head faces the eye
   const head=v.head.getWorldPosition(new T.Vector3());v.head.rotation.y=Math.atan2(eye.x-head.x,eye.z-head.z)-v.root.rotation.y;
   // the cape and the tassel sway
   const pos=v.cape.geometry.attributes.position,rest=v.capeRest;for(let i=0;i<pos.count;i++){const x=rest[i*3],y=rest[i*3+1],down=-y/2.05;pos.setZ(i,rest[i*3+2]-x*x*.25-down*down*.25-down*(Math.sin(time*.0022+x*2+y*1.5)*.12+(walking?.18+Math.sin(phase*2)*.06:0)));}pos.needsUpdate=true;v.cape.geometry.computeVertexNormals();
   for(const [i,t]of v.tassels.entries())t.rotation.z=Math.sin(time*.004+i)*.25;
   // its steps shake the ground under the nearest
   if(walking&&own){const d=Math.hypot(own.x-e.x,own.z-e.z);if(d<14){const k=(1-d/14)*Math.max(0,Math.cos(phase*2))**8;camera.translateY(-.05*k);}}
  }
  for(const [id,v]of knights)if(!state.enemies.some(e=>e.id===id)){scene.remove(v.root);v.root.traverse(o=>{o.geometry?.dispose();for(const m of [].concat(o.material??[])){m.map?.dispose();m.dispose();}});knights.delete(id);loading.delete(id);}
  // the flung: their own client flies them, every client spins them
  for(const p of state.players.filter(p=>p.knightFling)){const avatar=avatars.get(p.id);if(!avatar)continue;const pose=knightFling.flingPose(p.knightFling,serverAt,2/3);if(pose.done)continue;if(p.id===own?.id)avatar.position.set(pose.x,pose.y,pose.z);if(avatar.mesh)avatar.mesh.rotation.z=pose.spin;}
  for(const e of state.events){if(seen.has(e.id)||!['knight-strike','knight-smash','knight-gate-strike','knight-arrival','knight-fall'].includes(e.type))continue;seen.add(e.id);if(state.at-e.at>1500)continue;const p=e.position??{x:0,y:0,z:0};
   if(e.type==='knight-strike'||e.type==='knight-smash'||e.type==='knight-gate-strike')sounds?.play('siege-wall-hit',{gain:e.type==='knight-strike'?1:.8,position:p});
   if(e.type==='knight-strike'&&e.to===own?.id){shakeFrom=time;shakeUntil=time+700;shakeGain=1;}
   if(e.type==='knight-gate-strike'&&own&&Math.hypot(own.x-p.x,own.z-p.z)<25){shakeFrom=time;shakeUntil=time+300;shakeGain=.35;}
  }
  if(time<shakeUntil){const k=(shakeUntil-time)/(shakeUntil-shakeFrom)*shakeGain;camera.translateX(Math.sin(time*.08)*.3*k);camera.translateY(Math.cos(time*.1)*.38*k);}
 }
 return {update};
}
