export const REPLAY_FRAMES=20,REPLAY_INTERVAL=100;
export function replayWindow(frames,frame,limit=REPLAY_FRAMES){frames.push(frame);if(frames.length>limit)frames.shift();return frames;}
export function createDuelFinish(THREE,renderer,scene,assets,onCapture,onLeave){
 const width=224,height=168,target=new THREE.WebGLRenderTarget(width,height);target.texture.colorSpace=THREE.SRGBColorSpace;
 const camera=new THREE.OrthographicCamera(-4,4,3,-3,.1,200),pixels=new Uint8Array(width*height*4);
 const panel=document.createElement('div');panel.id='sky-duel-finish';panel.hidden=true;panel.style.cssText='position:fixed;inset:0;z-index:36;background:#110e16dd;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;box-sizing:border-box;color:#ffe7b0;text-align:center';
 const style=document.createElement('style');style.textContent='#sky-duel-finish[hidden]{display:none!important}';document.head.append(style);
 const title=document.createElement('h2');title.style.cssText="font:clamp(26px,5vw,42px) AveriaSky,sans-serif;margin:0";
 const image=document.createElement('img');image.hidden=true;image.alt='Dernière action au ralenti';image.style.cssText='width:min(448px,100%);image-rendering:pixelated;border:1px solid #b49760;border-radius:4px';
 const leave=document.createElement('button');leave.type='button';leave.textContent='Retour à l’Antérose';leave.style.cssText='padding:12px 20px;border:1px solid #b49760;border-radius:4px;background:#2d211b;color:#ffe7b0;font:18px AveriaSky,sans-serif';leave.onclick=onLeave;
 panel.append(title,image,leave);document.body.append(panel);
 let duel=null,frames=[],next=0,finishingAt=null,encoded=false,worker=null,workerTimer=null,url=null,disposed=false,localId=null,clockOffset=0;
 function reset(){frames=[];finishingAt=null;encoded=false;panel.hidden=true;image.hidden=true;if(url){URL.revokeObjectURL(url);url=null;}worker?.terminate();worker=null;clearTimeout(workerTimer);}
 function encode(){encoded=true;if(frames.length<4)return;worker=new Worker(new URL('combat/gif-worker.js?v=duel-replay-20261009-1',assets));workerTimer=setTimeout(()=>{worker?.terminate();worker=null;},15000);
  worker.onmessage=({data})=>{clearTimeout(workerTimer);worker?.terminate();worker=null;if(disposed||data.error)return;url=URL.createObjectURL(new Blob([data.bytes],{type:'image/gif'}));image.src=url;image.hidden=false;if(duel.players.includes(localId))onCapture({id:duel.result.captureId,bytes:data.bytes});};
  worker.onerror=()=>{clearTimeout(workerTimer);worker?.terminate();worker=null;};
  const buffers=frames.map(frame=>frame.buffer);worker.postMessage({frames:buffers,width,height,delay:250,colors:64},buffers);frames=[];
 }
 return {
  receive(value,id,serverTime){localId=id;if(Number.isFinite(serverTime))clockOffset=serverTime-performance.now();if(value?.id!==duel?.id)reset();duel=value;
   if(duel?.result){title.textContent='Victoire de '+duel.result.winnerName+' !';panel.hidden=false;if(finishingAt===null)finishingAt=performance.now();}
  },
  update(time,avatars,mainCamera){
   if(!duel||encoded||time<next)return;
   if(!duel.result&&(!duel.players.includes(localId)||time+clockOffset<duel.readyAt))return;
   next=time+REPLAY_INTERVAL;const players=duel.players.map(id=>avatars.get(id)).filter(Boolean);if(!players.length)return;
   const point={x:players.reduce((n,p)=>n+p.position.x,0)/players.length,y:players.reduce((n,p)=>n+p.position.y,0)/players.length,z:players.reduce((n,p)=>n+p.position.z,0)/players.length};
   const span=players.length>1?Math.hypot(players[0].position.x-players[1].position.x,players[0].position.z-players[1].position.z):4;const extent=Math.max(8,Math.min(32,span+5));camera.left=-extent/2;camera.right=extent/2;camera.top=extent*.375;camera.bottom=-extent*.375;camera.updateProjectionMatrix();
   camera.quaternion.copy(mainCamera.quaternion);const direction=new THREE.Vector3(0,0,1).applyQuaternion(camera.quaternion);camera.position.set(point.x,point.y+.7,point.z).addScaledVector(direction,20);camera.updateMatrixWorld();
   const previous=renderer.getRenderTarget();try{renderer.setRenderTarget(target);renderer.render(scene,camera);renderer.readRenderTargetPixels(target,0,0,width,height,pixels);const frame=new Uint8Array(pixels.length);for(let y=0;y<height;y++)frame.set(pixels.subarray(y*width*4,(y+1)*width*4),(height-y-1)*width*4);replayWindow(frames,frame);}finally{renderer.setRenderTarget(previous);}
   if(finishingAt!==null&&time-finishingAt>=350)encode();
  },
  dispose(){disposed=true;reset();target.dispose();panel.remove();style.remove();}
 };
}
