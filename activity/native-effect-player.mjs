// Playback of decoded Sky EF assemblies. No hand-authored particle presets.
const lerp=(a,b,t)=>a+(b-a)*t;
const add=(a,b)=>a.map((v,i)=>v+b[i]);
const random=(seed)=>{let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};};
const rotate=(v,r)=>{let [x,y,z]=v;const [a,b,c]=r.map(n=>n*Math.PI/180);[y,z]=[y*Math.cos(a)-z*Math.sin(a),y*Math.sin(a)+z*Math.cos(a)];[x,z]=[x*Math.cos(b)+z*Math.sin(b),-x*Math.sin(b)+z*Math.cos(b)];return [x*Math.cos(c)-y*Math.sin(c),x*Math.sin(c)+y*Math.cos(c),z];};

export function sampleKeys(keys,time,fallback){
  if(!keys.length)return fallback;
  let i=0;while(i+1<keys.length&&time>=keys[i+1].time)i++;
  const a=keys[i],b=keys[Math.min(i+1,keys.length-1)];
  const t=b.time>a.time?Math.min(1,Math.max(0,(time-a.time)/(b.time-a.time))):0;
  return a.value.map((v,j)=>lerp(v,b.value[j],t));
}

function vectorKeys(keys,kind,seed,ordinal){
  let origin=[0,0,0];const rng=random(seed);
  return keys.map((key,i)=>{
    let value=key.min.map((v,j)=>lerp(v,key.max[j],rng()));
    if(kind==='scale'&&(key.flags&2))value=[value[0],value[0],value[0]];
    if(kind==='position'&&(key.flags&2)){
      // Native cylindrical placement: angle in degrees, height, radius.
      const angle=value[0]*Math.PI/180;value=[Math.cos(angle)*value[2],value[1],Math.sin(angle)*value[2]];
    }
    if(kind==='rotation')value=value.map((v,j)=>v*((key.flags&(2<<j))?ordinal:1));
    if(key.flags&1)value=add(value,origin);
    if(i===0)origin=value;
    return {time:key.time===0xffffffff?Number.POSITIVE_INFINITY:key.time+key.jitter*rng(),value};
  });
}

function colorKeys(keys){
  // Packed RRGGBBAA (little-endian bytes A,B,G,R). Additive parts use RGB even with zero alpha.
  return keys.map(k=>({time:k.time===0xffffffff?Infinity:k.time,
    value:[k.value>>>24&255,k.value>>>16&255,k.value>>>8&255,k.value&255]}));
}

export class NativeEffectPlayer{
  constructor(effects,loadImage){this.effects=effects;this.loadImage=loadImage;this.instances=[];this.warnings=[];this.yaw=35;this.pitch=30;this.duration=4000;this.extent=1;}
  async load(entry){
    this.instances=[];this.warnings=[];this.textureImages=new Map();this.entry=entry;
    this.definitions=new Map();
    const definition=await this.definition(entry);this.root=definition;
    this.duration=Math.min(30000,Math.max(4000,(definition.parts[0].duration||4000)+2000));
    this.schedule(definition,0,0,[0,0,0],null,0,1,[]);
    this.duration=Math.min(30000,Math.max(this.duration,...this.instances.filter(i=>i.part.enabled&&!(i.part.renderFlags&1)).map(i=>i.start+i.duration)));
    this.models=new Map();
    for(const item of this.instances){if(!item.part.model||this.models.has(item.part.model))continue;const r=await fetch(item.part.model);if(r.ok)this.models.set(item.part.model,await r.json());else this.warnings.push("Modèle 3D absent : "+item.part.modelName);}
    for(const model of this.models.values())for(const mesh of model.meshes)if(mesh.texture) {this.textureImages.set(mesh.texture.texture,await this.loadImage(mesh.texture.texture));if(mesh.texture.additiveTexture)this.textureImages.set(mesh.texture.additiveTexture,await this.loadImage(mesh.texture.additiveTexture));}
    const dependencies=new Set(this.instances.map(i=>i.part.renderFlags&0x44?i.texture?.additiveTexture??i.texture?.texture:i.texture?.texture).filter(Boolean));
    await Promise.all([...dependencies].map(async url=>this.textureImages.set(url,await this.loadImage(url))));
    if(this.instances.some(i=>i.texture?.sharedFromThird))this.warnings.push('Texture commune reprise du catalogue The 3rd');
    const missing=new Set(this.instances.filter(i=>i.part.enabled&&!(i.part.renderFlags&1)&&!i.texture).map(i=>i.part.name||i.part.index));
    if(missing.size)this.warnings.push('Textures absentes : '+[...missing].join(', '));
    if(this.instances.some(i=>i.part.primitive==null||(i.part.primitive>1&&i.part.primitive!==10)))this.warnings.push('Géométries spéciales : aperçu par plans texturés, forme 3D à compléter');
    if(this.instances.some(i=>i.part.flags&0x40))this.warnings.push('Rubans : aperçu par particules, géométrie du ruban à compléter');
    if(this.instances.some(i=>i.part.motion&&i.part.motion!==0))this.warnings.push('Trajectoires liées à une cible : cible fixe dans cet aperçu');
    if(this.models.size)this.warnings.push('Modèle 3D chargé ; déformation du squelette à compléter');
    this.warnings=[...new Set(this.warnings)];this.fit();
    return this;
  }
  async definition(entry){
    if(this.definitions.has(entry.id))return this.definitions.get(entry.id);
    const response=await fetch(entry.animation);if(!response.ok)throw Error('Définition EF introuvable');const definition=await response.json();
    this.definitions.set(entry.id,definition);
    for(const name of definition.children.filter(Boolean)){
      const id=entry.game+'/'+name.replace(/\.eff$/i,'._ef').toLowerCase();
      const child=this.effects.find(e=>e.id.toLowerCase()===id.toLowerCase());
      if(child?.animation)await this.definition(child);else this.warnings.push('Effet lié absent : '+name);
    }
    return definition;
  }
  schedule(effect,partIndex,start,offset,parent,ordinal,seed,ancestry){
    if(this.instances.length>=2400)return;
    const part=effect.parts[partIndex],key=effect.id+':'+partIndex;if(!part||ancestry.includes(key)||start>this.duration)return;
    const duration=part.duration||this.duration;
    const item={part,start,duration,offset,parent,ordinal,seed,texture:effect.textures[part.textureIndex],
      position:vectorKeys(part.position,'position',seed,ordinal),
      angular:vectorKeys(part.angular??[],'rotation',seed+53,ordinal),
      rotation:vectorKeys(part.rotation,'rotation',seed+31,ordinal),
      scale:vectorKeys(part.scale,'scale',seed+79,ordinal),color:colorKeys(part.color)};
    this.instances.push(item);
    for(const emission of part.emissions){
      if(!emission.repeat||!emission.count)continue;
      let childEffect=effect,childIndex=emission.part;
      if(emission.kind===1){
        const name=effect.children[emission.part];if(!name)continue;
        childEffect=this.definitions.get(effect.game+'/'+name.replace(/\.eff$/i,'._ef').toLowerCase());childIndex=0;
        if(!childEffect)continue;
      }else if(emission.kind!==0)continue;
      const delay=emission.trigger===2?duration:Math.max(0,emission.delay);
      if(emission.trigger===1)this.warnings.push('Émission au contact du sol : instant à vérifier');
      const interval=Math.max(1,emission.interval),limit=emission.repeat===255?Math.min(start+duration,this.duration):this.duration;
      const repeats=emission.repeat===255?Math.ceil(duration/interval):emission.repeat===254?1:emission.repeat;
      const rng=random(seed+childIndex*71);let time=start+delay;
      for(let n=0;n<repeats&&n<512;n++){
        if(time>limit)break;
        for(let j=0;j<Math.min(32,emission.count);j++)this.schedule(childEffect,childIndex,time,[0,0,0],item,n*emission.count+j,seed+Math.imul(n+1,151)+j*19,[...ancestry,key]);
        time+=interval+emission.variation*rng();
      }
    }
  }
  state(item,time){
    const age=time-item.start;if(age<0||age>item.duration)return null;
    let position=add(sampleKeys(item.position,age,[0,0,0]),item.offset);
    const angular=sampleKeys(item.angular??[],age,[0,0,0]);
    // EF angular curves orbit the emitter, including the positions inherited by its particles.
    position=rotate(position,[angular[1],angular[0],angular[2]]);
    if(item.parent){
      // A delayed emission inherits the emitter's final position even after it has stopped.
      const atBirth=this.state(item.parent,Math.min(item.start,item.parent.start+item.parent.duration));
      if(atBirth)position=add(position,atBirth.position);
    }
    return {position,rotation:sampleKeys(item.rotation,age,[0,0,0]),
      scale:sampleKeys(item.scale,age,[1,1,1]),color:sampleKeys(item.color,age,[255,255,255,0])};
  }
  fit(){
    let extent=.5;
    for(let t=0;t<=this.duration;t+=this.duration/24)for(const item of this.instances){
      if((!item.texture&&!item.part.model)||!item.part.enabled||(item.part.renderFlags&1))continue;
      const s=this.state(item,t);if(!s)continue;
      const size=Math.max(...s.scale.map(Math.abs))*(this.models.get(item.part.model)?.extent??1);
      if(size>10000)continue;
      extent=Math.max(extent,...s.position.map(v=>Math.abs(v)+size*.6));
    }
    this.extent=extent;
  }
  project(v,w,h,zoom){
    const p=rotate(v,[0,this.yaw,0]),angle=this.pitch*Math.PI/180;
    const factor=Math.min(w,h)*.35*zoom/this.extent;
    return [w/2+p[0]*factor,h*.57-(p[1]*Math.cos(angle)-p[2]*Math.sin(angle))*factor,
      p[2]*Math.cos(angle)+p[1]*Math.sin(angle)];
  }
  draw(ctx,time,w,h,zoom,grid=true){
    const factor=zoom/2,visible=[];
    ctx.save();ctx.strokeStyle='#67717f55';ctx.lineWidth=1;
    const size=this.extent;
    if(grid)for(let i=-4;i<=4;i++)for(const axis of [0,2]){
      const p=[-size,0,-size],q=[size,0,size];p[axis]=q[axis]=i*size/4;
      const a=this.project(p,w,h,factor),b=this.project(q,w,h,factor);ctx.beginPath();ctx.moveTo(...a.slice(0,2));ctx.lineTo(...b.slice(0,2));ctx.stroke();
    }
    for(const item of this.instances){
      if((!item.texture&&!item.part.model)||!item.part.enabled||(item.part.renderFlags&1))continue;
      const s=this.state(item,time);if(!s)continue;
      visible.push({item,s,z:this.project(s.position,w,h,factor)[2]});
    }
    visible.sort((a,b)=>b.z-a.z);
    let count=0;
    for(const {item,s}of visible){
      if(item.part.primitive===10){const model=this.models.get(item.part.model);if(model)count+=this.drawModel(ctx,model,item,s,w,h,factor);continue;}
      if(item.part.primitive===1){count+=this.drawCylinder(ctx,item,s,w,h,factor);continue;}
      const im=this.textureImages.get(item.part.renderFlags&0x44?item.texture.additiveTexture??item.texture.texture:item.texture.texture);if(!im)continue;
      const part=item.part;let [u,v,u2,v2]=part.uv;const uv=part.uvAnimation??{},tw=u2-u,th=v2-v;
      if(uv.mode===2&&uv.interval&&tw>0&&th>0){
        const columns=Math.max(1,Math.round(1/tw));let cell=Math.floor((time-item.start)/uv.interval);
        if(cell>uv.last)cell=uv.loop+(cell-uv.last-1)%Math.max(1,uv.last-uv.loop+1);
        u+=(cell%columns)*tw;v+=Math.floor(cell/columns)*th;u2=u+tw;v2=v+th;
      }else if(uv.mode===1){
        u+=((time-item.start)/1000*uv.speed[0])%1;v+=((time-item.start)/1000*uv.speed[1])%1;u2=u+tw;v2=v+th;
      }
      const flipU=u2<u,flipV=v2<v;const fw=Math.abs(u2-u)*im.width,fh=Math.abs(v2-v)*im.height;
      if(fw<=0||fh<=0)continue;
      const vertices=part.vertices,[a,b]=vertices;
      // Most EF planes are in XY; camera-facing flag 0x400 is retained.
      const ground=item.scale.length>0&&item.scale.every(k=>Math.abs(k.value[1])<1e-6)&&item.scale.some(k=>Math.abs(k.value[2])>1e-6);
      const raw=ground?[[a[0],0,a[1]],[b[0],0,a[1]],[a[0],0,b[1]]]:[[a[0],a[1],a[2]],[b[0],a[1],a[2]],[a[0],b[1],b[2]]];
      const rotation=[...s.rotation];if(!ground&&(part.renderFlags&0x400)){rotation[1]-=this.yaw;rotation[0]-=this.pitch;}
      const points=raw.map(point=>this.project(add(rotate(point.map((val,j)=>val*s.scale[j]),rotation),s.position),w,h,factor));
      const [p0,p1,p2]=points;if(points.flat().some(n=>!Number.isFinite(n)))continue;
      const additive=!!(part.renderFlags&4),multiply=!additive&&!!(part.renderFlags&0x40);
      const tint=this.tint(im,Math.min(u,u2),Math.min(v,v2),fw,fh,multiply?[255,255,255,255]:s.color,(additive||!multiply&&item.texture.blackKey),multiply);
      // Multiplication needs a scene colour beneath it. On a transparent export, encode
      // its white-neutral texture as dark particles instead of baking an opaque white rectangle.
      ctx.save();ctx.globalCompositeOperation=additive?'lighter':'source-over';
      ctx.globalAlpha=additive?1:s.color[3]/255;
      ctx.transform((p1[0]-p0[0])/fw,(p1[1]-p0[1])/fw,(p2[0]-p0[0])/fh,(p2[1]-p0[1])/fh,p0[0],p0[1]);
      if(flipU||flipV){ctx.translate(flipU?fw:0,flipV?fh:0);ctx.scale(flipU?-1:1,flipV?-1:1);}ctx.drawImage(tint,0,0,fw,fh);ctx.restore();count++;
    }
    ctx.restore();return count;
  }
  drawCylinder(ctx,item,s,w,h,zoom){
    this.cylinders??=new WeakMap();let model=this.cylinders.get(item.part);
    if(!model){const [a,b]=item.part.vertices,[u,v,u2,v2]=item.part.uv,positions=[],uv=[],indices=[],segments=32;
      for(let i=0;i<=segments;i++){const t=i/segments,angle=t*Math.PI*2;positions.push([Math.cos(angle)*a[0],a[1],Math.sin(angle)*a[0]],[Math.cos(angle)*b[0],b[1],Math.sin(angle)*b[0]]);uv.push([lerp(u,u2,t),v],[lerp(u,u2,t),v2]);if(i<segments){const j=i*2;indices.push(j,j+1,j+2,j+2,j+1,j+3);}}
      model={meshes:[{positions,uv,indices,texture:item.texture,renderFlags:item.part.renderFlags}]};this.cylinders.set(item.part,model);
    }
    return this.drawModel(ctx,model,item,s,w,h,zoom);
  }
  drawModel(ctx,model,item,s,w,h,zoom){
    const additive=!!(item.part.renderFlags&4),multiply=!additive&&!!(item.part.renderFlags&0x40),triangles=[];
    for(const mesh of model.meshes){
      const mode=mesh.renderFlags==null?(multiply?'multiply':additive?'lighter':'source-over'):(mesh.renderFlags&4?'lighter':mesh.renderFlags&0x40?'multiply':'source-over');
      const original=this.textureImages.get(mode==='source-over'?mesh.texture?.texture:mesh.texture?.additiveTexture??mesh.texture?.texture);if(!original)continue;
      const tinted=this.tint(original,0,0,original.width,original.height,mode==='multiply'?[255,255,255,255]:s.color,mode==='source-over');
      const image=document.createElement('canvas');image.width=tinted.width;image.height=tinted.height;image.getContext('2d').drawImage(tinted,0,0);
      const points=mesh.positions.map(p=>this.project(add(rotate(p.map((v,j)=>v*s.scale[j]),s.rotation),s.position),w,h,zoom));
      for(let i=0;i<mesh.indices.length;i+=3){const ids=mesh.indices.slice(i,i+3);triangles.push({points:ids.map(j=>points[j]),uv:ids.map(j=>mesh.uv[j]),image,mode});}
    }
    triangles.sort((a,b)=>b.points.reduce((n,p)=>n+p[2],0)-a.points.reduce((n,p)=>n+p[2],0));
    for(const triangle of triangles){const {points,uv,image,mode}=triangle;
      const [a,b,c]=uv.map(p=>[p[0]*image.width,p[1]*image.height]);const [p,q,r]=points;
      const det=(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]);if(Math.abs(det)<1e-8)continue;
      const m0=((q[0]-p[0])*(c[1]-a[1])-(r[0]-p[0])*(b[1]-a[1]))/det;
      const m1=((q[1]-p[1])*(c[1]-a[1])-(r[1]-p[1])*(b[1]-a[1]))/det;
      const m2=((r[0]-p[0])*(b[0]-a[0])-(q[0]-p[0])*(c[0]-a[0]))/det;
      const m3=((r[1]-p[1])*(b[0]-a[0])-(q[1]-p[1])*(c[0]-a[0]))/det;
      ctx.save();ctx.globalCompositeOperation=mode;ctx.globalAlpha=mode==='source-over'?s.color[3]/255:1;
      ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.lineTo(r[0],r[1]);ctx.closePath();ctx.clip();
      ctx.transform(m0,m1,m2,m3,p[0]-m0*a[0]-m2*a[1],p[1]-m1*a[0]-m3*a[1]);ctx.drawImage(image,0,0);ctx.restore();
    }
    return triangles.length?1:0;
  }
  tint(image,u,v,w,h,color,blackKey=false,whiteNeutral=false){
    const canvas=this.tintCanvas??=document.createElement('canvas');
    canvas.width=Math.max(1,Math.ceil(w));canvas.height=Math.max(1,Math.ceil(h));const ctx=canvas.getContext('2d');
    ctx.drawImage(image,u*image.width,v*image.height,w,h,0,0,w,h);
    if(whiteNeutral){const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);for(let i=0;i<pixels.data.length;i+=4){const darkness=255-Math.min(pixels.data[i],pixels.data[i+1],pixels.data[i+2]);pixels.data[i+3]=Math.round(pixels.data[i+3]*darkness/255);pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=35;}ctx.putImageData(pixels,0,0);}
    if(blackKey){const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);for(let i=0;i<pixels.data.length;i+=4)if(pixels.data[i]===0&&pixels.data[i+1]===0&&pixels.data[i+2]===0)pixels.data[i+3]=0;ctx.putImageData(pixels,0,0);}
    const mask=this.maskCanvas??=document.createElement('canvas');mask.width=canvas.width;mask.height=canvas.height;mask.getContext('2d').drawImage(canvas,0,0);
    ctx.globalCompositeOperation='multiply';ctx.fillStyle=`rgb(${color.slice(0,3).map(v=>Math.round(v)).join(',')})`;ctx.fillRect(0,0,w,h);
    ctx.globalCompositeOperation='destination-in';ctx.drawImage(mask,0,0);ctx.globalCompositeOperation='source-over';return canvas;
  }
}
