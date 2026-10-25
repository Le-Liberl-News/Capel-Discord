// The first minute in Sanktheim, measured on the player's own machine and sent with the join's timings
// (production.cjs, /timings): the frames that took long and what WebGL did in them (shaders compiled and linked,
// textures and geometry uploaded, draws), the shader programs and lights in the scene second by second, and named
// spans (the walls' damage rebuilt…). A diagnostic: bounded, and the WebGL calls are given back after DURATION.
const DURATION=60000,LONG=250;
// the driver finishes a shader when it is first needed: its uniforms' and attributes' lookups wait for it
const TIMED={compile:['compileShader','linkProgram','getProgramParameter','getShaderParameter','getActiveUniform','getActiveAttrib','getUniformLocation','getAttribLocation'],texture:['texImage2D','texSubImage2D','compressedTexImage2D','texStorage2D','generateMipmap'],buffer:['bufferData','bufferSubData'],draw:['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']};
export function createStartupProfile({renderer,scene,onFirstDraw=()=>{}}){
 const gl=renderer.getContext(),t0=performance.now(),frames=[],samples=[],spans=[];let frame=null,drawn=false,done=false,lastSample=0;
 // programs: how many there were when the frame began, to name the ones it made (their material's kind)
 const fresh=()=>({start:performance.now(),compile:0,texture:0,buffer:0,draw:0,programs:0,known:renderer.info.programs?.length??0});
 const wrapped=[];
 for(const [kind,names]of Object.entries(TIMED))for(const name of names){
  const original=gl[name];if(typeof original!=='function')continue;wrapped.push(name);
  gl[name]=function(...args){const t=performance.now();try{return original.apply(gl,args);}finally{if(frame)frame[kind]+=performance.now()-t;if(kind==='compile'&&name==='linkProgram'&&frame)frame.programs++;if(kind==='draw'&&!drawn){drawn=true;onFirstDraw();}}};
 }
 const lights=()=>{let n=0;scene.traverse(o=>{if(o.isLight&&o.visible)n++;});return n;};
 function tick(){
  const now=performance.now();
  if(frame){const ms=now-frame.start;if(ms>LONG&&frames.length<40)frames.push({at:Math.round(frame.start-t0),ms:Math.round(ms),compile:Math.round(frame.compile),programsLinked:frame.programs,texture:Math.round(frame.texture),buffer:Math.round(frame.buffer),draw:Math.round(frame.draw),made:(renderer.info.programs??[]).slice(frame.known).slice(0,16).map(p=>p.name)});}
  if(now-lastSample>=1000&&samples.length<70){lastSample=now;samples.push({at:Math.round(now-t0),programs:renderer.info.programs?.length??0,lights:lights(),calls:renderer.info.render.calls,textures:renderer.info.memory.textures,geometries:renderer.info.memory.geometries});}
  if(now-t0>=DURATION){stop();return;}
  frame=fresh();requestAnimationFrame(tick);
 }
 function stop(){if(done)return;done=true;frame=null;for(const name of wrapped)delete gl[name];}
 requestAnimationFrame(tick);
 return {
  // a named piece of work, timed
  span(name,work){const t=performance.now();try{return work();}finally{if(spans.length<30)spans.push({name,at:Math.round(t-t0),ms:Math.round(performance.now()-t)});}},
  report:()=>({frames:[...frames].sort((a,b)=>b.ms-a.ms).slice(0,20),samples,spans}),
  stop
 };
}
