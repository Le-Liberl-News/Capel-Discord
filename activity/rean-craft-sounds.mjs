import flame from './rean-flame-slash.cjs';
// Sky substitutes: the local CS2 installation contains BGM, but no SE/voice bank.
// These names use the existing game-volume-controlled Web Audio buffers.
export function reanCraftSoundCues(event){
 if(event.character!=='Rean'||event.kind!=='craft'||event.cancelled)return [];
 const p=flame.flamePhases(event);
 return [
  {id:'charge',at:0,name:'joshua',gain:.3},
  {id:'rush',at:p.prep,name:'dash',gain:.65},
  {id:'first',at:p.first-40,name:'hit2',gain:.9},
  {id:'second',at:p.second-40,name:'hit3',gain:.9},
  {id:'raise',at:p.finalStart,name:'block',gain:.4},
  {id:'final-rush',at:p.dashStart,name:'dash',gain:.8},
  {id:'final-flame',at:p.third-30,name:'joshua',gain:.7},
  {id:'final-cut',at:p.third,name:'hit4',gain:1},
 ];
}
export function playReanCraftSounds(event,time,done,sounds){
 const elapsed=time-event.localStart;
 for(const cue of reanCraftSoundCues(event)){const key='rean-sound:'+cue.id,age=elapsed-cue.at;if(age<0||done.has(key))continue;done.add(key);if(age<180)sounds?.play(cue.name,{gain:cue.gain});}
}
