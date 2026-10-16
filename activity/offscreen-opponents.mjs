import * as THREE from 'three';
// Clamp a projected opponent to the screen edge. Perspective targets behind the camera invert projection.
export function edgeIndicatorPoint(p,width,height,behind=false,margin=46){
 if(!behind&&p.z>=-1&&p.z<=1&&Math.abs(p.x)<=1&&Math.abs(p.y)<=1)return null;
 let dx=p.x*width/2*(behind?-1:1),dy=-p.y*height/2*(behind?-1:1);if(Math.hypot(dx,dy)<.001)dy=1;
 const rx=Math.max(1,width/2-margin),ry=Math.max(1,height/2-margin),scale=Math.min(rx/Math.max(Math.abs(dx),.0001),ry/Math.max(Math.abs(dy),.0001));
 return {x:width/2+dx*scale,y:height/2+dy*scale,angle:Math.atan2(dy,dx)};
}
export function isOffscreenOpponent(id,a,ownId,ownTeam,inTower){return !!(id!==ownId&&!!a&&!a.dead&&a.hp>0&&!a.spectator&&!a.prop&&(!a.npc||a.enemy)&&(!inTower||a.enemy)&&!String(id).startsWith('world:pom')&&!(ownTeam!=null&&a.teamId===ownTeam)&&a.mesh?.visible!==false&&(a.mesh?.material?.opacity??1)>.1&&a.catCling?.target!==ownId);}
export function createOffscreenOpponents({assets,catalogue}){
 const layer=document.createElement('div'),style=document.createElement('style'),markers=new Map(),point=new THREE.Vector3(),view=new THREE.Vector3();
 layer.className='sky-offscreen-opponents';layer.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:16';
 style.textContent='.sky-offscreen-opponent{position:absolute;width:42px;height:42px;transform:translate(-50%,-50%);border:2px solid #f59785;border-radius:50%;background:#241c2bef;box-shadow:0 2px 7px #000b;box-sizing:border-box}.sky-offscreen-opponent-icon{position:absolute;inset:3px;border-radius:50%;background-repeat:no-repeat;background-position:center;background-size:cover}.sky-offscreen-opponent-arrow{position:absolute;left:50%;top:50%;font:22px sans-serif;color:#ffb09b;text-shadow:0 1px 3px #000;transform-origin:0 0}';
 document.head.append(style);document.body.append(layer);
 return {update({camera,avatars,ownId,inTower=false,width,height,enabled}){
  layer.hidden=!enabled;for(const m of markers.values())m.root.hidden=true;if(!enabled)return;const me=avatars.get(ownId);if(!me)return;
  for(const [id,a]of avatars){if(!isOffscreenOpponent(id,a,ownId,me.teamId,inTower))continue;
   point.set(a.position.x,a.position.y+(a.info?.height??1.6)*.5,a.position.z);view.copy(point).applyMatrix4(camera.matrixWorldInverse);point.project(camera);
   const edge=edgeIndicatorPoint(point,width,height,camera.isPerspectiveCamera&&view.z>0);if(!edge)continue;
   let m=markers.get(id);if(!m){const root=document.createElement('div'),icon=document.createElement('span'),arrow=document.createElement('span');root.className='sky-offscreen-opponent';icon.className='sky-offscreen-opponent-icon';arrow.className='sky-offscreen-opponent-arrow';arrow.textContent='➤';root.append(icon,arrow);layer.append(root);m={root,icon,arrow};markers.set(id,m);}
   const info=catalogue[a.character]??a.info;if(m.character!==a.character&&info&&(info.portrait||info.texture)){m.character=a.character;m.root.title=a.displayName??a.character;const url=new URL(info.portrait??info.texture,assets).href;m.icon.style.backgroundImage='url('+JSON.stringify(url)+')';m.icon.style.backgroundSize=info.portrait?'cover':`${(info.columns??1)*100}% ${(info.rows??1)*100}%`;m.icon.style.backgroundPosition=info.portrait?'center':'0 0';}
   m.root.hidden=false;m.root.style.left=edge.x+'px';m.root.style.top=edge.y+'px';m.arrow.style.transform=`rotate(${edge.angle}rad) translate(23px,-50%)`;
  }
  for(const [id,m]of markers)if(!avatars.has(id)){m.root.remove();markers.delete(id);}
 },dispose(){layer.remove();style.remove();markers.clear();}};
}
