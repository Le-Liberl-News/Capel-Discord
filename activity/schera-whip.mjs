// Scherazard's craft, "Fouet constricteur": a thin brown leather whip whirled over her head, lashed at the chosen
// opponent, coiled round them, who is then pulled back to her (the pull itself is the server's projection).
// The whip is a tube rebuilt every frame from a list of points.
const MAIN=26,COIL=40,POINTS=MAIN+COIL,SIDES=6,TURNS=2.6;
const clamp=v=>Math.max(0,Math.min(1,v)),ease=t=>t*t*(3-2*t);
export function createScheraWhip(THREE,event,spec){
  const group=new THREE.Group();group.userData.noXRay=false;
  const geometry=new THREE.BufferGeometry(),positions=new Float32Array(POINTS*SIDES*3),colors=new Float32Array(POINTS*SIDES*3),index=[];
  for(let i=0;i<POINTS-1;i++)for(let s=0;s<SIDES;s++){const a=i*SIDES+s,b=i*SIDES+(s+1)%SIDES,c=a+SIDES,d=b+SIDES;index.push(a,c,b,b,c,d);}
  geometry.setIndex(index);geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
  // brown leather lightening towards the tip, a dark grip
  const leather=new THREE.Color(0x5e3a20),grip=new THREE.Color(0x2a1a10),tipColour=new THREE.Color(0x9a6a3e);
  for(let i=0;i<POINTS;i++){const t=i/(POINTS-1),c=t<.08?grip:leather.clone().lerp(tipColour,t);for(let s=0;s<SIDES;s++)c.toArray(colors,(i*SIDES+s)*3);}
  const whip=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.DoubleSide,transparent:true}));
  group.add(whip);
  const points=Array.from({length:POINTS},()=>new THREE.Vector3()),tangent=new THREE.Vector3(),normal=new THREE.Vector3(),binormal=new THREE.Vector3(),up=new THREE.Vector3(0,1,0),v=new THREE.Vector3();
  function build(target,radiusAt,widen){
    const array=target.attributes.position.array;
    for(let i=0;i<POINTS;i++){
      const p=points[i],prev=points[Math.max(0,i-1)],next=points[Math.min(POINTS-1,i+1)];
      tangent.subVectors(next,prev);if(tangent.lengthSq()<1e-10)tangent.set(0,0,1);tangent.normalize();
      normal.crossVectors(tangent,Math.abs(tangent.y)>.95?v.set(1,0,0):up).normalize();binormal.crossVectors(tangent,normal);
      const r=radiusAt(i/(POINTS-1))*widen;
      for(let s=0;s<SIDES;s++){const a=s/SIDES*Math.PI*2,o=(i*SIDES+s)*3;array[o]=p.x+(normal.x*Math.cos(a)+binormal.x*Math.sin(a))*r;array[o+1]=p.y+(normal.y*Math.cos(a)+binormal.y*Math.sin(a))*r;array[o+2]=p.z+(normal.z*Math.cos(a)+binormal.z*Math.sin(a))*r;}
    }
    target.attributes.position.needsUpdate=true;target.computeBoundingSphere();
  }
  const radius=t=>t<.08?.03:.02*(1-t)+.006;
  // the part of the whip from the hand to `tip`, bending through a raised middle with a wave running along it
  function span(from,tip,count,lift,wave,phase,start=0){
    for(let i=0;i<count;i++){const t=i/(count-1),p=points[start+i];p.lerpVectors(from,tip,t);p.y+=Math.sin(t*Math.PI)*lift+Math.sin(t*Math.PI*3-phase)*wave*t*(1-t)*4;}
  }
  const hand=new THREE.Vector3(),tip=new THREE.Vector3(),centre=new THREE.Vector3(),side=new THREE.Vector3();
  const impact=event.impactAt-event.started,bind=spec.bindDelay??350,pull=spec.pullDuration??450,release=impact+bind+pull+350;
  // `target`: where the chosen opponent stands now; `victim`: the same once the server has confirmed the catch
  return {group,draw(time,owner,victim,target){
    const aim=target??event.aim,dx=aim.x-owner.x,dz=aim.z-owner.z,length=Math.hypot(dx,dz)||1,fx=dx/length,fz=dz/length;
    hand.set(owner.x+fx*.3,owner.y+1.15,owner.z+fz*.3);side.set(-fz,0,fx);
    const end=release+450;group.visible=time>=0&&time<end;if(!group.visible)return;
    let coilRadius=.42,fade=1;
    if(time<impact-220){
      // whirled over her head, faster and faster
      const angle=time*.012+time*time*.000006,lift=Math.min(1,time/250);
      for(let i=0;i<POINTS;i++){const t=i/(POINTS-1),a=angle-t*2.4,r=.25+t*.95;points[i].set(owner.x+Math.cos(a)*r*lift,owner.y+1.15+(.4+t*.55)*lift,owner.z+Math.sin(a)*r*lift);points[i].lerp(hand,(1-t)*(1-t)*.6);}
    }else{
      const caught=victim&&time>=impact,lash=clamp((time-impact+220)/220);
      if(caught)centre.set(victim.x,victim.y+.9,victim.z);
      // the tip flies to the aimed point, or to the opponent once caught; a missed lash snaps back
      if(caught)tip.copy(centre).addScaledVector(side,coilRadius);
      else{const back=clamp((time-impact-120)/350),reach=lash*(1-ease(back));tip.set(owner.x+dx*reach,owner.y+.9+(aim.y-owner.y)*reach,owner.z+dz*reach);fade=1-back;}
      const tension=caught?clamp((time-impact)/bind):0;
      span(hand,tip,MAIN,caught?.35*(1-tension)+.08:.6*(1-lash)+.15,caught?.1*(1-tension):.5*(1-lash),time*.03);
      if(caught){
        // coils wound round the opponent from the tip, then loosened and let go
        const coil=ease(clamp((time-impact)/bind));
        const loosen=clamp((time-release)/450);coilRadius=.42+loosen*.5;fade=1-loosen;
        const base=Math.atan2(side.z,side.x);
        for(let i=0;i<COIL;i++){const t=i/(COIL-1)*coil,a=base+t*TURNS*Math.PI*2;points[MAIN+i].set(centre.x+Math.cos(a)*coilRadius,centre.y+.35-t*.75,centre.z+Math.sin(a)*coilRadius);}
      }else for(let i=0;i<COIL;i++)points[MAIN+i].copy(tip);
    }
    build(geometry,radius,1);
    whip.material.opacity=fade;
  },dispose(){geometry.dispose();whip.material.dispose();}};
}
