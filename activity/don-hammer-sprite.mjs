import cannon from './don-cannon.cjs';
// Articulated cutouts of the native sprite, prepared once instead of per render frame.
export function prepareDonHammer(THREE,metadata,maps,gun){
 const meta={...metadata,banks:{...metadata.banks}},native=meta.banks[2],source=maps.get(2).image,w=native.frameWidth,h=native.frameHeight,W=144,H=176,top=36,left=23,rows=cannon.HAMMER_FRAMES;
 const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H*rows;const out=canvas.getContext('2d');out.imageSmoothingEnabled=false;
 // The craft camera is behind Don: author its silhouette in this native rear view,
 // as a dedicated one-direction action sheet, rather than damaging his front-view art.
 for(let d=0;d<1;d++){
  const base=document.createElement('canvas');base.width=w;base.height=h;const ctx=base.getContext('2d');ctx.imageSmoothingEnabled=false;
  ctx.drawImage(source,2*w,0,w,45,0,0,w,45);
  ctx.save();ctx.beginPath();[[36,45],[61,45],[68,54],[61,62],[62,80],[67,100],[50,110],[30,104],[30,80],[33,60],[29,53]].forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();ctx.drawImage(source,2*w,0,w,h,0,0,w,h);ctx.restore();
  ctx.drawImage(source,2*w+49,60,9,15,58,60,9,15);
  for(let frame=0;frame<rows;frame++){
   const ms=cannon.LEAP.takeoff+frame/(rows-1)*(cannon.LEAP.impact-cannon.LEAP.takeoff),rig=cannon.hammer(ms),grip={x:rig.x,y:rig.y};
   const drawGun=()=>{out.save();out.translate(grip.x,grip.y);out.rotate(rig.angle);out.drawImage(gun,0,0,40,30,-10,-15,40,30);out.restore();};
   out.save();out.translate(left,frame*H+top);if(rig.behind)drawGun();out.drawImage(base,0,0);
   // Native sleeve/glove cutouts articulate at the shoulders, on both sides.
   for(const side of [-1,1]){const sx=side<0?28:62,shoulderX=side<0?35:63,sy=48;
    out.save();out.translate(shoulderX,sy);const targetX=grip.x+side*6,targetY=grip.y+10,angle=Math.atan2(targetY-sy,targetX-shoulderX)-Math.PI/2;out.rotate(angle);out.drawImage(source,2*w+sx,sy,9,25,-4,0,9,Math.max(20,Math.hypot(targetX-shoulderX,targetY-sy)));out.restore();
   }
   if(!rig.behind)drawGun();out.restore();
  }
 }
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=texture.minFilter=THREE.NearestFilter;texture.generateMipmaps=false;texture.repeat.set(1,1/rows);maps.set(9,texture);
 meta.banks[9]={...native,texture:null,columns:1,rows,frames:rows,directions:1,frameWidth:W,frameHeight:H,height:H*native.pixelScale,centerY:native.centerY+(h-H)/2*native.pixelScale+top*native.pixelScale};return meta;
}
