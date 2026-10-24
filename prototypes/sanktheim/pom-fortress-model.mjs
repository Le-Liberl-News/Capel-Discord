// The pom-tiron's walking fortress, a siege boss for Sanktheim: the pom-tiron itself in salvaged armour (a wide ball
// of orange plates, dented like a ball of wool, a dark face set in the armour, two headlights for eyes), standing on
// six spider legs; on top, a flat deck with a railing all around, for a crew of poms; flamethrowers under its belly
// (they turn toward whoever comes too close) and a missile pod on each flank. Low-poly (PS1 / PSP, as in Sky): the
// Lynx's armour textures turned grey (assets/pom-fortress/), tinted by vertex colour; what glows is unlit. The
// origin is the ground under the body; it faces +Z and is about 24 units tall, twice the wall.
// createPomFortress(T,{seed,textures:{plates,panels,hatch,grille,fire},missile,onStep,onMissile})
//  -> {root,hull,crew,effects,animate(seconds,{walking,target}),SPEED}
// hull: the body's group, which the crew's sprites join, at the points of `crew` (hull coordinates, on the deck).
// While walking it lifts one leg at a time, slowly; its root has to move forward (+Z) at SPEED units a second for
// the planted feet to stay put, and onStep(leg,worldPosition) is called as each foot lands (to shake the ground).
// target: a world position (the nearest player); within FIRE_REACH of a flamethrower it turns toward it, else it
// burns the ground under it; within LIGHT_REACH the headlights follow it, else they sweep around like a prison's
// searchlights. textures.fire is the game's fire (effects/fire-frames.png, four frames): the jets are made
// of it. What only plays at run time (fire, light beams, lights) is marked userData.effect.
// Within MISSILE_REACH, the pods turn toward the target and fire homing missiles in turn (missile: the tank's
// native missile, facing +Z, cloned for each; else a plain one). They fly in `effects`, a group for the scene
// itself (not the fortress: they leave it), and onMissile(worldPosition) is called where each one bursts.
export const TEXTURES=['plates','panels','hatch','grille'],FIRE_REACH=26,LIGHT_REACH=45,MISSILE_REACH=70;

export function createPomFortress(T,{seed=7,textures={},missile=null,onStep=()=>{},onMissile=()=>{}}={}){
 const rng=seeded(seed),pick=list=>list[Math.floor(rng()*list.length)],jitter=a=>(rng()*2-1)*a;
 const root=new T.Group();root.name='pom-fortress';
 const body=new T.Group();body.name='body';root.add(body);
 for(const [name,map] of Object.entries(textures)){map.colorSpace=T.SRGBColorSpace;if(name!=='fire')map.wrapS=map.wrapT=T.RepeatWrapping;}
 const material=(name,map)=>{const m=new T.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:.8,metalness:.2,side:T.DoubleSide,map:map??null});m.name=name;return m;};
 const plates=material('plates',textures.plates),panels=material('panels',textures.panels),hatch=material('hatch',textures.hatch),grille=material('grille',textures.grille);
 const glow=(color,name,extra={})=>Object.assign(new T.MeshBasicMaterial({color,...extra}),{name});
 const lamp=glow(0xff3424,'headlight'),heat=glow(0xffb52e,'heat');
 const beamMaterial=glow(0xff2a18,'beam',{transparent:true,opacity:.09,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending});
 const effect=object=>{object.userData.effect=true;return object;};
 // the tints: the textures are grey, around .55, so the colours are brighter than meant
 const C={orange:0xff8a2a,ember:0xe8561c,burnt:0xb8461c,light:0xffb048,bronze:0xb08850,dark:0x55525a,gun:0x7a7570,deck:0x8a8378,
  face:0x4a4258,faceDark:0x332d40,rivet:0x3a383c,red:0xd03020,white:0xf0eadc};

 // every triangle its colour (a choice, or a function of its centre) and box-projected UVs, `scale` texture
 // repeats a unit
 function paint(geometry,colors,{noise=.06,scale=1/6}={}){
  const g=geometry.index?geometry.toNonIndexed():geometry,p=g.attributes.position,out=new Float32Array(p.count*3),uv=new Float32Array(p.count*2);
  const c=new T.Color(),a=new T.Vector3(),b=new T.Vector3(),d=new T.Vector3(),n=new T.Vector3(),centre=new T.Vector3();
  for(let i=0;i<p.count;i+=3){
   a.fromBufferAttribute(p,i);b.fromBufferAttribute(p,i+1);d.fromBufferAttribute(p,i+2);
   centre.copy(a).add(b).add(d).divideScalar(3);n.copy(b).sub(a).cross(d.clone().sub(a));
   const ax=Math.abs(n.x),ay=Math.abs(n.y),az=Math.abs(n.z);
   [a,b,d].forEach((v,j)=>{const [u,w]=ax>=ay&&ax>=az?[v.z,v.y]:ay>=az?[v.x,v.z]:[v.x,v.y];uv[(i+j)*2]=u*scale;uv[(i+j)*2+1]=w*scale;});
   const v=typeof colors==='function'?colors(centre,i/3):Array.isArray(colors)?pick(colors):colors;c.set(v);
   const k=1+jitter(noise);for(let j=0;j<3;j++)out.set([c.r*k,c.g*k,c.b*k],(i+j)*3);
  }
  g.setAttribute('color',new T.BufferAttribute(out,3));g.setAttribute('uv',new T.BufferAttribute(uv,2));g.computeVertexNormals();return g;
 }
 const mesh=(geometry,m,name,parent=body)=>{const o=new T.Mesh(geometry,m);if(name)o.name=name;parent.add(o);return o;};
 const shake=(geometry,a)=>{const p=geometry.attributes.position;for(let i=0;i<p.count;i++)p.setXYZ(i,p.getX(i)+jitter(a),p.getY(i)+jitter(a),p.getZ(i)+jitter(a));return geometry;};
 const Y=new T.Vector3(0,1,0),Z=new T.Vector3(0,0,1);
 const face=(object,normal,axis=Y)=>{object.quaternion.setFromUnitVectors(axis,normal.clone().normalize());return object;};
 // +Y along dir, +Z as close to hint as it can
 const basis=new T.Matrix4();
 function orient(object,dir,hint){
  const y=dir.clone().normalize(),z=hint.clone().addScaledVector(y,-hint.dot(y));
  if(z.lengthSq()<1e-6)z.set(1,0,0).addScaledVector(y,-y.x);
  z.normalize();object.quaternion.setFromRotationMatrix(basis.makeBasis(y.clone().cross(z),y,z));return object;
 }
 function beam(a,b,w,d,color,m=panels,parent=body,name){
  const dir=b.clone().sub(a),o=mesh(paint(new T.BoxGeometry(w,dir.length(),d),color),m,name,parent);
  o.position.copy(a).add(b).multiplyScalar(.5);face(o,dir);return o;
 }

 // the body: a wide ball, dented like a ball of wool, its top cut off for a deck
 const R=7,SX=1.3,SZ=1.05,SQUASH=.86,BC=14,LON=24,LAT=14,DECK=R*SQUASH*.74;
 const hull=new T.Group();hull.name='hull';hull.position.y=BC;body.add(hull);
 const sphere=new T.SphereGeometry(R,LON,LAT),bumps=Array.from({length:110},()=>({at:new T.Vector3(jitter(1),jitter(1),jitter(1)).normalize(),size:.88+rng()*.06,amount:.06+rng()*.07}));
 {
  const p=sphere.attributes.position,v=new T.Vector3();
  for(let i=0;i<p.count;i++){
   v.fromBufferAttribute(p,i);const dir=v.clone().normalize();let k=1;
   for(const b of bumps){const c=dir.dot(b.at);if(c>b.size)k+=b.amount*Math.sin((c-b.size)/(1-b.size)*Math.PI/2);}
   v.multiplyScalar(k);p.setXYZ(i,v.x*SX,v.y*SQUASH,v.z*SZ);
  }
 }
 // the armour is open where the face sits (the face's own frame covers the edges); it is cut exactly at the deck's
 // height (each triangle clipped by the plane), and the cut's outline is kept, for the deck to fill it
 const shell=sphere.toNonIndexed(),kept=[],sp=shell.attributes.position.array,cut=[];
 for(let i=0;i<sp.length;i+=9){
  const tri=[0,3,6].map(k=>new T.Vector3(sp[i+k],sp[i+k+1],sp[i+k+2])),centre=tri[0].clone().add(tri[1]).add(tri[2]).divideScalar(3);
  if(centre.z>3&&Math.abs(centre.x)<3.7&&Math.abs(centre.y+.5)<3.2)continue;
  const poly=[];
  tri.forEach((a,k)=>{const b=tri[(k+1)%3],ain=a.y<=DECK,bin=b.y<=DECK;if(ain)poly.push(a);
   if(ain!==bin){const at=a.clone().lerp(b,(DECK-a.y)/(b.y-a.y));at.y=DECK;poly.push(at);cut.push(at);}});
  for(let k=1;k<poly.length-1;k++)for(const v of [poly[0],poly[k],poly[k+1]])kept.push(v.x,v.y,v.z);
 }
 shell.setAttribute('position',new T.Float32BufferAttribute(kept,3));shell.deleteAttribute('normal');shell.deleteAttribute('uv');
 // the outline, around the vertical axis, and its radius at any angle
 const outline=[];
 for(const v of cut.sort((a,b)=>Math.atan2(a.z,a.x)-Math.atan2(b.z,b.x)))
  if(!outline.length||outline.at(-1).distanceTo(v)>.05)outline.push(v);
 const edgeAt=angle=>{
  const n=outline.length,angles=outline.map(v=>Math.atan2(v.z,v.x));let k=angles.findIndex(a=>a>angle);if(k<0)k=0;
  const a=outline[(k-1+n)%n],b=outline[k],a0=angles[(k-1+n)%n],a1=angles[k]+(k===0?Math.PI*2:0),t=((angle<a0?angle+Math.PI*2:angle)-a0)/Math.max(1e-6,a1-a0);
  return Math.hypot(a.x,a.z)*(1-t)+Math.hypot(b.x,b.z)*t;
 };
 const onEdge=(angle,inset=0,y=DECK)=>{const r=edgeAt(angle)-inset;return new T.Vector3(Math.cos(angle)*r,y,Math.sin(angle)*r);};
 const patches=new Map();
 mesh(paint(shell,centre=>{
  const key=Math.floor(Math.atan2(centre.z,centre.x)*2.4)+':'+Math.floor(centre.y/2.4);
  if(!patches.has(key))patches.set(key,pick([C.orange,C.orange,C.orange,C.orange,C.ember,C.ember,C.burnt,C.light,C.bronze]));
  return patches.get(key);
 },{noise:.07,scale:1/4}),plates,'hull-shell',hull);
 // the whole ball, for finding the surface (the face's hole would let rays through)
 const probe=new T.Mesh(sphere);probe.position.copy(hull.position);probe.updateMatrixWorld(true);
 const ray=new T.Raycaster();
 // a point of the hull toward dir (hull coordinates), and its normal; off the axis, the poles are degenerate
 function surface(dir){
  const d=dir.clone().add(new T.Vector3(.013,0,.017)).normalize();ray.set(d.clone().multiplyScalar(40).add(hull.position),d.clone().negate());
  const hit=ray.intersectObject(probe)[0];if(!hit)return {point:d.multiplyScalar(R),normal:d};
  return {point:hit.point.sub(hull.position),normal:hit.face.normal.clone().normalize()};
 }
 const inFace=d=>d.z>.35&&Math.abs(d.x)<.55&&d.y>-.55&&d.y<.45;

 // the deck: a plated floor, a hatch, a railing all around; the crew stands on it
 // the floor fills the cut exactly: a fan from the centre to its outline
 const DX=edgeAt(0),DZ=edgeAt(Math.PI/2),fan=[];
 for(let k=0;k<outline.length;k++){const a=outline[k],b=outline[(k+1)%outline.length];fan.push(0,DECK,0,b.x,DECK,b.z,a.x,DECK,a.z);}
 const floor=new T.BufferGeometry();floor.setAttribute('position',new T.Float32BufferAttribute(fan,3));
 mesh(paint(floor,()=>pick([C.deck,C.deck,C.gun,C.bronze]),{scale:1/3,noise:.05}),panels,'deck',hull);
 const ring=(inset,y,count=48)=>new T.CatmullRomCurve3(Array.from({length:count},(_,k)=>onEdge(k/count*Math.PI*2,inset,y)),true);
 mesh(paint(new T.TubeGeometry(ring(0,DECK+.05),64,.4,5,true),[C.bronze,C.burnt,C.dark],{scale:1/2}),plates,'deck-rim',hull);
 const trap=mesh(paint(new T.BoxGeometry(2.4,.25,2.4),C.gun,{scale:1/2.4}),hatch,'deck-hatch',hull);trap.position.set(0,DECK+.12,-DZ*.45);
 for(let k=0;k<32;k++){
  const post=mesh(paint(new T.BoxGeometry(.2,1.9,.2),C.dark),panels,'railing',hull);post.position.copy(onEdge(k/32*Math.PI*2,.55,DECK+.95));
 }
 for(const [y,r] of [[DECK+1.85,.12],[DECK+1.05,.08]])
  mesh(paint(new T.TubeGeometry(ring(.55,y),64,r,4,true),[C.bronze,C.dark],{scale:1/2}),panels,'railing',hull);
 const crew=[[0,.15],[-.42,.3],[.42,.3],[-.55,-.25],[.55,-.25],[.18,-.5],[-.2,-.05]].map(([x,z])=>new T.Vector3(x*DX,DECK+.05,z*DZ));

 // the face, as on the pom-tiron: a dark rounded window in the armour, its rim; the eyes are headlights, on swivels
 const eyes=[];
 {
  const {point,normal}=surface(new T.Vector3(0,-.08,1)),front=new T.Group();front.name='face';front.position.copy(point).addScaledVector(normal,-.35);face(front,normal,Z);hull.add(front);
  const rounded=(w,h,r)=>{const s=new T.Shape();s.moveTo(-w+r,-h);s.lineTo(w-r,-h);s.quadraticCurveTo(w,-h,w,-h+r);s.lineTo(w,h-r);s.quadraticCurveTo(w,h,w-r,h);s.lineTo(-w+r,h);s.quadraticCurveTo(-w,h,-w,h-r);s.lineTo(-w,-h+r);s.quadraticCurveTo(-w,-h,-w+r,-h);return s;};
  // bent along the hull, so that it follows its curves (wider than high)
  const bend=(geometry,rx=R*SX,ry=R*SQUASH)=>{const p=geometry.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
   p.setXYZ(i,Math.sin(x/rx)*(rx+z),Math.sin(y/ry)*(ry+z),(Math.cos(x/rx)-1)*rx+(Math.cos(y/ry)-1)*ry+z);}return geometry;};
  mesh(paint(bend(new T.ExtrudeGeometry(rounded(3.2,2.6,1.3),{depth:.4,bevelEnabled:false,curveSegments:3})),c=>c.y>1.6?C.faceDark:C.face,{noise:.05,scale:1/4}),panels,'face-window',front);
  const frame=new T.Shape(rounded(4,3.4,1.8).getPoints(3));frame.holes.push(new T.Path(rounded(3.2,2.6,1.3).getPoints(3).reverse()));
  mesh(paint(bend(new T.ExtrudeGeometry(frame,{depth:3,bevelEnabled:false,curveSegments:3}).translate(0,0,-2.1)),[C.ember,C.burnt,C.orange],{scale:1/4}),plates,'face-rim',front);
  for(const s of [-1,1]){
   const eye=new T.Group();eye.name=s<0?'headlight-left':'headlight-right';eye.position.set(s*1.3,.35,.5);front.add(eye);
   const housing=mesh(paint(new T.CylinderGeometry(.72,.85,.8,8),[C.gun,C.dark]),panels,null,eye);housing.rotation.x=Math.PI/2;housing.position.z=.3;
   const bezel=mesh(paint(new T.TorusGeometry(.66,.1,4,8),C.bronze),panels,null,eye);bezel.position.z=.72;
   const visor=mesh(paint(new T.BoxGeometry(1.8,.2,1.1),C.dark),panels,'visor',eye);visor.position.set(0,.85,.55);visor.rotation.x=.3;
   const glass=mesh(new T.CircleGeometry(.58,8),lamp,'headlight-glass',eye);glass.position.z=.71;
   // the beam, and its light
   const cone=new T.ConeGeometry(5,30,10,1,true);cone.translate(0,-15,0);cone.rotateX(-Math.PI/2);
   const shaft=effect(mesh(cone,beamMaterial,'beam',eye));shaft.position.z=.75;shaft.rotation.x=.14;
   const light=effect(new T.SpotLight(0xff2a18,450,90,.32,.6,1.4));light.name='headlight';light.position.z=.8;eye.add(light);
   light.target.position.set(0,-4,30);eye.add(light.target);
   eyes.push({eye,phase:s*.35,aim:new T.Quaternion()});
  }
 }

 // welded patches and rivets, but on the face and the deck
 for(let n=0;n<26;n++){
  const d=new T.Vector3(jitter(1),jitter(.7)-.1,jitter(1)).normalize();if(inFace(d))continue;
  const {point,normal}=surface(d);if(point.y>DECK-.4)continue;
  const w=1.2+rng()*1.8,h=.9+rng()*1.4,patch=mesh(paint(shake(new T.BoxGeometry(w,.16,h),.05),[C.bronze,C.gun,C.burnt,C.ember]),plates,'patch',hull);
  patch.position.copy(point);face(patch,normal);patch.rotateY(jitter(.9));
  for(const [sx,sz] of [[-1,-1],[1,-1],[-1,1],[1,1]]){const bolt=mesh(paint(new T.CylinderGeometry(.1,.13,.14,6),C.rivet),panels,null,patch);bolt.position.set(sx*(w/2-.16),.12,sz*(h/2-.16));}
 }

 // underneath: a hatch plate and four flamethrowers on swivels
 const belly=surface(new T.Vector3(0,-1,0)).point;
 const plate=mesh(paint(new T.CylinderGeometry(4,3.4,.8,8),[C.gun,C.dark],{scale:1/4}),hatch,'belly',hull);plate.position.copy(belly).add(new T.Vector3(0,-.2,0));
 const guns=[],MUZZLE=2.35,down=new T.Vector3(0,-1,0);
 for(const [n,[sx,sz]] of [[-1,1],[1,1],[-1,-1],[1,-1]].entries()){
  const gun=new T.Group();gun.name='flamethrower-'+n;gun.position.set(sx*2.6,belly.y-.9,sz*2.4+.6);hull.add(gun);
  const mount=mesh(paint(new T.DodecahedronGeometry(1,0),[C.dark,C.gun]),panels,'flamethrower-swivel',hull);mount.position.copy(gun.position);
  const housing=mesh(paint(new T.CylinderGeometry(.8,.9,.9,8),[C.dark,C.gun]),panels,'flamethrower-housing',gun);housing.position.y=-.4;
  const barrel=mesh(paint(new T.CylinderGeometry(.5,.65,1.6,8),C.gun,{scale:1/2}),grille,'flamethrower-barrel',gun);barrel.position.y=-1.4;
  const muzzle=mesh(paint(new T.CylinderGeometry(.72,.5,.5,8,1,true),C.dark),panels,null,gun);muzzle.position.y=-2.1;
  const pilot=mesh(new T.CircleGeometry(.45,8),heat,'flamethrower-glow',gun);pilot.position.y=-2.3;pilot.rotation.x=Math.PI/2;
  // the jet: the game's fire, frames of it flying out of the muzzle and swelling
  const jet=effect(new T.Group());jet.name='fire-'+n;jet.position.y=-MUZZLE;gun.add(jet);
  const puffs=[];
  if(textures.fire)for(let k=0;k<18;k++){
   const map=textures.fire.clone();map.repeat.set(.25,1);
   const puff=new T.Sprite(new T.SpriteMaterial({map,transparent:true,depthWrite:false,blending:T.AdditiveBlending}));puff.renderOrder=5;jet.add(puff);
   puffs.push({puff,offset:k/18,frame:Math.floor(rng()*4),drift:new T.Vector3(jitter(1),0,jitter(1))});
  }else{   // no fire given: a plain cone
   const cone=new T.ConeGeometry(2.4,9,8,3,true);cone.translate(0,-4.5,0);
   mesh(cone,glow(0xff6a12,'flame',{transparent:true,opacity:.7,depthWrite:false,side:T.DoubleSide}),null,jet);
  }
  guns.push({gun,puffs,aim:new T.Quaternion()});
 }

 const pods=[];
 // the flanks: a missile pod on each, low, on a short arm (one hexagonal, one round: salvaged parts)
 for(const s of [-1,1]){
  const {point:shoulder,normal}=surface(new T.Vector3(s,.28,.3)),arm=new T.Group();arm.name=s<0?'arm-left':'arm-right';hull.add(arm);
  const ball=mesh(paint(new T.DodecahedronGeometry(1.2,0),[C.dark,C.gun]),panels,'shoulder',arm);ball.position.copy(shoulder).addScaledVector(normal,.2);
  const elbow=ball.position.clone().add(new T.Vector3(s*1.7,.3,1));
  beam(ball.position,elbow,.9,.9,[C.gun,C.ember],panels,arm,'arm');
  const pod=new T.Group();pod.name='pod';pod.position.copy(elbow).add(new T.Vector3(s*.9,.5,.9));pod.rotation.set(.05,-s*.1,0);arm.add(pod);
  const sides=s<0?6:10,radius=1.5;
  const casing=mesh(paint(shake(new T.CylinderGeometry(radius,radius*1.05,4.6,sides,2),.04),()=>pick([C.gun,C.gun,C.dark,C.ember,C.burnt]),{scale:1/4}),plates,'pod-casing',pod);casing.rotation.x=Math.PI/2;
  for(const z of [-1.4,1]){const band=mesh(paint(new T.CylinderGeometry(radius*1.08,radius*1.08,.35,sides),C.bronze),panels,null,pod);band.rotation.x=Math.PI/2;band.position.z=z;}
  const cap=mesh(paint(new T.CylinderGeometry(radius*.98,radius*.98,.14,sides),C.dark,{scale:1/2}),hatch,null,pod);cap.rotation.x=Math.PI/2;cap.position.z=2.33;
  for(const [hx,hy] of [[0,0],...Array.from({length:6},(_,k)=>[Math.cos(k/6*Math.PI*2)*.86,Math.sin(k/6*Math.PI*2)*.86])]){
   const tube=mesh(paint(new T.CylinderGeometry(.32,.32,.4,6),C.dark),panels,null,pod);tube.rotation.x=Math.PI/2;tube.position.set(hx,hy,2.45);
   const tip=mesh(paint(new T.ConeGeometry(.23,.55,6),c=>c.y>.05?C.red:C.white),panels,'missile',pod);tip.rotation.x=Math.PI/2;tip.position.set(hx,hy,2.5);
  }
  pods.push({pod,rest:pod.quaternion.clone(),aim:pod.quaternion.clone(),tubes:[[0,0],...Array.from({length:6},(_,k)=>[Math.cos(k/6*Math.PI*2)*.86,Math.sin(k/6*Math.PI*2)*.86])].map(([x,y])=>new T.Vector3(x,y,2.7))});
 }

 // the legs: six, three a side; a hip, a thigh rising to a high knee, a long shin ending in a claw, posed (two
 // bones) toward their feet
 const THIGH=12.5,SHIN=16,REACH=17,STRIDE=4.6,LIFT=2.6;
 const legs=[];
 for(const [n,[s,angle]] of [[-1,.75],[1,.75],[-1,0],[1,0],[-1,-.75],[1,-.75]].entries()){
  const dir=new T.Vector3(s*Math.cos(angle),0,Math.sin(angle)),{point,normal}=surface(new T.Vector3(dir.x,-.3,dir.z));
  const hip=hull.position.clone().add(point).addScaledVector(normal,.3);
  const leg=new T.Group();leg.name='leg-'+n;body.add(leg);
  mesh(paint(new T.DodecahedronGeometry(1.3,0),[C.dark,C.gun]),panels,'hip',leg).position.copy(hip);
  const thigh=new T.Group(),shin=new T.Group();thigh.name='thigh';shin.name='shin';leg.add(thigh,shin);
  // along +Y from their joint; +Z faces up
  mesh(paint(shake(new T.CylinderGeometry(.6,.95,THIGH,6,2),.05).translate(0,THIGH/2,0),()=>pick([C.gun,C.dark,C.gun]),{scale:1/3}),panels,null,thigh);
  mesh(paint(new T.BoxGeometry(1.7,THIGH*.62,.4).translate(0,THIGH*.45,.75),[C.ember,C.orange,C.burnt],{scale:1/3}),plates,'thigh-armour',thigh);
  mesh(paint(new T.DodecahedronGeometry(1,0),C.dark),panels,'knee',shin);
  mesh(paint(shake(new T.CylinderGeometry(.42,.75,SHIN-1.6,6,2),.05).translate(0,(SHIN-1.6)/2,0),()=>pick([C.gun,C.dark,C.gun]),{scale:1/3}),panels,null,shin);
  for(const y of [.25,.55])mesh(paint(new T.CylinderGeometry(.85,.85,.3,6).translate(0,(SHIN-1.6)*y,0),C.bronze),panels,null,shin);
  mesh(paint(new T.ConeGeometry(.55,1.8,5).rotateX(Math.PI).translate(0,SHIN-.9,0),C.dark),panels,'claw',shin);
  const rest=new T.Vector3(dir.x*REACH*1.2,0,dir.z*REACH*.9);
  legs.push({n,hip,thigh,shin,rest,foot:rest.clone(),order:[0,3,4,1,2,5][n],swinging:false});
 }
 const up=new T.Vector3();
 function pose(leg){
  const {hip,foot}=leg,d=foot.clone().sub(hip),D=Math.min(d.length(),THIGH+SHIN-.01),along=(THIGH*THIGH-SHIN*SHIN+D*D)/(2*D),h=Math.sqrt(Math.max(0,THIGH*THIGH-along*along));
  const axis=d.clone().normalize();up.copy(Y).addScaledVector(axis,-Y.dot(axis)).normalize();   // the knee rises, in the leg's vertical plane
  const knee=hip.clone().addScaledVector(axis,along).addScaledVector(up,h);
  leg.thigh.position.copy(hip);orient(leg.thigh,knee.clone().sub(hip),Y);
  leg.shin.position.copy(knee);orient(leg.shin,foot.clone().sub(knee),Y);
 }
 for(const leg of legs)pose(leg);

 // the gait: one leg at a time, in turn; each step takes STEP seconds, SWING of them in the air
 const STEP=1.9,SWING=1.5,CYCLE=STEP*legs.length;
 const world=new T.Vector3(),local=new T.Vector3(),want=new T.Quaternion(),parentInverse=new T.Quaternion();
 // the missiles: out of a tube, a short straight push, then homing on the target, turning at most TURN radians a
 // second; they burst on it, on the ground, or after LIFE seconds
 const effects=new T.Group();effects.name='pom-fortress-effects';
 const flying=[],bursts=[],SALVO=3.2,MISSILE_SPEED=16,TURN=1.6,LIFE=7;
 let nextSalvo=0,salvo=0;
 const firePuff=(size,opacity=1)=>{
  if(!textures.fire)return null;const map=textures.fire.clone();map.repeat.set(.25,1);
  const sprite=new T.Sprite(new T.SpriteMaterial({map,transparent:true,depthWrite:false,blending:T.AdditiveBlending,opacity}));sprite.scale.setScalar(size);sprite.renderOrder=5;return sprite;
 };
 function launch(pod,target,seconds){
  const tube=pod.tubes[salvo%pod.tubes.length],body=missile?missile.clone(true):plainMissile();
  pod.pod.updateMatrixWorld(true);body.position.copy(pod.pod.localToWorld(tube.clone()));
  const heading=new T.Vector3(0,0,1).applyQuaternion(pod.pod.getWorldQuaternion(new T.Quaternion())).normalize();
  body.quaternion.setFromUnitVectors(Z,heading);
  const trail=firePuff(1.1,.9);if(trail){trail.position.z=-1.15;body.add(trail);}   // behind its tail
  effects.add(body);flying.push({body,heading,trail,born:seconds,target:target.clone()});
 }
 function plainMissile(){
  const g=new T.Group();
  mesh(paint(new T.CylinderGeometry(.22,.22,1.4,6).rotateX(Math.PI/2),C.gun),panels,null,g);
  mesh(paint(new T.ConeGeometry(.22,.5,6).rotateX(Math.PI/2).translate(0,0,.95),C.red),panels,null,g);
  return g;
 }
 function burst(at,seconds){
  onMissile(at.clone());
  const puff=firePuff(1);if(puff){puff.position.copy(at);effects.add(puff);bursts.push({puff,born:seconds});}
 }
 function fly(seconds,dt,target){
  for(const m of [...flying]){
   const age=seconds-m.born;if(target)m.target.copy(target);
   if(age>.35){   // homing
    const want=m.target.clone().sub(m.body.position).normalize(),angle=m.heading.angleTo(want);
    if(angle>1e-4)m.heading.lerp(want,Math.min(1,TURN*dt/angle)).normalize();
   }
   m.body.position.addScaledVector(m.heading,MISSILE_SPEED*dt*(age<.35?.6:1));m.body.quaternion.setFromUnitVectors(Z,m.heading);
   if(m.trail){m.trail.material.map.offset.x=(Math.floor(seconds*16)%4)*.25;m.trail.scale.setScalar(.9+Math.random()*.5);}
   if(m.body.position.distanceTo(m.target)<1.4||m.body.position.y<.2||age>LIFE){
    burst(m.body.position,seconds);effects.remove(m.body);m.trail?.material.dispose();m.trail?.material.map.dispose();flying.splice(flying.indexOf(m),1);
   }
  }
  for(const b of [...bursts]){
   const t=(seconds-b.born)/.6;b.puff.scale.setScalar(2+t*7);b.puff.material.opacity=Math.max(0,1-t);b.puff.material.map.offset.x=(Math.min(3,Math.floor(t*4)))*.25;
   if(t>=1){effects.remove(b.puff);b.puff.material.map.dispose();b.puff.material.dispose();bursts.splice(bursts.indexOf(b),1);}
  }
 }
 let last=null;
 function animate(seconds,{walking=true,target=null}={}){
  const dt=last==null?0:Math.min(.1,Math.max(0,seconds-last));last=seconds;
  let lifted=null;
  for(const leg of legs){
   let z=0,y=0,swinging=false;
   if(walking){
    const p=((seconds/CYCLE-leg.order/legs.length)%1+1)%1,f=SWING/CYCLE;
    if(p<f){const s=p/f,e=s*s*(3-2*s);z=-STRIDE/2+STRIDE*e;y=LIFT*Math.sin(Math.PI*s);swinging=true;lifted={leg,s};}
    else z=STRIDE/2-STRIDE*(p-f)/(1-f);
   }
   leg.foot.set(leg.rest.x,y,leg.rest.z+z);pose(leg);
   if(leg.swinging&&!swinging){root.updateMatrixWorld(true);onStep(leg.n,body.localToWorld(world.copy(leg.foot)));}
   leg.swinging=swinging;
  }
  // the body sags a little toward the lifted leg
  const sag=lifted?Math.sin(Math.PI*lifted.s):0;
  hull.position.y=BC-.15*sag;hull.rotation.z=lifted?(lifted.leg.rest.x<0?1:-1)*.015*sag:0;
  root.updateMatrixWorld(true);
  for(const e of eyes){
   // toward the target when it is near enough, else sweeping slowly from side to side, now and then lower
   let dir=null;
   if(target){
    e.eye.getWorldPosition(world);
    if(world.distanceTo(target)<LIGHT_REACH){
     e.eye.parent.getWorldQuaternion(parentInverse).invert();local.copy(target).sub(world).applyQuaternion(parentInverse).normalize();
     const angle=local.angleTo(Z);dir=angle>1.1?Z.clone().lerp(local,1.1/angle).normalize():local;
    }
   }
   if(!dir){const yaw=Math.sin(seconds*.3+e.phase)*.75,pitch=.3+.12*Math.sin(seconds*.47+e.phase*2);dir=new T.Vector3(Math.sin(yaw)*Math.cos(pitch),-Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch));}
   want.setFromUnitVectors(Z,dir);e.aim.slerp(want,Math.min(1,dt*1.8));e.eye.quaternion.copy(e.aim);
  }
  // the pods: toward the target within reach (at most .6 radians off their rest), firing in turn; else at rest
  let near=false;
  for(const pod of pods){
   let goal=pod.rest;
   if(target){
    pod.pod.getWorldPosition(world);
    if(world.distanceTo(target)<MISSILE_REACH){
     near=true;pod.pod.parent.getWorldQuaternion(parentInverse).invert();local.copy(target).sub(world).applyQuaternion(parentInverse).normalize();
     const forward=Z.clone().applyQuaternion(pod.rest),angle=forward.angleTo(local);
     goal=want.setFromUnitVectors(forward,angle>.6?forward.clone().lerp(local,.6/angle).normalize():local).multiply(pod.rest);
    }
   }
   pod.aim.slerp(goal,Math.min(1,dt*1.5));pod.pod.quaternion.copy(pod.aim);
  }
  if(near&&seconds>=nextSalvo){launch(pods[salvo%pods.length],target,seconds);salvo++;nextSalvo=seconds+SALVO/pods.length;}
  fly(seconds,dt,target);
  for(const g of guns){
   // toward the target when it is close, else down; at most 75° from down, turning slowly
   let dir=down;
   if(target){
    g.gun.getWorldPosition(world);
    if(world.distanceTo(target)<FIRE_REACH){
     hull.getWorldQuaternion(parentInverse).invert();local.copy(target).sub(world).applyQuaternion(parentInverse).normalize();
     const angle=local.angleTo(down);dir=angle>1.3?down.clone().lerp(local,1.3/angle).normalize():local;
    }
   }
   want.setFromUnitVectors(down,dir);g.aim.slerp(want,Math.min(1,dt*2.5));g.gun.quaternion.copy(g.aim);
   for(const q of g.puffs){
    const age=(seconds*1.15+q.offset)%1,frame=(q.frame+Math.floor(seconds*14+q.offset*7))%4;
    q.puff.position.set(q.drift.x*age*age*1.6,-age*13,q.drift.z*age*age*1.6);
    q.puff.scale.setScalar(1.4+age*5.5);q.puff.material.opacity=age<.08?age/.08:Math.max(0,1-(age-.08)/.92)*.95;
    q.puff.material.map.offset.x=frame*.25;
   }
  }
 }
 return {root,hull,crew,effects,animate,SPEED:STRIDE/(CYCLE-SWING)};
}
function seeded(seed){let s=seed>>>0||1;return()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,(s^s>>>14)>>>0)/4294967296);}
