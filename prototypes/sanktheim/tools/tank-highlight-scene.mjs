import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {createTankDisplay} from '../tank-view.mjs';
import shared from '../tank-shared.cjs';
const W=448,H=300,FRAMES=40,DELAY=100;
const renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setSize(W,H);renderer.outputColorSpace=T.SRGBColorSpace;
document.body.append(renderer.domElement);document.body.style.margin=0;
const scene=new T.Scene();scene.background=new T.Color(0x8295a0);
scene.add(new T.HemisphereLight(0xffffff,0x77776a,1.05));const light=new T.DirectionalLight(0xffeed5,3.5);light.position.set(-20,80,45);scene.add(light);
const terrain=(await new GLTFLoader().loadAsync('/assets/sky/sanktheim/forest/terrain.gltf')).scene;terrain.scale.setScalar(shared.SCALE);terrain.traverse(o=>{for(const m of [].concat(o.material??[]))m.side=T.DoubleSide;});scene.add(terrain);scene.updateMatrixWorld(true);
const tank=await createTankDisplay(T,p=>p,[]);scene.add(tank.root);
const camera=new T.PerspectiveCamera(40,W/H,.1,200),target=new T.WebGLRenderTarget(W,H);
const depthMaterial=new T.ShaderMaterial({side:T.DoubleSide,vertexShader:'varying float d;void main(){vec4 p=modelViewMatrix*vec4(position,1.);d=-p.z;gl_Position=projectionMatrix*p;}',fragmentShader:'varying float d;void main(){float n=floor(clamp(d,0.,255.)*256.);gl_FragColor=vec4(mod(n,256.)/255.,floor(n/256.)/255.,0.,1.);}'});
function depth(){scene.overrideMaterial=depthMaterial;renderer.setRenderTarget(target);renderer.setClearColor(0xffff00);const background=scene.background;scene.background=null;renderer.clear();renderer.render(scene,camera);const data=new Uint8Array(W*H*4),out=new Uint8Array(W*H*2);renderer.readRenderTargetPixels(target,0,0,W,H,data);for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=((H-y-1)*W+x)*4,j=(y*W+x)*2;out[j]=data[i];out[j+1]=data[i+1];}renderer.setRenderTarget(null);scene.overrideMaterial=null;scene.background=background;return btoa(Array.from(out,v=>String.fromCharCode(v)).join(''));}
window.captureTank=lane=>{const frames=[],depths=[],poses=[];for(let i=0;i<FRAMES;i++){
 const time=i*DELAY,position={x:shared.advanceX(-63,time/1000)*shared.SCALE,y:0,z:lane*shared.SCALE};
 const floor=new T.Raycaster(new T.Vector3(position.x,8,position.z),new T.Vector3(0,-1,0),0,15).intersectObject(terrain,true)[0];position.y=floor?.point.y??0;
 tank.root.position.copy(position);tank.animate(time,true);const follow=shared.tracking(position);camera.position.copy(follow.position);camera.lookAt(follow.target.x,follow.target.y,follow.target.z);camera.updateMatrixWorld(true);scene.updateMatrixWorld(true);
 renderer.render(scene,camera);frames.push(renderer.domElement.toDataURL('image/png'));const projection=new T.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
 poses.push({position,matrix:projection.elements.slice(),view:camera.matrixWorldInverse.elements.slice()});depths.push(depth());
 }return {frames,depths,poses,width:W,height:H,delay:DELAY};};
window.captureReady=true;
