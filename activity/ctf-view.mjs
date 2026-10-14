// Capture the flag on screen: the flag itself (on the ground with a glowing ring, or above its carrier's
// head in the carrier's team colour) and a scoreboard with the time each team held it and the time left.
const COLORS={red:0xe0483e,blue:0x3f7ee8,none:0xf3d37a};
const clock=ms=>{const s=Math.max(0,Math.round(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
export function createCtfView(THREE,scene,container){
  const flag=new THREE.Group();flag.userData.noXRay=false;
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,1.9,8),new THREE.MeshBasicMaterial({color:0x6b4a2b}));pole.position.y=.95;flag.add(pole);
  const cloth=new THREE.Mesh(new THREE.PlaneGeometry(.9,.55,8,1),new THREE.MeshBasicMaterial({color:COLORS.none,side:THREE.DoubleSide}));cloth.position.set(.45,1.6,0);flag.add(cloth);
  const base=cloth.geometry.attributes.position.array.slice();
  const ring=new THREE.Mesh(new THREE.RingGeometry(.55,.75,40),new THREE.MeshBasicMaterial({color:COLORS.none,transparent:true,opacity:.6,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;
  scene.add(flag,ring);
  const board=document.createElement('div');board.id='sky-ctf';
  board.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:24;display:flex;gap:14px;align-items:center;padding:6px 14px;background:#151019d9;border:1px solid #b49760;border-radius:6px;color:#ffe7b0;font:600 18px Cinzel,Georgia,serif;pointer-events:none;white-space:nowrap';
  board.innerHTML='<span data-red style="color:#ff8f80"></span><span data-left style="font-size:22px"></span><span data-blue style="color:#8fb8ff"></span>';
  const red=board.querySelector('[data-red]'),left=board.querySelector('[data-left]'),blue=board.querySelector('[data-blue]');
  container.append(board);
  let state=null;
  return {
    receive(next){state=next;},
    update(avatars,camera,time){
      if(!state){flag.visible=ring.visible=false;board.hidden=true;return;}
      board.hidden=false;
      red.textContent=(state.playerTeam==='red'?'▶ ':'')+'Rouge '+clock(state.score.red);blue.textContent='Bleu '+clock(state.score.blue)+(state.playerTeam==='blue'?' ◀':'');left.textContent=clock(state.remaining);
      const carrier=state.holder&&avatars.get(state.holder),color=COLORS[state.team]??COLORS.none;
      cloth.material.color.setHex(color);ring.material.color.setHex(color);
      flag.visible=true;ring.visible=!carrier;
      if(carrier){const h=carrier.info?.bodyHeight??carrier.info?.height??1.6;flag.position.set(carrier.position.x,carrier.position.y+h+.1,carrier.position.z);flag.scale.setScalar(.6);}
      else{flag.position.set(state.x,state.y,state.z);flag.scale.setScalar(1);ring.position.set(state.x,state.y+.03,state.z);ring.scale.setScalar(1+.12*Math.sin(time*.004));}
      // the flag faces the camera and ripples
      flag.rotation.y=Math.atan2(camera.position.x-flag.position.x,camera.position.z-flag.position.z)-Math.PI/2;
      const p=cloth.geometry.attributes.position;for(let i=0;i<p.count;i++){const x=base[i*3];p.setZ(i,Math.sin(time*.008+x*7)*.06*(x+.45));}p.needsUpdate=true;
    },
    dispose(){scene.remove(flag,ring);for(const m of [pole,cloth,ring]){m.geometry.dispose();m.material.dispose();}board.remove();}
  };
}
