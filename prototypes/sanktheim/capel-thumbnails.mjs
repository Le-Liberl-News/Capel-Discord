// The Capel's menu shows each installation as it stands on the field: its model, rendered once into a small picture by
// the game's own renderer (an off-screen target read back), seen from three quarters above, on a transparent ground.
export function renderThumbnail(T,renderer,object,size=144){
 const scene=new T.Scene(),sun=new T.DirectionalLight(0xffffff,2.4);
 scene.add(new T.HemisphereLight(0xfff1d6,0x2c3a44,2.1),sun);sun.position.set(3,6,4);
 scene.add(object);object.updateMatrixWorld(true);
 const box=new T.Box3().setFromObject(object),center=box.getCenter(new T.Vector3()),radius=Math.max(.01,box.getSize(new T.Vector3()).length()/2);
 const camera=new T.PerspectiveCamera(30,1,radius*.05,radius*20);
 camera.position.copy(center).addScaledVector(new T.Vector3(1.1,.8,1).normalize(),radius/Math.sin(15*Math.PI/180)*1.02);camera.lookAt(center);
 const target=new T.WebGLRenderTarget(size,size,{samples:4});target.texture.colorSpace=T.SRGBColorSpace;
 const previous=renderer.getRenderTarget(),clear=renderer.getClearColor(new T.Color()),alpha=renderer.getClearAlpha();
 const pixels=new Uint8Array(size*size*4);
 try{renderer.setRenderTarget(target);renderer.setClearColor(0x000000,0);renderer.clear();renderer.render(scene,camera);renderer.readRenderTargetPixels(target,0,0,size,size,pixels);}
 finally{renderer.setRenderTarget(previous);renderer.setClearColor(clear,alpha);target.dispose();scene.remove(object);}
 // the target's rows run from the bottom up
 const canvas=document.createElement('canvas');canvas.width=canvas.height=size;const c=canvas.getContext('2d'),image=c.createImageData(size,size);
 for(let y=0;y<size;y++)image.data.set(pixels.subarray((size-1-y)*size*4,(size-y)*size*4),y*size*4);
 c.putImageData(image,0,0);return canvas.toDataURL('image/png');
}
