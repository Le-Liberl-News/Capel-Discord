import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {createGateDestruction} from '../destruction.mjs';
const w=448,h=280,renderer=new T.WebGLRenderer({antialias:false,preserveDrawingBuffer:true});renderer.setSize(w,h);renderer.setPixelRatio(1);renderer.setClearColor(0x677e83);renderer.outputColorSpace=T.SRGBColorSpace;
document.body.append(renderer.domElement);
const scene=new T.Scene(),model=(await new GLTFLoader().loadAsync('/assets/sky/sanktheim/map/model.gltf')).scene;
model.updateMatrixWorld(true);model.traverse(o=>{if(o.isMesh)for(const m of [].concat(o.material))m.side=T.DoubleSide;});scene.add(model);
scene.add(new T.HemisphereLight(0xe8f1ff,0x73664c,2));const sun=new T.DirectionalLight(0xffe1ad,2.4);sun.position.set(-45,60,-30);scene.add(sun);
const camera=new T.OrthographicCamera(-13,13,13*h/w,-13*h/w,.1,200),destruction=createGateDestruction(T,model,scene);destruction.addGate();
const definitions=[['west-wall','Muraille ouest',19,11,-28.5],['west-tower','Tour ouest',6,7,-34.2],['gate','Porte renforcée',0,4,-33.5],['east-tower','Tour est',-6,7,-34.2],['east-wall','Muraille est',-19,11,-28.5]];
const thresholds=[95,85,75,65,55,45,35,25,15,5,0],canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const c=canvas.getContext('2d');
function aim(id){const d=definitions.find(d=>d[0]===id);camera.position.set(d[4]-28,19,d[2]+20);camera.lookAt(d[4],3.5,d[2]);camera.updateMatrixWorld();}
function sections(id,step){destruction.setSections(definitions.map(([key,name,z,width])=>({id:key,name,z,width,maxHP:100,hp:key===id?(step?thresholds[step-1]:100):100,damageStep:key===id?step:0})));}
function frame(name,percent){renderer.render(scene,camera);c.drawImage(renderer.domElement,0,0);if(name){c.fillStyle='#111a20e8';c.fillRect(0,0,w,36);c.fillStyle='#fff0c4';c.font='bold 17px sans-serif';c.textAlign='center';c.fillText(name,224,24);c.fillStyle='#111a20ed';c.fillRect(0,244,w,36);c.fillStyle=percent?'#ffd089':'#ff9977';c.fillText(percent?percent+' % de solidité restante':'BRÈCHE OUVERTE',224,268);}return canvas.toDataURL('image/png');}
aim('gate');window.garrison=frame();
window.capture=async(id,step)=>{aim(id);sections(id,Math.max(0,step-1));const name=definitions.find(d=>d[0]===id)[1],frames=[];for(let i=0;i<3;i++)frames.push(frame(name,step===1?100:thresholds[step-2]));sections(id,step);for(let f=0;f<19;f++){for(let j=0;j<3;j++)destruction.update(.03);frames.push(frame(name,thresholds[step-1]));}return frames;};
const depthTarget=new T.WebGLRenderTarget(w,h),depthMaterial=new T.ShaderMaterial({side:T.DoubleSide,vertexShader:'varying float d;void main(){vec4 p=modelViewMatrix*vec4(position,1.);d=-p.z;gl_Position=projectionMatrix*p;}',fragmentShader:'varying float d;void main(){float n=floor(clamp(d,0.,255.)*256.);gl_FragColor=vec4(mod(n,256.)/255.,floor(n/256.)/255.,0.,1.);}'});
function depth(){const old=scene.overrideMaterial;scene.overrideMaterial=depthMaterial;renderer.setRenderTarget(depthTarget);renderer.setClearColor(0xffff00);renderer.clear();renderer.render(scene,camera);const bytes=new Uint8Array(w*h*4);renderer.readRenderTargetPixels(depthTarget,0,0,w,h,bytes);renderer.setRenderTarget(null);renderer.setClearColor(0x677e83);scene.overrideMaterial=old;const out=new Uint8Array(w*h*2);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const src=((h-y-1)*w+x)*4,dst=(y*w+x)*2;out[dst]=bytes[src];out[dst+1]=bytes[src+1];}return btoa(Array.from(out,b=>String.fromCharCode(b)).join(''));}
window.captureReplay=async(id,step)=>{const frames=await window.capture(id,step);const after=depth();sections(id,Math.max(0,step-1));const before=depth();const matrix=new T.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);return {frames,before,after,matrix:matrix.elements,view:camera.matrixWorldInverse.elements,pixelsPerUnit:w/26};};
window.captureReady=true;
