export function createCharacterVoices(assets,makeAudio=url=>new Audio(url)){
 const sieg=makeAudio(new URL('sounds/sieg.ogg',assets).href);sieg.preload='auto';sieg.volume=.35;
 return {speak(character){if(character!=='Sieg')return;sieg.currentTime=0;const playing=sieg.play();playing?.catch(()=>{});},dispose(){sieg.pause();sieg.removeAttribute?.('src');sieg.load?.();}};
}
