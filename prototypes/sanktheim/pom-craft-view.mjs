export function createPomCraftView({T,scene,asset,getState}){
 const views=new Map();let fireMap=null;new T.TextureLoader().loadAsync(asset('/assets/sky/effects/fire-frames.png')).then(m=>{m.colorSpace=T.SRGBColorSpace;fireMap=m;});
 const dispose=v=>{scene.remove(v.root);v.root.traverse(o=>{o.geometry?.dispose();for(const m of [].concat(o.material??[])){m.map?.dispose();m.dispose();}});};
 function make(type){const root=new T.Group();root.userData.noXRay=true;scene.add(root);const v={root,type};
  if(type==='vines'){v.vines=Array.from({length:2},(_,i)=>{const m=new T.Mesh(new T.BufferGeometry(),new T.MeshStandardMaterial({color:i?0xff80b3:0xed619b,emissive:0x731b44,emissiveIntensity:.25,roughness:.6}));root.add(m);return m;});}
  else{v.ball=new T.Mesh(new T.SphereGeometry(.48,16,10),new T.MeshBasicMaterial({color:0xffb435,transparent:true,opacity:.68}));root.add(v.ball);v.flames=[];for(let i=0;i<9;i++){const map=fireMap?.clone();if(map){map.repeat.set(.25,1);map.needsUpdate=true;}const f=new T.Sprite(new T.SpriteMaterial({map,color:0xffbb65,transparent:true,opacity:.9,depthWrite:false,blending:T.AdditiveBlending}));root.add(f);v.flames.push(f);}v.ring=new T.Mesh(new T.TorusGeometry(.65,.045,5,40),new T.MeshBasicMaterial({color:0xffb34c,transparent:true}));v.ring.rotation.x=-Math.PI/2;root.add(v.ring);}
  return v;
 }
 function update({time,avatars,camera}){const state=getState(),actors=[...state.players,...state.enemies],present=new Set();for(const a of actors){const c=a.pomCraft,body=avatars.get(a.id);if(!c||a.hp<=0||!body)continue;present.add(a.id);let v=views.get(a.id);if(v&&v.type!==c.type){dispose(v);views.delete(a.id);v=null;}if(!v){v=make(c.type);views.set(a.id,v);}const origin=body.mesh.position;
   if(c.type==='vines'){const target=avatars.get(c.target),victim=target?.mesh.position;if(!victim){v.root.visible=false;continue;}v.root.visible=true;const age=time-c.at,k=Math.max(0,Math.min(1,age/450)),wrapped=age>=450,fade=Math.max(0,Math.min(1,(2100-age)/400));
    for(const [i,m]of v.vines.entries()){const sign=i?1:-1,points=[],start=new T.Vector3(origin.x,origin.y+.3,origin.z),end=new T.Vector3(victim.x,victim.y+.65,victim.z),dx=end.x-start.x,dz=end.z-start.z,n=Math.hypot(dx,dz)||1,side=new T.Vector3(-dz/n,0,dx/n);start.addScaledVector(side,sign*.24);
     for(let j=0;j<=12;j++){const u=j/12*k,p=start.clone().lerp(end,u);p.addScaledVector(side,sign*Math.sin(u*Math.PI)*.45);p.y+=Math.sin(u*Math.PI)*.35;points.push(p);}
     if(wrapped)for(let j=1;j<=22;j++){const u=j/22,angle=u*Math.PI*4+time*.003+sign*Math.PI;points.push(new T.Vector3(end.x+Math.sin(angle)*.35,end.y-.35+u*.65,end.z+Math.cos(angle)*.35));}
     m.geometry.dispose();m.geometry=new T.TubeGeometry(new T.CatmullRomCurve3(points),40,.065*fade,5,false);m.visible=fade>0;}
   }else{const charging=c.phase==='charge',power=charging?Math.max(0,Math.min(1,(time-c.at)/3000)):c.power;v.root.position.set(origin.x,origin.y+.45,origin.z);v.ball.scale.setScalar(.6+power*.6);v.ball.rotation.z=time*.015;v.ball.material.opacity=charging?.25+power*.35:.8;v.ring.visible=charging;v.ring.position.y=-.4;v.ring.scale.setScalar(.6+power*.8);v.ring.material.opacity=.6+.3*Math.sin(time*.025);if(!charging)body.mesh.visible=false;
    for(const [i,f]of v.flames.entries()){if(f.material.map)f.material.map.offset.x=(Math.floor(time/65)+i)%4/4;const angle=time*.012+i*2.4;if(charging)f.position.set(Math.sin(angle)*(.3+power*.25),Math.cos(angle)*.25,Math.cos(angle)*(.3+power*.25));else f.position.set(-c.direction.x*i*.22,Math.sin(angle)*.1,-c.direction.z*i*.22);f.scale.setScalar((charging?.4+power*.7:1.15-i*.08));f.material.opacity=charging?.35+power*.5:1-i*.08;}
   }
  }for(const [id,v]of views)if(!present.has(id)){dispose(v);views.delete(id);}}
 return {update,dispose(){for(const v of views.values())dispose(v);views.clear();fireMap?.dispose();}};
}
