export function createCraftCapture(THREE,renderer,scene,assets,onCapture) {
  const target=new THREE.WebGLRenderTarget(288,216);target.texture.colorSpace=THREE.SRGBColorSpace;
  const camera=new THREE.OrthographicCamera(-4,4,3,-3,.1,150);
  const overlay=document.createElement('canvas');overlay.width=288;overlay.height=216;const ctx=overlay.getContext('2d');
  const bubbleFrame=new Image(),bubbleName=new Image(),bubbleTail=new Image();bubbleFrame.src=new URL('dialogue/frame.png',assets);bubbleName.src=new URL('dialogue/name.png',assets);bubbleTail.src=new URL('dialogue/tail.png',assets);
  function composite(rgba,bubble){if(!bubble?.text)return;ctx.putImageData(new ImageData(rgba,288,216),0,0);
    ctx.fillStyle='#282234dd';ctx.fillRect(9,7,270,52);if(bubbleFrame.complete&&bubbleFrame.naturalWidth)ctx.drawImage(bubbleFrame,9,7,270,52);
    if(bubbleName.complete&&bubbleName.naturalWidth)ctx.drawImage(bubbleName,15,11,258,15);
    ctx.font='13px AveriaSky, sans-serif';ctx.fillStyle='#ffd778';ctx.fillText(bubble.character,19,23);ctx.fillStyle='white';ctx.font='12px AveriaSky, sans-serif';
    const words=bubble.text.split(' ');let line='',y=39;for(const word of words){if(ctx.measureText(line+word).width>246){ctx.fillText(line,19,y);y+=13;line='';}line+=word+' ';}ctx.fillText(line,19,y);
    if(bubbleTail.complete&&bubbleTail.naturalWidth)ctx.drawImage(bubbleTail,143,59,10,13);rgba.set(ctx.getImageData(0,0,288,216).data);
  }
  const jobs=new Set();let recording=null,disposed=false;
  function encode(record) {
    const worker=new Worker(new URL('combat/gif-worker.js',assets));jobs.add(worker);
    const timer=setTimeout(()=>{worker.terminate();jobs.delete(worker);},15000);
    worker.onmessage=({data})=>{clearTimeout(timer);worker.terminate();jobs.delete(worker);if(!disposed&&!data.error)onCapture({id:record.id,bytes:data.bytes});};
    worker.onerror=()=>{clearTimeout(timer);worker.terminate();jobs.delete(worker);};
    const frames=record.frames.map(frame=>frame.buffer);worker.postMessage({frames,width:288,height:216,delay:record.interval},frames);
  }
  return {
    start(id,point,mainCamera,options={}){if(recording||disposed)return;const radius=options.radius??4;camera.left=-radius;camera.right=radius;camera.top=radius*.75;camera.bottom=-radius*.75;camera.updateProjectionMatrix();camera.quaternion.copy(mainCamera.quaternion);const direction=new THREE.Vector3(0,0,1).applyQuaternion(camera.quaternion);camera.position.set(point.x,point.y+.8,point.z).addScaledVector(direction,20);camera.updateMatrixWorld();recording={id,frames:[],taken:0,pending:0,maxFrames:options.frames??12,interval:options.interval??100,bubble:options.bubble,next:performance.now()};},
    cancel(id){if(recording?.id===id){recording.cancelled=true;recording=null;}},
    // Frames are read back asynchronously: a synchronous readPixels stalls the main thread until the GPU
    // catches up, which froze the game for a moment at the start of every craft.
    update(time){if(!recording||time<recording.next)return;const record=recording;record.next=time+record.interval;const index=record.taken++;
      if(record.taken===record.maxFrames)recording=null;
      const previous=renderer.getRenderTarget();try{renderer.setRenderTarget(target);renderer.render(scene,camera);}finally{renderer.setRenderTarget(previous);}
      record.pending++;renderer.readRenderTargetPixelsAsync(target,0,0,288,216,new Uint8Array(288*216*4)).then(pixels=>{
        const rgba=new Uint8Array(pixels.length);for(let row=0;row<216;row++)rgba.set(pixels.subarray(row*1152,(row+1)*1152),(215-row)*1152);composite(rgba,record.bubble);record.frames[index]=rgba;
      }).catch(()=>{record.failed=true;}).finally(()=>{if(--record.pending===0&&record.taken===record.maxFrames&&!record.failed&&!record.cancelled&&!disposed)encode(record);});
    },
    dispose(){disposed=true;recording=null;for(const worker of jobs)worker.terminate();jobs.clear();target.dispose();},
  };
}
