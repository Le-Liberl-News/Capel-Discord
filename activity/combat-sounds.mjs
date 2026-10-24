import spatialAudio from './audio-distance.cjs';
// Game sound effects (tools/export-sounds.py). Web Audio: overlapping, low latency, and one gain for
// the "Effets" volume of the settings. The context starts on the first touch or key, as browsers require.
const NAMES=['don-shot','don-explosion','don-slam','schera-whip','carna-shot','josette-shot','miss','fight','jump','olivier','block','antoine','axis-ambience','joshua','hit1','hit2','hit3','hit4','dash'];
let volume=.5;try{const saved=localStorage.getItem('sky-sfx-volume');if(saved!==null&&Number.isFinite(Number(saved)))volume=Math.max(0,Math.min(1,Number(saved)));}catch{}
const listeners=new Set();
export function effectsVolume(){return volume;}
export function setEffectsVolume(value){volume=Math.max(0,Math.min(1,value));try{localStorage.setItem('sky-sfx-volume',String(volume));}catch{}for(const listener of listeners)listener(volume);}
export function createCombatSounds(assets,{sources={},listener=null,defaultPosition=null}={}){
  const Context=globalThis.AudioContext??globalThis.webkitAudioContext;if(!Context)return {play(){},loop(){return ()=>{};},dispose(){}};
  const context=new Context(),master=context.createGain();master.gain.value=volume;master.connect(context.destination);
  const onVolume=v=>{master.gain.value=v;};listeners.add(onVolume);
  const buffers=new Map();
  for(const name of new Set([...NAMES,...Object.keys(sources)]))buffers.set(name,fetch(new URL(sources[name]??`sounds/se/${name}.wav${name==='carna-shot'?'?v=ed6se689':''}`,assets)).then(r=>r.arrayBuffer()).then(data=>context.decodeAudioData(data)).catch(()=>null));
  const wake=()=>{if(context.state==='suspended')void context.resume().catch(()=>{});};
  addEventListener('pointerdown',wake,true);addEventListener('keydown',wake,true);
  function start(name,{gain=1,loop=false,position=null}={}){
    let source=null,stopped=false;
    void buffers.get(name)?.then(buffer=>{if(!buffer||stopped||volume<=0&&!loop)return;wake();const node=context.createGain();const sourcePosition=typeof position==='function'?position():position??defaultPosition?.();const attenuation=listener?spatialAudio.gainAt(listener(),sourcePosition):1;if(attenuation<=0)return;node.gain.value=gain*attenuation;node.connect(master);source=context.createBufferSource();source.buffer=buffer;source.loop=loop;source.connect(node);source.onended=()=>{source.disconnect();node.disconnect();};source.start();});
    return ()=>{stopped=true;try{source?.stop();}catch{}};
  }
  return {
    at(position){return {play:(name,options)=>start(name,{position,...options}),playAny:(names,options)=>start(names[Math.floor(Math.random()*names.length)],{position,...options})};},
    play(name,options){start(name,options);},
    // several sounds for the same event: one at random
    playAny(names,options){start(names[Math.floor(Math.random()*names.length)],options);},
    loop(name,options){return start(name,{...options,loop:true});},
    dispose(){listeners.delete(onVolume);removeEventListener('pointerdown',wake,true);removeEventListener('keydown',wake,true);void context.close().catch(()=>{});},
  };
}
