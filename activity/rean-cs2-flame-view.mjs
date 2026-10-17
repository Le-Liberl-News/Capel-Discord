import flame from './rean-flame-slash.cjs';
import {loadCs2Effects} from './native-cs2-effects.mjs';
import definition from './assets/sky/combat/cs2/flame-effects.json';

export function createReanFlameView(THREE,scene,assets){
 const views=new Map();let bank=null,loading=null,disposed=false;
 const prepare=()=>loading??=loadCs2Effects(THREE,assets,definition.pack).then(value=>{if(disposed){value.dispose();return null;}return bank=value;});
 const matrix=new THREE.Matrix4(),position=new THREE.Vector3(),rotation=new THREE.Quaternion(),scaleVector=new THREE.Vector3(),right=new THREE.Vector3(),forward=new THREE.Vector3(),xAxis=new THREE.Vector3(),yAxis=new THREE.Vector3(),zAxis=new THREE.Vector3(),upAxis=new THREE.Vector3(0,1,0);
 const placement=(point,yaw,size)=>matrix.compose(position.set(point.x,point.y,point.z),rotation.setFromAxisAngle(upAxis,yaw),scaleVector.setScalar(size));
 function make(){const create=id=>bank.create(id,scene);return {weapon:create('scre01_3'),first:create('scre01_1'),second:create('scre01_1'),impact:create('scre01_7'),rush:create('scre00_5'),dash:create('scre00_5'),embers:create('scre01_6')};}
 function draw(a,time,avatars,camera){
  if(!bank)return;let v=views.get(a.id);if(!v){v=make();views.set(a.id,v);}if(a.cancelled){for(const fx of Object.values(v))fx.hide();return;}
  const p=flame.flamePhases(a),owner=avatars?.get(a.actor),frame=owner?.renderFrame,anchors=frame?.info.effectAnchors?.[frame.frame],pixel=frame?.info.pixelScale??.02,yaw=Math.atan2(a.aim.x-a.origin.x,a.aim.z-a.origin.z),path=flame.flamePath(a);
  const play=(fx,nativeTime,start,end,point,size)=>{if(time<start||time>end)fx.hide();else fx.draw(nativeTime,placement(point,yaw,size),camera,{scale:size,opacity:Math.min(1,(end-time)/180)});};
  play(v.first,(time-p.first)/1000*1.4+.14,p.first-90,p.first+480,{...a.aim,y:a.aim.y+.6},.47);
  play(v.second,(time-p.second)/1000*1.4+2.1,p.second-90,p.second+480,{...a.aim,y:a.aim.y+.6},.47);
  play(v.impact,(time-p.third)/1000*1.8+.06,p.third-30,p.third+1450,a.aim,.26);
  play(v.rush,(time-p.prep)/1000,p.prep,p.contact+500,flame.flameMotion(a,p.prep+80).position,.42);
  play(v.dash,(time-p.dashStart)/1000,p.dashStart,p.dashEnd+550,flame.flameMotion(a,p.dashStart+100).position,.42);
  play(v.embers,(time-p.dashEnd)/1000*1.6,p.dashEnd,p.dashEnd+1000,path.exit,.35);
  if(!owner||owner.dead||!anchors||time<p.prep*.5||time>=p.end){v.weapon.hide();return;}
  right.setFromMatrixColumn(camera.matrixWorld,0);right.y=0;right.normalize();forward.setFromMatrixColumn(camera.matrixWorld,2);forward.y=0;forward.normalize();
  const base=anchors[0],axis=(n,out)=>out.copy(right).multiplyScalar((anchors[n][0]-base[0])*pixel).addScaledVector(upAxis,(anchors[n][1]-base[1])*pixel);
  axis(1,xAxis);axis(2,yAxis);axis(3,zAxis);position.copy(owner.mesh.position).addScaledVector(right,base[0]*pixel).addScaledVector(upAxis,base[1]*pixel).addScaledVector(forward,.025);
  matrix.makeBasis(xAxis,yAxis,zAxis);matrix.setPosition(position);v.weapon.draw(2+(time-p.prep)/1000*.3,matrix,camera,{scale:Math.max(xAxis.length(),yAxis.length(),zAxis.length()),opacity:Math.min(1,(p.end-time)/150),floorY:owner.position.y+.02});
 }
 function remove(id){const v=views.get(id);if(v){for(const fx of Object.values(v))fx.dispose();views.delete(id);}}
 return {prepare,draw,remove,stats:()=>({events:views.size,batches:[...views.values()].reduce((n,v)=>n+Object.values(v).reduce((n,f)=>n+f.stats().batches,0),0)}),dispose(){disposed=true;for(const id of [...views.keys()])remove(id);bank?.dispose();bank=null;}};
}
