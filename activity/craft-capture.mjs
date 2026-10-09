export function createCraftCapture(THREE,renderer,scene,assets,onCapture) {
  const target=new THREE.WebGLRenderTarget(288,216);target.texture.colorSpace=THREE.SRGBColorSpace;
  const camera=new THREE.OrthographicCamera(-4,4,3,-3,.1,150),pixels=new Uint8Array(288*216*4);
  const jobs=new Set();let recording=null,disposed=false;
  function encode(record) {
    const worker=new Worker(new URL('combat/gif-worker.js',assets));jobs.add(worker);
    const timer=setTimeout(()=>{worker.terminate();jobs.delete(worker);},15000);
    worker.onmessage=({data})=>{clearTimeout(timer);worker.terminate();jobs.delete(worker);if(!disposed&&!data.error)onCapture({id:record.id,bytes:data.bytes});};
    worker.onerror=()=>{clearTimeout(timer);worker.terminate();jobs.delete(worker);};
    const frames=record.frames.map(frame=>frame.buffer);worker.postMessage({frames,width:288,height:216},frames);
  }
  return {
    start(id,point,mainCamera){if(recording||disposed)return;camera.quaternion.copy(mainCamera.quaternion);const direction=new THREE.Vector3(0,0,1).applyQuaternion(camera.quaternion);camera.position.set(point.x,point.y+.8,point.z).addScaledVector(direction,20);camera.updateMatrixWorld();recording={id,frames:[],next:performance.now()};},
    cancel(id){if(recording?.id===id)recording=null;},
    update(time){if(!recording||time<recording.next)return;const record=recording;record.next=time+100;
      const previous=renderer.getRenderTarget();try{renderer.setRenderTarget(target);renderer.render(scene,camera);renderer.readRenderTargetPixels(target,0,0,288,216,pixels);const rgba=new Uint8Array(pixels.length);for(let row=0;row<216;row++)rgba.set(pixels.subarray(row*1152,(row+1)*1152),(215-row)*1152);record.frames.push(rgba);}finally{renderer.setRenderTarget(previous);}
      if(record.frames.length===12){recording=null;encode(record);}
    },
    dispose(){disposed=true;recording=null;for(const worker of jobs)worker.terminate();jobs.clear();target.dispose();},
  };
}
