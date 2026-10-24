// The outskirts (wildlife.cjs): the pond at the end of the path's south branch, by the quarry, its water the game's
// own (Liberl's sea and foam, scrolling one across the other); the hunter's meat and the garrison's hunger, in a
// panel under the walls' one.
const POND={x:-221,z:61,rx:8,rz:6},DAY=24*3600000,STARVING=15;
export function createWildsView({T,scene,asset,scale,getState,getOwn}){
 const loader=new T.TextureLoader(),pond=new T.Group();pond.name='pond';scene.add(pond);
 const water=loader.load(asset('/assets/siege/pond/water.png')),foam=loader.load(asset('/assets/siege/pond/foam.png'));
 for(const map of [water,foam]){map.wrapS=map.wrapT=T.RepeatWrapping;map.colorSpace=T.SRGBColorSpace;map.repeat.set(3,3);}
 // an uneven shore: an ellipse whose radius wavers
 const shape=new T.Shape(),points=40;
 for(let i=0;i<=points;i++){const a=i/points*Math.PI*2,k=1+.12*Math.sin(a*3+1)+.07*Math.sin(a*5+2);const x=Math.cos(a)*POND.rx*k*scale,y=Math.sin(a)*POND.rz*k*scale;i?shape.lineTo(x,y):shape.moveTo(x,y);}
 const surface=new T.ShapeGeometry(shape,2);surface.rotateX(-Math.PI/2);
 const uv=surface.attributes.uv,pos=surface.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,pos.getX(i)/(POND.rx*2*scale)+.5,pos.getZ(i)/(POND.rz*2*scale)+.5);
 // the layers stand well apart (and the water is drawn in front): seen from afar, close layers fight over the depth
 const shore=new T.Mesh(surface.clone().scale(1.12,1,1.12),new T.MeshLambertMaterial({color:0x5a4a32}));shore.position.y=.02;
 // a turquoise bed, the sea's ripples added over it (that texture is dark: alone it shows black)
 const bed=new T.Mesh(surface.clone(),new T.MeshLambertMaterial({color:0x2f7f86,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));bed.position.y=.08;
 const deep=new T.Mesh(surface,new T.MeshBasicMaterial({map:water,transparent:true,opacity:.95,blending:T.AdditiveBlending,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));deep.position.y=.12;
 const shimmer=new T.Mesh(surface.clone(),new T.MeshBasicMaterial({map:foam,transparent:true,opacity:.22,blending:T.AdditiveBlending,depthWrite:false}));shimmer.position.y=.15;
 pond.add(shore,bed,deep,shimmer);pond.position.set(POND.x*scale,.04*scale,POND.z*scale);
 // the panel: meat in hand, each soldier's hunger
 const panel=document.createElement('details');panel.style.cssText='position:fixed;left:12px;top:56px;z-index:30;max-width:260px;padding:6px 10px;border:1px solid #b59b67;border-radius:5px;background:#182a2fe6;color:#ffe7b0;font:12px system-ui';
 const title=document.createElement('summary');title.style.cssText='cursor:pointer;font-weight:600';const list=document.createElement('div');panel.append(title,list);document.body.append(panel);
 let last='';
 const hunger=(s,at)=>Math.max(0,(s.hunger??100)-(at-(s.hungerAt??at))/DAY*100);
 function update({time}){
  water.offset.set(time*.00002,time*.000012);foam.offset.set(-time*.000016,time*.00001);
  shimmer.material.opacity=.18+.06*Math.sin(time*.0015);
  const state=getState(),own=getOwn(),soldiers=state.soldiers??[];
  const rows=soldiers.map(s=>{const h=s.hp>0?Math.round(hunger(s,state.at)):null;return {name:s.name,h};});
  const key=(own?.meat??0)+'|'+rows.map(r=>r.name+r.h).join(',');if(key===last)return;last=key;
  title.textContent='Garnison · viande de pomgarou : '+(own?.meat??0);
  list.replaceChildren(...rows.map(r=>{const row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:6px;margin-top:4px';
   const name=document.createElement('span');name.style.cssText='flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';name.textContent=r.name;
   const bar=document.createElement('span');bar.style.cssText='width:70px;height:6px;background:#0d1a1d;border-radius:3px;overflow:hidden;display:inline-block';
   const fill=document.createElement('span');fill.style.cssText=`display:block;height:100%;width:${r.h??0}%;background:${r.h==null?'#555':r.h<=STARVING?'#d65a4a':r.h<40?'#e0a64a':'#7ec46a'}`;bar.append(fill);
   const value=document.createElement('span');value.style.cssText='width:58px;text-align:right';value.textContent=r.h==null?'tombé':r.h<=STARVING?'affamé · '+r.h+' %':r.h+' %';
   row.append(name,bar,value);return row;}));
 }
 return {update,dispose(){scene.remove(pond);panel.remove();}};
}
